# Essais d'images générées (pages de titre des tomes)

Générées le 16 octobre 2026 par le réseau AI Horde (gratuit, sans clé), modèle Qwen-Image (licence Apache 2.0),
avec `horde.py` et le texte `tome-1-prompt.txt`. 1280 × 448 px : assez pour juger, trop petit pour imprimer
à 7 po ; l'image retenue se refait plus grande ou se vectorise (noir, gris, orange) avant d'entrer dans le livre.

## Page de titre, nuit d'hiver, repeinte (18 octobre 2026)

`horde-img2img.py`, modèle Juggernaut XL, force 0,68, image de départ `titre-nuit-reference.png` (réduite à
768 × 960), texte `titre-nuit-prompt.txt` : `titre-nuit-juggernaut-0.png` et `-1.png`. AlbedoBase XL à 0,55 restait
trop près du dessin ; à 0,78, il inventait des orignaux et une signature. `titre-nuit-comparaison.png` : le dessin,
puis les deux versions. 768 × 960 : assez pour juger ; l'image retenue se refait plus grande avant l'impression.

Deuxième tour, même jour (JP : « c'est pas beau, cherche une alternative ») : A et B, linogravure par Juggernaut XL
à partir de la scène (force 0,72, `titre-nuit-prompt-lino.txt`) ; C à F, Flux.1-Schnell à partir du texte seul
(`titre-nuit-prompt-flux.txt`). Planche de choix : `titre-nuit-pistes.png`. Flux signe ses images d'un faux nom en
bas : le bas de la page de titre porte la série des tomes, et la signature se retire de toute façon avant
l'impression.
