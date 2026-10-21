// Planche 18-02. Refroidir la marmite dans une auge de neige.
// Le texte : ch. 18, section 7, « Refroidir vingt litres sans réfrigérateur » : « On creuse une auge dans la neige
// tassée et on y couche ce qu'on a de plus large et de plus plat : plats à rôtir, tôles, couvercles de chaudières,
// gamelles. On y verse une couche mince, on brasse deux ou trois fois, et on remplace la neige mouillée par de la
// neige sèche à mesure qu'elle fond : de la neige fondue autour d'un plat fait un bain tiède. On pose un panneau
// lesté par-dessus, contre les animaux (planche 18-02). »
//
// Deux vues de biais, même projection : l'auge ouverte, puis couverte (règle 3 : ouvert / fermé). Les repères suivent
// l'ordre des gestes du texte (1 à 6).
//   Ouverte : un bloc de neige tassée, l'auge coupée par l'avant pour qu'on voie le fond. Les plats couchés sur deux
//   rangs (le texte les nomme) : devant, un plat à rôtir à anses et un couvercle de chaudière retourné ; derrière, une
//   tôle et une gamelle. Une couche de ragoût dans chacun. Une cuillère de bois dans le plat à rôtir, la flèche rouge
//   du brassage autour (repère 4). Autour de la tôle, la neige a fondu : l'eau en bleu ; une pelletée de neige sèche
//   prise au tas posé sur le bord (la flèche rouge) la remplace (repère 5).
//   Couverte : le même bloc, un panneau de planches posé sur les bords de l'auge, une bûche couchée dessus (repère 6).
// Aucune cote : le texte n'en donne aucune (règle 1). Les plats et la bûche donnent l'échelle.
// Aucune main ni aucun corps : le brassage se lit par la cuillère et sa flèche, le renvoi dit le geste.
// Les dimensions des objets (en cm, pour les proportions seulement, jamais imprimées) : plat à rôtir 45 × 28 × 6,
// tôle 46 × 28 × 2, couvercle de chaudière de 32 de diamètre, gamelle 20 × 16 × 5, auge de 100 × 80 et 18 de creux,
// bûche de 42 de long et 17 de diamètre.
// La charte : la neige en pointillé partout (le dessus, la coupe, les parois, les tas) ; en gris d'ombre, les faces
// tournées vers la droite (lumière en haut à gauche) : la paroi gauche de l'auge et des plats, le flanc droit du bloc,
// du panneau et de la bûche ; en gris clair, le ragoût ; l'eau par la hachure « eau » seulement. Deux rouges, les
// deux gestes : brasser, et rapporter de la neige sèche.
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
  const neigeTas = d => [h.path(d, blancSans), h.path(d, h.a.hachure('neige', 'aucun')), h.path(d, h.a.arete)];
  // un tas de neige posé à plat : le pied (la moitié avant d'une ellipse au sol) et un dos bombé, à trois ou quatre
  // bosses irrégulières ; le contour est une seule courbe lisse
  const tasDeNeige = (p3, { cx, cy, rx, ry, ht, z0 = 0, graine = 0 }) => {
    const pied = [], dos = [];
    for (let q = 0; q <= 12; q++) {
      const uu = -1 + 2 * q / 12, w = Math.sqrt(Math.max(0, 1 - uu * uu));
      pied.push(p3(cx + rx * uu, cy - ry * w, z0));
    }
    for (let q = 7; q >= 1; q--) {
      const uu = -1 + 2 * q / 8, w = Math.sqrt(Math.max(0, 1 - uu * uu));
      const bosse = 1 + 0.09 * Math.sin(q * 2.2 + graine) + 0.05 * Math.cos(q * 3.9 + graine * 2);
      dos.push(p3(cx + rx * uu * 0.98, cy + ry * 0.25 * w, z0 + ht * Math.pow(w, 0.7) * bosse));
    }
    // le pied en ligne, le dos en une courbe lisse qui part d'un bout du pied et revient à l'autre
    const ch = [pied[pied.length - 1], ...dos, pied[0]];
    const Q = i => ch[Math.max(0, Math.min(ch.length - 1, i))];
    let d = 'M' + pied.map(q => `${f(q[0])} ${f(q[1])}`).join(' L');
    for (let i = 0; i < ch.length - 1; i++) {
      const p0 = Q(i - 1), p1 = Q(i), p2 = Q(i + 1), p4 = Q(i + 2);
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p4[0] - p1[0]) / 6)} ${f(p2[1] - (p4[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return neigeTas(d + ' Z');
  };

  // ════ La scène, vue de biais ═══════════════════════════════════════════════════════
  // Projection oblique : X garde sa longueur, la profondeur Y monte et glisse un peu à droite, la hauteur Z est
  // raccourcie (on regarde d'en haut). Ce qu'on voit : les faces avant, le dessus, les faces de droite.
  const KX = 0.22, KY = 0.72, KZ = 0.7;
  const VUE = [-KX, 1, -KY / KZ];                        // le sens du regard : une face est vue si sa normale s'y oppose
  const AUGE = { x0: 0, x1: 100, y1: 80, fond: -18 };     // l'auge, coupée par l'avant à Y = 0 pour qu'on voie le fond
  const BLOC = { x0: -7, x1: 114, y1: 98, bas: -26 };     // le bloc de neige tassée
  const LARGE = BLOC.x1 - BLOC.x0 + KX * BLOC.y1;          // l'encombrement du bloc à l'écran, en cm

  const scene = ({ S, OX, OY, couverte = false }) => {
    const p3 = (X, Y, Z) => [OX + S * (X + KX * Y), OY - S * (KZ * Z + KY * Y)];
    const pz = (pts, Z) => pts.map(([X, Y]) => p3(X, Y, Z));
    const neigeFace = (pts, ombre = false) => [h.chemin(P(pts), ombre ? h.a.ombre : blancSans, true), h.chemin(P(pts), h.a.hachure('neige', 'aucun'), true)];
    const out = [];
    const { x0, x1, y1, fond } = AUGE;
    const k = S / 2.4;                                    // le poids des petits détails suit l'échelle

    // ── l'intérieur de l'auge : le fond, la paroi du fond, la paroi de gauche (à l'ombre) ──
    out.push(...neigeFace([p3(x0, 0, fond), p3(x1, 0, fond), p3(x1, y1, fond), p3(x0, y1, fond)]));
    out.push(...neigeFace([p3(x0, y1, fond), p3(x1, y1, fond), p3(x1, y1, 0), p3(x0, y1, 0)]));
    out.push(...neigeFace([p3(x0, 0, fond), p3(x0, y1, fond), p3(x0, y1, 0), p3(x0, 0, 0)], true));
    out.push(h.chemin(P([p3(x0, y1, fond), p3(x1, y1, fond)]), h.a.arete));
    out.push(h.chemin(P([p3(x0, 0, fond), p3(x0, y1, fond)]), h.a.arete));

    // ── l'eau de fonte autour de la tôle : un bain tiède ──
    const flaque = arrondi(1.5, 38, 66, 79, 7, 6).map(([X, Y], i) => [X + 0.9 * Math.sin(i * 1.7), Math.min(79.3, Y + 0.6 * Math.cos(i * 2.3))]);
    out.push(h.chemin(P(pz(flaque, fond)), h.a.hachure('eau', 'detail'), true));

    // ── un plat : le bord, le fond, le niveau du ragoût ──
    // haut et bas : deux contours de même nombre de points (le haut plus large : la paroi s'évase)
    const plat = ({ haut, bas, zh, zb, zr, morceaux = [], anses = null }) => {
      const T = pz(haut, zh), B = pz(bas, zb);
      const t = (zr - zb) / (zh - zb);
      const R = pz(haut.map((q, i) => [bas[i][0] + (q[0] - bas[i][0]) * t, bas[i][1] + (q[1] - bas[i][1]) * t]), zr);
      const coque = enveloppe(T.concat(B));
      const res = [h.chemin(P(coque), blancSans, true)];
      const ombresExt = [], ombresInt = [];
      for (let i = 0; i < haut.length; i++) {
        const j = (i + 1) % haut.length;
        const e1 = [haut[j][0] - haut[i][0], haut[j][1] - haut[i][1], 0];
        const e2 = [bas[i][0] - haut[i][0], bas[i][1] - haut[i][1], zb - zh];
        let n = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
        if (n[0] * e1[1] - n[1] * e1[0] < 0) n = n.map(v => -v);          // normale vers l'extérieur
        const lxy = Math.hypot(n[0], n[1]) || 1;
        const vu = n[0] * VUE[0] + n[1] * VUE[1] + n[2] * VUE[2] < 0;
        if (vu && n[0] / lxy > 0.45) ombresExt.push([T[i], T[j], B[j], B[i]]);       // le flanc droit, dehors
        if (!vu && n[0] / lxy < -0.45) ombresInt.push([T[i], T[j], R[j], R[i]]);     // la paroi gauche, dedans
      }
      ombresExt.forEach(q => res.push(h.chemin(P(q), h.a.ombre, true)));
      res.push(h.chemin(P(T), blancSans, true));
      ombresInt.forEach(q => { const c = decoupe(q, T); if (c.length > 2) res.push(h.chemin(P(c), h.a.ombre, true)); });
      const surface = decoupe(R, T);
      if (surface.length > 2) res.push(h.chemin(P(surface), blanc(h.a.detail).replace('#FFFFFF', '#E6E6E6'), true));
      for (const [mx, my, mr, kk] of morceaux) {          // les morceaux du ragoût, à plat sur la surface
        const forme = Array.from({ length: 7 }, (_, q) => {
          const an = 2 * Math.PI * q / 7 + kk * 0.9, rr = mr * (0.72 + 0.32 * Math.abs(Math.sin(q * 2.3 + kk * 1.7)));
          return [mx + rr * Math.cos(an), my + rr * 0.85 * Math.sin(an)];
        });
        res.push(h.chemin(P(pz(forme, zr)), blanc(h.a.detail), true));
      }
      res.push(h.chemin(P(T), h.a.arete, true));
      res.push(h.chemin(P(coque), h.a.contour, true));
      if (anses) res.push(...anses);
      return { svg: res, T, R };
    };

    // le plat à rôtir, à anses, devant à gauche
    const pr = { x0: 7, x1: 52, y0: 6, y1: 34 }, ym = (pr.y0 + pr.y1) / 2;
    const anse = (xa, sens) => {
      const zA = fond + 5.4, e = sens * 4.5;
      const dehors = [[xa, ym - 5], [xa + e * 0.7, ym - 4.6], [xa + e, ym - 2.5], [xa + e, ym + 2.5], [xa + e * 0.7, ym + 4.6], [xa, ym + 5]];
      const dedans = [[xa, ym - 3.4], [xa + e * 0.55, ym - 3.1], [xa + e * 0.72, ym - 1.6], [xa + e * 0.72, ym + 1.6], [xa + e * 0.55, ym + 3.1], [xa, ym + 3.4]];
      return h.chemin(P(dehors.concat(dedans.slice().reverse()).map(([X, Y]) => p3(X, Y, zA))), blanc(h.a.arete), true);
    };
    const zrP = fond + 2.5;
    const platRotir = plat({
      haut: arrondi(pr.x0, pr.y0, pr.x1, pr.y1, 4), bas: arrondi(pr.x0 + 2.5, pr.y0 + 2.5, pr.x1 - 2.5, pr.y1 - 2.5, 2.5),
      zh: fond + 6, zb: fond, zr: zrP,
      morceaux: [[15, 28, 1.6, 1], [23, 30, 1.3, 3], [40, 29, 1.5, 2], [45, 21, 1.4, 5], [13, 18, 1.3, 4], [43, 13, 1.2, 0], [34, 14, 1.3, 3]],
      anses: [anse(pr.x0, -1), anse(pr.x1, 1)],
    });

    // la tôle, derrière à gauche, dans son eau de fonte
    const tl = { x0: 9, x1: 55, y0: 47, y1: 74.5 };
    const zrT = fond + 1.1;
    const tole = plat({
      haut: arrondi(tl.x0, tl.y0, tl.x1, tl.y1, 1.6), bas: arrondi(tl.x0 + 0.7, tl.y0 + 0.7, tl.x1 - 0.7, tl.y1 - 0.7, 1.2),
      zh: fond + 2, zb: fond, zr: zrT,
      morceaux: [[15, 69, 1.5, 2], [27, 70, 1.3, 4], [42, 69, 1.5, 1], [49, 61, 1.3, 3], [33, 60, 1.4, 0], [16, 57, 1.2, 5], [43, 52, 1.2, 2], [25, 52, 1.3, 1]],
    });

    // la neige sèche, pelletée contre la tôle à la place de la neige mouillée
    const pelletee = { cx: 62.5, cy: 61, rx: 7, ry: 9, ht: 5, z0: fond, graine: 1 };
    const monticule = tasDeNeige(p3, pelletee);

    // la gamelle, derrière à droite
    const gm = { x0: 76, x1: 96, y0: 50, y1: 66 };
    const gamelle = plat({
      haut: arrondi(gm.x0, gm.y0, gm.x1, gm.y1, 3.5), bas: arrondi(gm.x0 + 1, gm.y0 + 1, gm.x1 - 1, gm.y1 - 1, 2.8),
      zh: fond + 5, zb: fond, zr: fond + 2,
      morceaux: [[81, 61, 1.3, 2], [90, 60, 1.2, 4], [86, 55, 1.2, 0]],
    });
    // son anse de fil, rabattue à plat le long du côté droit
    const anseG = [[gm.x1 + 0.5, gm.y0 + 3], [gm.x1 + 3.2, gm.y0 + 4.5], [gm.x1 + 3.2, gm.y1 - 4.5], [gm.x1 + 0.5, gm.y1 - 3]].map(([X, Y]) => p3(X, Y, fond + 3.5));

    // le couvercle de chaudière, retourné, devant à droite
    const cv = { cx: 80, cy: 22, r: 16 };
    const zrC = fond + 1.1;
    const couvercle = plat({
      haut: rond(cv.cx, cv.cy, cv.r), bas: rond(cv.cx, cv.cy, cv.r - 0.5),
      zh: fond + 2.5, zb: fond, zr: zrC,
      morceaux: [[74, 31, 1.4, 1], [83, 33, 1.3, 3], [89, 26, 1.5, 0], [71, 21, 1.3, 2], [81, 15, 1.2, 4], [88, 17, 1.2, 1]],
    });

    // l'ordre de peinture suit la profondeur : le fond de l'auge d'abord, de gauche à droite
    out.push(...tole.svg, ...monticule, ...gamelle.svg, h.chemin(P(anseG), h.a.arete));
    out.push(...platRotir.svg);

    // la cuillère de bois, et le brassage
    const emerge = [27.5, 19.5, zrP];                     // où le manche sort du ragoût
    const bout = [43, 21, 5.5];                             // le manche penche vers la droite, au-dessus du plat
    const a = p3(...emerge), b = p3(...bout);
    const dir = [b[0] - a[0], b[1] - a[1]], L = Math.hypot(...dir), u = [dir[0] / L, dir[1] / L], nn = [-u[1], u[0]];
    const demi = 2.5 * k;
    const manche = [[a[0] + nn[0] * demi, a[1] + nn[1] * demi], [b[0] + nn[0] * demi * 1.2, b[1] + nn[1] * demi * 1.2],
      [b[0] + u[0] * 2 * k + nn[0] * demi * 0.8, b[1] + u[1] * 2 * k + nn[1] * demi * 0.8], [b[0] + u[0] * 3 * k, b[1] + u[1] * 3 * k],
      [b[0] + u[0] * 2 * k - nn[0] * demi * 0.8, b[1] + u[1] * 2 * k - nn[1] * demi * 0.8],
      [b[0] - nn[0] * demi * 1.2, b[1] - nn[1] * demi * 1.2], [a[0] - nn[0] * demi, a[1] - nn[1] * demi]];
    const ombreManche = [manche[0], manche[1], [b[0] + nn[0] * demi * 0.1, b[1] + nn[1] * demi * 0.1], [a[0] + nn[0] * demi * 0.1, a[1] + nn[1] * demi * 0.1]];
    const rB = 11, arc = [];
    for (let q = 0; q <= 36; q++) {
      const t = (205 + 285 * q / 36) * RAD;
      arc.push(p3(emerge[0] + rB * Math.cos(t), emerge[1] + rB * 0.78 * Math.sin(t), zrP));
    }
    if (!couverte) {
      out.push(h.chemin(P(manche), blancSans, true), h.chemin(P(ombreManche), h.a.ombre, true), h.chemin(P(manche), h.a.arete, true));
      out.push(h.ellipse(a[0], a[1] + 0.6, demi * 1.9, demi * 0.9, h.a.detail));
      out.push(h.geste('M' + arc.map(q => `${f(q[0])} ${f(q[1])}`).join(' L')));
    }
    out.push(...couvercle.svg);

    // ── le panneau, posé sur les bords, et la bûche qui le leste ──
    const PN = { x0: -4, x1: 108, y1: 86, ep: 2.4 };
    const panneauSvg = [];
    if (couverte) {
      const dessusP = [p3(PN.x0, 0, PN.ep), p3(PN.x1, 0, PN.ep), p3(PN.x1, PN.y1, PN.ep), p3(PN.x0, PN.y1, PN.ep)];
      const tranche = [p3(PN.x0, 0, 0), p3(PN.x1, 0, 0), p3(PN.x1, 0, PN.ep), p3(PN.x0, 0, PN.ep)];
      const coteP = [p3(PN.x1, 0, 0), p3(PN.x1, PN.y1, 0), p3(PN.x1, PN.y1, PN.ep), p3(PN.x1, 0, PN.ep)];
      panneauSvg.push(h.chemin(P(dessusP), blanc(h.a.arete), true));
      // les joints des planches du panneau
      for (const X of [24, 52, 80]) panneauSvg.push(h.chemin(P([p3(X, 0, PN.ep), p3(X, PN.y1, PN.ep)]), h.a.detail));
      panneauSvg.push(h.chemin(P(coteP), h.a.ombre, true), h.chemin(P(coteP), h.a.arete, true));
      panneauSvg.push(h.chemin(P(tranche), h.a.hachure('bois', 'arete'), true));
    }

    // ── le bloc de neige tassée : le dessus, la coupe de l'avant, le flanc droit ──
    const BL = BLOC;
    const dessus = [[BL.x0, 0], [x0, 0], [x0, y1], [x1, y1], [x1, 0], [BL.x1, 0], [BL.x1, BL.y1], [BL.x0, BL.y1]].map(([X, Y]) => p3(X, Y, 0));
    const coupe = [[BL.x0, 0], [x0, 0], [x0, fond], [x1, fond], [x1, 0], [BL.x1, 0], [BL.x1, BL.bas], [BL.x0, BL.bas]].map(([X, Z]) => p3(X, 0, Z));
    const flanc = [p3(BL.x1, 0, 0), p3(BL.x1, BL.y1, 0), p3(BL.x1, BL.y1, BL.bas), p3(BL.x1, 0, BL.bas)];
    const blocSvg = [];
    if (!couverte) blocSvg.push(...neigeFace(dessus));
    else {
      // couverte : on ne voit du dessus que la bande derrière et à côté du panneau
      const autour = [[BL.x0, 0], [PN.x0, 0], [PN.x0, PN.y1], [PN.x1, PN.y1], [PN.x1, 0], [BL.x1, 0], [BL.x1, BL.y1], [BL.x0, BL.y1]].map(([X, Y]) => p3(X, Y, 0));
      blocSvg.push(...neigeFace(autour));
    }
    blocSvg.push(...neigeFace(flanc, true), ...neigeFace(coupe));
    if (!couverte) blocSvg.push(h.chemin(P([p3(x0, 0, 0), p3(x0, y1, 0), p3(x1, y1, 0), p3(x1, 0, 0)]), h.a.arete));
    blocSvg.push(h.chemin(P([p3(BL.x1, 0, 0), p3(BL.x1, BL.y1, 0)]), h.a.arete));
    blocSvg.push(h.chemin(P([p3(BL.x1, 0, 0), p3(BL.x1, 0, BL.bas)]), h.a.arete));
    blocSvg.push(h.chemin(P([p3(BL.x0, 0, 0), p3(x0, 0, 0)]), h.a.arete), h.chemin(P([p3(x1, 0, 0), p3(BL.x1, 0, 0)]), h.a.arete));
    blocSvg.push(h.chemin(P([p3(x0, 0, 0), p3(x0, 0, fond), p3(x1, 0, fond), p3(x1, 0, 0)]), h.a.contour));
    blocSvg.push(h.chemin(P([p3(BL.x0, 0, BL.bas), p3(BL.x0, 0, 0), p3(BL.x0, BL.y1, 0), p3(BL.x1, BL.y1, 0), p3(BL.x1, BL.y1, BL.bas), p3(BL.x1, 0, BL.bas), p3(BL.x0, 0, BL.bas)]), h.a.contour, true));
    // le panneau est posé sur le bloc : il se peint après lui
    out.push(...blocSvg, ...panneauSvg);

    const reperes = {};
    if (!couverte) {
      // ── le tas de neige sèche sur le bord, et le geste : en prendre pour remplacer la neige mouillée ──
      const tas = { cx: 66, cy: 85.5, rx: 15, ry: 4, ht: 9 };
      out.push(...tasDeNeige(p3, { ...tas, graine: 0.4 }));
      const g0 = p3(tas.cx - 3, tas.cy, 8), g1 = p3(pelletee.cx, pelletee.cy + 2, fond + pelletee.ht);
      const gc = [g0[0] + 30 * k, (g0[1] + g1[1]) / 2 - 4 * k];
      out.push(h.geste(`M${f(g0[0])} ${f(g0[1])} Q${f(gc[0])} ${f(gc[1])} ${f(g1[0] + 2 * k)} ${f(g1[1] - 3 * k)}`));
      Object.assign(reperes, {
        auge: p3(x0 - 3.5, 0, fond * 0.5),
        plat: p3(cv.cx + cv.r * 0.96, cv.cy + 3, fond + 2.5),
        ragout: p3(30, 64, zrT),
        brasser: arc[3],
        neige: p3(pelletee.cx + pelletee.rx * 0.93, pelletee.cy - 2, fond + 1.6),
        flaque: p3(3.5, 62, fond),
      });
    } else {
      // la bûche, couchée d'avant en arrière sur le panneau ; on voit son bout, rond, devant
      const rb = 8.5, C0 = [50, 22, PN.ep + rb], C1 = [50, 64, PN.ep + rb];
      const ell = (C, r = rb) => Array.from({ length: 40 }, (_, q) => { const t = 2 * Math.PI * q / 40; return p3(C[0] + r * Math.cos(t), C[1], C[2] + r * Math.sin(t)); });
      const corps = enveloppe(ell(C0).concat(ell(C1)));
      out.push(h.chemin(P(corps), blancSans, true));
      // le flanc droit de la bûche, à l'ombre
      const fl = [p3(C0[0] + rb * 0.55, C0[1], C0[2] - rb * 0.83), p3(C1[0] + rb * 0.55, C1[1], C1[2] - rb * 0.83),
        p3(C1[0] + rb, C1[1], C1[2]), p3(C1[0] + rb * 0.7, C1[1], C1[2] + rb * 0.7), p3(C0[0] + rb * 0.7, C0[1], C0[2] + rb * 0.7), p3(C0[0] + rb, C0[1], C0[2])];
      out.push(h.chemin(P(enveloppe(fl)), h.a.ombre, true));
      // l'écorce : quelques traits le long de la bûche
      for (const [t0, t1, an] of [[27, 48, 150], [32, 60, 118], [26, 41, 72], [44, 61, 38]]) {
        const c = Math.cos(an * RAD), sn = Math.sin(an * RAD);
        out.push(h.chemin(P([p3(C0[0] + rb * c, t0, C0[2] + rb * sn), p3(C0[0] + rb * c, t1, C0[2] + rb * sn)]), h.a.detail));
      }
      out.push(h.chemin(P(corps), h.a.contour, true));
      // le bout scié : l'écorce, deux cernes, le cœur, une fente
      out.push(h.chemin(P(ell(C0)), blanc(h.a.arete), true));
      out.push(h.chemin(P(ell(C0, rb * 0.62)), h.a.detail, true), h.chemin(P(ell(C0, rb * 0.3)), h.a.detail, true));
      out.push(h.cercle(...p3(...C0), 0.9 * k, h.a.plein));
      const cb = p3(...C0);
      out.push(h.ligne(cb[0] + 1, cb[1] - 1, ...p3(C0[0] + rb * 0.7, C0[1], C0[2] + rb * 0.6), h.a.detail));
      out.push(h.chemin(P(ell(C0)), h.a.contour, true));
      Object.assign(reperes, { panneau: p3(30, 46, PN.ep), buche: p3(C0[0] - rb * 0.72, C0[1], C0[2] + rb * 0.69) });
    }
    return { svg: out.join('\n'), reperes };
  };

  const echelle = (z, marge) => {
    const S = Math.min((z.l - 2 * marge) / LARGE, (z.h - 30) / (BLOC.y1 * KY + -BLOC.bas * KZ + 10 * KZ));
    const OX = (z.l - S * LARGE) / 2 - S * BLOC.x0;
    const OY = z.h - 4 - S * KZ * -BLOC.bas;
    return { S, OX, OY };
  };

  return {
    ref: '18-02',
    titre: 'Refroidir la marmite dans une auge de neige',
    desc: 'Deux vues de biais, d’en haut. À gauche, l’auge ouverte : une auge creusée dans un bloc de neige tassée, coupée par l’avant pour qu’on voie le fond. Au fond, des plats larges et plats couchés sur deux rangs : devant, un plat à rôtir à anses et un couvercle de chaudière retourné ; derrière, une tôle et une gamelle. Chacun porte une couche mince de ragoût, avec des morceaux. Une cuillère de bois est plantée dans le plat à rôtir, une flèche rouge tourne autour : on brasse. Autour de la tôle, la neige a fondu en eau, en bleu : un bain tiède. Contre la tôle, un monticule de neige sèche, et une flèche rouge qui vient d’un tas de neige sèche posé sur le bord de l’auge : on remplace la neige mouillée par de la neige sèche. À droite, la même auge couverte : un panneau de planches posé sur les bords, une bûche couchée dessus pour le lester contre les animaux. Aucune cote ; les plats et la bûche donnent l’échelle.',
    format: 'demi',
    disposition: [['ouverte', 'couverte']],
    largeurs: [[1.8, 1]],
    vues: (() => {
      const memo = (fn, m = {}) => z => (m[`${z.l}x${z.h}`] = m[`${z.l}x${z.h}`] || fn(z));
      const O = memo(z => scene({ ...echelle(z, 26) }));
      const C = memo(z => scene({ ...echelle(z, 4), couverte: true }));
      return {
        ouverte: {
          dessin: z => O(z).svg,
          renvois: z => {
            const r = O(z).reperes;
            return [
              { n: 1, rond: [12, Math.min(r.auge[1] + 14, z.h - 11)], cible: r.auge, texte: 'creuser une auge dans la neige tassée' },
              { n: 2, rond: [z.l - 12, r.plat[1] - 6], cible: r.plat, texte: 'coucher les plats les plus larges dans l’auge' },
              { n: 3, rond: [r.ragout[0] - 22, 12], cible: r.ragout, texte: 'verser le ragoût en couche mince' },
              { n: 4, rond: [12, r.brasser[1] - 18], cible: r.brasser, texte: 'brasser deux ou trois fois' },
              { n: 5, rond: [r.neige[0] + 70, 12], cible: r.neige, texte: 'remplacer la neige mouillée par de la sèche' },
            ];
          },
        },
        couverte: {
          titre: 'Couverte',
          dessin: z => C(z).svg,
          renvois: z => {
            const r = C(z).reperes;
            return [{ n: 6, rond: [r.panneau[0] - 4, 14], cible: r.panneau, texte: 'poser un panneau lesté contre les animaux' }];
          },
        },
      };
    })(),
  };
};
