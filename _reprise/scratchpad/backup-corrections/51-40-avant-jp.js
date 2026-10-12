// Planche 51-40 — Le porc-épic : le retourner, l'ouvrir par le ventre, ôter un piquant
// (chapitre 51 : § 3 « Pourquoi ça marche » pour les zones sans piquants, § 4 étapes 9, 11, 16
// pour retourner et ouvrir, § 9 « Fabriquer la pince » étapes 4 à 6 pour le piquant).
// Aucune cote : le chapitre ne donne aucune mesure en mm de ce qui se construit (la pince est
// « grosse comme le pouce, fendue à la longueur de la main »). Le seul chiffre, 0,6 cm, est dans
// la légende, pas sur le dessin : c'est une chose à reconnaître, pas à construire.
module.exports = (h) => {
  const A = h.a;
  const BLANC = A.blanc.match(/fill="([^"]+)"/)[1];
  const blanc = (a) => a.replace('fill="none"', `fill="${BLANC}"`);
  const f = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const uni = (a) => { const n = Math.hypot(a[0], a[1]) || 1; return [a[0] / n, a[1] / n]; };
  const tourne = (a, deg) => { const r = deg * Math.PI / 180, c = Math.cos(r), s = Math.sin(r); return [a[0] * c - a[1] * s, a[0] * s + a[1] * c]; };
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

  // Catmull-Rom → Bézier : une courbe lisse par des points
  const lisse = (P, ferme = false) => {
    const n = P.length, g = (i) => (ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))]);
    let d = `M${f(P[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C${f([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${f([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${f(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  // hasard reproductible
  const hasard = (graine) => { let a = graine >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  // interpolation d'une ligne décrite par x décroissant
  const surX = (L, x) => {
    for (let i = 0; i < L.length - 1; i++) {
      const [a, b] = [L[i], L[i + 1]];
      if (x <= a[0] && x >= b[0]) return a[1] + (b[1] - a[1]) * (a[0] - x) / (a[0] - b[0]);
    }
    return x > L[0][0] ? L[0][1] : L[L.length - 1][1];
  };

  // ─── Le porc-épic de profil, la tête à droite, le sol en y = 0 ───────────────────────────
  // Unités locales : la bête fait 335 du nez au bout de la queue.
  const CORPS = [
    [161, -43], [159, -53], [151, -63], [136, -72], [116, -80], [92, -89], [56, -105], [12, -121], [-34, -129],
    [-80, -119], [-113, -96], [-141, -72], [-164, -51], [-174, -40],
    [-163, -33], [-136, -40], [-116, -48],
    [-118, -34], [-113, -18], [-112, -6], [-108, 0], [-74, 0], [-74, -5], [-84, -10], [-82, -22], [-72, -36],
    [-40, -27], [0, -23], [38, -30],
    [54, -35], [55, -20], [59, -8], [59, 0], [92, 0], [92, -4], [80, -8], [78, -20], [88, -38],
    [106, -42], [126, -36], [144, -34], [156, -36],
  ];
  const DOS = [[116, -80], [92, -89], [56, -105], [12, -121], [-34, -129], [-80, -119], [-113, -96], [-141, -72], [-164, -51], [-174, -40]];
  const LIMITE = [[116, -70], [100, -60], [80, -53], [40, -49], [0, -47], [-40, -48], [-80, -53], [-112, -58], [-140, -50], [-164, -43], [-174, -40]];
  const longueurPiquant = (x) => 10 + 26 * Math.exp(-(((x + 45) / 85) ** 2)) + (x < -125 ? 5 : 0);

  const piquantsProfil = (P) => {
    const r = hasard(51);
    const out = [];
    const rangs = 8;
    for (let k = 0; k < rangs; k++) {
      const v = k / (rangs - 1);
      for (let x = 110 - (k % 2) * 4; x > -172; x -= 7.5) {
        const xj = x + (r() - 0.5) * 3;
        const yT = surX(DOS, xj), yB = surX(LIMITE, xj);
        if (yB - yT < 4 && k > 0) continue;
        const B = [xj, yT + (yB - yT) * v + (r() - 0.5) * 2];
        // tangente vers la queue, relevée de 32° en haut, de 8° en bas
        const t = uni([-4, (surX(DOS, xj - 2) * (1 - v) + surX(LIMITE, xj - 2) * v) - (surX(DOS, xj + 2) * (1 - v) + surX(LIMITE, xj + 2) * v)]);
        const leve = xj > 40 ? 0.35 + 0.65 * Math.max(0, (90 - xj) / 50) : 1;   // à plat sur la nuque
        const d = tourne(t, (32 * (1 - v) + 8) * leve + (r() - 0.5) * 12);
        const L = longueurPiquant(xj) * (1 - 0.4 * v) * (0.8 + r() * 0.4);
        const B0 = k === 0 ? add(B, mul(d, -3)) : B;
        out.push(h.path(`M${f(P(B0))} L${f(P(add(B, mul(d, L))))}`, k === 0 ? A.detail : A.fin));
      }
    }
    return out.join('\n');
  };

  const porcProfil = (ox, oy, s) => {
    const P = (p) => [ox + s * p[0], oy + s * p[1]];
    const out = [];
    // les pattes du côté loin, à peine décalées, derrière
    const loin = (pts) => h.path(lisse(pts.map(P), true), blanc(A.detail));
    out.push(loin([[-100, -30], [-96, -6], [-92, 0], [-62, 0], [-60, -6], [-68, -30]]));
    out.push(loin([[64, -30], [66, -8], [66, 0], [98, 0], [98, -4], [86, -8], [88, -30]]));
    out.push(h.path(lisse(CORPS.map(P), true), blanc(A.detail)));
    // le contour appuyé des parties nues : queue dessous, pattes, ventre, poitrail, museau
    const iNu = CORPS.findIndex((p) => p[0] === -163);
    const nu = [...CORPS.slice(iNu), ...CORPS.slice(0, 5)];   // du dessous de la queue jusqu'au front
    out.push(h.path(lisse(nu.map(P)), A.arete));
    out.push(piquantsProfil(P));
    // griffes
    const griffe = (b, t) => h.path(`M${f(P(b))} Q${f(P(add(b, [t * 0.7, -3])))} ${f(P(add(b, [t, 2])))}`, A.detail);
    [[92, -3.5], [91, -2], [90, -0.5]].forEach((b) => out.push(griffe(b, 13)));
    [[-74, -4], [-75, -2], [-76, -0.5]].forEach((b) => out.push(griffe(b, 11)));
    // la face : truffe, œil, bouche, oreille, moustaches
    out.push(h.path(lisse([[161, -43], [160, -52], [154, -54], [151, -47], [154, -41]].map(P), true), A.plein));
    out.push(h.cercle(...P([137, -60]), 2.8 * s, A.plein));
    out.push(h.path(`M${f(P([155, -37]))} Q${f(P([150, -39]))} ${f(P([144, -37]))}`, A.detail));
    out.push(h.path(`M${f(P([117, -72]))} Q${f(P([110, -84]))} ${f(P([103, -73]))}`, A.detail));
    [[-7, 13], [-1, 15], [5, 13]].forEach(([dy, L]) => out.push(h.path(`M${f(P([152, -45]))} L${f(P([152 + L, -45 + dy]))}`, A.fin)));
    return { svg: out.join('\n'), P };
  };

  // ─── Le porc-épic vu de face (le museau vers l'œil), debout : centre du corps (0, -60) ───
  const FACE_CORPS = [[-68, -8], [-78, -42], [-70, -84], [-42, -112], [0, -121], [42, -112], [70, -84], [78, -42], [68, -8], [36, -2], [-36, -2]];
  const porcFace = (ox, oy, s, rot, sol) => {
    // rot : rotation de la bête autour du centre de son corps ; sol : y du sol dans la vue
    const C = [0, -60];
    const P = (p) => { const q = tourne([p[0] - C[0], p[1] - C[1]], rot); return [ox + s * q[0], oy + s * q[1]]; };
    const out = [];
    const r = hasard(7 + Math.round(rot));
    const sousSol = (p) => p[1] > sol - 1;
    // les piquants : en rayons autour du dos et des flancs
    const pq = [];
    for (let k = 0; k < 5; k++) {
      const rr = 0.62 + k * 0.1;
      for (let th = -198 + (k % 2) * 4; th <= 18; th += 7) {
        const t = th + (r() - 0.5) * 4, a = t * Math.PI / 180;
        const B = [C[0] + 74 * rr * Math.cos(a), C[1] + 60 * rr * Math.sin(a)];
        const d = tourne([Math.cos(a), Math.sin(a)], (r() - 0.5) * 16);
        const L = (k === 4 ? 26 : 13) * (0.8 + r() * 0.4) * (Math.sin(a) < 0 ? 1 : 0.7);
        const E = add(B, mul(d, L));
        if (sousSol(P(E)) || sousSol(P(B))) continue;
        pq.push(h.path(`M${f(P(B))} L${f(P(E))}`, k === 4 ? A.detail : A.fin));
      }
    }
    // pattes de devant, sous le poitrail, griffes vers le sol
    // membre court replié : bras vers le bas (+y), poignet plié, pied tourné vers le côté, plante nue
    const patte = (sx, x0, y0, pli) => {
      const Q = [[0, 0], [3, 12], [2 + pli * 0.3, 20], [pli, 25], [pli + 3 * Math.sign(pli), 31], [pli * 0.4, 30], [-6, 22], [-10, 10], [-10, 0]]
        .map(([x, y]) => [sx * (x0 + x), y0 + y]);
      const bout = [sx * (x0 + pli + 3 * Math.sign(pli)), y0 + 31];
      const g = [0, 2.5, 5].map((k) => {
        const b = add(bout, [-sx * Math.sign(pli) * k, -k * 0.6]);
        return h.path(`M${f(P(b))} Q${f(P(add(b, [sx * Math.sign(pli) * 5, 8])))} ${f(P(add(b, [sx * Math.sign(pli) * 1, 13])))}`, A.detail);
      });
      return [h.path(lisse(Q.map(P), true), blanc(A.arete)), ...g].join('\n');
    };
    out.push(h.path(lisse(FACE_CORPS.map(P), true), blanc(A.detail)));
    out.push(pq.join('\n'));
    // le poitrail et le ventre, nus, au trait
    out.push(h.path(lisse([[-66, -30], [-60, -12], [-36, -3], [0, -1], [36, -3], [60, -12], [66, -30]].map(P)), A.arete));
    out.push(patte(1, 42, -22, 10), patte(-1, 30, -26, -12));
    // la tête
    // la tête : large au front, le museau long qui s'avance vers le ventre
    const TETE = [[0, -86], [22, -82], [28, -66], [22, -48], [12, -30], [7, -18], [0, -15], [-7, -18], [-12, -30], [-22, -48], [-28, -66], [-22, -82]];
    [1, -1].forEach((sx) => out.push(h.path(lisse([[sx * 20, -80], [sx * 25, -85], [sx * 28, -78]].map(P)), A.detail)));
    out.push(h.path(lisse(TETE.map(P), true), blanc(A.arete)));
    out.push(h.ellipse(...P([0, -20]), 5.5 * s, 4 * s, A.plein));
    out.push(h.cercle(...P([-12, -56]), 2.2 * s, A.plein), h.cercle(...P([12, -56]), 2.2 * s, A.plein));
    // piquants du front et des joues, qui débordent du contour de la tête
    const rt = hasard(17);
    [[0, -86], [-8, -86], [8, -86], [-15, -85], [15, -85], [-21, -82], [21, -82], [-25, -75], [25, -75], [-28, -67], [28, -67], [-26, -58], [26, -58]].forEach((b) => {
      const d = tourne(uni([b[0], b[1] + 55]), (rt() - 0.5) * 20);
      out.push(h.path(`M${f(P(add(b, mul(d, -7))))} L${f(P(add(b, mul(d, 9 + rt() * 5))))}`, A.fin));
    });
    return { svg: out.join('\n'), P };
  };

  // ─── Vue 1 : de profil, les zones sans piquants ──────────────────────────────────────────
  const profil = (z) => {
    const s = Math.min((z.l - 20) / 345, (z.h - 14) / 170);
    const ox = z.l / 2 + 6 * s, oy = z.h - 8;
    const b = porcProfil(ox, oy, s);
    const svg = [h.ligne(ox - 185 * s, oy, ox + 172 * s, oy, A.detail), b.svg].join('\n');
    const P = b.P;
    return {
      svg,
      renvois: [
        { n: 1, rond: P([150, -110]), cible: P([146, -52]), texte: 'museau nu' },
        { n: 2, rond: add(P([118, -14]), [6, 0]), cible: P([78, 0]), texte: 'pattes nues' },
        { n: 3, rond: P([26, -10]), cible: P([4, -24]), texte: 'dessous du corps nu' },
      ],
    };
  };

  // ─── Vue 2 : retourner au bâton (vu du museau) ───────────────────────────────────────────
  // La bête couchée sur le flanc, le ventre à gauche, le dos à droite. Le bâton se glisse sous
  // elle côté ventre ; on soulève, elle roule sur le dos (la vue 3 la montre calée).
  const retourner = (z) => {
    const sol = z.h - 8;
    const s = Math.min((z.l - 80) / 160, (z.h - 30) / 186);
    const out = [h.ligne(6, sol, z.l - 6, sol, A.detail)];
    const xa = z.l - 10 - 90 * s, ya = sol - 76 * s;
    const a = porcFace(xa, ya, s, 90, sol);
    out.push(a.svg);
    // le bâton passe sous le flanc du ventre, entre la bête et le sol, la pointe au-delà
    const t0 = [xa - 44 * s, sol - 5], dirB = uni([-1, -0.3]);
    const t1 = add(t0, mul(dirB, (t0[0] - 8) / Math.abs(dirB[0])));
    const n = [-dirB[1], dirB[0]], e = 4.2;
    out.push(h.chemin([add(t0, mul(n, e)), add(t1, mul(n, e)), add(t1, mul(n, -e)), add(t0, mul(n, -e))], blanc(A.arete), true));
    // on soulève le bâton : la bête roule sur le dos (flèche par-dessus, de gauche à droite)
    const c = [xa, ya], R = 108 * s;
    const pol = (deg) => add(c, [R * Math.cos(deg * Math.PI / 180), R * Math.sin(deg * Math.PI / 180)]);
    out.push(h.fleche(`M${f(pol(-158))} A${R.toFixed(1)} ${R.toFixed(1)} 0 0 1 ${f(pol(-40))}`));
    const lv = lerp(t0, t1, 0.88);
    out.push(h.fleche(`M${f(add(lv, [-2, 12]))} L${f(add(lv, [-2, -18]))}`));
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 4, rond: add(lerp(t0, t1, 0.16), [-30, -46]), cible: lerp(t0, t1, 0.16), texte: 'bâton glissé côté ventre' },
      ],
    };
  };

  // ─── Vue 3 : sur le dos, vue de dessus : le ventre nu et l'incision ──────────────────────
  const dessous = (z) => {
    const s = Math.min((z.h - 12) / 392, (z.l - 10) / 296);
    const ox = z.l / 2, oy = z.h / 2 + 14 * s;
    const P = (p) => [ox + s * p[0], oy + s * p[1]];
    const Pm = (p) => P([-p[0], p[1]]);
    const out = [];
    const r = hasard(3);
    // les bûches, de chaque côté
    const buche = (sx) => {
      const x0 = sx * 128, w = 20;
      const pts = [[x0 - w, -118], [x0 + w, -118], [x0 + w, 124], [x0 - w, 124]].map(P);
      const ecorce = [];
      for (let i = -1; i <= 1; i++) {
        const x = x0 + i * 9;
        ecorce.push(h.path(`M${f(P([x, -108 + Math.abs(i) * 16]))} L${f(P([x + 1, 10 + i * 12]))}`, A.fin));
        ecorce.push(h.path(`M${f(P([x - 1, 36 + i * 10]))} L${f(P([x, 114 - Math.abs(i) * 14]))}`, A.fin));
      }
      return [h.chemin(pts, blanc(A.arete), true), ...ecorce].join('\n');
    };
    out.push(buche(-1), buche(1));
    // le corps, vu par le ventre
    const cote = [[0, -178], [13, -173], [25, -156], [33, -134], [40, -113], [62, -88], [76, -50], [80, 0], [76, 50], [64, 88], [48, 114], [26, 133],
      [22, 165], [13, 193], [0, 203]];
    const contour = [...cote, ...cote.slice(1, -1).reverse().map(([x, y]) => [-x, y])];
    // la frange de piquants des flancs, écrasés vers l'extérieur par la bête couchée sur le dos
    const demi = cote.map(([x, yy]) => [-yy, x]);
    const frange = [];
    for (let k = 0; k < 2; k++) {
      for (let y = -126; y <= 196; y += 6.5) {
        const yj = y + (k ? 3 : 0) + (r() - 0.5) * 2;
        const xb = surX(demi, -yj);
        const L = (y < -100 ? 14 : y > 135 ? 16 : 24) * (0.8 + r() * 0.4) * (k ? 0.7 : 1);
        [1, -1].forEach((sx) => {
          const B = [sx * (xb - 6), yj];
          const d = uni([sx * 1, 0.55 + (r() - 0.5) * 0.4 + (y > 135 ? 0.6 : 0)]);
          frange.push(h.path(`M${f(P(B))} L${f(P(add(B, mul(d, L + 6))))}`, k ? A.fin : A.detail));
        });
      }
    }
    out.push(frange.join('\n'));
    // les pattes, levées : devant près du poitrail, derrière vers le bas
    const patteAv = [[58, -92], [84, -108], [98, -122], [110, -128], [112, -118], [102, -104], [80, -80], [70, -70]];
    const patteAr = [[62, 70], [90, 88], [110, 106], [120, 116], [112, 126], [96, 116], [72, 102], [52, 98]];
    const griffes = (Q, base, dir) => base.map((b) => { const e = add(b, mul(uni(dir), 10)); return h.path(`M${f(Q(b))} Q${f(Q(add(lerp(b, e, 0.5), [2, -1])))} ${f(Q(e))}`, A.detail); });
    const gAv = [[108, -127], [111, -123], [112.5, -119], [111, -115]], dAv = [1, -0.6];
    const gAr = [[119, 117], [118, 121], [115, 124], [112, 126], [108, 125]], dAr = [0.8, 0.8];
    [P, Pm].forEach((Q) => {
      out.push(h.path(lisse(patteAv.map(Q), true), blanc(A.arete)), ...griffes(Q, gAv, dAv));
      out.push(h.path(lisse(patteAr.map(Q), true), blanc(A.arete)), ...griffes(Q, gAr, dAr));
    });
    out.push(h.path(lisse(contour.map(P), true), blanc(A.arete)));
    // le museau vu par-dessous : la truffe au bout, la bouche
    out.push(h.ellipse(...P([0, -170]), 7 * s, 5 * s, A.plein));
    out.push(h.path(`M${f(P([-9, -152]))} Q${f(P([0, -146]))} ${f(P([9, -152]))}`, A.detail));
    // la queue : ses soies dessous
    for (let y = 150; y <= 192; y += 8) out.push(h.path(`M${f(P([-8, y]))} L${f(P([0, y + 6]))} L${f(P([8, y]))}`, A.fin));
    // l'anus
    out.push(h.ellipse(...P([0, 128]), 3 * s, 4 * s, A.detail));
    // l'incision : ligne médiane de la gorge à l'anus, puis chaque patte par l'intérieur
    out.push(h.path(`M${f(P([0, -128]))} L${f(P([0, 122]))}`, A.cache));
    const branche = (Q, pts, anneau) => [h.path(lisse(pts.map(Q)), A.cache), h.path(lisse(anneau.map(Q), true), A.cache)].join('\n');
    [P, Pm].forEach((Q) => {
      out.push(branche(Q, [[0, -62], [34, -72], [64, -86], [86, -104], [98, -112]], [[94, -120], [104, -116], [102, -106], [92, -110]]));
      out.push(branche(Q, [[0, 106], [34, 100], [62, 94], [84, 102], [100, 112]], [[98, 104], [106, 112], [100, 122], [92, 114]]));
    });
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 5, rond: P([128, -150]), cible: P([128, -104]), texte: 'deux bûches qui la calent' },
        { n: 6, rond: P([36, 12]), cible: P([0, -8]), texte: 'incision, gorge à l’anus' },
        { n: 7, rond: P([-52, 70]), cible: Pm([40, 99]), texte: 'les pattes, par l’intérieur' },
      ],
    };
  };

  // ─── Vue 4 : ôter un piquant, en coupe dans la peau ──────────────────────────────────────
  const oter = (z) => {
    const out = [];
    const ys = z.h * 0.6, ep = 8;
    const E = [z.l * 0.56, ys];            // entrée du piquant
    const dIn = uni([-0.34, 1]), dOut = mul(dIn, -1), nq = [-dIn[1], dIn[0]];
    // la peau retenue : un petit creux sous le bout de bois, à gauche de l'entrée
    const xb = E[0] - 34;
    const surf = (x) => ys + 2.5 * Math.exp(-(((x - xb) / 9) ** 2));
    const S = [];
    for (let x = 6; x <= z.l - 6; x += 3) S.push([x, surf(x)]);
    const ond = [];
    for (let x = z.l - 6; x >= 6; x -= 6) ond.push([x, z.h - 8 + 2.5 * Math.sin(x / 8)]);
    out.push(h.chemin([...S, ...ond], blanc(A.arete), true));
    out.push(h.chemin(S.map(([x, y]) => [x, y + ep]), A.detail));
    // le piquant : planté de biais, les aiguillons au bout, dans la chair
    const w = 2.6, Lin = 82, Lout = 150;
    const Q = (s, t) => add(add(E, mul(dIn, s)), mul(nq, t));
    const pointe = Q(Lin, 0);
    out.push(h.chemin([Q(-Lout, w), Q(Lin - 18, w), pointe, Q(Lin - 18, -w), Q(-Lout, -w)], blanc(A.detail), true));
    for (let s = Lin - 24; s < Lin - 3; s += 3.4) {
      const tt = w * (1 - Math.max(0, s - (Lin - 18)) / 18);
      [1, -1].forEach((sg) => {
        const b = Q(s, sg * tt), e = add(b, add(mul(dOut, 3.4), mul(nq, sg * 2.4)));
        out.push(h.path(`M${f(b)} L${f(e)}`, A.fin));
      });
    }
    // la pince : les deux moitiés de chaque côté du piquant, serrées au ras de la peau,
    // qui continuent vers le haut hors de la vue
    const smax = (ys - 6) / dIn[1];
    const a = (sg, s) => Q(-s, sg * (w + 0.3 + s * 0.02));
    const b = (sg, s) => Q(-s, sg * (w + 0.3 + s * 0.02 + 11));
    [1, -1].forEach((sg) => {
      out.push(h.chemin([a(sg, smax), a(sg, 3), b(sg, 3), b(sg, smax)], blanc(A.arete)));
      out.push(h.chemin([a(sg, smax), add(lerp(a(sg, smax), b(sg, smax), 0.35), mul(dIn, 3)), add(lerp(a(sg, smax), b(sg, smax), 0.65), mul(dIn, -3)), b(sg, smax)], A.detail));
    });
    // tirer d'un coup sec, dans l'axe
    const f0 = add(Q(-40, 0), mul(nq, -30)), f1 = add(Q(-100, 0), mul(nq, -30));
    out.push(h.fleche(`M${f(f0)} L${f(f1)}`));
    // le bout de bois qui retient la peau, à gauche
    const bw = 7;
    out.push(h.chemin([[xb - bw - 10, 8], [xb - bw, surf(xb) - 0.5], [xb + bw, surf(xb) - 0.5], [xb + bw - 10, 8]], blanc(A.arete)));
    out.push(h.chemin([[xb - bw - 10, 8], [xb - bw - 5, 5], [xb - 3, 11], [xb + bw - 10, 8]], A.detail));
    out.push(h.fleche(`M${f([xb - bw - 20, ys - 70])} L${f([xb - bw - 14, ys - 36])}`));
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 8, rond: add(Q(-18, 0), mul(nq, 30)), cible: Q(-10, w + 8), texte: 'pince au ras de la peau' },
        { n: 9, rond: [xb - bw - 26, ys - 18], cible: [xb - 8, ys - 14], texte: 'bois qui retient la peau' },
        { n: 10, rond: add(pointe, [-30, 2]), cible: Q(Lin - 12, w + 1), texte: 'aiguillons, dans la chair' },
        { n: 11, rond: add(f1, add(mul(nq, -14), mul(dIn, -2))), cible: lerp(f0, f1, 0.8), texte: 'coup sec, dans l’axe' },
      ],
    };
  };

  // ─── Vue 5 : la pince de bois vert ───────────────────────────────────────────────────────
  const pince = (z) => {
    const out = [];
    const cx = z.l * 0.5, yh = 10, yb = z.h - 10;
    const Ltot = yb - yh, D = Ltot / 12, r = D / 2;
    const yF = yh + Ltot * 0.24;           // le haut de la fente
    const yC = yF + D * 0.7;               // le coin
    const yL = yC + D * 0.55;              // la ligature, juste sous le coin
    const gC = 3.4, ouv = 6;               // demi-écart au coin, demi-écart de plus aux mâchoires
    const ecart = (y) => (y <= yF ? 0 : y <= yC ? gC * (y - yF) / (yC - yF) : gC + ouv * (y - yC) / (yb - yC));
    // le bout non fendu, en haut, arrondi
    out.push(h.path(`M${f([cx - r, yF + 1])} L${f([cx - r, yh + 5])} Q${f([cx, yh - 4])} ${f([cx + r, yh + 5])} L${f([cx + r, yF + 1])}`, blanc(A.arete)));
    // les deux moitiés, de la fente aux mâchoires
    const moitie = (sg) => {
      const pts = [];
      for (let y = yF; y < yb; y += 4) pts.push([cx + sg * ecart(y), y]);
      pts.push([cx + sg * ecart(yb), yb]);
      const ext = pts.map(([x, y]) => [x + sg * r, y]).reverse();
      return h.chemin([...pts, ...ext], blanc(A.arete), true);
    };
    out.push(moitie(-1), moitie(1));
    // le fil du bois, le long des moitiés
    [-1, 1].forEach((sg) => out.push(h.path(`M${f([cx + sg * (ecart(yF + 60) + r * 0.5), yF + 60])} L${f([cx + sg * (ecart(yb - 30) + r * 0.5), yb - 30])}`, A.fin)));
    out.push(h.ligne(cx - r * 0.4, yh + 10, cx - r * 0.35, yF - 6, A.fin), h.ligne(cx + r * 0.35, yh + 14, cx + r * 0.4, yF - 8, A.fin));
    // le coin, vu par son bout : il tient la fente ouverte
    out.push(h.rect(cx - gC - 0.2, yC - 4, 2 * gC + 0.4, 9, A.hachure('bois', 'detail')));
    // la ligature : cinq tours juste sous le coin
    const tours = [];
    for (let i = 0; i < 5; i++) {
      const y = yL + i * 3.8, g = ecart(y);
      tours.push({ pts: [[cx - g - r - 1.5, y + 1.4], [cx + g + r + 1.5, y - 1.4]], ep: 3.2, debut: 'ouvert', fin: 'ouvert' });
    }
    out.push(h.formes.cordes(tours).toString());
    // les bouts recoupés à plat
    const xe = ecart(yb);
    out.push(h.ligne(cx - xe - r, yb, cx - xe, yb, A.contour), h.ligne(cx + xe, yb, cx + xe + r, yb, A.contour));
    // le geste : on serre, les mâchoires se ferment
    out.push(h.fleche(`M${f([cx - xe - r - 14, yb - 46])} L${f([cx - xe - r - 3, yb - 46])}`), h.fleche(`M${f([cx + xe + r + 14, yb - 46])} L${f([cx + xe + r + 3, yb - 46])}`));
    const xR = cx + r + 26, xG = cx - r - 26;
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 12, rond: [xR, yh + 34], cible: [cx + r - 1, yh + 40], texte: 'bâton vert fendu' },
        { n: 13, rond: [xG, yC - 4], cible: [cx - gC, yC], texte: 'petit coin de bois' },
        { n: 14, rond: [xR + 2, yL + 12], cible: [cx + ecart(yL + 8) + r + 1, yL + 8], texte: 'ligature sous le coin' },
        { n: 15, rond: [xR + 6, yb - 12], cible: [cx + xe + r * 0.6, yb - 2], texte: 'bouts recoupés à plat' },
      ],
    };
  };

  const vue = (titre, fn) => ({ titre, dessin: (z) => fn(z).svg, renvois: (z) => fn(z).renvois });

  return {
    ref: '51-40',
    titre: 'Le porc-épic : le retourner, l’ouvrir par le ventre, ôter un piquant',
    desc: 'De profil, le porc-épic : piquants sur le dos, les flancs et la queue ; museau, pattes et dessous du corps nus. '
      + 'Vu du museau, la bête couchée sur le flanc, un bâton glissé sous elle côté ventre : on soulève, elle roule sur le dos. '
      + 'Vue de dessus, la bête sur le dos calée entre deux bûches : le ventre nu, l’incision en tireté sur la ligne médiane de la gorge à l’anus, et le long de l’intérieur de chaque patte. '
      + 'En coupe dans la peau, un piquant planté de biais, ses aiguillons au bout dans la chair, la pince de bois serrée au ras de la peau et un bout de bois qui retient la peau à côté ; la flèche tire dans l’axe. '
      + 'Enfin la pince : un bâton vert fendu, un petit coin en haut de la fente, une ligature juste sous le coin, les deux bouts recoupés à plat.',
    format: 'pleine',
    disposition: [['profil', 'retourner'], ['dessous', 'oter', 'pince']],
    hauteurs: [1, 1.45],
    largeurs: [[1.3, 1], [1, 1.25, 0.6]],
    vues: {
      profil: vue('Où il n’y a pas de piquants', profil),
      retourner: vue('Retourner au bâton', retourner),
      dessous: vue('Calée sur le dos, ouvrir le ventre', dessous),
      oter: vue('Ôter un piquant, dans l’axe', oter),
      pince: vue('La pince de bois vert', pince),
    },
    danger: 'Danger — couper le piquant à ras avant de tirer ne sert à rien : les aiguillons sont au bout planté, dans la chair. Couper enlève la prise et laisse le piquant avancer.',
  };
};
