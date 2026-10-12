---
name: planches-sans-relecture
description: Les planches se dessinent sans relecture par agent — JP relit lui-même ; le dessinateur vérifie seul que le montage marche
metadata:
  node_type: memory
  type: feedback
  originSessionId: bed7cfe7-8639-429a-8cfe-5f58e5149259
  modified: 2026-09-24T22:51:07.490Z
---

Depuis le 2026-09-24 : **pas de relecture par agent sur les dessins.** Un agent par planche dessine, regarde son PNG (trois fois au plus), vérifie lui-même que le montage marcherait pour vrai (suivre l'eau, la fumée, l'air, la corde, la charge), et c'est tout. JP relit les planches lui-même. Workflow : `.claude/planches-dessin-seul.workflow.js` (l'ancien `planches-dessin-relecture.workflow.js` ne sert plus pour les nouvelles planches).

**Why:** JP : « les dessins je veux pas de relecture, c'est trop coûteux » puis « c'est moi la relecture ». La relecture doublait presque le coût d'une planche (≈ 100 k de plus chacune).

**How to apply:** Pour toute nouvelle planche, lancer le dessin seul, puis envoyer les PNG à JP pour validation (voir [[toujours-montrer-pour-validation]]). Corriger seulement ce que JP signale. Garder dans le brief du dessinateur la liste des fautes de montage déjà arrivées (siphon, trou à feu ouvert, charnière coincée), puisqu'il n'y a plus de second regard. Voir aussi [[planches-ce-qui-se-construit]].

**La liste complète des recommandations de JP est dans `images/recommandations-planches.md`** : la reprendre dans chaque brief de dessin, et y ajouter chaque nouvelle remarque qu'il fait sur une planche. Une passe globale finale sur **100 % des planches** (validées comprises) l'appliquera, à la fin, avant la mise en pages (plan de match, point 4). Résumé :
- **Gestes fins = extrêmement bien faits, sinon inutiles.** Couture, nœud, maille, laçage, ligature : gros plan, une étape par vue, le fil suivi sans ambiguïté (dessus/dessous à chaque croisement, dormant et bout libre distincts). Il a rejeté 60-10 (aiguille à filet) pour ça.
- **Les mains sont le point faible** : il a ri de la main « pince de homard » de 13-09. Main simple et juste, ou pas de main (l'objet et la flèche du geste).
- **Un mécanisme doit se comprendre au premier regard** : 50-10 (collet de noyade du castor) jugé « laid et incompréhensible » — pièces minuscules, objets qu'on ne reconnaît pas, ni l'animal ni l'avant/après.
- **Cotes en mm seulement sur ce qu'on construit**, jamais inventées.
