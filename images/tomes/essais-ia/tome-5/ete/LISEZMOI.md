# Tome 5, version d'été (18 octobre 2026)

**JP choisit la n° 2** (18 octobre 2026). Agrandie ×4 (`t5e-jug50-1-x4.png`), puis retouchée par `retouche_ete.py` :
au pied du bâtiment de gauche, la rangée de fausse écriture devient une rangée de pierres taillées à la main.
Résultat : `images/tomes/titre-tome-5.jpg`.

Puis le ciel (JP : « tome 5, retravaille le ciel », puis « 2, nuages ») : `ciel_ete.py VARIANTE` le regrave au-dessus
de la crête de la colline, relevée à la main. Trois variantes sur `tome-5-ciels.png` (calme, nuages, rayons) ; JP
prend **nuages** : le ciel uni, deux bandes plus chaudes au ras des collines, cinq bancs de nuages orange effilés de
part et d'autre du soleil, chacun avec deux entailles de gouge, et le soleil en aplat au bord coupé à la main. Chaîne :
`retouche_ete.py t5e-jug50-1-x4.png` puis `ciel_ete.py … nuages`.

JP, sur la candidate 4 retouchée : « tome 5, faut que ça soit l'été ». Les taches blanches (le sentier, les buttes des
rangs, le bas) se lisaient comme de la neige. Image de départ `t5-depart-ete.png` : la 4 retouchée (`../retouche_jardin.py`),
le sentier et les grandes plaques en terre brune avec de l'herbe sur les bords, les buttes en plants. Puis AI Horde en
img2img : Juggernaut XL à 0,50 et 0,60 (`prompt-ete-jardin-lino.txt`), Flux.1-Schnell à 0,62 et 0,72
(`prompt-ete-jardin-flux.txt`), deux images chacun.

Planche de choix : `tome-5-ete-pistes.png`.

| N° | Fichier | Ce qu'on voit | À surveiller |
| --- | --- | --- | --- |
| 1 | `t5e-jug50-0` | Les deux bâtiments, les rangs, un sentier de terre, quelques fleurs | Peu de signes d'été au premier plan |
| 2 | `t5e-jug50-1` | Fleurs sauvages blanches et orange au premier plan, une petite remise, le sentier de terre | Une remise de plus en bas à gauche |
| 3 | `t5e-jug60-0` | Le plus estival : fleurs rouges, orange et blanches, champ labouré, clôture de piquets, sentier de terre | Le ciel tire un peu sur le violet ; la souche a disparu |
| 4 | `t5e-jug60-1` | Une bille couchée, des fleurs, deux chalets | Chargée ; deux chalets presque pareils |
| 5 à 8 | `t5e-flux*` | Rangs de plants, souche, sentier | Plants verdâtres (une encre de plus), gravure plus à plat |

Aucune neige. **Recommandation : la 3, puis la 2.** Après le choix de JP : agrandir ×4 (`../../horde-agrandir.py`)
et regarder de près ce qui ferait IA avant de poser.
