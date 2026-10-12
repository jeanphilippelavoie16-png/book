# Source — ZVEI (fédération allemande des fabricants de l'électrotechnique, division Batteries), fiche n° 14 : la ventilation d'un local de charge de batteries au plomb

- **Organisme :** ZVEI – Zentralverband Elektrotechnik- und Elektronikindustrie e. V., division
  Batteries (groupe de travail Batteries industrielles, c'est-à-dire les fabricants)
- **Document :** *Ventilation of battery charging rooms for lead traction batteries*, ZVEI
  information leaflet No. 14, mai 2020
- **URL :** https://www.zvei.org/fileadmin/user_upload/Verband/Fachverbaende/Batterien/Merkblaetter/Industriebatterien/14e-Leaflet-Ventilation_of_battery_charging_rooms_for_lead_traction_batteries_01.pdf
- **Date de consultation :** 24 septembre 2026
- **Captation :** `curl`, HTTP 200, PDF enregistré : `sources/18b-zvei-ventilation-local-batteries-plomb.pdf` ;
  texte : `sources/18b-zvei-ventilation-local-batteries-plomb-texte.txt` (mise en page en trois
  colonnes ; les extraits ci-dessous sont remis dans l'ordre de lecture)
- **Sert au chapitre :** 18b (étape 18). Lève le `[À VÉRIFIER — taille de bouche au-delà de deux
  batteries]`. La norme nommée par la fiche reste ici, jamais dans le livre.

---

## Extraits intégraux

### D'où vient le gaz, et quand

> « During the charging of lead batteries an explosive gas mixture escapes from the battery cells
> through the plug openings. This gas mixture results from electrolysis of water, the main
> compound of the electrolyte, and consists of hydrogen and oxygen (volume ratio 2:1 = oxyhydrogen
> gas. The evolution of gasses during charging rises with the battery's state of charge. In the
> final charging phase of the battery almost the entire charging current leads to the generation
> of oxyhydrogen gas. »

> « Towards the end of the charging process, the electrolysis of water generates 0.450 liter
> hydrogen and 0.225 liter oxygen within one hour and a final charging current of 1 ampere
> (reference temperature 25°C). »

> « The ventilation of battery charging rooms must safely ensure that the hydrogen concentration
> does not exceed the lower explosion limit of 4% by volume. »

### Le débit d'air

> « Q = 0.055m³/Ah n Igas
> Q air volume flow in m3/h
> 0.055 m3/Ah combines gas evolution rate, the necessary dilution factor of hydrogen and a general
> safety factor
> n number of cells (e.g. 40 for an 80 volt or 12 for an 24 volt battery)
> Igas hydrogen-generating electric current in A »

> « Note: Due to the safety factor this formula can also be used for the entire permissible
> operating temperature range of a battery. The battery related Igas values shall be obtained from
> the charger manufacturer. [...] If Igas is not known or cannot get to know, at least 40% of the
> maximum charging current (see charger's name plate) must be used for Igas. »

> « In case of several batteries are charged simultaneously in the same room, the required air
> flow rate must be calculated for each battery. For safety reasons the calculation must be based
> on the assumption that all batteries under charge generate hydrogen at maximum gassing rate. »

### La surface des ouvertures, en ventilation naturelle

> « The corresponding air in- and outlets shall each have at least a cross-section area which is to
> be calculating using the following formula: A = 28cm²h/m³ Q
> A Cross-section for air in- and outlet [cm²]
> 28 cm² h/m³ Necessary factor for conversion of units
> Q Air volume flow [m³/h] »

> « The air flow must ensure a continuous aeration of the entire battery charging room / area e.g.
> the inlets should be located near the floor and the airflow should be directed over the
> batteries and escape at outlets high as possible. This ensures optimum cross ventilation. »

> « Both, the natural and forced ventilation must be designed in such a way that the exhaust air is
> emitted into the open air. »

### La distance aux étincelles

> « Safety note: Even though sufficient ventilation is ensured, the dilution of hydrogen cannot
> always be guaranteed in the near field of the battery. Therefore [...] the safety distance of
> 0.5 meters air gap (thread dimension) must be maintained from a possible ignition source,
> starting from a cell opening (plug or valve). Within this safety distance no open flames,
> sparks, arcs or glowing objects may occur (maximum surface temperature 300°C). »

---

## Ce que le chapitre en tire (calculs de vérification, à présenter comme calculs)

- **Sourcé :** la surface de chaque ouverture croît en proportion du **nombre d'éléments en série**
  et du **courant qui arrive dans la batterie en fin de charge**, presque tout changé en gaz ; en
  surface, pas en diamètre. Une entrée basse et une sortie haute, toutes deux vers le dehors.
  Faute de connaître ce courant : 40 % du courant maximal du chargeur.
- **Calcul :** A = 28 × 0,055 × n × I = 1,54 × n × I cm². En 12 V (6 éléments) : **environ
  9 cm² par ampère** (9,24), soit un trou d'environ 3,5 cm de diamètre par ampère ; la surface
  double pour 24 V au même courant.
- **Exemple du chapitre :** chargeur de 17 A (étape 28), courant de gaz inconnu → 40 % = 6,8 A →
  A = 9,24 × 6,8 ≈ 63 cm², un trou d'environ **9 cm** de diamètre (√(4 × 63 ÷ π) = 8,9 cm).
- **Confrontation avec la source canadienne au dossier :** Ressources naturelles Canada donne
  « au moins 2,5 cm » pour deux batteries de 12 V d'un petit chalet
  (`sources/18b-rncan-systemes-photovoltaiques-guide.md`). Un trou de 2,5 cm (4,9 cm²) ne couvre,
  par la formule des fabricants, qu'environ 0,5 A de courant de gaz en 12 V : le minimum de RNCan
  vaut pour un petit banc chargé doucement, pas pour un banc qui prend 17 A d'une génératrice.
