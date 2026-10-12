#!/bin/bash
# Couvertures des six tomes : génère le HTML, puis le PDF, un PDF par tome aux mesures de Blurb et les aperçus,
# avec Edge sans fenêtre.
# usage : rendre_couvertures_6.sh [html|pdf|png|tout]   (défaut : tout)
#   pdf : couvertures-nordique-6.pdf (six avants + six couvertures complètes), puis livre/tome-N/couverture.pdf
D1="C:/Users/jeanp/New folder/design/directions/1-manuel-de-terrain"
LIVRE="C:/Users/jeanp/New folder/livre"
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
HTML="$D1/couvertures-nordique-6.html"

url(){ echo "file:///$(echo "$1" | sed 's/ /%20/g')$2"; }
edge(){ local prof; prof="$(mktemp -d)/p"
  "$EDGE" --headless=new --disable-gpu --no-first-run --no-default-browser-check --user-data-dir="$prof" \
    --hide-scrollbars --run-all-compositor-stages-before-draw --virtual-time-budget=25000 "$@" 2>/dev/null
  rm -rf "$prof" 2>/dev/null; }
attend(){ for i in $(seq 1 ${2:-60}); do [ -s "$1" ] && return 0; sleep 1; done; return 1; }
shot(){ # hash sortie "w,h" échelle
  # Edge sans fenêtre rate parfois une capture quand d'autres tournent en même temps : trois essais
  for essai in 1 2 3; do rm -f "$2"; edge --force-device-scale-factor=$4 --window-size=$3 --screenshot="$2" "$(url "$HTML" "$1")"
    attend "$2" 20 && { echo "  $(basename "$2")"; return 0; }; done; echo "  ÉCHEC $(basename "$2")"; }

html(){ python "$D1/outils/build_couvertures_6.py" || exit 1; }
pdf(){ local out="$D1/couvertures-nordique-6.pdf"
  for essai in 1 2 3; do rm -f "$out"
    edge --no-pdf-header-footer --print-to-pdf-no-header --print-to-pdf="$out" "$(url "$HTML")"
    # Edge rend la main tout de suite et écrit le PDF plus tard : on attend le fichier, puis une taille stable
    attend "$out" 120 && { a=-1; while [ "$(stat -c %s "$out")" != "$a" ]; do a=$(stat -c %s "$out"); sleep 2; done
      echo "  couvertures-nordique-6.pdf"; break; }; done
  [ -s "$out" ] || { echo "  ÉCHEC couvertures-nordique-6.pdf"; exit 1; }
  python "$D1/outils/build_couvertures_6.py" --decouper || exit 1; }
png(){
  shot "#avants" "$D1/apercu-nordique-couvertures-6-avants.png" 1280,282 2
  shot "#tablette" "$D1/apercu-nordique-tablette-6-tomes.png" 640,540 3
  shot "#couvertures-5-6" "$D1/apercu-nordique-couvertures-5-6.png" 890,1140 2
  shot "#completes" "$D1/apercu-nordique-couvertures-6-completes.png" 1140,1060 2
  for k in 1 2 3 4 5 6; do shot "#tome-$k" "$LIVRE/tome-$k/couverture.png" 900,530 2; done
}

case "${1:-tout}" in
  html) html ;; pdf) pdf ;; png) png ;;
  *) html; pdf; png ;;
esac
