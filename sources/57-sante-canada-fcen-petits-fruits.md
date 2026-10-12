# Santé Canada — Fichier canadien sur les éléments nutritifs (FCÉN), petits fruits

- **Organisme :** Santé Canada
- **Base de données :** Fichier canadien sur les éléments nutritifs (FCÉN / CNF)
- **Portail :** https://food-nutrition.canada.ca/cnf-fce/?lang=fr
- **Interface interrogée (API publique) :**
  - liste des aliments : `https://food-nutrition.canada.ca/api/canadian-nutrient-file/food/?lang=fr&type=json`
  - valeurs d'un aliment : `https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientamount/?lang=fr&type=json&id=<code>`
- **Date de consultation :** 2026-09-20 (API fonctionnelle ce jour-là ; elle donnait des erreurs
  500 au chapitre 44 — **la panne est levée**, à signaler aux ch. 24 et 44)
- **Base de calcul :** toutes les valeurs sont **par 100 g d'aliment cru**
- **Chapitre qui l'utilise :** 57 — Petits fruits (sections 1, 3, 6, 10)

---

## Extrait intégral — valeurs captées

### Codes trouvés dans la liste des aliments (descriptions françaises exactes)

| Code | Description française | Capté en détail |
| --- | --- | --- |
| 1705 | Bleuet, cru | oui |
| 1518 | Bleuet, conserve, sirop épais, solides et liquide | non |
| 1519 | Bleuet, congelé, sucré | non |
| 1538 | Canneberge, crue | oui |
| 1544 | Sureau, baie, crue | oui |
| 1560 | Groseille à maquereau, crue | oui |
| 1561 | Groseille à maquereau, conserve, dans du sirop léger | non |
| 1676 | Framboise, conserve, dans du sirop épais, solides et liquide | non |
| 1677 | Framboise, congelée, sucrée | non |
| 1685 à 1687 | Fraise, conserve / congelée sucrée (entière, tranchée) | non |
| 1526 à 1536 | Cerises, diverses préparations | non |

### Valeurs par 100 g

| Aliment | Vitamine C (mg) | Fibres (g) | Sucres (g) | Eau (g) | Énergie (kcal) | Obs. vit. C |
| --- | --- | --- | --- | --- | --- | --- |
| **Bleuet, cru** (1705) | **9,7** | 2,59 | 9,96 | 84,21 | 57 | 4 |
| **Canneberge, crue** (1538) | **13,3** | 4,6 | 4,04 | 87,13 | 46 | 4 |
| **Groseille à maquereau, crue** (1560) | **27,7** | 4,3 | n. d. | 87,87 | 44 | 11 |
| **Sureau, baie, crue** (1544) | **36,0** | 7,0 | n. d. | 79,8 | 73 | **0** |

Autres valeurs du bleuet cru (1705) : protéines 0,74 g · lipides 0,33 g · glucides 14,49 g ·
potassium 77 mg · phosphore 12 mg · fer 0,28 mg · **vitamine K 19,3 µg** (8 obs.) ·
**manganèse 0,336 mg** (8 obs.) · vitamine B-6 0,052 mg · niacine 0,418 mg.

Fer du sureau (1544) : 1,6 mg, **0 observation**.

---

## Réserves de captation — à lire avant d'utiliser un de ces chiffres

1. **Le FCÉN ne nomme aucune espèce.** « Bleuet, cru » ne dit ni *Vaccinium angustifolium*
   (le bleuet sauvage de la Côte-Nord), ni *V. myrtilloides*, ni le bleuet cultivé en corymbe.
   « Canneberge, crue » ne distingue pas *V. macrocarpon* (cultivée) de *V. oxycoccos* (l'atoca
   des tourbières). **Ce sont des ordres de grandeur, pas des mesures locales.** Le chapitre 57
   les présente comme tels et ne fait porter aucune décision de sécurité par ces valeurs.
2. **Le code 1544 (sureau) a 0 observation** sur la vitamine C, les fibres, l'eau, l'énergie et
   le fer : ce sont des valeurs **imputées**, pas des moyennes d'analyses. Elles sont utilisées
   **avec cette mention** dans le chapitre. Et l'entrée ne dit pas de quel sureau il s'agit :
   le **sureau rouge** (*Sambucus racemosa*), qui est le sureau commun de la forêt boréale, ne
   se mange pas dans les mêmes conditions que le sureau du Canada. **Ne pas traiter ce 36 mg
   comme une autorisation de manger du sureau rouge cru.**
3. **Aucune entrée trouvée** pour la **chicouté** (*Rubus chamaemorus*), l'**airelle
   vigne-d'Ida** (*V. vitis-idaea*), la **camarine noire** (*Empetrum nigrum*), l'**amélanchier**,
   le **pimbina**, le **cynorrhodon** ni la **gadelle sauvage**. Les quatre premières sont
   pourtant les fruits qui portent l'automne de la Côte-Nord. **La composition des fruits
   boréaux sauvages n'est donc pas sourcée dans ce livre**, et le chapitre le dit.
4. Le FCÉN ne donne **aucun pH**. L'acidité des fruits sauvages boréaux reste non mesurée.

## Calculs faits par le livre à partir de ces valeurs

Explicitement signalés comme calculs dans le chapitre, pas comme valeurs publiées :

- **930 g de bleuets par jour** pour couvrir l'ANR de vitamine C d'un homme adulte (90 mg ÷
  9,7 mg/100 g × 100). ANR : `sources/12-sante-canada-vitamine-c-anref.md`.
- **260 g** pour l'ANR d'un enfant de 4 à 8 ans (25 mg).
- **570 kcal et environ 100 g de sucres par kilogramme** de bleuets frais (57 kcal et 9,96 g
  par 100 g).
