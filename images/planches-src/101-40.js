// Planche 101-40 — le cône d'abattage fait d'une chaudière, et la saignée de la volaille
// (ch. 101 : tableau Matériel, étapes 28-29 de la section F, étape 20 de la variante d'urgence).
//
// Ce que le chapitre donne : une chaudière de 20 L, le fond découpé sur un cercle juste assez
// large pour la tête et le cou mais pas les épaules, vissée sur un poteau à hauteur de poitrine ;
// l'oiseau glissé dedans tête en bas ne bat plus des ailes ; couteau bien affûté ; le sang
// ramassé dans une bassine ; entonnoir de contreplaqué cloué en V ou tôle roulée au même usage.
// Aucune dimension en mm dans le chapitre : aucune cote. Les proportions (chaudière, poule,
// hauteur du poteau) sont celles d'objets courants, sans chiffre sur le dessin.
//
// La chaudière est montée l'ouverture en haut et le fond percé en bas : c'est le seul sens où
// l'oiseau entre tête première et où la tête sort sous le fond (la chaudière se rétrécit vers
// le fond, elle fait déjà cône). Le chapitre ne dit pas où couper sur le cou : la lame est
// posée en travers du haut du cou, sous la tête, sans autre précision anatomique.
// La main du couteau vient de h.formes.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const r1 = n => Math.round(n * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const bA = blanc(A.arete), bC = blanc(A.contour), bD = blanc(A.detail);

  // courbe lisse (Catmull-Rom) par des points
  const lisse = (pts, ferme = false) => {
    const n = pts.length;
    const P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${r1(pts[0][0])} ${r1(pts[0][1])}`;
    const fin = ferme ? n : n - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  const suite = pts => lisse(pts).replace(/^M\S+ \S+/, '');
  const goutte = (x, y, r) => h.path(
    `M${r1(x)} ${r1(y - r * 2.4)} C${r1(x + r * 0.4)} ${r1(y - r * 1.2)} ${r1(x + r)} ${r1(y - r * 0.6)} ${r1(x + r)} ${r1(y)} ` +
    `A${r1(r)} ${r1(r)} 0 0 1 ${r1(x - r)} ${r1(y)} C${r1(x - r)} ${r1(y - r * 0.6)} ${r1(x - r * 0.4)} ${r1(y - r * 1.2)} ${r1(x)} ${r1(y - r * 2.4)} Z`, A.plein);

  // ─── Le montage, en mm : origine au centre du trou, sous le fond ; y vers le bas ─────────
  const T = 5, HC = 360;                        // paroi, hauteur de la chaudière
  const xg = -135;                              // face extérieure de la paroi gauche (d'aplomb)
  const xd = y => 130 + 40 * (-y) / HC;         // face intérieure de la paroi droite (évasée)
  const px0 = -236, px1 = -146;                 // le poteau ; le jonc du rebord touche sa face
  const C = [-4.5, 105], U = [0.5, 0.866], V = [-0.866, 0.5];   // la tête : U vers le bec, V vers le crâne
  const Hd = (u, v) => [C[0] + u * U[0] + v * V[0], C[1] + u * U[1] + v * V[1]];
  const BEC = Hd(41, -2);

  // La poule, tête en bas dans la chaudière. P : mm → vue ; fin : les détails du gros plan.
  const oiseau = (P, fin) => {
    const Q = pts => pts.map(([x, y]) => P(x, y));
    const L = (pts, at, f = false) => h.chemin(Q(pts), at, f);
    const S = (pts, at, f = false) => h.path(lisse(Q(pts), f), at);
    const out = [];
    const feuille = (b, t, w, at) => {            // une plume : base, pointe, demi-largeur
      const dx = t[0] - b[0], dy = t[1] - b[1], l = Math.hypot(dx, dy), n = [-dy / l * w, dx / l * w];
      const m = [(b[0] + t[0]) / 2, (b[1] + t[1]) / 2];
      out.push(S([[b[0] + n[0] * 0.6, b[1] + n[1] * 0.6], [m[0] + n[0], m[1] + n[1]], t, [m[0] - n[0], m[1] - n[1]], [b[0] - n[0] * 0.6, b[1] - n[1] * 0.6]], at, true));
      out.push(L([b, [t[0] - dx * 0.12, t[1] - dy * 0.12]], A.fin));
    };
    const patte = (dx, dy, loin) => {
      const at = loin ? bD : bA;
      // la cuisse emplumée, le tarse nu et écaillé, les doigts
      out.push(S([[14 + dx, -300 + dy], [6 + dx, -342 + dy], [14 + dx, -374 + dy], [34 + dx, -384 + dy], [50 + dx, -368 + dy], [52 + dx, -330 + dy], [44 + dx, -300 + dy]], at, true));
      out.push(L([[25 + dx, -378 + dy], [22 + dx, -452 + dy], [36 + dx, -452 + dy], [40 + dx, -378 + dy]], at, true));
      if (!loin) for (let k = 0; k < 6; k++) out.push(L([[23 + dx + k * 0.3, -392 - k * 10 + dy], [38 + dx - k * 0.1, -390 - k * 10 + dy]], A.fin));
      out.push(S([[24 + dx, -450 + dy], [8 + dx, -466 + dy], [-2 + dx, -486 + dy], [4 + dx, -492 + dy], [14 + dx, -476 + dy], [27 + dx, -462 + dy]], at, true));
      out.push(S([[27 + dx, -455 + dy], [25 + dx, -480 + dy], [29 + dx, -500 + dy], [36 + dx, -499 + dy], [35 + dx, -476 + dy], [34 + dx, -455 + dy]], at, true));
      out.push(S([[33 + dx, -450 + dy], [50 + dx, -466 + dy], [64 + dx, -482 + dy], [69 + dx, -474 + dy], [55 + dx, -457 + dy], [37 + dx, -444 + dy]], at, true));
    };
    patte(-40, 8, true);
    // la queue, qui dépasse du bord
    feuille([-94, -290], [-118, -398], 11, bA);
    feuille([-86, -296], [-96, -410], 11, bA);
    feuille([-78, -300], [-72, -396], 10, bA);
    // le corps
    out.push(S([[-26, -14], [-46, -7], [-66, -8], [-86, -17], [-104, -40], [-117, -82], [-122, -140], [-120, -200], [-110, -254], [-94, -292],
      [-60, -316], [-30, -322], [0, -330], [30, -334], [70, -320], [100, -293], [122, -246], [134, -186], [132, -122], [118, -72], [95, -36],
      [70, -14], [48, -7], [26, -14]], bA, true));
    // l'aile repliée : l'épaule près du cou, les rémiges qui finissent en pointe vers la queue
    {
      const bord = [[-86, -58], [-98, -108], [-100, -168], [-92, -224], [-76, -268], [-58, -298]];
      const pointes = [];                         // le bout des rémiges, en festons
      const t0 = [-58, -298], t1 = [34, -200], nf = 5;
      for (let k = 0; k < nf; k++) {
        const a0 = k / nf, a1 = (k + 0.5) / nf;
        const q0 = [t0[0] + (t1[0] - t0[0]) * a0, t0[1] + (t1[1] - t0[1]) * a0];
        const q1 = [t0[0] + (t1[0] - t0[0]) * a1 + 9, t0[1] + (t1[1] - t0[1]) * a1 - 7];
        pointes.push(q0, q1);
      }
      const dessous = [[34, -200], [48, -150], [46, -100], [30, -64], [0, -50], [-46, -46]];
      out.push(S([...bord, ...pointes.slice(1), ...dessous], bA, true));
      for (let k = 1; k < nf; k++) {
        const a0 = k / nf, q = [t0[0] + (t1[0] - t0[0]) * a0, t0[1] + (t1[1] - t0[1]) * a0];
        out.push(S([[q[0] - 30 + k * 4, q[1] + 100 - k * 6], [q[0] - 6, q[1] + 40], q], A.fin));
      }
      const cv = [[-96, -150], [-66, -150], [-36, -148], [-6, -144], [24, -136], [46, -126]];
      for (let k = 0; k < cv.length - 1; k++) out.push(S([cv[k], [(cv[k][0] + cv[k + 1][0]) / 2 + 2, (cv[k][1] + cv[k + 1][1]) / 2 - 9], cv[k + 1]], A.detail));
    }
    patte(0, 0, false);
    // le cou, par le trou
    out.push(S([[-26, -14], [-22, 0], [-18, 40], [-14, 72], [-12, 100], [16, 100], [19, 70], [20, 40], [22, 0], [26, -14]], bA, true));
    if (fin) [[-15, 8, -11, 34], [16, 6, 13, 30], [-10, 30, -7, 52], [11, 28, 9, 50]].forEach(([x0, y0, x1, y1]) => out.push(S([[x0, y0], [(x0 + x1) / 2 + (x0 < 0 ? 2 : -2), (y0 + y1) / 2], [x1, y1]], A.fin)));
    // la tête, pendue : crête, barbillons, crâne, bec, œil
    const H = pts => Q(pts.map(([u, v]) => Hd(u, v)));
    out.push(h.path(lisse(H([[16, 8], [16, 15], [18, 25], [14, 29], [9, 23], [6, 32], [1, 35], [-3, 27], [-7, 34], [-12, 34], [-14, 26], [-19, 29], [-23, 24], [-21, 13], [-18, 6]])), bA));
    const crane = [];
    for (let k = 0; k < 40; k++) { const a = k / 40 * 2 * Math.PI; crane.push([22 * Math.cos(a), 17 * Math.sin(a)]); }
    out.push(h.path(lisse(H(crane), true), bA));
    out.push(h.path(lisse(H([[10, -7], [12, -16], [18, -24], [27, -26], [33, -21], [31, -14], [24, -10], [17, -8]])), bA));
    out.push(h.chemin(H([[14, 9], [27, 6], [41, -2], [34, -5], [15, -9]]), bA, true));
    out.push(h.chemin(H([[17, -2], [36, -3.5]]), A.detail));
    const oe = P(...Hd(4, 6)), e = Math.abs(P(1, 0)[0] - P(0, 0)[0]);
    out.push(h.cercle(oe[0], oe[1], Math.max(1.4, 3.6 * e), bD), h.cercle(oe[0], oe[1], Math.max(0.6, 1.5 * e), A.plein));
    if (fin) {
      out.push(h.path(lisse(H([[-6, -4], [-4, -10], [-10, -13], [-13, -7]]), true), A.fin));
      const na = P(...Hd(22, 4));
      out.push(h.cercle(na[0], na[1], 1.1 * e, A.plein));
    }
    return out.join('\n');
  };

  // La chaudière en coupe (aplats noirs) et ses deux vis dans le poteau.
  const chaudiere = (P, e) => {
    const L = (pts, at, f = true) => h.chemin(pts.map(([x, y]) => P(x, y)), at, f);
    const out = [];
    const t = Math.max(T, 2 / e);               // la paroi reste lisible quand l'échelle est petite
    out.push(L([[xg, -348], [xg + t, -348], [xg + t, 8], [xg, 8]], A.plein));
    out.push(L([[xg, -348], [xg - 11, -348], [xg - 11, -362], [xg + t, -362], [xg + t, -348]], A.plein));
    out.push(L([[xd(0) + T - t, 8], [xd(-362) + T - t, -362], [xd(-362) + T + 11, -362], [xd(-348) + T + 11, -348], [xd(-348) + T, -348], [xd(0) + T, 8]], A.plein));
    [-325, -305].forEach(y => {
      out.push(L([[xg, y - 4], [xg - 3, y - 2], [xg - 3, y + 2], [xg, y + 4]], A.plein));
      const xr = xd(y) + T;
      out.push(L([[xr, y - 4], [xr + 3, y - 2], [xr + 3, y + 2], [xr, y + 4]], A.plein));
    });
    // le fond, percé au centre
    out.push(L([[xg + t, -t], [-45, -t], [-45, 0], [xg + t, 0]], A.plein));
    out.push(L([[45, -t], [xd(0) + T - t, -t], [xd(0) + T - t, 0], [45, 0]], A.plein));
    // les vis : la tête contre la paroi, la tige à travers le jeu et dans le poteau
    const g = Math.max(1, 0.5 / e);              // grossit un peu les vis quand l'échelle est petite
    [-318, -44].forEach(y => {
      out.push(L([[xg + t + 4 * g, y - 6 * g], [xg + t, y - 6 * g], [xg + t, y + 6 * g], [xg + t + 4 * g, y + 6 * g]], A.plein));
      out.push(L([[xg + T, y - 2 * g], [px1 - 60, y - 2 * g], [px1 - 70, y], [px1 - 60, y + 2 * g], [xg + T, y + 2 * g]], A.plein));
    });
    return out.join('\n');
  };

  // ─── Vue 1 : le montage entier, en coupe ────────────────────────────────────────────────
  const SOL = 1040;                              // mm du dessous du fond jusqu'au sol : la chaudière à hauteur de poitrine
  const ensemble = z => {
    const HAUT = 510;
    const s = Math.min((z.h - 26) / (HAUT + SOL), (z.l - 70) / 420);
    const ox = z.l * 0.47, oy = 10 + HAUT * s;
    const P = (x, y) => [ox + x * s, oy + y * s];
    const out = [];
    const sol = P(0, SOL)[1];
    // le poteau planté, en coupe
    out.push(h.chemin([P(px0, -440), P(px1, -440), P(px1, SOL), P(px0, SOL)], A.hachure('bois', 'arete'), true));
    out.push(h.rect(4, sol, z.l - 8, z.h - sol - 2, A.hachure('terre', 'aucun')));
    out.push(h.chemin([P(px0, SOL), P(px0, SOL + 80)], A.cache), h.chemin([P(px1, SOL), P(px1, SOL + 80)], A.cache));
    out.push(h.ligne(4, sol, z.l - 4, sol, A.arete));
    // la bassine au sol, sous la tête, en coupe, le sang au fond
    const bx = 20, bl = 200, bb = 160, bh = 110, sang = 30;
    const PB = (x, y) => P(x, SOL - y);
    const xi = yy => bb - 5 + (bl - bb) * yy / bh;
    out.push(h.chemin([PB(bx - xi(5), 5), PB(bx + xi(5), 5), PB(bx + xi(sang), sang), PB(bx - xi(sang), sang)], A.plein, true));
    const paroi = sg => [[bb, 0], [bl, bh - 6], [bl + 14, bh - 6], [bl + 14, bh], [bl - 6, bh], [bb - 6, 6], [bb - 6, 0]].map(([x, y]) => PB(bx + sg * x, y));
    out.push(h.chemin(paroi(-1), A.plein, true), h.chemin(paroi(1), A.plein, true));
    out.push(h.chemin([PB(bx - bb, 0), PB(bx + bb, 0), PB(bx + bb, 6), PB(bx - bb, 6)], A.plein, true));
    // l'oiseau, puis la chaudière coupée par-dessus
    out.push(oiseau(P, false));
    out.push(chaudiere(P, s));
    // le sang, de la tête à la bassine
    const b = P(...BEC), yS = PB(0, sang)[1];
    out.push(h.ligne(b[0], b[1] + 3, b[0], yS - 2, A.cache));
    [0.22, 0.5, 0.78].forEach(t => out.push(goutte(b[0], b[1] + t * (yS - b[1]), 2.2)));
    // le cercle du gros plan
    const cz = P(30, 55);
    out.push(h.cercle(cz[0], cz[1], 175 * s, A.detail));
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 1, rond: [z.l - 16, P(0, -250)[1]], cible: P(xd(-250) + T, -250), texte: 'chaudière de 20 L, à la poitrine' },
        { n: 2, rond: [16, P(0, -318)[1] - 22], cible: P(px1 - 30, -318), texte: 'vissée au poteau par la paroi' },
        { n: 3, rond: [z.l - 16, P(0, -140)[1] + 8], cible: P(40, -140), texte: 'tête en bas, ailes bloquées' },
        { n: 4, rond: [z.l - 16, PB(0, 60)[1] - 34], cible: PB(bx + bl - 16, 70), texte: 'bassine : tout le sang' },
      ],
    };
  };

  // ─── Vue 2 : le gros plan de la saignée ─────────────────────────────────────────────────
  const saignee = z => {
    const R = Math.min(z.l, z.h) / 2 - 8;
    const cxv = z.l / 2, cyv = z.h / 2 - 2;
    const cmm = [30, 55], Rmm = 175;
    const s = R / Rmm;
    const P = (x, y) => [cxv + (x - cmm[0]) * s, cyv + (y - cmm[1]) * s];
    const out = [];
    out.push(oiseau(P, true));
    out.push(chaudiere(P, s));
    // le couteau dans la main : manche, mitre, lame en travers du cou sous la tête
    const ang = -95, ar = ang * Math.PI / 180;
    const ax = [Math.sin(ar), -Math.cos(ar)];
    const nx = [-ax[1], ax[0]];                  // vers le haut : le dos de la lame
    const Tm = [132, 64];
    const K = (d, e) => P(Tm[0] + d * ax[0] + e * nx[0], Tm[1] + d * ax[1] + e * nx[1]);
    const lame = h.path(`M${K(48, 9).map(r1).join(' ')}` + suite([K(48, 9), K(100, 9.5), K(140, 8.5), K(164, 1)]) +
      suite([K(164, 1), K(150, -6), K(125, -9), K(48, -9)]) + ' Z', bA);
    const fil = h.path(lisse([K(50, -4.5), K(124, -4.5), K(150, -2), K(162, 0.5)]), A.fin);
    const mitre = h.chemin([K(42, 12), K(49, 12), K(49, -12), K(42, -12)], A.plein, true);
    const manche = h.chemin([K(42, 11), K(-58, 11), K(-64, 7), K(-64, -7), K(-58, -11), K(42, -11)], A.hachure('bois', 'arete'), true);
    const mp = P(...Tm);
    const m = F.main({ x: mp[0], y: mp[1], pose: 'prise', vue: 'dos', angle: ang, diametre: 22 * s, echelle: s, bras: 110, objet: [manche, mitre, lame, fil].join('\n') });
    out.push(m);
    // le geste : tirer la lame d'un trait
    out.push(h.fleche(`M${r1(P(10, 38)[0])} ${r1(P(10, 38)[1])} L${r1(P(80, 38)[0])} ${r1(P(80, 38)[1])}`));
    // le sang : de la coupe, le long de la tête, puis goutte à goutte
    const b = P(...BEC);
    out.push(h.path(lisse([P(19, 78), P(24, 96), P(27, 118), P(BEC[0] + 1, BEC[1] - 4)]), A.cache));
    out.push(h.ligne(b[0], b[1] + 4, b[0], cyv + R, A.cache));
    [0.25, 0.62, 0.92].forEach(t => out.push(goutte(b[0], b[1] + 10 + t * (cyv + R - b[1] - 16), 3.4)));
    const id = 'loupe-101-40';
    return {
      svg: `<clipPath id="${id}"><circle cx="${r1(cxv)}" cy="${r1(cyv)}" r="${r1(R)}"/></clipPath>\n<g clip-path="url(#${id})">\n${out.join('\n')}\n</g>\n` +
        h.cercle(cxv, cyv, R, A.detail),
      renvois: [
        { n: 5, rond: [16, P(0, -40)[1] - 30], cible: P(-66, -7), texte: 'les épaules butent sur le fond' },
        { n: 6, rond: [z.l - 16, P(0, 150)[1] + 14], cible: K(110, -3), texte: 'couteau affûté, tiré d’un trait' },
      ],
    };
  };

  // ─── Vue 3 : le fond découpé ─────────────────────────────────────────────────────────────
  const fond = z => {
    const phi = 22 * Math.PI / 180, cf = Math.cos(phi), sf = Math.sin(phi);
    const s = Math.min((z.l - 64) / 330, (z.h - 20) / (525 * cf + 160 * sf));
    const cx = z.l / 2 - 8, by = z.h - 8 - 156 * sf * s;
    const E = (y, r) => ({ x: cx, y: by - y * cf * s, rx: r * s, ry: r * sf * s });
    const arc = (y, r) => { const e = E(y, r); return h.path(`M${r1(e.x - e.rx)} ${r1(e.y)} A${r1(e.rx)} ${r1(e.ry)} 0 0 0 ${r1(e.x + e.rx)} ${r1(e.y)}`, A.detail); };
    const ell = (y, r, at) => { const e = E(y, r); return h.ellipse(e.x, e.y, e.rx, e.ry, at); };
    const out = [];
    out.push(h.ligne(cx - 185 * s, by + 156 * sf * s + 1, cx + 185 * s, by + 156 * sf * s + 1, A.arete));
    // la chaudière renversée, posée sur son ouverture
    const e0 = E(12, 152), e1 = E(360, 130);
    out.push(h.path(`M${r1(e0.x - e0.rx)} ${r1(e0.y)} L${r1(e1.x - e1.rx)} ${r1(e1.y)} A${r1(e1.rx)} ${r1(e1.ry)} 0 0 0 ${r1(e1.x + e1.rx)} ${r1(e1.y)} ` +
      `L${r1(e0.x + e0.rx)} ${r1(e0.y)} A${r1(e0.rx)} ${r1(e0.ry)} 0 0 1 ${r1(e0.x - e0.rx)} ${r1(e0.y)} Z`, bC));
    {
      const a = E(0, 156), b = E(12, 156);
      out.push(h.path(`M${r1(a.x - a.rx)} ${r1(b.y)} L${r1(a.x - a.rx)} ${r1(a.y)} A${r1(a.rx)} ${r1(a.ry)} 0 0 0 ${r1(a.x + a.rx)} ${r1(a.y)} L${r1(a.x + a.rx)} ${r1(b.y)} ` +
        `A${r1(b.rx)} ${r1(b.ry)} 0 0 1 ${r1(a.x - a.rx)} ${r1(b.y)} Z`, bC));
    }
    out.push(arc(34, 152.5), arc(48, 152));
    // le fond : jonc, fond en retrait, trou
    out.push(ell(360, 130, bA), ell(360, 122, A.detail));
    out.push(ell(353, 45, A.plein));
    // le rond découpé, soulevé
    {
      const yb = 500, a = E(yb, 45), b = E(yb + 6, 45);
      out.push(h.path(`M${r1(a.x - a.rx)} ${r1(b.y)} L${r1(a.x - a.rx)} ${r1(a.y)} A${r1(a.rx)} ${r1(a.ry)} 0 0 0 ${r1(a.x + a.rx)} ${r1(a.y)} L${r1(a.x + a.rx)} ${r1(b.y)} Z`, bA));
      out.push(h.ellipse(b.x, b.y, b.rx, b.ry, bA));
      const f = E(372, 45), t = E(488, 45);
      out.push(h.fleche(`M${r1(f.x + 64 * s)} ${r1(f.y - 4)} L${r1(t.x + 64 * s)} ${r1(t.y)}`));
    }
    const tr = E(353, 45);
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 7, rond: [z.l - 14, tr.y + 30], cible: [tr.x + tr.rx * 0.6, tr.y + tr.ry * 0.7], texte: 'rond juste pour la tête et le cou' },
      ],
    };
  };

  // ─── Projection des deux variantes : de trois quarts, vu d'un peu au-dessus ─────────────
  const axono = (cx, by, s) => {
    const psi = 35 * Math.PI / 180, phi = 22 * Math.PI / 180;
    return (x, y, zz) => {
      const zp = -x * Math.sin(psi) + zz * Math.cos(psi);
      return [cx + (x * Math.cos(psi) + zz * Math.sin(psi)) * s, by - y * Math.cos(phi) * s + zp * Math.sin(phi) * s];
    };
  };
  const poteau = (p, y0, y1, x0, x1, z0, z1) => [
    h.chemin([p(x0, y0, z1), p(x1, y0, z1), p(x1, y1, z1), p(x0, y1, z1)], bA, true),
    h.chemin([p(x0, y0, z0), p(x0, y0, z1), p(x0, y1, z1), p(x0, y1, z0)], bA, true),
    h.chemin([p(x0, y1, z0), p(x1, y1, z0), p(x1, y1, z1), p(x0, y1, z1)], bA, true),
  ].join('\n');
  const echelleVariante = z => Math.min((z.l - 70) / 430, (z.h - 16) / 720);

  // ─── Vue 4 : l'entonnoir de contreplaqué cloué en V ─────────────────────────────────────
  const planches = z => {
    const s = echelleVariante(z);
    const p = axono(z.l * 0.47, z.h - 8 - 170 * s, s);
    const out = [];
    const zb = -60;                              // le dos, d'aplomb contre le poteau
    out.push(poteau(p, -170, 560, -45, 45, zb - 102, zb - 12));
    const H = { xl: -150, xr: 150, zf: 230 }, B = { xl: -45, xr: 45, zf: 40 };
    const pan = {
      dos: [p(H.xl, 360, zb), p(H.xr, 360, zb), p(B.xr, 0, zb), p(B.xl, 0, zb)],
      droite: [p(H.xr, 360, zb), p(H.xr, 360, H.zf), p(B.xr, 0, B.zf), p(B.xr, 0, zb)],
      devant: [p(H.xl, 360, H.zf), p(H.xr, 360, H.zf), p(B.xr, 0, B.zf), p(B.xl, 0, B.zf)],
      gauche: [p(H.xl, 360, zb), p(H.xl, 360, H.zf), p(B.xl, 0, B.zf), p(B.xl, 0, zb)],
    };
    ['dos', 'droite'].forEach(k => out.push(h.chemin(pan[k], bA, true)));
    // les clous du dos dans le poteau, vus par l'ouverture
    [310, 280].forEach(y => { const q = p(0, y, zb + 1); out.push(h.cercle(q[0], q[1], 1.7, A.plein)); });
    ['devant', 'gauche'].forEach(k => out.push(h.chemin(pan[k], bA, true)));
    // la tranche du contreplaqué, sur le haut
    const t = 14;
    out.push(h.chemin([p(H.xl + t, 360, zb), p(H.xl + t, 360, H.zf - t), p(H.xr, 360, H.zf - t)], A.detail));
    // fil du bois sur les deux faces vues de dehors
    [0.3, 0.55, 0.8].forEach(f => {
      const yy = 360 * f, lx = H.xl + (B.xl - H.xl) * (1 - f), rx = H.xr + (B.xr - H.xr) * (1 - f), lz = H.zf + (B.zf - H.zf) * (1 - f);
      out.push(h.chemin([p(lx + 14, yy, lz), p(rx - 10, yy, lz)], A.fin));
      out.push(h.chemin([p(lx, yy, zb + 14), p(lx, yy, lz - 14)], A.fin));
    });
    // les clous le long de l'arête : le devant cloué dans le chant du côté
    [0.25, 0.5, 0.75].forEach(f => {
      const yy = 360 * f, lx = H.xl + (B.xl - H.xl) * (1 - f), lz = H.zf + (B.zf - H.zf) * (1 - f);
      const q = p(lx + 6, yy, lz);
      out.push(h.cercle(q[0], q[1], 1.5, A.plein));
    });
    const c = p(40, 170, 135);
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 8, rond: [z.l - 14, c[1] - 6], cible: c, texte: 'contreplaqué cloué en V' },
      ],
    };
  };

  // ─── Vue 5 : le bout de tôle roulée ─────────────────────────────────────────────────────
  const tole = z => {
    const s = echelleVariante(z);
    const p = axono(z.l * 0.47, z.h - 8 - 170 * s, s);
    const out = [];
    const zb = -60;
    out.push(poteau(p, -170, 560, -45, 45, zb - 102, zb - 12));
    // le cône : cercle du haut (r 150), cercle du bas (r 45) ; le dos d'aplomb contre le poteau
    const cH = [0, 360, zb + 150], cB = [0, 0, zb + 45];
    const pt = (c, r, a) => p(c[0] + r * Math.cos(a), c[1], c[2] + r * Math.sin(a));
    const cercle = (c, r, n = 96) => Array.from({ length: n }, (_, k) => pt(c, r, k / n * 2 * Math.PI));
    const env = pts => {
      const t = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
      const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
      const lo = [], hi = [];
      for (const q of t) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
      for (const q of t.slice().reverse()) { while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], q) <= 0) hi.pop(); hi.push(q); }
      return lo.slice(0, -1).concat(hi.slice(0, -1));
    };
    const haut = cercle(cH, 150);
    out.push(h.chemin(env([...haut, ...cercle(cB, 45)]), bA, true));
    // le dedans, vu par l'ouverture : le recouvrement de la tôle au dos, et ses deux vis
    out.push(h.chemin(haut, bA, true));
    const aR = 283 * Math.PI / 180;              // le bord de la tôle qui recouvre, au dos
    const vis = [];
    [330, 290].forEach(y => {
      const f = 1 - y / 360, c = [0, y, cH[2] + (cB[2] - cH[2]) * f], r = 150 + (45 - 150) * f;
      vis.push(pt(c, r - 1, 270 * Math.PI / 180));
    });
    const r0 = pt(cH, 150, aR), r1b = pt([0, 270, cH[2] + (cB[2] - cH[2]) * 0.25], 150 - 105 * 0.25, aR);
    out.push(h.ligne(r0[0], r0[1], r1b[0], r1b[1], A.detail));
    vis.forEach(q => out.push(h.cercle(q[0], q[1], 1.7, A.plein)));
    // génératrices : l'éclat de la tôle, sur la face vue de dehors
    [95, 115, 135, 155, 175].forEach(deg => {
      const a = deg * Math.PI / 180, q0 = pt([0, 350, cH[2] + (cB[2] - cH[2]) * (10 / 360)], 150 - 105 * (10 / 360), a), q1 = pt([0, 12, cB[2] + (cH[2] - cB[2]) * (12 / 360)], 45 + 105 * (12 / 360), a);
      out.push(h.ligne(q0[0], q0[1], q1[0], q1[1], A.fin));
    });
    const c = pt([0, 180, (cH[2] + cB[2]) / 2], 97, 125 * Math.PI / 180);
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 9, rond: [z.l - 14, c[1] - 6], cible: c, texte: 'tôle roulée, vissée au poteau' },
      ],
    };
  };

  const vue = f => ({ dessin: z => f(z).svg, renvois: z => f(z).renvois });

  return {
    ref: '101-40',
    titre: 'Le cône d’abattage et la saignée de la volaille',
    desc: 'En coupe, une chaudière de 20 L vissée par sa paroi contre un poteau planté, à hauteur de poitrine, l’ouverture en haut et le fond percé en bas. '
      + 'Une poule y est glissée tête en bas : les ailes repliées contre le corps, les pattes et la queue qui dépassent du bord, '
      + 'le cou et la tête passés par le trou ; une bassine posée au sol sous la tête reçoit le sang. '
      + 'Dans le gros plan, les épaules appuyées sur le fond, une main tient le couteau, la lame en travers du haut du cou sous la tête, '
      + 'et le tire d’un trait ; le sang coule le long de la tête et tombe goutte à goutte. '
      + 'En bas, la chaudière renversée, le rond du fond découpé et soulevé, puis deux variantes au même usage : '
      + 'un entonnoir de contreplaqué cloué en V et un cône de tôle roulée, chacun fixé au poteau par le dos.',
    format: 'pleine',
    disposition: [['ensemble', 'saignee'], ['fond', 'planches', 'tole']],
    hauteurs: [2.7, 1],
    largeurs: [[2, 3], [1, 1, 1]],
    vues: {
      ensemble: { titre: 'Le montage, en coupe', ...vue(ensemble) },
      saignee: { titre: 'La saignée, en gros plan', ...vue(saignee) },
      fond: { titre: 'Le fond, découpé', ...vue(fond) },
      planches: { titre: 'En contreplaqué', ...vue(planches) },
      tole: { titre: 'En tôle roulée', ...vue(tole) },
    },
    danger: 'Danger — le sang répandu sur la neige appelle l’ours et le renard. Il se ramasse dans la bassine et s’élimine loin du bâtiment, comme les plumes et les viscères.',
  };
};
