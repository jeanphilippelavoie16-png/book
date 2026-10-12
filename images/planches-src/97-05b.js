// Planche 97-05b — La serre adossée : ouvrir et fermer (chapitre 97, §5-F, étapes 39 et 40, et
// §8, bloc 2). La même coupe que 97-05a (la géométrie vient de 97-05a.js), prise cette fois là où
// la trappe traverse le mur, entre deux barils : on n'y voit ni baril ni tablette.
//   « Une ouverture basse face au vent d'été, une haute à l'opposé : l'air entre en bas, se
//   réchauffe et sort en haut. » — « La chaleur du jour passe au chalet par deux ouvertures dans le
//   mur commun, une en haut et une en bas — une fenêtre ouverte en haut, une trappe ou la porte en
//   bas : l'air chaud entre au chalet par le haut, l'air frais revient à la serre par le bas. On les
//   referme au coucher du soleil. » — soleil de midi à 40° aux équinoxes, à 63° à la Saint-Jean.
// Vue 1 : un jour de printemps, la fenêtre haute et la trappe ouvertes, les ouvertures de la serre
// fermées ; l'air fait la boucle. Vue 2 : l'été, l'inverse : le mur commun fermé, l'air du dehors
// entre par le volet bas et sort par le châssis haut, sous l'auvent.
// Aucune cote : la construction est cotée sur 97-05a.
const { serre } = require('./97-05a.js');
const RAD = Math.PI / 180;

module.exports = (h) => {
  const S = serre(h);
  const { G, yi, yo, soleil, coupe } = S;
  const CADRE = { xmin: -230, xmax: 2420, ymin: -380, ymax: 3300 };

  // quelques rayons de soleil sur le vitrage, et leur suite dedans jusqu'au sol ou au mur
  const rayons = (P, deg, impacts) => {
    const out = [];
    const d = [Math.cos(deg * RAD), -Math.sin(deg * RAD)];
    for (const sv of impacts) {
      const xi = 20 + sv * Math.cos(50 * RAD), yI = yo(xi);
      const a = P(xi - 520 * d[0], yI - 520 * d[1]), b = P(xi - 30 * d[0], yI - 30 * d[1]);
      out.push(h.fleche(`M ${a.join(' ')} L ${b.join(' ')}`, h.a.detail));
      const x2 = xi + 190 * d[0], y2 = yI + 190 * d[1];
      const kSol = (20 - y2) / d[1], kMur = (G.XW - 25 - x2) / d[0];
      const k = Math.min(kSol, kMur);
      out.push(h.fleche(`M ${P(x2, y2).join(' ')} L ${P(x2 + k * d[0], y2 + k * d[1]).join(' ')}`, h.a.fin));
    }
    const xi = 20 + impacts[impacts.length - 1] * Math.cos(50 * RAD), yI = yo(xi);
    out.push({ so: P(xi - 680 * d[0], yI - 680 * d[1]), d, xi, yI });
    return out;
  };
  const air = d => h.fleche(d, h.a.cache);
  const M = (P, pts) => pts.map(([c, ...q]) => `${c} ${q.map(v => P(...v).join(' ')).join(' ')}`).join(' ');

  // ── Vue 1 : le jour, au printemps : la chaleur passe au chalet
  const vuePrintemps = z => {
    const c = coupe(z, { ...CADRE, fenetre: 'ouvert', trappe: 'ouvert', bas: 'ferme', haut: 'ferme' });
    const { P } = c;
    const out = [c.svg];
    // les ouvertures du mur commun : les faces du mur s'interrompent, la pièce qui a bougé se voit
    const { XW, EPM, FEN, TRAP } = G;
    const vide = (y0, y1) => h.chemin([P(XW - 15, y0 + 15), P(XW + EPM + 15, y0 + 15), P(XW + EPM + 15, y1 - 15), P(XW - 15, y1 - 15)], 'fill="#fff" stroke="none"', true);
    out.push(vide(FEN[0], FEN[1]), vide(TRAP[0], TRAP[1]));
    // le châssis de la fenêtre, à charnière en bas côté chalet, rabattu vers le chalet
    const L = FEN[1] - FEN[0] - 20, A = 58 * RAD, H0 = [XW + EPM, FEN[0]];
    const H1 = [H0[0] + L * Math.sin(A), H0[1] + L * Math.cos(A)];
    out.push(h.ligne(...P(...H0), ...P(...H1), 'fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="butt"'));
    out.push(h.cercle(...P(...H0), 3, 'fill="#1A1A1A" stroke="none"'));
    // le panneau de la trappe, à charnière en haut côté chalet, relevé à plat contre le mur
    const T = TRAP[1] - TRAP[0];
    out.push(h.chemin([P(XW + EPM, TRAP[1]), P(XW + EPM + 40, TRAP[1]), P(XW + EPM + 40, TRAP[1] + T), P(XW + EPM, TRAP[1] + T)], h.a.contour.replace('fill="none"', 'fill="#fff"'), true));
    out.push(h.cercle(...P(XW + EPM + 40, TRAP[1]), 3, 'fill="#1A1A1A" stroke="none"'));
    const r = rayons(P, 40, [300, 750]);
    const info = r.pop();
    out.push(...r, soleil(...info.so));
    // l'équerre : le rayon arrive de face sur le vitrage
    const U = [Math.cos(50 * RAD), Math.sin(50 * RAD)], q = 110, { d, xi, yI } = info;
    out.push(h.chemin([P(xi + q * U[0], yI + q * U[1]), P(xi + q * U[0] - q * d[0], yI + q * U[1] - q * d[1]), P(xi - q * d[0], yI - q * d[1])], h.a.fin));
    // la boucle : l'air chauffé monte sous le vitrage et entre au chalet par le haut…
    const Y1 = (G.FEN[0] + G.FEN[1]) / 2 + 60;
    out.push(air(M(P, [['M', [430, 330]], ['Q', [800, 1350], [1250, 1720]], ['Q', [1450, Y1], [G.XW - 150, Y1]], ['L', [G.XW + 620, Y1]]])));
    // …redescend dans le chalet…
    out.push(air(M(P, [['M', [G.XW + 680, Y1 - 160]], ['L', [G.XW + 680, 1050]]])));
    // …et revient à la serre par la trappe, le long du sol, vers le pied du vitrage
    const Y2 = (G.TRAP[0] + G.TRAP[1]) / 2;
    out.push(air(M(P, [['M', [G.XW + 640, Y2 + 120]], ['Q', [G.XW + 640, Y2], [G.XW + 420, Y2]], ['L', [G.XW - 150, Y2]], ['Q', [G.XW - 480, Y2], [G.XW - 560, 330]], ['Q', [G.XW - 640, 160], [G.XW - 950, 160]], ['L', [520, 160]]])));
    return { svg: out.join('\n'), c };
  };

  // ── Vue 2 : l'été : l'air du dehors traverse la serre
  const vueEte = z => {
    const c = coupe(z, { ...CADRE, fenetre: 'ferme', trappe: 'ferme', bas: 'ouvert', haut: 'ouvert' });
    const { P } = c;
    const out = [c.svg];
    const r = rayons(P, 63, [300, 700]);
    const info = r.pop();
    out.push(...r, soleil(...info.so));
    // le vent d'été entre sous le volet bas, l'air monte en travers de la serre et sort en haut
    const XH0 = G.XA - 380, XH1 = G.XA - 40;
    const xm = (XH0 + XH1) / 2 - 60, ym = (yi(xm) + yo(xm)) / 2;
    const N = [-Math.sin(50 * RAD), Math.cos(50 * RAD)];
    out.push(air(M(P, [['M', [-220, 100]], ['L', [-150, 100]], ['Q', [-120, 100], [-30, 300]], ['C', [400, 330], [950, 900], [xm, ym]], ['L', [xm + 520 * N[0], ym + 520 * N[1]]]])));
    return { svg: out.join('\n'), c };
  };

  const memo = {};
  const vue = (id, f) => z => { const k = `${id}:${z.l}x${z.h}`; if (!memo[k]) memo[k] = f(z); return memo[k]; };
  const vP = vue('printemps', vuePrintemps), vE = vue('ete', vueEte);

  return {
    ref: '97-05b',
    titre: 'La serre adossée : ouvrir et fermer',
    desc: 'Deux fois la même coupe de la serre adossée au mur sud du chalet, prise là où une trappe traverse le mur. Un jour de printemps : la fenêtre haute et la trappe basse du mur commun sont ouvertes, les ouvertures de la serre fermées ; le soleil de midi tombe d’équerre sur le vitrage, l’air chauffé monte sous le vitrage, entre au chalet par la fenêtre, redescend et revient à la serre par la trappe, le long du sol. L’été : le mur commun est fermé ; le vent entre sous le volet du muret, l’air monte en travers de la serre et sort par le châssis ouvrant, en haut du vitrage, sous l’auvent. Encadré danger : rien ne brûle dans la serre, et elle ne couvre aucune sortie d’un appareil du chalet.',
    format: 'pleine',
    disposition: [['printemps', 'ete']],
    vues: {
      printemps: {
        titre: 'Le jour, au printemps',
        dessin: z => vP(z).svg,
        renvois: z => {
          const { c } = vP(z), P = c.P;
          return [
            { n: 1, rond: P(G.XW + 380, 2400), cible: c.cibles.fenetre, texte: 'fenêtre haute, fermée au coucher du soleil' },
            { n: 2, rond: P(1250, 1150), cible: c.cibles.trappe, texte: 'trappe basse ou porte, fermée elle aussi' },
          ];
        },
      },
      ete: {
        titre: 'L’été',
        dessin: z => vE(z).svg,
        renvois: z => {
          const { c } = vE(z), P = c.P;
          return [
            { n: 3, rond: P(-150, -290), cible: c.cibles.bas, texte: 'ouverture basse, face au vent d’été' },
            { n: 4, rond: P(350, 2900), cible: c.cibles.haut, texte: 'ouverture haute, à l’opposé' },
          ];
        },
      },
    },
    danger: 'Rien ne brûle dans la serre, et elle ne couvre ni la sortie d’évacuation, ni la prise d’air, ni la cheminée d’un appareil du chalet. Par les ouvertures du mur commun, le monoxyde de carbone passe au chalet où l’on dort, sans odeur ni couleur : on s’endort au lieu de sortir.',
  };
};
