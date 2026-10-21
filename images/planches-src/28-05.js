// Planche 28-05 — Le test du verre (ch. 28 : étape 7 et note 5, section 8 « Les taches qui ne
// s'effacent pas sous le verre », section 9 « Le test du verre avec ce qu'on a »).
//
// Ce que le chapitre dit, et rien d'autre : presser fermement le flanc d'un verre transparent à
// paroi lisse (pot Mason, verre à boire, flanc d'une bouteille de plastique clair) sur la tache et
// regarder à travers la paroi. La tache qui pâlit et disparaît : rougeur ordinaire. La tache qui
// reste visible à travers le verre : du sang sous la peau, en petits points comme des piqûres
// d'épingle, puis en taches rouges ou violettes. Sur une peau foncée : paumes, plantes des pieds,
// palais, blanc des yeux, intérieur des paupières.
//
// Aucune cote : ce n'est pas une construction. Les proportions du pot sont celles d'un pot Mason
// d'un litre, la main vient de la bibliothèque de formes (prise vue du dos, tournée d'un quart de
// tour : le pot couché, la main posée dessus, les doigts qui passent par-dessus).
// Mains simples et charte (14 octobre) : la main sur le pot et la paume montrée passent par mainSimple (ouverte, vue du
// dos, puis vue de la paume). Rouge : presser fort, et la paupière tirée vers le bas.
module.exports = (h) => {
  const N = '#1A1A1A';
  const f = v => Math.round(v * 10) / 10;
  const P = p => `${f(p[0])} ${f(p[1])}`;

  // Catmull-Rom → Bézier : une courbe lisse qui passe par les points
  const lisse = (pts, ferme = false) => {
    const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
    const Q = ferme ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
    let d = `M${P(pts[0])}`;
    for (let i = 1; i < Q.length - 2; i++) {
      const c1 = add(Q[i], mul(sub(Q[i + 1], Q[i - 1]), 1 / 6)), c2 = sub(Q[i + 1], mul(sub(Q[i + 2], Q[i]), 1 / 6));
      d += ` C${P(c1)} ${P(c2)} ${P(Q[i + 1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  // hasard reproductible
  const alea = (graine) => { let s = graine >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; };
  // une tache irrégulière : un contour fermé autour de (cx, cy)
  const tache = (cx, cy, rx, ry, graine, n = 9) => {
    const r = alea(graine), pts = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 2 * Math.PI, k = 0.78 + 0.34 * r();
      pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
    }
    return lisse(pts, true);
  };

  // motifs propres à la planche : la rougeur (pointillé serré), la tache violette (plus dense),
  // la peau foncée (hachure fine et serrée)
  const DEFS = `<defs>
<pattern id="p2805-rouge" width="3.2" height="3.2" patternUnits="userSpaceOnUse"><circle cx="0.8" cy="0.8" r="0.7" fill="${N}"/><circle cx="2.4" cy="2.4" r="0.7" fill="${N}"/></pattern>
<pattern id="p2805-violet" width="2.2" height="2.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="2.2" stroke="${N}" stroke-width="0.7"/></pattern>
<pattern id="p2805-peau" width="3.4" height="3.4" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><line x1="0" y1="0" x2="0" y2="3.4" stroke="${N}" stroke-width="0.5"/></pattern>
</defs>`;
  const ROUGE = 'fill="url(#p2805-rouge)" stroke="none"';
  const VIOLET = 'fill="url(#p2805-violet)" stroke="none"';
  const PEAU = 'fill="url(#p2805-peau)" stroke="none"';

  // ─── le pot Mason couché, vu de dessus (l'axe horizontal, le couvercle à droite) ─────────
  // Proportions d'un pot d'un litre, en mm : corps 86 de diamètre et 128 de long, épaule 16,
  // col 4, bague 14, couvercle 2 ; verre de 4 ; la bande aplatie fait 22 de large.
  const POT = { R: 43, L: 128, ep: 16, Rc: 33, col: 4, bag: 14, Rb: 36, cou: 2, Rk: 35, verre: 4, bande: 11 };
  const potDessus = (x0, yc, e, { casse = null } = {}) => {
    const k = v => v * e, R = k(POT.R), xs = x0 + k(POT.L);
    const out = [];
    if (casse == null) {
      const xe = xs + k(POT.ep), xn = xe + k(POT.col), xb = xn + k(POT.bag), xl = xb + k(POT.cou);
      const rc = k(7), Rc = k(POT.Rc);
      const corps = `M${P([x0 + rc, yc - R])} L${P([xs, yc - R])} C${P([xs + k(9), yc - R])} ${P([xe - k(3), yc - Rc - k(2)])} ${P([xe, yc - Rc])} `
        + `L${P([xn, yc - Rc])} L${P([xn, yc + Rc])} L${P([xe, yc + Rc])} C${P([xe - k(3), yc + Rc + k(2)])} ${P([xs + k(9), yc + R])} ${P([xs, yc + R])} `
        + `L${P([x0 + rc, yc + R])} Q${P([x0, yc + R])} ${P([x0, yc + R - rc])} L${P([x0, yc - R + rc])} Q${P([x0, yc - R])} ${P([x0 + rc, yc - R])} Z`;
      out.push(h.path(corps, h.a.arete));
      // la bague vissée, ses stries ; le couvercle
      out.push(h.rect(xn, yc - k(POT.Rb), k(POT.bag), 2 * k(POT.Rb), `fill="#FFFFFF" ${h.a.arete.replace('fill="none" ', '')}`));
      for (let x = xn + k(2.2); x < xb - k(1); x += k(2.4)) out.push(h.ligne(x, yc - k(POT.Rb) + 2, x, yc + k(POT.Rb) - 2, h.a.fin));
      out.push(h.rect(xb, yc - k(POT.Rk), k(POT.cou), 2 * k(POT.Rk), h.a.arete));
      // l'épaule vue à travers le verre : le fond de l'épaule, en trait fin
      out.push(h.path(`M${P([xs, yc - R + k(POT.verre)])} Q${P([xe - k(2), yc - Rc + k(1)])} ${P([xe, yc - Rc + k(POT.verre)])}`, h.a.fin));
      out.push(h.path(`M${P([xs, yc + R - k(POT.verre)])} Q${P([xe - k(2), yc + Rc - k(1)])} ${P([xe, yc + Rc - k(POT.verre)])}`, h.a.fin));
    } else {
      // le corps seul, cassé à droite (trait de coupure en zigzag)
      const xc = casse, rc = k(7), z = k(5);
      const zig = [[xc, yc - R], [xc - z * 0.6, yc - R * 0.55], [xc + z * 0.6, yc - R * 0.1], [xc - z * 0.6, yc + R * 0.35], [xc + z * 0.4, yc + R * 0.75], [xc, yc + R]];
      out.push(h.path(`M${P([xc, yc - R])} L${P([x0 + rc, yc - R])} Q${P([x0, yc - R])} ${P([x0, yc - R + rc])} L${P([x0, yc + R - rc])} Q${P([x0, yc + R])} ${P([x0 + rc, yc + R])} L${P([xc, yc + R])}`, h.a.arete));
      out.push(h.chemin(zig, h.a.fin));
    }
    const xf = casse == null ? xs : casse;
    // l'épaisseur du verre : la paroi (dessus, dessous) et le fond
    out.push(h.ligne(x0 + k(POT.verre + 3), yc - R + k(POT.verre), xf, yc - R + k(POT.verre), h.a.fin));
    out.push(h.ligne(x0 + k(POT.verre + 3), yc + R - k(POT.verre), xf, yc + R - k(POT.verre), h.a.fin));
    out.push(h.path(`M${P([x0 + k(POT.verre + 3), yc - R + k(POT.verre)])} Q${P([x0 + k(6), yc - R + k(POT.verre)])} ${P([x0 + k(6), yc - R + k(10)])} L${P([x0 + k(6), yc + R - k(10)])} Q${P([x0 + k(6), yc + R - k(POT.verre)])} ${P([x0 + k(POT.verre + 3), yc + R - k(POT.verre)])}`, h.a.fin));
    // la bande aplatie : là où le flanc touche la peau
    const b = k(POT.bande);
    out.push(h.ligne(x0 + k(3), yc - b, xf - (casse == null ? 0 : k(1)), yc - b, h.a.detail));
    out.push(h.ligne(x0 + k(3), yc + b, xf - (casse == null ? 0 : k(1)), yc + b, h.a.detail));
    return { svg: out.join('\n'), R, xs, xf, b, x0, yc };
  };

  // des points d'épingle semés dans une ellipse
  const semis = (cx, cy, rx, ry, n, graine, rmin = 1.0, rmax = 1.7) => {
    const r = alea(graine), pts = [];
    let essais = 0;
    while (pts.length < n && essais++ < n * 40) {
      const a = r() * 2 * Math.PI, d = Math.sqrt(r());
      const p = [cx + Math.cos(a) * rx * d, cy + Math.sin(a) * ry * d];
      if (pts.some(q => Math.hypot(q[0] - p[0], q[1] - p[1]) < 6)) continue;
      pts.push([...p, rmin + (rmax - rmin) * r()]);
    }
    return pts;
  };
  const points = pts => pts.map(p => h.cercle(p[0], p[1], p[2], h.a.plein)).join('\n');
  const BLANC_T = t => `fill="#FFFFFF" ${t.replace('fill="none" ', '')}`;

  // ─── A. le geste, vu de dessus ────────────────────────────────────────────────────────
  // Le pot et la main à la même échelle (une main de 190 mm du poignet au bout du majeur, un pot
  // de 86 mm de diamètre) : la paume à plat sur le pot, qui le couvre d'un bord à l'autre, les
  // doigts qui débordent sur la peau au-delà ; le bras arrive d'en bas, coupé au bord de la vue.
  const EA = 1.15, XA = 56, YA = 166;
  const geste = z => {
    const pot = potDessus(XA, YA, EA);
    const out = [DEFS];
    const cx = XA + 100 * EA;
    // la tache sous le pot et autour : des points et deux petites taches
    out.push(h.path(tache(XA + 112 * EA, YA + 10, 10, 8, 7), VIOLET));
    out.push(h.path(tache(XA + 104 * EA, YA - 28, 7, 5, 11), VIOLET));
    out.push(points(semis(cx, YA, 70, 64, 34, 3)));
    out.push(pot.svg);
    // la main droite, paume à plat sur le fond du pot, doigts vers le haut, pouce à gauche ; le col et le couvercle restent à découvert, la bande se lit entre la main et l'épaule
    out.push(`<clipPath id="z2805-vueA"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`);
    // la main droite (main simple, ouverte, vue du dos), doigts en haut, pouce à gauche : le creux de la paume sur le
    // fond du pot ; l'avant-bras descend et sort du cadre
    out.push(h.formes.mainSimple({ x: XA + 46 * EA - 12, y: YA + 6, pose: 'ouverte', vue: 'dos', cote: 'droite', angle: -90, echelle: EA,
      avantbras: { bord: { x0: 0, y0: 0, x1: z.l, y1: z.h }, bras: { pli: 0 } } }).svg);
    return out.join('\n');
  };

  // ─── B. vu par le bout : le pot pressé dans la chair ─────────────────────────────────
  const bout = z => {
    const cx = 100, Rv = POT.R * EA, cy = 122, sl = cy + Rv - 10, RB = 250;
    const out = [];
    const pa = th => [cx + Rv * Math.cos(th * Math.PI / 180), cy + Rv * Math.sin(th * Math.PI / 180)];
    // la peau d'un membre, bombée ; sous le verre, elle s'enfonce et épouse le bas du pot
    const yB = x => sl + RB - Math.sqrt(RB * RB - (x - cx) ** 2);
    let th1 = 90;
    while (th1 < 180 && pa(th1)[1] > yB(pa(th1)[0])) th1 += 0.5;
    const a1 = pa(th1 - 4), a2 = pa(180 - th1 + 4);
    const arc = (x1, x2) => { const pts = []; for (let x = x1; (x2 > x1 ? x <= x2 : x >= x2); x += (x2 > x1 ? 4 : -4)) pts.push([x, yB(x)]); return pts; };
    const g = arc(4, a1[0] - 12), d = arc(a2[0] + 12, z.l - 4);
    const gl = g[g.length - 1], dl = d[0];
    out.push(h.path(`M${g.map(P).join(' L')} C${f(gl[0] + 6)} ${f(gl[1] + 1)} ${f(a1[0] - 4)} ${f(a1[1] - 3)} ${P(a1)} A${f(Rv)} ${f(Rv)} 0 0 0 ${P(a2)} C${f(a2[0] + 4)} ${f(a2[1] - 3)} ${f(dl[0] - 6)} ${f(dl[1] + 1)} ${P(dl)} L${d.map(P).join(' L')}`, h.a.contour));
    // le pot : la paroi de verre
    out.push(h.cercle(cx, cy, Rv, h.a.arete));
    out.push(h.cercle(cx, cy, Rv - POT.verre * EA, h.a.fin));
    // presser
    out.push(h.geste(`M${cx} 14 L${cx} ${f(cy - Rv - 6)}`));
    // l'œil et la ligne de vue, à travers les deux parois jusqu'à la peau
    const oe = [180, 30];
    out.push(h.path(`M${oe[0] - 15} ${oe[1]} Q${oe[0]} ${oe[1] - 11} ${oe[0] + 15} ${oe[1]} Q${oe[0]} ${oe[1] + 10} ${oe[0] - 15} ${oe[1]} Z`, h.a.arete));
    out.push(h.cercle(oe[0] - 3, oe[1] + 1.5, 5.2, h.a.detail));
    out.push(h.cercle(oe[0] - 3.8, oe[1] + 2.2, 2.4, h.a.plein));
    const bas = pa(90);
    out.push(h.fleche(`M${oe[0] - 5} ${oe[1] + 10} L${f(bas[0] + 1)} ${f(bas[1] - 2)}`, h.a.cache));
    return out.join('\n');
  };

  // ─── C et D. ce qu'on voit dans la bande ─────────────────────────────────────────────
  const EC = 1.3, XC = 34, YC = 78;
  const pale = z => {
    const pot = potDessus(XC, YC, EC);
    const k = v => v * EC, b = k(POT.bande), xa = XC + k(3), xb = pot.xs;
    const clip = `<clipPath id="z2805-bande"><path fill="none" clip-rule="evenodd" d="M-20 -20 H${z.l + 20} V${z.h + 20} H-20 Z M${f(xa)} ${f(YC - b)} H${f(xb)} V${f(YC + b)} H${f(xa)} Z"/></clipPath>`;
    const taches = [[74, 78, 22, 21, 1], [134, 72, 22, 19, 2], [182, 88, 19, 16, 3], [108, 34, 14, 10, 4], [58, 120, 14, 9, 6], [152, 122, 13, 9, 8], [206, 46, 11, 8, 9], [222, 116, 10, 8, 5]]
      .map(([x, y, rx, ry, g]) => h.path(tache(x, y, rx, ry, g), ROUGE)).join('\n');
    return [DEFS, clip, `<g clip-path="url(#z2805-bande)">${taches}</g>`, pot.svg].join('\n');
  };
  const reste = z => {
    const pot = potDessus(XC, YC, EC);
    const out = [DEFS];
    out.push(h.path(tache(88, 84, 21, 15, 21), VIOLET));
    out.push(h.path(tache(170, 54, 12, 9, 22), VIOLET));
    out.push(h.path(tache(150, 110, 9, 7, 23), VIOLET));
    const pts = semis(125, 80, 118, 62, 58, 5).filter(p => Math.hypot((p[0] - 88) / 25, (p[1] - 84) / 19) > 1);
    pts.push([56, 44, 1.6]);
    out.push(points(pts));
    out.push(pot.svg);
    return out.join('\n');
  };

  // ─── E. sur une peau foncée ───────────────────────────────────────────────────────────
  // la plante d'un pied gauche vue de dessous, orteils en haut : le gros orteil à gauche, les
  // quatre autres de plus en plus petits sur une ligne qui descend vers le petit orteil ; le talon
  // rond, la voûte qui rétrécit le pied côté gros orteil, la plante large sous les orteils.
  // Proportions d'un pied d'adulte (265 mm de long, 100 à la plante, 65 au talon), echelle e.
  // La peau foncée ne se voit qu'au bord, en liseré : la plante, pâle, prend tout le dessous.
  const pied = (fx, fy, e) => {
    const T = ([x, y]) => [fx + x * e, fy + y * e];
    // les orteils, du petit au gros : centre du bout, demi-largeur, demi-hauteur visible
    const orteils = [[46, -84, 7.5, 13], [31, -98, 8.6, 16], [15, -108, 9.2, 18], [-2, -113, 9.8, 19], [-30, -110, 17, 26]];
    const pts = [];
    const arc = (cx, cy, rx, ry, a0, a1, n = 9) => { for (let i = 0; i <= n; i++) { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); } };
    // le bord externe, du talon au petit orteil
    for (const q of [[0, 132], [22, 126], [34, 108], [38, 80], [40, 50], [44, 20], [49, -10], [53, -40], [55, -62], [54, -76]]) pts.push(q);
    // les orteils : le bout de chacun, puis le creux entre deux orteils
    orteils.forEach(([cx, cy, rx, ry], i) => {
      arc(cx, cy, rx, ry, i === 0 ? 30 : 5, i === 4 ? -175 : -175, 12);
      const suiv = orteils[i + 1];
      if (suiv) { const xm = (cx - rx + suiv[0] + suiv[2]) / 2, ym = Math.max(cy + ry, suiv[1] + suiv[3]) - 2; pts.push([xm + 1.5, ym - 4], [xm, ym], [xm - 1.5, ym - 4]); }
    });
    // le bord interne : la plante sous le gros orteil, la voûte, le talon
    for (const q of [[-50, -94], [-53, -72], [-52, -56], [-48, -32], [-38, -2], [-30, 28], [-28, 58], [-32, 88], [-30, 112], [-20, 128]]) pts.push(q);
    const contour = lisse(pts.map(T), true);
    const out = [`<clipPath id="z2805-pied"><path fill="none" d="${contour}"/></clipPath>`];
    out.push(h.path(contour, h.a.blanc));
    // le liseré de peau foncée sur le bord, et sur les côtés des orteils
    out.push(`<g clip-path="url(#z2805-pied)"><path d="${contour}" fill="none" stroke="url(#p2805-peau)" stroke-width="${f(10 * e * 2)}"/></g>`);
    // le pli sous les orteils : il sépare la pulpe de chaque orteil de la plante
    orteils.forEach(([cx, cy, rx, ry]) => out.push(h.path(`M${P(T([cx - rx * 0.85, cy + ry * 0.45]))} Q${P(T([cx, cy + ry * 0.95]))} ${P(T([cx + rx * 0.85, cy + ry * 0.45]))}`, h.a.fin)));
    out.push(h.path(contour, h.a.arete));
    // les points de sang, sur la plante pâle
    const sang = [[-20, -66, 1.5], [6, -70, 1.3], [26, -60, 1.6], [-8, -46, 1.2], [14, -38, 1.4], [-14, -20, 1.5], [6, -6, 1.3], [-6, 20, 1.6], [12, 34, 1.2], [-2, 60, 1.4], [8, 90, 1.3], [-10, 100, 1.5], [22, 6, 1.2], [-28, -52, 1.2]];
    out.push(points(sang.map(([x, y, r]) => { const q = T([x, y]); return [q[0], q[1], r]; })));
    return out.join('\n');
  };
  // la paume d'une main droite, doigts en haut, à la même échelle que le pied ; le liseré foncé
  // au bord, des points dans le creux de la paume
  const paume = (x, y, e) => {
    // la main droite ouverte, paume vers l'œil, doigts en haut (main simple, ouverte, vue de la paume) : les
    // jointures vers (x, y), le poignet à 94 mm plus bas, l'avant-bras coupé court
    const m = h.formes.mainSimple({ x, y: y + 94 * e, ancre: 'poignet', pose: 'ouverte', vue: 'paume', cote: 'droite', angle: -90, echelle: e, avantbras: { longueur: 30 } }).svg;
    const sang = [[-40, -8, 1.4], [-58, 4, 1.2], [-30, 14, 1.5], [-70, -14, 1.3], [-50, 22, 1.2], [-22, -4, 1.2]];
    // repère de la main : jointures en (x, y), poignet à 94 mm plus bas ; les points dans la paume
    return [m, points(sang.map(([dy, dx, r]) => [x - dx * e, y - dy * e, r]))].join('\n');
  };
  // l'œil, la paupière du bas tirée vers le bas
  const oeil = (cx, cy, rc) => {
    const Q = ([x, y]) => P([cx + x, cy + y]);
    const out = [];
    const haut = `M${Q([-46, 2])} C${Q([-28, -27])} ${Q([22, -31])} ${Q([47, -3])}`;
    const globe = `C${Q([26, 20])} ${Q([-24, 22])} ${Q([-46, 2])}`;
    const bord = `M${Q([-46, 2])} C${Q([-30, 40])} ${Q([28, 42])} ${Q([47, -3])}`;
    out.push(`<clipPath id="z2805-oeil"><circle cx="${cx}" cy="${cy}" r="${rc}"/></clipPath>`);
    out.push(`<clipPath id="z2805-globe"><path fill="none" d="${haut} ${globe} Z"/></clipPath>`);
    out.push(`<g clip-path="url(#z2805-oeil)">`);
    out.push(h.rect(cx - rc, cy - rc, 2 * rc, 2 * rc, PEAU));
    // l'ouverture entière (le blanc de l'œil et le dedans de la paupière), en blanc
    out.push(h.path(`${bord} C${Q([22, -31])} ${Q([-28, -27])} ${Q([-46, 2])} Z`, h.a.blanc));
    out.push(`<g clip-path="url(#z2805-globe)">${h.cercle(cx + 1, cy - 3, 18, h.a.detail)}${h.cercle(cx + 1, cy - 3, 7, h.a.plein)}${h.cercle(cx + 4, cy - 6, 2, h.a.blanc)}</g>`);
    // le bas du globe : la limite entre le blanc et la paupière retournée
    out.push(h.path(`M${Q([47, -3])} ${globe}`, h.a.detail));
    out.push(h.path(bord, h.a.arete));
    out.push(h.path(haut, h.a.contour));
    // le pli de la paupière du haut, les cils
    out.push(h.path(`M${Q([-40, -12])} C${Q([-22, -40])} ${Q([22, -44])} ${Q([44, -14])}`, h.a.detail));
    for (const [x, y, dx, dy] of [[-30, -13, -3, -6], [-18, -20, -1, -7], [-5, -23, 0, -7], [8, -23, 1, -7], [21, -19, 3, -6], [33, -12, 5, -5]]) out.push(h.ligne(cx + x, cy + y, cx + x + dx, cy + y + dy, h.a.fin));
    for (const [x, y, dx, dy] of [[-28, 22, -3, 6], [-14, 28, -1, 6], [0, 30, 0, 6], [14, 29, 1, 6], [28, 22, 3, 6]]) out.push(h.ligne(cx + x, cy + y, cx + x + dx, cy + y + dy, h.a.fin));
    // les points : sur le blanc et dans la paupière
    out.push(points([[-34, 4, 1.3], [-27, -4, 1.1], [-26, 8, 1.4], [30, 2, 1.2], [36, -4, 1.1], [-18, 26, 1.4], [-6, 30, 1.2], [8, 29, 1.5], [20, 26, 1.2], [-30, 18, 1.1]].map(([x, y, r]) => [cx + x, cy + y, r])));
    out.push(`</g>`);
    // tirer la paupière vers le bas
    out.push(h.rect(cx - 4, cy + 40, 8, 18, h.a.blanc));
    out.push(h.geste(`M${cx} ${cy + 40} L${cx} ${cy + 56}`));
    out.push(h.cercle(cx, cy, rc, h.a.detail));
    return out.join('\n');
  };
  // la bouche grande ouverte, la tête renversée : les dents du haut, le palais, la luette, la langue
  const bouche = (cx, cy, rc) => {
    const Q = ([x, y]) => P([cx + x, cy + y]);
    const out = [];
    const levres = `M${Q([-50, 0])} C${Q([-44, -42])} ${Q([-16, -50])} ${Q([-6, -46])} Q${Q([0, -42])} ${Q([6, -46])} C${Q([16, -50])} ${Q([44, -42])} ${Q([50, 0])} C${Q([46, 44])} ${Q([20, 54])} ${Q([0, 54])} C${Q([-20, 54])} ${Q([-46, 44])} ${Q([-50, 0])} Z`;
    const ouvert = `M${Q([-40, 0])} C${Q([-37, -32])} ${Q([-14, -37])} ${Q([0, -36])} C${Q([14, -37])} ${Q([37, -32])} ${Q([40, 0])} C${Q([36, 34])} ${Q([16, 42])} ${Q([0, 42])} C${Q([-16, 42])} ${Q([-36, 34])} ${Q([-40, 0])} Z`;
    out.push(`<clipPath id="z2805-bouche"><circle cx="${cx}" cy="${cy}" r="${rc}"/></clipPath>`);
    out.push(`<clipPath id="z2805-ouvert"><path fill="none" d="${ouvert}"/></clipPath>`);
    out.push(`<g clip-path="url(#z2805-bouche)">`);
    out.push(h.rect(cx - rc, cy - rc, 2 * rc, 2 * rc, PEAU));
    out.push(h.path(levres, h.a.arete));
    out.push(h.path(ouvert, h.a.blanc));
    out.push(`<g clip-path="url(#z2805-ouvert)">`);
    // la gorge, sombre, sous l'arche du voile ; la luette qui pend
    out.push(h.path(`M${Q([-22, 30])} C${Q([-22, 12])} ${Q([-15, 3])} ${Q([0, 2])} C${Q([15, 3])} ${Q([22, 12])} ${Q([22, 30])} Z`, h.a.plein));
    out.push(h.path(`M${Q([-25, 30])} C${Q([-25, 10])} ${Q([-17, 0])} ${Q([0, -1])} C${Q([17, 0])} ${Q([25, 10])} ${Q([25, 30])}`, h.a.detail));
    out.push(h.path(`M${Q([-4.5, 1])} C${Q([-5, 8])} ${Q([-4, 13])} ${Q([0, 13.5])} C${Q([4, 13])} ${Q([5, 8])} ${Q([4.5, 1])} Z`, BLANC_T(h.a.detail)));
    // la langue
    out.push(h.path(`M${Q([-44, 20])} C${Q([-30, 12])} ${Q([-14, 17])} ${Q([0, 17])} C${Q([14, 17])} ${Q([30, 12])} ${Q([44, 20])} L${Q([44, 46])} L${Q([-44, 46])} Z`, BLANC_T(h.a.arete)));
    out.push(h.ligne(cx, cy + 22, cx, cy + 34, h.a.fin));
    // les dents du haut : une rangée qui suit la lèvre
    const xs = [-34, -27, -20, -11, 0, 11, 20, 27, 34];
    const yb = x => -26 - 6 * (x / 34) ** 2;
    let d = `M${Q([-40, -38])} L${Q([-34, yb(-34) + 2])}`;
    for (let i = 0; i < xs.length - 1; i++) { const m = (xs[i] + xs[i + 1]) / 2; d += ` Q${Q([m, yb(m) + 3.2])} ${Q([xs[i + 1], yb(xs[i + 1])])}`; }
    d += ` L${Q([40, -38])} Z`;
    out.push(h.path(d, BLANC_T(h.a.detail)));
    for (const x of xs.slice(1, -1)) out.push(h.ligne(cx + x, cy + yb(x) - 11 + Math.abs(x) * 0.12, cx + x, cy + yb(x), h.a.fin));
    // les points sur le palais
    out.push(points([[-14, -18, 1.3], [-3, -20, 1.2], [9, -17, 1.4], [19, -13, 1.1], [-22, -9, 1.2], [2, -11, 1.1], [14, -5, 1.3], [-12, -5, 1.2], [-6, -13, 1.1], [24, -4, 1.2]].map(([x, y, r]) => [cx + x, cy + y, r])));
    out.push(`</g>`);
    out.push(h.path(ouvert, h.a.arete));
    out.push(`</g>`);
    out.push(h.cercle(cx, cy, rc, h.a.detail));
    return out.join('\n');
  };

  const foncee = z => [DEFS, pied(58, 73, 0.52), paume(160, 48, 0.52), oeil(300, 73, 62), bouche(505, 73, 62)].join('\n');

  return {
    ref: '28-05',
    titre: 'Le test du verre',
    desc: 'Le flanc d’un pot Mason couché, pressé fort sur la tache, et l’œil qui regarde à travers la paroi ; la tache qui pâlit et disparaît sous le verre (rougeur ordinaire) et celle qui reste visible (du sang sous la peau, en petits points puis en taches) ; sur une peau foncée, les zones pâles où l’on regarde : plante du pied, blanc de l’œil et intérieur de la paupière, palais.',
    format: 'pleine',
    disposition: [['geste', 'bout'], ['pale', 'reste'], ['foncee']],
    hauteurs: [3, 2.1, 2],
    largeurs: [[5, 3], [1, 1], [1]],
    vues: {
      geste: {
        titre: 'Presser le flanc, vu de dessus',
        dessin: geste,
        renvois: z => [
          { n: 1, rond: [330, YA - 80], cible: [XA + 120 * EA, YA - POT.R * EA + 1.5], texte: 'pot Mason couché, paroi lisse' },
          { n: 2, rond: [330, YA + 46], cible: [XA + 104 * EA, YA + 2], texte: 'la bande aplatie : on lit là' },
        ],
      },
      bout: {
        titre: 'Vu par le bout',
        dessin: bout,
        renvois: z => [
          { n: 3, rond: [50, 26], cible: [100, 30], texte: 'presser fort' },
          { n: 4, rond: [196, 104], cible: [148, 104], texte: 'regarder à travers la paroi' },
        ],
      },
      pale: {
        titre: 'Elle pâlit : rougeur ordinaire',
        dessin: pale,
        renvois: z => [
          { n: 5, rond: [12, 78], cible: [74, 78], texte: 'disparue sous le verre' },
        ],
      },
      reste: {
        titre: 'Elle reste : du sang sous la peau',
        dessin: reste,
        renvois: z => [
          { n: 6, rond: [12, 30], cible: [55, 43], texte: 'points en piqûre d’épingle' },
          { n: 7, rond: [12, 122], cible: [84, 82], texte: 'tache rouge ou violette' },
        ],
      },
      foncee: {
        titre: 'Sur une peau foncée, regarder où la peau est pâle',
        dessin: foncee,
        renvois: z => [
          { n: 8, rond: [112, 132], cible: [62, 112], texte: 'plante du pied, et paume' },
          { n: 9, rond: [214, 36], cible: [270, 76], texte: 'blanc de l’œil' },
          { n: 10, rond: [388, 128], cible: [312, 96], texte: 'intérieur de la paupière' },
          { n: 11, rond: [420, 30], cible: [497, 60], texte: 'palais' },
        ],
      },
    },
  };
};
