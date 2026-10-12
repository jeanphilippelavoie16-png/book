// Planche 96-03a — Arracher une souche au câble : le montage.
// Chapitre 96, B « Ouvrir le champ », étapes 7 à 9 : l'arbre abattu haut laisse un chicot qui sert
// de levier ; dégager au pic et trancher les racines à la hache tout autour ; tirer au vindas de bois
// (ch. 109 §9), le câble attaché haut sur le chicot, l'élingue logée dans une entaille du côté opposé
// à la traction ; personne dans l'axe du câble, des deux bords ; une masse à cheval sur le câble à
// mi-portée (encadré danger, point 4 : couverture épaisse, vieux manteau ou chaîne).
// Le vindas est celui de la planche 109-08 : tambour dans deux arbres voisins entaillés en V (ch. 109,
// étape 1), barres près d'un bout, cliquet à planche pivotante. Le tambour est couché derrière les
// arbres, du côté opposé à la souche : la traction le plaque dans les entailles au lieu de l'en sortir.
// Le treuilleur pousse la barre de gauche vers le bas (109-08) : il se tient au bout du tambour, à
// côté de l'axe du câble.
// Aucune cote : le chapitre ne donne ni la hauteur du chicot, ni la longueur du câble, ni la largeur
// de l'axe à dégager. Les proportions (chicot de 1,55 m, câble d'environ 5 m, barre de 1,5 m, axe du
// tambour à 1,6 m comme sur 109-08) ne servent qu'au dessin.
// Vue 1 : de côté, le sol coupé dans l'axe du câble. Vue 2 : de dessus, alignée sous la vue 1 (mêmes x).
module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blanc = (t = 'arete') => h.a[t].replace('fill="none"', 'fill="#FFFFFF"');
  const D = (pts, ferme = true) => 'M ' + pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ') + (ferme ? ' Z' : '');
  const rad = a => a * Math.PI / 180;
  // Courbe lisse (Catmull-Rom) par des points ; ferme = true pour une forme.
  const lisse = (pts, ferme = true) => {
    const n = pts.length, get = i => (ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
      d += ` C ${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };

  // ── Le monde, en mm. X le long du câble (le chicot en 0, le vindas à gauche), Y la hauteur (sol 0),
  //    P en travers (plan : positif vers le lecteur, donc vers le bas de la vue de dessus).
  const XMIN = -7700, XMAX = 1400;
  const XT = -5000, RT = 160, PT = 850;           // les deux arbres
  const XV = -5250, YV = 1620, RV = 150;          // le tambour
  const LB = 1480;                                // la barre, depuis l'axe
  const HC = 1550, YN = 1360;                     // hauteur du chicot ; l'élingue, sous l'épaulement
  const XE = -450, YE = 1360;                     // l'anneau où les brins de l'élingue prennent le câble
  const XP = -4380, YP = 1300;                    // piquet et pivot du cliquet
  const PB1 = 1220, PB2 = 1120;                   // plans des deux barres (plan)
  const PBOUT = 1350, PFOND = -1150;              // bouts du tambour (plan)
  const AXE = 520;                                // demi-largeur de l'axe à laisser vide (dessin)
  const r = Y => Y < 0 ? 330 : Y < 250 ? 270 + 60 * (1 - Y / 250) ** 2 : 270 - 70 * (Y - 250) / 1300;

  // Le câble, du dessus du tambour à l'anneau, avec un léger creux sous la couverture.
  const XM = (XE + XV) / 2;
  const yc = X => {
    const t = (X - XV) / (XE - XV), lin = (YV + RV) + (YE - (YV + RV)) * t;
    return lin - 70 * Math.sin(Math.PI * t);
  };

  const vue = (z) => {
    const s = (z.l - 10) / (XMAX - XMIN);
    const x = X => 5 + (X - XMIN) * s;
    return { s, x };
  };

  // ─── Vue 1 : de côté ────────────────────────────────────────────────────────────────
  const E = z => {
    const { s, x } = vue(z);
    const gy = z.h - 44;
    const y = Y => gy - Y * s;
    return { s, x, y, gy };
  };

  const racineCoupe = (q, sens) => {
    // Une racine latérale dans le plan de coupe, du collet à la paroi de la fosse, tranchée en V.
    // sens = +1 à droite, -1 à gauche. Haut et bas de la racine, en fonction de |X|.
    const haut = u => -110 - 0.12 * (u - 300);
    const bas = u => -250 + 0.05 * (u - 300) + 0 * u;
    const ep = u => (bas(u) - haut(u));
    const top = u => haut(u), bot = u => haut(u) - Math.max(80, 150 - 0.06 * (u - 300));
    const c1 = 560, c2 = 630, fin = 1250;
    const P = (u, Y) => [q.x(sens * u), q.y(Y)];
    const tronc = [P(300, top(300)), P(c1 + 20, top(c1 + 20)), P(c1 - 15, bot(c1 - 15)), P(300, bot(300))];
    const bout = [P(c2 - 20, top(c2 - 20)), P(fin, top(fin) - 15), P(fin + 30, (top(fin) + bot(fin)) / 2), P(fin, bot(fin) + 10), P(c2 + 15, bot(c2 + 15))];
    return [
      h.path(D(tronc), blanc('arete')),
      h.path(D(bout), blanc('arete')),
      h.ligne(q.x(sens * 380), q.y((top(380) + bot(380)) / 2), q.x(sens * 520), q.y((top(520) + bot(520)) / 2 + 5), h.a.fin),
      h.ligne(q.x(sens * 700), q.y((top(700) + bot(700)) / 2), q.x(sens * 1050), q.y((top(1050) + bot(1050)) / 2 - 5), h.a.fin),
    ].join('\n');
  };

  const elevation = z => {
    const q = E(z), { x, y, s, gy } = q, out = [];
    // Le sol, coupé : la fosse creusée au pic autour de la souche.
    const pitE = 850, pitF = 640, pitP = -330;
    const sol = [[0, gy], [x(-pitE), gy], [x(-pitF), y(pitP)], [x(pitF), y(pitP)], [x(pitE), gy], [z.l, gy], [z.l, z.h], [0, z.h]];
    out.push(h.path(D(sol), h.a.hachure('terre', 'aucun')));
    out.push(h.chemin([[0, gy], [x(-pitE), gy], [x(-pitF), y(pitP)], [x(pitF), y(pitP)], [x(pitE), gy], [z.l, gy]], h.a.contour));
    out.push(h.ligne(x(-pitE), gy, x(pitE), gy, h.a.fin));            // le bord de la fosse, derrière

    // Le chicot : collet dégagé, empattement, fût qui s'amincit, coupe d'abattage en haut.
    const Ys = [];
    for (let Y = -330; Y <= HC; Y += 50) Ys.push(Y);
    if (Ys[Ys.length - 1] !== HC) Ys.push(HC);
    const gauche = Ys.map(Y => [x(-r(Y)), y(Y)]);
    const droite = Ys.map(Y => [x(r(Y)), y(Y)]).reverse();
    // l'entaille, côté droit (opposé à la traction) : épaulement plat, face basse en biais
    const nH = 1372, nB = nH - Math.max(200, 30 / s), nP = 130;
    const droiteEnt = [];
    droite.forEach(p => {
      const Y = (gy - p[1]) / s;
      if (Y > nH + 1 || Y < nB - 1) droiteEnt.push(p);
      else if (Math.abs(Y - nH) < 26) {
        droiteEnt.push([x(r(nH)), y(nH)], [x(r(nH) - nP), y(nH)], [x(r(nB)), y(nB)]);
      }
    });
    const fond = [[x(r(-330)), y(-330)], [x(180), y(-420)], [x(-180), y(-420)], [x(-r(-330)), y(-330)]];
    // racines pivotantes, courtes, sous la souche (non tranchées : c'est la traction qui les casse)
    out.push(h.path(D([[x(-150), y(-400)], [x(-230), y(-600)], [x(-200), y(-640)], [x(-90), y(-420)]]), blanc('detail')));
    out.push(h.path(D([[x(120), y(-410)], [x(170), y(-580)], [x(210), y(-575)], [x(200), y(-400)]]), blanc('detail')));
    out.push(racineCoupe(q, -1), racineCoupe(q, 1));
    out.push(h.path(D([...gauche, [x(-r(HC) + 60), y(HC)], [x(-20), y(HC)], [x(-20), y(HC + 25)], [x(r(HC) - 10), y(HC + 25)], ...droiteEnt, ...fond]), blanc('contour')));
    // fil du bois
    [[-120, 300, 1350], [60, 150, 1250], [150, 500, 1100]].forEach(([X0, Y0, Y1]) =>
      out.push(h.ligne(x(X0), y(Y0), x(X0 * 0.85), y(Y1), h.a.fin)));

    // Le câble, derrière tout ce qui est près du vindas.
    const pts = [];
    for (let X = XV; X <= XE; X += 100) pts.push([x(X), y(yc(X))]);
    pts.push([x(XE), y(YE)]);
    out.push(h.chemin(pts, h.a.contour));
    // L'élingue : de l'anneau au flanc du chicot, puis en travers de la face, jusque dans l'entaille.
    // Double trait à intérieur blanc, plus fin que le contour, couché sous l'épaulement jusqu'au fond.
    const EP = 4.2, Yb = nH - 3.4 / s;
    const xFond = (r(nH) - nP) + (r(nB) - (r(nH) - nP)) * ((nH - Yb) / (nH - nB));
    const pE = [[x(XE + 40), y(YE)], [x(-r(Yb)), y(Yb)], [x(xFond) - EP / 2, y(Yb)]];
    const n = pE.length, G = [], Dd = [];
    for (let i = 0; i < n; i++) {
      const a = pE[Math.max(0, i - 1)], b = pE[Math.min(n - 1, i + 1)];
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]), nx = -(b[1] - a[1]) / L * EP / 2, ny = (b[0] - a[0]) / L * EP / 2;
      G.push([pE[i][0] + nx, pE[i][1] + ny]); Dd.push([pE[i][0] - nx, pE[i][1] - ny]);
    }
    let dE = 'M ' + G.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ');
    dE += ` A ${f(EP / 2)} ${f(EP / 2)} 0 0 0 ${f(Dd[n - 1][0])} ${f(Dd[n - 1][1])}`;
    dE += ' L ' + Dd.slice().reverse().map(p => `${f(p[0])} ${f(p[1])}`).join(' L ') + ' Z';
    out.push(h.path(dE, blanc('detail')));
    out.push(h.cercle(x(XE), y(YE), 45 * s + 1.2, blanc('arete')));

    // La couverture à cheval sur le câble, à mi-portée.
    const cy0 = yc(XM - 350), cy1 = yc(XM + 350);
    const cov = [[x(XM - 330), y(cy0 + 30)], [x(XM - 360), y(cy0 - 200)], [x(XM - 395), y(cy0 - 455)],
      [x(XM - 250), y(cy0 - 480)], [x(XM - 90), y(yc(XM) - 430)], [x(XM + 70), y(yc(XM) - 495)], [x(XM + 230), y(cy1 - 455)],
      [x(XM + 390), y(cy1 - 510)], [x(XM + 365), y(cy1 - 240)], [x(XM + 335), y(cy1 + 30)], [x(XM), y(yc(XM) + 50)]];
    out.push(h.path(lisse(cov), blanc('arete')));
    [[-230, 60, 470], [-90, 70, 420], [70, 60, 480], [230, 70, 440]].forEach(([dx, a, b]) =>
      out.push(h.path(lisse([[x(XM + dx), y(yc(XM + dx) - a)], [x(XM + dx - 15), y(yc(XM + dx) - (a + b) / 2)], [x(XM + dx + 10), y(yc(XM + dx) - b)]], false), h.a.fin)));

    // L'arbre du devant (celui du fond est caché derrière), rompu en haut de la vue.
    const tr = [[x(XT - RT * 1.5), gy], [x(XT - RT * 1.1), y(260)], [x(XT - RT), y(700)], [x(XT - RT), 8],
      [x(XT - RT * 0.4), 3], [x(XT), 9], [x(XT + RT * 0.45), 2], [x(XT + RT), 7],
      [x(XT + RT), y(700)], [x(XT + RT * 1.1), y(260)], [x(XT + RT * 1.5), gy]];
    out.push(h.path(D(tr), blanc('contour')));
    [[-60, 400, 2600], [70, 900, 3300]].forEach(([dx, a, b]) =>
      out.push(h.ligne(x(XT + dx), y(a), x(XT + dx), Math.max(y(b), 16), h.a.fin)));

    // Le vindas vu du bout : les deux barres, le bout du tambour et ses chevilles, le cliquet.
    const bar = (ang, ep = 60) => {
      const u = [Math.cos(rad(ang)), Math.sin(rad(ang))], n = [-u[1], u[0]];
      const P = (k, e) => [x(XV + u[0] * k + n[0] * e), y(YV + u[1] * k + n[1] * e)];
      return h.path(D([P(-LB, ep / 2), P(LB, ep / 2), P(LB, -ep / 2), P(-LB, -ep / 2)]), blanc('arete'));
    };
    out.push(bar(10), bar(100));
    out.push(h.cercle(x(XV), y(YV), RV * s, blanc('contour')));
    for (let i = 0; i < 6; i++) {
      const a = rad(-15 + i * 60);
      out.push(h.cercle(x(XV + 115 * Math.cos(a)), y(YV + 115 * Math.sin(a)), 1.1, h.a.plein));
    }
    const chev0 = [XV + 115 * Math.cos(rad(-15)), YV + 115 * Math.sin(rad(-15))];
    const chev = [XV + 115 * Math.cos(rad(-15)), YV + 115 * Math.sin(rad(-15))];
    // le piquet : tête arrondie, pied appointé enfoncé dans le sol
    const WP = 60, HP = YP + 90;
    out.push(h.path(`M ${f(x(XP - WP))} ${f(y(-260))} L ${f(x(XP - WP))} ${f(y(HP))} A ${f(WP * s)} ${f(WP * s)} 0 0 1 ${f(x(XP + WP))} ${f(y(HP))} L ${f(x(XP + WP))} ${f(y(-260))} L ${f(x(XP))} ${f(y(-480))} Z`, blanc('arete')));
    const pu = [chev[0] - XP, chev[1] - YP], pl = Math.hypot(...pu), pn = [-pu[1] / pl * 30, pu[0] / pl * 30];
    { const k = (pl - 30) / pl; chev[0] = XP + pu[0] * k; chev[1] = YP + pu[1] * k; }
    out.push(h.path(D([[x(XP + pn[0]), y(YP + pn[1])], [x(chev[0] + pn[0]), y(chev[1] + pn[1])],
      [x(chev[0] - pn[0]), y(chev[1] - pn[1])], [x(XP - pn[0]), y(YP - pn[1])]]), blanc('arete')));
    out.push(h.cercle(x(XP), y(YP), 1.6, h.a.plein));
    out.push(h.cercle(x(chev0[0]), y(chev0[1]), 2.2, h.a.plein));

    // Les gestes : la barre poussée vers le bas ; le chicot qui bascule vers le vindas.
    const arc = (cx, cy, R, a0, a1, sweep) => {
      const p0 = [x(cx + R * Math.cos(rad(a0))), y(cy + R * Math.sin(rad(a0)))];
      const p1 = [x(cx + R * Math.cos(rad(a1))), y(cy + R * Math.sin(rad(a1)))];
      return `M ${f(p0[0])} ${f(p0[1])} A ${f(R * s)} ${f(R * s)} 0 0 ${sweep} ${f(p1[0])} ${f(p1[1])}`;
    };
    out.push(h.fleche(arc(XV, YV, LB * 0.78, 198, 222, 0)));
    out.push(h.fleche(arc(-330, -150, 1950, 80, 101, 0)));
    return out.join('\n');
  };

  // ─── Vue 2 : de dessus ──────────────────────────────────────────────────────────────
  const P2 = z => {
    const { s, x } = vue(z);
    const cy = 16 + 1150 * s;
    const p = P => cy + P * s;
    return { s, x, p, cy };
  };

  const empreinte = (q, X, P, gauche) => {
    // Une semelle de botte, pointe vers le vindas (+X) : avant-pied et talon séparés par la cambrure.
    const L = 290, Wd = 110, sg = gauche ? -1 : 1;
    const Q = (u, v) => [q.x(X + u * L), q.p(P + sg * v * Wd)];
    const avant = [[0.42, -0.40], [0.62, -0.50], [0.82, -0.47], [0.96, -0.30], [1.0, 0.0], [0.96, 0.26], [0.84, 0.44], [0.64, 0.50], [0.45, 0.42], [0.40, 0.0]].map(([u, v]) => Q(u, v));
    const talon = [[0.02, -0.34], [0.26, -0.37], [0.29, 0.0], [0.26, 0.37], [0.02, 0.34], [-0.01, 0.0]].map(([u, v]) => Q(u, v));
    return [h.path(lisse(avant), blanc('arete')), h.path(lisse(talon), blanc('arete'))].join('\n');
  };

  const plan = z => {
    const q = P2(z), { x, p, s } = q, out = [];
    // L'axe à laisser vide, des deux bords, sur toute la longueur.
    out.push(h.ligne(2, p(-AXE), z.l - 2, p(-AXE), h.a.cache), h.ligne(2, p(AXE), z.l - 2, p(AXE), h.a.cache));

    // La fosse et les racines tranchées.
    out.push(h.cercle(x(0), p(0), 850 * s, h.a.arete), h.cercle(x(0), p(0), 640 * s, h.a.fin));
    [[4, 62, 4], [64, 48, -6], [122, 56, 5], [196, 60, -3], [250, 46, 7], [305, 54, -5]].forEach(([a, w, pli]) => {
      const dir = k => rad(a + pli * (k - 300) / 900);
      const Q = (k, e) => { const t = dir(k); return [x(k * Math.cos(t) - e * Math.sin(t)), p(k * Math.sin(t) + e * Math.cos(t))]; };
      const ep = k => w * (1 - 0.35 * (k - 300) / 900);
      out.push(h.path(D([Q(300, ep(300)), Q(450, ep(450)), Q(565, ep(565)), Q(585, -ep(585)), Q(450, -ep(450)), Q(300, -ep(300))]), blanc('arete')));
      out.push(h.path(D([Q(615, ep(615)), Q(850, ep(850)), Q(850, -ep(850)), Q(635, -ep(635))]), blanc('arete')));
      out.push(h.path(D([Q(850, ep(850)), Q(1000, ep(1000)), Q(1120, 0), Q(1000, -ep(1000)), Q(850, -ep(850))], false), h.a.cache));
    });
    // Le chicot vu d'en haut : collet au fond de la fosse, coupe d'abattage.
    out.push(h.cercle(x(0), p(0), 330 * s, blanc('arete')));
    out.push(h.cercle(x(0), p(0), 200 * s, blanc('contour')));
    out.push(h.cercle(x(0), p(0), 120 * s, h.a.fin), h.cercle(x(0), p(0), 55 * s, h.a.fin));
    // L'élingue : les deux brins partent des flancs et se rejoignent à l'anneau.
    const tg = 212;
    out.push(h.chemin([[x(-20), p(-tg)], [x(XE + 40), p(-12)]], h.a.contour));
    out.push(h.chemin([[x(-20), p(tg)], [x(XE + 40), p(12)]], h.a.contour));
    out.push(h.path(`M ${f(x(-20))} ${f(p(-tg))} A ${f(tg * s)} ${f(tg * s)} 0 0 1 ${f(x(-20))} ${f(p(tg))}`, h.a.cache));

    // Le câble, le long de l'axe.
    out.push(h.ligne(x(XV), p(0), x(XE), p(0), h.a.contour));
    out.push(h.cercle(x(XE), p(0), 45 * s + 1.2, blanc('arete')));
    // La couverture à cheval sur le câble.
    const XMp = (XE + XV) / 2;
    out.push(h.path(D([[x(XMp - 350), p(-190)], [x(XMp + 360), p(-180)], [x(XMp + 380), p(185)], [x(XMp - 360), p(195)]]), blanc('arete')));
    out.push(h.ligne(x(XMp - 350), p(0), x(XMp + 370), p(0), h.a.detail));

    // Les arbres, coupés à la hauteur du tambour ; le tambour plaqué dans leurs entailles.
    [-PT, PT].forEach(P => out.push(h.cercle(x(XT), p(P), RT * s, h.a.hachure('bois', 'contour'))));
    out.push(h.rect(x(XV - RV), p(PFOND), 2 * RV * s, (PBOUT - PFOND) * s, blanc('contour')));
    // quelques tours de câble sur le tambour, en une seule couche
    for (let k = 0; k < 5; k++) {
      const P0 = -40 + k * 55;
      out.push(h.ligne(x(XV - RV), p(P0 + 25), x(XV + RV), p(P0), h.a.detail));
    }
    // les deux barres, près du bout du tambour
    out.push(h.rect(x(XV - LB * Math.cos(rad(10))), p(PB1 - 30), 2 * LB * Math.cos(rad(10)) * s, 60 * s, blanc('arete')));
    out.push(h.rect(x(XV - LB * Math.cos(rad(80))), p(PB2 - 30), 2 * LB * Math.cos(rad(80)) * s, 60 * s, blanc('arete')));
    // le cliquet : la planche, du piquet au bout du tambour
    out.push(h.rect(x(XV + 70), p(PBOUT + 10), (XP - XV - 70) * s, 50 * s, blanc('arete')));
    out.push(h.rect(x(XP - 60), p(PBOUT - 10), 120 * s, 90 * s, blanc('arete')));

    // Le treuilleur : ses pieds, au bout de la barre, à côté de l'axe.
    out.push(empreinte(q, -7560, PB1 + 110, false), empreinte(q, -7330, PB1 - 115, true));
    return out.join('\n');
  };

  return {
    ref: '96-03a',
    titre: 'Arracher une souche au câble : le montage',
    desc: 'Planche avec encadré danger. De côté puis de dessus, alignés : le chicot laissé haut, ses racines dégagées et tranchées dans une fosse, le câble attaché haut par une élingue logée dans une entaille du côté opposé au vindas, une couverture à cheval sur le câble à mi-portée, le vindas couché derrière deux arbres entaillés, le treuilleur au bout de la barre, à côté de l’axe du câble qu’on laisse vide des deux bords.',
    format: 'pleine',
    disposition: [['elev'], ['plan']],
    hauteurs: [3, 2],
    vues: {
      elev: {
        titre: 'De côté, le sol coupé dans l’axe du câble',
        dessin: elevation,
        renvois: z => {
          const { x, y } = E(z);
          return [
            { n: 1, rond: [x(1150), y(1300)], cible: [x(r(900) - 20), y(900)], texte: 'le chicot, laissé haut à l’abattage' },
            { n: 2, rond: [x(1150), y(250)], cible: [x(900), y(-140)], texte: 'les racines tranchées tout autour' },
            { n: 3, rond: [x(-900), y(2250)], cible: [x(-240), y(YN)], texte: 'attaché haut, l’élingue dans l’entaille (96-03b)' },
            { n: 4, rond: [x(XM), y(2500)], cible: [x(XM + 60), y(yc(XM) - 150)], texte: 'une couverture à cheval, à mi-portée' },
            { n: 5, rond: [x(-3800), y(2800)], cible: [x(XP - 20), y(YP + 150)], texte: 'le vindas, cliquet engagé (ch. 109)' },
          ];
        },
      },
      plan: {
        titre: 'De dessus',
        dessin: plan,
        renvois: z => {
          const { x, p } = P2(z);
          return [
            { n: 6, rond: [x(-2000), p(-900)], cible: [x(-2000), p(-AXE)], texte: 'l’axe du câble : personne, des deux bords' },
            { n: 7, rond: [x(-7500), p(-300)], cible: [x(-7420), p(PB1 - 60)], texte: 'le treuilleur, à côté de l’axe' },
          ];
        },
      },
    },
    danger: 'Quand une racine cède d’un coup ou que l’élingue saute du chicot, l’énergie du câble repart dans l’axe, plus vite que n’importe quel réflexe. Personne dans l’axe, des deux bords, sur toute la longueur du câble ; quand la souche résiste, on relâche au lieu de tirer plus fort.',
  };
};
