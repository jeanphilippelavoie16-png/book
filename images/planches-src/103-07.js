// 80-07 — Le contre-toron. Séquence : plier et tordre, passer par-dessus, rallonger.
// Vue de face, comme le fabricant voit ses mains : le corps est du côté du lecteur.
// La charte : les brins au contour, le rouge sur les deux gestes (tordre, passer par-dessus).

const K = 1.25;            // échelle des deux premières vues (la main donne la grandeur)
const W = 11 * K;          // largeur d'un brin

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
const tangentes = c => c.map((p, i) => {
  const a = c[Math.max(i - 1, 0)], b = c[Math.min(i + 1, c.length - 1)];
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
  return [dx / L, dy / L];
});
const longueurs = c => {
  const s = [0];
  for (let i = 1; i < c.length; i++) s.push(s[i - 1] + Math.hypot(c[i][0] - c[i - 1][0], c[i][1] - c[i - 1][1]));
  return s;
};
const D = pts => 'M' + pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' L');
const aS = (c, L, s) => {
  let i = 1;
  while (i < c.length - 1 && L[i] < s) i++;
  const u = Math.min(1, Math.max(0, (s - L[i - 1]) / ((L[i] - L[i - 1]) || 1)));
  return { p: [c[i - 1][0] + u * (c[i][0] - c[i - 1][0]), c[i - 1][1] + u * (c[i][1] - c[i - 1][1])], i };
};
// le demi-tour du pli : de dessous à dessus, par la gauche
const U = (cx, r) => [...Array(9)].map((_, i) => {
  const t = Math.PI / 2 + Math.PI * i / 8;
  return [cx + r * Math.cos(t), r * Math.sin(t)];
});

// Un brin de fibres : bande à bord franc, fibres libres ou marques de torsion, bout effiloché.
const brin = (h, pts, o = {}) => {
  const c = lisse(pts, 10), t = tangentes(c), L = longueurs(c), tot = L[L.length - 1];
  const w = s => (typeof o.w === 'function' ? o.w(s / tot) : (o.w || W));
  const nrm = i => [-t[i][1], t[i][0]];
  const G = c.map((p, i) => [p[0] + nrm(i)[0] * w(L[i]) / 2, p[1] + nrm(i)[1] * w(L[i]) / 2]);
  const Dr = c.map((p, i) => [p[0] - nrm(i)[0] * w(L[i]) / 2, p[1] - nrm(i)[1] * w(L[i]) / 2]);
  const out = [
    h.path(D(G.concat(Dr.slice().reverse())) + ' Z', h.a.blanc),
    h.path(D(G), h.a.contour),
    h.path(D(Dr), h.a.contour),
  ];
  for (const [u0, u1] of (o.fibres || [])) {
    for (const f of [-0.2, 0.18]) {
      const q = [];
      for (let i = 0; i < c.length; i++) {
        const u = L[i] / tot;
        if (u < u0 || u > u1) continue;
        const off = f * w(L[i]) + 0.6 * Math.sin(L[i] / 7 + f * 10);
        q.push([c[i][0] + nrm(i)[0] * off, c[i][1] + nrm(i)[1] * off]);
      }
      if (q.length > 1) out.push(h.path(D(q), h.a.fin));
    }
  }
  // marques de torsion : pas une hachure, le tracé suit le brin et reste entre ses bords
  if (o.torsade) {
    const [u0, u1] = o.torsade, seg = [];
    for (let s = u0 * tot; s <= u1 * tot; s += (o.pas || 8.5)) {
      const { p, i } = aS(c, L, s);
      const n = nrm(i), tt = t[i], ww = w(s) / 2 - 1.2, k = ww * 0.7;
      // « / » par rapport au sens du brin, en arc : la fibre qui s'enroule autour du brin
      const a = [p[0] + n[0] * ww - tt[0] * k, p[1] + n[1] * ww - tt[1] * k];
      const b = [p[0] - n[0] * ww + tt[0] * k, p[1] - n[1] * ww + tt[1] * k];
      const q = [p[0] + tt[0] * k * 0.9, p[1] + tt[1] * k * 0.9];
      seg.push(`M${a[0].toFixed(1)},${a[1].toFixed(1)} Q${q[0].toFixed(1)},${q[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}`);
    }
    out.push(h.path(seg.join(' '), h.a.detail));
  }
  const effiloche = (i, sgn) => {
    const p = c[i], tt = [t[i][0] * sgn, t[i][1] * sgn], n = nrm(i), we = w(L[i]);
    return h.path([[-0.36, 10], [-0.16, 17], [0.02, 12], [0.2, 18], [0.38, 9]].map(([f, len]) => {
      const a = f * 0.9 * sgn;
      const dir = [tt[0] * Math.cos(a) - tt[1] * Math.sin(a), tt[0] * Math.sin(a) + tt[1] * Math.cos(a)];
      const s0 = [p[0] + n[0] * f * we - tt[0] * 3, p[1] + n[1] * f * we - tt[1] * 3];
      return D([s0, [s0[0] + dir[0] * len, s0[1] + dir[1] * len]]);
    }).join(' '), h.a.detail);
  };
  if (o.bout !== false) out.push(effiloche(c.length - 1, 1));
  if (o.debut) out.push(effiloche(0, -1));
  return out.join('\n');
};

// Point du bord d'un brin (haut : -1, bas : +1) à l'abscisse x, pour poser une ligne de rappel au contact.
const bord = (pts, x, cote, w = W) => {
  const c = lisse(pts, 10), t = tangentes(c);
  let i = 0;
  c.forEach((p, j) => { if (Math.abs(p[0] - x) < Math.abs(c[i][0] - x)) i = j; });
  let n = [-t[i][1], t[i][0]];
  if (n[1] * cote < 0) n = [-n[0], -n[1]];
  return [c[i][0] + n[0] * (w / 2 + 0.6), c[i][1] + n[1] * (w / 2 + 0.6)];
};

// La main gauche qui pince le pli entre la pulpe du pouce et celle de l'index : la main simple (mains/moteur.js),
// pince fine vue du côté du pouce. Le fabricant voit ses mains : l'avant-bras vient de lui, sort par le bas de la
// vue. Les brins sortent de la pince à droite ; la boucle du pli est cachée sous les doigts. L'objet tenu est le
// faisceau des deux brins, découpé au cylindre de la prise : le pouce passe devant, l'index derrière.
const poser = (h, o, axe, vers) => {
  const base = Object.assign({}, o, { angle: 0, avantbras: { longueur: 100 } }); delete base.objet;
  const e0 = h.formes.mainSimple(base); let best = null;
  for (const k of [0, 180]) {
    const a = axe - e0.prise.angle + k, m = h.formes.mainSimple(Object.assign({}, base, { angle: a }));
    const d = [m.coude[0] - m.poignet[0], m.coude[1] - m.poignet[1]], v = [vers[0] - m.poignet[0], vers[1] - m.poignet[1]];
    const c = (d[0] * v[0] + d[1] * v[1]) / ((Math.hypot(d[0], d[1]) * Math.hypot(v[0], v[1])) || 1);
    if (!best || c > best.c) best = { a, c };
  }
  return best.a;
};
const PINCE = { x: -14, y: 0, pose: 'pince-fine', vue: 'pouce', ech: 1.2, d: 10, vers: [-40, 300], rot: null, objet: true };
let nPince = 0;
const main = (h, P, z, brins) => {
  const [x, y] = P([PINCE.x, PINCE.y]);
  const o = { x, y, pose: PINCE.pose, vue: PINCE.vue, cote: 'gauche', echelle: PINCE.ech, diametre: PINCE.d, ...(PINCE.rot ? { rotation: PINCE.rot } : {}) };
  const vers = P(PINCE.vers);
  const id = `pince-103-07-${++nPince}`;
  const bande = g => {
    const u = [Math.cos(g.angle * Math.PI / 180), Math.sin(g.angle * Math.PI / 180)], v = [-u[1], u[0]], L = 400, r = g.r;
    const c = (s, t) => `${(g.x + u[0] * s + v[0] * t).toFixed(1)},${(g.y + u[1] * s + v[1] * t).toFixed(1)}`;
    return `<clipPath id="${id}"><path d="M${c(-L, -r)} L${c(L, -r)} L${c(L, r)} L${c(-L, r)} Z"/></clipPath>\n<g clip-path="url(#${id})">\n${brins}\n</g>`;
  };
  return h.formes.mainSimple({ ...o, angle: poser(h, o, 0, vers), ...(PINCE.objet ? { objet: bande, masque: false } : {}),
    avantbras: { vers, bord: { x0: 0, y0: 0, x1: z.l, y1: z.h }, bras: { pli: 0 } } }).svg;
};

// Anneau de rotation autour d'un brin : moitié arrière en caché, moitié avant fléchée en rouge (le geste).
const anneau = (h, cx, cy, rx, ry, sens) => ({
  derriere: h.path(`M${cx},${cy - ry} A${rx} ${ry} 0 0 0 ${cx},${cy + ry}`, h.a.cache),
  devant: sens === 'monte'
    ? h.geste(`M${cx},${cy + ry} A${rx} ${ry} 0 0 0 ${cx},${cy - ry}`)
    : h.geste(`M${cx},${cy - ry} A${rx} ${ry} 0 0 1 ${cx},${cy + ry}`),
});

// Corde commise : suite de tronçons en « \ », bosses au contour, pli arrondi à gauche.
const corde = (h, x0, x1, yc, R, p, s) => {
  const out = [];
  out.push(h.path(`M${x0},${yc - R} C${x0 - 15},${yc - R} ${x0 - 15 + s},${yc + R} ${x0 + s},${yc + R}`, h.a.contour));
  for (let a = x0; a < x1 - 0.1; a += p) {
    out.push(h.path(`M${a},${yc - R} Q${a + p / 2},${yc - R - 3.5} ${a + p},${yc - R}`, h.a.contour));
    out.push(h.path(`M${a + s},${yc + R} Q${a + s + p / 2},${yc + R + 3.5} ${a + s + p},${yc + R}`, h.a.contour));
    out.push(h.path(`M${a + p},${yc - R} Q${a + p + s / 2 + 4},${yc} ${a + p + s},${yc + R}`, h.a.arete));
    out.push(h.path(`M${a + p / 2 + 1},${yc - R + 3} Q${a + p / 2 + s / 2 + 3},${yc} ${a + p / 2 + s - 1},${yc + R - 3}`, h.a.fin));
  }
  return out.join('\n');
};

// ─── la planche ──────────────────────────────────────────────────────────────────────
module.exports = (h) => {
  const F = { x: 167, y: 92 };
  const P = ([x, y]) => [F.x + K * x, F.y + K * y];
  const Ps = pts => pts.map(P);
  const pli = U(-18, 7);
  // vue 1 : A, le brin du dessus (le long), B, le brin du dessous (le court)
  const A1 = pli.concat([[0, -7], [40, -9], [90, -16], [160, -24], [240, -30], [330, -34]]);
  const B1 = [[-18, 7], [0, 7], [40, 9], [90, 15], [170, 24], [250, 30]];
  // vue 2 : A est passé devant B et vers le bas ; B est le nouveau dessus
  const A2 = pli.concat([[0, -7], [22, -7], [48, 3], [75, 16], [140, 24], [240, 30], [330, 34]]);
  const B2 = [[-18, 7], [0, 7], [22, 7], [48, -3], [75, -16], [140, -24], [250, -30]];
  const A1y = x => {
    const c = lisse(A1, 10);
    return c.reduce((m, p) => (Math.abs(p[0] - x) < Math.abs(m[0] - x) && p[1] < 0 ? p : m), [1e9, 0])[1];
  };
  // vue 3 : corde faite, reprise ancienne en SP, poignée neuve N3 couchée sur le brin B3 qui faiblit
  const yc = 80, R = 13, p = 19, s = 13, x0 = 40, x1 = x0 + 16 * p, SP = x0 + 7.5 * p;
  const A3 = [[x1 + 3.3, yc - 6.9], [x1 + 35, yc - 12], [x1 + 100, yc - 30], [x1 + 170, yc - 45], [x1 + 215, yc - 50]];
  const B3 = [[x1 + 10.2, yc + 6.9], [x1 + 35, yc + 12], [x1 + 70, yc + 24], [x1 + 110, yc + 35]];
  const N3 = [[x1 + 50, yc + 11], [x1 + 80, yc + 21], [x1 + 115, yc + 30], [x1 + 170, yc + 43], [x1 + 220, yc + 50]];

  return {
    ref: '103-07',
    titre: 'Le contre-toron',
    desc: 'Faire une corde à deux brins avec une poignée de fibres, vue comme le fabricant voit ses mains. '
      + 'Une main pince la poignée pliée hors du milieu ; on tord le brin du dessus en l’éloignant du corps, '
      + 'puis on le passe par-dessus l’autre en le ramenant vers le corps : les deux rotations sont contraires. '
      + 'Pour rallonger, on couche une poignée neuve sur le brin qui faiblit, loin de la reprise de l’autre brin.',
    format: 'pleine',
    disposition: [['tordre'], ['passer'], ['rallonger']],
    hauteurs: [1.1, 1.1, 1],
    vues: {
      tordre: {
        titre: 'Plier, puis tordre',
        dessin: z => {
          const r = anneau(h, ...P([110, A1y(110)]), 8 * K, 19 * K, 'monte');
          const brins = [
            brin(h, Ps(B1), { fibres: [[0.02, 0.92]] }),
            brin(h, Ps(A1), { fibres: [[0, 0.1], [0.46, 0.94]], torsade: [0.11, 0.46] }),
          ].join('\n');
          return [r.derriere, brins, main(h, P, z, brins), r.devant].join('\n');
        },
        renvois: z => [
          { n: 1, rond: P([214, 62]), cible: bord(Ps(B1), P([232, 0])[0], 1), texte: 'plier hors du milieu : bouts décalés' },
          { n: 2, rond: P([45, -60]), cible: bord(Ps(A1), P([62, 0])[0], -1), texte: 'brin du dessus tordu jusqu’à raidir' },
          { n: 3, rond: P([150, -62]), cible: P([110 + 8 * Math.cos(-1), A1y(110) + 19 * Math.sin(-1)]), texte: 'sens : en l’éloignant du corps' },
        ],
      },
      passer: {
        titre: 'Passer par-dessus',
        dessin: z => {
          const r = anneau(h, ...P([105, 0]), 11 * K, 34 * K, 'descend');
          const brins = [
            brin(h, Ps(B2), { fibres: [[0.02, 0.92]] }),
            brin(h, Ps(A2), { fibres: [[0, 0.1], [0.5, 0.94]], torsade: [0.11, 0.5] }),
          ].join('\n');
          return [r.derriere, brins, main(h, P, z, brins), r.devant].join('\n');
        },
        renvois: z => [
          { n: 4, rond: P([150, 62]), cible: P([105 + 11 * Math.cos(1.15), 34 * Math.sin(1.15)]), texte: 'le passer par-dessus, vers le corps' },
          { n: 5, rond: P([200, -62]), cible: bord(Ps(B2), P([185, 0])[0], -1), texte: 'reprendre avec le nouveau dessus' },
        ],
      },
      rallonger: {
        titre: 'Rallonger',
        dessin: z => {
          const poils = [[-10, -17], [-3, -21], [5, -16], [-7, 16], [1, 20], [8, 15]]
            .map(([dx, dy]) => D([[SP + dx * 0.3, yc + Math.sign(dy) * (R + 1)], [SP + dx, yc + Math.sign(dy) * (R + 1) + dy]]))
            .join(' ');
          return [
            corde(h, x0, x1, yc, R, p, s),
            h.path(poils, h.a.detail),
            brin(h, B3, { w: u => W * (1 - 0.55 * u), fibres: [[0.02, 0.9]] }),
            brin(h, A3, { fibres: [[0.02, 0.92]] }),
            brin(h, N3, { w: u => W * Math.min(1, 0.45 + 3 * u), fibres: [[0.05, 0.93]], debut: true }),
          ].join('\n');
        },
        renvois: z => [
          { n: 6, rond: [446, 80], cible: bord(N3, 428, -1), texte: 'poignée neuve couchée sur le brin' },
          { n: 7, rond: [SP - 30, 22], cible: [SP - 2.5, yc - R - 3], texte: 'reprise de l’autre brin, décalée' },
        ],
      },
    },
  };
};
