// Planche 62-05 — l'intérieur de ronde (semi-membraneux et adducteur, sans le chapeau ni le côté mou).
// Chapitre 62, tableau 5.2 et § 5.6 ; le geste est au ch. 63, étape 8. Documentation :
// suivi/62-documentation-planches.md, section 8 (ce qui est établi vue par vue), sections 2 et 3
// (conventions, écarts), et « Base commune » (la carcasse, images/planches-src/_carcasse-orignal.js).
// Aucune cote : on ne construit rien, et aucune dimension d'orignal n'est établie.
//
// La face interne ne se voit pas de profil gauche : elle n'est pas dans le module. Elle se dessine
// ici, dans le repère U du module, sur ses os. Vu par sa face interne, le quartier DROIT a
// exactement le contour du profil gauche de la carcasse (même projection), l'avant à gauche :
// c'est la vue des figures de Sisson (fig. 287 et 288, « right side, medial view »). On garde donc
// l'avant à gauche comme sur toutes les planches du chapitre, et on découpe la carcasse au
// quartier (devant : la limite de la hanche, région 2 du tableau 5.1) ; la patte du côté opposé
// disparaît, puisqu'un quartier n'en a qu'une.
//
// D'où viennent les formes :
//   - position du semi-membraneux, de l'adducteur et du gracilis : sisson-1914-fig288 (plan
//     profond) et -fig287 (plan superficiel), cheval, face interne, portées sur les os du module
//     par une transformation affine calée sur quatre repères (acétabulum, pointe de la fesse,
//     rotule, bas du fémur), puis corrigées pour le bœuf (SISSON) : le semi-membraneux naît sur
//     l'ischion seulement (pas de chef qui monte vers la queue) et envoie une branche au condyle
//     médial du tibia ; l'adducteur n'atteint pas le condyle médial du fémur ;
//   - le gracilis couvre la plus grande part de la face interne (SISSON), de la couture du bassin
//     au ligament de la rotule et à la crête du tibia (CEE-ONU 9239) ;
//   - la couture qui sort le morceau va du bas du fémur vers la pointe de la fesse (CEE-ONU 9237) :
//     elle suit le bord du semi-membraneux, le bas puis l'arrière, là où il touche la noix de
//     ronde (SISSON : le semi-membraneux couvre la face interne du semi-tendineux) ;
//   - le grain (UNL : semi-membraneux et adducteur unipennés) : l'obliquité est relevée sur les
//     hachures de fibres de sisson-1914-fig288 (tenseur de structure, médiane de neuf et dix
//     fenêtres : 22,4° et 22,8° de la verticale), passée par la même transformation. Aucun angle
//     n'est écrit sur la planche : on copie la direction de la gravure, rien de plus.
const C = require('./_carcasse-orignal');

module.exports = (h) => {
  const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
  const f1 = v => Math.round(v * 10) / 10;
  const dD = (pts, ferme) => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + (ferme ? ' Z' : '');
  const trait = (ep, extra = '') => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"${extra}`;
  const halo = ep => `fill="none" stroke="${BLANC}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const POINTILLE = ' stroke-dasharray="0.1 3.4"';            // une couture qu'on ouvre : des points
  const rev = a => a.slice().reverse();

  // ─── Les formes, dans le repère U du module ──────────────────────────────────────────────
  // Le pourtour du morceau (semi-membraneux et adducteur ensemble), d'un seul tenant, dans le sens
  // des aiguilles d'une montre depuis le haut de la séparation des deux muscles.
  const HAUT_SM = [[1402, 485], [1430, 474], [1452, 464], [1466, 466]];            // jusqu'à la pointe de la fesse
  const ARRIERE_SM = [[1463, 505], [1453, 552], [1438, 597], [1421, 638], [1405, 674], [1392, 697]];
  const BAS_SM = [[1366, 711], [1340, 716], [1314, 712], [1303, 703]];             // la branche vers le tibia
  const AVANT_SM = [[1306, 684]];
  const BAS_AD = [[1316, 662], [1305, 660]];                                       // l'adducteur s'arrête avant le condyle
  const AVANT_AD = [[1297, 640], [1296, 610], [1303, 576], [1314, 542], [1320, 512], [1323, 494]];
  const HAUT_AD = [[1334, 483], [1366, 482]];                                                   // sous le plancher du bassin
  const POURTOUR = C.dense([...HAUT_SM, ...ARRIERE_SM, ...BAS_SM, ...AVANT_SM, ...BAS_AD, ...AVANT_AD, ...HAUT_AD], 2, true);
  const at = q => POURTOUR.findIndex(r => Math.abs(r[0] - q[0]) < 1e-6 && Math.abs(r[1] - q[1]) < 1e-6);
  const I_HAUT = at([1402, 485]), I_BAS = at([1316, 662]), I_FESSE = at([1466, 466]), I_BOUT = at([1303, 703]);
  if ([I_HAUT, I_BAS, I_FESSE, I_BOUT].some(i => i < 0)) throw new Error('62-05 : repère du pourtour introuvable');
  const SEP = C.dense([[1402, 485], [1384, 528], [1366, 572], [1349, 612], [1332, 645], [1316, 662]], 2, false);   // adducteur | semi-membraneux
  const SM = [...POURTOUR.slice(I_HAUT, I_BAS + 1), ...rev(SEP).slice(1, -1)];
  const AD = [...POURTOUR.slice(I_BAS), ...POURTOUR.slice(0, I_HAUT + 1), ...SEP.slice(1, -1)];
  const COUTURE = rev(POURTOUR.slice(I_FESSE, I_BOUT + 1));                        // du bas du fémur à la fesse
  const RESTE = [...POURTOUR.slice(I_BOUT), ...POURTOUR.slice(0, I_FESSE + 1)];     // le pourtour sans la couture
  // le chapeau (gracilis) : de la couture du bassin au ligament de la rotule et à la crête du tibia
  const GR_AVANT = [[1270, 716], [1276, 690], [1283, 660], [1287, 626], [1288, 590], [1292, 551], [1300, 520], [1309, 496], [1324, 482]];
  const GR = C.dense([[1324, 482], [1362, 482], [1402, 485], [1426, 479], [1434, 508], [1437, 540], [1436, 566], [1428, 592],
    [1414, 622], [1396, 652], [1372, 684], [1346, 710], [1316, 728], [1288, 732], ...GR_AVANT.slice(0, -1)], 2, true);
  const CHARNIERE = C.dense(GR_AVANT, 2, false);

  // ─── Le quartier, découpé à la limite de la hanche ───────────────────────────────────────
  const CADRE = [1168, 282, 1522, 762];
  const place = z => C.placer(z, { cadre: CADRE });
  const DECOUPE = [[1190, 60], ...C.LIMITES.hanche.slice(1), [1234, 1500], [1600, 1500], [1600, 60]];
  function quartier(p, id, os, osForts) {
    const pas = Math.min(3 / Math.max(p.k, 0.2), 6);
    const sil = C.dense(C.SILHOUETTE, pas, true).map(p.T);
    const q = DECOUPE.map(p.T);
    const coupe = C.dense(C.LIMITES.hanche, pas, false).map(p.T);
    const [c0, c1] = [p.T([CADRE[0], CADRE[1]]), p.T([CADRE[2], CADRE[3]])];
    const x0 = Math.max(0, c0[0]), y0 = Math.max(0, c0[1]);
    const vue = `<rect x="${f1(x0)}" y="${f1(y0)}" width="${f1(Math.min(p.z.l, c1[0]) - x0)}" height="${f1(Math.min(p.z.h, c1[1]) - y0)}" fill="${BLANC}"/>`;
    return [
      `<defs><clipPath id="${id}-q"><path d="${dD(q, true)}" fill="${BLANC}"/></clipPath>`
        + `<clipPath id="${id}-s"><path d="${dD(sil, true)}" fill="${BLANC}"/></clipPath><clipPath id="${id}-v">${vue}</clipPath></defs>`,
      `<g clip-path="url(#${id}-v)">`,
      // le module découpé au quartier et à la silhouette : la patte opposée n'existe pas sur un quartier
      `<g clip-path="url(#${id}-q)"><g clip-path="url(#${id}-s)">`,
      C.dessiner(h, p, { id, os, osForts, loin: 'gris' }),
      '</g>',
      `<path d="${dD(sil, true)}" ${trait(2.4)}/>`,
      '</g>',
      // la coupe devant le quartier
      `<g clip-path="url(#${id}-s)"><path d="${dD(coupe, false)}" ${trait(2.4)}/></g>`,
      '</g>',
    ].join('\n');
  }
  const trame = id => `<defs><pattern id="${id}-t" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="3" stroke="${NOIR}" stroke-width="0.5"/></pattern></defs>`;

  // ─── Le grain, relevé sur la fig. 288 et porté dans le repère U ─────────────────────────
  // partie linéaire de la transformation affine fig. 288 -> U, calée sur les quatre repères
  const LIN = [[0.26553, -0.01669], [0.02696, 0.30267]];
  const grain = deg => { const r = deg * Math.PI / 180, v = [-Math.sin(r), Math.cos(r)];
    const w = [LIN[0][0] * v[0] + LIN[0][1] * v[1], LIN[1][0] * v[0] + LIN[1][1] * v[1]]; const n = Math.hypot(w[0], w[1]); return [w[0] / n, w[1] / n]; };
  const GRAIN_AD = grain(22.4), GRAIN_SM = grain(22.8);     // de l'origine (bassin) vers l'insertion (fémur)

  // ─── Vue 3 : le morceau sorti, couché, tourné pour que la pointe de la fesse aille à droite ─
  const BOUT = [1310, 712], TUBER = [1466, 466];
  const TH = -Math.atan2(TUBER[1] - BOUT[1], TUBER[0] - BOUT[0]);
  const CO = Math.cos(TH), SI = Math.sin(TH);
  const rot = q => [q[0] * CO - q[1] * SI, q[0] * SI + q[1] * CO];
  function placeSorti(z) {
    const tout = POURTOUR.map(rot);
    const xs = tout.map(q => q[0]), ys = tout.map(q => q[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const k = Math.min((z.l - 220) / (x1 - x0), (z.h - 14) / (y1 - y0));
    const dx = (z.l - (x1 - x0) * k) / 2 - x0 * k, dy = (z.h - (y1 - y0) * k) / 2 - y0 * k;
    const T = q => { const r = rot(q); return [r[0] * k + dx, r[1] * k + dy]; };
    return { k, T, dir: v => rot(v), gauche: dx + x0 * k, droite: dx + x1 * k };
  }
  const dedans = (pt, poly) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i], b = poly[j]; if ((a[1] > pt[1]) !== (b[1] > pt[1]) && pt[0] < (b[0] - a[0]) * (pt[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; };
  const distBord = (pt, poly) => { let m = Infinity; for (let i = 0; i < poly.length; i++) { const a = poly[i], b = poly[(i + 1) % poly.length];
    const vx = b[0] - a[0], vy = b[1] - a[1], L2 = vx * vx + vy * vy || 1; const t = Math.max(0, Math.min(1, ((pt[0] - a[0]) * vx + (pt[1] - a[1]) * vy) / L2));
    m = Math.min(m, Math.hypot(pt[0] - a[0] - t * vx, pt[1] - a[1] - t * vy)); } return m; };
  // une famille de flèches parallèles, posées en quinconce dans le muscle, loin de ses bords
  function famille(poly, dir, long, pasX, pasY, marge) {
    const xs = poly.map(q => q[0]), ys = poly.map(q => q[1]);
    const out = [];
    let rang = 0;
    for (let y = Math.min(...ys) + pasY / 2; y < Math.max(...ys); y += pasY, rang++) {
      for (let x = Math.min(...xs) + (rang % 2 ? pasX / 2 : 0); x < Math.max(...xs); x += pasX) {
        const a = [x - dir[0] * long / 2, y - dir[1] * long / 2], b = [x + dir[0] * long / 2, y + dir[1] * long / 2];
        if ([a, b, [x, y]].every(q => dedans(q, poly) && distBord(q, poly) > marge)) out.push([a, b]);
      }
    }
    return out;
  }

  const flechesGrain = P => {
    const fam = (poly, g) => { const d = P.dir(g), n = Math.hypot(d[0], d[1]); return famille(poly, [d[0] / n, d[1] / n], 30, 46, 21, 7); };
    return [...fam(AD.map(P.T), GRAIN_AD), ...fam(SM.map(P.T), GRAIN_SM)];
  };
  // le milieu de la flèche la plus proche d'un point : un renvoi touche une flèche, pas le vide entre deux
  const flechePres = (P, q) => flechesGrain(P).map(([a, b]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2])
    .sort((m, n) => Math.hypot(m[0] - q[0], m[1] - q[1]) - Math.hypot(n[0] - q[0], n[1] - q[1]))[0];

  // un point du muscle loin des flèches, près de celui qu'on vise : la cible d'un renvoi ne tombe pas sur une flèche
  const videPres = (P, poly, q) => {
    const segs = flechesGrain(P);
    const dSeg = (m, [a, b]) => { const vx = b[0] - a[0], vy = b[1] - a[1], L2 = vx * vx + vy * vy || 1;
      const t = Math.max(0, Math.min(1, ((m[0] - a[0]) * vx + (m[1] - a[1]) * vy) / L2)); return Math.hypot(m[0] - a[0] - t * vx, m[1] - a[1] - t * vy); };
    let best = q, score = -Infinity;
    for (let dx = -24; dx <= 24; dx += 2) for (let dy = -24; dy <= 24; dy += 2) {
      const m = [q[0] + dx, q[1] + dy];
      if (!dedans(m, poly) || distBord(m, poly) < 8) continue;
      const sc = Math.min(...segs.map(sg => dSeg(m, sg))) - 0.15 * Math.hypot(dx, dy);
      if (sc > score) { score = sc; best = m; }
    }
    return best;
  };

  return {
    ref: '62-05',
    titre: 'L’intérieur de ronde',
    desc: "Le quartier arrière d'orignal couché sur sa face externe, vu par sa face interne, l'avant à gauche, "
      + "coupé devant à la limite de la hanche. En haut à gauche : l'intérieur de ronde, semi-membraneux et adducteur, "
      + "en trame sous le plancher du bassin, derrière et contre le fémur ; le chapeau (gracilis) en contour par-dessus ; "
      + "les repères : pointe de la fesse, bas du fémur, rotule. En haut à droite : le chapeau rabattu vers l'avant, "
      + "la couture en pointillé qui part du bas du fémur, suit le dessous puis l'arrière du semi-membraneux jusqu'à la "
      + "pointe de la fesse, et la flèche du couteau dans ce sens. En bas : le morceau sorti, couché, la pointe de la "
      + "fesse à droite ; l'adducteur en bande au-dessus du semi-membraneux, la couture qui les sépare en pointillé, "
      + "et une famille de flèches de grain par muscle, parallèles entre elles, obliques sur la longueur.",
    format: 'pleine',
    disposition: [['ou', 'couteau'], ['sorti']],
    hauteurs: [2, 1],
    vues: {
      // ── Vue 1 : où il est ───────────────────────────────────────────────────────────────
      ou: {
        titre: 'La face interne du quartier',
        dessin: z => {
          const p = place(z), T = q => q.map(p.T);
          return [
            quartier(p, 'v1', ['bassin', 'femur', 'rotule'], ['femur', 'rotule']),
            trame('v1'),
            `<path d="${dD(T(POURTOUR), true)}" fill="${BLANC}" stroke="none"/>`,
            `<path d="${dD(T(POURTOUR), true)}" fill="url(#v1-t)" stroke="none"/>`,
            `<path d="${dD(T(SEP), false)}" ${trait(0.7)}/>`,
            `<path d="${dD(T(POURTOUR), true)}" ${trait(1.4)}/>`,
            `<path d="${dD(T(GR), true)}" ${trait(0.7)}/>`,
          ].join('\n');
        },
        renvois: z => {
          const p = place(z);
          return [
            { n: 1, texte: 'intérieur de ronde, sans chapeau ni côté mou', rond: p.pt([1506, 650]), cible: p.pt([1416, 640]) },
            { n: 2, texte: 'chapeau, M. gracilis', rond: p.pt([1506, 538]), cible: p.pt([1437, 542]) },
            { n: 3, texte: 'pointe de la fesse (ischion)', rond: p.pt([1506, 420]), cible: p.pt('pointeFesse') },
            { n: 4, texte: 'bas du fémur', rond: p.pt([1184, 736]), cible: p.pt([1266, 688]) },
            { n: 5, texte: 'rotule', rond: p.pt([1182, 640]), cible: p.pt('rotule') },
          ];
        },
      },
      // ── Vue 2 : le couteau ──────────────────────────────────────────────────────────────
      couteau: {
        titre: 'Le chapeau soulevé, la couture',
        dessin: z => {
          const p = place(z), T = q => q.map(p.T);
          // le chapeau rabattu vers l'avant autour de son bord avant, raccourci pour qu'on le voie levé
          const a = GR_AVANT[0], b = GR_AVANT[GR_AVANT.length - 1];
          const u = [(b[0] - a[0]), (b[1] - a[1])], L = Math.hypot(u[0], u[1]); u[0] /= L; u[1] /= L;
          const nrm = [u[1], -u[0]];
          const rabat = q => { const s = (q[0] - a[0]) * nrm[0] + (q[1] - a[1]) * nrm[1]; return [q[0] - nrm[0] * s * 1.55, q[1] - nrm[1] * s * 1.55]; };
          const volet = GR.map(rabat);
          const leve = C.dense([[1402, 612], [1372, 566], [1322, 546], [1262, 560]], 2, false);
          const lame = C.dense([[1322, 700], [1344, 703], [1366, 698], [1386, 684], [1399, 666], [1413, 633], [1428, 594], [1441, 550], [1450, 506], [1453, 482]], 2, false);
          return [
            quartier(p, 'v2', ['bassin', 'femur', 'rotule'], []),
            trame('v2'),
            `<path d="${dD(T(POURTOUR), true)}" fill="${BLANC}" stroke="none"/>`,
            `<path d="${dD(T(POURTOUR), true)}" fill="url(#v2-t)" stroke="none"/>`,
            `<path d="${dD(T(SEP), false)}" ${trait(0.7)}/>`,
            `<path d="${dD(T(RESTE), false)}" ${trait(1.4)}/>`,
            // la couture qu'on ouvre, et le couteau qui la suit
            `<path d="${dD(T(COUTURE), false)}" ${halo(3.4)}/>`,
            `<path d="${dD(T(COUTURE), false)}" ${trait(1.4, POINTILLE)}/>`,
            `<path d="${dD(T(lame), false)}" ${halo(4)}/>`,
            // la charte : le chemin du couteau est le geste de la vue, en rouge
            h.geste(dD(T(lame), false)),
            // le chapeau soulevé, rabattu sur son bord avant
            `<path d="${dD(T(volet), true)}" fill="${BLANC}" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"/>`,
            `<path d="${dD(T(CHARNIERE), false)}" ${trait(0.7)}/>`,
            `<path d="${dD(T(leve), false)}" ${halo(4)}/>`,
            h.fleche(dD(T(leve), false), trait(0.7)),
          ].join('\n');
        },
        renvois: z => {
          const p = place(z);
          return [
            { n: 6, texte: 'couture, du bas du fémur vers la fesse', rond: p.pt([1508, 560]), cible: p.pt([1455, 546]) },
            { n: 7, texte: 'chapeau soulevé', rond: p.pt([1182, 470]), cible: p.pt([1240, 520]) },
          ];
        },
      },
      // ── Vue 3 : le morceau sorti ────────────────────────────────────────────────────────
      sorti: {
        titre: 'Le morceau sorti',
        dessin: z => {
          const P = placeSorti(z), T = q => q.map(P.T);
          const fleches = flechesGrain(P);
          return [
            ...fleches.map(([a, b]) => h.fleche(`M${f1(a[0])} ${f1(a[1])} L${f1(b[0])} ${f1(b[1])}`, trait(0.7))),
            `<path d="${dD(T(SEP), false)}" ${trait(1.4, POINTILLE)}/>`,
            `<path d="${dD(T(POURTOUR), true)}" ${trait(2.4)}/>`,
          ].join('\n');
        },
        renvois: z => {
          const P = placeSorti(z);
          const g = P.gauche - 34, d = P.droite + 34;
          return [
            { n: 8, texte: 'semi-membraneux, M. semimembranosus', rond: [g, 128], cible: videPres(P, SM.map(P.T), P.T([1372, 676])) },
            { n: 9, texte: 'adducteur, M. adductor', rond: [g, 44], cible: videPres(P, AD.map(P.T), P.T([1318, 620])) },
            { n: 10, texte: 'couture entre les deux muscles', rond: [d, 44], cible: P.T([1386, 524]) },
            { n: 11, texte: 'sens du grain, une famille par muscle', rond: [d, 128], cible: flechePres(P, P.T([1440, 580])) },
          ];
        },
      },
    },
  };
};
