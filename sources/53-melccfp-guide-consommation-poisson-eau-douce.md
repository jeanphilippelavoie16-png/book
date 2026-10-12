# MELCCFP — Guide de consommation du poisson de pêche sportive en eau douce

- **Organisme :** Gouvernement du Québec, ministère de l'Environnement, de la Lutte contre les
  changements climatiques, de la Faune et des Parcs (MELCCFP)
- **Titre :** « Guide de consommation du poisson de pêche sportive en eau douce » — page
  « À propos du Guide » et page d'accès à l'application
- **URL :** https://www.environnement.gouv.qc.ca/eau/guide/presentation.htm
  et https://www.environnement.gouv.qc.ca/eau/guide/localisation.asp
- **Lien d'entrée :** la page Québec.ca « Recommandations sur la consommation de poisson »
  (`53-quebec-consommation-poisson-recommandations.md`) renvoie à ce guide : « Consulter le Guide
  de consommation du poisson de pêche sportive en eau douce », qui « contient des règles de
  consommation qui tiennent compte des différents sites de pêche ».
- **Consultée le :** 24 septembre 2026
- **Captation :** `curl` (HTTP 200), texte extrait du HTML. Copies enregistrées :
  `53-melccfp-guide-consommation-poisson-presentation.html`,
  `53-melccfp-guide-consommation-poisson-localisation.html`
- **Sert au chapitre :** 53 — Truite et omble au lac (§5-A, tableau et « Ce que le tableau dit »)

---

## Extraits intégraux — page « À propos du Guide »

> « Le Guide de consommation du poisson de pêche sportive en eau douce répertorie les
> recommandations de consommation de près de 1 400 sites de pêche selon les espèces et la
> taille des poissons. Les recommandations visent à réduire les risques liés à la consommation
> de poisson à long terme. Le Guide est ainsi surtout destiné aux personnes qui consomment
> régulièrement du poisson. »

> « Pour l'humain, le contaminant le plus préoccupant retrouvé dans le poisson de pêche
> sportive en eau douce est le mercure. […] Pour déterminer les quantités de poisson à
> consommer, les 3 facteurs suivants sont pris en compte : Le lieu de pêche; L'espèce de
> poisson; La taille du poisson. »

> « La teneur en contaminants augmente selon l'alimentation des poissons eux-mêmes et selon
> leur taille. […] Les poissons insectivores (qui se nourrissent d'insectes) sont les moins
> contaminés. Les poissons benthivores (qui se nourrissent des organismes vivant au fond de
> l'eau) sont un peu contaminés. Les poissons piscivores (qui se nourrissent d'autres poissons)
> sont les plus contaminés. On comprendra donc que, surtout pour les poissons piscivores, plus
> les poissons sont gros, moins on peut en manger. »

> « Les recommandations sont indiquées en nombre de repas par mois. Un repas équivaut à une
> portion de 230 g (8 oz) de poisson avant la cuisson. Cependant, la limite de consommation
> mensuelle doit tenir compte de toutes les espèces consommées. »

> « Ainsi, un pêcheur qui consommerait du poisson seulement lors de son voyage de pêche annuel a
> un risque quasi inexistant d'accumuler des contaminants dans son corps. »

> « Recommandation particulière concernant les poissons piscivores — Pour les jeunes enfants,
> les femmes qui planifient une grossesse et les femmes enceintes ou qui allaitent, il est
> préférable de consommer les espèces de poisson pour lesquelles la recommandation est de
> 4 repas par mois et 8 repas par mois. Les espèces pour lesquelles on recommande 2 repas par
> mois doivent être consommées de manière occasionnelle seulement puisqu'elles sont plus
> sujettes à la contamination. »

> « En cas d'absence de recommandation — Si aucune recommandation n'est disponible ou qu'un
> site de pêche n'est pas cliquable sur la carte, ce sont alors ces recommandations générales
> qui s'appliquent : »

| Recommandation générale | Espèces (texte intégral de la page) |
| --- | --- |
| **8 repas\* par mois** | Grand corégone · Omble de fontaine (truite mouchetée) · Autres truites (sauf le touladi) · Éperlan arc-en-ciel · Saumon de l'Atlantique · Poulamon · Alose savoureuse |
| **4 repas\* par mois** | Barbotte · Crapet · Esturgeon · Lotte · Meunier · Perchaude |
| **2 repas\* par mois** | Achigan\*\* · Brochet\*\* · Doré\*\* · Maskinongé\*\* · Touladi (truite grise)\*\* |

> « \* Un repas : 230 grammes (8 onces) de poisson frais. »

> « \*\* Pour les personnes vulnérables, soit les jeunes enfants, les femmes qui planifient une
> grossesse, les femmes enceintes et celles qui allaitent, il est recommandé de manger ces
> espèces de poisson de manière occasionnelle seulement. »

## Extraits intégraux — page d'accès (localisation.asp)

> « Les recommandations concernant la consommation du poisson de pêche sportive en eau douce
> sont désormais disponibles dans l'application : par espèce de poisson; par plan d'eau; par
> station. »

> « Les recommandations du Guide de consommation du poisson de pêche sportive en eau douce
> peuvent également être consultées dans l'Atlas de l'eau. »

Application : https://geo.environnement.gouv.qc.ca/portail/apps/experiencebuilder/experience/?id=6eead579659d48f6bdcfc015ce55b733
(application cartographique en JavaScript, non interrogeable par l'outil de captation : la
liste des lacs de la Côte-Nord couverts **n'a pas été relevée**).

## Ce que la fiche permet d'écrire, et ce qu'elle ne permet pas

- **Permet :** il existe des recommandations **par plan d'eau** (près de 1 400 sites), qui
  tiennent compte du lieu, de l'espèce et de la taille. La phrase du chapitre « aucune donnée
  par plan d'eau n'a été trouvée » est donc fausse telle quelle.
- **Permet :** sans recommandation pour le lac, l'omble de fontaine est à **8 repas par mois**
  dans ce guide, alors que la page santé de Québec.ca le range « sans restriction ». Les deux
  pages officielles ne disent pas la même chose (voir la fiche de vérification du ch. 53).
- **Permet :** pour les jeunes enfants, les espèces à 2 repas par mois (touladi compris) se
  mangent « de manière occasionnelle seulement ».
- **Ne permet pas :** dire si un lac précis de la Côte-Nord est couvert, ni quelle y est la
  recommandation. Ça se cherche dans l'application, lac par lac.
- **Omble chevalier :** absent des deux listes générales, sous ce nom comme sous un autre.

---

## Relecture de la page santé Québec.ca, 24 septembre 2026

Page : https://www.quebec.ca/sante/alimentation/saines-habitudes-alimentaires/consommation-de-poisson-et-sante/recommandations
(`WebFetch`, relevé des listes). Liste « Poissons et fruits de mer à consommer sans
restriction », rubrique « Poissons de pêche sportive », texte intégral :

> « l'alose savoureuse · l'éperlan (éperlan arc-en-ciel) · le grand corégone · l'omble de
> fontaine (truite mouchetée) · les autres truites (sauf le touladi) · le poulamon atlantique ·
> le saumon atlantique »

Tableau « Poissons de pêche sportive à consommer avec restrictions » : « Barbotte, Crapet,
Esturgeon, Lotte, Meunier, Perchaude — 4 repas par mois » ; « Achigan, Brochet, Doré,
Maskinongé, Touladi (truite grise) — 2 repas par mois ».

Renvoi de la même page : « Consulter le Guide de consommation du poisson de pêche sportive en
eau douce », qui « contient des règles de consommation qui tiennent compte des différents
sites de pêche ».

**L'omble chevalier n'est nommé nulle part sur la page.** La truite arc-en-ciel n'est pas
nommée ; elle tombe sous « les autres truites ».
