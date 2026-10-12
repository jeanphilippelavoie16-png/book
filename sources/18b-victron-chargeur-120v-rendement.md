# Source — Victron Energy, fiche technique du chargeur Blue Smart IP22 de 120 V : rendement de 93 % (12 V) et 94 % (24 V)

- **Organisme :** Victron Energy (fabricant de chargeurs de batteries et d'onduleurs)
- **Document :** fiche technique « Chargeur Blue Smart IP22 », version 120 VCA, en français
- **URL :** https://www.victronenergy.com/upload/documents/Datasheet-Blue-Smart-IP22-Charger-120-VAC-FR.pdf
- **Date de consultation :** 24 septembre 2026
- **Captation :** `curl`, HTTP 200, PDF enregistré : `sources/18b-victron-chargeur-blue-smart-ip22-fiche-fr.pdf` ;
  texte : `sources/18b-victron-chargeur-blue-smart-ip22-fiche-fr-texte.txt`
- **Sert au chapitre :** 18b (étape 32). Lève le `[À VÉRIFIER — rendement d'un chargeur de 120 V]`.

---

## Extraits intégraux

> « Haute efficacité
> Avec une efficacité de jusqu'à 94 %, ces chargeurs génèrent jusqu'à quatre fois moins de chaleur
> par rapport à la norme du secteur.
> Et une fois que la batterie est entièrement rechargée, la consommation d'énergie est réduite à
> 0,5 Watt, près de cinq à dix fois mieux que les normes industrielles. »

Tableau des caractéristiques (l'extraction du PDF décale les libellés d'une ou deux lignes ; les
valeurs se lisent dans l'ordre des lignes du tableau) :

> « Chargeur Blue Smart IP22 — 12 V, 1 sortie / 12 V, 3 sorties — 15 / 20 / 30 A » ;
> « 24 V, 1 sortie / 24 V, 3 sorties — 8 / 12 / 16 A »
> « Plage de tension d'alimentation 110 – 120 VAC 50 – 60 Hz »
> « Rendement » : **« 93 % »** (modèles 12 V) ; **« 94 % »** (modèles 24 V)
> « Consommation d'énergie sans charge » : « 0,5 W »
> Tensions de charge 12 V : « Normale : 14,4 V Élevée : 14,7 V » (absorption) ;
> « Normale : 13,8 V » (float) ; « Normale : 13,2 V » (stockage)
> « -20 to +50 °C (puissance nominale complète en sortie jusqu'à 40 °C) »

---

## Ce que le chapitre en tire (calcul de vérification)

- **Sourcé :** un chargeur de 120 V moderne de 12 V rend **93 %** ; selon ce fabricant, les
  chargeurs ordinaires chauffent « jusqu'à quatre fois » plus, donc perdent davantage (non chiffré).
- **Calcul de l'étape 32 refait :** 1 L par kWh au quart de charge ÷ 0,80 (plomb) ÷ 0,93
  (chargeur) = **1,34 L par kWh manquant**, au lieu de 1,25 sans le chargeur.
  - Pire semaine, coffre dans la remise : 1,54 kWh × 1,34 = 2,07 L → « environ deux litres »
    tient.
  - Coffre à la cuisine : 6,2 kWh × 1,34 = 8,3 L → « plus de huit litres » au lieu de « près de
    huit litres ».
