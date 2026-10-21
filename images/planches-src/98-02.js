// Planche 98-02 — Couper la semence de pomme de terre.
// Chapitre 98, étape 8 et variante d'urgence (« La semence de pomme de terre quand il n'y en a pas »).
// Tout vient du chapitre : morceaux de 40 à 60 g avec au moins deux yeux ; le tubercule fendu de la
// tête à la queue, pour que chaque morceau reçoive des yeux vigoureux de la tête (ceux de la queue
// donnent des tiges plus faibles) ; la lame lavée à l'eau savonneuse entre deux tubercules ; 7 à 10
// jours au frais pour que la coupe se referme. Sans semence : chaque œil levé à la pointe du couteau,
// avec une rondelle de chair sous l'œil ; on plante les rondelles, le reste va au chaudron s'il n'est
// ni vert ni amer.
// Aucune cote : le chapitre ne donne aucune longueur pour ce geste (le tubercule n'est pas une
// construction). Pas de main : la pomme de terre posée sur la planche, le couteau et la flèche.
//
// Repères : tout se dessine en mm dans le repère de la pomme de terre (centre en 0 0, la tête à
// droite, y vers le bas), puis passe par P vers la vue.
//
// La première vue est prise d'au-dessus, à 40° : la ligne de coupe (trait mixte) court sur le dessus
// de la tête à la queue, et le couteau, tenu au-dessus dans ce même plan, descend sur elle.
module.exports = (h) => {
  const A = h.a;
  const NOIR = '#1A1A1A';
  const f1 = v => Math.round(v * 10) / 10;
  const blancT = ep => `fill="#FFFFFF" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round"`;
  const fond = 'fill="#FFFFFF" stroke="none"';
  const poly = (pts, ferme) => pts.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])} ${f1(p[1])}`).join(' ') + (ferme ? ' Z' : '');
  const repere = (ox, oy, k) => ([x, y]) => [ox + x * k, oy + y * k];
  const quad = (a, c, b, n = 14) => {
    const out = [];
    for (let i = 1; i <= n; i++) { const t = i / n, u = 1 - t; out.push([u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]]); }
    return out;
  };
  const dedans = ([x, y], pg) => {
    let d = false;
    for (let i = 0, j = pg.length - 1; i < pg.length; j = i++) {
      const [xi, yi] = pg[i], [xj, yj] = pg[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) d = !d;
    }
    return d;
  };
  const densifie = (pts, pas = 1.5) => {
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 1) % pts.length];
      const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / pas));
      for (let j = 0; j < n; j++) out.push([a[0] + ((b[0] - a[0]) * j) / n, a[1] + ((b[1] - a[1]) * j) / n]);
    }
    return out;
  };
  // la part d'un contour fermé qui passe derrière une forme : au tireté (arête cachée)
  const cache = (pts, forme) => {
    const d = densifie(pts), dans = d.map(p => dedans(p, forme));
    const i0 = dans.indexOf(false);
    if (i0 < 0) return h.path(poly(d, true), A.cache);
    const out = []; let cur = [];
    for (let j = 0; j <= d.length; j++) {
      const i = (i0 + j) % d.length;
      if (dans[i]) cur.push(d[i]); else { if (cur.length > 1) out.push(cur); cur = []; }
    }
    return out.map(c => h.path(poly(c), A.cache)).join('\n');
  };
  // La charte : la pomme de terre est un volume ; son flanc d'en bas à droite est à l'ombre. Le blanc,
  // puis, découpés par la silhouette, le gris et une copie blanche décalée vers le haut à gauche :
  // il reste un croissant ; le trait passe par-dessus.
  let nOm = 0;
  // masque : la forme décalée (par défaut la silhouette elle-même ; sans le creux d'un œil levé, pour
  // que le croissant ne s'accroche pas au creux)
  const ombreRonde = (pts, dx, dy, ep, masque = pts) => {
    const d = poly(pts, true), dm = poly(masque, true), id = `om-9802-${nOm++}`;
    return [h.path(d, fond), `<clipPath id="${id}"><path d="${d}" fill="none"/></clipPath>`,
      `<g clip-path="url(#${id})">${h.path(d, A.ombre)}<path d="${dm}" transform="translate(${-dx} ${-dy})" ${fond}/></g>`,
      h.path(d, `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round"`)].join('\n');
  };
  const bosse = t => 1 + 0.03 * Math.sin(3 * t + 0.4) + 0.015 * Math.cos(4 * t + 0.3);

  // ── la pomme de terre de côté : 100 de long, le dessus bombé, le dessous plus plat ──
  const ELEV = [];
  for (let i = 0; i < 120; i++) {
    const t = (i / 120) * 2 * Math.PI, s = Math.sin(t);
    ELEV.push([50 * Math.cos(t) * bosse(t), (s > 0 ? 18 : 24) * s * bosse(t)]);
  }
  const FOND = Math.max(...ELEV.map(p => p[1]));           // où elle touche la planche
  const DESSUS = ELEV.filter(p => p[1] < 0).sort((a, b) => a[0] - b[0]);
  const hautA = x => {
    for (let i = 0; i < DESSUS.length - 1; i++) {
      const [x1, y1] = DESSUS[i], [x2, y2] = DESSUS[i + 1];
      if (x >= x1 && x <= x2) return y1 + ((y2 - y1) * (x - x1)) / (x2 - x1);
    }
    return 0;
  };

  // ── la même, vue d'au-dessus à 40° : 100 × 60 × 44 ; la ligne de coupe court sur le dessus ──
  const PHI = (40 * Math.PI) / 180, CF = Math.cos(PHI), SF = Math.sin(PHI);
  const BSIL = Math.hypot(22 * CF, 30 * SF);
  const SIL = [];
  for (let i = 0; i < 120; i++) { const t = (i / 120) * 2 * Math.PI; SIL.push([50 * Math.cos(t) * bosse(t), BSIL * Math.sin(t) * bosse(t)]); }
  const [XG, YG] = SIL[60], [XD, YD] = SIL[0];
  const FENTE = [];                                        // le plan de coupe, sur le dessus
  for (let i = 0; i <= 50; i++) { const x = XG + ((XD - XG) * i) / 50, u = (2 * (x - XG)) / (XD - XG) - 1; FENTE.push([x, YG + (YD - YG) * (i / 50) - 22 * CF * Math.sqrt(Math.max(0, 1 - u * u))]); }
  const mixte = `fill="none" stroke="${NOIR}" stroke-width="0.7" stroke-dasharray="12 3 2 3" stroke-linecap="round"`;

  // ── vue de dessus : 100 × 60, la tête un peu plus pleine ──
  const plan = t => {
    const r = 1 + 0.035 * Math.sin(3 * t + 0.6) + 0.02 * Math.cos(5 * t + 1.1);
    return [50 * Math.cos(t) * r, 30 * Math.sin(t) * r * (1 + 0.07 * Math.cos(t))];
  };

  // ── un œil : le sourcil (la cicatrice de la feuille), côté queue, et le bourgeon, côté tête ──
  const oeil = (P, k, x, y, rot = 0, t = 1) => {
    const c = Math.cos(rot), s = Math.sin(rot);
    const T = (u, v) => P([x + (u * c - v * s) * t, y + (u * s + v * c) * t]);
    const a = T(-0.6, -2.9), q = T(-3.4, 0), b = T(-0.6, 2.9), m = T(0.8, 0);
    return h.path(`M${f1(a[0])} ${f1(a[1])} Q${f1(q[0])} ${f1(q[1])} ${f1(b[0])} ${f1(b[1])}`, A.detail) +
      h.cercle(m[0], m[1], Math.max(1.3, 0.95 * k * t), A.plein);
  };

  // ── un couteau, dans son repère : le talon du tranchant en 0 0, la pointe vers +x, le dos vers -y ──
  //   Lb, Hb la lame ; Lh, Hh le manche ; hy le haut du manche ; pt la hauteur de la pointe (× Hb)
  //   sy : l'écrasement vertical de la vue d'un peu au-dessus (1 : de côté)
  function couteau(P, k, org, ang, { Lb, Hb, Lh, Hh, hy, pt }, sy = 1) {
    const c = Math.cos(ang), s = Math.sin(ang);
    const T = ([u, v]) => P([org[0] + u * c - v * sy * s, org[1] + u * s + v * sy * c]);
    const pointe = [Lb, -pt * Hb];
    const lame = [[0, 0], [0.62 * Lb, 0], ...quad([0.62 * Lb, 0], [0.9 * Lb, 0], pointe), ...quad(pointe, [0.93 * Lb, -0.92 * Hb], [0.7 * Lb, -Hb]), [0, -Hb]];
    const biseau = [[4, -0.2 * Hb], [0.6 * Lb, -0.2 * Hb], ...quad([0.6 * Lb, -0.2 * Hb], [0.86 * Lb, -0.2 * Hb], [0.96 * Lb, -(pt + 0.04) * Hb])];
    const manche = [[-5, hy], [-Lh + 9, hy - 0.5], ...quad([-Lh + 9, hy - 0.5], [-Lh, hy], [-Lh, hy + Hh / 2]),
      ...quad([-Lh, hy + Hh / 2], [-Lh, hy + Hh], [-Lh + 9, hy + Hh + 0.5]), [-5, hy + Hh]];
    const mitre = [[0, -Hb], [-6, hy - 1.5], [-6, hy + Hh + 1.5], [0, Math.min(0, hy + Hh + 4)]];
    const rivets = [0.3, 0.54, 0.78].map(f => T([-Lh * f, hy + Hh / 2]));
    const L = lame.map(T), M = manche.map(T);
    return {
      svg: [
        h.path(poly(M, true), blancT(1.4)),
        ...rivets.map(p => h.cercle(p[0], p[1], Math.min(2.1, Hh * 0.13) * k, A.detail)),
        h.path(poly(L, true), blancT(1.4)),
        h.path(poly(biseau.map(T)), A.fin),
        h.path(poly(mitre.map(T), true), blancT(1.4)),
      ].join('\n'),
      lame: L,
      pts: [...L, ...M],
    };
  }
  const planche = (P, k, x1, x2) => { const [a, b] = P([x1, FOND]), [c] = P([x2, FOND]); return h.rect(a, b, c - a, 9 * k, h.a.hachure('bois')); };

  const cadre = (z, x0, x1, y0, y1) => {
    const k = Math.min((z.l - 6) / (x1 - x0), (z.h - 6) / (y1 - y0));
    return { k, P: repere((z.l - (x1 - x0) * k) / 2 - x0 * k, (z.h - (y1 - y0) * k) / 2 - y0 * k, k) };
  };

  // ─── fendre : le couteau de chef au-dessus, dans le plan de coupe, le tranchant sur la ligne ───
  const CHEF = { Lb: 150, Hb: 40, Lh: 106, Hh: 22, hy: -37, pt: 0.3 };
  const TRANCH = -40 * CF;                                 // le tranchant, 18 mm au-dessus du dessus
  // la queue : le bout de tige souterraine, au bout gauche
  const QUEUE = (() => {
    const b = [XG + 1.5, 2.5], d = [-0.94, 0.34], n = [-d[1], d[0]];
    const q = (a, e) => [b[0] + d[0] * a + n[0] * e, b[1] + d[1] * a + n[1] * e];
    return { forme: [q(-3, 1.8), q(3.8, 1.6), ...quad(q(3.8, 1.6), q(6, 0), q(3.8, -1.6), 6), q(-3, -1.8)], bout: q(5.6, 0) };
  })();
  const geoF = z => cadre(z, -170, 96, -92, BSIL + 2);

  // ─── les deux morceaux ───
  const G = 9;
  const geoM = z => cadre(z, -66, 56, -58, 48);

  // ─── l'œil levé : un couteau d'office planté à côté de l'œil, la pointe sous l'œil ───
  const XE = -6, YE = hautA(XE);
  const ENTREE = [XE + 4, hautA(XE + 4)], BOUT = [XE + 1, YE + 8];
  const DIR = (() => { const v = [BOUT[0] - ENTREE[0], BOUT[1] - ENTREE[1]], n = Math.hypot(...v); return [v[0] / n, v[1] / n]; })();
  const OFFICE = { Lb: 55, Hb: 15, Lh: 60, Hh: 13, hy: -14, pt: 0.2 };
  const ANG = Math.atan2(DIR[1], DIR[0]);
  const TALON = (() => { const u = OFFICE.Lb, v = -OFFICE.pt * OFFICE.Hb, c = Math.cos(ANG), s = Math.sin(ANG); return [BOUT[0] - (u * c - v * s), BOUT[1] - (u * s + v * c)]; })();
  const KO = couteau(p => p, 1, TALON, ANG, OFFICE).pts;
  const geoO = z => cadre(z, -58, Math.max(56, ...KO.map(p => p[0])) + 3, Math.min(...KO.map(p => p[1])) - 3, FOND + 11);
  const XT = 22;                                            // un œil déjà levé : le trou qu'il laisse
  const OEIL_PDT = (() => {
    const out = []; let fait = false;
    for (const p of ELEV) {
      if (p[1] < 0 && Math.abs(p[0] - XT) < 5.5) {
        if (!fait) {
          const y = hautA(XT), a = [XT - 5.5, hautA(XT - 5.5)], m = [XT, y + 6.4];
          out.push(a, ...quad(a, [XT - 4.6, y + 6.6], m, 8), ...quad(m, [XT + 4.6, y + 6.2], [XT + 5.5, hautA(XT + 5.5)], 8));
          fait = true;
        }
        continue;
      }
      out.push(p);
    }
    return out;
  })();

  // ─── la rondelle, en coupe ───
  const peau = x => -2.5 + (x * x) / 150;
  const LEVE = 15, EP = 1;                                 // de combien on la lève ; l'épaisseur de la peau
  const geoR = z => cadre(z, -24, 24, -27, 19);
  // un bourgeon d'œil en coupe, posé dans le creux (x0, y0) : une petite pousse pointue
  const bourgeon = (P, x0, y0) => [
    h.path(poly([[x0 - 1.5, y0], ...quad([x0 - 1.5, y0], [x0 - 1.3, y0 - 2.6], [x0 + 0.4, y0 - 4.2], 8),
      ...quad([x0 + 0.4, y0 - 4.2], [x0 + 1.6, y0 - 2.2], [x0 + 1.5, y0], 8)].map(P), true), blancT(1.4)),
    h.path(poly([[x0 - 0.3, y0 - 1.1], [x0 + 0.9, y0 - 2.3]].map(P)), A.fin),
  ].join('\n');
  // la peau d'une rondelle : un léger creux au milieu, où loge l'œil
  const peauOeil = (x1, x2, dy) => {
    const out = [];
    for (let i = 0; i <= 28; i++) { const x = x1 + ((x2 - x1) * i) / 28; out.push([x, peau(x) + dy + 1.1 * Math.exp(-((x / 1.6) ** 2))]); }
    return out;
  };
  const onde = (a, b, n, amp) => {
    const out = [];
    for (let i = 1; i <= n; i++) { const t = i / n; out.push([a[0] + (b[0] - a[0]) * t + (i < n ? amp * Math.sin(i * 2.1) : 0), a[1] + (b[1] - a[1]) * t + (i < n ? amp * Math.cos(i * 1.7) : 0)]); }
    return out;
  };

  return {
    ref: '98-02',
    titre: 'Couper la semence de pomme de terre',
    desc: 'Une pomme de terre vue d’un peu au-dessus, la ligne de coupe tracée sur le dessus de la tête (les yeux serrés) à la queue, et le couteau de chef qui descend dans ce plan ; les deux morceaux vus de dessus, chacun avec ses yeux, dont ceux de la tête ; sans semence, la pointe d’un couteau d’office qui tourne autour d’un œil pour le lever ; en coupe, l’œil levé avec sa rondelle de chair au-dessus du trou qu’elle laisse.',
    format: 'pleine',
    disposition: [['fendre'], ['morceaux', 'oeil', 'rondelle']],
    hauteurs: [1, 1.1],
    largeurs: [[1], [1, 1.15, 0.9]],
    vues: {
      // ─── le couteau dans le long, vu d'un peu au-dessus ───
      fendre: {
        titre: 'Fendre de la tête à la queue',
        dessin: z => {
          const { k, P } = geoF(z);
          const cou = couteau(P, k, [-58, TRANCH], 0, CHEF, CF);
          // les yeux : derrière la ligne (sur le dessus, au fond) et devant ; la tête en a des deux côtés
          const yeux = [[44, -10, 0.1, 0.65], [10, -21, 0, 0.75], [-22, -19, 0, 0.75],
            [43, -2, 0.2], [39, 6, 0.3], [20, -4, 0], [2, 8, 0.1], [-18, 0, 0], [-32, 10, 0, 0.85], [-40, -3, 0, 0.8]];
          const [xa, ya] = P([10, -90]), [, yb] = P([10, -66]);
          return [
            h.path(poly(QUEUE.forme.map(P), true), blancT(1.4)),
            ombreRonde(SIL.map(P), 14, 11, 2.4),
            h.path(poly(FENTE.map(P)), mixte),
            ...yeux.map(([x, y, r, t]) => oeil(P, k, x, y, r, t || 1)),
            cou.svg,
            h.geste(`M${f1(xa)} ${f1(ya)} L${f1(xa)} ${f1(yb)}`),   // la charte : le geste, la lame qui descend
          ].join('\n');
        },
        renvois: z => {
          const { P } = geoF(z);
          return [
            { n: 1, rond: P([80, 8]), cible: P([44.2, -1.6]), texte: 'la tête, aux yeux les plus vigoureux' },
            { n: 2, rond: P([-110, QUEUE.bout[1]]), cible: P(QUEUE.bout), texte: 'la queue : des tiges plus faibles' },
            { n: 3, rond: P([-40, -86]), cible: P([-40, -46]), texte: 'la lame : eau savonneuse entre deux tubercules' },
          ];
        },
      },

      // ─── les deux morceaux, vus de dessus, écartés ───
      morceaux: {
        titre: 'Deux morceaux, vus de dessus',
        dessin: z => {
          const { k, P } = geoM(z);
          const haut = [], bas = [];
          for (let i = 0; i <= 60; i++) { const t = Math.PI + (i / 60) * Math.PI, p = plan(t); haut.push([p[0], p[1] - G]); }
          for (let i = 0; i <= 60; i++) { const t = (i / 60) * Math.PI, p = plan(t); bas.push([p[0], p[1] + G]); }
          const yh = [[42, -7, 0.1], [35, -17, -0.3], [10, -16, 0], [-18, -12, 0.1]];
          const yb = [[45, 6, 0.2], [33, 16, 0.3], [6, 14, 0], [-24, 11, 0, 0.85]];
          return [
            h.path(poly(haut.map(P), true), blancT(2.4)),
            h.path(poly(bas.map(P), true), blancT(2.4)),
            ...yh.map(([x, y, r, t]) => oeil(P, k, x, y - G, r, t || 1)),
            ...yb.map(([x, y, r, t]) => oeil(P, k, x, y + G, r, t || 1)),
          ].join('\n');
        },
        renvois: z => {
          const { P } = geoM(z);
          return [
            { n: 4, rond: P([-8, -52]), cible: P([-8, -G - 20]), texte: '40 à 60 g, deux yeux au moins' },
            { n: 5, rond: P([-60, 0]), cible: P([-22, G + 0.6]), texte: 'coupe refermée 7 à 10 jours au frais' },
          ];
        },
      },

      // ─── sans semence : la pointe du couteau lève un œil ───
      oeil: {
        titre: 'Sans semence : lever les yeux',
        dessin: z => {
          const { k, P } = geoO(z);
          const pdt = OEIL_PDT.map(P);
          const cou = couteau(P, k, TALON, ANG, OFFICE);
          const yeux = [[-30, -5, 0], [-14, 6, 0.1], [12, -11, -0.1], [30, 5, 0.2], [42, -5, 0.1], [-38, 8, 0, 0.85]];
          // le tour de la pointe autour de l'œil : une ellipse couchée sur la surface, par devant
          const arc = [];
          for (let a = 215; a >= -60; a -= 5) { const r = (a * Math.PI) / 180; arc.push(P([XE + 1.5 + 10 * Math.cos(r), YE - 6 + 3.2 * Math.sin(r)])); }
          return [
            planche(P, k, -58, 60),
            cou.svg,
            ombreRonde(pdt, 11, 9, 2.4, ELEV.map(P)),
            bourgeon(P, XE - 0.8, hautA(XE - 0.8) + 0.5),
            ...yeux.map(([x, y, r, t]) => oeil(P, k, x, y, r, t || 1)),
            cache(cou.lame, pdt),
            h.geste(poly(arc)),   // la charte : le geste, la pointe qui tourne autour de l'œil
          ].join('\n');
        },
        renvois: z => {
          const { P } = geoO(z);
          const sp = [Math.sin(ANG), -Math.cos(ANG)];           // vers le dos de la lame
          const c6 = [BOUT[0] - DIR[0] * 32 + sp[0] * 6, BOUT[1] - DIR[1] * 32 + sp[1] * 6];
          return [
            { n: 6, rond: P([-40, c6[1]]), cible: P(c6), texte: 'la pointe du couteau lève l’œil' },
            { n: 7, rond: P([-50, -20]), cible: P([-32, -2]), texte: 'le reste au chaudron, sauf vert ou amer' },
          ];
        },
      },

      // ─── l'œil levé et sa rondelle, en coupe ───
      rondelle: {
        titre: 'L’œil levé, en coupe',
        dessin: z => {
          const { k, P } = geoR(z);
          // le morceau sous le trou : la peau en haut, cassé sur les côtés et en bas
          const dessus = (x1, x2, dy) => { const o = []; for (let i = 0; i <= 10; i++) { const x = x1 + ((x2 - x1) * i) / 10; o.push([x, peau(x) + dy]); } return o; };
          const creux = [...quad([-7, peau(-7)], [-5.8, 10], [0, 9.5]), ...quad([0, 9.5], [5.8, 10], [7, peau(7)])];
          const casse = [...onde([20, peau(20)], [20.5, 16], 5, 0.7), ...onde([20.5, 16], [-20, 16], 12, 0.8), ...onde([-20, 16], [-20, peau(-20)], 5, 0.7)];
          const morceau = dy => [...dessus(-20, -7, dy), ...creux, ...dessus(7, 20, dy).slice(1), ...casse];
          // la rondelle levée : la peau et son œil, la chair en cuvette dessous
          const cuvette = [...quad([7, peau(7) - LEVE], [5.8, 10 - LEVE], [0, 9.5 - LEVE]), ...quad([0, 9.5 - LEVE], [-5.8, 10 - LEVE], [-7, peau(-7) - LEVE])];
          const rondelle = dy => [...peauOeil(-7, 7, dy - LEVE), ...cuvette];
          const [xf, yf1] = P([12.5, -1.5]), [, yf2] = P([12.5, -12]);
          return [
            h.path(poly(morceau(0).map(P), true), fond),
            h.path(poly(morceau(EP).map(P), true), h.a.hachure('neige', 'aucun')),
            h.path(poly(dessus(-20, -7, 0).map(P)), A.arete), h.path(poly(dessus(7, 20, 0).map(P)), A.arete),
            h.path(poly(dessus(-20, -7, EP).map(P)), A.fin), h.path(poly(dessus(7, 20, EP).map(P)), A.fin),
            h.path(poly([[-7, peau(-7)], ...creux].map(P)), A.arete),
            h.path(poly([[20, peau(20)], ...casse].map(P)), A.fin),
            h.path(poly(rondelle(0).map(P), true), blancT(1.4)),
            h.path(poly(rondelle(EP).map(P), true), h.a.hachure('neige', 'aucun')),
            h.path(poly(peauOeil(-7, 7, EP - LEVE).map(P)), A.fin),
            h.path(poly(peauOeil(-7, 7, -LEVE).map(P)), A.arete),
            bourgeon(P, 0, peau(0) + 1.1 - LEVE),
            h.fleche(`M${f1(xf)} ${f1(yf1)} L${f1(xf)} ${f1(yf2)}`, A.arete),
          ].join('\n');
        },
        renvois: z => {
          const { P } = geoR(z);
          return [
            { n: 8, rond: P([15, -23]), cible: P([0.9, peau(0) + 1.1 - LEVE - 2.6]), texte: 'l’œil' },
            { n: 9, rond: P([-18, -8]), cible: P([-3.5, -9.5]), texte: 'la rondelle de chair : elle se plante' },
          ];
        },
      },
    },
  };
};
