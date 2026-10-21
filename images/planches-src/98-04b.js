// Planche 98-04b — La planche paresseuse : la recharge à trois semaines (chapitre 98, « La planche
// paresseuse : deux gestes de plus que le billon »).
//
// Ce que le chapitre donne, et rien d'autre : tranchées de 46 à 91 cm de large et de 30 à 50 cm de
// profond ; environ trois semaines après le plantage, quand les germes pointent, toute la planche se
// recouvre de 5 à 8 cm de terre tirée des tranchées, qui étouffe le chiendent et les mauvaises herbes
// levées avec la pomme de terre. Même planche, même échelle et mêmes couches que la 98-04a (gazon non
// retourné, varech ou fumier, morceaux à 240 mm, mottes à l'envers).
// Dessinée à 380 mm de tranchée (dans la fourchette) ; l'ancien fond, au plantage, en tireté.
module.exports = (h) => {
  const NOIR = '#1A1A1A';
  const P = 'p9804b';
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
  const plein = (a) => 'fill="#FFFFFF" ' + a.replace('fill="none" ', '');

  const DEFS = `<defs>
<pattern id="${P}-varech" width="40" height="18" patternUnits="userSpaceOnUse"><path d="M0 4 C8 1 14 8 22 5 S34 2 40 4 M0 12.5 C6 15.5 16 9.5 24 13 S34 15.5 40 12.5 M27 8.5 C31 7 35 10 39 8.2 M3 8.6 C7 7.4 10 10 13 8.8" fill="none" stroke="${NOIR}" stroke-width="0.7" stroke-linecap="round"/><ellipse cx="17" cy="6.6" rx="1.6" ry="1.1" fill="#FFFFFF" stroke="${NOIR}" stroke-width="0.5"/><ellipse cx="31" cy="14.4" rx="1.6" ry="1.1" fill="#FFFFFF" stroke="${NOIR}" stroke-width="0.5"/><ellipse cx="8" cy="13.6" rx="1.3" ry="0.9" fill="#FFFFFF" stroke="${NOIR}" stroke-width="0.5"/></pattern>
<pattern id="${P}-motte" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="${NOIR}" stroke-width="0.5"/><line x1="0" y1="0" x2="6" y2="0" stroke="${NOIR}" stroke-width="0.5"/></pattern>
<pattern id="${P}-recharge" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="0.7" fill="${NOIR}"/><circle cx="5" cy="4.5" r="0.7" fill="${NOIR}"/><circle cx="2.5" cy="5.8" r="0.4" fill="${NOIR}"/></pattern>
</defs>`;

  // ─── Le monde : x en mm en travers (0 = axe de la planche), z en mm vers le haut (0 = sol d'origine)
  const XR = 1150, WALL = 45 / 380, D0 = 250, D1 = 380;
  const SEMIS = [-360, -120, 120, 360];            // morceaux à 240 mm
  const BORDS = [-500, -240, 0, 240, 500];         // les mottes et leurs joints
  const RX = 28, RY = 20, ZC = 90;                 // un morceau, en coupe
  const EPAULE = [[330, 206], [370, 200], [410, 186], [440, 162], [465, 124], [485, 72], [500, 0]];
  const T = (x) => {                               // dessus des mottes
    const u = Math.abs(x);
    if (u <= 330) return 202 + 5 * Math.sin(Math.PI * ((((x % 240) + 240) % 240) / 240));
    return interp(EPAULE, u);
  };
  const R = (x) => {                               // dessus de la recharge
    const u = Math.abs(x);
    if (u <= 330) return 270 + 1.5 * Math.sin(x / 37);
    return interp([[330, 271], [390, 264], [440, 238], [470, 196], [490, 128], [500, 50], [500.001, 0]], u);
  };
  const V = (x) => {                               // dessus du varech
    const u = Math.abs(x);
    return u > 440 ? 70 - 54 * (u - 440) / 40 : 70;
  };
  const bosse = (x) => SEMIS.reduce((m, xp) => Math.max(m, 34 * Math.max(0, 1 - ((x - xp) / 45) ** 2)), 0);
  const B = (x) => {                               // dessous des mottes : les racines de l'herbe renversée
    const u = Math.abs(x);
    if (u > 480) return 22 * (500 - u) / 20;
    return u > 440 ? V(x) + 10 : 80 + bosse(x);
  };
  // Un ruban (lanière de varech, germe) : la ligne médiane pts (écran), largeur w, en contour fermé.
  const ruban = (pts, w, att) => {
    const g = [], d = [];
    pts.forEach((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      const n = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, nx = -(b[1] - a[1]) / n * w / 2, ny = (b[0] - a[0]) / n * w / 2;
      g.push([p[0] + nx, p[1] + ny]); d.push([p[0] - nx, p[1] - ny]);
    });
    return poly(g.concat(d.reverse()), att);
  };
  const quad = (a, c, b, n = 14) => pas(0, 1, 1 / n).map((t) => [0, 1].map((k) => (1 - t) ** 2 * a[k] + 2 * t * (1 - t) * c[k] + t * t * b[k]));
  const cub = (a, c1, c2, b, n = 18) => pas(0, 1, 1 / n).map((t) => [0, 1].map((k) => (1 - t) ** 3 * a[k] + 3 * t * (1 - t) ** 2 * c1[k] + 3 * t * t * (1 - t) * c2[k] + t ** 3 * b[k]));

  // Une planche montée, centrée en cx, avec sa recharge et les germes qu'elle recouvre.
  const lit = (rep, cx) => {
    const { s } = rep, Q = (x, z) => rep.q(cx + x, z), o = [];
    pas(-494, 494, 9).forEach((x, i) => o.push(h.ligne(...Q(x, 0), ...Q(x + (i % 2 ? 4 : -4), 16), h.a.fin)));
    const vp = pas(-480, 480, 10).map((x) => Q(x, 16)).concat(pas(480, -480, 10).map((x) => Q(x, V(x))));
    o.push(poly(vp, BLANC), poly(vp, motif('varech')), poly(vp, h.a.fin));
    SEMIS.forEach((xp) => {
      if (Math.abs(cx + xp) > XR + RX) return;
      const c = Q(xp, ZC);
      o.push(h.ellipse(c[0], c[1], RX * s, RY * s, plein(h.a.detail)));
      o.push(h.cercle(c[0] + 2, c[1] - 1.8, 0.7, h.a.plein));
    });
    for (let k = 0; k < 4; k++) {
      const a = BORDS[k], b = BORDS[k + 1];
      const m = pas(a, b, 8).map((x) => Q(x, B(x))).concat(pas(b, a, 8).map((x) => Q(x, T(x))));
      o.push(poly(m, BLANC), poly(m, motif('motte')), poly(m, h.a.detail));
    }
    pas(-490, 490, 9).forEach((x, i) => {
      if (SEMIS.some((xp) => Math.abs(x - xp) < 34)) return;
      const z0 = B(x);
      if (z0 < 16) return;
      o.push(h.ligne(...Q(x, z0), ...Q(x + (i % 2 ? 3 : -3), z0 - 12), h.a.fin));
    });
    // la recharge
    const r = [Q(-500, 0)].concat(pas(-500, 500, 8).map((x) => Q(x, R(x))), [Q(500, 0)], pas(500, -500, 8).map((x) => Q(x, T(x))));
    o.push(poly(r, BLANC), poly(r, motif('recharge')), poly(r, h.a.detail));
    // les germes, qui pointaient au ras des mottes
    SEMIS.forEach((xp) => {
      if (Math.abs(cx + xp) > XR + 20) return;
      o.push(ruban(quad(Q(xp + 4, 108), Q(xp + 14, 160), Q(xp + 8, T(xp) + 12)), 1.8, plein(h.a.fin)));
    });
    // La charte : la recharge est l'objet de la planche, son contour pèse (2,4)
    o.push(h.chemin([Q(-500, 0)].concat(pas(-500, 500, 8).map((x) => Q(x, R(x))), [Q(500, 0)]), h.a.contour));
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
    const s = (z.l - 20) / (2 * XR), ox = z.l / 2, oy = z.h - 8 - s * 450;
    const cl = (x) => Math.max(-XR - 20, Math.min(XR + 20, x));
    return { s, q: (x, zz) => [ox + s * cl(x), oy - s * zz] };
  };
  const cassureV = (q, x, z0, z1) => {
    const a = q(x, z0), b = q(x, z1), m = (a[1] + b[1]) / 2;
    return h.path(`M${pt(a)} L${pt([a[0], m + 4])} L${pt([a[0] - 3.5, m + 1.5])} L${pt([a[0] + 3.5, m - 1.5])} L${pt([a[0], m - 4])} L${pt(b)}`, h.a.detail);
  };
  const FL_G = [[-570, -330], [-600, 400], [-400, 262]];
  const FL_D = FL_G.map(([x, zz]) => [-x, zz]);
  const surFleche = (t, F) => [0, 1].map((k) => (1 - t) ** 2 * F[0][k] + 2 * t * (1 - t) * F[1][k] + t * t * F[2][k]);

  // ─── Le détail : une tranche de la planche, x de -240 à 240, z de -90 à 290
  const SD = 0.9;
  const repD = (z) => {
    const ox = 105 + 240 * SD, oy = (z.h - 380 * SD) / 2 + 290 * SD;
    return { s: SD, q: (x, zz) => [ox + SD * x, oy - SD * zz] };
  };
  const SD_SEMIS = [-120, 120];
  const Bd = (x) => 98 + SD_SEMIS.reduce((m, xp) => Math.max(m, 28 * Math.max(0, 1 - ((x - xp) / 44) ** 2)), 0);
  const dome = (x) => {                            // dessus d'un morceau, ou null
    for (const xp of SD_SEMIS) { const u = (x - xp) / 32; if (Math.abs(u) < 1) return 76 + 43 * Math.sqrt(1 - u * u); }
    return null;
  };
  const BRIN = `fill="none" stroke="${NOIR}" stroke-width="1.4" stroke-linecap="round"`;

  return {
    ref: '98-04b',
    titre: 'La planche paresseuse : la recharge à trois semaines',
    desc: 'En coupe, trois semaines après le plantage, quand les germes pointent, à la même échelle que la 98-04a : les tranchées creusées plus creux, jusqu’à 300 à 500 mm sous le sol d’origine (l’ancien fond en tireté), et leur terre jetée à la bêche sur toute la planche, dessus et flancs. Une tranche encadrée en tireté est reprise de près : de haut en bas, la recharge de 50 à 80 mm de terre des tranchées, le chiendent qu’elle étouffe, la motte à l’envers (terre en haut, racines et herbe renversées en dessous), le morceau de semence et son germe qui pointait, maintenant recouvert, le varech ou le fumier, le gazon non retourné sur le sol en place.',
    format: 'pleine',
    disposition: [['coupe'], ['detail']],
    hauteurs: [1, 1.75],
    vues: {
      coupe: {
        titre: 'En coupe, trois semaines après',
        dessin: (z) => {
          const rep = repCoupe(z), { q } = rep, o = [DEFS];
          const [xa] = q(-XR, 0), [xb] = q(XR, 0);
          o.push(`<clipPath id="${P}-cc"><rect x="${f1(xa)}" y="0" width="${f1(xb - xa)}" height="${z.h}"/></clipPath>`);
          o.push(`<g clip-path="url(#${P}-cc)">`);
          o.push(sol(rep, D1, -450));
          o.push(lit(rep, 0), lit(rep, -1500), lit(rep, 1500));
          o.push('</g>');
          o.push(cassureV(q, -XR, -455, 280), cassureV(q, XR, -455, 280));
          // l'ancien fond, au plantage
          [-1, 1].forEach((c) => o.push(h.chemin([q(c * (500 + WALL * D0), -D0), q(c * (1000 - WALL * D0), -D0)], h.a.cache)));
          // la profondeur, depuis le sol d'origine
          o.push(h.ligne(...q(-1000, 0), ...q(-500, 0), h.a.fin));
          o.push(h.cote(q(-945, 0)[0], q(0, 0)[1], q(-945, 0)[0], q(0, -D1)[1], '300 à 500 mm', { cote: 'droite' }));
          // la terre des tranchées, jetée sur la planche
          // La charte : une seule flèche du geste par vue, en rouge, du côté du renvoi 2 ; la planche
          // est symétrique, l'autre tranchée se vide de même.
          [FL_G].forEach((F) => o.push(h.geste(`M${pt(q(...F[0]))} Q${pt(q(...F[1]))} ${pt(q(...F[2]))}`)));
          // la tranche reprise de près
          const c0 = q(-240, 290), c1 = q(240, -90);
          o.push(h.rect(c0[0], c0[1], c1[0] - c0[0], c1[1] - c0[1], h.a.cache));
          return o.join('\n');
        },
        renvois: (z) => {
          const { q } = repCoupe(z);
          return [
            { n: 1, rond: q(830, -160), cible: q(760, -380), texte: 'tranchée creusée plus creux, à la bêche' },
            { n: 2, rond: q(-870, 250), cible: q(...surFleche(0.5, FL_G)), texte: 'terre des tranchées, jetée par-dessus' },
            { n: 9, rond: q(1075, -140), cible: q(925, -250), texte: 'fond de la tranchée au plantage' },
          ];
        },
      },
      detail: {
        titre: 'La tranche encadrée, de près',
        dessin: (z) => {
          const { q } = repD(z), o = [];
          const X0 = -240, X1 = 240;
          const ca = q(X0, 290), cb = q(X1, -90);
          o.push(`<clipPath id="${P}-cd"><rect x="${f1(ca[0])}" y="${f1(ca[1])}" width="${f1(cb[0] - ca[0])}" height="${f1(cb[1] - ca[1])}"/></clipPath>`);
          o.push(`<g clip-path="url(#${P}-cd)">`);
          // sol en place, et les racines du gazon
          const s0 = q(X0 - 10, 0), s1 = q(X1 + 10, -95);
          o.push(h.rect(s0[0], s0[1], s1[0] - s0[0], s1[1] - s0[1], h.a.hachure('terre', 'aucun')));
          pas(-236, 236, 10).forEach((x, i) => o.push(h.path(`M${pt(q(x, 0))} Q${pt(q(x + (i % 2 ? 4 : -3), -9))} ${pt(q(x + (i % 2 ? 1 : 2), -20 - (i % 3) * 4))}`, h.a.fin)));
          o.push(h.chemin([q(X0 - 10, 0), q(X1 + 10, 0)], h.a.detail));
          // gazon non retourné : l'herbe debout, couchée par le poids
          pas(-238, 238, 7).forEach((x, i) => {
            o.push(h.path(`M${pt(q(x, 0))} Q${pt(q(x + 2, 12))} ${pt(q(x + 9 + (i % 3) * 2, 19 - (i % 2) * 4))}`, h.a.detail));
          });
          // varech : des lanières qui se chevauchent, avec leurs flotteurs
          [26, 37, 48, 59, 68].forEach((zr, r) => {
            o.push(ruban(pas(X0 - 10, X1 + 10, 6).map((x) => q(x, zr + 3.2 * Math.sin(x / 23 + r * 1.9))), 3.4, plein(h.a.detail)));
            [-190, -60, 70, 200].forEach((xb, j) => {
              const x = xb + ((r * 47 + j * 29) % 50) - 25, zz = zr + 3.2 * Math.sin(x / 23 + r * 1.9);
              const c = q(x, zz);
              o.push(h.ellipse(c[0], c[1], 3.4, 2.4, plein(h.a.detail)));
            });
          });
          // les morceaux de semence, posés sur le varech, et leurs racines
          SD_SEMIS.forEach((xp) => {
            [[-20, -26, 12], [-6, -8, -6], [9, 14, 4], [23, 34, 20]].forEach(([dx, fx, fz]) => {
              o.push(h.path(`M${pt(q(xp + dx, 77))} Q${pt(q(xp + dx + fx * 0.3, 50))} ${pt(q(xp + dx + fx, fz))}`, h.a.fin));
            });
            const pts = [q(xp + 30, 76)].concat(pas(32, -32, 4).map((u) => q(xp + u, 76 + 43 * Math.sqrt(Math.max(0, 1 - (u / 32) ** 2)))), [q(xp - 30, 76)]);
            o.push(poly(pts, plein(h.a.arete)));
            [[-16, 108], [18, 100]].forEach(([dx, zz]) => { const c = q(xp + dx, zz); o.push(h.ellipse(c[0], c[1], 2.2, 1.3, h.a.detail)); });
          });
          // les mottes à l'envers : terre en haut, racines et herbe en dessous
          const joint = [[0, Bd(0)], [4, 122], [-3, 146], [3, 170], [-2, 190], [0, T(0)]];
          const gauche = pas(X0 - 10, 0, 6).map((x) => q(x, Bd(x))).concat(joint.map(([x, zz]) => q(x, zz)), pas(0, X0 - 10, 6).map((x) => q(x, T(x))));
          const droite = pas(X1 + 10, 0, 6).map((x) => q(x, Bd(x))).concat(joint.map(([x, zz]) => q(x, zz)), pas(0, X1 + 10, 6).map((x) => q(x, T(x))));
          [gauche, droite].forEach((m) => o.push(poly(m, BLANC), poly(m, motif('motte')), poly(m, h.a.detail)));
          pas(-236, 236, 12).forEach((x, i) => o.push(h.path(`M${pt(q(x, Bd(x)))} Q${pt(q(x + (i % 2 ? 3 : -3), Bd(x) + 8))} ${pt(q(x + (i % 2 ? 1 : -2), Bd(x) + 15))}`, h.a.fin)));
          pas(-237, 237, 6).forEach((x, i) => {
            const bas = dome(x) !== null ? dome(x) + 2 : 76;
            const lon = Math.min(22, Bd(x) - bas);
            if (lon < 5) return;
            const b0 = Bd(x), tip = q(x - 3 - (i % 3) * 1.5, b0 - lon + (i % 2) * 3);
            // base épaisse contre la terre de la motte, pointe vers le bas
            o.push(poly([q(x - 2, b0), q(x + 2, b0), tip], plein(h.a.fin)));
          });
          // la recharge, et le chiendent qu'elle étouffe
          const rch = pas(X0 - 10, X1 + 10, 6).map((x) => q(x, R(x))).concat(pas(X1 + 10, X0 - 10, 6).map((x) => q(x, T(x))));
          o.push(poly(rch, BLANC), poly(rch, motif('recharge')), poly(rch, h.a.detail));
          [[-172, -1], [0, 1], [200, 1]].forEach(([xw, k]) => {
            const z0 = T(xw);
            [[-4, -9, 24], [0, 4, 31], [4, 14, 22]].forEach(([dx, px, ht]) => {
              o.push(h.path(`M${pt(q(xw + k * dx, z0))} Q${pt(q(xw + k * (dx + px * 0.2), z0 + ht))} ${pt(q(xw + k * (dx + px), z0 + ht - 5))}`, BRIN));
            });
          });
          // les germes : ils pointaient au ras des mottes, la recharge les couvre
          SD_SEMIS.forEach((xp) => {
            const tp = q(xp + 10, T(xp + 10) + 12);
            o.push(ruban(cub(q(xp + 8, 116), q(xp + 20, 140), q(xp + 2, 175), tp), 4.2, plein(h.a.detail)));
            o.push(h.path(`M${pt(tp)} q -4 -3 -6 -8 q 5 1 6 8 q 1 -7 6 -8 q -1 5 -6 8`, plein(h.a.detail)));
          });
          o.push(h.chemin(pas(X0 - 10, X1 + 10, 6).map((x) => q(x, R(x))), h.a.contour));   // la charte
          o.push('</g>');
          o.push(h.rect(ca[0], ca[1], cb[0] - ca[0], cb[1] - ca[1], h.a.fin));
          // la cote de la recharge
          const xc = ca[0] - 14, zt = q(X0, T(X0))[1], zr = q(X0, R(X0))[1];
          o.push(h.ligne(ca[0] - 2, zt, xc - 6, zt, h.a.fin), h.ligne(ca[0] - 2, zr, xc - 6, zr, h.a.fin));
          o.push(h.cote(xc, zr, xc, zt, '50 à 80 mm', { cote: 'gauche' }));
          // second rappel du renvoi 5, vers l'herbe renversée sous la motte
          { const a = [q(240, 0)[0] + 32, q(0, 168)[1]], b = q(215, 88), d = Math.hypot(b[0] - a[0], b[1] - a[1]);
            const sx = a[0] + (b[0] - a[0]) * 10 / d, sy = a[1] + (b[1] - a[1]) * 10 / d;
            o.push(`<line x1="${f1(sx)}" y1="${f1(sy)}" x2="${f1(b[0])}" y2="${f1(b[1])}" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>`,
              `<line x1="${f1(sx)}" y1="${f1(sy)}" x2="${f1(b[0])}" y2="${f1(b[1])}" fill="none" stroke="${NOIR}" stroke-width="0.5" stroke-dasharray="3 2.5"/>`,
              `<circle cx="${f1(b[0])}" cy="${f1(b[1])}" r="1.8" fill="${NOIR}" stroke="#FFFFFF" stroke-width="0.7"/>`); }
          return o.join('\n');
        },
        renvois: (z) => {
          const { q } = repD(z), xr = q(240, 0)[0] + 32;
          const r = (zz) => [xr, q(0, zz)[1]];
          return [
            { n: 3, rond: r(283), cible: q(160, 250), texte: 'recharge, sur toute la planche' },
            { n: 4, rond: r(236), cible: q(212, 226), texte: 'chiendent étouffé sous la recharge' },
            { n: 5, rond: r(168), cible: q(185, 165), texte: 'motte à l’envers, herbe dessous' },
            { n: 6, rond: r(64), cible: q(142, 96), texte: 'morceau de semence et son germe' },
            { n: 7, rond: r(34), cible: q(214, 48), texte: 'varech ou fumier composté' },
            { n: 8, rond: r(8), cible: q(222, 10), texte: 'gazon non retourné' },
          ];
        },
      },
    },
  };
};
