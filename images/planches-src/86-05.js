// 86-05 — Mesurer un ruisseau (ch. 86, §9 C « Le courant du ruisseau », « Mesurer d'abord »,
// points 1 et 2 ; danger repris de « L'hiver » : le travail dans le ruisseau se fait à deux).
// Cotes : aucune en mm. Rien ne se construit à la mesure : le chapitre ne donne ni hauteur de
// barrage, ni longueur de goulotte, ni longueur de boyau. Les seules cotes sont les hauteurs
// qu'on mesure, h1, h2, h3 et H, sans chiffre.
// Le montage, suivi comme l'eau :
//  - Au seau : l'eau monte derrière les planches jusqu'à l'encoche, où la goulotte est posée ;
//    tout le ruisseau passe dans la goulotte (la crête des planches est plus haute que le fond
//    de la goulotte, et les planches entrent dans les berges), tombe au bout de la goulotte dans
//    la chaudière posée plus bas, sous un petit saut du lit. On compte les secondes jusqu'au
//    plein : L/s = 20 ÷ secondes.
//  - Au boyau : le boyau plein, un bout à la surface de l'eau de la prise ; l'eau coule par
//    l'autre bout, plus bas, tant qu'il est sous le niveau de la prise. On le lève : l'eau cesse
//    de couler quand il arrive au niveau de l'eau de la prise (le trait tireté). La hauteur de ce
//    bout au-dessus de l'eau à cet endroit est la chute du tronçon.
//  - Au manomètre : le boyau plein de la prise à la roue, bout du haut ouvert à la surface, bout
//    du bas fermé par le manomètre : l'eau ne coule pas, la jauge lit la hauteur d'eau H.

module.exports = (h) => {
  const A = h.a, F = h.formes, W = A.blanc;
  const r1 = v => Math.round(v * 10) / 10;
  const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k];
  const uni = v => { const L = Math.hypot(v[0], v[1]) || 1; return [v[0] / L, v[1] / L]; };

  // Cadre : un dessin nominal (x0, y0, BW × BH) centré et mis à l'échelle dans la zone.
  const cadre = (z, x0, y0, BW, BH) => {
    const s = Math.min(z.l / BW, z.h / BH);
    const ox = (z.l - BW * s) / 2 - x0 * s, oy = (z.h - BH * s) / 2 - y0 * s;
    const P = (x, y) => [ox + x * s, oy + y * s];
    const Q = pts => pts.map(p => P(p[0], p[1]));
    return { s, P, Q };
  };
  const poly = (pts, trait = A.arete) => h.chemin(pts, W, true) + '\n' + h.chemin(pts, trait, true);
  // Courbe lisse (Catmull-Rom) par des points déjà en coordonnées de vue.
  const dL = (pts, cmd = 'M') => {
    const n = pts.length;
    let d = `${cmd} ${r1(pts[0][0])} ${r1(pts[0][1])}`;
    for (let i = 0; i < n - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(n - 1, i + 2)];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`;
    }
    return d;
  };
  // La terre coupée : pleine en blanc jusqu'en bas (ce qui entre dans la berge disparaît), la
  // hachure sur une bande sous la surface, le dessus au trait fort.
  const terre = (Q, dessus, bas, bande) => {
    const T = Q(dessus), n = T.length;
    const plein = `${dL(T)} L ${r1(T[n - 1][0])} ${r1(Q([[0, bas]])[0][1])} L ${r1(T[0][0])} ${r1(Q([[0, bas]])[0][1])} Z`;
    const B = Q(dessus.map(p => [p[0], p[1] + bande])).reverse();
    const hach = `${dL(T)} ${dL(B, 'L')} Z`;
    return [h.path(plein, W), h.path(hach, A.hachure('terre', 'aucun')), h.path(dL(T), A.contour)].join('\n');
  };
  // L'eau : de la surface jusque sous le lit (la terre, peinte après, cache le bas).
  const eau = (Q, surf, bas) => {
    const S = Q(surf), n = S.length, yb = Q([[0, bas]])[0][1];
    const d = `${dL(S)} L ${r1(S[n - 1][0])} ${r1(yb)} L ${r1(S[0][0])} ${r1(yb)} Z`;
    return [h.path(d, W), h.path(d, A.hachure('eau', 'aucun')), h.path(dL(S), A.arete)].join('\n');
  };
  const sol = (Q, x1, x2, y) => h.chemin(Q([[x1, y], [x2, y]]), A.arete);

  // ═══════════════════ Au seau : le barrage, la goulotte, la chaudière ═══════════════════
  // Unités : mm. y vers le bas. Le lit d'en haut à 600, un saut de pierre, le lit d'en bas à 850.
  // Planches de 50 : P1 de 400 à 600, P2 de 200 à 400, encoche de 200 à 330 au milieu.
  // Goulotte : dessous du fond à 330 au barrage, pente de 6 %, de x = 650 (dans l'eau) à 1350.
  // L'eau derrière le barrage à 250 : au-dessus du fond de la goulotte, sous la crête des planches.
  // Chaudière : 300 en haut, 260 au fond, 370 de haut, posée sur le lit d'en bas, sous le bout.
  const gy = x => 330 + (x - 925) * 0.06;   // dessous du fond de la goulotte
  const EPF = 25, MUR = 100;                // épaisseur du fond, hauteur des côtés
  const XG0 = 650, XG1 = 1350;              // entrée et bout de la goulotte
  const SURF_H = 250;                       // l'eau derrière le barrage
  const LIT_B = 850, SURF_B = 822;          // le lit et l'eau en bas du saut
  const CH = { x: 1450, haut: LIT_B - 370, rH: 150, rB: 130, eau: 680 };
  const eauGoulotte = x => x <= 925 ? SURF_H + (x - XG0) / (925 - XG0) * 12 : SURF_H + 12 + (x - 925) / (XG1 - 925) * 36;

  const X0C = 300, Y0C = 140, BWC = 1460, BHC = 880;
  function dessinCoupe(z) {
    const { s, P, Q } = cadre(z, X0C, Y0C, BWC, BHC);
    const o = [];
    const bas = Y0C + BHC;
    // L'eau en haut, derrière le barrage ; l'eau en bas du saut.
    o.push(eau(Q, [[X0C, SURF_H], [900, SURF_H]], bas - 30));
    o.push(eau(Q, [[1190, SURF_B], [X0C + BWC, SURF_B]], bas - 30));
    // Le lit : le haut, le saut, le bas.
    o.push(terre(Q, [[X0C, 655], [600, 646], [900, 600], [1080, 603], [1150, 612], [1178, 670], [1192, 770], [1215, 846], [1280, LIT_B + 4], [1600, LIT_B + 6], [X0C + BWC, LIT_B]], bas, 140));
    // Le piquet, en aval des planches, vu au-delà de la coupe ; la pointe enfoncée, cachée.
    o.push(poly(Q([[950, 170], [996, 170], [996, 602], [950, 602]])));
    o.push(h.chemin(Q([[950, 602], [950, 740], [973, 800], [996, 740], [996, 602]]), A.cache));
    // Les planches, coupées au milieu : P1 entière, P2 sous l'encoche.
    o.push(h.rect(...P(900, 400), 50 * s, 200 * s, A.hachure('bois', 'arete')));
    o.push(h.rect(...P(900, 330), 50 * s, 70 * s, A.hachure('bois', 'arete')));
    // La goulotte : le côté du fond (au-delà), l'eau dedans, le fond coupé.
    o.push(poly(Q([[XG0, gy(XG0)], [XG1, gy(XG1)], [XG1, gy(XG1) - EPF - MUR], [XG0, gy(XG0) - EPF - MUR]])));
    const nappe = [];
    for (let x = XG0; x <= XG1 + 1; x += 25) nappe.push([x, eauGoulotte(x)]);
    const eauGo = [...nappe, [XG1, gy(XG1) - EPF], [XG0, gy(XG0) - EPF]];
    o.push(h.chemin(Q(eauGo), W, true), h.chemin(Q(eauGo), A.hachure('eau', 'aucun'), true));
    o.push(h.chemin(Q(nappe), A.detail));
    o.push(h.chemin(Q([[XG0, gy(XG0)], [XG1, gy(XG1)], [XG1, gy(XG1) - EPF], [XG0, gy(XG0) - EPF]]), A.hachure('bois', 'arete'), true));
    // Le jet, du bout de la goulotte dans la chaudière.
    const ye = eauGoulotte(XG1), yl = gy(XG1) - EPF;
    const pq = (x, y) => P(x, y).map(r1).join(' ');
    const jet = `M ${pq(XG1, ye)} Q ${pq(XG1 + 95, ye + 2)} ${pq(1492, CH.eau)} L ${pq(1440, CH.eau)} Q ${pq(XG1 + 40, yl + 14)} ${pq(XG1, yl)} Z`;
    o.push(h.path(jet, W), h.path(jet, A.detail));
    o.push(h.path(`M ${pq(XG1 + 8, ye + 12)} Q ${pq(XG1 + 70, ye + 20)} ${pq(1466, CH.eau - 8)}`, A.fin));
    // La chaudière, coupée au milieu : parois, fond, rebord, l'eau qui monte.
    const cx = CH.x, yH = CH.haut, e = 12;
    const tx = y => (y - yH) / (LIT_B - yH);
    const inL = y => cx - CH.rH + e + (CH.rH - CH.rB) * tx(y), inR = y => cx + CH.rH - e - (CH.rH - CH.rB) * tx(y);
    const eauC = [[inL(CH.eau), CH.eau], [inR(CH.eau), CH.eau], [inR(LIT_B - e), LIT_B - e], [inL(LIT_B - e), LIT_B - e]];
    o.push(h.chemin(Q(eauC), W, true), h.chemin(Q(eauC), A.hachure('eau', 'aucun'), true), h.chemin(Q(eauC.slice(0, 2)), A.detail));
    o.push(h.chemin(Q([[cx - CH.rH, yH], [cx - CH.rH + e, yH], [cx - CH.rB + e, LIT_B - e], [cx + CH.rB - e, LIT_B - e], [cx + CH.rH - e, yH], [cx + CH.rH, yH], [cx + CH.rB, LIT_B], [cx - CH.rB, LIT_B]]), A.plein, true));
    o.push(h.ligne(...P(cx - CH.rH + e, yH), ...P(cx + CH.rH - e, yH), A.fin));
    [cx - CH.rH - 4, cx + CH.rH + 4].forEach(x => o.push(h.cercle(...P(x, yH + 6), 11 * s, A.plein)));
    // L'anse, couchée sur le côté d'aval, loin du jet.
    o.push(h.path(`M ${pq(cx + CH.rH, yH + 40)} Q ${pq(cx + CH.rH + 150, yH + 90)} ${pq(cx + CH.rH + 60, yH + 200)}`, A.arete));
    return o.join('\n');
  }

  // Vu de l'aval, coupé au travers du ruisseau par le milieu de la chaudière.
  const X0A = -900, Y0A = Y0C, BWA = 1800, BHA = BHC;
  function dessinAval(z) {
    const { s, P, Q } = cadre(z, X0A, Y0A, BWA, BHA);
    const o = [];
    const U0 = 140, U1 = 118;   // côtés de la goulotte : dehors, dedans
    // Les planches, d'une berge à l'autre ; P2 porte l'encoche.
    o.push(poly(Q([[-880, 400], [880, 400], [880, 600], [-880, 600]])));
    o.push(poly(Q([[-880, 200], [-U0, 200], [-U0, 330], [U0, 330], [U0, 200], [880, 200], [880, 400], [-880, 400]])));
    [[260, -900, -250], [340, 250, 900], [470, -900, 600], [540, -600, 900]].forEach(([y, a, b]) => o.push(h.ligne(...P(a, y), ...P(b, y), A.fin)));
    // Le saut de pierre, sous le lit d'en haut.
    const levre = Q([[-700, 606], [-420, 596], [-120, 606], [200, 598], [480, 606], [700, 600]]);
    o.push(h.path(dL(levre) + ' L ' + P(640, 850).map(r1).join(' ') + ' L ' + P(-640, 850).map(r1).join(' ') + ' Z', A.hachure('pierre', 'aucun')));
    o.push(h.path(dL(levre), A.arete));
    // Les deux piquets, devant les planches.
    [-470, 470].forEach(u => {
      o.push(poly(Q([[u - 23, 170], [u + 23, 170], [u + 23, 602], [u - 23, 602]])));
      o.push(h.ligne(...P(u, 210), ...P(u, 560), A.fin));
    });
    // La goulotte : son corps qui monte vers le barrage, puis son bout, en U.
    const yb = gy(XG1), yf = yb - EPF, yt = yf - MUR, ytb = gy(925) - EPF - MUR;
    const U = [[-U0, yt], [-U1, yt], [-U1, yf], [U1, yf], [U1, yt], [U0, yt], [U0, yb], [-U0, yb]];
    o.push(poly(Q([[-U0, ytb], [U0, ytb], [U0, yt], [-U0, yt]])));
    o.push(h.chemin(Q([[-U1, ytb], [-U1, yt]]), A.fin), h.chemin(Q([[U1, ytb], [U1, yt]]), A.fin));
    o.push(poly(Q(U), A.arete), h.chemin(Q(U), A.hachure('bois', 'aucun'), true));
    const eauU = [[-U1, eauGoulotte(XG1)], [U1, eauGoulotte(XG1)], [U1, yf], [-U1, yf]];
    o.push(h.chemin(Q(eauU), W, true), h.chemin(Q(eauU), A.hachure('eau', 'aucun'), true), h.chemin(Q(eauU.slice(0, 2)), A.detail));
    // L'eau d'en bas, coupée.
    o.push(eau(Q, [[-560, SURF_B], [560, SURF_B]], Y0A + BHA - 30));
    // La chaudière coupée : la paroi au-delà, parois coupées, fond, rebord, l'eau.
    const e = 12, yH = CH.haut;
    o.push(poly(Q([[-CH.rH, yH], [CH.rH, yH], [CH.rB, LIT_B], [-CH.rB, LIT_B]]), A.fin));
    const k = y => (y - yH) / (LIT_B - yH) * (CH.rH - CH.rB);
    const eauC = [[-CH.rH + e + k(CH.eau), CH.eau], [CH.rH - e - k(CH.eau), CH.eau], [CH.rB - e, LIT_B - e], [-CH.rB + e, LIT_B - e]];
    o.push(h.chemin(Q(eauC), W, true), h.chemin(Q(eauC), A.hachure('eau', 'aucun'), true), h.chemin(Q(eauC.slice(0, 2)), A.detail));
    o.push(h.chemin(Q([[-CH.rH, yH], [-CH.rH + e, yH], [-CH.rB + e, LIT_B - e], [CH.rB - e, LIT_B - e], [CH.rH - e, yH], [CH.rH, yH], [CH.rB, LIT_B], [-CH.rB, LIT_B]]), A.plein, true));
    o.push(h.ligne(...P(-CH.rH + e, yH), ...P(CH.rH - e, yH), A.detail));
    [-CH.rH - 4, CH.rH + 4].forEach(u => o.push(h.cercle(...P(u, yH + 6), 11 * s, A.plein)));
    // Le jet qui tombe du bout de la goulotte dans la chaudière.
    const gJ = dL(Q([[-112, yb], [-100, 520], [-84, CH.eau]])), dJ = dL(Q([[84, CH.eau], [100, 520], [112, yb]]), 'L');
    o.push(h.path(`${gJ} ${dJ} Z`, W));
    o.push(h.path(gJ, A.detail), h.path(dL(Q([[112, yb], [100, 520], [84, CH.eau]])), A.detail));
    [-50, 0, 50].forEach(u => o.push(h.path(dL(Q([[u * 1.1, yb + 25], [u, 520], [u * 0.85, CH.eau - 15]])), A.fin)));
    // La terre coupée : berges et lit.
    o.push(terre(Q, [[-900, 160], [-850, 172], [-760, 330], [-650, 600], [-560, 790], [-460, LIT_B], [0, LIT_B + 8], [460, LIT_B], [560, 790], [660, 600], [770, 330], [860, 172], [900, 160]], Y0A + BHA, 140));
    return o.join('\n');
  }

  // ═══════════════════ Au boyau : un tronçon ═══════════════════
  // Unités : mm. L'eau de la prise à 1000 ; l'eau en bas du tronçon à 2600 : la chute h1 = 1600.
  const SURF_T = [[150, 1000], [1000, 1000], [1120, 1070], [1500, 1250], [1900, 1380], [2010, 1560], [2500, 1760], [2900, 1900], [3040, 2150], [3500, 2330], [4000, 2480], [4280, 2600], [5500, 2600]];
  const LIT_T = [[-300, 940], [100, 985], [250, 1170], [520, 1250], [860, 1230], [1010, 1080], [1120, 1120], [1500, 1310], [1900, 1440], [1990, 1630], [2500, 1830], [2900, 1970], [3020, 2220], [3500, 2400], [4000, 2550], [4260, 2670], [4700, 2700], [5100, 2690], [5500, 2700]];
  const XB = 4700;                  // le boyau levé, en bas du tronçon
  const X0T = -250, Y0T = -230, BWT = 5700, BHT = 3160;
  function geoTroncon(z) {
    const c = cadre(z, X0T, Y0T, BWT, BHT);
    const { s, P } = c;
    // Accroupi sur la berge, au penché naturel de la pose : le poignet à 340 devant les pieds et
    // 140 au-dessus du sol, le coude plié, les doigts à la surface de l'eau.
    // Personne en haut : seule la main qui tient le bout du boyau juste au-dessus de l'eau.
    const haut = null;
    // Debout dans l'eau du bas, les bottes sous la surface.
    const bas = F.personnage({ x: P(4990, 2690)[0], y: P(4990, 2690)[1], pose: 'debout', cote: 'gauche', echelle: s, regard: -4,
      mains: { proche: P(4830, 1250) } });
    return { ...c, haut, bas, poing: P(1000, 930) };
  }
  function dessinTroncon(z) {
    const { s, P, Q, bas, poing } = geoTroncon(z);
    const o = [];
    o.push(eau(Q, SURF_T, 2900));
    o.push(terre(Q, LIT_T, BHT + Y0T, 200));
    // Le sol de la berge, sous chacun.
    o.push(sol(Q, 1060, 1560, 988));
    // Le niveau de l'eau de la prise, jusqu'au bout levé.
    o.push(h.chemin(Q([[1500, 1000], [XB + 120, 1000]]), A.cache));
    // Le boyau : de la main d'en haut (le bout dans l'eau), couché sur la berge, levé en bas.
    const yS0 = P(0, 1000)[1];
    const boyau = [[poing[0], yS0 + 14 * s], [poing[0], poing[1] - 110 * s], [poing[0] + 60 * s, poing[1] - 150 * s], P(1110, 860), P(1160, 960), P(1220, 975), P(1420, 975), P(1500, 975), P(1600, 1150), P(1980, 1300), P(2150, 1480), P(2600, 1690), P(3050, 1860), P(3200, 2080), P(3700, 2260), P(4250, 2440), P(4560, 2530), P(XB - 40, 2400), P(XB, 2100), P(XB, 1000)];
    o.push(F.corde(boyau, { ep: 2.8, debut: 'ouvert', fin: 'ouvert' }).toString());
    // L'eau de la prise repasse sur le bout du boyau : il est dessous.
    const yS = P(0, 1000)[1];
    o.push(h.ligne(boyau[0][0] - 6, yS, boyau[0][0] + 6, yS, A.arete));
    o.push(bas.toString());
    const ep = 2.8;
    o.push(F.main({ x: poing[0], y: poing[1], pose: 'prise', vue: 'dos', cote: 'gauche', diametre: ep * 2.4, echelle: s * 2.2, bras: 60,
      objet: F.corde(boyau.slice(0, 3), { ep, debut: 'ouvert', fin: 'ouvert' }).toString() }).toString());
    // L'eau du bas repasse sur les bottes.
    o.push(eau(Q, [[4830, 2600], [5160, 2600]], 2720), terre(Q, LIT_T, BHT + Y0T, 200));
    // Du poing au sol puis le long de la berge : le boyau passe du côté proche, devant les pieds.
        // La cote : du bout levé à l'eau, à cet endroit.
    o.push(h.chemin(Q([[XB - 380, 1000], [XB - 60, 1000]]), A.cache));
    o.push(h.cote(...P(XB - 300, 1000), ...P(XB - 300, 2600), 'h1', { cote: 'gauche' }));
    return o.join('\n');
  }

  // Le bout levé, en grand : la main, le bout, l'eau qui affleure, le niveau.
  function dessinBout(z) {
    const o = [];
    const e = Math.min(z.l / 290, z.h / 330);        // unités de vue par mm
    const cx = z.l * 0.30, yEnd = z.h * 0.24;
    const R = 10 * e, ri = 7.5 * e;                   // boyau de 20, dedans 15
    const yMain = yEnd + 70 * e, bas = z.h - 2;
    // Le boyau, l'eau dedans jusqu'au bord, le ménisque qui affleure.
    const tuyau = [
      h.rect(cx - R, yEnd, 2 * R, bas - yEnd, W),
      h.rect(cx - ri, yEnd + 1.2 * e, 2 * ri, bas - yEnd - 1.2 * e, A.hachure('eau', 'aucun')),
      h.path(`M ${r1(cx - ri)} ${r1(yEnd + 1.2 * e)} Q ${r1(cx)} ${r1(yEnd - 1.6 * e)} ${r1(cx + ri)} ${r1(yEnd + 1.2 * e)}`, A.detail),
      h.ligne(cx - R, yEnd, cx - R, bas, A.arete), h.ligne(cx + R, yEnd, cx + R, bas, A.arete),
      h.ligne(cx - ri, yEnd, cx - ri, bas, A.fin), h.ligne(cx + ri, yEnd, cx + ri, bas, A.fin),
      h.ligne(cx - R, yEnd, cx - ri, yEnd, A.arete), h.ligne(cx + ri, yEnd, cx + R, yEnd, A.arete),
    ].join('\n');
    const m = F.main({ x: cx, y: yMain, pose: 'prise', vue: 'dos', cote: 'gauche', diametre: 2 * R, echelle: e, bras: 40, objet: tuyau });
    o.push(m.toString());
    // Le niveau de l'eau de la prise, et le geste : on lève.
    o.push(h.ligne(4, yEnd, cx - R - 3, yEnd, A.cache));
    const xf = cx - R - 16 * e;
    o.push(h.fleche(`M ${r1(xf)} ${r1(yMain + 90 * e)} L ${r1(xf)} ${r1(yEnd + 14 * e)}`, A.arete));
    return o.join('\n');
  }

  // ═══════════════════ De la prise à la roue ═══════════════════
  const SURF_P = [[-400, 0], [700, 0], [900, 170], [1800, 480], [2200, 570], [2400, 860], [3300, 1160], [4200, 1500], [5000, 1790], [5250, 2160], [6300, 2460], [7200, 2720], [8000, 3000], [8800, 3290], [9050, 3660], [10200, 3960], [11000, 4210], [11800, 4400], [12500, 4430]];
  const LIT_P = [[-600, -60], [-400, 0], [-200, 330], [300, 400], [650, 330], [800, 170], [900, 270], [1800, 580], [2180, 670], [2370, 960], [3300, 1260], [4200, 1600], [5000, 1890], [5230, 2260], [6300, 2560], [7200, 2820], [8000, 3100], [8800, 3390], [9030, 3760], [10200, 4060], [11000, 4310], [11800, 4500], [12500, 4530]];
  const ST = [[400, 0], [4200, 1500], [8000, 3000], [11800, 4400]];   // prise, fin de chaque tronçon
  const X0P = -700, Y0P = -500, BWP = 13600, BHP = 5400;
  const profil = (Q) => [eau(Q, SURF_P, 4800), terre(Q, LIT_P, BHP + Y0P, 380)].join('\n');
  function dessinProfil(z) {
    const { s, P, Q } = cadre(z, X0P, Y0P, BWP, BHP);
    const o = [profil(Q)];
    for (let i = 1; i < ST.length; i++) {
      const [xa, ya] = ST[i - 1], [xb, yb] = ST[i];
      o.push(h.chemin(Q([[xa, ya], [xb + 150, ya]]), A.cache));
      const pts = [[xa, ya + 60], [xa + 200, ya - 30]];
      for (let k = 1; k <= 4; k++) { const x = xa + 200 + (xb - 500 - xa - 200) * k / 4; pts.push([x, surfP(x) - 90]); }
      pts.push([xb - 240, yb - 150], [xb - 200, yb - 500], [xb - 200, ya]);
      o.push(F.corde(Q(pts), { ep: 2.2, debut: 'ouvert', fin: 'ouvert' }).toString());
      o.push(h.cote(...P(xb + 150, ya), ...P(xb + 150, yb), `h${i}`, { cote: 'droite' }));
    }
    void s;
    return o.join('\n');
  }
  function surfP(x) {
    for (let i = 0; i < SURF_P.length - 1; i++) {
      const [x1, y1] = SURF_P[i], [x2, y2] = SURF_P[i + 1];
      if (x >= x1 && x <= x2) return y1 + (y2 - y1) * (x - x1) / (x2 - x1);
    }
    return SURF_P[SURF_P.length - 1][1];
  }
  // Le boyau plein de la prise à la roue, le manomètre au bas.
  const GM = [11500, 4250];
  function dessinMano(z) {
    const { s, P, Q } = cadre(z, X0P, Y0P, BWP, BHP);
    const o = [profil(Q)];
    o.push(h.chemin(Q([[400, 0], [12050, 0]]), A.cache));
    const pts = [[400, 60], [600, -30]];
    for (let x = 1000; x <= 11000; x += 800) pts.push([x, surfP(x) - 90]);
    pts.push([GM[0] - 150, surfP(GM[0] - 150) - 90], [GM[0], GM[1] + 40]);
    o.push(F.corde(Q(pts), { ep: 2.2, debut: 'ouvert', fin: 'coupe' }).toString());
    o.push(h.cercle(...P(GM[0], GM[1] - 120), 170 * s + 2.2, W), h.cercle(...P(GM[0], GM[1] - 120), 170 * s + 2.2, A.arete));
    o.push(h.cote(...P(12050, 0), ...P(12050, GM[1] - 120), 'H', { cote: 'droite' }));
    o.push(h.chemin(Q([[GM[0] + 250, GM[1] - 120], [12150, GM[1] - 120]]), A.fin));
    return o.join('\n');
  }

  // Le manomètre vissé au bout du boyau, en grand.
  function dessinJauge(z) {
    const o = [];
    const e = Math.min(z.l / 140, z.h / 170);
    const c = [z.l * 0.5, z.h * 0.36], R = 36 * e;
    // Le boyau arrive couché, remonte dans le raccord.
    o.push(F.corde([[z.l * 0.5 - 70 * e, z.h - 4], [z.l * 0.5 - 30 * e, z.h - 8 * e], [z.l * 0.5 - 4 * e, z.h - 26 * e], [z.l * 0.5, c[1] + R + 50 * e]], { ep: 13 * e, debut: 'fixe', fin: 'coupe' }).toString());
    // Le raccord femelle moleté, l'écrou à six pans, la tige.
    const yR = c[1] + R + 22 * e;
    o.push(poly([[c[0] - 15 * e, yR], [c[0] + 15 * e, yR], [c[0] + 15 * e, yR + 26 * e], [c[0] - 15 * e, yR + 26 * e]]));
    for (let k = -3; k <= 3; k++) o.push(h.ligne(c[0] + k * 4 * e, yR + 3 * e, c[0] + k * 4 * e, yR + 23 * e, A.fin));
    o.push(poly([[c[0] - 5 * e, c[1] + R - 2], [c[0] + 5 * e, c[1] + R - 2], [c[0] + 5 * e, yR - 9 * e], [c[0] - 5 * e, yR - 9 * e]]));
    o.push(poly([[c[0] - 11 * e, yR - 10 * e], [c[0] + 11 * e, yR - 10 * e], [c[0] + 11 * e, yR], [c[0] - 11 * e, yR]]));
    o.push(h.ligne(c[0] - 4 * e, yR - 10 * e, c[0] - 4 * e, yR, A.fin), h.ligne(c[0] + 4 * e, yR - 10 * e, c[0] + 4 * e, yR, A.fin));
    // Le cadran : boîtier, graduations, aiguille.
    o.push(h.cercle(c[0], c[1], R, W), h.cercle(c[0], c[1], R, A.contour), h.cercle(c[0], c[1], R - 4 * e, A.detail));
    let gr = '', grf = '';
    for (let k = 0; k <= 20; k++) {
      const a = (135 + k * 13.5) * Math.PI / 180, l = k % 5 === 0 ? 8 : 4;
      const seg = `M ${r1(c[0] + (R - 7 * e) * Math.cos(a))} ${r1(c[1] + (R - 7 * e) * Math.sin(a))} L ${r1(c[0] + (R - 7 * e - l * e) * Math.cos(a))} ${r1(c[1] + (R - 7 * e - l * e) * Math.sin(a))} `;
      if (k % 5 === 0) gr += seg; else grf += seg;
    }
    o.push(h.path(gr, A.detail), h.path(grf, A.fin));
    const an = (135 + 7 * 13.5) * Math.PI / 180;
    o.push(h.path(`M ${r1(c[0] + 25 * e * Math.cos(an))} ${r1(c[1] + 25 * e * Math.sin(an))} L ${r1(c[0] + 2.5 * e * Math.cos(an + Math.PI / 2))} ${r1(c[1] + 2.5 * e * Math.sin(an + Math.PI / 2))} L ${r1(c[0] - 6 * e * Math.cos(an))} ${r1(c[1] - 6 * e * Math.sin(an))} L ${r1(c[0] - 2.5 * e * Math.cos(an + Math.PI / 2))} ${r1(c[1] - 2.5 * e * Math.sin(an + Math.PI / 2))} Z`, A.plein));
    o.push(h.cercle(c[0], c[1], 3 * e, W), h.cercle(c[0], c[1], 3 * e, A.detail));
    return o.join('\n');
  }

  return {
    ref: '86-05',
    titre: 'Mesurer un ruisseau',
    desc: 'Le débit au seau : un petit barrage de planches, tenues par des piquets, envoie tout le ruisseau dans une goulotte posée dans une encoche ; la goulotte déborde dans une chaudière de 20 L posée sous un petit saut du lit, et on compte les secondes jusqu’au plein. En coupe le long du ruisseau et vu de l’aval. La chute au boyau : un bout du boyau plein tenu à la surface de l’eau de la prise, l’autre bout, plus bas, levé jusqu’à ce que l’eau cesse de couler ; la hauteur de ce bout au-dessus de l’eau à cet endroit est la chute du tronçon. On recommence de tronçon en tronçon jusqu’à la roue et on additionne. Au manomètre : le boyau plein de la prise à la roue, un manomètre vissé au bout du bas.',
    format: 'pleine',
    disposition: [['coupe', 'aval'], ['troncon', 'bout'], ['profil', 'mano', 'jauge']],
    hauteurs: [2.3, 3, 1.55],
    largeurs: [[BWC, BWA], [2.7, 1], [2.3, 2.3, 1]],
    vues: {
      coupe: {
        titre: 'Le débit, au seau : en coupe',
        dessin: dessinCoupe,
        renvois: z => {
          const { P } = cadre(z, X0C, Y0C, BWC, BHC);
          return [
            { n: 1, rond: P(460, 430), cible: P(820, gy(820) - EPF - 50), texte: 'goulotte : tout le ruisseau y passe' },
            { n: 2, rond: P(1690, 330), cible: P(CH.x + CH.rH - 8, CH.haut + 60), texte: 'chaudière de 20 L sous la goulotte' },
            { n: 3, rond: P(1120, 460), cible: P(CH.x - 30, 760), texte: 'L/s = 20 ÷ secondes pour la remplir' },
          ];
        },
      },
      aval: {
        titre: 'Vu de l’aval',
        dessin: dessinAval,
        renvois: z => {
          const { P } = cadre(z, X0A, Y0A, BWA, BHA);
          return [
            { n: 4, rond: P(-770, 560), cible: P(-590, 470), texte: 'planches ou pierres, d’une berge à l’autre' },
          ];
        },
      },
      troncon: {
        titre: 'La hauteur de chute, au boyau : un tronçon',
        dessin: dessinTroncon,
        renvois: z => {
          const { P, poing } = geoTroncon(z);
          return [
            { n: 5, rond: P(300, 500), cible: [poing[0] - 3, P(0, 1000)[1]], texte: 'bout tenu à la surface de la prise' },
            { n: 6, rond: P(2700, 1250), cible: P(2600, 1690), texte: 'boyau transparent plein d’eau' },
            { n: 7, rond: P(3600, 700), cible: P(XB, 1400), texte: 'levé jusqu’à ce que l’eau ne coule plus' },
            { n: 8, rond: P(3950, 1300), cible: P(XB - 300, 1900), texte: 'chute du tronçon, jusqu’à l’eau à cet endroit' },
          ];
        },
      },
      bout: {
        titre: 'Le bout levé',
        dessin: dessinBout,
      },
      profil: {
        titre: 'De tronçon en tronçon jusqu’à la roue',
        dessin: dessinProfil,
        renvois: z => {
          const { P } = cadre(z, X0P, Y0P, BWP, BHP);
          return [
            { n: 9, rond: P(10300, 1000), cible: P(8150, 1750), texte: 'additionner, moins 2 à 5 cm par mesure' },
          ];
        },
      },
      mano: {
        titre: 'Au manomètre',
        dessin: dessinMano,
        renvois: z => {
          const { P } = cadre(z, X0P, Y0P, BWP, BHP);
          return [
            { n: 10, rond: P(2300, 2300), cible: P(560, 60), texte: 'boyau plein, bout du haut à la surface' },
            { n: 11, rond: P(9000, 1300), cible: P(GM[0] - 100, GM[1] - 250), texte: 'manomètre : 1 m par 10 kPa' },
          ];
        },
      },
      jauge: {
        titre: 'Le manomètre',
        dessin: dessinJauge,
        renvois: z => [
          { n: 12, rond: [z.l - 10, 12], cible: [z.l * 0.5 + 20, z.h * 0.3], texte: 'jauge à pneus : 0,7 m par lb/po²' },
        ],
      },
    },
    danger: 'Danger — en fin d’hiver, le travail dans le ruisseau se fait à deux et pas seul : l’eau glacée coupe les mains en minutes.',
  };
};
