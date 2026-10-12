// Planche 99-02a — Le séchage du foin : le trépied chargé (chapitre 99, §5-G, étape 58, et la
// variante d'urgence « Le séchage du foin sans bâtiment »).
// Le chapitre dit : trois perches d'épinette liées au sommet ; le foin posé en couches sur les
// perches et non contre le sol ; par temps humide, il sèche en l'air là où le sol mouillé l'aurait
// fait pourrir. La 99-02b montre la tente canadienne ; la meule ronde est la 99-03.
// Aucune cote : le chapitre ne donne ni longueur de perche, ni écart des pieds, ni épaisseur de foin.
// Les proportions du dessin sont des proportions de dessin, pas des mesures.
//
// Repère : unités de dessin, x vers la droite, y vers le haut, le sol en y = 0, le croisement des
// perches (le lien) en y = 100. Une seule échelle K pour les quatre vues ; l'élévation et la coupe
// partagent le sol et le sommet, le plan est sous l'élévation, sur le même axe.
//
// La coupe est prise par deux perches (coupe brisée, rabattue dans le plan) : la perche du fond
// se voit au milieu, dans le creux, derrière le plan de coupe.
module.exports = (h) => {
  const A = h.a;
  const NOIR = '#1A1A1A';
  const f1 = v => Math.round(v * 10) / 10;
  const poly = (pts, ferme) => pts.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])} ${f1(p[1])}`).join(' ') + (ferme ? ' Z' : '');
  const blanc = ep => `fill="#FFFFFF" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };

  const H = 100, R = 42, E = 20;          // hauteur du lien, rayon des pieds, bout qui dépasse
  const D0 = 3.6, D1 = 2.6;               // perche : gros bout, petit bout
  const T = 17, B = 1.6, G = 10;          // foin : épaisseur, ressaut d'une couche, jour sous le foin
  const K = 2.35;                         // échelle, px par unité (réglée sur les zones)
  const L3 = Math.hypot(R, H);

  // une perche vue de côté : de p0 (gros bout) à p1 (petit bout), en coordonnées d'écran
  const perche = (p0, p1, d0 = D0 * K, d1 = D1 * K, ep = 1.4) => {
    const u = uni(sub(p1, p0)), n = [-u[1], u[0]];
    return h.path(poly([add(p0, mul(n, d0 / 2)), add(p1, mul(n, d1 / 2)), add(p1, mul(n, -d1 / 2)), add(p0, mul(n, -d0 / 2))], true), blanc(ep));
  };
  // le lien : n tours de corde serrés autour du faisceau, centré en (x, y), largeur l, hauteur t
  // (écran) ; chaque tour est une bande aux bouts arrondis, un peu bombée vers le bas
  const lien = (x, y, l, t, n = 4) => {
    const out = [], hc = t / n, bo = hc * 0.35, r = hc / 2;
    for (let i = 0; i < n; i++) {
      const y0 = y - t / 2 + hc * i, y1 = y0 + hc;
      out.push(h.path(`M${f1(x - l / 2)} ${f1(y0)} Q${f1(x)} ${f1(y0 + 2 * bo)} ${f1(x + l / 2)} ${f1(y0)} A${f1(r)} ${f1(r)} 0 0 1 ${f1(x + l / 2)} ${f1(y1)} Q${f1(x)} ${f1(y1 + 2 * bo)} ${f1(x - l / 2)} ${f1(y1)} A${f1(r)} ${f1(r)} 0 0 1 ${f1(x - l / 2)} ${f1(y0)} Z`, blanc(0.7)));
    }
    return out.join('\n');
  };
  // une perche coupée par le cadre du détail : le bas se termine par une ligne de rupture
  const percheRompue = (p0, p1, d0, d1) => {
    const u = uni(sub(p1, p0)), n = [-u[1], u[0]];
    const a = add(p0, mul(n, d0 / 2)), b = add(p1, mul(n, d1 / 2)), c = add(p1, mul(n, -d1 / 2)), d = add(p0, mul(n, -d0 / 2));
    const m1 = add(add(p0, mul(n, d0 / 4)), mul(u, d0 * 0.35)), m2 = add(add(p0, mul(n, -d0 / 4)), mul(u, -d0 * 0.35));
    const S = `M${f1(a[0])} ${f1(a[1])} C${f1(m1[0])} ${f1(m1[1])} ${f1(m2[0])} ${f1(m2[1])} ${f1(d[0])} ${f1(d[1])}`;
    return [
      h.path(`${S} L${f1(c[0])} ${f1(c[1])} L${f1(b[0])} ${f1(b[1])} Z`, A.blanc),
      h.path(poly([d, c, b, a]), A.arete),
      h.path(S, A.detail),
    ].join('\n');
  };
  const sol = (z, y, x0 = 6, x1 = z.l - 6) => [
    h.rect(x0, y, x1 - x0, 7, h.a.hachure('terre', 'aucun')),
    h.ligne(x0, y, x1, y, A.arete),
  ].join('\n');

  // le foin en couches, posé sur une ligne d'appui : pb (bas) → pt (haut), en coordonnées monde ;
  // nOut vers l'extérieur. Rend le contour (blanc + paille) et les joints des couches.
  // Chaque couche a son bas un peu en saillie : la couche du dessus recouvre le haut de celle
  // du dessous, comme un bardeau.
  const couches = (P, pb, pt, nOut, m, bout = 'rond') => {
    const u = sub(pt, pb), Ls = Math.hypot(u[0], u[1]), uu = uni(u);
    const S = (s, o) => P(add(add(pb, mul(uu, s)), mul(nOut, o)));
    const pas = Ls / m, rec = pas * 0.55;
    const ext = [];
    for (let j = m - 1; j >= 0; j--) { ext.push(S((j + 1) * pas, T - B)); ext.push(S(j * pas, T + B)); }
    const bas = bout === 'rond' ? [S(-pas * 0.06, T * 0.62), S(pas * 0.02, T * 0.2)] : [];
    const contour = [S(pas * 0.12, 0), S(Ls, 0), ...ext, ...bas];
    const joints = [];
    for (let j = 1; j < m; j++) joints.push(h.path(poly([S(j * pas, T - B), S(j * pas + rec, 0.4)]), A.detail));
    return {
      svg: [h.path(poly(contour, true), A.blanc), h.path(poly(contour, true), h.a.hachure('paille', 'arete')), ...joints].join('\n'),
      hautExt: S(Ls, T - B), hautInt: S(Ls, 0),
    };
  };

  // ── élévation, monté : pieds avant à ±0,866 R, pied du fond au centre ──
  const PIEDS = [[-0.866 * R, -0.5 * R], [0.866 * R, -0.5 * R], [0, R]];     // plan : x, y (y vers le fond)
  const DEC = [-D0 * 0.95, D0 * 0.95, 0];                                   // les perches côte à côte au lien
  const rep = (z, yb) => ([x, y]) => [z.l / 2 + x * K, yb - y * K];
  const ySol = z => z.h - 22;

  const elevation = z => {
    const P = rep(z, ySol(z));
    const out = [sol(z, ySol(z))];
    const ordre = [2, 0, 1];   // le fond d'abord
    for (const i of ordre) {
      const pied = [PIEDS[i][0], 0], lienP = [DEC[i], H];
      const dir = uni(sub(lienP, pied));
      const bout = add(lienP, mul(dir, E * (lienP[1] - pied[1]) / (dir[1] * L3)));
      out.push(perche(P(pied), P(bout)));
    }
    const [lx, ly] = P([0, H - 1.5]);
    out.push(lien(lx, ly, (2.9 * D0 + 0.4) * K, 5.5 * K, 4));
    return out.join('\n');
  };

  // ── vu de dessus : les trois perches vers le centre, les bouts qui dépassent au-delà du lien ──
  const plan = z => {
    const cy = z.h / 2 + 0.25 * R * K;
    const P = ([x, y]) => [z.l / 2 + x * K, cy - y * K];
    const out = [];
    for (let i = 0; i < 3; i++) {
      const pied = PIEDS[i], dir = uni(mul(pied, -1));
      const c = [DEC[i] * 0.5 * (i === 2 ? 0 : 1), 0];
      out.push(perche(P(pied), P(add(c, mul(dir, 0.1)))));
    }
    const [cx, cyy] = P([0, 0]);
    out.push(h.cercle(cx, cyy, 2.7 * D0 * K / 2, blanc(1.4)));
    out.push(h.cercle(cx, cyy, 2.7 * D0 * K / 2 - 2.2, A.detail));
    for (let i = 0; i < 3; i++) {
      const dir = uni(mul(PIEDS[i], -1));
      const d0 = add([0, 0], mul(dir, 2.7 * D0 / 2 - 0.4));
      out.push(perche(P(d0), P(add([0, 0], mul(dir, E * R / L3 + 2.7 * D0 / 2))), D1 * K * 1.05, D1 * K));
    }
    return out.join('\n');
  };

  // ── coupe par deux perches, chargé ──
  const coupe = z => {
    const P = rep(z, ySol(z));
    const out = [sol(z, ySol(z))];
    const r0 = D0 / 2;
    // la perche du fond, vue dans le creux, derrière le plan de coupe
    const tipF = [0, H + E * H / L3];
    out.push(perche(P([0, 0]), P(tipF)));
    // les deux perches du plan de coupe et leur foin
    const foins = [];
    for (const sgn of [-1, 1]) {
      const pied = [sgn * R, 0], haut = [0, H];
      const u = uni(sub(haut, pied)), n = sgn < 0 ? [-u[1], u[0]] : [u[1], -u[0]];
      const appui = s => add(add(pied, mul(u, s)), mul(n, r0));
      const s0 = (G + 1) / u[1], s1 = (H - 14) / u[1];
      const c = couches(P, appui(s0), appui(s1), n, 5);
      foins.push({ sgn, c, u, n, pied, appui, s1 });
    }
    // la coiffe : du haut d'une bande à l'autre, par-dessus le lien
    const [g, d] = foins;
    const topW = [0, H + 9.5];
    const coiffe = [g.c.hautInt, P([0, H + 1]), d.c.hautInt, d.c.hautExt, P([6.5, H + 8.3]), P(topW), P([-6.5, H + 8.3]), g.c.hautExt];
    for (const f of foins) out.push(f.c.svg);
    out.push(h.path(poly(coiffe, true), A.blanc), h.path(poly(coiffe, true), h.a.hachure('paille', 'arete')));
    // joint sous la coiffe
    out.push(h.path(poly([g.c.hautExt, P([-3, H + 2])]), A.detail), h.path(poly([d.c.hautExt, P([3, H + 2])]), A.detail));
    // les perches du plan, par-dessus (elles sont dans le plan de coupe)
    for (const f of foins) {
      const lienP = [f.sgn * D0 * 0.95, H];
      const dir = uni(sub(lienP, f.pied));
      out.push(perche(P(f.pied), P(add(lienP, mul(dir, E)))));
    }
    const [lx, ly] = P([0, H - 1.5]);
    out.push(lien(lx, ly, (2.9 * D0 + 0.4) * K, 5.5 * K, 4));
    // l'air : entre sous le bord du foin, monte dans le creux
    for (const sgn of [-1, 1]) {
      const a = P([sgn * (R + 10), 4]), b = P([sgn * (R - 8), 5]), c = P([sgn * 9, 14]), e = P([sgn * 6, 44]);
      out.push(h.fleche(`M${f1(a[0])} ${f1(a[1])} C${f1(b[0])} ${f1(b[1])} ${f1(c[0])} ${f1(c[1])} ${f1(e[0])} ${f1(e[1])}`, A.cache));
    }
    return out.join('\n');
  };

  // ── détail : le sommet lié, trois fois plus grand ──
  const detail = z => {
    const KD = K * 2.6, yc = z.h / 2 + 4;
    const P = ([x, y]) => [z.l / 2 + x * KD, yc - (y - H) * KD];
    const out = [];
    const bas = H - 11;
    for (const i of [2, 0, 1]) {
      const pied = [PIEDS[i][0], 0], lienP = [DEC[i], H];
      const dir = uni(sub(lienP, pied));
      const tB = (bas - pied[1]) / dir[1];
      const p0 = add(pied, mul(dir, tB));
      const bout = add(lienP, mul(dir, E * (lienP[1] - pied[1]) / (dir[1] * L3)));
      out.push(percheRompue(P(p0), P(bout), D0 * KD * 0.93, D1 * KD));
    }
    const [lx, ly] = P([0, H - 1.5]);
    out.push(lien(lx, ly, (2.9 * D0 + 0.4) * KD, 5.5 * KD, 6));
    return out.join('\n');
  };

  return {
    ref: '99-02a',
    titre: 'Le séchage du foin : le trépied chargé',
    desc: 'Trois perches d’épinette liées ensemble au sommet, les pieds écartés en triangle. En élévation, le trépied monté, avant le foin : deux perches devant, une au fond. Vu de dessus, sous l’élévation : les trois pieds en triangle et les perches qui se rejoignent au lien. En coupe par deux perches, le trépied chargé : le foin posé en couches sur les perches, chaque couche recouvrant le haut de celle du dessous, une coiffe de foin par-dessus le lien ; le foin s’arrête au-dessus du sol, et le centre reste creux, ouvert dessous : l’air y entre sous le bord du foin et monte. En détail, le sommet : les trois perches côte à côte, liées de plusieurs tours serrés, qui se croisent juste au-dessus du lien.',
    format: 'pleine',
    disposition: [['elev', 'coupe'], ['plan', 'detail']],
    hauteurs: [3, 2],
    largeurs: [[1, 1], [1, 1]],
    vues: {
      elev: {
        titre: 'Monté, avant le foin',
        dessin: elevation,
        renvois: z => {
          const P = rep(z, ySol(z));
          const c = P([-0.866 * R * 0.45, 55]);
          return [{ n: 1, rond: [c[0] - 46, c[1] - 30], cible: [c[0] - 2, c[1] - 1], texte: 'trois perches d’épinette' }];
        },
      },
      coupe: {
        titre: 'Chargé, en coupe par deux perches',
        dessin: coupe,
        renvois: z => {
          const P = rep(z, ySol(z));
          const u = uni([R, H]);
          const surFoin = P(add([R, 0], add(mul([-u[0], u[1]], 52), mul([u[1], u[0]], 9))));
          const air = P([7, 30]);
          return [
            { n: 4, rond: [surFoin[0] + 44, surFoin[1] - 26], cible: surFoin, texte: 'foin posé en couches sur les perches' },
            { n: 5, rond: [air[0] + 34, air[1] + 30], cible: air, texte: 'foin au-dessus du sol : l’air entre dessous' },
          ];
        },
      },
      plan: {
        titre: 'Vu de dessus',
        dessin: plan,
        renvois: z => {
          const cy = z.h / 2 + 0.25 * R * K;
          const p = [z.l / 2 + 0.866 * R * K, cy + 0.5 * R * K];
          return [{ n: 3, rond: [p[0] + 34, p[1] - 22], cible: [p[0] + 5, p[1] + 1], texte: 'les trois pieds écartés en triangle' }];
        },
      },
      detail: {
        titre: 'Le sommet',
        dessin: detail,
        renvois: z => {
          const KD = K * 2.6, yc = z.h / 2 + 4;
          const p = [z.l / 2 + (1.5 * D0 + 0.3) * KD, yc + 1.5 * KD];
          return [{ n: 2, rond: [p[0] + 40, p[1] + 26], cible: [p[0] - 2, p[1]], texte: 'liées ensemble, plusieurs tours serrés' }];
        },
      },
    },
  };
};
