// Planche 27-05 — La brosse de branche (chapitre 27, « La brosse qui s'use, et celle qu'on fait »).
// La pousse de bouleau à papier (écorce foncée, pas blanche), le rameau cassé qu'on sent avant
// de mâcher, le bout mâché, et la brosse finie : un bout en brosse, l'autre taillé en pointe.
// Aucune cote : le chapitre ne donne ni longueur ni diamètre.
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
  const TE = 0.56;   // l'échelle des deux têtes et de la main
  // pseudo-hasard stable
  let graine = 7;
  const hasard = () => { graine = (graine * 9301 + 49297) % 233280; return graine / 233280; };

  return {
    ref: '27-05',
    titre: 'La brosse de branche',
    desc: 'Une tige de bouleau à papier à l’écorce blanche, d’où sort une jeune pousse à l’écorce foncée, presque noire, avec le trait où la couper. '
      + 'Une tête de profil qui sent un rameau cassé tenu entre le pouce et l’index, puis la même qui mâche le bout coupé de la pousse, tenu entre les lèvres. '
      + 'En bas, la brosse finie, couchée : un bout mâché jusqu’à ce que les fibres s’écartent en brosse, le trait où on le recoupe quand il est usé, '
      + 'et l’autre bout taillé en pointe au couteau pour passer entre les dents.',
    format: 'pleine',
    disposition: [['pousse', 'sentir', 'macher'], ['brosse']],
    hauteurs: [1.4, 0.8],
    largeurs: [[0.64, 1.1, 1], [1]],
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
          const e = TE, E = [z.l * 0.26, z.h * 0.34];
          const T = (p) => [E[0] + p[0] * e, E[1] + p[1] * e];
          const out = [F.tete({ x: E[0], y: E[1], echelle: e })];
          // le rameau cassé : le bout cassé sous la narine, l'autre bout dans la main
          const th = 66, c = Math.cos(th * Math.PI / 180), s = Math.sin(th * Math.PI / 180);
          const u = [-(0.952 * c - 0.305 * s), -(0.952 * s + 0.305 * c)];   // du pincé vers le nez
          const B = T([138, 50]);
          const Pp = [B[0] - u[0] * 30, B[1] - u[1] * 30];
          const Q = [Pp[0] - u[0] * 26, Pp[1] - u[1] * 26];
          const nx = -u[1], ny = u[0];
          const pts = Array.from({ length: 13 }, (_, i) => {
            const t = i / 12;
            return [Q[0] + (B[0] - Q[0]) * t + nx * Math.sin(t * Math.PI) * 1.5, Q[1] + (B[1] - Q[1]) * t + ny * Math.sin(t * Math.PI) * 1.5];
          });
          const r = 2.8;
          const rameau = [tige(pts, t => r + 0.4 * (1 - t), { refletDe: 0.55, refletA: 0.9 })];
          // un bourgeon sur le bout qu'on tient
          rameau.push(bourgeon(pts[3][0] + nx * 2, pts[3][1] + ny * 2, Math.atan2(u[1], u[0]) * 180 / Math.PI + 30, 6, 1.8));
          // la cassure : des éclats de bois clair qui dépassent de l'écorce déchirée
          const Pt = (a, b) => [B[0] + u[0] * a + nx * b, B[1] + u[1] * a + ny * b];
          // le bois vert ne casse pas net : de longs éclats de fibres dépassent de l'écorce déchirée
          [[-1, -0.3, 9, -1.1], [0.2, 1, 12, 1.2], [-0.6, 0.2, 16, -0.2], [-0.1, 0.6, 7, 0.5]].forEach(([b0, b1, lg, bt]) =>
            rameau.push(h.path(`M${P(Pt(-0.5, b0 * r))} L${P(Pt(lg, bt * r))} L${P(Pt(-0.5, b1 * r))} Z`, bois)));
          rameau.push(h.path(`M${P(Pt(-1, -r))} L${P(Pt(2.5, -r * 0.7))} L${P(Pt(0.5, -r * 0.2))} L${P(Pt(2, r * 0.4))} L${P(Pt(-0.5, r * 0.8))} L${P(Pt(-3, 0))} Z`, sombre));
          out.push(F.main({ x: Pp[0], y: Pp[1], pose: 'pince', vue: 'profil', cote: 'gauche', angle: th, echelle: e, bras: 22, objet: rameau.join('\n') }));
          return out.join('\n');
        },
        renvois: z => {
          const E = [z.l * 0.26, z.h * 0.34], B = [E[0] + 138 * TE, E[1] + 50 * TE];
          return [{ n: 4, rond: [z.l - 16, z.h * 0.12], cible: [B[0] + 6, B[1] - 3], texte: 'casser et sentir, chaque fois' }];
        },
      },
      // ── mâcher un bout ────────────────────────────────────────────────────────────────
      macher: {
        titre: 'Mâcher un bout',
        dessin: z => {
          const e = TE, E = [z.l * 0.3, z.h * 0.34];
          const T = (p) => [E[0] + p[0] * e, E[1] + p[1] * e];
          const out = [F.tete({ x: E[0], y: E[1], echelle: e })];
          // la pousse entière : le bout coupé entre les lèvres ; le bout mince,
          // avec ses bourgeons, vers l'avant
          const C = T([103, 47]), D = [z.l - 6, C[1] + z.h * 0.3];
          const pts = cub(C, [C[0] + 40, C[1] + 8], [D[0] - 50, D[1] - 34], D, 30);
          const rP = t => 3.8 - 2.4 * t;
          out.push(tige(pts, rP, { refletDe: 0.12, refletA: 0.8 }));
          const angDe = i => { const a = pts[i - 1], b = pts[Math.min(30, i + 1)]; return Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI; };
          [[11, -1], [18, 1], [24, -1]].forEach(([i, sg]) => {
            const a = angDe(i), rr = rP(i / 30), aR = (a + sg * -90) * Math.PI / 180;
            out.push(bourgeon(pts[i][0] + Math.cos(aR) * rr * 0.7, pts[i][1] + Math.sin(aR) * rr * 0.7, a + sg * -32, 7, 2.2));
          });
          out.push(bourgeon(D[0] - 1, D[1], angDe(30), 7, 1.9));
          // la fente des lèvres, du coin de la bouche jusqu'à la pousse
          const K = T([82, 45]);
          out.push(h.path(`M${P(K)} Q${P(T([92, 48]))} ${P(T([101, 47]))}`, A.detail));
          return out.join('\n');
        },
        renvois: z => {
          const E = [z.l * 0.3, z.h * 0.34], C = [E[0] + 103 * TE, E[1] + 47 * TE];
          return [{ n: 5, rond: [C[0] + 46, C[1] - 34], cible: [C[0] + 14, C[1] + 1], texte: 'mâcher un bout jusqu’à séparer les fibres' }];
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
