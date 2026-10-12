# Chapitre 47 — Pages cherchées et non obtenues le 2026-09-20

Ce fichier existe pour qu'un poste ultérieur ne refasse pas le même chemin pour rien, et pour
que l'éditeur sache exactement où le chapitre est aveugle.

---

## 0. Contrainte de la session

**Le budget de recherche web du poste était déjà épuisé à l'ouverture** (200 appels
`WebSearch` sur 200). Tout le travail a donc été fait par **récupération directe d'URL**
(`WebFetch`), en descendant l'arbre de Québec.ca page par page à partir de
`/agriculture-environnement-et-ressources-naturelles/faune`. Les pages trouvées sont bonnes,
mais **rien ne garantit qu'une meilleure page n'existe pas ailleurs.** Un poste avec du budget
de recherche doit refaire une passe sur les cinq trous ci-dessous.

---

## 1. LégisQuébec — HTTP 403

| Adresse | Réponse | Ce qu'on cherchait |
| --- | --- | --- |
| `https://www.legisquebec.gouv.qc.ca/fr/document/lc/C-61.1` | **403 Forbidden** | Loi sur la conservation et la mise en valeur de la faune : définition de « chasse », article sur l'abattage d'un animal causant des dommages, article sur la nécessité |
| `https://www.legisquebec.gouv.qc.ca/fr/document/rc/C-61.1,%20r.%2012` | **403 Forbidden** | Règlement sur la chasse : le mot « porc-épic » y figure-t-il, et sous quel statut |

**C'est le trou le plus grave du chapitre.** Le statut légal exact du porc-épic au Québec n'a
pas pu être établi au texte de loi. Le chapitre s'en tient donc à deux faits vérifiables —
l'absence de l'espèce sur la liste du petit gibier, et la voie « dommages à la propriété » — et
renvoie à la réglementation de l'année et à la ligne 1 877 346-6763.

**LégisQuébec refuse la récupération automatique.** Un poste humain doit ouvrir les deux
adresses dans un navigateur et coller les articles dans un fichier `47-legisquebec-*.md`.

---

## 2. Liste des animaux à fourrure du Québec — non ouverte

La page d'entrée du piégeage
(`/tourisme-loisirs-sport/activites-sportives-et-de-plein-air/piegeage`) est un aiguillage. Elle
nomme les rubriques « Piéger au Québec », « Périodes de piégeage » et « Certificat et permis
de piégeage », mais **aucune liste d'espèces**. Les sous-pages n'ont pas été ouvertes faute
d'adresses connues.

**Question ouverte :** le porc-épic est-il un animal à fourrure au sens du règlement ? Le
chapitre ne le dit ni dans un sens ni dans l'autre.

---

## 3. Liste des animaux à déclaration obligatoire — non ouverte

La page « Quoi faire en présence d'animaux sauvages sur votre propriété » y renvoie sans donner
l'adresse dans le texte capté. **Le chapitre ne peut donc pas dire si un porc-épic abattu pour
dommages doit être déclaré à un agent de protection de la faune.** Il écrit la règle générale
et dit qu'il faut vérifier. C'est la question n° 2 au relecteur.

---

## 4. Composition nutritionnelle de la viande de porc-épic — HTTP 429

| Adresse | Réponse |
| --- | --- |
| `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=porcupine` | **429 Too Many Requests**, `Retry-After: 11801` |

La clé publique `DEMO_KEY` de l'USDA FoodData Central était en limite de débit, probablement
épuisée par la session du ch. 24. **Aucune valeur de protéines, de lipides ou d'énergie pour le
porc-épic n'existe dans ce livre.** Le chapitre affirme que le porc-épic est une bête grasse
comparée au lièvre, mais **ne le chiffre pas**, et le dit.

À reprendre : `api.nal.usda.gov/fdc/v1/foods/search` avec une vraie clé, jeu `SR Legacy`,
requêtes `porcupine`, et à défaut le Fichier canadien sur les éléments nutritifs, qui est la
source de premier rang.

**Il est possible qu'aucune entrée « porcupine » n'existe dans ces bases.** Dans ce cas, la
mention `[À VÉRIFIER]` reste, et le livre assume de ne pas avoir le chiffre.

---

## 5. Retrait d'un piquant planté dans une plaie humaine — aucune source officielle

Aucune page du MSSS, de l'INSPQ, de la CNESST ni de Santé Canada retrouvée sur le sujet. Les
pages consultées couvrent la morsure et la griffure (rage), la plaie souillée (tétanos) et le
lavage des plaies, **jamais le corps étranger barbelé**.

Ce que le chapitre écrit sur le retrait vient de la pratique et **c'est écrit tel quel à la
§10**. Le seul appui sourcé est le mécanisme lui-même, tiré de Faune et flore du pays : les
aiguillons gonflent à l'humidité et font pénétrer le piquant davantage.

**Question n° 1 au relecteur.**

---

## 6. Adresses essayées qui répondent 404

| Adresse | Réponse |
| --- | --- |
| `https://www.quebec.ca/habitation-territoire/animaux-importuns` | **404** |
| `https://www.canada.ca/fr/sante-canada/services/conseils-generaux-salubrite-aliments/temperatures-cuisson-internes-securitaires.html` | **404** (déjà relevé au ch. 40) |

## 7. Trouvaille de navigation à conserver pour les ch. 43 à 52

Les **fiches d'espèce** de Québec.ca sont sous :

```
/agriculture-environnement-et-ressources-naturelles/faune/animaux-sauvages-quebec/
  fiches-especes-fauniques/<espece>
```

L'adresse construite à la main `.../fiches-especes-fauniques/porc-epic` répond. La liste compte
**185 entrées paginées par 10** : ne pas la parcourir, construire l'adresse. Aucune fiche
d'espèce n'est accessible depuis `/faune/cohabiter-animaux-sauvages`, contrairement à ce que le
nom laisse croire.
