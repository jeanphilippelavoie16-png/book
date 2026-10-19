// Planche 13-08 — la boîte à braise : chargée en coupe, portée au bout de son anse,
// et le geste de la percer au clou sur une bûche.
// Aucune cote : le chapitre ne donne aucune dimension, et la durée porte [À VÉRIFIER].
//
// La charte : à l'ombre, la face de droite de la boîte portée, le dessous de la bûche et de la
// boîte couchée ; la coupe pleine de cendre reste sans gris. Le rouge : le coup de marteau sur
// le clou (le geste) ; le trou du couvercle, où l'on regarde s'il fume encore, cerclé. Les
// flèches d'air et de fumée restent noires.
//
// La main de « Portée » (refaite le 19 octobre 2026 : c'était une mainSimple, retirée, et la boucle de l'anse qui
// dépassait du poing se lisait comme un pouce levé) : h.formes.mainStock 1-09 « poing-manche-debout », le poing vu de
// côté, l'avant-bras à plat qui vient de la gauche, sans l'objet du fichier ; les deux brins de l'anse entrent dans le
// poing par le bas, sur l'axe de l'objet, et la main les cache. Rien n'est redessiné ni déformé ; l'avant-bras
// continue tout droit les deux bords de la main jusqu'au bord de la vue (sans courbe de raccord : second regard du
// 19 octobre 2026).

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blancTrait = 'fill="none" stroke="#ffffff" stroke-width="1" stroke-linecap="round"';

  // Graine fixe : la cendre est la même à chaque composition.
  let graine = 17;
  const hasard = () => (graine = (graine * 16807) % 2147483647) / 2147483647;

  // Cendre : un semis de points fins dans un rectangle.
  const cendre = (x0, y0, x1, y1, dens = 34) => {
    const n = Math.round((x1 - x0) * (y1 - y0) / dens);
    let d = '';
    for (let i = 0; i < n; i++) d += `M${f(x0 + hasard() * (x1 - x0))} ${f(y0 + hasard() * (y1 - y0))}h0.01`;
    return `<path d="${d}" fill="none" stroke="#000" stroke-width="1.4" stroke-linecap="round"/>`;
  };

  // Torsade : le bout du fil enroulé sur son brin, de (x0,y0) vers (x1,y1).
  const torsade = (x0, y0, x1, y1, n = 4) => {
    const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy);
    const ux = dx / L, uy = dy / L, px = -uy, py = ux;
    const out = [];
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n;
      const cx = x0 + dx * t, cy = y0 + dy * t;
      out.push(h.path(`M ${f(cx + px * 3.5 - ux * 2)} ${f(cy + py * 3.5 - uy * 2)} Q ${f(cx + ux * 2.5)} ${f(cy + uy * 2.5)} ${f(cx - px * 3.5 + ux * 1)} ${f(cy - py * 3.5 + uy * 1)}`, h.a.arete));
    }
    return out.join('\n');
  };

  // Braise : un morceau noir, fendu de blanc.
  const braise = (cx, cy, rx, ry) => {
    const pts = [[-1, 0.1], [-0.8, -0.6], [-0.3, -0.95], [0.25, -0.85], [0.75, -0.7], [1, -0.05], [0.8, 0.6], [0.2, 0.95], [-0.5, 0.85]]
      .map(([u, v]) => [cx + u * rx, cy + v * ry]);
    return [
      h.chemin(pts, h.a.plein, true),
      h.path(`M ${f(cx - rx * 0.6)} ${f(cy - ry * 0.1)} L ${f(cx - rx * 0.15)} ${f(cy + ry * 0.2)} L ${f(cx + rx * 0.3)} ${f(cy - ry * 0.25)} L ${f(cx + rx * 0.65)} ${f(cy + ry * 0.1)}`, blancTrait),
      h.path(`M ${f(cx - rx * 0.15)} ${f(cy + ry * 0.2)} L ${f(cx - rx * 0.05)} ${f(cy + ry * 0.65)}`, blancTrait),
      h.path(`M ${f(cx + rx * 0.3)} ${f(cy - ry * 0.25)} L ${f(cx + rx * 0.2)} ${f(cy - ry * 0.7)}`, blancTrait),
    ].join('\n');
  };

  // ─── Géométries partagées par le dessin et les renvois ──────────────────────────────
  const coupe = z => {
    const W = Math.round(Math.min(160, z.l * 0.5));
    const H = Math.round(W * 1.45);
    const cx = Math.round(z.l / 2);
    const bail = 78;
    const yT = Math.round(Math.max(bail + 20, (z.h - H - bail) / 2 + bail + 6));
    const yB = yT + H;
    const xl = cx - W / 2, xr = cx + W / 2;
    const yL = yT + 15;                              // couvercle, enfoncé sur la cendre
    const yBr = yB - Math.round(H * 0.3);            // centre de la braise
    const bw = Math.round(W * 0.56);
    const bBas = yBr - 7, bHaut = bBas - Math.round(H * 0.28);
    const xTrou = Math.round(W * 0.24);              // trous du couvercle, de part et d'autre du centre
    return { W, H, cx, bail, yT, yB, xl, xr, yL, yBr, bw, bBas, bHaut, xTrou };
  };

  const portee = z => {
    const W = Math.round(Math.min(116, z.l * 0.36));
    const H = Math.round(W * 1.3);
    const cx = Math.round(z.l * 0.52);
    const yB = z.h - 18, yT = yB - H;
    const ry = Math.round(W * 0.16);
    const xl = cx - W / 2, xr = cx + W / 2;
    const yA = yT + 11;                              // trous de l'anse
    // le poing : le centre de l'objet de 1-09 ; le fil sort du poing par le haut (yHaut) et par le bas (yBas), sur l'axe
    const poing = { x: cx, y: 70 };
    poing.yHaut = poing.y + (M109_HAUT - M109.objet.y) * K109;
    poing.yBas = poing.y + (M109_BAS - M109.objet.y) * K109;
    return { W, H, cx, yB, yT, ry, xl, xr, yA, poing };
  };

  // ─── La main qui porte : h.formes.mainStock 1-09 « poing-manche-debout » ─────────────
  // Le poing vu de côté, l'avant-bras à plat qui vient de la gauche, sans l'objet du fichier : le fil de l'anse passe
  // dans le poing sur l'axe de l'objet. Rien n'est redessiné ni déformé ; l'avant-bras continue les bords de la main
  // jusqu'au bord de la vue.
  const M109 = require('../../.claude/skills/planches/scripts/mains/stock.js').catalogue['1-09'];
  const TAILLE_MAIN = 170;
  const K109 = TAILLE_MAIN / Math.max(M109.boite[2] - M109.boite[0], M109.boite[3] - M109.boite[1]);
  const M109_HAUT = 378, M109_BAS = 646;           // le dessus et le dessous du poing sur l'axe de l'objet (relevés sur 1-09)
  const optsMain = P => ({ id: 'poing-manche-debout', objet: false, taille: TAILLE_MAIN, x: P.x, y: P.y });
  const versVue = P => ([px, py]) => [P.x + K109 * (px - M109.objet.x), P.y + K109 * (py - M109.objet.y)];
  // l'avant-bras : chaque bord continue tout droit dans la direction du bord de la main (le dessus de (5363,8 ; 440,7),
  // le dessous de (5364,4 ; 639,9), relevés sur le dessin de 1-09) jusqu'hors de la vue, sans courbe de raccord : la
  // coupe du fichier tombe à quelques unités du bord de la vue, et une courbe y faisait un crochet. Un fond blanc
  // couvre la coupe du fichier.
  const avantBras = (P, L = 200) => {
    const T = versVue(P);
    const dir = (p, d) => { const a = T(p), b = T([p[0] + d[0], p[1] + d[1]]), n = Math.hypot(b[0] - a[0], b[1] - a[1]); return [a, [(b[0] - a[0]) / n, (b[1] - a[1]) / n]]; };
    // les deux départs, pris 2 unités en dedans de la coupe : le fond blanc couvre le trait droit de la coupe du fichier
    const [t1, dt] = dir([5363.75, 440.741], [-52.5, -7.8]), [b1, db] = dir([5364.38, 639.884], [-109.4, 12.7]);
    const t0 = [t1[0] - dt[0] * 2, t1[1] - dt[1] * 2], b0 = [b1[0] - db[0] * 2, b1[1] - db[1] * 2];
    const tf = [t0[0] + dt[0] * L, t0[1] + dt[1] * L], bf = [b0[0] + db[0] * L, b0[1] + db[1] * L], Q = p => `${f(p[0])} ${f(p[1])}`;
    const trait = 'fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"';
    return [
      h.path(`M ${Q(t0)} L ${Q(tf)} L ${Q(bf)} L ${Q(b0)} Z`, h.a.blanc),
      h.path(`M ${Q(t0)} L ${Q(tf)} M ${Q(b0)} L ${Q(bf)}`, trait),
    ].join('\n');
  };

  const percer = z => {
    const G = z.h - 12;                              // le sol
    const Dc = Math.round(Math.min(96, z.h * 0.46)); // la boîte couchée
    const D = Dc - 8;                                // la bûche qui entre dedans
    const ya = G - Dc / 2 - 2;                       // axe commun
    const Lc = Math.round(Dc * 1.3);
    const cxC = Math.round(z.l * 0.6);
    const xo = cxC - Lc / 2, xf = cxC + Lc / 2;      // bord ouvert (gauche), fond (droite)
    const xb0 = Math.round(z.l * 0.1);               // bout scié de la bûche
    const xh = Math.round(xf - Lc * 0.3);            // rangée de trous, à hauteur de braise
    const yP = ya - Dc / 2;                          // dessus de la paroi
    return { G, Dc, D, ya, Lc, cxC, xo, xf, xb0, xh, yP };
  };

  return {
    ref: '13-08',
    titre: 'La boîte à braise',
    desc: 'Une boîte de conserve percée au clou sur le pourtour et dans le couvercle. En coupe : un lit de cendre au fond, une braise vive au centre, un bloc d’amadouvier ou de bois pourri sec posé dessus, encore de la cendre, et le couvercle enfoncé par-dessus ; l’air entre par les trous du pourtour, la fumée sort par ceux du couvercle. Portée : une anse de fil de broche passée dans deux trous sous le bord, le bout tordu sur son brin, la boîte pendue au bout du fil, les deux brins serrés dans un poing vu de côté, le bras tendu loin du corps. Percée : la boîte couchée, enfilée sur le bout d’une bûche, et le clou frappé au marteau à travers la paroi.',
    format: 'pleine',
    disposition: [['percer'], ['coupe', 'portee']],
    hauteurs: [1.35, 3],
    largeurs: [[1], [1, 1]],
    vues: {
      coupe: {
        titre: 'En coupe, chargée',
        dessin: z => {
          const g = coupe(z);
          const { W, H, cx, bail, yT, yB, xl, xr, yL, yBr, bw, bBas, bHaut, xTrou } = g;
          const out = [];

          // La cendre remplit tout, du fond au couvercle.
          out.push(cendre(xl + 3, yL + 3, xr - 3, yB - 7));

          // La braise, dans un creux de la cendre.
          out.push(h.ellipse(cx, yBr + 2, 37, 18, h.a.blanc));
          out.push(braise(cx, yBr, 30, 14));

          // Le bloc d'amadouvier, en coupe de sabot : le côté cassé à gauche, la croûte
          // bosselée qui descend vers la marge à droite, les couches de tubes dessous.
          const bx0 = cx - bw / 2, bh = bBas - bHaut;
          const P = (u, v, dy = 0) => `${f(bx0 + u * bw)} ${f(bHaut + v * bh + dy)}`;
          const dessus = [[0, 0.2], [0.24, 0.02], [0.48, 0.07], [0.7, 0.22], [0.87, 0.42], [0.98, 0.62]];
          const bosses = [[0.1, -0.04], [0.37, -0.03], [0.62, 0.08], [0.82, 0.26], [0.96, 0.46]];
          const crete = (dy, sens) => {
            const pts = sens > 0 ? dessus : [...dessus].reverse();
            const bs = sens > 0 ? bosses : [...bosses].reverse();
            return pts.slice(1).map((p, i) => `Q ${P(bs[i][0], bs[i][1], dy)} ${P(p[0], p[1], dy)}`).join(' ');
          };
          const blocD = `M ${P(0.03, 1)} L ${P(0, 0.2)} ${crete(0, 1)} Q ${P(1.04, 0.9)} ${P(0.93, 1)} Z`;
          out.push(h.path(blocD, h.a.blanc));
          out.push(h.path(`M ${P(0, 0.2)} ${crete(0, 1)} L ${P(0.97, 0.62, 5)} ${crete(5, -1)} Z`, h.a.plein));
          const tHaut = bHaut + Math.round(bh * 0.64);
          let tubes = '';
          for (let x = bx0 + 5; x < bx0 + bw * 0.92; x += 3.5) tubes += `M ${f(x)} ${tHaut} V ${bBas - 1} `;
          out.push(h.path(tubes, h.a.fin));
          out.push(h.ligne(bx0 + 1, tHaut, bx0 + bw * 0.99, tHaut, h.a.detail));
          out.push(h.ligne(bx0 + 1, bHaut + Math.round(bh * 0.83), bx0 + bw * 0.97, bHaut + Math.round(bh * 0.83), h.a.detail));
          out.push(h.path(blocD, h.a.arete));

          // Les parois, ouvertes aux trous à hauteur de braise.
          const t = 3.5;
          out.push(h.ligne(xl, yT, xl, yBr - t, h.a.contour), h.ligne(xl, yBr + t, xl, yB, h.a.contour));
          out.push(h.ligne(xr, yT, xr, yBr - t, h.a.contour), h.ligne(xr, yBr + t, xr, yB, h.a.contour));
          // Le fond, en retrait, et les bords roulés.
          out.push(h.ligne(xl, yB - 5, xr, yB - 5, h.a.contour));
          for (const x of [xl, xr]) {
            out.push(h.cercle(x, yT, 2.8, h.a.plein));
            out.push(h.cercle(x, yB, 2.6, h.a.plein));
          }

          // Le couvercle, enfoncé sous le bord, ouvert à ses trous.
          const tl = 3.5;
          const segs = [[xl + 3, cx - xTrou - tl], [cx - xTrou + tl, cx + xTrou - tl], [cx + xTrou + tl, xr - 3]];
          for (const [a, b] of segs) out.push(h.ligne(a, yL, b, yL, h.a.contour));
          out.push(h.ligne(xl + 3, yL, xl + 3, yL - 5, h.a.arete), h.ligne(xr - 3, yL, xr - 3, yL - 5, h.a.arete));

          // L'anse : le fil passe dans un trou sous le bord, revient et se tord sur son brin.
          const yA = yT + 9, ax = cx, ay = yT - bail;
          out.push(h.path(`M ${xl + 6} ${yA} L ${xl - 6} ${yA} Q ${xl - 11} ${yA} ${xl - 10} ${yA - 7} L ${ax - 7} ${ay + 6} Q ${ax} ${ay - 4} ${ax + 7} ${ay + 6} L ${xr + 10} ${yA - 7} Q ${xr + 11} ${yA} ${xr + 6} ${yA} L ${xr - 6} ${yA}`, h.a.arete));
          const k = 22 / Math.hypot(cx - xl, bail);
          out.push(torsade(xl - 10, yA - 7, xl - 10 + (ax - xl + 3) * k, yA - 7 - (bail - 2) * k));
          out.push(torsade(xr + 10, yA - 7, xr + 10 - (xr - ax + 3) * k, yA - 7 - (bail - 2) * k));

          // L'air entre par le pourtour, la fumée sort par le couvercle.
          out.push(h.fleche(`M ${xl - 36} ${yBr} L ${xl - 8} ${yBr}`));
          out.push(h.fleche(`M ${xr + 36} ${yBr} L ${xr + 8} ${yBr}`));
          out.push(h.fleche(`M ${cx - xTrou} ${yL - 5} L ${cx - xTrou} ${yT - 18}`));
          out.push(h.fleche(`M ${cx + xTrou} ${yL - 5} L ${cx + xTrou} ${yT - 18}`));

          return out.filter(Boolean).join('\n');
        },
        renvois: z => {
          const { cx, yT, yB, xl, xr, yL, yBr, bw, bBas, bHaut, xTrou } = coupe(z);
          const bMid = Math.round((bBas + bHaut) / 2);
          return [
            { n: 3, rond: [xl - 36, yB - 18], cible: [xl + 20, yB - 20], texte: 'lit de cendre ou de sable' },
            { n: 4, rond: [xr + 34, yBr + 38], cible: [cx + 14, yBr + 6], texte: 'braise vive, au centre' },
            { n: 5, rond: [xr + 34, bMid], cible: [cx + Math.round(bw * 0.2), bMid], texte: 'amadouvier ou bois pourri sec' },
            { n: 6, rond: [xl - 36, Math.round((yL + bHaut) / 2)], cible: [xl + 18, Math.round((yL + bHaut) / 2)], texte: 'encore de la cendre' },
            { n: 7, rond: [xr + 34, yL - 4], cible: [cx + xTrou + 22, yL], texte: 'le couvercle percé, fermé' },
          ];
        },
      },

      portee: {
        titre: 'Portée',
        dessin: z => {
          const { W, H, cx, yB, yT, ry, xl, xr, yA, poing } = portee(z);
          const out = [];

          // La face de droite, à l'ombre : du bord avant du dessus jusqu'au fond.
          { const av = x => ry * Math.sqrt(Math.max(0, 1 - ((x - cx) / (W / 2)) ** 2)), xs = [];
            for (let x = cx + 0.22 * W; x <= xr + 0.01; x += W / 60) xs.push(x);
            out.push(h.chemin([...xs.map(x => [x, yT + av(x)]), ...xs.slice().reverse().map(x => [x, yB + av(x)])], h.a.ombre, true)); }
          // Le corps de la boîte, ses ondulations, son fond.
          out.push(h.path(`M ${xl} ${yT} L ${xl} ${yB} A ${W / 2} ${ry} 0 0 0 ${xr} ${yB} L ${xr} ${yT}`, h.a.contour));
          for (const k of [0.2, 0.44, 0.9]) {
            const y = yT + H * k;
            out.push(h.path(`M ${xl} ${f(y)} A ${W / 2} ${ry} 0 0 0 ${xr} ${f(y)}`, h.a.fin));
            out.push(h.path(`M ${xl} ${f(y + 3)} A ${W / 2} ${ry} 0 0 0 ${xr} ${f(y + 3)}`, h.a.fin));
          }
          // Le bord roulé et le couvercle enfoncé dedans.
          out.push(h.ellipse(cx, yT, W / 2, ry, h.a.contour));
          out.push(h.ellipse(cx, yT + 4, W / 2 - 5, ry - 3, h.a.detail));
          for (const [u, v] of [[-0.26, -0.3], [0.26, -0.3], [-0.22, 0.4], [0.22, 0.4]]) {
            out.push(h.ellipse(cx + u * W, yT + 4 + v * (ry - 3), 2.4, 1.3, h.a.plein));
          }

          // La rangée de trous du pourtour, à hauteur de braise.
          const yh = yB - H * 0.3;
          for (const deg of [-68, -40, -12, 16, 44, 70]) {
            const a = deg * Math.PI / 180;
            out.push(h.ellipse(cx + (W / 2) * Math.sin(a), yh + ry * Math.cos(a), Math.max(0.9, 2.6 * Math.cos(a)), 2.4, h.a.plein));
          }

          // Un filet de fumée au couvercle.
          const sx = cx + 0.22 * W, sy = yT + 4 + 0.4 * (ry - 3);
          out.push(h.path(`M ${f(sx)} ${f(sy - 3)} C ${f(sx - 8)} ${f(sy - 14)} ${f(sx + 8)} ${f(sy - 24)} ${f(sx)} ${f(sy - 34)} S ${f(sx + 6)} ${f(sy - 52)} ${f(sx - 2)} ${f(sy - 60)}`, h.a.fin));
          // À chaque arrêt : fume-t-il encore au trou ?
          out.push(h.controle(sx, sy - 1, 9));

          // L'anse : les deux brins montent jusqu'au poing, qui tient la boîte au bout du fil, le bras tendu loin du
          // corps (le corps est à gauche, hors de la vue). Les brins entrent dans le poing par le bas, sur l'axe.
          const py = poing.yBas - 6;
          out.push(h.path(`M ${xl + 3} ${yA} L ${xl - 5} ${yA} Q ${xl - 9} ${yA} ${xl - 8} ${yA - 6} L ${poing.x - 3} ${f(py)}`, h.a.arete));
          out.push(h.path(`M ${xr - 3} ${yA} L ${xr + 5} ${yA} Q ${xr + 9} ${yA} ${xr + 8} ${yA - 6} L ${poing.x + 3} ${f(py)}`, h.a.arete));
          const kx = (poing.x - 3 - (xl - 8)), ky = (py - (yA - 6)), kL = Math.hypot(kx, ky);
          out.push(torsade(xl - 8, yA - 6, xl - 8 + kx * 24 / kL, yA - 6 + ky * 24 / kL));
          out.push(torsade(xr + 8, yA - 6, xr + 8 - kx * 24 / kL, yA - 6 + ky * 24 / kL));
          out.push(h.cercle(xl, yA, 2.2, h.a.plein), h.cercle(xr, yA, 2.2, h.a.plein));
          // le haut de l'anse, plié dans le poing : les deux brins y entrent par le bas, la main les cache
          const fil = h.path(`M ${poing.x - 3} ${f(py)} L ${poing.x - 3} ${f(poing.yHaut + 12)} Q ${poing.x} ${f(poing.yHaut + 6)} ${poing.x + 3} ${f(poing.yHaut + 12)} L ${poing.x + 3} ${f(py)}`, h.a.arete);
          // le fil d'abord, la main par-dessus : son blanc cache le fil dans le poing ; l'avant-bras sort par le bord
          out.push(fil);
          out.push(`<clipPath id="vue-portee-1308"><rect x="0" y="0" width="${z.l}" height="${z.h}" fill="#FFFFFF" stroke="none"/></clipPath>`);
          out.push(`<g clip-path="url(#vue-portee-1308)">`, String(h.formes.mainStock(optsMain(poing))), avantBras(poing), '</g>');

          return out.join('\n');
        },
        renvois: z => {
          const { xl, xr, yA, poing, cx } = portee(z);
          // le brin de droite, de sa sortie du poing (poing.yBas − 6) au trou de l'anse
          const brin = y => poing.x + 3 + (xr + 8 - poing.x - 3) * (y - (poing.yBas - 6)) / (yA - 6 - (poing.yBas - 6));
          return [
            { n: 8, rond: [xl - 26, yA + 34], cible: [xl - 7, yA - 12], texte: 'anse de fil de broche' },
            { n: 9, rond: [poing.x + 76, poing.yBas + 30], cible: [brin(poing.yBas + 30) + 0.8, poing.yBas + 30], texte: 'la porter au bout du fil, loin du corps' },
            { n: 10, rond: [cx + 0.22 * 116 + 34, portee(z).yT - 46], cible: [cx + 0.22 * 116 + 8, portee(z).yT - 8], texte: 'à chaque arrêt : de la fumée aux trous' },
          ];
        },
      },

      percer: {
        titre: 'Percer au clou, la boîte enfilée sur une bûche',
        dessin: z => {
          const { G, Dc, D, ya, Lc, xo, xf, xb0, xh, yP } = percer(z);
          const out = [];
          const r = D / 2, R = Dc / 2, ex = Math.round(D * 0.16), exC = Math.round(Dc * 0.16);

          // Le sol.
          out.push(h.ligne(12, G, z.l - 12, G, h.a.arete));
          out.push(h.rect(12, G, z.l - 24, 8, h.a.hachure('terre', 'aucun')));

          // La bûche : le bout scié à gauche, l'écorce, puis la partie cachée dans la boîte.
          const yb0 = ya - r, yb1 = ya + r, yc0 = ya - R, yc1 = ya + R;
          // Le dessous de la bûche et de la boîte couchée, à l'ombre.
          out.push(h.rect(xb0, ya + 0.45 * r, xo - xb0, 0.55 * r, h.a.ombre));
          { const pts = [[xo, ya + 0.45 * R], [xf, ya + 0.45 * R]];
            for (let k = 0; k <= 12; k++) { const u = Math.asin(0.45) + (Math.PI / 2 - Math.asin(0.45)) * k / 12; pts.push([xf + exC * Math.cos(u), ya + R * Math.sin(u)]); }
            pts.push([xo, yc1]);
            out.push(h.chemin(pts, h.a.ombre, true)); }
          out.push(h.ligne(xb0, yb0, xo, yb0, h.a.contour), h.ligne(xb0, yb1, xo, yb1, h.a.contour));
          out.push(h.ellipse(xb0, ya, ex, r, h.a.blanc));
          out.push(h.ellipse(xb0, ya, ex, r, h.a.contour));
          for (const k of [0.62, 0.3]) out.push(h.ellipse(xb0, ya, ex * k, r * k, h.a.fin));
          for (const [u, v0, v1] of [[0.25, -0.7, -0.62], [0.45, -0.2, -0.28], [0.6, 0.35, 0.44], [0.8, -0.5, -0.42], [0.35, 0.72, 0.64], [0.7, 0.1, 0.02]]) {
            const x0 = xb0 + ex + (xo - xb0 - ex - 20) * u;
            out.push(h.path(`M ${f(x0)} ${f(ya + v0 * r)} q 14 ${f((v1 - v0) * r)} 34 ${f((v1 - v0) * r * 0.5)}`, h.a.detail));
          }
          out.push(h.ligne(xo, yb0, xf - 10, yb0, h.a.cache), h.ligne(xo, yb1, xf - 10, yb1, h.a.cache));
          out.push(h.ligne(xf - 10, yb0, xf - 10, yb1, h.a.cache));

          // La boîte couchée : bord ouvert à gauche, fond à droite, ondulations.
          out.push(h.path(`M ${xo} ${yc0} L ${xf} ${yc0} A ${exC} ${R} 0 0 1 ${xf} ${yc1} L ${xo} ${yc1}`, h.a.contour));
          out.push(h.path(`M ${xo} ${yc0} A ${exC} ${R} 0 0 1 ${xo} ${yc1}`, h.a.contour));
          for (const k of [0.12, 0.5]) {
            const x = xo + Lc * k;
            out.push(h.path(`M ${f(x)} ${yc0} A ${exC} ${R} 0 0 1 ${f(x)} ${yc1}`, h.a.fin));
            out.push(h.path(`M ${f(x + 3)} ${yc0} A ${exC} ${R} 0 0 1 ${f(x + 3)} ${yc1}`, h.a.fin));
          }
          // Les trous déjà faits, en rangée autour de la boîte.
          for (const deg of [-50, -18, 14, 46]) {
            const a = deg * Math.PI / 180;
            out.push(h.ellipse(xh + exC * Math.cos(a), ya + R * Math.sin(a), 2.2, Math.max(1, 2.6 * Math.cos(a)), h.a.plein));
          }

          // Le clou, pointe sur la paroi, et le marteau qui descend.
          const nh = 40;
          out.push(h.rect(xh - 1.6, yP - nh, 3.2, nh - 3, h.a.plein));
          out.push(h.chemin([[xh - 1.6, yP - 3], [xh + 1.6, yP - 3], [xh, yP + 2]], h.a.plein, true));
          out.push(h.rect(xh - 6, yP - nh - 3, 12, 3, h.a.plein));
          const mh = yP - nh - 12;
          // Le marteau à panne fendue, la tête d'équerre sur le manche : la face qui frappe en bas, sur la tête du
          // clou ; la panne qui recourbe vers le manche en haut. Repère local : origine au milieu de la face, u le long
          // du manche (vers la droite), v vers la face (en bas).
          {
            const a = Math.atan2(-22, 106), ca = Math.cos(a), sa = Math.sin(a);
            const M = ([u, v]) => [xh + u * ca - v * sa, mh + u * sa + v * ca];
            const C = pts => pts.map(M);
            // le manche : il entre dans l'œil, s'évase vers le bout
            const manche = [[6, -20.5], [40, -21], [90, -22.5], [116, -23.5], [119, -18], [116, -12.5], [90, -13.5], [40, -15], [6, -15.5]];
            out.push(h.chemin(C(manche), h.a.hachure('bois', 'arete'), true));
            // la tête : la face, le col, l'œil, la panne fendue recourbée
            const tete = [[-8, 0], [8, 0], [8, -3], [6, -6], [6, -11], [8, -13], [8, -24], [10, -29], [14, -33], [19, -36.5],
              [18, -39.5], [10, -39], [2, -37], [-4, -33], [-7.5, -27], [-8, -24], [-8, -13], [-6, -11], [-6, -6], [-8, -3]];
            out.push(h.chemin(C(tete), h.a.hachure('metal', 'contour'), true));
            out.push(h.chemin(C([[-8, -3], [8, -3]]), h.a.detail));
          }
          out.push(h.geste(`M ${xh - 26} ${mh - 30} L ${xh - 26} ${mh + 4}`));

          return out.join('\n');
        },
        renvois: z => {
          const { ya, xo, xb0, xh, yP, D } = percer(z);
          return [
            { n: 2, rond: [xh - 58, yP - 40], cible: [xh - 26, yP - 46], texte: 'percer au clou, tout autour' },
            { n: 1, rond: [Math.round((xb0 + xo) / 2), ya - D / 2 - 28], cible: [Math.round((xb0 + xo) / 2) + 6, ya - D / 2 + 2], texte: 'un bout de bûche dans la boîte' },
          ];
        },
      },
    },
  };
};
