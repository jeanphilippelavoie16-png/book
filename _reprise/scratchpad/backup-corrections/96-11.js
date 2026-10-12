// Planche 96-11 — La balance à fléau (chapitre 96, §9, « Mesurer sans instrument », ligne « Le poids :
// une balance à fléau » ; la coquille et le niveau marqué au couteau : étape 17).
// Ce que le chapitre dit, et rien de plus : un bâton droit pendu par son milieu à une ficelle, jamais
// ailleurs ; une encoche de chaque côté, à la même distance du milieu ; d'un côté la bouteille de
// plastique, de l'autre le sac ; à vide, un caillou au côté léger, au même crochet (la tare) ; la
// bouteille pleine d'un litre d'eau (1 kg) ou au quart (250 g) ; le sac rempli de coquille broyée
// jusqu'à l'équilibre ; puis le niveau marqué au couteau dans le contenant qui servira toujours.
// Le point de suspension ne se déplace jamais : pour 250 g, c'est la bouteille qui se remplit au quart.
// Aucune cote en mm : le chapitre ne donne ni la longueur du bâton ni l'écart des encoches. Les deux
// cotes « = » disent seulement que les deux bras sont égaux.
// Vue 1 : le montage à l'équilibre. Vues 2 et 3 : l'encoche de la bouteille, de face et en coupe, à
// la même échelle et sur le même axe. Vue 4 : la tare, à vide. Vue 5 : la bouteille, pleine ou au
// quart. Vue 6 : le niveau marqué au couteau.
// Unités : mm, y vers le bas ; origine au milieu de l'axe du bâton.
module.exports = (h) => {
  const F = h.formes;
  const NOIR = '#1A1A1A';
  const r1 = v => Math.round(v * 10) / 10;
  const blanc = (t = h.a.arete) => t.replace('fill="none"', 'fill="#fff"');
  const rad = d => d * Math.PI / 180;
  let nClip = 0;

  // Catmull-Rom : une suite de points devient une courbe qui passe par chacun.
  const lisse = (pts, ferme = false) => {
    const n = pts.length, get = i => (ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    let d = `M ${r1(pts[0][0])} ${r1(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  const poly = pts => pts.map((p, i) => `${i ? 'L' : 'M'} ${r1(p[0])} ${r1(p[1])}`).join(' ');
  // Un fil ou une ficelle en bande à deux bords : un trait noir large, un trait blanc par-dessus.
  const fil = (d, W, bord = 1.2) =>
    `<path d="${d}" fill="none" stroke="${NOIR}" stroke-width="${r1(W)}" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="${d}" fill="none" stroke="#FFFFFF" stroke-width="${r1(Math.max(0.6, W - 2 * bord))}" stroke-linecap="round" stroke-linejoin="round"/>`;

  // Cadre : l'emprise en mm [x0, y0, x1, y1] remplit la vue, centrée.
  const cadre = (z, bb, m = 6) => {
    const [x0, y0, x1, y1] = bb;
    const s = Math.min((z.l - 2 * m) / (x1 - x0), (z.h - 2 * m) / (y1 - y0));
    const ox = m + ((z.l - 2 * m) - (x1 - x0) * s) / 2 - x0 * s;
    const oy = m + ((z.h - 2 * m) - (y1 - y0) * s) / 2 - y0 * s;
    return { s, P: (x, y) => [r1(ox + x * s), r1(oy + y * s)] };
  };

  // ── Les pièces ────────────────────────────────────────────────────────────────────────────
  const R = 14;                 // rayon du bâton
  const XE = 210;               // l'encoche, de chaque côté du milieu
  const XB = 250;               // le bout du bâton
  const YN = -7;                // le fond de l'encoche
  const LC = 63;                // le crochet, du fond de l'encoche à son bas

  // Le bâton de face, de xa à xb, avec ses encoches ; T : mm → px (peut tourner).
  const baton = (T, xa, xb, encoches, bouts = ['bout', 'bout']) => {
    const haut = [[xa, -R]];
    for (const xn of encoches) haut.push([xn - 6, -R], [xn, YN], [xn + 6, -R]);
    haut.push([xb, -R]);
    const bout = (x, sg, genre) => genre === 'bout'
      ? [[x + sg * 1.5, -9], [x + sg * 2.2, 0], [x + sg * 1.5, 9]]
      : [[x + sg * 4, -8], [x - sg * 2, -2], [x + sg * 3, 4], [x - sg * 1, 10]];
    const pts = [...haut, ...bout(xb, 1, bouts[1]), [xb, R], [xa, R], ...bout(xa, -1, bouts[0]).reverse()];
    const out = [h.chemin(pts.map(p => T(...p)), blanc(h.a.contour), true)];
    // le fil du bois, en traits fins interrompus
    for (const [y, pas] of [[-5, 90], [5, 130]]) {
      for (let x = xa + 12; x < xb - 20; x += pas) {
        const x2 = Math.min(x + pas * 0.55, xb - 10);
        if (encoches.some(xn => xn > x - 10 && xn < x2 + 10)) continue;
        out.push(h.ligne(...T(x, y), ...T(x2, y + 0.8), h.a.fin));
      }
    }
    return out.join('\n');
  };

  // La bouteille de plastique d'un litre, debout, de face ; yh le haut du bouchon, cx son axe.
  // o.eau : le niveau de l'eau (mm sous le haut du bouchon) ; o.plein : le trait du niveau plein.
  const EAU_PLEIN = 40, EAU_QUART = 225;
  const bouteille = (P, cx, yh, o = {}) => {
    const Q = (x, y) => P(cx + x, yh + y).join(' ');
    const d = `M ${Q(-13, 16)} L ${Q(-13, 40)} C ${Q(-13, 55)} ${Q(-38, 58)} ${Q(-38, 80)} L ${Q(-38, 270)} ` +
      `Q ${Q(-38, 280)} ${Q(-28, 280)} L ${Q(28, 280)} Q ${Q(38, 280)} ${Q(38, 270)} L ${Q(38, 80)} ` +
      `C ${Q(38, 58)} ${Q(13, 55)} ${Q(13, 40)} L ${Q(13, 16)} Z`;
    const out = [h.path(d, h.a.blanc)];
    if (o.eau != null) {
      const id = `q9611x${nClip++}`;
      const [xa, ya] = P(cx - 40, yh + o.eau), [xb, yb] = P(cx + 40, yh + 282);
      out.push(`<clipPath id="${id}"><path d="${d}" fill="none"/></clipPath>`);
      out.push(`<g clip-path="url(#${id})">${h.rect(xa, ya, xb - xa, yb - ya, h.a.hachure('eau', 'aucun'))}` +
        `${h.ligne(xa, ya, xb, ya, h.a.arete)}</g>`);
    }
    if (o.plein) {
      const [xa, y] = P(cx - 30, yh + EAU_PLEIN), [xb] = P(cx + 30, 0);
      out.push(h.ligne(xa, y, xb, y, h.a.cache));
    }
    out.push(h.path(d, h.a.contour));
    // le rebord du col et le bouchon strié
    out.push(h.chemin([P(cx - 17, yh + 22), P(cx + 17, yh + 22), P(cx + 17, yh + 26), P(cx - 17, yh + 26)], blanc(h.a.arete), true));
    out.push(h.chemin([P(cx - 15, yh), P(cx + 15, yh), P(cx + 15, yh + 16), P(cx - 15, yh + 16)], blanc(h.a.arete), true));
    for (const x of [-9, -3, 3, 9]) out.push(h.ligne(...P(cx + x, yh + 3), ...P(cx + x, yh + 13), h.a.fin));
    return out.join('\n');
  };
  // La ficelle de la bouteille : un tour sous le rebord du col, deux brins de part et d'autre du
  // bouchon, noués au-dessus ; yk le nœud.
  const harnais = (P, cx, yh, yk, trait = h.a.arete) => [
    h.path(lisse([P(cx, yk), P(cx - 15, yh - 8), P(cx - 17, yh + 8), P(cx - 13, yh + 29)]), trait),
    h.path(lisse([P(cx, yk), P(cx + 15, yh - 8), P(cx + 17, yh + 8), P(cx + 13, yh + 29)]), trait),
    h.ligne(...P(cx - 14, yh + 29), ...P(cx + 14, yh + 29), trait),
    h.ligne(...P(cx - 14, yh + 32), ...P(cx + 14, yh + 32), trait),
    h.ellipse(...P(cx, yk), 2.2, 1.8, h.a.plein),
  ].join('\n');

  // Le sac pendu par sa gueule froncée, nouée ; yt le nœud. plein : bombé de coquille ; sinon flasque.
  const sac = (P, cx, yt, plein) => {
    const Q = (x, y) => P(cx + x, yt + y);
    const out = [];
    const corps = plein
      ? [[-6, 6], [-20, 24], [-40, 52], [-55, 88], [-61, 124], [-58, 158], [-44, 182], [-20, 194], [4, 196],
        [28, 191], [48, 178], [60, 152], [62, 118], [55, 84], [40, 50], [20, 24], [6, 6]]
      : [[-6, 6], [-14, 40], [-24, 90], [-33, 136], [-37, 150], [-12, 146], [8, 149], [36, 153], [34, 132],
        [24, 88], [14, 40], [6, 6]];
    out.push(h.path(lisse(corps.map(p => Q(...p)), true), blanc(h.a.contour)));
    // les plis qui partent de la gueule
    const plis = plein
      ? [[[-3, 12], [-12, 44], [-22, 76]], [[0, 12], [1, 50], [4, 88]], [[3, 12], [14, 40], [26, 64]],
        [[-30, 170], [-10, 180], [14, 178]]]
      : [[[-3, 12], [-10, 60], [-18, 120]], [[0, 12], [2, 70], [0, 140]], [[3, 12], [10, 60], [20, 128]]];
    for (const p of plis) out.push(h.path(lisse(p.map(q => Q(...q))), h.a.fin));
    // la toile froncée au-dessus du nœud
    const oreilles = [[-5, 2], [-11, -10], [-17, -22], [-9, -28], [-3, -20], [2, -30], [9, -26], [16, -18], [7, -8], [5, 2]];
    out.push(h.path(lisse(oreilles.map(p => Q(...p)), true), blanc(h.a.arete)));
    out.push(h.path(lisse([Q(-2, 0), Q(-5, -16), Q(-8, -24)]), h.a.fin));
    out.push(h.path(lisse([Q(2, 0), Q(4, -14), Q(5, -24)]), h.a.fin));
    // la ficelle qui la noue : deux tours
    out.push(h.chemin([Q(-7, 1), Q(7, 3)], h.a.arete), h.chemin([Q(-7, 5), Q(7, 7)], h.a.arete));
    return out.join('\n');
  };

  // Un caillou, contour un peu irrégulier, et la ficelle qui le ceinture.
  const caillou = (P, cx, cy, rx, ry, ficelle = true) => {
    const bosses = [1, 0.92, 1.04, 0.95, 1.02, 0.9, 1.05, 0.97, 1, 0.93];
    const pts = bosses.map((b, i) => { const t = i / bosses.length * 2 * Math.PI; return P(cx + Math.cos(t) * rx * b, cy + Math.sin(t) * ry * b); });
    const out = [h.path(lisse(pts, true), blanc(h.a.contour))];
    out.push(h.path(lisse([P(cx - rx * 0.5, cy + ry * 0.35), P(cx - rx * 0.2, cy + ry * 0.5)]), h.a.fin));
    out.push(h.path(lisse([P(cx + rx * 0.3, cy - ry * 0.45), P(cx + rx * 0.55, cy - ry * 0.2)]), h.a.fin));
    if (ficelle) out.push(h.path(lisse([P(cx - rx * 0.97, cy - ry * 0.15), P(cx, cy - ry * 0.02), P(cx + rx * 0.97, cy + ry * 0.12)]), h.a.arete));
    return out.join('\n');
  };

  // La perche d'où pend la ficelle, cassée aux deux bouts.
  const perche = (P, xa, xb, yc, r) => {
    const cass = (x, sg) => [[x, yc - r], [x + sg * 5, yc - r * 0.4], [x - sg * 3, yc + r * 0.2], [x + sg * 4, yc + r]];
    const pts = [...cass(xa, -1), ...cass(xb, 1).reverse()];
    const d = `M ${P(xa, yc - r).join(' ')} L ${P(xb, yc - r).join(' ')} ` + lisse(cass(xb, 1).map(p => P(...p))).replace(/^M [^C]*/, '') +
      ` L ${P(xa, yc + r).join(' ')} ` + lisse(cass(xa, -1).reverse().map(p => P(...p))).replace(/^M [^C]*/, '') + ' Z';
    void pts;
    const out = [h.path(d, blanc(h.a.contour))];
    for (const [x, y, l] of [[xa + 20, yc - r * 0.4, 70], [xa + 120, yc + r * 0.35, 60], [xb - 110, yc - r * 0.5, 80], [xb - 60, yc + r * 0.45, 40]])
      out.push(h.ligne(...P(x, y), ...P(x + l, y + 1), h.a.fin));
    return out.join('\n');
  };

  // ── Vue 1 : le montage, à l'équilibre ────────────────────────────────────────────────────
  const YP = -190, RP = 26;           // la perche
  const YK_B = 130, YH_B = 180;       // bouteille : nœud du harnais, haut du bouchon
  const YT_S = 200;                   // sac : le nœud de la gueule
  // Le caillou de la tare pend au même crochet que la bouteille ; il s'appuie contre sa ficelle.
  const CAIL = [XE + 19, 100];
  const vueMontage = z => {
    const { s, P } = cadre(z, [-282, -222, 272, 462], 4);
    const out = [];
    const T = (x, y) => P(x, y);
    out.push(perche(P, -130, 130, YP, RP));
    // la ficelle : un tour sur la perche, puis droit au milieu du bâton
    out.push(h.ligne(...P(0, YP + RP), ...P(0, -R), h.a.arete));
    out.push(h.ligne(...P(-6, YP + RP), ...P(-2, YP - RP), h.a.arete), h.ligne(...P(2, YP + RP), ...P(6, YP - RP), h.a.arete));
    // les cotes égales, de l'encoche au milieu, et leurs lignes de rappel
    const yc = -84;
    for (const x of [-XE, XE]) out.push(h.ligne(...P(x, -22), ...P(x, yc - 8), h.a.fin));
    out.push(h.cote(...P(-XE, yc), ...P(0, yc), '='), h.cote(...P(0, yc), ...P(XE, yc), '='));
    // le bâton, ses deux tours de ficelle au milieu, et l'équerre avec la ficelle
    out.push(baton(T, -XB, XB, [-XE, XE]));
    out.push(h.ligne(...P(-6, -R), ...P(-1, R), h.a.arete), h.ligne(...P(1, -R), ...P(6, R), h.a.arete));
    out.push(h.chemin([P(0, -R - 26), P(26, -R - 26), P(26, -R)], h.a.detail));
    // à gauche, le sac de coquille
    out.push(h.ligne(...P(-XE, YN + LC), ...P(-XE, YT_S), h.a.arete));
    out.push(sac(P, -XE, YT_S, true));
    // à droite, la bouteille pleine, et le caillou de la tare au même crochet
    out.push(harnais(P, XE, YH_B, YK_B));
    out.push(bouteille(P, XE, YH_B, { eau: EAU_PLEIN }));
    out.push(h.ligne(...P(XE, YN + LC), ...P(CAIL[0] - 7, CAIL[1] - 14), h.a.arete));
    out.push(caillou(P, ...CAIL, 19, 15));
    out.push(h.ligne(...P(XE, YN + LC), ...P(XE, YK_B), h.a.arete));
    // les deux crochets, dans leurs encoches (de face, on les voit par la tranche)
    for (const x of [-XE, XE]) out.push(h.ligne(...P(x, YN - 9), ...P(x, YN + LC), h.a.contour));
    return { svg: out.join('\n'), P, s };
  };

  // ── Vues 2 et 3 : l'encoche de la bouteille, de face et en coupe (même échelle, même axe) ──
  // Une seule échelle pour les deux : la vue de face (144 px) tient 76 mm, la coupe (111 px) 50 mm.
  const BB_Y = [-40, 150], S_DET = 1.73;
  const echDetail = z => ({ s: S_DET, oy: 6 + ((z.h - 12) - (BB_Y[1] - BB_Y[0]) * S_DET) / 2 - BB_Y[0] * S_DET });
  // La tige du crochet vue par la tranche : une bande à bouts ronds.
  const tige = (P, x, ya, yb, W) => {
    const r = W / 2, [px, pa] = P(x, ya), [, pb] = P(x, yb);
    return h.path(`M ${r1(px - r)} ${r1(pa + r)} A ${r1(r)} ${r1(r)} 0 0 1 ${r1(px + r)} ${r1(pa + r)} L ${r1(px + r)} ${r1(pb - r)} A ${r1(r)} ${r1(r)} 0 0 1 ${r1(px - r)} ${r1(pb - r)} Z`, blanc(h.a.arete));
  };
  const ficelle = (pts, s, debut = 'coupe', fin = 'coupe') => F.corde(pts, { ep: 2.2 * s, debut, fin, trait: 'detail' });
  const vueFace = z => {
    const { s, oy } = echDetail(z);
    const ox = (z.l - 76 * s) / 2 + 32 * s;
    const P = (u, y) => [r1(ox + u * s), r1(oy + y * s)];
    const out = [];
    out.push(baton(P, -30, XB - XE, [0], ['casse', 'bout']));
    // le caillou et sa ficelle, appuyés contre la ficelle de la bouteille
    const c = [CAIL[0] - XE, CAIL[1]];
    out.push(ficelle([P(0.5, YN + LC - 2), P(c[0] - 7, c[1] - 14)], s));
    out.push(h.ellipse(...P(4.6, 67), r1(2.2 * s), r1(2.6 * s), h.a.plein));
    out.push(caillou(P, ...c, 19, 15));
    // la ficelle de la bouteille, jusqu'à la cassure
    out.push(ficelle([P(0, YN + LC - 2), P(0, 146)], s, 'coupe', 'fixe'));
    out.push(h.ellipse(...P(0, 70), r1(2.2 * s), r1(2.6 * s), h.a.plein));
    // le crochet par la tranche, assis dans l'encoche, devant le bâton
    out.push(tige(P, 0, YN - 9.5, YN + LC + 1.5, 3 * s));
    return { svg: out.join('\n'), P, s };
  };
  // Le crochet en S, vu en coupe : le haut passe par-dessus le bâton et s'appuie dans l'encoche,
  // le bas porte les deux ficelles.
  const C1 = [0, 2.7], R1 = 17, C2 = [-2, 46], R2 = 10;
  const crochetS = () => {
    const pts = [];
    for (let t = 150; t <= 400; t += 10) pts.push([C1[0] + R1 * Math.cos(rad(t)), C1[1] + R1 * Math.sin(rad(t))]);
    const A = pts[pts.length - 1];
    const B = [C2[0] - R2, C2[1]];
    const ta = [-Math.sin(rad(40)), Math.cos(rad(40))];
    for (let i = 1; i < 12; i++) {
      const t = i / 12, c1 = [A[0] + 12 * ta[0], A[1] + 12 * ta[1]], c2 = [B[0], B[1] - 12];
      const m = 1 - t;
      pts.push([m * m * m * A[0] + 3 * m * m * t * c1[0] + 3 * m * t * t * c2[0] + t * t * t * B[0],
        m * m * m * A[1] + 3 * m * m * t * c1[1] + 3 * m * t * t * c2[1] + t * t * t * B[1]]);
    }
    for (let t = 180; t >= -40; t -= 10) pts.push([C2[0] + R2 * Math.cos(rad(t)), C2[1] + R2 * Math.sin(rad(t))]);
    return pts;
  };
  const vueCoupe = z => {
    const { s, oy } = echDetail(z);
    const ox = (z.l - 50 * s) / 2 + 24 * s;
    const P = (u, y) => [r1(ox + u * s), r1(oy + y * s)];
    const out = [];
    const xc = Math.sqrt(R * R - YN * YN);
    // le bâton coupé à l'encoche : la section sous le fond de l'encoche, hachurée ; au-delà, le
    // dessus du bâton, entier
    out.push(`<path d="M ${P(-xc, YN).join(' ')} A ${r1(R * s)} ${r1(R * s)} 0 0 1 ${P(xc, YN).join(' ')}" ${h.a.arete}/>`);
    const sec = `M ${P(-xc, YN).join(' ')} L ${P(xc, YN).join(' ')} A ${r1(R * s)} ${r1(R * s)} 0 1 1 ${P(-xc, YN).join(' ')} Z`;
    out.push(h.path(sec, h.a.blanc), h.path(sec, h.a.hachure('bois', 'contour')));
    // le caillou, derrière la ficelle de la bouteille ; chacun sa boucle au bas du crochet
    out.push(ficelle([P(2, 53), P(2, 86)], s));
    out.push(h.ellipse(...P(2, 76), r1(2.6 * s), r1(2.2 * s), h.a.plein));
    out.push(caillou(P, 2, 100, 19, 15));
    out.push(ficelle([P(-6, 53), P(-6, 146)], s, 'coupe', 'fixe'));
    out.push(h.ellipse(...P(-6, 68), r1(2.6 * s), r1(2.2 * s), h.a.plein));
    // le crochet, puis les deux boucles repassées par-dessus son fil
    out.push(F.corde(crochetS().map(p => P(...p)), { ep: 3 * s, debut: 'coupe', fin: 'coupe', trait: 'arete' }));
    out.push(ficelle([P(2, 52.4), P(2, 60)], s));
    out.push(ficelle([P(-6, 52.2), P(-6, 60)], s));
    return { svg: out.join('\n'), P, s };
  };

  // ── Vue 4 : la tare, à vide ───────────────────────────────────────────────────────────────
  const A_T = rad(7);
  const pivot = [0, -R];
  const rot = (x, y) => {
    const dx = x - pivot[0], dy = y - pivot[1];
    return [pivot[0] + dx * Math.cos(A_T) + dy * Math.sin(A_T), pivot[1] - dx * Math.sin(A_T) + dy * Math.cos(A_T)];
  };
  const vueTare = z => {
    const { s, P } = cadre(z, [-290, -110, 345, 425], 4);
    const T = (x, y) => P(...rot(x, y));
    const out = [];
    out.push(h.ligne(...P(0, -108), ...P(0, -R), h.a.arete));
    out.push(baton(T, -XB, XB, [-XE, XE]));
    const [xg, yg] = rot(-XE, YN), [xd, yd] = rot(XE, YN);
    // à gauche, le sac vide ; à droite, la bouteille vide
    out.push(h.ligne(...P(xg, yg + LC), ...P(xg, yg + LC + 144), h.a.arete));
    out.push(sac(P, xg, yg + LC + 144, false));
    out.push(h.ligne(...P(xd, yd + LC), ...P(xd, yd + LC + 64), h.a.arete));
    out.push(harnais(P, xd, yd + LC + 124, yd + LC + 64));
    out.push(bouteille(P, xd, yd + LC + 124));
    for (const [x, y] of [[xg, yg], [xd, yd]]) out.push(h.ligne(...P(x, y - 9), ...P(x, y + LC), h.a.contour));
    // le caillou, sa boucle ouverte, et le geste qui l'accroche au crochet du côté léger
    const cx = xd + 95, cy = yd + LC + 90;
    out.push(h.path(lisse([P(cx, cy - 17), P(cx - 7, cy - 42), P(cx, cy - 52), P(cx + 7, cy - 42), P(cx, cy - 17)]), h.a.arete));
    out.push(caillou(P, cx, cy, 22, 17));
    const [ax, ay] = P(cx - 10, cy - 64), [bx, by] = P(xd + 14, yd + LC - 4);
    out.push(h.fleche(`M ${ax} ${ay} Q ${r1((ax + bx) / 2 + 4)} ${r1(Math.min(ay, by) - 22)} ${bx} ${by}`));
    return { svg: out.join('\n'), P, s, xd, yd, xg, yg, cx, cy };
  };

  // ── Vue 5 : la bouteille, pleine ou au quart ────────────────────────────────────────────
  const vueQuart = z => {
    const { s, P } = cadre(z, [-44, -70, 96, 284], 4);
    const out = [];
    out.push(h.ligne(...P(0, -68), ...P(0, -40), h.a.arete));
    out.push(harnais(P, 0, 0, -40));
    out.push(bouteille(P, 0, 0, { eau: EAU_QUART, plein: true }));
    return { svg: out.join('\n'), P, s };
  };

  // ── Vue 6 : le niveau marqué au couteau ─────────────────────────────────────────────────
  // Une boîte vue un peu d'en haut ; la coquille dedans ; la lame gratte la paroi du fond au ras
  // de la coquille.
  const RX = 50, RY = 26, YR = -100, YS = -80;   // bord, surface de la coquille
  const vueMarque = z => {
    const { s, P } = cadre(z, [-58, -236, 104, 30], 4);
    const E = (cx, cy, rx, ry, t) => P(cx + rx * Math.cos(t), cy + ry * Math.sin(t));
    const arc = (cy, rx, ry, t0, t1, n = 24) => { const p = []; for (let i = 0; i <= n; i++) p.push(E(0, cy, rx, ry, t0 + (t1 - t0) * i / n)); return p; };
    const out = [];
    // le corps de la boîte : côtés, fond (arc de devant), bord
    const corps = [...arc(YR, RX, RY, Math.PI, 0), ...arc(0, RX, RY, 0, Math.PI)];
    out.push(h.chemin(corps, blanc(h.a.contour), true));
    for (const y of [-66, -33]) out.push(h.chemin(arc(y, RX, RY, 0.08, Math.PI - 0.08), h.a.fin));
    // l'ouverture : la paroi du fond, la coquille au ras de la surface
    const bord = arc(YR, RX - 2, RY - 1, 0, 2 * Math.PI, 48);
    const id = `q9611x${nClip++}`;
    out.push(`<clipPath id="${id}"><path d="${poly(bord)} Z" fill="none"/></clipPath>`);
    out.push(h.chemin(bord, h.a.blanc, true));
    const surf = arc(YS, RX - 2, RY - 1, 0, 2 * Math.PI, 48);
    const eclats = [];
    let g = 7;
    const hasard = () => { g = (g * 9301 + 49297) % 233280; return g / 233280; };
    for (let i = 0; i < 70; i++) {
      const t = hasard() * 2 * Math.PI, rr = Math.sqrt(hasard()) * 0.9;
      const cx = (RX - 4) * rr * Math.cos(t), cy = YS + (RY - 3) * rr * Math.sin(t);
      const a = hasard() * Math.PI, l = 3 + hasard() * 4;
      eclats.push(h.chemin([P(cx - l * Math.cos(a), cy - l * 0.5 * Math.sin(a)), P(cx + l * Math.cos(a), cy + l * 0.5 * Math.sin(a)), P(cx + 1.5, cy + 2.2)], h.a.fin, true));
    }
    out.push(`<g clip-path="url(#${id})">${h.chemin(surf, h.a.blanc, true)}${eclats.join('')}${h.chemin(surf, h.a.arete, true)}</g>`);
    // le bord roulé
    out.push(h.chemin(arc(YR, RX, RY, 0, 2 * Math.PI, 48), h.a.contour, true));
    out.push(h.chemin(arc(YR, RX - 3.5, RY - 2, 0, 2 * Math.PI, 48), h.a.detail, true));
    // la marque, sur la paroi du fond, au ras de la coquille
    const yM = t => YS + (RY - 1) * Math.sin(t) - 4;
    const marque = [];
    for (let t = -Math.PI * 0.62; t <= -Math.PI * 0.42; t += 0.02) marque.push(P((RX - 2) * Math.cos(t), yM(t)));
    out.push(h.chemin(marque, h.a.contour));
    // le couteau : la pointe au bout droit de la marque, le manche en haut à droite
    const tip = [(RX - 2) * Math.cos(-Math.PI * 0.62), yM(-Math.PI * 0.62)];
    const ang = rad(-52);
    // le dos de la lame du côté de la marque, pour ne pas la cacher
    const K = (u, v) => P(tip[0] + u * Math.cos(ang) + v * Math.sin(ang), tip[1] + u * Math.sin(ang) - v * Math.cos(ang));
    out.push(h.chemin([K(0, 0), K(18, -6.5), K(70, -9.5), K(72, 8), K(26, 6.5)], blanc(h.a.contour), true));
    out.push(h.chemin([K(72, -12), K(80, -12), K(80, 11), K(72, 11)], blanc(h.a.arete), true));
    out.push(h.chemin([K(80, -9.5), K(146, -10), K(150, -4), K(150, 5), K(146, 9), K(80, 8.5)], blanc(h.a.contour), true));
    for (const u of [96, 132]) out.push(h.cercle(...K(u, -0.5), r1(2 * s), h.a.plein));
    // le geste : la pointe gratte le long de la paroi
    const fl = [];
    for (let t = -Math.PI * 0.66; t >= -Math.PI * 0.8; t -= 0.02) fl.push(P((RX - 2) * Math.cos(t), yM(t) - 5));
    out.push(h.fleche(poly(fl)));
    return { svg: out.join('\n'), P, s, tip, yM };
  };

  return {
    ref: '96-11',
    titre: 'La balance à fléau',
    desc: 'En haut, la balance montée, à l’équilibre : une perche, une ficelle qui descend jusqu’au milieu d’un bâton droit et y fait deux tours ; le bâton d’équerre avec la ficelle ; deux encoches à la même distance du milieu, marquées de deux cotes égales ; dans chaque encoche un crochet ; à gauche pend un sac froncé et noué, bombé de coquille broyée ; à droite une bouteille de plastique d’un litre pleine d’eau, tenue par une ficelle nouée sous le rebord du col, et un caillou ceinturé de ficelle pendu au même crochet. À côté, l’encoche de la bouteille en gros plan, de face puis en coupe : le crochet en S passe par-dessus le bâton, s’assoit dans l’encoche et porte en bas les deux ficelles, celle de la bouteille et celle du caillou. En bas à gauche, la même balance à vide : le bâton penche, le côté de la bouteille vide remonte, et une flèche montre le caillou qu’on accroche à ce crochet. Au milieu, la bouteille seule, l’eau au quart, un trait tireté au niveau plein. À droite, une boîte où l’on a versé la coquille pesée : la pointe d’un couteau grave un trait sur la paroi du fond, au ras de la coquille.',
    format: 'pleine',
    disposition: [['montage', 'face', 'coupe'], ['tare', 'quart', 'marque']],
    hauteurs: [2, 1.05],
    largeurs: [[5.4, 2.6, 2], [2.3, 1, 1.25]],
    vues: {
      montage: {
        titre: 'La pesée, à l’équilibre',
        dessin: z => vueMontage(z).svg,
        renvois: z => {
          const { P } = vueMontage(z);
          return [
            { n: 1, rond: P(-100, -128), cible: P(0, -128), texte: 'au milieu, jamais ailleurs' },
            { n: 2, rond: P(-266, -40), cible: P(-212, -11), texte: 'encoches à égale distance' },
            { n: 3, rond: P(-95, 300), cible: P(-152, 290), texte: 'sac de coquille broyée' },
            { n: 4, rond: P(252, 48), cible: P(CAIL[0] + 8, CAIL[1] - 6), texte: 'caillou de la tare, laissé là' },
            { n: 5, rond: P(110, 330), cible: P(176, 330), texte: 'plastique, jamais de verre' },
          ];
        },
      },
      face: {
        titre: 'L’encoche, de face',
        dessin: z => vueFace(z).svg,
        renvois: z => {
          const { P } = vueFace(z);
          return [
            { n: 6, rond: P(-20, -30), cible: P(-3, -10), texte: 'l’encoche tient le crochet' },
          ];
        },
      },
      coupe: {
        titre: 'En coupe',
        dessin: z => vueCoupe(z).svg,
        renvois: z => {
          const { P } = vueCoupe(z);
          return [
            { n: 7, rond: P(19, -30), cible: P(12, -9.3), texte: 'crochet en S sur le bâton' },
            { n: 8, rond: P(-19, 64), cible: P(-6, 57), texte: 'les deux au même crochet' },
          ];
        },
      },
      tare: {
        titre: 'La tare, à vide',
        dessin: z => vueTare(z).svg,
        renvois: z => {
          const v = vueTare(z), P = v.P;
          return [
            { n: 9, rond: P(130, -80), cible: P(...rot(236, -R)), texte: 'à vide, le côté léger remonte' },
            { n: 10, rond: P(v.cx - 20, v.cy + 75), cible: P(v.cx, v.cy + 16), texte: 'un caillou au côté léger' },
          ];
        },
      },
      quart: {
        titre: 'La bouteille',
        dessin: z => vueQuart(z).svg,
        renvois: z => {
          const { P } = vueQuart(z);
          return [
            { n: 11, rond: P(72, 20), cible: P(8, EAU_PLEIN), texte: 'pleine, 1 L d’eau : 1 kg' },
            { n: 12, rond: P(72, 190), cible: P(30, EAU_QUART), texte: 'au quart : 250 g' },
          ];
        },
      },
      marque: {
        titre: 'Le niveau',
        dessin: z => vueMarque(z).svg,
        renvois: z => {
          const v = vueMarque(z), P = v.P;
          return [
            { n: 13, rond: P(80, -116), cible: P(2, v.yM(-Math.PI * 0.5)), texte: 'le trait au couteau' },
          ];
        },
      },
    },
  };
};
