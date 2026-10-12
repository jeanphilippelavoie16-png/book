// 87-01a — La mortaise et le tenon, le mi-bois (chapitre 87, §5.3 à 5.6)
// Axonométrie maison : x file en bas à droite, y en bas à gauche, z monte. Les faces vues
// sont +x, +y et le dessus. Chaque pièce : un liseré épais d'abord, ses faces blanches par-dessus.

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

// ─── les pièces (unités arbitraires, proportions seulement : aucune cote tirée de là) ───
// montant 90 × 90 ; traverse 60 × 100 ; tenon au tiers ; mortaise un peu plus longue et plus
// profonde que le tenon ; cheville traversant les deux joues.
const G = 70;                                  // écart de l'éclaté
const XT = 90 + G, XE = XT + 60;               // bout du tenon, épaulement
const ptsMT = [...coins(0, 90, 0, 90, 0, 210), ...coins(XT, 340, 15, 75, 60, 160), ...coins(59, 71, 125, 215, 104, 116)];
const repMT = z => cadre(ptsMT, [40, 8, z.l - 52, z.h - 16]);

const repFace = z => {
  const s = Math.min((z.l - 40) / 90, (z.h - 24) / 170), x0 = 4, y0 = (z.h - 170 * s) / 2;
  const F = (y, zz) => [x0 + y * s, y0 + (195 - zz) * s];
  F.s = s;
  return F;
};
const repC = z => {
  const s = Math.min((z.l - 44) / 180, (z.h - 84) / 90), cx = 34, cy = (z.h - 90 * s) / 2 + 4;
  const C = (x, y) => [cx + x * s, cy + y * s];
  C.s = s;
  return C;
};
const GM = 120;                                // levée du mi-bois éclaté (à 100, le bout de la pièce haute touchait le bloc de gauche)
const miE = [...coins(0, 150, 0, 44, 0, 40), ...coins(53, 97, -53, 97, GM, GM + 40)];
const miM = [...coins(0, 150, 0, 44, 0, 40), ...coins(53, 97, -53, 97, 0, 40)];
const repMi = z => {
  const rE = [4, 6, 165, z.h - 12], rM = [190, 60, z.l - 194, z.h - 70];
  const s = Math.min(echelle(miE, rE), echelle(miM, rM));
  return [cadre(miE, rE, s), cadre(miM, rM, s)];
};

module.exports = (h) => {
  const BLANC = h.a.arete.replace('fill="none"', 'fill="#FFFFFF"');
  const SOUS = h.a.contour.replace('fill="none"', 'fill="#FFFFFF"').replace('stroke-width="2.4"', 'stroke-width="3.4"');
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
  // cernes du bois de bout : arcs d'un cœur situé hors de la face
  const cernes = (P, f, c, rs, dans) => rs.map(r => {
    const runs = [[]];
    for (let i = 0; i <= 180; i++) {
      const t = 2 * Math.PI * i / 180, q = f(c[0] + r * Math.cos(t), c[1] + r * Math.sin(t));
      if (dans(q)) runs[runs.length - 1].push(P(...q)); else if (runs[runs.length - 1].length) runs.push([]);
    }
    return runs.filter(u => u.length > 1).map(u => h.chemin(u, h.a.detail)).join('\n');
  }).join('\n');

  return {
    ref: '110-01a',
    titre: 'La mortaise et le tenon, le mi-bois',
    desc: 'Mortaise et tenon chevillé en vue éclatée : montant percé d’une mortaise, traverse avec son tenon et ses épaulements, trou du tenon décalé vers l’épaulement pour le chevillage à tire, cheville fendue. À côté, la face du montant avec le tracé au trusquin et la file de trous au vilebrequin. Dessous, une coupe à hauteur de cheville montrant le tenon serré entre les joues, l’épaulement en appui et le fond de mortaise plus creux que le tenon ; et un mi-bois en croix, éclaté puis monté. Encadré danger : un assemblage qui porte cède sans prévenir, en glissant le long du fil.',
    format: 'pleine',
    disposition: [['mt', 'face'], ['coupe', 'mibois']],
    hauteurs: [3, 2],
    largeurs: [[3, 1], [2, 3]],
    vues: {
      // ── la face du montant : tracer, percer ──
      face: {
        titre: 'Tracer et percer',
        dessin: z => {
          const F = repFace(z), s = F.s, o = [];
          const brisure = zz => h.path(`M${F(0, zz)} C${F(30, zz + 6)} ${F(60, zz - 6)} ${F(90, zz)}`, h.a.arete);
          for (const y of [8, 18, 73, 83]) o.push(h.ligne(...F(y, 191), ...F(y, 29), h.a.detail));
          for (const zc of [83.5, 110, 136.5]) o.push(h.cercle(...F(45, zc), 14 * s, h.a.plein));
          o.push(h.ligne(...F(31, 62), ...F(31, 158), h.a.detail), h.ligne(...F(59, 62), ...F(59, 158), h.a.detail));
          o.push(h.ligne(...F(25, 68), ...F(65, 68), h.a.detail), h.ligne(...F(25, 152), ...F(65, 152), h.a.detail));
          o.push(h.ligne(...F(0, 195), ...F(0, 25), h.a.contour), h.ligne(...F(90, 195), ...F(90, 25), h.a.contour));
          o.push(brisure(195), brisure(25));
          return o.join('\n');
        },
        renvois: z => {
          const F = repFace(z);
          const a = F(59, 156), b = F(57.1, 103), c = F(45, 67.4);
          return [
            { n: 1, rond: [F(90, 0)[0] + 16, a[1] - 24], cible: a, texte: 'trusquin réglé une seule fois' },
            { n: 2, rond: [F(90, 0)[0] + 16, b[1] + 4], cible: b, texte: 'file de trous au vilebrequin' },
            { n: 3, rond: [F(90, 0)[0] + 16, c[1] + 26], cible: c, texte: '1 à 2 mm laissés aux bouts' },
          ];
        },
      },

      // ── l'éclaté : montant, traverse et tenon, cheville ──
      mt: {
        titre: 'Mortaise et tenon, éclaté',
        dessin: z => {
          const P = repMT(z);
          const montant = piece(P, [[boite(0, 90, 0, 90, 0, 210), [
            ...[14, 36, 80].map(x => t3(P, [x, 90, 8], [x, 90, 202])),
            ...[12, 77].map(y => t3(P, [90, y, 8], [90, y, 202])),
            cernes(P, (a, b) => [a, b, 210], [-25, -35], [60, 85, 110], q => q[0] > 3 && q[0] < 87 && q[1] > 3 && q[1] < 87),
            poly(P, faceX(90, 31, 59, 68, 152), h.a.plein),
            trou(P, [65, 90, 110], 6, 'xz'),
          ].join('\n')]]);
          const axes = t3(P, [90, 45, 110], [XT, 45, 110], AXE) + '\n' + t3(P, [65, 90, 110], [65, 125, 110], AXE);
          const traverse = piece(P, [
            [[dessus(XT, XE, 31, 59, 150), faceY(59, XT, XE, 70, 150)], [
              ...[88, 132].map(zz => t3(P, [XT + 3, 59, zz], [XE - 2, 59, zz])),
              trou(P, [XE - 22.5, 59, 110], 6, 'xz'),   // 2,5 plus près de l'épaulement que le trou du montant : chevillage à tire
            ].join('\n')],
            [boite(XE, 340, 15, 75, 60, 160), [
              ...[80, 104, 140].map(zz => t3(P, [XE + 3, 75, zz], [337, 75, zz])),
              ...[30, 57].map(y => t3(P, [XE + 3, y, 160], [337, y, 160])),
              cernes(P, (a, b) => [340, a, b], [112, 38], [44, 68, 92], q => q[1] > 18 && q[1] < 72 && q[2] > 63 && q[2] < 157),
            ].join('\n')],
          ]);
          const chev = cheville(P, [[[65, 125, 110], 3.5], [[65, 141, 110], 6], [[65, 215, 110], 6]], 'xz',
            t3(P, [67.5, 146, 112.5], [67.5, 211, 112.5]));
          return [montant, axes, traverse, chev].join('\n');
        },
        renvois: z => {
          const P = repMT(z);
          return [
            { n: 4, rond: P.uv(116, -128), cible: P(90, 31, 128), texte: 'parois dressées au ciseau' },
            { n: 5, rond: P.uv(153, -128), cible: P(XT + 18, 31, 150), texte: 'tenon libre dans sa largeur' },
            { n: 6, rond: P.uv(128, 64), cible: P(XE, 75, 76), texte: 'épaulements tout autour' },
            { n: 7, rond: P.uv(98, 40), cible: P(XE - 26.5, 59, 105.5), texte: 'trou décalé côté épaulement' },
            { n: 8, rond: P.uv(-78, 18), cible: P(59, 215, 110), texte: 'cheville de bouleau, fendue' },
          ];
        },
      },

      // ── coupe horizontale à hauteur de cheville ──
      coupe: {
        titre: 'Chevillé, en coupe',
        dessin: z => {
          const C = repC(z), s = C.s, o = [];
          o.push(h.chemin([C(0, 0), C(90, 0), C(90, 31), C(24, 31), C(24, 59), C(90, 59), C(90, 90), C(0, 90)], h.a.hachure('bois'), true));
          o.push(h.chemin([C(30, 31), C(90, 31), C(90, 15), C(180, 15), C(180, 75), C(90, 75), C(90, 59), C(30, 59)], BLANC, true));
          for (const y of [38, 45, 52]) o.push(h.ligne(...C(33, y), ...C(177, y), h.a.detail));
          for (const y of [23, 67]) o.push(h.ligne(...C(93, y), ...C(177, y), h.a.detail));
          o.push(h.rect(...C(0, 0), 90 * s, 90 * s, h.a.contour));
          o.push(h.chemin([C(90, 15), C(180, 15), C(180, 75), C(90, 75)], h.a.contour));
          o.push(h.rect(...C(60, 0), 10 * s, 90 * s, BLANC));
          for (const x of [63, 67]) o.push(h.ligne(...C(x, 3), ...C(x, 87), h.a.detail));
          return o.join('\n');
        },
        renvois: z => {
          const C = repC(z);
          const a = C(42, 59), b = C(90, 23), c = C(24.6, 45), d = C(65, 90);
          return [
            { n: 9, rond: [a[0] - 22, a[1] + 56], cible: a, texte: 'tenon serré entre les joues' },
            { n: 10, rond: [b[0] + 34, b[1] - 52], cible: b, texte: 'c’est l’épaulement qui porte' },
            { n: 11, rond: [C(0, 45)[0] - 22, c[1]], cible: c, texte: 'fond plus creux que le tenon' },
            { n: 12, rond: [d[0] + 26, d[1] + 34], cible: d, texte: 'cheville coupée à fleur' },
          ];
        },
      },

      // ── le mi-bois en croix, éclaté puis monté ──
      mibois: {
        titre: 'Mi-bois, éclaté et monté',
        dessin: z => {
          const [E, M] = repMi(z);
          const marque = [];
          for (let i = 0; i <= 28; i++) { const t = Math.PI * (0.5 + 2 * i / 28); marque.push([122 + 6 * Math.cos(t), 18 + 5 * Math.sin(t), 40]); }
          marque.push([117, 42, 40]);
          const bas = piece(E, [[[
            dessus(53, 97, 0, 44, 20), faceX(53, 0, 44, 20, 40), dessus(0, 53, 0, 44, 40), dessus(97, 150, 0, 44, 40),
            [[0, 44, 0], [150, 44, 0], [150, 44, 40], [97, 44, 40], [97, 44, 20], [53, 44, 20], [53, 44, 40], [0, 44, 40]],
            faceX(150, 0, 44, 0, 40),
          ], h.chemin(marque.map(q => E(...q)), h.a.detail)]]);
          const g = GM;
          const haut = piece(E, [[[
            [[77, 0, g], [97, 0, g], [97, 0, g + 20]],
            dessus(53, 97, -53, 97, g + 40),
            [[97, -53, g], [97, 0, g], [97, 0, g + 20], [97, 44, g + 20], [97, 44, g], [97, 97, g], [97, 97, g + 40], [97, -53, g + 40]],
            faceY(97, 53, 97, g, g + 40),
          ]]]);
          const c1 = E(58, 44, 20), c2 = E(58, 44, 40);
          const monte = piece(M, [[[
            faceX(97, -53, 0, 0, 40),
            dessus(0, 150, 0, 44, 40), faceY(44, 0, 150, 0, 40), faceX(150, 0, 44, 0, 40),
            dessus(53, 97, -53, 97, 40), faceX(97, 44, 97, 0, 40), faceY(97, 53, 97, 0, 40),
          ]]]);
          return [bas, haut, h.cote(c1[0], c1[1], c2[0], c2[1], '½ ép.', { cote: 'gauche' }), monte].join('\n');
        },
        renvois: z => {
          const [E] = repMi(z);
          return [
            { n: 13, rond: E.uv(135, -10), cible: E(128, 18, 40), texte: 'face de référence, marquée' },
            { n: 14, rond: E.uv(120, -64), cible: E(97, 0, GM + 10), texte: 'joues sciées jusqu’au trait' },
            { n: 15, rond: E.uv(64, -26), cible: E(64, 2, 20), texte: 'fond dressé à plat' },
          ];
        },
      },
    },
    danger: 'Un assemblage qui porte ne prévient pas : le bout du tenon, ou le bois devant la cheville, part d’un coup en glissant le long du fil.',
  };
};
