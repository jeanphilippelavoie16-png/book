# Rend les PDF et les aperçus PNG de la direction 3 avec Edge sans tête.
# Usage : powershell -File outils\rendre.ps1 [-Quoi interieur|couvertures|tout] [-Rapport]
param([string]$Quoi = 'tout', [switch]$Rapport, [string[]]$Pages = @('311', '318', '319', '11'), [switch]$SansPdf)
$ErrorActionPreference = 'Stop'
$D = Split-Path -Parent $PSScriptRoot
$E = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$P = Join-Path $env:TEMP ('edge-dir3-' + [guid]::NewGuid().ToString('N'))
$U = 'file:///' + ($D -replace '\\', '/' -replace ' ', '%20')

function Edge([string[]]$a) {
  $base = @('--headless=new', '--disable-gpu', "--user-data-dir=$P", '--no-first-run',
            '--hide-scrollbars', '--virtual-time-budget=15000', '--run-all-compositor-stages-before-draw')
  $q = ($base + $a) | ForEach-Object { if ($_ -match ' ') { '"' + $_ + '"' } else { $_ } }
  $p = Start-Process -FilePath $E -ArgumentList $q -Wait -PassThru -NoNewWindow `
        -RedirectStandardError (Join-Path $env:TEMP 'edge-dir3-err.txt') -RedirectStandardOutput (Join-Path $env:TEMP 'edge-dir3-out.txt')
}
function Shot($url, $png, $w, $h, $scale) {
  Edge @("--window-size=$w,$h", "--force-device-scale-factor=$scale", "--screenshot=$png", $url)
}

if ($Quoi -in 'interieur', 'tout') {
  python (Join-Path $PSScriptRoot 'construire.py')
  if ($Rapport) {
    Edge @('--dump-dom', "$U/interieur.html")
    $dom = Get-Content (Join-Path $env:TEMP 'edge-dir3-out.txt') -Raw -Encoding UTF8
    if ($dom -match 'data-report="([^"]*)"') { [System.Net.WebUtility]::HtmlDecode($Matches[1]) }
    return
  }
  if (-not $SansPdf) { Edge @('--no-pdf-header-footer', "--print-to-pdf=$D\interieur.pdf", "$U/interieur.html"); python (Join-Path $PSScriptRoot 'ajuster_pdf.py') interieur }
  Shot "$U/interieur.html#planche" "$D\apercus\interieur-planche-contact.png" 1560 760 2
  foreach ($f in $Pages) {
    Shot "$U/interieur.html#page-$f" "$D\apercus\interieur-page-$f.png" 768 960 2
  }
}
if ($Quoi -in 'couvertures', 'tout') {
  Edge @('--no-pdf-header-footer', "--print-to-pdf=$D\couvertures.pdf", "$U/couvertures.html"); python (Join-Path $PSScriptRoot 'ajuster_pdf.py') couvertures
  Shot "$U/couvertures.html#planche" "$D\apercus\couvertures-planche-contact.png" 1600 560 2
  Shot "$U/couvertures.html#jaquette" "$D\apercus\couverture-complete-tome4.png" 1320 780 2
  Shot "$U/couvertures.html#tablette" "$D\apercus\couvertures-tablette.png" 420 820 2
}
Remove-Item -Recurse -Force $P -ErrorAction SilentlyContinue
