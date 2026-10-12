// Planche 34-01 — Ouvrir un abcès mûr.
// Chapitre 34, étapes 24 et 25 et « Ouvrir un abcès avec ce qu'il y a » ; le geste lui-même est
// au ch. 28, étape 54, auquel le ch. 34 renvoie : tenir la bosse entre le pouce et l'index de
// l'autre main ; la lame perpendiculaire à la peau ; un seul trait franc dans le grand axe, au
// centre mou, assez long pour y entrer un doigt ; le doigt ganté ou lavé au savon défait les
// cloisons, il doit rester une seule poche ; s'il sent battre au fond ou touche l'os, il ressort ;
// rincer à grande eau au jet de bouteille souple percée au clou chauffé, eau bouillie salée à
// 9 g par litre. Là où l'on n'ouvre pas : le devant et les côtés du cou, le triangle du milieu du
// visage (entre les coins de la bouche et la racine du nez), la main, le tour de l'anus, le sein,
// le pli de l'aine, sur un os ou une articulation.
// Aucune cote : rien ne se construit ici, et le chapitre ne donne pas de mesure de l'incision.
// Les coupes sont des coupes de principe, en mm d'adulte mis à l'échelle s (px/mm).
module.exports = (h) => {
  const F = h.formes._interne;
  const f = v => (+v).toFixed(1);
  const BL = h.a.blanc;
  const plein = t => t.replace('fill="none"', h.a.blanc.split(' ')[0]);
  const trait = (ep, extra = '') => `fill="none" stroke="#1a1a1a" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"${extra}`;

  // Catmull-Rom : une courbe lisse qui passe par chaque point
  const cr = (P, ferme = false) => {
    const n = P.length, q = i => ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f(P[0][0])} ${f(P[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = q(i - 1), p1 = q(i), p2 = q(i + 1), p3 = q(i + 2);
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  // hachure maison, serrée : pour les petites zones du corps et du visage
  const hachure = (poly, pas = 2.4, angle = 45, ep = 0.5) => {
    const a = angle * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    const R = poly.map(([x, y]) => [x * c + y * s, -x * s + y * c]);
    const ys = R.map(p => p[1]), y0 = Math.min(...ys), y1 = Math.max(...ys);
    let d = '';
    for (let y = y0 + pas / 2; y < y1; y += pas) {
      const xs = [];
      for (let i = 0; i < R.length; i++) {
        const p = R[i], q = R[(i + 1) % R.length];
        if ((p[1] <= y) !== (q[1] <= y)) xs.push(p[0] + (q[0] - p[0]) * (y - p[1]) / (q[1] - p[1]));
      }
      xs.sort((u, v) => u - v);
      for (let k = 0; k + 1 < xs.length; k += 2) {
        const A = [xs[k] * c - y * s, xs[k] * s + y * c], B = [xs[k + 1] * c - y * s, xs[k + 1] * s + y * c];
        d += `M${f(A[0])} ${f(A[1])}L${f(B[0])} ${f(B[1])}`;
      }
    }
    return d ? h.path(d, trait(ep)) : '';
  };
  // garde la partie d'un polygone sous (y > y0) une ligne horizontale
  const sousNiveau = (poly, y0) => {
    const out = [];
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length], ia = a[1] >= y0, ib = b[1] >= y0;
      if (ia) out.push(a);
      if (ia !== ib) { const t = (y0 - a[1]) / (b[1] - a[1]); out.push([a[0] + (b[0] - a[0]) * t, y0]); }
    }
    return out;
  };
  // gros plan : ce qui sort du cadre de la vue (le manche, la main, la bouteille) y est coupé net
  const cadre = (id, z, svg) => `<clipPath id="plan-34-${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#plan-34-${id})">\n${svg}\n</g>`;
  const ellipsePts = (cx, cy, rx, ry, n = 36) => Array.from({ length: n }, (_, i) => [cx + rx * Math.cos(2 * Math.PI * i / n), cy + ry * Math.sin(2 * Math.PI * i / n)]);
  const range = (a, b, n) => Array.from({ length: n + 1 }, (_, i) => a + (b - a) * i / n);

  // ─── La coupe de principe, dans le grand axe. u : mm depuis le centre ; v : mm sous la peau saine.
  const PK = { R: 22, c: 7, hh: 8.5, p: 2.4 };        // la poche : demi-longueur, milieu, demi-hauteur
  const G = 9.5;                                      // la demi-longueur du trait
  const CL = [-12, 12.5];                             // les deux cloisons
  const ep = t => Math.pow(Math.max(0, 1 - Math.pow(Math.abs(t), PK.p)), 1 / PK.p);
  const pTop = u => PK.c - PK.hh * ep(u / PK.R), pBot = u => PK.c + PK.hh * ep(u / PK.R);
  const softmin = (a, b, k = 0.9) => -k * Math.log(Math.exp(-a / k) + Math.exp(-b / k));
  const inner = u => Math.abs(u) < PK.R ? softmin(2, pTop(u) - 0.9) : softmin(2, 50);
  const peau = u => inner(u) - 2;
  const poche = (u1 = -PK.R, u2 = PK.R, n = 40) => {
    const us = range(u1, u2, n);
    return [...us.map(u => [u, pTop(u)]), ...us.slice().reverse().map(u => [u, pBot(u)])];
  };
  const cloison = (uc, sgn) => [[uc, pTop(uc) + 0.3], [uc + 0.8 * sgn, pTop(uc) + 4.5], [uc - 0.5 * sgn, PK.c + 1.5], [uc + 0.6 * sgn, pBot(uc) - 3.5], [uc, pBot(uc) - 0.3]];

  // o : { s, ox, oy, uL, uR, vB, ouvert, contenu: 'pus'|'loges'|'vide'|'eau', cloisons: 'entieres'|'cassees'|null }
  const coupe = o => {
    const s = o.s, P = (u, v) => [o.ox + u * s, o.oy + v * s];
    const out = [];
    const us = range(o.uL, o.uR, 80);
    // la chair : hachure fine, bord bas en ligne de rupture
    const bas = us.slice().reverse().map((u, i) => [u, o.vB + 0.9 * Math.sin(i * 0.9) + 0.5 * Math.sin(i * 2.3)]);
    const chair = [...us.map(u => [u, inner(u)]), ...bas].map(p => P(...p));
    out.push(hachure(chair, 4.2, 45, 0.5));
    // la poche et, si le trait est fait, le canal jusqu'à la peau
    const PO = poche().map(p => P(...p));
    out.push(h.path(cr(PO, true), BL));
    if (o.ouvert) {
      const canal = [...range(-G, G, 12).map(u => [u, peau(u) - 0.5]), ...range(G, -G, 12).map(u => [u, pTop(u) + 0.5])].map(p => P(...p));
      out.push(h.chemin(canal, BL, true));
    }
    // le contenu
    const L1 = poche(-PK.R, CL[0]).map(p => P(...p)), L2 = poche(CL[0], CL[1]).map(p => P(...p)), L3 = poche(CL[1], PK.R).map(p => P(...p));
    if (o.contenu === 'pus') out.push(h.path(cr(PO, true), h.a.hachure('neige', 'aucun')));
    if (o.contenu === 'loges') {
      out.push(h.chemin(L1, h.a.hachure('neige', 'aucun'), true), h.chemin(L3, h.a.hachure('neige', 'aucun'), true));
      const reste = sousNiveau(L2, P(0, PK.c + 3.2)[1]);
      out.push(h.chemin(reste, h.a.hachure('neige', 'aucun'), true));
      out.push(h.ligne(reste.reduce((m, p) => Math.min(m, p[0]), 1e9) + 1, P(0, PK.c + 3.2)[1], reste.reduce((m, p) => Math.max(m, p[0]), -1e9) - 1, P(0, PK.c + 3.2)[1], h.a.fin));
    }
    if (o.contenu === 'eau') {
      out.push(h.path(cr(PO, true), h.a.hachure('eau', 'aucun')));
      const canal = [...range(-G, G, 12).map(u => [u, peau(u) + 0.6]), ...range(G, -G, 12).map(u => [u, pTop(u) + 0.5])].map(p => P(...p));
      out.push(h.chemin(canal, h.a.hachure('eau', 'aucun'), true));
    }
    // la peau : bande blanche, surface en arête, face interne en trait fin
    const morceaux = o.ouvert ? [[o.uL, -G], [G, o.uR]] : [[o.uL, o.uR]];
    for (const [a, b] of morceaux) {
      const ub = range(a, b, 50);
      const top = ub.map(u => P(u, peau(u))), inn = ub.map(u => P(u, inner(u)));
      out.push(h.chemin([...top, ...inn.slice().reverse()], BL, true));
      out.push(h.path(cr(top), h.a.arete));
      out.push(h.path(cr(inn), h.a.fin));
    }
    if (o.ouvert) for (const u of [-G, G]) out.push(h.ligne(...P(u, peau(u)), ...P(u, pTop(u) + 0.2), h.a.detail));
    // la paroi de la poche (ouverte en haut si le trait est fait)
    if (o.ouvert) {
      const ub = range(G, PK.R, 16), ua = range(-PK.R, -G, 16);
      const paroi = [...ub.map(u => [u, pTop(u)]), ...range(PK.R, -PK.R, 60).map(u => [u, pBot(u)]), ...ua.map(u => [u, pTop(u)])];
      out.push(h.path(cr(paroi.map(p => P(...p))), h.a.arete));
    } else out.push(h.path(cr(PO, true), h.a.arete));
    // les cloisons
    if (o.cloisons === 'entieres') CL.forEach((uc, i) => out.push(h.path(cr(cloison(uc, i ? 1 : -1).map(p => P(...p))), h.a.detail)));
    if (o.cloisons === 'cassees') CL.forEach((uc, i) => {
      const c = cloison(uc, i ? 1 : -1).map(p => P(...p));
      out.push(h.path(cr(c.slice(0, 2)), h.a.detail), h.path(cr(c.slice(3)), h.a.detail));
    });
    return { svg: out.join('\n'), P };
  };
  // la même échelle pour les trois coupes : elle se règle sur la plus petite
  const echelle = z => Math.min((z.h - 8) / 42, (z.l - 20) / 70);

  // ─── Vu de dessus : la bosse, le trait dans le grand axe, le pouce et l'index de l'autre main
  const geoDessus = z => {
    const s = Math.min(z.h / 58, z.l / 118), cx = z.l - 42 * s, cy = z.h / 2;
    const P = (u, v) => [cx + u * s, cy + v * s];
    return { s, cx, cy, P };
  };
  const dessinDessus = z => {
    const g = geoDessus(z), s = g.s, P = g.P, out = [];
    // la rougeur, la poche qu'on sent sous les doigts, le grand axe
    out.push(h.path(cr(ellipsePts(0, 0, 30, 20).map(p => P(...p)), true), trait(0.5, ' stroke-dasharray="1.5 2.5"')));
    out.push(h.path(cr(ellipsePts(0, 0, PK.R, 14).map(p => P(...p)), true), h.a.detail));
    out.push(h.ligne(...P(-38, 0), ...P(38, 0), trait(0.5, ' stroke-dasharray="10 3 2 3"')));
    // le trait de lame : une fente noire en fuseau
    const fente = [...range(-G, G, 16).map(u => [u, -0.9 * Math.sqrt(1 - (u / G) ** 2)]), ...range(G, -G, 16).map(u => [u, 0.9 * Math.sqrt(1 - (u / G) ** 2)])];
    out.push(h.chemin(fente.map(p => P(...p)), h.a.plein, true));
    // la main, vue du dos : l'index au-dessus de la bosse, le pouce en dessous, la palmure entre
    const T = F.repere({ x: g.cx, y: g.cy, echelle: s });
    const dir = a => [Math.cos(a * Math.PI / 180), Math.sin(a * Math.PI / 180)];
    const chaine = (bout, angles, L) => {      // du bout vers la base, puis renversée
      const pts = [bout];
      for (let i = 0; i < L.length; i++) { const d = dir(angles[i]); const p = pts[pts.length - 1]; pts.push([p[0] - d[0] * L[i], p[1] - d[1] * L[i]]); }
      return pts.reverse();
    };
    const ptsI = chaine([-3, -21], [14, 17, 20], [19, 25, 43]);
    const ptsP = chaine([-3, 21], [-28, -32, -36], [23, 30, 44]);
    const fw = e => [[e[0] / 2, e[1] / 2], [e[1] / 2, e[2] / 2], [e[2] / 2, e[3] / 2]];
    const index = F.tube({ pts: ptsI, dos: fw([19, 16.2, 14.2, 12.2]), ventre: fw([19, 16.2, 14.2, 12.2]), coussin: [-0.15, -0.1, 0.15], bosseDos: [-0.15, -0.1, 0.15], bout: 'rond', ongle: 'dessus' });
    const pw = [[12.5, 11], [11, 10.5], [10.5, 8.2]];
    const pouce = F.tube({ pts: ptsP, sens: 1, dos: pw, ventre: pw, coussin: [0, -0.3, 0.3], bosseDos: [0, -0.3, 0.3], bout: 'rond', ongle: 'dessus' });
    out.push(F.peindre([pouce, index], T));
    return cadre('dessus', z, out.join('\n'));
  };

  // ─── Le trait, en coupe dans le grand axe : la lame debout, le trait à faire
  const geoTrait = z => {
    const s = echelle(z), ox = z.l / 2 + 4 * s, oy = z.h - 20 * s;
    return { s, ox, oy, uL: -(ox - 2) / s, uR: (z.l - ox - 2) / s, vB: 17.5 };
  };
  const dessinTrait = z => {
    const g = geoTrait(z), s = g.s;
    const c = coupe({ ...g, contenu: 'pus', cloisons: 'entieres' }), P = c.P, out = [c.svg];
    // la lame : pointe dans la poche au bout gauche du trait, tranchant vers la droite, manche en haut
    const ut = -G, vt = pTop(ut) + 3.2;
    const LB = 17;                                    // la lame visible, de la pointe au manche
    const lame = [[ut, vt], [ut + 1.1, vt - 2.6], [ut + 3.6, vt - 7], [ut + 4.2, vt - 10.5], [ut + 4.2, vt - LB]];
    out.push(h.path(cr(lame.map(p => P(...p))) + ` L${P(ut - 1.2, vt - LB).map(f).join(' ')} L${P(ut - 1.2, vt - 2).map(f).join(' ')} Q${P(ut - 1.2, vt).map(f).join(' ')} ${P(ut, vt).map(f).join(' ')} Z`, plein(h.a.arete)));
    out.push(h.path(`M${P(ut - 0.1, vt - 3.4).map(f).join(' ')} L${P(ut + 3, vt - 10).map(f).join(' ')} L${P(ut + 3, vt - LB + 0.6).map(f).join(' ')}`, h.a.fin));   // le biseau du fil
    const manche = [[ut - 2.4, vt - LB], [ut + 5.6, vt - LB], [ut + 5.6, vt - LB - 40], [ut - 2.4, vt - LB - 40]];
    out.push(h.chemin(manche.map(p => P(...p)), h.a.hachure('bois', 'arete'), true));
    // le trait à faire : la flèche suit la peau jusqu'au bout du trait, qu'un cran marque
    const fl = range(ut + 7, G, 12).map(u => P(u, peau(u) - 2.6));
    out.push(h.fleche(cr(fl), h.a.arete));
    out.push(h.ligne(...P(G, peau(G) - 1.2), ...P(G, peau(G) + 1.2), h.a.arete));
    return cadre('trait', z, out.join('\n'));
  };

  // ─── Des loges : le trait fait, seule la loge du milieu se vide
  const dessinLoges = z => {
    const s = echelle(z), ox = z.l / 2, oy = z.h - 20 * s;
    const c = coupe({ s, ox, oy, uL: -(ox - 2) / s, uR: (z.l - ox - 2) / s, vB: 17.5, ouvert: true, contenu: 'loges', cloisons: 'entieres' });
    const P = c.P, out = [c.svg];
    // le pus de la loge du milieu monte par le trait, déborde de la lèvre droite et coule sur la peau
    const coulee = [[G - 1.2, pTop(G) + 0.4], [G - 1.6, peau(G) - 0.6], [G - 0.6, peau(G) - 2], [G + 2, peau(G + 2) - 2], [G + 5, peau(G + 5) - 1.6],
      [G + 9, peau(G + 9) - 1.1], [G + 13, peau(G + 13) - 0.9], [G + 17, peau(G + 17) - 0.6], [G + 20, peau(G + 20)], ...range(G + 19.5, G + 0.2, 8).map(u => [u, peau(u)]), [G + 0.2, pTop(G) + 0.4]].map(p => P(...p));
    out.push(h.path(cr(coulee, true), h.a.hachure('neige', 'detail')));
    out.push(h.fleche(`M${P(-1, PK.c + 2.4).map(f).join(' ')} L${P(-1, peau(0) - 3.5).map(f).join(' ')}`, h.a.arete));
    return cadre('loges', z, out.join('\n'));
  };

  // ─── Le doigt défait les cloisons
  const geoDoigt = z => {
    const s = echelle(z), ox = z.l / 2 - 6 * s, oy = z.h - 20 * s;
    return { s, ox, oy };
  };
  const dessinDoigt = z => {
    const g = geoDoigt(z), s = g.s;
    const c = coupe({ s, ox: g.ox, oy: g.oy, uL: -(g.ox - 2) / s, uR: (z.l - g.ox - 2) / s, vB: 17.5, ouvert: true, contenu: 'vide', cloisons: 'cassees' });
    const P = c.P, out = [c.svg];
    // le balayage : la pulpe va d'un bout de la poche à l'autre
    out.push(h.fleche(cr([[3, 13.4], [-6, 13.6], [-14, 11.6], [-18, 8.4]].map(p => P(...p))), h.a.arete));
    out.push(h.fleche(cr([[12, 3.6], [15.5, 4.6], [18.5, 7]].map(p => P(...p))), h.a.arete));
    // le doigt, de profil, entré en biais par le trait : l'ongle en haut à gauche, la pulpe vers le fond
    const T = F.repere({ x: g.ox, y: g.oy, echelle: s });
    const dirD = a => [Math.cos(a * Math.PI / 180), Math.sin(a * Math.PI / 180)];
    const P3 = [6, 8.5], P2 = [P3[0] - 21 * dirD(62)[0], P3[1] - 21 * dirD(62)[1]];
    const P1 = [P2[0] - 25 * dirD(70)[0], P2[1] - 25 * dirD(70)[1]], P0 = [P1[0] - 43 * dirD(72)[0], P1[1] - 43 * dirD(72)[1]];
    const ptsD = [P0, P1, P2, P3];
    const e = [19, 16.2, 14.2, 12.2];
    const dos = [[e[0] * 0.44, e[1] * 0.44], [e[1] * 0.44, e[2] * 0.44], [e[2] * 0.44, e[3] * 0.44]];
    const ventre = [[e[0] * 0.56, e[1] * 0.54], [e[1] * 0.54, e[2] * 0.54], [e[2] * 0.54, e[3] * 0.52]];
    const doigt = F.tube({ pts: ptsD, dos, ventre, coussin: [0.9, 0.8, 0.9], sens: -1, bout: 'doigt', ongle: 'cote', plis: true });
    out.push(F.peindre([doigt], T));
    return cadre('doigt', z, out.join('\n'));
  };

  // ─── Rincer : le haut de la bouteille souple, bouchon en bas, le jet jusqu'au fond, l'eau qui ressort
  const TH = 38 * Math.PI / 180;                       // l'axe de la bouteille, penché de 38° sur la verticale
  const geoJet = z => {
    const s = Math.min((z.l - 8) / 80, (z.h - 8) / 62), ox = 6 + 23 * s, oy = z.h - 20 * s;
    const P = (u, v) => [ox + u * s, oy + v * s];
    const cible = [-2, pBot(-2) - 2];
    const d = [Math.sin(TH), -Math.cos(TH)], n = [Math.cos(TH), Math.sin(TH)];
    const C = [cible[0] + 25 * d[0], cible[1] + 25 * d[1]];          // le bout du bouchon, en mm de la coupe
    const W = (a, b) => P(C[0] + a * d[0] + b * n[0], C[1] + a * d[1] + b * n[1]);   // a : le long de l'axe, b : en travers
    return { s, ox, oy, P, W, cible };
  };
  const dessinJet = z => {
    const g = geoJet(z), s = g.s, W = g.W;
    const c = coupe({ s, ox: g.ox, oy: g.oy, uL: -(g.ox - 2) / s, uR: (z.l - g.ox - 2) / s, vB: 17.5, ouvert: true, contenu: 'eau', cloisons: 'cassees' });
    const P = c.P, out = [c.svg];
    // l'eau qui monte par le trait, déborde et coule sur la peau
    for (const k of [-1, 1]) {
      const pts = [[k * (G - 3), peau(k * G) + 0.5], [k * (G - 0.5), peau(k * G) - 2], [k * (G + 3), peau(k * (G + 3)) - 1.6], [k * (G + 9), peau(k * (G + 9)) - 0.9]];
      out.push(h.fleche(cr(pts.map(p => P(...p))), h.a.detail));
    }
    // la bouteille entière, bouchon en bas : bouchon vissé, goulot, épaule, corps souple pincé au milieu
    const K = 0.72;
    const prof = [[0, 5.5], [6, 5.5], [6, 4], [9, 4], [12, 7], [16, 11], [24, 11], [31, 8.6], [38, 11], [47, 11], [50, 8], [51, 0]];
    const cote = sg => prof.map(([a, b]) => [a * K, b * sg * K]);
    const g1 = cote(1), g2 = cote(-1);
    const corpsB = [...g1.slice(2), ...g2.slice(2, -1).reverse()];
    out.push(h.path(cr(corpsB.map(p => W(...p)), true), h.a.hachure('eau', 'aucun')));
    out.push(h.path(cr(corpsB.map(p => W(...p)), true), h.a.contour));
    out.push(h.chemin([W(6*K, 4*K), W(9*K, 4*K), W(9*K, -4*K), W(6*K, -4*K)], BL, true));
    out.push(h.chemin([W(6*K, 4*K), W(9*K, 4*K)], h.a.arete), h.chemin([W(6*K, -4*K), W(9*K, -4*K)], h.a.arete));
    // le pincement : deux plis sur le corps souple
    for (const sg of [1, -1]) out.push(h.path(cr([W(29*K, 9.4 * sg*K), W(31*K, 6.2 * sg*K), W(33*K, 9.4 * sg*K)]), h.a.fin));
    // le bouchon vissé et ses stries
    out.push(h.chemin([W(0, 5.5*K), W(6*K, 5.5*K), W(6*K, -5.5*K), W(0, -5.5*K)], plein(h.a.contour), true));
    for (const b of [-3.6, -1.8, 1.8, 3.6]) out.push(h.path(`M${W(1*K, b*K).map(f).join(' ')} L${W(5*K, b*K).map(f).join(' ')}`, h.a.fin));
    // le trou au clou, au milieu du bouchon
    out.push(h.cercle(...W(0, 0), 0.9 * s, h.a.plein));
    // le jet : une file de gouttes du trou au fond de la poche, la flèche posée à côté
    const t0 = W(-1.5, 0), fin = P(...g.cible);
    const nG = 9;
    for (let i = 0; i < nG; i++) {
      const t = (i + 0.5) / nG, x = t0[0] + (fin[0] - t0[0]) * t, y = t0[1] + (fin[1] - t0[1]) * t;
      out.push(h.ellipse(x, y, 0.9 * s, 0.9 * s, h.a.plein));
    }
    const nx = Math.cos(TH) * 4 * s, ny = Math.sin(TH) * 4 * s;
    out.push(h.fleche(`M${f(t0[0] + nx + (fin[0] - t0[0]) * 0.15)} ${f(t0[1] + ny + (fin[1] - t0[1]) * 0.15)} L${f(t0[0] + nx + (fin[0] - t0[0]) * 0.55)} ${f(t0[1] + ny + (fin[1] - t0[1]) * 0.55)}`, h.a.arete));
    return cadre('jet', z, out.join('\n'));
  };

  // ─── Où l'on n'ouvre pas : le corps de face et de dos. mm, x depuis l'axe, y depuis le sommet.
  const DEMI = [
    [0, 0], [42, 10], [70, 44], [79, 96], [75, 146], [64, 186], [55, 222], [53, 262], [66, 290], [120, 312], [178, 334], [208, 356],
    [224, 398], [229, 470], [236, 560], [246, 660], [256, 740], [270, 830], [276, 885],
    [292, 920], [302, 962], [298, 990], [296, 1030], [290, 1075], [270, 1098], [246, 1092], [228, 1052], [222, 990], [222, 900],
    [213, 820], [201, 740], [192, 670], [180, 590], [168, 520], [158, 462],
    [162, 520], [158, 600], [142, 690], [140, 760], [156, 840], [176, 910], [180, 990], [172, 1090], [158, 1180], [146, 1262],
    [152, 1340], [150, 1420], [134, 1520], [120, 1628], [126, 1680], [138, 1718], [134, 1748], [96, 1752], [56, 1748], [46, 1718], [52, 1650],
    [50, 1560], [44, 1450], [40, 1360], [44, 1262], [36, 1150], [24, 1040], [10, 966], [0, 955],
  ];
  const silhouette = DEMI.slice(0, -1).concat(DEMI.slice(1, -1).reverse().map(([x, y]) => [-x, y]));
  const geoCorps = z => {
    const s = (z.h - 4) / 1760, y0 = 2, x1 = z.l * 0.27, x2 = z.l * 0.75;
    return { s, y0, x1, x2 };
  };
  const zonesCorps = (X, Y, face) => {
    const out = [], Z = pts => pts.map(([x, y]) => [X(x), Y(y)]);
    const disque = (x, y, r) => Z(ellipsePts(x, y, r, r, 20));
    const zones = [];
    for (const k of [1, -1]) {
      // la main, du poignet au bout des doigts
      zones.push(Z(DEMI.slice(18, 29).map(([x, y]) => [k * x, y])));
      // les articulations : épaule, coude, genou, cheville
      zones.push(disque(k * 196, 380, 34), disque(k * 222, 690, 32), disque(k * 96, 1262, 42), disque(k * 88, 1640, 34));
      if (face) {
        zones.push(disque(k * 88, 520, 42));                                                  // le sein
        zones.push(Z([[k * 130, 866], [k * 150, 896], [k * 42, 978], [k * 22, 950]]));        // le pli de l'aine
      }
    }
    if (face) zones.push(Z([[-53, 226], [-40, 214], [0, 236], [40, 214], [53, 226], [55, 262], [62, 290], [0, 300], [-62, 290], [-55, 262]]));   // le cou, devant et côtés
    else zones.push(disque(0, 948, 26));                                                           // le tour de l'anus
    zones.forEach(p => { out.push(hachure(p, 1.5, 45, 0.6)); out.push(h.path(cr(p, true), h.a.fin)); });
    return out.join('\n');
  };
  const dessinCorps = z => {
    const g = geoCorps(z), out = [];
    for (const [cx, face] of [[g.x1, true], [g.x2, false]]) {
      const X = x => cx + x * g.s, Y = y => g.y0 + y * g.s;
      const pts = silhouette.map(([x, y]) => [X(x), Y(y)]);
      out.push(h.path(cr(pts, true), BL));
      out.push(zonesCorps(X, Y, face));
      out.push(h.path(cr(pts, true), h.a.arete));
      if (face) {
        out.push(h.cercle(X(0), Y(700), 0.9, h.a.plein));                                     // le nombril
      } else {
        out.push(h.path(cr([[0, 300], [0, 560], [0, 800]].map(([x, y]) => [X(x), Y(y)])), h.a.fin));   // l'échine
        out.push(h.path(cr([[0, 842], [2, 900], [0, 950]].map(([x, y]) => [X(x), Y(y)])), h.a.detail)); // la raie des fesses
        for (const k of [1, -1]) out.push(h.path(cr([[k * 30, 972], [k * 90, 985], [k * 150, 968]].map(([x, y]) => [X(x), Y(y)])), h.a.fin));
      }
    }
    return out.join('\n');
  };

  // ─── Le visage, de face. Unités : la hauteur de la tête (du sommet au menton).
  const geoVisage = z => {
    const H = Math.min((z.h - 4) / 1.32, (z.l - 8) / 0.98), cx = z.l / 2, y0 = 2;
    const V = (x, y) => [cx + x * H, y0 + y * H];
    return { H, cx, y0, V };
  };
  const dessinVisage = z => {
    const g = geoVisage(z), V = g.V, out = [];
    const sym = pts => [...pts, ...pts.slice(0, -1).reverse().map(([x, y]) => [-x, y])];
    const Vp = pts => pts.map(p => V(...p));
    // épaules et cou, puis la tête par-dessus
    for (const k of [1, -1]) out.push(h.path(cr(Vp([[k * 0.225, 0.9], [k * 0.23, 1.12], [k * 0.34, 1.2], [k * 0.52, 1.25], [k * 0.6, 1.3]])), h.a.arete));
    const cou = Vp([[-0.225, 0.86], [-0.23, 1.12], [-0.12, 1.18], [0, 1.19], [0.12, 1.18], [0.23, 1.12], [0.225, 0.86], [0.2, 0.9], [0, 1.0], [-0.2, 0.9]]);
    out.push(hachure(cou, 2.6, 45, 0.5));
    out.push(h.path(cr(Vp([[-0.1, 1.2], [-0.04, 1.17], [0, 1.175], [0.04, 1.17], [0.1, 1.2]])), h.a.fin));   // le creux du cou
    // les oreilles
    for (const k of [1, -1]) out.push(h.path(cr(Vp([[k * 0.365, 0.42], [k * 0.415, 0.43], [k * 0.43, 0.5], [k * 0.405, 0.6], [k * 0.36, 0.66]])), plein(h.a.arete)));
    const tete = sym([[0, 0], [0.2, 0.025], [0.33, 0.12], [0.37, 0.28], [0.37, 0.44], [0.355, 0.58], [0.315, 0.72], [0.235, 0.86], [0.13, 0.955], [0, 0.995]]);
    out.push(h.path(cr(Vp(tete), true), plein(h.a.arete)));
    // le triangle du milieu du visage : la racine du nez, les deux coins de la bouche
    const tri = Vp([[0, 0.44], [0.135, 0.795], [-0.135, 0.795]]);
    out.push(hachure(tri, 2.6, 45, 0.5));
    out.push(h.chemin(tri, h.a.detail, true));
    // les cheveux
    out.push(h.path(cr(Vp([[-0.35, 0.3], [-0.26, 0.2], [-0.1, 0.16], [0.06, 0.17], [0.22, 0.2], [0.35, 0.3]])), h.a.detail));
    // les sourcils, les yeux
    for (const k of [1, -1]) {
      out.push(h.path(cr(Vp([[k * 0.07, 0.4], [k * 0.15, 0.375], [k * 0.25, 0.385], [k * 0.29, 0.405]])), trait(1.4)));
      const ex = k * 0.165, ey = 0.47, w = 0.08;
      out.push(h.path(`M${V(ex - w, ey).map(f).join(' ')} Q${V(ex, ey - 0.055).map(f).join(' ')} ${V(ex + w, ey).map(f).join(' ')} Q${V(ex, ey + 0.035).map(f).join(' ')} ${V(ex - w, ey).map(f).join(' ')} Z`, plein(h.a.detail)));
      out.push(h.cercle(...V(ex, ey - 0.004), 0.027 * g.H, h.a.detail), h.cercle(...V(ex, ey - 0.004), 0.011 * g.H, h.a.plein));
    }
    // le nez : l'arête, les ailes, les narines
    for (const k of [1, -1]) {
      out.push(h.path(cr(Vp([[k * 0.045, 0.49], [k * 0.05, 0.57], [k * 0.06, 0.63]])), h.a.fin));
      out.push(h.path(cr(Vp([[k * 0.06, 0.63], [k * 0.085, 0.655], [k * 0.08, 0.685], [k * 0.05, 0.69]])), h.a.detail));
      out.push(h.path(cr(Vp([[k * 0.042, 0.683], [k * 0.025, 0.69], [k * 0.012, 0.696]])), h.a.detail));
    }
    // la bouche
    out.push(h.path(cr(Vp([[-0.135, 0.795], [-0.06, 0.785], [0, 0.79], [0.06, 0.785], [0.135, 0.795]])), h.a.detail));
    out.push(h.path(cr(Vp([[-0.1, 0.785], [-0.05, 0.765], [0, 0.772], [0.05, 0.765], [0.1, 0.785]])), h.a.fin));
    out.push(h.path(cr(Vp([[-0.085, 0.812], [0, 0.838], [0.085, 0.812]])), h.a.fin));
    return out.join('\n');
  };

  return {
    ref: '34-01',
    titre: 'Ouvrir un abcès mûr',
    format: 'pleine',
    desc: 'Sept vues. Vue de dessus : la bosse ovale, la poche qu’on sent sous les doigts, la rougeur autour ; l’index et le pouce de l’autre main la tiennent de part et d’autre, et un seul trait noir est fait au centre, dans le grand axe. En coupe dans ce grand axe : la peau, la poche de pus juste dessous, partagée par deux cloisons ; la lame debout, perpendiculaire à la peau, pointe dans la poche au bout du trait, et une flèche suit la peau jusqu’à l’autre bout, assez loin pour qu’un doigt entre. Le trait fait : seule la loge du milieu se vide : son pus monte par le trait, déborde de la lèvre et coule sur la peau ; les deux loges derrière les cloisons restent pleines. Le doigt entre par le trait et balaie la poche d’un bout à l’autre : les cloisons sont cassées, il ne reste qu’une poche ; s’il sent battre au fond ou touche l’os, il ressort. Rincer : une bouteille souple entière, pincée au milieu, bouchon vissé en bas et percé au clou, pleine d’eau bouillie salée, envoie un jet en file de gouttes jusqu’au fond de la poche, et l’eau ressort par le trait. En marge, un corps de face et de dos, zones hachurées où l’on n’ouvre jamais : le devant et les côtés du cou, les seins, les mains, le pli de l’aine, les épaules, les coudes, les genoux, les chevilles, et de dos le tour de l’anus ; un visage de face où le triangle entre la racine du nez et les coins de la bouche est hachuré.',
    disposition: [['dessus', 'trait'], ['loges', 'doigt'], ['jet', 'corps', 'visage']],
    hauteurs: [0.86, 0.86, 1.62],
    largeurs: [[1, 1.2], [1, 1.2], [1.05, 1.3, 0.75]],
    vues: {
      dessus: {
        titre: 'Vu de dessus',
        dessin: dessinDessus,
        renvois: z => {
          const g = geoDessus(z), P = g.P;
          return [
            { n: 1, rond: [z.l - 12, 14], cible: P(5, 0), texte: 'un trait, dans le grand axe' },
            { n: 2, rond: [z.l - 12, z.h - 12], cible: P(-6, 26), texte: 'le pouce et l’index' },
          ];
        },
      },
      trait: {
        titre: 'Le trait, en coupe',
        dessin: dessinTrait,
        renvois: z => {
          const g = geoTrait(z), s = g.s, P = (u, v) => [g.ox + u * s, g.oy + v * s];
          return [
            { n: 3, rond: [12, 16], cible: P(-G - 1.3, pTop(-G) - 12), texte: 'lame perpendiculaire' },
            { n: 4, rond: [z.l - 12, 16], cible: P(G, peau(G) - 2.4), texte: 'assez long pour un doigt' },
          ];
        },
      },
      loges: {
        titre: 'Des cloisons',
        dessin: dessinLoges,
        renvois: z => {
          const s = echelle(z), ox = z.l / 2, oy = z.h - 20 * s, P = (u, v) => [ox + u * s, oy + v * s];
          return [
            { n: 5, rond: [12, 16], cible: P(CL[0] - 0.3, PK.c + 1.5), texte: 'une cloison' },
            { n: 6, rond: [z.l - 12, 16], cible: P(17, PK.c), texte: 'loge restée pleine' },
          ];
        },
      },
      doigt: {
        titre: 'Le doigt défait les cloisons',
        dessin: dessinDoigt,
        renvois: z => {
          const g = geoDoigt(z), s = g.s, P = (u, v) => [g.ox + u * s, g.oy + v * s];
          return [
            { n: 7, rond: [12, 16], cible: P(-12, -26), texte: 'doigt ganté, ou lavé' },
            { n: 8, rond: [z.l - 12, 16], cible: P(18, PK.c - 2), texte: 'une seule poche' },
            { n: 9, rond: [z.l - 12, z.h - 12], cible: P(8, pBot(8) - 0.3), texte: 'bat ou touche l’os : ressortir' },
          ];
        },
      },
      jet: {
        titre: 'Rincer',
        dessin: dessinJet,
        renvois: z => {
          const g = geoJet(z), P = g.P;
          return [
            { n: 10, rond: [14, 14], cible: g.W(0, 0), texte: 'percé au clou chauffé' },
            { n: 11, rond: [z.l - 12, 14], cible: g.W(30, 4), texte: 'eau bouillie salée, 9 g/L' },
            { n: 12, rond: [z.l - 12, z.h - 12], cible: P(5, pBot(5) - 2), texte: 'à grande eau, jusqu’au fond' },
          ];
        },
      },
      corps: {
        titre: 'Où l’on n’ouvre pas',
        dessin: dessinCorps,
        renvois: z => {
          const g = geoCorps(z), X1 = x => g.x1 + x * g.s, X2 = x => g.x2 + x * g.s, Y = y => g.y0 + y * g.s;
          return [
            { n: 13, rond: [12, Y(1000)], cible: [X1(-86), Y(922)], texte: 'hachuré : on n’ouvre jamais' },
            { n: 14, rond: [z.l - 12, Y(1150)], cible: [X2(0), Y(955)], texte: 'le tour de l’anus' },
          ];
        },
      },
      visage: {
        titre: 'Le visage',
        dessin: dessinVisage,
        renvois: z => {
          const g = geoVisage(z), V = g.V;
          return [
            { n: 15, rond: [z.l - 11, 12], cible: V(0, 0.445), texte: 'la racine du nez' },
            { n: 16, rond: [z.l - 11, V(0, 0.98)[1]], cible: V(0.135, 0.8), texte: 'les coins de la bouche' },
          ];
        },
      },
    },
    danger: 'Danger — une bosse qui bat sous les doigts ne se coupe jamais : elle est sur une artère ou tout contre, et une artère ouverte ne s’arrête pas au chalet.',
  };
};
