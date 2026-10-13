// Modèle : main droite à plat qui appuie sur une planche — de profil (côté pouce) et vue du dos.
// Pas une planche du livre. Reprise de appuiProfil2 / appuiDos2 (formes.js), défaut par défaut.
// dessiner(x, y, echelle, vue) rend le SVG ; à porter dans formes.js.
//
// Repère en mm d'une main d'adulte (190 du pli du poignet au bout du majeur), y vers le bas.
// Main DROITE : vue du côté du pouce, les doigts vont vers la GAUCHE (une main droite vue de
// son côté pouce a les doigts à gauche ; formes.js la dessinait doigts à droite, en main gauche).
//   profil : origine au pli du poignet, sur le dessus de la planche (y = 0).
//   dos    : origine au milieu du pli du poignet ; vue d'en haut, la même main : doigts à gauche,
//            pouce en bas (côté de l'observateur du profil). Les x des deux vues se correspondent.
//
// Ce qui change par rapport à formes.js :
//   - le pouce part du BAS de la paume, près du poignet (base à x ≈ -12), en biais de 33° ;
//     formes.js le faisait partir du milieu du bord et monter comme un pouce levé ;
//   - doigts : longueurs dorsales depuis la jointure (index 84, majeur 94, annulaire 88,
//     auriculaire 68) et la jointure de l'auriculaire reculée ; plus de « tubes » : la phalange se
//     creuse entre deux jointures, le bout s'élargit à peine (pulpe), ongle court ;
//   - de profil, le pouce est en avant, son dessous relevé de 4 à 5 mm, et l'éminence du pouce
//     descend jusqu'à la planche ; formes.js n'avait pas de pouce lisible.
//
// Passe « final » (13 octobre) : pouce de profil abaissé de 6 mm et bout ramené à x = -100 dans les
// deux vues ; majeur qui sort du contour de l'index (plus de trait doublé) ; plis en ∧ sur la
// planche retirés ; palmures en U rond (doigts un peu plus écartés, jeu 4 à 4,5 mm) ; pouce du dos
// aminci ; auriculaire 76 ; plis d'IPP élargis et aplatis ; bosse de MCP ajoutée.

function dessiner(x, y, s, vue = 'profil') {
  const N = '#000';
  const P = p => [x + p[0] * s, y + p[1] * s];
  const f = v => +v.toFixed(1);
  const trait = ep => `fill="none" stroke="${N}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;
  // Catmull-Rom centripète → courbes de Bézier (passe par chaque point, sans boucle)
  const courbe = (pts, ferme = false) => {
    const Q = pts.map(P), n = Q.length;
    const at = i => ferme ? Q[(i + n) % n] : Q[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f(Q[0][0])} ${f(Q[0][1])}`;
    const fin = ferme ? n : n - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
      const dd = (a, b) => Math.max(1e-3, Math.pow(Math.hypot(b[0] - a[0], b[1] - a[1]), 0.5));
      const d1 = dd(p0, p1), d2 = dd(p1, p2), d3 = dd(p2, p3);
      const c1 = [0, 1].map(k => (d1 * d1 * p2[k] - d2 * d2 * p0[k] + (2 * d1 * d1 + 3 * d1 * d2 + d2 * d2) * p1[k]) / (3 * d1 * (d1 + d2)));
      const c2 = [0, 1].map(k => (d3 * d3 * p1[k] - d2 * d2 * p3[k] + (2 * d3 * d3 + 3 * d3 * d2 + d2 * d2) * p2[k]) / (3 * d3 * (d3 + d2)));
      const ok = (p0 === p1) ? [p1[0] + (p2[0] - p1[0]) / 3, p1[1] + (p2[1] - p1[1]) / 3] : c1;
      const ok2 = (p2 === p3) ? [p2[0] - (p2[0] - p1[0]) / 3, p2[1] - (p2[1] - p1[1]) / 3] : c2;
      d += ` C${f(ok[0])} ${f(ok[1])} ${f(ok2[0])} ${f(ok2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return ferme ? d + 'Z' : d;
  };
  const chemin = (pts, ep, ferme = false) => `<path d="${courbe(pts, ferme)}" ${trait(ep)}/>`;
  // plusieurs suites liées par un fond de U : la jointure est une cubique dont les poignées
  // prolongent la fin de la suite précédente et le début de la suivante (k mm) — pas de boucle
  const runs = (R, k = 3) => {
    let d = '';
    R.forEach((pts, i) => {
      const c = courbe(pts);
      if (i === 0) { d = c; return; }
      const A = R[i - 1], a = A[A.length - 1], a0 = A[A.length - 2], b = pts[0], b1 = pts[1];
      const ua = [a[0] - a0[0], a[1] - a0[1]], la = Math.hypot(...ua), ub = [b1[0] - b[0], b1[1] - b[1]], lb = Math.hypot(...ub);
      const kk = Array.isArray(k) ? k[i - 1] : k;
      const c1 = P([a[0] + ua[0] / la * kk, a[1] + ua[1] / la * kk]), c2 = P([b[0] - ub[0] / lb * kk, b[1] - ub[1] / lb * kk]), q = P(b);
      d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(q[0])} ${f(q[1])}` + c.replace(/^M[^C]*/, ' ');
    });
    return d;
  };
  const forme = (pts) => `<path d="${courbe(pts, true)}" fill="#fff" stroke="none"/>`;
  const EP = { sil: 1.5, int: 0.8, det: 0.6, fin: 0.5 };
  const out = [];

  // ── outils de doigt (vue du dos) ──
  const RAD = Math.PI / 180;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
  // un doigt : base (la jointure), angle (degrés, + vers le pouce = +y), largeurs [[s, demi]...],
  // longueur L ; renvoie des fonctions de position et les deux bords
  const doigt = (base, ang, L, W, r) => {
    const u = [-Math.cos(ang * RAD), Math.sin(ang * RAD)];
    const nh = [-u[1], u[0]];          // vers le haut de la feuille (côté auriculaire) quand u = (-1, 0) → (0, -1)
    const hw = sv => {
      for (let i = 0; i < W.length - 1; i++) if (sv <= W[i + 1][0]) { const t = (sv - W[i][0]) / (W[i + 1][0] - W[i][0]); return W[i][1] + (W[i + 1][1] - W[i][1]) * t; }
      return W[W.length - 1][1];
    };
    const ax = sv => add(base, mul(u, sv));
    const pt = (sv, t) => add(ax(sv), mul(nh, t));       // t > 0 : côté haut
    const bord = (cote, s0, s1, pas = 7) => { const o = []; const n = Math.max(1, Math.round((s1 - s0) / pas)); for (let i = 0; i <= n; i++) { const sv = s0 + (s1 - s0) * i / n; o.push(pt(sv, cote * hw(sv))); } return o; };
    const c = L - r;
    const bout = [];
    for (const th of [30, 55, 78, 90, 102, 125, 150]) { const k = th <= 90 ? 1 : 1; bout.push(add(ax(c), add(mul(nh, r * Math.cos(th * RAD)), mul(u, r * Math.sin(th * RAD) * (th > 40 && th < 140 ? 0.97 : 1))))); }
    return { u, nh, hw, ax, pt, bord, c, r, L };
  };
  // le contour d'un doigt : bord haut de s0 jusqu'au bout, le bout, bord bas jusqu'à s1
  const tourDoigt = (d, s0h, s0b) => {
    const haut = d.bord(1, s0h, d.c);
    const bas = d.bord(-1, s0b, d.c).reverse();
    const cap = [];
    for (const th of [35, 62, 90, 118, 145]) cap.push(add(d.ax(d.c), add(mul(d.nh, d.r * Math.cos(th * RAD)), mul(d.u, d.r * Math.sin(th * RAD)))));
    return [...haut, ...cap, ...bas];
  };

  if (vue === 'dos') {
    // ── les quatre doigts : jointure MCP, angle (+ vers le pouce), longueur dorsale, demi-largeurs ──
    // les largeurs ; les doigts se touchent à la palmure (s = 22) et s'ouvrent vers le bout
    const LW = {
      auri: [[0, 8.6], [20, 7.9], [31, 7.3], [36, 7.6], [47, 6.9], [57, 6.8], [64, 6.7], [76, 6.4]],
      annu: [[0, 9.6], [20, 8.9], [33, 8.3], [42, 8.6], [55, 7.8], [68, 7.5], [76, 7.4], [88, 7.1]],
      maj: [[0, 10.2], [20, 9.4], [36, 8.8], [45, 9.1], [59, 8.3], [73, 7.9], [81, 7.8], [94, 7.5]],
      ind: [[0, 10.2], [20, 9.5], [32, 8.7], [40, 9.0], [52, 8.2], [64, 7.8], [72, 7.7], [84, 7.3]],
    };
    const maj = doigt([-96, 6.4], 0, 94, LW.maj, 7.5);
    // place un doigt voisin : sa jointure à x donné, son axe tel que les bords se touchent (jeu j) à s = 22
    const voisin = (ref, xK, ang, L, Wd, r, cote, j = 2.5) => {
      const tmp = doigt([xK, 0], ang, L, Wd, r), s22 = 22;
      const pr = ref.pt(s22, 0), xs = pr[0];
      const st = (tmp.ax(0)[0] - xs) / -tmp.u[0];
      const yAx = tmp.ax(st)[1];
      const yWant = pr[1] - cote * (ref.hw(s22) + tmp.hw(st) + j);
      return doigt([xK, yWant - yAx], ang, L, Wd, r);
    };
    const ind = voisin(maj, -93, 6.5, 84, LW.ind, 7.3, -1, 4);
    const annu = voisin(maj, -92, -6, 88, LW.annu, 7.1, 1, 4);
    const auri = voisin(annu, -83, -12.5, 76, LW.auri, 6.4, 1, 4.5);
    // ── le pouce : base au bas de la paume, près du poignet, en biais ──
    const C = [-12, 24];
    const uM = [-Math.cos(34 * RAD), Math.sin(34 * RAD)], uP = [-Math.cos(29 * RAD), Math.sin(29 * RAD)], uD = [-Math.cos(24 * RAD), Math.sin(24 * RAD)];
    const RT = 8.4;
    const MCP = add(C, mul(uM, 44)), IP = add(MCP, mul(uP, 30)), LTC = (IP[0] + 100) / uD[0] * -1 - RT, TC = add(IP, mul(uD, LTC));
    const tch = [];
    const seg = (A, B, w0, w1, n) => { for (let i = 0; i < n; i++) { const t = i / n; tch.push({ p: add(A, mul([B[0] - A[0], B[1] - A[1]], t)), w: w0 + (w1 - w0) * t }); } };
    seg(C, MCP, 12.5, 10.5, 6); seg(MCP, IP, 10.5, 9.2, 4); seg(IP, TC, 9.2, 8.8, 2); tch.push({ p: TC, w: RT });
    const nrm = i => { const a = tch[Math.max(0, i - 1)].p, b = tch[Math.min(tch.length - 1, i + 1)].p; const L = Math.hypot(b[0] - a[0], b[1] - a[1]); const u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L]; return { u, nh: [-u[1], u[0]] }; };
    const tIn = tch.map((q, i) => add(q.p, mul(nrm(i).nh, q.w)));      // bord intérieur (vers l'index)
    const tOut = tch.map((q, i) => add(q.p, mul(nrm(i).nh, -q.w)));    // bord extérieur
    const { u: uT, nh: nT } = nrm(tch.length - 1);
    const capT = [35, 62, 90, 118, 145].map(a => add(TC, add(mul(nT, RT * Math.cos(a * RAD)), mul(uT, RT * Math.sin(a * RAD)))));

    // une palmure : un petit U entre deux doigts, son fond à x = xw ; les bords des doigts
    // commencent 3 mm plus loin, puis le U se ferme en arrondi
    const sAt = (d, xw) => (d.ax(0)[0] - xw) / -d.u[0];
    const U = (A, B, xw) => {
      const a = A.pt(sAt(A, xw - 1.5), -A.hw(sAt(A, xw - 1.5)) * 0.94), b = B.pt(sAt(B, xw - 1.5), B.hw(sAt(B, xw - 1.5)) * 0.94);
      const m = [(a[0] + b[0]) / 2 + 1.8, (a[1] + b[1]) / 2];
      return [a, m, b];
    };
    const W1 = -110, W2 = -122, W3 = -120;
    const bas = (d, s0, s1) => d.bord(-1, s0, s1).reverse(), haut = (d, s0, s1) => d.bord(1, s0, s1);
    const capD = d => [35, 62, 90, 118, 145].map(th => add(d.ax(d.c), add(mul(d.nh, d.r * Math.cos(th * RAD)), mul(d.u, d.r * Math.sin(th * RAD)))));
    const tourD = (d, s0h, s0b) => [...haut(d, s0h, d.c), ...capD(d), ...bas(d, s0b, d.c)];
    // une palmure ronde : les bords qui se font face vont jusqu'à x = xw - 3, et le fond est un
    // demi-cercle de la largeur de l'écart (4 à 5 mm)
    const E = 9;
    const Ur = (A, B, xw) => {
      const ev = [[-6, 0], [-3, 0]];
      const cA = ev.map(([dx, p]) => { const sv = sAt(A, xw + dx); return A.pt(sv, -(A.hw(sv) - p)); });
      const cB = ev.map(([dx, p]) => { const sv = sAt(B, xw + dx); return B.pt(sv, B.hw(sv) - p); }).reverse();
      const a = cA[cA.length - 1], b = cB[0];
      const ym = (a[1] + b[1]) / 2, ry = (b[1] - a[1]) / 2;
      return [...cA, [xw + ry * 0.7, ym - ry * 0.72], [xw + ry, ym], [xw + ry * 0.7, ym + ry * 0.72], ...cB];
    };
    const R = [[
      [82, -33.5], [50, -32], [24, -31.2], [8, -30.4], [-4, -31.8], [-22, -35.8], [-44, -38.8], [-62, -39.6], [-75, -39.4], [-87, -39.6],
        ...tourD(auri, 17, sAt(auri, W1 - E)), ...Ur(auri, annu, W1),
      ...tourD(annu, sAt(annu, W1 - E), sAt(annu, W2 - E)), ...Ur(annu, maj, W2),
      ...tourD(maj, sAt(maj, W2 - E), sAt(maj, W3 - E)), ...Ur(maj, ind, W3),
      ...tourD(ind, sAt(ind, W3 - E), 12), [-88, 36.8],
        // la palmure pouce-index : un U large, son fond au niveau de la MCP du pouce
        [-74, 38.2], [-67.6, 41.4], [-69.2, 46.6],
        ...tIn.slice(9, tIn.length - 1), ...capT, ...tOut.slice(2, tOut.length - 1).reverse(),
        [-11.2, 38.4], [-3.4, 33.6], [8, 31.4], [22, 30.8], [50, 31.6], [82, 33.5]],
    ];
    const sil = R.flat();
    out.push(`<path d="${runs(R, [4, 4, 4])}Z" fill="#fff" stroke="none"/>`);
    out.push(`<path d="${runs(R, [4, 4, 4])}" ${trait(EP.sil)}/>`);
    // un petit arc en travers d'un doigt : à s, de demi-largeur w, bombé de b vers le bout
    const arc = (d, sv, w, b) => chemin([-1, -0.5, 0, 0.5, 1].map(t => d.pt(sv + b * (1 - t * t), t * w)), EP.fin);
    // ongles : un U court, ouvert vers le bout, au bout de la dernière phalange
    for (const d of [auri, annu, maj, ind]) {
      const L = d.L, w = d.hw(L - 8) * 0.5, s1 = L - 3, s0 = L - 11.5;
      out.push(chemin([d.pt(s1, w * 0.95), d.pt(s0 + 3, w), d.pt(s0 + 0.4, w * 0.55), d.pt(s0, 0), d.pt(s0 + 0.4, -w * 0.55), d.pt(s0 + 3, -w), d.pt(s1, -w * 0.95)], EP.fin));
    }
    // jointures : deux plis courts sur l'IPP, un sur l'IPD, la bosse des MCP à peine marquée
    const J = new Map([[auri, [36, 57]], [annu, [42, 68]], [maj, [45, 73]], [ind, [40, 64]]]);
    for (const [d, [a, b]] of J) {
      out.push(arc(d, a - 2.2, d.hw(a) * 0.55, 0.5));
      out.push(arc(d, a + 1.2, d.hw(a) * 0.5, 0.4));
      out.push(arc(d, 3, d.hw(3) * 0.5, -1));
      out.push(arc(d, b - 0.6, d.hw(b) * 0.26, 0.8));
    }
    // pouce : ongle vu de trois quarts (décalé vers le bord extérieur), pli de l'IP, et le bord du
    // premier métacarpien qui recule sur le dos de la main depuis la palmure
    const tp = (sv, t) => add(add(TC, mul(uT, sv)), mul(nT, t));
    out.push(chemin([tp(5.2, -0.8), tp(-2.5, -1.2), tp(-6, -3.4), tp(-5.4, -6.8), tp(-1.5, -7.6), tp(4.6, -7)], EP.fin));
    const ipN = [-uP[1], uP[0]], ip = (sv, t) => add(add(IP, mul(uP, sv)), mul(ipN, t));
    out.push(chemin([-1, -0.5, 0, 0.5, 1].map(t => ip(-1.2 * (1 - t * t), t * 4.2)), EP.fin));
    out.push(chemin([[-66, 41.5], [-58, 38.8], [-52, 36.6]], EP.fin));
    return out.join('\n');
  }

  // ═══ profil, vu du côté du pouce ═══
  // le majeur, derrière : seul son bout dépasse celui de l'index
  const majeur = [[-162, -14.4], [-172, -13.4], [-180, -12.2], [-185.5, -10.4], [-189.4, -6.4], [-188.8, -2.6], [-184.5, 0], [-160, 0]];
  out.push(forme(majeur));
  out.push(chemin(majeur.slice(0, 7), EP.sil));
  // la main et l'index : du bout de l'index sur la planche, par le dos, jusqu'à la coupe de
  // l'avant-bras ; puis le talon, de la planche jusqu'au-dessous de l'avant-bras
  const dessus = [
    [-169, 0], [-174.6, -2.4], [-178, -6.4], [-177.2, -10.2], [-173.4, -12.6], [-165, -13.9], [-157, -15.3], [-149, -15.6],
    [-141, -16.4], [-134, -17.8], [-126, -18.5], [-115, -19.8], [-104, -22], [-96.5, -25.3], [-89, -27.8],
    [-72, -31.8], [-48, -37], [-24, -41.6], [-9, -44.6], [-1, -45.6], [6, -48.4], [30, -61.2], [80, -95],
  ];
  const talon = [[-16, 0], [-3, -1.2], [8, -5.2], [16, -11], [45, -27], [80, -45]];
  out.push(forme([...dessus, ...talon.slice().reverse()]));
  out.push(chemin(dessus, EP.sil));
  out.push(chemin(talon, EP.sil));
  // plis de l'index : deux sur le dessus de l'IPP, un à l'IPD ; en dessous, les plis de flexion
  out.push(chemin([[-131.6, -17.4], [-130.8, -15.6], [-131.2, -14]], EP.fin));
  out.push(chemin([[-135.4, -17.6], [-134.6, -15.8], [-135, -14.2]], EP.fin));
  out.push(chemin([[-156.4, -15], [-155.8, -13.6], [-156.2, -12.4]], EP.fin));
  // l'ongle de l'index, vu par la tranche
  out.push(chemin([[-164.4, -12.4], [-170, -11.6], [-175, -9.8]], EP.fin));
  // le pli du dos du poignet (poignet cassé vers le haut)
  out.push(chemin([[-1.5, -45], [-4.8, -41.4], [-6.4, -37.2]], EP.fin));
  // ── le pouce, devant : il part de la base de la paume, s'écarte un peu et son bout se relève ──
  // pouce abaissé de 6 mm (dégradé de x = -40 à -60) et bout reculé de 2,8 mm (à x = -100)
  const rampe = (v, a, b) => Math.max(0, Math.min(1, (v - a) / (b - a)));
  const bp = ([px, py]) => [px + 2.8 * rampe(px, -60, -102.8), py + 6 * (py < -25.5 ? rampe(px, -8, -60) : rampe(px, -40, -60))];
  // (le dessus de la base descend sur un dégradé plus long, de -8 à -60, sinon il fait une bosse)
  const pouce = [
    [-2, -27], [-14, -29.4], [-26, -30.2], [-38, -30.2], [-50, -29.4], [-60, -28.4], [-70, -27.6], [-78, -27.2], [-86, -26.6], [-92, -25.4],
    [-97.4, -23.2], [-101.4, -20], [-102.8, -16.6], [-100.4, -13.4], [-94, -12], [-85, -11.2], [-77, -9.8], [-67, -7.6], [-56, -7.6],
    [-46, -5.4], [-37, -2], [-28, 0],
  ].map(bp);
  // le dessous, après la descente, lissé : il s'approche de la planche sans onduler
  [[-85, -5.1], [-76, -4.2], [-66, -3.4], [-56, -2.9], [-46, -2.2], [-37, -1.1]].forEach(([qx, qy]) => { const i = pouce.findIndex(q => Math.abs(q[0] - qx) < 2.5 && q[1] > -12); if (i >= 0) pouce[i] = [pouce[i][0], qy]; });
  out.push(forme([...pouce, [-12, 0], [-8, -16]]));
  out.push(chemin(pouce, EP.sil));
  // l'ongle du pouce, de trois quarts ; le pli de l'IP (dessus et dessous) ; la base de l'éminence
  out.push(chemin([[-100.8, -21.4], [-96.4, -24], [-90.6, -24.8], [-89.2, -22.8], [-90.6, -20.2], [-95.6, -19.2], [-101.4, -18.4]].map(bp), EP.fin));
  out.push(chemin([[-78.4, -26.8], [-77.2, -24.6], [-77.6, -22.6]].map(bp), EP.fin));
  out.push(chemin([[-77.4, -9.6], [-76.6, -11.8]].map(bp), EP.fin));
  return out.join('\n');
}

module.exports = (h) => {
  const e = 2.08;
  return {
    ref: 'modele',
    titre: 'Main droite à plat qui appuie',
    desc: 'Modèle : la main droite posée à plat sur une planche, vue du dos et de profil côté pouce.',
    fichier: '_modeles-appui-final.svg',
    format: 'pleine',
    disposition: [['dos'], ['profil']],
    vues: {
      dos: { titre: 'Vue du dos', dessin: z => dessiner(z.l - 86 * e, z.h * 0.42, e, 'dos') },
      profil: {
        titre: 'De profil, côté pouce',
        dessin: z => {
          const yb = z.h * 0.8, x0 = z.l - 86 * e;
          return [h.rect(Math.max(0, x0 - 200 * e), yb, 284 * e, 16, h.a.hachure('bois', 'arete')), dessiner(x0, yb, e, 'profil'),
            h.ligne(Math.max(0, x0 - 200 * e), yb, x0 + 84 * e, yb, h.a.arete)].join('\n');
        },
      },
    },
  };
};
module.exports.dessiner = dessiner;
