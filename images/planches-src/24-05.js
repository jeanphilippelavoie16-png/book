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
// Le porteur est le corps simple « courroie-front », de profil, les bras pendant le long du tronc.
// Le haussement d'épaules se dessine avec lui : un second corps, le même décalé le long de l'axe du
// tronc, peint seulement derrière une ligne parallèle au bras (le bras, le haut du dos, le bas de la
// nuque) ; la poitrine, la gorge et la tête restent celles du premier. Les traits coupés par cette
// zone sont tous parallèles au décalage : aucune cassure. Rouge : la flèche du geste dans chaque vue
// (hausser, relâcher : les deux temps du même geste).

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

  // ─── Le porteur : le corps simple « courroie-front », de profil (corps/moteur.js). Sa géométrie
  // est lue une fois, en mm (sol en y = 0, y vers le bas) : l'axe du tronc, l'épaule, la tête, et le
  // contour du dos tiré de sa silhouette.
  const POSE = 'courroie-front', HAUSSE = 40;
  // les bras pendent le long du tronc (parallèles au haussement : la zone qui monte les contient
  // entiers, aucun trait n'y casse)
  const ANGLES = { brasP: -14, avantbrasP: -10, mainP: -10, brasL: -16, avantbrasL: -12, mainL: -12 };
  const C1 = F.corps({ x: 0, y: 0, pose: POSE, echelle: 1, angles: ANGLES, objetP: '<g/>' });
  const J = C1.articulations;
  const U = uni(sub(J.cou, J.bassin));                      // l'axe du tronc, vers le haut
  const AV = [-U[1], U[0]];                                   // perpendiculaire, vers l'avant
  const DEC = mul(U, HAUSSE);                                 // le haussement d'épaules
  const EPAULE = J.epauleP;
  // la tête : son centre, son haut ; repère (a vers l'avant, b vers le haut), en mm
  const TC = [C1.tete.x, C1.tete.y], UPT = uni(sub(C1.tete.haut, TC)), FWT = [-UPT[1], UPT[0]];
  const TH = ([a, b]) => add(TC, add(mul(FWT, a), mul(UPT, b)));
  // le contour du corps (sans le bras proche), en mm
  const SIL = (() => {
    const m = /<path d="([^"]+)" fill="#FFFFFF" stroke="none"\/>/.exec(C1.svg);
    return [...m[1].matchAll(/(-?[\d.]+) (-?[\d.]+)/g)].map(q => [+q[1], +q[2]]);
  })();
  // le dos : le bord arrière de la silhouette à la hauteur y
  const dosX = y => {
    let x = Infinity;
    for (let i = 0; i < SIL.length; i++) {
      const a = SIL[i], b = SIL[(i + 1) % SIL.length];
      if ((y - a[1]) * (y - b[1]) <= 0 && a[1] !== b[1]) x = Math.min(x, a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]));
    }
    return x;
  };
  // le dos, de la nuque aux fesses
  const DOS = [];
  for (let y = J.nuque[1] + 40; y <= J.bassin[1] + 120; y += 20) DOS.push([dosX(y), y]);
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
    const y0 = J.bassin[1] - 250;
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
  const SUR_TETE = [[-2, 50], [-30, 46], [-56, 30], [-74, 4], [-82, -26]].map(TH);
  const SORTIE = SUR_TETE[SUR_TETE.length - 1];
  // Là où elle porte sur le haut du dos : la tangente au dos tirée de la nuque, épaules relâchées.
  const APPUI_ = (() => {
    let best = null, bestA = -Infinity;
    for (let y = SORTIE[1] + 40; y < EPAULE[1] + 160; y += 2) {
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
  const BANDE = [[86, 70], [60, 80], [28, 74], [2, 62], [-8, 60], [-8, 38], [2, 37], [30, 36], [62, 35], [94, 38], [97, 50], [94, 62]];

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
  const X0 = Math.min(...placeB(FAGOT).map(b => b.c[0] - b.r)) - 30, X1 = TC[0] + 150, Y0 = C1.tete.haut[1] - 70, Y1 = J.bassin[1] + 160;
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
    const pers = decal => F.corps({ x: ox + decal[0] * e, y: oy + decal[1] * e, pose: POSE, echelle: e, angles: ANGLES, trait: 'fort' }).svg;
    o.push(`<clipPath id="k2405-${etat}"><rect x="0" y="0" width="${r1(z.l)}" height="${r1(z.h)}"/></clipPath>`);
    o.push(`<g clip-path="url(#k2405-${etat})">`);
    o.push(pers([0, 0]));
    if (hausse) {
      // La zone qui monte : derrière une ligne parallèle au bras, sous la tête, au-dessus de l'omoplate
      // pour le dos, et la bande du bras jusqu'en bas.
      const lf = t => add(add(EPAULE, mul(AV, 60)), mul(U, t));
      const lb = t => add(add(EPAULE, mul(AV, -60)), mul(U, t));
      const tAt = (f, y) => { const p0 = f(0), p1 = f(1); return (y - p0[1]) / (p1[1] - p0[1]); };
      const yCoupe = EPAULE[1] + 80;
      // le dessous de la tête, de derrière le crâne au dessous du menton : la tête ne monte pas
      const tete = [[-104, 10], [-100, -22], [-90, -50], [-74, -72], [-50, -92], [-20, -108], [12, -120], [44, -126]].map(TH);
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
    // La flèche du geste, le long du tronc, juste au-dessus du sommet de l'épaule.
    const f0 = add(add(add(EPAULE, mul(AV, 20)), mul(U, hausse ? 58 : 118)), dec);
    const f1 = add(f0, mul(U, hausse ? 55 : -55));
    o.push(h.geste(`M ${V(f0).map(r1).join(' ')} L ${V(f1).map(r1).join(' ')}`));
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
    desc: 'Deux fois le même porteur (corps simple), de profil, penché en avant, les bras pendant le long du tronc, un fagot de bûches couchées en travers du bas du dos. La bande large passe sur le front ; la courroie longe le côté de la tête au-dessus de l’oreille, descend derrière la nuque, porte sur le haut du dos et longe le dos jusqu’au fagot, qu’elle entoure et où elle est nouée. Épaules haussées (flèche vers le haut) : le haut du dos monte sous la courroie et soulève le fagot ; le bout entre la tête et l’épaule pend, lâche. Épaules relâchées (flèche vers le bas) : la courroie est tendue d’un trait du front au fagot, le front porte.',
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
