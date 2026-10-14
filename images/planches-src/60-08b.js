// Planche 60-08b — la fascine sur fond de roche, et la version en pierres (ch. 56, variante
// d'urgence, « Le piège fixe au ruisseau ») : un chevalet de trois perches de profil, les
// chevalets en ligne vus de l'aval, le V de pierres sur la batture, le muret en coupe.
// Aucune cote chiffrée : le chapitre n'en donne aucune pour ces ouvrages.

const f = n => Math.round(n * 10) / 10;
const P = (x, y) => `${f(x)} ${f(y)}`;
const BLANC_A = 'fill="#fff" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"';
const BLANC_D = 'fill="#fff" stroke="#1A1A1A" stroke-width="0.7" stroke-linejoin="round"';
const BLANC_C = 'fill="#fff" stroke="#1A1A1A" stroke-width="2.4" stroke-linejoin="round"';
// la charte : ce qui est derrière (le clayonnage, côté amont, vu de l'aval) en gris loin
const LOIN_D = 'fill="#E6E6E6" stroke="#1A1A1A" stroke-width="0.7" stroke-linejoin="round"';

const lePong = (poly, pas, debut = 0) => {
  const out = [];
  let t0 = debut;
  for (let i = 1; i < poly.length; i++) {
    const [ax, ay] = poly[i - 1], [bx, by] = poly[i];
    const L = Math.hypot(bx - ax, by - ay);
    if (!L) continue;
    const ux = (bx - ax) / L, uy = (by - ay) / L;
    let t = t0;
    while (t <= L + 1e-6) { out.push({ x: ax + ux * t, y: ay + uy * t, nx: -uy, ny: ux }); t += pas; }
    t0 = t - L;
  }
  return out;
};
const arcPts = (cx, cy, R, a1, a2, n) =>
  Array.from({ length: n + 1 }, (_, i) => { const a = a1 + (a2 - a1) * i / n; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; });
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

module.exports = (h) => {
  let graine = 11;
  const rnd = () => (graine = (graine * 9301 + 49297) % 233280) / 233280;

  const poisson = (x, y, lg, a = 0) => {
    const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180);
    const p = (u, v) => `${f(x + u * lg * c - v * lg * s)} ${f(y + u * lg * s + v * lg * c)}`;
    const d = `M ${p(0.5, 0)} Q ${p(0.12, -0.24)} ${p(-0.3, -0.07)} L ${p(-0.5, -0.2)} L ${p(-0.41, 0)} ` +
      `L ${p(-0.5, 0.2)} L ${p(-0.3, 0.07)} Q ${p(0.12, 0.24)} ${p(0.5, 0)} Z`;
    const [ox, oy] = p(0.3, -0.03).split(' ').map(Number);
    return h.path(d, BLANC_A) + '\n' + h.cercle(ox, oy, 1.2, h.a.plein);
  };
  // Une pierre : un bloc aux coins abattus, un peu de travers.
  const caillou = (cx, cy, w, ht, attrs = h.a.hachure('pierre', 'arete')) => {
    const c = Math.min(w, ht) * 0.3, j = () => (rnd() - 0.5) * Math.min(w, ht) * 0.14;
    const pts = [[-w / 2 + c, -ht / 2], [w / 2 - c, -ht / 2], [w / 2, -ht / 2 + c], [w / 2, ht / 2 - c],
      [w / 2 - c, ht / 2], [-w / 2 + c, ht / 2], [-w / 2, ht / 2 - c], [-w / 2, -ht / 2 + c]]
      .map(([x, y]) => [cx + x + j(), cy + y + j()]);
    // un fond blanc d'abord : une pierre cache ce qui est derrière elle
    return h.chemin(pts, h.a.blanc, true) + '\n' + h.chemin(pts, attrs, true);
  };
  // Une perche vue en long, de a vers b, prolongée de e1 et e2 au-delà.
  const perche = (a, b, w, e1 = 0, e2 = 0, attrs = BLANC_A) => {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-u[1] * w / 2, u[0] * w / 2];
    const A = [a[0] - u[0] * e1, a[1] - u[1] * e1], B = [b[0] + u[0] * e2, b[1] + u[1] * e2];
    return h.chemin([[A[0] + n[0], A[1] + n[1]], [B[0] + n[0], B[1] + n[1]], [B[0] - n[0], B[1] - n[1]], [A[0] - n[0], A[1] - n[1]]], attrs, true);
  };
  const vagues = (z, ys) => {
    let d = `M 0 ${f(ys)}`;
    for (let x = 0; x < z.l; x += 16) d += ' q 4 -2.5 8 0 t 8 0';
    return h.path(d, h.a.detail);
  };
  // Les tours d'une ligature autour d'un croisement.
  const ligature = (x, y, l, nb) => {
    const out = [];
    for (let k = 0; k < nb; k++) { const dy = (k - (nb - 1) / 2) * 2.6; out.push(h.ligne(x - l / 2, y + dy - 1.5, x + l / 2, y + dy + 1.5, h.a.arete)); }
    return out.join('\n');
  };

  // ─── Un chevalet, de profil, dans le courant (amont à gauche) ───
  const gChev = z => {
    const ys = 44, yb0 = z.h - 36;
    const yR = x => yb0 + 5 * Math.sin(x / 19) + 3 * Math.sin(x / 7 + 1);
    const x1 = z.l * 0.4;
    const F1 = [x1, yR(x1)], T = [x1 + 30, 22], F3 = [z.l - 20, yR(z.l - 20)];
    const xL = y => F1[0] + (T[0] - F1[0]) * (F1[1] - y) / (F1[1] - T[1]);
    const xS = y => F3[0] + (T[0] - F3[0]) * (F3[1] - y) / (F3[1] - T[1]);
    const xC = y => xL(y) - 18;
    const yp = yb0 - 46;
    const ymid = (ys + yb0) / 2 + 6;
    return { ys, yb0, yR, F1, T, F3, xL, xS, xC, yp, ymid };
  };
  const chevalet = z => {
    const { ys, yb0, yR, F1, T, F3, xL, xS, xC, yp } = gChev(z);
    const out = [];
    out.push(vagues(z, ys));
    const roc = [];
    for (let x = 0; x <= z.l + 0.1; x += 4) roc.push([x, yR(x)]);
    out.push(h.chemin([...roc, [z.l, z.h], [0, z.h]], h.a.hachure('pierre', 'aucun'), true));
    out.push(h.chemin(roc, h.a.arete));
    for (const y of [ys + 34, yb0 - 56]) out.push(h.fleche(`M ${P(6, y)} L ${P(44, y)}`, h.a.detail));
    // le clayonnage, coupé : le montant, puis les brins l'un sur l'autre
    const yTop = ys - 16, xf = xC(yb0), yf = yR(xf) - 1;
    out.push(perche([xC(yf), yf], [xC(yTop), yTop], 4, 0, 4));
    let k = 0;
    for (let y = yf - 3.4; y > yTop; y -= 6.4, k++) out.push(h.cercle(xC(y) + (k % 2 ? 2 : -2), y, 3.2, BLANC_A));
    // pierres au pied du clayonnage
    out.push(caillou(xf - 13, yR(xf - 13) - 6, 16, 12));
    out.push(caillou(xf + 9, yR(xf + 9) - 5, 10, 9));
    // les trois perches : celles de l'amont (l'une cache l'autre), celle de l'aval
    out.push(perche(F1, T, 8, 0, 12, BLANC_C));
    out.push(perche(F3, T, 8, 0, 12, BLANC_C));
    out.push(ligature(T[0] + 1, T[1] + 1, 15, 4));
    // les perches en travers, coupées, contre la face amont
    // mêmes hauteurs que dans la vue de l'aval
    for (const y of [ys + 20, yb0 - 44]) {
      const x = xL(y) - 3.5 - 5.2;
      out.push(h.cercle(x, y, 5.2, BLANC_A));
      out.push(h.cercle(x, y, 2, h.a.detail));
    }
    // le plancher chargé de pierres
    const xa = xL(yp), xb = xS(yp);
    out.push(perche([xa - 2, yp], [xb + 2, yp], 5));
    for (let x = xa + 8; x < xb - 5; x += 7) out.push(h.cercle(x, yp - 5.5, 3, BLANC_A));
    const r1 = yp - 8.5 - 8, r2 = r1 - 15, r3 = r2 - 13;
    for (const [y, ht, dx] of [[r1, 16, 0], [r2, 14, 5], [r3, 12, 9]]) {
      const g = xL(y - ht / 2) + 6, d = xS(y - ht / 2) - 6;
      const nb = Math.max(1, Math.round((d - g) / 20));
      const w = (d - g) / nb;
      for (let i = 0; i < nb; i++) out.push(caillou(g + w * (i + 0.5), y, w - 2, ht));
    }
    // le plancher lié à la patte amont et à la patte aval
    out.push(ligature(xa, yp, 11, 3), ligature(xb, yp, 11, 3));
    return out.join('\n');
  };
  const chevaletRenvois = z => {
    const { yb0, yR, T, xS, xC, yp, ymid } = gChev(z);
    const yst = yp - 16.5;
    return [
      { n: 1, rond: [T[0] + 42, 14], cible: [T[0] + 7, T[1] - 2], texte: 'trois perches liées en tête' },
      { n: 2, rond: [z.l - 12, yp - 58], cible: [xS(yst) - 12, yst - 4], texte: 'plancher chargé de pierres' },
      { n: 3, rond: [xC(ymid) - 30, ymid + 18], cible: [xC(ymid) - 4, ymid + 2], texte: 'clayonnage côté amont' },
      { n: 4, rond: [z.l * 0.16 + 22, z.h - 10], cible: [z.l * 0.16, yR(z.l * 0.16) + 10], texte: 'roche où le pieu n’entre pas' },
    ];
  };

  // ─── Les chevalets en ligne, vus de l'aval ───
  const gLigne = z => {
    const ys = 50, yb0 = z.h - 46;
    const creux = x => 19 * Math.max(0, Math.sin(x / 17 + 0.4)) ** 2 * (0.6 + 0.4 * Math.sin(x / 41));
    const yR = x => yb0 + 1 + creux(x) + 1.2 * Math.sin(x / 6);
    const cs = [z.l * 0.27, z.l * 0.75];
    const ecart = 46, yT = 20;
    const y1 = ys + 20, y2 = yb0 - 44, yp = yb0 - 30;
    const xg = (xc, y) => xc - ecart * (y - yT) / (yb0 - yT);
    const xd = (xc, y) => xc + ecart * (y - yT) / (yb0 - yT);
    return { ys, yb0, creux, yR, cs, ecart, yT, y1, y2, yp, xg, xd };
  };
  const ligne = z => {
    const { ys, yb0, creux, yR, cs, ecart, yT, y1, y2, yp, xg, xd } = gLigne(z);
    const out = [];
    const roc = [];
    for (let x = 0; x <= z.l + 0.1; x += 3) roc.push([x, yR(x)]);
    out.push(h.chemin([...roc, [z.l, z.h], [0, z.h]], h.a.hachure('pierre', 'aucun'), true));
    out.push(h.chemin(roc, h.a.arete));
    // le clayonnage au fond (côté amont) : montants et rangs une dessus une dessous
    const dy = 7, yTop = ys - 14, pw = 2.4;
    const ms = [];
    for (let x = 10; x < z.l; x += 24) ms.push(x);
    for (const x of ms) out.push(h.rect(x - pw, yTop - 5, 2 * pw, yb0 - yTop + 5, LOIN_D));
    const K = Math.floor((yb0 - yTop) / dy);
    for (let k = 0; k < K; k++) {
      const y = yb0 - (k + 1) * dy, y1b = y + 0.6, y2b = y + dy - 0.6;
      out.push(h.rect(0, y1b, z.l, y2b - y1b, LOIN_D));
      ms.forEach((x, i) => {
        if ((i + k) % 2 === 0) return;
        out.push(h.rect(x - pw + 0.7, y1b - 1, 2 * pw - 1.4, y2b - y1b + 2, h.a.loin));
        out.push(h.ligne(x - pw, y1b - 1, x - pw, y2b + 1, h.a.detail), h.ligne(x + pw, y1b - 1, x + pw, y2b + 1, h.a.detail));
      });
    }
    // l'eau, vue par-dessus le clayonnage
    out.push(h.path(`M 0 ${f(ys)}` + ' q 4 -2.5 8 0 t 8 0'.repeat(Math.ceil(z.l / 16)), h.a.detail));
    // les pierres qui ferment les creux sous le rang du fond
    for (let x = 6; x < z.l - 5; x += 10) {
      const c = creux(x);
      if (c < 4.5) continue;
      out.push(caillou(x, yb0 + c / 2 + 0.6, 11, c + 0.6));
    }
    // les perches en travers, d'un chevalet à l'autre
    for (const y of [y1, y2]) out.push(h.rect(0, y - 5, z.l, 10, BLANC_C));
    for (const xc of cs) {
      // les deux perches de l'amont, en A, croisées en tête
      out.push(perche([xc - ecart, yR(xc - ecart)], [xc, yT], 8, 0, 12, BLANC_C));
      out.push(perche([xc + ecart, yR(xc + ecart)], [xc, yT], 8, 0, 12, BLANC_C));
      out.push(ligature(xc, yT + 1, 16, 4));
      for (const y of [y1, y2]) { out.push(ligature(xg(xc, y), y, 11, 3)); out.push(ligature(xd(xc, y), y, 11, 3)); }
      // le plancher et ses pierres
      out.push(perche([xg(xc, yp) - 3, yp], [xd(xc, yp) + 3, yp], 5));
      const r1 = yp - 3 - 8, r2 = r1 - 14;
      for (const [y, ht] of [[r1, 15], [r2, 13]]) {
        const g = xg(xc, y - ht / 2) + 5, d = xd(xc, y - ht / 2) - 5;
        const nb = Math.max(1, Math.round((d - g) / 18)), w = (d - g) / nb;
        for (let i = 0; i < nb; i++) out.push(caillou(g + w * (i + 0.5), y, w - 2, ht));
      }
      out.push(ligature(xg(xc, yp), yp, 11, 3), ligature(xd(xc, yp), yp, 11, 3));
      // la troisième perche, qui vient vers nous
      out.push(perche([xc + 2, yT], [xc + 10, yR(xc + 10) + 3], 9, 6, 0, BLANC_C));
    }
    // la charte : le point à contrôler, le jour sous le pied fermé par les pierres (le creux le
    // plus profond, à l'écart des pieds de perche)
    let xh = 0, best = 0;
    for (let x = 0; x < cs[0] - 30; x++) if (creux(x) > best) { best = creux(x); xh = x; }
    out.push(h.controle(xh, yb0 + best / 2 + 1, 17));
    return out.join('\n');
  };
  const ligneRenvois = z => {
    const { yb0, creux, cs, yT, y1 } = gLigne(z);
    // le creux le plus profond, à l'écart des pieds de perche : le même que le cercle de contrôle
    let xh = 0, best = 0;
    for (let x = 0; x < cs[0] - 30; x++) if (creux(x) > best) { best = creux(x); xh = x; }
    const xm = (cs[0] + cs[1]) / 2;
    return [
      { n: 5, rond: [xm, 14], cible: [xm, y1 - 4], texte: 'perches en travers' },
      { n: 6, rond: [z.l - 12, yb0 - 60], cible: [cs[1] + 8, yb0 - 60], texte: 'la troisième, vers l’aval' },
      { n: 7, rond: [xh + 46, z.h - 10], cible: [xh + 5, yb0 + best / 2 + 1], texte: 'pierres qui ferment le pied' },
    ];
  };

  // ─── En pierres, sur la batture, de dessus ───
  const gBat = z => {
    const yS = x => 16 + 4 * Math.sin(x / 31);
    const yL = x => z.h - 24 + 3 * Math.sin(x / 27);
    const Rc = 25;
    const C = [z.l / 2, yL(z.l / 2) - Rc - 14];
    const de = Math.asin(7 / Rc);
    const E1 = [C[0] + Rc * Math.cos(-Math.PI / 2 - de), C[1] + Rc * Math.sin(-Math.PI / 2 - de)];
    const E2 = [C[0] + Rc * Math.cos(-Math.PI / 2 + de), C[1] + Rc * Math.sin(-Math.PI / 2 + de)];
    const A1 = [z.l * 0.1, 36], A2 = [z.l * 0.9, 36];
    return { yS, yL, Rc, C, de, E1, E2, A1, A2 };
  };
  const batture = z => {
    const { yS, yL, Rc, C, de, E1, E2, A1, A2 } = gBat(z);
    const out = [];
    const rive = [], bas = [];
    for (let x = 0; x <= z.l + 0.1; x += 6) { rive.push([x, yS(x)]); bas.push([x, yL(x)]); }
    out.push(h.chemin([...rive, [z.l, 0], [0, 0]], h.a.hachure('terre', 'aucun'), true));
    out.push(h.chemin(rive, h.a.arete));
    out.push(h.chemin([...bas, [z.l, z.h], [0, z.h]], h.a.hachure('eau', 'aucun'), true));
    out.push(h.chemin(bas, h.a.arete));
    // la mer se retire vers le large
    for (const x of [z.l * 0.1, z.l * 0.9]) out.push(h.fleche(`M ${P(x, 78)} L ${P(x, 120)}`, h.a.detail));
    // le fond d'eau qui reste dans la chambre
    out.push(h.cercle(C[0], C[1], Rc - 6, h.a.hachure('eau', 'aucun')));
    // les murets : deux rangs de pierres décalés
    const muret = (poly, pas, off) => {
      const o = [];
      lePong(poly, pas).forEach((p, i) => { const k = (i % 2 ? 1 : -1) * off; o.push(caillou(p.x + p.nx * k, p.y + p.ny * k, 8.5, 6.5, BLANC_A)); });
      return o.join('\n');
    };
    out.push(muret([A1, E1], 5, 2.6));
    out.push(muret([A2, E2], 5, 2.6));
    out.push(muret(arcPts(C[0], C[1], Rc, -Math.PI / 2 + de, 1.5 * Math.PI - de, 40), 5, 2.6));
    out.push(poisson(C[0] - 4, C[1] + 5, 20, 15));
    out.push(poisson(C[0] + 5, C[1] - 8, 17, 195));
    return out.join('\n');
  };
  const battureRenvois = z => {
    const { C, Rc, A1, E1 } = gBat(z);
    const m = lerp(A1, E1, 0.5);
    return [
      { n: 8, rond: [m[0] - 24, m[1] + 22], cible: [m[0] - 3, m[1] + 4], texte: 'murets bas, montés à sec' },
      { n: 9, rond: [C[0] + Rc + 34, C[1] + 10], cible: [C[0] + Rc * 0.6 + 3, C[1] + Rc * 0.8 + 3], texte: 'la pointe vers le large' },
      { n: 10, rond: [C[0] - Rc - 34, C[1] + 6], cible: [C[0] - 10, C[1] + 4], texte: 'à marée basse, il reste là' },
    ];
  };

  // ─── Le muret de pierres, en coupe ───
  const gMur = z => {
    const yb = z.h - 34, xc = z.l / 2 + 6, k = 1.66;
    const assises = [
      { ht: 28, pierres: [[-48, 44], [0, 48], [47, 42]] },
      { ht: 23, pierres: [[-34, 36], [3, 36], [37, 30]] },
      { ht: 19, pierres: [[-18, 32], [17, 34]] },
      { ht: 15, pierres: [[0, 40]] },
    ].map(a => ({ ht: a.ht * k, pierres: a.pierres.map(([dx, w]) => [dx * k, w * k]) }));
    let y = yb + 3;
    for (const a of assises) { a.y = y - a.ht / 2; y -= a.ht; }
    const yt = y, ys = yt + 14 * k;
    return { yb, xc, k, assises, yt, ys };
  };
  const muret = z => {
    const { yb, xc, k, assises, ys } = gMur(z);
    graine = 5;
    const out = [];
    out.push(vagues(z, ys));
    const sol = [];
    for (let x = 0; x <= z.l + 0.1; x += 4) sol.push([x, yb + 1.2 * Math.sin(x / 11)]);
    out.push(h.chemin([...sol, [z.l, z.h], [0, z.h]], h.a.hachure('gravier', 'aucun'), true));
    out.push(h.chemin(sol, h.a.arete));
    out.push(h.fleche(`M ${P(4, yb - 42)} L ${P(32, yb - 42)}`, h.a.detail));
    // les cales, derrière les joints
    // la charte : les cales, vues derrière les joints, en gris loin
    const LOIN_A = 'fill="#E6E6E6" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"';
    for (const [dx, dy] of [[-25, 26], [24, 25], [-17, 48], [21, 46], [0, 67], [-52, 30], [52, 30]])
      out.push(caillou(xc + dx * k, yb - dy * k, 9 * k, 7 * k, LOIN_A));
    for (const a of assises) for (const [dx, w] of a.pierres) out.push(caillou(xc + dx, a.y, w, a.ht - 1.5));
    return out.join('\n');
  };
  const muretRenvois = z => {
    const { yb, xc, k, assises, yt } = gMur(z);
    return [
      { n: 11, rond: [xc - 84, z.h - 10], cible: [xc - 50 * k, yb - 4], texte: 'grosses pierres au pied' },
      { n: 12, rond: [z.l - 12, assises[1].y - 30], cible: [xc + 21.5 * k, assises[1].y - 2], texte: 'joints croisés, sans mortier' },
      { n: 13, rond: [xc - 90, assises[1].y - 34], cible: [xc - 52 * k - 2, yb - 30 * k - 2], texte: 'cales dans les jours' },
      { n: 14, rond: [xc + 62, yt - 8], cible: [xc + 18, yt + 4], texte: 'la tête sort à la baisse' },
    ];
  };

  return {
    ref: '60-08b',
    titre: 'La fascine sur la roche, et en pierres',
    desc: 'Sur fond de roche, un chevalet de trois perches liées en tête, plancher chargé de pierres, ' +
      'clayonnage tendu sur sa face amont ; les chevalets en ligne vus de l’aval, reliés par des perches, pierres dans les creux sous le pied ; ' +
      'le V de pierres sur la batture, pointe vers le large, le poisson pris dans la chambre à marée basse ; le muret monté à sec, en coupe.',
    format: 'pleine',
    disposition: [['chevalet', 'ligne'], ['batture', 'muret']],
    hauteurs: [3, 2.3],
    largeurs: [[1, 1.5], [1.5, 1]],
    vues: {
      chevalet: { titre: 'Un chevalet, de profil', dessin: chevalet, renvois: chevaletRenvois },
      ligne: { titre: 'Les chevalets en ligne, vus de l’aval', dessin: ligne, renvois: ligneRenvois },
      batture: { titre: 'En pierres, sur la batture', dessin: batture, renvois: battureRenvois },
      muret: { titre: 'Le muret, en coupe', dessin: muret, renvois: muretRenvois },
    },
  };
};
