// Planche 14-01. Le poste à galène (chapitre 14, section 7, « Écouter sans pile : le poste à galène »).
// Trois vues : le poste monté sur sa planche (le circuit), la branche détecteur-écouteur de près,
// l'antenne et le contrepoids dehors. Aucune cote sur la planche : les chiffres du chapitre (80 spires
// sur un support de 10 cm, une prise toutes les 10 spires, l'antenne) sont sourcés depuis le 24 septembre
// 2026 (sources/19-nbs-circulaire-120-poste-recepteur.md ; suivi/14-redaction.md, levée du 24 septembre).
// Le 19 octobre 2026 : recomposée sans la ligne « Planche 14-01. … » dans le dessin (le moteur de pages
// pose le numéro et le titre).
//
// La charte : les deux épinettes, qui portent l'antenne sans être le sujet, en gris loin ; pas
// de gris sur le poste ni sur le détecteur, vus à plat. Le rouge : la pointe qu'on promène sur
// la lame (le geste) ; la résistance en travers des fils du piézo (sans elle, rien) et l'entrée
// de la descente, qui ne doit frotter ni le mur ni un clou, cerclées.
module.exports = (h) => {
  const blanc = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');
  const noir = (a) => a.replace('fill="none"', 'fill="#1A1A1A"');

  // Borne à vis : tête fendue, fil enroulé dessous.
  const vis = (x, y, r = 7) => [
    h.cercle(x, y, r + 3, h.a.detail),
    h.cercle(x, y, r, blanc(h.a.arete)),
    h.path(`M ${x - r * 0.6} ${y - r * 0.6} L ${x + r * 0.6} ${y + r * 0.6}`, h.a.detail),   // fente de la tête
  ].join('\n');

  // Lame de rasoir à double tranchant, centrée en (cx, cy), grand axe horizontal ou vertical.
  const lame = (cx, cy, L, W, vertical) => {
    const P = (u, v) => (vertical ? [cx + v, cy + u] : [cx + u, cy + v]);
    const o = [];
    const [x0, y0] = P(-L / 2, -W / 2);
    const [x1, y1] = P(L / 2, W / 2);
    o.push(h.rect(Math.min(x0, x1), Math.min(y0, y1), Math.abs(x1 - x0), Math.abs(y1 - y0),
      blanc(h.a.arete) + ' rx="3"'));
    // biseau des deux tranchants
    const b = W * 0.22;
    let [a1, a2] = [P(-L / 2 + 3, -W / 2 + b), P(L / 2 - 3, -W / 2 + b)];
    o.push(h.ligne(a1[0], a1[1], a2[0], a2[1], h.a.detail));
    [a1, a2] = [P(-L / 2 + 3, W / 2 - b), P(L / 2 - 3, W / 2 - b)];
    o.push(h.ligne(a1[0], a1[1], a2[0], a2[1], h.a.detail));
    // fente centrale à trois trous
    const f = L * 0.34;
    const e = W * 0.07;
    const s0 = P(-f, -e), s1 = P(f, e);
    o.push(h.rect(Math.min(s0[0], s1[0]), Math.min(s0[1], s1[1]), Math.abs(s1[0] - s0[0]),
      Math.abs(s1[1] - s0[1]), h.a.detail));
    for (const u of [-f, 0, f]) {
      const [px, py] = P(u, 0);
      o.push(h.cercle(px, py, W * 0.12, blanc(h.a.detail)));
    }
    return o.join('\n');
  };

  // Mine de crayon : bâton noir effilé, de la queue (qx, qy) à la pointe (px, py).
  const mine = (qx, qy, px, py, ep) => {
    const dx = px - qx, dy = py - qy, n = Math.hypot(dx, dy);
    const ux = dx / n, uy = dy / n, vx = -uy * ep / 2, vy = ux * ep / 2;
    const cone = n - ep * 2.2;
    const pts = [
      [qx + vx, qy + vy], [qx + ux * cone + vx, qy + uy * cone + vy], [px, py],
      [qx + ux * cone - vx, qy + uy * cone - vy], [qx - vx, qy - vy],
    ];
    return h.chemin(pts, noir(h.a.detail), true);
  };

  // Épinette : silhouette étroite en dents de scie, tronc au pied.
  const epinette = (x, sommet, pied, demi) => {
    const pts = [[x, sommet]];
    const niv = 9;
    const haut = pied - 16 - sommet;
    const gauche = [];
    for (let i = 1; i <= niv; i++) {
      const y = sommet + (haut * i) / niv;
      const w = demi * (0.25 + 0.75 * i / niv);
      pts.push([x + w, y]);
      if (i < niv) pts.push([x + w * 0.4, y - 2]);
      gauche.unshift([x - w, y]);
      if (i < niv) gauche.unshift([x - w * 0.4, y - 2]);
    }
    pts.push([x + 4, pied - 16], [x + 4, pied], [x - 4, pied], [x - 4, pied - 16]);
    return h.chemin(pts.concat(gauche), h.a.arete.replace('fill="none"', h.a.loin.split(' ')[0]), true);
  };

  // Résistance récupérée, couchée en travers de deux fils verticaux (x1 à gauche, x2 à droite),
  // corps à la hauteur y : cylindre court à bouts renflés, quatre bandes au trait, et chaque
  // patte enroulée de trois spires sur son fil. helice = true : la spire dessinée en boucles
  // (gros plan) ; sinon, trois traits obliques en travers du fil (petite échelle).
  const resistance = (x1, x2, y, L, D, w, pas, trait, helice) => {
    const o = [];
    const xc = (x1 + x2) / 2, xl = xc - L / 2, xr = xc + L / 2;
    const r = D / 2, d = D * 0.4, c = L * 0.24, k = L * 0.04;
    o.push(h.path(`M ${xl + r} ${y - r} L ${xl + c} ${y - r} C ${xl + c + k} ${y - r}, ${xl + c + k} ${y - d}, ${xl + c + 2 * k} ${y - d} `
      + `L ${xr - c - 2 * k} ${y - d} C ${xr - c - k} ${y - d}, ${xr - c - k} ${y - r}, ${xr - c} ${y - r} L ${xr - r} ${y - r} `
      + `A ${r} ${r} 0 0 1 ${xr - r} ${y + r} L ${xr - c} ${y + r} C ${xr - c - k} ${y + r}, ${xr - c - k} ${y + d}, ${xr - c - 2 * k} ${y + d} `
      + `L ${xl + c + 2 * k} ${y + d} C ${xl + c + k} ${y + d}, ${xl + c + k} ${y + r}, ${xl + c} ${y + r} L ${xl + r} ${y + r} `
      + `A ${r} ${r} 0 0 1 ${xl + r} ${y - r} Z`, blanc(trait)));
    // quatre bandes : trois groupées à gauche, la dernière seule à droite
    const bl = L * 0.065;
    for (const u of [0.17, 0.36, 0.5, 0.8]) {
      const bx = xl + u * L;
      const hh = (u < 0.24 || u > 0.76) ? r * 0.92 : d * 0.92;
      o.push(bl >= 1.4 ? h.rect(bx - bl / 2, y - hh, bl, 2 * hh, h.a.fin) : h.ligne(bx, y - hh, bx, y + hh, h.a.fin));
    }
    // les pattes, puis les spires sur chaque fil
    o.push(h.ligne(xl, y, x1 + w, y, h.a.detail));
    o.push(h.ligne(xr, y, x2 - w, y, h.a.detail));
    for (const [x, s] of [[x1, 1], [x2, -1]]) {
      if (helice) {
        const pts = [];
        for (let i = 0; i <= 3 * 24; i++) {
          const t = (i / 24) * 2 * Math.PI;
          pts.push([x + s * w * Math.cos(t), y + (pas * t) / (2 * Math.PI) + pas * 0.53 * Math.sin(t)]);
        }
        o.push(h.chemin(pts, h.a.detail));
      } else {
        for (let i = 0; i < 3; i++) o.push(h.ligne(x + s * w, y + i * pas, x - s * w, y + i * pas + pas / 2, h.a.detail));
      }
    }
    return o.join('\n');
  };

  // Géométrie partagée de la vue du poste.
  const poste = (z) => {
    const g = {};
    g.bx0 = 58; g.by0 = 10; g.bx1 = z.l - 12; g.by1 = z.h - 8;
    g.A = [g.bx0 + 24, g.by0 + 28];
    g.T = [g.bx0 + 24, g.by1 - 26];
    g.cx = 172; g.r = 32;
    g.yT = g.by0 + 46; g.yB = g.by1 - 104;
    g.yW0 = g.yT + 12; g.yW1 = g.yB - 8;
    g.pas = 3.2;
    g.xPrise = g.cx - 14;
    g.prises = [];
    for (let y = g.yW0 + 14; y < g.yW1 - 6; y += 26) g.prises.push(y);
    g.yPince = g.prises[3];
    g.lame = [z.l - 88, g.by0 + 92];
    g.visMine = [z.l - 44, g.by0 + 170];
    g.piezo = [z.l - 70, g.by1 - 62];
    return g;
  };

  return {
    ref: '14-01',
    titre: 'Le poste à galène',
    desc: 'Un récepteur AM sans pile monté sur une planche : bobine de fil de cuivre sur une bouteille, pince promenée sur les prises grattées, détecteur fait d’une lame de rasoir et d’une mine de crayon, pastille piézo en écouteur, une résistance de carte morte tordue en travers de ses deux fils ; dehors, un fil tendu haut entre deux épinettes et un contrepoids déroulé sur la neige sous lui.',
    format: 'pleine',
    disposition: [['poste', 'detecteur'], ['antenne']],
    hauteurs: [3, 2],
    largeurs: [[2, 1], [1]],
    vues: {
      poste: {
        titre: 'Le poste, vu de dessus',
        dessin: (z) => {
          const g = poste(z);
          const o = [];
          // la planche et son fil de bois
          o.push(h.rect(g.bx0, g.by0, g.bx1 - g.bx0, g.by1 - g.by0, h.a.arete));
          // fils du circuit (sous les pièces)
          const fil = h.a.arete;
          // antenne qui entre, terre qui sort
          o.push(h.chemin([[0, g.A[1] - 18], [g.A[0] - 30, g.A[1] - 18], [g.A[0] - 10, g.A[1]]], fil));
          o.push(h.chemin([[g.T[0] - 10, g.T[1]], [g.T[0] - 30, g.T[1] + 14], [0, g.T[1] + 14]], fil));
          // borne A -> début de la bobine
          o.push(h.chemin([[g.A[0] + 8, g.A[1] + 4], [g.cx - g.r - 6, g.yW0 - 4], [g.cx - g.r + 2, g.yW0]], fil));
          // borne A -> lame (branche du détecteur)
          o.push(h.chemin([[g.A[0] + 8, g.A[1] - 4], [g.A[0] + 30, g.by0 + 20], [g.lame[0] - 32, g.by0 + 20], [g.lame[0] - 18, g.lame[1]]], fil));
          // pince -> borne T
          const xq = g.xPrise - 46;
          o.push(h.chemin([[xq, g.yPince], [xq - 14, g.yPince + 10], [g.T[0] + 10, g.T[1] - 40], [g.T[0] + 2, g.T[1] - 8]], fil));
          // les deux fils de la pastille : tracés après elle, plus bas

          // la bouteille couchée : fond en haut, goulot en bas
          const { cx, r } = g;
          const col = 11;
          o.push(h.chemin([
            [cx - r, g.yT + 4], [cx - r + 4, g.yT], [cx + r - 4, g.yT], [cx + r, g.yT + 4],
            [cx + r, g.yB], [cx + col, g.yB + 24], [cx + col, g.yB + 40], [cx - col, g.yB + 40],
            [cx - col, g.yB + 24], [cx - r, g.yB],
          ], blanc(h.a.contour), true));
          o.push(h.rect(cx - col - 3, g.yB + 40, 2 * col + 6, 9, blanc(h.a.arete)));
          // les spires, serrées
          for (let y = g.yW0; y <= g.yW1; y += g.pas) o.push(h.ligne(cx - r, y, cx + r, y, h.a.detail));
          o.push(h.ligne(cx - r, g.yW0, cx + r, g.yW0, h.a.arete));
          o.push(h.ligne(cx - r, g.yW1, cx + r, g.yW1, h.a.arete));
          // bout de fil de fin de bobine, rentré dans un trou
          o.push(h.chemin([[cx + r, g.yW1], [cx + r + 10, g.yW1 + 6]], h.a.arete));
          // prises grattées dans l'émail
          for (const y of g.prises) o.push(h.rect(g.xPrise - 5, y - 3, 10, 6, blanc(h.a.fin)));
          // la pince crocodile, mâchoire sur une prise
          const y = g.yPince;
          const xp = g.xPrise;
          o.push(h.chemin([[xp + 2, y], [xp - 14, y - 7], [xp - 40, y - 7], [xp - 46, y - 4], [xp - 46, y + 4],
            [xp - 40, y + 7], [xp - 14, y + 7]], blanc(h.a.arete), true));
          o.push(h.ligne(xp - 22, y - 7, xp - 22, y + 7, h.a.detail));
          o.push(h.chemin([[xp - 2, y - 2], [xp - 5, y - 4], [xp - 8, y - 2], [xp - 11, y - 4]], h.a.fin));

          // bornes
          o.push(vis(g.A[0], g.A[1]));
          o.push(vis(g.T[0], g.T[1]));

          // le détecteur, petit : la lame, deux punaises, la mine et sa vis
          o.push(lame(g.lame[0], g.lame[1], 52, 26, false));
          o.push(h.cercle(g.lame[0] - 18, g.lame[1], 4, noir(h.a.detail)));
          o.push(h.cercle(g.lame[0] + 18, g.lame[1], 4, noir(h.a.detail)));
          o.push(h.chemin([[g.visMine[0], g.visMine[1]], [g.visMine[0] + 4, g.visMine[1] - 24], [g.lame[0] + 20, g.lame[1] + 40]], h.a.detail));
          o.push(mine(g.lame[0] + 20, g.lame[1] + 42, g.lame[0] + 6, g.lame[1] + 4, 4));
          o.push(vis(g.visMine[0], g.visMine[1], 5));

          // la pastille piézo
          const [px, py] = g.piezo;
          o.push(h.cercle(px, py, 26, blanc(h.a.arete)));
          o.push(h.cercle(px, py, 18, h.a.detail));
          o.push(h.cercle(px, py, 15, h.a.fin));
          // ses deux fils montent ensemble, la résistance en travers, puis ils s'écartent :
          // celui de la céramique vers la vis de la mine, celui du laiton vers la borne T
          const xF1 = px + 12, xF2 = px - 15, yF = py - 52;
          o.push(h.chemin([[xF1, py - 2], [xF1, yF], [xF1 + 10, yF - 22], [g.visMine[0], g.visMine[1] + 8]], fil));
          o.push(h.chemin([[xF2, py - 16], [xF2, yF - 2], [xF2 - 10, yF - 12], [xF2 - 32, yF - 10], [xF2 - 42, g.by1 - 30],
            [xF2 - 56, g.by1 - 16], [g.T[0] + 30, g.by1 - 16], [g.T[0] + 8, g.T[1] + 4]], fil));
          o.push(h.cercle(xF1, py - 2, 2.5, noir(h.a.fin)));
          o.push(h.cercle(xF2, py - 16, 2.5, noir(h.a.fin)));
          o.push(resistance(xF2, xF1, py - 38, 12, 5, 3, 3, h.a.detail, false));
          return o.join('\n');
        },
        renvois: (z) => {
          const g = poste(z);
          const yb = g.yW0 + (g.yW1 - g.yW0) * 0.25;
          return [
            { n: 1, rond: [g.cx + g.r + 30, yb - 20], cible: [g.cx + g.r + 1, yb] },
            { n: 2, rond: [g.cx + g.r + 30, g.yB + 30], cible: [g.cx + 12, g.yB + 26] },
            { n: 3, rond: [g.cx + g.r + 30, g.prises[5] + 10], cible: [g.xPrise + 6, g.prises[5]] },
            { n: 4, rond: [g.xPrise - 34, g.yPince - 30], cible: [g.xPrise - 30, g.yPince - 8] },
            { n: 5, rond: [22, g.A[1] + 26], cible: [g.A[0] - 11, g.A[1] + 4] },
            { n: 6, rond: [22, g.T[1] - 26], cible: [g.T[0] - 11, g.T[1] - 4] },
          ].map((r, i) => ({ ...r, texte: [
            'une couche, spires serrées',
            'support sans aucun métal',
            'émail gratté : une prise',
            'pince, de prise en prise',
            'l’antenne arrive sur cette vis',
            'la terre part de celle-ci',
          ][i] }));
        },
      },

      detecteur: {
        titre: 'Le détecteur et l’écouteur',
        dessin: (z) => {
          const o = [];
          const cx = z.l / 2 - 6;
          const lt = 24, lb = 164;           // la lame, debout
          const lc = (lt + lb) / 2;
          // fil venu de la borne de l'antenne, sous la punaise du bas
          o.push(lame(cx, lc, lb - lt, 70, true));
          const f = (lb - lt) * 0.34;
          o.push(h.chemin([[0, lb + 22], [cx - 30, lb + 22], [cx - 6, lc + f + 6]], h.a.arete));
          o.push(h.cercle(cx, lc - f, 9, blanc(h.a.arete)));
          o.push(h.cercle(cx, lc - f, 2, noir(h.a.fin)));
          o.push(h.cercle(cx, lc + f, 9, blanc(h.a.arete)));
          o.push(h.cercle(cx, lc + f, 2, noir(h.a.fin)));
          // la vis qui tient le fil plié
          const V = [z.l - 26, lb + 56];
          // le fil plié : de la vis, un ressort, puis enroulé sur la queue de la mine
          const Q = [cx + 58, lc + 46];         // queue de la mine
          const P = [cx + 14, lc - 4];          // pointe sur la lame
          o.push(h.path(`M ${V[0]} ${V[1]} C ${V[0] + 10} ${V[1] - 30}, ${Q[0] + 24} ${Q[1] + 30}, ${Q[0] + 4} ${Q[1] + 6}`, h.a.arete));
          o.push(mine(Q[0] + 6, Q[1] + 6, P[0], P[1], 8));
          // spires du fil sur la mine
          const dx = P[0] - Q[0], dy = P[1] - Q[1], n = Math.hypot(dx, dy);
          const ux = dx / n, uy = dy / n;
          for (const t of [4, 9, 14]) {
            const mx = Q[0] + ux * t, my = Q[1] + uy * t;
            o.push(h.ligne(mx - uy * 7, my + ux * 7, mx + uy * 7, my - ux * 7, h.a.arete));
          }
          o.push(vis(V[0], V[1], 7));
          // on promène la pointe
          o.push(h.geste(`M ${P[0] - 4} ${P[1] - 24} Q ${P[0] + 20} ${P[1] - 28} ${P[0] + 24} ${P[1] - 6}`));

          // la pastille piézo, et ses deux fils
          const pz = [cx, z.h - 56];
          o.push(h.cercle(pz[0], pz[1], 44, blanc(h.a.contour)));
          o.push(h.cercle(pz[0], pz[1], 30, h.a.arete));
          o.push(h.cercle(pz[0], pz[1], 25, h.a.detail));
          // les deux fils montent ensemble, la résistance en travers, puis ils s'écartent :
          // celui de la céramique vers la vis, celui du laiton vers la borne de la terre
          const xF1 = pz[0] + 20, xF2 = pz[0] - 28, yF = pz[1] - 72;
          o.push(h.path(`M ${xF1} ${pz[1] - 2} L ${xF1} ${yF} C ${xF1} ${yF - 8}, ${xF1 + 20} ${yF - 2}, ${V[0] - 7} ${V[1] + 6}`, h.a.arete));
          o.push(h.path(`M ${xF2} ${pz[1] - 26} L ${xF2} ${yF} Q ${xF2} ${yF - 12}, ${xF2 - 12} ${yF - 12} L 0 ${yF - 12}`, h.a.arete));
          o.push(h.cercle(xF1, pz[1] - 2, 4, noir(h.a.fin)));
          o.push(h.cercle(xF2, pz[1] - 26, 4, noir(h.a.fin)));
          o.push(resistance(xF2, xF1, pz[1] - 64, 26, 10, 6, 5.5, h.a.arete, true));
          // la résistance en travers des deux fils : sans elle, le piézo ne rend rien
          o.push(h.controle((xF1 + xF2) / 2, pz[1] - 64, 15));
          return o.join('\n');
        },
        renvois: (z) => {
          const cx = z.l / 2 - 6;
          const lt = 24, lb = 164, lc = (lt + lb) / 2;
          return [
            { n: 7, rond: [z.l - 18, lt + 4], cible: [cx + 36, lt + 16], texte: 'lame bleuie ou rouillée' },
            { n: 8, rond: [z.l - 18, lc + 20], cible: [cx + 40, lc + 26], texte: 'mine de crayon sur la lame' },
            { n: 9, rond: [z.l - 60, lb + 44], cible: [cx + 70, lc + 70], texte: 'fil plié qui cale la mine' },
            { n: 10, rond: [z.l - 18, z.h - 100], cible: [cx + 40, z.h - 76], texte: 'piézo d’avertisseur mort' },
            { n: 11, rond: [cx - 4, z.h - 154], cible: [cx - 4, z.h - 123], texte: 'résistance de carte morte' },
          ];
        },
      },

      antenne: {
        titre: 'L’antenne et la terre, l’hiver',
        dessin: (z) => {
          const o = [];
          const G = z.h - 40;                  // surface de la neige
          const yA = 34;                       // hauteur du fil
          const tA = 44, tB = z.l - 36;       // troncs des deux épinettes
          // neige
          o.push(h.rect(0, G + 3, z.l, z.h - G - 3, h.a.hachure('neige', 'detail').replace(/stroke="[^"]*"/, 'stroke="none"')));
          o.push(h.path(`M 0 ${G + 2} C 120 ${G - 3}, 300 ${G + 4}, 420 ${G} S ${z.l - 60} ${G - 2}, ${z.l} ${G + 1}`, h.a.contour));
          // les épinettes
          o.push(epinette(tA, 6, G + 1, 26));
          o.push(epinette(tB, 4, G + 1, 30));
          // le chalet, pignon en face
          // chalet poussé vers l'épinette de droite : le contrepoids, qui en part vers la gauche,
          // court sous presque toute l'antenne (« à peu près de la même longueur qu'elle »)
          const c0 = 416, c1 = 512, cm = (c0 + c1) / 2, mur = G - 74;
          o.push(h.chemin([[c0, G + 1], [c0, mur], [c0 - 10, mur + 8], [cm, mur - 52], [c1 + 10, mur + 8], [c1, mur], [c1, G + 1]], blanc(h.a.contour)));
          for (let y = mur + 10; y < G; y += 10) o.push(h.ligne(c0, y, c1, y, h.a.fin));
          o.push(h.rect(c1 - 40, G - 54, 26, 55, blanc(h.a.arete)));
          const fen = [c0 + 6, G - 52, 36, 28];
          o.push(h.rect(fen[0], fen[1], fen[2], fen[3], blanc(h.a.arete)));
          o.push(h.ligne(fen[0] + fen[2] / 2, fen[1], fen[0] + fen[2] / 2, fen[1] + fen[3], h.a.detail));

          // cordes, isolateurs, fil d'antenne
          const iA = [tA + 30, yA + 8], iB = [tB - 48, yA + 8];
          o.push(h.ligne(tA + 4, yA + 6, iA[0] - 8, iA[1], h.a.detail));
          o.push(h.ligne(iB[0] + 8, iB[1], tB - 4, yA + 4, h.a.detail));
          for (const [ix, iy] of [iA, iB]) {
            o.push(h.rect(ix - 8, iy - 3, 16, 6, h.a.hachure('bois', 'arete')));
          }
          o.push(h.path(`M ${iA[0] + 8} ${iA[1]} Q ${(iA[0] + iB[0]) / 2} ${yA + 26}, ${iB[0] - 8} ${iB[1]}`, h.a.contour));
          // la descente, qui ne touche ni le mur ni un clou
          const d0 = [iA[0] + 12, iA[1] + 1];
          const fenE = [fen[0] + fen[2] - 4, fen[1] + 4];
          o.push(h.path(`M ${d0[0]} ${d0[1]} Q ${d0[0] + 150} ${G - 40}, ${fen[0] + 2} ${fen[1] + 6}`, h.a.contour));
          // l'entrée de la descente : elle ne frotte ni le mur ni un clou
          o.push(h.controle(fen[0] + 2, fen[1] + 6, 11));
          // le contrepoids : sort par la fenêtre, se couche sur la neige, dans l'axe de l'antenne
          const fenB = [fen[0] + fen[2] - 4, fen[1] + fen[3] - 3];
          o.push(h.path(`M ${fen[0] + 2} ${fen[1] + fen[3] - 4} C ${c0 - 8} ${G - 20}, ${c0 - 14} ${G - 2}, ${c0 - 30} ${G - 2} C ${c0 - 120} ${G - 6}, ${iA[0] + 120} ${G + 1}, ${iA[0] + 6} ${G - 3}`, h.a.contour));
          return o.join('\n');
        },
        renvois: (z) => {
          const G = z.h - 40, yA = 34;
          const tA = 44, tB = z.l - 36;
          const iA = [tA + 30, yA + 8], iB = [tB - 48, yA + 8];
          const xm = (iA[0] + iB[0]) / 2;
          return [
            { n: 12, rond: [xm, yA - 12], cible: [xm, yA + 15], texte: 'fil long et haut, tendu' },
            { n: 13, rond: [iB[0] - 30, yA - 14], cible: [iB[0] - 4, iB[1] - 4], texte: 'isolateur : bout de bois sec' },
            { n: 14, rond: [230, G - 30], cible: [245.5, 0.75 * G - 20.75], texte: 'descente qui ne touche rien' },
            { n: 15, rond: [140, G - 22], cible: [140, G - 3], texte: 'contrepoids sur la neige' },
          ];
        },
      },
    },
  };
};
