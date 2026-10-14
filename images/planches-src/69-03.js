// Planche 69-03 — tenir la pièce sous la saumure, deux montages en coupe.
// La charte : la pièce au contour fort ; au-dessus de la saumure, la paroi d'en face en gris loin,
// qui dit qu'on regarde dans la chaudière. Pas de rouge : aucun geste, aucun point à vérifier.
module.exports = (h) => {
  const surBlanc = t => t.replace('fill="none"', 'fill="#FFFFFF"');

  // point d'une courbe de Bézier cubique, échantillonnée
  const bez = (p0, p1, p2, p3, n, t0 = 0, t1 = 1) => {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = t0 + (t1 - t0) * i / n, u = 1 - t;
      pts.push([
        u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
        u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
      ]);
    }
    return pts;
  };

  // la chaudière en coupe, la même dans les deux vues
  const geo = (z) => {
    const cx = z.l / 2;
    const rt = 48;                       // le bord
    const rb = z.h - 6;                  // le dessous
    const ph = rb - rt;
    const aw = Math.min(z.l * 0.37, ph * 0.60);   // demi-largeur au bord
    const bw = aw * 0.84;                          // demi-largeur au fond
    const t = 3.5;
    const inner = y => aw - t - (aw - bw) * (y - rt) / ph;
    const yb = rb - t;                   // le fond, dedans
    const mw = inner(yb) * 0.80;         // la pièce
    const mh = ph * 0.34;
    // le dessus de la pièce, en deux courbes
    const s1 = [[cx - mw, yb], [cx - mw - 6, yb - mh * 0.6], [cx - mw * 0.6, yb - mh], [cx - mw * 0.1, yb - mh * 0.97]];
    const s2 = [s1[3], [cx + mw * 0.4, yb - mh * 0.95], [cx + mw + 4, yb - mh * 0.8], [cx + mw, yb - mh * 0.2]];
    return { cx, rt, rb, ph, aw, bw, t, inner, yb, mw, mh, s1, s2 };
  };

  const seau = (g) => {
    const { cx, rt, rb, aw, bw, t } = g;
    const out = [];
    // paroi en coupe : un U noir
    out.push(h.chemin([
      [cx - aw, rt], [cx - bw, rb], [cx + bw, rb], [cx + aw, rt],
      [cx + aw - t, rt], [cx + bw - t, rb - t], [cx - bw + t, rb - t], [cx - aw + t, rt],
    ], h.a.plein, true));
    // bord roulé
    out.push(h.rect(cx - aw - 5, rt - 1, 8, 5, h.a.plein));
    out.push(h.rect(cx + aw - 3, rt - 1, 8, 5, h.a.plein));
    // oreilles et anse
    const oy = rt + 12;
    for (const s of [-1, 1]) {
      const x0 = cx + s * aw;
      out.push(h.chemin([[x0, rt + 5], [x0 + s * 8, rt + 7], [x0 + s * 8, rt + 18], [x0, rt + 21]], surBlanc(h.a.arete), true));
      out.push(h.cercle(x0 + s * 4.5, oy, 1.6, h.a.plein));
    }
    const xl = cx - aw - 4.5, xr = cx + aw + 4.5;
    out.push(h.path(`M ${xl} ${oy} C ${xl - 3} -6 ${xr + 3} -6 ${xr} ${oy}`, h.a.arete));
    const pic = (2 * oy + 6 * -6) / 8;
    out.push(h.rect(cx - 17, pic - 4.5, 34, 9, surBlanc(h.a.arete) + ' rx="4.5"'));
    return out;
  };

  // au-dessus du liquide, on voit l'intérieur de la paroi d'en face : en gris loin
  const fond = (g, ys) => {
    const { cx, inner, rt } = g;
    return h.chemin([[cx - inner(rt), rt], [cx + inner(rt), rt], [cx + inner(ys), ys], [cx - inner(ys), ys]], h.a.loin, true);
  };

  const saumure = (g, ys) => {
    const { cx, inner, yb } = g;
    return h.chemin([[cx - inner(ys), ys], [cx + inner(ys), ys], [cx + inner(yb), yb], [cx - inner(yb), yb]], h.a.hachure('eau', 'aucun'), true);
  };

  const piece = (g) => {
    const { cx, yb, mw, mh, s1, s2 } = g;
    const p = s => s.map(q => q.join(' '));
    const d = `M ${p(s1)[0]} C ${p(s1).slice(1).join(' ')} C ${p(s2).slice(1).join(' ')} Q ${cx + mw - 1} ${yb} ${cx + mw - 14} ${yb} Z`;
    const out = [h.path(d, surBlanc(h.a.contour))];
    // fibres du muscle
    out.push(h.path(`M ${cx - mw * 0.75} ${yb - mh * 0.25} Q ${cx - mw * 0.4} ${yb - mh * 0.55} ${cx - mw * 0.05} ${yb - mh * 0.62}`, h.a.detail));
    out.push(h.path(`M ${cx - mw * 0.55} ${yb - mh * 0.12} Q ${cx - mw * 0.2} ${yb - mh * 0.3} ${cx + mw * 0.05} ${yb - mh * 0.28}`, h.a.detail));
    out.push(h.path(`M ${cx + mw * 0.5} ${yb - mh * 0.72} Q ${cx + mw * 0.75} ${yb - mh * 0.5} ${cx + mw * 0.8} ${yb - mh * 0.2}`, h.a.detail));
    // l'os
    const ox = cx + mw * 0.25, oy = yb - mh * 0.42, r = mh * 0.17;
    out.push(h.cercle(ox, oy, r, surBlanc(h.a.arete)));
    out.push(h.cercle(ox, oy, r * 0.45, h.a.detail));
    return out;
  };

  return {
    ref: '69-03',
    titre: 'Tenir la pièce sous la saumure',
    desc: 'Deux chaudières en coupe. La pièce au fond, couverte de saumure. À gauche, un disque de bois taillé au diamètre du contenant, et une pierre bouillie par-dessus. À droite, un sac fermé rempli de la même saumure, posé sur la pièce.',
    format: 'demi',
    disposition: [['disque', 'sac']],
    vues: {
      disque: {
        titre: 'Disque et pierre',
        dessin: z => {
          const g = geo(z);
          const { cx, inner, yb, mh, ph } = g;
          const yd = yb - mh - 1;              // dessous du disque
          const ep = 9;
          const ydt = yd - ep;                 // dessus du disque
          const sh = ph * 0.2, sw = g.aw * 0.40;
          const ys = ydt - sh * 0.45;          // niveau de la saumure
          const pierre = `M ${cx - sw} ${ydt} C ${cx - sw - 5} ${ydt - sh * 0.7} ${cx - sw * 0.4} ${ydt - sh - 2} ${cx + sw * 0.1} ${ydt - sh} C ${cx + sw * 0.7} ${ydt - sh + 2} ${cx + sw + 5} ${ydt - sh * 0.5} ${cx + sw} ${ydt} Z`;
          return [
            fond(g, ys),
            saumure(g, ys),
            ...piece(g),
            h.rect(cx - inner(ydt) + 1, ydt, 2 * inner(ydt) - 2, ep, surBlanc(h.a.arete)),
            h.rect(cx - inner(ydt) + 1, ydt, 2 * inner(ydt) - 2, ep, h.a.hachure('bois')),
            h.path(pierre, surBlanc(h.a.contour)),
            h.path(pierre, h.a.hachure('pierre')),
            h.ligne(cx - inner(ys), ys, cx - sw - 3, ys, h.a.arete),
            h.ligne(cx + sw + 4, ys, cx + inner(ys), ys, h.a.arete),
            ...seau(g),
          ].join('\n');
        },
        renvois: z => {
          const g = geo(z);
          const { cx, inner, yb, mw, mh, ph } = g;
          const ydt = yb - mh - 10;
          const sh = ph * 0.2, sw = g.aw * 0.40;
          const ys = ydt - sh * 0.45;
          return [
            { n: 1, rond: [14, yb - mh * 0.45], cible: [cx - mw * 0.7, yb - mh * 0.45], texte: 'la pièce, au fond' },
            { n: 2, rond: [14, ys - 26], cible: [cx - inner(ys) + 12, ys], texte: 'saumure par-dessus' },
            { n: 3, rond: [z.l - 14, ydt + 4.5], cible: [cx + inner(ydt) - 14, ydt + 4.5], texte: 'disque de bois au diamètre du contenant' },
            { n: 4, rond: [z.l - 14, ydt - sh - 16], cible: [cx + sw * 0.35, ydt - sh * 0.8], texte: 'pierre bouillie par-dessus' },
          ];
        },
      },
      sac: {
        titre: 'Sac de saumure',
        dessin: z => {
          const g = geo(z);
          const { cx, inner, yb, mh, ph, s1, s2 } = g;
          const ys = yb - mh - ph * 0.12;      // niveau de la saumure
          const ytop = ys - ph * 0.16;         // dos du sac
          // le dessous du sac épouse la pièce
          const dessous = [...bez(...s1, 10, 0.25, 1), ...bez(...s2, 10, 0.1, 0.75)].map(([x, y]) => [x, y - 2.5]);
          const fl = dessous[0], fr = dessous[dessous.length - 1];
          const yl = fl[1] + 12, yr = fr[1] + 12;
          const gl = cx - inner(ys) + 9, gr = cx + inner(ys) - 9;
          const xg = y => cx - inner(y) + 2, xd = y => cx + inner(y) - 2;
          // flancs : collés à la paroi sous la surface, décollés juste à la surface
          const gauche = [[xg(yl), yl], ...bez([xg(ys + 18), ys + 18], [xg(ys + 6), ys + 6], [gl - 4, ys + 2], [gl, ys], 6)];
          const droite = [...bez([gr, ys], [gr + 4, ys + 2], [xd(ys + 6), ys + 6], [xd(ys + 18), ys + 18], 6), [xd(yr), yr]];
          // coins du fond : le sac descend entre la pièce et la paroi
          const coinD = bez([xd(yr), yr], [xd(yr) - 2, yr + 6], [fr[0] + 12, fr[1] + 2], fr, 6).slice(1);
          const coinG = bez(fl, [fl[0] - 12, fl[1] + 2], [xg(yl) + 2, yl + 6], [xg(yl), yl], 6).slice(1, -1);
          const dos = [
            ...bez([gl, ys], [gl - 3, ytop + 4], [cx - 34, ytop - 2], [cx - 7, ytop - 6], 10),
            [cx - 4, ytop - 16],
            [cx + 4, ytop - 16],
            ...bez([cx + 7, ytop - 6], [cx + 34, ytop - 2], [gr + 3, ytop + 4], [gr, ys], 10),
          ];
          const contour = [...gauche, ...dos, ...droite, ...coinD, ...dessous.slice().reverse().slice(1), ...coinG];
          const ky = ytop - 18;
          return [
            fond(g, ys),
            saumure(g, ys),
            ...piece(g),
            h.chemin(contour, surBlanc(h.a.arete), true),
            h.chemin(contour, h.a.hachure('eau'), true),
            // plis du col
            h.ligne(cx - 5, ytop - 7, cx - 18, ytop + 1, h.a.detail),
            h.ligne(cx + 5, ytop - 7, cx + 18, ytop + 1, h.a.detail),
            h.ligne(cx, ytop - 7, cx, ytop + 3, h.a.detail),
            // le nœud et l'oreille du sac
            h.ellipse(cx, ky, 6, 3.5, surBlanc(h.a.arete)),
            h.chemin([[cx - 3, ky - 3], [cx - 9, ky - 16], [cx, ky - 12], [cx + 9, ky - 17], [cx + 3, ky - 3]], surBlanc(h.a.arete), true),
            h.ligne(cx - inner(ys), ys, gl, ys, h.a.arete),
            h.ligne(gr, ys, cx + inner(ys), ys, h.a.arete),
            ...seau(g),
          ].join('\n');
        },
        renvois: z => {
          const g = geo(z);
          const { cx, yb, mh, ph } = g;
          const ys = yb - mh - ph * 0.12;
          const ytop = ys - ph * 0.16;
          return [
            { n: 5, rond: [z.l - 14, ytop - 20], cible: [cx + 30, ytop + 4], texte: 'sac fermé, plein de la même saumure' },
          ];
        },
      },
    },
  };
};
