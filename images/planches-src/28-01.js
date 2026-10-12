// Planche 28-01 — ouvrir un abcès à la lame (chapitre 28, étapes 53 et 54, et la compresse
// chaude qui garde sa chaleur). Une séquence : la compresse en couches, la bosse tenue entre le
// pouce et l'index, le trait unique de la lame droite, le doigt qui défait les cloisons, le
// rinçage à la bouteille percée. Aucune cote : rien ne s'y construit.
module.exports = (h) => {
  const A = h.a, F = h.formes, I = F._interne;
  const G = {};
  let V;                        // les vues : un renvoi redessine sa vue pour en avoir la géométrie                 // la géométrie d'une vue, passée de son dessin à ses renvois
  const RAD = Math.PI / 180;
  const f = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const D = (pts, ferme = false) => 'M ' + pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ') + (ferme ? ' Z' : '');
  const L = (pts, ferme = false) => I.ser(I.lisse(pts, ferme), p => p);
  const tourne = (p, deg) => { const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };

  // Un trait de coupure (la chair continue au-delà) : une onde douce entre deux points.
  const coupure = (x1, y1, x2, y2) => {
    const n = 8, pts = [];
    const lx = x2 - x1, ly = y2 - y1, l = Math.hypot(lx, ly), nx = -ly / l, ny = lx / l;
    for (let i = 0; i <= n; i++) { const t = i / n, o = Math.sin(t * Math.PI * 2) * 2.2; pts.push([x1 + lx * t + nx * o, y1 + ly * t + ny * o]); }
    return `<path d="${L(pts)}" ${A.fin}/>`;
  };

  // ─── la coupe de la peau et de la poche, le grand axe dans le plan ─────────────────────
  // k : px par mm. La bosse fait 56 de large, un plateau de 22 au centre ; la poche est juste
  // sous la peau. ouvert : demi-longueur du trait (la voûte est ouverte sur tout le trait).
  function coupe({ cx, ys, k, x0, x1, yb, ouvert = 0, cloisons = 'entieres' }) {
    const a = 28 * k, p = 11 * k, dd = 6 * k, t = 2.5 * k;
    const rx = 19 * k, ry = 8.5 * k, cy = ys - dd + t + ry;
    const yS = x => { const u = Math.abs(x - cx); if (u <= p) return ys - dd; if (u >= a) return ys; return ys - dd * 0.5 * (1 + Math.cos(Math.PI * (u - p) / (a - p))); };
    const yH = x => cy - ry * Math.sqrt(Math.max(0, 1 - ((x - cx) / rx) ** 2));
    const yB = x => cy + ry * Math.sqrt(Math.max(0, 1 - ((x - cx) / rx) ** 2));
    const surf = (xa, xb) => { const pts = []; for (let x = xa; x <= xb + 0.01; x += 2) pts.push([x, yS(x)]); if (pts[pts.length - 1][0] < xb) pts.push([xb, yS(xb)]); return pts; };
    const out = [];
    // la chair, blanche, et le derme : un trait fin sous la surface
    out.push(`<path d="${D([...surf(x0, x1), [x1, yb], [x0, yb]], true)}" ${A.blanc}/>`);
    out.push(`<path d="${D(surf(x0, x1).map(q => [q[0], q[1] + t]))}" ${A.fin}/>`);
    out.push(coupure(x0, ys, x0, yb), coupure(x1, ys, x1, yb), coupure(x0, yb, x1, yb));
    // la poche : blanc, puis le pus en pointillé
    out.push(h.ellipse(cx, cy, rx, ry, A.blanc), h.ellipse(cx, cy, rx, ry, h.a.hachure('neige', 'aucun')));
    const xc = [cx - 6.5 * k, cx + 7 * k];
    if (cloisons === 'entieres') {
      for (const [i, x] of xc.entries()) {
        const xb = x + (i ? -1.2 : 1.5) * k;
        out.push(`<path d="M ${f(x)} ${f(yH(x) - 1)} Q ${f((x + xb) / 2 + (i ? 1.6 : -1.6) * k)} ${f(cy)} ${f(xb)} ${f(yB(xb) + 1)}" ${A.arete}/>`);
      }
    } else if (cloisons === 'rompues') {
      for (const [i, x] of xc.entries()) {
        const s = i ? 1 : -1;
        out.push(`<path d="${D([[x, yH(x)], [x + s * 0.8 * k, yH(x) + 2.6 * k], [x - s * 0.3 * k, yH(x) + 3.2 * k]])}" ${A.detail}/>`);
        out.push(`<path d="${D([[x + s * 2 * k, yB(x) + 0.5], [x + s * 1.2 * k, yB(x) - 3 * k], [x + s * 2.2 * k, yB(x) - 3.8 * k]])}" ${A.detail}/>`);
      }
    }
    if (!ouvert) {
      out.push(h.ellipse(cx, cy, rx, ry, A.arete));
      out.push(`<path d="${D(surf(x0, x1))}" ${A.contour}/>`);
    } else {
      const o = ouvert, xa = cx - o, xb = cx + o;
      // la voûte coupée : blanc entre les deux lèvres, jusqu'au pus
      out.push(`<path d="${D([[xa, yS(xa) - 1], [xb, yS(xb) - 1], [xb, yH(xb) + 1], [xa, yH(xa) + 1]], true)}" ${A.blanc}/>`);
      out.push(`<path d="M ${f(xa)} ${f(yH(xa))} A ${f(rx)} ${f(ry)} 0 1 0 ${f(xb)} ${f(yH(xb))}" ${A.arete}/>`);
      out.push(`<path d="${D([...surf(x0, xa), [xa, yH(xa)]])}" ${A.contour}/>`);
      out.push(`<path d="${D([[xb, yH(xb)], ...surf(xb, x1)])}" ${A.contour}/>`);
    }
    return { svg: out.join('\n'), yS, yH, yB, cy, rx, ry, xc };
  }

  // ─── le couteau : pointe en (tx, ty), dos à gauche, fil à droite, lame droite ─────────
  function couteau(tx, ty, k, fantome = false) {
    const Lb = 30 * k, wb = 7 * k, Lh = 42 * k, wh = 11 * k, bo = 4 * k;
    const lame = `M ${f(tx)} ${f(ty)} L ${f(tx)} ${f(ty - Lb)} L ${f(tx + wb)} ${f(ty - Lb)} L ${f(tx + wb)} ${f(ty - Lb * 0.5)} Q ${f(tx + wb)} ${f(ty - 5 * k)} ${f(tx)} ${f(ty)} Z`;
    if (fantome) return `<path d="${lame}" ${A.cache}/>`;
    const xh = tx + wb / 2 - wh / 2, yh = ty - Lb;
    const out = [];
    out.push(`<path d="${lame}" ${blanc(A.arete)}/>`);
    // le biseau du fil, à peine marqué
    out.push(`<path d="M ${f(tx + wb - 1.6 * k)} ${f(ty - Lb + 1)} L ${f(tx + wb - 1.6 * k)} ${f(ty - Lb * 0.5)} Q ${f(tx + wb - 1.6 * k)} ${f(ty - 7 * k)} ${f(tx + 0.8)} ${f(ty - 2.5)}" ${A.fin}/>`);
    out.push(h.rect(xh + 0.8 * k, yh - bo, wh - 1.6 * k, bo, blanc(A.arete)));
    out.push(`<path d="M ${f(xh)} ${f(yh - bo)} L ${f(xh)} ${f(yh - bo - Lh + wh / 2)} A ${f(wh / 2)} ${f(wh / 2)} 0 0 1 ${f(xh + wh)} ${f(yh - bo - Lh + wh / 2)} L ${f(xh + wh)} ${f(yh - bo)} Z" ${h.a.hachure('bois')}/>`);
    return out.join('\n');
  }

  // ─── le doigt, de profil, qui descend dans la poche (le dos, l'ongle, à droite) ───────
  function doigt(pts, k) {
    const ep = [19, 16.2, 14.2, 12.2].map(v => v * k);
    const dos = [[ep[0] * 0.44, ep[1] * 0.44], [ep[1] * 0.44, ep[2] * 0.44], [ep[2] * 0.44, ep[3] * 0.44]];
    const ventre = [[ep[0] * 0.56, ep[1] * 0.54], [ep[1] * 0.54, ep[2] * 0.54], [ep[2] * 0.54, ep[3] * 0.52]];
    const t = I.tube({ pts, sens: -1, dos, ventre, coussin: [0.9 * k, 0.8 * k, 0.9 * k], bout: 'doigt', ongle: 'cote', base: 0, plis: true });
    // l'ongle, sur le dos de la dernière phalange (le côté droit) : une lame posée sur le dos
    const P = pts[2], Q = pts[3], Lg = Math.hypot(Q[0] - P[0], Q[1] - P[1]);
    const u = [(Q[0] - P[0]) / Lg, (Q[1] - P[1]) / Lg];
    let nn = [-u[1], u[0]]; if (nn[0] < 0) nn = [-nn[0], -nn[1]];
    const w = s => (ep[2] + (ep[3] - ep[2]) * s) * 0.44;
    const at = (s, d) => [P[0] + u[0] * s * Lg + nn[0] * (w(s) - d), P[1] + u[1] * s * Lg + nn[1] * (w(s) - d)];
    const ong = `M ${f(at(0.3, 0)[0])} ${f(at(0.3, 0)[1])} Q ${f(at(0.32, 2.4 * k)[0])} ${f(at(0.32, 2.4 * k)[1])} ${f(at(0.42, 2.4 * k)[0])} ${f(at(0.42, 2.4 * k)[1])} L ${f(at(0.86, 2 * k)[0])} ${f(at(0.86, 2 * k)[1])} Q ${f(at(0.93, 1.6 * k)[0])} ${f(at(0.93, 1.6 * k)[1])} ${f(at(0.95, 0.3 * k)[0])} ${f(at(0.95, 0.3 * k)[1])}`;
    return I.peindre([{ ...t, det: (t.det || []).filter((d, i) => i < t.det.length - 1) }], p => p) + `\n<path d="${ong}" ${A.detail}/>`;
  }

  // ─── la bouteille de plastique, bouchon percé : repère au trou, l'axe vers le haut ────
  function bouteille(qx, qy, k, angle, yCoupe) {
    const T = p => { const r = tourne([p[0] * k, p[1] * k], angle); return [qx + r[0], qy + r[1]]; };
    const S = pts => pts.map(T);
    const out = [];
    const corps = [[-12.5, -26], [-13, -30], [-22, -38], [-30, -50], [-31, -60], [-31, -yCoupe], [31, -yCoupe], [31, -60], [30, -50], [22, -38], [13, -30], [12.5, -26]];
    out.push(`<path d="${L(S(corps.slice(0, 6)))} ${L(S(corps.slice(6))).replace(/^M/, 'L')} Z" ${A.blanc}/>`);
    out.push(`<path d="${L(S(corps.slice(0, 6)))}" ${A.contour}/>`, `<path d="${L(S(corps.slice(6)))}" ${A.contour}/>`);
    out.push(coupure(...T([-31, -yCoupe]), ...T([31, -yCoupe])));
    // les anneaux du goulot, le bouchon
    out.push(`<path d="${D(S([[-12.5, -14], [-12.5, -26], [12.5, -26], [12.5, -14]]), true)}" ${blanc(A.arete)}/>`);
    out.push(`<path d="${D(S([[-14.5, -17], [14.5, -17]]))}" ${A.detail}/>`);
    out.push(`<path d="${D(S([[-15, 0.5], [-15, -14], [15, -14], [15, 0.5]]), true)}" ${blanc(A.arete)}/>`);
    for (let x = -11; x <= 11; x += 4.4) out.push(`<path d="${D(S([[x, -2], [x, -12]]))}" ${A.fin}/>`);
    return { svg: out.join('\n'), T };
  }

  return {
    ref: '28-01',
    titre: 'Ouvrir un abcès à la lame',
    desc: 'En cinq vues : la compresse chaude en couches (linge mouillé, bouteille chaude roulée dans un linge sec, serviette) ; la bosse tenue entre le pouce et l’index, le trait visé au centre mou dans le grand axe ; en coupe, la lame droite sur la peau qui fait un seul trait ; le doigt qui défait les cloisons entre les loges ; le rinçage au jet d’une bouteille au bouchon percé.',
    format: 'pleine',
    disposition: [['compresse', 'tenir'], ['lame', 'doigt', 'rincer']],
    hauteurs: [1, 1.12],
    largeurs: [[1, 1.1], [1, 1, 1.12]],
    vues: V = {
      // ─── 1. la compresse, en vue éclatée ───────────────────────────────────────────────
      compresse: {
        titre: '1. La compresse qui garde sa chaleur',
        dessin: z => {
          const k = 0.72, cx = z.l / 2 + 10, o = [];
          const ysk = z.h - 34;
          // la peau et la bosse, la poche en caché
          const a = 28 * k, p = 11 * k, dd = 6 * k;
          const yS = x => { const u = Math.abs(x - cx); if (u <= p) return ysk - dd; if (u >= a) return ysk; return ysk - dd * 0.5 * (1 + Math.cos(Math.PI * (u - p) / (a - p))); };
          const pts = []; for (let x = 24; x <= z.l - 6; x += 2) pts.push([x, yS(x)]);
          o.push(`<path d="${D([...pts, [z.l - 6, z.h - 4], [24, z.h - 4]], true)}" ${A.blanc}/>`);
          o.push(`<path d="${D(pts)}" ${A.contour}/>`);
          o.push(coupure(24, ysk, 24, z.h - 4), coupure(z.l - 6, ysk, z.l - 6, z.h - 4));
          o.push(h.ellipse(cx, ysk + 2.5, 19 * k, 7.5 * k, A.cache));
          // le linge mouillé, plié : une bande, ses deux plis arrondis
          const yl = ysk - 46, ll = 120 * k, el = 9;
          o.push(`<path d="M ${f(cx - ll / 2)} ${f(yl)} L ${f(cx + ll / 2)} ${f(yl)} A ${el / 2} ${el / 2} 0 0 1 ${f(cx + ll / 2)} ${f(yl + el)} L ${f(cx - ll / 2)} ${f(yl + el)} A ${el / 2} ${el / 2} 0 0 1 ${f(cx - ll / 2)} ${f(yl)} Z" ${h.a.hachure('eau')}/>`);
          o.push(`<path d="M ${f(cx - ll / 2 + 4)} ${f(yl + el / 2)} L ${f(cx + ll / 2 - 10)} ${f(yl + el / 2)}" ${A.fin}/>`);
          // la bouteille de métal couchée, roulée dans le linge sec ; goulot et bouchon dehors
          const yb = yl - 50, rb = 37 * k, xb0 = cx - 118 * k, xb1 = cx + 62 * k;
          o.push(`<path d="M ${f(xb1)} ${f(yb - rb + 3)} Q ${f(xb1 + 22 * k)} ${f(yb - rb + 3)} ${f(xb1 + 30 * k)} ${f(yb - 14 * k)} L ${f(xb1 + 42 * k)} ${f(yb - 14 * k)} L ${f(xb1 + 42 * k)} ${f(yb + 14 * k)} L ${f(xb1 + 30 * k)} ${f(yb + 14 * k)} Q ${f(xb1 + 22 * k)} ${f(yb + rb - 3)} ${f(xb1)} ${f(yb + rb - 3)} Z" ${blanc(A.arete)}/>`);
          o.push(h.rect(xb1 + 42 * k, yb - 17 * k, 16 * k, 34 * k, h.a.hachure('metal')));
          // le linge sec : le rouleau, son bord qui fait la spirale, le rabat
          const rl = rb + 4;
          o.push(`<path d="M ${f(xb0 + 6)} ${f(yb - rl)} L ${f(xb1 + 4)} ${f(yb - rl)} Q ${f(xb1 + 10)} ${f(yb)} ${f(xb1 + 4)} ${f(yb + rl)} L ${f(xb0 + 6)} ${f(yb + rl)} Q ${f(xb0 - 2)} ${f(yb)} ${f(xb0 + 6)} ${f(yb - rl)} Z" ${blanc(A.contour)}/>`);
          for (const x of [xb0 + 30, xb0 + 62, xb0 + 94]) o.push(`<path d="M ${f(x)} ${f(yb - rl)} Q ${f(x + 6)} ${f(yb)} ${f(x + 2)} ${f(yb + rl)}" ${A.detail}/>`);
          // la serviette pliée
          const ys = yb - rl - 44, ls = 250 * k, es = 20;
          o.push(`<path d="M ${f(cx - ls / 2 + es / 2)} ${f(ys)} L ${f(cx + ls / 2)} ${f(ys)} L ${f(cx + ls / 2)} ${f(ys + es)} L ${f(cx - ls / 2 + es / 2)} ${f(ys + es)} A ${es / 2} ${es / 2} 0 0 1 ${f(cx - ls / 2 + es / 2)} ${f(ys)} Z" ${h.a.hachure('isolant', 'contour')}/>`);
          // on pose de bas en haut
          const xf = 14;
          o.push(h.fleche(`M ${xf} ${f(ys + es + 4)} L ${xf} ${f(yb - rl - 6)}`));
          o.push(h.fleche(`M ${xf} ${f(yb + rl + 4)} L ${xf} ${f(yl - 6)}`));
          o.push(h.fleche(`M ${xf} ${f(yl + el + 4)} L ${xf} ${f(ysk - 8)}`));
          G.compresse = { cx, yl, el, ll, yb, rl, xb0, xb1, ys, es, ls, ysk };
          return o.join('\n');
        },
        renvois: z => {
          const g = (V.compresse.dessin(z), G.compresse);
          return [
            { n: 1, rond: [z.l - 14, g.yl - 4], cible: [g.cx + g.ll / 2 - 8, g.yl + g.el / 2], texte: 'linge de coton chaud, essoré' },
            { n: 2, rond: [z.l - 14, g.yb - g.rl - 8], cible: [g.xb1 - 10, g.yb - g.rl + 6], texte: 'bouteille chaude, linge sec' },
            { n: 3, rond: [z.l - 14, g.ys - 2], cible: [g.cx + g.ls / 2 - 16, g.ys + g.es / 2], texte: 'serviette par-dessus' },
          ];
        },
      },

      // ─── 2. tenir la bosse, viser ──────────────────────────────────────────────────────
      tenir: {
        titre: '2. Tenir la bosse, viser le centre mou',
        dessin: z => {
          const k = 1.1, bx = z.l * 0.40, by = z.h * 0.52, o = [];
          const T = p => [bx + p[0] * k, by + p[1] * k];
          // la peau vue de dessus : un morceau, bords en trait de coupure
          const x0 = 8, x1 = z.l - 8, y0 = by - 78 * k, y1 = by + 78 * k;
          o.push(h.rect(x0, y0, x1 - x0, y1 - y0, A.blanc.replace('stroke="#000000"', 'stroke="none"')));
          o.push(coupure(x0, y0, x1, y0), coupure(x0, y1, x1, y1), coupure(x0, y0, x0, y1), coupure(x1, y0, x1, y1));
          // la bosse : son bord, un cerne de rougeur, le centre mou en tireté
          o.push(h.ellipse(bx, by, 30 * k, 22 * k, A.arete));
          o.push(h.ellipse(bx, by, 36 * k, 27 * k, A.fin + ' stroke-dasharray="1.5 3"'));
          o.push(h.ellipse(bx, by, 11 * k, 7.5 * k, A.cache));
          // la main droite à plat sur la peau, vue du dos, qui vient de la droite :
          // l'index au-dessus de la bosse, le pouce dessous, les autres doigts repliés sous l'index
          const W = (a, b, c, d) => [[a, b], [b, c], [c, d]];
          const wI = W(9.5, 8.2, 7.2, 6.2), wP = W(12.5, 11.5, 10.5, 9);
          const ptsI = [[80, -46], [18, -40], [-4, -37], [-22, -33]];
          const ptsP = [[96, 4], [56, 34], [30, 40], [8, 38]];
          const repl = [[[66, -28], [46, -25]], [[68, -14], [50, -12]], [[66, 0], [54, 1]]];
          const paume = I.lisse([[58, -50], [110, -50], [150, -40], [(x1 - bx) / k, -36], [(x1 - bx) / k, 34], [140, 28], [110, 16], [96, 16], [74, 14], [56, 8], [40, -10], [42, -30]], true);
          const pieces = [{ remp: paume, trait: [I.lisse([[80, -55], [110, -50], [150, -40], [(x1 - bx) / k, -36]]), I.lisse([[(x1 - bx) / k, 34], [140, 28], [110, 16], [96, 16], [74, 14]])], det: [] }];
          for (const [i, r] of repl.entries()) pieces.push(I.tube({ pts: r, sens: 1, dos: [[8.2 - i * 0.5, 7.6 - i * 0.5]], ventre: [[8.2 - i * 0.5, 7.6 - i * 0.5]], bout: 'phalange', base: 14 }));
          pieces.push(I.tube({ pts: ptsI, sens: 1, dos: wI, ventre: wI, coussin: [-0.15, -0.1, 0.15], bout: 'rond', ongle: 'dessus', base: 16, rides: [{ j: 1, n: 2, l: 0.5 }, { j: 2, n: 1, l: 0.45 }] }));
          pieces.push(I.tube({ pts: ptsP, sens: 1, dos: wP, ventre: wP, coussin: [0, -0.3, 0.3], bout: 'rond', ongle: 'dessus', base: 16, rides: [{ j: 2, n: 2, l: 0.5 }] }));
          pieces.push({ remp: null, trait: [I.lisse([[28, -49.2], [80, -55.4]])], det: [], silhouette: false });
          o.push(I.peindre(pieces, T));
          // la peau tendue : de petits plis devant les bouts des doigts, qui tirent vers l'extérieur
          for (const [cx0, cy0, sy] of [[-30, -40, -1], [0, 46, 1]]) {
            for (const [dx, dy, l] of [[-6, 0, 7], [0, 2, 9], [6, 0, 7]]) {
              const p0 = T([cx0 + dx, cy0 + sy * dy]), p1 = T([cx0 + dx * 1.3, cy0 + sy * (dy + l)]);
              o.push(`<path d="M ${f(p0[0])} ${f(p0[1])} L ${f(p1[0])} ${f(p1[1])}" ${A.fin}/>`);
            }
          }
          // le grand axe, et le trait : sur la peau entre le pouce et l'index
          o.push(`<path d="M ${f(bx + 26 * k)} ${f(by)} L ${f(bx - 42 * k)} ${f(by)}" ${A.fin} stroke-dasharray="8 3 2 3"/>`);
          o.push(h.fleche(`M ${f(bx + 11 * k)} ${f(by)} L ${f(bx - 11 * k)} ${f(by)}`, A.contour));
          G.tenir = { bx, by, k };
          return o.join('\n');
        },
        renvois: z => {
          const { bx, by, k } = (V.tenir.dessin(z), G.tenir);
          return [
            { n: 4, rond: [24, by - 50 * k], cible: [bx - 29 * k, by - 6 * k], texte: 'bord senti tout autour' },
            { n: 5, rond: [bx - 20 * k, by + 66 * k], cible: [bx - 4 * k, by + 5 * k], texte: 'le centre mou' },
            { n: 6, rond: [24, by + 30 * k], cible: [bx - 12 * k, by], texte: 'le trait, dans le grand axe' },
            { n: 7, rond: [z.l - 18, by - 68 * k], cible: [bx + 120 * k, by - 10 * k], texte: 'l’autre main tient la bosse' },
          ];
        },
      },

      // ─── 3. la lame droite, un seul trait ──────────────────────────────────────────────
      lame: {
        titre: '3. Un seul trait, la lame droite',
        dessin: z => {
          const k = 2.3, cx = z.l / 2, ys = z.h - 44;
          const c = coupe({ cx, ys, k, x0: 6, x1: z.l - 6, yb: z.h - 4, cloisons: 'entieres' });
          const s = 11 * k, tx = cx - s, ty = c.yH(cx - s) + 3.5 * k;
          const o = [c.svg];
          o.push(couteau(tx + 2 * s, ty, k, true));
          o.push(couteau(tx, ty, k));
          // l'équerre : la lame droite sur la peau
          const yp = c.yS(tx), e = 9;
          o.push(`<path d="${D([[tx - e, yp], [tx - e, yp - e], [tx, yp - e]])}" ${A.detail}/>`);
          // le trait, d'un seul coup
          const yf = yp - 15 * k;
          o.push(h.fleche(`M ${f(tx + 7 * k + 4)} ${f(yf)} L ${f(tx + 2 * s - 4)} ${f(yf)}`));
          G.lame = { c, tx, ty, s, k, cx, ys, yp };
          return o.join('\n');
        },
        renvois: z => {
          const { c, tx, k, cx, yp } = (V.lame.dessin(z), G.lame);
          return [
            { n: 8, rond: [z.l - 14, yp - 70], cible: [tx + 5 * k, yp - 16 * k], texte: 'lame neuve ou bouillie' },
            { n: 9, rond: [16, c.cy + 6 * k], cible: [cx - 15 * k, c.cy], texte: 'pus, juste sous la peau' },
            { n: 10, rond: [z.l - 16, c.cy + 6 * k], cible: [c.xc[1] + 0.4 * k, c.cy + 3 * k], texte: 'cloison : une loge fermée' },
          ];
        },
      },

      // ─── 4. le doigt défait les cloisons ──────────────────────────────────────────────
      doigt: {
        titre: '4. Le doigt défait les cloisons',
        dessin: z => {
          const k = 2.3, cx = z.l / 2, ys = z.h - 44;
          const c = coupe({ cx, ys, k, x0: 6, x1: z.l - 6, yb: z.h - 4, ouvert: 11 * k, cloisons: 'rompues' });
          const T3 = [cx - 6 * k, c.cy + 1 * k];
          const dir = a => [-Math.sin(a * RAD), Math.cos(a * RAD)];
          const d3 = dir(20), d2 = dir(38), d1 = dir(50);
          const P2 = [T3[0] - 21 * k * d3[0], T3[1] - 21 * k * d3[1]];
          const P1 = [P2[0] - 25 * k * d2[0], P2[1] - 25 * k * d2[1]];
          const lp = Math.min((z.l - P1[0]) / -d1[0], P1[1] / d1[1]);
          const P0 = [P1[0] - lp * d1[0], P1[1] - lp * d1[1]];
          const o = [c.svg, doigt([P0, P1, P2, T3], k)];
          // le doigt continue hors de la vue : un trait de coupure en travers
          const nb = [d1[1], -d1[0]], e0 = 19 * k;
          o.push(coupure(P0[0] - nb[0] * e0 * 0.44, P0[1] - nb[1] * e0 * 0.44, P0[0] + nb[0] * e0 * 0.56, P0[1] + nb[1] * e0 * 0.56));
          // le bout du doigt balaie la poche d'un bord à l'autre
          const yA = c.cy + 6.6 * k;
          o.push(h.fleche(`M ${f(cx + 1 * k)} ${f(yA)} Q ${f(cx + 10 * k)} ${f(yA + 0.4 * k)} ${f(cx + 16.5 * k)} ${f(c.cy + 2.5 * k)}`));
          G.doigt = { c, k, cx, P1, P2 };
          return o.join('\n');
        },
        renvois: z => {
          const { c, k, cx, P1 } = (V.doigt.dessin(z), G.doigt);
          return [
            { n: 11, rond: [z.l - 14, 20], cible: [P1[0] + 5 * k, P1[1] - 20 * k], texte: 'doigt ganté ou lavé au savon' },
            { n: 12, rond: [16, c.cy + 6 * k], cible: [cx - 16 * k, c.cy + 3 * k], texte: 'une seule poche' },
          ];
        },
      },

      // ─── 5. rincer à la bouteille percée ──────────────────────────────────────────────
      rincer: {
        titre: '5. Rincer à l’eau bouillie',
        dessin: z => {
          const k = 1.3, cx = z.l * 0.36, ys = z.h - 40;
          const c = coupe({ cx, ys, k, x0: 6, x1: z.l - 6, yb: z.h - 4, ouvert: 11 * k, cloisons: 'aucune' });
          const q = [cx + 22 * k, c.yS(cx) - 46 * k], ang = 32;
          const b = bouteille(q[0], q[1], k, ang, 118);
          const o = [c.svg, b.svg];
          // le trou du bouchon, le jet jusqu'au fond de la poche
          o.push(h.cercle(q[0], q[1], 1.3, A.plein));
          o.push(h.fleche(`M ${f(q[0] - 2)} ${f(q[1] + 3)} Q ${f(cx + 2 * k)} ${f(c.cy - 16 * k)} ${f(cx - 2 * k)} ${f(c.cy + 2 * k)}`, A.cache));
          // l'eau et le pus ressortent par les lèvres
          const yl = c.yS(cx - 11 * k);
          o.push(h.fleche(`M ${f(cx - 10 * k)} ${f(yl - 2)} Q ${f(cx - 17 * k)} ${f(yl - 5 * k)} ${f(cx - 24 * k)} ${f(c.yS(cx - 24 * k) - 2 * k)}`, A.cache));
          // la main serre : deux flèches sur les flancs
          const pA = b.T([-31, -88]), pB = b.T([31, -88]), nA = b.T([-44, -88]), nB = b.T([44, -88]);
          o.push(h.fleche(`M ${f(nA[0])} ${f(nA[1])} L ${f(pA[0] + (nA[0] - pA[0]) * 0.25)} ${f(pA[1] + (nA[1] - pA[1]) * 0.25)}`));
          o.push(h.fleche(`M ${f(nB[0])} ${f(nB[1])} L ${f(pB[0] + (nB[0] - pB[0]) * 0.25)} ${f(pB[1] + (nB[1] - pB[1]) * 0.25)}`));
          G.rincer = { c, k, cx, q, b };
          return o.join('\n');
        },
        renvois: z => {
          const { c, k, cx, b } = (V.rincer.dessin(z), G.rincer);
          const pE = b.T([-18, -75]);
          return [
            { n: 13, rond: [16, 22], cible: pE, texte: 'bouteille au bouchon percé' },
            { n: 14, rond: [16, c.cy - 24 * k], cible: [cx - 17 * k, c.yS(cx - 17 * k) - 5 * k], texte: 'l’eau ressort avec le pus' },
          ];
        },
      },
    },
    danger: 'Danger — on n’ouvre jamais le devant ou le côté du cou, le centre du visage, la bouche ou la gorge, la main, le tour de l’anus, le sein, le pli de l’aine, ni un abcès sur un os ou une articulation, ni un gros abcès, ni chez un enfant. Si le doigt sent battre un pouls au fond, ou touche l’os, il ressort.',
  };
};
