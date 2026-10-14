// Planche 111-11 — La forge de fosse (ch. 88, variante d'urgence : « Le foyer : un trou et un tuyau »).
// Coupe et raté au même cadrage ; plan pour le trajet du tuyau ; la rigole en coupe le long de la paroi.
module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const dOf = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ');
  const quad = (a, c, b, n = 16) => Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, u = 1 - t;
    return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
  });
  const alea = (g) => { let s = g; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  const blanc = at => at.replace('fill="none"', 'fill="#fff"');
  const axe = h.a.fin + ' stroke-dasharray="14 3 2 3"';
  const dansPoly = (p, poly) => {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > p[1]) !== (yj > p[1]) && p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  const distSeg = (p, a, b) => {
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)));
    return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
  };
  const distPoly = (p, pts) => { let m = Infinity; for (let i = 1; i < pts.length; i++) m = Math.min(m, distSeg(p, pts[i - 1], pts[i])); return m; };
  const le = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

  // Un tuyau vu en long : bande blanche qui masque ce qu'elle traverse, deux parois.
  const tube = (A, B, r, cache = false) => {
    const L = Math.hypot(B[0] - A[0], B[1] - A[1]);
    const n = [-(B[1] - A[1]) / L * r, (B[0] - A[0]) / L * r];
    const p1 = [A[0] + n[0], A[1] + n[1]], p2 = [B[0] + n[0], B[1] + n[1]];
    const p3 = [B[0] - n[0], B[1] - n[1]], p4 = [A[0] - n[0], A[1] - n[1]];
    if (cache) return [h.chemin([p1, p2], h.a.cache), h.chemin([p4, p3], h.a.cache)].join('\n');
    return [h.chemin([p1, p2, p3, p4], h.a.blanc, true), h.chemin([p1, p2], h.a.contour), h.chemin([p4, p3], h.a.contour)].join('\n');
  };

  // ─── Le trou en coupe : même cadrage pour le bon et le raté ───
  const trou = (z) => {
    const W = Math.min(z.l * 0.45, 132), D = W * 0.7, b = W * 0.32, e = 8;
    const cx = z.l * 0.49, yG = z.h * 0.44;
    const N = 24;
    const gauche = (w, d, bb) => Array.from({ length: N + 1 }, (_, i) => {
      const t = i / N; return [cx - (bb / 2 + (w / 2 - bb / 2) * Math.pow(1 - t, 1.7)), yG + d * t];
    });
    const miroir = pts => pts.map(([x, y]) => [2 * cx - x, y]).reverse();
    const inG = gauche(W, D, b), outG = gauche(W + 2.6 * e, D + e, b + 2 * e);
    const inT = [...inG, ...miroir(inG)], outT = [...outG, ...miroir(outG)];
    const bosse = x => yG - 13 * Math.max(0, 1 - Math.pow((x - cx) / (W / 2), 2));
    const dessus = Array.from({ length: 21 }, (_, i) => { const x = cx + W / 2 - i * W / 20; return [x, bosse(x)]; });
    const barre = { a: [cx + 4, yG + D * 0.36], b: [cx + W * 0.8, yG - 40], r: 3.6 };
    // le tuyau enterré en pente : il sort de terre à gauche (vers la soufflerie), passe sous
    // la paroi évasée et débouche au fond
    const M = [cx - 6, yG + D - 6], E = [0, yG + D - 6 - 0.8 * (cx - 6)];
    return { W, D, b, e, cx, yG, inT, outT, bosse, charbon: [...inT, ...dessus], barre, E, M, rt: 6.5 };
  };

  const dessinBarre = (g) => {
    const { a, b, r } = g.barre, L = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const n = [-(b[1] - a[1]) / L * r, (b[0] - a[0]) / L * r];
    return h.chemin([[a[0] + n[0], a[1] + n[1]], [b[0] + n[0], b[1] + n[1]], [b[0] - n[0], b[1] - n[1]], [a[0] - n[0], a[1] - n[1]]], blanc(h.a.arete), true);
  };

  const remplir = (poly, x0, x1, y0, y1, exclus, graine = 88011) => {
    const r = alea(graine), out = [];
    let rang = 0;
    const bord = poly.concat([poly[0]]);
    for (let y = y0; y < y1; y += 7.6, rang++) {
      for (let x = x0; x < x1; x += 8.4) {
        const p = [x + (rang % 2) * 4.2 + (r() - 0.5) * 3, y + (r() - 0.5) * 2.4];
        const rr = 2.8 + r() * 1.2, a0 = r() * 6.28;
        const pts = [0, 1, 2, 3, 4].map(k => { const a = a0 + k * 1.2566 + (r() - 0.5) * 0.5, q = rr * (0.75 + r() * 0.35); return [p[0] + q * Math.cos(a), p[1] + q * Math.sin(a)]; });
        if (!dansPoly(p, poly) || distPoly(p, bord) < rr + 1.6) continue;
        if (exclus(p, rr)) continue;
        out.push(h.chemin(pts, h.a.fin, true));
      }
    }
    return out;
  };
  const morceaux = (g, exclus) => remplir(g.charbon, g.cx - g.W / 2, g.cx + g.W / 2 + 4, g.yG - 11, g.yG + g.D, exclus);
  // liseré blanc de 2 à 3 px sous un trajet d'air qui traverse le charbon
  const lisere = d => h.path(d, 'fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round"');

  const fosse = (z, g, exclus) => [
    h.chemin([[0, g.yG], ...g.outT, [z.l, g.yG], [z.l, z.h - 2], [0, z.h - 2]], h.a.hachure('terre', 'aucun'), true),
    h.chemin([...g.outT, ...[...g.inT].reverse()], h.a.hachure('neige', 'aucun'), true),
    ...morceaux(g, exclus),
    h.chemin([...g.inT.slice(-1), ...g.charbon.slice(g.inT.length)], h.a.detail),
    h.chemin(g.outT, h.a.detail),
    h.chemin(g.inT, h.a.contour),
    h.chemin([[0, g.yG], g.inT[0]], h.a.contour),
    h.chemin([g.inT[g.inT.length - 1], [z.l, g.yG]], h.a.contour),
  ];
  const pres = (p, rr, segs, marge) => segs.some(([a, b]) => distSeg(p, a, b) < rr + marge);

  // Trajets d'air du bon : à travers le charbon, depuis la bouche du tuyau.
  const airBon = (g) => {
    const { M, cx, yG, D } = g;
    return [
      quad([M[0] + 3, M[1] - 6], [cx - 36, yG + D * 0.35], [cx - 36, yG - 14]),
      quad([M[0] + 6, M[1] - 8], [cx - 4, yG + D * 0.35], [cx - 8, yG - 20]),
      quad([M[0] + 9, M[1] - 4], [cx + 30, yG + D * 0.78], [cx + 30, yG + D * 0.34]),
    ];
  };

  // ─── Flammes du raté : poussées à droite par le vent ───
  const flamme = (g, xb, w, ht, pen) => {
    const bl = [xb - w / 2, g.bosse(xb - w / 2)], br = [xb + w / 2, g.bosse(xb + w / 2)];
    const yb = Math.min(bl[1], br[1]), tip = [xb + pen, yb - ht];
    const c = (p) => `${f(p[0])} ${f(p[1])}`;
    return [
      h.path(`M${c(bl)} C${c([bl[0] - 2, yb - ht * 0.45])} ${c([tip[0] - w * 0.45, tip[1] + ht * 0.35])} ${c(tip)} C${c([tip[0] - w * 0.05, tip[1] + ht * 0.4])} ${c([br[0] + 4, yb - ht * 0.4])} ${c(br)}`, blanc(h.a.arete)),
      h.path(`M${c([xb - w * 0.15, yb - 2])} C${c([xb - w * 0.2, yb - ht * 0.35])} ${c([tip[0] - w * 0.2, tip[1] + ht * 0.45])} ${c([tip[0] - w * 0.05, tip[1] + ht * 0.3])}`, h.a.detail),
    ].join('\n');
  };

  // ─── La rigole : demi-coupe le long de la paroi, plus grande ───
  const rig = (z) => {
    const yG = 30, D = z.h - yG - 42, W = D / 0.7, b = W * 0.32, x0 = 60, cx = x0 + W / 2;
    const N = 28;
    const P = Array.from({ length: N + 1 }, (_, i) => { const t = i / N; return [cx - (b / 2 + (W / 2 - b / 2) * Math.pow(1 - t, 1.7)), yG + D * t]; });
    for (let k = 1; k <= 5; k++) P.push([cx - b / 2 + k * b / 10, yG + D]);
    const seg = P.slice(1).map((p, i) => { const q = P[i], L = Math.hypot(p[0] - q[0], p[1] - q[1]); return { L, n: [-(p[1] - q[1]) / L, (p[0] - q[0]) / L] }; });
    const nv = P.map((_, i) => { const a = seg[Math.max(0, i - 1)].n, c = seg[Math.min(seg.length - 1, i)].n; const s = [a[0] + c[0], a[1] + c[1]], L = Math.hypot(...s); return [s[0] / L, s[1] / L]; });
    const cum = [0]; seg.forEach(s => cum.push(cum[cum.length - 1] + s.L));
    const tot = cum[cum.length - 1];
    const at = (s, d) => {
      let i = 0; while (i < seg.length - 1 && cum[i + 1] < s) i++;
      const t = Math.max(0, Math.min(1, (s - cum[i]) / seg[i].L));
      const p = le(P[i], P[i + 1], t), n = le(nv[i], nv[i + 1], t), L = Math.hypot(...n);
      return [p[0] + n[0] / L * d, p[1] + n[1] / L * d];
    };
    const ech = (sa, sb, d, k = 10) => Array.from({ length: k + 1 }, (_, i) => at(sa + (sb - sa) * i / k, d));
    const s1 = 6, s2 = 15, s3 = 31;
    // la couverture part du rebord : la seule entrée d’air est dehors, au niveau du sol
    const sA = 0, sB = tot - b / 4;
    return { yG, D, W, b, cx, P, at, ech, tot, s1, s2, s3, sA, sB };
  };

  return {
    ref: '111-11',
    titre: 'La forge de fosse',
    desc: 'Un foyer de forge creusé dans la terre. En coupe : un trou évasé sur les bords, les parois garnies de glaise pétrie avec du sable et de la cendre, rempli de charbon ; un tuyau d’acier dont le bout sort de terre à l’écart du trou descend en pente, enterré, entre par le côté et débouche au fond, sous le charbon, et l’air monte à travers le lit jusqu’à la pièce. Vu de dessus : le tuyau part en ligne droite de l’extérieur jusqu’au centre du fond, enterré sur presque tout son trajet. À défaut de tuyau : une rigole creusée dans la paroi du bord jusqu’au fond, couverte de pierres plates sèches et de terre battue dès le rebord, ouverte seulement au niveau du sol pour recevoir l’air et au fond pour le lâcher sous le charbon. L’encadré danger : jamais de galets de plage. Le raté, au même cadrage : l’air soufflé sur le dessus du charbon donne une grande flamme et la pièce reste au rouge sombre.',
    format: 'pleine',
    disposition: [['coupe', 'rate'], ['plan', 'rigole']],
    hauteurs: [1, 1],
    vues: {
      coupe: {
        titre: 'En coupe : l’air par en dessous',
        dessin: z => {
          const g = trou(z), airs = airBon(g);
          const { E, M, rt, barre } = g;
          const exclus = (p, rr) => pres(p, rr, [[E, M]], rt + 1.5) || pres(p, rr, [[barre.a, barre.b]], barre.r + 1.5);
          return [
            ...fosse(z, g, exclus),
            tube(E, M, rt),
            h.fleche(dOf([le(E, M, 0.06), le(E, M, 0.9)]), h.a.cache),
            ...airs.map(a => lisere(dOf(a))),
            ...airs.map(a => h.fleche(dOf(a), h.a.cache)),
            dessinBarre(g),
            // la charte : le point à contrôler, la bouche du tuyau au fond, sous le charbon
            h.controle(M[0], M[1], rt + 8),
          ].join('\n');
        },
        renvois: z => {
          const g = trou(z);
          const { E, M, rt, cx, yG, D, W } = g;
          const L = Math.hypot(M[0] - E[0], M[1] - E[1]), n = [-(M[1] - E[1]) / L * rt, (M[0] - E[0]) / L * rt];
          const p1 = le(E, M, 0.4);
          const air = airBon(g)[0];
          const iG = Math.round(g.inT.length * 0.78);
          return [
            { n: 1, rond: [16, yG + D * 0.78], cible: [p1[0] - n[0], p1[1] - n[1]], texte: 'tuyau d’acier enterré, par le côté' },
            { n: 2, rond: [cx - W * 0.12, z.h - 16], cible: [M[0], M[1] + rt - 1], texte: 'bouche au fond, sous le charbon' },
            { n: 3, rond: [cx + W * 0.62, z.h - 16], cible: [g.inT[iG][0] + 5, g.inT[iG][1]], texte: 'glaise, sable et cendre aux parois' },
            { n: 4, rond: [cx - W * 0.62, yG - 44], cible: air[air.length - 3], texte: 'l’air monte à travers le charbon' },
          ];
        },
      },
      rate: {
        titre: 'Raté : l’air par-dessus',
        dessin: z => {
          const g = trou(z), { cx, yG, barre, rt } = g;
          const xr = g.inT[0][0];
          const air = [[6, yG - rt - 0.5], [xr - 2, yG - rt - 0.5], ...quad([xr + 4, yG - rt - 1], [cx - 18, yG - 26], [cx + 30, yG - 26]).slice(1)];
          const exclus = (p, rr) => pres(p, rr, [[barre.a, barre.b]], 2);
          return [
            ...fosse(z, g, exclus),
            tube([0, yG - rt - 0.5], [xr - 2, yG - rt - 0.5], rt),
            flamme(g, cx + 30, 22, 62, 24),
            flamme(g, cx - 18, 22, 60, 26),
            flamme(g, cx + 6, 28, 88, 30),
            h.fleche(dOf(air), h.a.cache),
            dessinBarre(g),
            // la charte : le point qui rate, l'air qui arrive par-dessus le charbon
            h.controle(xr - 2, yG - rt - 0.5, rt + 8),
          ].join('\n');
        },
        renvois: z => {
          const g = trou(z), { cx, yG, W, barre, rt } = g;
          return [
            { n: 9, rond: [22, yG - 42], cible: [g.inT[0][0] - 20, yG - rt - 0.5], texte: 'air soufflé par-dessus le charbon' },
            { n: 10, rond: [cx - W * 0.5, yG - 86], cible: [cx - 11, yG - 45], texte: 'grande flamme : elle chauffe l’air' },
            { n: 11, rond: [z.l - 14, yG + 16], cible: le(barre.a, barre.b, 0.88), texte: 'la pièce reste au rouge sombre' },
          ];
        },
      },
      plan: {
        titre: 'Vu de dessus',
        dessin: z => {
          const R = Math.min(z.l * 0.25, z.h * 0.3), cx = z.l * 0.6, cy = z.h * 0.58, Rb = R * 0.32, rt = 6.5;
          const xE = cx - 2 * R, xP = cx - 0.38 * R, xM = cx - 0.09 * R;
          // traits de pente, du bord vers le fond (un seul tracé)
          let d = '';
          for (let k = 0; k < 48; k++) {
            const a = k * Math.PI / 24, c = Math.cos(a), s = Math.sin(a);
            if (c < 0 && Math.abs(s * R) < rt + 3) continue;
            const l = k % 2 ? 6 : 13;
            d += `M${f(cx + c * R)} ${f(cy + s * R)} L${f(cx + c * (R - l))} ${f(cy + s * (R - l))} `;
          }
          const traits = [h.path(d, h.a.fin)];
          const yc = cy - R - 16;
          return [
            h.cercle(cx, cy, R, h.a.contour),
            h.cercle(cx, cy, Rb, h.a.arete),
            ...traits,
            tube([0, cy], [xE, cy], rt),
            tube([xE, cy], [xP, cy], rt, true),
            tube([xP, cy], [xM, cy], rt),
            h.ligne(xM, cy - rt, xM, cy + rt, h.a.arete),
            h.ligne(xE, cy - rt - 3, xE, cy + rt + 3, h.a.detail),
            h.ligne(cx - R, cy - 4, cx - R, yc - 5, h.a.fin),
            h.ligne(cx + R, cy - 4, cx + R, yc - 5, h.a.fin),
            h.cote(cx - R, yc, cx + R, yc, 'deux mains ouvertes'),
          ].join('\n');
        },
        renvois: z => {
          const R = Math.min(z.l * 0.25, z.h * 0.3), cy = z.h * 0.58, cx = z.l * 0.6;
          return [{ n: 5, rond: [16, cy + 40], cible: [(cx - 2 * R) * 0.5, cy + 6.5], texte: 'bout hors terre, vers la soufflerie' }];
        },
      },
      rigole: {
        titre: 'Sans tuyau : la rigole',
        dessin: z => {
          const g = rig(z), { yG, D, cx, b, at, ech, tot, s1, s2, s3, sA, sB } = g;
          const fond = ech(0, tot, s3, 60);
          const bouche = [fond[0][0] - 6, yG];
          const out = [
            h.chemin([[0, yG], bouche, ...fond, [cx, z.h - 2], [0, z.h - 2]], h.a.hachure('terre', 'aucun'), true),
            h.chemin([bouche, ...fond], h.a.arete),
            h.chemin([[0, yG], bouche], h.a.contour),
          ];
          const dessusT = ech(sA, sB, 0, 40), dessousT = ech(sA, sB, s1, 40);
          out.push(h.chemin([...dessusT, ...dessousT.reverse()], h.a.hachure('neige', 'aucun'), true));
          const n = Math.round((sB - sA) / 25), Ls = (sB - sA) / n;
          // dalles couchées, chacune chevauche la suivante d'un quart de sa longueur
          const Ld = Ls * 1.25;
          for (let j = n - 1; j >= 0; j--) {
            const a = Math.max(sA, sA + j * Ls - 0.125 * Ls), c = Math.min(sB, a + Ld);
            const e = j % 2 ? 0.8 : 0;
            out.push(h.chemin([...ech(a, c, s1 + e, 6), ...ech(a, c, s2 - 0.8 + e, 6).reverse()], blanc(h.a.contour), true));
          }
          out.push(h.chemin(ech(sA, sB, 0, 40), h.a.contour));
          out.push(h.chemin([at(sA, 0), at(sA, s1)], h.a.arete), h.chemin([at(sB, 0), at(sB, s1)], h.a.arete));
          const mid = (s2 + s3) / 2;
          const air = [[6, yG - 18], [bouche[0] + 4, yG - 12], ...ech(tot * 0.03, tot - b * 0.16, mid, 40), [cx - b * 0.1, yG + D + 6], [cx - b * 0.1, yG + D - 92]];
          const lit = [...ech(0, tot, 0, 60), [cx, yG + D], [cx, yG]];
          const montee = [[cx - b * 0.1, yG + D + 6], [cx - b * 0.1, yG + D - 92]];
          out.push(...remplir(lit, cx - g.W / 2, cx + 4, yG + 2, yG + D, (p, rr) => pres(p, rr, [montee], 0.5), 88012));
          out.push(h.chemin(ech(sB, tot, 0, 12), h.a.contour));
          out.push(h.ligne(cx, yG - 12, cx, z.h - 2, axe));
          out.push(lisere(dOf(montee)));
          out.push(h.fleche(dOf(air), h.a.cache));
          out.push(h.ligne(cx - 6, yG, cx + 22, yG, h.a.fin), h.ligne(cx + 4, yG + D, cx + 22, yG + D, h.a.fin));
          out.push(h.cote(cx + 16, yG, cx + 16, yG + D, 'un avant-bras'));
          return out.join('\n');
        },
        renvois: z => {
          const g = rig(z), { at, s1, s2, s3, sA, sB, cx, yG, D } = g;
          const sm = sA + (sB - sA) * 0.42;
          return [
            { n: 6, rond: [22, yG + D * 0.62], cible: at(sA + (sB - sA) * 0.25, (s2 + s3) / 2 + 3), texte: 'rigole creusée du bord jusqu’au fond' },
            { n: 7, rond: [cx - 44, yG + D * 0.36], cible: at(sm, (s1 + s2) / 2), texte: 'pierres plates sèches, de talus' },
            { n: 8, rond: [cx - 30, yG + D * 0.62], cible: at(sA + (sB - sA) * 0.7, s1 * 0.4), texte: 'terre battue par-dessus' },
          ];
        },
      },
    },
    danger: 'Jamais de galets de plage ni de cailloux pris au bord de l’eau, ni dans le foyer ni sur la rigole : l’eau de leurs pores tourne en vapeur et ils éclatent en écailles à hauteur de visage. Pierre sèche prise dans un talus, ou rien.',
  };
};
