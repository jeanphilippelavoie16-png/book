# LearnEMC — Le couplage par impédance commune (fil de retour partagé)

- **Organisme :** LearnEMC, LLC (site de formation en compatibilité électromagnétique)
- **Titre de la page :** « LearnEMC - Introduction to Common Impedance Coupling »
- **URL consultée :** https://learnemc.com/common-impedance-coupling
- **Consultée le :** 23 septembre 2026
- **Sert dans :** chapitre 21 — Le voisinage et le groupe de chasse, section « Le fil entre deux
  bâtiments, sans pile », pourquoi la sonnerie a ses deux fils à elle

---

## Extraits intégraux

> « Common impedance coupling (also called conducted coupling) may occur anytime a source circuit
> and a victim circuit share part of their respective current paths. »

> « However, a small amount of impedance in the shared wire causes a voltage to appear across R L2
> when there is a signal in Circuit 1 and vice versa. »

> « If the 9-wire ribbon cable is replaced with a 10-wire ribbon cable and the extra wire is used
> as an additional signal return, the resistance of the common return path is cut in half. »

---

## Mécanisme que le chapitre tire de cette source

Deux circuits qui partagent un fil de retour se couplent par la résistance de ce fil : le courant
de l'un fait une tension dans le fil commun, et cette tension apparaît dans l'autre. Dans le
téléphone de fil, le circuit source est la sonnerie (courant continu de la batterie), le circuit
victime est la paire de haut-parleurs : pendant qu'on sonne, un courant continu passe dans les
bobines des haut-parleurs et la membrane saute. Le remède de la source est de ne pas partager le
retour ; à défaut, réduire le courant qui passe dans le fil commun, ce que fait le relais.
