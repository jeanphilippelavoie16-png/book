// Planche 109-41. Le trépied de perches qui porte les quartiers.
// Chapitre 109, §5-A, « Le trépied de perches : des quartiers, pas la bête » et l'encadré « Le
// trépied qui s'ouvre » : pieds dans un trou creusé jusqu'au sol ferme ou contre un piquet chassé,
// ET reliés tous les trois par une corde tendue au ras du sol ; écartement d'un pied à l'autre de la
// moitié aux deux tiers de la longueur des pattes ; la charge à l'aplomb du sommet, rien d'autre ;
// le brin halé descend le long d'une patte jusqu'à une poulie attachée à son pied, et on hale de
// là ; l'élingue passe par-dessus le croisement des perches, jamais sur le brêlage ; un quartier,
// pas la bête. Le brêlage lui-même est au ch. 110 (§9.5) : il n'est pas redessiné ici, seulement
// situé (ses tours et ses frappes au croisement).
// Source du montage : US Army FM 5-125, ch. 5 (sources/86-us-army-fm5-125-trepied-chevre-perches.md) :
// élingue « over the cross », poulie de renvoi au pied d'une patte, pattes reliées par une corde.
// La seule cote est celle du chapitre (écartement ½ à ⅔ de la patte).
//
// Vue 1, de trois quarts : X à droite, Y qui s'enfonce, Z vers le haut, en mm. Pattes de 4 m
// (la perche de 4 m du chapitre), écartement 0,6 de la patte (2,4 m), sommet à 3,75 m. La patte
// du fond passe derrière le quartier, en gris. Le quartier est une silhouette, sans anatomie.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const BL = '#FFFFFF';
  const blanc = t => A[t].replace('fill="none"', `fill="${BL}"`);
  const gris = t => A[t].replace('fill="none"', 'fill="#E6E6E6"');
  const f = v => Math.round(v * 100) / 100;
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const poly = (P, ferme = true) => 'M ' + P.map(pt).join(' L ') + (ferme ? ' Z' : '');
  const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const lon = v => Math.hypot(v[0], v[1]);
  const uni = v => { const l = lon(v) || 1; return [v[0] / l, v[1] / l]; };
  const nor = v => [-v[1], v[0]];
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const RAD = Math.PI / 180;
  const axe = `${A.fin} stroke-dasharray="12 3 2 3"`;
  // courbe lisse qui passe par chaque point (Catmull-Rom fermée ou ouverte)
  const lisse = (P, ferme = true) => {
    const n = P.length, g = i => ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))];
    let d = `M ${pt(P[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${pt(c1)} ${pt(c2)} ${pt(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };

  // ─── les corps simples (repris de 109-08) ───────────────────────────────────────────────
  const poserBras = (o, cibles, axes, coudes = {}) => {
    const g = o.cote === 'gauche', X0 = o.x;
    const oo = Object.assign({}, o, { cote: 'droite' });
    const c = F.corps(oo), ang = Object.assign({}, o.angles || {});
    const angDe = v => Math.atan2(v[0], v[1]) / RAD, dirDe = a => [Math.sin(a * RAD), Math.cos(a * RAD)];
    for (const k of ['P', 'L']) {
      let C = cibles[k]; if (!C) continue;
      let ax = axes[k];
      if (g) { C = [2 * X0 - C[0], C[1]]; if (ax != null) ax = 180 - ax; }
      const S = c.articulations['epaule' + k], E_ = c.articulations['coude' + k], Wr = c.articulations['poignet' + k], Mn = c['main' + k];
      const lb = Math.hypot(E_[0] - S[0], E_[1] - S[1]), la = Math.hypot(Wr[0] - E_[0], Wr[1] - E_[1]);
      const hv = [Mn.x - Wr[0], Mn.y - Wr[1]], lm = Math.hypot(...hv);
      const off = angDe(hv) - angDe([Math.cos(Mn.axe * RAD), Math.sin(Mn.axe * RAD)]);
      const resoudre = main => {
        const h2 = dirDe(main + off).map(v => v * lm), W_ = [C[0] - h2[0], C[1] - h2[1]];
        const d = [W_[0] - S[0], W_[1] - S[1]], D = Math.min(Math.hypot(...d), lb + la - 0.01);
        const a0 = angDe(d), B = Math.acos(Math.max(-1, Math.min(1, (lb * lb + D * D - la * la) / (2 * lb * D)))) / RAD;
        const bras = a0 + (coudes[k] === 'avant' ? 1 : -1) * B;
        const e = [S[0] + lb * Math.sin(bras * RAD), S[1] + lb * Math.cos(bras * RAD)];
        const ab = angDe([W_[0] - e[0], W_[1] - e[1]]);
        const pli = Math.abs(((main - ab) % 360 + 540) % 360 - 180);
        return { pli, bras, ab, main };
      };
      let best = null;
      for (const main of [180 - ax, -ax, 360 - ax]) { const r = resoudre(main); if (!best || r.pli < best.pli) best = r; }
      ang['bras' + k] = best.bras; ang['avantbras' + k] = best.ab; ang['main' + k] = best.main;
    }
    return ang;
  };
  const versDeg = (a, b) => Math.atan2(b[1] - a[1], b[0] - a[0]) / RAD;

  // ─── pièces ─────────────────────────────────────────────────────────────────────────────
  // une perche de a (pied) à b (bout du haut), diamètres wa, wb en unités de vue ; rompue en haut
  const perche = (a, b, wa, wb, at, { ecorce = true, rompu = false } = {}) => {
    const u = uni(sub(b, a)), n = nor(u), e = wb / 2;
    const haut = rompu
      ? [add(b, n, e), add(add(b, n, e * 0.3), u, 4), add(add(b, n, -e * 0.3), u, -3), add(b, n, -e)]
      : [add(b, n, e), add(b, n, -e)];
    const P = [add(a, n, wa / 2), ...haut, add(a, n, -wa / 2)];
    const out = [h.path(poly(P), at)];
    if (ecorce) {
      const L = lon(sub(b, a));
      for (const [t0, t1, o] of [[0.1, 0.3, 0.22], [0.46, 0.64, -0.18], [0.74, 0.86, 0.2]]) {
        const w0 = wa + (wb - wa) * t0, w1 = wa + (wb - wa) * t1;
        out.push(h.ligne(...add(add(a, u, L * t0), n, o * w0), ...add(add(a, u, L * t1), n, o * w1), A.fin));
      }
    }
    return out.join('\n');
  };
  // une poulie : joues en ovale, axe ; c = centre, s = demi-hauteur, ang en degrés
  const poulie = (c, s, ang = 0) => {
    const R = (x, y) => { const a = ang * RAD; return [c[0] + x * Math.cos(a) - y * Math.sin(a), c[1] + x * Math.sin(a) + y * Math.cos(a)]; };
    const P = [];
    for (let i = 0; i < 24; i++) { const t = Math.PI * 2 * i / 24; P.push(R(s * 0.62 * Math.sin(t), s * Math.cos(t))); }
    return [h.path(poly(P), blanc('arete')), h.cercle(...R(0, 0), Math.max(1.2, s * 0.18), A.fin)].join('\n');
  };
  // Le quartier arrière pendu par le jarret, le crochet entre le tendon et l'os : le bout de canon
  // coupé en haut, le jarret, puis la cuisse. Une silhouette de repère, sans anatomie ; en mm, 0 au
  // crochet, y vers le bas (proportions prises sur le module commun _carcasse-orignal.js : un peu
  // plus d'un mètre du jarret à la coupe, un demi-mètre de large à la cuisse).
  // Le bas est franc : c'est la coupe qui a séparé le quartier du reste de la carcasse, un trait droit un peu
  // oblique entre deux coins, pour qu'on lise une pièce de viande et pas une goutte. Deux flancs en courbe
  // lisse, deux coupes droites (le canon en haut, la hanche en bas).
  const FLANC_D = [[178, 1010], [214, 950], [236, 840], [222, 690], [176, 528], [118, 384], [80, 262], [64, 160], [58, 70],
    [66, 22], [56, -8], [36, -40], [30, -112]];
  const FLANC_G = [[-30, -112], [-36, -40], [-52, 0], [-66, 72], [-72, 162], [-92, 282], [-138, 402], [-196, 542],
    [-246, 692], [-264, 850], [-246, 984], [-200, 1060]];
  // une courbe lisse ouverte qui passe par chaque point (Catmull-Rom, bouts tenus), échantillonnée en points
  const echantillon = (P, n = 8) => {
    const N = P.length, g = i => P[Math.max(0, Math.min(N - 1, i))], out = [];
    for (let i = 0; i < N - 1; i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      for (let j = 0; j < n; j++) {
        const t = j / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(c => 0.5 * ((2 * p1[c]) + (-p0[c] + p2[c]) * t + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2 + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * t3)));
      }
    }
    out.push(P[N - 1]);
    return out;
  };
  const QUARTIER = [...echantillon(FLANC_D), ...echantillon(FLANC_G)];
  const Q_BAS = Math.max(...QUARTIER.map(p => p[1]));
  // une forme découpée par le demi-plan x >= x0 (Sutherland-Hodgman)
  const aDroite = (P, x0) => {
    const out = [];
    for (let i = 0; i < P.length; i++) {
      const a = P[i], b = P[(i + 1) % P.length], ia = a[0] >= x0, ib = b[0] >= x0;
      if (ia) out.push(a);
      if (ia !== ib) { const t = (x0 - a[0]) / (b[0] - a[0]); out.push([x0, a[1] + (b[1] - a[1]) * t]); }
    }
    return out;
  };
  // rot : en degrés, autour du crochet (le raté le couche au sol)
  const quartier = (c, k, { ombre = true, rot = 0, at = A.contour } = {}) => {
    const a = rot * RAD, P = QUARTIER.map(p => [c[0] + k * (p[0] * Math.cos(a) - p[1] * Math.sin(a)), c[1] + k * (p[0] * Math.sin(a) + p[1] * Math.cos(a))]);
    const out = [h.path(poly(P), A.blanc)];
    if (ombre) out.push(h.path(poly(aDroite(P, c[0] + 70 * k)), A.ombre));
    out.push(h.path(poly(P), at));
    return out.join('\n');
  };

  // ─── Vue 1 : monté, de trois quarts ─────────────────────────────────────────────────────
  const KX = 0.30, KY = 0.42;
  const LP = 4000, ECART = 0.6 * LP, RP = ECART / Math.sqrt(3), HS = Math.sqrt(LP * LP - RP * RP);
  const AN = { A: 210, B: 330, C: 90 };
  const pied3 = n => [RP * Math.cos(AN[n] * RAD), RP * Math.sin(AN[n] * RAD), 0];
  const M = z => {
    const k = (z.h - 34) / 4500, yg = z.h - 30 - KY * (RP / 2) * k, x0 = z.l * 0.6 - 2;
    const P = (X, Y, Z) => [x0 + k * (X + KX * Y), yg - k * (Z + KY * Y)];
    const S3 = [0, 0, HS];
    const pieds = { A: pied3('A'), B: pied3('B'), C: pied3('C') };
    const surPatte = (n, t) => { const p = pieds[n]; return [p[0] + (S3[0] - p[0]) * t, p[1] + (S3[1] - p[1]) * t, p[2] + (S3[2] - p[2]) * t]; };
    const bout = n => surPatte(n, 1 + 380 / LP);
    const pA = P(...pieds.A), pB = P(...pieds.B), pC = P(...pieds.C), S = P(...S3);
    const ph = P(0, 0, HS - 380), pb = P(0, 0, HS - 1100), qh = P(0, 0, HS - 1260);
    // la poulie du pied : attachée à la patte A, du côté intérieur, assez loin d'elle pour que le brin qui y
    // descend reste à l'écart de la patte sur toute sa longueur
    const sA = surPatte('A', 0.07), iA = uni([-pieds.A[0], -pieds.A[1]]);
    const piedPoulie = P(sA[0] + iA[0] * 340, sA[1] + iA[1] * 340, sA[2]);
    const attache = P(...surPatte('A', 0.17));
    const xH = pA[0] - 2150 * k;
    const mP = [xH + 560 * k, pA[1] - 1020 * k];
    return { k, x0, yg, P, S3, pieds, bout, surPatte, pA, pB, pC, S, ph, pb, qh, piedPoulie, attache, xH, mP };
  };
  // un piquet chassé contre le pied, du côté extérieur : mince, debout, sa tête au-dessus du sol ; la partie
  // enfoncée en tireté, jusqu'à la pointe ; un bout de sol marque où il entre
  const piquet = (q, n) => {
    const pB_ = q.P(...q.pieds[n]), wP = 130 * q.k, ep = 3.6, hV = 360 * q.k, hE = 260 * q.k;
    const xg = pB_[0] + wP / 2 + 0.6, xd = xg + ep, y0 = pB_[1];
    return [
      h.ligne(pB_[0] - 2, y0, xd + 16, y0, A.detail),
      h.path(`M ${f(xg)} ${f(y0)} L ${f(xg)} ${f(y0 + hE)} L ${f((xg + xd) / 2)} ${f(y0 + hE + 7)} L ${f(xd)} ${f(y0 + hE)} L ${f(xd)} ${f(y0)}`, A.cache),
      h.path(poly([[xg, y0], [xg, y0 - hV], [xd, y0 - hV], [xd, y0]]), blanc('arete')),
    ].join('\n');
  };
  const vueMonte = z => {
    const q = M(z), { k, P, pA, pB, pC, S, ph, pb, qh, piedPoulie, mP } = q, out = [];
    const wP = 130 * k, wH = 80 * k;
    // le sol sous l'homme
    out.push(h.ligne(q.xH - 30, pA[1], q.xH + 44, pA[1], A.detail));
    // la corde au ras du sol, d'un pied à l'autre
    out.push(h.path(poly([pA, pB, pC]), A.arete));
    // l'aplomb du sommet, jusqu'au sol
    const sol0 = P(0, 0, 0);
    out.push(h.ligne(S[0], S[1] + 6, sol0[0], sol0[1] + 4, axe));
    out.push(h.ligne(sol0[0] - 6, sol0[1], sol0[0] + 6, sol0[1], A.detail));
    // la patte du fond, en gris, son pied dans un trou
    out.push(h.ellipse(pC[0] + 1, pC[1] + 1, 9, 3, A.detail));
    out.push(perche(pC, P(...q.bout('C')), wP, wH, gris('arete')));
    // le palan : les deux brins entre les poulies
    out.push(h.ligne(ph[0] - 2.4, ph[1], pb[0] - 2.4, pb[1], A.detail), h.ligne(ph[0] + 2.4, ph[1], pb[0] + 2.4, pb[1], A.detail));
    // l'élingue : du croisement à la poulie du haut
    out.push(h.path(`M ${pt([S[0] - 3.5, S[1] - 1])} L ${pt([ph[0] - 2, ph[1] - 7])} M ${pt([S[0] + 3.5, S[1] - 1])} L ${pt([ph[0] + 2, ph[1] - 7])}`, A.arete));
    out.push(poulie(ph, 8), poulie(pb, 7));
    // le crochet et le quartier pendu par le jarret
    out.push(h.ligne(pb[0], pb[1] + 7, qh[0], qh[1] + 1, A.arete));
    out.push(quartier([qh[0], qh[1]], k));
    // les deux pattes de devant
    out.push(perche(pA, P(...q.bout('A')), wP, wH, blanc('contour')));
    out.push(perche(pB, P(...q.bout('B')), wP, wH, blanc('contour')));
    // le brêlage au croisement
    const bl = P(0, 0, HS);
    out.push(h.rect(bl[0] - 6.5, bl[1] - 4.5, 13, 9, blanc('arete')));
    for (const dx of [-3, 0, 3]) out.push(h.ligne(bl[0] + dx, bl[1] - 4.5, bl[0] + dx, bl[1] + 4.5, A.fin));
    // le trou du pied A ; le piquet du pied B
    out.push(h.ellipse(pA[0] + 1, pA[1] + 1, 11, 3.6, A.detail));
    out.push(piquet(q, 'B'));
    // la poulie du pied : son estrope fait deux tours sur la patte A et la tient du côté intérieur
    const rp = 6.5, att = q.attache, uA = uni(sub(P(...q.bout('A')), pA)), nA = nor(uA);
    for (const d of [-2, 2]) out.push(h.ligne(...add(add(att, uA, d), nA, -7), ...add(add(att, uA, d), nA, 7), A.detail));
    out.push(h.ligne(att[0] + 6, att[1], piedPoulie[0] - 1, piedPoulie[1] - rp + 1, A.detail));
    // le brin halé : de la poulie du haut, il descend à l'écart de la patte jusqu'au côté intérieur de la poulie du
    // pied, passe dessous, et repart devant la patte vers les mains de l'homme
    const oH = { x: q.xH, y: pA[1], pose: 'tire-arriere', echelle: k };
    const axR = versDeg(mP, piedPoulie);
    oH.angles = poserBras(oH, { P: mP, L: [mP[0] - 8, mP[1] - 1] }, { P: axR, L: axR });
    const homme = F.corps(oH);
    const fP = [homme.mainP.x, homme.mainP.y], fL = [homme.mainL.x, homme.mainL.y];
    const rr = rp * 0.62 + 1.4, tour = [];
    for (let i = 0; i <= 10; i++) { const a = (0 + 180 * i / 10) * RAD; tour.push([piedPoulie[0] + rr * Math.cos(a), piedPoulie[1] + rr * Math.sin(a) * 1.4]); }
    const sortie = add(ph, uni(sub(tour[0], ph)), 6);
    out.push(h.path('M ' + [sortie, ...tour].map(pt).join(' L ') + ` L ${pt(fL)}`, A.arete));
    out.push(h.path(`M ${pt(fL)} C ${pt([fL[0] - 6, fL[1] + 8])} ${pt([fL[0] - 2, fL[1] + 22])} ${pt([fL[0] - 6, fL[1] + 34])}`, A.arete));
    out.push(poulie(piedPoulie, rp, 0));
    const dirR = uni(sub(fP, piedPoulie)), nR = nor(dirR);
    out.push(String(homme));
    const g0 = add(add(fP, dirR, -34), nR, 10), g1 = add(add(fP, dirR, -10), nR, 10);
    out.push(h.geste(`M ${pt(g0)} L ${pt(g1)}`));
    // la cote : l'écartement, de A à B
    out.push(h.cote(pA[0], pA[1] + 16, pB[0], pB[1] + 16, 'écartement : ½ à ⅔ de la patte', { cote: 'dessous' }));
    return out.join('\n');
  };
  const renvoisMonte = z => {
    const q = M(z), { k, P, pA, pB, pC, S, ph, qh, piedPoulie } = q;
    const sortie = add(ph, uni(sub(piedPoulie, ph)), 6);
    const brin = lerp([piedPoulie[0] + 5.4, piedPoulie[1]], sortie, 0.42);
    const cBC = lerp(pB, pC, 0.55);
    const cuisse = [qh[0] + 2, qh[1] + 880 * k];
    // la flèche du geste, posée comme dans vueMonte
    const oH = { x: q.xH, y: pA[1], pose: 'tire-arriere', echelle: k };
    const axR = versDeg(q.mP, piedPoulie);
    oH.angles = poserBras(oH, { P: q.mP, L: [q.mP[0] - 8, q.mP[1] - 1] }, { P: axR, L: axR });
    const homme = F.corps(oH), fP = [homme.mainP.x, homme.mainP.y];
    const dirR = uni(sub(fP, piedPoulie)), nR = nor(dirR);
    const gm = add(add(fP, dirR, -22), nR, 10);
    return [
      { n: 1, rond: [pB[0] + 62, pB[1] - 6], cible: [pB[0] + 130 * k / 2 + 4.8, pB[1] - 14], texte: 'pied dans un trou ou contre un piquet' },
      { n: 2, rond: [cBC[0] + 84, cBC[1] - 22], cible: [cBC[0] + 1, cBC[1]], texte: 'corde tendue au ras du sol' },
      { n: 3, rond: [qh[0] + 104, cuisse[1] - 16], cible: cuisse, texte: 'un quartier, à l’aplomb du sommet' },
      { n: 4, rond: [brin[0] - 64, brin[1] - 18], cible: [brin[0] - 1.5, brin[1]], texte: 'brin halé le long d’une patte' },
      { n: 5, rond: [piedPoulie[0] + 40, piedPoulie[1] - 26], cible: [piedPoulie[0] + 4.6, piedPoulie[1] - 3], texte: 'poulie attachée au pied de la patte' },
      { n: 6, rond: [gm[0] + 4, gm[1] - 26], cible: [gm[0], gm[1] - 2.5], texte: 'haler depuis la poulie du pied' },
    ];
  };

  // ─── Vue 2 : le sommet, de face ─────────────────────────────────────────────────────────
  // Les trois perches se croisent au brêlage ; leurs bouts s'écartent au-dessus et font un creux.
  // L'élingue se pose dans ce creux, sur les perches, au-dessus des tours du brêlage, et descend de
  // part et d'autre jusqu'à la poulie.
  const T = z => ({ cx: z.l / 2, cy: 64, d: 16, ang: 16 });
  const vueSommet = z => {
    const q = T(z), { cx, cy, d } = q, out = [];
    const dirA = [Math.sin(q.ang * RAD), -Math.cos(q.ang * RAD)], dirB = [-dirA[0], dirA[1]];
    const lg = (z.h - cy + 6) / Math.cos(q.ang * RAD);
    // la perche du fond (C), presque droite, en gris
    out.push(perche([cx + 4, z.h - 2], [cx - 1, cy - 50], d * 0.95, d * 0.85, gris('arete'), { ecorce: false }));
    const a0 = add([cx, cy], dirA, -lg), a1 = add([cx, cy], dirA, 50);
    const b0 = add([cx, cy], dirB, -lg), b1 = add([cx, cy], dirB, 50);
    out.push(perche(a0, a1, d, d * 0.9, blanc('contour'), { ecorce: false }));
    out.push(perche(b0, b1, d, d * 0.9, blanc('contour'), { ecorce: false }));
    // le brêlage : une bande de tours au croisement
    const lb = d * 1.9;
    out.push(h.rect(cx - lb / 2, cy - 9, lb, 18, blanc('arete')));
    for (let i = 1; i < 8; i++) out.push(h.ligne(cx - lb / 2 + 2, cy - 9 + i * 2.25, cx + lb / 2 - 2, cy - 9 + i * 2.25, A.fin));
    // l'élingue : posée dans le creux au-dessus du brêlage, ses deux brins le long des perches
    const yP = z.h - 30, top = cy - 20, e = 2.6;
    // un seul chemin : le brin de gauche monte de la poulie, l'élingue passe en arche sur le croisement, le brin
    // de droite redescend à la poulie
    const B0 = s => [cx + s * 3, yP - 13], B1 = s => [cx + s * (lb / 2 + 4), cy + 14], B2 = s => [cx + s * 8, top + 2];
    const elingue = `M ${pt(B0(-1))} C ${pt([cx - 6, yP - 32])} ${pt([cx - (lb / 2 + 3), cy + 40])} ${pt(B1(-1))}`
      + ` C ${pt([cx - (lb / 2 + 5), cy - 2])} ${pt([cx - 15, top + 14])} ${pt(B2(-1))}`
      + ` C ${pt([cx - 4.5, top - 4])} ${pt([cx + 4.5, top - 4])} ${pt(B2(1))}`
      + ` C ${pt([cx + 15, top + 14])} ${pt([cx + (lb / 2 + 5), cy - 2])} ${pt(B1(1))}`
      + ` C ${pt([cx + (lb / 2 + 3), cy + 40])} ${pt([cx + 6, yP - 32])} ${pt(B0(1))}`;
    out.push(h.path(elingue, `fill="none" stroke="#1A1A1A" stroke-width="${e + 2.8}" stroke-linecap="round" stroke-linejoin="round"`));
    out.push(h.path(elingue, `fill="none" stroke="#FFFFFF" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round"`));
    // la poulie du haut, pendue à l'élingue
    out.push(poulie([cx, yP], 12));
    out.push(h.controle(cx, top - 2, 13));
    return out.join('\n');
  };
  const renvoisSommet = z => {
    const q = T(z), { cx, cy } = q;
    return [
      { n: 7, rond: [cx + 58, cy + 40], cible: [cx + 15, cy + 6], texte: 'brêlage de trépied (ch. 110)' },
      { n: 8, rond: [cx - 60, cy - 42], cible: [cx - 10, cy - 24], texte: 'l’élingue sur le croisement, pas sur le brêlage' },
    ];
  };

  // ─── Vue 3 : les pieds, en coupe ────────────────────────────────────────────────────────
  const D = z => {
    const ys = z.h * 0.6, yf = ys + 24, xA = 46, xB = z.l - 50, d = 18;
    return { ys, yf, xA, xB, d };
  };
  const vuePieds = z => {
    const q = D(z), { ys, yf, xA, xB, d } = q, out = [];
    // le sol ferme, et par-dessus la neige ou le sol meuble ; le trou du pied A
    const tr = [xA - d / 2 - 1, xA + d / 2 + 12];
    out.push(h.path(poly([[0, yf], [z.l, yf], [z.l, z.h - 1], [0, z.h - 1]]), A.hachure('terre', 'aucun')));
    out.push(h.path(poly([[0, ys], [tr[0], ys], [tr[0], yf], [0, yf]]), A.hachure('neige', 'aucun')));
    out.push(h.path(poly([[tr[1], ys], [z.l, ys], [z.l, yf], [tr[1], yf]]), A.hachure('neige', 'aucun')));
    out.push(h.path(`M 0 ${f(ys)} L ${f(tr[0])} ${f(ys)} L ${f(tr[0])} ${f(yf)} L ${f(tr[1])} ${f(yf)} L ${f(tr[1])} ${f(ys)} L ${z.l} ${f(ys)}`, A.arete));
    out.push(h.ligne(0, yf, tr[0], yf, A.fin), h.ligne(tr[1], yf, z.l, yf, A.fin));
    // les pattes, inclinées vers le sommet, rompues en haut ; le pied A contre la paroi extérieure du trou
    const angA = 20, angB = -20;
    const topA = [xA + Math.tan(angA * RAD) * (yf - 6), 6], topB = [xB + Math.tan(angB * RAD) * (ys - 6), 6];
    out.push(perche([xA, yf], topA, d, d * 0.92, blanc('contour'), { rompu: true }));
    out.push(perche([xB, ys], topB, d, d * 0.92, blanc('contour'), { rompu: true }));
    // le piquet, chassé du côté extérieur du pied B, la pointe dans le sol
    const xq = xB + d * 0.62 + 3;
    out.push(h.path(poly([[xq - 3.5, ys - 26], [xq + 3.5, ys - 26], [xq + 3.5, ys + 26], [xq, ys + 33], [xq - 3.5, ys + 26]]), blanc('arete')));
    // la corde qui relie les pieds, au ras du sol
    const yc = ys - 7;
    const cA = xA + Math.tan(angA * RAD) * (yf - yc), cB = xB + Math.tan(angB * RAD) * (ys - yc);
    out.push(h.ligne(cA + d / 2 + 1, yc, cB - d / 2 - 1, yc, A.arete));
    // la poussée de chaque pied, vers l'extérieur
    out.push(h.fleche(`M ${f(xA - d / 2 - 3)} ${f(ys - 14)} L ${f(xA - d / 2 - 26)} ${f(ys - 14)}`, A.arete));
    out.push(h.fleche(`M ${f(xq + 6)} ${f(ys - 16)} L ${f(xq + 28)} ${f(ys - 16)}`, A.arete));
    return out.join('\n');
  };
  const renvoisPieds = z => {
    const q = D(z), { ys, yf, xA, xB, d } = q, xq = xB + d * 0.62 + 3;
    return [
      { n: 9, rond: [xA + 44, z.h - 16], cible: [xA + d / 2 + 4, yf - 3], texte: 'trou jusqu’au sol ferme' },
      { n: 10, rond: [xq - 30, ys + 46], cible: [xq - 2, ys + 14], texte: 'piquet du côté extérieur' },
      { n: 11, rond: [xq + 12, ys - 52], cible: [xq + 20, ys - 18], texte: 'chaque pied pousse vers l’extérieur' },
    ];
  };

  // ─── Vue 4 : le raté, de côté ───────────────────────────────────────────────────────────
  // Un pied glisse : le sommet descend, les pattes se couchent, la charge tombe à l'aplomb du
  // sommet. En tireté, le trépied debout et son quartier ; en plein, le trépied ouvert.
  const R = z => {
    const yg = z.h - 16, cx = z.l * 0.40, L = Math.min((yg - 12) / 0.96, (z.l * 0.6 - 16) / 0.72);   // le pied glissé reste dans la vue
    return { yg, cx, L, e0: 0.30 * L, gl: 0.42 * L, k: L / LP };
  };
  const vueRate = z => {
    const q = R(z), { yg, cx, L, e0, gl, k } = q, out = [];
    out.push(h.rect(0, yg, z.l, z.h - yg - 1, A.hachure('terre', 'aucun')));
    out.push(h.ligne(0, yg, z.l, yg, A.arete));
    // debout, en tireté : les pattes et le quartier
    const S0 = [cx, yg - Math.sqrt(L * L - e0 * e0)];
    out.push(h.ligne(cx - e0, yg, S0[0], S0[1], A.cache), h.ligne(cx + e0, yg, S0[0], S0[1], A.cache));
    out.push(quartier([cx, S0[1] + 1260 * k], k, { ombre: false, at: A.cache }));
    // ouvert : le pied de droite a glissé sur la glace, le sommet est descendu
    const gA = cx - e0, gB = cx + e0 + gl;
    const hS = Math.sqrt(L * L - ((gB - gA) / 2) ** 2), S1 = [(gA + gB) / 2, yg - hS];
    out.push(h.rect(cx + e0 - 6, yg - 3, gl + 18, 3, blanc('detail')));
    // le quartier tombé à l'aplomb du sommet, couché
    out.push(quartier([cx - 520 * k, yg - 262 * k - 2], k, { ombre: false, rot: -90 }));
    out.push(perche([gA, yg], add(S1, uni(sub(S1, [gA, yg])), 6), 7, 5, blanc('contour'), { ecorce: false }));
    out.push(perche([gB, yg - 1.5], add(S1, uni(sub(S1, [gB, yg])), 6), 7, 5, blanc('contour'), { ecorce: false }));
    // la zone sous le sommet : là où la charge tombe
    out.push(h.path(`M ${f(cx - 26)} ${f(yg - 2)} L ${f(cx - 26)} ${f(S0[1] + 1260 * k + Q_BAS * k + 6)} L ${f(cx + 26)} ${f(S0[1] + 1260 * k + Q_BAS * k + 6)} L ${f(cx + 26)} ${f(yg - 2)}`, A.zone));
    // le pied qui glisse : la flèche s'arrête avant la patte de droite
    const yF = yg - 10, xPatte = gB + (S1[0] - gB) * (yg - yF) / (yg - S1[1]);
    out.push(h.fleche(`M ${f(cx + e0 + 4)} ${f(yF)} L ${f(xPatte - 3.5 - 7)} ${f(yF)}`, A.arete));
    return out.join('\n');
  };
  const renvoisRate = z => {
    const q = R(z), { yg, cx, e0, gl } = q;
    return [
      { n: 12, rond: [cx + e0 + gl - 6, yg - 46], cible: [cx + e0 + gl / 2, yg - 12], texte: 'un pied glisse, le sommet descend' },
      { n: 13, rond: [cx - 58, yg - 44], cible: [cx - 27, yg - 30], texte: 'la charge tombe à l’aplomb' },
    ];
  };

  return {
    ref: '109-41',
    titre: 'Le trépied de perches qui porte les quartiers',
    desc: 'Un trépied de trois perches de 4 m, vu de trois quarts. Les trois pieds sont calés, l’un dans un trou, les autres contre un piquet chassé du côté extérieur, et reliés par une corde tendue au ras du sol ; l’écartement d’un pied à l’autre va de la moitié aux deux tiers de la longueur des pattes. Un quartier arrière pend par le jarret au palan, à l’aplomb du sommet. Le brin halé descend le long d’une patte jusqu’à une poulie amarrée à son pied ; l’homme hale de là, à côté du trépied. Au sommet, l’élingue passe par-dessus le croisement des perches, au-dessus du brêlage. En coupe, un pied dans un trou creusé jusqu’au sol ferme, l’autre contre un piquet du côté extérieur ; chaque pied pousse vers l’extérieur et la corde reprend la poussée. Le raté : un pied glisse, le sommet descend, la charge tombe à l’aplomb du sommet.',
    format: 'pleine',
    disposition: [['monte'], ['sommet', 'pieds', 'rate']],
    hauteurs: [2.2, 1],
    largeurs: [[1], [0.85, 1.1, 1.1]],
    vues: {
      monte: { titre: 'Monté, de trois quarts', dessin: vueMonte, renvois: renvoisMonte },
      sommet: { titre: 'Le sommet', dessin: vueSommet, renvois: renvoisSommet },
      pieds: { titre: 'Les pieds, en coupe', dessin: vuePieds, renvois: renvoisPieds },
      rate: { titre: 'Le raté', dessin: vueRate, renvois: renvoisRate },
    },
  };
};
