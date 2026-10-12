// Planche 62-10 — le haut de surlonge (retitrée le 29 septembre 2026 : « haut de croupe » n'est
// attesté nulle part ; le nom de l'ACIA et de l'OQLF est « haut de surlonge », choix de JP,
// suivi/62-redaction.md, « Choix de JP »).
// Chapitre 62, § 5.2 (tableau 5.2 : « Gluteus medius et voisins | Peu de collagène, un peu de gras
// de couverture »). Documentation : suivi/62-documentation-planches.md, section 13 (ce qui est établi
// vue par vue), section 2 (conventions), section 5 et « Base commune » (la carcasse commune,
// images/planches-src/_carcasse-orignal.js). Figures regardées : sisson-1914-fig309 (p fessier moyen,
// 16 pointe de la hanche, 19 grand trochanter, 31 ligament sacro-sciatique), ellenberger-hirsch-t3
// (p), ellenberger-rind-t14 fig. 68, sisson-1914-fig153 (os coxal), acia-boeuf-32.
//
// Vue 1 — où il est : le quartier arrière de profil gauche, le fessier moyen en trame sur l'aile de
//   l'ilium, entre la pointe de la hanche, le sacrum et le grand trochanter ; les os vus au travers.
// Vue 2 — le couteau, la croupe de plus près : la membrane ouverte du grand trochanter vers le
//   ligament sacro-iliaque (CEE-ONU 9220), flèche dans ce sens ; la couture avec la pointe de
//   surlonge, entre le droit fémoral et le fessier moyen (IMPS 184) ; l'aile de l'ilium en trait
//   appuyé : la lame y passe à plat pour décoller le groupe de l'os (« separated from the ilium »).
// Vue 3 — le morceau sorti, vue éclatée : le fessier moyen couché face externe en haut, son gras de
//   couverture dessus (trame de points, épaisseur non mesurée : aucun chiffre), la chair en trame à
//   la coupe ; dessous, écartés dans l'ordre de l'extérieur vers l'intérieur, le fessier accessoire
//   et le fessier profond (GUELPH : trois couches, le moyen le plus gros des trois).
//
// NON ÉTABLI, donc pas dessiné : le grain du fessier moyen (aucune flèche de grain) ; l'épaisseur
// du gras ; le point de sonde. Le contour exact des deux voisins n'est décrit par aucune source :
// ils sont dessinés par leurs attaches seulement (l'accessoire, portion profonde du moyen, sous
// lui ; le profond, de l'ilium et de l'ischion à l'avant du grand trochanter), plus petits que le
// moyen, sans tendon. La langue lombaire du fessier moyen (jusqu'à la 4e lombaire chez le bœuf,
// « insignificant ») n'est pas dessinée.
const C = require('./_carcasse-orignal');

// Vue 1 : tout le quartier arrière jusqu'au grasset, pour qu'on reconnaisse la bête ;
// vue 2 : la croupe en gros plan. De l'air au-dessus du dos pour les pastilles.
const CADRE_ARRIERE = [1010, 190, 1540, 780];
const CADRE_CROUPE = [1150, 236, 1486, 500];

// Le fessier moyen du module (repère U).
const FM = C.MUSCLES.fessierMoyen.pts;

const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
const f1 = v => Math.round(v * 10) / 10;
const dP = (pts, ferme) => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + (ferme ? ' Z' : '');
// une couture qu'on ouvre : pointillé rond, posé sur un liseré blanc qui efface le trait plein des
// deux muscles qu'elle sépare
const pointille = `fill="none" stroke="${NOIR}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0.1 3.4"`;
const efface = `fill="none" stroke="${BLANC}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"`;
const bordFin = `fill="none" stroke="${NOIR}" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"`;

// Le contour du fessier moyen, lissé comme le module le lisse, coupé en deux : le bord de dessus
// et de devant (sous le gras, qui reste avec le morceau) et les deux coutures (derrière, du grand
// trochanter au sacrum, le long du biceps fémoral ; dessous, de la pointe de la hanche au grand
// trochanter, le long de la pointe de surlonge).
function decoupeFM() {
  const pts = C.dense(FM, 3, true);
  const d2 = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
  const proche = q => pts.reduce((b, p, i) => (d2(p, q) < d2(pts[b], q) ? i : b), 0);
  const a = proche([1402, 372]), b = proche([1204, 386]);
  const coutures = a < b ? pts.slice(a, b + 1) : [...pts.slice(a), ...pts.slice(0, b + 1)];
  const bord = a < b ? [...pts.slice(b), ...pts.slice(0, a + 1)] : pts.slice(b, a + 1);
  return { coutures, bord };
}

// ─── Vue 3 : les couches en vue éclatée ─────────────────────────────────────────────────────
// Chaque muscle est posé à plat, face externe en haut, vu en perspective cavalière : son contour de
// profil (le même qu'aux vues 1 et 2, un peu écrasé en hauteur) fait la face du dessus, et son
// épaisseur descend. Aucune épaisseur n'est établie : le moyen est seulement dessiné le plus gros
// des trois (GUELPH).
const ECRASE = 0.8;
const reduit = (pts, c, k) => pts.map(p => [c[0] + (p[0] - c[0]) * k, c[1] + (p[1] - c[1]) * k]);
// fessier accessoire : la portion profonde du moyen, sous lui ; plus petit
const ACCESSOIRE = reduit(FM, [1330, 430], 0.74);
// fessier profond : de la face externe de l'ilium et de l'ischion à l'avant du grand trochanter
const PROFOND = [[1232, 356], [1290, 360], [1350, 372], [1410, 392], [1446, 416], [1450, 438], [1420, 446],
  [1384, 452], [1356, 454], [1320, 438], [1276, 414], [1240, 392], [1226, 374]];

function chaineBasse(pts) {
  // la partie du contour tournée vers le bas, du point le plus à gauche au plus à droite
  let iL = 0, iR = 0;
  pts.forEach((p, i) => { if (p[0] < pts[iL][0]) iL = i; if (p[0] > pts[iR][0]) iR = i; });
  const n = pts.length, a = [], b = [];
  for (let i = iL; ; i = (i + 1) % n) { a.push(pts[i]); if (i === iR) break; }
  for (let i = iL; ; i = (i - 1 + n) % n) { b.push(pts[i]); if (i === iR) break; }
  const moy = c => c.reduce((s, p) => s + p[1], 0) / c.length;
  return moy(a) > moy(b) ? a : b;
}
const bas = (c, t) => c.map(p => [p[0], p[1] + t]);

module.exports = (h) => {
  const place1 = z => C.placer(z, { cadre: CADRE_ARRIERE });
  const place2 = z => C.placer(z, { cadre: CADRE_CROUPE });
  const lisseU = (p, pts, ferme = false) => C.dense(pts, 3, ferme).map(p.T);

  // la vue 3 : un repère à elle
  const X0 = 1190, X1 = 1456, Y0 = 305, HAUT = 12;
  const place3 = z => {
    const k = (z.l - 34) / (X1 - X0);
    return (q, dy = 0) => [(q[0] - X0) * k + 17, (q[1] - Y0) * k * ECRASE + HAUT + dy];
  };
  const ECART = [0, 50, 98];
  const EPAIS = { moyen: 20, gras: 5, accessoire: 11, profond: 6 };

  const couche = (z, pts, dy, epais, { gras = 0, idm }) => {
    const T = place3(z);
    const top = C.dense(pts, 3, true).map(q => T(q, dy));
    const ch = chaineBasse(top);
    const bande = [...ch, ...bas(ch, epais).reverse()];
    const out = [];
    out.push(`<path d="${dP(bande, true)}" fill="${BLANC}" stroke="none"/>`);
    out.push(`<path d="${dP(bande, true)}" fill="url(#${idm}-chair)" stroke="none"/>`);
    if (gras) {
      const bandeGras = [...ch, ...bas(ch, gras).reverse()];
      out.push(`<path d="${dP(bandeGras, true)}" fill="${BLANC}" stroke="none"/>`);
      out.push(`<path d="${dP(bandeGras, true)}" fill="url(#${idm}-gras)" stroke="none"/>`);
      out.push(`<path d="${dP(bas(ch, gras), false)}" ${bordFin}/>`);
    }
    out.push(`<path d="${dP(bande, true)}" fill="none" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"/>`);
    out.push(`<path d="${dP(top, true)}" fill="${BLANC}" stroke="none"/>`);
    if (gras) out.push(`<path d="${dP(top, true)}" fill="url(#${idm}-gras)" stroke="none"/>`);
    out.push(`<path d="${dP(top, true)}" fill="none" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"/>`);
    return out.join('\n');
  };

  const osCroupe = ['sacrum', 'queue', 'bassin', 'femur'];
  const musclesCuisse = ['pointeSurlonge', 'bicepsFemoral', 'semitendineux'];

  return {
    ref: '62-10',
    titre: 'Le haut de surlonge',
    desc: "Trois vues de la croupe d'une carcasse d'orignal écorchée, sans la tête, de profil gauche. "
      + "Première vue : le quartier arrière, le fessier moyen en trame, couché sur l'aile de l'ilium entre la pointe "
      + "de la hanche, le sacrum et le grand trochanter du fémur, les os vus au travers. Deuxième vue, la croupe de "
      + "plus près : les deux coutures en pointillé, la membrane qu'on ouvre du grand trochanter vers le ligament "
      + "sacro-iliaque (flèche vers le haut) et la couture avec la pointe de surlonge ; l'aile de l'ilium en trait "
      + "appuyé, contre laquelle la lame passe à plat. Troisième vue : le morceau sorti, en vue éclatée, le fessier "
      + "moyen couvert de son gras, et dessous, écartés, le fessier accessoire et le fessier profond. Aucune flèche "
      + "de grain : le sens des fibres de ce muscle n'est établi par aucune source.",
    format: 'demi',
    disposition: [['ou', 'couteau', 'sorti']],
    vues: {
      ou: {
        titre: 'Où il est',
        dessin: z => C.dessiner(h, place1(z), {
          id: 'v1', fondOs: false, loin: 'fin',
          os: ['vertebres', 'cote12', 'cote13', ...osCroupe, 'rotule', 'tibia'],
          osForts: ['bassin', 'sacrum'],
          muscles: ['fessierMoyen'],
          valeur: { muscles: ['fessierMoyen'], trame: 'gris' },
        }),
        renvois: z => {
          const p = place1(z);
          return [
            { n: 1, texte: 'haut de surlonge, M. gluteus medius', rond: [p.pt([1330, 0])[0], 14], cible: p.pt([1312, 352]) },
            { n: 2, texte: 'aile de l’ilium', rond: [p.pt([1215, 0])[0], 14], cible: p.pt([1238, 348]) },
            { n: 3, texte: 'pointe de la hanche', rond: [p.pt([1110, 0])[0], 14], cible: p.pt([1200, 380]) },
            { n: 4, texte: 'sacrum', rond: [p.pt([1445, 0])[0], 14], cible: p.pt([1360, 382]) },
            { n: 5, texte: 'grand trochanter du fémur', rond: [z.l - 12, p.pt([0, 540])[1]], cible: p.pt([1377, 451]) },
          ];
        },
      },
      couteau: {
        titre: 'Le couteau',
        dessin: z => {
          const p = place2(z);
          const out = [C.dessiner(h, p, {
            id: 'v2', fondOs: false, loin: 'fin',
            os: ['bassin', 'femur'],
            muscles: musclesCuisse,
          })];
          // l'aile de l'ilium, où la lame passe à plat, en trait appuyé (le reste de l'os en trait fin)
          const [a, b] = [p.pt([1150, 250]), p.pt([1292, 445])];
          out.push(`<defs><clipPath id="v2-aile"><rect x="${f1(a[0])}" y="${f1(a[1])}" width="${f1(b[0] - a[0])}" height="${f1(b[1] - a[1])}"/></clipPath></defs>`);
          out.push(`<path d="${dP(lisseU(p, C.OS.bassin, true), true)}" fill="none" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round" clip-path="url(#v2-aile)"/>`);
          const { coutures, bord } = decoupeFM();
          out.push(`<path d="${dP(bord.map(p.T), false)}" ${bordFin}/>`);
          out.push(`<path d="${dP(coutures.map(p.T), false)}" ${efface}/>`);
          out.push(`<path d="${dP(coutures.map(p.T), false)}" ${pointille}/>`);
          // le geste : du grand trochanter vers le ligament sacro-iliaque, le long de la couture
          const f = lisseU(p, [[1394, 460], [1398, 432], [1408, 404], [1420, 384]]);
          out.push(h.fleche(dP(f, false), h.a.arete));
          return out.join('\n');
        },
        renvois: z => {
          const p = place2(z);
          return [
            { n: 6, texte: 'membrane vers le ligament sacro-iliaque', rond: [p.pt([1452, 0])[0], 16], cible: p.pt([1386, 408]) },
            { n: 7, texte: 'couture avec la pointe de surlonge', rond: [p.pt([1262, 0])[0], z.h - 14], cible: p.pt([1282, 416]) },
            { n: 8, texte: 'la lame à plat contre l’aile de l’ilium', rond: [p.pt([1222, 0])[0], 16], cible: p.pt([1240, 340]) },
          ];
        },
      },
      sorti: {
        titre: 'Le morceau sorti',
        dessin: z => {
          const id = 'v3';
          const defs = `<defs>`
            + `<pattern id="${id}-chair" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="3" stroke="${NOIR}" stroke-width="0.5"/></pattern>`
            + `<pattern id="${id}-gras" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.7" fill="${NOIR}" stroke="none"/><circle cx="3" cy="3" r="0.7" fill="${NOIR}" stroke="none"/></pattern>`
            + `</defs>`;
          return [
            defs,
            couche(z, PROFOND, ECART[2], EPAIS.profond, { idm: id }),
            couche(z, ACCESSOIRE, ECART[1], EPAIS.accessoire, { idm: id }),
            couche(z, FM, ECART[0], EPAIS.moyen, { gras: EPAIS.gras, idm: id }),
          ].join('\n');
        },
        renvois: z => {
          const T = place3(z);
          return [
            { n: 9, texte: 'gras de couverture, laissé en place', rond: [z.l - 14, 14], cible: T([1330, 350]) },
            { n: 10, texte: 'fessier moyen, le plus gros des trois', rond: [12, T([0, 400])[1] + 6], cible: T([1232, 400], 14) },
            { n: 11, texte: 'fessier accessoire, M. gluteus accessorius', rond: [12, T([0, 430], ECART[1])[1] + 4], cible: T([1262, 412], ECART[1] + 6) },
            { n: 12, texte: 'fessier profond, M. gluteus profundus', rond: [z.l - 12, T([0, 440], ECART[2])[1] + 24], cible: T([1430, 446], ECART[2] + 2) },
          ];
        },
      },
    },
  };
};
