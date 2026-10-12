// Planche 24-14 — Le coussinet en beigne et l'ampoule percée au bord (ch. 24, étape 58 et
// « Le coussinet en beigne »).
// Rangée du haut : la petite ampoule fermée, au talon d'un pied droit vu de côté (face
// extérieure, orteils à droite) ; le détail grossi du coussinet posé et tenu par deux bandes de
// ruban ; la coupe prise sur le trait marqué dans le détail, vue d'en dessous : la peau en bas,
// le dehors en haut, et la botte qui appuie sur l'anneau.
// Rangée du bas : la grosse ampoule, en coupe, même échelle aux trois étapes.
// Mesures internes en mm, y vers le haut, peau à y = 0. Le chapitre ne donne aucune cote : il n'y
// en a pas sur la planche.
module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const trace = (Q, ferme = false) => 'M' + Q.map(pt).join(' L') + (ferme ? ' Z' : '');
  const rempli = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const BLANC = 'fill="#FFFFFF" stroke="none"';
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  let nid = 0;
  const clipCercle = (cx, cy, r, contenu) => {
    const id = `pl2414c${++nid}`;
    return `<clipPath id="${id}"><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}"/></clipPath><g clip-path="url(#${id})">${contenu}</g>`;
  };

  // Courbe lissée (Catmull-Rom) échantillonnée en polyligne.
  const courbe = (P, ferme = false, n = 8) => {
    const N = P.length, g = i => ferme ? P[((i % N) + N) % N] : P[Math.max(0, Math.min(N - 1, i))];
    const out = [], segs = ferme ? N : N - 1;
    for (let i = 0; i < segs; i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(j => 0.5 * (2 * p1[j] + (p2[j] - p0[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (3 * p1[j] - p0[j] - 3 * p2[j] + p3[j]) * t3)));
      }
    }
    if (!ferme) out.push(P[N - 1].slice());
    return out;
  };
  const vague = (x1, x2, y, amp, pas) => {           // ligne de rupture ondulée, en mm
    const n = Math.max(2, Math.round((x2 - x1) / pas)), Q = [];
    for (let i = 0; i <= n * 4; i++) { const x = x1 + (x2 - x1) * i / (n * 4); Q.push([x, y + amp * Math.sin(i * Math.PI / 2)]); }
    return Q;
  };

  // ─── le pied droit, face extérieure (repris de la 24-07), coupé au-dessus de la cheville ─
  const CONTOUR_PIED = courbe([
    [30.7, 150], [30, 145], [29, 112], [31, 95], [36, 84],
    [48, 74], [70, 63], [100, 52], [132, 42], [160, 33], [183, 27], [198, 22], [205, 16], [207, 9], [203, 3], [194, 0],
    [160, 0], [120, 1.5], [80, 2], [40, 1.5], [10, 0], [-25, 0], [-42, 2], [-54, 9], [-60, 22], [-59, 37],
    [-54, 52], [-47, 70], [-43, 95], [-42, 125], [-44.9, 150],
  ]);
  const RUPTURE_PIED = vague(-44.9, 30.7, 150, 2.2, 14).reverse();
  const ONGLE = courbe([[187, 21], [193, 19.5], [199, 17]]);

  // Le coussinet sur le talon (mm, repère du pied)
  const C = [-24, 36];                 // centre de l'ampoule
  const R_EXT = 20, R_INT = 9;         // le rond et son trou
  const AMP = [7.4, 6.6];              // l'ampoule, un peu ovale
  const BANDES = [[-17, -11], [11, 17]];   // deux bandes de ruban, le long de la jambe
  const L_BANDE = 25;                  // demi-longueur d'une bande
  const DETAIL = { c: [-30, 30], r: 34 };  // le rond du détail, sur le pied

  // Une bande de ruban déchirée aux deux bouts, en mm autour de C.
  const bande = (x1, x2, lg) => {
    const dents = (xa, xb, y, sgn) => { const Q = []; for (let i = 0; i <= 6; i++) Q.push([xa + (xb - xa) * i / 6, y + sgn * (i % 2 ? 0.9 : 0)]); return Q; };
    return [...dents(x1, x2, lg, 1), ...dents(x2, x1, -lg, -1)];
  };

  // Le coussinet, l'ampoule et les bandes en vue de face, dans un repère V (mm → vue)
  const coussinetFace = (V, s, fin) => {
    const c = V(C), out = [];
    const anneau = `M${f(c[0] - R_EXT * s)} ${f(c[1])} a${f(R_EXT * s)} ${f(R_EXT * s)} 0 1 0 ${f(2 * R_EXT * s)} 0 a${f(R_EXT * s)} ${f(R_EXT * s)} 0 1 0 ${f(-2 * R_EXT * s)} 0 Z ` +
      `M${f(c[0] - R_INT * s)} ${f(c[1])} a${f(R_INT * s)} ${f(R_INT * s)} 0 1 1 ${f(2 * R_INT * s)} 0 a${f(R_INT * s)} ${f(R_INT * s)} 0 1 1 ${f(-2 * R_INT * s)} 0 Z`;
    out.push(h.path(anneau, BLANC + ' fill-rule="evenodd"'));
    out.push(h.path(anneau, (fin ? h.a.hachure('isolant', 'detail') : h.a.hachure('isolant')) + ' fill-rule="evenodd"'));
    // l'ampoule dans le trou : un dôme, son reflet
    out.push(h.ellipse(c[0], c[1], AMP[0] * s, AMP[1] * s, rempli(fin ? h.a.detail : h.a.arete)));
    if (!fin) out.push(h.path(`M${f(c[0] - AMP[0] * s * 0.55)} ${f(c[1] - AMP[1] * s * 0.1)} Q${f(c[0] - AMP[0] * s * 0.5)} ${f(c[1] - AMP[1] * s * 0.55)} ${f(c[0] - AMP[0] * s * 0.05)} ${f(c[1] - AMP[1] * s * 0.62)}`, h.a.fin));
    for (const [x1, x2] of BANDES) {
      const Q = bande(x1, x2, L_BANDE).map(p => V(add(C, p)));
      out.push(h.path(trace(Q, true), rempli(fin ? h.a.detail : h.a.arete)));
      if (!fin) for (const k of [0.33, 0.67]) {
        const x = x1 + (x2 - x1) * k;
        const a = V(add(C, [x, -L_BANDE + 3])), b = V(add(C, [x, L_BANDE - 3]));
        out.push(h.ligne(a[0], a[1], b[0], b[1], h.a.fin));
      }
    }
    return out.join('\n');
  };

  const piedDessin = (V, s, trait) => [
    h.path(trace(CONTOUR_PIED.map(V).concat(RUPTURE_PIED.map(V)), true), BLANC),
    h.path(trace(CONTOUR_PIED.map(V)), trait),
    h.path(trace(RUPTURE_PIED.map(V)), h.a.detail),
    h.path(trace(ONGLE.map(V)), h.a.detail),
  ].join('\n');

  // Le pied, petit, en bas à gauche, vu en miroir (orteils à gauche, talon à droite) ; le détail
  // grossi dans un rond en haut à droite, en miroir lui aussi : le talon sous le rond.
  const geoTalon = z => {
    const s = Math.min((z.l * 0.48) / 267, (z.h * 0.5) / 160);
    const ox = 12 + 207 * s, oy = z.h - 12;
    const V = p => [ox - p[0] * s, oy - p[1] * s];
    const r = Math.min(z.h * 0.33, z.l * 0.27);
    const cx = z.l - r - 24, cy = r + 10, sd = r / DETAIL.r;
    const Vd = p => [cx - (p[0] - DETAIL.c[0]) * sd, cy - (p[1] - DETAIL.c[1]) * sd];
    return { s, V, r, cx, cy, sd, Vd };
  };

  // ─── la peau en coupe ─────────────────────────────────────────────────────────────────
  // x en mm depuis le centre de l'ampoule ; la peau en y = 0, le dehors en haut.
  //   a : demi-largeur de l'ampoule · H : hauteur du dôme · e : épaisseur de la peau du dessus
  //   D : profondeur de chair montrée · trou : x du trou d'aiguille (null : pas de trou)
  //   rides : la peau du dessus retombée, un peu froissée
  const peauCoupe = (V, { x1, x2, a, H, e, D, trou = null, rides = false, liquide = true }) => {
    const bosse = x => { const u = x / a; if (Math.abs(u) >= 1) return 0; return rides ? (0.3 + 0.22 * Math.sin(u * Math.PI * 3.2)) * Math.pow(1 - u * u, 0.6) : H * Math.pow(1 - u * u, 0.62); };
    const N = 90, xs = [];
    for (let i = 0; i <= N; i++) xs.push(x1 + (x2 - x1) * i / N);
    for (let i = 0; i <= 60; i++) xs.push(-a + 2 * a * i / 60);
    xs.sort((p, q) => p - q);
    const dessus = xs.map(x => [x, bosse(x)]);
    const dessous = xs.map(x => [x, Math.max(bosse(x) - e, -e)]);
    const out = [];
    const bas = vague(x1, x2, -e - D, 0.45, 5);
    // la chair
    out.push(h.path(trace([[x1, -e], [x2, -e], ...bas.slice().reverse()].map(V), true), BLANC));
    out.push(h.path(trace(bas.map(V)), h.a.detail));
    out.push(h.path(trace([[x1, -e], [x1, -e - D]].map(V)), h.a.fin), h.path(trace([[x2, -e], [x2, -e - D]].map(V)), h.a.fin));
    // la poche de liquide, sous la peau du dessus
    const poche = xs.filter(x => Math.abs(x) < a);
    if (liquide && H > 0) out.push(h.path(trace([...poche.map(x => [x, bosse(x) - e]), ...poche.slice().reverse().map(x => [x, -e])].map(V), true), h.a.hachure('eau', 'aucun')));
    // la peau du dessus : une bande
    out.push(h.path(trace([...dessus, ...dessous.slice().reverse()].map(V), true), BLANC));
    out.push(h.path(trace([[x1, 0], [x1, -e]].map(V)), h.a.fin), h.path(trace([[x2, 0], [x2, -e]].map(V)), h.a.fin));
    out.push(h.path(trace([[x1, -e], [x2, -e]].map(V)), h.a.detail));        // le fond : la chair
    out.push(h.path(trace(dessous.filter(p => Math.abs(p[0]) < a).map(V)), h.a.detail));
    out.push(h.path(trace(dessus.map(V)), h.a.arete));                       // la surface de la peau
    if (trou !== null) {                                                       // le trou d'aiguille
      const y = bosse(trou), g = 0.55;
      const A1 = V([trou - g, bosse(trou - g) + 0.4]), A2 = V([trou + g, bosse(trou + g) - e - 0.4]);
      out.push(h.path(trace([[trou - g, bosse(trou - g) + 0.3], [trou + g, bosse(trou + g) + 0.3], [trou + g, bosse(trou + g) - e - 0.3], [trou - g, bosse(trou - g) - e - 0.3]].map(V), true), BLANC));
      out.push(h.path(trace([[trou - g, bosse(trou - g)], [trou - g, bosse(trou - g) - e]].map(V)), h.a.fin));
      out.push(h.path(trace([[trou + g, bosse(trou + g)], [trou + g, bosse(trou + g) - e]].map(V)), h.a.fin));
      void A1; void A2; void y;
    }
    return { svg: out.join('\n'), bosse };
  };

  // L'aiguille à coudre : la pointe en P, dirigée selon l'angle ang (degrés, 0 = vers la droite,
  // positif vers le bas de la vue). En px de vue ; s px par mm.
  const aiguille = (P, ang, s) => {
    const L = 32, r = 0.55, pointe = 4.5;
    const c = Math.cos(ang * Math.PI / 180), sn = Math.sin(ang * Math.PI / 180);
    const Q = ([u, v]) => [P[0] - u * s * c - v * s * sn, P[1] - u * s * sn + v * s * c];   // u vers l'arrière, v à gauche
    const bord = [[0, 0], [pointe, r], [L - r, r]];
    for (let i = 1; i < 8; i++) { const t = Math.PI / 2 - Math.PI * i / 8; bord.push([L - r + r * Math.cos(t), r * Math.sin(t)]); }
    bord.push([L - r, -r], [pointe, -r]);
    const chas = [];
    for (let i = 0; i <= 12; i++) { const t = Math.PI * 2 * i / 12; chas.push([L - 3.2 + 1.4 * Math.cos(t), 0.2 * Math.sin(t)]); }
    return {
      svg: [h.path(trace(bord.map(Q), true), rempli(h.a.detail)), h.path(trace(chas.map(Q), true), h.a.fin)].join('\n'),
      Q,
    };
  };

  // Géométrie commune aux trois étapes du bas : même échelle.
  const AMP_G = { a: 10, H: 4.2, e: 1.1, D: 5 };
  const S_BAS = 5.6;
  const echelleBas = () => S_BAS;   // l'aiguille entière tient dans la première étape

  // ─── la vue en coupe du coussinet ─────────────────────────────────────────────────────
  const EP_ROND = 5, EP_RUBAN = 1.1, EP_TAMPON = 2.2, EP_COLLANT = 0.7;
  const geoCoupe = z => {
    const s = Math.min((z.l - 30) / 58, (z.h - 20) / 32);
    const ox = z.l / 2, oy = z.h / 2 + s * 5;
    return { s, V: p => [ox + p[0] * s, oy - p[1] * s] };
  };

  return {
    ref: '24-14',
    titre: 'Le coussinet en beigne et l’ampoule percée au bord',
    desc: 'En haut, la petite ampoule fermée au talon : un rond de feutre percé à sa taille, posé autour d’elle et tenu par deux bandes de ruban ; en coupe, le pansement passe par-dessus et la botte appuie sur l’anneau, pas sur l’ampoule. En bas, la grosse ampoule en coupe : l’aiguille piquée au bord, le liquide pressé dehors, la peau du dessus retombée en place sous le pansement.',
    format: 'pleine',
    disposition: [['talon', 'coupe'], ['percer'], ['presser', 'peau']],
    hauteurs: [2.5, 1.25, 1.35],
    largeurs: [[3, 2], [1], [1, 1]],
    vues: {
      talon: {
        titre: 'Petite et fermée : le coussinet en beigne',
        dessin: z => {
          const { s, V, r, cx, cy, sd, Vd } = geoTalon(z);
          const d = V(DETAIL.c), rd = DETAIL.r * s;
          // un trait du petit rond au grand, par derrière le talon
          const dx = cx - d[0], dy = cy - d[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
          const lien = h.ligne(d[0] + ux * rd, d[1] + uy * rd, cx - ux * r, cy - uy * r, h.a.fin);
          const yc = Vd(C)[1], demi = Math.sqrt(r * r - (yc - cy) * (yc - cy)), xa = cx - demi - 14, xb = cx + demi + 14;
          const fleche = x => [h.ligne(x, yc, x, yc - 12, h.a.arete), h.path(`M${f(x - 3.5)} ${f(yc - 8)} L${f(x + 3.5)} ${f(yc - 8)} L${f(x)} ${f(yc - 15)} Z`, h.a.plein)].join('\n');
          return [
            piedDessin(V, s, h.a.contour),
            coussinetFace(V, s, true),
            h.cercle(d[0], d[1], rd, h.a.cache),
            lien,
            h.cercle(cx, cy, r, BLANC),
            clipCercle(cx, cy, r, [
              h.path(trace(CONTOUR_PIED.map(Vd)), h.a.contour),
              coussinetFace(Vd, sd, false),
            ].join('\n')),
            h.cercle(cx, cy, r, h.a.arete),
            // le trait de coupe, vu d'en dessous
            h.ligne(xa, yc, xb, yc, h.a.fin + ' stroke-dasharray="10 3 2 3"'),
            h.ligne(xa, yc, xa + 8, yc, h.a.contour), h.ligne(xb - 8, yc, xb, yc, h.a.contour),
            fleche(xa + 4), fleche(xb - 4),
          ].join('\n');
        },
        renvois: z => {
          const { Vd, sd, r, cx, cy } = geoTalon(z);
          const c = Vd(C);
          return [
            { n: 1, rond: [cx - r - 32, cy - r * 0.62], cible: [c[0] - 2 * sd, c[1] - 14.5 * sd], texte: 'rond de feutre, carton double ou cuir mince' },
            { n: 2, rond: [cx - r - 32, cy + r * 0.3], cible: [c[0] - 8.6 * sd, c[1] + 2.4 * sd], texte: 'trou de la taille de l’ampoule, au centre' },
            { n: 3, rond: [cx - r * 0.12, cy + r + 26], cible: [c[0] - 2 * sd, c[1] + 2.5 * sd], texte: 'l’ampoule, qu’on laisse fermée' },
          ];
        },
      },
      coupe: {
        titre: 'En coupe, sur le trait marqué',
        dessin: z => {
          const { s, V } = geoCoupe(z);
          const out = [peauCoupe(V, { x1: -28.5, x2: 28.5, a: AMP[0] - 0.8, H: 2.3, e: 0.8, D: 6 }).svg];
          // les deux moitiés du rond de feutre
          for (const [xa, xb] of [[-R_EXT, -R_INT], [R_INT, R_EXT]]) {
            const Q = [[xa, 0], [xb, 0], [xb, EP_ROND], [xa, EP_ROND]].map(V);
            out.push(h.path(trace(Q, true), BLANC), h.path(trace(Q, true), h.a.hachure('isolant')));
          }
          // le ruban sur le rond
          for (const [xa, xb] of BANDES) out.push(h.path(trace([[xa, EP_ROND], [xb, EP_ROND], [xb, EP_ROND + EP_RUBAN], [xa, EP_ROND + EP_RUBAN]].map(V), true), rempli(h.a.detail)));
          // le pansement : le tampon de gaze, puis le collant qui retombe sur la peau
          const y0 = EP_ROND + EP_RUBAN, y1 = y0 + EP_TAMPON, y2 = y1 + EP_COLLANT;
          const tampon = [[-23, y0], [23, y0], [23, y1], [-23, y1]].map(V);
          out.push(h.path(trace(tampon, true), BLANC), h.path(trace(tampon, true), h.a.hachure('grillage', 'detail')));
          const collant = [[-27.8, 0], [-26.3, 0], [-23.6, y1], [23.6, y1], [26.3, 0], [27.8, 0], [27.8, EP_COLLANT], [26.9, EP_COLLANT], [24.1, y2], [-24.1, y2], [-26.9, EP_COLLANT], [-27.8, EP_COLLANT]];
          out.push(h.path(trace(collant.map(V), true), rempli(h.a.arete)));
          // la botte appuie : sur l'anneau, jamais sur l'ampoule
          for (const x of [-17.5, -11.5, 11.5, 17.5]) {
            const a = V([x, y2 + 10]), b = V([x, y2 + 1.2]);
            out.push(h.fleche(`M${f(a[0])} ${f(a[1])} L${f(b[0])} ${f(b[1])}`));
          }
          return out.join('\n');
        },
        renvois: z => {
          const { V } = geoCoupe(z);
          const y2 = EP_ROND + EP_RUBAN + EP_TAMPON + EP_COLLANT;
          return [
            { n: 4, rond: V([14, y2 + 11]), cible: V([14, EP_ROND + EP_RUBAN / 2]), texte: 'ruban qui tient le rond en place' },
            { n: 5, rond: V([27, y2 + 7]), cible: V([25.6, (EP_ROND + EP_RUBAN + EP_TAMPON) / 2 + 0.3]), texte: 'pansement par-dessus le tout' },
            { n: 6, rond: V([-25, y2 + 11]), cible: V([-17.5, y2 + 6]), texte: 'la botte n’appuie que sur l’anneau' },
          ];
        },
      },
      percer: {
        titre: 'Grosse : percer au bord',
        dessin: z => {
          const s = echelleBas(z), ox = z.l / 2 + 11.7 * s, oy = z.h * 0.58;
          const V = p => [ox + p[0] * s, oy - p[1] * s];
          const pc = peauCoupe(V, { x1: -40, x2: AMP_G.a + 5, ...AMP_G });
          const xt = -0.72 * AMP_G.a, yt = -AMP_G.e + 1.1;
          const ang = 13;
          const ag = aiguille(V([xt, yt]), ang, s);
          const f1 = ag.Q([27, -3.4]), f2 = ag.Q([15, -3.4]);
          return [pc.svg, ag.svg, h.fleche(`M${f(f1[0])} ${f(f1[1])} L${f(f2[0])} ${f(f2[1])}`)].join('\n');
        },
        renvois: z => {
          const s = echelleBas(z), ox = z.l / 2 + 11.7 * s, oy = z.h * 0.58;
          const V = p => [ox + p[0] * s, oy - p[1] * s];
          const ang = 13, c = Math.cos(ang * Math.PI / 180), sn = Math.sin(ang * Math.PI / 180);
          const P = V([-0.72 * AMP_G.a, -AMP_G.e + 1.1]);
          const Q = u => [P[0] - u * s * c, P[1] - u * s * sn];
          return [
            { n: 7, rond: add(Q(32), [-24, 8]), cible: Q(29), texte: 'aiguille passée au rouge dans la flamme' },
            { n: 8, rond: add(V([-0.95 * AMP_G.a, 0]), [8, -40]), cible: V([-0.93 * AMP_G.a, 1.2]), texte: 'le trou se fait au bord de l’ampoule' },
          ];
        },
      },
      presser: {
        titre: 'Presser doucement',
        dessin: z => {
          const s = echelleBas(z), ox = z.l / 2 + 1.5 * s, oy = z.h * 0.56;
          const V = p => [ox + p[0] * s, oy - p[1] * s];
          const trou = -0.93 * AMP_G.a;
          const pc = peauCoupe(V, { x1: -AMP_G.a - 8, x2: AMP_G.a + 5, ...AMP_G, H: AMP_G.H * 0.5, trou });
          const out = [pc.svg];
          // la goutte qui sort par le trou et coule sur la peau
          const g = courbe([[trou - 0.2, 0.25], [trou - 1.6, 1.3], [trou - 3.8, 1.25], [trou - 5.4, 0.4], [trou - 5.8, 0]]);
          out.push(h.path(trace([...g, [trou - 0.2, 0]].map(V), true), BLANC), h.path(trace([...g, [trou - 0.2, 0]].map(V), true), h.a.hachure('eau', 'aucun')));
          out.push(h.path(trace(g.map(V)), h.a.detail));
          // la pression, du côté opposé au trou
          const a = V([0.35 * AMP_G.a, AMP_G.H * 0.5 + 5.5]), b = V([0.35 * AMP_G.a, pc.bosse(0.35 * AMP_G.a) + 1.2]);
          out.push(h.fleche(`M${f(a[0])} ${f(a[1])} L${f(b[0])} ${f(b[1])}`));
          return out.join('\n');
        },
        renvois: z => {
          const s = echelleBas(z), ox = z.l / 2 + 1.5 * s, oy = z.h * 0.56;
          const V = p => [ox + p[0] * s, oy - p[1] * s];
          const trou = -0.93 * AMP_G.a;
          return [
            { n: 9, rond: add(V([0.35 * AMP_G.a, 0]), [40, -44]), cible: V([0.35 * AMP_G.a, AMP_G.H * 0.5 + 4]), texte: 'on presse doucement' },
            { n: 10, rond: add(V([trou - 3, 0]), [-30, -26]), cible: V([trou - 3, 0.6]), texte: 'le liquide sort par le trou' },
          ];
        },
      },
      peau: {
        titre: 'La peau du dessus reste',
        dessin: z => {
          const s = echelleBas(z), ox = z.l / 2, oy = z.h * 0.56;
          const V = p => [ox + p[0] * s, oy - p[1] * s];
          const a = AMP_G.a;
          const out = [peauCoupe(V, { x1: -a - 7.5, x2: a + 7.5, ...AMP_G, H: 0, rides: true, liquide: false, trou: -0.93 * a }).svg];
          const t0 = 0.9, t1 = t0 + EP_TAMPON, t2 = t1 + EP_COLLANT;
          const tampon = [[-a - 2, t0], [a + 2, t0], [a + 2, t1], [-a - 2, t1]].map(V);
          out.push(h.path(trace(tampon, true), BLANC), h.path(trace(tampon, true), h.a.hachure('grillage', 'detail')));
          const collant = [[-a - 6.8, 0], [-a - 4.4, 0], [-a - 2.6, t1], [a + 2.6, t1], [a + 4.4, 0], [a + 6.8, 0], [a + 6.8, EP_COLLANT], [a + 5, EP_COLLANT], [a + 3.1, t2], [-a - 3.1, t2], [-a - 5, EP_COLLANT], [-a - 6.8, EP_COLLANT]];
          out.push(h.path(trace(collant.map(V), true), rempli(h.a.arete)));
          return out.join('\n');
        },
        renvois: z => {
          const s = echelleBas(z), ox = z.l / 2, oy = z.h * 0.56;
          const V = p => [ox + p[0] * s, oy - p[1] * s];
          const a = AMP_G.a;
          return [
            { n: 11, rond: add(V([a + 7.5, 0]), [20, 22]), cible: V([0.3 * a, -0.35]), texte: 'peau du dessus laissée sur la chair vive' },
            { n: 12, rond: add(V([a + 7.5, 0]), [22, -30]), cible: V([a + 3.9, (0.9 + EP_TAMPON) / 2 + 0.2]), texte: 'vaseline et pansement, sur la peau lavée' },
          ];
        },
      },
    },
    danger: 'Danger — une ampoule chaude, pleine de pus vert ou jaune, rouge autour, est infectée : elle se soigne comme une plaie infectée, au chapitre 26.',
  };
};
