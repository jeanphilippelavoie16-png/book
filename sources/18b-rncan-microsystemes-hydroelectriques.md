# Source — Ressources naturelles Canada, « Microsystèmes hydroélectriques : guide de l'acheteur »

- **Organisme :** Ressources naturelles Canada, Centre de la technologie de l'énergie de CANMET
  (M144-29/2004F)
- **URL :** https://ressources-naturelles.canada.ca/sites/nrcan/files/canmetenergy/files/pubs/buyersguidehydroFR.pdf
- **Date de consultation :** 2026-09-23
- **Captation :** `curl`, PDF enregistré : `sources/18b-rncan-microsystemes-hydroelectriques-guide.pdf`,
  texte extrait par `pdftotext -enc UTF-8`. Version anglaise consultée pour vérifier le passage
  sur les roues (https://www.builditsolar.com/Projects/Hydro/CanadaMicroHydroGuide.pdf).
- **Sert au chapitre :** 18b (section 9 — le courant du ruisseau)

---

## Extraits intégraux

### La puissance

> « Production d'électricité (W) = Q (L/s) × H (m) × g × e »

> « e = facteur d'efficacité (0,5 à 0,7) »

> « En règle générale, on peut prévoir un facteur d'efficacité globale d'environ 50 p. 100 pour
> les petits systèmes (p. ex., jusqu'à 10 kW) »

> « L'efficacité des petites turbines est rarement supérieure à 80 p. 100. »

### Le tableau 1 (production type en watts, extrait)

| Hauteur de chute | 5 L/s | 10 L/s | 15 L/s | 20 L/s |
| --- | --- | --- | --- | --- |
| 1 m | 25 | 49 | 74 | 98 |
| 2 m | 49 | 98 | 147 | 196 |
| 4 m | 98 | 196 | 294 | 392 |
| 8 m | 196 | 392 | 588 | 784 |
| 10 m | 245 | 490 | 735 | 980 |

### Le seuil

> « on retiendra qu'il n'est probablement pas rentable d'exploiter un site dont la hauteur de
> chute est inférieure à 1 m (3 pi). De la même façon, on pourra considérer une valeur de 0,60 L/s
> (10 gal/min) comme débit minimum. »

> « Un débit de 20 L/s (317 gal/min) et une hauteur de chute de 1 m (3 pi) permettent aussi de
> produire environ 100 W d'électricité utile. » ; « suffisamment d'énergie pour alimenter une
> ampoule de 100 W, ce qui correspond à environ 72 kWh par mois. »

### L'hiver au Québec

> « Dans le nord de l'Ontario et du Québec, les petites rivières et les ruisseaux connaissent
> leurs niveaux les plus faibles au milieu de l'hiver et leurs niveaux les plus élevés au
> printemps. »

> « On utilise idéalement le débit minimum annuel pour calculer le débit de conception »

> « Dans les régions de gel important, les conduites doivent toujours être enfouies au-dessous de
> la ligne de gel. »

> « Une fine grille disposée sur la prise d'eau de la conduite forcée piège les débris et la
> glace qui pourraient endommager la turbine et les vannes. »

> « fixer un objectif de perte de charge ne dépassant pas 5 à 10 p. 100 de la hauteur de chute
> brute »

### Les roues

> « Elles sont moins efficaces que les turbines, mais continuent d'être une option viable [...].
> Elles sont simples à réguler, se prêtent bien à des projets à réaliser soi-même »

> « Le principal inconvénient des roues hydrauliques est leur vitesse relativement faible; elles
> nécessitent donc, pour entraîner une génératrice, une boîte d'engrenages à rapport de
> démultiplication élevé ou un autre moyen d'augmenter la vitesse de rotation. »

> « Dans la plupart des régions du Canada, toutefois, on ne recommande généralement pas
> d'utiliser des roues hydrauliques en hiver parce qu'il est pratiquement impossible de prévenir
> la formation et l'accumulation de glace, ce qui pourrait les endommager. »

Tableau 5, roues hydrauliques : « De 25 à 45 % » (par dessous), « De 35 à 65 % » (de milieu),
« De 60 à 75 % » (par dessus). **Note de captation, tranchée le 2026-09-24 :** la mise en page
du PDF décale d'une ligne toutes les plages par rapport à leurs étiquettes, pour les turbines
comme pour les roues ; lues en tenant compte du décalage, les plages vont dans l'ordre ci-dessus.
Ce qu'imprime le chapitre est exact.

> « il y a lieu d'en envisager l'utilisation dans les microsystèmes de faible puissance – par
> exemple, de moins de 5 kW disposant d'une hauteur de chute inférieure à 3 m (10 pi). »

> « Les turbines Pelton sont utilisées dans les sites à faible débit et à hauteur de chute
> élevée. »

> Tableau 6 (systèmes à accumulateurs) : « Faible ou moyenne hauteur de chute » 3 à 60 m, 0,6 à
> 10 L/s, « Turgo; génératrice à c.c. à aimants permanents » ; « Grande hauteur de chute » 6 à
> 180 m, « Pelton; alternateur de véhicule automobile ».

> Première étude de cas (Lillooet, C.-B.) : environ 180 m de conduite de polyéthylène de 5 cm,
> chute d'environ 10,5 m, 6 L/s, génératrice à aimants permanents, « environ 200 W de puissance
> continue sous une tension de 24 V » ; « ce système particulier a résisté pendant des mois à des
> températures inférieures au point de congélation » ; « L'entretien se résume au nettoyage de la
> prise d'eau. »

> « La centrale (voir la figure 16) est un bâtiment qui abrite la turbine, la génératrice et des
> appareils de régulation. »

**Pour le chapitre :** la roue à augets n'exploite que la hauteur de son propre diamètre, et le
guide réserve les roues aux chutes de moins de 3 m ; au-delà, la turbine à jet (roue à cuillers).
L'hiver, seule la version à conduite enfouie et turbine sous abri est défendable, et l'étude de cas
de Lillooet en est l'exemple (climat plus doux que la Côte-Nord : le chapitre ne promet pas plus).

### Les génératrices et la régulation

> « Les génératrices c.c. à aimants permanents possèdent une efficacité supérieure à 80 p. 100 à
> pleine charge. »

> « On incorpore des condensateurs aux fins d'excitation » (moteur à induction triphasé utilisé
> comme alternateur)

> « Un multiplicateur, tel qu'une courroie ou une boîte à engrenages, peut être requis pour
> ajuster la faible vitesse de la turbine à la vitesse requise de la génératrice. »

> À poulies et courroies en « V » : « C'est le choix le plus courant pour les microsystèmes
> hydroélectriques. »

> « cette variation aura un effet important sur la fréquence et la tension du courant produit,
> et elle pourrait endommager la génératrice à la suite d'une surcharge découlant d'une demande
> élevée ou en raison d'une vitesse de rotation trop élevée découlant d'une demande faible ou
> nulle. »

> « une charge résistive, généralement appelée charge de délestage [...]. La charge de délestage
> est généralement constituée d'un chauffe-eau. »

> Système à accumulateurs : turbine et génératrice → batterie d'accumulateurs → onduleur, avec
> « Régulateur de surcharge » et « Charge de délestage » (figure 24).

> « Grâce à une batterie d'accumulateurs, un système de 400 W peut fournir une puissance de
> pointe de 5 kW ou même plus s'il est doté des onduleurs appropriés »

### Mesurer

> « Une colonne d'eau de 1 m de hauteur exerce une pression de 9,8 kilopascals (kPa) »

> Méthode du contenant : « dériver complètement, grâce à un petit déversoir, toute l'eau du cours
> d'eau dans un contenant, tel un seau ou un baril, et de noter le temps requis pour remplir le
> contenant. [...] Pour mesurer un débit inférieur ou égal à 20 L/s, on peut utiliser un
> contenant de 200 L, comme un baril à pétrole. »

> « il faut laisser 10 p. 100 du débit annuel moyen dans les cours d'eau contenant des poissons »

---

## Chiffres retenus pour le chapitre 18b

| Chiffre | Usage |
| --- | --- |
| P (W) ≈ 9,8 × L/s × m × 0,5, soit environ **5 × débit × chute** | Section 9 |
| 20 L/s sur 1 m ≈ 100 W ; 10 L/s sur 2 m ≈ 98 W ; 5 L/s sur 4 m ≈ 98 W | Section 9 |
| Sous 1 m de chute ou 0,6 L/s : pas la peine | Section 9 |
| Ruisseaux au plus bas au milieu de l'hiver dans le nord du Québec | Sections 2, 9 |
| Roue : pas recommandée l'hiver (glace) | Section 9 |
| Conduite enfouie sous le gel ; grille contre débris et glace | Section 9 |
| Génératrice c.c. à aimants permanents : plus de 80 % | Section 9 |
| Charge de délestage obligatoire : la génératrice à vide s'emballe | Section 9 |
| 9,8 kPa par mètre de colonne d'eau | Section 9 |
| Laisser 10 % du débit s'il y a du poisson | Section 9 |
