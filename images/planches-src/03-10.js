// Planche 03-10. Vidanger la maison dans le bon ordre (chapitre 3, étape 23, « Vidanger dans l'ordre », et section 7,
// « Vidanger sans antigel »).
//
// La charte : la face de droite du chauffe-eau à l'ombre ; le réservoir vide de la toilette,
// vu par la coupe, en gris loin. Le rouge : deux points à contrôler, ceux qui cassent sur un
// raté : le disjoncteur du chauffe-eau (un élément à sec se détruit) et le robinet chaud de
// l'étage (sans lui, le réservoir ne se vide pas). La flèche d'air reste noire.
//
// 19 octobre 2026 (OUI de JP) : le bouchon de nettoyage du siphon s'ajoute en bas, avant la poire : le bouchon vissé
// au bas du coude, dévissé, une chaudière dessous, l'eau qui coule (repère 9) ; la poire devient « Sans bouchon »
// (10), le chiffon 11, l'huile 12, marquée « Autre façon » et séparée par un filet (règle 10). Règle 11 : les deux
// cercles rouges ont leur repère, et la légende dit ce qu'on y voit (le disjoncteur baissé, l'air qui entre).
// Toute l'eau en bleu (JP, 19 octobre) : le jet du robinet de vidange et les gouttes du robinet de la cuisine aussi.
// L'huile n'est pas de l'eau : gris clair. Les cinq vignettes du bas sont dessinées à leur échelle d'origine puis
// réduites d'un même facteur (géométrie seulement : les traits et les trames gardent leur épaisseur).
module.exports = (h) => {
  const blancArete = h.a.arete.replace('fill="none"', 'fill="#ffffff"');
  const blancContour = h.a.contour.replace('fill="none"', 'fill="#ffffff"');
  const P = pts => pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L');

  // ─── Outils communs ────────────────────────────────────────────────────────────────
  // Échantillonne une suite de Bézier cubiques [[p0, p1, p2, p3], …] en polyligne.
  const bez = (segs, n = 24) => {
    const out = [];
    segs.forEach(([a, b, c, d], i) => {
      for (let k = i ? 1 : 0; k <= n; k++) {
        const t = k / n, u = 1 - t;
        out.push([
          u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
          u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1],
        ]);
      }
    });
    return out;
  };
  // Les deux parois d'un tuyau de largeur w autour d'une ligne médiane.
  const tube = (c, w) => {
    const g = [], d = [];
    c.forEach((p, i) => {
      const a = c[Math.max(0, i - 1)], b = c[Math.min(c.length - 1, i + 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
      const nx = -dy / L, ny = dx / L;
      g.push([p[0] + nx * w / 2, p[1] + ny * w / 2]);
      d.push([p[0] - nx * w / 2, p[1] - ny * w / 2]);
    });
    return [g, d];
  };
  // Garde la partie d'un polygone sous le niveau y = L (Sutherland-Hodgman, un seul bord).
  const sous = (poly, L) => {
    const out = [];
    for (let i = 0; i < poly.length; i++) {
      const A = poly[i], B = poly[(i + 1) % poly.length];
      const ia = A[1] >= L, ib = B[1] >= L;
      if (ia) out.push(A);
      if (ia !== ib) {
        const t = (L - A[1]) / (B[1] - A[1]);
        out.push([A[0] + t * (B[0] - A[0]), L]);
      }
    }
    return out;
  };

  // ─── Le siphon d'évier, commun aux trois petites vues ─────────────────────────────
  // Queue x 50-62, coude centré (72, 118), rayons 10 et 22, branche montante x 82-94,
  // bras vers le mur à y 88-100.
  const arc = (r, n = 30) => Array.from({ length: n + 1 }, (_, k) => {
    const t = Math.PI - (Math.PI * k) / n;
    return [72 + r * Math.cos(t), 118 + r * Math.sin(t)];
  });
  const exterieur = [[50, 50], ...arc(22), [94, 104]];
  const interieur = [[62, 50], ...arc(10), [82, 104]];
  const bras = 'M82,104 A16,16 0 0 1 98,88 L124,88 M94,104 A4,4 0 0 1 98,100 L124,100';
  const cavite = [...exterieur, ...[...interieur].reverse()];
  const HUILE = 'fill="#E6E6E6" stroke="none"';      // l'huile : gris clair, le bleu est réservé à l'eau
  const liquide = (L, remplissage = h.a.hachure('eau', 'aucun')) => {
    const demi = Math.sqrt(Math.max(0, 484 - (L - 118) ** 2));
    const surface = L <= 118
      ? [h.ligne(50, L, 62, L, h.a.detail), h.ligne(82, L, 94, L, h.a.detail)]
      : [h.ligne(72 - demi, L, 72 + demi, L, h.a.detail)];
    return [h.path(`M${P(sous(cavite, L))} Z`, remplissage), ...surface].join('\n');
  };
  const siphon = (garde) => [
    // le mur où rentre le bras
    h.rect(124, 66, 9, 60, h.a.hachure('bois')),
    // le fond de l'évier, en coupe, et son ouverture
    h.path('M8,12 C8,38 14,50 30,50 L50,50 M62,50 L80,50 C96,50 102,38 102,12', h.a.contour),
    ...(garde || []),
    h.path(`M${P(exterieur)}`, h.a.contour),
    h.path(`M${P(interieur)}`, h.a.contour),
    h.path(bras, h.a.contour),
    // l'écrou coulissant sous la bonde
    h.rect(47, 56, 18, 6, blancArete),
  ].join('\n');

  // Le chiffon dans son sac, tassé dans une gorge de drain.
  const bouchon = (d, twist) => [
    h.path(d, 'fill="#ffffff" stroke="none"'),
    h.path(d, h.a.hachure('paille')),
    h.path(twist, h.a.arete),
  ].join('\n');

  const TY = -36;   // la toilette remonte dans sa vue

  // ─── La réduction des vignettes du bas ─────────────────────────────────────────────
  // Cinq vignettes de 102 de large : le dessin, fait à son échelle d'origine (environ 130 de large), est réduit d'un
  // même facteur S dans les cinq, pour que les siphons se comparent. On réduit la géométrie (coordonnées, longueurs,
  // rayons) ; les épaisseurs de trait et les trames ne bougent pas.
  const r1 = v => String(Math.round(v * 10) / 10);
  const echelle = (svg, S, ox, oy) => {
    const X = v => r1(ox + S * v), Y = v => r1(oy + S * v), Lg = v => r1(S * v);
    const chemin = d => {
      const tk = d.match(/[a-zA-Z]|-?\d*\.?\d+/g), out = [];
      let cmd = 'M', i = 0;
      const num = () => +tk[i++];
      while (i < tk.length) {
        if (/[a-zA-Z]/.test(tk[i])) { cmd = tk[i++]; out.push(cmd); if (/[zZ]/.test(cmd)) continue; }
        const rel = cmd !== cmd.toUpperCase();
        const pt = () => { const x = num(), y = num(); return rel ? `${Lg(x)} ${Lg(y)}` : `${X(x)} ${Y(y)}`; };
        switch (cmd.toUpperCase()) {
          case 'M': case 'L': case 'T': out.push(pt()); break;
          case 'H': { const x = num(); out.push(rel ? Lg(x) : X(x)); break; }
          case 'V': { const y = num(); out.push(rel ? Lg(y) : Y(y)); break; }
          case 'C': out.push(pt(), pt(), pt()); break;
          case 'S': case 'Q': out.push(pt(), pt()); break;
          case 'A': { const rx = num(), ry = num(), rot = num(), la = num(), sw = num(); out.push(`${Lg(rx)} ${Lg(ry)} ${rot} ${la} ${sw}`, pt()); break; }
          default: throw new Error(`commande de chemin inconnue : ${cmd}`);
        }
      }
      return out.join(' ');
    };
    const conv = { x: X, x1: X, x2: X, cx: X, y: Y, y1: Y, y2: Y, cy: Y, width: Lg, height: Lg, r: Lg, rx: Lg, ry: Lg, d: chemin };
    return svg.replace(/<(rect|line|circle|ellipse|path)\b[^>]*>/g, el =>
      el.replace(/(\s)(x|y|x1|y1|x2|y2|cx|cy|width|height|r|rx|ry|d)="([^"]*)"/g, (m, sp, nom, v) =>
        `${sp}${nom}="${nom === 'd' ? chemin(v) : conv[nom](+v)}"`));
  };
  // Le cadre commun des vignettes du bas, à l'échelle d'origine : x de 6 à 135, y de 0 à 200.
  const CADRE = { x0: 6, x1: 135, y0: 0, y1: 200 };
  const reduction = z => {
    const S = Math.min(z.l / (CADRE.x1 - CADRE.x0), z.h / (CADRE.y1 - CADRE.y0));
    const ox = (z.l - (CADRE.x1 - CADRE.x0) * S) / 2 - CADRE.x0 * S, oy = (z.h - (CADRE.y1 - CADRE.y0) * S) / 2 - CADRE.y0 * S;
    return { S, ox, oy, M: ([x, y]) => [ox + S * x, oy + S * y] };
  };
  const vignette = (z, svg) => { const { S, ox, oy } = reduction(z); return echelle(svg, S, ox, oy); };
  // Un renvoi des vignettes : la pastille et la cible données à l'échelle d'origine, la pastille gardée dans la vue.
  const renvoi = (z, n, rond, cible, texte) => {
    const { M } = reduction(z), b = v => Math.max(11, v);
    const [rx, ry] = M(rond);
    return { n, rond: [Math.min(z.l - 11, b(rx)), Math.min(z.h - 11, b(ry))], cible: M(cible), texte };
  };
  // Une goutte d'eau, en bleu, cernée d'un trait fin.
  const goutteEau = (x, y) => h.ellipse(x, y, 1.6, 2.3, h.a.hachure('eau', 'fin'));

  // ─── La maison ─────────────────────────────────────────────────────────────────────
  const robinet = (x, y) => [
    h.rect(x - 4, y - 3, 8, 3, blancArete),
    h.path(`M${x},${y - 3} L${x},${y - 11} Q${x},${y - 17} ${x - 7},${y - 17} L${x - 16},${y - 17} L${x - 16},${y - 13}`, h.a.arete),
    h.ligne(x, y - 11, x + 6, y - 20, h.a.arete),
    h.cercle(x + 6, y - 20, 1.6, h.a.plein),
  ].join('\n');
  // La tasse penchée : les points du chemin tournés de -50° autour de (80, 20).
  const tasse = d => d.replace(/(-?[\d.]+),(-?[\d.]+)/g, (_, x, y) => {
    const a = -50 * Math.PI / 180, dx = +x - 80, dy = +y - 20;
    return `${(80 + dx * Math.cos(a) - dy * Math.sin(a)).toFixed(1)},${(20 + dx * Math.sin(a) + dy * Math.cos(a)).toFixed(1)}`;
  });
  const chaudiere = x0 => [
    h.path(`M${x0},348 L${x0 + 30},348 L${x0 + 27},388 L${x0 + 3},388 Z`, h.a.hachure('eau')),
    h.path(`M${x0 + 2},346 Q${x0 + 15},330 ${x0 + 28},346`, h.a.detail),
    h.rect(x0 - 2, 344, 34, 4, blancArete),
  ].join('\n');

  return {
    ref: '03-10',
    titre: 'Vidanger la maison dans le bon ordre',
    desc: 'Coupe d’une maison à étage avec sous-sol : l’entrée d’eau fermée par une vanne à levier mis en travers du tuyau ; le chauffe-eau électrique mis hors tension au panneau ; le robinet d’eau chaude de l’étage ouvert, par où l’air entre ; deux chaudières couvertes remplies d’eau à boire au robinet de vidange avant tout ; puis le boyau du robinet de vidange conduit au drain de plancher ; le robinet de la cuisine ouvert. Le jet du robinet de vidange et les gouttes du robinet de la cuisine sont en bleu. En bas, cinq vignettes : la toilette en coupe, réservoir vide et fond épongé, cuvette épongée puis bouchée d’un chiffon dans un sac ; le siphon d’évier vidé par son bouchon de nettoyage, dévissé au bas du coude, l’eau qui coule en bleu dans une chaudière posée dessous ; sans bouchon, le siphon vidé à la poire ; puis le siphon bouché au chiffon ensaché ; après un filet, l’autre façon : le coude rempli d’huile de cuisson (en gris), versée d’une tasse.',
    format: 'pleine',
    disposition: [['maison'], ['toilette', 'bouchon', 'poire', 'boucher', 'huile']],
    hauteurs: [3.35, 1.4],
    vues: {
      maison: {
        titre: 'La maison en coupe',
        dessin: z => [
          // le sol dehors, les fondations, la dalle et le drain de plancher
          h.rect(0, 276, 100, 128, h.a.hachure('terre', 'aucun')),
          h.rect(540, 276, 60, 128, h.a.hachure('terre', 'aucun')),
          h.ligne(0, 276, 100, 276, h.a.arete), h.ligne(540, 276, 600, 276, h.a.arete),
          h.rect(100, 262, 12, 142, h.a.hachure('pierre')),
          h.rect(528, 262, 12, 142, h.a.hachure('pierre')),
          h.rect(112, 388, 312, 10, h.a.hachure('gravier')),
          h.rect(436, 388, 92, 10, h.a.hachure('gravier')),
          h.path('M424,388 L424,402 L436,402 L436,388', h.a.arete),
          h.ligne(424, 390, 436, 390, h.a.detail), h.ligne(424, 393, 436, 393, h.a.detail),
          // les murs, les planchers, le toit
          h.rect(100, 64, 12, 198, h.a.hachure('isolant')),
          h.rect(528, 64, 12, 198, h.a.hachure('isolant')),
          h.rect(112, 262, 416, 10, h.a.hachure('bois')),
          h.rect(112, 150, 416, 10, h.a.hachure('bois')),
          h.rect(100, 58, 440, 6, h.a.hachure('bois')),
          h.chemin([[84, 64], [320, 8], [556, 64]], h.a.arete),
          h.chemin([[96, 58], [320, 16], [544, 58]], h.a.detail),

          // la cuisine : comptoir, évier et sa descente de drain
          h.ligne(436, 228, 436, 262, h.a.detail),
          h.path('M478,248 L478,254 A5,5 0 0 0 488,254 L488,262', h.a.arete),
          // la salle de bain : lavabo, toilette vue de face
          h.path('M490,122 L490,138 A5,5 0 0 0 500,138 L500,150', h.a.arete),
          h.ligne(466, 122, 466, 150, h.a.detail),

          // l'eau froide : de la rue à la vanne, au plafond du sous-sol, aux étages
          h.chemin([[4, 356], [150, 356], [150, 282], [512, 282], [512, 116]], h.a.contour),
          h.chemin([[306, 282], [306, 300]], h.a.contour),
          h.chemin([[512, 155], [444, 155], [444, 124], [436, 124]], h.a.arete),
          // l'eau chaude : du chauffe-eau à la cuisine et à l'étage
          h.chemin([[338, 300], [338, 290], [520, 290], [520, 116]], h.a.contour),
          // la vanne d'entrée, haut sur la montée pour ne rien laisser piégé au-dessus ;
          // levier en travers : fermée
          h.rect(145, 294, 10, 14, blancContour),
          h.ligne(145, 301, 130, 301, h.a.contour),

          // le panneau et le fil du chauffe-eau
          h.chemin([[185, 292], [185, 276], [322, 276], [322, 296]], h.a.detail),
          h.rect(172, 292, 26, 44, blancArete),
          ...[0, 1, 2, 3, 4].map(i => h.rect(176, 297 + 7 * i, 8, 4, h.a.detail)),
          ...[0, 1, 2, 3].map(i => h.rect(186, 297 + 7 * i, 8, 4, h.a.detail)),
          h.rect(186, 325, 8, 4, h.a.plein),

          // le chauffe-eau
          h.path('M296,306 Q322,294 348,306 L348,362 L296,362 Z', h.a.blanc),
          h.path('M336,301.7 Q342,303.2 348,306 L348,362 L336,362 Z', h.a.ombre),
          h.path('M296,306 Q322,294 348,306 L348,362 L296,362 Z', h.a.contour),
          h.rect(316, 294, 12, 6, blancArete),
          h.rect(300, 362, 6, 6, h.a.arete), h.rect(338, 362, 6, 6, h.a.arete),
          h.rect(292, 368, 58, 20, h.a.hachure('pierre')),
          // le robinet de vidange qui coule dans la chaudière ouverte
          h.rect(348, 350, 9, 8, blancArete),
          h.ligne(352, 350, 352, 344, h.a.detail),
          h.rect(353, 358, 4, 4, blancArete),
          // le jet d'eau du robinet de vidange, en bleu, jusqu'à l'eau de la chaudière
          h.rect(353, 362, 4, 10, h.a.hachure('eau', 'fin')),
          h.path('M354,370 L380,370 L378,388 L356,388 Z', h.a.hachure('eau', 'aucun')),
          h.path('M352,364 L382,364 L379,388 L355,388 Z', h.a.arete),
          // le boyau, posé pour l'étape d'après, son bout libre au plancher
          h.path('M392,385 L414,385 C422,385 428,388 430,398', h.a.contour),
          h.rect(388, 382, 5, 6, blancArete),
          // l'autre chaudière, pleine et couverte
          chaudiere(258),

          // la cuisine, devant les colonnes
          h.rect(430, 222, 98, 6, blancArete),
          h.path('M452,228 L452,240 Q452,248 460,248 L496,248 Q504,248 504,240 L504,228', blancArete),
          robinet(500, 222),
          goutteEau(484, 210), goutteEau(484, 217),
          // le lavabo
          h.rect(458, 116, 70, 6, blancArete),
          h.path('M470,122 L470,128 Q470,134 478,134 L502,134 Q510,134 510,128 L510,122', blancArete),
          robinet(512, 116),
          h.fleche('M496,113 L496,106', h.a.arete),
          // la toilette de l'étage, vue de face
          h.rect(402, 111, 36, 3, blancArete),
          h.rect(404, 114, 32, 16, blancArete),
          h.path('M400,132 L440,132 L440,136 Q438,146 430,146 L428,150 L412,150 L410,146 Q402,146 400,136 Z', blancArete),
          // les deux points qui cassent sur un raté
          h.controle(190, 327, 8),
          h.controle(505, 105, 13),
        ].join('\n'),
        renvois: z => [
          { n: 1, rond: [126, 334], cible: [147, 306], texte: 'entrée d’eau fermée' },
          { n: 2, rond: [224, 306], cible: [196.9, 323], texte: 'disjoncteur du chauffe-eau baissé' },
          { n: 3, rond: [452, 84], cible: [503, 102], texte: 'robinet chaud ouvert à l’étage : l’air entre' },
          { n: 4, rond: [392, 330], cible: [368, 366], texte: 'eau à boire tirée d’abord' },
          { n: 5, rond: [446, 352], cible: [414, 385], texte: 'puis le boyau au drain' },
          { n: 6, rond: [452, 196], cible: [484, 208], texte: 'tous les robinets ouverts' },
        ],
      },

      toilette: {
        titre: 'La toilette',
        dessin: z => {
          const voie = bez([
            [[56, 142], [62, 162], [74, 164], [78, 148]],
            [[78, 148], [82, 132], [92, 132], [92, 148]],
            [[92, 148], [92, 164], [86, 174], [86, 186]],
          ]).map(([x, y]) => [x, y + TY]);
          const [g, d] = tube(voie, 8);
          const plug = 'M43,137 C43,130 52,129 56,133 C61,137 63,144 61,149 C58,153 51,151 48,147 C45,144 43,141 43,137 Z';
          // la toilette remonte de TY dans sa vue : les chemins écrits à la main sont décalés ici
          const haut = svg => svg.replace(/(-?[\d.]+),(-?[\d.]+)/g, (m, x, y) => `${x},${+y + TY}`);
          return vignette(z, [
            h.rect(CADRE.x0, 186 + TY, 133 - CADRE.x0, 8, h.a.hachure('bois')),
            // la porcelaine, avec le creux de la cuvette
            h.path(haut('M8,112 C8,134 20,148 38,152 C41,160 41,172 34,186 L100,186 C102,166 106,150 110,112 L70,112 C64,138 56,146 46,146 C30,146 16,134 16,112 Z'), h.a.hachure('metal', 'contour')),
            // la voie du siphon, taillée dans la porcelaine
            h.path(`M${P(g)} L${P([...d].reverse())} Z`, 'fill="#ffffff" stroke="none"'),
            h.path(`M${P(g)}`, h.a.arete), h.path(`M${P(d)}`, h.a.arete),
            // le siège
            h.path(haut('M6,112 L6,108 Q6,105 10,105 L76,105 L76,112'), blancArete),
            // le réservoir, vide
            h.rect(76, 50 + TY, 38, 62, blancContour),
            h.rect(74, 46 + TY, 42, 4, blancArete),
            h.rect(79, 53 + TY, 32, 56, h.a.loin),
            h.rect(79, 53 + TY, 32, 56, h.a.detail),
            h.path(haut('M88,109 L88,68 M92,109 L92,68'), h.a.detail),
            h.path(haut('M84,109 Q90,103 96,109'), h.a.detail),
            // l'éponge au fond du réservoir
            h.rect(99, 100 + TY, 11, 8, h.a.hachure('gravier')),
            // le chiffon ensaché dans le fond de la cuvette
            bouchon(haut(plug), haut('M47,133 L43,126 L51,128 Z')),
          ].join('\n'));
        },
        renvois: z => [
          renvoi(z, 7, [34, 62 + TY], [100, 104 + TY], 'réservoir vidé, fond épongé'),
          renvoi(z, 8, [14, 172 + TY], [52, 142 + TY], 'cuvette épongée, puis bouchée'),
        ],
      },

      bouchon: {
        titre: 'Vider le siphon',
        dessin: z => vignette(z, [
          // l'eau qui reste au fond du coude, et qui sort par le bas
          siphon([liquide(131)]),
          // le collet fileté au bas du coude, ouvert : le bouchon est dévissé ; l'eau passe dedans
          h.rect(63, 137, 18, 9, blancArete),
          h.rect(67.5, 137, 9, 9, h.a.hachure('eau', 'aucun')),
          h.ligne(67.5, 137, 67.5, 146, h.a.detail), h.ligne(76.5, 137, 76.5, 146, h.a.detail),
          // le jet, du collet à l'eau de la chaudière
          h.path('M67.5,146 L76.5,146 L74.5,160 L74,181 L70,181 L69.5,160 Z', h.a.hachure('eau', 'fin')),
          // la chaudière posée dessous, un fond d'eau
          h.path('M50,176 L94,176 L91,198 L53,198 Z', h.a.hachure('eau', 'aucun')),
          h.ligne(50, 176, 94, 176, h.a.detail),
          h.path('M44,164 L100,164 L96,198 L48,198 Z', h.a.arete),
          h.rect(42, 161, 60, 4, blancArete),
          // le bouchon dévissé, tenu à côté : son filet et sa tête
          h.rect(36, 146, 16, 6, blancArete),
          h.rect(38, 140, 12, 6, blancArete),
          h.ligne(40, 141, 40, 145, h.a.fin), h.ligne(44, 141, 44, 145, h.a.fin), h.ligne(48, 141, 48, 145, h.a.fin),
          h.fleche('M58,140 Q50,132 44,137', h.a.detail),
        ].join('\n')),
        renvois: z => [
          renvoi(z, 9, [18, 172], [44, 149], 'bouchon du coude dévissé, chaudière dessous'),
        ],
      },

      poire: {
        titre: 'Sans bouchon',
        dessin: z => vignette(z, [
          siphon([liquide(130)]),
          // la poire : bulbe au-dessus de l'évier, tube jusqu'au fond du coude
          h.path('M54,24 L54,133 Q56,136 58,133 L58,24', blancArete),
          h.ellipse(56, 13, 9, 12, blancArete),
          h.rect(52, 22, 8, 4, blancArete),
        ].join('\n')),
        renvois: z => [
          renvoi(z, 10, [24, 92], [54, 100], 'siphon vidé à la poire'),
        ],
      },

      boucher: {
        titre: 'Puis le boucher',
        dessin: z => [
          // règle 10 : un filet, dans la gouttière, sépare l'autre façon (la vignette suivante) de la suite des gestes
          h.ligne(z.l + 11, 0, z.l + 11, z.h, h.a.fin),
          vignette(z, [
          siphon(),
          bouchon('M50,82 L50,50 C42,48 40,38 50,36 C54,30 60,30 63,36 C72,38 70,48 62,50 L62,82 C58,86 54,86 50,82 Z',
            'M54,32 L50,24 L58,27 Z'),
          ].join('\n')),
        ].join('\n'),
        renvois: z => [
          renvoi(z, 11, [22, 76], [50, 66], 'chiffon et sac, bien tassés'),
        ],
      },

      huile: {
        titre: 'Autre façon : l’huile',
        dessin: z => [
          vignette(z, [
            siphon([liquide(101, HUILE)]),
            // la tasse penchée qui verse dans la bonde ; les gouttes d'huile, en gris
            h.path(tasse('M70,10 L92,10 L90,30 Q81,34 72,30 Z'), blancArete),
            h.path(tasse('M91,15 Q99,16 98,22 Q97,27 90,26'), h.a.arete),
            h.ellipse(60, 34, 1.6, 2.3, HUILE.replace('stroke="none"', 'stroke="#1A1A1A" stroke-width="0.5"')),
            h.ellipse(58, 42, 1.6, 2.3, HUILE.replace('stroke="none"', 'stroke="#1A1A1A" stroke-width="0.5"')),
          ].join('\n')),
        ].join('\n'),
        renvois: z => [
          renvoi(z, 12, [24, 96], [56, 112], 'ou de l’huile de cuisson dans le coude'),
        ],
      },
    },
  };
};
