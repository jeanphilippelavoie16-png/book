// 80-10 — La wattape et la hart. Tirer la racine d'épinette hors de la mousse, l'écorcer entre
// le pouce et le dos de la lame, la fendre (et ramener la fente qui dérive), la garder en
// couronne ; tordre une pousse de saule jusqu'à ce qu'elle plie sans casser (ch. 36).
// Aucune cote : le chapitre ne donne aucune mesure pour ces gestes.
// La charte : les racines au contour ; le rouge sur cinq gestes (tirer, tirer au travers du pincement, écarter les
// deux moitiés, plier le côté épais). La torsion de la hart reste noire : cinq marques rouges au plus.

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
let graine = 11;
const hasard = () => { graine = (graine * 16807) % 2147483647; return graine / 2147483647; };

const geo = (pts, w) => {
  const c = lisse(pts, 10), t = tangentes(c), L = longueurs(c), tot = L[L.length - 1];
  const W = s => (typeof w === 'function' ? w(s / tot) : w);
  return { c, t, L, tot, W };
};
// Point à la fraction u de la longueur, décalé de f demi-largeurs (f = ±1 : les bords ; ±1,15 : juste dehors).
const pt = (pts, w, u, f) => {
  const g = geo(pts, w), s = u * g.tot, { p, i } = aS(g.c, g.L, s), n = [-g.t[i][1], g.t[i][0]];
  return [p[0] + n[0] * f * g.W(s) / 2, p[1] + n[1] * f * g.W(s) / 2];
};

// Une bande : racine, demi-racine, pousse. Bords au contour, remplissage blanc.
//   rugueux : bord irrégulier (écorce) · ecorce : écailles · lignes : fils fins sur [u0, u1]
//   torsade : [u0, u1] marques de torsion · bourgeons : [u…] · bouts : [début, fin]
const bande = (h, pts, w, o = {}) => {
  const { c, t, L, tot, W } = geo(pts, w);
  const nrm = i => [-t[i][1], t[i][0]];
  const bord = f => c.map((p, i) => {
    const j = o.rugueux ? (hasard() - 0.5) * o.rugueux : 0;
    return [p[0] + nrm(i)[0] * (f * W(L[i]) / 2 + f * j), p[1] + nrm(i)[1] * (f * W(L[i]) / 2 + f * j)];
  });
  const G = bord(1), Dr = bord(-1);
  const trait = o.trait || h.a.contour;
  const out = [h.path(D(G.concat(Dr.slice().reverse())) + ' Z', h.a.blanc), h.path(D(G), trait), h.path(D(Dr), trait)];
  const [b0, b1] = o.bouts || [true, true];
  if (b0) out.push(h.path(D([G[0], Dr[0]]), trait));
  if (b1) out.push(h.path(D([G[G.length - 1], Dr[Dr.length - 1]]), trait));
  for (const [u0, u1, f] of (o.lignes || [])) {
    const q = [];
    c.forEach((p, i) => {
      const u = L[i] / tot;
      if (u >= u0 && u <= u1) q.push([p[0] + nrm(i)[0] * f * W(L[i]) / 2, p[1] + nrm(i)[1] * f * W(L[i]) / 2]);
    });
    if (q.length > 1) out.push(h.path(D(q), h.a.fin));
  }
  if (o.ecorce) {
    const [u0, u1] = o.ecorce, seg = [];
    for (let s = u0 * tot; s <= u1 * tot; s += 4 + hasard() * 3) {
      const { p, i } = aS(c, L, s), n = nrm(i), tt = t[i], ww = W(s) / 2;
      const a = -0.85 + hasard() * 0.5, b = a + 0.5 + hasard() * 0.6, k = 1.5;
      seg.push(D([[p[0] + n[0] * a * ww, p[1] + n[1] * a * ww], [p[0] + n[0] * b * ww + tt[0] * k, p[1] + n[1] * b * ww + tt[1] * k]]));
    }
    out.push(h.path(seg.join(' '), h.a.detail));
  }
  if (o.torsade) {
    const [u0, u1] = o.torsade, seg = [];
    for (let s = u0 * tot; s <= u1 * tot; s += (o.pas || 7)) {
      const { p, i } = aS(c, L, s), n = nrm(i), tt = t[i], ww = W(s) / 2 - 0.4, k = ww * 1.1;
      const a = [p[0] + n[0] * ww - tt[0] * k, p[1] + n[1] * ww - tt[1] * k];
      const b = [p[0] - n[0] * ww + tt[0] * k, p[1] - n[1] * ww + tt[1] * k];
      const q = [p[0] + tt[0] * k * 0.8, p[1] + tt[1] * k * 0.8];
      seg.push(`M${a[0].toFixed(1)},${a[1].toFixed(1)} Q${q[0].toFixed(1)},${q[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}`);
    }
    out.push(h.path(seg.join(' '), h.a.detail));
  }
  (o.bourgeons || []).forEach((u, k) => {
    const s = u * tot, { p, i } = aS(c, L, s), f = k % 2 ? 1 : -1, n = nrm(i).map(v => v * f), tt = t[i];
    const e = [p[0] + n[0] * W(s) / 2, p[1] + n[1] * W(s) / 2];
    const P = (a, b) => `${(e[0] + tt[0] * a + n[0] * b).toFixed(1)},${(e[1] + tt[1] * a + n[1] * b).toFixed(1)}`;
    out.push(h.path(`M${P(0, 0)} Q${P(2.5, 3.2)} ${P(7, 1.3)} Q${P(4.5, 0.3)} ${P(5, 0)}`, h.a.detail));
  });
  return out.join('\n');
};

// L'angle d'une main simple qui met l'axe de sa prise sur axe (degrés écran) et son avant-bras vers vers [x, y].
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
// Les deux mains d'« Écorcer » (mains simples, mains/moteur.js) : la droite tient le couteau, le pouce couché sur
// le dos de la lame ; la gauche tire le bout écorcé de la racine vers le bas, au travers du pincement. La vue se
// dessine la pointe à droite, puis se retourne en miroir : la lame pointe à gauche, et la main du couteau, dessinée
// gauche (vue du côté du pouce, le pouce couché sur le dos), devient la droite.
const MAINS_ECORCER = {
  couteau: { pose: 'prise-pouce-dos', vue: 'pouce', cote: 'gauche', ech: 0.69, x: 72, rot: null, vers: [-200, 120] },
  racine: { pose: 'prise-corde', vue: 'paume', cote: 'droite', ech: 0.69, y: 186, rot: null, vers: [320, 330] },
};
const BORD_V = z => ({ x0: 0, y0: 0, x1: z.l, y1: z.h });

// Anneau de rotation autour d'une tige : moitié arrière en caché, moitié avant fléchée.
const anneau = (h, cx, cy, rx, ry) => ({
  derriere: h.path(`M${cx},${cy - ry} A${rx} ${ry} 0 0 0 ${cx},${cy + ry}`, h.a.cache),
  devant: h.fleche(`M${cx},${cy - ry} A${rx} ${ry} 0 0 1 ${cx},${cy + ry}`),
});

// Copeau d'écorce roulé.
const copeau = (h, x, y, r, sens = 1) => h.path(
  `M${x - r},${y} A${r} ${r * 0.8} 0 1 ${sens > 0 ? 1 : 0} ${x + r},${y - r * 0.3} `
  + `M${x - r * 0.4},${y - r * 0.1} A${r * 0.45} ${r * 0.4} 0 1 ${sens > 0 ? 1 : 0} ${x + r * 0.35},${y - r * 0.3}`, h.a.detail);

// ─── la planche ──────────────────────────────────────────────────────────────────────
module.exports = (h) => {
  // Vue 1 — la tourbière en coupe dans l'axe de la racine.
  const yS = 66, yM = 90, yR = 95, WR = 8;         // dessus de la mousse, dessous, axe de la racine
  const g0 = 90, g1 = 350;                         // la mousse ouverte
  const Pb = 338, Rb = 23.5, yL = yR - 2 * Rb;     // le pli où la racine quitte son lit ; y de la partie tirée
  const enterree = [[Pb, yR], [420, yR + 0.5], [520, yR - 0.5], [600, yR]];
  const tiree = [...Array(9)].map((_, k) => {
    const a = Math.PI / 2 + Math.PI * k / 8;
    return [Pb + Rb * Math.cos(a), yL + Rb + Rb * Math.sin(a)];
  }).concat([[360, yL], [460, yL], [558, yL]]);

  // Vue 2 — écorcer.
  const hautR = [[105, 112], [106, 90], [108, 60], [115, 30], [124, 2]];
  const basR = [[105, 114], [104.5, 140], [104, 162], [103.5, 200]];

  // Vues 3 et 4 — fendre.
  const fut = [[79, 206], [79, 118]];
  const gF = [[76.5, 118], [75, 100], [67, 78], [52, 55], [33, 36], [14, 24]];
  const dF = gF.map(([x, y]) => [158 - x, y]);
  // La fente partie au centre a filé vers le côté mince : la moitié mince s'amincit vers la
  // fourche, l'épaisse s'y épaissit — c'est ce qui se voit sur la racine.
  const wGD = u => 1.8 + 3.2 * u, wDD = u => 8.2 - 3.2 * u;
  const gD = [[74.9, 118], [73.9, 92], [71, 64], [66, 38], [60, 14]];
  const dD = [[79.9, 118], [82.6, 108], [92, 98], [108, 92], [126, 89], [146, 88]];

  // Vue 6 — la hart. Trois états, de haut en bas.
  const wH = u => 7 - 4.3 * u;
  const hA = [[18, 26], [200, 26.5], [380, 25.5]];
  const hB = [[18, 78], [200, 78.5], [380, 77.5]];
  const wC = u => 7 - 2.4 * u;
  const hC = [[18, 128], [120, 128], [228, 128], [244, 127], [258, 120], [264, 106], [258, 92], [244, 86],
    [230, 92], [224, 106], [228, 117]];

  return {
    ref: '103-10',
    titre: 'La wattape et la hart',
    desc: 'La racine d’épinette : dans une tourbière, on écarte la mousse et on tire la racine à '
      + 'l’horizontale, dans son axe, et elle se décolle de son lit sur sa longueur. Ébouillantée ou trempée, '
      + 'elle s’écorce en la tirant pincée entre le pouce et le dos de la lame. On la fend en deux dans la '
      + 'longueur en écartant les moitiés également ; si la fente file vers le côté mince, on plie plus fort '
      + 'le côté épais. Elle se garde sèche, en couronne. La hart : une pousse de saule tordue sur elle-même '
      + 'jusqu’à ce qu’elle plie sans casser, puis bouclée et arrêtée par quelques tours.',
    format: 'pleine',
    disposition: [['tirer'], ['ecorcer', 'fendre', 'derive'], ['couronne', 'hart']],
    hauteurs: [1, 1.15, 0.9],
    largeurs: [[1], [1.5, 1, 1], [1, 2.2]],
    vues: {
      tirer: {
        titre: 'Écarter la mousse, tirer la racine',
        dessin: z => {
          const out = [];
          // la tourbe, et le lit vide de la racine
          out.push(h.rect(0, yM, z.l, z.h - yM, h.a.hachure('terre')));
          out.push(h.rect(g0 + 2, yM - 1.2, Pb - g0 - 2, yR + WR / 2 - yM + 1.7, h.a.blanc));
          out.push(h.path(`M0,${yM} L${g0 + 2},${yM} Q${g0 + 5},${yR + WR / 2} ${g0 + 10},${yR + WR / 2} L${Pb},${yR + WR / 2}`, h.a.arete));
          out.push(h.ligne(Pb, yM, z.l, yM, h.a.detail));
          // la mousse : têtes de sphaigne en dessus, tiges en dedans, bords arrachés
          const mousse = (x0, x1) => {
            let d = `M${x0},${yS}`;
            for (let x = x0; x < x1 - 5; x += 6) d += ` a3,3 0 0 1 6,0`;
            const tiges = [];
            for (let x = x0 + 3; x < x1 - 2; x += 6) tiges.push(`M${x},${yS + 3} q2,5 0,10 q-2,5 0,10`);
            return [h.rect(x0, yS - 3, x1 - x0, yM - yS + 3, h.a.blanc), h.path(d, h.a.arete), h.path(tiges.join(' '), h.a.fin)].join('\n');
          };
          const dechire = x => h.path(D([[x, yS - 1], [x + 2, yS + 5], [x - 1, yS + 10], [x + 2, yS + 15], [x - 1, yS + 20], [x + 1, yM]]), h.a.detail);
          // le pied de l'épinette, qui s'évase dans la mousse, et le bout de racine resté au tronc
          const tronc = lisse([[18, -1], [17, 30], [14, 50], [7, 62], [0, 67]], 6)
            .concat([[0, 72], [70, 72]], lisse([[70, 67], [58, 62], [50, 50], [47, 30], [46, -1]], 6));
          out.push(h.path(D(tronc) + ' Z', h.a.blanc));
          out.push(h.path(D(lisse([[18, -1], [17, 30], [14, 50], [7, 62], [0, 67]], 6)), h.a.contour));
          out.push(h.path(D(lisse([[70, 67], [58, 62], [50, 50], [47, 30], [46, -1]], 6)), h.a.contour));
          out.push(bande(h, [[0, yR + 1], [40, yR + 0.5], [86, yR]], WR, { bouts: [false, false], lignes: [[0.05, 0.95, 0]] }));
          out.push(h.ellipse(86, yR, 2, WR / 2, h.a.blanc), h.ellipse(86, yR, 2, WR / 2, h.a.detail));
          out.push(mousse(g1, z.l), dechire(g1), mousse(0, g0), dechire(g0));
          const ecailles = [];
          for (let y = 6, k = 0; y < 58; y += 8, k++) {
            const x = 22 + (k % 2) * 7;
            ecailles.push(`M${x},${y} q5,-3 10,0`);
          }
          out.push(h.path(ecailles.join(' '), h.a.detail));
          // la racine : encore sous la mousse à droite, pliée et tirée à plat au-dessus
          out.push(bande(h, enterree, WR, { bouts: [false, false], lignes: [[0.05, 1, 0]] }));
          out.push(bande(h, tiree, WR, { bouts: [false, true], lignes: [[0.15, 0.97, 0]] }));
          out.push(h.geste(`M568,${yL} L${z.l - 4},${yL}`));
          return out.join('\n');
        },
        renvois: z => [
          { n: 1, rond: [128, 26], cible: [g0 + 1, yS + 8], texte: 'mousse écartée à la main' },
          { n: 2, rond: [470, 146], cible: pt(enterree, WR, 0.5, 1.15), texte: 'racine juste sous la mousse' },
          { n: 3, rond: [450, 16], cible: [450, yL - WR / 2 - 0.8], texte: 'tirer à l’horizontale' },
        ],
      },

      ecorcer: {
        titre: 'Écorcer',
        dessin: z => {
          const out = [];
          // le couteau : la lame dos en haut (le manche est l'objet tenu, plus bas)
          const mancheC = [h.path('M8,121 L92,121 L92,139 L8,139 Q3,130 8,121 Z', h.a.hachure('bois', 'contour')),
            h.cercle(20, 130, 2.2, h.a.detail)].join('\n');
                    const lame = 'M92,117 L200,117 Q224,118 234,125 Q220,142 172,143 L92,143 Z';
          out.push(h.path(lame, h.a.blanc), h.path(lame, h.a.contour));
          out.push(h.path('M92,120 L200,120 Q220,121 229,125', h.a.fin));
          out.push(h.path('M92,135 L172,135 Q214,134 231,126.5', h.a.fin));
          // la racine : écorcée sous le pouce, encore dans son écorce au-dessus
          out.push(bande(h, basR, 7, { bouts: [false, true], lignes: [[0.02, 0.97, -0.35], [0.02, 0.97, 0.4]] }));
          out.push(bande(h, hautR, 10, { rugueux: 1.4, ecorce: [0.02, 0.98], bouts: [false, true] }));
          // l'écorce qui s'accumule et tombe
          out.push(h.path('M110,103 Q119,102 123,95 Q125,89 120,89 Q118,92 120,94', h.a.detail));
          out.push(copeau(h, 168, 110, 6), copeau(h, 186, 108, 5, -1), copeau(h, 146, 88, 4.5, -1));
          // la main du couteau : le poing sur le manche, le pouce couché vers la pointe sur le dos de la lame, juste
          // devant la garde, qui y pince la racine ; l'avant-bras part du côté du manche
          const Mc = MAINS_ECORCER.couteau;
          const oC = { x: Mc.x, y: 130, pose: Mc.pose, vue: Mc.vue, cote: Mc.cote, echelle: Mc.ech, diametre: 18 / Mc.ech, ...(Mc.rot ? { rotation: Mc.rot } : {}) };
          out.push(h.formes.mainSimple({ ...oC, angle: poser(h, oC, 0, Mc.vers), objet: mancheC, avantbras: { vers: Mc.vers, bord: BORD_V(z), bras: { pli: 0 } } }).svg);
          // l'autre main tire le bout écorcé vers le bas, au travers du pincement : le poing sur la racine, côté
          // paume, l'avant-bras qui part en bas, du côté de la pointe
          const Mr = MAINS_ECORCER.racine;
          const racineBas = bande(h, basR, 7, { bouts: [false, true], lignes: [[0.02, 0.97, -0.35], [0.02, 0.97, 0.4]] });
          const oR = { x: 104, y: Mr.y, pose: Mr.pose, vue: Mr.vue, cote: Mr.cote, echelle: Mr.ech, diametre: 7 / Mr.ech, ...(Mr.rot ? { rotation: Mr.rot } : {}) };
          out.push(h.formes.mainSimple({ ...oR, angle: poser(h, oR, 90, Mr.vers), objet: racineBas, avantbras: { vers: Mr.vers, bord: BORD_V(z), bras: { pli: 0 } } }).svg);
          // le geste : tirer la racine vers le bas
          out.push(h.geste('M70,164 L70,204'));
          return `<g transform="matrix(-1 0 0 1 ${z.l} 0)">\n${out.join('\n')}\n</g>`;
        },
        renvois: z => [
          { n: 4, rond: [170, 34], cible: pt(hautR, 10, 0.55, 1.2), texte: 'ébouillantée ou trempée' },
          { n: 5, rond: [192, 84], cible: [108, 118], texte: 'pouce sur le dos de la lame' },
          { n: 6, rond: [198, 156], cible: [130, 168], texte: 'tirer la racine au travers' },
        ].map(r => ({ ...r, rond: [z.l - r.rond[0], r.rond[1]], cible: [z.l - r.cible[0], r.cible[1]] })),
      },

      fendre: {
        titre: 'Fendre',
        dessin: z => [
          bande(h, fut, 10, { bouts: [true, false], lignes: [[0.03, 1, 0]] }),
          bande(h, gF, 5, { bouts: [false, true], lignes: [[0.03, 0.97, -0.2]] }),
          bande(h, dF, 5, { bouts: [false, true], lignes: [[0.03, 0.97, 0.2]] }),
          h.geste('M40,64 L27,76'),
          h.geste('M118,64 L131,76'),
        ].join('\n'),
        renvois: z => [
          { n: 7, rond: [79, 72], cible: [79, 114], texte: 'en deux, dans la longueur' },
          { n: 8, rond: [136, 116], cible: pt(dF, 5, 0.42, -1.3), texte: 'moitiés écartées également' },
        ],
      },

      derive: {
        titre: 'Si la fente dérive',
        dessin: z => [
          bande(h, fut, 10, { bouts: [true, false] }),
          bande(h, gD, wGD, { bouts: [false, true], trait: h.a.arete }),
          bande(h, dD, wDD, { bouts: [false, true], lignes: [[0.05, 0.97, -0.3]] }),
          h.geste('M146,98 L146,124'),
        ].join('\n'),
        renvois: z => [
          { n: 9, rond: [30, 96], cible: pt(gD, wGD, 0.3, 2.2), texte: 'la fente file côté mince' },
          { n: 10, rond: [118, 52], cible: pt(dD, wDD, 0.6, 1.25), texte: 'plier plus fort le côté épais' },
        ],
      },

      couronne: {
        titre: 'Garder en couronne',
        dessin: z => {
          const cx = z.l / 2, cy = 84, out = [];
          out.push(h.ellipse(cx, cy, 70, 46, h.a.blanc), h.ellipse(cx, cy, 70, 46, h.a.contour));
          [0.25, 0.5, 0.75].forEach(f => out.push(h.ellipse(cx, cy, 70 - 24 * f, 46 - 21 * f, h.a.fin)));
          out.push(h.ellipse(cx, cy, 46, 25, h.a.contour));
          // les tours de ligature, de chaque côté
          for (const s of [-1, 1]) {
            for (const dx of [-5, 0, 5]) {
              const x = cx + s * 58 + dx;
              out.push(h.rect(x - 1.8, cy - 13, 3.6, 26, h.a.blanc), h.rect(x - 1.8, cy - 13, 3.6, 26, h.a.arete));
            }
          }
          out.push(bande(h, [[cx + 38, cy + 34], [cx + 52, cy + 44], [cx + 66, cy + 50]], 4, { bouts: [false, true] }));
          return out.join('\n');
        },
        renvois: z => [
          { n: 11, rond: [z.l - 18, 18], cible: [z.l / 2 + 40, 84 - 38], texte: 'sèche ; remouillée à l’usage' },
        ],
      },

      hart: {
        titre: 'La hart de saule',
        dessin: z => {
          const r = anneau(h, 336, 78, 6, 13);
          return [
            bande(h, hA, wH, { bourgeons: [0.12, 0.22, 0.33, 0.44, 0.55, 0.66, 0.76, 0.86, 0.95] }),
            r.derriere,
            bande(h, hB, wH, { torsade: [0.03, 0.97], pas: 7 }),
            r.devant,
            bande(h, hC, wC, { torsade: [0.03, 0.97], pas: 7, bouts: [true, false] }),
            bande(h, [[228, 117], [231, 121.5], [225, 134]], 4.2, { bouts: [false, false] }),
            bande(h, [[220, 122], [214, 134]], 4.2, { bouts: [false, false] }),
            bande(h, [[209, 122], [203, 134], [194, 140], [182, 143]], 4, { bouts: [false, true] }),
          ].join('\n');
        },
        renvois: z => [
          { n: 12, rond: [60, 54], cible: pt(hA, wH, 0.12, 1.4), texte: 'pousse de saule droite' },
          { n: 13, rond: [374, 52], cible: [341, 70], texte: 'tordre sur elle-même' },
          { n: 14, rond: [300, 104], cible: [268, 106], texte: 'elle plie alors sans casser' },
        ],
      },
    },
  };
};
