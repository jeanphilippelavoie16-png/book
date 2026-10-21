#!/usr/bin/env node
// Rend une planche SVG en PNG avec Edge sans fenêtre, pour pouvoir la REGARDER.
//
//   node rendre-planche.js images/planche-86-01-mouflage.svg [sortie.png]
//
// Pourquoi : le vérificateur contrôle ce qui se mesure (épaisseurs, couleurs, marges
// d'un encadré, hachures hors découpe). Il ne voit pas ce qui se regarde : un dessin
// qu'on ne reconnaît pas, une légende tassée, un renvoi collé à un trait, une
// composition déséquilibrée. Tous les défauts relevés par JP étaient de ce genre-là.
// Rends la planche, puis ouvre le PNG avec l'outil de lecture d'images et regarde-la.

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const EDGES = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  '/usr/bin/chromium',
];

const src = process.argv[2];
if (!src) { console.error('usage : rendre-planche.js <planche.svg> [sortie.png]'); process.exit(2); }
const abs = path.resolve(src);
if (!fs.existsSync(abs)) { console.error(`introuvable : ${abs}`); process.exit(2); }

const svg = fs.readFileSync(abs, 'utf8');
const vb = (svg.match(/viewBox\s*=\s*"([\d.\s-]+)"/) || [])[1];
if (!vb) { console.error('pas de viewBox'); process.exit(2); }
const [, , W, H] = vb.trim().split(/\s+/).map(Number);

const sortie = path.resolve(process.argv[3] ||
  path.join(os.tmpdir(), 'rendu-' + path.basename(abs, '.svg') + '.png'));

const edge = EDGES.find(p => fs.existsSync(p));
if (!edge) { console.error('ni Edge ni Chrome trouvés : pas de rendu possible'); process.exit(3); }

// Chemin de fichier -> URL file:// (espaces encodés, barres obliques)
const { pathToFileURL } = require('url');
const url = pathToFileURL(abs).href;

// Un profil jetable : sans lui, si Edge tourne déjà sur la machine, le mode sans fenêtre
// passe la main à l'instance ouverte et sort sans jamais écrire la capture.
const profil = fs.mkdtempSync(path.join(os.tmpdir(), 'rendu-edge-'));
if (fs.existsSync(sortie)) fs.unlinkSync(sortie);

const dormir = ms => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

try {
  execFileSync(edge, [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--no-first-run', '--hide-scrollbars',
    '--no-default-browser-check', `--user-data-dir=${profil}`,
    '--force-device-scale-factor=2',      // rendu à 2x : les traits de 0,5 restent lisibles
    `--window-size=${Math.round(W)},${Math.round(H) + (process.platform === 'linux' ? 120 : 0)}`,
    `--screenshot=${sortie}`,
    url,
  ], { stdio: 'ignore', timeout: 90000 });
} catch (e) {
  // Le lanceur d'Edge peut sortir en erreur alors que le navigateur, lui, continue.
}

// Le lanceur rend la main avant que le navigateur ait écrit la capture : on attend le
// fichier, et on ne supprime le profil qu'après — sinon on l'arrache à Edge en plein travail.
let ok = false;
for (let t = 0; t < 60 && !ok; t++) {
  if (fs.existsSync(sortie) && fs.statSync(sortie).size > 0) {
    const a = fs.statSync(sortie).size; dormir(300);
    ok = fs.statSync(sortie).size === a;           // taille stable : l'écriture est finie
  } else dormir(500);
}
try { fs.rmSync(profil, { recursive: true, force: true }); } catch (e) {}

// Sous Linux, Chromium sans fenêtre rend une fenêtre plus courte que --window-size (il coupait
// le bas de la page) : on la demande plus haute, puis on recadre à la taille de la planche.
if (ok && process.platform === 'linux') {
  try {
    execFileSync('python3', ['-c', 'import sys;from PIL import Image;im=Image.open(sys.argv[1]);im.crop((0,0,int(sys.argv[2]),int(sys.argv[3]))).save(sys.argv[1])',
      sortie, String(Math.round(W) * 2), String(Math.round(H) * 2)]);
  } catch (e) { console.error('recadrage impossible : ' + e.message); }
}

if (!ok) { console.error('aucun PNG produit en 30 s'); process.exit(4); }
console.log(sortie);
console.error(`rendu ${W} × ${H} à 2x → ouvre ce PNG avec l'outil de lecture d'images et regarde la planche.`);
