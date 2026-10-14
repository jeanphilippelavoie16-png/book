// Planche 89-07 — Les lunettes à fente (ch. 89, §9)
// La charte : la pièce au contour fort, le reste fin ; pas de gris (le devant noirci a déjà sa
// trame, la coupe est hachurée) ; pas de rouge : ni geste ni point à vérifier.
// Les têtes passent de profil (JP, 14 octobre) : la vue de dessus sur une tête devient la tête de
// profil (h.formes.tete), lunettes portées : on y voit la pièce qui revient sur la tempe en suivant
// le visage, la fente, la visière, la lanière qui passe au-dessus de l'oreille et le nœud derrière.
module.exports = (h) => ({
  ref: '89-07',
  titre: 'Les lunettes à fente',
  desc: 'À gauche, les lunettes vues de face : une pièce de bois allongée, le devant noirci, une fente étroite qui court d’un œil à l’autre sous une petite visière, une encoche en bas au milieu pour le nez, et à chaque bout une lanière de peau arrêtée par un nœud. Au centre, portées, une tête de profil : la pièce un peu courbée qui revient sur la tempe en suivant le visage, la fente à la hauteur de l’œil, la visière qui avance, la lanière qui passe au-dessus de l’oreille et se noue derrière la tête. À droite, en coupe à la hauteur d’un œil : la visière au-dessus de la fente, l’intérieur creusé qui laisse bouger les cils, la pièce appuyée au front et à la pommette.',
  format: 'demi',
  disposition: [['face', 'dessus', 'coupe']],
  largeurs: [[2.6, 2, 1.6]],
  vues: {
    face: {
      titre: 'De face',
      dessin: z => {
        const F = face(z);
        return [
          // lanières qui pendent, derrière la pièce
          ...[-1, 1].map(s => lanière(h, F.lan(s))),
          // la pièce : noircie au devant
          h.path(F.p(CORPS), h.a.blanc),
          h.path(F.p(CORPS), h.a.hachure('grillage', 'fin')),
          h.path(F.p(FENTE), h.a.plein),
          h.path(F.p(VISIERE_FACE), h.a.arete),
          h.path(F.p(CORPS), h.a.contour),
          // nœuds d'arrêt, dans le trou de chaque bout
          ...[-1, 1].map(s => {
            const [x, y] = F.pt([s * 93, 3]);
            return h.ellipse(x, y, 4.5, 4, h.a.blanc) + '\n' + h.ellipse(x, y, 4.5, 4, h.a.arete)
              + '\n' + h.path(`M${x - 2.5},${y - 1} Q${x},${y + 2} ${x + 2.5},${y - 1}`, h.a.fin);
          }),
        ].join('\n');
      },
      renvois: z => {
        const F = face(z);
        return [
          { n: 1, rond: [F.cx, 178], cible: F.pt([0, 13]), texte: 'encoche pour le nez' },
          { n: 2, rond: [F.cx + 40, 28], cible: F.pt([40, -3]), texte: 'fente étroite, à la hauteur des yeux' },
          { n: 3, rond: [F.cx - 48, 178], cible: F.pt([-50, 14]), texte: 'devant noirci, suie mêlée d’huile' },
          { n: 4, rond: [z.l - 44, 200], cible: F.lan(1).pts[22], texte: 'lanière de peau à chaque bout' },
        ];
      },
    },
    dessus: {
      titre: 'Portées, de profil',
      dessin: z => {
        const D = porte(z);
        const P = pts => pts.map(D.T);
        return [
          // la tête de profil, regard à droite (la bibliothèque des têtes)
          h.formes.tete({ x: D.x0, y: D.y0, echelle: D.e, age: 'adulte' }),
          // les bouts de la lanière, qui pendent derrière la tête, puis le nœud
          lanière(h, { pts: P(BOUT_1) }, 3.5),
          lanière(h, { pts: P(BOUT_2) }, 3.5),
          // la lanière, de la tempe à l'arrière de la tête, au-dessus de l'oreille
          lanière(h, { pts: P(LANIERE_P) }, 3.5),
          h.ellipse(...D.T(NOEUD_P), 5, 4.2, h.a.blanc),
          h.ellipse(...D.T(NOEUD_P), 5, 4.2, h.a.arete),
          // la pièce, vue de côté : elle revient du devant jusqu'à la tempe
          h.chemin(P(BANDE_P), h.a.blanc, true),
          h.chemin(P(FENTE_P), h.a.plein, true),
          h.chemin(P(VISIERE_P), h.a.arete),
          h.chemin(P(VISIERE_BOUT), h.a.blanc, true),
          h.chemin(P(VISIERE_BOUT), h.a.arete, true),
          h.chemin(P(BANDE_P), h.a.contour, true),
        ].join('\n');
      },
      renvois: z => {
        const D = porte(z);
        return [
          { n: 5, rond: [z.l - 12, 22], cible: D.T([78, -40.5]), texte: 'bois un peu courbé, épouse le visage' },
          { n: 6, rond: [14, z.h - 40], cible: D.T([NOEUD_P[0] - 4, NOEUD_P[1] + 4]), texte: 'lanières nouées derrière la tête' },
        ];
      },
    },
    coupe: {
      titre: 'En coupe, à l’œil',
      dessin: z => {
        const C = coupe(z);
        return [
          // le visage de profil, au trait
          h.path(C.p(PROFIL), h.a.fin),
          h.path(C.p(OEIL), h.a.fin),
          h.path(C.p(CILS), h.a.fin),
          // la pièce coupée : dessus de la fente (avec la visière), dessous
          h.path(C.p(HAUT), h.a.hachure('bois', 'detail')),
          h.path(C.p(HAUT), h.a.contour),
          h.path(C.p(BAS), h.a.hachure('bois', 'detail')),
          h.path(C.p(BAS), h.a.contour),
        ].join('\n');
      },
      renvois: z => {
        const C = coupe(z);
        return [
          { n: 7, rond: [z.l - 16, 60], cible: C.pt([96, 109]), texte: 'petite visière au-dessus de la fente' },
          { n: 8, rond: [z.l - 16, 196], cible: C.pt([75.5, 134]), texte: 'intérieur creusé : les cils bougent' },
        ];
      },
    },
  },
});

// ─── Outils ──────────────────────────────────────────────────────────────────────────────
const r1 = v => +v.toFixed(1);
const mapPath = (d, f) => d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g, (m, x, y) => f([+x, +y]).join(','));
const bez = (a, b, c, d, n = 40) => Array.from({ length: n + 1 }, (_, i) => {
  const t = i / n, u = 1 - t;
  return [0, 1].map(k => u * u * u * a[k] + 3 * u * u * t * b[k] + 3 * u * t * t * c[k] + t * t * t * d[k]);
});
// Une lanière : bande de largeur w autour d'une ligne médiane
function lanière(h, { pts }, w = 5) {
  const g = [], d = [];
  pts.forEach((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const nx = -(b[1] - a[1]) / L * w / 2, ny = (b[0] - a[0]) / L * w / 2;
    g.push([r1(p[0] + nx), r1(p[1] + ny)]);
    d.push([r1(p[0] - nx), r1(p[1] - ny)]);
  });
  const poly = g.concat(d.reverse());
  return h.chemin(poly, h.a.blanc, true) + '\n' + h.chemin(poly, h.a.arete, true);
}

// ─── De face ─────────────────────────────────────────────────────────────────────────────
// Repère local : centre de la pièce en 0,0 ; x vers la droite, y vers le bas.
const CORPS = 'M-104,-6 C-80,-24 -40,-28 0,-28 C40,-28 80,-24 104,-6 Q111,1 104,8 C90,20 60,27 26,27 C18,27 14,24 12,18 C9,10 4,7 0,7 C-4,7 -9,10 -12,18 C-14,24 -18,27 -26,27 C-60,27 -90,20 -104,8 Q-111,1 -104,-6 Z';
const FENTE = 'M-84,-5 L84,-5 Q86.5,-5 86.5,-3 Q86.5,-1 84,-1 L-84,-1 Q-86.5,-1 -86.5,-3 Q-86.5,-5 -84,-5 Z';
const VISIERE_FACE = 'M-91,-6.5 Q-92,-10 -88,-10 L88,-10 Q92,-10 91,-6.5';
function face(z) {
  const K = 0.95, cx = z.l / 2, cy = 92;
  const pt = ([x, y]) => [r1(cx + K * x), r1(cy + K * y)];
  return {
    cx, pt,
    p: d => mapPath(d, pt),
    // lanière : sort de derrière le bout et pend
    lan: s => ({ pts: bez([s * 96, 3], [s * 114, 6], [s * 118, 40], [s * 114, 110]).map(pt) }),
  };
}

// ─── Portées, de profil ──────────────────────────────────────────────────────────────────
// Repère de la tête (h.formes.tete) : millimètres, l'oreille en 0,0, regard vers +x, y vers le
// bas ; l'œil en (80, -24), le haut du nez en (98, -33). La pièce mesure environ 4 cm de haut
// devant l'œil et s'amincit vers la tempe, comme de face.
const BANDE_P = [[110, -47], [96, -46.5], [80, -43], [66, -37], [55, -31], [49, -27.5], [47.5, -24.5], [49, -21.5],
  [56, -19.5], [70, -15], [88, -9.5], [107, -6], [109, -26]];
const FENTE_P = [[109.5, -26.8], [92, -26.2], [74, -25.2], [61, -24.6], [61, -23.2], [74, -23.4], [92, -23.4], [109.5, -22.6]];
const VISIERE_P = [[109, -29.5], [92, -29.4], [76, -28.4], [64, -27.6]];
const VISIERE_BOUT = [[109.5, -34], [119, -30.5], [119, -28.5], [109.5, -27.2]];
const LANIERE_P = [[52, -25], [30, -30], [4, -36], [-26, -36], [-56, -31], [-86, -24], [-94, -22]];
const NOEUD_P = [-95, -22];
const BOUT_1 = [[-96, -19], [-102, -8], [-106, 4]];
const BOUT_2 = [[-93, -19], [-95, -6], [-94, 6]];
function porte(z) {
  const e = 0.7, x0 = r1(z.l / 2 - 8 * e + 2), y0 = r1(30 + 129 * e);
  return { e, x0, y0, T: ([u, v]) => [r1(x0 + e * u), r1(y0 + e * v)] };
}

// ─── Vu de dessus (l'ancienne vue, gardée pour mémoire, plus dessinée) ──────────────────
// Le visage regarde vers le haut de la page. La pièce suit un arc de centre (cx, 150).
function dessus(z) {
  const cx = r1(z.l / 2), cyA = 150, cyT = 142, yN = 214;
  const pol = (r, deg) => { const a = deg * Math.PI / 180; return [r1(cx + r * Math.sin(a)), r1(cyA - r * Math.cos(a))]; };
  const pas = (a0, a1, n = 24) => Array.from({ length: n + 1 }, (_, i) => a0 + (a1 - a0) * i / n);
  const ligne = (r, a0, a1) => 'M' + pas(a0, a1).map(a => pol(r, a).join(',')).join(' L');
  const arc = (ri, re, a0, a1) => {
    const ext = pas(a0, a1).map(a => pol(re, a));
    const int = pas(a0, a1).reverse().map(a => pol(ri, a));
    // bouts arrondis
    const b1 = pol((ri + re) / 2 + 0, a1 + 2.2), b0 = pol((ri + re) / 2, a0 - 2.2);
    return 'M' + ext.map(p => p.join(',')).join(' L') + ` Q${b1.join(',')} ${int[0].join(',')} L` + int.map(p => p.join(',')).join(' L') + ` Q${b0.join(',')} ${ext[0].join(',')} Z`;
  };
  // lanière : du bout de la pièce, le long de la tête, jusqu'au nœud derrière
  const ell = phi => { const a = phi * Math.PI / 180; return [r1(cx + 62 * Math.sin(a)), r1(cyT - 72 * Math.cos(a))]; };
  const lan = s => {
    const e = pol(79, s * 38);
    const tour = pas(52, 172, 30).map(p => ell(s * p));
    return { pts: [e, ...tour, [r1(cx + s * 4), yN - 1]] };
  };
  const bout = s => ({ pts: bez([cx + s * 3, yN + 2], [cx + s * 6, yN + 8], [cx + s * 9, yN + 12], [cx + s * 12, yN + 20], 12).map(p => p.map(r1)) });
  return { cx, cyT, yN, yF: r1(cyA - 74), pol, ligne, arc, lan, bout };
}

// ─── En coupe ────────────────────────────────────────────────────────────────────────────
// Visage tourné vers la droite ; l'œil en (56,120). Le devant de la pièce en x = 84.
const PROFIL = 'M55,44 C60,62 64,76 67,88 C68,94 64,102 61,107 M61,133 C66,138 69,144 69,150 C69,164 67,176 64,188';
const OEIL = 'M61,107 C64,111 66,115 66,120 C66,125 64,129 61,133';
const CILS = 'M63,109 L68,106 M64.5,112 L70,110.5 M65.5,115 L71,114.5 M63.5,131 L67.5,133.5';
const HAUT = 'M70,76 L80,76 Q84,76 84,80 L84,101 L100,106 L100,111 L86,114 L84,116 L75.5,116 C75.5,104 72,96 68,94 L68,78 Q68,76 70,76 Z';
const BAS = 'M75.5,124 L84,124 L84,152 Q84,155 81,155 L70,155 Q68,155 68,153 L68,146 C72,144 75.5,136 75.5,124 Z';
function coupe(z) {
  const K = 1.5, ox = r1(z.l - 36 - 100 * K), oy = r1(z.h / 2 - 116 * K);
  const pt = ([x, y]) => [r1(K * x + ox), r1(K * y + oy)];
  return { pt, p: d => mapPath(d, pt) };
}
