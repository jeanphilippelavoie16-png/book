// Planche 54-08 — la glacière à évaporation (ch. 50, refroidir les oiseaux, troisième manière).
// Aucune cote : le chapitre ne donne aucune dimension pour la glacière, seulement ses pièces.
// Le cadre ouvert en axonométrie, le même monté sous sa toile à l'ombre, une coupe dans le
// sens du vent, et le coin de toile qui boit dans la chaudière.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blanc = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const C30 = Math.cos(Math.PI / 6), R2 = Math.SQRT2;
  const gen = s => { let g = s; return () => (g = (g * 16807) % 2147483647) / 2147483647; };

  // Le modèle, en unités sans dimension : seules les proportions comptent.
  const W = 1.2, D = 0.75, H = 0.9;        // long, profond, haut
  const t = 0.055;                         // équarrissage des montants et des traverses
  const o = 0.05, tr = 0.035;              // débord et épaisseur du toit
  const zt = 0.36;                         // dessus des tasseaux
  const pas = 0.05;                        // maille du grillage
  const lw = 0.065, jour = 0.045;          // latte et jour de la tablette
  const Ht = H + tr + 0.012;               // dessus de la toile sur le toit
  const cx = W * 0.42, cy = D * 0.5;       // la chaudière
  const rb = 0.14, rt = 0.17, hb = 0.25;
  const th = 1.83;                         // ouverture de la porte (rad)
  const dx = 0.85;                         // la tablette, tirée hors du cadre
  const dw = D - 2 * t, sn = Math.sin(th), cs = Math.cos(th);

  // ── Axonométrie : x vers la droite-avant, y vers la gauche-avant, z vers le haut ─────
  const iso = (ox, oy, s) => (x, y, z) => [ox + (x - y) * C30 * s, oy + (x + y) * 0.5 * s - z * s];
  const ajuste = (r, pts3) => {
    const P1 = iso(0, 0, 1), q = pts3.map(p => P1(...p));
    const xs = q.map(p => p[0]), ys = q.map(p => p[1]);
    const a = Math.min(...xs), b = Math.max(...xs), c = Math.min(...ys), d = Math.max(...ys);
    const s = Math.min(r.l / (b - a), r.h / (d - c));
    return { s, P: iso(r.x + (r.l - (b - a) * s) / 2 - a * s, r.y + (r.h - (d - c) * s) / 2 - c * s, s) };
  };
  const quad = (P, q, a) => h.chemin(q.map(p => P(...p)), a, true);
  // Un bloc de bois : les trois faces qu'on voit (dessus, face x1, face y1).
  const bloc = (P, x0, y0, z0, x1, y1, z1, a = blanc(h.a.arete)) => [
    quad(P, [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], a),
    quad(P, [[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]], a),
    quad(P, [[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]], a),
  ].join('\n');
  // Un panneau de grillage : pt(u, v) donne le point écran ; fond blanc, mailles au trait fin.
  const grille = (pt, u0, u1, v0, v1) => {
    const out = [h.chemin([pt(u0, v0), pt(u1, v0), pt(u1, v1), pt(u0, v1)], h.a.blanc, true)];
    for (let u = u0 + pas; u < u1 - 1e-6; u += pas) out.push(h.chemin([pt(u, v0), pt(u, v1)], h.a.fin));
    for (let v = v0 + pas; v < v1 - 1e-6; v += pas) out.push(h.chemin([pt(u0, v), pt(u1, v)], h.a.fin));
    return out.join('\n');
  };

  // La porte, ouverte, pendue au montant arrière par deux lanières de cuir.
  const ptPorte = P => (u, v) => P(W + u * sn, t + u * cs, v);
  const porte = P => {
    const pt = ptPorte(P), z0 = t + 0.01, z1 = H - t - 0.01, td = 0.045;
    return [
      h.chemin([pt(0, z0), pt(dw, z0), pt(dw, z1), pt(0, z1)], blanc(h.a.arete), true),
      grille(pt, td, dw - td, z0 + td, z1 - td),
      h.chemin([pt(td, z0 + td), pt(dw - td, z0 + td), pt(dw - td, z1 - td), pt(td, z1 - td)], h.a.arete, true),
      // chaque lanière : une boucle plate autour du montant, puis autour du montant de la porte
      ...[0.2, H - 0.2].map(zc => { const w = 0.045, ep = 0.014; return [
        h.chemin([P(W, 0, zc - w), P(W, t, zc - w), P(W, t, zc + w), P(W, 0, zc + w)], blanc(h.a.contour), true),
        h.chemin([P(W, t, zc - w), P(W, t, zc + w)], h.a.arete),
        h.chemin([P(W + ep, -ep, zc - w), P(W + ep, -ep, zc + w)], h.a.arete),
        h.chemin([pt(0, zc - w), pt(td + 0.05, zc - w), pt(td + 0.05, zc + w), pt(0, zc + w)], blanc(h.a.contour), true),
        h.chemin([pt(td + 0.05 + ep, zc - w + ep), pt(td + 0.05 + ep, zc + w + ep), pt(td + 0.05, zc + w)], h.a.arete),
        h.chemin([P(W, 0, zc - w), pt(0, zc - w)], h.a.contour), h.chemin([P(W, 0, zc + w), pt(0, zc + w)], h.a.contour),
      ].join('\n'); }),
    ].join('\n');
  };

  // La tablette à claire-voie : deux longerons, des lattes en travers avec un jour entre elles.
  const tablette = (P, decal) => {
    const xa = t + 0.012 + decal, xb = W - t - 0.012 + decal, z1 = zt + 0.03, z2 = zt + 0.05;
    const out = [
      bloc(P, xa, t + 0.004, zt, xb, t + 0.05, z1),
      bloc(P, xa, D - t - 0.05, zt, xb, D - t - 0.004, z1),
    ];
    const n = Math.floor((xb - xa + jour) / (lw + jour));
    const x0 = xa + ((xb - xa) - (n * lw + (n - 1) * jour)) / 2;
    for (let i = 0; i < n; i++) {
      const a = x0 + i * (lw + jour);
      out.push(bloc(P, a, t + 0.004, z1, a + lw, D - t - 0.004, z2));
    }
    return out.join('\n');
  };

  // ── Vue 1 : le cadre, porte ouverte, tablette tirée ─────────────────────────────────
  const geoA = z => ajuste({ x: 8, y: 14, l: z.l - 16, h: z.h - 28 }, [
    [-o, -o, H + tr], [W + o, -o, H + tr], [-o, D + o, H + tr], [-o, D + o, 0], [W, D, 0],
    [W + dw * sn, t + dw * cs, t], [W + dw * sn, t + dw * cs, H - t],
    [W - t + dx, D - t, zt], [W - t + dx, t, zt + 0.05],
  ]);
  const dessinA = z => {
    const { P } = geoA(z);
    const b = (...a) => bloc(P, ...a);
    const out = [
      grille((u, v) => P(0, u, v), t, D - t, t, H - t),
      grille((u, v) => P(u, 0, v), t, W - t, t, H - t),
      b(0, 0, 0, t, t, H),
      b(0, t, 0, t, D - t, t), b(0, t, H - t, t, D - t, H),
      b(t, 0, 0, W - t, t, t), b(t, 0, H - t, W - t, t, H),
      b(W - t, 0, 0, W, t, H),
      b(t, t, zt - 0.035, W - t, t + 0.035, zt),
      b(t, D - t - 0.035, zt - 0.035, W - t, D - t, zt),
      b(W - t, t, 0, W, D - t, t),
      porte(P),
      tablette(P, dx),
      b(0, D - t, 0, t, D, H),
      b(t, D - t, 0, W - t, D, t), b(t, D - t, H - t, W - t, D, H),
      grille((u, v) => P(u, D, v), t, W - t, t, H - t),
      b(W - t, t, H - t, W, D - t, H),
      b(W - t, D - t, 0, W, D, H),
    ];
    const np = 4, pw = (D + 2 * o) / np;
    for (let i = 0; i < np; i++) out.push(b(-o, -o + i * pw, H, W + o, -o + (i + 1) * pw, H + tr));
    return out.join('\n');
  };

  // ── Vue 2 : monté sous la toile, à l'ombre, dans le vent ────────────────────────────
  const e = 0.012, X0 = -o - e, X1 = W + o + e, Y0 = -o - e, Y1 = D + o + e;
  const bosse = (d, l) => Math.exp(-((d / l) ** 2));
  const ourletG = x => 0.16 + 0.022 * Math.sin(x * 19) - 0.1 * bosse(x - X0, 0.09) - 0.11 * bosse(x - X1, 0.09);
  const ourletD = y => 0.16 + 0.022 * Math.sin(y * 23 + 1) - 0.11 * bosse(y - Y1, 0.09) + 0.42 * bosse(y - Y0, 0.2);
  const Rombre = 0.75, oX = W * 0.42, oY = D * 0.5;
  const vents = [[0.15, 0.82], [0.45, 0.78]];
  const geoB = z => {
    const haut = Math.round(z.h * 0.2), k = Rombre / R2;
    return { haut, ...ajuste({ x: 14, y: haut + 8, l: z.l - 28, h: z.h - haut - 14 }, [
      [X0, Y1, 0], [X0, Y1, Ht], [X1, Y0, Ht], [X0, Y0, Ht], [X1, Y1, 0],
      ...vents.map(([y, zz]) => [W + 0.8, y, zz]),
      [cx - rt, cy - rt, Ht + hb + 0.08],
      [oX + k, oY - k, 0], [oX - k, oY + k, 0], [oX + k, oY + k, 0],
    ]) };
  };
  const ellipse = (P, s, x, y, zz, r) => ({ c: P(x, y, zz), rx: R2 * C30 * r * s, ry: R2 * 0.5 * r * s });
  const surEllipse = (E, a) => [E.c[0] + E.rx * Math.cos(a), E.c[1] + E.ry * Math.sin(a)];
  const chaudiereIso = (P, s) => {
    const B = ellipse(P, s, cx, cy, Ht, rb), T = ellipse(P, s, cx, cy, Ht + hb, rt);
    const Wt = ellipse(P, s, cx, cy, Ht + hb - 0.05, rt - 0.02);
    const [bx, by] = B.c, [tx, ty] = T.c;
    const corps = `M ${f(tx - T.rx)} ${f(ty)} L ${f(bx - B.rx)} ${f(by)} A ${f(B.rx)} ${f(B.ry)} 0 0 0 ${f(bx + B.rx)} ${f(by)} L ${f(tx + T.rx)} ${f(ty)} A ${f(T.rx)} ${f(T.ry)} 0 0 1 ${f(tx - T.rx)} ${f(ty)} Z`;
    const anse = `M ${f(tx - T.rx)} ${f(ty + 3)} C ${f(tx - T.rx)} ${f(ty + 0.3 * s)} ${f(tx + T.rx)} ${f(ty + 0.3 * s)} ${f(tx + T.rx)} ${f(ty + 3)}`;
    return { T, Wt, svg: [
      h.path(corps, blanc(h.a.contour)),
      h.ellipse(tx, ty, T.rx, T.ry, h.a.arete),
      h.path(`M ${f(Wt.c[0] - Wt.rx)} ${f(Wt.c[1])} A ${f(Wt.rx)} ${f(Wt.ry)} 0 0 1 ${f(Wt.c[0] + Wt.rx)} ${f(Wt.c[1])}`, h.a.detail),
      h.path(anse, h.a.arete),
      h.cercle(tx - T.rx, ty + 3, 1.8, h.a.plein), h.cercle(tx + T.rx, ty + 3, 1.8, h.a.plein),
    ].join('\n') };
  };
  let coinMilieu = [0, 0];
  const coinIso = (P, s, ch) => {
    // Le coin arrière droit de la toile, relevé par-dessus le rebord et plongé dans l'eau.
    const K = P(X1, Y0, Ht), T = ch.T;
    const a = Math.atan2((K[1] - T.c[1]) / T.ry, (K[0] - T.c[0]) / T.rx);
    const R1 = surEllipse(T, a - 0.32), R2_ = surEllipse(T, a + 0.32);
    const A1 = P(X1 - 0.2, Y0, Ht), A2 = P(X1, Y0 + 0.2, Ht);
    const pied = ellipse(P, s, cx, cy, Ht, rb + 0.1);
    const c1 = surEllipse(pied, a - 0.35), c2 = surEllipse(pied, a + 0.35);
    const vers = (p, k) => [p[0] + (ch.Wt.c[0] - p[0]) * k, p[1] + (ch.Wt.c[1] - p[1]) * k + 0.03 * s];
    coinMilieu = [0.25 * (A1[0] + A2[0]) / 2 + 0.25 * (c1[0] + c2[0]) + 0.25 * (R1[0] + R2_[0]) / 2, 0.25 * (A1[1] + A2[1]) / 2 + 0.25 * (c1[1] + c2[1]) + 0.25 * (R1[1] + R2_[1]) / 2];
    return [
      h.path(`M ${f(A1[0])} ${f(A1[1])} Q ${f(c1[0])} ${f(c1[1])} ${f(R1[0])} ${f(R1[1])} L ${f(R2_[0])} ${f(R2_[1])} Q ${f(c2[0])} ${f(c2[1])} ${f(A2[0])} ${f(A2[1])} Z`, blanc(h.a.arete)),
      h.chemin([R1, R2_, vers(R2_, 0.3), vers(R1, 0.3)], blanc(h.a.arete), true),
    ].join('\n');
  };
  const dessinB = z => {
    const { P, s, haut } = geoB(z);
    const out = [];
    // l'ombre au sol, en traits fins
    const O = ellipse(P, s, oX, oY, 0, Rombre);
    for (let y = O.c[1] - O.ry + 3; y < O.c[1] + O.ry; y += 4) {
      const k = O.rx * Math.sqrt(Math.max(0, 1 - ((y - O.c[1]) / O.ry) ** 2));
      out.push(h.ligne(f(O.c[0] - k), f(y), f(O.c[0] + k), f(y), h.a.fin));
    }
    // le tronc, derrière la glacière
    const [tx, ty] = P(-0.35, 0.05, 0), hc = haut * 0.7;
    out.push(h.path(`M ${f(tx - 10)} ${f(ty)} L ${f(tx + 10)} ${f(ty)} C ${f(tx + 9)} ${f(ty - 60)} ${f(tx + 7)} ${f(hc + 50)} ${f(tx + 6)} ${f(hc)} L ${f(tx - 6)} ${f(hc)} C ${f(tx - 7)} ${f(hc + 40)} ${f(tx - 9)} ${f(ty - 60)} ${f(tx - 10)} ${f(ty)} Z`, blanc(h.a.arete)));
    for (const [ex, ey, el] of [[-3, haut + 8, 16], [2, haut + 30, 12], [-1, haut + 50, 14], [3, haut + 70, 10]]) out.push(h.ligne(f(tx + ex), f(ey), f(tx + ex + 0.5), f(ey + el), h.a.fin));
    out.push(h.path(`M ${f(tx + 5)} ${f(hc + 40)} C ${f(tx + 18)} ${f(hc + 25)} ${f(tx + 30)} ${f(hc + 12)} ${f(tx + 40)} ${f(hc)}`, h.a.arete));
    out.push(h.path(`M ${f(tx + 5.5)} ${f(hc + 52)} C ${f(tx + 18)} ${f(hc + 36)} ${f(tx + 32)} ${f(hc + 22)} ${f(tx + 44)} ${f(hc + 4)}`, h.a.arete));
    // le cadre, dont on ne voit que le bas sous l'ourlet
    const b = (...a) => bloc(P, ...a);
    out.push(
      b(0, D - t, 0, t, D, H), b(W - t, 0, 0, W, t, H),
      b(t, D - t, 0, W - t, D, t), b(W - t, t, 0, W, D - t, t),
      grille((u, v) => P(u, D, v), t, W - t, t, H - t),
      grille((u, v) => P(W, u, v), t, D - t, t, H - t),
      b(W - t, D - t, 0, W, D, H),
    );
    // la toile
    const N = 40, xs = [...Array(N + 1)].map((_, i) => X0 + (X1 - X0) * i / N), ys = [...Array(N + 1)].map((_, i) => Y1 + (Y0 - Y1) * i / N);
    const hemG = xs.map(x => P(x, Y1, ourletG(x))), hemD = ys.map(y => P(X1, y, ourletD(y)));
    out.push(
      quad(P, [[X0, Y0, Ht], [X1, Y0, Ht], [X1, Y1, Ht], [X0, Y1, Ht]], blanc(h.a.arete)),
      h.chemin([P(X0, Y1, Ht), P(X1, Y1, Ht), ...hemG.slice().reverse()], blanc(h.a.arete), true),
      h.chemin([P(X1, Y1, Ht), P(X1, Y0, Ht), ...hemD.slice().reverse()], blanc(h.a.arete), true),
    );
    // les plis
    const plisG = [[X0 + 0.07, 0.03], [X1 - 0.07, -0.02], [X1 - 0.15, -0.05], [W * 0.5, 0.0]];
    for (const [x, d] of plisG) out.push(h.chemin([P(x, Y1, Ht - 0.06), P(x + d * 0.5, Y1, 0.5), P(x + d, Y1, ourletG(x + d) + 0.015)], h.a.detail));
    const plisD = [[Y1 - 0.07, 0.02], [Y1 - 0.15, 0.04], [Y0 + 0.18, 0.12], [Y0 + 0.3, 0.1]];
    for (const [y, d] of plisD) out.push(h.chemin([P(X1, y + d, Ht - 0.04), P(X1, y + d * 0.4, 0.5), P(X1, y, ourletD(y) + 0.015)], h.a.detail));
    // le pourtour de la toile, au trait fort
    out.push(h.chemin([P(X0, Y0, Ht), P(X1, Y0, Ht), ...hemD.slice().reverse(), ...hemG.slice().reverse(), P(X0, Y1, Ht)], h.a.contour, true));
    // la chaudière et le coin qui y boit
    const ch = chaudiereIso(P, s);
    out.push(ch.svg, coinIso(P, s, ch));
    // le vent, qui arrive sur la face grillagée
    for (const [y, zz] of vents) {
      const [x1, y1] = P(W + 0.8, y, zz), [x2, y2] = P(W + (y < 0.3 ? 0.36 : 0.24), y, zz);
      out.push(h.fleche(`M ${f(x1)} ${f(y1)} L ${f(x2)} ${f(y2)}`));
    }
    // la ramure, par-dessus
    const r = gen(50081), n = 26, kx = z.l * 0.44, ky = haut * 0.52, rx = z.l * 0.42, ry = haut * 0.46;
    const pts = [...Array(n)].map((_, i) => { const a = 2 * Math.PI * i / n + 0.1, j = 0.9 + r() * 0.16; return [kx + rx * j * Math.cos(a), ky + ry * j * Math.sin(a)]; });
    let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 1; i <= n; i++) {
      const p = pts[i % n], q = pts[i - 1], c = Math.hypot(p[0] - q[0], p[1] - q[1]) * (0.58 + r() * 0.1);
      d += ` A ${f(c)} ${f(c)} 0 0 1 ${f(p[0])} ${f(p[1])}`;
    }
    out.push(h.path(d + ' Z', blanc(h.a.arete)));
    for (const [u, v, m] of [[-0.6, 0.1, 3], [-0.2, -0.3, 2], [0.25, 0.05, 3], [0.62, -0.2, 2], [0.05, 0.45, 2], [0.45, 0.5, 2], [-0.45, 0.55, 2]]) {
      const x = kx + rx * u, y = ky + ry * v;
      out.push(h.path(`M ${f(x)} ${f(y)}` + ' a 7 6 0 0 0 12 0'.repeat(m), h.a.detail));
    }
    out.push(h.path(`M ${f(tx)} ${f(ky + ry + 4)} L ${f(tx - 3)} ${f(ky + ry * 0.55)} L ${f(tx - 16)} ${f(ky + ry * 0.1)} M ${f(tx - 3)} ${f(ky + ry * 0.55)} L ${f(tx + 14)} ${f(ky + ry * 0.2)}`, h.a.arete));
    return out.join('\n');
  };

  // ── Vue 3 : en coupe, dans le sens du vent ──────────────────────────────────────────
  const x0m = -0.34, x1m = W + 0.34, z0m = -0.07, z1m = Ht + hb + 0.04;
  const geoC = z => {
    const m = 10, s = Math.min((z.l - 2 * m) / (x1m - x0m), (z.h - 2 * m) / (z1m - z0m));
    const ox = (z.l - (x1m - x0m) * s) / 2 - x0m * s, oy = (z.h - (z1m - z0m) * s) / 2 + z1m * s;
    return { s, Q: (x, zz) => [ox + x * s, oy - zz * s] };
  };
  const canard = (Q, s, xa, xb, zb, miroir) => {
    const L = xb - xa;
    const p = (u, v) => { const q = Q(miroir ? xb - u * L : xa + u * L, zb + v * L); return `${f(q[0])} ${f(q[1])}`; };
    const [hx, hy] = Q(miroir ? xb - 0.87 * L : xa + 0.87 * L, zb + 0.085 * L);
    return [
      h.path(`M ${p(0.64, 0.2)} C ${p(0.74, 0.2)} ${p(0.79, 0.14)} ${p(0.86, 0.125)} L ${p(0.86, 0.045)} C ${p(0.79, 0.05)} ${p(0.74, 0.075)} ${p(0.66, 0.085)} Z`, blanc(h.a.arete)),
      h.path(`M ${p(0, 0.1)} C ${p(0.06, 0.17)} ${p(0.2, 0.26)} ${p(0.38, 0.27)} C ${p(0.52, 0.28)} ${p(0.63, 0.24)} ${p(0.68, 0.17)} C ${p(0.72, 0.11)} ${p(0.7, 0.03)} ${p(0.62, 0.005)} C ${p(0.45, -0.005)} ${p(0.22, 0)} ${p(0.1, 0.02)} C ${p(0.05, 0.04)} ${p(0.02, 0.07)} ${p(0, 0.1)} Z`, blanc(h.a.arete)),
      h.ellipse(hx, hy, 0.052 * L * s, 0.045 * L * s, blanc(h.a.arete)),
      h.path(`M ${p(0.91, 0.1)} C ${p(0.95, 0.1)} ${p(0.99, 0.085)} ${p(1, 0.07)} C ${p(0.99, 0.055)} ${p(0.95, 0.05)} ${p(0.915, 0.06)} Z`, blanc(h.a.arete)),
      h.path(`M ${p(0.18, 0.16)} C ${p(0.3, 0.22)} ${p(0.46, 0.22)} ${p(0.6, 0.14)}`, h.a.detail),
      h.path(`M ${p(0.04, 0.12)} L ${p(0.2, 0.18)} M ${p(0.06, 0.1)} L ${p(0.22, 0.15)}`, h.a.detail),
    ].join('\n');
  };
  const za = 0.68, zb = 0.18;
  const dessinC = z => {
    const { s, Q } = geoC(z);
    const rect = (xa, za_, xb, zb_, a) => { const [x, y] = Q(xa, zb_); return h.rect(f(x), f(y), f((xb - xa) * s), f((zb_ - za_) * s), a); };
    const L = (pts, a) => h.chemin(pts.map(p => Q(...p)), a);
    const out = [
      rect(x0m, z0m, x1m, 0, h.a.hachure('terre', 'aucun')),
      L([[x0m, 0], [x1m, 0]], h.a.contour),
      // au-delà de la coupe : montants, traverses, tasseau et longeron du fond
      rect(0, t, t, H - t, blanc(h.a.arete)), rect(W - t, t, W, H - t, blanc(h.a.arete)),
      rect(t, 0, W - t, t, blanc(h.a.arete)), rect(t, H - t, W - t, H, blanc(h.a.arete)),
      rect(t, zt - 0.035, W - t, zt, blanc(h.a.arete)),
      rect(t + 0.012, zt, W - t - 0.012, zt + 0.03, blanc(h.a.arete)),
    ];
    // les traverses coupées, aux quatre coins
    for (const [x, zz] of [[0, 0], [0, H - t], [W - t, 0], [W - t, H - t]]) out.push(rect(x, zz, x + t, zz + t, h.a.blanc), rect(x, zz, x + t, zz + t, h.a.hachure('bois')));
    // les lattes coupées
    const xa = t + 0.012, xb = W - t - 0.012, n = Math.floor((xb - xa + jour) / (lw + jour));
    const x0 = xa + ((xb - xa) - (n * lw + (n - 1) * jour)) / 2;
    for (let i = 0; i < n; i++) { const a = x0 + i * (lw + jour); out.push(rect(a, zt + 0.03, a + lw, zt + 0.05, h.a.plein)); }
    // le grillage coupé : un point par fil
    for (let zz = t + pas / 2; zz < H - t; zz += pas) for (const x of [-0.008, W + 0.008]) { const [px, py] = Q(x, zz); out.push(h.cercle(f(px), f(py), 0.9, h.a.plein)); }
    // le toit, une planche coupée en long
    out.push(rect(-o, H, W + o, H + tr, h.a.blanc), rect(-o, H, W + o, H + tr, h.a.hachure('bois')));
    // les oiseaux, sur la tablette, loin des parois
    out.push(canard(Q, s, 0.13, 0.54, zt + 0.05, false), canard(Q, s, 0.66, 1.07, zt + 0.05, true));
    // la toile
    const hem = 0.12, zc = H + tr + 0.006;
    out.push(L([[-o - e, hem], [-o - e, zc - 0.02], [-o - e + 0.02, zc], [W + o + e - 0.02, zc], [W + o + e, zc - 0.02], [W + o + e, hem]], h.a.contour));
    // la chaudière coupée, son eau, le coin de toile et le caillou
    const zW = Ht + hb * 0.76, rw = rb + (rt - rb) * 0.76;
    out.push(
      h.chemin([[cx - rb, Ht], [cx + rb, Ht], [cx + rw, zW], [cx - rw, zW]].map(p => Q(...p)), h.a.blanc, true),
      h.chemin([[cx - rb, Ht], [cx + rb, Ht], [cx + rw, zW], [cx - rw, zW]].map(p => Q(...p)), h.a.hachure('eau', 'aucun'), true),
      L([[cx - rw, zW], [cx + rw, zW]], h.a.detail),
      L([[cx - rt, Ht + hb], [cx - rb, Ht], [cx + rb, Ht], [cx + rt, Ht + hb]], h.a.contour),
    );
    const [r0x, r0y] = Q(cx + rt, Ht + hb);
    out.push(h.path(`M ${Q(W * 0.92, zc + 0.012).map(f).join(' ')} C ${Q(cx + rt + 0.14, zc + 0.02).map(f).join(' ')} ${Q(cx + rt + 0.03, Ht + hb - 0.08).map(f).join(' ')} ${Q(cx + rt + 0.014, Ht + hb).map(f).join(' ')} Q ${f(r0x)} ${f(r0y - 7)} ${Q(cx + rt - 0.014, Ht + hb).map(f).join(' ')} L ${Q(cx + rb - 0.014, Ht + 0.014).map(f).join(' ')} L ${Q(cx + 0.02, Ht + 0.014).map(f).join(' ')}`, h.a.contour));
    out.push(h.chemin([[cx - 0.01, Ht + 0.02], [cx + 0.0, Ht + 0.05], [cx + 0.04, Ht + 0.062], [cx + 0.075, Ht + 0.045], [cx + 0.08, Ht + 0.02]].map(p => Q(...p)), blanc(h.a.arete), true));
    // le vent : il traverse la toile et le grillage, dessus et dessous la tablette
    for (const zz of [za, zb]) {
      out.push(h.fleche(`M ${Q(W + 0.33, zz).map(f).join(' ')} L ${Q(W + 0.13, zz).map(f).join(' ')}`));
      out.push(L([[W + 0.1, zz], [-0.1, zz]], h.a.cache));
      out.push(h.fleche(`M ${Q(-0.13, zz).map(f).join(' ')} L ${Q(-0.33, zz).map(f).join(' ')}`));
    }
    return out.join('\n');
  };

  // ── Vue 4 : le coin dans la chaudière ───────────────────────────────────────────────
  const xaD = cx - rt - 0.035, xbD = cx + rt + 0.1, zaD = H - 0.012, zbD = Ht + hb + 0.06;
  const geoD = z => {
    const m = 10, s = Math.min((z.l - 2 * m) / (xbD - xaD), (z.h - 2 * m) / (zbD - zaD));
    const ox = (z.l - (xbD - xaD) * s) / 2 - xaD * s, oy = (z.h - (zbD - zaD) * s) / 2 + zbD * s;
    return { s, Q: (x, zz) => [ox + x * s, oy - zz * s] };
  };
  // La paroi de la chaudière, et le trajet du coin : sur le toit, le long de la paroi, par-dessus
  // le rebord, jusqu'au fond.
  const zT = H + tr + 0.009, zF = zT + 0.006;          // dessus de la toile, fond intérieur
  const paroi = k => [cx + rb + (rt - rb) * k, zT + hb * k];
  const trajet = (ep) => {
    // ep : décalage hors de la paroi (dehors positif dedans), en unités du modèle
    const out = [];
    const dehors = (k, d) => { const [x, zz] = paroi(k); return [x + d, zz]; };
    out.push([xbD, zT + 0.018], [cx + rb + 0.07, zT + 0.018]);
    out.push([cx + rb + 0.035 + ep, zT + 0.03]);
    for (let k = 0.12; k <= 0.96; k += 0.12) out.push(dehors(k, 0.013 + ep));
    const [rx, rz] = paroi(1), R = 0.013 + ep;
    for (let a = 0; a <= Math.PI; a += Math.PI / 10) out.push([rx + R * Math.cos(a), rz + R * Math.sin(a)]);
    for (let k = 0.96; k >= 0.08; k -= 0.12) out.push(dehors(k, -0.013 - ep));
    out.push([cx + rb - 0.02 - ep, zF + 0.012 + ep], [cx - 0.085, zF + 0.012 + ep]);
    return out;
  };
  const dessinD = z => {
    const { s, Q } = geoD(z);
    const L = (pts, a) => h.chemin(pts.map(p => Q(...p)), a);
    const rect = (xa, za_, xb, zb_, a) => { const [x, y] = Q(xa, zb_); return h.rect(f(x), f(y), f((xb - xa) * s), f((zb_ - za_) * s), a); };
    const zW = zT + hb * 0.76, rw = rb + (rt - rb) * 0.76;
    const cav = [[cx - rb, zF], [cx + rb, zF], [cx + rw, zW], [cx - rw, zW]];
    const out = [
      // la planche du toit, coupée en long, et la toile dessus
      rect(xaD, H, xbD, H + tr, h.a.hachure('bois', 'aucun')),
      L([[xaD, H], [xbD, H]], h.a.arete), L([[xaD, H + tr], [xbD, H + tr]], h.a.arete),
      L([[xaD, zT - 0.004], [xbD, zT - 0.004]], h.a.contour),
      // l'eau
      h.chemin(cav.map(p => Q(...p)), h.a.hachure('eau', 'aucun'), true),
      L([[cx - rw, zW], [cx + rw, zW]], h.a.detail),
      // la chaudière
      L([[cx - rt, zT + hb], [cx - rb, zT], [cx + rb, zT], [cx + rt, zT + hb]], h.a.contour),
      // le coin de toile
      L(trajet(0), h.a.contour),
    ];
    // le caillou, posé sur le bout du coin
    const r = gen(5008), k0 = [cx - 0.005, zF + 0.022];
    const cail = [...Array(8)].map((_, i) => { const a = Math.PI * 2 * i / 8, j = 0.85 + r() * 0.25; return [k0[0] + 0.052 * j * Math.cos(a), k0[1] + 0.032 * j * Math.sin(a) + (Math.sin(a) > 0 ? 0.012 : 0)]; });
    out.push(h.chemin(cail.map(p => Q(...p)), blanc(h.a.arete), true));
    out.push(L([[k0[0] - 0.02, k0[1] + 0.03], [k0[0] + 0.005, k0[1] + 0.015], [k0[0] + 0.03, k0[1] + 0.03]], h.a.detail));
    // l'eau qui monte dans la toile et passe le bord
    const tj = trajet(0.035);
    const monte = tj.slice(8, 27).reverse();
    out.push(h.fleche('M ' + monte.map(p => Q(...p).map(f).join(' ')).join(' L ')));
    return out.join('\n');
  };

  return {
    ref: '54-08',
    titre: 'La glacière à évaporation',
    desc: 'Un cadre de bois grillagé sur les quatre côtés, avec une porte grillagée pendue à des lanières de cuir, une tablette à claire-voie glissée sur deux tasseaux et un toit de planches. Monté, il porte une toile de jute jetée par-dessus et une chaudière d’eau sur le toit, où la toile boit par un coin tenu au fond par un caillou. Il se pose à l’ombre, dans le courant d’air ; en coupe, le vent traverse la toile mouillée et passe dessus et dessous la tablette, sans que la toile touche jamais les oiseaux.',
    format: 'pleine',
    disposition: [['cadre', 'monte'], ['coupe', 'coin']],
    hauteurs: [1, 1],
    largeurs: [[1, 1], [3, 2]],
    vues: {
      cadre: {
        titre: 'Le cadre, porte ouverte',
        dessin: dessinA,
        renvois: z => {
          const { P } = geoA(z);
          const q = p => P(...p).map(f);
          return [
            { n: 1, rond: [16, z.h * 0.72], cible: q([W * 0.3, D, H * 0.45]), texte: 'grillage fin sur les quatre côtés' },
            { n: 2, rond: [16, 22], cible: q([W * 0.2, D * 0.4, H + tr]), texte: 'toit de planches, qui porte la chaudière' },
            { n: 3, rond: [z.l - 16, z.h - 18], cible: q([W - t + dx - 0.12, D * 0.6, zt + 0.05]), texte: 'tablette à claire-voie, sur deux tasseaux' },
            { n: 4, rond: [z.l - 16, 22], cible: ptPorte(P)(0.06, H - 0.2).map(f), texte: 'porte grillagée, pendue à des lanières de cuir' },
          ];
        },
      },
      monte: {
        titre: 'Monté, à l’ombre',
        dessin: dessinB,
        renvois: z => {
          const { P } = geoB(z);
          const q = p => P(...p).map(f);
          dessinB(z);
          return [
            { n: 5, rond: [16, z.h - 20], cible: q([W * 0.25, Y1, 0.45]), texte: 'toile de jute ou vieille couverture de coton' },
            { n: 6, rond: [z.l - 16, z.h * 0.3], cible: coinMilieu.map(f), texte: 'la toile boit par un coin' },
            { n: 7, rond: [z.l - 16, z.h - 20], cible: q([W + 0.52, ...vents[1]]), texte: 'à l’ombre, dans le vent, jamais au soleil' },
          ];
        },
      },
      coupe: {
        titre: 'En coupe',
        dessin: dessinC,
        renvois: z => {
          const { Q } = geoC(z);
          const q = (x, zz) => Q(x, zz).map(f);
          return [
            { n: 8, rond: [z.l - 16, Q(0, 0.43)[1]], cible: q(W + o + e, 0.43), texte: 'la toile mouillée ne touche jamais la viande' },
            { n: 9, rond: [Q(-0.23, 0)[0], Q(0, 0.97)[1]], cible: q(-0.23, za), texte: 'le vent passe dessus et dessous la tablette' },
          ];
        },
      },
      coin: {
        titre: 'Le coin dans la chaudière',
        dessin: dessinD,
        renvois: z => {
          const { Q } = geoD(z);
          const q = (x, zz) => Q(x, zz).map(f);
          return [
            { n: 10, rond: [z.l - 16, z.h * 0.55], cible: q(cx + rb + (rt - rb) * 0.3 - 0.013, zT + hb * 0.3), texte: 'le coin plonge jusqu’au fond' },
            { n: 11, rond: [16, Q(0, zF + 0.1)[1]], cible: q(cx - 0.03, zF + 0.03), texte: 'un caillou le tient au fond' },
            { n: 12, rond: [z.l - 16, 18], cible: q(cx + rt + 0.02, zT + hb + 0.05), texte: 'l’eau monte dans la toile, passe le bord' },
          ];
        },
      },
    },
  };
};
