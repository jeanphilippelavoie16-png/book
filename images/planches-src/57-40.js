// Planche 57-40. La foène : la faire, frapper, viser (chapitre 57, §9-A, « La foène », « Faire la
// foène », « Où et quand frapper », « Viser sous le poisson »).
// Dessinée le 15 octobre 2026 (inventaire des planches, priorité haute).
//
// Tout vient du chapitre : le manche refendu, la pointe logée au fond de la fente et ligaturée
// dessus et dessous, deux mâchoires courbes liées de part et d'autre du manche, écartées au pied
// et ramenées vers la pointe au bout, chacune avec une dent près du bout tournée vers l'intérieur
// et vers le manche (encoche qui laisse un crochet, ou clou à finir planté et recourbé) ; le coup
// écarte les mâchoires, le poisson s'enfile, elles se referment seules derrière lui ; l'essai sur
// un paquet de mousse ; frapper d'au-dessus, droit vers le bas.
// Cotes : 25 cm de mâchoires sur 8 cm de large (la tête de fer du chapitre, « pour l'échelle »).
// La forme générale des mâchoires suit les deux foènes innues de la fiche Tipatshimuna enregistrée
// (sources/53-foene-tipatshimuna-*.html, ancien ch. 53) : bouts évasés, dent en dedans.
// Ce qui n'est pas coté : l'épaisseur du manche (« deux ou trois doigts »), la profondeur de la
// fente, la place des ligatures, la longueur de la pointe.
module.exports = (h) => {
  const A = h.a;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const RAD = Math.PI / 180;
  const lisse = (pts, ferme = false) => {
    const n = pts.length, P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
    const fin = ferme ? n : n - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  const map = (T, pts) => pts.map(T);
  const tourne = (p, c, deg) => {
    const a = deg * RAD, dx = p[0] - c[0], dy = p[1] - c[1];
    return [c[0] + dx * Math.cos(a) - dy * Math.sin(a), c[1] + dx * Math.sin(a) + dy * Math.cos(a)];
  };

  // ─── La tête de foène, en mm. x vers la droite ; y vers le manche (y = 0 : le bout du manche,
  // y < 0 : vers la pointe). La fonction T place ce repère dans la vue (pointe en haut ou en bas).
  const RM = 16;                     // demi-épaisseur du manche, au bout (deux doigts)
  const YB = 60;                     // le pied des mâchoires (25 cm jusqu'au bout)
  const YT = -190;                   // le bout des mâchoires
  // la mâchoire de droite, contour fermé : bord extérieur de bas en haut, bout, dent, bord intérieur
  const MACHOIRE = [
    [RM, YB], [RM + 9, YB], [RM + 9, 4], [28, -20], [35, -50], [40, -80], [39.5, -110], [34, -140], [26, -164],
    [21, -184], [19, -191], [13, -193], [8, -190],                                       // le bout évasé
    [6, -183], [2.5, -170],                                                              // la dent : crochet en dedans, vers le manche
    [10, -174], [13, -165], [17, -150], [24, -128], [30, -100], [31, -80], [27.5, -54], [21, -28], [RM, -8], [RM, 0],
  ];
  // la pointe : une tige de fer ; la partie logée dans la fente (y = 0 à 56) se dessine cachée
  const POINTE = [[-3, 0], [-3, -120], [-2.5, -160], [-1.2, -186], [0, -197], [1.2, -186], [2.5, -160], [3, -120], [3, 0]];
  const LIG = [[2, 16], [42, 56]];   // les deux ligatures (de y à y)

  // dessine la tête ; o : { ecart (degrés d'ouverture de chaque mâchoire), manche (longueur visible),
  // parties : 'tout' · 'fond' (manche et pointe) · 'machoires' (mâchoires et ligatures) }
  const PIVOT = [RM + 6, 4];
  const ouvre = (p, k, ecart) => {
    const piv = [k * PIVOT[0], PIVOT[1]];
    return p[1] < piv[1] ? tourne(p, piv, k * ecart * Math.min(1, (piv[1] - p[1]) / 40)) : p;
  };
  const jaw = (k, ecart) => MACHOIRE.map(([x, y]) => ouvre([k * x, y], k, ecart));
  const tete = (T, { ecart = 0, manche = 150, cassure = true, interieur = true, fente = true, parties = 'tout' } = {}) => {
    const o = [];
    if (parties !== 'machoires') {
      const mh = [[-RM, 0], [-RM, manche], [RM, manche], [RM, 0]];
      o.push(h.chemin(map(T, mh), A.blanc, true));
      o.push(h.chemin(map(T, [[-RM, 0], [-RM, manche]]), A.contour), h.chemin(map(T, [[RM, 0], [RM, manche]]), A.contour));
      o.push(h.chemin(map(T, [[-RM, 0], [RM, 0]]), A.arete));
      for (const [x, a, b] of [[-8, 74, 140], [7, 90, 150], [1, 120, 150]]) if (b <= manche) o.push(h.chemin(map(T, [[x, a], [x + 0.5, b]]), A.detail));
      if (cassure) o.push(h.chemin(map(T, [[-RM, manche], [-7, manche + 4], [2, manche - 2], [10, manche + 3], [RM, manche]]), A.detail));
      // la fente : visible entre les ligatures et sous la deuxième
      if (fente) o.push(h.chemin(map(T, [[0, 16], [0, 42]]), A.arete), h.chemin(map(T, [[0, 56], [0, 70]]), A.arete));
      const P = POINTE;
      o.push(h.path(lisse(map(T, P.slice(1, -1))) + ` L${T(P[P.length - 1]).map(f1).join(' ')} L${T(P[0]).map(f1).join(' ')} Z`, W(A.arete)));
      if (interieur) o.push(h.chemin(map(T, [[-3, 0], [-3, 54], [3, 54], [3, 0]]), A.cache));
    }
    if (parties !== 'fond') {
      for (const k of [-1, 1]) o.push(h.path(lisse(map(T, jaw(k, ecart)), true), W(A.contour)));
      for (const [a, b] of LIG) {
        const xa = RM + 9.5;
        o.push(h.chemin(map(T, [[-xa, a], [xa, a], [xa, b], [-xa, b]]), W(A.arete), true));
        for (let y = a + 3.3; y < b - 1; y += 3.3) o.push(h.chemin(map(T, [[-xa, y], [xa, y + 1.4]]), A.detail));
      }
    }
    return o.join('\n');
  };
  // la position d'un point de la mâchoire (k = 1 : droite) pour un écart donné
  const surMachoire = (p, ecart, k = 1) => ouvre([k * p[0], p[1]], k, ecart);
  // place la foène dans une vue : bout de la pointe en `bout`, axe vers le manche `d` (unitaire), échelle k
  const place = (bout, d, k) => p => {
    const t = (p[1] + 197) * k, x = p[0] * k, n = [-d[1], d[0]];
    return [bout[0] + d[0] * t + n[0] * x, bout[1] + d[1] * t + n[1] * x];
  };

  // ─── Vue 1 : montée, de face, pointe en haut ──────────────────────────────────────────────────
  const geomMontee = z => {
    const haut = 197 + 34, bas = 170;
    const s = Math.min((z.h - 10) / (haut + bas), (z.l - 64) / 80);
    const cx = z.l / 2 + 4, y0 = 8 + haut * s;
    return { s, cx, y0, T: p => [cx + s * p[0], y0 + s * p[1]], manche: (z.h - 6 - y0) / s };
  };
  const vueMontee = {
    titre: 'Montée',
    dessin: z => {
      const { s, T, manche } = geomMontee(z);
      const o = [tete(T, { manche })];
      // 25 cm de mâchoires, du pied au bout, cotés à gauche
      const xg = T([-40 - 16, 0])[0];
      o.push(h.cote(xg, T([0, YB])[1], xg, T([0, YT])[1], '25 cm', { cote: 'gauche' }));
      o.push(h.ligne(xg - 4, T([0, YB])[1], T([-RM - 11, YB])[0], T([0, YB])[1], A.fin));
      o.push(h.ligne(xg - 4, T([0, YT])[1], T([-14, YT])[0], T([0, YT])[1], A.fin));
      // 8 cm de large, au plus large, cotés au-dessus de la tête
      const yc = T([0, -222])[1];
      o.push(h.cote(T([-40, 0])[0], yc, T([40, 0])[0], yc, '8 cm'));
      o.push(h.ligne(T([-40, 0])[0], yc - 4, T([-40, 0])[0], T([0, -84])[1], A.fin));
      o.push(h.ligne(T([40, 0])[0], yc - 4, T([40, 0])[0], T([0, -84])[1], A.fin));
      return o.join('\n');
    },
    renvois: z => {
      const { s, T, cx } = geomMontee(z);
      const xd = z.l - 12;
      return [
        { n: 1, rond: [xd, T([0, 150])[1]], cible: T([0, 66]), texte: 'manche refendu au bout' },
        { n: 2, rond: [xd, T([0, 112])[1]], cible: T([3, 34]), texte: 'pointe au fond de la fente' },
        { n: 3, rond: [xd, T([0, 74])[1]], cible: T([RM + 9.5, 50]), texte: 'babiche mouillée, deux ligatures' },
        { n: 4, rond: [xd, T([0, -40])[1]], cible: T([36.5, -40]), texte: 'mâchoire courbe, liée au manche' },
        { n: 5, rond: [xd, T([0, -150])[1]], cible: T([3.2, -171]), texte: 'la dent, en dedans, vers le manche' },
        { n: 6, rond: [16, T([0, -150])[1]], cible: T([-0.6, -195]), texte: 'les bouts presque à la pointe' },
      ];
    },
  };

  // ─── Vue 2 : la dent, de près (deux façons) ─────────────────────────────────────────────────
  // le haut de la mâchoire de droite, grossi ; à gauche la pointe (en partie) pour situer le dedans
  const geomDent = z => {
    const s = Math.min((z.l - 20) / 44, (z.h - 30) / 2 / 66);
    const ox = z.l / 2 - 20 * s;
    const Ta = p => [ox + s * p[0], 10 + s * (p[1] + 198)];
    const Tb = p => [ox + s * p[0], z.h / 2 + 12 + s * (p[1] + 198)];
    return { s, Ta, Tb };
  };
  const vueDent = {
    titre: 'La dent',
    dessin: z => {
      const { s, Ta, Tb } = geomDent(z);
      const o = [];
      const haut = MACHOIRE.slice(6, 19);                            // du bord extérieur au bord intérieur, par le bout
      const coupe = (T) => h.chemin(map(T, [[haut[haut.length - 1][0], haut[haut.length - 1][1]], [haut[0][0], haut[0][1]]]), A.detail);
      // a) l'encoche taillée
      o.push(h.path(lisse(map(Ta, haut)), W(A.contour)), coupe(Ta));
      o.push(h.path(lisse(map(Ta, [[33, -136], [27, -158], [21, -178]])), A.detail));
      o.push(h.path(lisse(map(Ta, POINTE.slice(2, 7))), W(A.arete)));
      // b) le clou à finir : le bout de mâchoire sans encoche, le clou planté au travers, ressorti en dedans et recourbé
      const lisseBout = [[39.5, -110], [34, -140], [26, -164], [21, -184], [19, -191], [13, -193], [8, -190], [7, -182], [10, -170], [13, -160], [17, -150], [24, -128], [30, -100], [31, -96]];
      o.push(h.path(lisse(map(Tb, lisseBout)), W(A.contour)), h.chemin(map(Tb, [[31, -96], [39.5, -110]]), A.detail));
      o.push(h.path(lisse(map(Tb, [[33, -136], [27, -158], [21, -178]])), A.detail));
      o.push(h.path(lisse(map(Tb, POINTE.slice(2, 7))), W(A.arete)));
      o.push(h.chemin(map(Tb, [[25.5, -172], [9.2, -172]]), A.cache));                  // la tige dans le bois
      o.push(h.chemin(map(Tb, [[25.8, -175.5], [25.8, -168.5]]), A.contour));           // la tête du clou, dehors
      o.push(h.path(lisse(map(Tb, [[9.2, -172], [5.5, -171.5], [3.6, -168.5], [3.8, -163]])), 'fill="none" stroke="#1A1A1A" stroke-width="2.4" stroke-linecap="round"'));
      return o.join('\n');
    },
    renvois: z => {
      const { s, Ta, Tb } = geomDent(z);
      return [
        { n: 7, rond: [z.l - 12, Ta([0, -120])[1]], cible: Ta([8.5, -173.5]), texte: 'encoche qui laisse un crochet' },
        { n: 8, rond: [z.l - 12, Tb([0, -120])[1]], cible: Tb([4.2, -164]), texte: 'ou clou à finir recourbé' },
      ];
    },
  };

  // ─── Le poisson en travers (coupe du corps) et le paquet de mousse ───────────────────────────
  // section : le dos en haut (vers le manche), le ventre en bas ; 44 mm de large, 72 de haut.
  const SECTION = [[0, -36], [9, -32], [17, -20], [21, -4], [20, 14], [14, 28], [0, 36], [-14, 28], [-20, 14], [-21, -4], [-17, -20], [-9, -32]];
  // vu de bout : la nageoire du dos en haut, les deux nageoires du ventre en bas
  const poissonCoupe = (Tp) => [
    h.chemin(map(Tp, [[-3, -33], [0, -52], [3, -33]]), W(A.arete), true),                                       // nageoire du dos
    ...[-1, 1].map(k => h.chemin(map(Tp, [[k * 10, 30], [k * 26, 40], [k * 17, 25]]), W(A.arete), true)),     // nageoires du ventre
    h.path(lisse(map(Tp, SECTION), true), W(A.contour)),
  ].join('\n');
  const mousse = (Tp) => {
    const o = [];
    const bord = [[0, -30], [14, -27], [24, -16], [27, 0], [24, 16], [14, 27], [0, 30], [-14, 27], [-24, 16], [-27, 0], [-24, -16], [-14, -27]];
    o.push(h.path(lisse(map(Tp, bord), true), W(A.contour)));
    for (const [x, y] of [[-12, -14], [6, -18], [14, -2], [-4, 2], [-16, 8], [8, 14], [-6, 20]]) {
      o.push(h.path(lisse(map(Tp, [[x - 4, y + 2], [x - 1, y - 2], [x + 2, y + 1], [x + 5, y - 2]])), A.detail));
    }
    // la ficelle qui serre le paquet
    o.push(h.chemin(map(Tp, [[-27, 0], [27, 0]]), A.arete));
    return o.join('\n');
  };

  // ─── Vues 3 à 6 : le coup, en trois temps, puis l'essai ─────────────────────────────────────
  // La foène pointe en bas, le bout du manche en haut de la vue ; même cadrage pour les quatre.
  const geomCoup = (z, temps) => {
    const s = Math.min((z.h - 12) / 330, (z.l - 24) / 110), cx = z.l / 2;
    const yBout = 8 + (60 + 197) * s + (temps === 4 ? -8 * s : 0);   // le bout de la pointe
    return { s, cx, T: place([cx, yBout], [0, -1], s) };
  };
  const POS = { 1: -262, 2: -224, 3: -118, 4: -112 };               // le centre du corps, repère de la tête
  const ECART = { 1: 0, 2: 9, 3: 0, 4: 0 };
  const coup = (temps) => ({
    titre: { 1: 'Le coup', 2: 'Elles s’écartent', 3: 'Elles se referment', 4: 'L’essai à terre' }[temps],
    dessin: z => {
      const { s, cx, T } = geomCoup(z, temps);
      const o = [];
      const ecart = ECART[temps], pos = POS[temps];
      const Tp = p => T([p[0], pos - p[1]]);
      const corps = temps === 4 ? mousse(Tp) : poissonCoupe(Tp);
      const opt = { ecart, manche: 60, cassure: true, interieur: false, fente: false };
      if (temps === 1) {
        o.push(tete(T, opt), corps);
        const [gx, gy] = T([RM + 40, -40]);
        o.push(h.geste(`M${f1(gx)} ${f1(gy)} L${f1(gx)} ${f1(gy + 64 * s)}`));
      } else if (temps === 2) {
        // la pointe entre dans le dos ; les mâchoires glissent sur les flancs
        o.push(tete(T, { ...opt, parties: 'fond' }), corps);
        o.push(h.chemin(map(T, [[0, -197], [0, pos + 34]]), A.cache));
        o.push(tete(T, { ...opt, parties: 'machoires' }));
        for (const k of [-1, 1]) {
          const a = T(surMachoire([RM + 6, -150], 0, k)), b = T(surMachoire([RM + 6, -150], ecart, k));
          o.push(h.fleche(`M${f1(a[0] + k * 4)} ${f1(a[1])} L${f1(b[0] + k * 12)} ${f1(b[1])}`, A.arete));
        }
      } else {
        // le corps enfilé sur la pointe : la pointe cachée dedans ; les mâchoires refermées dehors
        o.push(tete(T, { ...opt, parties: 'fond' }), corps);
        o.push(h.chemin(map(T, [[0, pos + 34], [0, Math.max(-197, pos - 34)]]), A.cache));
        o.push(tete(T, { ...opt, parties: 'machoires' }));
        if (temps === 3) o.push(h.controle(...T([0, -176]), 8 + 10 * s));
        if (temps === 4) {
          const yS = T([0, pos - 30])[1] + 30;
          o.push(h.chemin([[cx - 50, yS], [cx + 50, yS]], A.arete));
          const [gx, gy] = T([RM + 42, -60]);
          o.push(h.geste(`M${f1(gx)} ${f1(gy)} L${f1(gx)} ${f1(gy - 56 * s)}`));
        }
      }
      return o.join('\n');
    },
    renvois: z => {
      const { s, T } = geomCoup(z, temps);
      if (temps === 2) return [{ n: 9, rond: [z.l - 13, z.h - 13], cible: T(surMachoire([16, -191], ECART[2], 1)), texte: 'le coup écarte les mâchoires' }];
      if (temps === 3) return [{ n: 10, rond: [z.l - 13, z.h - 13], cible: T([16, -191]), texte: 'les dents tiennent sous le ventre' }];
      if (temps === 4) return [{ n: 11, rond: [13, z.h - 13], cible: T([-26, POS[4]]), texte: 'mousse ficelée, grosse comme le poisson' }];
      return [];
    },
  });

  // ─── Vues 7 et 8 : viser ──────────────────────────────────────────────────────────────────────
  // Un poisson de profil, le dos en haut, la tête à droite (mm) : 300 de long.
  const PROFIL = [[150, 0], [138, -16], [110, -30], [60, -36], [0, -34], [-60, -26], [-110, -14], [-128, -6],
    [-152, -26], [-146, 0], [-152, 26], [-128, 6], [-110, 12], [-60, 24], [0, 30], [60, 30], [110, 22], [138, 12]];
  const poissonProfil = (T, attrs) => h.path(lisse(map(T, PROFIL), true), attrs);
  const geomViser = z => {
    const s = (z.l - 30) / 330;
    return { s, yS: z.h * 0.42, yF: z.h * 0.82, cx: z.l / 2 };
  };
  const viser = (bon) => ({
    titre: bon ? 'Viser : d’au-dessus' : 'Raté : en biais',
    dessin: z => {
      const { s, yS, yF, cx } = geomViser(z);
      const o = [];
      o.push(h.rect(4, yS, z.l - 8, z.h - yS - 4, A.hachure('eau', 'aucun')));
      o.push(h.chemin([[4, yS], [z.l - 4, yS]], A.arete));
      const Tf = (dx, dy) => p => [cx + dx + s * p[0], dy + s * p[1]];
      const k = s * 0.62;
      if (bon) {
        // le poisson, son image juste au-dessus ; la foène droite, qui descend sur lui
        const yi = yS + (yF - yS) * 0.6;
        o.push(poissonProfil(Tf(0, yi), A.cache));
        o.push(poissonProfil(Tf(0, yF), W(A.contour)));
        const T = place([cx + 20 * s, yF - 28 * s], [0, -1], k);
        o.push(tete(T, { manche: ((yF - 28 * s) - 6) / k - 197, cassure: false, interieur: false, fente: false }));
        o.push(h.geste(`M${f1(cx + 20 * s + 44 * k)} ${f1(yS - 46)} L${f1(cx + 20 * s + 44 * k)} ${f1(yS - 6)}`));
      } else {
        // en biais : l'image paraît plus haut et plus près ; la foène visée sur l'image passe au-dessus
        const xi = -60 * s, yi = yS + (yF - yS) * 0.42;
        o.push(poissonProfil(Tf(xi, yi), A.cache));
        o.push(poissonProfil(Tf(0, yF), W(A.contour)));
        const ang = 34 * RAD, d = [-Math.sin(ang), -Math.cos(ang)];
        const bout = [cx + xi + 40 * s, yi + 4 * s];
        const T = place(bout, d, k);
        const longueur = (bout[1] - 6) / Math.cos(ang) / k - 197;
        o.push(tete(T, { manche: longueur, cassure: false, interieur: false, fente: false }));
        o.push(h.controle(cx + 30 * s, yF - 52 * s, 12));
      }
      return o.join('\n');
    },
    renvois: z => {
      const { s, yS, yF, cx } = geomViser(z);
      if (bon) return [];
      return [{ n: 12, rond: [z.l - 16, z.h - 14], cible: [cx + 60 * s, yF + 28 * s], texte: 'le poisson, plus creux que son image' }];
    },
  });

  return {
    ref: '57-40',
    titre: 'La foène : la faire, frapper, viser',
    desc: 'En haut à gauche, la tête de foène montée, de face, pointe en haut : le manche refendu au bout ; la pointe de fer logée au fond de la fente, en aiguille ; deux mâchoires de bois courbes, liées de part et d’autre du manche par deux ligatures de babiche, l’une au bout du manche, l’autre plus bas ; elles s’écartent du manche puis reviennent vers la pointe, leurs bouts presque contre le bout de la pointe ; près du bout, chaque mâchoire porte une dent tournée vers l’intérieur et vers le manche. Cotes : 25 cm de mâchoires, 8 cm de large. À côté, la dent de près : une encoche taillée qui laisse un crochet, ou un clou à finir planté au travers et recourbé vers le manche. Au milieu, le coup en trois temps, la foène pointe en bas et le poisson coupé en travers : la foène descend sur le dos du poisson ; les mâchoires s’écartent sur ses flancs pendant que la pointe entre ; le poisson enfilé sur la pointe, les mâchoires refermées seules sous son ventre, les dents qui le tiennent. Puis l’essai à terre : un paquet de mousse ficelé de la grosseur du poisson, tenu entre les mâchoires quand on relève la foène. À droite, viser : d’au-dessus, le poisson est juste sous son image et la foène poussée droit vers le bas passe dessus ; en biais, l’image paraît plus haut et plus près, et la foène visée sur l’image passe au-dessus du poisson.',
    format: 'pleine',
    disposition: [['montee', 'dent', 'bon', 'rate'], ['c1', 'c2', 'c3', 'essai']],
    hauteurs: [1.75, 1],
    largeurs: [[1.15, 0.7, 1, 1], [1, 1, 1, 1]],
    vues: { montee: vueMontee, dent: vueDent, bon: viser(true), rate: viser(false), c1: coup(1), c2: coup(2), c3: coup(3), essai: coup(4) },
  };
};
