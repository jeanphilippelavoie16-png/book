// Planche 13-09 — le briquet à pierre, refaite avec les mains simples (h.formes.mainSimple).
//
// Le geste (refait le 14 octobre avec mainSimple ; JP : la main de la pierre en « pince de homard », le poing
// de l'acier en « gant de boxe ») : à droite, la main gauche, vue du dos, le pouce en haut, pince la pierre
// entre la pulpe du pouce et le côté de l'index replié (la prise d'une clé, pince-laterale ouverte au pouce),
// l'amadou couché dessus, sous la pulpe ; le nez de la pierre sort devant les doigts et finit en arête vive.
// À gauche, la main droite en poing, vue de la paume (les doigts repliés se lisent ; vu du dos, un poing a l'air
// d'une moufle), le pouce en bas : les doigts sont passés dans l'acier cintré en U, le fond du U devant les
// doigts repliés, les bras le long de l'auriculaire et de l'index (sous le pouce). La face extérieure du fond
// est la face qui frappe : elle descend en rasant l'arête (tireté, flèche rouge du coup) ; le cercle rouge,
// l'amadou au ras de l'arête, là où elle passe.
// Au point de frappe : la main de la pierre entière, de plus près (1,5 fois le geste), l'acier descendu
// contre l'arête, coupé au ras du fond ; les paillettes, dont trois retombent sur l'amadou.
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

  // ─── La scène, en mm, origine au centre de la pierre ───────────────────────────────────
  // La pierre, couchée entre le pouce (dessus) et le côté de l'index (dessous) ; le nez sort devant l'index
  // et finit en arête vive. Elle a l'épaisseur que la pince du pouce et de l'index peut prendre (~22 mm).
  const E = [-30, -19];                              // l'arête, vue par le bout
  const C2 = [-25, -12];                             // bas de la cassure
  const dessus = [E, [-22, -21.6], [-12, -22.9], [-2, -23.2], [8, -22.6], [16, -20.4], [21, -16.8]];
  const reste = [[23, -11.2], [21, -5.6], [15, -2], [5, -0.6], [-6, -0.8], [-15, -2.4], [-21, -6], [-24, -9.6]];
  const contourPierre = [...dessus, ...reste, C2];
  // la cassure fraîche, vue en fuite : une mince facette le long du dessous du nez
  const facette = [E, C2, [-23.7, -13.9], [-27.3, -19.7]];
  const yDessus = x => {
    for (let i = 0; i < dessus.length - 1; i++) {
      const [xa, ya] = dessus[i], [xb, yb] = dessus[i + 1];
      if (x >= xa && x <= xb) return ya + (yb - ya) * (x - xa) / (xb - xa);
    }
    return dessus[dessus.length - 1][1];
  };
  // l'amadou : un carré de tissu carbonisé, plat, posé sur le dessus, son bord avant au ras de
  // l'arête, son bord arrière effiloché sous la pulpe du pouce
  const amX0 = E[0] + 0.6, amX1 = 10, amEp = 3;
  const amadou = (() => {
    const bas = [], haut = [];
    for (let x = amX0; x <= amX1 + 0.01; x += 2.5) { bas.push([x, yDessus(x) - 0.2]); haut.push([x, yDessus(x) - 0.2 - amEp]); }
    const yb = yDessus(amX1) - 0.2, yh = yb - amEp;
    const effiloche = [[amX1 + 1.4, yb - 0.3], [amX1 + 0.5, yb - 0.9], [amX1 + 2.2, yb - 1.4], [amX1 + 0.7, yh + 1.1], [amX1 + 1.8, yh + 0.4]];
    return [...bas, ...effiloche, ...haut.reverse()];
  })();

  // La pierre et l'amadou, dans la vue (T : scène → vue).
  // l'arête E et le bas de la cassure C2 restent des angles vifs ; le reste est roulé
  const cheminPierre = T => `M ${pt(T(E))} L ${pt(T(contourPierre[1]))}` + lisse(contourPierre.slice(1, -1).map(T), false, true) + ` L ${pt(T(C2))} Z`;
  const pierreSVG = (T, k) => {
    const TT = pts => pts.map(T);
    const dP = cheminPierre(T);
    const out = [h.path(dP, A.blanc)];
    const dansCortex = p => dansPoly(contourPierre)(p) && !dansPoly(facette)(p);
    out.push(semis(-32, -26, 25, 1, dansCortex, Math.round(2400 * 0.055 * k * k * 0.8), 29, T));
    out.push(h.path(poly(TT([facette[3], facette[2], C2])), A.detail));
    // les ondes de la cassure, bombées vers l'arête
    [[-28.6, -16.8, -26.6, -17.4], [-27, -14.6, -25, -15.4]].forEach(([xa, ya, xb, yb]) =>
      out.push(h.path(`M ${pt(T([xa, ya]))} Q ${pt(T([xa + 0.6, yb + 0.4]))} ${pt(T([xb, yb]))}`, A.fin)));
    out.push(h.path(dP, A.contour));
    out.push(h.path(poly(TT(amadou)) + ' Z', `fill="none" stroke="#FFFFFF" stroke-width="${f(Math.max(1.6, 0.9 * k))}" stroke-linejoin="round"`));
    out.push(h.chemin(TT(amadou), A.plein, true));
    return out.join('\n');
  };

  // ─── Les mains (mainSimple, mains/moteur.js) ─────────────────────────────────────────────
  // La main de la pierre : la main gauche vue du dos, les doigts vers la gauche, le pouce en haut. La pince
  // latérale (la prise d'une clé) de 8 mm, le pouce écarté de 20° de plus (cmc −20) et plié au bout (ip 30)
  // pour prendre la pierre et l'amadou (~25 mm) : le point de prise de la pose tombe en P0, la pulpe du pouce
  // sur le bout arrière de l'amadou, l'index replié sous la pierre, le nez 20 mm devant les doigts (l'acier
  // passe sans toucher les jointures). La pierre se peint avant la main : vue du dos, ce qu'on pince est
  // derrière le pouce et l'index, et seul le nez dépasse devant. (Vue de la paume, le moteur grise le pouce de
  // cette pose : il passe derrière la paume.)
  const PIERRE_MAIN = { pose: 'pince-laterale', diametre: 8, doigts: { pouce: { cmc: -20, ip: 30 } }, vue: 'dos', cote: 'gauche', angle: 180 };
  const P0 = [12, -4.6];
  // La main de l'acier : la main droite en poing, vue de la paume, les doigts vers la droite, le pouce en bas :
  // les doigts repliés se lisent, passés dans le U (vu du dos, le poing a l'air d'une moufle). U : l'acier dans
  // le repère de cette main (l'origine au poignet, en mm) : le fond devant les doigts repliés, face extérieure
  // en x = xo ; les bras le long de l'auriculaire (en haut) et de l'index (en bas, sous le pouce), jusqu'en xg ;
  // épaisseur 5,5. Relevé sur la silhouette du poing : le devant des doigts à x 89 à 93 de y 0 à +20 (le majeur
  // et l'index), 80 à 85 au-dessus, l'auriculaire recule à 70 ; son bord à y −42, le pouce en bas jusqu'à +68.
  const ACIER_MAIN = { pose: 'poing', vue: 'paume', cote: 'droite', angle: 0, ancre: 'poignet' };
  const U = { xi: 94, xo: 99.5, yh: -48.5, yhi: -43, yb: 55.5, ybi: 50, xg: 45, ro: 8, ri: 2.5 };
  const profilU = () => [
    [U.xg, U.yh], ...arc(U.xo - U.ro, U.yh + U.ro, U.ro, 270, 360), ...arc(U.xo - U.ro, U.yb - U.ro, U.ro, 0, 90),
    [U.xg, U.yb], [U.xg, U.ybi], ...arc(U.xo - U.ro, U.yb - U.ro, U.ri, 90, 0), ...arc(U.xo - U.ro, U.yh + U.ro, U.ri, 0, -90), [U.xg, U.yhi],
  ];

  // Les paillettes, du point de contact : trois retombent sur l'amadou, les autres filent en bas.
  const C = [E[0] + 0.3, E[1] + 0.5];
  const surAmadou = x => [x, yDessus(x) - amEp - 1.1];
  // (elles retombent de 5 à 17 mm de l'arête : le chapitre dit qu'elles tombent à deux centimètres)
  const paillettes = [
    { q: [E[0] + 1, E[1] - 14], fin: surAmadou(-25) },
    { q: [E[0] + 5, E[1] - 22], fin: surAmadou(-19) },
    { q: [E[0] + 9, E[1] - 26], fin: surAmadou(-13) },
    { q: [E[0] + 0.5, E[1] + 14], fin: [E[0] + 1, E[1] + 33] },
    { q: [E[0] + 2, E[1] + 10], fin: [E[0] + 3.5, E[1] + 25] },
    { q: [E[0] + 3.5, E[1] + 7], fin: [E[0] + 5.5, E[1] + 17] },
  ];

  const TX = E[0] - U.xo;                           // le poignet : la face qui frappe passe au ras de l'arête
  const TY_AVANT = E[1] - U.yb - 14, TY_FRAPPE = E[1] - U.yb + 4;
  const scene = (T, k, z, frappe) => {
    const out = [];
    const bord = { x0: 0, y0: 0, x1: z.l, y1: z.h };
    // la pierre, puis la main qui la pince : le pouce et l'index passent devant elle
    out.push(pierreSVG(T, k));
    const p0 = T(P0);
    out.push(F.mainSimple({ ...PIERRE_MAIN, x: p0[0], y: p0[1], echelle: k, avantbras: { bord } }).svg);
    // l'acier, puis le poing : le bras du bas du U passe sous le pouce
    const ty = frappe ? TY_FRAPPE : TY_AVANT;
    const TU = p => T([TX + p[0], ty + p[1]]);
    out.push(h.chemin(profilU().map(TU), A.plein, true));
    const w = T([TX, ty]);
    out.push(F.mainSimple({ ...ACIER_MAIN, x: w[0], y: w[1], echelle: k, avantbras: { bord } }).svg);
    if (!frappe) {
      // la course de la face qui frappe : elle descend au ras de l'arête et continue
      out.push(h.path(`M ${pt(TU([U.xo, U.yb - U.ro]))} L ${pt(T([E[0], E[1] + 60]))}`, A.cache));
      out.push(h.geste(`M ${pt(T([E[0] - 16, E[1] - 12]))} L ${pt(T([E[0] - 16, E[1] + 46]))}`));
      // le point à contrôler : l'amadou au ras de l'arête, là où la face de l'acier va passer
      const cc = T([E[0] + 2, E[1] - 2.5]);
      out.push(h.controle(cc[0], cc[1], 8 * k));
    } else {
      paillettes.forEach(({ q, fin }) => {
        out.push(h.path(`M ${pt(T(C))} Q ${pt(T(q))} ${pt(T(fin))}`, A.cache));
        const c = T(fin);
        out.push(h.cercle(c[0], c[1], 2.4, A.plein));
      });
    }
    return out.join('\n');
  };

  const FG = [-228, -143, 202, 89];                 // fenêtre du geste
  const FD = [-34.5, -72, 102, 88];                  // fenêtre du point de frappe : la main de la pierre entière ; l'acier
                                                     // coupé au ras du fond (une tranche de doigts au bord ne se lit pas)

  // ─── L'acier (repère 200 × 280) ────────────────────────────────────────────────────────
  const U3 = { xr: 150, bras: 46, y0: 140, y1: 230, t: 6, R: 11, D: [18, -13] };
  const lime = { x0: 12, x1: 12 + (120 - 30) + 2 * 46 - 12, y0: 40, y1: 64 };
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
    desc: 'Le geste, vu de face : à droite, la main gauche, vue du dos, pince un caillou de grève cassé entre la pulpe du pouce et le côté de l’index replié ; le nez de la pierre sort devant les doigts, tourné vers la gauche, et finit en arête vive ; l’amadou carbonisé, un carré plat de tissu noirci, est couché sur la pierre sous le pouce et arrive au ras de l’arête, cerclé de rouge. À gauche, la main droite fermée en poing, vue de la paume, les doigts passés dans l’acier cintré en U, le fond du U devant les doigts repliés, sa face extérieure tournée vers la pierre ; un tireté montre qu’elle descend en rasant l’arête, une flèche rouge le sens du coup, vers le bas. De plus près, au point de frappe : la main de la pierre entière, l’acier descendu contre l’arête, les paillettes qui partent, trois qui retombent sur l’amadou. En bas, l’acier : un bout de vieille lime gardé tel quel, dessous le même cintré en U ; et la pierre : un galet dont la cassure fraîche fait une arête coupante, et l’essai qui la juge, l’arête qui raye un éclat de verre.',
    format: 'pleine',
    disposition: [['geste'], ['detail', 'acier', 'pierre']],
    hauteurs: [1.05, 1],
    largeurs: [[1], [1.6, 1, 1]],
    vues: {
      geste: {
        titre: 'Le geste',
        dessin: z => {
          const { T, k } = fenetre(z, ...FG);
          return decoupe('vue-geste', z, scene(T, k, z, false));
        },
        renvois: z => {
          const { T } = fenetre(z, ...FG);
          return [
            { n: 1, rond: T([-4, -118]), cible: T([TX + U.xo - 2.5, TY_AVANT - 10]), texte: 'acier en U, les doigts passés dedans' },
            { n: 2, rond: T([-104, 40]), cible: T([E[0] - 16, E[1] + 20]), texte: 'frapper vers le bas, en rasant l’arête' },
            { n: 3, rond: T([-52, 66]), cible: T([-26, -10]), texte: 'la pierre, l’arête tournée vers l’acier' },
          ];
        },
      },
      detail: {
        titre: 'Au point de frappe',
        dessin: z => {
          const { T, k } = fenetre(z, ...FD);
          return decoupe('vue-detail', z, scene(T, k, z, true));
        },
        renvois: z => {
          const { T } = fenetre(z, ...FD);
          return [
            { n: 4, rond: T([14, -58]), cible: T([-6, yDessus(-6) - 1.5]), texte: 'amadou carbonisé, au ras de l’arête' },
            { n: 5, rond: T([-14, -60]), cible: T(surAmadou(-19)), texte: 'la paillette brûle en tombant sur l’amadou' },
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
            return { p, q, vis: no[0] * D[0] + no[1] * D[1] > 0.01, dir: [ex, ey], no };
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
            // la charte : la lumière vient d'en haut à gauche ; la face extérieure du fond, tournée vers la
            // droite, est à l'ombre
            const ombre = !interieur(i) && Fc.no[0] > 0.5 * Math.hypot(...Fc.no);
            out.push(h.chemin(TT([Fc.p, Fc.q, Dp(Fc.q), Dp(Fc.p)]), ombre ? A.ombre : A.blanc, true));
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
            { n: 6, rond: T([22, 14]), cible: T([48, lime.y0 + 9]), texte: 'vieille lime, gardée telle quelle' },
            { n: 7, rond: T([40, 170]), cible: T([U3.xr - U3.bras + 14, U3.y0 + 3]), texte: 'ou cintrée en U à la forge' },
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
            // la charte : la cassure, face de droite du galet, est à l'ombre (la lumière vient d'en haut à gauche)
            out.push(h.path(bordCasse, A.ombre));
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
            out.push(h.chemin(TT(faceE), A.ombre, true));          // la cassure de l'éclat, à l'ombre
            out.push(semis(214, 130, 262, 172, p => dansPoly(eclat)(p) && !dansPoly(faceE)(p), 150, 7, T));
            out.push(h.chemin(TT([[232, 130], [240, 156], contact]), A.detail));
            out.push(h.chemin(TT([[240, 156], [262, 148]]), A.detail));
            out.push(h.path(`M ${pt(T([244, 170]))} Q ${pt(T([250, 164]))} ${pt(T([252, 172]))}`, A.fin));
            out.push(h.chemin(TT(eclat), A.contour, true));
            // le geste de l'essai : traîner l'arête sur le verre
            out.push(h.geste(`M ${pt(T([266, 160]))} L ${pt(T([292, 160]))}`));
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
