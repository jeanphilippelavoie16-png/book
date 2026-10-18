# Les images des encadrés « En plus »

Les images posées dans les encadrés verts « En plus » des chapitres (une ligne `![légende](images/extras/…)` dans la
section « En plus »). Elles sont ici, hors de `a-valider/` et de `validees/`, pour que le moteur ne les prenne pas pour
des planches de la procédure.

| Fichier | Chapitre | Ce que c'est | Source |
| --- | --- | --- | --- |
| `12-corps-mort.svg`, `12-corps-mort.png` | 12, étape 13 | Petite planche (format quart, 340 × 413) : le corps mort vu de dessus avant de remplir, puis en coupe, rempli et tassé | `images/planches-src/extra-12-corps-mort.js` |

## Refaire une petite planche

```bash
node .claude/skills/planches/scripts/composer-planche.js images/planches-src/extra-12-corps-mort.js
node .claude/skills/planches/scripts/rendre-planche.js images/extras/12-corps-mort.svg images/extras/12-corps-mort.png
node .claude/skills/planches/scripts/verifier-planche.js images/extras/12-corps-mort.svg
```

Le composeur écrit le SVG ici grâce au champ `fichier: 'extras/…'` de la description. Les deux avis « tiède » du
vérificateur (pas de numéro de planche) sont voulus : une image d'encadré n'a pas de numéro.
