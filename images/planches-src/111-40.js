// Planche 111-40 — Tremper une lame (ch. 111, §5 E-F, étapes 31 à 35 et 43).
// Rangée 1 : l'aimant qui colle, l'aimant qui décroche, la plongée dans le bac d'huile (même lame,
// même échelle, la pince par le haut). Rangée 2 : la lime qui glisse, la lime qui mord.
// Rangée 3 : le revenu différentiel au chalumeau, le fil dans un fond d'eau.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const dOf = (pts, ferme = false) => pts.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ') + (ferme ? ' Z' : '');
  const quad = (a, c, b, n = 14) => Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, u = 1 - t;
    return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
  });
  const add = (p, q, k = 1) => [p[0] + q[0] * k, p[1] + q[1] * k];
  const unit = v => { const n = Math.hypot(v[0], v[1]); return [v[0] / n, v[1] / n]; };
  const double = (d, at = A.arete) => `<path d="${d}" ${at} marker-start="url(#fl)" marker-end="url(#fl)"/>`;
  const decoupe = (id, z, contenu) =>
    `<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu}\n</g>`;

  // Une bande (barre de fer) le long d'une ligne médiane : contour fermé, fond blanc.
  const bande = (pts, w) => {
    const g = [], d = [];
    pts.forEach((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      const t = unit([b[0] - a[0], b[1] - a[1]]), n = [-t[1], t[0]];
      g.push(add(p, n, w / 2)); d.push(add(p, n, -w / 2));
    });
    return h.path(dOf([...g, ...d.reverse()], true), blanc(A.arete));
  };

  // ─── La lame de couteau forgée ───
  // O : le talon, sur le dos ; u : vers la pointe ; v : du dos vers le fil. L longueur, H hauteur, T soie.
  const lame = ({ O, u, v, L, H, T }) => {
    const P = ([x, y]) => [O[0] + x * u[0] + y * v[0], O[1] + x * u[1] + y * v[1]];
    const dos = [[0, 0], [0.6 * L, 0], ...quad([0.6 * L, 0], [0.9 * L, 0.04 * H], [L, 0.8 * H]).slice(1)];
    const fil = [[0.04 * L, H], [0.68 * L, H], ...quad([0.68 * L, H], [0.93 * L, H], [L, 0.8 * H]).slice(1)];
    const soie = [[0, 0.62 * H], [-0.7 * T, 0.56 * H], [-T, 0.5 * H], [-T - 0.1 * H, 0.38 * H], [-T, 0.26 * H], [-0.7 * T, 0.2 * H], [0, 0.14 * H]];
    const corpsL = [...dos, ...fil.slice(0, -1).reverse(), [0, 0.88 * H]];
    return {
      P,
      contour: [...corpsL, ...soie].map(P),
      corps: corpsL.map(P),
      biseau: [[0.05 * L, 0.5 * H], [0.62 * L, 0.5 * H], ...quad([0.62 * L, 0.5 * H], [0.9 * L, 0.52 * H], [0.975 * L, 0.79 * H]).slice(1)].map(P),
      prise: { G: P([-0.5 * T, 0.38 * H]), e: 0.2 * H },
    };
  };
  const dessinLame = lm => [h.path(dOf(lm.contour, true), blanc(A.contour)), h.path(dOf(lm.biseau), A.fin)].join('\n');

  // ─── La pince de forge, vue dans son plan d'ouverture ───
  // G : le milieu des mors ; a : du pivot vers les mors ; e : demi-épaisseur serrée ; k : échelle.
  const pince = ({ G, a, e, k = 1, R = 160, ecart = 8 }) => {
    const b = [-a[1], a[0]];
    const P = ([s, t]) => [G[0] + s * a[0] + t * b[0], G[1] + s * a[1] + t * b[1]];
    const J = 14 * k, w = 4.6 * k, piv = -J / 2 - 15 * k;
    const moitie = sg => {
      const m = [[J / 2, sg * (e + w / 2)], [-J / 2, sg * (e + w / 2)],
        ...quad([-J / 2, sg * (e + w / 2)], [piv + 5 * k, sg * (e + 8 * k)], [piv, 0], 8).slice(1),
        ...quad([piv, 0], [piv - 12 * k, -sg * 4 * k], [piv - 30 * k, -sg * ecart * k], 6).slice(1),
        [piv - R, -sg * ecart * k]];
      return bande(m.map(P), w);
    };
    const pv = P([piv, 0]);
    return [moitie(1), moitie(-1), h.cercle(pv[0], pv[1], 5 * k, blanc(A.arete)), h.cercle(pv[0], pv[1], 1.7 * k, A.detail)].join('\n');
  };

  // ─── Rangée 1 : la même lame, la pointe en bas, tenue à la pince par la soie ───
  const L1 = 106, H1 = 27, T1 = 30;
  const aimantRect = (x, y) => h.rect(x - 4.5, y, 9, 19, blanc(A.arete)) + h.ligne(x - 4.5, y + 9.5, x + 4.5, y + 9.5, A.fin);   // (x, y) : le haut, où le fil s'attache
  const vueAimant = (z, colle, id) => {
    const bx = Math.round(z.l * 0.72), hy = z.h - 12 - L1;
    const lm = lame({ O: [bx, hy], u: [0, 1], v: [1, 0], L: L1, H: H1, T: T1 });
    const ell = 66, py = hy - 36;
    const yHaut = hy + 4;                                  // le haut de l'aimant collé : le dos, près du talon
    const px = bx - 4.5 - Math.sqrt(ell * ell - (yHaut - py) ** 2);
    const bas = colle ? [bx - 4.5, yHaut] : [px, py + ell];
    const fil = F.corde([[px, py - 6], bas], { ep: 2, debut: 'coupe', fin: 'coupe' }).toString();
    const out = [dessinLame(lm), pince({ ...lm.prise, a: [0, 1] }), aimantRect(bas[0], bas[1])];
    out.push(F.main({ x: px, y: py, pose: 'pince', vue: 'profil', echelle: 0.34, bras: 26, objet: fil }).toString());
    if (!colle) out.push(h.fleche(`M${f(bx - 7)} ${f(yHaut + 5)} Q${f((bx + px) / 2 + 2)} ${f(yHaut + 26)} ${f(px + 7)} ${f(py + ell + 11)}`));
    return { svg: decoupe(id, z, out.join('\n')), bx, hy, px, py, bas, lm };
  };

  // ─── Rangée 2 : la lime sur le fil, la lame couchée, le fil en haut ───
  const vueLime = (z, mord, id) => {
    const bx = Math.round(z.l * 0.3), sy = z.h - 14;
    const lm = lame({ O: [bx, sy], u: [1, 0], v: [0, -1], L: L1, H: H1, T: T1 });
    const C = lm.P([0.36 * L1, H1]);                       // la pointe de la lime, sur le fil
    const d = unit([Math.cos(-7 * Math.PI / 180), Math.sin(-7 * Math.PI / 180)]), n = [d[1], -d[0]];
    const Lf = 112;
    const larg = s => 4.6 + 3.2 * s / Lf;
    const dessous = [0, 0.25, 0.5, 0.75, 1].map(k => add(C, d, k * Lf));
    const dessus = [0, 0.25, 0.5, 0.75, 1].map(k => add(add(C, d, k * Lf), n, larg(k * Lf)));
    const corpsLime = [...dessous, ...dessus.reverse()];
    const ax = add(C, d, Lf), axe = add(ax, n, larg(Lf) / 2);   // l'axe de la lime au talon
    const Q = (s, t) => add(add(axe, d, s), n, t);
    const virole = [Q(0, 5.4), Q(7, 5.4), Q(7, -5.4), Q(0, -5.4)];
    const manche = [Q(7, 6), Q(38, 6.8), ...quad([38, 6.8], [48, 6.8], [48, 0], 5).slice(1).map(([s, t]) => Q(s, t)),
      ...quad([48, 0], [48, -6.8], [38, -6.8], 5).slice(1).map(([s, t]) => Q(s, t)), Q(7, -6)];
    const defs = `<defs><pattern id="p111-lime" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(28)"><line x1="0" y1="0" x2="3" y2="0" stroke="#1A1A1A" stroke-width="0.5"/><line x1="0" y1="0" x2="0" y2="3" stroke="#1A1A1A" stroke-width="0.5"/></pattern></defs>`;
    const out = [defs, dessinLame(lm), pince({ ...lm.prise, a: [1, 0] })];
    if (mord) {
      // l'encoche au point de contact, et la limaille qui tombe
      out.push(h.path(dOf([[C[0] - 5, C[1] - 0.2], [C[0] + 5, C[1] - 0.2], [C[0] + 5, C[1] + 1.6], [C[0] - 5, C[1] + 1.6]], true), A.blanc));
      out.push(h.path(dOf([[C[0] - 5.5, C[1]], [C[0] - 1, C[1] + 3.2], [C[0] + 3.5, C[1] + 3.2], [C[0] + 5.5, C[1]]]), A.arete));
      let g0 = 7; const alea = () => { g0 = (g0 * 16807) % 2147483647; return (g0 - 1) / 2147483646; };
      const specks = Array.from({ length: 24 }, (_, i) => { const dy = 5 + i * 1.9 + alea() * 2; return [(alea() - 0.5) * (5 + dy * 0.45), dy]; });
      specks.forEach(([dx, dy], i) => out.push(i % 3 === 1
        ? h.ligne(C[0] + dx, C[1] + dy, C[0] + dx + 1, C[1] + dy + 2.8, A.detail)
        : h.cercle(C[0] + dx, C[1] + dy, i % 3 ? 1.1 : 0.8, A.plein)));
    }
    out.push(h.path(dOf(corpsLime, true), 'fill="url(#p111-lime)" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"'));
    out.push(h.path(dOf(manche, true), A.hachure('bois', 'arete')), h.path(dOf(virole, true), blanc(A.arete)));
    const fl0 = add(add(C, d, Lf - 8), n, 17), fl1 = add(add(C, d, mord ? 30 : -30), n, 17);
    out.push(h.fleche(`M${f(fl0[0])} ${f(fl0[1])} L${f(fl1[0])} ${f(fl1[1])}`));
    return { svg: decoupe(id, z, out.join('\n')), C, lm, d, n, Lf, bx, sy };
  };

  // ─── Rangée 3 : le revenu différentiel, la lame couchée sur le fil dans un fond d'eau ───
  const geoRev = z => {
    const L = 250, H = 50, T = 46, bx = 112, sy = z.h - 16 - H;
    const lm = lame({ O: [bx, sy], u: [1, 0], v: [0, 1], L, H, T });
    const niv = sy + H - 12, fond = sy + H + 6, rim = sy + 0.62 * H + 2, pg = bx - 8, pd = bx + L + 14;
    const Cf = [bx + 0.5 * L, sy - 1], t = unit([1, -0.4]), nn = [-t[1], t[0]];
    const N = add(Cf, t, 50);
    return { L, H, T, bx, sy, lm, niv, fond, rim, pg, pd, Cf, t, nn, N, yFl: N[1] - 34 };
  };

  return {
    ref: '111-40',
    titre: 'Tremper une lame : l’aimant, l’huile, la lime, le revenu',
    desc: 'Encadré danger : l’eau dans l’huile de trempe. Les gestes de la trempe d’une lame de couteau : l’aimant au bout d’un fil de fer qui colle au dos puis décroche ; la plongée à la verticale dans un bac d’huile fait d’un tuyau soudé sur une base, en remuant dans l’axe de la lame, le couvercle de métal à plat à côté ; la lime qui glisse sur le fil trempé ou qui mord et fait tomber de la limaille ; le revenu différentiel au chalumeau sur le dos, le fil dans un fond d’eau, le dos bleu et le tranchant paille.',
    fichier: 'planche-111-40-tremper-lame.svg',
    format: 'pleine',
    disposition: [['colle', 'decroche', 'trempe'], ['glisse', 'mord'], ['revenu']],
    hauteurs: [2.1, 0.95, 1.55],
    largeurs: [[1, 1, 1.2], [1, 1], [1]],
    vues: {
      colle: {
        titre: 'L’aimant colle : pas prêt',
        dessin: z => vueAimant(z, true, 'vue111-colle').svg,
        renvois: z => {
          const v = vueAimant(z, true, 'x');
          return [
            { n: 1, rond: [16, z.h - 60], cible: [v.bas[0] - 3, v.bas[1] + 10], texte: 'aimant au bout d’un fil de fer' },
            { n: 2, rond: [z.l - 12, v.hy - 30], cible: [v.bx + 3, v.hy + 16], texte: 'sur le dos, au plus épais' },
          ];
        },
      },
      decroche: {
        titre: 'L’aimant décroche : prêt',
        dessin: z => vueAimant(z, false, 'vue111-decroche').svg,
        renvois: z => {
          const v = vueAimant(z, false, 'x');
          return [
            { n: 3, rond: [16, z.h - 40], cible: [v.bas[0] - 3, v.bas[1] + 10], texte: 'il pend : tenir cette couleur, puis sortir' },
          ];
        },
      },
      trempe: {
        titre: 'D’un seul mouvement, à la verticale',
        dessin: z => {
          const cx = Math.round(z.l * 0.34), g = z.h - 6;
          const hyT = g - 7 - 9 - L1;
          const lm = lame({ O: [cx - H1 / 2, hyT], u: [0, 1], v: [1, 0], L: L1, H: H1, T: T1 });
          const ro = 36, ep = 6, rim = hyT - 20, niv = hyT - 8;
          const out = [];
          out.push(h.rect(cx - ro + ep, niv, 2 * (ro - ep), g - 7 - niv, A.hachure('eau', 'aucun')));
          out.push(dessinLame(lm), pince({ ...lm.prise, a: [0, 1] }));
          out.push(h.ligne(cx - ro + ep, niv, cx - H1 / 2, niv, A.arete), h.ligne(cx + H1 / 2 - 0.5, niv, cx + ro - ep, niv, A.arete));
          // les parois du tuyau et la base soudée, en coupe
          out.push(h.rect(cx - ro, rim, ep, g - 7 - rim, A.hachure('metal', 'arete')), h.rect(cx + ro - ep, rim, ep, g - 7 - rim, A.hachure('metal', 'arete')));
          out.push(h.rect(cx - ro - 12, g - 7, 2 * ro + 24, 7, A.hachure('metal', 'arete')));
          out.push(h.path(dOf([[cx - ro, g - 13], [cx - ro, g - 7], [cx - ro - 6, g - 7]], true), A.plein), h.path(dOf([[cx + ro, g - 13], [cx + ro, g - 7], [cx + ro + 6, g - 7]], true), A.plein));
          // le bouillonnement, du côté du fil
          [[5, 34, 1.6], [9, 46, 2.4], [5, 60, 1.8], [10, 74, 2.6], [6, 90, 2], [9, 104, 1.6], [4, 20, 2]].forEach(([dx, dy, r]) =>
            out.push(h.cercle(cx + H1 / 2 + dx, hyT + dy, r, blanc(A.detail))));
          // remuer dans l'axe
          out.push(double(`M${f(cx - H1 / 2 - 8)} ${f(hyT + 30)} L${f(cx - H1 / 2 - 8)} ${f(hyT + 92)}`));
          // le couvercle, à plat à côté
          const lx = cx + ro + 18, lr = z.l - 4;
          out.push(h.rect(lx, g - 5, lr - lx, 5, A.hachure('metal', 'arete')));
          const mx = (lx + lr) / 2;
          out.push(h.path(dOf([[mx - 14, g - 5], [mx - 11, g - 14], [mx + 11, g - 14], [mx + 14, g - 5]]), A.arete));
          out.push(h.ligne(4, g, z.l - 4, g, A.arete));
          return decoupe('vue111-trempe', z, out.join('\n'));
        },
        renvois: z => {
          const cx = Math.round(z.l * 0.34), g = z.h - 6, hyT = g - 7 - 9 - L1;
          return [
            { n: 4, rond: [z.l - 14, hyT - 4], cible: [cx + 33, hyT + 20], texte: 'bac de métal plus creux que la pièce' },
            { n: 5, rond: [14, hyT + 110], cible: [cx - H1 / 2 - 8, hyT + 80], texte: 'remuer dans l’axe, jamais de côté' },
            { n: 6, rond: [z.l - 14, hyT + 70], cible: [cx + H1 / 2 + 11, hyT + 74], texte: 'dedans jusqu’à la fin du bouillonnement' },
            { n: 7, rond: [z.l - 14, g - 26], cible: [z.l - 30, g - 3], texte: 'couvercle de métal à plat, à côté' },
          ];
        },
      },
      glisse: {
        titre: 'La lime glisse : c’est dur',
        dessin: z => vueLime(z, false, 'vue111-glisse').svg,
        renvois: z => {
          const v = vueLime(z, false, 'x');
          return [{ n: 8, rond: [v.C[0] - 20, 14], cible: [v.C[0] + 1, v.C[1] - 1], texte: 'la lime sur le fil, tout de suite' }];
        },
      },
      mord: {
        titre: 'La lime mord : c’est raté',
        dessin: z => vueLime(z, true, 'vue111-mord').svg,
        renvois: z => {
          const v = vueLime(z, true, 'x');
          return [{ n: 9, rond: [v.C[0] - 44, 12], cible: [v.C[0] - 1, v.C[1] + 8], texte: 'la limaille tombe : réchauffer, retremper' }];
        },
      },
      revenu: {
        titre: 'Le revenu différentiel, sur une face polie',
        dessin: z => {
          const g = geoRev(z), { L, H, bx, sy, niv, fond, rim, pg, pd, lm, Cf, t, nn, N } = g;
          const bandes = [['bleu', sy - 2, sy + 12], ['violet', sy + 12, sy + 21], ['bronze', sy + 21, sy + 29], ['paille', sy + 29, sy + H + 2]];
          const ln = (x1, y1, x2, y2, w = 0.5) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#1A1A1A" stroke-width="${w}"/>`;
          const defs = `<defs>
<pattern id="p111-bleu" width="2.4" height="2.4" patternUnits="userSpaceOnUse">${ln(0, 0.5, 2.4, 0.5)}${ln(0.5, 0, 0.5, 2.4)}</pattern>
<pattern id="p111-violet" width="6" height="2.4" patternUnits="userSpaceOnUse">${ln(0, 1, 6, 1)}</pattern>
<pattern id="p111-bronze" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">${ln(0, 0, 0, 4)}</pattern>
<pattern id="p111-paille" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="0.6" fill="#1A1A1A"/><circle cx="4.5" cy="4.5" r="0.6" fill="#1A1A1A"/></pattern>
<clipPath id="k111-corps"><path d="${dOf(lm.corps, true)}" fill="none"/></clipPath>
</defs>`;
          const out = [defs];
          // le bac peu profond, en coupe, et son fond d'eau ; la lame par-dessus, le trait d'eau qui la traverse
          out.push(h.rect(pg, niv, pd - pg, fond - niv, A.hachure('eau', 'aucun')));
          out.push(dessinLame(lm));
          out.push(`<g clip-path="url(#k111-corps)">\n${bandes.map(([nom, y0, y1]) => h.rect(bx - 5, y0, L + 10, y1 - y0, `fill="url(#p111-${nom})" stroke="none"`)).join('\n')}\n</g>`);
          out.push(h.path(dOf(lm.contour, true), A.contour), h.path(dOf(lm.biseau), A.fin));
          out.push(h.ligne(pg, niv, pd, niv, A.detail));
          out.push(h.rect(pg - 6, rim, 6, fond - rim, A.hachure('metal', 'arete')), h.rect(pd, rim, 6, fond - rim, A.hachure('metal', 'arete')));
          out.push(h.rect(pg - 6, fond, pd - pg + 12, 6, A.hachure('metal', 'arete')));
          out.push(pince({ ...lm.prise, a: [1, 0], k: 1.6 }));
          // la flamme : un jet qui frappe le dos et s'étale le long du dos
          const Qn = (s, u) => add(add(N, t, s), nn, u);
          const P = p => `${f(p[0])} ${f(p[1])}`;
          const c = (dx, dy) => P([Cf[0] + dx, Cf[1] + dy]);
          out.push(h.path(`M${P(Qn(0, -8))} Q${P(Qn(-18, -15))} ${c(-26, -4)} Q${c(-37, -1)} ${c(-49, -4)} Q${c(-54, -8)} ${c(-47, -11)}`, A.detail));
          out.push(h.path(`M${P(Qn(0, 5))} Q${P(Qn(-10, 4))} ${P(Qn(-19, 0))} Q${P(Qn(-10, -4))} ${P(Qn(0, -5))}`, A.detail));
          out.push(h.path(`M${P(Qn(0, 8))} Q${P(Qn(-15, 12))} ${c(8, -2)} Q${c(20, -1)} ${c(26, -6)} Q${c(28, -11)} ${c(22, -11)}`, A.detail));
          // le chalumeau : la buse évasée et ses prises d'air, le tube, le robinet moleté
          out.push(h.path(dOf([Qn(0, 10.5), Qn(34, 8.5), Qn(34, -8.5), Qn(0, -10.5)], true), blanc(A.arete)));
          out.push(h.ligne(...Qn(4, 10.2), ...Qn(4, -10.2), A.fin));
          [[22, 3.5], [22, -3.5]].forEach(([s, u]) => out.push(h.path(dOf([Qn(s, u + 1.8), Qn(s + 7, u + 1.8), Qn(s + 7, u - 1.8), Qn(s, u - 1.8)], true), A.plein)));
          out.push(h.path(dOf([Qn(34, 4.5), Qn(118, 4.5), Qn(118, -4.5), Qn(34, -4.5)], true), blanc(A.arete)));
          out.push(h.path(dOf([Qn(118, 9), Qn(136, 9), Qn(136, -9), Qn(118, -9)], true), blanc(A.arete)));
          [121, 124, 127, 130, 133].forEach(s => out.push(h.ligne(...Qn(s, 9), ...Qn(s, -9), A.fin)));
          // le raccord vers la bonbonne, coupé net (la bonbonne continue hors de la vue)
          out.push(h.path(dOf([Qn(136, 6.5), Qn(162, 6.5), Qn(165, 3), Qn(160, 0), Qn(164, -3), Qn(161, -6.5), Qn(136, -6.5)], true), blanc(A.arete)));
          // promener le chalumeau le long du dos
          out.push(double(`M${f(N[0] - 58)} ${f(g.yFl)} L${f(N[0] + 34)} ${f(g.yFl)}`));
          return decoupe('vue111-revenu', z, out.join('\n'));
        },
        renvois: z => {
          const { L, H, bx, sy, niv, Cf, N } = geoRev(z);
          return [
            { n: 10, rond: [z.l - 30, 58], cible: [(Cf[0] + N[0]) / 2 + 4, (Cf[1] + N[1]) / 2 + 2], texte: 'flamme sur le dos, jamais sur le fil' },
            { n: 11, rond: [z.l - 30, sy + 8], cible: [bx + 0.66 * L, sy + 10], texte: 'du dos vers le fil : bleu, violet, bronze' },
            { n: 12, rond: [z.l - 30, niv + 14], cible: [bx + 0.72 * L, sy + H - 3], texte: 'fil dans un fond d’eau : reste paille' },
          ];
        },
      },
    },
    danger: 'Ni eau, ni neige, ni givre dans le bac ou sur la pince : sous l’huile chaude, l’eau se vaporise d’un coup et projette l’huile en feu au visage. Huile en feu : le couvercle dessus, la pièce dedans, jamais d’eau.',
  };
};
