// Planche 34-04 — La compresse chaude qui garde sa chaleur.
// Ch. 34, étape 3 (« La compresse chaude ») et section « La compresse qui garde sa chaleur » :
// un sac de linge rempli de sable sec ou de gravier fin, chauffé près des braises, roulé dans un
// deuxième linge (deux épaisseurs de tissu) et posé sur la compresse mouillée (carré de linge
// bouilli trempé dans l'eau chaude, tordu, posé).
//
// Rangée du haut : le sac noué ; le sac qui chauffe près des braises ; le sac roulé dans le
// deuxième linge, vu par le bout. Au milieu : le tout en place sur un avant-bras posé sur la
// table, vu du côté du pouce, avec le plan de coupe A. En bas : la coupe A agrandie, regardée
// vers la main, couche par couche : deuxième linge, sable dans son sac, compresse, peau.
// Épaisseurs des linges exagérées pour qu'on lise chaque couche. Aucune cote : le chapitre ne
// donne aucune mesure.
module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const P = (pts, ferme = false) => pts.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ') + (ferme ? ' Z' : '');
  const SOUS = 'fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"';
  const plein = (d, at) => [h.path(d, h.a.blanc), h.path(d, at)].join(' ');   // une trame qui cache ce qui est derrière

  // Catmull-Rom échantillonné
  const cr = (pts, ferme = false, n = 12) => {
    const N = pts.length, out = [];
    const g = i => ferme ? pts[(i + N) % N] : pts[Math.max(0, Math.min(N - 1, i))];
    for (let i = 0; i < (ferme ? N : N - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(j => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
      }
    }
    if (!ferme) out.push(pts[N - 1]);
    return out;
  };
  // rééchantillonnage d'une courbe fermée à pas égal
  const reech = (pts, M) => {
    const L = [0];
    for (let i = 1; i <= pts.length; i++) { const a = pts[i - 1], b = pts[i % pts.length]; L.push(L[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1])); }
    const tot = L[L.length - 1], out = [];
    let j = 0;
    for (let k = 0; k < M; k++) {
      const s = tot * k / M;
      while (L[j + 1] < s) j++;
      const a = pts[j], b = pts[(j + 1) % pts.length], t = (s - L[j]) / ((L[j + 1] - L[j]) || 1);
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
    return out;
  };
  // normales extérieures d'une courbe fermée tournant dans le sens trigonométrique (v vers le haut)
  const normales = pts => pts.map((p, k) => {
    const M = pts.length, a = pts[(k - 1 + M) % M], b = pts[(k + 1) % M];
    const tx = b[0] - a[0], ty = b[1] - a[1], l = Math.hypot(tx, ty);
    return [ty / l, -tx / l];
  });
  const decale = (C, Nn, d) => C.map((p, k) => [p[0] + Nn[k][0] * d, p[1] + Nn[k][1] * d]);
  // Linge roulé en spirale autour d'un contour C (sens trigo), du bout intérieur k0 sur `tours`
  // tours ; ep : épaisseur du linge, jeu : l'espace entre deux tours. Rend la bande fermée.
  const spirale = (C, Nn, k0, tours, ep, jeu) => {
    const M = C.length, n = Math.round(tours * M), dedans = [], dehors = [];
    for (let i = 0; i <= n; i++) {
      const k = (k0 + i) % M, s = i / M, r = Math.max(0, Math.min(1, (s - 0.9) / 0.1));
      const d = jeu + (ep + jeu) * r * r * (3 - 2 * r);
      dedans.push([C[k][0] + Nn[k][0] * d, C[k][1] + Nn[k][1] * d]);
      dehors.push([C[k][0] + Nn[k][0] * (d + ep), C[k][1] + Nn[k][1] * (d + ep)]);
    }
    return { bande: dedans.concat(dehors.reverse()), dehors: dehors.slice().reverse() };
  };
  // la silhouette d'une main simple (le chemin à 1,5 de son SVG : le moteur n'expose pas son contour), et ses
  // bords haut et bas à l'abscisse x
  const silhouette = svg => {
    const segs = [];
    for (const mm of String(svg).matchAll(/<path d="([^"]+)"[^>]*stroke-width="1\.5"/g)) for (const sp of mm[1].split('M').filter(Boolean)) {
      const n = sp.match(/-?\d+(\.\d+)?/g).map(Number), Q = [];
      for (let i = 0; i + 1 < n.length; i += 2) Q.push([n[i], n[i + 1]]);
      for (let i = 1; i < Q.length; i++) segs.push([Q[i - 1], Q[i]]);
    }
    const coupe = x => segs.filter(([a, b]) => (a[0] - x) * (b[0] - x) <= 0 && a[0] !== b[0]).map(([a, b]) => a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]));
    return { haut: x => Math.min(...coupe(x)), bas: x => Math.max(...coupe(x)), ymax: Math.max(...segs.flat().map(p => p[1])) };
  };
  const indexPres = (C, u, v) => { let b = 0, dm = 1e9; C.forEach((p, k) => { const d = Math.hypot(p[0] - u, p[1] - v); if (d < dm) { dm = d; b = k; } }); return b; };

  // ── le sac de sable noué, couché, vu de côté (repère : y vers le bas, le dessous à y = 25,5) ──
  const CORPS = [[60, -8], [42, -21], [20, -27], [-20, -27], [-45, -24], [-58, -12], [-60, 4], [-54, 18], [-40, 24.5], [0, 25.5], [34, 24.5], [48, 16], [60, 7]];
  const sac = (cx, cy, k, trait = 'contour') => {
    const T = p => [cx + p[0] * k, cy + p[1] * k];
    const q = (a, c, b, at) => h.path(`M${f(T(a)[0])} ${f(T(a)[1])} Q${f(T(c)[0])} ${f(T(c)[1])} ${f(T(b)[0])} ${f(T(b)[1])}`, at);
    const out = [];
    out.push(plein(P(cr(CORPS, true).map(T), true), h.a.hachure('gravier', trait)));
    // plis du tissu ramassé vers le col
    out.push(q([58, -5], [50, -10], [38, -15], h.a.fin), q([58, 0], [48, 0], [36, 2], h.a.fin), q([58, 4], [50, 9], [40, 15], h.a.fin));
    // la queue froncée au-delà du nœud
    out.push(h.path(P([[71, -5], [76, -9], [83, -16], [87, -12], [84, -7], [88, -2], [84, 3], [88, 8], [85, 13], [78, 8], [71, 4]].map(T), true), blanc(h.a.arete)));
    out.push(q([72, -2], [77, -6], [83, -11], h.a.fin), q([72, 0], [79, 0], [85, -1], h.a.fin), q([72, 2], [78, 5], [84, 8], h.a.fin));
    // le col serré et les tours du lien
    out.push(h.path(P([[58, -7.5], [71, -5], [71, 4], [58, 6.5]].map(T), true), blanc(h.a.arete)));
    [60, 63.8, 67.6].forEach(x => out.push(h.path(P([[x, -8.6], [x + 3.2, -8.3], [x + 3.2, 7.4], [x, 7.8]].map(T), true), blanc(h.a.arete))));
    // le nœud et ses deux bouts
    out.push(q([64.5, -10], [60, -17], [55, -20], h.a.arete), q([67, -10], [72, -16], [78, -18], h.a.arete));
    out.push(h.ellipse(...T([65.8, -10]), 3.4 * k, 2.6 * k, blanc(h.a.arete)));
    return { svg: out.join('\n'), T };
  };

  // ── la coupe A : géométrie en mm, u vers le pouce (à droite), v vers le haut, 0 sur la table ──
  const TC = 5, TL = 4.2, JEU = 1.1;                 // compresse, linge, jeu entre deux tours
  const BRAS = reech(cr([[0, 0], [25, 0.6], [33, 6], [36.5, 17], [35, 29], [27, 40], [12, 47.5], [-6, 48.5], [-22, 43.5], [-32, 33], [-36, 20], [-34.5, 8], [-26, 0.6]], true, 16), 400);
  const NB = normales(BRAS);
  const V_COMPRESSE = 13;                            // la compresse descend jusque-là de chaque côté
  const iCompresse = BRAS.map((p, k) => k).filter(k => BRAS[k][1] >= V_COMPRESSE);
  const compIn = iCompresse.map(k => BRAS[k]), compOut = iCompresse.map(k => [BRAS[k][0] + NB[k][0] * TC, BRAS[k][1] + NB[k][1] * TC]);
  // le dessous du sac épouse le dessus de la compresse, deux épaisseurs de linge entre les deux
  const dessous = decale(BRAS, NB, TC + 2 * (TL + JEU) + 0.3);
  const vSous = u => { let b = null; dessous.forEach(p => { if (p[1] > 25 && (!b || Math.abs(p[0] - u) < Math.abs(b[0] - u))) b = p; }); return b; };
  const bas = [-24, -12, 0, 12, 24].map(vSous);
  const vHaut = bas[2][1] + 20;
  const SAC = reech(cr([...bas, [28, bas[4][1] + 9], [21, vHaut - 3], [0, vHaut], [-21, vHaut - 3], [-28, bas[0][1] + 9]], true, 16), 400);
  const NS = normales(SAC);
  const kDebut = indexPres(SAC, -18, vHaut - 2);      // bout intérieur du linge : en haut, côté auriculaire
  const LINGE = spirale(SAC, NS, kDebut, 1.85, TL, JEU);
  const V_MAX = Math.max(...LINGE.dehors.map(p => p[1]));

  return {
    ref: '34-04',
    titre: 'La compresse chaude qui garde sa chaleur',
    desc: 'Un sac de linge rempli de sable sec, noué, chauffé près des braises, roulé dans un deuxième linge et posé sur la compresse mouillée ; en coupe, de haut en bas : le deuxième linge en deux épaisseurs, le sable chaud dans son sac, la compresse, la peau. Encadré danger : la brûlure que le malade ne sent pas.',
    format: 'pleine',
    disposition: [['sac', 'chauffer'], ['rouler', 'place'], ['coupe']],
    largeurs: [[1, 1], [1.15, 2.6], [1]],
    hauteurs: [1.6, 2.2, 2.85],
    vues: {
      sac: {
        titre: 'Le sac de sable, noué',
        dessin: z => { const k = Math.min(1.5, (z.h - 22) / 53, (z.l - 60) / 148); return sac(z.l / 2 - 14 * k, z.h / 2 + 2, k).svg; },
        renvois: z => {
          const k = Math.min(1.5, (z.h - 22) / 53, (z.l - 60) / 148), T = sac(z.l / 2 - 14 * k, z.h / 2 + 2, k).T;
          return [
            { n: 1, rond: [14, z.h - 14], cible: T([-52, 19]), texte: 'sac de linge' },
            { n: 2, rond: [14, 14], cible: T([-22, -6]), texte: 'sable sec ou gravier fin' },
            { n: 3, rond: [z.l - 16, z.h - 14], cible: T([66, 7.6]), texte: 'col tordu et noué' },
          ];
        },
      },
      chauffer: {
        titre: 'Chauffé près des braises',
        dessin: z => {
          const out = [], yg = z.h - 10, km = Math.min(1.1, (z.h - 20) / 44), ks = Math.min(0.7, (z.h - 20) / 53);
          const ex = 14 + 46 * km, bx = z.l - 30 - 88 * ks;
          const E = p => [ex + p[0] * km, yg + p[1] * km];
          out.push(h.ligne(4, yg, z.l - 4, yg, h.a.arete));
          // deux petites flammes, puis les braises : le rang du dessus d'abord, celui du devant ensuite
          out.push(h.path(P(cr([[-7, -22], [-11, -32], [-5, -44], [-1, -33], [2, -24]]).map(E)), blanc(h.a.detail)));
          out.push(h.path(P(cr([[11, -22], [10, -31], [16, -40], [18, -31], [19, -22]]).map(E)), blanc(h.a.detail)));
          const haut = [[[-34, -10], [-31, -17], [-23, -18], [-20, -11]], [[-21, -12], [-15, -24], [-3, -25], [1, -15], [-9, -12]], [[1, -15], [8, -27], [21, -24], [23, -13], [13, -10]], [[21, -11], [26, -19], [34, -17], [35, -9]]];
          const devant = [[[-45, 0], [-41, -9], [-31, -11], [-26, 0]], [[-28, 0], [-24, -14], [-12, -16], [-8, -6], [-10, 0]], [[-10, 0], [-6, -12], [4, -17], [14, -12], [12, 0]], [[10, 0], [15, -11], [27, -12], [31, 0]], [[29, 0], [34, -8], [43, -7], [46, 0]]];
          // des morceaux de charbon noirs, fendus de blanc là où ils rougeoient
          haut.concat(devant).forEach(c => out.push(h.path(P(c.map(E), true), 'fill="#1A1A1A" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"')));
          [[[-38, -4], [-35, -6], [-32, -4]], [[-20, -6], [-17, -9], [-14, -7]], [[-1, -6], [3, -9], [6, -6], [9, -8]], [[18, -5], [21, -8], [24, -6]], [[-12, -19], [-8, -21], [-5, -18]], [[8, -19], [12, -22], [16, -19]], [[35, -3], [38, -5]], [[-28, -13], [-26, -15]], [[27, -14], [30, -12]]].forEach(c => out.push(h.path(P(c.map(E)), 'fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"')));
          // la chaleur qui rayonne vers le sac
          const x0 = ex + 50 * km, x1 = bx - 62 * ks - 6;
          [yg - 10, yg - 24].forEach(y => {
            const n = Math.max(2, Math.floor((x1 - x0) / 8));
            const pas = (x1 - x0) / n;
            let d = `M${f(x0)} ${f(y)}`;
            for (let i = 0; i < n; i++) d += ` q${f(pas / 2)} ${i % 2 ? 3 : -3} ${f(pas)} 0`;
            out.push(h.fleche(d, h.a.detail));
          });
          out.push(sac(bx, yg - 25.5 * ks, ks).svg);
          return out.join('\n');
        },
        renvois: z => {
          const yg = z.h - 10, km = Math.min(1.1, (z.h - 20) / 44), ex = 14 + 46 * km;
          return [{ n: 4, rond: [14, 14], cible: [ex - 14 * km, yg - 21 * km], texte: 'braises : le sac chauffe à côté' }];
        },
      },
      rouler: {
        titre: 'Roulé dans un linge',
        dessin: z => {
          // vu par le bout : le rouleau avance vers la droite et ramasse le linge étendu
          const out = [], s = Math.min(1.7, (z.h - 20) / 70, (z.l - 20) / 100), yg = z.h - 10;
          const OV = reech(cr([[0, 0], [16, 1], [24, 7], [26, 15], [20, 23], [0, 26], [-20, 23], [-26, 15], [-24, 7], [-16, 1]], true, 16), 300);
          const NO = normales(OV), ep = 2.6, jeu = 0.9;
          const kb = indexPres(OV, 0, 0), tours = 1.3;
          const sp = spirale(OV, NO, (kb - Math.round((tours - 1) * OV.length) + OV.length) % OV.length, tours, ep, jeu);
          const vSol = sp.dehors[sp.dehors.length - 1][1];   // le dernier tour touche le sol
          const cx = 8 + 36 * s;
          const T = p => [cx + p[0] * s, yg - (p[1] - vSol) * s];
          const vBas = vSol;
          // le linge encore étendu, qui part du dessous du rouleau
          const xa = T([0, vBas])[0], xb = z.l - 8;
          out.push(plein(`M${f(xa)} ${f(yg - ep * s)} L${f(xb)} ${f(yg - ep * s)} L${f(xb)} ${f(yg)} L${f(xa)} ${f(yg)} Z`, h.a.hachure('grillage', 'detail')));
          out.push(plein(P(OV.map(T), true), h.a.hachure('gravier', 'contour')));
          out.push(plein(P(sp.bande.map(T), true), h.a.hachure('grillage', 'detail')));
          out.push(h.ligne(4, yg, z.l - 4, yg, h.a.arete));
          // le rouleau tourne sur lui-même en avançant
          const r = 36 * s, c = T([0, 13]);
          const a0 = 200 * Math.PI / 180, a1 = 330 * Math.PI / 180;
          out.push(h.geste(`M${f(c[0] + r * Math.cos(a0))} ${f(c[1] + r * Math.sin(a0))} A${f(r)} ${f(r)} 0 0 1 ${f(c[0] + r * Math.cos(a1))} ${f(c[1] + r * Math.sin(a1))}`));
          out.push(h.geste(`M${f(cx + 40 * s)} ${f(yg - 12)} L${f(z.l - 10)} ${f(yg - 12)}`));
          return out.join('\n');
        },
      },
      place: {
        titre: 'En place sur l’avant-bras, vu de côté',
        dessin: z => {
          const out = [];
          const s = Math.min((z.h - 34) / V_MAX, (z.l - 20) / 450);
          const ys = z.h - 22;                                  // le dessus de la table
          out.push(h.rect(2, ys, z.l - 4, 7, h.a.hachure('bois', 'arete')));
          // la main gauche du malade (mains simples), à plat sur la table, vue du côté du pouce et un peu
          // d'en haut ; l'avant-bras entier, posé jusqu'au coude
          const RX = -10;
          const o = k => ({ x: z.l - 14, y: ys, ancre: 'bout', pose: 'plat', vue: 'pouce', cote: 'gauche', echelle: s, angle: 0, rotation: [RX, 0, 0],
            avantbras: { vers: [-1000, ys - k * 1000], longueur: 'entier' } });
          // la pente de l'avant-bras qui pose à la fois le coude et la main sur la table
          const ecart = k => { const mk = h.formes.mainSimple(o(k)), sk = silhouette(mk.svg); return sk.bas(mk.coude[0] + 30 * s) - sk.bas(mk.poignet[0] + 60 * s); };
          const e0 = ecart(0), e1 = ecart(0.05), kk = -e0 * 0.05 / (e1 - e0);
          const m0 = h.formes.mainSimple(o(kk));
          const m = h.formes.mainSimple({ ...o(kk), y: ys + (ys - 0.6 - silhouette(m0.svg).ymax) });
          out.push(m.svg);
          const W = m.poignet, sil = silhouette(m.svg);
          // le dessus de l'avant-bras, lu sur la silhouette
          const dessusBras = x => sil.haut(x);
          const X = mmDuPoignet => W[0] - mmDuPoignet * s;
          // la compresse mouillée, drapée sur le dessus et le côté
          const c1 = X(178), c2 = X(62);
          // le dessus suit le bras ; aux deux bouts, le linge tourne sur le bras et descend
          const haut = cr([[c1 - 1.5, dessusBras(c1) + 7], [c1 + 4, dessusBras(c1) - TC * s * 0.9], [(c1 + c2) / 2, dessusBras((c1 + c2) / 2) - TC * s], [c2 - 4, dessusBras(c2) - TC * s * 0.9], [c2 + 1.5, dessusBras(c2) + 7]], false, 10);
          const bord = ys - V_COMPRESSE * s;
          const comp = [...haut, [c2 + 1.5, bord - 2], [c2 - 12, bord + 1], [c2 - 30, bord - 1.5], [(c1 + c2) / 2, bord + 1], [c1 + 30, bord - 1], [c1 + 12, bord + 1.5], [c1 - 1.5, bord - 2]];
          out.push(plein(P(comp, true), h.a.hachure('eau', 'arete')));
          // le rouleau : le sac dans le deuxième linge
          const r1 = X(168), r2 = X(72), yB = Math.min(dessusBras(r1 + 10), dessusBras(r2 - 10)) - (TC - 1.5) * s;
          const yH = yB - (V_MAX - 48.5 - TC + 1.5) * s, rr = (yB - yH) / 2;
          const rouleau = `M${f(r1 + rr)} ${f(yH)} L${f(r2 - rr)} ${f(yH)} A${f(rr)} ${f(rr)} 0 0 1 ${f(r2 - rr)} ${f(yB)} L${f(r1 + rr)} ${f(yB)} A${f(rr)} ${f(rr)} 0 0 1 ${f(r1 + rr)} ${f(yH)} Z`;
          out.push(h.path(rouleau, blanc(h.a.contour)));
          // la face du dessous du rouleau, à l'ombre
          const yo = yB - rr * 0.55, dx = rr - Math.sqrt(rr * rr - (yo - (yH + rr)) ** 2);
          out.push(h.path(`M${f(r1 + dx)} ${f(yo)} L${f(r2 - dx)} ${f(yo)} A${f(rr)} ${f(rr)} 0 0 1 ${f(r2 - rr)} ${f(yB)} L${f(r1 + rr)} ${f(yB)} A${f(rr)} ${f(rr)} 0 0 1 ${f(r1 + dx)} ${f(yo)} Z`, h.a.ombre));
          out.push(h.path(rouleau, h.a.contour));
          // le bord libre du linge, qui court le long du rouleau
          out.push(h.path(`M${f(r1 + rr * 0.55)} ${f(yH + rr * 0.42)} L${f(r2 - rr * 0.55)} ${f(yH + rr * 0.42)}`, h.a.detail));
          [r1 + rr * 0.9, r2 - rr * 0.9].forEach((x, i) => out.push(h.path(`M${f(x)} ${f(yH + 3)} Q${f(x + (i ? 4 : -4))} ${f(yH + rr)} ${f(x)} ${f(yB - 3)}`, h.a.fin)));
          // le plan de coupe A, regardé vers la main
          const xa = X(120), ya = yH - 14, yb = ys + 18;
          out.push(h.ligne(xa, ya, xa, yb, h.a.fin.replace('stroke-linecap="round"', 'stroke-dasharray="9 3 2 3"')));
          [ya, yb].forEach(y => {
            out.push(h.ligne(xa, y, xa, y + (y === ya ? 8 : -8), h.a.contour));
            out.push(h.fleche(`M${f(xa)} ${f(y)} L${f(xa + 15)} ${f(y)}`, h.a.detail));
            out.push(h.texte(xa + 21, y + 4, 'A', { ancre: 'start' }));
          });
          return out.join('\n');
        },
      },
      coupe: {
        titre: 'Coupe A-A, agrandie',
        dessin: z => {
          const out = [];
          const s = Math.min((z.h - 18) / (V_MAX + 9), 3.2);
          const cx = z.l * 0.45, ys = z.h - 12;
          const T = p => [cx + p[0] * s, ys - p[1] * s];
          out.push(h.rect(cx - 62 * s, ys, 124 * s, 6 * s, h.a.hachure('bois', 'arete')));
          // l'avant-bras : la peau, la chair, les deux os
          out.push(h.path(P(BRAS.map(T), true), blanc(h.a.contour)));
          out.push(h.path(P(decale(BRAS, NB, -1.8).map(T), true), h.a.fin));
          [[-17, 23, 6.5], [15, 21, 7]].forEach(([u, v, r]) => {
            out.push(h.cercle(...T([u, v]), r * s, blanc(h.a.arete)));
            out.push(h.cercle(...T([u, v]), r * 0.5 * s, h.a.detail));
          });
          // la compresse mouillée
          out.push(plein(P(compIn.concat(compOut.slice().reverse()).map(T), true), h.a.hachure('eau', 'arete')));
          // le sable dans son sac, puis le deuxième linge roulé
          out.push(plein(P(SAC.map(T), true), h.a.hachure('gravier', 'contour')));
          out.push(plein(P(LINGE.bande.map(T), true), h.a.hachure('grillage', 'detail')));
          // la chaleur descend du sable vers la peau
          [-13, 0, 13].forEach(u => {
            const sous = vSous(u)[1];
            const d = `M${f(T([u, sous + 9])[0])} ${f(T([u, sous + 9])[1])} L${f(T([u, 40])[0])} ${f(T([u, 42 - Math.abs(u) * 0.15])[1])}`;
            out.push(h.path(d, SOUS), h.fleche(d, h.a.arete));
          });
          // la peau, sous le bord de la compresse : on y regarde à chaque changement
          { const k = indexPres(BRAS, 36, 14); out.push(h.controle(...T([BRAS[k][0], BRAS[k][1]]), 10)); }
          return out.join('\n');
        },
        renvois: z => {
          const s = Math.min((z.h - 18) / (V_MAX + 9), 3.2);
          const cx = z.l * 0.45, ys = z.h - 12;
          const T = p => [cx + p[0] * s, ys - p[1] * s];
          const xr = cx + 78 * s;
          const kL = indexPres(SAC, 30, vHaut - 12), dL = 2 * JEU + 1.5 * TL;
          const kC = indexPres(BRAS, 35, 30), kP = indexPres(BRAS, 36, 12);
          return [
            { n: 5, rond: [xr, T([0, V_MAX - 4])[1]], cible: T([SAC[kL][0] + NS[kL][0] * dL, SAC[kL][1] + NS[kL][1] * dL]), texte: 'deuxième linge, roulé : deux épaisseurs' },
            { n: 6, rond: [xr, T([0, vHaut - 12])[1] + 4], cible: T([16, vHaut - 11]), texte: 'sable chaud dans son sac' },
            { n: 7, rond: [xr, T([0, 32])[1]], cible: T([BRAS[kC][0] + NB[kC][0] * TC / 2, BRAS[kC][1] + NB[kC][1] * TC / 2]), texte: 'compresse : linge bouilli, trempé, tordu' },
            { n: 8, rond: [xr, T([0, 10])[1]], cible: T([BRAS[kP][0] - NB[kP][0] * 0.9, BRAS[kP][1] - NB[kP][1] * 0.9]), texte: 'peau : regardée à chaque changement' },
          ];
        },
      },
    },
    danger: 'Un malade fiévreux, endormi ou refroidi ne sent pas la brûlure : ce qui est confortable à une main chaude le cuit. On regarde sous la compresse à chaque changement. Sable ou gravier secs seulement : une pierre de ruisseau éclate au feu.',
  };
};
