# Source — Primus Wind Power, manuel de la petite éolienne Air X : le freinage par court-circuit des fils de sortie, et ce qu'il ne fait pas

- **Organisme :** Primus Wind Power, Inc. (fabricant de petites éoliennes de charge de batteries,
  Lakewood, Colorado)
- **Document :** *Air X Owner's Manual — Installation, Operation, Maintenance* (version marine)
- **URL :** https://www.airwindpower.com/wp-content/uploads/2024/02/Air_X_Marine_Manual.pdf
- **Date de consultation :** 24 septembre 2026
- **Captation :** `curl`, HTTP 200, PDF enregistré : `sources/18b-primus-air-x-manuel.pdf` ;
  texte : `sources/18b-primus-air-x-manuel-texte.txt` (mise en page en deux colonnes)
- **Sert au chapitre :** 18b (section 9 D, « L'arrêter avant la tempête »). Lève le `[À VÉRIFIER —
  freinage d'un moteur à aimants mis en court-circuit, et ce qu'il supporte]`.

L'Air X porte, selon le même manuel, un alternateur triphasé sans balais à aimants permanents,
redressé dans la machine : ses deux fils de sortie sont en courant continu, comme ceux de la
dynamo du chapitre.

---

## Extraits intégraux

### Le frein par court-circuit (« Operating Modes », p. 25)

> « Braking Mode: Air X may be placed in braking mode by directly shorting the turbine positive and
> negative wires together or by the use of a stop switch. The stop switch first disconnects the
> turbine from the battery and then shorts the positive and negative wires. In very strong winds
> the blades may rotate slowly even with the switch activated. »

### Sans charge, elle s'emballe ; pour un arrêt long, on la couche ou on attache les pales (p. 25)

> « No Load Operation /Open Circuit /Free Spinning: Air X will spin freely if disconnected from an
> electrical load. This results in a cycle of rapid blade speed followed by rapid braking – this
> mode of operation may accelerate wear of the turbine and is also non-productive. To turn Air X
> off for short periods of time Primus Wind Power recommends using a properly installed switch. If
> your Air X will be shut down for an extended period of time Primus Wind Power recommends lowering
> the turbine completely or securing the blades to prevent rotation. »

### L'interrupteur : couper avant de relier (« 5-4 Stop Switch », p. 18)

> « Primus Wind Power recommends the use of a stop switch to provide a convenient and safe method
> for shutting down your Air X. [...] Install the switch as shown in Fig. 13. A "break then make"
> switch MUST be used or severe damage may occur. When wired as shown, Air X will operate normally
> with the switch in the "up" position and will be "off" in the "down" position. Do not leave
> switch in "middle" position; this will place Air X in an open circuit condition »

### Le grand vent (même page que le frein)

> « Stall Mode: [...] Air X will enter stall mode when a wind speed of 35 mph (15.6 m/s) is sensed
> [...] If a wind speed of 50 mph (22 m/s) is detected, the turbine will completely shut down for
> 5 minutes. »

---

## Ce que le chapitre en tire

- **Sourcé :** relier les deux fils de sortie freine la machine ; par très grand vent, les pales
  tournent encore lentement.
- **Sourcé :** l'interrupteur coupe d'abord la batterie, puis relie les fils ; un interrupteur qui
  relie avant de couper met la batterie en court-circuit (« severe damage »). Position du milieu =
  machine à vide, qui s'emballe.
- **Sourcé :** pour un arrêt long, le frein ne suffit pas : on couche la machine ou on attache les
  pales.
- **Non sourcé :** l'échauffement d'un moteur de tapis roulant à balais tenu en court-circuit ; le
  fabricant parle de sa machine, faite pour ça.
