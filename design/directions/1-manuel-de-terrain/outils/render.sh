#!/bin/bash
# usage: render.sh <html> <pdf|png|dom> <out> [hash] [w,h] [scale]
OUT="C:/Users/jeanp/New folder/design/directions/1-manuel-de-terrain"
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
PROF="$(mktemp -d)/edgeprof"
URL="file:///$(echo "$OUT/$1" | sed 's/ /%20/g')$4"
COMMON=(--headless=new --disable-gpu --no-first-run --no-default-browser-check --user-data-dir="$PROF" --hide-scrollbars --run-all-compositor-stages-before-draw --virtual-time-budget=20000)
case "$2" in
  pdf) T="$OUT/$3"; rm -f "$T"; "$EDGE" "${COMMON[@]}" --no-pdf-header-footer --print-to-pdf-no-header --print-to-pdf="$T" "$URL" 2>/dev/null ;;
  png) T="$3"; rm -f "$T"; "$EDGE" "${COMMON[@]}" --force-device-scale-factor=${6:-2} --window-size=$5 --screenshot="$T" "$URL" 2>/dev/null ;;
  dom) T="$3"; "$EDGE" "${COMMON[@]}" --dump-dom "$URL" > "$T" 2>/dev/null ;;
esac
for i in $(seq 1 90); do [ -s "$T" ] && break; sleep 1; done
sleep 2; rm -rf "$PROF" 2>/dev/null
ls -la "$T" | awk '{print $5, $NF}'
