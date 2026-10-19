// Planche 06-01. Traîner au lieu de porter (chapitre 6, section 7, « Traîner au lieu de porter »). Planche neuve,
// 19 octobre 2026 ; reprise le même jour après le second regard (13 points, voir plus bas).
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
// ci-dessous (un capot d'environ 1,15 × 1,4 m, des barres d'environ 1,2 m) ne servent qu'au dessin ; rien ne s'imprime.
// Le texte ne nomme aucun nœud : la planche montre des nœuds qu'on fait partout (la corde passée dans un trou et autour
// du rebord, fermée par deux demi-clés ; la bande nouée d'un nœud plat), sans chiffre, donc sans source (règle 1 : elle
// vise les chiffres).
//
// Les vues. En haut, vu de dessus, l'avant du capot chargé : à chaque coin avant, la corde passe dans un trou et autour
// du rebord, en boucle, fermée par deux demi-clés sur la corde elle-même (1) ; la barre est couchée sur le coin, du côté
// du dehors, liée par des tours de ficelle qui passent dans le même trou et autour du rebord ; barre et corde vont, bien
// séparées, jusqu'à la taille (2) ; elles sortent du dessin par le bord de la vue, vers la personne qui tire (un corps ne
// se dessine jamais de dessus). À côté, le raté, marqué comme tel par son titre : une seule corde, au centre ; le capot a
// tourné en travers et la charge a versé dans la neige (sans repère : il n'a pas de rouge). En bas, de côté, en descente :
// le traîneau pousse sur la barre et reste derrière les talons (3), la corde pend, lâche. À côté, de près, la ceinture :
// la couverture pliée en bande autour des hanches, ses épaisseurs pliées au bord du haut, nouée devant d'un nœud plat ;
// la corde fait un tour complet de la bande et se ferme par deux demi-clés ; la barre est liée sur la bande (4).
// La marche se fait vers la gauche dans toutes les vues.
//
// Le corps : h.formes.corps, de profil, sans visage (il ne fait rien de la tête). Aucune main en gros plan : les deux
// mains du moteur des corps, en pose « ouverte » (la main qui pend, détendue : on tire avec les hanches). La pose de la
// descente part de « retient-derriere » (celle de la 16-08, la même descente vers la gauche), les bras ramenés devant.
// Les nœuds et les cordes passent par h.formes.cordes (les croisements, dessus et dessous). Aucune eau liquide sur la
// planche : la neige garde sa trame de points.
//
// Reprise après le second regard (19 octobre 2026) : légende 3 sur ce que montre le cercle (le traîneau qui pousse sur la
// barre) ; le pied avant posé à plat sur la pente ; les mains ouvertes ; la paroi proche du capot repeinte devant la
// charge ; le nœud plat et ses pans plats, coupés droit ; la corde de la ceinture en un tour complet et deux demi-clés ;
// la couverture montrée par ses plis et ses épaisseurs, sans trame ; la boucle et la ligature dans le trou du coin, vue
// de dessus agrandie ; la corde écartée de la barre ; la pastille 2 au-dessus de la barre ; la légende 4 ; la chaudière
// du raté couchée, fermée, avec son anse.
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

  // ─── une corde fine (ficelle) : un trait noir et son âme blanche ───────────────────────────
  const ficelle = (d, ep = 1.6) => `<path d="${d}" fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"/>\n`
    + `<path d="${d}" fill="none" stroke="${BLANC}" stroke-width="${f(Math.max(0.6, ep - 1.3))}" stroke-linecap="round" stroke-linejoin="round"/>`;
  // une barre droite de a à b, de largeur w : un long rectangle blanc au trait d'arête
  const barre = (a, b, w) => { const n = mul(nor(uni(sub(b, a))), w / 2); return chemin([add(a, n), add(b, n), sub(b, n), sub(a, n)], true); };
  // des tours de ficelle en travers d'une barre : n tours, au pas « pas », à partir de p, le long de u
  const tours = (p, u, w, n, pas, ep = 1.6) => {
    const nn = nor(u), o = [];
    for (let i = 0; i < n; i++) { const c = add(p, mul(u, i * pas)); o.push(ficelle(chemin([add(c, mul(nn, w / 2 + ep)), sub(c, mul(nn, w / 2 + ep))]), ep)); }
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
  // une courbe lisse par des points (Catmull-Rom), échantillonnée finement : la même polyligne sert aux deux passes
  // d'une corde qui passe derrière puis devant une pièce (la bande, le capot)
  const lisse = (pts, n = 10) => {
    const o = [pts[0]];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      for (let k = 1; k <= n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        o.push([0, 1].map(j => 0.5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
      }
    }
    return o;
  };

  // ─── deux demi-clés sur le dormant ──────────────────────────────────────────────────────────
  // Repère local : le dormant S le long de +y (vers la charge), le courant arrive du côté x < 0, le long du dormant,
  // depuis la pièce où la corde est passée (la bande, le rebord du capot). Unité : 1/6 de l'épaisseur de la corde.
  // z : la hauteur vers l'œil ; à chaque croisement, le brin le plus haut passe dessus. Chaque demi-clé : le courant
  // passe derrière le dormant, revient devant en remontant, puis sous lui-même (sous le brin qui arrive), et redescend.
  // Rend les morceaux du courant en coordonnées locales : fin de l'arrivée (Wa), première clé (Wb), deuxième clé et
  // bout (Wc). Le courant est coupé en morceaux bout à bout pour que chaque croisement soit entre deux brins.
  const demiClesLocales = () => {
    const R = 11, b = 7, y1 = 0, y2 = 36;
    const tour = yc => { const o = []; for (let g = 30; g <= 240; g += 30) { const r = g * RAD; o.push([-R * Math.cos(r), yc + b * Math.sin(r), -R * Math.sin(r)]); } return o; };
    const sortie = yc => [[0, yc - 7.5, 8], [-6, yc - 9.5, 2], [-11, yc - 10.5, -1.5], [-16, yc - 11, -1]];
    return {
      arrivee: [[-11, y1 - 22, 1.5], [-11, y1 - 2, 1.5]],
      Wb: [[-11, y1 - 2, 1.5], [-11, y1, 0], ...tour(y1), ...sortie(y1), [-20.5, y1 - 7, -1], [-22, y1 + 3, 0], [-19.5, y1 + 15, 0.5], [-13.5, y2 - 12, 1.5], [-11, y2 - 6, 1.5], [-11, y2 - 2, 1.5]],
      Wc: [[-11, y2 - 2, 1.5], [-11, y2, 0], ...tour(y2), ...sortie(y2), [-21, y2 - 8.5, -1], [-23.5, y2 - 1, 0], [-24, y2 + 7, 0]],
      fin: y2 + 20,
    };
  };
  // place les demi-clés : O sur le dormant, ey le long du dormant (vers la charge), ex vers le côté opposé au courant ;
  // k : échelle (ep / 6) ; renvoie des points [x, y, z] de vue
  const placeCles = (O, ey, ex, k) => q => [...add(O, add(mul(ex, q[0] * k), mul(ey, q[1] * k))), q[2]];

  // ─── le capot, vu de dessus ─────────────────────────────────────────────────────────────────
  // Repère local en mm : X vers l'arrière (l'avant du traîneau est à gauche, vers -X), Y en travers. Un capot retourné :
  // le bord avant bombé, l'arrière un peu creux, les coins arrondis ; le rebord replié se lit par un trait intérieur.
  const CAPOT = { L: 1150, Wf: 1250, Wr: 1400 };
  const contourCapot = arrondi([
    [-CAPOT.L / 2 - 70, 0, 560], [-CAPOT.L / 2, -CAPOT.Wf / 2, 140], [CAPOT.L / 2, -CAPOT.Wr / 2, 70],
    [CAPOT.L / 2 - 25, 0, 560], [CAPOT.L / 2, CAPOT.Wr / 2, 70], [-CAPOT.L / 2, CAPOT.Wf / 2, 140],
  ]);
  // le trou d'un coin avant (sg = −1 haut, +1 bas) : la corde et la ficelle de la barre passent dedans
  const TROU = sg => [-CAPOT.L / 2 + 95, sg * (CAPOT.Wf / 2 - 115)];
  // la charge, en mm locaux : le bac, le sac, la chaudière
  const BAC = { c: [190, -190], l: 620, w: 420 }, SAC = { c: [210, 300], l: 560, w: 300 }, CHAUD = { c: [-250, 110], r: 150 };

  // place un point local : centre (vue), échelle, rotation
  const placeur = (C, S, rot = 0) => q => add(C, mul(tourne(q, rot), S));
  // le point du bord du capot (contour placé) le plus proche de la droite p + t·d, du côté t > 0
  const bordSur = (pts, p, d) => {
    let best = null;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 1) % pts.length], e = sub(b, a), den = d[0] * e[1] - d[1] * e[0];
      if (Math.abs(den) < 1e-9) continue;
      const w = sub(a, p), t = (w[0] * e[1] - w[1] * e[0]) / den, s = (w[0] * d[1] - w[1] * d[0]) / den;
      if (s >= 0 && s <= 1 && t > 0 && (!best || t < best.t)) best = { t, p: add(p, mul(d, t)) };
    }
    return best && best.p;
  };

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
    const oreille = sg => [[-s.l / 2 - 20, sg * 10], [-s.l / 2 - 62, sg * 40], [-s.l / 2 - 50, sg * 4]].map(loc);
    return [h.path(chemin(oreille(-1), true), blanc(h.a.arete)), h.path(chemin(oreille(1), true), blanc(h.a.arete)),
      h.path(chemin(cou, true), blanc(h.a.arete)),
      h.path(chemin(corpsSac, true), blanc(h.a.arete)),
      h.path(chemin([[-s.l / 2 + 120, -s.w / 2 + 60], [s.l / 2 - 90, -s.w / 2 + 70]].map(loc)), h.a.fin),
      h.path(chemin([[-s.l / 2 + 150, s.w / 2 - 70], [s.l / 2 - 60, s.w / 2 - 55]].map(loc)), h.a.fin)].join('\n');
  };
  // la chaudière vue de dessus, debout : le couvercle, son rebord, l'anse couchée en travers
  const ANSE = 18;   // l'anse dépasse le rebord de 18 mm de chaque côté
  const chaudiereDessus = (T, ch = CHAUD, S) => {
    const c = T(ch.c);
    return [h.cercle(c[0], c[1], ch.r * S, blanc(h.a.arete)), h.cercle(c[0], c[1], (ch.r - 28) * S, h.a.detail),
      h.path(chemin([T(add(ch.c, [-ch.r - ANSE, 0])), T(add(ch.c, [ch.r + ANSE, 0]))]), h.a.arete)].join('\n');
  };
  const capotDessus = (T, S) => {
    const pts = contourCapot.map(T);
    const rebord = decale([versCL(pts)], -38 * S);
    return { pts, svg: [h.path(chemin(pts, true), blanc(h.a.contour)), `<path d="${dCL(rebord)}" ${h.a.detail}/>`] };
  };

  // ─── l'attache d'un coin, vue de dessus ────────────────────────────────────────────────────
  // La corde arrive de la taille, fait une boucle : elle passe sur le rebord, entre dans le trou, ressort sous le bord
  // avant et revient se fermer sur elle-même par deux demi-clés. Trois passes : la corde entière d'abord (ce qui passe
  // sous le capot sera recouvert), puis le capot (par l'appelant), puis ce qui est sur le capot et le trou.
  //   T : local mm → vue ; S : unités par mm ; trou : le trou (local) ; vers : le point (local) vers lequel part la
  //   corde (la taille) ; cote : +1 si le courant revient du côté +Y local de la corde, −1 sinon ; ep : la corde
  const attacheCorde = (T, S, pts, trou, vers, cote, ep) => {
    const H = T(trou);
    const dAvant = uni(sub(T(vers), H));                    // de la boucle vers la taille
    const e = bordSur(pts, H, dAvant);                       // où la corde passe le bord avant
    const nn = mul(nor(dAvant), cote);                        // vers le côté du courant
    // le premier point de fermeture (O) : devant le bord ; le dormant part de O vers la taille
    const k = ep / 6, O = add(e, mul(dAvant, 13 * k + 12));
    const pl = placeCles(O, dAvant, mul(nn, -1), k);
    const L = demiClesLocales();
    // la boucle : du trou, sur le rebord, jusqu'à O (c'est aussi le dormant, il continue vers la taille)
    const dormant = [H, add(e, mul(dAvant, -2)), add(e, mul(dAvant, 6)), O, add(O, mul(dAvant, 80))];
    // le courant : il ressort sous le bord avant, à côté, et vient le long du dormant jusqu'aux demi-clés
    const sortieBord = bordSur(pts, add(H, mul(nn, 5.5)), dAvant);
    const arriveeVue = L.arrivee.map(pl);
    const courant = [[...add(sortieBord, mul(dAvant, -6)), 1.5], [...add(sortieBord, mul(dAvant, 2)), 1.5], arriveeVue[0], arriveeVue[1]];
    const brins = [
      { pts: dormant.map(p => [...p, 0]), ep, debut: 'ouvert', fin: 'ouvert' },
      { pts: courant, ep, debut: 'ouvert', fin: 'ouvert' },
      { pts: L.Wb.map(pl), ep, debut: 'ouvert', fin: 'ouvert' },
      { pts: L.Wc.map(pl), ep, debut: 'ouvert', fin: 'coupe' },
    ];
    const tout = String(F.cordes(brins));
    // sur le capot : le bout de la boucle qui va du bord au trou, repeint après le capot
    const dessus = String(F.cordes([{ pts: [add(e, mul(dAvant, 1.5)), add(e, mul(dAvant, -2)), H].map(p => [...p, 0]), ep, debut: 'ouvert', fin: 'ouvert' }]));
    return { H, e, O, dAvant, nn, tout, dessus, finDormant: add(O, mul(dAvant, 80)) };
  };
  // la ficelle de la barre : des tours qui passent dans le trou, par-dessus la barre, et autour du bord de côté
  const ligature = (pts, H, versBord, n, ecart, ep) => {
    const o = [];
    for (let i = 0; i < n; i++) {
      const a = (i - (n - 1) / 2) * ecart, d = uni(tourne(versBord, a));
      const b = bordSur(pts, H, d);
      if (b) o.push(ficelle(chemin([H, add(b, mul(d, -0.6))]), ep));
    }
    return o.join('\n');
  };
  // le trou : un rond noir, par-dessus les bouts qui y entrent
  const trouNoir = (H, r) => [h.cercle(H[0], H[1], r + 0.7, h.a.blanc), h.cercle(H[0], H[1], r, h.a.plein)].join('\n');

  // ─── vue « dessus » : l'avant du capot chargé, les deux coins attachés, les barres et les cordes vers la taille ────
  const S1 = 0.17;
  const EP1 = 3;     // la corde, vue de dessus
  const geoDessus = z => {
    // l'arrière du capot coupé par le bord droit de la vue ; la taille à 1,2 m devant les trous
    const C = [z.l - 6 - (CAPOT.L / 2 - 120) * S1, z.h / 2 + 2];
    const T = placeur(C, S1);
    const capot = capotDessus(T, S1);
    const cote = sg => {
      const t = TROU(sg);
      // la barre : couchée sur le coin, du côté du dehors du trou, jusqu'à la taille ; la corde, en dedans
      const versBarre = [t[0] - 1250, sg * 215], versCorde = [t[0] - 1250, sg * 95];
      const ax = uni(sub(T(versBarre), T(t))), nAx = mul(nor(ax), -sg);   // nAx : vers le dehors
      const b0 = add(add(T(t), mul(nAx, 9.5)), mul(ax, -9)), b1 = add(b0, mul(ax, 400));
      const corde = attacheCorde(T, S1, capot.pts, t, versCorde, -sg, EP1);
      return { t, H: T(t), ax, nAx, b0, b1, corde };
    };
    return { C, T, capot, cotes: { haut: cote(-1), bas: cote(1) } };
  };
  // le point de la droite (a → b) où x vaut x0 : le bord gauche de la vue, où la barre sort vers la personne
  const auBord = (a, b, x0 = 0) => add(a, mul(sub(b, a), (x0 - a[0]) / (b[0] - a[0])));
  const dessinDessus = z => {
    const G = geoDessus(z), { T } = G, o = [];
    const id = 'vue0601-dessus';
    o.push(`<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`, `<g clip-path="url(#${id})">`);
    // 1. la corde entière (ce qui passe sous le capot sera recouvert)
    for (const c of Object.values(G.cotes)) o.push(c.corde.tout);
    // 2. le capot et la charge
    o.push(...G.capot.svg);
    o.push(chaudiereDessus(T, CHAUD, S1), bacDessus(T), sacDessus(T));
    // 3. de chaque côté : la boucle sur le rebord, la barre, sa ligature, le trou
    for (const c of Object.values(G.cotes)) {
      o.push(c.corde.dessus);
      const b1 = auBord(c.b0, c.b1, -2);
      o.push(h.path(barre(c.b0, b1, 6.2), blanc(h.a.arete)));
      o.push(h.path(chemin([add(add(c.b0, mul(c.nAx, 0.9)), mul(c.ax, 14)), add(b1, mul(c.nAx, 0.9))]), h.a.fin));
      o.push(ligature(G.capot.pts, c.H, c.nAx, 3, 15, 1.3));
      o.push(trouNoir(c.H, 2.6));
    }
    o.push('</g>');
    return o.join('\n');
  };
  const renvoisDessus = z => {
    const G = geoDessus(z), c = G.cotes.haut;
    // 1 : la boucle de la corde, au bord avant ; 2 : la barre du haut, prise du côté du dehors
    const cible1 = add(c.corde.e, mul(c.corde.dAvant, 4));
    const xB = 52, mB = auBord(c.b0, c.b1, xB), cible2 = add(mB, mul(c.nAx, 3.1));
    return [
      { n: 1, rond: [cible1[0] + 30, 14], cible: cible1, texte: 'attacher une corde à chaque coin avant' },
      { n: 2, rond: [xB - 26, cible2[1] - 30], cible: cible2, texte: 'mettre deux barres jusqu’à la taille' },
    ];
  };

  // ─── vue « raté » : une seule corde, au centre ; le capot a tourné en travers et la charge a versé ────
  const S0 = 0.124;
  const dessinRate = z => {
    const o = [], ROT = 52, S = S0;
    const C = [z.l * 0.5, z.h * 0.43];
    const T = placeur(C, S, ROT);
    const capot = capotDessus(T, S);
    // la corde : passée dans un trou au milieu de l'avant, tirée vers la gauche
    const trou = [-CAPOT.L / 2 + 60, 0];
    const corde = attacheCorde(T, S, capot.pts, trou, [-CAPOT.L / 2 - 4000, 3200], 1, 2.6);
    o.push(corde.tout);
    o.push(...capot.svg);
    // le bac a glissé contre le rebord du bas, de travers ; la chaudière et le sac ont versé dans la neige
    o.push(bacDessus(T, { c: [230, 120], l: 620, w: 420 }, 18));
    o.push(chaudiereCouchee(add(C, [-92, 104]), S));
    o.push(sacDessus(placeur(add(C, [72, 114]), S, 24), { c: [0, 0], l: 560, w: 300 }));
    o.push(corde.dessus, trouNoir(corde.H, 2.2));
    // la corde sort de la vue par la gauche ; la flèche dit qu'on tire
    const fin = corde.finDormant, bout = auBord(corde.O, fin, 2);
    o.push(h.fleche(`M ${P(add(bout, [30, -12]))} L ${P(add(bout, [4, -12]))}`, h.a.detail));
    // l'arrière du capot a glissé vers le bas : le capot a tourné autour de la corde
    const R = 116, a0 = -38 * RAD, a1 = 6 * RAD;
    o.push(h.fleche(`M ${P(add(C, [R * Math.cos(a0), R * Math.sin(a0)]))} A ${R} ${R} 0 0 1 ${P(add(C, [R * Math.cos(a1), R * Math.sin(a1)]))}`, h.a.detail));
    return o.join('\n');
  };
  // la chaudière couchée sur le flanc, vue de dessus, fermée : le corps, le couvercle au bout, l'anse retombée
  const chaudiereCouchee = (c, S) => {
    const r = 150 * S, l = 340 * S, xb = c[0] - l / 2;
    return [
      // l'anse : un fil qui part des deux oreilles, au bord du couvercle, et retombe en arc devant lui
      h.path(`M ${P([xb + 2, c[1] - r * 0.96])} C ${P([xb - 26, c[1] - r * 0.9])} ${P([xb - 26, c[1] + r * 0.9])} ${P([xb + 2, c[1] + r * 0.96])}`, h.a.arete),
      h.path(`M ${P([xb, c[1] - r])} L ${P([c[0] + l / 2, c[1] - r * 0.86])} L ${P([c[0] + l / 2, c[1] + r * 0.86])} L ${P([xb, c[1] + r])} Z`, blanc(h.a.arete)),
      h.ellipse(xb, c[1], r * 0.34, r, blanc(h.a.arete)),
      h.ellipse(xb, c[1], r * 0.24, r * 0.8, h.a.detail),
      h.ligne(c[0] + l / 2, c[1] - r * 0.86, c[0] + l / 2, c[1] + r * 0.86, h.a.arete),
      h.cercle(xb + 1, c[1] - r * 0.96, 1.3, blanc(h.a.detail)), h.cercle(xb + 1, c[1] + r * 0.96, 1.3, blanc(h.a.detail)),
    ].join('\n');
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
    // le devant et le dos de la bande, à mi-hauteur
    const bord = sens => { let k = 0; while (dedans(poly, add(milieu, mul(sens, k + 0.5))) && k < 800) k += 0.5; return add(milieu, mul(sens, k)); };
    return { poly, H, u, n, avant, p0, p1, milieu, devant: bord(avant), dos: bord(mul(avant, -1)), S, haut: (haut - bas) * S };
  };
  // la bande : blanche, ses deux plis le long ; « epaisseurs » : au bord du haut, les couches pliées qui s'empilent
  const dessinCeinture = (cb, { epaisseurs = false } = {}) => {
    const d = dCL(cb.poly), G = 3000, o = [];
    o.push(`<path d="${d}" fill="${BLANC}" stroke="none"/>`);
    const rive = decale(cb.poly, -1.6);
    for (const t of [1 / 3, 2 / 3]) {
      const m = add(cb.p0, mul(sub(cb.p1, cb.p0), t));
      for (const l of lignesDans([[sub(m, mul(cb.n, G)), add(m, mul(cb.n, G))]], rive)) o.push(h.path(chemin(l), h.a.detail));
    }
    if (epaisseurs) {
      // trois traits fins sous le bord du haut, décalés : le bord de chaque épaisseur de la couverture pliée
      const av = cb.avant, L = lon(sub(cb.devant, cb.dos));
      [[2.2, 0.05, 0.03], [4.3, 0.12, 0.08], [6.3, 0.22, 0.14]].forEach(([dy, g, d2]) => {
        const m = add(cb.p1, mul(cb.u, -dy));
        for (const l of lignesDans([[sub(m, mul(cb.n, G)), add(m, mul(cb.n, G))]], rive)) {
          // raccourcir du côté du devant (g) et du dos (d2), en part de la profondeur
          const [a, b] = l[0][0] * av[0] + l[0][1] * av[1] > l[l.length - 1][0] * av[0] + l[l.length - 1][1] * av[1] ? [l[0], l[l.length - 1]] : [l[l.length - 1], l[0]];
          const u2 = uni(sub(b, a));
          o.push(h.path(chemin([add(a, mul(u2, g * L)), sub(b, mul(u2, d2 * L))]), h.a.fin));
        }
      });
    }
    o.push(`<path d="${d}" ${h.a.arete}/>`);
    return o.join('\n');
  };

  // ─── le nœud plat de la bande, et ses deux pans ─────────────────────────────────────────────
  // Repère local : x le long de la bande (vers le dos), y vers le bas ; unité : 1/6 de l'épaisseur des bouts noués.
  // Deux ganses entrelacées : A arrive du devant (de l'autre côté du corps, autour du bord avant), fait sa ganse côté dos
  // et repart vers le devant, où elle pend ; B arrive du dos, fait sa ganse côté devant et repart vers le dos, où elle
  // pend. Les croisements alternent, dessus et dessous : c'est le nœud plat (le nœud de vache ne les alterne pas).
  const noeudPlat = (Q, k, ep) => {
    const arc = (cx, a0, a1) => { const o = []; for (let i = 1; i < 8; i++) { const a = (a0 + (a1 - a0) * i / 8) * RAD; o.push([cx + 14 * Math.cos(a), 14 * Math.sin(a)]); } return o; };
    const A = [[-31, -9], [-22, -5.5], [-14, -4], [-6, -5], [8, -14], ...arc(8, -90, 90), [8, 14], [-6, 5], [-14, 4], [-23, 6], [-28, 12], [-29.5, 19]];
    const B = [[40, -12], [28, -7], [14, -4], [6, -5], [-8, -14], ...arc(-8, -90, -270), [-8, 14], [6, 5], [14, 4], [23, 6], [28, 12], [29.5, 19]];
    const T = p => Q(p[0] * k, p[1] * k);
    return { svg: String(F.cordes([{ pts: A.map(T), ep, debut: 'ouvert', fin: 'ouvert' }, { pts: B.map(T), ep, debut: 'ouvert', fin: 'ouvert' }])),
      // le bas de chaque bout, là où le pan commence (point, direction)
      pans: [[A[A.length - 1], A[A.length - 2]], [B[B.length - 1], B[B.length - 2]]].map(([p, q]) => ({ p: T(p), d: uni(sub(T(p), T(q))) })),
      // les départs des deux bouts, pour les plis qui s'y rassemblent
      departs: [T(A[0]), T(B[0])], centre: T([0, 0]) };
  };
  // un pan : une bande de tissu plate qui pend sous le nœud, qui s'élargit un peu, coupée droit ; au bout, les
  // épaisseurs de la couverture pliée, en traits fins décalés
  const pan = (depart, d, lg, l0, l1, pente) => {
    const dir = uni(add(d, [pente, 0])), n0 = nor(d), b0 = depart, b1 = add(depart, mul(dir, lg)), n1 = nor(dir);
    const g0 = add(b0, mul(n0, l0 / 2)), d0 = sub(b0, mul(n0, l0 / 2)), g1 = add(b1, mul(n1, l1 / 2)), d1 = sub(b1, mul(n1, l1 / 2));
    const o = [h.path(chemin([g0, g1, d1, d0], true), h.a.blanc), h.path(chemin([g0, g1]), h.a.arete), h.path(chemin([d0, d1]), h.a.arete), h.path(chemin([g1, d1]), h.a.arete)];
    // les épaisseurs au bout coupé : trois traits décalés, de moins en moins longs
    [[2.4, 0.08, 0.1], [4.6, 0.18, 0.2], [6.6, 0.3, 0.32]].forEach(([r, a, b]) => {
      const p = sub(g1, mul(dir, r)), q = sub(d1, mul(dir, r));
      o.push(h.path(chemin([add(p, mul(sub(q, p), a)), add(q, mul(sub(p, q), b))]), h.a.fin));
    });
    // un pli le long du pan
    o.push(h.path(chemin([add(add(b0, mul(n0, l0 * 0.12)), mul(dir, 3)), add(add(b1, mul(n1, l1 * 0.1)), mul(dir, -9))]), h.a.fin));
    return o.join('\n');
  };

  // ─── le capot, de côté, chargé (repère du traîneau : a le long de la pente vers l'arrière, k vers le haut, mm) ────
  // La coque blanche d'abord, puis la charge, puis la paroi proche par-dessus : le rebord proche passe devant le bas de
  // la charge, qui est dans le capot.
  const capotCote = Tk => {
    const o = [];
    const coque = [[0, 150], [1150, 110], [1135, 60], [1095, 18], [1030, 2], [960, 0], [240, 0], [130, 10], [55, 48], [14, 104]];
    const dCoque = chemin(coque.map(q => Tk(...q)), true);
    o.push(h.path(dCoque, h.a.blanc));
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
    // la paroi proche, devant la charge
    o.push(h.path(dCoque, blanc(h.a.contour)));
    o.push(h.path(chemin([[30, 128], [1120, 92]].map(q => Tk(...q))), h.a.detail));
    return o.join('\n');
  };

  // ─── vue « descente » : de côté, la personne descend vers la gauche, le traîneau derrière, plus haut ────
  const S2 = 0.15, PENTE = 16;
  let geoD = null;
  const geoDescente = z => {
    if (geoD && geoD.l === z.l && geoD.h === z.h) return geoD;
    const t = Math.tan(PENTE * RAD), yL = z.h - 24, ys = x => yL - x * t;
    // le pied avant à plat sur la pente : la semelle penchée de la pente, le bout vers le bas (90 − 16) ; la jambe
    // arrière pliée, le pied arrière sur la pointe ; les bras ramenés devant, les mains ouvertes, détendues
    const pose = { pose: 'retient-derriere', cote: 'gauche', echelle: S2, ancrer: false, mains: { P: 'ouverte', L: 'ouverte' },
      angles: { cuisseL: 0, jambeL: -58, piedL: 67, piedP: 90 - PENTE, brasP: 14, avantbrasP: 30, mainP: 26, brasL: -14, avantbrasL: -4, mainL: -8, tronc: -5 } };
    // le corps posé une première fois ; puis déplacé pour que le bout du pied avant tombe à 4 du bord gauche et que la
    // semelle du pied avant repose sur la pente (le point du devant le plus enfoncé sous la droite de la pente y est posé)
    const c0 = F.corps(Object.assign({}, pose, { x: 0, y: 0 }));
    const xm = (c0.pieds.P.cheville[0] + c0.pieds.L.cheville[0]) / 2;
    let y0 = -Infinity;
    for (const m of String(c0.svg).matchAll(/<path d="([^"]+)" fill="#(?:FFFFFF|E6E6E6)"/g)) {
      const n = m[1].match(/-?[\d.]+/g); for (let i = 0; i + 1 < n.length; i += 2) if (+n[i] < xm) y0 = Math.max(y0, +n[i + 1] + t * +n[i]);
    }
    const dx = 4 - c0.boite.x0, dy = yL - y0 - t * dx;
    const O = Object.assign({}, pose, { x: dx, y: dy });
    const c1 = F.corps(Object.assign({}, O, { masquer: ['brasP', 'brasL'] }));
    const cb = ceinture(c1, S2);
    const A = cb.milieu;
    // le nez du traîneau : à la longueur de la barre de A, sur la pente en amont, son rebord avant à 150 mm de la neige
    const Lb = 1150 * S2, hn = 150 * S2;
    const nez = x => { const g = [x, ys(x)], n = [-Math.sin(PENTE * RAD), -Math.cos(PENTE * RAD)]; return add(g, mul(n, hn)); };
    let x0 = A[0], x1 = z.l;
    for (let i = 0; i < 60; i++) { const xm2 = (x0 + x1) / 2; if (lon(sub(nez(xm2), A)) < Lb) x0 = xm2; else x1 = xm2; }
    const xN = (x0 + x1) / 2, N = nez(xN), G0 = [xN, ys(xN)];
    const ea = [Math.cos(PENTE * RAD), -Math.sin(PENTE * RAD)], ek = [-Math.sin(PENTE * RAD), -Math.cos(PENTE * RAD)];
    const Tk = (a, k) => add(G0, add(mul(ea, a * S2), mul(ek, k * S2)));
    geoD = { l: z.l, h: z.h, t, ys, O, c0, c1, cb, A, N, Tk, Lb, dx, dy };
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
      out.push(ficelle(`M ${P(add(N, [0, 1.5]))} Q ${P(m)} ${P(add(A, [1, 3]))}`, 2.4));
      out.push(h.path(barre(add(N, mul(u, -3)), add(A, mul(u, 7)), 4.6), blanc(h.a.arete)));
      out.push(tours(add(A, mul(u, -2)), u, 4.6, 2, 3, 1.2), tours(add(N, mul(u, 3)), u, 4.6, 2, 2.8, 1.2));
      return out.join('\n');
    } }));
    o.push(String(corps));
    // le traîneau pousse sur la barre
    const nb = nor(u), fa = add(add(N, mul(u, 0.2 * Lr)), mul(nb, 13)), fb = add(add(N, mul(u, 0.44 * Lr)), mul(nb, 13));
    o.push(h.fleche(`M ${P(fa)} L ${P(fb)}`, h.a.detail));
    // le point à contrôler : le bout de la barre lié au nez du traîneau, derrière les talons
    o.push(h.controle(N[0] + 3, N[1] + 3, 15));
    return o.join('\n');
  };
  const renvoisDescente = z => {
    const G = geoDescente(z), N = G.N;
    const v = uni([0.5, 1]), cible = add([N[0] + 3, N[1] + 3], mul(v, 15));
    return [{ n: 3, rond: add(cible, mul(v, 44)), cible, texte: 'le traîneau pousse sur la barre, derrière les talons' }];
  };

  // ─── vue « ceinture » : de près, les hanches de côté, la bande nouée devant, la corde et la barre nouées dessus ────
  const S3 = 0.56;
  const EPC = 5.6;     // la corde, de près
  let geoC = null;
  const geoCeinture = z => {
    if (geoC && geoC.l === z.l && geoC.h === z.h) return geoC;
    // les bras levés devant, à hauteur d'épaule : ils sortent par le haut de la vue
    const pose = { pose: 'marche', cote: 'gauche', echelle: S3, ancrer: false,
      angles: { tronc: 6, cou: 10, tete: 4, brasP: 84, avantbrasP: 96, mainP: 96, brasL: 80, avantbrasL: 92, mainL: 92,
        cuisseP: 14, jambeP: 4, cuisseL: -10, jambeL: -20 } };
    const c0 = F.corps(Object.assign({}, pose, { x: 0, y: 0 }));
    const c1a = F.corps(Object.assign({}, pose, { x: 0, y: 0, masquer: ['brasP', 'brasL'] }));
    const cb0 = ceinture(c1a, S3, { bas: -20, haut: 130, ep: 22 });
    // la bande centrée en largeur dans la vue, à 37 % de la hauteur
    const centre = mul(add(cb0.devant, cb0.dos), 0.5), cible = [z.l * 0.5, z.h * 0.37];
    const O = Object.assign({}, pose, { x: cible[0] - centre[0], y: cible[1] - centre[1] });
    const c1 = F.corps(Object.assign({}, O, { masquer: ['brasP', 'brasL'] }));
    const cb = ceinture(c1, S3, { bas: -20, haut: 130, ep: 22 });
    // le repère de la bande : s le long de la bande, du bord avant vers le dos ; t vers le bas, depuis le milieu
    const dos = mul(cb.avant, -1), basB = mul(cb.u, -1), prof = lon(sub(cb.dos, cb.devant)), demi = cb.haut / 2;
    const Q = (s, t) => add(add(cb.devant, mul(dos, s)), mul(basB, t));
    // la barre : son bout sur la bande, côté dos ; elle part vers l'arrière et vers le bas, vers le nez du traîneau
    const dB = uni(add(mul(dos, Math.cos(38 * RAD)), [0, Math.sin(38 * RAD)]));
    const Ab = Q(prof * 0.8, 0);
    // la corde : elle pend presque droite sous la bande (elle est lâche), un peu vers l'arrière
    const dS = uni([0.16, 1]);
    const sS = prof * 0.6;
    geoC = { l: z.l, h: z.h, O, cb, Q, dos, basB, prof, demi, dB, Ab, dS, sS };
    return geoC;
  };
  const dessinCeintureVue = z => {
    const G = geoCeinture(z), { O, cb, Q, prof, demi, dB, Ab, dS, sS } = G, o = [];
    const id = 'vue0601-ceinture';
    o.push(`<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`, `<g clip-path="url(#${id})">`);
    const wB = 30 * S3, Lb = 900;
    // la corde : le dormant monte de la charge jusque sous la bande, passe derrière, revient par-dessus le bord du haut,
    // descend devant la bande, ressort sous le bord du bas, et se ferme par deux demi-clés sur le dormant
    const k = EPC / 6, L = demiClesLocales();
    const Bs = Q(sS, demi);                                   // où le dormant entre derrière la bande
    const Oh = add(Bs, mul(dS, 15 * k + 13));                  // la première demi-clé
    const ex = [dS[1], -dS[0]];                                // perpendiculaire au dormant, vers le dos
    const pl = placeCles(Oh, dS, ex, k);
    const arr = L.arrivee.map(pl);                             // le courant arrive le long du dormant, côté devant
    const sW = sS - 11 * k * 1.02;
    const devantBande = lisse([Q(sS + 1.5, -demi + 9), Q(sS - 0.5, -demi - 3.2), Q((sS + sW) / 2, -demi - 4.4), Q(sW + 0.4, -demi - 1.2), Q(sW, -demi + 8),
      Q(sW, demi - 6), Q(sW - 0.3, demi + 4), arr[0].slice(0, 2), arr[1].slice(0, 2)], 8);
    const courant = devantBande.map(p => [...p, 1.5]);
    const dormant = [add(Bs, mul(dS, 260)), Oh, Bs, Q(sS, 0)].map(p => [...p, 0]).reverse();
    const brinsCorde = [
      { pts: dormant, ep: EPC, debut: 'ouvert', fin: 'ouvert' },
      { pts: courant, ep: EPC, debut: 'ouvert', fin: 'ouvert' },
      { pts: L.Wb.map(pl), ep: EPC, debut: 'ouvert', fin: 'ouvert' },
      { pts: L.Wc.map(pl), ep: EPC, debut: 'ouvert', fin: 'coupe' },
    ];
    // le brin de devant, entre le bord du haut et le dessous de la bande : repeint après la bande
    const iHaut = devantBande.findIndex((p, i) => i > 5 && !dedans(cb.poly, p) && dedans(cb.poly, devantBande[Math.min(i + 1, devantBande.length - 1)]));
    let iBas = devantBande.length - 1; while (iBas > iHaut && dedans(cb.poly, devantBande[iBas])) iBas--;
    const devant = devantBande.slice(Math.max(0, iHaut - 1), Math.min(devantBande.length, iBas + 4)).map(p => [...p, 1.5]);

    // le nœud plat : sur la face proche de la bande, près du devant
    const kN = 6.6 / 6;
    const QN = (x, y) => Q(prof * 0.25 + x, y - 1.5);
    const np = noeudPlat(QN, kN, 6.6);

    const corps = F.corps(Object.assign({}, O, { objetP: g => {
      const out = [];
      // 1. la corde entière (le dormant derrière la bande sera recouvert)
      out.push(String(F.cordes(brinsCorde)));
      // 2. la bande, ses plis, ses épaisseurs au bord du haut
      out.push(dessinCeinture(cb, { epaisseurs: true }));
      // les plis de la couverture qui se rassemblent vers les deux bouts noués
      const [dA, dBn] = np.departs;
      for (const [p, sens] of [[dBn, 1]]) {
        for (const tt of [-0.62, -0.3, 0.3, 0.62]) {
          const q = Q(lon(sub(p, cb.devant)) * 1 + sens * 26, tt * demi * 1.7 / 1.7 * 1);
          out.push(h.path(`M ${P(add(p, mul(G.dos, -2)))} Q ${P(add(mul(add(p, q), 0.5), mul(G.basB, tt * 2)))} ${P(q)}`, h.a.fin));
        }
      }
      // 3. les deux pans, puis le nœud par-dessus leur départ
      out.push(pan(np.pans[0].p, np.pans[0].d, 64, 6.6, 12, -0.22));
      out.push(pan(np.pans[1].p, np.pans[1].d, 54, 6.6, 12, 0.12));
      out.push(np.svg);
      // 4. la barre : son bout couché sur la bande, lié par trois tours de ficelle qui font le tour de la bande
      const b0 = add(Ab, mul(dB, -16)), b1 = add(Ab, mul(dB, Lb));
      out.push(h.path(barre(b0, b1, wB), blanc(h.a.arete)));
      const nn = nor(dB);
      out.push(h.path(chemin([add(add(b0, mul(nn, wB * 0.2)), mul(dB, 34)), add(b1, mul(nn, wB * 0.2))]), h.a.fin));
      for (const ds of [-8, -1, 6]) {
        const p = add(Ab, mul(G.dos, ds));
        out.push(ficelle(chemin([add(p, mul(cb.u, demi + 1.2)), add(p, mul(cb.u, -demi - 1.2))]), 2.4));
      }
      // 5. le brin de la corde qui descend devant la bande
      out.push(String(F.cordes([{ pts: devant, ep: EPC, debut: 'ouvert', fin: 'ouvert' }])));
      return out.join('\n');
    } }));
    o.push(String(corps));
    o.push('</g>');
    return o.join('\n');
  };
  const renvoisCeinture = z => {
    const G = geoCeinture(z), { Q, demi, sS } = G;
    // la cible : le haut de la bande, là où la corde passe par-dessus
    const cible = Q(sS - 6, -demi - 3.6);
    return [{ n: 4, rond: [Math.min(z.l - 12, cible[0] + 34), cible[1] - 46], cible, texte: 'nouer les cordes et les barres sur la bande' }];
  };

  return {
    ref: '06-01',
    titre: 'Traîner au lieu de porter',
    desc: 'Vu de dessus, l’avant d’un capot d’auto retourné, chargé d’un bac, d’un sac et d’une chaudière : à chacun des deux coins avant, une corde passe dans un trou et autour du rebord, en boucle, fermée par deux demi-clés sur elle-même ; une barre rigide est couchée sur le coin, liée par des tours de ficelle qui passent dans le même trou ; barre et corde vont, écartées, jusqu’à la taille de la personne qui tire. À côté, le raté : une seule corde au milieu de l’avant ; le capot a tourné en travers et la charge a versé dans la neige. De côté, en descente : la personne marche devant, les mains ouvertes, la ceinture autour des hanches ; le traîneau, plus haut sur la pente, pousse sur la barre et reste derrière ses talons, la corde pend, lâche. De près : la couverture pliée en bande autour des hanches, nouée devant d’un nœud plat dont les deux pans pendent ; la corde fait le tour de la bande et se ferme par deux demi-clés ; la barre est liée sur la bande par des tours de ficelle.',
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
