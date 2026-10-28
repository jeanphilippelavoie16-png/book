# Gabarit de chapitre

Sept sections, toujours dans cet ordre, puis les notes « En plus ». C'est ce qui empêche 112 chapitres écrits sur des
mois de partir dans toutes les directions, et ce qui rend le livre utilisable en panique, parce qu'on sait toujours où
regarder. Ce fichier dit ce que chaque section porte. La phrase et le mot suivent le skill `ecriture`, qu'on cite par
ses principes (P1 à P14), et les fautes, le skill `langue`.

**Avant la section 1, la ligne de lieu, seule sous le titre** : `**Maison**`, `**Chalet**` ou `**Les deux**`, sans
note de lieu. La règle de bascule décide du lieu (`CLAUDE.md`, « Les deux lieux »). Ce qui change d'un lieu à l'autre,
on le dit dans l'étape qui change.

---

## 1. En une ligne

Ce que la technique fait, et combien de temps elle fait durer l'aliment ou la solution. Une phrase, pas deux.

## 2. Quand l'utiliser

**Seulement quand l'utiliser** : une courte liste des situations où on ouvre ce chapitre, sans sous-titre. Une ligne
par situation, en titre court, comme on l'écrirait à la main sur une fiche (« Panne de courant sans heure de retour »,
« Feu en vue », « Cendre ou aiguilles roussies sur la galerie »), sans justification. JP, 28 octobre 2026, sur « Le
courant manque et on ne sait pas quand il reviendra » : « la façon que t'écris c'est pas humain ». On enlève le verbe
qui sonne faux (« le courant manque », « la génératrice lâche ») et la phrase qui tourne autour (« on ne sait pas quand
il reviendra »). On garde une courte phrase quand c'est comme ça qu'on la dit (« Il faut partir vite », « Il manque le
judas »).

**Pas de liste « quand ne pas l'utiliser »** (JP, 15 octobre 2026, sur « C'est la mauvaise procédure quand : le feu est
dans le bâtiment, dans un chaudron » au chapitre du feu de forêt : « no shit qu'une procédure de feu de forêt couvre
pas un feu de chaudron ; quand l'utiliser, c'est juste quand l'utiliser, pas besoin de donner des exemples bidon »). On
n'écrit pas le contre-exemple évident. Le rare fait qui retourne un réflexe (devant une source radiologique perdue, on
s'éloigne au lieu de se confiner) va dans l'étape où il sert (P13), pas ici.

## 3. Matériel

**Seulement l'indispensable de cette procédure**, ce sans quoi elle échoue ou devient dangereuse, en liste, **une ligne
par item, 15 à 20 mots** : le nom en gras, puis ce qu'il fait ou ce que c'est. Un substitut seulement s'il est vital,
sinon « (→ section 7) ». Pas de tableau, pas de gants, d'étiquettes ni de ce que tout le monde a déjà. JP, 27 septembre
2026 : « c'est long pour rien ». Le format validé, où le deux-points annonce la fonction de l'item (P6) :

```
- **Thermomètre à sonde** : vérifie que la viande atteint 74 °C à cœur. On ne peut pas en fabriquer un.
- **Sel nitrité** : sel et nitrite de sodium, deuxième barrière contre le botulisme. On le dose selon l'emballage.
```

**On nomme l'item, sans le spécifier.** « Scie à chaîne », pas le pantalon forestier avec ses six numéros de norme
(aucun numéro de norme : `CLAUDE.md`, « Ce que ce livre est, et ce qu'il n'est pas »). Si un détail mérite de rester,
c'est celui qui dit ce que la chose **fait** : le pantalon de coupe bourre la chaîne et l'arrête. Ce détail change un
comportement, alors qu'un numéro ne change rien.

Le jour où l'item n'est pas là, on passe à la variante d'urgence (section 7), parce que c'est elle qui fabrique ou
remplace, pas la liste.

## 4. Procédure

Des étapes numérotées. Les quantités en grammes et en pourcentages, les températures en °C, les durées en heures ou en
jours. Le logigramme vient juste avant, après le Matériel. Un chapitre qui a des gestes urgents ouvre sa procédure sur
la série orange des premières minutes (`CLAUDE.md`, « Les premières minutes, en orange »). Un chapitre de référence
(listes, stocks, tableaux) peut remplacer la procédure numérotée par des tableaux, mais il garde l'ordre général.

Chaque étape porte un geste, à l'infinitif, dans l'ordre où on le fait (P8 et P9). Il n'y a plus de section « Comment
ça marche » (JP, 16 octobre 2026) : un mécanisme qui apprend quelque chose va dans l'étape qu'il explique, avec son
« parce que » (P3).

**Les dangers sont dans les étapes.** La section Danger est sortie des chapitres (JP, 18 octobre 2026 : « on crée des
pictogrammes pour tous les dangers ; les dangers sont expliqués une fois dans le livre, dans la section qui explique les
symboles ; chaque fois qu'un danger est présent, on affiche le pictogramme et on enlève la section »). Dans l'étape où
le danger se présente, on pose son pictogramme au début de la phrase (`{!id}`, ids dans `plan/dangers-inventaire.md`,
section 1), et on y écrit ce qui est propre au chapitre : la distance, l'épaisseur, la durée, le geste. Le mécanisme
général est dans la page du danger, au début du tome. Dans l'étape, on garde la demi-phrase de pourquoi quand le
réflexe normal est le mauvais (P2), et les neuf rappels de sécurité de `CLAUDE.md` restent toujours. Chaque
avertissement donne le **mécanisme**, jamais juste « attention », parce que le lecteur change de comportement quand il
comprend pourquoi. Pas de dilution : un pictogramme qu'on voit à chaque étape, personne ne le lit, alors on le pose
seulement là où le danger se présente.

## 5. Points de contrôle

Un tableau à structure fixe : le moment, ce qu'on vérifie, la cible chiffrée, quoi faire si c'est hors cible. **5 à 8
lignes au plus** (JP, 28 octobre 2026 : « faut que ça soit condensé, personne va lire 50 points de contrôle »),
seulement pour les moments où une mesure change une décision, une ligne par moment, et aucune ligne qui redit une étape.

## 6. Signes d'échec

On dit sans ambiguïté ce qui indique qu'il faut jeter, dans un tableau observation → diagnostic → action. « Ça sent
bizarre » ne suffit pas. **5 à 8 lignes au plus** (JP, 28 octobre 2026 : « même affaire pour les signes d'échec »),
seulement pour les signes qu'on ne verrait pas venir ou qu'on lirait de travers. Ce que la page du danger dit déjà, on y
renvoie.

## 7. Variante d'urgence

**C'est le cœur du chapitre, pas sa queue.** Sans électricité, sans matériel acheté, sans produit spécialisé, sans
pièce de remplacement, sans personne à appeler. Toujours à la même place dans le chapitre.

C'est ici que vit la raison d'être du livre. La manière propre avec le bon outil, le lecteur la connaît déjà, mais le
jour où il ouvre cette page, le bon outil n'est pas là. Souder avec deux batteries d'auto montées en série, remplacer un
joint par du cuir gras, fabriquer l'outil manquant, faire tenir la chose avec ce qui traîne : chaque fois qu'une manière
de faire avec rien existe, on la décrit ici en détail, au lieu de la mentionner.

Nommer honnêtement ce qu'on perd en la choisissant : le rendement, la durée de garde, la marge d'erreur. Et dire ce
qu'on ne peut vraiment pas remplacer, sans broder autour.

Une variante d'urgence de trois lignes est le signe que le chapitre n'a pas fait son travail.

---

## En plus (section non numérotée, à la fin)

Ajoutée le 18 octobre 2026 (JP : « fais un mixte et mets des encadrés pour montrer que c'est de l'extra, en vert
pâle »). Une réserve de 4 à 8 notes `### Titre`, 30 à 80 mots chacune (JP : « moins de texte »). Trois genres
seulement : la façon des Innus ou d'une autre nation du Nord (pourquoi elle marche, ce qui la rend dangereuse si on
change ses conditions), un fait, ou une photo pour reconnaître (`![légende](images/extras/….jpg)`). **Jamais de planche
ni de dessin** (JP : « je veux pas de planche dans les affaires vertes »). Ce qui est bon à savoir sans être nécessaire
au geste, jamais une redite du chapitre. La note dit son étape entre parenthèses quand elle en a une (« (étape 29) »),
parce que c'est ce qui la place.

La mise en pages (chapitre.js, `fillExtras` et `placerNotes`) pose chaque note dans un trou de la page (`CLAUDE.md`,
« Le gabarit »). L'allure de la note et sa place dans la page, avec les mots de JP, sont dans le cadre
(`.claude/cadre-agents.md`, « Le metteur en pages », « Les notes « En plus » »). Le moteur n'imprime pas une note qui
ne trouve pas de page, et le rapport de l'assembleur le dit.

## Ce qui n'est plus dans le chapitre

**La section Sources est retirée du livre**, et aucune attribution n'apparaît dans le texte : on écrit « 74 °C à
cœur », pas « 74 °C à cœur (MAPAQ) » (`CLAUDE.md`, règle 1 et « Ce qui ne s'imprime pas »). Le travail de source ne
change pas. On cherche les sources officielles **avant** d'écrire, on enregistre la page dans `/sources`, et la règle 1
tient : aucun chiffre inventé. Seul l'endroit où on range la provenance change.

| | Où ça vit maintenant |
| --- | --- |
| Les pages officielles enregistrées | `/sources` |
| Les chiffres `[À VÉRIFIER]` recensés | `plan/chiffres-a-valider.md` et la fiche du chapitre |
| La provenance de chaque chiffre | `suivi/NN-redaction.md` |

Les parenthèses qui restent portent un renvoi, une unité, l'impérial, une équivalence ou le nom d'usage qui précise
l'espèce (« le cèdre (thuya occidental) »), jamais un fait qui change le geste (P6). Jamais un nom d'organisme, jamais
un nom latin.

---

## Les conventions du livre

| Sujet | Règle |
| --- | --- |
| Unités, températures, sel | `CLAUDE.md`, règles 3 et 4. L'impérial reste entre parenthèses pour les dimensions de construction parce que le bois de construction est en pieds et en pouces |
| Salpêtre | Jamais donné en quantité. Toujours accompagné de sa forme moderne équivalente, parce qu'on ne dose pas les deux de la même façon |
| Espèces | Le nom français d'usage (aucun nom latin : `CLAUDE.md`, « Ce qui ne s'imprime pas ») |
| Saisons et quotas | Jamais de dates de saison ni de limites de prises |
| Chiffres non sourcés | `[À VÉRIFIER]` dans le texte, repris dans `plan/chiffres-a-valider.md` et dans `suivi/NN-redaction.md` ; on le lève ou on le coupe avant l'impression |

## Écrire utile

La règle 5 de `CLAUDE.md` et le skill `ecriture` (P2) valent pour chaque section. Pas de conclusion qui résume ce qui
précède, pas de « il est important de noter que ».
