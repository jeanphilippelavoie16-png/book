# Source — Robert Bosch GmbH, catalogue technique « Starters & Alternators » (courbes caractéristiques des alternateurs)

- **Organisme :** Robert Bosch GmbH (fabricant), catalogue technique et de pièces
- **URL de captation :** http://www.unofficialbmw.com/images/bosch_alternators_starters.pdf
  (hébergement d'un club d'amateurs ; le contenu est le catalogue Bosch, pages techniques « BA »)
- **Date de consultation :** 2026-09-23
- **Captation :** `curl`, PDF enregistré : `sources/18b-bosch-alternateurs-demarreurs.pdf`, texte
  extrait par `pdftotext`
- **Sert au chapitre :** 18b (section 9 — l'alternateur du camion, le petit moteur, le ruisseau)

---

## Extraits intégraux

> « n0 0-Ampere speed — The 0-Ampere speed is the speed (approx. 1000 min-1) at which the
> alternator reaches its rated voltage without delivering power. [...] The alternator can only
> deliver power at higher speeds. »

> « nA Cutting-in speed — [...] It is above the idle speed, and depends upon the preexcitation
> power, the rotor's remanence, the battery voltage, and the rate of rotational-speed change. »

> « nL Speed with engine idling [...] In the case of compact-diode-assembly alternators,
> nL = 1500 min-1, for compact alternators nL = 1800 min-1 due to the usually higher transmission
> ratio. »

> « nN Speed at rated current — The speed at which the alternator generates its rated current
> is stipulated as nN = 6000 min-1. »

> Exemple de désignation : « 14V Alternator voltage, 40A Current at n = 1800 min-1, 70A Current
> at n = 6000 min-1. »

> « In our example, the alternator speed is: nL = 2000 min-1. [...] At idle, the alternator
> delivers a current of IL = 36A. »

> « Practical experience has shown that for passenger cars, at engine idle IL should exceed the
> current IW1 by a factor of 1.3. [...] This ensures efficient battery charging even at engine
> idle »

---

## Ce que le chapitre en tire

- Un alternateur d'auto **ne donne rien sous environ 1 000 tr/min à son arbre**, donne une
  partie de son courant au ralenti du moteur (1 500 à 2 000 tr/min à l'alternateur) et son
  courant nominal à 6 000 tr/min.
- Il a besoin d'une **pré-excitation** venue de la batterie pour commencer à produire.
- Conséquences : sur une roue à eau lente ou une éolienne, il faut une démultiplication très
  forte ; sur le camion, lever le régime au-dessus du ralenti augmente le courant ; sur un petit
  moteur, le rapport de poulies se calcule sur 6 000 tr/min à l'alternateur.

Les courants donnés (36 A, 40 A, 70 A) sont ceux **d'un exemple de catalogue**, pas de
l'alternateur du camion de JP. Le chapitre renvoie à la plaque de l'alternateur.
