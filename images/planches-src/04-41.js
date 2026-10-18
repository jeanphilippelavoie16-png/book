// Planche 04-41. L'électroscope maison : monter, charger, lire (chapitre 4, §9, « Sans dosimètre :
// fabriquer l'électroscope » : « Le montage », « Ce qui fait échouer le montage », « Ce qu'on lit »).
// Dessinée le 15 octobre 2026 (JP : « c'est le genre d'affaire qui vaut la peine d'avoir une planche »).
// Tout vient du texte du chapitre. Cotes et durées : 1 cm au plus, 20 min au rouge sombre (§9) ; aucune
// autre mesure, aucune dimension du pot, des feuilles, du fil ni de l'échelle.
// Ce que le texte ne dit pas et que la planche dessine en principe, sans cote :
//   - comment les feuilles tiennent au fil : le bout du fil fait une petite barre, le haut des deux
//     feuilles est replié dessus ;
//   - comment le fil passe le bouchon : par le milieu du bouchon, le bouchon dans un trou du couvercle ;
//   - où va le gypse : au fond du pot (le texte dit « une portion dans l'appareil ») ;
//   - le pot de verre seulement ; la boîte de conserve sous couvercle transparent n'est pas dessinée.
// Le texte dit « un fil non conducteur » et charge « en approchant le sac du fil » : la planche dessine
// un fil sans dire de quoi il est fait (voir le rapport de la planche).
module.exports = (h) => {
  const A = h.a;
  const F = h.formes;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const RAD = Math.PI / 180;

  // Courbe lisse (Catmull-Rom) par des points ; ferme = true pour une forme.
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
  // Hasard répétable (les morceaux de gypse sont les mêmes à chaque composition).
  const hasard = graine => () => { graine = (graine * 16807) % 2147483647; return (graine - 1) / 2147483646; };
  // Un tas de morceaux de gypse : des polygones irréguliers, peints du fond vers le dessus.
  const morceaux = (x0, x1, yBas, rangs, r, graine, bord = null) => {
    const R = hasard(graine), o = [];
    for (let j = 0; j < rangs; j++) {
      const n = Math.max(2, Math.floor((x1 - x0) / (2.1 * r)));
      for (let i = 0; i < n; i++) {
        const cx = x0 + (i + 0.5 + (j % 2) * 0.4) * (x1 - x0) / (n + 0.4) + (R() - 0.5) * r * 0.6;
        const cy = yBas - r * 0.9 - j * r * 1.45 + (R() - 0.5) * r * 0.4;
        if (bord && !bord(cx, cy)) continue;
        const pts = [];
        const k = 5 + Math.floor(R() * 2);
        for (let q = 0; q < k; q++) { const a = (q / k) * 2 * Math.PI + R() * 0.5, rr = r * (0.7 + R() * 0.45); pts.push([cx + rr * Math.cos(a), cy + rr * 0.8 * Math.sin(a)]); }
        o.push(h.chemin(pts, W(A.detail), true));
      }
    }
    return o.join('\n');
  };
  // Des ondes de chaleur : trois traits qui ondulent vers le haut.
  const chaleur = (x, y, ht) => [-8, 0, 8].map(dx => {
    const p = []; for (let i = 0; i <= 6; i++) p.push([x + dx + (i % 2 ? 2.2 : -2.2) * (i && i < 6 ? 1 : 0), y - i * ht / 6]);
    return h.path(lisse(p), A.detail);
  }).join('\n');

  // ─── Le pot : verre, couvercle, bouchon isolant, fil, feuilles, échelle, gypse ────────────────
  // (cx, yb) : le milieu du fond ; k : l'échelle du dessin ; ecart : le demi-angle des feuilles (degrés).
  const pot = (cx, yb, k, { ecart = 8, gypse = true, echelle = true, interieur = true, couvercle = true } = {}) => {
    const o = [], P = {};
    const bw = 60 * k, nw = 40 * k, lw = 44 * k, rc = 14 * k;
    const yEp = yb - 140 * k, yCol = yb - 160 * k, yFil = yb - 170 * k, yCv = yb - 184 * k;
    const verre = `M${f1(cx - bw + rc)} ${f1(yb)} L${f1(cx + bw - rc)} ${f1(yb)} Q${f1(cx + bw)} ${f1(yb)} ${f1(cx + bw)} ${f1(yb - rc)} L${f1(cx + bw)} ${f1(yEp)} `
      + `C${f1(cx + bw)} ${f1(yEp - 12 * k)} ${f1(cx + nw)} ${f1(yCol + 10 * k)} ${f1(cx + nw)} ${f1(yCol)} L${f1(cx + nw)} ${f1(yFil)} L${f1(cx - nw)} ${f1(yFil)} `
      + `L${f1(cx - nw)} ${f1(yCol)} C${f1(cx - nw)} ${f1(yCol + 10 * k)} ${f1(cx - bw)} ${f1(yEp - 12 * k)} ${f1(cx - bw)} ${f1(yEp)} L${f1(cx - bw)} ${f1(yb - rc)} `
      + `Q${f1(cx - bw)} ${f1(yb)} ${f1(cx - bw + rc)} ${f1(yb)} Z`;
    o.push(h.path(verre, W(A.contour)));
    P.verre = [cx - bw, yb - 70 * k];
    const hy = yb - 122 * k, L = 54 * k, lf = 10 * k;
    P.accroche = [cx, hy];
    if (interieur) {
      // l'échelle de papier millimétré, collée derrière, à la hauteur des pointes
      if (echelle) {
        const ex0 = cx - 50 * k, ex1 = cx + 50 * k, ey0 = hy + 34 * k, ey1 = hy + 62 * k;
        o.push(h.rect(ex0, ey0, ex1 - ex0, ey1 - ey0, A.hachure('grillage', 'detail')));
        for (let x = cx - 50 * k; x <= cx + 50 * k + 0.1; x += 10 * k) o.push(h.ligne(x, ey0, x, ey1, A.detail));
        P.echelle = [ex0 + 4 * k, ey1];
        P.echelleHaut = [ex1, ey0];
      }
      if (gypse) { o.push(morceaux(cx - bw + 6 * k, cx + bw - 6 * k, yb - 2 * k, 2, 7 * k, 7)); P.gypse = [cx + bw - 16 * k, yb - 12 * k]; }
      // le fil, du bouchon à la barre ; les deux feuilles repliées sur la barre, qui s'écartent en V
      o.push(h.ligne(cx, yFil + 6 * k, cx, hy, A.arete), h.ligne(cx - 7 * k, hy, cx + 7 * k, hy, A.arete));
      const feuille = (s) => {
        const th = ecart * RAD, u = [s * Math.sin(th), Math.cos(th)], v = [s * Math.cos(th), -Math.sin(th)];
        const x0 = cx + s * 1.2 * k, p = (t, w) => [x0 + u[0] * t + v[0] * w, hy - 2 * k + u[1] * t + v[1] * w];
        const pts = [p(0, 0), p(0, lf), p(L, lf), p(L, 0)];
        return { svg: [h.chemin(pts, W(A.arete), true), h.ligne(...p(4 * k, 0), ...p(4 * k, lf), A.fin)].join('\n'), pointe: p(L, lf * 0.5), milieu: p(L * 0.55, lf) };
      };
      const fL = feuille(-1), fR = feuille(1);
      o.push(fL.svg, fR.svg);
      P.pointes = [fL.pointe, fR.pointe];
      P.feuille = fR.milieu;
      P.fil = [cx, (yFil + hy) / 2];
    }
    // le col fileté, le couvercle et le bouchon isolant qui le traverse ; le fil ressort au-dessus, en boucle
    for (const dy of [3, 7]) o.push(h.ligne(cx - nw + 2 * k, yFil + dy * k + 2 * k, cx + nw - 2 * k, yFil + dy * k - 1 * k, A.fin));
    if (couvercle) {
      o.push(h.rect(cx - lw, yCv, 2 * lw, yFil - yCv, W(A.arete)));
      for (let x = cx - lw + 6 * k; x < cx + lw - 3 * k; x += 6 * k) if (Math.abs(x - cx) > 9 * k) o.push(h.ligne(x, yCv + 2 * k, x, yFil - 2 * k, A.fin));
      o.push(h.rect(cx - 6 * k, yCv - 6 * k, 12 * k, yFil - yCv + 12 * k, W(A.arete) + ` rx="${f1(2 * k)}"`));
      o.push(h.ligne(cx, yCv - 6 * k, cx, yCv - 12 * k, A.arete), h.cercle(cx, yCv - 16 * k, 4 * k, A.arete));
      P.bouchon = [cx + 6 * k, yCv - 2 * k];
      P.boucle = [cx, yCv - 16 * k];
      P.haut = yCv - 20 * k;
    }
    // deux reflets sur le verre
    o.push(h.path(`M${f1(cx - bw + 9 * k)} ${f1(yEp - 2 * k)} Q${f1(cx - bw + 6 * k)} ${f1(yb - 70 * k)} ${f1(cx - bw + 9 * k)} ${f1(yb - 22 * k)}`, A.fin));
    o.push(h.path(`M${f1(cx - bw + 15 * k)} ${f1(yEp - 4 * k)} Q${f1(cx - bw + 13 * k)} ${f1(yEp + 20 * k)} ${f1(cx - bw + 15 * k)} ${f1(yEp + 40 * k)}`, A.fin));
    return { svg: o.join('\n'), P };
  };

  // ─── Le montage ───────────────────────────────────────────────────────────────────────────────
  const montage = z => {
    const k = 1.05, cx = z.l * 0.5, yb = z.h - 6;
    const p = pot(cx, yb, k, { ecart: 10 });
    const P = p.P;
    return {
      svg: p.svg,
      r: [
        { n: 1, rond: [24, yb - 150], cible: [cx - 60 * k - 1, yb - 150], texte: 'pot de verre fermé' },
        { n: 2, rond: [z.l - 34, 22], cible: P.bouchon, texte: 'bouchon isolant : plastique, cire, caoutchouc' },
        { n: 3, rond: [z.l - 30, 72], cible: [P.fil[0] + 1, P.fil[1]], texte: 'fil qui porte les feuilles' },
        { n: 4, rond: [z.l - 22, 128], cible: P.feuille, texte: 'deux feuilles d’aluminium identiques' },
        { n: 5, rond: [z.l - 22, 184], cible: P.echelleHaut, texte: 'papier millimétré collé derrière' },
        { n: 6, rond: [z.l - 22, z.h - 26], cible: P.gypse, texte: 'gypse cuit, contre l’humidité' },
      ],
    };
  };

  // ─── Le bouchon, en coupe : le fil ne touche que le bouchon ─────────────────────────────────
  const bouchon = z => {
    const o = [], cx = z.l / 2, yL = 58, ep = 4, bw = 18, bh = 40;
    // le col du pot, en coupe (le verre en blanc, sans hachure), et le couvercle de tôle (noir)
    const nw = 64;
    o.push(h.rect(cx - nw - 6, yL + ep, 6, z.h - yL - ep - 2, W(A.arete)), h.rect(cx + nw, yL + ep, 6, z.h - yL - ep - 2, W(A.arete)));
    o.push(h.rect(cx - nw - 12, yL, nw + 12 - bw, ep, A.plein), h.rect(cx + bw, yL, nw + 12 - bw, ep, A.plein));
    o.push(h.rect(cx - nw - 12, yL, ep, 22, A.plein), h.rect(cx + nw + 12 - ep, yL, ep, 22, A.plein));
    // le bouchon isolant dans le trou, qui dépasse dessus et dessous
    o.push(h.rect(cx - bw, yL - bh / 2 + 2, 2 * bw, bh, A.hachure('isolant', 'arete') + ' rx="3"'));
    // le fil par le milieu du bouchon ; la boucle dessus ; la barre et le haut des feuilles dessous
    const yBas = z.h - 14;
    o.push(h.ligne(cx, 15, cx, yBas, A.arete), h.cercle(cx, 10, 5, A.arete));
    for (const s of [-1, 1]) {
      const xa = cx + s * 1.5, xb = cx + s * 14;
      o.push(h.path(`M${f1(xa)} ${f1(z.h)} L${f1(xa)} ${f1(yBas - 3)} L${f1(xb)} ${f1(yBas - 3)} L${f1(xb)} ${f1(z.h)}`, W(A.arete)));
      o.push(h.path(`M${f1(xa)} ${f1(yBas + 3)} L${f1(xb)} ${f1(yBas + 3)}`, A.fin));
    }
    o.push(h.ligne(cx - 17, yBas, cx + 17, yBas, A.arete));
    o.push(h.controle(cx - bw - 1, yL + 2, 9));
    return { svg: o.join('\n'), r: [{ n: 7, rond: [24, 104], cible: [cx - bw - 7, yL + 9], texte: 'rien de métallique ne touche le pot' }] };
  };

  // ─── Frotter le sac sur un tissu sec ─────────────────────────────────────────────────────────
  const DY_MAIN = 0;
  const frotter = z => {
    const o = [], yT = z.h - 28;
    // la table, en coupe
    o.push(h.rect(0, yT, z.l, 12, A.hachure('bois')));
    // le tissu plié en trois
    const tx0 = 30, tx1 = 166;
    for (let i = 0; i < 3; i++) o.push(h.path(lisse([[tx0 + i * 2, yT - i * 4], [tx0 + i * 2 - 3, yT - i * 4 - 2.5], [tx0 + i * 2, yT - i * 4 - 4], [tx1 - i * 3, yT - i * 4 - 4], [tx1 - i * 3 + 3, yT - i * 4 - 2], [tx1 - i * 3, yT - i * 4]], true), W(A.detail)));
    const yS = yT - 12;
    // le sac de plastique, à plat, froissé
    o.push(h.path(lisse([[46, yS + 0.5], [60, yS - 3], [80, yS - 1.5], [100, yS - 4], [124, yS - 2], [146, yS - 3.5], [154, yS], [130, yS + 0.8], [90, yS + 0.8]], true), W(A.arete)));
    for (const x of [64, 92, 118, 140]) o.push(h.path(`M${x} ${f1(yS - 2)} q3 -2 6 0`, A.fin));
    // la main à plat sur le sac, paume vers le bas, vue de côté : la main 1-08 de la bibliothèque, sans sa tige
    // (JP, 18 octobre 2026 : « la main est à l'envers, paume vers le sol il faut », puis, sur la main écrasée : « laid »).
    // Elle penche un peu, le poignet plus haut que les doigts ; l'avant-bras continue la main jusqu'au bord gauche.
    const ANG = 8, T = 96, CX = 108, CY = yS - 22 + DY_MAIN;
    const m = F.mainStock({ id: '1-08', objet: false, taille: T, angle: ANG, ancre: 'centre', x: CX, y: CY });
    const m0 = F.mainStock({ id: '1-08', objet: false, taille: T, angle: 0, ancre: 'centre', x: CX, y: CY });
    const Hm = m0.boite.y1 - m0.boite.y0, th = ANG * RAD;
    const tourne = ([x, y]) => [CX + (x - CX) * Math.cos(th) - (y - CY) * Math.sin(th), CY + (x - CX) * Math.sin(th) + (y - CY) * Math.cos(th)];
    // la coupe du poignet, relevée sur le dessin de la main (le catalogue ne la donne pas juste pour celle-ci)
    const pH = tourne([m0.boite.x0 + 10, m0.boite.y0 + 0.145 * Hm]), pB = tourne([m0.boite.x0 + 10, m0.boite.y0 + 0.86 * Hm]);
    const u = [-Math.cos(th), -Math.sin(th)];
    const L = pH[0] / -u[0] + 2;
    const qH = [pH[0] + u[0] * L, pH[1] + u[1] * L], qB = [pB[0] + u[0] * L, pB[1] + u[1] * L];
    o.push(m.svg);
    // l'avant-bras par-dessus la coupe : le fond blanc, puis ses deux bords (il sort de la vue, il n'a pas de bout)
    o.push(h.path(`M${f1(pH[0])} ${f1(pH[1])} L${f1(qH[0])} ${f1(qH[1])} L${f1(qB[0])} ${f1(qB[1])} L${f1(pB[0])} ${f1(pB[1])} Z`, 'fill="#FFFFFF" stroke="none"'));
    o.push(h.path(`M${f1(qH[0])} ${f1(qH[1])} L${f1(pH[0])} ${f1(pH[1])}`, A.arete));
    o.push(h.path(`M${f1(qB[0])} ${f1(qB[1])} L${f1(pB[0])} ${f1(pB[1])}`, A.arete));
    // le geste : frotter, aller et retour, au-dessus du dos de la main
    o.push(h.geste(`M${f1(84)} ${f1(yS - 60)} L${f1(160)} ${f1(yS - 60)}`, { double: true }));
    return { svg: o.join('\n'), r: [] };
  };

  // ─── L'approcher du fil : les feuilles s'écartent en V ───────────────────────────────────────
  const approcher = z => {
    const o = [], k = 0.5, cx = z.l - 46, yb = z.h - 2;
    const p = pot(cx, yb, k, { ecart: 22, gypse: true });
    o.push(p.svg);
    const bc = p.P.boucle;
    // le sac tenu par son col froncé, le ventre du sac à hauteur de la boucle du fil, à gauche du pot
    const fx = 42, fy = 22;
    const sacD = [[fx + 2, fy + 6], [fx + 16, fy + 10], [fx + 34, fy + 16], [fx + 52, fy + 22], [fx + 58, fy + 38], [fx + 46, fy + 58], [fx + 22, fy + 62], [fx + 2, fy + 50], [fx - 6, fy + 28]];
    o.push(h.path(lisse(sacD, true), W(A.arete)));
    for (const [a, b] of [[[fx + 8, fy + 18], [fx + 16, fy + 44]], [[fx + 26, fy + 22], [fx + 34, fy + 48]]]) o.push(h.path(lisse([a, [(a[0] + b[0]) / 2 + 3, (a[1] + b[1]) / 2], b]), A.fin));
    // le col froncé qui dépasse du poing
    o.push(h.path(lisse([[fx - 3, fy - 8], [fx, fy - 15], [fx + 4, fy - 9], [fx + 7, fy - 16], [fx + 9, fy - 6]]), A.detail));
    const m = F.mainSimple({ pose: 'prise-manche', vue: 'dos', cote: 'droite', angle: 0, diametre: 16, echelle: 0.22, ancre: 'prise', x: fx + 3, y: fy,
      avantbras: { vers: [-60, -10], bord: { x0: 0, y0: 0, x1: z.l, y1: z.h } } });
    o.push(m.svg);
    // le geste : approcher le sac de la boucle
    o.push(h.geste(`M${f1(fx + 62)} ${f1(bc[1])} L${f1(bc[0] - 9)} ${f1(bc[1])}`));
    return { svg: o.join('\n'), r: [] };
  };

  // ─── Lire : l'écartement contre l'échelle, puis le temps que les feuilles mettent à se refermer ─
  const lecture = z => {
    const o = [], k = 0.72, yb = z.h - 6, c1 = 112, c2 = z.l - 52;
    const p1 = pot(c1, yb, k, { ecart: 24 }), p2 = pot(c2, yb, k, { ecart: 9 });
    o.push(p1.svg, p2.svg);
    // la lampe de poche, couchée, qui éclaire de côté à la hauteur des pointes
    const yl = p1.P.pointes[0][1] - 2, lx = 8;
    o.push(h.rect(lx, yl - 5, 22, 10, W(A.arete) + ' rx="2"'), h.path(`M${lx + 22} ${f1(yl - 5)} L${lx + 32} ${f1(yl - 9)} L${lx + 32} ${f1(yl + 9)} L${lx + 22} ${f1(yl + 5)} Z`, W(A.arete)));
    o.push(h.rect(lx + 6, yl - 7, 5, 2, A.plein));
    for (const dy of [-6, 0, 6]) o.push(h.fleche(`M${lx + 36} ${f1(yl + dy * 0.6)} L${f1(c1 - 60 * k - 4)} ${f1(yl + dy)}`, A.cache));
    // la montre entre les deux pots
    const mx = (c1 + c2) / 2 + 2, my = yb - 104 * k;
    o.push(h.rect(mx - 6, my - 26, 12, 14, W(A.detail)), h.rect(mx - 6, my + 12, 12, 14, W(A.detail)));
    o.push(h.cercle(mx, my, 13, W(A.arete)), h.cercle(mx, my, 10.5, A.fin), h.rect(mx + 13, my - 2, 3, 4, A.plein));
    o.push(h.ligne(mx, my, mx, my - 8, A.arete), h.ligne(mx, my, mx + 6, my + 2, A.detail));
    o.push(h.fleche(`M${f1(mx - 16)} ${f1(my + 34)} Q${f1(mx)} ${f1(my + 44)} ${f1(mx + 16)} ${f1(my + 34)}`, A.detail));
    // le point à lire : la pointe des feuilles contre l'échelle
    const pt = p1.P.pointes[1];
    o.push(h.controle(pt[0], pt[1], 7));
    return {
      svg: o.join('\n'),
      r: [
        { n: 8, rond: [20, yl - 34], cible: [lx + 12, yl - 6], texte: 'lumière rasante, de côté' },
        { n: 9, rond: [c1 + 46, yb - 10], cible: [pt[0] + 4, pt[1] + 6], texte: 'lire l’écartement sur l’échelle' },
        { n: 10, rond: [mx, 22], cible: [mx, my - 26], texte: 'même chronométrage chaque jour' },
      ],
    };
  };

  // ─── Le gypse : sans papier, cassé ; cuit ; mis encore chaud en pot fermé ────────────────────
  const casser = z => {
    const o = [], yT = z.h - 26;
    o.push(h.rect(0, yT, z.l, 12, A.hachure('bois')));
    // la plaque de placoplâtre, en coupe : le cœur de gypse, le papier dessus et dessous ; le papier du
    // dessus décollé et retroussé ; le bout cassé
    const x0 = 6, x1 = 104, ep = 16;
    o.push(h.path(`M${x0} ${f1(yT - ep)} L${x1 - 4} ${f1(yT - ep)} L${x1} ${f1(yT - ep + 5)} L${x1 - 4} ${f1(yT - ep + 9)} L${x1 + 1} ${f1(yT)} L${x0} ${f1(yT)} Z`, A.hachure('terre', 'arete')));
    o.push(h.ligne(x0, yT - 2, x1 + 0.5, yT - 2, A.detail));
    // le papier du dessus, décollé jusqu'au milieu et retroussé (une bande, vue par la tranche)
    const papier = [[x0, yT - ep - 1.5], [40, yT - ep - 1.5], [56, yT - ep - 5], [66, yT - ep - 16], [64, yT - ep - 30], [54, yT - ep - 36]];
    o.push(h.path(lisse(papier), 'fill="none" stroke="#1A1A1A" stroke-width="2.4" stroke-linecap="round"'));
    o.push(h.path(lisse(papier), 'fill="none" stroke="#FFFFFF" stroke-width="0.9" stroke-linecap="round"'));
    // les morceaux, en tas sur la table
    o.push(morceaux(118, 176, yT, 2, 5, 11));
    return { svg: o.join('\n'), r: [] };
  };
  const cuire = z => {
    const o = [], yS = z.h - 6;
    // le poêle : le corps, la porte, la plaque du dessus, le tuyau
    const px0 = 26, px1 = 168, pTop = 78;
    o.push(h.rect(px0, pTop, px1 - px0, yS - pTop - 10, W(A.contour)));
    o.push(h.rect(px0 - 4, pTop - 5, px1 - px0 + 8, 5, A.hachure('metal', 'arete')));
    o.push(h.rect(px0 + 14, pTop + 12, 64, yS - pTop - 34, W(A.arete)), h.rect(px0 + 66, pTop + 30, 6, 10, A.plein));
    o.push(h.rect(px0 + 6, yS - 10, 6, 10, A.plein), h.rect(px1 - 12, yS - 10, 6, 10, A.plein));
    o.push(h.rect(px1 - 30, 0, 18, pTop - 5, W(A.arete)));
    // la boîte de conserve sur la plaque, pleine de morceaux
    const bx0 = 50, bx1 = 92, bTop = pTop - 5 - 44;
    o.push(h.rect(bx0, bTop, bx1 - bx0, pTop - 5 - bTop, W(A.arete)));
    for (const dy of [12, 22, 32]) o.push(h.ligne(bx0 + 1, bTop + dy, bx1 - 1, bTop + dy, A.fin));
    o.push(morceaux(bx0 + 3, bx1 - 3, bTop + 2, 1, 4.5, 23));
    o.push(chaleur((bx0 + bx1) / 2, bTop - 6, 22));
    return { svg: o.join('\n'), r: [] };
  };
  const enpot = z => {
    const o = [], k = 0.6, cx = z.l * 0.45, yb = z.h - 4;
    const p = pot(cx, yb, k, { interieur: false, couvercle: false });
    o.push(p.svg);
    o.push(morceaux(cx - 56 * k, cx + 56 * k, yb - 2, 6, 4.6, 31, (x, y) => y > yb - 120 * k));
    // le couvercle, au-dessus, qui descend
    const lw = 44 * k, yC = yb - 214 * k;
    o.push(h.rect(cx - lw, yC, 2 * lw, 14 * k, W(A.arete)));
    for (let x = cx - lw + 6 * k; x < cx + lw - 3 * k; x += 6 * k) o.push(h.ligne(x, yC + 2 * k, x, yC + 12 * k, A.fin));
    o.push(chaleur(cx, yb - 172 * k, 14));
    o.push(h.geste(`M${f1(cx + lw + 14)} ${f1(yC)} L${f1(cx + lw + 14)} ${f1(yb - 172 * k)}`));
    return { svg: o.join('\n'), r: [] };
  };

  const cache = {};
  const vue = (nom, titre, fn) => ({
    titre,
    dessin: z => { const k = `${nom} ${z.l} ${z.h}`; return (cache[k] = cache[k] || fn(z)).svg; },
    renvois: z => { const k = `${nom} ${z.l} ${z.h}`; return (cache[k] = cache[k] || fn(z)).r; },
  });

  return {
    ref: '04-41',
    titre: 'L’électroscope maison : monter, charger, lire',
    desc: 'En haut à gauche, le montage : un pot de verre fermé de son couvercle ; un bouchon isolant traverse le couvercle en son milieu, et le fil qui le traverse ressort au-dessus en petite boucle ; dans le pot, le fil descend jusqu’à une petite barre où pendent, repliées par leur haut, deux feuilles d’aluminium identiques, un peu écartées en V ; derrière les pointes, une bande de papier millimétré collée au pot ; au fond, des morceaux de gypse cuit. En haut à droite, la lecture : une lampe de poche couchée éclaire de côté, au ras de l’échelle ; deux pots, le premier aux feuilles grandes ouvertes, le second aux feuilles presque refermées, une montre entre les deux ; un cercle rouge marque la pointe des feuilles contre l’échelle. Au milieu, de gauche à droite : le bouchon en coupe, le fil par son milieu et rien d’autre qui touche le couvercle de tôle ; une main à plat frotte un sac de plastique sur un tissu plié en trois, sur une table ; une main tient le sac par son col froncé et l’approche de la boucle du fil, et les feuilles s’écartent. En bas, le gypse : une plaque de placoplâtre au papier décollé, cassée en petits morceaux ; une boîte de conserve pleine de morceaux sur la plaque d’un poêle, la chaleur qui monte ; un pot rempli de morceaux encore chauds, le couvercle qui descend pour le fermer.',
    format: 'pleine',
    disposition: [['montage', 'lecture'], ['bouchon', 'frotter', 'approcher'], ['casser', 'cuire', 'enpot']],
    hauteurs: [1.55, 1, 1],
    vues: {
      montage: vue('montage', 'Le montage', montage),
      lecture: vue('lecture', 'Lire : la vitesse de fermeture', lecture),
      bouchon: vue('bouchon', 'Le bouchon, en coupe', bouchon),
      frotter: vue('frotter', 'Frotter le sac sur un tissu sec', frotter),
      approcher: vue('approcher', 'L’approcher du fil', approcher),
      casser: vue('casser', 'Sans papier, 1 cm au plus', casser),
      cuire: vue('cuire', 'Au rouge sombre, 20 min', cuire),
      enpot: vue('enpot', 'Encore chaud, en pot fermé', enpot),
    },
  };
};
