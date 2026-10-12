// Planche 29-10 — Les liens et les ciseaux stérilisés au four.
// Chapitre 29, section 5-D, étape 28 : à la maison, pendant que tout marche, au four de la
// cuisinière ; trois liens de ficelle de coton (deux, et un de réserve : tableau du nécessaire),
// des ciseaux s'il y en a, enveloppés dans quatre épaisseurs de tissu et ficelés ; 1 heure à
// 170 °C ou 2 heures et demie à 150 °C ; rien de plastique ni de caoutchouc au four ; le paquet
// refroidit, reste fermé et sec, et ne s'ouvre qu'au moment de s'en servir ; le tout dans une boîte
// de métal à couvercle, au sec. Section 9-B (« un morceau resté dedans ») : la bande de tissu
// solide nouée d'une ficelle est stérilisée d'avance dans le même paquet.
// Le chapitre ne donne aucune dimension (tissu, liens, paquet, boîte) : aucune cote.
// Les ciseaux sont tout en métal, à anneaux minces : c'est ce qui passe au four.
// Aucune main : les objets en place et la flèche du geste.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const poly = (pts, at, ferme = true) => h.chemin(pts, at, ferme);
  const f = v => (Math.round(v * 10) / 10).toString();
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const couture = A.fin + ' stroke-dasharray="2.6 2.2"';

  // bornes d'un nuage de points ; cadre : le dessin centré dans la vue, à l'échelle qui tient
  const bornes = P => [Math.min(...P.map(p => p[0])), Math.min(...P.map(p => p[1])), Math.max(...P.map(p => p[0])), Math.max(...P.map(p => p[1]))];
  const cadre = (z, b, mx = 14, my = 14) => {
    const s = Math.min((z.l - 2 * mx) / (b[2] - b[0]), (z.h - 2 * my) / (b[3] - b[1]));
    const ox = z.l / 2 - s * (b[0] + b[2]) / 2, oy = z.h / 2 - s * (b[1] + b[3]) / 2;
    return { s, T: p => [ox + s * p[0], oy + s * p[1]] };
  };
  // axonométrie : x vers la droite, y (profondeur) vient vers l'œil, z monte
  const axo = (AX, AY) => (x, y, z) => [AX[0] * x + AY[0] * y, AX[1] * x + AY[1] * y - z];

  // un pavé plein : dessus, face +x, face +y (les trois qu'on voit), silhouette au trait fort
  const pave = (P, x0, y0, z0, x1, y1, z1, silh = A.contour, ar = A.arete) => [
    poly([P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)], blanc(ar)),
    poly([P(x1, y0, z0), P(x1, y1, z0), P(x1, y1, z1), P(x1, y0, z1)], blanc(ar)),
    poly([P(x0, y1, z0), P(x1, y1, z0), P(x1, y1, z1), P(x0, y1, z1)], blanc(ar)),
    poly([P(x0, y0, z1), P(x1, y0, z1), P(x1, y0, z0), P(x1, y1, z0), P(x0, y1, z0), P(x0, y1, z1)], silh),
  ].join('\n');
  // un cercle posé dans un plan : 'xy' (à plat) ou 'xz' (debout, face à l'œil)
  const rond3 = (P, c, r, plan) => {
    const Q = [];
    for (let i = 0; i < 40; i++) {
      const a = i / 40 * 2 * Math.PI, u = r * Math.cos(a), v = r * Math.sin(a);
      Q.push(plan === 'xy' ? P(c[0] + u, c[1] + v, c[2]) : P(c[0] + u, c[1], c[2] + v));
    }
    return Q;
  };

  // ─── le paquet fermé et ficelé, dans n'importe quelle vue en axonométrie
  const paquet = (P, o) => {
    const { x0, y0, z0, W, D, H, ep } = o, z1 = z0 + H, x1 = x0 + W, y1 = y0 + D, xm = x0 + W / 2, ym = y0 + D / 2;
    const k = Math.min(W, D) * 0.03;          // l'arrondi de la ficelle au passage de l'arête
    const out = [pave(P, x0, y0, z0, x1, y1, z1, o.silh || A.contour)];
    if (o.boucle) {
      // le dernier coin rabattu, sa pointe vers le devant, avec l'ourlet du tissu de la vue 1
      const a = [x0 + W * 0.05, y0], b = [x0 + W * 0.61, y0 + D * 0.84], c = [x0 + W * 0.95, y0];
      out.push(poly([P(a[0], a[1], z1), P(b[0], b[1], z1), P(c[0], c[1], z1)], A.arete, false));
      out.push(poly([P(a[0] + 7, a[1], z1), P(b[0], b[1] - 7, z1), P(c[0] - 5, c[1], z1)], couture, false));
    }
    // la ficelle, dans les deux sens, qui passe les arêtes et descend sur les faces
    out.push(F.cordes([
      { pts: [P(x0, ym, z1), P(xm, ym, z1), P(x1 - k, ym, z1), P(x1, ym, z1 - k), P(x1, ym, z0)], ep, debut: 'ouvert', fin: 'ouvert' },
      { pts: [P(xm, y0, z1), P(xm, ym, z1), P(xm, y1 - k, z1), P(xm, y1, z1 - k), P(xm, y1, z0)], ep, debut: 'ouvert', fin: 'ouvert' },
    ]).toString());
    if (o.boucle) {
      // la boucle : deux ganses et deux bouts, à plat sur le dessus
      const g = (dx, dy) => P(xm + dx * o.boucle, ym + dy * o.boucle, z1 + 0.4);
      out.push(F.cordes([
        { pts: [g(0, 0), g(-9, -7), g(-17, -6), g(-19, 1), g(-11, 4), g(-2, 1)], ep, debut: 'ouvert', fin: 'ouvert' },
        { pts: [g(0, 0), g(9, 7), g(17, 6), g(19, -1), g(11, -4), g(2, -1)], ep, debut: 'ouvert', fin: 'ouvert' },
        { pts: [g(0, 0), g(-5, 9), g(-4, 17)], ep, debut: 'ouvert', fin: 'libre' },
        { pts: [g(0, 0), g(6, 8), g(12, 14)], ep, debut: 'ouvert', fin: 'libre' },
      ]).toString());
    }
    const r = o.boucle ? 2.6 * o.boucle : Math.min(W, D) * 0.07;
    out.push(poly(rond3(P, [xm, ym, z1 + 0.5], r, 'xy'), blanc(A.arete)));
    return out.join('\n');
  };

  // ─── Vue 1 : les pièces posées sur les quatre épaisseurs de tissu (vue de dessus)
  const R = 118, DEC = 4.5;
  const tissu = z => cadre(z, [-R - 6, -R - 6, R + 6, R + 3 * DEC + 6], 10, 8);
  const vueTissu = z => {
    const { T } = tissu(z);
    const out = [];
    const losange = (r, dy) => [[0, -r + dy], [r, dy], [0, r + dy], [-r, dy]].map(T);
    for (let k = 3; k >= 1; k--) out.push(poly(losange(R, k * DEC), blanc(A.detail)));
    out.push(poly(losange(R, 0), blanc(A.arete)));
    out.push(poly(losange(R - 7, 0), couture));                      // l'ourlet du tissu
    out.push(poly([[0, -R], [R, 0], [R, 3 * DEC], [0, R + 3 * DEC], [-R, 3 * DEC], [-R, 0]].map(T), A.contour));

    // les trois liens de ficelle de coton
    out.push(F.cordes([-47, -37, -27].map((y, i) => ({
      pts: [[-52, y + 1.5], [-24, y - 2], [4, y + 1.5 - i], [30, y - 1.5], [52, y + 1]].map(T),
      ep: 3.6, debut: 'libre', fin: 'libre',
    }))).toString());

    // les ciseaux tout en métal, fermés, les anneaux minces à gauche
    const C = ([x, y]) => T([x - 3, y + 4]);
    const lame = [[-6, -3.8], [0, -4.6], [14, -4.4], [32, -2.6], [46, 0], [32, 1.8], [14, 3.4], [0, 4.2], [-6, 3.6]];
    const branche = sg => {
      const a = [-4, 1.5 * sg], b = [-25.5, 9.5 * sg];
      const d = [b[0] - a[0], b[1] - a[1]], n = Math.hypot(d[0], d[1]), p = [-d[1] / n, d[0] / n];
      const w0 = 2.4, w1 = 1.6;
      return [[a[0] + p[0] * w0, a[1] + p[1] * w0], [b[0] + p[0] * w1, b[1] + p[1] * w1], [b[0] - p[0] * w1, b[1] - p[1] * w1], [a[0] - p[0] * w0, a[1] - p[1] * w0]];
    };
    [-1, 1].forEach(sg => {
      out.push(poly(branche(sg).map(C), blanc(A.arete)));
      const c = C([-32.5, 11 * sg]), [cx, cy] = c;
      const { s } = tissu(z);
      out.push(h.cercle(cx, cy, 8.6 * s, blanc(A.arete)), h.cercle(cx, cy, 5.8 * s, A.arete));
    });
    out.push(poly(lame.map(C), blanc(A.arete)));
    out.push(poly([[-2, 0.2], [44, 0]].map(C), A.detail, false));
    const piv = C([0, 0]);
    out.push(h.cercle(piv[0], piv[1], 2.4 * tissu(z).s, blanc(A.arete)), h.cercle(piv[0], piv[1], 0.7 * tissu(z).s, A.plein));

    // la bande de tissu solide, nouée d'une ficelle dont le bout reste long
    const B0 = [-48, 27], B1 = [28, 39];
    out.push(poly([[B0[0], B0[1]], [B1[0], B0[1]], [B1[0], B1[1]], [B0[0], B1[1]]].map(T), blanc(A.arete)));
    out.push(poly([[B0[0] + 2, B0[1] + 2.4], [B1[0] - 2, B0[1] + 2.4]].map(T), couture, false));
    out.push(poly([[B0[0] + 2, B1[1] - 2.4], [B1[0] - 2, B1[1] - 2.4]].map(T), couture, false));
    out.push(F.cordes([
      { pts: [[12, B0[1] - 1.5], [13, 33], [14, B1[1] + 1.5]].map(T), ep: 2.8, debut: 'ouvert', fin: 'ouvert' },
      { pts: [[15.5, 33], [26, 31], [38, 35.5], [50, 32], [58, 35]].map(T), ep: 2.8, debut: 'ouvert', fin: 'libre' },
    ]).toString());
    const nd = T([14, 33]);
    out.push(h.ellipse(nd[0], nd[1], 3.4 * tissu(z).s, 2.8 * tissu(z).s, blanc(A.arete)));

    // les quatre coins se rabattent par-dessus
    [[0, 1], [1, 0], [0, -1], [-1, 0]].forEach(([ux, uy]) => {
      const n = [-uy, ux];
      const a = [ux * R * 0.92, uy * R * 0.92], c = [ux * R * 0.77 + n[0] * 26, uy * R * 0.77 + n[1] * 26], b = [ux * R * 0.62, uy * R * 0.62];
      out.push(h.fleche(`M${pt(T(a))} Q${pt(T(c))} ${pt(T(b))}`));
    });
    return out.join('\n');
  };

  // ─── Vue 2 : plié et ficelé
  const P2 = axo([0.87, 0.30], [-0.62, 0.36]);
  const W2 = 150, D2 = 100, H2 = 26;
  const cadre2 = z => cadre(z, bornes([[0, 0, 0], [W2, 0, 0], [0, D2, 0], [W2, D2, 0], [0, 0, H2], [W2, 0, H2], [0, D2, H2]].map(p => P2(...p))), 16, 14);
  const vuePaquet = z => {
    const { T } = cadre2(z), P = (x, y, zz) => T(P2(x, y, zz));
    return paquet(P, { x0: 0, y0: 0, z0: 0, W: W2, D: D2, H: H2, ep: 4, boucle: 1.25 });
  };

  // ─── Vue 3 : dans le four de la cuisinière, porte ouverte
  const P3 = axo([0.87, 0.30], [-0.62, 0.36]);
  const YF = 65, X0 = 10, X1 = 66, Z0 = 14, Z1 = 62, YB = 8;
  const cadre3 = z => cadre(z, bornes([[0, 0, 111], [76, 0, 111], [76, 0, 0], [76, 65, 0], [0, 65, 0], [0, 65, 91], [4, 123, 1], [72, 123, 1], [4, 123, 12]].map(p => P3(...p))), 14, 10);
  const vueFour = z => {
    const { T } = cadre3(z), P = (x, y, zz) => T(P3(x, y, zz));
    const out = [];
    // l'intérieur : le fond, la paroi de gauche et ses glissières, la sole
    out.push(poly([P(X0, YB, Z0), P(X1, YB, Z0), P(X1, YB, Z1), P(X0, YB, Z1)], blanc(A.detail)));
    out.push(poly([P(X0, YB, Z0), P(X0, YF, Z0), P(X0, YF, Z1), P(X0, YB, Z1)], blanc(A.detail)));
    out.push(poly([P(X0, YB, Z0), P(X1, YB, Z0), P(X1, YF, Z0), P(X0, YF, Z0)], blanc(A.detail)));
    [26, 38, 50].forEach(zr => {
      out.push(poly([P(X0, YB + 3, zr - 0.8), P(X0, YF - 1, zr - 0.8)], A.fin, false));
      out.push(poly([P(X0, YB + 3, zr + 0.8), P(X0, YF - 1, zr + 0.8)], A.fin, false));
    });
    // la grille, posée sur les glissières du milieu
    const zg = 38.8, ya = YB + 2, yb = YF - 2;
    for (let x = X0 + 4; x <= X1 - 3; x += 4) out.push(poly([P(x, ya, zg), P(x, yb, zg)], A.fin, false));
    [ya + 16, ya + 36].forEach(y => out.push(poly([P(X0, y, zg), P(X1, y, zg)], A.fin, false)));
    out.push(poly([P(X0, ya, zg), P(X1, ya, zg), P(X1, yb, zg), P(X0, yb, zg)], A.detail));
    // le paquet sur la grille
    out.push(paquet(P, { x0: 21, y0: 24, z0: zg + 0.3, W: 33, D: 22, H: 6, ep: 2.6, silh: A.arete }));
    // la façade, percée de la bouche du four
    const face = `M${pt(P(0, YF, 0))} L${pt(P(76, YF, 0))} L${pt(P(76, YF, 91))} L${pt(P(0, YF, 91))} Z ` +
      `M${pt(P(X0, YF, Z0))} L${pt(P(X1, YF, Z0))} L${pt(P(X1, YF, Z1))} L${pt(P(X0, YF, Z1))} Z`;
    out.push(h.path(face, blanc(A.arete) + ' fill-rule="evenodd"'));
    out.push(poly([P(6, YF, 11), P(70, YF, 11), P(70, YF, 66), P(6, YF, 66)], A.fin));   // le joint de la porte
    out.push(poly([P(0, YF, 9), P(76, YF, 9)], A.detail, false));                          // le tiroir
    out.push(poly([P(28, YF, 5), P(48, YF, 5)], A.arete, false));
    // le flanc, le dessus et ses quatre ronds, le dosseret et ses boutons
    out.push(poly([P(76, 0, 0), P(76, YF, 0), P(76, YF, 91), P(76, 0, 91)], blanc(A.arete)));
    out.push(poly([P(0, 0, 91), P(76, 0, 91), P(76, YF, 91), P(0, YF, 91)], blanc(A.arete)));
    [[20, 24], [56, 24], [20, 48], [56, 48]].forEach(([x, y]) => [10, 6.8, 3.6].forEach((r, i) =>
      out.push(poly(rond3(P, [x, y, 91], r, 'xy'), i ? A.fin : A.detail))));
    out.push(pave(P, 0, 0, 91, 76, YB, 111, A.arete));
    [12, 25, 51, 64].forEach(x => out.push(poly(rond3(P, [x, YB, 101], 3.6, 'xz'), blanc(A.detail))));
    out.push(poly([P(0, 0, 111), P(76, 0, 111), P(76, 0, 0), P(76, YF, 0), P(0, YF, 0), P(0, YF, 91), P(0, YB, 91), P(0, YB, 111)], A.contour));
    // la poignée, sous le bout de la porte ouverte, puis la porte rabattue à plat
    const yp = YF + 54;
    [20, 56].forEach(x => out.push(poly([P(x, yp, 2), P(x, yp, 7)], A.arete, false)));
    out.push(poly([P(14, yp + 1.5, 1), P(62, yp + 1.5, 1), P(62, yp + 1.5, 3.5), P(14, yp + 1.5, 3.5)], blanc(A.arete)));
    out.push(pave(P, 4, YF, 7, 72, YF + 58, 12));
    out.push(poly([P(13, YF + 9, 12), P(63, YF + 9, 12), P(63, YF + 49, 12), P(13, YF + 49, 12)], A.detail));   // la vitre
    out.push(poly([P(16, YF + 12, 12), P(60, YF + 12, 12), P(60, YF + 46, 12), P(16, YF + 46, 12)], A.fin));
    return out.join('\n');
  };

  // ─── Vue 4 : rangé dans la boîte de métal, le couvercle qui se referme
  const P4 = axo([0.86, 0.40], [-0.58, 0.52]);
  const W4 = 34, D4 = 24, H4 = 9, L0 = H4 + 17;
  const cadre4 = z => cadre(z, bornes([[0, 0, L0 + 3], [W4, 0, L0 + 3], [W4 + 9, 0, 0], [W4, D4, 0], [0, D4, 0], [0, D4, L0 + 3]].map(p => P4(...p))), 26, 14);
  const vueBoite = z => {
    const { T } = cadre4(z), P = (x, y, zz) => T(P4(x, y, zz));
    const out = [];
    out.push(poly([P(0, 0, 0), P(W4, 0, 0), P(W4, 0, H4), P(0, 0, H4)], blanc(A.detail)));
    out.push(poly([P(0, 0, 0), P(0, D4, 0), P(0, D4, H4), P(0, 0, H4)], blanc(A.detail)));
    out.push(poly([P(0, 0, 0), P(W4, 0, 0), P(W4, D4, 0), P(0, D4, 0)], blanc(A.detail)));
    out.push(paquet(P, { x0: 4, y0: 3, z0: 0.2, W: 26, D: 18, H: 5, ep: 2.6, silh: A.arete }));
    out.push(poly([P(W4, 0, 0), P(W4, D4, 0), P(W4, D4, H4), P(W4, 0, H4)], blanc(A.arete)));
    out.push(poly([P(0, D4, 0), P(W4, D4, 0), P(W4, D4, H4), P(0, D4, H4)], blanc(A.arete)));
    out.push(poly([P(0, D4, H4 - 1.3), P(W4, D4, H4 - 1.3), P(W4, 0, H4 - 1.3)], A.fin, false));   // le bourrelet
    [3, 4.6].forEach(x => out.push(poly([P(x, D4, 1.5), P(x, D4, H4 - 3)], A.fin, false)));       // reflets
    out.push(poly([P(0, 0, H4), P(W4, 0, H4), P(W4, 0, 0), P(W4, D4, 0), P(0, D4, 0), P(0, D4, H4)], A.contour));
    // le couvercle, soulevé
    out.push(pave(P, -0.6, -0.6, L0, W4 + 0.6, D4 + 0.6, L0 + 3));
    out.push(poly([P(2.4, 2.4, L0 + 3), P(W4 - 2.4, 2.4, L0 + 3), P(W4 - 2.4, D4 - 2.4, L0 + 3), P(2.4, D4 - 2.4, L0 + 3)], A.fin));
    [3, 4.6].forEach(x => out.push(poly([P(x, D4 + 0.6, L0 + 0.6), P(x, D4 + 0.6, L0 + 2.2)], A.fin, false)));
    // il descend et ferme la boîte
    const a = P(W4 + 6, 0, L0 + 1), b = P(W4 + 6, 0, H4 + 2);
    out.push(h.fleche(`M${pt(a)} L${pt(b)}`));
    return out.join('\n');
  };

  return {
    ref: '29-10',
    titre: 'Les liens et les ciseaux stérilisés au four',
    desc: 'Trois liens de ficelle de coton, des ciseaux tout en métal et une bande de tissu nouée d’une ficelle, posés sur quatre épaisseurs de tissu dont on rabat les coins ; le paquet ficelé dans les deux sens, cuit sur la grille du four de la cuisinière, puis rangé fermé dans une boîte de métal à couvercle.',
    format: 'pleine',
    disposition: [['tissu', 'paquet'], ['four', 'boite']],
    largeurs: [[1.12, 1], [1.12, 1]],
    hauteurs: [1.08, 1],
    vues: {
      tissu: {
        titre: 'Posées sur le tissu',
        dessin: vueTissu,
        renvois: z => {
          const { T } = tissu(z);
          return [
            { n: 1, rond: T([-96, 78]), cible: T([-50, 70 + 1.5 * DEC]), texte: 'quatre épaisseurs de tissu' },
            { n: 2, rond: T([-96, -58]), cible: T([-52, -45.5]), texte: 'trois liens de ficelle de coton' },
            { n: 3, rond: T([-104, 30]), cible: T([-40, 15]), texte: 'ciseaux tout en métal, sans plastique' },
            { n: 4, rond: T([96, 72]), cible: T([56, 35]), texte: 'bande de tissu solide et sa ficelle' },
          ];
        },
      },
      paquet: {
        titre: 'Plié et ficelé',
        dessin: vuePaquet,
        renvois: z => {
          const { T } = cadre2(z), P = (x, y, zz) => T(P2(x, y, zz));
          return [
            { n: 5, rond: [22, 20], cible: P(W2 * 0.246, D2 * 0.294, H2), texte: 'coins rabattus l’un sur l’autre' },
            { n: 6, rond: [z.l - 18, z.h * 0.35], cible: P(W2, D2 / 2, H2 * 0.45), texte: 'ficelle de coton, sans élastique' },
          ];
        },
      },
      four: {
        titre: 'Au four',
        dessin: vueFour,
        renvois: z => {
          const { T } = cadre3(z), P = (x, y, zz) => T(P3(x, y, zz));
          return [
            { n: 7, rond: [z.l - 18, z.h * 0.52], cible: P(47, 36, 44.5), texte: '1 heure à 170 °C, ou 2 h 30 à 150 °C' },
            { n: 8, rond: [20, z.h - 20], cible: P(20, YF + 40, 12), texte: 'four de la cuisinière, à la maison' },
          ];
        },
      },
      boite: {
        titre: 'Refroidi, dans sa boîte',
        dessin: vueBoite,
        renvois: z => {
          const { T } = cadre4(z), P = (x, y, zz) => T(P4(x, y, zz));
          return [
            { n: 9, rond: [z.l - 16, z.h - 22], cible: P(W4, D4 * 0.55, H4 * 0.45), texte: 'boîte de métal à couvercle, au sec' },
            { n: 10, rond: [18, z.h * 0.42], cible: P(9, 6, 5.3), texte: 'fermé jusqu’au moment de s’en servir' },
          ];
        },
      },
    },
  };
};
