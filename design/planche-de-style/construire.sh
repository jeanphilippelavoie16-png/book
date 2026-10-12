#!/bin/bash
# Planche de style — Le Grand Livre du Chalet, direction 1 (manuel de terrain, couleurs nordiques).
# 1. Rend les vraies pages (interieur.html, moteur de la direction 1) et les vraies couvertures
#    (couvertures-nordique.html) en PNG, dans rendus/.
# 2. Rend planche.html en PNG et en PDF.
# usage : construire.sh [rendus|planche|tout]   (défaut : tout)
ROOT="C:/Users/jeanp/New folder"
D1="$ROOT/design/directions/1-manuel-de-terrain"
PS="$ROOT/design/planche-de-style"
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
mkdir -p "$PS/rendus"

url(){ echo "file:///$(echo "$1" | sed 's/ /%20/g')$2"; }
edge(){ # args... ; profil jetable
  local prof; prof="$(mktemp -d)/p"
  "$EDGE" --headless=new --disable-gpu --no-first-run --no-default-browser-check --user-data-dir="$prof" \
    --hide-scrollbars --run-all-compositor-stages-before-draw --virtual-time-budget=25000 "$@" 2>/dev/null
  rm -rf "$prof" 2>/dev/null
}
attend(){ for i in $(seq 1 120); do [ -s "$1" ] && break; sleep 1; done; }
shot(){ # html hash out "w,h" scale
  rm -f "$3"; edge --force-device-scale-factor=$5 --window-size=$4 --screenshot="$3" "$(url "$1" "$2")"; attend "$3"
  echo "  $(basename "$3")"
}

rendus(){
  echo "Pages intérieures (moteur de la direction 1) :"
  python "$D1/outils/build_interieur.py" >/dev/null || exit 1
  for p in p65-1 p65-2 p65-3 p65-6 p65-7 p65-12 p65-13 p00-7 p73-5; do
    shot "$D1/interieur.html" "#page=$p" "$PS/rendus/$p.png" 768,960 2 &
  done
  wait
  shot "$D1/interieur.html" "#page=p73-5" "$PS/rendus/p73-5-x4.png" 768,960 4
  echo "Couvertures :"
  # mise en page d'impression : quatre avants (8,125 × 10,25 po) puis la couverture complète du tome 4
  shot "$D1/couvertures-nordique.html" "" "$PS/rendus/couvertures.png" 1652,4920 2 &
  # la tablette : quatre tranches (vue #tablette du fichier de couvertures)
  shot "$D1/couvertures-nordique.html" "#tablette" "$PS/rendus/tablette.png" 298,538 4 &
  wait
}

planche(){
  echo "Planche :"
  local dom; dom="$(mktemp)"
  edge --dump-dom "$(url "$PS/planche.html")" > "$dom"
  local H; H=$(grep -o 'data-h="[0-9]*"' "$dom" | head -1 | grep -o '[0-9]*'); rm -f "$dom"
  [ -z "$H" ] && H="${HAUTEUR:-}"; [ -z "$H" ] && { echo "hauteur introuvable (donner HAUTEUR=)"; exit 1; }
  echo "  hauteur ${H}px"
  shot "$PS/planche.html" "" "$PS/planche-de-style.png" "2000,$H" 1.5
  rm -f "$PS/planche-de-style.pdf"
  edge --no-pdf-header-footer --print-to-pdf-no-header --print-to-pdf="$PS/planche-de-style.pdf" "$(url "$PS/planche.html")"
  attend "$PS/planche-de-style.pdf"; echo "  planche-de-style.pdf"
}

case "${1:-tout}" in
  rendus) rendus ;;
  planche) planche ;;
  *) rendus; planche ;;
esac
ls -la "$PS"/*.png "$PS"/*.pdf 2>/dev/null | awk '{print $5, $NF}'
