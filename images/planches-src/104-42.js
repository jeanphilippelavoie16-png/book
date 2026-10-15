// Planche 104-42 — Le serre-couture (chapitre 104, §9, « Les outils qu'on se fait », « Le serre-couture »).
// Ce que dit le chapitre : deux lattes de la longueur d'un bras, amincies au milieu pour qu'elles fassent
// ressort, liées ensemble au bas par une ligature de babiche et un coin de bois, tenues serrées entre les
// genoux ; l'ouvrage est pris dans les mâchoires du haut, les deux mains restent libres pour le point
// sellier à deux aiguilles (planche 104-02).
//
// Lecture du montage, faute de détail dans le chapitre : le coin est pris entre les pieds des deux lattes,
// gros bout en bas, et la ligature serre le paquet lattes-coin-lattes. Les lattes partent écartées du coin
// et se rejoignent aux mâchoires : c'est le montage de la pince de sellier (« stitching clam » : deux
// douelles réunies et tendues l'une contre l'autre à un bout, une pièce plus courte entre elles à
// l'autre ; tenue entre les genoux, ouverte à la main pour glisser l'ouvrage, elle se referme seule).
// Sources : sources/104-serre-couture.md. Aucune cote : le chapitre n'en donne aucune, sauf « la longueur
// d'un bras », qui reste en mots. Les proportions du dessin (lattes de 700 mm, 16 mm d'épaisseur aux
// bouts et 9 au milieu, coin de 110 mm) sont un dessin, pas une donnée.
//
// Trois vues : de côté (le serre-couture entier) ; le pied en gros (le coin, la ligature) ; en usage, de
// profil (assis, le pied au sol, serré entre les genoux, une main de chaque côté de l'ouvrage).
'use strict';

const f1 = v => Math.round(v * 10) / 10;
const RAD = Math.PI / 180;

module.exports = (h) => {
  const A = h.a, F = h.formes;

  // ─── Le serre-couture en mm, repère local : x vers la droite, y vers le haut depuis le sol ─────────
  const LONG = 700;           // la longueur d'un bras (dessin)
  const COIN = 110;           // la hauteur du coin
  const C_BAS = 38, C_HAUT = 26;   // l'épaisseur du coin, gros bout en bas
  const LIG = [18, 92];       // la ligature, du bas vers le haut
  const MAC = 70;             // la hauteur des mâchoires
  const CUIR = 6;             // deux épaisseurs de cuir prises dans les mâchoires
  // l'épaisseur d'une latte à la hauteur y : 16 aux bouts, 9 au milieu, raccords doux
  const ep = y => {
    const t = (a, b, v) => Math.max(0, Math.min(1, (v - a) / (b - a)));
    const lis = s => s * s * (3 - 2 * s);
    const m = lis(t(150, 240, y)) * (1 - lis(t(470, 560, y)));
    return 16 - 7 * m;
  };
  // la face intérieure d'une latte (demi-écart au centre) : collée au coin en bas, puis droite jusqu'aux
  // mâchoires, où il ne reste que le cuir entre les deux
  const demiEcart = y => {
    if (y <= COIN) return (C_BAS + (C_HAUT - C_BAS) * y / COIN) / 2;
    const y1 = LONG - MAC;
    if (y >= y1) return CUIR / 2;
    return C_HAUT / 2 + (CUIR / 2 - C_HAUT / 2) * (y - COIN) / (y1 - COIN);
  };
  // contours d'une latte (côté +1 à droite, −1 à gauche) : face intérieure et face extérieure
  const latte = (cote, y0 = 0, y1 = LONG, pas = 4) => {
    const int = [], ext = [];
    for (let y = y0; y <= y1 + 0.01; y += pas) {
      const d = demiEcart(y);
      int.push([cote * d, y]);
      ext.push([cote * (d + ep(y)), y]);
    }
    return { int, ext };
  };

  // ─── De côté : le serre-couture entier ─────────────────────────────────────────────────────────────
  const geoCote = z => {
    const s = (z.h - 30) / (LONG + 30);
    const X = z.l / 2, Y = z.h - 8;
    const P = ([x, y]) => [X + x * s, Y - y * s];
    return { s, X, Y, P };
  };
  const dessinCote = z => {
    const g = geoCote(z), { P, s } = g, out = [];
    // le sol
    out.push(h.ligne(6, g.Y, z.l - 6, g.Y, A.arete));
    // le cuir pris dans les mâchoires : deux épaisseurs qui dépassent du haut
    const cy0 = LONG - MAC + 8, cy1 = LONG + 50;
    out.push(h.chemin([P([-CUIR / 2, cy0]), P([-CUIR / 2, cy1]), P([CUIR / 2, cy1]), P([CUIR / 2, cy0])], A.blanc, true));
    out.push(h.chemin([P([-CUIR / 2, LONG]), P([-CUIR / 2, cy1]), P([CUIR / 2, cy1]), P([CUIR / 2, LONG])], A.arete));
    out.push(h.ligne(...P([0, LONG]), ...P([0, cy1]), A.detail));
    // le coin, entre les pieds
    const coin = [[-C_BAS / 2, 0], [-C_HAUT / 2, COIN], [C_HAUT / 2, COIN], [C_BAS / 2, 0]].map(P);
    out.push(h.chemin(coin, A.blanc, true), h.chemin(coin, A.arete, true));
    // les deux lattes
    for (const c of [-1, 1]) {
      const L = latte(c);
      const poly = L.int.concat(L.ext.slice().reverse()).map(P);
      out.push(h.chemin(poly, A.blanc, true), h.chemin(poly, A.contour, true));
    }
    // la ligature : des tours serrés autour du paquet
    const [l0, l1] = LIG, n = 9;
    for (let i = 0; i <= n; i++) {
      const y = l0 + (l1 - l0) * i / n, d = demiEcart(y) + ep(y);
      out.push(h.ligne(...P([-d - 1.5, y - 2]), ...P([d + 1.5, y + 2]), A.arete));
    }
    return out.join('\n');
  };

  // ─── Le pied, en gros ──────────────────────────────────────────────────────────────────────────────
  const geoPied = z => {
    const s = (z.l - 34) / 80;
    const X = z.l / 2, Y = z.h - 20;
    const P = ([x, y]) => [X + x * s, Y - y * s];
    return { s, X, Y, P, haut: Math.min(320, (z.h - 30) / s) };
  };
  const dessinPied = z => {
    const g = geoPied(z), { P, s } = g, out = [];
    out.push(h.ligne(4, g.Y, z.l - 4, g.Y, A.arete));
    // le coin : bois de fil, gros bout en bas, il dépasse un peu sous la ligature
    const coin = [[-C_BAS / 2, 0], [-C_HAUT / 2, COIN], [C_HAUT / 2, COIN], [C_BAS / 2, 0]].map(P);
    out.push(h.chemin(coin, A.blanc, true), h.chemin(coin, A.contour, true));
    [-5, 4].forEach(dx => out.push(h.path(`M${f1(P([dx, 6])[0])} ${f1(P([dx, 6])[1])} Q${f1(P([dx + 2, 55])[0])} ${f1(P([dx + 2, 55])[1])} ${f1(P([dx * 0.8, COIN - 6])[0])} ${f1(P([dx * 0.8, COIN - 6])[1])}`, A.detail)));
    // les lattes, coupées en haut par une cassure
    for (const c of [-1, 1]) {
      const L = latte(c, 0, g.haut, 2);
      const poly = L.int.concat(L.ext.slice().reverse()).map(P);
      out.push(h.chemin(poly, A.blanc, true));
      out.push(h.chemin(L.int.map(P), A.contour), h.chemin(L.ext.map(P), A.contour), h.ligne(...P(L.int[0]), ...P(L.ext[0]), A.contour));
      const a = P(L.int[L.int.length - 1]), b = P(L.ext[L.ext.length - 1]);
      const pts = [];
      for (let i = 0; i <= 12; i++) { const t = i / 12; pts.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t + Math.sin(t * 2 * Math.PI) * 2]); }
      out.push(h.chemin(pts, A.detail));
    }
    // la ligature de babiche : des tours jointifs, légèrement en biais, le bout de départ pris dessous
    const [l0, l1] = LIG, n = 11;
    const tours = [];
    for (let i = 0; i < n; i++) {
      const y = l0 + (l1 - l0) * (i + 0.5) / n, d = demiEcart(y) + ep(y) + 1.2, hb = (l1 - l0) / n;
      const q = [[-d, y - hb / 2 + 1.2], [d, y - hb / 2 + 2.6], [d, y + hb / 2 + 1.2], [-d, y + hb / 2 - 0.2]].map(P);
      tours.push(h.path(`M${f1(q[0][0])} ${f1(q[0][1])} L${f1(q[1][0])} ${f1(q[1][1])} Q${f1(q[1][0] + 3)} ${f1((q[1][1] + q[2][1]) / 2)} ${f1(q[2][0])} ${f1(q[2][1])} L${f1(q[3][0])} ${f1(q[3][1])} Q${f1(q[3][0] - 3)} ${f1((q[3][1] + q[0][1]) / 2)} ${f1(q[0][0])} ${f1(q[0][1])} Z`, `fill="#FFFFFF" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"`));
    }
    out.push(...tours);
    // le bout final passé sous les deux derniers tours
    const e = P([demiEcart(l1) + ep(l1) + 1, l1 - 2]);
    out.push(h.path(`M${f1(e[0])} ${f1(e[1])} Q${f1(e[0] + 16)} ${f1(e[1] - 6)} ${f1(e[0] + 22)} ${f1(e[1] - 22)}`, `fill="none" stroke="#1A1A1A" stroke-width="5" stroke-linecap="round"`));
    out.push(h.path(`M${f1(e[0])} ${f1(e[1])} Q${f1(e[0] + 16)} ${f1(e[1] - 6)} ${f1(e[0] + 22)} ${f1(e[1] - 22)}`, `fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"`));
    return out.join('\n');
  };

  // ─── En usage, de profil ───────────────────────────────────────────────────────────────────────────
  const poserBras = (o, cibles, axes) => {
    const oo = Object.assign({}, o, { cote: 'droite' });
    const c = F.corps(oo), ang = Object.assign({}, o.angles || {});
    const angDe = v => Math.atan2(v[0], v[1]) / RAD, dirDe = a => [Math.sin(a * RAD), Math.cos(a * RAD)];
    for (const k of ['P', 'L']) {
      const C = cibles[k]; if (!C) continue;
      const ax = axes[k];
      const S = c.articulations['epaule' + k], E_ = c.articulations['coude' + k], Wr = c.articulations['poignet' + k], Mn = c['main' + k];
      const lb = Math.hypot(E_[0] - S[0], E_[1] - S[1]), la = Math.hypot(Wr[0] - E_[0], Wr[1] - E_[1]);
      const hv = [Mn.x - Wr[0], Mn.y - Wr[1]], lm = Math.hypot(...hv);
      const off = angDe(hv) - angDe([Math.cos(Mn.axe * RAD), Math.sin(Mn.axe * RAD)]);
      const resoudre = main => {
        const h2 = dirDe(main + off).map(v => v * lm), W_ = [C[0] - h2[0], C[1] - h2[1]];
        const d = [W_[0] - S[0], W_[1] - S[1]], D = Math.min(Math.hypot(...d), lb + la - 0.01);
        const a0 = angDe(d), B = Math.acos(Math.max(-1, Math.min(1, (lb * lb + D * D - la * la) / (2 * lb * D)))) / RAD;
        const bras = a0 - B;
        const e = [S[0] + lb * Math.sin(bras * RAD), S[1] + lb * Math.cos(bras * RAD)];
        const ab = angDe([W_[0] - e[0], W_[1] - e[1]]);
        const pli = Math.abs(((main - ab) % 360 + 540) % 360 - 180);
        return { pli, bras, ab, main };
      };
      let best = null;
      for (const main of [180 - ax, -ax, 360 - ax]) { const r = resoudre(main); if (!best || r.pli < best.pli) best = r; }
      ang['bras' + k] = best.bras; ang['avantbras' + k] = best.ab; ang['main' + k] = best.main;
    }
    return ang;
  };

  const geoUsage = z => {
    const E = 0.3, sol = z.h - 10, x0 = z.l * 0.5;
    // assis bas (une bûche de 330 mm), les genoux plus hauts que les hanches, les pieds ramenés sous les genoux
    const base = { x: x0, y: sol, pose: 'assis', siege: 330, echelle: E, cote: 'droite', mains: { P: 'pince', L: 'pince' },
      angles: { tronc: 16, cou: 18, tete: 26, cuisseP: 72, cuisseL: 76, jambeP: -16, jambeL: -20 } };
    const c0 = F.corps(base);
    const K = c0.articulations.genouP;
    // le serre-couture : son pied au sol devant les pieds, penché vers le corps, il passe entre les genoux
    const incl = 16 * RAD, u = [-Math.sin(incl), -Math.cos(incl)];
    const Kp = [K[0] - 4, K[1] + 2];
    const Fp = [Kp[0] + (sol - Kp[1]) * Math.tan(incl), sol];
    const T = [Fp[0] + u[0] * LONG * E, Fp[1] + u[1] * LONG * E];
    // les mains de part et d'autre de l'ouvrage : la proche tire son aiguille vers l'avant, la loin vers l'arrière
    const cibles = { P: [T[0] + 30, T[1] - 4], L: [T[0] - 26, T[1] + 2] };
    const angles = poserBras(base, cibles, { P: 70, L: 80 });
    return { E, sol, base, K, u, Fp, T, cibles, angles: Object.assign({}, base.angles, angles), incl };
  };
  const dessinUsage = z => {
    const g = geoUsage(z), out = [];
    const { E, Fp, u, incl } = g;
    const n = [Math.cos(incl), -Math.sin(incl)];        // perpendiculaire à l'axe, vers l'avant
    const Q = ([x, y]) => [Fp[0] + u[0] * y * E + n[0] * x * E, Fp[1] + u[1] * y * E + n[1] * x * E];
    const serre = () => {
      const o = [];
      const cuir = [[-CUIR / 2, LONG - 20], [-CUIR / 2, LONG + 70], [CUIR / 2, LONG + 70], [CUIR / 2, LONG - 20]].map(Q);
      o.push(h.chemin(cuir, A.blanc, true), h.chemin(cuir, A.arete, true));
      // les deux fils du point sellier, du trou vers chaque main
      const trou = Q([0, LONG + 30]);
      o.push(h.ligne(trou[0], trou[1], g.cibles.L[0], g.cibles.L[1], A.detail));
      const coin = [[-C_BAS / 2, 0], [-C_HAUT / 2, COIN], [C_HAUT / 2, COIN], [C_BAS / 2, 0]].map(Q);
      o.push(h.chemin(coin, A.blanc, true), h.chemin(coin, A.arete, true));
      for (const c of [-1, 1]) {
        const L = latte(c, 0, LONG, 10);
        const poly = L.int.concat(L.ext.slice().reverse()).map(Q);
        o.push(h.chemin(poly, A.blanc, true), h.chemin(poly, A.arete, true));
      }
      for (let i = 0; i <= 3; i++) {
        const y = LIG[0] + 6 + (LIG[1] - LIG[0] - 12) * i / 3, d = demiEcart(y) + ep(y);
        o.push(h.ligne(...Q([-d, y]), ...Q([d, y + 5]), A.detail));
      }
      return o.join('\n');
    };
    const filP = () => { const n2 = [Math.cos(incl), -Math.sin(incl)]; const t = [Fp[0] + u[0] * (LONG + 30) * E, Fp[1] + u[1] * (LONG + 30) * E]; return h.ligne(t[0], t[1], g.cibles.P[0], g.cibles.P[1], A.detail); };
    // le siège : une bûche debout sous la fesse
    const c = F.corps(Object.assign({}, g.base, { angles: g.angles, objetL: serre(), objetP: filP() }));
    const sx = c.siege[0], sy = c.siege[1];
    out.push(h.rect(sx - 40, sy, 74, g.sol - sy, A.loin), h.rect(sx - 40, sy, 74, g.sol - sy, A.arete));
    out.push(h.ligne(6, g.sol, z.l - 6, g.sol, A.arete));
    out.push(c.svg || String(c));
    return out.join('\n');
  };

  return {
    ref: '104-42',
    titre: 'Le serre-couture',
    desc: 'Le serre-couture de côté : deux lattes debout, plus minces au milieu, un coin de bois entre leurs pieds et une ligature de babiche autour du paquet ; elles se rejoignent en haut et pincent deux épaisseurs de cuir. Le pied en gros : le coin, gros bout en bas, et les tours jointifs de la ligature. En usage, de profil : assis sur une bûche, le pied du serre-couture au sol, les lattes serrées entre les genoux, l’ouvrage à hauteur des mains, une main de chaque côté.',
    format: 'pleine',
    disposition: [['cote', 'pied', 'usage']],
    largeurs: [[0.78, 1, 2.1]],
    vues: {
      cote: {
        titre: 'De côté',
        dessin: dessinCote,
        renvois: z => {
          const g = geoCote(z), P = g.P;
          return [
            { n: 1, rond: [z.l - 14, 30], cible: P([CUIR / 2 + 1, LONG + 20]), texte: 'l’ouvrage pris dans les mâchoires' },
            { n: 2, rond: [z.l - 14, z.h * 0.42], cible: P([demiEcart(360) + ep(360), 360]), texte: 'lattes amincies au milieu : le ressort' },
          ];
        },
      },
      pied: {
        titre: 'Le pied',
        dessin: dessinPied,
        renvois: z => {
          const g = geoPied(z), P = g.P;
          return [
            { n: 3, rond: [16, g.Y - 6 * g.s - 40], cible: P([-C_BAS / 2 + 3, 8]), texte: 'coin de bois, gros bout en bas' },
            { n: 4, rond: [z.l - 14, P([0, 62])[1] - 70], cible: P([demiEcart(60) + ep(60) + 1, 66]), texte: 'ligature de babiche posée mouillée' },
          ];
        },
      },
      usage: {
        titre: 'En usage',
        dessin: dessinUsage,
        renvois: z => {
          const g = geoUsage(z);
          return [
            { n: 5, rond: [z.l - 18, g.K[1] - 60], cible: [g.K[0] + 6, g.K[1]], texte: 'serré entre les genoux' },
            { n: 6, rond: [z.l - 18, g.T[1] - 50], cible: [g.cibles.P[0] + 6, g.cibles.P[1]], texte: 'les deux mains libres, une aiguille chacune' },
          ];
        },
      },
    },
  };
};
