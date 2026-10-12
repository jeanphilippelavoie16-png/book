// Planche 50-40 — La queue et le gras du castor (chapitre 50, étapes 11 et 16).
// Rangée 1 : la queue tenue par sa base au-dessus des braises, la peau écailleuse qui cloque et se
// fend ; puis la même queue posée à plat, une large plaque de peau levée d'un morceau, le gras à nu
// dessous. Rangée 2 : en coupe, le dos dépouillé, la nappe de gras sous-cutané d'un seul tenant, la
// main à plat qui glisse le pouce entre le gras et la viande et la lève sans couteau.
// Aucune cote : la queue ne se construit pas, et le chapitre ne donne ses mesures que comme un
// maximum (« jusqu'à »).
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const motif = (id, at) => at.replace('fill="none"', `fill="url(#${id})"`);
  const NOIR = '#1A1A1A';
  const dOf = (pts, ferme = false) => pts.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ') + (ferme ? ' Z' : '');
  const add = (p, q, k = 1) => [p[0] + q[0] * k, p[1] + q[1] * k];
  const unit = v => { const n = Math.hypot(v[0], v[1]); return [v[0] / n, v[1] / n]; };

  // Catmull-Rom : une courbe lisse par des points (fermée ou ouverte), en polyligne.
  const lisse = (P, ferme = false, n = 8) => {
    const N = P.length, out = [];
    const at = i => ferme ? P[(i + N) % N] : P[Math.max(0, Math.min(N - 1, i))];
    const fin = ferme ? N : N - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(j => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
      }
    }
    if (!ferme) out.push(P[N - 1]);
    return out;
  };

  // ─── Les trames (une par matière) ───
  const defs = `<defs>
<pattern id="p5040-ecaille" width="8" height="4.4" patternUnits="userSpaceOnUse"><path d="M0 2.2 L4 0 L8 2.2 L4 4.4 Z" fill="none" stroke="${NOIR}" stroke-width="0.5"/></pattern>
<pattern id="p5040-ecailleG" width="10" height="5.2" patternUnits="userSpaceOnUse"><path d="M0 2.6 L5 0 L10 2.6 L5 5.2 Z" fill="none" stroke="${NOIR}" stroke-width="0.5"/></pattern>
<pattern id="p5040-gras" width="13" height="11" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1.3" fill="none" stroke="${NOIR}" stroke-width="0.5"/><circle cx="8.5" cy="5" r="0.9" fill="none" stroke="${NOIR}" stroke-width="0.5"/><circle cx="4.5" cy="8.6" r="1.1" fill="none" stroke="${NOIR}" stroke-width="0.5"/><circle cx="11.2" cy="9.6" r="0.7" fill="none" stroke="${NOIR}" stroke-width="0.5"/></pattern>
<pattern id="p5040-viande" width="18" height="4.4" patternUnits="userSpaceOnUse" patternTransform="rotate(-7)"><path d="M0 2.2 L18 2.2" fill="none" stroke="${NOIR}" stroke-width="0.5"/></pattern>
</defs>`;

  // ─── La queue : contour en plan (u le long, v en travers, en mm), mise en oblique ───
  const Lp = 300, W = 180, TE = 20, RR = 23, LR = 72;     // palette, largeur, rive visible, base ronde
  const prof = [[0, 0.13], [0.06, 0.2], [0.15, 0.32], [0.3, 0.43], [0.45, 0.49], [0.6, 0.5], [0.75, 0.46], [0.87, 0.37], [0.95, 0.24]];
  const demi = u => {                                      // demi-largeur à u (interpolée)
    const s = u / Lp;
    if (s <= 0) return prof[0][1] * W;
    for (let i = 1; i < prof.length; i++) if (s <= prof[i][0]) {
      const [s0, a] = prof[i - 1], [s1, b] = prof[i];
      return W * (a + (b - a) * (s - s0) / (s1 - s0));
    }
    return W * prof[prof.length - 1][1] * Math.max(0, (1 - s) / 0.05);
  };
  const planQueue = (() => {
    const pres = prof.map(([s, k]) => [s * Lp, k * W]);
    const loin = prof.slice().reverse().map(([s, k]) => [s * Lp, -k * W]);
    return lisse([[-4, 0], ...pres, [Lp + 2, 0], ...loin], true, 8);
  })();
  const oblique = (ox, oy, S, k = 0.42, c = 0.9) => (u, v, w = 0) => [ox + u * S, oy + v * S * k - w * S * c];

  // La queue en volume : le dessous (qui donne la rive), le dessus (écailles), la base ronde.
  const queue = (P, S, trame) => {
    const dessous = planQueue.map(([u, v]) => P(u, v, 0));
    const dessus = planQueue.map(([u, v]) => P(u, v, TE));
    return {
      dessous, dessus,
      svg: [
        h.path(dOf(dessous, true), blanc(A.contour)),
        h.path(dOf(dessus, true), blanc(A.arete)),
        h.path(dOf(dessus, true), motif(trame, A.fin)),
        h.path(dOf(dessus, true), A.arete),
      ].join('\n'),
    };
  };
  // La base de la queue, ronde et couverte de poil, coupée net au bout (là où elle tenait au corps).
  const base = (P, S) => {
    const c0 = P(-LR, 0, TE / 2), c1 = P(8, 0, TE / 2), r0 = RR * 1.12 * S, r1 = RR * S;
    const n = 14, haut = [], bas = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, x = c0[0] + (c1[0] - c0[0]) * t, r = r0 + (r1 - r0) * t, poil = i % 2 ? 2.2 : 0;
      haut.push([x + (i % 2 ? -1.5 : 0), c0[1] - r - poil]);
      bas.push([x + (i % 2 ? -1.5 : 0), c0[1] + r + poil]);
    }
    const corps = [...haut, ...bas.slice().reverse()];
    const rb = r0 + 1;
    return {
      c0, c1, r: r1,
      svg: [
        h.path(dOf(corps, true), blanc(A.arete)),
        h.ellipse(c0[0], c0[1], rb * 0.34, rb, blanc(A.arete)),
        h.ellipse(c0[0], c0[1], rb * 0.34, rb, motif('p5040-viande', A.fin)),
      ].join(String.fromCharCode(10)),
    };
  };

  // ─── Vue 1 : au-dessus des braises ───
  const vueBraises = z => {
    const S = z.l / 395, ox = 12 + (LR + 10) * S, oy = z.h * 0.56;
    const P = oblique(ox, oy, S);
    return { S, P, ox, oy, sol: z.h - 10 };
  };
  const dessinBraises = z => {
    const { S, P, sol } = vueBraises(z);
    const out = [];
    const q = queue(P, S, 'p5040-ecaille');
    out.push(q.svg);
    // la fente, le long de la queue, un peu en avant du milieu : une déchirure qui laisse voir le gras
    const levre1 = [], levre2 = [];
    for (let u = 0.2 * Lp, i = 0; u <= 0.8 * Lp + 1; u += 0.03 * Lp, i++) {
      const bout = Math.min(1, (u - 0.2 * Lp) / (0.1 * Lp), (0.8 * Lp - u) / (0.1 * Lp));
      const [x, y] = P(u, 0.1 * W, TE);
      levre1.push([x, y - (i % 2 ? 1.8 : -0.6) * bout - 1.6 * bout]);
      levre2.push([x + 1.5, y + (i % 2 ? 0.6 : 2) * bout + 1.8 * bout]);
    }
    const ouverture = [...levre1, ...levre2.slice().reverse()];
    out.push(h.path(dOf(ouverture, true), blanc(A.detail)));
    out.push(h.path(dOf(ouverture, true), motif('p5040-gras', 'fill="none" stroke="none"')));
    out.push(h.path(dOf(ouverture, true), A.detail));
    // les cloques : bulles lisses qui cassent les écailles
    const cloques = [[0.12, -0.22, 6], [0.3, -0.3, 7], [0.5, -0.18, 5.5], [0.66, -0.3, 6.5], [0.8, 0.22, 5], [0.42, 0.3, 6], [0.9, -0.05, 4.5], [0.22, 0.25, 4.5]];
    for (const [s, t, r] of cloques) {
      const [x, y] = P(s * Lp, t * W, TE);
      out.push(h.ellipse(x, y, r * S * 1.6, r * S * 0.9, blanc(A.detail)));
      out.push(h.path(`M${f(x - r * S * 0.8)} ${f(y - r * S * 0.2)} Q${f(x - r * S * 0.2)} ${f(y - r * S * 0.75)} ${f(x + r * S * 0.5)} ${f(y - r * S * 0.55)}`, A.fin));
    }
    // cloques sur la rive, du côté des braises
    for (const s of [0.25, 0.42, 0.58, 0.72]) {
      const [x, y] = P(s * Lp, demi(s * Lp), 0);
      out.push(h.path(`M${f(x - 5)} ${f(y - 1)} Q${f(x)} ${f(y + 6)} ${f(x + 5)} ${f(y - 1)}`, blanc(A.detail)));
    }
    // la base ronde, tenue dans la main par-dessus
    const b = base(P, S);
    const grip = [b.c0[0] + (b.c1[0] - b.c0[0]) * 0.48, b.c0[1]];
    out.push(F.main({ x: grip[0], y: grip[1], pose: 'prise', vue: 'dos', angle: 90, echelle: S * 0.92, diametre: 2 * b.r, bras: 40, objet: b.svg }).toString());
    // les braises : des tisons de bois carbonisé, craquelés en damier, sur un lit de cendre
    const xa = P(0.04 * Lp, 0, 0)[0], xb = P(1.02 * Lp, 0, 0)[0];
    const cendre = [[xa, sol]];
    for (let i = 0; i <= 12; i++) { const x = xa + (xb - xa) * i / 12; cendre.push([x, sol - 7 - 3 * Math.sin(i * 1.3) - (i > 0 && i < 12 ? 3 : -4)]); }
    cendre.push([xb, sol]);
    out.push(h.path(dOf(lisse(cendre.slice(1, -1), false, 6).concat([[xb, sol], [xa, sol]]), true), blanc(A.detail)));
    for (let i = 0; i < 26; i++) { const x = xa + 8 + ((i * 53) % Math.round(xb - xa - 16)), y = sol - 2.5 - ((i * 7) % 5); out.push(h.cercle(x, y, 0.7, A.fin)); }
    // un tison : bûche couchée, vue de biais ; damier de fentes ; un bout rond montre les cernes
    const tison = (x, y, L, R, inc, bout) => {
      const c = Math.cos(inc), sn = Math.sin(inc), T = (u, w) => [x + u * c - w * sn, y + u * sn + w * c];
      const o = [];
      const corps = [T(-2, -R * 0.6), T(1, -R), T(L * 0.4, -R * 1.05), T(L * 0.7, -R * 0.92), T(L, -R), T(L, R), T(L * 0.5, R * 1.04), T(1, R), T(-2, R * 0.5), T(-4, 0)];
      o.push(h.path(dOf(corps, true), blanc(A.arete)));
      const nx = Math.max(3, Math.round(L / 9));
      for (let k = 1; k < 3; k++) { const w = -R + 2 * R * k / 3; o.push(h.path(dOf([T(2, w), T(L - 2, w)]), A.fin)); }
      for (let r = 0; r < 3; r++) for (let i = 1; i < nx; i++) {
        const u = L * (i + (r % 2) * 0.5 + 0.25 * Math.sin(i * 2.3 + r * 1.7 + x)) / nx; if (u > L - 3 || u < 3) continue;
        o.push(h.path(dOf([T(u, -R + 2 * R * r / 3), T(u, -R + 2 * R * (r + 1) / 3)]), A.fin));
      }
      if (bout) {
        o.push(h.ellipse(...T(L, 0), R * 0.7, R * 1.05, blanc(A.arete)));
        o.push(h.ellipse(...T(L, 0), R * 0.4, R * 0.6, A.fin));
        o.push(h.cercle(...T(L, 0), 1, A.fin));
        for (const t of [0.6, 2.2, 3.8, 5.2]) o.push(h.path(dOf([T(L + R * 0.12 * Math.cos(t), R * 0.2 * Math.sin(t)), T(L + R * 0.6 * Math.cos(t), R * 0.95 * Math.sin(t))]), A.fin));
      } else {
        o.push(h.path(dOf([T(L, -R), T(L + 4, -R * 0.3), T(L + 1, R * 0.2), T(L + 5, R * 0.6), T(L, R)]), blanc(A.arete)));
      }
      return o.join('\n');
    };
    const L0 = xb - xa;
    out.push(tison(xa + L0 * 0.08, sol - 22, L0 * 0.36, 7, -0.08, false));
    out.push(tison(xa + L0 * 0.5, sol - 24, L0 * 0.36, 7.5, 0.06, true));
    out.push(tison(xa + L0 * 0.16, sol - 13, L0 * 0.42, 8, 0.03, true));
    out.push(tison(xa + L0 * 0.56, sol - 13, L0 * 0.32, 7, -0.05, false));
    for (const [s, dx] of [[0.3, 0], [0.52, 3], [0.74, -2]]) {
      const x = xa + L0 * s + dx;
      out.push(h.path(dOf([[x - 6, sol - 4], [x - 2, sol - 9], [x + 5, sol - 8], [x + 6, sol - 4]], true), blanc(A.detail)));
      out.push(h.path(dOf([[x - 2, sol - 4], [x, sol - 8]]), A.fin));
    }
    // la chaleur qui monte
    const hautBraises = sol - 44, basQueue = P(0.5 * Lp, demi(0.5 * Lp), 0)[1] + 10;
    for (const s of [0.32, 0.55, 0.78]) {
      const x = P(s * Lp, 0, 0)[0];
      out.push(h.fleche(`M${f(x)} ${f(hautBraises)} C${f(x - 7)} ${f(hautBraises - 12)} ${f(x + 7)} ${f(basQueue + 14)} ${f(x)} ${f(basQueue)}`, A.detail));
    }
    return defs + '\n' + out.join('\n');
  };

  // ─── Vue 2 : la peau pèle, le gras à nu ───
  const u1 = 0.16 * Lp, u2 = 0.9 * Lp, vp = -0.04 * W;       // la plaque : de u1 à u2, du pli au bord
  const PHI = 106 * Math.PI / 180, BPLI = 30;                   // le rabat se relève, plié sur ~30 mm
  const pli = (() => {                                          // le rabat, déplié le long de d
    const pas = 1, T = [[0, 0]];
    let V = 0, Wz = 0;
    for (let s = 0; s < 140; s += pas) {
      const t = Math.min(1, s / BPLI), phi = PHI * (t * t * (3 - 2 * t));
      V += Math.cos(phi) * pas; Wz += Math.sin(phi) * pas; T.push([V, Wz]);
    }
    return d => { const i = Math.max(0, Math.min(T.length - 1, Math.round(d))); return T[i]; };
  })();
  const dechire = (u, d, D) => u + Math.sin(d * 0.19 + u) * 3.2 + (d / D) * (u < Lp / 2 ? 8 : -10);
  const vuePele = z => {
    const S = z.l / 440, ox = 18 + (LR + 10) * S, oy = z.h * 0.66;
    const P = oblique(ox, oy, S);
    const R = (u, d) => { const [V, Wz] = pli(d); return P(u, vp + V, TE + Wz); };
    // le rabat : le pli (d = 0) de u1 à u2, le bord libre (d = D(u)) au retour, bouts déchirés
    const n = 30, pliLigne = [], bord = [], boutG = [], boutD = [];
    for (let i = 0; i <= n; i++) {
      const u = u1 + (u2 - u1) * i / n, D = demi(u) - vp;
      pliLigne.push(R(u, 0)); bord.push(R(u, D));
    }
    for (let j = 0; j <= 10; j++) {
      const Dg = demi(u1) - vp, Dd = demi(u2) - vp;
      boutG.push(R(dechire(u1, Dg * j / 10, Dg), Dg * j / 10));
      boutD.push(R(dechire(u2, Dd * j / 10, Dd), Dd * j / 10));
    }
    const rabat = [...pliLigne, ...boutD, ...bord.slice().reverse(), ...boutG.slice().reverse()];
    // l'empreinte : le gras à nu, là où était la plaque (même bouts déchirés, à plat)
    const E = (u, v) => P(u, v, TE);
    const empreinte = [];
    for (let i = 0; i <= n; i++) empreinte.push(E(u1 + (u2 - u1) * i / n, vp));
    for (let j = 0; j <= 10; j++) { const Dd = demi(u2) - vp; empreinte.push(E(dechire(u2, Dd * j / 10, Dd), vp + Dd * j / 10)); }
    for (let i = n; i >= 0; i--) { const u = u1 + (u2 - u1) * i / n; empreinte.push(E(u, demi(u))); }
    for (let j = 10; j >= 0; j--) { const Dg = demi(u1) - vp; empreinte.push(E(dechire(u1, Dg * j / 10, Dg), vp + Dg * j / 10)); }
    const rive = [];
    for (let i = 0; i <= n; i++) { const u = u1 + (u2 - u1) * i / n; rive.push(P(u, demi(u), TE)); }
    for (let i = n; i >= 0; i--) { const u = u1 + (u2 - u1) * i / n; rive.push(P(u, demi(u), 0)); }
    const um = (u1 + u2) / 2 + 6, prise = R(um, demi(um) - vp - 2);
    return { S, P, R, rabat, pliLigne, bord, empreinte, rive, prise, um };
  };
  const dessinPele = z => {
    const v = vuePele(z), { S, P } = v;
    const out = [];
    // la planche à découper
    // dessus en parallélogramme (le bord loin décalé vers la droite), chant devant
    const sk = 46 * S;
    const pl = [add(P(-LR - 40, -W * 0.72, 0), [sk, 0]), add(P(Lp + 20, -W * 0.72, 0), [sk, 0]), add(P(Lp + 20, W * 0.72, 0), [-sk * 0.2, 0]), add(P(-LR - 40, W * 0.72, 0), [-sk * 0.2, 0])];
    const ep = 12 * S;
    out.push(h.path(dOf([pl[3], pl[2], add(pl[2], [0, ep]), add(pl[3], [0, ep])], true), blanc(A.arete)));
    out.push(h.path(dOf([pl[2], pl[1], add(pl[1], [0, ep]), add(pl[2], [0, ep])], true), blanc(A.arete)));
    out.push(h.path(dOf(pl, true), blanc(A.arete)));
    out.push(h.ligne(pl[3][0] + 40, pl[3][1] - 8, pl[2][0] - 20, pl[2][1] - 8, A.fin));
    out.push(h.ligne(pl[0][0] + 20, pl[0][1] + 8, pl[1][0] - 70, pl[1][1] + 8, A.fin));
    // la queue
    out.push(queue(P, S, 'p5040-ecailleG').svg);
    out.push(base(P, S).svg);
    // le gras à nu : le dessus et la rive, sous la plaque levée
    out.push(h.path(dOf(v.rive, true), blanc(A.arete)));
    out.push(h.path(dOf(v.rive, true), motif('p5040-gras', 'fill="none" stroke="none"')));
    out.push(h.path(dOf(v.empreinte, true), blanc(A.arete)));
    out.push(h.path(dOf(v.empreinte, true), motif('p5040-gras', 'fill="none" stroke="none"')));
    // l'épaisseur de la peau, le long du pli : un liseré
    out.push(h.path(dOf(v.pliLigne.map(p => add(p, [0, 2.2]))), A.fin));
    // la plaque levée, tenue par son bord libre ; on voit son envers, lisse
    const rabat = [
      h.path(dOf(v.rabat, true), blanc(A.arete)),
      h.path(dOf(v.bord.map(p => add(p, [0, 2.4]))), A.fin),
    ].join('\n');
    out.push(rabat);
    // la main pince le bord : pouce dessus (côté vu), index replié dessous, poignet qui monte
    const [px, py] = v.prise, mk = S * 1.25;
    const Q = (dx, dy) => [px + dx * mk, py + dy * mk];
    const P2 = pts => dOf(lisse(pts.map(([a, b]) => Q(a, b)), false, 6));
    // l'index replié sous le bord (derrière la plaque : on voit sa jointure qui dépasse à droite)
    out.push(h.path(P2([[6, 2], [22, 4], [30, -6], [26, -18], [14, -22]]) , blanc(A.arete)));
    // le dos de la main et l'avant-bras qui monte vers la droite
    const dosM = [[-14, 0], [-16, -18], [-6, -34], [14, -44], [34, -58], [50, -84], [58, -110]];
    const venM = [[30, -18], [40, -34], [56, -52], [72, -76], [82, -110]];
    out.push(h.path(dOf([...lisse(dosM.map(([a, b]) => Q(a, b)), false, 6), ...lisse(venM.slice().reverse().map(([a, b]) => Q(a, b)), false, 6), Q(26, -18), Q(14, -22), Q(2, -14)], true), blanc('fill="none" stroke="none"')));
    out.push(h.path(P2(dosM), A.arete));
    out.push(h.path(P2([[26, -18], ...venM]), A.arete));
    // les doigts repliés (majeur, annulaire) : jointures sur le dos
    out.push(h.path(P2([[18, -26], [30, -22], [36, -30], [32, -40]]), A.detail));
    out.push(h.path(P2([[22, -38], [34, -36], [40, -44]]), A.detail));
    // le pouce couché sur le bord, l'ongle au bout, la pulpe contre la peau
    out.push(h.path(dOf([...lisse([[-2, -26], [-12, -14], [-14, -2], [-6, 3], [4, 1], [10, -8], [8, -22]].map(([a, b]) => Q(a, b)), false, 6)], true), blanc(A.arete)));
    out.push(h.path(P2([[-11, -6], [-9, -1], [-4, 0], [-3, -5]]), A.fin));
    // la traction : vers le haut, à côté du poignet
    out.push(h.fleche(`M${f(px - 30 * mk)} ${f(py - 4 * mk)} L${f(px - 30 * mk)} ${f(py - 70 * mk)}`, A.arete));
    return out.join('\n');
  };

  // ─── Vue 3 : la nappe de gras, en coupe sur le dos ───
  // La main à plat (pose « appui », de profil) glisse sur la viande nue, le pouce devant ; la nappe
  // se décolle au bout des doigts et remonte sur le dos de la main. Le profil du dos de la main est
  // relevé sur le rendu de la bibliothèque (à echelle 0,95 : bout des doigts +137, dessus du bout
  // +132/-16, jointures +42/-24, poignet -28/-37, par rapport au milieu de la paume).
  const vueNappe = z => {
    const x0 = 22, x1 = z.l - 22, yb = z.h - 8, xc = (x0 + x1) / 2 + 30, demiL = (x1 - x0) / 2;
    const ym = x => yb - 104 + 22 * Math.pow((x - xc) / demiL, 2);
    const tf = 17, xj = z.l * 0.56;
    const tang = x => Math.atan2(ym(x + 1) - ym(x - 1), 2) * 180 / Math.PI;
    const e = 1.25, xm = xj - 2 - 147 * e, xmil = xm + 45 * e, pente = (ym(xmil + 1) - ym(xmil - 1)) / 2;
    const y0 = ym(xmil) - pente * (xmil - xm), angle = Math.atan(pente) * 180 / Math.PI, th = Math.atan(pente);
    // dos de la main, pris sur la pose « appui / profil » à echelle 1 (bras 60, inclinaison 26)
    const M = ([dx, dy]) => [xm + e * (dx * Math.cos(th) - dy * Math.sin(th)), y0 + e * (dx * Math.sin(th) + dy * Math.cos(th))];
    const dosMain = [[142, -12], [100, -17], [60, -18], [30, -25], [0, -29], [-40, -46], [-70, -60]].map(M);
    const pouce = [xj - 15, ym(xj - 6) - 9];
    return { x0, x1, yb, ym, tf, xj, tang, e, xm, y0, angle, dosMain, pouce, M };
  };
  const dessinNappe = z => {
    const v = vueNappe(z), { x0, x1, yb, ym, tf, xj } = v;
    const out = [];
    const coupe = (x, y0, y1, n = 6) => {                    // trait de coupe, en zigzag
      const pts = [];
      for (let i = 0; i <= n; i++) pts.push([x + (i % 2 ? 4 : -4) * (i && i < n ? 1 : 0), y0 + (y1 - y0) * i / n]);
      return pts;
    };
    // la viande
    const dessus = [];
    for (let x = x0; x <= x1; x += 6) dessus.push([x, ym(x)]);
    const viande = [...dessus, ...coupe(x1, ym(x1), yb).slice(1), [x0, yb], ...coupe(x0, yb, ym(x0)).slice(1, -1)];
    out.push(h.path(dOf(viande, true), blanc(A.arete)));
    out.push(h.path(dOf(viande, true), motif('p5040-viande', 'fill="none" stroke="none"')));
    out.push(h.path(dOf(viande, true), A.arete));
    for (const [xa, xb2, creux] of [[0.12, 0.3, 40], [0.42, 0.6, 52], [0.7, 0.9, 44]]) {
      const pa = x0 + (x1 - x0) * xa, pb = x0 + (x1 - x0) * xb2;
      out.push(h.path(`M${f(pa)} ${f(ym(pa) + 2)} Q${f((pa + pb) / 2)} ${f(ym((pa + pb) / 2) + creux * 1.6)} ${f(pb)} ${f(yb - 2)}`, A.detail));
    }
    // la nappe : d'un seul tenant, collée à la viande à droite, décollée à gauche où elle monte
    // sur le dos de la main ; une seule bande, du bout libre à la coupe. La main passe devant.
    // le rabat déjà levé : de la jointure, il monte vers la gauche et finit dans la main
    const jx = xj + 8, Y = x => ym(x);
    const axe = lisse([
      [xj - 112, Y(xj - 112) - 52], [xj - 70, Y(xj - 70) - 46], [xj - 30, Y(xj - 30) - 38], [xj, Y(xj) - 30],
      [jx + 12, Y(jx + 12) - tf / 2 - 6], [jx + 40, Y(jx + 40) - tf / 2],
      ...Array.from({ length: 12 }, (_, i) => { const x = jx + 60 + (x1 - jx - 60) * (i + 1) / 12; return [x, ym(x) - tf / 2]; }),
    ], false, 6);
    const g = [], d = [];
    axe.forEach((p, i) => {
      const a = axe[Math.max(0, i - 1)], b = axe[Math.min(axe.length - 1, i + 1)];
      const t = unit([b[0] - a[0], b[1] - a[1]]), n = [-t[1], t[0]];
      g.push(add(p, n, tf / 2)); d.push(add(p, n, -tf / 2));
    });
    const bout = [add(g[0], [-3, 1]), add(axe[0], [-6, -1]), add(d[0], [-3, -2])];
    const nappe = [...g, ...coupe(x1, g[g.length - 1][1], d[d.length - 1][1], 2).slice(1, -1), ...d.slice().reverse(), ...bout.slice().reverse()];
    out.push(h.path(dOf(nappe, true), blanc(A.arete)));
    out.push(h.path(dOf(nappe, true), motif('p5040-gras', 'fill="none" stroke="none"')));
    out.push(h.path(dOf(nappe, true), A.arete));
    // la main, vue un peu de dessus : l'avant-bras monte à gauche, les doigts repliés sur le
    // bout du rabat, le pouce tendu à plat sous le rabat, sur la viande, ongle au bout
    const B = (pts, at, ferme = false) => h.path(dOf(lisse(pts, ferme, 6), ferme), at);
    const tipX = xj - 6, tipY = Y(tipX) - 8;
    // le pouce (sous le rabat, posé sur la viande) : du gras de la paume à l'ongle
    const pouce = [[xj - 128, Y(xj - 128) - 30], [xj - 90, Y(xj - 90) - 16], [xj - 40, Y(xj - 40) - 14], [tipX - 4, tipY - 6], [tipX + 4, tipY], [tipX - 2, tipY + 6], [xj - 40, Y(xj - 40) - 1], [xj - 100, Y(xj - 100) - 2], [xj - 140, Y(xj - 140) - 8]];
    out.push(B(pouce, blanc(A.arete), true));
    out.push(B([[tipX - 16, tipY - 5], [tipX - 3, tipY - 5], [tipX + 2, tipY - 1], [tipX - 3, tipY + 1], [tipX - 16, tipY]], blanc(A.detail), true));
    out.push(B([[xj - 62, Y(xj - 62) - 13], [xj - 58, Y(xj - 58) - 6], [xj - 62, Y(xj - 62) - 1]], A.fin));
    // le dos de la main et l'avant-bras, au-dessus du rabat
    const bx = xj - 112, by = Y(bx) - 52;                     // le bout du rabat
    const main = [[bx - 160, 6], [bx - 90, by - 70], [bx - 40, by - 48], [bx + 10, by - 34], [bx + 34, by - 22], [bx + 40, by - 6],
      [bx + 22, by + 14], [bx - 20, by + 30], [bx - 60, by + 34], [bx - 110, by + 4], [bx - 210, by - 40]];
    out.push(B(main, blanc(A.arete)));
    // les doigts repliés : trois jointures, les bouts qui reviennent sur le dessus du rabat
    for (const [dx, dy] of [[24, -22], [30, -8], [26, 6]]) {
      out.push(B([[bx - 6 + dx * 0.3, by + dy - 8], [bx + dx, by + dy - 6], [bx + dx + 10, by + dy + 2], [bx + dx + 2, by + dy + 9]], A.detail));
    }
    out.push(B([[bx - 50, by - 30], [bx - 30, by - 22], [bx - 10, by - 20]], A.fin));
    // la poussée : le pouce avance à plat, vers la nappe encore collée
    const fy = Y(xj) - 100;
    out.push(h.fleche(`M${f(xj - 80)} ${f(fy + 30)} L${f(xj - 10)} ${f(fy + 30)}`, A.arete));

    return out.join(String.fromCharCode(10));
  };

  return {
    ref: '50-40',
    titre: 'La queue et le gras du castor',
    desc: 'En haut à gauche, la queue du castor tenue par sa base au-dessus des braises : sa peau écailleuse cloque et se fend. En haut à droite, la même queue à plat sur une planche : une large plaque de peau se lève d’un morceau, tirée par son bord, et laisse à nu le gras presque pur. En bas, en coupe sur le dos dépouillé, la nappe de gras sous-cutané d’un seul tenant, et la main à plat qui pousse le pouce entre le gras et la viande pour la lever sans couteau.',
    format: 'pleine',
    disposition: [['braises', 'pele'], ['nappe']],
    hauteurs: [1.45, 1],
    largeurs: [[1, 1.3], [1]],
    vues: {
      braises: {
        titre: 'Au-dessus des braises',
        dessin: z => dessinBraises(z),
        renvois: z => {
          const { P, S } = vueBraises(z);
          const b = P(-LR * 0.4, 0, TE / 2);
          return [
            { n: 1, rond: [16, 18], cible: [b[0] - 6, b[1] - RR * S + 2], texte: 'la queue tenue par la base' },
            { n: 2, rond: [z.l - 14, 34], cible: P(0.66 * Lp, -0.3 * W, TE), texte: 'la peau cloque et se fend' },
          ];
        },
      },
      pele: {
        titre: 'La peau pèle',
        dessin: z => dessinPele(z),
        renvois: z => {
          const v = vuePele(z);
          const r = v.R(0.3 * Lp, (demi(0.3 * Lp) - vp) * 0.7);
          const g = v.P(0.66 * Lp, 0.2 * W, TE);
          return [
            { n: 3, rond: [16, 30], cible: r, texte: 'une large plaque, tirée au bord' },
            { n: 4, rond: [z.l - 14, z.h - 16], cible: g, texte: 'dessous, du gras presque pur' },
          ];
        },
      },
      nappe: {
        titre: 'La nappe de gras, sur le dos dépouillé',
        dessin: z => dessinNappe(z),
        renvois: z => {
          const v = vueNappe(z);
          return [
            { n: 5, rond: [z.l - 16, v.ym(z.l - 70) - 42], cible: [z.l - 70, v.ym(z.l - 70) - v.tf / 2], texte: 'la nappe de gras, d’un tenant' },
            { n: 6, rond: [z.l - 16, v.yb - 20], cible: [z.l - 80, v.yb - 36], texte: 'la viande' },
            { n: 7, rond: [v.pouce[0] + 60, v.yb - 20], cible: v.pouce, texte: 'le pouce glissé sous le gras' },
          ];
        },
      },
    },
  };
};
