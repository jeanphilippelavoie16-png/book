// 90-04 — L'essai de la languette (ch. 90, §3 « La gomme est une colle qu'on règle » ;
// §5-B, étapes 6, 8 et 9).
// Aucune cote : le chapitre ne donne ni la taille de la languette ni la durée des trempes.
// La gomme, au charbon, est noire : elle est en aplat noir partout.
// Les mains sont au trait fin, sans détail : l'objet, c'est la languette.

module.exports = (h) => {
  const BL = h.a.blanc.match(/fill="([^"]+)"/)[1];
  const blancA = h.a.arete.replace(/stroke="[^"]+"/, `stroke="${BL}"`);
  const blancD = h.a.detail.replace(/stroke="[^"]+"/, `stroke="${BL}"`);
  const f = n => Math.round(n * 10) / 10;

  // Repère local : origine (ox, oy), échelle s, miroir en x, rotation ang (radians).
  const rep = (ox, oy, s = 1, mir = false, ang = 0) => {
    const c = Math.cos(ang), sn = Math.sin(ang);
    return (x, y) => { const X = (mir ? -x : x) * s, Y = y * s; return [ox + X * c - Y * sn, oy + X * sn + Y * c]; };
  };
  const P = (T, cmds) => cmds.map(([op, ...v]) => {
    if (op === 'Z') return 'Z';
    const o = [];
    for (let i = 0; i < v.length; i += 2) { const [x, y] = T(v[i], v[i + 1]); o.push(`${f(x)} ${f(y)}`); }
    return `${op} ${o.join(' ')}`;
  }).join(' ');

  // Un poing vu du côté du pouce, qui serre une languette. Repère local : la languette passe
  // en x = 0 (largeur ±6), le pouce est en haut (y < 0), l'avant-bras part vers +x.
  function poing(T, bras = 95) {
    const B = bras;
    const main = [['M', -8, -21], ['Q', -16, -15, -10, -8], ['Q', -16, -2, -10, 4], ['Q', -15, 10, -9, 15],
      ['Q', -13, 21, -6, 25], ['Q', 7, 31, 21, 26], ['Q', 31, 22, 39, 19], ['L', B, 19],
      ['Q', B + 6, 10, B, 2], ['Q', B - 6, -6, B, -15], ['L', 39, -15], ['Q', 27, -20, 17, -25],
      ['Q', 5, -29, -8, -21], ['Z']];
    const pouce = [['M', 25, -17], ['C', 13, -14, 1, -14, -7, -17], ['Q', -13, -20, -10, -25],
      ['C', -1, -30, 13, -30, 27, -26]];
    const o = [];
    const dm = P(T, main);
    o.push(h.path(dm, h.a.blanc), h.path(dm, h.a.arete));
    const dp = P(T, pouce);
    o.push(h.path(dp + ' Z', h.a.blanc), h.path(dp, h.a.arete));
    [[['M', -10, -8], ['Q', -4, -7, 1, -9]], [['M', -10, 4], ['Q', -4, 5, 1, 3]],
      [['M', -9, 15], ['Q', -3, 16, 1, 14]], [['M', 4, -13], ['Q', 9, 4, 7, 22]],
      [['M', -8, -23], ['Q', -4, -21, -1, -25.5]]]
      .forEach(c => o.push(h.path(P(T, c), h.a.detail)));
    return o.join('\n');
  }

  // Un pouce seul, vu de côté. Repère local : le bout en (0, 0), l'axe vers +x, l'ongle en
  // haut (y < 0), la pulpe en bas (y > 0). colle : la gomme reste sur la pulpe.
  function pouce(T, colle) {
    const L = 84;
    const bord = [['M', L, -12], ['L', 24, -12], ['C', 6, -12, -2, -6, 0, 3], ['C', 2, 11, 12, 13, 26, 12], ['L', L, 12]];
    const casse = [['M', L, 12], ['Q', L + 6, 4, L, 0], ['Q', L - 6, -4, L, -12]];
    const o = [];
    o.push(h.path(P(T, bord.concat(casse.slice(1))) + ' Z', h.a.blanc));
    if (colle) o.push(h.path(P(T, [['M', 0.5, 5], ['C', 3, 11.5, 12, 13.5, 23, 12.6], ['L', 22, 9],
      ['C', 16, 10, 12, 8, 8, 9.5], ['C', 5, 9, 3, 7, 0.5, 5], ['Z']]), h.a.plein));
    o.push(h.path(P(T, bord), h.a.arete));
    o.push(h.path(P(T, casse), h.a.detail));
    o.push(h.path(P(T, [['M', 3, -7], ['Q', 10, -11, 20, -10.5], ['L', 21, -12]]), h.a.detail));
    o.push(h.path(P(T, [['M', 40, 12], ['Q', 38, 8, 41, 4]]), h.a.detail));
    return o.join('\n');
  }

  // Languette vue de face, verticale : bout déchiré en haut, gomme noire de yG au bout.
  // yG = null : pas de gomme. w : demi-largeur.
  function languetteFace(x, yH, yB, yG, w, bout) {
    const o = [];
    const zig = `M ${x - w} ${yH + 2} L ${x - w / 3} ${yH - 1} L ${x + w / 3} ${yH + 2.5} L ${x + w} ${yH}`;
    const bas = yG === null ? yB : yG;
    const d = `${zig} L ${x + w} ${bas} L ${x - w} ${bas} Z`;
    o.push(h.path(d, h.a.blanc), h.path(d, h.a.contour));
    // Le fil de l'écorce, dans la longueur.
    const Lg = bas - yH;
    if (Lg > 20) {
      o.push(h.ligne(f(x - w * 0.35), yH + 7, f(x - w * 0.35), f(yH + 7 + (Lg - 12) * 0.5), h.a.detail));
      o.push(h.ligne(f(x + w * 0.3), f(yH + 4 + Lg * 0.38), f(x + w * 0.3), bas - 4, h.a.detail));
    }
    if (yG !== null) {
      const g = `M ${x - w - 1.5} ${yG} L ${x + w + 1.5} ${yG} L ${x + w + 1.5} ${yB} ` +
        (bout ? `Q ${x + w} ${yB + 7} ${x} ${yB + 8} Q ${x - w} ${yB + 7} ${x - w - 1.5} ${yB} Z` : 'Z');
      o.push(h.path(g, h.a.plein));
    }
    return o.join('\n');
  }

  // ─── A : tremper dans la gomme ───────────────────────────────────────────────────────
  function geomA(z) {
    const sx = Math.round(z.l * 0.42), yTop = 6, Yf = yTop + 46;
    const yb = z.h - 29, yGr = z.h - 14, yt = Yf + 27 + 16, cw = 40, cx = sx + 6;
    const yg = Math.round(yb - (yb - yt) * 0.62);
    return { sx, yTop, Yf, yb, yGr, yt, cw, yg, cx };
  }
  function vueA(z) {
    const { sx, yTop, Yf, yb, yGr, yt, cw, yg, cx } = geomA(z);
    const o = [];
    // Le sol et les braises.
    o.push(h.rect(cx - cw - 34, yGr, 2 * cw + 68, 9, h.a.hachure('terre', 'aucun')));
    o.push(h.ligne(cx - cw - 34, yGr, cx + cw + 34, yGr, h.a.arete));
    // Des charbons anguleux, une couche sous la boîte, un tas contre chaque flanc.
    let sd = 11;
    const rnd = () => (sd = (sd * 9301 + 49297) % 233280) / 233280;
    const charbon = (bx, by, r) => {
      const pts = [], a0 = rnd();
      for (let k = 0; k < 6; k++) {
        const a = a0 + k * Math.PI / 3, rr = r * (0.8 + rnd() * 0.3);
        pts.push([f(bx + Math.cos(a) * rr), f(by + Math.sin(a) * rr * 0.7)]);
      }
      o.push(h.chemin(pts, h.a.plein, true), h.chemin(pts, blancD, true));
      const k = Math.floor(rnd() * 6);
      o.push(h.ligne(pts[k][0], pts[k][1], f(bx + (rnd() - 0.5) * r * 0.6), f(by + (rnd() - 0.5) * r * 0.4), blancD));
    };
    for (let x = cx - cw - 16; x <= cx + cw + 17; x += 13) charbon(x, yGr - 7, 9);
    [[-8, -16, 7.5], [-21, -14, 7], [-5, -26, 6], [-15, -24, 5.5]].forEach(([dx, dy, r]) => {
      charbon(cx - cw + dx, yGr + dy, r);
      charbon(cx + cw - dx, yGr + dy + 1, r);
    });
    // La boîte, en coupe, posée sur les braises ; la gomme fondue dedans.
    o.push(h.rect(cx - cw + 1, yb - 2, 2 * cw - 2, 2, h.a.blanc));
    o.push(h.rect(cx - cw, yg, 2 * cw, yb - yg, h.a.plein));
    // Languette : sèche au-dessus de la gomme, trempée dessous (trait blanc sur le noir).
    o.push(languetteFace(sx, yTop, yg, null, 6));
    o.push(h.path(`M ${sx - 6} ${yg} V ${yb - 10} H ${sx + 6} V ${yg}`, blancA));
    o.push(h.chemin([[cx - cw, yt - 3], [cx - cw, yb], [cx + cw, yb], [cx + cw, yt - 3]], h.a.contour));
    o.push(h.ligne(cx - cw - 3, yt - 3, cx - cw, yt - 3, h.a.contour));
    o.push(h.ligne(cx + cw, yt - 3, cx + cw + 3, yt - 3, h.a.contour));
    // La main.
    o.push(poing(rep(sx, Yf, 1), 92));
    return o.join('\n');
  }

  // ─── B : dans l'eau froide du lac ────────────────────────────────────────────────────
  function geomB(z) {
    const sx = Math.round(z.l * 0.38), yTop = 6, Yf = yTop + 46, wl = Yf + 27 + 24;
    return { sx, yTop, Yf, wl, yCoat: wl - 8, yTip: wl + 44 };
  }
  function vueB(z) {
    const { sx, yTop, Yf, wl, yCoat, yTip } = geomB(z);
    const o = [];
    const A1 = [z.l * 0.66, z.h - 6], A2 = [z.l * 0.8, wl], A3 = [z.l * 0.87, wl - 20], A4 = [z.l - 4, wl - 23];
    const eau = [[6, wl], A2, A1, [6, z.h - 6]];
    o.push(h.chemin(eau, h.a.hachure('eau', 'aucun'), true));
    const rive = [A1, A2, A3, A4, [z.l - 4, z.h - 6]];
    o.push(h.chemin(rive, h.a.hachure('gravier', 'aucun'), true));
    o.push(h.chemin([A1, A2, A3, A4], h.a.arete));
    o.push(h.ligne(6, wl, A2[0], wl, h.a.arete));
    // Languette : la gomme toute sous l'eau.
    o.push(h.rect(sx - 8, wl + 1, 16, yTip - wl + 10, h.a.blanc));
    o.push(languetteFace(sx, yTop, yTip, yCoat, 6, true));
    // Rides à la surface.
    [[-1, 12], [1, 12], [-1, 22], [1, 22]].forEach(([s, r]) => o.push(h.path(
      `M ${f(sx + s * 9)} ${wl - 1} Q ${f(sx + s * (9 + r / 2))} ${wl - 4} ${f(sx + s * (9 + r))} ${wl - 1}`, h.a.detail)));
    o.push(poing(rep(sx, Yf, 1), 92));
    return o.join('\n');
  }

  // ─── C et D : plier ──────────────────────────────────────────────────────────────────
  const EB = 3, EG = 3.8;   // demi-épaisseur de l'écorce, épaisseur de la gomme
  function geomPli(z) {
    const s = 0.85, cx = Math.round(z.l / 2), y0 = z.h - 42, rx = 62, xl = cx - rx, xr = cx + rx;
    const yv = y0 - Math.round(30 * s) - 8;
    const ry = Math.min(yv - 12, 80);
    return { s, cx, y0, rx, ry, xl, xr, yv, bas: y0 + Math.round(27 * s) + 12 };
  }
  function centre(G) {
    const pts = [], n1 = 8, n2 = 64;
    for (let i = 0; i <= n1; i++) pts.push({ x: G.xl, y: G.bas + (G.yv - G.bas) * i / n1, nx: -1, ny: 0 });
    for (let i = 1; i < n2; i++) {
      const t = Math.PI * (1 - i / n2), c = Math.cos(t), sn = Math.sin(t);
      const nx = c / G.rx, ny = -sn / G.ry, L = Math.hypot(nx, ny);
      pts.push({ x: G.cx + G.rx * c, y: G.yv - G.ry * sn, nx: nx / L, ny: ny / L, t });
    }
    for (let i = 0; i <= n1; i++) pts.push({ x: G.xr, y: G.yv + (G.bas - G.yv) * i / n1, nx: 1, ny: 0 });
    return { pts, i0: n1 };
  }
  const bande = (pts, a, b, i0, i1) => {
    const A = [], B = [];
    for (let i = i0; i <= i1; i++) { const p = pts[i]; A.push([f(p.x + p.nx * a), f(p.y + p.ny * a)]); B.push([f(p.x + p.nx * b), f(p.y + p.ny * b)]); }
    return A.concat(B.reverse());
  };
  const fentesT = [0.84, 0.74, 0.63, 0.52, 0.42, 0.31, 0.2];
  function fente(pts, t) {
    let k = 0;
    pts.forEach((p, i) => { if (p.t !== undefined && Math.abs(p.t - Math.PI * t) < Math.abs((pts[k].t ?? 99) - Math.PI * t)) k = i; });
    return pts[k];
  }
  function vuePli(z, fend) {
    const G = geomPli(z);
    const { pts, i0 } = centre(G);
    const N = pts.length - 1;
    const o = [];
    const ec = bande(pts, -EB, EB, 0, N);
    o.push(h.chemin(ec, h.a.blanc, true), h.chemin(ec, h.a.arete, true));
    o.push(h.chemin(bande(pts, EB, EB + EG, i0, N), h.a.plein, true));
    o.push(h.chemin(bande(pts, -EB - EG, -EB, i0, N), h.a.plein, true));
    o.push(h.rect(G.xr - EB - EG, G.bas - 1, 2 * (EB + EG), 4, h.a.plein));
    if (fend) {
      fentesT.forEach((t, j) => {
        const p = fente(pts, t), tx = -p.ny, ty = p.nx, w = 1.5 + (j % 3) * 0.45;
        const out = EB + EG + 0.8;
        o.push(h.chemin([[f(p.x + p.nx * out + tx * w), f(p.y + p.ny * out + ty * w)],
          [f(p.x + p.nx * (EB + 0.1)), f(p.y + p.ny * (EB + 0.1))],
          [f(p.x + p.nx * out - tx * w), f(p.y + p.ny * out - ty * w)]], h.a.blanc, true));
      });
    }
    o.push(poing(rep(G.xl, G.y0, G.s, true), 64));
    o.push(poing(rep(G.xr, G.y0, G.s, false), 64));
    return o.join('\n');
  }

  // ─── E : tenir dans la main ──────────────────────────────────────────────────────────
  function vueE(z) {
    const s = 1.15, sx = Math.round(z.l * 0.26), Yf = Math.round(z.h * 0.5);
    const o = [];
    const yH = Yf - Math.round(29 * s) - 24, yF = Yf + Math.round(27 * s);
    o.push(languetteFace(sx, yH, yF + 20, Yf, 6.5, true));
    o.push(poing(rep(sx, Yf, s), 70));
    return o.join('\n');
  }

  // ─── F et G : frotter du pouce ───────────────────────────────────────────────────────
  // La languette de chant, à plat : l'écorce entre deux couches de gomme, le bout sec tenu
  // dans le poing, le pouce de l'autre main frotte la gomme puis se lève.
  function geomFrot(z) {
    const ys = Math.round(z.h * 0.62), xp = 34, xc = 74, xe = z.l - 8, tx = Math.round(z.l * 0.6);
    return { ys, xp, xc, xe, tx, ty: ys - EB - EG - 20 };
  }
  function vueFrot(z, colle) {
    const { ys, xp, xc, xe, tx, ty } = geomFrot(z);
    const o = [];
    const e = h.rect(xp, ys - EB, xe - xp, 2 * EB, h.a.blanc);
    o.push(e, h.rect(xp, ys - EB, xe - xp, 2 * EB, h.a.arete));
    // Gomme dessous, sur toute la partie trempée, et au bout.
    o.push(h.rect(xc, ys + EB, xe - xc, EG, h.a.plein));
    o.push(h.path(`M ${xe} ${ys - EB - EG} Q ${xe + 5} ${ys} ${xe} ${ys + EB + EG} Z`, h.a.plein));
    // Gomme dessus : partie au frottement quand elle est trop grasse.
    const x1 = tx - 30, x2 = tx - 6;
    if (colle) {
      o.push(h.rect(xc, ys - EB - EG, x1 - xc, EG, h.a.plein));
      o.push(h.rect(x2, ys - EB - EG, xe - x2, EG, h.a.plein));
      // La gomme roulée au bord de la plaque frottée.
      o.push(h.path(`M ${x1} ${ys - EB} Q ${x1 + 1} ${ys - EB - 7} ${x1 + 6} ${ys - EB - 5} Q ${x1 + 9} ${ys - EB - 2} ${x1 + 7} ${ys - EB} Z`, h.a.plein));
      o.push(h.path(`M ${x2} ${ys - EB - EG} Q ${x2 - 5} ${ys - EB - 4} ${x2 - 3} ${ys - EB} L ${x2} ${ys - EB} Z`, h.a.plein));
      o.push(h.ellipse(x1 + 13, ys - EB - 2, 2.2, 1.8, h.a.plein));
    } else {
      o.push(h.rect(xc, ys - EB - EG, xe - xc, EG, h.a.plein));
    }
    // Le poing tient le bout sec ; le pouce vers la gomme, l'avant-bras vers le bas.
    o.push(poing(rep(xp + 12, ys, 0.8, false, Math.PI / 2), 58));
    // Le pouce de l'autre main, levé au-dessus de la gomme.
    const ang = -40 * Math.PI / 180;
    const T = rep(tx, ty, 1, false, ang);
    if (colle) {
      // Les fils de gomme, de la pulpe à la languette.
      [[2, 7, -5, -3], [7, 10.5, -2, -1.5], [12, 12.2, 1, 1], [18, 12.8, 4, 2.5]].forEach(([lx, ly, dx, b]) => {
        const [px, py] = T(lx, ly);
        const qx = px + dx, qy = ys - EB - EG + 0.5, mx = (px + qx) / 2 + b, my = (py + qy) / 2;
        o.push(h.path(`M ${f(px - 1.4)} ${f(py)} Q ${f(mx - 0.4)} ${f(my)} ${f(qx - 2.2)} ${f(qy)} L ${f(qx + 2.2)} ${f(qy)} Q ${f(mx + 0.4)} ${f(my)} ${f(px + 1.4)} ${f(py)} Z`, h.a.plein));
      });
    }
    o.push(pouce(T, colle));
    // Le va-et-vient du frottement.
    const ya = ty - 8, xa = tx - 64, xb = tx - 20;
    o.push(h.fleche(`M ${xa + 14} ${ya} H ${xb}`, h.a.detail));
    o.push(h.fleche(`M ${xb - 14} ${ya} H ${xa}`, h.a.detail));
    return o.join('\n');
  }

  return {
    ref: '90-04',
    titre: 'L’essai de la languette',
    desc: 'Le réglage de la gomme à canot. Une languette d’écorce trempée dans la gomme fondue sur les braises, sans flamme, puis dans l’eau froide du lac où le canot va naviguer. Pliée à deux mains : si la gomme fend sur le dessus du pli, elle est trop cassante, on ajoute du gras. Si elle ne fend pas, on la tient dans la main quelques instants, puis on la frotte du pouce : si elle colle au doigt ou part en frottant, elle est trop grasse, on ajoute de la gomme ou on la recuit. Ni fendue ni collante, elle est prête.',
    format: 'pleine',
    disposition: [['a', 'b'], ['c', 'd'], ['e', 'f', 'g']],
    hauteurs: [1.05, 0.95, 0.95],
    largeurs: [[1, 1], [1, 1], [0.8, 1.1, 1.1]],
    vues: {
      a: {
        titre: 'Tremper dans la gomme chaude',
        dessin: z => vueA(z),
        renvois: z => {
          const G = geomA(z);
          return [
            { n: 1, rond: [G.sx - 70, G.Yf + 34], cible: [G.sx - 6, G.Yf + 34], texte: 'languette d’écorce' },
            { n: 2, rond: [G.cx - G.cw - 34, G.yg + 2], cible: [G.cx - G.cw + 12, G.yg + 14], texte: 'gomme trempée, fondue' },
            { n: 3, rond: [G.cx + G.cw + 44, G.yGr - 30], cible: [G.cx + G.cw + 16, G.yGr - 8], texte: 'braises, jamais de flamme' },
          ];
        },
      },
      b: {
        titre: 'Puis dans l’eau froide du lac',
        dessin: z => vueB(z),
        renvois: z => {
          const G = geomB(z);
          return [
            { n: 4, rond: [G.sx - 70, G.wl - 26], cible: [G.sx - 40, G.wl + 26], texte: 'eau du lac, pas celle du chaudron' },
          ];
        },
      },
      c: {
        titre: 'Pliée : elle fend',
        dessin: z => vuePli(z, true),
        renvois: z => {
          const G = geomPli(z);
          const p = fente(centre(G).pts, 0.31);
          return [
            { n: 5, rond: [G.xr + 44, G.yv - G.ry + 6], cible: [f(p.x + p.nx * (EB + 2)), f(p.y + p.ny * (EB + 2))], texte: 'fend : ajouter du gras, refaire l’essai' },
          ];
        },
      },
      d: {
        titre: 'Pliée : elle ne fend pas',
        dessin: z => vuePli(z, false),
        renvois: z => {
          const G = geomPli(z);
          const p = fente(centre(G).pts, 0.31);
          return [
            { n: 6, rond: [G.xr + 44, G.yv - G.ry + 6], cible: [f(p.x + p.nx * (EB + 2)), f(p.y + p.ny * (EB + 2))], texte: 'gomme entière : la tenir en main' },
          ];
        },
      },
      e: {
        titre: 'La tenir dans la main',
        dessin: z => vueE(z),
        renvois: () => [],
      },
      f: {
        titre: 'Elle colle ou part en frottant',
        dessin: z => vueFrot(z, true),
        renvois: z => {
          const G = geomFrot(z);
          return [
            { n: 7, rond: [G.tx - 14, G.ys + 34], cible: [G.tx + 11, G.ys - 15], texte: 'colle : ajouter de la gomme ou recuire' },
          ];
        },
      },
      g: {
        titre: 'Ni fendue ni collante',
        dessin: z => vueFrot(z, false),
        renvois: z => {
          const G = geomFrot(z);
          return [
            { n: 8, rond: [G.tx - 14, G.ys + 34], cible: [G.tx + 9, G.ty + 5], texte: 'rien au doigt : prête' },
          ];
        },
      },
    },
  };
};
