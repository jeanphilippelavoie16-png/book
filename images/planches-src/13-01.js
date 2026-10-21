// Planche 13-01 — l'arc à feu : la planchette vue de dessus, le foret, le palier en coupe, puis le geste.
//
// Refaite le 16 octobre 2026 (règles 10 et 11, et les repères dans l'ordre des gestes du texte) :
// - le geste se montre avec le corps (règle 2 : « enlever la main n'est pas la réponse ») : une personne à genou,
//   de profil (le corps simple, h.formes.corps), le pied loin posé sur la planchette, la main loin à plat sur le
//   palier, le poignet calé contre le tibia, la main proche qui tient l'arc par le bout. Le nid d'amadou sous
//   l'encoche et le pied sur la planchette viennent de la source (sources/43b-us-army-fm3-05-70-survival-2002-texte.txt,
//   7-30 : « place a bundle of tinder under the V-shaped cut », « place one foot on the fire board ») ;
// - les cotes : celles du chapitre (planchette d'environ 10 cm de large, foret d'environ 25 cm), sourcées FM 21-76
//   (sources/17-us-army-fm21-76-feu.md) ; les vues de la planchette et du foret sont à l'échelle de leur cote ;
// - le rouge : la pointe de l'encoche au centre de la cavité (repère 3), la poussée sur le palier (13) et le
//   va-et-vient de l'arc (14), chacun avec son repère. La flèche de la poussée dans la coupe du palier est retirée
//   (la coupe montre la pièce, le geste est dans la vue du bas).

module.exports = (h) => {
  const F = h.formes, A = h.a;
  const blanc = a => a.replace('fill="none"', 'fill="#ffffff"');
  const axe = `${A.fin} stroke-dasharray="9 3 2 3"`;
  const f = v => Math.round(v * 10) / 10;
  const gen = s => { let g = s; return () => (g = (g * 16807) % 2147483647) / 2147483647; };

  // Courbe lisse (Catmull-Rom) passant par chaque point.
  const lisse = (pts, ferme) => {
    const n = pts.length;
    const p = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
    const segs = ferme ? n : n - 1;
    for (let i = 0; i < segs; i++) {
      const p0 = p(i - 1), p1 = p(i), p2 = p(i + 1), p3 = p(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  const dep = (x, y, pts) => pts.map(([u, v]) => [x + u, y + v]);

  // Une touffe de fibres (le nid d'amadou) : contour ébouriffé, brins fins, mèches qui dépassent.
  const touffe = (cx, cy, rx, ry, graine, sol) => {
    const r = gen(graine), out = [], pts = [], n = 22;
    for (let k = 0; k < n; k++) {
      const a = k / n * 2 * Math.PI, j = 0.88 + r() * 0.2;
      let y = cy + Math.sin(a) * ry * j;
      if (sol !== undefined && y > sol) y = sol;
      pts.push([cx + Math.cos(a) * rx * j, y]);
    }
    out.push(h.path(lisse(pts, true), blanc(A.arete)));
    let brins = '';
    for (let i = 0; i < Math.round(rx * ry / 22); i++) {
      const t = Math.sqrt(r()) * 0.75, a = r() * 2 * Math.PI;
      const x = cx + Math.cos(a) * rx * t, y = cy + Math.sin(a) * ry * t;
      if (sol !== undefined && y > sol - 2) continue;
      const L = 5 + r() * 7, o = (r() - 0.5) * 1.2, dx = Math.cos(o) * L, dy = Math.sin(o) * L * 0.5;
      brins += `M ${f(x - dx / 2)} ${f(y - dy / 2)} Q ${f(x)} ${f(y + (r() - 0.5) * 4)} ${f(x + dx / 2)} ${f(y + dy / 2)} `;
    }
    out.push(h.path(brins, A.fin));
    let meches = '';
    pts.forEach(([x, y], k) => {
      if (k % 2 || (sol !== undefined && y >= sol - 1)) return;
      const vx = x - cx, vy = y - cy, L = Math.hypot(vx, vy) || 1, e = 2.5 + r() * 3;
      meches += `M ${f(x)} ${f(y)} q ${f(vx / L * e)} ${f(vy / L * e)} ${f(vx / L * e * 1.6)} ${f(vy / L * e * 1.6 + 1)} `;
    });
    out.push(h.path(meches, A.fin));
    return out.join('\n');
  };
  // La poussière noire : un semis de grains dans une forme donnée par un test.
  const poussiere = (x0, y0, x1, y1, dedans, n, graine, rr = 1.3) => {
    const r = gen(graine), out = [];
    let k = 0;
    while (out.length < n && k++ < n * 40) {
      const p = [x0 + r() * (x1 - x0), y0 + r() * (y1 - y0)];
      if (dedans(p)) out.push(h.cercle(f(p[0]), f(p[1]), rr, A.plein));
    }
    return out.join('\n');
  };

  // ─── La planchette, vue de dessus, à l'échelle de sa cote (100 mm de large) ──────────────────────────
  const T225 = Math.tan(22.5 * Math.PI / 180);
  const dessus = z => {
    const k = Math.min(1.9, (z.h - 44) / 100);          // unités de vue par mm
    const yT = 6, yE = yT + 100 * k;                    // bord loin, bord de l'encoche
    const cx = Math.round(z.l * 0.36), cy = yE - 20 * k, r = 10 * k;   // la cavité : 20 mm du bord, 20 mm de large
    const hw = (yE - cy) * T225;                        // demi-ouverture de l'encoche au bord
    return { k, yT, yE, cx, cy, r, hw, xg: 14, xd: z.l - 80 };
  };

  // ─── Le foret, debout, à l'échelle de sa cote (250 mm) ─────────────────────────────────────────────
  const foret = z => {
    const k = (z.h - 22) / 250, L = 250 * k, R = 10 * k;
    const x = 40, yH = 8, yB = yH + L;
    return { k, L, R, x, yH, yB };
  };

  // ─── Le palier en coupe ────────────────────────────────────────────────────────────────────────────
  const palier = z => {
    const px = Math.round(z.l * 0.46), pc = 52, yc = pc + 32;   // yc : bas du nœud, centre du creux
    const fb = z.h - 14;
    return { px, pc, yc, fb, rc: 22, rf: 19, yArr: Math.round((yc + fb) / 2) + 12 };
  };

  // ─── Le geste : le corps simple à genou, de profil ─────────────────────────────────────────────────
  const geste = z => {
    const E = Math.min(0.38, (z.l - 10) / 1480);         // unités de vue par mm : la personne entre dans la vue
    const BRAS = 325 * E, AVB = 255 * E, MP = 74 * E;
    const ik = (S, W, signe = 1) => {                    // l'épaule S, le poignet W : les angles du bras et de l'avant-bras
      const dx = W[0] - S[0], dy = W[1] - S[1], d = Math.min(Math.hypot(dx, dy), BRAS + AVB - 0.5);
      const a = Math.atan2(dx, dy);
      const c = Math.acos(Math.max(-1, Math.min(1, (BRAS * BRAS + d * d - AVB * AVB) / (2 * BRAS * d))));
      const ab = a + signe * c;
      const C = [S[0] + BRAS * Math.sin(ab), S[1] + BRAS * Math.cos(ab)];
      return [ab * 180 / Math.PI, Math.atan2(W[0] - C[0], W[1] - C[1]) * 180 / Math.PI];
    };
    const G = z.h - 26, EP = 25 * E, LF = 250 * E, DF = 20 * E;
    const base = { x: 640 * E, y: G, pose: 'genou', echelle: E, mains: { P: 'prise', L: 'plat' }, ancrer: false };
    const ang = { tronc: 56, cou: 52, tete: 52, cuisseL: 90, jambeL: 4, piedL: 90 };
    // le pied loin posé à plat sur la planchette : la cuisse levée juste ce qu'il faut
    const basL = a => F.corps({ ...base, angles: { ...ang, cuisseL: a } }).pieds.L.bas[1];
    let lo = 70, hi = 110;
    for (let i = 0; i < 18; i++) { const m = (lo + hi) / 2; ((basL(m) - (G - EP)) * (basL(lo) - (G - EP)) <= 0) ? hi = m : lo = m; }
    ang.cuisseL = (lo + hi) / 2;
    const c0 = F.corps({ ...base, angles: ang });
    const S = c0.articulations.epaule, Ch = c0.articulations.chevilleL;
    const xF = Ch[0] + 50 * E;                            // le foret, contre le cou-de-pied
    const yB = G - EP, yH = yB - LF;                      // bas et haut du foret
    const yP = yH - 14 * E;                               // le dessus du palier
    const yC = yB - 0.42 * LF;                            // la corde
    const xMain = xF - 260 * E;                           // la main proche, sur le bout de l'arc
    const [bL, aL] = ik(S, [xF - MP + 4, yP - 4], -1), [bP, aP] = ik(S, [xMain, yC - MP], 1);
    const angles = { ...ang, brasL: bL, avantbrasL: aL, mainL: 92, brasP: bP, avantbrasP: aP, mainP: 0 };
    const xl = xMain - 6, xr = xF + 330 * E, B = 62 * E, yb = yC + 4;  // l'arc : ses deux bouts, sa flèche
    const x0 = xF - 240 * E, x1 = xF + 140 * E, ox = 36 * E, oy = -21 * E;   // la planchette, le dessus en fuite
    return { E, G, EP, LF, DF, base, angles, xF, yB, yH, yP, yC, xMain, xl, xr, B, yb, x0, x1, ox, oy, Ch };
  };

  // ─── Le détail : le foret monté, de près (même dessin que le geste, plus grand) ──────────────────────
  const detail = z => {
    const s = Math.min(1.2, (z.h - 30) / 320);            // unités de vue par mm
    const G = z.h - 18, EP = 25 * s, LF = 250 * s, DF = 20 * s;
    const xF = Math.round(z.l * 0.5), yB = G - EP, yH = yB - LF, yP = yH - 14 * s, yC = yB - 0.42 * LF;
    return { s, G, EP, LF, DF, xF, yB, yH, yP, yC };
  };

  // Le foret monté, dans une vue : le nid sous l'encoche, la planchette, la poussière, l'arc (sa baguette derrière le
  // foret), la corde enroulée d'un tour, le foret, le palier. Toutes les tailles en mm × s.
  const monte = o => {
    const { s, G, EP, DF, xF, yB, yH, yP, yC, xl, xr, B, yb, x0, x1, ox, oy, coupe } = o;
    const out = [];
    const hw = 9 * s;                                     // la demi-largeur de l'encoche, sur la face
    // la planchette : le dessus en fuite, le bout (sauf quand elle sort de la vue), la face fendue par l'encoche
    if (coupe) {
      // la planchette sort de la vue des deux côtés : des traits de coupure à ses deux bouts
      const xa = x0 + 8, xb = x1 - 8, yh = yB + oy;
      out.push(h.rect(xa, yh, xb - xa, G - yh, A.blanc));
      out.push(h.ligne(xa, yh, xb, yh, A.arete), h.ligne(xa, yB, xF - hw, yB, A.contour), h.ligne(xF + hw, yB, xb, yB, A.contour));
      out.push(h.ligne(xF - hw, yB, xF - hw, G, A.contour), h.ligne(xF + hw, yB, xF + hw, G, A.contour));
      for (const x of [xa, xb]) {
        const m = (yh + G) / 2;
        out.push(h.chemin([[x, yh], [x, m - 7], [x - 5, m - 2], [x + 5, m + 3], [x, m + 8], [x, G]], A.arete));
      }
    } else {
      out.push(h.chemin([[x0, yB], [x1, yB], [x1 + ox, yB + oy], [x0 + ox, yB + oy]], blanc(A.contour), true));
      out.push(h.chemin([[x1, yB], [x1 + ox, yB + oy], [x1 + ox, G + oy], [x1, G]], A.hachure('bois', 'contour'), true));
      out.push(h.rect(x0, yB, xF - hw - x0, EP, blanc(A.contour)), h.rect(xF + hw, yB, x1 - xF - hw, EP, blanc(A.contour)));
    }
    for (const t of [0.4, 0.72]) {
      out.push(h.ligne(x0 + 16, yB + t * EP, xF - hw - 8 * s, yB + t * EP, A.detail));
      out.push(h.ligne(xF + hw + 8 * s, yB + t * EP, x1 - 16, yB + t * EP, A.detail));
    }
    // la poussière noire, dans l'encoche
    out.push(h.rect(xF - hw, yB + 4 * s, 2 * hw, G - yB - 4 * s, A.plein));
    // le nid, glissé sous l'encoche, qui dépasse devant la planchette ; la poussière tombée dessus
    out.push(touffe(xF + 3 * s, G - 7 * s, 58 * s, 11 * s, 5, G));
    out.push(h.path(`M ${f(xF - hw - 18 * s)} ${f(G - 9 * s)} Q ${f(xF)} ${f(G - 24 * s)} ${f(xF + hw + 18 * s)} ${f(G - 9 * s)} Z`, A.plein));
    // l'arc : la baguette passe derrière le foret
    const xm = (xl + xr) / 2, e = Math.max(2.2, 9 * s);
    if (coupe) {
      const haut = `M ${f(xl)} ${f(yb - e)} Q ${f(xm)} ${f(yb - 2 * B - e)} ${f(xr)} ${f(yb - e)}`, bas = `M ${f(xl)} ${f(yb + e)} Q ${f(xm)} ${f(yb - 2 * B + e)} ${f(xr)} ${f(yb + e)}`;
      out.push(h.path(`${haut} L ${f(xr)} ${f(yb + e)} Q ${f(xm)} ${f(yb - 2 * B + e)} ${f(xl)} ${f(yb + e)} Z`, A.blanc), h.path(haut, A.contour), h.path(bas, A.contour));
    } else {
      out.push(h.path(`M ${f(xl)} ${f(yb - e)} Q ${f(xm)} ${f(yb - 2 * B - e)} ${f(xr)} ${f(yb - e)} A ${f(e)} ${f(e)} 0 0 1 ${f(xr)} ${f(yb + e)} Q ${f(xm)} ${f(yb - 2 * B + e)} ${f(xl)} ${f(yb + e)} A ${f(e)} ${f(e)} 0 0 1 ${f(xl)} ${f(yb - e)} Z`, blanc(A.contour)));
    }
    // les deux brins de la corde, de chaque bout de l'arc jusqu'au foret
    out.push(h.ligne(coupe ? xl : xl + e, coupe ? yb + 0.6 * e : yb + 0.4 * e, xF - DF / 2, yC - 8 * s, A.arete));
    out.push(h.ligne(xF + DF / 2, yC + 12 * s, coupe ? xr : xr - e, coupe ? yb + 0.6 * e : yb + 0.4 * e, A.arete));
    // le foret, de la cavité au palier, et le tour de corde qui passe devant lui
    out.push(h.rect(xF - DF / 2, yH, DF, yB + 4 * s - yH, blanc(A.contour)));
    if (s > 0.6) out.push(h.ligne(xF + 3 * s, yH + 30 * s, xF + 3 * s, yC - 20 * s, A.detail), h.ligne(xF + 3 * s, yC + 26 * s, xF + 3 * s, yB - 20 * s, A.detail));
    out.push(h.ligne(xF + DF / 2, yC - 8 * s, xF - DF / 2, yC + 12 * s, A.arete));
    // le palier, un nœud de bois dur, sous la paume
    out.push(h.path(lisse(dep(xF, yP + 16 * s, [[-37, 3], [-32, -11], [-13, -18], [10, -20], [32, -13], [39, 0], [32, 13], [8, 17], [-18, 16]].map(([u, v]) => [u * s, v * s])), true), blanc(A.contour)));
    return out.join('\n');
  };

  return {
    ref: '13-01',
    titre: 'L’arc à feu',
    desc: 'En haut, les pièces. La planchette vue de dessus, environ 100 mm de large : la cavité creusée à 2 cm du bord, et l’encoche en V taillée du bord jusqu’au centre de la cavité, cerclée de rouge ; dans l’encoche et sur le nid glissé dessous, la poussière noire. Le foret, environ 250 mm, le bout du haut arrondi, le bout du bas plat. Le palier en coupe : un nœud de bois dur creusé, le creux graissé où tourne le haut du foret. En bas, le geste, de profil : une personne à genou, un pied posé sur la planchette, le nid d’amadou sous l’encoche ; la main du côté loin à plat sur le palier, le poignet calé contre le tibia, une flèche rouge vers le bas : appuyer ; l’autre main tient l’arc par le bout, la corde enroulée d’un tour autour du foret, une double flèche rouge : l’arc va et vient.',
    format: 'pleine',
    disposition: [['dessus', 'foret', 'palier'], ['geste', 'detail']],
    hauteurs: [1.4, 1.55],
    largeurs: [[1.45, 0.75, 1], [1.75, 1]],
    vues: {
      dessus: {
        titre: 'La planchette, de dessus',
        dessin: z => {
          const { k, yT, yE, cx, cy, r, hw, xg, xd } = dessus(z);
          const out = [];
          const ym = (yT + yE) / 2;
          // le nid glissé sous l'encoche : il dépasse du bord ; la planchette, blanche, le cache dessous
          out.push(touffe(cx + 4, yE + 6, 38, 15, 5));
          out.push(h.chemin([[xg, yT], [xd, yT], [xd, yE], [cx + hw, yE], [cx, cy], [cx - hw, yE], [xg, yE]], A.blanc, true));
          // le fil du bois, interrompu autour de la cavité et des pastilles
          const pastilles = [[cx + 60, cy - 40], [cx + 66, yT + 18]];
          const fil = (xa, xb, y) => {
            const trous = pastilles.filter(([, py]) => Math.abs(py - y) < 13).map(([px]) => [px - 15, px + 15]);
            let x = xa;
            for (const [ta, tb] of trous.sort((m, n) => m[0] - n[0])) {
              if (tb < x || ta > xb) continue;
              if (ta > x) out.push(h.ligne(x, y, ta, y, A.detail));
              x = Math.max(x, tb);
            }
            if (x < xb) out.push(h.ligne(x, y, xb, y, A.detail));
          };
          for (const t of [0.16, 0.36, 0.58, 0.9]) {
            const y = yT + t * (yE - yT), dy = Math.abs(y - cy);
            if (dy < r + 6) {
              const g = Math.sqrt((r + 6) ** 2 - dy ** 2);
              fil(xg + 14, cx - Math.max(g, (y - cy) * T225 + 6), y);
              fil(cx + Math.max(g, (y - cy) * T225 + 6), xd - 14, y);
            } else fil(xg + 14, xd - 14, y);
          }
          // les bords, et les coupures aux deux bouts
          out.push(h.ligne(xg, yT, xd, yT, A.contour));
          out.push(h.ligne(xg, yE, cx - hw, yE, A.contour), h.ligne(cx + hw, yE, xd, yE, A.contour));
          for (const x of [xg, xd]) out.push(h.chemin([[x, yT], [x, ym - 9], [x - 6, ym - 3], [x + 6, ym + 3], [x, ym + 9], [x, yE]], A.arete));
          // la cavité, entamée par l'encoche
          const pt = (rr, deg) => [cx + rr * Math.cos(deg * Math.PI / 180), cy + rr * Math.sin(deg * Math.PI / 180)];
          const a1 = pt(r, 90 + 22.5 + 8), a2 = pt(r, 90 - 22.5 - 8);
          out.push(h.path(`M ${f(a1[0])} ${f(a1[1])} A ${f(r)} ${f(r)} 0 1 1 ${f(a2[0])} ${f(a2[1])}`, A.arete));
          // l'encoche : deux flancs qui se rejoignent au centre de la cavité
          out.push(h.chemin([[cx - hw, yE], [cx, cy], [cx + hw, yE]], A.contour));
          // les axes de la cavité : la pointe de l'encoche tombe à leur croisement
          out.push(h.ligne(cx - r - 12, cy, cx + r + 12, cy, axe), h.ligne(cx, cy - r - 12, cx, cy + 3, axe));
          // la poussière noire dans l'encoche, et tombée sur le nid à la sortie
          out.push(poussiere(cx - hw, cy + 0.3 * r, cx + hw, yE, ([x, y]) => Math.abs(x - cx) < (y - cy) * T225 - 1.5, 20, 7, 1.1));
          out.push(poussiere(cx - 22, yE + 1, cx + 22, yE + 16, ([x, y]) => ((x - cx) / 22) ** 2 + ((y - yE - 2) / 13) ** 2 < 1, 36, 9, 1.2));
          // le point à contrôler : la pointe de l'encoche au centre de la cavité
          out.push(h.controle(cx, cy, 6));
          // la cote : la largeur de la planchette
          out.push(h.cote(xd + 14, yT, xd + 14, yE, '≈ 100 mm', { cote: 'droite' }));
          return out.join('\n');
        },
        renvois: z => {
          const { yT, yE, cx, cy, r, hw } = dessus(z);
          return [
            { n: 1, rond: [cx + 66, yT + 18], cible: [cx + 50, yT + 0.36 * (yE - yT)], texte: 'planchette, bois tendre sec' },
            { n: 2, rond: [cx + 60, cy - 40], cible: [cx + r * Math.cos(-0.9), cy + r * Math.sin(-0.9)], texte: 'cavité, à 2 cm du bord' },
            { n: 3, rond: [cx - 64, cy - 34], cible: [cx - 5, cy - 4], texte: 'l’encoche finit au centre' },
            { n: 15, rond: [cx - 68, yE + 4], cible: [cx - 16, yE + 6], texte: 'la poussière noire fume' },
          ];
        },
      },

      foret: {
        titre: 'Le foret',
        dessin: z => {
          const { R, x, yH, yB } = foret(z);
          const out = [];
          // le bout du haut arrondi, le bout du bas plat, le fil du bois
          out.push(h.path(`M ${f(x - R)} ${f(yB)} L ${f(x - R)} ${f(yH + R)} A ${f(R)} ${f(R)} 0 0 1 ${f(x + R)} ${f(yH + R)} L ${f(x + R)} ${f(yB)} Z`, blanc(A.contour)));
          out.push(h.ligne(x - 2, yH + 3 * R, x - 2, yB - 40, A.detail), h.ligne(x + 3, yH + 30, x + 3, yB - 12, A.detail));
          out.push(h.cote(x + R + 10, yH, x + R + 10, yB, '≈ 250 mm', { cote: 'droite' }));
          return out.join('\n');
        },
        renvois: z => {
          const { R, x, yH, yB } = foret(z);
          return [
            { n: 4, rond: [12, (yH + yB) / 2 + 30], cible: [x - R, (yH + yB) / 2 + 30], texte: 'foret de bois dur, sec, droit' },
            { n: 5, rond: [12, yH + 22], cible: [x - R * 0.8, yH + R * 0.5], texte: 'bout du haut arrondi' },
            { n: 6, rond: [12, yB - 12], cible: [x - R, yB - 2], texte: 'bout du bas plat' },
          ];
        },
      },

      palier: {
        titre: 'Le palier, en coupe',
        dessin: z => {
          const { px, pc, yc, fb, rc, rf, yArr } = palier(z);
          const out = [];
          // le nœud de bois dur, en coupe
          out.push(h.path(lisse(dep(px, pc, [[-75, 6], [-70, -16], [-50, -32], [-18, -36], [16, -35], [48, -30], [70, -16], [76, 4], [66, 24], [40, 31], [rc, 32], [-rc, 32], [-40, 31], [-64, 24]]), true), A.hachure('bois', 'contour')));
          out.push(h.path(`M ${px - rc} ${yc + 1} A ${rc} ${rc} 0 0 1 ${px + rc} ${yc + 1} Z`, A.blanc));
          // le haut du foret, arrondi, dans le creux
          out.push(h.path(`M ${px - rf} ${fb} L ${px - rf} ${yc} A ${rf} ${rf} 0 0 1 ${px + rf} ${yc} L ${px + rf} ${fb}`, blanc(A.contour)));
          out.push(h.ligne(px - 7, yc + 10, px - 7, fb - 10, A.detail));
          out.push(h.ligne(px + 8, yc + 18, px + 8, fb - 8, A.detail));
          out.push(h.chemin([[px - rf, fb], [px - 6, fb - 5], [px + 6, fb + 5], [px + rf, fb]], A.arete));
          // il tourne
          out.push(h.path(`M ${px - rf - 8} ${yArr} A ${rf + 8} 7 0 0 0 ${px + rf + 8} ${yArr}`, A.fin));
          out.push(h.fleche(`M ${px + rf + 2} ${yArr + 5} L ${px + rf + 9} ${yArr - 1}`, A.fin));
          out.push(h.path(`M ${px - rc} ${yc} A ${rc} ${rc} 0 0 1 ${px + rc} ${yc}`, A.contour));
          // la graisse entre le creux et le haut du foret
          out.push(h.path(`M ${px - rc} ${yc} A ${rc} ${rc} 0 0 1 ${px + rc} ${yc} L ${px + rf} ${yc} A ${rf} ${rf} 0 0 0 ${px - rf} ${yc} Z`, A.plein));
          return out.join('\n');
        },
        renvois: z => {
          const { px, pc, yc } = palier(z);
          return [
            { n: 7, rond: [px + 70, 12], cible: [px + 44, pc - 30], texte: 'palier : nœud, galet ou os' },
            { n: 8, rond: [px + 70, yc + 30], cible: [px + 21, yc + 1], texte: 'creux graissé : suif, gomme' },
          ];
        },
      },

      geste: {
        titre: 'Le geste',
        dessin: z => {
          const g = geste(z), { E, G, xF, yB, yP, xr, B, yb } = g;
          const c = F.corps({ ...g.base, angles: g.angles, objetP: monte({ ...g, s: E }) });
          const out = [String(c)];
          out.push(h.rect(0, G, z.l, 8, A.hachure('terre', 'aucun')), h.ligne(0, G, z.l, G, A.arete));
          // appuyer sur le palier, et faire aller l'arc
          out.push(h.geste(`M ${f(xF + 30)} ${f(yP - 54)} L ${f(xF + 30)} ${f(yP - 18)}`));
          out.push(h.geste(`M ${f(xF + 36)} ${f(yb - 2 * B - 26)} L ${f(xr + 6)} ${f(yb - 2 * B - 26)}`, { double: true }));
          return out.join('\n');
        },
        renvois: z => {
          const g = geste(z), { G, xF, yB, yP, xl, xr, B, yb, Ch } = g;
          const xm = (xl + xr) / 2;
          return [
            { n: 9, rond: [xr - 6, yb + 30], cible: [xr - 18, yb - 2], texte: 'arc vert, corde sans mou' },
            { n: 11, rond: [Ch[0] - 52, yB - 18], cible: [Ch[0] - 14, yB - 4], texte: 'un pied sur la planchette' },
            { n: 13, rond: [xF + 2, yP - 60], cible: [xF + 22, yP - 46], texte: 'appuyer sur le palier' },
            { n: 14, rond: [xr, yb - 2 * B - 56], cible: [xr - 12, yb - 2 * B - 26], texte: 'aller et venir, puis plus vite' },
          ];
        },
      },

      detail: {
        titre: 'Le foret monté, de près',
        dessin: z => {
          const d = detail(z), { s, G, xF } = d;
          // l'arc et la planchette sortent de la vue des deux côtés : on n'en montre que le milieu
          const o = { ...d, xl: 0, xr: z.l, B: 7 * s, yb: d.yC + 8 * s, x0: 0, x1: z.l, ox: 0, oy: -18 * s, coupe: true };
          const out = [`<clipPath id="vue-detail-1301"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`,
            `<g clip-path="url(#vue-detail-1301)">`, monte(o), '</g>'];
          out.push(h.rect(0, G, z.l, 8, A.hachure('terre', 'aucun')), h.ligne(0, G, z.l, G, A.arete));
          return out.join('\n');
        },
        renvois: z => {
          const { s, G, xF, yC, DF, yB } = detail(z);
          return [
            { n: 10, rond: [xF + 62 * s, G - 52 * s], cible: [xF + 32 * s, G - 10 * s], texte: 'un nid sous l’encoche' },
            { n: 12, rond: [xF - 64 * s, yC + 46 * s], cible: [xF - 4 * s, yC + 6 * s], texte: 'un tour de corde au foret' },
          ];
        },
      },
    },
  };
};
