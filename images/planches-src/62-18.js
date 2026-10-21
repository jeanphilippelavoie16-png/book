// Planche 62-18 — la poitrine.
// Chapitre 62, § 5.4 (tableau 5.4 : « Poitrine | Pectoralis profundus et superficialis | Collagène
// élevé […] | Saumure (ch. 69) puis cuisson longue »). Documentation : suivi/62-documentation-planches.md,
// section 21 (ce qui est établi vue par vue), section 2 (conventions), section 3 écart n° 9 (le gras),
// section 5 et « Base commune » (la carcasse commune, images/planches-src/_carcasse-orignal.js).
// Figures regardées : ellenberger-rind-t4-vue-avant (g, le pectoral superficiel entre les pattes, sur
// la pointe du sternum), sisson-1914-fig304 (g pectoral superficiel devant le bras ; h, h' pectoral
// profond, h derrière le coude le long du bas du thorax), ellenberger-hirsch-t3 (g, g', h, même
// disposition chez le cerf), acia-boeuf-17 et -18 (le bas des côtes et la pointe de poitrine).
//
// Ce qui est établi et dessiné :
//   - la poitrine contient « the anterior end of the sternum bones, M. pectoralis profundi, and the
//     M. pectoralis superficialis » (IMPS 118) ; le pectoral est « over the sternum in the brisket »,
//     en deux couches, profonde et superficielle (GUELPH) ;
//   - ses limites : du premier segment du sternum, par les cartilages costaux, jusqu'à la 8e côte
//     (CEE-ONU 9129) — le trait arrière de la vue 1 suit la limite du module (C.LIMITES.poitrine) ;
//   - le pectoral profond « arises as far forward as the second rib » (SISSON) : sur la pièce sortie,
//     il s'amincit et s'arrête avant la pointe, que le superficiel couvre seul ;
//   - le gras « lying medial to the pectoral muscles » (CEE-ONU 9228) : sur la face interne, entre le
//     pectoral profond et l'os. Rien entre les deux couches (écart n° 9).
//
// Vue 1 — où elle est : le devant de la carcasse de profil gauche (la carcasse commune, du cou coupé
//   au milieu de l'avant-bras), le pectoral superficiel et le pectoral profond chacun dans sa trame
//   (les mêmes qu'aux vues 2 et 3), le sternum vu au travers ; des côtes, seules la première et la 8e,
//   les deux bouts de la poitrine ; repères : première côte, coude (olécrane), et le trait tireté au
//   cartilage de la 8e côte où la poitrine s'arrête. Le profond passe sous le superficiel : son bord
//   caché est en tireté fin. Le sternum est nommé à la vue 2 (le budget de renvois de la légende :
//   au-delà de neuf, la ligne du pectoral superficiel et son latin ne tiennent plus dans la colonne).
// Vue 2 — la coupe en travers, entre les pattes avant : le sternum et les cartilages coupés (aplat
//   noir, le sternum plus épais au fond du U) ; dehors, une trame par couche : le gras sur la face
//   interne, le pectoral profond, le pectoral superficiel. Les bouts du U sont coupés à la jonction des
//   cartilages et des côtes, la limite de la poitrine (CEE-ONU 9129). La lame passe entre l'os et le
//   gras : d'un côté, les couches déjà levées ensemble font un coin ouvert contre le cartilage, où la
//   flèche descend vers le sternum ; la couture qui reste à ouvrir continue en pointillé tout le tour.
// Vue 3 — la poitrine sortie, posée face interne en haut comme elle sort de la vue 2 : le gras
//   dessus, puis les deux couches ; le profond s'amincit à l'avant (il ne va pas plus loin que la
//   2e côte) ; le bout arrière coupé droit à la 8e côte.
//
// NON ÉTABLI, donc pas dessiné : du gras entre les deux couches ; le grain (aucune flèche) ; les
// épaisseurs (les couches sont dessinées d'égale épaisseur, le gras mince, sans chiffre) ; le
// contour de la pièce à plat (vue 3 : forme de principe, pointe arrondie devant, bout coupé
// derrière) ; la forme de la coupe en travers (un U de principe : aucune coupe transversale de la
// poitrine dans les figures) ; l'ordre du geste (la flèche descend de la limite vers le sternum :
// aucune source ne prescrit par où commencer). La petite vue de face (section 21) n'est pas dessinée :
// aucune figure de cervidé de face, et la largeur de la poitrine de l'orignal n'est pas établie.
const C = require('./_carcasse-orignal');

const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
const f1 = v => Math.round(v * 10) / 10;
const dP = (pts, ferme) => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + (ferme ? ' Z' : '');
const trait = (ep, extra = '') => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"${extra}`;
// une couture qu'on ouvre : pointillé rond sur un liseré blanc (comme 62-10)
const pointille = `fill="none" stroke="${NOIR}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0.1 3.4"`;
const efface = `fill="none" stroke="${BLANC}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"`;
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const unit = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; return [dx / L, dy / L]; };
const lisse = t => t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);

// Les trois trames des couches, les mêmes dans les trois vues : pectoral superficiel en hachure
// serrée à 45°, pectoral profond en hachure plus lâche dans l'autre sens, gras en points.
function trames(id) {
  const L = (lg) => `<line x1="0" y1="0" x2="0" y2="${lg}" stroke="${NOIR}" stroke-width="0.5"/>`;
  return `<pattern id="${id}-sup" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">${L(3)}</pattern>`
    + `<pattern id="${id}-prof" width="4.2" height="4.2" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">${L(4.2)}</pattern>`
    + `<pattern id="${id}-gras" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.7" fill="${NOIR}" stroke="none"/><circle cx="3" cy="3" r="0.7" fill="${NOIR}" stroke="none"/></pattern>`;
}

// ─── Données du module ─────────────────────────────────────────────────────────────────────
const SUP = C.MUSCLES.pectoralSuperficiel.pts;
const PROF = C.MUSCLES.pectoralProfond.pts;
// la limite arrière de la poitrine (C.LIMITES.poitrine) : de la jonction de la 8e côte au bas du corps
const TRAIT_8 = C.LIMITES.poitrine.slice(2);                 // [867,613] [871,655] [873,690]

// ─── Vue 1 ─────────────────────────────────────────────────────────────────────────────────
// Le devant de la carcasse, du cou coupé au milieu de l'avant-bras, pour qu'on reconnaisse la bête ;
// des côtes, seules la première et la 8e (les deux bouts de la poitrine), pour ne pas noyer les trames.
const CADRE_OU = [362, 132, 930, 880];

// ─── Vue 2 : la coupe en travers ───────────────────────────────────────────────────────────
// Repère propre (u) : x vers la droite, y vers le bas, le dessous du sternum en (0, 0). Le U est la
// face externe de l'os (cartilages, puis sternum au fond, puis cartilages) ; ses deux bouts, en haut,
// sont la coupe à la jonction des cartilages et des côtes. Forme de principe : aucune coupe en
// travers de la poitrine dans les figures ; épaisseurs de dessin, aucune n'est établie.
const OS_EXT = [[-50, -100], [-50, -72], [-47, -46], [-38, -22], [-22, -6], [0, 0], [22, -6], [38, -22],
  [47, -46], [50, -72], [50, -100]];
const EP = { gras: 6, prof: 16, sup: 16 };
const Y_LAME = -38;          // où en est la lame, sur le cartilage de droite
const OUVERT = 34;           // écart du coin en haut
const osExt = C.dense(OS_EXT, 1.5, false);
const tang = osExt.map((q, i) => unit(osExt[Math.max(0, i - 1)], osExt[Math.min(osExt.length - 1, i + 1)]));
const norm = tang.map(t => [-t[1], t[0]]);                            // vers le dehors du U
const epOs = q => 7 + 10 * Math.exp(-Math.pow(q[0] / 30, 2));          // cartilage mince, sternum épais au fond
const ouvert = q => (q[0] > 0 && q[1] < Y_LAME) ? OUVERT * Math.pow((Y_LAME - q[1]) / (Y_LAME + 100), 1.2) : 0;
// la limite à la distance d de l'os, couches levées comprises
const couche = d => osExt.map((q, i) => { const e = ouvert(q) + d; return [q[0] + norm[i][0] * e, q[1] + norm[i][1] * e]; });
const osInt = osExt.map((q, i) => [q[0] - norm[i][0] * epOs(q), q[1] - norm[i][1] * epOs(q)]);
const L0 = couche(0), L1 = couche(EP.gras), L2 = couche(EP.gras + EP.prof), L3 = couche(EP.gras + EP.prof + EP.sup);
// sur le côté gauche, le point de la limite l à la hauteur y (cible de renvoi)
const aGauche = (l, y) => l.reduce((b, q) => (q[0] < 0 && Math.abs(q[1] - y) < Math.abs(b[1] - y) ? q : b), l[0]);

// ─── Vue 3 : la pièce sortie, en perspective cavalière ─────────────────────────────────────
// Contour à plat de principe (repère propre : x de l'avant vers l'arrière, y en profondeur).
const PIECE = [[272, 10, 'c'], [214, 3], [150, 0], [92, 6], [48, 18], [20, 38], [6, 64],
  [12, 90], [34, 112], [76, 127], [142, 134], [208, 132], [272, 128, 'c']];
const ECRASE3 = 0.62;

// la chaîne du haut, du point le plus à gauche au plus à droite (le complément de chaineBasse)
function chaineHaute(pts) {
  const bas = chaineBasse(pts);
  const dans = new Set(bas.slice(1, -1));
  const n = pts.length, iL = pts.indexOf(bas[0]), iR = pts.indexOf(bas[bas.length - 1]);
  const a = [], b = [];
  for (let i = iL; ; i = (i + 1) % n) { a.push(pts[i]); if (i === iR) break; }
  for (let i = iL; ; i = (i - 1 + n) % n) { b.push(pts[i]); if (i === iR) break; }
  return a.some(p => dans.has(p)) ? b : a;
}
function chaineBasse(pts) {
  let iL = 0, iR = 0;
  pts.forEach((p, i) => { if (p[0] < pts[iL][0] - 1e-6) iL = i; if (p[0] > pts[iR][0] + 1e-6 || (Math.abs(p[0] - pts[iR][0]) < 1e-6 && p[1] > pts[iR][1])) iR = i; });
  const n = pts.length, a = [], b = [];
  for (let i = iL; ; i = (i + 1) % n) { a.push(pts[i]); if (i === iR) break; }
  for (let i = iL; ; i = (i - 1 + n) % n) { b.push(pts[i]); if (i === iR) break; }
  const moy = c => c.reduce((s, p) => s + p[1], 0) / c.length;
  return moy(a) > moy(b) ? a : b;
}

module.exports = (h) => {
  const place1 = z => C.placer(z, { cadre: CADRE_OU });
  // la vue 2 : son repère propre, la coupe à droite de la colonne des pastilles
  const place2 = z => {
    const x0 = -50 - 38, x1 = 50 + OUVERT + 38, y0 = -100, y1 = 38;
    const k = Math.min((z.l - 30 - 8) / (x1 - x0), (z.h - 70) / (y1 - y0));
    const ox = 30 + (z.l - 38 - (x1 - x0) * k) / 2 - x0 * k, oy = 42 - y0 * k;
    return q => [ox + q[0] * k, oy + q[1] * k];
  };

  // la vue 3 : un repère à elle, la pièce centrée
  const place3 = z => {
    const k = (z.l - 22) / 272;
    const T3 = 6 + 11 + 11;                                // épaisseur totale dessinée (px)
    const hTot = 134 * k * ECRASE3 + T3;
    const oy = (z.h - hTot) / 2 - 6;
    return q => [11 + q[0] * k, oy + q[1] * k * ECRASE3];
  };
  const EP3 = { gras: 6, prof: 11, sup: 11 };              // px, mêmes rapports qu'à la vue 2

  return {
    ref: '62-18',
    titre: 'La poitrine',
    desc: "Trois vues de la poitrine d'une carcasse d'orignal écorchée, de profil gauche, l'avant à gauche. "
      + "Première vue : le bas du quartier avant, le sternum entre les pattes avant, le pectoral superficiel à la "
      + "pointe de la poitrine et le pectoral profond derrière lui le long du sternum, chacun dans sa trame, jusqu'au "
      + "trait tireté du cartilage de la 8e côte ; repères : la première côte et la pointe du coude. Deuxième vue : la "
      + "coupe en travers, un U : le sternum et les cartilages en noir, coupés à la jonction des côtes, et dehors trois "
      + "couches, le gras sur la face interne, le pectoral profond, le pectoral superficiel ; d'un côté, les couches "
      + "déjà levées ensemble laissent un coin ouvert contre le cartilage, où une flèche descend vers le sternum ; la "
      + "couture qui reste à ouvrir continue en pointillé. Troisième vue : la poitrine sortie, pièce plate posée face "
      + "interne en haut, le gras dessus, puis les deux couches de muscle, le bout arrière coupé droit. Aucune flèche "
      + "de grain : le sens des fibres des pectoraux n'est établi par aucune source.",
    format: 'demi',
    disposition: [['ou', 'coupe', 'sortie']],
    largeurs: [[8, 10, 7]],
    vues: {
      ou: {
        titre: 'Où elle est',
        dessin: z => {
          const p = place1(z);
          const out = [C.dessiner(h, p, {
            id: 'v1', fondOs: false, loin: 'gris',
            os: ['cote1', 'cote8', 'sternum', 'omoplate', 'humerus', 'radius', 'cubitus'],
            osForts: [],
          })];
          const sup = C.dense(SUP, 3, true).map(p.T), prof = C.dense(PROF, 3, true).map(p.T);
          out.push(`<defs>${trames('v1')}`
            + `<clipPath id="v1-horsSup"><path clip-rule="evenodd" fill="${BLANC}" d="M-600 -600 L${z.l + 600} -600 L${z.l + 600} ${z.h + 600} L-600 ${z.h + 600} Z ${dP(sup, true)}"/></clipPath>`
            + `<clipPath id="v1-dansSup"><path fill="${BLANC}" d="${dP(sup, true)}"/></clipPath></defs>`);
          out.push(`<g clip-path="url(#v1-vue)"><g clip-path="url(#v1-corps)">`);
          // le profond sous le superficiel : sa trame ne se voit que hors du superficiel
          out.push(`<g clip-path="url(#v1-horsSup)"><path d="${dP(prof, true)}" fill="url(#v1-prof)" stroke="none"/></g>`);
          out.push(`<path d="${dP(sup, true)}" fill="url(#v1-sup)" stroke="none"/>`);
          // le contour du profond, sans son bord arrière (c'est le trait de la 8e côte) : plein où il se
          // voit, tireté sous le superficiel
          const densU = C.dense(PROF, 3, true);
          const runs = []; let cur = [];
          densU.forEach(q => { if (q[0] < 866) cur.push(q); else if (cur.length) { runs.push(cur); cur = []; } });
          if (cur.length) runs.push(cur);
          if (runs.length > 1 && runs[0][0] === densU[0]) { const dern = runs.pop(); runs[0] = dern.concat(runs[0]); }
          runs.forEach(r => {
            const d = dP(r.map(p.T), false);
            out.push(`<g clip-path="url(#v1-horsSup)"><path d="${d}" ${trait(0.7)}/></g>`);
            out.push(`<g clip-path="url(#v1-dansSup)"><path d="${d}" ${trait(0.7, ' stroke-dasharray="2.5 2"')}/></g>`);
          });
          out.push(`<path d="${dP(sup, true)}" ${trait(0.7)}/>`);
          // le trait au cartilage de la 8e côte : la poitrine s'arrête là
          out.push(`<path d="${dP(C.dense(TRAIT_8, 3).map(p.T), false)}" ${trait(1.4, ' stroke-dasharray="5 3"')}/>`);
          out.push('</g></g>');
          return out.join('\n');
        },
        renvois: z => {
          const p = place1(z);
          return [
            { n: 1, texte: 'la poitrine : les deux pectoraux', rond: [12, p.pt([0, 700])[1]], cible: p.pt([575, 640]) },
            { n: 2, texte: 'première côte', rond: [12, p.pt([0, 530])[1]], cible: p.pt([636, 530]) },
            { n: 3, texte: 'coude, pointe de l’olécrane', rond: [p.pt([826, 0])[0], z.h - 14], cible: p.pt([776, 649]) },
            { n: 4, texte: '8e côte : fin de la poitrine', rond: [z.l - 12, p.pt([0, 760])[1]], cible: p.pt([871, 650]) },
          ];
        },
      },
      coupe: {
        titre: 'La coupe en travers',
        dessin: z => {
          const T = place2(z), tr = pts => pts.map(T);
          const rev = a => a.slice().reverse();
          const out = [`<defs>${trames('v2')}</defs>`];
          // les trois couches, chacune dans sa trame
          [[L0, L1, 'gras'], [L1, L2, 'prof'], [L2, L3, 'sup']].forEach(([a, b, t]) => {
            const d = dP(tr([...a, ...rev(b)]), true);
            out.push(`<path d="${d}" fill="${BLANC}" stroke="none"/>`);
            out.push(`<path d="${d}" fill="url(#v2-${t})" stroke="none"/>`);
          });
          out.push(`<path d="${dP(tr(L1), false)}" ${trait(0.7)}/>`);
          out.push(`<path d="${dP(tr(L2), false)}" ${trait(0.7)}/>`);
          // la charte : le contour de la coupe pèse (2,4) ; les limites entre couches restent fines
          out.push(`<path d="${dP(tr([...L0, ...rev(L3)]), true)}" ${trait(2.4)}/>`);
          // l'os coupé : cartilages et sternum
          out.push(`<path d="${dP(tr([...osExt, ...rev(osInt)]), true)}" fill="${NOIR}" stroke="${NOIR}" stroke-width="0.7" stroke-linejoin="round"/>`);
          // la couture qui reste à ouvrir, entre l'os et le gras, de la lame jusqu'à l'autre bout
          const iLame = osExt.findIndex(q => q[0] > 0 && q[1] <= Y_LAME);
          const couture = tr(osExt.slice(0, iLame + 1));
          out.push(`<path d="${dP(couture, false)}" ${efface}/>`);
          out.push(`<path d="${dP(couture, false)}" ${pointille}/>`);
          // la lame : dans le coin ouvert, le long du cartilage, vers le sternum
          const fl = osExt.map((q, i) => [q, i]).filter(([q]) => q[0] > 0 && q[1] <= -56 && q[1] >= -97)
            .map(([q, i]) => { const e = ouvert(q) / 2; return [q[0] + norm[i][0] * e, q[1] + norm[i][1] * e]; }).reverse();
          out.push(h.geste(dP(tr(fl), false)));   // la charte : la lame, le geste, en rouge
          return out.join('\n');
        },
        renvois: z => {
          const T = place2(z);
          const mi = (a, b, y) => T(lerp(aGauche(a, y), aGauche(b, y), 0.5));
          const iF = osExt.findIndex(q => q[0] > 0 && q[1] <= -66);
          const qF = osExt[iF], eF = ouvert(qF) / 2;
          return [
            { n: 5, texte: 'sternum et cartilages des côtes', rond: T([0, -62]), cible: T([0, -8]) },
            { n: 6, texte: 'gras sur la face interne', rond: [12, T([0, -96])[1]], cible: mi(L0, L1, -84) },
            { n: 7, texte: 'pectoral profond, M. pectoralis profundus', rond: [12, T([0, -66])[1]], cible: mi(L1, L2, -60) },
            { n: 8, texte: 'pectoral superficiel, M. pectoralis superficialis', rond: [12, T([0, -36])[1]], cible: mi(L2, L3, -34) },
            { n: 9, texte: 'la lame à plat contre l’os', rond: [z.l - 12, T([0, -22])[1]], cible: T([qF[0] + norm[iF][0] * eF, qF[1] + norm[iF][1] * eF]) },
          ];
        },
      },
      sortie: {
        titre: 'La poitrine sortie',
        dessin: z => {
          const T = place3(z);
          const top = C.dense(PIECE, 2, true).map(T);
          const ch = chaineBasse(top);
          const x0 = T([0, 0])[0], k = (T([100, 0])[0] - x0) / 100;
          const u = P => (P[0] - x0) / k;                      // abscisse dans le repère de la pièce
          const eProf = P => EP3.prof * lisse((u(P) - 16) / 40);
          const dy = (c, f) => c.map(P => [P[0], P[1] + f(P)]);
          const l0 = ch, l1 = dy(ch, () => EP3.gras), l2 = dy(ch, P => EP3.gras + eProf(P)), l3 = dy(ch, P => EP3.gras + eProf(P) + EP3.sup);
          const poly = (a, b) => [...a, ...b.slice().reverse()];
          const out = [`<defs>${trames('v3')}</defs>`];
          out.push(`<path d="${dP(poly(l0, l1), true)}" fill="${BLANC}" stroke="none"/>`);
          out.push(`<path d="${dP(poly(l0, l1), true)}" fill="url(#v3-gras)" stroke="none"/>`);
          out.push(`<path d="${dP(poly(l1, l2), true)}" fill="url(#v3-prof)" stroke="none"/>`);
          out.push(`<path d="${dP(poly(l2, l3), true)}" fill="${BLANC}" stroke="none"/>`);
          out.push(`<path d="${dP(poly(l2, l3), true)}" fill="url(#v3-sup)" stroke="none"/>`);
          out.push(`<path d="${dP(l1, false)}" ${trait(0.7)}/>`);
          out.push(`<path d="${dP(l2, false)}" ${trait(0.7)}/>`);
          out.push(`<path d="${dP(poly(l0, l3), true)}" ${trait(1.4)}/>`);
          // la face interne, en haut : le gras
          out.push(`<path d="${dP(top, true)}" fill="${BLANC}" stroke="none"/>`);
          out.push(`<path d="${dP(top, true)}" fill="url(#v3-gras)" stroke="none"/>`);
          out.push(`<path d="${dP(top, true)}" ${trait(1.4)}/>`);
          // la charte : la silhouette de la pièce pèse (2,4), l'arête entre le dessus et la tranche reste à 1,4
          out.push(`<path d="${dP([...chaineHaute(top), ...l3.slice().reverse()], true)}" ${trait(2.4)}/>`);
          return out.join('\n');
        },
        renvois: () => [],
      },
    },
  };
};
