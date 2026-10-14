// Planche 94-34 — La poix de gomme (ch. 60, §5-F et « Poix et gomme : la partie qui n'a jamais
// eu besoin de magasin », « Réparer au lieu de remplacer »). Aucune proportion : le chapitre n'en
// sourcé aucune, le réglage se fait à la goutte.
// La charte : la face de droite à l'ombre sur les volumes debout (les deux troncs, la boîte sur les
// braises, le panier) et sur le flanc du lit de sable des bâtonnets. Le rouge : pousser la gomme au
// bâton, piler le charbon, presser le bois sur la fuite (les gestes, un par vue), et la goutte qui
// casse net (le point que le test vérifie).
module.exports = (h) => {
  const R = (v) => Math.round(v * 10) / 10;
  const rot = (bx, by, deg) => {
    const a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    return ([dx, dy]) => [R(bx + dx * c - dy * s), R(by + dx * s + dy * c)];
  };
  // courbe lisse passant par les points (Catmull-Rom)
  const lisse = (p, ferme = true) => {
    const n = p.length, k = 1 / 6;
    const g = (i) => (ferme ? p[(i + n) % n] : p[Math.max(0, Math.min(n - 1, i))]);
    let d = `M ${R(p[0][0])} ${R(p[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C ${R(p1[0] + (p2[0] - p0[0]) * k)} ${R(p1[1] + (p2[1] - p0[1]) * k)} ${R(p2[0] - (p3[0] - p1[0]) * k)} ${R(p2[1] - (p3[1] - p1[1]) * k)} ${R(p2[0])} ${R(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  // les points de la même courbe, échantillonnés (pour borner un aplat sur une ligne de cassure)
  const lissePts = (p, n = 8) => {
    const g = (i) => p[Math.max(0, Math.min(p.length - 1, i))], out = [p[0]];
    for (let i = 0; i < p.length - 1; i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      for (let k = 1; k <= n; k++) {
        const t = k / n, u = 1 - t;
        out.push([u * u * u * p1[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p2[0],
          u * u * u * p1[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p2[1]]);
      }
    }
    return out;
  };
  const forme = (d, t = h.a.detail, fond = h.a.blanc) => h.path(d, fond) + '\n' + h.path(d, t);
  const poly = (p, t = h.a.arete, fond = h.a.blanc) => h.chemin(p, fond, true) + '\n' + h.chemin(p, t, true);
  const REFLET = 'fill="none" stroke="#FFFFFF" stroke-width="0.8" stroke-linecap="round"';
  const TISSU = 'fill="none" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round"';
  const alea = (s) => () => ((s = (s * 16807) % 2147483647) / 2147483647);
  // partie d'un polygone sous le niveau y = ys (un liquide dans un contenant penché)
  const sousNiveau = (p, ys) => {
    const out = [];
    for (let i = 0; i < p.length; i++) {
      const a = p[i], b = p[(i + 1) % p.length], ia = a[1] >= ys, ib = b[1] >= ys;
      if (ia) out.push(a);
      if (ia !== ib) { const t = (ys - a[1]) / (b[1] - a[1]); out.push([R(a[0] + t * (b[0] - a[0])), R(ys)]); }
    }
    return out;
  };

  // ─── pièces communes ────────────────────────────────────────────────────────────────
  const couteau = (tx, ty, deg, Lb = 28, Lh = 24) => {
    const T = rot(tx, ty, deg);
    const lame = [[0, 0], [5, -3.2], [Lb, -4], [Lb, 3.6], [Lb * 0.45, 3.2]].map(T);
    const manche = [[Lb, -5], [Lb + Lh, -5.5], [Lb + Lh + 3, -2.5], [Lb + Lh + 3, 2.5], [Lb + Lh, 5.5], [Lb, 5]].map(T);
    return [poly(lame, h.a.arete), h.chemin([[6, 1.4], [Lb, 1.8]].map(T), h.a.fin),
      poly(manche, h.a.arete),
      h.cercle(...T([Lb + Lh * 0.3, 0]), 1.2, h.a.detail), h.cercle(...T([Lb + Lh * 0.72, 0]), 1.2, h.a.detail)].join('\n');
  };
  const baton = (tx, ty, deg, L, ep = 4) => {
    const T = rot(tx, ty, deg);
    return poly([[0, -ep / 2], [L, -ep / 2 - 0.4], [L, ep / 2 + 0.4], [0, ep / 2]].map(T), h.a.arete);
  };
  const goutte = (x, y, r, fond = h.a.blanc) =>
    forme(`M ${R(x)} ${R(y - 2.4 * r)} Q ${R(x + 1.3 * r)} ${R(y - 0.2 * r)} ${R(x)} ${R(y + r)} Q ${R(x - 1.3 * r)} ${R(y - 0.2 * r)} ${R(x)} ${R(y - 2.4 * r)} Z`, h.a.detail, fond);
  // boîte de conserve vue de côté
  const boite = (cx, yt, w, ht, contenu, ombre = false) => {
    const x1 = R(cx - w / 2), x2 = R(cx + w / 2), e = R(w * 0.14), yb = R(yt + ht), r = R(w / 2);
    const corps = `M ${x1} ${R(yt)} L ${x1} ${yb} A ${r} ${e} 0 0 0 ${x2} ${yb} L ${x2} ${R(yt)}`;
    const out = [h.path(corps + ' Z', h.a.blanc)];
    if (ombre) {
      // le flanc droit à l'ombre, jusqu'à l'arrondi du fond
      const xs = cx + w * 0.24, bas = [];
      for (let i = 0; i <= 10; i++) { const x = x2 - (x2 - xs) * i / 10; bas.push([R(x), R(yb + e * Math.sqrt(Math.max(0, 1 - ((x - cx) / r) ** 2)))]); }
      out.push(h.chemin([[R(xs), R(yt)], [x2, R(yt)], ...bas], h.a.ombre, true));
    }
    out.push(h.path(corps, h.a.arete));
    [0.34, 0.64].forEach((f) => out.push(h.path(`M ${x1} ${R(yt + ht * f)} A ${r} ${e} 0 0 0 ${x2} ${R(yt + ht * f)}`, h.a.fin)));
    out.push(h.ellipse(cx, yt, w / 2, e, h.a.blanc), h.ellipse(cx, yt, w / 2, e, h.a.arete));
    if (contenu) out.push(h.ellipse(cx, yt + 1.5, w / 2 - 3.5, e - 1.6, contenu));
    return out.join('\n');
  };
  // boîte de conserve penchée : base au centre local (0,0), ouverture vers le haut local, tournée de deg
  const boitePenchee = (deg, w, ht) => {
    const ell = (y, n = 28) => Array.from({ length: n }, (_, i) => {
      const a = 2 * Math.PI * i / n; return [w / 2 * Math.cos(a), y + w * 0.14 * Math.sin(a)];
    });
    const lip = (T) => ell(-ht).map(T).reduce((m, p) => (p[1] > m[1] ? p : m));
    const dessin = (T) => [
      poly(ell(0).map(T), h.a.arete),
      h.chemin([[-w / 2, 0], [-w / 2, -ht], [w / 2, -ht], [w / 2, 0]].map(T), h.a.blanc, true),
      h.chemin([[-w / 2, 0], [-w / 2, -ht]].map(T), h.a.arete), h.chemin([[w / 2, 0], [w / 2, -ht]].map(T), h.a.arete),
      ...[-0.34, -0.64].map((f) => h.path(lisse(ell(ht * f, 28).slice(0, 15).map(T), false), h.a.fin)),
      poly(ell(-ht).map(T), h.a.arete),
    ].join('\n');
    return { lip, dessin };
  };
  const braises = (x1, x2, y, ht, graine) => {
    const r = alea(graine), out = [];
    const d = `M ${R(x1)} ${R(y)} C ${R(x1 + (x2 - x1) * 0.18)} ${R(y - ht * 1.3)} ${R(x2 - (x2 - x1) * 0.18)} ${R(y - ht * 1.3)} ${R(x2)} ${R(y)} Z`;
    out.push(forme(d, h.a.detail));
    const n = Math.round((x2 - x1) / 5);
    for (let i = 0; i < n; i++) {
      const t = 0.06 + 0.88 * r(), hl = ht * 4 * t * (1 - t) * 0.85;
      const x = x1 + (x2 - x1) * t, yy = y - 1.8 - r() * Math.max(0, hl - 2.5), a = 1.8 + r() * 1.6;
      out.push(r() < 0.5 ? h.ellipse(x, yy, a, a * 0.62, h.a.plein) : h.ellipse(x, yy, a, a * 0.62, h.a.detail));
    }
    return out.join('\n');
  };
  const flamme = (x, y, w, ht) => forme(`M ${R(x - w / 2)} ${R(y)} C ${R(x - w / 2)} ${R(y - ht * 0.45)} ${R(x - w * 0.05)} ${R(y - ht * 0.6)} ${R(x + w * 0.05)} ${R(y - ht)} C ${R(x + w * 0.25)} ${R(y - ht * 0.6)} ${R(x + w / 2)} ${R(y - ht * 0.4)} ${R(x + w / 2)} ${R(y)} Z`, h.a.detail)
    + '\n' + h.path(`M ${R(x - w * 0.15)} ${R(y - 2)} C ${R(x - w * 0.2)} ${R(y - ht * 0.3)} ${R(x)} ${R(y - ht * 0.45)} ${R(x + w * 0.02)} ${R(y - ht * 0.6)}`, h.a.fin);
  // écuelle d'écorce pliée et cousue : origine au milieu du fond
  const ecuelle = (cx, yb, lh, ht, deg = 0) => {
    const T = rot(cx, yb, deg), a = lh / 2, b = lh / 2 - ht * 0.55;
    const out = [poly([[-a, -ht], [a, -ht], [b, 0], [-b, 0]].map(T), h.a.arete)];
    out.push(h.chemin([[-a, -ht], [-b + 1.5, -ht * 0.3]].map(T), h.a.fin), h.chemin([[a, -ht], [b - 1.5, -ht * 0.3]].map(T), h.a.fin));
    out.push(h.chemin([[-a + 1, -ht + 2.6], [a - 1, -ht + 2.6]].map(T), h.a.detail));
    for (let x = -a + 4; x < a - 2; x += 4.5) out.push(h.chemin([[x, -ht], [x + 1.6, -ht + 2.6]].map(T), h.a.fin));
    [[-a * 0.45, -ht * 0.5], [a * 0.2, -ht * 0.32], [a * 0.05, -ht * 0.66]].forEach(([x, y]) =>
      out.push(h.chemin([[x - 2.5, y], [x + 2.5, y]].map(T), h.a.fin)));
    return out.join('\n');
  };
  const tronc = (xL, xR, y1, y2) => {
    const pts = (y) => [[xL, y], [xL + (xR - xL) * 0.3, y - 3], [xL + (xR - xL) * 0.55, y + 2], [xL + (xR - xL) * 0.8, y - 2], [xR, y + 1]];
    const casse = (y) => lisse(pts(y), false);
    // la face de droite du tronc à l'ombre, bornée par les deux cassures
    const xs = xR - (xR - xL) * 0.28, cl = (q) => [R(Math.max(q[0], xs)), R(q[1])];
    const ombre = h.chemin([...lissePts(pts(y1)).map(cl), ...lissePts(pts(y2)).reverse().map(cl)], h.a.ombre, true);
    return [h.rect(xL, y1, xR - xL, y2 - y1, h.a.blanc), ombre, h.path(casse(y1), h.a.detail), h.path(casse(y2), h.a.detail),
      h.ligne(xL, y1, xL, y2 + 1, h.a.contour), h.ligne(xR, y1 + 1, xR, y2 + 1, h.a.contour)].join('\n');
  };

  // ─── géométries (partagées entre dessin et renvois) ─────────────────────────────────
  const gSap = (z) => {
    const cx = z.l * 0.47, tw = Math.min(56, z.l * 0.3);
    const P = [R(cx - tw * 0.06), Math.round(z.h * 0.33)];
    return { cx, tw, xL: cx - tw / 2, xR: cx + tw / 2, P, pot: { cx: P[0], yt: P[1] + 54, w: 30, ht: 28 } };
  };
  const gEpi = (z) => {
    const cx = z.l * 0.46, tw = Math.min(72, z.l * 0.42);
    const W = { x: cx + 2, y: Math.round(z.h * 0.33), hw: 13, hh: Math.min(42, z.h * 0.21) };
    const c = [[W.x - 9, W.y + W.hh + 2, W.y + W.hh + 16], [W.x + 5, W.y + W.hh + 4, W.y + W.hh + 30], [W.x + 15, W.y + W.hh * 0.4, W.y + W.hh * 0.95]];
    return { cx, tw, xL: cx - tw / 2, xR: cx + tw / 2, W, c };
  };
  const gBr = (z) => {
    const G = Math.round(z.h * 0.78), x1 = z.l * 0.44, x2 = z.l * 0.63;
    return { G, x1, x2, ec: { cx: x2 + 36, lh: 52, ht: 13 } };
  };
  const gRep = (z) => {
    const G = z.h - 6, w = 46, H = Math.min(72, z.h - 60);
    const A = { x1: 36, x2: 36 + w, yt: G - H };
    const B = [R(z.l * 0.47), G - 58], th = 58 * Math.PI / 180;
    const u = [Math.sin(th), -Math.cos(th)], v = [Math.cos(th), Math.sin(th)];
    const P = (a, b) => [R(B[0] + a * v[0] + b * u[0]), R(B[1] + a * v[1] + b * u[1])];
    const BL = P(-w / 2, 0), BR = P(w / 2, 0), TL = P(-w / 2, H), TR = P(w / 2, H);
    return { G, w, H, A, B, BL, BR, TL, TR, C: { cx: TR[0] + 12.5, w: 40, yt: G - 44 } };
  };
  const gTe = (z) => {
    const G = z.h - 6, cx = R(z.l * 0.56), yt = G - 64;
    return { G, cx, yt, nouet: [cx - 12, yt - 34], ec: [cx + 46, yt - 24] };
  };
  const gGo = (z) => {
    const ys = Math.round(z.h * 0.52), yn = Math.round(z.h * 0.74);
    return { ys, yn, x1: z.l * 0.09, x2: z.l * 0.9, xa: z.l * 0.26, xb: z.l * 0.5, xc: z.l * 0.74 };
  };
  const gBa = (z) => {
    const yF = Math.round(z.h * 0.66), yK = Math.round(z.h * 0.38), ep = 13, sk = 20, x1 = 8, x2 = z.l - 8 - 20;
    const span = x2 - x1, len = span * 0.56;
    const rig = [0.25, 0.53, 0.8].map((f, i) => ({ y: R(yK + (yF - yK) * f), xs: R(x1 + sk * (1 - f) + 8), len: len + (i === 2 ? 28 : 0) }));
    return { yF, yK, ep, sk, x1, x2, rig };
  };
  const gFu = (z) => {
    const pa = { cx: z.l * 0.19, yt: z.h * 0.24, yb: z.h * 0.9, wt: Math.min(62, z.l * 0.3), wb: Math.min(44, z.l * 0.21) };
    const x1 = z.l * 0.43, x2 = z.l - 6;
    return { pa, patch: [pa.cx + 3, z.h * 0.6], co: { x1, x2, y: Math.round(z.h * 0.6), ep: 10, xc: R((x1 + x2) / 2) } };
  };

  return {
    ref: '94-34',
    titre: 'La poix de gomme',
    desc: 'Récolter la gomme sur les vésicules du sapin et les coulées de l’épinette, la fondre sur une pierre au bord des braises, la laisser reposer chaude pour transvider le milieu, la tempérer au gras et au charbon pilé, l’éprouver à la goutte sur une pierre gelée, la couler en bâtonnets et réparer une fuite à la poix et au tissu.',
    format: 'pleine',
    disposition: [['sapin', 'epinette', 'braises'], ['reposer', 'temperer'], ['goutte', 'batons', 'fuite']],
    hauteurs: [1.1, 1, 0.95],
    largeurs: [[1, 1, 1.75], [1.08, 1], [1.15, 0.95, 1.05]],
    vues: {
      // ── 1. sapin baumier : vésicules percées ──
      sapin: {
        titre: 'Sapin : les vésicules',
        dessin: (z) => {
          const g = gSap(z), out = [tronc(g.xL, g.xR, 4, z.h - 4)];
          [[-0.3, 0.12], [0.26, 0.24], [-0.24, 0.56], [0.3, 0.68], [0.02, 0.9], [-0.36, 0.4], [0.1, 0.07]].forEach(([dx, fy]) =>
            out.push(h.ligne(g.cx + dx * g.tw - 3, z.h * fy, g.cx + dx * g.tw + 3, z.h * fy, h.a.fin)));
          out.push(h.ligne(g.xR - 6, 12, g.xR - 6, z.h - 12, h.a.fin));
          const ves = (x, y) => [h.ellipse(x, y, 4, 5.5, h.a.blanc), h.ellipse(x, y, 4, 5.5, h.a.detail),
            h.path(`M ${R(x - 1.8)} ${R(y - 2.6)} Q ${R(x - 2.6)} ${R(y)} ${R(x - 1.2)} ${R(y + 2.4)}`, h.a.fin)].join('\n');
          [[0.22, 0.16], [-0.24, 0.2], [0.26, 0.5], [-0.26, 0.64], [0.2, 0.8], [-0.1, 0.94]].forEach(([dx, fy]) =>
            out.push(ves(g.cx + dx * g.tw, z.h * fy)));
          const [px, py] = g.P;
          out.push(ves(px, py));
          // la gomme qui coule de la vésicule percée vers le pot
          out.push(h.path(`M ${R(px + 0.5)} ${R(py + 5)} C ${R(px + 1.8)} ${R(py + 16)} ${R(px - 0.8)} ${R(py + 26)} ${R(px + 0.5)} ${R(py + 38)}`, h.a.detail));
          out.push(goutte(px + 0.5, py + 40, 1.8), goutte(px + 0.5, py + 48, 2));
          out.push(boite(g.pot.cx, g.pot.yt, g.pot.w, g.pot.ht, h.a.detail));
          out.push(couteau(px - 2, py + 0.5, 208));
          return out.join('\n');
        },
        renvois: (z) => {
          const g = gSap(z), [px, py] = g.P;
          return [
            { n: 1, rond: [z.l - 13, py - 24], cible: [px + 3.5, py - 3], texte: 'vésicule percée à la pointe' },
            { n: 2, rond: [z.l - 13, g.pot.yt + 16], cible: [g.pot.cx + 15, g.pot.yt + 16], texte: 'pot tenu dessous' },
          ];
        },
      },
      // ── 2. épinette : coulées durcies raclées ──
      epinette: {
        titre: 'Épinette : les coulées',
        dessin: (z) => {
          const g = gEpi(z), W = g.W, out = [tronc(g.xL, g.xR, 4, z.h - 4)];
          // écorce en écailles, sauf dans la blessure
          for (let y = 12, row = 0; y < z.h - 8; y += 10, row++) {
            for (let x = g.xL + 7 + (row % 2) * 6; x < g.xR - 5; x += 12) {
              const dx = (x - W.x) / (W.hw + 9), dy = (y - W.y) / (W.hh + 9);
              if (dx * dx + dy * dy < 1) continue;
              out.push(h.path(`M ${R(x - 4.5)} ${R(y)} Q ${R(x)} ${R(y - 4)} ${R(x + 4.5)} ${R(y)}`, h.a.fin));
            }
          }
          // la plaie : bois nu au contour irrégulier, bourrelet de gomme bosselé autour
          const ovale = (hw, hh, n, jit, gr) => { const r = alea(gr); return Array.from({ length: n }, (_, i) => {
            const t = 2 * Math.PI * i / n, k = 1 + (r() - 0.5) * jit; return [W.x + hw * k * Math.sin(t), W.y - hh * k * Math.cos(t)]; }); };
          const bour = ovale(W.hw + 6, W.hh + 6, 22, 0.22, 31);
          out.push(forme(lisse(bour), h.a.arete));
          const nu = ovale(W.hw, W.hh, 11, 0.16, 17);
          out.push(forme(lisse(nu), h.a.detail));
          // fil vertical du bois
          [-8, -4, 0, 4, 8].forEach((dx, i) => { const f = 1 - (dx / (W.hw + 1)) ** 2, hy = W.hh * Math.sqrt(Math.max(0, f)) * 0.8;
            out.push(h.path(`M ${R(W.x + dx)} ${R(W.y - hy)} Q ${R(W.x + dx + (i % 2 ? 1.2 : -1.2))} ${R(W.y)} ${R(W.x + dx)} ${R(W.y + hy)}`, h.a.fin)); });
          // bosses de la gomme sur le bourrelet
          bour.forEach(([x, y], i) => { if (i % 3) return; const dx = x - W.x, dy = y - W.y, d = Math.hypot(dx, dy);
            out.push(h.path(`M ${R(x - dx / d * 3 - dy / d * 2.5)} ${R(y - dy / d * 3 + dx / d * 2.5)} Q ${R(x)} ${R(y)} ${R(x - dx / d * 3 + dy / d * 2.5)} ${R(y - dy / d * 3 - dx / d * 2.5)}`, h.a.fin)); });
          // coulées : des gouttes irrégulières qui partent du bourrelet, de longueurs inégales
          g.c.forEach(([x, y0, y1], j) => {
            const w = [2.6, 2.2, 1.8][j];
            out.push(forme(lisse([[x - w, y0], [x - w * 0.7, (y0 + y1) / 2 - 4], [x - w * 1.2, (y0 + y1) / 2 + 3], [x - w * 0.8, y1 - 6], [x - w * 1.9, y1 - 1], [x - w * 0.6, y1 + 3.5],
              [x + w * 0.9, y1 + 3], [x + w * 1.8, y1 - 2], [x + w * 0.9, y1 - 7], [x + w, (y0 + y1) / 2], [x + w * 1.1, y0]]), h.a.detail));
            out.push(h.path(`M ${R(x - w * 1.2)} ${R(y1 - 2)} Q ${R(x - w)} ${R(y1 + 1)} ${R(x)} ${R(y1 + 2)}`, h.a.fin));
          });
          const [kx, , ky] = g.c[1];
          out.push(couteau(kx + 1, ky + 8, 16));
          out.push(poly([[kx - 7, ky + 18], [kx - 3, ky + 16], [kx - 2, ky + 20], [kx - 6, ky + 21.5]], h.a.detail));
          out.push(poly([[kx - 1, ky + 27], [kx + 2, ky + 26], [kx + 2.5, ky + 29], [kx - 0.5, ky + 29.5]], h.a.detail));
          return out.join('\n');
        },
        renvois: (z) => {
          const g = gEpi(z), [x, , y1] = g.c[0];
          return [{ n: 3, rond: [12, y1 - 4], cible: [x - 5, y1 - 2], texte: 'coulée durcie, raclée' }];
        },
      },
      // ── 3. fondue sur une pierre au bord des braises ──
      braises: {
        titre: 'Fondue sur une pierre, au bord des braises',
        dessin: (z) => {
          const { G, x1, x2, ec } = gBr(z), out = [];
          out.push(h.ligne(0, G, z.l, G, h.a.arete));
          // le feu, repoussé loin de la pierre, coupé au bord de la vue
          // dessiné à partir de 0, puis décalé de 16 vers la gauche : la découpe le coupe au bord
          const fx = 0;
          const feu = [flamme(fx + 1, G - 14, 16, 36), flamme(fx + 21, G - 16, 14, 30), flamme(fx + 11, G - 28, 18, 46)];
          [[fx, G - 9], [fx + 20, G - 9], [fx + 10, G - 25]].forEach(([x, y]) =>
            feu.push(h.cercle(x, y, 8.6, h.a.blanc), h.cercle(x, y, 8.6, h.a.arete), h.cercle(x, y, 4, h.a.fin)));
          out.push(`<defs><clipPath id="coupe-feu-94-34"><rect x="0" y="0" width="${R(z.l)}" height="${R(z.h)}"/></clipPath></defs><g clip-path="url(#coupe-feu-94-34)"><g transform="translate(-16 0)">\n${feu.join('\n')}\n</g></g>`);
          // la pierre plate
          const pierre = [[x1, G], [x1 - 3, G - 10], [x1 + 2, G - 19], [x1 + 12, G - 22], [x2 - 10, G - 23], [x2 + 2, G - 21], [x2 + 4, G - 12], [x2 + 1, G]];
          out.push(h.chemin(pierre, h.a.blanc, true), h.chemin(pierre, h.a.hachure('pierre', 'aucun'), true), h.chemin(pierre, h.a.contour, true));
          // seul le tas de braises touche la pierre
          out.push(braises(z.l * 0.2, x1 + 12, G, 13, 7));
          // la gomme qui fond : base à plat, le bas foncé (fondu), poussée vers le bord droit
          const W = x2 - x1, m = (xa, xb, ht) => {
            const d = lisse([[xa, G - 22.5], [xa + 1, G - 22.5 - ht * 0.7], [(xa + xb) / 2, G - 22.5 - ht], [xb - 1, G - 22.5 - ht * 0.6], [xb, G - 22.5]]);
            return forme(d, h.a.detail) + '\n' + h.path(`M ${R(xa)} ${R(G - 22.5)} Q ${R(xa + 0.5)} ${R(G - 26)} ${R(xa + 3)} ${R(G - 26.5)} L ${R(xb - 3)} ${R(G - 26.5)} Q ${R(xb - 0.5)} ${R(G - 26)} ${R(xb)} ${R(G - 22.5)} Z`, h.a.plein);
          };
          out.push(m(x1 + 5, x1 + W * 0.3, 9), m(x1 + W * 0.33, x1 + W * 0.55, 7));
          // la nappe fondue, qui va au bord et passe par-dessus
          const ec2 = ec.cx - ec.lh / 2 + 10, yE = G - ec.ht + 2;
          out.push(h.path(`M ${R(x1 + W * 0.56)} ${R(G - 22.6)} Q ${R(x1 + W * 0.6)} ${R(G - 26)} ${R(x1 + W * 0.7)} ${R(G - 25.5)} L ${R(x2 - 2)} ${R(G - 24)} Q ${R(x2 + 4)} ${R(G - 23)} ${R(x2 + 5)} ${R(G - 18)}`
            + ` C ${R(x2 + 6)} ${R(G - 14)} ${R(ec2 - 1)} ${R(G - 16)} ${R(ec2 - 0.6)} ${R(yE)} L ${R(ec2 + 1.4)} ${R(yE)} C ${R(ec2 + 1.4)} ${R(G - 18)} ${R(x2 + 8)} ${R(G - 19)} ${R(x2 + 6.5)} ${R(G - 23)}`
            + ` Q ${R(x2 + 4)} ${R(G - 27.5)} ${R(x2 - 3)} ${R(G - 27.5)} L ${R(x1 + W * 0.7)} ${R(G - 27.5)} Q ${R(x1 + W * 0.6)} ${R(G - 28)} ${R(x1 + W * 0.56)} ${R(G - 22.6)} Z`, h.a.plein));
          out.push(goutte(ec2 + 0.4, yE + 3, 1.6, h.a.plein));
          // le bâton couché qui pousse la gomme vers le bord
          out.push(baton(x1 + W * 0.66, G - 29, -155, 42, 4.5));
          out.push(h.geste(`M ${R(x1 + W * 0.62)} ${R(G - 38)} L ${R(x2 - 4)} ${R(G - 38)}`));
          out.push(ecuelle(ec.cx, G, ec.lh, ec.ht));
          return out.join('\n');
        },
        renvois: (z) => {
          const { G, x1, x2, ec } = gBr(z), yr = Math.min(z.h - 11, G + 22);
          return [
            { n: 4, rond: [(x1 + x2) / 2 - 8, yr], cible: [(x1 + x2) / 2 - 8, G - 8], texte: 'pierre plate' },
            { n: 5, rond: [z.l * 0.21, yr], cible: [z.l * 0.25, G - 7], texte: 'braises, jamais de flamme' },
            { n: 6, rond: [ec.cx + 16, yr], cible: [ec.cx + 12, G - 5], texte: 'écuelle d’écorce, à l’écart' },
          ];
        },
      },
      // ── 4. sans tissu : reposée chaude, le milieu transvidé ──
      reposer: {
        titre: 'Sans tissu : reposée chaude, le milieu transvidé',
        dessin: (z) => {
          const g = gRep(z), { G, A, H } = g, out = [];
          const r = alea(11);
          out.push(h.ligne(8, G, A.x2 + 22, G, h.a.arete));
          // la boîte au repos, en coupe
          const ys = A.yt + 10;
          out.push(h.rect(A.x1, G - 15, A.x2 - A.x1, 15, h.a.hachure('gravier', 'aucun')));
          out.push(h.path(lisse([[A.x1, G - 15], [A.x1 + 14, G - 16.5], [A.x1 + 30, G - 14.5], [A.x1 + 44, G - 16], [A.x2, G - 15]], false), h.a.detail));
          out.push(h.ligne(A.x1, ys, A.x2, ys, h.a.detail));
          for (let i = 0; i < 12; i++) {
            const x = A.x1 + 6 + r() * (A.x2 - A.x1 - 12), y = ys + 2.5 + r() * 9, a = (r() - 0.5) * 1.2, l = 5 + r() * 5;
            out.push(h.path(`M ${R(x - Math.cos(a) * l / 2)} ${R(y - Math.sin(a) * l / 2)} L ${R(x + Math.cos(a) * l / 2)} ${R(y + Math.sin(a) * l / 2)}`, h.a.detail));
          }
          [[0.3, 5], [0.7, 7]].forEach(([f, dy]) => { const x = A.x1 + f * (A.x2 - A.x1); out.push(poly([[x - 3, ys + dy], [x + 2, ys + dy - 1.5], [x + 3, ys + dy + 1.5], [x - 2, ys + dy + 2.5]], h.a.detail)); });
          out.push(h.chemin([[A.x1, A.yt], [A.x1, G], [A.x2, G], [A.x2, A.yt]], h.a.contour));
          out.push(h.cercle(A.x1 - 1.5, A.yt, 1.8, h.a.detail), h.cercle(A.x2 + 1.5, A.yt, 1.8, h.a.detail));
          // la même, penchée : le dessus retenu au bâton, le sable reste au fond
          const { BL, BR, TL, TR } = g, int = [BL, BR, TR, TL];
          const yl = TR[1] + 0.6;
          const liq = sousNiveau(int, yl);
          out.push(h.chemin(liq, h.a.blanc, true));
          const sab = sousNiveau(int, BR[1] - 12);
          out.push(h.chemin(sab, h.a.hachure('gravier', 'aucun'), true));
          const s0 = sab.filter((p) => Math.abs(p[1] - (BR[1] - 12)) < 0.2);
          if (s0.length === 2) out.push(h.ligne(s0[0][0], s0[0][1], s0[1][0], s0[1][1], h.a.detail));
          const l0 = liq.filter((p) => Math.abs(p[1] - yl) < 0.2).sort((a, b) => a[0] - b[0]);
          out.push(h.ligne(l0[0][0], yl, TR[0], yl, h.a.detail));
          const stx = TR[0] - 18;
          for (let i = 0; i < 9; i++) {
            const x = l0[0][0] + 5 + r() * (stx - l0[0][0] - 10), y = yl + 1.5 + r() * 4.5, a = (r() - 0.5) * 0.8, l = 5 + r() * 5;
            out.push(h.path(`M ${R(x - Math.cos(a) * l / 2)} ${R(y - Math.sin(a) * l / 2)} L ${R(x + Math.cos(a) * l / 2)} ${R(y + Math.sin(a) * l / 2)}`, h.a.detail));
          }
          out.push(h.chemin([TL, BL, BR, TR], h.a.contour));
          out.push(h.cercle(...rot(TL[0], TL[1], 58)([-1.6, 0]), 1.8, h.a.detail), h.cercle(...rot(TR[0], TR[1], 58)([1.6, 0]), 1.8, h.a.detail));
          out.push(baton(stx, yl + 4, -80, 50, 4));
          // le filet qui passe par-dessus le bord
          const C = g.C, [lx, ly] = TR;
          out.push(forme(`M ${R(lx)} ${R(ly)} C ${R(lx + 7)} ${R(ly - 3)} ${R(lx + 11)} ${R(ly + 5)} ${R(lx + 11)} ${R(ly + 16)} L ${R(lx + 11)} ${R(G - 15)} L ${R(lx + 14)} ${R(G - 15)} L ${R(lx + 14)} ${R(ly + 16)} C ${R(lx + 14)} ${R(ly + 2)} ${R(lx + 8)} ${R(ly - 5)} ${R(lx - 0.5)} ${R(ly - 2.5)} Z`, h.a.detail));
          // le deuxième contenant, en coupe
          out.push(h.ligne(C.cx - C.w / 2 - 14, G, Math.min(z.l - 2, C.cx + C.w / 2 + 14), G, h.a.arete));
          out.push(h.ligne(C.cx - C.w / 2, G - 15, C.cx + C.w / 2, G - 15, h.a.detail));
          out.push(h.chemin([[C.cx - C.w / 2, C.yt], [C.cx - C.w / 2, G], [C.cx + C.w / 2, G], [C.cx + C.w / 2, C.yt]], h.a.contour));
          return out.join('\n');
        },
        renvois: (z) => {
          const g = gRep(z), ys = g.A.yt + 10;
          // le bâton qui retient le dessus : pied à (TR − 18, niveau + 4), incliné à −80°, 50 de long
          const yl = g.TR[1] + 0.6, stx = g.TR[0] - 18, tb = 39;
          const surBaton = [stx + tb * Math.cos(80 * Math.PI / 180), yl + 4 - tb * Math.sin(80 * Math.PI / 180)];
          return [
            { n: 7, rond: [13, ys + 7], cible: [g.A.x1 + 7, ys + 7], texte: 'les aiguilles montent' },
            { n: 8, rond: [13, g.G - 8], cible: [g.A.x1 + 7, g.G - 8], texte: 'le sable descend' },
            { n: 9, rond: [z.l - 12, g.G - 72], cible: surBaton, texte: 'le dessus retenu au bâton' },
          ];
        },
      },
      // ── 5. tempérée au gras et au charbon pilé ──
      temperer: {
        titre: 'Tempérée au gras et au charbon pilé',
        dessin: (z) => {
          const { G, cx, yt, nouet, ec } = gTe(z), out = [];
          out.push(h.ligne(4, G, z.l - 4, G, h.a.arete));
          // le charbon écrasé entre deux pierres
          const encl = [[10, G], [8, G - 9], [16, G - 17], [50, G - 19], [88, G - 17], [97, G - 8], [95, G]];
          out.push(h.chemin(encl, h.a.blanc, true), h.chemin(encl, h.a.hachure('pierre', 'aucun'), true), h.chemin(encl, h.a.contour, true));
          out.push(h.path(`M 36 ${G - 18.8} Q 52 ${G - 25} 70 ${G - 18.6} Z`, h.a.plein));
          out.push(h.chemin([[24, G - 18], [27, G - 25], [34, G - 24], [33, G - 18.4]], h.a.plein, true));
          out.push(h.chemin([[74, G - 18.3], [76, G - 26], [84, G - 24], [85, G - 17.8]], h.a.plein, true));
          [[40, G - 22], [62, G - 23], [58, G - 20]].forEach(([x, y]) => out.push(h.cercle(x, y, 0.9, h.a.blanc)));
          const mol = lisse([[34, G - 42], [44, G - 53], [62, G - 55], [74, G - 46], [73, G - 34], [60, G - 28], [42, G - 29]]);
          out.push(h.path(mol, h.a.blanc), h.path(mol, h.a.hachure('pierre', 'aucun')), h.path(mol, h.a.contour));
          out.push(h.geste(`M 86 ${G - 60} L 86 ${G - 36}`));
          // la boîte sur les braises
          out.push(boite(cx, yt, 54, 56, h.a.plein, true));
          out.push(braises(cx - 44, cx + 44, G, 12, 5));
          // le tissu noué, secoué au-dessus : la poudre passe, les grains restent
          const [nx, ny] = nouet;
          out.push(forme(lisse([[nx - 3, ny - 12], [nx - 10, ny - 7], [nx - 12, ny + 2], [nx - 7, ny + 10], [nx + 1, ny + 12], [nx + 9, ny + 8], [nx + 12, ny], [nx + 8, ny - 8], [nx + 3, ny - 12]]), h.a.arete));
          out.push(h.path(`M ${nx - 6} ${ny - 8} Q ${nx - 5} ${ny + 2} ${nx - 1} ${ny + 10}`, h.a.fin), h.path(`M ${nx + 4} ${ny - 9} Q ${nx + 7} ${ny} ${nx + 5} ${ny + 9}`, h.a.fin));
          out.push(poly([[nx - 3, ny - 12], [nx - 9, ny - 22], [nx - 1, ny - 17]], h.a.detail), poly([[nx + 3, ny - 12], [nx + 8, ny - 23], [nx + 1, ny - 17]], h.a.detail));
          out.push(h.rect(nx - 4, ny - 15, 8, 3.2, h.a.blanc), h.rect(nx - 4, ny - 15, 8, 3.2, h.a.detail));
          [[0, 15], [-3, 19], [2, 21], [-1, 25], [3, 27], [-4, 28], [1, 31], [-2, 34], [3.5, 35], [0, 38]].forEach(([dx, dy]) =>
            out.push(h.cercle(nx + dx, ny + dy, 0.95, h.a.plein)));
          // le gras fondu, versé d'une écuelle
          out.push(ecuelle(ec[0], ec[1], 34, 12, -40));
          const lip = rot(ec[0], ec[1], -40)([-17, -12]);
          out.push(h.path(`M ${R(lip[0])} ${R(lip[1])} C ${R(lip[0] - 3)} ${R(lip[1] + 4)} ${R(lip[0] - 2)} ${R(lip[1] + 12)} ${R(lip[0] - 2.5)} ${R(yt + 1)}`, h.a.arete));
          return out.join('\n');
        },
        renvois: (z) => {
          const { G, cx, yt, nouet, ec } = gTe(z);
          return [
            { n: 10, rond: [13, G - 68], cible: [28, G - 23], texte: 'charbon de bois franc, pilé' },
            { n: 11, rond: [nouet[0] - 36, nouet[1] - 12], cible: [nouet[0] - 12, nouet[1] - 2], texte: 'tamisé à travers un tissu' },
            { n: 12, rond: [z.l - 13, ec[1] - 18], cible: [ec[0] + 4, ec[1] - 12], texte: 'gras animal fondu' },
          ];
        },
      },
      // ── 6. la goutte sur la pierre gelée ──
      goutte: {
        titre: 'La goutte, sur une pierre gelée',
        dessin: (z) => {
          const { ys, yn, x1, x2, xa, xb, xc } = gGo(z), out = [];
          const pierre = `M ${R(x1)} ${R(yn + 8)} C ${R(x1 + 2)} ${R(ys + 6)} ${R(x1 + 12)} ${ys} ${R(x1 + 30)} ${ys} L ${R(x2 - 30)} ${ys} C ${R(x2 - 12)} ${ys} ${R(x2 - 2)} ${R(ys + 6)} ${R(x2)} ${R(yn + 8)} Z`;
          out.push(h.path(pierre, h.a.blanc), h.path(pierre, h.a.hachure('pierre', 'aucun')), h.path(pierre, h.a.contour));
          const nd = [[0, yn + 1], [z.l * 0.05, yn - 2], [x1 + 4, yn - 6], [x1 + 14, yn - 1], [z.l * 0.3, yn + 1], [z.l * 0.5, yn - 1], [z.l * 0.7, yn + 1],
            [x2 - 14, yn - 1], [x2 - 4, yn - 6], [z.l * 0.95, yn - 2], [z.l, yn + 1]];
          const neige = [...nd, [z.l, z.h - 2], [0, z.h - 2]];
          out.push(h.chemin(neige, h.a.blanc, true), h.chemin(neige, h.a.hachure('neige', 'aucun'), true), h.path(lisse(nd, false), h.a.arete));
          const K = 1.4, q = (x0) => (dx, dy) => `${R(x0 + dx * K)} ${R(ys + dy * K)}`, a = q(xa), b = q(xb), c = q(xc);
          // trop grasse : molle, elle file au bâton
          out.push(h.path(`M ${a(-12, 0)} Q ${a(-11, -7)} ${a(0, -7.5)} Q ${a(11, -7)} ${a(12, 0)} Z`, h.a.plein));
          const T = [xa - 10, ys - 30];
          out.push(h.path(`M ${a(-3.5, -6.5)} C ${a(-4, -12)} ${R(xa - 7)} ${ys - 22} ${R(T[0] - 0.8)} ${T[1]} L ${R(T[0] + 0.8)} ${T[1]} C ${R(xa - 5)} ${ys - 20} ${a(-1, -11)} ${a(2.5, -6.5)} Z`, h.a.plein));
          out.push(baton(T[0] - 1, T[1] - 1, -120, 24, 4), h.ellipse(T[0] - 1.5, T[1] - 2, 3, 2.4, h.a.plein));
          // prête : casse net, comme du verre
          out.push(h.path(`M ${b(-12.5, 0)} Q ${b(-12, -7.5)} ${b(-3, -7.5)} L ${b(-1.5, -4)} L ${b(-2.8, 0)} Z`, h.a.plein));
          out.push(h.path(`M ${b(1, 0)} L ${b(2.2, -3.5)} L ${b(0.8, -7.5)} Q ${b(11, -7.5)} ${b(12, 0)} Z`, h.a.plein));
          out.push(h.path(`M ${b(-9, -4.5)} Q ${b(-7, -6.2)} ${b(-4.5, -6.2)}`, REFLET), h.path(`M ${b(4, -6.2)} Q ${b(7, -6.2)} ${b(9, -4.5)}`, REFLET));
          // le point que le test vérifie : la goutte qui casse net
          out.push(h.controle(xb, ys - 4, 19));
          // trop sèche : elle éclate en miettes
          [[[-14, 0], [-11, -3.5], [-8, 0]], [[-6, 0], [-5, -5], [-1, -3.5], [-1.5, 0]], [[1, 0], [3, -4.5], [6.5, -2], [6, 0]], [[8.5, 0], [11.5, -2.8], [13, 0]],
            [[-19, 0], [-17.5, -2.2], [-16, 0]], [[15, 0], [17, -2], [18.5, 0]], [[-9, -11], [-6.5, -14], [-5, -10.5]], [[9, -13], [12, -14.5], [11, -10.5]]]
            .forEach((p) => out.push(h.path('M ' + p.map(([dx, dy]) => c(dx, dy)).join(' L ') + ' Z', h.a.plein)));
          out.push(h.path(`M ${c(-11, -17)} L ${c(-12.5, -20)}`, h.a.fin), h.path(`M ${c(14, -18)} L ${c(16, -21)}`, h.a.fin));
          return out.join('\n');
        },
        renvois: (z) => {
          const { ys, x2, xa, xb, xc } = gGo(z);
          return [
            { n: 13, rond: [13, ys - 22], cible: [xa - 6.5, ys - 20], texte: 'file au bâton : recuire' },
            { n: 14, rond: [xb + 4, ys - 38], cible: [xb + 7, ys - 9], texte: 'casse net : prête' },
            { n: 15, rond: [xc + 26, ys - 38], cible: [xc + 16, ys - 2], texte: 'éclate : plus de gras' },
            { n: 16, rond: [z.l - 12, ys + 12], cible: [x2 - 20, ys + 14], texte: 'pierre gelée, dehors' },
          ];
        },
      },
      // ── 7. coulée en bâtonnets ──
      batons: {
        titre: 'Coulée en bâtonnets',
        dessin: (z) => {
          const { yF, yK, ep, sk, x1, x2, rig } = gBa(z), out = [];
          const dessus = [[x1, yF], [x2, yF], [x2 + sk, yK], [x1 + sk, yK]];
          out.push(h.chemin(dessus, h.a.blanc, true), h.chemin(dessus, h.a.hachure('gravier', 'aucun'), true));
          const face = [[x1, yF], [x2, yF], [x2, yF + ep], [x1, yF + ep]], cote = [[x2, yF], [x2 + sk, yK], [x2 + sk, yK + ep], [x2, yF + ep]];
          out.push(h.chemin(cote, h.a.ombre, true));
          out.push(h.chemin(face, h.a.hachure('gravier', 'aucun'), true), h.chemin(cote, h.a.hachure('gravier', 'aucun'), true));
          out.push(h.chemin([[x1, yF + ep], [x1, yF], [x1 + sk, yK], [x2 + sk, yK], [x2 + sk, yK + ep], [x2, yF + ep], [x1, yF + ep]], h.a.contour, true));
          out.push(h.chemin([[x1, yF], [x2, yF], [x2 + sk, yK]], h.a.arete), h.ligne(x2, yF, x2, yF + ep, h.a.arete));
          const caps = (xs, xe, y, r = 3.6) => `M ${R(xs + r)} ${R(y - r)} L ${R(xe - r)} ${R(y - r)} A ${r} ${r} 0 0 1 ${R(xe - r)} ${R(y + r)} L ${R(xs + r)} ${R(y + r)} A ${r} ${r} 0 0 1 ${R(xs + r)} ${R(y - r)} Z`;
          const vide = (xs, xe, y) => [forme(caps(xs, xe, y), h.a.detail), h.ligne(xs + 3, y - 1.4, xe - 3, y - 1.4, h.a.fin)].join('\n');
          const [a, b, c] = rig;
          out.push(vide(a.xs, a.xs + a.len, a.y));                         // vidée : le bâtonnet est sorti
          out.push(h.path(caps(b.xs, b.xs + b.len, b.y), h.a.plein));        // pleine, qui durcit
          out.push(h.path(`M ${R(b.xs + 6)} ${R(b.y - 1.6)} L ${R(b.xs + b.len - 8)} ${R(b.y - 1.6)}`, REFLET));
          out.push(vide(c.xs, c.xs + c.len, c.y));                         // qu'on remplit
          const xf = c.xs + c.len * 0.42;
          out.push(h.path(caps(xf, c.xs + c.len, c.y), h.a.plein));
          // la boîte penchée qui verse
          const bp = boitePenchee(-128, 28, 34);
          const lip0 = bp.lip(rot(0, 0, -128));
          const cible = [c.xs + c.len - 8, c.y - 26];
          const T = rot(cible[0] - lip0[0], cible[1] - lip0[1], -128);
          out.push(bp.dessin(T));
          out.push(h.path(`M ${R(cible[0] - 1.5)} ${R(cible[1])} C ${R(cible[0] - 2.5)} ${R(cible[1] + 12)} ${R(cible[0] - 1.2)} ${R(c.y - 12)} ${R(cible[0] - 1.8)} ${R(c.y)} L ${R(cible[0] + 1.4)} ${R(c.y)} C ${R(cible[0] + 1.8)} ${R(c.y - 12)} ${R(cible[0] + 1.2)} ${R(cible[1] + 12)} ${R(cible[0] + 1.5)} ${R(cible[1])} Z`, h.a.plein));
          // un bâtonnet durci, sorti de sa rigole
          const yb = yF + ep + 12, bl = a.len * 0.9, bx = x1 + 22;
          const Tb = rot(bx, yb, -3);
          out.push(h.path(lisse([[0, -3.6], [bl * 0.5, -3.9], [bl, -3.4], [bl + 3.4, 0], [bl, 3.4], [bl * 0.5, 3.8], [0, 3.6], [-3.6, 0]].map(Tb)), h.a.plein));
          out.push(h.chemin([[4, -1.6], [bl - 6, -1.6]].map(Tb), REFLET));
          return out.join('\n');
        },
        renvois: (z) => {
          const { yF, ep, x1, rig } = gBa(z), c = rig[2], a = rig[0];
                    return [
            { n: 17, rond: [z.l - 12, 30], cible: [c.xs + c.len - 8 + 1.5, c.y - 12], texte: 'coulée dans une rigole' },
            { n: 18, rond: [z.l - 12, yF + ep + 12], cible: [x1 + 22 + a.len * 0.9 + 3, yF + ep + 11], texte: 'se garde des années' },
          ];
        },
      },
      // ── 8. une fuite réparée ──
      fuite: {
        titre: 'Une fuite réparée',
        dessin: (z) => {
          const { pa, patch, co } = gFu(z), out = [];
          // le panier d'écorce
          const corps = [[pa.cx - pa.wt / 2, pa.yt], [pa.cx + pa.wt / 2, pa.yt], [pa.cx + pa.wb / 2, pa.yb], [pa.cx - pa.wb / 2, pa.yb]];
          out.push(h.chemin(corps, h.a.blanc, true));
          // le flanc droit du panier, à l'ombre
          out.push(h.chemin([[R(pa.cx + pa.wt * 0.22), R(pa.yt)], [R(pa.cx + pa.wt / 2), R(pa.yt)], [R(pa.cx + pa.wb / 2), R(pa.yb)], [R(pa.cx + pa.wb * 0.22), R(pa.yb)]], h.a.ombre, true));
          out.push(h.chemin(corps, h.a.contour, true));
          out.push(h.path(`M ${R(pa.cx - pa.wb / 2)} ${R(pa.yb)} Q ${R(pa.cx)} ${R(pa.yb + 4)} ${R(pa.cx + pa.wb / 2)} ${R(pa.yb)}`, h.a.detail));
          out.push(h.ellipse(pa.cx, pa.yt, pa.wt / 2, 5, h.a.blanc), h.ellipse(pa.cx, pa.yt, pa.wt / 2, 5, h.a.arete));
          const yr = pa.yt + 7, wr = pa.wt / 2 - (pa.wt - pa.wb) / 2 * (7 / (pa.yb - pa.yt));
          out.push(h.path(`M ${R(pa.cx - wr)} ${R(yr)} Q ${R(pa.cx)} ${R(yr + 5)} ${R(pa.cx + wr)} ${R(yr)}`, h.a.detail));
          for (let x = pa.cx - pa.wt / 2 + 4; x < pa.cx + pa.wt / 2 - 3; x += 5) out.push(h.ligne(x, pa.yt + 3.5, x + 1.8, yr + 1.5, h.a.fin));
          [[-0.25, 0.4], [0.2, 0.33], [-0.1, 0.8], [0.2, 0.88], [-0.28, 0.66], [0.05, 0.25], [-0.18, 0.52], [0.3, 0.58], [-0.05, 0.95], [0.15, 0.72], [-0.3, 0.85], [0.28, 0.2]].forEach(([dx, fy]) => {
            const y = pa.yt + (pa.yb - pa.yt) * fy, x = pa.cx + dx * pa.wt;
            out.push(h.ligne(x - 3, y, x + 3, y, h.a.fin));
          });
          const [qx, qy] = patch;
          out.push(h.path(lisse([[qx - 11, qy - 6], [qx - 2, qy - 8.5], [qx + 10, qy - 7], [qx + 12, qy + 1], [qx + 9, qy + 8], [qx - 1, qy + 9], [qx - 11, qy + 6], [qx - 13, qy]]), h.a.plein));
          out.push(h.rect(qx - 7, qy - 4.5, 14, 9, TISSU));
          out.push(h.cercle(qx, qy, 17, h.a.fin));
          // en coupe, grossi
          const { x1, x2, y, ep, xc } = co;
          out.push(h.ligne(qx + 17, qy - 1, x1 - 3, y - 4, h.a.fin));
          const gauche = [[x1, y], [xc - 2, y], [xc - 0.6, y + ep * 0.45], [xc - 1.6, y + ep], [x1, y + ep]];
          const droite = [[xc + 2.4, y], [x2, y], [x2, y + ep], [xc + 1, y + ep], [xc + 2, y + ep * 0.5]];
          [gauche, droite].forEach((p) => out.push(h.chemin(p, h.a.blanc, true), h.chemin(p, h.a.hachure('bois', 'aucun'), true)));
          out.push(h.chemin([[x1, y], [xc - 2, y], [xc - 0.6, y + ep * 0.45], [xc - 1.6, y + ep], [x1, y + ep]], h.a.contour));
          out.push(h.chemin([[x2, y], [xc + 2.4, y], [xc + 2, y + ep * 0.5], [xc + 1, y + ep], [x2, y + ep]], h.a.contour));
          const cas = (x) => lisse([[x, y - 1], [x - 2, y + ep * 0.35], [x + 1.5, y + ep * 0.7], [x, y + ep + 1]], false);
          out.push(h.path(cas(x1), h.a.detail), h.path(cas(x2), h.a.detail));
          // la poix étendue chaude, le tissu pris dedans, qui entre dans la fente
          out.push(h.path(`M ${R(xc - 40)} ${y} Q ${R(xc - 34)} ${y - 8} ${R(xc - 22)} ${y - 8} L ${R(xc + 22)} ${y - 8} Q ${R(xc + 34)} ${y - 8} ${R(xc + 40)} ${y} L ${R(xc + 2.4)} ${y} L ${R(xc + 2.1)} ${R(y + ep * 0.4)} L ${R(xc - 0.7)} ${R(y + ep * 0.4)} L ${R(xc - 2)} ${y} Z`, h.a.plein));
          out.push(h.path(`M ${R(xc - 32)} ${y - 2.5} Q ${R(xc - 16)} ${y - 5.5} ${R(xc)} ${y - 4} Q ${R(xc + 16)} ${y - 2.5} ${R(xc + 32)} ${y - 3}`, TISSU));
          // pressée jusqu'au froid
          out.push(h.rect(xc - 22, y - 19, 44, 11, h.a.blanc), h.rect(xc - 22, y - 19, 44, 11, h.a.hachure('bois', 'arete')));
          out.push(h.geste(`M ${R(xc)} ${y - 40} L ${R(xc)} ${y - 22}`));
          return out.join('\n');
        },
        renvois: (z) => {
          const { co } = gFu(z), { x1, y, ep, xc } = co;
          return [
            { n: 19, rond: [xc + 18, y + ep + 20], cible: [xc + 0.5, y + ep - 1.5], texte: 'fente séchée' },
            { n: 20, rond: [z.l - 12, y - 30], cible: [xc + 31, y - 3], texte: 'poix chaude, tissu dedans' },
            { n: 21, rond: [x1 + 8, y - 34], cible: [xc - 22, y - 14], texte: 'bois mouillé, jusqu’au froid' },
          ];
        },
      },
    },
    danger: 'Danger — les vapeurs de térébenthine s’enflamment : des braises, jamais de flamme sous la résine. Poix en feu : couvrir, jamais d’eau. Poix sur la peau : longtemps à l’eau froide, sans l’arracher.',
  };
};
