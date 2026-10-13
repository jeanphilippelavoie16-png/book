// Planche 88-05 — La pierre dormante, la molette et le tamis de moustiquaire.
// Chapitre 88, section 9-D « Deux pierres » (pierre dormante large, plate ou creusée en cuvette ;
// molette allongée tenue à deux mains ; pousser et tirer sur le grain, à genoux ; la mouture se
// ramasse au bout ; un granit, pas une pierre qui s'effrite) et étape 39 (ce qui passe la
// moustiquaire lève mieux ; le son et le germe restent dans le tamis, pour la bouillie).
// Aucune cote : le chapitre ne donne aucune mesure des pierres ni du tamis. Les proportions
// dessinées (pierre d'environ 75 cm, molette plus large qu'une main) ne sont que du dessin.
//
// Refaite le 13 octobre 2026 avec le corps simple (pose genoux-molette) et la charte :
//   deux poids  les pierres et le tamis, objets du geste, à 2,4 ; le corps à 1,5 / 0,7 ;
//   deux gris   la face à l'ombre des pierres et du cadre (en bas à droite, lumière d'en haut à
//               gauche) ; de dessus, la pierre dormante en plan loin sous la molette et les mains ;
//               le bol, objet secondaire, en gris loin ;
//   un rouge    la flèche du va-et-vient (de côté et de dessus) et celle du tamis qu'on secoue.
//               Pas de point à contrôler ni de zone dangereuse : le chapitre n'en donne pas.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => Math.round(v * 10) / 10;

  // hasard reproductible
  const hasard = (graine) => { let s = graine; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  // courbe lisse passant par les points (Catmull-Rom en Bézier)
  const lisse = (pts, ferme = true) => {
    const n = pts.length, P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  const dedans = (p, poly) => {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const a = poly[i], b = poly[j];
      if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c;
    }
    return c;
  };
  const distBord = (p, poly) => {
    let m = Infinity;
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length], dx = b[0] - a[0], dy = b[1] - a[1];
      const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)));
      m = Math.min(m, Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy));
    }
    return m;
  };
  // semis de points (farine) dans un polygone
  const semis = (poly, n, r, graine) => {
    const R = hasard(graine), xs = poly.map(p => p[0]), ys = poly.map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const out = [];
    for (let k = 0; out.length < n && k < n * 40; k++) {
      const p = [x0 + R() * (x1 - x0), y0 + R() * (y1 - y0)];
      if (dedans(p, poly)) out.push(h.cercle(p[0], p[1], r, A.plein));
    }
    return out.join('\n');
  };
  // le grain du granit : de petits éclats anguleux, clairsemés, loin du bord (un granit, pas un grès)
  const eclats = (poly, n, graine, { marge = 4, hors = () => false, taille = 1 } = {}) => {
    const R = hasard(graine), xs = poly.map(p => p[0]), ys = poly.map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const pts = [], out = [];
    for (let k = 0; pts.length < n && k < n * 80; k++) {
      const p = [x0 + R() * (x1 - x0), y0 + R() * (y1 - y0)];
      if (!dedans(p, poly) || distBord(p, poly) < marge || hors(p)) continue;
      if (pts.some(q => Math.hypot(q[0] - p[0], q[1] - p[1]) < 9)) continue;
      pts.push(p);
      const r = (0.8 + R() * 1.1) * taille, a0 = R() * Math.PI * 2, nv = 3 + Math.floor(R() * 2);
      const v = [];
      for (let i = 0; i < nv; i++) { const a = a0 + i * 2 * Math.PI / nv + (R() - 0.5) * 0.8, rr = r * (0.6 + R() * 0.6); v.push([p[0] + rr * Math.cos(a), p[1] + rr * Math.sin(a)]); }
      out.push(h.chemin(v, A.plein, true));
    }
    return out.join('\n');
  };
  // une lentille (un grain, une paillette de son) : deux arcs, tournée de ang degrés
  const lentille = (cx, cy, rx, ry, ang, at) => {
    const c = Math.cos(ang * Math.PI / 180), s = Math.sin(ang * Math.PI / 180);
    const T = (x, y) => `${f(cx + x * c - y * s)} ${f(cy + x * s + y * c)}`;
    return `<path d="M${T(-rx, 0)} Q${T(0, -2 * ry)} ${T(rx, 0)} Q${T(0, 2 * ry)} ${T(-rx, 0)} Z" ${at}/>`;
  };
  const GRAIN = `fill="#FFFFFF" ${A.detail.replace('fill="none" ', '')}`;
  const grains = (pts, rx, ry, graine) => {
    const R = hasard(graine);
    return pts.map(([x, y]) => lentille(x, y, rx, ry, Math.round(R() * 180), GRAIN)).join('\n');
  };
  // La face à l'ombre d'un volume (la charte) : le gris là où la forme, poussée vers le bas à
  // droite, sort d'elle-même — la face de dessous et de droite. Le blanc d'abord, l'ombre, puis
  // le trait par-dessus (le trait est posé par l'appelant).
  let nOmbre = 0;
  const ombre = (d, dx, dy) => {
    const id = `ombre-88-05-${++nOmbre}`;
    return `<clipPath id="${id}"><path d="${d}" fill="#FFFFFF"/></clipPath>\n${h.path(d, A.blanc)}\n<g clip-path="url(#${id})">${h.path(d, A.ombre)}` +
      `<path d="${d}" transform="translate(${-dx} ${-dy})" ${A.blanc}/></g>`;
  };
  // une courbe lisse en polygone (pour les tests dedans / bord)
  const echantillon = (pts, n = 6) => {
    const N = pts.length, out = [];
    for (let i = 0; i < N; i++) {
      const p0 = pts[(i - 1 + N) % N], p1 = pts[i], p2 = pts[(i + 1) % N], p3 = pts[(i + 2) % N];
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(c => 0.5 * (2 * p1[c] + (-p0[c] + p2[c]) * t + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2 + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * t3)));
      }
    }
    return out;
  };

  // ─── la géométrie commune, en mm, depuis les genoux (x vers l'avant, hauteur vers le haut) ───
  // Le corps (pose genoux-molette) pose ses paumes à plat à 181 mm du sol, 500 à 680 mm devant
  // les genoux : la molette se pose sous elles.
  const xa = 130, Lp = 740, xb = xa + Lp, xc = xa + Lp / 2;   // la pierre dormante
  const haut = x => { const t = (x - xc) / (Lp / 2); return 100 + (t < 0 ? 48 : 30) * t * t; };  // le dessus en cuvette
  const mL = 200, xm = 575, xg = 262;                // la molette (vue par le bout), poussée, tirée
  const mH = 181 - haut(xm);                         // son dessus sous les paumes
  const mDemi = 250;                                 // la demi-longueur de la molette (vue de dessus)
  const yMain = 150;                                 // de dessus, les mains à ±150 mm de l'axe

  // ─── vue 1 : de côté ────────────────────────────────────────────────────────────────────
  const geoC = z => {
    const e = Math.min(0.35, (z.h - 10) / 940);
    const y0 = z.h - 6;
    const xk = z.l - 50 - xb * e;
    const X = mm => xk + mm * e, Y = mm => y0 - mm * e, P = (x, y) => [X(x), Y(y)];
    return { e, y0, xk, X, Y, P };
  };
  const cote = z => {
    const { e, y0, xk, X, Y, P } = geoC(z);
    const out = [];
    out.push(h.ligne(8, y0, z.l - 8, y0, A.arete));

    // la molette : un pain de pierre vu par le bout, le dessus presque plat, posé dans le creux
    const pMolette = (c) => {
      const b = haut(c), m2 = mL / 2;
      return [P(c - 60, haut(c - 60)), P(c - m2 + 4, haut(c - m2) + 10), P(c - m2, b + mH * 0.52), P(c - m2 + 12, b + mH - 4),
        P(c, b + mH), P(c + m2 - 12, b + mH - 4), P(c + m2, b + mH * 0.52), P(c + m2 - 4, haut(c + m2) + 10), P(c + 60, haut(c + 60))];
    };

    // la pierre dormante, en cuvette, plus haute au bout du genou
    const dessus = [];
    for (let x = xa + 45; x <= xb - 40 + 1; x += (Lp - 85) / 10) dessus.push(P(x, haut(x)));
    const ptsDorm = [P(xa + 300, -1), P(xa + 90, 3), P(xa + 30, 8), P(xa + 6, 34), P(xa - 4, 70), P(xa + 4, 112), P(xa + 16, 140), ...dessus,
      P(xb - 12, 118), P(xb + 4, 90), P(xb - 2, 52), P(xb - 12, 18), P(xb - 60, 2), P(xb - 220, -1)];
    const dDorm = lisse(ptsDorm);
    out.push(ombre(dDorm, 5, 9));
    // le grain du granit
    out.push(eclats(echantillon(ptsDorm), 26, 13, { marge: 6, taille: 0.75 }));
    out.push(h.path(dDorm, A.contour));

    // la mouture ramassée au bout de la pierre
    const x1 = xb - 135, x2 = xb - 6;
    const bord = [];
    for (let i = 0; i <= 12; i++) {
      const x = x1 + (x2 - x1) * i / 12, t = i / 12;
      bord.push(P(x, haut(x) + 62 * Math.pow(Math.sin(Math.PI * Math.pow(t, 0.75)), 0.8)));
    }
    const fond = [];
    for (let i = 12; i >= 0; i--) { const x = x1 + (x2 - x1) * i / 12; fond.push(P(x, haut(x) - 0.5)); }
    out.push(h.path(lisse(bord, false) + ' ' + fond.map(p => `L${f(p[0])} ${f(p[1])}`).join(' ') + ' Z', A.blanc));
    out.push(h.path(lisse(bord, false), A.detail));
    out.push(semis([...bord, ...fond], 230, 0.5, 11));
    // le grain devant la molette
    const gpts = [], Rg = hasard(5);
    for (let i = 0; i < 4; i++) { const x = xm + mL / 2 + 12 + i * 11 + Rg() * 3; gpts.push(P(x, haut(x) + 3.5)); }
    out.push(grains(gpts, 2, 1.1, 3));

    // la molette tirée (en tireté) et la molette poussée
    out.push(h.path(lisse(pMolette(xg)), A.cache));
    const dMol = lisse(pMolette(xm));
    out.push(ombre(dMol, 3.5, 6));
    out.push(eclats(echantillon(pMolette(xm)), 5, 29, { marge: 5, taille: 0.75 }));
    out.push(h.path(dMol, A.contour));

    // le corps, à genoux au bout de la pierre, penché par-dessus la molette : le poids passe par
    // les deux paumes à plat sur son dessus (la main loin juste derrière, en gris)
    const corps = F.corps({ x: xk, y: y0, pose: 'genoux-molette', vue: 'profil', age: 'adulte', echelle: e });
    out.push(corps.toString());

    // le va-et-vient : la flèche du geste, entre la molette tirée et la molette poussée
    const yF = Y(haut((xg + xm) / 2) + mH * 0.5);
    out.push(h.geste(`M${f(X(xg + 30))} ${f(yF)} L${f(X(xm - mL / 2 - 10))} ${f(yF)}`, { double: true }));
    return out.join('\n');
  };

  // ─── vue 2 : de dessus ──────────────────────────────────────────────────────────────────
  const geoD = z => {
    const xmin = xa - 30, xmax = xb + 20, ymin = -280, ymax = 330;
    const e = Math.min((z.l - 16) / (xmax - xmin), (z.h - 12) / (ymax - ymin));
    const X = mm => (z.l - (xmax - xmin) * e) / 2 + (mm - xmin) * e, Y = mm => 6 + (mm - ymin) * e, P = (x, y) => [X(x), Y(y)];
    return { e, X, Y, P };
  };
  const dessusVue = z => {
    const { e, X, Y, P } = geoD(z);
    const out = [];
    // la pierre dormante, en plan : sous la molette et les mains, le plan loin
    const dPl = lisse([P(xa, -10), P(xa + 26, -150), P(xa + 180, -200), P(xa + 420, -204), P(xb - 60, -172), P(xb, -40),
      P(xb - 8, 92), P(xb - 72, 182), P(xa + 330, 206), P(xa + 120, 192), P(xa + 18, 122)]);
    out.push(h.path(dPl, A.loin), h.path(dPl, A.arete));
    const dCreux = lisse([P(xa + 45, 0), P(xa + 95, -132), P(xa + 340, -156), P(xb - 75, -124), P(xb - 28, 0),
      P(xb - 75, 124), P(xa + 340, 156), P(xa + 95, 132)]);
    out.push(h.path(dCreux, A.detail));
    // le grain étalé devant la molette
    const Rg = hasard(17), gp = [];
    while (gp.length < 16) gp.push(P(xm + mL / 2 + 14 + Rg() * 40, -115 + Rg() * 230));
    out.push(grains(gp, 2.6, 1.3, 9));
    // la mouture au bout
    const polyTas = [P(xb - 125, -100), P(xb - 80, -122), P(xb - 40, -80), P(xb - 30, 0), P(xb - 40, 80), P(xb - 80, 122), P(xb - 125, 100), P(xb - 110, 0)];
    out.push(h.path(lisse(polyTas), A.blanc), h.path(lisse(polyTas), A.detail));
    out.push(semis(echantillon(polyTas, 5), 260, 0.5, 23));
    // la molette poussée (la course se lit à la flèche : pas de molette tirée ici, elle tomberait
    // sous le corps)
    const ptsMol = c => {
      const m2 = mL / 2, L = mDemi;
      return [P(c - m2, 0), P(c - m2 + 3, -L * 0.73), P(c - m2 + 28, -L * 0.965), P(c, -L), P(c + m2 - 28, -L * 0.965),
        P(c + m2 - 3, -L * 0.73), P(c + m2, 0), P(c + m2 - 3, L * 0.73), P(c + m2 - 28, L * 0.965), P(c, L), P(c - m2 + 28, L * 0.965), P(c - m2 + 3, L * 0.73)];
    };
    const dMol = lisse(ptsMol(xm));
    out.push(ombre(dMol, 4, 5));
    out.push(eclats(echantillon(ptsMol(xm)), 8, 37, { marge: 5, taille: 0.8, hors: p => Math.abs(p[1] - Y(yMain)) < 26 || Math.abs(p[1] - Y(-yMain)) < 26 }));
    out.push(h.path(dMol, A.contour));

    // le haut du corps, penché par-dessus le bout de la pierre (pose genoux-molette vue de dessus,
    // les bras masqués : les bras et les mains sont les mains calquées). De dessus, (x, y) du corps
    // est l'aplomb du bassin, 195 mm derrière les genoux ; il sort de la vue par la gauche.
    const corpsD = F.corps({ x: X(-195), y: Y(0), pose: 'genoux-molette', vue: 'dessus', age: 'adulte', echelle: e,
      masquer: ['brasP', 'brasL'] });
    const epaule = c => corpsD.articulations['epaule' + c];

    // les deux mains à plat sur la molette ; le bras remonte vers l'épaule et passe sous elle.
    // pose construite s03-dessus-l4 (la main relâchée de s03 sans ses plis de paume) : le dos de la
    // main, à plat vu de dessus, les doigts vers le grain ; telle quelle, la main gauche (en haut, le
    // pouce vers le milieu), en miroir la droite (en bas) ; (75, 95) : le milieu de la main
    const mainDessus = (yv, droite, ep) => {
      const o = { x: X(xm - 4), y: yv, ancre: [75, 95], angle: -90, miroir: droite, echelle: 1.23 * e, masquer: [[0, 0, 125, 14]] };
      const essai = F.modele('s03-dessus-l4', o);
      const pa = essai.P([59.1, 14]), pb = essai.P([112.7, 14]), poignet = [(pa[0] + pb[0]) / 2, (pa[1] + pb[1]) / 2];
      const v = [ep[0] - poignet[0], ep[1] - poignet[1]];
      // le bras part 2 px sous la coupe du poignet (y = 16) : le blanc de la main le recouvre, pas de jour
      return F.modele('s03-dessus-l4', { ...o, bras: { a: [59.2, 16], b: [112.3, 16], a0: [57.9, 26], b0: [110.7, 26], vers: v,
        long: Math.hypot(v[0], v[1]), gonfle: 0.4, fin: 'ouvert' } }).toString();
    };
    out.push(mainDessus(Y(yMain), true, epaule('P')), mainDessus(Y(-yMain), false, epaule('L')));
    const idc = 'vue-88-05-dessus';
    out.push(`<clipPath id="${idc}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath><g clip-path="url(#${idc})">${corpsD}</g>`);
    // le va-et-vient
    out.push(h.geste(`M${f(X(xg))} ${f(Y(300))} L${f(X(xm))} ${f(Y(300))}`, { double: true }));
    return out.join('\n');
  };

  // ─── vue 3 : le tamis ───────────────────────────────────────────────────────────────────
  const geoT = z => {
    const s = Math.min(z.l * 0.56, 150), d = [s * 0.34, -s * 0.26], t = 9, hR = 13;
    const x0 = (z.l - s - d[0]) / 2 + 6, y0 = 34 - d[1];          // coin avant gauche du cadre
    const add = (p, q, k = 1) => [p[0] + q[0] * k, p[1] + q[1] * k];
    const Ao = [x0, y0], Bo = [x0 + s, y0], Co = add(Bo, d), Do = add(Ao, d);
    const nd = Math.hypot(d[0], d[1]), u = [d[0] / nd, d[1] / nd];
    const Ai = add(add(Ao, [t, 0]), u, t), Bi = add(add(Bo, [-t, 0]), u, t), Ci = add(add(Co, [-t, 0]), u, -t), Di = add(add(Do, [t, 0]), u, -t);
    const bx = x0 + (s + d[0]) / 2, by = y0 + hR + 66, brx = (s + d[0]) / 2 + 6, bry = 18, bh = 50;
    return { s, d, t, hR, x0, y0, add, Ao, Bo, Co, Do, Ai, Bi, Ci, Di, bx, by, brx, bry, bh };
  };
  const tamis = z => {
    const out = [];
    const { d, hR, y0, add, Ao, Bo, Co, Do, Ai, Bi, Di, bx, by, brx, bry, bh } = geoT(z);
    // le bol, sous le tamis : l'objet secondaire, en gris loin
    const dPanse = `M${f(bx - brx)} ${f(by)} C${f(bx - brx)} ${f(by + bh * 1.25)} ${f(bx + brx)} ${f(by + bh * 1.25)} ${f(bx + brx)} ${f(by)} ` +
      `A${f(brx)} ${f(bry)} 0 0 1 ${f(bx - brx)} ${f(by)} Z`;
    out.push(h.path(dPanse, A.loin));
    out.push(h.ellipse(bx, by, brx, bry, A.blanc));
    out.push(h.path(`M${f(bx - brx)} ${f(by)} C${f(bx - brx)} ${f(by + bh * 1.25)} ${f(bx + brx)} ${f(by + bh * 1.25)} ${f(bx + brx)} ${f(by)}`, A.arete));
    out.push(h.ellipse(bx, by, brx, bry, A.arete));
    // la farine dans le bol
    const polyB = [];
    for (let i = 0; i <= 16; i++) { const a = Math.PI * i / 16; polyB.push([bx - (brx - 8) * Math.cos(a), by + 5 - 12 * Math.sin(a)]); }
    for (let i = 16; i >= 0; i--) { const a = Math.PI * i / 16; polyB.push([bx - (brx - 8) * Math.cos(a), by + 5 + (bry - 8) * Math.sin(a)]); }
    out.push(h.path(lisse(polyB.slice(0, 17), false), A.fin));
    out.push(semis(polyB, 170, 0.5, 31));
    // la farine qui tombe, sous toute la moustiquaire
    const Rf = hasard(41), chute = [];
    for (let i = 0; i < 90; i++) {
      const k = Rf(), a = Rf();
      const x = Ai[0] + 3 + a * (Bi[0] - Ai[0] - 6) + k * (Di[0] - Ai[0]);
      const yh = y0 + hR + 3 + k * (Di[1] - Ai[1]);
      const y = yh + Math.pow(Rf(), 1.3) * (by - 4 - yh);
      if (y > y0 + hR + 2 || x > Bo[0] + 2) chute.push(h.cercle(x, y, 0.5, A.plein));
    }
    out.push(chute.join('\n'));
    // le cadre : la face avant au jour, la face de droite à l'ombre, la moustiquaire
    const Bh = add(Bo, [0, hR]), Ch = add(Co, [0, hR]), Ah = add(Ao, [0, hR]);
    const faceAv = [Ao, Bo, Bh, Ah], faceD = [Bo, Co, Ch, Bh];
    out.push(h.chemin(faceAv, A.blanc, true), h.chemin(faceD, A.ombre, true));
    out.push(h.chemin([Ao, Bo, Co, Do], A.blanc, true));
    const ouverture = [Ai, Bi, [Bi[0] + (Di[0] - Ai[0]), Di[1]], Di];
    out.push(h.chemin(ouverture, A.hachure('grillage', 'aucun'), true), h.chemin(ouverture, A.arete, true));
    // les arêtes, puis le contour du cadre par-dessus
    out.push(h.chemin([Ao, Bo, Bh], A.arete), h.chemin([Bo, Co], A.arete));
    out.push(h.chemin([Ao, Ah, Bh, Ch, Co, Do], A.contour, true));
    // le son et le germe qui restent sur la moustiquaire
    const Rs = hasard(7), son = [];
    for (let i = 0; i < 18; i++) {
      const a = 0.1 + Rs() * 0.8, b = 0.15 + Rs() * 0.7;
      const p = [Ai[0] + (Bi[0] - Ai[0]) * a + (Di[0] - Ai[0]) * b, Ai[1] + (Di[1] - Ai[1]) * b];
      son.push(lentille(p[0], p[1], 2.6 + Rs() * 1.2, 1.1, Math.round(Rs() * 180), GRAIN));
    }
    out.push(son.join('\n'));
    // on secoue : la flèche du geste
    const ym = (Ao[1] + Do[1]) / 2 + 4;
    out.push(h.geste(`M${f(Ao[0] - 40)} ${f(ym)} L${f(Ao[0] - 8)} ${f(ym)}`, { double: true }));
    return out.join('\n');
  };

  return {
    ref: '88-05',
    titre: 'La pierre dormante, la molette et le tamis',
    desc: 'À genoux au bout d’une pierre dormante en cuvette, penché par-dessus, on pousse et on tire à deux mains à plat une molette allongée sur le grain ; la mouture se ramasse au bout de la pierre. Vu de dessus, la tête et les épaules au-dessus du bout de la pierre, les deux mains à plat sur la molette. Le tamis de moustiquaire garde le son et le germe et laisse passer la farine.',
    format: 'pleine',
    disposition: [['cote'], ['dessus', 'tamis']],
    hauteurs: [1.3, 1],
    largeurs: [[1], [1.4, 1]],
    vues: {
      cote: {
        titre: 'Le va-et-vient, à genoux au bout de la pierre',
        dessin: cote,
        renvois: z => {
          const { X, Y } = geoC(z);
          return [
            { n: 1, rond: [X(xb) + 36, Y(30)], cible: [X(xb - 70), Y(55)], texte: 'pierre dormante : granit dur' },
            { n: 2, rond: [X(xm + 175), Y(haut(xm) + mH) - 52], cible: [X(xm + mL / 2 - 14), Y(haut(xm) + mH * 0.45)], texte: 'molette, tenue à deux mains' },
            { n: 3, rond: [X(xb) + 36, Y(haut(xb) + 95)], cible: [X(xb - 70), Y(haut(xb - 70) + 22)], texte: 'la mouture, ramassée au bout' },
          ];
        },
      },
      dessus: {
        titre: 'Vu de dessus : les deux mains sur la molette',
        dessin: dessusVue,
        renvois: z => {
          const { X, Y } = geoD(z);
          return [
            { n: 4, rond: [X(xm + 200), Y(300)], cible: [X(xm + 140), Y(60)], texte: 'le grain, bien sec' },
          ];
        },
      },
      tamis: {
        titre: 'Le tamis de moustiquaire',
        dessin: tamis,
        renvois: z => {
          const T = geoT(z);
          return [
            { n: 5, rond: [T.Co[0] - 6, T.Co[1] - 22], cible: [T.Bi[0] + (T.Di[0] - T.Ai[0]) - 16, T.Di[1] + 7], texte: 'la moustiquaire' },
            { n: 6, rond: [T.Do[0] - 10, T.Do[1] - 14], cible: [T.Di[0] + 22, T.Di[1] + 9], texte: 'son et germe : à la bouillie' },
            { n: 7, rond: [T.bx + T.brx - 8, T.by + 58], cible: [T.bx + 26, T.by + 6], texte: 'la farine qui passe' },
          ];
        },
      },
    },
  };
};
