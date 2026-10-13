---
name: dessin-notice
description: "Mains, têtes et corps des planches : sept méthodes rejetées (12–13 oct. 2026) ; depuis le 13 oct., on calque fidèlement les images de référence de JP (vectoriser.py), usage personnel autorisé par JP"
metadata:
  type: feedback
---

JP a rejeté sept fois les mains, les têtes et les corps (12–13 octobre 2026) : formes.js calculé en 2D, mains enlevées, trois dessinateurs + juge, main 3D au rendu réaliste (« ouff non »), style notice IKEA (« les doigts sont tout croche, les têtes sont laides et le corps aussi »), puis le décalque d'une petite image repassé par le skill `encrage` (« c'est de pire en pire »).

Ce qui marche : **calquer fidèlement** ses images de référence avec `.claude/skills/dessin-notice/scripts/vectoriser.py` (image agrandie, trait coupé à mi-chemin cœur-fond, un gris par trait, potrace). Rien n'est redessiné, symétrisé ni « encré » : le trait reste celui du dessinateur. Ses références (13 oct.) : tableau homme-femme face et dos 123RF, planche de mains de Kibbitzer (DeviantArt), planche de gestes au trait, corps de femme beige.

**Why:** un pouce mal placé ou un trait tremblé, il le voit tout de suite ; aucune construction par calcul n'a tenu. Les images ne sont pas sous licence libre : JP a tranché le 13 oct. (« c'est pour usage personnel, it's all good, calque »).

**How to apply:** pour une main, une tête ou un corps de planche, partir d'un de ces calques (`_reprise/scratchpad/modeles/calque/`), jamais d'une construction. Chaque calque est inscrit dans `images/credits.md` (section des modèles calqués) : usage personnel, à remplacer si le livre se vend ou se donne hors de la famille. Montrer toute feuille à JP avant de toucher aux planches. Voir [[regle-dure-pas-de-categories-echappatoires]] (enlever la main n'était pas la réponse).

**Pose dans les planches (13 oct., suite).** `images/modeles/` + `formes.modele()` ; essai sur 50-40, 25-40, 13-09, 104-40, 27-04 montré à JP. Ses demandes en voyant les premières : « une forme de bras, pas juste un fucking long bras droit, au pire le couper » et « les lignes plus fines pour respecter le style des dessins qu'on a » — d'où le trait choisi à 1,3 et l'avant-bras galbé ou coupé. 28-02 (tête d'enfant de profil, enfant assis) attend une référence.

**13 oct., fin.** JP : « les mains sont pas belles, prends celle-là, pi prends le temps de bien les faire » — une planche de mains de shoo_arts (iStock, trait fin égal). Calquée (modèles s01–s20), posée dans les cinq planches : s11 (poing) pour 104-40, 13-09 (acier) et 50-40 ; s05 (pierre dans le creux de la main) pour 13-09 ; s09 (pince) pour 50-40 et 27-04 ; s03 (main qui pend) pour 25-40. Kibbitzer est écarté.
JP ensuite : « c'est bien mais pas encore parfait, les formes que tu as pas de main, construis-les à partir des formes que tu as déjà pour pouvoir les adapter » → poses construites (modeles.py poses, images/modeles/poses.json) ; s10-plat remplace la main à plat des gestes dans 50-40.

