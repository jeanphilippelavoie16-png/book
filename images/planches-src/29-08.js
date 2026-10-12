// Planche 29-08 — Les épaules qui bloquent (chapitre 29, étape 43 ; rappel en 9-G, point 4).
// Ce que dit le chapitre, et rien de plus : la tête est sortie, les épaules ne suivent pas. Essai 1 :
// la mère à quatre pattes, les mains en coupe autour de la tête, traction droite et douce dans l'axe
// du bébé en comptant jusqu'à 30. Essai 2 : la mère au bord du lit, qui tire ses genoux vers ses
// épaules aussi loin qu'elle peut ; quelqu'un appuie fort juste au-dessus de l'os du pubis, pas sur
// le ventre ; la mère pousse de toutes ses forces ; la même traction, jusqu'à 30. Jamais par le cou.
// Les essais 3 et 4 se font dedans, à la main : pas dessinés (rien à voir de dehors).
// Cotes : aucune. Rien ne se construit ici, et le chapitre ne donne pas de mesure de position.
// Géométrie de dessin, jamais imprimée : les personnages de formes.js (1750 de haut). À quatre
// pattes, le tronc, la tête et les bras viennent de la pose accroupie (le bassin y tourne avec le
// dos) et les cuisses de la pose à genoux, les deux hanches au même point. Les jambes du bas sont
// refaites ici : couchées au sol, le cou-de-pied à plat, la plante en l'air, le talon qui marque la
// cheville (la pose à genoux de formes.js dresse le pied à la verticale, en bloc). Le ventre de fin
// de grossesse est peint par-dessus le tronc ; la jambe, le pied et le bras proches passent devant.
// Sur le lit (passe qualité, 28 sept.) : la mère refaite de profil, couchée à plat, la tête à gauche
// sur un oreiller, les fesses au ras du bord. Tronc, ventre et sein dessinés ici dans le repère
// couché (millimètres autour de la hanche, x vers les pieds, y vers le bas) ; le cou et la tête
// viennent du personnage debout de formes.js, tourné d'un quart de tour. Une seule jambe : la
// cuisse part de la fesse et monte à 66° jusqu'au genou, à côté du haut du ventre ; la jambe du bas
// remonte vers la droite, le pied en l'air. Le ventre passe devant la cuisse : son contour reste
// entier, et entre le bas du ventre et l'arrière de la cuisse il reste un blanc, juste au-dessus du
// pubis, où arrive la flèche de l'aide (l'aide n'est pas dessinée ; le chapitre ne dit rien de sa
// main). Le bras de la mère monte de l'épaule, coude en l'air, et sa main (la prise vue du dos de
// formes.js) tient le genou par derrière, les doigts dans le pli. La flèche courbe tourne autour de
// la hanche, du genou vers l'épaule, par-dessus l'avant-bras qui tire.
// L'axe de la tête du bébé (148° à quatre pattes, 15° sur le lit) est un choix de dessin : le
// chapitre dit « dans l'axe du bébé », sans angle ; la flèche de traction suit l'ovale de la tête.
module.exports = (h) => {
  const A = h.a;
  const I = h.formes._interne;
  const NOIR = /stroke="([^"]+)"/.exec(A.arete)[1];
  const BLANC = /fill="([^"]+)"/.exec(A.blanc)[1];
  const f = v => Math.round(v * 10) / 10;
  const RAD = Math.PI / 180;
  const tourne = (p, d) => { const c = Math.cos(d * RAD), s = Math.sin(d * RAD); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const trait = ep => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const FOND = `fill="${BLANC}" stroke="none"`;

  // Catmull-Rom → cubiques, comme formes.js
  const lisse = (pts, ferme = false) => {
    const n = pts.length, P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };

  // Un personnage de formes.js découpé en pièces : [bras loin, jambe loin, pied loin, tronc, cou,
  // tête, jambe proche, pied proche, bras proche]. Chaque pièce : son aplat, ses traits, ses détails.
  const NOMS = ['brasLoin', 'jambeLoin', 'piedLoin', 'tronc', 'cou', 'tete', 'jambe', 'pied', 'bras'];
  const decoupe = pers => {
    const lignes = String(pers).split('\n').slice(1, -1);
    const i0 = lignes.findIndex(l => l.includes('stroke="none"'));
    const pcs = [];
    lignes.slice(i0).forEach(l => { if (l.includes('stroke="none"')) pcs.push({ fond: l, traits: [], dets: [] });
      else if (/stroke-width="0\.5"/.test(l)) pcs[pcs.length - 1].dets.push(l); else pcs[pcs.length - 1].traits.push(l); });
    const o = {}; NOMS.forEach((n, i) => { o[n] = pcs[i]; }); return o;
  };
  // Une pièce faite ici : un chemin fermé pour l'aplat, un chemin ouvert pour le trait.
  const piece = (remp, courbe) => ({ fond: `<path d="${remp}" ${FOND}/>`, traits: [`<path d="${courbe}" ${trait(0.7)}/>`], dets: [] });
  // Une pièce construite par les outils de formes.js (tube, lisse) : ses chemins passent par T.
  const enPiece = (g, T) => ({ fond: `<path d="${I.ser(g.remp, T)}" ${FOND}/>`, traits: g.trait.map(t => `<path d="${I.ser(t, T)}" ${trait(0.7)}/>`),
    dets: (g.det || []).map(t => `<path d="${I.ser(t, T)}" ${trait(0.5)}/>`) });
  // Peint comme formes.js : toutes les silhouettes à 2,4 dessous, puis chaque pièce du fond vers
  // l'œil (aplat, trait intérieur 0,7, détails). Une chaîne SVG passe telle quelle, à sa place.
  // Une pièce peut porter clip : l'id d'un clipPath qui la coupe (la main d'un bras, au poignet).
  const peindre = liste => {
    const out = [];
    const enc = (p, lignes) => p.clip ? [`<g clip-path="url(#${p.clip})">`, ...lignes, '</g>'] : lignes;
    liste.forEach(p => { if (typeof p !== 'string') out.push(...enc(p, p.traits.map(t => t.replace(/stroke-width="[^"]+"/, 'stroke-width="2.4"')))); });
    liste.forEach(p => { if (typeof p === 'string') out.push(p); else out.push(...enc(p, [p.fond, ...p.traits, ...p.dets])); });
    return out.join('\n');
  };
  // Le demi-plan { p : (p − W)·u ≤ 0 } coupé au rectangle de la vue : ce qui reste d'un bras quand on
  // lui ôte la main au poignet W (u : le sens de l'avant-bras, du coude vers la main).
  const demiPlan = (W, u, l, ht) => {
    const rect = [[0, 0], [l, 0], [l, ht], [0, ht]], d = p => (p[0] - W[0]) * u[0] + (p[1] - W[1]) * u[1];
    const out = [];
    rect.forEach((p, i) => { const q = rect[(i + 1) % 4], dp = d(p), dq = d(q);
      if (dp <= 0) out.push(p);
      if ((dp <= 0) !== (dq <= 0)) { const t = dp / (dp - dq); out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]); } });
    return out.map(p => `${f(p[0])},${f(p[1])}`).join(' ');
  };
  const coords = d => (d.match(/-?\d+(\.\d+)?/g) || []).map(Number);

  // Le repère du tronc d'un personnage (hanche en 0 0, le haut vers −y, le devant vers +x), comme
  // formes.js le tourne : le bassin d'une part kb du penché, la poitrine du penché entier.
  const POST = { genoux: { H: [-45, -495], kb: 0.35 }, accroupi: { H: [-150, -300], kb: 0.85 } };
  const repereTronc = o => {
    const P = POST[o.pose], L = o.penche;
    const kP = y => { const t = Math.max(0, Math.min(1, (-150 - y) / 150)); return P.kb + (1 - P.kb) * t * t * (3 - 2 * t); };
    const T = p => add([o.x, o.y], tourne(mul(p, o.echelle), o.angle || 0));      // posture → vue
    const V = p => T(add(P.H, tourne(p, L * kP(p[1]))));                          // tronc → vue
    return { T, V };
  };
  // Le ventre de fin de grossesse, dans le repère du tronc : du dessus du pubis jusque sous les seins.
  const VENTRE = [[88, -30], [122, -52], [192, -100], [254, -165], [272, -235], [250, -300], [198, -352], [142, -392], [112, -420]];
  const ventre = V => {
    const pts = VENTRE.map(V), dedans = [[55, -420], [55, -30]].map(V);
    const courbe = lisse(pts);
    return piece(`${courbe} L${f(dedans[0][0])} ${f(dedans[0][1])} L${f(dedans[1][0])} ${f(dedans[1][1])} Z`, courbe);
  };
  // La tête du bébé, sortie : un ovale dans l'axe du bassin, le bout vers l'extérieur.
  const bebe = (c, axe, s) => {
    const u = uni(axe), n = [-u[1], u[0]], a = 62 * s, b = 52 * s;
    const pts = []; for (let k = 0; k < 16; k++) { const t = k / 16 * 2 * Math.PI; pts.push(add(c, add(mul(u, a * Math.cos(t)), mul(n, b * Math.sin(t))))); }
    const d = lisse(pts, true);
    return piece(d, d);
  };
  const dirDeg = d => [Math.cos(d * RAD), Math.sin(d * RAD)];
  const seg = (a, b) => `M${f(a[0])} ${f(a[1])} L${f(b[0])} ${f(b[1])}`;

  // La jambe de formes.js (mêmes épaisseurs, même tube), avec la cheville où on la veut.
  const JAMBE = { dos: [[76, 50], [47, 31]], ventre: [[86, 52], [53, 33]], coussin: [0, 11] };
  const jambeTube = (Hh, K, Ac, o = {}) => I.tube({ pts: [Hh, K, Ac], sens: 1, dos: JAMBE.dos, ventre: JAMBE.ventre, coussin: JAMBE.coussin,
    bout: 'ouvert', base: o.base == null ? 90 : o.base, plis: false, ouvre: o.ouvre || null });
  // Le pied de formes.js (repère à la cheville, semelle en y = 80 à plat), tourné de ang.
  const PIED = [[70, 20], [140, 47], [187, 57], [205, 69], [196, 78], [140, 80], [70, 76], [-28, 80], [-57, 62], [-55, 26]];
  const piedTourne = (Ac, u, ang) => {
    const n = [u[1], -u[0]];
    const c = I.lisse([add(Ac, mul(n, 31)), ...PIED.map(p => add(Ac, tourne(p, ang))), sub(Ac, mul(n, 33))]);
    return { remp: [...c, ['L', Ac], ['Z']], trait: [c], det: [] };
  };
  // Le pied couché sur le cou-de-pied, la plante en l'air (à quatre pattes). Repère à la cheville,
  // la jambe du bas vers +x, le sol à 36 sous la cheville : le dessus du pied et des orteils au sol,
  // le bout des orteils, la plante, le talon qui remonte au-dessus de la cheville, puis le creux du
  // tendon qui rejoint le mollet.
  const PIED_COUCHE = [[0, 31], [-45, 34.5], [-105, 35.6], [-165, 35.2], [-200, 32.5], [-215, 24], [-212, 13], [-196, 8], [-172, 6.5],
    [-156, 2.5], [-136, -7], [-96, -11], [-52, -16], [-12, -32], [16, -58], [30, -78], [47, -84], [63, -76], [80, -58], [104, -46]];
  const piedCouche = (Ac, u) => {
    const th = Math.atan2(-u[1], -u[0]) / RAD, R = p => add(Ac, tourne(p, th));
    const c = I.lisse(PIED_COUCHE.map(R));
    const malleole = I.lisse([[-17, 9], [-15, -7], [0, -16], [16, -9], [18, 6]].map(R));
    return { remp: [...c, ['L', Ac], ['Z']], trait: [c], det: [malleole] };
  };

  // Une main à plat au sol : la main d'appui de formes.js (un cran plus grande, pour que son poignet
  // ait la largeur de celui du personnage), posée là où le personnage a son poignet, l'avant-bras
  // dans l'axe du sien. La main du personnage, qui file tout droit dans l'axe, est coupée au poignet.
  const EM = 1.2;
  const poignetAuSol = (x, sol, s) => [x, sol - 26 * EM * s];
  const mainAuSol = (pers, cle, sol, s) => {
    const w = pers.poignets[cle], dir = uni(sub(pers.mains[cle], w));
    const inc = ((Math.atan2(-dir[1], -dir[0]) / RAD - 180) % 360 + 360) % 360;
    return String(h.formes.main({ x: w[0] + 50 * EM * s, y: sol, pose: 'appui', vue: 'profil', echelle: EM * s, inclinaison: inc, bras: 40 }));
  };
  const clipPoignet = (pers, cle, id, z) => {
    const w = pers.poignets[cle], dir = uni(sub(pers.mains[cle], w));
    return `<clipPath id="${id}"><polygon points="${demiPlan(w, dir, z.l, z.h)}"/></clipPath>`;
  };

  // ── vue 1 : à quatre pattes ──
  const quatre = z => {
    const s = 0.32, sol = z.h - 14, xk = 215;
    const xa = xk + 105 * s, ya = sol - 195 * s;                // les deux hanches au même point
    const L = 80;
    const g = h.formes.personnage({ x: xk, y: sol, pose: 'genoux', echelle: s, penche: L });
    const { V } = repereTronc({ x: xa, y: ya, pose: 'accroupi', echelle: s, penche: L });
    const epaule = V([-14, -470]);
    const a = h.formes.personnage({ x: xa, y: ya, pose: 'accroupi', echelle: s, penche: L, regard: 40,
      mains: { proche: poignetAuSol(epaule[0] + 20 * s, sol, s), loin: poignetAuSol(epaule[0] + 70 * s, sol, s) } });
    const pg = decoupe(g), pa = decoupe(a);
    // les jambes du bas couchées au sol, la cheville à 36 du sol, le pied à plat sur son dessus ;
    // les cuisses restent celles de formes.js (même hanche, même genou)
    const T1 = p => [xk + p[0] * s, sol + p[1] * s];
    const Ac = [-Math.sqrt(430 * 430 - (58 - 36) ** 2), -36];     // la cheville proche ; la loin, cachée derrière
    const jambeCouchee = (Hh, K) =>
      [enPiece(jambeTube(Hh, K, Ac, { ouvre: { dos: 70, ventre: 105 } }), T1), enPiece(piedCouche(Ac, uni(sub(Ac, K))), T1)];
    [pg.jambe, pg.pied] = jambeCouchee([-45, -495], [0, -58]);
    [pg.jambeLoin, pg.piedLoin] = jambeCouchee([-55, -495], [-14, -58]);
    pa.bras.clip = 'poignet-quatre-proche';
    pa.brasLoin.clip = 'poignet-quatre-loin';
    const defs = `<defs>${clipPoignet(a, 'proche', 'poignet-quatre-proche', z)}${clipPoignet(a, 'loin', 'poignet-quatre-loin', z)}</defs>`;
    // l'arrière de la cuisse proche : formes.js n'en trace le bord qu'à 105 mm sous la hanche ; on
    // le prolonge sur l'aplat de la cuisse jusqu'à la hanche, où il rejoint la fesse
    const cf = coords(/d="([^"]+)"/.exec(pg.jambe.fond)[1]), ct = coords(/d="([^"]+)"/.exec(pg.jambe.traits[0])[1]);
    const b1 = [cf[cf.length - 4], cf[cf.length - 3]];            // le bord arrière, à la hanche
    const b2 = [ct[ct.length - 2], ct[ct.length - 1]];            // où formes.js le fait commencer
    const b3 = add(b2, mul(uni(sub(b2, b1)), 1.5));
    pg.jambe.traits.push(`<path d="${seg(b1, b3)}" ${trait(0.7)}/>`);
    // la tête du bébé : à la vulve, au bas de la fesse, tournée vers l'arrière et le sol
    const axe = dirDeg(148);
    const centre = add(V([30, 95]), mul(axe, 52 * s));
    const corps = peindre([pa.brasLoin, mainAuSol(a, 'loin', sol, s), pg.jambeLoin, pg.piedLoin, bebe(centre, axe, s), pa.tronc, ventre(V),
      pa.cou, pa.tete, pg.jambe, pg.pied, pa.bras, mainAuSol(a, 'proche', sol, s)]);
    return { svg: `${defs}\n${corps}`, sol, centre, axe, bout: add(centre, mul(axe, 62 * s)), s };
  };

  // ── vue 2 : sur le dos, au bord du lit, les genoux vers les épaules ──
  // Repère couché : millimètres autour de la hanche, x vers les pieds, y vers le bas.
  const MAT = 121;                                      // le dessus du matelas, sous le dos et la fesse
  const EP_MAT = 80, EP_LIT = 22;                       // le matelas et la planche du lit, sous lui
  const CV = [100, -30];                                // la vulve : le coin de la fesse et de la cuisse
  const DOS = [[-540, 68], [-492, 102], [-420, 119], [-340, 118], [-250, 115], [-170, 115], [-92, 118], [-8, 121],
    [50, 118], [96, 104], [122, 72], [123, 28], CV];
  const DEVANT = [CV, [62, -60], [18, -80], [-30, -92], [-110, -100], [-200, -96], [-300, -100], [-380, -110], [-418, -116],
    [-448, -131], [-478, -139], [-506, -128], [-528, -100], [-544, -54]];
  const VENTRE_COUCHE = [[-30, -92], [-58, -128], [-100, -190], [-165, -252], [-235, -272], [-300, -252], [-350, -203], [-386, -150], [-412, -118]];
  const A_CUISSE = 66, A_JAMBE = -20;                   // la cuisse monte vers la tête ; la jambe, vers les pieds
  const lit = z => {
    const HAUT = 700, BAS = MAT + EP_MAT + EP_LIT + 4;
    const s = Math.min(0.42, (z.h - 6) / (HAUT + BAS));
    const O = [f(z.l * 0.6), f(z.h - 3 - BAS * s)];
    const P = p => [O[0] + p[0] * s, O[1] + p[1] * s];
    const lisseP = pts => lisse(pts.map(P));
    // le cou et la tête : le personnage debout de formes.js, couché d'un quart de tour, hanche en O
    const pers = decoupe(h.formes.personnage({ x: O[0] + 950 * s, y: O[1], pose: 'debout', echelle: s, angle: -90, penche: 0, regard: 12 }));
    // le tronc couché : le dos à plat, la fesse ronde au bord du lit, le pubis, la poitrine
    const dosD = lisseP(DOS), devD = lisseP(DEVANT);
    const tronc = { fond: `<path d="${dosD} ${devD.replace(/^M/, 'L')} Z" ${FOND}/>`, traits: [`<path d="${dosD}" ${trait(0.7)}/>`, `<path d="${devD}" ${trait(0.7)}/>`], dets: [] };
    const vD = lisseP(VENTRE_COUCHE), vIn = [[-412, -60], [-30, -60]].map(P);
    const ventreC = piece(`${vD} L${f(vIn[0][0])} ${f(vIn[0][1])} L${f(vIn[1][0])} ${f(vIn[1][1])} Z`, vD);
    // la cuisse : son bord arrière part de la vulve, dans le prolongement de la fesse ; la jambe du
    // bas remonte vers la droite, le pied en l'air
    const d = dirDeg(180 + A_CUISSE), nb = [-d[1], d[0]];
    const Hc = sub(sub(CV, mul(d, 50)), mul(nb, 82));
    const K = add(Hc, mul(d, 440)), uJ = dirDeg(A_JAMBE), Ac = add(K, mul(uJ, 430));
    const jambe = enPiece(jambeTube(Hc, K, Ac, { base: 0 }), P);
    const pied = enPiece(piedTourne(Ac, uJ, Math.atan2(-uJ[0], uJ[1]) / RAD + 40), P);
    // la main qui tient le genou par derrière : la prise vue du dos, les doigts dans le pli du genou,
    // l'avant-bras dans l'axe de la main ; le bras monte de l'épaule, coude en l'air
    const pli = add(K, mul(nb, 52));
    const S = [-470, 14], EH = 0.88, R = 30, BR = 20;
    const main = (dirF, bout) => {
      const ang = Math.atan2(dirF[1], dirF[0]) / RAD + 12.4;         // la prise de formes.js penche de −12,4°
      const c = sub(bout, mul(dirF, (19 + 0.35 * R) * EH));
      return h.formes.main({ x: O[0] + c[0] * s, y: O[1] + c[1] * s, pose: 'prise', vue: 'dos', echelle: EH * s, angle: ang, diametre: 2 * R * EH * s, bras: BR });
    };
    const versLit = q => [(q[0] - O[0]) / s, (q[1] - O[1]) / s];
    let dirF = uni(sub(pli, S)), m, E, Wc;
    for (let k = 0; k < 4; k++) {
      m = main(dirF, sub(pli, mul(dirF, 6)));
      Wc = versLit(m.bras);
      E = I.ik2(S, 300, 255 - BR * EH, Wc, 1)[1];
      dirF = uni(sub(Wc, E));
    }
    const bras = enPiece(I.tube({ pts: [S, E, Wc], sens: -1, dos: [[50, 40], [40, 29.5 * EH / 0.88]], ventre: [[50, 37], [43, 30 * EH / 0.88]],
      coussin: [0, 4], bout: 'ouvert', base: 40, ouvre: { dos: 120, ventre: 95 } }), P);
    // la tête du bébé, à la vulve
    const axe = dirDeg(15);
    const centre = add(CV, mul(axe, 40));
    // l'oreiller, sous la tête
    const tete = coords(/d="([^"]+)"/.exec(pers.tete.fond)[1]);
    const tx = tete.filter((_, i) => i % 2 === 0), ty = tete.filter((_, i) => i % 2 === 1);
    const dessousTete = (Math.max(...ty) - O[1]) / s, xg = (Math.min(...tx) - O[0]) / s;
    const ore = [[xg - 30, MAT], [xg - 42, MAT - 22], [xg - 20, dessousTete - 4], [xg + 120, dessousTete + 3], [-560, dessousTete - 6],
      [-515, MAT - 26], [-508, MAT]];
    const oreiller = `<path d="${lisseP(ore)} Z" fill="${BLANC}" ${trait(1.4).replace('fill="none" ', '')}/>`;
    // le lit : le matelas sous le dos, son bord sous les fesses, la planche dessous
    const BORD = 126, xL = -O[0] / s;
    const mat = [[xL, MAT], [BORD - 12, MAT], [BORD, MAT + 12], [BORD, MAT + EP_MAT - 12], [BORD - 12, MAT + EP_MAT], [xL, MAT + EP_MAT]].map(P);
    const couche = [h.rect(0, P([0, MAT])[1], P([BORD, 0])[0], EP_MAT * s, A.blanc), h.chemin(mat, A.contour),
      h.rect(0, P([0, MAT + EP_MAT])[1], P([BORD - 34, 0])[0], EP_LIT * s, A.hachure('bois', 'detail'))].join('\n');
    const svg = [couche, oreiller, peindre([jambe, pied]), peindre([bebe(P(centre), axe, s), tronc, ventreC, pers.cou, pers.tete, bras, String(m)])].join('\n');
    return { svg, s, O, P, K, Hc, S, E, Wc, pli, centre, axe, bout: add(centre, mul(axe, 62)), BORD };
  };

  const memo = {};
  const G = (id, fn, z) => { const k = `${id}-${z.l}-${z.h}`; return memo[k] || (memo[k] = fn(z)); };
  // la flèche courbe du genou : un arc autour de la hanche, qui part au-dessus du genou et descend
  // vers l'épaule par-dessus l'avant-bras
  const arcGenou = g => {
    const r = 585, a0 = Math.atan2(g.K[1] - g.Hc[1], g.K[0] - g.Hc[0]) / RAD;
    const pt = a => g.P(add(g.Hc, mul(dirDeg(a), r)));
    return { r: r * g.s, a: pt(a0 + 1), b: pt(a0 - 15), m: pt(a0 - 6) };
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
          const a0 = add(g.bout, mul(g.axe, 8)), a1 = add(g.bout, mul(g.axe, 58));
          return [g.svg,
            h.ligne(10, g.sol, z.l - 10, g.sol, A.contour),
            h.fleche(seg(a0, a1)),
          ].join('\n');
        },
        renvois: z => {
          const g = G('q', quatre, z);
          const a1 = add(g.bout, mul(g.axe, 40));
          return [
            { n: 1, rond: [g.centre[0] - 20, g.centre[1] - 70], cible: add(g.centre, [-6, -10]), texte: 'la tête tenue en coupe, jamais le cou' },
            { n: 2, rond: [a1[0] - 40, a1[1] + 2], cible: a1, texte: 'traction droite et douce dans l’axe, jusqu’à 30' },
          ];
        },
      },
      lit: {
        titre: '2. Sur le dos, au bord du lit, les genoux vers les épaules',
        dessin: z => {
          const g = G('l', lit, z);
          const k = arcGenou(g);
          const c0 = g.P(add(g.bout, mul(g.axe, 22))), c1 = g.P(add(g.bout, mul(g.axe, 160)));
          const pub = g.P([-44, -112]);
          return [g.svg,
            h.fleche(`M${f(k.a[0])} ${f(k.a[1])} A${f(k.r)} ${f(k.r)} 0 0 0 ${f(k.b[0])} ${f(k.b[1])}`),
            h.fleche(seg(add(pub, [0, -110 * g.s]), add(pub, [0, -3]))),
            h.fleche(seg(c0, c1)),
          ].join('\n');
        },
        renvois: z => {
          const g = G('l', lit, z);
          const k = arcGenou(g);
          const c1 = g.P(add(g.bout, mul(g.axe, 110)));
          const p = g.P([-44, -112 - 60]);
          const haut = g.P([-235, -272]), fesse = g.P([123, 50]);
          return [
            { n: 3, rond: [k.m[0] - 30, k.m[1] - 30], cible: k.m, texte: 'elle tire ses genoux vers ses épaules' },
            { n: 4, rond: [haut[0] - 10, haut[1] + 40], cible: add(haut, [0, 2]), texte: 'pas sur le ventre' },
            { n: 5, rond: [p[0] + 40, p[1] - 22], cible: p, texte: 'appuyer fort juste au-dessus de l’os du pubis' },
            { n: 6, rond: [fesse[0] + 34, fesse[1] + 44], cible: fesse, texte: 'les fesses au bord du lit' },
            { n: 7, rond: [c1[0] + 10, c1[1] - 30], cible: c1, texte: 'elle pousse fort, même traction jusqu’à 30' },
          ];
        },
      },
    },
  };
};
