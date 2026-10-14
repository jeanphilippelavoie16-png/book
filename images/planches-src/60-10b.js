// Planche 60-10b — un rang sur le moule, et le ramendage (ch. 60, « Nouer une nappe quand il n'y
// a pas de filet » et « Réparer au lieu de remplacer »). Page b de deux ; la page a (60-10a) porte
// l'aiguille, la charge et le nœud de maille en quatre temps.
//
// Le rang : on noue de gauche à droite, un nœud par maille, chaque nœud assis sur le bord du haut
// du moule. Entre deux nœuds, le fil descend devant le moule, passe dessous et remonte derrière :
// c'est ce tour qui fait la maille, d'où « le moule, et pas la main, garantit que toutes les mailles
// sont pareilles ». En coupe, à droite, la latte et le fil qui en fait le tour.
//
// Le ramendage, en trois temps : le trou ; recoupé jusqu'à un contour de mailles entières (les
// mailles enlevées, en tireté, sont celles qu'il faudra refaire, ni plus ni moins) ; renoué rang
// par rang à l'aiguille, le fil neuf en trait fort. Aucune cote : le chapitre ne donne aucune mesure.

'use strict';

module.exports = (h) => {
  const F = h.formes;
  const f = n => Math.round(n * 10) / 10;
  const P = (x, y) => `${f(x)} ${f(y)}`;
  const RAD = Math.PI / 180;
  const aiguilleTalon = (tx, ty, deg, L, chargee = true) =>
    F.aiguilleFilet({ x: tx + Math.cos(deg * RAD) * L / 2, y: ty + Math.sin(deg * RAD) * L / 2, longueur: L, angle: deg, chargee });
  const VIEUX = { ep: 3, debut: 'ouvert', fin: 'ouvert', trait: 'detail' };
  const brin = (a, b, o = VIEUX) => F.corde([a, b], o);
  const noeud = (x, y, r = 2.5) => h.ellipse(x, y, r * 1.25, r, h.a.plein);

  // ── Vue 1 : un rang sur le moule, et le moule en coupe ────────────────────────────────────
  const gR = z => {
    const gw = Math.min(56, z.h * 0.22), a = gw * 1.3;     // redessin du 14 octobre 2026 : de grandes mailles, deux rangs
    const tm = 10, xs = z.l - 34;                     // la coupe du moule, à droite
    const xf = xs - 44;                               // bout droit du moule vu de face
    const yg = z.h - gw - 28;
    const xL = 8, xR = xf - 8;
    const kc = 4;                                     // dernier nœud fait
    return { gw, a, tm, xs, xf, yg, kc, xL, xR, X: k => xL + a * 0.5 + k * a };
  };
  const vueRang = z => {
    const { gw, a, tm, xs, xf, yg, kc, xL, xR, X } = gR(z);
    const dans = x => x >= xL - 0.1 && x <= xR + 0.1;
    const out = [];
    const net = [], dessus = [], caches = [], nds = [];
    // les nœuds : rang r (0 = sur le moule), décalés d'une demi-maille d'un rang à l'autre
    const nR = Math.floor((yg - 4) / gw);
    const nx = (k, r) => X(k) + (r % 2 ? a / 2 : 0), ny = r => yg - r * gw;
    const compte = new Map(), cle = (k, r) => `${k},${r}`;
    // une barre coupée net aux bords gauche et droit du filet dessiné
    const coupeX = (A, B) => {
      const t = x => (x - A[0]) / (B[0] - A[0]);
      let [t0, t1] = [0, 1];
      if (B[0] !== A[0]) {
        const ta = t(xL), tb = t(xR);
        t0 = Math.max(0, Math.min(ta, tb)); t1 = Math.min(1, Math.max(ta, tb));
      } else if (!dans(A[0])) return null;
      if (t1 - t0 < 0.05) return null;
      return [[A[0] + (B[0] - A[0]) * t0, A[1] + (B[1] - A[1]) * t0], [A[0] + (B[0] - A[0]) * t1, A[1] + (B[1] - A[1]) * t1]];
    };
    const barre = (k1, r1, k2, r2) => {
      const s = coupeX([nx(k1, r1), ny(r1)], [nx(k2, r2), ny(r2)]);
      if (s) net.push(brin(...s));
      for (const [k, r] of [[k1, r1], [k2, r2]]) if (dans(nx(k, r)) && nx(k, r) > xL + 2 && nx(k, r) < xR - 2) compte.set(cle(k, r), 1);
    };
    const kMax = Math.ceil((xR - xL) / a) + 1;
    for (let r = 1; r < nR; r++) for (let k = -1; k <= kMax; k++) {
      // du nœud (k, r) aux deux nœuds du rang r + 1 au-dessus
      const kk = r % 2 ? k : k - 1;
      barre(k, r, kk, r + 1); barre(k, r, kk + 1, r + 1);
    }
    // les brins du dernier rang montent hors de la vue
    for (let k = -1; k <= kMax; k++) {
      const A = [nx(k, nR), ny(nR)];
      for (const s of [-1, 1]) {
        const c = coupeX(A, [A[0] + s * a / 2 * (A[1] - 4) / gw, 4]);
        if (c) net.push(brin(...c));
      }
    }
    for (const [c] of compte) { const [k, r] = c.split(',').map(Number); if (r >= 1) nds.push([nx(k, r), ny(r)]); }
    // le rang d'au-dessus pend sur le moule : mailles nouées (k <= kc) ou encore pendantes (k > kc)
    const yP = ny(1);
    for (let k = 0; X(k) < xR; k++) {
      const x = X(k);
      if (k <= kc) {
        for (const s of [-1, 1]) { const c = coupeX([x, yg], [x + s * a / 2, yP]); if (c) net.push(brin(...c)); }
        nds.push([x, yg]);
      } else if (dans(x + a / 2)) {
        const r = a * 0.2;
        net.push(F.corde([[x - a / 2, yP], [x - a / 2 + (a / 2 - r) * 0.55, yP + gw * 0.55], [x - r, yg - r - 1], [x, yg - 2.5], [x + r, yg - r - 1],
          [x + a / 2 - (a / 2 - r) * 0.55, yP + gw * 0.55], [x + a / 2, yP]], VIEUX));
      }
    }
    // le tour du moule : devant en descendant, derrière en remontant
    for (let k = 0; k <= kc; k++) {
      const x = X(k), xb = x + a / 2, xn = X(k + 1);
      dessus.push(brin([x, yg], [xb, yg + gw]));
      caches.push(h.ligne(xb, yg + gw - 1, xn, yg + 1, h.a.cache));
    }
    // le fil d'avant le premier nœud de la vue remonte de derrière le moule
    caches.push(h.ligne(xL, yg + gw * 0.62, X(0) - 1, yg + 1, h.a.cache));
    // le fil remonte dans la maille suivante, par derrière, jusqu'à l'aiguille
    const xn = X(kc + 1);
    // il passe derrière le fond de la boucle qui pend, et sort devant, dans la boucle
    caches.push(h.ligne(xn, yg + 1, xn + 1, yg - 8, h.a.cache));
    const fil = F.corde([[xn + 1, yg - 8], [xn + 3, yg - gw * 0.5], [xn + 8, yg - gw * 0.9]], VIEUX);
    // le sens du fil : il descend devant, remonte derrière
    const xk = X(kc);
    caches.push(h.fleche(`M ${P(xk + 9, yg + 5)} L ${P(xk + a / 2 + 4, yg + gw - 9)}`, h.a.fin),
      h.fleche(`M ${P(xn - a / 2 + 9, yg + gw - 6)} L ${P(xn - 6, yg + 9)}`, h.a.fin));
    out.push(...net, fil);
    out.push(F.moule({ x: (xL - 4 + xf) / 2, y: yg, longueur: xf - xL + 4, largeur: gw }));
    out.push(...dessus, ...caches);
    out.push(...nds.map(p => noeud(p[0], p[1])));
    out.push(aiguilleTalon(xn + 8, yg - gw * 0.9, -60, gw * 1.9));
    // la coupe du moule : la latte, le fil qui en fait le tour, le nœud dessus, la maille qui monte
    out.push(h.ligne(xf + 3, yg, xs - 5, yg, h.a.fin), h.ligne(xf + 3, yg + gw, xs - 5, yg + gw, h.a.fin));
    const cx = xs + tm / 2;
    out.push(F.corde([[cx, yg - 3], [cx, 4]], VIEUX));
    out.push(F.corde([[cx + 1.5, yg - 3.5], [xs + tm + 3.4, yg + 3], [xs + tm + 3.4, yg + gw - 3], [cx, yg + gw + 3.4], [xs - 3.4, yg + gw - 3],
      [xs - 3.4, yg + 3], [cx - 1.5, yg - 3.5]], VIEUX));
    out.push(h.rect(xs, yg, tm, gw, h.a.hachure('bois', 'contour')));
    out.push(noeud(cx, yg - 3.5, 3));
    // la charte : le sens du travail, le geste, en rouge ; le point à contrôler, le nœud assis sur
    // le bord du haut du moule (c'est le moule qui fait la maille)
    out.push(h.geste(`M ${P(X(kc + 1.5), yg + gw * 0.5)} L ${P(X(kc + 2.4), yg + gw * 0.5)}`));
    out.push(h.controle(X(kc - 1), yg, 10));
    return out.join('\n');
  };
  const vueRangR = z => {
    const { gw, a, tm, xs, yg, kc, X } = gR(z);
    return [
      { n: 1, rond: [X(kc - 1) - a * 0.5, yg - gw * 1.5], cible: [X(kc - 1), yg], texte: 'un nœud par maille' },
      { n: 2, rond: [X(kc - 3) + a * 0.3, yg + gw + 15], cible: [X(kc - 3) + a * 0.3, yg + gw * 0.6], texte: 'devant, dessous, derrière' },
      { n: 3, rond: [X(kc + 2), yg - gw * 1.5], cible: [X(kc + 1) + 2.5, yg - gw * 0.42], texte: 'la maille suivante' },
      { n: 4, rond: [xs + tm / 2, yg + gw + 16], cible: [xs + tm / 2 + 2, yg + gw * 0.5], texte: 'latte à la largeur de maille' },
    ];
  };

  // ── Le ramendage : un treillis de losanges et un trou ─────────────────────────────────────
  // Nœud (i, j), i + j pair. Les nœuds K sont ceux qu'on enlève en recoupant.
  const K = [[-1, 3], [1, 3], [-2, 4], [0, 4], [2, 4], [-1, 5], [1, 5], [0, 6]];
  const cle = (i, j) => `${i},${j}`;
  const dansK = new Set(K.map(p => cle(...p)));
  // déchirés au départ (le reste des mailles de K tient encore, entamé)
  const DECHIRES = new Set(['-1,3|0,4', '1,3|0,4', '-1,5|0,4', '1,5|0,4', '1,3|2,4', '-1,5|-2,6', '1,5|2,4', '1,5|0,6', '-1,3|-2,4']);
  const gT = z => {
    const a = Math.min(56, z.l / 3.6), v = a * 0.8;   // redessin : de grandes mailles, le trou au milieu de la vue
    const cx = z.l / 2, cy = z.h / 2;
    return { a, v, X: i => cx + i * a / 2, Y: j => cy + (j - 4.5) * v };
  };
  const barres = z => {
    const { a, X, Y } = gT(z);
    const L = [];
    const iM = Math.ceil(z.l / a) + 2;
    for (let j = -4; j <= 13; j++) for (let i = -iM; i <= iM; i++) {
      if (Math.abs(i + j) % 2) continue;
      for (const s of [-1, 1]) {
        const p = [i, j], q = [i + s, j + 1];
        const k1 = `${cle(...p)}|${cle(...q)}`, k2 = `${cle(...q)}|${cle(...p)}`;
        L.push({ p, q, trou: dansK.has(cle(...p)) || dansK.has(cle(...q)), dechire: DECHIRES.has(k1) || DECHIRES.has(k2),
          P: [X(p[0]), Y(p[1])], Q: [X(q[0]), Y(q[1])] });
      }
    }
    return L;
  };
  // segment coupé au cadre de la vue
  const couper = (A, B, W, H, m = 3) => {
    let t0 = 0, t1 = 1;
    const dx = B[0] - A[0], dy = B[1] - A[1];
    const p = [-dx, dx, -dy, dy], q = [A[0] - m, W - m - A[0], A[1] - m, H - m - A[1]];
    for (let k = 0; k < 4; k++) {
      if (p[k] === 0) { if (q[k] < 0) return null; continue; }
      const r = q[k] / p[k];
      if (p[k] < 0) { if (r > t1) return null; if (r > t0) t0 = r; } else { if (r < t0) return null; if (r < t1) t1 = r; }
    }
    return [[A[0] + t0 * dx, A[1] + t0 * dy], [A[0] + t1 * dx, A[1] + t1 * dy]];
  };
  const dansVue = (z, p, m = 3) => p[0] > m && p[0] < z.l - m && p[1] > m && p[1] < z.h - m;
  const NEUF = { ep: 3.4, debut: 'ouvert', fin: 'ouvert', trait: 'arete' };

  const vueTrou = etat => z => {
    const { X, Y } = gT(z);
    const L = barres(z);
    const out = [], fantomes = [], nds = [];
    // un nœud de K tient encore dans le trou tant qu'une de ses barres n'est pas déchirée
    const tient = (i, j) => !dansK.has(cle(i, j)) || L.some(b => !b.dechire && ((b.p[0] === i && b.p[1] === j) || (b.q[0] === i && b.q[1] === j)));
    // le fil neuf, en 3 : rangs 2-3 et 3-4 faits ; rang 4-5 à moitié ; le reste à faire
    const fait = b => Math.min(b.p[1], b.q[1]) <= 3 || (Math.min(b.p[1], b.q[1]) === 4 && Math.max(b.P[0], b.Q[0]) <= X(0) + 0.1);
    for (const b of L) {
      const s = couper(b.P, b.Q, z.l, z.h);
      if (!s || Math.hypot(s[1][0] - s[0][0], s[1][1] - s[0][1]) < 8) continue;   // pas de bout de brin dans un coin
      if (!b.trou) { out.push(F.corde(s, VIEUX)); continue; }
      if (etat === 'dechire') {
        if (!b.dechire) { out.push(F.corde(s, VIEUX)); continue; }
        // un bout effiloché reste pendu à chaque nœud qui tient
        for (const [A, B, k, t] of [[b.P, b.Q, b.p, 0.36], [b.Q, b.P, b.q, 0.3]]) {
          if (!tient(...k)) continue;
          const M = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t];
          out.push(F.corde([A, M], { ...VIEUX, fin: 'libre' }));
        }
      } else if (etat === 'recoupe' || !fait(b)) {
        fantomes.push(h.ligne(...s[0], ...s[1], h.a.cache));
      } else {
        out.push(F.corde(s, NEUF));
      }
    }
    for (let j = -4; j <= 13; j++) for (let i = -12; i <= 12; i++) {
      if (Math.abs(i + j) % 2) continue;
      const p = [X(i), Y(j)];
      if (!dansVue(z, p, 4)) continue;
      if (!dansK.has(cle(i, j))) { nds.push(noeud(...p)); continue; }
      if (etat === 'dechire' && tient(i, j)) nds.push(noeud(...p));
      if (etat === 'renoue' && (j === 3 || (j === 4 && p[0] <= X(0) + 0.1))) nds.push(noeud(...p, 2.9));
    }
    out.push(...fantomes, ...nds);
    if (etat === 'renoue') {
      // le fil part du dernier nœud fait, descend vers la maille suivante, remonte à l'aiguille
      const A = [X(0), Y(4)], B = [X(1), Y(5)], C = [X(2) - 2, Y(4) + 4];
      out.push(F.corde([A, [A[0] + (B[0] - A[0]) * 0.5, A[1] + (B[1] - A[1]) * 0.5], B, [B[0] + 4, B[1] - 6], C], NEUF));
      out.push(aiguilleTalon(C[0], C[1], -58, gT(z).a * 1.3));
      // le chemin du fil : rang 2-3 de gauche à droite, rang 3-4 de droite à gauche, rang 4-5 de gauche à droite
      const fl = [];
      for (const b of L) {
        if (!b.trou || !fait(b)) continue;
        const m = Math.min(b.p[1], b.q[1]);
        let [A2, B2] = b.P[0] < b.Q[0] ? [b.P, b.Q] : [b.Q, b.P];
        if (m % 2) [A2, B2] = [B2, A2];
        const d = [B2[0] - A2[0], B2[1] - A2[1]], l = Math.hypot(...d), u = [d[0] / l, d[1] / l], nn = [u[1], -u[0]];
        const o = 6, M = [(A2[0] + B2[0]) / 2 + nn[0] * o, (A2[1] + B2[1]) / 2 + nn[1] * o];
        fl.push(h.fleche(`M ${P(M[0] - u[0] * 6, M[1] - u[1] * 6)} L ${P(M[0] + u[0] * 6, M[1] + u[1] * 6)}`, h.a.fin));
      }
      // les demi-tours aux bords
      const a2 = gT(z).a, v2 = gT(z).v;
      fl.push(h.fleche(`M ${P(X(3) - 2, Y(2.6))} Q ${P(X(3) + a2 * 0.45, Y(3))} ${P(X(3) - 2, Y(3.4))}`, h.a.fin));
      fl.push(h.fleche(`M ${P(X(-3) + 2, Y(3.6))} Q ${P(X(-3) - a2 * 0.45, Y(4))} ${P(X(-3) + 2, Y(4.4))}`, h.a.fin));
      out.push(...fl);
    }
    return out.join('\n');
  };
  const vueTrouR = etat => z => {
    const { X, Y } = gT(z);
    if (etat === 'dechire') return [
      { n: 5, rond: [14, Y(8)], cible: [X(0.6), Y(4.7)], texte: 'mailles déchirées' },
    ];
    if (etat === 'recoupe') return [
      { n: 6, rond: [14, Y(1.5)], cible: [X(-2), Y(2)], texte: 'recoupé : mailles entières' },
      { n: 7, rond: [14, Y(8)], cible: [X(-0.5), Y(5.5)], texte: 'les mailles enlevées, à compter' },
    ];
    return [
      { n: 8, rond: [14, Y(1.5)], cible: [X(-1.5), Y(2.5)], texte: 'renoué rang par rang' },
      { n: 9, rond: [14, Y(8)], cible: [X(-0.5), Y(5.5)], texte: 'autant de mailles qu’on en a enlevé' },
    ];
  };

  return {
    ref: '60-10b',
    fichier: 'planche-60-10b-rang-moule-ramendage.svg',
    titre: 'Un rang sur le moule, et le ramendage',
    desc: 'Un rang de filet noué de gauche à droite sur le moule : un nœud par maille, assis sur le bord du haut de la latte ; ' +
      'entre deux nœuds, le fil descend devant le moule, passe dessous et remonte derrière, puis entre par derrière dans la ' +
      'maille suivante, où l’aiguille le mène. À droite, le moule en coupe, le fil qui en fait le tour. Le ramendage en trois ' +
      'temps : le trou aux mailles déchirées ; recoupé jusqu’à un contour de mailles entières, les mailles enlevées en tireté ; ' +
      'renoué rang par rang à l’aiguille, fil neuf en trait fort, autant de mailles qu’on en a enlevé.',
    format: 'pleine',
    disposition: [['rang'], ['t1', 't2', 't3']],
    hauteurs: [1, 1.3],
    vues: {
      rang: { titre: 'Un rang sur le moule ; à droite, le moule en coupe', dessin: vueRang, renvois: vueRangR },
      t1: { titre: 'Le trou', dessin: vueTrou('dechire'), renvois: vueTrouR('dechire') },
      t2: { titre: 'Recoupé', dessin: vueTrou('recoupe'), renvois: vueTrouR('recoupe') },
      t3: { titre: 'Renoué', dessin: vueTrou('renoue'), renvois: vueTrouR('renoue') },
    },
  };
};
