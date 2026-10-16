# Petites planches : les candidates

JP, 16 octobre 2026 : « une option qu'on mette aussi des petites planches, qui pourraient aller dans des
paragraphes, pour celles qu'on avait sorties parce qu'elles étaient pas importantes » ; « on pourrait en mettre
un peu partout, quand c'est d'actualité ».

**Le format.** Une colonne de large (format `quart` du composeur, 340 × 413, environ 3,4 × 4,1 po), posée
dans le fil du texte, dans le paragraphe qui l'appelle, comme une photo en quart. Une vue, ou deux ou trois
vignettes au plus ; six repères au plus. Même règles que les grandes (le skill `planches`, les règles 1 à 12 de
`images/recommandations-planches.md`) : elle montre comment faire ou fabriquer, jamais une donnée. Appel :
« (planche 13-41) », avec la flèche rouge. Le numéro et le titre au-dessus, en petit bandeau.

**Le moteur ne la sait pas encore poser** : aujourd'hui, un dessin plus haut que large part en pleine page.
À ajouter à `build_chapitre.py` (taille « petite » quand la largeur du SVG est 340) et à `chapitre.css`.

**Coût indicatif** : environ 60 à 100 k tokens chacune, dessin et second regard compris.

## 1. Écartées par l'audit du 15 octobre parce qu'elles « tiennent en une phrase » (46)

C'est le cœur de la liste : un geste simple que la phrase dit, mais qu'un petit dessin montre d'un coup d'œil.

| Ch. | La chose |
| --- | --- |
| 01, 03, 05, 09 | Le témoin de dégel à la pièce de monnaie |
| 05 | Ouvrir une conserve sans ouvre-boîte ; le joint de chaudière ; le bocal scellé à la cire |
| 06 | Le rouleau de couverture ; la chaudière en sac à dos |
| 12 | Le puits d'arbre |
| 13 | La lentille de glace ; le réflecteur de phare |
| 14 | Le porte-pile |
| 15 | Réparer sur le chemin |
| 17 | Le judas ; le miroir de chambranle ; l'alarme de sentier |
| 20, 21, 33 | Le pot de germination ; prendre l'écorce sans tuer l'arbre |
| 31 | Le pilon et la planche à laver ; la latrine en tranchée ; le baril de rétention ; la colonne gelée |
| 32 | Graduer par égalisation ; la boîte dans la boîte |
| 33 | L'herbier ; le séchoir à cordelette ; l'onguent de gomme |
| 39 | La corde de guidage à nœuds |
| 40 | Le cadran de plancher ; l'ardoise de cendre |
| 41 à 79 (tomes 3 et 4) | L'écailleur de capsules (75) ; l'enfilade d'éperlans (77) ; la plaque de suie (43) ; le sondeur et la corde lestée d'une bouteille (42) ; le tordoir à cretons (52) ; le mur de neige (58) ; la ligne à main et les leurres (57) ; la perche à viande (73) |
| 82 à 112 (tomes 5 et 6) | L'abreuvoir d'hiver ; la sporée ; la clôture sans broche ; l'arrosage enterré ; la presse à jus ; le tan en fosse ; le fil de tendon rallongé ; le taraud de fortune ; le fer à souder au poêle |

## 2. La priorité basse de l'audit (27, dont 2 faites depuis)

Prévues en grande planche ; plusieurs tiendraient mieux en petite. Faites depuis : la couverture de fenêtre
(03-12) et les outils de feu (11-05). Le reste est dans `LISEZMOI.md`, « Priorité basse ».

## 3. Fouille à venir

Une passe sur les 113 chapitres pour trouver d'autres candidates (plan de match, point 26). Elle s'ajoute ici.

## Laissées de côté pour de bon

Les données (code sol-air, colonne de fumée à lire), ce que JP fait déjà (poste d'auto, adaptateur USB,
génératrice…), ce que le texte n'apprend pas encore (l'écrire d'abord), l'observation du réel (photo ou fiche
de commande) et ce qui est déjà dessiné ailleurs.

## Comment choisir

Au fil de la refonte, chapitre par chapitre : quand un paragraphe décrit un geste ou un objet que l'œil
comprend plus vite que la phrase, et qu'une candidate de cette liste y correspond, elle se dessine en petite
planche et s'appelle dans ce paragraphe. Pas de petite planche pour décorer.
