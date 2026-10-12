# MSSS — Besoins énergétiques estimatifs par groupe d'âge (reprise pour le chapitre 26)

- **Organisme :** ministère de la Santé et des Services sociaux du Québec
- **Document :** guide d'application du volet alimentation de la Politique-cadre « Pour un
  virage santé à l'école », chapitre 3, « Évaluation des besoins nutritionnels en fonction de
  l'âge » (2008)
- **URL :** https://publications.msss.gouv.qc.ca/msss/fichiers/2008/chapitre3.pdf
- **Date de consultation de la page vive :** 2026-09-20 (captation faite pour le chapitre 8)
- **Statut de cette reprise :** **la page vive n'a pas été refetchée le 2026-09-20 pour le
  chapitre 26.** Ce fichier reprend la captation intégrale déjà enregistrée dans
  `sources/08-msss-besoins-energetiques.md` et y ajoute le recoupement avec les formules de
  Santé Canada. Le vérificateur technique refait la captation à la source avant l'impression.
- **Sert au chapitre 26 pour :** la ligne de base des calories, et la validation des kcal du
  chapitre 8

---

## Extraits intégraux (repris de la captation du chapitre 8)

> « Il convient de préciser que le niveau « actif » d'activité physique a été retenu pour établir
> les besoins énergétiques estimatifs. [...] Les valeurs présentées ici sont des approximations
> calculées à partir de la taille et du poids médians au Canada. »

> « Niveau d'activité « actif » : 60 minutes d'activités physiques modérées par jour pour les
> jeunes âgés de 18 ans ou moins et 30 minutes d'activités physiques modérées par jour pour les
> adultes en plus des activités quotidiennes typiques. »

### Tableau 1 — niveau d'activité « actif » (kcal/jour)

| Groupe | Filles / Femmes | Garçons / Hommes |
| --- | --- | --- |
| 4-5 ans | 1 500 | 1 650 |
| 6-7 ans | 1 700 | 1 800 |
| 19-30 ans | 2 350 | 3 000 |
| 31-50 ans | 2 250 | 2 900 |

### Tableau 2 — niveau d'activité « sédentaire » (kcal/jour)

| Groupe | Filles / Femmes | Garçons / Hommes |
| --- | --- | --- |
| 4-5 ans | 1 200 | 1 250 |
| 6-7 ans | 1 300 | 1 400 |
| 19-30 ans | 1 900 | 2 500 |
| 31-50 ans | 1 800 | 2 350 |

---

## Recoupement fait pour le chapitre 26

Les valeurs du MSSS se reconstruisent à partir de la formule de Santé Canada
(`sources/26-sante-canada-anref-energie-et-macronutriments.md`) avec le coefficient d'activité
« actif ». Vérification faite :

**Homme 19-30 ans**, formule `BÉE = 662 – (9,53 × âge) + CA × {(15,91 × poids) + (539,6 × taille)}`,
avec 30 ans, 70 kg, 1,77 m et CA = 1,25 (actif) :

> 662 – 285,9 + 1,25 × (1 113,7 + 955,1) = 376,1 + 2 586,0 = **2 962 kcal/jour**, arrondi à
> 3 000 par le MSSS.

**Femme 19-30 ans**, formule `BÉE = 354 – (6,91 × âge) + CA × {(9,36 × poids) + (726 × taille)}`,
avec 30 ans, 57 kg, 1,63 m et CA = 1,27 (actif) :

> 354 – 207,3 + 1,27 × (533,5 + 1 183,4) = 146,7 + 2 180,5 = **2 327 kcal/jour**, arrondi à
> 2 350 par le MSSS.

Les deux valeurs du MSSS sont donc cohérentes avec la formule de Santé Canada pour un adulte de
taille et de poids médians au niveau « actif ».

**Les poids et les tailles de référence (70 kg / 1,77 m et 57 kg / 1,63 m) sont une
rétro-déduction faite ici**, pas une donnée publiée par le MSSS ni par Santé Canada. Elles
servent à montrer que les deux documents se recoupent ; elles ne servent pas à calculer les
besoins réels d'une personne. `[À VÉRIFIER]` par le relecteur nutritionniste.

## Ce que le document NE dit PAS

Il ne donne **aucune majoration pour le froid ni pour le travail physique d'hiver**. Le niveau
« actif » du MSSS correspond, pour un adulte, à 30 minutes d'activité modérée par jour en plus
des activités quotidiennes typiques. Fendre du bois, pelleter, marcher en raquettes et lever des
pièges toute une journée dépasse largement cette définition. La correction passe par le
coefficient d'activité de Santé Canada, pas par un pourcentage inventé.
