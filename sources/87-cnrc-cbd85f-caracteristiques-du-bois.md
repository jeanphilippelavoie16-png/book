# CNRC — CBD 85F, « Caractéristiques fondamentales du bois de construction »

- **Organisme :** Conseil national de recherches Canada (CNRC), Division des recherches en
  construction. *Digeste de la Construction au Canada*, n° **CBD 85F**.
- **Auteurs :** N.B. Hutcheon et J.H. Jenkins
- **Publié à l'origine :** février 1968. DOI : https://doi.org/10.4224/40000904
- **URL (notice) :** https://publications-cnrc.canada.ca/fra/voir/objet/?id=489d610c-91d7-4748-8013-a813aaa14886
- **URL (texte intégral, PDF) :** https://publications-cnrc.canada.ca/eng/view/ft/?id=489d610c-91d7-4748-8013-a813aaa14886
- **Date de consultation :** 2026-09-20
- **Captation :** de première main, `WebFetch` (HTTP 200) puis extraction du texte du PDF
  (`pypdf`), le convertisseur de l'outil ne rendant que le binaire. Texte complet obtenu,
  7 pages.
- **Chapitre qui s'en sert :** 87 — Assemblages bois-bois (sections 2, 3, 4, 6, 7, 8)

> **Avertissement porté par la publication elle-même, à recopier au vérificateur :**
> « Cette publication fait partie d'une série qui a cessé de paraître et qui est archivée en
> tant que référence historique. Pour savoir si l'information contenue est toujours applicable
> aux pratiques de construction actuelles, les lecteurs doivent prendre conseil auprès
> d'experts techniques et juridiques. »
>
> Le chapitre 87 utilise cette source pour des **propriétés physiques du matériau bois**
> (anisotropie, retrait, ordres de grandeur de résistance), qui ne datent pas. Il ne s'en sert
> **pour aucune prescription de construction**. C'est la ligne à tenir en relecture.

---

## 1. Point de saturation des fibres

> « Cet état, qu'on qualifie de point de saturation en humidité des fibres, est atteint
> généralement pour une teneur en eau de **25 à 30 pour cent**. »

> « en perdant son eau jusqu'à ce point le bois vert ne modifiera ses propriétés que faiblement
> et ne subira que très peu de retrait; seul le poids diminuera. En dessous de cette teneur le
> séchage du bois entraînera sa contraction progressive, à peu près en fonction de la diminution
> de l'humidité en dessous du point de saturation des fibres. »

## 2. Retrait — les trois directions

> « un retrait plus important affecte le bois débité sur dosse (tangentiellement aux cernes) que
> le bois débité sur maille (parallèlement aux rayons) »

> « En ce qui concerne les essences canadiennes, la gamme du retrait affectant le bois débité sur
> maille va de **1.7 à 6.7 pour cent** et celle du bois débité sur dosse de **3.7 à 10 pour
> cent**. Le retrait qui se produit selon le fil du bois n'est pas indiqué; il est beaucoup plus
> faible, n'atteignant que de **0.1 à 0.3 pour cent**, sauf dans des conditions exceptionnelles. »

**Note de captation :** ces valeurs sont données pour l'ensemble des essences canadiennes. Le
CBD 244-F (fiche `87-cnrc-cbd244f-retrait-du-bois.md`) donne les valeurs propres à l'épinette,
plus resserrées. Le chapitre 87 cite les deux et dit laquelle vient d'où.

## 3. Pourquoi une bille fend en séchant

> « Il est par conséquent impossible de laisser sécher la grume sans que des contraintes se
> développent dans son plan transversal. Dans la plupart des cas les contraintes seront trop
> fortes pour que le bois puisse s'y accommoder; des fentes radiales et des gerces s'y
> produiront. »

> « Il est par conséquent d'usage de débiter les grumes en bois de charpente quand elles sont
> encore fraîches, et qu'aucun séchage en dessous du point de saturation des fibres ne s'est déjà
> produit. »

> « La découpe réalisée tangentiellement aux cernes (débit sur dosse) est plus susceptible
> d'entraîner des cambrures que la découpe faite diagonalement ou perpendiculairement aux
> cernes. »

## 4. La peinture et le vernis ne retiennent pas le bois

> « L'application de peinture ou de vernis ne les élimine pas, et elle ne fait que ralentir
> l'équilibrage de la teneur en humidité du bois avec celle de l'environnement. Elle peut donc
> largement réduire les réactions du bois aux variations rapides de l'hygrométricité
> atmosphérique, mais elle est sans effet dans le cas de variation à long terme. »

## 5. Résistance — **les quatre chiffres qui portent tout le chapitre 87**

Tous pour l'**épinette blanche**, sur « éprouvettes sans défauts de bois séché à l'air ».

> « Les chiffres obtenus pour l'épinette blanche montrent par exemple que sa résistance à la
> rupture en flexion statique peut atteindre **8 500 liv/po²**. La résistance à l'écrasement
> parallèlement au fil, sous pression maximale, est d'environ **5 000 liv/po²**. »

> « La résistance à l'écrasement perpendiculairement au fil du bois d'épinette blanche n'atteint
> que **450 liv/po²** à la limite de proportionnalité. La résistance maximale à l'extension
> perpendiculairement au fil est à peu près la même; la résistance maximale au cisaillement
> parallèlement au fil atteint **1000 liv/po²**. »

> « on emploie en génie civil des valeurs qui sont **cinq fois plus faibles que les précédentes
> et même moins** »

### Conversions faites par le livre (facteur retenu : 1 lb/po² = 6,894757 kPa)

| Sollicitation, épinette blanche | Source (lb/po²) | Converti (MPa) |
| --- | --- | --- |
| Flexion statique, rupture | 8 500 | **58,6** |
| Écrasement **parallèle** au fil | 5 000 | **34,5** |
| Écrasement **perpendiculaire** au fil (limite de proportionnalité) | 450 | **3,1** |
| Traction **perpendiculaire** au fil | « à peu près la même » que 450 | **≈ 3,1** |
| Cisaillement **parallèle** au fil | 1 000 | **6,9** |

**Rapports calculés par le livre à partir de ces valeurs** — ce sont des divisions, pas des
chiffres nouveaux :

- écrasement parallèle ÷ écrasement perpendiculaire = 34,5 ÷ 3,1 = **11**
- écrasement parallèle ÷ cisaillement parallèle = 34,5 ÷ 6,9 = **5**

Ces deux rapports sont **la totalité de la logique des assemblages bois-bois** : on charge dans
le fil en compression, on ne charge jamais en travers du fil en traction, et le mode de ruine
qu'il faut surveiller est le cisaillement le long du fil.

## 6. Composition et densité

> « Le bois est composé principalement de cellulose, soit jusqu'à **70 pour cent** du poids du
> bois sec. […] Les cellules sont fermement cimentées ensemble par la lignine, donnant de la
> rigidité au bois qui en contient **18 à 28 pour cent**. En outre, certains minéraux sont
> présents dans le bois, qu'on peut récupérer quand ce dernier est brûlé; ces minéraux
> constituent environ **1 pour cent** de la masse du bois sec. »

> « la densité du bois sec peut n'atteindre que **30 liv/pi³** et même **20 liv/pi³** pour les
> résineux »

Conversion du livre (1 lb/pi³ = 16,0185 kg/m³) : 30 lb/pi³ = **480 kg/m³**,
20 lb/pi³ = **320 kg/m³**.

> « certains composés organiques qu'il est possible d'extraire à l'aide de solvants: les tanins,
> amidons, matières grasses, cires et résines, qui peuvent communiquer au bois sa couleur, son
> odeur, son goût et sa **résistance à la pourriture**. »

**C'est la phrase qui relie la durabilité naturelle du thuya à sa chimie**, et donc, dans ce
livre, à la thuyone et à l'interdit du contact alimentaire.

## 7. Ce que la page **ne** donne **pas**

- Aucune valeur pour l'**épinette noire**, le **thuya occidental**, le **mélèze laricin** ni le
  **bouleau jaune** — les essences réellement disponibles au chalet. Les quatre chiffres de
  résistance sont ceux de l'**épinette blanche** seule, et le chapitre 87 le dit chaque fois
  qu'il les emploie.
- Aucune donnée sur les **assemblages** eux-mêmes : ni cheville, ni tenon, ni mi-bois, ni
  résistance d'un joint. Cette source donne les propriétés du **matériau**, pas du **joint**.
  Tout ce que le chapitre 87 dit d'un assemblage précis est du savoir-faire, pas de la citation.
- Aucun coefficient de sécurité utilisable : « cinq fois plus faibles » est une indication
  d'usage en génie civil de 1968, pas une méthode de calcul. Le chapitre ne calcule rien.
