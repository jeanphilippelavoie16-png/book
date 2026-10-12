# Butane, isobutane et essence — points d'ébullition et point d'éclair

Fiche de regroupement de trois pages fédérales américaines, consultées le 24 septembre 2026.
Aucune page canadienne consultée ne donne ces valeurs : le profil « Essence » du CCHST n'a ni point
d'éclair ni point d'ébullition (`20-cchst-essence-vapeurs.md`, `83-cchst-essence-profil-chimique.md`),
et la fiche REPTOX « Essence » n'a pas pu être localisée par les passes précédentes.

- **Sert à :** chapitre 17 — Feu sans allumettes (§ 2, le briquet au froid ; § 8 DANGER, l'essence
  au froid)

---

## 1. NIOSH Pocket Guide — « Gasoline » (essence)

- **Organisme :** National Institute for Occupational Safety and Health (NIOSH), Centers for Disease
  Control and Prevention, gouvernement des États-Unis — *NIOSH Pocket Guide to Chemical Hazards*
- **URL :** https://www.cdc.gov/niosh/npg/npgd0299.html
- **Captation :** le serveur du CDC refuse `curl` (HTTP 403) ; la page a été lue par `WebFetch` le
  24 septembre 2026 et enregistrée depuis sa copie de l'Internet Archive du 5 septembre 2026 :
  https://web.archive.org/web/20260905172648/https://www.cdc.gov/niosh/npg/npgd0299.html →
  `sources/17-niosh-npg-essence.html` (288 871 octets). Les deux lectures donnent les mêmes valeurs.

> « Synonyms & Trade Names Motor fuel, Motor spirits, Natural gasoline, Petrol [Note: A complex
> mixture of volatile hydrocarbons (paraffins, cycloparaffins, and aromatics).] »

> « Physical Description Clear liquid with a characteristic odor. […] Boiling Point 102°F […] Vapor
> Pressure 38-300 mmHg […] Specific Gravity (60°F): 0.72-0.76 Flash Point -45°F Upper Explosive
> Limit 7.6% Lower Explosive Limit 1.4% Class IB Flammable Liquid: Fl.P. below 73°F and BP at or
> above 100°F. »

| Donnée | Valeur de la source | En métrique |
| --- | --- | --- |
| Point d'éclair | -45 °F | **-43 °C** |
| Limites d'inflammabilité dans l'air | 1,4 % à 7,6 % | — |

Le point d'éclair est la température la plus basse à laquelle un liquide dégage assez de vapeur
pour que le mélange avec l'air s'enflamme (définition : `88-cchst-point-declair-glossaire-simdut.md`).

## 2. NIOSH Pocket Guide — « n-Butane »

- **URL :** https://www.cdc.gov/niosh/npg/npgd0068.html
- **Captation :** copie de l'Internet Archive du 1er septembre 2026 :
  https://web.archive.org/web/20260901202437/https://www.cdc.gov/niosh/npg/npgd0068.html →
  `sources/17-niosh-npg-n-butane.html` (288 064 octets)

> « Synonyms & Trade Names normal-Butane, Butyl hydride, Diethyl, Methylethylmethane [Note: Also see
> specific listing for Isobutane.] »

> « Physical Description Colorless gas with a gasoline-like or natural gas odor. [Note: Shipped as a
> liquefied compressed gas. A liquid below 31°F.] Molecular Weight 58.1 Boiling Point 31°F Freezing
> Point -217°F Solubility Slight Vapor Pressure 2.05 atm […] Relative Gas Density 2.11 Flammable Gas »

| Donnée | Valeur de la source | En métrique |
| --- | --- | --- |
| Point d'ébullition du butane | 31 °F | **-0,5 °C** |
| Densité du gaz par rapport à l'air | 2,11 | — |

## 3. NIST Chemistry WebBook — butane et isobutane

- **Organisme :** National Institute of Standards and Technology (NIST), département du Commerce des
  États-Unis — *NIST Chemistry WebBook*, SRD 69, « Phase change data »
- **URL :** https://webbook.nist.gov/cgi/cbook.cgi?ID=C106978&Mask=4 (butane) et
  https://webbook.nist.gov/cgi/cbook.cgi?ID=C75285&Mask=4 (isobutane)
- **Pages enregistrées :** `sources/17-nist-webbook-C106978.html`, `sources/17-nist-webbook-C75285.html`

> Butane : « T boil 273. ± 1. K AVG N/A Average of 33 values »

> Isobutane : « T boil 262. ± 2. K AVG N/A Average of 24 out of 25 values »

| Gaz | Point d'ébullition | En °C |
| --- | --- | --- |
| Butane | 273 K | **environ 0 °C** (NIOSH : -0,5 °C) |
| Isobutane | 262 K | **environ -11 °C** |
| Propane (rappel, ch. 14) | — | -42,04 °C |

## Ce que ces pages établissent pour le chapitre 17

- Sous son point d'ébullition, un gaz liquéfié n'a plus assez de pression pour sortir du réservoir :
  le butane cesse vers **0 °C**, l'isobutane vers **-11 °C**, le propane seulement vers **-42 °C**.
- L'essence dégage assez de vapeur pour s'enflammer jusqu'à **-43 °C** : elle reste inflammable à
  toutes les températures d'un hiver de la Côte-Nord.

## Ce qu'elles ne disent pas

- La composition du gaz d'un briquet jetable donné (butane, isobutane ou mélange) : aucune fiche de
  fabricant n'a été captée.
