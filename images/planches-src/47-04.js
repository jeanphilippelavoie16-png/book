// Planche 47-04 — La haie de saules à collets du lagopède (chapitre 47, « Les collets du lagopède »).
// Le chapitre dit : une haie mince de branches de saule plantées serré dans la neige, autour du
// bouquet où la bande mange, en laissant de petites ouvertures ; un collet dans chaque ouverture ;
// l'oiseau qui longe la haie passe par l'ouverture. Fil, boucle et œillet du collet à lièvre (ch. 48).
// Aucune mesure dans le chapitre : aucune cote. La vue du dehors et la coupe sont à la même échelle
// (même ligne de neige, même boucle) ; la vue de dessus est plus petite.
// L'attache n'est pas décrite : le fil est tourné sur la branche qui borde l'ouverture.
// Le lagopède de la coupe vient de _animaux.js (lagopede) : la silhouette du tétras du Canada de
// Fuertes (pl. 41), en blanc, les pieds emplumés ; la boucle est mise à la hauteur de son cou et à
// sa taille, dans les deux vues de près.
const A_ = require('./_animaux');

module.exports = (h) => {
  const r = (n) => Math.round(n * 10) / 10;
  let graine = 4704;
  const alea = () => { graine = (graine * 16807) % 2147483647; return (graine - 1) / 2147483646; };
  const entre = (a, b) => a + (b - a) * alea();
  const blanc = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');
  const neige = h.a.hachure('neige').replace(/stroke="[^"]*" stroke-width="[^"]*"/, 'stroke="none"');
  const trait = (x0, y0, x1, y1, at) => h.path(`M ${r(x0)} ${r(y0)} L ${r(x1)} ${r(y1)}`, at);
  // Une ellipse tournée, en chemin (pas de transform).
  const ovale = (cx, cy, a, b, ang, at) => {
    const c = Math.cos(ang), s = Math.sin(ang), pts = [];
    for (let i = 0; i < 20; i++) {
      const t = i / 20 * 2 * Math.PI, x = a * Math.cos(t), y = b * Math.sin(t);
      pts.push([r(cx + x * c - y * s), r(cy + x * s + y * c)]);
    }
    return h.chemin(pts, at, true);
  };
  // Le fil du collet : un brin à deux bords, par la bibliothèque.
  const fil = (pts, o = {}) => h.formes.corde(pts, { ep: 3, debut: 'coupe', fin: 'coupe', ...o });

  // ─── Vue de dessus ─────────────────────────────────────────────────────────────────────
  const C = [300, 178], RX = 200, RY = 132;
  const surAnneau = (t, d = 0) => {            // t en degrés ; d : décalage vers l'extérieur
    const a = t * Math.PI / 180;
    const p = [C[0] + RX * Math.cos(a), C[1] + RY * Math.sin(a)];
    const tg = [-RX * Math.sin(a), RY * Math.cos(a)], n = Math.hypot(tg[0], tg[1]);
    const u = [tg[0] / n, tg[1] / n], v = [u[1], -u[0]];
    return { p: [p[0] + v[0] * d, p[1] + v[1] * d], u, v };
  };
  const OUV = [20, 80, 140, 200, 260, 320];
  const DEMI = 12;

  const plan = (z) => {
    graine = 4704;
    const o = [];
    // Le bouquet de saules vu d'en haut : les pieds serrés au centre, les tiges qui s'écartent.
    const tiges = 24;
    for (let i = 0; i < tiges; i++) {
      const a = (i / tiges) * 2 * Math.PI + entre(-0.1, 0.1), L = entre(62, 92);
      const dx = Math.cos(a), dy = Math.sin(a), px = -dy, py = dx, cb = entre(-9, 9);
      const x0 = C[0] + dx * 8, y0 = C[1] + dy * 8, x1 = C[0] + dx * L, y1 = C[1] + dy * L;
      o.push(h.path(`M ${r(x0)} ${r(y0)} Q ${r((x0 + x1) / 2 + px * cb)} ${r((y0 + y1) / 2 + py * cb)} ${r(x1)} ${r(y1)}`, h.a.detail));
      [0.4, 0.62, 0.82].forEach((f, k) => {
        const s = k % 2 ? -1 : 1, b = a + s * entre(0.4, 0.7), l = entre(9, 20) * (1 - f * 0.4);
        const bx = C[0] + dx * L * f + px * cb * 0.45, by = C[1] + dy * L * f + py * cb * 0.45;
        o.push(trait(bx, by, bx + Math.cos(b) * l, by + Math.sin(b) * l, h.a.fin));
      });
    }
    [[0, 0, 4.2], [-7, -3, 3.4], [6, -6, 3.4], [7, 4, 3.6], [-4, 7, 3.2], [-9, 4, 2.8], [1, -9, 2.8]].forEach(([dx, dy, rr]) =>
      o.push(h.cercle(C[0] + dx, C[1] + dy, rr, blanc(h.a.arete))));

    // La haie : une rangée serrée de branches plantées, vues d'en haut, et leurs rameaux.
    const pts = [];
    let acc = 0, prev = surAnneau(0).p;
    for (let t = 0; t < 360; t += 0.5) {
      const q = surAnneau(t).p;
      acc += Math.hypot(q[0] - prev[0], q[1] - prev[1]); prev = q;
      if (acc >= 4.6) { acc = 0; pts.push(t); }
    }
    const lonDeg = (d) => d * Math.PI / 180 * ((RX + RY) / 2);
    const distOuv = (t) => Math.min(...OUV.map((c) => lonDeg(Math.abs(((t - c + 540) % 360) - 180))));
    pts.filter((t) => distOuv(t) > DEMI).forEach((t) => {
      const { p, u, v } = surAnneau(t, entre(-2.2, 2.2));
      const bord = distOuv(t) < DEMI + 6;       // la branche du bord : rien ne déborde dans l'ouverture
      [-1, 1].forEach((s) => {
        if (bord) return;
        const ang = Math.atan2(u[1], u[0]) + (s > 0 ? 0 : Math.PI) + entre(-0.8, 0.8), l = entre(5, 10);
        o.push(trait(p[0], p[1], p[0] + Math.cos(ang) * l, p[1] + Math.sin(ang) * l, h.a.fin));
      });
      const sr = alea() < 0.5 ? 1 : -1, lr = entre(3, 7);
      o.push(trait(p[0], p[1], p[0] + v[0] * sr * lr, p[1] + v[1] * sr * lr, h.a.fin));
      o.push(h.cercle(r(p[0]), r(p[1]), 1.7, h.a.plein));
    });

    // Un collet par ouverture : la boucle vue de chant, dans le plan de la haie, et son fil
    // tourné sur la branche du bord.
    OUV.forEach((t) => {
      const { p, u } = surAnneau(t);
      const a = [p[0] - u[0] * 6, p[1] - u[1] * 6], b = [p[0] + u[0] * 6, p[1] + u[1] * 6];
      const w = [p[0] - u[0] * (DEMI + 1.5), p[1] - u[1] * (DEMI + 1.5)];
      o.push(trait(w[0], w[1], a[0], a[1], h.a.arete));
      o.push(trait(a[0], a[1], b[0], b[1], h.a.contour.replace('stroke-linecap="butt"', '')));
    });

    // La piste : des empreintes rondes et floues qui arrivent, longent la haie par le dehors,
    // puis entrent par l'ouverture de 140° jusqu'au collet.
    const piste = [[258, z.h + 4], [262, z.h - 22]];
    for (let t = 100; t <= 134; t += 2) piste.push(surAnneau(t, 13).p);
    piste.push(surAnneau(137, 12).p, surAnneau(139, 9).p, surAnneau(140, 4).p, surAnneau(140, -1).p);
    const seg = [];
    for (let i = 1; i < piste.length; i++) seg.push([piste[i - 1], piste[i]]);
    const lg = seg.map(([a, b]) => Math.hypot(b[0] - a[0], b[1] - a[1]));
    const total = lg.reduce((s, x) => s + x, 0);
    const pt = (s) => {
      let k = 0;
      while (k < seg.length - 1 && s > lg[k]) { s -= lg[k]; k++; }
      const [a, b] = seg[k], f = Math.min(1, s / lg[k]);
      return { p: [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f], d: [(b[0] - a[0]) / lg[k], (b[1] - a[1]) / lg[k]] };
    };
    let cote = 1;
    for (let s = 10; s < total - 1; s += 10) {
      const { p, d } = pt(s), n = [-d[1], d[0]];
      o.push(ovale(p[0] + n[0] * 3.2 * cote, p[1] + n[1] * 3.2 * cote, 4.2, 3, Math.atan2(d[1], d[0]), h.a.detail));
      cote = -cote;
    }
    const fl = [];
    for (let t = 106; t <= 134; t += 1.5) fl.push(surAnneau(t, 28).p);
    fl.push(surAnneau(137, 24).p, surAnneau(139, 15).p, surAnneau(140, 3).p);
    o.push(h.fleche('M ' + fl.map((q) => `${r(q[0])} ${r(q[1])}`).join(' L '), h.a.arete));
    return o.join('\n');
  };

  // ─── Les vues de près : même échelle, même neige, même boucle ─────────────────────────
  // Le lagopède (_animaux.js, lagopede) fixe la hauteur de la boucle : elle est au cou de l'oiseau
  // qui marche, dans les deux vues. Il marche vers la droite, le cou dans le plan de la haie (XB).
  const NEIGE = 205, XB = 176, ECH = 0.31, PENCHE = 16;
  const essai = A_.lagopede(h, { x: 0, y: NEIGE, echelle: ECH, angle: PENCHE });
  const BY = Math.round(essai.cou[1]), BR = 13, XL = XB - essai.cou[0];

  // Une branche de saule plantée : tige effilée qui ondule, piquée dans la neige, rameaux qui
  // montent. interdit : [x0, x1] où aucun rameau ne doit entrer (l'ouverture).
  const branche = (x, haut, interdit = null, base = 3) => {
    const o = [], ond = entre(-4, 4), bas = NEIGE + 24;
    const X = (y) => x + ond * Math.sin((NEIGE - y) / (NEIGE - haut) * Math.PI * 0.9);
    const L = (y) => 0.4 + (base / 2 - 0.4) * Math.min(1, Math.max(0, (y - haut) / (NEIGE - haut)));
    const n = 6;
    for (let i = 0; i < n; i++) {
      let s = (i % 2 ? -1 : 1) * (alea() < 0.2 ? -1 : 1);
      const y0 = haut + 10 + i * ((NEIGE - haut - 40) / n) + entre(0, 8);
      const l = entre(16, 34) * (1 - i * 0.08), a = entre(0.3, 0.6);
      const x0 = X(y0);
      const bout = (sg) => [x0 + sg * Math.sin(a) * l, y0 - Math.cos(a) * l];
      if (interdit) {
        const x1 = bout(s)[0], dedans = (xx) => xx > interdit[0] && xx < interdit[1];
        if (dedans(x1) || (x0 < interdit[0] && x1 > interdit[1]) || (x0 > interdit[1] && x1 < interdit[0])) s = -s;
        if (dedans(bout(s)[0])) continue;
      }
      const [x1, y1] = bout(s);
      o.push(h.path(`M ${r(x0)} ${r(y0)} Q ${r(x0 + s * Math.sin(a) * l * 0.25)} ${r(y0 - l * 0.6)} ${r(x1)} ${r(y1)}`, h.a.detail));
      if (alea() < 0.5) {
        const f = 0.5, xm = x0 + (x1 - x0) * f, ym = y0 + (y1 - y0) * f, l2 = l * 0.4;
        const xe = xm - s * l2 * 0.25;
        if (!interdit || !(xe > interdit[0] && xe < interdit[1])) o.push(trait(xm, ym, xe, ym - l2, h.a.fin));
      }
    }
    const ys = []; for (let y = haut; y <= bas; y += 5) ys.push(y); ys.push(bas);
    const g = ys.map((y) => [r(X(y) - L(y)), r(y)]), d = ys.map((y) => [r(X(y) + L(y)), r(y)]).reverse();
    o.push(h.chemin(g.concat(d), h.a.plein, true));
    return o.join('\n');
  };

  const neigeSol = (z) => [
    h.rect(0, NEIGE, z.l, z.h - NEIGE, neige),
    h.ligne(0, NEIGE, z.l, NEIGE, h.a.contour),
  ].join('\n');

  // Les tours du fil sur la branche.
  const tours = (x, y) => [0, 1, 2].map((i) => fil([[x - 5, y + i * 3.4 + 1.5], [x + 5, y + i * 3.4 - 1.5]], { ep: 2.4 })).join('\n');

  const face = (z) => {
    graine = 911;
    const o = [neigeSol(z)];
    const cx = r(z.l / 2), g = cx - BR - 8, d = cx + BR + 8, gap = [g + 3, d - 3];
    for (let x = 6; x < z.l; x += 13) {
      const xx = x + entre(-2.5, 2.5);
      if (xx > g - 9 && xx < d + 9) continue;
      o.push(branche(xx, entre(30, 62), gap));
    }
    o.push(branche(g, 40, gap, 3.4));
    o.push(branche(d, 36, gap, 3.4));
    // Le collet : la boucle, l'œillet en haut, le fil qui monte vers la branche du bord.
    const top = BY - BR, wy = top - 14;
    const boucle = [];
    for (let i = 0; i <= 36; i++) {
      const t = -Math.PI / 2 + 0.12 + i / 36 * (2 * Math.PI - 0.24);
      boucle.push([r(cx + BR * Math.cos(t)), r(BY + BR * Math.sin(t))]);
    }
    o.push(h.chemin(boucle, h.a.contour));
    o.push(fil([[cx - 1, top - 1], [cx - 12, top - 6], [g + 2, wy + 3]]));
    o.push(h.cercle(cx, top - 1, 3.4, blanc(h.a.arete)));
    o.push(h.cercle(cx, top - 1, 1.2, h.a.plein));
    o.push(tours(g, wy));
    return o.join('\n');
  };

  // Le lagopède d'hiver, de profil, tourné vers la droite (_animaux.js) : tout blanc, les pieds
  // emplumés en raquettes. La tête a passé la boucle.
  const oiseau = () => A_.lagopede(h, { x: XL, y: NEIGE, echelle: ECH, angle: PENCHE }).svg;

  const passe = (z) => {
    graine = 3131;
    const o = [neigeSol(z)];
    const xb = XB;
    // Le bord de l'ouverture, derrière : la haie mince vue de son bout, qui file au loin.
    [[160, 44], [167, 36], [175, 48], [183, 40]].forEach(([x, y]) => o.push(branche(x, y, null, 3)));
    // La boucle vue de chant : la moitié du fond d'abord…
    const demi = (s) => { const q = []; for (let i = 0; i <= 16; i++) { const t = -Math.PI / 2 + i / 16 * Math.PI; q.push([r(xb + s * 3.5 * Math.cos(t)), r(BY + BR * Math.sin(t))]); } return q; };
    o.push(h.chemin(demi(-1), h.a.arete));
    o.push(oiseau());
    // … puis celle d'avant, par-dessus le cou.
    o.push(h.chemin(demi(1), h.a.contour));
    o.push(fil([[xb, BY - BR], [xb + 1, BY - BR - 12]]));
    o.push(h.cercle(xb, BY - BR - 1, 2.6, blanc(h.a.arete)));
    o.push(tours(xb + 2, BY - BR - 18));
    o.push(h.fleche(`M 206 ${NEIGE - 10} L 262 ${NEIGE - 10}`, h.a.arete));
    return o.join('\n');
  };

  return {
    ref: '47-04',
    titre: 'La haie de saules à collets du lagopède',
    desc: 'Vue de dessus : un bouquet de saules entouré d’une haie mince de branches plantées serré dans la neige, '
      + 'percée de six petites ouvertures, un collet dans chacune ; une piste d’empreintes rondes longe la haie par le dehors '
      + 'et entre par une ouverture jusqu’au collet. Vue du dehors : l’ouverture entre deux branches, la boucle qui la remplit, '
      + 'l’œillet en haut, le fil tourné sur la branche du bord. En coupe : le lagopède blanc, les pieds emplumés, passe la tête dans la boucle.',
    format: 'pleine',
    disposition: [['plan'], ['face', 'passe']],
    hauteurs: [3, 2],
    vues: {
      plan: {
        titre: 'Vue de dessus',
        dessin: plan,
        renvois: (z) => [
          { n: 1, rond: [C[0] + 40, 20], cible: [C[0] + 18, C[1] - 42], texte: 'le bouquet où la bande mange' },
          { n: 2, rond: [z.l - 34, 56], cible: surAnneau(350).p, texte: 'branches de saule plantées serré' },
          { n: 3, rond: [z.l - 20, C[1] + 92], cible: surAnneau(20, -4).p, texte: 'une petite ouverture' },
          { n: 4, rond: [z.l - 90, 18], cible: surAnneau(320).p, texte: 'un collet dans chaque ouverture' },
          { n: 5, rond: [96, z.h - 22], cible: surAnneau(118, 13).p, texte: 'la piste longe la haie et entre' },
        ],
      },
      face: {
        titre: 'Une ouverture, vue du dehors',
        dessin: face,
        renvois: (z) => [
          { n: 6, rond: [24, BY - BR - 40], cible: [z.l / 2 - BR - 8, BY - BR - 12], texte: 'le fil tourné sur la branche' },
          { n: 7, rond: [z.l - 22, BY + 40], cible: [z.l / 2 + BR, BY + 4], texte: 'la boucle, l’œillet en haut' },
        ],
      },
      passe: {
        titre: 'En coupe dans l’ouverture',
        dessin: passe,
        renvois: (z) => [
          { n: 8, rond: [XB - 70, BY - 42], cible: [XB - 3, BY - 8], texte: 'la tête passe, la boucle serre' },
        ],
      },
    },
  };
};
