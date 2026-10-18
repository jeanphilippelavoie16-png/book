# Gabarit de chapitre

Neuf points, toujours dans cet ordre. C'est ce qui empêche 89 chapitres écrits sur des
mois de partir dans toutes les directions, et ce qui rend le livre utilisable en panique :
on sait toujours où regarder.

**Avant le point 1, une ligne de lieu.** `Maison` · `Chalet` · `Les deux`. Un chapitre
écrit pour la maison le dit, et donne l'adaptation au chalet là où elle change quelque
chose. Ce qui est court se vit à la maison ; ce qui dure finit au chalet.

---

## 1. En une ligne

Ce que la technique fait, et combien de temps elle fait durer l'aliment ou la solution.
Une phrase. Pas deux.

## 2. Quand l'utiliser

**Seulement quand l'utiliser** : une courte liste des situations où on ouvre ce chapitre, sans
sous-titre. Une ligne par situation, dite comme on la voit (« Un feu est déclaré dans le secteur »,
« De la cendre tombe sur la galerie »), sans justification.

**Pas de liste « quand ne pas l'utiliser »** (JP, 15 octobre 2026, sur « C'est la mauvaise procédure quand :
le feu est dans le bâtiment, dans un chaudron » au chapitre du feu de forêt : « no shit qu'une procédure de
feu de forêt couvre pas un feu de chaudron ; quand l'utiliser, c'est juste quand l'utiliser, pas besoin de
donner des exemples bidon »). Le contre-exemple évident ne s'écrit pas. Le rare fait qui retourne un
réflexe (devant une source radiologique perdue, on s'éloigne au lieu de se confiner) va dans l'étape
où il sert ou dans l'encadré danger, pas ici.

## 3. Pourquoi ça marche

Trois à cinq phrases de principe, **120 mots au plus** : le mécanisme, pas son histoire ni
ses exemples. C'est ce qui permet d'improviser quand il manque un ingrédient ou un outil.
Sans cette section, le lecteur applique une recette ; avec elle, il comprend et il adapte.

## 4. Matériel

**Seulement l'indispensable** — ce sans quoi la procédure échoue ou devient dangereuse —
en liste, **une ligne par item, 15 à 20 mots** : le nom en gras, puis ce qu'il fait ou ce
que c'est. Un substitut seulement s'il est vital, sinon « (→ section 9) ». Pas de tableau, pas de
gants, d'étiquettes ni de ce que tout le monde a déjà. JP, 27 septembre 2026 : « c'est long
pour rien ». Le format validé :

```
- **Thermomètre à sonde** : porte les 74 °C à cœur. Ne se fabrique pas.
- **Sel nitrité** : sel et nitrite de sodium, deuxième barrière contre le botulisme. Dosé selon l'emballage.
```

**L'item se nomme, il ne se spécifie pas.** « Scie à chaîne », pas le pantalon forestier
avec ses six numéros de norme. Aucun numéro de norme nulle part — ni CSA, ni NF EN, ni
ASTM, ni ULC, ni ANSI. Si un détail mérite de survivre, c'est celui qui dit ce que la
chose **fait** : le pantalon de coupe bourre la chaîne et l'arrête. Ça change un
comportement ; un numéro, non.

Le jour où l'item n'est pas là, c'est la variante d'urgence (section 9) qui sert : c'est elle qui
fabrique ou remplace, pas la liste.

## 5. Procédure

Étapes numérotées. Quantités en grammes et en pourcentages, températures en °C, durées
en heures ou en jours. Pour un chapitre de référence (listes, stocks), les tableaux
remplacent la procédure.

## 6. Points de contrôle

Tableau à structure fixe : moment, ce qu'on vérifie, cible chiffrée, quoi faire si c'est
hors cible. À quoi ça doit ressembler, sentir et peser à chaque étape.

## 7. Signes d'échec

Ce qui indique qu'il faut jeter. Formulé sans ambiguïté. Un tableau observation →
diagnostic → action. « Ça sent bizarre » ne suffit pas.

## 8. Danger (retiré)

**La section Danger sort des chapitres** (JP, 18 octobre 2026 : « on crée des pictogrammes pour tous les dangers ;
les dangers sont expliqués une fois dans le livre, dans la section qui explique les symboles ; chaque fois qu'un
danger est présent, on affiche le pictogramme et on enlève la section »). Le gabarit en vigueur a sept sections
(1 En une ligne, 2 Quand l'utiliser, 3 Matériel, 4 Procédure, 5 Points de contrôle, 6 Signes d'échec, 7 Variante
d'urgence ; voir CLAUDE.md). Dans l'étape où le danger se présente : le pictogramme (`{!id}`, ids dans
`plan/dangers-inventaire.md`) et ce qui est propre au chapitre. Le texte ci-dessous reste pour la règle du mécanisme,
qui vaut maintenant pour la page du tome et pour l'étape :

Encadré. Seulement quand il y a un risque de mort ou d'intoxication grave. Pas de
dilution : si l'encadré est partout, personne ne le lit.

Chaque avertissement donne le **mécanisme**, jamais juste « attention ». Le lecteur
change de comportement quand il comprend pourquoi.

## 9. Variante d'urgence

**C'est le cœur du chapitre, pas sa queue.** Sans électricité, sans matériel acheté, sans
produit spécialisé, sans pièce de remplacement, sans personne à appeler. Toujours à la
même place dans le chapitre.

C'est ici que vit la raison d'être du livre. La manière propre avec le bon outil, il la
connaît déjà ; le jour où il ouvre cette page, le bon outil n'est pas là. Souder avec deux
batteries d'auto montées en série, remplacer un joint par du cuir gras, fabriquer l'outil
manquant, faire tenir la chose avec ce qui traîne : chaque fois qu'une manière de faire
avec rien existe, elle se trouve ici, détaillée, pas mentionnée.

Nommer honnêtement ce qu'on perd en la choisissant — le rendement, la durée de garde, la
marge d'erreur. Et dire ce qui ne se remplace vraiment pas, sans broder autour.

Une variante d'urgence de trois lignes est le signe que le chapitre n'a pas fait son
travail.

---

## En plus (section non numérotée, à la fin)

Ajoutée le 18 octobre 2026 (JP : « fais un mixte et mets des encadrés pour montrer que c'est de l'extra, en vert
pâle »). Une réserve d'encadrés `### Titre`, 30 à 80 mots chacun (JP : « moins de texte »), que la mise en pages pose dans les trous des pages
(chapitre.js, `fillExtras`) : la façon des Innus (pourquoi elle marche, ce qui la rend dangereuse si on change ses
conditions), une photo pour reconnaître (`![légende](images/extras/…)`), un petit dessin (`images/extras/`). Ce qui est
bon à savoir sans être nécessaire au geste ; jamais une redite du chapitre. Un encadré qui ne trouve pas de trou ne
s'imprime pas, et le rapport de l'assembleur le dit.

## Ce qui n'est plus dans le chapitre

**La section Sources a été retirée du livre.** C'est un document de survie, pas un
travail universitaire : 104 pages de liens et de noms de fichiers ne sauvent personne.

Le travail de source, lui, ne change pas d'un iota. On cherche toujours les sources
officielles **avant** d'écrire, on enregistre toujours la page dans `/sources`, et la
règle 1 tient : aucun chiffre inventé. Ce qui change, c'est où ça se range.

| | Où ça vit maintenant |
| --- | --- |
| Les pages officielles enregistrées | `/sources` |
| Les chiffres `[À VÉRIFIER]` recensés | `plan/chiffres-a-valider.md` et la fiche du chapitre |
| Le relecteur humain requis | `suivi/NN-redaction.md` |
| La provenance de chaque chiffre | `suivi/NN-redaction.md` |

**Aucune attribution dans le texte.** On écrit « 74 °C à cœur », pas « 74 °C à cœur
(MAPAQ) ». Le lecteur veut le chiffre, pas la bibliographie. La traçabilité sert à qui
vérifie, et elle vit dans le suivi — pas au milieu d'une procédure qu'on lit à la lampe
frontale.

Les parenthèses qui restent sont celles qui portent du **contenu** : un nom latin
(*Alces americanus*), une précision d'identification (thuya occidental, *Thuja
occidentalis*), une unité, une équivalence. Jamais un nom d'organisme.

---

## Conventions du livre

| Sujet | Règle |
| --- | --- |
| Unités | Métrique. Impérial entre parenthèses seulement pour les dimensions de construction, parce que le bois se vend en pieds |
| Températures | °C toujours |
| Sel | Pourcentage du poids de la viande, toujours |
| Salpêtre | Jamais donné en quantité. Toujours accompagné de sa forme moderne équivalente, parce que les deux ne se dosent pas pareil |
| Espèces | Nom français d'usage, avec le nom latin au moins une fois par chapitre |
| Saisons et quotas | Jamais de dates ni de limites de prises. Renvoi à la réglementation de l'année |
| Chiffres non sourcés | `[À VÉRIFIER]` dans le texte, repris dans la section 10 |

## Densité

Environ 700 mots utiles par page en 8 × 10. Une phrase qui n'apprend rien saute.
Pas d'introduction qui annonce ce qui suit, pas de conclusion qui résume ce qui précède,
pas de « il est important de noter que ».

La phrase et le mot : skill `ecriture` (`.claude/skills/ecriture/SKILL.md`). Aucun tiret de ponctuation,
aucune image poétique, aucune phrase qui parle du livre.
