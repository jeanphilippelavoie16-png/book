// Planche 71-02 — le fumoir de baril sur conduit enterré (ch. 66, section 9, variante d'urgence).
// Seules cotes portées : « 2 ou 3 pas » (foyer–chambre) et « une pelle » (largeur de la tranchée).
module.exports = (h) => {
  const A = h.a;
  const BL = (A.blanc.match(/fill="([^"]+)"/) || [])[1] || '#FFFFFF';
  const blanc = at => at.replace('fill="none"', `fill="${BL}"`);
  const bA = blanc(A.arete), bC = blanc(A.contour);
  const r1 = n => Math.round(n * 10) / 10;
  const j = (k, i) => Math.sin(k * 7.3 + i * 2.9) * 1.3;          // petit désordre reproductible

  // dalle couchée sur un sol gy(x), de x1 à x2, épaisseur e
  const dalleSol = (x1, x2, e, gy, at, k = 0) => {
    const xm = (x1 + x2) / 2;
    return h.chemin([[x1 + 1, gy(x1) + 0.3], [xm, gy(xm) + 0.3], [x2 - 1, gy(x2) + 0.3], [x2, gy(x2) - e * 0.45 + j(k, 1)],
      [x2 - 2.5, gy(x2) - e + 0.4], [xm + 4 + j(k, 2), gy(xm) - e - 0.6], [x1 + 2.5, gy(x1) - e + 0.3 + j(k, 3) * 0.4],
      [x1, gy(x1) - e * 0.5]], at, true);
  };
  // motte de gazon qui bouche le joint entre deux dalles (a–b), dépasse un peu dessus
  const motte = (a, b, e, gy) => h.chemin([[a - 3, gy(a - 3) - e + 0.5], [a - 1, gy(a) - e - 4], [(a + b) / 2, gy((a + b) / 2) - e - 5.5],
    [b + 1, gy(b) - e - 4], [b + 3, gy(b + 3) - e + 0.5], [b, gy(b) - e], [b, gy(b) + 0.3], [a, gy(a) + 0.3], [a, gy(a) - e]],
    A.hachure('terre', 'detail'), true);
  // dalle vue de dessus
  const dalle = (x, y, l, ht, k) => h.chemin([[x + 1 + j(k, 0), y + j(k, 1) * 0.6], [x + l * 0.5, y - 0.6 + j(k, 2) * 0.5], [x + l - 1, y + 1 + j(k, 3) * 0.5],
    [x + l + j(k, 4) * 0.5, y + ht * 0.5], [x + l - 1, y + ht - 1 + j(k, 5) * 0.6], [x + l * 0.45, y + ht + 0.5], [x + 1, y + ht - 1 + j(k, 6) * 0.5],
    [x + j(k, 7) * 0.5, y + ht * 0.45]], bA, true);
  // bande de gazon entre deux dalles, vue de dessus
  const bandeGazon = (a, b, y, ht) => h.chemin([[a - 1.5, y + 2], [(a + b) / 2, y - 0.8], [b + 1.5, y + 2], [b + 2, y + ht * 0.5], [b + 1.5, y + ht - 2],
    [(a + b) / 2, y + ht + 0.8], [a - 1.5, y + ht - 2], [a - 2, y + ht * 0.5]], A.hachure('terre', 'detail'), true);
  // branche d'épaisseur w le long d'une polyligne (joints en onglet)
  const branche = (pts, w, at = bA) => {
    const G = [], D = [];
    const nrm = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy); return [-dy / n, dx / n]; };
    pts.forEach((p, i) => {
      const n1 = i > 0 ? nrm(pts[i - 1], p) : nrm(p, pts[i + 1]);
      const n2 = i < pts.length - 1 ? nrm(p, pts[i + 1]) : n1;
      let nx = n1[0] + n2[0], ny = n1[1] + n2[1]; const n = Math.hypot(nx, ny); nx /= n; ny /= n;
      const k = Math.min(2.5, 1 / Math.max(0.2, nx * n1[0] + ny * n1[1])) * w / 2;
      G.push([p[0] + nx * k, p[1] + ny * k]); D.push([p[0] - nx * k, p[1] - ny * k]);
    });
    return h.chemin([...G, ...D.reverse()], at, true);
  };
  // pièce de viande pendue
  const viande = (cx, top, w, ht, fin = false) => {
    const l = cx - w / 2, r = cx + w / 2, b = top + ht;
    const d = `M${r1(cx - 3)} ${top} Q${r1(r - 5)} ${r1(top - 1)} ${r1(r - 1)} ${r1(top + ht * 0.22)} Q${r1(r + 2)} ${r1(top + ht * 0.6)} ${r1(r - 3)} ${r1(b - 4)}`
      + ` Q${r1(cx + 4)} ${r1(b + 3)} ${r1(l + 4)} ${r1(b - 3)} Q${r1(l - 2)} ${r1(top + ht * 0.55)} ${r1(l + 1)} ${r1(top + ht * 0.2)} Q${r1(l + 4)} ${r1(top + 1)} ${r1(cx - 3)} ${top} Z`;
    const out = [h.path(d, bA)];
    if (!fin) out.push(
      h.path(`M${r1(r - 6)} ${r1(top + ht * 0.2)} Q${r1(r - 2.5)} ${r1(top + ht * 0.6)} ${r1(r - 8)} ${r1(b - 7)}`, A.detail),
      h.ligne(l + 7, top + ht * 0.45, cx + 3, top + ht * 0.4, A.fin),
      h.ligne(l + 8, top + ht * 0.7, cx + 5, top + ht * 0.65, A.fin));
    return out.join('\n');
  };
  // bûche de bouleau couchée, avec ses lenticelles
  const buche = (x1, y1, x2, y2, d) => {
    const a = Math.atan2(y2 - y1, x2 - x1), nx = -Math.sin(a) * d / 2, ny = Math.cos(a) * d / 2;
    const out = [h.chemin([[x1 + nx, y1 + ny], [x2 + nx, y2 + ny], [x2 - nx, y2 - ny], [x1 - nx, y1 - ny]], bA, true),
      h.ellipse(x2, y2, d * 0.22, d / 2, bA), h.ellipse(x2, y2, d * 0.1, d * 0.24, A.fin)];
    for (let t = 0.12; t < 0.8; t += 0.13) {
      const px = x1 + (x2 - x1) * t, py = y1 + (y2 - y1) * t, o = (Math.round(t * 100) % 2 ? 0.18 : -0.12) * d;
      out.push(h.ligne(px, py + o - d * 0.12, px, py + o + d * 0.12, A.detail));
    }
    return out.join('\n');
  };
  // paroi de baril en coupe, avec son cercle de roulement
  const paroi = (x, y1, y2, ya, s) => h.chemin([[x, y1], [x, ya - 4], [x + s, ya - 2], [x + s, ya + 2], [x, ya + 4], [x, y2]], A.contour);

  return {
    ref: '71-02',
    titre: 'Le fumoir de baril sur conduit enterré',
    desc: 'Fumoir monté avec ce qu’on trouve : un foyer creusé en bas de pente et couvert d’une pierre plate, une tranchée large d’une pelle couverte de pierres plates dont les joints sont bouchés de gazon, qui monte sur deux ou trois pas jusqu’à un baril debout ouvert aux deux bouts. En haut du baril, des bâtons de feuillu écorcés portent la viande sur des crochets taillés dans des fourches de bouleau, un thermomètre pend avec la viande, et une tôle posée de travers règle la sortie. En coupe dans l’axe, vu de dessus, le conduit en travers, le foyer et le haut du baril en détail.',
    format: 'pleine',
    disposition: [['coupe'], ['plan', 'travers'], ['foyer', 'haut']],
    hauteurs: [3, 1.35, 2.75],
    largeurs: [[1], [2.6, 1], [1, 1]],
    vues: {
      // ── Vue d'ensemble, coupe longitudinale ─────────────────────────────────────────
      coupe: {
        titre: 'En coupe, dans l’axe',
        dessin: z => {
          const gy = x => (x <= 430 ? 155 - 29 * x / 430 : 126);
          const fosse = [[55, gy(55)], [57, 166], [61, 180], [72, 187], [122, 187], [134, 181], [139, 172], [140, gy(140) + 24], [430, 150], [482, 150], [482, 126]];
          const o = [];
          o.push(h.chemin([[0, gy(0)], [430, 126], [600, 126], [600, 168], [440, 170], [300, 182], [200, 194], [150, 200], [0, 200]], A.hachure('terre', 'aucun'), true));
          o.push(h.chemin([...fosse, [430, 126], [55, gy(55)]], A.blanc, true));
          o.push(h.chemin(fosse, A.arete));
          o.push(h.ligne(0, gy(0), 55, gy(55), A.contour), h.ligne(55, gy(55), 80, gy(80), A.detail), h.ligne(482, 126, 600, 126, A.contour));
          // le feu
          [[68, 184, 2.2], [78, 185, 2.6], [90, 185, 2.2], [101, 185, 2.6], [112, 185, 2.2], [122, 184, 2]].forEach(([x, y, r]) => o.push(h.cercle(x, y, r, A.detail)));
          o.push(buche(64, 180, 104, 179, 7), buche(78, 173, 116, 172, 6.5));
          // pierre du foyer et pierre qu'on glisse
          o.push(dalleSol(80, 146, 8, gy, bA, 1));
          o.push(dalleSol(66, 110, 6, x => gy(x) - 8, bA, 2));
          // pierres du conduit et mottes aux joints
          o.push(motte(146, 152, 8, gy));
          for (let i = 0; i < 7; i++) {
            const a = 152 + i * 43;
            o.push(dalleSol(a, a + 36, 7, gy, bA, i + 3));
            if (i < 6) o.push(motte(a + 36, a + 43, 7, gy));
          }
          // le baril
          o.push(paroi(447, 25, 126, 58, -3), paroi(447, 25, 126, 92, -3), paroi(513, 25, 126, 58, 3), paroi(513, 25, 126, 92, 3));
          o.push(h.ligne(447, 25, 513, 25, A.arete), h.cercle(447, 25, 2.2, A.plein), h.cercle(513, 25, 2.2, A.plein));
          // crochets, viande, thermomètre
          o.push(h.ligne(478, 25, 480, 32, A.detail), h.ligne(496, 25, 498, 32, A.detail), h.ligne(460, 25, 460, 41.5, A.detail));
          o.push(viande(480, 31, 12, 34, true), viande(498, 31, 12, 30, true), h.cercle(460, 46, 4.5, bA));
          // bâtons et tôle
          [460, 478, 496].forEach(x => o.push(h.cercle(x, 22, 3, bA)));
          o.push(h.rect(469, 16, 72, 2.4, bA));
          // air, fumée
          o.push(h.fleche('M92 100 Q64 108 61 146', A.detail));
          o.push(h.fleche('M96 166 Q118 158 150 152 L420 134 Q451 132 451.5 112 L451.5 5', A.cache));
          // cote
          o.push(h.cote(140, 112, 447, 112, '2 ou 3 pas'), h.ligne(140, 118, 140, 136.5, A.fin));
          return o.join('\n');
        },
        renvois: z => [
          { n: 1, rond: [22, 118], cible: [56.8, 162], texte: 'foyer creusé en bas de pente' },
          { n: 2, rond: [300, 196], cible: [300, 161], texte: 'conduit : tranchée couverte' },
          { n: 3, rond: [562, 105], cible: [514.4, 105], texte: 'baril ouvert des deux bouts' },
        ],
      },

      // ── Vu de dessus ────────────────────────────────────────────────────────────────
      plan: {
        titre: 'Vu de dessus',
        dessin: z => {
          const X = x => 22 + (x - 55) * 0.76;
          const o = [];
          o.push(h.path('M26 18 L82 18 Q87 18 87 24 L87 56 Q87 62 82 62 L26 62 Q21 62 21 56 L21 24 Q21 18 26 18 Z', A.arete));
          o.push(h.chemin([[41, 12], [70, 10.5], [91, 13], [92.5, 40], [91, 67], [62, 69.5], [42, 68], [40, 40]], bA, true));
          o.push(h.chemin([[30, 22], [63, 16], [68, 55], [34, 61]], bA, true));
          const x0 = X(152), pas = 43 * 0.76, l = 36 * 0.76;
          for (let i = 0; i < 7; i++) o.push(dalle(x0 + i * pas, 22, l, 36, i + 1));
          o.push(bandeGazon(X(146), x0, 22, 36));
          for (let i = 0; i < 6; i++) o.push(bandeGazon(x0 + i * pas + l, x0 + (i + 1) * pas, 22, 36));
          o.push(h.ligne(X(140), 29, X(446), 29, A.cache), h.ligne(X(140), 51, X(446), 51, A.cache));
          // baril, bâtons, tôle
          o.push(h.cercle(X(480), 40, 25, bC), h.cercle(X(480), 40, 22.5, A.detail));
          [460, 478, 496].forEach(x => o.push(h.rect(X(x) - 2.3, 12, 4.6, 56, bA)));
          o.push(h.chemin([[X(469) + 2, 16], [X(469) + 52, 20], [X(469) + 48, 67], [X(469) - 2, 63]], bA, true));
          o.push(h.cercle(X(480), 40, 25, A.cache));
          return o.join('\n');
        },
        renvois: z => [
          { n: 4, rond: [146, 11], cible: [170, 22.2], texte: 'pierres plates en travers' },
          { n: 5, rond: [242, 69], cible: [226.6, 58.6], texte: 'joints bouchés de gazon' },
        ],
      },

      // ── Le conduit en travers ───────────────────────────────────────────────────────
      travers: {
        titre: 'Le conduit, en travers',
        dessin: z => [
          h.rect(4, 30, 152, 48, A.hachure('terre', 'aucun')),
          h.chemin([[48, 30], [48, 64], [52, 70], [108, 70], [112, 64], [112, 30]], A.blanc, true),
          h.chemin([[48, 30], [48, 64], [52, 70], [108, 70], [112, 64], [112, 30]], A.arete),
          h.ligne(4, 30, 19, 30, A.contour), h.ligne(141, 30, 156, 30, A.contour),
          h.chemin([[19, 30.3], [141, 30.3], [142.5, 24], [139, 18.5], [92, 17.4], [42, 18.2], [21, 19.6], [18, 25]], A.hachure('pierre'), true),
          h.ligne(48, 71, 48, 89, A.fin), h.ligne(112, 71, 112, 89, A.fin),
          h.cote(48, 86, 112, 86, 'une pelle', { cote: 'dessous' }),
        ].join('\n'),
        renvois: z => [],
      },

      // ── Le foyer, en coupe ──────────────────────────────────────────────────────────
      foyer: {
        titre: 'Le foyer, en coupe',
        dessin: z => {
          const gy = x => 60 - 0.04 * x;
          const fosse = [[45, gy(45)], [47, 90], [51, 125], [58, 150], [72, 164], [168, 165], [184, 152], [190, 125], [193, 95], [195, gy(195) + 40], [289, gy(289) + 40]];
          const o = [];
          o.push(h.chemin([[0, gy(0)], [289, gy(289)], [289, 187], [0, 187]], A.hachure('terre', 'aucun'), true));
          o.push(h.chemin([...fosse, [289, gy(289)], [45, gy(45)]], A.blanc, true));
          o.push(h.chemin(fosse, A.arete));
          o.push(h.ligne(0, gy(0), 45, gy(45), A.contour), h.ligne(45, gy(45), 88, gy(88), A.detail));
          // braises, bûches, motte
          [[66, 151, 2.4], [74, 158, 3], [84, 160, 2.2], [93, 161, 3], [103, 161, 2.4], [113, 161, 3], [123, 161, 2.2], [133, 161, 3],
            [143, 161, 2.4], [153, 161, 3], [161, 160, 2.2], [168, 158, 2]].forEach(([x, y, r]) => o.push(h.cercle(x, y, r, A.detail)));
          [[79, 162], [98, 163.5], [118, 163.5], [138, 163.5], [158, 163]].forEach(([x, y]) => o.push(h.cercle(x, y, 1.3, A.plein)));
          o.push(buche(62, 150, 120, 147, 14), buche(76, 138, 128, 136, 13));
          o.push(h.path('M136 160 Q134 148 144 144 Q156 139 166 143 Q175 148 173 158 Z', A.hachure('terre', 'arete')));
          [[143, 145], [150, 142], [157, 141], [164, 142.5], [170, 145.5]].forEach(([x, y], i) => o.push(h.ligne(x, y, x + (i % 2 ? 2 : -2), y - 6, A.detail)));
          // pierre du foyer, joint, première pierre du conduit, pierre qu'on glisse
          o.push(dalleSol(88, 204, 13, gy, A.hachure('pierre'), 1));
          o.push(motte(204, 213, 13, gy));
          o.push(dalleSol(213, 288, 13, gy, A.hachure('pierre'), 2));
          o.push(dalleSol(70, 140, 10, x => gy(x) - 13, A.hachure('pierre'), 3));
          o.push(h.fleche('M105 24 L86 24'), h.fleche('M105 24 L124 24'));
          // air, fumée
          o.push(h.fleche('M14 30 Q52 26 58 66', A.detail));
          o.push(h.fleche('M128 118 Q165 95 200 78 L282 72', A.cache));
          return o.join('\n');
        },
        renvois: z => [
          { n: 6, rond: [190, 14], cible: [178, 40.4], texte: 'pierre plate : le foyer couvert' },
          { n: 7, rond: [62, 12], cible: [72.6, 34.4], texte: 'entrée d’air, pierre mobile' },
          { n: 8, rond: [78, 100], cible: [99, 130.2], texte: 'bouleau ou aulne vert' },
          { n: 9, rond: [232, 150], cible: [173.8, 150], texte: 'gazon posé sur les braises' },
        ],
      },

      // ── Le haut du baril, en coupe ──────────────────────────────────────────────────
      haut: {
        titre: 'Le haut du baril, en coupe',
        dessin: z => {
          const o = [];
          o.push(paroi(50, 52, 184, 153, -5), paroi(240, 52, 184, 153, 5));
          o.push(h.ligne(50, 52, 240, 52, A.arete), h.cercle(50, 52, 3.2, A.plein), h.cercle(240, 52, 3.2, A.plein));
          // crochets taillés dans des fourches, sur les bâtons 2 et 3
          const crochet = sx => [
            branche([[sx + 1, 24], [sx + 4, 30], [sx + 11, 46], [sx + 12, 62], [sx + 11, 93]], 5),
            branche([[sx + 3, 30], [sx - 5, 33], [sx - 11, 40]], 4.2),
            h.ellipse(sx - 11, 40, 1.8, 2.4, A.fin),
            h.ligne(sx + 9.5, 66, sx + 14, 67.5, A.detail), h.ligne(sx + 9.5, 78, sx + 13.5, 79, A.detail),
          ].join('\n');
          o.push(viande(151, 88, 30, 80), viande(203, 86, 28, 72));
          // thermomètre pendu au premier bâton
          o.push(h.path('M88 98 L88 56 Q77 54 78.5 43 Q80.5 34 88 34.2', A.detail));
          o.push(h.cercle(88, 110, 12, bA));
          for (let k = 0; k <= 8; k++) {
            const a = (135 + k * 33.75) * Math.PI / 180;
            o.push(h.path(`M${r1(88 + Math.cos(a) * 8.5)} ${r1(110 + Math.sin(a) * 8.5)} L${r1(88 + Math.cos(a) * 11)} ${r1(110 + Math.sin(a) * 11)}`, A.fin));
          }
          o.push(h.ligne(88, 110, 95, 106, A.detail), h.cercle(88, 110, 1.4, A.plein));
          // bâtons de feuillu écorcés, vus en bout
          [88, 140, 192].forEach(x => o.push(h.cercle(x, 44, 8, bA), h.cercle(x, 44, 4.5, A.fin), h.cercle(x, 44, 1, A.plein)));
          o.push(crochet(140), crochet(192));
          // tôle posée sur les crochets, décalée
          o.push(h.rect(110, 16, 160, 3, bA));
          // fumée
          o.push(h.fleche('M62 180 L62 6', A.cache));
          return o.join('\n');
        },
        renvois: z => [
          { n: 10, rond: [96, 12], cible: [95.6, 39.6], texte: 'bâtons de feuillu écorcés' },
          { n: 11, rond: [116, 68], cible: [148.9, 68], texte: 'crochet : fourche de bouleau' },
          { n: 12, rond: [104, 150], cible: [96.5, 118.5], texte: 'thermomètre avec la viande' },
          { n: 13, rond: [265, 58], cible: [258, 19.3], texte: 'tôle de travers : la sortie' },
        ],
      },
    },
    danger: 'Danger — un fumoir est un feu étouffé : il fait du monoxyde de carbone, qui ne se sent pas. La fumée qu’on sent n’en dit rien. Jamais sous un auvent ni dans un abri.',
  };
};
