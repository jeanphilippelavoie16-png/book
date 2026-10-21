// Planche 27-05 — La brosse de branche (chapitre 27, « La brosse qui s'use, et celle qu'on fait »).
// La pousse de bouleau à papier (écorce foncée, pas blanche), le rameau cassé qu'on sent avant
// de mâcher (un buste qui tient le rameau au poing, h.formes), le bout mâché, et la brosse finie : un bout en brosse, l'autre taillé en pointe.
// Aucune cote : le chapitre ne donne ni longueur ni diamètre.
// Lot 3 (13 octobre) : les deux bustes passent au corps simple de profil (buste-main-bouche), la
// petite main du moteur au poing sur le rameau. Rouge : un seul cercle, sur la cassure sous la
// narine — « casser et sentir avant de mâcher, chaque fois ».
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
  const sombre = `fill="${NOIR}" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"`;
  const reflet = `fill="none" stroke="${BLANC}" stroke-width="0.7" stroke-linecap="round"`;
  const refletFort = `fill="none" stroke="${BLANC}" stroke-width="1.4" stroke-linecap="round"`;
  const bois = `fill="${BLANC}" stroke="${NOIR}" stroke-width="0.7" stroke-linejoin="round"`;
  const f1 = v => Math.round(v * 10) / 10;
  const P = p => `${f1(p[0])} ${f1(p[1])}`;

  // une cubique échantillonnée
  const cub = (a, b, c, d, n = 24) => Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, u = 1 - t;
    return [u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
      u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1]];
  });
  // les deux bords d'une tige le long d'une suite de points, rayon r(t)
  const bords = (pts, r) => {
    const g = [], d = [], n = pts.length - 1;
    pts.forEach((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n, i + 1)];
      const tx = b[0] - a[0], ty = b[1] - a[1], L = Math.hypot(tx, ty) || 1;
      const nx = -ty / L, ny = tx / L, rr = r(i / n);
      g.push([p[0] + nx * rr, p[1] + ny * rr]); d.push([p[0] - nx * rr, p[1] - ny * rr]);
    });
    return { g, d };
  };
  const ligne = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${P(p)}`).join(' ');
  // une tige foncée : l'écorce du jeune bouleau, avec un reflet qui la fait ronde
  const tige = (pts, r, { refletDe = 0.08, refletA = 0.92 } = {}) => {
    const { g, d } = bords(pts, r);
    const corps = h.path(`${ligne(g)} L${d.slice().reverse().map(P).join(' L')} Z`, sombre);
    const n = pts.length - 1, i0 = Math.round(n * refletDe), i1 = Math.round(n * refletA);
    const rf = bords(pts, t => r(t) * 0.45).g.slice(i0, i1 + 1);
    return [corps, h.path(ligne(rf), reflet)].join('\n');
  };
  // un bourgeon pointu, couché le long de la tige
  const bourgeon = (x, y, ang, lg = 9, ep = 3.2) => {
    const c = Math.cos(ang * Math.PI / 180), s = Math.sin(ang * Math.PI / 180);
    const T = (u, v) => [x + u * c - v * s, y + u * s + v * c];
    return h.path(`M${P(T(0, -ep))} Q${P(T(lg * 0.55, -ep * 1.1))} ${P(T(lg, 0))} Q${P(T(lg * 0.55, ep * 1.1))} ${P(T(0, ep))} Z`, sombre);
  };
  // Les deux bustes : le corps simple de profil (buste-main-bouche), même échelle, recadré par la
  // vue sous la taille. Les angles du bras viennent d'une recherche faite une fois (Nelder-Mead sur
  // corps(), lot 3, 13 oct.) : le poing devant le menton, l'axe du rameau qui passe sous la narine
  // (sentir) ou entre les lèvres (mâcher), penché vers l'avant de 20° ou 24°. Le rameau se pose
  // ensuite sur la géométrie rendue : du point du visage au centre du poing. Avec la tête simple (14 oct.),
  // le point du visage descend ; la recherche refaite garde le poing au même endroit par rapport à lui.
  const EB = 0.43;
  const BRAS = {
    sentir: { brasP: 58.2, avantbrasP: -154.7, mainP: -200 },
    macher: { brasP: 46.5, avantbrasP: -166.1, mainP: -204 },
  };
  // le visage : la tête simple de la bibliothèque (corps({ visage }), 14 octobre). Sentir : la bouche
  // fermée, la cassure sous la narine, entre le bout du nez et la bouche ; mâcher : les lèvres serrées
  // sur la pousse (8 mm), le bout coupé entre elles.
  const VISAGE = { sentir: true, macher: { bouche: 'serre', epaisseur: 8 } };
  const pointVisage = (cle, v) => cle === 'sentir'
    ? [v.nez[0] + (v.bouche[0] - v.nez[0]) * 0.4 + 1.5, v.nez[1] + (v.bouche[1] - v.nez[1]) * 0.4]
    : v.bouche;
  const plus = (p, u, k) => [p[0] + u[0] * k, p[1] + u[1] * k];
  // le rameau tenu : droit, d'un bout B à l'autre bout Q, un peu cambré
  const rameauDroit = (Q, B, r0, r1, n = 14) => {
    const nx = -(B[1] - Q[1]), ny = B[0] - Q[0], L = Math.hypot(nx, ny);
    return Array.from({ length: n + 1 }, (_, i) => {
      const t = i / n, k = Math.sin(t * Math.PI) * 1.2 / L;
      return [Q[0] + (B[0] - Q[0]) * t + nx * k, Q[1] + (B[1] - Q[1]) * t + ny * k];
    });
  };
  const memo = {};
  const Y_SOL = 8 + 1773 * EB;                           // le sommet du crâne à 8 du haut de la vue
  const buste = (cle, X, z) => {
    const k = [cle, X, z.l, z.h].join(',');
    if (!memo[k]) memo[k] = F.corps({ x: X, y: Y_SOL, pose: 'buste-main-bouche', echelle: EB, angles: BRAS[cle], visage: VISAGE[cle] });
    return memo[k];
  };
  // la géométrie d'une vue : le point du visage A, le poing M, la direction u du visage vers l'avant
  const geoBuste = (cle, z) => {
    const X = z.l * 0.27;
    const c = buste(cle, X, z);
    const A = pointVisage(cle, c.visage), M = [c.mainP.x, c.mainP.y];
    const L = Math.hypot(M[0] - A[0], M[1] - A[1]), u = [(M[0] - A[0]) / L, (M[1] - A[1]) / L];
    return { X, c, A, M, u, k: L };
  };
  // le corps et son objet (le rameau, derrière le poing vu du dos, devant le visage), coupé au
  // bord de la vue : un buste
  const rendre = (cle, X, z, objet) => {
    const id = `rogne-27-05-${cle}`;
    const c = F.corps({ x: X, y: Y_SOL, pose: 'buste-main-bouche', echelle: EB, angles: BRAS[cle], objetP: objet, visage: VISAGE[cle] });
    return `<clipPath id="${id}"><rect x="0" y="0" width="${f1(z.l)}" height="${f1(z.h)}"/></clipPath>\n<g clip-path="url(#${id})">\n${c}\n</g>`;
  };
  // la vue « sentir » : la cassure sous la narine, le rameau tenu au poing devant le menton
  const SENT = { queue: 58 };
  const geoSentir = z => { const g = geoBuste('sentir', z); return { ...g, B: g.A, bout: plus(g.A, g.u, g.k + SENT.queue - 12) }; };
  // la vue « mâcher » : le bout coupé entre les lèvres, la pousse tenue au poing
  const geoMacher = z => {
    const g = geoBuste('macher', z), C = g.A;
    // le bout mince : aussi loin que la vue le permet
    const lg = Math.min(150, (z.l - 8 - C[0]) / g.u[0], (z.h * 0.75 - C[1]) / Math.max(0.01, g.u[1]));
    return { ...g, C, D: plus(C, g.u, lg) };
  };
  // pseudo-hasard stable
  let graine = 7;
  const hasard = () => { graine = (graine * 9301 + 49297) % 233280; return graine / 233280; };

  return {
    ref: '27-05',
    titre: 'La brosse de branche',
    desc: 'Une tige de bouleau à papier à l’écorce blanche, d’où sort une jeune pousse à l’écorce foncée, presque noire, avec le trait où la couper. '
      + 'Une personne de profil, en buste, tient au poing un rameau cassé et en porte la cassure sous la narine pour la sentir ; '
      + 'puis, de même, elle tient la pousse au poing et en mâche le bout coupé, entre les lèvres. '
      + 'En bas, la brosse finie, couchée : un bout mâché jusqu’à ce que les fibres s’écartent en brosse, le trait où on le recoupe quand il est usé, '
      + 'et l’autre bout taillé en pointe au couteau pour passer entre les dents.',
    format: 'pleine',
    disposition: [['pousse', 'sentir', 'macher'], ['brosse']],
    hauteurs: [1.75, 0.6],
    largeurs: [[0.62, 1.05, 1.05], [1]],
    vues: {
      // ── la pousse, sur le bouleau ─────────────────────────────────────────────────────
      pousse: {
        titre: 'La pousse',
        dessin: z => {
          const out = [];
          const cx = z.l * 0.3, rT = Math.min(24, z.l * 0.15), y0 = 6, y1 = z.h - 6;
          // la tige de vieux bois, blanche : deux bords un peu irréguliers
          const bordT = (sg) => {
            const pts = [];
            for (let i = 0; i <= 10; i++) {
              const y = y0 + (y1 - y0) * i / 10;
              pts.push([cx + sg * (rT + Math.sin(i * 1.7 + sg) * 1.2 - i * 0.25), y]);
            }
            return pts;
          };
          const gT = bordT(-1), dT = bordT(1);
          // le tronc blanc (le blanc cache ce qui passe derrière)
          out.push(h.path(`${ligne(gT)} L${dT.slice().reverse().map(P).join(' L')} Z`, `fill="${BLANC}" stroke="none"`));
          // la jonction de la pousse, sur le bord droit
          const yJ = z.h * 0.6, J = [cx + rT + 1.5, yJ];
          // la pousse : de la tige vers le haut à droite, puis qui se redresse
          const tip = [z.l - 12, z.h * 0.1];
          const pts = cub(J, [cx + rT + z.l * 0.25, yJ - z.h * 0.05], [tip[0] - z.l * 0.12, tip[1] + z.h * 0.3], tip, 40);
          const rP = t => 5.2 - 3.2 * t + 1.4 * Math.max(0, 1 - t / 0.09);   // le collet, à la base
          // un rameau de côté, plus fin
          const iR = 22, R0 = pts[iR];
          const ram = cub(R0, [R0[0] + 14, R0[1] - 2], [R0[0] + 24, R0[1] - 10], [Math.min(z.l - 8, R0[0] + 34), R0[1] - 24], 16);
          out.push(tige(ram, t => 2.4 - 1.2 * t, { refletDe: 0.2, refletA: 0.8 }));
          out.push(bourgeon(ram[16][0], ram[16][1], -55, 7, 2.2));
          out.push(tige(pts, rP, { refletDe: 0.3, refletA: 0.92 }));
          // les bourgeons, en alternance, et celui du bout
          const angDe = i => { const a = pts[i - 1], b = pts[i + 1]; return Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI; };
          [[10, -1], [16, 1], [29, 1], [34, -1]].forEach(([i, sg]) => {
            const a = angDe(i), r = rP(i / 40), aR = (a + sg * -90) * Math.PI / 180;
            const bx = pts[i][0] + Math.cos(aR) * r * 0.7, by = pts[i][1] + Math.sin(aR) * r * 0.7;
            out.push(bourgeon(bx, by, a + sg * -32, 8, 2.6));
          });
          out.push(bourgeon(tip[0] - 1, tip[1] + 1, angDe(39), 9, 2.4));
          // les lenticelles : de courts traits couchés sur l'écorce blanche
          graine = 11;
          for (let k = 0; k < 26; k++) {
            const y = y0 + 10 + (y1 - y0 - 20) * k / 25 + (hasard() - 0.5) * 6;
            if (Math.abs(y - (yJ - 12)) < 22) continue;
            const w = 5 + hasard() * 12, x = cx - rT + 4 + hasard() * (2 * rT - 8 - w);
            out.push(h.ligne(f1(x), f1(y), f1(x + w), f1(y), k % 3 ? A.detail : A.arete));
          }
          // les bords de la tige, et ses deux bouts cassés
          out.push(h.path(ligne(gT), A.contour));
          out.push(h.path(ligne(dT), A.contour));
          const bout = (y, s) => h.path(`M${P([gT[s][0], y])} L${P([cx - rT * 0.4, y + 3])} L${P([cx, y - 2])} L${P([cx + rT * 0.45, y + 2])} L${P([dT[s][0], y])}`, A.detail);
          out.push(bout(y0, 0), bout(y1, 10));
          // le trait de coupe, en travers de la pousse près de sa base
          const iC = 7, C = pts[iC], a = angDe(iC) * Math.PI / 180, nx = -Math.sin(a), ny = Math.cos(a), rc = rP(iC / 40);
          out.push(h.ligne(f1(C[0] + nx * (rc + 2)), f1(C[1] + ny * (rc + 2)), f1(C[0] + nx * (rc + 10)), f1(C[1] + ny * (rc + 10)), A.arete));
          out.push(h.ligne(f1(C[0] - nx * (rc + 2)), f1(C[1] - ny * (rc + 2)), f1(C[0] - nx * (rc + 10)), f1(C[1] - ny * (rc + 10)), A.arete));
          out.push(h.ligne(f1(C[0] + nx * (rc - 0.8)), f1(C[1] + ny * (rc - 0.8)), f1(C[0] - nx * (rc - 0.8)), f1(C[1] - ny * (rc - 0.8)), `fill="none" stroke="${BLANC}" stroke-width="1.4"`));
          return out.join('\n');
        },
        renvois: z => {
          const cx = z.l * 0.3, rT = Math.min(24, z.l * 0.15);
          return [
            { n: 1, rond: [z.l - 14, z.h * 0.42], cible: [z.l * 0.8, z.h * 0.3] },
            { n: 2, rond: [cx, z.h * 0.93], cible: [cx - rT * 0.3, z.h * 0.76] },
            { n: 3, rond: [cx + rT + 22, z.h * 0.76], cible: [cx + rT + 14, z.h * 0.6] },
          ].map((r, i) => ({ ...r, texte: ['jeune pousse : rouge foncé, presque noire', 'l’écorce ne blanchit qu’avec l’âge', 'couper une pousse verte et souple'][i] }));
        },
      },
      // ── casser un rameau et le sentir ─────────────────────────────────────────────────
      sentir: {
        titre: 'Casser, sentir',
        dessin: z => {
          const g = geoSentir(z), r = 2.6;
          const pts = rameauDroit(g.bout, g.B, r + 0.5, r);
          const nx = -g.u[1], ny = g.u[0];
          const rameau = [tige(pts, t => r + 0.5 * (1 - t), { refletDe: 0.1, refletA: 0.85 })];
          rameau.push(bourgeon(pts[3][0] + nx * 2.2, pts[3][1] + ny * 2.2, Math.atan2(g.u[1], g.u[0]) * 180 / Math.PI + 180 - 30, 6, 1.8));
          // la cassure : le bois vert ne casse pas net, de longs éclats de fibres dépassent de l'écorce déchirée
          const v = [-g.u[0], -g.u[1]];
          const Pt = (a, b) => [g.B[0] + v[0] * a + nx * b, g.B[1] + v[1] * a + ny * b];
          [[-1, -0.3, 7, -1.1], [0.2, 1, 9, 1.2], [-0.6, 0.2, 11, -0.2], [-0.1, 0.6, 5, 0.5]].forEach(([b0, b1, lg, bt]) =>
            rameau.push(h.path(`M${P(Pt(-0.5, b0 * r))} L${P(Pt(lg, bt * r))} L${P(Pt(-0.5, b1 * r))} Z`, bois)));
          rameau.push(h.path(`M${P(Pt(-1, -r))} L${P(Pt(2.5, -r * 0.7))} L${P(Pt(0.5, -r * 0.2))} L${P(Pt(2, r * 0.4))} L${P(Pt(-0.5, r * 0.8))} L${P(Pt(-3, 0))} Z`, sombre));
          // le point à contrôler : l'odeur de la cassure, sous la narine, chaque fois
          return [rendre('sentir', g.X, z, rameau.join('\n')), h.controle(g.B[0] - 1, g.B[1] + 1, 9)].join('\n');
        },
        renvois: z => {
          const g = geoSentir(z);
          return [{ n: 4, rond: [z.l - 16, z.h * 0.1], cible: [g.B[0] - 3, g.B[1] - 1], texte: 'casser et sentir, chaque fois' }];
        },
      },
      // ── mâcher un bout ────────────────────────────────────────────────────────────────
      macher: {
        titre: 'Mâcher un bout',
        dessin: z => {
          const g = geoMacher(z);
          // la pousse entière : le bout coupé entre les lèvres ; le bout mince, avec ses bourgeons, vers l'avant
          const pts = rameauDroit(g.C, g.D, 3.6, 1.6, 30);
          const rP = t => 3.6 - 2 * t;
          const objet = [tige(pts, rP, { refletDe: 0.45, refletA: 0.9 })];
          const angDe = i => { const a = pts[i - 1], b = pts[Math.min(30, i + 1)]; return Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI; };
          [[16, -1], [21, 1], [26, -1]].forEach(([i, sg]) => {
            const a = angDe(i), rr = rP(i / 30), aR = (a + sg * -90) * Math.PI / 180;
            objet.push(bourgeon(pts[i][0] + Math.cos(aR) * rr * 0.7, pts[i][1] + Math.sin(aR) * rr * 0.7, a + sg * -32, 7, 2.2));
          });
          objet.push(bourgeon(g.D[0] - 1, g.D[1], angDe(30), 7, 1.9));
          return rendre('macher', g.X, z, objet.join('\n'));
        },
        renvois: z => {
          const g = geoMacher(z);
          return [{ n: 5, rond: [z.l - 18, z.h * 0.1], cible: [g.C[0] + 6, g.C[1] + 3], texte: 'mâcher un bout jusqu’à séparer les fibres' }];
        },
      },
      // ── la brosse finie ───────────────────────────────────────────────────────────────
      brosse: {
        titre: 'La brosse',
        dessin: z => {
          const out = [];
          const y0 = z.h * 0.5, xL = 14, xF = 104, xB = 136, xP = z.l - 150, xR = z.l - 12;
          const rG = 14, rD = 12;
          const r = x => rG + (rD - rG) * (x - xB) / (xP - xB) + Math.sin((x - xB) / 37) * 0.5;
          const cy = x => y0 - 4 * Math.sin(Math.PI * (x - xB) / (xP - xB));   // la tige cambre un peu
          // les fibres, écartées en brosse
          graine = 3;
          const nf = 34;
          for (let k = 0; k < nf; k++) {
            const s = -1 + 2 * k / (nf - 1);
            const x0 = xF + 4 + hasard() * 10, yA = y0 + s * rG * 0.85;
            const x1 = xL + hasard() * 18 + Math.abs(s) * 10, y1 = y0 + s * rG * 1.75 + (hasard() - 0.5) * 5;
            const xm = (x0 + x1) / 2, ym = (yA + y1) / 2 + (hasard() - 0.5) * 4;
            out.push(h.path(`M${P([x0, yA])} Q${P([xm + 10, ym - (y1 - yA) * 0.25])} ${P([x1, y1])}`, k % 2 ? A.detail : A.fin));
          }
          // le bois mâché entre l'écorce et les fibres : clair, fendu en long
          out.push(h.path(`M${P([xB + 6, y0 - rG])} L${P([xF + 6, y0 - rG * 0.9])} Q${P([xF - 2, y0])} ${P([xF + 6, y0 + rG * 0.9])} L${P([xB + 6, y0 + rG])} Z`, bois));
          for (const s of [-0.55, -0.15, 0.25, 0.6])
            out.push(h.path(`M${P([xF + 4, y0 + s * rG])} L${P([xB + 2, y0 + s * rG * 1.02])}`, A.fin));
          // l'écorce : du bout mâché, déchiré, jusqu'à la pointe taillée
          const dech = [[xB + 10, y0 - rG], [xB - 4, y0 - rG * 0.75], [xB + 4, y0 - rG * 0.4], [xB - 10, y0 - rG * 0.05], [xB + 2, y0 + rG * 0.3], [xB - 6, y0 + rG * 0.7], [xB + 8, y0 + rG]];
          const rp = r(xP);
          const esc = [[xP, y0 - rp], [xP + 10, y0 - rp * 0.35], [xP + 3, y0 + rp * 0.1], [xP + 16, y0 + rp * 0.55], [xP + 12, y0 + rp]];
          const xs = Array.from({ length: 41 }, (_, i) => xB + 10 + (xP - xB - 10) * i / 40);
          const haut = xs.map(x => [x, cy(x) - r(x)]), bas = xs.map(x => [x, cy(x) + r(x)]).reverse();
          const corps = `M${P(dech[0])} ${haut.map(p => `L${P(p)}`).join(' ')} ${esc.slice(1).map(p => `L${P(p)}`).join(' ')} ${bas.map(p => `L${P(p)}`).join(' ')} ${dech.slice().reverse().slice(1).map(p => `L${P(p)}`).join(' ')} Z`;
          out.push(h.path(corps, sombre));
          // un lambeau d'écorce mâchée qui rebique
          out.push(h.path(`M${P([xB - 2, y0 - rG * 0.72])} Q${P([xB - 14, y0 - rG * 1.3])} ${P([xB - 24, y0 - rG * 1.05])} L${P([xB - 12, y0 - rG * 0.85])} Z`, sombre));
          // le reflet qui fait la tige ronde, en deux traits
          const refl = (a, b) => h.path(ligne(xs.filter(x => x >= a && x <= b).map(x => [x, cy(x) - r(x) * 0.5])), refletFort);
          // les lenticelles de la jeune écorce : de petits traits clairs en travers
          graine = 5;
          for (let k = 0; k < 16; k++) {
            const x = xB + 40 + (xP - xB - 60) * (k + hasard() * 0.6) / 16, v = (hasard() - 0.5) * 1.4 * r(x);
            out.push(h.ligne(f1(x), f1(cy(x) + v - 1.8), f1(x), f1(cy(x) + v + 1.8), `fill="none" stroke="${BLANC}" stroke-width="1.4" stroke-linecap="round"`));
          }
          // un chicot de rameau, coupé ras
          const xc = (xB + xP) * 0.55, yc = cy(xc) - r(xc);
          out.push(h.path(`M${P([xc - 6, yc + 1.5])} L${P([xc + 1, yc - 7])} L${P([xc + 8, yc - 5])} L${P([xc + 7, yc + 1.5])} Z`, sombre));
          out.push(h.path(`M${P([xc + 0.6, yc - 7.3])} Q${P([xc + 5, yc - 9.5])} ${P([xc + 8.2, yc - 5])} Q${P([xc + 4, yc - 3.6])} ${P([xc + 0.6, yc - 7.3])} Z`, bois));
          // la pointe taillée : des facettes de bois clair jusqu'au bout
          const tip = [xR, y0 + 1.5];
          const pointe = `M${P(esc[0])} ${esc.slice(1).map(p => `L${P(p)}`).join(' ')} Q${P([xP + 70, y0 + rp * 0.8])} ${P([xP + 110, y0 + 4])} L${P(tip)} L${P([xP + 104, y0 - 3])} Q${P([xP + 60, y0 - rp * 0.85])} ${P(esc[0])} Z`;
          out.push(h.path(pointe, `fill="${BLANC}" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"`));
          out.push(h.path(`M${P(esc[1])} Q${P([xP + 60, y0 - 3])} ${P([xP + 104, y0 - 1])}`, A.fin));
          out.push(h.path(`M${P(esc[3])} Q${P([xP + 64, y0 + 6])} ${P([xP + 110, y0 + 2.5])}`, A.fin));
          out.push(h.path(`M${P([xP + 104, y0 - 3])} L${P([xP + 110, y0 + 4])}`, A.fin));
          // le contour de l'écorce
          out.push(h.path(`M${P(dech[0])} ${haut.map(p => `L${P(p)}`).join(' ')}`, A.contour));
          out.push(h.path(`M${P([xB + 8, y0 + rG])} ${bas.slice().reverse().map(p => `L${P(p)}`).join(' ')} L${P(esc[4])}`, A.contour));
          // où on recoupe le bout usé
          const xr = xB + 26;
          out.push(h.ligne(xr, f1(cy(xr) - r(xr) - 14), xr, f1(cy(xr) - r(xr) - 3), A.cache));
          out.push(h.ligne(xr, f1(cy(xr) + r(xr) + 3), xr, f1(cy(xr) + r(xr) + 14), A.cache));
          out.push(h.ligne(xr, f1(cy(xr) - r(xr) + 2), xr, f1(cy(xr) + r(xr) - 2), `fill="none" stroke="${BLANC}" stroke-width="0.7" stroke-dasharray="5 3.5"`));
          return out.join('\n');
        },
        renvois: z => {
          const y0 = z.h * 0.5;
          return [
            { n: 6, rond: [40, y0 - 44], cible: [50, y0 - 17] , texte: 'le bout en brosse : dents et gencive' },
            { n: 7, rond: [196, y0 - 42], cible: [162, y0 - 28], texte: 'recouper le bout usé, en refaire un neuf' },
            { n: 8, rond: [z.l - 70, y0 + 40], cible: [z.l - 80, y0 + 5], texte: 'pointe taillée au couteau, entre les dents' },
          ];
        },
      },
    },
    danger: 'Danger — un rameau cassé qui sent l’amande forte et amère est du cerisier de Pennsylvanie : broyé sous la dent, il se change en cyanure. '
      + 'On le jette, et on ne recoupe pas sur cet arbre. Un rameau qui goûte le thé des bois est du bouleau jaune : pas pour un enfant. '
      + 'Jamais de cèdre (thuya), dont la thuyone est convulsivante, ni d’if du Canada ; pas de saule pour un enfant.',
  };
};
