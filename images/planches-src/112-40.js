// Planche 112-40 — les chandelles trempées et le regarnissage des chandelles coulées (ch. 112 :
// étapes 45 à 50, 52 et 54 ; variante G, le support et le raccourci de l'eau froide).
// Le chapitre ne donne aucune dimension du bâton, des mèches, du chaudron, des chaises ni des
// moules : aucune cote. Le réflecteur de fer-blanc demandé par la fiche n'est pas dans le
// chapitre : il n'est pas dessiné.
// La main du bâton est la main simple (mains/moteur.js), le poing côté paume ; mains nues (le chapitre ne
// demande les gants que pour la soude). La charte : le rouge sur le trempage, la broche et le vide au cœur.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const r1 = n => Math.round(n * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const bA = blanc(A.arete), bC = blanc(A.contour), bD = blanc(A.detail);
  const P = pts => pts.map(p => `${r1(p[0])} ${r1(p[1])}`).join(' L');
  // l'angle d'une main simple qui met l'axe de sa prise sur axe (degrés écran) et son avant-bras vers vers [x, y]
  const poser = (o, axe, vers) => {
    const base = Object.assign({}, o, { angle: 0, avantbras: { longueur: 100 } }); delete base.objet;
    const e0 = F.mainSimple(base); let best = null;
    for (const k of [0, 180]) {
      const a = axe - e0.prise.angle + k, m = F.mainSimple(Object.assign({}, base, { angle: a }));
      const d = [m.coude[0] - m.poignet[0], m.coude[1] - m.poignet[1]], v = [vers[0] - m.poignet[0], vers[1] - m.poignet[1]];
      const c = (d[0] * v[0] + d[1] * v[1]) / ((Math.hypot(d[0], d[1]) * Math.hypot(v[0], v[1])) || 1);
      if (!best || c > best.c) best = { a, c };
    }
    return best.a;
  };
  const MAIN = { ech: 0.6, rot: [-40, 0, 0], cote: 'droite' };   // penché de 40° : les doigts à plat autour du bâton

  // ─── pièces communes ─────────────────────────────────────────────────────────────────
  // un bâton rond vu de côté, de x0 à x1, axe en y, rayon r
  const baton = (x0, x1, y, r) => [
    h.path(`M${r1(x0 + r * 0.6)} ${r1(y - r)} H${r1(x1 - r * 0.6)} Q${r1(x1 + r * 0.3)} ${r1(y - r)} ${r1(x1 + r * 0.3)} ${r1(y)} Q${r1(x1 + r * 0.3)} ${r1(y + r)} ${r1(x1 - r * 0.6)} ${r1(y + r)} H${r1(x0 + r * 0.6)} Q${r1(x0 - r * 0.3)} ${r1(y + r)} ${r1(x0 - r * 0.3)} ${r1(y)} Q${r1(x0 - r * 0.3)} ${r1(y - r)} ${r1(x0 + r * 0.6)} ${r1(y - r)} Z`, bA),
    h.ligne(x0 + r, y - r * 0.35, x1 - r, y - r * 0.35, A.fin),
  ].join('\n');

  // l'écrou, face vers l'œil, la mèche passée dans son trou
  const ecrou = (cx, cy, r) => {
    const pts = Array.from({ length: 6 }, (_, i) => [cx + r * Math.cos((i * 60 + 30) * Math.PI / 180), cy + r * Math.sin((i * 60 + 30) * Math.PI / 180)]);
    return [h.chemin(pts, bA, true), h.cercle(cx, cy, r * 0.42, bD)].join('\n');
  };

  // une chandelle trempée qui pend : du haut (yh) au bas (yb), plus large en bas
  const chandelle = (cx, yh, yb, lh, lb, at = bA) => h.path(
    `M${r1(cx - lh / 2)} ${r1(yh + 2)} Q${r1(cx)} ${r1(yh - 2)} ${r1(cx + lh / 2)} ${r1(yh + 2)} ` +
    `L${r1(cx + lb / 2)} ${r1(yb - lb * 0.45)} Q${r1(cx + lb / 2)} ${r1(yb)} ${r1(cx)} ${r1(yb)} ` +
    `Q${r1(cx - lb / 2)} ${r1(yb)} ${r1(cx - lb / 2)} ${r1(yb - lb * 0.45)} Z`, at);

  // La paire sur son bâton, tenue par la main au milieu. ys : axe du bâton.
  // Rend le SVG et les points utiles.
  const paire = (cx, ys, o) => {
    const { ecart, long, lh, lb, echelle } = o;
    const rb = o.rb || 5.5;                             // rayon du bâton
    const xs = [cx - ecart / 2, cx + ecart / 2];
    const yc0 = ys + (o.haut || rb + 9), yc1 = yc0 + long;   // haut et bas du corps : là où le suif a pris
    const out = [];
    // la mèche monte derrière le bâton
    xs.forEach(x => out.push(F.corde([[x, yc0 + 4], [x, ys]], { ep: 2.2, debut: 'ouvert', fin: 'ouvert' })));
    // le bâton, tenu par la main
    const bt = baton(cx - o.demi, cx + o.demi, ys, rb);
    // la main droite : la main simple, le poing côté paume refermé sur le bâton par-dessus, l'avant-bras qui
    // monte hors du cadre ; le bâton entre d'un côté du poing et ressort de l'autre, derrière les doigts
    let m = null;
    if (!o.sansMain) {
      const oM = { x: cx, y: ys, pose: 'prise-manche', vue: 'paume', cote: MAIN.cote, echelle: MAIN.ech, diametre: 2 * rb / MAIN.ech, ...(MAIN.rot ? { rotation: MAIN.rot } : {}) };
      const vM = [cx, -300];
      m = F.mainSimple({ ...oM, angle: poser(oM, 0, vM), objet: bt, avantbras: { vers: vM, bord: { x0: 0, y0: 0, x1: o.z.l, y1: o.z.h }, bras: { pli: 0 } } }).svg;
    }
    if (o.dessous) out.push(o.dessous);
    out.push(m || bt);
    // le tour de mèche par-devant et le bout qui pend
    xs.forEach(x => out.push(F.corde([[x - 2.5, ys - rb - 0.8], [x + 2.5, ys + rb + 0.8], [x + 4, ys + rb + 7]], { ep: 2.2, debut: 'ouvert', fin: 'libre' })));
    // les chandelles
    xs.forEach(x => out.push(chandelle(x, yc0, yc1, lh, lb)));
    // l'écrou au bout de chaque mèche
    xs.forEach(x => {
      const re = o.re || 5.5;
      out.push(F.corde([[x, yc1 - 2], [x, yc1 + re + 0.5]], { ep: 2, debut: 'ouvert', fin: 'ouvert' }));
      out.push(ecrou(x, yc1 + re * 1.64, re));
    });
    return { svg: out.join('\n'), xs, yc0, yc1, main: m, rb };
  };

  // la flèche en U : descendre, remonter, sans s'arrêter
  const flecheU = (x, y0, y1, l) => {
    const ym = (y0 + y1) / 2;
    return [h.geste(`M${r1(x)} ${r1(y0)} V${r1(ym)}`),
      h.geste(`M${r1(x)} ${r1(ym)} V${r1(y1 - l / 2)} Q${r1(x)} ${r1(y1)} ${r1(x + l / 2)} ${r1(y1)} Q${r1(x + l)} ${r1(y1)} ${r1(x + l)} ${r1(y1 - l / 2)} V${r1(y0 + 4)}`)].join('\n');
  };

  // ─── Vue 1 : tremper dans le suif ────────────────────────────────────────────────────
  const tremper = z => {
    const sol = z.h - 6;
    const Hp = Math.min(170, z.h - 106), W = 132;
    const cx = z.l * 0.44, top = sol - Hp;
    const ys = top - 13;
    const e = 3.5;                                       // paroi
    const out = [];
    // le plan où il est posé
    out.push(h.ligne(8, sol, z.l - 8, sol, A.arete));
    // le chaudron en coupe : parois, fond, oreilles
    const xi0 = cx - W / 2 + e, xi1 = cx + W / 2 - e, yi1 = sol - e;
    const yL = top + 18;                                 // surface du suif fondu
    // le suif fondu : traits horizontaux
    for (let y = yL + 5; y < yi1 - 1; y += 5) out.push(h.ligne(xi0 + 1, y, xi1 - 1, y, A.fin));
    out.push(h.ligne(xi0, yL, xi1, yL, A.detail));
    out.push(h.rect(cx - W / 2, top, e, Hp, A.plein), h.rect(cx + W / 2 - e, top, e, Hp, A.plein), h.rect(cx - W / 2, sol - e, W, e, A.plein));
    [-1, 1].forEach(s => out.push(h.path(`M${r1(cx + s * W / 2)} ${r1(top + 10)} C${r1(cx + s * (W / 2 + 14))} ${r1(top + 8)} ${r1(cx + s * (W / 2 + 14))} ${r1(top + 26)} ${r1(cx + s * W / 2)} ${r1(top + 26)}`, A.arete)));
    // la paire, plongée jusqu'au fond
    const haut = yL + 1 - ys;                            // la mèche n'a pris le suif que sous la surface
    const long = yi1 - 26 - (ys + haut);
    const p = paire(cx, ys, { ecart: 84, long, lh: 9, lb: 13, demi: 80, rb: 7.5, haut, z });
    out.push(p.svg);
    // le geste
    const xu = cx + W / 2 + 22;
    out.push(flecheU(xu, top - 30, sol - 40, 30));
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 1, rond: [cx - W / 2 - 40, ys + 4], cible: [p.xs[0] - 1.5, ys + p.rb + 4], texte: 'deux mèches bien espacées' },
        { n: 2, rond: [cx - W / 2 - 40, p.yc1 + 9], cible: [p.xs[0] - 5, p.yc1 + 9], texte: 'un écrou lesté au bout' },
        { n: 3, rond: [cx - W / 2 - 40, yL + 40], cible: [xi0 + 8, yL + 42], texte: 'suif tout juste fondu' },
        { n: 4, rond: [xu + 15, top - 58], cible: [xu + 1, top - 24], texte: 'plonger, ressortir d’un trait' },
      ],
    };
  };

  // ─── Vue 2 : figer dans l'eau froide ─────────────────────────────────────────────────
  const figer = z => {
    const sol = z.h - 6;
    const Hp = Math.min(170, z.h - 112), Wh = 128, Wb = 104;
    const cx = z.l * 0.5, top = sol - Hp;
    const ys = top - 13;
    const out = [];
    out.push(h.ligne(8, sol, z.l - 8, sol, A.arete));
    // la chaudière en coupe : évasée, anse
    const yL = top + 20;
    const xa = y => Wb / 2 + (Wh - Wb) / 2 * (sol - y) / Hp;   // demi-largeur à y
    out.push(h.chemin([[cx - xa(yL) + 3, yL], [cx + xa(yL) - 3, yL], [cx + Wb / 2 - 3, sol - 3], [cx - Wb / 2 + 3, sol - 3]], A.hachure('eau', 'aucun'), true));
    out.push(h.ligne(cx - xa(yL) + 3, yL, cx + xa(yL) - 3, yL, A.detail));
    out.push(h.chemin([[cx - Wh / 2, top], [cx - Wb / 2, sol], [cx + Wb / 2, sol], [cx + Wh / 2, top]], A.contour));
    const haut = 32;
    const long = sol - 3 - 26 - (ys + haut);
    const p = paire(cx, ys, { ecart: 84, long, lh: 9, lb: 13, demi: 80, rb: 7.5, haut, z });
    out.push(p.svg);
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 5, rond: [cx + Wh / 2 + 26, yL + 40], cible: [cx + xa(yL + 40) - 12, yL + 42], texte: 'eau froide : fige en secondes' },
      ],
    };
  };

  // ─── Vue 3 : le support, un manche à balai entre deux chaises, en élévation ──────────
  // Les chaises vues de côté, dos à dos ; les bâtons de trempage couchés en travers du manche
  // se voient par le bout, et la chandelle du côté loin se cache derrière celle du côté proche.
  // une bande de largeur l le long d'une polyligne, coins en onglet, peinte en blanc
  const bande = (pts, l, at = bA) => {
    const off = k => {
      const res = [];
      for (let i = 0; i < pts.length; i++) {
        const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
        const nrm = (p, q) => { const u = [q[0] - p[0], q[1] - p[1]], L = Math.hypot(u[0], u[1]); return [-u[1] / L, u[0] / L]; };
        let n;
        if (i === 0 || i === pts.length - 1) n = nrm(a, b);
        else {
          const n1 = nrm(pts[i - 1], pts[i]), n2 = nrm(pts[i], pts[i + 1]);
          const m = [n1[0] + n2[0], n1[1] + n2[1]], d = (m[0] * n1[0] + m[1] * n1[1]);
          n = [m[0] / d, m[1] / d];
        }
        res.push([pts[i][0] + n[0] * k * l / 2, pts[i][1] + n[1] * k * l / 2]);
      }
      return res;
    };
    return h.chemin([...off(1), ...off(-1).reverse()], at, true);
  };
  const support = z => {
    const sol = z.h - 8;
    const s = Math.min(0.2, (z.h - 32) / 900);           // px par mm (dessin seulement)
    const hSi = 450 * s, hDo = 900 * s, prof = 400 * s;
    const out = [];
    out.push(h.ligne(0, sol, z.l, sol, A.arete));
    // une chaise de côté ; xd : pied arrière ; sens : du dossier vers l'avant du siège
    const chaise = (xd, sens) => {
      const ySi = sol - hSi, yDo = sol - hDo, xf = xd + sens * prof;
      const xt = xd - sens * 0.12 * (hDo - hSi);          // le dossier se renverse un peu vers l'arrière
      const o = [];
      o.push(h.rect(Math.min(xd, xf) - 3, ySi - 6, prof + 6, 6, bA));   // le siège
      o.push(bande([[xf, sol], [xf, ySi]], 5));
      o.push(bande([[xd, sol - 120 * s], [xf, sol - 120 * s]], 3));
      o.push(bande([[xd, sol], [xd, ySi - 3], [xt, yDo + 2]], 5.5));
      o.push(h.rect(xt - 5, yDo - 2, 10, 13, bA));        // la traverse du haut, vue par le bout
      return { svg: o.join('\n'), haut: [xt, yDo - 2] };
    };
    const xg = 16 + prof, xdr = z.l - 16 - prof;
    const cG = chaise(xg, -1), cD = chaise(xdr, 1);
    out.push(cG.svg, cD.svg);
    // le manche à balai, posé sur les deux traverses
    const rM = 4.5, yM = cG.haut[1] - rM;
    const x0M = cG.haut[0] - 22, x1M = cD.haut[0] + 22;
    out.push(baton(x0M, x1M, yM, rM));
    // quatre bâtons couchés en travers, vus par le bout, et la chandelle du côté proche
    const n = 4, xa = cG.haut[0] + 34, xb = cD.haut[0] - 34, pas = (xb - xa) / (n - 1);
    const rs = 3.4, yS = yM - rM - rs;
    const long = 250 * s;
    const bas = [];
    for (let i = 0; i < n; i++) {
      const x = xa + i * pas, fini = i === n - 1;
      const lh = 6 + i * 0.9, lb = 8 + i * 1.3;
      const yc0 = yM + rM + 12, yc1 = yc0 + long;
      out.push(F.corde([[x, yS], [x, yc0 + 3]], { ep: 1.8, debut: 'ouvert', fin: 'ouvert' }));
      out.push(h.cercle(x, yS, rs, A.hachure('bois', 'arete')));
      if (fini) {
        out.push(h.path(`M${r1(x - lh / 2)} ${r1(yc0 + 2)} Q${r1(x)} ${r1(yc0 - 2)} ${r1(x + lh / 2)} ${r1(yc0 + 2)} L${r1(x + lb / 2)} ${r1(yc1)} L${r1(x - lb / 2)} ${r1(yc1)} Z`, bA));
      } else {
        out.push(chandelle(x, yc0, yc1, lh, lb));
        out.push(F.corde([[x, yc1 - 2], [x, yc1 + 3]], { ep: 1.6, debut: 'ouvert', fin: 'ouvert' }));
        out.push(ecrou(x, yc1 + 5.5, 3.4));
      }
      bas.push({ x, yc1 });
    }
    const f = bas[n - 1];
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 6, rond: [x0M - 8, yM + 36], cible: [x0M + 6, yM + 3], texte: 'manche à balai sur dossiers' },
        { n: 7, rond: [bas[1].x + pas / 2, yM + 34], cible: [bas[1].x + 3, yS + 2], texte: 'bâton couché en travers' },
        { n: 8, rond: [f.x - pas / 2, f.yc1 + 4], cible: [f.x - 4, f.yc1 - 1], texte: 'base coupée à plat' },
      ],
    };
  };

  // ─── Vue 3b : par le bout du manche, le bâton en équilibre ───────────────────────────
  const equilibre = z => {
    const cx = z.l / 2, RM = 10;
    const ys = 24;                                        // axe du bâton de trempage
    const yM = ys + 5 + RM;                               // centre du manche, sous le bâton
    const dessous = h.cercle(cx, yM, RM, A.hachure('bois', 'arete'));
    const haut = 22, long = Math.min(120, z.h - ys - haut - 24);
    const p = paire(cx, ys, { ecart: 60, long, lh: 8, lb: 11, demi: 50, sansMain: true, rb: 5, re: 4.5, haut, dessous });
    return {
      svg: p.svg,
      renvois: [
        { n: 9, rond: [cx, yM + 46], cible: [p.xs[1] - 5, yM + 30], texte: 'une mèche de chaque côté' },
      ],
    };
  };

  // ─── Vue 4 : regarnir la chandelle coulée ────────────────────────────────────────────
  const regarnir = (z, rate = false) => {
    const sol = z.h - 10;
    const hc = Math.min(128, z.h - 44), w = 56;
    const yt = sol - hc, e = 2.2;
    const cxs = rate ? [0, 0, 0, 0, 62] : [0.13, 0.36, 0.59, 0.82].map(f => z.l * f);
    const yF = yt + 10;                                   // niveau de remplissage
    const yfond = sol - 6;                                // fond embouti, relevé du bord
    const out = [];
    const lignes = (x0, x1, y0, y1, pas = 4.5) => { const o = []; for (let y = y0 + pas; y < y1 - 0.5; y += pas) o.push(h.ligne(x0 + 0.8, y, x1 - 0.8, y, A.fin)); return o.join('\n'); };
    const boite = cx => {
      const x0 = cx - w / 2, x1 = cx + w / 2;
      return [
        h.rect(x0 - e, yt, e, hc, A.plein), h.rect(x1, yt, e, hc, A.plein),
        h.rect(x0, yfond, w, e, A.plein),
        h.cercle(x0 - e / 2, yt, 1.9, A.plein), h.cercle(x1 + e / 2, yt, 1.9, A.plein),
      ].join('\n');
    };
    const meche = cx => [
      F.corde([[cx, yfond + e + 1.5], [cx, yt - 4]], { ep: 2, debut: 'ouvert', fin: 'ouvert' }),
      h.cercle(cx, yfond + e + 2.4, 2.6, A.plein),
    ].join('\n');
    const batonnet = cx => [
      h.rect(cx - w / 2 - 12, yt - 9, w + 24, 5.5, bA),
      F.corde([[cx - 3, yt - 3], [cx + 3, yt - 10], [cx + 5, yt - 16]], { ep: 2, debut: 'ouvert', fin: 'libre' }),
    ].join('\n');
    // la forme du retrait : puits en entonnoir, vide caché sous la croûte
    const puits = cx => `M${r1(cx - 17)} ${r1(yF)} Q${r1(cx - 7)} ${r1(yF + 3)} ${r1(cx - 3)} ${r1(yF + 26)} L${r1(cx + 3)} ${r1(yF + 26)} Q${r1(cx + 7)} ${r1(yF + 3)} ${r1(cx + 17)} ${r1(yF)} Z`;
    const vide = cx => `M${r1(cx)} ${r1(yF + 32)} C${r1(cx + 7)} ${r1(yF + 36)} ${r1(cx + 6)} ${r1(yF + 62)} ${r1(cx)} ${r1(yF + 70)} C${r1(cx - 6)} ${r1(yF + 62)} ${r1(cx - 7)} ${r1(yF + 36)} ${r1(cx)} ${r1(yF + 32)} Z`;
    const suifFige = cx => h.rect(cx - w / 2, yF, w, yfond - yF, A.hachure('neige', 'aucun'));

    let pointe;
    if (!rate) {
    // 1. couler : le suif liquide, la mèche tendue
    {
      const cx = cxs[0];
      out.push(lignes(cx - w / 2, cx + w / 2, yF, yfond), h.ligne(cx - w / 2, yF, cx + w / 2, yF, A.detail));
      out.push(boite(cx), meche(cx), batonnet(cx));
    }
    // 2. le puits
    {
      const cx = cxs[1];
      out.push(suifFige(cx), h.path(puits(cx), A.blanc), h.path(vide(cx), bD));
      out.push(h.path(`M${r1(cx - w / 2)} ${r1(yF)} H${r1(cx - 17)} Q${r1(cx - 7)} ${r1(yF + 3)} ${r1(cx - 3)} ${r1(yF + 26)} L${r1(cx + 3)} ${r1(yF + 26)} Q${r1(cx + 7)} ${r1(yF + 3)} ${r1(cx + 17)} ${r1(yF)} H${r1(cx + w / 2)}`, A.detail));
      out.push(boite(cx), meche(cx), batonnet(cx));
    }
    // 3. percer le dessus
    {
      const cx = cxs[2];
      out.push(suifFige(cx), h.path(puits(cx), A.blanc), h.path(vide(cx), bD));
      out.push(h.path(`M${r1(cx - w / 2)} ${r1(yF)} H${r1(cx - 17)} Q${r1(cx - 7)} ${r1(yF + 3)} ${r1(cx - 3)} ${r1(yF + 26)} L${r1(cx + 3)} ${r1(yF + 26)} Q${r1(cx + 7)} ${r1(yF + 3)} ${r1(cx + 17)} ${r1(yF)} H${r1(cx + w / 2)}`, A.detail));
      out.push(boite(cx), meche(cx), batonnet(cx));
      // la broche, pointe dans le vide
      const xb = cx + 4.5, yb = yF + 44;
      pointe = [xb, yb];
      out.push(h.path(`M${r1(xb)} ${r1(yb)} L${r1(xb + 1.8)} ${r1(yb - 12)} L${r1(xb + 5)} ${r1(yt - 30)} L${r1(xb + 1)} ${r1(yt - 30)} L${r1(xb - 1.2)} ${r1(yb - 12)} Z`, bA));
      out.push(h.geste(`M${r1(xb + 15)} ${r1(yt - 28)} L${r1(xb + 12)} ${r1(yt - 12)}`));
    }
    // 4. remplir de nouveau
    {
      const cx = cxs[3];
      out.push(suifFige(cx), h.path(puits(cx), A.blanc), h.path(vide(cx), A.blanc));
      out.push(h.rect(cx - 2.5, yF + 24, 5, 12, A.blanc));
      // le suif neuf : traits horizontaux dans le puits, le trou et le vide
      const neuf = (x0, x1, y0, y1) => lignes(x0, x1, y0, y1, 4);
      out.push(`<g>${neuf(cx - 16, cx + 16, yF - 0.5, yF + 8)}${neuf(cx - 9, cx + 9, yF + 7, yF + 18)}${neuf(cx - 5, cx + 5, yF + 17, yF + 70)}</g>`);
      out.push(h.path(`M${r1(cx - 17)} ${r1(yF)} Q${r1(cx - 7)} ${r1(yF + 3)} ${r1(cx - 3)} ${r1(yF + 26)} L${r1(cx - 2.5)} ${r1(yF + 34)} C${r1(cx - 7)} ${r1(yF + 40)} ${r1(cx - 6)} ${r1(yF + 62)} ${r1(cx)} ${r1(yF + 70)} C${r1(cx + 6)} ${r1(yF + 62)} ${r1(cx + 7)} ${r1(yF + 40)} ${r1(cx + 2.5)} ${r1(yF + 34)} L${r1(cx + 3)} ${r1(yF + 26)} Q${r1(cx + 7)} ${r1(yF + 3)} ${r1(cx + 17)} ${r1(yF)}`, A.fin));
      out.push(h.ligne(cx - w / 2, yF, cx + w / 2, yF, A.detail));
      out.push(boite(cx), meche(cx), batonnet(cx));
    }
    }
    // 5. non regarnie : démoulée, allumée, le vide sous la flamme, à part derrière un filet
    let vide5;
    if (rate) {
      out.push(h.ligne(-11, -TITRE, -11, z.h, A.fin));
      const cx = cxs[4];
      const w5 = w, y5 = yF + 6;
      out.push(h.path(`M${r1(cx - w5 / 2)} ${r1(sol)} V${r1(y5)} Q${r1(cx)} ${r1(y5 + 12)} ${r1(cx + w5 / 2)} ${r1(y5)} V${r1(sol)} Z`, A.hachure('neige', 'aucun')));
      out.push(h.path(vide(cx), bD));
      out.push(h.path(`M${r1(cx - w5 / 2)} ${r1(sol)} V${r1(y5)} Q${r1(cx)} ${r1(y5 + 12)} ${r1(cx + w5 / 2)} ${r1(y5)} V${r1(sol)}`, A.arete));
      out.push(F.corde([[cx, yF + 70], [cx, y5 + 6], [cx + 1, y5 - 2]], { ep: 2, debut: 'ouvert', fin: 'coupe' }));
      // la flamme
      const yf = y5 - 2;
      out.push(h.path(`M${r1(cx)} ${r1(yf - 34)} C${r1(cx + 3)} ${r1(yf - 22)} ${r1(cx + 9)} ${r1(yf - 10)} ${r1(cx + 7)} ${r1(yf - 3)} C${r1(cx + 5)} ${r1(yf + 3)} ${r1(cx - 5)} ${r1(yf + 3)} ${r1(cx - 7)} ${r1(yf - 3)} C${r1(cx - 9)} ${r1(yf - 10)} ${r1(cx - 3)} ${r1(yf - 22)} ${r1(cx)} ${r1(yf - 34)} Z`, bA));
      out.push(h.path(`M${r1(cx)} ${r1(yf - 18)} C${r1(cx + 2)} ${r1(yf - 12)} ${r1(cx + 4)} ${r1(yf - 7)} ${r1(cx + 3)} ${r1(yf - 4)} C${r1(cx + 2)} ${r1(yf - 1)} ${r1(cx - 2)} ${r1(yf - 1)} ${r1(cx - 3)} ${r1(yf - 4)} C${r1(cx - 4)} ${r1(yf - 7)} ${r1(cx - 2)} ${r1(yf - 12)} ${r1(cx)} ${r1(yf - 18)} Z`, A.fin));
      vide5 = [cx + 4, yF + 50];
      // le point qui casse : le vide au cœur, sous la flamme
      out.push(h.controle(cx, yF + 50, 13));
    }
    out.push(h.ligne(rate ? 30 : 0, sol, rate ? z.l : z.l - 30, sol, A.arete));
    if (rate) return { svg: out.join('\n'), renvois: [{ n: 14, rond: [cxs[4] + 40, yF + 50], cible: vide5, texte: 'non regarnie : vide au cœur' }] };
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 10, rond: [cxs[0] - 44, yt + 10], cible: [cxs[0] - 30, yt - 6], texte: 'mèche tendue, nœud au fond' },
        { n: 11, rond: [cxs[1] - 42, yF + 14], cible: [cxs[1] - 10, yF + 8], texte: 'le retrait creuse un puits' },
        { n: 12, rond: [cxs[2] + 40, Math.max(12, yt - 30)], cible: [pointe[0] + 3.5, yt - 30], texte: 'percer jusqu’au vide' },
        { n: 13, rond: [cxs[3] + 40, yF + 30], cible: [cxs[3] + 5, yF + 30], texte: 'remplir de nouveau' },
      ],
    };
  };

  const TITRE = 22;
  const vue = f => ({ dessin: z => f(z).svg, renvois: z => f(z).renvois });

  return {
    ref: '112-40',
    titre: 'Les chandelles trempées, le support et le regarnissage',
    desc: 'En haut à gauche, une main tient au milieu un bâton d’où pendent deux mèches bien espacées, chacune lestée d’un écrou, plongées dans un chaudron de suif fondu vu en coupe ; '
      + 'la mèche reste nue au-dessus de la surface, et une flèche en U dit de plonger et de ressortir d’un seul mouvement. À droite, la même paire plongée dans une chaudière d’eau froide entre deux trempages. '
      + 'Au milieu, deux chaises de côté, dos à dos, et un manche à balai posé sur le haut des dossiers ; quatre bâtons de trempage couchés en travers, vus par le bout, et leurs chandelles qui pendent ; la dernière a la base coupée à plat. '
      + 'À côté, vu par le bout du manche : le bâton en équilibre sur le manche, une chandelle de chaque côté. '
      + 'En bas, cinq coupes d’une chandelle coulée dans une boîte de conserve : la mèche tendue entre un bâtonnet posé en travers et un nœud sous le fond, le puits et le vide que creuse le retrait, la broche qui perce le dessus jusqu’au vide, le suif neuf qui remplit, et la chandelle non regarnie qui brûle au-dessus de son vide.',
    format: 'pleine',
    disposition: [['tremper', 'figer'], ['support', 'equilibre'], ['regarnir', 'rate']],
    hauteurs: [1.55, 1.1, 0.95],
    largeurs: [[3, 2], [3, 1], [4, 1.3]],
    vues: {
      tremper: { titre: 'Tremper dans le suif', ...vue(tremper) },
      figer: { titre: 'Figer dans l’eau froide', ...vue(figer) },
      support: { titre: 'Entre les trempages : le support', ...vue(support) },
      equilibre: { titre: 'Par le bout du manche', ...vue(equilibre) },
      regarnir: { titre: 'La chandelle coulée : regarnir le puits', ...vue(regarnir) },
      rate: { titre: 'Raté : non regarnie', ...vue(z => regarnir(z, true)) },
    },
  };
};
