# Construire et chauffer un sauna à bois — manuels Harvia (M1, M3) et InterNACHI

- **Consulté le :** 2026-09-27
- **Sert au chapitre :** 37 — Le sauna et le bien-être (§4, §5-A à §5-D, §9)

Aucune page gouvernementale québécoise ou canadienne ne traite de la construction d'un sauna à
bois. Les deux sources les plus solides trouvées sont le manuel bilingue d'un fabricant finlandais
de poêles de sauna (Harvia) et une association d'inspecteurs en bâtiment. Leurs consignes de
distance et de protection sont écrites pour **leurs** poêles : le chapitre n'en reprend que les
principes qui valent pour n'importe quel poêle, jamais une distance en millimètres.

---

## A. Harvia M3 — « Poêle à bois : instructions d'utilisation et d'installation » (bilingue)

- **URL :** https://www.manualslib.com/manual/1953068/Harvia-M3.html (reproduction du manuel du
  fabricant ; pages de texte en anglais et en français côte à côte)
- **Captation :** `curl`, HTML enregistré : `37-manualslib-harvia-m3-manuel.html`

Extraits, texte français du manuel :

> « Seules des pierres adaptées à cet usage spécifique doivent être utilisées en tant que pierres
> de sauna. Vous pouvez notamment utiliser des pierres Harvia, qui sont en péridotite, en dolérite
> olivine ou en olivine. »

> « Remarque ! Les roches supracrustales trouvées dans la nature peuvent contenir des substances »
> (anglais : « Supracrustal rock found in nature may contain harmful substances, such as iron
> pyrite, and therefore should not be used. »)

> « L'eau versée sur les pierres doit être de l'eau de consommation propre. [...] une eau
> contenant du sel, du calcaire, du fer ou de l'humus risque d'entraîner la corrosion prématurée
> du poêle. » (anglais : « Especially seawater will corrode the stove very rapidly. »)

> « Vous devez laisser un espace minimum de 1 m x 1 m en face du poêle, pour la personne chargée
> de chauffer le sauna. »

> « Le poêle peut être installé sur un sol en béton sans mesure de sécurité spécifique si le béton
> mesure au moins 60 mm d'épaisseur. »

> « Les sols en bois doivent être posés sur une dalle en béton ou une couche de protection séparée.
> Les plaques en acier posées entre le sol en bois et le poêle ne suffiront pas. » (anglais :
> « Steel plates between the wooden floor and the stove will not suffice. »)

(Anglais) « The highest allowed temperature of the wall and ceiling surfaces is +140 degrees
Celsius. » — **non repris** : impossible à mesurer au chalet, et le ch. 83 donne déjà le test de la
main pour une truie.

## B. Harvia M1 — manuel d'installation et d'utilisation

- **URL :** https://manuals.plus/harvia/m1-wood-burning-stove-manual
- **Captation :** `WebFetch` seulement (HTTP 200 au `WebFetch`) ; le `curl` renvoie une page de
  vérification anti-robot, **aucune copie HTML n'a pu être enregistrée**. Extraits relevés mot pour
  mot par le `WebFetch` ; à recapter si possible.

> « Only proper stones meant for the specific purpose should be used as sauna stones.
> Peridotite, olivine-dolerite and olivine are suitable stone types. »

> Pierres de « 10–15 cm in diameter » ; jusqu'à **30 kg** de pierres pour une pièce de **6 à
> 13 m³** (tableau technique du modèle WKM11).

> « Place the larger stones at the bottom and the smaller ones on the top. Make sure that air
> circulates between the stones. »

> « Due to large variation in temperature, the sauna stones disintegrate in use. Therefore, they
> should be rearranged at least once a year or even more often if the sauna is in frequent use. »

> « Stones found in nature may contain harmful substances, such as iron pyrite, and therefore
> should not be used. »

> « Please note that non-insulated wall and ceiling surfaces (such as brick, glass, tile and
> concrete surfaces) increase the output requirement of the stove. For every square meter of such
> wall and ceiling surface you should calculate an additional 1.2 m3 volume. »

(Relevé mot pour mot par un second `WebFetch` le 2026-09-27, à la demande du vérificateur
technique. Le premier `WebFetch` du même jour rendait aussi : « If the sauna walls are made of
massive log, the volume must be multiplied by 1.5. » — non repris au chapitre, faute d'une
deuxième lecture mot pour mot. Le chapitre nomme maintenant les matériaux du manuel : brique,
béton, carreau, vitre ; il ne dit rien d'un mur de planches non isolé, que le manuel ne nomme pas.)

> « Perform the first heating outdoors. The stove body has been painted with protective paint,
> which will vaporise during the first heating. »

> Ventilation par tirage naturel : « The fresh air inlet must be placed close to the floor near
> the stove » et la sortie « as far as possible from the stove and near the ceiling ».

> « A good rule of thumb is that temperatures of over 100 ºC are too high in a sauna. »

> « Throw sauna water on the stones only. If you throw water on the hot steel surfaces, they may
> blister due to the large temperature variation. »

> « Staying in the hot sauna for long periods of time makes the body temperature rise, which may
> be dangerous. »

> « Never throw water on the stones when there are people near the stove, because hot steam may
> burn their skin. »

> « Never go to a hot sauna if you have taken alcohol, strong medicines or narcotics. »

> « Never sleep in a hot sauna. »

> « Do not hang clothes to dry in the sauna, as this may cause a risk of fire. »

> Bois : sec ; jamais de bois peint ou traité.

Bois, relevé mot pour mot le 2026-09-27 (`WebFetch`) :

> « Place the biggest firewood on the bottom and the smaller ones on the top. Use firewood with a
> diameter of 8–12 cm (consider the ignition load value, table 2). »

> « If necessary, place more firewood into the fire chamber when the ember is dying down. Use
> firewood with a diameter of 12–15 cm. It takes only a couple of pieces of wood to maintain the
> bathing temperature »

**Ce que le chapitre en tire (étape 21) :** pour un poêle raccordé, 8 à 12 cm pour partir, 12 à
15 cm pour recharger quand la braise baisse. Le petit bois de 2 à 5 cm et « six fois moins de
monoxyde » viennent du sauna à fumée (`37-saunafi-societe-finlandaise-du-sauna.md`, §1) et ne
valent au chapitre que pour lui.

**Captation, nouvelle tentative le 2026-09-27 :** `curl` avec un agent de navigateur → HTTP 403
(page anti-robot). Le manuel M1 reste **sans copie enregistrée** : les extraits ci-dessus sont la
seule trace. Les chiffres qui en dépendent au chapitre (1,2 m³ ; 8-12 et 12-15 cm ; 30 kg pour
6-13 m³ ; plus de 100 °C trop chaud) sont signalés à la fiche de suivi (§1).

## C. InterNACHI — « Sauna Inspection »

- **Organisme :** International Association of Certified Home Inspectors
- **URL :** https://www.nachi.org/sauna-inspection.htm
- **Captation :** `curl`, HTML enregistré : `37-internachi-inspection-sauna.html`

> « The sauna door should swing outward and should not be equipped with a latching mechanism. »

La source interdit un mécanisme de verrouillage, pas un arrêt qui cède à la poussée. Le chapitre
(étape 4, §4) tient la porte fermée par un taquet à friction, un ressort ou un contrepoids : c'est
une décision du chapitre, sans source, pour que la porte ne s'entrouvre pas sous la pression de
l'air chaud.

(La même page dit « Never stay in a sauna longer than 30 minutes » : non repris, plus long que les
séances de 5 à 20 minutes des études.)

---

## Notes

- **La pyrite :** le manuel nomme la pyrite de fer comme substance nuisible, sans dire pourquoi. Le
  chapitre (étape 12) dit de rejeter la pierre qui porte des paillettes ou des cubes dorés **et
  nomme le gaz** : chauffée, la pyrite dégage du dioxyde de soufre. Ce fait vient de Wikipédia
  (anglais), `37-wikipedia-pyrite-en.html`, voir `37-pierres-quartz-qui-eclatent.md` ; il n'est
  chiffré nulle part. (Correction du 2026-09-27 : la note précédente disait à tort que le chapitre
  ne nommait pas le gaz.)
- **Les 30 kg pour 6 à 13 m³** servent d'ordre de grandeur pour un poêle de fabrication, pas de
  consigne pour une truie.
