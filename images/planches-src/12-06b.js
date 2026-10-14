// Planche 12-06b — la tranchée bâchée (ch. 12, « La tranchée bâchée, quand le feu est impossible » ;
// section 8, point 4 ; section 5E pour le sapinage en écailles).
// En travers : tranchée étroite jusqu'au sol, perches posées en travers sur la neige des deux
// bords avant la bâche, bâche sur les perches, neige sur les bords de la bâche, neige du dessus
// portée par les perches, sapinage sous les corps couchés serrés.
// Sans bâche : les perches serrées, le sapin en écailles (chaque rang sur les bouts coupés du
// précédent), puis la neige.
// En long : une seule entrée, plus basse que le lit, fermée d'un sac ; l'ouverture au toit ;
// l'air vicié monte et sort par elle. Aucune cote : le passage ne donne aucun chiffre.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blanc = a => a.replace('fill="none"', 'fill="#ffffff"');
  const P = (pts, ferme = false) => pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${f(x)} ${f(y)}`).join(' ') + (ferme ? ' Z' : '');
  const neige = h.a.hachure('neige', 'aucun');
  const terre = h.a.hachure('terre', 'aucun');

  // ─── L'enveloppe d'un corps simple (sac de couchage, couverture roulée) : la pose sert de gabarit,
  // le contour visible est celui de l'enveloppe. C'est le contour du corps rendu, uni, dilaté de
  // « marge » mm et lissé par Clipper (celui des corps simples) ; le visage reste à découvert dans
  // l'ouverture du capuchon ; « cloisons » : des coutures du duvet en travers, en part de la longueur.
  const CL = require(require('path').join(__dirname, '../../.claude/skills/planches/scripts/corps/clipper.js'));
  const sac = (c, { marge = 55, lisse = 150, trait = 1.4, visage = true, cloisons = [] } = {}) => {
    const SC = 100, k = c.echelle, polys = [], r1 = v => Math.round(v * 10) / 10;
    for (const m of String(c.svg).matchAll(/<path d="([^"]+)" fill="#(?:FFFFFF|E6E6E6)"/g))
      for (const sub of m[1].split('Z')) {
        const n = sub.match(/-?[\d.]+/g); if (!n || n.length < 6) continue;
        const P = []; for (let i = 0; i + 1 < n.length; i += 2) P.push({ X: Math.round(+n[i] * SC), Y: Math.round(+n[i + 1] * SC) });
        polys.push(P);
      }
    const op = (t, a, b, ouvert = false) => {
      const x = new CL.Clipper(); x.AddPaths(a, CL.PolyType.ptSubject, !ouvert); if (b) x.AddPaths(b, CL.PolyType.ptClip, true);
      if (ouvert) { const tr = new CL.PolyTree(); x.Execute(t, tr, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero); return CL.Clipper.OpenPathsFromPolyTree(tr); }
      const r = new CL.Paths(); x.Execute(t, r, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero); return r;
    };
    const off = (p, d) => { const o = new CL.ClipperOffset(2, 0.05 * SC); o.AddPaths(p, CL.JoinType.jtRound, CL.EndType.etClosedPolygon); const r = new CL.Paths(); o.Execute(r, d * SC); return r; };
    let env = off(off(op(CL.ClipType.ctUnion, polys), (marge + lisse) * k), -lisse * k);
    if (visage) {
      const t = c.tete, hx = t.haut[0] - t.x, hy = t.haut[1] - t.y, L = Math.hypot(hx, hy) || 1, mi = c.miroir ? -1 : 1;
      const fx = -hy / L * mi, fy = hx / L * mi, r = 100 * k, D = [];
      for (let i = 0; i < 48; i++) { const a = i / 48 * 2 * Math.PI; D.push({ X: Math.round((t.x + fx * 0.6 * r + 0.78 * r * Math.cos(a)) * SC), Y: Math.round((t.y + fy * 0.6 * r + 0.78 * r * Math.sin(a)) * SC) }); }
      env = op(CL.ClipType.ctDifference, env, [D]);
    }
    const dP = P => 'M' + P.map(q => `${r1(q.X / SC)} ${r1(q.Y / SC)}`).join(' L');
    const out = [`<path d="${env.map(P => dP(P) + ' Z').join(' ')}" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="${trait}" stroke-linejoin="round"/>`];
    if (cloisons.length) {
      const b = c.boite, x0 = b.x0 - marge * k, x1 = b.x1 + marge * k, dedans = off(env, -2.2);
      const lignes = cloisons.map(t => { const x = Math.round((x0 + (x1 - x0) * t) * SC); return [{ X: x, Y: Math.round((b.y0 - 400 * k) * SC) }, { X: x, Y: Math.round((b.y1 + 400 * k) * SC) }]; });
      const cl = op(CL.ClipType.ctIntersection, lignes, dedans, true);
      if (cl.length) out.push(`<path d="${cl.map(dP).join(' ')}" fill="none" stroke="#1A1A1A" stroke-width="0.5" stroke-linecap="round"/>`);
    }
    return out.join('\n');
  };

  // Une branche de sapin de profil : bout coupé en (x, y), pointe vers la droite.
  const branche = (x, y, L, A) => {
    const mil = u => [x + u * L, y - A * Math.sin(Math.PI / 2 * Math.min(1, u / 0.5)) + (u > 0.5 ? (u - 0.5) * 3 : 0)];
    const ep = u => u < 0.18 ? 0.6 : 0.6 + 0.3 * A * Math.sin(Math.PI * (u - 0.18) / 0.82);
    const haut = [], bas = [];
    for (let i = 0; i <= 16; i++) {
      const u = i / 16, [mx, my] = mil(u), t = ep(u);
      haut.push([mx, my - t]); bas.unshift([mx, my + t]);
    }
    const aig = [];
    for (const u of [0.3, 0.45, 0.6, 0.75]) {
      const [mx, my] = mil(u), t = ep(u);
      aig.push(`M ${f(mx + 5)} ${f(my - t * 0.85)} L ${f(mx)} ${f(my)} L ${f(mx + 5)} ${f(my + t * 0.85)}`);
    }
    return [h.chemin(haut.concat(bas), blanc(h.a.detail), true), h.chemin([0, 0.25, 0.5, 0.75, 0.95].map(mil), h.a.fin), h.path(aig.join(' '), h.a.fin)].join('\n');
  };
  // Des rangs de branches posés de droite à gauche : chacun couvre les bouts coupés du précédent.
  const ecailles = (x0, x1, y, L, A, pas) => {
    const xs = [];
    for (let x = x0; x + L <= x1; x += pas) xs.push(x);
    return xs.reverse().map(x => branche(x, y, L, A)).join('\n');
  };

  // ─── En travers ─────────────────────────────────────────────────────────────────────
  const gt = z => {
    const S = Math.round(z.h * 0.36), G = z.h - 30, cx = Math.round(z.l / 2);
    const k = (G - S) / 1.25;                  // proportions seulement
    const xL = cx - 0.55 * k, xR = cx + 0.55 * k;
    const dp = 0.08 * k, xp0 = xL - 0.33 * k, xp1 = xR + 0.33 * k;
    const lit = 0.16 * k;
    return { S, G, cx, k, xL, xR, dp, xp0, xp1, lit, xb0: xp0 - 0.26 * k, xb1: xp1 + 0.26 * k };
  };

  // ─── Sans bâche ─────────────────────────────────────────────────────────────────────
  const gs = z => {
    const S = Math.round(z.h * 0.5), xe = 34, r = 7, pas = 15.5;
    const perches = [];
    for (let x = xe + 10 + r; x < z.l - 10; x += pas) perches.push(x);
    return { S, xe, r, perches, yb: S - 2 * r };
  };

  // ─── En long ────────────────────────────────────────────────────────────────────────
  const gl = z => {
    const S = Math.round(z.h * 0.34), G = z.h - 28;
    const k = (G - S) / 1.25;
    const lc = 2.1 * k, lp = 0.6 * k, xa = Math.round((z.l - lc - lp) / 2) - 10;
    const xc = xa + lc, xb = xc + lp, r = 0.04 * k, ouv = 0.26 * k;
    const perches = [];
    for (let x = xc - r; x > xa + ouv; x -= 2 * r + 2) perches.push(x);
    const x0 = perches[perches.length - 1] - r;
    return { S, G, k, xa, xc, xb, r, perches, x0, lit: 0.24 * k, ts: 0.12 * k };
  };

  return {
    ref: '12-06b',
    titre: 'La tranchée bâchée',
    desc: 'L’abri sans feu. En travers, une tranchée étroite creusée jusqu’au sol ; des perches posées en travers sur la neige des deux bords, avant la bâche ; la bâche sur les perches, chargée de neige sur les bords ; la neige du dessus portée par les perches ; du sapinage sous les corps couchés serrés. Sans bâche, les perches serrées, le sapin en écailles, puis la neige. En long, une seule entrée, plus basse que le lit, fermée d’un sac, et l’ouverture au toit par où l’air vicié sort. Encadré danger : une bâche sans perches s’affaisse sur les visages.',
    format: 'pleine',
    disposition: [['travers', 'sans'], ['long']],
    hauteurs: [1.15, 1],
    largeurs: [[3, 2], [1]],
    vues: {
      travers: {
        titre: 'En travers',
        dessin: z => {
          const { S, G, cx, k, xL, xR, dp, xp0, xp1, lit, xb0, xb1 } = gt(z);
          const out = [
            h.rect(6, G, z.l - 12, 16, terre),
            h.rect(6, S, xL - 6, G - S, neige),
            h.rect(xR, S, z.l - 6 - xR, G - S, neige),
            h.chemin([[6, S], [xL, S], [xL, G], [xR, G], [xR, S], [z.l - 6, S]], h.a.contour),
            h.ligne(6, G, xL, G, h.a.arete), h.ligne(xR, G, z.l - 6, G, h.a.arete),
          ];
          // Le lit de sapinage : des bouts de branches coupés en travers, entassés.
          const brins = [];
          for (let j = 0; j < 3; j++) for (let x = xL + 4 + (j % 2) * 7; x < xR - 10; x += 14) {
            const y = G - 3 - j * (lit - 4) / 2.4;
            brins.push(`M ${f(x)} ${f(y)} Q ${f(x + 7)} ${f(y - 9)} ${f(x + 14)} ${f(y)}`);
          }
          out.push(h.path(brins.join(' '), h.a.detail));
          // Deux dormeurs couchés sur le dos, serrés, vus par la tête (pictogramme, règle 8) : les
          // épaules en bande arrondie, la tête ronde devant, posée sur le sapinage. Un adulte, un enfant.
          const yl = G - lit, e = 0.104 * k / 100;
          const dormeur = (x, C) => {
            const l = C.epaules * e, hT = C.ep * e, r = C.tete * e / 2, rb = C.bras * e / 2;
            const bras = s => h.cercle(x + s * (l / 2 + rb + 0.8), yl - rb, rb, blanc(h.a.arete));
            return [bras(-1), bras(1),
              h.path(`M ${f(x - l / 2)} ${f(yl)} L ${f(x - l / 2)} ${f(yl - hT * 0.55)} Q ${f(x - l / 2)} ${f(yl - hT)} ${f(x - l / 2 + hT * 0.45)} ${f(yl - hT)} L ${f(x + l / 2 - hT * 0.45)} ${f(yl - hT)} Q ${f(x + l / 2)} ${f(yl - hT)} ${f(x + l / 2)} ${f(yl - hT * 0.55)} L ${f(x + l / 2)} ${f(yl)} Z`, blanc(h.a.arete)),
              h.cercle(x, yl - r - 0.5, r, blanc(h.a.arete))].join('\n');
          };
          const ad = { epaules: 400, ep: 210, tete: 245, bras: 92 }, en = { epaules: 260, ep: 150, tete: 196, bras: 66 };
          const lg = C => (C.epaules + 2 * C.bras) * e + 1.6;
          const marge = (xR - xL - lg(ad) - lg(en) - 2) / 2;
          out.push(dormeur(xL + marge + lg(ad) / 2, ad));
          out.push(dormeur(xR - marge - lg(en) / 2, en));
          // La perche, en travers, portée par la neige des deux bords.
          out.push(h.rect(xp0, S - dp, xp1 - xp0, dp, blanc(h.a.arete)));
          // La bâche sur la perche, puis la neige : grosse sur les bords, mince sur le dessus.
          const yB = S - dp - 1.2;
          const bache = [[xb0, S], [xp0 - 5, S], [xp0 + 3, yB], [xp1 - 3, yB], [xp1 + 5, S], [xb1, S]];
          const ts = 0.11 * k, tb = 0.2 * k;
          const dessus = [[xb0 - 6, S], [xb0 + 6, S - tb * 0.75], [xp0 - 0.05 * k, S - tb], [xp0 + 0.2 * k, yB - ts],
            [xp1 - 0.2 * k, yB - ts], [xp1 + 0.05 * k, S - tb], [xb1 - 6, S - tb * 0.75], [xb1 + 6, S]];
          out.push(h.path(P([...dessus, ...bache.slice().reverse()], true), neige));
          out.push(h.chemin(dessus, h.a.contour));
          out.push(h.chemin(bache, h.a.arete));
          return out.join('\n');
        },
        renvois: z => {
          const { S, G, cx, k, xL, xR, dp, xp0, xp1, lit, xb0, xb1 } = gt(z);
          return [
            { n: 1, rond: [22, S + 40], cible: [xp0 + 0.15 * k, S - dp / 2], texte: 'perches en travers, serrées' },
            { n: 2, rond: [z.l - 22, S + 40], cible: [xp1 + 1, S - 4], texte: 'bâche sur les perches' },
            { n: 3, rond: [22, S - 0.2 * k - 26], cible: [xb0 + 10, S - 0.12 * k], texte: 'neige sur les bords' },
            { n: 4, rond: [cx, S - 0.2 * k - 30], cible: [cx - 0.1 * k, S - dp - 0.06 * k], texte: 'neige du dessus, portée' },
            { n: 5, rond: [cx + 0.05 * k, S + 0.28 * k], cible: [cx + 0.05 * k, G - lit / 2], texte: 'sapinage sous les corps' },
            { n: 6, rond: [z.l - 22, G - 32], cible: [xR, G - 10], texte: 'étroite, jusqu’au sol' },
          ];
        },
      },
      sans: {
        titre: 'Sans bâche',
        dessin: z => {
          const { S, xe, r, perches, yb } = gs(z);
          const out = [
            h.rect(6, S, xe - 6, z.h - 12 - S, neige),
            h.chemin([[6, S], [xe, S], [xe, z.h - 12]], h.a.contour),
            h.ligne(xe, S, z.l - 6, S, h.a.detail),
          ];
          perches.forEach(x => out.push(h.cercle(x, S - r, r, blanc(h.a.arete))));
          out.push(ecailles(xe + 4, z.l - 4, yb, 58, 13, 22));
          const top = S - 2 * r - 20, haut = top - 26;
          const couche = [[6, S], [xe, S], [xe + 6, top + 4], [z.l - 6, top + 2], [z.l - 6, haut + 3], [z.l * 0.55, haut - 2], [6, haut + 2]];
          out.push(h.path(P(couche, true), neige));
          out.push(h.chemin([[6, haut + 2], [z.l * 0.55, haut - 2], [z.l - 6, haut + 3]], h.a.contour));
          return out.join('\n');
        },
        renvois: z => {
          const { S, xe, r, perches, yb } = gs(z);
          const p = perches[perches.length - 3];
          return [
            { n: 7, rond: [p - 16, S + 44], cible: [p, S - 3], texte: 'perches serrées' },
            { n: 8, rond: [z.l - 18, S - 2 * r - 90], cible: [z.l - 34, yb - 12], texte: 'sapin en écailles' },
            { n: 9, rond: [44, S - 2 * r - 86], cible: [60, S - 2 * r - 34], texte: 'puis la neige' },
          ];
        },
      },
      long: {
        titre: 'En long',
        dessin: z => {
          const { S, G, k, xa, xc, xb, r, perches, x0, lit, ts } = gl(z);
          const out = [
            h.rect(6, G, z.l - 12, 16, terre),
            h.rect(6, S, xa - 6, G - S, neige),
            h.rect(xb, S, z.l - 6 - xb, G - S, neige),
            h.chemin([[6, S], [xa, S], [xa, G], [xb, G], [xb, S], [z.l - 6, S]], h.a.contour),
            h.ligne(6, G, xa, G, h.a.arete), h.ligne(xb, G, z.l - 6, G, h.a.arete),
            h.ligne(xa, S, xb, S, h.a.detail),
          ];
          // Le lit : sapinage en écailles, du fond jusqu'au bord de l'entrée.
          out.push(ecailles(xa + 2, xc, G, 0.42 * k, lit * 0.8, 0.17 * k));
          // Le dormeur couché sur le dos dans son sac, la tête du côté de l'entrée, les pieds sous
          // l'ouverture, les genoux à peine pliés : le corps simple sert de gabarit au sac. Échelle de
          // la vue en travers (1,05 k par mètre) : le sac fait 2 k, la tranchée 2,1 k.
          const yl = G - lit, hs = 0.26 * k, xs1 = xc - 0.08 * k, M = 55;
          const e = 1.05 * k / 1000;
          const dormeur = h.formes.corps({ pose: 'couche-dos', cote: 'gauche', echelle: e, x: xs1 - (822 + M) * e, y: yl + 2 - M * e,
            angles: { cuisseP: 82, jambeP: 98, cuisseL: 82, jambeL: 98 } });
          out.push(dormeur.toString(), sac(dormeur, { marge: M, cloisons: [0.22, 0.4, 0.58, 0.74] }));
          // Les perches, vues en bout, sur la neige du bord d'en face ; la bâche ; la neige.
          perches.forEach(x => out.push(h.cercle(x, S - r, r, blanc(h.a.arete))));
          const yB = S - 2 * r - 1;
          out.push(h.path(P([[x0 - 4, S - r], [x0, yB], [xc, yB], [xc + 4, S - r]], false) , h.a.arete));
          out.push(h.path(P([[x0 + 2, yB - 1], [x0 + 8, yB - ts], [xc - 8, yB - ts], [xc - 2, yB - 1]], true), neige));
          out.push(h.chemin([[x0 + 2, yB - 1], [x0 + 8, yB - ts], [xc - 8, yB - ts], [xc - 2, yB - 1]], h.a.contour));
          // Le sac qui ferme l'entrée, posé sur la bouche.
          const sy = S - 0.1 * k;
          out.push(h.path(`M ${f(xc + 2)} ${f(S)} Q ${f(xc - 2)} ${f(sy - 0.14 * k)} ${f((xc + xb) / 2)} ${f(sy - 0.16 * k)} Q ${f(xb + 10)} ${f(sy - 0.14 * k)} ${f(xb + 8)} ${f(S)} Q ${f((xc + xb) / 2)} ${f(S + 0.07 * k)} ${f(xc + 2)} ${f(S)} Z`, blanc(h.a.arete)));
          // L'air vicié monte et sort par l'ouverture.
          const xo = (xa + x0) / 2;
          out.push(h.fleche(`M ${f(xo)} ${f(yl - hs - 0.18 * k)} L ${f(xo)} ${f(S - 0.3 * k)}`, h.a.cache));
          // À contrôler : l'ouverture, qu'on dégage après chaque bordée.
          out.push(h.controle((xa + x0) / 2, S - 3, (x0 - xa) / 2 + 3));
          return out.join('\n');
        },
        renvois: z => {
          const { S, G, k, xa, xc, xb, x0, lit } = gl(z);
          return [
            { n: 10, rond: [xa - 40, S - 0.3 * k], cible: [(xa + x0) / 2 - 0.72 * ((x0 - xa) / 2 + 3), S - 3 - 0.72 * ((x0 - xa) / 2 + 3)], texte: 'ouverture au toit, dégagée' },
            { n: 11, rond: [xb + 50, S - 0.3 * k], cible: [xb - 6, S - 0.14 * k], texte: 'un sac ferme l’entrée' },
            { n: 12, rond: [xb + 44, G - 0.35 * k], cible: [(xc + xb) / 2 + 6, G - 4], texte: 'entrée plus basse que le lit' },
            { n: 13, rond: [xa - 40, G - 0.4 * k], cible: [xa, G - lit - 0.3 * k], texte: 'juste la longueur des corps' },
          ];
        },
      },
    },
    danger: 'Une bâche chargée de neige sans perches dessous s’affaisse, et une bordée de nuit la plaque sur les visages : du plastique collé au visage d’un enfant qui dort, c’est l’étouffement. Aucune flamme dedans. Après une bordée, dégager le dessus et l’ouverture avant de se rendormir.',
  };
};
