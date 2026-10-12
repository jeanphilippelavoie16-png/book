// Planche 13-09 — le briquet à pierre, refaite avec les mains de la bibliothèque (h.formes).
//
// Le geste : la main de la pierre (boule / profil, en miroir) tient un caillou de grève cassé,
// le pouce dessus, les doigts dessous ; le nez de la pierre sort du « C » vers l'acier et finit
// en arête vive. L'amadou carbonisé est pincé entre le pouce et le dessus de la pierre, son bord
// au ras de l'arête. La main de l'acier (prise / dos) a les doigts passés dans l'acier cintré en
// U : le fond du U couvre le devant des doigts, les deux bras reviennent le long de l'index et de
// l'auriculaire, le pouce tient le bras du haut. La face extérieure du fond du U est la face qui
// frappe : elle descend en rasant l'arête (tireté).
// Au point de frappe : la même scène de près, l'acier descendu contre l'arête, les paillettes.
// L'acier : un bout de vieille lime gardé tel quel, ou cintré en U (même longueur dépliée).
// La pierre : le galet cassé (cortex roulé, cassure fraîche à arête vive) et l'essai du verre.
// Aucune cote : le chapitre ne donne aucune mesure à reporter (les « deux centimètres » sont la
// chute de la paillette, pas une mesure de fabrication).
// Se lit en regard de la 13-40 (le nid qu'on souffle ensuite).

module.exports = (h) => {
  const F = h.formes, A = h.a;
  const f = v => Math.round(v * 10) / 10;
  const gen = s => { let g = s; return () => (g = (g * 16807) % 2147483647) / 2147483647; };

  // Courbe lisse (Catmull-Rom) passant par chaque point ; suite = sans le M de départ.
  const lisse = (pts, ferme, suite = false) => {
    const n = pts.length;
    const p = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = suite ? '' : `M ${f(pts[0][0])} ${f(pts[0][1])}`;
    const segs = ferme ? n : n - 1;
    for (let i = 0; i < segs; i++) {
      const p0 = p(i - 1), p1 = p(i), p2 = p(i + 1), p3 = p(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const poly = pts => 'M ' + pts.map(pt).join(' L ');
  const dansPoly = pl => ([x, y]) => {
    let c = false;
    for (let i = 0, j = pl.length - 1; i < pl.length; j = i++) {
      const [xi, yi] = pl[i], [xj, yj] = pl[j];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  // Semis de points (surface roulée d'un caillou) dans une forme donnée par un test.
  const semis = (x0, y0, x1, y1, dedans, n, graine, T = p => p, ep = 1.4) => {
    const r = gen(graine);
    let d = '';
    for (let i = 0; i < n; i++) {
      const p = [x0 + r() * (x1 - x0), y0 + r() * (y1 - y0)];
      if (!dedans(p)) continue;
      const q = T(p);
      d += `M${f(q[0])} ${f(q[1])}h0.01`;
    }
    return `<path d="${d}" fill="none" stroke="#000" stroke-width="${ep}" stroke-linecap="round"/>`;
  };
  const arc = (cx, cy, r, a0, a1, n = 6) => {
    const out = [];
    for (let i = 0; i <= n; i++) {
      const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180;
      out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    }
    return out;
  };
  // Une fenêtre du repère de la scène (mm), ramenée à la vue.
  const fenetre = (z, x0, y0, x1, y1) => {
    const k = Math.min(z.l / (x1 - x0), z.h / (y1 - y0));
    const ox = (z.l - (x1 - x0) * k) / 2 - x0 * k, oy = (z.h - (y1 - y0) * k) / 2 - y0 * k;
    return { k, T: ([x, y]) => [ox + x * k, oy + y * k] };
  };
  const decoupe = (id, z, contenu) =>
    `<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu}\n</g>`;

  // ─── La scène, en mm, origine au centre de la prise de la pierre ────────────────────────
  // La main de la pierre : boule / profil en miroir, R = 26, doigts serrés. Son pouce couche sa
  // pulpe de (22, -20) à (-8, -30) puis à (-29, -26) ; l'index finit en (-38,5, -5) ; le majeur,
  // derrière, finit en (-33, -18), sous le nez de la pierre (la pierre le cache).
  const R = 26, SERRE = 1.3, BRAS_P = 40;
  const E = [-53, -21];                              // l'arête, vue par le bout
  const C2 = [-39, -10.6];                           // bas de la cassure, sous le bout de l'index
  // le dessus de la pierre : sous la pulpe du pouce, puis le nez qui descend un peu vers l'arête
  const dessus = [E, [-45, -22.3], [-38, -23.2], [-29, -24.4], [-20, -25.6], [-12, -26.5], [-6, -27.4], [3, -24.9], [12, -22.4], [15, -21.2]];
  // le flanc droit dans le creux de la paume, le dessous et le flanc gauche derrière l'index
  const reste = [[19.5, -17.6], [23.5, -11.8], [26, -3], [26.2, 6], [24, 15], [17, 24], [8, 29], [-2, 30], [-12, 30], [-20, 29.5],
    [-25, 27], [-31, 18], [-34.5, 8], [-35.5, 0], [-36.5, -6]];
  const contourPierre = [...dessus, ...reste, C2];
  // la cassure fraîche, vue en fuite : une mince facette le long de la face du dessous du nez
  const facette = [E, C2, [-37.8, -13.8], [-49.5, -21.6]];
  // l'amadou carbonisé : une bande noire sur le dessus, du dessous du pouce au ras de l'arête
  const yDessus = x => {
    for (let i = 0; i < dessus.length - 1; i++) {
      const [xa, ya] = dessus[i], [xb, yb] = dessus[i + 1];
      if (x >= xa && x <= xb) return ya + (yb - ya) * (x - xa) / (xb - xa);
    }
    return dessus[dessus.length - 1][1];
  };
  const amX0 = E[0] + 1.6, amX1 = -12, amEp = 1.6;
  const amadou = (() => {
    const bas = [], haut = [];
    for (let x = amX0; x <= amX1 + 0.01; x += 3) { bas.push([x, yDessus(x) + 0.3]); haut.push([x, yDessus(x) - amEp]); }
    return [...bas, ...haut.reverse(), [amX0 - 0.6, yDessus(amX0) - amEp * 0.4]];
  })();

  // La pierre et l'amadou, dans la vue (T : scène → vue).
  // l'arête E et le bas de la cassure C2 restent des angles vifs ; le reste est roulé
  const cheminPierre = T => `M ${pt(T(E))} L ${pt(T(contourPierre[1]))}` + lisse(contourPierre.slice(1, -1).map(T), false, true) + ` L ${pt(T(C2))} Z`;
  const pierreSVG = (T, k) => {
    const TT = pts => pts.map(T);
    const dP = cheminPierre(T);
    const out = [h.path(dP, A.blanc)];
    const dansCortex = p => dansPoly(contourPierre)(p) && !dansPoly(facette)(p);
    out.push(semis(-56, -32, 30, 32, dansCortex, Math.round(5500 * 0.055 * k * k), 29, T));
    out.push(h.path(poly(TT([facette[3], facette[2], C2])), A.detail));
    // les ondes de la cassure, bombées vers l'arête
    [[-47.5, -20.1, -45.6, -17.2], [-43.5, -18.3, -41.7, -14.9]].forEach(([xa, ya, xb, yb]) =>
      out.push(h.path(`M ${pt(T([xa, ya]))} Q ${pt(T([xa - 0.4, yb + 0.6]))} ${pt(T([xb, yb]))}`, A.fin)));
    out.push(h.path(dP, A.contour));
    out.push(h.chemin(TT(amadou), A.plein, true));
    return out.join('\n');
  };

  // Le majeur de la main de la pierre passe derrière la pierre : la pierre se repeint par-dessus
  // la main, sauf là où passe le grand tube de la bibliothèque (avant-bras, paume et index d'un
  // seul tenant), reconstruit ici avec les mêmes réglages que main({ pose: 'boule' }).
  const I = F._interne, RAD = Math.PI / 180;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]], mul = (a, s) => [a[0] * s, a[1] * s];
  const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const gau = u => [u[1], -u[0]], dot = (a, b) => a[0] * b[0] + a[1] * b[1], dirA = d => [Math.cos(d * RAD), Math.sin(d * RAD)];
  const versC = (P, Q, Cc) => { const d = uni(sub(Q, P)); let n = gau(d); if (dot(sub(Cc, P), n) < 0) n = mul(n, -1); return { dist: dot(sub(Cc, P), n), n }; };
  const tubeIndex = (() => {
    const C0 = [0, 0], ep = [19, 16.2, 14.2, 12.2], ph = [43, 25, 21];
    const uF = dirA(25), vn = gau(uF);
    let M = mul(dirA(112), R + 14), W = sub(M, mul(uF, 72));
    for (let i = 0; i < 3; i++) {
      const { dist, n } = versC(add(W, mul(vn, 20.5)), add(M, mul(vn, 13)), C0);
      const d = mul(n, dist - (R + 0.4)); M = add(M, d); W = add(W, d);
    }
    const Fb = sub(W, mul(uF, BRAS_P));
    const rh = [R + ep[0] * 0.56 + 0.3, R + ep[1] * 0.54 + 0.3, R + ep[2] * 0.54 + 0.3];
    const ptsI = I.enroule(M, uF, C0, rh, ph, -1, [60, 45, 30].map(a => a * SERRE));
    const dos = [[ep[0] * 0.44, ep[1] * 0.44], [ep[1] * 0.44, ep[2] * 0.44], [ep[2] * 0.44, ep[3] * 0.44]];
    const ventre = [[ep[0] * 0.56, ep[1] * 0.54], [ep[1] * 0.54, ep[2] * 0.54], [ep[2] * 0.54, ep[3] * 0.52]];
    return I.tube({ pts: [Fb, W, ...ptsI], sens: -1, dos: [[21, 18.5], [18.5, ep[0] * 0.44], ...dos], ventre: [[22, 20.5], [20.5, 13], ...ventre],
      coussin: [0, 0, 0.9, 0.8, 0.9], bout: 'doigt', ongle: 'cote', plis: true });
  })();
  const mainPierre = (T, k, objet) => {
    const S = T([0, 0]);
    return F.main({ x: S[0], y: S[1], pose: 'boule', vue: 'profil', cote: 'gauche', serre: SERRE, diametre: 2 * R * k, echelle: k, bras: BRAS_P, objet });
  };
  const trouIndex = (T, k) => { const S = T([0, 0]); return I.ser(tubeIndex.remp, I.repere({ x: S[0], y: S[1], echelle: k, miroir: true })); };

  // L'acier en U, dans le repère de sa prise (centre de la prise en 0 0, main droite vue du dos) :
  // le fond du U devant les doigts, face extérieure en x = 35,5 ; les bras le long de l'index et
  // de l'auriculaire ; épaisseur 5.
  const U = { xi: 30.5, xo: 35.5, yh: -44, yhi: -39, yb: 41, ybi: 36, xg: -8, ro: 7, ri: 2 };
  const profilU = () => [
    [U.xg, U.yh], ...arc(U.xo - U.ro, U.yh + U.ro, U.ro, 270, 360), ...arc(U.xo - U.ro, U.yb - U.ro, U.ro, 0, 90),
    [U.xg, U.yb], [U.xg, U.ybi], ...arc(U.xo - U.ro, U.yb - U.ro, U.ri, 90, 0), ...arc(U.xo - U.ro, U.yh + U.ro, U.ri, 0, -90), [U.xg, U.yhi],
  ];
  const TX = E[0] - U.xo;                           // la face qui frappe passe au ras de l'arête
  const TY_AVANT = E[1] - U.yb - 15, TY_FRAPPE = E[1] + 3;

  // Les paillettes, du point de contact : trois retombent sur l'amadou, les autres filent en bas.
  const C = [E[0] + 0.3, E[1] + 0.5];
  const surAmadou = x => [x, yDessus(x) - amEp - 1.1];
  const paillettes = [
    { q: [-50, -44], fin: surAmadou(-45.5) },
    { q: [-47, -45], fin: surAmadou(-42) },
    { q: [-53, -40], fin: surAmadou(-49) },
    { q: [-51.5, -8], fin: [-49, 2] },
    { q: [-52, -6], fin: [-51.5, 9] },
    { q: [-50.5, -10], fin: [-45.5, -4] },
  ];

  const scene = (T, k, frappe, id) => {
    const out = [];
    out.push(mainPierre(T, k, pierreSVG(T, k)));
    const cadre = poly([[-62, -50], [40, -50], [40, 40], [-62, 40]].map(T)) + ' Z';
    out.push(`<clipPath id="${id}"><path d="${cadre} ${trouIndex(T, k)}" clip-rule="evenodd" fill="none"/></clipPath>`);
    out.push(`<g clip-path="url(#${id})">
${pierreSVG(T, k)}
</g>`);
    // le bord du doigt et de la paume, là où il passe devant la pierre, garde son trait de silhouette
    out.push(`<clipPath id="${id}-p"><path d="${cheminPierre(T)}" fill="none"/></clipPath>`);
    out.push(`<g clip-path="url(#${id}-p)"><g clip-path="url(#${id})"><path d="${trouIndex(T, k)}" fill="none" stroke="#1A1A1A" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/></g></g>`);
    const ty = frappe ? TY_FRAPPE : TY_AVANT;
    const M = T([TX, ty]);
    const TU = p => T([TX + p[0], ty + p[1]]);
    out.push(F.main({ x: M[0], y: M[1], pose: 'prise', vue: 'dos', diametre: 14 * k, echelle: k, bras: 40,
      objet: h.chemin(profilU().map(TU), A.plein, true) }));
    if (!frappe) {
      // la course de la face qui frappe : elle descend au ras de l'arête et continue
      out.push(h.path(`M ${pt(TU([U.xo, U.yb - U.ro]))} L ${pt(T([E[0], 44]))}`, A.cache));
      out.push(h.fleche(`M ${pt(T([-68, -26]))} L ${pt(T([-68, 30]))}`, A.arete));
    } else {
      paillettes.forEach(({ q, fin }) => {
        out.push(h.path(`M ${pt(T(C))} Q ${pt(T(q))} ${pt(T(fin))}`, A.cache));
        const c = T(fin);
        out.push(h.cercle(c[0], c[1], 2.4, A.plein));
      });
    }
    return out.join('\n');
  };

  const FG = [-208, -130, 120, 50];                  // fenêtre du geste
  const FD = [-82, -48, -16, 6];                     // fenêtre du point de frappe

  // ─── L'acier (repère 200 × 280) ────────────────────────────────────────────────────────
  const U3 = { xr: 150, bras: 46, y0: 30, y1: 120, t: 6, R: 11, D: [18, -13] };
  const lime = { x0: 12, x1: 12 + (120 - 30) + 2 * 46 - 12, y0: 214, y1: 238 };
  const profilU3 = () => {
    const { xr, bras, y0, y1, t, R: r } = U3, xl = xr - bras;
    return [
      [xl, y0], ...arc(xr - r, y0 + r, r, 270, 360, 7), ...arc(xr - r, y1 - r, r, 0, 90, 7),
      [xl, y1], [xl, y1 - t], ...arc(xr - r, y1 - r, r - t, 90, 0, 5),
      ...arc(xr - r, y0 + r, r - t, 0, -90, 5), [xl, y0 + t],
    ];
  };

  // ─── La pierre (repère 200 × 300) ──────────────────────────────────────────────────────
  const gal = { cx: 92, cy: 78, rx: 76, ry: 42, fx: 146, fry: 38, frx: 17 };
  const verre = [[140, 180], [230, 164], [292, 190], [222, 216], [146, 206]];
  const contact = [226, 190];
  const eclat = [contact, [214, 170], [216, 146], [232, 130], [252, 132], [262, 148], [256, 170]];

  return {
    ref: '13-09',
    titre: 'Le briquet à pierre',
    desc: 'Le geste, vu de côté : à droite, la main de la pierre tient un caillou de grève cassé dans le creux du pouce et des doigts, le pouce couché dessus, l’index et le majeur repliés dessous ; le nez de la pierre sort vers la gauche et finit en arête vive. L’amadou carbonisé, une bande noire, est pincé entre le pouce et le dessus de la pierre et arrive au ras de l’arête. À gauche, la main de l’acier est fermée, les doigts passés dans l’acier cintré en U : le fond du U couvre le devant des doigts, les bras reviennent le long de l’index et de l’auriculaire, le pouce tient le bras du haut. La face extérieure du fond du U descend en rasant l’arête. De près, au point de frappe : l’acier contre l’arête, les paillettes qui partent, trois qui retombent sur l’amadou. En bas, l’acier : un bout de vieille lime gardé tel quel, ou cintré en U ; et la pierre : un galet dont la cassure fraîche fait une arête coupante, et l’essai qui la juge, l’arête qui raye un éclat de verre.',
    format: 'pleine',
    disposition: [['geste'], ['detail', 'acier', 'pierre']],
    hauteurs: [1, 1.08],
    largeurs: [[1], [1.12, 1, 1]],
    vues: {
      geste: {
        titre: 'Le geste',
        dessin: z => {
          const { T, k } = fenetre(z, ...FG);
          return decoupe('vue-geste', z, scene(T, k, false, 'nez-g'));
        },
        renvois: z => {
          const { T } = fenetre(z, ...FG);
          return [
            { n: 1, rond: T([-22, -112]), cible: T([TX + U.xo - 2.5, TY_AVANT - 10]), texte: 'acier en U, les doigts passés dedans' },
            { n: 2, rond: T([-118, 22]), cible: T([-68, 8]), texte: 'frapper vers le bas, en rasant l’arête' },
            { n: 3, rond: T([-26, -74]), cible: T([-49, -20.6]), texte: 'la pierre, l’arête tournée vers l’acier' },
          ];
        },
      },
      detail: {
        titre: 'Au point de frappe',
        dessin: z => {
          const { T, k } = fenetre(z, ...FD);
          return decoupe('vue-detail', z, scene(T, k, true, 'nez-d'));
        },
        renvois: z => {
          const { T } = fenetre(z, ...FD);
          return [
            { n: 4, rond: [z.l - 18, T([0, -38])[1]], cible: T([-33, yDessus(-33) - 0.8]), texte: 'amadou carbonisé, pincé sous le pouce' },
            { n: 5, rond: [z.l * 0.42, 16], cible: T(surAmadou(-45.5)), texte: 'la paillette brûle en tombant sur l’amadou' },
          ];
        },
      },
      acier: {
        titre: 'L’acier',
        dessin: z => {
          const { T } = fenetre(z, 0, 0, 200, 280);
          const TT = pts => pts.map(T);
          const out = [];

          // ── Le bout de lime, à plat, taillé des deux sens ──
          const { x0, x1, y0, y1 } = lime;
          const casse = [[x1, y0], [x1 + 5, y0 + 6], [x1 + 1, y0 + 11], [x1 + 6, y0 + 17], [x1 + 2, y1]];
          const contourL = [[x0 + 6, y0], ...casse, [x0 + 6, y1], [x0, y1 - 5], [x0, y0 + 5]];
          out.push(h.chemin(TT(contourL), A.blanc, true));
          let taille = '';
          const coupe = (ax, ay, bx, by) => {             // trait coupé au rectangle intérieur
            const xa = x0 + 3, xb = x1 - 1, ya = y0 + 2, yb = y1 - 2;
            let t0 = 0, t1 = 1; const dx = bx - ax, dy = by - ay;
            for (const [p, q] of [[-dx, ax - xa], [dx, xb - ax], [-dy, ay - ya], [dy, yb - ay]]) {
              if (p === 0) { if (q < 0) return; continue; }
              const r = q / p;
              if (p < 0) { if (r > t1) return; if (r > t0) t0 = r; } else { if (r < t0) return; if (r < t1) t1 = r; }
            }
            taille += `M ${pt(T([ax + dx * t0, ay + dy * t0]))} L ${pt(T([ax + dx * t1, ay + dy * t1]))} `;
          };
          for (let x = x0 - 20; x < x1 + 10; x += 4.2) coupe(x, y0, x + 12, y1);
          for (let x = x0 - 20; x < x1 + 20; x += 6) coupe(x + 10, y0, x - 2, y1);
          out.push(h.path(taille, A.fin));
          out.push(h.chemin(TT(contourL), A.contour, true));

          // ── Le U en relief : le fond à droite, la face qui frappe en dehors ──
          const P = profilU3(), D = U3.D, n = P.length;
          const aire = P.reduce((s, p, i) => { const q = P[(i + 1) % n]; return s + p[0] * q[1] - q[0] * p[1]; }, 0);
          const sens = aire > 0 ? 1 : -1;
          const faces = P.map((p, i) => {
            const q = P[(i + 1) % n], ex = q[0] - p[0], ey = q[1] - p[1];
            const no = sens > 0 ? [ey, -ex] : [-ey, ex];
            return { p, q, vis: no[0] * D[0] + no[1] * D[1] > 0.01, dir: [ex, ey] };
          });
          const Dp = p => [p[0] + D[0], p[1] + D[1]];
          out.push(h.chemin(TT(P.map(Dp)), A.blanc, true), h.chemin(TT(P.map(Dp)), A.arete, true));
          const xl = U3.xr - U3.bras;
          const interieur = i => {
            const m = [(faces[i].p[0] + faces[i].q[0]) / 2, (faces[i].p[1] + faces[i].q[1]) / 2];
            return m[0] < U3.xr - U3.t + 0.5 && m[1] > U3.y0 + U3.t - 0.5 && m[1] < U3.y1 - U3.t + 0.5 && m[0] > xl + 0.5;
          };
          const ordre = [...faces.keys()].sort((a, b) => (interieur(b) ? 1 : 0) - (interieur(a) ? 1 : 0));
          ordre.forEach(i => {
            const Fc = faces[i];
            if (!Fc.vis) return;
            out.push(h.chemin(TT([Fc.p, Fc.q, Dp(Fc.q), Dp(Fc.p)]), A.blanc, true));
            out.push(h.ligne(...T(Dp(Fc.p)), ...T(Dp(Fc.q)), A.arete));
            [[i, (i + 1) % n, Fc.q], [(i - 1 + n) % n, i, Fc.p]].forEach(([a, b, s]) => {
              const Aa = faces[a], B = faces[b];
              const cosang = (Aa.dir[0] * B.dir[0] + Aa.dir[1] * B.dir[1]) / (Math.hypot(...Aa.dir) * Math.hypot(...B.dir));
              if (Aa.vis !== B.vis || cosang < 0.5) out.push(h.ligne(...T(s), ...T(Dp(s)), A.arete));
            });
          });
          out.push(h.chemin(TT(P), A.plein, true));
          return out.join('\n');
        },
        renvois: z => {
          const { T } = fenetre(z, 0, 0, 200, 280);
          return [
            { n: 6, rond: T([22, 188]), cible: T([48, lime.y0 + 9]), texte: 'vieille lime, gardée telle quelle' },
            { n: 7, rond: T([40, 60]), cible: T([U3.xr - U3.bras + 14, U3.y0 + 3]), texte: 'ou cintrée en U à la forge' },
          ];
        },
      },
      pierre: {
        titre: 'La pierre',
        dessin: z => {
          const { T: T0 } = fenetre(z, 0, 0, 200, 300);
          const out = [];
          const { cx, cy, rx, ry, fx, fry, frx } = gal;

          // ── Le galet cassé : cortex roulé, fermé à droite par la cassure ──
          {
            const T = p => T0([p[0] + 2, p[1] + 6]);
            const TT = pts => pts.map(T);
            const haut = [fx - 4, cy - fry], bas = [fx - 4, cy + fry];
            const polyCortex = [haut, [cx + 20, cy - ry], [cx - 30, cy - ry + 4], [cx - rx + 4, cy - 12], [cx - rx + 6, cy + 16], [cx - 32, cy + ry], [cx + 22, cy + ry], bas];
            const cortex = lisse(TT(polyCortex), false);
            const ell = (a0, a1) => {
              const pts = [];
              for (let i = 0; i <= 24; i++) {
                const a = (a0 + (a1 - a0) * i / 24) * Math.PI / 180;
                const m = 1 + 0.07 * Math.sin(3 * a + 0.6) + 0.05 * Math.sin(5 * a + 2);   // cassure irrégulière
                pts.push([fx - 4 + Math.cos(a) * frx * m, cy + Math.sin(a) * fry * m]);
              }
              return pts;
            };
            out.push(h.path(cortex + ' ' + lisse(TT(ell(90, -90)), false, true) + ' Z', A.blanc));
            out.push(semis(cx - rx, cy - ry, fx, cy + ry, p => dansPoly(polyCortex)(p) && Math.hypot((p[0] - fx + 4) / frx, (p[1] - cy) / fry) > 1.15, 420, 41, T));
            out.push(h.path(cortex, A.contour));
            const bordCasse = lisse(TT(ell(90, -270).slice(0, -1)), true);
            out.push(h.path(bordCasse, A.blanc));
            [0.3, 0.52, 0.74].forEach(kk => {
              const pts = [];
              for (let i = 0; i <= 10; i++) {
                const a = (-160 + 140 * i / 10) * Math.PI / 180;
                pts.push([fx - 4 + Math.cos(a) * frx * kk * 1.5, cy + fry * 0.82 + Math.sin(a) * fry * kk * 1.5]);
              }
              const dans = pts.filter(([x, y]) => Math.hypot((x - fx + 4) / frx, (y - cy) / fry) < 0.93);
              if (dans.length > 1) out.push(h.path(lisse(TT(dans), false), A.fin));
            });
            out.push(h.path(bordCasse, A.contour));
          }

          // ── L'essai : l'arête raye le verre ──
          {
            const T = p => T0([p[0] - 112, p[1] + 66]);
            const TT = pts => pts.map(T);
            const ep = 4, Vb = verre.map(([x, y]) => [x, y + ep]);
            out.push(h.chemin(TT([verre[2], verre[3], verre[4], Vb[4], Vb[3], Vb[2]]), A.blanc, true));
            out.push(h.chemin(TT([verre[2], Vb[2], Vb[3], Vb[4], verre[4]]), A.arete, false));
            out.push(h.ligne(...T(verre[3]), ...T(Vb[3]), A.arete));
            out.push(h.chemin(TT(verre), A.blanc, true), h.chemin(TT(verre), A.arete, true));
            out.push(h.ligne(...T([160, 196]), ...T([174, 186]), A.fin), h.ligne(...T([166, 200]), ...T([176, 193]), A.fin));
            out.push(h.ligne(...T([262, 184]), ...T([272, 178]), A.fin));
            // la rayure, derrière l'arête qui avance
            out.push(h.path(`M ${pt(T([176, 192.5]))} L ${pt(T([188, 191.6]))} L ${pt(T([199, 192.2]))} L ${pt(T([212, 190.8]))} L ${pt(T(contact))}`, A.detail));
            // l'éclat : cortex en haut à gauche, cassure en bas à droite, arête sur le verre
            out.push(h.chemin(TT(eclat), A.blanc, true));
            const faceE = [contact, [256, 170], [262, 148], [240, 156]];
            out.push(semis(214, 130, 262, 172, p => dansPoly(eclat)(p) && !dansPoly(faceE)(p), 150, 7, T));
            out.push(h.chemin(TT([[232, 130], [240, 156], contact]), A.detail));
            out.push(h.chemin(TT([[240, 156], [262, 148]]), A.detail));
            out.push(h.path(`M ${pt(T([244, 170]))} Q ${pt(T([250, 164]))} ${pt(T([252, 172]))}`, A.fin));
            out.push(h.chemin(TT(eclat), A.contour, true));
            out.push(h.fleche(`M ${pt(T([266, 160]))} L ${pt(T([292, 160]))}`, A.arete));
          }
          return out.join('\n');
        },
        renvois: z => {
          const { T: T0 } = fenetre(z, 0, 0, 200, 300);
          const Tg = p => T0([p[0] + 2, p[1] + 6]), Tv = p => T0([p[0] - 112, p[1] + 66]);
          return [
            { n: 8, rond: T0([40, 150]), cible: Tg([62, 104]), texte: 'caillou de grève : silex, chert, quartz, jaspe' },
            { n: 9, rond: T0([178, 22]), cible: Tg([gal.fx + 2, gal.cy - 30]), texte: 'cassure fraîche : arête coupante' },
            { n: 10, rond: T0([40, 290]), cible: Tv([193, 191.9]), texte: 'raye le verre : assez dure' },
          ];
        },
      },
    },
  };
};
