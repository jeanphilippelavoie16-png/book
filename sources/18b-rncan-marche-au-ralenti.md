# Source — Ressources naturelles Canada, « La marche au ralenti gaspille du carburant et de l'argent »

- **Organisme :** Ressources naturelles Canada, Office de l'efficacité énergétique
- **URL :** https://oee.nrcan.gc.ca/transports/marche-au-ralenti/gaspille.cfm?attr=8
- **Date de consultation :** 2026-09-23
- **Captation :** `curl`, page enregistrée : `sources/18b-rncan-marche-au-ralenti.html`
- **Sert au chapitre :** 18b (section 9 — charger au camion)

---

## Extrait intégral

> « Un véhicule moyen équipé d'un moteur de trois litres gaspille 300 millilitres (plus d'une
> tasse) de carburant par 10 minutes de marche au ralenti, et un demi-litre (plus de deux tasses)
> s'il a un moteur de 5 litres. »

## Calcul du rédacteur

| Moteur | Au ralenti |
| --- | --- |
| 3 L | 0,3 L / 10 min = **1,8 L/h** |
| 5 L | 0,5 L / 10 min = **3 L/h** |

À comparer à la génératrice à onduleur de 1 800 W : **0,44 L/h** au quart de charge
(`sources/18b-generatrice-consommation-fiche-technique.md`). Le camion au ralenti brûle quatre à
sept fois plus d'essence à l'heure, pour un courant de charge qui dépend de son alternateur
(`sources/18b-bosch-alternateurs-courbes.md`). Le chapitre compare les litres par heure, qui
sont sourcés ; il ne publie pas de kWh par litre pour le camion, parce que le courant réellement
livré à la batterie du chalet n'est pas sourcé pour un véhicule donné.
