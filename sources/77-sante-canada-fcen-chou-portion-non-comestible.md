# Santé Canada — Fichier canadien sur les éléments nutritifs : portion non comestible du chou

- **Organisme :** Santé Canada
- **Base de données :** Fichier canadien sur les éléments nutritifs (FCÉN / CNF)
- **Portail :** https://food-nutrition.canada.ca/cnf-fce/?lang=fr
- **Interface interrogée (API publique, table des « portions non comestibles ») :**
  - https://food-nutrition.canada.ca/api/canadian-nutrient-file/refuseamount/?lang=fr&type=json&id=2361
  - https://food-nutrition.canada.ca/api/canadian-nutrient-file/refuseamount/?lang=en&type=json&id=2361
  - https://food-nutrition.canada.ca/api/canadian-nutrient-file/refuseamount/?lang=fr&type=json&id=2034
  - https://food-nutrition.canada.ca/api/canadian-nutrient-file/refuseamount/?lang=en&type=json&id=2034
- **Réponses enregistrées :** `77-sante-canada-fcen-chou-portion-non-comestible.json` (les quatre
  réponses, telles quelles, bout à bout)
- **Consultée le :** 24 septembre 2026, `curl`, HTTP 200 sur les quatre appels
- **Sert au chapitre :** 77 — Fermentation (§5-C, rendement chou entier → chou paré)
- **Même base que :** `77-sante-canada-fcen-vitamine-c-et-sodium-legumes.md` (codes 2361 et 2034)

---

## Extraits intégraux (réponses JSON)

Code 2361, français :

> `[{"refuse_amount":20.0,"food_code":2361,"food_description":"Chou, cru","refuse_name":"portion non comestible totale"}]`

Code 2361, anglais :

> `[{"refuse_amount":20.0,"food_code":2361,"food_description":"Cabbage, raw","refuse_name":"total refuse"}]`

Code 2034, français :

> `[{"refuse_amount":20.0,"food_code":2034,"food_description":"Chou rouge, cru","refuse_name":"feuilles extérieures, noyau et parures"},{"refuse_amount":20.0,"food_code":2034,"food_description":"Chou rouge, cru","refuse_name":"portion non comestible totale"}]`

Code 2034, anglais :

> `[{"refuse_amount":20.0,"food_code":2034,"food_description":"Cabbage, red, raw","refuse_name":"outer leaves, core and trimmings"},{"refuse_amount":20.0,"food_code":2034,"food_description":"Cabbage, red, raw","refuse_name":"total refuse"}]`

`refuse_amount` est un pourcentage du poids de l'aliment tel qu'acheté.

---

## Ce que la base établit

- **Chou cru : 20 % de portion non comestible.** Pour le chou rouge, la base nomme ce qui part :
  « feuilles extérieures, noyau et parures », 20 %.
- Rendement chou entier → chou paré : **80 %**.

## Calcul du livre (aucun chiffre neuf)

- 90 kg de chou paré ÷ 0,80 = **112,5 kg** de chou entier, écrit « environ 115 kg ».

## Ce que la base NE dit PAS

- Rien sur un chou de jardin nordique, gros ou petit, ni sur un chou gelé en surface ; la valeur
  est une moyenne de la base.
