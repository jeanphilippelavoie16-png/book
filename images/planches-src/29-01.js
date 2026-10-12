// Planche 29-01 — La serviette lavable, l'âme, le sachet de sphaigne, la ceinture.
// Chapitre 29, §9-A (« La serviette cousue », « La sphaigne », étape 5).
// Aucune cote : le chapitre ne donne aucune mesure de la serviette. Les proportions suivent
// le texte : l'enveloppe a la largeur de l'entrejambe, les ailes se croisent dessous.

const N = '#1A1A1A', B = '#FFFFFF';
const f = v => Math.round(v * 10) / 10;
const P = p => `${f(p[0])} ${f(p[1])}`;
const tr = (ep, extra = '') => `fill="none" stroke="${N}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"${extra}`;
const rempli = ep => `fill="${B}" stroke="${N}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
const COUTURE = tr(0.7, ' stroke-dasharray="2.6 2.2"');
const PLI = tr(0.5, ' stroke-dasharray="10 3 2 3"');
const BL = `fill="${B}" stroke="none"`;
const NP = `fill="${N}" stroke="none"`;
const RAD = Math.PI / 180;
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const quad = (a, c, b, t) => { const m = 1 - t; return [m * m * a[0] + 2 * m * t * c[0] + t * t * b[0], m * m * a[1] + 2 * m * t * c[1] + t * t * b[1]]; };
const poly = (pts, ferme = false) => 'M ' + pts.map(P).join(' L ') + (ferme ? ' Z' : '');

// ─── La serviette à plat, en mm (proportions seulement, rien d'imprimé) ─────────────────
const L = 260, W = 66, E = 48, R = 12, BW = 44, TW = 26;

// Contour en plan (X le long, Z en travers), en segments. Il commence au bout droit (le bout
// ouvert) : segments 0 et 1 et le dernier forment ce bout.
function contour(d = 0) {
  const hl = L / 2 - d, hw = W / 2 - d, zt = W / 2 + E - d, tw = TW - d, bw = BW + d, r = Math.max(4, R - d);
  const start = [hl, -hw + r];
  const s = [];
  s.push(['L', [hl, hw - r]], ['Q', [hl, hw], [hl - r, hw]]);
  s.push(['L', [bw + 12, hw]], ['Q', [bw, hw], [bw - 4, hw + 8]], ['L', [tw + 4, zt - 10]], ['Q', [tw, zt], [tw - 12, zt]],
    ['L', [-tw + 12, zt]], ['Q', [-tw, zt], [-tw - 4, zt - 10]], ['L', [-bw + 4, hw + 8]], ['Q', [-bw, hw], [-bw - 12, hw]]);
  s.push(['L', [-hl + r, hw]], ['Q', [-hl, hw], [-hl, hw - r]], ['L', [-hl, -hw + r]], ['Q', [-hl, -hw], [-hl + r, -hw]]);
  s.push(['L', [-bw - 12, -hw]], ['Q', [-bw, -hw], [-bw + 4, -hw - 8]], ['L', [-tw - 4, -zt + 10]], ['Q', [-tw, -zt], [-tw + 12, -zt]],
    ['L', [tw - 12, -zt]], ['Q', [tw, -zt], [tw + 4, -zt + 10]], ['L', [bw - 4, -hw - 8]], ['Q', [bw, -hw], [bw + 12, -hw]]);
  s.push(['L', [hl - r, -hw]], ['Q', [hl, -hw], start]);
  return { start, s };
}
// Chemin SVG d'une suite de segments, par une transformation affine T.
function chemin(c, T, de = 0, a = null, ferme = false) {
  const segs = c.s.slice(de, a == null ? c.s.length : a);
  let p = c.start;
  for (let i = 0; i < de; i++) p = c.s[i][c.s[i].length - 1];
  let d = `M ${P(T(p))}`;
  segs.forEach(sg => { d += sg[0] === 'L' ? ` L ${P(T(sg[1]))}` : ` Q ${P(T(sg[1]))} ${P(T(sg[2]))}`; });
  return d + (ferme ? ' Z' : '');
}
// Échantillonne le contour en points de plan, avec l'indice du segment.
function echantillons(c, n = 8) {
  const out = [{ p: c.start, i: -1 }];
  let p = c.start;
  c.s.forEach((sg, i) => {
    for (let k = 1; k <= n; k++) out.push({ p: sg[0] === 'L' ? lerp(p, sg[1], k / n) : quad(p, sg[1], sg[2], k / n), i });
    p = sg[sg.length - 1];
  });
  return out;
}

// Une épingle de sûreté : ressort en (x, y), couchée selon l'angle ang (degrés), longueur lg.
// cache : [a, b], la partie de la pointe qui passe derrière le tissu (fractions de la pointe).
function epingle(x, y, lg, ang, cache = null, ep = 1.3) {
  const c = Math.cos(ang * RAD), s = Math.sin(ang * RAD);
  const Q = p => [x + p[0] * c - p[1] * s, y + p[0] * s + p[1] * c];
  const r = lg * 0.06, w = tr(ep), out = [];
  const t0 = lg * 0.78;
  // la barre (le fil fixe)
  out.push(`<path d="M ${P(Q([r * 0.3, -r]))} L ${P(Q([t0 + 2, -r * 0.9]))}" ${w}/>`);
  // la pointe : du ressort vers la tête
  const a0 = [r * 0.3, r], a1 = [lg * 0.9, -r * 0.25];
  if (cache) {
    const p1 = lerp(a0, a1, cache[0]), p2 = lerp(a0, a1, cache[1]);
    out.push(`<path d="M ${P(Q(a0))} L ${P(Q(p1))}" ${w}/>`, `<path d="M ${P(Q(p1))} L ${P(Q(p2))}" ${tr(0.7, ' stroke-dasharray="3 2.5"')}/>`,
      `<path d="M ${P(Q(p2))} L ${P(Q(a1))}" ${w}/>`);
  } else out.push(`<path d="M ${P(Q(a0))} L ${P(Q(a1))}" ${w}/>`);
  // le ressort : un tour et demi
  const o = Q([0, 0]), o2 = Q([-r * 0.2, 0]);
  out.push(`<circle cx="${f(o[0])}" cy="${f(o[1])}" r="${f(r)}" ${tr(ep)}/>`, `<circle cx="${f(o2[0])}" cy="${f(o2[1])}" r="${f(r * 0.6)}" ${tr(ep * 0.6)}/>`);
  // la tête qui reçoit la pointe
  const t = `M ${P(Q([t0, -r * 1.6]))} L ${P(Q([lg - r * 0.7, -r * 1.6]))} Q ${P(Q([lg, -r * 1.6]))} ${P(Q([lg, -r * 0.5]))} ` +
    `Q ${P(Q([lg, r * 0.6]))} ${P(Q([lg - r * 0.7, r * 0.6]))} L ${P(Q([t0, r * 0.6]))} Z`;
  out.push(`<path d="${t}" ${rempli(ep)}/>`);
  return out.join('\n');
}

// Petit générateur pseudo-aléatoire, pour que la mousse sorte pareille à chaque passe.
function alea(graine) { let s = graine; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }

// Un brin de sphaigne vu de haut : la tête en étoile, deux rameaux qui pendent.
function sphaigne(cx, cy, rt, rnd) {
  const out = [];
  const ang0 = rnd() * 360;
  for (let k = 0; k < 8; k++) {
    const a = (ang0 + k * 45) * RAD, l = rt * (0.75 + rnd() * 0.45);
    const m = [cx + Math.cos(a + 0.35) * l * 0.6, cy + Math.sin(a + 0.35) * l * 0.6];
    out.push(`M ${P([cx, cy])} Q ${P(m)} ${P([cx + Math.cos(a) * l, cy + Math.sin(a) * l])}`);
  }
  return out.join(' ');
}

module.exports = (h) => {
  // ─── Vue 1 : l'enveloppe à plat ───────────────────────────────────────────────────────
  const plat = z => {
    const s = Math.min((z.l - 56) / L, (z.h - 34) / (W + 2 * E));
    const cx = z.l / 2 + 6, cy = z.h / 2;
    const T = p => [cx + p[0] * s, cy + p[1] * s];
    return { s, cx, cy, T };
  };
  const vPlat = z => {
    const { s, T } = plat(z);
    const out = [];
    out.push(h.path(chemin(contour(0), T, 0, null, true), rempli(2.4)));
    // la couture du pourtour, qui s'arrête au bout ouvert
    const ci = contour(4);
    out.push(h.path(chemin(ci, T, 2, ci.s.length - 1), COUTURE));
    // les plis des ailes, là où elles se replient sous la culotte
    out.push(h.path(`M ${P(T([-BW + 3, -W / 2]))} L ${P(T([BW - 3, -W / 2]))}`, PLI));
    out.push(h.path(`M ${P(T([-BW + 3, W / 2]))} L ${P(T([BW - 3, W / 2]))}`, PLI));
    // le bouton-pression : la moitié du dessus sur l'aile du haut, celle du dessous en tireté
    const pa = T([0, -W / 2 - E + 16]), pb = T([0, W / 2 + E - 16]);
    out.push(h.cercle(pa[0], pa[1], 7 * s, rempli(1.4)), h.cercle(pa[0], pa[1], 2.8 * s, h.a.detail));
    out.push(h.cercle(pb[0], pb[1], 7 * s, h.a.cache));
    // la trace de la coupe : traits forts hors de la pièce, flèche vers où on regarde
    const zt = W / 2 + E;
    [[-zt - 15, -zt - 4], [zt + 4, zt + 15]].forEach(([z1, z2]) => {
      const a = T([0, z1]), b = T([0, z2]);
      out.push(h.ligne(a[0], a[1], b[0], b[1], h.a.contour));
      const yy = z1 < 0 ? a[1] + 1 : b[1] - 1;
      out.push(h.fleche(`M ${P([a[0], yy])} L ${P([a[0] - 15, yy])}`, h.a.arete));
    });
    return out.join('\n');
  };

  // ─── Vue 2 : en place sous la culotte, coupée en travers ──────────────────────────────
  const coupeGeo = z => {
    const G = Math.min(z.l - 84, 200), xc = z.l / 2, tg = 12;
    const n = 5, pas = 4.8;
    const yg = Math.round(z.h * 0.47);
    const gL = xc - G / 2, gR = xc + G / 2;
    const Ep = G * E / W;
    const yLi = yg - 3.4;                          // la doublure, sur le fond
    const ybas = yLi - 1.2 - 2.6;                  // l'épaisseur du bas de l'âme
    const ytop = ybas - (n - 1) * pas;
    const rr = tg / 2 + 3.4, ym = yg + tg / 2;
    const yU = yg + tg + 3.4;                      // doublure de l'aile repliée la première
    const yL = yU + 4.6 + 4.6 + 1.2;                 // doublure de l'aile repliée par-dessus
    const tipD = gR - (Ep - Math.PI * rr), tipG = gL + (Ep - Math.PI * rr) + 6;
    const xs = (tipD + tipG) / 2;
    return { G, xc, yg, tg, gL, gR, Ep, n, pas, ytop, ybas, yLi, rr, ym, yU, yL, tipD, tipG, xs };
  };
  const vCoupe = z => {
    const { G, xc, yg, tg, gL, gR, n, pas, ytop, ybas, yLi, rr, yU, yL, tipD, tipG, xs } = coupeGeo(z);
    const out = [];
    // le fond de la culotte
    out.push(h.rect(gL, yg, G, tg, h.a.hachure('grillage', 'arete')));
    // l'âme : plusieurs épaisseurs pliées en accordéon
    const Wa = G - 30, xa0 = xc - Wa / 2, xa1 = xc + Wa / 2, rho = pas / 2;
    let d = '';
    for (let i = 0; i < n; i++) {
      const y = ybas - i * pas, droite = i % 2 === 0;
      const x2 = droite ? xa1 : xa0;
      d += i === 0 ? `M ${P([xa0 - 2, y])} L ${P([x2, y])}` : ` L ${P([x2, y])}`;
      if (i < n - 1) d += ` A ${f(rho)} ${f(rho)} 0 0 ${droite ? 0 : 1} ${P([x2, y - pas])}`;
    }
    out.push(h.path(d, tr(1.2)));
    // la flanelle : bande blanche à deux bords ; la doublure : trait noir plein
    const flan = dd => `<path d="${dd}" ${tr(1.4)}/>`;
    const doub = dd => `<path d="${dd}" fill="none" stroke="${N}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="butt"/>`;
    // l'aile de gauche passe sous le bout de celle de droite
    const m0 = tipD - 18, m1 = tipD - 1;
    const dDoub = `M ${P([tipG, yL])} L ${P([m1, yL])} C ${P([m1 - 9, yL])} ${P([m0 + 9, yU])} ${P([m0, yU])} L ${P([gL, yU])} ` +
      `A ${f(rr)} ${f(rr)} 0 0 1 ${P([gL, yLi])} L ${P([gR, yLi])} A ${f(rr)} ${f(rr)} 0 0 1 ${P([gR, yU])} L ${P([tipD, yU])}`;
    const o = 3.4, r2 = rr + o, yF = yLi - o, yFt = ytop - 4.2;
    const dFlan = `M ${P([tipG, yL + o])} L ${P([m1, yL + o])} C ${P([m1 - 9, yL + o])} ${P([m0 + 9, yU + o])} ${P([m0, yU + o])} ` +
      `L ${P([gL, yU + o])} A ${f(r2)} ${f(r2)} 0 0 1 ${P([gL, yF])} C ${P([gL + 9, yF])} ${P([xa0 - 9, yFt])} ${P([xa0 + 2, yFt])} ` +
      `L ${P([xa1 - 2, yFt])} C ${P([xa1 + 9, yFt])} ${P([gR - 9, yF])} ${P([gR, yF])} A ${f(r2)} ${f(r2)} 0 0 1 ${P([gR, yU + o])} L ${P([tipD, yU + o])}`;
    out.push(flan(dFlan), doub(dDoub));
    // les bouts d'ailes : la couture du pourtour les ferme
    [[tipG, yL], [tipD, yU]].forEach(([x, y]) => out.push(h.ligne(x, y - 1.2, x, y + o + 0.7, tr(1.4))));
    // le bouton-pression fermé : le goujon dans la douille, entre les deux ailes, et sa calotte
    out.push(h.rect(xs - 7, yU + o + 0.7, 14, yL - 1.2 - (yU + o + 0.7), NP));
    out.push(h.rect(xs - 8, yL + o + 0.7, 16, 2.6, NP));
    return out.join('\n');
  };

  // ─── Vues 3 et 4 : l'enveloppe en perspective, ce qu'on y glisse ──────────────────────
  const AL = 20 * RAD, K = 0.5, KV = 0.87;
  const XA1 = L / 2 + 92;                         // le bout de ce qu'on glisse, encore dehors
  const persp = z => {
    const X0 = -L / 2, X1 = XA1, xm = (X0 + X1) / 2;
    const larg = (X1 - X0) * Math.cos(AL) + 2 * (W / 2 + E) * Math.sin(AL);
    const haut = (X1 - X0) * K * Math.sin(AL) + 2 * (W / 2 + E) * K * Math.cos(AL) + 24 * KV;
    const s = Math.min((z.l - 24) / larg, (z.h - 34) / haut);
    const cx = z.l / 2 - s * xm * Math.cos(AL), cy = z.h / 2 - s * xm * K * Math.sin(AL) + 2;
    const T3 = (X, Zz, Y = 0) => [cx + s * (X * Math.cos(AL) - Zz * Math.sin(AL)), cy + s * (K * (X * Math.sin(AL) + Zz * Math.cos(AL)) - KV * Y)];
    return { s, T3 };
  };
  const EP = 4;   // épaisseur de l'enveloppe vide
  // l'enveloppe vue en perspective, la bouche soulevée sur un objet de largeur wo, d'épaisseur to
  const enveloppe = (T3, wo, to, insert) => {
    const c = contour(0), ech = echantillons(c, 10), der = c.s.length - 1;
    const out = [];
    const bouche = e => e.i === 0 || e.i === 1 || e.i === der || e.i === -1;
    const leve = Zz => {
      const a = Math.abs(Zz), pl = wo / 2 + 3, bord = W / 2 - 0.5;
      if (a <= pl) return to + 11 - EP;
      if (a >= bord) return 0;
      const t = (a - pl) / (bord - pl);
      return (to + 11 - EP) * (1 - t * t * (3 - 2 * t));
    };
    // la doublure, dessous
    out.push(h.path(chemin(c, p => T3(p[0], p[1], 0), 0, null, true), rempli(1.4)));
    // la bouche : l'intérieur sombre entre la flanelle soulevée et la doublure
    const ordre = [...ech.filter(e => e.i === der), ...ech.filter(e => e.i === -1 || e.i === 0 || e.i === 1)];
    const haut = ordre.map(e => T3(e.p[0], e.p[1], EP + leve(e.p[1])));
    const bas = ordre.map(e => T3(e.p[0], e.p[1], 0)).reverse();
    out.push(h.path(poly([...haut, ...bas], true), NP));
    // ce qu'on glisse dedans
    out.push(insert);
    // la flanelle, dessus, avec la bouche soulevée
    const dessus = ech.map(e => T3(e.p[0], e.p[1], EP + (bouche(e) ? leve(e.p[1]) : 0)));
    out.push(h.path(poly(dessus, true), rempli(2.4)));
    // la couture du pourtour, qui s'arrête à la bouche
    const ci = contour(4);
    out.push(h.path(chemin(ci, p => T3(p[0], p[1], EP), 2, ci.s.length - 1), COUTURE));
    // le bouton-pression de l'aile du fond
    const pc = [0, -W / 2 - E + 16], el = [];
    for (let k = 0; k <= 24; k++) { const a = k / 24 * 2 * Math.PI; el.push(T3(pc[0] + 7 * Math.cos(a), pc[1] + 7 * Math.sin(a), EP)); }
    out.push(h.path(poly(el, true), rempli(1.2)));
    return out.join('\n');
  };
  const fleche = (T3, wo) => {
    const a = T3(XA1 + 6, wo / 2 + 34, 0), c = T3(L / 2 + 26, wo / 2 + 34, 0);
    return h.fleche(`M ${P(a)} L ${P(c)}`, h.a.arete);
  };
  const cache = (T3, wo, x0) =>
    h.path(poly([T3(L / 2 - 10, -wo / 2, EP), T3(x0, -wo / 2, EP), T3(x0, wo / 2, EP), T3(L / 2 - 10, wo / 2, EP)]), h.a.cache);

  const WA = W - 24, TA = 16;
  const vAme = z => {
    const { T3 } = persp(z);
    const X0 = L / 2 - 2, X1 = XA1, zA = -WA / 2, zB = WA / 2, y0 = 1, y1 = TA + 1;
    const ins = [];
    const n = 4, pas = TA / n, rho = pas / 2;
    // le dessus et le côté : une pile de tissu, les plis arrondis sur le côté
    ins.push(h.path(poly([T3(X0, zB, y1), T3(X1, zB, y1), T3(X1, zB, y0), T3(X0, zB, y0)], true), rempli(1.4)));
    ins.push(h.path(poly([T3(X0, zA, y1), T3(X1, zA, y1), T3(X1, zB, y1), T3(X0, zB, y1)], true), rempli(1.4)));
    // le bout : les épaisseurs en accordéon, un pli arrondi à chaque bout
    const prof = [];
    for (let i = 0; i < n; i++) {
      const y = y0 + pas * (i + 0.5), versB = i % 2 === 0;
      const za = versB ? zA : zB, zb = versB ? zB : zA;
      prof.push([za, y], [zb - (versB ? rho : -rho), y]);
      if (i < n - 1) for (let k = 1; k < 8; k++) {
        const a = -Math.PI / 2 + Math.PI * k / 8;
        prof.push([zb - (versB ? rho : -rho) + (versB ? 1 : -1) * rho * Math.cos(a), y + rho + rho * Math.sin(a)]);
      }
    }
    // la silhouette du bout, puis le fil de l'accordéon dedans
    ins.push(h.path(poly([T3(X1, zA, y1), T3(X1, zB, y1), T3(X1, zB, y0), T3(X1, zA, y0)], true), rempli(1.4)));
    ins.push(h.path(poly(prof.map(([zz, y]) => T3(X1, zz, y))), tr(0.9)));
    // le bord libre du dernier pli, sur le dessus
    ins.push(h.path(poly([T3(X0 + 4, zA + WA * 0.34, y1), T3(X1, zA + WA * 0.34, y1)]), tr(0.9)));
    // les plis vus sur le côté
    for (let i = 1; i < n; i += 2) ins.push(h.path(poly([T3(X0 + 6, zB, y0 + pas * (i + 0.5)), T3(X1, zB, y0 + pas * (i + 0.5))]), tr(0.5)));
    const out = [enveloppe(T3, WA, TA, ins.join('\n'))];
    out.push(cache(T3, WA, L / 2 - 92), fleche(T3, WA));
    return out.join('\n');
  };

  const WS = W - 22, TS = 18;
  const vSphaigne = z => {
    const { T3 } = persp(z);
    const X0 = L / 2 - 2, X1 = XA1;
    // le sachet : une galette cousue, les coins arrondis
    const rc = 12, pts = [];
    const coin = (cx, cz, a0, r, tab) => { for (let k = 0; k <= 6; k++) { const a = (a0 + 90 * k / 6) * RAD; tab.push([cx + r * Math.cos(a), cz + r * Math.sin(a)]); } };
    coin(X1 - rc, WS / 2 - rc, 0, rc, pts); coin(X0 - 60 + rc, WS / 2 - rc, 90, rc, pts); coin(X0 - 60 + rc, -WS / 2 + rc, 180, rc, pts); coin(X1 - rc, -WS / 2 + rc, 270, rc, pts);
    const haut = pts.map(p => T3(p[0], p[1], TS)), bas = pts.map(p => T3(p[0], p[1], 1));
    const tous = [...haut, ...bas];
    const hull = (() => {
      const q = tous.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
      const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
      const lo = [], up = [];
      q.forEach(p => { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); });
      q.slice().reverse().forEach(p => { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p); });
      return [...lo.slice(0, -1), ...up.slice(0, -1)];
    })();
    const ins = [];
    ins.push(h.path(poly(hull, true), rempli(1.4)), h.path(poly(haut, true), tr(1.0)));
    // la couture, à mi-hauteur sur le côté et le bout qu'on voit
    const mi = [];
    coin(X0 - 60 + rc, WS / 2 - rc, 90, rc, []);
    const cote = [[X0 + 4, WS / 2]];
    coin(X1 - rc, WS / 2 - rc, 0, rc, []);
    const c1 = []; coin(X1 - rc, WS / 2 - rc, 0, rc, c1);
    const c2 = []; coin(X1 - rc, -WS / 2 + rc, 270, rc, c2);
    mi.push(...cote, ...c1.slice().reverse(), ...c2.slice().reverse().slice(0, 4));
    ins.push(h.path(poly(mi.map(p => T3(p[0], p[1], TS * 0.5))), COUTURE));
    // l'arraché : une fenêtre déchirée dans le coton du dessus, la mousse dedans
    const rnd = alea(2901);
    const fx0 = L / 2 + 6, fx1 = X1 - 14, fz0 = -WS / 2 + 5, fz1 = WS / 2 - 5;
    const bord = [];
    const nb = 14;
    for (let k = 0; k <= nb; k++) bord.push([fx0 + (fx1 - fx0) * k / nb, fz0 + (k % 2 ? 2.4 : -0.6) * (0.6 + rnd())]);
    for (let k = 1; k < 4; k++) bord.push([fx1 + (k % 2 ? 2.5 : -1.5) * rnd(), fz0 + (fz1 - fz0) * k / 4]);
    for (let k = nb; k >= 0; k--) bord.push([fx0 + (fx1 - fx0) * k / nb, fz1 + (k % 2 ? -2.4 : 0.6) * (0.6 + rnd())]);
    for (let k = 3; k > 0; k--) bord.push([fx0 + (k % 2 ? -2.5 : 1.5) * rnd(), fz0 + (fz1 - fz0) * k / 4]);
    const fen = bord.map(p => T3(p[0], p[1], TS));
    ins.push(`<clipPath id="cp-2901-mousse"><path d="${poly(fen, true)}" fill="${N}"/></clipPath>`);
    ins.push(h.path(poly(fen, true), BL));
    const tetes = [];
    for (let k = 0; k < 30; k++) {
      const X = fx0 + 2 + (fx1 - fx0 - 2) * rnd(), Zz = fz0 + 1 + (fz1 - fz0 - 2) * rnd();
      const p = T3(X, Zz, TS);
      tetes.push(sphaigne(p[0], p[1], 2.6 + rnd() * 2.2, rnd));
    }
    ins.push(`<g clip-path="url(#cp-2901-mousse)"><path d="${tetes.join(' ')}" ${tr(0.5)}/></g>`);
    ins.push(h.path(poly(fen, true), tr(0.7)));
    const out = [enveloppe(T3, WS, TS, ins.join('\n'))];
    out.push(cache(T3, WS, X0 - 60), fleche(T3, WS));
    return out.join('\n');
  };

  // ─── Vue 5 : sans culotte, la ceinture ─────────────────────────────────────────────────
  // Repère du corps, en mm : X vers sa gauche, Y vers le haut, Z vers l'avant. On la voit de
  // sa gauche, un peu de l'avant et d'un peu haut. Le corps n'est pas dessiné.
  const TH = 64 * RAD, PH = 11 * RAD;
  const proj = ([X, Y, Z]) => [X * Math.cos(TH) - Z * Math.sin(TH), -Y * Math.cos(PH) + (X * Math.sin(TH) + Z * Math.cos(TH)) * Math.sin(PH)];
  const prof = ([X, Y, Z]) => X * Math.sin(TH) * Math.cos(PH) + Y * Math.sin(PH) + Z * Math.cos(TH) * Math.cos(PH);
  const CA = 150, CB = 105, PW = 33;
  // la ligne du milieu de la serviette (Z, Y), du bout replié devant au bout replié derrière
  const LIGNE = [[112, -44], [111, -6], [109, 5], [105, 8.5], [101, 5], [100, -4], [99, -60], [91, -140], [72, -208], [38, -252],
    [-2, -268], [-44, -260], [-88, -226], [-121, -164], [-133, -96], [-126, -36], [-102, -4], [-101, 5], [-105, 8.5], [-109, 5], [-111, -6], [-112, -44]];
  function catmull(pts, n = 6) {
    const out = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(j => 0.5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
      }
    }
    out.push(pts[pts.length - 1]);
    return out;
  }
  const ceintureGeo = z => {
    const ligne = catmull(LIGNE, 8).map(([Zz, Y]) => [0, Y, Zz]);
    const tour = [];
    for (let k = 0; k <= 120; k++) { const t = k / 120 * 2 * Math.PI; tour.push([CA * Math.cos(t), 0, CB * Math.sin(t)]); }
    const tousPts = [...ligne.flatMap(p => [[-PW, p[1], p[2]], [PW, p[1], p[2]]]), ...tour];
    const pr = tousPts.map(proj);
    const xmin = Math.min(...pr.map(p => p[0])), xmax = Math.max(...pr.map(p => p[0]));
    const ymin = Math.min(...pr.map(p => p[1])), ymax = Math.max(...pr.map(p => p[1]));
    const s = Math.min((z.l - 80) / (xmax - xmin), (z.h - 16) / (ymax - ymin));
    const ox = z.l / 2 + 16 - s * (xmin + xmax) / 2, oy = z.h / 2 - s * (ymin + ymax) / 2;
    const S = p => { const q = proj(p); return [ox + s * q[0], oy + s * q[1]]; };
    return { ligne, tour, s, S };
  };
  const vCeinture = z => {
    const { ligne, tour, s, S } = ceintureGeo(z);
    const prims = [];
    const g = (() => { const a = S([0, 0, 0]), b = S([1, 0, 0]); return [b[0] - a[0], b[1] - a[1]]; })();
    const cr = (a, b) => a[0] * b[1] - a[1] * b[0];
    // la serviette, en bandes peintes du plus loin au plus proche ; le côté doublure hachuré
    let avant = null;
    for (let i = 0; i < ligne.length - 1; i++) {
      const a = ligne[i], b = ligne[i + 1];
      const A1 = S([-PW, a[1], a[2]]), A2 = S([PW, a[1], a[2]]), B1 = S([-PW, b[1], b[2]]), B2 = S([PW, b[1], b[2]]);
      const ca = S(a), cb = S(b);
      const dedans = cr([cb[0] - ca[0], cb[1] - ca[1]], g) > 0;
      const q = poly([A1, B1, B2, A2], true);
      let svg = `<path d="${q}" fill="${B}" stroke="${B}" stroke-width="0.6"/>`;
      if (!dedans) svg += `\n<path d="${q}" ${h.a.hachure('bois', 'aucun')}/>`;
      svg += `\n<path d="M ${P(A1)} L ${P(B1)} M ${P(A2)} L ${P(B2)}" ${tr(1.4)}/>`;
      if ((avant !== null && avant !== dedans) || i === 0) svg += `\n<path d="M ${P(A1)} L ${P(A2)}" ${tr(1.4)}/>`;
      if (i === ligne.length - 2) svg += `\n<path d="M ${P(B1)} L ${P(B2)}" ${tr(1.4)}/>`;
      avant = dedans;
      prims.push({ z: (prof(a) + prof(b)) / 2, svg });
    }
    // la ceinture : une corde, en tronçons
    const ep = 5;
    for (let k = 0; k < tour.length - 1; k++) {
      const a = S(tour[k]), b = S(tour[k + 1]);
      const t = [b[0] - a[0], b[1] - a[1]], lt = Math.hypot(t[0], t[1]) || 1, nr = [-t[1] / lt * ep / 2, t[0] / lt * ep / 2];
      const ex = [t[0] / lt * 0.5, t[1] / lt * 0.5];
      const a1 = [a[0] + nr[0] - ex[0], a[1] + nr[1] - ex[1]], a2 = [a[0] - nr[0] - ex[0], a[1] - nr[1] - ex[1]];
      const b1 = [b[0] + nr[0] + ex[0], b[1] + nr[1] + ex[1]], b2 = [b[0] - nr[0] + ex[0], b[1] - nr[1] + ex[1]];
      const svg = `<path d="${poly([a1, b1, b2, a2], true)}" ${BL}/>\n<path d="M ${P(a1)} L ${P(b1)} M ${P(a2)} L ${P(b2)}" ${tr(1.2)}/>`;
      prims.push({ z: (prof(tour[k]) + prof(tour[k + 1])) / 2 + 4, svg });
    }
    // les épingles, en travers des bouts repliés
    const ang = Math.atan2(g[1], g[0]) / RAD;
    [113, -114].forEach(Zz => {
      const p = S([-27, -28, Zz]);
      prims.push({ z: prof([0, -28, Zz]) + 2, svg: epingle(p[0], p[1], 54 * s, ang, null, 1.1) });
    });
    prims.sort((a, b) => a.z - b.z);
    return prims.map(p => p.svg).join('\n');
  };

  // ─── Vue 6 : le bout replié sur la ceinture, de face et en coupe ─────────────────────
  const epGeo = z => {
    const yc = Math.round(z.h * 0.24), wp = Math.min(92, z.l * 0.38), cx = z.l * 0.36;
    const rc = 7, yb = yc + 82, ypin = yc + 46;
    const sx = z.l * 0.84;
    return { yc, wp, cx, rc, yb, ypin, sx };
  };
  const vEpingle = z => {
    const { yc, wp, cx, rc, yb, ypin, sx } = epGeo(z);
    const out = [];
    const x0 = cx - wp / 2, x1 = cx + wp / 2;
    // la serviette qui monte vers la ceinture : cassée en bas (elle continue)
    const ybas = z.h - 8;
    out.push(h.path(`M ${P([x0, yc])} L ${P([x0, ybas - 3])} L ${P([x0 + wp * 0.3, ybas + 2])} L ${P([x0 + wp * 0.62, ybas - 4])} L ${P([x1, ybas])} L ${P([x1, yc])} Z`, rempli(1.4)));
    out.push(h.path(`M ${P([x0 + 4, yb])} L ${P([x0 + 4, ybas - 7])} M ${P([x1 - 4, yb])} L ${P([x1 - 4, ybas - 7])}`, COUTURE));
    // la corde de la ceinture, qui passe dans le repli
    out.push(h.formes.corde([[10, yc], [z.l * 0.64, yc]], { ep: rc * 2, torons: true, debut: 'fixe', fin: 'fixe' }));
    // le bout replié par-dessus, devant : il descend sous la corde
    const yh = yc - rc - 4, rr = 12;
    out.push(h.path(`M ${P([x0, yh + 3])} Q ${P([x0, yh])} ${P([x0 + 4, yh])} L ${P([x1 - 4, yh])} Q ${P([x1, yh])} ${P([x1, yh + 3])} ` +
      `L ${P([x1, yb - rr])} Q ${P([x1, yb])} ${P([x1 - rr, yb])} L ${P([x0 + rr, yb])} Q ${P([x0, yb])} ${P([x0, yb - rr])} Z`, rempli(1.4)));
    out.push(h.path(`M ${P([x0 + 4, yh + 6])} L ${P([x0 + 4, yb - rr])} Q ${P([x0 + 4, yb - 4])} ${P([x0 + rr, yb - 4])} L ${P([x1 - rr, yb - 4])} ` +
      `Q ${P([x1 - 4, yb - 4])} ${P([x1 - 4, yb - rr])} L ${P([x1 - 4, yh + 6])}`, COUTURE));
    // l'épingle, sous la corde, à travers les deux épaisseurs
    const lg = wp + 30, dx = 13;
    const pointe = lg * 0.9;
    out.push(epingle(x0 - dx, ypin, lg, 0, [(dx + 9) / pointe, (dx + wp - 9) / pointe], 1.5));
    // en coupe, sur le côté : la serviette côté corps à gauche, le bout replié à droite
    const xb = sx - rc - 3.6, xf = sx + rc + 3.6;
    out.push(h.ellipse(sx, ypin, xf - xb + 2, 5, tr(0.7)));
    const band = dd => `<path d="${dd}" fill="none" stroke="${N}" stroke-width="5.6" stroke-linecap="butt" stroke-linejoin="round"/>\n` +
      `<path d="${dd}" fill="none" stroke="${B}" stroke-width="3.2" stroke-linecap="butt" stroke-linejoin="round"/>`;
    out.push(band(`M ${P([xb, ybas])} L ${P([xb, yc])} A ${f(rc + 3.6)} ${f(rc + 3.6)} 0 0 1 ${P([xf, yc])} L ${P([xf, yb])}`));
    out.push(h.ligne(xf - 2.8, yb, xf + 2.8, yb, tr(1.2)), h.ligne(xb - 2.8, ybas, xb + 2.8, ybas, tr(1.2)));
    // la corde coupée : trois torons
    out.push(h.cercle(sx, yc, rc, rempli(1.4)));
    [[0, -1], [0.87, 0.5], [-0.87, 0.5]].forEach(([u, v]) => out.push(h.cercle(sx + u * rc * 0.45, yc + v * rc * 0.45, rc * 0.48, tr(0.7))));
    // les deux fils de l'épingle, coupés : devant le repli, derrière la serviette
    out.push(h.cercle(xf + 5.6, ypin, 1.8, NP), h.cercle(xb - 5.6, ypin, 1.8, NP));
    return out.join('\n');
  };

  return {
    ref: '29-01',
    titre: 'La serviette lavable, l’âme et la sphaigne',
    desc: 'La serviette cousue en trois parties. En haut, l’enveloppe à plat : flanelle pâle dessus, ' +
      'doublure imperméable dessous cousue au pourtour seulement, deux ailes à bouton-pression, un bout ' +
      'laissé ouvert. À côté, la même coupée en travers, en place : l’âme pliée entre la flanelle et la ' +
      'doublure, les ailes repliées sous le fond de la culotte et fermées l’une sur l’autre. Au milieu, ' +
      'l’âme pliée qu’on glisse par le bout ouvert, puis le sachet de coton bourré de sphaigne qui prend sa ' +
      'place. En bas, sans culotte : une ceinture de corde à la taille, la serviette épinglée devant et ' +
      'derrière, et le détail du bout replié par-dessus la corde et fermé d’une épingle de sûreté.',
    format: 'pleine',
    disposition: [['plat', 'coupe'], ['ame', 'sphaigne'], ['ceinture', 'epingle']],
    hauteurs: [2.2, 1.9, 2.5],
    largeurs: [[1, 1], [1, 1], [1, 1]],
    vues: {
      plat: {
        titre: 'L’enveloppe à plat, flanelle dessus',
        dessin: vPlat,
        renvois: z => {
          const { T } = plat(z);
          const a = T([-L / 2 + 34, -6]), b = T([-TW + 4, W / 2 + E - 12]), c = T([7, -W / 2 - E + 19]), d = T([-L / 2 + 4, 12]);
          return [
            { n: 1, rond: [a[0] - 8, 12], cible: a, texte: 'flanelle pâle, dessus' },
            { n: 2, rond: [b[0] - 50, z.h - 12], cible: b, texte: 'aile, se replie dessous' },
            { n: 3, rond: [c[0] + 50, 12], cible: c, texte: 'bouton-pression ou épingle' },
            { n: 4, rond: [12, d[1] + 34], cible: d, texte: 'couture du pourtour seulement' },
          ];
        },
      },
      coupe: {
        titre: 'En place, coupée en travers',
        dessin: vCoupe,
        renvois: z => {
          const { xc, yg, tg, gL, gR, ytop, yU, yL, xs } = coupeGeo(z);
          return [
            { n: 5, rond: [gL - 8, z.h - 14], cible: [gL + 30, yg + tg / 2], texte: 'fond de la culotte' },
            { n: 6, rond: [gR + 20, yg - 30], cible: [gR - 20, yU], texte: 'doublure imperméable' },
            { n: 7, rond: [xc + 40, 12], cible: [xc + 20, ytop + 4.8], texte: 'âme pliée, plusieurs épaisseurs' },
            { n: 8, rond: [xs + 56, z.h - 14], cible: [xs + 4, yL + 2], texte: 'ailes croisées, fermées dessous' },
          ];
        },
      },
      ame: {
        titre: 'L’âme glisse par le bout ouvert',
        dessin: vAme,
        renvois: z => {
          const { T3 } = persp(z);
          const m = T3(L / 2 - 3, -WA / 2 - 7, EP + 1);
          return [
            { n: 9, rond: [m[0] - 30, 12], cible: m, texte: 'bout laissé ouvert' },
          ];
        },
      },
      sphaigne: {
        titre: 'Ou le sachet de sphaigne, à sa place',
        dessin: vSphaigne,
        renvois: z => {
          const { T3 } = persp(z);
          const a = T3(XA1 - 3, WS / 2 - 14, TS * 0.35), b = T3(L / 2 + 40, 0, TS);
          return [
            { n: 10, rond: [a[0] + 8, z.h - 12], cible: a, texte: 'sachet de coton bouilli' },
            { n: 11, rond: [b[0] - 20, 12], cible: b, texte: 'sphaigne pâle, tassée' },
          ];
        },
      },
      ceinture: {
        titre: 'Sans culotte : corde ou élastique à la taille',
        dessin: vCeinture,
        renvois: z => {
          const { S } = ceintureGeo(z);
          const c = S([4, -28, 113]);
          return [
            { n: 12, rond: [c[0] - 40, c[1] + 26], cible: c, texte: 'épingle de sûreté' },
          ];
        },
      },
      epingle: {
        titre: 'Le bout, replié par-dessus la corde',
        dessin: vEpingle,
      },
    },
    danger: 'Danger — jamais la sphaigne nue contre la peau ni contre une plaie : un champignon de la mousse entre par là.',
  };
};
