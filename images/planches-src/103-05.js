// Planche 103-05 — La coupe en spirale au gabarit (chapitre 103, étape 17 ; §9, « Le gabarit à lanière »).
// Refaite le 15 octobre 2026 : l'ancienne montrait le couteau à main levée, alors que le chapitre fait
// reposer la largeur sur le gabarit (« la largeur ne dépend plus de la main »).
//
// Le gabarit dessiné est celui du §9 : une lame plantée dans une fente de bûche, une cale de bois vissée à
// côté ; l'écart entre la cale et le fil fait la largeur ; on tire la peau, on ne pousse pas la lame. La
// variante des deux clous n'est pas dessinée : le chapitre ne dit pas ce qui coupe entre les deux clous.
// Montage vérifié contre leatherworker.net (fil « Cutting String (Rawhide) », 2010 : lame dans une fente,
// clou guide à côté, la peau appuyée contre le guide, on fait le tour du disque) : sources/103-gabarit-laniere.md.
//
// Trois vues : de côté (la lame plantée, son fil tourné vers la peau qui arrive, la lanière tirée ; pas de
// main : l'outil seul, la flèche dit le geste) ; dans l'axe de la lanière, en gros (la cale, l'écart, la lanière en coupe, la lame) ; la peau
// entière vue de dessus (le départ au bord, la suite de la coupe en spirale jusqu'au centre).
// Aucune cote chiffrée : la largeur se règle à l'essai (étape 18), l'écart est montré sans nombre.
'use strict';

const f1 = v => Math.round(v * 10) / 10;
const D = pts => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L');

// une ligne de cassure (la matière continue) de a à b
const cassure = (a, b, amp = 2, n = 2) => {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L, out = [];
  for (let i = 0; i <= n * 10; i++) {
    const t = i / (n * 10), o = Math.sin(t * n * 2 * Math.PI) * amp;
    out.push([a[0] + dx * t + nx * o, a[1] + dy * t + ny * o]);
  }
  return out;
};

// une bande d'épaisseur e le long d'une ligne médiane : le contour fermé (aller par un bord, retour par l'autre)
const bande = (m, e) => {
  const g = [], d = [];
  for (let i = 0; i < m.length; i++) {
    const a = m[Math.max(0, i - 1)], b = m[Math.min(m.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy) || 1, nx = -dy / n, ny = dx / n;
    g.push([m[i][0] + nx * e / 2, m[i][1] + ny * e / 2]);
    d.push([m[i][0] - nx * e / 2, m[i][1] - ny * e / 2]);
  }
  return { g, d, poly: g.concat(d.slice().reverse()) };
};
const bez = (p0, p1, p2, p3, n = 30) => {
  const out = [];
  for (let i = 0; i <= n; i++) {
    const s = i / n, m = 1 - s;
    out.push([0, 1].map(j => m * m * m * p0[j] + 3 * m * m * s * p1[j] + 3 * m * s * s * p2[j] + s * s * s * p3[j]));
  }
  return out;
};

// L'angle d'une main simple qui met l'axe de sa prise sur axe (degrés écran) et son avant-bras vers vers.
const poser = (h, o, axe, vers) => {
  const base = Object.assign({}, o, { angle: 0, avantbras: { longueur: 100 } }); delete base.objet;
  const e0 = h.formes.mainSimple(base); let best = null;
  for (const k of [0, 180]) {
    const a = axe - e0.prise.angle + k, m = h.formes.mainSimple(Object.assign({}, base, { angle: a }));
    const d = [m.coude[0] - m.poignet[0], m.coude[1] - m.poignet[1]], v = [vers[0] - m.poignet[0], vers[1] - m.poignet[1]];
    const c = (d[0] * v[0] + d[1] * v[1]) / ((Math.hypot(d[0], d[1]) * Math.hypot(v[0], v[1])) || 1);
    if (!best || c > best.c) best = { a, c };
  }
  return best.a;
};

module.exports = (h) => {
  const A = h.a;

  // ─── Vue de côté : la bûche debout, la lame plantée, la lanière tirée ─────────────────────
  const cote = z => {
    const Yt = Math.round(z.h * 0.5);     // le dessus de la bûche
    const bx0 = 40, bx1 = 330;            // les flancs de la bûche
    const ep = 4;                         // l'épaisseur de la peau
    // la lame : le fil monte en biais vers la droite, tourné vers la peau qui arrive de la gauche
    const L0 = 150, L1 = 234, Lh = 44;
    const lame = [[L0 - 5, Yt], [L0 + 32, Yt - Lh], [L1, Yt - Lh], [L1, Yt]];
    // la lanière : sort derrière la lame, au ras de la peau, et monte vers la droite ; son bout est libre
    const bout = [z.l - 40, 46];
    const mil = bez([L0 + 12, Yt - ep / 2], [L1 + 90, Yt - ep / 2], [bout[0] - 120, bout[1] + 70], bout, 40);
    const lan = bande(mil, ep);
    return { Yt, bx0, bx1, ep, L0, L1, Lh, lame, mil, lan, bout };
  };

  const dessinCote = z => {
    const g = cote(z), { Yt, bx0, bx1, ep } = g, out = [];
    const bas = z.h - 6;
    // la bûche : flancs d'écorce un peu irréguliers, cassure en bas (elle continue jusqu'au sol)
    // les flancs : une courbe douce, l'écorce un peu renflée
    const flanc = (x, b) => { const o = []; for (let i = 0; i <= 16; i++) { const t = i / 16; o.push([x + b * Math.sin(t * Math.PI) - 1.5 * t, Yt + (bas - Yt) * t]); } return o; };
    const flancG = flanc(bx0, -4), flancD = flanc(bx1, 4);
    const casB = cassure([bx0 - 1.5, bas], [bx1 - 1.5, bas], 2.2, 4);
    const corps = flancG.concat(casB.slice(1), flancD.slice().reverse().slice(1), [[bx0, Yt]]);
    out.push(h.chemin(corps, A.blanc, true));
    out.push(h.chemin(flancG, A.contour), h.chemin(flancD, A.contour), h.ligne(bx0, Yt, bx1, Yt, A.contour));
    out.push(h.chemin(casB, A.detail));
    // l'écorce : traits verticaux courts et rompus
    const ecorce = [[58, 16, 60], [80, 44, 112], [104, 12, 44], [124, 70, 132], [150, 50, 96], [176, 96, 150],
      [200, 24, 56], [222, 60, 124], [248, 30, 58], [268, 46, 104], [292, 76, 140], [312, 18, 50], [96, 104, 150], [246, 126, 160]];
    ecorce.forEach(([x, a, b]) => { const y0 = Yt + a, y1 = Math.min(Yt + b, bas - 8); if (y1 > y0 + 8) out.push(h.path(`M${x} ${y0} Q${x + 3} ${(y0 + y1) / 2} ${x - 1} ${y1}`, A.detail)); });
    // la partie plantée de la lame, dans la fente : en caché
    out.push(h.chemin([[g.L0 - 5, Yt], [g.L0 - 5, Yt + 34], [g.L1, Yt + 34], [g.L1, Yt]], A.cache));
    // la cale, derrière la lame (plan loin) : vissée sur le dessus, deux vis en caché
    const c0 = 92, c1 = 296, ch = 22;
    out.push(h.rect(c0, Yt - ch, c1 - c0, ch, A.loin), h.rect(c0, Yt - ch, c1 - c0, ch, A.arete));
    [110, 278].forEach(x => out.push(h.chemin([[x - 3, Yt - ch], [x - 3, Yt + 26], [x, Yt + 31], [x + 3, Yt + 26], [x + 3, Yt - ch]], A.cache)));
    // la lanière, derrière la lame, jusqu'à son bout libre
    const fin = [g.lan.g[g.lan.g.length - 1], g.lan.d[g.lan.d.length - 1]];
    out.push(h.chemin(g.lan.poly, A.blanc, true), h.chemin(g.lan.g, A.arete), h.chemin(g.lan.d, A.arete), h.ligne(...fin[0], ...fin[1], A.arete));
    // la lame, devant la lanière : fil en biais, biseau
    out.push(h.chemin(g.lame, A.blanc, true), h.chemin(g.lame, A.contour, true));
    out.push(h.ligne(g.L0 + 3, Yt - 1, g.L0 + 36, Yt - g.Lh + 6, A.arete));
    // la peau qui arrive, posée sur la bûche, devant la lame : bande mince, cassure à gauche et à droite
    const px0 = 8, px1 = 400;
    out.push(h.chemin([[px0, Yt - ep], [px1, Yt - ep], [px1, Yt], [px0, Yt]], A.blanc, true));
    out.push(h.ligne(px0, Yt - ep, px1, Yt - ep, A.arete), h.ligne(px0, Yt, bx0, Yt, A.arete), h.ligne(bx1, Yt, px1, Yt, A.arete));
    out.push(h.chemin(cassure([px0, Yt - ep - 2], [px0, Yt + 2], 1.4, 1), A.detail));
    out.push(h.chemin(cassure([px1, Yt - ep - 2], [px1, Yt + 2], 1.4, 1), A.detail));
    // le geste : on tire la lanière (rouge), le long de son trajet, au-dessus
    const fl = bez([g.L1 + 70, Yt - 30], [g.L1 + 128, Yt - 34], [g.bout[0] - 128, g.bout[1] + 44], [g.bout[0] - 62, g.bout[1] + 8], 20);
    out.push(h.geste(D(fl)));
    return out.join('\n');
  };

  // ─── Dans l'axe de la lanière : la cale, l'écart, la lanière en coupe, la lame ────────────
  const axe = z => {
    const Yt = 170, e = 13;              // le dessus de la bûche ; l'épaisseur de la peau
    const c0 = 30, c1 = 100, ch = 62;    // la cale
    const w = 24;                        // l'écart cale-fil : la largeur de la lanière
    const l0 = c1 + w, l1 = l0 + 7;      // la lame, vue par le dos
    return { Yt, e, c0, c1, ch, w, l0, l1, haut: Yt - 100 };
  };
  const dessinAxe = z => {
    const g = axe(z), { Yt, e, c0, c1, ch, l0, l1 } = g, out = [];
    const bas = z.h - 6;
    // le dessus de la bûche, coupée de partout : cassures sur les côtés et en bas
    const gauche = cassure([8, Yt], [8, bas], 2, 4), droite = cassure([z.l - 8, bas], [z.l - 8, Yt], 2, 4);
    const basC = cassure([8, bas], [z.l - 8, bas], 2, 6);
    out.push(h.chemin(gauche.concat(basC.slice(1), droite.slice(1)), A.blanc, true));
    out.push(h.ligne(8, Yt, z.l - 8, Yt, A.contour));
    [gauche, droite, basC].forEach(c => out.push(h.chemin(c, A.detail)));
    // la partie plantée de la lame, cachée
    out.push(h.chemin([[l0, Yt], [l0, Yt + 44], [l1, Yt + 44], [l1, Yt]], A.cache));
    // fil du bois
    [[30, 200, 250], [150, 196, 244], [196, 210, 262], [238, 194, 236], [66, 222, 262]].forEach(([x, y0, y1]) =>
      out.push(h.path(`M${x} ${y0} Q${x + 3} ${(y0 + y1) / 2} ${x - 1} ${y1}`, A.detail)));
    // la cale, vissée : la vis en caché
    out.push(h.rect(c0, Yt - ch, c1 - c0, ch, A.blanc), h.rect(c0, Yt - ch, c1 - c0, ch, A.contour));
    const xv = (c0 + c1) / 2;
    out.push(h.chemin([[xv - 8, Yt - ch], [xv - 3.5, Yt - ch + 7], [xv - 3.5, Yt + 30], [xv, Yt + 37], [xv + 3.5, Yt + 30], [xv + 3.5, Yt - ch + 7], [xv + 8, Yt - ch]], A.cache));
    // la peau qui reste, au-delà de la lame, et la lanière en coupe entre la cale et le fil
    const px1 = z.l - 22;
    out.push(h.rect(l1, Yt - e, px1 - l1, e, A.blanc));
    out.push(h.ligne(l1, Yt - e, px1, Yt - e, A.arete));
    out.push(h.chemin(cassure([px1, Yt - e - 2], [px1, Yt + 1], 1.4, 1), A.detail));
    out.push(h.rect(c1, Yt - e, l0 - c1, e, A.plein));
    // la lame, vue par le dos, debout dans la fente
    out.push(h.rect(l0, g.haut, l1 - l0, Yt - g.haut, A.blanc), h.rect(l0, g.haut, l1 - l0, Yt - g.haut, A.arete));
    // l'écart, sans nombre : il se règle à l'essai
    const yc = Yt - ch - 16;
    out.push(h.ligne(c1, Yt - ch - 3, c1, yc - 7, A.fin), h.ligne(c1, yc, l0, yc, A.detail));
    out.push(h.ligne(c1, yc - 5, c1, yc + 5, A.detail), h.ligne(l0, yc - 5, l0, yc + 5, A.detail));
    return out.join('\n');
  };

  // ─── La peau entière, vue de dessus ────────────────────────────────────────────────────────
  const peau = z => {
    const C = [z.l * 0.44, z.h * 0.6], R = 96, w = 12;
    const K = [C[0], C[1] - R];          // le point de coupe, au bord, contre la cale
    // le bord de ce qui reste : du fil (rayon R − w) au tour complet (rayon R), dans le sens horaire
    const P = (th, r) => [C[0] + r * Math.sin(th), C[1] - r * Math.cos(th)];
    return { C, R, w, K, P };
  };
  const dessinPeau = z => {
    const g = peau(z), { C, R, w, K, P } = g, out = [];
    // la bûche sous la peau (plan loin), et la cale vissée dessus, au bord de la peau
    out.push(h.cercle(K[0] + 4, K[1] + 6, 40, A.loin), h.cercle(K[0] + 4, K[1] + 6, 40, A.detail));
    out.push(h.rect(K[0] - 32, K[1] - 9, 64, 9, A.blanc), h.rect(K[0] - 32, K[1] - 9, 64, 9, A.arete));
    // la peau : bord en spirale, du fil (rayon R − w) jusqu'au tour complet (rayon R)
    const bord = [];
    for (let th = 0.02; th <= 2 * Math.PI; th += 0.03) bord.push(P(th, R - w + w * th / (2 * Math.PI)));
    bord.push(P(2 * Math.PI, R));
    // la lanière : de la lame vers la droite, elle se décolle et sort de la vue
    const mil = bez([K[0] - 2, K[1] + w / 2], [K[0] + 50, K[1] + w / 2], [z.l - 70, K[1] - 4], [z.l - 6, K[1] - 34], 30);
    const lan = bande(mil, w);
    const peauPoly = bord.concat([[K[0] - 2, K[1]], [K[0] - 2, K[1] + w]]);
    out.push(h.chemin(peauPoly, A.blanc, true), h.chemin(lan.poly, A.blanc, true));
    out.push(h.chemin(bord, A.contour), h.chemin(lan.g.slice(2), A.contour), h.chemin(lan.d, A.contour));
    // la suite de la coupe, en tireté : même pas à chaque tour, jusqu'au centre
    const suite = [];
    for (let th = 0; th <= 2 * Math.PI * ((R - w - 8) / w); th += 0.04) suite.push(P(th, R - w - w * th / (2 * Math.PI)));
    out.push(h.path(D(suite), A.cache));
    // la peau tourne à mesure qu'on tire (noir), la lanière est tirée (rouge)
    const arc = [];
    for (let th = 3.55; th <= 4.65; th += 0.04) arc.push(P(th, R + 14));
    out.push(h.fleche(D(arc), A.arete));
    out.push(h.geste(D(bez([K[0] + 74, K[1] - 14], [K[0] + 104, K[1] - 16], [z.l - 70, K[1] - 22], [z.l - 30, K[1] - 46], 16))));
    return out.join('\n');
  };

  return {
    ref: '103-05',
    titre: 'La coupe en spirale au gabarit',
    desc: 'Trois vues du gabarit à lanière. De côté : une lame plantée dans une fente du dessus d’une bûche, le fil tourné vers la peau qui arrive, une cale de bois vissée derrière elle ; la lanière sort derrière la lame et se tire vers le haut. Dans l’axe de la lanière : la cale, l’écart entre la cale et le fil, la lanière en coupe dans cet écart, la lame debout dans la fente. La peau vue de dessus : la coupe part du bord, contre la cale, et tourne vers le centre à pas constant.',
    format: 'pleine',
    disposition: [['cote'], ['axe', 'peau']],
    hauteurs: [4, 4],
    largeurs: [[1], [1, 1.15]],
    vues: {
      cote: {
        titre: 'De côté',
        dessin: dessinCote,
        renvois: z => {
          const g = cote(z);
          const m = g.mil[24];
          return [
            { n: 1, rond: [400, g.Yt + 92], cible: [g.L1 - 8, g.Yt + 20], texte: 'lame plantée dans une fente de la bûche' },
            { n: 2, rond: [70, g.Yt - 96], cible: [g.L0 + 14, g.Yt - g.Lh / 2 - 3], texte: 'le fil face à la peau qui arrive' },
            { n: 3, rond: [m[0] + 34, m[1] + 44], cible: [m[0] + 2, m[1] + 4], texte: 'tirer la lanière d’un mouvement régulier' },
          ];
        },
      },
      axe: {
        titre: 'Dans l’axe de la lanière',
        dessin: dessinAxe,
        renvois: z => {
          const g = axe(z);
          return [
            { n: 4, rond: [24, 34], cible: [g.c0 + 18, g.Yt - g.ch], texte: 'cale vissée, le bord de la peau contre' },
            { n: 5, rond: [g.l1 + 56, 40], cible: [(g.c1 + g.l0) / 2, g.Yt - g.ch - 16], texte: 'l’écart cale-fil fait la largeur' },
          ];
        },
      },
      peau: {
        titre: 'La peau, vue de dessus',
        dessin: dessinPeau,
        renvois: z => {
          const g = peau(z);
          const s = g.P(2.3, g.R - g.w - g.w * 2.3 / (2 * Math.PI));
          return [
            { n: 6, rond: [26, 30], cible: [g.K[0] - 32, g.K[1] - 5], texte: 'attaquer au bord, contre la cale' },
            { n: 7, rond: [z.l - 22, z.h - 30], cible: s, texte: 'tourner vers le centre, d’un seul tenant' },
          ];
        },
      },
    },
  };
};
