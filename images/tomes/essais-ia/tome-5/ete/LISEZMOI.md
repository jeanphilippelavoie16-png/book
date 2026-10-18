# Tome 5, version d'été (18 octobre 2026)

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
