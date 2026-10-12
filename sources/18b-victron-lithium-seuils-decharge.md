# Source — Victron Energy, manuel des batteries Lithium Smart : l'état de charge ne se calcule pas dans la batterie ; alerte à 3,10 V par élément, coupure des charges à 2,80 V

- **Organisme :** Victron Energy (fabricant de batteries lithium-fer-phosphate et d'onduleurs)
- **Document :** *Lithium Smart Battery Manual* (12,8 V et 25,6 V)
- **Copie intégrale déjà enregistrée :** `sources/18b-victron-lithium-smart-manuel.pdf` (fiche maître :
  `sources/18b-victron-lithium-smart-manuel.md`)
- **Relu le :** 24 septembre 2026, texte extrait du PDF enregistré avec `pdftotext -layout`
- **Sert au chapitre :** 18b (étape 31, seuil de bascule d'un banc au lithium ; section 3, capacité
  au froid). Recherche pour le `[À VÉRIFIER — tension ou état de charge de bascule, batterie de JP]`.

---

## Extraits intégraux

### L'état de charge : pas dans la batterie, au moniteur (§3.5)

> « The common battery parameters, such as the battery voltage, battery temperature and cell
> voltages can be monitored via Bluetooth using the VictronConnect app. However, state of charge
> monitoring is not built into the battery. To monitor state of charge use the Lynx Smart BMS or
> add a battery monitor such as a BMV or a SmartShunt to the system. »

> « If a battery monitor is used together with a lithium battery, adjust the following two
> settings: • Set the charge efficiency to 99% • Set the Peukert exponent to 1.05 »

### L'alerte avant la coupure (§4.7.4)

> « A pre-alarm signal is sent to the BMS when the cell voltage drops below this threshold. The
> purpose of the pre-alarm is to warn the user that the system is about to shut down due to
> undervoltage. »

> « The default value is 3.10 V, and the range is 2.80V to 3.15V. »

> « If the pre-alarm threshold is set at a higher voltage, the warning will come earlier than when
> set at a lower voltage. An earlier warning will give the user more time to take action and avert
> the imminent shutdown. In any case, there are at least 30 seconds between pre-alarm and system
> shutdown. »

### La coupure des charges (§4.7.5)

> « A lithium battery cell will be damaged if the cell voltage drops too low. To avoid this, the
> BMS will disable all loads by sending a signal to the load or the load disconnection device as
> soon as one of the cells reaches the set Allowed-To-Discharge voltage threshold. »

> « Default value (the lowest battery cell voltage at which discharging the battery is
> disallowed): 2.80V (range 2.60 to 2.80V) »

### Le froid et la capacité (§5)

> « The temperature affects the battery capacity. The nominal capacity data of the respective
> battery model in the datasheet is based on 25°C at a discharge rate of 1C. These numbers are
> reduced by ~20% at 0°C and reduce even further to ~50% at -20°C. However, since SoC is not
> calculated in the battery but in the battery monitor, which therefore does not show the actual
> SoC, it is much more important to keep an eye on the battery and cell voltages when discharging
> at low temperatures. »

### La profondeur de décharge et la durée de vie

> « The depth of discharge has a decisive influence on the service life of the lithium battery.
> The higher the depth of discharge, the lower the number of possible charge cycles. »

---

## Ce que le chapitre en tire

- **Sourcé :** une batterie de 12,8 V compte quatre éléments. Alerte par défaut à 3,10 V par
  élément, soit **12,4 V** ; coupure des charges à 2,80 V par élément, soit **11,2 V** (calcul :
  × 4). Entre l'alerte et la coupure, au moins 30 secondes, pas davantage de garanti.
- **Sourcé :** l'état de charge d'un banc au lithium ne se lit qu'à un moniteur de batterie ; au
  froid (80 % de la capacité à 0 °C, 50 % à -20 °C), ce moniteur surestime, et ce sont les
  tensions qui comptent.
- **Non sourcé, et propre à JP :** les réglages de sa batterie à lui, et le seuil qu'il choisit.
