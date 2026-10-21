#!/bin/sh
# Rasterise un SVG 768 × 960 avec Chromium headless (fenêtre plus haute, puis recadrage). Usage : rasteriser.sh x.svg x.png
CH=$(ls -d /opt/pw-browsers/chromium-*/chrome-linux/chrome | head -1)
T=$(mktemp -d)
printf '<!doctype html><html><body style="margin:0;background:#fff"><img src="file://%s" width="768" height="960" style="display:block"></body></html>' "$(realpath "$1")" > "$T/p.html"
"$CH" --headless=new --no-sandbox --disable-gpu --hide-scrollbars --allow-file-access-from-files --window-size=768,1200 --screenshot="$T/s.png" "file://$T/p.html" >/dev/null 2>&1
python3 -c "from PIL import Image; Image.open('$T/s.png').convert('RGB').crop((0,0,768,960)).save('$2')"
rm -rf "$T"
