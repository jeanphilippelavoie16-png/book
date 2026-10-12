# Lincoln Electric — « Storing and Redrying Electrodes » (stockage et reséchage des électrodes enrobées)

- **Organisme :** Lincoln Electric (fabricant d'électrodes et de postes de soudage), fiche technique
  MC22-140, 12/22
- **URL :** https://ch-delivery.lincolnelectric.com/api/public/content/c9885a12d37149b985327956ca3c9e97?v=d24abe95
  (la page web équivalente, https://www.lincolnelectric.com/en/welding-and-cutting-resource-center/welding-how-tos/storing-and-redrying-electrodes,
  a répondu HTTP 403)
- **Consultée le :** 23 septembre 2026
- **Captation :** PDF enregistré à côté de cette fiche : `85-lincoln-stockage-et-sechage-electrodes.pdf`.
  Texte extrait avec `pypdf`, relu contre le PDF. **Attention :** le résumé automatique de
  `WebFetch` sur ce PDF donnait des valeurs fausses (« 800-900 °F » pour la 7018, « 175-232 °C »
  pour les électrodes ordinaires). Seuls les extraits ci-dessous, tirés du texte du PDF, font foi.
- **Sert au chapitre :** 85 — Le stock de pièces et de consommables (§5.2 tableau des consommables
  datés; §9 « L'électrode mouillée se sauve; l'électrode fendue, non »)

---

## Extraits intégraux (anglais, tels qu'imprimés)

### Pourquoi on resèche

> « When stick electrodes absorb moisture from the atmosphere, they must be dried in order to
> restore their ability to deposit quality welds. Electrodes with too much moisture may lead to
> cracking or porosity. Operational characteristics may be affected as well. »

### Électrodes à bas hydrogène (E7018) — stockage

> « Opened cans should be stored in a cabinet at 250 to 300°F (120 to 150°C) »

### Électrodes à bas hydrogène — reséchage

> « One hour at the listed final temperature is satisfactory. DO NOT dry electrodes at higher
> temperatures. Several hours at lower temperatures is not equivalent to using the specified
> requirements. »

> « Any low hydrogen electrode should be discarded if excessive redrying causes the coating to
> become fragile and flake or break off while welding, or if there is a noticeable difference in
> handling or arc characteristics, such as insufficient arc force. »

> « Electrodes to be redried should be removed from the can and spread out in the oven because
> each electrode must reach the drying temperature. »

Tableau « Redrying Conditions - Low Hydrogen Stick Electrodes » :

| Condition | Pre-drying Temperature | Final, E7018, E7028 | Final, E8018 à E11018 |
| --- | --- | --- | --- |
| « Electrodes exposed to air for less than one week; no direct contact with water » | N/A | 650 to 750°F (340 to 400°C) | 700 to 800°F (370 to 430°C) |
| « Electrodes which have come in direct contact with water or which have been exposed to high humidity. » | 180 to 220°F (80 to 105°C) | 650 to 750°F (340 to 400°C) | 700 to 800°F (370 to 430°C) |

> « (1) Pre-dry for 1 to 2 hours. This will minimize the tendency for coating cracks or oxidation
> of the alloys in the coating. »

### Électrodes ordinaires (non bas hydrogène) — stockage

> « Electrodes in unopened Lincoln cans or cartons retain the proper moisture content indefinitely
> when stored in good condition. »

> « If moisture appears to be a problem, store electrodes from the opened containers in heated
> cabinets at 100 to 120°F (40 to 50°C). DO NOT use higher temperatures, particularly for
> electrodes from the "Fast Freeze" group. »

### Électrodes ordinaires — tableau « Redrying Conditions - Non-Low Hydrogen Stick Electrodes »

| Groupe | Classes | Signes d'humidité (texte du fabricant) | Température finale | Durée |
| --- | --- | --- | --- | --- |
| Fast Freeze | E6010, E6011 (et E7010, E8010, E9010) | « excessive moisture is indicated by a noisy arc and high spatter, rusty core wire at the holder end or objectionable coating blisters while welding. » — « Re-baking of this group of stick electrodes is not recommended. » | Not Recommended | N/A |
| Fast Fill | E7024, E6027 | « excessive moisture is indicated by a noisy or "digging" arc, high spatter, tight slag, or undercut. Pre-dry unusually damp electrodes for 30 - 45 minutes at 200°F to 230°F (90 - 110°C) before final drying to minimize cracking of the coating. » | 400 to 500°F (200 to 260°C) | 30 - 45 minutes |
| Fill Freeze | E6012, E6013, E7014, E6022 | « Excessive moisture is indicated by a noisy or "digging" arc, high spatter, tight slag or undercut. Pre-dry unusually damp electrodes for 30 - 45 minutes at 200° - 230°F (90° - 110°C) before final drying to minimize cracking of the coating » | 300 to 350°F (150 to 180°C) | 20 - 30 minutes |

> « Using longer drying times or higher temperatures can easily damage the electrodes. For drying,
> remove the electrodes from the container and spread them out in the furnace because each stick
> electrode must reach the drying temperature. »

---

## Ce que le chapitre 85 en tire

1. **Toutes les électrodes humides ne se sèchent pas.** Les E6010 et E6011 (« Fast Freeze ») ne se
   recuisent pas : le fabricant ne le recommande pas. Le chapitre disait « Une électrode humide se
   sèche encore » sans distinction.
2. **E6013 / E7014 (les électrodes de dépannage courantes) :** 150 à 180 °C pendant 20 à 30 min,
   précédés de 30 à 45 min à 90-110 °C si elles sont franchement humides. Plus chaud ou plus long
   les abîme.
3. **E7018 :** 340 à 400 °C pendant une heure, précédés de 1 à 2 h à 80-105 °C si elles ont été
   mouillées. Plusieurs heures plus bas ne remplacent pas l'heure à la bonne température.
4. **Les signes de l'électrode humide** (arc bruyant, projections, laitier collant, caniveaux,
   âme rouillée côté pince, cloques d'enrobage) appuient l'essai immédiat du chapitre.
5. **L'enrobage qui s'effrite ou casse** après un séchage de trop : au rebut. Cela appuie « une
   électrode dont l'enrobage est fendu ne se sauve pas ».

## Ce que la fiche NE dit PAS

- Rien sur la tablette d'un poêle à bois; les températures se contrôlent au thermomètre de four.
- Rien sur le fil fourré rouillé.
