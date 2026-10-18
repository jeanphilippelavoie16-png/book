# Les couvertures des six tomes (18 octobre 2026)

Mise en page **C, « le ciel fait le tour »**, choisie par JP pour le tome 1, appliquée aux six tomes avec l'image de
titre de chacun (`images/tomes/titre-tome-N.jpg`) : le titre centré sur le devant, le ciel de l'image recadré en
miroir sur la tranche et la quatrième, aux mesures de Blurb de chaque tome (la tranche suit le nombre de pages).

    python3 images/tomes/essais-ia/tome-1/couverture.py --tome N --variantes C --sortie images/tomes/couvertures

Le tome 6 : la lune est remontée dans le coin du ciel, en haut à droite, sur l'image même (`essais-ia/tome-6/lune_atelier.py`,
JP : « rajoute la lune dans l'atelier en haut à droite ») ; elle ne touche plus le titre. Son titre centré est remonté
(`CENTRE_BAS` du script) pour rester dans le ciel noir, au-dessus de la colline enneigée.

Deux règles ajoutées au script pour les images des tomes 2 à 6 : le miroir du ciel s'arrête avant la première colonne
qui n'est plus du ciel (les épinettes du tome 4 montaient sur le dos), et avant la première ligne où les collines
commencent (le sommet enneigé du tome 6 faisait des traînées claires sur la quatrième).

Planche : `les-six-couvertures.png`. À refaire à chaque changement d'image de titre ou du nombre de pages d'un tome.
