#!/usr/bin/env node
// Compose une planche du Grand Livre du Chalet à partir d'une description en JavaScript.
//
//   node .claude/skills/planches/scripts/composer-planche.js images/planches-src/28-01.js
//   node .claude/skills/planches/scripts/composer-planche.js images/planches-src/28-01.js --zones
//
// Le compositeur fait tout ce qui a rendu les planches croches quand un agent le faisait à
// l'œil : les marges, la place de chaque vue, les pastilles de renvoi et leurs lignes de
// rappel, la légende (une ligne par renvoi, en colonnes alignées), le pied de planche,
// l'encadré danger (par encadre.js), les motifs de hachure, les cotes, les flèches. L'agent
// ne dessine que l'objet, dans le repère de sa vue.
//
// Ensuite il passe le vérificateur et rend un PNG : ouvre-le et regarde la planche.
//
// ─── La description ─────────────────────────────────────────────────────────────────────
//
// module.exports = (h) => ({
//   ref: '28-01',                        // 65-01a et 65-01b pour une construction sur deux pages
//   titre: 'La bécosse à fosse sèche',   // casse de phrase, sans point final
//   desc: 'Ce que montre la planche, pour qui ne la voit pas.',
//   format: 'pleine',                    // pleine 680 × 826 · demi 680 × 413 · quart 340 × 413
//   disposition: [['coupe', 'plan'], ['detail']],   // rangées de vues, de haut en bas
//   hauteurs: [3, 2],                    // hauteur relative des rangées (défaut : égales)
//   largeurs: [[3, 2], [1]],             // largeur relative des vues dans chaque rangée
//   vues: {
//     coupe: {
//       titre: 'En coupe',               // optionnel ; en italique au-dessus de la vue
//       dessin: z => [                   // z = { l, h } : la taille de la vue, origine en haut à gauche
//         h.rect(20, 40, z.l - 40, 120, h.a.hachure('terre')),
//         h.chemin([[20, 40], [z.l - 20, 40]], h.a.contour),
//         h.cote(20, z.h - 12, z.l - 20, z.h - 12, '1,2 m'),
//       ].join('\n'),
//       renvois: z => [                  // six au plus par vue ; numérotés 1…N sur toute la planche
//         { n: 1, rond: [z.l - 20, 24], cible: [z.l - 60, 70], texte: 'planches ajourées, moitié basse' },
//       ],
//     },
//   },
//   danger: 'Texte de l’encadré danger, s’il y en a un.',   // optionnel
// });
//
// ─── Les outils passés dans h ───────────────────────────────────────────────────────────
//
// h.a.contour · h.a.arete · h.a.detail · h.a.fin     les quatre traits : 2,4 · 1,4 · 0,7 · 0,5
// h.a.cache      trait tireté 0,7 : arête cachée, trajet d'air, de fumée, d'eau
// h.a.plein      aplat noir (une corde en coupe, un clou) · h.a.blanc : aplat blanc
// h.a.hachure(nom, trait = 'arete')   remplissage en motif, découpé par la forme elle-même :
//     bois · metal · terre · gravier · isolant · eau · neige · paille · grillage · pierre
// h.rect(x, y, l, ht, attrs) · h.ligne(x1, y1, x2, y2, attrs) · h.cercle(cx, cy, r, attrs)
// h.ellipse(cx, cy, rx, ry, attrs) · h.path(d, attrs)
// h.chemin([[x, y], …], attrs, ferme = false)   polyligne ; ferme = true pour une forme
// h.fleche(d, attrs = h.a.arete)      un mouvement ou un écoulement, jamais pour désigner
//
// La charte : deux poids, deux gris, un rouge (voir SKILL.md, « La charte »)
// h.a.loin    aplat gris clair #E6E6E6 : le plan d'arrière, ce qui est derrière (sans trait)
// h.a.ombre   aplat gris #CFCFCF : la face à l'ombre d'un volume, lumière en haut à gauche
// h.geste(d, { double })   LA flèche rouge du geste à faire (une, deux au plus par vue)
// h.controle(cx, cy, r = 8)   le cercle rouge du point à contrôler
// h.a.zone    filet rouge tireté : la zone dangereuse · h.a.danger : l'encadré danger
// h.cote(x1, y1, x2, y2, '1,2 m', { cote: 'dessus' | 'dessous' | 'gauche' | 'droite' })
// h.barre(x, y, longueur, '1 m')      barre d'échelle
// h.texte(x, y, 'N', { ancre: 'middle' })   rare : un mot sur le dessin le salit
// h.largeur(texte, corps)             largeur rendue en Georgia
//
// Ce qui ne passe pas : plus de six renvois dans une vue, une pastille hors de sa vue, deux
// pastilles qui se touchent, une légende ou un pied qui ne tiennent pas, un trou dans la
// numérotation. Le script le dit et s'arrête.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { largeur } = require('./mesure-texte');
const { encadre } = require('./encadre');

const RACINE = path.resolve(__dirname, '../../../..');
const NOIR = '#1A1A1A', ROUGE = '#9B2C1E', BLANC = '#FFFFFF';
// La charte (JP, 13 octobre 2026) : deux poids de trait, deux gris, un rouge.
//   GRIS_LOIN   le plan d'arrière, le membre du côté loin (le même gris que les corps simples)
//   GRIS_OMBRE  la face à l'ombre d'un volume, la lumière venant d'en haut à gauche
// Le rouge marque ce qui compte, et rien d'autre : la flèche du geste, la zone dangereuse, le
// point à contrôler, l'encadré danger.
const GRIS_LOIN = '#E6E6E6', GRIS_OMBRE = '#CFCFCF';
const FONTE = "Georgia, 'Times New Roman', serif";

const FORMATS = { pleine: [680, 826], demi: [680, 413], quart: [340, 413] };
const GOUTTIERE = 22;          // entre deux vues
const TITRE_VUE = 22;          // place réservée au titre d'une vue
const PAS_LEGENDE = 17;        // interligne de la légende
const R_RENVOI = 9;

const f1 = v => Math.round(v * 10) / 10;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ─── traits et formes ─────────────────────────────────────────────────────────────────
const trait = (ep, extra = '') => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"${extra}`;
const A = {
  contour: trait(2.4),
  arete: trait(1.4),
  detail: trait(0.7),
  fin: trait(0.5),
  cache: trait(0.7, ' stroke-dasharray="5 3.5"'),
  danger: `fill="none" stroke="${ROUGE}" stroke-width="2" stroke-linejoin="round"`,
  loin: `fill="${GRIS_LOIN}" stroke="none"`,
  ombre: `fill="${GRIS_OMBRE}" stroke="none"`,
  geste: `fill="none" stroke="${ROUGE}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"`,
  zone: `fill="none" stroke="${ROUGE}" stroke-width="1.4" stroke-dasharray="5 3.5" stroke-linejoin="round"`,
  controle: `fill="none" stroke="${ROUGE}" stroke-width="1.6"`,
  plein: `fill="${NOIR}" stroke="none"`,
  blanc: `fill="${BLANC}" stroke="none"`,
  hachure: (nom, t = 'arete') => {
    if (!MOTIFS[nom]) throw new Error(`hachure inconnue : ${nom} (connues : ${Object.keys(MOTIFS).join(', ')})`);
    const ep = { contour: 2.4, arete: 1.4, detail: 0.7, fin: 0.5, aucun: 0 }[t];
    return ep ? `fill="url(#h-${nom})" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round"` : `fill="url(#h-${nom})" stroke="none"`;
  },
};

// Motifs de hachure. Chaque trait est tracé droit dans le motif et tourné par
// patternTransform : aucune ligne en diagonale n'apparaît hors d'un motif.
const L = (x1, y1, x2, y2, ep = 0.7, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${NOIR}" stroke-width="${ep}"${extra}/>`;
const MOTIFS = {
  bois:     `<pattern id="h-bois" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">${L(0, 0, 0, 6)}</pattern>`,
  metal:    `<pattern id="h-metal" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">${L(0, 0, 0, 10)}</pattern>`,
  terre:    `<pattern id="h-terre" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">${L(0, 0, 0, 5.5)}${L(4.5, 4.5, 4.5, 9, 0.5)}</pattern>`,
  gravier:  `<pattern id="h-gravier" width="10" height="9" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1.7" fill="none" stroke="${NOIR}" stroke-width="0.5"/><circle cx="7.5" cy="7" r="1.3" fill="none" stroke="${NOIR}" stroke-width="0.5"/></pattern>`,
  isolant:  `<pattern id="h-isolant" width="12" height="8" patternUnits="userSpaceOnUse"><path d="M0 6 Q3 0 6 4 T12 2" fill="none" stroke="${NOIR}" stroke-width="0.5"/></pattern>`,
  eau:      `<pattern id="h-eau" width="16" height="7" patternUnits="userSpaceOnUse">${L(1, 2, 8, 2, 0.5)}${L(9, 5.5, 15, 5.5, 0.5)}</pattern>`,
  neige:    `<pattern id="h-neige" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="0.7" fill="${NOIR}" stroke="none"/><circle cx="6" cy="6" r="0.7" fill="${NOIR}" stroke="none"/></pattern>`,
  paille:   `<pattern id="h-paille" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">${L(1, 1, 1, 7, 0.5)}${L(6, 4, 6, 10, 0.5)}</pattern>`,
  grillage: `<pattern id="h-grillage" width="5" height="5" patternUnits="userSpaceOnUse">${L(0, 0, 5, 0, 0.5)}${L(0, 0, 0, 5, 0.5)}</pattern>`,
  pierre:   `<pattern id="h-pierre" width="14" height="10" patternUnits="userSpaceOnUse"><path d="M1 3 L5 1 L9 3 L8 7 L3 8 Z M10 9 L13 7" fill="none" stroke="${NOIR}" stroke-width="0.5"/></pattern>`,
};
const MARQUEUR_ROUGE = `<marker id="fl-r" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9 Z" fill="${ROUGE}" stroke="${ROUGE}" stroke-width="1" stroke-linejoin="round"/></marker>`;
const MARQUEUR = `<marker id="fl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke="${NOIR}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></marker>`;

// liseré : un contour blanc peint sous le texte, pour qu'une cote reste lisible sur une hachure
const LISERE = ` stroke="${BLANC}" stroke-width="3" stroke-linejoin="round" paint-order="stroke"`;
const txt = (x, y, s, { ancre = 'start', corps = 13, couleur = NOIR, italique = false, lisere = false } = {}) =>
  `<text x="${f1(x)}" y="${f1(y)}"${ancre !== 'start' ? ` text-anchor="${ancre}"` : ''} font-family="${FONTE}" font-size="${corps}"${italique ? ' font-style="italic"' : ''} fill="${couleur}"${lisere ? LISERE : ''}>${esc(s)}</text>`;

const h = {
  a: A,
  hachures: Object.keys(MOTIFS),
  largeur,
  rect: (x, y, l, ht, at = A.arete) => `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(l)}" height="${f1(ht)}" ${at}/>`,
  ligne: (x1, y1, x2, y2, at = A.arete) => `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" ${at}/>`,
  cercle: (cx, cy, r, at = A.arete) => `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" ${at}/>`,
  ellipse: (cx, cy, rx, ry, at = A.arete) => `<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}" ${at}/>`,
  path: (d, at = A.arete) => `<path d="${d}" ${at}/>`,
  chemin: (pts, at = A.arete, ferme = false) =>
    `<path d="${pts.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])} ${f1(p[1])}`).join(' ')}${ferme ? ' Z' : ''}" ${at}/>`,
  fleche: (d, at = A.arete) => `<path d="${d}" ${at} marker-end="url(#fl)"/>`,
  geste: (d, { double = false } = {}) => `<path d="${d}" ${A.geste} marker-end="url(#fl-r)"${double ? ' marker-start="url(#fl-r)"' : ''}/>`,
  controle: (cx, cy, r = 8) => `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" ${A.controle}/>`,
  texte: (x, y, s, o = {}) => txt(x, y, s, { corps: 12, ancre: 'middle', ...o }),
  cote(x1, y1, x2, y2, s, { cote } = {}) {
    const horiz = Math.abs(x2 - x1) >= Math.abs(y2 - y1);
    const out = [h.ligne(x1, y1, x2, y2, A.detail)];
    if (horiz) {
      out.push(h.ligne(x1, y1 - 6, x1, y1 + 6, A.detail), h.ligne(x2, y2 - 6, x2, y2 + 6, A.detail));
      const dessous = cote === 'dessous';
      out.push(txt((x1 + x2) / 2, (y1 + y2) / 2 + (dessous ? 15 : -5), s, { ancre: 'middle', corps: 12, lisere: true }));
    } else {
      out.push(h.ligne(x1 - 6, y1, x1 + 6, y1, A.detail), h.ligne(x2 - 6, y2, x2 + 6, y2, A.detail));
      const gauche = cote === 'gauche';
      const w = largeur(s, 12);
      out.push(txt((x1 + x2) / 2 + (gauche ? -(8 + w / 2) : 8 + w / 2), (y1 + y2) / 2 + 4, s, { ancre: 'middle', corps: 12, lisere: true }));
    }
    return out.join('\n');
  },
  barre(x, y, l, s) {
    return [h.ligne(x, y, x + l, y, A.arete), h.ligne(x, y - 4, x, y + 4, A.detail), h.ligne(x + l, y - 4, x + l, y + 4, A.detail),
      txt(x + l / 2, y - 7, s, { ancre: 'middle', corps: 12 })].join('\n');
  },
};
h.formes = require('./formes')(h);   // mains, personnages, fil et filet : voir formes.js

// ─── mise en page ─────────────────────────────────────────────────────────────────────
function composer(fichierSpec, { zonesSeulement = false } = {}) {
  const abs = path.resolve(fichierSpec);
  delete require.cache[abs];
  const fabrique = require(abs);
  const spec = typeof fabrique === 'function' ? fabrique(h) : fabrique;
  const fautes = [], avis = [];

  if (!FORMATS[spec.format]) throw new Error(`format inconnu : ${spec.format} (pleine, demi, quart)`);
  const [W, H] = FORMATS[spec.format];
  const MX = spec.format === 'quart' ? 22 : 40;
  const MH = 24, MB = 18;
  const utile = W - 2 * MX;

  const idsVues = Object.keys(spec.vues || {});
  const disposition = spec.disposition || [idsVues];
  const dispoIds = disposition.flat();
  for (const id of dispoIds) if (!spec.vues[id]) throw new Error(`vue « ${id} » dans la disposition mais pas dans vues`);
  for (const id of idsVues) if (!dispoIds.includes(id)) throw new Error(`vue « ${id} » absente de la disposition`);

  // Les renvois ne dépendent pas de la taille des zones pour leur nombre et leur texte :
  // on les compte d'abord avec une zone fictive pour dimensionner la légende.
  const brouillon = [];
  for (const id of idsVues) {
    const r = spec.vues[id].renvois;
    const liste = typeof r === 'function' ? r({ l: 400, h: 300 }) : (r || []);
    liste.forEach(x => brouillon.push({ ...x, vue: id }));
  }
  brouillon.sort((a, b) => a.n - b.n);
  brouillon.forEach((r, i) => { if (r.n !== i + 1) fautes.push(`numérotation des renvois : attendu ${i + 1}, trouvé ${r.n}`); });
  for (const id of idsVues) {
    const k = brouillon.filter(r => r.vue === id).length;
    if (k > 6) fautes.push(`vue « ${id} » : ${k} renvois. Six au plus par vue — coupe, ou scinde la vue en deux`);
  }

  // Légende : une ligne par renvoi, en colonnes alignées, remplies de haut en bas.
  const N = brouillon.length;
  const retrait = N >= 10 ? 22 : 16;
  const largeurs = brouillon.map(r => retrait + largeur(r.texte, 13));
  let ncol = 1;
  for (const k of [1, 2, 3]) {
    ncol = k;
    const colL = (utile - (k - 1) * 24) / k;
    const lignes = Math.ceil(N / k);
    if (largeurs.every(w => w <= colL) && (lignes <= 6 || k === 3)) break;
  }
  // Repli : une ligne que JP a voulue entière ne tient pas sur trois colonnes ; on prend le plus de colonnes où
  // toutes les lignes tiennent (deux, ou une), plutôt que de refuser la planche. Une planche qui passait ne change pas.
  if (!largeurs.every(w => w <= (utile - (ncol - 1) * 24) / ncol)) {
    for (const k of [2, 1]) { if (largeurs.every(w => w <= (utile - (k - 1) * 24) / k)) { ncol = k; break; } }
  }
  const colL = (utile - (ncol - 1) * 24) / ncol;
  largeurs.forEach((w, i) => { if (w > colL) fautes.push(`renvoi ${brouillon[i].n} trop long pour sa colonne (${Math.round(w)} > ${Math.round(colL)}) : « ${brouillon[i].texte} ». Cinq ou six mots`); });
  brouillon.forEach(r => { if (r.texte.split(/\s+/).length > 8) avis.push(`renvoi ${r.n} : ${r.texte.split(/\s+/).length} mots, c'est une phrase, pas un renvoi`); });
  const rangs = N ? Math.ceil(N / ncol) : 0;

  // « Planche 04-40. Le sas… » : un point après le numéro, aucun tiret (JP, 15 octobre 2026 : plus aucun tiret)
  const piedTexte = `Planche ${spec.ref}. ${spec.titre.replace(/\.$/, '')}.`;
  if (largeur(piedTexte, 13) > utile) fautes.push(`le pied « ${piedTexte} » ne tient pas sur une ligne : raccourcis le titre`);

  // Le numéro et le titre ne s'impriment plus dans le dessin : le moteur de pages les pose en haut de la page,
  // en évidence (JP, 16 octobre 2026 : « là, ils sont comme tout cachés »). Le SVG les garde dans <title>.
  const piedH = rangs ? 4 + rangs * PAS_LEGENDE : 0;
  const yPied = H - MB - piedH;
  let yBasDessin = yPied - 18;
  let dangerSvg = '';
  if (spec.danger) {
    const e0 = encadre({ x: MX, y: 0, max: utile, texte: spec.danger, danger: true });
    const yD = yPied - 16 - e0.hauteur;
    dangerSvg = encadre({ x: MX, y: yD, max: utile, texte: spec.danger, danger: true }).svg;
    yBasDessin = yD - 18;
  }
  const hautDessin = yBasDessin - MH;
  if (hautDessin < 80) fautes.push(`il ne reste que ${Math.round(hautDessin)} de hauteur pour dessiner : trop de renvois ou un encadré trop long pour ce format`);

  // Zones des vues
  const nR = disposition.length;
  const hRel = spec.hauteurs || disposition.map(() => 1);
  const sommeH = hRel.reduce((a, b) => a + b, 0);
  const zones = {};
  let y = MH;
  disposition.forEach((rangee, i) => {
    const hr = (hautDessin - (nR - 1) * GOUTTIERE) * hRel[i] / sommeH;
    const lRel = (spec.largeurs && spec.largeurs[i]) || rangee.map(() => 1);
    const sommeL = lRel.reduce((a, b) => a + b, 0);
    let x = MX;
    rangee.forEach((id, j) => {
      const lr = (utile - (rangee.length - 1) * GOUTTIERE) * lRel[j] / sommeL;
      const t = spec.vues[id].titre ? TITRE_VUE : 0;
      zones[id] = { x: f1(x), y: f1(y + t), l: Math.floor(lr), h: Math.floor(hr - t), titre: spec.vues[id].titre, yTitre: y };
      x += lr + GOUTTIERE;
    });
    y += hr + GOUTTIERE;
  });

  if (zonesSeulement) return { zones, fautes, avis, W, H };

  // Dessin de chaque vue, et ses renvois dans le repère de la vue
  const corps = [], renvois = [];
  for (const id of dispoIds) {
    const v = spec.vues[id], z = zones[id];
    const dessin = typeof v.dessin === 'function' ? v.dessin({ l: z.l, h: z.h }) : (v.dessin || '');
    const rs = typeof v.renvois === 'function' ? v.renvois({ l: z.l, h: z.h }) : (v.renvois || []);
    if (z.titre) corps.push(txt(z.x, z.yTitre + 14, z.titre, { italique: true }));
    corps.push(`<g transform="translate(${z.x} ${z.y})" data-vue="${esc(id)}">\n${dessin}\n</g>`);
    for (const r of rs) {
      const [rx, ry] = r.rond, [cx, cy] = r.cible;
      if (rx < R_RENVOI + 1 || ry < R_RENVOI + 1 || rx > z.l - R_RENVOI - 1 || ry > z.h - R_RENVOI - 1)
        fautes.push(`renvoi ${r.n} : pastille hors de la vue « ${id} » (${rx}, ${ry} dans ${z.l} × ${z.h})`);
      renvois.push({ ...r, vue: id, ax: z.x + rx, ay: z.y + ry, bx: z.x + cx, by: z.y + cy });
    }
  }
  for (let i = 0; i < renvois.length; i++) for (let j = i + 1; j < renvois.length; j++) {
    const a = renvois[i], b = renvois[j];
    if (Math.hypot(a.ax - b.ax, a.ay - b.ay) < 2 * R_RENVOI + 5) fautes.push(`pastilles ${a.n} et ${b.n} qui se touchent`);
    if (croisent([a.ax, a.ay, a.bx, a.by], [b.ax, b.ay, b.bx, b.by])) avis.push(`lignes de rappel ${a.n} et ${b.n} qui se croisent : déplace une pastille`);
  }
  const rappels = [];
  for (const r of renvois) {
    const dx = r.bx - r.ax, dy = r.by - r.ay, d = Math.hypot(dx, dy);
    if (d < R_RENVOI + 8) { fautes.push(`renvoi ${r.n} : la cible est sous la pastille, écarte-la d'au moins 20`); continue; }
    const sx = r.ax + R_RENVOI * dx / d, sy = r.ay + R_RENVOI * dy / d;
    // Un liseré blanc sous la ligne de rappel et un point au contact : la ligne reste
    // lisible quand elle traverse une hachure, et on voit où elle touche.
    rappels.push(`<line x1="${f1(sx)}" y1="${f1(sy)}" x2="${f1(r.bx)}" y2="${f1(r.by)}" fill="none" stroke="${BLANC}" stroke-width="3" stroke-linecap="round"/>`);
    rappels.push(`<line x1="${f1(sx)}" y1="${f1(sy)}" x2="${f1(r.bx)}" y2="${f1(r.by)}" fill="none" stroke="${NOIR}" stroke-width="0.5" stroke-dasharray="3 2.5"/>`);
    rappels.push(`<circle cx="${f1(r.bx)}" cy="${f1(r.by)}" r="1.8" fill="${NOIR}" stroke="${BLANC}" stroke-width="0.7"/>`);
    rappels.push(`<circle cx="${f1(r.ax)}" cy="${f1(r.ay)}" r="${R_RENVOI}" fill="${BLANC}" stroke="${NOIR}" stroke-width="1.4" data-vue="${esc(r.vue)}"/>`);
    rappels.push(txt(r.ax, r.ay + 4, String(r.n), { ancre: 'middle', corps: 12 }));
  }

  // Pied : titre, puis la légende en colonnes
  const pied = [];
  const triés = renvois.slice().sort((a, b) => a.n - b.n);
  triés.forEach((r, i) => {
    const c = Math.floor(i / rangs), l = i % rangs;
    const x = MX + c * (colL + 24);
    const yl = yPied + (l + 1) * PAS_LEGENDE;
    pied.push(txt(x + retrait - 6, yl, String(r.n), { ancre: 'end' }));
    pied.push(txt(x + retrait, yl, r.texte));
  });

  const defsUtiles = Object.entries(MOTIFS).filter(([n]) => corps.join('').includes(`url(#h-${n})`)).map(([, m]) => m);
  if (corps.join('').includes('url(#fl)')) defsUtiles.push(MARQUEUR);
  if (corps.join('').includes('url(#fl-r)')) defsUtiles.push(MARQUEUR_ROUGE);

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img">`,
    `<title>${esc(piedTexte.replace(/\.$/, ''))}</title>`,
    `<desc>${esc(spec.desc || '')}</desc>`,
    defsUtiles.length ? `<defs>\n${defsUtiles.join('\n')}\n</defs>` : '',
    `<rect x="0" y="0" width="${W}" height="${H}" fill="${BLANC}"/>`,
    ...corps,
    ...rappels,
    dangerSvg,
    ...pied,
    '</svg>',
  ].filter(Boolean).join('\n');

  return { svg, zones, fautes, avis, W, H, spec };
}

function croisent([x1, y1, x2, y2], [x3, y3, x4, y4]) {
  const d = (x2 - x1) * (y4 - y3) - (y2 - y1) * (x4 - x3);
  if (Math.abs(d) < 1e-9) return false;
  const t = ((x3 - x1) * (y4 - y3) - (y3 - y1) * (x4 - x3)) / d;
  const u = ((x3 - x1) * (y2 - y1) - (y3 - y1) * (x2 - x1)) / d;
  return t > 0.02 && t < 0.98 && u > 0.02 && u < 0.98;
}

function slug(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ').trim().split(' ')
    .filter(m => !['le', 'la', 'les', 'l', 'un', 'une', 'de', 'du', 'des', 'd', 'et', 'a', 'au', 'en', 'sur'].includes(m))
    .slice(0, 4).join('-');
}

// ─── ligne de commande ────────────────────────────────────────────────────────────────
if (require.main === module) {
  const args = process.argv.slice(2);
  const fichier = args.find(a => !a.startsWith('--'));
  if (!fichier) { console.error('usage : composer-planche.js images/planches-src/NN-NN.js [--zones]'); process.exit(2); }
  let r;
  try { r = composer(fichier, { zonesSeulement: args.includes('--zones') }); }
  catch (e) { console.error(`\nERREUR  ${e.message}\n`); process.exit(1); }

  if (args.includes('--zones')) {
    console.log(`\nFormat ${r.W} × ${r.H}. Taille de chaque vue (origine en haut à gauche de la vue) :`);
    for (const [id, z] of Object.entries(r.zones)) console.log(`  ${id.padEnd(12)} ${z.l} × ${z.h}${z.titre ? `   « ${z.titre} »` : ''}`);
    r.fautes.forEach(x => console.log(`  FAUTE  ${x}`));
    console.log();
    process.exit(r.fautes.length ? 1 : 0);
  }

  r.avis.forEach(x => console.log(`  avis   ${x}`));
  if (r.fautes.length) {
    r.fautes.forEach(x => console.log(`  FAUTE  ${x}`));
    console.log('\nRien n’est écrit tant que ces fautes restent.\n');
    process.exit(1);
  }
  const nom = r.spec.fichier || `planche-${r.spec.ref}-${slug(r.spec.titre)}.svg`;
  const sortie = path.join(RACINE, 'images', nom);
  fs.writeFileSync(sortie, r.svg);
  console.log(`\n${sortie}`);
  try {
    console.log(execFileSync(process.execPath, [path.join(__dirname, 'verifier-planche.js'), sortie], { encoding: 'utf8' }).trim());
  } catch (e) { console.log((e.stdout || '').trim()); }
  try {
    const png = execFileSync(process.execPath, [path.join(__dirname, 'rendre-planche.js'), sortie], { encoding: 'utf8' }).trim();
    console.log(`\nRendu : ${png.split('\n').pop()}\nOuvre-le avec l’outil de lecture d’images et regarde la planche avant de la livrer.\n`);
  } catch (e) { console.log(`\nLe rendu a échoué : ${e.message}\n`); }
}

module.exports = { composer, h };
