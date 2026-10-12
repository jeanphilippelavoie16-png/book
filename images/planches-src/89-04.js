// Planche 89-04 — L'attache à lanière simple (ch. 89, bloc H, étapes 35 à 38)
//
// Rangée du haut, vue de dessus sur le centre de la raquette (pointe en haut) : la lanière
// fixée, le pied dans la boucle, le tour du talon et le nœud. Rangée du bas, de côté, coupé au
// milieu de la raquette (pointe à droite) : le pied à plat, puis le talon levé.
//
// Le montage, suivi pour vrai : la lanière passe sous le cordon d'orteils de chaque côté du
// trou et y est liée de quelques tours de babiche. Liée, pas seulement passée dessous : une
// lanière qui coulisse sous le cordon laisse la bride s'allonger pendant que le tour du talon
// raccourcit, et le pied avance jusqu'à la traverse. La bride monte de là sur les orteils ;
// les deux bouts repartent vers l'arrière le long du pied et se nouent derrière le talon. Tout est une seule boucle fermée autour du pied,
// ancrée en deux points sur le cordon : le pied ne peut ni avancer (la bride, tirée vers le
// bas, le retient) ni reculer (le tour du talon le retient). Les deux ancrages sont sur la
// ligne du pivot, sous l'avant du pied : quand le talon monte, toute la lanière tourne avec
// le pied autour de ce point, rien ne se tend, et la pointe du pied descend dans le trou
// entre le cordon et la traverse avant, sans toucher la traverse.

module.exports = (h) => ({
  ref: '89-04',
  titre: 'L’attache à lanière simple',
  desc: 'En haut, trois vues de dessus du centre de la raquette, pointe en haut : la traverse avant, le trou des orteils juste derrière, le cordon d’orteils en noir, le laçage. D’abord la lanière de cuir, liée au cordon d’orteils de chaque côté du trou ; entre ses deux attaches, une boucle lâche ; les deux bouts traînent vers l’arrière. Puis le mocassin glissé vers l’avant dans la boucle, qui passe sur les orteils ; la pointe du pied au-dessus du trou, en arrière de la traverse. Enfin les deux bouts qui longent le pied, font le tour du talon et se nouent derrière. En bas, de côté, coupé au milieu de la raquette : le pied à plat, la bride tirée vers le bas jusqu’au cordon, la lanière qui remonte le long du pied jusqu’au nœud derrière le talon ; puis le talon levé, le pied qui tourne sur le cordon, sa pointe qui descend dans le trou sans toucher la traverse, la lanière qui tourne avec lui sans se tendre.',
  format: 'pleine',
  disposition: [['poser', 'pied', 'noeud'], ['profil', 'pivot']],
  hauteurs: [1.15, 1],
  vues: {
    poser: {
      titre: 'Fixer la lanière',
      dessin: z => {
        const P = plan(z);
        return [
          DEFS,
          base(h, P),
          bande(h, P.lisse(BRIDE_A), LARG * S, { debut: false, fin: false }),
          bande(h, P.lisse(BOUT_A_G), LARG * S, { debut: false }),
          bande(h, P.lisse(BOUT_A_D), LARG * S, { debut: false }),
          cordon(h, P),
          ligatures(h, P),
        ].join('\n');
      },
      renvois: z => {
        const P = plan(z);
        return [
          { n: 1, rond: [14, z.h - 14], cible: P.pt([-7.4, 24.6]), texte: 'lanière large de cuir souple' },
          { n: 2, rond: [14, 14], cible: P.pt([-6.8, -0.75]), texte: 'fixée de chaque côté du trou des orteils' },
          { n: 3, rond: [z.l - 14, 14], cible: P.pt([6.8, -0.75]), texte: 'assez écartées : le pied entre jusqu’aux orteils' },
        ];
      },
    },
    pied: {
      titre: 'Le pied dans la boucle',
      dessin: z => {
        const P = plan(z);
        return [
          base(h, P),
          bande(h, P.lisse(BOUT_B_G), LARG * S, { debut: false }),
          bande(h, P.lisse(BOUT_B_D), LARG * S, { debut: false }),
          bande(h, P.lisse(BRIDE), LARG * S, { debut: false, fin: false }),
          cordon(h, P),
          ligatures(h, P),
          pied(h, P),
          bande(h, P.lisse(BRIDE).slice(8, -8), LARG * S, { debut: false, fin: false }),
          h.fleche(`M${P.pt([0, 27.2]).join(' ')} L${P.pt([0, 23.4]).join(' ')}`),
        ].join('\n');
      },
      renvois: z => {
        const P = plan(z);
        return [
          { n: 4, rond: [14, z.h - 14], cible: P.pt([-3.2, 8]), texte: 'mocassin, mukluk ou botte souple' },
          { n: 5, rond: [z.l - 14, 14], cible: P.pt([2.4, -2.3]), texte: 'bride lâche : les orteils bougent' },
        ];
      },
    },
    noeud: {
      titre: 'Le tour du talon, le nœud',
      dessin: z => {
        const P = plan(z);
        return [
          base(h, P),
          bande(h, P.lisse(QUEUE_1), 1.3 * S, { debut: false }),
          bande(h, P.lisse(QUEUE_2), 1.3 * S, { debut: false }),
          bande(h, P.lisse(COTE_G), LARG * S, { debut: false, fin: false }),
          bande(h, P.lisse(COTE_D), LARG * S, { debut: false, fin: false }),
          bande(h, P.lisse(BRIDE), LARG * S, { debut: false, fin: false }),
          cordon(h, P),
          ligatures(h, P),
          pied(h, P),
          bande(h, P.lisse(BRIDE).slice(8, -8), LARG * S, { debut: false, fin: false }),
          noeud(h, P.pt(NOEUD), S),
        ].join('\n');
      },
      renvois: z => {
        const P = plan(z);
        return [
          { n: 6, rond: [z.l - 12, P.pt([0, 16])[1]], cible: P.pt([4.55, 16]), texte: 'les deux bouts font le tour du talon' },
          { n: 7, rond: [z.l - 14, z.h - 14], cible: P.pt([NOEUD[0] + 0.9, NOEUD[1] + 0.4]), texte: 'nœud fait une fois pour toutes' },
        ];
      },
    },
    profil: {
      titre: 'De côté',
      dessin: z => cote(h, z, 0),
      renvois: z => {
        const C = cote_(z, 0);
        return [
          { n: 8, rond: [C.pt([6.5, 0])[0], C.pt([0, 10.5])[1]], cible: C.pt([1.25, 1.9]), texte: 'tirée vers le bas, l’orteil ne bute pas' },
          { n: 9, rond: [20, C.pt([0, 14])[1]], cible: C.pt([-18.5, 5.8]), texte: 'tour du talon, sans écraser le tendon' },
          { n: 10, rond: [C.pt([-6, 0])[0], z.h - 11], cible: C.pt([-0.3, -0.5]), texte: 'le pied pivote sur le cordon d’orteils' },
        ];
      },
    },
    pivot: {
      titre: 'Le talon levé, le pied pivote',
      dessin: z => cote(h, z, THETA),
      renvois: z => {
        const C = cote_(z, THETA);
        return [
          { n: 11, rond: [20, 24], cible: C.pt(C.rot([-21.3, 1.8])), texte: 'le talon se lève, libre' },
          { n: 12, rond: [z.l - 14, z.h - 11], cible: C.pt(C.rot([3.5, 0.5])), texte: 'la pointe du pied descend dans le trou' },
        ];
      },
    },
  },
  danger: 'Danger — sur la glace, le pied doit sortir de la lanière d’un tour de cheville, sans les mains : une raquette restée au pied accroche le bord de la glace et empêche de battre des jambes pour remonter. On l’essaie sur la rive.',
});

// ─── Géométrie, en centimètres ────────────────────────────────────────────────────────────
// Vue de dessus : x en travers (0 au milieu), y en long (0 au cordon d'orteils, positif vers
// la queue). De côté : u vers la pointe (0 au cordon), z vers le haut (0 au laçage).

const NL = String.fromCharCode(10);
const S = 5.4;            // dessus : unités par cm
const SP = 7.2;            // de côté : unités par cm
const LARG = 1.6;          // largeur de la lanière
const Y_HAUT = -11, Y_BAS = 28;
const THETA = 28 * Math.PI / 180;

const wi = y => 13.0 - 0.0032 * (y - 1) ** 2;       // bord intérieur du fût
const wo = y => wi(y) + 1.25;                        // bord extérieur
const vague = (Y, x) => Y + 0.35 * Math.sin(1.05 * x + 0.6 * Y);

// Pied de dessus (pied droit, gros orteil à gauche) : pointe à -4,2, talon à 21,9.
const PIED = [[-0.8, -4.2], [1.8, -3.8], [3.8, -2.4], [4.7, -0.2], [5.0, 2.5], [4.6, 6.5], [3.9, 10.5],
  [3.7, 14], [3.6, 17.5], [3.0, 20.3], [1.6, 21.6], [0, 21.9], [-1.6, 21.6], [-3.0, 20.3], [-3.4, 17.5],
  [-3.3, 14], [-3.6, 10.5], [-4.4, 6.5], [-4.9, 2.5], [-4.7, -0.5], [-3.8, -2.6], [-2.5, -3.8]];

// La lanière. Les deux ancrages, sous le cordon d'orteils, à x = ±6,8.
const BRIDE = [[-6.8, 0.6], [-6.6, -0.7], [-5.4, -1.7], [-3, -2.2], [0, -2.35], [3, -2.2], [5.4, -1.7], [6.6, -0.7], [6.8, 0.6]];
const BRIDE_A = [[-6.8, 0.6], [-6.9, -0.8], [-6.2, -2.6], [-4, -4.2], [0, -4.8], [4, -4.2], [6.2, -2.6], [6.9, -0.8], [6.8, 0.6]];
const BOUT_A_G = [[-6.8, -0.4], [-6.8, 0.6], [-7.2, 3], [-8.2, 7], [-7.2, 11], [-8.4, 15.5], [-9.4, 20], [-8.6, 24.2], [-7.2, 26.4]];
const BOUT_A_D = [[6.8, -0.4], [6.8, 0.6], [7.3, 3], [7.8, 7], [7.0, 11.5], [7.8, 16], [8.9, 20.2], [8.9, 24], [7.8, 26.6]];
const BOUT_B_G = [[-6.8, -0.4], [-6.8, 0.6], [-7.6, 3], [-8.9, 6.5], [-9.9, 10.5], [-10.3, 15], [-10.1, 19.5], [-9.8, 23], [-9.3, 26.3]];
const BOUT_B_D = [[6.8, -0.4], [6.8, 0.6], [7.5, 3], [8.8, 6.7], [9.8, 11], [10.2, 15.5], [10.0, 20], [9.6, 23.4], [9.0, 26.4]];
const COTE_G = [[-6.8, -0.4], [-6.8, 0.6], [-6.9, 2.5], [-6.3, 6], [-5.3, 10], [-4.6, 14], [-4.3, 17.5], [-3.9, 20.2], [-2.8, 22.2], [-1.2, 23.2], [0.3, 23.5]];
const COTE_D = [[6.8, -0.4], [6.8, 0.6], [6.9, 2.5], [6.3, 6], [5.3, 10], [4.6, 14], [4.4, 17.5], [4.1, 20.2], [3.2, 22.2], [2.0, 23.2], [1.1, 23.5]];
const NOEUD = [0.7, 23.6];
const QUEUE_1 = [[0.2, 23.8], [-0.3, 25.2], [-0.9, 26.6]];
const QUEUE_2 = [[1.2, 23.8], [1.8, 25.1], [2.5, 26.3]];

// Pied de côté (pointe à droite), la jambe coupée au-dessus de la cheville.
const PIED_C = [[3.0, 0], [3.8, 0.35], [4.2, 1.3], [3.9, 2.6], [2.6, 3.5], [0.5, 4.2], [-3, 5.0], [-6.8, 6.4],
  [-9.6, 8.4], [-11.0, 11], [-11.3, 13.5], [-11.4, 16.2], [-20.9, 16.2], [-20.7, 13], [-20.6, 11],
  [-20.8, 8.2], [-21.5, 5.3], [-21.9, 3], [-21.6, 1.1], [-20.8, 0.1], [-19, 0]];
const COUPURE_C = [[-11.9, 16.2], [-14.3, 16.8], [-16.3, 15.9], [-18.5, 16.6], [-21.4, 16.0]];
const COUTURE_C = [[3.3, 2.1], [1.2, 3.3], [-2.5, 4.1], [-6.4, 5.4]];
const BRIDE_C = [[0.25, -0.1], [0.9, 1.0], [1.5, 2.2], [2.0, 3.4], [2.25, 4.35]];
const TALON_C = [[-0.25, -0.1], [-1.2, 0.55], [-3, 1.2], [-8, 2.85], [-13, 4.35], [-17.5, 5.5], [-19.8, 6.05], [-20.6, 6.3], [-21.0, 6.45]];
const NOEUD_C = [-21.3, 6.5];

// ─── Outils ─────────────────────────────────────────────────────────────────────────────
const DEFS = '<defs><pattern id="h-lacage" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">'
  + '<line x1="0" y1="0" x2="7" y2="0" stroke="#1A1A1A" stroke-width="0.5"/>'
  + '<line x1="0" y1="0" x2="0" y2="7" stroke="#1A1A1A" stroke-width="0.5"/>'
  + '<line x1="0" y1="7" x2="7" y2="0" stroke="#1A1A1A" stroke-width="0.5"/></pattern></defs>';

function spline(pts, ferme = false, n = 8) {
  const Q = ferme ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
  const out = [];
  for (let i = 1; i < Q.length - 2; i++) {
    const [p0, p1, p2, p3] = [Q[i - 1], Q[i], Q[i + 1], Q[i + 2]];
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map(j => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2
        + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
    }
  }
  if (!ferme) out.push(pts[pts.length - 1]);
  return out;
}

function plan(z) {
  const cx = z.l / 2, y0 = z.h / 2 - ((Y_HAUT + Y_BAS) / 2) * S;
  const pt = ([x, y]) => [cx + x * S, y0 + y * S];
  return { pt, pts: a => a.map(pt), lisse: a => spline(a).map(pt) };
}

// Une bande (la lanière) autour d'une ligne médiane déjà en unités de dessin.
function bande(h, c, w, { debut = true, fin = true, trait } = {}) {
  trait = trait || h.a.arete;
  const n = c.length, G = [], D = [];
  for (let i = 0; i < n; i++) {
    const a = c[Math.max(0, i - 1)], b = c[Math.min(n - 1, i + 1)];
    let dx = b[0] - a[0], dy = b[1] - a[1];
    const d = Math.hypot(dx, dy) || 1; dx /= d; dy /= d;
    G.push([c[i][0] - dy * w / 2, c[i][1] + dx * w / 2]);
    D.push([c[i][0] + dy * w / 2, c[i][1] - dx * w / 2]);
  }
  const out = [h.chemin([...G, ...D.slice().reverse()], h.a.blanc, true), h.chemin(G, trait), h.chemin(D, trait)];
  if (debut) out.push(h.ligne(...G[0], ...D[0], trait));
  if (fin) out.push(h.ligne(...G[n - 1], ...D[n - 1], trait));
  return out.join('\n');
}

// Le centre de la raquette vu de dessus : laçage, traverse avant, fût, trou, haubans.
function base(h, P) {
  const out = [];
  const bord = (Y, x0, x1) => { const a = []; const n = 24; for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n; a.push([x, vague(Y, x)]); } return a; };
  const cote = (f, y0, y1) => { const a = []; const n = 30; for (let i = 0; i <= n; i++) { const y = y0 + (y1 - y0) * i / n; a.push([f(y), y]); } return a; };
  // laçage
  const lac = [...bord(Y_HAUT, -wi(Y_HAUT), wi(Y_HAUT)), ...cote(wi, Y_HAUT, Y_BAS), ...bord(Y_BAS, wi(Y_BAS), -wi(Y_BAS)), ...cote(y => -wi(y), Y_BAS, Y_HAUT)];
  out.push(h.chemin(P.pts(lac), 'fill="url(#h-lacage)" stroke="none"', true));
  // traverse avant, mortaisée dans le fût
  const [tx0, ty0] = P.pt([-wi(-6.4) - 0.3, -7.3]), [tx1, ty1] = P.pt([wi(-6.4) + 0.3, -5.5]);
  out.push(h.rect(tx0, ty0, tx1 - tx0, ty1 - ty0, h.a.blanc));
  for (const f of [0.3, 0.55, 0.78]) {
    const yy = ty0 + (ty1 - ty0) * f;
    out.push(h.path(`M${tx0 + 6} ${yy.toFixed(1)} Q${((tx0 + tx1) / 2).toFixed(1)} ${(yy + (f - 0.5) * 3).toFixed(1)} ${tx1 - 6} ${yy.toFixed(1)}`, h.a.fin));
  }
  out.push(h.rect(tx0, ty0, tx1 - tx0, ty1 - ty0, h.a.arete));
  // trou des orteils : entre le cordon, les haubans et la traverse
  const trou = `M${P.pt([-5.2, -0.4]).join(' ')} Q${P.pt([-5.9, -3.4]).join(' ')} ${P.pt([-4.3, -5.5]).join(' ')} L${P.pt([4.3, -5.5]).join(' ')} Q${P.pt([5.9, -3.4]).join(' ')} ${P.pt([5.2, -0.4]).join(' ')} Z`;
  out.push(h.path(trou, h.a.blanc));
  out.push(h.path(`M${P.pt([-5.2, -0.4]).join(' ')} Q${P.pt([-5.9, -3.4]).join(' ')} ${P.pt([-4.3, -5.5]).join(' ')}`, h.a.arete));
  out.push(h.path(`M${P.pt([5.2, -0.4]).join(' ')} Q${P.pt([5.9, -3.4]).join(' ')} ${P.pt([4.3, -5.5]).join(' ')}`, h.a.arete));
  // le fût, de chaque côté
  for (const s of [-1, 1]) {
    const yA = vague(Y_HAUT, s * wi(Y_HAUT)), yB = vague(Y_BAS, s * wi(Y_BAS));
    const ext = cote(y => s * wo(y), yA, yB), int = cote(y => s * wi(y), yA, yB);
    out.push(h.chemin(P.pts([...ext, ...int.slice().reverse()]), h.a.blanc, true));
    out.push(h.chemin(P.pts(ext), h.a.contour));
    out.push(h.chemin(P.pts(int), h.a.arete));
  }
  // coupures en haut et en bas
  for (const Y of [Y_HAUT, Y_BAS]) out.push(h.chemin(P.pts(bord(Y, -wo(Y) - 0.4, wo(Y) + 0.4)), h.a.fin));
  return out.join('\n');
}

// Le cordon d'orteils, par-dessus la lanière qui passe dessous.
function cordon(h, P) {
  const [x0, y0] = P.pt([-wi(0), -0.45]), [x1, y1] = P.pt([wi(0), 0.45]);
  return h.rect(x0, y0, x1 - x0, y1 - y0, h.a.plein);
}

function pied(h, P) {
  const c = spline(PIED, true).map(P.pt);
  return [h.chemin(c, h.a.blanc, true), h.chemin(c, h.a.detail, true)].join(NL);
}

// La lanière liée au cordon, de chaque côté du trou : quelques tours de babiche.
function ligatures(h, P) {
  const out = [];
  for (const s of [-1, 1]) {
    const [x0, y0] = P.pt([s * 6.8 - 1.2, -0.75]), [x1, y1] = P.pt([s * 6.8 + 1.2, 0.75]);
    out.push(h.rect(x0, y0, x1 - x0, y1 - y0, h.a.blanc), h.rect(x0, y0, x1 - x0, y1 - y0, h.a.detail));
    for (const t of [0.3, 0.5, 0.7]) out.push(h.path(`M${x0} ${y0 + (y1 - y0) * t} L${x1} ${y0 + (y1 - y0) * t}`, h.a.fin));
  }
  return out.join(NL);
}

function noeud(h, [x, y], s) {
  return [
    h.ellipse(x, y, 1.35 * s, 1.0 * s, h.a.blanc),
    h.ellipse(x, y, 1.35 * s, 1.0 * s, h.a.arete),
    h.path(`M${x - 1.0 * s} ${y - 0.5 * s} Q${x} ${y + 0.6 * s} ${x + 1.0 * s} ${y - 0.5 * s}`, h.a.fin),
  ].join('\n');
}

// De côté.
function cote_(z, theta) {
  const X0 = 22 + 25 * SP, Yw = z.h - 30;
  const c = Math.cos(theta), s = Math.sin(theta);
  const pt = ([u, v]) => [X0 + u * SP, Yw - v * SP];
  const rot = ([u, v]) => [u * c + v * s, v * c - u * s];
  return { pt, rot, X0, Yw };
}

function cote(h, z, theta) {
  const C = cote_(z, theta);
  const R = a => a.map(C.rot);
  const lis = a => spline(R(a)).map(C.pt);
  const out = [];
  // le laçage, coupé au milieu : interrompu par le trou des orteils
  out.push(h.chemin([C.pt([-25, -0.15]), C.pt([-0.55, -0.15])], h.a.arete));
  out.push(h.chemin([C.pt([7.3, -0.15]), C.pt([9.5, -0.15])], h.a.arete));
  // la traverse avant, en coupe
  const [bx0, by0] = C.pt([5.5, 1.1]), [bx1, by1] = C.pt([7.3, -1.1]);
  out.push(h.rect(bx0, by0, bx1 - bx0, by1 - by0, h.a.hachure('bois', 'arete')));
  // le pied, en mocassin, la jambe coupée
  const pied = spline(R(PIED_C), true).map(C.pt);
  out.push(h.chemin(pied, h.a.blanc, true), h.chemin(pied, h.a.detail, true));
  out.push(h.chemin(lis(COUPURE_C), h.a.blanc));
  // la lanière : le côté vers le talon, la bride sur les orteils, liés au cordon
  const w = 1.25 * SP;
  out.push(bande(h, lis(TALON_C), w, { debut: false, fin: false }));
  out.push(bande(h, lis(BRIDE_C), w, { debut: false }));
  // le nœud derrière le talon, les bouts qui pendent
  const [nu, nv] = C.rot(NOEUD_C);
  out.push(bande(h, spline([[nu - 0.1, nv - 0.5], [nu - 0.4, nv - 1.9], [nu - 0.6, nv - 3.2]]).map(C.pt), 0.9 * SP, { debut: false }));
  out.push(bande(h, spline([[nu + 0.2, nv - 0.5], [nu + 0.3, nv - 1.8], [nu + 0.1, nv - 3.0]]).map(C.pt), 0.9 * SP, { debut: false }));
  out.push(noeud(h, C.pt([nu, nv]), SP * 0.75));
  // le cordon d'orteils, en coupe
  const [cx, cy] = C.pt([0, -0.2]);
  out.push(h.cercle(cx, cy, 0.62 * SP, h.a.plein));
  // le talon qui monte
  if (theta) {
    const Ra = 24.5, a1 = 174 * Math.PI / 180, a2 = 151 * Math.PI / 180;
    const p1 = C.pt([Ra * Math.cos(a1), Ra * Math.sin(a1)]), p2 = C.pt([Ra * Math.cos(a2), Ra * Math.sin(a2)]);
    out.push(h.fleche(`M${p1[0].toFixed(1)} ${p1[1].toFixed(1)} A${(Ra * SP).toFixed(1)} ${(Ra * SP).toFixed(1)} 0 0 0 ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`));
  }
  return out.join(NL);
}
