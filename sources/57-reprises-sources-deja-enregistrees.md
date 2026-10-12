# Chapitre 57 — Sources déjà au dossier, reprises sans refetch

Ces pages ont été enregistrées intégralement pour des chapitres antérieurs. Le chapitre 57 s'en
sert **sans les refetcher** : les extraits qui portent les chiffres sont déjà au dossier, à
l'endroit indiqué. Aucune de leurs valeurs n'est recopiée ici, pour qu'il n'existe qu'une seule
copie de chaque chiffre dans le projet.

- **Date de la reprise :** 2026-09-20

---

| Fiche d'origine | Organisme | Ce que le ch. 57 en tire | Sections |
| --- | --- | --- | --- |
| `sources/12-sante-canada-vitamine-c-anref.md` | Santé Canada — ANREF 2005 | **ANR en vitamine C : 15 mg/j (1-3 ans), 25 mg/j (4-8 ans), 90 mg/j (homme), 75 mg/j (femme)** ; AMT 650 mg chez l'enfant de 4 à 8 ans. Sert à l'arithmétique de la section 3 | 3, 6 |
| `sources/25-ntp-thuyone.md` | NTP (États-Unis), TR-570 | **La thuyone provoque des convulsions** chez l'animal de laboratoire. Sert au rappel obligatoire sur le thuya, répété ici parce que la section 9 propose une infusion de conifère à côté des fruits | 9 |
| `sources/25-rncan-sapin-baumier.md` | Ressources naturelles Canada | Identification du **sapin baumier**, l'espèce à utiliser en infusion plutôt que le thuya | 9 |
| `sources/08-sante-canada-conserves-botulisme.md` | Santé Canada | Version d'origine de la page des conserves. Le ch. 57 l'a refetchée (`57-sante-canada-conserves-botulisme.md`) pour en extraire le classement des fruits | 8 |
| `sources/01-quebec-temperatures-conservation.md` | MAPAQ / Québec.ca | **Zone de danger 4 à 60 °C** | 6, 9 |
| `sources/04-sante-canada-generatrice-monoxyde.md` | Santé Canada | **Génératrice jamais dans un bâtiment, un garage ou sous un auvent.** Rappel obligatoire de `CLAUDE.md`, répété ici parce que la section 9 envisage de faire tourner une génératrice pour sauver un congélateur plein de fruits | 9 |
| `sources/08-sante-monteregie-generatrice-monoxyde.md` | Direction de santé publique de la Montérégie | Recoupement du même rappel | 9 |
| `sources/29-msss-centre-antipoison-du-quebec.md` | MSSS | Numéro du Centre antipoison. Refetché aussi sous `57-msss-centre-antipoison.md` | 7, 8, 9 |

---

## Note d'arborescence, vérifiée le 2026-09-20

La branche de la salubrité alimentaire de Québec.ca tient toujours à cette adresse :

```
https://www.quebec.ca/sante/alimentation/salubrite-aliments-prevention-risques/
  salubrite-aliments-domicile/<section>
```

Sections confirmées HTTP 200 ce jour-là : `conservation-aliments`,
`conservation-aliments/conseils-entreposage-securitaire`,
`preparation-aliments-cuisson-securitaires`,
`preparation-aliments-cuisson-securitaires/conserves-maison`.

**Il n'existe pas de sous-page `congelation-aliments`** dans cette branche : la matière de la
congélation est répartie entre `conseils-entreposage-securitaire` et
`conserver-jeter-panne-courant-inondation`. Deux chapitres à venir (68, 69, 73) gagneront à
partir de là plutôt que de deviner.

## Note au rédacteur du ch. 24 et à celui du ch. 44

**L'API du Fichier canadien sur les éléments nutritifs répond de nouveau.** Elle donnait des
erreurs 500 lors de la rédaction du chapitre 44 et des 404 au chapitre 24, ce qui avait forcé
ces deux chapitres à s'appuyer sur l'USDA pour la composition du lièvre. Les deux points
d'entrée fonctionnent le 2026-09-20 et sont documentés dans
`sources/57-sante-canada-fcen-petits-fruits.md`. **Les valeurs USDA des chapitres 24, 41, 44 et
48 peuvent être remplacées par des valeurs de Santé Canada.**
