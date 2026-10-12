// Planche 99-05 — Faucher à la faux, et aiguiser à la pierre.
// Chapitre 99, étapes 54 et 55. Aucune cote : le chapitre ne donne aucune mesure de fabrication
// (le manche est « à la taille du faucheur ») ; 75 cm et 175 cm sont dans la légende.
module.exports = (h) => {
  const F = h.formes;
  const f = v => (+v).toFixed(1);
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const RAD = Math.PI / 180;
  const BL = t => `fill="#FFFFFF" ${h.a[t].replace(/fill="none"\s*/, '')}`;   // forme blanche, trait t
  // courbe lisse qui passe par chaque point (Catmull-Rom)
  const lisse = (pts, debut = true) => {
    let d = debut ? `M${pt(pts[0])}` : '';
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[Math.max(i - 1, 0)], b = pts[i], c = pts[i + 1], e = pts[Math.min(i + 2, pts.length - 1)];
      d += ` C${pt([b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6])} ${pt([c[0] - (e[0] - b[0]) / 6, c[1] - (e[1] - b[1]) / 6])} ${pt(c)}`;
    }
    return d;
  };
  const echant = (pts, k = 12) => {
    const out = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[Math.max(i - 1, 0)], b = pts[i], c = pts[i + 1], d = pts[Math.min(i + 2, pts.length - 1)];
      const c1 = [b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6], c2 = [c[0] - (d[0] - b[0]) / 6, c[1] - (d[1] - b[1]) / 6];
      for (let j = i ? 1 : 0; j <= k; j++) {
        const t = j / k, m = 1 - t;
        out.push([0, 1].map(q => m * m * m * b[q] + 3 * m * m * t * c1[q] + 3 * m * t * t * c2[q] + t * t * t * c[q]));
      }
    }
    return out;
  };
  // une perche vue de côté : son contour, fermé, d'épaisseur w
  const bande = (pts, w) => {
    const s = echant(pts), g = [], d = [];
    s.forEach((p, i) => {
      const a = s[Math.max(i - 1, 0)], b = s[Math.min(i + 1, s.length - 1)];
      const t = [b[0] - a[0], b[1] - a[1]], l = Math.hypot(...t) || 1, n = [-t[1] / l * w / 2, t[0] / l * w / 2];
      g.push([p[0] + n[0], p[1] + n[1]]); d.push([p[0] - n[0], p[1] - n[1]]);
    });
    return 'M' + g.map(pt).join(' L') + ' L' + d.reverse().map(pt).join(' L') + ' Z';
  };
  // un ovale en chemin (une ellipse tournée, sans transform)
  const ovale = (cx, cy, rx, ry, ang) => {
    const c = Math.cos(ang * RAD), s = Math.sin(ang * RAD), q = [];
    for (let i = 0; i < 48; i++) { const t = i / 48 * 2 * Math.PI, x = rx * Math.cos(t), y = ry * Math.sin(t); q.push([cx + x * c - y * s, cy + x * s + y * c]); }
    return 'M' + q.map(pt).join(' L') + ' Z';
  };
  const alea = s => () => (s = (s * 16807) % 2147483647) / 2147483647;

  // ─── De profil : le faucheur réglé, en milieu de coup ───────────────────────────────
  // mm : x vers l'avant depuis les pieds, y vers le haut depuis le sol
  const geoP = z => {
    const e = Math.min((z.h - 10) / 1790, (z.l - 8) / 1250);
    const x0 = 6 + 170 * e, g = z.h - 4;
    const P = (x, y) => [x0 + x * e, g - y * e];
    // les deux poignées : des chevilles plantées dans le manche, chacune serrée dans un poing vu du
    // dos de la main. L'avant-bras file de l'épaule vers le poing : les bras tendus, la cheville en
    // travers du poing, qui sort du manche sous la main.
    const S = [190, 1395];                                          // l'épaule
    const nib = (cx, cy) => {
      const a = Math.atan2(S[1] - cy, cx - S[0]);                   // l'avant-bras, en radians, vers le bas
      const ax = [Math.sin(a), Math.cos(a)];                        // l'axe de la cheville (mm, vers le haut)
      return { c: P(cx, cy), ang: a / RAD, pied: P(cx - 105 * ax[0], cy - 105 * ax[1]), bout: P(cx + 62 * ax[0], cy + 62 * ax[1]) };
    };
    const gL = nib(425, 850), gP = nib(610, 900);
    const dh = [gL.pied[0] - gP.pied[0], gL.pied[1] - gP.pied[1]], nh = Math.hypot(...dh);
    const T = [gL.pied[0] + dh[0] / nh * 110 * e, gL.pied[1] + dh[1] / nh * 110 * e];   // bout du manche
    const K = P(820, 40);                                          // talon de la lame
    const snath = [T, gL.pied, gP.pied, P(740, 520), P(785, 250), K];
    const em = 1.3 * e, diam = 38 * e;
    const cheville = g => h.path(bande([g.pied, g.bout], diam), BL('arete'));
    const prise = g => ({ x: g.c[0], y: g.c[1], pose: 'prise', vue: 'dos', echelle: em, diametre: diam,
      angle: g.ang, objet: cheville(g) });
    const pers = F.personnage({ x: x0, y: g, pose: 'debout', echelle: e, penche: 24, regard: 20,
      prises: { proche: prise(gP), loin: prise(gL) } });
    return { e, P, pers, gL, gP, T, K, snath, g, x0, cheville };
  };
  // ─── Vu de dessus : le coup et l'andain ─────────────────────────────────────────────
  // mm : x vers la droite du faucheur, y vers l'avant ; les pieds en 0 0
  const geoD = z => {
    const e = Math.min((z.l - 6) / 2700, (z.h - 6) / 2120);
    const D = (x, y) => [z.l / 2 + (x + 110) * e, z.h / 2 - (y - 215) * e];
    const C = [-125, 100], xL = -1000, xR = 750, Ra = 930, Rs = 1010;
    const H = [400, 730], Tp = [-290, 900];                        // talon et pointe, en milieu de coup
    return { e, D, C, xL, xR, Ra, Rs, H, Tp, haut: 215 + (z.h / 2) / e, bas: 215 - (z.h / 2) / e,
      gauche: -110 - (z.l / 2) / e, droite: -110 + (z.l / 2) / e };
  };
  const lameDessus = (G) => {
    // ligne médiane bombée vers l'avant ; le dos devant, le fil du côté du faucheur
    const { H, Tp, C } = G;
    const n = 9, dos = [], fil = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const p = [H[0] + (Tp[0] - H[0]) * t, H[1] + (Tp[1] - H[1]) * t];
      const o = [p[0] - C[0], p[1] - C[1]], lo = Math.hypot(...o), on = [o[0] / lo, o[1] / lo];
      const b = 55 * Math.sin(Math.PI * t) - 25 * t * t;           // bombé, pointe qui revient
      const q = [p[0] + on[0] * b, p[1] + on[1] * b];
      const w = 62 * (1 - Math.pow(t, 2.2)) + 2;
      dos.push([q[0] + on[0] * w / 2, q[1] + on[1] * w / 2]); fil.push([q[0] - on[0] * w / 2, q[1] - on[1] * w / 2]);
    }
    return { dos, fil };
  };

  // ─── La pierre, debout : la lame vue de face, dessus vers soi ───────────────────────
  // mm : origine au bout du manche (où la lame s'attache), x vers la pointe, y vers le haut
  const geoA = z => {
    const e = Math.min((z.l - 10) / 870, (z.h - 8) / 418);
    const ox = 6 + 75 * e, oy = 4 + 140 * e;
    const A = (x, y) => [ox + x * e, oy - y * e];
    const dos = [[24, 70], [120, 84], [260, 92], [420, 90], [580, 76], [700, 50], [776, 12]];
    const fil = [[40, 10], [120, 20], [260, 30], [420, 34], [580, 30], [700, 20], [776, 12]];
    return { e, A, dos, fil, sol: -272 };
  };

  // ─── En coupe : la lame tranchée, le dos en haut, le fil en bas, deux temps ─────────
  const geoC = z => {
    const e = Math.min((z.l - 8) / 112, (z.h - 30) / 76);
    const C = (x, y) => [z.l / 2 + x * e, z.h / 2 + 6 - (y - 28) * e];
    return { e, C };
  };
  // la section de la lame, le fil en (x, 0) : mince, le dos replié vers le dessus (à gauche)
  const section = (C, x) => h.chemin([[0, 0], [0.9, 6], [0.9, 54], [0.3, 58.8], [-6.4, 62.6], [-7.6, 61], [-1.3, 56.6], [-0.9, 54], [-0.9, 6]]
    .map(([a, b]) => C(x + a, b)), h.a.plein, true);

  return {
    ref: '99-05',
    titre: 'Faucher à la faux, et aiguiser à la pierre',
    desc: 'De profil, le faucheur réglé sur sa faux : bras tendus, les deux mains à peu près à la même hauteur sur les poignées, la lame à plat sur le sol. Vu de dessus : les pieds, la lame en milieu de coup, le demi-cercle de droite à gauche vers l’herbe déjà fauchée, la marche en ligne droite et l’andain laissé derrière. Debout, le manche posé par terre et la pointe à droite : la main gauche tient la lame par le dos, derrière la pierre, qui descend du dos vers le fil à petits coups du talon vers la pointe. En coupe : la pierre sur le dessus, puis sur le dessous.',
    format: 'pleine',
    disposition: [['profil', 'dessus'], ['pierre', 'coupe']],
    hauteurs: [1.45, 1],
    largeurs: [[0.66, 1], [2.05, 1]],
    vues: {
      profil: {
        titre: 'Réglée sur soi',
        dessin: z => {
          const G = geoP(z), { e, P } = G, out = [];
          out.push(h.ligne(2, G.g, z.l - 2, G.g, h.a.arete));
          // la lame, couchée à plat sur le sol, la pointe vers l'autre côté du faucheur
          out.push(h.path(`M${pt(P(810, 36))} ${lisse([P(810, 36), P(900, 44), P(1000, 40), P(1066, 22)], false)} L${pt(P(1066, 16))} ${lisse([P(1066, 16), P(1000, 14), P(900, 16), P(810, 18)], false)} Z`, BL('arete')));
          // le manche ; les poignées sont peintes avec les mains
          out.push(h.path(bande(G.snath, 34 * e), BL('arete')));
          // l'anneau au talon
          out.push(h.path(`M${pt(P(780, 70))} L${pt(P(820, 92))} L${pt(P(850, 40))} L${pt(P(810, 20))} Z`, BL('detail')));
          out.push(String(G.pers));
          return out.join('\n');
        },
        renvois: z => {
          const G = geoP(z), { P } = G;
          return [
            { n: 1, rond: [z.l - 14, P(0, 700)[1]], cible: P(735, 420), texte: 'le manche, une perche de bois dur' },
            { n: 2, rond: [z.l - 14, P(0, 1080)[1]], cible: G.gP.c, texte: 'bras tendus, mains presque à même hauteur' },
            { n: 3, rond: [z.l - 14, P(0, 230)[1]], cible: P(960, 30), texte: 'la lame à plat, parallèle au sol' },
          ];
        },
      },

      dessus: {
        titre: 'Le coup, vu de dessus',
        dessin: z => {
          const G = geoD(z), { e, D, C, xL, xR, Ra, Rs } = G, out = [];
          const bas = G.bas, haut = G.haut;
          const poly = pts => pts.map(p => D(...p));
          // le passage d'avant, déjà fauché ; l'andain de ce passage-ci, derrière le faucheur
          out.push(h.chemin(poly([[G.gauche, bas], [xL, bas], [xL, haut], [G.gauche, haut]]), h.a.hachure('paille', 'aucun'), true));
          out.push(h.chemin(poly([[xL, bas], [xR, bas], [xR, -210], [xL, -210]]), h.a.hachure('paille', 'aucun'), true));
          out.push(h.ligne(...D(xL, bas), ...D(xL, haut), h.a.detail));
          out.push(h.ligne(...D(xR, bas), ...D(xR, 640), h.a.detail));
          // l'herbe debout : à droite du passage, et devant le coup
          const r = alea(7), pas = 92, tf = [];
          for (let y = bas + 40; y < haut; y += pas) for (let x = xL + 30; x < G.droite; x += pas) {
            const px = x + (r() - 0.5) * 50, py = y + (r() - 0.5) * 50;
            if (px < xL + 25) continue;
            const dC = Math.hypot(px - C[0], py - C[1]);
            const debout = px > xR + 30 || (py > C[1] + 40 && dC > Rs);
            if (!debout) continue;
            if (Math.abs(dC - Ra) < 75 && py > C[1] - 20) continue;       // le passage de la flèche
            const [vx, vy] = D(px, py), s = 2.6;
            tf.push([0, 60, 120].map(a => `M${f(vx - s * Math.cos(a * RAD))} ${f(vy - s * Math.sin(a * RAD))} L${f(vx + s * Math.cos(a * RAD))} ${f(vy + s * Math.sin(a * RAD))}`).join(' '));
          }
          out.push(h.path(tf.join(' '), h.a.fin));
          // les pieds, en empreintes
          const pied = (cx, cy, ang, gauche) => {
            const k = gauche ? -1 : 1;
            const loc = [[0, 0], [30 * k, 12], [36 * k, 60], [30 * k, 118], [42 * k, 178], [50 * k, 232], [38 * k, 268], [8 * k, 282], [-22 * k, 272], [-44 * k, 236], [-44 * k, 176], [-30 * k, 118], [-32 * k, 58], [-30 * k, 12], [0, 0]];
            const pts = loc.map(([a, b]) => { const c = Math.cos(ang * RAD), s = Math.sin(ang * RAD); return D(cx + a * c + b * s, cy - a * s + b * c); });
            return h.path(lisse(pts) + ' Z', BL('arete'));
          };
          out.push(pied(-175, -20, 8, true), pied(165, -80, -8, false));
          // la marche, en ligne droite
          out.push(h.fleche(`M${pt(D(520, -250))} L${pt(D(520, 330))}`, h.a.arete));
          // le manche vu d'en haut, ses deux poignées, la lame
          const T0 = [-70, 300], H = G.H;
          const sn = t => D(T0[0] + (H[0] - T0[0]) * t, T0[1] + (H[1] - T0[1]) * t);
          out.push(h.path(bande([sn(0), sn(1)], 34 * e), BL('arete')));
          [0.06, 0.27].forEach(t => out.push(h.cercle(...sn(t), 20 * e, BL('arete'))));
          const L = lameDessus(G);
          const contour = lisse(L.dos.map(p => D(...p))) + ' L' + pt(D(...L.fil[L.fil.length - 1])) + lisse(L.fil.slice().reverse().map(p => D(...p)), false) + ' Z';
          out.push(h.path(contour, BL('contour')));
          out.push(h.path(lisse(L.dos.slice(0, 8).map(([x, y]) => { const o = [x - C[0], y - C[1]], lo = Math.hypot(...o); return D(x - o[0] / lo * 12, y - o[1] / lo * 12); })), h.a.fin));
          // le coup : un demi-cercle, de droite à gauche
          const a0 = 14 * RAD, a1 = 166 * RAD;
          const p0 = D(C[0] + Ra * Math.cos(a0), C[1] + Ra * Math.sin(a0)), p1 = D(C[0] + Ra * Math.cos(a1), C[1] + Ra * Math.sin(a1));
          out.push(h.fleche(`M${pt(p0)} A${f(Ra * e)} ${f(Ra * e)} 0 0 0 ${pt(p1)}`, h.a.arete));
          // au bout du coup, l'herbe coupée tombe en rang contre l'herbe déjà fauchée
          const q0 = D(C[0] + (Ra - 60) * Math.cos(160 * RAD), C[1] + (Ra - 60) * Math.sin(160 * RAD));
          const q1 = D(xL + 60, C[1] - 260);
          out.push(h.fleche(`M${pt(q0)} Q${pt(D(xL + 150, C[1] - 40))} ${pt(q1)}`, h.a.detail));
          return out.join('\n');
        },
        renvois: z => {
          const G = geoD(z), { D, C, Ra } = G;
          const arc = a => D(C[0] + Ra * Math.cos(a * RAD), C[1] + Ra * Math.sin(a * RAD));
          return [
            { n: 4, rond: [z.l - 14, 14], cible: arc(40), texte: 'un demi-cercle, vers l’herbe déjà fauchée' },
            { n: 5, rond: [z.l - 14, D(0, 60)[1]], cible: D(520, 120), texte: 'on avance en ligne droite' },
            { n: 6, rond: [z.l - 14, z.h - 14], cible: D(300, -560), texte: 'andain d’environ 175 cm, lame de 75 cm' },
          ];
        },
      },

      pierre: {
        titre: 'La pierre, debout',
        dessin: z => {
          const G = geoA(z), { e, A } = G, out = [];
          // le sol et le bout du manche posé dessus ; le manche coupé d'un arrachement
          out.push(h.ligne(...A(-70, G.sol), ...A(90, G.sol), h.a.arete));
          const zz = y => [[-18, y], [-8, y + 7], [2, y - 5], [12, y + 6], [18, y]];
          out.push(h.chemin([[-18, -2], [-18, -196], ...zz(-196).slice(1), [18, -2]].map(p => A(...p)), BL('arete'), true));
          out.push(h.chemin([...zz(-226), [18, G.sol], [-18, G.sol]].map(p => A(...p)), BL('arete'), true));
          out.push(h.ligne(...A(-6, -60), ...A(-7, -180), h.a.fin), h.ligne(...A(7, -30), ...A(8, -160), h.a.fin));
          // la lame : dos en haut, fil en bas, pointe à droite ; le talon descend dans l'anneau
          const bord = lisse(G.dos.map(p => A(...p)).reverse()) + ` L${pt(A(12, 52))} L${pt(A(4, -20))} L${pt(A(17, -20))} L${pt(A(24, 2))} L${pt(A(40, 10))}` + lisse(G.fil.map(p => A(...p)), false) + ' Z';
          out.push(h.path(bord, BL('contour')));
          // la côte du dos, le biseau du fil
          out.push(h.path(lisse([[40, 61], [120, 75], [260, 83], [420, 81], [580, 67], [640, 58]].map(p => A(...p))), h.a.detail));
          out.push(h.path(lisse([[46, 15], [120, 25], [260, 35], [420, 39], [580, 35], [700, 25], [760, 16]].map(p => A(...p))), h.a.fin));
          // l'anneau qui serre le talon sur le manche
          out.push(h.rect(...A(-21, -16), 42 * e, 38 * e, BL('arete')));
          // la pierre : en haut du coup (pleine), en bas (tiretée), et le geste
          const pierre = (cx, cy, ang, at) => {
            const P = [[-100, 0], [-60, -19], [60, -19], [100, 0], [60, 19], [-60, 19]];
            const c = Math.cos(ang * RAD), s = Math.sin(ang * RAD);
            const q = P.map(([a, b]) => A(cx + a * c - b * s, cy + a * s + b * c));
            return h.path(`M${pt(q[0])} C${pt(q[1])} ${pt(q[2])} ${pt(q[3])} C${pt(q[4])} ${pt(q[5])} ${pt(q[0])} Z`, at);
          };
          out.push(pierre(440, 30, -4, h.a.cache));
          out.push(pierre(440, 78, -4, h.a.hachure('pierre', 'arete')));
          out.push(h.fleche(`M${pt(A(556, 92))} L${pt(A(560, 18))}`, h.a.arete));
          // la main et la pierre avancent ensemble, du talon vers la pointe
          out.push(h.fleche(`M${pt(A(330, 128))} L${pt(A(640, 104))}`, h.a.arete));
          // la main gauche, par le dos, juste derrière la pierre
          out.push(String(F.main({ x: A(240, 74)[0], y: A(240, 74)[1], pose: 'prise', vue: 'dos', cote: 'gauche', angle: 125, echelle: 1.15 * e, diametre: 26 * e, bras: 150 })));
          return out.join('\n');
        },
        renvois: z => {
          const G = geoA(z), { A } = G;
          return [
            { n: 7, rond: A(-52, -150), cible: A(-4, G.sol + 16), texte: 'le bout du manche posé par terre' },
            { n: 8, rond: A(330, -120), cible: A(262, 40), texte: 'main gauche au dos, juste derrière la pierre' },
            { n: 9, rond: A(610, -40), cible: A(520, 50), texte: 'pierre mouillée, du dos au fil, en travers' },
            { n: 10, rond: A(745, 118), cible: A(650, 104), texte: 'petits coups, du talon vers la pointe' },
          ];
        },
      },

      coupe: {
        titre: 'En coupe, en deux temps',
        dessin: z => {
          const G = geoC(z), { e, C } = G, out = [];
          const temps = (x, k) => {   // k = -1 : la pierre sur le dessus (à gauche) ; +1 : sur le dessous
            const [cx, cy] = C(x + k * 9.8, 13);
            out.push(h.path(ovale(cx, cy, 9 * e, 17 * e, k * 7.6), h.a.hachure('pierre', 'arete')));
            out.push(section(C, x));
            out.push(h.fleche(`M${pt(C(x + k * 23, 36))} L${pt(C(x + k * 23, -4))}`, h.a.arete));
          };
          temps(-24, -1);
          temps(30, 1);
          return out.join('\n');
        },
        renvois: z => {
          const G = geoC(z), { C } = G;
          return [
            { n: 11, rond: C(-44, 60), cible: C(-34, 20), texte: 'le dessus d’abord' },
            { n: 12, rond: C(50, 60), cible: C(40, 20), texte: 'puis le dessous' },
          ];
        },
      },
    },
    danger: 'Danger — la pierre qui dérape hors du fil emmène les doigts qui la tiennent sur une lame qu’on vient de rendre tranchante. Aucune de ces prises n’empêche la coupure.',
  };
};
