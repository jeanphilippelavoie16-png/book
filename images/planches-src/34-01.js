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
// Lot 3 (JP, 13 octobre au soir : les corps de profil seulement) : le corps de face et de dos et le
// visage de face sortent. Un seul corps simple de profil porte les zones du chapitre ; le triangle du
// visage et le cou passent sur la tête du même corps, en grand. Rouge : le geste du trait à faire.
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
    out.push(h.geste(cr(fl)));
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

  // ─── Où l'on n'ouvre pas : le corps simple de profil (JP, 13 octobre au soir : les corps de
  // profil seulement). Un seul profil porte toutes les zones du chapitre (ch. 34, étape 25) : le
  // devant et les côtés du cou, le sein, la main, le pli de l'aine, le tour de l'anus (au bas de la
  // fesse), et les articulations (épaule, coude, genou, cheville). La main proche est portée un peu
  // devant la hanche, pour qu'elle ne cache ni l'aine ni la fesse. Repère : mm, x vers l'avant
  // depuis le point au sol, y vers le haut (négatif à l'écran).
  const ANGLES = { brasP: 10, avantbrasP: 40, mainP: 40, brasL: 4, avantbrasL: 24, mainL: 24 };
  const scanY = (svg, y) => {
    const xs = [];
    for (const m of String(svg).matchAll(/ d="([^"]+)"/g)) {
      const n = m[1].match(/-?\d+(\.\d+)?/g).map(Number);
      for (let i = 0; i + 3 < n.length; i += 2) {
        const [x0, y0, x1, y1] = [n[i], n[i + 1], n[i + 2], n[i + 3]];
        if (y0 !== y1 && (y0 - y) * (y1 - y) <= 0) xs.push(x0 + (x1 - x0) * (y - y0) / (y1 - y0));
      }
    }
    return xs;
  };
  // le corps en mm (une fois) : les bords avant et arrière du tronc seul, lus sur son contour
  const C_MM = h.formes.corps({ x: 0, y: 0, pose: 'debout', echelle: 1, pieds: 'nu', angles: ANGLES });
  const T_MM = h.formes.corps({ x: 0, y: 0, pose: 'debout', echelle: 1, pieds: 'nu', angles: ANGLES, masquer: ['brasP', 'brasL'] });
  const avant = y => Math.max(...scanY(T_MM, y)), arriere = y => Math.min(...scanY(T_MM, y));
  const J = C_MM.articulations;
  // les zones, en mm
  const ZONES = (() => {
    const z = [], disque = (c, r) => ellipsePts(c[0], c[1], r, r, 24);
    // le devant et les côtés du cou : du dessous de la mâchoire à la base du cou, les deux tiers avant
    const cou = [], dos = [];
    for (let y = -1512; y <= -1466; y += 4) { const a = avant(y), b = arriere(y); cou.push([a - 0.8, y]); dos.push([b + 0.38 * (a - b), y]); }
    z.push([...cou, ...dos.reverse()]);
    // le sein : sur le devant de la poitrine
    const yS = -1300; z.push(ellipsePts(avant(yS) - 34, yS, 40, 46, 24));
    // le pli de l'aine : le devant de la hanche, en biais
    z.push([[avant(-952) - 1, -952], [avant(-872) - 1, -872], [avant(-872) - 46, -884], [avant(-940) - 56, -940]]);
    // le tour de l'anus : au bas de la fesse, côté raie
    const yA = -838; z.push(ellipsePts(arriere(yA) + 24, yA, 22, 26, 20));
    // la main : de la base des doigts au poignet, dans l'axe
    const W = J.poignetP, M = [C_MM.mainP.x, C_MM.mainP.y], u = [M[0] - W[0], M[1] - W[1]], lu = Math.hypot(u[0], u[1]);
    const cM = [W[0] + u[0] / lu * 78, W[1] + u[1] / lu * 78], a = Math.atan2(u[1], u[0]);
    z.push(Array.from({ length: 24 }, (_, i) => { const t = 2 * Math.PI * i / 24, x = 88 * Math.cos(t), y = 30 * Math.sin(t); return [cM[0] + x * Math.cos(a) - y * Math.sin(a), cM[1] + x * Math.sin(a) + y * Math.cos(a)]; }));
    // les articulations : épaule, coude, genou, cheville
    z.push(disque(J.epauleP, 44), disque(J.coudeP, 34), disque(J.genouP, 46), disque(J.chevilleP, 34));
    return { z, aine: [avant(-905) - 18, -905], anus: [arriere(yA) + 24, yA], cou: [avant(-1490) - 10, -1490] };
  })();
  const geoCorps = z => {
    const s = (z.h - 6) / 1760, x0 = z.l / 2 - 40 * s, y0 = z.h - 3;
    return { s, x0, y0, X: x => x0 + x * s, Y: y => y0 + y * s };
  };
  const dessinCorps = z => {
    const g = geoCorps(z), out = [];
    // le corps entier, puis les zones hachurées (découpées par sa silhouette)
    const c = h.formes.corps({ x: g.x0, y: g.y0, pose: 'debout', echelle: g.s, pieds: 'nu', angles: ANGLES });
    out.push(String(c));
    const P = pts => pts.map(([x, y]) => [g.X(x), g.Y(y)]);
    const zs = ZONES.z.map(p => { const q = P(p); return [hachure(q, 1.3, 45, 0.6), h.path(cr(q, true), h.a.detail)].join('\n'); });
    out.push(dansLeCorps('corps', c, zs.join('\n')));
    return out.join('\n');
  };
  // ce qui se dessine sur le corps est découpé par sa silhouette (ses formes pleines, blanches et grises)
  const dansLeCorps = (id, c, contenu) => {
    const formes = [...String(c).matchAll(/<path d="([^"]+)" fill="#(?:FFFFFF|E6E6E6)"/gi)].map(m => `<path d="${m[1]}" fill="none"/>`);
    return `<clipPath id="corps-34-${id}">${formes.join('')}</clipPath>\n<g clip-path="url(#corps-34-${id})">\n${contenu}\n</g>`;
  };

  // ─── Le visage, de profil : la tête et le cou du même corps simple, en grand. Le triangle du
  // milieu du visage (de la racine du nez aux coins de la bouche) suit le contour du visage ; le coin
  // de la bouche est à 26 mm en arrière des lèvres. Le devant et les côtés du cou, hachurés aussi.
  const geoVisage = z => {
    const s = Math.min((z.h - 4) / 420, (z.l - 10) / 300), x0 = z.l * 0.42 - 30 * s, y0 = 4 + 1760 * s;   // le sommet du crâne en haut
    return { s, x0, y0, X: x => x0 + x * s, Y: y => y0 + y * s };
  };
  const TRIANGLE = (() => {
    const yR = -1656, yB = -1563, out = [];
    for (let y = yR; y <= yB; y += 3) out.push([avant(y) - 0.6, y]);
    out.push([avant(yB) - 26, yB + 2], [avant(-1605) - 36, -1606], [avant(yR) - 16, yR + 3]);
    return out;
  })();
  const dessinVisage = z => {
    const g = geoVisage(z), out = [];
    const c = h.formes.corps({ x: g.x0, y: g.y0, pose: 'debout', echelle: g.s, pieds: 'nu', angles: ANGLES });
    out.push(cadre('visage', z, String(c)));
    const P = pts => pts.map(([x, y]) => [g.X(x), g.Y(y)]);
    out.push(dansLeCorps('visage', c, [TRIANGLE, ZONES.z[0]].map(p => { const q = P(p); return [hachure(q, 2.4, 45, 0.6), h.path(cr(q, true), h.a.detail)].join('\n'); }).join('\n')));
    return out.join('\n');
  };

  return {
    ref: '34-01',
    titre: 'Ouvrir un abcès mûr',
    format: 'pleine',
    desc: 'Sept vues. Vue de dessus : la bosse ovale, la poche qu’on sent sous les doigts, la rougeur autour ; l’index et le pouce de l’autre main la tiennent de part et d’autre, et un seul trait noir est fait au centre, dans le grand axe. En coupe dans ce grand axe : la peau, la poche de pus juste dessous, partagée par deux cloisons ; la lame debout, perpendiculaire à la peau, pointe dans la poche au bout du trait, et une flèche rouge suit la peau jusqu’à l’autre bout, assez loin pour qu’un doigt entre. Le trait fait : seule la loge du milieu se vide ; les deux loges derrière les cloisons restent pleines. Le doigt entre par le trait et balaie la poche d’un bout à l’autre : les cloisons sont cassées, il ne reste qu’une poche. Rincer : une bouteille souple, bouchon en bas et percé au clou, envoie un jet jusqu’au fond de la poche, et l’eau ressort par le trait. Un corps de profil, zones hachurées où l’on n’ouvre jamais : le devant et les côtés du cou, le sein, la main, le pli de l’aine, le tour de l’anus au bas de la fesse, l’épaule, le coude, le genou, la cheville ; et la tête du même corps, en grand, de profil : le triangle du milieu du visage, de la racine du nez aux coins de la bouche, et le devant et les côtés du cou, hachurés.',
    disposition: [['dessus', 'trait'], ['loges', 'doigt'], ['jet', 'corps', 'visage']],
    hauteurs: [0.86, 0.86, 1.62],
    largeurs: [[1, 1.2], [1, 1.2], [1.25, 0.6, 1.05]],
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
          const g = geoCorps(z);
          return [
            { n: 13, rond: [z.l - 12, g.Y(-1080)], cible: [g.X(ZONES.aine[0]), g.Y(ZONES.aine[1])], texte: 'hachuré : on n’ouvre jamais' },
            { n: 14, rond: [12, g.Y(-700)], cible: [g.X(ZONES.anus[0]), g.Y(ZONES.anus[1])], texte: 'le tour de l’anus' },
          ];
        },
      },
      visage: {
        titre: 'Le visage, le cou',
        dessin: dessinVisage,
        renvois: z => {
          const g = geoVisage(z), r = TRIANGLE[0], b = TRIANGLE[TRIANGLE.length - 3];
          return [
            { n: 15, rond: [z.l - 12, g.Y(-1700)], cible: [g.X(r[0]) - 2, g.Y(r[1])], texte: 'la racine du nez' },
            { n: 16, rond: [z.l - 12, g.Y(-1545)], cible: [g.X(b[0]), g.Y(b[1])], texte: 'les coins de la bouche' },
            { n: 17, rond: [z.l - 12, g.Y(-1440)], cible: [g.X(ZONES.cou[0]), g.Y(ZONES.cou[1])], texte: 'le devant et les côtés du cou' },
          ];
        },
      },
    },
    danger: 'Danger — une bosse qui bat sous les doigts ne se coupe jamais : elle est sur une artère ou tout contre, et une artère ouverte ne s’arrête pas au chalet.',
  };
};
