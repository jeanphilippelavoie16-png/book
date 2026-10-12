// 87-01b — Le tenon passant à clé et l'enture (chapitre 87, §5.7 et §9.5)
// Même axonométrie et mêmes outils que 87-01a : x file en bas à droite, y en bas à gauche,
// z monte ; faces vues +x, +y et dessus ; liseré épais sous chaque pièce, faces blanches dessus.

const AX = [0.94, 0.342], AY = [-0.5, 0.4];
const pr = q => [q[0] * AX[0] + q[1] * AY[0], q[0] * AX[1] + q[1] * AY[1] - q[2]];
const etendue = pts => {
  const p = pts.map(pr), us = p.map(q => q[0]), vs = p.map(q => q[1]);
  return [Math.min(...us), Math.max(...us), Math.min(...vs), Math.max(...vs)];
};
const echelle = (pts, r) => { const [u0, u1, v0, v1] = etendue(pts); return Math.min(r[2] / (u1 - u0), r[3] / (v1 - v0)); };
function cadre(pts, r, s) {
  const [u0, u1, v0, v1] = etendue(pts);
  s = s || Math.min(r[2] / (u1 - u0), r[3] / (v1 - v0));
  const ox = r[0] + (r[2] - (u1 - u0) * s) / 2 - u0 * s;
  const oy = r[1] + (r[3] - (v1 - v0) * s) / 2 - v0 * s;
  const P = (x, y, z) => { const q = pr([x, y, z]); return [ox + q[0] * s, oy + q[1] * s]; };
  P.uv = (u, v) => [ox + u * s, oy + v * s];
  P.s = s;
  return P;
}
const coins = (x0, x1, y0, y1, z0, z1) => {
  const o = [];
  for (const x of [x0, x1]) for (const y of [y0, y1]) for (const z of [z0, z1]) o.push([x, y, z]);
  return o;
};
const dessus = (x0, x1, y0, y1, z) => [[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z]];
const faceX = (x, y0, y1, z0, z1) => [[x, y0, z0], [x, y1, z0], [x, y1, z1], [x, y0, z1]];
const faceY = (y, x0, x1, z0, z1) => [[x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]];
const boite = (x0, x1, y0, y1, z0, z1) => [dessus(x0, x1, y0, y1, z1), faceX(x1, y0, y1, z0, z1), faceY(y1, x0, x1, z0, z1)];
const rond3 = (c, r, plan, n = 32) => {
  const o = [];
  for (let i = 0; i < n; i++) {
    const t = 2 * Math.PI * i / n, a = r * Math.cos(t), b = r * Math.sin(t);
    o.push(plan === 'xz' ? [c[0] + a, c[1], c[2] + b] : plan === 'xy' ? [c[0] + a, c[1] + b, c[2]] : [c[0], c[1] + a, c[2] + b]);
  }
  return o;
};
const enveloppe = pts => {
  const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [], hi = [];
  for (const q of p) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  for (const q of p.slice().reverse()) { while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], q) <= 0) hi.pop(); hi.push(q); }
  return lo.slice(0, -1).concat(hi.slice(0, -1));
};

// ─── le tenon passant à clé (unités arbitraires, proportions seulement) ───
// montant 90 × 90 ; traverse derrière, son tenon traverse et ressort de 70 ; la mortaise de clé
// est entamée un peu dans le montant, pour que la clé porte sur le montant et non sur la mortaise.
const LC = 125;                                // levée de la clé dans l'éclaté
const w = z0 => 18 + (z0 - 60) * 14 / 160;     // largeur de la clé : effilée sur une seule face
const ptsCle = [...coins(-80, 0, 15, 75, 80, 180), ...coins(0, 90, 0, 90, 0, 240), ...coins(90, 160, 31, 59, 90, 170), ...coins(90, 122, 38, 52, 60 + LC, 220 + LC)];
const repCle = z => cadre(ptsCle, [10, 8, z.l - 20, z.h - 16]);
const repK = z => {
  const s = Math.min((z.l - 16) / 200, (z.h - 20) / 235), kx = 8, ky = (z.h - 235 * s) / 2;
  const K = (x, zz) => [kx + (x + 32) * s, ky + (265 - zz) * s];
  K.s = s;
  return K;
};

// ─── l'enture à mi-bois (proportions seulement) ───
const GE = 70;
const enE = [...coins(0, 280, 0, 40, 0, GE + 95)];
const enM = [...coins(0, 280, 0, 40, 0, 40), ...coins(115, 165, -5, 45, -60, 0)];
const repEn = z => {
  const rE = [6, 6, z.l * 0.5 - 10, z.h - 12], rM = [z.l * 0.52, 20, z.l * 0.48 - 6, z.h - 26];
  const s = Math.min(echelle(enE, rE), echelle(enM, rM));
  return [cadre(enE, rE, s), cadre(enM, rM, s)];
};

module.exports = (h) => {
  const BLANC = h.a.arete.replace('fill="none"', 'fill="#FFFFFF"');
  const SOUS = h.a.contour.replace('fill="none"', 'fill="#FFFFFF"').replace('stroke-width="2.4"', 'stroke-width="3.4"');
  const PLEIN_BLANC = h.a.contour.replace('fill="none"', 'fill="#FFFFFF"');
  const AXE = h.a.fin + ' stroke-dasharray="8 3 1.5 3"';
  const poly = (P, f, a) => h.chemin(f.map(q => P(...q)), a, true);
  const t3 = (P, a, b, at = h.a.detail) => h.ligne(...P(...a), ...P(...b), at);
  const piece = (P, groupes) =>
    groupes.flatMap(g => g[0]).map(f => poly(P, f, SOUS)).join('\n') + '\n' +
    groupes.map(([faces, extra]) => faces.map(f => poly(P, f, BLANC)).join('\n') + '\n' + (extra || '')).join('\n');
  const trou = (P, c, r, plan) => poly(P, rond3(c, r, plan), h.a.plein);
  const cheville = (P, anneaux, plan, extra) => {
    const env = enveloppe(anneaux.flatMap(([c, r]) => rond3(c, r, plan).map(q => P(...q))));
    const [cb, rb] = anneaux[anneaux.length - 1];
    return h.chemin(env, SOUS, true) + h.chemin(env, BLANC, true) + poly(P, rond3(cb, rb, plan), BLANC) + (extra || '');
  };
  const cernes = (P, f, c, rs, dans) => rs.map(r => {
    const runs = [[]];
    for (let i = 0; i <= 180; i++) {
      const t = 2 * Math.PI * i / 180, q = f(c[0] + r * Math.cos(t), c[1] + r * Math.sin(t));
      if (dans(q)) runs[runs.length - 1].push(P(...q)); else if (runs[runs.length - 1].length) runs.push([]);
    }
    return runs.filter(u => u.length > 1).map(u => h.chemin(u, h.a.detail)).join('\n');
  }).join('\n');

  return {
    ref: '110-01b',
    titre: 'Le tenon passant à clé et l’enture',
    desc: 'Tenon passant à clé : la traverse passe au travers du montant, son tenon ressort de l’autre côté et reçoit une mortaise où se chasse une clé de bois franc effilée sur une seule face, montrée levée au-dessus de sa mortaise. En coupe, la face droite de la clé porte contre le montant, la face en pente serre sur le bout du tenon, et du bois reste derrière la clé. Dessous, une enture à mi-bois : deux bouts amincis à demi-épaisseur, deux chevilles décalées, éclatée puis montée sur un appui.',
    format: 'pleine',
    disposition: [['cle', 'coupe'], ['enture']],
    hauteurs: [3, 2],
    largeurs: [[3, 2], [1]],
    vues: {
      // ── éclaté : la clé levée au-dessus de sa mortaise ──
      cle: {
        titre: 'Tenon passant à clé, éclaté',
        dessin: z => {
          const P = repCle(z);
          const traverse = piece(P, [[[dessus(-80, 0, 15, 75, 180), faceY(75, -80, 0, 80, 180)],
            [102, 128, 160].map(zz => t3(P, [-77, 75, zz], [-3, 75, zz])).join('\n')]]);
          const montant = piece(P, [[boite(0, 90, 0, 90, 0, 240), [
            ...[14, 40, 72].map(x => t3(P, [x, 90, 8], [x, 90, 232])),
            ...[12, 77].map(y => t3(P, [90, y, 8], [90, y, 232])),
            cernes(P, (a, b) => [a, b, 240], [-25, -35], [60, 85, 110], q => q[0] > 3 && q[0] < 87 && q[1] > 3 && q[1] < 87),
          ].join('\n')]]);
          const tenon = piece(P, [[boite(90, 160, 31, 59, 90, 170), [
            ...[112, 148].map(zz => t3(P, [93, 59, zz], [157, 59, zz])),
            poly(P, dessus(90, 90 + w(170), 38, 52, 170), h.a.plein),
          ].join('\n')]]);
          const axe = t3(P, [99, 45, 170], [99, 45, 60 + LC], AXE);
          const cle = piece(P, [[[
            [[90, 52, 60 + LC], [90 + w(60), 52, 60 + LC], [90 + w(220), 52, 220 + LC], [90, 52, 220 + LC]],
            [[90 + w(60), 38, 60 + LC], [90 + w(60), 52, 60 + LC], [90 + w(220), 52, 220 + LC], [90 + w(220), 38, 220 + LC]],
            dessus(90, 90 + w(220), 38, 52, 220 + LC),
          ], [96, 102].map(x => t3(P, [x, 52, 66 + LC], [x, 52, 214 + LC])).join('\n')]]);
          return [traverse, montant, tenon, axe, cle].join('\n');
        },
        renvois: z => {
          const P = repCle(z);
          return [
            { n: 1, rond: P.uv(128, 18), cible: P(135, 59, 90), texte: 'tenon qui ressort du poteau' },
            { n: 2, rond: P.uv(140, -140), cible: P(90 + w(170), 38, 170), texte: 'mortaise percée dans le tenon' },
            { n: 3, rond: P.uv(138, -230), cible: P(90 + w(145), 38, 145 + LC), texte: 'clé de bois franc' },
          ];
        },
      },

      // ── coupe verticale dans l'axe de la traverse ──
      coupe: {
        titre: 'En coupe',
        dessin: z => {
          const K = repK(z), o = [];
          const hach = h.a.hachure('bois', 'aucun');
          o.push(h.chemin([K(0, 170), K(90, 170), K(90, 245), K(0, 245)], hach, true));
          o.push(h.chemin([K(0, 35), K(90, 35), K(90, 90), K(0, 90)], hach, true));
          o.push(h.ligne(...K(0, 245), ...K(90, 245), h.a.detail), h.ligne(...K(0, 35), ...K(90, 35), h.a.detail));
          o.push(h.ligne(...K(0, 170), ...K(90, 170), h.a.arete), h.ligne(...K(0, 90), ...K(90, 90), h.a.arete));
          o.push(h.chemin([K(-30, 80), K(0, 80), K(0, 90), K(84, 90), K(84, 170), K(0, 170), K(0, 180), K(-30, 180)], BLANC, true));
          o.push(h.chemin([K(90 + w(90), 90), K(160, 90), K(160, 170), K(90 + w(170), 170)], BLANC, true));
          for (const zz of [100, 115, 130, 145, 160]) o.push(h.ligne(...K(-28, zz), ...K(82, zz), h.a.detail));
          for (const zz of [100, 115, 130, 145, 160]) o.push(h.ligne(...K(90 + w(zz) + 3, zz), ...K(157, zz), h.a.detail));
          o.push(h.ligne(...K(-30, 80), ...K(-30, 180), h.a.detail));
          o.push(h.chemin([K(-30, 180), K(0, 180), K(0, 245)], h.a.contour), h.chemin([K(-30, 80), K(0, 80), K(0, 35)], h.a.contour));
          o.push(h.chemin([K(90, 245), K(90, 170)], h.a.contour), h.chemin([K(90, 90), K(90, 35)], h.a.contour));
          o.push(h.chemin([K(90 + w(170), 170), K(160, 170), K(160, 90), K(90 + w(90), 90)], h.a.contour));
          o.push(h.chemin([K(90, 60), K(90 + w(60), 60), K(90 + w(220), 220), K(90, 220)], PLEIN_BLANC, true));
          for (const x of [96, 102]) o.push(h.ligne(...K(x, 64), ...K(x, 216), h.a.detail));
          o.push(h.fleche(`M${K(100, 258)} L${K(100, 226)}`));
          return o.join('\n');
        },
        renvois: z => {
          const K = repK(z);
          return [
            { n: 4, rond: K(155, 212), cible: K(90, 200), texte: 'face droite contre le poteau' },
            { n: 5, rond: K(160, 180), cible: K(90 + w(170), 170), texte: 'face en pente, elle serre' },
            { n: 6, rond: K(145, 246), cible: K(112, 220), texte: 'tête rechassée chaque saison' },
            { n: 7, rond: K(150, 62), cible: K(140, 90), texte: 'bois laissé derrière la clé' },
          ];
        },
      },

      // ── l'enture à mi-bois : éclatée, puis montée sur un appui ──
      enture: {
        titre: 'Enture à mi-bois, éclatée et montée',
        dessin: z => {
          const [E, M] = repEn(z), g = GE;
          const bas = piece(E, [[[
            dessus(80, 200, 0, 40, 20), faceX(80, 0, 40, 20, 40), dessus(0, 80, 0, 40, 40),
            [[0, 40, 0], [200, 40, 0], [200, 40, 20], [80, 40, 20], [80, 40, 40], [0, 40, 40]],
            faceX(200, 0, 40, 0, 20),
          ], [
            t3(E, [3, 40, 30], [77, 40, 30]), t3(E, [3, 40, 10], [197, 40, 10]),
            trou(E, [110, 12, 20], 5, 'xy'), trou(E, [170, 28, 20], 5, 'xy'),
          ].join('\n')]]);
          const axes1 = t3(E, [110, 12, 20], [110, 12, g + 20], AXE) + '\n' + t3(E, [170, 28, 20], [170, 28, g + 20], AXE);
          const haut = piece(E, [[[
            dessus(80, 280, 0, 40, g + 40),
            [[80, 40, g + 20], [200, 40, g + 20], [200, 40, g], [280, 40, g], [280, 40, g + 40], [80, 40, g + 40]],
            faceX(280, 0, 40, g, g + 40),
          ], [
            t3(E, [83, 40, g + 30], [277, 40, g + 30]), t3(E, [203, 40, g + 10], [277, 40, g + 10]),
            trou(E, [110, 12, g + 40], 5, 'xy'), trou(E, [170, 28, g + 40], 5, 'xy'),
          ].join('\n')]]);
          const axes2 = t3(E, [110, 12, g + 40], [110, 12, g + 55], AXE) + '\n' + t3(E, [170, 28, g + 40], [170, 28, g + 55], AXE);
          const chev = [[110, 12], [170, 28]].map(([x, y]) =>
            cheville(E, [[[x, y, g + 55], 3.5], [[x, y, g + 63], 5], [[x, y, g + 95], 5]], 'xy')).join('\n');
          const a = E(200, 0, 20), b = E(200, 0, 0), dx = 12;
          const cote = [h.ligne(a[0] + 3, a[1], a[0] + dx + 5, a[1], h.a.fin), h.ligne(b[0] + 3, b[1], b[0] + dx + 5, b[1], h.a.fin),
            h.cote(a[0] + dx, a[1], b[0] + dx, b[1], '½ ép.', { cote: 'droite' })].join('\n');
          const appui = piece(M, [[boite(115, 165, -5, 45, -60, 0)]]);
          const monte = piece(M, [[[
            dessus(0, 80, 0, 40, 40), dessus(80, 280, 0, 40, 40),
            [[0, 40, 0], [200, 40, 0], [200, 40, 20], [80, 40, 20], [80, 40, 40], [0, 40, 40]],
            [[80, 40, 20], [200, 40, 20], [200, 40, 0], [280, 40, 0], [280, 40, 40], [80, 40, 40]],
            faceX(280, 0, 40, 0, 40),
          ], [
            t3(M, [3, 40, 30], [77, 40, 30]), t3(M, [83, 40, 30], [277, 40, 30]),
            t3(M, [3, 40, 10], [197, 40, 10]), t3(M, [203, 40, 10], [277, 40, 10]),
            poly(M, rond3([110, 12, 40], 5, 'xy'), BLANC), poly(M, rond3([170, 28, 40], 5, 'xy'), BLANC),
          ].join('\n')]]);
          return [bas, axes1, haut, axes2, chev, cote, appui, monte].join('\n');
        },
        renvois: z => {
          const [E, M] = repEn(z);
          return [
            { n: 8, rond: E.uv(125, 0), cible: E(133, 0, 20), texte: 'recouvrement : plusieurs ép.' },
            { n: 9, rond: M.uv(175, -12), cible: M(175, 28, 40), texte: 'deux chevilles, deux fibres' },
            { n: 10, rond: M.uv(58, 114), cible: M(115, 45, -35), texte: 'joint posé sur un appui' },
          ];
        },
      },
    },
  };
};
