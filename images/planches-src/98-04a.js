// Planche 98-04a — La planche paresseuse : la monter sur le gazon (chapitre 98, « La planche
// paresseuse : deux gestes de plus que le billon » ; le montage lui-même est le billon de varech du
// ch. 96 §9, étapes 1 à 4).
//
// Ce que les chapitres donnent, et rien d'autre :
//   ch. 98 : planches de 0,9 à 2,1 m ; tranchées de 46 à 91 cm de large, 30 à 50 cm de profond ;
//            morceaux de semence posés à 23-25 cm SUR le fumier ou le varech.
//   ch. 96 : sol non retourné (mousse, herbe, gazon) ; varech rincé, fumier composté s'il y en a ;
//            les mottes tirées des rigoles à la bêche, posées à l'envers, l'herbe en dessous.
// Le ch. 96 pose le varech par-dessus les morceaux ; le ch. 98, les morceaux sur le varech. La planche
// suit le ch. 98, dont elle relève.
// Dessinée à 1000 mm de planche et 500 mm de tranchée (dans les fourchettes du chapitre). La profondeur
// de la tranchée au plantage n'est pas donnée : pas de cote ; celle de 300 à 500 mm est sur la 98-04b.
// L'épaisseur du varech et des mottes n'est pas donnée : pas de cote.
module.exports = (h) => {
  const NOIR = '#1A1A1A';
  const P = 'p9804a';
  const f1 = (v) => Math.round(v * 10) / 10;
  const pt = (p) => `${f1(p[0])} ${f1(p[1])}`;
  const poly = (pts, a) => h.chemin(pts, a, true);
  const motif = (id) => `fill="url(#${P}-${id})" stroke="none"`;
  const BLANC = 'fill="#FFFFFF" stroke="none"';
  const pas = (a, b, d = 10) => {
    const n = Math.max(1, Math.round(Math.abs(b - a) / d)), r = [];
    for (let i = 0; i <= n; i++) r.push(a + (b - a) * i / n);
    return r;
  };
  const interp = (tab, u) => {
    for (let i = 1; i < tab.length; i++) if (u <= tab[i][0]) {
      const [a, za] = tab[i - 1], [b, zb] = tab[i];
      return za + (zb - za) * (u - a) / (b - a);
    }
    return tab[tab.length - 1][1];
  };

  const DEFS = `<defs>
<pattern id="${P}-varech" width="40" height="18" patternUnits="userSpaceOnUse"><path d="M0 4 C8 1 14 8 22 5 S34 2 40 4 M0 12.5 C6 15.5 16 9.5 24 13 S34 15.5 40 12.5 M27 8.5 C31 7 35 10 39 8.2 M3 8.6 C7 7.4 10 10 13 8.8" fill="none" stroke="${NOIR}" stroke-width="0.7" stroke-linecap="round"/><ellipse cx="17" cy="6.6" rx="1.6" ry="1.1" fill="#FFFFFF" stroke="${NOIR}" stroke-width="0.5"/><ellipse cx="31" cy="14.4" rx="1.6" ry="1.1" fill="#FFFFFF" stroke="${NOIR}" stroke-width="0.5"/><ellipse cx="8" cy="13.6" rx="1.3" ry="0.9" fill="#FFFFFF" stroke="${NOIR}" stroke-width="0.5"/></pattern>
<pattern id="${P}-motte" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="${NOIR}" stroke-width="0.5"/><line x1="0" y1="0" x2="6" y2="0" stroke="${NOIR}" stroke-width="0.5"/></pattern>
<pattern id="${P}-dessus" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r="0.75" fill="${NOIR}"/><circle cx="7" cy="8" r="0.75" fill="${NOIR}"/><circle cx="7.5" cy="2.5" r="0.45" fill="${NOIR}"/><circle cx="2.5" cy="8" r="0.45" fill="${NOIR}"/></pattern>
<pattern id="${P}-gazon" width="22" height="19" patternUnits="userSpaceOnUse"><path d="M2 8 Q2.2 5.5 1 3.5 M4 8.2 Q4 5.6 4.6 3 M6 8 Q6.3 6 7.8 4.4 M11 15.5 Q11.2 13 10 11 M13 15.7 Q13 13.1 13.6 10.5 M15 15.5 Q15.3 13.5 16.8 11.9" fill="none" stroke="${NOIR}" stroke-width="0.5" stroke-linecap="round"/></pattern>
<pattern id="${P}-fond" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="3" cy="4" r="0.5" fill="${NOIR}"/><circle cx="10" cy="11" r="0.5" fill="${NOIR}"/></pattern>
</defs>`;

  // ─── Le monde : x en mm en travers (0 = axe de la planche), z en mm vers le haut (0 = sol d'origine)
  const XR = 1150, WALL = 45 / 380, D0 = 250;
  const SEMIS = [-360, -120, 120, 360];            // morceaux à 240 mm
  const BORDS = [-500, -240, 0, 240, 500];         // les mottes et leurs joints
  const RX = 28, RY = 20, ZC = 90;                 // un morceau, en coupe
  const EPAULE = [[330, 206], [370, 200], [410, 186], [440, 162], [465, 124], [485, 72], [500, 0]];
  const T = (x) => {                               // dessus des mottes
    const u = Math.abs(x);
    if (u <= 330) return 202 + 5 * Math.sin(Math.PI * ((((x % 240) + 240) % 240) / 240));
    return interp(EPAULE, u);
  };
  const bosse = (x) => SEMIS.reduce((m, xp) => Math.max(m, 34 * Math.max(0, 1 - ((x - xp) / 45) ** 2)), 0);
  const B = (x) => {                               // dessous des mottes : les racines de l'herbe renversée
    const u = Math.abs(x);
    if (u > 480) return 22 * (500 - u) / 20;
    return u > 440 ? V(x) + 10 : 106 + bosse(x);
  };
  const V = (x) => {                               // dessus du varech
    const u = Math.abs(x);
    return u > 440 ? 70 - 54 * (u - 440) / 40 : 70;
  };

  // Une planche montée, centrée en cx.
  const lit = (rep, cx) => {
    const { s } = rep, Q = (x, z) => rep.q(cx + x, z), o = [];
    // gazon non retourné, herbe en haut
    pas(-494, 494, 9).forEach((x, i) => o.push(h.ligne(...Q(x, 0), ...Q(x + (i % 2 ? 4 : -4), 16), h.a.fin)));
    // varech
    const vp = pas(-480, 480, 10).map((x) => Q(x, 16)).concat(pas(480, -480, 10).map((x) => Q(x, V(x))));
    o.push(poly(vp, BLANC), poly(vp, motif('varech')), poly(vp, h.a.fin));
    // morceaux de semence
    SEMIS.forEach((xp) => {
      if (Math.abs(cx + xp) > XR + RX) return;
      const c = Q(xp, ZC);
      o.push(h.ellipse(c[0], c[1], RX * s, RY * s, 'fill="#FFFFFF" ' + h.a.detail.replace('fill="none" ', '')));
      o.push(h.cercle(c[0] + 2, c[1] - 1.8, 0.7, h.a.plein));
    });
    // mottes à l'envers
    for (let k = 0; k < 4; k++) {
      const a = BORDS[k], b = BORDS[k + 1];
      const m = pas(a, b, 8).map((x) => Q(x, B(x))).concat(pas(b, a, 8).map((x) => Q(x, T(x))));
      o.push(poly(m, BLANC), poly(m, motif('motte')), poly(m, h.a.detail));
    }
    // l'herbe des mottes, pendue en dessous
    pas(-490, 490, 6).forEach((x, i) => {
      const z0 = B(x);
      // ce qu'il y a dessous : le dessus du morceau, ou le varech
      let bas = V(x);
      SEMIS.forEach((xp) => { const u = (x - xp) / RX; if (Math.abs(u) < 1) bas = Math.max(bas, ZC + RY * Math.sqrt(1 - u * u) + 2); });
      const lon = Math.min(36, z0 - bas);
      if (lon < 6) return;
      const d = i % 2 ? 4 : -4;
      o.push(h.path(`M${pt(Q(x, z0))} Q${pt(Q(x + d * 0.3, z0 - lon * 0.6))} ${pt(Q(x + d, z0 - lon))}`, h.a.detail));
    });
    // La charte : le dessus de la planche montée est l'objet de la vue, son contour pèse (2,4)
    o.push(h.chemin(pas(-500, 500, 8).map((x) => Q(x, T(x))), h.a.contour));
    return o.join('\n');
  };

  // Le sol en place et les deux tranchées, profondeur D.
  const sol = (rep, D, zb) => {
    const { q } = rep;
    const prof = [[-XR - 30, 0], [-1000, 0], [-1000 + WALL * D, -D], [-500 - WALL * D, -D], [-500, 0],
      [500, 0], [500 + WALL * D, -D], [1000 - WALL * D, -D], [1000, 0], [XR + 30, 0]].map((p) => q(p[0], p[1]));
    const fond = pas(XR + 30, -XR - 30, 45).map((x, i) => q(x, zb + (i % 2 ? 7 : -5)));
    return [
      poly(prof.concat(fond), h.a.hachure('terre', 'aucun')),
      h.chemin(fond, h.a.fin),
      h.chemin(prof, h.a.arete),
    ].join('\n');
  };

  const repCoupe = (z) => {
    const s = (z.l - 20) / (2 * XR), ox = z.l / 2, oy = z.h - 8 - s * 330;
    const cl = (x) => Math.max(-XR - 20, Math.min(XR + 20, x));
    return { s, q: (x, zz) => [ox + s * cl(x), oy - s * zz] };
  };
  const cassureV = (q, x, z0, z1) => {
    const a = q(x, z0), b = q(x, z1), m = (a[1] + b[1]) / 2;
    return h.path(`M${pt(a)} L${pt([a[0], m + 4])} L${pt([a[0] - 3.5, m + 1.5])} L${pt([a[0] + 3.5, m - 1.5])} L${pt([a[0], m - 4])} L${pt(b)}`, h.a.detail);
  };

  // ─── Le plan : x comme la coupe, y le long de la planche (0 = plan de coupe, en haut)
  const repPlan = (z) => {
    const s = (z.l - 20) / (2 * XR), ox = z.l / 2, oy = 2;
    const cl = (x) => Math.max(-XR - 20, Math.min(XR + 20, x));
    return { s, p: (x, y) => [ox + s * cl(x), oy + s * y], Ylen: (z.h - 42) / s };
  };
  const TRACE = `fill="none" stroke="${NOIR}" stroke-width="0.5" stroke-dasharray="10 3 2 3"`;
  const CACHE_FIN = `fill="none" stroke="${NOIR}" stroke-width="0.7" stroke-dasharray="2 1.6"`;
  const jit = (i) => (((i * 37) % 11) - 5) * 2.2;

  return {
    ref: '98-04a',
    titre: 'La planche paresseuse : la monter sur le gazon',
    desc: 'En coupe au plantage, une planche paresseuse entre deux tranchées : sur le gazon non retourné, une couche de varech rincé ou de fumier composté ; les morceaux de semence posés dessus ; par-dessus, les mottes tirées des tranchées à la bêche et posées à l’envers, l’herbe en dessous, la terre au-dessus. Une flèche montre une motte qui passe de la tranchée à la planche en se renversant. Vu de dessus, aligné sous la coupe et à la même échelle : la planche qui avance, du gazon tracé au varech étendu, puis aux morceaux posés à 230 à 250 mm dans les deux sens, puis aux mottes, avec les tranchées creusées à mesure. Planches de 900 à 2100 mm, tranchées de 460 à 910 mm.',
    format: 'pleine',
    disposition: [['coupe'], ['plan']],
    hauteurs: [0.86, 1.6],
    vues: {
      coupe: {
        titre: 'En coupe, au plantage',
        dessin: (z) => {
          const rep = repCoupe(z), { q, s } = rep, o = [DEFS];
          const [xa] = q(-XR, 0), [xb] = q(XR, 0);
          o.push(`<clipPath id="${P}-cc"><rect x="${f1(xa)}" y="0" width="${f1(xb - xa)}" height="${z.h}"/></clipPath>`);
          o.push(`<g clip-path="url(#${P}-cc)">`);
          o.push(sol(rep, D0, -330));
          o.push(lit(rep, 0), lit(rep, -1500), lit(rep, 1500));
          o.push('</g>');
          o.push(cassureV(q, -XR, -335, 215), cassureV(q, XR, -335, 215));
          // La motte qu'on vient de lever, et où elle va : à l'envers sur la planche.
          const g0 = q(760, 0), g1 = q(960, -125);
          o.push(h.rect(g0[0], g0[1], g1[0] - g0[0], g1[1] - g0[1], h.a.cache));
          pas(775, 945, 20).forEach((x, i) => o.push(h.ligne(...q(x, 0), ...q(x + (i % 2 ? 4 : -4), 14), h.a.fin)));
          // La charte : le geste, la motte levée de la tranchée et posée à l'envers sur la planche
          o.push(h.geste(`M${pt(q(870, 30))} Q${pt(q(760, 480))} ${pt(q(432, 184))}`));
          // au sommet de l'arc, la même motte tournée d'un quart de tour : l'herbe passe sur le côté
          const mx = 705, mz = 294, m0 = q(mx - 62, mz + 100), m1 = q(mx + 62, mz - 100);
          o.push(h.rect(m0[0], m0[1], m1[0] - m0[0], m1[1] - m0[1], 'fill="#FFFFFF" ' + h.a.fin.replace('fill="none" ', '')));
          pas(mz - 88, mz + 88, 20).forEach((zz, i) => o.push(h.ligne(...q(mx - 62, zz), ...q(mx - 76, zz + (i % 2 ? 4 : -4)), h.a.fin)));
          return o.join('\n');
        },
        renvois: (z) => {
          const { q } = repCoupe(z);
          return [
            { n: 1, rond: q(-790, -170), cible: q(-420, 5), texte: 'gazon non retourné' },
            { n: 2, rond: q(-800, 70), cible: q(-420, 42), texte: 'varech rincé, ou fumier composté' },
            { n: 3, rond: q(-760, 215), cible: q(-376, 92), texte: 'morceau de semence' },
            { n: 4, rond: q(170, 360), cible: q(300, 150), texte: 'motte à l’envers : herbe dessous, terre dessus' },
            { n: 5, rond: q(640, -175), cible: q(820, -250), texte: 'tranchée creusée à la bêche' },
          ];
        },
      },
      plan: {
        titre: 'Vu de dessus, aligné : la planche qui avance',
        dessin: (z) => {
          const { s, p, Ylen } = repPlan(z), o = [];
          const [x0, y0] = p(-XR, 0), [x1, y1] = p(XR, Ylen);
          o.push(`<clipPath id="${P}-cp"><rect x="${f1(x0)}" y="${f1(y0)}" width="${f1(x1 - x0)}" height="${f1(y1 - y0)}"/></clipPath>`);
          o.push(`<g clip-path="url(#${P}-cp)">`);
          o.push(h.rect(x0, y0, x1 - x0, y1 - y0, motif('gazon')));
          // le varech étendu sur la planche
          const bordV = pas(470, -470, 30).map((x, i) => [x, 900 + 16 * Math.sin(x / 60) + (i % 2 ? 7 : -5)]);
          const vr = [[-470, 200], [470, 200]].concat(bordV).map(([x, y]) => p(x, y));
          o.push(poly(vr, BLANC), poly(vr, motif('varech')), poly(vr, h.a.detail));
          // les morceaux posés, à 240 mm dans les deux sens
          [340, 580].forEach((y) => SEMIS.forEach((x) => {
            const c = p(x, y);
            o.push(h.ellipse(c[0], c[1], 30 * s, 24 * s, 'fill="#FFFFFF" ' + h.a.detail.replace('fill="none" ', '')));
            o.push(h.cercle(c[0] - 1.8, c[1] - 1, 0.7, h.a.plein), h.cercle(c[0] + 2.2, c[1] + 1.2, 0.55, h.a.plein));
          }));
          // les tranchées, creusées à mesure qu'on couvre
          [-1, 1].forEach((c) => {
            const X = (x) => c * x;
            const top = [p(X(500), 0), p(X(1000), 0), p(X(1000), 300), p(X(500), 300)];
            o.push(poly(top, BLANC));
            const fi = 500 + WALL * D0, fo = 1000 - WALL * D0;
            const fl = [p(X(fi), 0), p(X(fo), 0), p(X(fo), 270), p(X(fi), 270)];
            o.push(poly(fl, motif('fond')), poly(fl, h.a.fin));
            pas(8, 286, 16).forEach((y, i) => {
              const k = i % 2 ? 0.55 : 1;
              o.push(h.ligne(...p(X(500), y), ...p(X(500 + (fi - 500) * k), y), h.a.fin));
              o.push(h.ligne(...p(X(1000), y), ...p(X(1000 - (1000 - fo) * k), y), h.a.fin));
            });
            pas(fi + 8, fo - 8, 16).forEach((x, i) => {
              const k = i % 2 ? 0.55 : 1;
              o.push(h.ligne(...p(X(x), 300), ...p(X(x), 300 - 30 * k), h.a.fin));
            });
            o.push(h.chemin([p(X(500), 0), p(X(500), 300), p(X(1000), 300), p(X(1000), 0)], h.a.arete));
          });
          // les mottes à l'envers : la planche et le bord des deux voisines
          const blocs = [];
          [[0, 140], [140, 280]].forEach(([ya, yb], r) => {
            [[-500, -240], [-240, 0], [0, 240], [240, 500], [1000, 1240], [1240, 1500], [-1240, -1000], [-1500, -1240]]
              .forEach(([a, b], k) => blocs.push({ a, b, ya, yb, i: r * 8 + k, bas: r === 1 }));
          });
          blocs.forEach(({ a, b, ya, yb, i, bas }) => {
            const ja = Math.abs(a) === 500 || Math.abs(a) === 1000 ? 0 : jit(i);
            const jb = Math.abs(b) === 500 || Math.abs(b) === 1000 ? 0 : jit(i + 3);
            const yh = ya === 0 ? 0 : ya + jit(i + 5) * 0.6;
            const yl = yb + (bas ? jit(i + 7) : jit(i + 9) * 0.6);
            const m = [p(a + ja, yh), p(b + jb, yh), p(b + jb * 0.6, yl), p(a + ja * 0.6, yl)];
            o.push(poly(m, BLANC), poly(m, motif('dessus')), poly(m, h.a.detail));
          });
          o.push(h.chemin([p(-500, 0), p(-500, 283)], h.a.arete), h.chemin([p(500, 0), p(500, 283)], h.a.arete));
          // les morceaux déjà couverts, en caché
          SEMIS.forEach((x) => { const c = p(x, 100); o.push(h.ellipse(c[0], c[1], 30 * s, 24 * s, CACHE_FIN)); });
          o.push('</g>');
          // le tracé de la planche et des tranchées, jusqu'aux cotes
          const yC = y1 + 20;
          [-1000, -500, 500, 1000].forEach((x) => o.push(h.chemin([p(x, Math.abs(x) === 500 ? 283 : 300), [p(x, 0)[0], x === -1000 ? y1 : yC + 6]], TRACE)));
          o.push(h.cote(p(-500, 0)[0], yC, p(500, 0)[0], yC, '900 à 2100 mm', { cote: 'dessous' }));
          o.push(h.cote(p(500, 0)[0], yC, p(1000, 0)[0], yC, '460 à 910 mm', { cote: 'dessous' }));
          // l'écart des morceaux, dans les deux sens
          const e1 = p(120, 580), e2 = p(360, 580), yE = p(0, 660)[1];
          o.push(h.ligne(e1[0], e1[1] + 7, e1[0], yE + 6, h.a.fin), h.ligne(e2[0], e2[1] + 7, e2[0], yE + 6, h.a.fin));
          { const w = h.largeur('230 à 250 mm', 12) + 8, xm = (e1[0] + e2[0]) / 2; o.push(h.rect(xm - w / 2, yE + 3, w, 16, BLANC)); }
          o.push(h.cote(e1[0], yE, e2[0], yE, '230 à 250 mm', { cote: 'dessous' }));
          const v1 = p(-360, 340), v2 = p(-360, 580), xE = p(-450, 0)[0];
          o.push(h.ligne(v1[0] - 8.5, v1[1], xE - 6, v1[1], h.a.fin), h.ligne(v2[0] - 8.5, v2[1], xE - 6, v2[1], h.a.fin));
          o.push(h.cote(xE, v1[1], xE, v2[1], '', { cote: 'gauche' }));
          { const w = h.largeur('230 à 250 mm', 12), xt = xE - 16 - w / 2, ym = (v1[1] + v2[1]) / 2;
            o.push(h.rect(xt - w / 2 - 4, ym - 9, w + 8, 17, BLANC), h.texte(xt, ym + 4, '230 à 250 mm', { lisere: true })); }
          return o.join('\n');
        },
        renvois: (z) => {
          const { p, Ylen } = repPlan(z);
          const yb = Math.min(1060, Ylen - 60);
          return [
            { n: 6, rond: p(-1088, yb), cible: p(-500, yb + 20), texte: 'tracer la planche et les tranchées' },
            { n: 7, rond: p(-1088, 830), cible: p(-240, 800), texte: 'étendre le varech sur le gazon' },
            { n: 8, rond: p(-1088, 700), cible: p(-146, 588), texte: 'poser les morceaux sur le varech' },
            { n: 9, rond: p(-1088, 170), cible: p(-330, 190), texte: 'couvrir de mottes à l’envers' },
          ];
        },
      },
    },
  };
};
