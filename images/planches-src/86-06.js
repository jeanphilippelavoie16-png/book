// 86-06 — Trouver le sud à l'ombre d'un bâton (ch. 86, §9-F « Trouver le sud sans boussole »,
// renvoyé par l'étape 12, « Viser le sud vrai »).
// Le chapitre : un bâton planté droit dans un sol plat, une pierre au bout de l'ombre tous les
// quarts d'heure autour du milieu de la journée ; la pierre la plus proche du bâton marque le
// midi solaire, la ligne du bâton à cette pierre pointe le nord vrai, le sud est à l'opposé.
// Cotes : aucune. Le chapitre ne donne ni la hauteur du bâton ni la taille des pierres.
// La géométrie est vraie, pas dessinée à l'œil : le bout de l'ombre est calculé pour la
// Côte-Nord (latitude de Sept-Îles), le soleil à 15° sous l'équateur céleste (début novembre ou
// début février), de 11 h à 13 h solaires par quarts d'heure. D'où la rangée de pierres qui
// bombe vers le nord aux deux bouts : la pierre de midi est au sommet, la plus proche du bâton,
// et la ligne bâton-pierre de midi tombe d'équerre sur la rangée.
// Vue 1 : le montage en cours (11 h 45), en perspective, l'œil à l'est et en hauteur (nord à
// droite, ouest au fond) : le rayon du soleil rase le bout du bâton et touche le sol là où l'ombre
// finit, où se pose la pierre ; les pierres de 11 h, 11 h 15, 11 h 30 sont déjà là.
// Vue 2 : le même terrain vu de dessus à 13 h, tourné comme la vue 1 (nord à droite, ouest en
// haut), toutes les pierres posées ; traits fins : les ombres passées ; en noir : celle de 13 h.
// Aucune heure n'est écrite sur la planche : le chapitre n'en donne pas.

module.exports = (h) => {
  const r1 = v => Math.round(v * 10) / 10;
  const W = h.a.blanc;
  const RAD = Math.PI / 180;

  // ─── Le soleil ────────────────────────────────────────────────────────────────────────
  const PHI = 50.2 * RAD, DEC = -15 * RAD;
  const soleil = Hdeg => {                       // direction du soleil (est, nord, haut)
    const H = Hdeg * RAD;
    return [
      -Math.cos(DEC) * Math.sin(H),
      Math.sin(DEC) * Math.cos(PHI) - Math.cos(DEC) * Math.cos(H) * Math.sin(PHI),
      Math.sin(DEC) * Math.sin(PHI) + Math.cos(DEC) * Math.cos(H) * Math.cos(PHI),
    ];
  };
  // Bout de l'ombre d'un bâton de hauteur 1 planté en (0, 0) : (est, nord).
  const bout = Hdeg => { const s = soleil(Hdeg); return [-s[0] / s[2], -s[1] / s[2]]; };
  const HEURES = [-15, -11.25, -7.5, -3.75, 0, 3.75, 7.5, 11.25, 15];   // 11 h … 13 h

  // ─── Outils ───────────────────────────────────────────────────────────────────────────
  const d2 = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${r1(p[0])} ${r1(p[1])}`).join(' ');
  // Courbe fermée lisse (Catmull-Rom) par une suite de points.
  const ferme = pts => {
    const n = pts.length, P = i => pts[(i + n) % n];
    let d = `M${r1(pts[0][0])} ${r1(pts[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`;
    }
    return d + ' Z';
  };
  const alea = g => () => { g = (g * 16807) % 2147483647; return g / 2147483647; };
  // Une pierre : un galet irrégulier, rx × ry, un pli sur le dessus.
  const pierre = (cx, cy, rx, ry, g, pli = true) => {
    const q = alea(g * 97 + 13), pts = [];
    for (let k = 0; k < 7; k++) {
      const t = (k / 7) * 2 * Math.PI + q() * 0.4, f = 0.82 + q() * 0.3;
      pts.push([cx + rx * f * Math.cos(t), cy + ry * f * Math.sin(t)]);
    }
    const d = ferme(pts);
    const o = [h.path(d, W), h.path(d, h.a.arete)];
    if (pli) o.push(h.path(`M${r1(cx - rx * 0.45)} ${r1(cy - ry * 0.05)} Q${r1(cx - rx * 0.05)} ${r1(cy - ry * 0.45)} ${r1(cx + rx * 0.4)} ${r1(cy - ry * 0.2)}`, h.a.fin));
    return o.join('\n');
  };
  const cadre = (z, x0, x1, y0, y1, marge) => {
    const s = Math.min((z.l - 2 * marge[0]) / (x1 - x0), (z.h - 2 * marge[1]) / (y1 - y0));
    const ox = (z.l - (x1 - x0) * s) / 2 - x0 * s, oy = (z.h - (y1 - y0) * s) / 2 - y0 * s;
    return { s, P: (x, y) => [ox + x * s, oy + y * s] };
  };

  // ─── Vue 1 : en perspective (orthographique), l'œil à l'est, un peu au nord ────────────
  // Le regard porte vers l'azimut AZ (presque plein ouest) : le nord est à droite, l'ouest au
  // fond (en haut), le soleil du sud arrive par la gauche. Comme la vue 2, tournée pareil.
  const AZ = 262 * RAD, EL = 32 * RAD;
  const proj = (x, y, zz) => {
    const X = x * Math.cos(AZ) - y * Math.sin(AZ);
    const prof = x * Math.sin(AZ) + y * Math.cos(AZ);
    return [X, -(zz * Math.cos(EL) + prof * Math.sin(EL))];
  };
  const H1 = -3.75;                               // 11 h 45 : la pierre qu'on vient de poser
  const posees = HEURES.filter(t => t <= H1);
  const RAYON = 0.9;                             // longueur du rayon dessiné au-delà du bâton
  // Le sol plat : une place de terre battue autour du bâton et des pierres (est, nord).
  // Étroite au pied du bâton, large sous la rangée de pierres (est, nord).
  const SOL = (() => {
    const q = alea(7);
    const demi = [[0, -0.52], [0.34, -0.4], [0.55, 0.3], [0.72, 1.2], [0.86, 2.0], [0.8, 2.5], [0.42, 2.72]];
    const pts = [...demi, [0, 2.78], ...demi.slice(1).reverse().map(p => [-p[0], p[1]])];
    return pts.map(p => [p[0] * (0.96 + q() * 0.08), p[1] + (q() - 0.5) * 0.06]);
  })();
  const scene = (() => {
    const pts = [proj(0, 0, 0), proj(0, 0, 1)];
    const s = soleil(H1);
    pts.push(proj(s[0] * RAYON, s[1] * RAYON, 1 + s[2] * RAYON));
    posees.forEach(t => { const b = bout(t); pts.push(proj(b[0], b[1], 0)); });
    SOL.forEach(p => pts.push(proj(p[0], p[1], 0)));
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    return { x0: Math.min(...xs) - 0.05, x1: Math.max(...xs) + 0.05, y0: Math.min(...ys) - 0.03, y1: Math.max(...ys) + 0.03 };
  })();
  const cadreGeste = z => cadre(z, scene.x0, scene.x1, scene.y0, scene.y1, [10, 8]);

  // Une touffe d'herbe : trois brins qui s'écartent.
  const touffe = (x, y, k) => h.path(`M${r1(x - 1)} ${r1(y)} q-1 -${r1(3 * k)} -${r1(2.6 * k)} -${r1(4.2 * k)} M${r1(x)} ${r1(y)} q0.4 -${r1(3.4 * k)} 0.2 -${r1(5.4 * k)} M${r1(x + 1)} ${r1(y)} q1 -${r1(2.6 * k)} ${r1(2.8 * k)} -${r1(3.6 * k)}`, h.a.fin);

  const vueGeste = z => {
    const c = cadreGeste(z), s = c.s, out = [];
    const Q = (x, y, zz) => c.P(...proj(x, y, zz));
    const bN = bout(H1);
    // Le sol plat : une place de terre battue, bordée d'herbe.
    const sol = SOL.map(p => Q(p[0], p[1], 0));
    out.push(h.path(ferme(sol), h.a.fin));
    sol.forEach((p, i) => { if (i % 2) return; out.push(touffe(p[0], p[1], 0.9 + (i % 4) * 0.12)); });
    // L'ombre du bâton : une bande noire sur le sol, du pied du bâton jusqu'au bout.
    const e = 0.02, L = Math.hypot(bN[0], bN[1]), n = [-bN[1] / L, bN[0] / L];
    const ombre = [Q(n[0] * e, n[1] * e, 0), Q(bN[0] + n[0] * e * 0.5, bN[1] + n[1] * e * 0.5, 0),
      Q(bN[0] - n[0] * e * 0.5, bN[1] - n[1] * e * 0.5, 0), Q(-n[0] * e, -n[1] * e, 0)];
    out.push(h.path(d2(ombre) + ' Z', h.a.plein));
    // Les pierres : 11 h, 11 h 15, 11 h 30 déjà posées, celle de 11 h 45 au bout de l'ombre.
    const rx = 0.06 * s, ry = rx * 0.55;
    posees.slice().reverse().forEach((t, i) => {
      const [px, py] = Q(...bout(t), 0);
      out.push(pierre(px + rx * 0.35, py - ry * 0.3, rx, ry, 3 + i));
    });
    // Le bâton, planté droit : la terre remuée au pied, le bout coupé en haut.
    const pied = Q(0, 0, 0), haut = Q(0, 0, 1), lb = 0.022 * s;
    out.push(h.ellipse(pied[0], pied[1], lb * 2.8, lb * 2.8 * Math.sin(EL), h.a.fin));
    out.push(h.path(d2([[pied[0] - lb, pied[1]], [haut[0] - lb * 0.85, haut[1]], [haut[0] + lb * 0.85, haut[1]], [pied[0] + lb, pied[1]]]) + ' Z', W));
    out.push(h.ligne(pied[0] - lb, pied[1], haut[0] - lb * 0.85, haut[1], h.a.contour));
    out.push(h.ligne(pied[0] + lb, pied[1], haut[0] + lb * 0.85, haut[1], h.a.contour));
    out.push(h.ellipse(haut[0], haut[1], lb * 0.85, lb * 0.85 * Math.sin(EL), W), h.ellipse(haut[0], haut[1], lb * 0.85, lb * 0.85 * Math.sin(EL), h.a.arete));
    [0.28, 0.6].forEach((f, i) => {           // l'écorce : deux nœuds
      const y = pied[1] + (haut[1] - pied[1]) * f, sg = i ? -1 : 1;
      out.push(h.path(`M${r1(pied[0] + sg * lb * 0.2)} ${r1(y)} q${r1(sg * lb * 0.6)} -2.5 0 -6`, h.a.fin));
    });
    // Le rayon du soleil : il rase le bout du bâton et touche le sol au bout de l'ombre.
    const sd = soleil(H1), a0 = Q(sd[0] * RAYON, sd[1] * RAYON, 1 + sd[2] * RAYON);
    const tip = Q(bN[0], bN[1], 0);
    const dx = tip[0] - a0[0], dy = tip[1] - a0[1], D = Math.hypot(dx, dy);
    const fin = [tip[0] - dx / D * 4, tip[1] - dy / D * 4];
    out.push(h.fleche(`M${r1(a0[0])} ${r1(a0[1])} L${r1(fin[0])} ${r1(fin[1])}`, h.a.cache));
    return out.join('\n');
  };

  // ─── Vue 2 : de dessus, tournée comme la vue 1 (nord à droite, ouest en haut) ──────────
  const plan = (() => {
    const bs = HEURES.map(bout);
    const xs = bs.map(b => b[0]), ys = bs.map(b => b[1]);
    const sx = SOL.map(p => p[0]), sy = SOL.map(p => p[1]);
    return { bs, u0: Math.min(-0.75, ...sy) - 0.02, u1: Math.max(Math.max(...ys) + 0.4, ...sy) + 0.02, v0: Math.min(...xs, ...sx) - 0.04, v1: Math.max(...xs, ...sx) + 0.04 };
  })();
  const planCadre = z => {
    const c = cadre(z, plan.u0, plan.u1, plan.v0, plan.v1, [12, 12]);
    return { s: c.s, P: (x, y) => c.P(y, x) };  // nord → droite, est → bas
  };
  const vuePlan = z => {
    const c = planCadre(z), s = c.s, out = [], P = c.P;
    const b0 = P(0, 0), midi = plan.bs[HEURES.indexOf(0)];
    // La même place de terre battue, vue d'en haut.
    out.push(h.path(ferme(SOL.map(p => P(p[0], p[1]))), h.a.fin));
    // La ligne nord-sud : du sud, par le bâton et la pierre de midi, jusqu'au nord.
    const nord = P(0, midi[1] + 0.3), sud = P(0, -0.62);
    out.push(h.ligne(sud[0], sud[1], nord[0], nord[1], h.a.arete));
    // Les ombres des quarts d'heure passés : un trait fin du bâton à chaque pierre.
    const der = HEURES.length - 1;
    plan.bs.forEach((b, i) => {
      if (HEURES[i] === 0 || i === der) return;
      const p = P(b[0], b[1]);
      out.push(h.ligne(b0[0], b0[1], p[0], p[1], h.a.fin));
    });
    // L'ombre de 13 h, en noir, jusqu'à la dernière pierre.
    const bD = plan.bs[der], L = Math.hypot(bD[0], bD[1]), n = [-bD[1] / L, bD[0] / L], e = 0.02;
    out.push(h.path(d2([P(n[0] * e, n[1] * e), P(bD[0] + n[0] * e * 0.5, bD[1] + n[1] * e * 0.5),
      P(bD[0] - n[0] * e * 0.5, bD[1] - n[1] * e * 0.5), P(-n[0] * e, -n[1] * e)]) + ' Z', h.a.plein));
    // Les pierres.
    const rx = 0.058 * s;
    plan.bs.forEach((b, i) => {
      const p = P(b[0], b[1]);
      out.push(pierre(p[0], p[1], rx, rx * 0.82, 11 + i));
    });
    // Le bâton vu d'en haut : le bout coupé, la terre remuée autour.
    const lb = 0.022 * s;
    out.push(h.cercle(b0[0], b0[1], lb * 2.8, h.a.fin));
    out.push(h.cercle(b0[0], b0[1], lb, W), h.cercle(b0[0], b0[1], lb, h.a.contour));
    return out.join('\n');
  };

  return {
    ref: '86-06',
    titre: 'Trouver le sud à l’ombre d’un bâton',
    desc: 'Un bâton planté droit dans un sol plat, vu en perspective un peu avant midi : le rayon du soleil rase son bout et touche le sol là où finit son ombre, et une pierre est posée à ce bout à chaque quart d’heure. Vu de dessus, nord à droite, toutes les pierres posées : la rangée bombe vers le nord aux deux bouts ; la pierre du sommet, la plus proche du bâton, marque le midi solaire, la ligne du bâton à cette pierre pointe le nord vrai, et le sud est à l’opposé.',
    format: 'pleine',
    disposition: [['geste'], ['plan']],
    hauteurs: [1, 1.05],
    vues: {
      geste: {
        titre: 'Une pierre au bout de l’ombre',
        dessin: vueGeste,
        renvois: z => {
          const c = cadreGeste(z);
          const Q = (x, y, zz) => c.P(...proj(x, y, zz));
          const mat = Q(0, 0, 0.62), bN = bout(H1);
          const om = Q(bN[0] * 0.5, bN[1] * 0.5, 0), pi = Q(bN[0], bN[1], 0);
          return [
            { n: 1, rond: [mat[0] + 34, mat[1] - 10], cible: [mat[0] + 5, mat[1]], texte: 'le bâton, planté droit dans un sol plat' },
            { n: 2, rond: [om[0] + 6, om[1] + 34], cible: [om[0], om[1] + 3], texte: 'son ombre' },
            { n: 3, rond: [pi[0] + 30, pi[1] + 30], cible: [pi[0] + 6, pi[1] + 2], texte: 'une pierre au bout, chaque quart d’heure' },
          ];
        },
      },
      plan: {
        titre: 'Vu de dessus, toutes les pierres posées',
        dessin: vuePlan,
        renvois: z => {
          const c = planCadre(z), P = c.P, s = c.s;
          const midi = plan.bs[HEURES.indexOf(0)];
          const pm = P(0, midi[1]), no = P(0, midi[1] + 0.26), su = P(0, -0.55);
          return [
            { n: 4, rond: [pm[0] + 40, pm[1] + 36], cible: [pm[0] + 0.05 * s, pm[1] + 0.04 * s], texte: 'la plus proche : le midi solaire' },
            { n: 5, rond: [no[0] + 8, no[1] - 30], cible: [no[0], no[1] - 1], texte: 'du bâton à cette pierre : nord vrai' },
            { n: 6, rond: [su[0] - 6, su[1] - 30], cible: [su[0], su[1] - 1], texte: 'le sud, à l’opposé' },
          ];
        },
      },
    },
  };
};
