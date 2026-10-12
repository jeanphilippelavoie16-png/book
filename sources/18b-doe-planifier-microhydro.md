# Source — Département de l'Énergie des États-Unis (Energy Saver), « Planning a Microhydropower System »

- **Organisme :** U.S. Department of Energy, programme Energy Saver
- **URL d'origine :** https://www.energy.gov/energysaver/planning-microhydropower-system
  (**retirée** : la page répond « Page not found » le 2026-09-23)
- **URL de captation :** Internet Archive, https://web.archive.org/web/2024id_/https://www.energy.gov/energysaver/planning-microhydropower-system
- **Date de consultation :** 2026-09-23
- **Captation :** `curl` sur l'archive, page enregistrée : `sources/18b-doe-planifier-microhydro-archive.html`
- **Sert au chapitre :** 18b (section 9)

C'est exactement le cas que prévoit la règle 2 de `CLAUDE.md` : une page de ministère qui
disparaît. La copie d'archive est ce qui garde le chiffre.

---

## Extraits intégraux

> « Simply multiply net head [...] by flow (use U.S. gallons per minute) divided by 10. That will
> give you the system's output in watts (W). »

> « [net head (feet) × flow (gpm)] ÷ 10 = W »

> « estimate the power output for a system with 50% to 70% efficiency or more, which is
> representative of most micro-hydropower systems. »

> « Low head refers to a change in elevation of less than 66 feet (20 meters), and ultralow head
> refers to a change in elevation of less than 10 feet (3 meters). A vertical drop of less than
> 2 feet (0.6 meters) will probably make a small-scale hydroelectric system unfeasible. »

### La méthode du tuyau (hauteur de chute)

> « Meanwhile, lift the downstream end until water stops flowing from it. Measure the vertical
> distance between your end of the tube and the surface of the water. This is the gross head for
> that section of stream. »

> « The sum of these measurements will give you a rough approximation of the gross head for your
> site. »

> « you may wish to subtract an inch or two (2–5 centimeters) from each measurement »

### La méthode du seau (débit)

> « The bucket method involves damming your stream with logs or boards to divert its flow into a
> bucket or container. The rate at which the container fills is the flow rate. »

> « Stream flows can be quite variable over a year, so the season during which you take flow
> measurements is important. Unless you're considering building a storage reservoir, you can use
> the lowest average flow of the year as the basis for your system's design. »

---

## Conversion du rédacteur

pieds × gal US/min ÷ 10 = (m ÷ 0,3048) × (L/s ÷ 0,06309) ÷ 10 ≈ **5,2 × m × L/s**. Les deux
sources (RNCan et le département de l'Énergie) donnent donc la même règle : environ **5 W par
mètre de chute et par litre par seconde**.
