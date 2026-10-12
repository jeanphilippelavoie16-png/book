// Planche 60-40 — lever le verveux à deux, du côté sous le vent, le poids contre le plat-bord
// (ch. 60, § Phase B, point 10 : « Lever à deux, du bon bord du bateau »).
// Vu de l'arrière : la chaloupe en vraie coupe transversale — bordé coupé en U (aplat noir), banc
// du milieu et plats-bords coupés (hachure bois) ; au-delà de la coupe, seulement la ligne des
// plats-bords qui fuit vers l'étrave, en trait fin. Gîtée un peu du côté de la levée. Deux
// personnes à genoux au fond, dans le U, tournées vers le bord sous le vent, gilet sur le dos :
// celle de devant, couteau à la ceinture, tient le bois du cerceau à deux mains (prises vues du
// dos, les doigts refermés par-dessus le bois) ; celle du fond, décalée vers la droite et plus
// haut, a les bras tendus vers le même cerceau, les mains passées derrière le bois. Le cerceau
// appuyé contre le bord, le haut juste au-dessus du plat-bord, le filet dans l'eau.
// Vu de dessus : le vent de travers, la proue dans le courant, l'engin qui monte le long du bord
// sous le vent.
// Aucune cote : c'est un geste, et le chapitre ne donne aucune dimension du verveux.

module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f1 = n => Math.round(n * 10) / 10;
  const pt = p => `${f1(p[0])} ${f1(p[1])}`;
  const RAD = Math.PI / 180;
  const tourne = (p, d) => { const c = Math.cos(d * RAD), s = Math.sin(d * RAD); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };
  const W = at => /fill="/.test(at) ? at.replace(/fill="[^"]*"/, 'fill="#fff"') : `fill="#fff" ${at}`;
  const TR = (w, extra = '') => `fill="none" stroke="#1A1A1A" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${extra}`;
  // Courbe lisse (Catmull-Rom) qui passe par chaque point.
  const lisse = (pts, ferme = false) => {
    const n = pts.length, P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${pt(pts[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      d += ` C${pt([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${pt([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pt(p2)}`;
    }
    return ferme ? d + ' Z' : d;
  };
  // La surface de l'eau : une vague douce.
  const vague = (x1, x2, y, amp, lg) => {
    const pts = [];
    for (let x = x1; x <= x2 + 0.1; x += lg / 4) pts.push([x, y + amp * Math.sin((x - x1) / lg * 2 * Math.PI)]);
    return lisse(pts);
  };
  // Le vent : trois flèches parallèles. Le courant : une longue flèche ondulée.
  const vent = (x, y, dx, dy, lg, ecart) => {
    const n = [-dy, dx];
    return [-1, 0, 1].map(k => {
      const o = [x + n[0] * ecart * k - dx * (k === 0 ? 0 : lg * 0.12), y + n[1] * ecart * k - dy * (k === 0 ? 0 : lg * 0.12)];
      return h.fleche(`M${pt(o)} L${pt([o[0] + dx * lg, o[1] + dy * lg])}`, A.arete);
    }).join('\n');
  };
  const courant = (x1, x2, y, amp) => {
    const pts = [];
    const lg = (x1 - x2) / 3;
    for (let x = x1; x >= x2 - 0.1; x -= lg / 4) pts.push([x, y + amp * Math.sin((x1 - x) / lg * 2 * Math.PI)]);
    return h.fleche(lisse(pts), A.arete);
  };

  // ─── Le gilet et le couteau, posés sur un personnage de la bibliothèque ───────────────────
  // Même construction que formes.js : le tronc (TRONC) tourne autour de la hanche, le bassin du
  // tiers, la poitrine en entier ; puis le repère de la vue.
  const HANCHE = { genoux: [-45, -495], genou: [-110, -470] };
  const kP = y => { const t = Math.max(0, Math.min(1, (-150 - y) / 150)); return 0.35 + 0.65 * t * t * (3 - 2 * t); };
  const troncVue = o => p => { const q0 = HANCHE[o.pose], q = tourne(p, o.penche * kP(p[1])); return [o.x + (q0[0] + q[0]) * o.echelle, o.y + (q0[1] + q[1]) * o.echelle]; };
  const gilet = o => {
    const T = troncVue(o);
    const bord = [[-119, -190], [-121, -250], [-136, -340], [-143, -420], [-126, -490], [-74, -538], [-18, -552],
      [42, -540], [100, -506], [134, -446], [141, -372], [128, -290], [124, -200], [122, -190]].map(T);
    const out = [h.path(lisse(bord) + ' Z', W(A.arete))];
    // la sangle et sa boucle, la couture du panneau avant
    out.push(h.path(lisse([[-121, -236], [0, -240], [126, -236]].map(T)), A.detail));
    const b = [[108, -228], [134, -228], [134, -248], [108, -248]].map(T);
    out.push(h.chemin(b, W(A.detail), true));
    out.push(h.path(lisse([[84, -500], [104, -440], [108, -370], [100, -300], [98, -196]].map(T)), A.detail));
    out.push(h.path(lisse([[-100, -480], [-112, -420], [-104, -340], [-98, -250], [-96, -196]].map(T)), A.detail));
    return out.join('\n');
  };
  const couteau = o => {
    const T = troncVue(o);
    const a = T([22, -150]), b = T([22, -40]);
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), d = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-d[1], d[0]];
    const e = o.echelle, P = (s, t) => [a[0] + d[0] * s * e + n[0] * t * e, a[1] + d[1] * s * e + n[1] * t * e];
    const out = [];
    // la ceinture
    out.push(h.path(lisse([[-92, -150], [0, -156], [96, -150]].map(T)), A.arete));
    // le fourreau, pointe en bas ; le manche qui dépasse, la garde
    out.push(h.path(lisse([P(-14, -20), P(40, -21), P(110, -17), P(150, -4), P(154, 3), P(128, 13), P(40, 19), P(-14, 19)]) + ' Z', W(A.arete)));
    out.push(h.path(`M${pt(P(4, -20))} L${pt(P(4, 19))}`, A.detail));
    out.push(h.path(lisse([P(-14, -14), P(-60, -14), P(-100, -12), P(-114, -6), P(-114, 8), P(-100, 13), P(-60, 13), P(-14, 13)]) + ' Z', W(A.arete)));
    out.push(h.path(`M${pt(P(-14, -22))} L${pt(P(-14, 21))}`, A.arete));
    return out.join('\n');
  };
  // Le bras proche, repeint seul par-dessus le gilet (même moyen que la 04-40).
  const brasProche = pers => {
    const L = String(pers).split('\n');
    const i0 = L.findIndex(l => l.includes('stroke="none"'));
    let iF = -1; L.forEach((l, i) => { if (l.includes('stroke="none"')) iF = i; });
    return [L[i0 - 1], ...L.slice(iF, L.length - 1)].join('\n');
  };
  const habille = (o, pers) => [String(pers), gilet(o), couteau(o), brasProche(pers)].join('\n');


  // La pose des deux personnes (mm, avant la gîte ; degrés) : où tombe le genou sur le fond, de
  // combien le tronc penche, la tête ; où les mains prennent le cerceau (angle sur le cerceau, 0 à
  // droite, -90 en haut). DEVIE : de combien une prise peut tourner hors du rayon du cerceau pour
  // suivre l'avant-bras (le reste du pli se fait au poignet).
  const PARAM = { x1: 240, p1: 28, r1: 25, a1: { proche: -115, loin: -102 }, x2: 660, p2: 20, r2: 30, dy2: 0, a2: { proche: -93, loin: -82 }, devie: 25 };
  // ─── Vu de l'arrière ──────────────────────────────────────────────────────────────────────
  // Une vraie coupe en travers : le bordé coupé en U (aplat noir), le banc du milieu coupé
  // (hachure bois), le plat-bord coupé de chaque côté. Au-delà de la coupe, rien du bateau sauf
  // la ligne des plats-bords qui fuit vers l'étrave, en trait fin. On regarde vers la proue :
  // bâbord (au vent) à gauche, tribord (sous le vent) à droite ; la chaloupe gîte un peu à droite.
  // Monde en mm : origine au milieu de la chaloupe, à la surface de l'eau ; y vers le bas.
  const E = 0.21, GITE = 4, EP_BORDE = 16;
  // Les points d'une courbe lisse (même Catmull-Rom que lisse), n par segment.
  const echant = (pts, n = 10) => {
    const P = i => pts[Math.max(0, Math.min(pts.length - 1, i))], out = [pts[0]];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      for (let k = 1; k <= n; k++) {
        const t = k / n, m = 1 - t;
        out.push([m * m * m * p1[0] + 3 * m * m * t * c1[0] + 3 * m * t * t * c2[0] + t * t * t * p2[0],
          m * m * m * p1[1] + 3 * m * m * t * c1[1] + 3 * m * t * t * c2[1] + t * t * t * p2[1]]);
      }
    }
    return out;
  };
  // Décale une polyligne vers sa gauche (l'intérieur du U quand on va de bâbord à tribord).
  const decale = (pts, d) => pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [p[0] + (b[1] - a[1]) / L * d, p[1] - (b[0] - a[0]) / L * d];
  });
  const uni = v => { const l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l]; };
  // la coque, extérieur du bordé, de bâbord à tribord
  const COQUE = [[-770, -340], [-752, -200], [-722, -40], [-684, 90], [-610, 158], [-300, 176], [0, 188], [300, 176], [610, 158], [684, 90], [722, -40], [752, -200], [770, -340]];
  const EXT = echant(COQUE), INT = decale(EXT, EP_BORDE);
  // le fond intérieur à l'abscisse x (avant la gîte)
  const fond = x => {
    const b = INT.filter(p => p[1] > 100);
    for (let i = 0; i < b.length - 1; i++) if ((b[i][0] - x) * (b[i + 1][0] - x) <= 0) {
      const t = (x - b[i][0]) / ((b[i + 1][0] - b[i][0]) || 1); return b[i][1] + t * (b[i + 1][1] - b[i][1]);
    }
    return 170;
  };
  // le côté intérieur à la hauteur y (avant la gîte), s = -1 bâbord, +1 tribord
  const cote = (y, s) => {
    const c = INT.filter(p => p[0] * s > 0);
    let best = c[0]; for (const p of c) if (Math.abs(p[1] - y) < Math.abs(best[1] - y)) best = p;
    return best[0];
  };

  let RA = {};
  const arriere = z => {
    const X0 = 270, Y0 = z.h - 60;
    const S = p => [X0 + p[0] * E, Y0 + p[1] * E];
    const B = p => S(tourne(p, GITE)); // ce qui tient au bateau gîte avec lui
    const out = [];
    // l'eau
    out.push(h.path(`M0 ${f1(Y0)} ${vague(0, z.l, Y0, 1.6, 34).slice(1)} L${f1(z.l)} ${f1(z.h)} L0 ${f1(z.h)} Z`, `fill="url(#h-eau)" stroke="none"`));
    out.push(h.path(vague(0, z.l, Y0, 1.6, 34), A.arete));
    // le dedans de la chaloupe, blanc : l'eau s'arrête au bordé
    out.push(h.chemin(EXT.map(B), A.blanc, true));
    // au-delà de la coupe : les deux plats-bords qui montent et se rejoignent à l'étrave
    const fuite = s => h.path(lisse([[s * 752, -372], [s * 430, -404], [s * 130, -456], [0, -476]].map(B)), A.detail);
    out.push(fuite(-1), fuite(1));

    // un cerceau du verveux : contre le bordé, le haut juste au-dessus du plat-bord
    const R = 300 * E, EPC = 26 * E; // rayon au milieu du bois ; grosseur du bois
    const hautPB = B([790, -378])[1];
    const cy = hautPB - 9 + R;
    const flanc = B([cote(-60, 1) + EP_BORDE, -60]);
    const C = [flanc[0] + R + EPC / 2 + 1, cy];
    const surCerceau = deg => [C[0] + R * Math.cos(deg * RAD), C[1] + R * Math.sin(deg * RAD)];

    // Les deux personnes : à genoux sur le fond, tournées vers tribord, penchées sur le bord.
    // Celle de devant tient le bois du cerceau à deux mains : des prises de la bibliothèque, vues
    // du dos, les doigts qui passent par-dessus le bois et se referment derrière. Son bras
    // s'arrête au poignet de la prise (la palette du personnage est découpée) et l'avant-bras de
    // la prise prolonge le sien. Celle du fond, au-delà du cerceau, le tient par derrière : ses
    // mains sont cachées par le filet, on voit ses bras jusqu'aux poignets, posés sur le bois.
    const EM = E * 0.85, BRAS_M = 20;
    const radial = deg => [Math.cos(deg * RAD), Math.sin(deg * RAD)];
    const angleDe = v => Math.atan2(v[1], v[0]) / RAD;
    const borneA = (a, c, d) => { let x = a - c; while (x > 180) x -= 360; while (x < -180) x += 360; return c + Math.max(-d, Math.min(d, x)); };
    const K = ['proche', 'loin'];
    const bordsPrise = (G, ang) => {
      const Rl = EPC / 2 / EM, pre = Math.atan(-0.22) / RAD, c0 = tourne([12 - 0.05 * Rl, 0], pre), cut = -88 - BRAS_M;
      return [[cut, -33], [cut, 34]].map(p => { const q = tourne(tourne(p, pre).map((v, i) => (v - c0[i]) * EM), ang); return [G[0] + q[0], G[1] + q[1]]; });
    };
    const tient = (base, angles) => {
      let dir = { proche: radial(angles.proche), loin: radial(angles.loin) }, pers, mains, cibles;
      for (let it = 0; it < 8; it++) {
        mains = {}; cibles = {};
        for (const k of K) {
          const G = surCerceau(angles[k]);
          const aBras = borneA(angleDe(dir[k]), angles[k], PARAM.devie); // l'avant-bras, près du rayon
          const m = F.main({ x: G[0], y: G[1], pose: 'prise', vue: 'dos', echelle: EM, angle: aBras - 180, diametre: EPC, bras: BRAS_M });
          m.bords = bordsPrise(G, aBras - 180);
          mains[k] = m; cibles[k] = m.bras;
        }
        pers = F.personnage({ ...base, mains: cibles });
        for (const k of K) { const u = uni([pers.mains[k][0] - pers.poignets[k][0], pers.mains[k][1] - pers.poignets[k][1]]); dir[k] = [-u[0], -u[1]]; }
      }
      // la palette du personnage, au-delà du poignet, est découpée
      const coupes = K.map(k => {
        const P = cibles[k], u = [-dir[k][0], -dir[k][1]], n = [-u[1], u[0]], w = 34 * E, L = 240 * E, r = 1 * E;
        const q = [[P[0] + n[0] * w + u[0] * r, P[1] + n[1] * w + u[1] * r], [P[0] - n[0] * w + u[0] * r, P[1] - n[1] * w + u[1] * r],
          [P[0] - n[0] * w + u[0] * L, P[1] - n[1] * w + u[1] * L], [P[0] + n[0] * w + u[0] * L, P[1] + n[1] * w + u[1] * L]];
        return 'M-50 -50 H' + f1(z.l + 50) + ' V' + f1(z.h + 50) + ' H-50 Z M' + q.map(pt).join(' L') + ' Z';
      });
      const poignets = K.map(k => {
        const P = cibles[k], u = [-dir[k][0], -dir[k][1]], n = [-u[1], u[0]], w = 25.5 * E;
        let [a, b] = mains[k].bords;
        const pA = [P[0] + n[0] * w, P[1] + n[1] * w], pB = [P[0] - n[0] * w, P[1] - n[1] * w];
        if ((a[0] - P[0]) * n[0] + (a[1] - P[1]) * n[1] < 0) [a, b] = [b, a];
        // le trait visible d'une forme déborde de 0,4 hors de son bord (silhouette à 2,4 à moitié couverte)
        const ab = uni([a[0] - b[0], a[1] - b[1]]), o = 0.42;
        const hors = (p, d, s) => [p[0] + d[0] * o * s, p[1] + d[1] * o * s];
        return [h.chemin([pA, a, b, pB], A.blanc, true),
          h.chemin([hors(pA, n, 1), hors(a, ab, 1)], A.arete), h.chemin([hors(pB, n, -1), hors(b, ab, -1)], A.arete)].join('\n');
      });
      const ecart = K.map(k => f1(Math.abs(angleDe(dir[k]) - angles[k]))).join(' / ');
      return { pers, mains, cibles, coupes, ecart, poignets };
    };
    // les poignets posés sur le bord extérieur du bois : la main passe derrière
    const derriere = (base, angles) => {
      const cibles = {};
      for (const k of K) { const d = radial(angles[k]); cibles[k] = [C[0] + d[0] * (R + EPC / 2 + 6 * E), C[1] + d[1] * (R + EPC / 2 + 6 * E)]; }
      const pers = F.personnage({ ...base, mains: cibles });
      const manque = K.map(k => f1(Math.hypot(pers.poignets[k][0] - cibles[k][0], pers.poignets[k][1] - cibles[k][1]) / E)).join(' / ');
      return { pers, cibles, manque };
    };
    const decoupe = (id, coupes, contenu) => {
      let s = contenu;
      coupes.forEach((d, i) => { s = '<clipPath id="' + id + '-' + i + '"><path d="' + d + '" fill="none" clip-rule="evenodd"/></clipPath>\n<g clip-path="url(#' + id + '-' + i + ')">\n' + s + '\n</g>'; });
      return s;
    };
    // celle du fond : plus vers la proue, plus à droite, plus droite, la tête plus haut
    const g2 = B([PARAM.x2, fond(PARAM.x2)]);
    const oLoin = { pose: 'genoux', penche: PARAM.p2, echelle: E, x: g2[0], y: g2[1] - PARAM.dy2 };
    const L2 = derriere({ ...oLoin, regard: PARAM.r2 }, PARAM.a2);
    // celle de devant
    const g1 = B([PARAM.x1, fond(PARAM.x1)]);
    const oPres = { pose: 'genoux', penche: PARAM.p1, echelle: E, x: g1[0], y: g1[1] };
    const L1 = tient({ ...oPres, regard: PARAM.r1 }, PARAM.a1);
    out.push([String(L2.pers), gilet(oLoin), brasProche(L2.pers)].join('\n'));
    out.push(decoupe('k6040-p', L1.coupes, habille(oPres, L1.pers)));

    // le cerceau : le bois (deux traits, blanc entre les deux), le filet dedans ; l'eau repasse
    out.push(h.cercle(C[0], C[1], R + EPC / 2, 'fill="#FFFFFF" ' + A.arete.replace('fill="none" ', '')));
    out.push(h.cercle(C[0], C[1], R - EPC / 2, A.hachure('grillage', 'arete')));
    out.push(h.path(vague(C[0] - R - 6, C[0] + R + 6, Y0, 1.6, 34), A.arete));
    // les deux mains de devant, sur le bois, et leurs poignets
    out.push(...L1.poignets, String(L1.mains.loin), String(L1.mains.proche));
    // la coupe, la plus près de l'œil : le banc du milieu, le bordé, les plats-bords
    const yb = -150, eb = 32;
    const banc = [[cote(yb, -1), yb], [cote(yb, 1), yb], [cote(yb + eb, 1), yb + eb], [cote(yb + eb, -1), yb + eb]];
    out.push(h.chemin(banc.map(B), A.hachure('bois', 'arete'), true));
    out.push(h.chemin([...EXT, ...INT.slice().reverse()].map(B), A.plein, true));
    const platBord = s => h.path(lisse([[s * 746, -338], [s * 746, -366], [s * 760, -378], [s * 790, -378], [s * 802, -364], [s * 800, -336], [s * 782, -326], [s * 758, -328]].map(B), true), A.hachure('bois', 'arete'));
    out.push(platBord(-1), platBord(1));

    // le vent, du côté opposé à la levée
    const v = [28, B([-770, -378])[1] - 70];
    out.push(vent(v[0], v[1], 1, 0, 78, 20));
    RA = { C, R, EPC, surCerceau, L1, L2, S, B, v, troncP: troncVue(oPres), troncL: troncVue(oLoin), g1 };
    return out.join('\n');
  };

  // ─── Vu de dessus ─────────────────────────────────────────────────────────────────────────
  const Ep = 0.075;
  let RD = {};
  const dessus = z => {
    const X1 = z.l / 2 - 15, Y1 = (z.h - 171) / 2 + 57;
    const Q = p => [X1 + p[0] * Ep, Y1 + p[1] * Ep];
    const out = [];
    // la chaloupe : tableau arrière à gauche, étrave à droite ; tribord (sous le vent) en bas
    const demi = [[-2150, -650], [-1600, -730], [-800, -760], [0, -750], [800, -690], [1450, -500], [1900, -250], [2150, 0]];
    const tour = [...demi, ...demi.slice(0, -1).reverse().map(([x, y]) => [x, -y])];
    out.push(h.path(lisse(tour.map(Q)) + ' Z', W(A.contour)));
    const dedans = [[-2100, -590], [-1600, -670], [-800, -700], [0, -690], [800, -632], [1420, -452], [1840, -226], [2060, 0]];
    const tourI = [...dedans, ...dedans.slice(0, -1).reverse().map(([x, y]) => [x, -y])];
    out.push(h.path(lisse(tourI.map(Q)) + ' Z', A.detail));
    const banc = (x, lg, dy) => h.chemin([[x - lg / 2, -dy], [x + lg / 2, -dy], [x + lg / 2, dy], [x - lg / 2, dy]].map(Q), A.hachure('bois', 'detail'), true);
    out.push(banc(-1880, 300, 600), banc(-250, 260, 690), banc(1150, 240, 520));
    // le verveux le long du bord sous le vent : la pointe à l'arrière, les cerceaux vers
    // l'avant, l'entrée et les ailes au-delà de l'étrave, vers l'amont
    const yh = 790; // le haut de l'engin, contre la coque
    const cer = [[-900, 420], [-250, 455], [400, 490], [1050, 525], [1700, 560]]; // x, hauteur
    const corps = [[-900, yh], [1700, yh], [1700, yh + 760], [-900, yh + 520]];
    out.push(h.chemin([Q([-900, yh]), Q([1700, yh])], TR(2.4)));
    out.push(h.chemin([Q([-900, yh + 420]), Q([1700, yh + 560])], TR(2.4)));
    for (const [x, ht] of cer) out.push(h.chemin([Q([x, yh]), Q([x, yh + ht])], TR(2.4)));
    // la pointe et son nœud coulant
    out.push(h.chemin([Q([-900, yh]), Q([-1380, yh + 210]), Q([-900, yh + 420])], TR(2.4)));
    out.push(h.cercle(...Q([-1405, yh + 210]), 2.2, W(A.detail)));
    // les ailes, lestées, jusqu'aux piquets hors de la vue
    const aile1 = [[1700, yh], [2500, yh - 260], [3300, yh - 520]], aile2 = [[1700, yh + 560], [2500, yh + 620], [3300, yh + 680]];
    for (const a of [aile1, aile2]) {
      out.push(h.chemin(a.map(Q), TR(2.4)));
      for (const p of a.slice(1)) out.push(h.cercle(...Q(p), 3.2, `fill="#1A1A1A" stroke="none"`));
    }
    // le vent de travers, par bâbord ; le courant qui descend vers l'arrière
    out.push(vent(Q([-3000, -740])[0], Q([-3000, -740])[1], 0, 1, 34, 20));
    out.push(courant(Q([3900, -450])[0], Q([2600, -450])[0], Q([0, -450])[1], 2.2));
    out.push(courant(Q([-2350, 1300])[0], Q([-3500, 1300])[0], Q([0, 1300])[1], 2.2));
    RD = { Q, yh };
    return out.join('\n');
  };

  return {
    ref: '60-40',
    titre: 'Lever le verveux à deux, du côté sous le vent',
    desc: 'Encadré danger : le verveux plein d’eau fait chavirer par le bord où il monte ; aucun cordage en boucle sur soi. En haut, vu de l’arrière : une chaloupe coupée en travers, le bordé en U noir, le banc et les plats-bords hachurés, gîtée un peu à droite. Le vent vient de la gauche. ' +
      'Deux personnes à genoux au fond du bateau, gilet de sauvetage sur le dos, tournées vers le bord de droite, le bord sous le vent : ' +
      'celle de devant, couteau à la ceinture, tient à deux mains le bois d’un cerceau du verveux, les doigts refermés par-dessus ; celle du fond, un peu plus à droite et plus haut, ' +
      'a les bras tendus vers le même cerceau, les mains passées derrière le bois. Le cerceau, filet tendu dedans, est appuyé contre le bord, le haut juste au-dessus du plat-bord, le bas dans l’eau. En bas, vu de dessus : la chaloupe, la proue face au courant, le vent de travers par la gauche du bateau ; ' +
      'le verveux monte le long du bord sous le vent, la pointe vers l’arrière, les cerceaux, l’entrée et les ailes vers l’amont.',
    format: 'pleine',
    disposition: [['arriere'], ['dessus']],
    hauteurs: [3, 2],
    vues: {
      arriere: {
        titre: 'Vu de l’arrière',
        dessin: arriere,
        renvois: z => {
          arriere(z); const { L1, v, troncP, surCerceau, g1 } = RA;
          const G = surCerceau(-150);
          return [
            { n: 1, rond: [v[0] + 40, v[1] - 36], cible: [v[0] + 40, v[1] - 2], texte: 'le vent' },
            { n: 2, rond: [70, z.h - 30], cible: [g1[0] - 8, g1[1] - 10], texte: 'à deux, à genoux au fond' },
            { n: 3, rond: [150, 24], cible: troncP([-122, -400]), texte: 'gilet enfilé à la rive' },
            { n: 4, rond: [40, z.h * 0.55], cible: troncP([22, -70]), texte: 'couteau à portée d’une main' },
            { n: 5, rond: [z.l - 30, 24], cible: [L1.mains.loin.trou.x, L1.mains.loin.trou.y], texte: 'mains au cerceau, sans boucle' },
            { n: 6, rond: [z.l - 16, z.h * 0.52], cible: G, texte: 'le poids contre le plat-bord' },
          ];
        },
      },
      dessus: {
        titre: 'Vu de dessus',
        dessin: dessus,
        renvois: z => {
          dessus(z); const { Q, yh } = RD;
          const c = Q([3250, -450]);
          return [
            { n: 7, rond: [c[0] + 10, c[1] - 26], cible: [c[0], c[1] - 2], texte: 'le courant : la proue dedans' },
            { n: 8, rond: [Q([-400, 0])[0], z.h - 10], cible: Q([-250, yh + 300]), texte: 'l’engin monte sous le vent' },
          ];
        },
      },
    },
    danger: 'Un verveux plein d’eau pèse plus qu’un homme, et le bateau part par le bord où il monte. Aucun cordage autour de la main, du bras ou de la taille : un engin qui repart au fond entraîne ce qui est pris dans une boucle.',
  };
};
