// Planche 112-10a — Le baril à lessive (ch. 108, §9 A « Tirer la lessive des cendres »).
// Le chapitre : baril de bois percé de quelques trous au fond, monté sur deux blocs au-dessus
// d'un contenant ; au fond un lit de branchettes d'épinette, puis paille ou foin, puis les
// cendres de bois franc tassées par couches ; eau de pluie ou neige fondue versée lentement,
// en pluie, jusqu'à affleurer ; il en sort un liquide brun ; le repasser dans un lit de cendres
// neuves, deux ou trois fois.
//
// Le trajet de l'eau, vérifié : versée en haut → traverse la cendre tassée → la paille → les
// branchettes → sort par les trous du fond → tombe dans le contenant. Les trous sont tous entre
// les deux blocs, au-dessus de l'ouverture du contenant (vue de dessus) ; le bord du contenant
// reste sous le fond du baril, avec du jeu pour le glisser et le retirer.
// Aucune cote : le chapitre ne donne aucune dimension du baril.

module.exports = (h) => {
  const f = (n) => Math.round(n * 10) / 10;
  const blanc = (t) => h.a[t].replace('fill="none"', 'fill="#ffffff"');
  const P = (pts) => pts.map(([x, y]) => [f(x), f(y)]);

  // Une goutte, pointe en haut, centrée en (x, y).
  const goutte = (x, y, k = 1) =>
    h.path(`M ${f(x)} ${f(y - 4 * k)} C ${f(x + 2.6 * k)} ${f(y)} ${f(x + 2.6 * k)} ${f(y + 3 * k)} ${f(x)} ${f(y + 3 * k)} C ${f(x - 2.6 * k)} ${f(y + 3 * k)} ${f(x - 2.6 * k)} ${f(y)} ${f(x)} ${f(y - 4 * k)} Z`, blanc('detail'));

  // ── Géométrie commune aux deux grandes vues (même échelle, côte à côte) ──────────────
  const geo = (z) => {
    const xL = 74, xR = z.l - 74;           // bouts du baril (dessus et dessous)
    const yG = z.h - 14;                    // sol
    const hb = 62;                          // hauteur des blocs
    const yB = yG - hb;                     // dessous du jable, posé sur les blocs
    const yT = 62;                          // bord du haut
    const b = 7, t = 7, ch = 7, tf = 7;     // bouge, douve, jable, épaisseur du fond
    const yF = yB - ch;                     // dessous du fond
    const yFt = yF - tf;                    // dessus du fond
    const yBr = yFt - 17;                   // dessus des branchettes
    const yPa = yBr - 12;                   // dessus de la paille
    const yA = yT + 22;                     // dessus de la cendre (l'eau y affleure)
    const cx = (xL + xR) / 2;
    const bw = 30;                          // largeur d'un bloc
    const cL = xL + bw + 8, cR = xR - bw - 8; // contenant, entre les blocs
    const yC = yB + 14;                     // bord du contenant, sous le fond
    const yLq = yC + 18;                    // niveau du liquide recueilli
    const trous = [cx - 24, cx, cx + 24];
    return { xL, xR, yG, hb, yB, yT, b, t, ch, tf, yF, yFt, yBr, yPa, yA, cx, bw, cL, cR, yC, yLq, trous };
  };
  const bouge = (g, y) => { const s = (y - g.yT) / (g.yB - g.yT); return 4 * g.b * s * (1 - s); };
  const xInG = (g, y) => g.xL + g.t - bouge(g, y);
  const xInD = (g, y) => g.xR - g.t + bouge(g, y);
  const xExG = (g, y) => g.xL - bouge(g, y);
  const xExD = (g, y) => g.xR + bouge(g, y);
  const pas = (y1, y2, n = 12) => Array.from({ length: n + 1 }, (_, i) => y1 + (y2 - y1) * i / n);
  // la bande intérieure du baril entre deux hauteurs
  const bande = (g, y1, y2) => P([...pas(y1, y2).map(y => [xInG(g, y), y]), ...pas(y2, y1).map(y => [xInD(g, y), y])]);

  // Le seau qui verse : dessiné debout autour de sa base (x, y), puis penché de ang degrés.
  // Le liquide reste à plat : c'est la forme penchée qui est coupée par le niveau ys.
  const seau = (x, y, ang, ys) => {
    const c = Math.cos(ang * Math.PI / 180), sn = Math.sin(ang * Math.PI / 180);
    const R = ([u, v]) => [x + u * c - v * sn, y + u * sn + v * c];
    const corps = P([[-20, -34], [20, -34], [15, 0], [-15, 0]].map(R));
    const dedans = [[-18.5, -33], [18.5, -33], [14, -1.5], [-14, -1.5]].map(R);
    // découpe du dedans sous le niveau ys (un seul demi-plan)
    const liq = [];
    for (let i = 0; i < dedans.length; i++) {
      const a = dedans[i], b = dedans[(i + 1) % dedans.length];
      const ina = a[1] >= ys, inb = b[1] >= ys;
      if (ina) liq.push(a);
      if (ina !== inb) { const u = (ys - a[1]) / (b[1] - a[1]); liq.push([a[0] + (b[0] - a[0]) * u, ys]); }
    }
    const surf = liq.filter(p => Math.abs(p[1] - ys) < 0.01).map(p => p[0]);
    const [r1, r2] = [R([-20, -34]), R([20, -34])];
    return [
      liq.length > 2 ? h.chemin(P(liq), h.a.hachure('eau', 'aucun'), true) : '',
      surf.length === 2 ? h.ligne(f(Math.min(...surf)), f(ys), f(Math.max(...surf)), f(ys), h.a.detail) : '',
      h.chemin(corps, h.a.arete, true),
      h.path(`M ${f(r1[0])} ${f(r1[1])} A 20 3 ${ang} 0 1 ${f(r2[0])} ${f(r2[1])} A 20 3 ${ang} 0 1 ${f(r1[0])} ${f(r1[1])}`, h.a.detail),
    ].join('\n');
  };

  // Le baril en coupe (sert aussi, plus petit, à la vue « tasser »).
  const barilCoupe = (g, contenu) => {
    const out = [];
    // douves en coupe
    const douveG = P([...pas(g.yT, g.yB).map(y => [xExG(g, y), y]), ...pas(g.yB, g.yT).map(y => [xInG(g, y), y])]);
    const douveD = P([...pas(g.yT, g.yB).map(y => [xExD(g, y), y]), ...pas(g.yB, g.yT).map(y => [xInD(g, y), y])]);
    out.push(h.chemin(douveG, h.a.hachure('bois', 'contour'), true));
    out.push(h.chemin(douveD, h.a.hachure('bois', 'contour'), true));
    // fond percé : planche en coupe, interrompue à chaque trou
    const xa = xInG(g, g.yFt), xb = xInD(g, g.yFt);
    const bords = [xa, ...g.trous.flatMap(x => [x - 3, x + 3]), xb];
    for (let i = 0; i < bords.length; i += 2) out.push(h.rect(f(bords[i]), g.yFt, f(bords[i + 1] - bords[i]), g.tf, h.a.hachure('bois', 'arete')));
    out.push(contenu);
    return out.join('\n');
  };

  // Les couches du lit : branchettes, paille, cendre.
  const lit = (g, yCendre, couches = true) => {
    const out = [];
    // branchettes coupées en travers : petits ronds serrés sur deux rangs
    out.push(h.chemin(bande(g, g.yBr, g.yFt), h.a.blanc, true));
    let k = 0;
    for (let rang = 0; rang < 2; rang++) {
      const y = g.yFt - 4.5 - rang * 7.5;
      for (let x = xInG(g, y) + 5 + rang * 3.5; x < xInD(g, y) - 4; x += 7.2) {
        const r = [2.9, 2.3, 3.3, 2.6][k++ % 4];
        out.push(h.cercle(f(x), f(y + (k % 3 - 1) * 0.8), r, h.a.detail));
      }
    }
    // une branchette couchée dans le plan de coupe, avec ses bouts d'aiguilles
    const y0 = g.yBr + 3.5, x0 = xInG(g, y0) + 14, x1 = xInD(g, y0) - 30;
    out.push(h.ligne(f(x0), f(y0), f(x1), f(y0 + 1.5), h.a.detail));
    let aig = '';
    for (let x = x0 + 6; x < x1 - 2; x += 9) aig += `M ${f(x)} ${f(y0 + 0.5)} l 4.5 -2.2 `;
    out.push(h.path(aig, h.a.fin));
    // paille ou foin
    out.push(h.chemin(bande(g, g.yPa, g.yBr), h.a.hachure('paille', 'aucun'), true));
    out.push(h.ligne(f(xInG(g, g.yBr)), g.yBr, f(xInD(g, g.yBr)), g.yBr, h.a.detail));
    // cendre
    out.push(h.chemin(bande(g, yCendre, g.yPa), h.a.hachure('neige', 'aucun'), true));
    out.push(h.ligne(f(xInG(g, g.yPa)), g.yPa, f(xInD(g, g.yPa)), g.yPa, h.a.detail));
    if (couches) for (let y = g.yPa - 24; y > yCendre + 10; y -= 24) out.push(h.ligne(f(xInG(g, y)), f(y), f(xInD(g, y)), f(y), h.a.fin + ' stroke-dasharray="6 4"'));
    out.push(h.ligne(f(xInG(g, yCendre)), yCendre, f(xInD(g, yCendre)), yCendre, h.a.arete));
    return out.join('\n');
  };

  // Blocs et contenant (coupe).
  const dessous = (g) => {
    const out = [];
    out.push(h.rect(g.xL - 8, g.yB, g.bw + 8, g.hb, h.a.hachure('bois', 'arete')));
    out.push(h.rect(g.xR - g.bw, g.yB, g.bw + 8, g.hb, h.a.hachure('bois', 'arete')));
    out.push(h.chemin(P([[g.cL + 2.5, g.yLq], [g.cL + 4.4, g.yG - 1.5], [g.cR - 4.4, g.yG - 1.5], [g.cR - 2.5, g.yLq]]), h.a.hachure('eau', 'aucun'), true));
    out.push(h.ligne(g.cL + 2.5, g.yLq, g.cR - 2.5, g.yLq, h.a.detail));
    out.push(h.chemin(P([[g.cL, g.yC], [g.cL + 3, g.yG], [g.cR - 3, g.yG], [g.cR, g.yC]]), h.a.contour));
    return out.join('\n');
  };
  const sol = (z, g) => [
    h.rect(0, g.yG, z.l, 9, h.a.hachure('terre', 'aucun')),
    h.ligne(0, g.yG, z.l, g.yG, h.a.arete),
  ].join('\n');

  // La vue « tasser » : un baril plus petit, et le raté à côté.
  const mkB = (xL, xR, yT, yB) => {
    const b = 5, t = 6, ch = 5, tf = 6, yF = yB - ch, yFt = yF - tf, yBr = yFt - 12, yPa = yBr - 9;
    const cx = (xL + xR) / 2;
    return { xL, xR, yT, yB, b, t, ch, tf, yF, yFt, yBr, yPa, cx, trous: [cx - 16, cx, cx + 16] };
  };
  const geoT = (z) => {
    const yB = z.h - 14;
    const g = mkB(26, 152, 44, yB);
    const yC1 = g.yPa - 52, yC2 = yC1 - 24;
    const px = g.cx - 24, pw = 34, xm = g.cx + 4;
    const r = mkB(z.l - 112, z.l - 24, 44, yB);
    const yAr = r.yT + 16, xc = r.cx + 6;
    return { g, r, yC1, yC2, px, pw, xm, yAr, xc };
  };

  return {
    ref: '112-10a',
    titre: 'Le baril à lessive',
    desc: 'Un baril de bois au fond percé, monté sur deux blocs au-dessus d’un contenant : en coupe, le lit de branchettes, de paille et de cendres tassées sous l’eau versée en pluie ; de face, le liquide recueilli reversé sur un lit de cendres neuves ; de dessus, les trous placés au-dessus du contenant, entre les blocs ; le tassage couche par couche, et le lit lâche où l’eau se creuse un chemin. L’encadré danger rappelle que ce qui coule est déjà de la lessive.',
    format: 'pleine',
    disposition: [['coupe', 'elev'], ['fond', 'tasser']],
    hauteurs: [3, 2],
    largeurs: [[1, 1], [1, 1]],
    vues: {
      // ── En coupe ────────────────────────────────────────────────────────────────────
      coupe: {
        titre: 'En coupe',
        dessin: z => {
          const g = geo(z);
          const out = [sol(z, g), dessous(g)];
          out.push(barilCoupe(g, lit(g, g.yA)));
          // l'eau qui affleure au-dessus de la cendre
          out.push(h.chemin(bande(g, g.yA - 6, g.yA), h.a.hachure('eau', 'aucun'), true));
          out.push(h.ligne(f(xInG(g, g.yA - 6)), g.yA - 6, f(xInD(g, g.yA - 6)), g.yA - 6, h.a.detail));
          // le seau qui verse lentement, en pluie
          out.push(seau(g.xL + 2, 20, 118, 30));
          for (const [x, y] of [[g.cx - 34, 44], [g.cx - 18, 36], [g.cx - 4, 50], [g.cx + 12, 40], [g.cx - 26, 62], [g.cx + 2, 66], [g.cx + 24, 58], [g.cx - 12, 74]]) out.push(goutte(x, y, 0.8));
          // le trajet de l'eau dans le lit
          out.push(h.fleche(`M ${f(g.cx - 40)} ${g.yA + 8} L ${f(g.cx - 40)} ${g.yPa - 4}`, h.a.cache));
          out.push(h.fleche(`M ${f(g.cx + 40)} ${g.yA + 8} L ${f(g.cx + 40)} ${g.yPa - 4}`, h.a.cache));
          // le liquide brun qui sort par les trous
          for (const x of g.trous) { out.push(goutte(x, g.yB + 5, 0.8)); out.push(goutte(x, g.yC + 3, 0.8)); }
          return out.join('\n');
        },
        renvois: z => {
          const g = geo(z);
          const yM = (g.yA + g.yPa) / 2;
          return [
            { n: 1, rond: [16, 30], cible: [g.xL + 15, 27], texte: 'eau de pluie ou neige fondue' },
            { n: 2, rond: [z.l - 16, g.yA - 3], cible: [xInD(g, g.yA - 3) - 8, g.yA - 3], texte: 'en pluie, jusqu’à affleurer' },
            { n: 3, rond: [z.l - 16, yM], cible: [xInD(g, yM) - 16, yM], texte: 'cendres de bois franc' },
            { n: 4, rond: [16, g.yPa - 14], cible: [xInG(g, g.yPa + 6) + 10, g.yPa + 6], texte: 'paille ou foin' },
            { n: 5, rond: [16, g.yBr + 16], cible: [xInG(g, g.yBr + 9) + 9, g.yBr + 9], texte: 'branchettes d’épinette' },
            { n: 6, rond: [z.l - 16, g.yF + 14], cible: [g.trous[2] + 9, g.yFt + 3.5], texte: 'fond percé de quelques trous' },
          ];
        },
      },

      // ── De face : repasser ──────────────────────────────────────────────────────────
      elev: {
        titre: 'De face : repasser sur cendres neuves',
        dessin: z => {
          const g = geo(z);
          const out = [sol(z, g)];
          const r0 = (g.xR - g.xL) / 2, ry = 8;
          const rs = (y) => r0 + bouge(g, y);
          // blocs : billots debout
          for (const x0 of [g.xL - 8, g.xR - g.bw]) {
            out.push(h.rect(x0, g.yB, g.bw + 8, g.hb, blanc('arete')));
            for (const u of [0.25, 0.55, 0.8]) out.push(h.path(`M ${f(x0 + (g.bw + 8) * u)} ${g.yB + 4} q 2 ${f(g.hb / 3)} -1 ${f(g.hb * 0.6)}`, h.a.fin));
          }
          // contenant entre les blocs
          out.push(h.chemin(P([[g.cL, g.yC], [g.cL + 3, g.yG], [g.cR - 3, g.yG], [g.cR, g.yC]]), blanc('contour'), true));
          out.push(h.ellipse(g.cx, g.yC, (g.cR - g.cL) / 2, 4, h.a.arete));
          // corps du baril
          const flanc = [...pas(g.yT, g.yB, 16).map(y => [g.cx - rs(y), y])];
          const flancD = [...pas(g.yB, g.yT, 16).map(y => [g.cx + rs(y), y])];
          const corps = `M ${P(flanc).map(p => p.join(' ')).join(' L ')} A ${f(r0)} ${ry} 0 0 0 ${P(flancD).map(p => p.join(' ')).join(' L ')} A ${f(r0)} ${ry} 0 0 0 ${f(g.cx - r0)} ${g.yT} Z`;
          out.push(h.path(corps, blanc('contour')));
          // douves
          for (const c of [-0.82, -0.5, -0.17, 0.17, 0.5, 0.82]) {
            const pts = P(pas(g.yT + ry * Math.sqrt(1 - c * c), g.yB + ry * Math.sqrt(1 - c * c), 16).map(y => [g.cx + rs(y) * c, y]));
            out.push(h.chemin(pts, h.a.fin));
          }
          // cercles
          for (const s of [0.07, 0.3, 0.7, 0.93]) {
            for (const d of [-2.5, 2.5]) {
              const y = g.yT + s * (g.yB - g.yT) + d, r = rs(y);
              out.push(h.path(`M ${f(g.cx - r)} ${f(y)} A ${f(r)} ${ry} 0 0 0 ${f(g.cx + r)} ${f(y)}`, h.a.arete));
            }
          }
          // le dessus ouvert : cendres neuves presque au bord
          out.push(h.ellipse(g.cx, g.yT, r0 - g.t, ry - 2, h.a.hachure('neige', 'detail')));
          out.push(h.ellipse(g.cx, g.yT, r0, ry, h.a.contour));
          // le liquide recueilli, reversé lentement
          out.push(seau(g.xR + 4, 20, -118, 30));
          for (const [x, y] of [[g.cx + 30, 36], [g.cx + 16, 46], [g.cx + 34, 52], [g.cx + 4, 40], [g.cx + 22, 60]]) out.push(goutte(x, y, 0.8));
          // gouttes sous le fond
          for (const x of [g.cx - 22, g.cx + 3, g.cx + 24]) out.push(goutte(x, g.yB + ry + 5, 0.8));
          // la boucle : du contenant, remonté et reversé en haut
          const xa = z.l - 22;
          out.push(h.fleche(`M ${f(g.cR - 10)} ${f(g.yC + 22)} C ${f(xa + 6)} ${f(g.yC + 26)} ${f(xa)} ${f(g.yC)} ${f(xa)} ${f(g.yB - 30)} L ${f(xa)} ${f(g.yT + 30)} C ${f(xa)} ${f(g.yT + 4)} ${f(xa + 2)} 4 ${f(g.xR + 22)} 6`, h.a.cache));
          return out.join('\n');
        },
        renvois: z => {
          const g = geo(z);
          const xa = z.l - 22;
          return [
            { n: 7, rond: [16, 24], cible: [g.cx - 20, g.yT + 1], texte: 'lit de cendres neuves' },
            { n: 8, rond: [xa - 22, 70], cible: [g.xR - 11, 27], texte: 'deux ou trois passes' },
            { n: 9, rond: [16, g.yB + 10], cible: [g.xL + 4, g.yB + 18], texte: 'deux blocs sous le rebord' },
            { n: 10, rond: [16, g.yG - 14], cible: [g.cL + 9, g.yG - 12], texte: 'ni aluminium ni zinc' },
          ];
        },
      },

      // ── De dessus : le fond, les blocs et le contenant dessous ────────────────────────
      fond: {
        titre: 'Le fond, vu de dessus',
        dessin: z => {
          const cx = z.l / 2 - 6, cy = z.h / 2 - 2, R = Math.min(z.h / 2 - 10, 92), t = 7;
          const Ri = R - t, rb = 20, db = R - 9, Rc = db - rb - 7;
          const out = [];
          const cache = h.a.cache;
          // blocs dessous : la part qui dépasse du baril en trait plein, le reste caché
          for (const sg of [-1, 1]) {
            const bx = cx + sg * db;
            out.push(h.cercle(f(bx), f(cy), rb, cache));
            const xi = (db * db - rb * rb + R * R) / (2 * db), yi = Math.sqrt(R * R - xi * xi);
            const px = cx + sg * xi;
            out.push(h.path(`M ${f(px)} ${f(cy - yi)} A ${rb} ${rb} 0 0 ${sg > 0 ? 1 : 0} ${f(px)} ${f(cy + yi)}`, h.a.arete));
          }
          // douves vues du dessus
          out.push(h.path(`M ${f(cx - R)} ${f(cy)} A ${R} ${R} 0 1 0 ${f(cx + R)} ${f(cy)} A ${R} ${R} 0 1 0 ${f(cx - R)} ${f(cy)} Z M ${f(cx - Ri)} ${f(cy)} A ${Ri} ${Ri} 0 1 1 ${f(cx + Ri)} ${f(cy)} A ${Ri} ${Ri} 0 1 1 ${f(cx - Ri)} ${f(cy)} Z`, h.a.hachure('bois', 'aucun') + ' fill-rule="evenodd"'));
          out.push(h.cercle(f(cx), f(cy), R, h.a.contour));
          out.push(h.cercle(f(cx), f(cy), Ri, h.a.arete));
          let joints = '';
          for (let a = 0; a < 360; a += 20) {
            const r = a * Math.PI / 180;
            joints += `M ${f(cx + Ri * Math.cos(r))} ${f(cy + Ri * Math.sin(r))} L ${f(cx + R * Math.cos(r))} ${f(cy + R * Math.sin(r))} `;
          }
          out.push(h.path(joints, h.a.detail));
          // la moitié gauche : le fond nu, ses planches et ses trous
          const xs = cx + 4;
          for (const dy of [-Ri * 0.36, Ri * 0.36]) {
            const w = Math.sqrt(Ri * Ri - dy * dy);
            out.push(h.ligne(f(cx - w), f(cy + dy), f(xs), f(cy + dy), h.a.detail));
          }
          const trous = [[cx - 22, cy - 20], [cx - 30, cy + 8], [cx - 10, cy + 26], [cx - 8, cy - 2]];
          for (const [x, y] of trous) out.push(h.cercle(f(x), f(y), 3.2, h.a.plein));
          // le contenant dessous, sous les trous
          out.push(h.path(`M ${f(xs)} ${f(cy - Math.sqrt(Rc * Rc - (xs - cx) ** 2))} A ${f(Rc)} ${f(Rc)} 0 1 0 ${f(xs)} ${f(cy + Math.sqrt(Rc * Rc - (xs - cx) ** 2))}`, cache));
          // la moitié droite : les branchettes couchées sur le fond
          const branches = [];
          for (let i = 0; i < 9; i++) {
            const y = cy - Ri + 10 + i * (2 * Ri - 20) / 8;
            const dy = y - cy, w = Math.sqrt(Math.max(0, Ri * Ri - dy * dy)) - 4;
            if (w <= 8) continue;
            const x1 = xs + 2, x2 = cx + w, y1 = y + (i % 2 ? 3 : -3), y2 = y - (i % 2 ? 3 : -3);
            branches.push(h.ligne(f(x1), f(y1), f(x2), f(y2), h.a.detail));
            const n = Math.floor((x2 - x1) / 9);
            let aig = '';
            for (let j = 1; j < n; j++) {
              const x = x1 + j * 9, yy = y1 + (y2 - y1) * (x - x1) / (x2 - x1);
              aig += `M ${f(x)} ${f(yy)} l 5 -2.6 M ${f(x + 3)} ${f(yy)} l 5 2.6 `;
            }
            branches.push(h.path(aig, h.a.fin));
          }
          out.push(branches.join('\n'));
          // la ligne d'arrachement entre les deux moitiés
          const zig = [];
          for (let i = 0, n = 14; i <= n; i++) {
            const y = cy - Ri + (2 * Ri) * i / n;
            zig.push([xs + (i % 2 ? 3 : -3) * (i === 0 || i === n ? 0 : 1), y]);
          }
          out.push(h.chemin(P(zig), h.a.arete));
          return out.join('\n');
        },
        renvois: z => {
          const cx = z.l / 2 - 6, cy = z.h / 2 - 2, R = Math.min(z.h / 2 - 10, 92), t = 7;
          const Ri = R - t, rb = 20, db = R - 9, Rc = db - rb - 7;
          return [
            { n: 11, rond: [16, 18], cible: [cx - 23, cy - 21], texte: 'trous sur le contenant' },
            { n: 12, rond: [16, z.h - 16], cible: [cx - Math.cos(0.95) * Rc, cy + Math.sin(0.95) * Rc], texte: 'contenant entre les blocs' },
            { n: 13, rond: [z.l - 14, 18], cible: [cx + Ri * 0.55, cy - Ri * 0.55 + 6], texte: 'branchettes en travers' },
          ];
        },
      },

      // ── Tasser par couches, et le lit lâche ─────────────────────────────────────────
      tasser: {
        titre: 'Tasser par couches',
        dessin: z => {
          const T = geoT(z), g = T.g, r = T.r;
          const out = [];
          // le bon : deux couches tassées, la troisième encore lâche à droite, tassée à gauche
          out.push(barilCoupe(g, lit(g, T.yC1, false)));
          out.push(h.ligne(f(xInG(g, g.yPa - 26)), f(g.yPa - 26), f(xInD(g, g.yPa - 26)), f(g.yPa - 26), h.a.fin + ' stroke-dasharray="6 4"'));
          const xm = T.xm, xd = xInD(g, T.yC1);
          const tas = P([[xm, T.yC2], ...[0.15, 0.35, 0.55, 0.75, 0.9].map(u => [xm + (xd - xm) * u, T.yC1 - 4 - (T.yC1 - T.yC2 + 10) * Math.sin(Math.PI * (0.25 + 0.75 * u))]), [xd, T.yC1 - 3], [xd, T.yC1], [xm, T.yC1]]);
          out.push(h.chemin(P([[xInG(g, T.yC2), T.yC2], [xm, T.yC2], [xm, T.yC1], [xInG(g, T.yC1), T.yC1]]), h.a.hachure('neige', 'aucun'), true));
          out.push(h.chemin(tas, h.a.hachure('gravier', 'aucun'), true));
          out.push(h.chemin(P([[xInG(g, T.yC2), T.yC2], [xm, T.yC2], ...tas.slice(1, 7)]), h.a.arete));
          out.push(h.ligne(f(xInG(g, T.yC1)), T.yC1, f(xd), T.yC1, h.a.fin + ' stroke-dasharray="6 4"'));
          // le pilon : un rondin debout, posé sur la couche
          out.push(h.rect(f(T.px - T.pw / 2), 4, T.pw, f(T.yC2 - 4), h.a.hachure('bois', 'arete')));
          out.push(h.fleche(`M ${f(T.px - T.pw / 2 - 10)} 10 L ${f(T.px - T.pw / 2 - 10)} ${f(T.yC2 - 6)}`));
          // le raté : lit lâche, un chemin creusé, l'eau passe droit et ressort claire
          out.push(barilCoupe(r, lit(r, T.yAr, false)));
          const xc = T.xc;
          const chem = P([[xc - 7, T.yAr], [xc - 2, T.yAr + 22], [xc - 7, T.yAr + 44], [xc - 2, r.yPa], [xc + 4, r.yPa], [xc - 1, T.yAr + 44], [xc + 4, T.yAr + 22], [xc + 7, T.yAr]]);
          out.push(h.chemin(chem, blanc('detail'), true));
          out.push(h.fleche(`M ${f(xc)} ${f(T.yAr - 22)} L ${f(xc + 1)} ${f(r.yPa - 2)}`, h.a.cache));
          for (const x of r.trous) out.push(goutte(x, r.yB + 6, 0.7));
          return out.join('\n');
        },
        renvois: z => {
          const T = geoT(z);
          return [
            { n: 14, rond: [T.px + T.pw / 2 + 14, 14], cible: [T.px + T.pw / 2 - 2, 24], texte: 'chaque couche au rondin' },
            { n: 15, rond: [T.xc - 32, T.yAr - 14], cible: [T.xc - 5, T.yAr + 22], texte: 'lit lâche : l’eau passe droit' },
            { n: 16, rond: [T.r.xL - 10, T.r.yB + 2], cible: [T.r.trous[0] - 2, T.r.yB + 6], texte: 'et ressort claire' },
          ];
        },
      },
    },
    danger: 'Le liquide brun qui coule du baril est déjà de la lessive : il brûle la peau et rend aveugle. Lunettes, gants, eau de rinçage à un pas, dès la première goutte.',
  };
};
