# CNESST — Gréage et levage : la formule du plan incliné, relue et recalculée

- **Organisme :** Commission des normes, de l'équité, de la santé et de la sécurité du travail
  (CNESST), Québec — *Gréage et levage, guide de sécurité* (fiche principale :
  `86-cnesst-greage-et-levage-guide-de-securite.md`)
- **URL :** https://www.cnesst.gouv.qc.ca/sites/default/files/documents/guide-greage-levage.pdf
- **Fichier enregistré :** `86-cnesst-guide-greage-levage.pdf` (PDF complet, 10,7 Mo, HTTP 200)
- **Consultée le :** 24 septembre 2026, `curl`, texte extrait par `pdftotext -layout` (page 102 du
  guide, section « Plans inclinés »)
- **Sert au chapitre :** 86 — Leviers, poulies, treuils (§5-D, étape 2)

---

## Extraits intégraux (page 102)

> « La méthode utilisée pour calculer l'effort de traction sur un plan incliné est une méthode
> approximative. Bien que largement utilisée en raison de sa simplicité, cette méthode donne des
> valeurs supérieures aux efforts réellement requis. La formule est plus précise pour les faibles
> inclinaisons (1:5) que pour celles plus raides (1:1). Le tableau 1 montre la différence entre
> l'effort réel requis et l'effort calculé compte tenu d'un coefficient de friction de 5 %. »

Tableau 1 — « Effort réel par rapport à l'effort calculé au moyen de la méthode simplifiée -
Coefficient de friction de 5 % » :

| Méthode simplifiée | Effort réel | Erreur |
| --- | --- | --- |
| F = 0,250 P | F = 0,245 P | 2 % |
| F = 0,383 P | F = 0,364 P | 5 % |
| F = 0,550 P | F = 0,492 P | 12 % |
| F = 1,050 P | F = 0,742 P | 42 % |

> « La méthode simplifiée convient à la plupart des applications parce que le coefficient de
> friction est lui-même approximatif. »

> « Formule (coefficient de friction de 5 %)
> F = P x H/L x 0,50 P
> Où
> F = Effort requis
> H = Hauteur
> L = Longueur
> P = Poids de la charge »

---

## Ce que la relecture établit

**La formule imprimée est une coquille.** « F = P x H/L x 0,50 P » multiplie le poids par lui-même
et ne redonne aucune ligne du tableau. La formule **F = P × H/L + 0,05 P** redonne les quatre
lignes de la colonne « méthode simplifiée » au millième, pour H/L = 0,2 ; 1/3 ; 0,5 ; 1.

**La colonne « effort réel » se recalcule aussi,** avec l'effort exact sur une pente d'angle θ et un
frottement de 5 % : F = P (sin θ + 0,05 cos θ), en prenant **tan θ = H/L**, c'est-à-dire **L mesurée à
l'horizontale** :

| H/L | P × H/L + 0,05 P | P (sin θ + 0,05 cos θ) | Écart |
| --- | --- | --- | --- |
| 0,2 (1:5) | 0,250 P | 0,245 P | 2 % |
| 1/3 | 0,383 P | 0,364 P | 5 % |
| 0,5 | 0,550 P | 0,492 P | 12 % |
| 1 (1:1) | 1,050 P | 0,742 P | 41,5 % (42 % au guide) |

Calcul fait le 24 septembre 2026 ; il reproduit le tableau du guide aux arrondis près. Deux
conséquences pour le chapitre :

1. La formule du chapitre, **F = P × H/L + 0,05 P**, est la bonne.
2. L'erreur est **du côté sûr** : la méthode surestime l'effort, et d'autant plus que la pente est
   raide (le guide le dit : « des valeurs supérieures aux efforts réellement requis »).

## Ce que la page NE dit PAS

- Elle ne précise pas si L se mesure le long de la pente ou à l'horizontale. Le tableau ne se
  recalcule qu'avec L à l'horizontale ; mesurée le long de la pente, la formule donne un chiffre
  plus bas, qui reste au-dessus de l'effort réel.
