// Planche 95-40a — Monter le sol : à plat, en billon, en bac (chapitre 95, §5-B étapes 8 et 9,
// §4 « Bois des bacs », §9 « Le sol : billons, puis couche chaude »).
//
// Ce que le chapitre donne, et rien d'autre :
//   à plat   : 2 cm de compost mêlés aux 5 à 10 premiers cm ; paillis de 2 cm, puis 2 à 4 cm de
//              plus, posé après la levée (paille, feuilles mortes, aiguilles).
//   billon   : buttes allongées faites à la bêche, la terre du sentier remontée sur la planche de
//              culture ; on y mêle la terre noire du dessous des feuillus, la cendre, le compost.
//   bac      : perches d'épinette écorcées empilées pièce sur pièce (ch. 110) ; remplissage « un
//              tiers de compost à deux tiers de terreau ».
// Aucune mesure de billon ni de bac dans le chapitre : aucune cote sur eux. Le coin croisé à
// encoche est l'entaille simple du ch. 110 posée en rangs alternés ; la première perche est à
// demi enterrée pour que le rang suivant porte au sol sans jour dessous.
// La charte : dans le bac en oblique, le dessous de chaque perche couchée à l'ombre (lumière en haut
// à gauche), pour que l'empilement se lise. Pas de gris sur les coupes (la trame dit la matière).
// Pas de rouge : un montage, sans geste dessiné ni point que le chapitre dit de vérifier ; les
// flèches de la terre remontée et de la perche qu'on pose disent ce qui bouge, elles restent noires.
module.exports = (h) => {
  const NOIR = '#1A1A1A';
  const blanc = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');
  const poly = (pts, a) => h.chemin(pts, a, true);
  const f1 = (v) => Math.round(v * 10) / 10;
  const pt = (p) => `${f1(p[0])} ${f1(p[1])}`;
  const motif = (id) => `fill="url(#${id})" stroke="none"`;

  const DEFS = `<defs>
<pattern id="h9540a-enrichie" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="0.95" fill="${NOIR}"/><circle cx="6.6" cy="4.4" r="0.6" fill="${NOIR}"/><circle cx="2.8" cy="7.3" r="0.6" fill="${NOIR}"/><line x1="5.6" y1="8" x2="8.2" y2="8" stroke="${NOIR}" stroke-width="0.5"/></pattern>
<pattern id="h9540a-surface" width="13" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="0.6" fill="${NOIR}"/><circle cx="8.5" cy="6" r="0.5" fill="${NOIR}"/></pattern>
<pattern id="h9540a-paille" width="16" height="9" patternUnits="userSpaceOnUse"><path d="M0.5 2.2 L7 1.2 M4.5 3.4 L12.5 4.6 M9 1.4 L15.5 2.4 M1.5 6.6 L8.5 7.6 M6 8.2 L13 6.8 M11.5 5.6 L15.6 6.4 M2.5 4.6 L5.5 3.8" fill="none" stroke="${NOIR}" stroke-width="0.6" stroke-linecap="round"/></pattern>
</defs>`;

  // ─── Une pousse : tige et deux ou quatre feuilles, en coordonnées d'écran ───
  const feuille = (bx, by, ang, len, lar) => {
    const a = ang * Math.PI / 180, dx = Math.cos(a), dy = -Math.sin(a);
    const tx = bx + len * dx, ty = by + len * dy, mx = (bx + tx) / 2, my = (by + ty) / 2;
    const px = -dy * lar, py = dx * lar;
    return h.path(`M${pt([bx, by])} Q${pt([mx + px, my + py])} ${pt([tx, ty])} Q${pt([mx - px, my - py])} ${pt([bx, by])} Z`, blanc(h.a.detail));
  };
  const pousse = (x, y, ht, deux = false) => {
    const out = [h.ligne(x, y, x, y - ht, h.a.detail)];
    if (deux) out.push(feuille(x, y - ht * 0.5, 28, ht * 0.42, ht * 0.12), feuille(x, y - ht * 0.5, 152, ht * 0.42, ht * 0.12));
    out.push(feuille(x, y - ht, 32, ht * 0.55, ht * 0.16), feuille(x, y - ht, 148, ht * 0.55, ht * 0.16));
    return out.join('\n');
  };

  // ─── Projection oblique et perches en volume ───
  const kc = 0.6 * Math.cos(20 * Math.PI / 180), ks = 0.6 * Math.sin(20 * Math.PI / 180);   // fuite basse : le bout d'une perche de côté tombe entre deux perches avant, pas sur l'une d'elles
  const hull = (pts) => {
    const P = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], up = [];
    for (const q of P) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
    for (const q of P.slice().reverse()) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
    return lo.slice(0, -1).concat(up.slice(0, -1));
  };
  // Une perche : axe 'x' (de u0 à u1, en y = c) ou 'y' (de u0 à u1, en x = c), centre à zc.
  // Le bout visible est le bout droit pour l'axe x, le bout avant pour l'axe y.
  const cerclePerche = (p, axe, u, c, zc, r, demi) => {
    const N = 28, pts = [];
    for (let i = 0; i <= N; i++) {
      const t = (demi ? Math.PI : 2 * Math.PI) * i / N;
      const dc = r * Math.cos(t), dz = r * Math.sin(t);
      pts.push(axe === 'x' ? p(u, c + dc, zc + dz) : p(c + dc, u, zc + dz));
    }
    return pts;
  };
  const perche = (p, pe, { morceau = false } = {}) => {
    const { axe, u0, u1, c, zc, r, demi } = pe;
    const vis = axe === 'x' ? u1 : u0, cache = axe === 'x' ? u0 : u1;
    const A = cerclePerche(p, axe, vis, c, zc, r, demi), B = cerclePerche(p, axe, cache, c, zc, r, demi);
    const out = [];
    // le dessous de la perche, à l'ombre : l'enveloppe des deux arcs du bas (sous 0,55 r)
    const bas = (u) => Array.from({ length: 13 }, (_, i) => {
      const t = Math.PI + 0.582 + (Math.PI - 1.164) * i / 12, dc = r * Math.cos(t), dz = r * Math.sin(t);
      return axe === 'x' ? p(u, c + dc, zc + dz) : p(c + dc, u, zc + dz);
    });
    const ombre = demi ? '' : poly(hull(bas(vis).concat(bas(cache))), h.a.ombre);
    if (!morceau) {
      const hl = hull(A.concat(B));
      out.push(poly(hl, h.a.blanc));
      if (ombre) out.push(ombre);
      out.push(poly(hl, h.a.arete));
    } else {
      // Morceau redessiné par-dessus : on ne trace que les deux côtés, pas le joint caché.
      const tag = new Map(); A.forEach((q) => tag.set(q.join(), 'A')); B.forEach((q) => tag.set(q.join(), 'B'));
      const hl = hull(A.concat(B));
      out.push(poly(hl, 'fill="#FFFFFF" stroke="none"'));
      if (ombre) out.push(ombre);
      hl.forEach((q, i) => {
        const n = hl[(i + 1) % hl.length];
        if (tag.get(q.join()) !== tag.get(n.join())) out.push(h.ligne(q[0], q[1], n[0], n[1], h.a.arete));
      });
    }
    // Le bout : cerne et cœur.
    out.push(poly(A, blanc(h.a.detail)));
    const ctr = axe === 'x' ? p(vis, c, zc) : p(c, vis, zc);
    const cerne = cerclePerche(p, axe, vis, c, zc, r * 0.52, demi);
    out.push(h.chemin(cerne, h.a.fin, !demi));
    out.push(h.cercle(ctr[0], ctr[1], 0.9, h.a.plein));
    return out.join('\n');
  };
  // Les perches d'un caisson croisé : rangs pairs le long de x (avant y = 0, arrière y = W),
  // rangs impairs le long de y (gauche x = 0, droite x = L) ; chaque rang monte d'un rayon.
  const caisson = (L, W, r, o, rangs) => {
    const liste = [];
    for (let k = 0; k < rangs; k++) {
      const zc = k * r, demi = k === 0;
      if (k % 2 === 0) {
        liste.push({ k, axe: 'x', u0: -o, u1: L + o, c: W, zc, r, demi, cote: 'arriere' });
        liste.push({ k, axe: 'x', u0: -o, u1: L + o, c: 0, zc, r, demi, cote: 'avant' });
      } else {
        liste.push({ k, axe: 'y', u0: -o, u1: W + o, c: 0, zc, r, demi, cote: 'gauche' });
        liste.push({ k, axe: 'y', u0: -o, u1: W + o, c: L, zc, r, demi, cote: 'droite' });
      }
    }
    return liste;
  };
  // Les bouts qui dépassent vers l'œil (avant des perches en y, droite des perches en x),
  // redessinés en dernier, du plus loin au plus proche.
  const bouts = (liste, L, r) => liste
    .map((pe) => (pe.axe === 'y' ? { ...pe, u1: -r } : { ...pe, u0: L + r }))
    .map((pe) => {
      const mc = pe.axe === 'y' ? [pe.c, (pe.u0 + pe.u1) / 2] : [(pe.u0 + pe.u1) / 2, pe.c];
      return { pe, prof: kc * mc[0] - mc[1] + ks * pe.zc };
    })
    .sort((a, b) => a.prof - b.prof)
    .map((x) => x.pe);

  // ════ Vue 1 : la coupe d'ensemble ════
  const XT = 346;
  const zb = (x) => -10 + 24.5 * Math.pow(Math.max(0, Math.sin(Math.PI * (x - 116) / 88)), 0.7);
  const repE = (z) => {
    const s = Math.min((z.l - 16) / XT, (z.h - 40) / 60);
    const ox = (z.l - s * XT) / 2, oy = z.h - 4 - s * 22;
    return { s, q: (x, zz) => [ox + s * x, oy - s * zz] };
  };
  const RB = 6, BAC = [250, 342];                         // perches du bac en coupe : rayon, emprise

  // ════ Vue 2 : le bac de perches, en oblique ════
  const LB = 130, WB = 70, OB = 12, NR = 5;
  const repB = (z) => {
    const xmin = -OB - 10, xmax = LB + OB + 10 + (WB + OB + 10) * kc;
    const zmin = -4 + (-OB - 10) * ks, zmax = (NR - 1) * RB + 14 + (WB - 10) * ks;
    const s = Math.min((z.l - 120) / (xmax - xmin), (z.h - 10) / (zmax - zmin));
    const ox = (z.l - 60 - s * (xmax - xmin)) / 2 - s * xmin, oy = z.h - 5 + s * zmin;
    return { s, p: (x, y, zz) => [ox + s * (x + y * kc), oy - s * (zz + y * ks)] };
  };

  // ════ Vue 3 : la planche à plat, de près ════
  const LC = 22;                                          // largeur de la carotte, cm
  const bord = (x) => -7.5 + 1.5 * Math.sin(x * 0.45 + 0.6) + 0.7 * Math.sin(x * 1.25);   // fond de la terre amendée
  const repC = (z) => {
    const s = Math.min((z.l - 104) / LC, (z.h - 12) / 32);
    const ox = 8, oy = 6 + s * 15;
    return { s, q: (x, zz) => [ox + s * x, oy - s * zz] };
  };

  // ════ Vue 4 : le coin, éclaté puis monté (élévation, regard le long des perches du mur) ════
  const RC = 6, OC = 12, YC = 30;                         // rayon, dépassement, longueur montrée
  const LEV = 2.4 * RC;                                   // levée de la perche du dessus
  const repK = (z) => {
    const larg = OC + YC + 8, haut = 4 * RC + LEV + 8 + 2;
    const s = Math.min((z.l - 80) / larg, (z.h - 8) / haut);
    const ox = (z.l - 60 - larg * s) / 2, base = z.h - 4 - s * 8;
    return { s, q: (y, zz) => [ox + s * (y + OC + 4), base - s * zz] };
  };
  const cassure = (a, b) => {                             // trait de cassure entre deux points d'écran
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
    return h.path(`M${pt(a)} L${pt([mx + 3, my - 3])} L${pt([mx - 3, my + 3])} L${pt(b)}`, h.a.detail);
  };
  const cercleK = (q, s, y, zz, demi) => {
    const out = [];
    const c = q(y, zz);
    if (demi) {
      out.push(h.path(`M${pt([c[0] - RC * s, c[1]])} A${f1(RC * s)} ${f1(RC * s)} 0 0 1 ${pt([c[0] + RC * s, c[1]])} Z`, blanc(h.a.arete)));
      out.push(h.path(`M${pt([c[0] - RC * s, c[1]])} A${f1(RC * s)} ${f1(RC * s)} 0 0 0 ${pt([c[0] + RC * s, c[1]])}`, h.a.cache));
      out.push(h.path(`M${pt([c[0] - RC * s * 0.52, c[1]])} A${f1(RC * s * 0.52)} ${f1(RC * s * 0.52)} 0 0 1 ${pt([c[0] + RC * s * 0.52, c[1]])}`, h.a.fin));
    } else {
      out.push(h.cercle(c[0], c[1], RC * s, blanc(h.a.arete)));
      out.push(h.cercle(c[0], c[1], RC * s * 0.52, h.a.fin));
      out.push(h.cercle(c[0], c[1], 1.1, h.a.plein));
    }
    return out.join('\n');
  };
  // Une perche vue de flanc, de y = -OC à y = YC, dessous à zBas, encochée au droit de y = 0.
  const bandeK = (q, s, zBas, encoche = true) => {
    const N = 16, arc = [];
    for (let i = 0; i <= N; i++) { const t = Math.PI - Math.PI * i / N; arc.push(q(RC * Math.cos(t), zBas + RC * Math.sin(t))); }
    const pts = [q(-OC, zBas)].concat(encoche ? arc : [], [q(YC, zBas), q(YC, zBas + 2 * RC), q(-OC, zBas + 2 * RC)]);
    const out = [poly(pts, blanc(h.a.arete))];
    out.push(h.chemin([q(-OC + 3, zBas + RC * 1.35), q(YC - 4, zBas + RC * 1.35)], h.a.fin));
    out.push(cassure(q(YC, zBas - 1.5), q(YC, zBas + 2 * RC + 1.5)));
    return out.join('\n');
  };
  const solK = (q, s) => {
    const a = q(-OC - 4, 0), b = q(YC + 3, 0);
    return [
      h.rect(a[0], a[1], b[0] - a[0], s * 8, h.a.hachure('terre', 'aucun')),
      h.ligne(a[0], a[1], b[0], b[1], h.a.arete),
    ].join('\n');
  };

  return {
    ref: '95-40a',
    titre: 'Monter le sol : à plat, en billon, en bac',
    desc: 'En coupe, côte à côte et à la même échelle : la planche à plat, où le compost est mêlé à la surface du sol ; le billon, butte allongée faite de la terre des deux sentiers creusés à la bêche, remontée par-dessus le niveau d’origine ; le bac de perches, rempli d’un tiers de compost pour deux tiers de terreau. Le bac en oblique : des perches d’épinette écorcées, en rangs croisés aux coins, les bouts qui dépassent. La planche à plat de près : le paillis de 20 mm, puis de 20 à 40 mm de plus, sur 50 à 100 mm de terre amendée, sur le sol en place. Le coin, vu de flanc : l’encoche ronde à mi-épaisseur sous la perche du dessus, puis le coin monté, la première perche à demi enterrée. Encadré danger : jamais de bois traité à l’ACC dans un bac.',
    format: 'pleine',
    disposition: [['coupe'], ['bac'], ['couches', 'coin']],
    hauteurs: [1, 1.05, 1.3],
    largeurs: [[1], [1], [1, 1.1]],
    vues: {
      // ────────────────────────────────────────────────────────────────────────────────
      coupe: {
        titre: 'En coupe : à plat, en billon, en bac',
        dessin: (z) => {
          const { s, q } = repE(z);
          const out = [DEFS];
          // Le profil du sol : à plat, sentier, billon, sentier, allée, bac.
          const bil = [];
          for (let x = 116; x <= 204.01; x += 2) bil.push([x, zb(x)]);
          const surf = [[0, 0], [88, 0], [94, -10]].concat(bil, [[226, -10], [232, 0], [XT, 0]]);
          out.push(poly([[0, -22]].concat(surf, [[XT, -22]]).map(([x, zz]) => q(x, zz)), h.a.hachure('terre', 'aucun')));
          // La terre amendée de la planche à plat.
          const fondP = [];
          for (let x = 90; x >= 0; x -= 1) fondP.push([x, bord(x * 0.9)]);
          const plat = [[0, 0], [88, 0], [88 + 0.6 * -bord(90 * 0.9), bord(90 * 0.9)]].concat(fondP).map(([x, zz]) => q(x, zz));
          out.push(poly(plat, h.a.blanc), poly(plat, motif('h9540a-enrichie')));
          out.push(h.chemin(fondP.map(([x, zz]) => q(x, zz)), h.a.fin));
          // Le billon : la terre remontée et ce qu'on y mêle, au-dessus d'une ligne à -6.
          const haut = bil.filter(([, zz]) => zz >= -6);
          const fondB = [];
          for (let x = haut[haut.length - 1][0]; x >= haut[0][0]; x -= 4) fondB.push([x, -6 + 0.8 * Math.sin(x * 0.3)]);
          const billon = haut.concat(fondB).map(([x, zz]) => q(x, zz));
          out.push(poly(billon, h.a.blanc), poly(billon, motif('h9540a-enrichie')));
          out.push(h.chemin(fondB.map(([x, zz]) => q(x, zz)), h.a.fin));
          // Le remplissage du bac.
          const rem = [q(BAC[0] + 2 * RB, 0), q(BAC[1] - 2 * RB, 0), q(BAC[1] - 2 * RB, 4 * RB), q(BAC[0] + 2 * RB, 4 * RB)];
          out.push(poly(rem, h.a.blanc), poly(rem, motif('h9540a-enrichie')));
          out.push(h.chemin([rem[0], rem[1]], h.a.fin), h.chemin([rem[3], rem[2]], h.a.arete));
          // La surface du sol, trait fort.
          out.push(h.chemin(surf.filter(([x]) => x <= BAC[0]).map(([x, zz]) => q(x, zz)).concat([q(BAC[0], 0)]), h.a.contour));
          out.push(h.chemin([q(BAC[1], 0), q(XT, 0)], h.a.contour));
          // Le niveau d'origine, tireté, par-dessus les sentiers et le billon.
          out.push(h.chemin([q(88, 0), q(232, 0)], h.a.cache));
          // Les perches du bac, coupées : trois rangs de chaque côté, le premier à demi enterré.
          [BAC[0] + RB, BAC[1] - RB].forEach((x) => [0, 2 * RB, 4 * RB].forEach((zz) => {
            const c = q(x, zz);
            out.push(h.cercle(c[0], c[1], RB * s, h.a.blanc), h.cercle(c[0], c[1], RB * s, h.a.hachure('bois', 'arete')));
          }));
          // La terre remontée : du sentier au billon.
          out.push(h.fleche(`M${pt(q(102, -7))} Q${pt(q(104, 13))} ${pt(q(127, 7))}`));
          out.push(h.fleche(`M${pt(q(218, -7))} Q${pt(q(216, 13))} ${pt(q(193, 7))}`));
          // Les pousses.
          [12, 32, 52, 72].forEach((x) => { const b = q(x, 0); out.push(pousse(b[0], b[1], 12 * s)); });
          [151, 169].forEach((x) => { const b = q(x, zb(x)); out.push(pousse(b[0], b[1], 12 * s)); });
          [276, 296, 316].forEach((x) => { const b = q(x, 4 * RB); out.push(pousse(b[0], b[1], 12 * s)); });
          return out.join('\n');
        },
        renvois: (z) => {
          const { q, s } = repE(z);
          const yr = 13;
          return [
            { n: 1, rond: [q(30, 0)[0], yr], cible: q(40, -4), texte: 'à plat : compost mêlé en surface' },
            { n: 2, rond: [q(96, 0)[0], yr], cible: q(106, -9), texte: 'sentier creusé à la bêche' },
            { n: 3, rond: [q(160, 0)[0], yr], cible: q(162, 4), texte: 'billon : terre du sentier, cendre, compost' },
            { n: 4, rond: [q(286, 0)[0], yr], cible: q(302, 9), texte: 'un tiers de compost, deux tiers de terreau' },
            { n: 5, rond: [q(XT, 0)[0] - 10, yr + 26], cible: [q(BAC[1] - RB, 2 * RB)[0] + RB * s * 0.7, q(0, 2 * RB)[1] - RB * s * 0.7], texte: 'perches d’épinette écorcées, empilées' },
          ];
        },
      },
      // ────────────────────────────────────────────────────────────────────────────────
      bac: {
        titre: 'Le bac de perches',
        dessin: (z) => {
          const { s, p } = repB(z);
          const out = [];
          // Le sol : une dalle de terre coupée sous le bac.
          const X0 = -OB - 10, X1 = LB + OB + 10, Y0 = -OB - 10, Y1 = WB + OB + 10;
          out.push(poly([p(X0, Y0, 0), p(X1, Y0, 0), p(X1, Y0, -4), p(X0, Y0, -4)], h.a.hachure('terre', 'aucun')));
          out.push(poly([p(X1, Y0, 0), p(X1, Y1, 0), p(X1, Y1, -4), p(X1, Y0, -4)], h.a.hachure('terre', 'aucun')));
          out.push(h.chemin([p(X0, Y0, 0), p(X1, Y0, 0), p(X1, Y1, 0)], h.a.arete));
          const liste = caisson(LB, WB, RB, OB, NR);
          const dernier = NR - 1;
          liste.filter((pe) => pe.k < dernier).forEach((pe) => out.push(perche(p, pe)));
          liste.filter((pe) => pe.k === dernier && pe.cote === 'arriere').forEach((pe) => out.push(perche(p, pe)));
          // La terre du bac, arasée au dessus du rang du dessous, et les pousses.
          const zf = dernier * RB;
          const sol = [p(RB, RB, zf), p(LB - RB, RB, zf), p(LB - RB, WB - RB, zf), p(RB, WB - RB, zf)];
          out.push(poly(sol, h.a.blanc), poly(sol, motif('h9540a-surface')), poly(sol, h.a.detail));
          for (let j = 0; j < 2; j++) for (let i = 0; i < 5; i++) {
            const b = p(17 + i * 24, WB - 20 - j * 26, zf);
            out.push(pousse(b[0], b[1], 11 * s, true));
          }
          liste.filter((pe) => pe.k === dernier && pe.cote === 'avant').forEach((pe) => out.push(perche(p, pe)));
          bouts(liste, LB, RB).forEach((pe) => out.push(perche(p, pe, { morceau: true })));
          return out.join('\n');
        },
        renvois: (z) => {
          const { p } = repB(z);
          const c = p(0, -OB, 3 * RB);
          return [
            { n: 6, rond: [c[0] - 40, c[1] - 34], cible: [c[0] - 2, c[1] - 2], texte: 'rangs croisés aux coins, les bouts dépassent' },
          ];
        },
      },
      // ────────────────────────────────────────────────────────────────────────────────
      couches: {
        titre: 'À plat, de près',
        dessin: (z) => {
          const { s, q } = repC(z);
          const out = [];
          const pts = (f, x0, x1, pas = 0.5) => { const r = []; for (let x = x0; x <= x1 + 1e-6; x += pas) r.push([x, f(x)]); return r; };
          const fond = pts(bord, 0, LC);
          // Le sol en place.
          out.push(poly([[0, -15], [LC, -15]].concat(fond.slice().reverse()).map(([x, zz]) => q(x, zz)), h.a.hachure('terre', 'aucun')));
          // La terre amendée.
          const am = [[0, 0], [LC, 0]].concat(fond.slice().reverse()).map(([x, zz]) => q(x, zz));
          out.push(poly(am, motif('h9540a-enrichie')));
          // Les deux paillis.
          out.push(poly([q(0, 0), q(LC, 0), q(LC, 2), q(0, 2)], h.a.blanc), poly([q(0, 0), q(LC, 0), q(LC, 2), q(0, 2)], motif('h9540a-paille')));
          out.push(poly([q(0, 2), q(LC, 2), q(LC, 5), q(0, 5)], h.a.blanc), poly([q(0, 2), q(LC, 2), q(LC, 5), q(0, 5)], motif('h9540a-paille')));
          // Les racines, dans la terre amendée.
          const x0 = LC / 2;
          const racine = (pts2) => h.path(`M${pts2.map((pp) => pt(q(pp[0], pp[1]))).join(' L')}`, h.a.fin);
          out.push(racine([[x0, 0], [x0 - 0.3, -2], [x0 + 0.2, -4], [x0 - 0.2, -6.2]]));
          out.push(racine([[x0, -1.2], [x0 - 1.4, -2.6], [x0 - 2.6, -3.4], [x0 - 3.2, -5]]));
          out.push(racine([[x0, -1.6], [x0 + 1.5, -3], [x0 + 2.4, -4.8]]));
          out.push(racine([[x0 - 0.2, -3.6], [x0 - 1.2, -5.2]]));
          // Les limites des couches.
          out.push(h.chemin(fond.map(([x, zz]) => q(x, zz)), h.a.detail));
          out.push(h.chemin([q(0, 0), q(LC, 0)], h.a.detail));
          out.push(h.chemin([q(0, 2), q(LC, 2)], h.a.cache));
          out.push(h.chemin([q(0, 5), q(LC, 5)], h.a.arete));
          out.push(h.chemin([q(0, -15), q(0, 5)], h.a.fin), h.chemin([q(LC, -15), q(LC, 5)], h.a.fin));
          // La pousse, qui traverse le paillis.
          const b = q(x0, 0), t = q(x0, 11);
          out.push(h.rect(b[0] - 1.6, t[1], 3.2, b[1] - t[1], blanc(h.a.detail)));
          out.push(feuille(t[0], t[1], 30, 5.2 * s, 1.5 * s), feuille(t[0], t[1], 150, 5.2 * s, 1.5 * s));
          const m = q(x0, 7.5);
          out.push(feuille(m[0], m[1], 22, 3.6 * s, 1.1 * s), feuille(m[0], m[1], 158, 3.6 * s, 1.1 * s));
          // Les cotes, à droite.
          const xr = q(LC, 0)[0] + 12;
          out.push(h.cote(xr, q(0, 2)[1], xr, q(0, 0)[1], '20 mm'));
          out.push(h.cote(xr, q(0, 5)[1], xr, q(0, 2)[1], '20 à 40 mm'));
          out.push(h.cote(xr, q(0, 0)[1], xr, q(0, bord(LC))[1], '50 à 100 mm'));
          out.push(h.ligne(q(LC, bord(LC))[0] + 2, q(0, bord(LC))[1], xr + 5, q(0, bord(LC))[1], h.a.fin));
          return out.join('\n');
        },
        renvois: (z) => {
          const { q } = repC(z);
          return [
            { n: 7, rond: [q(3, 0)[0], q(0, 1)[1] + 4], cible: q(8.5, 1), texte: 'paillis, premier lit' },
            { n: 8, rond: [q(3, 0)[0], q(0, 10)[1]], cible: q(4, 3.5), texte: 'paillis ajouté après la levée' },
            { n: 9, rond: [q(3, 0)[0], q(0, -4.5)[1] + 4], cible: q(6.5, -3.5), texte: '2 cm de compost mêlés à la terre' },
            { n: 10, rond: [q(3, 0)[0], q(0, -12)[1]], cible: q(7, -12), texte: 'sol en place' },
          ];
        },
      },
      // ────────────────────────────────────────────────────────────────────────────────
      coin: {
        titre: 'Le coin, de flanc',
        dessin: (z) => {
          const { s, q } = repK(z);
          const out = [solK(q, s)];
          // Monté : la perche du mur à demi enterrée, la perche en travers posée dessus, la suivante.
          out.push(bandeK(q, s, 0));
          out.push(cercleK(q, s, 0, 0, true));
          out.push(cercleK(q, s, 0, 2 * RC));
          // La perche en travers suivante, levée : son encoche, dessous, épouse la perche du mur.
          out.push(bandeK(q, s, 2 * RC + LEV));
          out.push(h.chemin([q(-RC, 2 * RC + LEV), q(-RC, 2 * RC + 0.5)], h.a.cache), h.chemin([q(RC, 2 * RC + LEV), q(RC, 2 * RC + 0.5)], h.a.cache));
          out.push(h.fleche(`M${pt(q(-OC - 3.5, 2 * RC + LEV + RC))} L${pt(q(-OC - 3.5, 3.3 * RC))}`));
          return out.join('\n');
        },
        renvois: (z) => {
          const { s, q } = repK(z);
          const e = q(RC * 0.72, 2 * RC + LEV + RC * 0.72);
          return [
            { n: 11, rond: [q(YC, 0)[0] + 34, q(0, 2 * RC + LEV + RC)[1]], cible: [e[0] + 1, e[1] + 1], texte: 'encoche ronde à mi-épaisseur, dessous' },
            { n: 12, rond: [q(YC, 0)[0] + 34, q(0, -3)[1]], cible: q(RC * 0.45, RC * 0.5), texte: 'première perche à demi enterrée' },
          ];
        },
      },
    },
    danger: 'Jamais de bois traité à l’ACC dans un bac : ce qui sort de la planche passe dans la terre où pousse la carotte. Une planche de démolition d’origine inconnue est traitée jusqu’à preuve du contraire.',
  };
};
