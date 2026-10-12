// Planche 72-40 — fondre le gras : couper froid, fondre au bord du poêle, filtrer deux fois,
// couler en deux temps ; en vignettes, les deux ratés (eau au fond, cratère de retrait).
// Convention de la planche : gras liquide = blanc sous un trait de surface ; gras figé =
// pointillé (motif neige) ; eau = tirets (motif eau).
module.exports = (h) => {
  const blanc = t => t.replace('fill="none"', 'fill="#FFFFFF"');

  // points d'une Bézier quadratique
  const quad = (p0, p1, p2, n = 12) => {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, u = 1 - t;
      pts.push([u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0], u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]]);
    }
    return pts;
  };

  // chaudron de fonte en coupe : on dessine le contenu d'abord, les murs ensuite
  const chaudron = (cx, yb, w, ht, { anse = true, trace = h.a.plein } = {}) => {
    const t = 4, r = 10;
    const x0 = cx - w / 2, x1 = cx + w / 2, yt = yb - ht;
    const d = `M ${x0} ${yt} L ${x0} ${yb - r} Q ${x0} ${yb} ${x0 + r} ${yb} L ${x1 - r} ${yb} Q ${x1} ${yb} ${x1} ${yb - r} L ${x1} ${yt}` +
      ` L ${x1 - t} ${yt} L ${x1 - t} ${yb - r} Q ${x1 - t} ${yb - t} ${x1 - r} ${yb - t} L ${x0 + r} ${yb - t} Q ${x0 + t} ${yb - t} ${x0 + t} ${yb - r} L ${x0 + t} ${yt} Z`;
    const murs = [h.path(d, trace)];
    if (trace === h.a.plein) {
      murs.push(h.rect(x0 - 4, yt, 4 + t, 4, h.a.plein), h.rect(x1 - t, yt, 4 + t, 4, h.a.plein));
      if (anse) {
        const ya = yt + 10, yh = yt - ht * 0.75;
        murs.push(h.path(`M ${x0 - 3} ${ya} C ${x0 - 3} ${yh} ${x1 + 3} ${yh} ${x1 + 3} ${ya}`, h.a.arete));
        murs.push(h.cercle(x0 - 3, ya, 2, h.a.plein), h.cercle(x1 + 3, ya, 2, h.a.plein));
      }
    }
    return { murs, xi0: x0 + t, xi1: x1 - t, yf: yb - t, yt, x0, x1 };
  };

  // pot de grès en coupe, murs droits
  const pot = (cx, yb, w, ht) => {
    const t = 5, tb = 6;
    const x0 = cx - w / 2, x1 = cx + w / 2, yt = yb - ht;
    const murs = [h.chemin([[x0, yt], [x0, yb], [x1, yb], [x1, yt], [x1 - t, yt], [x1 - t, yb - tb], [x0 + t, yb - tb], [x0 + t, yt]], h.a.plein, true)];
    return { murs, xi0: x0 + t, xi1: x1 - t, yf: yb - tb, yt, x0, x1, cx, t };
  };

  // remplissage d'un contenant jusqu'à une surface (liste de points de gauche à droite)
  const remplir = (c, surface, at) => h.chemin([[c.xi0, c.yf], ...surface, [c.xi1, c.yf]], at, true);
  const plat = (c, y) => [[c.xi0, y], [c.xi1, y]];

  // louche : bol incliné de theta (radians, sens horaire), manche vers (mx, my)
  const louche = (bx, by, r, theta, mx, my) => {
    const rot = (x, y) => [bx + x * Math.cos(theta) - y * Math.sin(theta), by + x * Math.sin(theta) + y * Math.cos(theta)];
    const bol = [];
    for (let i = 0; i <= 14; i++) { const a = Math.PI * i / 14; bol.push(rot(r * Math.cos(a), r * Math.sin(a))); }
    const bec = bol[0], talon = bol[bol.length - 1];
    return {
      svg: [h.chemin(bol, blanc(h.a.arete), true), h.ligne(talon[0], talon[1], mx, my, h.a.contour)],
      bec,
    };
  };

  // filet de gras qui tombe du bec
  const filet = (bec, x, y) => h.path(`M ${bec[0]} ${bec[1]} C ${bec[0] + 4} ${bec[1] + 3} ${x} ${y - 18} ${x} ${y}`, h.a.arete);

  // goutte qui tombe
  const goutte = (x, y) => h.path(`M ${x} ${y - 3.5} Q ${x + 2.2} ${y + 0.5} ${x} ${y + 2} Q ${x - 2.2} ${y + 0.5} ${x} ${y - 3.5} Z`, h.a.plein);

  // creton : petit morceau irrégulier
  const creton = (x, y, s = 1, k = 0) => {
    const pts = [];
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * 2 * Math.PI + k;
      const r = s * (3.3 + 0.7 * Math.sin(2 * a + k * 2) + 0.4 * Math.cos(5 * a + k));
      pts.push([x + r * Math.cos(a) * 1.25, y + r * Math.sin(a) * 0.8]);
    }
    return h.chemin(pts, blanc(h.a.detail), true);
  };

  // petit cube de gras, vu de face, un peu tourné
  const cube = (x, y, s, a) => {
    const c = Math.cos(a), sn = Math.sin(a);
    const p = (dx, dy) => [x + dx * c - dy * sn, y + dx * sn + dy * c];
    return h.chemin([p(-s / 2, -s / 2), p(s / 2, -s / 2), p(s / 2, s / 2), p(-s / 2, s / 2)], blanc(h.a.arete), true);
  };

  // boîte en perspective cavalière : (x, y) coin avant bas gauche
  const boite = (x, y, lx, hy, dx, dy) => [
    h.rect(x, y - hy, lx, hy, blanc(h.a.arete)),
    h.chemin([[x, y - hy], [x + lx, y - hy], [x + lx + dx, y - hy + dy], [x + dx, y - hy + dy]], blanc(h.a.arete), true),
    h.chemin([[x + lx, y], [x + lx, y - hy], [x + lx + dx, y - hy + dy], [x + lx + dx, y + dy]], blanc(h.a.arete), true),
  ];

  // géométries partagées entre dessin et renvois
  const gCouper = z => {
    const x0 = 56, bw = z.l - 80, yT = z.h - 18, ep = 8, ob = [20, -20];
    const s = 24, dxc = 10, dyc = -4, yc = yT - 3;
    const xc = [70, 70 + s + 8];
    const bande = { x: 64, y: yT - 15, lx: bw - 16, hy: 26, dx: 10, dy: -4 };
    return { x0, bw, yT, ep, ob, s, dxc, dyc, yc, xc, bande };
  };

  const gFondre = z => {
    const xs0 = 6, xs1 = z.l - 6, ytop = z.h * 0.55, ybot = z.h - 12;
    const xc = xs0 + (xs1 - xs0) * 0.44;
    const w = Math.min(70, (xs1 - xs0) * 0.3), ht = Math.min(46, ytop - 18);
    const cxA = xs1 - 4 - w / 2;                    // le chaudron, écarté
    const px0 = xs0 + 12, px1 = px0 + 16;           // le tuyau
    return { xs0, xs1, ytop, ybot, xc, w, ht, cxA, px0, px1, yeau: ytop - 4 - 12 };
  };

  const gFin = z => {
    const cx = z.l / 2, w = Math.min(z.l - 30, 120), ht = Math.min(z.h - 40, 92), yb = z.h - 4;
    return { cx, w, ht, yb, ys: yb - ht * 0.62 };
  };

  const gPassoire = z => {
    const cx = z.l * 0.56, w = Math.min(z.l * 0.56, 128), ht = Math.min(z.h * 0.46, 76), yb = z.h - 4;
    const yR = yb - ht;
    const rp = w * 0.36, dp = ht * 0.42;         // rayon et creux de la passoire
    const ys = yR + ht * 0.62;                   // gras déjà passé
    return { cx, w, ht, yb, yR, rp, dp, ys, bx: cx - rp * 0.9, by: yR - 46 };
  };

  const gCoton = z => {
    const cx = z.l * 0.46, w = Math.min(z.l * 0.36, 116), ht = Math.min(z.h * 0.55, 112), yb = z.h - 4;
    const yt = yb - ht;
    const ys = yt + ht * 0.66;                   // gras filtré dans le pot
    const creux = ht * 0.40;                     // fond du sac de coton sous le bord
    return { cx, w, ht, yb, yt, ys, creux };
  };

  const gCouler = z => {
    const w = Math.min(z.l * 0.30, 84), ht = Math.min(z.h - 56, 90), yb = z.h - 4;
    const cA = z.l * 0.24, cB = z.l * 0.70;
    return { w, ht, yb, cA, cB, yt: yb - ht };
  };

  const gRate = z => {
    const w = Math.min(z.l * 0.56, 84), ht = Math.min(z.h - 18, 96), yb = z.h - 4;
    return { cx: z.l * 0.5, w, ht, yb, yt: yb - ht };
  };

  return {
    ref: '72-40',
    titre: 'Fondre le gras',
    desc: 'Huit vues. Le gras paré à froid, coupé en cubes sur une planche. Le chaudron posé sur le poêle à bois avec un fond d’eau et les cubes, glissé du centre vers le bord dès que ça fume. La fin de la fonte : gras clair, cretons dorés qui descendent. Première passe à la passoire au-dessus d’un chaudron, les cretons restent dedans. Deuxième passe dans un sac de vieux coton, trois épaisseurs, tendu sur un cerceau de broche posé sur le bord d’un pot chaud. Couler en deux temps : aux trois quarts, laisser prendre, puis une dernière louche dans le creux. Les deux ratés : une couche liquide sous un gras marbré au fond du pot, et un cratère au centre d’un pot coulé d’un coup.',
    format: 'pleine',
    disposition: [['couper', 'fondre', 'fin'], ['passoire', 'coton'], ['couler', 'rateEau', 'rateCratere']],
    hauteurs: [4, 4.4, 3.8],
    largeurs: [[2.1, 3, 1.9], [1, 1], [2.1, 1, 1]],
    vues: {
      couper: {
        titre: 'Couper froid',
        dessin: z => {
          const g = gCouper(z);
          const { x0, bw, yT, ep, ob, s, dxc, dyc, yc, xc, bande: b } = g;
          const out = [];
          // la planche à découper
          out.push(h.chemin([[x0, yT], [x0 + bw, yT], [x0 + bw + ob[0], yT + ob[1]], [x0 + ob[0], yT + ob[1]]], blanc(h.a.arete), true));
          out.push(h.rect(x0, yT, bw, ep, blanc(h.a.arete)));
          out.push(h.rect(x0, yT, bw, ep, h.a.hachure('bois')));
          out.push(h.chemin([[x0 + bw, yT], [x0 + bw + ob[0], yT + ob[1]], [x0 + bw + ob[0], yT + ob[1] + ep], [x0 + bw, yT + ep]], blanc(h.a.arete), true));
          // la bande de gras, entamée
          out.push(...boite(b.x, b.y, b.lx, b.hy, b.dx, b.dy));
          for (let k = 1; k * s < b.lx - 4; k++) {
            const x = b.x + k * s;
            out.push(h.ligne(x, b.y, x, b.y - b.hy, h.a.detail));
            out.push(h.ligne(x, b.y - b.hy, x + b.dx, b.y - b.hy + b.dy, h.a.detail));
          }
          // les cubes
          for (const x of xc) out.push(...boite(x, yc, s, s, dxc, dyc));
          // cote de l'épaisseur du cube avant : lignes d'attache aux arêtes haut et bas
          const xk = xc[0] - 12;
          out.push(h.ligne(xc[0] - 2, yc, xk - 4, yc, h.a.fin), h.ligne(xc[0] - 2, yc - s, xk - 4, yc - s, h.a.fin));
          out.push(h.cote(xk, yc, xk, yc - s, '10–20', { cote: 'gauche' }));
          return out.join('\n');
        },
        renvois: z => {
          const { bande: b } = gCouper(z);
          return [
            { n: 1, rond: [z.l - 16, 16], cible: [b.x + b.lx * 0.7, b.y - b.hy + b.dy / 2] },
          ].map(r => ({ ...r, texte: 'gras froid, paré de toute viande' }));
        },
      },

      fondre: {
        titre: 'Au bord du poêle',
        dessin: z => {
          const g = gFondre(z);
          const { xs0, xs1, ytop, ybot, xc, w, ht, cxA, px0, px1 } = g;
          const out = [];
          // le poêle en coupe : caisse, pattes, tuyau à gauche
          out.push(h.rect(xs0, ytop, xs1 - xs0, ybot - ytop, h.a.plein));
          out.push(h.rect(xs0 + 3, ytop + 5, xs1 - xs0 - 6, ybot - ytop - 8, h.a.blanc));
          out.push(h.rect(px0, ytop - 1, px1 - px0, 7, h.a.blanc));
          out.push(h.rect(px0 - 2.5, 0, 2.5, ytop, h.a.plein), h.rect(px1, 0, 2.5, ytop, h.a.plein));
          out.push(h.rect(xs0 + 6, ybot, 6, 12, h.a.plein), h.rect(xs1 - 12, ybot, 6, 12, h.a.plein));
          // le feu, sous le centre
          const yfl = ybot - 3;
          for (const [dx, r] of [[-11, 6.5], [2, 7], [14, 6]]) {
            out.push(h.cercle(xc + dx, yfl - r, r, blanc(h.a.arete)));
            out.push(h.cercle(xc + dx, yfl - r, r, h.a.hachure('bois', 'aucun')));
          }
          const flamme = (x, y, hf, lf) => h.path(`M ${x} ${y - hf} C ${x + lf * 0.2} ${y - hf * 0.6} ${x + lf} ${y - hf * 0.4} ${x + lf * 0.5} ${y} L ${x - lf * 0.5} ${y} C ${x - lf} ${y - hf * 0.4} ${x - lf * 0.2} ${y - hf * 0.6} ${x} ${y - hf} Z`, blanc(h.a.arete));
          const yflB = yfl - 10;
          out.push(flamme(xc - 12, yflB, 20, 9), flamme(xc + 12, yflB, 18, 8), flamme(xc, yflB - 2, 26, 11));
          // la fumée monte au tuyau
          out.push(h.fleche(`M ${xc} ${yflB - 32} C ${xc - 10} ${ytop + 6} ${(px0 + px1) / 2 + 6} ${ytop + 10} ${(px0 + px1) / 2} ${ytop - 4} L ${(px0 + px1) / 2} 10`, h.a.cache));
          // le chaudron laissé au centre : fantôme
          const f = chaudron(xc, ytop, w, ht, { trace: h.a.cache });
          out.push(...f.murs);
          // le chaudron écarté, avec son fond d'eau et les cubes
          const c = chaudron(cxA, ytop, w, ht);
          out.push(remplir(c, plat(c, g.yeau), h.a.hachure('eau', 'aucun')));
          out.push(h.ligne(c.xi0, g.yeau, c.xi1, g.yeau, h.a.detail));
          const cubes = [[-22, 0, 0.1], [-11, 1, -0.2], [0, 0, 0.3], [11, 1, 0], [22, 0, -0.3], [-16, -9, 0.4], [-5, -10, 0], [6, -9, -0.25], [17, -10, 0.2], [-10, -19, 0.1], [3, -19, -0.35], [14, -19, 0.3]];
          for (const [dx, dy, a] of cubes) if (Math.abs(dx) < (c.xi1 - c.xi0) / 2 - 5) out.push(cube(cxA + dx, g.yeau - 1 + dy, 9, a));
          out.push(...c.murs);
          // on le glisse hors du centre
          out.push(h.fleche(`M ${xc} ${ytop - ht - 14} L ${c.x0 - 6} ${ytop - ht - 14}`, h.a.arete));
          return out.join('\n');
        },
        renvois: z => {
          const g = gFondre(z);
          return [
            { n: 2, rond: [z.l - 14, g.ytop + 20], cible: [g.cxA + g.w / 2 - 12, g.yeau + 7], texte: 'fond d’eau pour les premières minutes' },
            { n: 3, rond: [(g.px1 + g.xc - g.w / 2) / 2 + 2, 14], cible: [g.xc + 10, g.ytop - g.ht - 14], texte: 'dès que ça fume, écarter du centre' },
          ];
        },
      },

      fin: {
        titre: 'C’est fini',
        dessin: z => {
          const g = gFin(z);
          const c = chaudron(g.cx, g.yb, g.w, g.ht, { anse: false });
          const out = [];
          out.push(h.ligne(c.xi0, g.ys, c.xi1, g.ys, h.a.arete));
          // cretons au fond, et deux qui descendent
          const fond = [[-40, 0], [-31, -1], [-22, 0], [-13, -1], [-4, 0], [5, -1], [14, 0], [23, -1], [32, 0], [41, -1], [-26, -7], [-8, -7], [10, -7], [28, -7]];
          fond.forEach(([dx, dy], i) => { if (Math.abs(dx) < (c.xi1 - c.xi0) / 2 - 5) out.push(creton(g.cx + dx, c.yf - 3.5 + dy, 1, i)); });
          const yd = (g.ys + c.yf) / 2;
          out.push(creton(g.cx - 16, yd - 4, 1, 9), creton(g.cx + 20, yd + 2, 1, 9));
          out.push(h.fleche(`M ${g.cx - 16} ${yd + 1} L ${g.cx - 16} ${yd + 9}`, h.a.detail));
          out.push(h.fleche(`M ${g.cx + 20} ${yd + 7} L ${g.cx + 20} ${yd + 15}`, h.a.detail));
          // un léger frémissement
          for (const dx of [-20, 6, 26]) out.push(h.cercle(g.cx + dx, g.ys + 3, 1.4, blanc(h.a.fin)));
          out.push(...c.murs);
          return out.join('\n');
        },
        renvois: z => {
          const g = gFin(z);
          return [
            { n: 4, rond: [14, 14], cible: [g.cx - 20.5, (g.ys + g.yb - 4) / 2 - 5], texte: 'cretons dorés qui descendent : c’est fini' },
          ];
        },
      },

      passoire: {
        titre: 'Première passe',
        dessin: z => {
          const g = gPassoire(z);
          const { cx, yR, rp, dp, ys } = g;
          const out = [];
          const c = chaudron(cx, g.yb, g.w, g.ht, { anse: false });
          out.push(h.ligne(c.xi0, ys, c.xi1, ys, h.a.arete));
          // la passoire : manche sur le bord gauche, oreille accrochée au bord droit
          const yp = yR - 3;
          const bolP = `M ${cx - rp} ${yp} C ${cx - rp} ${yp + dp * 1.3} ${cx + rp} ${yp + dp * 1.3} ${cx + rp} ${yp} Z`;
          out.push(h.path(bolP, blanc(h.a.arete)));
          out.push(h.path(bolP, h.a.hachure('grillage', 'arete')));
          [[-14, 0], [-5, 1], [5, 0], [14, 1], [-9, -6], [2, -6], [11, -6], [-2, -12]].forEach(([dx, dy], i) =>
            out.push(creton(cx + dx, yp + dp * 0.92 - 3 + dy, 1, i + 3)));
          out.push(h.ligne(cx - rp, yp, cx + rp, yp, h.a.contour));
          out.push(h.chemin([[cx - rp, yp], [c.x0 - 2, yp - 1], [c.x0 - 34, yp - 9]], h.a.contour));
          out.push(h.chemin([[cx + rp, yp], [c.x1 + 3, yp], [c.x1 + 3, yp + 7]], h.a.arete));
          // gouttes sous la passoire
          const yfp = yp + dp * 0.98;
          for (const [dx, dy] of [[0, 6], [-8, 13], [6, 17]]) if (yfp + dy + 2 < ys) out.push(goutte(cx + dx, yfp + dy));
          out.push(...c.murs);
          // la louche qui verse
          const L = louche(g.bx, g.by, 13, 0.6, g.bx - 44, g.by - 34);
          out.push(...L.svg);
          out.push(filet(L.bec, cx - rp * 0.35, yp + dp * 0.55));
          return out.join('\n');
        },
        renvois: z => {
          const g = gPassoire(z);
          return [
            { n: 5, rond: [z.l - 14, g.yR - 30], cible: [g.cx + 11, g.yR - 3 + g.dp * 0.92 - 9], texte: 'passoire : les cretons restent dedans' },
          ];
        },
      },

      coton: {
        titre: 'Deuxième passe',
        dessin: z => {
          const g = gCoton(z);
          const { cx, yt, ys, creux } = g;
          const p = pot(cx, g.yb, g.w, g.ht);
          const out = [];
          out.push(remplir(p, plat(p, ys), h.a.blanc));
          out.push(h.ligne(p.xi0, ys, p.xi1, ys, h.a.arete));
          // le cerceau posé sur le bord, le coton replié dessus, le sac qui pend dedans
          const rw = 2.6;
          const xg = p.x0 + p.t / 2, xd = p.x1 - p.t / 2, yw = yt - rw - 1.5;
          for (let k = 0; k < 3; k++) {
            const e = k * 1.6;
            // de l'extérieur du pot, par-dessus le fil, jusqu'au fond du sac
            out.push(h.path(`M ${p.x0 - 3 - e} ${yt + 22 - e} L ${p.x0 - 3 - e} ${yt - 1} Q ${xg - 1} ${yw - rw - 1.5 - e} ${xg + rw + 1 + e} ${yw}` +
              ` C ${xg + 10} ${yt + creux * 0.7 - e} ${cx - 22} ${yt + creux - e} ${cx} ${yt + creux - e}` +
              ` C ${cx + 22} ${yt + creux - e} ${xd - 10} ${yt + creux * 0.7 - e} ${xd - rw - 1 - e} ${yw}` +
              ` Q ${xd + 1} ${yw - rw - 1.5 - e} ${p.x1 + 3 + e} ${yt - 1} L ${p.x1 + 3 + e} ${yt + 22 - e}`, h.a.detail));
          }
          out.push(h.cercle(xg, yw, rw, h.a.plein), h.cercle(xd, yw, rw, h.a.plein));
          // gras dans le sac, gouttes filtrées
          const ypool = yt + creux * 0.72;
          out.push(h.ligne(cx - 20, ypool, cx + 20, ypool, h.a.detail));
          for (const [dx, dy] of [[0, 8], [-4, 17], [3, 24]]) if (yt + creux + dy + 2 < ys) out.push(goutte(cx + dx, yt + creux + dy));
          out.push(...p.murs);
          // la louche
          const L = louche(cx - 30, yt - 34, 13, 0.6, cx - 76, yt - 58);
          out.push(...L.svg);
          out.push(filet(L.bec, cx - 6, ypool));
          return out.join('\n');
        },
        renvois: z => {
          const g = gCoton(z);
          const p = { x0: g.cx - g.w / 2, x1: g.cx + g.w / 2 };
          return [
            { n: 6, rond: [p.x1 + 36, g.yt + g.creux * 0.55], cible: [g.cx + 26, g.yt + g.creux * 0.78], texte: 'vieux coton de drap, trois épaisseurs' },
            { n: 7, rond: [p.x1 + 36, g.yt - 18], cible: [p.x1 - 2.5, g.yt - 4.3], texte: 'broche pliée en cerceau, posée sur le bord' },
            { n: 8, rond: [p.x1 + 36, g.yb - 26], cible: [p.x1 - 2, g.yb - 26], texte: 'pot chaud, propre et sec' },
          ];
        },
      },

      couler: {
        titre: 'Couler en deux temps',
        dessin: z => {
          const g = gCouler(z);
          const out = [];
          // premier temps : aux trois quarts, figé, le cratère creusé
          const A = pot(g.cA, g.yb, g.w, g.ht);
          const yA = A.yf - (A.yf - A.yt) * 0.75;
          const crA = quad([A.xi0, yA], [g.cA, yA + 22], [A.xi1, yA]);
          out.push(remplir(A, crA, h.a.hachure('neige', 'aucun')));
          out.push(h.chemin(crA, h.a.arete));
          out.push(...A.murs);
          // second temps : la dernière louche comble le creux
          const B = pot(g.cB, g.yb, g.w, g.ht);
          const yB = B.yt + 7;
          out.push(remplir(B, crA.map(([x, y]) => [x - g.cA + g.cB, y]), h.a.hachure('neige', 'aucun')));
          out.push(h.chemin(crA.map(([x, y]) => [x - g.cA + g.cB, y]), h.a.cache));
          out.push(h.ligne(B.xi0, yB, B.xi1, yB, h.a.arete));
          out.push(...B.murs);
          const L = louche(g.cB - 24, B.yt - 22, 11, 0.6, g.cB - 58, B.yt - 44);
          out.push(...L.svg);
          out.push(filet(L.bec, g.cB - 4, yB));
          return out.join('\n');
        },
        renvois: z => {
          const g = gCouler(z);
          const yA = (g.yb - 6) - (g.yb - 6 - g.yt) * 0.75;
          return [
            { n: 9, rond: [14, g.yt - 10], cible: [g.cA - 6, yA + 10], texte: 'aux trois quarts, puis laisser prendre' },
            { n: 10, rond: [z.l - 14, g.yt - 10], cible: [g.cB + 18, g.yt + 7], texte: 'une dernière louche comble le creux' },
          ];
        },
      },

      rateEau: {
        titre: 'Raté : eau au fond',
        dessin: z => {
          const g = gRate(z);
          const P = pot(g.cx, g.yb, g.w, g.ht);
          const out = [];
          const ysurf = P.yt + 7;
          const yEau = P.yf - 12;
          // gras figé jusqu'en haut
          out.push(remplir(P, plat(P, ysurf), h.a.hachure('neige', 'aucun')));
          out.push(h.ligne(P.xi0, ysurf, P.xi1, ysurf, h.a.arete));
          // bande marbrée au-dessus de l'eau
          const lm = P.xi1 - P.xi0;
          const marbre = [];
          for (let i = 0; i <= 12; i++) marbre.push([P.xi0 + lm * i / 12, yEau - 16 + 3 * Math.sin(i * 1.3)]);
          out.push(h.chemin([...marbre, [P.xi1, yEau], [P.xi0, yEau]], h.a.blanc, true));
          out.push(h.chemin(marbre, h.a.detail));
          for (let k = 0; k < 2; k++) {
            const pts = [];
            for (let i = 0; i <= 12; i++) pts.push([P.xi0 + 3 + (lm - 6) * i / 12, yEau - 10 + k * 5 + 1.8 * Math.sin(i * 1.7 + k * 2)]);
            out.push(h.chemin(pts, h.a.fin));
          }
          // la couche liquide
          out.push(h.rect(P.xi0, yEau, lm, P.yf - yEau, h.a.hachure('eau', 'aucun')));
          out.push(h.ligne(P.xi0, yEau, P.xi1, yEau, h.a.detail));
          out.push(...P.murs);
          // seconde ligne de rappel du renvoi 11, vers la bande marbrée (même trait que le compositeur)
          {
            const [rx, ry] = [14, g.yb - 14], [tx, ty] = [P.xi0 + lm * 0.3, yEau - 8];
            const d = Math.hypot(tx - rx, ty - ry), sx = rx + 9 * (tx - rx) / d, sy = ry + 9 * (ty - ry) / d;
            out.push(`<line x1="${sx}" y1="${sy}" x2="${tx}" y2="${ty}" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>`);
            out.push(`<line x1="${sx}" y1="${sy}" x2="${tx}" y2="${ty}" fill="none" stroke="#000000" stroke-width="0.5" stroke-dasharray="3 2.5"/>`);
            out.push(`<circle cx="${tx}" cy="${ty}" r="1.8" fill="#000000" stroke="#FFFFFF" stroke-width="0.7"/>`);
          }
          return out.join('\n');
        },
        renvois: z => {
          const g = gRate(z);
          return [
            { n: 11, rond: [14, g.yb - 14], cible: [g.cx - g.w / 2 + 14, g.yb - 12], texte: 'gras marbré, liquide dessous : eau restée' },
          ];
        },
      },

      rateCratere: {
        titre: 'Raté : coulé d’un coup',
        dessin: z => {
          const g = gRate(z);
          const P = pot(g.cx, g.yb, g.w, g.ht);
          const ybord = P.yt + 5;
          const cr = [[P.xi0, ybord], ...quad([P.xi0 + 6, ybord + 1], [g.cx, ybord + 58], [P.xi1 - 6, ybord + 1]), [P.xi1, ybord]];
          return [
            remplir(P, cr, h.a.hachure('neige', 'aucun')),
            h.chemin(cr, h.a.arete),
            ...P.murs,
          ].join('\n');
        },
        renvois: z => {
          const g = gRate(z);
          return [
            { n: 12, rond: [z.l - 14, g.yt + 12], cible: [g.cx + 8, g.yt + 5 + 27], texte: 'cratère de retrait : coulé d’un coup' },
          ];
        },
      },
    },
    danger: 'Danger — un feu de gras ne s’éteint pas avec de l’eau : elle coule sous la nappe en flammes, se vaporise d’un coup et projette le gras enflammé. Couvercle sur le chaudron, couper la chaleur, et ne jamais déplacer un chaudron en flammes.',
  };
};
