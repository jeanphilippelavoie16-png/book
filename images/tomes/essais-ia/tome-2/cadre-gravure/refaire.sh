#!/bin/sh
# Refaire la gravure du lac (1070 x 600, six encres) à partir de la photo de JP.
# Toute la chaîne, dans l'ordre ; seule l'étape AI Horde est aléatoire : la sortie retenue est gardée dans
# e-jugg-i51-1.webp, avec labels-sans.png, et la dernière commande suffit à refaire le PNG à partir d'eux.
# La photo de JP (le lac, le drapeau, les deux enfants) n'est pas dans le dépôt : les étapes 1 à 4 la demandent.
set -e
cd "$(dirname "$0")"
PHOTO=${PHOTO:-photo-lac.jpg}
# 1. les zones de la photo (ciel, crête, collines, eau, buissons, sentier, mât, drapeau, enfants)
python3 regions.py "$PHOTO" labels.png labels-apercu.png
# 2. les enfants effacés de la photo et des zones (ils sont dessinés après la gravure)
python3 sans_enfants.py "$PHOTO" labels.png photo-sans.png labels-sans.png
# 3. l'image de départ, déjà dans les six encres, sans les enfants
GUIDE_EFFACE=labels-sans-masque.png python3 guide.py photo-sans.png labels-sans.png guide-c.png
# 4. (aléatoire, 10 à 20 min) la linogravure repeinte par AI Horde, Juggernaut XL, force 0,51
if [ "$1" = "--horde" ]; then
  python3 ../../horde-img2img.py 'Juggernaut XL' guide-c.png prompt-lino-vide.txt 0.51 e-jugg-i51 2
fi
# 5. les six encres, le nettoyage, le mât, le drapeau et les deux enfants dessinés
python3 gravure.py e-jugg-i51-1.webp labels-sans.png gravure-lac.png
