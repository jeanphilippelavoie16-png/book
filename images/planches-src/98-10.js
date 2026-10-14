// Planche 98-10 — la claie à grain près du poêle. Chapitre 98, §9 « Sécher, et savoir que c'est
// sec, sans instrument » et étape 42 : la claie au-dessus du poêle pour le grain de table, en
// couche mince, brassée à la main ; la semence sur une moustiquaire tendue à l'air, dans la pièce
// du poêle mais loin de lui, retournée à la main, jamais plus chaude que la main qui la touche.
// Le chapitre ne donne ni la taille de la claie, ni la hauteur, ni la distance au poêle : aucune
// cote. Le montage (perches, lattes clouées, brides aux solives) est le plus simple qui tienne ;
// la moustiquaire tendue sur des lattes vient du ch. 100 §9, auquel le chapitre renvoie.
// 14 oct. : la main qui brasse le grain est une main simple (mains/moteur.js, plat vue du pouce) au lieu
// du calque s10-plat ; son va-et-vient (le geste) passe en rouge. La charte : les perches de la claie
// au contour 2,4, le côté des lattes à l'ombre.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const r1 = v => Math.round(v * 10) / 10;
  const pt = p => `${r1(p[0])} ${r1(p[1])}`;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const bA = blanc(A.arete), bD = blanc(A.detail), bC = blanc(A.contour), bF = blanc(A.fin);
  const alea = g => { let s = g; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  const poly = (pts, at, ferme = true) => h.chemin(pts, at, ferme);
  const MIXTE = 'fill="none" stroke="#1A1A1A" stroke-width="0.7" stroke-dasharray="9 3 1.5 3" stroke-linecap="round"';
  const MAILLE = 'fill="none" stroke="#1A1A1A" stroke-width="0.7" stroke-dasharray="1.6 1.2"';
  const RAD = Math.PI / 180;
  // un grain : un ovale tourné, en chemin (pas de transform)
  const ovale = (x, y, ang, rx, ry, at) => {
    const c = Math.cos(ang * RAD), sn = Math.sin(ang * RAD);
    const p1 = [x + rx * c, y + rx * sn], p2 = [x - rx * c, y - rx * sn];
    return h.path(`M${pt(p1)} A${rx} ${ry} ${r1(ang)} 1 0 ${pt(p2)} A${rx} ${ry} ${r1(ang)} 1 0 ${pt(p1)} Z`, at);
  };
  let nClip = 0;
  const decoupe = (pts, contenu) => {
    const id = `k9810-${++nClip}`;
    return `<clipPath id="${id}"><path d="M${pts.map(pt).join(' L')} Z" fill="none"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu.join('\n')}\n</g>`;
  };

  // ─── Vue 1 : la pièce du poêle, en coupe ────────────────────────────────────────────────
  // Repère en mm : x depuis la face intérieure du mur de gauche, y depuis le plancher.
  const gP = z => {
    const s = 0.107, x0 = 150 * s + 10, y0 = z.h - 60 * s - 8;
    return { s, X: mm => x0 + mm * s, Y: mm => y0 - mm * s };
  };
  const piece = z => {
    const { s, X, Y } = gP(z);
    const R = (xa, ya, xb, yb, at) => h.rect(X(xa), Y(yb), (xb - xa) * s, (yb - ya) * s, at);
    const o = [];
    const PL = 2300, SOL = 2484, TOIT = 2510, FIN = 5000;
    // les murs et le plancher coupés, la solive vue de long sous le plancher du grenier
    o.push(R(-150, -60, 0, TOIT, A.hachure('bois')), R(FIN, -60, FIN + 150, TOIT, A.hachure('bois')));
    o.push(R(0, -60, FIN, 0, A.hachure('bois')), R(0, SOL, FIN, TOIT, A.hachure('bois')));
    o.push(R(0, PL, FIN, SOL, bA));
    o.push(h.ligne(X(0), Y(2360), X(FIN), Y(2360), A.fin), h.ligne(X(0), Y(2430), X(FIN), Y(2430), A.fin));

    // l'air chaud qui monte du poêle, à travers la claie, jusqu'au plafond
    const air = (xa, dx) => {
      const pts = [[xa, 760], [xa + dx * 0.3 + 25, 960], [xa + dx * 0.45 - 25, 1180], [xa + dx * 0.6 + 20, 1420],
        [xa + dx * 0.75 - 15, 1700], [xa + dx * 0.9 + 15, 1950], [xa + dx, 2180]];
      let d = `M${pt([X(pts[0][0]), Y(pts[0][1])])}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i];
        d += ` Q${pt([X((a[0] + b[0]) / 2 + (i % 2 ? 22 : -22)), Y((a[1] + b[1]) / 2)])} ${pt([X(b[0]), Y(b[1])])}`;
      }
      return h.fleche(d, A.cache);
    };
    o.push(air(620, -60), air(800, 0), air(990, 70));

    // le poêle, de côté : quatre pattes, la caisse, la plaque du dessus, la porte et sa poignée
    // à l'avant, le tuyau qui sort à l'arrière et traverse le mur
    const P0 = 450, P1 = 1100;
    o.push(R(-150, 465, P0, 615, bA));                                        // le tuyau, jusque dans le mur
    for (const xx of [300, 150]) o.push(h.ligne(X(xx), Y(615), X(xx), Y(465), A.detail));
    o.push(h.ligne(X(-150), Y(615), X(0), Y(615), A.arete), h.ligne(X(-150), Y(465), X(0), Y(465), A.arete));
    o.push(R(0, 425, 22, 655, bA));                                           // la bague au mur
    o.push(R(480, 0, 525, 190, bA), R(1025, 0, 1070, 190, bA));
    o.push(R(P0, 180, P1, 700, bC));
    o.push(R(P0 - 18, 700, P1 + 18, 725, bA));
    o.push(R(485, 225, 1065, 660, A.fin));
    o.push(R(P1, 250, P1 + 14, 655, bA));                                     // la porte, sur la tranche
    o.push(h.chemin([[X(P1 + 14), Y(575)], [X(P1 + 42), Y(575)], [X(P1 + 42), Y(525)]], A.arete));

    // une claie pendue : perche vue de long, lattes vues par le bout, le grain en dos d'âne mince,
    // la bride vue de côté (ses deux brins l'un derrière l'autre), l'anneau, la vis à œil
    const claie = (xa, xb, yb, lat, cordes, sommet, graine) => {
      const q = [];
      const T = 100;                                               // épaisseur de la perche, doublée pour qu'elle se lise
      for (const xc of cordes) {
        q.push(h.ligne(X(xc), Y(yb + T + 22), X(xc), Y(PL - 18), A.detail));
        q.push(h.cercle(X(xc), Y(sommet), 2.2, bD));
        q.push(h.path(`M${pt([X(xc), Y(PL - 18)])} a2.3 2.3 0 1 1 0.1 0`, A.detail), h.ligne(X(xc), Y(PL - 13), X(xc), Y(PL), A.detail));
      }
      q.push(R(xa, yb, xb, yb + T, bA));
      for (const xl of lat) q.push(R(xl, yb + T, xl + 40, yb + T + 22, bA));
      // le grain : une rangée d'ovales posés sur la claie, entre les lattes
      const r = alea(graine), g0 = lat[0] + 60, g1 = lat[1] - 20;
      for (let xx = g0; xx <= g1; xx += 38) {
        q.push(ovale(X(xx + (r() - 0.5) * 8), Y(yb + T) - 1.4, (r() - 0.5) * 30, 2.1, 1.25, bD));
      }
      return q;
    };
    o.push(...claie(470, 1370, 1480, [510, 1290], [490, 1350], 1880, 7));
    o.push(...claie(3870, 4570, 1560, [3905, 4495], [3890, 4550], 1960, 11));

    return o.join('\n');
  };

  // ─── Vue 2 : la claie, en perspective ───────────────────────────────────────────────────
  // Repère en mm : X le long des perches, Y en travers (0 : la perche avant), Z vers le haut
  // (0 : l'axe des perches). On la voit de l'avant, du bout droit et d'en haut.
  const L = 900, W = 560, r = 25, LA = [60, 800], LAL = 40, LAE = 20, BR = [28, 872];
  const HB = 330, HV = 110, SOLH = 184, SOLE = 38;
  const cl = { u: 0.24, ox: 16, oy: 210 };
  const P = (x, y, zz) => [cl.ox + (x * 0.94 + y * 0.52) * cl.u, cl.oy + (x * 0.17 - y * 0.40 - zz) * cl.u];
  const capot = (x, y) => Array.from({ length: 36 }, (_, i) => { const t = i / 36 * 2 * Math.PI; return P(x, y + r * Math.cos(t), r * Math.sin(t)); });
  const enveloppe = pts => {
    const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], hi = [];
    for (const q of p) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
    for (const q of p.slice().reverse()) { while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], q) <= 0) hi.pop(); hi.push(q); }
    return lo.slice(0, -1).concat(hi.slice(0, -1));
  };
  const perche = (y, seed) => {
    const q = [];
    q.push(poly(enveloppe([...capot(0, y), ...capot(L, y)]), bC));     // la charte : la claie pèse
    // l'écorce : quelques traits fins le long
    const rr = alea(seed);
    for (let i = 0; i < 5; i++) {
      const a = 0.4 + rr() * 2.2, x1 = 60 + rr() * 500, lg = 90 + rr() * 200;
      q.push(h.chemin([P(x1, y + r * Math.cos(a) * 0.9, r * Math.sin(a) * 0.9 - 4), P(x1 + lg, y + r * Math.cos(a) * 0.9, r * Math.sin(a) * 0.9 - 4)], A.fin));
    }
    // le bout coupé, vu : cerne et cœur
    q.push(poly(capot(L, y), bA));
    q.push(poly(capot(L, y).map(p => { const c = P(L, y, 0); return [c[0] + (p[0] - c[0]) * 0.72, c[1] + (p[1] - c[1]) * 0.72]; }), A.fin));
    q.push(h.cercle(...P(L, y, 0), 0.8, A.plein));
    return q;
  };
  const claie = z => {
    const o = [];
    const Zs = r, Zv = r + HB, Zj = Zv + HV;
    // la solive, un tronçon vu de dessous l'angle : face avant, dessus, bouts rompus
    const ya = W / 2 - SOLE / 2, yb = W / 2 + SOLE / 2, xs0 = -40, xs1 = L + 40;
    o.push(poly([P(xs0, ya, Zj), P(xs1, ya, Zj), P(xs1, ya, Zj + SOLH), P(xs0, ya, Zj + SOLH)], bA));
    o.push(poly([P(xs0, ya, Zj + SOLH), P(xs1, ya, Zj + SOLH), P(xs1, yb, Zj + SOLH), P(xs0, yb, Zj + SOLH)], bA));
    o.push(poly([P(xs1, ya, Zj), P(xs1, yb, Zj), P(xs1, yb, Zj + SOLH), P(xs1, ya, Zj + SOLH)], A.hachure('bois', 'arete')));
    for (const k of [0.3, 0.62]) o.push(h.chemin([P(xs0 + 30, ya, Zj + SOLH * k), P(xs1 - 60, ya, Zj + SOLH * k + 8)], A.fin));
    // bout gauche rompu : un zigzag
    const zz = [P(xs0, ya, Zj), P(xs0 + 12, ya, Zj + SOLH * 0.35), P(xs0 - 10, ya, Zj + SOLH * 0.65), P(xs0, ya, Zj + SOLH)];
    o.push(h.chemin(zz, A.detail));

    // la perche arrière, puis la moustiquaire posée sur les deux perches
    o.push(...perche(W, 3));
    const X0 = 35, X1 = L - 35;
    const toile = [P(X0, W, Zs), P(X1, W, Zs), P(X1, 0, Zs), P(X0, 0, Zs)];
    o.push(poly(toile, bD));
    const mailles = [];
    for (let x = X0; x <= X1; x += 22) mailles.push(h.chemin([P(x, 0, Zs), P(x, W, Zs)], A.fin));
    for (let y = 0; y <= W; y += 22) mailles.push(h.chemin([P(X0, y, Zs), P(X1, y, Zs)], A.fin));
    o.push(decoupe(toile, mailles));
    // le grain étalé mince, loin des bouts : une nappe piquée de grains
    const gr = alea(5), nappe = [];
    const gx0 = 130, gx1 = 740, gy0 = 50, gy1 = W - 50;
    for (let i = 0; i <= 16; i++) {
      const t = i / 16, bord = (k) => 10 * Math.sin(k * 7.3 + 1) + 6 * Math.sin(k * 13.1);
      nappe.push(P(gx0 + (gx1 - gx0) * t, gy0 + bord(t), Zs));
    }
    for (let i = 0; i <= 10; i++) { const t = i / 10; nappe.push(P(gx1 + 12 * Math.sin(t * 9), gy0 + (gy1 - gy0) * t, Zs)); }
    for (let i = 0; i <= 16; i++) { const t = i / 16; nappe.push(P(gx1 - (gx1 - gx0) * t, gy1 + 9 * Math.sin(t * 8.1 + 2), Zs)); }
    for (let i = 0; i <= 10; i++) { const t = i / 10; nappe.push(P(gx0 + 12 * Math.sin(t * 7 + 1), gy1 - (gy1 - gy0) * t, Zs)); }
    o.push(poly(nappe, bF));
    const grains = [];
    for (let i = 0; i < 430; i++) {
      const x = gx0 + gr() * (gx1 - gx0), y = gy0 + gr() * (gy1 - gy0);
      const c = P(x, y, Zs);
      grains.push(ovale(c[0], c[1], gr() * 180, 1.1, 0.55, A.plein));
    }
    o.push(decoupe(nappe, grains));

    // la perche avant, la moustiquaire rabattue sur sa face avant, les clous en rang
    o.push(...perche(0, 9));
    const bande = [];
    for (let i = 0; i <= 12; i++) { const a = Math.PI / 2 + i / 12 * (Math.PI * 0.62); bande.push([Math.cos(a), Math.sin(a)]); }
    const rab = [...bande.map(([c, sn]) => P(X0, r * c, r * sn)), ...bande.slice().reverse().map(([c, sn]) => P(X1, r * c, r * sn))];
    o.push(poly(rab, bD));
    const mm = [];
    for (let x = X0; x <= X1; x += 22) mm.push(h.chemin(bande.map(([c, sn]) => P(x, r * c, r * sn)), A.fin));
    for (const k of [3, 6, 9]) mm.push(h.chemin([P(X0, r * bande[k][0], r * bande[k][1]), P(X1, r * bande[k][0], r * bande[k][1])], A.fin));
    o.push(decoupe(rab, mm));
    const bas = bande[12];
    o.push(h.chemin([P(X0, r * bas[0], r * bas[1]), P(X1, r * bas[0], r * bas[1])], A.detail));
    const clous = [];
    for (let x = X0 + 25; x <= X1 - 20; x += 70) clous.push(P(x, r * bande[10][0], r * bande[10][1]));
    for (const c of clous) o.push(h.cercle(c[0], c[1], 1.3, A.plein));

    // les deux lattes, clouées en travers par-dessus la moustiquaire
    for (const xl of LA) {
      const x2 = xl + LAL, y0 = -45, y1 = W + 45, za = Zs, zb = Zs + LAE;
      o.push(poly([P(xl, y1, zb), P(x2, y1, zb), P(x2, y0, zb), P(xl, y0, zb)], bA));           // dessus
      o.push(poly([P(xl, y0, za), P(x2, y0, za), P(x2, y0, zb), P(xl, y0, zb)], A.hachure('bois', 'arete'))); // bout
      const cote = [P(x2, y0, za), P(x2, y1, za), P(x2, y1, zb), P(x2, y0, zb)];
      o.push(poly(cote, A.ombre), poly(cote, A.arete));                                             // côté, à l'ombre
      for (const yy of [0, W]) o.push(h.cercle(...P(xl + LAL / 2, yy, zb), 1.5, A.plein));
    }

    // les brides : un brin à chaque coin, noué sur la perche, les deux brins à l'anneau, un
    // bout de corde jusqu'à la vis à œil
    for (const xb of BR) {
      const sommet = P(xb, W / 2, Zv), oeil = P(xb, W / 2, Zj - 12);
      for (const yy of [W, 0]) {
        const pied = P(xb, yy, Zs);
        o.push(h.chemin([pied, sommet], A.detail));
        // la corde qui fait le tour de la perche
        o.push(h.chemin(Array.from({ length: 9 }, (_, i) => { const a = -0.3 + i / 8 * (Math.PI + 0.6); return P(xb, yy + r * 1.08 * Math.cos(a), r * 1.08 * Math.sin(a)); }), A.detail));
      }
      o.push(h.chemin([sommet, oeil], A.detail));
      o.push(h.cercle(sommet[0], sommet[1], 2.6, bD));
      o.push(h.cercle(oeil[0], oeil[1], 2.6, A.detail), h.ligne(oeil[0], oeil[1] - 2.6, ...P(xb, W / 2, Zj), A.detail));
    }

    // le plan de la coupe, en trait mixte, vu dans le sens des flèches
    const xc = 330;
    const HALO = 'fill="none" stroke="#FFFFFF" stroke-width="4.2" stroke-linecap="round"';
    const MIXTE2 = MIXTE.replace('stroke-width="0.7"', 'stroke-width="1.4"');
    o.push(h.chemin([P(xc, -250, Zs), P(xc, W + 110, Zs)], HALO), h.chemin([P(xc, -250, Zs), P(xc, W + 110, Zs)], MIXTE2));
    for (const [ya, yb] of [[-300, -250], [W + 110, W + 160]]) {
      o.push(h.chemin([P(xc, ya, Zs), P(xc, yb, Zs)], A.contour));
      const a = P(xc, ya < 0 ? ya : yb, Zs), b = P(xc - 85, ya < 0 ? ya : yb, Zs);
      o.push(h.fleche(`M${pt(a)} L${pt(b)}`, A.arete));
    }
    return o.join('\n');
  };

  // ─── Vue 3 : en coupe, en travers de la claie ───────────────────────────────────────────
  // Une moitié de claie : la perche avant coupée, la moustiquaire qui passe par-dessus et se
  // cloue sur sa face extérieure, le grain en couche mince, la main à plat dessus.
  const gC = z => {
    const k = 0.8, R = r * k, cx = R + 16, cy = 200;
    const ys = y => cy - R + y;
    const aClou = 192 * Math.PI / 180, aSort = 58 * Math.PI / 180;
    const arc = [];
    for (let i = 0; i <= 20; i++) {
      const a = aClou - (aClou - aSort) * i / 20;
      arc.push([cx + (R + 1.2) * Math.cos(a), cy - (R + 1.2) * Math.sin(a)]);
    }
    const sortie = arc[arc.length - 1];
    const xFin = z.l - 10, yFin = ys(0) + 9, EP = 9;
    const yM = x => { const t = (x - sortie[0]) / (xFin - sortie[0]); const a = sortie[1], b = ys(0) + 5, c = yFin; return (1 - t) * (1 - t) * a + 2 * t * (1 - t) * b + t * t * c; };
    const surf = x => yM(x) - EP + 1;
    return { k, R, cx, cy, ys, aClou, arc, sortie, xFin, yFin, EP, yM, surf, xm: 128 };
  };
  const coupe = z => {
    const o = [];
    const { k, R, cx, cy, ys, aClou, arc, sortie, xFin, yFin, EP, yM, surf, xm } = gC(z);
    // l'air qui monte sous la moustiquaire
    for (const [xx, dx] of [[118, -6], [172, 4], [226, -4]]) {
      o.push(h.fleche(`M${pt([xx + dx, z.h - 8])} Q${pt([xx + dx + 14, (z.h + cy) / 2 + 20])} ${pt([xx, cy - R + 14])}`, A.cache));
    }
    // la perche coupée : l'écorce, le bois
    o.push(h.cercle(cx, cy, R, A.hachure('bois', 'arete')));
    o.push(h.cercle(cx, cy, R - 3.5, A.fin));
    // la moustiquaire : du clou, par-dessus la perche, puis tendue vers l'arrière, à peine creuse
    const creux = [[sortie[0], sortie[1]], [sortie[0] + 40, ys(0) + 5], [xFin, yFin]];
    const dMaille = `M${arc.map(pt).join(' L')} Q${pt(creux[1])} ${pt(creux[2])}`;
    o.push(h.path(dMaille, MAILLE));
    // le clou, planté de l'extérieur dans la perche
    const cc = [cx + (R + 1.2) * Math.cos(aClou), cy - (R + 1.2) * Math.sin(aClou)];
    const dir = [Math.cos(aClou), -Math.sin(aClou)];
    o.push(h.chemin([[cc[0] + dir[0] * 2, cc[1] + dir[1] * 2], [cc[0] - dir[0] * 13, cc[1] - dir[1] * 13]], A.arete));
    const tq = [[3.6, 4], [3.6, -4], [1.6, -4], [1.6, 4]].map(([a, b]) => [cc[0] + dir[0] * a - dir[1] * b, cc[1] + dir[1] * a + dir[0] * b]);
    o.push(poly(tq, A.plein));
    // la courbe de la moustiquaire, pour poser le grain dessus
    const xM = x => x;                                             // la Bézier est presque droite en x
    // le grain : trois grains d'épaisseur au plus, contre la perche jusqu'à la cassure
    const gr = alea(17), grains = [];
    for (let x = sortie[0] - 4; x < xFin - 2; x += 4.2) {
      const base = yM(xM(x)) - 1.3;
      const couches = 2 + (gr() < 0.45 ? 1 : 0);
      for (let c = 0; c < couches; c++) {
        const xx = x + (c % 2 ? 2.1 : 0) + (gr() - 0.5) * 1.2;
        const yy = base - c * 2.9 - 0.4 - gr() * 0.6;
        if (Math.hypot(xx - cx, yy - cy) < R + 3) continue;
        grains.push(ovale(xx, yy, (gr() - 0.5) * 50, 2.4, 1.35, bD));
      }
    }
    o.push(...grains);
    // la cassure : la claie continue à droite
    const xc = xFin, yc = yFin;
    o.push(h.chemin([[xc, yc - EP - 8], [xc + 3, yc - EP + 2], [xc - 3, yc - 2], [xc, yc + 6]], A.detail));
    // la main à plat sur le grain, venue par-dessus la perche (main simple, plat vue du pouce, un peu vue
    // d'en haut, comme 50-40) : la paume posée sur le grain, le pouce dessous, les doigts vers l'arrière
    // de la claie, l'avant-bras qui remonte à gauche et sort de la vue
    const xt = xm + 75, tg = Math.atan2(surf(xt + 5) - surf(xt - 5), 10) * 180 / Math.PI;
    const oM = { x: xt, ancre: 'bout', pose: 'plat', vue: 'pouce', cote: 'gauche', echelle: 0.75, angle: tg, rotation: [-25, 0, 0],
      avantbras: { vers: [xm - 300, surf(xm) - 220], bord: { x0: 0, y0: 0, x1: z.l, y1: z.h }, longueur: 130 } };
    const m0 = F.mainSimple({ ...oM, y: surf(xt) });
    const dy = surf(m0.pouce[0]) - m0.pouce[1] - 0.8;                  // le pouce posé sur le grain
    o.push(F.mainSimple({ ...oM, y: surf(xt) + dy }).svg);
    // brasser : aller-retour à plat
    // (au-dessus de la main calquée, dont l'avant-bras remonte à gauche)
    const yb = surf(xm) - 70;
    o.push(h.geste(`M${pt([xm + 8, yb])} Q${pt([xm + 63, yb - 10])} ${pt([xm + 118, yb])}`, { double: true }));   // le geste (charte)
    return o.join('\n');
  };

  return {
    ref: '98-10',
    titre: 'La claie à grain près du poêle',
    desc: 'La pièce du poêle en coupe : la claie du grain de table pendue aux solives au-dessus du poêle, '
      + 'l’air chaud qui la traverse, et la moustiquaire de la semence pendue loin du poêle. La claie '
      + 'en perspective : deux perches, la moustiquaire tendue par-dessus et clouée sur la face '
      + 'extérieure, une latte clouée en travers à chaque bout, une bride de corde à chaque bout '
      + 'jusqu’à une vis à œil dans la solive, le grain étalé au milieu. En coupe : la perche, la '
      + 'moustiquaire clouée, le grain en couche mince et la main à plat qui le brasse.',
    format: 'pleine',
    disposition: [['piece'], ['claie', 'coupe']],
    hauteurs: [1, 1],
    largeurs: [[1], [11, 9]],
    vues: {
      piece: {
        titre: 'La pièce du poêle, en coupe',
        dessin: piece,
        renvois: z => {
          const { X, Y } = gP(z);
          return [
            { n: 1, rond: [X(1720), Y(1820)], cible: [X(1250), Y(1530)], texte: 'la claie du grain de table' },
            { n: 2, rond: [X(1560), Y(1080)], cible: [X(1000), Y(1110)], texte: 'l’air chaud traverse le grain' },
            { n: 3, rond: [X(3500), Y(1150)], cible: [X(3960), Y(1610)], texte: 'la semence, loin du poêle' },
          ];
        },
      },
      claie: {
        titre: 'La claie',
        dessin: claie,
        renvois: z => {
          const Zs = r, Zv = r + HB;
          return [
            { n: 4, rond: [P(L, W, 0)[0] + 8, P(L, W, 0)[1] + 40], cible: P(L - 50, W - r * 0.3, -r * 0.8), texte: 'deux perches, les longs côtés' },
            { n: 5, rond: [P(L, W + 45, Zs)[0] + 4, P(L, W + 45, Zs)[1] - 26], cible: P(LA[1] + 20, W - 40, Zs + LAE), texte: 'une latte clouée à chaque bout' },
            { n: 6, rond: [P(610, 0, 0)[0], P(610, 0, 0)[1] + 34], cible: P(625, r * Math.cos(3.2), r * Math.sin(3.2)), texte: 'la moustiquaire tendue, clouée' },
            { n: 7, rond: [P(BR[1], W / 2, Zv)[0] + 40, P(BR[1], W / 2, Zv)[1] - 4], cible: P(BR[1], W * 0.36, Zs + (Zv - Zs) * 0.72), texte: 'une bride, pendue à la solive' },
          ];
        },
      },
      coupe: {
        titre: 'En coupe, en travers de la claie',
        dessin: coupe,
        renvois: z => {
          const { surf, xFin, xm, cx, cy, sortie } = gC(z);
          return [
            { n: 8, rond: [sortie[0] + 20, cy + 62], cible: [sortie[0] + 14, surf(sortie[0] + 14) + 5], texte: 'le grain, en couche mince' },
            { n: 9, rond: [xm + 70, surf(xm) - 92], cible: [xm + 30, surf(xm) - 18], texte: 'la main brasse, sent la chaleur' },
          ];
        },
      },
    },
  };
};
