// Planche 24-12 — L'exercice du poignet et l'étirement (chapitre 24, étape 30).
// Le poing qui tient la boîte vient de h.formes.main (prise de profil) ; le pli du poignet se
// fait ici : l'avant-bras reste à plat sur la table, la main tourne autour du poignet, et la
// jonction se coupe sur la bissectrice (pli net en dedans, arrondi en dehors).
module.exports = (h) => {
  const F = h.formes;
  const RAD = Math.PI / 180, f1 = v => Math.round(v * 10) / 10;
  const rot = (p, a) => [p[0] * Math.cos(a * RAD) - p[1] * Math.sin(a * RAD), p[0] * Math.sin(a * RAD) + p[1] * Math.cos(a * RAD)];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
  const P = p => `${f1(p[0])} ${f1(p[1])}`;
  const BLANC = 'fill="#FFFFFF" stroke="none"';
  let nclip = 0;

  const E = 0.95;          // échelle des vues de l'exercice (unités de vue par mm)
  const DIAM = 58;         // la boîte, en mm
  const RECUL = 30;        // le pli : là où l'éminence commence, 30 mm avant la base de la main
  const DT = 21.7, DV = 21.8;   // demi-épaisseurs de l'avant-bras de la bibliothèque, dos et paume
  const DECALE = 29;       // le centre du poing est à 29° sous l'axe de la main, vu du poignet

  // La boîte vue par le bout, qui dépasse un peu du poing vers l'œil : le fond, les deux flancs,
  // le couvercle et son rebord.
  function boite(c, r) {
    const v = [-5 * E, 4 * E];
    const n = rot([v[1], -v[0]], 0), ln = Math.hypot(n[0], n[1]);
    const t = mul(n, r / ln);
    const c2 = add(c, v);
    return [
      `<path d="M${P(add(c, t))} L${P(add(c2, t))} M${P(add(c, mul(t, -1)))} L${P(add(c2, mul(t, -1)))}" ${h.a.arete}/>`,
      h.cercle(c2[0], c2[1], r, `fill="#FFFFFF" ${h.a.arete.replace('fill="none" ', '')}`),
      h.cercle(c2[0], c2[1], r - 4.2 * E, h.a.detail),
    ].join('\n');
  }

  // Le poing plié au poignet. B : le pli ; a : l'angle de la main (+ : vers le bas).
  function poingPlie(B, a, avb) {
    const essai = F.main({ x: 0, y: 0, pose: 'prise', vue: 'profil', diametre: DIAM * E, echelle: E, bras: RECUL + 6, angle: a });
    const u = [essai.bras[0] - essai.poignet[0], essai.bras[1] - essai.poignet[1]];
    const B0 = add(essai.poignet, mul(u, RECUL * E / Math.hypot(u[0], u[1])));
    const x = B[0] - B0[0], y = B[1] - B0[1];
    const m = F.main({ x, y, pose: 'prise', vue: 'profil', diametre: DIAM * E, echelle: E, bras: RECUL + 6, angle: a });
    const n = rot([1, 0], a / 2), d = rot([0, 1], a / 2), L = 900;
    const demi = s => [add(B, mul(d, L)), add(add(B, mul(d, L)), mul(n, s * L)), add(add(B, mul(d, -L)), mul(n, s * L)), add(B, mul(d, -L))];
    const idM = `p2412-${++nclip}`, idA = `p2412-${++nclip}`;
    // la main garde aussi tout ce qui sort de l'avant-bras du côté du pli (l'éminence qui bombe)
    const yPli = a > 0 ? B[1] + DV * E : B[1] - DT * E, hPli = a > 0 ? 900 : -900;
    const pli = `<path fill="none" d="M${P([B[0] - 900, yPli])} L${P([B[0] + 900, yPli])} L${P([B[0] + 900, yPli + hPli])} L${P([B[0] - 900, yPli + hPli])} Z"/>`;
    const defs = `<defs><clipPath id="${idM}"><path fill="none" d="M${demi(1).map(P).join(' L')} Z"/>${pli}</clipPath>` +
      `<clipPath id="${idA}"><path fill="none" d="M${demi(-1).map(P).join(' L')} Z"/></clipPath></defs>`;
    const s = a > 0 ? -1 : 1;                       // côté convexe : le dos si la main descend
    const r = (s < 0 ? DT : DV) * E;
    const xa = B[0] - avb, yT = B[1] - DT * E, yV = B[1] + DV * E;
    const xT = s < 0 ? B[0] : B[0] + 300, xV = s < 0 ? B[0] + 300 : B[0];
    const lignes = `M${P([xa, yT])} L${P([xT, yT])} M${P([xa, yV])} L${P([xV, yV])}`;
    const avantBras = `<g clip-path="url(#${idA})"><path d="${lignes}" ${h.a.contour}/>` +
      `<rect x="${f1(xa)}" y="${f1(yT)}" width="${f1(avb + 300)}" height="${f1(yV - yT)}" ${BLANC}/><path d="${lignes}" ${h.a.detail}/></g>`;
    // l'arrondi du côté convexe : on blanchit le coin, puis on trace l'arc
    const p1 = add(B, [0, s * r]), p2 = add(B, rot([0, s * r], a));
    const coin = add(B, mul(d, s * r / Math.cos(a / 2 * RAD)));
    const o1 = add(p1, [0, s * 3]), o2 = add(p2, rot([0, s * 3], a)), oc = add(coin, mul(d, s * 4));
    const bal = a > 0 ? 1 : 0;
    const arrondi = `<path d="M${P(p1)} L${P(o1)} L${P(oc)} L${P(o2)} L${P(p2)} A${f1(r)} ${f1(r)} 0 0 ${1 - bal} ${P(p1)} Z" ${BLANC}/>` +
      `<path d="M${P(p1)} A${f1(r)} ${f1(r)} 0 0 ${bal} ${P(p2)}" ${h.a.contour}/>`;
    const svg = [defs, avantBras, `<g clip-path="url(#${idM})">${m}</g>`, arrondi, boite([m.trou.x, m.trou.y], m.trou.r)].join('\n');
    return { svg, m, yT, yV };
  }

  // La table, coupée à gauche : le dessus sous l'avant-bras, le chant, le dessous.
  function table(xg, xb, y) {
    const ep = 26;
    return [
      h.rect(xg, y, xb - xg, ep, h.a.hachure('bois', 'aucun')),
      h.chemin([[xg, y], [xb, y], [xb, y + ep], [xg, y + ep]], h.a.contour),
    ].join('\n');
  }

  // L'arc que suit le poing, centré sur le pli, avec un trait par temps compté.
  function arc(B, de, a, rho, temps) {
    const pt = t => add(B, rot([rho, 0], t));
    const bal = a > de ? 1 : 0;
    const out = [h.fleche(`M${P(pt(de))} A${rho} ${rho} 0 0 ${bal} ${P(pt(a))}`, h.a.arete)];
    for (let i = 1; i < temps; i++) {
      const t = de + (a - de) * i / temps;
      out.push(h.ligne(...add(B, rot([rho - 7, 0], t)), ...add(B, rot([rho + 7, 0], t)), h.a.arete));
    }
    return out.join('\n');
  }

  const HAUT = -45, BAS = 55;                         // la main levée, la main descendue
  const vueExercice = (a, de, vers, temps, paumeEnHaut = false) => z => {
    const B = [z.l * 0.40, z.h * (paumeEnHaut ? 0.52 : 0.46)];
    const avb = B[0] - 6;
    const pp = poingPlie(B, paumeEnHaut ? -a : a, avb);
    const rho = 148 * E;
    let dessin = pp.svg;
    let yTable = pp.yV;
    if (paumeEnHaut) {
      dessin = `<g transform="translate(0 ${f1(2 * B[1])}) scale(1 -1)">${pp.svg}</g>`;
      yTable = 2 * B[1] - pp.yT;
    }
    return {
      B, yTable, trou: pp.m.trou, paumeEnHaut,
      svg: [table(6, B[0] - 44 * E, yTable), dessin, arc(B, de, vers, rho, temps)].join('\n'),
    };
  };

  // les vues de l'exercice, calculées une fois par taille de vue
  const cache = {};
  const ex = (cle, fab) => z => (cache[cle] = cache[cle] || fab(z));
  const monter = ex('monter', vueExercice(HAUT, BAS + DECALE, HAUT + DECALE, 2));
  const descendre = ex('descendre', vueExercice(BAS, HAUT + DECALE, BAS + DECALE, 4));
  const dedans = ex('dedans', vueExercice(BAS, -(BAS + DECALE), -(HAUT + DECALE), 4, true));

  // L'étirement : le bras tendu, la main pliée vers le bas, la poussée de l'autre main.
  const ES = 1.15;
  const etirement = z => {
    const W = [z.l * 0.52, 52];
    const m0 = F.main({ x: 0, y: 0, pose: 'appui', vue: 'profil', inclinaison: -80, angle: 80, bras: (z.l * 0.52 - 8) / ES, echelle: ES });
    const o = [W[0] - m0.poignet[0], W[1] - m0.poignet[1]];
    const m = F.main({ x: o[0], y: o[1], pose: 'appui', vue: 'profil', inclinaison: -80, angle: 80, bras: (z.l * 0.52 - 8) / ES, echelle: ES });
    // la poussée : un arc autour du poignet, qui vient toucher le dos des doigts
    const rho = 118 * ES, pt = t => add(W, rot([rho, 0], t));
    const fl = h.fleche(`M${P(pt(38))} A${f1(rho)} ${f1(rho)} 0 0 1 ${P(pt(78))}`, h.a.arete);
    return { W, o, svg: [m.toString(), fl].join('\n'), rho, pt };
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
            { n: 1, rond: [22, v.yTable + 50], cible: [B[0] - 70 * E, B[1]], texte: 'l’avant-bras à plat' },
            { n: 2, rond: [B[0] - 20, v.yTable + 60], cible: [B[0] - 44 * E, v.yTable + 2], texte: 'le poignet dépasse du bord' },
            { n: 3, rond: [v.trou.x - 78, v.trou.y - 62], cible: [v.trou.x - v.trou.r * 0.85, v.trou.y - v.trou.r * 0.45], texte: 'sans poids, puis une boîte' },
            { n: 4, rond: [z.l - 18, B[1] + 60], cible: add(B, rot([148 * E, 0], 38)), texte: 'un trait par temps compté' },
          ];
        },
      },
      descendre: {
        titre: 'Redescendre lentement, en 4 temps',
        dessin: z => descendre(z).svg,
        renvois: z => {
          const v = descendre(z), B = v.B;
          return [
            { n: 5, rond: [z.l - 18, 26], cible: add(B, rot([148 * E, 0], -2)), texte: 'c’est la descente qui soigne' },
            { n: 6, rond: [30, 28], cible: [B[0] - 90 * E, B[1] - DT * E], texte: 'trois séries de dix par jour' },
          ];
        },
      },
      dedans: {
        titre: 'Côté intérieur : paume vers le haut',
        dessin: z => dedans(z).svg,
        renvois: z => {
          const v = dedans(z), B = v.B;
          return [
            { n: 7, rond: [B[0] - 50, 26], cible: add(B, rot([148 * E, 0], -45)), texte: 'monter en 2, redescendre en 4' },
          ];
        },
      },
      etirement: {
        titre: 'L’étirement : 30 s, quatre fois',
        dessin: z => et(z).svg,
        renvois: z => {
          const v = et(z);
          return [
            { n: 8, rond: [40, v.W[1] + 75], cible: [v.W[0] - 100, v.W[1] + 10], texte: 'le bras tendu, paume en bas' },
            { n: 9, rond: [z.l - 18, v.W[1] + 30], cible: v.pt(52), texte: 'l’autre main pousse ici' },
          ];
        },
      },
    },
  };
};
