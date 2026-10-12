# Source — Le mode économie (recherche) d'un onduleur : il s'endort sous un seuil de quelques watts, sonde la sortie par impulsions, et repart dès qu'une charge dépasse le seuil

Deux fabricants d'onduleurs, une seule question : **un onduleur en mode économie redémarre-t-il
seul quand le thermostat du coffre ferme le circuit du compresseur ?**

- **Date de consultation :** 24 septembre 2026
- **Sert au chapitre :** 18b (étape 4). Lève le `[À VÉRIFIER — réveil du mode économie par un
  compresseur]`.

---

## 1. Victron Energy — fiche technique des onduleurs Phoenix (déjà au dossier)

- **Organisme :** Victron Energy (fabricant d'onduleurs)
- **Document :** fiche technique « Phoenix Inverter » 12 V, 250 à 1 200 VA
- **Copie enregistrée :** `sources/18b-victron-onduleur-phoenix-fiche.pdf` (captée le 23 septembre
  2026), texte relu le 24 septembre 2026 par `pdftotext -layout`

> « ECO mode
> When in ECO mode , the inverter will switch to stan dby when the load decreases below a preset
> value (min load: 15W). Once in standby the inverter will switch on for a short period
> (adjustable, default: every 2,5 seconds) . If the load exceeds a preset level, the inverter will
> remain on. »

> « Default zero -load power in ECO mode (default retry interval: 2,5 s, adjustable) »
> (0,8 à 3,0 W selon le modèle) ; « ECO mode stop and start power setting — Adjustable »

## 2. Magnum Energy — manuel de l'onduleur-chargeur MS

- **Organisme :** Magnum Energy (fabricant d'onduleurs, groupe Sensata)
- **Document :** *MS Series Pure Sine Wave Inverter/Charger Owner's Manual*, 64-0007 rév. D
- **URL :** https://www.magnum-dimensions.com/sites/default/files/MagDocs/64-0007-Rev-D-MS-Series_Web.pdf
- **Captation :** `curl`, HTTP 200, PDF enregistré : `sources/18b-magnum-ms-onduleur-manuel.pdf` ;
  texte : `sources/18b-magnum-ms-onduleur-manuel-texte.txt`

> « Searching – When the inverter is ﬁrst turned ON, the automatic Search feature is enabled. This
> feature is provided to conserve battery power when AC power is not required. In this mode, the
> inverter pulses the AC output looking for an AC load (i.e., electrical appliance). Whenever an AC
> load (greater than 5 watts) is turned on, the inverter recognizes the need for power and
> automatically starts inverting. When there is no load (or less than 5 watts) detected, the
> inverter automatically goes back into Search mode to minimize energy consumption from the
> battery bank. »

> « Info: The factory default value for the Search feature is 5 watts. It can be turned off or
> adjusted from 5 to 50 watts using a remote display. »

> « Search Watts: This setting allows you to turn off the power-saving Search mode circuitry, or to
> adjust the power level at which the inverter will “wake up” and start inverting. »

> « Info: The inverter's AC output voltage will not be correct until a load greater than 5 watts
> (default setting) is connected to the inverter [...] A 10-25 watt light bulb is used as it is a
> sufﬁcient load to bring the inverter out of Search mode and up to full voltage. »

---

## Ce que le chapitre en tire

- **Sourcé (deux fabricants) :** en mode économie, l'onduleur dort sous un seuil réglable de 5 à
  15 W, envoie une courte impulsion toutes les 2,5 s environ, et repart **dès qu'une charge
  dépassant le seuil est mise en marche**. Un compresseur de coffre, à une centaine de watts, est
  très au-dessus du seuil.
- **Ce que les sources ne disent pas :** aucune ne nomme le compresseur ni le thermostat. La
  détection d'un moteur par l'impulsion n'est pas décrite ; l'essai d'une journée au wattmètre
  (étape 3) reste ce qui tranche pour le coffre qu'on a.
- **Conséquence du seuil (raisonnement de vérification) :** un appareil qui tire plus que le seuil
  même au repos — commande électronique, afficheur, lampe — garde l'onduleur éveillé tout le
  temps, et le mode économie ne sauve plus rien.
