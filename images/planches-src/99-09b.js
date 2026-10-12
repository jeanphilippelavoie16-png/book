// Planche 99-09b — forcer la rhubarbe l'hiver. Chapitre 99, « La rhubarbe prise à une vieille
// talle » : à la fin de l'automne, déterrer une ou deux couronnes, les laisser geler plusieurs
// semaines dehors sous un peu de terre, puis les rentrer dans une caisse, couronnes couvertes de 5 à
// 8 cm de terre ou de sable, au noir ou presque, entre 10 et 18 °C, le coin frais de la maison. On
// force celles qu'une division a mises en surplus (étape 44) : ce sont les morceaux B et C de la
// planche 99-09a, même géométrie, reprise d'elle. Les feuilles restent toxiques, forcées ou pas.
//
// La seule cote est celle du chapitre : 50 à 80 mm de terre au-dessus de la couronne. La caisse n'a
// pas de mesure dans le chapitre : dessinée, pas cotée. Le noir se fait ici par une seconde caisse
// renversée par-dessus, le moyen le plus simple de faire « au noir ou presque ».
// Les deux vues sont à la même échelle et les morceaux aux mêmes x : ce qui gèle dehors en haut est
// ce qui entre dans la caisse en bas.
const A9 = require('./99-09a.js');
const r1 = v => Math.round(v * 10) / 10;

module.exports = (h) => {
  const A = h.a, R = A9.rhubarbe(h), { GROS, CENTRES } = A9.GEOM;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const bA = blanc(A.arete), bD = blanc(A.detail), f = R.f, dd = R.dd;
  const K = 0.55, BX = 157;                     // échelle ; bord gauche de la caisse, px
  const XB = [150, 362];                        // milieu des morceaux B et C, en mm depuis le bord gauche de la caisse
  const DY = -202;                              // y du morceau → y de la caisse (0 au plancher)
  const px = X => BX + X * K;
  const segs = [1, 2];
  const lisse = pts => {             // Catmull-Rom, pour une butte ronde
    const out = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      for (let k = 0; k < 8; k++) { const t = k / 8, t2 = t * t, t3 = t2 * t; out.push([0, 1].map(m => 0.5 * (2 * p1[m] + (-p0[m] + p2[m]) * t + (2 * p0[m] - 5 * p1[m] + 4 * p2[m] - p3[m]) * t2 + (-p0[m] + 3 * p1[m] - 3 * p2[m] + p3[m]) * t3))); }
    }
    out.push(pts[pts.length - 1]); return out;
  };

  // ─── la caisse, en mm : x depuis sa face gauche, y vers le bas, 0 au plancher ────────────
  const EP = 20, LC = 520, HC = 340, HH = 330, SURF = -299;
  const gF = z => {
    const oy = z.h - 12;                        // le plancher
    const P = p => [px(p[0]), oy + p[1] * K];
    const T = i => ({ ox: px(XB[i] - CENTRES[segs[i]]), oy: oy + DY * K, k: K });
    return { oy, P, T };
  };

  // Les tiges forcées : [x du bourgeon, décalage, haut (y caisse), dérive] ; un pétiole côtelé, pâle,
  // et au bout une petite feuille fripée en éventail.
  const TIGES = [
    [104, -6, -566, -42], [104, 7, -596, 2],
    [134, 2, -560, 44],
    [188, -6, -584, -30], [188, 7, -552, 38],
  ];
  const tiges = (seg, P) => {
    const out = [], feuilles = [];
    const bz = (p, t) => R.bez(p, t);
    TIGES.filter(([bx]) => (seg === 1 ? bx < 152 : bx > 152)).forEach(([bx, dx, haut, der], j) => {
      const b = GROS.find(g => g.x === bx), x0 = bx + dx, y0 = b.y - 4, yt = haut - DY;
      const c = [[x0, y0], [x0 + der * 0.05, y0 - 90], [x0 + der * 0.6, yt + 110], [x0 + der, yt]];
      const n = 36, G = [], D = [];
      const tan = t => { const a = bz(c, Math.max(0, t - 0.01)), e = bz(c, Math.min(1, t + 0.01)), L = Math.hypot(e[0] - a[0], e[1] - a[1]); return [(e[0] - a[0]) / L, (e[1] - a[1]) / L]; };
      const larg = t => 17 - 5 * t;
      for (let i = 0; i <= n; i++) {
        const t = i / n, p = bz(c, t), u = tan(t), nm = [-u[1], u[0]], w = larg(t) / 2;
        G.push([p[0] - nm[0] * w, p[1] - nm[1] * w]); D.push([p[0] + nm[0] * w, p[1] + nm[1] * w]);
      }
      out.push(`<path d="${dd([...G, ...D.reverse()].map(P), true)}" ${bA}/>`);
      // les côtes du pétiole : deux traits fins le long de la tige, comme un céleri
      for (const k of [-0.22, 0.2]) {
        const cote = []; for (let i = 2; i <= n - 1; i++) { const t = i / n, p = bz(c, t), u = tan(t), w = larg(t) * k; cote.push([p[0] - u[1] * w, p[1] + u[0] * w]); }
        out.push(`<path d="${dd(cote.map(P))}" ${A.fin}/>`);
      }
      // La feuille : petite, fripée, à moitié dépliée, penchée d'un côté. Un bord irrégulier à
      // grosses ondes, des plis qui rayonnent du bout du pétiole.
      const pt = bz(c, 1), u0 = tan(1), pen = (der < 0 ? -1 : 1) * 0.45;
      const u = [u0[0] * Math.cos(pen) - u0[1] * Math.sin(pen), u0[0] * Math.sin(pen) + u0[1] * Math.cos(pen)], v = [-u[1], u[0]];
      const Rf = 30 + (j % 2) * 4;
      const Q = (a, r) => [pt[0] + u[0] * r * Math.cos(a) + v[0] * r * Math.sin(a), pt[1] + u[1] * r * Math.cos(a) + v[1] * r * Math.sin(a)];
      const rb = a => Rf * (0.62 + 0.38 * Math.cos(a * 0.9)) * (1 + 0.13 * Math.sin(5 * a + j * 1.3) + 0.07 * Math.sin(11 * a + j));
      const bord = [];
      for (let i = 0; i <= 48; i++) { const a = -1.9 + 3.8 * i / 48; bord.push(Q(a, rb(a))); }
      feuilles.push(`<path d="${dd([Q(-1.9, 3), ...bord, Q(1.9, 3)].map(P), true)}" ${bA}/>`);
      for (const a of [-1.2, -0.45, 0.3, 1.05]) feuilles.push(`<path d="M${f(P(Q(a, 3)))} Q${f(P(Q(a + 0.12, rb(a) * 0.45)))} ${f(P(Q(a - 0.05, rb(a) * 0.9)))}" ${A.fin}/>`);
    });
    return [...out, ...feuilles].join(String.fromCharCode(10));
  };

  // ─── geler dehors : les mêmes morceaux, bourgeons fermés, dans un creux, sous une butte de terre ─
  const gG = z => {
    const oy = 8 + 64 * K;                      // y du morceau → px : le haut de la butte à 8 px
    const T = i => ({ ox: px(XB[i] - CENTRES[segs[i]]), oy, k: K });
    const ys = oy + 20 * K;                     // la surface du sol, au tiers haut du corps
    return { oy, T, ys };
  };

  return {
    ref: '99-09b',
    titre: 'Forcer la rhubarbe l’hiver',
    desc: 'En haut, à la fin de l’automne : deux morceaux de couronne en surplus d’une division, posés '
      + 'debout dans un creux dehors, une butte de terre mince par-dessus, laissés geler plusieurs semaines. '
      + 'En bas, en coupe, les mêmes morceaux rentrés dans une caisse de bois pleine de terre ou de sable, '
      + 'couverts de 50 à 80 mm ; une seconde caisse renversée par-dessus fait le noir ; des tiges pâles '
      + 'sortent des bourgeons ouverts, une petite feuille fripée au bout de chacune.',
    format: 'pleine',
    disposition: [['geler'], ['forcer']],
    hauteurs: [1, 2.4],
    vues: {
      geler: {
        titre: 'À la fin de l’automne, geler dehors',
        dessin: z => {
          const { T, ys } = gG(z), P0 = T(0), P1 = T(1);
          const Pm = (i, p) => [T(i).ox + p[0] * K, T(i).oy + p[1] * K];
          // la butte : de la surface, par-dessus les deux morceaux, 25 mm au-dessus des bourgeons
          const g = Pm(0, [60, 0])[0] - 40, d = Pm(1, [240, 0])[0] + 30;
          const hb = Pm(0, [104, -64])[1], hc = Pm(1, [188, -62])[1];
          const butte = [[0, ys], [g - 30, ys], [g, ys - 3], [Pm(0, [80, 0])[0], hb + 6], [Pm(0, [110, 0])[0], hb], [Pm(0, [150, 0])[0], hb + 5],
            [Pm(1, [170, 0])[0], hc + 4], [Pm(1, [192, 0])[0], hc], [Pm(1, [222, 0])[0], hc + 7], [d, ys - 3], [d + 30, ys], [z.l, ys]];
          const top = lisse(butte);
          const o = [`<path d="${dd([...top, [z.l, z.h], [0, z.h]], true)}" ${A.hachure('terre', 'aucun')}/>`];
          o.push(R.couronne(P0, { seg: 1, id: 'g1' }), R.couronne(P1, { seg: 2, id: 'g2' }));
          o.push(`<path d="${dd(top)}" ${A.arete}/>`);
          return o.join('\n');
        },
        renvois: z => {
          const { T } = gG(z);
          const Pm = (i, p) => [T(i).ox + p[0] * K, T(i).oy + p[1] * K];
          const cb = Pm(0, [96, 40]), mb = Pm(1, [200, -50]);
          return [
            { n: 1, rond: [cb[0] - 70, cb[1] + 18], cible: cb, texte: 'couronne en surplus d’une division' },
            { n: 2, rond: [mb[0] + 80, 22], cible: mb, texte: 'un peu de terre par-dessus' },
          ];
        },
      },
      forcer: {
        titre: 'L’hiver, forcer au noir',
        dessin: z => {
          const { oy, P, T } = gF(z);
          const box = (x, y, l, ht) => `<path d="${dd([[x, y], [x + l, y], [x + l, y + ht], [x, y + ht]].map(P), true)}" ${A.hachure('bois')}/>`;
          const o = [];
          // le plancher
          o.push(h.rect(0, oy, z.l, 8, A.hachure('bois', 'aucun')), h.ligne(0, oy, z.l, oy, A.contour));
          // la terre ou le sable dans la caisse
          o.push(`<path d="${dd([[EP, SURF], [LC - EP, SURF], [LC - EP, -EP], [EP, -EP]].map(P), true)}" ${A.hachure('terre', 'aucun')}/>`);
          // les morceaux, bourgeons ouverts, tiges forcées
          o.push(R.couronne(T(0), { seg: 1, id: 'f1', ouvert: true, tiges: tiges(1, p => [T(0).ox + p[0] * K, T(0).oy + p[1] * K]) }));
          o.push(R.couronne(T(1), { seg: 2, id: 'f2', ouvert: true, tiges: tiges(2, p => [T(1).ox + p[0] * K, T(1).oy + p[1] * K]) }));
          o.push(`<path d="${dd([[EP, SURF], [LC - EP, SURF]].map(P))}" ${A.arete}/>`);
          // la caisse du bas : deux côtés et le fond ; la caisse renversée : deux côtés et le fond, en haut
          o.push(box(0, -HC, EP, HC), box(LC - EP, -HC, EP, HC), box(EP, -EP, LC - 2 * EP, EP));
          o.push(box(0, -HC - HH, EP, HH), box(LC - EP, -HC - HH, EP, HH), box(EP, -HC - HH, LC - 2 * EP, EP));
          // la cote : 50 à 80 mm, de l'écaille du bourgeon du morceau C à la surface, reportée dehors
          const b = GROS[3], tC = T(1), pc = [tC.ox + (b.x + 0.4 * b.W) * K, tC.oy + (b.y - 0.82 * b.H) * K];
          const ps = P([LC, SURF]), xc = px(LC + 34);
          o.push(h.ligne(pc[0] + 3, pc[1], xc + 4, pc[1], A.fin), h.ligne(ps[0] + 2, ps[1], xc + 4, ps[1], A.fin));
          o.push(h.cote(xc, ps[1], xc, pc[1], '50 à 80 mm', { cote: 'droite' }));
          return o.join('\n');
        },
        renvois: z => {
          const { oy, P, T } = gF(z);
          const hood = P([EP / 2, -HC - HH * 0.55]), sol = P([60, -120]);
          const Pm = (i, p) => [T(i).ox + p[0] * K, T(i).oy + p[1] * K];
          const cr = Pm(0, [96, 40]), tg = Pm(0, [104 - 7 - 20, -300]), fe = Pm(1, [188 - 6 - 30 - 8, -382 - 16]);
          return [
            { n: 3, rond: [hood[0] - 58, hood[1] - 40], cible: hood, texte: 'caisse renversée : le noir' },
            { n: 4, rond: [tg[0] - 118, tg[1] + 30], cible: tg, texte: 'tige pâle, poussée l’hiver' },
            { n: 5, rond: [fe[0] + 190, fe[1] - 14], cible: fe, texte: 'feuille : toxique, forcée ou pas' },
            { n: 6, rond: [sol[0] - 58, sol[1] + 10], cible: sol, texte: 'terre ou sable' },
            { n: 7, rond: [cr[0] - 150, cr[1] - 30], cible: cr, texte: 'couronne gelée, rentrée' },
            { n: 8, rond: [z.l - 40, oy - 40], cible: [z.l - 70, oy], texte: 'coin frais, entre 10 et 18 °C' },
          ];
        },
      },
    },
    danger: 'Danger — seules les tiges se mangent. Les feuilles, forcées ou pas, restent toxiques : elles brûlent '
      + 'la bouche et la gorge, et les cas graves touchent les reins.',
  };
};
