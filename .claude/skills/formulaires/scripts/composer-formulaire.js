#!/usr/bin/env node
// Compose un formulaire du Manuel du Nord en PDF 8 × 10 po, typographié en Georgia.
//
//   node composer-formulaire.js images/formulaires/01-01.json
//
// Sort, à côté de la description : NN-NN.html, NN-NN.pdf, et NN-NN.png (aperçu à regarder).
//
// La description est un JSON :
// {
//   "ref": "01-01",
//   "chapitre": "Chapitre 1 — Les quatre horloges",
//   "titre": "Fiche de relevé des quatre horloges",
//   "consigne": "Scotchée à la porte du congélateur. Une ligne par heure.",
//   "blocs": [
//     { "type": "champs", "titre": "…", "colonnes": 2,
//       "champs": [ { "label": "Heure où le courant est tombé" },
//                   { "label": "Têtes", "forme": "x-sur-y" },
//                   { "label": "Eau mise de côté", "unite": "L", "court": true },
//                   { "label": "Gel fait", "forme": "choix", "choix": ["oui", "non"] } ] },
//     { "type": "cases", "titre": "…",
//       "cases": [ { "titre": "Frigo", "sous": "trier à + 6 h" }, … ] },
//     { "type": "tableau", "titre": "…", "lignes": 12,
//       "colonnes": [ { "titre": "Heure", "sous": "vraie", "largeur": 1 }, … ] },
//     { "type": "notes", "titre": "Notes", "lignes": 4 },
//     { "type": "etiquettes", "par_page": 6, "etiquettes": [ { "titre": "À CUIRE", "champs": ["Espèce", "Date"] } ] }
//   ],
//   "rappel": "Une ligne de sécurité, s'il y en a une qui s'applique à ce qu'on fait en remplissant."
// }
//
// Principes : aucun renvoi numéroté, aucun dessin, aucun encadré décoratif. Un formulaire
// s'explique par ses en-têtes. Des filets fins, une hauteur de ligne faite pour la main.

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');
const { pathToFileURL } = require('url');

const src = process.argv[2];
if (!src) { console.error('usage : composer-formulaire.js <description.json>'); process.exit(2); }
const F = JSON.parse(fs.readFileSync(src, 'utf8'));
const dossier = path.dirname(path.resolve(src));
const base = path.join(dossier, F.ref);

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------------------------------------------------------------------------
// La feuille de style : une seule pour tous les formulaires du livre.
// La page fait 8 × 10 po, la zone utile 7 × 8,5 po — celle des planches.
// La hauteur d'une ligne à remplir est de 7,6 mm : c'est ce qu'il faut à une écriture
// normale au crayon sans qu'elle mange la ligne du dessus.
const CSS = () => `
@page { size: 8in 10in; margin: 0.75in 0.5in 0.75in 0.5in;
  @bottom-left  { content: "Le Manuel du Nord"; font-family: Georgia, serif; font-size: 7.5pt; color: #555; vertical-align: top; padding-top: 0.18in; }
  @bottom-right { content: "Fiche ${esc(F.ref)}"; font-family: Georgia, serif; font-size: 7.5pt; color: #555; vertical-align: top; padding-top: 0.18in; }
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { font-family: Georgia, 'Times New Roman', serif; color: #1A1A1A; font-size: 9.5pt; line-height: 1.3; }

.entete { border-bottom: 1.2pt solid #1A1A1A; padding-bottom: 7pt; margin-bottom: 12pt; }
.surtitre { font-size: 7.5pt; letter-spacing: 0.08em; color: #555; margin-bottom: 3pt; }
.titre { font-size: 17pt; line-height: 1.15; margin: 0; font-weight: normal; }
.consigne { font-size: 9pt; font-style: italic; color: #444; margin-top: 4pt; }

.bloc { margin-bottom: 13pt; break-inside: avoid; }
.bloc-titre { font-size: 9.5pt; font-weight: bold; margin: 0 0 5pt 0; }
.bloc-sous { font-weight: normal; font-style: italic; color: #555; font-size: 8.5pt; }

/* champs : étiquette à gauche, ligne à remplir qui prend le reste */
.champ { display: flex; align-items: flex-end; min-height: 22pt; }
.champ .lab { white-space: nowrap; padding-right: 6pt; padding-bottom: 2pt; }
.champ .val { flex: 1; align-self: stretch; display: flex; align-items: flex-end; }
.champ .ligne { flex: 1; border-bottom: 0.6pt solid #1A1A1A; min-width: 30pt; height: 16pt; }
/* Dans un bloc de champs, les colonnes ont toutes la même largeur, et chacune est une grille
   étiquette | ligne : les étiquettes d'une colonne prennent la largeur de la plus longue, et
   toutes ses lignes partent et finissent au même x. Pas d'escalier. */
.champs { display: grid; column-gap: 18pt; }
.champs .col { display: grid; grid-template-columns: max-content minmax(0, 1fr); row-gap: 3pt; align-content: start; }
.champs .champ { display: contents; }
.champs .lab { align-self: end; }
.champs .val { min-height: 22pt; }
.champ .court { flex: 0 0 46pt; }
.champ .unite { padding-left: 4pt; padding-bottom: 2pt; }
.champ .sur { padding: 0 5pt 2pt 5pt; }

/* cases : une rangée de cellules titrées, une case vide dessous pour écrire */
table { border-collapse: collapse; width: 100%; table-layout: fixed; }
.cases td, .cases th { border: 0.5pt solid #1A1A1A; text-align: center; vertical-align: top; }
.cases th { font-weight: bold; font-size: 8.5pt; padding: 4pt 3pt 3pt 3pt; border-bottom-width: 0.5pt; }
.cases th .sous { display: block; font-weight: normal; font-size: 7.5pt; color: #555; margin-top: 1pt; }
.cases td { height: 0.36in; }
.cases { border: 1pt solid #1A1A1A; }

/* tableau de relevé */
.releve { border: 1pt solid #1A1A1A; }
.releve th { font-weight: bold; font-size: 8pt; line-height: 1.2; text-align: center; vertical-align: middle;
             padding: 4pt 3pt 4pt 3pt; border-left: 0.5pt solid #1A1A1A; border-bottom: 1pt solid #1A1A1A; }
.releve th:first-child { border-left: none; }
.releve th .sous { display: block; font-weight: normal; font-size: 7pt; color: #555; margin-top: 1pt; }
.releve td { height: 0.3in; border-left: 0.5pt solid #1A1A1A; border-top: 0.4pt solid #8A8A8A; }
.releve td:first-child { border-left: none; }
.releve tr:nth-child(5n) td { border-bottom: 0.7pt solid #1A1A1A; }

/* notes : des lignes réglées */
.notes .l { border-bottom: 0.5pt solid #8A8A8A; height: 0.3in; }

/* choix à entourer au crayon : « fait · non » */
.choix { display: inline-flex; align-items: baseline; padding-bottom: 2pt; white-space: nowrap; }
.choix .opt { padding: 0 7pt; }
.choix .opt:first-child { padding-left: 0; }
.choix .sep { color: #8A8A8A; }

/* étiquettes à découper. Chaque ligne de coupe est tracée une seule fois : le haut et la
   gauche par le bloc, la droite et le bas par chaque étiquette, à la même épaisseur partout.
   Trait plein fin, jamais de pointillé : les tirets de deux boîtes voisines ne tombent pas
   en phase aux croisements, et deux bordures collées font une échelle au lieu d'une ligne. */
.etiquettes { display: grid; grid-template-columns: 1fr 1fr; gap: 0;
              border-top: 0.5pt solid #8A8A8A; border-left: 0.5pt solid #8A8A8A; }
.etiq { border-right: 0.5pt solid #8A8A8A; border-bottom: 0.5pt solid #8A8A8A; padding: 6pt 10pt 7pt 10pt; }
.etiq .et { display: flex; align-items: last baseline; font-size: 13pt; line-height: 1.2; letter-spacing: 0.06em;
            border-bottom: 1pt solid #1A1A1A; padding-bottom: 3pt; margin-bottom: 2pt; }
.etiq .et .sous { font-size: 8pt; line-height: 1.2; letter-spacing: 0; color: #555; font-style: italic; margin-left: 7pt; }
/* libellés en colonne : tous les traits partent du même point, courts compris */
.etiq .grille { display: grid; grid-template-columns: max-content 1fr; column-gap: 6pt; grid-auto-rows: 22pt; align-items: end; }
.etiq .grille .lab { white-space: nowrap; padding-bottom: 2pt; }
.etiq .grille .val { display: flex; align-items: flex-end; min-width: 0; }
.etiq .grille .ligne { flex: 1; border-bottom: 0.6pt solid #1A1A1A; height: 16pt; }
.etiq .grille .court { flex: 0 0 36pt; }
.etiq .grille .unite { padding-left: 4pt; padding-bottom: 2pt; white-space: nowrap; }

.pied { position: fixed; bottom: -0.45in; left: 0; right: 0; display: flex; justify-content: space-between;
        font-size: 7.5pt; color: #555; border-top: 0.5pt solid #BBB; padding-top: 3pt; }
.rappel { font-size: 8.5pt; color: #9B2C1E; margin-top: 2pt; margin-bottom: 0; }
`;

// La partie à remplir d'un champ : un trait, un trait court suivi de son unité, ou un
// choix à entourer (forme « choix », options dans c.choix, oui · non par défaut).
function aRemplir(c) {
  if (c.forme === 'choix')
    return `<span class="choix">${(c.choix || ['oui', 'non']).map(x => `<span class="opt">${esc(x)}</span>`).join('<span class="sep">·</span>')}</span>`;
  return `<span class="ligne${c.court ? ' court' : ''}"></span>${c.unite ? `<span class="unite">${esc(c.unite)}</span>` : ''}`;
}

function champ(c) {
  const lab = `<span class="lab">${esc(c.label)} :</span>`;
  if (c.forme === 'x-sur-y')
    return `<div class="champ">${lab}<span class="val"><span class="ligne court"></span><span class="sur">sur</span><span class="ligne court"></span></span></div>`;
  return `<div class="champ">${lab}<span class="val">${aRemplir(c)}</span></div>`;
}

// Les champs se lisent en rangées (1 2 / 3 4) mais se rangent en colonnes : la colonne k
// reçoit les champs k, k + n, k + 2n… Les rangées restent alignées parce que toutes les
// lignes ont la même hauteur.
function grille(champs, n) {
  const cols = Array.from({ length: n }, (_, k) => champs.filter((_, i) => i % n === k));
  return `<div class="champs" style="grid-template-columns: repeat(${n}, minmax(0, 1fr))">${cols.map(col => `<div class="col">${col.map(champ).join('')}</div>`).join('')}</div>`;
}

function titreBloc(b) {
  if (!b.titre) return '';
  return `<p class="bloc-titre">${esc(b.titre)}${b.sous ? ` <span class="bloc-sous">— ${esc(b.sous)}</span>` : ''}</p>`;
}

function bloc(b) {
  switch (b.type) {
    case 'champs': {
      const n = b.colonnes || 1;
      return `<div class="bloc">${titreBloc(b)}${grille(b.champs, n)}</div>`;
    }
    case 'cases': {
      const th = b.cases.map(c => `<th>${esc(c.titre)}${c.sous ? `<span class="sous">${esc(c.sous)}</span>` : ''}</th>`).join('');
      const td = b.cases.map(() => '<td></td>').join('');
      return `<div class="bloc">${titreBloc(b)}<table class="cases"><tr>${th}</tr><tr>${td}</tr></table></div>`;
    }
    case 'tableau': {
      const tot = b.colonnes.reduce((s, c) => s + (c.largeur || 1), 0);
      const col = b.colonnes.map(c => `<col style="width:${(100 * (c.largeur || 1) / tot).toFixed(2)}%">`).join('');
      const th = b.colonnes.map(c => `<th>${esc(c.titre)}${c.sous ? `<span class="sous">${esc(c.sous)}</span>` : ''}</th>`).join('');
      const ligne = `<tr>${b.colonnes.map(() => '<td></td>').join('')}</tr>`;
      return `<div class="bloc">${titreBloc(b)}<table class="releve"><colgroup>${col}</colgroup><thead><tr>${th}</tr></thead><tbody>${ligne.repeat(b.lignes || 10)}</tbody></table></div>`;
    }
    case 'notes':
      return `<div class="bloc notes">${titreBloc(b)}${'<div class="l"></div>'.repeat(b.lignes || 4)}</div>`;
    case 'etiquettes': {
      const par = b.par_page || 6;
      const cartes = [];
      for (let i = 0; i < par; i++) {
        const e = b.etiquettes[i % b.etiquettes.length];
        // Le sous-titre peut porter un saut de ligne (\n) : il se place à côté du titre,
        // sur deux lignes au plus, calé sur la même ligne de base que le titre.
        const sous = e.sous ? `<span class="sous">${esc(e.sous).replace(/\n/g, '<br>')}</span>` : '';
        const grille = (e.champs || []).map(c => typeof c === 'string' ? { label: c } : c)
          .map(c => `<span class="lab">${esc(c.label)} :</span><span class="val">${aRemplir(c)}</span>`).join('');
        cartes.push(`<div class="etiq"><div class="et"><span>${esc(e.titre)}</span>${sous}</div><div class="grille">${grille}</div></div>`);
      }
      return `<div class="bloc">${titreBloc(b)}<div class="etiquettes">${cartes.join('')}</div></div>`;
    }
    default:
      throw new Error(`bloc inconnu : ${b.type}`);
  }
}

const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>${esc(F.ref)} — ${esc(F.titre)}</title>
<style>${CSS()}</style></head><body>
<div class="entete">
  <div class="surtitre">${esc(F.chapitre || '')}</div>
  <h1 class="titre">${esc(F.titre)}</h1>
  ${F.consigne ? `<div class="consigne">${esc(F.consigne)}</div>` : ''}
</div>
${(F.blocs || []).map(bloc).join('\n')}
${F.rappel ? `<p class="rappel">${esc(F.rappel)}</p>` : ''}
</body></html>`;

fs.writeFileSync(base + '.html', html, 'utf8');

// ---------------------------------------------------------------------------
// Impression par Edge : PDF au format exact de la page, et aperçu PNG pour le regarder.
const EDGE = ['C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
              'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'].find(p => fs.existsSync(p));
if (!EDGE) { console.error('Edge introuvable : le HTML est écrit, pas le PDF'); process.exit(3); }

const dormir = ms => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
function edge(args, sortie) {
  const profil = fs.mkdtempSync(path.join(os.tmpdir(), 'form-edge-'));
  if (fs.existsSync(sortie)) fs.unlinkSync(sortie);
  try {
    execFileSync(EDGE, ['--headless=new', '--disable-gpu', '--no-first-run', '--hide-scrollbars',
      '--no-default-browser-check', `--user-data-dir=${profil}`, ...args, pathToFileURL(base + '.html').href],
      { stdio: 'ignore', timeout: 90000 });
  } catch (e) { /* le lanceur peut sortir avant le navigateur */ }
  let ok = false;
  for (let t = 0; t < 60 && !ok; t++) {
    if (fs.existsSync(sortie) && fs.statSync(sortie).size > 0) {
      const a = fs.statSync(sortie).size; dormir(300); ok = fs.statSync(sortie).size === a;
    } else dormir(500);
  }
  try { fs.rmSync(profil, { recursive: true, force: true }); } catch (e) {}
  return ok;
}

const pdfOk = edge(['--no-pdf-header-footer', `--print-to-pdf=${base}.pdf`], base + '.pdf');
// L'aperçu : la page à 96 ppp, soit 768 × 960, rendue à 2x. Les marges @page ne
// s'appliquent pas à l'écran : on les simule par un padding pour que l'aperçu
// corresponde à l'impression.
const apercu = base + '.apercu.html';
fs.writeFileSync(apercu, html.replace('</style>',
  'html{background:#fff} body{width:8in;height:10in;padding:0.75in 0.5in;position:relative;overflow:hidden}' +
  '.pied-apercu{position:absolute;left:0.5in;right:0.5in;bottom:0.35in;display:flex;justify-content:space-between;font-size:7.5pt;color:#555}</style>')
  .replace('</body>', `<div class="pied-apercu"><span>Le Manuel du Nord</span><span>Fiche ${esc(F.ref)}</span></div></body>`), 'utf8');
const pngOk = (() => {
  const b = base; const orig = base + '.html';
  // on imprime l'aperçu, pas le fichier d'impression
  fs.copyFileSync(apercu, orig + '.tmp');
  fs.copyFileSync(apercu, orig);
  const r = edge(['--force-device-scale-factor=2', '--window-size=768,960', `--screenshot=${b}.png`], b + '.png');
  fs.writeFileSync(orig, html, 'utf8');
  fs.unlinkSync(orig + '.tmp');
  return r;
})();
fs.unlinkSync(apercu);

const nbPages = pdfOk ? (fs.readFileSync(base + '.pdf', 'latin1').match(/\/Type\s*\/Page(?!s)/g) || []).length : 0;
console.log(pdfOk ? `${base}.pdf  (${nbPages} page${nbPages > 1 ? 's' : ''})` : 'PDF : échec');
if (nbPages > 1) console.error(`ATTENTION : ${nbPages} pages. Un formulaire de relevé tient sur une feuille — retire des lignes ou resserre.`);
console.log(pngOk ? `${base}.png` : 'aperçu : échec');
console.error("Ouvre le PNG avec l'outil de lecture d'images et regarde le formulaire avant de le livrer.");
