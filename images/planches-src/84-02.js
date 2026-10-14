// Planche 84-02 — La perche à chapeau (chapitre 84, « Dégager le chapeau sans monter sur le toit »).
// Cotes : aucune. Le chapitre ne donne aucune mesure de la perche ni du crochet : la longueur se
// mesure sur place à l'automne, des mains au chapeau. La seule mesure, « à une main du tronc »,
// est dans la légende. Aucun autre chiffre.
// La scène : le chalet en vue cavalière, le versant qui porte le conduit face à nous, le pignon à
// gauche ; l'homme debout sur le banc de neige au bout du versant, côté pignon ; la plaque de neige
// qui part droit vers le bas de la pente et tombe le long du mur, loin de lui.
// Au chapeau : deux temps, le bonnet cassé, puis le grillage gratté.
// Le crochet : la broche (ou le long clou) couchée le long du bout de la perche, deux ligatures de
// fil de fer, les bouts tordus ensemble. La fourche : une branche coupée à une main du tronc.
// Refaite le 13 octobre 2026 : l'homme est le corps simple de profil (perche-levee), les bras posés
// par le calcul sur la perche. Le rouge : la zone où la plaque glisse et tombe (on se tient hors
// de sa trajectoire, côté pignon), la poussée qui casse le bonnet, le va-et-vient qui gratte le
// grillage ; la chute de la plaque et le bonnet qui part restent en noir.
module.exports = (h) => {
  const A = h.a;
  const NOIR = A.plein.match(/fill="([^"]+)"/)[1], BLANC = '#FFFFFF';
  const W = at => at.replace('fill="none"', `fill="${BLANC}"`);
  const f = v => Math.round(v * 10) / 10;
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const poly = (pts, at) => h.chemin(pts, at, true);
  const add = (p, q, k = 1) => [p[0] + q[0] * k, p[1] + q[1] * k];
  // une courbe qui passe par chaque point (Catmull-Rom)
  const lisse = (pts, ferme = false) => {
    const n = pts.length, P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${pt(pts[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      d += ` C${pt([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${pt([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pt(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  const suite = pts => lisse(pts).replace(/^M[^C]*/, '');
  // un fil de métal : ses deux bords et le blanc entre les deux ; mince, un seul trait
  const fil = (d, ep) => ep >= 2.2
    ? `<path d="${d}" fill="none" stroke="${NOIR}" stroke-width="${f(ep)}" stroke-linecap="round" stroke-linejoin="round"/>\n`
      + `<path d="${d}" fill="none" stroke="${BLANC}" stroke-width="${f(ep - 1.3)}" stroke-linecap="round" stroke-linejoin="round"/>`
    : `<path d="${d}" fill="none" stroke="${NOIR}" stroke-width="${f(ep)}" stroke-linecap="round" stroke-linejoin="round"/>`;

  // ── Le repère de la perche : u le long de la perche vers le bout, v à sa droite (mm) ──
  const repere = (O, d, s) => { const n = [-d[1], d[0]]; return ([u, v]) => [O[0] + s * (u * d[0] + v * n[0]), O[1] + s * (u * d[1] + v * n[1])]; };
  const dir = a => [Math.cos(a * Math.PI / 180), -Math.sin(a * Math.PI / 180)];   // a : degrés au-dessus de l'horizontale
  const ovale = (T, c, ru, rv, n = 28) => { const o = []; for (let i = 0; i < n; i++) { const t = i / n * 2 * Math.PI; o.push(T([c[0] + ru * Math.sin(t), c[1] + rv * Math.cos(t)])); } return o; };

  // la perche, du bas u0 (cassé, ou arrondi) au bout coupé (u = 0), diamètre D
  const perche = (T, D, u0, { noeuds = [], fibres = [], casse = true, face = true } = {}) => {
    const r = D / 2, rb = r * 1.05, o = [];
    const bas = casse ? [[u0, rb], [u0 - D * 0.14, rb * 0.35], [u0 + D * 0.14, -rb * 0.35], [u0, -rb]]
      : [[u0, rb], [u0 - r * 0.5, rb * 0.6], [u0 - r * 0.6, 0], [u0 - r * 0.5, -rb * 0.6], [u0, -rb]];
    o.push(h.path(`M${pt(T([0, -r]))} L${pt(T([0, r]))} L${pt(T([u0, rb]))}${suite(bas.map(T))} Z`, W(A.arete)));
    for (const [a, b, v] of fibres) o.push(h.chemin([T([a, v]), T([b, v])], A.fin));
    for (const [u, v, k = 1] of noeuds) {
      o.push(poly(ovale(T, [u, v], 0.2 * D * k, 0.13 * D * k), W(A.detail)));
      o.push(poly(ovale(T, [u, v], 0.1 * D * k, 0.065 * D * k, 16), A.fin));
    }
    if (face) {                                            // le bout coupé, vu un peu d'en haut
      o.push(poly(ovale(T, [0, 0], 0.26 * r, r), W(A.arete)));
      o.push(poly(ovale(T, [0, 0], 0.15 * r, 0.58 * r), A.fin));
      o.push(poly(ovale(T, [0, 0], 0.03 * r, 0.1 * r, 12), A.plein));
    }
    return o.join('\n');
  };
  // la broche pliée en crochet : la queue couchée le long de la perche (v = vs), la crosse au-delà
  // du bout, la pointe qui revient vers les mains
  const crosseBroche = (u0, vs) => [[u0, vs], [u0 * 0.5, vs], [0, vs], [40, vs], [62, vs + 4], [74, vs + 22], [67, vs + 41], [50, vs + 49], [34, vs + 50]];
  // le long clou : la tête en bas, sous la ligature du bas ; le coude serré, la pointe vers les mains
  const crosseClou = (u0, vs) => [[u0, vs], [u0 * 0.5, vs], [0, vs], [24, vs], [34, vs + 3], [41, vs + 13], [38, vs + 25], [28, vs + 30], [17, vs + 31]];
  // une ligature : des tours de fil jointifs de u = a à u = b, les deux bouts tordus ensemble
  const ligature = (T, s, r, a, b, ep) => {
    const o = [], pas = ep / s;
    for (let u = a; u <= b + 0.01; u += pas) o.push(fil(`M${pt(T([u - pas * 0.35, -r - 0.6 / s]))} L${pt(T([u + pas * 0.35, r + 0.6 / s]))}`, ep));
    // la torsade : deux fils qui se croisent, rabattue le long de la perche vers le bas
    const v0 = -r * 0.45, lg = 4.5 * pas, t1 = [], t2 = [];
    for (let i = 0; i <= 12; i++) { const u = a - pas * 0.3 - (i / 12) * lg, w = Math.sin(i / 12 * 2 * Math.PI) * pas * 0.3; t1.push(T([u, v0 + w])); t2.push(T([u, v0 - w])); }
    o.push(fil(lisse(t1), ep * 0.55), fil(lisse(t2), ep * 0.55));
    return o.join('\n');
  };

  // ── Le chapeau du conduit (mm, en élévation) : tuyau, grillage, capuchon, bonnet ──────
  const PR = 100, GH = 160, CR = 178, RIM = 12, CH = 88;
  const chapeau = (cx, yT, s, { bonnet = false, givre = false, brindilles = false, bas = null, casse = false } = {}) => {
    const X = x => cx + x * s, Y = y => yT - y * s, o = [];
    if (bas !== null) {                                   // le tuyau, du toit (ou de la cassure) au collet
      o.push(h.path(`M${pt([X(-PR), Y(0)])} L${pt([X(-PR), bas])} L${pt([X(PR), bas])} L${pt([X(PR), Y(0)])}`, W(A.arete)));
    }
    o.push(h.rect(X(-PR - 8), Y(30), 2 * (PR + 8) * s, 30 * s, W(A.arete)));            // le collet
    o.push(h.rect(X(-PR), Y(30 + GH), 2 * PR * s, GH * s, h.a.hachure('grillage', s > 0.15 ? 'arete' : 'detail')));
    for (const x of [-PR + 6, PR - 6]) o.push(h.ligne(X(x), Y(30), X(x), Y(30 + GH), s > 0.15 ? A.arete : A.detail));   // les pattes
    const yr = 30 + GH;
    if (givre) {                                          // le givre : une croûte blanche qui bouche les mailles, en plumes vers le vent
      const bas = [[PR + 2, 84], [70, 76], [40, 92], [8, 84], [-24, 102], [-54, 96], [-84, 110], [-PR - 8, 114]];
      const plumes = [];
      for (let y = 118, i = 0; y < yr - 8; y += 12, i++) plumes.push([-PR - (i % 2 ? 14 : 24), y + 2], [-PR - 6, y + 8]);
      const d = `M${pt([X(PR + 2), Y(yr)])} L${pt([X(PR + 2), Y(84)])}` + suite(bas.map(p => [X(p[0]), Y(p[1])]))
        + plumes.map(p => ` L${pt([X(p[0]), Y(p[1])])}`).join('') + ` L${pt([X(-PR - 6), Y(yr)])} Z`;
      o.push(h.path(d, W(A.detail)));
      for (let y = 124; y < yr - 8; y += 24) o.push(h.ligne(X(-PR - 8), Y(y + 6), X(-PR - 26), Y(y + 10), A.fin));
    }
    o.push(poly([[X(-CR), Y(yr)], [X(-CR), Y(yr + RIM)], [X(0), Y(yr + RIM + CH)], [X(CR), Y(yr + RIM)], [X(CR), Y(yr)]], W(A.arete)));
    o.push(h.ligne(X(-CR), Y(yr + RIM), X(CR), Y(yr + RIM), A.detail));
    if (brindilles) {                                     // coincé entre le capuchon et le grillage
      for (const [x1, y1, x2, y2] of [[40, yr - 6, 190, yr + 14], [55, yr - 16, 205, yr - 40], [70, yr - 4, 170, yr - 70], [30, yr - 10, 150, yr + 6]]) {
        o.push(h.ligne(X(x1), Y(y1), X(x2), Y(y2), A.detail));
        const m = [X(x1 + (x2 - x1) * 0.7), Y(y1 + (y2 - y1) * 0.7)];
        o.push(h.ligne(m[0], m[1], m[0] + 12 * s * 3, m[1] - 6 * s * 3 * Math.sign(y2 - y1 + 0.1), A.fin));
      }
    }
    let info = { flanc: [X(-CR - 10), Y(yr + RIM + 70)], grillage: [X(-PR), Y(30 + GH * 0.45)], rim: [X(CR), Y(yr + 4)], haut: Y(yr + RIM + CH) };
    if (bonnet) {                                         // le bonnet de neige soufflée, débordant du capuchon
      const b = [[-CR - 6, yr + RIM], [-CR - 22, yr + RIM + 34], [-150, yr + 116], [-60, yr + 194], [40, yr + 208], [150, yr + 154], [CR + 34, yr + 66], [CR + 40, yr + RIM + 16], [CR + 22, yr + RIM]];
      const d = lisse(b.map(p => [X(p[0]), Y(p[1])])) + ' Z';
      o.push(h.path(d, A.blanc), h.path(d, h.a.hachure('neige', s > 0.15 ? 'arete' : 'detail')));
      if (casse) o.push(h.chemin([[-CR - 8, yr + 70], [-120, yr + 96], [-100, yr + 88], [-50, yr + 150], [-30, yr + 142], [10, yr + 204]].map(p => [X(p[0]), Y(p[1])]), A.arete));
      info = Object.assign(info, { bonnetD: [X(CR + 36), Y(yr + 50)], bonnetH: [X(40), Y(yr + 205)], flanc: [X(-CR - 20), Y(yr + 55)] });
    }
    return { svg: o.join('\n'), info };
  };

  // ── La scène, en vue cavalière (mm) : x le long du mur, y vers le haut, z vers le fond ─
  const LG = 4200, E = 2300, PD = 4200, TG = Math.tan(30 * Math.PI / 180), OV = 300, FT = 150, SN = 250;
  const RG = E + (PD / 2) * TG, EE = E - OV * TG;
  const CX = 700, CZ = 700, YPT = 3650;                  // le conduit ; le haut du tuyau
  const toit = zz => zz <= PD / 2 ? E + zz * TG : E + (PD - zz) * TG;
  const KX = 0.39, KY = 0.225;
  const brut = (x, y, zz) => [x - KX * zz, y + KY * zz];
  const PERSO = -2000, BANC = 700;                       // l'homme, debout sur le banc
  const TIP = [CX - CR - 70, YPT + 30 + GH + RIM + 50];  // le bout de la perche, contre le flanc du bonnet
  const G1M = [-1780, 1780];
  const DP = (() => { const a = Math.atan2(TIP[1] - G1M[1], TIP[0] - G1M[0]); return [Math.cos(a), Math.sin(a)]; })();
  const geoScene = z => {
    const pts = [brut(-3250, 0, CZ), brut(LG + OV, 0, -OV), brut(-OV, RG + SN, PD / 2), brut(CX, 4200, CZ), brut(-OV, EE, PD + OV), brut(-3250, 0, -OV)];
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const s = Math.min((z.l - 6) / (x1 - x0), (z.h - 6) / (y1 - y0));
    const ox = (z.l - s * (x1 - x0)) / 2 - s * x0, oy = (z.h - s * (y1 - y0)) / 2 + s * y1;
    return { s, P: (x, y, zz) => { const b = brut(x, y, zz); return [ox + s * b[0], oy - s * b[1]]; } };
  };
  // Pose les deux bras d'un corps simple de profil pour que ses prises tombent sur les cibles (vue) :
  // le poignet visé (la cible moins le décalage de la prise), le coude qui plie vers l'avant.
  const RD_ = Math.PI / 180;
  const dirPose = a => [Math.sin(a * RD_), Math.cos(a * RD_)];
  const anglePose = v => Math.atan2(v[0], v[1]) / RD_;
  const atteint = (o, cibles) => {
    let c = h.formes.corps(o);
    const ang = {};
    const A_ = c.articulations, S0 = A_.epauleP;
    const L1 = Math.hypot(A_.coudeP[0] - S0[0], A_.coudeP[1] - S0[1]), L2 = Math.hypot(A_.poignetP[0] - A_.coudeP[0], A_.poignetP[1] - A_.coudeP[1]);
    for (let it = 0; it < 4; it++) {
      for (const k of ['P', 'L']) {
        const Wr = c.articulations['poignet' + k], M = [c['main' + k].x, c['main' + k].y], T = cibles[k];
        const W = [T[0] - (M[0] - Wr[0]), T[1] - (M[1] - Wr[1])];
        const d = [W[0] - S0[0], W[1] - S0[1]], D = Math.min(L1 + L2 - 0.3, Math.hypot(d[0], d[1]));
        const al = Math.acos(Math.max(-1, Math.min(1, (L1 * L1 + D * D - L2 * L2) / (2 * L1 * D)))) / RD_;
        const bras = anglePose(d) - al, Eb = [S0[0] + dirPose(bras)[0] * L1, S0[1] + dirPose(bras)[1] * L1];
        const avb = anglePose([W[0] - Eb[0], W[1] - Eb[1]]);
        ang['bras' + k] = bras; ang['avantbras' + k] = avb; ang['main' + k] = avb + 10;
      }
      c = h.formes.corps({ ...o, angles: { ...(o.angles || {}), ...ang } });
    }
    return c;
  };
  const scene = z => {
    const { s, P } = geoScene(z), o = [];
    const bande = (x, zs, bas, haut) => [...zs.map(zz => P(x, toit(zz) + haut, zz)), ...zs.slice().reverse().map(zz => P(x, toit(zz) + bas, zz))];
    // le pignon (x = 0) et son déclin
    o.push(poly([P(0, 0, 0), P(0, 0, PD), P(0, E, PD), P(0, RG, PD / 2), P(0, E, 0)], W(A.arete)));
    for (let y = 280; y < RG - 100; y += 280) {
      const dz = y > E ? (y - E) / TG : 0;
      o.push(h.ligne(...P(0, y, dz), ...P(0, y, PD - dz), A.fin));
    }
    // la rive du versant arrière, vue du côté du pignon
    const zAr = [PD / 2, PD + OV];
    o.push(poly(bande(-OV, zAr, -FT, 0), W(A.arete)));
    o.push(poly(bande(-OV, zAr, 0, SN), A.blanc), poly(bande(-OV, zAr, 0, SN), h.a.hachure('neige', 'arete')));
    // le mur long, son déclin, une fenêtre
    o.push(poly([P(0, 0, 0), P(LG, 0, 0), P(LG, E, 0), P(0, E, 0)], W(A.arete)));
    for (let y = 280; y < E; y += 280) o.push(h.ligne(...P(0, y, 0), ...P(LG, y, 0), A.fin));
    const fen = [P(2500, 850, 0), P(3400, 850, 0), P(3400, 1750, 0), P(2500, 1750, 0)];
    o.push(poly(fen, W(A.arete)), h.ligne(...P(2950, 850, 0), ...P(2950, 1750, 0), A.detail), h.ligne(...P(2500, 1300, 0), ...P(3400, 1300, 0), A.detail));
    // la rive du versant avant (côté pignon), la bordure d'avant-toit, la neige sur la tôle
    const zAv = [-OV, PD / 2];
    o.push(poly(bande(-OV, zAv, -FT, 0), W(A.arete)));
    o.push(poly(bande(-OV, zAv, 0, SN), A.blanc), poly(bande(-OV, zAv, 0, SN), h.a.hachure('neige', 'arete')));
    o.push(poly([P(-OV, EE - FT, -OV), P(LG + OV, EE - FT, -OV), P(LG + OV, EE, -OV), P(-OV, EE, -OV)], W(A.arete)));
    const nb = [P(-OV, EE, -OV), P(LG + OV, EE, -OV), P(LG + OV, EE + SN, -OV), P(-OV, EE + SN, -OV)];
    o.push(poly(nb, A.blanc), poly(nb, h.a.hachure('neige', 'arete')));
    o.push(poly([P(-OV, EE + SN, -OV), P(LG + OV, EE + SN, -OV), P(LG + OV, RG + SN, PD / 2), P(-OV, RG + SN, PD / 2)], W(A.arete)));
    // la plaque : la cassure en haut et sur les côtés, droit dans la pente
    const X1 = 1700, X2 = 3100, ZH = 1300;
    const dent = (a, b, n, amp) => { const q = []; for (let i = 0; i <= n; i++) { const t = i / n; q.push([a[0] + (b[0] - a[0]) * t + (i % 2 ? amp : -amp) * (i && i < n ? 1 : 0), a[1] + (b[1] - a[1]) * t]); } return q; };
    const cassure = [...dent([X1, -OV], [X1, ZH], 7, 40), ...dent([X1, ZH], [X2, ZH], 9, 0).slice(1).map((p, i) => [p[0], p[1] + (i % 2 ? 50 : -30)]), ...dent([X2, ZH], [X2, -OV], 7, 40).slice(1)];
    o.push(h.chemin(cassure.map(([x, zz]) => P(x, toit(zz) + SN, zz)), A.detail));
    // la chute : la plaque glisse droit dans la pente, passe l'avant-toit et tombe au pied du mur
    const XF = 2400, chute = [P(XF, toit(1050) + SN, 1050), P(XF, toit(-OV + 60) + SN, -OV + 60)];
    o.push(h.fleche(`M${pt(chute[0])} L${pt(chute[1])}`, A.arete));
    // la zone dangereuse : le versant sous la plaque, droit dans la pente, et le pied du mur où elle tombe
    const zp = [P(X1 - 150, toit(ZH + 150) + SN, ZH + 150), P(X2 + 150, toit(ZH + 150) + SN, ZH + 150), P(X2 + 150, EE + SN, -OV),
      P(X2 + 150, 0, -OV - 700), P(X1 - 150, 0, -OV - 700), P(X1 - 150, EE + SN, -OV)];
    o.push(h.chemin(zp, A.zone, true));
    // le banc de neige le long du mur, et celui du pignon, où l'homme se tient
    o.push(h.path(lisse([P(-200, 0, -60), P(600, 160, -120), P(1600, 240, -160), P(2600, 300, -200), P(3600, 220, -160), P(LG + 250, 0, -60)]), A.detail));
    const banc = [[-3250, 0], [-2950, 300], [-2650, 600], [-2250, BANC], [-1750, BANC], [-1350, 560], [-950, 300], [-600, 90], [-300, 0]].map(([x, y]) => P(x, y, CZ));
    o.push(h.path(lisse(banc) + ` L${pt(P(-300, 0, CZ - 900))} L${pt(P(-3250, 0, CZ - 900))} Z`, A.blanc));
    o.push(h.path(lisse(banc) + ` Z`, h.a.hachure('neige', 'aucun')), h.path(lisse(banc), A.arete));
    // le tuyau et son chapeau, sur le versant, en retrait du bord
    const c = P(CX, YPT, CZ), base = P(CX, toit(CZ - PR) + SN - 30, CZ - PR)[1];
    const ch = chapeau(c[0], c[1], s, { bonnet: true, bas: base });
    o.push(ch.svg);
    o.push(h.path(lisse([[c[0] - (PR + 60) * s, base + 1.5], [c[0], base - 3], [c[0] + (PR + 60) * s, base + 1.5]]), W(A.detail)));
    // la perche, des mains au bonnet
    const G1 = P(G1M[0], G1M[1], CZ), Tp = P(TIP[0], TIP[1], CZ);
    const d = [(Tp[0] - G1[0]), (Tp[1] - G1[1])], lg = Math.hypot(...d), dv = [d[0] / lg, d[1] / lg];
    const Tl = repere(Tp, dv, s), long = lg / s + 330;
    o.push(perche(Tl, 50, -long, { casse: false, face: false }));
    o.push(fil(lisse(crosseBroche(-120, 14).map(Tl)), 1.1));
    // l'homme : le corps simple de profil (perche-levee), debout sur le banc ; les bras posés par le
    // calcul, la main proche (P, la haute) à 450 mm de la main loin (L, au bout de la perche)
    const G2 = Tl([-(lg / s) + 450, 0]), G1v = Tl([-(lg / s), 0]);
    const pied = P(PERSO, BANC, CZ);
    const pers = atteint({ x: pied[0], y: pied[1], pose: 'perche-levee', vue: 'profil', age: 'adulte', echelle: s }, { P: G2, L: G1v });
    o.push(String(pers));
    return o.join('\n');
  };

  // ── Au chapeau, en gros : 0,2 unité par mm ─────────────────────────────────────────
  const SC = 0.2, AP = 64;
  const dansVue = (T, r, z, m = 3) => { let u = 0; for (; u > -4000; u -= 2) { if ([T([u, -r]), T([u, r])].some(p => p[0] < m || p[0] > z.l - m || p[1] < m || p[1] > z.h - m)) break; } return u + 6; };                               // l'angle de la perche
  const vueBonnet = z => {
    const cx = z.l * 0.6, yT = z.h * 0.6, o = [];
    const ch = chapeau(cx, yT, SC, { bonnet: true, casse: true, bas: z.h - 2 });
    const T = repere(ch.info.flanc, dir(AP), SC);
    o.push(perche(T, 50, dansVue(T, 27, z), { face: false }), fil(lisse(crosseBroche(-120, 14).map(T)), 1.4));
    o.push(ch.svg);
    // la poussée, le long de la perche ; le morceau qui part
    const p1 = T([-250, -95]), p2 = T([-70, -95]);
    o.push(h.geste(`M${pt(p1)} L${pt(p2)}`));
    const bd = ch.info.bonnetD;
    o.push(h.fleche(`M${pt([bd[0] - 12, bd[1] - 22])} Q${pt([Math.min(bd[0] + 6, z.l - 4), bd[1] - 12])} ${pt([Math.min(bd[0] + 3, z.l - 6), bd[1] + 18])}`, A.arete));
    return o.join('\n');
  };
  const vueGrillage = z => {
    const cx = z.l * 0.6, yT = z.h * 0.6, o = [];
    const ch = chapeau(cx, yT, SC, { givre: true, brindilles: true, bas: z.h - 2 });
    // la crosse du crochet contre le grillage, sous le givre qui reste
    const T0 = repere([0, 0], dir(AP), SC), bout = T0([74, 36]);
    const contact = [cx - PR * SC - 1.2, yT - 58 * SC];
    const T = repere([contact[0] - bout[0], contact[1] - bout[1]], dir(AP), SC);
    o.push(ch.svg);
    o.push(perche(T, 50, dansVue(T, 27, z), { face: false }), fil(lisse(crosseBroche(-120, 14).map(T)), 1.4));
    const xa = contact[0] - 13;
    o.push(h.geste(`M${f(xa)} ${f(contact[1] - 16)} L${f(xa)} ${f(contact[1] + 14)}`, { double: true }));
    return o.join('\n');
  };

  // ── Le crochet ligaturé, et la fourche : 0,6 unité par mm ───────────────────────────
  const S2 = 0.6;
  const geoCrochet = z => {
    const T1 = repere([z.l * 0.3, 118], dir(90), S2), T2 = repere([z.l * 0.74, 132], dir(90), S2);
    return { T1, T2, u1: -(z.h - 118) / S2, u2: -(z.h - 132) / S2 };
  };
  const vueCrochet = z => {
    const { T1, T2, u1, u2 } = geoCrochet(z), o = [];
    // la broche épaisse
    o.push(perche(T1, 50, u1, { noeuds: [[-95, -9], [-215, 11, 0.8]], fibres: [[-40, -175, -17], [-120, -205, 5], [-230, u1 + 20, -6]] }));
    o.push(fil(lisse(crosseBroche(-178, 14).map(T1)), 6 * S2));
    o.push(ligature(T1, S2, 25, -34, -10, 2.4), ligature(T1, S2, 25, -160, -136, 2.4));
    // le long clou
    o.push(perche(T2, 46, u2, { noeuds: [[-70, 7], [-190, -8, 0.8]], fibres: [[-30, -150, -15], [-160, u2 + 20, 4]] }));
    const cl = crosseClou(-114, 12).map(T2);
    o.push(fil(lisse(cl), 4.8 * S2));
    const tete = T2([-114, 12]), a = T2([-116, 3]), b = T2([-116, 21]), c2 = T2([-121, 21]), d2 = T2([-121, 3]);
    o.push(poly([a, b, c2, d2], W(A.detail)));
    const p = cl[cl.length - 1], q = cl[cl.length - 2], k = Math.hypot(p[0] - q[0], p[1] - q[1]);
    o.push(poly([add(p, [(q[1] - p[1]) / k, -(q[0] - p[0]) / k], 1.4), add(p, [-(q[1] - p[1]) / k, (q[0] - p[0]) / k], 1.4), add(p, [(p[0] - q[0]) / k, (p[1] - q[1]) / k], 4.5)], W(A.detail)));
    o.push(ligature(T2, S2, 23, -28, -8, 2.4), ligature(T2, S2, 23, -104, -84, 2.4));
    void tete;
    return o.join('\n');
  };
  const geoFourche = z => ({ T: repere([z.l * 0.36, 44], dir(90), S2), u0: -(z.h - 44) / S2 });
  const BR = { j: -160, a: 32, lg: 118, r0: 16, r1: 13 };
  const vueFourche = z => {
    const { T, u0 } = geoFourche(z), o = [], r = 25, rb = r * 1.05;
    const dB = [Math.cos(BR.a * Math.PI / 180), Math.sin(BR.a * Math.PI / 180)], nB = [dB[1], -dB[0]];   // nB : côté du bout du tronc
    const ax = t => [BR.j + dB[0] * t, dB[1] * t];
    const rr = t => BR.r0 + (BR.r1 - BR.r0) * (t / BR.lg);
    const bord = (t, k) => add(ax(t), nB, k * rr(t));
    // où les bords de la branche rejoignent le flanc du tronc (v = r)
    const rejoint = k => { let t = 0; while (bord(t, k)[1] < r && t < BR.lg) t += 0.5; return t; };
    const tH = rejoint(1), tB = rejoint(-1);
    const pH = bord(tH, 1), pB = bord(tB, -1);
    const cont = [
      T([0, -r]), T([u0, -rb]),
      ...[[u0 - 7, -rb * 0.35], [u0 + 7, rb * 0.35]].map(T), T([u0, rb]),
      T([pB[0] - 34, r]), T([pB[0] - 10, r + 1.5]), T(bord(tB + 10, -1)), T(bord(BR.lg, -1)),
      T(bord(BR.lg, 1)), T(bord(tH + 8, 1)), T([pH[0] + 6, r + 0.8]), T([pH[0] + 22, r]), T([0, r]),
    ];
    const d = `M${pt(cont[0])} L${pt(cont[1])}${suite(cont.slice(1, 5))} L${pt(cont[5])}${suite(cont.slice(5, 9))} L${pt(cont[9])}${suite(cont.slice(9, 13))} L${pt(cont[13])} Z`;
    o.push(h.path(d, W(A.arete)));
    for (const [a, b, v] of [[-30, -120, -14], [-200, -300, 6], [-320, u0 + 20, -10]]) o.push(h.chemin([T([a, v]), T([b, v])], A.fin));
    for (const [u, v, k] of [[-235, -8, 1], [-315, 10, 0.8]]) {
      o.push(poly(ovale(T, [u, v], 0.2 * 50 * k, 0.13 * 50 * k), W(A.detail)), poly(ovale(T, [u, v], 0.1 * 50 * k, 0.065 * 50 * k, 16), A.fin));
    }
    // les deux bouts coupés : le tronc, la branche
    o.push(poly(ovale(T, [0, 0], 0.26 * r, r), W(A.arete)), poly(ovale(T, [0, 0], 0.15 * r, 0.58 * r), A.fin));
    const e = ax(BR.lg), Tb = pp => T(add(e, add([dB[0] * pp[0], dB[1] * pp[0]], nB, -pp[1])));
    o.push(poly(ovale(Tb, [0, 0], 0.26 * BR.r1, BR.r1), W(A.arete)), poly(ovale(Tb, [0, 0], 0.13 * BR.r1, 0.55 * BR.r1), A.fin));
    return o.join('\n');
  };

  return {
    ref: '84-02',
    titre: 'La perche à chapeau',
    desc: 'Le chalet en vue cavalière, le versant qui porte le conduit face à nous : un homme debout sur le banc de neige au bout du versant, du côté du pignon, tend une longue perche d’épinette jusqu’au chapeau du conduit, en retrait du bord et plus haut que lui ; une plaque de neige part droit dans la pente et tombe au pied du mur, loin de lui. En gros, le bout de la perche casse le bonnet de neige sur le capuchon, puis son crochet gratte le givre du grillage et accroche les brindilles coincées. En dessous, deux bouts de perche : une broche épaisse pliée en crosse, puis un long clou plié, chacun couché le long du bois et tenu par deux ligatures de fil de fer aux bouts tordus ; enfin la fourche naturelle, une branche coupée à une main du tronc.',
    format: 'pleine',
    disposition: [['usage'], ['bonnet', 'grillage', 'crochet', 'fourche']],
    hauteurs: [1.3, 1],
    largeurs: [[1], [1.12, 1.12, 1.18, 0.8]],
    vues: {
      usage: {
        titre: 'Du bout du versant, côté pignon',
        dessin: scene,
        renvois: z => {
          const { P } = geoScene(z);
          const pieds = P(-1700, BANC, CZ), perch = P(-1250, G1M[1] + (-1250 - G1M[0]) * DP[1] / DP[0], CZ), chute = P(2400, toit(500) + SN, 500), chap = P(CX + CR, YPT + 200, CZ);
          return [
            { n: 1, rond: [pieds[0] - 62, pieds[1] - 40], cible: [pieds[0] - 16, pieds[1] + 3], texte: 'sur le banc, côté pignon' },
            { n: 2, rond: [perch[0] - 70, perch[1] - 62], cible: perch, texte: 'longueur : mains au chapeau' },
            { n: 3, rond: [chute[0] + 60, chute[1] - 6], cible: [chute[0] + 3, chute[1]], texte: 'la plaque part droit en bas' },
            { n: 4, rond: [chap[0] + 62, chap[1] + 14], cible: [chap[0] + 3, chap[1] - 2], texte: 'chapeau en retrait, plus haut' },
          ];
        },
      },
      bonnet: {
        titre: 'Casser le bonnet',
        dessin: vueBonnet,
        renvois: z => {
          const cx = z.l * 0.6, yT = z.h * 0.6, ch = chapeau(cx, yT, SC, { bonnet: true });
          return [
            { n: 5, rond: [z.l - 16, 26], cible: [ch.info.bonnetH[0] + 16, ch.info.bonnetH[1] + 4], texte: 'bonnet de neige soufflée' },
          ];
        },
      },
      grillage: {
        titre: 'Gratter le grillage',
        dessin: vueGrillage,
        renvois: z => {
          const cx = z.l * 0.6, yT = z.h * 0.6;
          return [
            { n: 6, rond: [cx - 10, yT - 130], cible: [cx - 30 * SC, yT - (30 + GH + RIM + 40) * SC], texte: 'capuchon' },
            { n: 7, rond: [14, yT - 100], cible: [cx - 60 * SC, yT - 150 * SC], texte: 'givre qui ferme le grillage' },
            { n: 8, rond: [z.l - 12, yT - 95], cible: [cx + 160 * SC, yT - 205 * SC], texte: 'coincé dessous : décrocher' },
          ];
        },
      },
      crochet: {
        titre: 'Le crochet ligaturé',
        dessin: vueCrochet,
        renvois: z => {
          const { T1, T2 } = geoCrochet(z);
          const nd = T1([-215, 11]), cr = T1([74, 36]), lig = T1([-22, -25]), cl = T2([41, 25]);
          return [
            { n: 9, rond: [12, nd[1] - 34], cible: [nd[0] - 3, nd[1] + 2], texte: 'épinette sèche, nœuds au ras' },
            { n: 10, rond: [cr[0] + 4, 22], cible: [cr[0] - 1, cr[1] - 3], texte: 'broche épaisse pliée' },
            { n: 11, rond: [12, lig[1] - 10], cible: [lig[0] - 1, lig[1]], texte: 'ligature serrée au fil de fer' },
            { n: 12, rond: [z.l - 12, cl[1] - 34], cible: [cl[0] + 2, cl[1] - 3], texte: 'ou un long clou plié' },
          ];
        },
      },
      fourche: {
        titre: 'La fourche naturelle',
        dessin: vueFourche,
        renvois: z => {
          const { T } = geoFourche(z);
          const dB = [Math.cos(BR.a * Math.PI / 180), Math.sin(BR.a * Math.PI / 180)];
          const e = T([BR.j + dB[0] * BR.lg, dB[1] * BR.lg + BR.r1 * 0.2]);
          return [
            { n: 13, rond: [z.l - 14, e[1] - 34], cible: [e[0] + 4, e[1] - 4], texte: 'branche coupée à une main' },
          ];
        },
      },
    },
  };
};
