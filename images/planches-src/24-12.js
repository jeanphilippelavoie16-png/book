// Planche 24-12 — L'exercice du poignet et l'étirement (chapitre 24, étape 30).
// Les mains viennent de la bibliothèque des mains simples (mainSimple) : la main autour de la boîte
// (prise-grosse, vue du côté du petit doigt, la boîte vue par le bout), la main tendue et celle qui
// pousse (plat, vue du côté du pouce). Le poignet se plie dans le moteur (sa flexion) : l'avant-bras
// reste droit, posé à plat, et la main tourne au poignet.
module.exports = (h) => {
  const F = h.formes;
  const RAD = Math.PI / 180, f1 = v => Math.round(v * 10) / 10;
  const rot = (p, a) => [p[0] * Math.cos(a * RAD) - p[1] * Math.sin(a * RAD), p[0] * Math.sin(a * RAD) + p[1] * Math.cos(a * RAD)];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
  const P = p => `${f1(p[0])} ${f1(p[1])}`;
  const BLANC = 'fill="#FFFFFF" stroke="none"';

  const E = 0.95;          // échelle des vues de l'exercice (unités de vue par mm)
  const DIAM = 54;         // la petite boîte de conserve vue par le bout, en mm

  // La main de la bibliothèque (mainSimple), l'avant-bras posé à plat vers la gauche, le poignet
  // plié de flex (sa flexion : le moteur plie la main, l'avant-bras reste droit). La main est placée
  // par son poignet en B, tournée pour que l'avant-bras soit horizontal.
  const avantBrasAPlat = (o) => {
    const m0 = F.mainSimple({ ...o, x: 0, y: 0, angle: 0, echelle: 1, ancre: 'poignet', avantbras: { longueur: 100 } });
    return 180 - Math.atan2(m0.coude[1] - m0.poignet[1], m0.coude[0] - m0.poignet[0]) / RAD;
  };
  const mainPliee = (o, B, z, d = 0) => F.mainSimple({ ...o, angle: avantBrasAPlat(o) + d, x: B[0], y: B[1], echelle: o.echelle, ancre: 'poignet',
    avantbras: { longueur: 'bord', bord: { x0: 0, y0: 0, x1: z.l, y1: z.h } } });
  // l'avant-bras s'élargit vers le coude : on le tourne pour que son dessous (ce qui pose sur la
  // table) soit à plat entre le bord de la table et le bord de la vue
  // le dessous de l'avant-bras à l'abscisse x : le plus bas des bords à moins de 42 mm du poignet en
  // hauteur (la main qui pend, plus bas, n'en est pas)
  const dessous = (m, x, B) => Math.max(...ysV(m, x).filter(y => Math.abs(y - B[1]) < 42 * E));
  const dessousAPlat = (o, B, z, xa, xb) => {
    let d = 0;
    for (let k = 0; k < 3; k++) {
      const m = mainPliee(o, B, z, d), ya = dessous(m, xa, B), yb = dessous(m, xb, B);
      d -= Math.atan2(yb - ya, xb - xa) / RAD;
    }
    return d;
  };
  // le contour de la main (son premier tracé) : les y où la verticale x le coupe
  const ysV = (m, x) => {
    const q = [...m.couches.main.match(/<path d="([^"]+)"/)[1].matchAll(/(-?\d+\.?\d*)[ ,](-?\d+\.?\d*)/g)].map(c => [+c[1], +c[2]]);
    const r = [];
    for (let i = 0; i < q.length; i++) {
      const A = q[i], C = q[(i + 1) % q.length];
      if ((A[0] - x) * (C[0] - x) <= 0 && A[0] !== C[0]) r.push(A[1] + (C[1] - A[1]) * (x - A[0]) / (C[0] - A[0]));
    }
    return r.sort((u, v) => u - v);
  };

  // La boîte vue par le bout : le rebord du couvercle et le creux du fond.
  const boite = (c, r) => [
    h.cercle(c[0], c[1], r, `fill="#FFFFFF" ${h.a.arete.replace('fill="none" ', '')}`),
    h.cercle(c[0], c[1], r - 4.5 * E, h.a.detail),
  ].join('\n');

  // La table, coupée à gauche : le dessus sous l'avant-bras, le chant.
  function table(xg, xb, y) {
    const ep = 26;
    return [
      h.rect(xg, y, xb - xg, ep, h.a.hachure('bois', 'aucun')),
      h.chemin([[xg, y], [xb, y], [xb, y + ep], [xg, y + ep]], h.a.contour),
    ].join('\n');
  }

  // L'arc que suit le poing, centré sur le poignet, avec un trait par temps compté.
  function arc(B, de, a, rho, temps) {
    const pt = t => add(B, rot([rho, 0], t));
    const bal = a > de ? 1 : 0;
    const out = [h.geste(`M${P(pt(de))} A${f1(rho)} ${f1(rho)} 0 0 ${bal} ${P(pt(a))}`)];
    for (let i = 1; i < temps; i++) {
      const t = de + (a - de) * i / temps;
      out.push(h.ligne(...add(B, rot([rho - 7, 0], t)), ...add(B, rot([rho + 7, 0], t)), h.a.arete));
    }
    return out.join('\n');
  }

  const HAUT = 45, BAS = -50;                         // la flexion du poignet : la main levée, la main descendue
  // prise-grosse (la main autour d'un cylindre de 50 à 90 mm), vue du côté du petit doigt : la boîte
  // vue par le bout, dans le poing ; le pouce passe derrière elle (gris). Paume en bas, la main
  // droite ; paume en haut, la gauche (le même dessin retourné).
  const PRISE = cote => ({ pose: 'prise-grosse', vue: 'auriculaire', cote, diametre: DIAM, echelle: E });
  const vueExercice = (a, depuis, temps, paumeEnHaut = false) => z => {
    const B = [z.l * 0.36, z.h * (paumeEnHaut ? 0.50 : 0.46)];
    const o = PRISE(paumeEnHaut ? 'gauche' : 'droite');
    const flex = paumeEnHaut ? -a : a;
    let ct = null, rt = DIAM * E / 2;
    const boiteDans = g => { ct = [g.x, g.y]; rt = g.r; return boite(ct, g.r); };
    const xBord = B[0] - 40 * E;
    const oF = { ...o, poignet: { flexion: flex } }, d = dessousAPlat(oF, B, z, 6, xBord);
    const m = mainPliee({ ...oF, objet: boiteDans }, B, z, d);
    String(m);
    // la boîte au départ du geste : même avant-bras, l'autre flexion
    const o1 = { ...o, poignet: { flexion: paumeEnHaut ? -depuis : depuis } };
    const m1 = mainPliee(o1, B, z, dessousAPlat(o1, B, z, 6, xBord));
    const c1 = [m1.prise.x, m1.prise.y];
    if (!ct) ct = [m.prise.x, m.prise.y];
    const ang = c => Math.atan2(c[1] - B[1], c[0] - B[0]) / RAD;
    const fin = ang(ct), debut = ang(c1);
    const rho = Math.max(Math.hypot(ct[0] - B[0], ct[1] - B[1]), Math.hypot(c1[0] - B[0], c1[1] - B[1])) + rt + 34 * E;
    // la table : son dessus sous l'avant-bras, relevé sur le contour au bord de la table
    const yTable = dessous(m, xBord, B);
    return {
      B, yTable, trou: { x: ct[0], y: ct[1], r: rt }, rho, fin, debut,
      svg: [table(6, xBord, yTable), m.toString(), arc(B, debut, fin, rho, temps)].join('\n'),
    };
  };

  // les vues de l'exercice, calculées une fois par taille de vue
  const cache = {};
  const ex = (cle, fab) => z => (cache[cle] = cache[cle] || fab(z));
  const monter = ex('monter', vueExercice(HAUT, BAS, 2));
  const descendre = ex('descendre', vueExercice(BAS, HAUT, 4));
  const dedans = ex('dedans', vueExercice(BAS, HAUT, 4, true));

  // L'étirement : le bras tendu devant soi, paume en bas, la main pliée vers le bas, les doigts
  // allongés (plat, vue du côté du pouce) ; l'autre main, à plat sur le dos des doigts, venue d'en
  // dessous, les doigts vers le haut : elle ramène les doigts vers soi.
  const ES = 0.8;
  const etirement = z => {
    const B = [z.l * 0.40, 46];
    const o = { pose: 'plat', vue: 'pouce', cote: 'droite', echelle: ES, poignet: { flexion: 80 } };
    const m = mainPliee(o, B, z);
    // le dos des doigts : de la jointure de l'index à son bout
    const k0 = m.articulations['index.mcp'], k1 = m.doigts.index;
    const v = [(k1[0] - k0[0]) / Math.hypot(k1[0] - k0[0], k1[1] - k0[1]), (k1[1] - k0[1]) / Math.hypot(k1[0] - k0[0], k1[1] - k0[1])];
    const th = Math.atan2(v[1], v[0]) / RAD;
    // l'autre main : sa paume contre le dos des doigts, ses doigts remontent vers les jointures
    const nDos = rot(v, -90);                           // du côté du dos de la main pliée
    const colle = add(add(k0, mul(v, 70 * ES)), mul(nDos, 42 * ES));
    const pousse = F.mainSimple({ pose: 'plat', vue: 'pouce', cote: 'gauche', angle: th + 180, x: colle[0], y: colle[1], echelle: ES,
      avantbras: { longueur: 'bord', bord: { x0: 0, y0: 0, x1: z.l, y1: z.h } } });
    const rho = 150 * ES, pt = t => add(B, rot([rho, 0], t));
    const fl = h.geste(`M${P(pt(22))} A${f1(rho)} ${f1(rho)} 0 0 1 ${P(pt(62))}`);
    return { B, m, pousse, rho, pt, main8: add(k0, mul(v, 70 * ES)), svg: [m.toString(), pousse.toString(), fl].join('\n') };
  };
  const cacheE = {};
  const et = z => (cacheE.v = cacheE.v || etirement(z));

  return {
    ref: '24-12',
    titre: 'L’exercice du poignet et l’étirement',
    desc: 'Le coude du bûcheron. L’avant-bras à plat sur la table, paume vers le bas, le poignet qui dépasse du bord, une boîte de conserve dans la main : on lève le poignet en comptant jusqu’à 2, on le laisse redescendre en comptant jusqu’à 4. Le même exercice paume vers le haut pour le côté intérieur. L’étirement : le bras tendu, l’autre main plie le poignet vers le bas.',
    format: 'pleine',
    disposition: [['monter', 'descendre'], ['dedans', 'etirement']],
    vues: {
      monter: {
        titre: 'Paume vers le bas : monter en 2 temps',
        dessin: z => monter(z).svg,
        renvois: z => {
          const v = monter(z), B = v.B;
          return [
            { n: 1, rond: [22, v.yTable + 50], cible: [B[0] - 90 * E, B[1]], texte: 'l’avant-bras à plat' },
            { n: 2, rond: [B[0] - 4, v.yTable + 62], cible: [B[0] - 40 * E, v.yTable + 2], texte: 'le poignet dépasse du bord' },
            { n: 3, rond: [v.trou.x - v.trou.r - 50, v.trou.y - v.trou.r - 18], cible: [v.trou.x - v.trou.r * 0.7, v.trou.y - v.trou.r * 0.7], texte: 'sans poids, puis une boîte' },
            { n: 4, rond: [z.l - 18, B[1] + 92], cible: add(B, rot([v.rho, 0], (v.debut + v.fin) / 2)), texte: 'un trait par temps compté' },
          ];
        },
      },
      descendre: {
        titre: 'Redescendre en 4 temps — trois séries de dix par jour',
        dessin: z => descendre(z).svg,
        renvois: z => {
          const v = descendre(z), B = v.B;
          return [
            { n: 5, rond: [z.l - 18, 26], cible: add(B, rot([v.rho, 0], v.debut + (v.fin - v.debut) * 0.2)), texte: 'c’est la descente qui soigne' },
          ];
        },
      },
      dedans: {
        titre: 'Côté intérieur : paume vers le haut',
        dessin: z => dedans(z).svg,
        renvois: z => {
          const v = dedans(z), B = v.B;
          return [
            { n: 6, rond: [B[0] - 50, 26], cible: add(B, rot([v.rho, 0], v.debut + (v.fin - v.debut) * 0.15)), texte: 'monter en 2, redescendre en 4' },
          ];
        },
      },
      etirement: {
        titre: 'L’étirement : 30 s, quatre fois',
        dessin: z => et(z).svg,
        renvois: z => {
          const v = et(z);
          return [
            { n: 7, rond: [40, v.B[1] + 75], cible: [v.B[0] - 90, v.B[1] + 6], texte: 'le bras tendu, paume en bas' },
            { n: 8, rond: [z.l - 18, v.B[1] + 30], cible: v.main8, texte: 'l’autre main pousse ici' },
          ];
        },
      },
    },
  };
};
