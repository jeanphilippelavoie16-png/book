// Planche 78-40 — remplir un pot (ch. 78, §5.2, étapes 6, 8 et 9 ; tableau Matériel : entonnoir
// large, spatule mince non métallique ou baguette de bois franc, louche ; note 1 : l'espace de
// tête va de la surface de l'aliment ou de son liquide au couvercle, et sa hauteur est celle de
// la recette). Le pot n'est pas une chose qu'on construit : aucune cote. L'espace de tête porte
// un trait de mesure sans chiffre, parce que la bonne hauteur est celle de la recette.
//
// Le pot est dessiné vu un peu d'en haut, verre transparent : on voit le niveau et les bulles au
// travers de la paroi, comme en vrai. Mesures internes en mm d'un pot Mason de 500 mL.
module.exports = (h) => {
  const A = h.a;
  const PI = Math.PI;
  const f = n => Math.round(n * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const sans = nom => A.hachure(nom, 'aucun');
  const d = (pts, ferme) => pts.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ') + (ferme ? ' Z' : '');
  const rot = (p, deg) => { const c = Math.cos(deg * PI / 180), s = Math.sin(deg * PI / 180); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };
  const bez = (a, b, c, n = 16) => Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, m = 1 - t;
    return [m * m * a[0] + 2 * m * t * b[0] + t * t * c[0], m * m * a[1] + 2 * m * t * b[1] + t * t * c[1]];
  });
  // une bande de largeur w0 → w1 autour d'une ligne médiane (en unités de vue)
  const bande = (pts, w0, w1 = w0) => {
    const g = [], dr = [];
    pts.forEach((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      let ux = b[0] - a[0], uy = b[1] - a[1]; const l = Math.hypot(ux, uy) || 1; ux /= l; uy /= l;
      const w = (w0 + (w1 - w0) * i / (pts.length - 1)) / 2;
      g.push([p[0] + uy * w, p[1] - ux * w]); dr.push([p[0] - uy * w, p[1] + ux * w]);
    });
    return { g, dr, poly: [...g, ...dr.slice().reverse()] };
  };

  // ─── le pot Mason ─────────────────────────────────────────────────────────────────────
  const K = 0.22;                                   // aplatissement des ellipses : vu un peu d'en haut
  const RB = 38, RN = 32, HJ = 130, EP = 3;         // rayon du corps, du col ; hauteur ; verre
  const rExt = yy => yy < 92 ? RB : yy < 106 ? RN + (RB - RN) * (1 + Math.cos(PI * (yy - 92) / 14)) / 2 : RN;
  const ri = yy => rExt(yy) - EP;
  const bosse = yy => {                             // les deux tours de filet et le bourrelet du rebord
    let b = 0;
    for (const c of [113, 120]) b = Math.max(b, 2.2 * Math.max(0, 1 - Math.abs(yy - c) / 2.8));
    if (yy >= 126.5) b = Math.max(b, 1.4 * Math.sqrt(Math.min(1, (yy - 126.5) / 1.2)));
    return b;
  };
  const rRebord = RN + 1.4, rBouche = RN - EP;

  const repere = (cx, yb, s) => {
    const P = (x, yy) => [cx + x * s, yb - yy * s];
    const arc = (r, yy, t0, t1, n = 32) => Array.from({ length: n + 1 }, (_, i) => {
      const t = t0 + (t1 - t0) * i / n;
      return [cx + r * Math.cos(t) * s, yb - yy * s + K * r * Math.sin(t) * s];
    });
    return { P, arc, s, cx, yb };
  };

  // un morceau (cube) vu au travers du verre
  const cube = (R, x, yy, a, tr = 0) => {
    const [x0, y0] = R.P(x, yy), s = R.s;
    const T = (u, v) => { const q = rot([u * a * s, v * a * s], tr); return [x0 + q[0], y0 + q[1]]; };
    return [
      h.path(d([T(-0.5, 0.5), T(-0.5, -0.5), T(-0.22, -0.74), T(0.76, -0.74), T(0.76, 0.26), T(0.5, 0.5)], true), blanc(A.detail)),
      h.path(d([T(-0.5, -0.5), T(0.5, -0.5), T(0.5, 0.5)]), A.fin),
      h.path(d([T(0.5, -0.5), T(0.76, -0.74)]), A.fin),
    ].join('\n');
  };

  // Le pot se peint en deux temps : le fond (le blanc, le dos du rebord, le contenu) puis le verre
  // (la silhouette, le devant du rebord, les filets), pour glisser entre les deux ce qui est dedans.
  function pot(R, o = {}) {
    const { P, arc, s } = R;
    const fond = [], verre = [];
    const flanc = sg => { const pts = []; for (let yy = HJ; yy >= 0; yy -= 0.5) pts.push(P(sg * (rExt(yy) + bosse(yy)), yy)); return pts; };
    const gauche = flanc(-1), droite = flanc(1).reverse(), bas = arc(RB, 0, PI, 0);
    fond.push(h.path(d([...gauche, ...bas, ...droite, ...arc(rRebord, HJ, 0, -PI)], true), A.blanc));
    if (!o.sansRebord) {
      fond.push(h.path(d(arc(rRebord, HJ, PI, 2 * PI)), A.arete));
      fond.push(h.path(d(arc(rBouche, HJ, PI, 2 * PI)), A.detail));
    }
    const L = o.niveau;
    if (L != null) {
      const liq = [...arc(ri(L), L, PI, 2 * PI)];
      for (let yy = L; yy >= 6; yy -= 1) liq.push(P(ri(yy), yy));
      liq.push(...arc(RB - EP, 6, 0, PI));
      for (let yy = 6; yy <= L; yy += 1) liq.push(P(-ri(yy), yy));
      fond.push(h.path(d(liq, true), sans('eau')));
      for (const m of o.morceaux || []) fond.push(cube(R, ...m));
      fond.push(h.path(d(arc(ri(L), L, 0, 2 * PI, 64), true), blanc(A.detail)));
      for (const b of o.bulles || []) fond.push(h.cercle(...P(b[0], b[1]), b[2] * s, blanc(A.fin)));
    }
    verre.push(h.path(d([...gauche, ...bas, ...droite]), A.contour));
    if (!o.sansRebord) {
      verre.push(h.path(d(arc(rRebord, HJ, 0, PI)), A.arete));
      verre.push(h.path(d(arc(rBouche, HJ, 0, PI)), A.detail));
    }
    for (const sg of [-1, 1]) {                    // l'épaisseur du verre, vue sur les bords
      const pts = []; for (let yy = 8; yy <= 104; yy += 2) pts.push(P(sg * ri(yy), yy));
      verre.push(h.path(d(pts), A.fin));
    }
    verre.push(h.path(d(arc(RB - EP, 6, 0.14, PI - 0.14)), A.fin));
    for (const c of [113, 120]) {                  // les filets, en hélice sur le devant du col
      const pts = arc(RN + 2.2, c, PI - 0.16, 0.16).map((p, i, t) => [p[0], p[1] + (i / (t.length - 1) - 0.5) * 3 * s]);
      verre.push(h.path(d(pts), A.detail));
    }
    return { fond: fond.join('\n'), verre: verre.join('\n') };
  }

  // ─── Vue 1 : remplir à la louche, par l'entonnoir ───────────────────────────────────
  // L'entonnoir : bec de rayon 25 qui descend dans le col jusqu'à 114, collet posé sur le rebord
  // (129,5 à 132,5, rayon 37), cône jusqu'au bord roulé en 180, rayon 68.
  const EB = 25, EC = 37, EH = 180, ER = 68;
  const LIP = [-16, 206], TILT = -50;               // la lèvre de la louche, et son inclinaison
  const LOUCHE_T = 175, PRISE_T = 116;              // longueur du manche, et où la main le tient
  const geoA = z => {
    const s = Math.min(z.l / 300, (z.h - 8) / 470);
    const cx = z.l / 2 - 72 * s, yb = z.h - 4 - 9 * s;
    const R = repere(cx, yb, s);
    // la louche, dans son repère (mm, y vers le bas, centre du bord en 0 0), basculée autour de la lèvre
    const lip = R.P(...LIP);
    const Tl = p => { const q = rot([p[0] + 42, p[1]], TILT); return [lip[0] + q[0] * s, lip[1] + q[1] * s]; };
    const dirM = [0.864, -0.503];
    const manche = t => [52 + dirM[0] * t, -9 + dirM[1] * t];
    const dirE = rot(dirM, TILT);
    const angle = Math.atan2(dirE[0], -dirE[1]) * 180 / PI;
    return { s, R, Tl, manche, prise: Tl(manche(PRISE_T)), angle };
  };

  const vueRemplir = z => {
    const g = geoA(z), R = g.R, { P, arc, s } = R, out = [];
    const niveau = 70;
    const p = pot(R, {
      niveau, sansRebord: true,
      morceaux: [[-22, 16, 19, 4], [-1, 15, 18, -6], [20, 17, 18, 8], [-15, 35, 18, -10], [8, 36, 19, 5], [-26, 52, 16, 12], [20, 54, 17, -4]],
      bulles: [],
    });
    out.push(p.fond);
    // ce qui tombe du bec dans le pot
    const coule = bande(bez(P(-4, 114), P(-5, 95), P(-3, niveau + 1)), 11 * s, 7 * s);
    out.push(h.path(d(coule.poly, true), A.blanc));
    out.push(h.path(d(coule.poly, true), sans('eau')));
    out.push(h.path(d(coule.g), A.detail), h.path(d(coule.dr), A.detail));
    out.push(cube(R, -6, 92, 15, 20));
    // le bec, dans le col, derrière le verre
    const bec = [P(-EB, 131), P(-EB, 114), ...arc(EB, 114, PI, 0), P(EB, 114), P(EB, 131)];
    out.push(h.path(d(bec, true), A.blanc));
    out.push(h.path(d([P(-EB, 129), P(-EB, 114), ...arc(EB, 114, PI, 0), P(EB, 114), P(EB, 129)]), A.detail));
    out.push(p.verre);
    // l'entonnoir : d'abord tout son blanc et le dos du bord, puis ce qui tombe dedans, puis le devant
    const silhE = [...arc(ER, EH, PI, 2 * PI), P(EC, 132.5), P(EC, 129.5), ...arc(EC, 129.5, 0, PI), P(-EC, 132.5)];
    out.push(h.path(d(silhE, true), A.blanc));
    out.push(h.path(d(arc(ER, EH, PI, 2 * PI)), A.arete), h.path(d(arc(ER - 4, EH, PI, 2 * PI)), A.detail));
    const lipS = g.Tl([-42, 0]);
    const chute = bande(bez([lipS[0] - 2 * s, lipS[1] + 2 * s], [lipS[0] - 7 * s, lipS[1] + 14 * s], P(-24, EH - 12)), 8 * s, 10 * s);
    out.push(h.path(d(chute.poly, true), A.blanc), h.path(d(chute.poly, true), sans('eau')));
    out.push(h.path(d(chute.g), A.detail), h.path(d(chute.dr), A.detail));
    const devant = [...arc(ER, EH, PI, 0), P(EC, 132.5), ...arc(EC, 132.5, 0, PI)];
    out.push(h.path(d(devant, true), A.blanc));
    out.push(h.path(d(arc(ER - 4, EH, PI, 0)), A.detail), h.path(d(arc(ER, EH, PI, 0)), A.arete));
    out.push(h.path(d(arc(EC, 132.5, 0, PI)), A.arete));
    out.push(h.path(d([P(-ER, EH), P(-EC, 132.5), P(-EC, 129.5), ...arc(EC, 129.5, PI, 0), P(EC, 129.5), P(EC, 132.5), P(ER, EH)]), A.contour));
    // la louche : le bol, puis le manche que la main tient
    const Tl = g.Tl;
    const bol = [];
    for (let i = 0; i <= 32; i++) { const t = PI + PI * i / 32; bol.push(Tl([42 * Math.cos(t), 9 * Math.sin(t)])); }
    for (let i = 0; i <= 32; i++) { const t = PI * i / 32; bol.push(Tl([42 * Math.cos(t), 30 * Math.sin(t)])); }
    out.push(h.path(d(bol, true), A.blanc));
    const bord = []; for (let i = 0; i <= 64; i++) { const t = 2 * PI * i / 64; bord.push(Tl([42 * Math.cos(t), 9 * Math.sin(t)])); }
    out.push(h.path(d(bord, true), A.arete));
    const coque = []; for (let i = 0; i <= 32; i++) { const t = PI * i / 32; coque.push(Tl([42 * Math.cos(t), 30 * Math.sin(t)])); }
    out.push(h.path(d(coque), A.contour));
    // le manche : une bande qui part du bord et monte, le bout arrondi
    const cm = [Tl([38, -2]), ...bez(Tl([38, -2]), Tl([47, -6]), Tl(g.manche(8)), 6).slice(1)];
    for (let t = 16; t <= LOUCHE_T; t += 8) cm.push(Tl(g.manche(t)));
    const bm = bande(cm, 6 * s, 10 * s);
    const ed = bm.dr[bm.dr.length - 1];
    const retour = bm.dr.slice().reverse().slice(1).map(p => `L${f(p[0])} ${f(p[1])}`).join(' ');
    const manche = h.path(`${d(bm.g)} A${f(5 * s)} ${f(5 * s)} 0 0 1 ${f(ed[0])} ${f(ed[1])} ${retour} Z`, blanc(A.arete));
    // modèle s11 (poing fermé, vu de la paume) en miroir : l'avant-bras part à droite, le pouce en bas
    // du côté du bol ; le manche, peint d'abord, passe dans le poing
    out.push(manche);
    out.push(h.formes.modele('s11', { x: g.prise[0], y: g.prise[1], ancre: [68, 42], angle: g.angle - 90, miroir: true, echelle: 0.75 * s, masquer: [[0, 150, 140, 175]],
      bras: { a: [21.8, 150], a0: [20.8, 135], b: [76.3, 150], b0: [76.2, 135], vers: [1, -0.35], bord: z } }));
    return out.join('\n');
  };

  // ─── Vue 2 : chasser les bulles ─────────────────────────────────────────────────────
  const SPX = 21, SPL = 13;                          // la spatule contre le verre, sa largeur
  const geoB = z => {
    const s = Math.min(z.l / 250, (z.h - 8) / 292);
    const cx = z.l / 2 + 36 * s, yb = z.h - 4 - 9 * s;
    return { s, R: repere(cx, yb, s) };
  };
  const vueBulles = z => {
    const g = geoB(z), R = g.R, { P, s } = R, out = [];
    const niveau = 106;
    const p = pot(R, {
      niveau,
      morceaux: [
        [-24, 16, 19, 3], [-3, 15, 19, -5], [19, 17, 18, 6],
        [-22, 37, 19, -8], [0, 36, 18, 6], [21, 37, 18, -3],
        [-25, 57, 18, 10], [-2, 56, 19, -4], [19, 58, 18, 5],
        [-22, 77, 19, -3], [0, 76, 18, 8], [20, 78, 17, -6],
        [-15, 92, 15, 6], [8, 93, 15, -9],
      ],
      bulles: [
        // prises entre les morceaux, du côté où la spatule n'est pas encore passée
        [-33, 27, 3], [-33.5, 35, 2.2], [-13, 26, 2.6], [-12, 47, 3.2], [-33, 48, 2.6], [-33.5, 66, 3.2],
        [-13, 67, 2.4], [-11, 86, 3], [-33, 87, 2.6], [-26, 102, 2.2],
        // libérées le long de la spatule : elles remontent en grossissant
        [11.5, 24, 1.4], [10.5, 36, 1.8], [11.5, 49, 2.1], [10, 62, 2.4], [11.5, 76, 2.7], [10, 90, 3], [11, 103, 3.3],
      ],
    });
    out.push(p.fond);
    // la spatule, contre le verre à droite, du fond jusqu'au-dessus du pot
    const bas = 14, sx0 = SPX - SPL / 2, sx1 = SPX + SPL / 2;
    const lame = [P(sx0, 150), P(sx0, bas + 3), P(sx0 + 0.9, bas + 0.9), P(sx0 + 3, bas), P(sx1 - 3, bas), P(sx1 - 0.9, bas + 0.9), P(sx1, bas + 3), P(sx1, 150)];
    const fil = (y0, y1) => [-3, 0.5, 3.5].map((o, k) => { const pts = []; for (let yy = y0; yy <= y1; yy += 4) pts.push(P(SPX + o + 0.6 * Math.sin(yy / 11 + k * 2), yy)); return h.path(d(pts), A.fin); }).join(' ');
    out.push(h.path(d(lame, true), blanc(A.arete)), fil(bas + 7, 128));
    out.push(p.verre);
    // le haut de la spatule, que la main tient
    const haut = [h.path(d([P(sx0, 140), P(sx0, 262), P(sx1, 262), P(sx1, 140)], true), A.blanc), h.path(d([P(sx0, 140), P(sx0, 262), P(sx1, 262), P(sx1, 140)]), A.arete), fil(144, 256)].join(' ');
    // modèle s11 tourné d'un quart : l'avant-bras part à gauche, le pouce en bas vers le pot ; le haut
    // de la spatule, peint d'abord, passe dans le poing
    out.push(haut);
    out.push(h.formes.modele('s11', { x: P(SPX, 215)[0], y: P(SPX, 215)[1], ancre: [68, 42], angle: 90, echelle: 0.75 * s, masquer: [[0, 150, 140, 175]],
      bras: { a: [21.8, 150], a0: [20.8, 135], b: [76.3, 150], b0: [76.2, 135], vers: [-1, 0.35], bord: z } }));
    // le geste : la spatule descend le long de la paroi
    out.push(h.fleche(`M${f(P(52, 118)[0])} ${f(P(52, 118)[1])} L${f(P(52, 40)[0])} ${f(P(52, 40)[1])}`, A.arete));
    return out.join('\n');
  };

  // ─── Vue 3 : l'espace de tête ─────────────────────────────────────────────────────────
  const NIVEAUX = [129, 106, 78];
  const geoC = z => {
    const s = Math.min(z.h / 150, z.l / 560);
    const yb = z.h - 4 - 9 * s, pas = 175 * s;
    return { s, pots: NIVEAUX.map((n, i) => repere(z.l / 2 + (i - 1) * pas, yb, s)) };
  };
  const morceauxDe = n => [
    [-22, 16, 19, 4], [-1, 15, 18, -6], [20, 17, 18, 8], [-21, 36, 18, -8], [1, 35, 19, 5], [21, 37, 18, -4],
    [-22, 56, 18, 9], [0, 55, 18, -5], [20, 57, 17, 6], [-20, 75, 18, -4], [2, 76, 18, 7], [20, 76, 16, -6],
    [-14, 95, 17, 6], [9, 96, 17, -9], [-8, 114, 16, 5], [12, 115, 15, -7],
  ].filter(m => m[1] + m[2] * 0.75 < n - 3);
  const vueEspace = z => {
    const g = geoC(z), out = [];
    g.pots.forEach((R, i) => {
      const p = pot(R, { niveau: NIVEAUX[i], morceaux: morceauxDe(NIVEAUX[i]) });
      out.push(p.fond, p.verre);
    });
    // le trait de mesure de l'espace de tête, sur le pot juste
    const R = g.pots[1], { P } = R;
    const xm = 48, y0 = P(0, NIVEAUX[1])[1], y1 = P(0, HJ)[1];
    const x = P(xm, 0)[0];
    out.push(h.ligne(P(ri(NIVEAUX[1]) + 3, 0)[0], y0, x + 6, y0, A.fin));
    out.push(h.ligne(P(rRebord + 3, 0)[0], y1, x + 6, y1, A.fin));
    out.push(h.ligne(x, y0, x, y1, A.detail));
    out.push(h.path(d([[x - 5, y0 + 5], [x + 5, y0 - 5]]), A.detail), h.path(d([[x - 5, y1 + 5], [x + 5, y1 - 5]]), A.detail));
    return out.join('\n');
  };

  return {
    ref: '78-40',
    titre: 'Remplir un pot : l’entonnoir, les bulles, l’espace de tête',
    desc: 'Trois vues d’un pot Mason en verre. À gauche, une main tient une louche qui verse l’aliment et son liquide dans un entonnoir large dont le bec entre dans le goulot et dont le collet couvre le rebord ; le pot se remplit. Au centre, le pot plein : une main pousse une spatule mince en bois le long de la paroi, jusqu’au fond ; les bulles prises entre les morceaux remontent le long de la spatule. En bas, trois pots côte à côte : plein jusqu’au rebord, rempli juste avec l’espace de tête marqué d’un trait de mesure entre la surface du liquide et le haut du pot, et trop vide.',
    format: 'pleine',
    disposition: [['remplir', 'bulles'], ['espace']],
    hauteurs: [2.35, 1],
    vues: {
      remplir: {
        titre: 'Remplir à l’entonnoir',
        dessin: vueRemplir,
        renvois: z => {
          const g = geoA(z), { P } = g.R;
          const bol = g.Tl([10, 26]);
          return [
            { n: 1, rond: [16, bol[1] - 4], cible: bol, texte: 'la louche verse dans l’entonnoir' },
            { n: 2, rond: [16, P(-60, 158)[1]], cible: P(-52, 160), texte: 'entonnoir large, le bec dans le goulot' },
            { n: 3, rond: [16, P(-60, 45)[1]], cible: P(-RB, 45), texte: 'pot gardé chaud jusqu’au remplissage' },
          ];
        },
      },
      bulles: {
        titre: 'Chasser les bulles',
        dessin: vueBulles,
        renvois: z => {
          const g = geoB(z), { P } = g.R;
          return [
            { n: 4, rond: [z.l - 16, P(0, 170)[1]], cible: P(SPX + SPL / 2, 150), texte: 'spatule non métallique, baguette de bois franc' },
            { n: 5, rond: [z.l - 12, P(0, 62)[1]], cible: P(52, 72), texte: 'descendue le long de la paroi' },
            { n: 6, rond: [P(-66, 0)[0], P(0, 47)[1]], cible: P(-12, 47), texte: 'les bulles prises entre les morceaux remontent' },
          ];
        },
      },
      espace: {
        titre: 'L’espace de tête',
        dessin: vueEspace,
        renvois: z => {
          const g = geoC(z);
          const [a, b, c] = g.pots.map(r => r.P);
          return [
            { n: 7, rond: a(-66, 124), cible: a(-24, 128), texte: 'trop plein : déborde et souille le joint' },
            { n: 8, rond: b(78, 118), cible: [b(48, 0)[0], b(0, 118)[1]], texte: 'espace de tête que donne la recette' },
            { n: 9, rond: c(66, 110), cible: c(22, 108), texte: 'trop vide : l’air empêche le vide' },
          ];
        },
      },
    },
  };
};
