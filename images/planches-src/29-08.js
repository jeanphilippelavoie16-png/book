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
// Lot 3 (13 octobre) : la mère passe au corps simple de profil (quatre-pattes, couche-replie,
// femme). Le moteur n'a pas de ventre de grossesse : il est ajouté ici (ventre(), en objetP).
// Rouge : la traction dans l'axe (vue 1) ; les genoux tirés vers les épaules et l'appui au-dessus
// du pubis (vue 2). La traction répétée de la vue 2 reste noire.
module.exports = (h) => {
  const A = h.a, A_ = h.a, F = h.formes;
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

  // ── le ventre de la fin de grossesse ──
  // Le corps simple n'a pas de ventre de grossesse : on l'ajoute ici, en objetP du moteur (peint
  // devant le tronc et la jambe proche, derrière le bras proche). C'est une bosse posée sur le
  // contour du tronc seul (bras et jambes masqués), son blanc mord de 3 unités dans le tronc pour
  // effacer la couture ; seul son bord extérieur est tracé, au trait du corps (1,5).
  const coupesX = (svg, x) => {
    const ys = [];
    for (const m of String(svg).matchAll(/ d="([^"]+)"/g)) {
      const n = m[1].match(/-?\d+(\.\d+)?/g).map(Number);
      for (let i = 0; i + 3 < n.length; i += 2) {
        const [x0, y0, x1, y1] = [n[i], n[i + 1], n[i + 2], n[i + 3]];
        if (x0 !== x1 && (x0 - x) * (x1 - x) <= 0) ys.push(y0 + (y1 - y0) * (x - x0) / (x1 - x0));
      }
    }
    return ys;
  };
  // xa, xb : où la bosse commence et finit ; sens : +1 vers le bas (à quatre pattes), −1 vers le
  // haut (sur le dos) ; H : sa hauteur en unités de vue
  const ventre = (tronc, xa, xb, sens, H) => {
    const bord = x => { const ys = coupesX(tronc, x); return sens > 0 ? Math.max(...ys) : Math.min(...ys); };
    const ext = [], int = [];
    for (let k = 0; k <= 30; k++) {
      const t = k / 30, x = xa + (xb - xa) * t, y = bord(x);
      // la bosse : plus pleine du côté des seins que du côté du pubis
      const b = Math.pow(Math.sin(Math.PI * Math.pow(t, sens > 0 ? 0.85 : 0.85)), sens > 0 ? 0.9 : 0.75);
      ext.push([x, y + sens * H * b]);
      int.push([x, y - sens * 3]);
    }
    const pt = q => `${f(q[0])} ${f(q[1])}`;
    return [`<path d="M${ext.map(pt).join(' L')} L${int.reverse().map(pt).join(' L')} Z" fill="${BLANC}" stroke="none"/>`,
      `<path d="M${ext.map(pt).join(' L')}" fill="none" stroke="${NOIR}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>`].join('\n');
  };
  const SANS_MEMBRES = ['brasP', 'brasL', 'jambeP', 'jambeL'];
  // le tronc seul, à la place exacte qu'il a dans le corps entier (sans membres, le moteur poserait
  // autre chose au sol : on le pose par le bassin, appui 'aucun')
  const troncSeul = o => {
    const H0 = F.corps(o).articulations.hancheP;
    return F.corps(Object.assign({}, o, { x: H0[0], y: H0[1], appui: 'aucun', masquer: SANS_MEMBRES }));
  };

  // ── vue 1 : à quatre pattes ──
  // Le corps simple de profil (quatre-pattes, femme), la tête à droite, les mains à plat au sol.
  const quatre = z => {
    const s = Math.min(0.36, (z.h - 20) / 820), sol = z.h - 12;
    const o = { x: z.l * 0.42, y: sol, pose: 'quatre-pattes', age: 'femme', echelle: s };
    const tronc = troncSeul(o);
    const A = tronc.articulations, H = A.hancheP, S = A.epauleP;
    // de la cuisse proche (le ventre sort de derrière elle) jusque sous le bras proche (qui le cache)
    const v = ventre(tronc, H[0] + (S[0] - H[0]) * 0.165, H[0] + (S[0] - H[0]) * 0.97, 1, 150 * s);
    const p = F.corps(Object.assign({}, o, { objetP: v }));
    const axe = dirDeg(150);
    // la vulve : sous la fesse, juste derrière le haut de la cuisse
    const vulve = add(H, [-92 * s, 62 * s]);
    const centre = add(vulve, mul(axe, 46 * s));
    return { svg: [bebe(centre, axe, s), String(p)].join('\n'), sol, centre, axe, bout: add(centre, mul(axe, 62 * s)), s, p };
  };

  // ── vue 2 : sur le dos, au bord du lit, les genoux vers les épaules ──
  // Le corps simple de profil (couche-replie, femme) : la main proche tient la cuisse derrière le
  // genou. Le ventre passe devant la cuisse proche, pour que le dessus du pubis reste visible.
  const lit = z => {
    const EP_MAT = 80, EP_LIT = 22;
    const s = Math.min(0.42, (z.h - 10) / (720 + EP_MAT + EP_LIT + 150));
    const mat = z.h - 6 - (EP_MAT + EP_LIT) * s;          // le dessus du matelas
    const o = { x: z.l * 0.5, y: mat, pose: 'couche-replie', age: 'femme', echelle: s };
    const tronc = troncSeul(o);
    const A = tronc.articulations, H = A.hancheP, S = A.epauleP;
    const v = ventre(tronc, S[0] + (H[0] - S[0]) * 0.36, H[0] - 6 * s, -1, 175 * s);
    const p = F.corps(Object.assign({}, o, { objetP: v }));
    const K = p.articulations.genouP;
    // le bord du lit : sous les fesses
    const BORD = H[0] + 104 * s;
    const lits = [
      h.rect(0, mat, BORD, EP_MAT * s, A_.blanc),
      h.chemin([[0, mat], [BORD - 5, mat], [BORD, mat + 5], [BORD, mat + EP_MAT * s - 5], [BORD - 5, mat + EP_MAT * s], [0, mat + EP_MAT * s]], A_.contour),
      h.rect(0, mat + EP_MAT * s, BORD - 14, EP_LIT * s, A_.hachure('bois', 'detail')),
    ].join('\n');
    // l'oreiller, sous la tête
    const t = p.tete, r = 100 * s, oy = mat;
    const ore = `<path d="M${f(t.x - r * 1.5)} ${f(oy)} C${f(t.x - r * 1.7)} ${f(oy - 14)} ${f(t.x - r * 1.2)} ${f(oy - 22)} ${f(t.x - r * 0.4)} ${f(oy - 20)} `
      + `C${f(t.x + r * 0.6)} ${f(oy - 18)} ${f(t.x + r * 1.5)} ${f(oy - 20)} ${f(t.x + r * 1.8)} ${f(oy - 10)} C${f(t.x + r * 1.9)} ${f(oy - 4)} ${f(t.x + r * 1.9)} ${f(oy)} ${f(t.x + r * 1.9)} ${f(oy)} Z" fill="${BLANC}" stroke="${NOIR}" stroke-width="1.4"/>`;
    // la tête du bébé, à la vulve (le coin bas de la fesse, côté pieds)
    const axe = dirDeg(15);
    const vulve = add(H, [92 * s, -40 * s]);
    const centre = add(vulve, mul(axe, 40 * s));
    // le dessus du pubis et le haut du ventre, dans le repère couché (x vers les pieds, y vers le bas)
    const dessus = x => Math.min(...coupesX(v, x));
    const xp = H[0] - 30 * s, xh = S[0] + (H[0] - S[0]) * 0.5;
    const pubis = [xp, dessus(xp)], haut = [xh, dessus(xh)];
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
    desc: 'La mère enceinte, en corps simple de profil, à quatre pattes, la tête du bébé tenue en coupe et tirée droit dans l’axe (flèche rouge) ; puis sur le dos au bord du lit, les genoux tirés vers les épaules (flèche rouge), la main qui tient la cuisse derrière le genou, et une poussée juste au-dessus du pubis (flèche rouge), pas sur le ventre.',
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
            h.geste(seg(a0, a1)),
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
            h.geste(`M${f(k.a[0])} ${f(k.a[1])} A${f(k.r)} ${f(k.r)} 0 0 1 ${f(k.b[0])} ${f(k.b[1])}`),
            h.geste(seg(add(g.pubis, [0, -120 * g.s]), add(g.pubis, [0, -3]))),
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
