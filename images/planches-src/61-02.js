// 36-02 — Les deux doigts en V (ch. 36, points 9 et 10).
// « Lame vers le haut, deux doigts en V de chaque côté de la lame ; les doigts poussent la
// panse vers le bas pendant que la lame coupe vers le haut. »
//
// Un seul repère pour les deux vues, en unités propres (à peu près des millimètres) :
// x le long de la fente, négatif vers le sternum (à gauche), positif vers le bassin et la
// main ; la fente s'ouvre à x = 0. Vue de dessus : y = 0 sur l'axe de la fente. Vue de côté :
// y = 0 à la surface du poil, y = EP sous la paroi, vers le bas = dans le ventre.
// Main gauche, paume vers le haut ; le couteau dans l'autre main, qu'on ne dessine pas.

// ─── géométrie ───────────────────────────────────────────────────────────────────────
const lisse = (pts, n = 8) => {
  if (pts.length < 3) return pts;
  const out = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(i + 2, pts.length - 1)];
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map(j => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t
        + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
};
const D = (pts, ferme = false) => 'M' + pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' L') + (ferme ? ' Z' : '');
const mir = pts => pts.map(p => [p[0], -p[1]]);

// Un doigt vu de dessus : de la base b au bout t, largeur wb → wt, bout arrondi.
const doigt = (b, t, wb, wt) => {
  const dx = t[0] - b[0], dy = t[1] - b[1], L = Math.hypot(dx, dy);
  const u = [dx / L, dy / L], n = [-u[1], u[0]];
  const cote = (k, f) => [b[0] + u[0] * L * f + n[0] * k * (wb + (wt - wb) * f) / 2,
    b[1] + u[1] * L * f + n[1] * k * (wb + (wt - wb) * f) / 2];
  const bout = [...Array(9)].map((_, i) => {
    const a = Math.PI / 2 - Math.PI * i / 8;
    return [t[0] + (n[0] * Math.sin(a) + u[0] * Math.cos(a)) * wt / 2, t[1] + (n[1] * Math.sin(a) + u[1] * Math.cos(a)) * wt / 2];
  });
  const contour = [cote(1, 0), cote(1, 0.5), ...bout, cote(-1, 0.5), cote(-1, 0)];
  const pli = f => [cote(1, f), cote(-1, f)];
  return { contour, plis: [pli(0.36), pli(0.68)] };
};

// ─── vue de dessus ───────────────────────────────────────────────────────────────────
const X0 = -80, X1 = 148;                        // étendue commune en x
const LEVRE_H = lisse([[0, 0], [8, -7], [20, -19], [40, -33], [62, -42], [100, -48], [148, -52]]);
const LEVRE_B = lisse([[0, 0], [8, 7], [20, 19.5], [40, 34], [62, 43], [100, 49], [148, 53]]);
const TRANCHE_H = lisse([[7, -3], [14, -9.5], [25, -19], [42, -29], [63, -37.5], [100, -43.5], [148, -47.5]]);
const TRANCHE_B = mir(TRANCHE_H).map(p => [p[0], p[1] + 0.8]);
const FENTE = [...LEVRE_H, [170, -70], [170, 70], ...LEVRE_B.slice().reverse()];

// la main gauche, paume en l'air : majeur en haut, index en bas, pouce en bas
const MAJEUR = doigt([15, -9], [-64, -28], 17, 15);
const INDEX = doigt([15, 9.5], [-57, 26], 16, 14);
const PAUME_H = lisse([[15, -17.5], [22, -26], [34, -30], [50, -29.5], [72, -25], [104, -21], [152, -20]]);
// le bord bas de la paume passe par la base du pouce : il continue en bord du pouce, sans bout libre
const PAUME_B = lisse([[152, 21], [118, 25], [94, 29.4], [81.4, 31.9], [62, 28], [44, 22.5], [15, 17.5]]);
const PAUME = PAUME_H.concat(PAUME_B);
const POUCE = doigt([80, 23], [36, 30], 18, 15);
const REPLIS = [   // annulaire et auriculaire repliés dans la paume
  lisse([[17, -18.5], [30, -21.5], [44, -22], [58, -27.5]]),
];
// le couteau vu de dessus : le dos de la lame en bas, le fil tourné vers l'œil
const LAME_P = [[-38, 0], [-30, -1.3], [0, -1.8], [56, -1.8], [56, 1.8], [0, 1.8], [-30, 1.3]];   // pointe au même x que dans la vue de côté
const GARDE_P = [[56, -6.5], [62, -6.5], [62, 6.5], [56, 6.5]];
const MANCHE_P = lisse([[62, -8.5], [110, -9.5], [121, -8.5], [128, -3], [128, 3], [121, 8.5], [110, 9.5], [62, 8.5]]);

// poils : tirage fixe, hors de la fente et hors des doigts
const POILS = (() => {
  let g = 3602;
  const r = () => (g = (g * 1103515245 + 12345) % 2147483648) / 2147483648;
  const dans = (p, poly) => {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > p[1]) !== (yj > p[1]) && p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  const loin = (p, pts, d) => pts.every(q => Math.hypot(q[0] - p[0], q[1] - p[1]) > d);
  const out = [];
  for (let k = 0; k < 400 && out.length < 36; k++) {
    const p = [X0 + 4 + r() * (X1 - X0 - 8), -42 + r() * 84];
    if (dans(p, FENTE) || !loin(p, LEVRE_H.concat(LEVRE_B), 6)) continue;
    if ([MAJEUR, INDEX, POUCE].some(d => dans(p, d.contour)) || dans(p, PAUME)) continue;
    if (p[0] > 50 && Math.abs(p[1]) < 14) continue;
    if (Math.hypot(p[0] + 70, p[1]) < 13) continue;              // la pastille 1, dans le V
    if (!loin(p, out, 11)) continue;
    out.push(p);
  }
  return out;
})();

// ─── vue de côté ─────────────────────────────────────────────────────────────────────
const EP = 12;                                   // épaisseur de la paroi, poil compris
const TH = 18 * Math.PI / 180, C = Math.cos(TH), S = Math.sin(TH);
const O = [-40.9, 13.29];                       // origine du fil : s le long, v vers le dos
const K = (s, v) => [O[0] + s * C + v * S, O[1] - s * S + v * C];
const LAME = [...lisse([[0, 6], [8, 2], [22, 0.2], [36, 0]], 6), [95, 0], [95, 18], ...lisse([[45, 18], [22, 15.5], [8, 11], [0, 6]], 6)].map(p => K(...p));
const FIL = lisse([[0, 6], [8, 2], [22, 0.2], [36, 0]], 6).concat([[95, 0]]).map(p => K(...p));
const BISEAU = [K(26, 4.2), K(95, 4.2)];                 // le biseau : il dit où est le fil
const GARDE = [[95, -3], [100, -3], [100, 21], [95, 21]].map(p => K(...p));
const MANCHE = lisse([[100, -1], [155, -2], [166, 0.5], [171, 9], [166, 17.5], [155, 20], [100, 19]]).map(p => K(...p));
// où le fil traverse le dessous et le dessus de la paroi
const traverse = y => {
  for (let i = 0; i < FIL.length - 1; i++) {
    const [a, b] = [FIL[i], FIL[i + 1]];
    if ((a[1] - y) * (b[1] - y) <= 0) return [a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]), y];
  }
};
const F_DESSOUS = traverse(EP), F_DESSUS = traverse(0);
// la main vue du côté du majeur : pulpe contre le dessous de la paroi, dos vers le ventre
// le bout du doigt est rond : les deux moitiés arrivent à la verticale en (-66, 20)
const MAIN_HAUT = lisse([[-66, 20], [-65.6, 16.4], [-62.6, 13.3], [-54, 12.2], [-30, 12], [-5, 12], [12, 11.5], [26, 9.5],
  [42, 7], [62, 3], [90, -1.5], [120, -4.5], [148, -6.5]]);
const MAIN_C = MAIN_HAUT
  .concat(lisse([[148, 23], [120, 28], [90, 33], [62, 37], [36, 36], [18, 30.5], [2, 28.5], [-12, 29], [-24, 27.8],
    [-38, 28], [-50, 26.8], [-58, 26.3], [-63.2, 25], [-65.6, 23.5], [-66, 20]]));
const MAIN_N = MAIN_HAUT.length;                // points du dessus de la main
const PLIS_C = [
  lisse([[-60.5, 25], [-55, 26.8], [-48, 26.9]]),              // ongle, du côté du dos
  lisse([[-36, 12.4], [-35, 15]]), lisse([[-11, 12.4], [-10, 15.5]]),   // plis de la pulpe
];

module.exports = (h) => {
  const blanc = a => a.replace('fill="none"', 'fill="#fff"');
  const place = (z, y0, y1) => {
    const s = Math.min(z.l / (X1 - X0), z.h / PAN);
    const ox = (z.l - (X1 - X0) * s) / 2 - X0 * s, oy = (z.h - (y1 - y0) * s) / 2 - y0 * s;
    const T = p => [ox + p[0] * s, oy + p[1] * s];
    return { s, T, M: pts => pts.map(T) };
  };
  const clip = (id, d, dehors, z) => dehors
    ? `<clipPath id="${id}"><path fill="none" clip-rule="evenodd" d="M-60,-60 H${z.l + 60} V${z.h + 60} H-60 Z ${d}"/></clipPath>`
    : `<clipPath id="${id}"><path fill="none" d="${d}"/></clipPath>`;

  const DESSUS = [-40, 40], COTE = [-44, 45];
  const PAN = 89;                                // même échelle pour les deux vues

  return {
    ref: '61-02',
    titre: 'Les deux doigts en V',
    desc: 'Ouvrir la paroi du ventre sans percer la panse. Vu de dessus : la main gauche, paume en l’air, glisse l’index et le majeur sous la paroi par la fente déjà ouverte et les écarte en V ; la lame passe entre les deux, et sa pointe reste à l’abri entre les bouts des doigts. De côté, la paroi coupée dans l’axe : le fil de la lame est tourné vers le haut et tranche la paroi par-dessous, en biais, pendant que le dos des doigts appuie vers le bas.',
    format: 'quart',
    disposition: [['dessus'], ['cote']],
    vues: {
      dessus: {
        titre: 'Vu de dessus',
        dessin: z => {
          const { s, M } = place(z, ...DESSUS);
          const fente = D(M(FENTE), true);
          // le pouce par-dessus le bord de la paume ; son bord intérieur part en pli, pas en bout coupé
          const [p0, p1] = POUCE.contour;
          const pli = [p0[0] + (p1[0] - p0[0]) * 0.45, p0[1] + (p1[1] - p0[1]) * 0.45];
          const main = [
            h.path(D(M(PAUME), true), h.a.blanc),
            h.path(D(M(PAUME_H)) + ' ' + D(M(PAUME_B)), h.a.arete),
            h.path(D(M(POUCE.contour)) + ' Z', h.a.blanc),
            h.path(D(M([pli, ...POUCE.contour.slice(1)])), h.a.arete),
            ...[MAJEUR, INDEX].map(d => h.path(D(M(d.contour)) + ' Z', h.a.blanc)),
            ...[MAJEUR, INDEX].map(d => h.path(D(M(d.contour)), h.a.arete)),
            h.path([...MAJEUR.plis, ...INDEX.plis, ...REPLIS].map(p => D(M(p))).join(' '), h.a.detail),
          ];
          const cache = [PAUME_H, PAUME_B, POUCE.contour, MAJEUR.contour, INDEX.contour]
            .map(p => h.path(D(M(p)), h.a.cache)).concat([h.path(D(M(LAME_P), true), h.a.cache)]);
          return [`<clipPath id="zcadre"><rect fill="none" x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath><g clip-path="url(#zcadre)">`,
            clip('zfente', fente, false, z),
            clip('zpeau', fente, true, z),
            `<g clip-path="url(#zfente)">${main.join('\n')}\n${h.path(D(M(LAME_P), true), blanc(h.a.arete))}</g>`,
            `<g clip-path="url(#zpeau)">${cache.join('\n')}</g>`,
            h.path(D(M(TRANCHE_H)) + ' ' + D(M(TRANCHE_B)), h.a.detail),
            h.path(D(M(LEVRE_H)) + ' ' + D(M(LEVRE_B)), h.a.contour),
            h.path(POILS.map(p => {
              const a = -1.05 + 0.5 * Math.sin(p[0] * 0.37 + p[1]);
              return `M${M([p])[0].map(v => v.toFixed(1)).join(',')} l${(4.5 * s * Math.cos(a)).toFixed(1)},${(4.5 * s * Math.sin(a)).toFixed(1)}`;
            }).join(' '), h.a.fin),
            h.path(D(M(GARDE_P), true), blanc(h.a.arete)),
            // manche vu par le dos, tranchant en haut : les rivets sont sur les flancs, on ne les voit pas
            h.path(D(M(MANCHE_P), true), blanc(h.a.arete)),
            '</g>',
          ].join('\n');
        },
        renvois: z => {
          const { M } = place(z, ...DESSUS);
          return [
            { n: 1, rond: M([[-70, 0]])[0], cible: M([[-44.2, 15.7]])[0], texte: 'deux doigts en V, la lame entre' },   // la pastille dans le V, le trait sur le bord de l’index
          ];
        },
      },
      cote: {
        titre: 'De côté, la paroi coupée dans l’axe',
        dessin: z => {
          const { s, M } = place(z, ...COTE);
          const mainD = D(M(MAIN_C), true);
          const paroi = [[X0, 0], F_DESSUS, F_DESSOUS, [X0, EP]];
          const coupe = h.path(D(M(paroi.slice(0, 3))) + ' L' + M([paroi[3]])[0].map(v => v.toFixed(1)).join(','), h.a.contour);
          const casse = h.path(D(M([[X0, -1], [X0 + 2, 3], [X0 - 1.5, 6], [X0 + 1.5, 9], [X0, EP + 1]])), h.a.fin);
          const peauX = traverse(3.2)[0];
          const poils = [];
          for (let x = X0 + 4; x < F_DESSUS[0] - 3; x += 5.5) poils.push(`M${M([[x, 0]])[0].map(v => v.toFixed(1)).join(',')} l${(-1.8 * s).toFixed(1)},${(-3.6 * s).toFixed(1)}`);
          return [
            clip('zmain', mainD, false, z),
            clip('zhors', mainD, true, z),
            // la lame devant la lèvre, derrière le majeur
            `<g clip-path="url(#zhors)">${h.path(D(M(LAME), true), blanc(h.a.arete))}
${h.path(D(M(BISEAU)), h.a.detail)}</g>`,
            h.path(mainD, h.a.blanc),
            h.path(D(M(MAIN_C.slice(0, MAIN_N))) + ' ' + D(M(MAIN_C.slice(MAIN_N))), h.a.arete),
            h.path(PLIS_C.map(p => D(M(p))).join(' '), h.a.detail),
            `<g clip-path="url(#zmain)">${h.path(D(M(LAME), true), h.a.cache)}</g>`,
            h.path(D(M(GARDE), true), blanc(h.a.arete)),
            h.path(D(M(MANCHE)) + ' Z', blanc(h.a.arete)),
            h.cercle(...M([K(120, 9)])[0], 2.2 * s, h.a.detail),
            h.cercle(...M([K(146, 9)])[0], 2.2 * s, h.a.detail),
            // la paroi en coupe, par-dessus tout
            h.path(D(M(paroi), true), h.a.blanc),
            coupe, casse,
            h.path(D(M([[X0, 3.2], [peauX, 3.2]])), h.a.fin),
            h.path(poils.join(' '), h.a.fin),
            // les gestes : on avance vers le sternum ; les doigts appuient vers le bas
            h.fleche(`M${M([[-22, -15]])[0].join(' ')} L${M([[-62, -15]])[0].join(' ')}`),
            h.fleche(`M${M([[-38, 31.5]])[0].join(' ')} L${M([[-38, 43]])[0].join(' ')}`),
          ].join('\n');
        },
        renvois: z => {
          const { M } = place(z, ...COTE);
          return [
            { n: 2, rond: M([[-6, -34]])[0], cible: M([K(24, 0.2)])[0], texte: 'tranchant vers le haut' },
            { n: 3, rond: M([[-68, 34]])[0], cible: M([[-47, 28]])[0], texte: 'les doigts repoussent la panse' },
          ];
        },
      },
    },
  };
};
