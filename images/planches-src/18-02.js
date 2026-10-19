// Planche 18-02. Refroidir la marmite dans une auge de neige.
// Le texte : ch. 18, section 7, « Refroidir vingt litres sans réfrigérateur » : « On creuse une auge dans la neige
// tassée et on y couche ce qu'on a de plus large et de plus plat : plats à rôtir, tôles, couvercles de chaudières,
// gamelles. On y verse une couche mince, on brasse deux ou trois fois, et on remplace la neige mouillée par de la
// neige sèche à mesure qu'elle fond : de la neige fondue autour d'un plat fait un bain tiède. On pose un panneau
// lesté par-dessus, contre les animaux (planche 18-02). »
//
// Deux vues, les repères dans l'ordre des gestes du texte (1 à 6).
//   De biais : l'auge vue d'en haut et de devant, coupée en long pour qu'on voie le fond. Trois plats couchés au
//   fond (un plat à rôtir à anses, une tôle, un couvercle de chaudière retourné), une couche de ragoût dans chacun.
//   Une cuillère de bois dans le plat à rôtir, la flèche rouge du brassage autour (repère 4). Autour de la tôle, la
//   neige a fondu : l'eau en bleu (repère 5) ; on la remplace par de la neige sèche prise sur le bord (la flèche
//   rouge, du tas de neige sèche au monticule posé contre la tôle).
//   En coupe : l'auge coupée en travers au plat à rôtir. Le ragoût en couche mince (repère 3), le panneau posé sur
//   les deux bords de l'auge, une bûche dessus (repère 6).
// Aucune cote : le texte n'en donne aucune (règle 1). Les plats et la bûche donnent l'échelle.
// Aucune main : le brassage se lit par la cuillère et sa flèche, le renvoi dit le geste.
// Les dimensions des objets (en cm, pour les proportions seulement, jamais imprimées) : plat à rôtir 45 × 28 × 6,
// tôle 48 × 34 × 2, couvercle de chaudière de 32 de diamètre, auge de 48 de large et 18 de creux.
// La charte : neige coupée en pointillé ; en gris d'ombre, les faces tournées vers la droite (lumière en haut à
// gauche) : la paroi gauche de l'auge, le flanc droit du bloc, le flanc droit des plats ; en gris clair, le ragoût ;
// l'eau par la hachure « eau » seulement. Deux rouges, les deux gestes : brasser, et rapporter de la neige sèche.
module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const P = pts => pts.map(p => [f(p[0]), f(p[1])]);
  const blancSans = 'fill="#FFFFFF" stroke="none"';
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const RAD = Math.PI / 180;

  // ── géométrie plane ──────────────────────────────────────────────────────────────────
  const aire = pts => pts.reduce((s, p, i) => { const q = pts[(i + 1) % pts.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0) / 2;
  const enveloppe = pts => {
    const ps = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const bas = [], haut = [];
    for (const p of ps) { while (bas.length >= 2 && cr(bas[bas.length - 2], bas[bas.length - 1], p) <= 0) bas.pop(); bas.push(p); }
    for (const p of ps.slice().reverse()) { while (haut.length >= 2 && cr(haut[haut.length - 2], haut[haut.length - 1], p) <= 0) haut.pop(); haut.push(p); }
    return bas.slice(0, -1).concat(haut.slice(0, -1));
  };
  // découpe d'un polygone par un polygone convexe (Sutherland-Hodgman)
  const decoupe = (sujet, coupe) => {
    const sens = aire(coupe) > 0 ? 1 : -1;
    const dedans = (a, b, p) => sens * ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) >= 0;
    const inter = (a, b, p, q) => {
      const d = (a[0] - b[0]) * (p[1] - q[1]) - (a[1] - b[1]) * (p[0] - q[0]);
      const t = ((a[0] - p[0]) * (p[1] - q[1]) - (a[1] - p[1]) * (p[0] - q[0])) / d;
      return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
    };
    let sortie = sujet;
    for (let i = 0; i < coupe.length && sortie.length; i++) {
      const a = coupe[i], b = coupe[(i + 1) % coupe.length], entree = sortie;
      sortie = [];
      for (let j = 0; j < entree.length; j++) {
        const p = entree[j], q = entree[(j + 1) % entree.length];
        const pIn = dedans(a, b, p), qIn = dedans(a, b, q);
        if (pIn) sortie.push(p);
        if (pIn !== qIn) sortie.push(inter(p, q, a, b));
      }
    }
    return sortie;
  };

  // ── contours dans le plan horizontal (X vers la droite, Y vers le fond), sens trigonométrique ──
  const arrondi = (x0, y0, x1, y1, r, n = 5) => {
    const out = [];
    const coins = [[x1 - r, y0 + r, -90], [x1 - r, y1 - r, 0], [x0 + r, y1 - r, 90], [x0 + r, y0 + r, 180]];
    for (const [cx, cy, a0] of coins) for (let k = 0; k <= n; k++) {
      const a = (a0 + 90 * k / n) * RAD;
      out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    return out;
  };
  const rond = (cx, cy, r, n = 48) => Array.from({ length: n }, (_, k) => [cx + r * Math.cos(2 * Math.PI * k / n), cy + r * Math.sin(2 * Math.PI * k / n)]);
  // un tas de neige : le contour fermé, à l'écran ; les bords tournés vers le haut se bossellent en festons
  const bossele = (pts, amp = 2.2, pas = 9) => {
    const sens = aire(pts) > 0 ? 1 : -1;
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 1) % pts.length];
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
      const nx = sens * dy / L, ny = -sens * dx / L;          // normale vers l'extérieur
      if (ny > -0.35) { d += ` L${f(b[0])} ${f(b[1])}`; continue; }
      const k = Math.max(1, Math.round(L / pas));
      for (let j = 0; j < k; j++) {
        const t0 = j / k, t1 = (j + 1) / k, tm = (t0 + t1) / 2, ampj = amp * (0.75 + 0.5 * Math.abs(Math.sin(i * 1.9 + j * 2.7)));
        const c = [a[0] + dx * tm + nx * ampj * 2, a[1] + dy * tm + ny * ampj * 2];
        d += ` Q${f(c[0])} ${f(c[1])} ${f(a[0] + dx * t1)} ${f(a[1] + dy * t1)}`;
      }
    }
    return d + ' Z';
  };
  const neigeTas = d => [h.path(d, blancSans), h.path(d, h.a.hachure('neige', 'aucun')), h.path(d, h.a.arete)];

  // ════ La vue de biais ════════════════════════════════════════════════════════════════
  // Projection oblique : X garde sa longueur, la profondeur Y monte et glisse un peu à droite, la hauteur Z est
  // raccourcie (on regarde d'en haut). Ce qu'on voit : les faces avant, le dessus, les faces de droite.
  const KX = 0.22, KY = 0.92, KZ = 0.74;
  const VUE = [-KX, 1, -KY / KZ];                        // le sens du regard : une face est vue si sa normale s'y oppose
  const AUGE = { x0: 0, x1: 158, y1: 48, fond: -18 };     // l'auge, coupée en long à Y = 0
  const BLOC = { x0: -6, x1: 166, y1: 62, bas: -27 };     // le bloc de neige tassée

  const biais = z => {
    const S = 1.9;
    const OX = z.l - 6 - S * (BLOC.x1 + KX * BLOC.y1);
    const OY = z.h - 4 - S * KZ * (-BLOC.bas);
    const p3 = (X, Y, Z) => [OX + S * (X + KX * Y), OY - S * (KZ * Z + KY * Y)];
    const pz = (pts, Z) => pts.map(([X, Y]) => p3(X, Y, Z));
    const out = [];

    // ── l'intérieur de l'auge : le fond, la paroi du fond, la paroi de gauche (à l'ombre) ──
    const { x0, x1, y1, fond } = AUGE;
    out.push(h.chemin(P([p3(x0, 0, fond), p3(x1, 0, fond), p3(x1, y1, fond), p3(x0, y1, fond)]), blancSans, true));
    out.push(h.chemin(P([p3(x0, y1, fond), p3(x1, y1, fond), p3(x1, y1, 0), p3(x0, y1, 0)]), blancSans, true));
    out.push(h.chemin(P([p3(x0, 0, fond), p3(x0, y1, fond), p3(x0, y1, 0), p3(x0, 0, 0)]), h.a.ombre, true));
    out.push(h.chemin(P([p3(x0, y1, fond), p3(x1 + 10, y1, fond)]), h.a.arete));
    out.push(h.chemin(P([p3(x0, 0, fond), p3(x0, y1, fond)]), h.a.arete));

    // ── l'eau de fonte autour de la tôle : un bain tiède ──
    const flaque = arrondi(53, 2.5, 111, 46, 7, 6).map(([X, Y], i) => [X + 1.2 * Math.sin(i * 1.7), Y + 0.8 * Math.cos(i * 2.3)]);
    out.push(h.chemin(P(pz(flaque, fond)), h.a.hachure('eau', 'detail'), true));

    // ── un plat : le bord, le fond, le niveau du ragoût ──
    // haut et bas : deux contours de même nombre de points (le haut plus large : la paroi s'évase)
    const plat = ({ haut, bas, zh, zb, zr, morceaux = [], anses = null }) => {
      const T = pz(haut, zh), B = pz(bas, zb);
      const t = (zr - zb) / (zh - zb);
      const ragout = haut.map((p, i) => [bas[i][0] + (p[0] - bas[i][0]) * t, bas[i][1] + (p[1] - bas[i][1]) * t]);
      const R = pz(ragout, zr);
      const coque = enveloppe(T.concat(B));
      const res = [];
      res.push(h.chemin(P(coque), blancSans, true));
      // les parois vues de l'extérieur, et celles de l'intérieur au-dessus du ragoût
      const ombresExt = [], ombresInt = [];
      for (let i = 0; i < haut.length; i++) {
        const j = (i + 1) % haut.length;
        const e1 = [haut[j][0] - haut[i][0], haut[j][1] - haut[i][1], 0];
        const e2 = [bas[i][0] - haut[i][0], bas[i][1] - haut[i][1], zb - zh];
        let n = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
        if (n[0] * e1[1] - n[1] * e1[0] < 0) n = n.map(v => -v);          // normale vers l'extérieur
        const lxy = Math.hypot(n[0], n[1]) || 1;
        const vu = n[0] * VUE[0] + n[1] * VUE[1] + n[2] * VUE[2] < 0;
        if (vu && n[0] / lxy > 0.45) ombresExt.push([T[i], T[j], B[j], B[i]]);
        if (!vu && n[0] / lxy < -0.45) ombresInt.push([T[i], T[j], R[j], R[i]]);
      }
      ombresExt.forEach(q => res.push(h.chemin(P(q), h.a.ombre, true)));
      res.push(h.chemin(P(T), blancSans, true));
      ombresInt.forEach(q => { const c = decoupe(q, T); if (c.length > 2) res.push(h.chemin(P(c), h.a.ombre, true)); });
      const surface = decoupe(R, T);
      if (surface.length > 2) res.push(h.chemin(P(surface), blanc(h.a.detail).replace('#FFFFFF', '#E6E6E6'), true));
      // les morceaux du ragoût, à plat sur la surface
      for (const [mx, my, mr, k] of morceaux) {
        const forme = [[-1, 0.2], [-0.5, -0.9], [0.6, -0.8], [1, 0.1], [0.4, 0.9], [-0.6, 0.8]]
          .map(([u, v]) => { const a = k * 1.1; return [mx + mr * (u * Math.cos(a) - v * Math.sin(a)), my + mr * (u * Math.sin(a) + v * Math.cos(a))]; });
        res.push(h.chemin(P(pz(forme, zr)), blanc(h.a.detail), true));
      }
      res.push(h.chemin(P(T), h.a.arete, true));
      res.push(h.chemin(P(coque), h.a.contour, true));
      if (anses) res.push(...anses(p3));
      return { svg: res, T, R, p3 };
    };

    // le plat à rôtir, à anses
    const pr = { x0: 5, x1: 50, y0: 9, y1: 37 };
    const anse = (xa, sens) => p => {
      const zA = fond + 5.4, ext = sens * 4.5;
      const dehors = [[xa, 18], [xa + ext * 0.7, 18.4], [xa + ext, 20.5], [xa + ext, 25.5], [xa + ext * 0.7, 27.6], [xa, 28]];
      const dedans = [[xa, 19.6], [xa + ext * 0.55, 19.9], [xa + ext * 0.72, 21.4], [xa + ext * 0.72, 24.6], [xa + ext * 0.55, 26.1], [xa, 26.4]];
      const boucle = dehors.concat(dedans.slice().reverse()).map(([X, Y]) => p(X, Y, zA));
      return [h.chemin(P(boucle), blanc(h.a.arete), true)];
    };
    const platRotir = plat({
      haut: arrondi(pr.x0, pr.y0, pr.x1, pr.y1, 4), bas: arrondi(pr.x0 + 2.5, pr.y0 + 2.5, pr.x1 - 2.5, pr.y1 - 2.5, 2.5),
      zh: fond + 6, zb: fond, zr: fond + 2.5,
      morceaux: [[14, 30, 1.6, 1], [22, 31, 1.3, 3], [37, 30, 1.5, 2], [43, 23, 1.4, 5], [12, 21, 1.3, 4], [41, 15, 1.2, 0]],
      anses: p => [...anse(pr.x0, -1)(p), ...anse(pr.x1, 1)(p)],
    });
    out.push(...platRotir.svg);

    // la cuillère de bois, et le brassage
    const zr1 = fond + 2.5;
    const emerge = [26.5, 21.5, zr1];                       // où le manche sort du ragoût
    const bout = [40, 33, 13];
    const a = p3(...emerge), b = p3(...bout);
    const dir = [b[0] - a[0], b[1] - a[1]], L = Math.hypot(...dir), u = [dir[0] / L, dir[1] / L], nn = [-u[1], u[0]];
    const demi = 2.4;
    const manche = [[a[0] + nn[0] * demi, a[1] + nn[1] * demi], [b[0] + nn[0] * demi * 1.2, b[1] + nn[1] * demi * 1.2],
      [b[0] + u[0] * 2 + nn[0] * demi * 0.8, b[1] + u[1] * 2 + nn[1] * demi * 0.8], [b[0] + u[0] * 2.9, b[1] + u[1] * 2.9],
      [b[0] + u[0] * 2 - nn[0] * demi * 0.8, b[1] + u[1] * 2 - nn[1] * demi * 0.8],
      [b[0] - nn[0] * demi * 1.2, b[1] - nn[1] * demi * 1.2], [a[0] - nn[0] * demi, a[1] - nn[1] * demi]];
    const ombreManche = [manche[0], manche[1], [b[0] + nn[0] * demi * 0.1, b[1] + nn[1] * demi * 0.1], [a[0] + nn[0] * demi * 0.1, a[1] + nn[1] * demi * 0.1]];
    out.push(h.chemin(P(manche), blancSans, true), h.chemin(P(ombreManche), h.a.ombre, true), h.chemin(P(manche), h.a.arete, true));
    // le ragoût remue autour du manche, là où il sort
    out.push(h.ellipse(a[0], a[1] + 0.6, demi * 1.9, demi * 0.9, h.a.detail));
    // la flèche du brassage : un cercle sur la surface du ragoût, autour du manche
    const rB = 11, arc = [];
    for (let k = 0; k <= 36; k++) {
      const t = (205 + 285 * k / 36) * RAD;
      arc.push(p3(emerge[0] + rB * Math.cos(t), emerge[1] + rB * 0.78 * Math.sin(t), zr1));
    }
    const dArc = 'M' + arc.map(p => `${f(p[0])} ${f(p[1])}`).join(' L');
    out.push(h.geste(dArc));

    // la tôle, dans son eau de fonte
    const tl = { x0: 57, x1: 105, y0: 7, y1: 41 };
    const tole = plat({
      haut: arrondi(tl.x0, tl.y0, tl.x1, tl.y1, 1.6), bas: arrondi(tl.x0 + 0.7, tl.y0 + 0.7, tl.x1 - 0.7, tl.y1 - 0.7, 1.2),
      zh: fond + 2, zb: fond, zr: fond + 1,
      morceaux: [[66, 33, 1.5, 2], [76, 35, 1.3, 4], [92, 34, 1.5, 1], [99, 26, 1.3, 3], [84, 24, 1.4, 0], [66, 21, 1.2, 5], [92, 15, 1.2, 2]],
    });
    out.push(...tole.svg);

    // la neige sèche, tassée contre la tôle à la place de la neige mouillée
    const mont = [];
    for (const [Y, zt, l] of [[3.5, -14.8, 0], [10, -13.6, 0.6], [18, -12.6, -0.4], [27, -13.1, 0.5], [36, -12.9, -0.3], [44, -14.6, 0]]) {
      mont.push([106 + l, Y, fond], [120.5 + l, Y, fond], [109 + l, Y, zt + 0.8], [113 + l, Y, zt], [117 + l, Y, zt + 0.7]);
    }
    out.push(...neigeTas(bossele(enveloppe(mont.map(p => p3(...p))), 1.6, 7)));

    // le couvercle de chaudière, retourné
    const cv = { cx: 137, cy: 24, r: 16 };
    const couvercle = plat({
      haut: rond(cv.cx, cv.cy, cv.r), bas: rond(cv.cx, cv.cy, cv.r - 0.5),
      zh: fond + 2.5, zb: fond, zr: fond + 1.1,
      morceaux: [[131, 33, 1.4, 1], [140, 34, 1.3, 3], [146, 27, 1.5, 0], [128, 23, 1.3, 2], [138, 17, 1.2, 4]],
    });
    out.push(...couvercle.svg);

    // ── le bloc de neige tassée : le dessus, la coupe en long, le flanc droit ──
    const B = BLOC;
    const dessus = [[B.x0, 0], [x0, 0], [x0, y1], [x1, y1], [x1, 0], [B.x1, 0], [B.x1, B.y1], [B.x0, B.y1]].map(([X, Y]) => p3(X, Y, 0));
    const coupe = [[B.x0, 0], [x0, 0], [x0, fond], [x1, fond], [x1, 0], [B.x1, 0], [B.x1, B.bas], [B.x0, B.bas]].map(([X, Z]) => p3(X, 0, Z));
    const flanc = [p3(B.x1, 0, 0), p3(B.x1, B.y1, 0), p3(B.x1, B.y1, B.bas), p3(B.x1, 0, B.bas)];
    out.push(h.chemin(P(dessus), blancSans, true));
    out.push(h.chemin(P(flanc), h.a.ombre, true), h.chemin(P(flanc), h.a.hachure('neige', 'aucun'), true));
    out.push(h.chemin(P(coupe), blancSans, true), h.chemin(P(coupe), h.a.hachure('neige', 'aucun'), true));
    // les arêtes
    out.push(h.chemin(P([p3(x0, 0, 0), p3(x0, y1, 0), p3(x1, y1, 0), p3(x1, 0, 0)]), h.a.arete));
    out.push(h.chemin(P([p3(B.x1, 0, 0), p3(B.x1, B.y1, 0)]), h.a.arete));
    out.push(h.chemin(P([p3(B.x1, 0, 0), p3(B.x1, 0, B.bas)]), h.a.arete));
    out.push(h.chemin(P([p3(B.x0, 0, 0), p3(x0, 0, 0)]), h.a.arete), h.chemin(P([p3(x1, 0, 0), p3(B.x1, 0, 0)]), h.a.arete));
    out.push(h.chemin(P([p3(x0, 0, 0), p3(x0, 0, fond), p3(x1, 0, fond), p3(x1, 0, 0)]), h.a.contour));
    out.push(h.chemin(P([p3(B.x0, 0, B.bas), p3(B.x0, 0, 0), p3(B.x0, B.y1, 0), p3(B.x1, B.y1, 0), p3(B.x1, B.y1, B.bas), p3(B.x1, 0, B.bas), p3(B.x0, 0, B.bas)]), h.a.contour, true));

    // ── le tas de neige sèche sur le bord, et le geste : en prendre pour remplacer la neige mouillée ──
    const tas = { cx: 120, cy: 55, rx: 17, ry: 5.5, ht: 10 };
    const pied = [], dos = [];
    for (let k = 0; k <= 8; k++) {
      const uu = -1 + 2 * k / 8, w = Math.sqrt(Math.max(0, 1 - uu * uu));
      pied.push(p3(tas.cx + tas.rx * uu, tas.cy - tas.ry * w, 0));
    }
    for (let k = 8; k >= 0; k--) {
      const uu = -1 + 2 * k / 8, w = Math.sqrt(Math.max(0, 1 - uu * uu));
      dos.push(p3(tas.cx + tas.rx * uu * 0.93, tas.cy + 1, tas.ht * Math.pow(w, 0.8)));
    }
    out.push(...neigeTas(bossele(pied.concat(dos), 2.2, 8)));
    const g0 = p3(tas.cx - 9, tas.cy, 9), g1 = p3(113, 26, -12);
    const gc = [g0[0] - 34, g0[1] + 4];
    out.push(h.geste(`M${f(g0[0])} ${f(g0[1])} Q${f(gc[0])} ${f(gc[1])} ${f(g1[0])} ${f(g1[1] - 3)}`));

    return {
      svg: out.join('\n'),
      p3,
      reperes: {
        auge: p3(x0, 0, fond * 0.45),
        plat: p3(30, pr.y1, fond + 6),
        brasser: arc[30],
        mouillee: p3(80, 44, fond),
        geste: [g1[0], g1[1] - 3],
      },
    };
  };

  // ════ La coupe en travers, au plat à rôtir ══════════════════════════════════════════
  const coupe = z => {
    const s = 2.62;
    const Y0 = -9, Y1 = 57, BAS = -28;
    const OX = (z.l - s * (Y1 - Y0)) / 2 - s * Y0;
    const OY = z.h - 4 + s * BAS;
    const q = (Y, Z) => [OX + s * Y, OY - s * Z];
    const out = [];
    const fond = AUGE.fond, l = AUGE.y1;
    // la neige coupée
    const neige = [[Y0, 0], [0, 0], [0, fond], [l, fond], [l, 0], [Y1, 0], [Y1, BAS], [Y0, BAS]].map(([Y, Z]) => q(Y, Z));
    out.push(h.chemin(P(neige), h.a.hachure('neige', 'aucun'), true));
    out.push(h.chemin(P([q(Y0, 0), q(0, 0), q(0, fond), q(l, fond), q(l, 0), q(Y1, 0)]), h.a.contour));
    out.push(h.chemin(P([q(Y1, 0), q(Y1, BAS), q(Y0, BAS), q(Y0, 0)]), h.a.arete));
    // le plat à rôtir, coupé : la tôle du plat en trait fort, le ragoût en gris clair
    const ph = { a: 10, b: 38, z: fond + 6 }, pb = { a: 12.5, b: 35.5 };
    const zr = fond + 2.5, t = 2.5 / 6;
    const ra = pb.a + (ph.a - pb.a) * t, rb = pb.b + (ph.b - pb.b) * t;
    const rag = [q(pb.a, fond), q(pb.b, fond), q(rb, zr), q(ra, zr)];
    out.push(h.chemin(P(rag), blanc(h.a.detail).replace('#FFFFFF', '#E6E6E6'), true));
    for (const [y, w] of [[16, 1.5], [21.5, 1.2], [27, 1.6], [32, 1.2]]) {
      out.push(h.chemin(P([q(y - w, zr - 0.2), q(y - w * 0.6, zr + 0.9), q(y + w * 0.5, zr + 1), q(y + w, zr - 0.2)]), blanc(h.a.detail)));
    }
    out.push(h.chemin(P([q(ph.a - 1, ph.z + 0.4), q(ph.a, ph.z), q(pb.a, fond), q(pb.b, fond), q(ph.b, ph.z), q(ph.b + 1, ph.z + 0.4)]), h.a.contour));
    // le panneau, posé sur les deux bords de l'auge, et la bûche qui le leste
    const pan = { a: -5, b: 53, ep: 2.4 };
    out.push(h.chemin(P([q(pan.a, 0), q(pan.b, 0), q(pan.b, pan.ep), q(pan.a, pan.ep)]), h.a.hachure('bois', 'contour'), true));
    const rb2 = 8.2, cb = q(24, pan.ep + rb2), R = rb2 * s;
    out.push(h.cercle(cb[0], cb[1], R, blancSans));
    // l'ombre du côté droit de la bûche
    const dd = R * 0.32, yy = Math.sqrt(R * R - (dd / 2) ** 2);
    out.push(h.path(`M${f(cb[0] + dd / 2 - dd)} ${f(cb[1] - yy)} A${f(R)} ${f(R)} 0 0 1 ${f(cb[0] + dd / 2 - dd)} ${f(cb[1] + yy)} A${f(R)} ${f(R)} 0 0 0 ${f(cb[0] + dd / 2 - dd)} ${f(cb[1] - yy)} Z`, h.a.ombre));
    out.push(h.cercle(cb[0], cb[1], R * 0.86, blanc(h.a.detail)));
    out.push(h.cercle(cb[0] - R * 0.04, cb[1] + R * 0.03, R * 0.58, h.a.detail));
    out.push(h.cercle(cb[0] - R * 0.06, cb[1] + R * 0.05, R * 0.3, h.a.detail));
    out.push(h.cercle(cb[0] - R * 0.07, cb[1] + R * 0.06, 1.3, h.a.plein));
    out.push(h.ligne(cb[0] + R * 0.1, cb[1] - R * 0.12, cb[0] + R * 0.62, cb[1] - R * 0.5, h.a.detail));
    out.push(h.cercle(cb[0], cb[1], R, h.a.contour));
    return {
      svg: out.join('\n'),
      reperes: { ragout: q(18.5, zr - 1.2), panneau: q(pan.b - 4, pan.ep * 0.5), buche: [cb[0] - R * 0.7, cb[1] - R * 0.7] },
    };
  };

  return {
    ref: '18-02',
    titre: 'Refroidir la marmite dans une auge de neige',
    desc: 'Deux vues. À gauche, de biais et d’en haut : une auge creusée dans un bloc de neige tassée, coupée en long pour qu’on voie le fond. Au fond, trois plats larges et plats couchés côte à côte : un plat à rôtir à anses, une tôle, un couvercle de chaudière retourné. Chacun porte une couche mince de ragoût, avec des morceaux. Une cuillère de bois est plantée dans le plat à rôtir, une flèche rouge tourne autour : on brasse. Autour de la tôle, la neige a fondu en eau, en bleu : un bain tiède. Contre la tôle, un monticule de neige sèche, et une flèche rouge qui vient d’un tas de neige sèche posé sur le bord de l’auge : on remplace la neige mouillée par de la neige sèche. À droite, en coupe en travers : la neige, l’auge, le plat à rôtir posé au fond avec sa couche mince de ragoût, et un panneau de bois posé sur les deux bords de l’auge, une bûche dessus pour le lester contre les animaux. Aucune cote ; les plats et la bûche donnent l’échelle.',
    format: 'demi',
    disposition: [['biais', 'coupe']],
    largeurs: [[2, 1]],
    vues: (() => {
      const memo = (fn, m = {}) => z => (m[`${z.l}x${z.h}`] = m[`${z.l}x${z.h}`] || fn(z));
      const B = memo(biais), C = memo(coupe);
      return {
        biais: {
          dessin: z => B(z).svg,
          renvois: z => {
            const r = B(z).reperes;
            return [
              { n: 1, rond: [14, r.auge[1] - 30], cible: r.auge, texte: 'creuser une auge dans la neige tassée' },
              { n: 2, rond: [r.plat[0] - 30, r.plat[1] - 70], cible: r.plat, texte: 'coucher les plats les plus larges dans l’auge' },
              { n: 4, rond: [r.brasser[0] + 4, r.brasser[1] - 70], cible: r.brasser, texte: 'brasser deux ou trois fois' },
              { n: 5, rond: [r.mouillee[0] + 10, r.mouillee[1] - 80], cible: r.mouillee, texte: 'remplacer la neige mouillée par de la sèche' },
            ];
          },
        },
        coupe: {
          titre: 'En coupe',
          dessin: z => C(z).svg,
          renvois: z => {
            const r = C(z).reperes;
            return [
              { n: 3, rond: [14, r.ragout[1] - 60], cible: r.ragout, texte: 'verser le ragoût en couche mince' },
              { n: 6, rond: [z.l - 14, r.panneau[1] - 50], cible: r.panneau, texte: 'poser un panneau lesté contre les animaux' },
            ];
          },
        },
      };
    })(),
  };
};
