#!/usr/bin/env node
// Rend un chapitre Markdown en page de lecture dans le design retenu (direction 1, couleurs nordiques),
// puis en PDF 8 × 10 po avec Edge sans fenêtre. Ce n'est pas la mise en pages finale du livre :
// c'est une épreuve de lecture, pour que JP lise le chapitre dans les caractères et la grille du livre.
//
//   node design/outils/rendre-chapitre.js chapitres/88-le-pain.md [dossier-sortie]
//
// Sortie : <dossier>/<nom>.html et <nom>.pdf (par défaut design/epreuves/).
const fs = require('fs'), path = require('path'), os = require('os');
const { spawn } = require('child_process');

const src = process.argv[2];
const outDir = path.resolve(process.argv[3] || path.join(__dirname, '..', 'epreuves'));
if (!src) { console.error('usage : rendre-chapitre.js chapitre.md [dossier]'); process.exit(1); }
fs.mkdirSync(outDir, { recursive: true });
const md = fs.readFileSync(src, 'utf8').replace(/\r\n/g, '\n');
const nom = path.basename(src, '.md');
const num = nom.split('-')[0];
// Le tome se lit dans la table de renumérotation (six tomes, 24 septembre 2026), jamais dans le numéro.
const RENUM = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'plan', 'renumerotation.json'), 'utf8'));
const tome = RENUM.tomeDuNouveau[num];
if (!tome) { console.error(`chapitre ${num} absent de plan/renumerotation.json (tomeDuNouveau)`); process.exit(1); }
// Nom et couleur de couverture de chaque tome (design/choix.md) ; 5 : écorce ; 6 : fonte (JP, 28 septembre 2026,
// à la place de la rouille #7A4424).
const TOMES = { 1: ['Tenir', '#15222B'], 2: ['Le corps', '#5C1A15'], 3: ['Prélever', '#1D392E'],
  4: ['De la bête au garde-manger', '#25414F'], 5: ['La forêt, le jardin et le chalet', '#4B3A28'], 6: ["L'atelier", '#363432'] };

// Caractères de secours, repris du gabarit du livre (28 septembre 2026) : le lien Google « text= » qui recharge
// ≥ ≤ ≈ → ₂ … d'IBM Plex, et les familles « Secours Serif » / « Secours Sans » (ᵉ ʳ ⁺, Ω α μ, ∅, ⚠) incorporées
// par design/outils/polices-secours.py. Rien ne tombe dans Georgia ou Times.
const TPL = fs.readFileSync(path.join(__dirname, '..', 'directions', '1-manuel-de-terrain', 'outils', 'interieur.tpl.html'), 'utf8');
const SECOURS = (TPL.match(/<link href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]*text=[^"]*" rel="stylesheet">/) || [''])[0]
  + '<style>' + ((TPL.match(/\/\* polices-secours:debut[\s\S]*?polices-secours:fin \*\//) || [''])[0]) + '</style>';
const SANS = "'IBM Plex Sans Condensed', 'Secours Sans', sans-serif";
const SERIF = "'IBM Plex Serif', 'Secours Serif', Georgia, serif";
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// notes de bas de page : on les numérote dans l'ordre d'appel
const defs = {}; const ordre = [];
const corps = md.split('\n').filter(l => {
  const m = l.match(/^\[\^([^\]]+)\]:\s*(.*)$/);
  if (m) { defs[m[1]] = m[2]; return false; }
  return true;
});
function inline(s) {
  s = esc(s);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  s = s.replace(/(^|[^*\w])\*([^*\n]+)\*(?!\w)/g, '$1<i>$2</i>');
  s = s.replace(/\[\^([^\]]+)\]/g, (_, id) => {
    if (!ordre.includes(id)) ordre.push(id);
    return `<sup class="appel">${ordre.indexOf(id) + 1}</sup>`;
  });
  s = s.replace(/\[À VÉRIFIER([^\]]*)\]/g, '<span class="av">[À VÉRIFIER$1]</span>');
  return s;
}

// blocs
const out = []; let i = 0; let titre = '';
const L = corps;
while (i < L.length) {
  const l = L[i];
  if (!l.trim()) { i++; continue; }
  let m;
  if ((m = l.match(/^# (.*)/))) { titre = m[1]; i++; continue; }
  if (/^\*Tome \d/.test(l.trim())) { i++; continue; }   // le tome est déjà dans l'ouverture
  if ((m = l.match(/^## (\d+)\.?\s*(.*)/))) {
    const n = m[1];
    out.push(`<h2 class="sec${n === '9' ? ' urg' : ''}${n === '8' ? ' dang' : ''}"><span class="n">${n}</span><span class="t">${inline(m[2])}</span></h2>`);
    i++; continue;
  }
  if ((m = l.match(/^## (.*)/))) { out.push(`<h2 class="sec"><span class="t">${inline(m[1])}</span></h2>`); i++; continue; }
  if ((m = l.match(/^#{3,4} (.*)/))) { out.push(`<h3>${inline(m[1])}</h3>`); i++; continue; }
  if (/^---+\s*$/.test(l)) { out.push('<hr>'); i++; continue; }
  if (l.startsWith('|')) {
    const rows = [];
    while (i < L.length && L[i].startsWith('|')) { rows.push(L[i]); i++; }
    const cells = r => r.replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map(c => c.trim());
    const head = cells(rows[0]); const body = rows.slice(2).map(cells);
    out.push(`<table><thead><tr>${head.map(c => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${body.map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
    continue;
  }
  if (l.startsWith('>')) {
    const q = [];
    while (i < L.length && L[i].startsWith('>')) { q.push(L[i].replace(/^>\s?/, '')); i++; }
    out.push(`<blockquote>${q.map(x => x.trim() ? `<p>${inline(x)}</p>` : '').join('')}</blockquote>`);
    continue;
  }
  if (/^\s*([-*]|\d+\.)\s+/.test(l)) {
    const ol = /^\s*\d+\./.test(l);
    const items = [];
    // une ligne non vide qui n'ouvre ni un titre, ni un tableau, ni une citation continue l'élément (continuation paresseuse)
    while (i < L.length && L[i].trim() && (/^\s*([-*]|\d+\.)\s+/.test(L[i]) || (items.length && !/^(#|\||>|---)/.test(L[i])))) {
      const mm = L[i].match(/^\s*(?:[-*]|(\d+)\.)\s+(.*)/);
      if (mm) items.push({ n: mm[1], t: mm[2] }); else items[items.length - 1].t += ' ' + L[i].trim();
      i++;
    }
    out.push(ol ? `<ol>${items.map(it => `<li value="${it.n}">${inline(it.t)}</li>`).join('')}</ol>` : `<ul>${items.map(it => `<li>${inline(it.t)}</li>`).join('')}</ul>`);
    continue;
  }
  const p = [];
  while (i < L.length && L[i].trim() && !/^(#|\||>|---|\s*([-*]|\d+\.)\s+)/.test(L[i])) { p.push(L[i].trim()); i++; }
  if (p.length) { const t = p.join(' '); out.push(`<p${/:\s*(\*\*|\*)?\s*$/.test(t) ? ' class="amorce"' : ''}>${inline(t)}</p>`); } else i++;
}
const notes = ordre.length ? `<section class="notes"><h3>Notes</h3><ol>${ordre.map(id => `<li>${inline(defs[id] || '')}</li>`).join('')}</ol></section>` : '';
const [nomTome, coul] = TOMES[tome];
const tt = titre.replace(/^(Chapitre\s+)?[\dA-Za-z]+\s*[—–.-]\s*/, '') || nom;

const html0 = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${esc(num)} — ${esc(tt)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:wght@400;500;600;700&family=IBM+Plex+Serif:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<!-- caractères de secours : les mêmes que le livre (interieur.tpl.html, 28 septembre 2026) -->
${SECOURS}
<style>
@page { size: 8in 10in; margin: 0.75in 0.5in 0.75in 0.5in;
  @top-left { content: "TOME ${tome} · ${nomTome.toUpperCase()}"; font: 600 7.5pt 'IBM Plex Sans Condensed'; letter-spacing: .09em; color: #4D4D4D; }
  @top-right { content: "${esc(num)} · ${esc(tt.toUpperCase()).slice(0, 60)}"; font: 700 7.5pt 'IBM Plex Sans Condensed'; letter-spacing: .09em; }
  @bottom-right { content: counter(page); font: 700 9pt 'IBM Plex Sans Condensed'; } }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font: 9.5pt/13pt 'IBM Plex Serif', Georgia, serif; color: #000; background: #fff; hyphens: auto; }
.ouverture { border-top: 3pt solid #000; padding-top: 8pt; margin-bottom: 14pt; }
.ouverture .tome { font: 700 8pt 'IBM Plex Sans Condensed'; letter-spacing: .12em; color: ${coul}; }
.ouverture h1 { font: 700 30pt/0.95 'IBM Plex Sans Condensed'; text-transform: uppercase; margin: 6pt 0 0; display: flex; gap: 12pt; align-items: flex-end; }
.ouverture h1 .num { font-size: 64pt; line-height: .8; text-transform: none; }
.texte { column-count: 2; column-gap: 0.22in; column-rule: 0.5pt solid #999; }
h2.sec { column-span: all; display: flex; align-items: center; gap: 8pt; font: 700 13pt 'IBM Plex Sans Condensed'; text-transform: uppercase; letter-spacing: .04em; border-top: 2.5pt solid #000; padding-top: 6pt; margin: 16pt 0 8pt; break-after: avoid; }
h2.sec .n { background: #000; color: #fff; width: 19pt; height: 19pt; display: inline-flex; align-items: center; justify-content: center; font-size: 14pt; }
h2.sec.dang .n { background: #9B2C1E; } h2.sec.dang { color: #9B2C1E; border-color: #9B2C1E; }
h2.sec.urg { background: #000; color: #fff; padding: 5pt 8pt; border: 0; } h2.sec.urg .n { background: #fff; color: #000; }
h3 { font: 700 10pt/12pt 'IBM Plex Sans Condensed'; text-transform: uppercase; letter-spacing: .05em; margin: 10pt 0 4pt; break-after: avoid; border-top: .75pt solid #000; padding-top: 3pt; }
p { margin: 0 0 5pt; text-align: justify; }
p.amorce { break-after: avoid; }
ul, ol { margin: 0 0 6pt; padding-left: 14pt; } li { margin-bottom: 3pt; text-align: justify; }
ol li::marker { font: 700 9pt 'IBM Plex Sans Condensed'; }
table { column-span: all; width: 100%; border-collapse: collapse; font-size: 8pt; line-height: 10pt; margin: 6pt 0 10pt; break-inside: auto; }
th { font: 700 7.6pt 'IBM Plex Sans Condensed'; text-transform: uppercase; letter-spacing: .06em; text-align: left; border-bottom: 1.5pt solid #000; padding: 3pt 4pt; }
td { border-bottom: .5pt solid #999; padding: 3pt 4pt; vertical-align: top; }
tr { break-inside: avoid; }
blockquote { margin: 6pt 0; padding: 6pt 8pt; border: 1.5pt solid #9B2C1E; color: #000; break-inside: avoid; }
code { font-family: 'IBM Plex Sans Condensed'; font-size: 8.5pt; }
sup.appel { font: 700 7pt 'IBM Plex Sans Condensed'; color: #4D4D4D; }
.av { font: 600 7.5pt 'IBM Plex Sans Condensed'; color: #9B2C1E; letter-spacing: .03em; }
.notes { column-span: all; border-top: .9pt solid #000; margin-top: 14pt; padding-top: 4pt; font-size: 7.8pt; line-height: 10pt; }
.notes h3 { border: 0; margin-top: 0; } .notes ol { column-count: 2; column-gap: .22in; }
hr { border: 0; border-top: .75pt solid #999; margin: 8pt 0; }
.epreuve { position: fixed; bottom: -0.5in; left: 0; font: 600 6.5pt 'IBM Plex Sans Condensed'; letter-spacing: .1em; color: #999; }
</style></head><body>
<div class="ouverture"><div class="tome">TOME ${tome} · ${nomTome.toUpperCase()}</div><h1><span class="num">${esc(num)}</span><span>${inline(tt)}</span></h1></div>
<div class="texte">${out.join('\n')}${notes}</div>
<div class="epreuve">ÉPREUVE DE LECTURE — PAS LA MISE EN PAGES FINALE</div>
</body></html>`;
// les piles de polices partout où le CSS nomme Plex seul
const html = html0.replace(/'IBM Plex Serif', Georgia, serif/g, SERIF).replace(/'IBM Plex Sans Condensed'(?!,)/g, SANS);
const htmlPath = path.join(outDir, nom + '.html');
fs.writeFileSync(htmlPath, html);

const pdf = path.join(outDir, nom + '.pdf');
if (fs.existsSync(pdf)) fs.unlinkSync(pdf);
const edge = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'chap-'));
spawn(edge, ['--headless=new', '--disable-gpu', '--no-first-run', `--user-data-dir=${prof}`, '--virtual-time-budget=20000',
  '--no-pdf-header-footer', `--print-to-pdf=${pdf}`, 'file:///' + htmlPath.replace(/\\/g, '/').replace(/ /g, '%20')], { stdio: 'ignore' });
const dort = ms => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
let avant = -1;
for (let k = 0; k < 120; k++) { dort(500); if (fs.existsSync(pdf)) { const t = fs.statSync(pdf).size; if (t > 0 && t === avant) break; avant = t; } }
try { fs.rmSync(prof, { recursive: true, force: true }); } catch (e) {}
console.log(fs.existsSync(pdf) ? pdf : 'ÉCHEC ' + pdf);
