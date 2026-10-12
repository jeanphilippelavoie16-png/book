# CNRC — CBD 88F, « Emploi du bois de construction »

- **Organisme :** Conseil national de recherches Canada (CNRC), Division des recherches en
  construction. *Digeste de la Construction au Canada*, n° **CBD 88F**.
- **Auteur :** H.B. Dickens
- **Publié à l'origine :** juin 1968. DOI : https://doi.org/10.4224/40000896
- **URL (notice) :** https://publications-cnrc.canada.ca/fra/voir/td/?id=49fa9975-568d-4fd8-ab77-cc7957022b43
- **Date de consultation :** 2026-09-20
- **Captation :** de première main, `WebFetch` (HTTP 200) puis extraction du texte par `pypdf`.
- **Chapitre qui s'en sert :** 87 — Assemblages bois-bois (sections 2, 4, 8, 10)

> ⚠ **Digeste de 1968, archivé comme référence historique.** Il cite des normes qui ont toutes
> été remplacées depuis (CSA 086 de 1959, CNB 1965). Le chapitre 87 n'en retient **qu'une seule
> chose** : le **classement relatif des essences canadiennes par résistance mécanique**, qui est
> une propriété du matériau. Il ne reprend **aucune** des prescriptions normatives de cette page,
> et il renvoie explicitement le lecteur au Code de construction du Québec en vigueur et à la
> RBQ pour tout ce qui porte.

---

## 1. Catégories de résistance mécanique des essences canadiennes

> « les espèces de bois indigènes au Canada ont été réparties en **quatre catégories de résistance
> mécanique**, de telle façon que les espèces possédant des résistances et des rigidités
> semblables sont rangés dans la même catégorie »

Tableau n° 1 de la page, recopié intégralement :

| Catégorie | Espèces |
| --- | --- |
| **I** | (a) Sapin de Douglas (dense) · (b) Sapin de Douglas, Mélèze occidental · (c) Pruche de l'Ouest |
| **II** | Cyprès jaune (Yellow Cedar) · **Mélèze laricin (Tamarack)** · Pin gris |
| **III** | Sapin gracieux et sapin grandissime · **Sapin baumier** · Pruche de l'Est · Pin de Murray · Pin à bois lourd · **Épinettes (toutes espèces)** |
| **IV** | **Thuya géant (Western Red Cedar)** · Pin rouge · Pin argenté et pin blanc · Peuplier faux-tremble, peuplier à grandes dents, peuplier baumier |

### Ce que le chapitre 87 en tire, et la limite qu'il pose

Parmi les essences du territoire de JP, la page classe **le mélèze laricin en II**, **le sapin
baumier et toutes les épinettes en III**, **le peuplier faux-tremble en IV**. C'est un
classement **relatif**, publié par le CNRC, et il renverse l'intuition : le mélèze des tourbières
est mécaniquement supérieur à l'épinette.

⚠ **Piège à ne pas commettre, et il est nommé dans le chapitre :** la catégorie IV contient le
**thuya géant** (*Thuja plicata*, Western Red Cedar, de Colombie-Britannique), **pas** le **thuya
occidental** (*Thuja occidentalis*), qui est le cèdre blanc de la Côte-Nord. Le tableau **ne
classe pas** le thuya occidental. Le chapitre 87 écrit donc que le thuya occidental n'est pas
classé ici, et s'appuie pour lui sur la fiche RNCan (« Très léger, tendre, faible »), pas sur ce
tableau. **À vérifier explicitement en relecture : c'est le genre de glissement d'une espèce à
l'autre qui produit une erreur de fait répétée avec assurance.**

Le **bouleau jaune** et le **bouleau à papier** ne figurent pas non plus : le tableau ne couvre
que des résineux (*softwood*).

## 2. Durée d'application de la charge

> « Quand la charge est d'application plus durable, comme dans le cas des entrepôts, les
> contraintes admissibles sont **réduites de 10 pour cent**; pour les surcharges de courte durée,
> telles que celles qui sont dues au vent, on accorde un **accroissement de 33 pour cent** des
> contraintes admissibles. »

Le chapitre en retient le **principe**, pas les pourcentages : le bois supporte moins longtemps
qu'il ne supporte fort. Une charge permanente — la neige d'un mois de février, une pièce de
viande suspendue tout l'hiver — est plus sévère qu'une pointe brève de même valeur.

## 3. Bois « à l'état sec »

> « Quand la teneur moyenne annuelle du bois en humidité ne dépasse pas **15 pour cent**, comme
> c'est le cas dans la plupart des endroits abrités, on considère que le bois est à l'état sec.
> S'il ne se trouve pas dans cet état, on doit **réduire en conséquence les contraintes
> admissibles**. »

Se recoupe exactement avec les 14 à 16 % des régions côtières du CBD-244-F : le bois du hangar de
JP est **à la limite** de ce que cette page appelle sec.

## 4. Fermes de toit — l'ordre de grandeur d'une charge de toit

> « les fermes en bois des toitures doivent être capables de supporter pendant **24 heures** une
> charge égale au poids du plafond supérieur, plus les **8/3 de la charge prévue d'enneigement**
> du toit. La charge totale ne doit toutefois pas être inférieure à **60 liv./pi.²**. Ces fermes
> ne doivent pas fléchir de plus de **1/360e** de la longueur de la portée après une heure
> d'application du poids du plafond, plus 4/3 de la charge d'enneigement prévue, la charge totale
> ne devant pas être inférieure à **30 liv./pi.²**. »

Conversion du livre (1 lb/pi² = 47,88 Pa) : 60 lb/pi² = **2,9 kPa** · 30 lb/pi² = **1,4 kPa**.

⚠ **Ce critère de 1966 est périmé comme règle.** Il est conservé au dossier pour une seule raison :
il montre qu'une charpente d'habitation est vérifiée à **plus de deux fois et demie** la charge de
neige prévue, et non à la charge prévue. Le chapitre 87 s'en sert pour dire au lecteur pourquoi
il ne calcule pas lui-même un assemblage porteur — et non pour lui donner un critère à appliquer.

## 5. Variabilité et défauts

> « Les pièces de bois, telles quelles sortent individuellement du banc de sciage, se rangent dans
> un large éventail de qualités et d'aspects, basé sur la présence de **noeuds, la pente du fil**
> (slope of grain), les **gerçures** (shakes) et autres traits caractéristiques et par conséquent
> subissent de **fortes variations de résistance** »

> « leur classification est plus rigoureuse […] car elle dépend de la présence de noeuds, de
> gerces, de fentes traversantes, de la **pente du fil** et d'autres défauts réduisant la
> résistance de la pièce. »

C'est la source de la règle de tri du chapitre : dans une pièce assemblée, **le fil doit suivre
la pièce**. Une pente de fil marquée transforme un effort dans le fil en effort en travers du
fil, là où le bois ne vaut plus que 3,1 MPa (CBD 85F).

## 6. Ce que la page **ne** donne **pas**

- **Rien sur les assemblages traditionnels.** Elle parle de goussets de contreplaqué cloués, de
  bois lamellé-collé et de normes CSA. Pas un mot de tenon, de mortaise, de cheville ou d'enture.
- Aucune valeur numérique de résistance par essence : le tableau est un **classement**, pas des
  chiffres.
- Aucune charge de neige par localité : elles viennent du CNB, fiche
  `87-cecobois-cnb-charges-de-neige-cote-nord.md`.
