# CNB 2015, tableau C-2 (annexe C) — charges de neige au sol, Côte-Nord

- **Origine réelle de la donnée :** Conseil national de recherches du Canada (CNRC), **Code
  national du bâtiment – Canada 2015**, division B, **annexe C, tableau C-2**.
- **Document consulté :** cecobois (Centre d'expertise sur la construction commerciale en bois),
  « Données climatiques des villes au Québec selon le CNB 2015 — Charge de neige et pression de
  vent horaire (par ville) », 12 mai 2022, 4 pages.
- **URL :** https://cecobois.com/wp-content/uploads/2022/05/220512-Donnees-climatiques-des-villes-au-Quebec-selon-le-CNB-2015-par-ville.pdf
- **Date de consultation :** 2026-09-20
- **Captation :** de première main, `WebFetch` (HTTP 200, PDF 806 ko) puis extraction du texte par
  `pypdf`. Tableau complet obtenu.
- **Chapitre qui s'en sert :** 87 — Assemblages bois-bois (sections 2, **8 — encadré DANGER**, 10)

## ⚠ Restriction de reproduction, à porter à l'éditeur

Le document porte son propre avis :

> « La charge de neige et les pressions de vent horaires pour les villes dont la source au tableau
> est CNB (Code national du bâtiment - Canada), proviennent du **tableau C-2 de l'annexe C de la
> division B du CNB 2015**. Leurs publications sur le site internet de cecobois ont été
> autorisées par le Conseil national de recherches du Canada (CNRC). **Aucune reproduction ou
> publication de ces informations ne sont autorisées sans le consentement par écrit du CNRC.** »

> « La charge de neige et les pressions de vent horaires pour les villes dont la source au tableau
> est **SMC** (Service météorologique du Canada), ont été obtenues de la Section des services
> climatiques pour le génie […] Aucune reproduction ou publication de ces informations ne sont
> autorisées sans le consentement par écrit de cecobois. »

**Conséquence éditoriale, à trancher avant impression :** le chapitre 87 cite **deux valeurs**
(Sept-Îles et Baie-Comeau), attribuées au CNB 2015, dans un encadré de sécurité, pour établir un
ordre de grandeur — pas une table de calcul. Si le livre est un jour vendu, l'éditeur demande
l'autorisation écrite au CNRC, ou remplace les deux valeurs par la consigne « ouvrir le tableau
C-2 pour sa propre localité ». **Le chapitre est écrit pour que cette substitution soit possible
sans rien réécrire d'autre.**

---

## Valeurs relevées le 2026-09-20 — Côte-Nord et pourtour

Colonnes du document : **S<sub>s</sub>** = charge de neige au sol, en kPa (période de retour
1/50) · **S<sub>r</sub>** = charge de pluie associée, en kPa.

| Localité | Source au tableau | S<sub>s</sub> (kPa) | S<sub>r</sub> (kPa) |
| --- | --- | --- | --- |
| Tadoussac | CNB | 3,7 | 0,4 |
| Les Escoumins | SMC | 3,5 | 0,4 |
| Forestville | SMC | 4,7 | 0,4 |
| **Baie-Comeau** | **CNB** | **4,3** | 0,4 |
| Port-Cartier | CNB | 4,1 | 0,4 |
| **Sept-Îles** | **CNB** | **4,1** | 0,4 |
| Havre-St-Pierre | CNB | 4,1 | 0,6 |
| Natashquan | SMC | 4,8 | 0,6 |
| Blanc-Sablon | SMC | 5,4 | 0,6 |
| Schefferville | CNB | 4,5 | 0,3 |
| *(comparaison)* Montréal-secteur Brossard | CNB | 2,4 | 0,4 |

**Écart utile au chapitre :** la Côte-Nord porte de 3,5 à 5,4 kPa au sol, contre 2,4 kPa dans la
région de Montréal. Un ouvrage conçu d'après un plan trouvé ailleurs est sous-dimensionné ici,
d'un facteur qui approche deux.

## Conversion faite par le livre

1 kPa = 1 000 N/m² ; ÷ 9,80665 m/s² = 101,97 kg/m².

- 4,1 kPa → **418 kg/m²** (Sept-Îles, Port-Cartier, Havre-St-Pierre)
- 4,3 kPa → **438 kg/m²** (Baie-Comeau)
- 4,8 kPa → **489 kg/m²** (Natashquan)
- 5,4 kPa → **551 kg/m²** (Blanc-Sablon)

Sur un appentis de 3 m × 4 m = 12 m², à 4,1 kPa au sol : **environ 5 000 kg**. C'est le chiffre
de l'encadré DANGER, et il est présenté comme un ordre de grandeur, pas comme une charge de
calcul.

## ⚠ La distinction que le chapitre **doit** tenir, et qui est le piège de cette fiche

**S<sub>s</sub> est la charge de neige au SOL, pas la charge sur un TOIT.** Le CNB calcule la
charge de toit S à partir de S<sub>s</sub> et de plusieurs coefficients (importance, base,
exposition au vent, pente et glissement, accumulation). Selon le cas, la charge de toit est
**plus faible** que S<sub>s</sub> — un toit à forte pente et bien exposé perd sa neige — ou
**beaucoup plus forte** — un creux entre deux versants, un appentis au pied d'un mur, le côté
sous le vent d'un bâtiment, où la neige s'accumule.

Le chapitre 87 :

1. nomme S<sub>s</sub> comme **charge au sol** chaque fois qu'il l'écrit ;
2. ne fait **aucun** calcul de charge de toit ;
3. renvoie au Code de construction du Québec en vigueur et à la Régie du bâtiment du Québec
   (RBQ) pour tout assemblage qui porte ;
4. se sert du chiffre pour une seule chose : établir qu'un toit de la Côte-Nord porte des
   **centaines de kilogrammes par mètre carré**, donc qu'un assemblage bricolé sous un toit n'est
   pas un détail de menuiserie.

**Si le vérificateur juge que même cet usage prête à confusion, la solution est de retirer les
deux valeurs chiffrées et de garder la phrase de renvoi.** Le reste de l'encadré tient sans elles.

## Ce que ce document ne donne pas

- Aucun coefficient de calcul (I<sub>s</sub>, C<sub>b</sub>, C<sub>w</sub>, C<sub>s</sub>,
  C<sub>a</sub>). Il ne publie que les données climatiques brutes par ville.
- **Aucune valeur pour un lieu hors des villes listées.** Le chalet de JP n'est pas une ville du
  tableau ; le chapitre dit de prendre la localité inscrite la plus proche **et la plus
  défavorable**, et de le faire vérifier.
- Aucune donnée sur les charges de neige sur un abri temporaire, une tente-garage ou un appentis.
