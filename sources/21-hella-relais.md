# Hella — Relais d'auto : principe, bobine, bornes

- **Organisme :** Hella (fabricant de relais et de klaxons d'automobile)
- **Document 1 :** *Technical Information Electronics – Relays* (fiche technique Hella, 12 pages)
- **URL consultée (copie du PDF Hella hébergée par un tiers ; l'original sur hella.com n'a pas
  répondu le jour de la consultation) :**
  http://www.billavista.com/atv/pdf_index/files/electrical/Hella%20Electronics%20-%20Technical%20Information%20-%20Relays.pdf
- **Document 2 :** *Relay Quick Reference Chart* (Hella Nouvelle-Zélande, 1 page)
- **URL consultée :** https://www.hella.co.nz/assets/Technology/Relay_Quick_Reference_Chart.pdf
- **Consultée le :** 23 septembre 2026
- **Sert dans :** chapitre 21 — Le voisinage et le groupe de chasse, section « Le fil entre deux
  bâtiments, sans pile », sonnerie au klaxon (relais côté batterie)

---

## Extraits intégraux — document 1 (texte tiré du PDF)

### Ce que fait un relais

> « In an electro-mechanical relay, an iron armature is attracted by the current flow in the
> electro-magnetic coil. Through its movement, the iron armature makes or breaks one or more
> contacts, which in turn makes, breaks or switches over a load circuit. The current intensity and
> electrical voltage in the load circuit can be much greater than that in the coil. »

> « The load current can be switched using a relay near the load, making short supply lines with
> low voltage drop possible. »

> « Make-contact relays are used if the focus is on loads being switched on and off. Examples of
> this are the switching of auxiliary headlamps, trumpet horns, fan motors etc. »

La liste des applications du relais dans l'auto (page 2) comprend « Horn ».

### Données de bobine, relais ISO Mini (le relais cube des boîtes à fusibles)

Tableau de la page 6, extrait tel que le PDF le rend (les symboles Ω sont perdus à l'extraction) :

> « ISO Mini 40 / 20 A — 150 / 100 A — 12 / 24 V — 100 — 92 — <7.5 V — -40 °C to +125 °C »

Colonnes du tableau, dans l'ordre : *Max. continuous current*, *Inrush current*, *Nominal voltage*,
*Coil resistance (coil only)*, *Relay resistance*, *Pull-in voltage*, *Operating temperature range*.
Lecture : bobine seule 100 Ω, relais complet 92 Ω, **tension de collage inférieure à 7,5 V**.
Le relais ISO Mikro donne 92 Ω / 85 Ω et la même tension de collage (< 7,5 V).

### Numérotation des bornes (schéma de broches, page 1)

> « 3 (30) 2 (85) 5 (87) 1 (86) »

## Extraits intégraux — document 2

Relais mini à contact normalement ouvert, 12 V :

> « Current Draw 140mA 140mA 170mA 210mA 140mA 170mA »

Relais à contact inverseur : « 30-87, 30A/30-87a, 20A » — le contact normalement ouvert est
entre 30 et 87 ; 85 et 86 sont les bornes de bobine (« Terminals 85 and 86 are 4.8mm »).

---

## Chiffres retenus pour le chapitre 21

| Chiffre | Où dans le chapitre | Extrait porteur |
| --- | --- | --- |
| **0,14 à 0,21 A** dans la bobine d'un relais d'auto de 12 V | Sonnerie au klaxon | document 2, « Current Draw 140mA … 210mA » |
| Colle encore **sous 7,5 V** | Sonnerie au klaxon | document 1, « Pull-in voltage <7.5 V » (ISO Mini, ISO Mikro) |
| Bornes **85-86** bobine, **30-87** contact | Sonnerie au klaxon | document 1 (schéma) et document 2 |

## Mécanisme que le chapitre tire de cette source

Le courant du circuit de charge peut être bien plus grand que celui de la bobine, et le relais
posé près de la charge donne des fils d'alimentation courts, à faible chute de tension. Appliqué
au téléphone de fil : le relais va du côté de la batterie et du klaxon, le long fil ne porte que
le courant de bobine.

**À reprendre :** retrouver l'original du document 1 sur un domaine Hella ; le tableau de la
page 6 est mal aligné à l'extraction, la lecture ci-dessus se fait par l'ordre des valeurs.
