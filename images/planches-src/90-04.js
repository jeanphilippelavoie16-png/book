// 90-04 — L'essai de la languette (ch. 90, §3 « La gomme est une colle qu'on règle » ;
// §5-B, étapes 6, 8 et 9).
// Aucune cote : le chapitre ne donne ni la taille de la languette ni la durée des trempes.
// La gomme, au charbon, est noire : elle est en aplat noir partout.
// Les mains sont des mains simples (mains/moteur.js, 14 oct.) : le poing (prise-manche vue côté paume,
// penchée de 25°) fermé sur la languette, qui entre par le haut du poing et ressort par le bas, derrière
// les doigts ; pour frotter, l'index de l'autre main (appui-index, de profil) au lieu de la pince calquée.
// La charte : la languette pliée au contour 2,4, le va-et-vient du frottement (le geste) en rouge.

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

  // Les mains simples (mains/moteur.js). poser : l'angle qui met l'axe de la prise sur `axe` (degrés à
  // l'écran) et l'avant-bras du côté de `vers`.
  const F = h.formes;
  const poser = (o, axe, vers) => {
    const base = Object.assign({}, o, { angle: 0, avantbras: { longueur: 100 } }); delete base.objet;
    const e0 = F.mainSimple(base); let best = null;
    for (const k of [0, 180]) {
      const a = axe - e0.prise.angle + k, m = F.mainSimple(Object.assign({}, base, { angle: a }));
      const d = [m.coude[0] - m.poignet[0], m.coude[1] - m.poignet[1]], v = [vers[0] - m.poignet[0], vers[1] - m.poignet[1]];
      const c = (d[0] * v[0] + d[1] * v[1]) / ((Math.hypot(d[0], d[1]) * Math.hypot(v[0], v[1])) || 1);
      if (!best || c > best.c) best = { a, c };
    }
    return best.a;
  };
  // Le poing qui serre la languette (prise-manche, vue côté paume) : x, y au milieu de la prise ; e : la
  // main en unités par mm ; larg : la largeur vue de la languette dans le poing (unités) ; axe : la
  // languette à l'écran (90 : debout) ; vers : où part l'avant-bras (court, coupé) ; objet : la languette
  // repeinte par le moteur entre les couches (les doigts devant, la paume derrière).
  const poing = (x, y, e, { cote = 'droite', axe = 90, vers, larg = 12, objet } = {}) => {
    const o = { x, y, pose: 'prise-manche', vue: 'paume', cote, echelle: e, diametre: larg / e, rotation: [-25, 0, 0] };
    return F.mainSimple({ ...o, angle: poser(o, axe, vers), objet, avantbras: { vers } }).svg;
  };
  // un morceau du dessin, découpé à un rectangle (pour qu'une main ne repeigne que sa part de la languette)
  let nClip = 0;
  const decoupe = (svg, x0, y0, x1, y1) => { const id = `lang-9004-${++nClip}`; return `<clipPath id="${id}"><rect x="${f(x0)}" y="${f(y0)}" width="${f(x1 - x0)}" height="${f(y1 - y0)}"/></clipPath><g clip-path="url(#${id})">${svg}</g>`; };

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
    // La main, sur le bout sec de la languette.
    o.push(poing(sx, Yf, 0.54, { vers: [sx + 600, Yf], objet: languetteFace(sx, yTop, yg, null, 6) }));
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
    o.push(poing(sx, Yf, 0.54, { vers: [sx + 600, Yf], objet: decoupe(languetteFace(sx, yTop, yTip, yCoat, 6, true), sx - 20, 0, sx + 20, wl - 2) }));
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
    o.push(h.chemin(ec, h.a.blanc, true), h.chemin(ec, h.a.contour, true));
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
    // les deux poings sur les deux bouts, les avant-bras qui partent chacun de son côté ; chaque main ne
    // repeint que son bout de languette
    const lang = o.join('\n'), yC = G.yv + 4;
    o.push(poing(G.xl, G.y0, 0.45, { cote: 'gauche', vers: [G.xl - 600, G.y0], larg: 2 * (EB + EG), objet: decoupe(lang, G.xl - 20, yC, G.xl + 20, G.bas + 20) }));
    o.push(poing(G.xr, G.y0, 0.45, { cote: 'droite', vers: [G.xr + 600, G.y0], larg: 2 * (EB + EG), objet: decoupe(lang, G.xr - 20, yC, G.xr + 20, G.bas + 20) }));
    return o.join('\n');
  }

  // ─── E : tenir dans la main ──────────────────────────────────────────────────────────
  function vueE(z) {
    const s = 0.62, sx = Math.round(z.l * 0.28), Yf = Math.round(z.h * 0.5);
    const o = [];
    // Le poing serre la partie gommée ; seul le bout d'écorce nue dépasse au-dessus du pouce.
    const yP = Yf - Math.round(40 * s), yH = yP - 18, yF = Yf + Math.round(44 * s);
    o.push(languetteFace(sx, yH, yF, yP + 2, 6, true));
    o.push(poing(sx, Yf, 0.55, { vers: [sx + 600, Yf], objet: languetteFace(sx, yH, yF, yP + 2, 6, true) }));
    return o.join('\n');
  }

  // ─── F et G : frotter du pouce ───────────────────────────────────────────────────────
  // La languette de chant, à plat : l'écorce entre deux couches de gomme, le bout sec tenu
  // dans le poing, le pouce de l'autre main frotte la gomme puis se lève.
  function geomFrot(z) {
    const ys = Math.round(z.h * 0.62), xp = 34, xc = 74, xe = z.l - 8, tx = Math.round(z.l * 0.6);
    return { ys, xp, xc, xe, tx, ty: ys - EB - EG - 12 };
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
    // Le poing tient le bout sec, l'avant-bras vers le bas.
    o.push(poing(xp + 14, ys, 0.43, { axe: 0, vers: [xp + 14, ys + 600], larg: 2 * EB, objet: h.rect(xp, ys - EB, xc - xp, 2 * EB, h.a.blanc) + h.rect(xp, ys - EB, xc - xp, 2 * EB, h.a.arete) }));
    // L'autre main, de profil, le bout du pouce contre le bout de l'index : c'est la pulpe du
    // pouce qui frotte la gomme, puis se lève.
    if (colle) {
      // Les fils de gomme, de la pulpe du pouce à la languette.
      [[-5, -6, -2], [-1.5, -2, -1], [2, 2, 1], [5.5, 6, 2]].forEach(([dx, qx, b]) => {
        const px = tx + dx, py = ty + 1, qy = ys - EB - EG + 0.5, X = tx + qx, mx = (px + X) / 2 + b, my = (py + qy) / 2;
        o.push(h.path(`M ${f(px - 1.2)} ${f(py)} Q ${f(mx - 0.4)} ${f(my)} ${f(X - 2)} ${f(qy)} L ${f(X + 2)} ${f(qy)} Q ${f(mx + 0.4)} ${f(my)} ${f(px + 1.2)} ${f(py)} Z`, h.a.plein));
      });
    }
    // l'autre main, de profil (main simple, appui-index vue du pouce) : le bout de l'index frotte la
    // gomme, puis se lève (le bas de sa pulpe à ty + 1, où partent les fils de gomme) ; l'avant-bras qui
    // remonte à droite, coupé au bord
    {
      const eI = 0.45, aI = 120, rP = 8 * eI;   // la pulpe de l'index, ~8 mm de rayon
      const bx = tx - Math.cos(aI * Math.PI / 180) * rP, by = ty + 1 - Math.sin(aI * Math.PI / 180) * rP;   // le bas de la pulpe à ty + 1
      o.push(F.mainSimple({ x: bx, y: by, ancre: 'bout', pose: 'appui-index', vue: 'pouce', cote: 'droite', echelle: eI,
        angle: aI, avantbras: { vers: [tx + 400, ty - 500], bord: { x0: 0, y0: 0, x1: z.l, y1: z.h } } }).svg);
    }
    if (colle) o.push(h.ellipse(tx, ty + 1.5, 4, 1.8, h.a.plein));   // la gomme restée sur la pulpe
    // Le va-et-vient du frottement, à gauche des doigts, parallèle à la languette.
    const ya = ty + 2, xa = tx - 44, xb = tx - 12;
    o.push(h.geste(`M ${xa} ${ya} H ${xb}`, { double: true }));          // le geste (charte : le rouge)
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
            { n: 7, rond: [G.tx - 14, G.ys + 34], cible: [G.tx + 2, G.ys - EB - EG - 5], texte: 'colle : ajouter de la gomme ou recuire' },
          ];
        },
      },
      g: {
        titre: 'Ni fendue ni collante',
        dessin: z => vueFrot(z, false),
        renvois: z => {
          const G = geomFrot(z);
          return [
            { n: 8, rond: [G.tx - 14, G.ys + 34], cible: [G.tx, G.ty + 2], texte: 'rien au doigt : prête' },
          ];
        },
      },
    },
  };
};
