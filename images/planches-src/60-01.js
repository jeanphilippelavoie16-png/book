// Planche 60-01 — le verveux sur cerceaux : monté (coupe, vu dans l'axe), aile, pose vue de dessus.
// Aucune cote : le chapitre ne donne aucune dimension du verveux (seule la bourolle en a).

const f = n => Math.round(n * 10) / 10;

module.exports = (h) => {
  // Un poisson de profil, tête vers +x, tourné de a degrés autour de (x, y).
  const poisson = (x, y, lg, a = 0) => {
    const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180);
    const p = (u, v) => `${f(x + u * lg * c - v * lg * s)} ${f(y + u * lg * s + v * lg * c)}`;
    const d = `M ${p(0.5, 0)} Q ${p(0.12, -0.24)} ${p(-0.3, -0.07)} L ${p(-0.5, -0.2)} L ${p(-0.41, 0)} ` +
      `L ${p(-0.5, 0.2)} L ${p(-0.3, 0.07)} Q ${p(0.12, 0.24)} ${p(0.5, 0)} Z`;
    const [ox, oy] = p(0.3, -0.03).split(' ').map(Number);
    return h.path(d, 'fill="#fff" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"') + '\n' +
      h.cercle(ox, oy, 1.3, h.a.plein);
  };

  // ─── Géométrie du verveux en coupe ───
  const gCoupe = z => {
    const y0 = z.h / 2, x0 = 30;
    const R0 = Math.min(z.h / 2 - 26, 78);
    const s = (z.l - 100) / 6.9;
    const X = i => x0 + i * s, R = i => R0 * (1 - 0.09 * i);
    const xp = X(6) + s * 0.8, rp = 4;
    // entonnoirs : cerceau d'attache, pointe (x, rayon), cerceau où la pointe est tenue
    const ent = [
      { a: 0, xt: X(1) + s * 0.55, rt: R0 * 0.2, t: 2 },
      { a: 2, xt: X(3) + s * 0.55, rt: R0 * 0.15, t: 4 },
      { a: 4, xt: X(5) + s * 0.55, rt: R0 * 0.11, t: 6 },
    ];
    return { y0, x0, R0, s, X, R, xp, rp, ent };
  };

  const coupe = z => {
    const { y0, R0, s, X, R, xp, rp, ent } = gCoupe(z);
    const out = [];
    const haut = [0, 1, 2, 3, 4, 5, 6].map(i => [X(i), y0 - R(i)]).concat([[xp, y0 - rp]]);
    const bas = haut.map(([x, y]) => [x, 2 * y0 - y]);
    // la charte : l'intérieur de la nappe, vu par la coupe, en gris loin (peint d'abord)
    out.push(h.chemin([...haut, ...bas.slice().reverse()], h.a.loin, true));
    // cerceaux : l'arrière vu par la coupe, puis la section du bois
    for (let i = 0; i <= 6; i++) out.push(h.ligne(X(i), y0 - R(i), X(i), y0 + R(i), h.a.detail));
    // entonnoirs, leur pointe, et les brins qui tiennent la pointe au cerceau suivant
    for (const e of ent) {
      out.push(h.chemin([[X(e.a), y0 - R(e.a)], [e.xt, y0 - e.rt]], h.a.arete));
      out.push(h.chemin([[X(e.a), y0 + R(e.a)], [e.xt, y0 + e.rt]], h.a.arete));
      out.push(h.ellipse(e.xt, y0, 2, e.rt, h.a.detail));
      // les brins qui tiennent la pointe en l'air, tendue vers le cerceau suivant
      out.push(h.chemin([[e.xt, y0 - e.rt], [X(e.t), y0 - R(e.t)]], h.a.detail));
      out.push(h.chemin([[e.xt, y0 + e.rt], [X(e.t), y0 + R(e.t)]], h.a.detail));
    }
    // la nappe : dessus et dessous
    out.push(h.chemin(haut, h.a.contour));
    out.push(h.chemin(bas, h.a.contour));
    for (let i = 0; i <= 6; i++) {
      out.push(h.cercle(X(i), y0 - R(i), 3.4, h.a.plein));
      out.push(h.cercle(X(i), y0 + R(i), 3.4, h.a.plein));
    }
    // la pointe froncée et liée de deux tours
    out.push(h.ligne(xp + 1, y0 - 7, xp + 1, y0 + 7, h.a.arete));
    out.push(h.ligne(xp + 5, y0 - 7, xp + 5, y0 + 7, h.a.arete));
    out.push(h.chemin([[xp + 6, y0 - 3], [xp + 20, y0 - 10]], h.a.detail));
    out.push(h.chemin([[xp + 6, y0], [xp + 21, y0 + 1]], h.a.detail));
    out.push(h.chemin([[xp + 6, y0 + 3], [xp + 19, y0 + 11]], h.a.detail));
    // trajet du poisson : entre par le premier entonnoir, sort à la pointe, revient longer la paroi
    const e = ent[0];
    const mur = t => [X(0) + t * (e.xt - X(0)), y0 + R0 + t * (e.rt - R0)];
    const [ax, ay] = mur(0.12), [bx, by] = mur(0.8);
    const yNet = x => y0 + R0 + (x - X(0)) / s * (R(1) - R0);
    const xc = X(0) + 26, yc = (yNet(xc) + mur((xc - X(0)) / (e.xt - X(0)))[1]) / 2 + 2;
    const d = `M 4 ${f(y0 + R0 * 0.62)} L ${f(ax)} ${f(ay - 9)} L ${f(bx)} ${f(by - 7)} ` +
      `Q ${f(e.xt + 6)} ${f(y0 + 1)} ${f(e.xt + 18)} ${f(y0 + e.rt * 0.8)} ` +
      `Q ${f(e.xt + 34)} ${f(yNet(e.xt + 30) - 10)} ${f(e.xt + 6)} ${f(yNet(e.xt + 6) - 9)} ` +
      `L ${f(X(1))} ${f(yNet(X(1)) - 9)} L ${f(xc)} ${f(yc)}`;
    out.push(h.fleche(d, h.a.cache));
    out.push(poisson(X(3) - s * 0.05, y0 + R(3) * 0.29, s * 0.5, -22));   // dans le 2e entonnoir, le long de sa paroi
    return out.join('\n');
  };

  const coupeRenvois = z => {
    const { y0, R0, s, X, R, xp, ent } = gCoupe(z);
    const [e1, , e3] = ent;
    const surF = (e, t, sgn) => [X(e.a) + t * (e.xt - X(e.a)), y0 + sgn * (R(e.a) + t * (e.rt - R(e.a)))];
    const p2 = surF(e1, 0.45, -1), p4 = surF(e3, 0.5, -1);
    return [
      { n: 1, rond: [X(4) + 12, z.h - 11], cible: [X(4) + 1, y0 + R(4) + 4] },
      { n: 2, rond: [p2[0] + 10, 11], cible: [p2[0], p2[1] + 1] },
      { n: 3, rond: [e1.xt + 34, 11], cible: [e1.xt + 1, y0 - e1.rt - 1] },
      { n: 4, rond: [p4[0] + 14, 11], cible: [p4[0], p4[1] + 1] },
      { n: 5, rond: [xp + 36, y0 - 26], cible: [xp + 3, y0 - 8] },
    ].map((r, i) => ({ ...r, texte: [
      'cerceaux de saule vert',
      'le plus large à l’entrée',
      'pointe bien en dedans',
      'les suivants, plus serrés',
      'pointe froncée et liée',
    ][i] }));
  };

  // ─── Dans une chambre, en regardant l'entrée ───
  const gBout = z => {
    const cx = z.l / 2, cy = z.h / 2, R = Math.min(z.l, z.h) / 2 - 10;
    return { cx, cy, R, rt: R * 0.2, rc: R - 15 };
  };
  const bout = z => {
    const { cx, cy, R, rt, rc } = gBout(z);
    const out = [];
    let rad = '';
    for (let k = 0; k < 16; k++) {
      const a = k * Math.PI / 8;
      rad += `M ${f(cx + (R - 4) * Math.cos(a))} ${f(cy + (R - 4) * Math.sin(a))} L ${f(cx + rt * Math.cos(a))} ${f(cy + rt * Math.sin(a))} `;
    }
    // la charte : par le bout de l'entonnoir, la chambre d'avant, en gris loin
    out.push(h.cercle(cx, cy, rt, h.a.loin));
    out.push(h.path(rad.trim(), h.a.detail));
    out.push(h.cercle(cx, cy, rt, h.a.arete));
    out.push(h.cercle(cx, cy, R - 4, h.a.arete));
    out.push(h.cercle(cx, cy, R, h.a.contour));
    // le poisson tourne le long de la paroi
    const pa = a => [cx + rc * Math.cos(a), cy + rc * Math.sin(a)];
    const [sx, sy] = pa(-Math.PI * 0.95), [ex, ey] = pa(Math.PI * 0.62);
    out.push(h.fleche(`M ${f(sx)} ${f(sy)} A ${f(rc)} ${f(rc)} 0 1 1 ${f(ex)} ${f(ey)}`, h.a.cache));
    const [fx, fy] = pa(-Math.PI * 0.72);
    out.push(poisson(fx, fy, R * 0.42, -130 + 180 + 90 - 180 + 90 - 90 + 0));
    return out.join('\n');
  };
  const boutRenvois = z => {
    const { cx, cy, R, rt, rc } = gBout(z);
    const a = Math.PI * 0.18;
    return [
      { n: 6, rond: [z.l - 12, 12], cible: [cx + rt * 0.72 + 1, cy - rt * 0.72 - 1],
        texte: 'bout au centre, en l’air' },
      { n: 7, rond: [z.l - 12, z.h - 12], cible: [cx + rc * Math.cos(a), cy + rc * Math.sin(a)],
        texte: 'il cherche sur le pourtour' },
    ];
  };

  // ─── L'aile, de face ───
  const gAile = z => {
    const ys = 20, hb = z.h - 30;
    const x1 = 22, x2 = z.l * 0.44, x3 = z.l - 22;
    const r0 = x2 + 22, r1 = x3 - 34;           // la plaque de roche
    const rw = r1 - r0;
    const fond = [[0, hb - 3], [x1, hb - 2], [x2 * 0.6, hb + 1], [x2, hb], [r0, hb + 2],
      [r0 + rw * 0.12, hb - 12], [r0 + rw * 0.3, hb - 9], [r0 + rw * 0.5, hb - 15],
      [r0 + rw * 0.7, hb + 3], [r0 + rw * 0.86, hb - 9], [r1, hb + 1], [x3, hb - 1], [z.l, hb - 2]];
    return { ys, hb, x1, x2, x3, r0, r1, rw, fond, yt: ys + 5 };
  };
  const aile = z => {
    const { ys, hb, x1, x2, x3, r0, r1, rw, fond, yt } = gAile(z);
    const out = [];
    const yFond = x => { for (let i = 1; i < fond.length; i++) { const [ax, ay] = fond[i - 1], [bx, by] = fond[i]; if (x <= bx) return ay + (by - ay) * (x - ax) / (bx - ax); } return fond[fond.length - 1][1]; };
    // le fond : terre meuble, plaque de roche au milieu
    const mou1 = fond.filter(([x]) => x <= r0), roc = fond.filter(([x]) => x >= r0 && x <= r1), mou2 = fond.filter(([x]) => x >= r1);
    out.push(h.chemin([...mou1, [r0, z.h], [0, z.h]], h.a.hachure('terre', 'aucun'), true));
    out.push(h.chemin([...mou2, [z.l, z.h], [r1, z.h]], h.a.hachure('terre', 'aucun'), true));
    out.push(h.chemin([...roc, [r1, z.h], [r0, z.h]], 'fill="#fff" stroke="none"', true));
    out.push(h.chemin([...roc, [r1, z.h], [r0, z.h]], h.a.hachure('pierre', 'aucun'), true));
    out.push(h.chemin(fond, h.a.arete));
    // le pied suit le fond meuble, mais passe en ligne droite sur la roche
    const pied = [...fond.filter(([x]) => x >= x1 && x <= r0), [r0 + rw * 0.12, hb - 13],
      [r0 + rw * 0.5, hb - 16], [r0 + rw * 0.86, hb - 10], ...fond.filter(([x]) => x >= r1 && x <= x3)];
    pied.unshift([x1, yFond(x1) - 1]); pied.push([x3, yFond(x3) - 1]);
    const pied2 = pied.map(([x, y]) => [x, y - 1.5]);
    out.push(h.chemin([[x1, yt], [x3, yt], ...pied2.slice().reverse()], h.a.hachure('grillage', 'aucun'), true));
    out.push(h.chemin([[x1, yt], [x3, yt]], h.a.arete));
    out.push(h.chemin(pied2, h.a.contour));
    // les pierres qui ferment les creux de la roche sous le pied
    for (const [cx, w] of [[r0 + rw * 0.21, 0.16], [r0 + rw * 0.6, 0.18], [r0 + rw * 0.4, 0.1], [r0 + rw * 0.77, 0.1]]) {
      const yb = yFond(cx), yh = hb - 14;
      out.push(h.ellipse(cx, (yb + yh) / 2, rw * w / 2 + 3, (yb - yh) / 2 + 1, 'fill="#fff" stroke="#1A1A1A" stroke-width="1.4"'));
    }
    // lest sur le pied meuble
    for (let x = x1 + 22; x < x2 + 10; x += 30) out.push(h.ellipse(x, yFond(x) - 3, 4.5, 3, h.a.plein));
    for (let x = r1 + 12; x < x3 - 5; x += 30) out.push(h.ellipse(x, yFond(x) - 3, 4.5, 3, h.a.plein));
    // les piquets : la partie enfoncée est cachée
    for (const px of [x1, x2, x3]) {
      const yf = yFond(px);
      out.push(h.chemin([[px - 3.5, 4], [px + 3.5, 4], [px + 3.5, yf], [px - 3.5, yf]], h.a.hachure('bois', 'arete'), true));
      out.push(h.chemin([[px - 3.5, yf], [px - 3.5, yf + 12], [px, yf + 22], [px + 3.5, yf + 12], [px + 3.5, yf]], h.a.cache));
    }
    // la surface de l'eau
    let d = `M 0 ${ys}`;
    for (let x = 0; x < z.l; x += 16) d += ` q 4 -2.5 8 0 t 8 0`;
    out.push(h.path(d, h.a.detail));
    // la charte : le point à contrôler, le pied collé au fond (sinon le poisson passe dessous)
    out.push(h.controle(x2 * 0.5, hb - 3.5, 12));
    return out.join('\n');
  };
  const aileRenvois = z => {
    const { hb, x1, x2, r0, rw, yt } = gAile(z);
    return [
      { n: 8, rond: [x1 + 24, 12], cible: [x1 + 4.5, 12], texte: 'piquet enfoncé au maillet' },
      { n: 9, rond: [x2 * 0.5 + 18, z.h - 11], cible: [x2 * 0.5, hb - 3.5], texte: 'pied lesté, collé au fond' },
      { n: 10, rond: [r0 + rw * 0.6 + 26, z.h - 11], cible: [r0 + rw * 0.6 + 4, hb - 5], texte: 'sur roche, ligne de pierres' },
    ];
  };

  // ─── Posé, vu de dessus ───
  const gPlan = z => {
    const ya = z.h * 0.6, xa = z.l * 0.36, Rp = Math.min(24, z.h * 0.15);
    const sp = (z.l - xa - 80) / 7.4;
    const X = i => xa + i * sp, R = i => Rp * (1 - 0.09 * i);
    const xp = X(6) + sp * 0.8;
    const rive = x => 20 + 5 * Math.sin(x / 47) + 3 * Math.sin(x / 13);
    const xw = 34;
    const w1 = [xw, rive(xw) + 3], w2 = [xw + 20, z.h - 12];
    const xan = z.l - 26;
    return { ya, xa, Rp, sp, X, R, xp, rive, w1, w2, xan };
  };
  const plan = z => {
    const { ya, xa, Rp, sp, X, R, xp, rive, w1, w2, xan } = gPlan(z);
    const out = [];
    const bord = [];
    for (let x = 0; x <= z.l; x += 10) bord.push([x, rive(x)]);
    out.push(h.chemin([...bord, [z.l, 0], [0, 0]], h.a.hachure('terre', 'aucun'), true));
    out.push(h.chemin(bord, h.a.arete));
    // entonnoirs vus à travers la nappe
    for (const [a, t, rt] of [[0, 1.55, 0.2], [2, 3.55, 0.15], [4, 5.55, 0.11]]) {
      const xt = X(0) + t * sp;
      out.push(h.chemin([[X(a), ya - R(a)], [xt, ya - Rp * rt], [xt, ya + Rp * rt], [X(a), ya + R(a)]], h.a.cache));
    }
    const haut = [0, 1, 2, 3, 4, 5, 6].map(i => [X(i), ya - R(i)]).concat([[xp, ya - 3]]);
    out.push(h.chemin(haut, h.a.contour));
    out.push(h.chemin(haut.map(([x, y]) => [x, 2 * ya - y]), h.a.contour));
    for (let i = 0; i <= 6; i++) out.push(h.rect(X(i) - 1.6, ya - R(i) - 1, 3.2, 2 * R(i) + 2, h.a.plein));
    out.push(h.ligne(xp + 2, ya - 5, xp + 2, ya + 5, h.a.arete));
    // les ailes et leurs piquets
    const pA = [X(0), ya - Rp], pB = [X(0), ya + Rp];
    out.push(h.chemin([w1, pA], h.a.contour));
    out.push(h.chemin([w2, pB], h.a.contour));
    for (const [p, q] of [[w1, pA], [w2, pB]])
      for (const t of [0, 0.34, 0.67]) out.push(h.cercle(p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1]), 3.6, h.a.plein));
    // l'ancre, son cordage, la bouée
    out.push(h.ligne(xp + 3, ya, xan - 9, ya, h.a.arete));
    out.push(h.chemin([[xan - 10, ya - 5], [xan - 2, ya - 9], [xan + 9, ya - 6], [xan + 11, ya + 3], [xan + 3, ya + 9], [xan - 8, ya + 6]], h.a.hachure('pierre', 'arete'), true));
    const bx = xan - 4, by = ya - 38;
    out.push(h.ligne(xan, ya - 8, bx, by + 7, h.a.detail));
    out.push(h.cercle(bx, by, 7, 'fill="#fff" stroke="#1A1A1A" stroke-width="2.4"'));
    out.push(h.cercle(bx, by, 2.5, h.a.plein));
    // le chemin du poisson : il longe la rive, bute sur l'aile, la suit jusqu'à l'entrée
    const along = t => [w1[0] + t * (pA[0] - w1[0]), w1[1] + t * (pA[1] - w1[1]) + 9];
    const [ux, uy] = along(0.08), [vx, vy] = along(0.93);
    out.push(h.fleche(`M 28 ${f(rive(28) + 13)} Q ${f(w1[0] - 4)} ${f(rive(w1[0]) + 13)} ${f(ux)} ${f(uy)} L ${f(vx)} ${f(vy)} Q ${f(X(0) - 2)} ${f(ya - 3)} ${f(X(0) + sp * 0.9)} ${f(ya)}`, h.a.cache));
    out.push(poisson(13, rive(13) + 12, 22, 6));
    return out.join('\n');
  };
  const planRenvois = z => {
    const { ya, Rp, X, xp, w1, w2, xan } = gPlan(z);
    const pA = [X(0), ya - Rp], pB = [X(0), ya + Rp];
    const mid = [w2[0] + 0.5 * (pB[0] - w2[0]), w2[1] + 0.5 * (pB[1] - w2[1])];
    const cheminPt = [w1[0] + 0.5 * (pA[0] - w1[0]), w1[1] + 0.5 * (pA[1] - w1[1]) + 9];
    return [
      { n: 11, rond: [mid[0] + 40, z.h - 12], cible: [mid[0] + 2, mid[1] + 4], texte: 'ailes en V vers le chemin' },
      { n: 12, rond: [X(0) + 22, z.h - 11], cible: [X(0) + 3, ya + Rp + 2], texte: 'entrée au sommet du V' },
      { n: 13, rond: [xan, z.h - 11], cible: [xan + 1, ya + 10], texte: 'ancre qui tient l’ensemble' },
      { n: 14, rond: [xan - 36, ya - 40], cible: [xan - 12, ya - 38], texte: 'bouée qui dit où il est' },
      { n: 15, rond: [cheminPt[0] + 6, ya + 2], cible: [cheminPt[0], cheminPt[1] + 5], texte: 'longe la rive, puis l’aile' },
    ];
  };

  return {
    ref: '60-01',
    titre: 'Le verveux sur cerceaux, monté et posé',
    desc: 'Verveux de trois chambres en coupe dans l’axe, avec le trajet du poisson ; une chambre vue vers l’entrée ; ' +
      'une aile de face, piquets et pied au fond ; la pose vue de dessus, ailes en V, ancre et bouée.',
    format: 'pleine',
    disposition: [['coupe'], ['bout', 'aile'], ['plan']],
    hauteurs: [3, 2.4, 2.8],
    largeurs: [[1], [2, 3], [1]],
    vues: {
      coupe: { titre: 'En coupe dans l’axe', dessin: coupe, renvois: coupeRenvois },
      bout: { titre: 'Dans une chambre, vers l’entrée', dessin: bout, renvois: boutRenvois },
      aile: { titre: 'Une aile, de face', dessin: aile, renvois: aileRenvois },
      plan: { titre: 'Posé, vu de dessus', dessin: plan, renvois: planRenvois },
    },
  };
};
