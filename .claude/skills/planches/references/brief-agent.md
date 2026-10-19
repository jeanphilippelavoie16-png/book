# Le cadre de tout agent qui dessine une planche

À coller **au complet** dans le brief de chaque agent de planches, avant le sujet (JP, 16 octobre 2026 : « assure-toi
de bien les encadrer quand tu les start, faut pas faire n'importe quoi ; on se met des règles et des outils, il faut
les utiliser »). Un agent du ch. 13 avait redessiné les mains de la 13-40 à la main au lieu de passer par la
bibliothèque validée ; JP l'a vu tout de suite.

## Les outils sont obligatoires

- **Les gros plans de mains passent par `h.formes.mainStock`** : les mains Adobe Stock 116570613 que JP a choisies (18 octobre 2026 : « les bonnes mains »), tracés exacts de l'illustratrice au style du livre ; `scripts/mains/stock.js`, catalogue `scripts/mains/stock/catalogue.json`, noms `stock/noms.json`, feuille des ids `images/planches-src/_palette-mains-stock.js` (aperçu `livre/apercus-palette/mains-stock-ids.png`). `mainSimple` ne sert plus. **Aucune main dessinée à la main**, ni « au trait du style cible », ni en chemins
  écrits dans la planche.
- **Un corps entier passe par `h.formes.corps`** (`scripts/corps/`), de profil seulement.
- **Une tête avec visage passe par `h.formes.teteSimple`** (`scripts/tetes/`) ou `corps({ visage })`.
- **Une prise laide dans la vue ne se redessine pas** : on change le cadrage (les doigts coupés par le bord de la
  vue), on prend une autre prise du moteur, ou on montre l'objet seul et le renvoi dit la prise. Une pose qui
  manque s'ajoute à `formes.js`, se regarde en grand sur les feuilles d'essai (`images/planches-src/_formes-essai-*.js`),
  puis sert.
- **Le composeur** (`scripts/composer-planche.js`), le rendu (`rendre-planche.js`) et le vérificateur
  (`verifier-planche.js`) à chaque version ; `xmllint --noout` à la fin.

**Mise à jour du 18 octobre 2026** : la nouvelle bibliothèque est branchée (`h.formes.mainStock`, JP : « les bonnes
mains »). Les gros plans de main reviennent dans les planches, par elle seulement. Toujours rien à la main.

## Les règles à lire avant de dessiner

- `CLAUDE.md` ; les skills `planches`, `dessin-notice`, `encrage`, au complet.
- `images/recommandations-planches.md`, règles 1 à 12, **et le tableau des planches signalées** : une planche qui
  y est se refait au complet, jamais par retouche (règle 12).
- La barre de JP : « le sable et la terre dans la main, c'est butcher ; faisons les choses comme il faut ».

## Le second regard, avant de livrer

L'agent ne se juge pas seul (règle 12). Un relecteur qui n'a pas dessiné la planche la regarde à la taille
d'impression puis de près (mains, matières, feu, bâtons), avec cette consigne : « les mains, corps et têtes
viennent des moteurs validés ; une main dessinée à la main est un refus ; est-ce qu'un illustrateur professionnel
publierait ça, oui ou non, et quoi corriger ». On corrige une fois, et c'est tout : **un seul tour** de regard et de correction (JP, 19 octobre 2026 : « 4 M de jetons
pour 6 planches, sérieusement ? » ; « un cycle interminable de relecture »). Le relecteur ne refait pas la critique de
toute la planche : il dit si ce qui était demandé est fait et ce qui casse vraiment (une main dessinée à la main, un
repère faux, un texte qui chevauche, une matière qui ne se reconnaît pas), cinq points au plus, les plus graves d'abord.
Le reste, c'est JP qui le voit en validant. Le rapport dit, pour chaque main, quelle pose du moteur elle utilise.

## Le rangement

PNG dans `images/a-valider/`, jamais dans `validees/` : seul JP valide.
