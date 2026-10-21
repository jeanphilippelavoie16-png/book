// Planche 76-03 — L'ouverture en portefeuille (chapitre 71, section C, point 2)
// Poisson déjà vidé (ch. 70) : il se travaille sur le dos, ventre ouvert, la lame entre par la
// cavité, à plat contre l'arête, jusqu'à la peau du dos sans la percer. La peau du dos fait la
// charnière ; la feuille s'étale peau dessous et l'arête sort d'une pièce.
// La charte : en coupe, la cavité ouverte en gris loin. Le rouge : la lame qui court le long du
// dos, la pointe qui s'arrête avant la peau, l'arête qu'on lève.

const f = n => n.toFixed(1);

// Courbe lisse (Catmull-Rom) passant par les points, sans le M initial.
const suite = pts => {
  let d = '';
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(i + 2, pts.length - 1)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
};
const lisse = pts => `M ${f(pts[0][0])} ${f(pts[0][1])}` + suite(pts);
const interp = (pts, u) => {            // y d'une polyligne triée en u
  if (u <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++)
    if (u <= pts[i][0]) { const [a, ya] = pts[i - 1], [b, yb] = pts[i]; return ya + (yb - ya) * (u - a) / (b - a); }
  return pts[pts.length - 1][1];
};

// Silhouette naturelle d'un omble (dos en y positif), en fractions de la longueur ; tête à gauche.
// Corps fusiforme, hauteur maximale près du quart de la longueur, pédoncule épais, tête courte.
const DOS = [[0.012, 0.03], [0.04, 0.058], [0.08, 0.08], [0.13, 0.097], [0.2, 0.11], [0.3, 0.119], [0.4, 0.12],
  [0.5, 0.113], [0.6, 0.098], [0.7, 0.077], [0.8, 0.056], [0.85, 0.047], [0.89, 0.045]];
const VENTRE = [[0.012, -0.026], [0.04, -0.05], [0.08, -0.07], [0.13, -0.086], [0.2, -0.099], [0.3, -0.108],
  [0.4, -0.108], [0.5, -0.1], [0.6, -0.087], [0.7, -0.068], [0.8, -0.05], [0.85, -0.043], [0.89, -0.041]];
// Les nageoires, en contour fermé (la base entre dans le corps, qui la recouvre).
const NAG = {
  caudale: [[0.845, 0.036], [0.9, 0.066], [0.955, 0.1], [0.995, 0.124], [1.0, 0.105], [0.982, 0.05], [0.97, 0.0],
    [0.982, -0.05], [1.0, -0.105], [0.995, -0.124], [0.955, -0.1], [0.9, -0.066], [0.845, -0.036]],
  dorsale: [[0.355, 0.105], [0.375, 0.17], [0.392, 0.213], [0.405, 0.218], [0.45, 0.192], [0.49, 0.165], [0.505, 0.15], [0.51, 0.1]],
  adipeuse: [[0.742, 0.06], [0.758, 0.088], [0.778, 0.1], [0.792, 0.095], [0.795, 0.075], [0.79, 0.056]],
  anale: [[0.645, -0.08], [0.66, -0.135], [0.675, -0.168], [0.69, -0.166], [0.72, -0.128], [0.735, -0.1], [0.73, -0.065]],
  ventrale: [[0.495, -0.093], [0.515, -0.14], [0.535, -0.17], [0.548, -0.168], [0.565, -0.128], [0.565, -0.088]],
};
// Les rayons : de la base vers le bord, pour chaque nageoire rayonnée.
const RAYONS = {
  caudale: { base: [[0.89, 0.026], [0.89, -0.026]], bord: [[0.99, 0.112], [0.986, 0.07], [0.978, 0.03], [0.978, -0.03], [0.986, -0.07], [0.99, -0.112]] },
  pecto: { base: [[0.17, -0.08], [0.2, -0.085]], bord: [[0.24, -0.155], [0.235, -0.13]] },
  dorsale: { base: [[0.375, 0.112], [0.5, 0.106]], bord: [[0.4, 0.205], [0.425, 0.198], [0.45, 0.184], [0.475, 0.168]] },
  anale: { base: [[0.665, -0.075], [0.725, -0.068]], bord: [[0.678, -0.158], [0.698, -0.152], [0.715, -0.13]] },
  ventrale: { base: [[0.51, -0.09], [0.56, -0.088]], bord: [[0.532, -0.16], [0.548, -0.155]] },
};
// Pectorale : couchée sur le flanc, juste derrière l'ouïe, côté ventre.
const PECTO = [[0.15, -0.07], [0.175, -0.115], [0.215, -0.15], [0.245, -0.163], [0.258, -0.155], [0.235, -0.12], [0.205, -0.085]];
// Taches de l'omble, plus serrées sur le haut du flanc (côté dos).
const TACHES = [[0.2, 0.05], [0.235, 0.085], [0.27, 0.035], [0.31, 0.09], [0.345, 0.025], [0.36, 0.075], [0.4, 0.045],
  [0.43, 0.1], [0.455, 0.02], [0.49, 0.07], [0.52, 0.035], [0.555, 0.09], [0.59, 0.045], [0.62, 0.075], [0.66, 0.025],
  [0.69, 0.055], [0.73, 0.035], [0.76, 0.02], [0.8, 0.032], [0.26, -0.025], [0.33, -0.04], [0.42, -0.03], [0.5, -0.045],
  [0.58, -0.028], [0.65, -0.04], [0.72, -0.022]];
const FENTE = [0.14, 0.6];                          // ventre ouvert, de la gorge à l'anus
const lèvre = u => (u <= FENTE[0] || u >= FENTE[1]) ? 0 : 0.016 * Math.sin(Math.PI * (u - FENTE[0]) / (FENTE[1] - FENTE[0]));

const geo = z => {
  const L = Math.min((z.l - 40) / 1.04, (z.h - 24) / 0.52);
  const x0 = (z.l - 1.0 * L) / 2 + 0.02 * L;
  const yc = (z.h - 0.52 * L) / 2 + 0.29 * L;
  return { L, x0, yc, P: (u, y) => [x0 + u * L, yc + y * L] };   // ventre en l'air : y naturel vers le bas
};

const blancTrait = (h, t) => h.a[t].replace('fill="none"', h.a.blanc.match(/fill="[^"]*"/)[0]);

module.exports = (h) => ({
  ref: '76-03',
  titre: 'L’ouverture en portefeuille',
  desc: 'Un omble vidé, posé sur le dos, ventre ouvert : la lame entre par la cavité, à plat contre l’arête, '
    + 'et court le long du dos jusqu’à la peau sans la percer. Ouvert, le poisson s’étale en une feuille '
    + 'd’épaisseur régulière, peau dessous, et l’arête centrale sort d’une pièce.',
  format: 'pleine',
  disposition: [['cote'], ['coupe', 'ouvert']],
  hauteurs: [25, 22],
  largeurs: [[1], [155, 423]],
  vues: {
    cote: {
      titre: 'Sur le dos, ventre ouvert',
      dessin: z => {
        const { L, x0, yc, P } = geo(z);
        const out = [];
        const ferme = pts => lisse(pts.map(([u, y]) => P(u, y))) + ' Z';

        // nageoires derrière le corps : caudale, dorsale et adipeuse (en bas), anale et ventrale (en haut)
        for (const k of ['caudale', 'dorsale', 'adipeuse', 'anale', 'ventrale', 'pecto']) {
          out.push(h.path(ferme(k === 'pecto' ? PECTO : NAG[k]), blancTrait(h, 'arete')));
          const R = RAYONS[k];
          if (!R) continue;
          // les rayons d'une nageoire : un seul tracé (ce sont des rayons, pas une hachure)
          out.push(h.path(R.bord.map((b, i) => {
            const t = R.bord.length > 1 ? i / (R.bord.length - 1) : 0.5;
            const a = [R.base[0][0] + (R.base[1][0] - R.base[0][0]) * t, R.base[0][1] + (R.base[1][1] - R.base[0][1]) * t];
            return `M ${P(...a).map(f).join(' ')} L ${P(...b).map(f).join(' ')}`;
          }).join(' '), h.a.fin));
        }

        // le corps : une seule courbe, du pédoncule par le ventre, le museau arrondi, puis le dos
        const corps = [...VENTRE.slice().reverse(), [-0.002, 0.002], ...DOS].map(([u, y]) => P(u, y));
        out.push(h.path(lisse(corps) + ' Z', h.a.blanc));      // le fond blanc, fermé dans la caudale
        out.push(h.path(lisse(corps), h.a.contour));           // le trait, ouvert : pas de barre au pédoncule

        // ligne latérale et taches
        out.push(h.path(lisse([P(0.165, 0.012), P(0.4, 0.01), P(0.65, 0.006), P(0.86, 0.002)]), h.a.fin));
        for (const [u, y] of TACHES) out.push(h.cercle(...P(u, y), 0.0042 * L, h.a.plein));

        // la fente du ventre, écartée : on voit dans la cavité
        const n = 24, bord = [], lev = [];
        for (let i = 0; i <= n; i++) {
          const u = FENTE[0] + (FENTE[1] - FENTE[0]) * i / n;
          const y = interp(VENTRE, u);
          bord.push(P(u, y)); lev.push(P(u, y + lèvre(u)));
        }
        out.push(h.path(lisse(bord) + ` L ${lev[n].map(f).join(' ')}` + suite(lev.slice().reverse()) + ' Z', h.a.plein));

        // tête : œil, opercule et préopercule, mâchoire qui passe derrière l'œil
        out.push(h.cercle(...P(0.055, 0.02), 0.016 * L, blancTrait(h, 'arete')));
        out.push(h.cercle(...P(0.055, 0.02), 0.0085 * L, h.a.plein));
        out.push(h.path(lisse([P(0.122, 0.092), P(0.152, 0.03), P(0.15, -0.035), P(0.128, -0.083)]), h.a.arete));
        out.push(h.path(lisse([P(0.098, 0.07), P(0.115, 0.02), P(0.108, -0.04)]), h.a.detail));
        out.push(h.path(lisse([P(0.0, -0.002), P(0.04, -0.016), P(0.082, -0.028)]), h.a.arete));
        out.push(h.path(lisse([P(0.082, -0.028), P(0.09, -0.04), P(0.075, -0.045)]), h.a.detail));

        // le trajet de la lame, le long du dos, jusqu'à la queue
        const traj = [];
        for (let u = 0.47; u <= 0.841; u += 0.0925) traj.push(P(u, 0.55 * interp(DOS, u)));
        out.push(h.geste(lisse(traj)));   // le geste : la lame court le long du dos

        // le couteau : entre par la fente, pointe contre l'arête, vers le dos
        const E = P(0.2, interp(VENTRE, 0.2)), T = P(0.42, 0.066);
        const lg = Math.hypot(T[0] - E[0], T[1] - E[1]);
        const dir = [(T[0] - E[0]) / lg, (T[1] - E[1]) / lg], nor = [-dir[1], dir[0]];
        const w = 0.032 * L;
        const K = (s, t) => [E[0] + dir[0] * s + nor[0] * t, E[1] + dir[1] * s + nor[1] * t];
        const s0 = -0.05 * L;
        // où chaque bord de lame passe la lèvre de la fente (au-delà : caché par la chair)
        const lipY = x => { const u = (x - x0) / L; const y = interp(VENTRE, u); return yc + (y + lèvre(u)) * L; };
        const passe = t => { let a = s0, b = lg; for (let k = 0; k < 40; k++) { const m = (a + b) / 2; const p = K(m, t); if (p[1] < lipY(p[0])) a = m; else b = m; } return a; };
        const sd = passe(0), se = passe(w);
        // partie cachée, en tireté
        out.push(h.path(`M ${K(sd, 0).map(f).join(' ')} L ${K(lg, 0).map(f).join(' ')}`, h.a.cache));
        out.push(h.path(`M ${K(se, w).map(f).join(' ')} L ${K(0.7 * lg, w).map(f).join(' ')} Q ${K(0.97 * lg, w).map(f).join(' ')} ${K(lg, 0).map(f).join(' ')}`, h.a.cache));
        // partie vue : talon de lame et manche
        out.push(h.chemin([K(s0, 0), K(sd, 0), K(se, w), K(s0, w)], blancTrait(h, 'arete'), true));
        const hw = 0.038 * L, hc = w / 2, sh = s0 - 0.21 * L;
        out.push(h.path(`M ${K(s0, hc - hw / 2).map(f).join(' ')} L ${K(sh, hc - hw / 2).map(f).join(' ')}`
          + ` Q ${K(sh - 0.025 * L, hc).map(f).join(' ')} ${K(sh, hc + hw / 2).map(f).join(' ')}`
          + ` L ${K(s0, hc + hw / 2).map(f).join(' ')} Z`, blancTrait(h, 'contour')));
        out.push(h.ligne(...K(s0 - 0.006 * L, hc - hw * 0.62), ...K(s0 - 0.006 * L, hc + hw * 0.62), h.a.contour));
        return out.join('\n');
      },
      renvois: z => {
        const { P } = geo(z);
        const u = 0.655;
        return [{ n: 1, texte: 'trait le long du dos', rond: [P(u, 0)[0] + 18, Math.min(z.h - 12, P(u, interp(DOS, u))[1] + 34)], cible: P(u, 0.55 * interp(DOS, u) + 0.004) }];
      },
    },

    coupe: {
      titre: 'En coupe',
      dessin: z => {
        const S = (z.l - 75) / 0.48;
        const X = z.l / 2 + 12, yc = (z.h - 1.2 * S) / 2 + 0.6 * S;
        const Q = (x, y) => [X + x * S, yc + y * S];            // dos en bas
        const out = [];
        const ext = [[0.085, -0.475], [0.14, -0.43], [0.195, -0.33], [0.228, -0.2], [0.24, -0.05], [0.235, 0.1],
          [0.205, 0.25], [0.15, 0.38], [0.075, 0.465], [0, 0.5], [-0.075, 0.465], [-0.15, 0.38], [-0.205, 0.25],
          [-0.235, 0.1], [-0.24, -0.05], [-0.228, -0.2], [-0.195, -0.33], [-0.14, -0.43], [-0.085, -0.475]];
        const int = [[-0.062, -0.43], [-0.11, -0.36], [-0.15, -0.26], [-0.165, -0.15], [-0.155, -0.04], [-0.12, 0.03],
          [-0.06, 0.065], [0, 0.075], [0.06, 0.065], [0.12, 0.03], [0.155, -0.04], [0.165, -0.15], [0.15, -0.26],
          [0.11, -0.36], [0.062, -0.43]];
        const e = ext.map(([x, y]) => Q(x, y)), i = int.map(([x, y]) => Q(x, y));
        // la cavité du ventre, ouverte : on voit dedans, en gris loin
        out.push(h.path(lisse(i) + ' Z', h.a.loin));
        out.push(h.path(lisse(e) + ` L ${i[0].map(f).join(' ')}` + suite(i) + ' Z', blancTrait(h, 'contour')));
        // chair : cloison horizontale et myomères
        out.push(h.ligne(...Q(-0.04, 0.15), ...Q(-0.232, 0.12), h.a.detail));
        out.push(h.ligne(...Q(0.04, 0.15), ...Q(0.232, 0.12), h.a.detail));
        for (const sx of [-1, 1]) {
          for (const r of [0.045, 0.085]) {
            const c = [sx * 0.115, 0.29];
            out.push(h.path(lisse([Q(c[0] - sx * r * 0.2, c[1] - r), Q(c[0] + sx * r * 0.9, c[1] - r * 0.1), Q(c[0] + sx * r * 0.3, c[1] + r * 0.95)]), h.a.detail));
          }
          out.push(h.path(lisse([Q(sx * 0.2, -0.1), Q(sx * 0.19, -0.2), Q(sx * 0.165, -0.3)]), h.a.detail));
        }
        // l'arête : vertèbre et épine
        out.push(h.cercle(...Q(0, 0.15), 0.04 * S, blancTrait(h, 'arete')));
        out.push(h.cercle(...Q(0, 0.15), 0.012 * S, h.a.plein));
        out.push(h.ligne(...Q(0, 0.19), ...Q(0, 0.43), h.a.arete));
        // la lame, vue par la tranche, à plat contre l'arête ; le fil s'arrête avant la peau du dos
        const xa = -0.042, ep = 0.026;
        out.push(h.chemin([Q(xa - ep, -0.6), Q(xa, -0.6), Q(xa, 0.4), Q(xa - ep / 2, 0.445), Q(xa - ep, 0.4)], h.a.plein, true));
        // le point à vérifier : la pointe s'arrête avant la peau du dos
        out.push(h.controle(...Q(xa - ep / 2, 0.47), 0.05 * S));
        return out.join('\n');
      },
      renvois: z => {
        const S = (z.l - 75) / 0.48;
        const X = z.l / 2 + 12, yc = (z.h - 1.2 * S) / 2 + 0.6 * S;
        const Q = (x, y) => [X + x * S, yc + y * S];
        return [
          { n: 2, texte: 'lame à plat contre l’arête', rond: [Q(-0.24, 0)[0] - 26, Q(0, 0.3)[1]], cible: Q(-0.068, 0.27) },
          { n: 3, texte: 'peau du dos laissée entière', rond: [Q(0.2, 0)[0], Q(0, 0.64)[1]], cible: Q(0.03, 0.498) },
        ];
      },
    },

    ouvert: {
      titre: 'Ouvert à plat, peau dessous',
      dessin: z => {
        const s = (z.l - 50) / 2.25, Wd = 2.25 * s;   // même échelle que la coupe
        const X = z.l / 2, yb = (z.h - 1.2 * s) / 2 + 1.1 * s, t = 0.12 * s;
        const out = [];
        const xL = X - Wd / 2, xR = X + Wd / 2, r = 0.14 * s;
        // la feuille : peau en bas, chair au-dessus, bords de ventre amincis
        const d = `M ${f(xL + r)} ${f(yb)} L ${f(xR - r)} ${f(yb)}`
          + ` C ${f(xR - r * 0.3)} ${f(yb)} ${f(xR)} ${f(yb - t * 0.35)} ${f(xR - r * 0.15)} ${f(yb - t * 0.55)}`
          + ` C ${f(xR - r * 0.4)} ${f(yb - t)} ${f(xR - r)} ${f(yb - t)} ${f(xR - 1.6 * r)} ${f(yb - t)}`
          + ` L ${f(X + 0.06 * s)} ${f(yb - t)} Q ${f(X)} ${f(yb - t * 0.3)} ${f(X - 0.06 * s)} ${f(yb - t)}`   // sillon où était l'arête
          + ` L ${f(xL + 1.6 * r)} ${f(yb - t)}`
          + ` C ${f(xL + r)} ${f(yb - t)} ${f(xL + r * 0.4)} ${f(yb - t)} ${f(xL + r * 0.15)} ${f(yb - t * 0.55)}`
          + ` C ${f(xL)} ${f(yb - t * 0.35)} ${f(xL + r * 0.3)} ${f(yb)} ${f(xL + r)} ${f(yb)} Z`;
        out.push(h.path(d, blancTrait(h, 'contour')));
        // la chair : les mêmes myomères que dans la coupe, rabattus de chaque côté
        for (const sx of [-1, 1])
          for (const k of [0.32, 0.62, 0.9])
            out.push(h.path(lisse([[X + sx * k * s, yb - t * 0.82], [X + sx * (k + 0.07) * s, yb - t * 0.5], [X + sx * k * s, yb - t * 0.22]]), h.a.detail));
        // la peau, d'une seule face
        out.push(h.ligne(xL + r * 0.9, yb - 3.2, xR - r * 0.9, yb - 3.2, h.a.detail));
        // l'arête, sortie d'une pièce : vertèbre, épine vers le bas, amorces de côtes vers le haut
        const vy = yb - t - 0.42 * s, rv = 0.04 * s;
        out.push(h.cercle(X, vy, rv, blancTrait(h, 'arete')));
        out.push(h.cercle(X, vy, 0.012 * s, h.a.plein));
        out.push(h.ligne(X, vy + rv, X, vy + rv + 0.22 * s, h.a.arete));
        for (const sx of [-1, 1])
          out.push(h.path(lisse([[X + sx * rv * 0.9, vy - rv * 0.4], [X + sx * 0.1 * s, vy - 0.07 * s], [X + sx * 0.13 * s, vy - 0.17 * s]]), h.a.arete));
        out.push(h.geste(`M ${f(X + 0.3 * s)} ${f(yb - t - 0.12 * s)} L ${f(X + 0.3 * s)} ${f(yb - t - 0.5 * s)}`));   // on lève l'arête
        return out.join('\n');
      },
      renvois: z => {
        const s = (z.l - 50) / 2.25;
        const X = z.l / 2, yb = (z.h - 1.2 * s) / 2 + 1.1 * s, t = 0.12 * s;
        const vy = yb - t - 0.42 * s, rv = 0.04 * s;
        return [
          { n: 4, texte: 'arête retirée d’un trait', rond: [X - 0.42 * s, vy - 0.12 * s], cible: [X - rv * 0.75, vy - rv * 0.66] },
          { n: 5, texte: 'feuille d’épaisseur régulière', rond: [X + 0.78 * s, yb - t - 0.3 * s], cible: [X + 0.62 * s, yb - t] },
        ];
      },
    },
  },
});
