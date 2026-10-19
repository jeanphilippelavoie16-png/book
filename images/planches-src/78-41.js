// Planche 78-41 — la grille de fond et le lève-pots (ch. 78, §9 « Ce qui se fabrique en une heure » ;
// §9 « Le bain d'eau bouillante, avec ce qui traîne » et §5.3, étapes 11, 12 et 14).
// Cotes : le chapitre n'en donne qu'une, et c'est une mesure de main : l'eau couvre les couvercles
// « d'au moins la hauteur d'une main ». Rien d'autre n'est coté (ni la marmite, ni les anneaux, ni le
// fil, ni les baguettes, « de l'épaisseur d'un doigt »). Les pots sont dessinés aux mesures d'un pot
// Mason de 500 mL, comme à la 78-40.
// Le lève-pots : le chapitre dit « un crochet plié dans du gros fil de fer, qui prend sous le col du
// pot ». Pour qu'un pot plein ne bascule pas, le crochet fait plus d'un demi-tour autour du col : un
// anneau ouvert d'un côté, qu'on glisse de côté sous la bague, le manche qui monte de l'autre côté.
// C'est la forme dessinée ; le chapitre ne la détaille pas plus.
// La pince de deux baguettes entaillées n'est pas dessinée : le chapitre n'en dit pas la forme, et deux
// baguettes droites qui se rejoignent dans la main ne passent pas sous la bague sans des mâchoires
// courbées qu'il faudrait inventer.
// La charte : en coupe, la marmite en tôle mince (aplat noir), l'eau en trait, la paroi d'en face en
// gris loin au-dessus de l'eau. Le rouge : la sortie du pot à la verticale (le geste) ; le dessous
// du pot, posé sur la grille et pas sur le fond (point à contrôler).
module.exports = (h) => {
  const A = h.a;
  const r1 = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const P = pts => pts.map(p => `${r1(p[0])} ${r1(p[1])}`);
  const poly = pts => 'M' + P(pts).join(' L') + ' Z';
  const ligne = pts => 'M' + P(pts).join(' L');

  // ─── Le pot Mason de profil (mm × s) : corps, épaule, col, bague, couvercle ────────────────────
  // y mesuré du fond vers le haut. Rend le contour et la géométrie utile.
  const RB = 38, RN = 31, RBague = 35;
  const pot = (cx, yb, s, { coupeBague = false } = {}) => {
    const Y = yy => yb - yy * s, X = x => cx + x * s;
    const out = [];
    // le verre : corps droit, épaule ronde, col
    const d = `M${r1(X(-RB + 4))} ${r1(Y(0))} Q${r1(X(-RB))} ${r1(Y(0))} ${r1(X(-RB))} ${r1(Y(5))}`
      + ` L${r1(X(-RB))} ${r1(Y(92))} C${r1(X(-RB))} ${r1(Y(101))} ${r1(X(-RN))} ${r1(Y(100))} ${r1(X(-RN))} ${r1(Y(108))}`
      + ` L${r1(X(RN))} ${r1(Y(108))} C${r1(X(RN))} ${r1(Y(100))} ${r1(X(RB))} ${r1(Y(101))} ${r1(X(RB))} ${r1(Y(92))}`
      + ` L${r1(X(RB))} ${r1(Y(5))} Q${r1(X(RB))} ${r1(Y(0))} ${r1(X(RB - 4))} ${r1(Y(0))} Z`;
    out.push(h.path(d, blanc(A.arete)));
    // le col sous la bague : peint en blanc, sinon l'eau se voit entre le verre et la bague
    out.push(h.rect(X(-RN), Y(111), 2 * RN * s, 3 * s, A.blanc));
    out.push(h.ligne(X(-RN), Y(108), X(-RN), Y(111), A.arete), h.ligne(X(RN), Y(108), X(RN), Y(111), A.arete));
    // la bague vissée, et le couvercle plat dessus
    out.push(h.rect(X(-RBague), Y(126), 2 * RBague * s, 15 * s, blanc(A.arete)));
    [114, 118, 122].forEach(yy => out.push(h.ligne(X(-RBague) + 1, Y(yy), X(RBague) - 1, Y(yy), A.fin)));
    out.push(h.rect(X(-RBague + 1), Y(128), 2 * (RBague - 1) * s, 2 * s, blanc(A.detail)));
    return { svg: out.join('\n'), Y, X, yCol: Y(109.5), yHaut: Y(128), yBague: Y(111), yFond: Y(0) };
  };

  // Le pot plein, en polygones (verre, col, bague, couvercle) : ce qui cache l'eau derrière lui.
  const potPleins = (cx, yb, s) => {
    const P = (x, y) => [cx + x * s, yb - y * s];
    const q = (a, b, c, n = 6) => Array.from({ length: n }, (_, i) => { const t = (i + 1) / n, u = 1 - t; return [u * u * a[0] + 2 * u * t * b[0] + t * t * c[0], u * u * a[1] + 2 * u * t * b[1] + t * t * c[1]]; });
    const cu = (a, b, c, d, n = 10) => Array.from({ length: n }, (_, i) => { const t = (i + 1) / n, u = 1 - t; return [u ** 3 * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t ** 3 * d[0], u ** 3 * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t ** 3 * d[1]]; });
    const verre = [P(-RB + 4, 0), ...q(P(-RB + 4, 0), P(-RB, 0), P(-RB, 5)), P(-RB, 92), ...cu(P(-RB, 92), P(-RB, 101), P(-RN, 100), P(-RN, 108)),
      P(RN, 108), ...cu(P(RN, 108), P(RN, 100), P(RB, 101), P(RB, 92)), P(RB, 5), ...q(P(RB, 5), P(RB, 0), P(RB - 4, 0))];
    const rect = (x0, y0, x1, y1) => [P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)];
    return [verre, rect(-RN, 107, RN, 112), rect(-RBague, 111, RBague, 126), rect(-RBague + 1, 126, RBague - 1, 128)];
  };

  // ─── L'eau, sans vaguelette coupée ───────────────────────────────────────────────────────────
  // Le motif « eau » du composeur est une tuile de 64 × 22 : deux rangs de vaguelettes, l'un partant de
  // (4, 7), l'autre de (36, 18), chacune « q4 -2.4 8 0 t8 0 » (16 de long, 2,4 de haut). Posé d'un seul
  // tenant, il en coupe contre ce qui est dans l'eau et contre le fond : une demi-vaguelette se lit comme
  // une faute de dessin. Chaque région d'eau est donc découpée en bandes horizontales d'environ 11 de haut,
  // une par rang de vaguelettes ; chaque bande est remplie du même motif, décalé (translate de son groupe)
  // pour que son rang tombe au milieu de la bande et que chaque vaguelette soit entière, à MARGE au moins de
  // tout trait, ou tout à fait cachée sous un objet plein. Les coutures entre bandes ne se voient pas : la
  // teinte est la même et aucune vaguelette ne les croise. C'est toujours h.a.hachure('eau').
  const eauSansCoupe = (() => {
    const MARGE = 2.5, G = 0.5, BORD = 1, RECOUVRE = 0.5;   // MARGE depuis la géométrie : un trait de 1,4 en mange 0,7
    const base = [];
    for (let i = 0; i <= 8; i++) { const t = i / 8; base.push([8 * t, -4.8 * t * (1 - t)]); }
    for (let i = 1; i <= 8; i++) { const t = i / 8; base.push([8 + 8 * t, 4.8 * t * (1 - t)]); }
    const dedans = (x, y, P) => {
      let c = false;
      for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
        const xi = P[i][0], yi = P[i][1], xj = P[j][0], yj = P[j][1];
        if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
      }
      return c;
    };
    const dSeg = (x, y, [ax, ay], [bx, by]) => {
      const vx = bx - ax, vy = by - ay, L2 = vx * vx + vy * vy;
      const t = L2 ? Math.max(0, Math.min(1, ((x - ax) * vx + (y - ay) * vy) / L2)) : 0;
      return Math.hypot(x - ax - t * vx, y - ay - t * vy);
    };
    const boite = P => { const xs = P.map(p => p[0]), ys = P.map(p => p[1]); return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]; };
    const aretes = P => P.map((p, i) => [p, P[(i + 1) % P.length]]);
    // un polygone convexe coupé par la bande y0 ≤ y ≤ y1
    const couper = (P, y0, y1) => {
      const demi = (Q, garde, yc) => {
        const R = [];
        Q.forEach((a, i) => {
          const b = Q[(i + 1) % Q.length], ga = garde(a[1]), gb = garde(b[1]);
          if (ga) R.push(a);
          if (ga !== gb) { const t = (yc - a[1]) / (b[1] - a[1]); R.push([a[0] + t * (b[0] - a[0]), yc]); }
        });
        return R;
      };
      return demi(demi(P, y => y >= y0, y0), y => y <= y1, y1);
    };
    // un polygone convexe grossi de d de tous les côtés (chaque arête poussée vers le dehors)
    const grossir = (P, d) => {
      const cx = P.reduce((t, p) => t + p[0], 0) / P.length, cy = P.reduce((t, p) => t + p[1], 0) / P.length;
      const Q = P.filter((p, i) => Math.hypot(p[0] - P[(i + 1) % P.length][0], p[1] - P[(i + 1) % P.length][1]) > 1e-6);
      const lignes = Q.map((a, i) => {
        const b = Q[(i + 1) % Q.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
        let nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L;
        if ((a[0] - cx) * nx + (a[1] - cy) * ny < 0) { nx = -nx; ny = -ny; }
        return [a[0] + nx * d, a[1] + ny * d, b[0] - a[0], b[1] - a[1]];
      });
      return lignes.map((l, i) => {
        const m = lignes[(i + lignes.length - 1) % lignes.length];
        const det = m[2] * l[3] - m[3] * l[2];
        if (Math.abs(det) < 1e-9) return [l[0], l[1]];
        const t = ((l[0] - m[0]) * l[3] - (l[1] - m[1]) * l[2]) / det;
        return [m[0] + t * m[2], m[1] + t * m[3]];
      });
    };
    // regions : polygones d'eau convexes ; pleins : polygones peints par-dessus l'eau (ils la cachent) ;
    // traits : [a, b, demi-largeur], tracés par-dessus l'eau (ils ne la cachent pas, une vaguelette ne les touche pas)
    return (regions, pleins, traits) => {
      const tout = boite(regions.flat());
      const X0 = tout[0] - 24, Y0 = tout[1] - 24, nx = Math.ceil((tout[2] + 24 - X0) / G) + 1, ny = Math.ceil((tout[3] + 24 - Y0) / G) + 1;
      // la grille de ce qui est par-dessus l'eau : 1 caché sous un plein, 2 trop près d'un trait, 0 libre
      const etat = new Uint8Array(nx * ny);
      const tamponner = ([ax, ay], [cx, cy], r) => {
        const n = Math.max(1, Math.ceil(Math.hypot(cx - ax, cy - ay) / (G / 2))), ri = Math.ceil(r / G) + 1;
        for (let k = 0; k <= n; k++) {
          const x = ax + (cx - ax) * k / n, y = ay + (cy - ay) * k / n;
          const ci = Math.round((x - X0) / G), cj = Math.round((y - Y0) / G);
          for (let dj = -ri; dj <= ri; dj++) for (let di = -ri; di <= ri; di++) {
            const i = ci + di, j = cj + dj;
            if (i < 0 || j < 0 || i >= nx || j >= ny) continue;
            if ((X0 + i * G - x) ** 2 + (Y0 + j * G - y) ** 2 <= r * r) etat[j * nx + i] = 2;
          }
        }
      };
      pleins.forEach(P => aretes(P).forEach(([a, b]) => tamponner(a, b, MARGE)));
      traits.forEach(([a, b, d]) => tamponner(a, b, MARGE + d));
      pleins.forEach(P => {
        const [x0, y0, x1, y1] = boite(P);
        for (let j = Math.max(0, Math.floor((y0 - Y0) / G)); j <= Math.min(ny - 1, Math.ceil((y1 - Y0) / G)); j++)
          for (let i = Math.max(0, Math.floor((x0 - X0) / G)); i <= Math.min(nx - 1, Math.ceil((x1 - X0) / G)); i++)
            if (dedans(X0 + i * G, Y0 + j * G, P)) etat[j * nx + i] = 1;
      });
      const lire = (x, y) => {
        const i = Math.round((x - X0) / G), j = Math.round((y - Y0) / G);
        return i < 0 || j < 0 || i >= nx || j >= ny ? 0 : etat[j * nx + i];
      };
      const sorties = [];
      let total = 0;
      // le quinconce du motif d'origine : d'un rang au suivant, les vaguelettes se décalent d'une demi-tuile (32).
      // La première bande d'une région prend le pas qui y garde le plus de vaguelettes entières ; chaque bande
      // suivante, parmi les pas qui gardent les siennes entières, celui qui est le plus près du quinconce. Dans un
      // vide étroit, ça laisse un rang sur deux sans vaguelette, comme dans le motif.
      regions.forEach(R => {
        const [, ya, , yb] = boite(R);
        const nb = Math.max(1, Math.round((yb - ya) / 11)), hb = (yb - ya) / nb;
        let avant = null;
        for (let k = 0; k < nb; k++) {
          const y0 = ya + k * hb, y1 = y0 + hb, B = couper(R, y0, y1);
          if (B.length < 3) continue;
          const Ar = aretes(B), [bx0, , bx1] = boite(B);
          // une vaguelette : 1 entière et dégagée, 0 cachée ou hors de la bande, -1 coupée ou qui touche
          const juger = (ox, oy) => {
            let vu = 0, cache = 0;
            for (const [px, py] of base) {
              const x = ox + px, y = oy + py;
              const e = lire(x, y);
              if (e === 1) { cache++; continue; }
              if (Ar.some(([a, b]) => dSeg(x, y, a, b) < BORD)) return -1;
              if (!dedans(x, y, B)) { cache++; continue; }
              if (e === 2) return -1;
              vu++;
            }
            return vu && cache ? -1 : (vu ? 1 : 0);
          };
          let mieux = null;
          const ecart = dx => { if (avant === null) return 0; const d = Math.abs(((dx - avant - 32) % 64 + 64) % 64); return Math.min(d, 64 - d); };
          // le rang au milieu de la bande, ou un peu plus haut ou plus bas : il y reste à MARGE des bords,
          // et les rangs voisins (à 11 au-dessus et au-dessous) restent dehors
          const jeu = Math.min(hb / 2 - 1.2 - MARGE, 9 - hb / 2);
          const decalages = [0, 0.75, -0.75, 1.5, -1.5, 2.25, -2.25].filter(o => Math.abs(o) <= jeu + 1e-9);
          for (const o of decalages) {
            const dy = Math.round((((y0 + y1) / 2 + o - 7) % 22 + 22) % 22 * 10) / 10;
            for (let dx = 0; dx < 64; dx += 0.5) {
              let ok = true, n = 0;
              for (let b = Math.floor((y0 - 30 - dy) / 22); ok && 22 * b + dy < y1 + 8; b++)
                for (let a = Math.floor((bx0 - 70 - dx) / 64); ok && 64 * a + dx < bx1 + 8; a++)
                  for (const [vx, vy] of [[4, 7], [36, 18]]) {
                    const r = juger(64 * a + dx + vx, 22 * b + dy + vy);
                    if (r < 0) { ok = false; break; }
                    n += r;
                  }
              if (ok && (!mieux || ecart(dx) < mieux.e || (ecart(dx) === mieux.e && n > mieux.n))) mieux = { dx, dy, n, e: ecart(dx) };
            }
          }
          if (!mieux) throw new Error(`eau : aucun pas du motif ne garde les vaguelettes entières dans la bande ${boite(B).map(v => Math.round(v)).join(', ')}`);
          total += mieux.n;
          avant = mieux.dx;
          // la bande peinte déborde de RECOUVRE de tous les côtés : deux aplats bord à bord laissent un fil clair à
          // l'anticrénelage ; aucune vaguelette n'est à moins de BORD d'un bord de bande, le recouvrement n'en montre
          // pas, et dehors il passe sous les parois et sous le trait de la surface
          const dec = grossir(B, RECOUVRE).map(p => [p[0] - mieux.dx, p[1] - mieux.dy]);
          sorties.push(`<g transform="translate(${mieux.dx} ${mieux.dy})">${h.chemin(dec, h.a.hachure('eau', 'aucun'), true)}</g>`);
        }
      });
      return { svg: sorties.join('\n'), vaguelettes: total };
    };
  })();

  // ─── Vue 1 : la marmite en coupe ─────────────────────────────────────────────────────────────
  // Trois pots, un vide entre eux et contre la paroi (dessiné, pas coté : le chapitre dit « sans qu'ils se
  // touchent »). Le vide est assez large pour qu'une vaguelette d'eau y tienne entière.
  const M = z => {
    const jeu = 36, n = 3;
    const Rmm = (n * 2 * RB + (n + 1) * jeu) / 2;      // rayon intérieur de la marmite, en mm
    const Hmm = 9 + 128 + 95 + 34;                      // grille, pot, une main d'eau, revanche
    const s = Math.min((z.h - 30) / Hmm, (z.l - 220) / (2 * Rmm));
    const cx = z.l / 2 - 30, yb = z.h - 4, e = 3;
    const R = Rmm * s + e, yT = yb - Hmm * s;
    const yG = yb - e - 9 * s, yCouv = yG - 128 * s, yE = yCouv - 95 * s;
    const xs = Array.from({ length: n }, (_, i) => cx - Rmm * s + (jeu + RB + i * (2 * RB + jeu)) * s);
    return { jeu, n, s, cx, yb, e, R, yT, yG, yCouv, yE, xs };
  };
  // Les renvois de la coupe, calculés sur la géométrie seule : la recherche du pas de l'eau en a besoin
  // (une vaguelette ne touche pas une ligne de rappel).
  const renvoisCoupe = (m, rA, yC) => {
    const xg = m.cx - m.R - 30;
    const xBordPot = m.xs[0] - m.s * RB;
    return [
      // le point sur le bord gauche du cercle rouge : le dessous du pot posé sur la grille (règle 11)
      { n: 1, rond: [xg, m.yG + 2], cible: [m.xs[0] - Math.sqrt(11 * 11 - 9), m.yG + 3], texte: 'grille au fond : l’eau passe dessous' },
      { n: 2, rond: [xg, (m.yG + m.yCouv) / 2], cible: [xBordPot - 1, (m.yG + m.yCouv) / 2], texte: 'pots qui ne se touchent pas' },
      { n: 3, rond: [xg, yC - 8], cible: [m.cx - m.R - 5, yC + 1], texte: 'marmite couverte' },
    ];
  };
  const marmite = (z, { eau = false } = {}) => {
    const m = M(z), out = [];
    const { s, cx, yb, e, R, yT, yG, yCouv, yE, xs } = m;
    const rA = 34 * s, yC = yT - 3;
    const pots0 = xs.map(x => pot(x, yG, s));
    // la paroi d'en face, au-dessus de l'eau, en gris loin
    out.push(h.rect(cx - R + e, yT, 2 * (R - e), yE - yT, A.loin));
    // l'eau, du fond jusqu'au niveau : elle passe sous les pots, entre les anneaux. Cinq morceaux : la nappe
    // au-dessus des couvercles, et une colonne par vide (d'une paroi ou du milieu d'un pot au milieu du suivant).
    const grille = xs.flatMap(x => [-1, 1].map(sg => [x + sg * rA - 2 * s, yG, 4 * s, 9 * s]));
    if (eau) {
      const x0 = cx - R + e, x1 = cx + R - e, yF = yb - e;
      const rect = (a, b, c, d) => [[a, b], [c, b], [c, d], [a, d]];
      out.push(h.rect(x0, yE, x1 - x0, yF - yE, A.blanc));
      const morceaux = [rect(x0, yE, x1, yCouv), rect(x0, yCouv, xs[0], yF), rect(xs[0], yCouv, xs[1], yF), rect(xs[1], yCouv, xs[2], yF), rect(xs[2], yCouv, x1, yF)];
      const pleins = [
        ...xs.flatMap(x => potPleins(x, yG, s)),
        ...grille.map(([gx, gy, gl, gh]) => rect(gx, gy, gx + gl, gy + gh)),
        [[cx - R, yT], [cx - R, yb], [cx + R, yb], [cx + R, yT], [cx + R - e, yT], [cx + R - e, yb - e], [cx - R + e, yb - e], [cx - R + e, yT]],
      ];
      const cercle = [];
      for (let i = 0; i < 36; i++) cercle.push([[xs[0] + 11 * Math.cos(i * Math.PI / 18), yG + 11 * Math.sin(i * Math.PI / 18)], [xs[0] + 11 * Math.cos((i + 1) * Math.PI / 18), yG + 11 * Math.sin((i + 1) * Math.PI / 18)], 0.8]);
      const traits = [
        [[x0, yE], [x1, yE], 0.7],
        [[pots0[m.n - 1].X(RBague) + 2, yCouv], [x1, yCouv], 0.25],
        ...cercle,
        ...renvoisCoupe(m, rA, yC).map(r => [r.rond, r.cible, 1.5]),
      ];
      out.push(eauSansCoupe(morceaux, pleins, traits).svg);
    }
    out.push(h.ligne(cx - R + e, yE, cx + R - e, yE, A.arete));
    // la grille d'anneaux, coupée : chaque anneau donne deux petites sections
    grille.forEach(([gx, gy, gl, gh]) => out.push(h.rect(gx, gy, gl, gh, A.plein)));
    // les pots, posés sur la grille, sans se toucher
    const pots = pots0.map(p => { out.push(p.svg); return p; });
    // la marmite : tôle mince coupée, couvercle posé
    out.push(h.path(poly([[cx - R, yT], [cx - R, yb], [cx + R, yb], [cx + R, yT], [cx + R - e, yT], [cx + R - e, yb - e], [cx - R + e, yb - e], [cx - R + e, yT]]), A.plein));
    out.push(h.path(`M${r1(cx - R - 6)} ${r1(yT)} L${r1(cx - R - 6)} ${r1(yC)} Q${r1(cx)} ${r1(yC - 14)} ${r1(cx + R + 6)} ${r1(yC)} L${r1(cx + R + 6)} ${r1(yT)} Z`, blanc(A.contour)));
    out.push(h.path(`M${r1(cx - 12)} ${r1(yC - 10)} q0 -8 12 -8 q12 0 12 8`, A.arete));
    // la cote : une main d'eau au-dessus des couvercles, tirée hors de la marmite, à droite
    const xq = cx + R + 22;
    out.push(h.ligne(pots[m.n - 1].X(RBague) + 2, yCouv, cx + R - e - 1, yCouv, A.fin), h.ligne(cx + R + 1, yCouv, xq + 6, yCouv, A.fin));
    out.push(h.ligne(cx + R + 1, yE, xq + 6, yE, A.fin));
    out.push(h.cote(xq, yE, xq, yCouv, 'une main au moins', { cote: 'droite' }));
    // le point à contrôler : le fond du pot sur la grille, pas sur la tôle
    out.push(h.controle(xs[0], yG, 11));
    return { svg: out.join('\n'), m, pots, rA, yC };
  };
  const marmiteRenvois = z => {
    const r = marmite(z);
    return renvoisCoupe(r.m, r.rA, r.yC);
  };

  // ─── Vue 2 : la grille d'anneaux, vue de dessus ──────────────────────────────────────────────
  const anneaux = z => {
    const out = [];
    const cx = z.l * 0.42, cy = z.h / 2;
    const Rm = Math.min(z.l / 2 - 10, z.h / 2 - 4);    // la marmite, vue de dessus
    const ra = Rm * 0.205, ri = ra * 0.82;              // un anneau : bord extérieur et intérieur
    out.push(h.cercle(cx, cy, Rm, A.contour), h.cercle(cx, cy, Rm - 3, A.detail));
    // anneaux en nid d'abeilles, qui se touchent
    const pas = 2 * ra, centres = [];
    for (let j = -4; j <= 4; j++) for (let i = -5; i <= 5; i++) {
      const x = cx + i * pas + (Math.abs(j) % 2 ? pas / 2 : 0), y = cy + j * pas * Math.sqrt(3) / 2;
      if (Math.hypot(x - cx, y - cy) + ra < Rm - 3) centres.push([x, y]);
    }
    centres.forEach(([x, y]) => out.push(h.cercle(x, y, ra, blanc(A.arete)), h.cercle(x, y, ri, A.detail)));
    // le fil de fer : à chaque point de contact entre deux anneaux, une ligature de trois tours de fil fin
    // passés par-dessus les deux bords, comme celles de la claie ; les vides restent blancs
    const liens = [];
    centres.forEach((a, i) => centres.forEach((b, j) => {
      if (j <= i) return;
      if (Math.abs(Math.hypot(a[0] - b[0], a[1] - b[1]) - pas) < 1) liens.push([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, Math.atan2(b[1] - a[1], b[0] - a[0])]);
    }));
    liens.forEach(([x, y, t]) => {
      // u : d'un centre à l'autre, à travers le contact ; n : le long des deux bords qui se touchent
      const ux = Math.cos(t), uy = Math.sin(t), nx = -uy, ny = ux, L = ra - ri + 1.6;
      [-1.6, 0, 1.6].forEach(o => {
        const cx0 = x + nx * o, cy0 = y + ny * o;
        out.push(h.path(`M${r1(cx0 - ux * L - nx * 0.8)} ${r1(cy0 - uy * L - ny * 0.8)} L${r1(cx0 + ux * L + nx * 0.8)} ${r1(cy0 + uy * L + ny * 0.8)}`, A.detail));
      });
    });
    return { svg: out.join('\n'), cx, cy, Rm, ra, centres, liens };
  };
  const anneauxRenvois = z => {
    const a = anneaux(z);
    const l = a.liens.reduce((m, q) => (q[0] - q[1] > m[0] - m[1] ? q : m));
    return [
      { n: 4, rond: [z.l - 14, 16], cible: [l[0] + 2, l[1] - 2], texte: 'anneaux de pots liés au fil de fer' },
    ];
  };

  // ─── Vue 3 : la claie de baguettes ───────────────────────────────────────────────────────────
  const claie = z => {
    const out = [];
    const cx = z.l * 0.42, cy = z.h / 2;
    const Rm = Math.min(z.l / 2 - 10, z.h / 2 - 4);
    out.push(h.cercle(cx, cy, Rm, A.contour), h.cercle(cx, cy, Rm - 3, A.detail));
    const d = 6, pos = [-0.54, -0.18, 0.18, 0.54].map(t => t * Rm);
    const L = t => Math.sqrt(Math.max(0, (Rm - 7) ** 2 - t * t));     // demi-longueur dans le cercle
    // le rang du dessous : baguettes verticales, coupées par celles du dessus
    pos.forEach(t => {
      const l = L(t) - 1, x = cx + t;
      const ys = [cy - l, ...pos.flatMap(u => [cy + u - d / 2 - 1.5, cy + u + d / 2 + 1.5]), cy + l];
      for (let k = 0; k < ys.length; k += 2) {
        if (ys[k + 1] - ys[k] < 1) continue;
        const bout0 = k === 0, bout1 = k === ys.length - 2;
        out.push(h.path(`M${r1(x - d / 2)} ${r1(ys[k])} L${r1(x - d / 2)} ${r1(ys[k + 1])} M${r1(x + d / 2)} ${r1(ys[k])} L${r1(x + d / 2)} ${r1(ys[k + 1])}`, A.arete));
        if (bout0) out.push(h.path(`M${r1(x - d / 2)} ${r1(ys[k])} Q${r1(x)} ${r1(ys[k] - 3)} ${r1(x + d / 2)} ${r1(ys[k])}`, A.arete));
        if (bout1) out.push(h.path(`M${r1(x - d / 2)} ${r1(ys[k + 1])} Q${r1(x)} ${r1(ys[k + 1] + 3)} ${r1(x + d / 2)} ${r1(ys[k + 1])}`, A.arete));
      }
    });
    // le rang du dessus : horizontales, entières
    pos.forEach(t => {
      const l = L(t) - 1, y = cy + t;
      out.push(h.path(`M${r1(cx - l)} ${r1(y - d / 2)} L${r1(cx + l)} ${r1(y - d / 2)} Q${r1(cx + l + 3)} ${r1(y)} ${r1(cx + l)} ${r1(y + d / 2)} L${r1(cx - l)} ${r1(y + d / 2)} Q${r1(cx - l - 3)} ${r1(y)} ${r1(cx - l)} ${r1(y - d / 2)} Z`, blanc(A.arete)));
    });
    // une ligature à chaque croisement : trois tours en biais par-dessus
    pos.forEach(a => pos.forEach(b => {
      const x = cx + a, y = cy + b;
      [-2, 0, 2].forEach(o => out.push(h.path(`M${r1(x - d / 2 - 1 + o)} ${r1(y - d / 2 - 1)} L${r1(x + d / 2 + 1 + o)} ${r1(y + d / 2 + 1)}`, A.detail)));
    }));
    return { svg: out.join('\n'), cx, cy, pos, Rm, d };
  };
  const claieRenvois = z => {
    const c = claie(z);
    return [
      { n: 5, rond: [z.l - 14, 16], cible: [c.cx + c.pos[3] + c.d / 2 + 2, c.cy + c.pos[0] - c.d / 2 - 2], texte: 'au lieu de 4 : baguettes croisées, ligaturées' },
    ];
  };

  // ─── Vue 4 : le lève-pots de fil de fer ──────────────────────────────────────────────────────
  // De côté : le pot, l'anneau du crochet sous la bague, le manche qui monte et finit en boucle pour
  // la main. À droite : l'anneau vu de dessus autour du col, ouvert d'un côté.
  const leve = z => {
    const out = [];
    const s = Math.min((z.h - 84) / 128, (z.l - 40) / 90);
    const cx = z.l * 0.46, yb = z.h - 6;
    const p = pot(cx, yb, s);
    out.push(p.svg);
    const fil = 4;                                     // le gros fil de fer, dessiné
    const ry = 8, rx = (RN + 3) * s, yA = p.yCol + 1;
    // l'arrière de l'anneau, caché par le col
    out.push(h.path(`M${r1(cx - rx)} ${r1(yA)} A${r1(rx)} ${ry} 0 0 1 ${r1(cx + rx)} ${r1(yA)}`, A.cache));
    // le manche, de la gauche de l'anneau jusqu'à la boucle du haut, et le devant de l'anneau
    const xm = cx - rx, yM = 18;
    const t1 = 0.3 * Math.PI;                           // l'ouverture, à droite, vers l'avant
    const avant = [];
    for (let i = 0; i <= 16; i++) { const t = Math.PI - (Math.PI - t1) * i / 16; avant.push([cx + rx * Math.cos(t), yA + ry * Math.sin(t)]); }
    const brin = [[xm + 22, yM + 20], [xm + 26, yM + 8], [xm + 14, yM], [xm, yM + 8], [xm - 3, yM + 26], [xm - 3, yA - 30], [xm - 2, yA - 10], ...avant];
    out.push(h.formes.corde(brin, { ep: fil, debut: 'coupe', fin: 'coupe', trait: 'arete' }));
    // le geste : sortir le pot à la verticale
    out.push(h.geste(`M${r1(cx + rx + 30)} ${r1(p.yBague + 40)} L${r1(cx + rx + 30)} ${r1(p.yBague - 34)}`));

    return { svg: out.join('\n'), p, cx, rx, yA, xm, yM, s, xF: cx + rx + 30 };
  };
  const leveDessus = z => {
    const out = [], fil = 4;
    // l'anneau vu de dessus, autour du col
    const ox = z.l * 0.5, oy = z.h * 0.42, Rc = 40, Ra = Rc + 6;
    out.push(h.cercle(ox, oy, Rc + 7, A.cache));       // la bague, plus large, au-dessus (cachée)
    out.push(h.cercle(ox, oy, Rc, blanc(A.arete)));    // le col
    const a0 = Math.PI * 0.28;                           // demi-ouverture, vers la droite
    const arc = [];
    for (let i = 0; i <= 40; i++) { const t = a0 + (2 * Math.PI - 2 * a0) * i / 40; arc.push([ox + Ra * Math.cos(t), oy + Ra * Math.sin(t)]); }
    out.push(h.formes.corde(arc, { ep: fil, debut: 'coupe', fin: 'coupe', trait: 'arete' }));
    out.push(h.cercle(ox - Ra, oy, fil / 2 + 0.8, A.plein));   // le manche qui monte, vu par le bout
    return { svg: out.join('\n'), ox, oy, Ra, Rc };
  };
  const leveRenvois = z => {
    const l = leve(z);
    return [
      { n: 6, rond: [l.xm + 58, l.yM + 6], cible: [l.xm + 28, l.yM + 12], texte: 'gros fil de fer plié' },
      { n: 7, rond: [l.cx - l.rx - 30, l.yA + 34], cible: [l.cx - l.rx * 0.45, l.yA + 6], texte: 'l’anneau prend sous le col' },
      // la flèche rouge a son repère (règle 11) : le geste, après l'anneau vu de dessus
      { n: 9, rond: [l.xF + 30, l.p.yBague + 12], cible: [l.xF + 2, l.p.yBague + 12], texte: 'sortir le pot à la verticale' },
    ];
  };
  const leveDessusRenvois = z => {
    const l = leveDessus(z);
    return [
      { n: 8, rond: [l.ox, l.oy + l.Ra + 34], cible: [l.ox, l.oy + l.Ra + 3], texte: 'ouvert d’un côté, plus d’un demi-tour' },
    ];
  };

  return {
    ref: '78-41',
    titre: 'La grille de fond et le lève-pots',
    desc: 'En coupe, une marmite de bain d’eau bouillante : au fond, une grille d’anneaux de pots ; les pots posés dessus sans se toucher ; l’eau passe sous les pots '
      + 'et couvre les couvercles d’au moins une hauteur de main ; la marmite est couverte. À côté, la grille vue de dessus : des anneaux de pots en nid d’abeilles, '
      + 'liés au fil de fer à chaque contact ; puis l’autre grille : des baguettes croisées sur deux rangs, ligaturées à chaque croisement. '
      + 'En bas, le lève-pots plié dans du gros fil de fer : un anneau ouvert d’un côté, glissé sous la bague du pot, et un manche qui finit en crochet pour la main ; on sort le pot à la verticale. '
      + 'À côté, l’anneau vu de dessus autour du col : il en fait plus d’un demi-tour.',
    format: 'pleine',
    disposition: [['marmite'], ['anneaux', 'claie'], ['leve', 'leveDessus']],
    hauteurs: [1.1, 0.75, 1.25],
    largeurs: [[1], [1, 1], [1, 1]],   // les deux colonnes alignées d'une rangée à l'autre
    vues: {
      marmite: { titre: 'Le bain, en coupe', dessin: z => marmite(z, { eau: true }).svg, renvois: marmiteRenvois },
      anneaux: { titre: 'La grille d’anneaux, vue de dessus', dessin: z => anneaux(z).svg, renvois: anneauxRenvois },
      claie: { titre: 'Sans anneaux : la claie', dessin: z => claie(z).svg, renvois: claieRenvois },
      leve: { titre: 'Le lève-pots de fil de fer', dessin: z => leve(z).svg, renvois: leveRenvois },
      leveDessus: { titre: 'L’anneau, vu de dessus', dessin: z => leveDessus(z).svg, renvois: leveDessusRenvois },
    },
  };
};
