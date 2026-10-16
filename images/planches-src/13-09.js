// Planche 13-09 — le briquet à pierre, refaite avec les mains simples (h.formes.mainSimple).
//
// Le geste (refait le 14 octobre avec mainSimple ; JP : la main de la pierre en « pince de homard », puis en
// marionnette dans le premier essai) : vu par celui qui frappe, les deux paumes vers lui. À gauche, la main
// gauche serre la pierre dans le poing, vue de la paume ; le bout de la pierre sort du côté du pouce, vers la
// droite, et finit en arête vive ; le pouce, refermé par-dessus, tient l'amadou couché sur la pierre jusqu'au ras
// de l'arête (chapitre 13 : « on pince l'amadou carbonisé entre le pouce et l'arête de la pierre »). À droite, la
// main droite en poing, vue de la paume, le pouce en haut : les doigts sont passés dans l'acier cintré en U, le
// fond du U devant les doigts repliés, les bras le long de l'index (sous le pouce) et de l'auriculaire. La face
// extérieure du fond est la face qui frappe : elle descend en rasant l'arête (tireté, flèche rouge du coup) ; le
// cercle rouge, l'amadou au ras de l'arête, là où elle passe.
// Au point de frappe : le devant du poing et la pierre, de plus près (1,4 fois le geste ; le poing coupé par le
// bord, l'acier au ras du fond) ; l'acier contre l'arête, les paillettes, dont trois retombent sur l'amadou.
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

  // ─── La scène, en mm, origine au point de prise de la main de la pierre ─────────────────────
  // La main de la pierre : la main gauche en poing sur la pierre (prise-manche, 30 mm), vue de la paume, les
  // doigts repliés dessus ; le bout de la pierre sort du poing du côté du pouce, vers la droite, et finit en
  // arête vive ; le pouce, refermé par-dessus à la sortie, tient l'amadou couché sur la pierre (chapitre 13 :
  // « on pince l'amadou carbonisé entre le pouce et l'arête de la pierre »). La pince entre le pouce et le côté
  // de l'index du premier essai faisait une marionnette (JP, 14 octobre) : le poing est la force de la
  // bibliothèque. L'avant-bras monte vers la gauche (le coude levé) ; la pierre sort à 10° au-dessus de
  // l'horizontale, assez loin devant les doigts pour que l'acier passe sans toucher les jointures.
  const PIERRE_MAIN = { pose: 'prise-manche', diametre: 30, vue: 'paume', cote: 'gauche', angle: 60 };
  const RAD = Math.PI / 180;
  const g0 = F.mainSimple({ ...PIERRE_MAIN, x: 0, y: 0, echelle: 1, avantbras: false });
  const aU = (g0.prise.angle + 180) * RAD;           // l'axe de la pierre, du poing vers son bout (le côté du pouce)
  const uS = [Math.cos(aU), Math.sin(aU)], nS = [-uS[1], uS[0]];
  const R_P = g0.prise.r;                            // le rayon de la prise (15 mm) : la pierre a ce rayon dans le poing
  // un point de la pierre : s le long de l'axe (0 : le point de prise), t en travers (négatif : le dessus)
  const S = (s, t) => [s * uS[0] + t * nS[0], s * uS[1] + t * nS[1]];
  // le contour : le bout arrière arrondi dans le poing, le dessus jusqu'à l'arête, la cassure fraîche (la face du
  // bout, vue en fuite), le dessous ; dans le poing et à la sortie, au rayon de la prise (les doigts devant la
  // pierre ne sont repeints que dans le cylindre du moteur)
  const ST = { arr: -16, sortie: 54, arete: 102, bas: 91 };
  const R_IN = R_P - 1.2;                           // dans le poing, un peu sous le rayon : le trait de la pierre est couvert
  const DESSUS = [[ST.sortie, -R_IN], [67, -R_IN], [78, -15.8], [90, -15.4], [ST.arete, -14]];
  const dessusP = DESSUS.map(([s, t]) => S(s, t));
  const E = dessusP[dessusP.length - 1];             // l'arête, vue par le bout
  const faceP = [[ST.arete, -14], [100.6, -6], [98.4, 3], [95, 10.5], [ST.bas, 15.4]].map(([s, t]) => S(s, t));
  const dessousP = [[ST.bas, 15.4], [72, 15.9], [ST.sortie, R_IN]].map(([s, t]) => S(s, t));
  const C2 = S(ST.bas, 15.4);
  // la face de la cassure : entre le contour du bout et une ligne en retrait (la face vue en biais)
  const faceIn = [[ST.arete, -14], [96, -4], [93, 6], [ST.bas, 15.4]].map(([s, t]) => S(s, t));
  const contourPierre = [...dessusP, ...faceP.slice(1), ...dessousP.slice(1)];
  const cheminPierre = T => {
    // dans le poing, le caillou reste un peu bosselé (sous le rayon de la prise), le bout arrière arrondi
    const dessous = [[ST.sortie, R_IN], [40, 13.1], [24, 13.6], [8, 13], [-4, 13.5], [ST.arr + 4, 10]].map(([s, t]) => S(s, t));
    const dessusArr = [[ST.arr + 4, -10], [-4, -13.3], [10, -13.8], [26, -13], [42, -13.7], [ST.sortie, -R_IN]].map(([s, t]) => S(s, t));
    return `M ${pt(T(dessusP[0]))}` + lisse(dessusP.map(T), false, true) + lisse(faceP.map(T), false, true) +
      lisse(dessousP.map(T), false, true) + lisse(dessous.map(T), false, true) + ` Q ${pt(T(S(ST.arr, 0)))} ${pt(T(dessusArr[0]))}` +
      lisse(dessusArr.map(T), false, true) + ' Z';
  };
  // le dessus de la pierre (pour poser l'amadou et les paillettes) : t au-dessus de s
  const tDessus = s => {
    const D = DESSUS;
    for (let i = 0; i < D.length - 1; i++) if (s >= D[i][0] && s <= D[i + 1][0]) return D[i][1] + (D[i + 1][1] - D[i][1]) * (s - D[i][0]) / (D[i + 1][0] - D[i][0]);
    return s < D[0][0] ? -R_IN : D[D.length - 1][1];
  };
  // l'amadou : un carré de tissu carbonisé couché sur le dessus, du ras de l'arête jusque sous le pouce (son bout
  // arrière effiloché passe sous le pouce)
  const amS0 = 44, amS1 = ST.arete - 0.6, amEp = 3;
  const amadou = (() => {
    const bas = [], haut = [];
    for (let s = amS1; s >= amS0 - 0.01; s -= 3) { bas.push(S(s, tDessus(s) + 0.3)); haut.push(S(s, tDessus(s) + 0.3 - amEp)); }
    const tb = tDessus(amS0) + 0.3, th = tb - amEp;
    const effiloche = [S(amS0 - 1.4, tb - 0.3), S(amS0 - 0.5, tb - 0.9), S(amS0 - 2.2, tb - 1.4), S(amS0 - 0.7, th + 1.1), S(amS0 - 1.8, th + 0.4)];
    return [...bas, ...effiloche, ...haut.reverse()];
  })();
  const amadouSVG = (T, k) => [
    h.path(poly(amadou.map(T)) + ' Z', `fill="none" stroke="#FFFFFF" stroke-width="${f(Math.max(1.6, 0.9 * k))}" stroke-linejoin="round"`),
    h.chemin(amadou.map(T), A.plein, true),
  ].join('\n');
  // la pierre, dans la vue : le cortex roulé (un semis) sur le bout qui sort du poing, la cassure à l'ombre
  const pierreSVG = (T, k) => {
    const out = [];
    const dP = cheminPierre(T);
    out.push(h.path(dP, A.blanc));
    const local = p => { const q = [p[0], p[1]]; return [q[0] * uS[0] + q[1] * uS[1], q[0] * nS[0] + q[1] * nS[1]]; };
    const dansFace = dansPoly([...faceP, ...faceIn.slice(1, -1).reverse()]);
    const dansBout = p => { const [s] = local(p); return s > ST.sortie - 2 && dansPoly(contourPierre)(p) && !dansFace(p); };
    out.push(semis(30, -40, 92, 10, dansBout, Math.round(5200 * 0.02 * k * k), 29, T));
    // la cassure fraîche, face du bout tournée vers la droite et le bas : à l'ombre (lumière d'en haut à gauche)
    out.push(h.path(`M ${pt(T(faceP[0]))}` + lisse(faceP.map(T), false, true) + lisse([...faceIn].reverse().map(T), false, true) + ' Z', A.ombre));
    out.push(h.path(lisse(faceIn.map(T), false), A.detail));
    // les ondes de la cassure, bombées vers l'arête
    [[0.35, 0.5], [0.62, 0.45]].forEach(([a, b]) => {
      const p = S(ST.arete - 3 - 6 * a, -8 + 20 * a), q = S(ST.arete - 5 - 6 * a, -4 + 20 * a);
      out.push(h.path(`M ${pt(T(p))} Q ${pt(T(S(ST.arete - 1.5 - 6 * a, -6 + 20 * a)))} ${pt(T(q))}`, A.fin));
    });
    out.push(h.path(dP, A.contour));
    return out.join('\n');
  };

  // La main de l'acier : la main droite en poing, vue de la paume, les doigts vers la gauche, le pouce en haut :
  // les doigts repliés se lisent, passés dans le U. U : l'acier dans le repère de cette main (l'origine au poignet,
  // en mm, les doigts vers −x) : le fond devant les doigts repliés, face extérieure en x = xo ; les bras le long de
  // l'index (en haut, sous le pouce) et de l'auriculaire (en bas), jusqu'en xg ; épaisseur 5,5. Relevé sur la
  // silhouette du poing : le devant des doigts à x −83 à −93 de y −45 à +20, l'auriculaire recule à −72 ; le
  // dessus sous le pouce à −54, le dessous de l'auriculaire à +42.
  const ACIER_MAIN = { pose: 'poing', vue: 'paume', cote: 'droite', angle: 180, ancre: 'poignet' };
  const U = { xi: -94, xo: -99.5, yh: -55.5, yhi: -50, yb: 48.5, ybi: 43, xg: -45, ro: 8, ri: 2.5 };
  const profilU = () => [
    [U.xg, U.yh], ...arc(U.xo + U.ro, U.yh + U.ro, U.ro, 270, 180), ...arc(U.xo + U.ro, U.yb - U.ro, U.ro, 180, 90),
    [U.xg, U.yb], [U.xg, U.ybi], ...arc(U.xo + U.ro, U.yb - U.ro, U.ri, 90, 180), ...arc(U.xo + U.ro, U.yh + U.ro, U.ri, 180, 270), [U.xg, U.yhi],
  ];
  const TX = E[0] - U.xo;                           // le poignet : la face qui frappe passe au ras de l'arête
  const TY_AVANT = E[1] - U.yb - 14, TY_FRAPPE = E[1] - U.yb + 4;

  // Les paillettes, du point de contact : trois retombent sur l'amadou (de 5 à 17 mm de l'arête : le chapitre
  // dit qu'elles tombent à deux centimètres), les autres filent en bas.
  const C = [E[0] - 0.3, E[1] + 0.5];
  const surAmadou = s => S(s, tDessus(s) - amEp - 1.1);
  const paillettes = [
    { q: [E[0] - 1, E[1] - 14], fin: surAmadou(ST.arete - 5) },
    { q: [E[0] - 5, E[1] - 22], fin: surAmadou(ST.arete - 11) },
    { q: [E[0] - 9, E[1] - 26], fin: surAmadou(ST.arete - 17) },
    { q: [E[0] + 0.5, E[1] + 14], fin: [E[0] + 1, E[1] + 33] },
    { q: [E[0] + 2, E[1] + 10], fin: [E[0] + 3.5, E[1] + 25] },
    { q: [E[0] + 3.5, E[1] + 7], fin: [E[0] + 6, E[1] + 17] },
  ];

  const scene = (T, k, z, frappe) => {
    const out = [];
    const bord = { x0: 0, y0: 0, x1: z.l, y1: z.h };
    // l'amadou d'abord (le pouce passe devant son bout arrière), puis le poing et la pierre (objet : le manche du
    // moteur, les doigts repliés passent devant elle)
    out.push(amadouSVG(T, k));
    const p0 = T([0, 0]);
    out.push(F.mainSimple({ ...PIERRE_MAIN, x: p0[0], y: p0[1], echelle: k, objet: () => pierreSVG(T, k), avantbras: { bord } }).svg);
    // l'acier, puis le poing : le bras du haut du U passe sous le pouce
    const ty = frappe ? TY_FRAPPE : TY_AVANT;
    const TU = p => T([TX + p[0], ty + p[1]]);
    out.push(h.chemin(profilU().map(TU), A.plein, true));
    const w = T([TX, ty]);
    out.push(F.mainSimple({ ...ACIER_MAIN, x: w[0], y: w[1], echelle: k, avantbras: { bord } }).svg);
    if (!frappe) {
      // la course de la face qui frappe : elle descend au ras de l'arête et continue
      out.push(h.path(`M ${pt(TU([U.xo, U.yb - U.ro]))} L ${pt(T([E[0], E[1] + 60]))}`, A.cache));
      out.push(h.geste(`M ${pt(T([E[0] + 16, E[1] - 12]))} L ${pt(T([E[0] + 16, E[1] + 46]))}`));
      // le point à contrôler : l'amadou au ras de l'arête, là où la face de l'acier va passer
      const cc = T([E[0] - 2, E[1] - 2.5]);
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

  const FG = [-80, -168, 290, 52];                   // fenêtre du geste
  const FD = [-25, -100, 104.2, 46];                 // fenêtre du point de frappe : le devant du poing, le pouce, la pierre ;
                                                     // l'acier coupé au ras du fond

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
    desc: 'Le geste, vu par celui qui frappe : à gauche, la main gauche serre dans le poing un caillou de grève cassé, vue de la paume, les doigts repliés dessus ; le bout de la pierre sort du poing du côté du pouce, vers la droite, et finit en arête vive ; le pouce, refermé par-dessus, tient l’amadou carbonisé, un carré plat de tissu noirci, couché sur la pierre jusqu’au ras de l’arête, cerclé de rouge. À droite, la main droite fermée en poing, vue de la paume, les doigts passés dans l’acier cintré en U, le fond du U devant les doigts repliés, sa face extérieure tournée vers la pierre ; un tireté montre qu’elle descend en rasant l’arête, une flèche rouge le sens du coup, vers le bas. De plus près, au point de frappe : le devant du poing et la pierre, l’acier descendu contre l’arête, les paillettes qui partent, trois qui retombent sur l’amadou. En bas, l’acier : un bout de vieille lime gardé tel quel, dessous le même cintré en U ; et la pierre : un galet dont la cassure fraîche fait une arête coupante, et l’essai qui la juge, l’arête qui raye un éclat de verre.',
    format: 'pleine',
    disposition: [['acier', 'lime', 'pierre'], ['geste', 'detail']],
    hauteurs: [0.62, 1.38],
    largeurs: [[0.8, 1, 1.15], [1.75, 1]],
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
            { n: 6, rond: T([E[0] - 34, E[1] - 44]), cible: T([E[0] - 9, E[1] - 7]), texte: 'l’amadou sous le pouce, au ras de l’arête' },
            { n: 7, rond: T([E[0] - 26, -150]), cible: T([TX + U.xo + 2.5, TY_AVANT - 10]), texte: 'les doigts passés dans le U' },
            { n: 8, rond: T([E[0] + 52, E[1] + 30]), cible: T([E[0] + 17, E[1] + 26]), texte: 'frapper vers le bas, en rasant l’arête' },
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
            { n: 9, rond: T([E[0] - 14, -80]), cible: T(surAmadou(ST.arete - 11)), texte: 'la paillette tombe sur l’amadou' },
          ];
        },
      },
      acier: {
        titre: 'L’acier, cintré en U',
        dessin: z => {
          const { T } = fenetre(z, 70, 105, 200, 250);
          const TT = pts => pts.map(T);
          const out = [];

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
          const { T } = fenetre(z, 70, 105, 200, 250);
          return [
            { n: 1, rond: T([84, 120]), cible: T([U3.xr - U3.bras + 14, U3.y0 + 3]), texte: 'acier au carbone, cintré en U' },
          ];
        },
      },
      lime: {
        titre: 'Sans forge : la lime',
        dessin: z => {
          const { T } = fenetre(z, -4, -10, 204, 104);
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

          // règle 10 : un filet sépare cette autre façon du U à sa gauche
          out.push(h.ligne(-11, -24, -11, z.h, A.fin));
          return out.join('\n');
        },
        renvois: z => {
          const { T } = fenetre(z, -4, -10, 204, 104);
          return [
            { n: 2, rond: T([40, 2]), cible: T([60, lime.y0 + 9]), texte: 'au lieu de 1 : une vieille lime' },
          ];
        },
      },
      pierre: {
        titre: 'La pierre',
        dessin: z => {
          const { T: T0 } = fenetre(z, 0, 0, 340, 150);
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
            const T = p => T0([p[0] + 46, p[1] - 108]);
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
          const { T: T0 } = fenetre(z, 0, 0, 340, 150);
          const Tg = p => T0([p[0] + 2, p[1] + 6]), Tv = p => T0([p[0] + 46, p[1] - 108]);
          return [
            { n: 3, rond: T0([30, 140]), cible: Tg([58, 108]), texte: 'silex, chert, quartz ou jaspe de grève' },
            { n: 4, rond: T0([150, 14]), cible: Tg([gal.fx - 2, gal.cy - 34]), texte: 'cassure fraîche : arête coupante' },
            { n: 5, rond: T0([322, 22]), cible: Tv([279, 158]), texte: 'elle doit rayer le verre' },
          ];
        },
      },
    },
  };
};
