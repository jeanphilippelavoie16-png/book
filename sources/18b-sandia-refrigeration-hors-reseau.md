# Source — Sandia National Laboratories, « Analysis of Refrigeration Units in Off Grid PV/Wind Hybrid Systems on Tribal Land » (SAND2018-12534 R)

- **Organisme :** Sandia National Laboratories (laboratoire du département de l'Énergie des
  États-Unis), rapport publié sur energy.gov
- **Auteur :** Manuelito Chief (University of Denver), sous la direction d'Anthony Martino et
  Sandra Begay (Sandia), août 2018
- **URL :** https://www.energy.gov/sites/prod/files/2018/11/f57/Chief-2018-refrigeration-units.pdf
- **Date de consultation :** 2026-09-23
- **Captation :** `curl`, PDF enregistré : `sources/18b-sandia-refrigeration-hors-reseau.pdf`
- **Sert au chapitre :** 18b (sections 3, 4, 7, 9). **Lève le `[À VÉRIFIER — multiple exact]`
  du ch. 69, §9.**

---

## Extraits intégraux

### La pointe de démarrage du compresseur

> « In the system with refrigeration units, the starting current of the conventional
> refrigerator needs to be taken into consideration, which is typically three times the running
> current. Therefore, the inverter needs to be chosen to ensure the inverter can supply power to
> the refrigerator as well as the surges it may require. »

> « the refrigerator will require a large surge of current each time it starts the motor. »

### L'onde de l'onduleur

> « Inexpensive inverters will have an approximation of a sine wave. [...] Appliances, such as a
> refrigerator, will also have problems, including not running as efficiently in comparison to
> if it were being supplied a pure sine wave. For this reason, an area of consideration is
> ensuring that an inverter is chosen with a pure sine wave output and that satisfies the
> required peak (surge) power requirements. »

### Le compresseur à courant continu

> « This type of compressor does not require an AC power supply. [...] In a PV/Wind system, this
> allows the refrigerator to operate without the need for an inverter. This eliminates the
> losses in power conversion in the inverter from DC to AC, which ranges between 2% and 10% at
> best. »

> « There have been cases where a conventional refrigerator was modified to use a DC
> compressor. »

> « A refrigerator with a DC compressor would be desirable in an off-grid PV/Wind system. This
> would allow the refrigerator to be connected directly to the charge controller, eliminating
> the need for an inverter to convert from DC to AC. »

---

## Chiffres retenus pour le chapitre 18b

| Chiffre | Extrait porteur |
| --- | --- |
| **Pointe de démarrage : typiquement 3 fois le courant de marche** | « typically three times the running current » |
| Onduleur à onde sinusoïdale pure pour un compresseur | « ensuring that an inverter is chosen with a pure sine wave output » |
| Perte de l'onduleur : 2 % à 10 % au mieux | « ranges between 2% and 10% at best » |

**Note.** « Typiquement » n'est pas « au plus ». Le chapitre écrit « au moins trois fois » pour
dimensionner l'onduleur, ce qui va dans le sens prudent.
