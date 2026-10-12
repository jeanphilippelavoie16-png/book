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
  const K = 2.35; const SW = 1;                         // échelle, px par unité (réglée sur les zones)
  const L3 = Math.hypot(R, H);

  // une perche vue de côté : de p0 (gros bout) à p1 (petit bout), en coordonnées d'écran ;
  // bouts arrondis (le rondin vu de biais) et deux traits d'écorce le long du fût
  const perche = (p0, p1, d0 = D0 * K, d1 = D1 * K, ep = 1.4) => {
    const u = uni(sub(p1, p0)), n = [-u[1], u[0]];
    const a = add(p0, mul(n, d0 / 2)), b = add(p1, mul(n, d1 / 2)), c = add(p1, mul(n, -d1 / 2)), d = add(p0, mul(n, -d0 / 2));
    const pt = q => `${f1(q[0])} ${f1(q[1])}`;
    const r1 = d1 / 2, r0 = d0 / 2;
    const S = `M${pt(a)} L${pt(b)} A${f1(r1)} ${f1(r1 * 0.55)} 0 0 0 ${pt(c)} L${pt(d)} A${f1(r0)} ${f1(r0 * 0.55)} 0 0 0 ${pt(a)} Z`;
    const L = Math.hypot(...sub(p1, p0));
    const ec = (t0, t1, o) => h.path(poly([add(add(p0, mul(u, L * t0)), mul(n, o)), add(add(p0, mul(u, L * t1)), mul(n, o * 0.9))]), A.detail);
    // le rond du bout : on écrase l'arc dans le sens de la perche
    const ax = Math.atan2(n[1], n[0]) * 180 / Math.PI;
    const S2 = S.replace(/A(\S+) (\S+) 0 0 0/g, (m, rx, ry) => `A${rx} ${ry} ${f1(ax)} 0 0`);
    return [h.path(S2, blanc(ep)), ec(0.12, 0.34, d0 * 0.18), ec(0.55, 0.8, -d0 * 0.14)].join('\n');
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
  // la ligature, une seule corde, en coordonnées monde passées par P, k px par unité :
  // départ en nœud de cabestan sur la perche de gauche, sous les tours ; cinq tours serrés autour
  // des trois perches (on voit les passes de devant, celles de derrière sont cachées) ; deux tours
  // de serrage dans chaque fourche, qui ceinturent les tours ; arrêt en deux demi-clés sur la perche
  // de droite, sous les tours ; le bout libre qui pend.
  const cx = (i, y) => PIEDS[i][0] + (DEC[i] - PIEDS[i][0]) * y / H;      // axe de la perche i, monde
  const ligature = (P, k, ep = 1) => {
    const F = h.formes, out = [];
    const yb = H - 4.4, yh = H + 1.2, n = 5, hc = (yh - yb) / n, pente = hc * 0.45;
    const r = D0 / 2;
    const bande = (xa, ya, xb, yb2, t, w = 0.8) => {      // un tour vu de devant, bouts qui tournent derrière
      const A0 = P([xa, ya + t / 2]), A1 = P([xa, ya - t / 2]), B0 = P([xb, yb2 + t / 2]), B1 = P([xb, yb2 - t / 2]);
      const rr = Math.abs(A1[1] - A0[1]) / 2, mx = (A0[0] + B0[0]) / 2, bo = rr * 0.5;
      return h.path(`M${f1(A0[0])} ${f1(A0[1])} Q${f1(mx)} ${f1((A0[1] + B0[1]) / 2 + bo)} ${f1(B0[0])} ${f1(B0[1])} A${f1(rr)} ${f1(rr)} 0 0 1 ${f1(B1[0])} ${f1(B1[1])} Q${f1(mx)} ${f1((A1[1] + B1[1]) / 2 + bo)} ${f1(A1[0])} ${f1(A1[1])} A${f1(rr)} ${f1(rr)} 0 0 1 ${f1(A0[0])} ${f1(A0[1])} Z`, blanc(w * ep));
    };
    const eC = Math.max(2.2, hc * 0.8 * k);               // épaisseur de corde à l'écran
    // 1. le cabestan, perche de gauche, sous les tours : deux tours en biais, le bout court qui sort
    const yc = yb - 2.6;
    const xL = y => cx(0, y);
    out.push(F.corde([P([xL(yc - 2.2) - r - 2.2, yc - 2.6]), P([xL(yc - 1.6) - r, yc - 1.4])], { ep: eC, debut: 'libre', fin: 'ouvert', trait: 'detail' }).svg);
    out.push(bande(xL(yc - 1.2) - r, yc - 1.4, xL(yc - 0.4) + r, yc - 0.4, hc * 0.8));
    out.push(bande(xL(yc) - r, yc + 0.2, xL(yc + 0.8) + r, yc + 1.2, hc * 0.8));
    // le dormant monte du cabestan au premier tour
    out.push(F.corde([P([xL(yc + 0.9) + r - 0.5, yc + 1.4]), P([xL(yb) + r * 0.2, yb + hc * 0.3])], { ep: eC, debut: 'ouvert', fin: 'ouvert', trait: 'detail' }).svg);
    // 2. les cinq tours, qui montent un peu de gauche à droite (la corde avance d'un tour à chaque passe)
    for (let j = 0; j < n; j++) {
      const ya = yb + hc * (j + 0.5), y2 = ya + pente;
      out.push(bande(cx(0, ya) - r - 0.2, ya, cx(1, y2) + r + 0.2, y2, hc));
    }
    // 3. les serrages : deux tours dans chaque fourche, par-dessus les tours
    for (const fx of [(DEC[0] + DEC[2]) / 2, (DEC[1] + DEC[2]) / 2]) {
      for (const dx of [-0.45, 0.45]) {
        const x = fx + dx, a = P([x - 0.35, yh + 0.75]), b = P([x + 0.35, yb - 0.55]);
        out.push(h.rect(f1(a[0]), f1(a[1]), f1(b[0] - a[0]), f1(b[1] - a[1]), `rx="${f1((b[0] - a[0]) / 2)}" ` + blanc(0.8 * ep)));
      }
    }
    // 4. l'arrêt : de la fourche de droite à la perche de droite, deux demi-clés, le bout qui pend
    const xR = y => cx(1, y);
    out.push(F.corde([P([(DEC[1] + DEC[2]) / 2 + 0.45, yb - 0.6]), P([xR(yc + 0.6) - r * 0.6, yc + 1.3])], { ep: eC, debut: 'ouvert', fin: 'ouvert', trait: 'detail' }).svg);
    out.push(bande(xR(yc + 0.8) - r, yc + 0.6, xR(yc) + r, yc - 0.2, hc * 0.8));
    out.push(bande(xR(yc - 0.4) - r, yc - 0.8, xR(yc - 1.2) + r, yc - 1.6, hc * 0.8));
    out.push(F.corde([P([xR(yc - 1.6) + r - 0.2, yc - 1.9]), P([xR(yc - 3) + r + 1.4, yc - 3.4]), P([xR(yc - 6) + r + 1.6, yc - 6.4])], { ep: eC, debut: 'ouvert', fin: 'libre', trait: 'detail' }).svg);
    return out.join('\n');
  };
  // une perche coupée par le cadre du détail : le bas se termine par une ligne de rupture
  const percheRompue = (p0, p1, d0, d1) => {
    const u = uni(sub(p1, p0)), n = [-u[1], u[0]];
    const a = add(p0, mul(n, d0 / 2)), b = add(p1, mul(n, d1 / 2)), c = add(p1, mul(n, -d1 / 2)), d = add(p0, mul(n, -d0 / 2));
    const m1 = add(add(p0, mul(n, d0 / 4)), mul(u, d0 * 0.35)), m2 = add(add(p0, mul(n, -d0 / 4)), mul(u, -d0 * 0.35));
    const Lr = Math.hypot(...sub(p1, p0)), ax = Math.atan2(n[1], n[0]) * 180 / Math.PI;
    const arc = (q0, q1) => `A${f1(d1 / 2)} ${f1(d1 * 0.28)} ${f1(ax)} 0 ${SW} ${f1(q1[0])} ${f1(q1[1])}`;
    const S = `M${f1(a[0])} ${f1(a[1])} C${f1(m1[0])} ${f1(m1[1])} ${f1(m2[0])} ${f1(m2[1])} ${f1(d[0])} ${f1(d[1])}`;
    return [
      h.path(`${S} L${f1(c[0])} ${f1(c[1])} ${arc(c, b)} Z`, A.blanc),
      h.path(`M${f1(d[0])} ${f1(d[1])} L${f1(c[0])} ${f1(c[1])} ${arc(c, b)} L${f1(a[0])} ${f1(a[1])}`, A.arete),
      h.path(poly([add(add(p0, mul(u, Lr * 0.15)), mul(n, d0 * 0.2)), add(add(p0, mul(u, Lr * 0.42)), mul(n, d0 * 0.17))]), A.detail),
      h.path(poly([add(add(p0, mul(u, Lr * 0.5)), mul(n, -d0 * 0.16)), add(add(p0, mul(u, Lr * 0.78)), mul(n, -d1 * 0.15))]), A.detail),
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
    out.push(ligature(P, K, 0.8));
    return out.join('\n');
  };

  // ── vu de dessus : les trois perches vers le centre, les bouts qui dépassent au-delà du lien ──
  const plan = z => {
    const cy = z.h / 2 + 0.25 * R * K;
    const P = ([x, y]) => [z.l / 2 + x * K, cy - y * K];
    const out = [];
    out.push(h.path(poly(PIEDS.map(P), true), `fill="none" stroke="${NOIR}" stroke-width="0.6" stroke-dasharray="10 3 2 3"`));
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
    out.push(ligature(P, K, 0.8));
    // l'air : entre sous le bord du foin, monte dans le creux
    for (const sgn of [-1, 1]) {
      const a = P([sgn * (R + 10), 4]), b = P([sgn * (R - 8), 5]), c = P([sgn * 9, 14]), e = P([sgn * 6, 44]);
      out.push(h.fleche(`M${f1(a[0])} ${f1(a[1])} C${f1(b[0])} ${f1(b[1])} ${f1(c[0])} ${f1(c[1])} ${f1(e[0])} ${f1(e[1])}`, A.cache));
    }
    return out.join('\n');
  };

  // ── détail : le sommet lié, trois fois plus grand ──
  const detail = z => {
    const KD = K * 2.9, yc = z.h / 2 + 8;
    const P = ([x, y]) => [z.l / 2 + x * KD, yc - (y - H) * KD];
    const out = [];
    const bas = H - 12.5;
    for (const i of [2, 0, 1]) {
      const pied = [PIEDS[i][0], 0], lienP = [DEC[i], H];
      const dir = uni(sub(lienP, pied));
      const tB = (bas - pied[1]) / dir[1];
      const p0 = add(pied, mul(dir, tB));
      const bout = add(lienP, mul(dir, E * (lienP[1] - pied[1]) / (dir[1] * L3)));
      out.push(percheRompue(P(p0), P(bout), D0 * KD * 0.93, D1 * KD));
    }
    out.push(ligature(P, KD, 1.4));
    return out.join('\n');
  };

  return {
    ref: '99-02a',
    titre: 'Le séchage du foin : le trépied chargé',
    desc: 'Trois perches d’épinette liées ensemble au sommet, les pieds écartés en triangle. En élévation, le trépied monté, avant le foin : deux perches devant, une au fond. Vu de dessus, sous l’élévation : les trois pieds en triangle et les perches qui se rejoignent au lien. En coupe par deux perches, le trépied chargé : le foin posé en couches sur les perches, chaque couche recouvrant le haut de celle du dessous, une coiffe de foin par-dessus le lien ; le foin s’arrête au-dessus du sol, et le centre reste creux, ouvert dessous : l’air y entre sous le bord du foin et monte. En détail, le sommet : les trois perches côte à côte, liées d’une seule corde : un nœud de cabestan sur la perche de gauche, cinq tours serrés autour des trois, deux tours de serrage dans chaque fourche, l’arrêt en demi-clés sur la perche de droite et le bout libre qui pend ; elles se croisent juste au-dessus du lien.',
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
          const KD = K * 2.9, yc = z.h / 2 + 8;
          const p = [z.l / 2 + (1.5 * D0 + 0.3) * KD, yc + 1.5 * KD];
          return [{ n: 2, rond: [p[0] + 40, p[1] + 26], cible: [p[0] - 2, p[1]], texte: 'liées ensemble, plusieurs tours serrés' }];
        },
      },
    },
  };
};
