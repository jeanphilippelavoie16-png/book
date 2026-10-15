// Planche 11-05. Les outils de feu qu'on fabrique : le râteau, le battoir, la perche d'élagage
// (chapitre 11, section 9, « Fabriquer les outils »). Dessinée le 15 octobre 2026 (inventaire des
// planches, `images/audit-planches/tomes-1-2.md` : « chaque outil entier et sa fixation au manche ; le
// battoir abattu à plat »). Une rangée par outil : l'outil monté, en vues alignées, puis son geste.
//
// Ce qui vient du chapitre : le râteau est un fer plat entaillé à la meule, lame droite et dentée,
// emmanchée solide, qui gratte jusqu'au sol minéral ; le battoir est une bavette de camion, une courroie
// de convoyeur ou une semelle de botte boulonnée au bout d'un manche, qu'on abat à plat sur la flamme ; la
// perche est une lame d'égoïne boulonnée au bout d'une perche d'épinette.
//
// Ce que le chapitre ne dit pas, et qui est un choix de montage (pas une cote) :
//   le râteau : un bout de tuyau soudé sur le chant de la lame sert de douille ; le manche y entre et un
//     boulon le traverse. La lame est la variante fer plat ; la lame de pelle redressée n'est pas dessinée.
//   le battoir : le manche couché sur le haut de la bavette, deux boulons au travers, de grandes rondelles
//     côté caoutchouc ; le bas de la bavette reste libre et se couche quand il frappe le sol.
//   la perche : la lame entre dans une fente sciée au bout de la perche, deux boulons passent dans les
//     trous de l'ancienne poignée ; du fil de fer serré derrière la fente l'empêche de s'ouvrir (le même
//     montage que la planche 56-09, « la soie dans la fente », ligaturée).
// Aucune cote : le chapitre n'en donne aucune. Les proportions sont celles des objets courants (fer plat
// de 6 cm, tuyau de 3,4 cm, manche de 3,5 cm, bavette d'environ 40 × 34 cm, lame d'égoïne de 52 cm).
// Le sol des deux gestes : mousse, humus, sol minéral, dessinés minces pour que l'outil reste lisible.
// La charte : le rouge sert aux deux gestes (gratter, abattre) ; aucune main, les outils se lisent seuls.
module.exports = (h) => {
  const A = h.a;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const poly = (pts, at) => h.chemin(pts, at, true);
  const pt = p => `${f1(p[0])} ${f1(p[1])}`;
  const RAD = Math.PI / 180;
  const add = (p, q, k = 1) => [p[0] + k * q[0], p[1] + k * q[1]];
  const C40 = Math.cos(40 * RAD), S40 = Math.sin(40 * RAD);
  // Une bande autour du segment p→q, de demi-largeur r : le corps d'un manche, d'un tuyau.
  const bande = (p, q, r) => {
    const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy), nx = -dy / L * r, ny = dx / L * r;
    return [[p[0] + nx, p[1] + ny], [q[0] + nx, q[1] + ny], [q[0] - nx, q[1] - ny], [p[0] - nx, p[1] - ny]];
  };
  // La face à l'ombre d'un rond : la bande du côté opposé à la lumière (qui vient d'en haut à gauche).
  const ombreBande = (p, q, r) => {
    const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy);
    let nx = -dy / L, ny = dx / L;
    if (nx + ny < 0) { nx = -nx; ny = -ny; }
    const a = r * 0.3;
    return [[p[0] + nx * a, p[1] + ny * a], [q[0] + nx * a, q[1] + ny * a], [q[0] + nx * r, q[1] + ny * r], [p[0] + nx * r, p[1] + ny * r]];
  };
  // Un manche rond de p à q, avec sa face à l'ombre et, au bout q, le trait de rupture qui dit qu'il continue.
  const rupture = (c, dir, r) => {
    const [dx, dy] = dir, nx = -dy, ny = dx, k = r * 0.6;
    const p0 = [c[0] + nx * r, c[1] + ny * r], p1 = [c[0] - nx * r, c[1] - ny * r];
    return `M${pt(p0)} C${f1(c[0] + nx * r * 0.2 + dx * k)} ${f1(c[1] + ny * r * 0.2 + dy * k)} ${f1(c[0] - nx * r * 0.2 - dx * k)} ${f1(c[1] - ny * r * 0.2 - dy * k)} ${pt(p1)}`;
  };
  const rond = (p, q, r, { trait = A.arete, coupe = true } = {}) => {
    const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy), u = [dx / L, dy / L], n = [-u[1] * r, u[0] * r];
    const a = add(p, n), b = add(q, n), c = add(q, n, -1), d = add(p, n, -1), k = r * 0.6;
    const fin = coupe
      ? `C${pt(add(add(q, n, 0.2), u, k))} ${pt(add(add(q, n, -0.2), u, -k))} ${pt(c)}`
      : `L${pt(c)}`;
    const contour = `M${pt(d)} L${pt(a)} L${pt(b)} ${fin} Z`;
    return [h.path(contour, W(trait)), poly(ombreBande(p, add(q, u, coupe ? -k : 0), r), A.ombre), h.path(contour, trait)].join('\n');
  };
  // La tête d'un boulon vue de bout : l'hexagone sur sa rondelle.
  const hexa = (c, r) => {
    const pts = [];
    for (let i = 0; i < 6; i++) { const a = (i * 60 + 30) * RAD; pts.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]); }
    return [h.cercle(c[0], c[1], r * 1.32, W(A.detail)), poly(pts, W(A.arete)), h.cercle(c[0], c[1], r * 0.42, A.fin)].join('\n');
  };
  // Un boulon vu de côté, le long de l'axe x (en cm, repère R) : tête, rondelle, puis rondelle, écrou, bout.
  const boulon = (R, x0, x1, v, { rondelle = 1.05, large = 1.05, ep = 0.28 } = {}) => [
    poly([R(x0 - 0.95, v + 0.8), R(x0 - 0.25, v + 0.8), R(x0 - 0.25, v - 0.8), R(x0 - 0.95, v - 0.8)], W(A.arete)),
    poly([R(x0 - 0.25, v + rondelle), R(x0, v + rondelle), R(x0, v - rondelle), R(x0 - 0.25, v - rondelle)], W(A.detail)),
    poly([R(x1, v + large), R(x1 + ep, v + large), R(x1 + ep, v - large), R(x1, v - large)], W(A.arete)),
    poly([R(x1 + ep, v + 0.8), R(x1 + ep + 0.77, v + 0.8), R(x1 + ep + 0.77, v - 0.8), R(x1 + ep, v - 0.8)], W(A.arete)),
    poly([R(x1 + ep + 0.77, v + 0.4), R(x1 + ep + 1.12, v + 0.4), R(x1 + ep + 1.12, v - 0.4), R(x1 + ep + 0.77, v - 0.4)], W(A.detail)),
  ].join('\n');
  // Jusqu'où va une demi-droite p + t·u avant de sortir de la vue (marge m) : un manche s'arrête au bord.
  const auBord = (z, p, u, m = 2) => {
    const ts = [];
    if (u[0] < 0) ts.push((m - p[0]) / u[0]); if (u[0] > 0) ts.push((z.l - m - p[0]) / u[0]);
    if (u[1] < 0) ts.push((m - p[1]) / u[1]); if (u[1] > 0) ts.push((z.h - m - p[1]) / u[1]);
    return Math.min(...ts);
  };
  const rappel = 'fill="none" stroke="#1A1A1A" stroke-width="0.5" stroke-dasharray="2 3"';
  const etiquette = (x, y, s, ancre = 'middle') => h.texte(x, y, s, { italique: true, ancre });

  // Le sol coupé des deux gestes : mousse (3 cm), humus (4 cm), sol minéral.
  const EM = 8, EH = 10;
  const sol = (z, yG, x0 = 0, x1 = z.l) => [
    h.rect(x0, yG + EM + EH, x1 - x0, z.h - (yG + EM + EH), A.hachure('gravier', 'aucun')),
    h.rect(x0, yG + EM, x1 - x0, EH, A.hachure('terre', 'aucun')),
    h.rect(x0, yG, x1 - x0, EM, A.hachure('paille', 'aucun')),
    h.ligne(x0, yG + EM, x1, yG + EM, A.fin), h.ligne(x0, yG + EM + EH, x1, yG + EM + EH, A.fin),
  ].join('\n');
  // Une flamme : la langue et, dedans, une langue plus petite.
  const flamme = (x, y, H, w, pen = 1) => {
    const t = pen * w * 0.2;
    const langue = (H, w) => `M${f1(x - w / 2)} ${f1(y)} C${f1(x - w / 2)} ${f1(y - H * 0.45)} ${f1(x - w * 0.1 + t)} ${f1(y - H * 0.55)} ${f1(x + t * 1.4)} ${f1(y - H)} C${f1(x + w * 0.25 + t)} ${f1(y - H * 0.6)} ${f1(x + w / 2)} ${f1(y - H * 0.4)} ${f1(x + w / 2)} ${f1(y)}`;
    return [h.path(langue(H, w) + ' Z', W(A.arete)), h.path(langue(H * 0.5, w * 0.45), A.detail)].join('\n');
  };

  // ─── Le râteau : de dos et de côté, à la même échelle ─────────────────────────────────────────
  // Repère en cm. Lame : fer plat de 34 × 6 cm, sept dents entaillées en V jusqu'à 2,2 cm. Le tuyau
  // (rayon 1,7) repose sur le chant de la lame, au milieu, incliné de 40° vers l'arrière ; il dépasse
  // de 1 cm devant la lame. Le manche (rayon 1,45) y entre ; un boulon le traverse à 9 cm du bout.
  const RT = { n: 7, eD: 2.2, hL: 6, Au: -1.86, Av: 6.66, r: 1.7, rm: 1.45, tM: 30 };
  const rateau = z => {
    const S = 4.8, o = [];
    const { n, eD, hL, Au, Av, r, rm, tM } = RT;
    const p = 34 / n;
    const yS = z.h - 24;                       // la pointe des dents
    const xD = 10 + 17 * S;                    // le milieu de la lame, vue de dos
    const D = (u, v) => [xD + S * u, yS - S * v];
    const lame = [[-17, hL], [17, hL], [17, eD]];
    for (let i = n - 1; i >= 0; i--) { const x0 = -17 + i * p; lame.push([x0 + p / 2, 0], [x0, eD]); }
    // vue de dos : le tuyau monte tout droit depuis le chant (il s'éloigne vers soi, raccourci)
    const vB = Av + 12 * S40, vM = Av + tM * S40;
    o.push(poly(bande(D(0, hL), D(0, vB), r * S), W(A.arete)));
    o.push(poly([D(0.5, hL), D(0.5, vB), D(r, vB), D(r, hL)], A.ombre));
    o.push(poly(bande(D(0, hL), D(0, vB), r * S), A.arete));
    const [bx, by] = D(0, vB);
    o.push(h.ellipse(bx, by, r * S, r * C40 * S, W(A.arete)));
    o.push(h.ellipse(bx, by + 0.6, rm * S, rm * C40 * S, A.ombre));
    o.push(rond(D(0, vB), D(0, vM), rm * S));
    o.push(h.path(`M${pt(D(-r, vB))} A${f1(r * S)} ${f1(r * C40 * S)} 0 0 0 ${pt(D(r, vB))}`, A.arete));
    const vb = Av + 9 * S40;
    o.push(boulon(D, -r, r, vb));
    // la lame par-dessus, en contour fort ; la soudure le long du chant sous le tuyau
    o.push(poly(lame.map(q => D(...q)), W(A.contour)));
    o.push(h.path(`M${pt(D(-r - 0.6, hL))} Q${pt(D(0, hL - 1.2))} ${pt(D(r + 0.6, hL))} Z`, A.plein));
    o.push(etiquette(xD, yS + 19, 'de dos'));

    // vue de côté : la lame par la tranche, le tuyau incliné, le manche
    const xC = xD + 17 * S + 52 - Au * S;
    const C = (u, v) => [xC + S * u, yS - S * v];
    const P = t => C(Au + t * C40, Av + t * S40);
    o.push(h.ligne(...D(17 + 1.5, 0), ...C(-0.9, 0), rappel), h.ligne(...D(17 + 1.5, hL), ...C(-3.4, hL), rappel));
    o.push(poly(bande(P(0), P(12), r * S), W(A.arete)));
    o.push(poly(ombreBande(P(0), P(12), r * S), A.ombre));
    o.push(poly(bande(P(0), P(12), r * S), A.arete));
    o.push(rond(P(12), P(tM - 6), rm * S));
    o.push(hexa(P(9), 0.72 * S));
    o.push(poly([C(0, 0), C(0.6, 0), C(0.6, hL), C(0, hL)], W(A.contour)));
    o.push(h.ligne(...C(0, eD), ...C(0.6, eD), A.fin));
    o.push(poly([C(0, hL), C(0, hL - 0.9), C(-1.0, hL - 0.84)], A.plein));
    o.push(poly([C(0.6, hL), C(0.6, hL - 0.9), C(1.6, hL + 1.25), C(0.9, hL + 0.7)], A.plein));
    o.push(etiquette(C(4, 0)[0], yS + 19, 'de côté'));
    return { svg: o.join('\n'), D, C, P, vb, p, eD, hL, vB };
  };

  // Gratter : le râteau de côté, tiré vers soi (à gauche). Derrière lui, le sol minéral est à nu.
  const gratter = z => {
    const S = 2.6, o = [];
    const yG = z.h - 46, yM = yG + EM + EH;
    const xL = 118;                                  // la face de la lame qui pousse la terre
    const { hL, eD, Au, Av, r, rm } = RT;
    o.push(sol(z, yG, 0, xL));
    o.push(h.rect(xL, yM, z.l - xL, z.h - yM, A.hachure('gravier', 'aucun')));
    o.push(h.ligne(xL, yM, z.l, yM, A.arete));
    // la terre arrachée, en tas contre la lame
    o.push(h.path(`M${xL - 46} ${yG} Q${xL - 36} ${yG - 9} ${xL - 20} ${yG - 13} Q${xL - 6} ${yG - 16} ${xL} ${yG - 9} L${xL} ${yG} Z`, A.hachure('terre', 'arete')));
    o.push(h.ligne(0, yG, xL - 46, yG, A.arete));
    o.push(h.ligne(xL, yG, xL, yM, A.arete));
    // le râteau : vers soi = vers la gauche
    const R = (u, v) => [xL - S * (u - 0.6), yM - S * v];
    const T = t => R(Au + t * C40, Av + t * S40);
    o.push(poly(bande(T(0), T(12), r * S), W(A.arete)), poly(bande(T(0), T(12), r * S), A.arete));
    const t0 = T(12), uT = [T(13)[0] - t0[0], T(13)[1] - t0[1]], lT = Math.hypot(...uT), uN = [uT[0] / lT, uT[1] / lT];
    o.push(rond(t0, add(t0, uN, auBord(z, t0, uN, rm * S + 4)), rm * S));
    o.push(poly([R(0, 0), R(0.6, 0), R(0.6, hL), R(0, hL)], W(A.contour)));
    o.push(poly([R(0, hL), R(0, hL - 0.9), R(-1.0, hL - 0.84)], A.plein));
    // le geste : la lame vient de la droite, au ras du minéral
    o.push(h.geste(`M${xL + 86} ${yM - 22} L${xL + 22} ${yM - 22}`));
    return { svg: o.join('\n'), xL, yM, yG };
  };

  // ─── Le battoir : de face et de côté ─────────────────────────────────────────────────────────
  // Bavette de 40 × 34 cm, 1,2 cm d'épaisseur. Le manche (rayon 1,75) couché sur le haut de la bavette,
  // de 22 à 34 cm, deux boulons à 24,5 et 31 cm. Grandes rondelles (rayon 1,6) côté caoutchouc.
  const BT = { rh: 1.75, vh0: 22, vf: 34, vb: [24.5, 31], e: 1.2 };
  const battoir = z => {
    const S = 3.4, o = [];
    const { rh, vh0, vf, vb, e } = BT;
    const yS = z.h - 24, xF = 8 + 20 * S;
    const F = (u, v) => [xF + S * u, yS - S * v];
    const vH = Math.min(vf + 12, (yS - 6) / S);
    // la bavette, coins un peu arrondis
    const k = 1.4 * S, [x0, y0] = F(-20, vf), [x1, y1] = F(20, 0);
    o.push(h.path(`M${f1(x0 + k)} ${f1(y0)} L${f1(x1 - k)} ${f1(y0)} Q${f1(x1)} ${f1(y0)} ${f1(x1)} ${f1(y0 + k)} L${f1(x1)} ${f1(y1 - k)} Q${f1(x1)} ${f1(y1)} ${f1(x1 - k)} ${f1(y1)} L${f1(x0 + k)} ${f1(y1)} Q${f1(x0)} ${f1(y1)} ${f1(x0)} ${f1(y1 - k)} L${f1(x0)} ${f1(y0 + k)} Q${f1(x0)} ${f1(y0)} ${f1(x0 + k)} ${f1(y0)} Z`, W(A.contour)));
    // le manche couché sur la bavette ; son bout arrondi
    o.push(rond(F(0, vh0 + rh * 0.4), F(0, vH), rh * S));
    o.push(h.path(`M${pt(F(-rh, vh0 + rh * 0.4))} Q${pt(F(-rh, vh0 - 0.3))} ${pt(F(0, vh0 - 0.3))} Q${pt(F(rh, vh0 - 0.3))} ${pt(F(rh, vh0 + rh * 0.4))}`, W(A.arete)));
    for (const v of vb) o.push(hexa(F(0, v), 0.72 * S));
    o.push(etiquette(xF, yS + 19, 'de face'));

    // de côté : la bavette par la tranche, le manche devant, les boulons au travers
    const xC = xF + 20 * S + 44;
    const C = (u, v) => [xC + S * u, yS - S * v];
    o.push(h.ligne(...F(20 + 1.2, vf), ...C(-5.4, vf), rappel), h.ligne(...F(20 + 1.2, 0), ...C(-0.9, 0), rappel));
    o.push(rond(C(-rh, vh0 + 0.4), C(-rh, vH), rh * S));
    o.push(h.path(`M${pt(C(-2 * rh, vh0 + 0.4))} Q${pt(C(-2 * rh, vh0))} ${pt(C(-rh, vh0))} L${pt(C(0, vh0))} L${pt(C(0, vh0 + 0.4))}`, W(A.arete)));
    o.push(poly([C(0, 0), C(e, 0), C(e, vf), C(0, vf)], W(A.contour)));
    for (const v of vb) o.push(boulon(C, -2 * rh, e + 0.15, v, { large: 2.0, ep: 0.6 }));
    o.push(etiquette(C(0, 0)[0], yS + 19, 'de côté'));
    return { svg: o.join('\n'), F, C, vb };
  };

  // Abattre à plat : le battoir de côté. Le haut de la bavette suit le manche ; le bas, libre, se
  // couche sur la mousse qui flambe. Levé, la même pièce en gris, tournée autour des mains (hors cadre).
  const abattre = z => {
    const o = [], S = 2.6, yG = z.h - 46;
    const e = 1.5 * S, rh = BT.rh * S, ang = 22 * RAD;
    const u = [-Math.cos(ang), -Math.sin(ang)], nrm = [Math.sin(ang), -Math.cos(ang)];  // nrm : vers le haut
    const xP = 150, pli = [xP, yG - e / 2];
    const haut = add(pli, u, 12 * S), libre = 22 * S;
    o.push(sol(z, yG));
    o.push(h.ligne(0, yG, z.l, yG, A.arete));
    // les flammes qui restent
    [[xP + libre + 22, 24, 13, 1], [xP + libre + 44, 34, 16, -1], [xP + libre + 68, 26, 13, 1], [xP + libre + 92, 18, 11, -1], [30, 16, 10, 1]].forEach(([x, H, w, pen]) => o.push(flamme(x, yG, H, w, pen)));
    // levé, en gris : la bavette droite, dans l'axe du manche ; le manche s'arrête au bord de la vue
    const piv = add(haut, u, 150 * S), aL = -10 * RAD;
    const rot = p => { const dx = p[0] - piv[0], dy = p[1] - piv[1]; return [piv[0] + dx * Math.cos(aL) - dy * Math.sin(aL), piv[1] + dx * Math.sin(aL) + dy * Math.cos(aL)]; };
    const uR = [u[0] * Math.cos(aL) - u[1] * Math.sin(aL), u[0] * Math.sin(aL) + u[1] * Math.cos(aL)];
    const bout = add(pli, u, -libre);
    const gBav = [add(haut, nrm, e / 2), add(bout, nrm, e / 2), add(bout, nrm, -e / 2), add(haut, nrm, -e / 2)].map(rot);
    const g0m = rot(add(add(pli, u, 0.4 * S), nrm, e / 2 + rh));
    const gMan = bande(g0m, add(g0m, uR, auBord(z, g0m, uR, rh + 1)), rh);
    o.push(poly(gMan, A.loin), poly(gBav, A.loin), poly(gMan, A.fin), poly(gBav, A.fin));
    // le geste
    const g0 = rot(add(bout, nrm, e)), g1 = [xP + libre * 0.8, yG - e - 7];
    o.push(h.geste(`M${f1(g0[0] + 4)} ${f1(g0[1] + 6)} Q${f1(g1[0] + 22)} ${f1(g0[1] + 14)} ${f1(g1[0] + 6)} ${f1(g1[1])}`));
    // abattu : la bavette (haut droit le long du manche, pli, bas couché), puis le manche
    const a0 = add(haut, nrm, e / 2), a1 = add(pli, nrm, e / 2), b1 = add(pli, nrm, -e / 2), b0 = add(haut, nrm, -e / 2);
    o.push(h.path(`M${pt(a0)} L${pt(a1)} Q${f1(xP + 6)} ${f1(yG - e)} ${f1(xP + 16)} ${f1(yG - e)} L${f1(xP + libre)} ${f1(yG - e)} L${f1(xP + libre)} ${f1(yG)} L${f1(xP + 14)} ${f1(yG)} Q${f1(xP + 2)} ${f1(yG)} ${pt(b1)} L${pt(b0)} Z`, W(A.contour)));
    const m0 = add(add(pli, u, 0.4 * S), nrm, e / 2 + rh);
    o.push(rond(m0, add(m0, u, auBord(z, m0, u, rh + 4)), rh));
    o.push(h.path(`M${pt(add(m0, nrm, rh))} Q${pt(add(add(m0, u, -0.9 * S), nrm, rh * 0.2))} ${pt(add(m0, nrm, -rh))}`, W(A.arete)));
    for (const t of [2.5, 9]) { const b = add(add(pli, u, t * S), nrm, e / 2 + rh); o.push(hexa(b, 0.72 * S)); }
    return { svg: o.join('\n'), xP, libre, yG };
  };

  // ─── La perche d'élagage : de côté, et vue de dessus sous elle ───────────────────────────────
  // Perche de 5,2 cm au bout. Lame d'égoïne de 52 cm : talon de 10 cm, pointe de 4 cm, dents en bas.
  // Fente sciée sur 9 cm ; deux boulons à 2 et 6 cm du bout ; fil de fer de 10 à 11,6 cm du bout.
  const perche = z => {
    const S = 5.9, o = [], r = 2.6;
    const xT = z.l - 10 - 44 * S;                  // le bout de la perche
    const yA = 46, yD = yA + 76;
    const P = (u, v) => [xT + S * u, yA - S * v];
    const Q = (u, w) => [xT + S * u, yD + S * w];
    const uB = -(xT - 30) / S;                     // la perche est coupée là, à gauche
    const tal = -8, pointe = 44, hT = 5.6, bD = -4.4, hP = 0;
    // vue de côté : la lame (son talon dépasse la perche en haut et en bas)
    const pas = 1.0, dents = [];
    for (let u = pointe; u > tal + 0.01; u -= pas) dents.push([u, bD], [u - pas / 2, bD - 0.75]);
    dents.push([tal, bD]);
    const lame = [[tal, hT], [pointe - 1.2, hP + 0.2], [pointe, hP - 0.6], ...dents];
    o.push(poly(lame.map(q => P(...q)), W(A.contour)));
    // la perche par-dessus le talon
    o.push(rond(P(0, 0), P(uB, 0), r * S));
    o.push(h.ligne(...P(0, r), ...P(0, -r), A.arete));
    o.push(h.path(`M${pt(P(tal, r))} L${pt(P(tal, -r))}`, A.cache));
    o.push(h.ligne(...P(uB + 2, 1.4), ...P(-14, 1.5), A.fin));
    for (let k = 0; k < 6; k++) { const u = -11.6 + k * 0.32; o.push(h.ligne(...P(u, r + 0.12), ...P(u + 0.22, -r - 0.12), A.detail)); }
    const ub = [-6, -2];
    for (const u of ub) o.push(hexa(P(u, 0), 0.72 * S));
    o.push(etiquette(P(uB, 0)[0] + 4, yA + r * S + 16, 'de côté', 'start'));

    // vue de dessus : la perche, la fente, la lame par la tranche, les boulons au travers
    o.push(h.ligne(...P(pointe, bD - 1.4), ...Q(pointe, -0.9), rappel));
    o.push(rond(Q(0, 0), Q(uB, 0), r * S));
    o.push(h.ligne(...Q(0, -r), ...Q(0, r), A.arete));
    o.push(poly([Q(-9, -0.13), Q(0, -0.13), Q(0, 0.13), Q(-9, 0.13)], A.plein));
    o.push(poly([Q(0, -0.13), Q(pointe, -0.13), Q(pointe, 0.13), Q(0, 0.13)], W(A.contour)));
    for (let k = 0; k < 6; k++) { const u = -11.6 + k * 0.32; o.push(h.ligne(...Q(u, -r - 0.12), ...Q(u + 0.22, r + 0.12), A.detail)); }
    for (const u of ub) o.push(boulon((x, v) => Q(v, x), -r, r, u));   // le boulon traverse la perche en w
    o.push(etiquette(P(uB, 0)[0] + 4, yD + r * S + 16, 'de dessus', 'start'));
    return { svg: o.join('\n'), P, Q, ub, r, tal, pointe, bD, hT, yA, yD, uB };
  };

  return {
    ref: '11-05',
    titre: 'Les outils de feu qu’on fabrique',
    fichier: 'planche-11-05-outils-de-feu.svg',
    desc: 'Trois rangées, une par outil : l’outil monté, en vues alignées, puis son geste. En haut, le râteau à feu, de dos et de côté : une lame de fer plat aux dents entaillées en V à la meule ; sur son chant, au milieu, un bout de tuyau soudé, incliné vers l’arrière, où entre le manche, tenu par un boulon qui traverse tuyau et manche. À côté, sur un sol coupé (mousse, humus, sol minéral), le râteau tiré vers soi, les dents au sol minéral, la terre arrachée en tas contre la lame et le sol à nu derrière. Au milieu, le battoir, de face et de côté : une bavette de caoutchouc, le manche couché sur sa moitié haute, deux boulons au travers avec de grandes rondelles côté caoutchouc ; le bas de la bavette reste libre. À côté, sur le même sol, le battoir qui frappe : sa moitié libre couchée à plat sur la mousse qui flambe, sa position levée en gris et la flèche rouge du coup. En bas, la perche d’élagage, de côté et de dessus : une lame d’égoïne dents en bas, son talon pris dans une fente sciée au bout d’une perche d’épinette, deux boulons dans les trous de l’ancienne poignée, du fil de fer serré derrière la fente.',
    format: 'pleine',
    disposition: [['rateau', 'gratter'], ['battoir', 'abattre'], ['perche']],
    hauteurs: [1, 1, 0.92],
    largeurs: [[1.32, 1], [1, 1.22], [1]],
    vues: {
      rateau: {
        titre: 'Le râteau',
        dessin: z => rateau(z).svg,
        renvois: z => {
          const g = rateau(z);
          return [
            { n: 1, rond: [14, 40], cible: g.D(-17 + 1.5 * g.p, g.eD - 0.6), texte: 'fer plat, dents taillées à la meule' },
            { n: 2, rond: [g.D(-8, 0)[0], 20], cible: g.D(-1.4, g.hL + 0.05), texte: 'bout de tuyau soudé sur le chant' },
            { n: 3, rond: [g.C(-2, 0)[0] - 4, 22], cible: g.D(1.7 + 1.05, g.vb + 0.4), texte: 'manche enfoncé, un boulon au travers' },
          ];
        },
      },
      gratter: {
        titre: 'Gratter jusqu’au sol minéral',
        dessin: z => gratter(z).svg,
        renvois: z => {
          const g = gratter(z);
          return [{ n: 4, rond: [z.l - 18, g.yG - 52], cible: [z.l - 34, g.yM], texte: 'le sol minéral, gratté à nu' }];
        },
      },
      battoir: {
        titre: 'Le battoir',
        dessin: z => battoir(z).svg,
        renvois: z => {
          const g = battoir(z);
          return [
            { n: 5, rond: g.F(-16, 41), cible: g.F(-11, 29), texte: 'bavette, courroie ou semelle de botte' },
            { n: 6, rond: [g.C(4, 0)[0] + 16, g.C(0, 41)[1]], cible: g.C(1.2 + 0.15 + 0.3, g.vb[1] + 1.7), texte: 'deux boulons, grandes rondelles' },
          ];
        },
      },
      abattre: {
        titre: 'Frapper à plat',
        dessin: z => abattre(z).svg,
        renvois: z => {
          const g = abattre(z);
          return [{ n: 7, rond: [g.xP + g.libre * 0.55, g.yG + 30], cible: [g.xP + g.libre * 0.55, g.yG - 2], texte: 'la bavette à plat sur la flamme' }];
        },
      },
      perche: {
        titre: 'La perche d’élagage',
        dessin: z => perche(z).svg,
        renvois: z => {
          const g = perche(z);
          return [
            { n: 8, rond: [g.P(32, 0)[0], 14], cible: g.P(27, 2.0), texte: 'lame d’égoïne, les dents en bas' },
            { n: 9, rond: [g.Q(-18, 0)[0], g.yD + 34], cible: g.Q(-5.5, 0), texte: 'fente sciée au bout de la perche' },
            { n: 10, rond: [g.P(-15, 0)[0], 14], cible: g.P(-6.3, 0.95), texte: 'deux boulons, dans les trous de la poignée' },
            { n: 11, rond: [g.P(-22, 0)[0], g.yA + 36], cible: g.P(-11, -g.r - 0.05), texte: 'fil de fer serré derrière la fente' },
          ];
        },
      },
    },
  };
};
