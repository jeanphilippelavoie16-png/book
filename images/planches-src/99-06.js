// Planche 99-06 — la bouture de gadellier. Chapitre 99, étape 41 « Bouturer le gadellier » : à la
// fin de l'automne, des tiges de l'été prises sur un plant sain, coupées en bouts de 15 à 20 cm, le
// bas juste sous un bourgeon, le haut environ 10 mm au-dessus d'un bourgeon ; piquées tout de suite
// à 15 cm les unes des autres, dans une terre qui s'égoutte, assez profond pour qu'un ou deux
// bourgeons seulement dépassent ; puis de la paille par-dessus, qui reste en paillis au printemps.
// Les seules cotes sont celles du chapitre : 150 à 200 mm, 10 mm, 150 mm. L'écart des bourgeons,
// la grosseur de la tige et l'épaisseur de paille ne sont pas donnés : dessinés, pas cotés.
// Les bourgeons pointent vers le bout de la tige, comme sur le plant : c'est ce qui dit le haut.
module.exports = (h) => {
  const A = h.a, NL = String.fromCharCode(10);
  const r1 = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const bA = blanc(A.arete), bD = blanc(A.detail);
  const MIXTE = 'fill="none" stroke="#1A1A1A" stroke-width="0.7" stroke-dasharray="8 3 1.5 3" stroke-linecap="round"';
  const alea = g => { let s = g; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  const add = (p, v, f = 1) => [p[0] + v[0] * f, p[1] + v[1] * f];
  const d = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${r1(p[0])} ${r1(p[1])}`).join(' ');

  // ─── une tige paramétrée en mm le long de son axe ──────────────────────────────────────
  // ctrl : quatre points de Bézier en px, du bas vers le bout ; s de sDebut (bas) à sFin (haut).
  const courbe = (ctrl, sDebut, sFin) => {
    const bz = t => { const u = 1 - t; return [0, 1].map(j => u * u * u * ctrl[0][j] + 3 * u * u * t * ctrl[1][j] + 3 * u * t * t * ctrl[2][j] + t * t * t * ctrl[3][j]); };
    const N = 800, pts = [], cum = [0];
    for (let i = 0; i <= N; i++) {
      pts.push(bz(i / N));
      if (i) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    }
    const k = cum[N] / (sFin - sDebut);
    const P = s => {
      const dd = Math.max(0, Math.min(cum[N], (s - sDebut) * k));
      let i = 1; while (i < N && cum[i] < dd) i++;
      const t = (dd - cum[i - 1]) / ((cum[i] - cum[i - 1]) || 1);
      return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t];
    };
    const T = s => {
      const a = P(Math.max(sDebut, s - 1)), b = P(Math.min(sFin, s + 1));
      const n = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1; return [(b[0] - a[0]) / n, (b[1] - a[1]) / n];
    };
    const Nm = s => { const t = T(s); return [-t[1], t[0]]; };   // la normale : à droite quand la tige monte
    return { P, T, N: Nm, k };
  };

  // Le contour de la tige : les deux flancs, le bas coupé (demi-ellipse vue d'un peu au-dessus)
  // ou ouvert, le haut fermé droit (la face coupée vient par-dessus) ou en pointe.
  const flancs = (c, s0, s1, w, bas) => {
    const n = Math.max(12, Math.ceil((s1 - s0) * c.k / 3));
    const G = [], D = [];
    for (let i = 0; i <= n; i++) {
      const s = s0 + (s1 - s0) * i / n, p = c.P(s), nm = c.N(s), r = w(s) * c.k / 2;
      G.push(add(p, nm, -r)); D.push(add(p, nm, r));
    }
    let fond = [];
    if (bas === 'coupe') {
      const p = c.P(s0), nm = c.N(s0), t = c.T(s0), r = w(s0) * c.k / 2;
      for (let i = 1; i < 12; i++) { const f = Math.PI * i / 12; fond.push(add(add(p, nm, -r * Math.cos(f)), t, -0.32 * r * Math.sin(f))); }
    }
    return { G, D, fond };
  };
  const dTige = (c, s0, s1, w, bas) => {
    const { G, D, fond } = flancs(c, s0, s1, w, bas);
    return `${d([...fond, ...D, ...G.slice().reverse()])} Z`;
  };
  const tige = (c, s0, s1, w, { bas = 'coupe', trait = bA } = {}) => `<path d="${dTige(c, s0, s1, w, bas)}" ${trait}/>`;
  // Tout sauf la tige : le trait d'un bourgeon s'arrête au flanc, et le blanc du bourgeon, posé
  // par-dessus, interrompt le flanc à sa base. Le bourgeon sort de la tige au lieu d'y être collé.
  let nClip = 0;
  const horsTige = dt => {
    const id = `k9906-t${nClip++}`;
    return { id, def: `<clipPath id="${id}"><path d="M-2000 -2000 H4000 V4000 H-2000 Z ${dt}" fill="none" clip-rule="evenodd"/></clipPath>` };
  };
  // La face coupée du haut : une ellipse vue d'un peu au-dessus, l'écorce et la moelle.
  const face = (c, s, w) => {
    const p = c.P(s), nm = c.N(s), t = c.T(s), r = w * c.k / 2;
    const ell = f => Array.from({ length: 28 }, (_, i) => { const a = 2 * Math.PI * i / 28; return add(add(p, nm, r * f * Math.cos(a)), t, 0.32 * r * f * Math.sin(a)); });
    return [`<path d="${d(ell(1))} Z" ${bA}/>`, `<path d="${d(ell(0.72))} Z" ${A.fin}/>`, h.cercle(p[0], p[1], Math.max(0.8, r * 0.16), A.plein)].join('\n');
  };
  // Un bourgeon : une amande pointue, penchée vers le bout de la tige. Repère local : u le long du
  // bourgeon depuis le flanc, v en travers. Il se dessine APRÈS la tige : son blanc couvre le flanc
  // à sa base, son trait est découpé hors de la tige (horsTige).
  const repere = (c, s, cote, w, lg, la, angle) => {
    const t = c.T(s), nm = c.N(s), r = w(s) * c.k / 2;
    const a = angle * Math.PI / 180;
    const dir = [t[0] * Math.cos(a) + nm[0] * cote * Math.sin(a), t[1] * Math.cos(a) + nm[1] * cote * Math.sin(a)];
    let e = [-dir[1], dir[0]];
    if ((e[0] * nm[0] + e[1] * nm[1]) * cote < 0) e = [-e[0], -e[1]];
    const b = add(c.P(s), nm, cote * r);
    return { q: (u, v) => add(add(b, dir, u), e, v), L: lg * c.k, Wb: la * c.k };
  };
  const bourgeon = (c, s, cote, w, { lg = 7, la = 4.4, angle = 40, trait = A.arete } = {}, clip) => {
    const { q, L, Wb } = repere(c, s, cote, w, lg, la, angle);
    const f = p => `${r1(p[0])} ${r1(p[1])}`;
    const pth = `M${f(q(-0.12 * L, 0.3 * Wb))} C${f(q(0.12 * L, 0.66 * Wb))} ${f(q(0.58 * L, 0.6 * Wb))} ${f(q(L, 0))} C${f(q(0.62 * L, -0.56 * Wb))} ${f(q(0.18 * L, -0.62 * Wb))} ${f(q(-0.12 * L, -0.3 * Wb))} Z`;
    const out = [`<path d="${pth}" fill="#FFFFFF" stroke="none"/>`, `<g clip-path="url(#${clip})">`, `<path d="${pth}" ${trait}/>`];
    // l'écaille du dessous qui enveloppe l'autre : un trait fin vers la pointe
    if (L > 7) out.push(`<path d="M${f(q(0.16 * L, 0.5 * Wb))} Q${f(q(0.62 * L, 0.34 * Wb))} ${f(q(0.9 * L, 0.04 * Wb))}" ${A.fin}/>`);
    out.push('</g>');
    return out.join(NL);
  };
  const centreBourgeon = (c, s, cote, w, lg = 7, la = 4.4, angle = 40) => repere(c, s, cote, w, lg, la, angle).q(0.45 * lg * c.k, 0.15 * la * c.k);

  // Les bourgeons d'un bout : le premier 3 mm au-dessus de la coupe du bas, puis tous les 30 mm,
  // en alternance ; la coupe du haut 10 mm au-dessus du sixième. Un bout de 163 mm.
  const BOURG = [3, 33, 63, 93, 123, 153], LONG = 163;
  const cotes = [1, -1, 1, -1, 1, 1];     // le dernier à droite : la cote de 10 mm s'y accroche
  const wBout = s => 7 - 0.8 * s / LONG;
  const bout = (c, s0, s1, opts = {}) => {
    const dt = dTige(c, s0, s1, wBout, opts.bas || 'coupe'), hk = horsTige(dt);
    const o = [hk.def, `<path d="${dt}" ${opts.trait || bA}/>`];
    BOURG.forEach((sb, i) => { if (sb > s0 && sb < s1) o.push(bourgeon(c, sb, cotes[i], wBout, opts.bourgeon, hk.id)); });
    return o.join('\n');
  };

  // Le bourgeon du bout d'une tige : une goutte droite dans l'axe.
  const bourgeonBout = (c, s, w, lg, la, trait = bD) => {
    const t = c.T(s), nm = c.N(s), r = w(s) * c.k / 2, L = lg * c.k, Wb = la * c.k;
    const b = c.P(s), f = p => `${r1(p[0])} ${r1(p[1])}`;
    const q = (u, v) => add(add(b, t, u), nm, v);
    const g = Math.min(r * 0.95, Wb / 2);
    return [`<path d="M${f(q(-0.3 * Wb, -g))} C${f(q(0.25 * L, -0.62 * Wb))} ${f(q(0.7 * L, -0.3 * Wb))} ${f(q(L, 0))} C${f(q(0.7 * L, 0.3 * Wb))} ${f(q(0.25 * L, 0.62 * Wb))} ${f(q(-0.3 * Wb, g))}" ${trait}/>`,
      `<path d="M${f(q(0.2 * L, 0.3 * Wb))} Q${f(q(0.6 * L, 0.14 * Wb))} ${f(q(0.92 * L, 0))}" ${A.fin}/>`].join(NL);
  };

  // ─── Vue 1 : sur le plant ───────────────────────────────────────────────────────────────
  // La tige de l'été au bout d'une branche de bois plus vieux, à la fin de l'automne, sans
  // feuilles. s = 0 au bourrelet où la pousse de l'été commence ; la branche sort de la vue par
  // le bas. Les grosseurs sont forcées (× 1,6) pour que la tige se lise à cette échelle : aucune
  // cote dans cette vue. Les traits mixtes : les coupes, bout par bout, comme la vue 2.
  const SA0 = -190, SAT = 440, EX = 1.6;
  const BA = [14, 44, 74, 104, 134, 164, 194, 224, 254, 284, 314, 344, 374, 404];
  const COUPES = [41, 204, 221, 384];
  const gA = z => {
    const x0 = z.l * 0.42;
    const c = courbe([[x0 - 12, z.h + 30], [x0 - 34, z.h * 0.56], [x0 + 52, z.h * 0.3], [x0 + 30, 18]], SA0, SAT);
    return { c };
  };
  const wVieux = s => EX * (10.5 - 1.5 * Math.min(1, Math.max(0, (s + 40) / 40)));
  const wEte = s => EX * (7.2 - 3.0 * s / SAT);
  const plant = z => {
    const { c } = gA(z);
    const o = [`<clipPath id="k9906-a"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`, '<g clip-path="url(#k9906-a)">'];
    // le bois plus vieux : plus gros, l'écorce gercée en long
    o.push(tige(c, SA0, 2, wVieux, { bas: 'ouvert' }));
    const rr = alea(9906);
    for (let i = 0; i < 16; i++) {
      const s = SA0 + 25 + rr() * 170, lg = 10 + rr() * 20, cote = (rr() - 0.5) * 0.9;
      const w = wVieux(s) * c.k / 2;
      o.push(h.chemin([add(c.P(s), c.N(s), cote * w), add(c.P(s + lg * 0.5), c.N(s + lg * 0.5), cote * w + 0.8), add(c.P(s + lg), c.N(s + lg), cote * w)], A.fin));
    }
    // la tige de l'été : lisse, un bourgeon à chaque nœud, en alternance, le bourgeon du bout ;
    // à sa base, les anneaux serrés où la pousse de l'été a commencé
    const dEte = dTige(c, 0, SAT - 9, wEte, 'ouvert'), hkE = horsTige(dEte);
    o.push(hkE.def, `<path d="${dEte}" ${bA}/>`);
    BA.forEach((s, i) => o.push(bourgeon(c, s, i % 2 ? -1 : 1, wEte, { lg: 11, la: 7, angle: 34, trait: A.detail }, hkE.id)));
    for (const s of [2.5, 5.5, 8.5]) {
      const p = c.P(s), nm = c.N(s), w = wEte(s) * c.k / 2;
      o.push(h.chemin([add(p, nm, -w), add(p, c.T(s), 0.6), add(p, nm, w)], A.fin));
    }
    o.push(bourgeonBout(c, SAT - 10, wEte, 12, 6.5));
    // les coupes
    for (const s of COUPES) {
      const p = c.P(s), nm = c.N(s), w = wEte(s) * c.k / 2 + 13;
      o.push(h.ligne(...add(p, nm, -w), ...add(p, nm, w), MIXTE));
    }
    o.push('</g>');
    return o.join(NL);
  };

  // ─── Vue 2 : un bout, en grand ──────────────────────────────────────────────────────────
  const gB = z => {
    const k = Math.min(2.3, (z.h - 44) / LONG);
    const x = z.l * 0.5, yb = z.h - 16, yt = yb - LONG * k;
    const c = courbe([[x, yb], [x, yb - 10], [x, yt + 10], [x, yt]], 0, LONG);
    return { c, k, x, yb, yt };
  };
  const unBout = z => {
    const { c, k, x, yb, yt } = gB(z);
    const o = [bout(c, 0, LONG), face(c, LONG, wBout(LONG))];
    // la longueur, à gauche
    const xg = x - 58;
    o.push(h.ligne(x - 6, yb, xg - 5, yb, A.fin), h.ligne(x - 6, yt, xg - 5, yt, A.fin));
    o.push(h.cote(xg, yb, xg, yt, '150 à 200 mm', { cote: 'gauche' }));
    // 10 mm du sixième bourgeon à la coupe du haut, à droite
    const xd = x + 34, yn = c.P(BOURG[5])[1];
    o.push(h.ligne(x + wBout(153) * k / 2 + 13, yn, xd + 5, yn, A.fin), h.ligne(x + 6, yt, xd + 5, yt, A.fin));
    o.push(h.cote(xd, yn, xd, yt, '10 mm', { cote: 'droite' }));
    return o.join('\n');
  };

  // ─── Vues 3 et 4 : piquer, puis pailler ─────────────────────────────────────────────────
  // Le rang en coupe. Le sol passe 13 mm sous le cinquième bourgeon : deux bourgeons dehors.
  const SOL = 110, PAILLE = 26, PETIT = { bourgeon: { lg: 9, la: 6, angle: 34, trait: A.detail } };
  const gR = z => {
    const k = Math.min(0.95, (z.h - 22) / (LONG + 12 + SOL + 14));
    const yg = 12 + (LONG + 12) * k;
    const x1 = (z.l - 300 * k) / 2 - 8;
    const xs = [x1, x1 + 150 * k, x1 + 300 * k];
    const bouture = (x, y0) => courbe([[x, y0], [x, y0 - 10], [x, y0 - LONG * k + 10], [x, y0 - LONG * k]], 0, LONG);
    return { k, yg, xs, bouture };
  };
  const sol = (z, g) => {
    const o = [];
    const bord = [];
    for (let x = 0; x <= z.l; x += 6) bord.push([x, g.yg + 1.3 * Math.sin(x * 0.09) + 0.8 * Math.sin(x * 0.23 + 1)]);
    o.push(`<path d="${d([...bord, [z.l, z.h], [0, z.h]])} Z" ${A.hachure('terre', 'aucun')}/>`);
    o.push(h.chemin(bord, A.contour));
    return o.join('\n');
  };
  const piquer = z => {
    const g = gR(z);
    const o = [sol(z, g)];
    for (const x of g.xs.slice(0, 2)) {
      const c = g.bouture(x, g.yg + SOL * g.k);
      o.push(bout(c, 0, LONG, PETIT), face(c, LONG, wBout(LONG)));
    }
    // le troisième, tenu droit, le bas sur la terre : on l'enfonce
    const c3 = g.bouture(g.xs[2], g.yg - 1);
    o.push(bout(c3, 0, LONG, PETIT), face(c3, LONG, wBout(LONG)));
    const xf = g.xs[2] + 22;
    o.push(h.fleche(`M${r1(xf)} ${r1(g.yg - 150 * g.k)} L${r1(xf)} ${r1(g.yg - 58 * g.k)}`, A.arete));
    // l'écart des boutures, entre les deux premières
    const yc = g.yg - 72 * g.k, ytop = g.yg - (LONG - SOL) * g.k;
    for (const x of g.xs.slice(0, 2)) o.push(h.ligne(x, ytop - 8, x, yc - 6, A.fin));
    o.push(h.cote(g.xs[0], yc, g.xs[1], yc, '150 mm'));
    return o.join('\n');
  };
  const pailler = z => {
    const g = gR(z);
    const o = [sol(z, g)];
    for (const x of g.xs) {
      const c = g.bouture(x, g.yg + SOL * g.k);
      o.push(bout(c, 0, LONG, PETIT), face(c, LONG, wBout(LONG)));
    }
    // la paille : une couche lâche de brins couchés en tous sens, sans contour ; quelques brins
    // dépassent du dessus. Le blanc cache le bas des boutures : seul leur bout sort.
    const rr = alea(4242), dessus = [];
    const yp = g.yg - PAILLE * g.k;
    for (let x = -4; x <= z.l + 4; x += 6) dessus.push([x, yp + (rr() - 0.5) * 4 + 1.6 * Math.sin(x * 0.06)]);
    const forme = [...dessus, [z.l + 4, g.yg - 1.4], [-4, g.yg - 1.4]];
    o.push(`<path d="${d(forme)} Z" ${A.blanc}/>`);
    const brin = (x, y, lg, a, courbure) => {
      const x2 = x + lg * Math.cos(a), y2 = y + lg * Math.sin(a);
      const mx = (x + x2) / 2 - courbure * Math.sin(a), my = (y + y2) / 2 + courbure * Math.cos(a);
      return `<path d="M${r1(x)} ${r1(y)} Q${r1(mx)} ${r1(my)} ${r1(x2)} ${r1(y2)}" fill="none" stroke="#1A1A1A" stroke-width="0.5" stroke-linecap="round"/>`;
    };
    const brins = [];
    const n = Math.round(z.l * PAILLE * g.k / 26);
    for (let i = 0; i < n; i++) {
      const x = -10 + rr() * (z.l + 12), y = yp - 3 + rr() * (PAILLE * g.k + 4);
      const a = (rr() < 0.8 ? (rr() - 0.5) * 0.7 : (rr() - 0.5) * 2.4), lg = 9 + rr() * 11;
      brins.push(brin(x, y, lg, a, (rr() - 0.5) * 3));
    }
    o.push(`<clipPath id="k9906-p"><path d="${d(forme)} Z" fill="none"/></clipPath>`, '<g clip-path="url(#k9906-p)">', ...brins, '</g>');
    for (let i = 0; i < 16; i++) {
      const x = 4 + rr() * (z.l - 20), p = dessus[Math.max(0, Math.min(dessus.length - 1, Math.round((x + 4) / 6)))];
      o.push(brin(x, p[1] + 2, 8 + rr() * 7, -0.15 - rr() * 0.5, (rr() - 0.5) * 2));
    }
    return o.join(NL);
  };

  return {
    ref: '99-06',
    titre: 'La bouture de gadellier',
    desc: 'La bouture de gadellier en quatre temps. Sur le plant, à la fin de l’automne : la tige de '
      + 'l’été, lisse, au bout d’une branche de bois plus vieux, et les traits où la couper en bouts. '
      + 'Un bout en grand : 150 à 200 mm, coupé en bas juste sous un bourgeon et en haut environ 10 mm '
      + 'au-dessus d’un bourgeon ; les bourgeons pointent vers le haut. Piquer : le rang en coupe, les '
      + 'bouts à 150 mm les uns des autres, enfoncés jusqu’à ce que deux bourgeons seulement dépassent '
      + 'de la terre. Pailler : le rang couvert d’une couche de paille, le bout des boutures qui sort.',
    format: 'pleine',
    disposition: [['plant', 'bout'], ['piquer', 'pailler']],
    hauteurs: [5, 3],
    largeurs: [[1, 1], [1, 1]],
    vues: {
      plant: {
        titre: 'Sur le plant, à la fin de l’automne',
        dessin: plant,
        renvois: z => {
          const { c } = gA(z);
          const pv = c.P(-105), pe = c.P(290), pc = c.P(212);
          return [
            { n: 1, rond: [pv[0] - 60, pv[1] + 10], cible: add(pv, c.N(-105), -wVieux(-105) * c.k / 2 - 1), texte: 'bois de deux ans et plus' },
            { n: 2, rond: [pe[0] + 62, pe[1] + 6], cible: add(pe, c.N(290), wEte(290) * c.k / 2 + 1), texte: 'tige de l’été, plant sain' },
            { n: 3, rond: [pc[0] - 62, pc[1] + 4], cible: add(pc, c.N(212), -wEte(212) * c.k / 2 - 11), texte: 'coupes, bout par bout' },
          ];
        },
      },
      bout: {
        titre: 'Un bout',
        dessin: unBout,
        renvois: z => {
          const { c, k, x, yb, yt } = gB(z);
          const pb = centreBourgeon(c, BOURG[2], cotes[2], wBout);
          return [
            { n: 4, rond: [x + 50, yt - 12], cible: [x + 4, yt - 1], texte: 'haut : 10 mm au-dessus' },
            { n: 5, rond: [x + 62, pb[1] - 30], cible: pb, texte: 'bourgeon' },
            { n: 6, rond: [x + 50, yb + 2], cible: [x + 5, yb], texte: 'bas : juste sous un bourgeon' },
          ];
        },
      },
      piquer: {
        titre: 'Piquer tout de suite',
        dessin: piquer,
        renvois: z => {
          const g = gR(z);
          const pb = [g.xs[0] + wBout(140) * g.k / 2 + 1, g.yg - (140 - SOL) * g.k];
          return [
            { n: 7, rond: [z.l - 22, z.h - 18], cible: [z.l - 50, z.h - 40], texte: 'terre qui s’égoutte' },
            { n: 8, rond: [g.xs[0] + 46, g.yg - 36], cible: pb, texte: 'un ou deux bourgeons dehors' },
          ];
        },
      },
      pailler: {
        titre: 'Couvrir de paille',
        dessin: pailler,
        renvois: z => {
          const g = gR(z);
          return [
            { n: 9, rond: [g.xs[1] + 62, g.yg - 52], cible: [g.xs[1] + 48, g.yg - PAILLE * g.k / 2], texte: 'paille, laissée en paillis' },
          ];
        },
      },
    },
  };
};
