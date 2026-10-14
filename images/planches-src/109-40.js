// Planche 109-40 — lever et caler au fur et à mesure.
// Chapitre 109 : § 5-C « Lever un coin de bâtiment » (plaque ou madrier sous le socle, vérin
// strictement vertical, lever par une extrémité, caler à chaque montée, le vérin n'est pas un
// support) ; point 10 de la manœuvre (caler au fur et à mesure) ; variante d'urgence « Monter
// une charge d'un mètre au levier et aux cales » (barre ou perche de bois franc, appui le plus
// près possible de la charge, on décolle de quelques centimètres, la cale poussée au bâton
// pendant que c'est en l'air, on redescend, on remonte l'appui sur une pile à côté ; pile en
// croix, deux pièces dans un sens, deux dans l'autre, portant aux quatre coins ; jamais de
// pierres ni de rondins ronds sauf équarris sur deux faces) ; tableau du matériel (billes
// équarries sur deux faces, madriers, chevrons, bûches fendues posées sur leur face plate).
// Le chapitre ne donne aucune mesure de cale ni de pile : aucune cote.
//
// Vue en perspective cavalière : x vers la droite, y vers le haut, d en profondeur (fuyante à
// 30°, réduite de moitié). Le coin du bâtiment est en x = 0 ; la lisse du long pan court vers la
// gauche (façade en d = 0), celle du pignon fuit vers l'arrière. Les cales du dessus de la pile
// croisent la lisse qu'elles portent : elles fuient en profondeur, et la cale nouvelle se pousse
// donc de l'avant, au bâton. Le levier, lui, est perpendiculaire à la lisse du pignon qu'il
// soulève : il est dans le plan du dessin, et l'homme de profil avec lui.
module.exports = (h) => {
  const A = h.a;
  // 13 oct. : l'homme penché sur le levier est le corps simple (pose « levier »), ses bras calculés
  // par poserBras. La charte : la face de droite des cales à l'ombre ; le rouge sur le vérin
  // d'aplomb (le point à contrôler) et sur la poussée du levier.
  const F = h.formes;
  const BL = '#FFFFFF';
  const FOND = `fill="${BL}" stroke="none"`;
  const blanc = t => A[t].replace('fill="none"', `fill="${BL}"`);
  const f = v => Math.round(v * 100) / 100;
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const poly = (pts, ferme = true) => 'M ' + pts.map(pt).join(' L ') + (ferme ? ' Z' : '');
  const KC = 0.5 * Math.cos(Math.PI / 6), KS = 0.5 * Math.sin(Math.PI / 6);
  const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k];
  // ─── les corps simples ─────────────────────────────────────────────────────────────────
  // Les bras d'un corps simple, calculés pour que chaque poing tombe sur sa cible (unités de vue),
  // l'axe de la prise donné en degrés écran (null : la prise vue par le bout, le poignet droit).
  // Le corps regarde vers +x ; pour un corps tourné vers la
  // gauche, poserBras le calcule en miroir autour de o.x et rend les mêmes angles.
  const RAD = Math.PI / 180;
  const poserBras = (o, cibles, axes, coudes = {}) => {
    const g = o.cote === 'gauche', X0 = o.x;
    const oo = Object.assign({}, o, { cote: 'droite' });
    const c = F.corps(oo), ang = Object.assign({}, o.angles || {});
    const angDe = v => Math.atan2(v[0], v[1]) / RAD, dirDe = a => [Math.sin(a * RAD), Math.cos(a * RAD)];
    for (const k of ['P', 'L']) {
      let C = cibles[k]; if (!C) continue;
      let ax = axes[k];
      if (g) { C = [2 * X0 - C[0], C[1]]; if (ax != null) ax = 180 - ax; }
      const S = c.articulations['epaule' + k], E_ = c.articulations['coude' + k], Wr = c.articulations['poignet' + k], Mn = c['main' + k];
      const lb = Math.hypot(E_[0] - S[0], E_[1] - S[1]), la = Math.hypot(Wr[0] - E_[0], Wr[1] - E_[1]);
      const hv = [Mn.x - Wr[0], Mn.y - Wr[1]], lm = Math.hypot(...hv);
      const off = angDe(hv) - angDe([Math.cos(Mn.axe * RAD), Math.sin(Mn.axe * RAD)]);
      const resoudre = main => {
        const h2 = dirDe(main + off).map(v => v * lm), W_ = [C[0] - h2[0], C[1] - h2[1]];
        const d = [W_[0] - S[0], W_[1] - S[1]], D = Math.min(Math.hypot(...d), lb + la - 0.01);
        const a0 = angDe(d), B = Math.acos(Math.max(-1, Math.min(1, (lb * lb + D * D - la * la) / (2 * lb * D)))) / RAD;
        const bras = a0 + (coudes[k] === 'avant' ? 1 : -1) * B;
        const e = [S[0] + lb * Math.sin(bras * RAD), S[1] + lb * Math.cos(bras * RAD)];
        const ab = angDe([W_[0] - e[0], W_[1] - e[1]]);
        const pli = Math.abs(((main - ab) % 360 + 540) % 360 - 180);
        return { pli, bras, ab, main };
      };
      let best = null;
      if (ax == null) {                 // la prise vue par le bout : le poignet droit, la main dans l'axe de l'avant-bras
        let main = angDe([Math.cos(Mn.axe * RAD), Math.sin(Mn.axe * RAD)]);
        for (let i = 0; i < 5; i++) { best = resoudre(main); main = best.ab; }
        best = resoudre(main);
      } else for (const main of [180 - ax, -ax, 360 - ax]) { const r = resoudre(main); if (!best || r.pli < best.pli) best = r; }
      ang['bras' + k] = best.bras; ang['avantbras' + k] = best.ab; ang['main' + k] = best.main;
    }
    return ang;
  };
  // le poing d'un corps simple, sous la forme qu'attend poignee() : sa place et l'axe de la prise
  const poingDe = (c, k) => { const m = c['main' + k]; return { trou: { x: m.x, y: m.y, axe: [Math.cos(m.angle * RAD), Math.sin(m.angle * RAD)] } }; };
  const versDeg = (a, b) => Math.atan2(b[1] - a[1], b[0] - a[0]) / RAD;

  // ─── le repère oblique ─────────────────────────────────────────────────────────────────
  const unite = p => [p[0] + p[2] * KC, -(p[1] + p[2] * KS)];
  const cadrer = (z, pts, m = [10, 10, 10, 10]) => {        // m : haut, droite, bas, gauche
    const u = pts.map(unite);
    const x0 = Math.min(...u.map(p => p[0])), x1 = Math.max(...u.map(p => p[0]));
    const y0 = Math.min(...u.map(p => p[1])), y1 = Math.max(...u.map(p => p[1]));
    const L = z.l - m[1] - m[3], H = z.h - m[0] - m[2];
    const s = Math.min(L / (x1 - x0), H / (y1 - y0));
    const ox = m[3] + (L - s * (x1 - x0)) / 2 - s * x0;
    const oy = m[0] + (H - s * (y1 - y0)) - s * y0;
    const R = p => [ox + s * (p[0] + p[2] * KC), oy - s * (p[1] + p[2] * KS)];
    return { s, R };
  };

  // ─── le bois : cernes sur le bois de bout, fil sur les faces longues ───────────────────
  // Une face plane : origine o, axes U et V (vecteurs unitaires 3D), longueurs la et lb.
  const surFace = (R, fc) => (a, b) => R([fc.o[0] + fc.U[0] * a + fc.V[0] * b, fc.o[1] + fc.U[1] * a + fc.V[1] * b, fc.o[2] + fc.U[2] * a + fc.V[2] * b]);
  const cernes = (R, fc) => {
    const q = surFace(R, fc), m = 0.12 * Math.min(fc.la, fc.lb);
    const c = [fc.la * 0.56, -fc.lb * 0.55], out = [];
    for (const r of [0.75, 1.05, 1.38].map(k => k * fc.lb)) {
      let seg = [];
      for (let t = 0; t <= 360; t += 3) {
        const a = c[0] + r * Math.cos(t * Math.PI / 180), b = c[1] + r * Math.sin(t * Math.PI / 180);
        if (a > m && a < fc.la - m && b > m && b < fc.lb - m) seg.push(q(a, b));
        else { if (seg.length > 1) out.push(h.path(poly(seg, false), A.fin)); seg = []; }
      }
      if (seg.length > 1) out.push(h.path(poly(seg, false), A.fin));
    }
    return out;
  };
  // le fil : deux ou trois traits interrompus le long de la pièce
  const fil = (R, fc, rangs) => {
    const q = surFace(R, fc), out = [];
    rangs.forEach((b, i) => {
      const bouts = i % 2 ? [[0.1, 0.38], [0.47, 0.9]] : [[0.05, 0.55], [0.63, 0.82]];
      for (const [a0, a1] of bouts) out.push(h.path(poly([q(fc.la * a0, fc.lb * b), q(fc.la * a1, fc.lb * b)], false), A.fin));
    });
    return out;
  };

  // Une pièce équarrie : b = [x0, x1, y0, y1, d0, d1] ; sens 'x' (le long du dessin) ou 'd'
  // (en profondeur). On voit l'avant, le dessus et le côté droit.
  const boite = (R, b, sens, trait = 'arete') => {
    const [x0, x1, y0, y1, d0, d1] = b;
    const q = (x, y, d) => R([x, y, d]);
    const sil = [q(x0, y0, d0), q(x1, y0, d0), q(x1, y0, d1), q(x1, y1, d1), q(x0, y1, d1), q(x0, y1, d0)];
    const out = [h.path(poly(sil), FOND),
      // la face de droite, à l'ombre (la lumière vient d'en haut à gauche)
      h.path(poly([q(x1, y0, d0), q(x1, y0, d1), q(x1, y1, d1), q(x1, y1, d0)]), A.ombre)];
    const avant = { o: [x0, y0, d0], U: [1, 0, 0], V: [0, 1, 0], la: x1 - x0, lb: y1 - y0 };
    const dessus = { o: [x0, y1, d0], U: [1, 0, 0], V: [0, 0, 1], la: x1 - x0, lb: d1 - d0 };
    const droite = { o: [x1, y0, d0], U: [0, 0, 1], V: [0, 1, 0], la: d1 - d0, lb: y1 - y0 };
    const dessusD = { o: [x0, y1, d0], U: [0, 0, 1], V: [1, 0, 0], la: d1 - d0, lb: x1 - x0 };
    if (sens === 'x') out.push(...cernes(R, droite), ...fil(R, avant, [0.4, 0.72]), ...fil(R, dessus, [0.5]));
    if (sens === 'd') out.push(...cernes(R, avant), ...fil(R, droite, [0.4, 0.72]), ...fil(R, dessusD, [0.5]));
    out.push(h.path(poly([q(x0, y1, d0), q(x1, y1, d0), q(x1, y0, d0)], false), A.detail));
    out.push(h.path(poly([q(x1, y1, d0), q(x1, y1, d1)], false), A.detail));
    out.push(h.path(poly(sil), A[trait]));
    return out.join('\n');
  };

  // Un cylindre debout : centre (xc, dc), rayon r, de y0 à y1.
  const cylindre = (R, xc, dc, r, y0, y1, trait = 'arete') => {
    const N = 72;
    const E = y => Array.from({ length: N }, (_, i) => { const t = 2 * Math.PI * i / N; return R([xc + r * Math.cos(t), y, dc + r * Math.sin(t)]); });
    const bas = E(y0), haut = E(y1);
    let i0 = 0, i1 = 0;
    bas.forEach((p, i) => { if (p[0] < bas[i0][0]) i0 = i; if (p[0] > bas[i1][0]) i1 = i; });
    const arc = (pts, i, j) => { const o = []; for (let k = i; ; k = (k + 1) % N) { o.push(pts[k]); if (k === j) break; } return o; };
    const sil = [...arc(haut, i1, i0), ...arc(bas, i0, i1)];
    return [h.path(poly(sil), FOND), h.path(poly(arc(haut, i0, i1), false), A.detail), h.path(poly(sil), A[trait])].join('\n');
  };

  // Une pièce droite dans le plan du dessin (le bâton, le levier), bouts francs ou rompus.
  const barre = (p0, p1, w, bout0, bout1, at) => {
    const L = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), t = [(p1[0] - p0[0]) / L, (p1[1] - p0[1]) / L];
    const n = [-t[1], t[0]], e = w / 2;
    const bout = (p, s, genre) => {
      if (genre === 'rompu') return [add(p, n, e), add(add(p, n, e * 0.35), t, s * 3.5), add(add(p, n, -e * 0.3), t, -s * 2.5), add(p, n, -e)];
      if (genre === 'biseau') return [add(add(p, n, e), t, -s * w * 1.6), add(p, n, -e * 0.45), add(p, n, -e)];  // aminci par-dessous
      return [add(p, n, e), add(p, n, -e)];
    };
    const pts = [...bout(p1, 1, bout1), ...bout(p0, -1, bout0).reverse()];
    return h.path(poly(pts), at);
  };

  // Une pile en croix : couches alternées, deux pièces par couche, portant aux quatre coins.
  // c = { x, d, L, w, t } ; couches : ['d', 'x', …] de bas en haut ; derniere : pièces de la
  // couche du dessus à part (décalage en profondeur de chacune, null si absente).
  const pile = (R, c, couches, derniere) => {
    const out = [], geo = [];
    couches.forEach((sens, k) => {
      const y0 = k * c.t, y1 = y0 + c.t;
      const decal = k === couches.length - 1 && derniere ? derniere : [0, 0];
      const pieces = sens === 'x'
        ? [[c.x, c.x + c.L, y0, y1, c.d + c.L - c.w, c.d + c.L], [c.x, c.x + c.L, y0, y1, c.d, c.d + c.w]]
        : [[c.x, c.x + c.w, y0, y1, c.d, c.d + c.L], [c.x + c.L - c.w, c.x + c.L, y0, y1, c.d, c.d + c.L]];
      pieces.forEach((b, i) => {
        if (decal[i] === null) return;
        const bb = sens === 'd' ? [b[0], b[1], b[2], b[3], b[4] - decal[i], b[5] - decal[i]] : b;
        out.push(boite(R, bb, sens));
        geo.push({ k, sens, i, b: bb });
      });
    });
    return { svg: out.join('\n'), geo };
  };

  // Le coin du bâtiment : lisses et bas des murs, coupés en haut et à gauche.
  const batiment = (R, yb, xg, prof, hmur) => {
    const yl = yb + 200, yt = yl + hmur;
    const q = (x, y, d) => R([x, y, d]);
    const out = [];
    // la coupure du haut : une ligne cassée irrégulière
    const cassH = [];
    const nH = 9;
    for (let i = 0; i <= nH; i++) cassH.push([xg + (0 - xg) * i / nH, yt + [0, 22, -8, 16, -14, 10, -4, 18, -10, 0][i]]);
    const nD = 4, cassD = [];
    for (let i = 0; i <= nD; i++) cassD.push([prof * i / nD, yt + [0, -16, 12, -10, 6][i]]);
    const gauche = [[xg, yb], [xg + 14, yb + 70], [xg - 10, yb + 150], [xg + 12, yl + 90], [xg - 8, yt]];
    const fond = [[prof, yt + 6], [prof + 12, yl + 120], [prof - 10, yl + 30], [prof + 8, yb + 90], [prof, yb]];
    // la façade (lisse + mur), puis le pignon
    const facade = [...gauche.map(p => q(p[0], p[1], 0)), ...cassH.map(p => q(p[0], p[1], 0)), q(0, yb, 0)];
    const pignon = [q(0, yb, 0), ...cassD.map(p => q(0, p[1], p[0])), ...fond.map(p => q(0, p[1], p[0]))];
    out.push(h.path(poly(pignon), FOND), h.path(poly(facade), FOND));
    // les planches du mur et le dessus des lisses
    for (let y = yl + 110; y < yt - 30; y += 110) {
      out.push(h.path(poly([q(xg + 12, y, 0), q(0, y, 0)], false), A.fin));
      out.push(h.path(poly([q(0, y, 0), q(0, y, prof - 12)], false), A.fin));
    }
    out.push(h.path(poly([q(xg + 6, yl, 0), q(0, yl, 0), q(0, yl, prof + 4)], false), A.arete));
    // planche cornière
    out.push(h.path(poly([q(-70, yl, 0), q(-70, yt + 14, 0)], false), A.detail));
    // le bout de la lisse du long pan : bois de bout ; la lisse du pignon derrière
    out.push(...cernes(R, { o: [0, yb, 0], U: [0, 0, 1], V: [0, 1, 0], la: 200, lb: 200 }));
    out.push(h.path(poly([q(0, yb, 200), q(0, yl, 200)], false), A.detail));
    out.push(...fil(R, { o: [xg + 20, yb, 0], U: [1, 0, 0], V: [0, 1, 0], la: -xg - 40, lb: 200 }, [0.35, 0.68]));
    out.push(...fil(R, { o: [0, yb, 220], U: [0, 0, 1], V: [0, 1, 0], la: prof - 240, lb: 200 }, [0.4, 0.7]));
    // les contours
    out.push(h.path(poly(facade), A.contour), h.path(poly(pignon), A.contour));
    return { svg: out.join('\n'), yl, yt };
  };

  // Le sol : la tranche avant d'une dalle de terre, sous toute la vue.
  const sol = (R, z, dAvant) => {
    const y = R([0, 0, dAvant])[1];
    return [h.rect(0, y, z.l, Math.min(14, z.h - y), A.hachure('terre', 'aucun')), h.ligne(0, y, z.l, y, A.contour)].join('\n');
  };

  // ─── Vue 1 : au vérin ────────────────────────────────────────────────────────────────────
  const T = 90, W = 130, LP = 600;                 // la cale : épaisseur, largeur, longueur (dessin)
  const memo = {};
  const geoVerin = z => {
    const cle = `v${z.l}x${z.h}`;
    if (memo[cle]) return memo[cle];
    const yb = 5 * T + 20, xg = -1500, prof = 700, hmur = 300;
    const C = { x: -950, d: -200, L: LP, w: W, t: T };
    const pousse = 260, dSol = -380;
    const xj = -105, dj = 100;
    const pts = [[xg - 10, yb, 0], [xg, yb + 520, 0], [0, yb + 520, prof], [prof * KC + 20, yb, prof], [0, 0, dSol], [0, -60, dSol],
      [C.x + W / 2, 4.5 * T, C.d - pousse - 640]];
    const { s, R } = cadrer(z, pts, [12, 10, 4, 6]);
    const out = [sol(R, z, dSol)];
    const P = pile(R, C, ['d', 'x', 'd', 'x', 'd'], [pousse, 0]);
    out.push(P.svg);
    // le bâton qui pousse la cale de gauche du dessus
    const yB = 4.5 * T, xB = C.x + W / 2, dB = C.d - pousse;
    const b0 = R([xB, yB, dB]), b1 = R([xB, yB, dB - 640]);   // dans l'axe de la cale, au centre de son bout
    const fa = add(R([xB, yB, dB - 640 * 0.85]), [0, 12 + 17 * s]), fb = add(R([xB, yB, dB - 640 * 0.3]), [0, 12 + 17 * s]);
    const baton = [barre(b0, b1, 34 * s, 'franc', 'rompu', blanc('arete')), h.fleche(`M${pt(fa)} L${pt(fb)}`)].join(' ');
    // le madrier sous le socle, le vérin
    out.push(boite(R, [xj - 125, xj + 125, 0, 50, dj - 290, dj + 250], 'd'));
    out.push(boite(R, [xj - 78, xj + 78, 50, 78, dj - 68, dj + 68], null));
    out.push(cylindre(R, xj, dj, 58, 78, 335));
    out.push(cylindre(R, xj + 62, dj - 52, 15, 78, 200, 'detail'));
    out.push(boite(R, [xj + 52, xj + 74, 200, 222, dj - 64, dj - 40], null, 'detail'));
    out.push(cylindre(R, xj, dj, 42, 335, 360));
    out.push(cylindre(R, xj, dj, 28, 360, yb - 22));
    out.push(cylindre(R, xj, dj, 35, yb - 22, yb));
    // le point à contrôler : le vérin d'aplomb
    const cv = R([xj, 260, dj]);
    out.push(h.controle(cv[0], cv[1], 132 * s));
    // le bâtiment par-dessus
    const Bt = batiment(R, yb, xg, prof, hmur);
    out.push(Bt.svg, baton);
    const g = { s, R, C, P, yb, xj, dj, b0, b1, svg: out.join('\n'), xg, prof };
    memo[cle] = g;
    return g;
  };
  const vueVerin = z => geoVerin(z).svg;
  const renvoisVerin = z => {
    const g = geoVerin(z), R = g.R, C = g.C;
    const haut = g.P.geo.filter(p => p.k === 4 && p.i === 1)[0].b;
    const bas = g.P.geo.filter(p => p.k === 1 && p.i === 1)[0].b;
    const mad = R([g.xj + 125, 25, g.dj - 150]);
    const verin = R([g.xj - 56, 200, g.dj]);
    const tete = R([(haut[0] + haut[1]) / 2, haut[3] - 10, haut[4] + 40]);
    const coin = R([C.x + 330, 4 * T, C.d + 65]);
    const baton = add(g.b0, [g.b1[0] - g.b0[0], g.b1[1] - g.b0[1]], 0.55);
    return [
      { n: 1, rond: [mad[0] + 44, mad[1] + 2], cible: mad, texte: 'madrier sous le socle, sur sol mou' },
      { n: 2, rond: [verin[0] + 92, verin[1] - 30], cible: [R([g.xj + 56, 220, g.dj])[0], R([g.xj + 56, 220, g.dj])[1]], texte: 'vérin strictement vertical' },
      { n: 3, rond: [coin[0] - 44, coin[1] - 64], cible: coin, texte: 'deux pièces dans un sens, deux dans l’autre' },
      { n: 4, rond: [tete[0] + 14, tete[1] - 60], cible: tete, texte: 'la pile suit la charge à chaque montée' },
      { n: 5, rond: [baton[0] - 20, baton[1] - 22], cible: baton, texte: 'cale poussée au bâton, jamais à la main' },
    ];
  };

  // ─── Vue 2 : ce qui fait une cale (bois de bout, de face) ───────────────────────────────
  const geoCales = z => {
    const hauts = [90, 120, 100], gap = 58, marge = 10;
    const tot = hauts.reduce((a, b) => a + b, 0) + gap * 3;
    const s = Math.min((z.h - 2 * marge) / tot, (z.l * 0.62) / 210);
    const cx = z.l * 0.4;
    const bases = [];
    let y = marge + gap * 0.5;
    for (const ht of hauts) { y += ht * s; bases.push(y); y += gap * s; }
    return { s, cx, bases };
  };
  const arcs2D = (cx, cy, r, garde) => {
    const out = []; let seg = [];
    for (let t = 0; t <= 360; t += 3) {
      const p = [cx + r * Math.cos(t * Math.PI / 180), cy + r * Math.sin(t * Math.PI / 180)];
      if (garde(p)) seg.push(p); else { if (seg.length > 1) out.push(seg); seg = []; }
    }
    if (seg.length > 1) out.push(seg);
    return out.map(sg => h.path(poly(sg, false), A.fin));
  };
  const vueCales = z => {
    const { s, cx, bases } = geoCales(z), out = [];
    const soli = (y, demi) => h.ligne(cx - demi - 16, y, cx + demi + 16, y, A.arete);
    // 1. la pièce sciée, à plat
    {
      const y = bases[0], lw = 150 * s, ht = 90 * s;
      out.push(soli(y, lw / 2), h.rect(cx - lw / 2, y - ht, lw, ht, `fill="${BL}" stroke="none"`));
      for (const r of [80, 112, 146]) out.push(...arcs2D(cx + 22 * s, y + 40 * s, r * s, p => p[0] > cx - lw / 2 + 4 && p[0] < cx + lw / 2 - 4 && p[1] > y - ht + 4 && p[1] < y - 4));
      out.push(h.rect(cx - lw / 2, y - ht, lw, ht, A.contour));
    }
    // 2. la bille équarrie sur deux faces
    {
      const R0 = 100 * s, a = 60 * s, yc = bases[1] - a, dx = Math.sqrt(R0 * R0 - a * a);
      const ri = 91 * s, dxi = Math.sqrt(ri * ri - a * a);
      out.push(soli(bases[1], R0));
      const forme = `M ${pt([cx - dx, yc - a])} A ${f(R0)} ${f(R0)} 0 0 0 ${pt([cx - dx, yc + a])} L ${pt([cx + dx, yc + a])} A ${f(R0)} ${f(R0)} 0 0 0 ${pt([cx + dx, yc - a])} Z`;
      out.push(h.path(forme, `fill="${BL}" stroke="none"`));
      for (const r of [16, 36, 58, 78]) out.push(...arcs2D(cx + 3 * s, yc + 2 * s, r * s, p => Math.abs(p[1] - yc) < a - 3));
      out.push(h.path(`M ${pt([cx - dxi, yc - a])} A ${f(ri)} ${f(ri)} 0 0 0 ${pt([cx - dxi, yc + a])} M ${pt([cx + dxi, yc + a])} A ${f(ri)} ${f(ri)} 0 0 0 ${pt([cx + dxi, yc - a])}`, A.detail));
      out.push(h.path(forme, A.contour));
    }
    // 3. la bûche fendue, posée sur sa face plate
    {
      const R0 = 100 * s, yb = bases[2], ri = 91 * s;
      out.push(soli(yb, R0));
      const forme = `M ${pt([cx - R0, yb])} A ${f(R0)} ${f(R0)} 0 0 1 ${pt([cx + R0, yb])} Z`;
      out.push(h.path(forme, `fill="${BL}" stroke="none"`));
      for (const r of [18, 40, 62, 80]) out.push(...arcs2D(cx + 2 * s, yb, r * s, p => p[1] < yb - 3));
      out.push(h.path(`M ${pt([cx - ri, yb])} A ${f(ri)} ${f(ri)} 0 0 1 ${pt([cx + ri, yb])}`, A.detail));
      out.push(h.path(forme, A.contour));
    }
    return out.join('\n');
  };
  const renvoisCales = z => {
    const { s, cx, bases } = geoCales(z);
    const xr = z.l - 14;
    return [
      { n: 6, rond: [xr, bases[0] - 45 * s], cible: [cx + 75 * s, bases[0] - 45 * s], texte: 'madrier ou chevron, à plat' },
      { n: 7, rond: [xr, bases[1] - 60 * s], cible: [cx + 80 * s, bases[1] - 60 * s], texte: 'bille équarrie sur deux faces' },
      { n: 8, rond: [xr, bases[2] - 40 * s], cible: [cx + 90 * s, bases[2] - 40 * s], texte: 'bûche fendue, sur sa face plate' },
    ];
  };

  // ─── Vue 3 : sans vérin, au levier et aux cales ─────────────────────────────────────────
  const geoLevier = z => {
    const cle = `l${z.l}x${z.h}`;
    if (memo[cle]) return memo[cle];
    const yb = 3 * T + 15, xg = -1500, prof = 700, hmur = 300, dL = 100, rL = 40;
    const C = { x: -880, d: -200, L: LP, w: W, t: T };
    const pousse = 260, dSol = -380;
    // l'appui : une petite pile en croix et une cale dessus, le plus près possible du coin
    const Ap = { x: 190, d: -50, L: 330, w: 100, t: T };
    const blocB = [Ap.x + 60, Ap.x + 60 + 120, 2 * T, 3 * T, 0, 200];
    // le levier : son dessous porte sur l'arête gauche de la cale d'appui, son dessus sous
    // l'arête de la lisse au coin (x = 0, y = yb). On cherche l'angle.
    const eA = [blocB[0], blocB[3]], eS = [0, yb];
    let th = 0.3;
    for (let i = 0; i < 40; i++) {
      const cA = [eA[0] - rL * Math.sin(th), eA[1] + rL * Math.cos(th)], cS = [eS[0] + rL * Math.sin(th), eS[1] - rL * Math.cos(th)];
      th = Math.atan2(cA[1] - cS[1], cA[0] - cS[0]);
    }
    const u = [Math.cos(th), Math.sin(th)];
    const piv = [eA[0] - rL * Math.sin(th), eA[1] + rL * Math.cos(th)];
    const at = k => [piv[0] + u[0] * k, piv[1] + u[1] * k];
    const bout0 = at(-(piv[0] + 170) / u[0]), bout1 = at(2080);
    const m1 = at(1700), m2 = at(1930);
    const xp = m2[0] + 600;
    const pts = [[xg - 10, yb, 0], [xg, yb + 520, 0], [0, yb + 520, prof], [0, 0, dSol], [0, -60, dSol],
      [C.x + W / 2, 2.5 * T, C.d - pousse - 640], [xp + 330, 0, dL], [xp - 200, 1560, dL]];
    const { s, R } = cadrer(z, pts, [8, 6, 4, 6]);
    const out = [sol(R, z, dSol)];
    const P = pile(R, C, ['d', 'x', 'd'], [pousse, 0]);
    out.push(P.svg);
    const yB = 2.5 * T, xB = C.x + W / 2, dB = C.d - pousse;
    const b0 = R([xB, yB, dB]), b1 = R([xB, yB, dB - 640]);
    const fa = add(R([xB, yB, dB - 640 * 0.85]), [0, 12 + 17 * s]), fb = add(R([xB, yB, dB - 640 * 0.3]), [0, 12 + 17 * s]);
    const baton = [barre(b0, b1, 34 * s, 'franc', 'rompu', blanc('arete')), h.fleche(`M${pt(fa)} L${pt(fb)}`)].join(' ');
    // la pile d'appui et sa cale
    const PA = pile(R, Ap, ['d', 'x']);
    out.push(PA.svg, boite(R, blocB, 'd'));
    // le levier, dans le plan d = dL
    const L0 = R([bout0[0], bout0[1], dL]), L1 = R([bout1[0], bout1[1], dL]);
    out.push(barre(L0, L1, 2 * rL * s, 'biseau', 'franc', blanc('arete')));
    out.push(h.path(poly([R([...at(-60), dL]).map((v, i) => v + (i ? -0.25 : 0) * rL * s), R([...at(1880), dL]).map((v, i) => v + (i ? -0.25 : 0) * rL * s)], false), A.fin));
    // pousser vers le bas, entre l'appui et les mains
    const pf = at(1180);
    const n = [-u[1], u[0]];
    const fh = R([pf[0] + n[0] * 330, pf[1] + n[1] * 330, dL]), fbb = R([pf[0] + n[0] * 90, pf[1] + n[1] * 90, dL]);
    out.push(h.geste(`M${pt(fh)} L${pt(fbb)}`));
    // le bâtiment
    const Bt = batiment(R, yb, xg, prof, hmur);
    out.push(Bt.svg, baton);
    // l'homme, penché sur le bout du levier
    const pied = R([xp, 0, dL]);
    const g1 = R([m1[0], m1[1], dL]), g2 = R([m2[0], m2[1], dL]);
    // le corps simple (pose « levier »), tourné vers la gauche ; ses bras calculés pour que les
    // deux poings se ferment sur la perche, la main proche au bout. La perche passe devant le poing
    // loin et dans le poing proche : on la repeint, découpée autour des mains, entre les deux bras.
    const angL = Math.atan2(L1[1] - L0[1], L1[0] - L0[0]) * 180 / Math.PI;
    const oL = { x: pied[0], y: pied[1], pose: 'levier', echelle: s, cote: 'gauche' };
    oL.angles = poserBras(oL, { P: g2, L: g1 }, { P: angL, L: angL });
    const cm = [(g1[0] + g2[0]) / 2, (g1[1] + g2[1]) / 2], rc = Math.hypot(g2[0] - g1[0], g2[1] - g1[1]) / 2 + 26;
    const perche = `<clipPath id="perche-109-40"><circle cx="${f(cm[0])}" cy="${f(cm[1])}" r="${f(rc)}"/></clipPath>`
      + `<g clip-path="url(#perche-109-40)">${barre(L0, L1, 2 * rL * s, 'biseau', 'franc', blanc('arete'))}</g>`;
    const homme = F.corps(Object.assign(oL, { objetP: perche }));
    out.push(String(homme));
    const g = { s, R, C, P, PA, blocB, yb, b0, b1, at, dL, piv, homme, svg: out.join('\n'), L0, L1 };
    memo[cle] = g;
    return g;
  };
  const vueLevier = z => geoLevier(z).svg;
  const renvoisLevier = z => {
    const g = geoLevier(z), R = g.R;
    const lev = R([...g.at(900), g.dL]);
    const bl = R([g.blocB[0] + 20, g.blocB[3] - 30, g.blocB[4]]);
    const pa = R([g.blocB[1] + 60, T * 1.5, -50]);
    const neuve = g.P.geo.filter(p => p.k === 2 && p.i === 0)[0].b;
    const ca = R([neuve[0] + 22, neuve[2] + 22, neuve[4]]);
    return [
      { n: 9, rond: [lev[0] + 10, lev[1] + 34], cible: lev, texte: 'perche de bois franc' },
      { n: 10, rond: [bl[0] + 44, bl[1] - 58], cible: bl, texte: 'appui le plus près possible de la charge' },
      { n: 11, rond: [pa[0] + 40, pa[1] + 22], cible: pa, texte: 'l’appui remonte sur sa propre pile' },
      { n: 12, rond: [ca[0] - 40, ca[1] + 10], cible: ca, texte: 'cale glissée pendant que c’est en l’air' },
    ];
  };

  return {
    ref: '109-40',
    titre: 'Lever et caler au fur et à mesure',
    desc: 'Trois vues. Au vérin, en perspective : le coin d’un bâtiment, la lisse du long pan levée par un vérin bouteille posé sur un madrier couché sur le sol mou, strictement vertical ; à côté, sous la même lisse, une pile de cales en croix, deux pièces dans un sens, deux dans l’autre, qui porte aux quatre coins ; la charge montée, une cale neuve se pousse de l’avant sur le dessus de la pile avec un bâton, jamais à la main, et la pile reste collée sous la charge à chaque montée. Ce qui fait une cale, en bois de bout : un madrier ou un chevron posé à plat, une bille équarrie sur deux faces, une bûche fendue posée sur sa face plate. Sans vérin, en perspective : une perche de bois franc glissée sous le coin, qui porte sur une cale d’appui posée le plus près possible de la charge, sur sa propre petite pile en croix ; un homme penché pèse sur le bout ; la charge décolle de quelques centimètres et la cale se pousse au bâton pendant que c’est en l’air ; on redescend sur la cale, on remonte l’appui sur sa pile et on recommence. L’encadré danger rappelle que le vérin n’est pas un support.',
    format: 'pleine',
    disposition: [['verin', 'cales'], ['levier']],
    hauteurs: [1, 1.15],
    largeurs: [[2.3, 1], [1]],
    vues: {
      verin: { titre: 'Au vérin', dessin: vueVerin, renvois: renvoisVerin },
      cales: { titre: 'Ce qui fait une cale', dessin: vueCales, renvois: renvoisCales },
      levier: { titre: 'Sans vérin : au levier et aux cales', dessin: vueLevier, renvois: renvoisLevier },
    },
    danger: 'Le vérin n’est pas un support : un joint qui suinte descend la charge sans bruit et sans qu’on la voie bouger, et il suinte plus à froid. Avant qu’une main ou une tête passe sous la charge, elle repose sur des cales de bois.',
  };
};
