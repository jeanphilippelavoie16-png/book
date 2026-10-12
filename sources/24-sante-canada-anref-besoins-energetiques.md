# Santé Canada — ANREF, équations d'estimation du besoin énergétique (BEE / EER)

- **Organisme :** Santé Canada, Apports nutritionnels de référence (ANREF / DRI)
- **Titre de la page :** Dietary Reference Intakes — Equations to Estimate Energy Requirement
- **URL consultée :** https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables/equations-estimate-energy-requirement.html
- **Date de consultation :** 2026-09-20
- **Chapitre qui l'utilise :** 24 — Le mal de caribou (section 5, étape 2). Chapitre
  principal : 26 — Ce qu'un corps demande l'hiver.
- **État :** page lue en anglais. **Toutes les équations n'ont pas été extraites**, seulement
  les définitions de niveaux d'activité et quatre équations témoins. La version française
  n'a pas été consultée.

---

## Extrait intégral — définitions des niveaux d'activité physique (NAP / PAL)

Enfants et adolescents de 3 à 18 ans (bornes données pour 3 à 9 ans) :

> Inactive : 1,00 ≤ PAL < 1,31 · Low active : 1,31 ≤ PAL < 1,44 ·
> Active : 1,44 ≤ PAL < 1,59 · Very active : 1,59 ≤ PAL < 2,50

Adultes de 19 ans et plus :

> Inactive : 1,00 ≤ PAL < 1,53 · Low active : 1,53 ≤ PAL < 1,68 ·
> Active : 1,68 ≤ PAL < 1,85 · Very active : 1,85 ≤ PAL < 2,50

## Extrait intégral — équations témoins

> Garçons 3-4 ans, *inactive* :
> BEE = –447,51 + (3,68 × âge [a]) + (13,01 × taille [cm]) + (13,15 × poids [kg]) + 20

> Filles 3-4 ans, *low active* :
> BEE = –297,54 – (22,25 × âge [a]) + (12,77 × taille [cm]) + (14,73 × poids [kg]) + 15

> Hommes adultes, *active* :
> BEE = 1 004,82 – (10,83 × âge [a]) + (6,52 × taille [cm]) + (15,91 × poids [kg])

> Femmes adultes, *very active* :
> BEE = 511,83 – (7,01 × âge [a]) + (9,07 × taille [cm]) + (12,56 × poids [kg])

---

## Ce que ça change pour le chapitre 24

Le plafond protéique est un **pourcentage de calories**. Un pourcentage de calories ne devient
un nombre de grammes de viande qu'une fois qu'on connaît le besoin énergétique. Ces équations
donnent ce besoin **à partir du poids et de la taille réels de chaque membre de la maisonnée**,
ce qu'aucun tableau générique ne peut faire.

C'est la bonne façon de procéder au chalet : mesurer les quatre personnes une fois, calculer
quatre nombres, les écrire dans le carnet et s'en servir tout l'hiver.

## Ce que la page NE dit PAS

- **Aucune majoration pour le froid.** Rien sur -35 °C, rien sur le travail d'hiver, rien sur
  le poids des vêtements. La majoration hivernale reste `[À VÉRIFIER]` et appartient au
  chapitre 26.
- Aucune indication sur le **rationnement** ou le déficit volontaire.
- Les équations donnent le besoin d'une personne **au poids stable**. Une personne qui a déjà
  maigri n'est pas couverte.

## Valeurs de repère déjà au dossier

Le fichier `sources/08-msss-besoins-energetiques.md` (MSSS, guide d'application du volet
alimentation, 2008, https://publications.msss.gouv.qc.ca/msss/fichiers/2008/chapitre3.pdf)
contient les tableaux de besoins énergétiques par groupe d'âge en kcal/jour, captés lors de
la rédaction du chapitre 8. **Le PDF n'a pas pu être ré-extrait le 2026-09-20** (contenu
binaire non converti). Les valeurs de ce fichier restent la référence de travail du livre
pour les kcal, mais le chapitre 24 ne les emploie qu'en exemple de calcul, jamais comme
prescription.
