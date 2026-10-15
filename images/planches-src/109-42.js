// Planche 109-42. Les ancrages sans anneau : la bille enterrée, les piquets en file, deux arbres.
// Chapitre 109, §9, « Les ancrages, quand il n'y a pas d'anneau nulle part » :
//   - la bille enterrée : couchée en travers de la traction dans une tranchée, le câble qui sort par
//     une saignée inclinée vers le bas (la traction enfonce l'ancrage au lieu de le soulever), une
//     planche debout contre la face avant ;
//   - les piquets en file : trois pieux en ligne dans l'axe de la traction, inclinés en arrière, la
//     tête de chacun amarrée au pied du suivant, bien tendu ;
//   - l'arbre : vivant, sain, le plus bas possible, une sangle ou plusieurs tours de corde ; deux
//     arbres se partagent la traction par une bride en V égalisée.
// Ce que le chapitre ne dit pas et que la planche dessine, d'après US Army FM 5-125, ch. 4
// (sources/109-us-army-fm5-125-ancrages-piquets-bille.md) : l'inclinaison des pieux, d'environ 15°
// sur la verticale, tête loin de la traction ; l'amarrage tendu en tordant un bâton passé entre les
// tours, puis planté (le tourniquet de la 109-12) ; le câble qui part du dessous de la bille et la
// face avant de la tranchée en contre-dépouille. Aucune cote : le chapitre n'en donne pas.
// La charge est à droite dans les trois vues de côté.
module.exports = (h) => {
  const A = h.a;
  const BL = '#FFFFFF';
  const blanc = t => A[t].replace('fill="none"', `fill="${BL}"`);
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
  const CABLE = `fill="none" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;

  // une pièce droite de a à b, section w ; bout pointu en a (pieu) si pointe
  const piece = (a, b, w, at, { pointe = false } = {}) => {
    const u = uni(sub(b, a)), n = nor(u), e = w / 2;
    const bas = pointe ? [add(add(a, u, w * 1.1), n, -e), a, add(add(a, u, w * 1.1), n, e)] : [add(a, n, -e), add(a, n, e)];
    return h.path(poly([...bas, add(b, n, e), add(b, n, -e)]), at);
  };

  // ─── Vue 1 : la bille enterrée, en coupe ────────────────────────────────────────────────
  const B = z => {
    const yS = 30, xT0 = 150, prof = Math.min(104, z.h - yS - 22), yB = yS + prof, xT1 = 238;
    const dep = Math.tan(14 * RAD) * prof;          // la face avant en contre-dépouille
    const R = 25, C = [xT1 + dep - 8 - R - 4, yB - R];
    const sortie = [C[0] + 4, yB - 3];              // le câble part du dessous de la bille
    const pente = Math.tan(17 * RAD), xSurf = sortie[0] + (sortie[1] - yS) / pente;
    return { yS, xT0, xT1, yB, prof, dep, R, C, sortie, pente, xSurf };
  };
  const vueBille = z => {
    const q = B(z), { yS, xT0, xT1, yB, dep, R, C, sortie, pente, xSurf } = q, out = [];
    const av = y => xT1 + dep * (y - yS) / (yB - yS);        // x de la face avant à la hauteur y
    const ys = 3.5;                                          // demi-largeur de la saignée
    // le terrain en place, hachuré, la tranchée et la saignée découpées dedans
    const terrain = [[0, yS], [xT0, yS], [xT0, yB], [av(yB), yB], [av(yB - 2 * ys - 2), yB - 2 * ys - 2],
      [sortie[0] + 30, yB - 2 * ys - 2 - 30 * pente], [xSurf - ys / pente, yS], [z.l, yS], [z.l, z.h - 1], [0, z.h - 1]];
    // la saignée : sous le câble, de la face avant jusqu'à la surface
    const sg = [[av(yB - 2 * ys - 2), yB - 2 * ys - 2], [av(yB), yB], [xSurf + ys / pente, yS], [xSurf - ys / pente, yS],
      [sortie[0] + 30, yB - 2 * ys - 2 - 30 * pente]];
    out.push(h.path(poly([[0, yS], [xT0, yS], [xT0, yB], [av(yB), yB], [xSurf + ys / pente, yS], [z.l, yS], [z.l, z.h - 1], [0, z.h - 1]]), A.hachure('terre', 'aucun')));
    // le remblai, tassé par-dessus la bille
    out.push(h.path(poly([[xT0, yS], [xT1, yS], [av(C[1] - R - 2), C[1] - R - 2], [xT0, C[1] - R - 2]]), A.hachure('gravier', 'aucun')));
    // la saignée, vide
    out.push(h.path(poly([[av(yB - 2 * ys - 4), yB - 2 * ys - 4], [av(yB), yB], [xSurf + ys / pente, yS], [xSurf - ys / pente - 2, yS]]), A.blanc));
    // les parois : la tranchée et la saignée
    out.push(h.path(poly([[0, yS], [xT0, yS], [xT0, yB], [av(yB), yB], [xSurf + ys / pente, yS], [z.l, yS]], false), A.arete));
    out.push(h.path(poly([[xT1, yS], [av(yB - 2 * ys - 4), yB - 2 * ys - 4], [xSurf - ys / pente - 2, yS]], false), A.arete));
    out.push(h.ligne(xT0, C[1] - R - 2, av(C[1] - R - 2), C[1] - R - 2, A.detail));
    // la bille, coupée, et la planche debout contre sa face avant
    const pl = [C[0] + R + 1, C[1] - R - 6];
    const plH = 2 * R - 2, plW = 7;
    out.push(h.path(poly([[av(pl[1]) - plW, pl[1]], [av(pl[1]), pl[1]], [av(pl[1] + plH), pl[1] + plH], [av(pl[1] + plH) - plW, pl[1] + plH]]), A.hachure('bois', 'contour')));
    out.push(h.cercle(C[0], C[1], R, A.hachure('bois', 'contour')));
    out.push(h.cercle(C[0], C[1], R * 0.45, A.fin));
    // le câble : deux tours autour de la bille, puis il part du dessous dans la saignée
    out.push(h.path(`M ${pt([C[0] - R - 2.5, C[1]])} A ${R + 2.5} ${R + 2.5} 0 1 1 ${pt([C[0] + 2, C[1] + R + 2.5])}`, CABLE));
    out.push(h.path(`M ${pt([C[0] + 2, C[1] + R + 2.5])} L ${pt([av(yB) - 2, yB - ys])} L ${pt([xSurf + 6 / pente, yS - 6])} L ${pt([z.l - 6, yS - 6 - (z.l - 6 - xSurf - 6 / pente) * pente])}`, CABLE));
    // le sens de la traction, vers la charge
    const fx = z.l - 70, fy = yS - 6 - (fx - xSurf - 6 / pente) * pente;
    out.push(h.fleche(`M ${pt([fx, fy - 14])} L ${pt([fx + 40, fy - 14 - 40 * pente])}`, A.arete));
    return out.join('\n');
  };
  const renvoisBille = z => {
    const q = B(z), { yS, xT0, xT1, yB, dep, R, C, sortie, pente, xSurf } = q;
    const av = y => xT1 + dep * (y - yS) / (yB - yS);
    const sg = lerp([av(yB), yB - 4], [xSurf, yS - 4], 0.55);
    return [
      { n: 1, rond: [xT0 - 52, yS + 30], cible: [xT0 - 1, yS + 30], texte: 'tranchée en travers de la traction' },
      { n: 2, rond: [xT0 - 52, C[1] + 8], cible: [C[0] - R - 1, C[1] + 6], texte: 'bille couchée au fond' },
      { n: 3, rond: [xT1 + 60, yS + 24], cible: [av(C[1] - R + 4) - 3, C[1] - R + 6], texte: 'planche debout contre la face avant' },
      { n: 4, rond: [C[0] + 4, yB + 24 > z.h - 10 ? z.h - 10 : yB + 24], cible: [C[0] + 4, C[1] + R + 4], texte: 'le câble part du dessous' },
      { n: 5, rond: [sg[0] + 10, sg[1] + 40], cible: [sg[0], sg[1] + 8], texte: 'saignée inclinée vers le bas' },
    ];
  };

  // ─── Vue 2 : les piquets en file, de côté ───────────────────────────────────────────────
  // Trois pieux de 1,5 m, enfoncés aux trois cinquièmes, à environ 15° de la verticale, la tête
  // vers l'arrière ; espacés de 1,3 m. Le premier, du côté de la charge, est à droite.
  const P = z => {
    const k = 0.075, yg = 58, inc = 15 * RAD;
    const xs = [z.l * 0.72, z.l * 0.72 - 1300 * k, z.l * 0.72 - 2600 * k];
    const pieux = xs.map(x => {
      const pied = [x + Math.sin(inc) * 900 * k, yg + Math.cos(inc) * 900 * k];   // la pointe, dans le sol
      const tete = [x - Math.sin(inc) * 600 * k, yg - Math.cos(inc) * 600 * k];
      return { x, pied, tete, sol: [x, yg] };
    });
    return { k, yg, pieux, w: 80 * k };
  };
  const vuePiquets = z => {
    const q = P(z), { k, yg, pieux, w } = q, out = [];
    out.push(h.rect(0, yg, z.l, z.h - yg - 1, A.hachure('terre', 'aucun')));
    out.push(h.ligne(0, yg, z.l, yg, A.arete));
    // les pieux
    for (const p of pieux) out.push(piece(p.pied, p.tete, w, blanc('contour'), { pointe: true }));
    // l'amarrage : de la tête de chacun au pied du suivant, quelques tours, tordus au bâton
    for (let i = 0; i < 2; i++) {
      const a = pieux[i].tete, b = pieux[i + 1].sol;
      const a1 = add(a, [0, 3]), b1 = add(b, [0, -3]);
      const m = lerp(a1, b1, 0.5), u = uni(sub(b1, a1)), n = nor(u);
      // les tours, ouverts de part et d'autre du bâton, refermés en torsade au milieu
      for (const s of [-1, 1]) {
        const e = 3.2 * s;
        out.push(h.path(`M ${pt(add(a1, n, e * 0.5))} Q ${pt(add(lerp(a1, m, 0.5), n, e * 1.4))} ${pt(add(m, u, -9))} M ${pt(add(m, u, 9))} Q ${pt(add(lerp(m, b1, 0.5), n, e * 1.4))} ${pt(add(b1, n, e * 0.5))}`, A.arete));
      }
      // la torsade
      for (let j = -2; j <= 2; j++) {
        const c = add(m, u, j * 3.6);
        out.push(h.path(`M ${pt(add(add(c, n, 3), u, -2))} L ${pt(add(add(c, n, -3), u, 2))}`, A.arete));
      }
      // le bâton, planté en terre en avant
      const bt0 = add(m, [0, 0]), bt1 = [m[0] + 30, yg + 16];
      out.push(piece(bt1, add(m, uni(sub(m, bt1)), 10), 4.5, blanc('arete'), { pointe: true }));
    }
    // le câble, amarré au pied du premier, vers la charge
    const p0 = pieux[0];
    out.push(h.path(`M ${pt([p0.x + 3, yg - 7])} C ${pt([p0.x - 6, yg - 9])} ${pt([p0.x - 6, yg - 1])} ${pt([p0.x + 3, yg - 3])}`, CABLE));
    out.push(h.path(`M ${pt([p0.x + 3, yg - 5])} L ${pt([z.l - 6, yg - 9])}`, CABLE));
    out.push(h.fleche(`M ${pt([z.l - 66, yg - 24])} L ${pt([z.l - 26, yg - 26])}`, A.arete));
    return out.join('\n');
  };
  const renvoisPiquets = z => {
    const q = P(z), { yg, pieux, k } = q;
    const m0 = lerp(pieux[0].tete, pieux[1].sol, 0.5), m1 = lerp(pieux[1].tete, pieux[2].sol, 0.5);
    const t2 = lerp(pieux[2].tete, pieux[2].sol, 0.3);
    return [
      { n: 6, rond: [t2[0] - 46, t2[1] - 8], cible: [t2[0] - 4, t2[1]], texte: 'pieux inclinés en arrière, en file' },
      { n: 7, rond: [m1[0] - 6, 14], cible: [m1[0] + 8, m1[1] - 9], texte: 'tête amarrée au pied du suivant' },
      { n: 8, rond: [m0[0] + 46, yg + 36], cible: [m0[0] + 22, yg + 8], texte: 'tordu au bâton, puis planté' },
      { n: 9, rond: [pieux[0].x + 40, 16], cible: [pieux[0].x + 6, yg - 7], texte: 'câble au pied du premier' },
    ];
  };

  // ─── Vue 3 : deux arbres, vus de dessus ─────────────────────────────────────────────────
  // Une sangle autour de chaque tronc, du côté opposé à la charge ; deux brins de même longueur
  // qui se rejoignent à une manille ; le câble part de là vers la charge, sur la bissectrice.
  const V = z => {
    const r = 21, xT = 46, y1 = 34, y2 = z.h - 34, M_ = [z.l - 120, (y1 + y2) / 2];
    return { r, xT, y1, y2, M: M_ };
  };
  const tronc = (c, r) => [h.cercle(c[0], c[1], r, blanc('contour')), h.cercle(c[0], c[1], r * 0.62, A.fin), h.cercle(c[0], c[1], r * 0.28, A.fin)].join('\n');
  const sangle = (c, r, vers) => {
    // la sangle passe derrière le tronc et ses deux bouts reviennent devant, côté charge
    const u = uni(sub(vers, c)), n = nor(u), e = r + 3.5;
    const g = add(c, n, e), d = add(c, n, -e), dev = add(c, u, r + 14);
    return `M ${pt(dev)} L ${pt(add(g, u, 2))} A ${e} ${e} 0 1 0 ${pt(add(d, u, 2))} L ${pt(dev)}`;
  };
  const vueBride = z => {
    const q = V(z), { r, xT, y1, y2, M: M_ } = q, out = [];
    const T1 = [xT, y1], T2 = [xT, y2];
    const d1 = add(T1, uni(sub(M_, T1)), r + 14), d2 = add(T2, uni(sub(M_, T2)), r + 14);
    out.push(tronc(T1, r), tronc(T2, r));
    out.push(h.path(sangle(T1, r, M_), A.arete), h.path(sangle(T2, r, M_), A.arete));
    out.push(h.ligne(d1[0], d1[1], M_[0] - 4, M_[1] - 2, CABLE), h.ligne(d2[0], d2[1], M_[0] - 4, M_[1] + 2, CABLE));
    // la manille, le câble vers la charge
    out.push(h.ellipse(M_[0], M_[1], 7, 5, blanc('arete')));
    out.push(h.ligne(M_[0] + 7, M_[1], z.l - 6, M_[1], CABLE));
    out.push(h.fleche(`M ${pt([z.l - 60, M_[1] - 14])} L ${pt([z.l - 22, M_[1] - 14])}`, A.arete));
    return out.join('\n');
  };
  const renvoisBride = z => {
    const q = V(z), { r, xT, y1, y2, M: M_ } = q;
    const m1 = lerp([xT, y1], M_, 0.62);
    return [
      { n: 10, rond: [xT + 60, (y1 + y2) / 2], cible: [xT + r + 2, (y1 + y2) / 2 - 2], texte: 'deux arbres vivants, sains' },
      { n: 11, rond: [m1[0] + 10, m1[1] - 30], cible: [m1[0], m1[1] - 1], texte: 'deux brins égaux, tendus pareil' },
    ];
  };

  // ─── Vue 4 : un arbre, de côté ──────────────────────────────────────────────────────────
  const vueArbre = z => {
    const out = [], yg = z.h - 16, xc = 60, w = 38;
    out.push(h.rect(0, yg, z.l, z.h - yg - 1, A.hachure('terre', 'aucun')));
    // le tronc, l'empattement des racines, l'ombre à droite
    const tr = [[xc - w / 2, 0], [xc - w / 2, yg - 22], [xc - w / 2 - 10, yg], [xc + w / 2 + 10, yg], [xc + w / 2, yg - 22], [xc + w / 2, 0]];
    out.push(h.path(poly(tr), A.blanc));
    out.push(h.path(poly([[xc + w / 6, 0], [xc + w / 2, 0], [xc + w / 2, yg - 22], [xc + w / 2 + 10, yg], [xc + w / 6, yg]]), A.ombre));
    out.push(h.path(poly(tr, false), A.contour));
    for (const [x, a, b] of [[-8, 10, 60], [5, 30, 90], [-2, 80, 120]]) out.push(h.ligne(xc + x, a, xc + x, Math.min(b, yg - 40), A.fin));
    out.push(h.ligne(0, yg, z.l, yg, A.arete));
    // la sangle large au pied du tronc, et le câble vers la charge
    const ys = yg - 34;
    out.push(h.rect(xc - w / 2 - 2, ys - 7, w + 4, 14, blanc('arete')));
    out.push(h.ligne(xc - w / 2, ys - 2, xc + w / 2, ys - 2, A.fin), h.ligne(xc - w / 2, ys + 2, xc + w / 2, ys + 2, A.fin));
    out.push(h.ligne(xc + w / 2 + 2, ys, z.l - 6, ys, CABLE));
    out.push(h.fleche(`M ${pt([z.l - 52, ys - 14])} L ${pt([z.l - 16, ys - 14])}`, A.arete));
    return out.join('\n');
  };
  const renvoisArbre = z => {
    const yg = z.h - 16, ys = yg - 34;
    return [
      { n: 12, rond: [118, ys - 52], cible: [80, ys - 7], texte: 'sangle large, le plus bas possible' },
    ];
  };

  return {
    ref: '109-42',
    titre: 'Les ancrages sans anneau',
    desc: 'Trois ancrages qu’on fait sans anneau. En coupe, la bille enterrée : une tranchée creusée en travers de la traction, la bille couchée au fond, une planche debout contre sa face avant, du côté de la charge ; le câble fait deux tours sur la bille, part du dessous et sort par une saignée inclinée vers le bas, de sorte que la traction pousse la bille contre la terre au lieu de la soulever ; la tranchée est remblayée par-dessus. De côté, trois pieux plantés en file dans l’axe de la traction, inclinés en arrière ; la tête de chacun est amarrée au pied du suivant par quelques tours de corde, tendus en tordant un bâton passé entre les tours, puis planté ; le câble est amarré au pied du premier pieu. Vus de dessus, deux arbres vivants : une sangle autour de chaque tronc, deux brins de même longueur, tendus pareil, qui se rejoignent à une manille d’où part le câble. Un arbre de côté : la sangle large au pied du tronc, le plus bas possible.',
    format: 'pleine',
    disposition: [['bille'], ['piquets'], ['bride', 'arbre']],
    hauteurs: [1.15, 0.95, 0.95],
    largeurs: [[1], [1], [1.55, 1]],
    vues: {
      bille: { titre: 'La bille enterrée, en coupe', dessin: vueBille, renvois: renvoisBille },
      piquets: { titre: 'Trois piquets en file, de côté', dessin: vuePiquets, renvois: renvoisPiquets },
      bride: { titre: 'Deux arbres, vus de dessus', dessin: vueBride, renvois: renvoisBride },
      arbre: { titre: 'Un arbre, de côté', dessin: vueArbre, renvois: renvoisArbre },
    },
  };
};
