// Planche 60-10a — l'aiguille à filet, le moule et le nœud de maille (ch. 60, « Nouer une nappe
// quand il n'y a pas de filet »). Page a de deux ; la page b (60-10b) porte le rang sur le moule
// et le ramendage.
//
// Ce que le chapitre dit, et rien de plus : l'aiguille est une lame plate taillée dans un bardeau
// de cèdre, fourchue à un bout, une langue au milieu autour de laquelle le fil s'enroule ; le moule
// est une latte rabotée à la largeur de maille ; un nœud par maille, fait à l'aiguille. Aucune
// mesure d'aiguille, de moule ni de maille dans le chapitre : aucune cote.
//
// Le nœud est le nœud de filet (nœud d'écoute), dessiné en quatre temps, un par vue, avec le même
// chemin que h.formes.maille : le fil remonte de derrière le moule, entre dans la maille par
// derrière (derrière le brin gauche, devant le brin droit), fait le tour des deux brins par
// derrière, de droite à gauche, revient devant le brin gauche, passe sous son propre fil (dans la
// boucle) et sort devant le brin droit. Chaque vue reprend le chemin de la précédente et l'allonge :
// les croisements déjà faits restent les mêmes d'une vue à l'autre.
//
// Redessin du 14 octobre 2026 (le nœud restait trop dense à suivre) : le fil plus épais, la maille
// déjà faite en gris loin et le fil qu'on noue en blanc, pour qu'on suive le fil d'un croisement à l'autre.

'use strict';

module.exports = (h) => {
  const F = h.formes, I = F._interne;
  const f = n => Math.round(n * 10) / 10;
  const P = (x, y) => `${f(x)} ${f(y)}`;
  const BLANC_T = ep => `fill="#FFFFFF" stroke="#1A1A1A" stroke-width="${ep}" stroke-linejoin="round"`;
  const HALO = ep => `fill="none" stroke="#FFFFFF" stroke-width="${ep}" stroke-linecap="butt" stroke-linejoin="round"`;
  const RAD = Math.PI / 180;

  // l'aiguille posée par son talon (la fourche), pointe dans la direction deg
  const aiguilleTalon = (tx, ty, deg, L, chargee = true) =>
    F.aiguilleFilet({ x: tx + Math.cos(deg * RAD) * L / 2, y: ty + Math.sin(deg * RAD) * L / 2, longueur: L, angle: deg, chargee });

  // ── Vue 1 : l'aiguille de face, sur la tranche, puis chargée ─────────────────────────────
  const gAig = z => {
    const L = Math.min(z.l - 76, (z.h - 44) / 0.3);
    const hw = 0.07 * L, t = Math.max(6, 0.028 * L), cx = z.l / 2;
    let yA = hw + 4, yE = yA + hw + 13 + t / 2, yC = yE + t / 2 + 13 + hw;
    const dy = Math.max(0, (z.h - (yC + hw + 4)) / 2);
    yA += dy; yE += dy; yC += dy;
    return { L, hw, t, cx, yA, yE, yC, X: u => cx + u * L };
  };
  const vueAiguille = z => {
    const { L, hw, t, yA, yE, yC, X } = gAig(z);
    const out = [];
    // lignes de rappel entre les trois vues : talon et pointe
    for (const u of [-0.5, 0.5]) out.push(h.ligne(X(u), yA + 5, X(u), yC - 5, h.a.fin));
    // de face, vide ; le fil du bois en long sur la lame
    out.push(F.aiguilleFilet({ x: X(0), y: yA, longueur: L, chargee: false }));
    const g = [];
    for (const v of [-0.053, 0.053]) g.push(`M ${P(X(-0.47), yA + v * L)} C ${P(X(-0.2), yA + v * L - 1)} ${P(X(0.1), yA + v * L + 1)} ${P(X(0.37), yA + v * L * 0.78)}`);
    g.push(`M ${P(X(-0.395), yA)} L ${P(X(-0.1), yA)}`);
    out.push(h.path(g.join(' '), h.a.fin));
    // sur la tranche : une lame plate, amincie vers la pointe
    out.push(h.path(`M ${P(X(-0.5), yE - t / 2)} L ${P(X(0.34), yE - t / 2)} Q ${P(X(0.45), yE - t / 2)} ${P(X(0.5), yE - t * 0.14)} ` +
      `L ${P(X(0.5), yE + t * 0.14)} Q ${P(X(0.45), yE + t / 2)} ${P(X(0.34), yE + t / 2)} L ${P(X(-0.5), yE + t / 2)} Z`, BLANC_T(1.4)));
    // chargée
    out.push(F.aiguilleFilet({ x: X(0), y: yC, longueur: L, chargee: true }));
    return out.join('\n');
  };
  const vueAiguilleR = z => {
    const { L, yA, yE, yC, X } = gAig(z);
    return [
      { n: 1, rond: [z.l - 14, yA - 4], cible: [X(0.36), yA - 0.05 * L], texte: 'bardeau de cèdre' },
      { n: 2, rond: [14, yA], cible: [X(-0.46), yA], texte: 'fourche' },
      { n: 3, rond: [z.l - 14, yE + 4], cible: [X(0.12), yA + 0.004 * L], texte: 'langue' },
      { n: 4, rond: [14, yE + 2], cible: [X(-0.44), yE], texte: 'lame plate' },
      { n: 5, rond: [14, yC + 4], cible: [X(-0.3), yC + 0.01 * L], texte: 'chargée' },
    ];
  };

  // ── Vue 2 : charger — un tour de fil autour de la langue, par la fourche ─────────────────
  const gCh = z => {
    const L = Math.min(z.l - 46, (z.h - 40) / 0.14);
    return { L, cx: z.l / 2 + 12, cy: z.h * 0.5 };
  };
  const vueCharger = z => {
    const { L, cx, cy } = gCh(z);
    const Q = ([u, v]) => [cx + u * L, cy + v * L];
    const out = [F.aiguilleFilet({ x: cx, y: cy, longueur: L, chargee: false })];
    const fil = [[-0.425, -0.011], [-0.37, -0.021], [-0.25, -0.026], [-0.05, -0.0245], [0.15, -0.024], [0.232, -0.019],
      [0.274, -0.008], [0.283, 0.002], [0.27, 0.012], [0.232, 0.019], [0.15, 0.024], [-0.05, 0.0245], [-0.25, 0.026],
      [-0.37, 0.021], [-0.425, 0.011]].map(Q);
    out.push(F.corde(fil, { ep: Math.max(3, 0.017 * L), debut: 'ouvert', fin: 'ouvert', trait: 'detail', torons: true }));
    // retourner l'aiguille sur son long, puis refaire le tour sur l'autre face
    const tx = cx - L / 2 - 9;
    // la charte : le geste (retourner l'aiguille) en rouge
    out.push(h.geste(`M ${P(tx + 3, cy - 0.085 * L)} C ${P(tx - 12, cy - 0.06 * L)} ${P(tx - 12, cy + 0.06 * L)} ${P(tx + 3, cy + 0.085 * L)}`));
    return out.join('\n');
  };
  const vueChargerR = z => {
    const { L, cx, cy } = gCh(z);
    return [
      { n: 6, rond: [cx + 0.29 * L, cy - 0.07 * L - 16], cible: [cx + 0.283 * L, cy - 0.004 * L], texte: 'autour de la langue' },
      { n: 7, rond: [cx - 0.3 * L, cy + 0.07 * L + 18], cible: [cx - 0.425 * L, cy + 0.011 * L], texte: 'par la fourche, puis retourner' },
    ];
  };

  // ── Le nœud : la maille du rang d'au-dessus (U), le moule, le fil ────────────────────────
  // Repère du nœud : le fond de la maille en (0, 6), le bord du haut du moule à y = 14.
  const E = 5.4;                                            // épaisseur du fil, en unités du repère (redessin : plus épais)
  const base = [[-27.5, 28, -1], [-22, 12, -1], [-13, -12, -1],   // de derrière le moule, derrière le brin gauche
    [-7, -20, 1.6], [-2, -25, 2], [12, -40, 1.6], [26, -55, 1]];  // dans la maille, devant le brin droit
  const tour = [[42, -60, 1], [50, -72, 0], [42, -82, -1], [34, -82, -1], [0, -84, -1], [-34, -82, -1], [-46, -80, -1]];
  const retour = [[-53, -66, 0], [-44, -54, 1], [-25, -52, 1], [-12, -40, 0.7], [-2, -25, 0.5], [7, -14, 1], [12, -8, 1]];
  const gN = z => {
    const gw = Math.min(30, z.h * 0.14);
    const yg = z.h - gw - 4;
    const e = Math.min((yg - 2) / 114, (z.l - 22) / 180);
    const oy = yg - 14 * e, ox = 12 + 64 * e;
    const T = p => [ox + p[0] * e, oy + p[1] * e, p[2]];
    const ytop = (2 - oy) / e;
    return { gw, yg, e, oy, ox, T, ytop, V: (x, y) => [ox + x * e, oy + y * e] };
  };
  // la maille : deux brins qui montent vers les nœuds du rang d'au-dessus
  const K = 0.6;                                             // en 4 : tout se referme vers le fond de la maille
  const ferme = p => [p[0] * K, 6 + (p[1] - 6) * K, p[2]];
  const mailleU = (ytop, serre) => {
    let bas = [[-44, -118], [-30, -70], [-18, -32], [-11, -8], [-5, 3], [0, 6], [5, 3], [11, -8], [18, -32], [30, -70], [44, -118]];
    if (serre) bas = bas.map(p => ferme([...p, 0]));
    bas = bas.slice(1, -1);
    const [a, b] = [bas[bas.length - 2], bas[bas.length - 1]];
    const xh = b[0] + (b[0] - a[0]) / (b[1] - a[1]) * (ytop - b[1]);
    return [[-xh, ytop, 0], ...bas.map(p => [p[0], p[1], 0]), [xh, ytop, 0]];
  };
  const moule = (z, g) => [
    F.moule({ x: z.l / 2, y: g.yg, longueur: z.l - 6, largeur: g.gw }),
    // le fil, caché derrière le moule, descend vers le tour du moule
    h.ligne(...g.V(-22.6, 14 + 2.5 / g.e), ...g.V(-22.6 - 0.29 * (g.gw / g.e), 14 + g.gw / g.e - 2 / g.e), h.a.cache),
  ].join('\n');
  const halo = (pts, ep) => h.path(I.ser(I.lisse(pts.map(p => [p[0], p[1]])), p => p), HALO(ep));

  const noeud = etape => z => {
    const g = gN(z);
    const { e, T, ytop } = g;
    const ep = E * e;
    const U = mailleU(ytop, etape === 4).map(T);
    const out = [];
    let fil, aig = null, fl = null;
    if (etape === 1) {
      fil = [...base, [33, -62, 1], [40, -66, 1]];
      aig = { t: [40, -66], deg: -30, L: 72 };
      fl = [[58, -52], [96, -74]];
    } else if (etape === 2) {
      fil = [...base, [40, -61, 1], [48, -72, 0.5], [46, -81, -1], [40, -84, -1]];
      aig = { t: [40, -84], deg: 180, L: 92, derriere: true };
      fl = [[16, -99], [-34, -99]];
    } else if (etape === 3) {
      fil = [...base, ...tour, ...retour, [22, -3, 1], [34, -4, 1]];
      aig = { t: [34, -4], deg: -4, L: 72 };
      fl = [[62, -22], [104, -25]];
    } else {
      // le même chemin qu'en 3, refermé autour du fond de la maille : les croisements ne changent pas
      fil = [...base, ...tour, ...retour].map(ferme).concat([[20, -6, 1], [31, -15, 1]]);
      aig = { t: [31, -15], deg: -38, L: 72 };
      fl = [[70, -26], [100, -50]];
    }
    const Fp = fil.map(T);
    let aiguille = aig ? String(aiguilleTalon(...g.V(...aig.t), aig.deg, aig.L * e)) : '';
    // la charte : l'aiguille qui passe derrière les deux brins recule, en gris loin
    if (aig && aig.derriere) aiguille = aiguille.split('fill="#FFFFFF"').join('fill="#E6E6E6"');
    if (aig && aig.derriere) out.push(aiguille, halo(U, ep + 5));
    // la charte (redessin du 14 octobre 2026) : la maille déjà faite en gris loin, le fil qu'on noue
    // en blanc. Chaque fond de ruban va au brin dont il longe l'axe.
    const cd = String(F.cordes([
      { pts: U, ep, debut: 'ouvert', fin: 'ouvert' },
      { pts: Fp, ep, debut: 'ouvert', fin: 'ouvert' },
    ]));
    const axe = pts => { const q = []; for (let i = 0; i + 1 < pts.length; i++) for (let s = 0; s < 1; s += 0.1) q.push([pts[i][0] + (pts[i + 1][0] - pts[i][0]) * s, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * s]); return q; };
    const aU = axe(U), aF = axe(Fp);
    const dist = (p, q) => Math.min(...q.map(c => Math.hypot(c[0] - p[0], c[1] - p[1])));
    out.push(cd.replace(/<path d="([^"]*)" fill="#FFFFFF" stroke="none"\/>/g, (m, d) => {
      const pts = (d.match(/-?[\d.]+ -?[\d.]+/g) || []).map(s => s.split(' ').map(Number));
      const mU = pts.reduce((s, p) => s + dist(p, aU), 0) / pts.length, mF = pts.reduce((s, p) => s + dist(p, aF), 0) / pts.length;
      return mU < mF ? m.replace('fill="#FFFFFF"', 'fill="#E6E6E6"') : m;
    }));
    out.push(moule(z, g));
    if (aig && !aig.derriere) out.push(aiguille);
    // la charte : le geste de l'aiguille en rouge ; en 3, le point qui casse sur un raté (sous son
    // propre fil, sinon pas de nœud)
    if (fl) out.push(h.geste(`M ${P(...g.V(...fl[0]))} L ${P(...g.V(...fl[1]))}`));
    if (etape === 3) out.push(h.controle(...g.V(-3, -24), 13));
    return out.join('\n');
  };
  const noeudR = etape => z => {
    const g = gN(z);
    const V = g.V;
    if (etape === 1) return [
      { n: 8, rond: [16, g.yg - 18], cible: [...V(-25.5, 24)], texte: 'remonte de derrière le moule' },
      { n: 9, rond: [16, V(0, -40)[1]], cible: [...V(-14, -11)], texte: 'dans la maille, par derrière' },
      { n: 10, rond: [V(62, 0)[0], V(0, 2)[1]], cible: [...V(3, 6)], texte: 'fond de maille sur le moule' },
    ];
    if (etape === 2) return [
      { n: 11, rond: [16, V(0, -58)[1]], cible: [...V(-40, -84)], texte: 'derrière les deux brins' },
    ];
    if (etape === 3) return [
      { n: 12, rond: [16, V(0, -30)[1]], cible: [...V(-44, -54)], texte: 'revient devant le brin gauche' },
      { n: 13, rond: [16, V(0, 2)[1]], cible: [...V(-3, -24)], texte: 'sous son propre fil' },
    ];
    return [
      { n: 14, rond: [16, V(0, -40)[1]], cible: [...V(-16, -28)], texte: 'se ferme sur le moule' },
    ];
  };

  return {
    ref: '60-10a',
    fichier: 'planche-60-10a-aiguille-moule-noeud.svg',
    titre: 'L’aiguille, le moule et le nœud de maille',
    desc: 'L’aiguille à filet vue de face, sur la tranche et chargée : lame plate taillée dans un bardeau de cèdre, fourche au ' +
      'talon, langue au milieu. Un tour de fil autour de la langue et par la fourche. Le moule, latte rabotée à la largeur de ' +
      'maille, de face et en coupe. Le nœud de maille en quatre temps : le fil remonte de derrière le moule et entre dans la ' +
      'maille par derrière ; l’aiguille passe derrière les deux brins, de droite à gauche ; elle revient devant le brin gauche et ' +
      'sort sous son propre fil, dans la boucle ; on serre, le nœud assis sur le bord du moule.',
    format: 'pleine',
    disposition: [['aiguille', 'charger'], ['n1', 'n2'], ['n3', 'n4']],
    hauteurs: [1.25, 2, 2],
    largeurs: [[1.1, 1], [1, 1], [1, 1]],
    vues: {
      aiguille: { titre: 'L’aiguille : de face, sur la tranche, chargée', dessin: vueAiguille, renvois: vueAiguilleR },
      charger: { titre: 'Charger : un tour, puis l’autre face', dessin: vueCharger, renvois: vueChargerR },
      n1: { titre: '1. Entrer dans la maille', dessin: noeud(1), renvois: noeudR(1) },
      n2: { titre: '2. Derrière les deux brins', dessin: noeud(2), renvois: noeudR(2) },
      n3: { titre: '3. Sortir dans la boucle', dessin: noeud(3), renvois: noeudR(3) },
      n4: { titre: '4. Serrer sur le moule', dessin: noeud(4), renvois: noeudR(4) },
    },
  };
};
