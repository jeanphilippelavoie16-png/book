// Planche 98-01b — Le fléau : battre sur la toile.
// Chapitre 98, « Ce qui nourrit un hiver », § « Le fléau qu'on fabrique » et étape 39 (Battre).
// Le chapitre dit : le manche se tient à deux mains ; le battoir, libre, tombe à plat sur les
// épis au lieu de les frapper du bout ; les gerbes se couchent sur la toile en deux rangées, épis
// vers le milieu ; on frappe, on retourne la couche, on refrappe, puis on secoue la paille et on
// la retire. Le grain tombé dans l'herbe est perdu (la toile). Un coup mal pris ramène le
// battoir sur la tête ou les mains de celui qui bat : le geste s'apprend lentement, à petits coups.
//
// Deux vues à la même échelle, la même origine en x : de côté, dans l'axe des rangées (on voit
// une gerbe de chaque rangée sur sa longueur, les épis qui se croisent au milieu, le battoir
// couché dessus), et de dessus, alignée dessous (les deux rangées, les pieds en empreintes, le
// fléau). Aucune cote : le chapitre ne donne aucune mesure du fléau ni de la couche.
// 13 oct. : le batteur est le corps simple (pose « fleau »), les bras recalculés pour que les deux
// poings se ferment sur la ligne du manche ; la charte : le fléau pèse, la gerbe du fond et la toile
// en gris, le rouge sur la tête du battoir qui tombe et sur le battoir à plat (le point à voir).
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f1 = v => Math.round(v * 10) / 10;
  const blanc = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const pl = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])} ${f1(p[1])}`).join(' ');
  const lisse = pts => {           // une courbe qui passe par chaque point (Catmull-Rom)
    let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`;
    }
    return d;
  };

  // ── proportions du dessin, en mm (aucune n'est cotée) ──
  const K = 0.17;                                   // px par mm, les deux vues
  // le manche : sa pente (degrés sous l'horizontale), la main arrière (mm devant les chevilles),
  // l'écart des deux mains sur le manche ; la hauteur de la main arrière se déduit pour que le
  // battoir tombe à plat sur une couche de gerbes de la même épaisseur, et la vue se recale pour
  // que la couche reste à la même place sur la page
  const AM = 21, GRX = 310, EC = 120, GRY = 690;
  const X0 = 546 - ((GRX + 1300 * Math.cos(AM * Math.PI / 180)) - 1316.4);   // mm à gauche des pieds
  const LM = 1350, LB = 750, RM = 18, RB = 25, G = 139;
  const LG = 850, RECOUV = 120;                     // gerbe : longueur ; les épis dépassent le milieu de tant
  const PY = [0, 1020], GW = 200, YM = 455;          // plan : longueur de toile montrée, largeur d'une gerbe, axe du fléau
  const GYB = [110, 340, 570, 800], GYA = [225, 455, 685, 915];      // les gerbes des deux rangées, en quinconce

  const X = x => (x + X0) * K;
  // Le batteur : le corps simple, pose « fleau » ; les bras recalculés pour que les deux poings tombent
  // sur la ligne du manche, la main proche (arrière) à GRX devant les chevilles et GRY du sol, la main
  // loin (avant) EC plus loin sur le manche, l'axe des deux prises le long du manche.
  const BRAS = { brasP: -26.6, avantbrasP: 28.7, mainP: -21, brasL: -2.9, avantbrasL: 24.3, mainL: -21 };

  // ── le batteur, le manche et le battoir : calculés une fois, pour les deux vues ──
  // Les poignets sont placés pour que le creux de chaque main tombe sur la ligne du manche.
  function batteur(yS) {
    const V = (x, y) => [X(x), yS + y * K];
    // le batteur est plié sur le coup, les bras qui tombent des épaules : la main arrière près du
    // bout du manche, la main avant plus bas sur le manche ; le manche descend de AM degrés
    const am = AM * Math.PI / 180, Gr = [GRX, -GRY];
    const Gf = [Gr[0] + Math.cos(am), Gr[1] + Math.sin(am)];
    // la main arrière est la main proche ; la main avant, la main loin
    const u = [Gf[0] - Gr[0], Gf[1] - Gr[1]], n = Math.hypot(...u); u[0] /= n; u[1] /= n;
    const bout = [Gr[0] - 50 * u[0], Gr[1] - 50 * u[1]];              // le bout du manche, derrière la main arrière
    const J = [bout[0] + LM * u[0], bout[1] + LM * u[1]];              // le bout avant du manche (mm)
    const B0 = J[0] + G * 0.9;                                         // le bout du battoir, à plat
    const yB = J[1];                                                   // l'axe du battoir
    const Gl = [Gr[0] + EC * u[0], Gr[1] + EC * u[1]];              // la main avant, écartée de la main arrière
    return { u, bout, J, B0, yB, V, Gr, Gf: Gl };
  }
  const geo = (() => {
    const b = batteur(0);
    const Xm = b.B0 + LB / 2;                                          // le milieu des épis
    return { Xm, hc: -(b.yB + RB), rangB: [Xm - LG + RECOUV, Xm + RECOUV], rangA: [Xm + LG - RECOUV, Xm - RECOUV] };
  })();
  const TOILE = [geo.rangB[0] - 150, geo.rangA[0] + 150];

  // ── un bâton le long d'une direction, en px ; rupture ou bout rond au départ ──
  function baton(P0, d, l, r) {
    const nn = [-d[1], d[0]], Q = (x, y) => [P0[0] + x * d[0] + y * nn[0], P0[1] + x * d[1] + y * nn[1]];
    const c = Math.min(4, r * 0.4);
    const pts = [Q(c, -r), Q(l - c, -r), Q(l, -r + c), Q(l, r - c), Q(l - c, r), Q(c, r), Q(0, r - c), Q(0, -r + c)];
    return h.path(pl(pts) + ' Z', blanc(A.contour));
  }

  // ── un épi d'orge : grains en chevrons, barbes devant ──
  function epi(x, y, L, ang, e = 0.2, trait = A.detail) {
    const c = Math.cos(ang * Math.PI / 180), s = Math.sin(ang * Math.PI / 180);
    const P = (u, v) => [x + u * c - v * s, y + u * s + v * c];
    const w = L * e, bord = [];
    for (let i = 0; i <= 10; i++) bord.push(P(L * i / 10, -w * Math.sin(Math.PI * (0.15 + 0.85 * i / 10))));
    for (let i = 10; i >= 0; i--) bord.push(P(L * i / 10, w * Math.sin(Math.PI * (0.15 + 0.85 * i / 10))));
    const out = [h.path(pl(bord) + ' Z', blanc(trait))];
    for (let i = 1; i < 5; i++) { const u = L * i / 5; out.push(h.chemin([P(u - w * 0.9, -w * 0.7), P(u, 0), P(u - w * 0.9, w * 0.7)], A.fin)); }
    for (const v of [-0.45, 0, 0.45]) out.push(h.chemin([P(L * 0.9, v * w), P(L * 1.7, v * w * 3)], A.fin));
    return out.join('\n');
  }

  // Une gerbe : les tiges liées d'un lien de paille tordue, le pied coupé net, et au bout les
  // épis en éventail, qui dépassent du corps de la gerbe. Profil du corps (fraction de la longueur,
  // fraction de l'épaisseur) : pied, lien serré, puis la gerbe s'ouvre vers les épis.
  const CORPS = [[0, 0.66], [0.1, 0.7], [0.3, 0.5], [0.48, 0.72], [0.66, 0.86], [0.8, 0.9]];
  const NEPIS = 7, EPI = 105;                     // épis par gerbe dans la vue ; longueur d'un épi (mm)

  // vue de côté : du pied (xb) au bout des barbes (xt), posée sur y = yS ; hc : épaisseur (mm)
  function gerbeCote(xb, xt, yS, hc, graine, loin = false) {
    const s = Math.sign(xt - xb), L = Math.abs(xt - xb);
    const at = f => X(xb + s * L * f), Y = f => yS - f * hc * K;
    let r = graine; const rnd = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
    const haut = CORPS.map(([f, e]) => [at(f), Y(e)]);
    const out = [];
    // le corps : le blanc sans trait, puis le dessus et le pied au trait
    out.push(h.path(lisse(haut) + ` L${f1(at(0.8))} ${f1(yS)} L${f1(at(0))} ${f1(yS)} Z`, loin ? A.loin : 'fill="#FFFFFF" stroke="none"'));
    out.push(h.path(lisse(haut), A.arete));
    out.push(h.path(pl([[at(0), yS], [at(0) - s * 1.2, Y(0.22)], [at(0) + s * 0.8, Y(0.45)], [at(0), Y(0.66)]]), A.arete));
    // les tiges
    for (const e of [0.14, 0.3, 0.46, 0.62, 0.78]) {
      const a = 0.02 + rnd() * 0.05;
      out.push(h.path(lisse(CORPS.map(([f, ee]) => [at(Math.max(f, a)), Y(ee * e)])), A.fin));
    }
    // le lien de paille tordue
    for (const dx of [-0.018, 0.018]) out.push(h.path(lisse([[at(0.3 + dx), yS], [at(0.3 + dx) + s * 1.5, Y(0.26)], [at(0.3 + dx), Y(0.5)]]), A.detail));
    // les épis, en éventail : leur base dans le corps, la pointe vers le milieu
    for (let i = 0; i < NEPIS; i++) {
      const v = i / (NEPIS - 1), x = xb + s * L * (0.72 + rnd() * 0.04);
      out.push(epi(X(x), Y(0.1 + 0.84 * v), EPI * K * (0.92 + rnd() * 0.16), (s > 0 ? 0 : 180) - s * (v - 0.5) * 22, 0.2));
    }
    return out.join('\n');
  }

  // vue de dessus : du pied (xb) au bout des barbes (xt), centrée en y = yc (px)
  function gerbeDessus(xb, xt, yc, graine) {
    const s = Math.sign(xt - xb), L = Math.abs(xt - xb), w = GW * K / 2;
    const at = f => X(xb + s * L * f);
    let r = graine; const rnd = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
    const bordH = CORPS.map(([f, e]) => [at(f), yc - w * e / 0.9]), bordB = CORPS.map(([f, e]) => [at(f), yc + w * e / 0.9]);
    const out = [];
    const fond = lisse(bordH) + ' L' + lisse(bordB.slice().reverse()).slice(1) + ' Z';
    out.push(h.path(fond, 'fill="#FFFFFF" stroke="none"'));
    out.push(h.path(lisse(bordH), A.arete), h.path(lisse(bordB), A.arete));
    out.push(h.path(pl([[at(0), yc - w * 0.73], [at(0) + s * 0.8, yc - w * 0.2], [at(0) - s * 0.8, yc + w * 0.3], [at(0), yc + w * 0.73]]), A.arete));
    for (const e of [-0.6, -0.3, 0, 0.3, 0.6]) out.push(h.path(lisse(CORPS.map(([f, ee]) => [at(Math.max(f, 0.03)), yc + w * e * ee / 0.9])), A.fin));
    for (const dx of [-0.018, 0.018]) out.push(h.ligne(at(0.3 + dx), yc - w * 0.56, at(0.3 + dx), yc + w * 0.56, A.detail));
    for (let i = 0; i < NEPIS; i++) {
      const v = (i - (NEPIS - 1) / 2) / ((NEPIS - 1) / 2);
      out.push(epi(X(xb + s * L * (0.72 + rnd() * 0.04)), yc + v * w * 0.82, EPI * K * (0.92 + rnd() * 0.16), (s > 0 ? 0 : 180) + s * v * 14, 0.2));
    }
    return out.join('\n');
  }

  // ── une empreinte de semelle, en plan : le talon, puis l'avant du pied ; talon en x, orteils vers +x ──
  function empreinte(x, y, droite) {
    const sg = droite ? 1 : -1, P = (u, v) => [X(x + u), y + sg * v * K];
    const talon = [P(4, -24), P(40, -32), P(74, -26), P(78, 0), P(74, 26), P(40, 32), P(4, 24), P(0, 0)];
    const avant = [P(100, -24), P(150, -34), P(205, -44), P(250, -32), P(268, -4), P(258, 30), P(205, 42), P(150, 36), P(100, 28), P(94, 2)];
    return [h.path(lisse([...talon, talon[0]]) + ' Z', blanc(A.arete)), h.path(lisse([...avant, avant[0]]) + ' Z', blanc(A.arete))].join('\n');
  }

  const vueCoup = z => {
    const yS = z.h - 12, b = batteur(yS);
    return { yS, b, V: b.V };
  };

  return {
    ref: '98-01b',
    titre: 'Le fléau : battre sur la toile',
    desc: 'Encadré danger : le coup mal pris. En haut, de côté, dans l’axe des rangées : le batteur, plié sur le coup, les bras qui tombent des épaules, tient le manche à deux mains, les deux poings refermés dessus et écartés, la main arrière près du bout du manche ; le battoir est tombé à plat sur les épis (cerclé de rouge) ; une gerbe de chaque rangée, couchée sur la toile, celle du fond en gris, les épis qui se croisent au milieu ; la flèche rouge suit la tête du battoir qui descend. En bas, vue de dessus, alignée : la toile en gris, les deux rangées de gerbes, épis vers le milieu, le fléau couché sur les épis, et les pieds du batteur en empreintes.',
    format: 'pleine',
    disposition: [['coup'], ['plan']],
    hauteurs: [1720, 1180],
    vues: {
      coup: {
        titre: 'De côté, dans l’axe des rangées',
        dessin: z => {
          const { yS, b, V } = vueCoup(z), hc = geo.hc, out = [];
          // le sol, la toile
          out.push(h.rect(4, yS, z.l - 8, 7, A.hachure('terre', 'aucun')), h.ligne(4, yS, z.l - 4, yS, A.arete));
          out.push(h.path(`M${f1(X(TOILE[0]) - 4)} ${f1(yS - 5)} Q${f1(X(TOILE[0]))} ${f1(yS - 1.5)} ${f1(X(TOILE[0]) + 8)} ${f1(yS - 1.5)} L${f1(X(TOILE[1]) - 8)} ${f1(yS - 1.5)} Q${f1(X(TOILE[1]))} ${f1(yS - 1.5)} ${f1(X(TOILE[1]) + 4)} ${f1(yS - 5)}`, A.detail));
          // une gerbe de chaque rangée : celle du fond d'abord, épis vers la gauche, en gris (le plan loin)
          out.push(gerbeCote(geo.rangA[0], geo.rangA[1], yS - 1.5, hc, 11, true));
          out.push(gerbeCote(geo.rangB[0], geo.rangB[1], yS - 1.5, hc, 5));
          // le battoir couché sur les épis, l'attache, le manche
          const J = V(...b.J), B0 = V(b.B0, b.yB), u = b.u;
          out.push(baton(B0, [1, 0], LB * K, RB * K));
          out.push(h.chemin([J, B0], A.arete));
          const pM = V(...b.bout);
          const manche = baton(pM, u, LM * K, RM * K);
          // le batteur : le corps simple ; le manche passe devant le poing loin et dans le poing proche
          const pers = F.corps({ x: X(0), y: yS, pose: 'fleau', echelle: K, angles: BRAS, objetP: manche });
          out.push(String(pers));
          // la tête du battoir descend autour de l'attache et tombe à plat
          const Rr = LB * K * 0.93, a0 = -58 * Math.PI / 180, a1 = -10 * Math.PI / 180;
          const p0 = [B0[0] + Rr * Math.cos(a0), B0[1] + Rr * Math.sin(a0)], p1 = [B0[0] + Rr * Math.cos(a1), B0[1] + Rr * Math.sin(a1)];
          out.push(h.geste(`M${f1(p0[0])} ${f1(p0[1])} A${f1(Rr)} ${f1(Rr)} 0 0 1 ${f1(p1[0])} ${f1(p1[1])}`));
          // le point à contrôler : le battoir couché à plat sur les épis, pas du bout
          out.push(h.controle(B0[0] + LB * K * 0.72, B0[1], 12));
          return out.join('\n');
        },
        renvois: z => {
          const { yS, b, V } = vueCoup(z);
          const mi = V(b.bout[0] + b.u[0] * LM * 0.62, b.bout[1] + b.u[1] * LM * 0.62);
          const B0 = V(b.B0, b.yB);
          return [
            { n: 1, rond: [mi[0] + 34, mi[1] - 34], cible: [mi[0] + 2, mi[1] - RM * K + 0.5], texte: 'le manche, à deux mains' },
            { n: 2, rond: [B0[0] + LB * K * 0.45, B0[1] - 42], cible: [B0[0] + LB * K * 0.4, B0[1] - RB * K], texte: 'le battoir tombe à plat sur les épis' },
            { n: 3, rond: [X(TOILE[0]) - 22, yS - 26], cible: [X(TOILE[0]) + 6, yS - 1.5], texte: 'la toile, qui garde le grain' },
          ];
        },
      },
      plan: {
        titre: 'De dessus',
        dessin: z => {
          const y0 = (z.h - (PY[1] - PY[0]) * K) / 2, Yp = y => y0 + y * K, out = [];
          // la toile
          out.push(h.rect(X(TOILE[0]), Yp(PY[0]) - 6, X(TOILE[1]) - X(TOILE[0]), (PY[1] - PY[0]) * K + 12, A.loin),
            h.rect(X(TOILE[0]), Yp(PY[0]) - 6, X(TOILE[1]) - X(TOILE[0]), (PY[1] - PY[0]) * K + 12, A.detail));
          // les deux rangées : celle du fond (épis vers la gauche) d'abord
          GYA.forEach((gy, i) => out.push(gerbeDessus(geo.rangA[0], geo.rangA[1], Yp(gy), 21 + i * 7)));
          GYB.forEach((gy, i) => out.push(gerbeDessus(geo.rangB[0], geo.rangB[1], Yp(gy), 3 + i * 5)));
          // le fléau couché : le battoir sur les épis, le manche vu d'en haut
          const b = batteur(0), ym = Yp(YM);
          out.push(baton([X(b.B0), ym], [1, 0], LB * K, RB * K));
          out.push(h.ligne(X(b.J[0]), ym, X(b.B0), ym, A.arete));
          out.push(baton([X(b.bout[0]), ym], [1, 0], (b.J[0] - b.bout[0]) * K, RM * K));
          // les pieds du batteur, en empreintes
          out.push(empreinte(-50, Yp(YM) + 115 * K, true), empreinte(-84, Yp(YM) - 115 * K, false));
          return out.join('\n');
        },
        renvois: z => {
          const y0 = (z.h - (PY[1] - PY[0]) * K) / 2, Yp = y => y0 + y * K;
          const xB = X(geo.rangB[0] + LG * 0.55), xA = X(geo.rangA[0] - LG * 0.3);
          return [
            { n: 4, rond: [X(TOILE[0]) - 24, Yp(GYB[3])], cible: [X(geo.rangB[0] + 50), Yp(GYB[3])], texte: 'gerbes couchées en deux rangées' },
            { n: 5, rond: [X(TOILE[1]) + 20, Yp(GYB[3])], cible: [X(geo.Xm + 50), Yp(GYB[3]) - 1], texte: 'épis au milieu : frapper, retourner, refrapper' },
            { n: 6, rond: [X(TOILE[1]) + 20, Yp(GYA[0])], cible: [xA, Yp(GYA[0])], texte: 'puis secouer la paille et la retirer' },
          ];
        },
      },
    },
    danger: 'Le battoir libre est aussi ce qui blesse : un coup mal pris le ramène sur la tête ou sur les mains de celui qui bat. Le geste s’apprend lentement, à petits coups.',
  };
};
