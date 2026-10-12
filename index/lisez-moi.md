# L'index — comment lire ces fichiers

Pour l'assembleur des tomes (`design/outils/assembler-tome.py`). Établi le 27 septembre 2026.

Il n'y a pas encore de numéros de page : ces fichiers donnent **les entrées et leurs ancres**.
L'assembleur pose une cible à chaque ancre dans le rendu, puis imprime la page où elle tombe.

## Les fichiers

| Fichier | Ce qu'il porte |
| --- | --- |
| `tome-1.json` … `tome-6.json` | L'index de chaque tome, à imprimer à la fin du tome. Entrées → ancres dans les chapitres **de ce tome seulement** |
| `general.json` | La table générale des six tomes, à imprimer au début de chaque tome : une ligne par terme, qui dit dans quels tomes et quels chapitres il se trouve. Pas de page |
| `vocabulaire.txt` | La source : ce qu'on indexe et comment on le reconnaît. C'est lui qu'on corrige, jamais les JSON |
| `outils/construire-index.py` | Refait les sept JSON à partir du vocabulaire et du Markdown actuel des chapitres |
| `outils/verifier-ancres.py` | Vérifie que chaque ancre se retrouve une fois, et une seule, dans le Markdown |
| `outils/rapport.txt` | Écrit par `construire-index.py --rapport` : entrées sans ancre, termes très répandus, renvois orphelins |

**Les chapitres bougent encore.** Avant chaque assemblage :

```
python index/outils/construire-index.py
python index/outils/verifier-ancres.py      # doit finir par « 0 en défaut »
```

Un titre réécrit dans un chapitre fait simplement tomber ou déplacer l'ancre au prochain passage.

## `tome-N.json`

```json
{
 "tome": 4, "titre": "De la bête au garde-manger",
 "chapitres": ["61", "62", "…", "81"], "etabli_le": "2026-09-27", "nombre_entrees": 150,
 "entrees": [
  {
   "terme": "Omble de fontaine, truite mouchetée (Salvelinus fontinalis)",
   "latin": "Salvelinus fontinalis",
   "voir_aussi": ["Traiter le poisson à la sortie de l'eau"],
   "voir_aussi_ailleurs": [{"terme": "Touladi, truite grise (Salvelinus namaycush)", "tomes": [3]}],
   "ancres": [
    {"ch": "76", "fichier": "76-saler-et-secher-la-truite.md", "titre": "A — Ce qui entre",
     "niveau": 3, "chemin": ["5. Procédure", "A — Ce qui entre"], "ligne": 121}
   ]
  },
  {
   "terme": "Pourcentage de sel (calcul)",
   "voir_aussi": ["Sel", "Balance (peser sans balance)"],
   "ancres": [
    {"ch": "67", "fichier": "67-le-sel.md", "etape": {"n": 12, "libelle":
     "Tous les pourcentages de sel de ce livre se calculent sur le poids de la viande."},
     "chemin": ["5. Procédure", "Bloc C — Le pourcentage, et ce qu'il coûte à table (étapes 12 à 17)"],
     "ligne": 217}
   ]
  },
  {"terme": "Truite mouchetée", "voir": ["Omble de fontaine, truite mouchetée (Salvelinus fontinalis)"]}
 ]
}
```

- **`entrees`** est déjà triée dans l'ordre alphabétique français (accents et article initial
  ignorés : « L'… », « Le … »). Pas besoin de retrier.
- **`terme`** s'imprime tel quel. S'il y a un champ **`latin`**, la même chaîne termine le terme
  entre parenthèses : **l'imprimer en italique**, parenthèses en romain.
- **`voir_aussi`** : autres entrées **du même tome**, dans l'ordre utile. Imprimer « voir aussi … ».
- **`voir_aussi_ailleurs`** : entrées qui ne sont que dans d'autres tomes. Imprimer « voir aussi
  … (t. 3) » ou les laisser à la table générale ; au choix de la mise en page.
- **Une entrée qui a `voir` et pas d'`ancres`** est un renvoi pur (le nom québécois ou l'autre nom
  pointe vers l'entrée principale) : « Truite mouchetée → Omble de fontaine, truite mouchetée ».
- **`ancres`** : au plus six, **les plus utiles d'abord** — l'ordre compte, ne pas le retrier par
  page. Au rendu, deux ancres qui tombent sur la même page s'impriment une fois.

### Retrouver une ancre dans le Markdown

Chaque ancre est **soit un titre, soit une étape**. `ligne` n'est qu'un indice, valable le jour où
le fichier a été établi : on cherche par le texte.

- **Titre** (`titre`, `niveau`) : la ligne `#`×`niveau` + espace + `titre`, texte **exact**, y
  compris ce qu'il porte de Markdown (`**Maison**`, un appel de note `[^4]`). `niveau` 1 est le
  titre du chapitre ; l'ancre vise alors le début du chapitre.
- **Étape** (`etape.n`, `etape.libelle`) : la ligne qui commence par `**{n}. {libelle}**` ou par
  `{n}. **{libelle}**`. Les étapes ancrées sont seulement celles des sections 5 (procédure) et 9
  (variante d'urgence), à libellé gras.
- **`chemin`** : les titres de niveau 2, 3 et 4 sous lesquels l'ancre se trouve, du plus haut au
  plus bas (le titre de chapitre n'y est pas). **Il est obligatoire pour trancher** : « Ce qui ne
  se remplace pas » ou « 8. Danger » reviennent dans plusieurs chapitres, et une étape « 4 » peut
  exister deux fois dans un même chapitre sous deux sous-sections. La correspondance (fichier,
  chemin, texte) est unique : `verifier-ancres.py` le contrôle, et sa fonction `trouver()` est la
  recherche à reprendre telle quelle.
- Les blocs de code (```` ``` ````) sont ignorés, comme au rendu.

L'assembleur pose la cible **sur le titre ou au début du paragraphe de l'étape** : la page imprimée
est celle où commence la section ou l'étape.

## `general.json`

```json
{"terme": "Botulisme",
 "tomes": [{"tome": 4, "chapitres": ["66", "77", "78", "80"], "principal": "78"},
           {"tome": 3, "chapitres": ["49", "52", "54", "56", "57", "59"], "principal": "54"},
           {"tome": 1, "chapitres": ["01", "03", "05", "06", "09", "17"], "principal": "05"}]}
```

- Même tri, mêmes `latin` et renvois purs (`voir`) que les index de tome.
- **`tomes`** : dans l'ordre d'importance (le tome qui porte le sujet d'abord), pas dans l'ordre
  des numéros. Une ligne imprimée : *Botulisme — t. 4 : 66, 77, 78, 80 · t. 3 : 49, 52… · t. 1 : 01, 03…*
- **`chapitres`** : en ordre de numéro. **`principal`** : celui qui porte le mieux le terme dans ce
  tome ; on peut le mettre en gras.
- Ce sont exactement les chapitres des ancres de `tome-N.json` : la table générale et les index de
  tome ne se contredisent jamais.
- Pas de numéro de page : le lecteur qui tient le tome 3 et cherche le botulisme voit en une ligne
  que c'est au tome 4, ch. 78 d'abord.

## Le vocabulaire (`vocabulaire.txt`)

Une ligne par entrée, cinq champs séparés par « | » entouré d'espaces :

```
Terme affiché [Nom latin] | motifs ; motifs | voir aussi ; … | chapitres forts | tomes
```

- **Motifs** : expressions régulières appliquées au texte en minuscules **sans accents**
  (é → e, œ → oe). Un motif qui commence par `~` s'applique au texte avec accents (*maïs* contre
  *mais*).
- **Chapitres forts** : le premier porte le sujet ; ils passent devant les autres.
- **Tomes** : restreint l'entrée quand le mot change de sens d'un tome à l'autre (*collet* du
  lièvre contre *collet* du plant ; *crosse* de fougère contre *crosse* de fusil).
- **Renvoi pur** : `Perdrix -> Gélinotte huppée ; Tétras du Canada`.
- Le nom latin n'entre qu'entre crochets et **seulement s'il est au glossaire** (`plan/glossaire.md`).

Comment le script choisit : chaque titre et chaque étape est une unité ; le score compte les
mentions du terme dans l'unité (plafonnées), vaut beaucoup plus quand le terme est **dans le
titre ou le libellé de l'étape**, pèse davantage en procédure, en danger et en variante d'urgence
qu'en matériel ou en « Quand l'utiliser », et moitié moins au chapitre d'achat (00b), qui nomme
presque tout une fois. Un tome qui n'a pas de chapitre fort pour un terme ne le reçoit que sur une
mention franche. Au plus deux ancres par chapitre (trois dans le chapitre qui porte le sujet).

## Ce qui reste à la main

- Le vocabulaire a été relu tome par tome le 27 septembre, mais un index se juge à l'usage : un
  terme qu'on cherche et qu'on ne trouve pas s'ajoute à `vocabulaire.txt`, une ancre qui tombe à
  côté se corrige en resserrant le motif ou en changeant les chapitres forts, puis on relance.
- Les chapitres des ancres sont des numéros **actuels** (tomes de six, 27 septembre 2026).
