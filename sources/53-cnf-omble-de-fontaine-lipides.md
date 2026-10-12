# Santé Canada — Fichier canadien sur les éléments nutritifs : truite mouchetée (omble de fontaine) et truites, crues

- **Organisme :** Santé Canada, Fichier canadien sur les éléments nutritifs (FCÉN)
- **Accès :** interface de programmation publique du FCÉN
  - liste des aliments : https://food-nutrition.canada.ca/api/canadian-nutrient-file/food/?lang=fr&type=json
  - valeurs par aliment : https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientamount/?id=7234&lang=fr&type=json
    (même adresse avec id=3204, 3205, 3230)
  - interface de recherche : https://food-nutrition.canada.ca/cnf-fce/?lang=fre
- **Consultée le :** 24 septembre 2026
- **Captation :** `curl`, réponses JSON intégrales enregistrées dans
  `53-cnf-truites-omble-nutriments.json` (toutes les valeurs des quatre aliments)
- **Sert au chapitre :** 53 — Truite et omble au lac (§3, teneur en lipides)

---

## Les aliments du FCÉN qui répondent à « truite », « omble », « touladi » (liste intégrale, en français)

> 3058 Poisson, truite de mer, espèces diverses, crues *(en anglais : « seatrout (weakfish) » —
> ce n'est pas une truite, c'est un poisson de mer)*
> 3186 Poisson, truite, arc-en-ciel, élevage, crue
> 3204 Poisson, truite, espèces diverses, crues
> 3205 Poisson, truite, arc-en-ciel, sauvage, crue
> 3230 Poisson, omble chevalier, autochtone, viande, cru
> 5840 Poisson, omble chevalier, autochtone, viande et peau, crues
> **7234 Poisson, truite mouchetée, crue** (« Fish, trout, brook, raw »)

**Aucune entrée « touladi », « truite grise » ou « lake trout »** dans les 5 690 aliments du
fichier (recherche faite sur les deux listes, française et anglaise).

## Valeurs pour 100 g de partie comestible (extraits de la réponse JSON)

| Aliment | Lipides totaux | Protéines | Eau | Énergie |
| --- | --- | --- | --- | --- |
| **7234 — Truite mouchetée, crue** | **2,73 g** | 21,23 g | 75,67 g | 110 kcal |
| 3205 — Truite arc-en-ciel sauvage, crue | 3,46 g | 20,48 g | 71,87 g | 119 kcal |
| 3230 — Omble chevalier (autochtone), viande, cru | 2,65 g | 19,5 g | 77,0 g | 103 kcal |
| 3204 — Truite, espèces diverses, crues | 6,61 g | 20,77 g | 71,42 g | 148 kcal |

Acides gras de la truite mouchetée crue (7234) : saturés 0,595 g, monoinsaturés 0,815 g,
polyinsaturés 0,772 g par 100 g.

## Le touladi : une seule source, et elle ne donne pas de valeur au 100 g

USGS (U.S. Geological Survey, agence fédérale américaine), notice de publication
https://pubs.usgs.gov/publication/1000151, consultée le 24 septembre 2026 :
Eschmeyer, P. H. et A. M. Phillips Jr., 1965, « Fat content of the flesh of siscowets and lake
trout from Lake Superior », *Transactions of the American Fisheries Society*. Résumé :

> « Chemical analysis of the samples revealed a range in fat content (dry weight) of 32.5 to
> 88.8 per cent in siscowets and 6.6 to 52.3 per cent in lake trout. »

Le résumé ajoute que la teneur en gras **augmente avec la taille** du poisson dans les deux
formes. Ce sont des pourcentages **du poids sec**, sur des touladis du lac Supérieur : ils ne se
convertissent pas en grammes pour 100 g de chair fraîche sans la teneur en eau des mêmes
échantillons, que le résumé ne donne pas.

## Ce que la fiche permet d'écrire

- Omble de fontaine cru : **2,7 g de lipides pour 100 g**, 21 g de protéines, 110 kcal. C'est un
  poisson **maigre** au sens du ch. 24 : 100 g apportent huit fois plus de protéines que de
  gras en masse.
- Touladi : **aucune valeur au 100 g** trouvée ; la teneur varie énormément et croît avec la
  taille.
