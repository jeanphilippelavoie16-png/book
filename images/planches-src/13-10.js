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

module.exports = (h) => {
  const F = h.formes, A = h.a;
  const f = v => Math.round(v * 10) / 10;
  const blanc = a => a.replace('fill="none"', 'fill="#ffffff"');
  const gen = s => { let g = s; return () => (g = (g * 16807) % 2147483647) / 2147483647; };
  const NOIR = '#1A1A1A';

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
    let m = '';
    pts.forEach(([x, y], i) => {
      if (i === 0 || i === 16 || i % 2) return;
      const e = 3 + r() * 4;
      m += `M ${f(x)} ${f(y)} q ${f((r() - 0.5) * 6)} ${f(-e)} ${f((r() - 0.5) * 8)} ${f(-e * 1.5)} `;
    });
    out.push(h.path(m, A.fin));
    const cy = yG - H + 7, rx = w * 0.3, ry = 7;
    out.push(h.ellipse(cx, cy, rx, ry, blanc(A.detail)));
    return { svg: out.join('\n'), creux: [cx, cy], rx, ry };
  };

  // La laine d'acier (JP, 19 octobre 2026, sur la première version en petites boucles : « on dirait du poil de pubis »).
  // En vrai, la laine d'acier fine, c'est un tampon de fibres de métal très fines, longues et presque droites, couchées
  // en couches selon deux ou trois directions ; étirée en boule lâche, un nuage aéré de fils droits, avec du jour au
  // travers. Choisie sur la feuille d'essai images/planches-src/_essai-laine-acier.js (façon D) :
  //   la silhouette : un rond (boule) ou un coussin (tampon), déformé par quelques ondes lentes ;
  //   les fils : des bouts de fils presque droits (une ondulation de moins de 4 % de leur longueur), couchés selon deux
  //   ou trois directions dominantes, plus nombreux au centre (là où la boule est épaisse), clairsemés au bord ; vers le
  //   bord, le fil se couche le long de la silhouette (une boule, pas une galette) ; quelques bouts droits dépassent ;
  //   le métal : un voile de fils gris clair sous les fils gris foncé ; quelques fils noirs du côté de l'ombre, en bas à
  //   droite ; quelques fils clairs par-dessus du côté de la lumière, en haut à gauche.
  // lache : 0 (le tampon) à 1 (la boule lâche) ; posee : rien ne pend sous la boule (elle est dans le nid).
  const FONCE = '#3A3A3A', CLAIR = '#CFCFCF';
  const fibre = (c, ep) => `fill="none" stroke="${c}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;
  const laine = (cx, cy, rx, ry, graine, { lache = 1, posee = false } = {}) => {
    const r = gen(graine * 7919 + 13), boule = lache > 0.5;
    const forme = boule ? 2 : 3.2, enroule = boule ? 0.7 : 0.25;
    const dirs = boule ? [-0.24, 0.18, 0.8] : [0, -0.12, 0.14], poids = boule ? [0.45, 0.4, 0.15] : [0.6, 0.2, 0.2];
    const jit = boule ? 0.12 : 0.06, amp = boule ? 0.035 : 0.02, gam = boule ? 1.5 : 0.35;
    const ondes = [2, 3, 4, 5].map(k => [k, (boule ? 0.07 : 0.025) / (k - 1) * (0.6 + r() * 0.8), r() * 6.283]);
    const R = th => 1 + ondes.reduce((s, [k, a, p]) => s + a * Math.sin(k * th + p), 0);
    const rho = (x, y) => {
      const dx = (x - cx) / rx, dy = (y - cy) / ry;
      return Math.pow(Math.pow(Math.abs(dx), forme) + Math.pow(Math.abs(dy), forme), 1 / forme) / R(Math.atan2(dy, dx));
    };
    const dedans = (x, y) => rho(x, y) <= 1;
    const corde = (p, u) => {
      const t = [0, 0];
      for (const s of [-1, 1]) { let k = 0; while (k < 4 * Math.max(rx, ry) && dedans(p[0] + u[0] * k * s, p[1] + u[1] * k * s)) k += 0.75; t[s > 0 ? 1 : 0] = k * s; }
      return t;
    };
    const tireDir = () => { let x = r(), i = 0; while (i < poids.length - 1 && x > poids[i]) { x -= poids[i]; i++; } return dirs[i] + (r() - 0.5) * 2 * jit; };
    const tirePoint = () => {
      for (let essai = 0; essai < 600; essai++) {
        const x = cx + (r() * 2 - 1) * rx * 1.1, y = cy + (r() * 2 - 1) * ry * 1.1, q = rho(x, y);
        if (q <= 1 && r() < Math.pow(Math.sqrt(Math.max(0, 1 - q * q)), gam)) return [x, y];
      }
      return [cx, cy];
    };
    const unFil = (a, b) => {
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-u[1], u[0]];
      const e1 = (r() - 0.5) * 2 * amp * L, e2 = (r() - 0.5) * 2 * amp * L;
      const c1 = [a[0] + u[0] * L / 3 + n[0] * e1, a[1] + u[1] * L / 3 + n[1] * e1];
      const c2 = [a[0] + u[0] * 2 * L / 3 + n[0] * e2, a[1] + u[1] * 2 * L / 3 + n[1] * e2];
      return `M ${f(a[0])} ${f(a[1])} C ${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(b[0])} ${f(b[1])} `;
    };
    const lDepasse = () => (boule ? 4 + r() * 10 : 2 + r() * 5) * Math.max(rx, ry) / 46;
    // un fil de longueur visible L sur la corde de la silhouette qui passe par p ; rend la longueur posée
    const pose = (liste, p, u, L, depasse) => {
      const [t0, t1] = corde(p, u), C = t1 - t0;
      if (C < 3) return 0;
      L = Math.min(L, C);
      let s0 = Math.max(t0, Math.min(t1 - L, (r() - 0.5) * L - L / 2)), s1 = s0 + L;
      if (depasse) {
        let bas = r() < 0.5;
        if (posee && p[1] + u[1] * (bas ? t0 - depasse : t1 + depasse) > cy + ry * 0.35) bas = !bas;
        if (posee && p[1] + u[1] * (bas ? t0 - depasse : t1 + depasse) > cy + ry * 0.35) depasse = 0;
        if (bas) s0 = t0 - depasse; else s1 = t1 + depasse;
      }
      const a = [p[0] + u[0] * s0, p[1] + u[1] * s0], b = [p[0] + u[0] * s1, p[1] + u[1] * s1];
      liste.push([unFil(a, b), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2]);
      return s1 - s0;
    };
    // la quantité de fil : un taux de couverture visé (trait de 0,5) sur l'aire de la silhouette
    const aire = Math.PI * rx * ry, pDep = boule ? 0.12 : 0.07;
    const longueur = () => (boule ? 0.16 + r() * 0.34 : 0.3 + r() * 0.45) * 2 * rx;
    const remplir = (liste, encre) => {
      let tot = 0, garde = 0;
      while (tot < encre && garde++ < 4000) {
        const p = tirePoint();
        let th = tireDir();
        const dx = (p[0] - cx) / rx, dy = (p[1] - cy) / ry, q = Math.min(1, rho(p[0], p[1]));
        let tg = Math.atan2(Math.cos(Math.atan2(dy, dx)) * ry, -Math.sin(Math.atan2(dy, dx)) * rx);
        while (tg - th > Math.PI / 2) tg -= Math.PI;
        while (th - tg > Math.PI / 2) tg += Math.PI;
        th += (tg - th) * enroule * q * q;
        tot += pose(liste, p, [Math.cos(th), Math.sin(th)], longueur(), r() < pDep ? lDepasse() : 0);
      }
    };
    const fonce = [], voile = [];
    remplir(fonce, (boule ? 0.45 : 0.8) * aire / 0.5);
    remplir(voile, (boule ? 0.35 : 0.3) * aire / 0.5);
    let dFonce = '', dNoir = '', dClair = '', dVoile = '';
    for (const [d, mx, my] of fonce) {
      const lum = -((mx - cx) / rx + (my - cy) / ry) * 0.7;   // > 0 vers le haut à gauche, d'où vient la lumière
      if (lum > 0.2 && r() < 0.22) dClair += d;
      else if (lum < -0.25 && r() < 0.4) dNoir += d;
      else dFonce += d;
    }
    for (const [d] of voile) dVoile += d;
    // le blanc sous la laine : il cache le nid derrière, un peu en retrait des bouts de fils
    const pts = [];
    for (let k = 0; k < 64; k++) {
      const th = k / 64 * 2 * Math.PI, c = Math.cos(th), s = Math.sin(th);
      const q = R(th) * 0.84 / Math.pow(Math.pow(Math.abs(c), forme) + Math.pow(Math.abs(s), forme), 1 / forme);
      pts.push([cx + c * rx * q, cy + s * ry * q]);
    }
    return [h.chemin(pts, A.blanc, true), h.path(dVoile, fibre(CLAIR, 0.5)), h.path(dFonce, fibre(FONCE, 0.5)),
      h.path(dNoir, fibre(NOIR, 0.5)), h.path(dClair, fibre(CLAIR, 0.7))].join('\n');
  };

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


  // Deux bouts de doigts en gros plan (la méthode de la 27-04) : chaque bout est le bout d'un doigt tendu de la main
  // simple (pose pointe, vue du pouce), qui descend du haut de la vue ; sa pulpe (le point le plus à droite, ou le
  // plus à gauche, dans les 20 mm du bout) tombe contre un côté de la pile. Le reste de la main sort par le haut.
  const contourMain = m => {
    const n = ((String(m.svg).match(/<path d="([^"]+)" fill="#FFFFFF"/) || [])[1] || '').match(/-?\d+(?:\.\d+)?/g) || [];
    const P = [];
    for (let i = 0; i + 1 < n.length; i += 2) P.push([+n[i], +n[i + 1]]);
    return P;
  };
  const boutDoigt = (aDroite, ang, e, px, py, cote) => {
    const o = { pose: 'pointe', vue: 'pouce', cote, echelle: e, angle: ang, ancre: 'bout' };
    const pulpe = m => contourMain(m).filter(q => Math.hypot(q[0] - m.bout[0], q[1] - m.bout[1]) < 20 * e)
      .reduce((a, q) => ((aDroite ? q[0] > a[0] : q[0] < a[0]) ? q : a));
    const m0 = F.mainSimple({ ...o, x: px, y: py }), q = pulpe(m0);
    return F.mainSimple({ ...o, x: 2 * px - q[0], y: 2 * py - q[1] });
  };
  const dansVue = (z, id, contenu) => `<clipPath id="${id}"><rect x="0" y="0" width="${f(z.l)}" height="${f(z.h)}"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu}\n</g>`;

  // L'angle qui met l'axe de la prise (l'objet tenu) dans la direction voulue (degrés écran).
  const poser = (o, dir) => dir - F.mainSimple({ ...o, x: 0, y: 0, angle: 0, avantbras: false }).prise.angle;

  // ─── Les géométries des vues ─────────────────────────────────────────────────────────────────────────
  const vA = z => {
    const yG = z.h - 12, w = Math.min(170, z.l * 0.6), H = 50;
    const n = { cx: z.l - w / 2 - 8, yG, w, H };
    const tampon = { cx: 52, cy: 46, rx: 38, ry: 20 };
    const boule = { cx: n.cx, cy: yG - H - 14, rx: 46, ry: 30 };
    return { n, tampon, boule };
  };
  const vB = z => {
    const yG = z.h - 12, w = Math.min(240, z.l * 0.72), H = 62;
    const n = { cx: Math.round(z.l * 0.44), yG, w, H };
    const k = 1.55;                                      // unités de vue par mm : la pile, les doigts, la laine à la même échelle
    const L = 48.5 * k, W = 26.5 * k, D = 17.5 * k * 0.5;
    const bx = n.cx - W / 2 + 6, bB = yG - H - 40;      // la pile, debout, les bornes en bas, posées sur la laine
    const boule = { cx: n.cx, cy: yG - H - 14, rx: 66, ry: 34 };
    return { n, k, L, W, D, bx, bB, bT: bB - L, boule };
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
    desc: 'En haut, la méthode. Un tampon de laine d’acier la plus fine, puis la même laine étirée en boule lâche, grosse comme le poing, posée dans le creux d’un nid de fibres. Une pile de 9 V tenue dans le poing, debout, les deux bornes en bas posées sur la laine, une flèche rouge vers le bas : toucher ; autour du point touché, la laine rougit. En bas, après un filet, les autres façons. Sans pile de 9 V : la batterie de l’auto, un fil attaché à chaque borne ; les fils, coupés d’un trait pour dire qu’ils sont longs, finissent dans deux poings qui les tiennent par la gaine, et leurs bouts nus touchent la laine dans le nid. Sans laine : une mine de crayon posée en travers des deux fils nus, ou un seul brin de fil multibrin tendu d’un fil à l’autre.',
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
          const g = vB(z), { n, k, L, W, D, bx, bB, bT, boule } = g, out = [];
          out.push(h.ligne(0, n.yG, z.l, n.yG, A.arete));
          const N = nid(n.cx, n.yG, n.w, n.H, 5);
          out.push(N.svg);
          out.push(dansLeCreux(N, z, 'creux-1310b', laine(boule.cx, boule.cy, boule.rx, boule.ry, 9, { posee: true })));
          // la laine rougit sous les bornes
          const xc = bx + W * 0.3;
          out.push(lueur(xc, bB + 3, 11));
          out.push(rougit(xc, bB + 3, 6, 15, 10, 5));
          // la pile : la face avant, la face de droite à l'ombre, les deux bornes en bas
          const pile = [
            h.chemin([[bx + W, bT], [bx + W + D, bT - D * 0.6], [bx + W + D, bB - D * 0.6], [bx + W, bB]], A.ombre, true),
            h.chemin([[bx + W, bT], [bx + W + D, bT - D * 0.6], [bx + W + D, bB - D * 0.6], [bx + W, bB]], A.arete, true),
            h.rect(bx, bT, W, L, blanc(A.contour)),
            h.ligne(bx + 4, bT + L * 0.3, bx + W - 4, bT + L * 0.3, A.fin),
            // la borne ronde et la borne à six pans
            h.rect(bx + W * 0.2, bB, 4.4 * k, 2.6 * k, blanc(A.arete)),
            h.chemin([[bx + W * 0.62, bB], [bx + W * 0.62 + 5.6 * k, bB], [bx + W * 0.62 + 5.6 * k, bB + 2], [bx + W * 0.62 + 4.6 * k, bB + 2.6 * k], [bx + W * 0.62 + 1, bB + 2.6 * k], [bx + W * 0.62, bB + 2]], blanc(A.arete), true),
          ].join('\n');
          // la pile pincée par le haut entre deux bouts de doigts (un poing la cacherait presque toute : elle fait 48,5 mm)
          out.push(pile);
          const yp = bT + L * 0.22;
          out.push(dansVue(z, 'doigts-1310', [boutDoigt(true, 84, k, bx - 0.5, yp, 'droite').svg, boutDoigt(false, 96, k * 1.06, bx + W + 0.5, yp, 'gauche').svg].join('\n')));
          // toucher : la flèche du geste
          out.push(h.geste(`M ${f(bx - 16)} ${f(bB - 42)} L ${f(bx - 16)} ${f(bB - 6)}`));
          return out.join('\n');
        },
        renvois: z => {
          const { bx, bB, W, boule } = vB(z);
          return [
            { n: 4, rond: [bx - 42, bB - 30], cible: [bx - 17, bB - 26], texte: 'poser les deux bornes sur la laine' },
            { n: 5, rond: [boule.cx + boule.rx + 26, boule.cy + 6], cible: [bx + W * 0.3 + 16, bB + 4], texte: 'elle rougit : le feu avance seul' },
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
          out.push(lueur(pz[0], yBas + 1, 10));
          out.push(fil(fA, 7), fil(fB, 7));
          out.push(rougit(pz[0], yBas + 1, 5, 14, 9, 9));
          // le trait de coupure : le fil est long, la batterie est à un bras du feu
          const xc = (bornes[1][0] + pz[0]) / 2 - 10;
          for (const dx of [-3, 3]) out.push(h.ligne(xc + dx - 5, y - 52, xc + dx + 5, y - 22, A.arete));
          // le poing tient les deux fils par la gaine (le fil d'abord : le blanc du poing le cache dedans) ; l'avant-bras
          // part à droite et sort de la vue
          const o = { pose: 'prise-corde', vue: 'paume', cote: 'droite', diametre: 12, echelle: 0.8 };
          out.push(F.mainSimple({ ...o, x: pz[0], y: pz[1], angle: poser(o, 90), avantbras: { bord: { x0: 0, y0: 0, x1: z.l, y1: z.h }, longueur: 'bord', fin: [[z.l, 0], [z.l, z.h]] } }).svg);
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
