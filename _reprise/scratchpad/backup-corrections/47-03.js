// Planche 47-03 — L'appelant de fortune (ch. 47, étape 32 ; ch. 54, « Quand il n'y a plus de cartouches »).
// Le premier canard pris, la tête calée droite sur un bâton fourchu planté dans la vase ; la motte
// de vase ou de neige coiffée d'un chiffon sombre. Aucune cote : le chapitre ne donne aucune mesure.
//
// Le montage, pour qu'il tienne pour vrai : le bâton est planté devant le poitrail, un peu penché
// vers l'oiseau ; sa fourche prend le haut du cou juste sous la tête, une branche de chaque côté.
// La tête, plus large que le cou, repose sur les deux branches et ne peut ni tomber en avant ni
// rouler de côté ; le cou repart vers le corps derrière le bâton. L'oiseau flotte, retenu par le
// cou : le bâton sert aussi d'ancre.
//
// Unités : le canard fait environ 1,45 du bout du bec au bout de la queue ; la ligne d'eau est à
// y = 0, y vers le bas. La loupe redessine la même scène, grossie autour du menton.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blanc = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const sansBord = a => a.replace(/stroke="[^"]*"/, 'stroke="none"');
  const tf = (s, ox, oy) => (x, y) => [ox + x * s, oy + y * s];
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  let nClip = 0;
  const decoupe = (x, y, l, ht, contenu) => {
    const id = `pl4703-${++nClip}`;
    return `<clipPath id="${id}"><rect x="${f(x)}" y="${f(y)}" width="${f(l)}" height="${f(ht)}"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu.join('\n')}\n</g>`;
  };

  // Segments en unités → attribut d.
  const versD = (segs, P) => segs.map(([c, ...a]) => {
    if (c === 'Z') return 'Z';
    const q = [];
    for (let i = 0; i < a.length; i += 2) q.push(pt(P(a[i], a[i + 1])));
    return `${c} ${q.join(' ')}`;
  }).join(' ');

  // Courbe lisse par des points (Catmull-Rom → Bézier), en pixels.
  const lisse = (pts, ferme = false) => {
    const n = pts.length, g = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M ${pt(pts[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C ${pt([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${pt([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pt(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };

  // Une branche : un axe (pixels) et un rayon par point ; le premier bout taillé en pointe si
  // demandé, le dernier coupé net. Rend le contour fermé.
  const branche = (axe, rayons, pointe = false) => {
    const n = axe.length, G = [], D = [];
    for (let i = 0; i < n; i++) {
      const a = axe[Math.max(0, i - 1)], b = axe[Math.min(n - 1, i + 1)];
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L;
      G.push([axe[i][0] + nx * rayons[i], axe[i][1] + ny * rayons[i]]);
      D.push([axe[i][0] - nx * rayons[i], axe[i][1] - ny * rayons[i]]);
    }
    const debut = [];
    if (pointe) {
      const a = axe[0], b = axe[1], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      debut.push([a[0] - (b[0] - a[0]) / L * rayons[0] * 3, a[1] - (b[1] - a[1]) / L * rayons[0] * 3]);
    }
    return [...debut, ...G, ...D.reverse()];
  };
  // Le bout coupé d'une branche : une petite ellipse en travers de l'axe.
  const coupe = (a, b, r) => {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L];
    const q = [];
    for (let i = 0; i < 16; i++) {
      const t = i / 16 * 2 * Math.PI, c = Math.cos(t) * r, e = Math.sin(t) * r * 0.35;
      q.push([b[0] - u[1] * c + u[0] * e, b[1] + u[0] * c + u[1] * e]);
    }
    return h.path(lisse(q, true), h.a.detail);
  };

  // ── Le canard de profil, tourné vers la gauche ─────────────────────────────────────────
  const CANARD = [
    ['M', -0.54, 0],
    ['C', -0.585, -0.08, -0.585, -0.22, -0.53, -0.30],      // poitrail
    ['C', -0.55, -0.36, -0.58, -0.42, -0.61, -0.47],        // devant du cou
    ['C', -0.625, -0.495, -0.645, -0.512, -0.675, -0.516],  // gorge, menton
    ['L', -0.79, -0.507],                                    // dessous du bec
    ['C', -0.82, -0.506, -0.83, -0.522, -0.815, -0.533],     // bout du bec
    ['C', -0.77, -0.545, -0.72, -0.555, -0.69, -0.575],      // dessus du bec
    ['C', -0.67, -0.62, -0.63, -0.66, -0.585, -0.66],        // front, calotte
    ['C', -0.54, -0.66, -0.508, -0.625, -0.512, -0.565],     // arrière de la tête
    ['C', -0.515, -0.50, -0.47, -0.40, -0.39, -0.33],        // nuque
    ['C', -0.31, -0.265, -0.15, -0.27, 0.05, -0.27],         // dos
    ['C', 0.25, -0.27, 0.40, -0.22, 0.48, -0.17],            // croupion
    ['L', 0.62, -0.152],                                     // queue, dessus
    ['L', 0.50, -0.092],                                     // queue, dessous
    ['C', 0.49, -0.06, 0.48, -0.03, 0.46, 0],                // sous la queue
    ['C', 0.40, 0.10, 0.15, 0.15, -0.05, 0.15],              // la coque, sous l'eau
    ['C', -0.30, 0.15, -0.48, 0.10, -0.54, 0],
    ['Z'],
  ];
  const AILE = [['M', -0.37, -0.25], ['C', -0.27, -0.11, 0.02, -0.075, 0.28, -0.095], ['L', 0.53, -0.148]];
  const PLUMES = [
    [['M', 0.10, -0.10], ['C', 0.25, -0.13, 0.38, -0.155, 0.50, -0.17]],
    [['M', 0.20, -0.095], ['C', 0.30, -0.115, 0.42, -0.14, 0.52, -0.158]],
  ];
  const FOURCHE = [-0.628, -0.425];                 // l'enfourchure, sous la gorge
  const VASE = 0.22, BAS = 0.42;                   // le fond sous l'eau ; le bas de la coupe
  const geoCote = z => {
    const s = Math.min((z.l - 16) / 1.52, (z.h - 6) / (BAS + 0.69));
    const hDes = (BAS + 0.69) * s;
    return { s, P: tf(s, z.l / 2 + 0.10 * s, (z.h - hDes) / 2 + 0.69 * s) };
  };

  // Le canard et son bâton, dans un repère P d'échelle s (réutilisé grossi dans la loupe).
  const scene = (P, s, garde = () => true) => {
    const out = [], r = 0.02 * s, Fk = P(...FOURCHE);
    // La branche de derrière : elle monte devant la gorge, jusque sous le menton.
    const loin = [Fk, P(-0.648, -0.468), P(-0.668, -0.512)];
    out.push(h.chemin(branche(loin, [r * 0.8, r * 0.7, r * 0.6]), blanc(h.a.arete), true));
    out.push(coupe(loin[1], loin[2], r * 0.6));
    out.push(h.path(versD(CANARD, P), blanc(h.a.contour)));
    out.push(h.path(versD(AILE, P), h.a.arete));
    PLUMES.forEach(q => out.push(h.path(versD(q, P), h.a.detail)));
    out.push(h.path(versD([['M', -0.69, -0.575], ['C', -0.695, -0.55, -0.69, -0.53, -0.675, -0.516]], P), h.a.detail));
    out.push(h.path(versD([['M', -0.69, -0.536], ['C', -0.73, -0.528, -0.78, -0.522, -0.815, -0.522]], P), h.a.detail));
    if (garde(P(-0.738, -0.552))) out.push(h.ellipse(...P(-0.738, -0.552), 0.009 * s, 0.0035 * s, h.a.plein));
    if (garde(P(-0.607, -0.605))) out.push(h.cercle(...P(-0.607, -0.605), 0.011 * s, h.a.plein));
    // Le bâton et la branche de devant, par-dessus le cou ; le bout taillé dans la vase.
    const axe = [P(-0.695, 0.31), P(-0.68, 0.12), P(-0.653, -0.15), Fk, P(-0.605, -0.462), P(-0.588, -0.503)];
    out.push(h.chemin(branche(axe, [r, r, r, r * 0.95, r * 0.72, r * 0.6], true), blanc(h.a.arete), true));
    out.push(coupe(axe[4], axe[5], r * 0.6));
    return out;
  };
  // La loupe : centre dans la vue, point grossi, rayon (en unités de la vue), grossissement.
  const LOUPE = { c: [0.21, -0.495], m: [-0.645, -0.51], R: 0.19, k: 1.9 };

  const dessinCote = z => {
    const { s, P } = geoCote(z);
    const ySurf = P(0, 0)[1], yVase = P(0, VASE)[1], yBas = P(0, BAS)[1];
    const vase = [];
    for (let i = 0; i <= 40; i++) { const x = z.l * i / 40; vase.push([x, yVase + 2.2 * Math.sin(x / 23) + 1.4 * Math.sin(x / 9 + 1)]); }
    const out = [];
    out.push(h.rect(0, ySurf, z.l, yVase - ySurf + 4, sansBord(h.a.hachure('eau', 'fin'))));
    out.push(h.path(`${lisse(vase)} L ${f(z.l)} ${f(yBas)} L 0 ${f(yBas)} Z`, sansBord(h.a.hachure('terre'))));
    out.push(h.path(lisse(vase), h.a.arete));
    out.push(h.ligne(0, ySurf, z.l, ySurf, h.a.arete));
    out.push(...scene(P, s));

    // La loupe sur la fourche : un petit cercle sur le dessin, un trait, le grand cercle.
    const C = P(...LOUPE.c), M = P(...LOUPE.m), R = LOUPE.R * s, rm = R / LOUPE.k;
    const ks = LOUPE.k * s, P2 = (x, y) => [C[0] + (x - LOUPE.m[0]) * ks, C[1] + (y - LOUPE.m[1]) * ks];
    const dx = C[0] - M[0], dy = C[1] - M[1], L = Math.hypot(dx, dy);
    out.push(h.cercle(M[0], M[1], rm, h.a.detail));
    out.push(h.ligne(M[0] + dx / L * rm, M[1] + dy / L * rm, C[0] - dx / L * R, C[1] - dy / L * R, h.a.detail));
    out.push(h.cercle(C[0], C[1], R, h.a.blanc));
    const id = `pl4703-${++nClip}`;
    out.push(`<clipPath id="${id}"><circle cx="${f(C[0])}" cy="${f(C[1])}" r="${f(R)}"/></clipPath>\n<g clip-path="url(#${id})">\n${scene(P2, ks, q => Math.hypot(q[0] - C[0], q[1] - C[1]) < R - 4).join('\n')}\n</g>`);
    out.push(h.cercle(C[0], C[1], R, h.a.arete));
    return out.join('\n');
  };

  // ── Les mottes ─────────────────────────────────────────────────────────────────────────
  const hMotte = (x, bosses) => {
    const base = -0.30 * Math.pow(Math.max(0, 1 - Math.pow((x + 0.03) / 0.47, 2)), 0.55) * (1 + 0.14 * x);
    return bosses ? base * (1 + 0.035 * Math.sin(x * 31 + 1) + 0.02 * Math.sin(x * 71)) : base;
  };
  const bordChiffon = x => -0.16 + 0.012 * Math.sin(x * 13 + 0.7) + 0.006 * Math.sin(x * 37);
  const geoMotte = z => {
    const y0 = -0.34, y1 = 0.08;
    const s = Math.min((z.l - 30) / 1.0, (z.h - 6) / (y1 - y0));
    return { s, y1, P: tf(s, z.l / 2 + 0.02 * s, (z.h - (y1 - y0) * s) / 2 - y0 * s) };
  };
  const dessinMotte = matiere => z => {
    const { y1, P } = geoMotte(z), vase = matiere === 'vase';
    const out = [], ySol = P(0, 0)[1], yBas = P(0, y1)[1];
    const sol = [];
    for (let i = 0; i <= 30; i++) { const x = z.l * i / 30; sol.push([x, ySol + 1.4 * Math.sin(x / 19) + (vase ? 1.0 * Math.sin(x / 7) : 0)]); }
    out.push(h.path(`${lisse(sol)} L ${f(z.l)} ${f(yBas)} L 0 ${f(yBas)} Z`, sansBord(h.a.hachure(vase ? 'terre' : 'neige'))));
    out.push(h.path(lisse(sol), h.a.arete));
    const xs = []; for (let x = -0.49; x <= 0.43 + 1e-9; x += 0.02) xs.push(x);
    const dessus = [P(-0.505, 0.02), ...xs.map(x => P(x, hMotte(x, vase) + 0.012)), P(0.445, 0.02)];
    out.push(h.path(`${lisse(dessus)} Z`, h.a.blanc));
    out.push(h.path(`${lisse(dessus)} Z`, sansBord(h.a.hachure(vase ? 'terre' : 'neige'))));
    out.push(h.path(lisse(dessus), h.a.contour));
    // Le chiffon, jeté sur le dessus : il épouse la motte et pend d'un coin de chaque côté.
    const dans = xs.filter(x => hMotte(x, vase) < bordChiffon(x) - 0.005);
    const haut = dans.map(x => P(x, hMotte(x, vase) - 0.01));
    const a = dans[0], b = dans[dans.length - 1];
    const bas = dans.slice().reverse().map(x => P(x, bordChiffon(x)));
    const coinG = P(a - 0.03, bordChiffon(a) + 0.05), coinD = P(b + 0.025, bordChiffon(b) + 0.035);
    out.push(h.path(`M ${pt(coinG)} L ${pt(haut[0])} ${lisse(haut).replace(/^M [^C]+/, '')} L ${pt(coinD)} L ${pt(bas[0])} ${bas.slice(1).map(p => `L ${pt(p)}`).join(' ')} Z`, h.a.plein));
    const pli = (x, dx) => versD([['M', x, hMotte(x, vase) + 0.025], ['C', x + dx, hMotte(x, vase) + 0.06, x - dx, bordChiffon(x) - 0.04, x + dx, bordChiffon(x) - 0.012]], P);
    [[-0.22, 0.012], [0.02, -0.01], [0.2, 0.012]].forEach(([x, dx]) => out.push(h.path(pli(x, dx), 'fill="none" stroke="#FFFFFF" stroke-width="0.8" stroke-linecap="round"')));
    return out.join('\n');
  };

  return {
    ref: '47-03',
    titre: 'L’appelant de fortune',
    desc: 'De côté : le premier canard pris flotte sur l’eau peu profonde ; un bâton fourchu, planté dans la vase devant le poitrail et un peu penché vers l’oiseau, prend le haut du cou dans sa fourche, une branche de chaque côté, juste sous la tête, qui repose dessus et tient droite. En bas : une motte de vase coiffée d’un chiffon sombre, et une motte de neige coiffée d’un chiffon noir, pour l’oie des neiges.',
    format: 'pleine',
    disposition: [['cote'], ['vase', 'neige']],
    hauteurs: [2.1, 1],
    vues: {
      cote: {
        titre: 'De côté',
        dessin: dessinCote,
        renvois: z => {
          const { P } = geoCote(z);
          return [
            { n: 1, rond: [z.l - 18, P(0, -0.24)[1]], cible: P(0.30, -0.19), texte: 'le premier canard pris' },
            { n: 2, rond: [P(LOUPE.c[0] - LOUPE.R, 0)[0] - 18, P(0, LOUPE.c[1] + LOUPE.R * 0.75)[1]], cible: (() => { const C = P(...LOUPE.c), ks = LOUPE.k * geoCote(z).s; return [C[0] + (FOURCHE[0] - LOUPE.m[0]) * ks, C[1] + (FOURCHE[1] - LOUPE.m[1]) * ks]; })(), texte: 'la gorge dans la fourche' },
            { n: 3, rond: [16, P(0, 0.33)[1]], cible: P(-0.694, 0.30), texte: 'bâton planté dans la vase' },
          ];
        },
      },
      vase: {
        titre: 'Motte de vase',
        dessin: dessinMotte('vase'),
        renvois: z => {
          const { P } = geoMotte(z);
          return [
            { n: 4, rond: [14, P(0, -0.26)[1]], cible: P(-0.34, -0.06), texte: 'motte de vase' },
            { n: 5, rond: [z.l - 14, P(0, -0.30)[1]], cible: P(0.16, -0.22), texte: 'chiffon sombre par-dessus' },
          ];
        },
      },
      neige: {
        titre: 'Motte de neige',
        dessin: dessinMotte('neige'),
        renvois: z => {
          const { P } = geoMotte(z);
          return [
            { n: 6, rond: [z.l - 14, P(0, -0.30)[1]], cible: P(0.16, -0.22), texte: 'pour l’oie des neiges' },
          ];
        },
      },
    },
  };
};
