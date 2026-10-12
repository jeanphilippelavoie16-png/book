#!/bin/bash
# Refait le PNG des planches corrigées (refs en argument), là où il se trouvait (validees ou a-valider).
# À lancer depuis la racine du projet.
for ref in "$@"; do
  for f in images/planche-$ref-*.svg images/planche-$ref.svg; do
    [ -f "$f" ] || continue
    b=$(basename "$f" .svg)
    d=images/a-valider; [ -f "images/validees/$b.png" ] && d=images/validees
    node .claude/skills/planches/scripts/rendre-planche.js "$f" "$d/$b.png" >/dev/null 2>&1 && echo "$d/$b.png"
  done
done
