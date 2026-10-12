// Planche 24-06b — La béquille de fourche, ses pièces (chapitre 24, section 9 « La béquille de
// fourche » ; tableau des contrôles, ligne « Béquille »). La planche 24-06a la montre en place.
// Ce que dit le chapitre, et rien de plus : un jeune aulne, un bouleau ou un érable qui fourche
// naturellement ; les deux branches se lient ensemble au sommet, rembourrées d'un linge plié ou
// d'un bout de fourrure ; une traverse liée entre les deux branches sert de poignée ; au pied, dans
// la neige, un anneau de branche souple lacé en croix, comme une petite raquette, empêche le bâton
// de s'enfoncer. Longueur : la taille moins 40 cm jusqu'à l'appui de l'aisselle. Trop longue, on
// recoupe le pied ; trop courte, on cloue ou on lie une cale dessous.
// Cote : « taille − 400 mm », du bout au haut du rembourrage. Aucune autre : le chapitre ne donne
// ni diamètre de perche, ni écartement des branches, ni taille d'anneau.
// Géométrie de dessin, jamais imprimée (mm), la même que sur la 24-06a : perche de 32 au pied,
// branches de 22 à 20, 190 hors tout à la poignée, traverse de 22 qui dépasse de 20 de chaque
// côté ; rembourrage de 82 sur 80, trois épaisseurs de linge, serré par un lien sous le sommet ;
// ligature du sommet sur 30 ; anneau de 160 hors tout en branche de 12, bouts doublés sur 50°,
// posé à 60 du bout. Le lien du rembourrage, la ligature en croix et les tours du laçage sont la
// façon ordinaire de lier : le chapitre dit « liée », il ne dit pas comment.
// Repère de la béquille : u le long de la perche, du bout (0) vers le haut (L) ; v en travers,
// dans le plan de la fourche. Sur la planche, le pied est à gauche et le haut à droite.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => Math.round(v * 10) / 10;
  const BLANC = '#FFFFFF', NOIR = '#1A1A1A';
  const blanc = at => at.replace('fill="none"', `fill="${BLANC}"`);
  const noir = `fill="${NOIR}" stroke="none"`;
  const rappel = A.fin + ' stroke-dasharray="2 3"';
  const NL = String.fromCharCode(10);
  const dP = (pts, ferme) => pts.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ') + (ferme ? ' Z' : '');
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k], nrm = a => Math.hypot(a[0], a[1]);
  const uni = a => mul(a, 1 / nrm(a));
  let nClip = 0;
  const decoupe = (svg, polys) => {
    const id = `p2406b-${++nClip}`;
    return `<clipPath id="${id}"><path d="${polys.map(p => dP(p, true)).join(' ')}" fill="none"/></clipPath>${NL}<g clip-path="url(#${id})">${NL}${svg}${NL}</g>`;
  };
  const lisse = (P, n = 8) => {
    const N = P.length, g = i => P[Math.max(0, Math.min(N - 1, i))], out = [];
    for (let i = 0; i < N - 1; i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(j => 0.5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
      }
    }
    out.push(P[N - 1]);
    return out;
  };
  const miroir = pts => pts.map(p => [p[0], -p[1]]);
  // un tour de corde de a à b, d'épaisseur e (unités de vue), ouvert aux deux bouts : il passe derrière
  const tour = (a, b, e) => String(F.corde([a, b], { ep: e, debut: 'ouvert', fin: 'ouvert', trait: 'detail' }));
  // une bande de corde de a à b, d'épaisseur e (unités de vue) : fond blanc, deux bords
  const bande = (a, b, e, at = A.detail) => {
    const d = uni(sub(b, a)), n = [-d[1] * e / 2, d[0] * e / 2];
    return h.path(dP([add(a, n), add(b, n), sub(b, n), sub(a, n)], true), blanc(at));
  };

  // ── la géométrie, calculée comme sur la 24-06a ──
  const S = [8.4, -1420], T = [330, 0], P = [30, -1275];
  const L = nrm(sub(P, T));
  const ax = uni(sub(P, T)), bx = [-ax[1], ax[0]];
  const enPlace = (u, v) => add(add(T, mul(ax, u)), mul(bx, v));
  const THETA = Math.atan2(bx[0], -bx[1]) * 180 / Math.PI + 5;
  const poignetA = u => F.main({ x: enPlace(u, 0)[0], y: enPlace(u, 0)[1], pose: 'prise', vue: 'dos', angle: THETA, diametre: 22, echelle: 1 }).poignet;
  let lo = 600, hi = 950;
  for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (nrm(sub(poignetA(m), S)) > 552) lo = m; else hi = m; }
  const uC = (lo + hi) / 2, uF = uC - 170, uR = 60, RA = 80;

  const bordExt = [[0, 16], [200, 15.6], [uF - 120, 14.8], [uF - 40, 15], [uF + 5, 19], [uF + 45, 34], [uF + 100, 55], [uC, 76],
    [uC + 90, 92], [uC + 220, 96], [L - 230, 86], [L - 150, 60], [L - 95, 30], [L - 60, 21], [L - 27, 20]];
  const bordInt = [[uF, 0], [uF + 30, 6], [uF + 100, 33], [uC, 54], [uC + 90, 70], [uC + 220, 74], [L - 230, 64], [L - 150, 38],
    [L - 95, 9], [L - 60, 0.5], [L - 27, 0]];
  const ext = lisse(bordExt), int = lisse(bordInt);
  const silhouette = [...miroir(ext), ...miroir(int).reverse(), ...int, ...ext.slice().reverse()];
  const coussinPts = lisse([[L - 82, -30], [L - 76, -29], [L - 70, -27], [L - 56, -38], [L - 32, -40], [L - 10, -30], [L, 0],
    [L - 10, 30], [L - 32, 40], [L - 56, 38], [L - 70, 27], [L - 76, 29], [L - 82, 30]]);
  const coussinDedans = lisse([[L - 82, -24], [L - 70, -23.5], [L - 56, -23], [L - 40, -22], [L - 26, -15], [L - 24, 0],
    [L - 26, 15], [L - 40, 22], [L - 56, 23], [L - 70, 23.5], [L - 82, 24]]);
  const VM = 65;   // le milieu d'une branche, à la traverse

  // la béquille, dessinée par M(u, v) → [x, y] de la vue ; e : unités de vue par mm
  function bequille(M, e, o = {}) {
    const at = A.arete, det = A.detail;
    const Mp = pts => pts.map(p => M(p[0], p[1]));
    const out = [];
    if (o.chicots) {   // deux branches coupées au ras de la perche
      for (const [u, s] of [[330, 1], [470, -1], [uC + 150, 1]]) {
        const v0 = s * (u > uF ? 93 : 15.3), dv = s * 9;
        out.push(h.path(dP(Mp([[u - 7, v0 - s * 2], [u - 4, v0 + dv], [u + 7, v0 + dv], [u + 9, v0 - s * 2]]), true), blanc(det)));
        out.push(h.path(dP(Mp(lisse([[u - 4, v0 + dv], [u + 1.5, v0 + dv + s * 2.2], [u + 7, v0 + dv], [u + 1.5, v0 + dv - s * 2.2], [u - 4, v0 + dv]], 4)), true), A.fin));
      }
    }
    out.push(h.path(dP(Mp(silhouette), true), blanc(at)));
    out.push(h.path(dP(Mp([[0, -16], [0, 16]])), at));
    out.push(h.path(dP(Mp([[L - 27, -20], [L - 27, 20]])), at));
    if (o.ecorce) {   // les rides d'écorce sous la fourche
      out.push(h.path(dP(Mp(lisse([[uF - 60, -4], [uF - 20, -2], [uF + 2, 0]], 5))), A.fin));
      out.push(h.path(dP(Mp(lisse([[uF - 45, 5], [uF - 15, 3], [uF + 2, 0]], 5))), A.fin));
    }
    if (o.anneau !== false) {
      out.push(h.path(dP(Mp([[uR - 6, -RA], [uR + 6, -RA], [uR + 6, RA], [uR - 6, RA]]), true), blanc(at)));
      for (const du of [-12, -9, 9, 12]) out.push(h.path(dP(Mp([[uR + du, -16], [uR + du + 1.5, 16]])), det));
    }
    if (o.traverse !== false) {
      out.push(h.path(dP(Mp([[uC - 11, -100], [uC + 11, -100], [uC + 11, 100], [uC - 11, 100]]), true), blanc(at)));
      if (o.ligatures !== false) for (const s of [1, -1]) {
        const vm = s * VM, du = 14, dv = 15;
        out.push(h.path(dP(Mp([[uC - du, vm - dv], [uC + du, vm - dv], [uC + du, vm + dv], [uC - du, vm + dv]]), true), blanc(det)));
        out.push(h.path(dP(Mp([[uC - du, vm - dv + 4], [uC + du, vm + dv - 4]])), det), h.path(dP(Mp([[uC - du, vm + dv - 4], [uC + du, vm - dv + 4]])), det));
      }
    }
    if (o.coussin !== false) {
      out.push(h.path(dP(Mp(coussinPts), true), blanc(at)));
      out.push(h.path(dP(Mp(lisse([[L - 62, -30], [L - 38, -32], [L - 16, -22], [L - 7, 0]], 6))), A.fin));
      out.push(h.path(dP(Mp(lisse([[L - 62, 30], [L - 40, 31], [L - 20, 24]], 6))), A.fin));
      for (const v of [-18, -6, 6, 18]) out.push(h.path(dP(Mp([[L - 66, v * 1.1], [L - 56, v * 1.5]])), A.fin));
      out.push(h.path(dP(Mp([[L - 72.5, -29], [L - 67.5, -29], [L - 67.5, 29], [L - 72.5, 29]]), true), blanc(det)));
    }
    return out.join(NL);
  }
  // une cassure : le bois continue au-delà
  const cassure = (M, u, v0, v1) => h.path(dP(lisse([[u, v0], [u + 3, v0 + (v1 - v0) * 0.3], [u - 3, v0 + (v1 - v0) * 0.65], [u, v1]].map(p => M(p[0], p[1])), 5)), A.detail);

  return {
    ref: '24-06b',
    titre: 'La béquille de fourche, ses pièces',
    desc: 'La béquille couchée, le pied à gauche : une perche d’aulne, de bouleau ou d’érable qui fourche naturellement, ses deux branches écartées puis ramenées l’une contre l’autre au sommet, sous un rembourrage de linge plié ; une traverse liée en croix sur les deux branches, juste au-dessus de la fourche, fait la poignée ; un anneau vu par la tranche près du bout. Sa longueur, du bout au haut du rembourrage : la taille moins 400 mm ; trop longue, on recoupe le pied, trop courte, on y lie une cale. En détail : le sommet, le rembourrage coupé pour montrer les deux bouts de branches liés ensemble par une ligature et le linge plié en trois par-dessus, serré par un lien ; la traverse liée en croix sur chaque branche ; l’anneau à neige vu de dessus, une branche souple pliée en rond, ses bouts doublés et liés, lacée en croix et serrée sur la perche au milieu ; et de côté, posé sur la neige, le bout du bâton enfoncé sous lui.',
    format: 'pleine',
    disposition: [['plat'], ['sommet', 'traverse'], ['anneau', 'neige']],
    hauteurs: [1.05, 1.45, 1.45],
    largeurs: [[1], [1.1, 1], [1, 1]],
    vues: {
      // ─── la béquille à plat ───
      plat: (() => {
        const geo = z => {
          const s = (z.l - 30) / (L + 20), x0 = 16, cy = z.h - 10 - 100 * s;
          const V = (u, v) => [x0 + s * u, cy - s * v];
          return { s, x0, cy, V };
        };
        return {
          titre: 'Couchée, le pied à gauche',
          dessin: z => {
            const { s, cy, V } = geo(z);
            const out = [bequille(V, s, { chicots: true, ecorce: true })];
            const yq = cy - 104 * s - 14;
            out.push(h.ligne(V(0, 0)[0], V(0, 18)[1] - 3, V(0, 0)[0], yq - 4, rappel));
            out.push(h.ligne(V(L, 0)[0], V(L, 0)[1] - 3, V(L, 0)[0], yq - 4, rappel));
            out.push(h.cote(V(0, 0)[0], yq, V(L, 0)[0], yq, 'taille − 400 mm'));
            return out.join(NL);
          },
          renvois: z => {
            const { s, cy, V } = geo(z);
            const yb = Math.round(Math.min(z.h - 11, cy + 96 * s));
            return [
              { n: 1, rond: [Math.round(V(uF - 90, 0)[0]), yb], cible: V(uF + 6, 0), texte: 'fourche naturelle : aulne, bouleau, érable' },
              { n: 2, rond: [Math.round(V(170, 0)[0]), yb], cible: V(22, -10), texte: 'trop longue, recouper ; trop courte, caler' },
            ];
          },
        };
      })(),

      // ─── le sommet, rembourrage coupé ───
      sommet: (() => {
        const U0 = L - 112;
        const geo = z => {
          const s = Math.min((z.l - 24) / (L + 6 - U0), (z.h - 8) / 126);
          const x0 = z.l / 2 - s * (U0 + L + 6) / 2, cy = z.h / 2;
          const V = (u, v) => [x0 + s * u, cy - s * v];
          return { s, cy, V };
        };
        return {
          titre: 'Le sommet, rembourrage coupé',
          dessin: z => {
            const { s, V } = geo(z);
            const Vp = pts => pts.map(p => V(p[0], p[1]));
            const out = [];
            // les deux branches, cassées à gauche et coupées par le bord de la vue
            const xg = V(U0, 0)[0];
            out.push(decoupe(bequille(V, s, { anneau: false, coussin: false, traverse: false }), [[[xg, 0], [z.l, 0], [z.l, z.h], [xg, z.h]]]));
            const vs = u => { const e = bordExt.concat(), i = bordInt.concat();
              const at = (B, uu) => { for (let k = 0; k < B.length - 1; k++) if (uu <= B[k + 1][0]) return B[k][1] + (B[k + 1][1] - B[k][1]) * (uu - B[k][0]) / (B[k + 1][0] - B[k][0]); return 0; };
              return [at(e, u), at(i, u)]; };
            const [e0, i0] = vs(U0);
            for (const sg of [1, -1]) out.push(cassure(V, U0, sg * (e0 + 2), sg * (i0 - 2)));
            // la ligature : cinq tours serrés autour des deux branches jointes
            for (let k = 0; k < 5; k++) {
              const u = L - 64 + k * 5;
              out.push(tour(V(u + 2, -23.5), V(u + 6, 23.5), 4.6 * s));
            }
            // le rembourrage en coupe : trois épaisseurs de linge, serrées par leur lien
            const coupe = [...coussinPts, ...coussinDedans.slice().reverse()];
            out.push(h.path(dP(Vp(coupe), true), A.hachure('isolant', 'arete')));
            for (const t of [1 / 3, 2 / 3]) {
              const pli = coussinDedans.map((p, i) => {
                const q = coussinPts[Math.round(i * (coussinPts.length - 1) / (coussinDedans.length - 1))];
                return [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
              });
              out.push(h.path(dP(Vp(pli)), A.fin));
            }
            for (const sg of [1, -1]) { const c = V(L - 70, sg * 30.2); out.push(h.cercle(c[0], c[1], 2.8 * s, noir)); }
            return out.join(NL);
          },
          renvois: z => {
            const { V } = geo(z);
            return [
              { n: 3, rond: [Math.round(V(L - 110, 0)[0]), 12], cible: V(L - 47, 14), texte: 'branches liées ensemble au sommet' },
              { n: 4, rond: [Math.round(V(L - 110, 0)[0]), z.h - 12], cible: V(L - 42, -34), texte: 'rembourrage : linge plié ou fourrure' },
            ];
          },
        };
      })(),

      // ─── la traverse, liée en croix ───
      traverse: (() => {
        const geo = z => {
          const s = Math.min((z.l - 24) / 210, (z.h - 10) / 212);
          const x0 = z.l / 2 - s * (uC - 5), cy = z.h / 2;
          const V = (u, v) => [x0 + s * u, cy - s * v];
          return { s, x0, cy, V };
        };
        return {
          titre: 'La traverse, liée en croix',
          dessin: z => {
            const { s, V } = geo(z);
            const out = [];
            const u0 = uC - 105, u1 = uC + 95;
            const cadre = [V(u0, 200), V(u1, 200), V(u1, -200), V(u0, -200)];
            out.push(decoupe(bequille(V, s, { anneau: false, coussin: false, ligatures: false }), [cadre]));
            const vs = u => { const at = (B, uu) => { for (let k = 0; k < B.length - 1; k++) if (uu <= B[k + 1][0]) return B[k][1] + (B[k + 1][1] - B[k][1]) * (uu - B[k][0]) / (B[k + 1][0] - B[k][0]); return 0; };
              return [at(bordExt, u), at(bordInt, u)]; };
            for (const u of [u0, u1]) { const [e, i] = vs(u); for (const sg of [1, -1]) out.push(cassure(V, u, sg * (e + 2), sg * (i - 2))); }
            // la ligature en croix sur chaque branche : trois tours dans un sens, trois dans l'autre
            for (const sg of [1, -1]) {
              const vm = sg * VM;
              for (const dir of [1, -1]) for (const k of [-4.5, 0, 4.5]) {
                out.push(tour(V(uC - 17 + k, vm - dir * 17), V(uC + 17 + k, vm + dir * 17), 4 * s));
              }
            }
            return out.join(NL);
          },
          renvois: z => {
            const { V } = geo(z);
            return [
              { n: 5, rond: [z.l - 14, 14], cible: V(uC + 10, VM + 8), texte: 'traverse liée en croix aux deux branches' },
            ];
          },
        };
      })(),

      // ─── l'anneau à neige, vu de dessus ───
      anneau: (() => {
        const geo = z => {
          const s = Math.min((z.l - 20) / 180, (z.h - 8) / 176);
          return { s, c: [z.l / 2, z.h / 2] };
        };
        return {
          titre: 'L’anneau à neige, vu de dessus',
          dessin: z => {
            const { s, c } = geo(z);
            const out = [];
            const P1 = (r, deg) => [c[0] + s * r * Math.cos(deg * Math.PI / 180), c[1] + s * r * Math.sin(deg * Math.PI / 180)];
            const arc = (r, a0, a1, n = 72) => Array.from({ length: n + 1 }, (_, i) => P1(r, a0 + (a1 - a0) * i / n));
            // le laçage en croix : deux brins par branche de la croix, de la perche à l'anneau
            for (const a of [0, 90, 180, 270]) for (const d of [-3, 3]) {
              const n = [Math.cos((a + 90) * Math.PI / 180) * d, Math.sin((a + 90) * Math.PI / 180) * d];
              const p0 = P1(20, a), p1 = P1(75, a);
              out.push(bande([p0[0] + s * n[0], p0[1] + s * n[1]], [p1[0] + s * n[0], p1[1] + s * n[1]], 2.6 * s));
            }
            // l'anneau : une branche souple pliée en rond, ses bouts doublés sur 50° et liés
            const R0 = RA, R1 = RA - 12, R2 = RA - 24;
            out.push(h.path(dP(arc(R0, 0, 360), true) + ' ' + dP(arc(R1, 0, 360).reverse(), true), `fill="${BLANC}" fill-rule="evenodd" stroke="none"`));
            out.push(h.path(dP(arc(R0, 0, 360), true), A.arete), h.path(dP(arc(R1, 0, 360), true), A.arete));
            out.push(h.path(dP([...arc(R1, 205, 255, 30), ...arc(R2, 255, 205, 30)], true), blanc(A.arete)));
            for (const a of [211, 216, 244, 249]) out.push(tour(P1(R2 - 3, a), P1(R0 + 3, a), 4.2 * s));
            // au bout de chaque branche de la croix, le brin fait deux tours sur l'anneau
            for (const a of [0, 90, 180, 270]) for (const d of [-3.5, 3.5]) out.push(tour(P1(R1 - 4, a + d), P1(R0 + 4, a + d), 3 * s));
            // au milieu, la perche coupée en travers et les tours du laçage serrés autour
            out.push(h.cercle(c[0], c[1], 23 * s, blanc(A.detail)));
            for (const r of [19.5]) out.push(h.cercle(c[0], c[1], r * s, A.fin));
            out.push(h.cercle(c[0], c[1], 16 * s, A.hachure('bois', 'arete')));
            return out.join(NL);
          },
          renvois: z => {
            const { s, c } = geo(z);
            const P1 = (r, deg) => [c[0] + s * r * Math.cos(deg * Math.PI / 180), c[1] + s * r * Math.sin(deg * Math.PI / 180)];
            const b = P1(RA - 6, 230), l = P1(50, 0 - 2);
            return [
              { n: 6, rond: [12, 14], cible: b, texte: 'anneau de branche souple, bouts liés' },
              { n: 7, rond: [z.l - 12, 14], cible: [l[0], l[1] - 3 * s], texte: 'lacé en croix, serré sur la perche' },
            ];
          },
        };
      })(),

      // ─── l'anneau posé sur la neige ───
      neige: (() => {
        const geo = z => {
          const s = Math.min((z.l - 40) / 230, (z.h - 8) / 176);
          const x = z.l / 2, ys = z.h - 8 - 70 * s;
          const Q = (v, u) => [x + s * v, ys - s * (u - (uR - 6))];
          return { s, x, ys, Q };
        };
        return {
          titre: 'Posé sur la neige, de côté',
          dessin: z => {
            const { s, x, ys, Q } = geo(z);
            const out = [];
            out.push(h.rect(x - s * 115, ys, s * 230, z.h - 4 - ys, A.hachure('neige', 'aucun')));
            out.push(h.ligne(x - s * 115, ys, x + s * 115, ys, A.arete));
            // le bout, sous la neige
            out.push(h.path(dP([Q(-16, uR - 6), Q(-16, 0), Q(16, 0), Q(16, uR - 6)]), A.cache));
            // la perche, cassée en haut
            const haut = uR + 95;
            out.push(h.path(dP([Q(-16, uR - 6), Q(-15.7, haut - 4), Q(15.7, haut + 4), Q(16, uR - 6)], true), blanc(A.arete)));
            out.push(h.path(dP(lisse([Q(-15.7, haut - 4), Q(-6, haut + 3), Q(5, haut - 3), Q(15.7, haut + 4)], 5)), A.detail));
            // les tours du laçage sur la perche, et l'anneau par la tranche
            for (const du of [9, 13, 17]) out.push(tour(Q(-18, uR + du - 1), Q(18, uR + du + 1), 3 * s));
            out.push(h.path(dP([Q(-RA, uR - 6), Q(RA, uR - 6), Q(RA, uR + 6), Q(-RA, uR + 6)], true), blanc(A.arete)));
            return out.join(NL);
          },
          renvois: z => {
            const { Q } = geo(z);
            return [
              { n: 8, rond: [z.l - 14, 14], cible: Q(RA - 25, uR + 6), texte: 'le bâton ne s’enfonce plus' },
            ];
          },
        };
      })(),
    },
  };
};
