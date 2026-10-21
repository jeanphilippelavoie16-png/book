// Planche 44-01 — Le bâton à pattes
// (chapitre 44, dresser le chien, étape 5 « La piste presque sans sang » : deux pattes de la dernière
// bête, gardées congelées, fixées au bout d'un bâton de marche ou sous une paire de bottes ; le chien
// apprend l'odeur des glandes logées entre les deux doigts du sabot.)
// Aucune cote : le chapitre ne donne aucune mesure du montage. Les proportions de la patte sont
// celles d'une patte avant d'orignal, pour le dessin seulement ; les sabots sont en noir, comme
// sur la bête, pour se détacher du poil.
// Vues de côté : la vue est tournée un peu, la patte du côté loin paraît un peu en avant de la patte
// proche ; le bâton passe entre les deux, sa partie cachée en tireté. La vue de dessus, prise à la
// ligature, montre l'ordre des trois.
module.exports = (h) => {
  const A = h.a;
  const BLANC = '#FFFFFF';
  const blanc = (a) => a.replace('fill="none"', `fill="${BLANC}"`);
  const halo = (w) => `fill="none" stroke="${BLANC}" stroke-width="${w}" stroke-linejoin="round"`;
  const f = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;

  // Catmull-Rom : les segments « C » qui passent par chaque point, à partir de P[0]
  const cr = (P, ferme = false) => {
    let d = '';
    const n = P.length, g = (i) => (ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))]);
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C${f([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${f([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${f(p2)}`;
    }
    return d;
  };
  const courbe = (P) => `M${f(P[0])}${cr(P)}`;
  const boucle = (P) => `M${f(P[0])}${cr(P, true)} Z`;
  // ─── mains simples : la boîte d'une vue, et l'angle qui met l'axe de la prise sur `axe` (degrés à l'écran)
  // avec l'avant-bras du côté de `vers`
  const BORD = z => ({ x0: 0, y0: 0, x1: z.l, y1: z.h });
  const poser = (o, axe, vers) => {
    const base = Object.assign({}, o, { angle: 0, avantbras: { longueur: 100 } });
    delete base.objet;
    const e0 = h.formes.mainSimple(base);
    let best = null;
    for (const k of [0, 180]) {
      const a = axe - e0.prise.angle + k, e = h.formes.mainSimple(Object.assign({}, base, { angle: a }));
      const d = [e.coude[0] - e.poignet[0], e.coude[1] - e.poignet[1]], w = [vers[0] - e.poignet[0], vers[1] - e.poignet[1]];
      const c = (d[0] * w[0] + d[1] * w[1]) / ((Math.hypot(d[0], d[1]) * Math.hypot(w[0], w[1])) || 1);
      if (!best || c > best.c) best = { a, c };
    }
    return best.a;
  };
  // un repère : origine (ox, oy) au sol, s unités de vue par mm
  const rep = (ox, oy, s) => (p) => [ox + s * p[0], oy + s * p[1]];
  const decale = (P, d) => (p) => P([p[0] + d[0], p[1] + d[1]]);
  const hasard = (graine) => { let a = graine >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const brisure = (xa, xb, y) => `M${f([xa - 3, y + 2])} Q${f([(3 * xa + xb) / 4, y - 5])} ${f([(xa + xb) / 2, y])} T${f([xb + 3, y - 2])}`;

  // ─── La patte de profil (mm, sol en y = 0, pointe du sabot vers +x) ────────────────────────
  // Patte avant coupée au genou : le genou, le canon, le boulet, les ergots, le paturon, le sabot.
  const PROFIL = {
    dos: [[-44, 0], [-56, -7], [-60, -22], [-58, -38], [-66, -56], [-80, -78], [-94, -100], [-104, -122], [-107, -148], [-101, -178], [-97, -215], [-95, -300], [-97, -420], [-101, -490]],
    genou: [[-101, -490], [-95, -510], [-76, -520], [-54, -517], [-38, -504]],
    devant: [[-38, -504], [-33, -474], [-38, -420], [-39, -300], [-40, -215], [-42, -180], [-37, -158], [-26, -133], [-8, -104], [10, -78]],
    paroi: [[10, -78], [34, -52], [58, -24], [72, -8], [78, 0]],
    couronne: [[10, -78], [-10, -64], [-32, -52], [-55, -42]],
    talonSabot: [[-55, -42], [-58, -36], [-60, -22], [-56, -7], [-44, 0]],
    talon: [[-20, -1], [-30, -18], [-42, -36]],
    tendon: [[-86, -462], [-84, -330], [-85, -230], [-92, -190]],
    ergot: [[-93, -99], [-101, -89], [-113, -80], [-110, -93], [-104, -114]],
  };
  const bord = (L, y) => {
    for (let i = 0; i < L.length - 1; i++) {
      const a = L[i], b = L[i + 1];
      if ((a[1] - y) * (b[1] - y) <= 0 && a[1] !== b[1]) { const t = (y - a[1]) / (b[1] - a[1]); return [a[0] + t * (b[0] - a[0]), y]; }
    }
    return null;
  };
  // coupe : null pour la patte entière (coupée au genou) ; une hauteur en mm pour la couper plus bas
  const patteProfil = (P, { coupe = null, ergot = true, graine = 3, loin = false } = {}) => {
    const out = [];
    let d;
    if (coupe == null) {
      d = `M${f(P([78, 0]))} L${f(P([-44, 0]))}${cr(PROFIL.dos.map(P))}${cr(PROFIL.genou.map(P))}${cr(PROFIL.devant.map(P))}${cr(PROFIL.paroi.map(P))} Z`;
    } else {
      const dos = [...PROFIL.dos.filter(p => p[1] > coupe + 0.1), bord(PROFIL.dos, coupe)];
      const dev = [bord(PROFIL.devant, coupe), ...PROFIL.devant.filter(p => p[1] > coupe + 0.1)];
      d = `M${f(P([78, 0]))} L${f(P([-44, 0]))}${cr(dos.map(P))} L${f(P(dev[0]))}${cr(dev.map(P))}${cr(PROFIL.paroi.map(P))} Z`;
    }
    out.push(h.path(d, loin ? A.arete.replace('fill="none"', 'fill="#E6E6E6"') : blanc(A.arete)));
    if (coupe == null) out.push(h.path(courbe(PROFIL.tendon.map(P)), A.fin));
    if (ergot) out.push(h.path(boucle(PROFIL.ergot.map(P)), A.plein));
    // le sabot, noir, bordé de blanc pour se détacher de celui d'à côté
    const paroiInv = [...PROFIL.paroi].reverse();
    const s = `M${f(P(PROFIL.couronne[0]))}${cr(PROFIL.couronne.map(P))}${cr(PROFIL.talonSabot.map(P))} L${f(P([78, 0]))}${cr(paroiInv.map(P))} Z`;
    out.push(h.path(s, halo(2.6)));
    out.push(h.path(s, A.plein));
    out.push(h.path(courbe(PROFIL.talon.map(P)), halo(0.7)));
    // le poil qui retombe jusqu'à la couronne, et quelques traits le long du canon
    const r = hasard(graine);
    for (let k = 0; k < 6; k++) {
      const t = (k + 0.5) / 6, a = PROFIL.couronne[0], b = PROFIL.couronne[3];
      const x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t - 2;
      out.push(h.path(`M${f(P([x + 4, y - 13]))} Q${f(P([x + 1 + r() * 2, y - 6]))} ${f(P([x - 1, y]))}`, A.fin));
    }
    for (let k = 0; k < 8; k++) {
      const y = -205 - k * 34 - r() * 10;
      if (coupe != null && y < coupe + 30) break;
      if (y < -470) break;
      const x = k % 2 ? -74 + r() * 6 : -52 - r() * 5;
      out.push(h.path(`M${f(P([x, y]))} Q${f(P([x + 1.5, y + 8]))} ${f(P([x + 0.5, y + 16]))}`, A.fin));
    }
    return out.join('\n');
  };

  // ─── Le montage (mm) ─────────────────────────────────────────────────────────────────────
  const LOIN = [36, 0];           // la patte du côté loin, vue tournée : un peu en avant
  const MIL = [18, 0];            // le bâton, entre les deux
  const XB = -68, RB = 16;        // l'axe du bâton dans le repère de la patte proche, son rayon (32 mm : la prise de manche s'y lit)
  const Y_BOUT = -182;            // le bout du bâton : au-dessus du boulet
  const LIGATURES = [-452, -262];
  const montage = (P, s, { yHaut, cache = true, ep = 4, pas = 4.4, graine = 1 }) => {
    const out = [];
    const Pl = decale(P, LOIN), Pm = decale(P, MIL);
    out.push(patteProfil(Pl, { graine: graine + 4, loin: true }));         // la patte du côté loin, en gris
    const g = Pm([XB - RB, 0])[0], d = Pm([XB + RB, 0])[0], yb = Pm([0, Y_BOUT])[1];
    out.push(h.rect(g, yHaut, d - g, yb - yHaut, blanc(A.arete)));
    out.push(h.path(brisure(g, d, yHaut), A.detail));
    out.push(patteProfil(P, { graine: graine + 8 }));
    if (cache) {
      // la partie du bâton cachée derrière la patte proche : son bord arrière et son bout
      const yh = P([0, -512])[1];
      out.push(h.ligne(g, yh, g, yb, A.cache));
      out.push(h.ligne(g, yb, d, yb, A.cache));
    }
    // deux ligatures : les tours serrent les trois ensemble
    LIGATURES.forEach((y0, j) => {
      for (let k = 0; k < 4; k++) {
        const y = y0 + (k * pas) / s;
        const pts = [P([-99 - j * 5, y + 1]), P([-50, y]), P([-2 + (j ? -2 : 3), y - 1])];
        out.push(h.formes.corde(pts, { ep, debut: 'ouvert', fin: 'ouvert' }));
      }
    });
    return out.join('\n');
  };

  // ─── Géométrie des vues ──────────────────────────────────────────────────────────────────
  const gEmploi = (z) => {
    const s = 0.28, yG = z.h - 18, xL = z.l * 0.44;
    const P = rep(xL, yG, s);
    const xB = decale(P, MIL)([XB, 0])[0];
    return { s, yG, P, xB, yMain: P([0, -950])[1] };
  };
  const gMontage = (z) => {
    const s = 0.56, yG = z.h - 16;
    return { s, yG, P: rep(z.l * 0.42, yG, s) };
  };
  const gDessus = (z) => {
    const s = 0.95;
    return { s, P: rep(z.l * 0.5, z.h * 0.46, s) };
  };
  const gDetail = (z) => {
    const s = 1.1, yG = z.h - 18;
    return { s, yG, P: rep(z.l * 0.44, yG, s) };   // repère : le milieu du sabot
  };
  const gBotte = (z) => {
    const s = 0.5, yG = z.h - 14;
    const P = rep(z.l * 0.34, yG, s);              // la patte : pointe du sabot vers la droite
    const B = (p) => P([p[0] - 140, p[1] - 85]);   // la botte : origine sous le talon de la semelle
    return { s, yG, P, B };
  };

  const sol = (x1, x2, y) => [
    h.rect(x1, y, x2 - x1, 7, A.hachure('terre', 'fin')),
    h.ligne(x1, y, x2, y, A.arete),
  ].join('\n');

  return {
    ref: '44-01',
    titre: 'Le bâton à pattes',
    desc: 'Deux pattes congelées de la dernière bête attachées au bout d’un bâton de marche, une de chaque côté, par deux ligatures qui serrent les trois ; le bâton s’arrête au-dessus des sabots, qui touchent seuls le sol, pointe vers l’avant. Vue de dessus à la ligature. Détail du sabot de face : la glande entre les deux doigts. Variante : une patte attachée sous chaque botte.',
    format: 'pleine',
    disposition: [['emploi', 'montage'], ['dessus', 'detail', 'botte']],
    hauteurs: [3, 2],
    largeurs: [[2, 3], [1.15, 1.6, 2.6]],
    vues: {
      emploi: {
        titre: 'En marchant la piste',
        dessin: z => {
          const { s, P, xB, yMain, yG } = gEmploi(z), out = [];
          out.push(sol(8, z.l - 8, yG));
          out.push(montage(P, s, { yHaut: 12, cache: false, ep: 2, pas: 2.4, graine: 20 }));
          // la main gauche (mains simples), côté paume, qui tient le bâton comme pour marcher : le pouce en
          // haut, le bâton (32 mm) entre par le haut du poing et ressort en bas ; l'avant-bras part à gauche
          // et sort du cadre. Le bout de bâton qui passe dans le poing est repeint entre les couches.
          const o = { x: xB, y: yMain, pose: 'prise-manche', vue: 'paume', cote: 'gauche', echelle: s, diametre: 2 * RB, rotation: [0, 30, 0] };
          const vers = [-200, yMain + 4];
          const m = h.formes.mainSimple({ ...o, angle: poser(o, 90, vers), avantbras: { vers, bord: BORD(z), bras: { pli: 0 } } });
          const xg = xB - RB * s, xd = xB + RB * s, ya = yMain - 40, yb = yMain + 40;
          const troncon = [h.rect(xg, ya, xd - xg, yb - ya, A.blanc), h.ligne(xg, ya, xg, yb, A.arete), h.ligne(xd, ya, xd, yb, A.arete)].join('\n');
          out.push(m.couches.main, m.couches.masque, troncon, m.couches.devant);
          // on appuie le bâton à chaque pas ; on avance dans le sens des pointes
          out.push(h.geste(`M${f([xB + 28, yMain + 30])} L${f([xB + 28, yMain + 88])}`));
          const xt = decale(P, LOIN)([78, 0])[0];
          out.push(h.fleche(`M${f([xt + 8, yG - 14])} L${f([xt + 52, yG - 14])}`, A.arete));
          return out.join('\n');
        },
        renvois: z => {
          const { s, xB, yMain, P } = gEmploi(z);
          return [
            { n: 1, rond: [xB - 44, yMain + 90], cible: [xB - RB * s, yMain + 80], texte: 'bâton de marche, appuyé à chaque pas' },
            { n: 2, rond: P([-200, -70]), cible: P([-30, -12]), texte: 'les sabots à plat, pointe en avant' },
          ];
        },
      },
      montage: {
        titre: 'Le montage, de côté',
        dessin: z => {
          const { s, P, yG } = gMontage(z), out = [];
          out.push(sol(10, z.l - 10, yG));
          out.push(montage(P, s, { yHaut: 10, cache: true, ep: 4.2, pas: 4.6, graine: 50 }));
          // le point à vérifier : le bout du bâton s'arrête au-dessus des sabots
          { const c = decale(P, MIL)([XB, Y_BOUT]); out.push(h.controle(c[0], c[1], 14)); }
          return out.join('\n');
        },
        renvois: z => {
          const { P } = gMontage(z);
          const Pm = decale(P, MIL);
          return [
            { n: 3, rond: P([-215, -370]), cible: P([-80, -370]), texte: 'deux pattes de la dernière bête, congelées' },
            { n: 4, rond: P([170, -480]), cible: P([-6, -446]), texte: 'deux ligatures serrées sur les trois' },
            { n: 5, rond: P([170, -200]), cible: Pm([XB + RB - 5, Y_BOUT]), texte: 'le bâton finit au-dessus des sabots' },
          ];
        },
      },
      dessus: {
        titre: 'Vu de dessus',
        dessin: z => {
          const { s, P } = gDessus(z), out = [];
          // x : vers l'avant ; y : de côté. Les deux canons, le bâton entre les deux, la ligature autour.
          const canon = (cy) => [[-29, cy - 8], [-24, cy - 21], [-8, cy - 25], [12, cy - 23], [27, cy - 14], [29, cy + 2], [24, cy + 17], [6, cy + 24], [-14, cy + 23], [-26, cy + 13]];
          const miroir = (L) => L.map(p => [p[0], -p[1]]);
          const hc = 43;
          // la ligature : une bande qui fait le tour des trois
          const tour = (m) => [[-29 - m, -hc], [-24 - m, -hc - 22 - m * 0.6], [0, -hc - 25 - m], [24 + m, -hc - 22 - m * 0.6], [29 + m, -hc],
            [29 + m, hc], [24 + m, hc + 22 + m * 0.6], [0, hc + 25 + m], [-24 - m, hc + 22 + m * 0.6], [-29 - m, hc]];
          out.push(h.path(boucle(tour(5).map(P)), blanc(A.arete)));
          out.push(h.path(boucle(tour(3.6).map(P)), A.fin));
          out.push(h.path(boucle(tour(2.2).map(P)), A.fin));
          out.push(h.path(boucle(tour(0.8).map(P)), blanc(A.detail)));
          [canon(-hc), miroir(canon(-hc))].forEach(L => {
            out.push(h.path(boucle(L.map(P)), blanc(A.arete)));
          });
          [-hc, hc].forEach(cy => {
            const c = P([0, cy]);
            out.push(h.ellipse(c[0] + 2 * s, c[1], 10 * s, 8.5 * s, A.detail));
          });
          // le bâton : ses cernes et sa moelle
          const c0 = P([0, 0]);
          out.push(h.cercle(c0[0], c0[1], RB * s, blanc(A.arete)));
          out.push(h.cercle(c0[0], c0[1], RB * s * 0.62, A.fin));
          out.push(h.cercle(c0[0], c0[1], 1.4, A.plein));
          // le sens de la marche
          const a = P([-30, hc + 50]), b = P([30, hc + 50]);
          out.push(h.fleche(`M${f(a)} L${f(b)}`, A.arete));
          return out.join('\n');
        },
        renvois: z => {
          const { P } = gDessus(z);
          return [
            { n: 6, rond: P([-48, -98]), cible: P([-12, -52]), texte: 'une patte de chaque côté du bâton' },
          ];
        },
      },
      detail: {
        titre: 'Le sabot de face',
        dessin: z => {
          const { s, P, yG } = gDetail(z), out = [];
          out.push(sol(8, z.l - 8, yG));
          const yC = -174;
          // les ergots, derrière, qui dépassent de chaque côté
          [-1, 1].forEach(k => {
            const E = [[24, -136], [36, -138], [43, -124], [46, -100], [39, -110], [27, -122]].map(p => [k * p[0], p[1]]);
            out.push(h.path(boucle(E.map(P)), A.plein));
          });
          // le paturon, coupé par une brisure
          const ext = [[33, yC], [37, -152], [36, -130], [32, -112], [36, -92], [46, -74]], int = [[-46, -74], [-36, -92], [-32, -112], [-36, -130], [-37, -152], [-33, yC]];
          // le blanc du paturon descend derrière les doigts ; seuls ses deux bords sont tracés
          out.push(h.path(`M${f(P(ext[0]))}${cr(ext.map(P))} L${f(P([30, -40]))} L${f(P([-30, -40]))} L${f(P(int[0]))}${cr(int.map(P))} Z`, A.blanc));
          out.push(h.path(courbe(ext.map(P)), A.arete));
          out.push(h.path(courbe(int.map(P)), A.arete));
          const pa = P([-33, yC]), pb = P([33, yC]);
          out.push(h.path(brisure(pa[0], pb[0], pa[1]), A.detail));
          // les deux doigts, noirs, un peu écartés vers le bas ; l'arête blanche qui descend vers la pointe
          [-1, 1].forEach(k => {
            const X = (x) => k * x;
            const bordD = [[X(4), -66], [X(16), -74], [X(32), -72], [X(42), -62], [X(46), -40], [X(48), -16], [X(47), -4], [X(42), 0]];
            const fente = [[X(11), 0], [X(7), -6], [X(4), -34], [X(4), -66]];
            out.push(h.path(`M${f(P(bordD[0]))}${cr(bordD.map(P))} L${f(P(fente[0]))}${cr(fente.map(P))} Z`, A.plein));
            out.push(h.path(courbe([[X(33), -69], [X(31), -46], [X(24), -22], [X(16), -7], [X(12), -1]].map(P)), halo(1)));
          });
          // le poil de la couronne
          const r = hasard(31);
          for (let k = 0; k < 10; k++) {
            const x = -42 + k * 9.3 + (r() - 0.5) * 3;
            if (Math.abs(x) < 9) continue;
            out.push(h.path(`M${f(P([x, -90]))} Q${f(P([x + (r() - 0.5) * 3, -82]))} ${f(P([x + (r() - 0.5) * 2, -74 + Math.abs(x) * 0.05]))}`, A.fin));
          }
          // la peau entre les doigts, qui remonte en pli jusqu'à la glande
          out.push(h.path(courbe([[0, -60], [0.5, -70], [0, -78]].map(P)), A.detail));
          const c = P([0, -86]);
          out.push(h.ellipse(c[0], c[1], 2.4 * s, 6.5 * s, A.plein));
          [-1, 1].forEach(k => {
            for (let j = 0; j < 3; j++) {
              const x0 = k * (6 + j * 4);
              out.push(h.path(courbe([[x0 + k, -104 + j * 3], [x0 + k * 4, -88], [x0 + k * 2, -72 - j * 2]].map(P)), A.fin));
            }
          });
          return out.join('\n');
        },
        renvois: z => {
          const { P } = gDetail(z);
          const c = P([0, -86]);
          return [
            { n: 7, rond: [c[0] + 30, c[1] - 58], cible: [c[0] + 2, c[1] - 4], texte: 'la glande, entre les deux doigts' },
          ];
        },
      },
      botte: {
        titre: 'Ou sous la botte',
        dessin: z => {
          const { s, P, B, yG } = gBotte(z), out = [];
          out.push(sol(8, z.l - 8, yG));
          // la botte d'hiver de côté, la pointe vers la droite (y négatif vers le haut)
          const avant = [[272, 0], [290, -3], [301, -13], [303, -28], [293, -41], [270, -52], [240, -64], [212, -80], [190, -100], [176, -126], [168, -160], [165, -200], [170, -240]];
          const col = [[170, -240], [130, -246], [90, -247], [52, -245], [18, -240]];
          const arr = [[18, -240], [20, -200], [14, -150], [7, -110], [2, -70], [0, -35], [3, -10], [10, 0]];
          out.push(h.path(`M${f(B([10, 0]))} L${f(B([272, 0]))}${cr(avant.map(B))}${cr(col.map(B))}${cr(arr.map(B))} Z`, blanc(A.arete)));
          // la semelle, la coque de caoutchouc, le talon, le col
          out.push(h.path(courbe([[1, -18], [150, -18], [290, -18], [302, -23]].map(B)), A.detail));
          out.push(h.path(courbe([[1, -76], [90, -72], [180, -67], [245, -60], [270, -52]].map(B)), A.detail));
          out.push(h.path(courbe([[92, 0], [93, -18]].map(B)), A.fin));
          out.push(h.path(courbe([[19, -226], [95, -232], [168, -226]].map(B)), A.fin));
          // la languette et le lacet
          out.push(h.path(courbe([[160, -236], [156, -190], [161, -150], [175, -118], [194, -95]].map(B)), A.fin));
          const oe = [[150, -216], [149, -188], [152, -160], [161, -134], [174, -112]];
          oe.forEach((p, k) => {
            const c = B(p);
            out.push(h.cercle(c[0], c[1], 1.3, A.detail));
            const q = B([p[0] + 14 + k * 2, p[1] + 10]);
            out.push(h.ligne(c[0] + 1, c[1] + 0.5, q[0], q[1], A.detail));
          });
          // la jambe du pantalon, par-dessus le col
          const pg = [[22, -330], [16, -280], [10, -222]], pd = [[178, -218], [172, -280], [166, -330]];
          out.push(h.path(`M${f(B(pg[0]))}${cr(pg.map(B))} L${f(B(pd[0]))}${cr(pd.map(B))}`, blanc(A.arete)));
          out.push(h.path(courbe([[10, -222], [60, -210], [120, -209], [178, -218]].map(B)), A.arete));
          out.push(h.path(courbe([[60, -300], [70, -262], [66, -226]].map(B)), A.fin));
          out.push(h.path(courbe([[130, -310], [124, -270], [132, -224]].map(B)), A.fin));
          const pa = B([22, -330]), pb = B([166, -330]);
          out.push(h.path(brisure(pa[0], pb[0], pa[1]), A.detail));
          // la patte, coupée sous les ergots, le sabot sous la semelle, pointe vers l'avant
          out.push(patteProfil(P, { coupe: -85, ergot: false, graine: 17 }));
          // la ligature : des tours serrés au ras du sabot, puis en huit par-dessus le pied et derrière la cheville
          for (let k = 0; k < 3; k++) {
            const y = -82 + k * 5;
            out.push(h.formes.corde([P([-82, y - 1]), P([-40, y]), P([3, y - 1])], { ep: 2.4, debut: 'ouvert', fin: 'ouvert' }));
          }
          out.push(h.formes.corde([P([-6, -84]), B([158, -26]), B([184, -78]), B([198, -96])], { ep: 2.6, debut: 'ouvert', fin: 'ouvert' }));
          out.push(h.formes.corde([P([-72, -84]), B([42, -40]), B([12, -112]), B([6, -124])], { ep: 2.6, debut: 'ouvert', fin: 'ouvert' }));
          out.push(h.formes.corde([B([10, -132]), B([80, -150]), B([140, -146]), B([168, -148])], { ep: 2.6, debut: 'ouvert', fin: 'ouvert' }));
          // on avance dans le sens de la pointe
          const xa = B([310, 0])[0];
          out.push(h.fleche(`M${f([xa + 4, yG - 14])} L${f([xa + 48, yG - 14])}`, A.arete));
          return out.join('\n');
        },
        renvois: z => {
          const { P, B } = gBotte(z);
          return [
            { n: 8, rond: P([-160, -30]), cible: P([-40, -26]), texte: 'une patte sous chaque botte' },
            { n: 9, rond: B([262, -160]), cible: B([176, -64]), texte: 'ligature autour du pied et de la cheville' },
          ];
        },
      },
    },
  };
};
