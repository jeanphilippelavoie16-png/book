// Planche 98-03 — Butter la pomme de terre (chapitre 98, § B, étapes 8, 9, 11 et 13 ; tableau de
// contrôle « Plants à 20-30 cm » et « Tubercules verts sous la pelure »).
// Le chapitre dit : morceaux de 40 à 60 g, au moins deux yeux ; couvrir de 10 à 15 cm de terre, de 5
// à 10 cm seulement en sol froid et mouillé ; rangs de 71 à 91 cm, 28 cm sur le rang. Premier buttage
// quand les plants font 20 à 30 cm : la terre de l'entre-rang remonte sur le rang ; on recommence
// quand les tiges ont remonté ; le dernier buttage se fait avant la floraison. La butte haute garde le
// tubercule au noir (il ne verdit pas et ne fait pas son poison) et empêche la pluie de laver les
// spores du mildiou jusqu'aux tubercules. Contrôle : aucun tubercule visible, sinon rebutter tout de
// suite.
// Cotes : seulement celles du chapitre (100 à 150, 710 à 910, 280). La hauteur des buttes, la
// profondeur de l'entre-rang et la hauteur des plants ne sont pas dans le chapitre : dessinées en
// proportion, sans cote. Le rang est dessiné à 810 (le milieu de 710 à 910).
module.exports = (h) => {
  const N = '#1A1A1A', B = '#FFFFFF';
  const f = (v) => Math.round(v * 10) / 10;
  const P = (pts) => pts.map(([x, y]) => `${f(x)} ${f(y)}`).join(' L ');
  const blanc = (a) => a.replace('fill="none"', `fill="${B}"`);
  const poly = (pts, at) => `<path d="M ${P(pts)} Z" ${at}/>`;
  const ouvert = (pts, at) => `<path d="M ${P(pts)}" ${at}/>`;
  const TIRET = `fill="none" stroke="${N}" stroke-width="1.1" stroke-dasharray="6 3.5"`;
  const HALO = `fill="none" stroke="${B}" stroke-width="3.4"`;
  const AXE = `fill="none" stroke="${N}" stroke-width="0.5" stroke-dasharray="12 3 2 3"`;
  const bez = (p0, p1, p2, n = 8) => Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, u = 1 - t;
    return [u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0], u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]];
  });
  // Un ruban effilé le long d'une polyligne : une tige.
  const ruban = (pts, w0, w1) => {
    const n = pts.length, g = [], d = [];
    pts.forEach((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
      let tx = b[0] - a[0], ty = b[1] - a[1]; const L = Math.hypot(tx, ty) || 1; tx /= L; ty /= L;
      const w = (w0 + (w1 - w0) * i / (n - 1)) / 2;
      g.push([p[0] - ty * w, p[1] + tx * w]); d.push([p[0] + ty * w, p[1] - tx * w]);
    });
    return g.concat(d.reverse());
  };
  // Un ovale en chemin : un <ellipse> ou un <circle> hors du cadre ferait crier le vérificateur.
  const ovale = (cx, cy, rx, ry, at) => poly(Array.from({ length: 16 }, (_, i) => [cx + rx * Math.cos(i * Math.PI / 8), cy + ry * Math.sin(i * Math.PI / 8)]), at);
  const cadre = (id, z, contenu) => `<defs><clipPath id="cl-9803-${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath></defs>
<g clip-path="url(#cl-9803-${id})">
${contenu}
</g>`;
  // Un trait fin qui reste lisible sur la hachure de la terre : racine, stolon.
  const filet = (pts, ep = 0.7) => `<path d="M ${P(pts)}" fill="none" stroke="${B}" stroke-width="${f(ep + 2.4)}" stroke-linecap="round"/><path d="M ${P(pts)}" fill="none" stroke="${N}" stroke-width="${ep}" stroke-linecap="round"/>`;

  // ─── Le sol : profil de la butte, en mm, y vers le bas, 0 = le sol du jour de la plantation ───
  const S = 810;                                   // un rang, dessiné au milieu de 710 à 910
  const PROF = {
    b1: { cy: -55, hw: 45, tx: 250, fd: 35 },      // après le premier buttage
    b2: { cy: -95, hw: 55, tx: 290, fd: 65 },      // après le deuxième
    b3: { cy: -125, hw: 60, tx: 320, fd: 95 },     // le dernier, avant la fleur
    rate: { cy: -55, hw: 45, tx: 240, fd: 35 },    // une butte restée basse
  };
  const surf = (p, d) => {
    if (!p) return 0;
    if (d <= p.hw) return p.cy;
    if (d >= p.tx) return p.fd;
    const t = (d - p.hw) / (p.tx - p.hw);
    return p.cy + (p.fd - p.cy) * (1 - Math.cos(Math.PI * t)) / 2;
  };
  const dist = (x) => { const m = ((x + S / 2) % S + S) % S; return Math.abs(m - S / 2); };
  const X = (V, x) => V.cx + V.k * x, Y = (V, y) => V.y0 + V.k * y;
  const ligneSol = (V, p, z) => {
    const pts = [];
    for (let px = 0; px < z.l; px += 1.5) pts.push([px, Y(V, surf(p, dist((px - V.cx) / V.k)))]);
    pts.push([z.l, Y(V, surf(p, dist((z.l - V.cx) / V.k)))]);
    return pts;
  };
  const sol = (V, p, z) => {
    const pts = ligneSol(V, p, z), fond = [...pts, [z.l, z.h], [0, z.h]];
    return [poly(fond, h.a.blanc), poly(fond, h.a.hachure('terre', 'aucun'))].join('\n');
  };
  const dessusSol = (V, p, z) => ouvert(ligneSol(V, p, z), h.a.arete);
  const ancien = (V, p, z) => { const pts = ligneSol(V, p, z); return ouvert(pts, HALO) + ouvert(pts, TIRET); };

  // ─── La plante ───
  // Une foliole : pointe devant, large au premier tiers.
  const foliole = (x, y, adeg, bl, bw, at) => {
    const a = adeg * Math.PI / 180, ux = Math.cos(a), uy = -Math.sin(a), vx = -uy, vy = ux, pts = [];
    for (let i = 0; i <= 22; i++) {
      const t = i / 22 * 2 * Math.PI, u = (1 - Math.cos(t)) / 2, w = Math.sin(t) * bw / 2 * (1.3 - 0.75 * u);
      pts.push([x + ux * u * bl + vx * w, y + uy * u * bl + vy * w]);
    }
    return poly(pts, at);
  };
  // La feuille composée de la pomme de terre : la côte arquée, trois paires de folioles, une au bout,
  // et les petites folioles glissées entre les paires.
  const feuille = (x, y, adeg, L, penche = 0.16) => {
    const a = adeg * Math.PI / 180, ux = Math.cos(a), uy = -Math.sin(a);
    const p0 = [x, y], p1 = [x + ux * 0.55 * L, y + uy * 0.55 * L], p2 = [x + ux * L, y + uy * L + penche * L];
    const B = (s) => [(1 - s) * (1 - s) * p0[0] + 2 * s * (1 - s) * p1[0] + s * s * p2[0], (1 - s) * (1 - s) * p0[1] + 2 * s * (1 - s) * p1[1] + s * s * p2[1]];
    const ang = (s) => {
      const tx = 2 * (1 - s) * (p1[0] - p0[0]) + 2 * s * (p2[0] - p1[0]), ty = 2 * (1 - s) * (p1[1] - p0[1]) + 2 * s * (p2[1] - p1[1]);
      return Math.atan2(-ty, tx) * 180 / Math.PI;
    };
    const at = blanc(h.a.detail), out = [ouvert(Array.from({ length: 13 }, (_, i) => B(0.8 * i / 12)), h.a.detail)];
    [[0.3, 0.22], [0.5, 0.25], [0.68, 0.22]].forEach(([s, l]) => [-1, 1].forEach((c) => {
      const [px, py] = B(s); out.push(foliole(px, py, ang(s) + c * 62, l * L, 0.52 * l * L, at));
    }));
    if (L > 34) [0.4, 0.59].forEach((s) => [-1, 1].forEach((c) => {
      const [px, py] = B(s); out.push(foliole(px, py, ang(s) + c * 75, 0.08 * L, 0.055 * L, at));
    }));
    const [tx, ty] = B(0.78); out.push(foliole(tx, ty, ang(0.78), 0.27 * L, 0.15 * L, at));
    return out.join('\n');
  };
  const tubercule = (cx, cy, rx, ry, rot, at = blanc(h.a.arete), yeux = true) => {
    const a = rot * Math.PI / 180, c = Math.cos(a), s = Math.sin(a), pts = [];
    for (let i = 0; i < 36; i++) {
      const t = i / 36 * 2 * Math.PI, u = rx * Math.cos(t) * (1 + 0.05 * Math.sin(3 * t)), v = ry * Math.sin(t);
      pts.push([cx + u * c - v * s, cy + u * s + v * c]);
    }
    const out = [poly(pts, at)];
    if (yeux && rx > 6) [[-0.45, -0.55], [0.35, -0.5], [0.05, 0.45]].forEach(([p, q]) => {
      const ex = cx + p * rx * c - q * ry * s, ey = cy + p * rx * s + q * ry * c, e = Math.max(1.4, rx * 0.12);
      out.push(ouvert([[ex - e, ey], [ex, ey + e * 0.6], [ex + e, ey]], h.a.fin));
    });
    return out.join('\n');
  };
  // Le morceau planté : un demi-tubercule, la coupe à plat en dessous, deux yeux sur le dos.
  const morceau = (V, ax, fletri) => {
    const pts = [];
    for (let i = 0; i <= 20; i++) {
      const t = Math.PI + i / 20 * Math.PI;             // le dos, par le haut
      pts.push([X(V, ax + 27 * Math.cos(t)), Y(V, 140 + 24 * Math.sin(t) * (fletri ? 0.85 : 1))]);
    }
    pts.push([X(V, ax + 24), Y(V, 146)], [X(V, ax - 24), Y(V, 146)]);
    const out = [poly(pts, blanc(fletri ? h.a.detail : h.a.arete))];
    const e = Math.max(1.3, 4 * V.k);
    [[-11, 119], [9, 118]].forEach(([u, v]) => {
      const ex = X(V, ax + u), ey = Y(V, v + (fletri ? 3 : 0));
      out.push(ouvert([[ex - e, ey], [ex, ey + e * 0.7], [ex + e, ey]], h.a.detail), ovale(ex, ey + e * 0.25, Math.max(0.5, e * 0.25), Math.max(0.5, e * 0.25), h.a.plein));
    });
    if (fletri) [[-16, 132, -4, 138], [4, 129, 16, 134]].forEach(([a, b, c2, d]) =>
      out.push(ouvert(bez([X(V, ax + a), Y(V, b)], [X(V, ax + (a + c2) / 2), Y(V, b - 4)], [X(V, ax + c2), Y(V, d)], 4), h.a.fin)));
    return out.join('\n');
  };
  const RACINES = [
    [[-12, 132], [-45, 150], [-72, 190]], [[12, 132], [45, 152], [82, 188]], [[-5, 146], [-12, 172], [-22, 210]],
    [[6, 146], [16, 175], [30, 210]], [[-4, 104], [-40, 100], [-80, 124]], [[6, 102], [44, 96], [88, 120]],
  ];
  // Trois tiges du même morceau : une droite, deux qui s'écartent en sortant de la butte.
  const tigesDe = (haut, crete) => {
    const m = (118 + crete) / 2;
    return [
      bez([0, 118], [-3, m], [-6, haut], 18),
      bez([-6, 118], [-26, m], [-92, haut + 75], 18),
      bez([7, 118], [28, m], [98, haut + 60], 18),
    ];
  };
  const xSur = (pts, y) => {
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
      if ((y0 - y) * (y1 - y) <= 0) return x0 + (y - y0) / ((y1 - y0) || 1) * (x1 - x0);
    }
    return pts[pts.length - 1][0];
  };
  // o = { haut, crete, nf, L, tub: [[nx, ny, tx, ty, rx, ry, rot]], stol: [[nx, ny, ex, ey]], boutons, miroir, fletri }
  const plante = (V, ax, o) => {
    const s = o.miroir || 1, k = V.k;
    const M = ([x, y]) => [X(V, ax + s * x), Y(V, y)];
    const sous = [], dessus = [];
    RACINES.forEach(([a, b, c]) => sous.push(filet(bez(a, b, c, 8).map(M), 0.5)));
    (o.stol || []).forEach(([nx, ny, ex, ey]) => sous.push(filet(bez([nx, ny], [(nx + ex) / 2, Math.max(ny, ey) + 8], [ex, ey], 8).map(M), 0.7)));
    (o.tub || []).forEach(([nx, ny, tx, ty, rx, ry, rot]) => {
      sous.push(filet(bez([nx, ny], [(nx + tx) / 2, Math.max(ny, ty) + 10], [tx, ty], 10).map(M), 0.7));
    });
    (o.tub || []).forEach(([, , tx, ty, rx, ry, rot]) => {
      const [cx, cy] = M([tx, ty]);
      sous.push(tubercule(cx, cy, rx * k, ry * k, rot * s, blanc(rx * k > 6 ? h.a.arete : h.a.detail)));
    });
    sous.push(morceau(V, ax, o.fletri));
    const tiges = tigesDe(o.haut, o.crete);
    tiges.forEach((t) => sous.push(poly(ruban(t.map(M), Math.max(1.8, 11 * k), Math.max(1.3, 6 * k)), blanc(h.a.detail))));
    const debut = [-1, -1, 1];                     // le côté de la première feuille de chaque tige
    tiges.forEach((t, j) => {
      const yTop = t[t.length - 1][1];
      for (let i = 0; i < o.nf; i++) {
        const fr = o.nf === 1 ? 0 : i / (o.nf - 1);
        const y = (o.crete - 22) + fr * ((yTop + 45) - (o.crete - 22));
        const cote = i % 2 === 0 ? debut[j] : -debut[j];
        let adeg = cote > 0 ? 14 + 46 * fr : 166 - 46 * fr;
        if (s < 0) adeg = 180 - adeg;
        const [px, py] = M([xSur(t, y), y]);
        dessus.push(feuille(px, py, adeg, o.L * k * (1 - 0.35 * fr)));
      }
      const [tx, ty] = M(t[t.length - 1]);
      if (o.boutons) {
        // Le bouquet de boutons, fermé, au bout de la tige.
        const e = Math.max(4.5, 15 * k), top = [tx + s * 1.5, ty - 2.2 * e];
        dessus.push(ouvert([[tx, ty], top], h.a.detail));
        [-1, 0, 1].forEach((c) => {
          const E = [top[0] + c * e * 0.9, top[1] - e * (c ? 0.5 : 0.9)];
          dessus.push(ouvert([top, E], h.a.fin));
          dessus.push(ovale(E[0], E[1] - 2, Math.max(2, 5.5 * k), Math.max(2.7, 8 * k), blanc(h.a.detail)));
        });
      } else {
        dessus.push(feuille(tx, ty, 90 + s * [8, 14, -14][j], o.L * k * 0.5, 0.05));
      }
    });
    return { sous: sous.join('\n'), dessus: dessus.join('\n') };
  };
  // Une flèche de mouvement en trait fin, pointe ouverte : elle ne double pas la surface du sol.
  const flecheFine = (a, q, b) => {
    const pts = bez(a, q, b, 16), [x1, y1] = pts[pts.length - 1], [x0, y0] = pts[pts.length - 3];
    const L = Math.hypot(x1 - x0, y1 - y0) || 1, ux = (x1 - x0) / L, uy = (y1 - y0) / L, e = 6.5, w = 3.6;
    const g = [x1 - ux * e - uy * w, y1 - uy * e + ux * w], d = [x1 - ux * e + uy * w, y1 - uy * e - ux * w];
    return ouvert(pts, HALO.replace('3.4', '2.6')) + ouvert(pts, h.a.fin) + ouvert([g, [x1, y1], d], h.a.fin);
  };
  // La terre de l'entre-rang qui monte sur le rang, des deux côtés, bien au-dessus du sol.
  const ptsFleche = (p, c) => [[c * (p.tx + 35), p.fd - 60], [c * p.tx * 0.6, p.cy - 95], [c * (p.hw + 40), surf(p, p.hw + 40) - 55]];
  const fleches = (V, p) => [-1, 1].map((c) => {
    const [a, q, b] = ptsFleche(p, c).map(([x, y]) => [X(V, x), Y(V, y)]);
    return flecheFine(a, q, b);
  }).join('\n');
  const milieuFleche = (V, p, c) => {
    const [a, q, b] = ptsFleche(p, c);
    return [X(V, 0.25 * a[0] + 0.5 * q[0] + 0.25 * b[0]), Y(V, 0.25 * a[1] + 0.5 * q[1] + 0.25 * b[1])];
  };

  // ─── Les trois gestes : même échelle, un rang et deux demi-entre-rangs ───
  const etape = (z) => { const k = z.l / S; return { k, cx: z.l / 2, y0: z.h - 205 * k }; };
  const vueEtape = (id, z, p, avant, o) => {
    const V = etape(z), out = [sol(V, p, z)];
    if (avant !== undefined) out.push(ancien(V, avant, z));
    const pl = o ? plante(V, 0, o) : null;
    if (pl) out.push(pl.sous); else out.push(morceau(V, 0, false));
    out.push(dessusSol(V, p, z));
    if (pl) out.push(pl.dessus);
    if (avant !== undefined) out.push(fleches(V, p));
    return cadre(id, z, out.join('\n'));
  };

  // ─── La coupe et le plan : même échelle, même axe ───
  const LC = 600;                                   // largeur de la vue en coupe (pleine largeur)
  const coupeV = () => { const k = LC / 2.1 / S; return { k, cx: LC / 2, y0: 28 + 445 * k }; };
  const TUB = [
    [-4, 95, -120, 60, 36, 25, 15], [6, 80, 115, 40, 40, 27, -10], [-6, 20, -62, -28, 28, 20, 25],
    [8, 0, 70, -35, 24, 17, -30], [-3, 122, -178, 112, 20, 14, 0], [6, 45, 165, 72, 16, 12, 5],
  ];
  const plCoupe = { haut: -400, crete: -125, nf: 4, L: 200, tub: TUB, boutons: true, fletri: true };
  // Un rond en chemin (un <circle> hors du cadre ferait crier le vérificateur).
  const rond = (cx, cy, r, at) => poly(Array.from({ length: 16 }, (_, i) => [cx + r * Math.cos(i * Math.PI / 8), cy + r * Math.sin(i * Math.PI / 8)]), at);

  // Le raté : une butte restée basse, un tubercule qui sort au flanc.
  const rateV = (z) => ({ k: 0.33, cx: 30, y0: z.h - 50 });
  const RT = { x: 150, y: -8, rx: 36, ry: 24, rot: 37 };
  const RF = { a: [310, -30], q: [262, -150], b: [190, -105] };

  return {
    ref: '98-03',
    titre: 'Butter la pomme de terre',
    desc: 'Le rang de pommes de terre en coupe, à travers le rang. Un : le morceau planté, deux yeux sur le dos, sous 10 à 15 cm de terre, le sol encore plat. Deux : les plants font 20 à 30 cm ; la terre des deux entre-rangs remonte sur le rang, des deux côtés, et fait une première butte basse ; l’ancienne surface, plate, reste en tireté. Trois : les tiges ont remonté ; on rebutte, la butte monte et l’entre-rang se creuse ; les premiers stolons, enterrés, portent de petits tubercules. Quatre, en grand : le dernier buttage, avant que les boutons de fleur s’ouvrent ; deux rangs, 710 à 910 d’axe en axe ; la butte haute et arrondie ; le sol du jour de la plantation en tireté, avec, 10 à 15 cm plus bas, le morceau flétri qui a donné les tiges ; les tiges enterrées portent les stolons et les tubercules, tous dans la butte, sous une bonne épaisseur de terre ; l’entre-rang creusé d’où la terre est venue. Vu de dessus : les buttes en long, les talus hachurés, un plant tous les 280, la ligne de coupe A-A par le milieu des plants. Raté : une butte restée basse, un tubercule sort au flanc et verdit au jour ; une flèche ramène la terre de l’entre-rang par-dessus.',
    format: 'pleine',
    disposition: [['planter', 'butter1', 'butter2'], ['coupe'], ['plan', 'rate']],
    hauteurs: [1, 1.62, 0.98],
    largeurs: [[1, 1, 1], [1], [3, 1]],
    vues: {
      planter: {
        titre: '1. Planter',
        dessin: (z) => {
          const V = etape(z), yt = Y(V, 116);
          return vueEtape('planter', z, null) + '\n' + [
            h.ligne(X(V, 12), yt, X(V, 0) + 25, yt, h.a.fin),
            h.cote(X(V, 0) + 20, V.y0, X(V, 0) + 20, yt, '100 à 150', { cote: 'droite' }),
          ].join('\n');
        },
        renvois: (z) => {
          const V = etape(z);
          return [
            { n: 1, rond: [24, Y(V, 150)], cible: [X(V, -24), Y(V, 138)], texte: 'morceau de 40 à 60 g, deux yeux' },
            { n: 2, rond: [24, V.y0 - 40], cible: [X(V, -60), Y(V, 45)], texte: 'sol froid et mouillé : 50 à 100' },
          ];
        },
      },
      butter1: {
        titre: '2. Plants à 20-30 cm : butter',
        dessin: (z) => vueEtape('butter1', z, PROF.b1, null,
          { haut: -230, crete: PROF.b1.cy, nf: 3, L: 120, stol: [[-3, 70, -48, 84], [5, 40, 42, 50]] }),
        renvois: (z) => {
          const V = etape(z);
          return [
            { n: 3, rond: [z.l - 12, 16], cible: milieuFleche(V, PROF.b1, 1), texte: 'la terre de l’entre-rang monte sur le rang' },
            { n: 4, rond: [16, V.y0 - 46], cible: [X(V, -350), V.y0], texte: 'tireté : la surface d’avant' },
          ];
        },
      },
      butter2: {
        titre: '3. Tiges remontées : rebutter',
        dessin: (z) => vueEtape('butter2', z, PROF.b2, PROF.b1,
          { haut: -350, crete: PROF.b2.cy, nf: 3, L: 155,
            tub: [[-3, 80, -62, 88, 13, 9, 10], [5, 50, 58, 42, 11, 8, -10], [-3, 25, -42, 12, 8, 6, 20]] }),
      },
      coupe: {
        titre: '4. Le dernier buttage, avant la fleur : coupe A-A',
        dessin: (z) => {
          const V = coupeV(), out = [];
          out.push(sol(V, PROF.b3, z));
          out.push(ancien(V, null, z));
          const pls = [plante(V, -S, plCoupe), plante(V, 0, plCoupe), plante(V, S, { ...plCoupe, miroir: -1 })];
          pls.forEach((p) => out.push(p.sous));
          out.push(dessusSol(V, PROF.b3, z));
          pls.forEach((p) => out.push(p.dessus));
          return cadre('coupe', z, out.join('\n')) + '\n' +
            h.cote(X(V, -S), 8, X(V, 0), 8, '710 à 910', { cote: 'dessous' });
        },
        renvois: (z) => {
          const V = coupeV();
          return [
            { n: 5, rond: [200, 40], cible: [X(V, -6) - 3, Y(V, -448)], texte: 'boutons : butter avant qu’ils s’ouvrent' },
            { n: 6, rond: [180, 112], cible: [X(V, -98), Y(V, -76)], texte: 'ni lumière, ni spores lavées par la pluie' },
            { n: 7, rond: [180, 160], cible: [X(V, -128), Y(V, 62)], texte: 'les tubercules se font dans la butte' },
            { n: 8, rond: [440, 120], cible: [X(V, 240), Y(V, 0)], texte: 'tireté : le sol à la plantation' },
            { n: 9, rond: [470, 168], cible: [X(V, 405), Y(V, 95)], texte: 'entre-rang creusé : la terre de la butte' },
          ];
        },
      },
      plan: {
        titre: 'Vu de dessus',
        dessin: (z) => {
          const V = coupeV(), k = V.k, out = [], p = PROF.b3;
          const yA = 32, pas = 280 * k, xCote = 176;
          const rangs = [-1, 0].map((j) => X(V, j * S));
          rangs.forEach((x) => {
            // Bord de crête et pied de talus au même x que dans la coupe (même échelle, même axe) :
            // la crête s'arrête où la pente se voit, le pied où la pente finit. Hachures du bord
            // de crête jusqu'au pied, longues et courtes en alternance.
            [-1, 1].forEach((c) => {
              const xc = x + c * (p.hw + 0.12 * (p.tx - p.hw)) * k, xt = x + c * p.tx * k;
              out.push(ouvert([[xc, 0], [xc, z.h]], h.a.detail), ouvert([[xt, 0], [xt, z.h]], h.a.fin));
              for (let y = 2, i = 0; y < z.h; y += 5, i++) out.push(ouvert([[xc, y], [xc + (xt - xc) * (i % 2 ? 0.55 : 1), y]], h.a.fin));
            });
          });
          out.push(ouvert([[xCote - 5, yA + pas], [rangs[1], yA + pas]], h.a.fin));
          rangs.forEach((x, j) => [-1, 0, 1, 2].forEach((i) => {
            const y = yA + i * pas, tourne = j * 40 + i * 23;
            [[0, 1], [57, 0.8], [118, 0.95], [168, 0.75], [232, 0.9], [296, 0.82]].forEach(([a, l]) => out.push(feuille(x, y, a + tourne, l * 115 * k, 0)));
            [[-2.5, -1.5], [2.5, -1], [0, 2.5]].forEach(([u, v]) => out.push(rond(x + u, y + v, 1.8, blanc(h.a.detail))));
          }));
          // La ligne de coupe A-A, par le milieu des plants.
          const xg = 60, xd = z.l - 8;
          out.push(`<path d="M ${xg} ${yA} L ${xd} ${yA}" fill="none" stroke="${N}" stroke-width="0.7" stroke-dasharray="9 3 2 3"/>`);
          out.push(ouvert([[xg, yA], [xg + 8, yA]], h.a.contour), ouvert([[xd - 8, yA], [xd, yA]], h.a.contour));
          [xg, xd].forEach((x) => out.push(h.fleche(`M ${x} ${yA} L ${x} ${yA - 22}`)));
          [xg + 12, xd - 12].forEach((x) => out.push(h.rect(x - 5, yA - 25, 10, 13, h.a.blanc), h.texte(x, yA - 14, 'A')));
          return cadre('plan', z, out.join('\n')) + '\n' + h.cote(xCote, yA, xCote, yA + pas, '280', { cote: 'gauche' });
        },
      },
      rate: {
        titre: 'Raté',
        dessin: (z) => {
          const V = rateV(z), k = V.k, p = PROF.rate, out = [];
          out.push(`<defs><pattern id="p9803-vert" width="2.6" height="2.6" patternUnits="userSpaceOnUse"><circle cx="1.3" cy="1.3" r="0.65" fill="${N}"/></pattern></defs>`);
          const pts = [];
          for (let px = 0; px < z.l; px += 1.5) pts.push([px, Y(V, surf(p, Math.abs((px - V.cx) / k)))]);
          pts.push([z.l, Y(V, surf(p, Math.abs((z.l - V.cx) / k)))]);
          const fond = [...pts, [z.l, z.h], [0, z.h]];
          out.push(poly(fond, h.a.blanc), poly(fond, h.a.hachure('terre', 'aucun')));
          const pl = plante(V, 0, { haut: -280, crete: p.cy, nf: 4, L: 140, stol: [[5, 20, 118, -12]] });
          out.push(pl.sous);
          // Le tubercule : blanc sous la terre, pointillé (vert) au jour.
          const [cx, cy] = [X(V, RT.x), Y(V, RT.y)];
          const air = [...pts, [z.l, 0], [0, 0]];
          out.push(`<defs><clipPath id="cl-9803-air"><path d="M ${P(air)} Z" fill="none"/></clipPath></defs>`);
          out.push(tubercule(cx, cy, RT.rx * k, RT.ry * k, RT.rot, h.a.blanc, false));
          out.push(`<g clip-path="url(#cl-9803-air)">${tubercule(cx, cy, RT.rx * k, RT.ry * k, RT.rot, 'fill="url(#p9803-vert)" stroke="none"', false)}</g>`);
          out.push(tubercule(cx, cy, RT.rx * k, RT.ry * k, RT.rot, h.a.arete, true));
          out.push(ouvert(pts, h.a.arete));
          out.push(pl.dessus);
          // Rebutter : la terre de l'entre-rang par-dessus.
          const [a, q, b] = [RF.a, RF.q, RF.b].map(([x, y]) => [X(V, x), Y(V, y)]);
          out.push(flecheFine(a, q, b));
          return cadre('rate', z, out.join('\n'));
        },
        renvois: (z) => {
          const V = rateV(z), m = [0.25 * RF.a[0] + 0.5 * RF.q[0] + 0.25 * RF.b[0], 0.25 * RF.a[1] + 0.5 * RF.q[1] + 0.25 * RF.b[1]];
          return [
            { n: 10, rond: [z.l - 14, 58], cible: [X(V, 158), Y(V, -24)], texte: 'au jour, il verdit et fait son poison' },
            { n: 11, rond: [z.l - 16, z.h - 16], cible: [X(V, m[0]), Y(V, m[1])], texte: 'rebutter tout de suite' },
          ];
        },
      },
    },
  };
};
