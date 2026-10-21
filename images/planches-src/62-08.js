// Planche 62-08 — le chapeau de l'intérieur de ronde et son côté mou.
// Chapitre 62, § 5.2 (ligne « Chapeau de l'intérieur de ronde : Gracilis, avec son côté mou »).
// Documentation : suivi/62-documentation-planches.md, section 11 (ce qui est établi, vue par vue),
// sections 2 et 3 (conventions ; écart n° 1 sur le nom, tranché par JP le 29 septembre 2026 : le
// nom de l'ACIA et de l'OQLF, suivi/62-redaction.md, « Choix de JP »), et « Base commune »
// (images/planches-src/_carcasse-orignal.js).
//
// La face interne de la cuisse n'est pas dans le module (elle ne se voit pas de profil gauche) :
// elle se dessine ici, sur la silhouette et les os du module, d'après Sisson fig. 287 (gracilis,
// sartorius) et fig. 288 (pectiné), cheval, face interne de la cuisse DROITE. Vue de l'intérieur,
// le quartier droit a l'avant à gauche, comme le profil gauche du module : le contour est le même.
// La figure du cheval est ramenée sur la cuisse de l'orignal par ses repères (devant et derrière
// de la cuisse, pubis coupé, rotule) ; aucune dimension n'est établie : aucune cote.
//
// Vue 1 : le quartier arrière vu de l'intérieur, le pubis coupé à la symphyse ; le chapeau
//         (gracilis) et le côté mou (sartorius devant, pectiné caché sous le chapeau) en trame.
// Vue 2 : le chapeau décousu (origine au pubis, bord avant, bout) et rabattu vers l'arrière ;
//         le côté mou décousu de la pointe de surlonge. Pointillé = couture ; flèche = sens du geste.
// Vue 3 : les trois pièces sorties, écartées sans changer de hauteur, à la même échelle entre
//         elles, avec leur grain (UNL) : gracilis unipenné (un sens, l'obliquité des hachures de
//         Sisson fig. 287), sartorius fusiforme (en long), pectiné bipenné (chevron sur la lame
//         du milieu du bout proximal).
const C = require('./_carcasse-orignal');

// ─── La face interne, dans le repère U du module ─────────────────────────────────────────
// Pubis et ischion coupés à la symphyse (Sisson fig. 287, n° 13) : bout avant épais, arrière mince.
const SYMPHYSE = [[1306, 470], [1311, 459], [1324, 455], [1345, 456], [1375, 459], [1405, 461], [1428, 459], [1440, 452],
  [1449, 451], [1452, 459], [1447, 468], [1430, 473], [1400, 476], [1370, 479], [1340, 482], [1320, 483], [1309, 480]];
// Le chapeau : nappe à quatre côtés, du bord de la symphyse jusqu'au grasset (CEE-ONU 9239 ; SISSON).
const G_ORIGINE = [[1311, 486, 'c'], [1340, 485], [1370, 481], [1400, 477], [1430, 474], [1447, 470, 'c']];
const G_ARRIERE = [[1449, 490], [1446, 520], [1439, 560], [1426, 605], [1410, 648]];
const G_H1 = [1395, 680, 'c'];
const G_BOUT = [[1380, 697], [1356, 707], [1330, 706], [1308, 697], [1293, 680, 'c']];
const G_AVANT = [[1289, 650], [1288, 615], [1290, 575], [1295, 535], [1303, 500]];
const GRACILIS = [...G_ORIGINE, ...G_ARRIERE, G_H1, ...G_BOUT, ...G_AVANT];
// Le couturier : bande étroite devant le chapeau, du bassin au dedans du grasset, derrière la rotule.
const S_AVANT = [[1236, 480], [1240, 540], [1248, 590], [1258, 630], [1266, 660], [1274, 690]];
const SARTORIUS = [[1238, 410, 'c'], [1250, 404], [1261, 409, 'c'],
  [1263, 460], [1266, 515], [1272, 565], [1279, 610], [1285, 645], [1287, 675], [1282, 700, 'c'],
  ...S_AVANT.slice().reverse()];
// Le pectiné : fuseau du devant du pubis au milieu du fémur (SISSON), caché sous le chapeau.
const PECTINEUS = [[1315, 486, 'c'], [1327, 484], [1339, 487, 'c'], [1343, 505], [1341, 530], [1333, 553], [1321, 572],
  [1310, 585, 'c'], [1303, 570], [1300, 545], [1301, 518], [1306, 497]];

// Le chemin du couteau (vue 2), sur les coutures.
const COUTEAU_CHAPEAU = [[1440, 479], [1400, 481.5], [1370, 485.5], [1340, 489], [1315, 491, 'c'], [1305, 502], [1297, 535],
  [1292, 575], [1290, 615], [1291, 650], [1295, 680, 'c'], [1309, 697], [1331, 706], [1356, 707], [1378, 698], [1389, 688]];
const COUTEAU_MOU = [[1233, 422], [1231, 480], [1235, 540], [1242, 585], [1250, 622]];
// le chapeau qu'on lève et qu'on rabat vers l'arrière
const LEVER = [[1330, 610], [1362, 578], [1400, 566], [1440, 572]];

// Le quartier, en pièce : la croupe, la fesse et la patte (silhouette du module), et le devant
// coupé à la limite de la hanche (région 2 de la 62-02).
function quartier() {
  const S = C.SILHOUETTE;
  const i0 = S.findIndex(q => q[0] === 1187 && q[1] === 291);
  const i1 = S.findIndex(q => q[0] === 1233 && q[1] === 696);
  const hanche = C.LIMITES.hanche.slice(1, -1).reverse();   // de [1224, 686] à [1192, 403]
  // le premier point d'un tracé fermé ne peut pas être un angle (voir fermer) : on part du devant
  return [...hanche.slice(3), [1187, 291, 'c'], ...S.slice(i0 + 1, i1 + 1), ...hanche.slice(0, 3)];
}

// C.dense ferme un tracé en laissant tomber son premier point quand il y a des angles : on fait
// partir le tracé d'un point qui n'est pas un angle, et on le répète à la fin.
function fermer(pts) {
  if (!pts.some(q => q[2] === 'c')) return pts;
  const i = pts.findIndex(q => q[2] !== 'c');
  const r = [...pts.slice(i), ...pts.slice(0, i)];
  return [...r, [r[0][0], r[0][1]]];
}

module.exports = (h) => {
  const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
  const f1 = v => Math.round(v * 10) / 10;
  const dd = (pts, ferme) => 'M' + pts.map(q => `${f1(q[0])} ${f1(q[1])}`).join(' L') + (ferme ? ' Z' : '');
  const trait = (ep, extra = '') => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"${extra}`;
  const POINTILLE = ' stroke-dasharray="0.1 3.4"';
  const TIRETE = ' stroke-dasharray="5 3.5"';
  const unit = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; return [dx / L, dy / L]; };

  // trames : points clairs pour le chapeau, points serrés pour le côté mou ; hachure fine pour l'os coupé
  const trames = id => [
    `<pattern id="${id}-chapeau" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="1.25" cy="1.25" r="0.7" fill="${NOIR}" stroke="none"/><circle cx="3.75" cy="3.75" r="0.7" fill="${NOIR}" stroke="none"/></pattern>`,
    `<pattern id="${id}-mou" width="3" height="3" patternUnits="userSpaceOnUse"><circle cx="0.75" cy="0.75" r="0.6" fill="${NOIR}" stroke="none"/><circle cx="2.25" cy="2.25" r="0.6" fill="${NOIR}" stroke="none"/></pattern>`,
    `<pattern id="${id}-os" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="2.6" stroke="${NOIR}" stroke-width="0.5"/></pattern>`,
  ].join('');

  // ─── placement : les vues 1 et 2 sur le repère du module, à la même échelle ────────────
  const K = 0.437;
  const CADRE1 = [1130, 282, 1510, 766];
  const CADRE2 = [1130, 282, 1560, 766];
  const place1 = z => C.placer(z, { cadre: CADRE1, echelle: K });
  const place2 = z => C.placer(z, { cadre: CADRE2, echelle: K });
  const outils = p => {
    const pas = Math.min(3 / Math.max(p.k, 0.2), 6);
    return {
      L: (pts, ferme = false) => C.dense(ferme ? fermer(pts) : pts, pas, ferme).map(p.T),
      B: pts => pts.map(p.T),
    };
  };

  // Le fond commun des vues 1 et 2 : la pièce en blanc, puis (après les muscles) le contour.
  const fond = (p, id, cadre) => {
    const { L } = outils(p);
    const c0 = p.T([cadre[0], cadre[1]]), c1 = p.T([cadre[2], cadre[3]]);
    const x0 = Math.max(0, c0[0] - 2), y0 = Math.max(0, c0[1] - 2);
    const x1 = Math.min(p.z.l, c1[0] + 2), y1 = Math.min(p.z.h, c1[1] + 2);
    const q = L(quartier(), true);
    return {
      debut: `<defs>${trames(id)}<clipPath id="${id}-vue"><rect x="${f1(x0)}" y="${f1(y0)}" width="${f1(x1 - x0)}" height="${f1(y1 - y0)}"/></clipPath></defs>\n`
        + `<g clip-path="url(#${id}-vue)">\n<path d="${dd(q, true)}" fill="${BLANC}" stroke="none"/>`,
      contour: `<path d="${dd(q, true)}" ${trait(2.4)}/>`,
      fin: '</g>',
    };
  };
  const symphyse = (p, id) => {
    const { L } = outils(p);
    const s = dd(L(SYMPHYSE, true), true);
    return `<path d="${s}" fill="${BLANC}" stroke="none"/><path d="${s}" fill="url(#${id}-os)" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"/>`;
  };
  const os = (p, noms, ep, blanc = false) => {
    const { L } = outils(p);
    return noms.map(n => `<path d="${dd(L(C.OS[n], true), true)}" ${blanc ? `fill="${BLANC}" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round"` : trait(ep)}/>`).join('\n');
  };
  const trame = (pts, ferme, url, p) => `<path d="${dd(outils(p).L(pts, ferme), true)}" fill="url(#${url})" stroke="none"/>`;
  const bord = (pts, ferme, at, p) => `<path d="${dd(outils(p).L(pts, ferme), ferme)}" ${at}/>`;

  // ─── vue 3 : les pièces sorties, écartées vers l'arrière sans changer de hauteur ─────────
  const ECART = { sartorius: 0, pectineus: 12, gracilis: 84 };
  const BOITE3 = [1236, 404, 1449 + ECART.gracilis, 707];
  const place3 = z => C.placer(z, { cadre: BOITE3, marge: 5 });
  const decale = (pts, dx) => pts.map(q => [q[0] + dx, q[1], q[2]]);

  // flèche de grain : courte, à deux pointes (un grain est un axe, pas un sens)
  const grain = (a, b) => `<path d="M${f1(a[0])} ${f1(a[1])} L${f1(b[0])} ${f1(b[1])}" ${trait(0.7)} marker-start="url(#fl)" marker-end="url(#fl)"/>`;

  // ─── le chapeau rabattu (vue 2) : chaque point du chapeau renversé par-dessus son bord arrière,
  // la largeur raccourcie de moitié (la nappe se lève vers le lecteur).
  const H0 = [1447, 470], H1 = [1395, 680];
  const uH = unit(H0, H1), nH = [uH[1], -uH[0]];
  const rabat = (q, f = 0.55) => {
    const v = [q[0] - H0[0], q[1] - H0[1]];
    const a = v[0] * uH[0] + v[1] * uH[1], b = v[0] * nH[0] + v[1] * nH[1];
    const r = [H0[0] + a * uH[0] - b * f * nH[0], H0[1] + a * uH[1] - b * f * nH[1]];
    return q[2] ? [...r, q[2]] : r;
  };
  const RABAT = [[1447, 470, 'c'], ...G_ARRIERE, G_H1,
    ...G_BOUT.map(q => rabat(q)), ...G_AVANT.map(q => rabat(q)),
    rabat(G_ORIGINE[0]), ...G_ORIGINE.slice(1, -1).map(q => rabat(q))];

  return {
    ref: '62-08',
    titre: 'Le chapeau de l’intérieur de ronde et son côté mou',
    desc: 'Le quartier arrière droit d’un orignal, vu par sa face interne (l’avant à gauche), le pubis coupé à la symphyse. '
      + 'À gauche, où sont les trois petits muscles de l’intérieur de la cuisse : le chapeau (gracilis), grande nappe à '
      + 'quatre côtés qui part du bord de la symphyse et couvre l’intérieur de la cuisse jusqu’au grasset ; devant lui, le '
      + 'côté mou : le couturier (sartorius), bande étroite qui descend du bassin au dedans du grasset derrière la rotule, '
      + 'et le pectiné, fuseau caché sous le chapeau, du devant du pubis au milieu du fémur. Au milieu, le couteau : le '
      + 'chapeau décousu le long du pubis, de son bord avant et de son bout, puis rabattu vers l’arrière ; le côté mou '
      + 'décousu de la pointe de surlonge, de haut en bas. À droite, les trois pièces sorties, à la même échelle : le '
      + 'chapeau avec un seul grain oblique, le couturier au grain en long, le pectiné au grain en chevron de part et '
      + 'd’autre d’une lame qui part du milieu de son bout près du pubis.',
    format: 'demi',
    disposition: [['ou', 'couteau', 'sortis']],
    largeurs: [[1, 1.12, 1.05]],
    vues: {
      // ─── Vue 1 : où ils sont ────────────────────────────────────────────────────────────
      ou: {
        dessin: z => {
          const p = place1(z), id = 'p08a';
          const f = fond(p, id, CADRE1);
          return [
            f.debut,
            os(p, ['bassin', 'femur', 'tibia'], 0.5),
            trame(GRACILIS, true, `${id}-chapeau`, p),
            trame(SARTORIUS, true, `${id}-mou`, p),
            trame(PECTINEUS, true, `${id}-mou`, p),
            bord(PECTINEUS, true, trait(0.7, TIRETE), p),
            bord(GRACILIS, true, trait(1.4), p),
            bord(SARTORIUS, true, trait(1.4), p),
            symphyse(p, id),
            os(p, ['rotule'], 1.4, true),
            f.contour,
            f.fin,
          ].join('\n');
        },
        renvois: z => {
          const p = place1(z);
          return [
            { n: 1, texte: 'chapeau : gracilis', rond: p.pt([1490, 580]), cible: p.pt([1385, 600]) },
            { n: 2, texte: 'côté mou : sartorius (couturier)', rond: p.pt([1152, 520]), cible: p.pt([1252, 545]) },
            { n: 3, texte: 'côté mou : pectineus, sous le chapeau', rond: p.pt([1152, 440]), cible: p.pt([1318, 520]) },
            { n: 4, texte: 'pubis coupé à la symphyse', rond: p.pt([1480, 330]), cible: p.pt([1395, 466]) },
            { n: 5, texte: 'rotule', rond: p.pt([1152, 640]), cible: p.pt([1240, 652]) },
            { n: 6, texte: 'fémur', rond: p.pt([1490, 690]), cible: p.pt([1333, 568]) },
          ];
        },
      },
      // ─── Vue 2 : le couteau ─────────────────────────────────────────────────────────────
      couteau: {
        dessin: z => {
          const p = place2(z), id = 'p08b';
          const f = fond(p, id, CADRE2);
          const { L } = outils(p);
          const rab = L(RABAT, true);
          return [
            f.debut,
            trame(SARTORIUS, true, `${id}-mou`, p),
            trame(PECTINEUS, true, `${id}-mou`, p),
            bord(PECTINEUS, true, trait(1.4, POINTILLE), p),
            bord(SARTORIUS.slice(0, 10), false, trait(1.4, POINTILLE), p),
            symphyse(p, id),
            os(p, ['rotule'], 0.7, true),
            f.contour,
            // le chapeau rabattu, par-dessus le contour
            `<path d="${dd(rab, true)}" fill="${BLANC}" stroke="none"/>`,
            `<path d="${dd(rab, true)}" fill="url(#${id}-chapeau)" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"/>`,
            // le couteau. La charte : le chemin du couteau sur le chapeau est le geste de la vue, en
            // rouge, à côté de la couture (qui reste en pointillé), sur un liseré blanc
            `<path d="${dd(L(COUTEAU_CHAPEAU), false)}" ${trait(1.4, POINTILLE)}/>`,
            (() => {
              const c = p.T([1370, 590]), q = L(COUTEAU_CHAPEAU), n = q.length;
              const dec = q.map((r, i) => {
                const t = unit(q[Math.max(0, i - 1)], q[Math.min(n - 1, i + 1)]);
                let nx = -t[1], ny = t[0];
                if ((c[0] - r[0]) * nx + (c[1] - r[1]) * ny < 0) { nx = -nx; ny = -ny; }
                return [r[0] + nx * 6, r[1] + ny * 6];
              });
              const long = [0];
              for (let i = 1; i < n; i++) long.push(long[i - 1] + Math.hypot(dec[i][0] - dec[i - 1][0], dec[i][1] - dec[i - 1][1]));
              const fl = dec.filter((r, i) => long[i] > 6 && long[i] < long[n - 1] - 8);
              return `<path d="${dd(fl)}" fill="none" stroke="${BLANC}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>\n` + h.geste(dd(fl));
            })(),
            `<path d="${dd(L(COUTEAU_MOU), false)}" ${trait(1.4, POINTILLE)} marker-end="url(#fl)"/>`,
            `<path d="${dd(L(LEVER), false)}" ${trait(1.4)} marker-end="url(#fl)"/>`,
            f.fin,
          ].join('\n');
        },
        renvois: z => {
          const p = place2(z);
          return [
            { n: 7, texte: 'chapeau décousu, rabattu vers l’arrière', rond: p.pt([1530, 330]), cible: p.pt([1478, 520]) },
            { n: 8, texte: 'côté mou décousu de la pointe de surlonge', rond: p.pt([1152, 470]), cible: p.pt([1232, 500]) },
          ];
        },
      },
      // ─── Vue 3 : les pièces sorties ─────────────────────────────────────────────────────
      sortis: {
        dessin: z => {
          const p = place3(z);
          const { L, B } = outils(p);
          const out = [];
          const piece = (pts, dx) => out.push(`<path d="${dd(L(decale(pts, dx), true), true)}" fill="${BLANC}" stroke="${NOIR}" stroke-width="2.4" stroke-linejoin="round"/>`);
          piece(SARTORIUS, ECART.sartorius);
          piece(PECTINEUS, ECART.pectineus);
          piece(GRACILIS, ECART.gracilis);
          // couturier : fusiforme, fibres dans la longueur
          [[[1249, 428], [1252, 488]], [[1254, 518], [1260, 580]], [[1264, 608], [1274, 666]]]
            .forEach(([a, b]) => out.push(grain(p.T(a), p.T(b))));
          // chapeau : unipenné, un seul sens, l'obliquité des hachures de Sisson fig. 287
          // (les fibres descendent vers l'avant, à peu près un sixième de tour sur la verticale)
          const dG = [-Math.sin(12 * Math.PI / 180), Math.cos(12 * Math.PI / 180)], lg = 46;
          [[1330, 540], [1372, 535], [1414, 535], [1326, 632], [1366, 640], [1404, 625]].forEach(c => {
            const a = [c[0] + ECART.gracilis - dG[0] * lg / 2, c[1] - dG[1] * lg / 2];
            const b = [c[0] + ECART.gracilis + dG[0] * lg / 2, c[1] + dG[1] * lg / 2];
            out.push(grain(p.T(a), p.T(b)));
          });
          // pectiné : bipenné, la lame au milieu du bout proximal, les fibres en chevron de part et d'autre
          const P0 = [1327 + ECART.pectineus, 487], P1 = [1310 + ECART.pectineus, 585];
          const u = unit(P0, P1), n = [u[1], -u[0]], lon = Math.hypot(P1[0] - P0[0], P1[1] - P0[1]);
          const le = t => [P0[0] + u[0] * lon * t, P0[1] + u[1] * lon * t];
          out.push(`<path d="${dd(B([P0, le(0.45)]), false)}" ${trait(0.7)}/>`);
          const ang = 35 * Math.PI / 180, lf = 20;
          [0.3, 0.58].forEach(t => [1, -1].forEach(s => {
            const d = [Math.cos(ang) * u[0] + s * Math.sin(ang) * n[0], Math.cos(ang) * u[1] + s * Math.sin(ang) * n[1]];
            const a = [le(t)[0] + s * 2.5 * n[0], le(t)[1] + s * 2.5 * n[1]];
            out.push(grain(p.T(a), p.T([a[0] + d[0] * lf, a[1] + d[1] * lf])));
          }));
          return out.join('\n');
        },
        renvois: z => {
          const p = place3(z);
          return [
            { n: 9, texte: 'chapeau : un seul grain, oblique', rond: p.pt([1500, 425]), cible: p.pt([1455, 500]) },
            { n: 10, texte: 'sartorius : grain en long', rond: p.pt([1330, 680]), cible: p.pt([1280, 640]) },
            { n: 11, texte: 'pectineus : grain en chevron', rond: p.pt([1330, 625]), cible: p.pt([1332, 575]) },
          ];
        },
      },
    },
  };
};
