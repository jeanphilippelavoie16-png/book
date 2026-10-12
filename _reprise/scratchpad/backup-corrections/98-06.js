// Planche 98-06 — Couper, lier, dresser en moyettes (ch. 98, étape 37 et note 6).
// Ce que le chapitre donne : couper à la faucille (ou faux, ou sécateur) à 8-10 cm du sol ; lier
// en gerbes d'une poignée de paille tordue ; dresser les gerbes debout, épis en haut, appuyées les
// unes contre les autres en petit cône ou en double rangée, pour que l'air passe dedans et que la
// pluie coule dessus. Seule cote : la hauteur de coupe. Les tailles de gerbe et de moyette ne sont
// pas cotées (le chapitre n'en donne pas) ; elles sont dessinées à une proportion plausible.
module.exports = (h) => {
  const RAD = Math.PI / 180;
  const NOIR = '#1A1A1A';
  const f1 = v => Math.round(v * 10) / 10;
  const pt = p => `${f1(p[0])} ${f1(p[1])}`;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
  const BL = ep => `fill="#FFFFFF" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const TR = ep => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const alea = g => { let s = g; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  function lisse(pts, ferme = false) {
    const n = pts.length; let d = `M${pt(pts[0])}`;
    const P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      d += ` C${pt([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${pt([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pt(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  }

  // ─── un épi d'orge : base (x, y), direction ang (0 = vers le haut), longueur L, largeur w ───
  function epi(x, y, ang, L, w, barbes = 0.75) {
    const u = [Math.sin(ang * RAD), -Math.cos(ang * RAD)], n = [-u[1], u[0]];
    const P = (t, k) => [x + u[0] * L * t + n[0] * w * k / 2, y + u[1] * L * t + n[1] * w * k / 2];
    const prof = [[0, 0.35], [0.2, 0.9], [0.5, 1], [0.8, 0.8], [1, 0]];
    const cont = [...prof.map(([t, k]) => P(t, -k)), ...prof.slice(0, -1).reverse().map(([t, k]) => P(t, k))];
    let d = '';
    for (const t of [0.3, 0.5, 0.7, 0.88]) d += `M${pt(P(t - 0.12, -0.8))} L${pt(P(t, 0))} L${pt(P(t - 0.12, 0.8))} `;
    let b = '';
    if (barbes) for (const [t, k, dv] of [[0.6, -0.8, -7], [0.8, -0.5, -3], [1, 0, 0], [0.8, 0.5, 3], [0.6, 0.8, 7]]) {
      const a = P(t, k), v = [Math.sin((ang + dv) * RAD), -Math.cos((ang + dv) * RAD)];
      b += `M${pt(a)} L${pt(add(a, mul(v, L * barbes)))} `;
    }
    return `<path d="${b}" ${TR(0.5)}/><path d="${lisse(cont, true)}" ${BL(0.7)}/><path d="${d}" ${TR(0.5)}/>`;
  }

  // ─── une gerbe : pied B (milieu, sur le sol), sommet des tiges S ; demi-largeurs en unités de vue ───
  function gerbe({ B, S, lPied, lLien, lHaut, tL = 0.42, n = 9, graine = 7, epiL, epiW, lien = null }) {
    const r = alea(graine);
    const ax = [S[0] - B[0], S[1] - B[1]], Lg = Math.hypot(ax[0], ax[1]), u = [ax[0] / Lg, ax[1] / Lg], nn = [-u[1], u[0]];
    const Q = (t, k) => [B[0] + u[0] * Lg * t + nn[0] * k, B[1] + u[1] * Lg * t + nn[1] * k];
    const angAxe = Math.atan2(u[0], -u[1]) / RAD;
    const tiges = [];
    for (let i = 0; i < n; i++) {
      const s = -1 + 2 * i / (n - 1), j = (r() - 0.5);
      const base = [B[0] + s * lPied, B[1]];
      const haut = Q(1 + j * 0.05, s * lHaut);
      tiges.push({ s, pts: [base, Q(tL * 0.5, s * (lPied + lLien) / 2), Q(tL, s * lLien), Q((1 + tL) / 2, s * (lLien + lHaut) / 2), haut], haut });
    }
    const g = tiges[0].pts, dr = tiges[n - 1].pts;
    const out = [];
    out.push(`<path d="${lisse(g)} L${pt(dr[4])} ${lisse(dr.slice().reverse()).replace(/^M/, 'L')} Z" fill="#FFFFFF" stroke="none"/>`);
    tiges.slice(1, -1).forEach(t => out.push(`<path d="${lisse(t.pts)}" ${TR(0.5)}/>`));
    out.push(`<path d="${lisse(g)}" ${TR(1.4)}/>`, `<path d="${lisse(dr)}" ${TR(1.4)}/>`);
    out.push(`<path d="M${pt(g[0])} L${pt(dr[0])}" ${TR(1.4)}/>`);
    // les épis, en éventail
    const ordre = tiges.map((t, i) => i).sort((a, b) => Math.abs(tiges[b].s) - Math.abs(tiges[a].s));
    for (const i of ordre) {
      const t = tiges[i];
      out.push(epi(t.haut[0], t.haut[1], angAxe + t.s * 24 + (r() - 0.5) * 10, epiL, epiW));
    }
    // le lien
    if (lien) out.push(lien({ Q, u, nn, tL, lLien, Lg }));
    return out.join('\n');
  }

  // ─── un toron de paille tordue, en bande (corde de la bibliothèque) ───
  const corde = (pts, ep, o = {}) => h.formes.corde(pts, { ep, torons: true, debut: 'ouvert', fin: 'ouvert', ...o });
  // bout de paille : un pinceau de brins au bout d'une bande (p : bout, v : direction, w : largeur)
  function pinceau(p, v, w, L) {
    const n = [-v[1], v[0]]; let d = '';
    [-0.45, -0.2, 0.05, 0.3, 0.5].forEach((k, i) => {
      const a = add(p, mul(n, k * w)), lg = L * (0.6 + 0.4 * ((i * 7) % 5) / 4), dv = k * 0.35;
      const v2 = [v[0] + n[0] * dv, v[1] + n[1] * dv];
      d += `M${pt(a)} L${pt(add(a, mul(v2, lg)))} `;
    });
    return `<path d="${d}" ${TR(0.7)}/>`;
  }
  // deux bouts tordus ensemble le long d'un chemin (points serrés) : une torsade à deux brins, chaque
  // brin en bosse oblique ; jusqu'à sMax (pour repeindre seulement la racine par-dessus le lien)
  function torsade(chemin, W, p, sMax = Infinity) {
    const S = [0];
    for (let i = 1; i < chemin.length; i++) S.push(S[i - 1] + Math.hypot(chemin[i][0] - chemin[i - 1][0], chemin[i][1] - chemin[i - 1][1]));
    const Lt = Math.min(S[S.length - 1], sMax);
    const at = s => {
      let i = 0; while (i < S.length - 2 && S[i + 1] < s) i++;
      const t = (s - S[i]) / ((S[i + 1] - S[i]) || 1), a = chemin[i], b = chemin[i + 1];
      const d = [b[0] - a[0], b[1] - a[1]], l = Math.hypot(d[0], d[1]) || 1;
      return { p: [a[0] + d[0] * t, a[1] + d[1] * t], n: [-d[1] / l, d[0] / l] };
    };
    const bord = (cote, dec) => {
      const q = [];
      for (let s = 0; s <= Lt + 0.01; s += 0.8) {
        const { p: c, n } = at(s), ph = (((s - dec) % p) + p) % p / p;
        q.push(add(c, mul(n, cote * (W / 2 + 1.3 * Math.sin(Math.PI * ph)))));
      }
      return q;
    };
    const g = bord(1, 0), d = bord(-1, 0.55 * p);
    const out = [`<path d="M${g.map(pt).join(' L')} L${d.slice().reverse().map(pt).join(' L')} Z" fill="#FFFFFF" stroke="none"/>`,
      `<path d="M${g.map(pt).join(' L')}" ${TR(1.4)}/>`, `<path d="M${d.map(pt).join(' L')}" ${TR(1.4)}/>`];
    let dg = '';
    for (let s0 = 0; s0 + 0.55 * p <= Lt; s0 += p) {
      const A0 = at(s0), B0 = at(s0 + 0.55 * p), M = at(s0 + 0.3 * p);
      const a = add(A0.p, mul(A0.n, W / 2)), b = add(B0.p, mul(B0.n, -W / 2)), c = add(M.p, mul(M.n, W * 0.12));
      dg += `M${pt(a)} Q${pt(c)} ${pt(b)} `;
    }
    out.push(`<path d="${dg}" ${TR(0.7)}/>`);
    return out.join('');
  }

  // ─── le gros plan de la taille de la gerbe, pour les trois temps du lien ───
  function taille(z, etape) {
    const cx = z.l / 2, yb = Math.round(z.h * 0.3), W0 = Math.min(z.l * 0.3, 54), ep = 11;
    const r = alea(31);
    const bord = (s, y) => {
      const t = y < yb ? (yb - y) / yb : (y - yb) / (z.h - yb);
      return cx + s * (W0 + (y < yb ? 9 : 14) * t * t + 2 * t);
    };
    const out = [];
    const n = 13;
    for (let i = 0; i < n; i++) {
      const s = -1 + 2 * i / (n - 1), y0 = 2 + r() * 5, y1 = z.h - 2 - r() * 5;
      const pts = [];
      for (let y = y0; y <= y1 + 0.1; y += (y1 - y0) / 12) pts.push([cx + (bord(1, y) - cx) * s * (Math.abs(s) === 1 ? 1 : 0.97), y]);
      out.push(`<path d="${lisse(pts)}" ${TR(Math.abs(s) === 1 ? 1.4 : 0.5)}/>`);
    }
    // le lien : il sort de derrière la gerbe à gauche et à droite
    const xg = bord(-1, yb) - 3, xd = bord(1, yb) + 3, sag = 5;
    const yL = x => yb + sag * (1 - ((x - cx) / (xd - cx)) ** 2);
    const bande = (x0, x1) => { const q = []; for (let i = 0; i <= 8; i++) { const x = x0 + (x1 - x0) * i / 8; q.push([x, yL(x)]); } return q; };
    const yJ = yL(cx);
    if (etape === 1) {
      // les deux moitiés du lien arrivent au milieu et descendent côte à côte
      const g = [...bande(xg, cx - 14), [cx - 7, yJ + 3], [cx - ep / 2, yJ + 14], [cx - ep / 2, yJ + 48]];
      const d = [...bande(xd, cx + 14), [cx + 7, yJ + 3], [cx + ep / 2, yJ + 14], [cx + ep / 2, yJ + 48]];
      out.push(corde(g, ep), corde(d, ep));
      out.push(pinceau([cx - ep / 2, yJ + 48], [0, 1], ep, 14), pinceau([cx + ep / 2, yJ + 48], [0, 1], ep, 14));
      out.push(h.fleche(`M${cx + ep + 12} ${yJ + 20} L${cx + ep + 12} ${yJ + 52}`));
    } else {
      // la torsade part du milieu du lien
      let chemin = [];
      if (etape === 2) {
        for (let y = yJ - 3; y <= yJ + 48; y += 1) chemin.push([cx, y]);
      } else {
        const R = 13, yU = yJ + 26;
        for (let y = yJ - 3; y <= yU; y += 1) chemin.push([cx, y]);
        for (let a = 180; a >= 0; a -= 6) chemin.push([cx + R + R * Math.cos(a * RAD), yU + R * Math.sin(a * RAD)]);
        for (let y = yU - 1; y >= yJ - ep / 2 - 16; y -= 1) chemin.push([cx + 2 * R, y]);
      }
      const WT = 13, PT = 10;
      out.push(torsade(chemin, WT, PT));
      const fin = chemin[chemin.length - 1], avant = chemin[chemin.length - 4];
      const v = [fin[0] - avant[0], fin[1] - avant[1]], lv = Math.hypot(v[0], v[1]);
      out.push(pinceau(fin, [v[0] / lv, v[1] / lv], WT, 12));
      // les deux moitiés du lien : par-dessus la torsade là où elle passe dessous (étape 3),
      // mais la racine de la torsade sort d'entre elles
      out.push(corde([...bande(xg, cx - 3)], ep), corde([...bande(cx + 3, xd)], ep));
      out.push(torsade(chemin, WT, PT, 13));
      if (etape === 2) {
        const ym = yJ + 27;
        out.push(h.fleche(`M${cx - 19} ${ym} A 19 7 0 0 0 ${cx + 19} ${ym}`));
      } else {
        const xf = cx + 26 + 19;
        out.push(h.fleche(`M${xf} ${yJ + 38} L${xf} ${yJ + 10}`));
      }
    }
    return out.join('\n');
  }

  // le lien vu en petit, sur la gerbe entière (k : unités de vue par mm) ; torsade rentrée dessous
  const lienPetit = (k, torsadeVisible) => ({ Q, u, nn, tL, lLien }) => {
    const pts = [], eb = Math.max(3.2, 17 * k);
    for (let i = 0; i <= 8; i++) { const q = -lLien - eb * 0.3 + (2 * lLien + eb * 0.6) * i / 8; pts.push(add(Q(tL, q), mul(u, -eb * 0.45 * (1 - (q / lLien) ** 2)))); }
    const out = [];
    if (torsadeVisible) {
      const c = add(Q(tL, 0), mul(u, -eb * 0.45)), dn = mul(u, -1), R = 13 * k, d0 = eb * 0.4 + 18 * k;
      const ch = [add(c, mul(dn, eb * 0.3)), add(c, mul(dn, d0)), add(add(c, mul(dn, d0 + R)), mul(nn, R)),
        add(add(c, mul(dn, d0)), mul(nn, 2 * R)), add(c, mul(nn, 2 * R)), add(add(c, mul(u, eb + 12 * k)), mul(nn, 2 * R))];
      out.push(corde(ch, 12 * k, { torons: true }));
      const fin = ch[ch.length - 1];
      out.push(pinceau(fin, [u[0], u[1]], 12 * k, 9 * k));
    }
    out.push(corde(pts, eb));
    return out.join('\n');
  };

  // ─── projection d'une vue plongeante : X à droite, Y en profondeur, Z en haut (mm) ───
  const proj = (o) => ([X, Y, Z]) => {
    const Xr = X * Math.cos(o.phi * RAD) - Y * Math.sin(o.phi * RAD), D = X * Math.sin(o.phi * RAD) + Y * Math.cos(o.phi * RAD);
    return { p: [o.x + o.s * Xr, o.y - o.s * (Z * Math.cos(o.e * RAD) + D * Math.sin(o.e * RAD))], D };
  };
  // Gerbe dessinée : 600 mm du pied au bout des tiges, demi-largeurs 100 / 70 / 110 mm, épi 80 mm
  const G = { L: 600, pied: 100, lien: 70, haut: 110, epi: 80, epiW: 13 };
  const gerbe3D = (P, s, Bw, Sw, graine) => {
    const b = P(Bw), t = P(Sw);
    return { D: b.D, svg: gerbe({ B: b.p, S: t.p, lPied: G.pied * s, lLien: G.lien * s, lHaut: G.haut * s, epiL: G.epi * s, epiW: G.epiW * s, n: 8, graine, lien: lienPetit(s, false) }) };
  };
  const sol = (z, y) => [h.rect(0, y, z.l, 9, h.a.hachure('terre', 'aucun')), h.ligne(0, y, z.l, y, h.a.arete)].join('\n');

  // ─── la coupe : le champ, la poignée tenue, la faucille tirée vers soi, le chaume ───
  const Xh = 580, Yh = 60;
  function geoCouper(z) {
    const s = (z.h - 16) / 800, yG = z.h - 11;
    const P = X => proj({ x: 4, y: yG, s, e: 20, phi: 0 })(X).p;
    return { s, yG, P, grip: P([Xh + 35, Yh, 340]) };
  }
  function vueCouper(z) {
    const { s, yG, P, grip } = geoCouper(z);
    const r = alea(5), out = [sol(z, yG)];
    const tige = (base, top, ang, ep) => {
      const b = P(base), t = P(top), m = P([(base[0] * 0.6 + top[0] * 0.4), base[1], top[2] * 0.45]);
      return `<path d="${lisse([b, m, t])}" ${TR(ep)}/>` + epi(t[0], t[1], ang, 80 * s, 13 * s);
    };
    // le champ debout, du fond vers l'avant
    const champ = [];
    for (let i = 0; i < 28; i++) champ.push({ X: 15 + r() * 470, Y: r() * 190, H: 600 + r() * 80, pen: (r() - 0.5) * 30, ang: (r() - 0.5) * 50 });
    champ.sort((a, b) => b.Y - a.Y).forEach(c => out.push(tige([c.X, c.Y, 0], [c.X + c.pen, c.Y, c.H], c.ang, 0.5)));
    // le chaume : touffes coupées à 80-100 mm
    const touffes = [];
    for (let i = 0; i < 16; i++) touffes.push({ X: Xh + 70 + r() * 420, Y: r() * 190, H: 82 + r() * 16 });
    touffes.push({ X: Xh + 575, Y: 5, H: 90 });
    const touffe = t => {
      let d = '';
      for (const dx of [-6, 5]) {
        const b = P([t.X + dx * 0.4, t.Y, 0]), c = P([t.X + dx, t.Y, t.H + (dx % 2) * 3]);
        d += `M${pt(b)} L${pt(c)} `;
      }
      return `<path d="${d}" ${TR(0.7)}/>`;
    };
    touffes.filter(t => t.Y > Yh).sort((a, b) => b.Y - a.Y).forEach(t => out.push(touffe(t)));
    // la faucille : lame en arc dans un plan un peu incliné, qui entoure le pied de la poignée
    const Rb = 105, C = [Xh + Rb - 22, Yh], Zb = Y => 90 + (Y - Yh) * 0.55;
    const lame = (a0, a1) => {
      const int = [], ext = [];
      for (let a = a0; a <= a1 + 0.01; a += 5) {
        const w = 24 * Math.min(1, (250 - a) / 70), c = Math.cos(a * RAD), sn = Math.sin(a * RAD);
        const Yi = C[1] + Rb * sn, Ye = C[1] + (Rb + w) * sn;
        int.push(P([C[0] + Rb * c, Yi, Zb(Yi)])); ext.push(P([C[0] + (Rb + w) * c, Ye, Zb(Ye)]));
      }
      return { int, ext };
    };
    const L1 = lame(40, 250);
    const dessinLame = L => `<path d="M${L.int.map(pt).join(' L')} L${L.ext.slice().reverse().map(pt).join(' L')} Z" ${h.a.hachure('metal', 'arete')}/>` +
      `<path d="M${L.int.map((p, i) => pt(add(p, mul(sub2(L.ext[i], p), 0.3)))).join(' L')}" ${TR(0.5)}/>`;
    const sub2 = (a, b) => [a[0] - b[0], a[1] - b[1]];
    // le manche, dans le prolongement du talon, vers celui qui coupe
    const aT = 40, Ym = C[1] + (Rb + 12) * Math.sin(aT * RAD), Hm = [C[0] + (Rb + 12) * Math.cos(aT * RAD), Ym, Zb(Ym)];
    const dM = [0.97, 0.24], Lm = 125;
    const He3 = [Hm[0] + dM[0] * Lm, Hm[1] + dM[1] * Lm, Zb(Hm[1] + dM[1] * Lm)];
    const hs = P(Hm), he = P(He3), v = sub2(he, hs), lv = Math.hypot(v[0], v[1]), nv = [-v[1] / lv * 15 * s, v[0] / lv * 15 * s];
    const manche = `<path d="M${pt(add(hs, nv))} L${pt(add(he, nv))} Q${pt(add(he, mul(v, 12 * s / lv)))} ${pt(sub2(he, nv))} L${pt(sub2(hs, nv))} Z" ${h.a.hachure('bois', 'arete')}/>`;
    out.push(manche, dessinLame(L1));
    // la poignée : les tiges serrées dans la main, tirées un peu vers soi
    const poignee = [];
    for (let i = 0; i < 7; i++) {
      const bx = Xh + (i - 3) * 8 + (r() - 0.5) * 6, by = Yh + (r() - 0.5) * 30, dx = (i - 3) * 3;
      const top = [Xh + 35 + (i - 3) * 14 + (r() - 0.5) * 10, Yh, 630 + r() * 40];
      const pts = [[bx, by, 0], [bx + 10, by, 100], [Xh + 35 + dx * 0.7, Yh, 280], [Xh + 35 + dx * 0.5, Yh, 340], [Xh + 35 + dx * 0.8, Yh, 400], top].map(P);
      poignee.push(`<path d="${lisse(pts)}" ${TR(0.7)}/>` + epi(pts[5][0], pts[5][1], (i - 3) * 7 + (r() - 0.5) * 12, 80 * s, 13 * s));
    }
    out.push(...poignee);
    // la partie de la lame qui passe devant la poignée
    out.push(dessinLame(lame(195, 250)));
    touffes.filter(t => t.Y <= Yh).sort((a, b) => b.Y - a.Y).forEach(t => out.push(touffe(t)));
    // la main qui tient la poignée (main gauche, vue du dos)
    out.push(h.formes.main({ x: grip[0], y: grip[1], pose: 'prise', vue: 'dos', cote: 'gauche', echelle: s, diametre: 44 * s, bras: 130 }));
    // la faucille se tire vers soi
    const f0 = P([Xh + 250, Yh + 40, 175]), f1_ = P([Xh + 420, Yh + 40, 175]);
    out.push(h.fleche(`M${pt(f0)} L${pt(f1_)}`));
    // la hauteur de coupe
    const c0 = P([Xh + 610, 5, 0]), c1 = P([Xh + 610, 5, 90]), tf = P([Xh + 581, 5, 90]);
    out.push(h.ligne(tf[0] + 2, c1[1], c1[0] + 5, c1[1], h.a.fin));
    out.push(h.cote(c0[0], c0[1], c1[0], c1[1], '80 à 100 mm', { cote: 'droite' }));
    return out.join('\n');
  }

  // ─── la gerbe liée, entière ───
  function geoGerbe(z) {
    const s = (z.h - 14) / 770, yG = z.h - 11, cx = z.l / 2;
    return { s, yG, cx, S: [cx, yG - G.L * s], tL: 0.42 };
  }
  function vueGerbe(z) {
    const { s, yG, cx, S, tL } = geoGerbe(z);
    return [sol(z, yG), gerbe({ B: [cx, yG], S, lPied: G.pied * s, lLien: G.lien * s, lHaut: G.haut * s, tL, epiL: G.epi * s, epiW: G.epiW * s, n: 11, graine: 3, lien: lienPetit(s, true) })].join('\n');
  }

  // ─── les moyettes ───
  const E = 10;                     // angle de vue au-dessus de l'horizon, en degrés
  const sMoy = z => Math.min((z.h - 14) / 790, 0.235);
  const Ht = Math.sqrt(G.L ** 2 - 230 ** 2);
  const R0 = 280, R1 = 45;
  function geoCone(z) {
    const s = sMoy(z), o = { x: z.l / 2, y: z.h - 11 - s * R0 * 0.87 * Math.sin(E * RAD), s, e: E, phi: 0 };
    const P = proj(o);
    // la pluie coule sur le dessus des gerbes de côté, vers l'extérieur
    const pluie = [-1, 1].map(sg => {
      const b = P([R0 * sg, 0, 0]).p, t = P([R1 * sg, 0, Ht]).p, u = [b[0] - t[0], b[1] - t[1]], l = Math.hypot(u[0], u[1]);
      const n = [sg * -u[1] / l, sg * u[0] / l];
      const n2 = n[0] * sg < 0 ? mul(n, -1) : n;     // vers l'extérieur
      const p0 = add(add(t, mul(u, 0.26)), mul(n2, 99 * s + 6)), p1 = add(add(t, mul(u, 0.6)), mul(n2, 81 * s + 6));
      return [p0, p1];
    });
    return { s, P, yF: z.h - 11, pluie };
  }
  const AIR_CONE = [[-420, -560, 40], [-150, -440, 50], [0, -260, 80], [0, -90, 260], [0, 0, 470]];
  function vueCone(z) {
    const { s, P, yF, pluie } = geoCone(z);
    const gs = [120, 60, 180, 0, -120, -60].map((a, i) => gerbe3D(P, s, [R0 * Math.cos(a * RAD), R0 * Math.sin(a * RAD), 0], [R1 * Math.cos(a * RAD), R1 * Math.sin(a * RAD), Ht], 11 + i * 3));
    const out = [sol(z, yF + 1)];
    gs.sort((a, b) => b.D - a.D).forEach(g => out.push(g.svg));
    // l'air entre par le bas, entre les pieds, et monte dedans
    const air = AIR_CONE.map(p => P(p).p);
    out.push(h.fleche(lisse(air), h.a.cache));
    for (const [p0, p1] of pluie) out.push(h.fleche(`M${pt(p0)} L${pt(p1)}`));
    return out.join('\n');
  }
  const PHI = 55, NP = 4, PAS = 210;
  const AIR_R = [[-640, 0, 190], [(NP - 1) * PAS + 60, 0, 190]];
  function geoRangee(z) {
    const s = sMoy(z), o = { x: 0, y: 0, s, e: E, phi: PHI };
    const P0 = proj(o);
    // cadrage : tout ce qui se dessine, l'entrée d'air comprise
    const xs = [P0(AIR_R[0]).p[0] - 4];
    for (let i = 0; i < NP; i++) for (const sg of [-1, 1]) { const x = P0([i * PAS, sg * 270, 0]).p[0]; xs.push(x - G.pied * s, x + G.pied * s); }
    const x0 = (z.l - (Math.max(...xs) - Math.min(...xs))) / 2 - Math.min(...xs);
    const Dmin = -270 * Math.cos(PHI * RAD);
    const yF = z.h - 11, y0 = yF + s * Dmin * Math.sin(E * RAD);
    return { s, P: proj({ ...o, x: x0, y: y0 }), yF };
  }
  function vueRangee(z) {
    const { s, P, yF } = geoRangee(z);
    const gs = [];
    for (let i = 0; i < NP; i++) {
      const X = i * PAS;
      gs.push(gerbe3D(P, s, [X, -270, 0], [X, -40, Ht], 40 + i * 5));
      gs.push(gerbe3D(P, s, [X, 270, 0], [X, 40, Ht], 43 + i * 5));
    }
    const out = [sol(z, yF + 1)];
    gs.sort((a, b) => b.D - a.D).forEach(g => out.push(g.svg));
    const air = AIR_R.map(p => P(p).p);
    out.push(h.fleche(lisse(air), h.a.cache));
    return out.join('\n');
  }

  return {
    ref: '98-06',
    titre: 'Couper, lier, dresser en moyettes',
    desc: 'La coupe à la faucille, une poignée à la fois tenue dans l’autre main, à 80 à 100 mm du sol ; la gerbe liée d’un lien de paille tordue, en trois temps (joindre les deux bouts, les tordre ensemble, rentrer la torsade sous le lien) ; les gerbes dressées debout, épis en haut, appuyées en cône ou en double rangée pour que l’air passe dedans et que la pluie coule dessus.',
    format: 'pleine',
    disposition: [['couper', 'gerbe'], ['l1', 'l2', 'l3'], ['cone', 'rangee']],
    hauteurs: [1.3, 0.8, 1.05],
    largeurs: [[2.4, 1], [1, 1, 1], [1, 1.25]],
    vues: {
      couper: {
        titre: 'Couper, une poignée à la fois',
        dessin: vueCouper,
        renvois: z => {
          const { grip, P } = geoCouper(z);
          const lame = P([Xh + 83 + 105 * Math.cos(150 * RAD) - 10, Yh + 105 * Math.sin(150 * RAD), 90 + 105 * Math.sin(150 * RAD) * 0.55]);
          return [
            { n: 1, rond: [grip[0] + 70, grip[1] - 40], cible: [grip[0] + 16, grip[1] - 8], texte: 'une poignée serrée dans la main' },
            { n: 2, rond: [grip[0] - 70, z.h - 50], cible: lame, texte: 'la faucille, tirée vers soi' },
          ];
        },
      },
      gerbe: {
        titre: 'La gerbe liée',
        dessin: vueGerbe,
        renvois: z => {
          const { s, yG, cx, S, tL } = geoGerbe(z);
          const yLien = yG - G.L * s * tL;
          return [
            { n: 3, rond: [z.l - 14, S[1] - 40], cible: [cx + 30, S[1] - 20], texte: 'les épis en haut' },
            { n: 4, rond: [14, yLien - 26], cible: [cx - G.lien * s + 3, yLien], texte: 'le lien de paille tordue' },
            { n: 5, rond: [z.l - 14, yG - 30], cible: [cx + G.pied * s - 6, yG - 8], texte: 'le pied' },
          ];
        },
      },
      l1: { titre: 'Joindre les deux bouts', dessin: z => taille(z, 1) },
      l2: { titre: 'Les tordre ensemble', dessin: z => taille(z, 2) },
      l3: { titre: 'Rentrer sous le lien', dessin: z => taille(z, 3) },
      cone: {
        titre: 'La moyette en cône',
        dessin: vueCone,
        renvois: z => {
          const { P, pluie, yF } = geoCone(z);
          const hautG = P([120, -70, Ht * 0.9]).p, air = P(AIR_CONE[0]).p;
          const pm = [(pluie[0][0][0] + pluie[0][1][0]) / 2, (pluie[0][0][1] + pluie[0][1][1]) / 2];
          return [
            { n: 6, rond: [z.l - 16, 22], cible: hautG, texte: 'gerbes appuyées, épis en haut' },
            { n: 7, rond: [16, yF - 18], cible: air, texte: 'l’air passe dedans' },
            { n: 8, rond: [16, pm[1] + 26], cible: pm, texte: 'la pluie coule dessus' },
          ];
        },
      },
      rangee: {
        titre: 'La moyette en double rangée',
        dessin: vueRangee,
        renvois: z => {
          const { P } = geoRangee(z);
          const haut = P([2 * PAS, 0, Ht + 10]).p;
          return [{ n: 9, rond: [z.l - 16, 20], cible: haut, texte: 'deux rangées, épis contre épis' }];
        },
      },
    },
  };
};
