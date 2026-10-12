# Source — Ressources naturelles Canada, « Les systèmes photovoltaïques : guide de l'acheteur »

- **Organisme :** Ressources naturelles Canada (RNCan), CANMET (M92-28/2001F)
- **URL :** https://ressources-naturelles.canada.ca/sites/www.nrcan.gc.ca/files/canmetenergy/files/pubs/PhotovoltaicSystemsBuyerGuide_fr.pdf
- **Date de consultation :** 2026-09-23
- **Captation :** `curl`, PDF enregistré : `sources/18b-rncan-systemes-photovoltaiques-guide.pdf`,
  texte extrait par `pdftotext`
- **Sert au chapitre :** 18b (sections 5.3, 5.4, 8, 9)

---

## Extraits intégraux

### Dimensionner le champ de modules

> « Puissance du champ de modules (en W) = Charge journalière totale (Wh/j) ÷ (Heures
> d'ensoleillement maximal × 0,77) »

> « Le facteur 0,77 suppose une efficacité du régulateur de charge des accumulateurs de 90 p. 100
> et une efficacité des accumulateurs de 85 p. 100. »

> « Si l'on n'utilise pas d'optimiseur, on doit tenir compte des pertes de puissance et ainsi
> augmenter la capacité nominale de 15 à 25 p. 100. »

### Dimensionner les accumulateurs

> « Capacité des accumulateurs (en Ah) : charge journalière totale (Wh/j) x jours de stockage ÷
> tension (Vacc) x 0,42 »

> « Le facteur 0,42 suppose une efficacité des accumulateurs de 85 p. 100 et une décharge maximale
> de 50 p. 100. Si les accumulateurs doivent fonctionner à des températures inférieures à 20 °C,
> leur capacité (en Ah) diminuera. »

> « Nombre de jours de stockage nécessaires : (En règle générale, on prévoit 3 jours) »

### Installer les modules

> « La batterie de modules est montée de façon à ce que son bord inférieur se trouve au-dessus de
> la hauteur de neige maximale probable. Il faut également s'assurer qu'il n'y a pas de rebord à
> sa partie inférieure, afin que rien ne retienne la neige. »

> « vous devriez placer les modules le plus près possible de la batterie d'accumulateurs [...]
> afin de raccourcir le plus possible les fils et de diminuer les pertes lors du transport
> d'électricité. »

> « Si vous vous servez d'une boussole pour orienter des modules photovoltaïques, vous disposerez
> ceux-ci en fonction du sud magnétique plutôt que du sud vrai [...]. Or, mieux vaut les orienter
> vers le sud vrai. »

> « Si le bâtiment a une cheminée, assurez-vous que les modules sont disposés de façon à ne pas
> être ombragés par la fumée. »

### L'abri des accumulateurs

> « la température idéale est de 25 °C, en dessous de laquelle la capacité des accumulateurs
> diminue. Donc, si vous placez les accumulateurs dans un endroit non chauffé, vous devez l'isoler
> adéquatement et vous aurez besoin d'accumulateurs de plus grande capacité »

> « Lorsque les accumulateurs sont situés dans une structure habitée, il faut s'assurer que
> l'endroit où ils sont gardés est muni d'une bouche d'aération donnant sur l'extérieur. Dans le
> cas d'un petit système de chalet (comportant deux accumulateurs de 12 V c.c., par exemple),
> cette bouche d'aération doit avoir au moins 2,5 cm (1 po) de diamètre. »

> « Dans les endroits où il fait très froid, on peut les placer dans un contenant qu'on enfouit
> pour mieux les protéger des écarts de température. »

> « Les accumulateurs peuvent laisser émaner du gaz hydrogène pendant leur chargement »

> « En ce qui concerne les chalets d'été, gardez les accumulateurs complètement chargés pour
> éviter le gel hors saison. »

### L'étiquette d'un module (exemple du guide)

> Module de 48 Wc : « Open circuit voltage 19.8 V » ; « Rated voltage 15.9 V ».

---

## Chiffres retenus pour le chapitre 18b

| Chiffre | Usage |
| --- | --- |
| Formule du champ : Wh/j ÷ (heures × 0,77), +15 à 25 % sans optimiseur | Section 5.3 |
| Formule du banc : Wh/j × jours ÷ (V × 0,42) ; 3 jours en règle générale | Section 5.4 |
| Bouche d'aération d'au moins 2,5 cm pour deux batteries de 12 V | Sections 5.4, 8 |
| Bord bas au-dessus de la neige, aucun rebord | Section 5.3 |
| Sud vrai, pas sud de la boussole | Sections 5.3, 9 |
| Tension à vide d'un module « 12 V » : 19,8 V dans l'exemple | Section 9 |
