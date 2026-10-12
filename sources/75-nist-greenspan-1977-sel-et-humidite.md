# NBS/NIST (Greenspan 1977) — l'humidité d'équilibre du sel de table

- **Organisme :** National Bureau of Standards (aujourd'hui National Institute of Standards and
  Technology, NIST), Institute for Basic Standards, Washington
- **Article :** Lewis Greenspan, « Humidity Fixed Points of Binary Saturated Aqueous
  Solutions », *Journal of Research of the National Bureau of Standards — A. Physics and
  Chemistry*, vol. 81A, n° 1, janvier-février 1977, p. 89-96. C'est la table de référence des
  humidités fixées par des sels, utilisée pour étalonner les hygromètres.
- **URL :** https://nvlpubs.nist.gov/nistpubs/jres/81A/jresv81An1p89_A1b.pdf
- **Date de consultation :** 24 septembre 2026
- **Captation :** de première main, `curl`, HTTP 200. **PDF enregistré** :
  `sources/75-nist-greenspan-1977-humidite-solutions-salines.pdf` ; texte extrait (`pdftotext
  -raw`) : `sources/75-nist-greenspan-1977-humidite-solutions-salines-texte.txt`
- **Sert au chapitre :** 75 — Semences, §9 « Savoir si c'est sec, sans hygromètre » : l'indicateur
  au gros sel

---

## Extraits intégraux

> « An evaluated compilation of equilibrium relative humidities in air versus temperature from
> pure phase to approximately 10⁵ pascal (1 atm) in pressure is presented for 28 binary saturated
> aqueous solutions. »

Tableau des coefficients d'ajustement (humidité relative d'équilibre en %, en fonction de la
température t en °C : HR = A0 + A1·t + A2·t² + A3·t³), ligne du chlorure de sodium, telle
qu'extraite :

> « Sodium Chloride 75.5164 0.0398321 -0.265459 × 10⁻² 0.284800 × 10⁻⁴ .21 44 0.0 80.0 »

(A0, A1, A2, A3 ; écart-type 0,21 ; 44 mesures ; domaine de 0,0 à 80,0 °C)

### Valeurs calculées à partir de cette ligne

| Température | HR d'équilibre au-dessus du sel saturé |
| --- | --- |
| 0 °C | 75,5 % |
| 10 °C | 75,7 % |
| 20 °C | 75,5 % |
| 25 °C | 75,3 % |
| 30 °C | 75,1 % |

---

## Lecture pour le livre

- Le sel de table ne se met à « prendre l'eau » et à fondre en saumure que lorsque l'air autour
  de lui atteint **environ 75 % d'humidité relative**, quelle que soit la température de la
  pièce. En dessous, il reste pour l'essentiel sec.
- Donc : **si le sel prend en pain dans le pot fermé, l'air du pot est proche de 75 %** — la
  graine est franchement humide.
- Mais **un sel qui reste libre ne prouve pas que la graine est sèche** au sens du chapitre : les
  banques de semences sèchent la graine dans un air à **10-25 %**
  (`sources/75-fao-normes-banques-de-genes-2014.md`, norme 4.2.1). Entre 25 et 75 %, le sel ne
  dit rien.
- Pour « très sec » sans instrument : le test de l'enveloppe et le test du marteau
  (`sources/75-osa-guide-semences-2010.md`).
- Aucune page obtenue ne décrit le « test du sel » lui-même pour la semence ; la lecture
  ci-dessus est la physique du sel, appliquée.
