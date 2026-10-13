// Planche 29-07 — Exprimer le lait à la main (ch. 29, étape 84).
//
// Ce que le chapitre dit, et rien de plus : le pouce et l'index de part et d'autre de
// l'aréole, à 2 à 5 cm du mamelon ; enfoncer vers les côtes ; rapprocher les doigts en
// pince, relâcher, en rythme ; ne pas glisser sur la peau ni étirer le mamelon ; tourner
// autour du sein ; le lait en gouttes puis en petits jets, dans un contenant propre et large.
//
// Refaite le 12 octobre (JP : « seins weird, refait tout »). Le sein est un pictogramme
// (règle 8) : de face, un rond fermé, l'aréole et le mamelon en deux cercles ; de profil, un
// dôme simple qui part de la paroi, le mamelon en petite bosse. Aucune anatomie de plus.
// La main est entière et vient de la bibliothèque (h.formes.main, pose « boule » : le « C »,
// le pouce dessus, les doigts dessous), l'avant-bras qui passe devant le torse. Elle reste à
// la même place sur le sein d'une vue à l'autre : on ne glisse pas. Un geste : aucune cote.
module.exports = (h) => {
  const A = h.a, F = h.formes, RAD = Math.PI / 180;
  const E = 0.92;                                 // unités de vue par mm
  const f = v => Math.round(v * 10) / 10;
  const P = p => `${f(p[0])} ${f(p[1])}`;
  const blanc = t => A[t].replace('fill="none"', 'fill="#fff"');
  const pol = (C, r, t) => [C[0] + r * Math.cos(t * RAD), C[1] + r * Math.sin(t * RAD)];

  // ─── le sein de face : un rond, l'aréole, le mamelon ───────────────────────────────────
  const RA = 21 * E, RM = 6 * E;
  function seinFace(N) {
    return [h.ellipse(N[0], N[1] + 4 * E, 62 * E, 58 * E, blanc('contour')),
      h.cercle(N[0], N[1], RA, A.arete), h.cercle(N[0], N[1], RM, blanc('arete'))].join('\n');
  }
  // la main de face : le « C » autour de l'aréole, le pouce dessus, l'index dessous, à 4 cm
  const mainFace = (N, angle = 0) => F.main({ x: N[0], y: N[1], pose: 'boule', vue: 'profil',
    diametre: 80 * E, echelle: E, bras: 28, serre: 0.7, angle });

  // ─── le sein de profil : la femme regarde à droite ─────────────────────────────────────
  // O : la paroi à hauteur du mamelon. Un dôme : la pente du dessus, l'arrondi du dessous qui
  // revient dans le pli. La ligne du torse continue au-dessus et sous le pli.
  function seinProfil(O, zh) {
    const R = (x, y) => [O[0] + x * E, O[1] + y * E];
    const dome = `M ${P(R(0, -70))} C ${P(R(30, -62))} ${P(R(86, -36))} ${P(R(94, -4))}` +
      ` C ${P(R(98, 28))} ${P(R(68, 60))} ${P(R(30, 60))} C ${P(R(14, 60))} ${P(R(4, 55))} ${P(R(0, 46))}`;
    const B = R(95, -2);                                       // le mamelon
    return {
      svg: [h.ligne(O[0], 4, O[0], O[1] - 70 * E, A.contour),
        h.ligne(O[0], O[1] + 46 * E, O[0] - 2, zh - 4, A.contour),
        h.path(dome + ` L ${P(R(0, -70))} Z`, 'fill="#fff" stroke="none"'), h.path(dome, A.contour),
        h.path(`M ${P(R(93.5, -8))} C ${P(R(100, -8.5))} ${P(R(102, -5))} ${P(R(102, -2))} C ${P(R(102, 1.5))} ${P(R(100, 4.5))} ${P(R(93.5, 4))}`, A.arete),
      ].join('\n'),
      bout: R(102, -2), B,
    };
  }
  // la main de profil : le même « C », le pouce sur le dessus du sein, l'index dessous
  const CP = [56, 2];
  const mainProfil = (O, dx = 0) => F.main({ x: O[0] + (CP[0] + dx) * E, y: O[1] + CP[1] * E, pose: 'boule', vue: 'profil',
    diametre: 82 * E, echelle: E, bras: 28, serre: 0.6 });

  function empreinte(C, rx, ry, rot, tiret) {
    const ov = (k) => { const pts = []; for (let t = 0; t < 360; t += 12) { const x = rx * k * Math.cos(t * RAD), y = ry * k * Math.sin(t * RAD); pts.push([C[0] + x * Math.cos(rot * RAD) - y * Math.sin(rot * RAD), C[1] + x * Math.sin(rot * RAD) + y * Math.cos(rot * RAD)]); } return pts; };
    if (tiret) return h.chemin(ov(1), A.cache, true);
    return [h.chemin(ov(1), blanc('arete'), true), h.chemin(ov(0.62), A.fin, true), h.chemin(ov(0.28), A.fin, true)].join('\n');
  }
  function goutte(x, y, s) {
    return h.path(`M ${f(x)} ${f(y - 1.7 * s)} C ${f(x + 0.35 * s)} ${f(y - s)} ${f(x + s)} ${f(y - 0.1 * s)} ${f(x + s)} ${f(y + 0.35 * s)} A ${f(s)} ${f(s)} 0 0 1 ${f(x - s)} ${f(y + 0.35 * s)} C ${f(x - s)} ${f(y - 0.1 * s)} ${f(x - 0.35 * s)} ${f(y - s)} ${f(x)} ${f(y - 1.7 * s)} Z`, blanc('detail'));
  }

  const faceN = z => [z.l * 0.6, z.h * 0.45];
  const O2 = z => [z.l * 0.22, z.h * 0.46];
  const O3 = z => [z.l * 0.2, z.h * 0.4];
  const rP = 40 * E;

  return {
    ref: '29-07',
    titre: 'Exprimer le lait à la main',
    desc: 'Quatre temps : la main en « C », le pouce au-dessus de l’aréole et l’index dessous, sur une même ligne qui passe par le mamelon, vue de face ; de profil, la main qui enfonce le sein vers les côtes ; puis le pouce et l’index rapprochés en pince, le lait qui tombe en gouttes et en jets dans un contenant large ; enfin on relâche et on tourne la main autour du sein, les empreintes de la prise d’avant restées en place.',
    format: 'pleine',
    disposition: [['placer', 'enfoncer'], ['pincer', 'tourner']],
    vues: {
      placer: {
        titre: '1. Placer',
        dessin: z => { const N = faceN(z); return [seinFace(N), mainFace(N)].join('\n'); },
        renvois: z => {
          const N = faceN(z);
          return [
            { n: 1, rond: [N[0] + 70, N[1] - 104], cible: [N[0] - 14, N[1] - rP - 10], texte: 'pouce, à 2 à 5 cm du mamelon' },
            { n: 2, rond: [N[0] + 96, N[1] + 92], cible: [N[0] + 30, N[1] + rP + 6], texte: 'index en face, sous l’aréole' },
          ];
        },
      },
      enfoncer: {
        titre: '2. Enfoncer',
        dessin: z => {
          const O = O2(z), s = seinProfil(O, z.h);
          const ax = O[0] + 78, ay = O[1] - 74;
          return [s.svg, mainProfil(O),
            h.fleche(`M ${P([ax, ay])} L ${P([ax - 40, ay])}`, A.contour),
            h.fleche(`M ${P([ax + 50, O[1] + 70])} L ${P([ax + 10, O[1] + 70])}`, A.contour),
          ].join('\n');
        },
        renvois: z => {
          const O = O2(z), ax = O[0] + 78, ay = O[1] - 82;
          return [{ n: 3, rond: [ax + 44, ay - 26], cible: [ax - 18, ay + 1], texte: 'enfoncer droit vers les côtes' }];
        },
      },
      pincer: {
        titre: '3. Pincer, relâcher',
        dessin: z => {
          const O = O3(z), s = seinProfil(O, z.h), b = s.bout;
          const bx = b[0] + 30, by = z.h - 40, bl = 60, bp = 28;
          const bol = `M ${P([bx - bl, by])} C ${P([bx - bl + 4, by + bp])} ${P([bx - 30, by + bp + 2])} ${P([bx, by + bp + 2])} C ${P([bx + 30, by + bp + 2])} ${P([bx + bl - 4, by + bp])} ${P([bx + bl, by])}`;
          const yl = by + 15;
          const lait = `M ${P([bx - bl + 8, yl])} L ${P([bx + bl - 8, yl])} C ${P([bx + bl - 12, by + bp])} ${P([bx + 26, by + bp + 1])} ${P([bx, by + bp + 1])} C ${P([bx - 26, by + bp + 1])} ${P([bx - bl + 12, by + bp])} ${P([bx - bl + 8, yl])} Z`;
          const jets = [
            `M ${P([b[0] + 1, b[1] - 1])} Q ${P([b[0] + 40, b[1] + 0])} ${P([b[0] + 52, by - 6])}`,
            `M ${P([b[0] + 1, b[1] + 2])} Q ${P([b[0] + 28, b[1] + 8])} ${P([b[0] + 36, by - 6])}`,
          ];
          const mx = O[0] + 28;
          return [s.svg, mainProfil(O),
            h.fleche(`M ${P([mx, O[1] - 100])} L ${P([mx, O[1] - 70])}`, A.contour),
            h.fleche(`M ${P([mx + 50, O[1] + 100])} L ${P([mx + 50, O[1] + 70])}`, A.contour),
            ...jets.map(d => h.path(d, A.cache)),
            goutte(b[0] + 8, b[1] + 26, 3.2), goutte(b[0] + 14, b[1] + 52, 3.2), goutte(b[0] + 18, by - 14, 3.2),
            h.path(lait, A.hachure('eau', 'aucun')), h.path(bol, A.contour),
            h.ligne(bx - bl + 8, yl, bx + bl - 8, yl, A.detail),
          ].join('\n');
        },
        renvois: z => {
          const O = O3(z), s = seinProfil(O, z.h), b = s.bout, mx = O[0] + 28;
          const bx = b[0] + 30, by = z.h - 40;
          return [
            { n: 4, rond: [mx + 40, O[1] - 104], cible: [mx, O[1] - 90], texte: 'presser en pince, relâcher, en rythme' },
            { n: 5, rond: [b[0] + 36, b[1] - 44], cible: [b[0] - 2, b[1] - 3], texte: 'sans glisser ni étirer le mamelon' },
            { n: 6, rond: [b[0] + 74, b[1] + 22], cible: [b[0] + 40, b[1] + 22], texte: 'gouttes, puis petits jets' },
            { n: 7, rond: [bx - 86, by + 12], cible: [bx - 56, by + 8], texte: 'contenant propre et large' },
          ];
        },
      },
      tourner: {
        titre: '4. Tourner',
        dessin: z => {
          const N = faceN(z);
          const out = [seinFace(N)];
          out.push(empreinte(pol(N, rP, -120), 10.5 * E, 8 * E, -30, false), empreinte(pol(N, rP, 50), 9.5 * E, 7 * E, -30, false));
          out.push(mainFace(N, -45));
          const ra = rP + 40 * E;
          const arc = (t0, t1) => `M ${P(pol(N, ra, t0))} A ${f(ra)} ${f(ra)} 0 0 1 ${P(pol(N, ra, t1))}`;
          out.push(h.fleche(arc(-100, -62), A.contour));
          return out.join('\n');
        },
        renvois: z => {
          const N = faceN(z), ra = rP + 40 * E;
          return [
            { n: 8, rond: [N[0] - 110, N[1] - 100], cible: pol(N, rP, -120), texte: 'empreintes de la prise d’avant' },
            { n: 9, rond: [N[0] + 70, N[1] - 120], cible: pol(N, ra, -78), texte: 'relâcher, tourner, reprendre' },
          ];
        },
      },
    },
  };
};
