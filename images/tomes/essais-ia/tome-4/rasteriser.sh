#!/bin/sh
# Rasterise un SVG 768 × 960 en PNG par Chromium headless (fenêtre plus haute, puis recadrage).
#   sh rasteriser.sh entree.svg sortie.png
set -e
CH=$(ls -d /opt/pw-browsers/chromium-*/chrome-linux/chrome | head -1)
TMP=$(mktemp -d)
cp "$1" "$TMP/s.svg"
printf '<!doctype html><html><body style="margin:0;background:#000"><img src="s.svg" width="768" height="960" style="display:block"></body></html>' > "$TMP/p.html"
"$CH" --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=768,1200 --screenshot="$TMP/shot.png" "file://$TMP/p.html" >/dev/null 2>&1
python3 -c "from PIL import Image; Image.open('$TMP/shot.png').convert('RGB').crop((0,0,768,960)).save('$2')"
rm -rf "$TMP"
echo "$2"
