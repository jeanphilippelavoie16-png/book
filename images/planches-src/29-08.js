// Planche 29-08 — Les épaules qui bloquent (chapitre 29, étape 43 ; rappel en 9-G, point 4).
// Ce que dit le chapitre, et rien de plus : la tête est sortie, les épaules ne suivent pas. Essai 1 :
// la mère à quatre pattes, les mains en coupe autour de la tête, traction droite et douce dans l'axe
// du bébé en comptant jusqu'à 30. Essai 2 : la mère au bord du lit, qui tire ses genoux vers ses
// épaules aussi loin qu'elle peut ; quelqu'un appuie fort juste au-dessus de l'os du pubis, pas sur
// le ventre ; la mère pousse de toutes ses forces ; la même traction, jusqu'à 30. Jamais par le cou.
// Les essais 3 et 4 se font dedans, à la main : pas dessinés (rien à voir de dehors).
// Cotes : aucune. Rien ne se construit ici, et le chapitre ne donne pas de mesure de position.
// Reprise du 12 octobre (JP : « corps de la femme très weird, pas proportionné ») : la mère est
// maintenant le pictogramme de la règle 8 (formes.js, personnage, enceinte : un ventre arrondi
// simple), aux proportions de la bibliothèque, dans deux poses ajoutées à formes.js : quatre-pattes
// et couche-replie. Sur le lit, les cuisses passent derrière le ventre (jambes: 'derriere') pour que
// le ventre et le dessus du pubis restent visibles ; la main de la mère (la prise vue du dos) tient
// sa cuisse juste derrière le genou. L'axe de la tête du bébé (150° à quatre pattes, 15° sur le lit)
// est un choix de dessin : le chapitre dit « dans l'axe du bébé », sans angle.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const BLANC = /fill="([^"]+)"/.exec(A.blanc)[1];
  const NOIR = /stroke="([^"]+)"/.exec(A.arete)[1];
  const f = v => Math.round(v * 10) / 10;
  const RAD = Math.PI / 180;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const dirDeg = d => [Math.cos(d * RAD), Math.sin(d * RAD)];
  const seg = (a, b) => `M${f(a[0])} ${f(a[1])} L${f(b[0])} ${f(b[1])}`;

  // La tête du bébé, sortie : un rond un peu ovale dans l'axe, du même trait que le pictogramme.
  const bebe = (c, axe, s) => {
    const u = uni(axe), ang = Math.atan2(u[1], u[0]) / RAD;
    const a = 62 * s, b = 54 * s;
    const p0 = add(c, mul(u, a)), p1 = sub(c, mul(u, a));
    const d = `M${f(p0[0])} ${f(p0[1])} A${f(a)} ${f(b)} ${f(ang)} 1 1 ${f(p1[0])} ${f(p1[1])} A${f(a)} ${f(b)} ${f(ang)} 1 1 ${f(p0[0])} ${f(p0[1])} Z`;
    return [`<path d="${d}" fill="none" stroke="${NOIR}" stroke-width="2.4"/>`, `<path d="${d}" fill="${BLANC}" stroke="${NOIR}" stroke-width="1.4"/>`].join('\n');
  };

  // ── vue 1 : à quatre pattes ──
  const quatre = z => {
    const s = Math.min(0.36, (z.h - 20) / 820), sol = z.h - 12;
    const o = { x: z.l * 0.42, y: sol, pose: 'quatre-pattes', echelle: s, enceinte: true };
    // les mains à plat au sol sous les épaules (la paume qui appuie, de profil, de formes.js)
    const e0 = F.personnage(o).epaules;
    const appui = dx => ({ x: dx, y: sol, pose: 'appui', vue: 'profil', bras: 30 });
    const p = F.personnage(Object.assign({}, o, { prises: { proche: appui(e0.proche[0] + 70 * s), loin: appui(e0.loin[0] + 100 * s) } }));
    const H = p.hanche, axe = dirDeg(150);
    // la vulve : sous la fesse, juste derrière le haut de la cuisse
    const vulve = add(H, [-92 * s, 62 * s]);
    const centre = add(vulve, mul(axe, 46 * s));
    return { svg: [bebe(centre, axe, s), String(p)].join('\n'), sol, centre, axe, bout: add(centre, mul(axe, 62 * s)), s, p };
  };

  // ── vue 2 : sur le dos, au bord du lit, les genoux vers les épaules ──
  const lit = z => {
    const EP_MAT = 80, EP_LIT = 22;
    const s = Math.min(0.42, (z.h - 10) / (720 + EP_MAT + EP_LIT + 150));
    const mat = z.h - 6 - (EP_MAT + EP_LIT) * s;          // le dessus du matelas
    const x0 = z.l * 0.56;
    const base = { x: x0, y: mat, pose: 'couche-replie', echelle: s, enceinte: true, jambes: 'derriere', regard: -8 };
    const p0 = F.personnage(base);
    const H = p0.hanche, K = p0.genoux.proche;
    // la main tient la cuisse juste derrière le genou, la prise dans l'axe de la cuisse
    const dc = uni(sub(K, H)), ang = Math.atan2(dc[0], -dc[1]) / RAD;
    const prise = add(K, mul(dc, -70 * s));
    const p = F.personnage(Object.assign({}, base, { prises: { proche: { x: prise[0], y: prise[1], pose: 'prise', vue: 'dos', angle: ang, diametre: 112 * s, bras: 30 } } }));
    // le bord du lit : sous les fesses
    const BORD = H[0] + 104 * s;
    const lits = [
      h.rect(0, mat, BORD, EP_MAT * s, A.blanc),
      h.chemin([[0, mat], [BORD - 5, mat], [BORD, mat + 5], [BORD, mat + EP_MAT * s - 5], [BORD - 5, mat + EP_MAT * s], [0, mat + EP_MAT * s]], A.contour),
      h.rect(0, mat + EP_MAT * s, BORD - 14, EP_LIT * s, A.hachure('bois', 'detail')),
    ].join('\n');
    // l'oreiller, sous la tête
    const t = p.tete, oy = mat;
    const ore = `<path d="M${f(t.x - t.r * 1.5)} ${f(oy)} C${f(t.x - t.r * 1.7)} ${f(oy - 14)} ${f(t.x - t.r * 1.2)} ${f(oy - 22)} ${f(t.x - t.r * 0.4)} ${f(oy - 20)} `
      + `C${f(t.x + t.r * 0.6)} ${f(oy - 18)} ${f(t.x + t.r * 1.5)} ${f(oy - 20)} ${f(t.x + t.r * 1.8)} ${f(oy - 10)} C${f(t.x + t.r * 1.9)} ${f(oy - 4)} ${f(t.x + t.r * 1.9)} ${f(oy)} ${f(t.x + t.r * 1.9)} ${f(oy)} Z" fill="${BLANC}" stroke="${NOIR}" stroke-width="1.4"/>`;
    // la tête du bébé, à la vulve (le coin bas de la fesse, côté pieds)
    const axe = dirDeg(15);
    const vulve = add(H, [92 * s, -40 * s]);
    const centre = add(vulve, mul(axe, 40 * s));
    // le dessus du pubis et le haut du ventre, dans le repère couché (x vers les pieds, y vers le bas)
    const pubis = add(H, [-42 * s, -150 * s]), haut = add(H, [-128 * s, -252 * s]);
    const svg = [lits, ore, bebe(centre, axe, s), String(p)].join('\n');
    return { svg, s, H, K, p, centre, axe, bout: add(centre, mul(axe, 62 * s)), pubis, haut, fesse: add(H, [100 * s, 60 * s]) };
  };

  const memo = {};
  const G = (id, fn, z) => { const k = `${id}-${z.l}-${z.h}`; return memo[k] || (memo[k] = fn(z)); };
  // la flèche courbe du genou : un arc autour de la hanche, au-dessus du genou, vers les épaules
  const arcGenou = g => {
    const r = Math.hypot(g.K[0] - g.H[0], g.K[1] - g.H[1]) + 105 * g.s;
    const a0 = Math.atan2(g.K[1] - g.H[1], g.K[0] - g.H[0]) / RAD;
    const pt = a => add(g.H, mul(dirDeg(a), r));
    return { r, a: pt(a0 + 14), b: pt(a0 - 10), m: pt(a0 + 2) };
  };

  return {
    ref: '29-08',
    titre: 'Les épaules qui bloquent : les deux premiers essais',
    desc: 'La mère à quatre pattes, la tête du bébé tenue en coupe et tirée droit ; puis sur le dos au bord du lit, les genoux tirés vers les épaules, et une poussée juste au-dessus du pubis, pas sur le ventre.',
    format: 'pleine',
    disposition: [['quatre'], ['lit']],
    hauteurs: [4, 5],
    vues: {
      quatre: {
        titre: '1. À quatre pattes',
        dessin: z => {
          const g = G('q', quatre, z);
          const a0 = add(g.bout, mul(g.axe, 8)), a1 = add(g.bout, mul(g.axe, 60));
          return [g.svg,
            h.ligne(10, g.sol, z.l - 10, g.sol, A.contour),
            h.fleche(seg(a0, a1)),
          ].join('\n');
        },
        renvois: z => {
          const g = G('q', quatre, z);
          const a1 = add(g.bout, mul(g.axe, 40));
          return [
            { n: 1, rond: [g.centre[0] - 30, g.centre[1] - 62], cible: add(g.centre, [-6, -12]), texte: 'la tête tenue en coupe, jamais le cou' },
            { n: 2, rond: [a1[0] - 40, a1[1] - 6], cible: a1, texte: 'traction droite et douce dans l’axe, jusqu’à 30' },
          ];
        },
      },
      lit: {
        titre: '2. Sur le dos, au bord du lit, les genoux vers les épaules',
        dessin: z => {
          const g = G('l', lit, z);
          const k = arcGenou(g);
          const c0 = add(g.bout, mul(g.axe, 22 * g.s)), c1 = add(g.bout, mul(g.axe, 170 * g.s));
          return [g.svg,
            h.fleche(`M${f(k.a[0])} ${f(k.a[1])} A${f(k.r)} ${f(k.r)} 0 0 1 ${f(k.b[0])} ${f(k.b[1])}`),
            h.fleche(seg(add(g.pubis, [0, -120 * g.s]), add(g.pubis, [0, -3]))),
            h.fleche(seg(c0, c1)),
          ].join('\n');
        },
        renvois: z => {
          const g = G('l', lit, z);
          const k = arcGenou(g);
          const c1 = add(g.bout, mul(g.axe, 120 * g.s));
          const p = add(g.pubis, [0, -70 * g.s]);
          return [
            { n: 3, rond: [k.m[0] + 26, k.m[1] - 26], cible: k.m, texte: 'elle tire ses genoux vers ses épaules' },
            { n: 4, rond: [g.haut[0] - 44, g.haut[1] - 64], cible: add(g.haut, [0, -2]), texte: 'pas sur le ventre' },
            { n: 5, rond: [p[0] + 40, p[1] - 22], cible: p, texte: 'appuyer fort juste au-dessus de l’os du pubis' },
            { n: 6, rond: [g.fesse[0] + 34, g.fesse[1] + 40], cible: g.fesse, texte: 'les fesses au bord du lit' },
            { n: 7, rond: [c1[0] + 10, c1[1] - 30], cible: c1, texte: 'elle pousse fort, même traction jusqu’à 30' },
          ];
        },
      },
    },
  };
};
