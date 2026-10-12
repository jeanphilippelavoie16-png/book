# Source — Victron Energy (fabricant néerlandais d'équipement hors réseau) : batterie lithium-fer-phosphate, onduleur Phoenix, guide de câblage *Wiring Unlimited*

- **Organisme :** Victron Energy B.V. (fabricant)
- **Date de consultation :** 2026-09-23
- **Captation :** `curl`, texte extrait par `pdftotext`
- **Sert au chapitre :** 18b (sections 2, 3, 4, 5.1, 5.4, 6, 7)

---

## 1. Fiche des batteries lithium-fer-phosphate 12,8 V et 25,6 V « Smart »

- **URL :** https://www.victronenergy.com/upload/documents/Datasheet-12,8-&-25,6-Volt-lithium-iron-phosphate-batteries-Smart-EN.pdf
- **Enregistré :** `sources/18b-victron-lifepo4-fiche.pdf`

> « Operating conditions — Discharge: -20 °C to +50 °C Charge: +5 °C to +50 °C »

Température d'entreposage : « -45 °C to +70 °C ».

> « The round-trip energy efficiency (discharge from 100 % to 0 % and back to 100 % charged) of
> the average lead-acid battery is 80 %. The round-trip energy efficiency of a LFP battery is
> 92 %. »

> « The charge process of lead-acid batteries becomes particularly inefficient when the 80 %
> state of charge has been reached, resulting in efficiencies of 50 % or even less in solar
> systems where several days of reserve energy is required (battery operating in 70 % to 100 %
> charged state). »

> « A lead-acid battery will fail prematurely due to sulfation: If it operates in deficit mode
> during long periods of time (i.e. if the battery is rarely, or never at all, fully charged). »

> Le système de gestion (BMS) doit « Stop the charging process whenever the voltage of a battery
> cell increases to more than 3.75 V or when the temperature becomes too high or too low. »

## 2. Fiche des onduleurs Phoenix VE.Direct 250 VA à 1 200 VA

- **URL :** https://www.victronenergy.com/upload/documents/Datasheet-Phoenix-Inverter-VE.Direct-250VA-1200VA-EN.pdf
- **Enregistré :** `sources/18b-victron-onduleur-phoenix-fiche.pdf`

| Modèle 12 V | 12/800 | 12/1200 |
| --- | --- | --- |
| Puissance continue à 25 °C / 40 °C | 650 / 560 W | 1 000 / 850 W |
| Pointe | 1 500 W | 2 200 W |
| Rendement maximal | 90 % | 91 % |
| **Consommation à vide** | **6,5 W** | **10 W** |
| Consommation à vide en mode ECO | 1 W | 1 W |
| Plage de température | -40 à +65 °C | |

## 3. *Wiring Unlimited* (guide de câblage)

- **URL :** https://www.victronenergy.com/upload/documents/Wiring-Unlimited-EN.pdf (29 Mo ; seul le
  texte est enregistré : `sources/18b-victron-wiring-unlimited-texte.txt`)

> « copper = 1.7 x 10-8 Ωm »

> « we advise aiming for a voltage drop no bigger than 2.5% » — 12 V : 0,3 V.

> Résistances ajoutées : « Each cable connection: 0.06mΩ » ; « A 150A fuse: 0.35mΩ ».

> « The correct way of connecting multiple batteries in parallel is to ensure that the total path
> of the current in and out of each battery is equal. » Quatre façons correctes : barres
> omnibus, bornes communes à câbles de même longueur, à mi-chemin, « Connect diagonally ».

> « Current will always choose the path of least resistance. Most of the current will therefore
> travel through the bottom battery. »

> « Lithium batteries can deliver very high short-circuit currents. [...] at least one fuse in
> the DC line must have an interrupt rating equal to or greater than the maximum prospective
> short circuit current of the battery bank. »

> « Inductive loads are loads with coils, like electromotors or transformers. Examples are:
> refrigerators, compressors »

### Tableau des câbles (chute de 0,259 V, longueur **totale** plus + moins)

| Section (mm²) | 5 m | 10 m | 15 m | 20 m |
| --- | --- | --- | --- | --- |
| 2,5 | 7,5 A | 3,8 A | 2,5 A | 1,9 A |
| 4 | 12 A | 6 A | 4 A | 3 A |
| 6 | 18 A | 9 A | 6 A | 5 A |
| 10 | 30 A | 15 A | 10 A | 8 A |
| 16 | 48 A | 24 A | 16 A | 12 A |
| 25 | 75 A | 38 A | 25 A | 19 A |
| 35 | 105 A | 53 A | 35 A | 26 A |
| 50 | 150 A | 75 A | 50 A | 38 A |
| 70 | 210 A | 105 A | 70 A | 53 A |
| 95 | 285 A | 143 A | 95 A | 71 A |

(Alignement des colonnes reconstitué par le rédacteur et vérifié par le calcul :
0,259 V ÷ (1,7 × 10⁻⁸ × longueur ÷ section) redonne chaque valeur.)

> « For a quick and general calculation for cables up to 5 meters [...] if the current is 200A,
> then the cable needs to be: 200/3 = 66mm2 »

### Correspondance AWG — mm² (extrait)

| AWG | mm² |
| --- | --- |
| 4/0 | 107 |
| 2/0 | 67,4 |
| 1/0 | 53,5 |

---

## Chiffres retenus pour le chapitre 18b

| Chiffre | Usage |
| --- | --- |
| Lithium-fer-phosphate : charge de +5 à +50 °C, décharge de -20 à +50 °C | Sections 2, 3, 5.4 |
| Rendement aller-retour : plomb 80 %, lithium 92 % | Section 3 |
| Plomb au-dessus de 80 % de charge : rendement de charge 50 % ou moins | Sections 3, 5.5 |
| Onduleur de 800 VA : 6,5 W à vide ; 1 200 VA : 10 W | Sections 2, 5.1 |
| Chute visée : 2,5 %, soit 0,3 V en 12 V | Section 5.4 |
| Tableau des câbles | Section 5.4 |
| Branchement en diagonale des batteries en parallèle | Section 5.4 |
