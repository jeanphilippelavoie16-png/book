#!/usr/bin/env node
// Monte le canevas de relecture des planches du Grand Livre du Chalet.
//
//   node monter-canevas.js images/manifeste-canevas.json [dossier-de-sortie]
//
// Le manifeste :
// {
//   "titre": "Planches — Le Grand Livre du Chalet",
//   "colonnes": 3,
//   "groupes": [
//     { "id": "refaire", "titre": "À refaire",
//       "planches": [
//         { "svg": "images/planche-65-01-fumoir-froid.svg",
//           "ref": "65-01", "nom": "Le fumoir à froid",
//           "format": "demi-page",
//           "note": "À REFAIRE — échoue au test de la légende cachée." }
//       ] }
//   ]
// }
//
// Le script calcule les positions, refuse d'écrire si deux cadres se chevauchent
// ou si une note déborde sur la rangée suivante, puis écrit project/canvas.json
// et un .dc.html par planche.

const fs = require('fs');
const path = require('path');

// --- constantes de mise en page -------------------------------------------
const PPP = 68;                    // pixels par pouce sur le canevas
const PAGE_L = Math.round(8 * PPP);   // 544
const PAGE_H = Math.round(10 * PPP);  // 680
const MARGE_X = Math.round(0.5 * PPP);   // 34
const MARGE_Y = Math.round(0.75 * PPP);  // 51
const UTILE_L = PAGE_L - 2 * MARGE_X;    // 476
const UTILE_H = PAGE_H - 2 * MARGE_Y;    // 578
const GOUTTIERE = 80;              // entre deux cadres d'une rangée
const INTERLIGNE = 120;            // entre deux rangées
const SOUS_CADRE = 24;             // entre un cadre et sa note
const NOTE_H = 72;                 // hauteur fixe d'une note de légende
const TITRE_AU_DESSUS = 250;       // un title1 se pose au moins 223 px plus haut
const ESPACE_GROUPE = 260;         // entre le bas d'un groupe et le titre du suivant

const args = process.argv.slice(2);
if (!args[0]) { console.error('usage : monter-canevas.js <manifeste.json> [sortie]'); process.exit(2); }
const MANIF = JSON.parse(fs.readFileSync(args[0], 'utf8'));
const SORTIE = args[1] || 'canvas';
const BASE = path.dirname(path.resolve(args[0]), '..');

const echec = [], avertir = [];

// --- l'artboard : une page du livre, avec ses marges et la planche dedans ---
function artboard(p, svgTexte) {
  const vb = (svgTexte.match(/viewBox\s*=\s*"([\d.\s-]+)"/) || [])[1];
  if (!vb) { echec.push(`${p.ref} : le SVG n'a pas de viewBox`); return null; }
  const [, , vbL, vbH] = vb.trim().split(/\s+/).map(Number);

  // la planche se cadre dans la zone utile, contrainte par la dimension la plus serrée
  const k = Math.min(UTILE_L / vbL, UTILE_H / vbH);
  const largeur = Math.round(vbL * k);
  const hauteur = Math.round(vbH * k);
  const gauche = MARGE_X + Math.round((UTILE_L - largeur) / 2);
  const haut = MARGE_Y + Math.round((UTILE_H - hauteur) / 2);
  // une planche nettement plus étroite que la zone utile gaspille la page
  if (largeur < UTILE_L * 0.86)
    avertir.push(`${p.ref} : la planche n'occupe que ${Math.round(100 * largeur / UTILE_L)} % de la largeur utile — son viewBox est trop haut pour la page`);

  const svg = svgTexte
    .replace(/<\?xml[^>]*\?>/, '')
    .replace(/\swidth="[\d.]+"/, '')
    .replace(/\sheight="[\d.]+"/, '')
    .trim();

  const titre = `${p.ref} — ${p.nom}`;
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>${titre.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<style>
body{margin:0;font-family:Georgia,'Times New Roman',serif;background:#FFFFFF}
</style>
</helmet>
<div style="width: ${PAGE_L}px; height: ${PAGE_H}px; box-sizing: border-box; background: #FFFFFF; position: relative">
<div style="position: absolute; left: ${MARGE_X}px; top: ${MARGE_Y}px; width: ${UTILE_L}px; height: ${UTILE_H}px; border: 0.5px dashed #C8C8C8"></div>
<div style="position: absolute; left: ${gauche}px; top: ${haut}px; width: ${largeur}px; height: ${hauteur}px">
${svg.replace('<svg ', `<svg width="${largeur}" height="${hauteur}" `)}
</div>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":${PAGE_L},"height":${PAGE_H}}}'>
class Component extends DCLogic {
  renderVals() { return {}; }
}
</script>
</body>
</html>
`;
}

// --- mise en page ----------------------------------------------------------
const COL = MANIF.colonnes || 3;
const boards = {}, order = [], notes = {}, pages = [];
const fichiers = {};
let y = 0, iNote = 0;

for (const g of MANIF.groupes || []) {
  if (g.page) pages.push({ id: g.id, name: g.titre });

  // le titre du groupe se pose au-dessus de sa première rangée
  const largeurRangee = COL * PAGE_L + (COL - 1) * GOUTTIERE;
  notes['t_' + g.id] = {
    x: 0, y: y - TITRE_AU_DESSUS, text: g.titre,
    kind: 'title1', maxW: largeurRangee,
    ...(g.page ? { page: g.id } : {}),
  };

  // les rangées : on remplit une rangée complète AVANT de connaître sa hauteur
  const lot = g.planches || [];
  for (let i = 0; i < lot.length; i += COL) {
    const rangee = lot.slice(i, i + COL);
    rangee.forEach((p, j) => {
      const chemin = path.resolve(process.cwd(), p.svg);
      if (!fs.existsSync(chemin)) { echec.push(`${p.ref} : ${p.svg} introuvable`); return; }
      const html = artboard(p, fs.readFileSync(chemin, 'utf8'));
      if (!html) return;
      const nom = 'P' + p.ref.replace(/[^A-Za-z0-9]/g, '_') + '.dc.html';
      const x = j * (PAGE_L + GOUTTIERE);
      boards[nom] = {
        x, y, w: PAGE_L, h: PAGE_H,
        title: `${p.ref} — ${p.nom}`,
        ...(g.page ? { page: g.id } : {}),
      };
      order.push(nom);
      fichiers['project/' + nom] = html;
      if (p.note) {
        notes['n' + (iNote++)] = {
          x, y: y + PAGE_H + SOUS_CADRE, text: p.note,
          w: PAGE_L, maxH: NOTE_H, size: 's',
          ...(g.page ? { page: g.id } : {}),
        };
      }
    });
    // la hauteur de rangée est connue seulement maintenant : tous les cadres font PAGE_H
    y += PAGE_H + SOUS_CADRE + NOTE_H + INTERLIGNE;
  }
  y += ESPACE_GROUPE;
}

// --- contrôles avant d'écrire ---------------------------------------------
const cadres = Object.entries(boards);
for (let a = 0; a < cadres.length; a++) {
  for (let b = a + 1; b < cadres.length; b++) {
    const [na, A] = cadres[a], [nb, B] = cadres[b];
    if ((A.page || null) !== (B.page || null)) continue;
    if (A.x < B.x + B.w && B.x < A.x + A.w && A.y < B.y + B.h && B.y < A.y + A.h)
      echec.push(`chevauchement : ${na} et ${nb}`);
  }
}
for (const [ni, n] of Object.entries(notes)) {
  if (n.kind === 'title1') continue;
  const bas = n.y + (n.maxH || Math.round(4 * (n.w || 300) / 3));
  for (const [nb, B] of cadres) {
    if ((n.page || null) !== (B.page || null)) continue;
    if (n.x < B.x + B.w && B.x < n.x + (n.w || 300) && n.y < B.y + B.h && B.y < bas)
      echec.push(`la note ${ni} déborde sur ${nb}`);
  }
}

if (echec.length) {
  console.error('\nRien n\'a été écrit :');
  echec.forEach(e => console.error('  ' + e));
  process.exit(1);
}

// --- écriture --------------------------------------------------------------
const dossier = path.resolve(SORTIE, 'project');
fs.mkdirSync(dossier, { recursive: true });
for (const [chemin, contenu] of Object.entries(fichiers))
  fs.writeFileSync(path.resolve(SORTIE, chemin), contenu, 'utf8');

const ancien = fs.existsSync(path.join(dossier, 'canvas.json'))
  ? JSON.parse(fs.readFileSync(path.join(dossier, 'canvas.json'), 'utf8')) : null;

const index = {
  v: 3,
  createdOnFiles: ancien?.createdOnFiles || { v: 1, at: MANIF.date || '2026-09-23T12:00:00Z' },
  title: MANIF.titre,
  launch: { view: 'canvas' },
  pages,
  boards,
  order,
  notes,
  designSystems: ancien?.designSystems || [],
};
fs.writeFileSync(path.join(dossier, 'canvas.json'), JSON.stringify(index, null, 1), 'utf8');

if (avertir.length) {
  console.log('\navertissements :');
  avertir.forEach(a => console.log('  ' + a));
}
console.log(`\n${order.length} artboards, ${Object.keys(notes).length} notes, ${pages.length} page(s)`);
console.log(`écrit dans ${path.resolve(SORTIE)}/project/`);
console.log('\nà publier en un seul appel :');
console.log(`  root      ${path.resolve(SORTIE)}`);
console.log(`  file_path ${path.join(dossier, 'canvas.json')}`);
console.log(`  files     ${order.map(n => 'project/' + n).join(', ')}`);
