// Planche 06-01. Traîner au lieu de porter (chapitre 6, section 7, « Traîner au lieu de porter »). Planche neuve,
// 19 octobre 2026.
//
// Ce que dit le texte (chapitres/06-la-liste-de-72-heures.md, section 7), repère par repère, dans l'ordre des gestes :
//   appel   « Sur la neige, traîner ce qu'on ne peut pas porter sur un traîneau d'enfant, un capot d'auto, une feuille
//           de plastique ondulé, une porte sortie de ses pentures, un canot ou une tôle (planche 06-01). »
//   1       « Attacher deux cordes de tirage à l'avant, aux deux coins, jamais au centre : attachée au centre, la charge
//           se met en travers et verse à la première pente (repère 1). »
//   2       « Mettre deux barres rigides entre le traîneau et la taille : deux bouts de bois, des bâtons de ski ou des
//           tuyaux (repère 2). »
//   3       « Sans elles, le traîneau rattrape la personne qui tire dans la première descente et lui frappe les talons ;
//           avec elles, il pousse sur les barres et reste derrière (repère 3). »
//   4       « Faire une ceinture de tirage avec une couverture pliée en bande large, et y nouer les cordes et les barres :
//           on tire avec les hanches, pas avec les bras (repère 4). »
// Aucune cote : le texte ne donne aucune mesure (ni longueur de barre, ni largeur de bande, ni pente). Les proportions
// ci-dessous (un capot d'environ 1,15 × 1,4 m, des barres d'environ 1,3 m) ne servent qu'au dessin ; rien ne s'imprime.
//
// Les vues. En haut, vu de dessus, le capot chargé : une corde à chaque coin avant (1), une barre le long de chaque
// corde jusqu'à la taille (2) ; les barres sortent du dessin par le bord de la page, vers la personne qui tire (un corps
// ne se dessine jamais de dessus). À côté, le raté, marqué comme tel par son titre : une seule corde, au centre ; le
// capot a tourné en travers et la charge a versé dans la neige (sans repère : il n'a pas de rouge). En bas, de côté, en
// descente : le traîneau pousse sur la barre et reste derrière les talons (3), la corde pend, lâche. À côté, de près, la
// ceinture : la couverture pliée en bande autour des hanches, nouée devant ; la barre et la corde nouées dessus (4).
// La marche se fait vers la gauche dans toutes les vues.
//
// Le corps : h.formes.corps, de profil, sans visage (il ne fait rien de la tête). Aucune main en gros plan. La pose de la
// descente part de « retient-derriere » (celle de la 16-08, la même descente vers la gauche), les bras ramenés devant.
// Aucune eau liquide sur la planche : la neige garde sa trame de points.
'use strict';
const path = require('path');

module.exports = (h) => {
  const F = h.formes, NOIR = '#1A1A1A', BLANC = '#FFFFFF';
  const CL = require(path.join(__dirname, '../../.claude/skills/planches/scripts/corps/clipper.js'));
  const f = v => (Math.round(v * 10) / 10).toFixed(1);
  const P = p => `${f(p[0])} ${f(p[1])}`;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
  const lon = a => Math.hypot(a[0], a[1]), uni = a => mul(a, 1 / (lon(a) || 1)), nor = u => [-u[1], u[0]];
  const RAD = Math.PI / 180;
  const tourne = (a, deg) => { const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD); return [a[0] * c - a[1] * s, a[0] * s + a[1] * c]; };
  const blanc = a => a.replace('fill="none"', `fill="${BLANC}"`);
  const chemin = (pts, ferme = false) => 'M' + pts.map(P).join(' L') + (ferme ? ' Z' : '');

  // ─── Clipper (celui des corps simples) ──────────────────────────────────────────────────────
  const SC = 100;
  const versCL = pts => pts.map(p => ({ X: Math.round(p[0] * SC), Y: Math.round(p[1] * SC) }));
  const deCL = Q => Q.map(q => [q.X / SC, q.Y / SC]);
  const op = (t, a, b) => { const c = new CL.Clipper(); c.AddPaths(a, CL.PolyType.ptSubject, true); if (b) c.AddPaths(b, CL.PolyType.ptClip, true); const r = new CL.Paths(); c.Execute(t, r, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero); return r; };
  const union = a => op(CL.ClipType.ctUnion, a);
  const inter = (a, b) => op(CL.ClipType.ctIntersection, a, b);
  const decale = (a, d) => { const o = new CL.ClipperOffset(2, 0.05 * SC); o.AddPaths(a, CL.JoinType.jtRound, CL.EndType.etClosedPolygon); const r = new CL.Paths(); o.Execute(r, d * SC); return r; };
  const lignesDans = (lignes, zone) => {
    const c = new CL.Clipper(); c.AddPaths(lignes.map(versCL), CL.PolyType.ptSubject, false); c.AddPaths(zone, CL.PolyType.ptClip, true);
    const t = new CL.PolyTree(); c.Execute(CL.ClipType.ctIntersection, t, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero);
    return CL.Clipper.OpenPathsFromPolyTree(t).map(deCL);
  };
  const dedans = (zone, p) => zone.some(Q => CL.Clipper.PointInPolygon({ X: Math.round(p[0] * SC), Y: Math.round(p[1] * SC) }, Q) !== 0);
  const dCL = paths => paths.map(Q => chemin(deCL(Q), true)).join(' ');

  // ─── une corde : un trait noir et son âme blanche (comme 15-01 et 15-03) ────────────────────
  const corde = (d, ep = 3.2) => `<path d="${d}" fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"/>\n`
    + `<path d="${d}" fill="none" stroke="${BLANC}" stroke-width="${f(Math.max(0.8, ep - 1.5))}" stroke-linecap="round" stroke-linejoin="round"/>`;
  // une barre droite de a à b, de largeur w : un long rectangle blanc au trait d'arête
  const barre = (a, b, w, at = h.a.arete) => { const n = mul(nor(uni(sub(b, a))), w / 2); return chemin([add(a, n), add(b, n), sub(b, n), sub(a, n)], true); };
  // des tours de ficelle en travers d'une barre : n tours, au pas « pas », à partir de p, le long de u
  const tours = (p, u, w, n, pas, ep = 1.6) => {
    const nn = nor(u), o = [];
    for (let i = 0; i < n; i++) { const c = add(p, mul(u, i * pas)); o.push(corde(chemin([add(c, mul(nn, w / 2 + ep)), sub(c, mul(nn, w / 2 + ep))]), ep)); }
    return o.join('\n');
  };
  // un polygone aux coins arrondis, échantillonné : sommets [x, y, r]
  const arrondi = sommets => {
    const n = sommets.length, out = [];
    for (let i = 0; i < n; i++) {
      const p0 = sommets[(i - 1 + n) % n], p = sommets[i], p1 = sommets[(i + 1) % n], r = p[2] || 0;
      const a = add(p, mul(uni(sub(p0, p)), Math.min(r, lon(sub(p0, p)) / 2))), b = add(p, mul(uni(sub(p1, p)), Math.min(r, lon(sub(p1, p)) / 2)));
      for (let k = 0; k <= 8; k++) { const t = k / 8, m = 1 - t; out.push([m * m * a[0] + 2 * m * t * p[0] + t * t * b[0], m * m * a[1] + 2 * m * t * p[1] + t * t * b[1]]); }
    }
    return out;
  };

  // ─── le capot, vu de dessus ─────────────────────────────────────────────────────────────────
  // Repère local en mm : X vers l'arrière (l'avant du traîneau est à gauche, vers -X), Y en travers. Un capot retourné :
  // le bord avant bombé, l'arrière un peu creux, les coins arrondis ; le rebord replié se lit par un trait intérieur.
  const CAPOT = { L: 1150, Wf: 1250, Wr: 1400 };
  const contourCapot = arrondi([
    [-CAPOT.L / 2 - 70, 0, 560], [-CAPOT.L / 2, -CAPOT.Wf / 2, 140], [CAPOT.L / 2, -CAPOT.Wr / 2, 70],
    [CAPOT.L / 2 - 25, 0, 560], [CAPOT.L / 2, CAPOT.Wr / 2, 70], [-CAPOT.L / 2, CAPOT.Wf / 2, 140],
  ]);
  const TROU = sg => [-CAPOT.L / 2 + 75, sg * (CAPOT.Wf / 2 - 75)];   // le trou d'un coin avant (sg = −1 haut, +1 bas)
  // la charge, en mm locaux : le bac, le sac, la chaudière
  const BAC = { c: [190, -190], l: 620, w: 420 }, SAC = { c: [210, 300], l: 560, w: 300 }, CHAUD = { c: [-270, 120], r: 150 };

  // place un point local : centre (vue), échelle, rotation
  const placeur = (C, S, rot = 0) => q => add(C, mul(tourne(q, rot), S));

  // le bac vu de dessus : la caisse, le couvercle, deux poignées aux bouts
  const bacDessus = (T, b = BAC, extra = 0) => {
    const loc = (x, y) => T(add(b.c, tourne([x, y], extra)));
    const r = (l, w) => [[-l / 2, -w / 2], [l / 2, -w / 2], [l / 2, w / 2], [-l / 2, w / 2]].map(q => loc(...q));
    return [h.path(chemin(r(b.l, b.w), true), blanc(h.a.arete)),
      h.path(chemin(r(b.l - 50, b.w - 50), true), h.a.detail),
      h.path(chemin([loc(-b.l / 2 + 40, -70), loc(-b.l / 2 + 40, 70)]), h.a.arete),
      h.path(chemin([loc(b.l / 2 - 40, -70), loc(b.l / 2 - 40, 70)]), h.a.arete)].join('\n');
  };
  // le sac vu de dessus : un ballot arrondi, le cou noué vers l'avant
  const sacDessus = (T, s = SAC, extra = 0) => {
    const loc = q => T(add(s.c, tourne(q, extra)));
    const corpsSac = arrondi([[-s.l / 2 + 40, -s.w / 2 + 30, 120], [s.l / 2, -s.w / 2, 140], [s.l / 2, s.w / 2, 140], [-s.l / 2 + 40, s.w / 2 - 30, 120]]).map(loc);
    const cou = [[-s.l / 2 + 45, -45], [-s.l / 2 - 25, -22], [-s.l / 2 - 25, 22], [-s.l / 2 + 45, 45]].map(loc);
    const oreille = sg => [[-s.l / 2 - 22, sg * 14], [-s.l / 2 - 95, sg * 62], [-s.l / 2 - 70, sg * 8]].map(loc);
    return [h.path(chemin(oreille(-1), true), blanc(h.a.arete)), h.path(chemin(oreille(1), true), blanc(h.a.arete)),
      h.path(chemin(cou, true), blanc(h.a.arete)),
      h.path(chemin(corpsSac, true), blanc(h.a.arete)),
      h.path(chemin([[-s.l / 2 + 120, -s.w / 2 + 60], [s.l / 2 - 90, -s.w / 2 + 70]].map(loc)), h.a.fin),
      h.path(chemin([[-s.l / 2 + 150, s.w / 2 - 70], [s.l / 2 - 60, s.w / 2 - 55]].map(loc)), h.a.fin)].join('\n');
  };
  // la chaudière vue de dessus : le couvercle, son rebord, l'anse en travers
  const chaudiereDessus = (T, ch = CHAUD, S) => {
    const c = T(ch.c);
    return [h.cercle(c[0], c[1], ch.r * S, blanc(h.a.arete)), h.cercle(c[0], c[1], (ch.r - 28) * S, h.a.detail),
      h.path(chemin([T(add(ch.c, [-ch.r - 18, 0])), T(add(ch.c, [ch.r + 18, 0]))]), h.a.arete)].join('\n');
  };
  const capotDessus = (T, S) => {
    const pts = contourCapot.map(T);
    const rebord = decale([versCL(pts)], -38 * S);
    return [h.path(chemin(pts, true), blanc(h.a.contour)), `<path d="${dCL(rebord)}" ${h.a.detail}/>`];
  };

  // ─── vue « dessus » : le capot chargé, les deux cordes aux coins, les barres jusqu'à la taille ────
  const S1 = 0.115;
  const geoDessus = z => {
    // la ceinture est à 1,25 m devant les trous, ses côtés à 190 mm de l'axe : le bout des barres tombe au bord gauche
    const E = sg => [TROU(sg)[0] - 1250, sg * 190];
    const C = [-E(1)[0] * S1, z.h / 2 + 4];
    const T = placeur(C, S1);
    return { C, T, E };
  };
  // le point de la droite (a → b) où x vaut 0 : le bord gauche de la vue, où la barre sort vers la personne
  const auBord = (a, b, x = 0) => add(a, mul(sub(b, a), (x - a[0]) / (b[0] - a[0])));
  const dessinDessus = z => {
    const { T, E } = geoDessus(z), o = [];
    o.push(...capotDessus(T, S1));
    o.push(chaudiereDessus(T, CHAUD, S1), bacDessus(T), sacDessus(T));
    // de chaque côté : la corde nouée dans le trou du coin, et la barre couchée le long de la corde, du côté du capot,
    // liée à la corde au coin ; les deux vont jusqu'à la ceinture (le bord gauche de la vue)
    for (const sg of [-1, 1]) {
      const t = T(TROU(sg)), e = T(E(sg)), u = uni(sub(e, t)), nn = mul(nor(u), sg > 0 ? 1 : -1);   // nn : vers l'extérieur
      const c0 = add(t, mul(nn, 6)), c1 = auBord(c0, add(e, mul(nn, 6)), 2);
      const b0 = add(add(t, mul(nn, -3)), mul(u, -3)), b1 = auBord(b0, add(e, mul(nn, -3)), 2);
      o.push(h.path(barre(b0, b1, 6.2), blanc(h.a.arete)));
      o.push(h.path(chemin([add(add(b0, mul(nn, -0.9)), mul(u, 14)), add(b1, mul(nn, -0.9))]), h.a.fin));
      o.push(h.cercle(t[0], t[1], 2.2, h.a.detail));
      o.push(corde(chemin([add(t, mul(nn, 1)), c0, c1]), 2.6));
      o.push(h.ellipse(...add(t, mul(nn, 4.5)), 3.2, 3.2, blanc(h.a.arete)));
      o.push(tours(add(t, mul(u, 14)), u, 12, 3, 3.4, 1.2));
    }
    return o.join('\n');
  };
  const renvoisDessus = z => {
    const { T, E } = geoDessus(z);
    const t = T(TROU(-1)), e = T(E(-1)), u = uni(sub(e, t)), nn = mul(nor(u), -1);
    const noeud = add(t, mul(nn, 4.5)), milieu = add(add(add(t, mul(nn, -3)), mul(u, 0.5 * lon(sub(e, t)))), mul(nn, -3.1));
    return [
      { n: 1, rond: [noeud[0] + 34, 16], cible: add(noeud, [0.5, -3.2]), texte: 'attacher une corde à chaque coin avant' },
      { n: 2, rond: [milieu[0] - 30, milieu[1] + 46], cible: milieu, texte: 'mettre deux barres jusqu’à la taille' },
    ];
  };

  // ─── vue « raté » : une seule corde, au centre ; le capot a tourné en travers et la charge a versé ────
  const dessinRate = z => {
    const o = [], ROT = 52, S = S1;
    const C = [z.l * 0.5, z.h * 0.43];
    const T = placeur(C, S, ROT);
    o.push(...capotDessus(T, S));
    // le bac a glissé contre le rebord du bas, de travers ; la chaudière et le sac ont versé dans la neige
    o.push(bacDessus(T, { c: [230, 120], l: 620, w: 420 }, 18));
    o.push(chaudiereCouchee(add(C, [-92, 104]), S));
    o.push(sacDessus(placeur(add(C, [72, 114]), S, 24), { c: [0, 0], l: 560, w: 300 }));
    // la corde, nouée au milieu de l'avant, tirée vers la gauche
    const avant = T([-CAPOT.L / 2 - 60, 0]);
    const bout = [2, avant[1] + 4];
    o.push(corde(chemin([avant, bout]), 2.6));
    o.push(h.ellipse(avant[0], avant[1], 3.2, 3.2, blanc(h.a.arete)));
    o.push(h.fleche(`M ${P(add(bout, [30, -11]))} L ${P(add(bout, [4, -11]))}`, h.a.detail));
    // l'arrière du capot a glissé vers le bas : le capot a tourné autour de la corde
    const R = 116, a0 = -38 * RAD, a1 = 6 * RAD;
    o.push(h.fleche(`M ${P(add(C, [R * Math.cos(a0), R * Math.sin(a0)]))} A ${R} ${R} 0 0 1 ${P(add(C, [R * Math.cos(a1), R * Math.sin(a1)]))}`, h.a.detail));
    return o.join('\n');
  };
  // la chaudière couchée sur le flanc, vue de dessus : le corps, le fond, l'ouverture
  const chaudiereCouchee = (c, S) => {
    const r = 150 * S, l = 340 * S;
    return [h.path(`M ${P([c[0] - l / 2, c[1] - r])} L ${P([c[0] + l / 2, c[1] - r * 0.86])} L ${P([c[0] + l / 2, c[1] + r * 0.86])} L ${P([c[0] - l / 2, c[1] + r])} Z`, blanc(h.a.arete)),
      h.ellipse(c[0] - l / 2, c[1], r * 0.34, r, blanc(h.a.arete)),
      h.ellipse(c[0] - l / 2, c[1], r * 0.22, r * 0.78, h.a.detail),
      h.ligne(c[0] + l / 2, c[1] - r * 0.86, c[0] + l / 2, c[1] + r * 0.86, h.a.arete)].join('\n');
  };

  // ─── la ceinture : une bande de couverture qui fait le tour des hanches ─────────────────────
  // La silhouette du corps (sans les bras), grossie de l'épaisseur de la couverture, coupée entre deux droites en
  // travers du tronc. « bas » et « haut » en mm le long du tronc, depuis la hanche.
  const silhouette = c => {
    const polys = [];
    for (const m of String(c.svg).matchAll(/<path d="([^"]+)" fill="#(?:FFFFFF|E6E6E6)"/g))
      for (const s of m[1].split('Z')) {
        const n = s.match(/-?[\d.]+/g); if (!n || n.length < 6) continue;
        const pts = []; for (let i = 0; i + 1 < n.length; i += 2) pts.push([+n[i], +n[i + 1]]);
        polys.push(versCL(pts));
      }
    return union(polys);
  };
  const ceinture = (c0, S, { bas = -20, haut = 130, ep = 24 } = {}) => {
    const sil = silhouette(c0), a = c0.articulations, H = a.hancheP;
    const u = uni(sub(a.epauleP, a.hancheP)), n = nor(u), G = 3000;
    const p0 = add(H, mul(u, bas * S)), p1 = add(H, mul(u, haut * S));
    const bande = [sub(p0, mul(n, G)), add(p0, mul(n, G)), add(p1, mul(n, G)), sub(p1, mul(n, G))];
    const r = 7 * S;
    const poly = decale(decale(inter(decale(sil, ep * S), [versCL(bande)]), -r), r);
    const avant = c0.miroir ? mul(n, -1) : n;
    const milieu = add(H, mul(u, (bas + haut) / 2 * S));
    // le devant de la bande, à mi-hauteur
    let k = 0; while (dedans(poly, add(milieu, mul(avant, k + 0.5))) && k < 800) k += 0.5;
    return { poly, H, u, n, avant, p0, p1, milieu, devant: add(milieu, mul(avant, k)), S, haut: (haut - bas) * S };
  };
  const dessinCeinture = cb => {
    const d = dCL(cb.poly), G = 3000, o = [];
    o.push(`<path d="${d}" fill="${BLANC}" stroke="none"/>`, `<path d="${d}" ${h.a.hachure('isolant', 'aucun')}/>`);
    // les deux plis de la couverture, le long de la bande
    const rive = decale(cb.poly, -1.6);
    for (const t of [1 / 3, 2 / 3]) {
      const m = add(cb.p0, mul(sub(cb.p1, cb.p0), t));
      for (const l of lignesDans([[sub(m, mul(cb.n, G)), add(m, mul(cb.n, G))]], rive)) o.push(h.path(chemin(l), h.a.detail));
    }
    o.push(`<path d="${d}" ${h.a.arete}/>`);
    // le nœud devant : les deux bouts de la bande noués sur le ventre, deux pans qui pendent
    const k = cb.haut, av = cb.avant, up = cb.u, c = add(cb.devant, mul(av, 0.06 * k));
    const pan = (dx, lg, larg, pente) => {
      const b0 = add(c, add(mul(av, dx * k), mul(up, -0.12 * k))), dir = uni(add(mul(up, -1), mul(av, pente))), b1 = add(b0, mul(dir, lg * k));
      const nn = mul(nor(dir), larg * k / 2);
      return chemin(arrondi([[...add(b0, nn), 0], [...add(b1, mul(nn, 0.75)), larg * k * 0.25], [...sub(b1, mul(nn, 0.75)), larg * k * 0.25], [...sub(b0, nn), 0]]), true);
    };
    for (const q of [pan(-0.08, 0.5, 0.2, -0.1), pan(0.05, 0.62, 0.2, 0.18)])
      o.push(h.path(q, blanc(h.a.arete)), h.path(q, h.a.hachure('isolant', 'aucun')), h.path(q, h.a.arete));
    const noeud = chemin(arrondi([[...add(c, add(mul(up, 0.24 * k), mul(av, -0.16 * k))), 0.12 * k], [...add(c, add(mul(up, 0.2 * k), mul(av, 0.16 * k))), 0.14 * k],
      [...add(c, add(mul(up, -0.2 * k), mul(av, 0.16 * k))), 0.14 * k], [...add(c, add(mul(up, -0.24 * k), mul(av, -0.16 * k))), 0.12 * k]]), true);
    o.push(h.path(noeud, blanc(h.a.arete)), h.path(noeud, h.a.hachure('isolant', 'aucun')), h.path(noeud, h.a.arete));
    o.push(h.path(chemin([add(c, add(mul(up, 0.17 * k), mul(av, -0.03 * k))), add(c, add(mul(up, -0.15 * k), mul(av, 0.05 * k)))]), h.a.detail));
    return o.join('\n');
  };

  // ─── le capot, de côté, chargé (repère du traîneau : a le long de la pente vers l'arrière, k vers le haut, mm) ────
  const capotCote = Tk => {
    const o = [];
    const coque = [[0, 150], [1150, 110], [1135, 60], [1095, 18], [1030, 2], [960, 0], [240, 0], [130, 10], [55, 48], [14, 104]];
    o.push(h.path(chemin(coque.map(q => Tk(...q)), true), blanc(h.a.contour)));
    o.push(h.path(chemin([[30, 128], [1120, 92]].map(q => Tk(...q))), h.a.detail));
    // le bac : la caisse, le couvercle qui déborde, une poignée
    const bac = [[400, 40], [990, 40], [1000, 400], [390, 400]];
    o.push(h.path(chemin(bac.map(q => Tk(...q)), true), blanc(h.a.arete)));
    o.push(h.path(chemin([[372, 400], [1018, 400], [1018, 450], [372, 450]].map(q => Tk(...q)), true), blanc(h.a.arete)));
    o.push(h.path(chemin([[880, 300], [960, 300], [962, 340], [878, 340]].map(q => Tk(...q)), true), h.a.detail));
    // le sac, couché devant le bac, noué en haut
    const sac = arrondi([[110, 40, 90], [385, 40, 60], [390, 300, 100], [130, 300, 110]]);
    o.push(h.path(chemin(sac.map(q => Tk(...q)), true), blanc(h.a.arete)));
    o.push(h.path(chemin([[215, 290], [190, 350], [255, 350], [262, 292]].map(q => Tk(...q)), true), blanc(h.a.arete)));
    o.push(h.path(chemin([[175, 120], [330, 140]].map(q => Tk(...q))), h.a.fin));
    return o.join('\n');
  };

  // ─── vue « descente » : de côté, la personne descend vers la gauche, le traîneau derrière, plus haut ────
  const S2 = 0.15, PENTE = 16;
  let geoD = null;
  const geoDescente = z => {
    if (geoD && geoD.l === z.l && geoD.h === z.h) return geoD;
    const t = Math.tan(PENTE * RAD), yL = z.h - 24, ys = x => yL - x * t;
    const pose = { pose: 'retient-derriere', cote: 'gauche', echelle: S2, ancrer: false, mains: { P: 'ouverte', L: 'ouverte' },
      angles: { jambeL: -44, cuisseL: -8, brasP: 16, avantbrasP: 34, mainP: 34, brasL: -16, avantbrasL: -6, mainL: -6, tronc: -5 } };
    const xP = 16;
    // le pied de devant sur la pente ; le corps posé une première fois pour lire ses pieds
    const c0 = F.corps(Object.assign({}, pose, { x: 0, y: 0 }));
    const pP = c0.pieds.P.bas, dx = xP - pP[0], dy = ys(xP) - pP[1];
    const O = Object.assign({}, pose, { x: dx, y: dy });
    const c1 = F.corps(Object.assign({}, O, { masquer: ['brasP', 'brasL'] }));
    const cb = ceinture(c1, S2);
    const A = cb.milieu;
    // le nez du traîneau : à la longueur de la barre de A, sur la pente en amont, son rebord avant à 150 mm de la neige
    const Lb = 1200 * S2, hn = 150 * S2;
    const nez = x => { const g = [x, ys(x)], n = [-Math.sin(PENTE * RAD), -Math.cos(PENTE * RAD)]; return add(g, mul(n, hn)); };
    let x0 = A[0], x1 = z.l;
    for (let i = 0; i < 60; i++) { const xm = (x0 + x1) / 2; if (lon(sub(nez(xm), A)) < Lb) x0 = xm; else x1 = xm; }
    const xN = (x0 + x1) / 2, N = nez(xN), G0 = [xN, ys(xN)];
    const ea = [Math.cos(PENTE * RAD), -Math.sin(PENTE * RAD)], ek = [-Math.sin(PENTE * RAD), -Math.cos(PENTE * RAD)];
    const Tk = (a, k) => add(G0, add(mul(ea, a * S2), mul(ek, k * S2)));
    geoD = { l: z.l, h: z.h, t, ys, O, c0, cb, A, N, Tk, Lb };
    return geoD;
  };
  const dessinDescente = z => {
    const G = geoDescente(z), { ys, O, cb, A, N, Tk } = G, o = [];
    // la neige
    o.push(h.chemin([[0, ys(0)], [z.l, ys(z.l)], [z.l, z.h], [0, z.h]], h.a.hachure('neige', 'aucun'), true));
    o.push(h.ligne(0, ys(0), z.l, ys(z.l), h.a.arete));
    o.push(capotCote(Tk));
    // la barre et la corde, du nez du traîneau à la ceinture ; peintes devant le tronc, derrière le bras proche
    const u = uni(sub(A, N)), Lr = lon(sub(A, N));
    const corps = F.corps(Object.assign({}, O, { objetP: g => {
      const out = [dessinCeinture(cb)];
      // la corde, lâche : elle pend sous la barre
      const m = add(mul(add(A, N), 0.5), [0, 0.22 * Lr]);
      out.push(corde(`M ${P(add(N, [0, 1.5]))} Q ${P(m)} ${P(add(A, [1, 3]))}`, 2.4));
      out.push(h.path(barre(add(N, mul(u, -3)), add(A, mul(u, 7)), 4.6), blanc(h.a.arete)));
      out.push(tours(add(A, mul(u, -3)), u, 4.6, 3, 2.8, 1.2), tours(add(N, mul(u, 3)), u, 4.6, 2, 2.8, 1.2));
      return out.join('\n');
    } }));
    o.push(String(corps));
    // le traîneau pousse sur la barre
    const nb = nor(u), fa = add(add(N, mul(u, 0.2 * Lr)), mul(nb, 13)), fb = add(add(N, mul(u, 0.44 * Lr)), mul(nb, 13));
    o.push(h.fleche(`M ${P(fa)} L ${P(fb)}`, h.a.detail));
    // le point à contrôler : le nez du traîneau, derrière les talons
    o.push(h.controle(N[0] + 3, N[1] + 3, 15));
    return o.join('\n');
  };
  const renvoisDescente = z => {
    const G = geoDescente(z), N = G.N;
    const v = uni([0.5, 1]), cible = add([N[0] + 3, N[1] + 3], mul(v, 15));
    return [{ n: 3, rond: add(cible, mul(v, 44)), cible, texte: 'le traîneau reste derrière les talons' }];
  };

  // ─── vue « ceinture » : de près, les hanches de côté, la bande nouée devant, la barre et la corde nouées dessus ────
  const S3 = 0.42;
  let geoC = null;
  const geoCeinture = z => {
    if (geoC && geoC.l === z.l && geoC.h === z.h) return geoC;
    // les bras levés devant, à hauteur d'épaule : ils sortent par le haut de la vue
    const pose = { pose: 'marche', cote: 'gauche', echelle: S3, ancrer: false,
      angles: { tronc: 8, cou: 10, tete: 4, brasP: 84, avantbrasP: 96, mainP: 96, brasL: 80, avantbrasL: 92, mainL: 92,
        cuisseP: 16, jambeP: 4, cuisseL: -12, jambeL: -22 } };
    const c0 = F.corps(Object.assign({}, pose, { x: 0, y: 0 }));
    const H0 = c0.articulations.hancheP, cible = [z.l * 0.52, z.h * 0.38];
    const O = Object.assign({}, pose, { x: cible[0] - H0[0], y: cible[1] - H0[1] });
    const c1 = F.corps(Object.assign({}, O, { masquer: ['brasP', 'brasL'] }));
    const cb = ceinture(c1, S3, { bas: -20, haut: 130, ep: 26 });
    // la barre part vers l'arrière et vers le bas, vers le nez du traîneau resté sur la neige
    const arriere = mul(cb.avant, -1), dB = uni(add(mul(arriere, Math.cos(38 * RAD)), [0, Math.sin(38 * RAD)]));
    const A = add(cb.milieu, mul(cb.avant, -12 * S3));
    const R = add(cb.milieu, mul(cb.avant, 62 * S3));
    geoC = { l: z.l, h: z.h, O, cb, A, R, dB, arriere };
    return geoC;
  };
  const dessinCeintureVue = z => {
    const G = geoCeinture(z), { O, cb, A, R, dB } = G, o = [];
    const id = 'vue0601-ceinture';
    o.push(`<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`, `<g clip-path="url(#${id})">`);
    const wB = 30 * S3, Lb = 900, up = cb.u, demi = cb.haut / 2;
    const corps = F.corps(Object.assign({}, O, { objetP: g => {
      const out = [dessinCeinture(cb)];
      // la corde : nouée autour de la bande, devant la barre ; un brin passe sur la bande, il fait le tour par le bord du
      // haut, et le nœud est sous la bande ; le reste part vers le traîneau, sous la barre
      const hautR = add(R, mul(up, demi + 1)), basR = add(R, mul(up, -demi - 1));
      out.push(corde(`M ${P(add(hautR, mul(cb.avant, -8)))} Q ${P(add(add(hautR, mul(up, 8)), mul(cb.avant, -2)))} ${P(hautR)} L ${P(basR)}`, 5));
      const noeud = add(basR, mul(up, -4));
      out.push(corde(chemin([noeud, add(noeud, mul(dB, Lb))]), 5));
      out.push(h.path(chemin(arrondi([[...add(noeud, [-7, -5]), 4], [...add(noeud, [7, -5]), 4], [...add(noeud, [7, 5]), 4], [...add(noeud, [-7, 5]), 4]]), true), blanc(h.a.arete)));
      // la barre : son bout posé sur la bande, lié par des tours de ficelle qui font le tour de la bande
      const b0 = add(A, mul(dB, -14)), b1 = add(A, mul(dB, Lb));
      out.push(h.path(barre(b0, b1, wB), blanc(h.a.arete)));
      const nn = nor(dB);
      out.push(h.path(chemin([add(add(b0, mul(nn, wB * 0.2)), mul(dB, 34)), add(b1, mul(nn, wB * 0.2))]), h.a.fin));
      for (const dx of [-7, -1.5, 4, 9.5]) {
        const p = add(A, mul(cb.avant, dx));
        out.push(corde(chemin([add(p, mul(up, demi + 1)), add(p, mul(up, -demi - 1))]), 2.6));
      }
      return out.join('\n');
    } }));
    o.push(String(corps));
    o.push('</g>');
    return o.join('\n');
  };
  const renvoisCeinture = z => {
    const G = geoCeinture(z), { A, cb } = G;
    const cible = add(A, mul(cb.u, cb.haut / 2 + 1.5));
    return [{ n: 4, rond: [cible[0] + 40, cible[1] - 54], cible, texte: 'nouer les cordes et les barres dessus' }];
  };

  return {
    ref: '06-01',
    titre: 'Traîner au lieu de porter',
    desc: 'Vu de dessus, un capot d’auto retourné, chargé d’un bac, d’un sac et d’une chaudière : une corde nouée dans un trou à chacun des deux coins avant, et le long de chaque corde une barre rigide, liée au coin, qui va jusqu’à la taille de la personne qui tire. À côté, le raté : une seule corde nouée au milieu de l’avant ; le capot a tourné en travers et la charge a versé dans la neige. De côté, en descente : la personne marche devant, la ceinture autour des hanches ; le traîneau, plus haut sur la pente, pousse sur la barre et reste derrière ses talons, la corde pend, lâche. De près : la couverture pliée en bande autour des hanches, nouée devant ; la barre liée sur la bande par des tours de ficelle, la corde nouée en boucle autour de la bande.',
    format: 'pleine',
    disposition: [['dessus', 'rate'], ['descente', 'ceinture']],
    hauteurs: [1, 1.25],
    largeurs: [[320, 258], [400, 178]],
    vues: {
      dessus: { titre: 'Vu de dessus', dessin: dessinDessus, renvois: renvoisDessus },
      rate: { titre: 'Raté : une seule corde, au centre', dessin: dessinRate },
      descente: { titre: 'En descente, de côté', dessin: dessinDescente, renvois: renvoisDescente },
      ceinture: { titre: 'Une couverture pliée en bande', dessin: dessinCeintureVue, renvois: renvoisCeinture },
    },
  };
};
