// Planche 29-07 — Exprimer le lait à la main (ch. 29, étape 84).
//
// Ce que le chapitre dit, et rien de plus : le pouce et l'index de part et d'autre de
// l'aréole, à 2 à 5 cm du mamelon ; enfoncer vers les côtes ; rapprocher les doigts en
// pince, relâcher, en rythme ; ne pas glisser sur la peau ni étirer le mamelon ; tourner
// autour du sein ; le lait en gouttes puis en petits jets, dans un contenant propre et large.
//
// Pas de main entière (passe qualité : la main « boule » faisait une pince de homard). Seuls
// les deux bouts de doigts posés sur la peau : la dernière phalange et un bout de la
// précédente, l'ongle visible, par le tube des doigts de la bibliothèque (h.formes._interne).
// De face (vue 1), on les voit de dos, l'ongle vers l'œil, sur une même ligne verticale qui
// passe par le mamelon, là où tombent les empreintes de la vue 4. De profil (vues 2 et 3), le
// sein est une goutte qui part de la paroi : pente douce dessus, rondeur dessous qui revient à
// la poitrine, mamelon au bout ; l'index sur le dessus, le pouce dessous, en biais, la pulpe
// enfoncée dans la peau. Les doigts restent à la même place d'une vue à l'autre : on ne glisse
// pas. Un geste, pas une construction : aucune cote.
module.exports = (h) => {
  const A = h.a, F = h.formes, I = F._interne, RAD = Math.PI / 180;
  const f = v => Math.round(v * 10) / 10;
  const P = p => `${f(p[0])} ${f(p[1])}`;
  const blanc = t => A[t].replace('fill="none"', 'fill="#fff"');
  const pol = (C, r, t) => [C[0] + r * Math.cos(t * RAD), C[1] + r * Math.sin(t * RAD)];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k], lon = a => Math.hypot(a[0], a[1]);
  const uni = a => mul(a, 1 / (lon(a) || 1));
  const tourne = (a, d) => { const c = Math.cos(d * RAD), s = Math.sin(d * RAD); return [a[0] * c - a[1] * s, a[0] * s + a[1] * c]; };
  const E = 1.1;                       // unités de vue par mm
  const ID = p => p;
  const peindre = t => I.peindre([t], ID);
  const W = l => l.map(s => s.map(v => v * E));

  // ─── les bouts de doigts ─────────────────────────────────────────────────────────────────
  // De dos (vue de face du sein) : l'ongle vers l'œil, les rides de la jointure. Cp : le centre
  // de la pulpe ; t : le sens du doigt, vers son bout.
  function boutDos(Cp, t, pouce) {
    const Ld = (pouce ? 26 : 21) * E, Lm = (pouce ? 17 : 20) * E;
    const tip = add(Cp, mul(t, 0.4 * Ld)), dip = sub(Cp, mul(t, 0.6 * Ld)), p0 = sub(dip, mul(t, Lm));
    const w = pouce ? W([[11, 10.5], [10.5, 8.6]]) : W([[8.1, 7.1], [7.1, 6.1]]);
    return peindre(I.tube({ pts: [p0, dip, tip], sens: 1, dos: w, ventre: w,
      coussin: [-0.15, 0.15].map(v => v * E), bosseDos: [-0.15, 0.15].map(v => v * E),
      bout: 'rond', ongle: 'dessus', rides: [{ j: 1, n: 2, l: 0.5 }] }));
  }
  // De profil : la pulpe dans la peau, l'ongle de côté. Q : le fond de l'empreinte dans la peau ;
  // t : le long de la peau, vers le mamelon ; n : la normale qui sort de la peau. Le doigt arrive
  // en biais (INCL degrés), le bout vers la peau, la phalange d'avant qui s'en éloigne.
  const INCL = 22, PLI = 12;
  function boutProfil(Q, t, n, pouce) {
    const Ld = (pouce ? 26 : 21) * E, Lm = (pouce ? 17 : 20) * E;
    const dos = pouce ? W([[10, 9.3], [9.3, 7.4]]) : W([[7.1, 6.2], [6.2, 5.4]]);
    const ven = pouce ? W([[11, 10.2], [10.2, 8.2]]) : W([[8.7, 7.7], [7.7, 6.3]]);
    const gauche = [t[1], -t[0]], cote = (gauche[0] * n[0] + gauche[1] * n[1]) > 0 ? 1 : -1;
    // tourner t de +a (sens horaire à l'écran) le rapproche de la peau quand n est à gauche
    const d = tourne(t, INCL * cote), nd = mul([d[1], -d[0]], cote);     // nd : hors de la peau
    const Cp = add(Q, mul(nd, ven[1][0] * 0.8));
    const tip = add(Cp, mul(d, 0.4 * Ld)), dip = sub(Cp, mul(d, 0.6 * Ld));
    const p0 = sub(dip, mul(tourne(d, PLI * cote), Lm));
    return peindre(I.tube({ pts: [p0, dip, tip], sens: cote, dos, ventre: ven,
      coussin: [0.8, 0.9].map(v => v * E), bout: 'doigt', ongle: 'cote', plis: true }));
  }

  // ─── le sein de profil : la femme regarde à droite, la poitrine à gauche ───────────────────
  // Une goutte : la pente douce du dessus part de la paroi, le mamelon au bout, la rondeur du
  // dessous (le plus plein du sein) revient à la paroi dans le pli.
  const cub = (a, b, c, d, n) => Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, m = 1 - t;
    return [m * m * m * a[0] + 3 * m * m * t * b[0] + 3 * m * t * t * c[0] + t * t * t * d[0],
            m * m * m * a[1] + 3 * m * m * t * b[1] + 3 * m * t * t * c[1] + t * t * t * d[1]];
  });
  const AL = 8, D_DOIGT = 44;    // D_DOIGT : du mamelon à la pulpe, 40 mm (2 à 5 cm), comme de face
  // O : la paroi (x) à hauteur du mamelon (y). creux : { i, p } la profondeur et le sens dans
  // lequel la pulpe de l'index (i) et du pouce (p) enfonce la peau.
  function seinProfil(O, zh, creux) {
    const R = (x, y) => [O[0] + x, O[1] + y];
    const haut = cub(R(0, -108), R(6, -86), R(66, -42), R(114, -8), 48);
    const avant = cub(R(114, -8), R(121, -4), R(121, 7), R(112, 10), 14);
    const bas = [...cub(R(112, 10), R(96, 24), R(86, 58), R(54, 62), 36),
      ...cub(R(54, 62), R(28, 66), R(8, 54), R(2, 36), 24).slice(1)];
    const B = avant[7];                                    // la base du mamelon
    // les points de contact, à D_DOIGT du mamelon, sur le dessus et sur le dessous
    const chercher = (l) => { for (let i = 0; i < l.length; i++) if (lon(sub(l[i], B)) <= D_DOIGT) return i; return l.length - 1; };
    const iH = chercher(haut), kB = bas.length - 1 - chercher(bas.slice().reverse());
    const Qh = haut[iH], Qb = bas[kB];
    const tH = uni(sub(haut[Math.min(iH + 1, haut.length - 1)], haut[iH - 1]));   // vers le mamelon
    const tB = uni(sub(bas[kB - 1], bas[kB + 1]));                                   // vers le mamelon
    const nH = [tH[1], -tH[0]], nB = [-tB[1], tB[0]];        // hors de la peau : vers le haut, vers le bas
    const enfonce = (l) => l.map(p => {
      let q = p;
      for (const [Q, d] of [[Qh, creux.i], [Qb, creux.p]]) q = add(q, mul(d, Math.exp(-Math.pow(lon(sub(p, Q)) / (14 * E), 2))));
      return q;
    });
    const tour = enfonce([...haut, ...avant.slice(1), ...bas.slice(1)]);
    const Fd = bas[bas.length - 1];
    const svg = [
      h.chemin([[O[0], 4], ...tour], A.contour),
      h.chemin([[O[0], Fd[1] - 8], [O[0] + 2, zh - 4]], A.contour),     // la paroi, sous le pli
    ];
    // le mamelon, au bout, pointé un peu vers le bas ; sa base se fond dans le contour
    const u = [Math.cos(AL * RAD), Math.sin(AL * RAD)], v = [-u[1], u[0]];
    const q = (a, b) => P([B[0] + u[0] * a + v[0] * b, B[1] + u[1] * a + v[1] * b]);
    svg.push(h.path(`M ${q(-3, -6.5)} L ${q(0, -6)} C ${q(4, -6.5)} ${q(8, -4.5)} ${q(8, 0)} C ${q(8, 4.5)} ${q(4, 6.5)} ${q(0, 6)} L ${q(-3, 6.5)}`, blanc('arete')));
    return { svg: svg.join('\n'), bout: [B[0] + u[0] * 8, B[1] + u[1] * 8],
      index: { Q: add(Qh, creux.i), t: tH, n: nH }, pouce: { Q: add(Qb, creux.p), t: tB, n: nB } };
  }
  const doigtsProfil = s => [boutProfil(s.index.Q, s.index.t, s.index.n, false), boutProfil(s.pouce.Q, s.pouce.t, s.pouce.n, true)].join('\n');

  // ─── le sein de face ─────────────────────────────────────────────────────────────────────
  function seinFace(N) {
    const e = E;
    const d = [
      `M ${P([N[0] - 84 * e, N[1] - 86 * e])}`,
      `C ${P([N[0] - 104 * e, N[1] + 6 * e])} ${P([N[0] - 70 * e, N[1] + 80 * e])} ${P([N[0] - 2 * e, N[1] + 82 * e])}`,
      `C ${P([N[0] + 62 * e, N[1] + 82 * e])} ${P([N[0] + 98 * e, N[1] + 20 * e])} ${P([N[0] + 84 * e, N[1] - 80 * e])}`,
    ].join(' ');
    return [h.path(d, A.contour), h.cercle(N[0], N[1], 21 * e, A.arete), h.cercle(N[0], N[1], 6.5 * e, blanc('arete'))].join('\n');
  }

  // L'empreinte d'un bout de doigt : un ovale et deux tours de sillons.
  function empreinte(C, rx, ry, rot, tiret) {
    const ov = (k) => { const pts = []; for (let t = 0; t < 360; t += 12) { const x = rx * k * Math.cos(t * RAD), y = ry * k * Math.sin(t * RAD); pts.push([C[0] + x * Math.cos(rot * RAD) - y * Math.sin(rot * RAD), C[1] + x * Math.sin(rot * RAD) + y * Math.cos(rot * RAD)]); } return pts; };
    if (tiret) return h.chemin(ov(1), A.cache, true);
    return [h.chemin(ov(1), blanc('arete'), true), h.chemin(ov(0.62), A.fin, true), h.chemin(ov(0.28), A.fin, true)].join('\n');
  }

  function goutte(x, y, s) {
    return h.path(`M ${f(x)} ${f(y - 1.7 * s)} C ${f(x + 0.35 * s)} ${f(y - s)} ${f(x + s)} ${f(y - 0.1 * s)} ${f(x + s)} ${f(y + 0.35 * s)} A ${f(s)} ${f(s)} 0 0 1 ${f(x - s)} ${f(y + 0.35 * s)} C ${f(x - s)} ${f(y - 0.1 * s)} ${f(x - 0.35 * s)} ${f(y - s)} ${f(x)} ${f(y - 1.7 * s)} Z`, blanc('detail'));
  }

  // ─── les vues ────────────────────────────────────────────────────────────────────────────
  const rP = 40 * E;                                        // du mamelon à la pulpe, de face (vue 4)
  const faceN = z => [z.l * 0.56, z.h * 0.43];
  // vue 2 : les pulpes enfoncent la peau vers les côtes ; vue 3 : elles se rapprochent en plus
  const O2 = z => [z.l * 0.17, z.h * 0.5];
  const O3 = z => [z.l * 0.13, z.h * 0.39];
  const CREUX2 = { i: [-3.5, 6.5], p: [-3.5, -6.5] };
  const CREUX3 = { i: [-5, 8], p: [-5, -8] };

  return {
    ref: '29-07',
    titre: 'Exprimer le lait à la main',
    desc: 'Quatre temps : le bout du pouce et le bout de l’index posés de part et d’autre de l’aréole, sur une même ligne qui passe par le mamelon, vus de face ; de profil, les deux pulpes enfoncées dans la peau vers les côtes ; puis rapprochées l’une de l’autre en pince, le lait qui tombe en gouttes et en jets dans un contenant large ; enfin on relâche et on tourne autour du sein, montré par les empreintes des doigts.',
    format: 'pleine',
    disposition: [['placer', 'enfoncer'], ['pincer', 'tourner']],
    vues: {
      placer: {
        titre: '1. Placer',
        dessin: z => {
          const N = faceN(z), t = [1, 0];
          return [seinFace(N),
            boutDos(add(N, [0, -rP]), t, false),
            boutDos(add(N, [0, rP]), t, true),
          ].join('\n');
        },
        renvois: z => {
          const N = faceN(z);
          return [
            { n: 1, rond: [N[0] + 76, N[1] - 96], cible: [N[0] + 9, N[1] - rP - 3], texte: 'index, à 2 à 5 cm du mamelon' },
            { n: 2, rond: [N[0] + 82, N[1] + 96], cible: [N[0] + 12, N[1] + rP + 4], texte: 'pouce en face, sous l’aréole' },
          ];
        },
      },
      enfoncer: {
        titre: '2. Enfoncer',
        dessin: z => {
          const s = seinProfil(O2(z), z.h, CREUX2);
          const Qi = s.index.Q, Qp = s.pouce.Q;
          return [s.svg, doigtsProfil(s),
            h.fleche(`M ${P([Qi[0] + 56, Qi[1] - 24])} L ${P([Qi[0] + 16, Qi[1] - 24])}`, A.contour),
            h.fleche(`M ${P([Qp[0] + 58, Qp[1] + 22])} L ${P([Qp[0] + 20, Qp[1] + 22])}`, A.contour),
          ].join('\n');
        },
        renvois: z => {
          const s = seinProfil(O2(z), z.h, CREUX2), Qi = s.index.Q;
          return [{ n: 3, rond: [Qi[0] + 74, Qi[1] - 56], cible: [Qi[0] + 42, Qi[1] - 24], texte: 'enfoncer droit vers les côtes' }];
        },
      },
      pincer: {
        titre: '3. Pincer, relâcher',
        dessin: z => {
          const s = seinProfil(O3(z), z.h, CREUX3);
          const Qi = s.index.Q, Qp = s.pouce.Q, b = s.bout;
          // le contenant : large et bas, le lait au fond
          const bx = b[0] + 12, by = z.h - 46, bl = 62, bp = 30;
          const bol = `M ${P([bx - bl, by])} C ${P([bx - bl + 4, by + bp])} ${P([bx - 30, by + bp + 2])} ${P([bx, by + bp + 2])} C ${P([bx + 30, by + bp + 2])} ${P([bx + bl - 4, by + bp])} ${P([bx + bl, by])}`;
          const yl = by + 16;
          const lait = `M ${P([bx - bl + 8, yl])} L ${P([bx + bl - 8, yl])} C ${P([bx + bl - 12, by + bp])} ${P([bx + 26, by + bp + 1])} ${P([bx, by + bp + 1])} C ${P([bx - 26, by + bp + 1])} ${P([bx - bl + 12, by + bp])} ${P([bx - bl + 8, yl])} Z`;
          const jets = [
            `M ${P([b[0] + 1, b[1] - 1])} Q ${P([b[0] + 34, b[1] + 2])} ${P([b[0] + 46, by - 6])}`,
            `M ${P([b[0] + 1, b[1] + 2])} Q ${P([b[0] + 22, b[1] + 10])} ${P([b[0] + 29, by - 6])}`,
          ];
          return [s.svg, doigtsProfil(s),
            h.fleche(`M ${P([Qi[0] + 22, Qi[1] - 50])} L ${P([Qi[0] + 22, Qi[1] - 18])}`, A.contour),
            h.fleche(`M ${P([Qp[0] + 24, Qp[1] + 52])} L ${P([Qp[0] + 24, Qp[1] + 20])}`, A.contour),
            ...jets.map(d => h.path(d, A.cache)),
            goutte(b[0] + 3, b[1] + 22, 3.2), goutte(b[0] + 5, b[1] + 44, 3.2), goutte(b[0] + 6, by - 12, 3.2),
            h.path(lait, A.hachure('eau', 'aucun')), h.path(bol, A.contour),
            h.ligne(bx - bl + 8, yl, bx + bl - 8, yl, A.detail),
          ].join('\n');
        },
        renvois: z => {
          const s = seinProfil(O3(z), z.h, CREUX3), Qi = s.index.Q, b = s.bout;
          const bx = b[0] + 12, by = z.h - 46;
          return [
            { n: 4, rond: [Qi[0] + 56, Qi[1] - 52], cible: [Qi[0] + 22, Qi[1] - 40], texte: 'presser en pince, relâcher, en rythme' },
            { n: 5, rond: [b[0] + 40, b[1] - 34], cible: [b[0] - 3, b[1] - 4], texte: 'sans glisser ni étirer le mamelon' },
            { n: 6, rond: [b[0] + 62, b[1] + 26], cible: [b[0] + 30, b[1] + 22], texte: 'gouttes, puis petits jets' },
            { n: 7, rond: [bx - 84, by + 14], cible: [bx - 58, by + 10], texte: 'contenant propre et large' },
          ];
        },
      },
      tourner: {
        titre: '4. Tourner',
        dessin: z => {
          const N = [z.l * 0.5, z.h * 0.43];
          const out = [seinFace(N)];
          for (const [k, rot] of [[2, 90], [1, 45]]) {
            out.push(empreinte(pol(N, rP, -90 + rot), 9.5 * E, 7 * E, rot, true), empreinte(pol(N, rP, 90 + rot), 10.5 * E, 8 * E, rot, true));
          }
          out.push(empreinte(pol(N, rP, -90), 9.5 * E, 7 * E, 0, false), empreinte(pol(N, rP, 90), 10.5 * E, 8 * E, 0, false));
          const ra = rP + 20 * E;
          const arc = (t0, t1) => `M ${P(pol(N, ra, t0))} A ${f(ra)} ${f(ra)} 0 0 1 ${P(pol(N, ra, t1))}`;
          out.push(h.fleche(arc(-98, -50), A.contour), h.fleche(arc(82, 130), A.contour));
          return out.join('\n');
        },
        renvois: z => {
          const N = [z.l * 0.5, z.h * 0.43], ra = rP + 20 * E;
          return [
            { n: 8, rond: [N[0] - 122, N[1] - 50], cible: pol(N, rP, -90).map((v, i) => v - [6, 2][i]), texte: 'empreintes du pouce et de l’index' },
            { n: 9, rond: [N[0] + 92, N[1] - 96], cible: pol(N, ra, -66), texte: 'relâcher, tourner, reprendre' },
          ];
        },
      },
    },
  };
};
