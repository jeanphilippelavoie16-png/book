# Tome 5, La forêt, le jardin et le chalet : essais d'images pour la page de titre

Générées le 18 octobre 2026 par AI Horde (gratuit, sans clé) avec `../horde-img2img.py`, au format de la page rognée
(768 × 960). Même style que le tome 1 (`images/tomes/titre-tome-1.jpg`, le n° 4 de `titre-nuit-pistes-2.png`) :
linogravure, traces de gouge, trois encres (brun terre très foncé, papier blanc cassé, orange #EE7219 pour le soleil
et la lumière). Aucune image n'est agrandie : celle que JP choisit s'agrandit ×4 comme celle du tome 1.

**Planche de choix : `tome-5-pistes.png`** (8 candidates, numéro au-dessus). Chaque candidate est aussi en PNG :
`tome-5-candidate-1.png` à `tome-5-candidate-8.png`.

## La scène

Un soir d'été au chalet : grand ciel brun calme sur les deux cinquièmes du haut (le titre s'y pose), soleil orange bas
derrière des collines basses, forêt d'épinettes et de bouleaux, chalet en rondins à la fenêtre allumée, bois de
chauffage, sentier clair, et selon les essais un jardin en rangs, une clôture de perches, un billot avec la hache
plantée. Deuxième idée, proposée à côté : **l'automne**, la corde de bois qui monte, les bouleaux jaunis (en orange),
le jardin récolté. Le ciel mesuré sur le tiers du haut des candidates va de #432D1C à #532C14, très près du brun du
tome (#4B3A28), un peu plus rouge.

## Les candidates

| N° | Fichier d'origine | Modèle | Départ | Force | Texte | Ce qu'on voit | À surveiller |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `t4-j66-ete-1.png` | Juggernaut XL | `depart4-ete.png` | 0,66 | `prompt4-ete-lino.txt` | Été. Chalet en rondins, soleil cerclé à droite derrière les épinettes, collines basses, tas de bûches à gauche, sentier clair, herbe et fleurs. | Pas de jardin en rangs ; les bouts de bûches sont orange (la lumière du soleil). |
| 2 | `t3-j64-automne-0.png` | Juggernaut XL | `depart3-automne.png` | 0,64 | `prompt3-automne-lino.txt` | Automne. Le ciel le plus calme de tous, soleil bas à gauche, bande orange à l'horizon, épinettes et bouleaux, sentier, bûches, chalet. | Le haut du soleil (y ≈ 420) touche la fin du sous-titre à gauche ; pas de jardin. |
| 3 | `t2-j66-automne-0.png` | Juggernaut XL | `depart2-automne.png` | 0,66 | `prompt2-automne-lino.txt` | Automne. Corde de bois contre le chalet, bouleaux orange, clôture, champ en rangs, deux bûches. | Les anneaux du soleil montent à gauche dans la zone du sous-titre : se retourne en miroir. Le champ clair peut se lire comme de la neige. |
| 4 | `t3-j58-ete-1.png` | Juggernaut XL | `depart3-ete.png` | 0,58 | `prompt3-ete-lino.txt` | Été. Le seul Juggernaut avec un vrai jardin : rangs clairs sur terre foncée, sentier, billot, soleil cerclé à droite. | La remise à bois, à gauche, a l'air d'un deuxième chalet ; une tache orange sur le billot. |
| 5 | `t2-flux-ete-2.png` | Flux.1-Schnell | texte seul | | `prompt2-ete-flux.txt` | Été. Jardin de choux, clôture, chalet, fumée, billot et hache, soleil derrière la colline. Jardin le plus lisible. | Marge crème tout autour (à rogner) ; billot orange ; gravure plus plate que le tome 1 ; épinettes à gauche jusqu'à y ≈ 325. |
| 6 | `t3-j66-ete-1.png` | Juggernaut XL | `depart3-ete.png` | 0,66 | `prompt3-ete-lino.txt` | Été. Chalet, sentier entre deux clôtures, herbe dorée, bois cordé à gauche, nuages orange. | Épinette haute à droite (y ≈ 310) et à gauche (y ≈ 365) : proche du titre et du sous-titre. |
| 7 | `t4-j60-ete-0.png` | Juggernaut XL | `depart4-ete.png` | 0,60 | `prompt4-ete-lino.txt` | Été. Jardin en buttes, billot, sentier, soleil à rayons, herbe orange. | Les buttes ressemblent à des bûches couchées ; épinettes à gauche jusqu'à y ≈ 370. |
| 8 | `t4-j64-automne3-1.png` | Juggernaut XL | `depart3-automne.png` | 0,64 | `prompt3-automne-lino.txt` | Automne. Chalet à grosse cheminée, rondins sciés au premier plan, bois cordé à droite, sentier, soleil cerclé. | Des touffes orange devant le chalet ont l'air de petites flammes ; arbre orange à gauche jusqu'à y ≈ 315. |

Aucune n'a de texte, de signature, de visage ni d'étoile ; aucune n'a de pic qui monte dans le ciel.

## Recommandation

**1, puis 2.** La 1 dit le tome d'un coup d'œil (le chalet, le bois de chauffage, la forêt, l'été) avec la même
texture de gouge que le tome 1, le soleil à moitié caché à droite comme la lune du tome 1, et rien qui monte dans le
coin du haut à gauche où se posent le titre et le sous-titre. La 2 a le plus grand ciel calme de toute la série
(écart de teinte presque nul sur le tiers du haut) et la plus belle lumière ; son soleil à gauche demande de vérifier
qu'il ne touche pas le sous-titre, ou de la retourner en miroir. Si JP veut voir **le jardin**, c'est la 4
(Juggernaut, texture du tome 1, mais la remise se lit comme un deuxième chalet) ou la 5 (Flux, jardin de choux très
lisible, marge crème à rogner).

Pour la page montée : le bas de ces images est foncé (sauf le sentier), alors que la série des six tomes s'imprime
en encre foncée sur la neige au tome 1 (`.tp-bas`, #15222B). Au tome 5, elle doit passer en encre claire (#F2EBDF)
ou se poser sur le sentier.

## Comment elles ont été faites

Cinq tours. L'image de départ, quand il y en a une, est une scène en SVG dessinée par un script de ce dossier
(épinettes reprises de `images/tomes/scene_titre.py`), rasterisée par Chromium headless (fenêtre 768 × 1100, recadrée
à 768 × 960). Les scripts se lancent avec `PYTHONDONTWRITEBYTECODE=1` pour ne rien écrire dans `images/tomes/`.

- `scene_tome5.py` → `depart-ete.png`, `depart-automne.png` : jardin en rangs sur papier, abri à bois seul.
- `scene_tome5_v2.py` → `depart2-*.png` : plants feuillus, clôture de perches, corde longue et basse, billot plus gros.
- `scene_tome5_v3.py` → `depart3-*.png` : jardin en terre foncée aux plants clairs, clairière en herbe brune, sentier clair.
- `scene_tome5_v4.py` → `depart4-*.png` : la corde de bois appuyée contre le mur du chalet, sous un appentis.

Les textes sont dans les `prompt*.txt` ; ce qui suit `###` est le texte négatif (neige, étoiles, montagnes,
deuxième chalet, texte, signature, gens, animaux, cadre). Les journaux de chaque tâche sont dans `log-*.txt`.
`horde-reprendre.py` reprend une tâche déjà lancée par son identifiant (le conteneur a redémarré pendant le tour 5 ;
les deux tâches attendaient encore dans la file du serveur et ont été récupérées sans relance). `planche.py` monte
la planche de choix.

| Tour | Tâches (fichiers `tN-…`) |
| --- | --- |
| 1 | Juggernaut texte seul (été, automne) ; Flux texte seul (été ×3, automne ×2) ; Juggernaut sur `depart-ete` à 0,68 et 0,76, sur `depart-automne` à 0,72 ; AlbedoBase XL sur `depart-ete` à 0,7 |
| 2 | Juggernaut sur `depart2-ete` à 0,62 et 0,70, sur `depart2-automne` à 0,66 ; Flux sur `depart2-ete` à 0,82 ; Flux texte seul ×3 |
| 3 | Juggernaut sur `depart3-ete` à 0,58 et 0,66, sur `depart3-automne` à 0,64 ; Flux texte seul ×4 |
| 4 | Juggernaut sur `depart4-ete` à 0,60 et 0,66 ; reprises des recettes d'automne des tours 2 et 3 |
| 5 | Juggernaut sur `depart4-ete` et `depart4-automne` à 0,64 |

## Ce qui a été écarté, et pourquoi

- **Juggernaut à partir du texte seul** (`t1-jugg-*`) : ciel chargé de nuages et de bois gravé, montagnes en pointe,
  arbres jusqu'en haut, deux chalets ; sans image de départ, il ne laisse pas de ciel calme.
- **Champ de neige** (`t1-j68-*`, `t1-j76-*`, `t1-a70-*`, `t1-j72-*`, `t2-j62-0`, `t2-j70-*`, `t4-j66-automne2-*`) :
  tant que le premier plan de l'image de départ est en papier, Juggernaut et AlbedoBase en font un champ enneigé, même
  avec « snow, winter » en négatif. En plus : deux chalets (`t1-j68-*`, `t1-a70-*`, `t2-j62-0`, `t4-j66-automne2-0`),
  crête en dents de scie dans le ciel (`t1-j76-0`), montagnes orange en pointe (`t1-j72-1`), étoiles (`t1-j68-0`,
  `t1-j76-1`, `t1-j72-1`), deux petits soleils (`t4-j66-automne2-1`), bouleau mort qui monte dans le ciel (`t2-j70-1`),
  épinette jusqu'à y ≈ 265 dans le titre (`t2-j70-0`).
- **Flux** : marge crème et fausse signature en bas sur presque toutes (`t1-flux-ete-1` et `-2`, `t1-flux-automne-*`,
  `t2-flux-ete-0` et `-1`, `t2-f82-*`, `t3-flux-ete-0`, `-1`, `-3`) ; ciel clair au lieu de brun (`t1-flux-ete-0`,
  `-2`, `t2-f82-1`), oiseau (`t1-flux-ete-0`), flamme dans la porte (`t1-flux-ete-0`), deux haches (`t1-flux-ete-1`,
  `t1-flux-automne-1`), deux billots (`t2-f82-1`), cimes enneigées (`t2-f82-0`, `t2-flux-ete-1`, `t3-flux-ete-3`),
  citrouilles partout (`t1-flux-automne-*`), soleil dans la zone du titre (`t3-flux-ete-2`). En image à image (0,82),
  Flux ne garde presque rien de la composition.
- **Abri à bois devenu deuxième bâtiment** : `t3-j58-ete-1` est gardée (n° 4) parce que c'est le seul jardin
  de Juggernaut ; la corde appuyée au chalet du tour 4 a réglé ça, mais à 0,60–0,66 Juggernaut grossit alors le chalet.
- **Autres** : `t3-j58-ete-0` (ciel en bandes, pas calme), `t3-j66-ete-0` (bûche géante, pas de jardin),
  `t3-j64-automne-1` (rayons du soleil dans le sous-titre, citrouilles), `t4-j60-ete-1` (une touffe orange en forme de
  flamme dans le jardin, bûches orange), `t4-j66-ete-0` (maison de ferme à deux étages, pas un chalet),
  `t4-j64-automne3-0` (deux bâtiments coupés au premier plan), `t5-j64-ete-*` et `t5-j64-automne-1` (soleil peint sur
  le mur du chalet, deux bâtiments), `t5-j64-automne-0` (grand bâtiment en planches, pas en rondins ; bûches partout).

## Ce qu'on a appris

- La composition imposée tient : avec une image de départ à 0,58–0,70, Juggernaut garde le grand ciel brun calme, le
  soleil bas et les collines basses. Au-dessus de 0,72, il recommence à monter des crêtes dans le ciel.
- Le premier plan clair devient de la neige. Le jardin passe mieux en terre foncée avec des plants clairs (comme Flux
  le fait de lui-même), et le sentier clair donne la seule grande tache pâle du bas.
- Un abri à bois seul devient un chalet ; une corde appuyée au mur du chalet reste une corde.
- Flux fait le jardin le plus lisible, mais signe et encadre presque toujours ; une candidate Flux garde sa marge
  crème à rogner avant l'agrandissement.
