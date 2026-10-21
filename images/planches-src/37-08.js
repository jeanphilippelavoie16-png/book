// Planche 37-08 — la cage à pierres sur le poêle de la tente d'hiver (ch. 37, « Le sauna dans la
// tente d'hiver » ; le poêle sur pieux et le rond de neige nue du ch. 12, section 5-D).
//
// Ce que le chapitre dit, et rien de plus : une petite cage de treillis, pas galvanisé, remplie
// de pierres éprouvées, au-dessus du poêle de tôle ; elle ne repose pas sur la tôle mince du
// dessus ; ses pattes portent sur deux traverses de fer liées d'un pieu à l'autre, jamais dans la
// neige, qui fond sous le poêle ; les pierres restent sur le poêle, pas autour du tuyau ; le rond
// de neige nue autour du poêle reste nu, le sapinage loin.
//
// La lecture qui fait tenir le montage : les pieux sont aux quatre coins, sur la ligne des flancs
// du poêle, qui pose sur leur moitié intérieure ; la traverse couche sur leur moitié extérieure,
// liée au fil. Chaque patte est un fer plié en U renversé : debout sur une traverse, elle monte le
// long du flanc, passe au-dessus de la tôle et redescend sur l'autre traverse. Le fond de la cage
// pose sur les deux U, sans ligature qui travaille. Les traverses laissent placer la cage où on
// veut le long du poêle : elle s'arrête avant le tuyau.
//
// Aucune cote : le chapitre ne donne aucune mesure de la cage, du poêle ni des pieux. Les
// proportions sont celles d'un poêle de tente, au même rapport dans les trois vues alignées.
//
// La charte : de côté, la face de droite du tuyau à l'ombre ; par le bout, le tuyau, au fond du
// poêle derrière la cage, en gris loin. Pas de gris sur la neige ni sur le pieu coupés, ni sur le
// plan. Le rouge : le jour d'air entre la cage et la tôle (le point à contrôler) et le bord du rond
// de neige nue, où le sapinage prendrait feu (la zone).

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blanc = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const tige = 'fill="none" stroke="#1A1A1A" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"';
  const fil = 'fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"';

  // ─── Géométrie commune, en mètres. x le long du poêle depuis la porte, y en travers, z vers le
  // haut depuis le plancher de neige foulée.
  const G = {
    L: 0.62, B: 0.18, zb: 0.30, zt: 0.64,           // le poêle
    D: 0.40, sol: 0.07,                              // neige jusqu'au sol, bande de sol dessinée
    rs: 0.045, xs: [0.03, 0.59],                     // pieux : rayon, position le long du poêle
    rt: 0.009, yt: 0.205, xt: [-0.045, 0.665],       // traverses : rayon, écart du milieu, bouts
    xp: [0.10, 0.37], zc: 0.705,                     // pattes en U : où, hauteur du dessus
    cage: { x0: 0.05, x1: 0.42, y: 0.19, z0: 0.711, z1: 0.891 },
    tuyau: { x: 0.525, r: 0.055, haut: 1.04 },
    rond: { x: 0.2, rx: 0.62, ry: 0.42 },            // le rond de neige nue
    creux: { x0: -0.03, x1: 0.65, y: 0.27, p: 0.16 },// la neige fondue sous le poêle
  };
  const K = 200;                                     // px par mètre, dans les trois vues alignées
  const XR = [-0.78, 1.0], ZR = [-0.47, 1.08];

  // Repères : la vue de côté et la vue de dessus partagent X ; la vue de côté et la vue du bout
  // partagent Y.
  const Xc = z => x => (z.l - (XR[1] - XR[0]) * K) / 2 + (x - XR[0]) * K;
  const Zc = z => zz => (z.h - (ZR[1] - ZR[0]) * K) / 2 + (ZR[1] - zz) * K;

  // ─── Hasard fixe, pour que les pierres et le sapinage soient les mêmes à chaque rendu.
  let graine = 11;
  const alea = () => { graine = (graine * 16807) % 2147483647; return (graine - 1) / 2147483646; };

  // Une pierre : un caillou irrégulier, à coins émoussés, blanc dedans.
  const caillou = (cx, cy, rx, ry) => {
    const n = 6 + Math.floor(alea() * 3), p = [], rot = alea() * Math.PI;
    for (let i = 0; i < n; i++) {
      const t = rot + i * 2 * Math.PI / n + (alea() - 0.5) * 0.7, q = 0.74 + alea() * 0.3;
      p.push([cx + Math.cos(t) * rx * q, cy + Math.sin(t) * ry * q]);
    }
    const lerp = (a, b, u) => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
    const a0 = lerp(p[n - 1], p[0], 0.7);
    let d = `M ${f(a0[0])} ${f(a0[1])}`;
    for (let i = 0; i < n; i++) {
      const nx = p[(i + 1) % n], e1 = lerp(p[i], nx, 0.3), e2 = lerp(p[i], nx, 0.7);
      d += ` Q ${f(p[i][0])} ${f(p[i][1])} ${f(e1[0])} ${f(e1[1])} L ${f(e2[0])} ${f(e2[1])}`;
    }
    return h.path(d + ' Z', blanc(h.a.detail));
  };
  // Un rang de pierres de largeurs inégales, de x0 à x1, centré sur yc.
  const rang = (x0, x1, yc, d, ht) => {
    const out = [];
    let x = x0;
    while (x < x1 - 0.45 * d) {
      let w = d * (0.7 + alea() * 0.6);
      if (x + w > x1 || x1 - (x + w) < 0.45 * d) w = x1 - x;
      const hh = ht * (0.75 + alea() * 0.35);
      out.push(caillou(x + w / 2, yc + (alea() - 0.5) * ht * 0.2, w * 0.54, hh * 0.54));
      x += w * 0.94;
    }
    return out.join('\n');
  };
  // Le tas vu de côté : des rangs, les grosses en bas, les petites en haut.
  const tas = (x0, x1, yb, rangs) => {
    const out = [];
    let y = yb;
    for (const r of rangs) {
      out.push(rang(x0, x1, y - r.ht / 2, r.d, r.ht));
      y -= r.ht * 0.88;
    }
    return out.join('\n');
  };
  // La cage de côté ou de bout : les pierres, puis le treillis par-dessus, qui les laisse voir.
  const cage = (x0, x1, yh, yb) => [
    tas(x0 + 1, x1 - 1, yb - 0.5, [{ d: 18, ht: 15 }, { d: 14, ht: 12 }, { d: 10, ht: 10 }]),
    h.rect(x0, yh, x1 - x0, yb - yh, h.a.hachure('grillage', 'arete')),
  ].join('\n');

  // Le tuyau montant, coupé en haut par un trait brisé.
  // teinte : 'ombre' (la face de droite à l'ombre) ou 'loin' (le tuyau entier recule).
  const tuyauMontant = (xc, r, yBas, yHaut, teinte) => [
    h.rect(xc - r, yHaut, 2 * r, yBas - yHaut, h.a.blanc),
    teinte === 'ombre' ? h.chemin([[xc + 0.3 * r, yHaut - 1], [xc + r / 2, yHaut - 3], [xc + r, yHaut], [xc + r, yBas], [xc + 0.3 * r, yBas]], h.a.ombre, true) : '',
    teinte === 'loin' ? h.chemin([[xc - r, yHaut], [xc - r / 2, yHaut - 3], [xc, yHaut + 2], [xc + r / 2, yHaut - 3], [xc + r, yHaut], [xc + r, yBas], [xc - r, yBas]], h.a.loin, true) : '',
    h.ligne(xc - r, yBas, xc - r, yHaut, h.a.arete),
    h.ligne(xc + r, yBas, xc + r, yHaut, h.a.arete),
    h.path(`M ${f(xc - r)} ${f(yHaut)} L ${f(xc - r / 2)} ${f(yHaut - 3)} L ${f(xc)} ${f(yHaut + 2)} L ${f(xc + r / 2)} ${f(yHaut - 3)} L ${f(xc + r)} ${f(yHaut)}`, h.a.detail),
  ].join('\n');

  // Le sapinage en coupe (comme à la 12-01a) : branches couchées, pointe dans le sens d.
  const sapinageCoupe = (x1, x2, yb, t, d) => {
    const w = 3.2 * t, p = 0.42 * w, out = [];
    const deb = d < 0 ? x2 : x1, fin = d < 0 ? x1 : x2;
    for (let xs = deb; d < 0 ? xs - w * 0.8 >= fin - 1 : xs + w * 0.8 <= fin + 1; xs += d * p) {
      const xe = xs + d * w;
      out.push(h.path(`M ${f(xs)} ${f(yb + 1.5)} C ${f(xs + d * w * 0.15)} ${f(yb - t * 1.25)} ${f(xs + d * w * 0.55)} ${f(yb - t * 1.15)} ${f(xe)} ${f(yb - t * 0.25)}`, h.a.detail));
      const ai = [0.3, 0.5, 0.7].map(u => {
        const x = xs + d * w * u, y = yb - t * (1.05 - 0.4 * Math.abs(u - 0.45));
        return `M ${f(x)} ${f(y)} l ${f(d * 3)} ${f(2.2)}`;
      });
      out.push(h.path(ai.join(' '), h.a.fin));
    }
    return out.join('\n');
  };

  // Le sapinage vu de dessus (comme à la 12-02) : une branche, bout coupé en (x, y), pointe vers d.
  const U0 = 0.08;
  const larg = (u, w) => u <= U0 ? 0 : w * Math.sin(Math.PI * Math.pow((u - U0) / (1 - U0), 0.7));
  const branchePlan = (x, y, L, w, d) => {
    const n = 14, haut = [], bas = [];
    for (let i = 0; i <= n; i++) {
      const u = U0 + (1 - U0) * i / n;
      haut.push([x + d * u * L, y - larg(u, w)]);
      bas.unshift([x + d * u * L, y + larg(u, w)]);
    }
    const out = [h.chemin(haut.concat(bas), blanc(h.a.detail), true)];
    out.push(h.path(`M ${f(x)} ${f(y)} L ${f(x + d * 0.9 * L)} ${f(y)}`, h.a.detail));
    const ai = [];
    for (const t of [0.24, 0.38, 0.52, 0.66, 0.8]) {
      const u2 = t + 0.12, dy = 0.78 * larg(u2, w);
      ai.push(`M ${f(x + d * u2 * L)} ${f(y - dy)} L ${f(x + d * t * L)} ${f(y)} L ${f(x + d * u2 * L)} ${f(y + dy)}`);
    }
    out.push(h.path(ai.join(' '), h.a.fin));
    return out.join('\n');
  };
  // Les rangs en écailles : chaque rang posé couvre le pied du suivant.
  const tapis = (x0, x1, y0, y1, d) => {
    const L = 58, w = 12, s = 36, p = 20, rangs = [];
    for (let k = 0; ; k++) {
      const xb = x0 + d * k * s;
      if (d > 0 ? xb > x1 + 0.2 * L : xb < x1 - 0.2 * L) break;
      const col = [];
      for (let j = -1; ; j++) {
        const y = y0 + (j + (k % 2) * 0.5) * p;
        if (y > y1 + p) break;
        col.push(branchePlan(xb, y, L, w, d));
      }
      rangs.push(col.join('\n'));
    }
    return rangs.reverse().join('\n');
  };

  return {
    ref: '37-08',
    titre: 'La cage à pierres dans la tente d’hiver',
    desc: 'Le poêle de tôle de la tente d’hiver, posé sur quatre pieux verts plantés à travers la neige jusqu’au sol, porte au-dessus de lui une petite cage de treillis pleine de pierres. De côté, la neige coupée : une traverse de fer de chaque côté du poêle, couchée sur la tête des pieux et liée au fil de fer, d’un pieu à l’autre ; deux pattes de fer plié en U, debout sur les traverses, passent au-dessus du poêle et portent le fond de la cage, avec un jour d’air entre la cage et la tôle du dessus ; la cage s’arrête avant le tuyau, qui reste dégagé. Par le bout de la porte : les deux pieux, le poêle posé sur leur moitié intérieure, les traverses sur leur moitié extérieure, la patte en U, et la neige qui fond en creux sous le poêle, où rien ne s’appuie. Vu de dessus : le rond de neige nue autour du poêle et devant sa porte, le sapinage en écailles au-delà. De près, de côté, le poêle enlevé : la traverse liée sur la tête du pieu au fil de fer doublé et tordu, en croix, et la patte debout sur la traverse à côté du pieu.',
    format: 'pleine',
    disposition: [['cote', 'bout'], ['plan', 'detail']],
    hauteurs: [16, 10],
    largeurs: [[9, 5], [9, 5]],
    vues: {
      // ─── De côté, la neige coupée devant les pieux.
      cote: {
        titre: 'De côté, la neige coupée',
        dessin: z => {
          const X = Xc(z), Y = Zc(z), out = [];
          const xa = XR[0] + 0.01, xb = XR[1] - 0.01, c = G.creux;
          // Sol, neige, et le creux que le poêle fait fondre sous lui.
          out.push(h.rect(X(xa), Y(-G.D), (xb - xa) * K, G.sol * K, h.a.hachure('terre', 'aucun')));
          out.push(h.ligne(X(xa), Y(-G.D), X(xb), Y(-G.D), h.a.arete));
          const surf = `M ${f(X(xa))} ${f(Y(0))} L ${f(X(c.x0))} ${f(Y(0))} C ${f(X(c.x0 + 0.1))} ${f(Y(-c.p))} ${f(X(c.x1 - 0.1))} ${f(Y(-c.p))} ${f(X(c.x1))} ${f(Y(0))} L ${f(X(xb))} ${f(Y(0))}`;
          out.push(h.path(`${surf} L ${f(X(xb))} ${f(Y(-G.D))} L ${f(X(xa))} ${f(Y(-G.D))} Z`, h.a.hachure('neige', 'aucun')));
          out.push(h.path(surf, h.a.arete));
          // Le sapinage, hors du rond nu.
          const r0 = G.rond.x - G.rond.rx, r1 = G.rond.x + G.rond.rx;
          out.push(sapinageCoupe(X(xa), X(r0 - 0.02), Y(0), 12, -1));
          out.push(sapinageCoupe(X(r1 + 0.02), X(xb), Y(0), 12, -1));
          // Les pieux, jusqu'au sol.
          for (const xs of G.xs) {
            out.push(h.rect(X(xs - G.rs), Y(G.zb), 2 * G.rs * K, (G.zb + G.D) * K, h.a.blanc));
            out.push(h.rect(X(xs - G.rs), Y(G.zb), 2 * G.rs * K, (G.zb + G.D) * K, h.a.hachure('bois')));
          }
          // Le poêle : caisse, bord du dessus, poignée de la porte, collet du tuyau.
          out.push(h.rect(X(0), Y(G.zt), G.L * K, (G.zt - G.zb) * K, blanc(h.a.contour)));
          out.push(h.ligne(X(0), Y(G.zt - 0.015), X(G.L), Y(G.zt - 0.015), h.a.detail));
          out.push(h.ligne(X(0), Y(0.47), X(-0.03), Y(0.47), h.a.arete));
          out.push(h.ligne(X(-0.03), Y(0.44), X(-0.03), Y(0.50), h.a.arete));
          const T = G.tuyau;
          out.push(tuyauMontant(X(T.x), T.r * K, Y(G.zt), Y(T.haut), 'ombre'));
          out.push(h.rect(X(T.x - T.r - 0.008), Y(G.zt + 0.035), (2 * T.r + 0.016) * K, 0.035 * K, blanc(h.a.arete)));
          out.push(h.ligne(X(T.x - T.r - 0.004), Y(0.93), X(T.x + T.r + 0.004), Y(0.93), h.a.detail));
          // La traverse du côté qu'on voit, couchée sur la tête des pieux, et ses ligatures.
          out.push(h.rect(X(G.xt[0]), Y(G.zb + 2 * G.rt), (G.xt[1] - G.xt[0]) * K, 2 * G.rt * K, h.a.plein));
          for (const xs of G.xs) {
            out.push(h.path(`M ${f(X(xs - 0.03))} ${f(Y(G.zb + 0.03))} L ${f(X(xs + 0.03))} ${f(Y(G.zb - 0.035))} M ${f(X(xs + 0.03))} ${f(Y(G.zb + 0.03))} L ${f(X(xs - 0.03))} ${f(Y(G.zb - 0.035))}`, h.a.detail));
          }
          // Les pattes : debout sur la traverse, le dessus du U vu par le bout sous la cage.
          for (const xp of G.xp) {
            out.push(h.ligne(X(xp), Y(G.zb + 2 * G.rt), X(xp), Y(G.zc), tige));
          }
          // La cage et ses pierres.
          const C = G.cage;
          out.push(cage(X(C.x0), X(C.x1), Y(C.z1), Y(C.z0)));
          for (const xp of G.xp) out.push(h.cercle(X(xp), Y(G.zc), 2.4, h.a.plein));
          return out.join('\n');
        },
        renvois: z => {
          const X = Xc(z), Y = Zc(z), C = G.cage, T = G.tuyau;
          return [
            { n: 1, rond: [X(-0.3), Y(0.98)], cible: [X(C.x0 + 0.04), Y(0.84)], texte: 'cage, treillis non galvanisé' },
            { n: 2, rond: [X(0.82), Y(0.98)], cible: [X(T.x + T.r), Y(0.84)], texte: 'tuyau dégagé, sans pierres' },
            { n: 3, rond: [X(-0.36), Y(0.5)], cible: [X(G.xt[0] + 0.01), Y(G.zb + G.rt)], texte: 'traverse de fer sur les pieux' },
            { n: 4, rond: [X(0.86), Y(0.3)], cible: [X(G.xs[1] + G.rs), Y(0.17)], texte: 'pieu vert, jusqu’au sol' },
          ];
        },
      },

      // ─── Par le bout de la porte.
      bout: {
        titre: 'Par le bout de la porte',
        dessin: z => {
          const X = y => z.l / 2 + y * K, Y = Zc(z), out = [];
          const ya = -0.5, yb = 0.5, c = G.creux;
          out.push(h.rect(X(ya), Y(-G.D), (yb - ya) * K, G.sol * K, h.a.hachure('terre', 'aucun')));
          out.push(h.ligne(X(ya), Y(-G.D), X(yb), Y(-G.D), h.a.arete));
          const surf = `M ${f(X(ya))} ${f(Y(0))} L ${f(X(-c.y))} ${f(Y(0))} C ${f(X(-c.y + 0.08))} ${f(Y(-c.p))} ${f(X(c.y - 0.08))} ${f(Y(-c.p))} ${f(X(c.y))} ${f(Y(0))} L ${f(X(yb))} ${f(Y(0))}`;
          out.push(h.path(`${surf} L ${f(X(yb))} ${f(Y(-G.D))} L ${f(X(ya))} ${f(Y(-G.D))} Z`, h.a.hachure('neige', 'aucun')));
          out.push(h.path(surf, h.a.arete));
          // Le tuyau, derrière la cage.
          const T = G.tuyau;
          out.push(tuyauMontant(X(0), T.r * K, Y(G.cage.z1), Y(T.haut), 'loin'));
          // Les pieux.
          for (const s of [-1, 1]) {
            out.push(h.rect(X(s * G.B - G.rs), Y(G.zb), 2 * G.rs * K, (G.zb + G.D) * K, h.a.blanc));
            out.push(h.rect(X(s * G.B - G.rs), Y(G.zb), 2 * G.rs * K, (G.zb + G.D) * K, h.a.hachure('bois')));
          }
          // Le poêle, sa porte.
          out.push(h.rect(X(-G.B), Y(G.zt), 2 * G.B * K, (G.zt - G.zb) * K, blanc(h.a.contour)));
          out.push(h.rect(X(-0.1), Y(0.57), 0.2 * K, 0.2 * K, h.a.arete));
          out.push(h.ligne(X(0.05), Y(0.47), X(0.085), Y(0.47), h.a.arete));
          // Les traverses par le bout, sur la moitié extérieure des pieux, et leur ligature.
          for (const s of [-1, 1]) {
            out.push(h.cercle(X(s * G.yt), Y(G.zb + G.rt), 2.2, h.a.plein));
            out.push(h.cercle(X(s * G.yt), Y(G.zb + G.rt), 4, h.a.detail));
          }
          // La patte en U : debout sur une traverse, au-dessus de la tôle, sur l'autre traverse.
          const yu = G.yt, rb = 0.02;
          out.push(h.path(`M ${f(X(-yu))} ${f(Y(G.zb + 2 * G.rt))} L ${f(X(-yu))} ${f(Y(G.zc - rb))} Q ${f(X(-yu))} ${f(Y(G.zc))} ${f(X(-yu + rb))} ${f(Y(G.zc))} L ${f(X(yu - rb))} ${f(Y(G.zc))} Q ${f(X(yu))} ${f(Y(G.zc))} ${f(X(yu))} ${f(Y(G.zc - rb))} L ${f(X(yu))} ${f(Y(G.zb + 2 * G.rt))}`, tige));
          // La cage.
          const C = G.cage;
          out.push(cage(X(-C.y), X(C.y), Y(C.z1), Y(C.z0)));
          // le point à contrôler : le jour d'air entre le fond de la cage et la tôle du dessus
          out.push(h.controle(X(0.05), Y((G.zt + C.z0) / 2), 13));
          return out.join('\n');
        },
        renvois: z => {
          const X = y => z.l / 2 + y * K, Y = Zc(z);
          return [
            { n: 5, rond: [X(-0.4), Y(0.8)], cible: [X(-0.12), Y((G.zt + G.cage.z0) / 2)], texte: 'jour d’air : la tôle ne porte rien' },
            { n: 6, rond: [X(0.4), Y(0.55)], cible: [X(G.yt), Y(0.5)], texte: 'patte en U sur les traverses' },
            { n: 7, rond: [X(0), Y(-0.29)], cible: [X(0), Y(-0.125)], texte: 'neige fondue : rien n’y porte' },
          ];
        },
      },

      // ─── Vu de dessus.
      plan: {
        titre: 'Vu de dessus',
        dessin: z => {
          const X = Xc(z), Y = y => z.h / 2 + y * K, out = [];
          // Le sapinage partout, découpé au bord de la vue, puis le rond nu par-dessus.
          out.push(`<defs><clipPath id="c-37-08-plan"><rect x="0" y="0" width="${f(z.l)}" height="${f(z.h)}"/></clipPath></defs>`);
          out.push(`<g clip-path="url(#c-37-08-plan)">`);
          out.push(tapis(z.l + 30, -30, -10, z.h + 10, -1));
          out.push('</g>');
          out.push(h.ellipse(X(G.rond.x), Y(0), G.rond.rx * K, G.rond.ry * K, h.a.blanc));
          out.push(h.ellipse(X(G.rond.x), Y(0), G.rond.rx * K - 3, G.rond.ry * K - 3, h.a.zone));   // la zone : le sapinage n'y entre pas
          // Les pieux, sous les coins du poêle.
          for (const xs of G.xs) for (const s of [-1, 1]) {
            out.push(h.cercle(X(xs), Y(s * G.B), G.rs * K, h.a.blanc));
            out.push(h.cercle(X(xs), Y(s * G.B), G.rs * K, h.a.hachure('bois')));
          }
          // Le poêle et la poignée de sa porte.
          out.push(h.rect(X(0), Y(-G.B), G.L * K, 2 * G.B * K, blanc(h.a.contour)));
          out.push(h.ligne(X(0), Y(0.05), X(-0.03), Y(0.05), h.a.arete));
          // Les traverses et leurs ligatures.
          for (const s of [-1, 1]) {
            out.push(h.rect(X(G.xt[0]), Y(s * G.yt - G.rt), (G.xt[1] - G.xt[0]) * K, 2 * G.rt * K, h.a.plein));
            for (const xs of G.xs) out.push(h.path(`M ${f(X(xs - 0.025))} ${f(Y(s * G.yt) - 5)} L ${f(X(xs + 0.025))} ${f(Y(s * G.yt) + 5)} M ${f(X(xs + 0.025))} ${f(Y(s * G.yt) - 5)} L ${f(X(xs - 0.025))} ${f(Y(s * G.yt) + 5)}`, h.a.detail));
          }
          // Le dessus des U, qui dépasse à peine la cage de chaque côté.
          for (const xp of G.xp) out.push(h.ligne(X(xp), Y(-G.yt), X(xp), Y(G.yt), tige));
          // La cage pleine, vue d'en haut : le bord, et les petites pierres du dessus.
          const C = G.cage;
          out.push(h.rect(X(C.x0), Y(-C.y), (C.x1 - C.x0) * K, 2 * C.y * K, blanc(h.a.arete)));
          for (let yy = Y(-C.y) + 1, j = 0; yy < Y(C.y) - 5; j++) {
            const ht = 10 + alea() * 4;
            out.push(rang(X(C.x0) + 1, X(C.x1) - 1, yy + ht / 2, 12, ht));
            yy += ht * 0.9;
          }
          out.push(h.rect(X(C.x0), Y(-C.y), (C.x1 - C.x0) * K, 2 * C.y * K, h.a.arete));
          // Le tuyau, par le haut.
          const T = G.tuyau;
          out.push(h.cercle(X(T.x), Y(0), T.r * K, blanc(h.a.arete)));
          out.push(h.cercle(X(T.x), Y(0), T.r * K - 2.2, h.a.detail));
          return out.join('\n');
        },
        renvois: z => {
          const X = Xc(z), Y = y => z.h / 2 + y * K;
          return [
            { n: 8, rond: [X(-0.24), Y(0.2)], cible: [X(-0.1), Y(0.07)], texte: 'rond de neige nue' },
            { n: 9, rond: [X(0.93), Y(0.2)], cible: [X(0.88), Y(0.05)], texte: 'sapinage, loin du poêle' },
          ];
        },
      },

      // ─── De près : la tête du pieu de devant, de côté.
      detail: {
        titre: 'De près, de côté, le poêle enlevé',
        dessin: z => {
          const k2 = Math.min((z.l - 10) / 0.22, (z.h - 8) / 0.195);
          const X = x => (z.l - 0.22 * k2) / 2 + (x + 0.07) * k2;
          const Y = zz => (z.h - 0.195 * k2) / 2 + (G.zb + 0.085 - zz) * k2;
          const out = [], zb = G.zb, xs = G.xs[0], rs = G.rs;
          const bas = zb - 0.1;
          // Le poêle est enlevé : sa face se confondait avec les fers. On ne garde que le pieu de
          // devant, la traverse couchée sur sa tête, et la première patte.
          // Le pieu, coupé en bas par un trait brisé.
          const brise = `L ${f(X(xs + rs))} ${f(Y(bas))} L ${f(X(xs + rs * 0.4))} ${f(Y(bas + 0.008))} L ${f(X(xs - rs * 0.2))} ${f(Y(bas - 0.006))} L ${f(X(xs - rs))} ${f(Y(bas + 0.004))}`;
          const pieu = `M ${f(X(xs - rs))} ${f(Y(zb))} L ${f(X(xs + rs))} ${f(Y(zb))} ${brise} Z`;
          out.push(h.path(pieu, h.a.blanc));
          out.push(h.path(pieu, h.a.hachure('bois')));
          // La traverse, couchée sur la tête du pieu, son bout à gauche.
          const t0 = Y(zb + 2 * G.rt), t1 = Y(zb);
          out.push(h.rect(X(G.xt[0]), t0, X(0.15) - X(G.xt[0]), t1 - t0, blanc(h.a.arete)));
          out.push(h.ligne(X(G.xt[0]) + 3, t0 + (t1 - t0) * 0.32, X(0.15), t0 + (t1 - t0) * 0.32, h.a.fin));
          // La ligature en croix : fil doublé, par-dessus la traverse, autour du pieu, et la queue tordue.
          const lx0 = xs - rs + 0.006, lx1 = xs + rs - 0.006, lh = zb + 2 * G.rt + 0.002, lb = zb - 0.05;
          const brin = (a, b, o) => h.ligne(X(a[0]) + o, Y(a[1]), X(b[0]) + o, Y(b[1]), fil);
          const tir = 'fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-linecap="round" stroke-dasharray="2.5 2"';
          for (const o of [-1.4, 1.4]) {
            out.push(brin([lx0, lh], [lx1, lb], o));
            out.push(brin([lx1, lh], [lx0, lb], o));
            // Chaque branche franchit l'arête du haut et repart derrière la traverse.
            for (const [a, d] of [[lx0, -1], [lx1, 1]]) {
              out.push(h.path(`M ${f(X(a) + o)} ${f(Y(lh))} Q ${f(X(a + d * 0.004) + o)} ${f(Y(lh) - 3)} ${f(X(a + d * 0.008) + o)} ${f(Y(lh))}`, fil));
              out.push(h.path(`M ${f(X(a + d * 0.008) + o)} ${f(Y(lh))} L ${f(X(a + d * 0.012) + o)} ${f(Y(zb - 0.004))}`, tir));
            }
          }
          // Les tours autour du pieu, en fil doublé : un peu bombés vers le bas.
          for (const dz of [0.007, 0, -0.007]) for (const o of [-1.2, 1.2]) {
            const yy = Y(lb + dz) + o;
            out.push(h.path(`M ${f(X(xs - rs) - 1.5)} ${f(yy - 1.5)} Q ${f(X(xs))} ${f(yy + 4)} ${f(X(xs + rs) + 1.5)} ${f(yy - 1.5)}`, fil));
          }
          // La queue tordue : un bout vient de l'X, l'autre du dernier tour, roulés l'un sur l'autre.
          const qx = X(xs + rs) + 5, qy = Y(lb) + 4, tw = [];
          for (let i = 0; i <= 12; i++) {
            const u = i / 12, px = qx + u * 16, py = qy + u * 16, o = 2.2 * Math.sin(u * Math.PI * 3);
            tw.push([px + o * 0.707, py - o * 0.707, px - o * 0.707, py + o * 0.707]);
          }
          out.push(h.path(`M ${f(X(lx1) + 1.4)} ${f(Y(lb))} Q ${f(qx)} ${f(Y(lb))} ` + tw.map(t => `${f(t[0])} ${f(t[1])}`).join(' L '), fil));
          const fy = Y(lb - 0.007) + 1.2 - 1.5;
          out.push(h.path(`M ${f(X(xs + rs) + 1.5)} ${f(fy)} Q ${f(qx - 1)} ${f(fy + 1)} ` + tw.map(t => `${f(t[2])} ${f(t[3])}`).join(' L '), fil));
          // La patte debout sur la traverse, à côté du pieu ; le fond de la cage la tient, sans ligature.
          const xp = G.xp[0], rr = 0.006;
          out.push(h.rect(X(xp - rr), Y(zb + 0.085), 2 * rr * k2, Y(zb + 2 * G.rt) - Y(zb + 0.085), blanc(h.a.arete)));
          return out.join('\n');
        },
        renvois: z => {
          const k2 = Math.min((z.l - 10) / 0.22, (z.h - 8) / 0.195);
          const X = x => (z.l - 0.22 * k2) / 2 + (x + 0.07) * k2;
          const Y = zz => (z.h - 0.195 * k2) / 2 + (G.zb + 0.085 - zz) * k2;
          return [
            { n: 10, rond: [X(-0.045), Y(G.zb - 0.07)], cible: [X(G.xs[0] - 0.005), Y(G.zb - 0.028)], texte: 'fil de fer doublé et tordu' },
          ];
        },
      },
    },
    danger: 'Danger — les pattes ne vont jamais dans la neige : elle fond sous le poêle, et la cage penche contre lui ou contre la toile. Une tente de nylon ne fait pas de sauna : le nylon fond là où la toile roussit.',
  };
};
