// Planche 29-05 — Ventiler un nouveau-né.
// Chapitre 29, section F, étapes 48 à 51 : le coucher sur le dos sur la surface ferme et chaude
// (table, planche, plancher couvert d'un linge chaud), la poitrine découverte, le reste couvert ;
// le linge roulé sous les épaules, la tête droite, le nez vers le plafond — pas renversée loin
// en arrière, ce qui referme la gorge ; la bouche de l'aide couvre la bouche et le nez du bébé ;
// on ne souffle que l'air des joues gonflées, jamais celui de la poitrine (trop d'air déchire
// les poumons) ; la poitrine se soulève à chaque bouffée.
// Rien ne se construit : aucune cote. Le chapitre ne donne pas l'épaisseur du rouleau.
// Passe qualité (lot 07) : la tête de l'aide de profil, dessinée à la main, ne se lisait pas ; le
// geste était passé au visage du bébé vu d'en haut. Le 14 octobre, JP l'a remis de profil, avec la
// tête de la bibliothèque (plus bas). La poitrine qui monte se montre à côté, de profil. Le bras (un
// boudin qui se confondait avec le rouleau) est retiré : il est sous la couverture. Le visage de
// profil a un nez court et rond, les lèvres fermées, un menton et un œil fermé. Le renvoi
// « l'air des joues, rien de plus » n'a plus de cible sans la tête de l'aide : l'encadré danger
// le dit en entier. Le renvoi 5 aboutit sur le devant du cou étiré.
// Têtes simples (14 octobre) : la tête du bébé est la tête simple de la bibliothèque (tetes/moteur.js,
// âge « bebe », les yeux fermés, sans oreille), son cou raccordé aux épaules du corps dessiné ici ; le
// raté la renverse sur le cou (penche) sans casser la nuque. La tête de l'aide est la tête simple de
// l'adulte, de profil : ses lèvres se posent l'une sur l'arête du nez du bébé, l'autre sous sa lèvre, et
// se serrent ; la tête relevée sur un cou qui monte vers les épaules (l'aide penché au-dessus), pour que
// sa gorge ne se confonde pas avec la poitrine du bébé. Le corps du bébé est dessiné à la main, en mm :
// poitrine de 95 d'épaisseur.
//
// La charte : le bébé est un corps dessiné à la main, sans gris. Le linge roulé,
// ce qu'on ajoute, pèse (contour fort). Pas de gris sur la planche, qui est en coupe. Le rouge :
// sur le raté, le cercle sur la gorge qui se referme ; en soufflant, le cercle sur la poitrine qui
// doit se soulever. La flèche de la poitrine reste noire : c'est le corps qui bouge, pas un geste.
module.exports = (h) => {
  const A = h.a;
  const f = v => (Math.round(v * 10) / 10).toString();
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const RAD = Math.PI / 180;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mil = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const miroir = pts => pts.map(p => [-p[0], p[1]]);

  // courbe lisse (Catmull-Rom) par des points déjà dans la vue ; suite : sans le M de départ
  const lisse = (P, ferme = false, suite = false) => {
    const n = P.length, g = i => ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))];
    let d = suite ? '' : `M${pt(P[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${pt(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  // la même courbe, échantillonnée en polyligne
  const echant = (P, pas = 12) => {
    const n = P.length, g = i => P[Math.max(0, Math.min(n - 1, i))], out = [P[0]];
    for (let i = 0; i < n - 1; i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      for (let j = 1; j <= pas; j++) {
        const t = j / pas, u = 1 - t;
        out.push([0, 1].map(q => u * u * u * p1[q] + 3 * u * u * t * c1[q] + 3 * u * t * t * c2[q] + t * t * t * p2[q]));
      }
    }
    return out;
  };
  // une ellipse fermée, en chemin SVG, déjà dans la vue
  const ellipseD = (c, rx, ry) => `M${pt([c[0] + rx, c[1]])} A${f(rx)} ${f(ry)} 0 1 0 ${pt([c[0] - rx, c[1]])} A${f(rx)} ${f(ry)} 0 1 0 ${pt([c[0] + rx, c[1]])} Z`;

  // ─── Le corps couché, en mm, repère : la surface (le dessus du linge) en y = 0, x vers les pieds.
  const ROULEAU = { c: [72, -13], r: 13 };
  const DOS = [[62, -25], [74, -26.5], [95, -25], [130, -19], [180, -8]];
  const FACE = [[66, -88], [76, -93], [95, -102], [120, -109], [150, -112], [180, -110]];
  // la poitrine soulevée (tireté) : FACE levée de LEVE en son milieu
  const LEVE = 7;
  const leve = p => [p[0], p[1] - LEVE * Math.sin(Math.PI * (p[0] - 66) / 96)];

  // La tête du bébé : la tête simple de la bibliothèque, âge « bebe », les yeux fermés, sans oreille (couchée
  // sur le côté du crâne, elle se lisait comme un sourire). Le cou est posé sur les épaules : la coupe du cou
  // est le haut du corps ; la tête et le cou pivotent ensemble jusqu'à ce que l'occiput repose sur la surface.
  const XQ = 24, R_BON = -90;
  // la tête simple, son cou raccordé aux épaules (raccord : le haut de la poitrine et le haut du dos) ; la
  // nuque (le pivot de la tête) monte ou descend jusqu'à ce que l'occiput repose sur la surface
  const teteBebe = (V, k, regard, extra = {}) => {
    const o0 = V([0, 0]), mm = p => [(p[0] - o0[0]) / k, (p[1] - o0[1]) / k];
    const fait = qy => h.formes.teteSimple(Object.assign({ age: 'bebe', yeux: 'fermes', oreille: false, ancre: 'nuque',
      x: V([XQ, qy])[0], y: V([XQ, qy])[1], echelle: k, angle: regard, raccord: [V(FACE[0]), V(DOS[0])] }, extra));
    let y0 = -120, y1 = 0;
    for (let i = 0; i < 30; i++) { const ym = (y0 + y1) / 2; if (mm([0, fait(ym).boite.y1])[1] > 0) y1 = ym; else y0 = ym; }
    return { t: fait((y0 + y1) / 2), mm };
  };
  function bebe(V, k, regard, { xFin = 380, coupe = false, poitrine = false } = {}) {
    const P = pts => pts.map(V);
    const out = [];
    const { t } = teteBebe(V, k, regard);
    const dos = DOS, face = FACE;
    out.push(h.path(lisse(P(dos)) + ' L' + P(face.slice().reverse()).map(pt).join(' L') + ' Z', A.blanc));
    out.push(h.path(lisse(P(dos)), A.arete));
    if (poitrine) {
      const lev = FACE.filter(p => p[0] >= 76 && p[0] <= 150).map(leve);
      out.push(h.path(lisse(P([[68, -89], ...lev, [158, -113]])), A.cache));
    }
    out.push(String(t));
    out.push(h.path(lisse(P(face)), A.arete));
    {
      const { c, r } = ROULEAU;
      const sp = [];
      for (let tt = 0; tt <= 2.4 * 360; tt += 15) {
        const rr = 2.2 + (r - 3.4 - 2.2) * tt / (2.4 * 360);
        sp.push(V(add(c, [rr * Math.cos(tt * RAD), rr * Math.sin(tt * RAD)])));
      }
      out.push(h.cercle(...V(c), r * k, blanc(A.contour)));
      out.push(h.path(lisse(sp), A.detail));
    }
    {
      const haut = [[157, -118], [172, -115], [205, -112], [240, -102], [262, -90], [282, -88], [302, -98], [322, -96],
        [343, -72], [362, -44], [376, -18], [384, 0]];
      const bord = [[150, 0], [152, -40], [154, -84], [157, -118]];
      let dessusC = haut;
      if (coupe) dessusC = [...haut.filter(p => p[0] < xFin - 6), [xFin, -108]];
      const basC = coupe ? ` L${pt(V([xFin, 0]))} L${pt(V([150, 0]))}` : ` L${pt(V([150, 0]))}`;
      out.push(h.path(lisse(P(dessusC)) + basC + lisse(P(bord), false, true) + ' Z', A.blanc));
      out.push(h.path(lisse(P(bord)), A.arete));
      out.push(h.path(lisse(P(dessusC)), A.arete));
      out.push(h.path(lisse(P([[167, -115], [165, -80], [162, -40], [161, -2]])), A.detail));
      const plis = [[[228, -103], [236, -60], [232, -4]], [[292, -92], [286, -50], [290, -3]], [[340, -70], [336, -34], [340, -3]], [[196, -110], [202, -70]]];
      for (const pl of plis) if (!coupe || pl.every(p => p[0] < xFin - 4)) out.push(h.path(lisse(P(pl)), A.fin));
    }
    return { svg: out.join('\n'), t };
  }

  // la planche et le linge chaud dessus ; xG : bout gauche ; xD : bout droit (ou brisure)
  function surface(V, k, xG, xD, coupe) {
    const out = [];
    const ep = 26, li = 5;
    const P = pts => pts.map(V);
    if (coupe) {
      const br = brisure(V, xD, li, li + ep);
      out.push(h.path(`M${pt(V([xG, li]))} L${pt(V([xD, li]))}` + br.d + ` L${pt(V([xG, li + ep]))} Z`, A.hachure('bois')));
    } else {
      const p = V([xG, li]);
      out.push(h.rect(p[0], p[1], (xD - xG) * k, ep * k, A.hachure('bois')));
    }
    // le linge : une bande mince qui retombe par-dessus les bouts de la planche
    const retombe = [[xG + 3, 0], [xG - 2, 3], [xG - 4.5, 12], [xG - 4, 26], [xG - 6, 36]];
    const dedans = [[xG - 1, 35], [xG - 0.5, 22], [xG, 8], [xG + 3, li]];
    out.push(h.path(`M${pt(V([xD, 0]))} L${pt(V(retombe[0]))}` + lisse(P(retombe), false, true)
      + ` L${pt(V(dedans[0]))}` + lisse(P(dedans), false, true) + ` L${pt(V([xD, li]))} Z`, blanc(A.detail)));
    if (!coupe) {
      const r2 = [[xD - 3, 0], [xD + 2, 3], [xD + 4.5, 12], [xD + 4, 26], [xD + 6, 36]];
      const d2 = [[xD + 1, 35], [xD + 0.5, 22], [xD, 8], [xD - 3, li]];
      out.push(h.path(lisse(P(r2)) + ` L${pt(V(d2[0]))}` + lisse(P(d2), false, true) + ' Z', blanc(A.detail)));
    }
    return out.join('\n');
  }
  // une brisure : le trait ondulé qui dit « le dessin continue »
  function brisure(V, x, y0, y1) {
    const pts = [], n = 8;
    for (let i = 0; i <= n; i++) pts.push(V([x + (i > 0 && i < n ? (i % 2 ? 2.5 : -2.5) : 0), y0 + (y1 - y0) * i / n]));
    return { d: lisse(pts, false, true), pts };
  }

  // cadrage : met les mm (x0..x1, y0..y1) dans la vue
  const cadre = (z, x0, x1, y0, y1, marge = 8) => {
    const k = Math.min((z.l - 2 * marge) / (x1 - x0), (z.h - 2 * marge) / (y1 - y0));
    const ox = (z.l - k * (x1 - x0)) / 2 - k * x0, oy = (z.h - k * (y1 - y0)) / 2 - k * y0;
    return { k, V: p => [ox + k * p[0], oy + k * p[1]] };
  };

  // ─── Les vignettes de profil : le bébé coupé par une brisure un peu après le bord de la couverture.
  const vignette = (z, a, cad, xc, opts = {}) => {
    const { k, V } = cadre(z, ...cad);
    const b = bebe(V, k, a, { xFin: xc, coupe: true, ...opts });
    const br = brisure(V, xc, -110, 31);
    return { k, V, t: b.t, svg: [surface(V, k, -100, xc, true), b.svg, h.path(`M${pt(br.pts[0])}` + br.d, A.detail)].join('\n') };
  };

  // les deux du haut, cadrées pareil : bon à gauche, raté à droite
  const XC = 196, CADRE = [-118, XC + 4, -150, 34];
  const posC = (z, p) => cadre(z, ...CADRE).V(p);
  const A_RATE = -132;
  const gorgeRate = v => { const c = v.t.cou[0], m = v.t.menton; return [c[0] * 0.55 + m[0] * 0.45, c[1] * 0.55 + m[1] * 0.45]; };

  // ─── Souffler, de profil : la même pose que « la tête droite », la poitrine soulevée en tireté.
  const XP = 200, CADRE_P = [-118, XP + 4, -162, 34];
  const X_FL = 100;                                   // la flèche, au-dessus du haut de la poitrine
  const surFace = x => {                              // la hauteur de la poitrine soulevée en x
    const e = echant([[68, -89], ...FACE.filter(p => p[0] >= 76 && p[0] <= 150).map(leve), [158, -113]], 24);
    let best = e[0];
    for (const q of e) if (Math.abs(q[0] - x) < Math.abs(best[0] - x)) best = q;
    return best;
  };
  const souffler = z => {
    const v = vignette(z, R_BON, CADRE_P, XP, { poitrine: true });
    const y0 = surFace(X_FL)[1];
    const fl = [v.V([X_FL, y0 - 6]), v.V([X_FL, y0 - 30])];
    const pc = v.V([120, leve([120, -109])[1] + 2]);   // ce qu'on regarde à chaque bouffée
    return [v.svg, h.fleche(`M${pt(fl[0])} L${pt(fl[1])}`, A.arete), h.controle(pc[0], pc[1], 15)].join('\n');
  };

  // ─── Souffler, bouche sur bouche et nez, de profil (JP, 14 octobre : « passe-les de profil »).
  // Le bébé de « la tête droite », en gros plan, coupé après les épaules ; au-dessus, la tête de
  // l'aide (la tête simple de l'adulte), le visage vers le bas, le front vers la tête du bébé : ses
  // lèvres, serrées, couvrent ensemble le nez et la bouche du bébé. La tête de l'aide est peinte après
  // le bébé : son blanc cache le nez et la bouche qu'elle couvre. Le cadre coupe le haut de son crâne :
  // les deux visages en grand. Sa tête est relevée de 35° sur un cou qui monte vers ses épaules (penché
  // au-dessus du bébé, le visage vers le sol) : la gorge de l'aide s'écarte de la poitrine du bébé.
  const XS = 100, CADRE_D = [-125, XS + 2, -300, 34];
  const OPT = { cote: 'gauche', penche: -35, cou: 150 };
  const CACHE_AIDE = new Map();
  const aide = (v) => { const cle = v.k.toFixed(4) + v.V([0, 0]).join(); if (!CACHE_AIDE.has(cle)) CACHE_AIDE.set(cle, aide0(v)); return CACHE_AIDE.get(cle); };
  const aide0 = (v) => {
    const t = v.t, u = [t.nez[0] - t.oeil[0], t.nez[1] - t.oeil[1]];
    const pontNez = [t.oeil[0] + u[0] * 0.55, t.oeil[1] + u[1] * 0.55];
    const sousLevre = [t.bouche[0] * 0.35 + t.menton[0] * 0.65, t.bouche[1] * 0.35 + t.menton[1] * 0.65];
    const cote = OPT.cote;
    // la lèvre du haut de l'aide va du côté de son front : vers la tête du bébé (gauche) ou vers sa poitrine (droite)
    const [H, B] = cote === 'gauche' ? [pontNez, sousLevre] : [sousLevre, pontNez];
    const ep = Math.hypot(B[0] - H[0], B[1] - H[1]) / v.k;
    const dir = Math.atan2(B[1] - H[1], B[0] - H[0]) * 180 / Math.PI;
    const base = { x: 0, y: 0, echelle: v.k, cote, ancre: 'nuque', bouche: 'serre', epaisseur: ep, penche: OPT.penche, cou: OPT.cou };
    // l'angle qui met les deux lèvres dans l'axe arête du nez → sous la lèvre, le visage vers le bas
    const fait = (ang, x = 0, y = 0) => h.formes.teteSimple(Object.assign({}, base, { angle: ang, x, y }));
    let best = 0, err = 1e9;
    const ecart = a => { const g = fait(a), d = Math.atan2(g.levres.bas[1] - g.levres.haut[1], g.levres.bas[0] - g.levres.haut[0]) * 180 / Math.PI;
      return Math.abs(((d - dir) % 360 + 540) % 360 - 180) + (Math.sin(g.regard * RAD) < 0.2 ? 1000 : 0); };
    for (let a = -180; a < 180; a += 5) { const e = ecart(a); if (e < err) { err = e; best = a; } }
    for (let a = best - 5; a <= best + 5; a += 0.25) { const e = ecart(a); if (e < err) { err = e; best = a; } }
    const g0 = fait(best);
    const m0 = [(g0.levres.haut[0] + g0.levres.bas[0]) / 2, (g0.levres.haut[1] + g0.levres.bas[1]) / 2];
    const mc = [(H[0] + B[0]) / 2, (H[1] + B[1]) / 2];
    const t2 = fait(best, mc[0] - m0[0], mc[1] - m0[1]);
    return { t: t2, contact: pontNez, angle: best };
  };
  const dessus = z => {
    const v = vignette(z, R_BON, CADRE_D, XS);
    const a = aide(v);
    return `<clipPath id="vue-2905-souffler"><rect x="0" y="0" width="${f(z.l)}" height="${f(z.h)}" fill="#FFFFFF"/></clipPath>\n` +
      `<g clip-path="url(#vue-2905-souffler)">\n${v.svg}\n${a.t}\n</g>`;
  };
  const posD = (z, p) => cadre(z, ...CADRE_D).V(p);

  return {
    ref: '29-05',
    titre: 'Ventiler un nouveau-né',
    desc: 'Quatre vues d’un nouveau-né couché sur le dos sur une planche couverte d’un linge chaud, le ventre et les jambes sous une couverture, la poitrine découverte. En haut à gauche, de profil, le bon placement : une serviette roulée, vue par le bout, sous les épaules ; la tête posée droite, le nez vers le plafond. En haut à droite, le même bébé, la tête renversée loin en arrière, le menton pointé vers le haut et le devant du cou étiré : le raté, qui referme la gorge. En bas à gauche, de profil et de plus près, la tête de l’aide penchée sur le bébé : ses lèvres couvrent ensemble le nez et la bouche du bébé. En bas à droite, le bébé de profil, la tête droite : un tireté et une flèche montrent la poitrine qui se soulève à chaque bouffée. Encadré danger : jamais l’air de la poitrine.',
    format: 'pleine',
    disposition: [['bon', 'rate'], ['dessus', 'souffler']],
    hauteurs: [37, 63],
    largeurs: [[1, 1], [5, 7]],
    vues: {
      bon: {
        titre: 'La tête droite',
        dessin: z => vignette(z, R_BON, CADRE, XC).svg,
        renvois: z => [
          { n: 1, rond: [z.l - 14, z.h - 12], cible: posC(z, [170, 22]), texte: 'surface ferme, linge chaud' },
          { n: 2, rond: posC(z, [30, 30]), cible: posC(z, [70, -8]), texte: 'linge roulé sous les épaules' },
          { n: 3, rond: posC(z, [-40, -148]), cible: vignette(z, R_BON, CADRE, XC).t.nez, texte: 'le nez vers le plafond' },
          { n: 4, rond: posC(z, [150, -146]), cible: posC(z, [118, -108]), texte: 'poitrine nue, le reste couvert' },
        ],
      },
      rate: {
        titre: 'Raté : la tête renversée',
        dessin: z => {
          const v = vignette(z, A_RATE, CADRE, XC);
          const g = gorgeRate(v);
          return v.svg + '\n' + h.controle(g[0], g[1] + 2, 16);
        },
        renvois: z => [
          { n: 5, rond: posC(z, [120, -146]), cible: gorgeRate(vignette(z, A_RATE, CADRE, XC)), texte: 'la gorge se referme' },
        ],
      },
      dessus: {
        titre: 'Bouche sur bouche et nez',
        dessin: dessus,
        renvois: z => [
          // la pastille dans le blanc entre le front de l'aide et le crâne du bébé ; la cible, là où
          // la lèvre du haut de l'aide se pose sur le nez du bébé
          { n: 6, rond: (() => { const c = aide(vignette(z, R_BON, CADRE_D, XS)).contact; return [Math.max(14, c[0] - 60), c[1] - 8]; })(), cible: aide(vignette(z, R_BON, CADRE_D, XS)).contact, texte: 'bouche sur bouche et nez' },
        ],
      },
      souffler: {
        titre: 'Souffler, de profil',
        dessin: souffler,
        renvois: z => {
          const { V } = cadre(z, ...CADRE_P);
          return [
            { n: 7, rond: V([170, -150]), cible: V([120, leve([120, -109])[1]]), texte: 'la poitrine se soulève' },
          ];
        },
      },
    },
    danger: 'Danger — jamais l’air de la poitrine : on ne souffle que ce que les joues gonflées contiennent. Trop d’air déchire les poumons d’un nouveau-né.',
  };
};
