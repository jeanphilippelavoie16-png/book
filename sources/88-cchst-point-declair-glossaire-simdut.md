# CCHST — SIMDUT 2015, glossaire : point d'éclair et température d'auto-allumage

- **Organisme :** Centre canadien d'hygiène et de sécurité au travail (CCHST / CCOHS), fédéral
- **Titre de la page :** « SIMDUT 2015 — Glossaire — N-Z » (Réponses SST)
- **URL :** https://www.cchst.ca/oshanswers/chemicals/whmis_ghs/glossary/glossary_n.html
- **Date de consultation :** 2026-09-20
- **Captation :** de première main, `WebFetch`, HTTP 200
- **Sert au chapitre :** 88 — Trempe et travail du métal à chaud (sections 3, 4, 5-E, 8).
  **Fournit le mécanisme du bloc C de l'encadré DANGER.**

---

## Extraits intégraux, relevés le 2026-09-20

### Point d'éclair

> « température minimale à laquelle les vapeurs d'un liquide s'enflamment lorsqu'elles sont exposées
> à une source d'inflammation. »

### Température d'auto-allumage

> « température la plus basse à laquelle un produit s'enflamme lorsqu'il n'y a pas d'étincelle ni de
> flamme. »

---

## Notes de captation

**Ces deux définitions, mises ensemble, décrivent le bac de trempe et rien d'autre.** Une pièce
d'acier orange plongée dans l'huile chauffe cette huile localement bien au-delà de son point d'éclair
et lui fournit en même temps la source d'inflammation — c'est-à-dire elle-même. Le lecteur qui voit
une flamme courir sur son bac n'assiste pas à un accident anormal : il assiste au fonctionnement
normal des deux définitions ci-dessus. C'est pour ça que le chapitre exige un couvercle métallique à
portée de main **avant** la première trempe, et non un extincteur à côté.

**La température d'auto-allumage explique le deuxième scénario**, celui de la guenille huileuse et du
bac laissé découvert près du feu : il n'y a pas besoin d'étincelle.

**Chiffres NON obtenus, et ils manquent :** le glossaire ne donne **aucune** valeur numérique — ni le
seuil de 37,8 °C qui sépare un liquide inflammable d'un liquide combustible, ni le point d'éclair
d'une huile de trempe, d'une huile à moteur usée ou d'une huile de canola. La page « Les liquides
inflammables et combustibles et leurs dangers » (`/oshanswers/chemicals/flammable/flam.html`) qui
porte ces valeurs **n'a pas pu être captée** : trois tentatives de `WebFetch` le 2026-09-20 ont
renvoyé la page d'index du site et non la fiche, et la version PDF renvoie HTTP 404. Le chapitre 88
ne publie donc **aucun point d'éclair** et donne la règle qualitative : toute huile s'enflamme, la
seule question est à quelle température, et personne au chalet ne mesure cette température-là.

**Conséquence assumée pour le chapitre :** aucun classement des huiles de trempe par point d'éclair,
aucune recommandation chiffrée de préchauffage du bain, aucune comparaison « huile végétale contre
huile minérale » appuyée sur des nombres. Ce trou est signalé au vérificateur technique comme le
deuxième plus gênant du chapitre.
