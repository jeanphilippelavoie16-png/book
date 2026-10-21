// Planche 26-40 — La plaie : appuyer, puis laver.
// Chapitre 26, étapes 15 à 17 et 22, « Les gestes qui remplacent un appareil » et le tableau
// du matériel : pression directe, la paume sur la plaie même, sans relâcher ; si le sang
// traverse, un seul pansement de plus par-dessus et appuyer plus fort ; plaie profonde de
// cuisse bourrée de gaze tassée au fond au doigt ganté, puis la pression par-dessus ; laver au
// jet d'eau bouillie refroidie, bouteille souple percée au clou chauffé ; sans bouteille, un sac
// de plastique épais percé d'un trou d'épingle et tordu pour faire pression.
// Les mesures du dessin sont celles d'un corps d'adulte, en cm, mises à l'échelle s (px/cm).
// Passe qualité (lot 06) : les mains viennent de h.formes ; la coupe de cuisse tramée, avec sa vignette.
// Reprise JP (12 octobre, « mains et pied ») : les deux mains à plat de profil, bras droits, se lisaient
// comme deux pieds. Appuyer et le sang qui traverse passent en vue de dessus, les deux mains à plat
// (appui vu du dos) croisées sur la compresse, et la vignette pictogramme donne la posture à genoux,
// bras tendus ; le poing fait à la main de la plaie profonde devient la main de la bibliothèque
// (doigts serrés, tendus dans la plaie) ; le pied, un moignon, est redessiné (talon, plante, orteils).
// Lot 3, corps simples et charte (13 octobre) : les deux vignettes passent par h.formes.corps
// (genoux-appuie + couche-dos ; couche-dos en petit pour repérer la coupe). L'aidant est à genoux de
// l'autre côté du blessé : devant lui, ses tibias barraient la tête et le dos du blessé. Deux poids :
// les compresses, la bouteille et le sac à 2,4, les membres à 1,5. Gris loin : la main du dessous. Gris
// ombre : la face droite du cou tordu. Rouge : la poussée le long des bras tendus, la paume sur la
// plaie, les doigts qui tassent la gaze, le poing qui serre la bouteille, le cou qu'on tord. La
// seconde compresse est posée de travers sur la première : droites, les mains les cachaient toutes deux.
// Mains simples (14 octobre) : les calques s03, s10 et s11 sont remplacés par mainSimple. Appuyer et le sang qui
// traverse : prises.mainSurMain (la main du dessous en gris), croisées de 44°, les deux avant-bras jusqu'au bord.
// Plaie profonde : plat de profil côté pouce, penchée de 25°, gantée par le moteur (la manchette remplace les deux
// traits de revers). Laver : prise-grosse vue du dos (80 mm), le bras enchaîné au coude. Sans bouteille :
// prise-manche vue de la paume, penchée de 25°, sur le cou tordu de 22 mm.
module.exports = (h) => {
  const F = h.formes;
  const PR = require(require('path').join(__dirname, '../../.claude/skills/planches/scripts/mains/prises.js'));
  // l'angle de la main qui met l'axe de sa prise sur `axe` (degrés à l'écran) et son avant-bras du côté de `vers`
  const poser = (o, axe, vers) => {
    const base = Object.assign({}, o, { angle: 0, avantbras: { longueur: 100 } });
    delete base.objet;
    const e0 = F.mainSimple(base);
    let best = null;
    for (const k of [0, 180]) {
      const a = axe - e0.prise.angle + k, e = F.mainSimple(Object.assign({}, base, { angle: a }));
      const d = [e.coude[0] - e.poignet[0], e.coude[1] - e.poignet[1]], w = [vers[0] - e.poignet[0], vers[1] - e.poignet[1]];
      const c = (d[0] * w[0] + d[1] * w[1]) / ((Math.hypot(d[0], d[1]) * Math.hypot(w[0], w[1])) || 1);
      if (!best || c > best.c) best = { a, c };
    }
    return best.a;
  };
  const BL = h.a.blanc.split(' ')[0];
  const plein = t => t.replace('fill="none"', BL);
  const f = v => (+v).toFixed(1);
  const pt = p => `${f(p[0])},${f(p[1])}`;
  const RAD = Math.PI / 180;
  const tourne = (a, d) => { const c = Math.cos(d * RAD), s = Math.sin(d * RAD); return [a[0] * c - a[1] * s, a[0] * s + a[1] * c]; };
  const repere = (x, y, e, ang) => p => { const q = tourne([p[0] * e, p[1] * e], ang); return [x + q[0], y + q[1]]; };
  const lisse = (P, t) => {
    if (t <= P[0][0]) return P[0][1];
    for (let i = 0; i < P.length - 1; i++) {
      const [t0, w0] = P[i], [t1, w1] = P[i + 1];
      if (t <= t1) { const q = (1 - Math.cos(Math.PI * (t - t0) / (t1 - t0))) / 2; return w0 + (w1 - w0) * q; }
    }
    return P[P.length - 1][1];
  };
  // La charte (13 octobre) : le corps garde le poids des corps simples (1,5) ; l'objet du geste
  // (la compresse, la bouteille, le sac) porte le contour à 2,4. La main du dessous, plus loin de
  // l'œil, prend le gris loin comme le membre loin des corps simples.
  const CORPS = h.a.arete.replace('stroke-width="1.4"', 'stroke-width="1.5"');
  const loin = svg => String(svg).replace(/<path fill="#FFFFFF"/g, '<path fill="#E6E6E6"');
  const sol = (z, yg) => [h.rect(0, yg, z.l, 8, h.a.hachure('terre', 'aucun')), h.ligne(0, yg, z.l, yg, h.a.arete)].join('\n');
  // ce qui dépasse de la vue (un bras qui sort du cadre) est coupé net au bord
  const decoupe = (id, z, contenu) => `<clipPath id="rogne-26-40-${id}"><rect x="0" y="0" width="${f(z.l)}" height="${f(z.h)}" fill="none"/></clipPath>\n<g clip-path="url(#rogne-26-40-${id})">\n${contenu}\n</g>`;

  // ─── La jambe couchée sur le dos, vue de côté. u : cm depuis la hanche vers le pied.
  const HAUT = [[-10, 17.5], [0, 17.2], [12, 16.4], [26, 14.8], [36, 13], [42, 11.8], [46, 12.8], [50, 11.6], [56, 10.6], [68, 9.8], [78, 8.2], [83, 7.4]];
  // le dessous : le mollet posé au sol, le creux du tendon d'Achille qui se soulève, puis le talon
  const BAS = [[-10, 0], [64, 0], [71, 0.5], [77, 1.4], [81, 1.7], [83.5, 1.4]];
  // le dessous de la cuisse : à plat sur le sol, puis le creux du genou qui se soulève
  const BASC = [[-10, 0], [36, 0], [41, 0.8], [46, 2], [51, 2.2], [57, 1.3], [64, 0.3], [70, 0]];
  // Le pied, la personne couchée sur le dos : le talon posé au sol, la plante tournée vers le bout,
  // les orteils en haut, un peu penchés vers l'extérieur comme un pied relâché. Du cou-de-pied
  // (au bout du tibia) par le gros orteil, la plante, la voûte, jusqu'au talon. (u, v) en cm.
  // Repère du pied : a le long de la plante, du talon vers les orteils, b vers le dessus du pied (cm).
  // La plante penche de 65° sur le sol : le pied relâché, les orteils qui tombent vers le bout.
  const PA = [0.423, 0.906], PB = [-0.906, 0.423], UH = 89.2;
  const pp = ([a, b]) => [UH + a * PA[0] + b * PB[0], a * PA[1] + b * PB[1]];
  const PIED_C = [[83, 7.4], ...[[7, 9.4], [9, 8.7], [12, 7.4], [16, 5.6], [20, 4.0], [23, 3.3], [25.2, 2.9], [26.3, 2.1], [26.7, 1.0], [26.3, 0.1],
    [25, -0.2], [23, -0.2], [20, -0.4], [17, -0.5], [13.5, 0], [10, 0.25], [6.5, -0.1], [3.5, -0.45], [1.2, -0.3], [0, 0.4], [-0.9, 1.6], [-1.3, 3.0], [-1.1, 4.2]].map(pp), [83.5, 1.4]];
  // passe par chaque point (Catmull-Rom), n pas par segment
  const courbe = (P, n = 6) => {
    const out = [];
    for (let i = 0; i < P.length - 1; i++) {
      const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(P.length - 1, i + 2)];
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(j => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
      }
    }
    out.push(P[P.length - 1]);
    return out;
  };
  const PIED = courbe(PIED_C).slice(1);
  const profilJambe = (X, Y, u0) => {
    const p = [];
    for (let u = u0; u < 83; u += 1) p.push([X(u), Y(lisse(HAUT, u))]);
    for (const [u, v] of PIED) p.push([X(u), Y(v)]);
    for (let u = 83; u >= u0; u -= 1) p.push([X(u), Y(lisse(BAS, u))]);
    return p;
  };
  // les traits du pied : la malléole (l'os rond de la cheville), le pli du cou-de-pied, la base des
  // orteils et l'ongle du gros orteil
  const traitsPied = (X, Y, s, fin) => {
    const P = q => { const [u, v] = pp(q); return `${f(X(u))},${f(Y(v))}`; };
    return [
      // la malléole : l'os rond qui saille sur le côté de la cheville
      h.path(`M${P([4.2, 4.6])} Q${P([5.4, 7.4])} ${P([7.6, 6.6])} Q${P([8.6, 5.2])} ${P([7.6, 4.0])}`, fin ? h.a.fin : h.a.detail),
      // le deuxième orteil, qui dépasse à peine derrière le gros
      h.path(`M${P([24.2, -0.15])} Q${P([23.6, 0.9])} ${P([22.2, 1.4])}`, fin ? h.a.fin : h.a.detail),
      fin ? '' : h.path(`M${P([24.0, 3.0])} Q${P([25.0, 2.4])} ${P([25.9, 2.1])}`, h.a.fin),
      fin ? '' : h.path(`M${P([6.4, 9.3])} Q${P([7.4, 8.4])} ${P([8.6, 8.4])}`, h.a.fin),
    ].join('\n');
  };
  const jambe = (z, u0, s, yg) => {
    const X = u => (u - u0) * s, Y = v => yg - v * s;
    const top = x => Y(lisse(HAUT, x / s + u0));
    const dessin = [
      sol(z, yg),
      h.chemin(profilJambe(X, Y, u0), plein(CORPS), true),
      traitsPied(X, Y, s, false),
    ].join('\n');
    return { X, Y, top, dessin };
  };
  // ─── La cuisse vue de dessus, la personne couchée sur le dos : u cm depuis la hanche, demi-largeur.
  // Le genou à droite, la rotule à peine marquée ; la jambe continue hors de la vue.
  const LARG = [[-10, 9.6], [0, 9.3], [14, 8.7], [28, 7.7], [37, 6.6], [41, 5.9], [44.5, 6.1], [48, 5.7], [54, 5.3], [66, 5.0]];
  const cuisseDessus = (z, u0, s, cy) => {
    const X = u => (u - u0) * s, U = x => u0 + x / s, hw = x => lisse(LARG, U(x)) * s;
    const haut = [], bas = [];
    for (let x = -2; x < z.l + 3; x += 1.5) { haut.push([x, cy - hw(x)]); bas.push([x, cy + hw(x)]); }
    const dessin = [
      h.chemin([...haut, ...bas.slice().reverse()], h.a.blanc, true),
      h.chemin(haut, CORPS), h.chemin(bas, CORPS),
      // le genou : la cuisse s'y rétrécit, puis la jambe repart
    ].join('\n');
    return { X, U, hw, cy, dessin };
  };
  // Une compresse vue de dessus : un carré de gaze pliée, coins à peine arrondis, le pli marqué.
  // La compresse sur la plaie (une gaze pliée, ou un linge plié) : assez grande pour dépasser au
  // bout des doigts, sinon les mains la cachent. La seconde, posée par-dessus, un peu plus petite.
  // (dx, dy, l, ht) en cm depuis la plaie.
  // La seconde est tournée d'un quart de tour de travers sur la première : leurs coins sortent de
  // sous les mains, et l'on voit qu'il y en a deux (posées droites l'une sur l'autre, les mains les
  // cachaient toutes les deux).
  const PREMIERE = [1.5, 0, 20, 15], SECONDE = [2.2, -0.2, 19, 14, -14];
  const tampon = (cx, cy, l, ht, at, pli) => {
    const r = Math.min(l, ht) * 0.12, x0 = cx - l / 2, y0 = cy - ht / 2, x1 = cx + l / 2, y1 = cy + ht / 2;
    const d = `M${f(x0 + r)},${f(y0)} L${f(x1 - r)},${f(y0)} Q${f(x1)},${f(y0)} ${f(x1)},${f(y0 + r)} L${f(x1)},${f(y1 - r)} Q${f(x1)},${f(y1)} ${f(x1 - r)},${f(y1)} L${f(x0 + r)},${f(y1)} Q${f(x0)},${f(y1)} ${f(x0)},${f(y1 - r)} L${f(x0)},${f(y0 + r)} Q${f(x0)},${f(y0)} ${f(x0 + r)},${f(y0)} Z`;
    const out = [h.path(d, at)];
    if (pli) out.push(h.ligne(x0 + 3, y0 + ht * 0.36, x1 - 3, y0 + ht * 0.36, h.a.fin));
    return out.join('\n');
  };
  // Les deux mains à plat l'une sur l'autre, vues de dessus (mains simples, prises.mainSurMain) : la gauche
  // dessous, en gris, la paume sur la plaie (P) ; la droite par-dessus, sa paume sur le dos de la première, tournée
  // de 44° (à 24°, les deux avant-bras se confondaient), avancée de 12 mm : les doigts gris du dessous dépassent. Les doigts vont vers le genou ; les deux avant-bras partent vers la gauche, vers celui qui appuie (la
  // vignette), et s'arrêtent au bord de la vue.
  const deuxMains = (P, s, z) => {
    const em = s / 10, dir = a => [Math.cos(a * RAD), Math.sin(a * RAD)];
    const d1 = -18, u1 = dir(d1);
    const o = { angle: d1, echelle: em, cote: 'gauche', croise: 44, decalage: [12, 10], fin: [[-3, -1000], [-3, 1000]] };
    // la paume du dessous (le creux de la main) sur la plaie : une première passe donne son écart au poignet
    const m0 = PR.mainSurMain(F.mainSimple, { ...o, x: 0, y: 0 });
    const W = [P[0] - m0.dessous.prise.x, P[1] - m0.dessous.prise.y];
    const M = PR.mainSurMain(F.mainSimple, { ...o, x: W[0], y: W[1] });
    const paume = P;
    return { M, em, u1, paume, dessus: M.dessus, dessous: M.dessous, svg: M.svg };
  };
  // Les y où une verticale x coupe les contours d'un SVG fait de polylignes (les corps simples) :
  // le dessus de la cuisse du blessé, là où les mains se posent.
  const coupesX = (svg, x) => {
    const ys = [];
    for (const m of String(svg).matchAll(/ d="([^"]+)"/g)) {
      const n = m[1].match(/-?\d+(\.\d+)?/g).map(Number);
      for (let i = 0; i + 3 < n.length; i += 2) {
        const [x0, y0, x1, y1] = [n[i], n[i + 1], n[i + 2], n[i + 3]];
        if (x0 !== x1 && (x0 - x) * (x1 - x) <= 0) ys.push(y0 + (y1 - y0) * (x - x0) / (x1 - x0));
      }
    }
    return ys;
  };
  // La vignette de la posture, en corps simples : le blessé couché sur le dos (couche-dos), et celui
  // qui appuie à genoux de l'autre côté de lui, à hauteur de la hanche, tourné vers les pieds
  // (genoux-appuie) : le blessé, peint par-dessus, cache ses genoux et ses tibias. Les bras droits
  // (bras = avant-bras), les épaules à l'aplomb des mains ; le tronc penché juste ce qu'il faut pour
  // que la paume du dessous se pose sur le dessus de la cuisse, à mi-chemin de la hanche au genou ;
  // l'autre main à plat par-dessus (le coude à peine plié). Même échelle pour les deux corps.
  // corps() coûte ~0,3 s : la vignette se calcule une fois (dessin et renvois la partagent), et
  // les deux ajustements se font par bissection.
  const memo = {};
  const bissection = (fn, a, b, n = 11) => { let fa = fn(a); for (let i = 0; i < n; i++) { const m = (a + b) / 2, fm = fn(m); if ((fm < 0) === (fa < 0)) { a = m; fa = fm; } else b = m; } return (a + b) / 2; };
  const deplace = (g, dx) => `<g transform="translate(${f(dx)} 0)">\n${g}\n</g>`;
  const posture = (x, y, l, ht) => {
    const cle = [x, y, l, ht].join(',');
    if (memo[cle]) return memo[cle];
    // Agrandie (JP, 13 oct. au soir : les vues de côté restent) : à 0,108 le blessé est plus long que
    // la vignette ; sa tête reste dedans, ses pieds sortent du cadre à droite.
    const yg = y + ht - 6, e = 0.108;
    const pat0 = F.corps({ x: 0, y: yg, pose: 'couche-dos', echelle: e }), dp = x + 5 - pat0.boite.x0;
    const A = pat0.articulations;
    const xt = A.hancheP[0] + 0.5 * (A.genouP[0] - A.hancheP[0]), yt = Math.min(...coupesX(pat0, xt));
    // Les deux mains à plat l'une sur l'autre ne se lisent pas à cette taille (une main fait 3 px
    // d'épaisseur) : la main loin reste cachée derrière la proche, la vue de dessus montre les deux.
    const a = 4, angles = t => ({ tronc: t, brasP: a, avantbrasP: a, mainP: 90, brasL: a, avantbrasL: a, mainL: 90 });
    const essai = t => F.corps({ x: 0, y: yg, pose: 'genoux-appuie', echelle: e, trait: 'fort', angles: angles(t) });
    const t = bissection(t => essai(t).mainP.y - yt, 20, 80);
    const g0 = essai(t), da = xt + dp - g0.mainP.x;
    const S = [g0.articulations.epauleP[0] + da, g0.articulations.epauleP[1]], W = [g0.articulations.poignetP[0] + da, g0.articulations.poignetP[1]];
    // ses genoux, ses tibias et ses pieds sont derrière le blessé : coupés sous le dessus de la
    // cuisse (sinon le pied dépasse derrière la tête et le tibia double le dos au sol)
    const idc = 'rogne-26-40-aidant';
    const aid = `<clipPath id="${idc}"><rect x="${f(x)}" y="${f(y)}" width="${f(l)}" height="${f(yt + 1 - y)}"/></clipPath>\n<g clip-path="url(#${idc})">\n${deplace(g0, da)}\n</g>`;
    // la flèche du geste : le long des bras, côté tronc, jusqu'au-dessus des mains
    const u = [W[0] - S[0], W[1] - S[1]], lu = Math.hypot(u[0], u[1]), n = [-u[1] / lu, u[0] / lu];
    const off = 10, p0 = [S[0] + u[0] * 0.15 + n[0] * off, S[1] + u[1] * 0.15 + n[1] * off], p1 = [S[0] + u[0] * 0.9 + n[0] * off, S[1] + u[1] * 0.9 + n[1] * off];
    const idv = 'rogne-26-40-vignette';
    return (memo[cle] = { svg: [`<clipPath id="${idv}"><rect x="${f(x)}" y="${f(y)}" width="${f(l)}" height="${f(ht)}"/></clipPath>`,
      `<g clip-path="url(#${idv})">`, aid, deplace(pat0, dp), h.ligne(x + 3, yg, x + l, yg, h.a.detail), '</g>',
      h.rect(x, y, l, ht, h.a.fin), h.geste(`M${pt(p0)} L${pt(p1)}`)].join('\n'),
      bras: [(S[0] + W[0]) / 2, (S[1] + W[1]) / 2], W, mainP: [g0.mainP.x + da, g0.mainP.y], tronc: t });
  };
  // ─── A. Appuyer : vue de dessus, la cuisse de la hanche au genou, la compresse sur la plaie, les
  // deux mains à plat l'une sur l'autre ; en haut, la posture qui met le poids dans les bras tendus.
  const geoA = z => {
    const s = z.l / 50, u0 = -1, cy = z.h - 64;
    const C = cuisseDessus(z, u0, s, cy);
    const P = [C.X(22), cy + 0.3 * s];
    const M = deuxMains(P, s, z);
    return { s, C, P, M, cy, vg: { x: 2, y: 2, l: z.l - 4, h: 119 } };
  };
  const dessinA = z => {
    const g = geoA(z), s = g.s, out = [];
    const v = posture(g.vg.x, g.vg.y, g.vg.l, g.vg.h);
    out.push(v.svg, g.C.dessin);
    out.push(tampon(g.P[0] + PREMIERE[0] * s, g.P[1] + PREMIERE[1] * s, PREMIERE[2] * s, PREMIERE[3] * s, plein(h.a.contour), true));
    out.push(g.M.svg);
    // le point à contrôler : la paume du dessous sur la plaie même
    out.push(h.controle(g.P[0], g.P[1], 3.4 * s));
    return decoupe('a', z, out.join('\n'));
  };

  // ─── B. Le sang traverse : même vue, la première compresse trempée reste, une seule autre par-dessus.
  const geoB = z => {
    const s = z.l / 50, u0 = -1, cy = z.h * 0.5;
    const C = cuisseDessus(z, u0, s, cy);
    const P = [C.X(22), cy + 0.3 * s];
    const M = deuxMains(P, s, z);
    return { s, C, P, M, cy };
  };
  // Un filet de sang qui descend : mince, qui serpente, qui s'amincit ; une goutte au bout ; au sol, la flaque.
  const filet = (x0, y0, y1, amp, ph, w0, w1, flaque) => {
    const N = 28, G = [], D = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, y = y0 + (y1 - y0) * t, xc = x0 + amp * (Math.sin(t * 9 + ph) - Math.sin(ph)) * (0.3 + t);
      const w = w0 + (w1 - w0) * t + (i === 0 ? w0 * 0.6 : 0);
      G.push([xc - w, y]); D.push([xc + w, y]);
    }
    const xe = (G[N][0] + D[N][0]) / 2, r = w1 * 2.1;
    const out = [h.chemin([...G, ...D.reverse()], h.a.plein, true),
      h.path(`M${f(xe - w1)},${f(y1 - 1)} Q${f(xe - r)},${f(y1 + r * 0.6)} ${f(xe)},${f(y1 + r * 1.1)} Q${f(xe + r)},${f(y1 + r * 0.6)} ${f(xe + w1)},${f(y1 - 1)} Z`, h.a.plein)];
    if (flaque) out.push(h.ellipse(xe, y1 + r * 1.1 + flaque * 0.5, flaque * 1.5, flaque * 0.8, h.a.plein));
    return out.join('\n');
  };
  const dessinB = z => {
    const g = geoB(z), s = g.s, C = g.C, out = [C.dessin];
    const [px, py] = g.P;
    // la première, trempée : noire ; le sang passé coule sur la peau vers le côté et tombe au sol
    for (const [dx, amp, ph, k] of [[-1.5, 0.6, 0.4, 2.2], [2.6, 0.5, 2.1, 3.2], [5.6, 0.6, 1.3, 1.4]]) {
      const x0 = px + dx * s, y0 = py + (PREMIERE[1] + PREMIERE[3] / 2 - 0.4) * s, y1 = py + C.hw(x0) + k * s;
      out.push(filet(x0, y0, y1, amp, ph, 1.6, 0.6, 0));
    }
    const T1 = PREMIERE, T2 = SECONDE;
    out.push(tampon(px + T1[0] * s, py + T1[1] * s, T1[2] * s, T1[3] * s, h.a.plein, false));
    out.push(`<g transform="rotate(${T2[4]} ${f(px + T2[0] * s)} ${f(py + T2[1] * s)})">`, tampon(px + T2[0] * s, py + T2[1] * s, T2[2] * s, T2[3] * s, plein(h.a.contour), true), '</g>');
    out.push(g.M.svg);
    return decoupe('b', z, out.join('\n'));
  };

  // ─── C. Plaie profonde, coupe en travers de la cuisse : la gaze tassée au fond au doigt ganté.
  const WC = [[0, 1.9], [0.35, 1.6], [0.7, 1.2], [0.9, 0.7], [1, 0.1]];
  const geoC = z => {
    const s = Math.min(z.l / 27, z.h / 35.5), yg = z.h - 10, cx = z.l * 0.57;
    const rx = 8.5 * s, ry = 7.5 * s, cy = yg - ry + 0.5 * s;
    const ytop = x => cy - ry * Math.sqrt(Math.max(0, 1 - Math.pow((x - cx) / rx, 2)));
    const xm = cx - 1.5 * s, yM = ytop(xm), xB = cx - 1.1 * s, yB = cy - 1 * s;
    const ax = t => xm + (xB - xm) * t, ay = t => yM + (yB - yM) * t;
    const w = (t, c) => s * (lisse(WC, t) + (t > 0.05 && t < 0.9 ? 0.12 * Math.sin(t * 21 + c) : 0));
    const xf = ax(0.3) + 0.25 * s, K = [xf, yM - 3 * s];
    // la vignette : la jambe entière, en petit, avec le trait de coupe sur la cuisse
    const vg = { x: 2, y: 2, l: Math.min(z.l * 0.47, xf - 1.4 * s - 8) };
    // le blessé entier en petit (corps simple couche-dos, trait 1,25 : à cette taille le 1,5 empâte ;
    // ses traits intérieurs restent à 0,5), le trait de coupe à mi-cuisse
    vg.e = (vg.l - 9) / 1820; vg.h = 300 * vg.e + 15; vg.yg = vg.y + vg.h - 5;
    // la main gantée, doigts serrés et tendus, le poignet droit (main simple, pose plat, de profil côté pouce, un peu
    // vue d'en haut comme en 50-40) : le bout des doigts dans la plaie, l'avant-bras qui monte hors du cadre ; le gant
    // et sa manchette viennent du moteur (gant: true)
    const em = s / 10, yTip = ay(0.5);
    const oM = { x: xf, y: yTip, ancre: 'bout', pose: 'plat', vue: 'pouce', cote: 'droite', echelle: em, rotation: [-25, 0, 0], gant: true };
    const vM = [xf + 0.32 * z.h, -z.h];
    const main = F.mainSimple({ ...oM, angle: 104,
      avantbras: { vers: vM, bord: { x0: 0, y0: 0, x1: z.l, y1: z.h }, bras: { pli: 0 } } });
    const geste = [[xf - 3.4 * s, yM - 8.4 * s], [xf - 3.4 * s, yM - 2.7 * s]];
    return { s, em, yg, cx, cy, rx, ry, ytop, xm, yM, ax, ay, w, xf, K: [xf, yM - 3 * s], main, femur: [cx + 1 * s, cy + 2 * s], vg, geste };
  };
  const petitBlesse = vg => {
    const cle = ['pb', vg.x, vg.y, vg.l].join(',');
    if (memo[cle]) return memo[cle];
    const c = F.corps({ x: 0, y: vg.yg, pose: 'couche-dos', echelle: vg.e, trait: 1.25 }), dx = vg.x + (vg.l - (c.boite.x1 - c.boite.x0)) / 2 - c.boite.x0;
    const A = c.articulations, xc0 = A.hancheP[0] + 0.45 * (A.genouP[0] - A.hancheP[0]);
    return (memo[cle] = { svg: deplace(c, dx), xc: xc0 + dx, yh: Math.min(...coupesX(c, xc0)) });
  };
  const dessinC = z => {
    const g = geoC(z), s = g.s, out = [sol(z, g.yg)];
    // la vignette
    const vg = g.vg;
    out.push(h.rect(vg.x, vg.y, vg.l, vg.h, h.a.fin));
    const pb = petitBlesse(vg);
    out.push(pb.svg, h.ligne(vg.x + 3, vg.yg, vg.x + vg.l - 3, vg.yg, h.a.detail));
    const xc = pb.xc, yh = pb.yh;
    out.push(h.path(`M${f(xc - 1.3)},${f(yh + 0.6)} Q${f(xc)},${f(yh - 0.9)} ${f(xc + 1.3)},${f(yh + 0.6)} Z`, h.a.plein));   // la plaie
    out.push(h.path(`M${f(xc)},${f(yh - 6)} L${f(xc)},${f(vg.yg + 2.5)}`, `fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-dasharray="4 2.2"`));
    out.push(h.fleche(`M${f(xc)},${f(yh - 6)} L${f(xc + 6)},${f(yh - 6)}`, h.a.detail));
    out.push(h.fleche(`M${f(xc)},${f(vg.yg + 2.5)} L${f(xc + 6)},${f(vg.yg + 2.5)}`, h.a.detail));
    // la coupe : la chair tramée, le fémur en hachure croisée
    const ovale = (a, b) => { const p = []; for (let i = 0; i <= 120; i++) { const t = i / 120 * 2 * Math.PI; p.push([g.cx + a * Math.cos(t), Math.min(g.cy + b * Math.sin(t), g.yg)]); } return p; };
    out.push(h.chemin(ovale(g.rx, g.ry), h.a.blanc, true));
    out.push(h.chemin(ovale(g.rx, g.ry), h.a.hachure('bois', 'contour'), true));
    out.push(h.ellipse(g.femur[0], g.femur[1], 1.6 * s, 1.4 * s, plein(h.a.arete)));
    out.push(h.ellipse(g.femur[0], g.femur[1], 1.6 * s, 1.4 * s, h.a.hachure('grillage', 'arete')));
    // la plaie : un trou blanc dans la chair
    const T = []; for (let t = 0; t <= 1.0001; t += 0.025) T.push(t);
    const G = t => [g.ax(t) - g.w(t, 0), g.ay(t)], D = t => [g.ax(t) + g.w(t, 2), g.ay(t)];
    const gauche = T.map(G), droite = T.map(D).reverse();
    out.push(h.chemin([[gauche[0][0] - 1, gauche[0][1] - 3], ...gauche, ...droite, [droite[droite.length - 1][0] + 1, droite[droite.length - 1][1] - 3]], h.a.blanc, true));
    out.push(h.chemin([...gauche, ...droite], h.a.arete));
    // la gaze repliée en accordéon, du fond jusqu'à mi-hauteur : un ruban plié d'une paroi à l'autre
    const plis = [];
    const n = 5;
    for (let i = 0; i <= n; i++) {
      const t = 0.97 - i * (0.47 / n), c = i % 2 ? 2 : 0;
      const xa = g.ax(t) - g.w(t, 0) + 0.25 * s, xb = g.ax(t) + g.w(t, 2) - 0.25 * s;
      plis.push(i % 2 ? [xb, g.ay(t)] : [xa, g.ay(t)]);
      plis.push(i % 2 ? [xa, g.ay(t) - 0.12 * s] : [xb, g.ay(t) - 0.12 * s]);
    }
    let d = `M${pt(plis[0])}`;
    for (let i = 1; i < plis.length; i++) {
      const a = plis[i - 1], b = plis[i];
      if (i % 2) d += ` L${pt(b)}`;
      else { const sx = Math.sign(a[0] - g.cx) || 1; d += ` Q${f(a[0] + sx * 0.45 * s)},${f((a[1] + b[1]) / 2)} ${pt(b)}`; }
    }
    out.push(h.path(d, h.a.detail));
    // le ruban remonte le long de la paroi et sort : le bout libre couché sur la peau
    const bd = []; for (let t = 0.5; t >= 0.03; t -= 0.04) bd.push([g.ax(t) - g.w(t, 0) + 0.45 * s, g.ay(t)]);
    const b0 = bd[bd.length - 1], x1 = b0[0] - 1.6 * s, xq = b0[0] - 3.4 * s;
    out.push(h.path(`M${bd.map(pt).join(' L')} Q${f(b0[0])},${f(g.ytop(b0[0]) - 0.9 * s)} ${f(x1)},${f(g.ytop(x1) - 0.3 * s)} Q${f((x1 + xq) / 2)},${f(g.ytop((x1 + xq) / 2) - 0.35 * s)} ${f(xq)},${f(g.ytop(xq) - 0.3 * s)}`, h.a.arete));
    out.push(h.path(`M${f(xq - 0.2 * s)},${f(g.ytop(xq) - 0.9 * s)} L${f(xq + 0.2 * s)},${f(g.ytop(xq) + 0.3 * s)}`, h.a.fin));
    // la main gantée qui pousse
    const r = 0.9 * s;
    out.push(String(g.main));
    const xf = g.xf;
    out.push(h.path(`M${f(xf - r * 0.8)},${f(g.yM - 1.4 * s)} Q${f(xf)},${f(g.yM - 1.05 * s)} ${f(xf + r * 0.8)},${f(g.yM - 1.4 * s)}`, h.a.fin));
    // le geste : les doigts poussent la gaze jusqu'au fond
    out.push(h.geste(`M${pt(g.geste[0])} L${pt(g.geste[1])}`));
    return decoupe('c', z, out.join('\n'));
  };

  // ─── D. Laver : bouteille souple pointe en bas, serrée au poing, jet sur la plaie.
  const geoD = z => {
    const yg = z.h - 10, u0 = -4, s = (z.l - 3) / 104.5;
    const J = jambe(z, u0, s, yg);
    const xw = J.X(24), yw = J.top(xw);
    const aF = -18, axe = tourne([0, -1], aF), nrm = tourne([1, 0], aF), nd = [-axe[0], -axe[1]];
    const C0 = [xw - nd[0] * 6.5 * s, yw - 1 - nd[1] * 6.5 * s];                            // le bout du bouchon
    const W = (u, v) => [C0[0] + (u * axe[0] + v * nrm[0]) * s, C0[1] + (u * axe[1] + v * nrm[1]) * s];   // u, v en cm
    const uG = 17.5, rG = 4.15;                                                                // la main, et la taille pincée
    const P = W(uG, 0);
    const eH = 1.15 * s / 10;                                                                 // la main un peu grossie, pour se lire
    // la main gauche (main simple, prise-grosse : une bouteille de 80 mm se tient en vue du dos), le corps de la
    // bouteille en travers du poing, le bouchon en bas ; l'avant-bras part à droite, le bras remonte du coude hors du
    // cadre (avantbras.bras, plié de 58°)
    const oM = { x: P[0], y: P[1], pose: 'prise-grosse', vue: 'dos', cote: 'gauche', echelle: eH, diametre: 2 * rG * s / eH };
    const vM = [z.l + 40, P[1] - 90];
    const aM = poser(oM, Math.atan2(axe[1], axe[0]) * 180 / Math.PI, vM);
    const main = { o: { ...oM, angle: aM, avantbras: { vers: vM, bord: { x0: 0, y0: 0, x1: z.l, y1: z.h }, bras: { pli: -58 } } } };
    main.geo = F.mainSimple(main.o);
    const R = 0;
    const pouce = main.geo.pouce;                                                              // le bout du pouce
    const jet = { a: W(-0.1, 0), c: W(-3.6, 0.5), b: [xw + 0.5, yw - 1.5] };
    const qj = t => { const m = 1 - t; return [0, 1].map(i => m * m * jet.a[i] + 2 * m * t * jet.c[i] + t * t * jet.b[i]); };
    return { yg, s, J, xw, yw, W, jet, qj, main, pouce, axe, nrm, uG, rG, R, eH };
  };
  const sousNiveau = (poly, y0) => {
    const out = [];
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length], ia = a[1] >= y0, ib = b[1] >= y0;
      if (ia) out.push(a);
      if (ia !== ib) { const t = (y0 - a[1]) / (b[1] - a[1]); out.push([a[0] + (b[0] - a[0]) * t, y0]); }
    }
    return out;
  };
  // Le profil de la bouteille, bouchon en bas : u depuis le bout du bouchon (cm), demi-largeur.
  const BOUT = [[0, 1.2], [0.4, 1.9], [2.9, 1.95], [3.2, 1.45], [3.9, 1.5], [4.6, 2.2], [6, 3.6], [7.6, 4.5], [9.2, 4.8], [12, 4.72], [17.5, 4.0], [22.8, 4.72], [24.5, 4.8], [28.4, 4.8]];
  const LB = 30;
  const dessinD = z => {
    const g = geoD(z), s = g.s, W = g.W, out = [g.J.dessin];
    const x = g.xw, y = g.yw, yg = g.yg;
    // l'eau qui descend le flanc et fait une flaque au pied de la cuisse
    for (const [d0, d1, lg] of [[-1.2, -4.2, 1], [-0.2, -1, 0.62], [0.6, 1.4, 1], [1.4, 4.6, 0.8]]) {
      const x0 = x + d0 * s, y0 = y + 0.9 * s, y1 = y0 + (yg - 1.2 * s - y0) * lg, x1 = x + d1 * s;
      out.push(h.path(`M${f(x0)},${f(y0)} C${f(x0 + (x1 - x0) * 0.1 + 0.9 * s)},${f(y0 + (y1 - y0) * 0.35)} ${f(x1 - 0.9 * s)},${f(y0 + (y1 - y0) * 0.65)} ${f(x1)},${f(y1)}`, h.a.detail));
      out.push(h.path(`M${f(x1 - 0.45 * s)},${f(y1 + 0.2 * s)} Q${f(x1)},${f(y1 - 0.8 * s)} ${f(x1 + 0.45 * s)},${f(y1 + 0.2 * s)} A${f(0.45 * s)} ${f(0.45 * s)} 0 0 1 ${f(x1 - 0.45 * s)},${f(y1 + 0.2 * s)} Z`, h.a.plein));
    }
    out.push(h.path(`M${f(x - 9 * s)},${f(yg)} Q${f(x)},${f(yg - 2 * s)} ${f(x + 10 * s)},${f(yg)} Z`, h.a.hachure('eau', 'detail')));
    // la plaie et la saleté
    out.push(h.path(`M${f(x - 2.2 * s)},${f(y + 0.9 * s)} Q${f(x)},${f(y - 0.7 * s)} ${f(x + 2.2 * s)},${f(y - 0.3 * s)} Q${f(x)},${f(y + 0.9 * s)} ${f(x - 2.2 * s)},${f(y + 0.9 * s)} Z`, h.a.plein));
    for (const [dx, dy] of [[-3.4, 1.8], [3.3, 1.2], [-1.2, 2.6], [1.8, 2.4], [4.4, 3]]) out.push(h.cercle(x + dx * s, y + dy * s, 0.28 * s, h.a.plein));
    const i0B = out.length;
    // la bouteille : le corps pincé sous la main, l'épaule, le goulot, le bouchon
    const cote = sg => { const p = []; for (let u = 0.4; u <= 28.4 + 1e-6; u += 0.4) p.push(W(u, sg * lisse(BOUT, u))); return p; };
    const coin = sg => { const p = []; for (let i = 0; i <= 6; i++) { const a = Math.PI / 2 * i / 6; p.push(W(28.4 + 1.6 * Math.sin(a), sg * (3.2 + 1.6 * Math.cos(a)))); } return p; };
    const corps = [W(0, -1.2), ...cote(-1), ...coin(-1), ...coin(1).reverse(), ...cote(1).reverse(), W(0, 1.2)];
    out.push(h.chemin(corps, plein(h.a.contour), true));
    const yn = W(25.5, 0)[1];
    const eau = sousNiveau(corps, yn);
    out.push(h.chemin(eau, h.a.hachure('eau', 'aucun'), true));
    const surf = eau.filter(p => Math.abs(p[1] - yn) < 0.01).map(p => p[0]).sort((a, b) => a - b);
    if (surf.length >= 2) out.push(h.ligne(surf[0], yn, surf[surf.length - 1], yn, h.a.detail));
    out.push(h.chemin(corps, h.a.contour, true));
    // le bouchon : une bague, et le trou au bout
    out.push(h.path(`M${pt(W(3.05, -1.95))} L${pt(W(3.05, 1.95))}`, h.a.detail));
    out.push(h.path(`M${pt(W(2.5, -1.9))} L${pt(W(2.5, 1.9))}`, h.a.fin));
    out.push(h.cercle(...W(0, 0), 0.35 * s, h.a.plein));
    // la main qui serre : la bouteille passe dans la main, peinte entre ses couches (les doigts devant)
    const bouteille = out.splice(i0B).join('\n');
    out.push(F.mainSimple({ ...g.main.o, objet: bouteille }).svg);
    // le geste : serrer le poing sur la bouteille souple
    out.push(h.geste(`M${pt(W(20.2, -10.6))} L${pt(W(20.2, -6.3))}`));
    // (le poing du modèle ne creuse pas la paroi : plus de plis de plastique sous le pouce)
    // le jet et ses éclaboussures
    out.push(h.path(`M${pt(g.jet.a)} Q${pt(g.jet.c)} ${pt(g.jet.b)}`, h.a.arete));
    for (const [dx, dy] of [[-1.8, -1.4], [1.6, -1.7], [-2.9, -0.6], [2.7, -0.7]]) out.push(h.cercle(g.jet.b[0] + dx * s, g.jet.b[1] + dy * s, 0.25 * s, h.a.plein));
    return decoupe('d', z, out.join('\n'));
  };

  // ─── E. Sans bouteille : le sac plein d'eau, le cou tordu au poing, le trou d'épingle en bas,
  // le jet sur la plaie de la cuisse.
  const geoE = z => {
    const yg = z.h - 10, s = Math.min(z.l / 64, 3.6), u0 = -2;
    const X = u => (u - u0) * s, Y = v => yg - v * s;
    const top = x => Y(lisse(HAUT, u0 + x / s));
    const xw = X(22), yw = top(xw);
    const Wd = 10 * s, cx = xw + 4.8 * s + 0.78 * Wd, yb = yw - 7.6 * s;
    const yn = yb - 19.5 * s, yt = yn - 4.4 * s, yF = yt - 5.6 * s;
    const oS0 = { x: cx, y: yF - 0.6 * s, pose: 'prise-manche', vue: 'paume', cote: 'gauche', echelle: 1.15 * s / 10, diametre: 22, rotation: [-25, 0, 0] };
    const vS = [z.l + 60, yF - 50], bord = { x0: 0, y0: 0, x1: z.l, y1: z.h };
    const oS = { ...oS0, angle: poser(oS0, 90, vS), avantbras: { vers: vS, bord, bras: { pli: 0 } } };
    return { s, yg, X, Y, top, xw, yw, cx, yn, yb, Wd, yt, yF, oS, trou: [cx - Wd * 0.8, yb - 0.3 * s] };
  };
  const dessinE = z => {
    const g = geoE(z), s = g.s, cx = g.cx, yn = g.yn, yb = g.yb, Wd = g.Wd, yt = g.yt, out = [sol(z, g.yg)];
    // la cuisse, posée au sol, et la plaie sous le jet
    const hp = [], bp = [];
    for (let x = 0; x < z.l; x += 1.5) { hp.push([x, g.top(x)]); bp.push([x, g.Y(lisse(BASC, -2 + x / s))]); }
    hp.push([z.l, g.top(z.l)]); bp.push([z.l, g.Y(lisse(BASC, -2 + z.l / s))]);
    out.push(h.chemin([...hp, ...bp.slice().reverse()], h.a.blanc, true), h.chemin(hp, CORPS), h.chemin(bp, CORPS));
    const x = g.xw, y = g.yw;
    out.push(h.path(`M${f(x - 2.2 * s)},${f(y + 0.9 * s)} Q${f(x)},${f(y - 0.7 * s)} ${f(x + 2.2 * s)},${f(y - 0.3 * s)} Q${f(x)},${f(y + 0.9 * s)} ${f(x - 2.2 * s)},${f(y + 0.9 * s)} Z`, h.a.plein));
    for (const [dx, dy] of [[-3.4, 1.8], [3.3, 1.2], [-1.2, 2.6], [1.8, 2.4]]) out.push(h.cercle(x + dx * s, y + dy * s, 0.28 * s, h.a.plein));
    // le sac : étroit au cou, lourd et rond en bas, plein d'eau
    const sac = `M${f(cx - 1.5 * s)},${f(yn)} C${f(cx - 2.5 * s)},${f(yn + 5 * s)} ${f(cx - Wd)},${f(yn + 7 * s)} ${f(cx - Wd)},${f(yn + 13 * s)} ` +
      `Q${f(cx - Wd)},${f(yb)} ${f(cx)},${f(yb + 0.4 * s)} ` +
      `Q${f(cx + Wd)},${f(yb)} ${f(cx + Wd)},${f(yn + 13 * s)} ` +
      `C${f(cx + Wd)},${f(yn + 7 * s)} ${f(cx + 2.5 * s)},${f(yn + 5 * s)} ${f(cx + 1.5 * s)},${f(yn)} Z`;
    out.push(h.path(sac, h.a.hachure('eau', 'contour')));
    out.push(h.path(`M${f(cx - 0.8 * s)},${f(yn + 1 * s)} Q${f(cx - 3 * s)},${f(yn + 6 * s)} ${f(cx - 6 * s)},${f(yn + 10.5 * s)}`, h.a.detail));
    out.push(h.path(`M${f(cx + 0.8 * s)},${f(yn + 1 * s)} Q${f(cx + 2.5 * s)},${f(yn + 5 * s)} ${f(cx + 4.6 * s)},${f(yn + 8.6 * s)}`, h.a.detail));
    // le cou tordu, du sac jusqu'au poing, et la touffe de plastique qui dépasse au-dessus : l'objet que la main tient
    const i0 = out.length;
    const yH = g.yF - 6.8 * s;
    const cou = `M${f(cx - 1.5 * s)},${f(yn + 0.3 * s)} L${f(cx - 1.1 * s)},${f(g.yF)} L${f(cx + 1.1 * s)},${f(g.yF)} L${f(cx + 1.5 * s)},${f(yn + 0.3 * s)} Z`;
    // la face à l'ombre du cou tordu (lumière d'en haut à gauche) : l'aplat d'abord, le trait par-dessus
    out.push(h.path(cou, h.a.blanc), h.path(`M${f(cx + 0.5 * s)},${f(yn + 0.3 * s)} L${f(cx + 0.35 * s)},${f(g.yF)} L${f(cx + 1.1 * s)},${f(g.yF)} L${f(cx + 1.5 * s)},${f(yn + 0.3 * s)} Z`, h.a.ombre), h.path(cou, h.a.arete));
    for (let i = 0; i < 5; i++) { const yy = yn - 0.2 * s - i * 1 * s; out.push(h.path(`M${f(cx - 1.3 * s)},${f(yy)} Q${f(cx)},${f(yy - 0.1 * s)} ${f(cx + 1.3 * s)},${f(yy - 0.9 * s)}`, h.a.detail)); }
    out.push(h.path(`M${f(cx - 1 * s)},${f(g.yF)} L${f(cx - 1 * s)},${f(yH)} Q${f(cx - 2.6 * s)},${f(yH - 1 * s)} ${f(cx - 1.8 * s)},${f(yH - 2.3 * s)} Q${f(cx - 0.8 * s)},${f(yH - 1.5 * s)} ${f(cx - 0.2 * s)},${f(yH - 2.6 * s)} Q${f(cx + 1.3 * s)},${f(yH - 2.1 * s)} ${f(cx + 1.5 * s)},${f(yH - 0.9 * s)} L${f(cx + 1 * s)},${f(yH)} L${f(cx + 1 * s)},${f(g.yF)} Z`, plein(h.a.arete)));
    out.push(h.path(`M${f(cx - 1.2 * s)},${f(yH - 1.6 * s)} Q${f(cx - 0.4 * s)},${f(yH - 0.8 * s)} ${f(cx + 0.2 * s)},${f(yH + 0.2 * s)}`, h.a.fin));
    const objet = out.splice(i0).join('\n');
    // le poing fermé sur le cou tordu (main simple, prise-manche vue de la paume, penchée de 25° comme en 104-40 :
    // les doigts en travers du cou), main gauche ; l'avant-bras remonte à droite hors du cadre ; la touffe dépasse
    // au-dessus du poing
    out.push(F.mainSimple({ ...g.oS, objet }).svg);
    // tordre : la flèche passe devant le cou
    const ya = (yn + yt) / 2 + 0.3 * s;
    out.push(h.geste(`M${f(cx - 4.4 * s)},${f(ya - 0.5 * s)} A${f(4.4 * s)} ${f(1.5 * s)} 0 0 0 ${f(cx + 4.2 * s)},${f(ya - 0.9 * s)}`));
    // le trou d'épingle, sous l'eau, et le jet jusqu'à la plaie
    const t = g.trou;
    out.push(h.cercle(t[0], t[1], 0.45 * s, h.a.plein));
    out.push(h.path(`M${f(t[0] - 0.3 * s)},${f(t[1] + 0.3 * s)} Q${f(t[0] - 3.2 * s)},${f(t[1] + 1.6 * s)} ${f(g.xw + 0.3 * s)},${f(g.yw - 0.6 * s)}`, h.a.arete));
    for (const [dx, dy] of [[-1.6, -1.3], [1.5, -1.5], [-2.6, -0.5]]) out.push(h.cercle(g.xw + dx * s, g.yw + dy * s, 0.25 * s, h.a.plein));
    return decoupe('e', z, out.join('\n'));
  };

  return {
    ref: '26-40',
    titre: 'Appuyer sur la plaie, puis la laver',
    desc: 'Cinq gestes. Appuyer : en vignette, le blessé couché sur le dos et celui qui appuie à genoux de l’autre côté de lui, à hauteur de la hanche, penché, les bras tendus droit, les épaules à l’aplomb des mains posées à plat sur la cuisse, une flèche rouge le long des bras vers le bas ; dessous, la cuisse vue de dessus, de la hanche au genou, une compresse sur la plaie et les deux mains à plat l’une sur l’autre, doigts vers le genou, la main du dessous en gris, un cercle rouge sur la paume posée sur la plaie. Quand le sang traverse : même vue, la première compresse trempée, noire, reste en place, une seule autre par-dessus, posée de travers, les mains qui appuient plus fort ; le sang passé coule sur la peau vers le côté. Une plaie profonde de cuisse en coupe, repérée sur un petit blessé couché : la chair tramée, le fémur en hachure croisée, la gaze repliée en accordéon tassée jusqu’au fond par la main gantée, doigts serrés et tendus dans la plaie, une flèche rouge vers le fond, son bout libre couché sur la peau. Laver : une bouteille souple tenue bouchon en bas, serrée au poing, une flèche rouge contre les doigts, le jet sur la plaie, l’eau sale qui descend le flanc jusqu’au sol. Sans bouteille : un sac de plastique plein d’eau tenu au poing par le cou tordu, une flèche rouge autour du cou, le jet qui sort d’un trou d’épingle dans le coin du bas et tombe sur la plaie de la cuisse.',
    format: 'pleine',
    disposition: [['appuyer', 'traverse', 'bourrer'], ['laver', 'sac']],
    largeurs: [[1, 1, 1], [3, 2]],
    vues: {
      appuyer: {
        titre: 'Appuyer',
        dessin: dessinA,
        renvois: z => {
          const g = geoA(z), v = posture(g.vg.x, g.vg.y, g.vg.l, g.vg.h);
          const paume = g.M.paume;
          return [
            { n: 1, rond: [12, g.cy + 13 * g.s], cible: paume, texte: 'la paume sur la plaie même' },
            { n: 2, rond: [z.l - 12, g.vg.y + g.vg.h + 12], cible: v.bras, texte: 'bras tendus : tout son poids' },
          ];
        },
      },
      traverse: {
        titre: 'Le sang traverse',
        dessin: dessinB,
        renvois: z => {
          const g = geoB(z), s = g.s, [px, py] = g.P;
          return [
            { n: 3, rond: [14, py + 15 * s], cible: [px - 6.6 * s, py + 6.4 * s], texte: 'la première reste en place' },
            { n: 4, rond: [z.l - 12, py - 9 * s], cible: [px + 12.3 * s, py + 0.6 * s], texte: 'une seule autre par-dessus' },
            { n: 5, rond: [12, py - 14 * s], cible: [g.M.dessus.prise.x, g.M.dessus.prise.y], texte: 'appuyer plus fort' },
          ];
        },
      },
      bourrer: {
        titre: 'Plaie profonde',
        dessin: dessinC,
        renvois: z => {
          const g = geoC(z), s = g.s;
          return [
            { n: 6, rond: [12, g.yM - 1.4 * s], cible: [g.xf - 0.9 * s, g.yM - 1.8 * s], texte: 'au doigt ganté' },
            { n: 7, rond: [z.l - 11, g.yM - 1.5 * s], cible: [g.xm + 2.6 * s, g.ytop(g.xm + 2.6 * s) + 0.3], texte: 'trou plein, puis appuyer' },
            { n: 8, rond: [z.l - 11, g.cy + 3.6 * s], cible: [g.ax(0.8), g.ay(0.8)], texte: 'gaze tassée jusqu’au fond' },
          ];
        },
      },
      laver: {
        titre: 'Laver',
        dessin: dessinD,
        renvois: z => {
          const g = geoD(z), s = g.s, W = g.W;
          const pc = W(0, 0), pj = g.qj(0.5), pe = W(8.5, -2.2);
          return [
            { n: 9, rond: [pc[0] + 13 * s, pc[1] - 3 * s], cible: [pc[0] + 0.4 * s, pc[1]], texte: 'percée au clou chauffé' },
            { n: 10, rond: [14, pj[1] + 1 * s], cible: pj, texte: 'le jet décolle, sans frotter' },
            { n: 11, rond: [14, pe[1] - 4 * s], cible: pe, texte: 'eau bouillie, puis refroidie' },
            { n: 12, rond: [14, 18], cible: g.pouce, texte: 'presser la bouteille souple' },
            { n: 13, rond: [g.xw + 19 * s, g.yg - 11 * s], cible: [g.xw + 1.2 * s, g.yw + 6 * s], texte: 'tant qu’on voit de la saleté' },
          ];
        },
      },
      sac: {
        titre: 'Sans bouteille',
        dessin: dessinE,
        renvois: z => {
          const g = geoE(z), s = g.s;
          return [
            { n: 14, rond: [z.l - 12, g.yn - 5.4 * s], cible: [g.cx + 1.2 * s, g.yn - 2.9 * s], texte: 'le cou tordu pousse l’eau' },
            { n: 15, rond: [z.l - 12, g.yn + 15 * s], cible: [g.cx + g.Wd, g.yn + 13 * s], texte: 'sac de plastique épais' },
            { n: 16, rond: [14, g.yb - 8 * s], cible: g.trou, texte: 'trou d’épingle' },
          ];
        },
      },
    },
    danger: 'Danger — chaque coup d’œil sous la compresse défait le caillot qui commençait. Compter à voix haute au moins cinq minutes pleines avant de regarder, et compter large : sous stress, on compte trop vite.',
  };
};
