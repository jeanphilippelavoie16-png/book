// Planche 24-16 — La genouillère de peau nouée.
// Ch. 24, section 9, « La genouillère » : un carré de feutre épais, de peau de mouton ou de peau
// d'orignal pliée en trois, noué derrière le genou par deux lacets.
//
// Quatre temps : la bande de peau à plat et ses deux plis ; le carré plié, fendu, lacé, vu de
// face (le côté qui va au sol) ; la coupe A–A au lacet du haut, à plus grande échelle, pour lire
// les trois épaisseurs et le lacet qui les traverse ; la genouillère nouée sur la jambe debout
// et en usage, un genou au sol ; ce genou à la loupe, deux mains qui serrent le nœud du haut.
//
// Aucune cote : le chapitre ne donne aucune mesure. La peau est dessinée carrée une fois pliée
// (une bande trois fois plus longue que large), comme le dit le chapitre.
//
// Unités de la coupe et des vues portées : millimètres (côté du carré S = 200, épaisseur d'une
// peau t = 4,5) ; le personnage de la bibliothèque est en millimètres d'adulte.

module.exports = (h) => {
  const F = h.formes;
  const NOIR = (h.a.detail.match(/stroke="([^"]+)"/) || [])[1] || '#000';
  const f1 = v => Math.round(v * 10) / 10;

  // courbe lisse (Catmull-Rom) par des points
  const courbe = (pts, ferme = false) => {
    const n = pts.length, P = i => pts[ferme ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
    let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  // décalage d'une polyligne vers sa droite (sens de parcours), de d
  const decale = (pts, d) => pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
    return [p[0] + d * (-dy / L) * -1, p[1] + d * (dx / L) * -1];
  });
  const fente = (x, y, lg, ep = 1.8) => h.rect(x - ep / 2, y - lg / 2, ep, lg, h.a.plein);
  const pli = h.a.detail + ' stroke-dasharray="9 3 2 3"';

  // ── rangée du haut : même hauteur de carré à plat et plié ──
  const cote = zh => zh - 44;           // côté du carré plié, en unités de vue
  const Y0 = 34;                         // haut de la peau

  // ═══ Vue 1 : la bande à plat, ses deux plis ═══
  const plat = z => {
    const P = cote(z.h), x0 = (z.l - 3 * P) / 2, o = [];
    o.push(h.path(`M${f1(x0 + 3)} ${Y0} L${f1(x0 + 3 * P - 3)} ${Y0} Q${f1(x0 + 3 * P)} ${Y0} ${f1(x0 + 3 * P)} ${Y0 + 3} L${f1(x0 + 3 * P)} ${f1(Y0 + P - 3)} Q${f1(x0 + 3 * P)} ${f1(Y0 + P)} ${f1(x0 + 3 * P - 3)} ${f1(Y0 + P)} L${f1(x0 + 3)} ${f1(Y0 + P)} Q${f1(x0)} ${f1(Y0 + P)} ${f1(x0)} ${f1(Y0 + P - 3)} L${f1(x0)} ${Y0 + 3} Q${f1(x0)} ${Y0} ${f1(x0 + 3)} ${Y0} Z`, `fill="#fff" ${h.a.contour.replace('fill="none" ', '')}`));
    for (const k of [1, 2]) o.push(h.ligne(x0 + k * P, Y0 - 5, x0 + k * P, Y0 + P + 5, pli));
    // les deux bouts qui se rabattent sur le milieu
    o.push(h.fleche(`M${f1(x0 + 0.5 * P)} ${Y0 - 4} Q${f1(x0 + 0.95 * P)} ${Y0 - 34} ${f1(x0 + 1.4 * P)} ${Y0 - 6}`));
    o.push(h.fleche(`M${f1(x0 + 2.5 * P)} ${Y0 - 4} Q${f1(x0 + 2.05 * P)} ${Y0 - 34} ${f1(x0 + 1.6 * P)} ${Y0 - 6}`));
    return o.join('\n');
  };
  const platR = z => {
    const P = cote(z.h), x0 = (z.l - 3 * P) / 2;
    return [
      { n: 1, rond: [x0 - 17, Y0 + 0.5 * P], cible: [x0 + 0.3 * P, Y0 + 0.7 * P], texte: 'bande de peau d’orignal' },
      { n: 2, rond: [x0 + 3 * P + 17, Y0 + 0.5 * P], cible: [x0 + 2 * P, Y0 + 0.62 * P], texte: 'les deux bouts rabattus au milieu' },
    ];
  };

  // ═══ Vue 2 : plié, fendu, lacé (face qui va au sol) ═══
  const pli2 = z => {
    const P = cote(z.h), x0 = (z.l - P) / 2, o = [];
    const xa = x0 + 0.13 * P, xb = x0 + 0.87 * P, ys = [Y0 + 0.14 * P, Y0 + 0.86 * P], ep = 4.2;
    o.push(h.path(`M${f1(x0 + 4)} ${Y0} L${f1(x0 + P - 4)} ${Y0} Q${f1(x0 + P)} ${Y0} ${f1(x0 + P)} ${Y0 + 4} L${f1(x0 + P)} ${f1(Y0 + P - 4)} Q${f1(x0 + P)} ${f1(Y0 + P)} ${f1(x0 + P - 4)} ${f1(Y0 + P)} L${f1(x0 + 4)} ${f1(Y0 + P)} Q${f1(x0)} ${f1(Y0 + P)} ${f1(x0)} ${f1(Y0 + P - 4)} L${f1(x0)} ${Y0 + 4} Q${f1(x0)} ${Y0} ${f1(x0 + 4)} ${Y0} Z`, `fill="#fff" ${h.a.contour.replace('fill="none" ', '')}`));
    // les deux bords pliés : la peau tourne sur elle-même
    o.push(h.ligne(x0 + 3, Y0 + 5, x0 + 3, Y0 + P - 5, h.a.fin), h.ligne(x0 + P - 3, Y0 + 5, x0 + P - 3, Y0 + P - 5, h.a.fin));
    for (const y of ys) {
      // dessous la marge, entre le bord et la fente : caché
      o.push(h.ligne(x0, y - ep / 2, xa, y - ep / 2, h.a.cache), h.ligne(x0, y + ep / 2, xa, y + ep / 2, h.a.cache));
      o.push(h.ligne(xb, y - ep / 2, x0 + P, y - ep / 2, h.a.cache), h.ligne(xb, y + ep / 2, x0 + P, y + ep / 2, h.a.cache));
      // par-dessus, d'une fente à l'autre
      o.push(F.corde([[xa, y], [xb, y]], { ep, debut: 'ouvert', fin: 'ouvert' }));
      // dehors : vers l'arrière de la jambe
      o.push(F.corde([[x0 - 1, y], [x0 - 20, y]], { ep, debut: 'ouvert', fin: 'fixe' }));
      o.push(F.corde([[x0 + P + 1, y], [x0 + P + 20, y]], { ep, debut: 'ouvert', fin: 'fixe' }));
      o.push(fente(xa, y, 0.11 * P), fente(xb, y, 0.11 * P));
    }
    // le trait de coupe A–A, au lacet du haut, regardé vers le bas
    for (const xm of [x0 - 31, x0 + P + 31]) {
      const y = ys[0];
      o.push(h.ligne(xm - 6, y, xm + 6, y, h.a.contour));
      o.push(h.ligne(xm, y, xm, y + 12, h.a.detail));
      o.push(h.path(`M${f1(xm - 3.5)} ${f1(y + 8)} L${f1(xm)} ${f1(y + 14)} L${f1(xm + 3.5)} ${f1(y + 8)} Z`, h.a.plein));
      o.push(h.texte(xm, y - 6, 'A'));
    }
    return o.join('\n');
  };
  const pli2R = z => {
    const P = cote(z.h), x0 = (z.l - P) / 2;
    return [
      { n: 3, rond: [x0 + 0.5 * P, Y0 - 16], cible: [x0 + 0.5 * P, Y0 + 0.45 * P], texte: 'ou feutre, peau de mouton' },
      { n: 4, rond: [x0 - 14, Y0 + 0.55 * P], cible: [x0 + 0.13 * P, Y0 + 0.86 * P + 3], texte: 'fente près du bord' },
      { n: 5, rond: [x0 + P + 16, Y0 + 0.55 * P], cible: [x0 + 0.7 * P, Y0 + 0.86 * P], texte: 'deux lacets, haut et bas' },
    ];
  };

  // ═══ Vue 3 : coupe A–A, au lacet du haut ═══
  // y vers le bas : le côté genou en haut, le côté sol en bas. Le milieu de la bande est dessous ;
  // le bout de gauche se rabat le premier, celui de droite par-dessus.
  const S = 200, t = 4.5, g = 0.8, tl = 3.6;
  const gCoupe = z => {
    const k = Math.min((z.l - 150) / S, (z.h - 14) / 42);
    const X0 = (z.l - S * k) / 2, Y = (z.h - 40 * k) / 2 + 21 * k;
    const V = (x, y) => [X0 + k * x, Y + k * y];
    return { k, V };
  };
  const yc3 = t / 2, yc2 = t + g + t / 2, yc1 = 2 * (t + g) + t / 2;
  const rL = (yc1 - yc2) / 2, rR = (yc1 - yc3) / 2, xL = rL + t / 2, xR = S - rR - t / 2;
  const yH = -tl / 2 - 0.4, yB = yc1 + t / 2 + tl / 2 + 0.4, xf = 22;
  const coupe = z => {
    const { k, V } = gCoupe(z), o = [];
    const p = (x, y) => V(x, y).map(f1).join(' ');
    // la peau pliée, en noir : l'axe de la bande échantillonné, puis décalé de t/2 de chaque côté
    const axe = [];
    const droit = (a, b) => { const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 3)); for (let i = axe.length ? 1 : 0; i <= n; i++) axe.push([a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n]); };
    const arc = (c, r, a0, a1) => { for (let i = 1; i <= 24; i++) { const a = (a0 + (a1 - a0) * i / 24) * Math.PI / 180; axe.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]); } };
    droit([2, yc3], [xR, yc3]);
    arc([xR, (yc3 + yc1) / 2], rR, -90, 90);
    droit([xR, yc1], [xL, yc1]);
    arc([xL, (yc1 + yc2) / 2], rL, 90, 270);
    droit([xL, yc2], [xR + 1.2, yc2]);
    const bande = [...decale(axe, t / 2), ...decale(axe, -t / 2).reverse()].map(q => V(...q));
    o.push(h.chemin(bande, h.a.plein, true));
    // le lacet : du dessous (côté sol) d'une fente à l'autre ; de chaque fente, il remonte à
    // travers les trois épaisseurs et repart, côté genou, vers l'arrière de la jambe
    const yM = (yH + yB) / 2;
    const lacet = [[-34, -21], [-20, -9], [-6, yH], [xf - 7, yH], [xf, yM], [xf + 7, yB], [S / 2, yB],
      [S - xf - 7, yB], [S - xf, yM], [S - xf + 7, yH], [S + 6, yH], [S + 20, -9], [S + 34, -21]].map(q => V(...q));
    o.push(F.corde(lacet, { ep: tl * k, debut: 'fixe', fin: 'fixe' }));
    return o.join('\n');
  };
  const coupeR = z => {
    const { V } = gCoupe(z);
    const c = (x, y) => V(x, y);
    return [
      { n: 6, rond: [c(58, 0)[0], 14], cible: c(58, yc3), texte: 'trois épaisseurs de peau' },
      { n: 7, rond: [c(-22, 0)[0], z.h - 11], cible: c(xf, yM0), texte: 'le lacet tient le pli' },
    ];
  };
  const yM0 = (yH + yB) / 2;

  // ═══ Vues 4 et 5 : un genou au sol, et ce genou à la loupe ═══
  // ── La loupe : le genou au sol en gros plan, dessiné pour lui-même (millimètres, sol en y = 0,
  // le devant vers +x). Repère local : le centre du genou en KC ; le passage au repère du
  // personnage est (x − 58, y + 18). La cuisse monte presque droite, le tibia remonte vers le pied
  // en arrière ; la peau pliée enveloppe la rotule, de l'avant de la cuisse au dessous du tibia.
  // Deux mains serrent le nœud du haut, derrière la cuisse, au-dessus du creux du genou.
  const KC = [0, -76];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
  const tC = [-0.035, -0.999], fC = [0.999, -0.035];     // la cuisse : vers la hanche ; vers le devant
  const uT = [-0.985, -0.174], bT = [-0.174, 0.985];     // le tibia : vers le pied ; vers le dessous
  const cuisseAv = s => add(add(KC, mul(fC, 72 + s * 0.03)), mul(tC, s));
  const cuisseAr = s => add(add(KC, mul(fC, -72 - s * 0.03)), mul(tC, s));
  const tibiaDes = s => add(add(KC, mul(bT, 55)), mul(uT, s));
  const mollet = s => add(add(KC, mul(bT, -(62 + 14 * Math.exp(-(((s - 150) / 120) ** 2))))), mul(uT, s));
  // le contour de la jambe, du haut de la cuisse (devant) au haut de la cuisse (derrière)
  const JAMBE = [cuisseAv(420), cuisseAv(250), cuisseAv(110), [72, -60], [58, -30], [32, -15], [0, -14], [-30, -19],
    tibiaDes(60), tibiaDes(200), tibiaDes(420),
    mollet(420), mollet(260), mollet(160), [-104, -180], [-86, -190], cuisseAr(170), cuisseAr(270), cuisseAr(420)];
  // la peau : sa face dehors (14 mm d'épaisseur sur la jambe) et son bord sur le côté du genou
  const PEAU_DEHORS = [[86, -140], [85, -80], [74, -36], [48, -4], [10, 0], [-30, -4], [-62, -16], [-76, -20]];
  const PEAU_BORD = [[-62, -56], [-34, -52], [-4, -52], [24, -60], [40, -84], [44, -112], [44, -140]];
  // les lacets : la fente, le nœud, et les points par où ils font le tour de la jambe
  const N1 = [-94, -250], N2 = [-120, -180];
  const LAC1 = [[46, -130], [0, -180], [-52, -222], N1];
  const LAC2 = [[-56, -48], [-80, -110], [-104, -155], N2];
  // les deux mains : le point pincé, l'angle du modèle s09 en miroir (les pulpes vers le nœud,
  // l'avant-bras qui part à l'opposé)
  const MAINS = [
    { P: [-166, -338], angle: 76, sort: [-3, -6], mi: [-130, -296] },
    { P: [-192, -276], angle: -8, sort: [-8, -2], mi: [-142, -262] },
  ];
  const LCENTRE = [-120, -210], LRAYON = 290, LACET = 5;
  // Le genou au sol est la jambe « loin » de la posture 'genou' du personnage : genou (−58, −58),
  // le devant de la cuisse vers +x, le tibia qui remonte vers la cheville en arrière, le creux du
  // genou en (−160, −150). Le personnage est levé de LEVE mm : l'épaisseur de la peau sous le genou.
  // Les deux lacets font le tour du genou, l'un par-dessus la rotule, l'autre sous le haut du
  // tibia, et se nouent derrière, dans le creux.
  const EP = 12, LEVE = 8;
  const genouContour = [[-14, -135], [-12, -110], [-10, -86], [-8, -65], [-6, -40], [-10, -20], [-22, -7], [-35, -4], [-52, -7], [-75, -13], [-100, -22], [-128, -33]];
  const genouLateral = [[-39, -135], [-37, -108], [-35, -84], [-33, -62], [-34, -44], [-39, -34], [-48, -32], [-67, -37], [-91, -45], [-119, -56]];
  const genouDehors = decale(genouContour, EP);
  const uni = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); return [dx / L, dy / L]; };
  const pas = (p, u, t) => [p[0] + u[0] * t, p[1] + u[1] * t];
  const CENTRE = [-150, -150], RAYON = 200;   // le cercle de la loupe, dans le repère du personnage
  const SOUS = CENTRE[1] + RAYON - LEVE;   // ce que le cercle descend sous le sol
  // Le genou au sol est la jambe « loin » de la posture 'genou' du pictogramme : la cuisse droite,
  // la jambe couchée au sol vers l'arrière. Le personnage se pose une première fois pour lire où
  // tombe ce genou, puis se décale pour que le cercle de la loupe tienne dans la vue.
  const gPlace = z => {
    const e = Math.min((z.l - 12) / 1380, (z.h - 22) / 1340), sol = z.h - 6 - (LCENTRE[1] - KC[1] + LRAYON) * e + 61 * e;
    const k0 = F.personnage({ x: 0, y: sol, pose: 'genou', echelle: e }).genoux.loin;
    const dx = 6 + 720 * e - k0[0];       // la jambe couchée et le pied, derrière le genou
    const K = [k0[0] + dx, k0[1]];
    return { e, sol, ox: dx, oy: sol, K, V: (x, y) => [K[0] + e * x, K[1] + e * (y - KC[1])] };
  };
  const place = z => {
    const { e, sol, V, ox, oy } = gPlace(z), o = [];
    o.push(h.rect(6, sol, z.l - 12, 8, h.a.hachure('terre', 'aucun')), h.ligne(6, sol, z.l - 6, sol, h.a.arete));
    o.push(F.personnage({ x: ox, y: oy, pose: 'genou', echelle: e }));
    // la peau, en noir, de l'avant de la cuisse au-dessous du genou : à cette échelle, sa place
    o.push(h.path(courbe(PEAU_DEHORS.map(q => V(...q))), `fill="none" stroke="${NOIR}" stroke-width="${f1(14 * e + 1)}" stroke-linecap="round"`));
    // le cercle de la loupe
    o.push(h.cercle(...V(...LCENTRE), LRAYON * e, h.a.detail));
    return o.join('\n');
  };
  const gLoupe = z => {
    const R = Math.min(z.l, z.h) / 2 - 3, e = R / LRAYON, C = [z.l / 2, z.h / 2];
    const ox = C[0] - LCENTRE[0] * e, oy = C[1] - LCENTRE[1] * e;
    return { R, e, C, V: (x, y) => [ox + e * x, oy + e * y], sol: oy };
  };
  const loupe = z => {
    const { R, e, C, V, sol } = gLoupe(z), o = [];
    const bl = a => `fill="#fff" ${a.replace('fill="none" ', '')}`;
    const W = pts => pts.map(q => V(...q));
    const corde = (pts, fin) => F.corde(W(pts), { ep: LACET * e, debut: 'ouvert', fin });
    o.push(`<clipPath id="g1616-loupe"><circle cx="${f1(C[0])}" cy="${f1(C[1])}" r="${f1(R)}"/></clipPath>`);
    o.push(`<g clip-path="url(#g1616-loupe)">`);
    o.push(h.rect(0, sol, z.l, 14, h.a.hachure('terre', 'aucun')), h.ligne(0, sol, z.l, sol, h.a.arete));
    // la jambe
    o.push(h.path(courbe(W(JAMBE)), bl(h.a.contour)));
    // la peau : de sa face dehors, autour de la rotule, jusqu'à son bord sur le côté du genou
    o.push(h.path(courbe(W(PEAU_DEHORS)) + ' ' + courbe(W(PEAU_BORD)).replace(/^M/, 'L') + ' Z', bl(h.a.arete)));
    o.push(h.path(courbe(W(decale(PEAU_DEHORS, -5).slice(1, -1))), h.a.fin));
    // les lacets, de la fente au nœud, autour de la jambe
    o.push(corde(LAC1, 'ouvert'), corde(LAC2, 'ouvert'));
    for (const [p, q] of [[LAC1[0], LAC1[1]], [LAC2[0], LAC2[1]]]) {
      const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy), n = [-dy / L, dx / L];
      const a = V(p[0] + n[0] * 5, p[1] + n[1] * 5), b = V(p[0] - n[0] * 5, p[1] - n[1] * 5);
      o.push(h.ligne(...a, ...b, h.a.contour));
    }
    // le nœud du bas, fait : deux bouts qui pendent
    o.push(corde([[N2[0] - 4, N2[1] + 3], [N2[0] - 14, N2[1] + 20], [N2[0] - 16, N2[1] + 40]], 'coupe'));
    o.push(corde([[N2[0] + 2, N2[1] + 5], [N2[0] - 2, N2[1] + 22], [N2[0] - 1, N2[1] + 36]], 'coupe'));
    o.push(h.ellipse(...V(...N2), 9 * e, 7.5 * e, bl(h.a.detail)));
    // le nœud du haut : ses deux bouts montent aux mains qui le serrent
    for (const M of MAINS) o.push(corde([add(N1, M.sort), M.mi, M.P], 'ouvert'));
    o.push(h.ellipse(...V(...N1), 9 * e, 7.5 * e, bl(h.a.detail)));
    for (const M of MAINS) {
      const [px, py] = V(...M.P);
      // modèle s09 (le pouce et l'index qui pincent, de côté) en miroir : le bout du lacet entre les
      // deux pulpes ; le lacet s'est dessiné avant, la main le cache
      o.push(F.modele('s09', { x: px, y: py, ancre: [17, 66], miroir: true, angle: M.angle, echelle: e, masquer: [[200, 0, 230, 125]],
        bras: { a: [200, 64.1], a0: [185, 63.9], b: [200, 112.1], b0: [185, 108.4], bord: z } }));
    }
    // les flèches : chaque main tire son bout, loin du nœud
    // (à côté des mains calquées : l'une le long de l'avant-bras qui monte, l'autre au-dessus de celui qui part à gauche)
    o.push(h.fleche(`M${V(-116, -420).map(f1).join(' ')} L${V(-128, -462).map(f1).join(' ')}`));
    o.push(h.fleche(`M${V(-300, -332).map(f1).join(' ')} L${V(-356, -332).map(f1).join(' ')}`));
    o.push('</g>');
    o.push(h.cercle(C[0], C[1], R, h.a.detail));
    return o.join('\n');
  };
  const loupeR = z => {
    const { V, R, C } = gLoupe(z);
    return [
      { n: 8, rond: [C[0] + R * 0.3, C[1] - R * 0.8], cible: V(N1[0] + 4, N1[1] - 4), texte: 'nœud du haut, serré à deux mains' },
      { n: 9, rond: [C[0] - R * 0.5, C[1] + R * 0.55], cible: V(N2[0] - 6, N2[1] + 12), texte: 'nœud du bas, derrière le genou' },
      { n: 10, rond: [C[0] + R * 0.78, C[1] + R * 0.12], cible: V(62, -30), texte: 'la peau entre genou et sol' },
    ];
  };

  return {
    ref: '24-16',
    titre: 'La genouillère de peau nouée',
    desc: 'Une bande de peau d’orignal pliée en trois en un carré, fendue près des bords, tenue par deux lacets noués derrière la jambe, l’un au-dessus du pli du genou, l’autre dessous. À plat avec ses deux plis ; pliée, fendue et lacée, vue du côté qui va au sol ; en coupe au lacet du haut, les trois épaisseurs traversées par le lacet ; un genou au sol, la peau entre le genou et le sol ; et ce genou à la loupe, deux mains qui serrent le nœud du haut derrière la cuisse, le nœud du bas déjà fait au creux du genou.',
    format: 'pleine',
    disposition: [['plat', 'plie'], ['coupe'], ['place', 'loupe']],
    hauteurs: [1.1, 0.72, 2.4],
    largeurs: [[2.1, 1.15], [1], [1, 1.3]],
    vues: {
      plat: { titre: 'La peau d’orignal à plat', dessin: plat, renvois: platR },
      plie: { titre: 'Pliée en trois, fendue, lacée', dessin: pli2, renvois: pli2R },
      coupe: { titre: 'Coupe A–A, agrandie', dessin: coupe, renvois: coupeR },
      place: { titre: 'Un genou au sol', dessin: place },
      loupe: { titre: 'Le même genou, à la loupe', dessin: loupe, renvois: loupeR },
    },
  };
};
