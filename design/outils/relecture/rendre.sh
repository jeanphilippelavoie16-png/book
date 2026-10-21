#!/bin/bash
# Rend les pages des tomes pour le lecteur de relecture : 137,5 ppp (1100 px sur la largeur finie),
# puis les emballe en feuilles WebP de 5 pages dans livre/relecture/site/pages/tN/.
# Usage : design/outils/relecture/rendre.sh 1 2 3 4 5 6   (les interieur.pdf doivent exister)
set -e
R=$(cd "$(dirname "$0")/../../.." && pwd)
O=$R/livre/relecture
for T in "$@"; do
  PDF=$R/livre/tome-$T/interieur.pdf
  N=$(pdfinfo "$PDF" | awk '/^Pages:/{print $2}')
  OUT=$O/png/t$T; rm -rf "$OUT"; mkdir -p "$OUT"
  q=$(( (N + 3) / 4 ))
  for i in 0 1 2 3; do a=$((i*q+1)); b=$(( (i+1)*q )); [ $b -gt $N ] && b=$N
    [ $a -le $N ] && pdftoppm -r 137.5 -f $a -l $b -png "$PDF" "$OUT/p" & done; wait
  rm -rf "$O/site/pages/t$T"
  python3 "$R/design/outils/relecture/emballer.py" $T $N "$OUT" "$O/site/pages/t$T" 72
  rm -rf "$OUT"
done
