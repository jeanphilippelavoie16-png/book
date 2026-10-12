// Planche 24-12 — L'exercice du poignet et l'étirement (chapitre 24, étape 30).
// Refaite le 12 octobre (JP : « main weird ») : les mains viennent telles quelles de h.formes.main
// (prise de profil autour de la boîte, appui de profil pour la main tendue et celle qui pousse),
// sans découpe ni trait ajouté dans les doigts. Le pli du poignet se fait ici, hors de la main :
// l'avant-bras est une bande posée sur la table qui finit au poignet ; la main, coupée juste
// après le poignet (sa « coupe »), tourne autour de ce point ; le côté qui s'ouvre s'arrondit
// d'un arc, le côté qui se ferme fait un pli net.
module.exports = (h) => {
  const F = h.formes;
  const RAD = Math.PI / 180, f1 = v => Math.round(v * 10) / 10;
  const rot = (p, a) => [p[0] * Math.cos(a * RAD) - p[1] * Math.sin(a * RAD), p[0] * Math.sin(a * RAD) + p[1] * Math.cos(a * RAD)];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
  const P = p => `${f1(p[0])} ${f1(p[1])}`;
  const BLANC = 'fill="#FFFFFF" stroke="none"';

  const E = 0.95;          // échelle des vues de l'exercice (unités de vue par mm)
  const DIAM = 54;         // la petite boîte de conserve vue par le bout, en mm

  // Le poignet plié. B : le pivot (milieu de la coupe) ; mo : les options de main() ; a : l'angle
  // de la main (+ : vers le bas) ; xa : où l'avant-bras sort de la vue, à gauche.
  function poignetPlie(B, mo, a, xa) {
    const m0 = F.main(Object.assign({}, mo, { x: 0, y: 0, angle: a }));
    const c0 = mul(add(m0.coupe[0], m0.coupe[1]), 0.5);
    const d = sub(B, c0);
    const m = F.main(Object.assign({}, mo, { x: d[0], y: d[1], angle: a }));
    const cD = m.coupe[0], cP = m.coupe[1];                 // le bord dos, le bord paume
    const t = Math.hypot(cD[0] - cP[0], cD[1] - cP[1]) / 2;
    const yD = B[1] - t, yP = B[1] + t;                     // l'avant-bras : dos en haut, paume en bas
    const u = rot([1, 0], a);
    // côté qui se ferme : dos si la main monte (a < 0), paume si elle descend
    const ferme = a < 0 ? { y: yD, c: cD } : { y: yP, c: cP };
    const ouvre = a < 0 ? { y: yP, c: cP } : { y: yD, c: cD };
    // le pli : l'intersection du bord de l'avant-bras et du bord de la main prolongé en arrière
    const k = (ferme.y - ferme.c[1]) / u[1];
    const X = add(ferme.c, mul(u, k));
    const pO = [B[0], ouvre.y];
    const bal = a < 0 ? 0 : 1;
    // la main d'abord ; puis les deux bords de l'avant-bras, prolongés de L sur le moignon de la
    // main ; puis le fond blanc, qui couvre la moitié intérieure de ces traits (la silhouette sort
    // à ~1,5 comme celle de la main) et le bout coupé du moignon
    const L = 6 * (mo.echelle || 1);
    const fL = add(ferme.c, mul(u, L)), oL = add(ouvre.c, mul(u, L));
    const traits = [
      `<path d="M${P([xa, ferme.y])} L${P(X)} L${P(fL)}" ${h.a.contour}/>`,
      `<path d="M${P([xa, ouvre.y])} L${P(pO)} A${f1(t)} ${f1(t)} 0 0 ${bal} ${P(ouvre.c)} L${P(oL)}" ${h.a.contour}/>`,
    ].join('\n');
    const fond = [
      h.rect(xa, yD, B[0] - xa, 2 * t, BLANC),
      h.cercle(B[0], B[1], t, BLANC),
      `<path d="M${P(X)} L${P(fL)} L${P(oL)} L${P(ouvre.c)} L${P(B)} Z" ${BLANC}/>`,
    ].join('\n');
    return { svg: [m.toString(), traits, fond].join('\n'), m, t, yD, yP, d };
  }

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
    const out = [h.fleche(`M${P(pt(de))} A${f1(rho)} ${f1(rho)} 0 0 ${bal} ${P(pt(a))}`, h.a.arete)];
    for (let i = 1; i < temps; i++) {
      const t = de + (a - de) * i / temps;
      out.push(h.ligne(...add(B, rot([rho - 7, 0], t)), ...add(B, rot([rho + 7, 0], t)), h.a.arete));
    }
    return out.join('\n');
  }

  const HAUT = -45, BAS = 50;                         // la main levée, la main descendue
  const PRISE = { pose: 'prise', vue: 'profil', diametre: DIAM * E, echelle: E, bras: 12 };
  const vueExercice = (a, depuis, temps, paumeEnHaut = false) => z => {
    const B = [z.l * 0.36, z.h * (paumeEnHaut ? 0.56 : 0.42)];
    const aa = paumeEnHaut ? -a : a;
    const pp = poignetPlie(B, PRISE, aa, 0);
    const ct = [pp.m.trou.x, pp.m.trou.y], rt = pp.m.trou.r;
    // l'angle du poing vu du poignet, et le rayon de l'arc, juste en dehors des doigts
    const vC = sub(ct, B), aC = Math.atan2(vC[1], vC[0]) / RAD, dC = Math.hypot(vC[0], vC[1]);
    const rho = dC + rt + 34 * E;
    let dessin = [pp.svg, boite(ct, rt)].join('\n');
    const dep = aC + (paumeEnHaut ? -(depuis - a) : (depuis - a));
    let trou = { x: ct[0], y: ct[1], r: rt }, fin = aC, debut = dep;
    if (paumeEnHaut) {
      dessin = `<g transform="translate(0 ${f1(2 * B[1])}) scale(1 -1)">${dessin}</g>`;
      trou = { x: ct[0], y: 2 * B[1] - ct[1], r: rt };
      fin = -aC; debut = -dep;
    }
    const xBord = B[0] - 40 * E;
    return {
      B, yTable: pp.yP, trou, rho, fin, debut,
      svg: [table(6, xBord, pp.yP), dessin, arc(B, debut, fin, rho, temps)].join('\n'),
    };
  };

  // les vues de l'exercice, calculées une fois par taille de vue
  const cache = {};
  const ex = (cle, fab) => z => (cache[cle] = cache[cle] || fab(z));
  const monter = ex('monter', vueExercice(HAUT, BAS, 2));
  const descendre = ex('descendre', vueExercice(BAS, HAUT, 4));
  const dedans = ex('dedans', vueExercice(BAS, HAUT, 4, true));

  // L'étirement : le bras tendu devant soi, paume en bas, la main pliée vers le bas, les doigts
  // allongés ; l'autre main, à plat sur le dos des doigts, les ramène vers soi.
  const ES = 0.8, INC = -10;
  const etirement = z => {
    const B = [z.l * 0.40, 40];
    const PLAT = { pose: 'appui', vue: 'profil', inclinaison: 0, echelle: ES, bras: 12 };
    const pp = poignetPlie(B, PLAT, 80, 0);
    // le dos des doigts de la main pliée : du dos de la jointure au bout de l'index (repère de la main)
    const V = q => add(pp.d, rot(mul(q, ES), 80));
    const k0 = V([14, -27.5]), k1 = V([121, -13.5]);
    const th = Math.atan2(k1[1] - k0[1], k1[0] - k0[0]) / RAD;
    // l'autre main (la gauche), venue d'en dessous : sa paume à plat contre le dos des doigts,
    // ses doigts qui remontent jusqu'aux jointures ; c'est elle qui ramène les doigts vers soi
    const v = rot([1, 0], th), surf = add(k0, mul(v, 126 * ES));
    const pousse = F.main({ x: surf[0], y: surf[1], pose: 'appui', vue: 'profil', cote: 'gauche', inclinaison: INC,
      angle: th, echelle: ES, bras: 30 });
    const rho = 150 * ES, pt = t => add(B, rot([rho, 0], t));
    const fl = h.fleche(`M${P(pt(22))} A${f1(rho)} ${f1(rho)} 0 0 1 ${P(pt(62))}`, h.a.arete);
    return { B, pp, pousse, rho, pt, main8: add(add(surf, mul(v, -30 * ES)), mul(rot([0, -1], th), 12 * ES)), svg: [pp.svg, pousse.toString(), fl].join('\n') };
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
