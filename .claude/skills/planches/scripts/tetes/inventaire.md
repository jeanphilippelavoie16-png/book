# Inventaire des têtes dans les planches

Bibliothèque de têtes simples, 14 octobre 2026. Relevé fait sur les 358 sources `images/planches-src/*.js` (chaque
vue dessinée à sa taille, avec une copie de `formes.js` instrumentée en mémoire qui note chaque appel à `tete()`,
`buste()`, `personnage()` et `corps()` : script `tetes-lib/inv/releve.js` du scratch), complété par la lecture des PNG
(`images/validees/`, `images/a-valider/`) pour les têtes dessinées à la main dans la planche, que le relevé ne voit pas.

## Vocabulaire

- **px** : la hauteur de la tête sur la planche, du sommet au menton, en unités de vue (1 px ≈ 1/72 po). Sous 40 px,
  un visage ne se lit plus : le corps simple garde sa tête sans visage.
- **Fonction actuelle** : `tete` = `formes.tete()` (septembre : nez, lèvres, oreille, mèches) ; `corps` = la tête du
  corps simple, sans visage ; `main levée` = des chemins écrits dans la planche.
- **Avec la bibliothèque** : l'appel qui la remplace. `teteSimple(…)` pour une tête seule ; `corps({ visage: … })`
  pour un corps simple qui doit montrer son visage.

## Les têtes où le visage compte

Une ligne par tête dessinée. L'expression est celle que demande le geste du chapitre.

| Planche | Vue | Âge | Ce qu'elle fait | px | Expression | Fonction actuelle | Avec la bibliothèque |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 28-06 | visage | homme | se fait laver un œil qui colle, le coton posé sur l'œil | 226 | yeux fermés, bouche fermée | `tete` | `teteSimple({ yeux: 'fermes' })` |
| 29-05 | bon | bébé | couché sur le dos, la tête droite, le nez au plafond | ~110 | yeux fermés, bouche fermée | main levée | `teteSimple({ age: 'bebe', yeux: 'fermes', angle: -92 })` |
| 29-05 | rate | bébé | la tête renversée loin en arrière : la gorge se referme | ~110 | yeux fermés, bouche fermée | main levée (la nuque cassait) | `penche: -42` (la tête seule pivote, la nuque reste d'un trait) |
| 29-05 | dessus | bébé + homme | l'aide couvre de sa bouche la bouche et le nez du bébé | 190 / ~150 | aide : bouche grande ouverte, yeux ouverts ; bébé : yeux fermés | `tete` (aide) + main levée | aide `teteSimple({ bouche: 'ouverte', ouverture: 0.9, angle, cote: 'gauche' })` |
| 29-05 | souffler | bébé | la poitrine se soulève à chaque bouffée | ~100 | yeux fermés, bouche fermée | main levée | comme « bon » |
| 27-03 | linge | homme | mord un linge plié pour tenir la dent replantée | 149 | yeux ouverts, lèvres serrées sur le linge | `tete` + lèvres retouchées dans la planche | `teteSimple({ bouche: 'serre', epaisseur: 17, objet })` |
| 38-01 | abri | enfant6, enfant4 | assis dans les sacs ; le grand tient le sifflet | 21, 19 | yeux ouverts ; lèvres serrées sur le sifflet | `tete` (sous le capuchon) | `teteSimple({ age: 'enfant6', bouche: 'serre', epaisseur: 6 })` |
| 38-01 | chaud | enfant6, enfant4 | couchés ensemble dans les sacs | 23, 20 | yeux ouverts (ou fermés : ils dorment) | `tete` (sous le capuchon) | `teteSimple({ age: … })` |
| 38-01 | reveiller | enfant6 + homme | l'enfant secoue l'adulte et crie son nom ; l'adulte couché ne répond pas | 23 / 29 | enfant : bouche ouverte ; adulte : yeux fermés | `corps` | `corps({ visage: { bouche: 'ouverte' } })` · `corps({ visage: { yeux: 'fermes' } })` |
| 89-07 | dessus | homme | porte les lunettes à fente, la lanière derrière la tête | 159 | yeux ouverts, bouche fermée | `tete` | `teteSimple({})` |
| 34-01 | visage | homme | la tête et le cou en grand : le triangle du visage, le cou | 124 | yeux ouverts, bouche fermée | `corps` (sans visage) | `corps({ visage: true })` : le nez et les coins de la bouche se placent par `.visage` |
| 27-05 | sentir | homme | casse le rameau et le sent sous le nez | 98 | yeux ouverts, bouche fermée | `corps` (le point du visage estimé dans la planche) | `corps({ visage: true })`, le nez par `.visage.nez` |
| 27-05 | macher | homme | mâche le bout du rameau | 98 | lèvres serrées sur le rameau | `corps` | `corps({ visage: { bouche: 'serre', epaisseur: 8 } })` |
| 13-40 | souffler | homme | souffle sur le nid, à un avant-bras du visage | 69 | bouche entrouverte (souffler) | `corps` | `corps({ visage: { bouche: 'ouverte', ouverture: 0.2 } })` |
| 28-02 | couche | enfant4 | couché sur le dos, la tête tournée sur le côté, l'embout dans la narine du haut | 97 | yeux ouverts, bouche fermée | `corps` | `corps({ visage: true })` |
| 28-02 | trois | enfant4 | se relève et crache au-dessus du bol | 46 | bouche ouverte | `corps` | `corps({ visage: { bouche: 'ouverte' } })` |
| 29-06 | (4 vues) | bébé | au sein : attendre la grande bouche, l'amener, la bonne prise, la ratée | ~170 | yeux fermés ; bouche grande ouverte, puis lèvres sur le sein | main levée (cils, oreille à plis) — à valider | `teteSimple({ age: 'bebe', yeux: 'fermes', bouche: 'ouverte', ouverture: 1 })` |

## Les têtes de corps simples où un visage aiderait sans être le sujet

Le corps simple garde sa tête par défaut ; `visage: true` s'ajoute si la planche le demande.

| Planche | Vue | Âge | Ce qu'il fait | px | Expression utile |
| --- | --- | --- | --- | --- | --- |
| 29-04 | frotter, deuxMains, aorte | femme | couchée, après la naissance | 86 | yeux fermés ou ouverts |
| 88-05 | cote | homme | à genoux, la molette | 80 | — |
| 29-08 | lit, quatre | femme | en travail, sur le dos ou à quatre pattes | 72, 64 | — |
| 28-04 | couche | homme | couché, la compresse sur la cuisse | 64 | yeux fermés |
| 26-09b | cote | homme | blessé sanglé sur la porte | 61 | yeux fermés |
| 89-05b | genou, tete | homme | assis ou à genoux sur la planche | 59, 45 | — |
| 24-05, 90-03 | hausse, relache | homme | la courroie sur le front | 53 (24-05), 83 (90-03) | — (la courroie passe sur le front : la limite des cheveux doit rester sous elle) |
| 37-07 | ischios, quadriceps, dos | homme | étirements | 53 | — |
| 60-40 | arriere | homme | à genoux, la tête penchée (cou 18 à 31°, tête 14 à 24°) | 48 | — |

Les autres corps simples (120 appels environ) ont une tête de moins de 45 px : pas de visage.

## Les têtes hors de la règle « de profil »

- **34-02** (à valider) : la tête vue de dos, chignon et mèches, pour le peignage. À repasser de profil : `teteSimple({
  age: 'femme', cheveux: 'long' })`, la mèche de travail dessinée par la planche.
- **26-09b** « vu par la tête » : une tête ronde de pictogramme sur les épaules, vue dans l'axe du corps.
- **29-08** : la tête du bébé qui sort, un rond dans l'axe : pas un visage, et c'est correct (on ne la voit pas de profil).
- **04-40** : la tête ronde du pictogramme avec les lunettes de ski (corps du sas) : petite (37 px), sans visage.

## Ce que l'inventaire confirme pour la bibliothèque

- **Âges** : homme (8 planches), bébé (29-05, 29-06), enfant de 6 et de 4 ans (38-01, 28-02), femme (29-04, 29-08 : des
  corps ; 34-02 à repasser). Aucune tête de femme seule aujourd'hui : la femme sert surtout au corps simple.
- **Yeux** : ouverts presque partout ; fermés pour l'œil qu'on lave (28-06), le bébé (29-05, 29-06), l'adulte
  inconscient (38-01) et les couchés. L'œil ouvert est l'amande vide : l'iris plein ne se dessine plus que sur
  demande (`iris: true`), et la bouche fermée n'a plus de commissure (`commissure: true` sur demande) : JP, 14 octobre.
- **Bouche** : fermée ; entrouverte pour souffler (13-40) et crier (38-01) ; grande ouverte pour la bouche sur bouche
  et nez (29-05) et le bébé qui prend le sein (29-06) ; lèvres serrées sur un linge (27-03, ~17 mm), un rameau
  (27-05, ~8 mm), un sifflet (38-01, ~6 mm).
- **Tête penchée** : 29-05 (renversée de ~42° sur le cou : la nuque cassait), 60-40, 38-01 (l'adulte couché, la tête
  relevée sur l'oreiller : `angles: { cou: -78, tete: -72 }`), 26-09a.
- **Cheveux** : courts pour l'homme et les enfants ; longs pour la femme (34-02) ; la queue de cheval, pour une fille.
  Les cheveux qui pendent (longs, queue) s'attachent d'eux-mêmes quand la tête penche de plus de 30° : la femme en
  travail à quatre pattes (29-08), couchée (29-04).
- **Couchés sur le dos** : 38-01 (l'adulte), 29-05 (le bébé), 28-04, 26-09b. Une tête couchée sans limite des cheveux
  (petite ou sans cheveux) perd son oreille d'elle-même : seul au milieu du crâne, le C couché fait un sourire.
