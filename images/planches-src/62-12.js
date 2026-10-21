// Planche 62-12 — le dos en coupe : à la dernière côte et dans les lombes.
// Chapitre 62, § 5.3 (tableau 5.3 : la longe renvoie à 62-11 et 62-12) et § 9, étape 4 (« Un trait
// de couteau serré contre les apophyses de l'épine, un deuxième le long des côtes, et le muscle se
// décolle en pain ») ; ch. 65, note 1 (« La longe repose dessus comme sur une tablette ; le filet est
// dessous, dans la cavité »). Documentation : suivi/62-documentation-planches.md, section 15 (ce qui
// est établi, coupe par coupe), section 14 (les traits qui lèvent la longe : NMSU, fig. 8 et 10),
// section 2 (conventions), section 5 et « Base commune » (la carcasse commune). Figures regardées :
// usda-imps-coupe-12e-13e-cote-boeuf (IMPS 7.3.3), usda-imps-coupe-5e-6e-cote-boeuf (la gouttière
// entre l'épine et la côte), acia-boeuf-29 (coupe de la longe), ellenberger-rind-t13-squelette-dessus
// (les apophyses transverses lombaires, longues lames horizontales).
//
// Vignette — où passent les coupes : la carcasse commune, la longe en trame ; deux traits de coupe,
//   A à la jonction de la 12e et de la 13e côte (T12-T13), B au milieu des lombes (L3-L4), chacun
//   tiré sur la hauteur que la coupe montre et marqué de sa lettre (repère de coupe, pas un mot : les
//   titres des deux coupes portent la même lettre). La dernière côte n'y est pas dessinée : à cette
//   taille, son trait oblique croisait le trait A et faisait un K.
// Coupe A — à la dernière côte (IMPS 7.3.3) : la vertèbre thoracique et son apophyse épineuse, la
//   côte qui part de la vertèbre et plonge à son coude, la longe dans la gouttière entre les deux ; les
//   petits muscles sans renvoi (multifide et épineux contre l'épine, ilio-costal sur le coude de la
//   côte, carré des lombes sous le col de la côte, dentelé et oblique externe dehors) ; le diaphragme
//   collé à la face interne de la côte ; la cavité. Côté gauche : les deux traits du § 9 (le premier
//   serré contre l'apophyse épineuse jusqu'à la côte, le deuxième au coude de la côte, NMSU cut 3), le
//   décollement en pointillé le long de la côte.
// Coupe B — au milieu des lombes (ACIA, diagramme 29 ; GUELPH) : la vertèbre lombaire, ses deux
//   apophyses transverses à l'horizontale ; la longe posée dessus, le filet (grand et petit psoas)
//   dessous ; le multifide contre l'épine ; la paroi du flanc (oblique externe, oblique interne,
//   transverse) qui part du bout de la tablette. Côté gauche : le premier trait contre l'apophyse
//   épineuse, puis la lame à plat sur la tablette jusqu'au bout.
// Les deux coupes sont à la même échelle et vues du même côté (de l'arrière, le côté gauche de la
// bête à gauche), la vertèbre à la même hauteur. Une trame par matière : l'os en noir plein, le
// muscle en hachure, le gras en points, la cavité en blanc. Le bas des coupes est arraché (trait
// ondulé) : la carcasse continue plus bas.
//
// Proportions : NON ÉTABLIES pour l'orignal (bœuf seulement, section 15). La hauteur de l'épine et du
// dos au-dessus de la vertèbre vient de la carcasse commune (T13 et L3-L4 du module) ; la disposition
// et la largeur viennent des coupes du bœuf ; la longe a à peu près la même surface dans les deux
// coupes (GUELPH : « approximately constant cross sectional area through the loin »). L'épaisseur du
// gras n'est pas établie : la nappe est tirée assez épaisse pour que sa trame se lise. Aucune cote.
// Pas de rein ni de gras de rognon (section 16 : ne se dessinent pas), pas de fessier moyen (il
// n'entre dans la longe qu'au bout arrière, pas au milieu des lombes), pas de grain (une coupe
// montre le bout des fibres ; le grain de la longe est porté à la 62-11).
const C = require('./_carcasse-orignal');

const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
const f1 = v => Math.round(v * 10) / 10;
const dP = (pts, ferme) => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + (ferme ? ' Z' : '');
const trait = (ep, extra = '') => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"${extra}`;
const bord = ep => `stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round"`;
const pointille = trait(1.4, ' stroke-dasharray="0.1 3.4"');
const sousPointille = `fill="none" stroke="${BLANC}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"`;

// ─── Géométrie des coupes ─────────────────────────────────────────────────────────────────
// Repère u : origine au centre du corps de la vertèbre, x vers la droite (le côté droit de la bête,
// vue de l'arrière), y vers le bas ; même unité que le repère U de la carcasse commune.
const miroir = pts => pts.map(p => [-p[0], p[1], p[2]]);
// une forme symétrique donnée par sa moitié droite, du haut de l'axe au bas de l'axe
const sym = droite => [...droite, ...miroir(droite).reverse().slice(1, -1)];
const lisse = (pts, ferme = false) => C.dense(pts, 1.2, ferme);
// décalage d'une ligne : d > 0 à droite du sens de marche (y vers le bas)
function decaler(ligne, d) {
  const n = ligne.length;
  return ligne.map((p, i) => {
    const a = ligne[Math.max(0, i - 1)], b = ligne[Math.min(n - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
    return [p[0] - dy / L * d, p[1] + dx / L * d];
  });
}
// bande autour d'une ligne médiane, largeur w (w0 → w1)
function bande(ligne, w0, w1 = w0) {
  const n = ligne.length;
  const g = ligne.map((p, i) => decaler(ligne, -(w0 + (w1 - w0) * i / (n - 1)) / 2)[i]);
  const d = ligne.map((p, i) => decaler(ligne, (w0 + (w1 - w0) * i / (n - 1)) / 2)[i]);
  return [...g, ...d.reverse()];
}
const apres = (ligne, test) => ligne.slice(ligne.findIndex(test));
const BAS = 86;          // le bas arraché des deux coupes

// ── Coupe A : à la dernière côte ──
const A = (() => {
  // vertèbre thoracique : corps, arc, apophyse transverse courte, apophyse épineuse
  const vert = sym([
    [0, -91.5], [2.2, -90.3], [3, -86], [2.7, -60], [3.2, -32], [4.6, -26.5], [8.5, -22.5, 'c'],
    [13, -20.5], [21, -20], [25, -17.5], [24.5, -13.5, 'c'], [16, -12.5], [11.5, -10.5, 'c'],
    [14.5, -6], [15.2, 0.5], [12.8, 7], [6.5, 11], [0, 12.5],
  ]);
  const canal = { c: [0, -16], r: 4.8 };
  // la côte : tête sur le corps, col, tubercule sous l'apophyse transverse, coude, puis elle plonge
  const cote = lisse([[13, -3], [18, -10], [26, -15.5], [44, -18], [60, -15.5], [72, -9], [82, 1], [90, 16], [96, 36], [100, 60], [102, 86], [103, 104]]);
  const coteBande = bande(cote, 6.5, 7.5);
  const clairseme = l => l.filter((_, i) => i % 6 === 0);
  const muscleDehors = bande(decaler(apres(cote, p => p[1] > 12), -8.3), 1.5, 6.5);   // dentelé dorsal, oblique externe
  const diaphragme = bande(decaler(apres(cote, p => p[0] > 64), 8.2), 3.5, 7);         // collé dedans
  const contourDroit = lisse([[0, -106], [26, -104.5], [46, -100], [62, -93], [76, -83], [87, -70], [95, -56], [100, -40],
    [103, -25], [104.3, -10], [105, 4], ...clairseme(decaler(apres(cote, p => p[1] > 22), -15))]);
  const contour = [...miroir(contourDroit).reverse(), ...contourDroit.slice(1)];
  const cavite = sym([
    [0, 7], [11, 5], [20, -4], [34, -10], ...decaler(apres(cote, p => p[0] > 42), 2.5), [60, 120], [0, 120],
  ]);
  // le dessus de la côte, où la longe et l'ilio-costal se posent
  const dessus = decaler(cote, -4.8);
  const entreX = (a, b) => dessus.filter(p => p[0] >= a && p[0] <= b);
  const M = {
    longe: [[16.5, -24], ...entreX(24, 73), [77, -18], [81, -32], [82, -46], [79, -59], [72, -71], [60, -82], [46, -89.5],
      [32, -93.5], [18, -92.5], [15.8, -84], [16.2, -60], [16.2, -40]],
    multifide: [[4.2, -27], [8.5, -23.5], [14.8, -23.5], [15, -34], [14.6, -48], [10.5, -56], [4, -58.5]],
    epineux: [[4, -58.5], [10.5, -56], [14.6, -63], [14.6, -80], [13, -90], [4, -93]],
    iliocostal: [...entreX(75, 91), [96, 4], [99, -12], [98, -28], [93, -42], [86, -50], [84, -36], [80, -20]],
    carreLombes: [[16, 4], [19, -2], [26, -7.5], [36, -10.5], [44, -11], [42, -6.5], [33, -1.5], [23, 3.5]],
  };
  return { vert, canal, cote: coteBande, muscleDehors, diaphragme, contour, contourDroit, cavite, M,
    haut: -106, larg: 119, coteLigne: cote };
})();

// ── Coupe B : au milieu des lombes ──
const B = (() => {
  const vert = sym([
    [0, -66], [2.2, -64.8], [3, -60], [2.8, -40], [3.4, -32], [5, -28], [9, -24.5, 'c'], [12, -18], [12.5, -11.5],
    [14.5, -7.5], [30, -6.8], [60, -6.6], [84, -6.5], [92, -5.5], [95.5, -2.5], [94, 0.8, 'c'], [80, 0.6], [55, 0.9], [30, 1.5], [18, 3],
    [15.6, 5.5], [13.2, 9], [6.8, 12], [0, 13.4],
  ]);
  const canal = { c: [0, -17.5], r: 5.3 };
  // la paroi du flanc : du bout de la tablette, elle descend en s'écartant
  const paroi = lisse([[93, -28], [97, -16], [102, -2], [109, 16], [115, 40], [118, 65], [119.5, 100]]);
  const paroiBande = bande(paroi, 4, 10);
  const couches = [decaler(paroi, -1.7), decaler(paroi, 1.7)].map(l => l.slice(Math.round(l.length * 0.12)));
  const contourDroit = lisse([[0, -79.5], [26, -79], [50, -75], [72, -67], [88, -55], [97, -42], ...decaler(apres(paroi, p => p[1] > -12), -8.5)]);
  const contour = [...miroir(contourDroit).reverse(), ...contourDroit.slice(1)];
  const cavite = sym([
    [0, 9], [6, 14], [14, 14], [19, 8], [40, 3], [70, 2], [92, 0], [98, -2], ...decaler(apres(paroi, p => p[1] > 0), 3.5), [60, 120], [0, 120],
  ]);
  const M = {
    longe: [[19, -8.8], [40, -8.8], [64, -8.6], [84, -9], [93, -13], [95, -26], [90, -42], [77, -56], [58, -65],
      [38, -69.5], [20, -69], [6.5, -65.5], [4.8, -61], [11, -56], [16.5, -44], [18.5, -26]],
    multifide: [[4.4, -30], [9.5, -25], [13.8, -13], [17, -10], [17.5, -24], [15.5, -40], [10.5, -51], [4.4, -55]],
    grandPsoas: [[19.5, 3.5], [32, 2.8], [52, 3.2], [64, 6.5], [69, 15], [66, 27], [55, 36], [39, 39.5], [26, 36], [20, 27], [18.5, 15]],
    petitPsoas: [[7, 15.5], [15, 14.5], [18, 21], [16.5, 30], [11, 33], [6.5, 28], [5.5, 21]],
  };
  return { vert, canal, paroi: paroiBande, couches, contour, contourDroit, cavite, M, haut: -79.5, larg: 128 };
})();

// ─── Motifs ───────────────────────────────────────────────────────────────────────────────
const motifs = id => [
  `<pattern id="${id}-muscle" width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="3.2" stroke="${NOIR}" stroke-width="0.5"/></pattern>`,
  `<pattern id="${id}-gras" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.7" fill="${NOIR}" stroke="none"/><circle cx="3" cy="3" r="0.7" fill="${NOIR}" stroke="none"/></pattern>`,
].join('');

// ─── Mise en place commune aux deux coupes ─────────────────────────────────────────────────
const HAUT_LIBRE = 27;                   // de l'air au-dessus des coupes, pour les pastilles
function echelle(z) {
  const kH = (z.h - HAUT_LIBRE - 4) / (BAS - A.haut);
  const kL = (z.l - 4) / (2 * Math.max(A.larg, B.larg));
  return Math.min(kH, kL);
}
function repere(z) {
  const k = echelle(z);
  const ox = z.l / 2, oy = HAUT_LIBRE - A.haut * k;
  const V = p => [ox + p[0] * k, oy + p[1] * k];
  return { k, V, ox, oy };
}

function dessinerCoupe(h, z, S, id, extra) {
  const { k, V } = repere(z);
  const tr = pts => pts.map(V);
  const out = [];
  const yBas = V([0, BAS])[1];
  out.push(`<defs>${motifs(id)}<clipPath id="${id}-bas"><rect x="0" y="0" width="${z.l}" height="${f1(yBas)}"/></clipPath></defs>`);
  out.push(`<g clip-path="url(#${id}-bas)">`);
  // 1. le gras : tout ce qui est dans le contour
  const plein = [...S.contour, [S.contour[S.contour.length - 1][0], 130], [S.contour[0][0], 130]];
  out.push(`<path d="${dP(tr(plein), true)}" fill="url(#${id}-gras)" stroke="none"/>`);
  // 2. la cavité, en blanc
  out.push(`<path d="${dP(tr(lisse(S.cavite, true)), true)}" fill="${BLANC}" stroke="none"/>`);
  // 3. les muscles, chacun blanc puis hachuré, son bord en trait
  const muscle = (pts, ep, fermer = true) => {
    const d = dP(tr(fermer ? lisse(pts, true) : pts), true);
    out.push(`<path d="${d}" fill="${BLANC}" stroke="none"/>`, `<path d="${d}" fill="url(#${id}-muscle)" ${bord(ep)}/>`);
  };
  extra.muscles(muscle, S);
  // 4. l'os en noir, le canal de la moelle en blanc
  out.push(`<path d="${dP(tr(lisse(S.vert, true)), true)}" fill="${NOIR}" stroke="${NOIR}" stroke-width="0.7" stroke-linejoin="round"/>`);
  if (extra.os) extra.os(out, tr);
  out.push(`<circle cx="${f1(V(S.canal.c)[0])}" cy="${f1(V(S.canal.c)[1])}" r="${f1(S.canal.r * k)}" fill="${BLANC}" stroke="none"/>`);
  // 5. le contour extérieur
  out.push(`<path d="${dP(tr(S.contour), false)}" ${trait(2.4)}/>`);
  out.push('</g>');
  // 6. l'arrachement du bas : un trait ondulé à travers chaque paroi
  extra.arrachements.forEach(([xi, xe]) => [1, -1].forEach(s => {
    const a = V([s * xi, BAS]), b = V([s * xe, BAS]);
    const L = b[0] - a[0];
    out.push(`<path d="M${f1(a[0])} ${f1(a[1])} C${f1(a[0] + L * 0.35)} ${f1(a[1] - 5)} ${f1(a[0] + L * 0.65)} ${f1(a[1] + 5)} ${f1(b[0])} ${f1(b[1])}" ${trait(0.7)}/>`);
  }));
  // 7. le couteau
  extra.couteau(out, V, h);
  return out.join('\n');
}

// le chemin d'un trait de couteau : un liseré blanc, puis le pointillé des coutures
const chemin = (out, pts) => { out.push(`<path d="${dP(pts, false)}" ${sousPointille}/>`, `<path d="${dP(pts, false)}" ${pointille}/>`); };

// ─── La vignette ──────────────────────────────────────────────────────────────────────────
const X_A = 952, X_B = 1092;                       // T12-T13, L3-L4 dans le repère U
const vignettePlace = z => C.placer({ l: z.l, h: Math.min(z.h, z.l * 1.05) }, { marge: 2 });

module.exports = (h) => ({
  ref: '62-12',
  titre: 'Le dos en coupe : à la dernière côte et dans les lombes',
  desc: "Deux coupes transversales du dos de l'orignal, à la même échelle, vues de l'arrière, et une petite "
    + "carcasse de profil qui les situe. A, à la dernière côte : la vertèbre et son apophyse épineuse au centre, la "
    + "longe de chaque côté dans la gouttière entre l'épine et la côte, la nappe de gras par-dessus, la côte qui plonge "
    + "à son coude, le diaphragme collé dedans, la cavité. B, au milieu des lombes : la longe posée sur l'apophyse "
    + "transverse comme sur une tablette, le filet dessous, la paroi du flanc qui part du bout de la tablette. À gauche "
    + "de chaque coupe, le chemin du couteau : serré contre l'apophyse épineuse, puis à plat sur l'os. "
    + "L'os en noir, le muscle hachuré, le gras en points.",
  format: 'demi',
  disposition: [['vignette', 'a', 'b']],
  largeurs: [[1, 2, 2]],
  vues: {
    vignette: {
      titre: 'Les coupes',
      dessin: z => {
        const p = vignettePlace(z);
        const out = ['<g transform="translate(0 14)">', C.dessiner(h, p, { id: 'v', valeur: { muscles: ['longe'], trame: 'gris' }, loin: 'gris' })];
        [[X_A, 206, 482, 'A'], [X_B, 222, 476, 'B']].forEach(([x, y0, y1, l]) => {
          const a = p.pt([x, y0]), b = p.pt([x, y1]);
          out.push(h.ligne(a[0], a[1], b[0], b[1], h.a.arete));
          out.push(h.texte(a[0], a[1] - 4, l));
        });
        out.push('</g>');
        return out.join('\n');
      },
    },
    a: {
      titre: 'A, à la dernière côte',
      dessin: z => dessinerCoupe(h, z, A, 'ca', {
        muscles: (muscle, S) => {
          [S.M, ].forEach(M => {
            ['multifide', 'epineux', 'iliocostal', 'carreLombes'].forEach(n => { muscle(M[n], 0.7); muscle(miroir(M[n]), 0.7); });
            muscle(M.longe, 1.4); muscle(miroir(M.longe), 1.4);
          });
          [S.muscleDehors, S.diaphragme].forEach(b => { muscle(b, 0.7, false); muscle(miroir(b), 0.7, false); });
        },
        os: (out, tr) => { [A.cote, miroir(A.cote)].forEach(c => out.push(`<path d="${dP(tr(c), true)}" fill="${NOIR}" stroke="${NOIR}" stroke-width="0.7" stroke-linejoin="round"/>`)); },
        arrachements: [[104, 132]],
        couteau: (out, V, h) => {
          // premier trait : serré contre l'apophyse épineuse, jusqu'à la côte, puis la longe se décolle de la côte
          chemin(out, [[-4.8, -104], [-4.6, -60], [-5.2, -30], [-9.5, -25], [-16, -24], ...miroir(decaler(A.coteLigne, -4.2).filter(p => p[0] >= 22 && p[0] <= 76))].map(V));
          // deuxième trait : au coude de la côte, de dehors jusqu'à l'os
          chemin(out, [[-100.5, -45], [-100.5, -26], [-99, -10], [-95.5, 8]].map(V));
          [[[-4.8, -130], [-4.8, -110]], [[-104, -76], [-102, -53]]].forEach(([a, b]) => {
            const A1 = V(a), B1 = V(b);
            // la charte : les deux entrées du couteau, les deux gestes de la coupe, en rouge
            out.push(h.geste(`M${f1(A1[0])} ${f1(A1[1])} L${f1(B1[0])} ${f1(B1[1])}`));
          });
        },
      }),
      renvois: z => {
        const { V } = repere(z);
        return [
          { n: 1, texte: 'apophyse épineuse : le premier trait', rond: [V([28, 0])[0], 12], cible: V([2.9, -70]) },
          { n: 2, texte: 'longe, M. longissimus dorsi', rond: [V([60, 0])[0], 12], cible: V([50, -58]) },
          { n: 3, texte: 'nappe de gras dorsale', rond: [V([92, 0])[0], 12], cible: V([79, -77]) },
          { n: 4, texte: 'côte : le deuxième trait à son coude', rond: V([60, 30]), cible: V([92, 28]) },
          { n: 5, texte: 'diaphragme', rond: V([62, 64]), cible: V([91.5, 62]) },
          { n: 6, texte: 'cavité', rond: V([-44, 56]), cible: V([-64, 36]) },
        ];
      },
    },
    b: {
      titre: 'B, au milieu des lombes',
      dessin: z => dessinerCoupe(h, z, B, 'cb', {
        muscles: (muscle, S) => {
          ['multifide', 'petitPsoas'].forEach(n => { muscle(S.M[n], 0.7); muscle(miroir(S.M[n]), 0.7); });
          [S.paroi, miroir(S.paroi)].forEach(b => muscle(b, 0.7, false));
          muscle(S.M.longe, 1.4); muscle(miroir(S.M.longe), 1.4);
          muscle(S.M.grandPsoas, 1.4); muscle(miroir(S.M.grandPsoas), 1.4);
        },
        os: (out, tr) => { [B.couches, B.couches.map(miroir)].forEach(cs => cs.forEach(l => out.push(`<path d="${dP(tr(l), false)}" ${trait(0.5)}/>`))); },
        arrachements: [[110, 128]],
        couteau: (out, V, h) => {
          // le trait contre l'apophyse épineuse, puis la lame à plat sur la tablette jusqu'au bout
          chemin(out, [[-5.2, -77], [-5, -45], [-5.6, -31], [-10, -25], [-14.8, -12], [-19, -9.5], [-40, -9.4], [-64, -9.3], [-84, -9.6], [-91, -11]].map(V));
          const A1 = V([-5.2, -103]), B1 = V([-5.2, -83]);
          // la charte : l'entrée du couteau, le geste, en rouge
          out.push(h.geste(`M${f1(A1[0])} ${f1(A1[1])} L${f1(B1[0])} ${f1(B1[1])}`));
        },
      }),
      renvois: z => {
        const { V } = repere(z);
        return [
          { n: 7, texte: 'apophyse transverse : la tablette', rond: V([86, 30]), cible: V([86, 1.2]) },
          { n: 8, texte: 'longe, posée dessus', rond: [V([45, 0])[0], 12], cible: V([50, -40]) },
          { n: 9, texte: 'filet, M. psoas major, dessous', rond: V([40, 62]), cible: V([44, 30]) },
          { n: 10, texte: 'nappe de gras dorsale', rond: [V([92, 0])[0], 12], cible: V([76, -67]) },
          { n: 11, texte: 'paroi du flanc : obliques et transverse', rond: V([94, 66]), cible: V([114, 50]) },
          { n: 12, texte: 'corps de la vertèbre', rond: V([0, 58]), cible: V([0, 12]) },
        ];
      },
    },
  },
});
