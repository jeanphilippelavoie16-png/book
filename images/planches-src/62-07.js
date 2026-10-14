// Planche 62-07 — La pointe de surlonge, entière puis muscle par muscle.
// Chapitre 62, tableau 5.2 (« Trois à quatre muscles cousus ensemble, grains croisés […] À séparer
// muscle par muscle avant tout usage. Entier, il sale de travers ») et § 3 (« Le sel suit la
// fibre »). Documentation : suivi/62-documentation-planches.md, section 10 (et sections 2, 3, 5).
//
// Vue 1 : où est la pointe sur la carcasse (module commun, cadre de la cuisse) : la pointe en
//   trame, devant le fémur, de la rotule à la hanche ; repères : pointe de la hanche, grand
//   trochanter, fémur, rotule (section 10, « Vue 1 »).
// Vue 2 : le chemin du couteau, même cadre, même échelle : entaille au-dessus de la rotule
//   jusqu'à l'os, puis la lame à plat contre le fémur jusqu'au grand trochanter (NMSU fig. 27-28 ;
//   CEE-ONU 9240 « from the patella to the greater trochanter »). La flèche dans le sens du geste.
// Vue 3 : deux vignettes à la même échelle, orientées comme sur la carcasse (haut = côté hanche,
//   bas = côté rotule, gauche = avant). À gauche la pointe entière, « ballon » dans sa membrane
//   (NMSU fig. 29), les coutures entre les chefs en pointillé ; à droite la même en trois pièces
//   (CEE-ONU 9241-9243) : droit fémoral ; vaste latéral ; vaste intermédiaire et vaste médial
//   ensemble. Rangement des chefs : GUELPH (le droit fémoral devant, le vaste latéral en dehors, le
//   vaste intermédiaire contre le fémur) ; le vaste latéral triangulaire (ACIA 5.3.5.1) ; le vaste
//   médial part du tiers supérieur du fémur (CEE-ONU 9243). Les formes des pièces sont un schéma :
//   aucune dimension d'orignal n'est établie, aucune cote.
//
// Le grain (section 2, point 5 ; section 10) :
//   - droit fémoral : « The lower portion of the muscle is pennate, the fibers on either side
//     converging on the tendon » (SISSON) : chevrons vers le tendon, dans la moitié basse seulement ;
//   - vaste latéral : unipenné (UNL), « downward and forward » (SISSON) : une famille de flèches
//     vers le bas et l'avant, obliquité des hachures de sisson-1914-fig309 (28) ;
//   - vaste intermédiaire : bipenné (UNL) : chevrons de part et d'autre d'une lame centrale ;
//   - vaste médial : unipenné (UNL) : une famille, obliquité des hachures de sisson-1914-fig287.
//   Aucune valeur d'angle n'est établie ; le tenseur du fascia lata n'a pas de flèche (non établi)
//   et n'est pas dessiné dans les vignettes (la pointe « nettoyée » de NMSU fig. 29).
const C = require('./_carcasse-orignal');

// ─── Géométrie commune ─────────────────────────────────────────────────────────────────────
const unit = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; return [dx / L, dy / L]; };
const f1 = v => Math.round(v * 10) / 10;
const dPts = (pts, ferme) => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + (ferme ? ' Z' : '');
const lisse = (pts, ferme = false, pas = 2) => C.dense(pts, pas, ferme);
function dedans(poly, [x, y]) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
  }
  return c;
}
function distBord(poly, p) {
  let m = Infinity;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy || 1;
    const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2));
    m = Math.min(m, Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy));
  }
  return m;
}
// points d'une grille en quinconce, dans le polygone, à distance « marge » du bord
function semer(poly, pas, marge, decal = [0, 0]) {
  const xs = poly.map(p => p[0]), ys = poly.map(p => p[1]);
  const out = [];
  let r = 0;
  for (let y = Math.min(...ys) + decal[1]; y <= Math.max(...ys); y += pas * 0.87, r++) {
    for (let x = Math.min(...xs) + decal[0] + (r % 2 ? pas / 2 : 0); x <= Math.max(...xs); x += pas) {
      if (dedans(poly, [x, y]) && distBord(poly, [x, y]) >= marge) out.push([x, y]);
    }
  }
  return out;
}

// ─── Les pièces, en unités de pièce (u vers l'avant = gauche, v vers le bas = côté rotule) ──────
// La pointe entière, vue du dehors : le droit fémoral fait le bord de devant, le vaste latéral
// (triangulaire) couvre la face externe, le vaste intermédiaire (et le médial, derrière lui) se voit
// en bande le long de la face qui touchait le fémur. Tous finissent à la rotule, en bas.
const DEVANT = [[-6, 1], [-26, 11], [-41, 35], [-50, 70], [-51, 105], [-46, 140], [-36, 170], [-22, 194], [-9, 207], [2, 214]];
const DERRIERE = [[2, 214], [14, 204], [28, 182], [40, 150], [48, 112], [51, 74], [48, 42], [38, 18]];
const DESSUS = [[38, 18], [24, 6], [8, 0], [-6, 1]];
const S1 = [[-6, 1], [-12, 30], [-18, 70], [-20, 110], [-17, 150], [-10, 183], [2, 214]];   // droit fémoral / vaste latéral
const S2 = [[38, 18], [36, 50], [34, 90], [28, 130], [18, 170], [2, 214]];                // vaste latéral / vaste intermédiaire
const rev = a => a.slice().reverse();
const ENTIERE = [...DEVANT, ...DERRIERE.slice(1), ...DESSUS.slice(1, -1)];
const DF = [...DEVANT, ...rev(S1).slice(1, -1)];                  // droit fémoral
const VL = [...S1, ...rev(S2).slice(1), ...DESSUS.slice(1, -1)];  // vaste latéral
// tendon du droit fémoral, dans sa moitié basse (le long du milieu de la pièce)
const TENDON_DF = [[-36, 100], [-33, 132], [-27, 162], [-18, 188], [-5, 209]];
// vaste intermédiaire et vaste médial, sortis ensemble : le vaste intermédiaire sur toute la
// longueur du fémur, le vaste médial à partir du tiers supérieur, en dedans (derrière, vu du dehors)
const VIM = [[0, 0], [-14, 18], [-22, 56], [-24, 104], [-20, 148], [-12, 184], [0, 212], [16, 198], [29, 170], [37, 130],
  [38, 92], [32, 52], [18, 16]];
const LIM_VM = [[35, 70], [20, 96], [11, 134], [5, 172], [0, 212]];   // limite vaste intermédiaire / vaste médial
const LAME_VI = [[2, 10], [-3, 50], [-6, 100], [-6, 150], [-3, 196]];
// les flèches du vaste médial, au milieu de sa bande
const GRAIN_VM = [[29, 104], [25, 136], [19, 168]];

// Mise en place : rotation de la pièce comme sur la carcasse (le haut vers l'arrière), échelle
// tirée de la hauteur de la rangée (les deux vignettes ont la même hauteur : même échelle).
const THETA = 10 * Math.PI / 180;
function repere(z, origine) {
  const co = Math.cos(THETA), si = Math.sin(THETA);
  // haut de la pièce vers la droite : v vers le bas tourne vers la gauche
  const R = ([u, v]) => [u * co - v * si, u * si + v * co];
  const hautPiece = 232;   // hauteur de la pièce tournée, marge comprise
  const k = (z.h - 12) / hautPiece;
  const o = origine(k);
  return { k, R, T: p => { const q = R(p); return [o[0] + q[0] * k, o[1] + q[1] * k]; }, dir: v => R(v) };
}

// flèche de grain : centrée en c (unités de pièce), direction page « d », longueur « L » en px
function grain(h, P, c, d, L = 15) {
  const m = P.T(c), n = Math.hypot(d[0], d[1]), u = [d[0] / n, d[1] / n];
  const a = [m[0] - u[0] * L / 2, m[1] - u[1] * L / 2], b = [m[0] + u[0] * L / 2, m[1] + u[1] * L / 2];
  return h.fleche(`M${f1(a[0])} ${f1(a[1])} L${f1(b[0])} ${f1(b[1])}`, h.a.detail);
}
// chevrons : deux flèches qui convergent sur la lame (ou le tendon), vers le bas de la pièce
function chevrons(h, P, axe, ts, { w = 8, angle = 32, L = 14 } = {}) {
  const out = [];
  const pts = axe.map(P.T);
  const cum = [0];
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const at = t => {
    const s = t * cum[cum.length - 1];
    let i = 1; while (i < cum.length - 1 && cum[i] < s) i++;
    const r = (s - cum[i - 1]) / (cum[i] - cum[i - 1]);
    return { p: [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * r, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * r], a: unit(pts[i - 1], pts[i]) };
  };
  const ca = Math.cos(angle * Math.PI / 180), sa = Math.sin(angle * Math.PI / 180);
  ts.forEach(t => {
    const { p, a } = at(t), n = [a[1], -a[0]];
    [1, -1].forEach(s => {
      // bout de la flèche à 2 px de l'axe ; la flèche arrive sur l'axe sous « angle »
      const fin = [p[0] + n[0] * s * 2.2, p[1] + n[1] * s * 2.2];
      const dir = [a[0] * ca - n[0] * s * sa, a[1] * ca - n[1] * s * sa];
      const deb = [fin[0] - dir[0] * L, fin[1] - dir[1] * L];
      out.push(h.fleche(`M${f1(deb[0])} ${f1(deb[1])} L${f1(fin[0])} ${f1(fin[1])}`, h.a.detail));
    });
  });
  return out.join('\n');
}

const POINTILLE = 'fill="none" stroke="#1A1A1A" stroke-width="0.7" stroke-linecap="round" stroke-dasharray="1.6 2.4"';
const COUTEAU = 'fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6 3.5"';
const DIR_VL = [-0.71, 0.71];   // vers le bas et l'avant (hachures du vaste latéral, fig. 309)
const DIR_VM = [-0.42, 0.91];   // hachures du vaste médial, fig. 287 : plus raides

module.exports = (h) => {
  // les deux vues de la carcasse : même cadre, même échelle
  const CADRE = [1150, 282, 1500, 800];
  const place = z => C.placer(z, { cadre: CADRE });

  // ── vignettes ──
  const origineEntiere = z => k => [z.l * 0.54, 8 + 6 * k];
  const origineSeparee = z => k => [z.l * 0.5, 8 + 6 * k];
  const ECART = { df: -62, vl: 6, vim: 88 };    // décalage horizontal de chaque pièce, en unités de pièce

  const decale = (pts, dx) => pts.map(p => [p[0] + dx, p[1]]);

  return {
    ref: '62-07',
    titre: 'La pointe de surlonge, entière puis muscle par muscle',
    desc: "Cuisse d'orignal écorchée, de profil gauche, l'avant à gauche. En haut à gauche, la pointe de surlonge en "
      + "trame, devant le fémur, de la rotule à la pointe de la hanche ; le grand trochanter en haut du fémur. En haut à "
      + "droite, le même cadre : une entaille au-dessus de la rotule jusqu'à l'os, puis la lame à plat contre le fémur "
      + "jusqu'au grand trochanter, la flèche vers le haut. En bas, à la même échelle : à gauche la pointe entière, en "
      + "ballon dans sa membrane, les coutures entre les chefs en pointillé et des flèches de grain qui ne vont pas dans le "
      + "même sens ; à droite la même en trois pièces : le droit fémoral (fibres en chevron vers son tendon, dans le bas), "
      + "le vaste latéral (fibres vers le bas et l'avant), le vaste intermédiaire et le vaste médial ensemble (chevrons "
      + "de part et d'autre d'une lame pour le premier, une seule direction pour le second).",
    format: 'pleine',
    disposition: [['ou', 'couteau'], ['entiere', 'separee']],
    hauteurs: [1, 1],
    largeurs: [[1, 1], [2, 3]],
    vues: {
      ou: {
        dessin: z => C.dessiner(h, place(z), {
          id: 'v1',
          os: ['bassin', 'femur', 'rotule', 'tibia'],
          osForts: ['femur', 'rotule'],
          muscles: ['pointeSurlonge'],
          valeur: { muscles: ['pointeSurlonge'], trame: 'gris' },
          loin: 'gris',
          fondOs: false,
        }),
        renvois: z => {
          const p = place(z);
          return [
            { n: 1, texte: 'pointe de surlonge', rond: [22, 150], cible: p.pt([1224, 500]) },
            { n: 2, texte: 'pointe de la hanche', rond: [22, 40], cible: p.pt('pointeHanche') },
            { n: 3, texte: 'grand trochanter', rond: [z.l - 22, 40], cible: p.pt('grandTrochanter') },
            { n: 4, texte: 'fémur', rond: [z.l - 22, 150], cible: p.pt([1300, 560]) },
            { n: 5, texte: 'rotule', rond: [22, z.h - 60], cible: p.pt('rotule') },
          ];
        },
      },
      couteau: {
        dessin: z => {
          const p = place(z);
          const T = q => p.pt(q);
          // le long du fémur (bord de devant, puis le dessus du col jusqu'au trochanter), décalé hors de l'os
          const os = lisse([[1256, 626], [1262, 606], [1276, 574], [1292, 538], [1305, 506], [1311, 486], [1310, 470],
            [1316, 452], [1330, 446], [1346, 449], [1360, 448], [1373, 442]], false, 3).map(T);
          const long = os.map((q, i) => {
            const t = unit(os[Math.max(0, i - 1)], os[Math.min(os.length - 1, i + 1)]);
            return [q[0] + t[1] * 5, q[1] - t[0] * 5];
          });
          // l'entaille au-dessus de la rotule, du devant de la cuisse jusqu'à l'os
          const entaille = [T([1209, 627]), [long[0][0], long[0][1]]];
          // la flèche du geste : de la rotule vers le trochanter, devant le chemin
          const fl = lisse([[1268, 572], [1282, 536], [1293, 504], [1298, 478]], false, 3).map(T).map(q => [q[0] - 16, q[1] - 2]);
          return [
            C.dessiner(h, p, {
              id: 'v2',
              os: ['bassin', 'femur', 'rotule', 'tibia'],
              osForts: ['femur', 'rotule'],
              muscles: ['pointeSurlonge'],
              loin: 'gris',
            }),
            `<path d="${dPts([...entaille, ...long.slice(1)], false)}" ${COUTEAU}/>`,
            // la charte : la flèche du geste en rouge
            h.geste(dPts(fl, false)),
          ].join('\n');
        },
        renvois: z => {
          const p = place(z);
          return [
            { n: 6, texte: 'entaille au-dessus de la rotule, jusqu’à l’os', rond: [22, z.h - 120], cible: p.pt([1222, 624]) },
            { n: 7, texte: 'lame à plat contre le fémur', rond: [z.l - 22, 110], cible: p.pt([1300, 510]) },
          ];
        },
      },
      entiere: {
        dessin: z => {
          const P = repere(z, origineEntiere(z));
          const T = pts => pts.map(P.T);
          const ent = T(lisse(ENTIERE, true));
          const out = [];
          // membrane : un fin liseré autour du ballon
          // décalée vers l'extérieur le long de la normale (le sens dépend de l'orientation du tracé)
          const aire = ent.reduce((s, q, i) => { const r = ent[(i + 1) % ent.length]; return s + q[0] * r[1] - r[0] * q[1]; }, 0);
          const sg = aire > 0 ? 1 : -1;
          const memb = ent.map((q, i) => {
            const t = unit(ent[(i - 2 + ent.length) % ent.length], ent[(i + 2) % ent.length]);
            return [q[0] + sg * t[1] * 3.2, q[1] - sg * t[0] * 3.2];
          });
          out.push(`<path d="${dPts(memb, true)}" ${h.a.fin}/>`);
          out.push(`<path d="${dPts(ent, true)}" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="2.4" stroke-linejoin="round"/>`);
          // coutures entre les chefs, sous la membrane
          out.push(`<path d="${dPts(T(lisse(S1)), false)}" ${POINTILLE}/>`);
          out.push(`<path d="${dPts(T(lisse(S2)), false)}" ${POINTILLE}/>`);
          // grain : droit fémoral (chevrons vers son tendon, moitié basse), vaste latéral (vers le bas et l'avant)
          out.push(chevrons(h, P, TENDON_DF, [0.22, 0.52, 0.8], { w: 7, angle: 30, L: 12 }));
          semer(VL, 30, 10, [6, 24]).forEach(q => out.push(grain(h, P, q, DIR_VL, 15)));
          return out.join('\n');
        },
        renvois: z => {
          const P = repere(z, origineEntiere(z));
          const ent = lisse(ENTIERE, true).map(P.T);
          const bord = ent.reduce((b, q) => (q[0] < b[0] ? q : b), [1e9, 0]);
          return [
            { n: 8, texte: 'la pointe entière, dans sa membrane', rond: [16, Math.round(bord[1] - 90)], cible: [bord[0] - 3, bord[1]] },
          ];
        },
      },
      separee: {
        dessin: z => {
          const P = repere(z, origineSeparee(z));
          const T = pts => pts.map(P.T);
          const out = [];
          const piece = (pts, dx) => T(lisse(decale(pts, dx), true));
          // droit fémoral
          out.push(`<path d="${dPts(piece(DF, ECART.df), true)}" ${h.a.contour}/>`);
          out.push(`<path d="${dPts(T(lisse(decale(TENDON_DF, ECART.df))), false)}" ${h.a.fin}/>`);
          const Pdf = { ...P, T: q => P.T([q[0] + ECART.df, q[1]]) };
          out.push(chevrons(h, Pdf, TENDON_DF, [0.22, 0.52, 0.8], { w: 7, angle: 30, L: 12 }));
          // vaste latéral
          out.push(`<path d="${dPts(piece(VL, ECART.vl), true)}" ${h.a.contour}/>`);
          const Pvl = { ...P, T: q => P.T([q[0] + ECART.vl, q[1]]) };
          semer(VL, 30, 10, [6, 24]).forEach(q => out.push(grain(h, Pvl, q, DIR_VL, 15)));
          // vaste intermédiaire et vaste médial, ensemble
          out.push(`<path d="${dPts(piece(VIM, ECART.vim), true)}" ${h.a.contour}/>`);
          out.push(`<path d="${dPts(T(lisse(decale(LIM_VM, ECART.vim))), false)}" ${h.a.detail}/>`);
          out.push(`<path d="${dPts(T(lisse(decale(LAME_VI, ECART.vim))), false)}" ${h.a.fin}/>`);
          const Pvi = { ...P, T: q => P.T([q[0] + ECART.vim, q[1]]) };
          out.push(chevrons(h, Pvi, LAME_VI, [0.14, 0.38, 0.62, 0.86], { w: 7, angle: 34, L: 12 }));
          GRAIN_VM.forEach(q => out.push(grain(h, Pvi, q, DIR_VM, 14)));
          return out.join('\n');
        },
        renvois: z => {
          const P = repere(z, origineSeparee(z));
          const at = (q, dx) => P.T([q[0] + dx, q[1]]);
          return [
            { n: 9, texte: 'droit fémoral, rectus femoris', rond: [16, 24], cible: at([-30, 40], ECART.df) },
            { n: 10, texte: 'vaste latéral, vastus lateralis', rond: [z.l / 2 - 20, 14], cible: at([14, 12], ECART.vl) },
            { n: 11, texte: 'vaste intermédiaire, vastus intermedius', rond: at([58, -2], 0), cible: at([-15, 62], ECART.vim) },
            { n: 12, texte: 'vaste médial, vastus medialis', rond: [z.l - 16, z.h - 60], cible: at([26, 152], ECART.vim) },
          ];
        },
      },
    },
  };
};
