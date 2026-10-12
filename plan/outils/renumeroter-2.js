#!/usr/bin/env node
// Deuxième renumérotation (27 septembre 2026) : quatre chapitres d'agriculture entrent au tome 5
// après le jardin (96 à 99) ; semences et élevage passent à 100 et 101, le tome 6 à 102-112.
// Même mécanique que renumeroter.js, mais la table vient de plan/renumerotation-2.json
// (actuel → nouveau) et les numéros peuvent avoir trois chiffres.
//   node plan/outils/renumeroter.js --essai   → écrit seulement le rapport (rien ne bouge)
//   node plan/outils/renumeroter.js           → applique
// Ce que ça touche : le texte des chapitres (titre, ligne de tome, « ch. N », « chapitre(s) N, N et N »,
// « ch. N à M », « planche NN-XX », renvois nus à suffixe comme « le 43b »), les noms des fichiers de
// chapitres, les fiches suivi/NN-redaction.md et suivi/verifications/NN-verifications.md (renommées,
// avec une note en tête : leur contenu garde les anciens numéros), les planches (SVG, PNG validés,
// descriptions planches-src, titre « Planche NN-XX » dedans), et les documents de plan qui décrivent
// l'état actuel. Ne touche pas : sources/ (provenance), images/photos/ (noms d'origine, voir la table).
// Ce que le script ne sait pas trancher va dans plan/renumerotation-rapport.md, pour relecture.
const fs = require('fs'), path = require('path');
if (fs.existsSync('C:/Users/jeanp/New folder/plan/renumerotation-2.FAIT') && !process.argv.includes('--essai')) { console.error('DÉJÀ APPLIQUÉ le 27 septembre 2026.'); process.exit(1); }
const ROOT = 'C:/Users/jeanp/New folder';
const ESSAI = process.argv.includes('--essai');
const { ancienVersNouveau: MAP, tomeDuNouveau: TOME } = JSON.parse(fs.readFileSync(path.join(ROOT, 'plan/renumerotation-2.json'), 'utf8'));
const NOMS = { 1: 'Tenir', 2: 'Le corps', 3: 'Prélever', 4: 'De la bête au garde-manger', 5: 'La forêt, le jardin et le chalet', 6: "L'atelier" };
const cle = s => { const m = String(s).match(/^(\d{1,3})([a-d]?)$/); return m ? m[1].padStart(2, '0') + m[2] : null; };
const affiche = n => (n === '00' || n === '00b') ? n : String(parseInt(n, 10));   // « ch. 8 », pas « ch. 08 »
const ORDRE = Object.keys(MAP);                                                     // ordre ancien du livre
const ancienTri = k => { const m = k.match(/^(\d+)([a-d]?)$/); return parseInt(m[1], 10) + (m[2] ? (m[2].charCodeAt(0) - 96) / 10 : 0); };
const rapport = [];
const flag = (f, l, msg) => rapport.push(`- \`${f}\` l. ${l} : ${msg}`);

const UNITE = /^\s?(°|%|kg\b|g\b|cm\b|mm\b|m\b|km|L\b|mL\b|h\b|min\b|jours?\b|ans?\b|semaines?\b|mois\b|heures?\b|p\.|pages?\b|kcal|°C)/;
const NUM = /^(\d{1,3}[a-d]?)(?![\d])/;
const SEP = /^(\s*,\s*|\s+et\s+|\s+ou\s+|\s+à\s+|\s*[-–]\s*)/;

function mapper(tok, f, ligne) {
  const k = cle(tok);
  if (!k || !(k in MAP)) { flag(f, ligne, `numéro inconnu « ${tok} » gardé tel quel`); return tok; }
  return affiche(MAP[k]);
}

function listeApres(src, i, f, ligne) {
  // lit « N (sep N)* » à partir de src[i] ; renvoie [texte remplacé, longueur lue] ou null
  let rest = src.slice(i), lu = 0, out = '', toks = [], seps = [];
  let m = rest.match(NUM);
  if (!m || UNITE.test(rest.slice(m[1].length))) return null;
  toks.push(m[1]); lu += m[1].length; rest = rest.slice(m[1].length);
  for (;;) {
    const s = rest.match(SEP); if (!s) break;
    const apres = rest.slice(s[1].length); const n = apres.match(NUM);
    if (!n || UNITE.test(apres.slice(n[1].length)) || /^[A-Z]/.test(apres.slice(n[1].length))) break;
    if (/[-–]/.test(s[1]) && /^\s*[A-Z§]/.test(apres.slice(n[1].length))) break;
    seps.push(s[1]); toks.push(n[1]); lu += s[1].length + n[1].length; rest = apres.slice(n[1].length);
  }
  // plages « N à M » : on vérifie qu'elles restent contiguës
  for (let j = 0; j < toks.length; j++) {
    if (j > 0 && /à|[-–]/.test(seps[j - 1])) {
      const a = cle(toks[j - 1]), b = cle(toks[j]);
      if (a in MAP && b in MAP) {
        const dedans = ORDRE.filter(k => ancienTri(k) >= ancienTri(a) && ancienTri(k) <= ancienTri(b) && !/^(26b|27c|27d|30b|32b|32c)$/.test(k)).map(k => parseInt(MAP[k], 10)).sort((x, y) => x - y);
        const suite = dedans.every((v, q) => q === 0 || v === dedans[q - 1] + 1);
        const bornes = parseInt(MAP[a], 10) === dedans[0] && parseInt(MAP[b], 10) === dedans[dedans.length - 1];
        if (!suite || !bornes) flag(f, ligne, `plage « ${toks[j - 1]} à ${toks[j]} » coupée par la renumérotation (nouveaux : ${dedans.join(', ')}) — à réécrire à la main`);
      }
    }
  }
  out = mapper(toks[0], f, ligne);
  for (let j = 1; j < toks.length; j++) out += seps[j - 1] + mapper(toks[j], f, ligne);
  return [out, lu];
}

function transformer(txt, f, estChapitre, nouveauNum) {
  const lignes = txt.split('\n');
  return lignes.map((L, idx) => {
    const ligne = idx + 1;
    if (estChapitre && idx < 3 && /^# /.test(L)) {
      return L.replace(/^# (Chapitre\s+)?[\dA-Za-z]+(\s*[—–.-]\s*)/, (m0, c, s) => `# ${c || ''}${affiche(nouveauNum)}${s}`);
    }
    if (estChapitre && idx < 6 && /^\*Tome \d/.test(L.trim())) {
      const t = TOME[nouveauNum]; return L.replace(/\*Tome \d[^*]*\*/, `*Tome ${t} — ${NOMS[t]}*`);
    }
    let out = '', i = 0;
    const KW = /\b([Cc]h\.|[Cc]hap\.|[Cc]hapitres?|[Pp]lanches?)(\s+)/g;
    let m;
    while ((m = KW.exec(L))) {
      const debut = m.index + m[0].length;
      if (/^[Pp]lanche/.test(m[1])) {
        const p = L.slice(debut).match(/^(\d{2,3}[a-d]?)(-\d{2}[a-d]?)/);
        if (!p) continue;
        out += L.slice(i, debut) + mapper(p[1], f, ligne).padStart(2, '0') + p[2];
        i = debut + p[0].length; KW.lastIndex = i; continue;
      }
      const r = listeApres(L, debut, f, ligne);
      if (!r) continue;
      out += L.slice(i, debut) + r[0]; i = debut + r[1]; KW.lastIndex = i;
    }
    out += L.slice(i);
    // renvois nus à suffixe (« le 43b », « au 20c ») : sans ambiguïté
    // mentions de tome hors en-tête : à relire
    if (estChapitre && idx >= 6 && /\b[Tt]omes? [1-4]\b/.test(out)) flag(f, ligne, `mention de tome à relire : « ${out.trim().slice(0, 120)} »`);
    return out;
  }).join('\n');
}

// ---------- 1. chapitres ----------
const CH = path.join(ROOT, 'chapitres');
const renoms = [];
for (const f of fs.readdirSync(CH).filter(f => f.endsWith('.md'))) {
  const ancien = f.split('-')[0];
  if (!(ancien in MAP)) { flag(f, 0, 'chapitre absent de la table'); continue; }
  const nouveau = MAP[ancien];
  const src = fs.readFileSync(path.join(CH, f), 'utf8');
  const txt = transformer(src, f, true, nouveau);
  const nf = f.replace(/^[^-]+/, nouveau);
  renoms.push([f, nf, src !== txt]);
  if (!ESSAI) { fs.writeFileSync(path.join(CH, f), txt); if (nf !== f) fs.renameSync(path.join(CH, f), path.join(CH, nf + '.tmp')); }
}
if (!ESSAI) for (const [, nf] of renoms) if (fs.existsSync(path.join(CH, nf + '.tmp'))) fs.renameSync(path.join(CH, nf + '.tmp'), path.join(CH, nf));

// ---------- 2. fiches de suivi et de vérification ----------
const NOTE = a => `> **Renuméroté une deuxième fois le 27 septembre 2026** (agriculture au tome 5) : chapitre ${a} avant cette date. Table : plan/renumerotation-2.json.\n\n`;
for (const [dir, suf] of [['suivi', '-redaction.md'], ['suivi/verifications', '-verifications.md']]) {
  const D = path.join(ROOT, dir);
  const aRenommer = fs.readdirSync(D).filter(f => f.endsWith(suf) && f.split('-')[0] in MAP && MAP[f.split('-')[0]] !== f.split('-')[0]);
  for (const f of aRenommer) {
    const a = f.split('-')[0], nf = MAP[a] + suf;
    if (!ESSAI) { const t = fs.readFileSync(path.join(D, f), 'utf8'); fs.writeFileSync(path.join(D, f + '.tmp'), NOTE(a) + t); fs.unlinkSync(path.join(D, f)); }
    renoms.push([dir + '/' + f, dir + '/' + nf, true]);
  }
  if (!ESSAI) for (const f of fs.readdirSync(D).filter(f => f.endsWith(suf + '.tmp'))) {
    const a = f.split('-')[0]; fs.renameSync(path.join(D, f), path.join(D, MAP[a] + suf));
  }
}

// ---------- 3. planches ----------
const renPlanche = (dir, re) => {
  const D = path.join(ROOT, dir); if (!fs.existsSync(D)) return;
  const liste = fs.readdirSync(D).filter(f => re.test(f));
  for (const f of liste) {
    const m = f.match(re); const a = m[2]; if (!(a in MAP)) { flag(dir + '/' + f, 0, 'planche d’un chapitre inconnu'); continue; }
    const nf = f.replace(re, (m0, pre, x) => pre + MAP[a]);
    renoms.push([dir + '/' + f, dir + '/' + nf, false]);
    if (!ESSAI) {
      if (/\.(svg|js)$/.test(f)) {
        let t = fs.readFileSync(path.join(D, f), 'utf8');
        t = t.replace(/Planche (\d{2,3}[a-d]?)(-\d{2}[a-d]?)/g, (m0, c, r) => (c in MAP ? `Planche ${MAP[c]}${r}` : m0));
        t = t.replace(/(ref:\s*['"])(\d{2,3}[a-d]?)(-\d{2}[a-d]?['"])/g, (m0, p, c, r) => (c in MAP ? p + MAP[c] + r : m0));
        t = t.replace(/(planche-)(\d{2,3}[a-d]?)(-\d{2})/g, (m0, p, c, r) => (c in MAP ? p + MAP[c] + r : m0));
        fs.writeFileSync(path.join(D, f + '.tmp'), t); fs.unlinkSync(path.join(D, f));
      } else fs.renameSync(path.join(D, f), path.join(D, f + '.tmp'));
    }
  }
  if (!ESSAI) for (const f of fs.readdirSync(D).filter(f => f.endsWith('.tmp') && re.test(f.slice(0, -4)))) {
    const o = f.slice(0, -4); const m = o.match(re); fs.renameSync(path.join(D, f), path.join(D, o.replace(re, (m0, pre) => pre + MAP[m[2]])));
  }
};
renPlanche('images', /^(planche-)(\d{2,3}[a-d]?)(?=-\d{2})/);
renPlanche('images/validees', /^(planche-)(\d{2,3}[a-d]?)(?=-\d{2})/);
renPlanche('images/a-valider', /^(planche-)(\d{2,3}[a-d]?)(?=-\d{2})/);
renPlanche('images/planches-src', /^()(\d{2,3}[a-d]?)(?=-\d{2})/);

// ---------- 4. documents qui décrivent l'état actuel ----------
for (const doc of ['suivi/plan-de-match.md', 'images/recommandations-planches.md']) {
  const p = path.join(ROOT, doc); if (!fs.existsSync(p)) continue;
  const t = fs.readFileSync(p, 'utf8'); const n = transformer(t, doc, false, null);
  if (!ESSAI && n !== t) fs.writeFileSync(p, n);
}

// ---------- rapport ----------
const R = `# Renumérotation — rapport${ESSAI ? ' (essai, rien n’a bougé)' : ''}\n\n${renoms.length} fichiers renommés ou réécrits.\n\n## À relire à la main (${rapport.length})\n\n${rapport.join('\n') || '- rien'}\n\n## Fichiers\n\n${renoms.map(([a, b, c]) => `- ${a} → ${b}${c ? ' (texte modifié)' : ''}`).join('\n')}\n`;
fs.writeFileSync(path.join(ROOT, 'plan/renumerotation-2-rapport.md'), R);
if (!ESSAI) fs.writeFileSync(path.join(ROOT, 'plan/renumerotation-2.FAIT'), new Date().toISOString());
console.log(`${renoms.length} fichiers ; ${rapport.length} points à relire${ESSAI ? ' (essai)' : ''}`);
