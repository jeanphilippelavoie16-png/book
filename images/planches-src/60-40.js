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
// Refaite le 13 octobre 2026 : JP ne veut plus de corps vus de dos. Tournées vers le bord sous le vent,
// les deux personnes se voient DE PROFIL depuis l'arrière : deux corps simples à genoux (genoux, les
// bras posés par le calcul sur le bois du cerceau), celle du fond en gris (le plan loin). Le gilet et
// le couteau sont dessinés sur le tronc du corps simple. Le rouge : la flèche du geste (on remonte
// l'engin le long du bord) et le cercle du point à contrôler (le poids contre le plat-bord, étape 10).

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

  // ─── Le gilet et le couteau, posés sur le corps simple ────────────────────────────────────
  // Dans le repère du tronc : s le long du tronc depuis la hanche (mm), t vers l'avant (mm). Ils se
  // peignent en objetP : devant le tronc, derrière le bras proche.
  const repTronc = (g, e) => {
    const H = g.articulations.hancheP, N = g.articulations.cou;
    const L = Math.hypot(N[0] - H[0], N[1] - H[1]) || 1, u = [(N[0] - H[0]) / L, (N[1] - H[1]) / L], n = [-u[1], u[0]];
    return ([s, t]) => [H[0] + (u[0] * s + n[0] * t) * e, H[1] + (u[1] * s + n[1] * t) * e];
  };
  // Le gilet suit le tronc du corps simple (demi-largeurs de profil : ~100 mm devant, ~95 derrière),
  // 15 mm plus épais, de la taille au-dessus de l'épaule.
  const gilet = (g, e) => {
    const T = repTronc(g, e);
    const bord = [[150, -110], [260, -106], [360, -114], [440, -120], [495, -104], [522, -58], [520, 40], [492, 102],
      [430, 134], [340, 128], [250, 116], [150, 112]].map(T);
    const out = [h.path(lisse(bord, true), W(A.arete))];
    // la sangle et sa boucle, la couture des panneaux
    out.push(h.path(lisse([[212, -108], [210, 0], [212, 116]].map(T)), A.detail));
    out.push(h.chemin([[198, 100], [228, 100], [228, 126], [198, 126]].map(T), W(A.detail), true));
    out.push(h.path(lisse([[160, 88], [300, 100], [440, 104]].map(T)), A.detail));
    out.push(h.path(lisse([[160, -86], [300, -92], [430, -98]].map(T)), A.detail));
    return out.join('\n');
  };
  // Le couteau dans son fourreau, pendu à la ceinture sur la hanche : le fourreau tombe droit (la
  // gravité, pas l'axe du tronc), le manche dépasse vers le haut et l'avant.
  const couteau = (g, e) => {
    const T = repTronc(g, e), out = [];
    out.push(h.path(lisse([[96, -100], [100, 0], [96, 104]].map(T)), A.arete));      // la ceinture
    const a = T([92, 30]), V = (dx, dy) => [a[0] + dx * e, a[1] + dy * e];        // dx vers l'avant, dy vers le bas (mm)
    out.push(h.path(lisse([V(-13, 0), V(-14, 70), V(-8, 118), V(0, 128), V(8, 118), V(14, 70), V(13, 0)], true), W(A.arete)));
    out.push(h.path(lisse([V(-11, 0), V(-4, -50), V(4, -86), V(16, -84), V(13, -46), V(11, 0)], true), W(A.arete)));
    out.push(h.chemin([V(-16, 0), V(16, 0)], A.arete));
    return out.join('\n');
  };
  const habit = (couteauAussi) => g => [gilet(g, g.echelle), couteauAussi ? couteau(g, g.echelle) : ''].join('\n');

  // La pose des deux personnes (mm, avant la gîte ; degrés) : où tombe le genou sur le fond, de
  // combien le tronc penche, la tête ; où les mains prennent le cerceau (angle sur le cerceau, 0 à
  // droite, -90 en haut). DEVIE : de combien une prise peut tourner hors du rayon du cerceau pour
  // suivre l'avant-bras (le reste du pli se fait au poignet).
  // Les deux personnes, de profil (tournées vers tribord, le bord sous le vent, c'est de profil qu'on
  // les voit depuis l'arrière) : x, l'abscisse du genou sur le fond (mm) ; tronc, le penché ;
  // a, où chaque main prend le cerceau (degrés sur le cerceau, 0 à droite, -90 en haut).
  const PARAM = { x1: 230, t1: 44, a1: { P: -128, L: -112 }, x2: 470, t2: 26, a2: { P: -96, L: -84 } };
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

    // Les deux personnes : à genoux sur le fond, tournées vers tribord, penchées sur le bord, les deux
    // mains fermées sur le bois du cerceau (26 mm). Les bras se posent par le calcul : le poignet là où
    // la main tombe sur le bois, le coude qui plie vers l'avant.
    const RD_ = Math.PI / 180;
    const dirPose = a => [Math.sin(a * RD_), Math.cos(a * RD_)];            // 0 = vers le bas, + = vers l'avant
    const anglePose = v => Math.atan2(v[0], v[1]) / RD_;
    const atteint = (base, cibles) => {
      let ang = { ...base.angles };
      let c = F.corps({ ...base, angles: ang });
      const S0 = c.articulations.epauleP;
      const L1 = Math.hypot(c.articulations.coudeP[0] - S0[0], c.articulations.coudeP[1] - S0[1]);
      const L2 = Math.hypot(c.articulations.poignetP[0] - c.articulations.coudeP[0], c.articulations.poignetP[1] - c.articulations.coudeP[1]);
      for (let it = 0; it < 4; it++) {
        for (const k of ['P', 'L']) {
          // le décalage de la prise depuis le poignet, dans le repère de l'avant-bras
          const W0 = c.articulations['poignet' + k], M0 = [c['main' + k].x, c['main' + k].y];
          const fa = ang['avantbras' + k], off = tourne([M0[0] - W0[0], M0[1] - W0[1]], fa);
          const T = cibles[k];
          // le poignet visé : la cible moins le décalage tourné avec l'avant-bras (qui va changer)
          let W = [T[0] - tourne(off, -fa)[0], T[1] - tourne(off, -fa)[1]];
          const d = [W[0] - S0[0], W[1] - S0[1]], D = Math.min(L1 + L2 - 0.5, Math.hypot(d[0], d[1]));
          const phi = anglePose(d), alpha = Math.acos(Math.max(-1, Math.min(1, (L1 * L1 + D * D - L2 * L2) / (2 * L1 * D)))) / RD_;
          const bras = phi - alpha, Eb = [S0[0] + dirPose(bras)[0] * L1, S0[1] + dirPose(bras)[1] * L1];
          const avb = anglePose([W[0] - Eb[0], W[1] - Eb[1]]);
          ang['bras' + k] = bras; ang['avantbras' + k] = avb; ang['main' + k] = avb + 18;
        }
        c = F.corps({ ...base, angles: ang });
      }
      return { ang, c };
    };
    const g1 = B([PARAM.x1, fond(PARAM.x1)]), g2 = B([PARAM.x2, fond(PARAM.x2)]);
    const base = (g, t) => ({ x: g[0], y: g[1], pose: 'genoux', vue: 'profil', age: 'adulte', echelle: E,
      mains: { P: 'prise', L: 'prise' }, prise: { P: 26, L: 26 },
      angles: { tronc: t, cou: t * 0.7, tete: t * 0.55, brasP: 50, avantbrasP: 70, mainP: 88, brasL: 46, avantbrasL: 66, mainL: 84 } });
    const sur = a => ({ P: surCerceau(a.P), L: surCerceau(a.L) });
    const P2 = atteint(base(g2, PARAM.t2), sur(PARAM.a2));
    const P1 = atteint(base(g1, PARAM.t1), sur(PARAM.a1));
    // le cerceau : le bois (deux traits, blanc entre les deux), le filet dedans ; l'eau repasse
    out.push(h.cercle(C[0], C[1], R + EPC / 2, 'fill="#FFFFFF" ' + A.arete.replace('fill="none" ', '')));
    out.push(h.cercle(C[0], C[1], R - EPC / 2, A.hachure('grillage', 'arete')));
    out.push(h.path(vague(C[0] - R - 6, C[0] + R + 6, Y0, 1.6, 34), A.arete));
    // celle du fond, plus vers la proue : le plan loin, en gris ; puis celle de devant, couteau à la ceinture
    const loin = F.corps({ ...base(g2, PARAM.t2), angles: P2.ang, objetP: habit(false) });
    out.push(String(loin).replace(/fill="#FFFFFF"/g, 'fill="#E6E6E6"'));
    const pres = F.corps({ ...base(g1, PARAM.t1), angles: P1.ang, objetP: habit(true) });
    out.push(String(pres));
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
    // le rouge : le geste (on remonte l'engin, à la verticale, le long du bord) et le point à
    // contrôler (étape 10 : le poids reste contre le plat-bord)
    const xg = C[0] + R + EPC / 2 + 14;
    out.push(h.geste(`M${f1(xg)} ${f1(C[1] + R * 0.45)} L${f1(xg)} ${f1(C[1] - R * 0.55)}`));
    const Gc = surCerceau(-150);
    out.push(h.controle(Gc[0], Gc[1], 11));
    { const a0 = repTronc(pres, E)([92, 30]); RA = { C, R, EPC, surCerceau, S, B, v, pres, loin, g1, g2, troncP: p => repTronc(pres, E)(p), couteauPt: [a0[0], a0[1] + 70 * E] }; }
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
          arriere(z); const { pres, v, troncP, surCerceau, g1 } = RA;
          const G = surCerceau(-150);
          return [
            { n: 1, rond: [v[0] + 40, v[1] - 36], cible: [v[0] + 40, v[1] - 2], texte: 'le vent' },
            { n: 2, rond: [70, z.h - 30], cible: [g1[0] - 8, g1[1] - 10], texte: 'à deux, à genoux au fond' },
            { n: 3, rond: [150, 24], cible: troncP([380, -118]), texte: 'gilet enfilé à la rive' },
            { n: 4, rond: [40, z.h * 0.55], cible: RA.couteauPt, texte: 'couteau à portée d’une main' },
            { n: 5, rond: [z.l - 30, 24], cible: [pres.mainP.x, pres.mainP.y - 4], texte: 'mains au cerceau, sans boucle' },
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
