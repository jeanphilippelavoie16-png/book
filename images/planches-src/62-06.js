// Planche 62-06 — l'extérieur de ronde et la noix de ronde.
// Chapitre 62, § 5.2 (tableau 5.2 : extérieur de ronde = biceps femoris ; noix de ronde =
// semitendinosus). Documentation : suivi/62-documentation-planches.md, section 9 (ce qui est
// établi vue par vue), section 2 (conventions), section 3 (écarts n° 4, 6 et 7), section 7 (la
// couture de la pointe de surlonge), et la carcasse commune (_carcasse-orignal.js).
//
// Vue 1 : le quartier arrière, face externe (profil gauche) ; l'extérieur en pointillé serré, la
//   noix en hachures fines ; les os repères : pointe de la fesse, grasset et rotule, pointe du jarret.
// Vue 2 : les mêmes muscles, leurs coutures en tireté (un tireté est une couture qu'on ouvre) ;
//   la flèche suit la couture de la pointe de surlonge dans le sens de la CEE-ONU (9217) : du
//   grasset vers le ligament sacro-sciatique et l'avant de la pointe de la fesse. La couture
//   extérieur / noix n'a pas de sens établi : pas de flèche.
// Vue 3 : les deux morceaux sortis, couchés à plat, le bout du grasset à gauche. L'extérieur :
//   ses deux parties et le septum (tireté : IMPS 171D l'ouvre « through the natural seam »), la
//   nappe à parer (bande du bord ventral et aponévrose au bout avant-bas, IMPS 171B, SISSON), le
//   grain en chevron (bipenné, UNL), l'obliquité relevée sur les hachures de q et q'
//   (ellenberger-hirsch-t3, ellenberger-rind-t2). La noix : oblongue et ronde (CEE-ONU 9218),
//   entière (IMPS 171C), grain dans la longueur (fusiforme, UNL).
//
// NON ÉTABLI, donc pas dessiné : le « nerf central » de la noix (écart n° 6) ; une nappe « sur
// toute la face externe » (écart n° 7) ; toute valeur d'angle, toute dimension. Aucune cote.
const C = require('./_carcasse-orignal');

module.exports = (h) => {
  const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
  const f1 = v => Math.round(v * 10) / 10;
  const dd = (pts, ferme) => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + (ferme ? ' Z' : '');
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const unit = v => { const L = Math.hypot(v[0], v[1]) || 1; return [v[0] / L, v[1] / L]; };
  const rot = (P, c, a) => { const co = Math.cos(a), si = Math.sin(a); return [c[0] + (P[0] - c[0]) * co - (P[1] - c[1]) * si, c[1] + (P[0] - c[0]) * si + (P[1] - c[1]) * co]; };

  // ─── Géométrie, dans le repère U du module ──────────────────────────────────────────────
  const BIC = C.MUSCLES.bicepsFemoral.pts;     // contour de position de l'extérieur de ronde
  const ST = C.MUSCLES.semitendineux.pts;      // contour de position de la noix
  const idx = q => BIC.findIndex(p => Math.round(p[0]) === q[0] && Math.round(p[1]) === q[1]);
  const tranche = (a, b) => BIC.slice(idx(a), idx(b) + 1);
  // Couture extérieur / noix : le bord arrière de l'extérieur, de la croupe au bas de la cuisse.
  const COUTURE_NOIX = tranche([1406, 382], [1372, 725]);
  // Couture de la pointe de surlonge puis de la croupe : du grasset au ligament sacro-sciatique.
  const COUTURE_POINTE = [[1249, 668], [1262, 628], [1280, 572], [1300, 512], [1318, 462], [1340, 441], [1366, 442],
    [1378, 420], [1392, 396], [1406, 382]];
  // Le septum qui partage l'extérieur en deux parties : de la pointe de la fesse au bord ventral,
  // à un bon tiers de la largeur depuis l'arrière (q / q' d'Ellenberger, cerf et bœuf).
  const SEPTUM = [[1438, 446], [1418, 490], [1394, 530], [1372, 572], [1356, 620], [1346, 668], [1340, 718]];
  // La nappe à parer : une bande le long du bord ventral, élargie en aponévrose au bout avant-bas
  // (vers la rotule). Seule la limite intérieure est tracée ; le reste est découpé par le contour.
  const NAPPE_LIMITE = [[1398, 668], [1384, 694], [1366, 706], [1336, 700], [1306, 686], [1288, 664], [1278, 636], [1270, 606]];
  const NAPPE = [...NAPPE_LIMITE, [1230, 600], [1220, 780], [1440, 780], [1440, 660]];
  // Grain : deux familles (bipenné). Angles relevés sur les hachures de q et q' (gravures),
  // ramenés sur la carcasse commune : la partie avant plus couchée, la partie ischiatique presque
  // parallèle au septum. Aucune valeur d'angle n'est établie : ce sont les gravures, recopiées.
  const DIR_AVANT = [-Math.cos(47 * Math.PI / 180), Math.sin(47 * Math.PI / 180)];
  const DIR_ARRIERE = [-Math.cos(74 * Math.PI / 180), Math.sin(74 * Math.PI / 180)];
  const GRAIN_AVANT = [[1352, 468], [1324, 530], [1372, 520], [1300, 590], [1346, 584], [1318, 640], [1390, 470]];
  const GRAIN_ARRIERE = [[1420, 520], [1402, 590], [1382, 650], [1428, 460]];
  // La noix sortie : oblongue et ronde. Axe le long du contour de position, épaisseur plus forte
  // que la bande vue de profil (elle file en dedans, ACIA 38 et 39) ; bouts entiers.
  const AXE_NOIX = [[1448, 404], [1455, 440], [1455, 480], [1449, 525], [1440, 570], [1427, 620], [1414, 666], [1405, 708], [1399, 746]];
  const EP_NOIX = [26, 56, 66, 70, 70, 66, 56, 42, 22];

  // Contour de la noix sortie à partir de son axe et de son épaisseur
  function contourNoix() {
    const axe = C.dense(AXE_NOIX, 3);
    const n = axe.length, ep = t => {
      const x = t * (EP_NOIX.length - 1), i = Math.min(EP_NOIX.length - 2, Math.floor(x)), u = x - i;
      return EP_NOIX[i] * (1 - u) + EP_NOIX[i + 1] * u;
    };
    const g = [], d = [];
    axe.forEach((p, i) => {
      const t = unit(sub(axe[Math.min(n - 1, i + 1)], axe[Math.max(0, i - 1)])), w = ep(i / (n - 1)) / 2;
      g.push([p[0] + t[1] * w, p[1] - t[0] * w]); d.push([p[0] - t[1] * w, p[1] + t[0] * w]);
    });
    // bouts arrondis
    const bout = (a, b, c) => { const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; return [a, [m[0] + c[0], m[1] + c[1]], b]; };
    const t0 = unit(sub(axe[0], axe[3])), t1 = unit(sub(axe[n - 1], axe[n - 4]));
    return C.dense([...g, ...bout(g[n - 1], d[n - 1], [t1[0] * 12, t1[1] * 12]).slice(1, 2), ...d.reverse(),
      ...bout(d[d.length - 1], g[0], [t0[0] * 14, t0[1] * 14]).slice(1, 2)], 2, true);
  }

  // ─── Vues 1 et 2 : le quartier arrière, face externe ────────────────────────────────────
  const CADRE = [1080, 250, 1580, 960];
  const place = z => C.placer(z, { cadre: CADRE });
  const trameDefs = id => [
    `<pattern id="${id}-gris" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="3" stroke="${NOIR}" stroke-width="0.5"/></pattern>`,
    `<pattern id="${id}-nappe" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="4" stroke="${NOIR}" stroke-width="0.5"/><line x1="0" y1="0" x2="4" y2="0" stroke="${NOIR}" stroke-width="0.5"/></pattern>`,
  ].join('');
  const lisse = (p, pts, ferme = false) => C.dense(pts, 3, ferme).map(p.T);
  // un tireté de couture : un liseré blanc efface le contour du voisin, puis le tireté
  const couture = (pts) => [
    `<path d="${dd(pts)}" fill="none" stroke="${BLANC}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
    `<path d="${dd(pts)}" fill="none" stroke="${NOIR}" stroke-width="1.4" stroke-dasharray="5 3.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  ].join('\n');
  // décale une polyligne de e pixels sur sa gauche (sens de marche), garde de t0 à t1 de sa longueur
  const aGauche = (pts, e, t0, t1) => {
    const n = pts.length, out = pts.map((q, i) => {
      const t = unit(sub(pts[Math.min(n - 1, i + 1)], pts[Math.max(0, i - 1)]));
      return [q[0] + t[1] * e, q[1] - t[0] * e];
    });
    return out.slice(Math.floor(t0 * n), Math.ceil(t1 * n));
  };

  const vueSituation = z => {
    const p = place(z);
    const noix = lisse(p, ST, true), bic = lisse(p, BIC, true);
    return [
      C.dessiner(h, p, {
        id: 'v1', loin: 'gris', fondOs: false,
        os: ['bassin', 'femur', 'rotule', 'tibia', 'calcaneum'],
        osForts: ['bassin', 'rotule', 'calcaneum'],
        muscles: ['fessierMoyen', 'pointeSurlonge', 'gastrocnemien', 'tendonAchille'],
        valeur: { muscles: ['bicepsFemoral'], trame: 'r1' },
      }),
      `<defs>${trameDefs('v1')}</defs>`,
      `<path d="${dd(noix, true)}" fill="url(#v1-gris)" stroke="none"/>`,
      `<path d="${dd(bic, true)}" fill="none" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"/>`,
      `<path d="${dd(noix, true)}" fill="none" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"/>`,
    ].join('\n');
  };

  const vueCouteau = z => {
    const p = place(z);
    const noix = lisse(p, ST, true), bic = lisse(p, BIC, true);
    const cPointe = lisse(p, COUTURE_POINTE), cNoix = lisse(p, COUTURE_NOIX);
    const fl = aGauche(cPointe, 12, 0.44, 0.9);
    return [
      C.dessiner(h, p, {
        id: 'v2', loin: 'gris', fondOs: false,
        os: ['bassin', 'femur', 'rotule'],
        muscles: ['fessierMoyen', 'pointeSurlonge', 'gastrocnemien', 'tendonAchille'],
      }),
      `<path d="${dd(bic, true)}" fill="none" stroke="${NOIR}" stroke-width="0.7" stroke-linejoin="round"/>`,
      `<path d="${dd(noix, true)}" fill="none" stroke="${NOIR}" stroke-width="0.7" stroke-linejoin="round"/>`,
      couture(cPointe),
      couture(cNoix),
      // la charte : le chemin du couteau, le geste de la vue, en rouge sur un liseré blanc
      `<path d="${dd(fl)}" fill="none" stroke="${BLANC}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`,
      h.geste(dd(fl)),
    ].join('\n');
  };

  // ─── Vue 3 : les morceaux sortis, à plat ────────────────────────────────────────────────
  // Chaque morceau est couché : son axe (bout de la croupe → bout du grasset) mis à l'horizontale,
  // le bout du grasset à gauche. Même échelle pour les deux. Le contour de l'extérieur sorti est
  // celui de position, sans le creux que fait la croupe dessus (point 1366, 442).
  const BIC_PLAT = BIC.filter(q => !(Math.round(q[0]) === 1366 && Math.round(q[1]) === 442));
  const axeBic = [[1418, 392], [1306, 706]];
  const axeNoix = [AXE_NOIX[0], AXE_NOIX[AXE_NOIX.length - 1]];
  const angle = a => { const v = sub(a[1], a[0]); return Math.PI - Math.atan2(v[1], v[0]); };
  const aBic = angle(axeBic), aNoix = angle(axeNoix);
  const dedans = (q, poly) => {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const a = poly[i], b = poly[j];
      if ((a[1] > q[1]) !== (b[1] > q[1]) && q[0] < (b[0] - a[0]) * (q[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c;
    }
    return c;
  };
  const distMin = (q, poly) => Math.min(...poly.map(a => Math.hypot(a[0] - q[0], a[1] - q[1])));
  // Centres des flèches de grain, en rangs parallèles au septum : deux rangs dans la partie avant,
  // un dans la partie ischiatique ; jamais sur la nappe, jamais contre le bord.
  function centresGrain() {
    const bic = C.dense(BIC_PLAT, 2, true), nap = C.dense(NAPPE_LIMITE, 2);
    const sep = C.dense(SEPTUM, 2), n = sep.length;
    const au = t => sep[Math.round(t * (n - 1))];
    const dir = unit(sub(SEPTUM[SEPTUM.length - 1], SEPTUM[0])), av = [-dir[1], dir[0]];   // av : vers l'avant (le côté de la pointe de surlonge)
    const bon = q => dedans(q, bic) && !dedans(q, NAPPE) && distMin(q, bic) > 16 && distMin(q, nap) > 14 && distMin(q, sep) > 12;
    const rang = (off, ts) => ts.map(au).map(q => [q[0] + av[0] * off, q[1] + av[1] * off]).filter(bon);
    return {
      avant: [...rang(34, [0.12, 0.34, 0.56, 0.78]), ...rang(78, [0.02, 0.24, 0.46, 0.68])],
      arriere: rang(-24, [0.2, 0.42, 0.64, 0.86]),
    };
  }
  // Toute la mise en place de la vue 3, pour le dessin et pour les renvois
  function poseSortis(z) {
    const cB = [(axeBic[0][0] + axeBic[1][0]) / 2, (axeBic[0][1] + axeBic[1][1]) / 2];
    const cN = [(axeNoix[0][0] + axeNoix[1][0]) / 2, (axeNoix[0][1] + axeNoix[1][1]) / 2];
    const rb = P => rot(P, cB, aBic), rn = P => rot(P, cN, aNoix);
    const bb = pts => [Math.min(...pts.map(q => q[0])), Math.min(...pts.map(q => q[1])), Math.max(...pts.map(q => q[0])), Math.max(...pts.map(q => q[1]))];
    const B = bb(C.dense(BIC_PLAT, 2, true).map(rb)), N = bb(contourNoix().map(rn));
    const ecart = 74;   // entre les deux morceaux, en unités U : la place d'une pastille
    const lTot = (B[2] - B[0]) + ecart + (N[2] - N[0]);
    const hTot = Math.max(B[3] - B[1], N[3] - N[1]);
    const k = Math.min((z.l - 60) / lTot, (z.h - 30) / hTot);
    const x0 = (z.l - lTot * k) / 2, yc = z.h / 2;
    const xn0 = x0 + ((B[2] - B[0]) + ecart) * k;
    const TB = P => { const q = rb(P); return [x0 + (q[0] - B[0]) * k, yc + (q[1] - (B[1] + B[3]) / 2) * k]; };
    const TNr = q => [xn0 + (q[0] - N[0]) * k, yc + (q[1] - (N[1] + N[3]) / 2) * k];
    const TN = P => TNr(rn(P));
    return { k, TB, TN, TNr, rn,
      boiteB: [x0, yc - (B[3] - B[1]) * k / 2, x0 + (B[2] - B[0]) * k, yc + (B[3] - B[1]) * k / 2],
      boiteN: [xn0, yc - (N[3] - N[1]) * k / 2, xn0 + (N[2] - N[0]) * k, yc + (N[3] - N[1]) * k / 2] };
  }
  const rotV = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
  // flèche de grain : double pointe, trait 0,7
  const grain = (c, dir, L) => {
    const a = [c[0] - dir[0] * L / 2, c[1] - dir[1] * L / 2], b = [c[0] + dir[0] * L / 2, c[1] + dir[1] * L / 2];
    return `<path d="${dd([a, b])}" fill="none" stroke="${NOIR}" stroke-width="0.7" stroke-linecap="round" marker-start="url(#fl)" marker-end="url(#fl)"/>`;
  };
  // centres des flèches de la noix : en quinconce de part et d'autre de l'axe, rien sur l'axe
  const centresNoix = TN => {
    const axeV = C.dense(AXE_NOIX, 2).map(TN), nA = axeV.length;
    return [0.16, 0.32, 0.48, 0.64, 0.8].map((t, i) => {
      const j = Math.round(t * (nA - 1)), q = axeV[j];
      const tg = unit(sub(axeV[Math.min(nA - 1, j + 3)], axeV[Math.max(0, j - 3)]));
      return { c: q, tg, s: (i % 2 ? 1 : -1) };
    });
  };

  const vueSortis = z => {
    const P = poseSortis(z), k = P.k;
    const bicV = C.dense(BIC_PLAT, 2, true).map(P.TB);
    const noixV = contourNoix().map(P.rn).map(P.TNr);
    const septum = C.dense(SEPTUM, 2).map(P.TB);
    const nappe = NAPPE.map(P.TB), limite = C.dense(NAPPE_LIMITE, 2).map(P.TB);
    const Lg = 30 * k;
    const cg = centresGrain();
    const gAv = cg.avant.map(q => grain(P.TB(q), rotV(DIR_AVANT, aBic), Lg));
    const gAr = cg.arriere.map(q => grain(P.TB(q), rotV(DIR_ARRIERE, aBic), Lg));
    const gNoix = centresNoix(P.TN).map(({ c, tg, s }) => grain([c[0] + tg[1] * s * 13 * k, c[1] - tg[0] * s * 13 * k], tg, Lg));
    return [
      `<defs>${trameDefs('v3')}<clipPath id="v3-bic"><path d="${dd(bicV, true)}" fill="${BLANC}"/></clipPath></defs>`,
      `<path d="${dd(bicV, true)}" fill="${BLANC}" stroke="none"/>`,
      `<g clip-path="url(#v3-bic)"><path d="${dd(nappe, true)}" fill="url(#v3-nappe)" stroke="none"/></g>`,
      `<g clip-path="url(#v3-bic)"><path d="${dd(limite)}" fill="none" stroke="${NOIR}" stroke-width="0.5"/></g>`,
      `<g clip-path="url(#v3-bic)">${couture(septum)}</g>`,
      ...gAv, ...gAr,
      `<path d="${dd(bicV, true)}" fill="none" stroke="${NOIR}" stroke-width="2.4" stroke-linejoin="round"/>`,
      `<path d="${dd(noixV, true)}" fill="${BLANC}" stroke="none"/>`,
      ...gNoix,
      `<path d="${dd(noixV, true)}" fill="none" stroke="${NOIR}" stroke-width="2.4" stroke-linejoin="round"/>`,
    ].join('\n');
  };

  return {
    ref: '62-06',
    titre: 'L’extérieur de ronde et la noix de ronde',
    desc: "Trois vues. En haut à gauche, le quartier arrière de la carcasse d'orignal, face externe, profil gauche : "
      + "l'extérieur de ronde (biceps fémoral) en pointillé serré couvre l'arrière de la cuisse, de la croupe au grasset ; "
      + "la noix de ronde (semi-tendineux) en hachures fines longe le bord arrière, de la pointe de la fesse jusqu'au-dessus du jarret ; "
      + "os repères : pointe de la fesse, grasset et rotule, pointe du jarret. En haut à droite, les mêmes muscles et leurs "
      + "coutures en tireté : entre l'extérieur et la noix ; et devant, la couture avec la pointe de surlonge qui remonte "
      + "du grasset et continue sous le haut de surlonge, une flèche dans le sens de la lame, du grasset vers la fesse. En bas, les deux "
      + "morceaux sortis et couchés à plat, le bout du grasset à gauche : l'extérieur avec ses deux parties séparées par le "
      + "septum en tireté, la nappe à parer en quadrillé du côté du grasset (bande du bord ventral et aponévrose au bout "
      + "avant-bas), le grain en deux familles de flèches en chevron ; la noix entière, oblongue et ronde, le grain en flèches "
      + "dans la longueur. Aucun nerf central n'est dessiné dans la noix : aucune source ne le décrit.",
    format: 'pleine',
    disposition: [['situation', 'couteau'], ['sortis']],
    hauteurs: [2.35, 1],
    vues: {
      situation: {
        titre: 'Où ils sont',
        dessin: vueSituation,
        renvois: z => {
          const p = place(z);
          return [
            { n: 1, texte: 'extérieur de ronde, biceps femoris', rond: p.pt([1125, 470]), cible: p.pt([1336, 540]) },
            { n: 2, texte: 'noix de ronde, semitendinosus', rond: p.pt([1545, 640]), cible: p.pt([1450, 600]) },
            { n: 3, texte: 'pointe de la fesse', rond: p.pt([1545, 400]), cible: p.pt('pointeFesse') },
            { n: 4, texte: 'grasset et rotule', rond: p.pt([1130, 640]), cible: p.pt('rotule') },
            { n: 5, texte: 'pointe du jarret', rond: p.pt([1545, 880]), cible: p.pt('pointeJarret') },
          ];
        },
      },
      couteau: {
        titre: 'Le couteau suit les coutures',
        dessin: vueCouteau,
        renvois: z => {
          const p = place(z);
          return [
            { n: 6, texte: 'couture entre l’extérieur et la noix', rond: p.pt([1545, 560]), cible: p.pt([1432, 540]) },
            { n: 7, texte: 'couture avec pointe et haut de surlonge', rond: p.pt([1150, 800]), cible: p.pt([1262, 628]) },
          ];
        },
      },
      sortis: {
        titre: 'Sortis et posés à plat',
        dessin: vueSortis,
        renvois: z => {
          const P = poseSortis(z), bB = P.boiteB, bN = P.boiteN;
          const cg = centresGrain();
          const cS = P.TB([1349, 650]), cI = P.TB([1404, 540]), cN = P.TB([1268, 660]), cG = P.TB(cg.avant[1] || [1324, 530]);
          const cX = centresNoix(P.TN)[2];
          const cXp = [cX.c[0] + cX.tg[1] * cX.s * 13 * P.k, cX.c[1] - cX.tg[0] * cX.s * 13 * P.k];
          const yb = Math.min(z.h - 10, bB[3] + 14);
          return [
            { n: 8, texte: 'septum : couture entre les deux parties', rond: [cS[0] + 6, yb], cible: cS },
            { n: 9, texte: 'partie ischiatique, la petite', rond: [(bB[2] + bN[0]) / 2, Math.min(z.h - 10, cI[1] + 22)], cible: cI },
            { n: 10, texte: 'nappe à parer, du côté du grasset', rond: [Math.max(10, bB[0] - 22), cN[1]], cible: cN },
            { n: 11, texte: 'extérieur : grain en chevron, deux sens', rond: [cG[0], 10], cible: cG },
            { n: 12, texte: 'noix entière, grain dans la longueur', rond: [cXp[0], Math.min(z.h - 10, bN[3] + 14)], cible: cXp },
          ];
        },
      },
    },
  };
};
