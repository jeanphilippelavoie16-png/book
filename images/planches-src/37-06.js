// Planche 37-06 — Le balai de bouleau (ch. 37, « Le balai de bouleau », étapes 1 et 2).
//
// Ce que le chapitre dit, et rien d'autre :
//   En été, par temps sec, couper des branches de bouleau à papier d'environ 50 cm, pleines de
//   feuilles, sans en couper le bout. Les réunir, le dessous pâle des feuilles vers l'extérieur, et
//   lier le manche à deux endroits d'une pousse de saule d'un an, tordue pour l'assouplir, le bout
//   repassé dans le manche.
//
// Une seule cote : les 500 mm de la branche (« environ 50 cm »). La longueur du manche, le nombre de
// tours et la place des deux liens ne sont pas dans le chapitre : ils sont dessinés sans cote. Le
// début de la pousse pris sous les tours est un choix de dessin (le chapitre ne dit pas comment on
// tient le début) : c'est ce qui laisse le lien tenir avec un seul bout repassé.
//
// Les feuilles : dessus en hachure (foncé), dessous en blanc avec ses nervures (pâle). Sur le balai,
// ce qui se voit de devant est le dessous ; le dessus ne se devine qu'entre les feuilles, dedans.
// Les tours de saule : un brin rond suivi par son axe, les tours vus de devant (un peu d'en haut),
// ce qui passe dessous en tireté. Aucune main : l'objet et la flèche du geste.
module.exports = (h) => {
  const N = '#1A1A1A', B = '#FFFFFF';
  const f = v => Math.round(v * 10) / 10;
  const P = p => `${f(p[0])} ${f(p[1])}`;
  const RAD = Math.PI / 180, TAU = 2 * Math.PI;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const dir = deg => [Math.cos(deg * RAD), Math.sin(deg * RAD)];
  const angle = v => Math.atan2(v[1], v[0]) / RAD;
  const rot = (v, deg) => { const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD); return [v[0] * c - v[1] * s, v[0] * s + v[1] * c]; };
  const tr = (ep, fond = 'none', extra = '') => `fill="${fond}" stroke="${N}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"${extra}`;
  const poly = (pts, at, ferme = true) => `<path d="M${pts.map(P).join(' L')}${ferme ? ' Z' : ''}" ${at}/>`;
  const hasard = graine => { let s = graine; return () => (s = (s * 16807) % 2147483647) / 2147483647; };

  // Une courbe par des points (Catmull-Rom), échantillonnée finement.
  const echant = (pts, pas = 1.5) => {
    const res = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      const c1 = add(p1, mul(sub(p2, p0), 1 / 6)), c2 = sub(p2, mul(sub(p3, p1), 1 / 6));
      const m = Math.max(2, Math.ceil(Math.hypot(...sub(p2, p1)) / pas));
      for (let j = 0; j < m; j++) {
        const t = j / m, s = 1 - t;
        res.push([s * s * s * p1[0] + 3 * s * s * t * c1[0] + 3 * s * t * t * c2[0] + t * t * t * p2[0],
          s * s * s * p1[1] + 3 * s * s * t * c1[1] + 3 * s * t * t * c2[1] + t * t * t * p2[1]]);
      }
    }
    res.push(pts[pts.length - 1]);
    return res;
  };

  // Une tige de bouleau : un trait plein qui s'amincit de w0 (pied) à w1 (bout).
  const tige = (pts, w0, w1) => {
    const q = echant(pts);
    const cum = [0];
    for (let i = 1; i < q.length; i++) cum.push(cum[i - 1] + Math.hypot(...sub(q[i], q[i - 1])));
    const tot = cum[cum.length - 1];
    const tan = i => uni(sub(q[Math.min(i + 1, q.length - 1)], q[Math.max(i - 1, 0)]));
    const g = [], d = [];
    q.forEach((p, i) => {
      const t = tan(i), n = [-t[1], t[0]], w = (w0 + (w1 - w0) * cum[i] / tot) / 2;
      g.push(add(p, mul(n, w))); d.push(sub(p, mul(n, w)));
    });
    const svg = poly(g.concat(d.reverse()), `fill="${N}" stroke="none"`);
    const at = s => { let i = cum.findIndex(c => c >= s * tot); if (i < 0) i = q.length - 1; return { p: q[i], t: tan(i) }; };
    return { svg, at, tot };
  };

  // ─── la feuille de bouleau à papier ──────────────────────────────────────────────────
  // Ovale, la base arrondie, la pointe effilée, le bord denté ; sept paires de nervures droites
  // et parallèles. A : où le pétiole s'attache ; a : direction de la feuille ; L : longueur du
  // limbe ; k : largeur apparente (1 : vue de face, moins : vue de biais).
  const PROFIL = [[0, 0], [0.02, 0.13], [0.06, 0.25], [0.14, 0.335], [0.27, 0.37], [0.42, 0.345], [0.58, 0.28], [0.73, 0.19], [0.86, 0.1], [0.95, 0.035], [1, 0]];
  const wP = t => {
    for (let i = 1; i < PROFIL.length; i++) if (t <= PROFIL[i][0]) {
      const [t0, w0] = PROFIL[i - 1], [t1, w1] = PROFIL[i]; return w0 + (w1 - w0) * (t - t0) / (t1 - t0);
    }
    return 0;
  };
  const feuille = (A, a, L, { k = 1, courbe = 0, pet = 0.22 } = {}) => {
    const u = dir(a), n = [-u[1], u[0]];
    const base = add(A, mul(u, pet * L));
    const axe = t => add(add(base, mul(u, t * L)), mul(n, courbe * L * t * t * 0.18));
    const M = L > 60 ? 34 : 24, dents = L > 22;
    const cote = sg => {
      const pts = [];
      for (let i = 0; i <= M; i++) {
        const t = i / M;
        let p = add(axe(t), mul(n, sg * wP(t) * L * k));
        if (dents && i % 2 === 1 && t > 0.08 && t < 0.95) p = add(p, add(mul(n, sg * 0.02 * L * Math.max(k, 0.5)), mul(u, 0.012 * L)));
        pts.push(p);
      }
      return pts;
    };
    const dr = cote(1), ga = cote(-1);
    const contour = dr.concat(ga.slice(1, -1).reverse());
    const nerv = [];
    const paires = L > 60 ? 7 : 4;
    for (let i = 0; i < paires; i++) {
      const t = 0.08 + i * 0.735 / paires, te = Math.min(t + 0.15, 0.97);
      for (const sg of [1, -1]) nerv.push([axe(t), add(axe(te), mul(n, sg * wP(te) * L * k * 0.86))]);
    }
    const milieu = [0, 0.3, 0.6, 0.92].map(axe);
    return { contour, nerv, milieu, pet: [A, base], centre: axe(0.4) };
  };
  // dessus : la trame fine (motif h37-dessus, posé en fond de la feuille), nervures en blanc ;
  // dessous : blanc, nervures en noir. ep : le trait du contour ; mil, nerv : ceux des nervures.
  const nervPath = F => F.nerv.map(([a, b]) => `M${P(a)} L${P(b)}`).join(' ');
  const peindre = (F, face, { ep = 0.7, mil = 0.5, nerv = 0.5, motif = 'h37-dessus', blanc = 0.9 } = {}) => {
    const out = [poly(F.pet, tr(0.7), false)];
    if (face === 'dessus') {
      out.push(poly(F.contour, `fill="${B}" stroke="none"`), poly(F.contour, `fill="url(#${motif})" stroke="none"`));
      out.push(poly(F.milieu, `fill="none" stroke="${B}" stroke-width="${f(blanc * 1.4)}" stroke-linecap="round"`, false));
      out.push(`<path d="${nervPath(F)}" fill="none" stroke="${B}" stroke-width="${blanc}" stroke-linecap="round"/>`);
    } else {
      out.push(poly(F.contour, `fill="${B}" stroke="none"`));
      out.push(poly(F.milieu, tr(mil), false), `<path d="${nervPath(F)}" ${tr(nerv)}/>`);
    }
    out.push(poly(F.contour, tr(ep)));
    return out.join('\n');
  };
  const MOTIFS = ['<defs>',
    `<pattern id="h37-dessus" width="2.2" height="2.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="2.2" stroke="${N}" stroke-width="0.5"/></pattern>`,
    `<pattern id="h37-dessus-l" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="3" stroke="${N}" stroke-width="0.7"/></pattern>`,
    '</defs>'].join('');

  // ─── le brin de saule ────────────────────────────────────────────────────────────────
  // Un brin rond de diamètre t suivi par son axe : chaque point porte la direction de son épaisseur
  // (o, vers la gauche du sens de marche). Dans les tours, o reste vertical : c'est le brin vu de
  // devant sur le manche. Bouts : 'rond' (le brin qui tourne derrière le manche) ou 'coupe'.
  const oDe = d => [d[1], -d[0]];
  const segment = (a, b, n = 6) => {
    const o = oDe(uni(sub(b, a)));
    return Array.from({ length: n + 1 }, (_, i) => ({ p: add(a, mul(sub(b, a), i / n)), o }));
  };
  const arc = (C, r, p1, p2, n = 10) => Array.from({ length: n + 1 }, (_, i) => {
    const ph = p1 + (p2 - p1) * i / n, s = Math.sign(p2 - p1);
    return { p: add(C, [r * Math.cos(ph), r * Math.sin(ph)]), o: oDe([-s * Math.sin(ph), s * Math.cos(ph)]) };
  });
  const bout = (pt, t, type, vers, debut) => {
    if (type !== 'rond') return [];
    const c = pt.p, o = pt.o, v = vers;
    return Array.from({ length: 9 }, (_, i) => {
      const ph = debut ? Math.PI - Math.PI * i / 8 : Math.PI * i / 8;
      return add(c, mul(add(mul(o, Math.cos(ph)), mul(v, Math.sin(ph))), t / 2));
    });
  };
  // les fibres tordues : de courts traits en biais, tous dans le même sens
  const fibres = (pts, t, ep = 0.5) => {
    const out = [], pas = 0.95 * t;
    const cum = [0];
    for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(...sub(pts[i].p, pts[i - 1].p)));
    const tot = cum[cum.length - 1];
    let prochain = 0.55 * t;
    for (let i = 1; i < pts.length; i++) {
      if (cum[i] < prochain || cum[i] > tot - 0.55 * t) continue;
      prochain = cum[i] + pas;
      const { p, o } = pts[i], u = [-o[1], o[0]];
      const a = add(add(p, mul(o, 0.47 * t)), mul(u, -0.36 * t)), b = add(add(p, mul(o, -0.47 * t)), mul(u, 0.36 * t)), c = add(p, mul(u, 0.14 * t));
      out.push(`M${P(a)} Q${P(c)} ${P(b)}`);
    }
    return out.length ? `<path d="${out.join(' ')}" ${tr(ep)}/>` : '';
  };
  const brin = (pts, t, { debut = 'coupe', fin = 'coupe', vDebut = [0, 0], vFin = [0, 0], ep = 1.4, marques = true } = {}) => {
    const g = pts.map(q => add(q.p, mul(q.o, t / 2))), d = pts.map(q => sub(q.p, mul(q.o, t / 2)));
    // biseau : le bout coupé en biais au couteau
    const biseau = (i, sg) => { const o = pts[i].o, u = [-o[1], o[0]]; g[i] = add(g[i], mul(u, sg * 0.3 * t)); d[i] = add(d[i], mul(u, -sg * 0.3 * t)); };
    if (fin === 'biseau') biseau(pts.length - 1, 1);
    if (debut === 'biseau') biseau(0, -1);
    const c = g.concat(bout(pts[pts.length - 1], t, fin, vFin, false), d.reverse(), bout(pts[0], t, debut, vDebut, true));
    return [poly(c, tr(ep, B)), marques ? fibres(pts, t) : ''].join('\n');
  };

  // Les tours vus de devant, un peu d'en haut : x = cx + a sin θ, y = y0 + b cos θ + c θ.
  // Devant quand cos θ > 0 ; un tour descend d'un pas (= t, les tours se touchent).
  const helice = (cx, R, t, y0, e) => {
    const a = R + t / 2, b = e * a, c = t / TAU;
    const at = th => [cx + a * Math.sin(th), y0 + b * Math.cos(th) + c * th];
    const tours = (th1, th2, n = 36) => Array.from({ length: n + 1 }, (_, i) => ({ p: at(th1 + (th2 - th1) * i / n), o: [0, -1] }));
    const thX = (x, k) => Math.asin(Math.max(-1, Math.min(1, (x - cx) / a))) + TAU * k;
    const bord = (x, k, sg) => at(thX(x, k))[1] + sg * t / 2;
    return { at, tours, thX, bord, a };
  };

  // La ligature : le début couché le long du manche, pris sous les tours ; les tours ; le bout
  // repassé dans le manche, sous les tours, qui ressort en haut. etape 'enrouler' : les deux
  // premiers tours faits, la pousse libre qui revient par la gauche.
  const ligature = (cx, R, t, y0, { e = 0.22, pleins = 2, ecart = 12, bas = 28, haut = 26, etape = 'fini', caches = true, pointes = true, marques = true, ep = 1.4 } = {}) => {
    const H = helice(cx, R, t, y0, e), K = pleins + 1, rb = t / 2 + 1.5;
    const xs = cx - ecart, xe = cx + ecart, xL = xs - rb, xT = xe + rb;
    const thS = H.thX(xs, 0), pS = H.at(thS);
    const thE = H.thX(xe, K), pE = H.at(thE);
    const opt = { ep, marques };
    const dern = etape === 'fini' ? K : K - 1;             // le tour le plus bas qui passe sur le début
    const out = [];
    // le bout du début, qui dépasse sous les tours
    const yS1 = H.bord(xL, dern, 1);
    if (pointes) out.push(brin(segment([xL, yS1 - 4], [xL, yS1 + bas]), t, opt));
    // le bout repassé, qui ressort au-dessus des tours
    const yE2 = H.bord(xT, 0, -1);
    if (etape === 'fini' && pointes) out.push(brin(segment([xT, yE2 + 4], [xT, yE2 - haut]), t, opt));
    // le premier tour : le début monte, tourne et part vers la droite
    out.push(brin([...segment([xL, pS[1] + rb + 5], [xL, pS[1] + rb], 2), ...arc([xs, pS[1] + rb], rb, Math.PI, 1.5 * Math.PI).slice(1), ...H.tours(thS, Math.PI / 2).slice(1)],
      t, { ...opt, fin: 'rond', vFin: [1, 0] }));
    // le dernier tour : de la gauche jusqu'au milieu, puis il remonte sous les tours
    if (etape === 'fini') {
      out.push(brin([...H.tours(TAU * K - Math.PI / 2, thE), ...arc([xe, pE[1] - rb], rb, Math.PI / 2, 0).slice(1), ...segment([xT, pE[1] - rb], [xT, pE[1] - rb - 5], 2).slice(1)],
        t, { ...opt, debut: 'rond', vDebut: [-1, 0] }));
    }
    // les tours pleins
    for (let k = 1; k <= pleins; k++) out.push(brin(H.tours(TAU * k - Math.PI / 2, TAU * k + Math.PI / 2), t, { ...opt, debut: 'rond', vDebut: [-1, 0], fin: 'rond', vFin: [1, 0] }));
    // ce qui passe dessous, en tireté
    if (caches) {
      const y1 = H.bord(xL, 1, -1) + 1, y2 = H.bord(xL, dern, 1) - 1;
      out.push(h.ligne(xL - t / 2, y1, xL - t / 2, y2, h.a.cache), h.ligne(xL + t / 2, y1, xL + t / 2, y2, h.a.cache));
      if (etape === 'fini') {
        const z1 = H.bord(xT, K - 1, 1) - 1, z2 = H.bord(xT, 0, -1) + 1;
        out.push(h.ligne(xT - t / 2, z1, xT - t / 2, z2, h.a.cache), h.ligne(xT + t / 2, z1, xT + t / 2, z2, h.a.cache));
      }
    }
    return { svg: out.join('\n'), H, K, xL, xT, yS1, yE2, pS, pE, rb };
  };

  // Le manche vu de près : les tiges côte à côte, coupées en bas, rompues en haut.
  const manche = (cx, R, yH, yB, graine, n = 6) => {
    const r = hasard(graine), lg = 2 * R / n, out = [], lent = [];
    let yb0 = 0, ybn = 0;
    for (let i = 0; i < n; i++) {
      const x1 = cx - R + i * lg, x2 = x1 + lg, xm = (x1 + x2) / 2, w = lg / 2;
      const yb = yB - r() * 7, yh = yH + r() * 3;
      if (i === 0) yb0 = yb;
      if (i === n - 1) ybn = yb;
      out.push(h.path(`M${f(x1)} ${f(yh + 1.5)} Q${f(xm - w / 2)} ${f(yh - 1.5)} ${f(xm)} ${f(yh)} Q${f(xm + w / 2)} ${f(yh + 1.5)} ${f(x2)} ${f(yh - 1)} L${f(x2)} ${f(yb)} A${f(w)} ${f(lg * 0.22)} 0 0 1 ${f(x1)} ${f(yb)} Z`, tr(0.7, B)));
      for (let j = 0; j < 4; j++) {
        const y = yH + 12 + r() * (yB - yH - 30), x = xm + (r() - 0.5) * w;
        lent.push(h.ligne(x - 1.3, y, x + 1.3, y, tr(0.5)));
      }
    }
    // deux chicots de rameaux coupés
    const chicot = (x, y, sg) => poly([[x, y + 3], [x + sg * 5, y - 2.5], [x + sg * 6.6, y - 1], [x, y + 6.5]], tr(0.7, B));
    out.push(...lent, chicot(cx - R, yH + 26, -1), chicot(cx + R, yB - 38, 1));
    out.push(h.ligne(cx - R, yH + 2, cx - R, yb0, h.a.arete), h.ligne(cx + R, yH + 1, cx + R, ybn, h.a.arete));
    return out.join('\n');
  };

  // ─── 1. couper la branche ────────────────────────────────────────────────────────────
  const X0 = 132, YP = 358, YT = 30;
  let pointe = [0, 0];
  const couper = () => {
    const R = hasard(31);
    const T = tige([[X0, YP], [X0 + 3, 300], [X0 - 1, 232], [X0 - 4, 162], [X0 - 2, 96], [X0 - 5, YT]], 4.2, 0.7);
    pointe = [X0 - 5, YT];
    const rameaux = [], F = [];
    const face = () => (R() < 0.55 ? 'dessus' : 'dessous');
    for (const [s, sg, lg] of [[0.17, 1, 44], [0.29, -1, 52], [0.41, 1, 50], [0.53, -1, 42], [0.65, 1, 34], [0.76, -1, 24]]) {
      const { p, t } = T.at(s), d0 = rot(t, sg * 44);
      const fin = add(p, mul(d0, lg)), mil = add(add(p, mul(d0, lg * 0.5)), mul(rot(d0, -sg * 90), lg * 0.07));
      const tw = tige([p, mil, fin], 1.9, 0.6);
      rameaux.push(tw.svg);
      const m = tw.at(0.5);
      F.push({ A: m.p, a: angle(rot(m.t, -sg * 48)), L: 34 + R() * 6 });
      F.push({ A: fin, a: angle(rot(d0, sg * 26)), L: 36 + R() * 6 });
      F.push({ A: tw.at(0.86).p, a: angle(rot(d0, -sg * 36)), L: 30 + R() * 6 });
    }
    [0.1, 0.23, 0.35, 0.47, 0.59, 0.7, 0.8, 0.87, 0.92].forEach((s, i) => {
      const { p, t } = T.at(s), sg = i % 2 ? 1 : -1;
      F.push({ A: p, a: angle(rot(t, sg * (48 + R() * 10))), L: Math.max(17, 40 - 26 * s * s) + R() * 4 });
    });
    const bt = T.at(0.965);
    F.push({ A: bt.p, a: angle(rot(bt.t, 24)), L: 13 }, { A: bt.p, a: angle(rot(bt.t, -26)), L: 11 });
    const out = [MOTIFS, T.svg, ...rameaux];
    for (const q of F) out.push(peindre(feuille(q.A, q.a, q.L, { k: 0.8 + R() * 0.2, courbe: (R() - 0.5) * 0.6 }), face()));
    // la cote et ses lignes de rappel
    out.push(h.ligne(62, YT, X0 - 12, YT, h.a.fin), h.ligne(62, YP, X0 - 6, YP, h.a.fin));
    out.push(h.cote(68, YT, 68, YP, '≈ 500 mm', { cote: 'gauche' }));
    return out.join('\n');
  };

  // ─── 2. le balai : réunir, lier à deux endroits ──────────────────────────────────────
  let feuilleRenvoi = [0, 0], lienHaut = [0, 0];
  const reunir = z => {
    const R = hasard(7);
    const cx = z.l / 2, yM = 250, yB = 358, RM = 13;
    const tiges = [
      [-10, -64, -52, 184], [-6.5, -44, -34, 206], [-3, -22, -16, 222], [0.5, 2, -2, 228],
      [4, 24, 18, 220], [7.5, 45, 36, 204], [11, 64, 50, 182],
    ].map(([ox, d1, dT, Ls]) => tige([[cx + ox * 0.8, yM + 8], [cx + ox * 1.2, yM - 14], [cx + ox * 1.2 + d1 * 0.55, yM - 58], [cx + d1, yM - 118], [cx + dT, yM - Ls]], 3, 0.7));
    const larg = 100;
    const devant = [], derriere = [];
    // le dedans : des feuilles tournées dessus, qu'on ne voit qu'entre les autres
    for (let i = 0; i < 18; i++) {
      const x = cx + (R() - 0.5) * 110, y = 60 + R() * 150;
      const a = angle(sub([x, y], [cx, yM + 10])) + (R() - 0.5) * 50;
      derriere.push(peindre(feuille([x, y], a, 32 + R() * 6, { k: 0.85 }), 'dessus'));
    }
    tiges.forEach((T, j) => {
      const nb = Math.round(T.tot / 19);
      for (let i = 0; i <= nb; i++) {
        const s = 0.1 + 0.9 * i / nb, { p, t } = T.at(s);
        const sg = (i + j) % 2 ? 1 : -1;
        const L = (31 + R() * 9) * (1 - 0.5 * s ** 4);
        const aa = s < 0.16 ? sg * (95 + R() * 20) : sg * (34 + R() * 22);
        devant.push({ A: p, a: angle(rot(t, aa)), L });
      }
      const b = T.at(1);
      devant.push({ A: b.p, a: angle(b.t), L: 13 });
    });
    const Fd = devant.map(q => {
      const F = feuille(q.A, q.a, q.L, { courbe: (R() - 0.5) * 0.5, k: 1 });
      const dx = Math.min(1, Math.abs(F.centre[0] - cx) / larg);
      const k = Math.max(0.45, 1 - 0.55 * dx * dx) * (0.85 + R() * 0.15);
      return { F: feuille(q.A, q.a, q.L, { courbe: (R() - 0.5) * 0.5, k }), z: -dx + R() * 0.15 };
    }).sort((a, b) => a.z - b.z);
    // la feuille désignée : une feuille de devant, à droite, vers le haut
    const cand = Fd.filter(q => q.F.centre[0] > cx + 30 && q.F.centre[1] < 150 && q.F.centre[1] > 90);
    feuilleRenvoi = cand.length ? cand[cand.length - 1].F.centre : [cx + 50, 120];
    // le manche : les tiges en faisceau, et les deux liens
    const faisceau = [];
    const n = 7, lg = 2 * RM / n;
    for (let i = 0; i < n; i++) {
      const x1 = cx - RM + i * lg, x2 = x1 + lg, yb = yB - R() * 5;
      faisceau.push(h.path(`M${f(x1)} ${yM - 6} L${f(x2)} ${yM - 6} L${f(x2)} ${f(yb)} A${f(lg / 2)} ${f(lg * 0.25)} 0 0 1 ${f(x1)} ${f(yb)} Z`, tr(0.5, B)));
    }
    faisceau.push(h.ligne(cx - RM, yM - 6, cx - RM, yB - 2, h.a.arete), h.ligne(cx + RM, yM - 6, cx + RM, yB - 2, h.a.arete));
    const lig1 = ligature(cx, RM, 4.4, yM + 18, { e: 0.25, pleins: 1, ecart: 4, caches: false, pointes: false, ep: 0.7 });
    const lig2 = ligature(cx, RM, 4.4, yB - 36, { e: 0.25, pleins: 1, ecart: 4, caches: false, pointes: false, ep: 0.7 });
    lienHaut = [cx - RM - 3, lig1.H.at(TAU - Math.PI / 2)[1]];
    return [...derriere, ...tiges.map(T => T.svg), ...faisceau, lig1.svg, lig2.svg,
      ...Fd.map(q => peindre(q.F, 'dessous'))].join('\n');
  };

  // ─── 3. la feuille, dessus et dessous ────────────────────────────────────────────────
  let fDessus = [0, 0], fDessous = [0, 0];
  const lafeuille = z => {
    const cx = z.l / 2 - 4;
    const F1 = feuille([cx, 176], -94, 100, { courbe: 0.2 }), F2 = feuille([cx, 368], -86, 100, { courbe: -0.2 });
    fDessus = add(F1.centre, [18, -6]); fDessous = add(F2.centre, [18, 4]);
    return [peindre(F1, 'dessus', { ep: 1.4, motif: 'h37-dessus-l', blanc: 1.2 }), peindre(F2, 'dessous', { ep: 1.4, mil: 0.7, nerv: 0.5 })].join('\n');
  };

  // ─── 4. tordre la pousse de saule ────────────────────────────────────────────────────
  const XS = 52, TS = 12, Y1 = 66, Y2 = 146;
  const tordre = () => {
    const out = [];
    const r0 = TS / 2;
    // les deux flèches de torsion : en haut dans un sens, en bas dans l'autre
    const rotation = (yc, sens) => {
      const rx = 24, ry = 6, pt = th => [XS + sens * rx * Math.sin(th), yc + ry * Math.cos(th)];
      const pts = (a, b, n = 24) => Array.from({ length: n + 1 }, (_, i) => pt(a + (b - a) * i / n));
      return { dos: poly(pts(0.72 * Math.PI, 1.5 * Math.PI), h.a.arete, false), face: h.fleche(`M${pts(1.5 * Math.PI, 2.42 * Math.PI).map(P).join(' L')}`) };
    };
    const hautR = rotation(Y1 - 20, 1), basR = rotation(Y2 + 20, -1);
    out.push(hautR.dos, basR.dos);
    // la pousse : lisse en haut et en bas, tordue entre les deux prises (le bord ondule)
    const g = [], d = [];
    for (let y = 6; y <= 204; y += 1.5) {
      const r = r0 - 0.5 * (204 - y) / 198;
      const tw = y > Y1 && y < Y2 ? 0.8 : 0;
      g.push([XS - r - tw * Math.sin((y - Y1) / 9 * TAU), y]);
      d.push([XS + r + tw * Math.sin((y - Y1) / 9 * TAU + Math.PI), y]);
    }
    out.push(poly([[XS - r0 + 0.5, 6], [XS + r0 - 0.5, 4.5], ...d, ...g.reverse()], tr(1.4, B)));
    // les fibres tordues, qui s'ouvrent un peu
    for (let y = Y1 + 5; y < Y2 - 3; y += 8.5) {
      out.push(h.path(`M${f(XS - r0 + 0.8)} ${f(y + 3.4)} Q${f(XS)} ${f(y + 1.2)} ${f(XS + r0 - 0.8)} ${f(y - 3.4)}`, tr(0.5)));
    }
    for (const [ya, yb, dx] of [[Y1 + 12, Y1 + 30, -1.2], [Y1 + 44, Y1 + 60, 1.4]]) out.push(h.path(`M${f(XS + dx - 1)} ${ya} Q${f(XS + dx + 1.5)} ${(ya + yb) / 2} ${f(XS + dx)} ${yb}`, tr(0.5)));
    // les bourgeons couchés contre l'écorce, un de chaque côté, en alternance
    const bourgeon = (y, sg) => {
      const x = XS + sg * (r0 - 0.5 * (204 - y) / 198);
      return [h.path(`M${f(x - sg * 1.2)} ${y + 6} Q${f(x + sg * 5.2)} ${y + 1} ${f(x + sg * 1.6)} ${y - 10} Q${f(x - sg * 0.4)} ${y - 4} ${f(x - sg * 1.2)} ${y + 6} Z`, tr(0.7, B)),
        h.path(`M${f(x - sg * 3.2)} ${y + 8.5} Q${f(x - sg * 0.8)} ${y + 10} ${f(x + sg * 0.8)} ${y + 7.5}`, tr(0.5))].join('\n');
    };
    out.push(bourgeon(26, 1), bourgeon(178, -1));
    out.push(hautR.face, basR.face);
    return out.join('\n');
  };

  // ─── 5 et 6. le lien, de près ────────────────────────────────────────────────────────
  // Trois tours jointifs, chacun un brin rond distinct : le passage de devant descend en léger
  // biais de gauche à droite, le retour derrière se devine au bord (bout arrondi). Le tour du
  // haut part du début, couché sous les tours ; il descend tour après tour.
  const CX = 128, RR = 36, TT = 12, YL = 80, RB = TT / 2 + 1.5;
  const XG = CX - RR, XD = CX + RR, XDB = CX - 24, XT = CX + 15;
  const yTour = (k, x) => YL + k * TT + (x - XG) / (XD - XG) * TT / 2 + 2.5 * Math.sin(Math.PI * (x - XG) / (XD - XG));
  const mk = arr => arr.map((p, i) => ({ p, o: oDe(uni(sub(arr[Math.min(i + 1, arr.length - 1)], arr[Math.max(i - 1, 0)]))) }));
  const passe = (k, x1, x2, n = 30) => Array.from({ length: n + 1 }, (_, i) => { const x = x1 + (x2 - x1) * i / n; return [x, yTour(k, x)]; });
  const arcPts = (C, r, a1, a2, n = 10) => Array.from({ length: n + 1 }, (_, i) => { const a = a1 + (a2 - a1) * i / n; return add(C, [r * Math.cos(a), r * Math.sin(a)]); });
  const yDebutBas = yTour(2, XDB) + TT / 2 + 30;
  const lien = fini => {
    const out = [], opt = { debut: 'rond', vDebut: [-1, 0], fin: 'rond', vFin: [1, 0] };
    // le début : monte sous les tours, tourne et devient le tour du haut
    const y0s = yTour(0, XDB + RB);
    const deb = [[XDB, yDebutBas], [XDB, y0s + RB], ...arcPts([XDB + RB, y0s + RB], RB, Math.PI, 1.5 * Math.PI).slice(1), ...passe(0, XDB + RB, XD).slice(1)];
    // le bout repassé : la fin du dernier tour tourne vers le haut, passe sous les deux tours
    const yE = yTour(2, XT - RB), yHautBout = yTour(0, XT) - TT / 2 - 34;
    if (fini) out.push(brin(mk([[XT, yTour(1, XT) + TT / 2 + 2], [XT, yHautBout]]), TT, { fin: 'biseau' }));
    out.push(brin(mk(deb), TT, { debut: 'biseau', fin: 'rond', vFin: [1, 0] }));
    if (fini) {
      const der = [...passe(2, XG, XT - RB), ...arcPts([XT - RB, yE - RB], RB, Math.PI / 2, 0).slice(1), [XT, yTour(1, XT) + TT / 2 - 3]];
      out.push(brin(mk(der), TT, { debut: 'rond', vDebut: [-1, 0] }));
    }
    out.push(brin(mk(passe(1, XG, XD)), TT, opt));
    // ce qui passe dessous, en tireté
    const c = h.a.cache, cach = [];
    const a1 = yTour(1, XDB) - TT / 2 + 1, a2 = yTour(2, XDB) + TT / 2 - 1;
    cach.push(h.ligne(XDB - TT / 2, a1, XDB - TT / 2, a2, c), h.ligne(XDB + TT / 2, a1, XDB + TT / 2, a2, c));
    if (fini) {
      const b1 = yTour(0, XT) - TT / 2 + 1, b2 = yTour(1, XT) + TT / 2 - 1;
      cach.push(h.ligne(XT - TT / 2, b1, XT - TT / 2, b2, c), h.ligne(XT + TT / 2, b1, XT + TT / 2, b2, c));
    }
    return { svg: out.join('\n'), caches: cach.join('\n'), yHautBout };
  };
  let ligF = null;
  const enrouler = () => {
    const out = [manche(CX, RR, 6, 202, 5)];
    const L = lien(false);
    // la partie libre : la suite du tour du bas, tenue de côté, qui va passer derrière
    const y2 = yTour(2, XD);
    const libre = echant([...passe(2, XG, XD - 10, 6), [XD + 2, y2 + 1], [XD + 22, y2 + 8], [XD + 42, y2 + 26], [XD + 52, y2 + 58]], 2);
    out.push(L.svg, brin(mk(libre), TT, { debut: 'rond', vDebut: [-1, 0], fin: 'biseau' }), L.caches);
    // le tour qui vient : derrière de droite à gauche, puis devant de gauche à droite
    const ya = yDebutBas + 14, ra = RR + 14;
    const pts = Array.from({ length: 29 }, (_, i) => { const th = -Math.PI / 2 - 0.3 + (Math.PI + 0.45) * i / 28; return [CX + ra * Math.sin(th), ya + 0.22 * ra * Math.cos(th)]; });
    out.push(h.fleche(`M${pts.map(P).join(' L')}`));
    return out.join('\n');
  };
  const repasser = () => {
    const out = [manche(CX, RR, 6, 202, 5)];
    ligF = lien(true);
    out.push(ligF.svg, ligF.caches);
    out.push(h.fleche(`M${XT} ${f(ligF.yHautBout - 6)} L${XT} ${f(ligF.yHautBout - 30)}`));
    return out.join('\n');
  };

  return {
    ref: '37-06',
    titre: 'Le balai de bouleau',
    desc: 'Une branche de bouleau à papier d’environ 500 mm, pleine de feuilles, le bout gardé entier. Le balai : les branches réunies, le dessous pâle des feuilles tourné vers l’extérieur, le manche lié à deux endroits. La feuille, dessus foncé et dessous pâle aux nervures marquées. La pousse de saule d’un an tordue entre deux prises, en sens contraires, pour l’assouplir. Le lien de près : la pousse enroulée serré autour du manche, par-dessus son début couché le long des tiges ; puis le bout repassé dans le manche, sous les tours, qui ressort en haut et qu’on tire pour serrer.',
    format: 'pleine',
    disposition: [['couper', 'reunir', 'feuille'], ['tordre', 'enrouler', 'repasser']],
    hauteurs: [1.75, 1],
    largeurs: [[1.15, 1.3, 0.75], [0.7, 1.15, 1.15]],
    vues: {
      couper: {
        titre: 'Couper, par temps sec', dessin: couper,
        renvois: () => [{ n: 1, rond: [180, 26], cible: add(pointe, [2, 4]), texte: 'le bout gardé entier' }],
      },
      reunir: {
        titre: 'Réunir, lier le manche', dessin: reunir,
        renvois: z => [
          { n: 2, rond: [z.l - 12, 40], cible: feuilleRenvoi, texte: 'le dessous pâle des feuilles en dehors' },
          { n: 3, rond: [40, 290], cible: lienHaut, texte: 'le manche lié à deux endroits' },
        ],
      },
      feuille: {
        titre: 'La feuille', dessin: lafeuille,
        renvois: z => [
          { n: 4, rond: [z.l - 12, 40], cible: fDessus, texte: 'dessus : en dedans' },
          { n: 5, rond: [z.l - 12, 232], cible: fDessous, texte: 'dessous pâle : en dehors' },
        ],
      },
      tordre: {
        titre: 'Tordre la pousse', dessin: tordre,
        renvois: z => [
          { n: 6, rond: [z.l - 14, 190], cible: [XS + 5, 186], texte: 'pousse de saule d’un an' },
          { n: 7, rond: [z.l - 14, 106], cible: [XS + 5, 106], texte: 'tordue pour l’assouplir' },
        ],
      },
      enrouler: {
        titre: 'Enrouler serré', dessin: enrouler,
        renvois: z => [
          { n: 8, rond: [z.l - 14, 60], cible: [CX + 20, yTour(1, CX + 20)], texte: 'les tours, par-dessus le début' },
          { n: 9, rond: [24, f(yDebutBas - 12)], cible: [XDB - 4.5, yDebutBas - 12], texte: 'le début, couché le long du manche' },
        ],
      },
      repasser: {
        titre: 'Repasser le bout, tirer', dessin: repasser,
        renvois: z => [
          { n: 10, rond: [z.l - 14, 46], cible: [XT + 4, yTour(0, XT) - TT / 2 - 14], texte: 'le bout repassé dans le manche' },
        ],
      },
    },
  };
};
