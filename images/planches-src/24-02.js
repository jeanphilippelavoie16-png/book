'use strict';
// Planche 24-02 — Fendre sur le billot. Chapitre 24, étape 11.
// 14 octobre : la main du coup de paume passe aux mains simples (plat, vue du côté du pouce) ; la flèche du coup
// de paume est le geste, en rouge.
//
// Tout ce qui est dessiné vient de l'étape 11 : la bûche debout sur un billot, les pieds écartés
// (les jambes hors de la trajectoire), le premier coup dans une fente de séchage déjà ouverte, le
// poids du corps qui descend et les genoux qui se placent d'un coup à l'impact, le manche à l'horizontale au
// moment de l'impact, la légère torsion qui ouvre la bûche, le fer qui traverse et finit dans le
// billot, et la hache coincée libérée d'un coup sec de la paume vers le bas sur le bout du manche,
// sans le tenir. Aucune cote : c'est un geste, rien ne se construit.
//
// Repères : chaque vue se dessine en millimètres (y vers le bas) et passe à l'écran par P.


const RAD = Math.PI / 180;
const tourne = (p, d) => { const c = Math.cos(d * RAD), s = Math.sin(d * RAD); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };
const plus = (a, b) => [a[0] + b[0], a[1] + b[1]], moins = (a, b) => [a[0] - b[0], a[1] - b[1]], fois = (a, k) => [a[0] * k, a[1] * k];

// ─── le fendeur à l'impact ────────────────────────────────────────────────────────────────
// Le corps simple (h.formes.corps), pose « fendre », de profil. Les deux poings au bout du manche :
// la main tourne vers le bas (main 0) pour que le manche passe à l'horizontale dans le poing ; le
// bras loin est replié (bras 22, avant-bras 82) pour que son poing tombe juste derrière le proche,
// sur le même manche (angles cherchés une fois pour toutes, à 3 mm près).
const ANGLES_FENDEUR = { mainP: 0, mainL: 0, brasL: 22, avantbrasL: 82 };

module.exports = (h) => {
  const F = h.formes;
  const { lisse, ser, suite } = F._interne;
  const A = h.a;
  const NOIR = '#1A1A1A';
  const f1 = v => Math.round(v * 10) / 10;
  const blanc = ep => `fill="#FFFFFF" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const FOND = 'fill="#FFFFFF" stroke="none"';
  const XY = p => `${f1(p[0])} ${f1(p[1])}`;

  // Cadre une boîte en mm dans la zone : rend l'échelle s (px/mm) et P (mm → vue).
  const cadre = (z, [x1, x2], [y1, y2]) => {
    const s = Math.min(z.l / (x2 - x1), z.h / (y2 - y1));
    const ox = (z.l - (x2 - x1) * s) / 2 - x1 * s, oy = (z.h - (y2 - y1) * s) / 2 - y1 * s;
    const P = (x, y) => [ox + x * s, oy + y * s];
    return { s, P };
  };

  // ─── la hache à fendre ─────────────────────────────────────────────────────────────────
  // Repère de la hache : le bout du manche en K0, u vers le fer, v vers le tranchant. Le fer se
  // décrit depuis le centre de l'œil (a le long du manche, b vers le tranchant).
  const LM = 814;   // du bout du manche au centre de l'œil
  const MANCHE = [[0, 22], [10, 24], [30, 21], [65, 16], [300, 16.5], [600, 17.5], [LM - 40, 18.5], [LM + 40, 18.5]];
  const FER_TOE = [[34, -42], [35, -8], [33, 22], [40, 62], [51, 100], [60, 130]];
  const FER_TRANCHANT = [[60, 130], [30, 138], [0, 141], [-30, 139], [-62, 128]];
  const FER_TALON = [[-62, 128], [-52, 100], [-40, 62], [-33, 22], [-35, -8], [-34, -42]];
  const demi = a => { for (let i = 1; i < MANCHE.length; i++) { const [a0, w0] = MANCHE[i - 1], [a1, w1] = MANCHE[i];
    if (a <= a1) return w0 + (w1 - w0) * (a - a0) / (a1 - a0); } return MANCHE[MANCHE.length - 1][1]; };
  const BOUT = [[0, 22], [-4, 12], [-5, 0], [-4, -12], [0, -22]];
  // coupe : { de, a, jeu } — le manche interrompu entre de et a (deux brisures en S), le bout
  // rapproché du fer ; il reste dans l'axe, donc il bascule avec lui.
  const decalage = c => c ? c.a - c.de - c.jeu : 0;
  function hache(P, K0, u, v, ep = 1.4, coupe = null) {
    const T = ([a, b]) => P(K0[0] + a * u[0] + b * v[0], K0[1] + a * u[1] + b * v[1]);
    const Te = ([a, b]) => T([LM + a, b]);
    const out = [];
    if (!coupe) {
      const haut = MANCHE.map(([a, w]) => [a, -w]), bas = MANCHE.map(([a, w]) => [a, w]).reverse();
      out.push(h.path(ser(suite(lisse(haut), [['M', haut[haut.length - 1]], ['L', bas[0]]], lisse(bas), lisse(BOUT)), T) + ' Z', blanc(ep)));
    } else {
      const { de: a1, a: a2 } = coupe, dec = decalage(coupe);
      const Tb = ([a, b]) => T([a + dec, b]);
      const w1 = demi(a1), w2 = demi(a2);
      const entre = (lo, hi) => MANCHE.filter(([a]) => a > lo && a < hi);
      const brise = (a, w, sens) => { const q = [[a, -w], [a + 7, -w * 0.4], [a - 7, w * 0.4], [a, w]]; return lisse(sens > 0 ? q : q.reverse()); };
      const hautB = [[0, -22], ...entre(0, a1).map(([a, w]) => [a, -w]), [a1, -w1]];
      const basB = [[a1, w1], ...entre(0, a1).map(([a, w]) => [a, w]).reverse(), [0, 22]];
      out.push(h.path(ser(suite(lisse(hautB), brise(a1, w1, 1), lisse(basB), lisse(BOUT)), Tb) + ' Z', blanc(ep)));
      const hautH = [[a2, -w2], ...entre(a2, 1e9).map(([a, w]) => [a, -w])];
      const basH = [...entre(a2, 1e9).map(([a, w]) => [a, w]).reverse(), [a2, w2]];
      out.push(h.path(ser(suite(lisse(hautH), [['M', hautH[hautH.length - 1]], ['L', basH[0]]], lisse(basH), brise(a2, w2, -1)), T) + ' Z', blanc(ep)));
    }
    const fer = ser(suite(lisse(FER_TOE), lisse(FER_TRANCHANT), lisse(FER_TALON)), Te) + ' Z';
    const biseau = ser(lisse([[53, 108], [0, 121], [-55, 108]]), Te);
    out.push(h.path(fer, blanc(ep)), h.path(biseau, A.detail));
    return out.join('\n');
  }
  // un point de la hache, en mm de la vue
  const ptHache = (K0, u, v, a, b) => [K0[0] + a * u[0] + b * v[0], K0[1] + a * u[1] + b * v[1]];

  // ─── un rondin debout (bûche ou billot), un peu vu d'en haut ────────────────────────────
  // cx : l'axe ; yt, yb : le dessus et le bas (mm) ; r : le rayon. Rend fond (le dessus entier)
  // et avant (le corps et la moitié avant du dessus, peinte en blanc) : ce qui entre dans le bois
  // se glisse entre les deux et disparaît sous la surface. coupe : le bas coupé net.
  function rondin(P, s, cx, yt, yb, r, o = {}) {
    const k = 0.2, rx = r * s, ry = r * k * s, ep = o.ep || 1.4;
    const [X, Yt] = P(cx, yt), Yb = P(cx, yb)[1];
    const cernes = o.cernes || [0.28, 0.55, 0.8];
    const fond = [h.ellipse(X, Yt, rx, ry, A.blanc),
      h.path(`M${f1(X - rx)} ${f1(Yt)} A${f1(rx)} ${f1(ry)} 0 0 1 ${f1(X + rx)} ${f1(Yt)}`, `fill="none" stroke="${NOIR}" stroke-width="${ep}"`),
      ...cernes.map(c => h.ellipse(X, Yt, rx * c, ry * c, A.fin))];
    let corps;
    if (o.coupe) {
      const n = 10, pts = [];
      for (let i = 0; i <= n; i++) pts.push([X - rx + 2 * rx * i / n, Yb + [0, 2.5, 0, -2.5][i % 4]]);
      corps = `M${f1(X - rx)} ${f1(Yt)} L${XY(pts[0])} ${ser(lisse(pts), p => p).replace(/^M[^C]*/, '')} L${f1(X + rx)} ${f1(Yt)} A${f1(rx)} ${f1(ry)} 0 0 1 ${f1(X - rx)} ${f1(Yt)} Z`;
    } else {
      corps = `M${f1(X - rx)} ${f1(Yt)} L${f1(X - rx)} ${f1(Yb)} A${f1(rx)} ${f1(ry)} 0 0 0 ${f1(X + rx)} ${f1(Yb)} L${f1(X + rx)} ${f1(Yt)} A${f1(rx)} ${f1(ry)} 0 0 1 ${f1(X - rx)} ${f1(Yt)} Z`;
    }
    const ecorce = [];
    for (const [f, t0, t1] of [[-0.9, 0.12, 0.34], [-0.9, 0.52, 0.8], [-0.72, 0.3, 0.55], [0.74, 0.16, 0.42], [0.9, 0.36, 0.62], [0.9, 0.74, 0.9]]) {
      const x = X + f * rx, y0 = Yt + ry * Math.sqrt(1 - f * f);
      const hy = Yb - y0;
      ecorce.push(h.ligne(x, y0 + hy * t0, x, y0 + hy * t1, A.fin));
    }
    // la face à l'ombre : la lumière vient d'en haut à gauche, le tiers droit du rondin est à l'ombre
    const ombre = [];
    if (o.ombre !== false) {
      const n = 12, x0 = 0.42;
      const haut = [], bas = [];
      for (let i = 0; i <= n; i++) {
        const f = x0 + (1 - x0) * i / n, dy = ry * Math.sqrt(Math.max(0, 1 - f * f));
        haut.push([X + f * rx, Yt + dy]);
        bas.push([X + f * rx, o.coupe ? Yb : Yb + dy]);
      }
      ombre.push(h.chemin([...haut, ...bas.reverse()], A.ombre, true));
    }
    const avant = [h.path(`M${f1(X - rx + 0.8)} ${f1(Yt)} A${f1(rx - 0.8)} ${f1(ry - 0.8)} 0 0 0 ${f1(X + rx - 0.8)} ${f1(Yt)} Z`, FOND),
      h.path(corps, FOND), ...ombre, h.path(corps, `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`),
      ...cernes.map(c => h.path(`M${f1(X - rx * c)} ${f1(Yt)} A${f1(rx * c)} ${f1(ry * c)} 0 0 0 ${f1(X + rx * c)} ${f1(Yt)}`, A.fin)),
      ...ecorce];
    return { fond: fond.join('\n'), avant: avant.join('\n'), X, Yt, rx, ry };
  }

  // ─── la scène du fendage, en mm (repère du personnage : sol en y = 0) ─────────────────────
  // Tout part des poings du corps simple : le manche à leur hauteur, le bout du manche juste derrière
  // le poing loin, la bûche sous le fer, le billot dessous.
  const MAINS = F.corps({ x: 0, y: 0, pose: 'fendre', echelle: 1, angles: ANGLES_FENDEUR, objetP: '<g/>' });
  const G1 = [MAINS.mainP.x, MAINS.mainP.y], G2 = [MAINS.mainL.x, MAINS.mainL.y];
  const GENOU = MAINS.articulations.genouP;
  const Y_MANCHE = G1[1];                      // à l'impact, le manche à l'horizontale
  const X_BOUT = G2[0] - 66;
  const XB = X_BOUT + LM;                      // l'axe du billot et de la bûche
  const BUCHE = { r: 130, h: 330 };
  const Y_DESSUS = Y_MANCHE + 141 - 16;        // le tranchant vient d'entrer de 16 mm
  const Y_BUCHE = Y_DESSUS + BUCHE.h;          // le dessus du billot
  const BILLOT = { r: 230, h: -Y_BUCHE };
  const K_IMPACT = [X_BOUT, Y_MANCHE];
  const C_MAINS = [(G1[0] + G2[0]) / 2, Y_MANCHE];
  const TR = [XB, Y_MANCHE + 141];            // le tranchant
  const R_ARC = Math.hypot(TR[0] - C_MAINS[0], TR[1] - C_MAINS[1]);
  const T0 = Math.atan2(TR[1] - C_MAINS[1], TR[0] - C_MAINS[0]) / RAD;
  const T1 = Math.asin((Y_BUCHE + 40 - C_MAINS[1]) / R_ARC) / RAD;   // 40 mm dans le billot
  const ptArc = t => [C_MAINS[0] + R_ARC * Math.cos(t * RAD), C_MAINS[1] + R_ARC * Math.sin(t * RAD)];
  const Y_PLAN = 400;                  // l'axe de la vue de dessus, sous l'élévation
  const PIED_Y = 205;                  // les pieds de part et d'autre de la trajectoire
  const BOITE_IMPACT = [[-300, XB + 255], [-1735, 690]];

  // la botte vue de dessus, pied droit (x vers l'avant, +y vers l'extérieur)
  const BOTTE = [[0, 0], [8, 30], [40, 41], [120, 43], [190, 52], [245, 45], [285, 22], [300, -6], [290, -34], [256, -52], [205, -55], [150, -36], [100, -31], [40, -38], [8, -28]];

  const vueImpact = z => {
    const { s, P } = cadre(z, ...BOITE_IMPACT);
    const out = [];
    out.push(h.ligne(...P(-290, 0), ...P(XB + 250, 0), A.arete));
    // le billot, la bûche, la hache qui entre dans la fente
    const bi = rondin(P, s, XB, -BILLOT.h, 0, BILLOT.r), bu = rondin(P, s, XB, Y_DESSUS, Y_BUCHE, BUCHE.r);
    out.push(bi.fond, bi.avant, bu.fond);
    // le fendeur, corps simple : la hache passe devant le tronc et derrière le poing proche
    const [ox, oy] = P(0, 0);
    out.push(F.corps({ x: ox, y: oy, pose: 'fendre', echelle: s, angles: ANGLES_FENDEUR, trait: 'fort',
      objetP: hache(P, K_IMPACT, [1, 0], [0, 1], 2.4) }).svg);
    out.push(bu.avant);
    out.push(h.ligne(bu.X - bu.rx * 0.92, bu.Yt, bu.X + bu.rx * 0.92, bu.Yt, A.detail));
    // là où passe le fer qui traverse : il continue son arc autour des mains et finit dans le billot
    const arc = [];
    for (let t = T0 + 3; t <= T1 + 0.01; t += (T1 - T0 - 3) / 8) arc.push(P(...ptArc(t)));
    out.push(h.path(ser(lisse(arc), p => p), A.zone + ' marker-end="url(#fl-r)"'));
    // le geste : le coup qui descend droit sur la bûche
    const B = [[XB - 560, -1700], [XB - 130, -1700], [XB, -1440], [XB, Y_MANCHE - 80]].map(p => P(...p));
    out.push(h.geste(`M${XY(B[0])} C${XY(B[1])} ${XY(B[2])} ${XY(B[3])}`));

    // ── vu de dessus, aligné sous l'élévation ──
    const Q = (x, y) => P(x, Y_PLAN + y);
    const [bx, by] = Q(XB, 0);
    out.push(h.cercle(bx, by, BILLOT.r * s, blanc(1.4)));
    for (const c of [0.72, 0.86]) out.push(h.cercle(bx, by, BILLOT.r * s * c, A.fin));
    out.push(h.cercle(bx, by, BUCHE.r * s, blanc(1.4)));
    for (const c of [0.3, 0.56, 0.8]) out.push(h.cercle(bx, by, BUCHE.r * s * c, A.fin));
    // les fentes de séchage : la grande dans l'axe du coup, deux petites ailleurs
    const fente = (ang, r0, r1, l) => {
      const d = tourne([1, 0], ang), n = tourne([0, 1], ang);
      const a = plus([XB, 0], fois(d, r0)), b1 = plus(plus([XB, 0], fois(d, r1)), fois(n, l)), b2 = plus(plus([XB, 0], fois(d, r1)), fois(n, -l));
      return h.chemin([Q(...a), Q(...b1), Q(...b2)], A.plein, true);
    };
    out.push(fente(180, 12, BUCHE.r - 1, 13), fente(0, 14, BUCHE.r, 5), fente(115, 60, BUCHE.r, 3), fente(250, 70, BUCHE.r, 2.5));
    // le plan du coup : un trait mixte sans pointe, du bord du billot jusque derrière les talons,
    // entre les deux pieds (la fente reste seule dans la bûche)
    out.push(h.ligne(...Q(XB - BILLOT.r - 14, 0), ...Q(-330, 0), A.zone));
    // les bottes
    const botte = (cy, cote) => {
      const pts = BOTTE.map(([x, y]) => { const q = tourne([x, y * cote], 6 * cote); return Q(-80 + q[0], cy + q[1]); });
      const [tx, ty] = (() => { const q = tourne([60, 0], 6 * cote); return Q(-80 + q[0], cy + q[1]); })();
      return [h.path(ser(lisse(pts, true), p => p), blanc(1.4)), h.ellipse(tx, ty, 52 * s, 46 * s, A.detail)].join('\n');
    };
    out.push(botte(-PIED_Y, -1), botte(PIED_Y, 1));
    return out.join('\n');
  };
  const renvoisImpact = z => {
    const { P } = cadre(z, ...BOITE_IMPACT);
    const Q = (x, y) => P(x, Y_PLAN + y);
    return [
      { n: 1, rond: P(XB + 200, -1150), cible: P(XB + 80, -560), texte: 'la bûche debout sur un billot' },
      { n: 2, rond: P(GENOU[0] + 290, -330), cible: P(GENOU[0] + 40, GENOU[1] + 10), texte: 'le poids descend, les genoux se placent' },
      { n: 3, rond: P(XB - 330, -1150), cible: P(XB - 330, Y_MANCHE - 12), texte: 'à l’impact, le manche à l’horizontale' },
      { n: 4, rond: P(XB - 560, -170), cible: P(...ptArc(T1 - 2)), texte: 'le fer qui traverse finit dans le billot' },
      { n: 5, rond: Q(-240, -PIED_Y - 60), cible: Q(-40, -PIED_Y - 38), texte: 'pieds écartés, jambes hors de la trajectoire' },
      { n: 6, rond: Q(XB - 330, -150), cible: Q(XB - 75, 0), texte: 'le premier coup dans une fente de séchage' },
    ];
  };

  // ─── dans l'axe du manche : la torsion qui ouvre la bûche ───────────────────────────────
  // Vu du fendeur, le long du manche : le bout du manche (ovale), le fer de chant (un coin), la
  // bûche fendue par le haut. En tireté, le fer tel qu'il est entré ; en plein, tourné par la
  // torsion. Origine au centre du dessus de la bûche.
  const BOITE_TORSION = [[-190, 190], [-205, 245]];
  const OEIL = [0, -93], ROT = 12;
  const COIN = [[-26, -42], [26, -42], [27, -5], [26, 30], [19, 85], [9, 118], [0, 141], [-9, 118], [-19, 85], [-26, 30], [-27, -5]];
  const vueTorsion = z => {
    const { s, P } = cadre(z, ...BOITE_TORSION);
    const r = BUCHE.r, ry = r * 0.2, g = 14, D = 150, bas = 235;
    const out = [];
    // le fer tel qu'il est entré, droit
    out.push(h.path(ser(lisse(COIN, true), p => P(...plus(OEIL, p))), A.cache));
    // le dessus, en deux moitiés écartées
    for (const c of [-1, 1]) {
      const [X, Y] = P(c * g, 0);
      const rx = r * s, rys = ry * s, sw = c < 0 ? 0 : 1;
      out.push(h.path(`M${f1(X)} ${f1(Y - rys)} A${f1(rx)} ${f1(rys)} 0 0 ${sw} ${f1(X + c * rx)} ${f1(Y)} A${f1(rx)} ${f1(rys)} 0 0 ${sw} ${f1(X)} ${f1(Y + rys)} Z`, blanc(2.4)));
      for (const k of [0.3, 0.56, 0.8]) out.push(h.path(`M${f1(X)} ${f1(Y - rys * k)} A${f1(rx * k)} ${f1(rys * k)} 0 0 ${sw} ${f1(X + c * rx * k)} ${f1(Y)} A${f1(rx * k)} ${f1(rys * k)} 0 0 ${sw} ${f1(X)} ${f1(Y + rys * k)}`, A.fin));
    }
    // le fer de chant, tourné par la torsion autour de son entrée dans le bois
    const Tf = p => P(...tourne(plus(OEIL, p), ROT));
    out.push(h.path(ser(lisse(COIN, true), Tf), blanc(1.4)));
    // le corps de la bûche, fendu en V par devant ; il cache le fer sous le dessus
    const c = [P(-r - g, 0), P(-r, ry + D), P(-r, bas)];
    const vag = [];
    for (let i = 0; i <= 8; i++) vag.push(P(-r + 2 * r * i / 8, bas + (i % 2 ? 4 : -3)));
    const dr = [P(r, bas), P(r, ry + D), P(r + g, 0)];
    const [Xr, Yr] = P(g, 0), [Xl, Yl] = P(-g, 0), rx = r * s, rys = ry * s;
    const corps = `M${XY(c[0])} L${XY(c[1])} L${XY(c[2])} ${ser(lisse(vag), p => p).replace(/^M/, 'L')} L${XY(dr[1])} L${XY(dr[2])}`
      + ` A${f1(rx)} ${f1(rys)} 0 0 1 ${f1(Xr)} ${f1(Yr + rys)} L${XY(P(0, ry + D))} L${f1(Xl)} ${f1(Yl + rys)} A${f1(rx)} ${f1(rys)} 0 0 1 ${XY(c[0])} Z`;
    out.push(h.path(corps, blanc(2.4)));
    for (const k of [0.3, 0.56, 0.8]) {
      out.push(h.path(`M${f1(Xl - rx * k)} ${f1(Yl)} A${f1(rx * k)} ${f1(rys * k)} 0 0 0 ${f1(Xl)} ${f1(Yl + rys * k)}`, A.fin));
      out.push(h.path(`M${f1(Xr)} ${f1(Yr + rys * k)} A${f1(rx * k)} ${f1(rys * k)} 0 0 0 ${f1(Xr + rx * k)} ${f1(Yr)}`, A.fin));
    }
    for (const [x, y0, y1] of [[-118, 50, 130], [-104, 150, 215], [-122, 170, 225], [116, 60, 140], [104, 140, 210], [122, 180, 225]]) out.push(h.ligne(...P(x, y0), ...P(x, y1), A.fin));
    // le bout du manche, de face : l'ovale du bois de bout, devant l'œil du fer
    const oeilT = tourne(OEIL, ROT), [ox, oy] = P(...oeilT);
    const ovale = (ax, ay) => { const pts = []; for (let t = 0; t < 360; t += 20) pts.push(P(...plus(oeilT, tourne([ax * Math.cos(t * RAD), ay * Math.sin(t * RAD)], ROT)))); return ser(lisse(pts, true), p => p); };
    out.push(h.path(ovale(21, 28), blanc(1.4)), h.path(ovale(11, 15), A.fin));
    // la torsion : un bout de tour autour du manche, par le haut
    const arc = [];
    for (let t = 200; t <= 330; t += 10) arc.push(P(oeilT[0] + 74 * Math.cos(t * RAD), oeilT[1] + 74 * Math.sin(t * RAD)));
    out.push(h.geste(ser(lisse(arc), p => p)));
    return out.join('\n');
  };
  const renvoisTorsion = z => {
    const { P } = cadre(z, ...BOITE_TORSION);
    const oeilT = tourne(OEIL, ROT);
    const cible = plus(oeilT, [74 * Math.cos(290 * RAD), 74 * Math.sin(290 * RAD)]);
    return [{ n: 7, rond: P(150, -175), cible: P(...cible), texte: 'légère torsion : la bûche s’ouvre' }];
  };

  // ─── la hache coincée : le coup de paume ────────────────────────────────────────────────
  // Origine au centre du dessus de la bûche ; le fendeur est à gauche, le fer à droite. Le manche
  // est interrompu au milieu pour que la main et le fer se voient en grand ; la bûche est coupée
  // sous le fer.
  const COUPE = { de: 220, a: 690, jeu: 30 }, DEC = decalage(COUPE);
  const BOITE_COINCE = [[-500, 200], [-345, 122]];
  const K_COINCE = [-LM, -111];                // le milieu du tranchant à 30 mm sous le dessus
  const PIVOT = [-62, 17];                     // le talon du tranchant, dans le bois
  const BASCULE = -12;                         // le manche qui descend sous la paume
  const LEVE = 100;                            // la main, avant le coup
  const vueCoince = (apres) => z => {
    const { s, P } = cadre(z, ...BOITE_COINCE);
    const bu = rondin(P, s, 0, 0, 110, BUCHE.r, { ep: 2.4, coupe: true, ombre: false });
    const out = [bu.fond];
    const u = tourne([1, 0], apres ? BASCULE : 0), v = tourne([0, 1], apres ? BASCULE : 0);
    const K0 = apres ? plus(PIVOT, tourne(moins(K_COINCE, PIVOT), BASCULE)) : K_COINCE;
    out.push(hache(P, K0, u, v, 2.4, COUPE));
    out.push(bu.avant);
    out.push(h.ligne(bu.X - bu.rx * 0.9, bu.Yt, bu.X + bu.rx * 0.9, bu.Yt, A.detail));
    // la main ouverte : au-dessus du bout du manche, puis à plat dessus
    const surf = ptHache(K0, u, v, DEC + 55, -23);
    const lev = apres ? 0 : LEVE;
    const pm = plus(surf, fois(v, -lev));
    // la main gauche à plat (mains simples, plat, vue du côté du pouce), paume en bas, les doigts vers le fer :
    // le creux de la paume sur le bout du manche (la paume est à 24,5 mm sous l'axe de la main, poses.json) ;
    // l'avant-bras remonte à gauche jusqu'au bord
    // (penchée de 25° vers l'œil pour que les doigts se lisent ; la paume, vue ainsi, tombe à 26 mm sous l'axe)
    { const w = P(...plus(pm, plus(fois(u, -62), fois(v, -26))));
      out.push(F.mainSimple({ pose: 'plat', vue: 'pouce', cote: 'gauche', angle: Math.atan2(u[1], u[0]) / RAD, rotation: [-25, 0, 0],
        echelle: s, ancre: 'poignet', x: w[0], y: w[1], avantbras: { vers: P(...plus(pm, [-400, -300])), bord: { x0: 0, y0: 0, x1: z.l, y1: z.h }, longueur: 'bord' } }).svg); }
    if (!apres) {
      const f0 = ptHache(K0, u, v, DEC + 100, -23 - lev + 22), f1_ = ptHache(K0, u, v, DEC + 100, -23 - 8);
      out.push(h.geste(`M${XY(P(...f0))} L${XY(P(...f1_))}`));            // le geste : frapper de la paume
    } else {
      // le fer bascule sur son talon et sort du bois
      const a = [];
      for (let t = 4; t >= -44; t -= 4) a.push(P(...plus(PIVOT, tourne([205, 0], t))));
      out.push(h.fleche(ser(lisse(a), p => p), A.arete));
    }
    return out.join('\n');
  };
  const renvoisCoince = (apres) => z => {
    const { P } = cadre(z, ...BOITE_COINCE);
    const K0 = apres ? plus(PIVOT, tourne(moins(K_COINCE, PIVOT), BASCULE)) : K_COINCE;
    const u = tourne([1, 0], apres ? BASCULE : 0), v = tourne([0, 1], apres ? BASCULE : 0);
    return apres
      ? [{ n: 9, rond: P(150, -330), cible: P(...plus(PIVOT, tourne([205, 0], -30))), texte: 'le fer bascule et sort du bois' }]
      : [{ n: 8, rond: P(-150, -330), cible: P(...ptHache(K0, u, v, DEC + 130, -23 - LEVE - 12)), texte: 'la paume frappe, sans tenir le manche' }];
  };

  return {
    ref: '24-02',
    titre: 'Fendre sur le billot',
    desc: 'Le fendeur de profil à l’impact : genoux pliés, bras presque tendus, les deux poings au bout du manche, le manche à l’horizontale, la bûche debout sur un billot ; le fer qui traverse finit son arc dans le billot. Dessous, la même scène vue de dessus : les pieds écartés de part et d’autre de la trajectoire, le coup dans la fente de séchage. Dans l’axe du manche, la légère torsion qui tourne le fer et ouvre la bûche. La hache coincée : la main ouverte frappe le bout du manche vers le bas, sans le tenir, et le fer bascule sur son talon hors du bois.',
    format: 'pleine',
    disposition: [['impact', 'torsion'], ['coince1', 'coince2']],
    hauteurs: [3.3, 2],
    largeurs: [[1.25, 1], [1, 1]],
    vues: {
      impact: { titre: 'À l’impact, et vu de dessus', dessin: vueImpact, renvois: renvoisImpact },
      torsion: { titre: 'Dans l’axe du manche', dessin: vueTorsion, renvois: renvoisTorsion },
      coince1: { titre: 'La hache coincée', dessin: vueCoince(false), renvois: renvoisCoince(false) },
      coince2: { titre: 'Le coup de paume', dessin: vueCoince(true), renvois: renvoisCoince(true) },
    },
  };
};
