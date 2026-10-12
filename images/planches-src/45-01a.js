// 45-01a — L’arc tiré d’une bille fendue (chapitre 45, §9 : fendre, le dos, la forme, les encoches)
// Seules cotes : celles du chapitre, en mm : 1200 à 1800 de long, 38 × 25 au centre.
// La bille est en vue orthogonale de trois quarts, d’un peu au-dessus, pour qu’on voie le dessus :
// la fente, ouverte en V autour de chaque coin enfoncé.
// Le demi-arc est aux vraies proportions (1 mm = S px), vue de côté et vue du dos à la même
// échelle, coupé de deux traits de brisure ; les trois coupes sont à une échelle plus grande, la
// même pour les trois ; le bout de l’arc, à une troisième. Ailleurs qu’au centre, épaisseurs et
// largeurs sont des proportions (« à peine plus mince et plus étroit vers les bouts ») : aucune
// n’est cotée.

const r1 = v => Math.round(v * 10) / 10;
const arc = (cx, cy, r, a0, a1, n = 60) =>
  Array.from({ length: n + 1 }, (_, i) => { const a = a0 + (a1 - a0) * i / n; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
const P = p => `${r1(p[0])} ${r1(p[1])}`;
// S de brisure de a à b : les deux points de contrôle, pour tracer le même S dans les deux sens
const sCtl = (a, b, amp) => {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
  return [[a[0] + dx / 3 + nx * amp, a[1] + dy / 3 + ny * amp], [a[0] + 2 * dx / 3 - nx * amp, a[1] + 2 * dy / 3 - ny * amp]];
};
const sAller = (a, b, amp) => { const [c1, c2] = sCtl(a, b, amp); return `C${P(c1)} ${P(c2)} ${P(b)}`; };
const sRetour = (a, b, amp) => { const [c1, c2] = sCtl(a, b, amp); return `C${P(c2)} ${P(c1)} ${P(a)}`; };   // de b vers a

// ── l’arc, en mm, depuis l’axe de la poignée (u = 0) jusqu’au bout (u = 750, un arc de 1500) ──
const BOUT = 750, ENC = 725;
const epA = u => u <= 50 ? 25                                                   // la poignée, pleine
  : u <= 110 ? 25 - 5 * (1 - Math.cos(Math.PI * (u - 50) / 60)) / 2             // la transition
  : 20 - 6 * (u - 110) / (BOUT - 110);                                          // le ventre du bras
const laA = u => u <= 50 ? 38 : 38 - 7 * (u - 50) / (BOUT - 50);
const U_B = 430, U_C = 695;

// ── la bille, de trois quarts, vue d’un peu au-dessus ──
// X le long de la bille (elle s’éloigne vers la droite), Y en travers, Z vers le haut ; rayon 1.
// Vue orthogonale : tournée de PSI autour de la verticale, puis penchée de THE vers le bas.
const PSI = 50 * Math.PI / 180, THE = 30 * Math.PI / 180;
const proj0 = (X, Y, Z) => {
  const Xp = X * Math.cos(PSI) - Y * Math.sin(PSI), Yp = X * Math.sin(PSI) + Y * Math.cos(PSI);
  return [Xp, -(Z * Math.cos(THE) + Yp * Math.sin(THE))];
};
const PHI_SIL = Math.atan2(Math.cos(PSI) * Math.cos(THE), Math.sin(THE));   // génératrice de silhouette, en haut
const LG = 3.4;                                    // longueur montrée, en rayons
const COIN = { e: 0.5, w1: 0.07, wh: 0.34, hw: 0.7, dS: 0.32 };   // le coin, en rayons
COIN.ws = COIN.w1 + (COIN.wh - COIN.w1) * COIN.dS / COIN.hw;      // sa largeur à fleur de bois
const COINS = [0.24, 0.6].map(t => t * LG);        // départ de chaque coin le long de la fente
const S_FIN = 0.93 * LG;
// demi-ouverture de la fente (en rayons) : en V autour de chaque coin
const ouv = s => {
  let w = 0.018;
  for (const sc of COINS) {
    let v;
    if (s >= sc && s <= sc + COIN.e) v = COIN.ws / 2;
    else if (s < sc) v = COIN.ws / 2 * Math.max(0, 1 - (sc - s) / 1.2);
    else v = COIN.ws / 2 * Math.max(0, 1 - (s - sc - COIN.e) / 0.9);
    w = Math.max(w, v);
  }
  return w;
};
const repBille = z => {
  // l’encombrement à rayon 1 : le bout, le bout brisé, la tête des coins
  const pts = [];
  for (let a = 0; a < 360; a += 5) {
    const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180);
    pts.push(proj0(0, c, s), proj0(LG, c, s));
  }
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const bx0 = Math.min(...xs), bx1 = Math.max(...xs), by0 = Math.min(...ys), by1 = Math.max(...ys);
  const R = Math.min((z.l - 30) / (bx1 - bx0), (z.h - 20) / (by1 - by0));
  const ox = 14 - bx0 * R, oy = 10 - by0 * R;
  const p = (X, Y, Z) => { const q = proj0(X, Y, Z); return [ox + q[0] * R, oy + q[1] * R]; };
  return { R, p, ox, oy };
};

// ── le quart, en bout ──
const repQuart = z => {
  const Rq = Math.min(z.h - 49, (z.l - 64) / Math.SQRT2);
  const H = [z.l / 2 + 12, 30 + Rq];
  const u = Rq / 9;                              // unité de dessin
  const ec = 0.45 * u, mol = 0.2 * u;           // écorce, couche molle
  const rb = Rq - ec - mol;                      // le dos suit ce cerne
  const hw = 1.9 * u, ep = 2.5 * u;              // demi-largeur, épaisseur (38 × 25)
  const yV = H[1] - rb + ep;                     // le ventre, plat
  const yCoin = H[1] - Math.sqrt(rb * rb - hw * hw);
  return { Rq, H, u, ec, rb, hw, ep, yV, yCoin };
};

// ── le demi-arc ──
const S = 0.85;                                    // px par mm
const PIECES = [[0, 150], [370, 490], [670, BOUT]];
const BRIS = 12;                                   // l’écart entre deux lèvres de brisure
const repArc = z => {
  const AX = 16;
  const X = u => {
    let x = AX;
    for (const [a, b] of PIECES) { if (u <= b) return x + (Math.max(u, a) - a) * S; x += (b - a) * S + BRIS; }
    return x;
  };
  const YB = 22;                                   // le dos, vue de côté
  const yc = 84;                                   // l’axe, vue du dos
  const SS = 1.5;                                  // échelle des coupes
  const secs = [
    { l: 'A', u: 0, cx: 420 },
    { l: 'B', u: U_B, cx: 500 },
    { l: 'C', u: U_C, cx: 572 },
  ];
  const ySec = 26;                                 // le dos des coupes
  return { AX, X, YB, yc, SS, secs, ySec };
};

// ── le bout de l’arc, en grand ──
const K = 2.0;                                     // px par mm
const repBout = z => {
  const XT = 320, u0 = 600;                        // le bout ; le bois montré commence à u0
  const xu = u => XT - (BOUT - u) * K;
  const YS = 17;                                   // le dos, vue de côté
  const yB = 111;                                  // l’axe, vue du dos
  const ev = u => YS + epA(u) * K;                 // le ventre, vue de côté
  const hB = u => laA(u) / 2 * K;                  // demi-largeur, vue du dos
  const d1 = 25, pente = 0.7;                      // l’entaille : à 25 du bout au dos, en biais vers la poignée
  const gHaut = XT - d1 * K;                       // milieu de l’entaille au dos
  const gBas = gHaut - epA(ENC) * pente * K;       // milieu de l’entaille au ventre
  const gL = 8;                                    // demi-largeur de l’entaille, mesurée à l’horizontale (elle est en biais)
  const cordeEp = 4 * K;                           // la corde
  const xF0 = 400, xF1 = 590;                      // la fente à ne pas faire
  return { XT, u0, xu, YS, yB, ev, hB, gHaut, gBas, gL, cordeEp, xF0, xF1 };
};

module.exports = (h) => {
  const BL = h.a.arete.replace('fill="none"', 'fill="#FFFFFF"');
  const BLC = h.a.contour.replace('fill="none"', 'fill="#FFFFFF"');
  const AXE = h.a.fin.replace('stroke-linecap="round"', 'stroke-linecap="butt" stroke-dasharray="14 3 2 3"');
  const BLANC = 'fill="#FFFFFF" stroke="none"';

  // une pièce de bois entre u = a et u = b : haut(u), bas(u) ; bouts : 'axe', 'bris' ou 'bout'
  const piece = (xOf, a, b, haut, bas, gauche, droite, encoches = null) => {
    const n = Math.max(8, Math.round((xOf(b) - xOf(a)) / 2));
    const us = Array.from({ length: n + 1 }, (_, i) => a + (b - a) * i / n);
    let H = us.map(u => [xOf(u), haut(u)]), B = us.map(u => [xOf(u), bas(u)]);
    if (encoches) { H = encoches(H, -1); B = encoches(B, 1); }
    const hg = H[0], bg = B[0], hd = H[H.length - 1], bd = B[B.length - 1];
    const o = [];
    let d = `M${P(hg)} ` + H.slice(1).map(p => `L${P(p)}`).join(' ');
    d += droite === 'bris' ? ` ${sAller(hd, bd, 3)}` : ` L${P(bd)}`;
    d += ' ' + B.slice(0, -1).reverse().map(p => `L${P(p)}`).join(' ');
    d += gauche === 'bris' ? ` ${sRetour(hg, bg, 3)}` : ` L${P(hg)}`;
    o.push(h.path(d + ' Z', BLANC));
    o.push(h.chemin(H, h.a.contour), h.chemin(B, h.a.contour));
    if (droite === 'bris') o.push(h.path(`M${P(hd)} ${sAller(hd, bd, 3)}`, h.a.arete));
    if (droite === 'bout') o.push(h.ligne(...hd, ...bd, h.a.contour));
    if (gauche === 'bris') o.push(h.path(`M${P(hg)} ${sAller(hg, bg, 3)}`, h.a.arete));
    return o.join('\n');
  };

  return {
    ref: '45-01a',
    titre: 'L’arc tiré d’une bille fendue',
    desc: 'Première page de l’arc de bille. En haut à gauche, une bille de mélèze vue de trois quarts, d’un peu au-dessus : la fente ouverte par le centre, deux coins enfoncés dans la fente sur le dessus, la fente ouverte en V autour de chacun, et en tireté la seconde fente qui ouvrira chaque moitié par son centre ; les fentes de l’écorce courent droit le long du tronc. En haut à droite, le quart gardé vu en bout : le cœur à la pointe, les cernes, l’écorce ; dedans, la section de l’arc au centre, 38 mm de large sur 25 mm d’épais, cotées hors du quart (38 au-dessus, 25 à gauche), le dos suivant le premier cerne sous l’écorce et le ventre plat tourné vers le cœur. Au milieu, la moitié de l’arc, de l’axe de la poignée jusqu’au bout, aux vraies proportions et coupée de deux traits de brisure : de côté (le dos droit, la poignée droite à pleine épaisseur, une transition douce, puis le ventre du bras qui s’amincit jusqu’au bout) et, dessous, vu du dos, à la même échelle, reliés par des traits de rappel aux limites de la poignée, au début du bras, à l’encoche et au bout ; la longueur de l’arc entier, 1200 à 1800 mm (4 à 6 pi), cotée jusqu’à l’axe de symétrie. À droite, trois coupes à la même échelle : A-A au centre de la poignée, 38 × 25 mm, le dos arrondi en suivant le cerne ; B-B au milieu du bras et C-C près du bout, plus minces et à peine plus étroites. En bas, le bout de l’arc en grand, de côté au-dessus et vu du dos dessous, alignés : l’entaille en biais qui descend du dos vers le ventre en direction de la poignée, sur chaque côté, et la boucle de la corde assise dans les deux entailles, passée sur le dos, la corde partant sous le ventre vers la poignée ; à droite, barrée, la fente dans l’axe du bois, qui s’ouvre et remonte le fil. Encadré danger : le dos ne se touche jamais, une fibre coupée sur le dos est l’endroit où l’arc cassera.',
    format: 'pleine',
    disposition: [['bille', 'quart'], ['arc'], ['encoche']],
    hauteurs: [201, 154, 168],
    largeurs: [[4, 3], [1], [1]],
    danger: 'Danger — le dos ne se touche jamais. Une fibre coupée sur le dos est l’endroit exact où l’arc cassera, au premier bandage. La scie coupe le fil, la fente le suit : on fend la bille, on ne la scie pas.',
    vues: {
      bille: {
        titre: 'Ouvrir la bille aux coins',
        dessin: z => {
          const { R, p } = repBille(z);
          const o = [];
          const cs = Math.cos(PHI_SIL), sn = Math.sin(PHI_SIL);
          const ell = k => { const q = []; for (let a = 0; a <= 360; a += 4) q.push(p(0, k * Math.cos(a * Math.PI / 180), k * Math.sin(a * Math.PI / 180))); return q; };
          // la surface de la bille, brisée au bout
          const A = p(0, cs, sn), B = p(LG, cs, sn), Cc = p(LG, -cs, -sn), Dd = p(0, -cs, -sn);
          o.push(h.path(`M${P(A)} L${P(B)} ${sAller(B, Cc, 7)} L${P(Dd)} Z`, BL));
          o.push(h.ligne(...A, ...B, h.a.contour), h.ligne(...Dd, ...Cc, h.a.contour));
          // fentes de l’écorce : droites le long du tronc, le fil est droit
          for (const deg of [60, 72, 110, 128, 148, 170, 194, 214]) {
            const a = deg * Math.PI / 180;
            o.push(h.ligne(...p(0.02, Math.cos(a), Math.sin(a)), ...p(0.9 * LG, Math.cos(a), Math.sin(a)), h.a.fin));
          }
          // la fente sur le dessus, ouverte en V autour de chaque coin
          const nS = 120, g = [], d = [];
          for (let i = 0; i <= nS; i++) { const s = S_FIN * i / nS, w = ouv(s); g.push(p(s, w, 1)); d.push(p(s, -w, 1)); }
          o.push(h.chemin([...g, ...d.reverse()], h.a.plein, true));
          // le bout : cernes, écorce, cœur
          o.push(h.chemin(ell(1), BLC, true));
          for (const k of [0.2, 0.4, 0.6, 0.78]) o.push(h.chemin(ell(k), h.a.detail, true));
          o.push(h.chemin(ell(0.91), h.a.arete, true));
          let dE = '';
          for (let a = 0; a < 360; a += 11) {
            const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180);
            dE += `M${P(p(0, 0.91 * c, 0.91 * s))} L${P(p(0, c, s))} `;
          }
          o.push(h.path(dE, h.a.fin));
          o.push(h.cercle(...p(0, 0, 0), 2, h.a.plein));
          // première fente, par le centre : ouverte au bout, jusque sous le cœur
          const w0 = ouv(0);
          o.push(h.chemin([p(0, w0, 1), p(0, -w0, 1), p(0, 0, -0.5)], h.a.plein, true));
          // la seconde : chaque moitié par son centre
          o.push(h.ligne(...p(0, 0.97, 0), ...p(0, -0.97, 0), h.a.cache));
          // deux coins enfoncés dans la fente : seule la tête dépasse, la fente s’ouvre autour
          const { e, wh, hw, dS, ws } = COIN, Zt = 1 - dS + hw;
          for (const sc of COINS) {
            const F = [p(sc, -ws / 2, 1), p(sc, ws / 2, 1), p(sc, wh / 2, Zt), p(sc, -wh / 2, Zt)];
            const K2 = [p(sc + e, -ws / 2, 1), p(sc + e, ws / 2, 1), p(sc + e, wh / 2, Zt), p(sc + e, -wh / 2, Zt)];
            o.push(h.chemin([F[0], F[3], K2[3], K2[0]], BL, true), h.chemin([F[3], F[2], K2[2], K2[3]], BL, true), h.chemin(F, BL, true));
          }
          return o.join('\n');
        },
        renvois: z => {
          const { R, p } = repBille(z);
          const { dS, hw } = COIN;
          const c = p(COINS[0], 0, 1 + 0.55 * (hw - dS)), O = p(0, 0, 0);
          return [
            { n: 1, rond: [r1(c[0] - 0.95 * R), r1(c[1] - 0.2 * R)], cible: [r1(c[0]), r1(c[1])], texte: 'coins chassés dans la fente' },
            { n: 2, rond: [r1(O[0] + 1.0 * R), r1(O[1] + 0.75 * R)], cible: p(0, 0, 0.3).map(r1), texte: 'd’abord par le centre' },
            { n: 3, rond: [r1(O[0] + 1.75 * R), r1(O[1] + 0.5 * R)], cible: p(0, -0.75, 0).map(r1), texte: 'puis chaque moitié par son centre' },
          ];
        },
      },

      quart: {
        titre: 'Le quart gardé, vu en bout',
        dessin: z => {
          const { Rq, H, ec, rb, hw, ep, yV, yCoin } = repQuart(z);
          const o = [];
          const a0 = -3 * Math.PI / 4, a1 = -Math.PI / 4;
          o.push(h.chemin([H, ...arc(H[0], H[1], Rq, a0, a1), H], BLC, true));
          for (const k of [0.13, 0.26, 0.39, 0.52, 0.64, 0.76]) o.push(h.chemin(arc(H[0], H[1], k * Rq, a0, a1), h.a.detail));
          o.push(h.chemin(arc(H[0], H[1], Rq - ec, a0, a1), h.a.arete));
          let dE = '';
          for (let a = a0 + 0.035; a < a1; a += 0.07)
            dE += `M${r1(H[0] + (Rq - ec) * Math.cos(a))} ${r1(H[1] + (Rq - ec) * Math.sin(a))} L${r1(H[0] + Rq * Math.cos(a))} ${r1(H[1] + Rq * Math.sin(a))} `;
          o.push(h.path(dE, h.a.fin));
          o.push(h.chemin(arc(H[0], H[1], rb, a0, a1), h.a.fin));
          o.push(h.cercle(H[0], H[1], 2.2, h.a.plein));
          // la section de l’arc : le dos sur le cerne sous l’écorce, le ventre plat vers le cœur
          const da = Math.asin(hw / rb);
          const dos = arc(H[0], H[1], rb, -Math.PI / 2 - da, -Math.PI / 2 + da, 24);
          const sec = [...dos, [H[0] + hw, yV], [H[0] - hw, yV]];
          o.push(h.chemin(sec, BL, true));
          // les cernes traversent la section
          for (const k of [0.76, 0.86]) {
            const r = k * Rq; if (r > rb || r < rb - ep) continue;
            const pts = arc(H[0], H[1], r, -Math.PI / 2 - Math.asin(hw / r), -Math.PI / 2 + Math.asin(hw / r), 24).filter(p => p[1] < yV);
            o.push(h.chemin(pts, h.a.detail));
          }
          o.push(h.chemin(sec, h.a.contour, true));
          // les cotes, hors du quart : 38 au-dessus de l’écorce, 25 à gauche du quart
          const yC38 = H[1] - Rq - 12;
          o.push(h.ligne(H[0] - hw, yCoin - 3, H[0] - hw, yC38 - 4, h.a.fin), h.ligne(H[0] + hw, yCoin - 3, H[0] + hw, yC38 - 4, h.a.fin));
          o.push(h.cote(H[0] - hw, yC38, H[0] + hw, yC38, '38', { cote: 'dessus' }));
          const yDos = H[1] - rb, xC25 = H[0] - 0.707 * Rq - 11;
          o.push(h.ligne(H[0] - 4, yDos, xC25 - 4, yDos, h.a.fin), h.ligne(H[0] - hw - 3, yV, xC25 - 4, yV, h.a.fin));
          o.push(h.cote(xC25, yDos, xC25, yV, '25', { cote: 'gauche' }));
          return o.join('\n');
        },
        renvois: z => {
          const { Rq, H, rb, hw, yV } = repQuart(z);
          const aE = -Math.PI / 2 + 0.35;
          return [
            { n: 4, rond: [z.l - 13, 44], cible: [r1(H[0] + hw - 6), r1(H[1] - Math.sqrt(rb * rb - (hw - 6) ** 2) + 1)], texte: 'le dos : sous l’écorce, jamais touché' },
            { n: 5, rond: [z.l - 16, 16], cible: [r1(H[0] + (Rq - 3.5) * Math.cos(aE)), r1(H[1] + (Rq - 3.5) * Math.sin(aE))], texte: 'écorce et couche molle, au racloir' },
            { n: 6, rond: [22, r1(yV + 32)], cible: [r1(H[0] - hw * 0.4), r1(yV)], texte: 'le ventre, côté cœur : on y gratte' },
            { n: 7, rond: [z.l - 22, r1(H[1] - 14)], cible: [r1(H[0] + 1), r1(H[1] - 5)], texte: 'cœur et premiers cernes, enlevés' },
          ];
        },
      },

      arc: {
        titre: 'La moitié de l’arc, de la poignée au bout : de côté, vu du dos, et en coupe',
        dessin: z => {
          const { AX, X, YB, yc, SS, secs, ySec } = repArc(z);
          const o = [];
          const ventre = u => YB + epA(u) * S;
          const bordH = u => yc - laA(u) / 2 * S, bordB = u => yc + laA(u) / 2 * S;
          // l’encoche, vue du dos : un V sur chaque bord
          const encDos = (pts, sg) => {
            const xe = X(ENC), dx = 3 * S, prof = 4 * S;
            const out = [];
            for (const p of pts) {
              if (Math.abs(p[0] - xe) < dx) continue;
              if (out.length && out[out.length - 1][0] < xe - dx && p[0] > xe + dx)
                out.push([xe - dx, p[1]], [xe - 0.8, p[1] - sg * prof], [xe + 0.8, p[1] - sg * prof], [xe + dx, p[1]]);
              out.push(p);
            }
            return out;
          };
          PIECES.forEach(([a, b], i) => {
            const g = i === 0 ? 'axe' : 'bris', d = b === BOUT ? 'bout' : 'bris';
            // de côté : le dos droit en haut, le ventre dessous
            o.push(piece(X, a, b, () => YB, ventre, g, d));
            // vu du dos : la largeur, les encoches
            o.push(piece(X, a, b, bordH, bordB, g, d, b === BOUT ? encDos : null));
            // le fil, droit
            const i0 = a + (i === 0 ? 3 : 7) / S, i1 = b === BOUT ? ENC - 9 : b - 7 / S;
            for (const k of [-0.27, 0, 0.27]) {
              const us = Array.from({ length: 21 }, (_, j) => i0 + (i1 - i0) * j / 20);
              o.push(h.chemin(us.map(u => [X(u), yc + k * laA(u) * S]), h.a.fin));
            }
          });
          // l’entaille, de côté : en biais du dos vers le ventre, vers la poignée
          const xe = X(ENC), glis = epA(ENC) * 0.7 * S;
          for (const dx of [-2.5, 2.5]) o.push(h.ligne(xe + dx, YB, xe + dx - glis, ventre(ENC), h.a.arete));
          // l’axe de symétrie, au milieu de la poignée
          o.push(h.ligne(AX, YB - 16, AX, bordB(0) + 22, AXE));
          // les traits de rappel : poignée, début du bras, encoche, bout
          for (const u of [50, 110, ENC, BOUT]) o.push(h.ligne(X(u), ventre(u) + 3, X(u), bordH(u) - 3, h.a.fin));
          // les plans de coupe
          for (const s of secs) {
            const x = X(s.u);
            o.push(h.ligne(x, YB - 13, x, YB - 4, h.a.contour), h.ligne(x, ventre(s.u) + 4, x, ventre(s.u) + 13, h.a.contour));
            o.push(h.texte(x + 9, YB - 5, s.l), h.texte(x + 9, ventre(s.u) + 13, s.l));
          }
          // la longueur de l’arc entier, cotée jusqu’à l’axe de symétrie
          const yCo = bordB(0) + 14, xb = X(BOUT);
          o.push(h.ligne(xb, bordB(BOUT) + 3, xb, yCo + 5, h.a.fin));
          o.push(h.ligne(xb, yCo, AX - 10, yCo, h.a.detail), h.ligne(xb, yCo - 6, xb, yCo + 6, h.a.detail));
          o.push(h.texte((xb + AX) / 2 + 10, yCo + 15, '1200 à 1800 (4 à 6 pi)'));
          // les trois coupes, à la même échelle entre elles : le dos sur le cerne, le ventre plat
          const Rc = 83.4;                               // le cerne du dos, en mm (celui du quart)
          for (const s of secs) {
            const hwm = laA(s.u) / 2, T = epA(s.u);
            const fl = m => (Rc - Math.sqrt(Rc * Rc - m * m)) * SS;
            const dos = Array.from({ length: 25 }, (_, j) => { const m = -hwm + 2 * hwm * j / 24; return [s.cx + m * SS, ySec + fl(m)]; });
            const sec = [...dos, [s.cx + hwm * SS, ySec + T * SS], [s.cx - hwm * SS, ySec + T * SS]];
            o.push(h.chemin(sec, h.a.hachure('bois', 'aucun'), true), h.chemin(sec, h.a.contour, true));
            o.push(h.texte(s.cx, ySec - 10, `${s.l}-${s.l}`));
            if (s.u === 0) {
              const xg = s.cx - hwm * SS, yv = ySec + T * SS;
              o.push(h.ligne(xg, yv + 3, xg, yv + 16, h.a.fin), h.ligne(s.cx + hwm * SS, yv + 3, s.cx + hwm * SS, yv + 16, h.a.fin));
              o.push(h.cote(xg, yv + 12, s.cx + hwm * SS, yv + 12, '38', { cote: 'dessous' }));
              o.push(h.ligne(s.cx - 3, ySec, xg - 14, ySec, h.a.fin), h.ligne(xg - 3, yv, xg - 14, yv, h.a.fin));
              o.push(h.cote(xg - 10, ySec, xg - 10, yv, '25', { cote: 'gauche' }));
            }
          }
          return o.join('\n');
        },
        renvois: z => {
          const { X, YB, yc } = repArc(z);
          const ventre = u => YB + epA(u) * S;
          return [
            { n: 8, rond: [42, 64], cible: [34, r1(ventre(20) - 1)], texte: 'la poignée reste pleine' },
            { n: 9, rond: [r1(X(U_B) + 34), 62], cible: [r1(X(U_B) + 16), r1(ventre(U_B + 16 / S))], texte: 'le ventre des bras, aminci' },
            { n: 10, rond: [r1(X(150) - 10), 52], cible: [r1(X(120)), r1(yc - 0.27 * laA(120) * S)], texte: 'le fil droit d’un bout à l’autre' },
          ];
        },
      },

      encoche: {
        titre: 'Le bout de l’arc : l’encoche de côté et vue du dos, et la fente à ne pas faire',
        dessin: z => {
          const { XT, u0, xu, YS, yB, ev, hB, gHaut, gBas, gL, cordeEp, xF0, xF1 } = repBout(z);
          const o = [];
          const x2u = x => BOUT - (XT - x) / K;
          // ── de côté ──
          o.push(piece(xu, u0, BOUT, () => YS, ev, 'bris', 'bout'));
          // l’entaille : deux bords en biais, du dos vers le ventre, vers la poignée
          const yVg = ev(x2u(gBas));
          o.push(h.chemin([[gHaut - gL, YS - 0.6], [gHaut + gL, YS - 0.6], [gBas + gL, yVg + 0.6], [gBas - gL, yVg + 0.6]], h.a.plein, true));
          for (const s of [-1, 1]) o.push(h.ligne(gHaut + s * gL, YS, gBas + s * gL, yVg, h.a.arete));
          // la corde : passée sur le dos (le bout rond), assise dans l’entaille, puis partie sous le ventre
          const pente = (gHaut - gBas) / (yVg - YS);
          const cap = [gHaut + pente * cordeEp / 2, YS - cordeEp / 2];
          o.push(h.cercle(cap[0], cap[1], cordeEp / 2, BL));
          o.push(h.formes.corde([
            cap, [gHaut, YS + 2], [(gHaut + gBas) / 2, (YS + yVg) / 2], [gBas + 1.5, yVg - 2],
            [gBas - 7, yVg + 4], [gBas - 24, yVg + 8], [gBas - 70, yVg + 15], [gBas - 130, yVg + 24],
          ], { ep: cordeEp, torons: true, debut: 'ouvert', fin: 'fixe' }));
          // la ligature qui ferme la boucle
          const lig0 = gBas - 38, lig1 = gBas - 56;
          const yAt = x => yVg + 8 + (x - (gBas - 24)) / ((gBas - 70) - (gBas - 24)) * 7;
          const dl = [lig0, lig1].map(x => [x, yAt(x)]);
          const tg = [dl[1][0] - dl[0][0], dl[1][1] - dl[0][1]], lt = Math.hypot(...tg), nx = -tg[1] / lt, ny = tg[0] / lt, w = cordeEp / 2 + 1.2;
          const quad = [[dl[0][0] + nx * w, dl[0][1] + ny * w], [dl[1][0] + nx * w, dl[1][1] + ny * w], [dl[1][0] - nx * w, dl[1][1] - ny * w], [dl[0][0] - nx * w, dl[0][1] - ny * w]];
          o.push(h.chemin(quad, BL, true));
          for (let t = 0.12; t < 1; t += 0.19) {
            const cx = dl[0][0] + tg[0] * t, cy = dl[0][1] + tg[1] * t;
            o.push(h.ligne(cx + nx * w, cy + ny * w, cx - nx * w, cy - ny * w, h.a.detail));
          }
          // ── vu du dos ──
          const encV = (pts, sg) => {
            const out = [];
            for (const p of pts) {
              if (Math.abs(p[0] - gHaut) < 8) continue;
              if (out.length && out[out.length - 1][0] < gHaut - 8 && p[0] > gHaut + 8)
                out.push([gHaut - 8, p[1]], [gHaut - 4.2, p[1] - sg * 7], [gHaut + 4.2, p[1] - sg * 7], [gHaut + 8, p[1]]);
              out.push(p);
            }
            return out;
          };
          o.push(piece(xu, u0, BOUT, u => yB - hB(u), u => yB + hB(u), 'bris', 'bout', encV));
          for (const k of [-0.27, 0.27]) o.push(h.ligne(xu(u0) + 8, yB + k * 2 * hB(u0), gHaut - 14, yB + k * 2 * hB(ENC), h.a.fin));
          // sous le bois, en tireté : les deux brins de la boucle qui descendent les entailles et se rejoignent sous le ventre, puis la corde
          const hE = hB(ENC);
          for (const s of [-1, 1]) o.push(h.chemin([[gHaut - 4, yB + s * (hE - 5)], [gBas - 2, yB + s * (hE - 5)], [gBas - 20, yB]], h.a.cache));
          o.push(h.ligne(gBas - 20, yB, xu(u0) + 6, yB, h.a.cache));
          // la boucle passée sur le dos, d’une entaille à l’autre
          for (const sg of [-1, 1]) {
            const yE = yB + sg * hE;
            o.push(h.chemin([[gHaut - 8, yE], [gHaut - 4.2, yE - sg * 7], [gHaut + 4.2, yE - sg * 7], [gHaut + 8, yE]], h.a.plein, true));
          }
          o.push(h.formes.corde([[gHaut, yB - hE], [gHaut, yB], [gHaut, yB + hE]], { ep: cordeEp, torons: true, debut: 'ouvert', fin: 'ouvert' }));
          // les traits de rappel : l’entaille et le bout
          o.push(h.ligne(gHaut, ev(ENC) + 3, gHaut, yB - hE + 5, h.a.fin));
          o.push(h.ligne(XT, ev(BOUT) + 3, XT, yB - hB(BOUT) - 3, h.a.fin));
          // ── la fente dans l’axe, à ne pas faire ──
          const hF = hB(BOUT);
          o.push(h.path(`M${xF0} ${r1(yB - hF)} L${xF1} ${r1(yB - hF)} L${xF1} ${r1(yB + hF)} L${xF0} ${r1(yB + hF)} ${sRetour([xF0, yB - hF], [xF0, yB + hF], 3)} Z`, BLANC));
          o.push(h.ligne(xF0, yB - hF, xF1, yB - hF, h.a.contour), h.ligne(xF1, yB - hF, xF1, yB + hF, h.a.contour), h.ligne(xF0, yB + hF, xF1, yB + hF, h.a.contour));
          o.push(h.path(`M${xF0} ${r1(yB - hF)} ${sAller([xF0, yB - hF], [xF0, yB + hF], 3)}`, h.a.arete));
          for (const k of [-0.27, 0.27]) o.push(h.ligne(xF0 + 8, yB + k * 2 * hF, xF1 - 8, yB + k * 2 * hF, h.a.fin));
          o.push(h.rect(xF1 - 44, yB - 4, 44, 8, h.a.plein));
          o.push(h.chemin([[xF1 - 44, yB], [xF1 - 56, yB + 1.6], [xF1 - 70, yB - 1], [xF1 - 84, yB + 2], [xF1 - 98, yB - 0.6], [xF1 - 112, yB + 1.4]], h.a.arete));
          o.push(h.ligne(xF0 + 10, yB - hF - 5, xF1 - 4, yB + hF + 3, h.a.contour), h.ligne(xF0 + 10, yB + hF + 3, xF1 - 4, yB - hF - 5, h.a.contour));
          return o.join('\n');
        },
        renvois: z => {
          const { YS, ev, gHaut, gBas, gL, yB, xF1 } = repBout(z);
          const yVg = ev(BOUT - (320 - gBas) / K);
          const t = 0.5, gx = gHaut + gL + (gBas - gHaut) * t, gy = YS + (yVg - YS) * t;
          return [
            { n: 11, rond: [352, 30], cible: [r1(gx), r1(gy)], texte: 'entaille en biais, limée lisse' },
            { n: 12, rond: [r1(xF1 - 28), 58], cible: [r1(xF1 - 20), r1(yB)], texte: 'jamais une fente dans l’axe' },
          ];
        },
      },
    },
  };
};
