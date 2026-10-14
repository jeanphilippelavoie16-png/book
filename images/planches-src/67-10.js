// Planche 67-10 — La romaine graduée aux bidons. Chapitre 62, § « Peser sans balance » :
// une barre pendue près d'un bout, la pièce au bout court, un contrepoids qui coulisse sur
// le bout long ; graduée une fois avec des bidons d'eau pleins (4 L = 4 kg), entailles
// chiffrées au couteau.
// La charte : la perche et les masses au contour fort ; le quartier et le gros caillou ont leur face
// à l'ombre en bas à droite. Un seul rouge : le caillou qu'on fait coulisser.
// Redessin du 14 octobre 2026 (le quartier pendu avait l'air d'une poire) : le quartier arrière est
// celui de la 62-04, découpé dans la carcasse commune (_carcasse-orignal.js) de la même façon,
// tourné pour pendre par le jarret au crochet : le centre de la pièce tombe sous le crochet. La vue
// du haut a pris un peu de hauteur à la graduation pour que le quartier se lise.
const C = require('./_carcasse-orignal');
const QUARTIER = (() => {
  const S = C.SILHOUETTE, rev = a => a.slice().reverse();
  const interpY = (a, b, y) => a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]);
  const Y_CANON = 1035;                                   // sous le tarse : le bas de patte est parti
  const HAUT = [1190, S[21][1] + (S[22][1] - S[21][1]) * (1190 - S[21][0]) / (S[22][0] - S[21][0]), 'c'];
  const Q = [
    ...S.slice(30, 44),
    [interpY(S[43], S[44], Y_CANON), Y_CANON, 'c'], [interpY(S[62], S[61], Y_CANON), Y_CANON, 'c'],
    ...S.slice(62, 74), ...rev(C.LIMITES.hanche.slice(1, -1)), HAUT, ...S.slice(22, 30),
  ];
  // lissé comme à la 62-04 : les points marqués 'c' sont des angles
  const nu = pts => pts.map(p => [p[0], p[1]]);
  const i0 = Q.findIndex(p => p[2] === 'c');
  const r = Q.slice(i0).concat(Q.slice(0, i0), [Q[i0]]);
  const out = []; let cur = [r[0]];
  for (let i = 1; i < r.length; i++) {
    cur.push(r[i]);
    if (r[i][2] === 'c' || i === r.length - 1) { const s = C.dense(nu(cur), 2.5, false); out.push(...(out.length ? s.slice(1) : s)); cur = [r[i]]; }
  }
  out.pop();
  // le jarret, où passe le crochet (entre le tendon et l'os, au-dessus de la pointe du jarret) ;
  // la coupe du canon, et l'os au milieu
  const jarret = [1440, 880], canon = [[interpY(S[43], S[44], Y_CANON), Y_CANON], [interpY(S[62], S[61], Y_CANON), Y_CANON]];
  let A = 0, cx = 0, cy = 0;
  for (let i = 0; i < out.length; i++) { const a = out[i], b = out[(i + 1) % out.length], c = a[0] * b[1] - b[0] * a[1]; A += c; cx += (a[0] + b[0]) * c; cy += (a[1] + b[1]) * c; }
  A /= 2;
  return { pts: out, jarret, canon, centre: [cx / (6 * A), cy / (6 * A)] };
})();
// Le quartier pendu : le jarret en (hx, hy), la pièce qui descend jusqu'à yBas. Rend le contour et les
// points utiles dans la vue.
function quartierPendu(hx, hy, yBas) {
  const Q = QUARTIER, [jx, jy] = Q.jarret;
  const ang = Math.PI / 2 - Math.atan2(Q.centre[1] - jy, Q.centre[0] - jx);   // le centre sous le crochet
  const co = Math.cos(ang), si = Math.sin(ang);
  const rot = ([x, y]) => [(x - jx) * co - (y - jy) * si, (x - jx) * si + (y - jy) * co];
  const bas = Math.max(...Q.pts.map(p => rot(p)[1]));
  const s = (yBas - hy) / bas;
  const T = p => { const [u, v] = rot(p); return [hx + u * s, hy + v * s]; };
  // les grandes masses du quartier, celles de la 62-04 (module de la carcasse), au trait fin
  const masses = ['bicepsFemoral', 'semitendineux', 'pointeSurlonge', 'gastrocnemien']
    .map(k => C.dense(C.MUSCLES[k].pts.map(p => [p[0], p[1]]), 3, true).map(T));
  return { pts: Q.pts.map(T), canon: Q.canon.map(T), masses, s, T };
}

module.exports = (h) => {
  // Courbe fermée lissée passant par des points (Catmull-Rom)
  const lisse = (p, k = 0.35) => {
    const n = p.length, f = (v) => v.toFixed(1);
    let d = `M ${f(p[0][0])} ${f(p[0][1])}`;
    for (let i = 0; i < n; i++) {
      const a = p[(i - 1 + n) % n], b = p[i], c = p[(i + 1) % n], e = p[(i + 2) % n];
      const c1 = [b[0] + (c[0] - a[0]) * k / 2, b[1] + (c[1] - a[1]) * k / 2];
      const c2 = [c[0] - (e[0] - b[0]) * k / 2, c[1] - (e[1] - b[1]) * k / 2];
      d += ` C ${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(c[0])} ${f(c[1])}`;
    }
    return d + ' Z';
  };
  // La charte : une forme ronde a sa face à l'ombre en bas à droite (lumière en haut à gauche) :
  // l'aplat gris est la forme, moins la même forme décalée vers le haut à gauche.
  let nOmbre = 0;
  const forme = (d, trait = h.a.arete, dDecale = null) => {
    if (!dDecale) return h.path(d, h.a.blanc) + '\n' + h.path(d, trait);
    const id = `om-67-10-${++nOmbre}`;
    return [h.path(d, h.a.blanc), `<clipPath id="${id}">${h.path(d, h.a.blanc)}</clipPath>`,
      `<g clip-path="url(#${id})">`, h.path(d, h.a.ombre), h.path(dDecale, h.a.blanc), '</g>', h.path(d, trait)].join('\n');
  };
  // un caillou irrégulier centré en (cx, cy), demi-largeurs rx, ry
  const CAILLOU = [[-1, -0.1], [-0.82, -0.72], [-0.3, -1], [0.35, -0.94], [0.9, -0.55], [1, 0.12], [0.7, 0.82], [0, 1], [-0.72, 0.8]];
  const caillou = (cx, cy, rx, ry, trait, ombre = false) => forme(lisse(CAILLOU.map(([u, v]) => [cx + u * rx, cy + v * ry]), 0.4), trait,
    ombre ? lisse(CAILLOU.map(([u, v]) => [cx - rx * 0.16 + u * rx, cy - ry * 0.2 + v * ry]), 0.4) : null);

  // La perche vue de côté : dessus de niveau, entailles en V sur le dessus, dessous qui s'effile.
  // encoches : [[x, demi-ouverture, profondeur], …]
  const perche = (x1, x2, y, e1, e2, encoches, trait, coupeDroite = false) => {
    const pts = [[x1, y]];
    encoches.slice().sort((a, b) => a[0] - b[0]).forEach(([x, o, p]) => pts.push([x - o, y], [x, y + p], [x + o, y]));
    pts.push([x2, y]);
    const bas = (x) => y + e1 + (e2 - e1) * (x - x1) / (x2 - x1);
    const o = [];
    if (coupeDroite) {
      // bout de droite rompu : trait de coupure ondulé
      const d = `M ${x1} ${y} ` + pts.slice(1).map(p => `L ${p[0]} ${p[1]}`).join(' ') +
        ` C ${x2 + 5} ${y + e2 * 0.3} ${x2 - 5} ${y + e2 * 0.7} ${x2} ${bas(x2)} L ${x1} ${bas(x1)} Z`;
      o.push(h.path(d, h.a.blanc));
      o.push(h.path(`M ${x2} ${bas(x2)} L ${x1} ${bas(x1)} L ${x1} ${y} ` + pts.slice(1).map(p => `L ${p[0]} ${p[1]}`).join(' '), trait));
      o.push(h.path(`M ${x2} ${y} C ${x2 + 5} ${y + e2 * 0.3} ${x2 - 5} ${y + e2 * 0.7} ${x2} ${bas(x2)}`, h.a.detail));
    } else {
      pts.push([x2, bas(x2)], [x1, bas(x1)]);
      o.push(h.chemin(pts, h.a.blanc, true));
      o.push(h.chemin(pts, trait, true));
    }
    return { svg: o.join('\n'), bas };
  };

  // Corde vue de chant, à grande échelle : bande blanche, deux bords, torsion
  const bande = (x, y1, y2, l) => {
    const o = [h.rect(x - l / 2, y1, l, y2 - y1, h.a.blanc),
      h.ligne(x - l / 2, y1, x - l / 2, y2, h.a.detail), h.ligne(x + l / 2, y1, x + l / 2, y2, h.a.detail)];
    for (let y = y1 + 4; y < y2 - 2; y += 5) o.push(h.path(`M ${x - l / 2} ${y} Q ${x} ${y - 0.4} ${x + l / 2} ${y - 3}`, h.a.fin));
    return o.join('\n');
  };

  // Un bidon de 4 L pendu par sa poignée : poignée en (x, y), corps de l × ht dessous
  const bidon = (x, y, l, ht) => {
    const top = y + ht * 0.2, g = x - l / 2, r = 2;
    const o = [];
    const corps = `M ${g + r} ${top} L ${g + l - r} ${top} Q ${g + l} ${top} ${g + l} ${top + r} L ${g + l} ${top + ht - r} ` +
      `Q ${g + l} ${top + ht} ${g + l - r} ${top + ht} L ${g + r} ${top + ht} Q ${g} ${top + ht} ${g} ${top + ht - r} L ${g} ${top + r} Q ${g} ${top} ${g + r} ${top} Z`;
    o.push(h.path(corps, h.a.blanc), h.path(corps, h.a.arete));
    // goulot et bouchon à gauche, poignée à droite
    o.push(h.rect(g + 1.5, top - ht * 0.14, l * 0.28, ht * 0.14, h.a.detail));
    o.push(h.path(`M ${x - l * 0.08} ${top} L ${x} ${y} L ${g + l - 1.5} ${top}`, h.a.detail));
    o.push(h.ligne(g + 1.5, top + ht * 0.62, g + l - 1.5, top + ht * 0.62, h.a.fin));
    return o.join('\n');
  };

  // Crochet de branche, petit : tige verticale de (x, y1) à (x, y2), chicot qui remonte
  const crochet = (x, y1, y2, s = 1) => [
    h.ligne(x, y1, x, y2, h.a.arete),
    h.ligne(x, y2, x + 7 * s, y2 - 9 * s, h.a.arete),
  ].join('\n');

  // ─── Vue 1 : la romaine en usage ──────────────────────────────────────────────────────
  const U = (z) => {
    const y = 46, x1 = 30, x2 = z.l - 8, px = 110, lx = 70, pas = 110;
    // mêmes abscisses que « Graduer » : 4, 8, 12 kg, puis 16 kg
    const grad = []; for (let x = px + pas; x <= x2 - 14 && grad.length < 4; x += pas) grad.push(x);
    const cx = grad[1];
    return { y, x1, x2, px, lx, pas, grad, cx };
  };

  // ─── Vue 3 : graduer ──────────────────────────────────────────────────────────────────
  const G = (z) => {
    const rh = (z.h - 30) / 4;
    const px = 110, lx = 70, x1 = 24, x2 = z.l - 40, pas = 110;
    const xs = [px + pas, px + 2 * pas, px + 3 * pas];
    const yb = (r) => r * rh + 16;
    return { rh, px, lx, x1, x2, pas, xs, yb };
  };

  return {
    ref: '67-10',
    titre: 'La romaine graduée aux bidons',
    desc: 'Une perche pendue par une corde près d’un bout. Le quartier est accroché au bras court par un crochet de branche ; un caillou lié dans une boucle coulisse sur le bras long et tombe dans des entailles. De près : le bras court avec son lest lié dessous, la boucle de charge assise dans une entaille et l’entaille en V sous la corde du pivot ; le caillou lié en croix, sa boucle dans une entaille marquée au couteau. En bas, la graduation : la perche à vide tient de niveau, puis un, deux et trois bidons de 4 L au crochet, le caillou reculé d’une entaille chaque fois, à intervalles égaux de 4 kg.',
    format: 'pleine',
    disposition: [['usage'], ['pivot', 'caillou'], ['graduer']],
    hauteurs: [4.6, 3, 5.4],
    largeurs: [[1], [1, 1], [1]],
    vues: {
      usage: {
        titre: 'Un quartier à la pesée',
        dessin: (z) => {
          const g = U(z), o = [];
          // branche porteuse
          o.push(h.path(`M 40 3 L 186 5 Q 190 8.5 186 12 L 40 11 Q 36 7 40 3 Z`, h.a.blanc));
          o.push(h.path(`M 40 3 L 186 5 Q 190 8.5 186 12 L 40 11 Q 36 7 40 3 Z`, h.a.arete));
          o.push(h.path(`M 60 7 Q 90 6 120 8 M 140 7.5 Q 160 8 176 8`, h.a.fin));
          // corde du pivot, tours sur la branche
          o.push(h.ligne(g.px, 11, g.px, g.y + 3, h.a.arete));
          o.push(h.ligne(g.px - 3, 4, g.px - 3, 11.5, h.a.detail), h.ligne(g.px + 3, 4.2, g.px + 3, 11.5, h.a.detail));
          // perche
          const enc = [[g.px, 2.5, 3], [g.lx, 2.5, 3], ...g.grad.map(x => [x, 2, 2.5])];
          const p = perche(g.x1, g.x2, g.y, 11, 7, enc, h.a.contour);
          o.push(p.svg);
          // traits de chiffrage au couteau : un par 4 kg, à droite de chaque entaille
          g.grad.forEach((x, i) => { for (let k = 0; k <= i; k++) o.push(h.ligne(x + 5 + k * 3, g.y + 2, x + 4 + k * 3, g.y + 8, h.a.detail)); });
          // lest au bout court : un caillou lié SOUS la perche. Posé dessus, il monterait le centre
          // de gravité au-dessus du pivot et la perche basculerait d'un bord au lieu de se stabiliser.
          const lb = p.bas(44);
          o.push(caillou(44, lb + 11, 15, 10.5, h.a.arete));
          [37, 51].forEach(x => o.push(h.ligne(x, g.y, x, lb + 19.5, h.a.detail)));
          // boucle de charge et crochet de branche
          o.push(h.ligne(g.lx, g.y + 3, g.lx, 66, h.a.arete));
          // le crochet d'abord : son chicot entre dans le jarret, le quartier le cache
          o.push(crochet(g.lx, 64, 99, 1.6));
          // quartier arrière pendu par le jarret : le canon coupé en haut, la coupe de la hanche en bas
          const q = quartierPendu(g.lx + 9, 87.5, z.h - 4);
          const dq = 'M' + q.pts.map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L') + ' Z';
          const dqo = 'M' + q.pts.map(p => `${(p[0] - 6).toFixed(1)} ${(p[1] - 7).toFixed(1)}`).join(' L') + ' Z';
          o.push(forme(dq, h.a.contour, dqo));
          // les coutures entre les grandes masses, découpées par le contour du quartier
          o.push(`<clipPath id="q-67-10">${h.path(dq, h.a.blanc)}</clipPath>`, '<g clip-path="url(#q-67-10)">',
            ...q.masses.map(m => h.path('M' + m.map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L') + ' Z', h.a.detail)), '</g>');
          o.push(h.path(dq, h.a.contour));
          // la coupe du canon : l'os au milieu
          const [c1, c2] = q.canon, cm = [(c1[0] + c2[0]) / 2, (c1[1] + c2[1]) / 2], lc = Math.hypot(c2[0] - c1[0], c2[1] - c1[1]);
          o.push(h.ellipse(cm[0], cm[1], lc * 0.2, lc * 0.17, h.a.detail));
          // contrepoids : caillou dans sa boucle
          o.push(h.ligne(g.cx, g.y + 2.5, g.cx, g.y + 24, h.a.arete));
          o.push(caillou(g.cx, g.y + 38, 17, 14, h.a.contour));
          o.push(h.path(`M ${g.cx - 1} ${g.y + 24} Q ${g.cx + 5} ${g.y + 38} ${g.cx} ${g.y + 52}`, h.a.detail));
          o.push(h.path(`M ${g.cx - 17} ${g.y + 36} Q ${g.cx} ${g.y + 41} ${g.cx + 17} ${g.y + 36}`, h.a.detail));
          // le geste : on fait coulisser le caillou jusqu'à l'équilibre
          o.push(h.geste(`M ${g.cx - 52} ${g.y - 10} L ${g.cx + 52} ${g.y - 10}`, { double: true }));
          return o.join('\n');
        },
        renvois: (z) => {
          const g = U(z);
          // le bord droit du quartier, aux deux tiers de sa hauteur
          const q = quartierPendu(g.lx + 9, 87.5, z.h - 4), yq = 87.5 + (z.h - 4 - 87.5) * 0.62;
          const qd = q.pts.filter(p => Math.abs(p[1] - yq) < 4).reduce((m, p) => (p[0] > m[0] ? p : m), [0, yq]);
          return [
            { n: 1, rond: [g.px + 30, 26], cible: [g.px + 1, 26], texte: 'corde du pivot, près du bout' },
            { n: 2, rond: [qd[0] + 34, qd[1] + 6], cible: qd, texte: 'quartier au bras court' },
            { n: 3, rond: [270, g.y + 30], cible: [270, g.y + 10], texte: 'perche droite et raide' },
            { n: 4, rond: [g.cx + 50, g.y + 40], cible: [g.cx + 18, g.y + 38], texte: 'caillou qui coulisse' },
          ];
        },
      },

      pivot: {
        titre: 'Le bras court, de près',
        dessin: (z) => {
          const y = 34, e = 28, lx = 96, px = 196, o = [];
          const p = perche(6, z.l - 14, y, e, e - 2, [[lx, 7, 8], [px, 8, 9]], h.a.contour, true);
          const lb = p.bas(38);
          o.push(p.svg);
          // fil du bois
          o.push(h.path(`M 70 ${y + 12} Q 140 ${y + 10} 230 ${y + 14} M 120 ${y + 20} Q 180 ${y + 21} 262 ${y + 19}`, h.a.fin));
          // lest : caillou lié sous le bout, les tours passent par-dessus la perche
          o.push(caillou(38, lb + 13.5, 28, 13, h.a.arete));
          [26, 50].forEach(x => o.push(bande(x, y - 1, lb + 24.5, 4)));
          // boucle de charge, de chant, assise dans son entaille
          o.push(bande(lx, y + 8, y + e + 16, 6));
          o.push(h.path(`M ${lx - 3} ${y + e + 16} Q ${lx} ${y + e + 19} ${lx + 3} ${y + e + 16}`, h.a.detail));
          // crochet de branche : tige, chicot qui remonte, bouts coupés
          const t0 = y + e + 14, t1 = z.h - 6;
          const cr = `M ${lx - 4} ${t0} L ${lx - 4} ${t1} L ${lx + 4} ${t1} L ${lx + 4} ${t1 - 6} L ${lx + 21} ${t1 - 24} L ${lx + 16} ${t1 - 28} L ${lx + 4} ${t1 - 15} L ${lx + 4} ${t0} Z`;
          o.push(h.path(cr, h.a.blanc), h.path(cr, h.a.contour));
          // bouts coupés : bois de bout
          o.push(h.chemin([[lx + 17.5, t1 - 26.5], [lx + 19.5, t1 - 24.5]], h.a.fin));
          // ligature de la corde sur la tige
          [t0 + 2, t0 + 6, t0 + 10].forEach(yy => o.push(h.ligne(lx - 5, yy, lx + 5, yy - 1.5, h.a.detail)));
          // corde du pivot : descend dans l'entaille en V et fait le tour de la perche
          o.push(bande(px, 0, y + 9, 7));
          o.push(bande(px, y + 9, p.bas(px), 7));
          o.push(h.path(`M ${px - 3.5} ${p.bas(px)} Q ${px} ${p.bas(px) + 4} ${px + 3.5} ${p.bas(px)}`, h.a.detail));
          return o.join('\n');
        },
        renvois: (z) => {
          const y = 34;
          return [
            { n: 5, rond: [74, z.h - 12], cible: [54, y + 48], texte: 'lest lié dessous, pour la tare' },
            { n: 6, rond: [134, y + 38], cible: [100, y + 34], texte: 'boucle de charge, en entaille' },
            { n: 7, rond: [150, z.h - 12], cible: [115, z.h - 24], texte: 'crochet de branche' },
            { n: 8, rond: [240, 18], cible: [203, y + 2], texte: 'entaille en V sous le pivot' },
          ];
        },
      },

      caillou: {
        titre: 'Le contrepoids, de près',
        dessin: (z) => {
          const y = 26, e = 18, nx = [70, 150, 230], o = [];
          const p = perche(8, z.l - 10, y, e, e - 1, nx.map(x => [x, 6, 7]), h.a.contour, true);
          o.push(p.svg);
          o.push(h.path(`M 20 ${y + 10} Q 90 ${y + 9} 170 ${y + 12} M 180 ${y + 8} Q 220 ${y + 7} 268 ${y + 9}`, h.a.fin));
          // marques au couteau : un trait par bidon, à droite de chaque entaille
          nx.forEach((x, i) => { for (let k = 0; k <= i; k++) o.push(h.ligne(x + 9 + k * 4, y + 4, x + 7 + k * 4, y + 13, h.a.detail)); });
          // boucle du caillou, assise dans l'entaille du milieu
          const cx = nx[1];
          o.push(bande(cx, y + 7, 72, 5));
          // caillou lié en croix
          const cy = 98, rx = 42, ry = 25;
          o.push(caillou(cx, cy, rx, ry, h.a.contour, true));
          o.push(h.path(`M ${cx - 2} ${cy - ry + 1} Q ${cx + 9} ${cy} ${cx - 1} ${cy + ry - 0.5}`, h.a.arete));
          o.push(h.path(`M ${cx + 2} ${cy - ry + 1} Q ${cx + 13} ${cy} ${cx + 3} ${cy + ry - 0.5}`, h.a.arete));
          o.push(h.path(`M ${cx - rx + 1} ${cy - 3} Q ${cx} ${cy + 5} ${cx + rx - 1} ${cy - 2}`, h.a.arete));
          o.push(h.path(`M ${cx - rx + 1} ${cy + 1} Q ${cx} ${cy + 9} ${cx + rx - 1} ${cy + 2}`, h.a.arete));
          // nœud au croisement, et au pied de la boucle
          o.push(h.ellipse(cx + 5, cy + 3, 5, 4, h.a.blanc), h.ellipse(cx + 5, cy + 3, 5, 4, h.a.arete));
          o.push(h.ellipse(cx, 72, 5, 3.5, h.a.blanc), h.ellipse(cx, 72, 5, 3.5, h.a.arete));
          return o.join('\n');
        },
        renvois: (z) => [
          { n: 9, rond: [226, 104], cible: [191, 100], texte: 'caillou lié en croix' },
          { n: 10, rond: [106, 62], cible: [147, 58], texte: 'boucle lâche, qui coulisse' },
          { n: 11, rond: [262, 64], cible: [243, 38], texte: 'entaille marquée au couteau' },
        ],
      },

      graduer: {
        titre: 'Graduer : à vide, puis un, deux, trois bidons',
        dessin: (z) => {
          const g = G(z), o = [];
          for (let r = 0; r < 4; r++) {
            const yb = g.yb(r);
            // bout de branche et corde du pivot
            o.push(h.path(`M ${g.px - 17} ${yb - 15} L ${g.px + 17} ${yb - 14.5} Q ${g.px + 19} ${yb - 12.5} ${g.px + 17} ${yb - 10.5} L ${g.px - 17} ${yb - 11} Q ${g.px - 19} ${yb - 13} ${g.px - 17} ${yb - 15} Z`, h.a.detail));
            o.push(h.ligne(g.px, yb - 11, g.px, yb + 2, h.a.arete));
            // perche, entailles déjà taillées
            const enc = [[g.px, 2, 2], [g.lx, 2, 2], ...g.xs.slice(0, r).map(x => [x, 2, 2.2])];
            const p = perche(g.x1, g.x2, yb, 6, 4, enc, h.a.arete);
            o.push(p.svg);
            // lest lié sous le bout court
            o.push(caillou(g.x1 + 10, p.bas(g.x1 + 10) + 5, 9, 4.5, h.a.detail));
            [g.x1 + 6, g.x1 + 14].forEach(x => o.push(h.ligne(x, yb, x, p.bas(x) + 8.5, h.a.fin)));
            // boucle de charge et crochet
            o.push(h.ligne(g.lx, yb + 2, g.lx, yb + 10, h.a.detail));
            o.push(crochet(g.lx, yb + 9, yb + 19, 0.8));
            // bidons, poignées enfilées sur une boucle passée au crochet
            const bl = 12, bh = 17, ecart = 14;
            for (let k = 0; k < r; k++) {
              const bx = g.lx + 3 + (k - (r - 1) / 2) * ecart;
              o.push(h.chemin([[g.lx + 3, yb + 14], [bx, yb + 19]], h.a.detail));
              o.push(bidon(bx, yb + 19, bl, bh));
            }
            // caillou à l'entaille d'équilibre
            if (r > 0) {
              const cx = g.xs[r - 1];
              o.push(h.ligne(cx, yb + 2, cx, yb + 12, h.a.detail));
              o.push(caillou(cx, yb + 18, 9, 7, h.a.arete));
            }
          }
          // cotes sous la dernière rangée : intervalles égaux
          const yb = g.yb(3), yc = yb + 44;
          [g.px, ...g.xs].forEach((x, i) => o.push(h.ligne(x, i === 3 ? yb + 27 : yb + 8, x, yc + 4, h.a.fin)));
          [g.px, ...g.xs].slice(0, 3).forEach((x, i) => o.push(h.cote(x, yc, g.xs[i], yc, '4 kg')));
          return o.join('\n');
        },
        renvois: (z) => {
          const g = G(z);
          return [
            { n: 12, rond: [330, g.yb(0) + 28], cible: [330, g.yb(0) + 4], texte: 'à vide : perche de niveau' },
            { n: 13, rond: [150, g.yb(1) + 28], cible: [g.lx + 11, g.yb(1) + 28], texte: 'bidon plein de 4 L : 4 kg' },
            { n: 14, rond: [g.xs[1] + 44, g.yb(2) - 14], cible: [g.xs[1] + 2, g.yb(2) + 1], texte: 'entaille à chaque équilibre' },
          ];
        },
      },
    },
  };
};
