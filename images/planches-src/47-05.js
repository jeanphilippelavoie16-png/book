// Planche 47-05 — Porter le petit gibier à l'air (chapitre 47, §4, ligne « De quoi porter à l'air » ;
// ch. 48 étape 8 et ch. 49 étape 8 pour le détail : le lièvre pendu hors du sac, les oiseaux pendus
// par le cou, séparés, hors du sac ; le passage entre le tendon et l'os du jarret : ch. 53, 55, 61).
// Vue 1 : le lièvre, vu de dos, pendu par les deux jarrets à un bâtonnet pointu ; la main le tient
// entre les deux pattes. Vue 2 : le jarret de côté, le tendon et l'os sous la peau (trait caché), le
// bâtonnet qui perce la peau dans le creux entre les deux. Vue 3 : trois gélinottes pendues chacune
// par le cou, à part, sur le devant d'un sac ouvert.
// Aucune cote : le chapitre ne donne aucune mesure du bâtonnet.
module.exports = (h) => {
  const F = h.formes;
  const r1 = v => Math.round(v * 10) / 10;
  const blanc = (t = h.a.arete) => t.replace('fill="none"', 'fill="#fff"');

  // ─── mains simples : la boîte d'une vue, et l'angle qui met l'axe de la prise sur `axe` (degrés à l'écran)
  // avec l'avant-bras du côté de `vers`
  const BORD = z => ({ x0: 0, y0: 0, x1: z.l, y1: z.h });
  const poser = (o, axe, vers) => {
    const base = Object.assign({}, o, { angle: 0, avantbras: { longueur: 100 } });
    delete base.objet;
    const e0 = F.mainSimple(base);
    let best = null;
    for (const k of [0, 180]) {
      const a = axe - e0.prise.angle + k, e = F.mainSimple(Object.assign({}, base, { angle: a }));
      const d = [e.coude[0] - e.poignet[0], e.coude[1] - e.poignet[1]], w = [vers[0] - e.poignet[0], vers[1] - e.poignet[1]];
      const c = (d[0] * w[0] + d[1] * w[1]) / ((Math.hypot(d[0], d[1]) * Math.hypot(w[0], w[1])) || 1);
      if (!best || c > best.c) best = { a, c };
    }
    return best.a;
  };
  // Catmull-Rom : une suite de points devient une courbe qui passe par chacun.
  const lisse = (pts, ferme = false) => {
    const n = pts.length, get = i => (ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    let d = `M ${r1(pts[0][0])} ${r1(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  const miroir = pts => pts.map(([x, y]) => [-x, y]);
  // Le bâtonnet de a à b (mm), rayon rr, pointes longues de pt ; bouts : lesquels sont pointus.
  const baton = (P, a, b, rr, pt, bouts = [true, true]) => {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-u[1], u[0]];
    const Q = (t, k) => P(a[0] + u[0] * t + n[0] * k, a[1] + u[1] * t + n[1] * k);
    const pts = [];
    if (bouts[0]) pts.push(Q(0, 0), Q(pt, -rr)); else pts.push(Q(0, rr), Q(0, -rr));
    if (bouts[1]) pts.push(Q(L - pt, -rr), Q(L, 0), Q(L - pt, rr)); else pts.push(Q(L, -rr), Q(L, rr));
    if (bouts[0]) pts.push(Q(pt, rr));
    const facettes = [bouts[0] ? h.path(lisse([Q(pt, rr * 0.1), Q(pt * 0.3, 0)]), h.a.fin) : '',
      bouts[1] ? h.path(lisse([Q(L - pt, -rr * 0.1), Q(L - pt * 0.3, 0)]), h.a.fin) : ''];
    return h.chemin(pts, blanc(), true) + facettes.join('');
  };
  // Des touffes de poil : de courts traits fins qui partent du bord vers l'intérieur.
  const poils = (P, liste) => liste.map(([a, b]) => h.path(lisse([P(...a), P(...b)]), h.a.fin)).join('\n');

  // ── Le lièvre, vu de dos, pendu tête en bas par les deux jarrets (mm, origine au centre du
  //    bâtonnet, y vers le bas). Moitié droite, du creux entre les cuisses au bout du nez ; la
  //    gauche en miroir.
  // Le pied part du jarret vers le haut et vers le dehors ; la cuisse redescend en V vers la hanche.
  const lievreD = [
    [6, 168], [20, 140], [36, 96], [50, 54], [58, 22], [60, 8], [61, -6],
    [72, -32], [84, -60], [98, -94], [106, -112], [116, -121], [128, -117], [131, -103], [120, -76], [106, -44], [86, -6],
    [84, 14], [83, 60], [80, 112], [72, 160], [62, 200],
    [62, 240], [63, 290], [58, 340], [50, 382], [42, 408], [29, 428],
    [28, 450], [32, 480], [28, 508], [16, 526],
  ];
  const lievre = [...lievreD, [0, 532], ...miroir(lievreD).reverse(), [0, 162]];
  const pattesAvD = [[26, 406], [40, 398], [46, 446], [47, 504], [44, 524], [35, 522], [33, 471]];
  const oreilleD = [[4, 450], [18, 444], [31, 474], [37, 524], [31, 562], [21, 550], [12, 504]];
  const boutOreilleD = [[36.5, 534], [31, 562], [21, 550], [19, 542], [29, 546]];

  const vueLievre = z => {
    const s = Math.min((z.h - 10) / 712, (z.l - 8) / 300);
    const ox = z.l / 2, oy = 4 + 150 * s;
    const P = (x, y) => [r1(ox + x * s), r1(oy + y * s)];
    const Pl = pts => pts.map(p => P(...p));
    const out = [];
    // la main sur le bâtonnet, entre les deux pattes
    const bat = baton(P, [-145, 0], [145, 0], 6, 30);
    // la main droite gantée (mains simples, gant : true), côté paume : le poing fermé sur le bâtonnet
    // (12 mm), qui entre d'un côté du poing et ressort de l'autre ; l'avant-bras monte et sort du cadre,
    // la manchette du gant au poignet
    const o = { x: ox, y: oy, pose: 'prise-manche', vue: 'paume', cote: 'droite', echelle: s, diametre: 12, gant: true };
    const vers = [ox, -400];
    const m = F.mainSimple({ ...o, angle: poser(o, 0, vers), avantbras: { vers, bord: BORD(z), longueur: 'bord' } });
    out.push(m.couches.main, m.couches.masque, bat, m.couches.devant);
    // les pattes de devant, derrière la tête : en gris
    const loin = h.a.arete.replace('fill="none"', 'fill="#E6E6E6"');
    out.push(h.path(lisse(Pl(pattesAvD), true), loin));
    out.push(h.path(lisse(Pl(miroir(pattesAvD)), true), loin));
    // le corps, par-dessus le bâtonnet : le bâtonnet traverse chaque jarret
    out.push(h.path(lisse(Pl(lievre), true), blanc(h.a.contour)));
    for (const sg of [1, -1]) {
      const X = pts => pts.map(([a, b]) => [[sg * a[0], a[1]], [sg * b[0], b[1]]]);
      out.push(poils(P, X([
        [[111, -117], [112, -106]], [[119, -121], [119, -109]], [[127, -117], [124, -106]],   // les doigts du pied
        [[118, -72], [111, -70]], [[79, 100], [72, 104]], [[62, 270], [55, 278]], [[57, 330], [50, 336]],
        [[48, 380], [42, 386]], [[28, 120], [35, 125]],
      ])));
    }
    out.push(h.path(lisse(Pl([[0, 198], [1, 300], [0, 380], [0, 420]])), h.a.fin));
    // la queue, une touffe ronde entre les cuisses
    out.push(h.path(lisse(Pl([[0, 164], [13, 168], [16, 182], [9, 194], [-6, 195], [-15, 184], [-12, 169]]), true), blanc(h.a.arete)));
    out.push(poils(P, [[[-5, 176], [-2, 184]], [[5, 174], [3, 183]]]));
    // les oreilles pendantes, bout noir, par-dessus l'arrière de la tête
    for (const sg of [1, -1]) {
      const pts = sg > 0 ? oreilleD : miroir(oreilleD), bout = sg > 0 ? boutOreilleD : miroir(boutOreilleD);
      out.push(h.path(lisse(Pl(pts), true), blanc(h.a.arete)));
      out.push(h.path(lisse(Pl(bout), true), h.a.plein));
      out.push(h.path(lisse(Pl([[sg * 12, 458], [sg * 22, 490], [sg * 24, 526]])), h.a.fin));
    }
    return { svg: out.join('\n'), P };
  };

  // ── Le jarret de côté, pendu comme dans la vue 1 (mm, origine au creux où passe le bâtonnet ;
  //    le pied en haut, la jambe en bas). Le derrière de la jambe (le tendon) à gauche, le devant
  //    (l'os) à droite.
  const E = [4, 16], U = [0.9, 0.436];   // le creux, et le sens du bâtonnet vers l'œil
  const vueJarret = z => {
    const k = Math.min((z.l - 64) / 136, (z.h - 8) / 272);
    const ox = z.l / 2 - 4 * k, oy = 4 + 146 * k;
    const P = (x, y) => [r1(ox + x * k), r1(oy + y * k)];
    const Pl = pts => pts.map(p => P(...p));
    const out = [];
    // la moitié qui ressort derrière la jambe (cachée par elle), sa pointe devant
    out.push(baton(P, [E[0] - U[0] * 72, E[1] - U[1] * 72], E, 4.5, 13, [true, false]));
    // la jambe et le pied, dans leur poil ; coupée en bas
    const gauche = [[-6, -128], [-12, -100], [-12, -60], [-11, -30], [-16, -9], [-14, 6], [-8, 20], [-7, 44], [-11, 72], [-18, 100], [-22, 122]];
    const droite = [[38, 122], [33, 92], [27, 56], [24, 26], [22, 6], [20, -20], [22, -60], [28, -100], [34, -124]];
    const doigts = [[35, -134], [29, -143], [19, -148], [7, -147], [-2, -140]];
    const bas = [];
    for (let i = 0; i <= 10; i++) { const t = i / 10; bas.push([-22 + 60 * t, 122 + Math.sin(t * Math.PI * 2) * 3]); }
    out.push(h.path(lisse(Pl([...gauche, ...bas.slice(1, -1), ...droite, ...doigts]), true), h.a.blanc));
    out.push(h.path(lisse(Pl([...droite, ...doigts, ...gauche])), h.a.contour));
    out.push(h.path(lisse(Pl(bas)), h.a.arete));
    out.push(poils(P, [
      [[5, -146], [6, -134]], [[15, -148], [15, -136]], [[25, -145], [24, -133]],   // les doigts
      [[-11, -110], [-5, -106]], [[-12, -76], [-6, -73]], [[-11, -44], [-5, -41]],   // le poil de la plante
      [[27, -84], [21, -81]], [[21, -40], [15, -38]],
      [[-10, 62], [-4, 64]], [[-14, 94], [-8, 96]], [[30, 70], [24, 72]], [[32, 104], [26, 106]],
    ]));
    // sous la peau, en trait caché : l'os de la jambe et l'os du talon d'un côté, le tendon de l'autre
    out.push(h.path(lisse(Pl([[12, 120], [13, 70], [11, 30], [9, 8], [12, -2], [18, -3], [20, 6], [19, 30], [20, 70], [22, 120]])), h.a.cache));
    out.push(h.path(lisse(Pl([[12, -3], [2, -9], [-9, -9], [-14, -3], [-11, 3], [0, 3], [10, 7]])), h.a.cache));
    out.push(h.path(lisse(Pl([[-13, 0], [-11, 24], [-11, 50], [-13, 80], [-15, 120]])), h.a.cache));
    out.push(h.path(lisse(Pl([[-5, 4], [-3, 24], [-2, 48], [3, 76], [8, 100], [10, 120]])), h.a.cache));
    // le trou dans la peau, puis la moitié qui vient vers l'œil, sa pointe au bout
    out.push(h.ellipse(...P(...E), r1(4.6 * k), r1(5.8 * k), blanc(h.a.detail)));
    out.push(baton(P, E, [E[0] + U[0] * 70, E[1] + U[1] * 70], 4.5, 13, [false, true]));
    // le geste : pousser le bâtonnet dans le creux, vers la pointe qui ressort derrière
    const n = [-U[1], U[0]], off = 13;
    const f0 = [E[0] + U[0] * 70 + n[0] * off, E[1] + U[1] * 70 + n[1] * off], f1 = [E[0] + U[0] * 38 + n[0] * off, E[1] + U[1] * 38 + n[1] * off];
    out.push(h.geste(`M ${P(...f0).join(' ')} L ${P(...f1).join(' ')}`));
    return { svg: out.join('\n'), P };
  };

  // ── Les oiseaux : trois gélinottes pendues chacune par le cou, sur le devant d'un sac ouvert
  //    (mm, origine au nœud coulant du premier oiseau, y vers le bas).
  // De côté, la poitrine à droite, le dos à gauche ; le cou épais, la collerette sombre sous la
  // boucle, l'aile repliée qui couvre le flanc, la queue en éventail à demi fermé et sa bande noire.
  const tete = [[-11, -6], [-17, -20], [-16, -34], [-22, -51], [-7, -47], [7, -43], [19, -35], [26, -26], [23, -14], [13, -5]];
  const corps = [[-9, 2], [-14, 24], [-24, 52], [-30, 96], [-32, 146], [-30, 190], [-22, 218], [-10, 230], [12, 230], [32, 212], [52, 178], [64, 130], [60, 84], [42, 44], [20, 18], [10, 2]];
  const aile = [[-16, 46], [10, 80], [24, 126], [18, 174], [2, 214], [-12, 250], [-24, 228], [-32, 188], [-35, 142], [-32, 94], [-25, 60]];
  const queue = [[-12, 222], [-26, 280], [-38, 340], [-31, 360], [-8, 368], [16, 366], [28, 352], [24, 290], [10, 222]];
  const oiseau = (P, dx, id) => {
    const Q = pts => pts.map(([x, y]) => P(x + dx, y));
    const u1 = P(1, 0)[0] - P(0, 0)[0];
    const out = [];
    const qd = lisse(Q(queue), true);
    out.push(h.path(qd, blanc(h.a.arete)));
    // la bande noire près du bout de la queue
    out.push(`<clipPath id="q47-${id}"><path d="${qd}" fill="none"/></clipPath>`);
    out.push(h.chemin(Q([[-46, 322], [36, 322], [36, 337], [-46, 337]]), `${h.a.plein} clip-path="url(#q47-${id})"`, true));
    out.push(h.path(lisse(Q([[-3, 250], [-9, 290], [-13, 320]])), h.a.fin), h.path(lisse(Q([[5, 250], [8, 290], [10, 320]])), h.a.fin));
    // les pattes emplumées qui pendent devant la queue
    out.push(h.path(lisse(Q([[20, 204], [24, 232], [25, 252]])), h.a.arete), h.path(lisse(Q([[30, 200], [33, 230], [32, 250]])), h.a.arete));
    out.push(h.path(lisse(Q([[25, 251], [19, 265]])), h.a.detail), h.path(lisse(Q([[28, 252], [28, 268]])), h.a.detail), h.path(lisse(Q([[32, 250], [38, 263]])), h.a.detail));
    out.push(h.path(lisse(Q(corps), true), blanc(h.a.contour)));
    // la collerette sombre sur le côté du cou
    out.push(h.ellipse(...P(dx - 2, 18), r1(6 * u1), r1(9 * u1), h.a.plein));
    // l'aile repliée, le bout des grandes plumes, deux rangs de couvertures
    out.push(h.path(lisse(Q(aile), true), blanc(h.a.arete)));
    out.push(h.path(lisse(Q([[-4, 188], [-12, 214], [-20, 236]])), h.a.detail), h.path(lisse(Q([[-12, 180], [-22, 206], [-26, 224]])), h.a.detail));
    out.push(h.path(lisse(Q([[-36, 84], [-18, 98], [2, 92]])), h.a.fin), h.path(lisse(Q([[-40, 118], [-18, 132], [8, 124]])), h.a.fin));
    // la poitrine barrée
    for (const [x, y] of [[32, 70], [40, 98], [42, 126], [40, 154], [32, 180]]) out.push(h.path(lisse(Q([[x, y], [x + 9, y + 3]])), h.a.fin));
    // la tête et sa huppe, le bec, l'œil
    out.push(h.path(lisse(Q(tete), true), blanc(h.a.arete)));
    out.push(h.chemin(Q([[23, -31], [34, -23], [23, -18]]), blanc(h.a.arete), true));
    out.push(poils(P, [[[-18 + dx, -44], [-10 + dx, -40]], [[-11 + dx, -47], [-5 + dx, -41]]]));
    const e = P(10 + dx, -28);
    out.push(h.cercle(...e, r1(3.4 * u1), blanc(h.a.detail)), h.cercle(e[0] + r1(0.6 * u1), e[1], r1(1.7 * u1), h.a.plein));
    return out.join('\n');
  };
  const X3 = [0, 165, 330], DY = 52;
  const vueOiseaux = z => {
    const s = Math.min((z.l - 10) / 560, (z.h - 4) / 540);
    const ox = z.l / 2 - 165 * s, oy = 94 * s;
    const P = (x, y) => [r1(ox + x * s), r1(oy + y * s)];
    const Pl = pts => pts.map(p => P(...p));
    const out = [];
    // les bretelles du sac, qui montent hors de la vue
    const yh = -oy / s;
    out.push(h.path(lisse(Pl([[-92, -74], [-80, (yh - 74) / 2], [-66, yh]])), h.a.arete), h.path(lisse(Pl([[-78, -76], [-66, (yh - 76) / 2], [-52, yh]])), h.a.arete));
    out.push(h.path(lisse(Pl([[422, -74], [410, (yh - 74) / 2], [396, yh]])), h.a.arete), h.path(lisse(Pl([[408, -76], [396, (yh - 76) / 2], [382, yh]])), h.a.arete));
    // le sac, ouvert : le bord de derrière et le bord de devant écartés
    const sac = [[-104, -76], [-114, 20], [-112, 120], [-92, 184], [-40, 206], [165, 212], [370, 206], [422, 184], [442, 120], [444, 20], [434, -76]];
    out.push(h.path(lisse(Pl(sac)), blanc(h.a.contour)));
    out.push(h.path(lisse(Pl([[-104, -76], [30, -90], [165, -93], [300, -90], [434, -76]])), h.a.contour));
    out.push(h.path(lisse(Pl([[-104, -76], [30, -66], [165, -63], [300, -66], [434, -76]])), h.a.contour));
    for (const x of [-70, 82, 248, 400]) out.push(h.path(lisse(Pl([[x, -40], [x + 6, 60], [x - 4, 160]])), h.a.fin));
    // le dedans du sac, entre les deux bords : le plan d'arrière, en gris
    out.push(h.path(lisse(Pl([[-104, -76], [30, -90], [165, -93], [300, -90], [434, -76]])) + ' ' + lisse(Pl([[434, -76], [300, -66], [165, -63], [30, -66], [-104, -76]])).replace(/^M/, 'L') + ' Z', h.a.loin));
    out.push(h.path(lisse(Pl([[-104, -76], [30, -90], [165, -93], [300, -90], [434, -76]])), h.a.contour));
    out.push(h.path(lisse(Pl([[-104, -76], [30, -66], [165, -63], [300, -66], [434, -76]])), h.a.contour));
    // la corde en travers du devant du sac, nouée aux deux coins
    out.push(F.corde(Pl([[-100, -58], [30, -50], [165, -48], [300, -50], [430, -58]]), { ep: 4.2 * s, debut: 'fixe', fin: 'fixe' }));
    X3.forEach((dx, i) => {
      // l'oiseau descend d'une hauteur de tête sous la corde : le brin se voit, à côté de la tête,
      // du nœud sur la corde jusqu'à la boucle serrée autour du cou, sous la tête
      const Pb = (x, y) => P(x, y + DY);
      out.push(oiseau(Pb, dx, i));
      out.push(F.corde(Pl([[dx - 34, -50], [dx - 33, -10], [dx - 24, DY - 6]]), { ep: 3.6 * s, debut: 'fixe', fin: 'fixe' }));
      out.push(F.corde(Pl([[dx - 24, DY - 6], [dx - 12, DY + 1], [dx + 4, DY + 3], [dx + 16, DY - 1]]), { ep: 3.6 * s, debut: 'fixe', fin: 'fixe' }));
      out.push(h.cercle(...P(dx - 34, -51), r1(4.2 * s), blanc(h.a.arete)));
    });
    // le point à vérifier : un vide entre deux oiseaux
    out.push(h.controle(...P(250, 180 + DY), r1(Math.max(9, 30 * s))));
    return { svg: out.join('\n'), P };
  };

  return {
    ref: '47-05',
    titre: 'Porter le petit gibier à l’air',
    desc: 'À gauche, un lièvre entier, non dépouillé, vu de dos, pendu tête en bas à un bâtonnet pointu aux deux bouts passé dans ses deux jarrets ; la main tient le bâtonnet entre les deux pattes. À droite, le jarret vu de côté : sous la peau, le tendon derrière et l’os devant, et le bâtonnet qui perce la peau dans le creux entre les deux, contre la pointe du jarret ; une flèche montre le sens où on le pousse. En bas, trois gélinottes pendues chacune par le cou à un brin noué sur une corde, à part les unes des autres, sur le devant d’un sac qu’on laisse ouvert. L’encadré danger dit de mettre les gants avant de ramasser le lièvre.',
    format: 'pleine',
    disposition: [['lievre', 'jarret'], ['oiseaux']],
    hauteurs: [5, 3],
    largeurs: [[1, 1], [1]],
    vues: {
      lievre: {
        titre: 'Le lièvre au bâtonnet',
        dessin: z => vueLievre(z).svg,
        renvois: z => {
          const P = vueLievre(z).P;
          return [
            { n: 1, rond: [P(-128, 0)[0], P(0, -58)[1]], cible: P(-134, 0), texte: 'pointu aux deux bouts' },
            { n: 2, rond: [P(124, 0)[0], P(0, 62)[1]], cible: P(81, 4), texte: 'entre le tendon et l’os' },
            { n: 3, rond: [P(118, 0)[0], P(0, 300)[1]], cible: P(60, 300), texte: 'entier, pendu hors du sac' },
          ];
        },
      },
      jarret: {
        titre: 'Le jarret, de côté',
        dessin: z => vueJarret(z).svg,
        renvois: z => {
          const P = vueJarret(z).P;
          return [
            { n: 4, rond: P(-44, -40), cible: P(-16, -9), texte: 'la pointe du jarret' },
            { n: 5, rond: P(-44, 70), cible: P(-12, 64), texte: 'le tendon, une corde dure' },
            { n: 6, rond: P(58, 104), cible: P(17, 100), texte: 'l’os' },
            { n: 7, rond: P(52, -36), cible: P(5, 10), texte: 'percer la peau dans le creux' },
          ];
        },
      },
      oiseaux: {
        titre: 'Les oiseaux, chacun à part',
        dessin: z => vueOiseaux(z).svg,
        renvois: z => {
          const P = vueOiseaux(z).P;
          return [
            { n: 8, rond: [P(-160, 0)[0], P(0, 40)[1]], cible: P(-14, 52), texte: 'pendu par le cou, à son brin' },
            { n: 9, rond: [P(247, 0)[0], P(0, 330)[1]], cible: P(250, 200 + DY), texte: 'un vide entre deux oiseaux' },
            { n: 10, rond: [P(495, 0)[0], P(0, -40)[1]], cible: P(437, -40), texte: 'le sac reste ouvert' },
          ];
        },
      },
    },
    danger: 'Les gants se mettent avant de ramasser le lièvre, pas avant de le dépouiller : le coup de feu met le sang dans la fourrure, et la tularémie entre par la moindre lésion aux mains.',
  };
};
