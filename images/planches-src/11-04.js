// Planche 11-04. La pièce d'air propre : le cube de quatre filtres, le sens des filtres vu de dessus, le
// filtre seul sur le ventilateur, la pièce fermée (chapitre 11, section 7, « De l'air pour les enfants, sans
// purificateur »). Dessinée le 15 octobre 2026 (inventaire des planches, priorité haute) ; refaite le même
// jour après la relecture « niveau notice » : flèches d'air qui traversaient les plis, ventilateur de profil
// qu'on ne reconnaissait pas, carton de face hachuré comme une coupe de bois, sens des filtres invisible.
//
// La forme du cube n'est ni dans le chapitre ni dans la source du chiffrage (sources/16b-epa-purificateur-
// maison-ventilateur-filtre.md). Elle vient de la fiche de l'OHCOW (sources/11-ohcow-boite-corsi-rosenthal.md) :
// quatre filtres en cube, flèches vers l'intérieur, plis à la verticale ; un fond de carton ; le ventilateur
// posé dessus, qui souffle vers le haut et déborde un peu ; tous les joints au ruban ; un carton sur la face
// qui souffle, percé au diamètre des pales (« shroud »). Les filtres sont dessinés de 5 cm d'épaisseur
// (2 po, permis par la fiche) pour que la flèche imprimée se lise sur leur chant.
// Le filtre seul : la flèche du filtre vers le ventilateur (chapitre), le carton sur la face qui souffle
// (EPA : « cardboard shroud »). Quelques bandes de ruban, pas un tour complet, pour garder la flèche visible.
// Proportions dessinées sans cote : filtres de 51 cm (20 po), ventilateur de 51 cm ; le chapitre ne cote rien.
// La pièce : polythène agrafé sur le cadre de la fenêtre, couverture roulée au bas de la porte (chapitre). La
// clé d'air n'est pas dessinée : la pièce choisie est sans poêle si possible.
// Pas de pulseur de chaufferette : le chapitre ne dit pas comment on lui tient un filtre.
// La charte : le cercle rouge sur la flèche imprimée du filtre seul (le sens qui se rate).
// Renumérotée le 19 octobre 2026 dans l'ordre des gestes de la section 7 : la pièce 1 et 2, le filtre seul 3 et 4,
// le cube 5 à 11 (vue de dessus comprise). Ancien → nouveau : 10→1, 11→2, 8→3, 9→4, 1→5, 2→6, 3→7, 4→8, 5→9, 6→10,
// 7→11. Les vues gardent leur place ; la légende se lit dans l'ordre des gestes.
module.exports = (h) => {
  const A = h.a;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const pt = p => `${f1(p[0])} ${f1(p[1])}`;
  const poly = (pts, at) => h.chemin(pts, at, true);
  const c30 = Math.cos(Math.PI / 6);
  const iso = (ox, oy, s) => ([x, y, z]) => [ox + (x - y) * c30 * s, oy + (x + y) * 0.5 * s - z * s];
  const L = 51, F = 11, EPC = 0.6, DEB = 1.5;     // filtre ; hauteur du ventilateur ; carton ; débord
  // ─── Le cube monté, en perspective ────────────────────────────────────────────────────────────
  const cube = z => {
    const s = 2.42, o = [];
    const P = iso(z.l / 2 - 4, z.h - 18 - 2 * L * 0.5 * s, s);
    const Pp = q => P(q);
    // le fond de carton, qui dépasse à peine
    o.push(poly([P([L + 1, -0.5, 0]), P([L + 1, L + 1, 0]), P([-0.5, L + 1, 0]), P([-0.5, L + 1, -1.2]), P([L + 1, L + 1, -1.2]), P([L + 1, -0.5, -1.2])], W(A.arete)));
    // les deux faces vues : le cadre, les plis à la verticale ; la face de droite à l'ombre
    const face = (Q, ombre) => {
      const out = [], b = 2.5;
      out.push(poly([Q(0, 0), Q(L, 0), Q(L, L), Q(0, L)], W(A.arete)));
      if (ombre) out.push(poly([Q(b, b), Q(L - b, b), Q(L - b, L - b), Q(b, L - b)], A.ombre));
      for (let u = b + 2; u < L - b - 0.5; u += 2) out.push(h.ligne(...Q(u, b), ...Q(u, L - b), A.fin));
      out.push(poly([Q(b, b), Q(L - b, b), Q(L - b, L - b), Q(b, L - b)], A.detail));
      return out.join('\n');
    };
    const QG = (u, v) => P([u, L, v]), QD = (u, v) => P([L, L - u, v]);
    o.push(face(QG, false), face(QD, true));
    // le ruban : l'arête de devant, le pied, le haut sous le ventilateur
    const ruban = (Q, u0, u1, v0, v1) => poly([Q(u0, v0), Q(u1, v0), Q(u1, v1), Q(u0, v1)], W(A.detail));
    o.push(ruban(QG, 0, L, 0, 2.5), ruban(QD, 0, L, 0, 2.5), ruban(QG, 0, L, L - 2.5, L), ruban(QD, 0, L, L - 2.5, L));
    o.push(ruban(QG, L - 2.5, L, 0, L), ruban(QD, 0, 2.5, 0, L));
    // l'air qui entre : une flèche par face vue, près de l'arête extérieure, qui traverse l'arête
    const lisere = d => `<path d="${d}" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>`;
    const entree = (a, b) => { const d = `M${pt(a)} L${pt(b)}`; return lisere(d) + '\n' + h.fleche(d, A.arete); };
    o.push(entree(P([9, L + 26, 34]), P([9, L + 1.2, 34])), entree(P([L + 26, 9, 34]), P([L + 1.2, 9, 34])));
    // le ventilateur posé dessus, qui déborde un peu ; le carton par-dessus
    const a0 = -DEB, a1 = L + DEB, z0 = L, z1 = L + F, z2 = z1 + EPC;
    o.push(poly([P([a1, a1, z0]), P([a1, a0, z0]), P([a1, a0, z1]), P([a1, a1, z1])], A.ombre));
    o.push(poly([P([a1, a1, z0]), P([a1, a0, z0]), P([a1, a0, z1]), P([a1, a1, z1])], A.arete));
    o.push(poly([P([a1, a1, z0]), P([a0, a1, z0]), P([a0, a1, z1]), P([a1, a1, z1])], W(A.arete)));
    // la poignée moulée sur le côté gauche du boîtier
    o.push(h.path(`M${pt(P([L * 0.36, a1, z1 - 2.2]))} L${pt(P([L * 0.64, a1, z1 - 2.2]))} L${pt(P([L * 0.64, a1, z1 - 4.4]))} L${pt(P([L * 0.36, a1, z1 - 4.4]))} Z`, A.detail));
    o.push(poly([P([a1, a1, z1]), P([a1, a0, z1]), P([a1, a0, z2]), P([a1, a1, z2])], W(A.detail)));
    o.push(poly([P([a1, a1, z1]), P([a0, a1, z1]), P([a0, a1, z2]), P([a1, a1, z2])], W(A.detail)));
    o.push(poly([P([a0, a0, z2]), P([a1, a0, z2]), P([a1, a1, z2]), P([a0, a1, z2])], W(A.contour)));
    // le rond découpé ; dedans, les pales derrière la grille
    const cx = L / 2, cy = L / 2, R = 19, zp = z2;
    const cercle = (r, zz, n = 48) => { const pts = []; for (let i = 0; i < n; i++) { const t = 2 * Math.PI * i / n; pts.push(P([cx + r * Math.cos(t), cy + r * Math.sin(t), zz])); } return pts; };
    o.push(poly(cercle(R, z2), A.loin));
    const pale = i => {
      const a = i * 2 * Math.PI / 5, Q = (r, t) => P([cx + r * Math.cos(a + t), cy + r * Math.sin(a + t), zp]);
      return `M${pt(Q(3.4, -0.22))} Q${pt(Q(9.5, 0.28))} ${pt(Q(17.4, 0.36))} Q${pt(Q(18.6, 0.66))} ${pt(Q(17.0, 0.98))} Q${pt(Q(9.0, 0.78))} ${pt(Q(3.4, 0.46))} Z`;
    };
    for (let i = 0; i < 5; i++) o.push(h.path(pale(i), W(A.detail)));
    o.push(poly(cercle(3.6, zp), W(A.detail)));
    for (const r of [7, 11.5, 16]) o.push(poly(cercle(r, z2), A.fin));
    o.push(poly(cercle(R, z2), A.arete));
    // l'air qui sort par le haut
    const ctr = P([cx, cy, z2]);
    for (const dx of [-24, 0, 24]) o.push(h.fleche(`M${f1(ctr[0] + dx)} ${f1(ctr[1] - 8)} L${f1(ctr[0] + dx)} ${f1(ctr[1] - 44)}`, A.arete));
    return { svg: o.join('\n'), P, QG, QD, a0, a1, z0, z1, z2, cx, cy, R };
  };

  // ─── Le sens des filtres, vu de dessus (sans le ventilateur) ─────────────────────────────────
  // Filtres de 51 × 5 cm en moulinet : chacun bute contre le chant du suivant, le carré fait 56 cm.
  const plan = z => {
    const S = 3.15, E = 5, o = [];
    const T = L + E;
    const x0 = (z.l - T * S) / 2, y0 = (z.h - T * S) / 2 + 4;
    const Q = (x, y) => [x0 + S * x, y0 + S * y];
    const filtres = [
      { r: [0, 0, L, E], n: [0, 1] },          // en haut, flèche vers le bas
      { r: [L, 0, E, L], n: [-1, 0] },         // à droite, flèche vers la gauche
      { r: [E, L, L, E], n: [0, -1] },         // en bas, flèche vers le haut
      { r: [0, E, E, L], n: [1, 0] },          // à gauche, flèche vers la droite
    ];
    for (const f of filtres) {
      const [x, y, l, ht] = f.r;
      o.push(poly([Q(x, y), Q(x + l, y), Q(x + l, y + ht), Q(x, y + ht)], W(A.contour)));
      // la flèche imprimée sur le chant, au milieu du filtre
      const cxm = x + l / 2, cym = y + ht / 2, [nx, ny] = f.n, [tx, ty] = [-ny, nx];
      const pts = [[-1.7, -0.55], [0.4, -0.55], [0.4, -1.3], [1.9, 0], [0.4, 1.3], [0.4, 0.55], [-1.7, 0.55]]
        .map(([a, b]) => Q(cxm + a * nx + b * tx, cym + a * ny + b * ty));
      o.push(poly(pts, A.plein));
      // l'air qui entre par ce côté
      const d0 = 13, d1 = 4.5, ext = [cxm - nx * (E / 2), cym - ny * (E / 2)];
      o.push(h.fleche(`M${pt(Q(ext[0] - nx * d0, ext[1] - ny * d0))} L${pt(Q(ext[0] - nx * d1, ext[1] - ny * d1))}`, A.arete));
    }
    return { svg: o.join('\n'), Q, E, T };
  };

  // ─── Un filtre seul : de côté (le filtre derrière, le carton devant), et la face qui souffle ──
  const seul = z => {
    const S = 2.95, o = [];
    const ep = 5, prof = 11, pied = 3, H = L, LV = L + 4;     // le boîtier fait 55 cm de large
    const xV = 48, yB = z.h - 20;
    const V = (x, y) => [xV + S * x, yB - S * y];
    // de côté : les pieds, le boîtier, la poignée du dessus
    o.push(poly([V(0.8, 0), V(3.2, 0), V(3.2, pied), V(0.8, pied)], W(A.arete)), poly([V(prof - 3.2, 0), V(prof - 0.8, 0), V(prof - 0.8, pied), V(prof - 3.2, pied)], W(A.arete)));
    o.push(poly([V(0, pied), V(prof, pied), V(prof, pied + H), V(0, pied + H)], W(A.contour)));
    o.push(poly([V(1.8, pied + 1.8), V(prof - 1.8, pied + 1.8), V(prof - 1.8, pied + H - 1.8), V(1.8, pied + H - 1.8)], A.detail));
    o.push(h.path(`M${pt(V(3, pied + H))} L${pt(V(3, pied + H + 2.6))} Q${pt(V(5.5, pied + H + 3.8))} ${pt(V(8, pied + H + 2.6))} L${pt(V(8, pied + H))}`, A.arete));
    // le carton, sur la face qui souffle
    o.push(poly([V(prof, pied - 0.4), V(prof + EPC + 0.4, pied - 0.4), V(prof + EPC + 0.4, pied + H + 0.4), V(prof, pied + H + 0.4)], W(A.arete)));
    // le filtre contre l'arrière : son chant, la flèche imprimée qui pointe vers le ventilateur
    o.push(poly([V(-ep, pied), V(0, pied), V(0, pied + H), V(-ep, pied + H)], W(A.arete)));
    o.push(poly([V(-ep + 0.9, pied + 0.9), V(-0.9, pied + 0.9), V(-0.9, pied + H - 0.9), V(-ep + 0.9, pied + H - 0.9)], A.fin));
    const yF = pied + H / 2;
    o.push(poly([[-4.2, -0.45], [-2.0, -0.45], [-2.0, -1.25], [-0.6, 0], [-2.0, 1.25], [-2.0, 0.45], [-4.2, 0.45]].map(([a, b]) => V(a, yF + b)), A.plein));
    // trois bandes de ruban à cheval sur le joint, bouts dentelés
    const ruban = y => {
      const x0 = -3.4, x1 = 3.4, hR = 3.6, n = 4, d = [];
      d.push(`M${pt(V(x0, y))}`);
      for (let i = 1; i <= n; i++) d.push(`L${pt(V(x0 + (i % 2 ? 0.5 : 0), y + hR * i / n))}`);
      d.push(`L${pt(V(x1, y + hR))}`);
      for (let i = n - 1; i >= 0; i--) d.push(`L${pt(V(x1 - (i % 2 ? 0.5 : 0), y + hR * i / n))}`);
      return h.path(d.join(' ') + ' Z', W(A.detail));
    };
    for (const y of [pied + 3, pied + H - 6.6, pied + 32]) o.push(ruban(y));
    // l'air : il entre par le filtre, sort par le rond du carton
    for (const y of [pied + 12, pied + 40]) o.push(h.fleche(`M${pt(V(-ep - 10, y))} L${pt(V(-ep - 1.4, y))}`, A.arete));
    for (const y of [pied + 18, pied + 34]) o.push(h.fleche(`M${pt(V(prof + 2.2, y))} L${pt(V(prof + 11, y))}`, A.arete));
    o.push(h.controle(...V(-2.4, yF), 10.5));
    o.push(h.texte(V(prof / 2 - ep / 2, 0)[0], yB + 16, 'de côté', { italique: true }));

    // la face qui souffle, de face : le carton, le rond au diamètre des pales, les pales derrière
    const cxF = z.l - 12 - LV * S / 2, G = (x, y) => [cxF + S * x, yB - S * y];
    const rap = 'fill="none" stroke="#1A1A1A" stroke-width="0.5" stroke-dasharray="2 3"';
    o.push(h.ligne(...V(prof + 13, pied + H), ...G(-LV / 2 - 2, pied + H), rap), h.ligne(...V(prof + 13, pied), ...G(-LV / 2 - 2, pied), rap));
    for (const xf of [-LV / 2 + 6, LV / 2 - 8.4]) o.push(poly([G(xf, 0), G(xf + 2.4, 0), G(xf + 2.4, pied), G(xf, pied)], W(A.arete)));
    o.push(h.path(`M${pt(G(-2.5, pied + H))} L${pt(G(-2.5, pied + H + 2.6))} L${pt(G(2.5, pied + H + 2.6))} L${pt(G(2.5, pied + H))}`, A.arete));
    o.push(poly([G(-LV / 2, pied - 0.4), G(LV / 2, pied - 0.4), G(LV / 2, pied + H + 0.4), G(-LV / 2, pied + H + 0.4)], W(A.contour)));
    const [cx, cy] = G(0, yF), R = 19 * S;
    o.push(h.cercle(cx, cy, R, A.loin));
    for (let i = 0; i < 5; i++) {
      const a = i * 2 * Math.PI / 5 - 0.5, Q = (r, t) => [cx + r * S * Math.cos(a + t), cy + r * S * Math.sin(a + t)];
      o.push(h.path(`M${pt(Q(3.4, -0.22))} Q${pt(Q(9.5, 0.28))} ${pt(Q(17.4, 0.36))} Q${pt(Q(18.6, 0.66))} ${pt(Q(17.0, 0.98))} Q${pt(Q(9.0, 0.78))} ${pt(Q(3.4, 0.46))} Z`, W(A.detail)));
    }
    o.push(h.cercle(cx, cy, 3.6 * S, W(A.detail)));
    for (const r of [7, 11.5, 16]) o.push(h.cercle(cx, cy, r * S, A.fin));
    o.push(h.cercle(cx, cy, R, A.arete));
    o.push(h.texte(cxF, yB + 16, 'la face qui souffle', { italique: true }));
    return { svg: o.join('\n'), V, G, ep, prof, pied, H, yF, LV, S };
  };

  // ─── La pièce fermée, en coupe : la fenêtre au polythène, la porte et sa couverture ─────────
  const piece = z => {
    const o = [];
    const yP = 10, yS = z.h - 14, xG = 20, xD = z.l - 20, ep = 11;
    o.push(h.rect(xG - ep, yP, ep, yS - yP, A.hachure('bois', 'arete')));
    o.push(h.rect(xD, yP, ep, yS - yP, A.hachure('bois', 'arete')));
    o.push(h.rect(xG - ep, yS, xD - xG + 2 * ep, 9, A.hachure('bois', 'arete')));
    o.push(h.rect(xG - ep, yP - 6, xD - xG + 2 * ep, 6, A.hachure('bois', 'arete')));
    // la fenêtre du mur du fond : le cadre, les deux châssis, le polythène agrafé par-dessus le cadre
    const fx = 46, fy = 50, fl = 96, fh = 76;
    o.push(h.rect(fx - 6, fy - 6, fl + 12, fh + 12, W(A.arete)));
    o.push(h.rect(fx, fy, fl, fh, W(A.detail)), h.ligne(fx + fl / 2, fy, fx + fl / 2, fy + fh, A.detail));
    o.push(h.rect(fx - 10, fy - 10, fl + 20, fh + 20, A.arete.replace('stroke-width="1.4"', 'stroke-width="0.7"')));
    for (const [a, b] of [[[fx + 10, fy + 22], [fx + 34, fy + 4]], [[fx + 60, fy + 70], [fx + 88, fy + 48]]]) o.push(h.path(`M${a[0]} ${a[1]} Q${(a[0] + b[0]) / 2 + 4} ${(a[1] + b[1]) / 2 + 4} ${b[0]} ${b[1]}`, A.fin));
    // les agrafes, au milieu du cadre, à travers le polythène
    const agrafe = (x, y, vert) => vert ? h.ligne(x, y - 3, x, y + 3, A.arete) : h.ligne(x - 3, y, x + 3, y, A.arete);
    for (let x = fx + 8; x <= fx + fl - 6; x += 20) o.push(agrafe(x, fy - 3, false), agrafe(x, fy + fh + 3, false));
    for (let y = fy + 8; y <= fy + fh - 6; y += 20) o.push(agrafe(fx - 3, y, true), agrafe(fx + fl + 3, y, true));
    // la porte, et la couverture roulée serrée au bas
    const pl = 64, px = xD - 26 - pl, py = 30;
    o.push(h.rect(px - 5, py - 5, pl + 10, yS - py + 5, W(A.arete)));
    o.push(h.rect(px, py, pl, yS - py, W(A.detail)));
    o.push(h.cercle(px + 9, (py + yS) / 2 + 8, 3.2, W(A.detail)));
    const yr = yS - 7;
    o.push(h.path(`M${px - 9} ${yr - 7} L${px + pl + 9} ${yr - 7} A7 7 0 0 1 ${px + pl + 9} ${yr + 7} L${px - 9} ${yr + 7} A7 7 0 0 1 ${px - 9} ${yr - 7} Z`, W(A.arete)));
    o.push(h.ellipse(px + pl + 9, yr, 3.2, 7, W(A.detail)), h.path(`M${px + pl + 9} ${yr - 3} A2.4 3 0 1 1 ${px + pl + 7.6} ${yr + 1.4}`, A.fin));
    // le cube au plancher, sous la fenêtre
    const s = 0.56;
    const xc = fx + fl / 2;
    const Pc = iso(xc, yS - L * s, s);
    o.push(poly([Pc([L, 0, 0]), Pc([L, L, 0]), Pc([L, L, L]), Pc([L, 0, L])], A.ombre), poly([Pc([L, 0, 0]), Pc([L, L, 0]), Pc([L, L, L]), Pc([L, 0, L])], A.arete));
    o.push(poly([Pc([L, L, 0]), Pc([0, L, 0]), Pc([0, L, L]), Pc([L, L, L])], W(A.arete)));
    for (let u = 6; u < L - 3; u += 6) o.push(h.ligne(...Pc([u, L, 4]), ...Pc([u, L, L - 4]), A.fin));
    const g0 = -DEB, g1 = L + DEB;
    o.push(poly([Pc([g1, g0, L]), Pc([g1, g1, L]), Pc([g1, g1, L + F]), Pc([g1, g0, L + F])], A.ombre), poly([Pc([g1, g0, L]), Pc([g1, g1, L]), Pc([g1, g1, L + F]), Pc([g1, g0, L + F])], A.arete));
    o.push(poly([Pc([g1, g1, L]), Pc([g0, g1, L]), Pc([g0, g1, L + F]), Pc([g1, g1, L + F])], W(A.arete)));
    o.push(poly([Pc([g0, g0, L + F]), Pc([g1, g0, L + F]), Pc([g1, g1, L + F]), Pc([g0, g1, L + F])], W(A.arete)));
    const top = Pc([L / 2, L / 2, L + F]);
    o.push(h.ellipse(top[0], top[1], 19 * Math.SQRT2 * c30 * s, 19 * Math.SQRT2 * 0.5 * s, A.loin), h.ellipse(top[0], top[1], 19 * Math.SQRT2 * c30 * s, 19 * Math.SQRT2 * 0.5 * s, A.detail));
    o.push(h.fleche(`M${f1(top[0])} ${f1(top[1] - 8)} L${f1(top[0])} ${f1(top[1] - 30)}`, A.arete));
    return { svg: o.join('\n'), poly: [fx + fl + 10, fy + 30], couv: [px + 16, yr - 7], porte: [px, py] };
  };

  return {
    ref: '11-04',
    titre: 'La pièce d’air propre',
    desc: 'En haut à gauche, en perspective : quatre filtres de fournaise montés en cube, les plis à la verticale, l’arête de devant, le pied et le haut fermés au ruban gommé, un fond de carton ; un ventilateur de boîte posé sur le cube, qui déborde un peu ; sur lui, un carton percé d’un rond au diamètre des pales, où l’on voit les pales derrière la grille. Une grosse flèche creuse entre dans chaque face vue ; trois flèches sortent par le haut. En haut à droite, le cube vu de dessus sans le ventilateur : les quatre filtres en moulinet, chacun buté contre le chant du suivant, la flèche imprimée sur chaque chant pointe vers le centre, l’air entre par les quatre côtés. En bas à gauche, un filtre seul, de côté : le filtre contre l’arrière du ventilateur, tenu par quelques bandes de ruban, sa flèche imprimée pointe vers le ventilateur (cercle rouge) ; sur la face qui souffle, le carton. En bas à droite, la pièce en coupe : la fenêtre couverte d’un polythène agrafé sur son cadre, la porte et une couverture roulée au bas, le cube au plancher.',
    format: 'pleine',
    disposition: [['cube', 'plan'], ['seul', 'piece']],
    hauteurs: [1.3, 1],
    largeurs: [[1.12, 1], [1.05, 1]],
    vues: {
      cube: {
        titre: 'Le cube de quatre filtres',
        dessin: z => cube(z).svg,
        renvois: z => {
          const c = cube(z);
          return [
            { n: 5, rond: [14, z.h - 96], cible: c.QG(9, 14), texte: 'quatre filtres, plis à la verticale' },
            { n: 6, rond: [z.l / 2 - 64, z.h - 12], cible: c.QG(L - 14, 1.3), texte: 'tous les joints au ruban gommé' },
            { n: 7, rond: [z.l - 16, z.h - 40], cible: c.P([L + 1, 14, -0.6]), texte: 'fond de carton' },
            { n: 8, rond: [z.l - 14, c.P([c.a1, 0, c.z0])[1] - 10], cible: c.P([c.a1, L * 0.22, (c.z0 + c.z1) / 2]), texte: 'ventilateur posé dessus, qui souffle en haut' },
            { n: 9, rond: [16, c.P([c.a0, c.a1, c.z2])[1] - 30], cible: c.P([c.a0 + 3.5, L * 0.62, c.z2]), texte: 'carton percé au diamètre des pales' },
          ];
        },
      },
      plan: {
        titre: 'Vu de dessus, sans le ventilateur',
        dessin: z => plan(z).svg,
        renvois: z => {
          const g = plan(z);
          return [
            { n: 10, rond: g.Q(L / 2 + 13, -9.5), cible: g.Q(L / 2 + 1.6, g.E / 2 - 0.8), texte: 'flèche du filtre vers le centre' },
            { n: 11, rond: [g.Q(L, 0)[0] + 4, g.Q(0, g.T)[1] + 24], cible: g.Q(L + g.E / 2, L + 0.1), texte: 'chaque filtre bute contre le suivant' },
          ];
        },
      },
      seul: {
        titre: 'Un filtre seul, sur le ventilateur',
        dessin: z => seul(z).svg,
        renvois: z => {
          const g = seul(z);
          return [
            { n: 3, rond: [14, g.V(0, g.pied + g.H + 2)[1]], cible: g.V(-g.ep + 0.3, g.pied + g.H - 12), texte: 'filtre au ruban, flèche vers le ventilateur' },
            { n: 4, rond: [g.V(g.prof + 7, 0)[0], g.V(0, g.pied + g.H + 3)[1]], cible: g.V(g.prof + EPC + 0.4, g.pied + g.H - 6), texte: 'carton sur la face qui souffle' },
          ];
        },
      },
      piece: {
        titre: 'La plus petite pièce, fermée',
        dessin: z => piece(z).svg,
        renvois: z => {
          const g = piece(z);
          return [
            { n: 1, rond: [g.poly[0] + 12, 22], cible: [g.poly[0], g.poly[1] - 22], texte: 'polythène agrafé sur le cadre' },
            { n: 2, rond: [g.porte[0] + 30, g.couv[1] - 40], cible: g.couv, texte: 'couverture roulée au bas de la porte' },
          ];
        },
      },
    },
  };
};
