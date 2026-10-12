// Planche 88-05 — La pierre dormante, la molette et le tamis de moustiquaire.
// Chapitre 88, section 9-D « Deux pierres » (pierre dormante large, plate ou creusée en cuvette ;
// molette allongée tenue à deux mains ; pousser et tirer sur le grain, à genoux ; la mouture se
// ramasse au bout ; un granit, pas une pierre qui s'effrite) et étape 39 (ce qui passe la
// moustiquaire lève mieux ; le son et le germe restent dans le tamis, pour la bouillie).
// Aucune cote : le chapitre ne donne aucune mesure des pierres ni du tamis. Les proportions
// dessinées (pierre d'environ 70 cm, molette plus large qu'une main) ne sont que du dessin.
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
  const pierre = (d, t = 'arete') => `${h.path(d, A.blanc)}\n${h.path(d, A.hachure('pierre', t))}`;
  const double = (x1, y1, x2, y2) =>
    `<path d="M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)}" ${A.arete} marker-start="url(#fl)" marker-end="url(#fl)"/>`;
  const dedans = (p, poly) => {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const a = poly[i], b = poly[j];
      if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c;
    }
    return c;
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
  // une lentille (un grain, une paillette de son) : deux arcs, tournée de ang degrés
  const lentille = (cx, cy, rx, ry, ang, at) => {
    const c = Math.cos(ang * Math.PI / 180), s = Math.sin(ang * Math.PI / 180);
    const T = (x, y) => `${f(cx + x * c - y * s)} ${f(cy + x * s + y * c)}`;
    return `<path d="M${T(-rx, 0)} Q${T(0, -2 * ry)} ${T(rx, 0)} Q${T(0, 2 * ry)} ${T(-rx, 0)} Z" ${at}/>`;
  };
  const grains = (pts, rx, ry, graine) => {
    const R = hasard(graine);
    return pts.map(([x, y]) => lentille(x, y, rx, ry, Math.round(R() * 180), `fill="#fff" ${A.detail.replace('fill="none" ', '')}`)).join('\n');
  };

  // ─── la géométrie commune, en mm, depuis le genou (x vers l'avant, hauteur vers le haut) ───
  const xa = 130, Lp = 740, xb = xa + Lp, xc = xa + Lp / 2;   // la pierre dormante
  const haut = x => { const t = (x - xc) / (Lp / 2); return 100 + (t < 0 ? 48 : 30) * t * t; };  // le dessus en cuvette
  const mL = 200, mH = 85;                           // la molette, vue par le bout
  const xm = 590, xg = 250;                          // molette poussée, molette tirée
  const PENCHE = 52;                                 // le tronc penché vers l'avant (degrés)

  // ─── vue 1 : de côté ────────────────────────────────────────────────────────────────────
  const geoC = z => {
    const e = Math.min(0.335, (z.h - 12) / 1000);
    const y0 = z.h - 6;
    const xk = (z.l - (xb + 30 + 540) * e) / 2 + 540 * e;
    const X = mm => xk + mm * e, Y = mm => y0 - mm * e, P = (x, y) => [X(x), Y(y)];
    return { e, y0, xk, X, Y, P };
  };
  const cote = z => {
    const { e, y0, xk, X, Y, P } = geoC(z);
    const out = [];
    out.push(h.ligne(8, y0, z.l - 8, y0, A.arete));

    // la molette : un pain de pierre vu par le bout, le dessus presque plat, posé dans le creux
    const molette = (c) => {
      const b = haut(c), m2 = mL / 2;
      return lisse([P(c - 60, haut(c - 60)), P(c - m2 + 4, haut(c - m2) + 10), P(c - m2, b + 44), P(c - m2 + 14, b + mH - 7),
        P(c, b + mH), P(c + m2 - 14, b + mH - 7), P(c + m2, b + 44), P(c + m2 - 4, haut(c + m2) + 10), P(c + 60, haut(c + 60))]);
    };

    // la pierre dormante, en cuvette, plus haute au bout du genou
    const dessus = [];
    for (let x = xa + 45; x <= xb - 40 + 1; x += (Lp - 85) / 10) dessus.push(P(x, haut(x)));
    const dDorm = lisse([P(xa + 300, -1), P(xa + 90, 3), P(xa + 30, 8), P(xa + 6, 34), P(xa - 4, 70), P(xa + 4, 112), P(xa + 16, 140), ...dessus,
      P(xb - 12, 118), P(xb + 4, 90), P(xb - 2, 52), P(xb - 12, 18), P(xb - 60, 2), P(xb - 220, -1)]);
    out.push(pierre(dDorm));

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
    for (let i = 0; i < 4; i++) { const x = xm + mL / 2 + 10 + i * 11 + Rg() * 3; gpts.push(P(x, haut(x) + 3.5)); }
    out.push(grains(gpts, 2, 1.1, 3));

    // la molette tirée (en tireté) et la molette poussée, et la main qui appuie dessus
    out.push(h.path(molette(xg), A.cache));
    out.push(pierre(molette(xm)));

    // le personnage à genoux, penché par-dessus la molette, les bras tendus : le poids du corps
    // passe par les deux paumes à plat sur le dessus de la molette (la main loin, juste derrière)
    const topM = haut(xm) + mH - 1;
    const prise = dx => ({ x: X(xm - 40 + dx), y: Y(topM), pose: 'appui', vue: 'profil', bras: 40 });
    const pers = F.personnage({ x: xk, y: y0, pose: 'genoux', echelle: e, penche: PENCHE, regard: 26,
      prises: { proche: prise(0), loin: prise(-22) } });
    out.push(pers.toString());
    // le va-et-vient
    const yF = Y(haut((xg + xm) / 2) + 44);
    out.push(double(X(xg + mL / 2 + 8), yF, X(xm - mL / 2 - 8), yF));
    return out.join('\n');
  };

  // ─── vue 2 : de dessus ──────────────────────────────────────────────────────────────────
  const geoD = z => {
    const xmin = xa - 30, xmax = xb + 20, ymin = -240, ymax = 300;
    const e = Math.min((z.l - 16) / (xmax - xmin), (z.h - 12) / (ymax - ymin));
    const X = mm => (z.l - (xmax - xmin) * e) / 2 + (mm - xmin) * e, Y = mm => 6 + (mm - ymin) * e, P = (x, y) => [X(x), Y(y)];
    return { e, X, Y, P };
  };
  const dessus = z => {
    const { e, X, Y, P } = geoD(z);
    const out = [];
    // la pierre dormante, en plan : un ovale de pierre, et le creux usé
    const dPl = lisse([P(xa, -10), P(xa + 26, -150), P(xa + 180, -200), P(xa + 420, -204), P(xb - 60, -172), P(xb, -40),
      P(xb - 8, 92), P(xb - 72, 182), P(xa + 330, 206), P(xa + 120, 192), P(xa + 18, 122)]);
    out.push(pierre(dPl));
    const dCreux = lisse([P(xa + 45, 0), P(xa + 95, -132), P(xa + 340, -156), P(xb - 75, -124), P(xb - 28, 0),
      P(xb - 75, 124), P(xa + 340, 156), P(xa + 95, 132)]);
    out.push(h.path(dCreux, A.detail));
    // le grain étalé devant la molette
    const Rg = hasard(17), gp = [];
    while (gp.length < 16) gp.push(P(xm + mL / 2 + 12 + Rg() * 40, -115 + Rg() * 230));
    out.push(grains(gp, 2.6, 1.3, 9));
    // la mouture au bout
    const polyTas = [P(xb - 125, -100), P(xb - 80, -122), P(xb - 40, -80), P(xb - 30, 0), P(xb - 40, 80), P(xb - 80, 122), P(xb - 125, 100), P(xb - 110, 0)];
    out.push(h.path(lisse(polyTas), A.blanc), h.path(lisse(polyTas), A.detail));
    const polyS = [];
    for (let i = 0; i < 40; i++) {           // le polygone lissé, pour le semis
      const k = i / 40 * polyTas.length, j = Math.floor(k);
      const a = polyTas[j], b = polyTas[(j + 1) % polyTas.length], t = k - j;
      polyS.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
    out.push(semis(polyS, 260, 0.5, 23));
    // la molette tirée (en tireté) et la molette poussée
    const molP = c => {
      const m2 = mL / 2;
      return lisse([P(c - m2, 0), P(c - m2 + 3, -170), P(c - m2 + 28, -224), P(c, -232), P(c + m2 - 28, -224),
        P(c + m2 - 3, -170), P(c + m2, 0), P(c + m2 - 3, 170), P(c + m2 - 28, 224), P(c, 232), P(c - m2 + 28, 224), P(c - m2 + 3, 170)]);
    };
    out.push(h.path(molP(xg), A.cache));
    out.push(pierre(molP(xm)));
    // les deux mains à plat sur la molette ; les avant-bras filent jusqu'au bord de la vue, vers le
    // personnage à genoux derrière la pierre
    const BRAS_D = Math.round((xm - 4 - 95 - (xa - 30)) );
    out.push(F.main({ x: X(xm - 4), y: Y(122), pose: 'appui', vue: 'dos', echelle: e, bras: BRAS_D }).toString());
    out.push(F.main({ x: X(xm - 4), y: Y(-122), pose: 'appui', vue: 'dos', echelle: e, bras: BRAS_D, cote: 'gauche', angle: 180 }).toString());
    // le va-et-vient
    out.push(double(X(xg), Y(272), X(xm), Y(272)));
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
    // le bol, sous le tamis
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
    // le cadre, ses faces, et la moustiquaire
    const faceAv = [Ao, Bo, add(Bo, [0, hR]), add(Ao, [0, hR])], faceD = [Bo, Co, add(Co, [0, hR]), add(Bo, [0, hR])];
    out.push(h.chemin(faceAv, A.blanc, true), h.chemin(faceD, A.blanc, true));
    out.push(h.chemin(faceAv, A.hachure('bois', 'arete'), true), h.chemin(faceD, A.hachure('bois', 'arete'), true));
    out.push(h.chemin([Ao, Bo, Co, Do], A.blanc, true));
    out.push(h.chemin([Ai, Bi, add(Bi, d), Di].map((p, i) => i === 2 ? [Bi[0] + (Di[0] - Ai[0]), Di[1]] : p), A.hachure('grillage', 'detail'), true));
    out.push(h.chemin([Ao, Bo, Co, Do], A.arete, true));
    // le son et le germe qui restent sur la moustiquaire
    const Rs = hasard(7), son = [];
    for (let i = 0; i < 18; i++) {
      const a = 0.1 + Rs() * 0.8, b = 0.15 + Rs() * 0.7;
      const p = [Ai[0] + (Bi[0] - Ai[0]) * a + (Di[0] - Ai[0]) * b, Ai[1] + (Di[1] - Ai[1]) * b];
      son.push(lentille(p[0], p[1], 2.6 + Rs() * 1.2, 1.1, Math.round(Rs() * 180), `fill="#fff" ${A.detail.replace('fill="none" ', '')}`));
    }
    out.push(son.join('\n'));
    // on secoue
    const ym = (Ao[1] + Do[1]) / 2 + 4;
    out.push(double(Ao[0] - 36, ym, Ao[0] - 8, ym));
    return out.join('\n');
  };

  return {
    ref: '88-05',
    titre: 'La pierre dormante, la molette et le tamis',
    desc: 'À genoux au bout d’une pierre dormante en cuvette, on pousse et on tire à deux mains une molette allongée sur le grain ; la mouture se ramasse au bout de la pierre. Vue de dessus, les deux mains à plat sur la molette. Le tamis de moustiquaire garde le son et le germe et laisse passer la farine.',
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
            { n: 1, rond: [X(xb) + 40, Y(30)], cible: [X(xb - 70), Y(55)], texte: 'pierre dormante : granit dur' },
            { n: 2, rond: [X(xm) + 30, Y(haut(xm) + mH) - 62], cible: [X(xm + 70), Y(haut(xm) + 40)], texte: 'molette, tenue à deux mains' },
            { n: 3, rond: [X(xb) + 40, Y(haut(xb) + 95)], cible: [X(xb - 70), Y(haut(xb - 70) + 22)], texte: 'la mouture, ramassée au bout' },
          ];
        },
      },
      dessus: {
        titre: 'Vu de dessus : les deux mains sur la molette',
        dessin: dessus,
        renvois: z => {
          const { X, Y } = geoD(z);
          return [
            { n: 4, rond: [X(xm + 190), Y(272)], cible: [X(xm + 140), Y(60)], texte: 'le grain, bien sec' },
          ];
        },
      },
      tamis: {
        titre: 'Le tamis de moustiquaire',
        dessin: tamis,
        renvois: z => {
          const T = geoT(z);
          return [
            { n: 5, rond: [T.Bo[0] + 26, T.Bo[1] + 4], cible: [T.Bi[0] - 8, T.Bi[1] - 5], texte: 'la moustiquaire' },
            { n: 6, rond: [T.Do[0] - 10, T.Do[1] - 14], cible: [T.Di[0] + 22, T.Di[1] + 9], texte: 'son et germe : à la bouillie' },
            { n: 7, rond: [T.bx + T.brx - 8, T.by + 58], cible: [T.bx + 26, T.by + 6], texte: 'la farine qui passe' },
          ];
        },
      },
    },
  };
};
