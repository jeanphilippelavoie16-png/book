'use strict';
// Planche 47-01 — Le bâton de jet et ses deux lancers (chapitre 47, « Le bâton de jet »).
//
// Tout vient du passage : un bâton solide, long comme le bras du bout des doigts à l'épaule, à
// bout mousse ; le meilleur en bois franc lourd, naturellement coudé, aplati sur deux faces comme
// un boomerang, pour qu'il vole à plat. Lancé de côté, bas, à hauteur de la bête : il tourne à
// plat, balaie une bande large comme sa longueur et file au ras de la neige (lièvre au gîte,
// lagopède). Lancé par-dessus l'épaule : il tourne à la verticale et balaie une bande haute comme
// sa longueur (tétras sur sa branche basse). Aucune cote : le chapitre ne donne aucune mesure.
//
// Orientation commune : le lanceur, droitier, à l'ouest (à gauche), la bête à l'est. Dans la
// vue « de côté », la vue de dessus est AU-DESSUS de l'élévation, alignée sur elle (projection à
// l'américaine) : on regarde l'élévation depuis le bas de la vue de dessus, donc on voit le flanc
// droit du lanceur, et son bras proche est celui qui lance. Vu de dessus, le bras droit balaie
// par le sud et le bâton tourne dans le sens antihoraire ; vu de côté, lancé par-dessus l'épaule,
// il tourne dans le sens horaire (le bout du haut part vers la bête).
//
// Refaite le 13 octobre 2026 avec les corps simples (poses debout, lance-bas, lance-haut, de profil)
// et la charte. Le soir, JP : plus de corps vus de face ni de dessus. La vue de dessus du lancer de
// côté garde ce qu'elle montre de l'objet (le bâton qui tourne à plat, la bande balayée, le lièvre)
// et perd le lanceur : il n'en reste que le bâton au départ du geste et l'arc que le bras balaie.
// Le 14 octobre, les deux loupes (la main grossie sur le bout du bâton, calquée) sont retirées : la
// main simple ne se lit pas fermée sur un bâton plat de cette largeur (elle disparaît derrière lui), et
// JP élimine les prises laides. Le chapitre ne dit rien de la prise : le geste se lit sur le corps.
// Les deux lanceurs sont droitiers : le bras proche (le droit) lance, le pied gauche avance (les
// jambes de lance-bas et lance-haut sont échangées dans la planche).
// Le rouge : la flèche du geste, une par lancer (le bras qui balaie, le bras qui passe au-dessus de
// l'épaule). Le vol du bâton et ses tours restent en noir.
module.exports = (h) => {
  const F = h.formes;
  const A = h.a;
  const NOIR = '#1A1A1A';
  const RAD = Math.PI / 180;
  const f1 = v => Math.round(v * 10) / 10;
  const XY = p => `${f1(p[0])} ${f1(p[1])}`;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const uni = v => { const d = Math.hypot(v[0], v[1]) || 1; return [v[0] / d, v[1] / d]; };
  const tourne = (p, deg) => { const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };
  const blanc = ep => `fill="#FFFFFF" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const poly = pts => 'M' + pts.map(XY).join(' L') + ' Z';
  // Catmull-Rom : une courbe qui passe par chaque point
  const cr = (pts, ferme = false) => {
    const n = pts.length, P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${XY(pts[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      d += ` C${XY([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${XY([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${XY(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  const pointille = `fill="none" stroke="${NOIR}" stroke-width="0.7" stroke-linecap="round" stroke-dasharray="0.6 3.2"`;
  const rappel = `fill="none" stroke="${NOIR}" stroke-width="0.5" stroke-dasharray="3 2.5"`;
  const mixte = `fill="none" stroke="${NOIR}" stroke-width="0.5" stroke-dasharray="8 2.5 1.5 2.5"`;
  const trajet = `fill="none" stroke="${NOIR}" stroke-width="0.7" stroke-linecap="round" stroke-dasharray="5 3.5"`;
  const arc = (c, r, a0, a1, sens) => {          // sens 1 : horaire à l'écran ; 0 : antihoraire
    const p0 = add(c, [r * Math.cos(a0 * RAD), r * Math.sin(a0 * RAD)]);
    const p1 = add(c, [r * Math.cos(a1 * RAD), r * Math.sin(a1 * RAD)]);
    return `M${XY(p0)} A${f1(r)} ${f1(r)} 0 0 ${sens} ${XY(p1)}`;
  };

  // ─── le bâton de face, dans un repère unité ───────────────────────────────────────────
  // Deux bras droits (0,44 et 0,56 de l'axe) qui se rejoignent au coude par une courbe, 15° de
  // chaque côté de l'horizontale, coude en haut ; bouts arrondis (mousses). Largeur de la face :
  // 0,075 de l'axe ; épaisseur entre les faces aplaties : 0,45 de la largeur. Proportions de
  // dessin seulement : aucune n'est donnée comme une cote. Normalisé : longueur hors tout 1,
  // origine au centre de la surface (le point autour duquel il tourne en vol).
  const BATON = (() => {
    const dev = 15 * RAD, w = 0.075;
    const dG = [-Math.cos(dev), Math.sin(dev)], dD = [Math.cos(dev), Math.sin(dev)];
    const A0 = mul(dG, 0.44), B0 = mul(dD, 0.56), P1 = mul(dG, 0.1), P2 = mul(dD, 0.1);
    const axe = [];
    for (let i = 0; i <= 12; i++) axe.push(lerp(A0, P1, i / 12));
    for (let i = 1; i <= 8; i++) { const t = i / 8, m = 1 - t; axe.push([m * m * P1[0] + t * t * P2[0], m * m * P1[1] + t * t * P2[1]]); }
    for (let i = 1; i <= 16; i++) axe.push(lerp(P2, B0, i / 16));
    const N = axe.length;
    const tg = i => uni(sub(axe[Math.min(N - 1, i + 1)], axe[Math.max(0, i - 1)]));
    const nm = i => { const t = tg(i); return [t[1], -t[0]]; };          // vers le haut (dehors du coude)
    const haut = axe.map((p, i) => add(p, mul(nm(i), w / 2)));
    const bas = axe.map((p, i) => sub(p, mul(nm(i), w / 2)));
    const capB = [], capA = [];
    for (let k = 1; k < 12; k++) {
      const f = Math.PI * k / 12;
      capB.push(add(B0, add(mul(nm(N - 1), w / 2 * Math.cos(f)), mul(tg(N - 1), w / 2 * Math.sin(f)))));
      capA.push(add(A0, add(mul(nm(0), -w / 2 * Math.cos(f)), mul(tg(0), -w / 2 * Math.sin(f)))));
    }
    const contour = [...haut, ...capB, ...bas.slice().reverse(), ...capA];
    const xs = contour.map(p => p[0]), ext = Math.max(...xs) - Math.min(...xs);
    let ax = 0, cx = 0, cy = 0;                                   // centre de surface
    for (let i = 0; i < contour.length; i++) {
      const p = contour[i], q = contour[(i + 1) % contour.length], c = p[0] * q[1] - q[0] * p[1];
      ax += c; cx += (p[0] + q[0]) * c; cy += (p[1] + q[1]) * c;
    }
    const G = [cx / (3 * ax), cy / (3 * ax)];
    const nz = p => mul(sub(p, G), 1 / ext);
    return { contour: contour.map(nz), axe: axe.map(nz), haut: haut.map(nz), bas: bas.map(nz), coude: nz([0, 0]),
      N, w: w / ext, t: 0.45 * w / ext, iCoupe: 12 + 8 + 10 };
  })();
  const place = (pts, c, L, ang = 0) => pts.map(p => add(c, tourne(mul(p, L), ang)));
  const baton = (c, L, ang, attr = blanc(1.4)) => h.path(poly(place(BATON.contour, c, L, ang)), attr);
  const etendue = (c, L, ang) => { const xs = place(BATON.contour, c, L, ang).map(p => p[0]); return [Math.min(...xs), Math.max(...xs)]; };

  // ─── la bête, à l'échelle s (unités de vue par mm) ────────────────────────────────────
  const T = (o, s) => p => [o[0] + p[0] * s, o[1] + p[1] * s];
  const feuille = (B, P, w) => {                                  // une oreille : base B, pointe P
    const u = uni(sub(P, B)), n = [-u[1], u[0]], L = Math.hypot(P[0] - B[0], P[1] - B[1]);
    return [add(B, mul(n, w / 2)), add(add(B, mul(u, L * 0.45)), mul(n, w * 0.55)), P, add(add(B, mul(u, L * 0.45)), mul(n, -w * 0.55)), add(B, mul(n, -w / 2))];
  };
  // Le lièvre tapi au gîte, de profil, tourné vers le lanceur ; o : au sol sous le milieu.
  const lievreProfil = (o, s) => {
    const t = T(o, s);
    const corps = [[-228, -150], [-224, -124], [-204, -104], [-196, -62], [-192, -12], [-160, 0], [-60, 0], [80, 0], [182, 0],
      [206, -22], [216, -88], [196, -160], [120, -218], [20, -242], [-80, -236], [-140, -212], [-176, -200], [-206, -184], [-224, -166]].map(t);
    const loin = feuille([-128, -214], [4, -270], 34).map(t), proche = feuille([-150, -206], [-14, -262], 40).map(t);   // couchées sur le dos
    return [
      h.path(cr(loin, true), blanc(0.7)), h.path(cr(corps, true), blanc(1.4)), h.path(cr(proche, true), blanc(0.7)),
      h.path(cr([[146, -152], [176, -84], [150, -16]].map(t)), A.fin),
      h.path(cr([[-160, -76], [-166, -30], [-170, -4]].map(t)), A.fin),
      h.cercle(...t([-184, -168]), Math.max(0.9, 11 * s), A.plein),
    ].join('\n');
  };
  // Le même, vu de dessus : la tête en avant, les oreilles couchées sur le dos, le bout des
  // grands pieds de derrière qui dépasse des flancs ; o : le milieu du dos.
  const lievreDessus = (o, s) => {
    const t = T(o, s);
    const corps = [[-150, 0], [-140, -36], [-96, -50], [-20, -66], [70, -92], [150, -96], [200, -66], [220, -20], [220, 20],
      [200, 66], [150, 96], [70, 92], [-20, 66], [-96, 50], [-140, 36]].map(t);
    const tete = [[-246, 0], [-236, -20], [-204, -38], [-164, -40], [-136, -20], [-130, 0], [-136, 20], [-164, 40], [-204, 38], [-236, 20]].map(t);
    const pied = k => [[-40, k * 92], [0, k * 112], [80, k * 122], [140, k * 108], [110, k * 84], [20, k * 78]].map(t);
    return [
      h.path(cr(pied(-1), true), blanc(0.7)), h.path(cr(pied(1), true), blanc(0.7)),
      h.path(cr(corps, true), blanc(1.4)), h.path(cr(tete, true), blanc(1.4)),
      h.path(cr(feuille([-176, -16], [-6, -46], 58).map(t), true), blanc(0.7)),
      h.path(cr(feuille([-176, 16], [-6, 46], 58).map(t), true), blanc(0.7)),
      h.cercle(...t([-204, -26]), Math.max(0.9, 11 * s), A.plein), h.cercle(...t([-204, 26]), Math.max(0.9, 11 * s), A.plein),
    ].join('\n');
  };
  // Le tétras perché, de profil, tourné vers le lanceur ; o : les pattes sur la branche.
  const tetras = (o, s) => {
    const t = T(o, s);
    const corps = [[-176, -268], [-158, -257], [-148, -236], [-152, -190], [-130, -130], [-82, -86], [-20, -70], [40, -80],
      [110, -70], [160, -40], [174, -60], [122, -110], [70, -152], [0, -192], [-70, -224], [-108, -262], [-134, -292], [-160, -286]].map(t);
    return [
      h.path(cr([[-44, -80], [-42, -30], [-40, 0]].map(t)), A.detail), h.path(cr([[-14, -76], [-12, -30], [-10, 0]].map(t)), A.detail),
      h.path(cr(corps, true), blanc(1.4)),
      h.path(cr([[-98, -178], [-30, -142], [40, -118], [96, -104]].map(t)), A.fin),
      h.path(cr([[40, -118], [60, -100], [84, -92]].map(t)), A.fin),
      h.path(`M${XY(t([-40, 0]))} L${XY(t([-72, 4]))} M${XY(t([-10, 0]))} L${XY(t([-40, 4]))}`, A.detail),
      h.cercle(...t([-140, -266]), Math.max(0.9, 10 * s), A.plein),
    ].join('\n');
  };
  // La main au départ du geste, vue de dessus : derrière le lanceur, au bout de l'arc que le bras
  // balaie ; le bâton à plat, tenu par un bout.
  const mainDessus = g => {
    const a = 100 * RAD, M = add(g.S, [RB * 0.85 * Math.cos(a), RB * 0.85 * Math.sin(a)]);
    const u = uni(sub(M, g.S));
    return { M, u, tr: [-u[1], u[0]], angM: Math.atan2(u[1], u[0]) / RAD };
  };
  const batonDepart = g => {
    const { M, tr } = mainDessus(g), eM = 0.12;
    const cB = add(M, mul(tr, LB * 0.5 - (53 * eM + 2)));              // le bout mousse dépasse du petit doigt
    return baton(cB, LB, Math.atan2(tr[1], tr[0]) / RAD);
  };
  // La neige : un trait de sol et une bande pointillée dessous.
  const neige = (z, yG) => [h.rect(4, yG, z.l - 8, 9, A.hachure('neige', 'aucun')), h.ligne(4, yG, z.l - 4, yG, A.arete)].join('\n');

  // ─── les deux lancers, à la même échelle ──────────────────────────────────────────────
  // Le bâton fait 740 mm à cette échelle : du bout des doigts à l'épaule du personnage de la
  // bibliothèque (bras 300, avant-bras 255, main 185). La bête est à un peu plus de deux
  // longueurs de bâton de la main : « quelques longueurs de bâton, pas plus ».
  const E = 0.075;                        // unités de vue par mm (le corps en fente tient avec le lièvre dans la vue)
  const LB = 740 * E;
  const RB = 740 * E;                     // le rayon du geste : du centre de l'épaule au bout des doigts

  // Un corps posé à gauche de sa vue : on le rend une fois pour lire sa boîte, puis à sa place.
  const corpsA = (o, xMin) => { const c0 = F.corps({ ...o, x: 0 }); return F.corps({ ...o, x: xMin - c0.boite.x0 }); };
  // le droitier : le pied gauche (loin) devant, le droit (proche) derrière
  const JAMBES_BAS = { cuisseP: -52, jambeP: -63, piedP: 41, cuisseL: 76, jambeL: -4, piedL: 90 };
  const JAMBES_HAUT = { cuisseP: -22, jambeP: -24, piedP: 70, cuisseL: 18, jambeL: 2, piedL: 90 };

  const geoCote = z => {
    const yG = z.h - 16;
    // la main droite fermée sur un bout du bâton, au lâcher : le bâton qui part à plat se présente
    // par le bout (son coupe aplatie dans le poing)
    const pers = corpsA({ y: yG, pose: 'lance-bas', vue: 'profil', age: 'adulte', echelle: E, angles: JAMBES_BAS,
      objet: g => { const r = g.mainP.r || 15 * E;
        return `<ellipse cx="${f1(g.mainP.x)}" cy="${f1(g.mainP.y)}" rx="${f1(r)}" ry="${f1(r * 0.5)}" transform="rotate(${f1(g.mainP.angle)} ${f1(g.mainP.x)} ${f1(g.mainP.y)})" ${A.plein}/>`; } }, 6);
    const mp = [pers.mainP.x, pers.mainP.y], S0 = pers.articulations.epauleP;
    // vue de dessus : l'épaule droite 200 mm au sud du milieu du corps ; la main lâche le bâton
    // au bout d'un arc de rayon RB, à l'aplomb de la main de la vue de côté
    const Sx = S0[0];
    const aLache = Math.acos(Math.min(1, (mp[0] - Sx) / RB));
    const yCorps = 26, Sy = yCorps + 200 * E;
    const yRel = Sy + RB * Math.sin(aLache);
    const xs = [0, 1, 2].map(i => mp[0] + LB * (0.45 + 0.62 * i));
    const hs = [250, 195, 190].map(v => yG - v * E);
    const ang = [20, -45, -105];
    const xH = mp[0] + LB * 2.2;
    return { yG, pers, mp, xs, hs, ang, xH, yRel, yCorps, S: [Sx, Sy], aLache: aLache / RAD, yLievre: yRel - 0.2 * LB };
  };
  const geoEpaule = z => {
    const yG = z.h - 16;
    // la main droite armée derrière la tête, le coude haut, le poignet cassé vers l'arrière, fermée
    // sur un bout du bâton qui pend dans le dos
    const o = { y: yG, pose: 'lance-haut', vue: 'profil', age: 'adulte', echelle: E, angles: { ...JAMBES_HAUT, mainP: -100 } };
    const p0 = corpsA(o, 40);
    const mp = [p0.mainP.x, p0.mainP.y], S = p0.articulations.epauleP;
    const ax = [Math.cos(p0.mainP.angle * RAD), Math.sin(p0.mainP.angle * RAD)];
    const dB = ax[1] > 0 ? ax : mul(ax, -1);                               // le bâton pend dans le dos
    const cB = add(mp, mul(dB, LB * 0.5 - 75 * E)), angB = Math.atan2(dB[1], dB[0]) / RAD;
    const pers = corpsA({ ...o, objetP: baton(cB, LB, angB) }, 40);
    const R = [S[0] + 150 * E, S[1] - 560 * E];                         // le lâcher, au-dessus de la tête
    const xs = [0, 1, 2].map(i => R[0] + LB * (0.42 + 0.68 * i));
    const hs = [1965, 1930, 1900].map(v => yG - v * E);
    const ang = [-60, 15, 90];
    const xG = R[0] + LB * 2.25, yBr = yG - 1700 * E;
    const xT = xG + LB * 0.42;
    return { yG, pers, mp, R, S, xs, hs, ang, xG, yBr, xT, yBande: yG - 1900 * E };
  };

  // Une épinette : le tronc effilé, des branches qui tombent un peu et relèvent le bout,
  // de plus en plus courtes vers la cime. Les aiguilles : un seul tracé par branche.
  const epinette = (z, g) => {
    const out = [], { xT, yG, yBr, xG } = g;
    out.push(h.chemin([[xT - 5.5, yG], [xT - 1.5, 2]], A.arete), h.chemin([[xT + 5.5, yG], [xT + 1.5, 2]], A.arete));
    const branche = (p0, p1, trait, lg = 3.4, pas = 2.4) => {
      const L = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
      const m = add(lerp(p0, p1, 0.5), [0, L * 0.07]);                 // elle tombe un peu
      const Q = t => { const u = 1 - t; return [u * u * p0[0] + 2 * u * t * m[0] + t * t * p1[0], u * u * p0[1] + 2 * u * t * m[1] + t * t * p1[1]]; };
      let d = '';
      for (let s = 2; s < L - 0.5; s += pas) {
        const q = Q(s / L), u = uni(sub(Q(Math.min(1, s / L + 0.02)), Q(Math.max(0, s / L - 0.02)))), n = [-u[1], u[0]];
        const k = lg * (0.6 + 0.4 * (1 - s / L));
        d += ` M${XY(add(q, add(mul(n, k), mul(u, k * 0.45))))} L${XY(q)} L${XY(add(q, add(mul(n, -k), mul(u, k * 0.45))))}`;
      }
      return [h.path(d.trim(), A.fin), h.path(`M${XY(p0)} Q${XY(m)} ${XY(p1)}`, trait)].join('\n');
    };
    // la branche basse du tétras : longue, presque droite
    out.push(branche([xT - 5, yBr - LB * 0.02], [xG - LB * 0.4, yBr + 1], A.arete, 3.4, 2.2));
    out.push(branche([xT + 5, yBr - LB * 0.1], [Math.min(z.l - 6, xT + LB * 0.45), yBr - LB * 0.06], A.detail));
    // les branches du dessus
    const niveaux = [];
    for (let y = yBr - LB * 0.6; y > 16; y -= LB * 0.5) niveaux.push(y);
    niveaux.forEach((y, i) => {
      const lg = LB * (0.95 - 0.75 * (i + 1) / (niveaux.length + 1));
      out.push(branche([xT - 3, y], [xT - 3 - lg, y + lg * 0.12], A.detail));
      const ld = Math.min(lg * 0.85, z.l - xT - 6);
      out.push(branche([xT + 3, y - 2], [xT + 3 + ld, y - 2 + ld * 0.12], A.detail));
    });
    return out.join('\n');
  };

  // ─── la vue du bâton : par la tranche, de face, en coupe ──────────────────────────────
  const geoBaton = z => {
    const L = z.l - 64, yT = 16;
    const tp = BATON.t * L, wp = BATON.w * L;
    const yMin = Math.min(...BATON.contour.map(p => p[1]));
    const c = [z.l / 2 - 6, yT + tp + 30 - yMin * L];
    const cont = place(BATON.contour, c, L), axe = place(BATON.axe, c, L);
    const xs = cont.map(p => p[0]), x0 = Math.min(...xs), x1 = Math.max(...xs);
    const pG = cont[xs.indexOf(x0)], pD = cont[xs.indexOf(x1)];
    const i = BATON.iCoupe, C0 = axe[i];
    const tC = uni(sub(axe[i + 1], axe[i - 1])), nC = [tC[1], -tC[0]];     // nC vers le haut
    const R = wp / 2, Cs = sub(C0, mul(nC, wp + 18));
    return { L, yT, tp, wp, c, cont, axe, x0, x1, pG, pD, C0, tC, nC, R, Cs, coude: place([BATON.coude], c, L)[0] };
  };
  // ─── sa longueur : le bâton debout à côté du bras qui pend ────────────────────────────
  const geoMesure = z => {
    const e = (z.h - 10) / 1790, yG = z.h - 4, x = 44;
    const p = F.corps({ x, y: yG, pose: 'debout', vue: 'profil', age: 'adulte', echelle: e });
    const epaule = p.articulations.epauleP;
    // le bout des doigts : le poignet, plus une main (189 mm) le long de l'axe de la main
    const doigts = add(p.poignetP, mul([Math.cos(p.mainP.axe * RAD), Math.sin(p.mainP.axe * RAD)], 189 * e));
    const L = doigts[1] - epaule[1];
    const c = [x + 420 * e, (doigts[1] + epaule[1]) / 2];
    const xs = place(BATON.contour, c, L, 90).map(q => q[0]);
    return { e, p, epaule, doigts, L, c, xBaton: Math.min(...xs) };
  };

  return {
    ref: '47-01',
    titre: 'Le bâton de jet et ses deux lancers',
    desc: 'Le bâton de jet dessiné comme une pièce à fabriquer : vu par la tranche, de face (un bois franc naturellement coudé, à bouts mousses) et en coupe (la branche ronde aplatie sur deux faces). À côté, sa longueur : debout contre le bras qui pend, du bout des doigts à l’épaule. En bas, les deux lancers à la même échelle. De côté, vu de dessus puis de côté : le lanceur en fente basse, la main droite fermée sur un bout du bâton (grossie dans un rond : vue de dessus, le bâton à plat qui traîne derrière le poing), le bras qui balaie à l’horizontale, le bâton qui tourne à plat au ras de la neige et balaie une bande large comme sa longueur jusqu’au lièvre tapi. Par-dessus l’épaule : la main armée derrière la tête, le coude haut, fermée sur un bout du bâton qui pend dans le dos (grossie dans un rond), le bras qui passe au-dessus de l’épaule, le bâton qui tourne à la verticale et balaie une bande haute comme sa longueur jusqu’au tétras sur la branche basse d’une épinette.',
    format: 'pleine',
    disposition: [['baton', 'mesure'], ['cote', 'epaule']],
    hauteurs: [1, 1.75],
    largeurs: [[2.3, 1], [1, 1]],
    vues: {
      baton: {
        titre: 'Le bâton : par la tranche, de face, en coupe',
        dessin: z => {
          const g = geoBaton(z), out = [];
          // par la tranche, au-dessus de la face, alignée sur elle
          out.push(`<rect x="${f1(g.x0)}" y="${f1(g.yT)}" width="${f1(g.x1 - g.x0)}" height="${f1(g.tp)}" rx="${f1(g.tp / 2)}" ${blanc(1.4)}/>`);
          out.push(h.ligne(g.x0, g.yT + g.tp + 3, g.x0, g.pG[1] - 4, rappel), h.ligne(g.x1, g.yT + g.tp + 3, g.x1, g.pD[1] - 4, rappel));
          // de face
          out.push(h.path(poly(g.cont), blanc(2.4)));
          const fil = (k, de, a) => {                    // le fil du bois, le long de l'axe
            const pts = [];
            for (let j = de; j <= a; j++) {
              const tt = uni(sub(g.axe[Math.min(BATON.N - 1, j + 1)], g.axe[Math.max(0, j - 1)])), nn = [tt[1], -tt[0]];
              pts.push(add(g.axe[j], mul(nn, k * g.wp)));
            }
            return h.path(cr(pts), A.fin);
          };
          out.push(fil(0.2, 2, 17), fil(-0.12, 5, 24), fil(0.1, 19, 34), fil(-0.22, 24, 31));
          // la coupe, sur le prolongement du trait de coupe
          const m1 = add(g.C0, mul(g.nC, g.wp / 2 + 4)), m2 = add(g.C0, mul(g.nC, g.wp / 2 + 13));
          const m3 = sub(g.C0, mul(g.nC, g.wp / 2 + 4)), m4 = sub(g.C0, mul(g.nC, g.wp / 2 + 11));
          out.push(h.ligne(...m1, ...m2, A.contour), h.ligne(...m3, ...m4, A.contour));
          out.push(h.ligne(...m2, ...add(g.Cs, mul(g.nC, g.R + 2)), mixte));
          const fc = Math.asin((g.tp / 2) / g.R);
          const P = (a, b) => add(g.Cs, add(mul(g.nC, -a), mul(g.tC, b)));
          const secPts = [];
          for (let k = 0; k <= 10; k++) { const f = -fc + 2 * fc * k / 10; secPts.push(P(g.R * Math.cos(f), g.R * Math.sin(f))); }
          for (let k = 0; k <= 10; k++) { const f = Math.PI - fc + 2 * fc * k / 10; secPts.push(P(g.R * Math.cos(f), g.R * Math.sin(f))); }
          out.push(h.cercle(...g.Cs, g.R, A.cache));
          out.push(h.path(poly(secPts), A.hachure('bois', 'contour')));
          return out.join('\n');
        },
        renvois: z => {
          const g = geoBaton(z);
          return [
            { n: 1, rond: [g.coude[0] - 58, g.coude[1] + 46], cible: add(g.coude, [0, g.wp * 0.9]) },
            { n: 2, rond: [g.x0 + 4, g.pG[1] + 30], cible: [g.x0 + 2, g.pG[1] + 3] },
            { n: 3, rond: [g.Cs[0] + 38, g.Cs[1] + 6], cible: add(g.Cs, mul(g.tC, g.tp / 2)) },
          ].map((r, k) => ({ ...r, texte: ['coudé de nature, en bois franc lourd', 'bout mousse', 'aplati sur deux faces, il vole à plat'][k] }));
        },
      },
      mesure: {
        titre: 'Sa longueur',
        dessin: z => {
          const g = geoMesure(z);
          return [
            g.p.toString(),
            baton(g.c, g.L, 90, blanc(1.4)),
            h.ligne(g.epaule[0] + 70 * g.e, g.epaule[1], g.xBaton - 3, g.epaule[1], rappel),
            h.ligne(g.doigts[0] + 3, g.doigts[1], g.xBaton - 3, g.doigts[1], rappel),
          ].join('\n');
        },
        renvois: z => {
          const g = geoMesure(z);
          return [{ n: 4, rond: [g.c[0] + 44, g.c[1] - 20], cible: [g.c[0] + 10, g.c[1] - 6], texte: 'long du bout des doigts à l’épaule' }];
        },
      },
      cote: {
        titre: 'De côté, sur ce qui est au sol',
        dessin: z => {
          const g = geoCote(z), out = [];
          // ── vue de dessus ──
          const x1 = g.xH + LB * 0.32;
          out.push(h.ligne(g.mp[0], g.yRel - LB / 2, x1, g.yRel - LB / 2, pointille));
          out.push(h.ligne(g.mp[0], g.yRel + LB / 2, x1, g.yRel + LB / 2, pointille));
          out.push(batonDepart(g));
          // le geste : le bras balaie à l'horizontale, de derrière le lanceur jusqu'au lâcher
          out.push(h.geste(arc(g.S, RB, 94, g.aLache + 6, 0)));
          out.push(lievreDessus([g.xH, g.yLievre], E * 1.5));
          out.push(h.fleche(`M${XY([g.mp[0] + 2, g.yRel])} L${XY([x1 - 4, g.yRel])}`, trajet));
          g.xs.forEach((x, i) => out.push(baton([x, g.yRel], LB, g.ang[i])));
          out.push(h.fleche(arc([g.xs[1], g.yRel], LB / 2 + 6, -35, -145, 0), A.detail));
          // ── vue de côté ──
          out.push(neige(z, g.yG));
          out.push(g.pers.toString());
          out.push(lievreProfil([g.xH, g.yG], E));
          const pts = [[g.mp[0], g.mp[1]], ...g.xs.map((x, i) => [x, g.hs[i]]), [g.xH - 0.33 * LB, g.hs[2]]];
          out.push(h.fleche(cr(pts), trajet));
          g.xs.forEach((x, i) => {
            const [a, b] = etendue([x, 0], LB, g.ang[i]), ep = Math.max(3.2, BATON.t * LB);
            out.push(`<rect x="${f1(a)}" y="${f1(g.hs[i] - ep / 2)}" width="${f1(b - a)}" height="${f1(ep)}" rx="${f1(ep / 2)}" ${A.plein}/>`);
          });
          // les rappels entre les deux vues
          g.xs.forEach((x, i) => {
            const bas = Math.max(...place(BATON.contour, [x, g.yRel], LB, g.ang[i]).map(q => q[1]));
            out.push(h.ligne(x, Math.max(bas, g.yRel + LB / 2) + 4, x, g.hs[i] - 6, rappel));
          });
          out.push(h.ligne(g.xH, g.yLievre + 16, g.xH, g.yG - 250 * E, rappel));
          return out.join('\n');
        },
        renvois: z => {
          const g = geoCote(z);
          const bras = add(g.S, [RB * Math.cos(70 * RAD), RB * Math.sin(70 * RAD)]);
          return [
            { n: 5, rond: [bras[0] + 30, bras[1] + 40], cible: bras },
            { n: 6, rond: [g.xs[1] + 26, g.hs[1] - 40], cible: [g.xs[1] + 8, g.hs[1] - 2] },
            { n: 7, rond: [g.xH - 0.3 * LB, g.yRel - LB / 2 - 24], cible: [g.xH - 0.62 * LB, g.yRel - LB / 2] },
            { n: 8, rond: [g.xH + 8, g.yG - 58], cible: [g.xH + 6, g.yG - 18] },
          ].map((r, k) => ({ ...r, texte: ['lancé de côté, à hauteur de la bête', 'tourne à plat, au ras de la neige', 'bande balayée, large comme le bâton', 'lièvre au gîte ou lagopède'][k] }));
        },
      },
      epaule: {
        titre: 'Par-dessus l’épaule, sur ce qui est perché',
        dessin: z => {
          const g = geoEpaule(z), out = [];
          out.push(neige(z, g.yG));
          out.push(h.ligne(g.R[0] + 6, g.yBande - LB / 2, g.xT - 8, g.yBande - LB / 2, pointille));
          out.push(h.ligne(g.R[0] + 6, g.yBande + LB / 2, g.xT - 8, g.yBande + LB / 2, pointille));
          out.push(epinette(z, g));
          out.push(tetras([g.xG, g.yBr], E));
          out.push(g.pers.toString());
          out.push(h.geste(cr([[-300, -560], [-120, -760], [150, -720], [300, -560]].map(q => add(g.S, mul(q, E))))));
          const pts = [[g.R[0], g.R[1]], ...g.xs.map((x, i) => [x, g.hs[i]]), [g.xG - 0.34 * LB, g.yG - 1880 * E]];
          out.push(h.fleche(cr(pts), trajet));
          g.xs.forEach((x, i) => out.push(baton([x, g.hs[i]], LB, g.ang[i])));
          out.push(h.fleche(arc([g.xs[1], g.hs[1]], LB / 2 + 6, -145, -35, 1), A.detail));
          return out.join('\n');
        },
        renvois: z => {
          const g = geoEpaule(z);
          const bras = add(g.S, mul([-40, -700], E));
          const rond9 = add(g.S, mul([60, -1020], E));
          return [
            { n: 9, rond: rond9, cible: bras },
            { n: 10, rond: [g.xs[2] + 4, g.hs[2] - LB / 2 - 26], cible: add([g.xs[2], g.hs[2]], tourne([-LB * 0.28, 0], g.ang[2])) },
            { n: 11, rond: [g.xs[0] + 10, g.yBande + LB / 2 + 24], cible: [g.xs[0] + 16, g.yBande + LB / 2] },
            { n: 12, rond: [g.xG - 8, g.yBr + 40], cible: [g.xG - 2, g.yBr - 12] },
          ].map((r, k) => ({ ...r, texte: ['lancé par-dessus l’épaule', 'tourne à la verticale', 'bande balayée, haute comme le bâton', 'tétras sur sa branche basse'][k] }));
        },
      },
    },
  };
};
