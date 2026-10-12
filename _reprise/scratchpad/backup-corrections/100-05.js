// Planche 100-05 — vanner d'un chaudron à l'autre, dans le courant d'une porte ou d'une couverture.
// Chapitre 75, étape 21 et « Battre et vanner sans matériel ». Aucune cote : le chapitre ne
// donne ni hauteur ni distance ; l'échelle vient de la porte, des chaudrons et des mains.
module.exports = (h) => {
  const f = (n) => Math.round(n * 10) / 10;
  const P = (arr) => arr.map(([x, y]) => [f(x), f(y)]);
  const alea = (graine) => { let s = graine; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };

  // Géométrie commune aux deux vues.
  const geo = (z, xLevre) => {
    const G = z.h - 16;                       // sol
    const u = Math.min((G - 50) / 2.0, 118);  // un mètre, à l'œil ; laisse du mur au-dessus de la porte
    const W = 0.3 * u, H = 0.24 * u;          // chaudron
    const xL = xLevre(u), yL = G - 1.25 * u;  // lèvre du chaudron qu'on verse
    const yR = G - H;                          // bord du chaudron qui reçoit
    return { G, u, W, H, xL, yL, yR };
  };

  // Chaudron vu de côté : oreilles devant et derrière, l'anse se voit de chant.
  // Repère local : oreille à l'origine, bord à y = -5, fond à y = H - 5. ang en degrés, sens horaire.
  const chaudron = (ox, oy, W, H, ang, anse) => {
    const a = ang * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    const T = ([x, y]) => [ox + x * c - y * s, oy + x * s + y * c];
    const haut = -5, bas = H - 5;
    const corps = [
      [-W / 2, haut], [-W / 2 + W * 0.05, bas - H * 0.3], [-W / 2 + W * 0.09, bas - H * 0.09],
      [-W / 2 + W * 0.18, bas], [W / 2 - W * 0.18, bas], [W / 2 - W * 0.09, bas - H * 0.09],
      [W / 2 - W * 0.05, bas - H * 0.3], [W / 2, haut],
    ];
    const o = [];
    o.push(h.chemin(P(corps.map(T)), h.a.blanc, true));
    o.push(h.chemin(P(corps.map(T)), h.a.contour));
    o.push(h.chemin(P([[-W / 2 - 2.5, haut], [W / 2 + 2.5, haut]].map(T)), h.a.contour));
    o.push(h.chemin(P([[-W / 2 + 1, haut + 3.5], [W / 2 - 1, haut + 3.5]].map(T)), h.a.detail));
    const [ex, ey] = T([0, 0]);
    if (anse === 'debout') {
      o.push(h.ligne(f(ex), f(ey), f(ex), f(ey - W / 2 - 8), h.a.arete));
    } else if (anse === 'couchee') {
      const [ax, ay] = T([-W / 2 - 7, 3]);
      o.push(h.ligne(f(ex), f(ey), f(ax), f(ay), h.a.arete));
    }
    o.push(h.cercle(f(ex), f(ey), 2.4, h.a.blanc));
    o.push(h.cercle(f(ex), f(ey), 2.4, h.a.arete));
    return o;
  };

  // Le point de l'oreille qui met la lèvre (bord droit) en (xL, yL), pour un angle donné.
  const pivot = (xL, yL, W, ang) => {
    const a = ang * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    const lx = W / 2 + 2.5, ly = -5;
    return [xL - (lx * c - ly * s), yL - (lx * s + ly * c)];
  };

  // Poing fermé sur un point (x, y) et avant-bras qui monte jusqu'au bord de la vue.
  const poing = (x, y, pente) => {
    const o = [];
    const l = 13, ht = 15, x0 = x - l / 2, y0 = y - ht + 3;
    const r = 4;
    const d = `M ${f(x0 + r)} ${f(y0)} H ${f(x0 + l - r)} Q ${f(x0 + l)} ${f(y0)} ${f(x0 + l)} ${f(y0 + r)} ` +
      `V ${f(y0 + ht - r)} Q ${f(x0 + l)} ${f(y0 + ht)} ${f(x0 + l - r)} ${f(y0 + ht)} H ${f(x0 + r)} ` +
      `Q ${f(x0)} ${f(y0 + ht)} ${f(x0)} ${f(y0 + ht - r)} V ${f(y0 + r)} Q ${f(x0)} ${f(y0)} ${f(x0 + r)} ${f(y0)} Z`;
    // avant-bras : deux traits du haut du poing jusqu'à y = 0
    const dx = pente * y0;
    o.push(h.chemin(P([[x0 + 1.5, y0 + 2], [x0 + 1.5 + dx, 0], [x0 + l - 1.5 + dx, 0], [x0 + l - 1.5, y0 + 2]]), h.a.blanc, true));
    o.push(h.ligne(f(x0 + 1.5), f(y0 + 2), f(x0 + 1.5 + dx), 0, h.a.arete));
    o.push(h.ligne(f(x0 + l - 1.5), f(y0 + 2), f(x0 + l - 1.5 + dx), 0, h.a.arete));
    o.push(h.path(d, h.a.blanc));
    o.push(h.path(d, h.a.arete));
    for (let i = 1; i <= 3; i++) o.push(h.ligne(f(x0 + l - 5), f(y0 + i * ht / 4), f(x0 + l), f(y0 + i * ht / 4), h.a.detail));
    o.push(h.path(`M ${f(x0 + 2)} ${f(y0 + 5)} Q ${f(x0 + 6)} ${f(y0 + 3)} ${f(x0 + 8)} ${f(y0 + 7)}`, h.a.detail));
    return o;
  };

  // Le versement : chaudron incliné tenu par l'anse, filet de graine, chaudron qui reçoit,
  // trajectoires des débris. Retourne les traits et les points utiles aux renvois.
  const verse = (g, xMax, portees, graine) => {
    const { G, u, W, H, xL, yL, yR } = g;
    const r = alea(graine);
    const o = [];
    const ang = 105;
    const [px, py] = pivot(xL, yL, W, ang);
    // chaudron qui reçoit, posé au sol, un peu sous le vent
    const xC = xL + 3;
    o.push(...chaudron(xC, G - (H - 5), W, H, 0, 'couchee'));
    // débris : partent du filet à différentes hauteurs, portés sous le vent
    const traj = [];
    const departs = [0.06, 0.3, 0.55];
    portees.forEach((d, i) => {
      const ys = yL + 4 + departs[i] * (yR - yL - 6), xs = xL + 2;
      const xe = Math.min(xL + d * u, xMax), ye = G - 1;
      const cx = xs + 0.15 * (xe - xs), cy = ys + 0.5 * (ye - ys);
      o.push(h.path(`M ${f(xs)} ${f(ys)} Q ${f(cx)} ${f(cy)} ${f(xe)} ${f(ye)}`, h.a.cache));
      const pt = (t) => [(1 - t) * (1 - t) * xs + 2 * t * (1 - t) * cx + t * t * xe, (1 - t) * (1 - t) * ys + 2 * t * (1 - t) * cy + t * t * ye];
      traj.push(pt);
      // brins de balle : petits copeaux courbes, le long de la trajectoire puis au sol
      const brin = (x, y) => {
        const a = r() * Math.PI, l = 2.2 + r() * 1.5, ca = Math.cos(a) * l, sa = Math.sin(a) * l;
        return h.path(`M ${f(x - ca)} ${f(y - sa)} Q ${f(x + sa * 0.6)} ${f(y - ca * 0.6)} ${f(x + ca)} ${f(y + sa)}`, h.a.detail);
      };
      [0.3, 0.55, 0.8].forEach((t) => { const [x, y] = pt(t); o.push(brin(x, y - 5)); });
      for (let k = 0; k < 3; k++) o.push(brin(xe - 6 + k * 5 + r() * 3, G - 2));
    });
    // filet de graine, presque droit
    const N = 34;
    for (let i = 0; i < N; i++) {
      const t = i / (N - 1);
      const y = yL + 4 + t * (yR - yL - 7);
      const x = xL + 1 + 4 * t * t + (r() - 0.5) * (2 + 3 * t);
      o.push(h.cercle(f(x), f(y), 1.3, h.a.plein));
    }
    // chaudron qu'on verse, tenu au rebord : tenu par l'anse seule, il pivoterait sur ses
    // oreilles et reviendrait d'aplomb
    o.push(...chaudron(px, py, W, H, ang, 'aucune'));
    const a = ang * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
    const xr = -W / 2 - 2.5, yr = -5;                                // coin du rebord, le plus haut
    const rx = px + xr * ca - yr * sa, ry = py + xr * sa + yr * ca;
    o.push(...poing(rx - 2, ry + 3, -0.35));
    return { o, traj, px, py, xC };
  };

  return {
    ref: '100-05',
    titre: 'Vanner d’un chaudron à l’autre',
    desc: 'Deux vues de côté. À gauche, dans une porte ouverte : le courant d’air traverse la porte, '
      + 'un chaudron tenu au rebord est versé de haut dans un second chaudron posé au sol ; la graine '
      + 'tombe presque droit dedans, les débris légers partent sous le vent et retombent plus loin. '
      + 'À droite, sans vent : deux personnes agitent une couverture qui pousse l’air sur le filet, '
      + 'et tout le poste est sur une toile.',
    format: 'demi',
    disposition: [['porte', 'couverture']],
    largeurs: [[3, 2]],
    vues: {
      porte: {
        titre: 'Dans la porte ouverte',
        dessin: (z) => {
          const wx = 64, ep = 16;
          const g = geo(z, (u) => wx + ep + 0.72 * u);
          const { G, u, H, xL, yL, yR } = g;
          const yD = G - 2.0 * u;
          const o = [];
          // sol dehors, plancher dedans
          o.push(h.rect(wx + ep, G, z.l - wx - ep, z.h - G, h.a.hachure('terre', 'detail')));
          o.push(h.ligne(wx + ep, G, z.l, G, h.a.arete));
          o.push(h.rect(0, G - 6, wx + ep + 4, 6 + (z.h - G), h.a.hachure('bois', 'detail')));
          o.push(h.chemin(P([[0, G - 6], [wx + ep + 4, G - 6], [wx + ep + 4, G]]), h.a.arete));
          // battant ouvert vers l'intérieur, vu de face, gonds au montant
          const bx = wx - 0.72 * u, by = yD + 2, bh = G - 8 - by;
          o.push(h.rect(f(bx), f(by), f(wx - bx), f(bh), h.a.arete));
          o.push(h.rect(f(bx + 7), f(by + 8), f(wx - bx - 14), f(bh * 0.4), h.a.detail));
          o.push(h.rect(f(bx + 7), f(by + bh * 0.4 + 16), f(wx - bx - 14), f(bh * 0.6 - 24), h.a.detail));
          o.push(h.cercle(f(bx + 5), f(G - 1.0 * u), 2.5, h.a.arete));
          [by + 10, by + bh - 12].forEach((y) => o.push(h.rect(wx - 2, f(y), 3, 8, h.a.plein)));
          // mur coupé au-dessus de la porte, montant vu au fond de l'ouverture
          o.push(h.rect(wx, 0, ep, f(yD), h.a.hachure('bois')));
          o.push(h.chemin(P([[wx, 0], [wx, yD], [wx + ep, yD], [wx + ep, 0]]), h.a.contour));
          o.push(h.ligne(wx + ep, f(yD), wx + ep, G - 6, h.a.arete));
          // courant d'air
          const yA = [yL + 12, yL + 0.4 * (yR - yL), yL + 0.75 * (yR - yL)];
          yA.forEach((y) => o.push(h.fleche(`M ${wx + 4} ${f(y)} L ${f(xL - 12)} ${f(y)}`, h.a.detail)));
          const v = verse(g, z.l - 6, [1.6, 1.22, 0.85], 11);
          o.push(...v.o);
          return o.join('\n');
        },
        renvois: (z) => {
          const wx = 64, ep = 16;
          const g = geo(z, (u) => wx + ep + 0.72 * u);
          const { G, u, W, H, xL, yL, yR } = g;
          const yA = [yL + 12, yL + 0.4 * (yR - yL), yL + 0.75 * (yR - yL)];
          const [px, py] = pivot(xL, yL, W, 105);
          // point de la trajectoire la plus longue, à mi-course (même calcul que verse)
          const xs = xL + 2, ys = yL + 4 + 0.06 * (yR - yL - 6), xe = Math.min(xL + 1.6 * u, z.l - 6), ye = G - 1;
          const cx = xs + 0.15 * (xe - xs), cy = ys + 0.5 * (ye - ys), t = 0.45;
          const T3 = [(1 - t) ** 2 * xs + 2 * t * (1 - t) * cx + t * t * xe, (1 - t) ** 2 * ys + 2 * t * (1 - t) * cy + t * t * ye];
          return [
            { n: 1, rond: [f(wx + ep + 26), f(yL - 60)], cible: [f(px - 12), f(py - 14)], texte: 'chaudron qu’on verse, tenu haut' },
            { n: 2, rond: [f(wx + ep + 22), f(yL - 16)], cible: [f(wx + ep + 22), f(yA[0] - 1.5)], texte: 'courant d’air par la porte' },
            { n: 3, rond: [f(z.l - 26), f(yL - 10)], cible: [f(T3[0]), f(T3[1])], texte: 'débris légers, emportés plus loin' },
            { n: 4, rond: [f(xL - 42), f((yA[1] + yA[2]) / 2)], cible: [f(xL - 3), f((yA[1] + yA[2]) / 2)], texte: 'graine, plus dense, tombe court' },
            { n: 5, rond: [f(xL - 42), f(G - 16)], cible: [f(xL + 3 - W / 2 - 1), f(G - 12)], texte: 'chaudron qui reçoit la graine' },
          ];
        },
      },
      couverture: {
        titre: 'Sans vent : une couverture',
        dessin: (z) => {
          const xh = 16;
          const g = geo(z, (u) => xh + 1.35 * u);
          const { G, u, xL, yL, yR } = g;
          const o = [];
          // sol et toile
          o.push(h.rect(0, G, z.l, z.h - G, h.a.hachure('terre', 'detail')));
          o.push(h.chemin(P([[4, G], [4, G - 2.5], [z.l - 3, G - 2.5]]), h.a.arete));
          o.push(h.ligne(0, G, z.l, G, h.a.arete));
          // couverture tenue par ses deux coins du haut, balancée vers le filet
          const yh = G - 1.7 * u;
          const A = [xh, yh + 10], B = [xh + 0.45 * u, yh];
          const dv = [0.28 * u, 1.2 * u];
          const D = [A[0] + dv[0], A[1] + dv[1]], C = [B[0] + dv[0], B[1] + dv[1]];
          const kA = [A[0] - 0.05 * u, A[1] + 0.72 * u], kB = [B[0] - 0.05 * u, B[1] + 0.72 * u];
          const mh = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 + 9];
          // ourlet ondulé : l'étoffe qui fouette, pas une planche courbe
          const w1 = [C[0] + (D[0] - C[0]) / 3, C[1] + (D[1] - C[1]) / 3 + 10], w2 = [C[0] + 2 * (D[0] - C[0]) / 3, C[1] + 2 * (D[1] - C[1]) / 3 - 7];
          const face = `M ${f(A[0])} ${f(A[1])} Q ${f(mh[0])} ${f(mh[1])} ${f(B[0])} ${f(B[1])} Q ${f(kB[0])} ${f(kB[1])} ${f(C[0])} ${f(C[1])} ` +
            `C ${f(w1[0])} ${f(w1[1])} ${f(w2[0])} ${f(w2[1])} ${f(D[0])} ${f(D[1])} Q ${f(kA[0])} ${f(kA[1])} ${f(A[0])} ${f(A[1])} Z`;
          o.push(h.path(face, h.a.blanc));
          // plis de l'étoffe, qui partent des mains et s'ouvrent vers l'ourlet
          [[0.12, 0.3], [0.5, 0.52], [0.88, 0.74]].forEach(([k, k2]) => {
            const x0 = A[0] + k * (B[0] - A[0]), y0 = A[1] + k * (B[1] - A[1]) + 7;
            const x1 = D[0] + k2 * (C[0] - D[0]), y1 = D[1] + k2 * (C[1] - D[1]) - 2;
            o.push(h.path(`M ${f(x0)} ${f(y0)} Q ${f(x0 - 0.05 * u)} ${f(y0 + 0.7 * u)} ${f(x1)} ${f(y1)}`, h.a.detail));
          });
          o.push(h.path(face, h.a.contour));
          // ourlet
          o.push(h.path(`M ${f(C[0] - 1)} ${f(C[1] - 4)} C ${f(w1[0])} ${f(w1[1] - 4)} ${f(w2[0])} ${f(w2[1] - 4)} ${f(D[0] + 1)} ${f(D[1] - 4)}`, h.a.fin));
          // le balancement : l'ourlet part en arrière, revient vers le filet
          o.push(h.fleche(`M ${f(D[0] - 0.22 * u)} ${f(D[1] + 4)} Q ${f(D[0] - 0.02 * u)} ${f(D[1] + 16)} ${f(D[0] + 0.2 * u)} ${f(D[1] + 8)}`, h.a.detail));
          // les deux mains, deux personnes
          o.push(...poing(A[0], A[1], -0.1));
          o.push(...poing(B[0], B[1], -0.1));
          // le courant
          [yL + 0.35 * (yR - yL), yL + 0.72 * (yR - yL)].forEach((y) => o.push(h.fleche(`M ${f(C[0] + 10)} ${f(y)} L ${f(xL - 12)} ${f(y)}`, h.a.detail)));
          const v = verse(g, z.l - 8, [0.85, 0.62, 0.42], 23);
          o.push(...v.o);
          return o.join('\n');
        },
        renvois: (z) => {
          const xh = 16;
          const g = geo(z, (u) => xh + 1.35 * u);
          const { G, u, xL } = g;
          const yh = G - 1.7 * u;
          const A = [xh, yh + 10];
          return [
            { n: 6, rond: [f(xh + 0.82 * u), f(yh - 40)], cible: [f(A[0] + 0.3 * u), f(A[1] + 0.45 * u)], texte: 'couverture tenue à deux, agitée' },
            { n: 7, rond: [f(z.l - 22), f(G - 30)], cible: [f(z.l - 22), f(G - 3.5)], texte: 'toile sous tout le poste' },
          ];
        },
      },
    },
  };
};
