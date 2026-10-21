// Planche 77-01 — le bain de glace du poisson fumé (ch. 77, §9 « Le froid qui se prouve tout seul :
// le bain de glace » et « Le montage »).
// Le chapitre ne donne aucune dimension de la chaudière ni du seau : aucune cote. Ce qui se dessine,
// c'est ce que le chapitre rend spatial : la claie au fond du seau (le paquet hors de son jus), le
// poisson dans son papier, le seau debout dans une chaudière plus large de glace et d'eau, l'eau du
// bain plus haute que le poisson, la glace qui flotte (0 °C tant qu'il en reste), le couvercle posé.
// La charte : les parois coupées en aplat noir (tôle mince) ; la paroi d'en face de la chaudière, vue
// par-dessus l'eau, en gris loin ; l'eau du bain en bleu (h.a.hachure('eau'), posée par bandes pour qu'aucune
// vaguelette ne soit coupée par un glaçon, une paroi ou le fond). Le rouge : les glaçons qui flottent (ce
// qu'on regarde chaque jour).
// Le niveau de l'eau porte le repère de niveau des dessins techniques (triangle pointe en bas).
module.exports = (h) => {
  const A = h.a;
  const r1 = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const alea = graine => { let s = graine; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  const P = pts => pts.map(p => `${r1(p[0])} ${r1(p[1])}`);
  const poly = pts => 'M' + P(pts).join(' L') + ' Z';

  // Une chaudière évasée en coupe : fond à yb, bord à yt, demi-largeurs rb (fond) et rt (bord).
  // Rend la paroi gauche et la paroi droite (tôle mince, aplat noir) et le fond.
  const paroi = (cx, yt, yb, rt, rb, e) => {
    const xg = y => cx - (rb + (rt - rb) * (yb - y) / (yb - yt));
    const xd = y => 2 * cx - xg(y);
    return { xg, xd, e, cx, yt, yb };
  };
  const tole = (c) => {
    const { xg, xd, e, cx, yt, yb } = c;
    return [
      h.path(poly([[xg(yt), yt], [xg(yb), yb], [xd(yb), yb], [xd(yt), yt], [xd(yt) - e, yt], [xd(yb) - e, yb - e], [xg(yb) + e, yb - e], [xg(yt) + e, yt]]), A.plein),
      // la lèvre roulée du bord
      h.cercle(xg(yt) + e / 2, yt, e * 0.9, A.plein), h.cercle(xd(yt) - e / 2, yt, e * 0.9, A.plein),
    ].join('\n');
  };

  // Glaçons : des blocs anguleux à la surface, la plus grande part sous l'eau.
  const glacons = (x0, x1, yE, graine, k = 1, excl = null, pleins = []) => {
    const r = alea(graine), out = [];
    let x = x0 + 2 * k;
    while (x < x1 - 10 * k) {
      if (excl && x + 24 * k > excl[0] && x < excl[1]) { x = excl[1] + 2 * k; continue; }
      const w = Math.min((14 + r() * 10) * k, x1 - x - 2 * k, excl && x < excl[0] ? excl[0] - x - 2 * k : 1e9), hh = (13 + r() * 8) * k;
      if (w < 9 * k) { x += w + 2 * k; continue; }
      const haut = yE - hh * (0.12 + r() * 0.08), bas = haut + hh;
      const a = (r() - 0.5) * 4 * k;
      const pts = [[x + 2 * k, haut + a], [x + w * 0.55, haut - a * 0.5], [x + w, haut + 3 * k + a], [x + w - 1.5 * k, bas - 2 * k], [x + w * 0.4, bas], [x + 1, bas - 4 * k]];
      out.push(h.path(poly(pts), blanc(A.detail)));
      pleins.push(pts);
      // une arête de bloc, pour qu'on lise un volume
      out.push(h.ligne(x + w * 0.55, haut - a * 0.5 + 1, x + w * 0.5, bas - 3 * k, A.fin));
      x += w + (9 + r() * 6) * k;
    }
    return out.join('\n');
  };
  // un deuxième rang de glaçons, plus bas, sous les premiers
  const glacons2 = (x0, x1, y, graine, k = 1, pleins = []) => {
    const r = alea(graine), out = [];
    let x = x0 + 6 * k;
    while (x < x1 - 14 * k) {
      const w = Math.min((12 + r() * 8) * k, x1 - x - 4 * k), hh = (10 + r() * 6) * k, yy = y + r() * 5 * k;
      const pts = [[x, yy + 2 * k], [x + w * 0.6, yy], [x + w, yy + 3 * k], [x + w - 1, yy + hh], [x + 2, yy + hh - 2 * k]];
      out.push(h.path(poly(pts), blanc(A.detail)));
      pleins.push(pts);
      x += w + (5 + r() * 6) * k;
    }
    return out.join('\n');
  };

  // Le paquet : le poisson fumé enveloppé de papier. On devine sa forme (plus gros du côté de la tête,
  // aminci vers la queue) ; le papier est replié en rabat au bout de la tête, sa lisière court sur le
  // dessus, et la queue dépasse du papier à l'autre bout.
  const paquet = (x0, x1, yt, yb) => {
    const m = (yt + yb) / 2, ht = yb - yt, L = x1 - x0;
    const xb = x1 - L * 0.13;                    // le bout du papier, côté queue
    const out = [];
    // la queue qui dépasse
    const queue = `M${r1(xb - 6)} ${r1(m - ht * 0.12)} L${r1(x1)} ${r1(m - ht * 0.42)} Q${r1(x1 - 6)} ${r1(m)} ${r1(x1)} ${r1(m + ht * 0.42)} L${r1(xb - 6)} ${r1(m + ht * 0.12)} Z`;
    out.push(h.path(queue, blanc(A.arete)));
    out.push(h.ligne(xb + 2, m - ht * 0.08, x1 - 5, m - ht * 0.3, A.fin), h.ligne(xb + 2, m + ht * 0.08, x1 - 5, m + ht * 0.3, A.fin));
    // le papier
    const d = `M${r1(x0 + 7)} ${r1(yt)} C${r1(x0 + L * 0.35)} ${r1(yt - 2)} ${r1(xb - L * 0.2)} ${r1(yt + ht * 0.1)} ${r1(xb - 4)} ${r1(m - ht * 0.22)}`
      + ` L${r1(xb)} ${r1(m - ht * 0.18)} L${r1(xb - 3)} ${r1(m)} L${r1(xb)} ${r1(m + ht * 0.18)} L${r1(xb - 4)} ${r1(m + ht * 0.22)}`
      + ` C${r1(xb - L * 0.2)} ${r1(yb - ht * 0.06)} ${r1(x0 + L * 0.35)} ${r1(yb + 1)} ${r1(x0 + 7)} ${r1(yb)}`
      + ` Q${r1(x0 + 1)} ${r1(yb)} ${r1(x0 + 1)} ${r1(m)} Q${r1(x0 + 1)} ${r1(yt)} ${r1(x0 + 7)} ${r1(yt)} Z`;
    out.push(h.path(d, blanc(A.contour)));
    // le bout plié à plat sur la tête : deux plis en biais depuis les coins, et le bord du rabat
    out.push(h.path(`M${r1(x0 + 4)} ${r1(yt + 2)} L${r1(x0 + L * 0.13)} ${r1(m - ht * 0.08)} L${r1(x0 + L * 0.13)} ${r1(m + ht * 0.08)} L${r1(x0 + 4)} ${r1(yb - 2)}`, A.detail));
    // la lisière du papier, sur le dessus, du rabat jusqu'au bout
    out.push(h.path(`M${r1(x0 + L * 0.17)} ${r1(yt + ht * 0.3)} C${r1(x0 + L * 0.4)} ${r1(yt + ht * 0.24)} ${r1(x0 + L * 0.6)} ${r1(yt + ht * 0.36)} ${r1(xb - 8)} ${r1(m - ht * 0.12)}`, A.detail));
    // les plis du papier ramassé autour de la queue
    out.push(h.ligne(xb - 14, m - ht * 0.2, xb - 4, m - ht * 0.06, A.fin), h.ligne(xb - 14, m + ht * 0.22, xb - 4, m + ht * 0.07, A.fin));
    // deux faux plis sur le flanc
    out.push(h.path(`M${r1(x0 + L * 0.34)} ${r1(yb - 2)} Q${r1(x0 + L * 0.38)} ${r1(m + ht * 0.15)} ${r1(x0 + L * 0.44)} ${r1(m + ht * 0.05)}`, A.fin));
    out.push(h.path(`M${r1(x0 + L * 0.56)} ${r1(yb - 3)} Q${r1(x0 + L * 0.6)} ${r1(m + ht * 0.2)} ${r1(x0 + L * 0.66)} ${r1(m + ht * 0.12)}`, A.fin));
    return out.join('\n');
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
          if (!mieux) {
            // la bande est trop encombrée (des glaçons serrés) : on la remplit en deux demi-bandes de teinte seule,
            // chacune posée entre deux rangs, sans vaguelette
            [[y0, (y0 + y1) / 2], [(y0 + y1) / 2, y1]].forEach(([c0, c1]) => {
              const D = couper(R, c0, c1);
              if (D.length < 3) return;
              const dy = Math.round((((c0 + c1) / 2 + 5.5 - 7) % 22 + 22) % 22 * 10) / 10;
              for (let b = Math.floor((c0 - 30 - dy) / 22); 22 * b + dy < c1 + 8; b++)
                for (const vy of [7, 18])
                  if (base.some(([, py]) => { const y = 22 * b + dy + vy + py; return y > c0 - BORD && y < c1 + BORD; }))
                    throw new Error(`eau : la demi-bande ${Math.round(c0)} à ${Math.round(c1)} est trop haute pour rester sans vaguelette`);
              sorties.push(`<g transform="translate(0 ${dy})">${h.chemin(grossir(D, RECOUVRE).map(p => [p[0], p[1] - dy]), h.a.hachure('eau', 'aucun'), true)}</g>`);
            });
            avant = null;
            continue;
          }
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

  // Toute la coupe, à l'échelle k, centrée en cx, fond posé à yb. eau : fraction de la hauteur
  // de la chaudière (le raté met l'eau à mi-hauteur du poisson).
  const geo = (cx, yb, k) => {
    const ch = paroi(cx, yb - 146 * k, yb, 146 * k, 124 * k, 3 * k);   // la chaudière
    const sh = paroi(cx, yb - 176 * k, yb - 3 * k, 76 * k, 64 * k, 2.4 * k); // le seau, posé sur le fond
    const yE = yb - 128 * k;                                          // le niveau du bain
    const xNiv = (sh.xd(yE) + ch.xd(yE) - ch.e) / 2;                  // là où se pose le repère du niveau
    const yF = sh.yb - sh.e, rb = 3.4 * k, yC = yF - 7 * k;           // le fond du seau ; le centre des bâtons en travers
    const xc0 = sh.xg(yC) + sh.e + 6 * k, xc1 = sh.xd(yC) - sh.e - 6 * k;
    const yPb = yC - rb, yPt = yPb - 30 * k;                          // le paquet posé sur la claie
    const yLb = sh.yt - sh.e * 0.9, yLt = yLb - 4 * k;                // le couvercle, à plat sur les deux lèvres du seau
    const xL0 = sh.xg(sh.yt) - 3 * k, xL1 = sh.xd(sh.yt) + 3 * k;
    return { ch, sh, yE, xNiv, yF, rb, yC, xc0, xc1, yPb, yPt, yLb, yLt, xL0, xL1 };
  };
  const montage = (cx, yb, k, { traits = [] } = {}) => {
    const out = [];
    const g = geo(cx, yb, k), { ch, sh, yE, xNiv } = g;
    // la paroi d'en face de la chaudière, vue par-dessus l'eau, en gris loin
    out.push(h.path(poly([[ch.xg(ch.yt) + ch.e, ch.yt], [ch.xd(ch.yt) - ch.e, ch.yt], [ch.xd(yE), yE], [ch.xg(yE), yE]]), A.loin));
    // la glace qui flotte, des deux côtés du seau : dessinée après l'eau, mais ses blocs cachent l'eau
    const pleins = [];
    const glace = [
      glacons2(ch.xg(yE) + ch.e, sh.xg(yE), yE + 16 * k, 3, k, pleins), glacons2(sh.xd(yE), ch.xd(yE) - ch.e, yE + 16 * k, 8, k, pleins),
      glacons(ch.xg(yE) + ch.e, sh.xg(yE) - 1, yE, 5, k, null, pleins), glacons(sh.xd(yE) + 1, ch.xd(yE) - ch.e, yE, 9, k, [xNiv - 9 * k, xNiv + 9 * k], pleins),
    ];
    // l'eau du bain, entre la chaudière et le seau : deux régions, à gauche et à droite du seau
    const yF = ch.yb - ch.e;
    const regG = [[ch.xg(yE) + ch.e, yE], [sh.xg(yE), yE], [sh.xg(sh.yb), yF], [ch.xg(yF) + ch.e, yF]];
    const regD = [[sh.xd(yE), yE], [ch.xd(yE) - ch.e, yE], [ch.xd(yF) - ch.e, yF], [sh.xd(sh.yb), yF]];
    const { xg, xd, e, yt } = ch;
    pleins.push(
      [[xg(yt), yt], [xg(yb), yb], [xd(yb), yb], [xd(yt), yt], [xd(yt) - e, yt], [xd(yb) - e, yb - e], [xg(yb) + e, yb - e], [xg(yt) + e, yt]],   // la tôle de la chaudière
      [[sh.xg(sh.yt), sh.yt], [sh.xd(sh.yt), sh.yt], [sh.xd(sh.yb), sh.yb], [sh.xg(sh.yb), sh.yb]],                                            // le seau, plein
    );
    const triangle = [[xNiv - 6, yE - 10], [xNiv + 6, yE - 10], [xNiv, yE - 0.8]];
    const tousTraits = [
      [regG[0], regG[1], 0.7], [regD[0], regD[1], 0.7],                                    // la surface
      [[xNiv - 5, yE + 4], [xNiv + 5, yE + 4], 0.35], [[xNiv - 2.5, yE + 7.5], [xNiv + 2.5, yE + 7.5], 0.35],
      ...triangle.map((p, i) => [p, triangle[(i + 1) % 3], 0.7]),
      ...traits,
    ];
    out.push(h.path(poly([...regG, ...regD]), A.blanc));
    out.push(eauSansCoupe([regG, regD], pleins, tousTraits).svg);
    out.push(h.ligne(ch.xg(yE) + ch.e, yE, sh.xg(yE), yE, A.arete), h.ligne(sh.xd(yE), yE, ch.xd(yE) - ch.e, yE, A.arete));
    out.push(...glace);
    // le repère du niveau d'eau : un triangle pointe en bas posé sur la surface, deux traits dessous
    out.push(h.path(poly(triangle), blanc(A.arete)));
    out.push(h.ligne(xNiv - 5, yE + 4, xNiv + 5, yE + 4, A.detail), h.ligne(xNiv - 2.5, yE + 7.5, xNiv + 2.5, yE + 7.5, A.detail));
    out.push(tole(ch));

    // dans le seau : sa paroi d'en face, blanche (pas de gris loin dedans), le jus, la claie, le paquet
    const { yC, xc0, xc1, rb, yPb, yPt } = g;
    out.push(h.path(poly([[sh.xg(sh.yt), sh.yt], [sh.xd(sh.yt), sh.yt], [sh.xd(sh.yb), sh.yb], [sh.xg(sh.yb), sh.yb]]), A.blanc));
    const yJ = g.yF - 4 * k;                       // le jus
    // le jus du poisson n'est pas de l'eau du bain : il reste blanc, pour qu'on ne lise pas de l'eau entrée dans le seau
    out.push(h.ligne(sh.xg(yJ) + sh.e, yJ, sh.xd(yJ) - sh.e, yJ, A.fin));
    // la claie : deux traverses en long, des bâtons en travers vus par le bout
    out.push(h.rect(xc0 - 2 * k, g.yF - 3.2 * k, xc1 - xc0 + 4 * k, 3 * k, blanc(A.detail)));
    const nb = 9;
    for (let i = 0; i < nb; i++) {
      const x = xc0 + (xc1 - xc0) * i / (nb - 1);
      out.push(h.cercle(x, yC, rb, A.hachure('bois', 'detail')));
    }
    out.push(paquet(cx - 58 * k, cx + 58 * k, yPt, yPb));
    out.push(tole(sh));
    // le couvercle posé à plat, son dessous sur les deux lèvres roulées du seau, rien qui le serre
    const { yLb, yLt, xL0, xL1 } = g;
    out.push(h.path(poly([[xL0, yLt], [xL1, yLt], [xL1, yLb], [xL0, yLb]]), blanc(A.arete)));
    out.push(h.path(`M${r1(cx - 8 * k)} ${r1(yLt)} Q${r1(cx)} ${r1(yLt - 7.4 * k)} ${r1(cx + 8 * k)} ${r1(yLt)}`, A.arete));
    return { out: out.join('\n'), ...g };
  };

  // les renvois sur la géométrie seule : le composeur les demande aussi pour une vue fictive, sans dessin
  const renvoisBon = z => {
    const k = Math.min((z.h - 20) / 182, (z.l - 90) / 300);
    const cx = z.l / 2, yb = z.h - 4;
    const g = geo(cx, yb, k);
    return { k, cx, yb, g, renvois: [
      { n: 1, rond: [g.ch.xg(g.yC) - 26, g.yC + 2], cible: [g.xc0 + 2, g.yC], texte: 'claie de bâtons au fond du seau' },
      { n: 2, rond: [g.ch.xg(g.yPt) - 26, g.yPt + 6], cible: [cx - 50 * k, g.yPt + 12 * k], texte: 'poisson fumé enveloppé de papier' },
      { n: 3, rond: [g.ch.xg(g.ch.yt) - 26, g.ch.yt - 20], cible: [g.sh.xg(g.ch.yt - 20) - 1, g.ch.yt - 20], texte: 'seau debout dans une chaudière plus large' },
      { n: 4, rond: [g.xL1 + 34, (g.yLb + g.yLt) / 2 - 2], cible: [g.xL1 + 1, (g.yLb + g.yLt) / 2], texte: 'couvercle posé, pas vissé ni serré' },
      { n: 5, rond: [g.ch.xg(g.yE) - 30, g.yE + 8], cible: [g.ch.xg(g.yE) + g.ch.e + 4 * k, g.yE + 4], texte: 'glaçons qui flottent : recharger chaque jour' },
      { n: 6, rond: [g.ch.xd(g.yE) + 34, g.yE - 26], cible: [g.xNiv + 6, g.yE - 8], texte: 'surface de l’eau, plus haute que le paquet' },
    ] };
  };
  const bon = z => {
    const { k, cx, yb, g, renvois } = renvoisBon(z);
    // le cercle rouge des glaçons, près de la paroi de gauche
    const ctl = [g.ch.xg(g.yE) + g.ch.e + 14 * k, g.yE + 2, 10];
    const cercle = Array.from({ length: 36 }, (_, i) => [[ctl[0] + ctl[2] * Math.cos(i * Math.PI / 18), ctl[1] + ctl[2] * Math.sin(i * Math.PI / 18)], [ctl[0] + ctl[2] * Math.cos((i + 1) * Math.PI / 18), ctl[1] + ctl[2] * Math.sin((i + 1) * Math.PI / 18)], 0.8]);
    const m = montage(cx, yb, k, { traits: [...renvois.map(r => [r.rond, r.cible, 1.5]), ...cercle] });
    return { svg: [m.out, h.controle(...ctl)].join('\n'), renvois };
  };

  const vue = f => ({ dessin: z => f(z).svg, renvois: z => renvoisBon(z).renvois });
  return {
    ref: '77-01',
    titre: 'Le bain de glace du poisson fumé',
    desc: 'En coupe, une chaudière large remplie de glace et d’eau ; les glaçons flottent à la surface. Un seau plus petit est posé debout dedans. '
      + 'Au fond du seau, une claie de bâtons tient le paquet de poisson hors de son jus ; le poisson fumé est roulé dans du papier. '
      + 'L’eau du bain monte plus haut que le dessus du poisson. Le couvercle est posé sur le seau, sans être vissé.',
    format: 'demi',
    disposition: [['bon']],
    vues: {
      bon: { titre: 'En coupe', ...vue(bon) },
    },
  };
};
