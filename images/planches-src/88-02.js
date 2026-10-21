// Planche 88-02 — Le chaudron sur la braise (chapitre 88, « Dehors, le chaudron sur la braise »,
// étapes 27 à 30). Quatre vues : la coupe du montage (mur de neige côté vent, couronne de braise
// dessous, chaudron, miche, couvercle bombé, tôle, braise en damier) ; la couronne vue d'en haut,
// chaudron enlevé ; le damier sur la tôle vu d'en haut ; les quarts de tour opposés, de trois
// quarts, le chaudron soulevé au-dessus de sa couronne et le couvercle soulevé à plat.
// Aucune cote : le passage ne donne aucune dimension. Le seul rapport chiffré, « trois fois plus
// de braise sur le couvercle que dessous », se compte sur les deux vues d'en haut : 24 braises en
// damier sur la tôle, 8 en couronne dessous.
//
// Le montage, vérifié : le chaudron repose sur la couronne, sous son bord, le centre vide ; le
// couvercle bombé est à sa place sur le rebord, sa lèvre entre dans le chaudron ; la tôle plate
// repose sur le sommet du dôme et porte la braise, qui glisserait sur le dôme nu. Le couvercle
// se soulève à plat, tôle et braise dessus : rien ne tombe dans le chaudron.
//
// La charte : le creux du chaudron, vu par la coupe, en gris loin (la miche s'y détache) ; de
// trois quarts, l'intérieur du chaudron ouvert en gris loin et son flanc droit à l'ombre. Pas de
// gris sur les vues d'en haut. Le rouge : les deux quarts de tour, en sens contraire (c'est le
// geste, et l'opposition est ce qu'il faut voir) ; les flèches qui soulèvent restent noires.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blancTrait = 'fill="none" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round"';
  const blancContour = h.a.contour.replace('fill="none"', 'fill="#ffffff"');
  const blancArete = h.a.arete.replace('fill="none"', 'fill="#ffffff"');
  const halo = 'fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"';

  // Graine fixe : la braise est la même à chaque composition.
  let graine = 882;
  const hasard = () => (graine = (graine * 16807) % 2147483647) / 2147483647;

  // Une braise : un morceau noir, irrégulier, fendu de blanc.
  const braise = (cx, cy, rx, ry, rot = 0) => {
    const j = () => 0.88 + hasard() * 0.24;
    const c = Math.cos(rot), s = Math.sin(rot);
    const P = (u, v) => [cx + (u * rx) * c - (v * ry) * s, cy + (u * rx) * s + (v * ry) * c];
    const pts = [[-1, 0.1], [-0.8, -0.6], [-0.3, -0.95], [0.25, -0.85], [0.75, -0.7], [1, -0.05], [0.8, 0.6], [0.2, 0.95], [-0.5, 0.85]]
      .map(([u, v]) => { const k = j(); return P(u * k, v * k); });
    const a = P(-0.55, 0), b = P(-0.1, 0.2), d = P(0.45, -0.25);
    return [
      h.chemin(pts, h.a.plein, true),
      h.path(`M ${f(a[0])} ${f(a[1])} L ${f(b[0])} ${f(b[1])} L ${f(d[0])} ${f(d[1])}`, blancTrait),
    ].join('\n');
  };

  // Le damier : une grille de 7 × 7 cases alignée sur la tôle, braise sur les cases impaires.
  // En coordonnées réduites (rayon du chaudron = 1). La rangée du milieu porte 4 braises.
  const N = 7, demiTole = 0.875, pas = 2 * demiTole / N;
  const damier = [];
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    if ((i + j) % 2 === 0) continue;
    const u = -demiTole + (i + 0.5) * pas, v = -demiTole + (j + 0.5) * pas;
    if (Math.hypot(u, v) <= 0.97) damier.push([u, v]);
  }
  const nCouronne = Math.round(damier.length / 3);            // 24 / 3 = 8
  const rCouronne = 0.8;
  const couronne = [];
  for (let k = 0; k < nCouronne; k++) {
    const t = Math.PI / nCouronne + k * 2 * Math.PI / nCouronne;
    couronne.push([rCouronne * Math.cos(t), rCouronne * Math.sin(t)]);
  }

  // ─── La coupe ──────────────────────────────────────────────────────────────────────
  const gC = z => {
    const yG = z.h - 30;
    const R = Math.round(Math.min(z.l * 0.26, (yG - 58) / 1.12));
    const cx = Math.round(z.l * 0.6);
    const t = Math.max(6, Math.round(R * 0.05));
    const rx = Math.round(R * 0.105), ry = Math.round(R * 0.07);  // une braise
    const yB = yG - Math.round(ry * 1.7);                          // le fond repose sur la couronne
    const Hb = Math.round(R * 0.78);
    const yR = yB - Hb;                                            // le rebord
    const dh = Math.round(R * 0.17);                               // la flèche du dôme
    const yT = yR - dh;                                            // dessous de la tôle
    const eT = 3;                                                  // épaisseur de la tôle
    const xw0 = Math.round(z.l * 0.075), xw1 = Math.round(z.l * 0.075 + R * 0.52);
    const yW = yT - 2;                                             // dessus du mur de neige
    return { yG, R, cx, t, rx, ry, yB, Hb, yR, dh, yT, eT, xw0, xw1, yW };
  };

  const coupe = z => {
    const g = gC(z), { R, cx, t, yB, yR, dh, yT, eT, yG } = g, out = [];
    // le sol, coupé
    out.push(h.rect(4, yG, z.l - 8, z.h - 4 - yG, h.a.hachure('terre', 'fin')));
    out.push(h.ligne(4, yG, z.l - 4, yG, h.a.arete));

    // le mur de neige tassée, du côté du vent
    const lm = g.xw1 - g.xw0;
    const mur = [[g.xw0, yG], [g.xw0 + lm * 0.3, g.yW + 5], [g.xw0 + lm * 0.36, g.yW], [g.xw1 - lm * 0.36, g.yW], [g.xw1 - lm * 0.3, g.yW + 5], [g.xw1, yG]];
    out.push(h.chemin(mur, h.a.blanc, true), h.chemin(mur, h.a.hachure('neige', 'contour'), true));
    // le vent, qui bute sur le mur
    [0.3, 0.68].forEach(u => {
      const y = g.yW + (yG - g.yW) * u, xm = g.xw0 + lm * 0.3 * (yG - y) / (yG - g.yW - 5);
      out.push(h.fleche(`M 6 ${f(y)} L ${f(xm - 7)} ${f(y)}`));
    });

    // la couronne de braise, coupée : une braise de chaque côté, sous le bord ; rien au centre
    [-1, 1].forEach(s => out.push(braise(cx + s * rCouronne * R, yG - g.ry * 0.9, g.rx, g.ry, s * 0.08)));

    // le creux du chaudron, vu par la coupe : gris loin, peint avant la fonte et le couvercle
    {
      const lx0 = R - t - 5, ep0 = Math.max(5, Math.round(t * 0.8));
      out.push(h.path([
        `M ${f(cx - R + t)} ${f(yB - t)} L ${f(cx - R + t)} ${f(yR + 7)} L ${f(cx - lx0)} ${f(yR + 7)} L ${f(cx - lx0)} ${f(yR)}`,
        `C ${f(cx - lx0 * 0.72)} ${f(yR - (dh - ep0) * 4 / 3)} ${f(cx + lx0 * 0.72)} ${f(yR - (dh - ep0) * 4 / 3)} ${f(cx + lx0)} ${f(yR)}`,
        `L ${f(cx + lx0)} ${f(yR + 7)} L ${f(cx + R - t)} ${f(yR + 7)} L ${f(cx + R - t)} ${f(yB - t)} Z`].join(' '), h.a.loin));
    }
    // le chaudron, coupé : un U de fonte épaisse
    const rc = Math.round(R * 0.12), ri = rc - t * 0.6;
    const pot = [
      `M ${f(cx - R)} ${f(yR)} L ${f(cx - R)} ${f(yB - rc)} Q ${f(cx - R)} ${f(yB)} ${f(cx - R + rc)} ${f(yB)}`,
      `L ${f(cx + R - rc)} ${f(yB)} Q ${f(cx + R)} ${f(yB)} ${f(cx + R)} ${f(yB - rc)} L ${f(cx + R)} ${f(yR)}`,
      `L ${f(cx + R - t)} ${f(yR)} L ${f(cx + R - t)} ${f(yB - t - ri)} Q ${f(cx + R - t)} ${f(yB - t)} ${f(cx + R - t - ri)} ${f(yB - t)}`,
      `L ${f(cx - R + t + ri)} ${f(yB - t)} Q ${f(cx - R + t)} ${f(yB - t)} ${f(cx - R + t)} ${f(yB - t - ri)} L ${f(cx - R + t)} ${f(yR)} Z`,
    ].join(' ');
    out.push(h.path(pot, h.a.blanc), h.path(pot, h.a.hachure('metal', 'contour')));

    // la miche, sur le fond fariné
    const yF = yB - t, Wm = R * 1.22, Hm = (yF - yR) * 0.56, n = 2.7;
    const miche = (marge) => {
      const pts = [];
      for (let i = 0; i <= 48; i++) {
        const a = Math.PI * i / 48, c = Math.cos(a), s = Math.sin(a);
        pts.push([cx + (Wm / 2 - marge) * Math.sign(c) * Math.pow(Math.abs(c), 2 / n),
          yF - 2 - (Hm - marge) * Math.pow(s, 2 / n)]);
      }
      return pts;
    };
    out.push(h.chemin(miche(0), blancContour, true));
    out.push(h.chemin(miche(4).slice(3, -3), h.a.fin));             // la croûte
    [[-0.26, 0.4, 7, 3.5], [-0.02, 0.55, 6, 3], [0.22, 0.38, 7.5, 3.6], [0.1, 0.24, 4.5, 2.2], [-0.14, 0.2, 4, 2], [0.32, 0.18, 3.5, 1.8]]
      .forEach(([u, v, a, b]) => out.push(h.ellipse(cx + u * Wm, yF - 2 - v * Hm, a * R / 170, b * R / 170, h.a.fin)));
    for (let x = cx - Wm / 2 - 10; x <= cx + Wm / 2 + 10; x += 7) out.push(h.cercle(x, yF - 1.2, 0.6, h.a.plein));

    // le couvercle bombé, coupé : le dôme, posé sur le rebord, sa lèvre dans le chaudron
    const lx = R - t - 5, ep = Math.max(5, Math.round(t * 0.8));
    const couv = [
      `M ${f(cx - R)} ${f(yR)} C ${f(cx - R * 0.72)} ${f(yR - dh * 4 / 3)} ${f(cx + R * 0.72)} ${f(yR - dh * 4 / 3)} ${f(cx + R)} ${f(yR)}`,
      `L ${f(cx + R - t)} ${f(yR)} L ${f(cx + R - t)} ${f(yR + 7)} L ${f(cx + lx)} ${f(yR + 7)} L ${f(cx + lx)} ${f(yR)}`,
      `C ${f(cx + lx * 0.72)} ${f(yR - (dh - ep) * 4 / 3)} ${f(cx - lx * 0.72)} ${f(yR - (dh - ep) * 4 / 3)} ${f(cx - lx)} ${f(yR)}`,
      `L ${f(cx - lx)} ${f(yR + 7)} L ${f(cx - R + t)} ${f(yR + 7)} L ${f(cx - R + t)} ${f(yR)} Z`,
    ].join(' ');
    out.push(h.path(couv, h.a.blanc), h.path(couv, h.a.hachure('metal', 'contour')));

    // la tôle, posée sur le sommet du dôme : plate, mince, en noir
    out.push(h.rect(cx - demiTole * R, yT - eT, 2 * demiTole * R, eT, h.a.plein));

    // la braise sur la tôle : la rangée du milieu du damier, une case sur deux
    damier.filter(([, v]) => Math.abs(v) < 1e-6).forEach(([u]) =>
      out.push(braise(cx + u * R, yT - eT - g.ry * 0.9, g.rx, g.ry, (hasard() - 0.5) * 0.2)));
    return out.join('\n');
  };

  // ─── Les deux vues d'en haut ────────────────────────────────────────────────────────
  const gP = z => ({ cx: z.l / 2, cy: z.h / 2 + 2, Rp: Math.round(Math.min(z.l * 0.35, z.h * 0.36)) });

  const dessous = z => {
    const { cx, cy, Rp } = gP(z), out = [];
    out.push(h.cercle(cx, cy, Rp, h.a.cache));                       // où pose le chaudron
    couronne.forEach(([u, v]) => out.push(braise(cx + u * Rp, cy + v * Rp, Rp * 0.105, Rp * 0.08, (hasard() - 0.5) * 0.25)));
    return out.join('\n');
  };

  const oreilles = (cx, cy, Rp) => [-1, 1].map(s =>
    h.path(`M ${f(cx + s * Rp * 0.96)} ${f(cy - Rp * 0.1)} L ${f(cx + s * (Rp + Rp * 0.1))} ${f(cy - Rp * 0.07)} Q ${f(cx + s * (Rp + Rp * 0.15))} ${f(cy)} ${f(cx + s * (Rp + Rp * 0.1))} ${f(cy + Rp * 0.07)} L ${f(cx + s * Rp * 0.96)} ${f(cy + Rp * 0.1)} Z`, blancArete)).join('\n');

  const dessus = z => {
    const { cx, cy, Rp } = gP(z), out = [];
    // les oreilles, puis le chaudron et son couvercle
    out.push(oreilles(cx, cy, Rp));
    out.push(h.cercle(cx, cy, Rp, blancContour));
    out.push(h.cercle(cx, cy, Rp * 0.93, h.a.detail));                // le bord du couvercle
    // la tôle
    const s = demiTole * Rp;
    out.push(h.rect(cx - s, cy - s, 2 * s, 2 * s, blancArete));
    damier.forEach(([u, v]) => out.push(braise(cx + u * Rp, cy + v * Rp, Rp * 0.105, Rp * 0.08, (hasard() - 0.5) * 0.25)));
    return out.join('\n');
  };

  // ─── Les quarts de tour, de trois quarts ────────────────────────────────────────────
  // Le chaudron soulevé au-dessus de sa couronne, le couvercle soulevé à plat au-dessus du
  // chaudron : chacun a sa flèche d'un quart de tour, sur le devant, en sens contraire.
  const k = 0.28;                                                     // aplatissement des ellipses
  const gT = z => {
    const Rr = Math.round(Math.min((z.l - 74) / 2, (z.h - 112) / 1.62));
    const cx = z.l / 2 - 4, yGr = z.h - 14 - Math.round(rCouronne * Rr * k);
    const Hb = Math.round(Rr * 0.78), dh = Math.round(Rr * 0.24);
    const yBot = yGr - 33;                                              // soulevé au-dessus de sa couronne
    const yR = yBot - Hb;
    const gL = 40, yLr = yR - gL;                                       // le couvercle, soulevé à plat
    return { Rr, cx, yGr, Hb, dh, yBot, yR, yLr };
  };
  const arcEllipse = (cx, cy, a, b, t0, t1) => {
    const pts = [], n = 40;
    for (let i = 0; i <= n; i++) {
      const t = (t0 + (t1 - t0) * i / n) * Math.PI / 180;
      pts.push([cx + a * Math.cos(t), cy + b * Math.sin(t)]);
    }
    return 'M ' + pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ');
  };

  const tours = z => {
    const g = gT(z), { Rr, cx, yGr, Hb, dh, yBot, yR, yLr } = g, out = [];
    const rb = Rr * 0.1, rbv = Rr * 0.07;
    const braiseSol = ([u, v]) => braise(cx + u * Rr, yGr + v * Rr * k - rbv * 0.6, rb, rbv * 0.8, (hasard() - 0.5) * 0.3);
    // la couronne au sol : l'arrière d'abord, le chaudron la cache en partie
    couronne.filter(([, v]) => v < 0).forEach(p => out.push(braiseSol(p)));

    // le chaudron : le corps, les oreilles, le rebord et l'épaisseur de sa paroi
    const corps = `M ${f(cx - Rr)} ${f(yR)} L ${f(cx - Rr)} ${f(yBot)} A ${f(Rr)} ${f(Rr * k)} 0 0 0 ${f(cx + Rr)} ${f(yBot)} L ${f(cx + Rr)} ${f(yR)} Z`;
    // le flanc droit à l'ombre : de x = cx + 0,55 R au bord, jusqu'au bas arrondi
    const xo = cx + Rr * 0.55, yo = yBot + Rr * k * Math.sqrt(1 - 0.55 * 0.55);
    out.push(h.path(corps, h.a.blanc));
    out.push(h.path(`M ${f(xo)} ${f(yR)} L ${f(xo)} ${f(yo)} A ${f(Rr)} ${f(Rr * k)} 0 0 0 ${f(cx + Rr)} ${f(yBot)} L ${f(cx + Rr)} ${f(yR)} Z`, h.a.ombre));
    out.push(h.path(corps, h.a.contour));
    [-1, 1].forEach(sg => out.push(h.path(`M ${f(cx + sg * Rr)} ${f(yR + 3)} L ${f(cx + sg * (Rr + 7))} ${f(yR + 5)} Q ${f(cx + sg * (Rr + 10))} ${f(yR + 8)} ${f(cx + sg * (Rr + 7))} ${f(yR + 11)} L ${f(cx + sg * Rr)} ${f(yR + 13)} Z`, blancArete)));
    out.push(h.ellipse(cx, yR, Rr, Rr * k, blancArete));
    // l'intérieur, vu par l'ouverture : gris loin
    out.push(h.ellipse(cx, yR, Rr - 5, (Rr - 5) * k, h.a.loin));
    out.push(h.ellipse(cx, yR, Rr - 5, (Rr - 5) * k, h.a.detail));

    // le couvercle, soulevé à plat : sa tranche, son dôme (silhouette calculée, h = dh·(1 − r²))
    out.push(h.path(`M ${f(cx - Rr)} ${f(yLr)} L ${f(cx - Rr)} ${f(yLr + 8)} A ${f(Rr)} ${f(Rr * k)} 0 0 0 ${f(cx + Rr)} ${f(yLr + 8)} L ${f(cx + Rr)} ${f(yLr)} Z`, blancArete));
    const sil = [];
    for (let i = 0; i <= 40; i++) {
      const X = -1 + 2 * i / 40, lim = Math.sqrt(Math.max(0, 1 - X * X));
      let best = 0;
      for (let j = 0; j <= 40; j++) {
        const Y = -lim + 2 * lim * j / 40;
        best = Math.max(best, -Y * k * Rr + dh * (1 - X * X - Y * Y));
      }
      sil.push([cx + X * Rr, yLr - best]);
    }
    const dome = 'M ' + sil.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ') + ` A ${f(Rr)} ${f(Rr * k)} 0 0 1 ${f(cx - Rr)} ${f(yLr)} Z`;
    out.push(h.path(dome, blancArete));
    // le bombé : la section du dôme dans le plan du devant
    const mer = [];
    for (let i = 0; i <= 40; i++) { const X = -0.96 + 1.92 * i / 40; mer.push([cx + X * Rr, yLr + 2 - dh * (1 - X * X) * 0.92]); }
    out.push(h.chemin(mer, h.a.detail));
    // la tôle, à plat sur le sommet du dôme ; elle tourne avec le couvercle : de biais en plan
    const yTo = yLr - dh, eT = 2;
    const th = 30 * Math.PI / 180, ct = Math.cos(th), st = Math.sin(th);
    const Q = (u, v) => [u * ct - v * st, u * st + v * ct];
    const P = (u, v) => { const [a, b] = Q(u, v); return [cx + a * Rr, yTo + b * Rr * k]; };
    const coins = [P(-demiTole, -demiTole), P(demiTole, -demiTole), P(demiTole, demiTole), P(-demiTole, demiTole)];
    const bas = coins.reduce((m, c, i) => (c[1] > coins[m][1] ? i : m), 0);
    [coins[(bas + 3) % 4], coins[bas], coins[(bas + 1) % 4]].reduce((a, b) => {
      out.push(h.chemin([a, b, [b[0], b[1] + eT], [a[0], a[1] + eT]], h.a.plein, true));
      return b;
    });
    out.push(h.chemin(coins, blancArete, true));
    [...damier].sort((a, b) => Q(...a)[1] - Q(...b)[1]).forEach(([u, v]) => {
      const [x, y] = P(u, v);
      out.push(braise(x, y - 2, Rr * 0.08, Rr * 0.04, (hasard() - 0.5) * 0.2));
    });
    // la couronne, l'avant : visible sous le chaudron soulevé
    couronne.filter(([, v]) => v >= 0).forEach(p => out.push(braiseSol(p)));

    const fl = d => [h.path(d, halo), h.fleche(d, h.a.arete)].join('\n');
    const geste = d => h.geste(d);
    // on soulève : le chaudron au-dessus de sa couronne, le couvercle à plat
    const xs = cx + Rr + 18;
    out.push(fl(`M ${f(xs)} ${f(yBot + 2)} L ${f(xs)} ${f(yBot - 22)}`));
    out.push(fl(`M ${f(xs)} ${f(yLr + 6)} L ${f(xs)} ${f(yLr - 16)}`));
    // le chaudron : un quart de tour, l'avant va de gauche à droite
    const yM = yR + Hb * 0.62, aC = Rr + 10;
    out.push(geste(arcEllipse(cx, yM, aC, aC * k, 135, 45)));
    // le couvercle : un quart de tour dans l'autre sens, l'avant va de droite à gauche ; la
    // flèche passe dans le jour entre le couvercle soulevé et le chaudron
    const yL = yLr + 2, aL = Rr + 8;
    out.push(geste(arcEllipse(cx, yL, aL, aL * k, 60, 125)));
    return out.join('\n');
  };

  return {
    ref: '88-02',
    titre: 'Le chaudron sur la braise',
    desc: 'Le chaudron de fonte cuit le pain dehors, sur un lit de braise de bouleau abrité du vent par un mur de neige tassée. En coupe : le chaudron posé sur une couronne de braise, sous son bord, le centre vide ; la miche sur le fond fariné ; le couvercle bombé ; une tôle plate posée sur le dôme, qui porte la braise étalée en damier. Vus d’en haut : la couronne dessous, huit braises ; le damier sur la tôle, vingt-quatre, trois fois plus. De trois quarts, toutes les 10 à 15 minutes : le chaudron, soulevé au-dessus de sa couronne, fait un quart de tour ; puis le couvercle, soulevé à plat avec sa tôle et sa braise, fait un quart de tour dans l’autre sens.',
    format: 'pleine',
    disposition: [['coupe'], ['dessous', 'dessus', 'tours']],
    hauteurs: [8, 6],
    largeurs: [[1], [1, 1, 1.35]],
    vues: {
      coupe: {
        titre: 'En coupe',
        dessin: coupe,
        renvois: z => {
          const g = gC(z), { R, cx, yT, eT, yG } = g, xr = cx + R + 42;
          const yF = g.yB - g.t;
          return [
            { n: 1, rond: [(g.xw0 + g.xw1) / 2, g.yW - 26], cible: [(g.xw0 + g.xw1) / 2, g.yW + 14], texte: 'mur de neige tassée, côté vent' },
            { n: 2, rond: [cx - 0.25 * R, yT - eT - 2 * g.ry - 30], cible: [cx - 0.25 * R, yT - eT - g.ry * 1.2], texte: 'braise en damier, jamais en tas' },
            { n: 3, rond: [xr, yT - 22], cible: [cx + demiTole * R - 4, yT - 1.5], texte: 'tôle ou poêlon renversé, pour la braise' },
            { n: 4, rond: [xr, g.yR + 6], cible: [cx + R * 0.93, g.yR - 5], texte: 'couvercle bombé : la braise y glisserait' },
            { n: 5, rond: [xr, yF - 30], cible: [cx + R * 0.5, yF - (yF - g.yR) * 0.2], texte: 'miche sur le fond fariné' },
            { n: 6, rond: [xr, yG - 8], cible: [cx + rCouronne * R + g.rx * 0.6, yG - g.ry], texte: 'couronne de braise ; rien au centre' },
          ];
        },
      },
      dessous: {
        titre: 'Dessous, chaudron enlevé',
        dessin: dessous,
        renvois: z => {
          const { cx, cy, Rp } = gP(z);
          const [u, v] = couronne[0];
          return [{ n: 7, rond: [z.l - 14, cy + Rp + 10], cible: [cx + u * Rp + 6, cy + v * Rp + 4], texte: 'la couronne ; en tireté, le chaudron' }];
        },
      },
      dessus: {
        titre: 'Dessus, sur la tôle',
        dessin: dessus,
        renvois: z => {
          const { cx, cy, Rp } = gP(z);
          return [{ n: 8, rond: [z.l - 14, cy - Rp - 8], cible: [cx + 0.75 * Rp + 4, cy - 0.5 * Rp - 3], texte: 'trois fois plus de braise, en damier' }];
        },
      },
      tours: {
        titre: 'Toutes les 10 à 15 minutes',
        dessin: tours,
        renvois: z => {
          const g = gT(z), aC = g.Rr + 10, yM = g.yR + g.Hb * 0.62, aL = g.Rr + 8, yL = g.yLr + 2;
          const c = Math.cos(Math.PI / 4), sn = Math.sin(Math.PI / 4);
          return [
            { n: 9, rond: [14, yM + aC * k + 20], cible: [g.cx - aC * c - 2, yM + aC * k * sn + 3], texte: 'soulever le chaudron, un quart de tour' },
            { n: 10, rond: [14, g.yLr + 40], cible: [g.cx + aL * Math.cos(Math.PI*0.62), yL + aL * k * Math.sin(Math.PI*0.62) + 1], texte: 'puis le couvercle, à plat, en sens inverse' },
          ];
        },
      },
    },
    danger: 'Danger — la braise reste dehors, jusqu’à la fin. Un chaudron rentré pour finir la cuisson, c’est un barbecue au charbon dans le chalet : la braise brûle sans flamme et presque sans fumée, et elle fait du monoxyde de carbone, qui n’a ni odeur ni couleur.',
  };
};
