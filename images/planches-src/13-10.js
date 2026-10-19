// Planche 13-10 — la pile et la laine d'acier : la méthode qui marche avec des doigts gourds (chapitre 13, étapes 18
// à 21, et section 9, « Le feu à la batterie, sans laine d'acier »). Planche neuve, 16 octobre 2026.
//
// En haut, la méthode : la laine d'acier la plus fine, étirée en boule lâche et posée dans le creux du nid ; la pile de
// 9 V tenue dans le poing, ses deux bornes posées sur la laine (la flèche rouge : toucher) ; la laine rougit et le
// feu avance seul. En bas, après un filet, les deux autres façons (règle 10) : sans pile de 9 V, la batterie de
// l'auto, un fil à chaque borne, les deux bouts tenus par la gaine, loin de la batterie (le trait de coupure dit que
// le fil est long : « à un bras de la batterie », étape 20) ; sans laine, une mine de crayon en travers des deux
// fils, ou un seul brin de fil multibrin.
// Aucune cote : le chapitre n'en donne pas (la pile de 9 V est dessinée à ses proportions, 48,5 × 26,5 × 17,5 mm).
// Le rouge : la flèche du geste (repère 4), et rien d'autre.
// 19 octobre 2026 : la matière de la laine refaite (repères 1, 2, 5, 7), des fils droits au lieu des boucles (module
// _laine-acier.js, partagé avec la feuille d'essai _essai-laine-acier.js) ; la boule passe derrière le bord avant du creux
// du nid, et un rond blanc sous les rayons garde le point qui rougit lisible.
// 19 octobre 2026, après le second regard : la matière corrigée (aucun fil plus long que la moitié de la boule, les fils
// longs à 30° au plus, des bouts qui dépassent de 8 unités au plus, le tampon dense au milieu) ; la boule de la vue
// « pile » plus haute (ry 44), presque entière au-dessus du bord du creux, la pile remontée pour que ses bornes touchent
// le dessus ; les deux mains par h.formes.mainStock (2-13 « poing-cylindre » pour la pile dans le poing, 1-09
// « poing-manche-debout » en miroir pour les fils), mainSimple étant retiré ; la flèche du geste passe à droite de la
// pile, sous l'avant-bras, et le filet du repère 5 descend par la gauche de la pile jusque dans les rayons.
// 19 octobre 2026, deuxième second regard : plus de mèche du nid dans la largeur du creux (elles encadraient chaque
// boule comme deux parenthèses frisées) ; le reste du nid ne change pas.

module.exports = (h) => {
  const F = h.formes, A = h.a;
  const f = v => Math.round(v * 10) / 10;
  const blanc = a => a.replace('fill="none"', 'fill="#ffffff"');
  const gen = s => { let g = s; return () => (g = (g * 16807) % 2147483647) / 2147483647; };

  // Courbe lisse (Catmull-Rom) passant par chaque point.
  const lisse = (pts, ferme) => {
    const n = pts.length;
    const p = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
    const segs = ferme ? n : n - 1;
    for (let i = 0; i < segs; i++) {
      const p0 = p(i - 1), p1 = p(i), p2 = p(i + 1), p3 = p(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };

  // Le nid de fibres, creusé au centre (vu un peu d'en haut) : le creux est une ellipse.
  const nid = (cx, yG, w, H, graine) => {
    const r = gen(graine), out = [], x0 = cx - w / 2, pts = [];
    for (let i = 0; i <= 16; i++) {
      const t = i / 16, bosse = Math.min(1, 1.55 * Math.pow(Math.sin(Math.PI * t), 0.8));
      pts.push([x0 + w * t + (r() - 0.5) * 3, yG - H * bosse + (i && i < 16 ? (r() - 0.5) * 4 : 0)]);
    }
    out.push(h.path(lisse(pts, false) + ' Z', blanc(A.arete)));
    let brins = '';
    for (let i = 0; i < Math.round(w * H / 70); i++) {
      const t = 0.08 + r() * 0.84, x = x0 + w * t;
      const top = yG - H * Math.min(1, 1.55 * Math.pow(Math.sin(Math.PI * t), 0.8));
      const y = top + 10 + r() * (yG - top - 12);
      if (y > yG - 3) continue;
      const L = 7 + r() * 9, o = (r() - 0.5) * 0.9;
      brins += `M ${f(x - Math.cos(o) * L / 2)} ${f(y - Math.sin(o) * L / 2)} Q ${f(x)} ${f(y + (r() - 0.5) * 5)} ${f(x + Math.cos(o) * L / 2)} ${f(y + Math.sin(o) * L / 2)} `;
    }
    out.push(h.path(brins, A.fin));
    // Les mèches sur le bord du nid, sauf dans la largeur du creux : là, elles tomberaient sur le bas des flancs de la
    // boule de laine et feraient deux frisettes « ( ) » dans les fils droits (second regard, 19 octobre 2026). Le tirage
    // se fait quand même, pour que le reste du nid ne bouge pas.
    const cy = yG - H + 7, rx = w * 0.3, ry = 7;
    let m = '';
    pts.forEach(([x, y], i) => {
      if (i === 0 || i === 16 || i % 2) return;
      const e = 3 + r() * 4, qx = (r() - 0.5) * 6, ex = (r() - 0.5) * 8;
      if (Math.abs(x - cx) <= rx + 4) return;
      m += `M ${f(x)} ${f(y)} q ${f(qx)} ${f(-e)} ${f(ex)} ${f(-e * 1.5)} `;
    });
    out.push(h.path(m, A.fin));
    out.push(h.ellipse(cx, cy, rx, ry, blanc(A.detail)));
    return { svg: out.join('\n'), creux: [cx, cy], rx, ry };
  };

  // La laine d'acier : le module partagé avec la feuille d'essai (images/planches-src/_laine-acier.js, façon D). Des fils
  // de métal fins, longs et presque droits, croisés selon deux directions, avec du jour au travers ; jamais de boucle.
  const laine = require('./_laine-acier.js')(h);

  // La laine qui rougit : de petits traits qui rayonnent autour d'un point.
  const rougit = (x, y, r1, r2, n = 9, graine = 3) => {
    const r = gen(graine);
    let d = '';
    for (let i = 0; i < n; i++) {
      const a = i / n * 2 * Math.PI + r() * 0.3, l = r2 * (0.7 + r() * 0.4);
      d += `M ${f(x + Math.cos(a) * r1)} ${f(y + Math.sin(a) * r1)} L ${f(x + Math.cos(a) * l)} ${f(y + Math.sin(a) * l)} `;
    }
    return h.path(d, A.detail);
  };

  // La boule posée dans le creux du nid : la laine est découpée par le bord avant du creux (la moitié basse de son
  // ellipse), pour que le bas de la boule passe derrière le bord du nid au lieu de pendre devant.
  const dansLeCreux = (N, z, id, contenu) => {
    const [ex, ey] = N.creux, pts = [[0, 0], [z.l, 0], [z.l, ey]];
    for (let k = 0; k <= 24; k++) { const a = k / 24 * Math.PI; pts.push([ex + Math.cos(a) * N.rx, ey + Math.sin(a) * N.ry]); }
    pts.push([0, ey]);
    return `<clipPath id="${id}"><path d="${pts.map((q, i) => `${i ? 'L' : 'M'} ${f(q[0])} ${f(q[1])}`).join(' ')} Z" fill="#FFFFFF"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu}\n</g>`;
  };
  // Le point qui rougit, au contact : un rond blanc sous ses rayons, pour qu'il se lise dans les fils de la laine.
  const lueur = (x, y, rayon) => h.cercle(x, y, rayon, A.blanc);

  // Un fil électrique : la gaine en deux traits parallèles, fermée par un liseré blanc, puis le cuivre nu au bout, en brins.
  const decale = (pts, d) => {
    const seg = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const [p, q] = [pts[i], pts[i + 1]], L = Math.hypot(q[0] - p[0], q[1] - p[1]), n = [-(q[1] - p[1]) / L * d, (q[0] - p[0]) / L * d];
      seg.push([[p[0] + n[0], p[1] + n[1]], [q[0] + n[0], q[1] + n[1]]]);
    }
    const out = [seg[0][0]];
    for (let i = 0; i < seg.length - 1; i++) {
      const [a, b] = seg[i], [c, e] = seg[i + 1];
      const d1 = [b[0] - a[0], b[1] - a[1]], d2 = [e[0] - c[0], e[1] - c[1]], den = d1[0] * d2[1] - d1[1] * d2[0];
      if (Math.abs(den) < 1e-6) { out.push(b); continue; }
      const t = ((c[0] - a[0]) * d2[1] - (c[1] - a[1]) * d2[0]) / den;
      out.push([a[0] + d1[0] * t, a[1] + d1[1] * t]);
    }
    out.push(seg[seg.length - 1][1]);
    return out;
  };
  const fil = (pts, nu = 0) => {
    const g = decale(pts, 2.2), d = decale(pts, -2.2);
    const out = [h.chemin([...g, ...d.slice().reverse()], A.blanc, true), h.chemin(g, A.arete), h.chemin(d, A.arete)];
    out.push(h.ligne(...g[g.length - 1], ...d[d.length - 1], A.detail));
    if (nu) {
      const [p, q] = [pts[pts.length - 2], pts[pts.length - 1]], L = Math.hypot(q[0] - p[0], q[1] - p[1]);
      const u = [(q[0] - p[0]) / L, (q[1] - p[1]) / L], n = [-u[1], u[0]];
      let b = '';
      for (const k of [-1.1, 0, 1.1]) b += `M ${f(q[0] + n[0] * k)} ${f(q[1] + n[1] * k)} L ${f(q[0] + u[0] * nu + n[0] * k * 1.8)} ${f(q[1] + u[1] * nu + n[1] * k * 1.8)} `;
      out.push(h.path(b, A.detail));
    }
    return out.join('\n');
  };
  const bout = (pts, nu) => { const [p, q] = [pts[pts.length - 2], pts[pts.length - 1]], L = Math.hypot(q[0] - p[0], q[1] - p[1]); return [q[0] + (q[0] - p[0]) / L * nu, q[1] + (q[1] - p[1]) / L * nu]; };


  const dansVue = (z, id, contenu) => `<clipPath id="${id}"><rect x="0" y="0" width="${f(z.l)}" height="${f(z.h)}"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu}\n</g>`;

  // ─── Les mains : h.formes.mainStock seulement (brief-agent.md), aucune main dessinée, aucune main déformée ────
  // Le passage du fichier de la main à la vue, le même que mainStock (ancre : le centre de l'objet du fichier) : il sert
  // à prolonger l'avant-bras à partir des bords relevés sur le dessin de la main.
  const CAT = require('../../.claude/skills/planches/scripts/mains/stock.js').catalogue;
  const versVue = (id, o) => {
    const Mc = CAT[id], k = o.echelle, sx = o.miroir ? -1 : 1, A0 = [Mc.objet.x, Mc.objet.y];
    const c = Math.cos((o.angle || 0) * Math.PI / 180), s = Math.sin((o.angle || 0) * Math.PI / 180);
    return ([px, py]) => { const u = sx * k * (px - A0[0]), v = k * (py - A0[1]); return [o.x + c * u - s * v, o.y + s * u + c * v]; };
  };

  // La pile dans le poing : 2-13 « poing-cylindre », sans son objet (objet: false) ; la pile est posée sur l'axe de
  // l'objet, avant la main, ses bornes en bas. Tournée de -114,9° : le cylindre du fichier, incliné de 24,9°, sort du
  // poing vers le bas, et l'avant-bras part en haut à droite, hors de la vue. Échelle : 3,5 unités du fichier par mm
  // (le cylindre de 2-13 fait 25 mm de large, la pile 26,5). Sur l'axe, le bord du poing est à 37 unités du fichier du
  // centre de l'objet, du côté du poing (relevé sur le contour de 2-13) : la pile sort de « sort » unités sous ce bord.
  const P213 = { id: 'poing-cylindre', angle: -114.9, bord: 37, mm: 3.5 };
  const poingPile = g => {
    const echelle = g.k / P213.mm;
    return F.mainStock({ id: P213.id, objet: false, echelle, angle: P213.angle, x: g.xAxe, y: g.bB - g.sort + P213.bord * echelle });
  };

  // Les fils dans le poing : 1-09 « poing-manche-debout », en miroir (l'avant-bras part à droite), sans son objet ; les
  // deux fils passent debout dans le poing, sur l'axe de l'objet. Sur cet axe, le poing va de 47 à 319 unités du
  // fichier sous le centre de l'objet (relevé sur le contour de 1-09). L'avant-bras continue les bords de la main
  // jusqu'au bord de la vue, comme dans la 13-08 (le dessus part de (5363,8 ; 440,7), le dessous de (5364,4 ; 639,9),
  // relevés sur le dessin de 1-09) ; un fond blanc couvre la coupe du fichier.
  const P109 = { id: 'poing-manche-debout', haut: 47, bas: 319 };
  const poingFils = (xAxe, yMilieu, echelle, Lc = 10, Lb = 260) => {
    const o = { id: P109.id, objet: false, miroir: true, echelle, x: xAxe, y: yMilieu - (P109.haut + P109.bas) / 2 * echelle };
    const m = F.mainStock(o), T = versVue('1-09', o);
    const dir = (p, d) => { const a = T(p), b = T([p[0] + d[0], p[1] + d[1]]), nn = Math.hypot(b[0] - a[0], b[1] - a[1]); return [a, [(b[0] - a[0]) / nn, (b[1] - a[1]) / nn]]; };
    const [t1, dt] = dir([5363.75, 440.741], [-52.5, -7.8]), [b1, db] = dir([5364.38, 639.884], [-109.4, 12.7]);
    const t0 = [t1[0] - dt[0] * 2, t1[1] - dt[1] * 2], b0 = [b1[0] - db[0] * 2, b1[1] - db[1] * 2];
    let ax = [dt[0] + db[0], dt[1] + db[1]]; const na = Math.hypot(ax[0], ax[1]); ax = [ax[0] / na, ax[1] / na];
    const w = [t0[0] - b0[0], t0[1] - b0[1]], sc = w[0] * ax[0] + w[1] * ax[1], np = [w[0] - ax[0] * sc, w[1] - ax[1] * sc];
    const lw = Math.hypot(np[0], np[1]), nv = [np[0] / lw, np[1] / lw], ev = lw * 0.04;
    const bord = (p0, d, sg) => {
      const e = [p0[0] + ax[0] * Lc + sg * nv[0] * ev, p0[1] + ax[1] * Lc + sg * nv[1] * ev];
      return { c1: [p0[0] + d[0] * Lc / 2, p0[1] + d[1] * Lc / 2], c2: [e[0] - ax[0] * Lc / 2, e[1] - ax[1] * Lc / 2], e, fin: [e[0] + ax[0] * Lb, e[1] + ax[1] * Lb] };
    };
    const Hd = bord(t0, dt, 1), Bd = bord(b0, db, -1), Q = p => `${f(p[0])} ${f(p[1])}`;
    const trait = 'fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"';
    return [m.svg,
      h.path(`M ${Q(t0)} C ${Q(Hd.c1)} ${Q(Hd.c2)} ${Q(Hd.e)} L ${Q(Hd.fin)} L ${Q(Bd.fin)} L ${Q(Bd.e)} C ${Q(Bd.c2)} ${Q(Bd.c1)} ${Q(b0)} Z`, A.blanc),
      h.path(`M ${Q(t0)} C ${Q(Hd.c1)} ${Q(Hd.c2)} ${Q(Hd.e)} L ${Q(Hd.fin)} M ${Q(b0)} C ${Q(Bd.c1)} ${Q(Bd.c2)} ${Q(Bd.e)} L ${Q(Bd.fin)}`, trait),
    ].join('\n');
  };

  // ─── Les géométries des vues ─────────────────────────────────────────────────────────────────────────
  const vA = z => {
    const yG = z.h - 12, w = Math.min(170, z.l * 0.6), H = 50;
    const n = { cx: z.l - w / 2 - 8, yG, w, H };
    const tampon = { cx: 52, cy: 46, rx: 38, ry: 20 };
    const boule = { cx: n.cx, cy: yG - H - 14, rx: 46, ry: 30 };
    return { n, tampon, boule };
  };
  const vB = z => {
    const yG = z.h - 12, w = Math.min(240, z.l * 0.72), H = 50;
    const n = { cx: Math.round(z.l * 0.44), yG, w, H };
    const k = 1.55;                                      // unités de vue par mm : la pile et la main à la même échelle
    const L = 48.5 * k, W = 26.5 * k, D = 17.5 * k * 0.5;
    // la boule, presque entière au-dessus du bord du creux (comme la boule de la vue « Préparer la laine ») ; la pile
    // debout au-dessus, les bornes en bas, qui touchent le dessus de la boule
    const boule = { cx: n.cx, cy: yG - H - 28, rx: 66, ry: 44 };
    const bx = n.cx - W / 2 + 6, bB = boule.cy - boule.ry + 8;
    const xc = bx + W * 0.3;                             // le point qui rougit, sous la borne ronde
    const xF = bx + W + D + 14;                          // la flèche du geste, à droite de la pile, sous l'avant-bras
    return { n, k, L, W, D, bx, bB, bT: bB - L, boule, xc, xF, xAxe: bx + (W + D) / 2, sort: 46 };
  };
  const vC = z => {
    const yG = z.h - 10, w = 120, H = 40;
    const n = { cx: z.l - 92, yG, w, H };
    const bat = { x: 14, y: 130, l: 112, ht: 84, ox: 22, oy: -14 };
    const boule = { cx: n.cx, cy: yG - H - 8, rx: 34, ry: 20 };
    return { n, bat, boule };
  };
  const vD = z => ({ y1: Math.round(z.h * 0.3), y2: Math.round(z.h * 0.76), cx: Math.round(z.l / 2) });

  return {
    ref: '13-10',
    titre: 'La pile et la laine d’acier',
    desc: 'En haut, la méthode. Un tampon de laine d’acier la plus fine, des fils de métal fins et droits serrés en couches, puis la même laine étirée en boule lâche, grosse comme le poing, posée dans le creux d’un nid de fibres. Une pile de 9 V tenue dans le poing, debout, le bas de la pile qui sort sous le poing, les deux bornes posées sur le dessus de la boule ; à côté, une flèche rouge vers le bas : toucher ; autour du point touché, la laine rougit. En bas, après un filet, les autres façons. Sans pile de 9 V : la batterie de l’auto, un fil attaché à chaque borne ; les fils, coupés d’un trait pour dire qu’ils sont longs, passent dans un poing qui les tient par la gaine, et leurs bouts nus touchent la laine dans le nid. Sans laine : une mine de crayon posée en travers des deux fils nus, ou un seul brin de fil multibrin tendu d’un fil à l’autre.',
    format: 'pleine',
    disposition: [['etirer', 'pile'], ['batterie', 'sanslaine']],
    hauteurs: [1, 1.08],
    largeurs: [[1, 1.15], [1.6, 1]],
    vues: {
      etirer: {
        titre: 'Préparer la laine',
        dessin: z => {
          const { n, tampon, boule } = vA(z), out = [];
          // règle 10 : un filet sur toute la largeur sépare la méthode, en haut, des autres façons, en bas
          out.push(h.ligne(0, z.h + 11, 600, z.h + 11, A.fin));
          out.push(h.ligne(0, n.yG, z.l, n.yG, A.arete));
          out.push(laine(tampon.cx, tampon.cy, tampon.rx, tampon.ry, 4, { lache: 0 }));
          // étirer : du tampon serré à la boule lâche
          out.push(h.fleche(`M ${tampon.cx + tampon.rx + 10} ${tampon.cy + 6} Q ${f((tampon.cx + boule.cx) / 2 + 10)} ${f(tampon.cy - 4)} ${f(boule.cx - boule.rx * 0.7)} ${f(boule.cy - boule.ry - 6)}`, A.arete));
          const N = nid(n.cx, n.yG, n.w, n.H, 3);
          out.push(N.svg);
          out.push(dansLeCreux(N, z, 'creux-1310a', laine(boule.cx, boule.cy, boule.rx, boule.ry, 7, { posee: true })));
          return out.join('\n');
        },
        renvois: z => {
          const { n, tampon, boule } = vA(z);
          return [
            { n: 1, rond: [tampon.cx - 20, tampon.cy + tampon.ry + 30], cible: [tampon.cx - 10, tampon.cy + tampon.ry - 2], texte: 'la laine d’acier la plus fine' },
            { n: 2, rond: [boule.cx + boule.rx + 8, boule.cy - boule.ry - 22], cible: [boule.cx + boule.rx * 0.6, boule.cy - boule.ry * 0.6], texte: 'étirée en boule lâche, grosse comme le poing' },
            { n: 3, rond: [n.cx - n.w / 2 - 6, n.yG - 46], cible: [n.cx - n.w / 2 + 22, n.yG - 22], texte: 'posée dans le creux du nid' },
          ];
        },
      },

      pile: {
        titre: 'Toucher avec la pile de 9 V',
        dessin: z => {
          const g = vB(z), { n, k, L, W, D, bx, bB, bT, boule, xc } = g, out = [];
          out.push(h.ligne(0, n.yG, z.l, n.yG, A.arete));
          const N = nid(n.cx, n.yG, n.w, n.H, 5);
          out.push(N.svg);
          out.push(dansLeCreux(N, z, 'creux-1310b', laine(boule.cx, boule.cy, boule.rx, boule.ry, 9, { posee: true })));
          // la laine rougit sous les bornes
          out.push(lueur(xc, bB + 5, 13));
          out.push(rougit(xc, bB + 5, 7, 18, 12, 5));
          // la pile : la face avant, la face de droite à l'ombre, les deux bornes en bas
          const pile = [
            h.chemin([[bx + W, bT], [bx + W + D, bT - D * 0.6], [bx + W + D, bB - D * 0.6], [bx + W, bB]], A.ombre, true),
            h.chemin([[bx + W, bT], [bx + W + D, bT - D * 0.6], [bx + W + D, bB - D * 0.6], [bx + W, bB]], A.arete, true),
            h.rect(bx, bT, W, L, blanc(A.contour)),
            // la borne ronde et la borne à six pans
            h.rect(bx + W * 0.2, bB, 4.4 * k, 2.6 * k, blanc(A.arete)),
            h.chemin([[bx + W * 0.62, bB], [bx + W * 0.62 + 5.6 * k, bB], [bx + W * 0.62 + 5.6 * k, bB + 2], [bx + W * 0.62 + 4.6 * k, bB + 2.6 * k], [bx + W * 0.62 + 1, bB + 2.6 * k], [bx + W * 0.62, bB + 2]], blanc(A.arete), true),
          ].join('\n');
          // la pile tenue dans le poing, le haut dedans, les bornes en bas : la pile d'abord, la main par-dessus
          out.push(pile);
          out.push(dansVue(z, 'poing-1310b', poingPile(g).svg));
          // toucher : la flèche du geste
          out.push(h.geste(`M ${f(g.xF)} ${f(bB - 40)} L ${f(g.xF)} ${f(bB - 6)}`));
          return out.join('\n');
        },
        renvois: z => {
          const { bx, bB, xc, xF } = vB(z);
          return [
            { n: 4, rond: [xF + 28, bB - 24], cible: [xF + 1.5, bB - 24], texte: 'poser les deux bornes sur la laine' },
            // la cible dans les rayons, sous la borne ronde ; le filet descend par la gauche de la pile, là où il traverse
            // le moins de fils
            { n: 5, rond: [bx - 38, bB - 18], cible: [xc - 3, bB + 15], texte: 'elle rougit : le feu avance seul' },
          ];
        },
      },

      batterie: {
        titre: 'Sans pile de 9 V : la batterie',
        dessin: z => {
          const g = vC(z), { n, bat, boule } = g, out = [];
          // règle 10 : un filet sépare la batterie (au lieu de la pile) de la mine (au lieu de la laine), à droite
          out.push(h.ligne(z.l + 11, 0, z.l + 11, z.h, A.fin));
          out.push(h.ligne(0, n.yG, z.l, n.yG, A.arete));
          // la batterie : la face avant, le dessus en fuite, la face de droite à l'ombre, deux bornes
          const { x, y, l, ht, ox, oy } = bat;
          out.push(h.chemin([[x + l, y], [x + l + ox, y + oy], [x + l + ox, y + ht + oy], [x + l, y + ht]], A.ombre, true));
          out.push(h.chemin([[x + l, y], [x + l + ox, y + oy], [x + l + ox, y + ht + oy], [x + l, y + ht]], A.arete, true));
          out.push(h.chemin([[x, y], [x + l, y], [x + l + ox, y + oy], [x + ox, y + oy]], blanc(A.arete), true));
          out.push(h.rect(x, y, l, ht, blanc(A.contour)));
          out.push(h.ligne(x, y + 12, x + l, y + 12, A.detail));
          const bornes = [[x + 26, y + oy / 2 - 1], [x + l - 18, y + oy / 2 - 1]];
          bornes.forEach(([bx, by]) => { out.push(h.rect(bx - 5, by - 9, 10, 9, blanc(A.arete)), h.ellipse(bx, by - 9, 5, 2, blanc(A.arete))); });
          // les deux fils, attachés aux bornes, longs (le trait de coupure), tenus ensemble dans un poing au-dessus du nid,
          // les bouts nus qui touchent la laine à un doigt l'un de l'autre
          const pz = [n.cx + 4, boule.cy - boule.ry - 52];        // le point de prise, au milieu du poing
          const yBas = boule.cy - boule.ry + 3;                   // les bouts nus, sur la laine
          const fA = [[bornes[0][0], bornes[0][1] - 6], [bornes[0][0] + 6, y - 44], [pz[0] - 30, y - 44], [pz[0] - 5, pz[1] - 40], [pz[0] - 5, yBas - 7]];
          const fB = [[bornes[1][0], bornes[1][1] - 6], [bornes[1][0] + 8, y - 30], [pz[0] - 14, y - 30], [pz[0] + 5, pz[1] - 40], [pz[0] + 5, yBas - 7]];
          const N = nid(n.cx, n.yG, n.w, n.H, 7);
          out.push(N.svg);
          out.push(dansLeCreux(N, z, 'creux-1310c', laine(boule.cx, boule.cy, boule.rx, boule.ry, 11, { posee: true })));
          out.push(lueur(pz[0], yBas + 1, 8));
          out.push(fil(fA, 7), fil(fB, 7));
          out.push(rougit(pz[0], yBas + 1, 5, 14, 9, 9));
          // le trait de coupure : le fil est long, la batterie est à un bras du feu
          const xc = (bornes[1][0] + pz[0]) / 2 - 10;
          for (const dx of [-3, 3]) out.push(h.ligne(xc + dx - 5, y - 52, xc + dx + 5, y - 22, A.arete));
          // le poing tient les deux fils par la gaine (le fil d'abord : le blanc du poing le cache dedans) ; l'avant-bras
          // part à droite et sort de la vue
          out.push(dansVue(z, 'poing-1310c', poingFils(pz[0], pz[1], 0.23)));
          return out.join('\n');
        },
        renvois: z => {
          const { n, bat, boule } = vC(z);
          return [
            { n: 6, rond: [bat.x + 14, bat.y + bat.ht + 20], cible: [bat.x + 26, bat.y - 6], texte: 'au lieu de 4 : un fil à chaque borne' },
            { n: 7, rond: [n.cx - 70, boule.cy - boule.ry - 30], cible: [n.cx - 2, boule.cy - boule.ry - 16], texte: 'tenir les fils par la gaine' },
            { n: 8, rond: [(bat.x + bat.l + n.cx) / 2 - 4, bat.y - 84], cible: [(bat.x + bat.l + n.cx) / 2 - 4, bat.y - 54], texte: 'loin de la batterie, à un bras' },
          ];
        },
      },

      sanslaine: {
        titre: 'Sans laine : la mine, le brin',
        dessin: z => {
          const { y1, y2, cx } = vD(z), out = [];
          // la mine de crayon, en travers des deux bouts nus
          const fa = [[0, y1 - 6], [cx - 24, y1 - 6]], fb = [[z.l, y1 + 6], [cx + 24, y1 + 6]];
          out.push(fil(fa, 10), fil(fb, 10));
          out.push(h.chemin([[cx - 44, y1 - 13], [cx + 44, y1 + 9], [cx + 43, y1 + 12], [cx - 45, y1 - 10]], A.plein, true));
          out.push(rougit(cx, y1, 6, 16, 9, 2));
          // un seul brin, tendu d'un bout nu à l'autre
          const ga = [[0, y2], [cx - 30, y2]], gb = [[z.l, y2], [cx + 30, y2]];
          out.push(fil(ga, 4), fil(gb, 4));
          out.push(h.path(`M ${cx - 26} ${y2} Q ${cx - 10} ${y2 - 9} ${cx} ${y2 - 3} T ${cx + 26} ${y2}`, A.detail));
          out.push(rougit(cx, y2 - 4, 5, 13, 8, 4));
          return out.join('\n');
        },
        renvois: z => {
          const { y1, y2, cx } = vD(z);
          return [
            { n: 9, rond: [cx - 30, y1 + 40], cible: [cx - 12, y1 - 1], texte: 'au lieu de 1 : une mine de crayon' },
            { n: 10, rond: [cx + 30, y2 + 38], cible: [cx + 14, y2 - 1], texte: 'ou un seul brin de fil multibrin' },
          ];
        },
      },
    },
  };
};
