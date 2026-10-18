# Tome 4, version d'été (18 octobre 2026)

**JP choisit la n° 6** (18 octobre 2026 : « tome 4, la 6, mais règle ombre, soleil, et varie grosseur de poisson »).
Agrandie ×4 (`t4e-flux62-1-x4.png`), puis retouchée par `retouche_ete.py` : le soleil en aplat au bord coupé à la main,
sans liseré sombre ni dégradé ; le reflet regravé en morceaux de traits ; les deux bêtes couchées dans l'herbe et
l'oiseau du ciel retirés ; les poissons raccrochés de tailles différentes (de 0,6 à 1,35 fois), penchés et centrés
entre les poteaux. Résultat : `images/tomes/titre-tome-4.jpg`.

JP, sur la version d'hiver retouchée : « non, au pire fais une image d'été pour celle-là, pas de neige, recommence au
début ». On repart de la candidate 2 d'origine (`../tome-4-2.png`) : `t4-depart-ete.png` en est l'image de départ,
la neige du sol changée en terre sombre avec des herbes claires, la neige des épinettes et du toit retirée, la
chaloupe et la fumée en S effacées. Puis AI Horde en img2img : Juggernaut XL à 0,55 et 0,65
(`prompt-ete-lino.txt`), Flux.1-Schnell à 0,62 et 0,72 (`prompt-ete-flux.txt`), deux images chacun.

Planche de choix : `tome-4-ete-pistes.png`.

| N° | Fichier | Ce qu'on voit | À surveiller |
| --- | --- | --- | --- |
| 1 | `t4e-jug55-0` | Le séchoir, les poissons, le lac au couchant, herbes et roches | Le feu est dans une sorte de baril couché, qui ne veut rien dire ; ciel semé d'étoiles |
| 2 | `t4e-jug55-1` | Le séchoir, un foyer de pierres, l'herbe haute | Une chaise Adirondack et un foyer en anneau : du camping d'aujourd'hui ; pas de chalet |
| 3 | `t4e-jug65-0` | | Écartée : le séchoir est devenu un tableau |
| 4 | `t4e-jug65-1` | | Écartée : le séchoir porte un tableau ; chaise Adirondack |
| 5 | `t4e-flux62-0` | Le séchoir, le feu, un petit chalet allumé, l'herbe en fleurs | Des formes de poisson ou de phoque couchées dans l'herbe, en bas |
| 6 | `t4e-flux62-1` | Le chalet plus grand à droite, le séchoir, le feu | Même défaut que la 5 : deux bêtes couchées dans l'herbe |
| 7 | `t4e-flux72-0` | Le séchoir, le feu, le chalet allumé, des roches et des herbes sèches, un filet de fumée | Rien de bizarre ; les poissons sont encore en rangs identiques (la retouche les varie) |
| 8 | `t4e-flux72-1` | Le chalet, le feu, des fleurs sauvages | Des fleurs bleues et vertes : deux encres de plus que les trois du livre |

Aucune n'a de signature ni de marge (coins du bas regardés). **Recommandation : la 7.** Après le choix de JP : agrandir
×4 (`../../horde-agrandir.py`) et reprendre la retouche de `../retouche_lac.py` (soleil en aplat, reflet en morceaux,
poissons variés, fumée en ruban), sans la neige.
