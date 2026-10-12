// 24-05 — Porter à la courroie de front (ch. 24, section C, étapes 15 et 16 ; ch. 90, étapes 24 et 26).
// Complète la 90-03 (le canot) : ici la courroie portée avec une charge de bois au dos.
// Ce que le chapitre donne : une bande large sur le front, ses deux bouts noués à la charge, la charge
// appuyée au creux des reins ; épaules haussées, la charge passe aux épaules ; épaules relâchées, elle
// revient au front ; on alterne en marchant. Aucune cote : c'est un geste, pas une construction.
//
// Le montage, suivi comme une charge. Vue de profil, la courroie passe sur le côté de la tête au-dessus
// de l'oreille, descend derrière la nuque, porte sur le haut du dos (le trapèze, au-dessus de
// l'omoplate), puis longe le dos jusqu'au fagot qu'elle entoure. Épaules relâchées : la courroie est
// tendue d'un trait du front au fagot, le front porte. Épaules haussées : le haut du dos monte sous la
// courroie et soulève le fagot d'autant ; le bout entre la tête et l'épaule, lui, se détend (même
// longueur de courroie sur une corde plus courte) : le front ne porte plus.
//
// Le haussement d'épaules se dessine avec le corps de la bibliothèque : un second personnage, le même
// décalé le long de l'axe du tronc, peint seulement derrière une ligne parallèle au bras (le bras, le
// haut du dos, le bas de la nuque) ; la poitrine, la gorge et la tête restent celles du premier. Les
// traits coupés par cette zone sont tous parallèles au décalage : aucune cassure.

module.exports = (h) => {
  const F = h.formes, A = h.a;
  const RAD = Math.PI / 180;
  const r1 = v => Math.round(v * 10) / 10;
  const rot = (a, d) => { const c = Math.cos(d * RAD), s = Math.sin(d * RAD); return [a[0] * c - a[1] * s, a[0] * s + a[1] * c]; };
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const lon = a => Math.hypot(a[0], a[1]);
  const uni = a => { const l = lon(a) || 1; return [a[0] / l, a[1] / l]; };
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

  // ─── Le porteur : la géométrie du personnage de la bibliothèque (formes.js), refaite ici pour
  // savoir où tombent la tête, la nuque, l'épaule et le dos. Monde en mm, sol en y = 0, y vers le bas.
  const PENCHE = 15, REGARD = -3, HAUSSE = 40;
  const kP = y => { const t = Math.max(0, Math.min(1, (-150 - y) / 150)); return 0.35 + 0.65 * t * t * (3 - 2 * t); };
  const HAN = [0, -950];
  const TT = p => add(HAN, rot(p, PENCHE * kP(p[1])));
  const cou0 = TT([-6, -540]), dCou = rot([0, -1], PENCHE * 0.5 + 10), atlas = add(cou0, mul(dCou, 84));
  const RT = PENCHE * 0.35 + REGARD, Et = sub(atlas, rot([4, 32], RT));
  const TH = p => add(Et, rot(p, RT));                       // repère de la tête : l'oreille
  const U = rot([0, -1], PENCHE);                             // l'axe du tronc, vers le haut
  const AV = rot([1, 0], PENCHE);                             // perpendiculaire, vers l'avant
  const DEC = mul(U, HAUSSE);                                 // le haussement d'épaules
  const EPAULE = TT([-14, -470]);
  const BAS = mul(U, -1);
  // Les bras pendent le long du tronc, le coude à peine plié : un bras tendu à fond fait une marche
  // au coude dans le contour.
  const POIGNET = add(add(EPAULE, mul(BAS, 520)), mul(AV, 40));
  const POIGNET_LOIN = add(add(add(EPAULE, [-8, -4]), mul(BAS, 520)), mul(AV, 40));

  // Le dos, du haut de la nuque aux fesses.
  const DOS = [[-68, -540], [-100, -492], [-118, -420], [-110, -340], [-95, -250], [-92, -170], [-108, -92], [-121, -8]].map(TT);
  const dosX = y => {
    for (let i = 0; i < DOS.length - 1; i++) {
      const a = DOS[i], b = DOS[i + 1];
      if ((y - a[1]) * (y - b[1]) <= 0) return a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]);
    }
    return y < DOS[0][1] ? DOS[0][0] : DOS[DOS.length - 1][0];
  };
  const distDos = p => {
    let m = Infinity;
    for (let i = 0; i < DOS.length - 1; i++) {
      const a = DOS[i], b = DOS[i + 1], ab = sub(b, a);
      const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * ab[0] + (p[1] - a[1]) * ab[1]) / (ab[0] ** 2 + ab[1] ** 2)));
      m = Math.min(m, lon(sub(p, lerp(a, b, t))));
    }
    return m;
  };

  // ─── Le fagot : des bûches couchées en travers du dos, vues par le bout. Repère : u le long du dos
  // vers le bas, v vers l'arrière ; origine au centre de la bûche du haut, contre le dos.
  const uB = rot([0, 1], 17), vB = rot([-1, 0], 17);
  const BUCHES = [[0, 0, 50], [104, -3, 54], [206, 4, 47], [52, 96, 49], [152, 100, 53], [246, 90, 42]];
  const placeB = o => BUCHES.map(([u, v, r]) => ({ c: add(o, add(mul(uB, u), mul(vB, v))), r }));
  // On pousse le fagot contre le dos, assez bas pour que sa moitié basse repose au creux des reins.
  const FAGOT = (() => {
    const y0 = -1190;
    let o = [dosX(y0) - 200, y0];
    for (let s = 0; s < 400; s += 0.5) {
      const cand = add([dosX(y0) - 200, y0], mul(vB, -s));
      if (placeB(cand).some(b => distDos(b.c) < b.r + 1 || b.c[0] - b.r * 0.2 > dosX(b.c[1]))) break;
      o = cand;
    }
    return o;
  })();

  // ─── La courroie. Sur la tête (repère de la tête), puis derrière la nuque, puis sur le haut du dos.
  const EP = 24;                                              // largeur de la courroie vue de profil
  const SUR_TETE = [[-10, -53], [-30, -46], [-48, -28], [-59, -4], [-64, 22]].map(TH);
  const SORTIE = SUR_TETE[SUR_TETE.length - 1];
  // Là où elle porte sur le haut du dos : la tangente au dos tirée de la nuque, épaules relâchées.
  const APPUI_ = (() => {
    let best = null, bestA = -Infinity;
    for (let y = SORTIE[1] + 40; y < -1280; y += 2) {
      const q = [dosX(y), y], a = Math.atan2(SORTIE[0] - q[0], q[1] - SORTIE[1]);
      if (a > bestA) { bestA = a; best = q; }
    }
    const t = uni(sub(best, SORTIE));
    return { dos: best, c: add(best, mul([t[1], -t[0]], -(EP / 2 - 1))) };   // la courroie posée sur le dos, pas dedans
  })();
  const APPUI = APPUI_.c, APPUI_DOS = APPUI_.dos;
  const buchesR = placeB(FAGOT);
  const haut = buchesR[0];
  // l'attache : sur la bûche du haut, du côté d'où arrive la courroie
  const ATTACHE = add(haut.c, mul(uni(sub(APPUI, haut.c)), haut.r + 4));
  // Épaules haussées, la courroie lâche part de derrière l'oreille ; sa longueur jusqu'à l'épaule est
  // celle qu'elle avait tendue.
  const DERRIERE = SUR_TETE[SUR_TETE.length - 2];
  const LONG_HAUT = lon(sub(SORTIE, DERRIERE)) + lon(sub(APPUI, SORTIE));
  const milieuLache = () => lache(DERRIERE, add(APPUI, DEC), LONG_HAUT);

  // La bande du front, en repère de tête : large sur le front, amincie vers la tempe.
  const BANDE = [[85, -84], [60, -90], [28, -80], [2, -66], [-10, -64], [-10, -43], [2, -42], [30, -40], [62, -38], [94, -38], [96, -50], [92, -68]];

  // La courroie lâche : de longueur L entre a et b, un seul point milieu rejeté vers l'arrière (la
  // courbe lisse de la corde passe par lui). Flèche d'une parabole : L ≈ c + 8 s² / 3c.
  function lache(a, b, L) {
    const c = lon(sub(b, a)), dd = uni(sub(b, a)), n = [-dd[1], dd[0]];
    const s = L > c ? Math.sqrt(3 * c * (L - c) / 8) : 0;
    // rejetée droit vers l'arrière (pas vers le haut) : la courbe reste un seul arc, sans S
    const k = Math.abs(n[0]) || 1;
    return add(lerp(a, b, 0.5), [-s / k, 0]);
  }

  // Enveloppe convexe de cercles (le tour de la courroie autour du fagot).
  function enveloppe(cercles, marge) {
    const P = [];
    cercles.forEach(({ c, r }) => { for (let k = 0; k < 48; k++) { const a = k / 48 * 2 * Math.PI; P.push([c[0] + (r + marge) * Math.cos(a), c[1] + (r + marge) * Math.sin(a)]); } });
    P.sort((p, q) => p[0] - q[0] || p[1] - q[1]);
    const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], hi = [];
    for (const p of P) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
    for (const p of P.slice().reverse()) { while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], p) <= 0) hi.pop(); hi.push(p); }
    return lo.slice(0, -1).concat(hi.slice(0, -1));
  }

  // ─── La vue : le porteur coupé sous les fesses, cadré sur la tête, le dos et le fagot.
  const X0 = -330, X1 = 285, Y0 = -1725, Y1 = -800;
  function cadre(z) {
    const e = Math.min((z.l - 8) / (X1 - X0), (z.h - 4) / (Y1 - Y0));
    const ox = (z.l - (X1 - X0) * e) / 2 - X0 * e, oy = 4 - Y0 * e;
    const V = p => [ox + p[0] * e, oy + p[1] * e];
    return { e, ox, oy, V };
  }
  const d = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${r1(p[0])} ${r1(p[1])}`).join(' ');

  function porteur(z, etat) {
    const { e, ox, oy, V } = cadre(z);
    const hausse = etat === 'hausse';
    const o = [];
    const pers = decal => F.personnage({
      x: ox + decal[0] * e, y: oy + decal[1] * e, pose: 'debout', echelle: e, penche: PENCHE, regard: REGARD,
      mains: { proche: V(add(POIGNET, decal)), loin: V(add(POIGNET_LOIN, decal)) },
    }).toString();
    o.push(`<clipPath id="k2405-${etat}"><rect x="0" y="0" width="${r1(z.l)}" height="${r1(z.h)}"/></clipPath>`);
    o.push(`<g clip-path="url(#k2405-${etat})">`);
    o.push(pers([0, 0]));
    if (hausse) {
      // La zone qui monte : derrière une ligne parallèle au bras, sous la tête, au-dessus de l'omoplate
      // pour le dos, et la bande du bras jusqu'en bas.
      const lf = t => add(add(EPAULE, mul(AV, 60)), mul(U, t));
      const lb = t => add(add(EPAULE, mul(AV, -60)), mul(U, t));
      const tAt = (f, y) => { const p0 = f(0), p1 = f(1); return (y - p0[1]) / (p1[1] - p0[1]); };
      const yCoupe = -1352;
      const tete = [[-86, -10], [-82, 14], [-77, 32], [-66, 48], [-50, 60], [-20, 80], [10, 92], [40, 99]].map(TH);
      const avant = lf(tAt(lf, tete[tete.length - 1][1]));
      const zone = [[-600, tete[0][1]], ...tete, avant, lf(tAt(lf, -700)), lb(tAt(lb, -700)), lb(tAt(lb, yCoupe)), [-600, yCoupe]].map(V);
      o.push(`<clipPath id="zone-k"><path d="${d(zone)} Z" fill="none"/></clipPath>`);
      o.push(`<path d="${d(zone)} Z" fill="#FFFFFF" stroke="none"/>`);
      o.push(`<g clip-path="url(#zone-k)">`, pers(DEC), `</g>`);
      // Le raccord du dos sous la coupe : un seul trait qui passe du dos haussé au dos resté en place.
      const dH = y => [dosX(y - DEC[1]) + DEC[0], y], dB = y => [dosX(y), y];
      const ya = yCoupe - 70, yb = yCoupe + 70;
      const Pa = dH(ya), Pb = dB(yb), ta = uni(sub(dH(ya + 5), Pa)), tb = uni(sub(dB(yb + 5), Pb));
      const cache = [add(dH(ya - 4), [-30, 0]), add(dH(ya - 4), [14, 0]), add(dB(yb + 4), [14, 0]), add(dB(yb + 4), [-30, 0])].map(V);
      o.push(`<path d="${d(cache)} Z" fill="#FFFFFF" stroke="none"/>`);
      const c1 = add(Pa, mul(ta, 50)), c2 = sub(Pb, mul(tb, 50));
      const bez = Array.from({ length: 17 }, (_, k) => { const t = k / 16, m = 1 - t;
        return add(add(mul(Pa, m * m * m), mul(c1, 3 * m * m * t)), add(mul(c2, 3 * m * t * t), mul(Pb, t * t * t))); }).map(V);
      o.push(h.chemin(bez, A.arete, false));
      // L'épaule basse de l'autre vue, en tireté fin : on voit de combien elle monte.
      const C0 = V(add(EPAULE, mul(U, 20))), RC = 95 * e;
      o.push(`<clipPath id="fantome-k"><circle cx="${r1(C0[0])}" cy="${r1(C0[1])}" r="${r1(RC)}"/></clipPath>`);
      const fant = pers([0, 0]).replace(/fill="[^"]*"/g, 'fill="none"').replace(/stroke-width="[^"]*"/g, 'stroke-width="0.5" stroke-dasharray="2.2 1.6"');
      o.push(`<g clip-path="url(#fantome-k)">`, fant, `</g>`);
    }
    const dec = hausse ? DEC : [0, 0];
    // Le fagot.
    const buches = placeB(add(FAGOT, dec));
    // Le tour de courroie autour du fagot : une bande entre deux contours, sous les bouts des bûches.
    const tourV = enveloppe(buches, 3).map(V), tourExt = enveloppe(buches, 3 + 8).map(V);
    o.push(h.chemin(tourExt, A.blanc, true), h.chemin(tourExt, A.arete, true));
    o.push(h.chemin(tourV, A.blanc, true), h.chemin(tourV, A.arete, true));
    buches.forEach(({ c, r }, i) => {
      const C = V(c), R = r * e;
      // l'écorce : un contour un peu bosselé ; le bois : un cercle net en dedans
      const ecorce = Array.from({ length: 36 }, (_, k) => {
        const t = k / 36 * 2 * Math.PI, rr = R * (1 + 0.022 * Math.sin(4 * t + i * 1.7) + 0.018 * Math.sin(9 * t + i * 2.3) + 0.012 * Math.sin(17 * t + i));
        return [C[0] + rr * Math.cos(t), C[1] + rr * Math.sin(t)];
      });
      o.push(h.chemin(ecorce, A.blanc, true), h.chemin(ecorce, A.arete, true));
      o.push(h.cercle(C[0], C[1], R * 0.82, A.detail));
      const m = [C[0] + R * 0.12 * Math.cos(i * 2.1), C[1] + R * 0.12 * Math.sin(i * 2.1)];   // le cœur, décentré
      o.push(h.cercle((C[0] + m[0]) / 2, (C[1] + m[1]) / 2, R * 0.55, A.fin));
      o.push(h.cercle(m[0], m[1], R * 0.26, A.fin));
      o.push(h.cercle(m[0], m[1], 0.7, A.plein));
      [0, 2.4].slice(0, 1 + (i % 2)).forEach(da => {                // une ou deux fentes de séchage
        const ang = i * 1.3 + 0.6 + da;
        o.push(h.ligne(m[0] + Math.cos(ang) * R * 0.3, m[1] + Math.sin(ang) * R * 0.3, C[0] + Math.cos(ang) * R * 0.8, C[1] + Math.sin(ang) * R * 0.8, A.fin));
      });
    });
    // La courroie, de la tête au fagot.
    const appui = add(APPUI, dec), attache = add(ATTACHE, dec);
    const bas = [appui, lerp(appui, attache, 0.5), attache];
    const pts = (hausse ? [...SUR_TETE.slice(0, -1), milieuLache(), ...bas] : [...SUR_TETE, lerp(SORTIE, APPUI, 0.5), ...bas]).map(V);
    o.push(F.corde(pts, { ep: EP * e, debut: 'ouvert', fin: 'ouvert' }).toString());
    // Le nœud sur la bûche du haut.
    const N = V(attache), nd = uni(sub(appui, attache));
    const noeud = Array.from({ length: 24 }, (_, k) => { const t = k / 24 * 2 * Math.PI, a = 14 * e * Math.cos(t), b = 9 * e * Math.sin(t); return [N[0] + a * nd[0] - b * nd[1], N[1] + a * nd[1] + b * nd[0]]; });
    o.push(h.chemin(noeud, A.blanc, true), h.chemin(noeud, A.arete, true));
    // La bande sur le front.
    const bande = BANDE.map(p => V(TH(p)));
    o.push(h.chemin(bande, A.blanc, true), h.chemin(bande, A.arete, true));
    // La flèche du geste, verticale, juste au-dessus du sommet de l'épaule.
    const f0 = add(add(add(EPAULE, mul(AV, 20)), mul(U, hausse ? 58 : 118)), dec);
    const f1 = add(f0, [0, hausse ? -55 : 55]);
    o.push(h.fleche(`M ${V(f0).map(r1).join(' ')} L ${V(f1).map(r1).join(' ')}`, A.arete));
    o.push('</g>');
    return o.join('\n');
  }

  function renvoisHausse(z) {
    const { V } = cadre(z);
    const sommet = milieuLache();
    const buches = placeB(add(FAGOT, DEC));
    return [
      { n: 1, rond: V([-110, -1665]), cible: V(sommet), texte: 'courroie lâche : le front ne porte plus' },
      { n: 2, rond: V([-230, -1560]), cible: V(add(APPUI_DOS, DEC)), texte: 'l’épaule haussée porte la courroie' },
      { n: 3, rond: V([-320, -1430]), cible: V(add(ATTACHE, DEC)), texte: 'bout noué autour de la charge' },
      { n: 4, rond: V([-345, -930]), cible: V(buches[3].c), texte: 'charge appuyée au creux des reins' },
    ];
  }
  function renvoisRelache(z) {
    const { V } = cadre(z);
    return [
      { n: 5, rond: V([335, -1700]), cible: V(TH([80, -62])), texte: 'bande large sur le front' },
      { n: 6, rond: V([-100, -1665]), cible: V(lerp(SORTIE, APPUI, 0.55)), texte: 'courroie tendue : le front porte' },
      { n: 7, rond: V([330, -1480]), cible: V(add(EPAULE, mul(U, 45))), texte: 'épaule relâchée, basse' },
    ];
  }

  return {
    ref: '24-05',
    titre: 'Porter à la courroie de front',
    desc: 'Deux fois le même porteur, de profil, penché en avant, un fagot de bûches couchées en travers du bas du dos. La bande large passe sur le front ; la courroie longe le côté de la tête au-dessus de l’oreille, descend derrière la nuque, porte sur le haut du dos et longe le dos jusqu’au fagot, qu’elle entoure et où elle est nouée. Épaules haussées (flèche vers le haut) : le haut du dos monte sous la courroie et soulève le fagot ; le bout entre la tête et l’épaule pend, lâche. Épaules relâchées (flèche vers le bas) : la courroie est tendue d’un trait du front au fagot, le front porte.',
    format: 'demi',
    disposition: [['hausse', 'relache']],
    vues: {
      hausse: {
        titre: 'Épaules haussées : la charge passe aux épaules',
        dessin: z => porteur(z, 'hausse'),
        renvois: z => renvoisHausse(z),
      },
      relache: {
        titre: 'Épaules relâchées : elle revient au front',
        dessin: z => porteur(z, 'relache'),
        renvois: z => renvoisRelache(z),
      },
    },
  };
};
