// Planche 97-05a — La serre adossée au mur sud du chalet : la construction (chapitre 97, §5-F,
// étapes 36 à 39, et « La masse qui garde la chaleur, avec ce qu'on a »).
// Ce que le chapitre dit, et que la planche dessine :
//   « Contre le mur sud du chalet, l'axe long est-ouest. Jamais sous le bord d'un toit qui déverse
//   sa neige ou ses glaçons, ou alors sous un auvent solide qui les détourne. » — « un vitrage
//   incliné à environ 50° de l'horizontale reçoit de face le soleil de mars et de septembre »
//   (soleil de midi à 40° aux équinoxes : 40 + 50 = 90, le rayon tombe d'équerre sur le vitrage).
//   « Vieilles fenêtres ou plastique ; deux épaisseurs séparées par une lame d'air coupent la perte
//   de chaleur de moitié. » — « Le mur du chalet fait le mur nord massif. Dans la serre, des barils
//   ou des bidons pleins d'eau, foncés, fermés, alignés contre ce mur, là où le soleil de midi les
//   frappe, et qui servent de pieds aux tablettes de semis. [...] un contenant fermé qui peut geler
//   à fond garde de l'air sous le bouchon » — « Isoler le bas des murs jusqu'à environ 60 cm sous
//   terre » — « Un baril de 200 L ».
// Vue 1 : la coupe nord-sud (le sud à gauche), prise au milieu d'un baril. Vue 2 : vue de dessus,
// coupée au-dessus du muret, avec le trait de la coupe. Vue 3 : le vitrage double, coupé en travers
// des chevrons.
// Seules cotes : 50° et 600 mm (le chapitre ne donne aucune autre mesure de la serre). Le baril est
// dessiné à la taille d'un baril de 200 L ; la profondeur de la serre, la hauteur du muret, les
// chevrons, le débord du toit et la longueur de l'auvent ne servent qu'au dessin et ne sont pas cotés.
// La page b (97-05b) montre les ouvertures : la chaleur passe au chalet, l'air traverse en été.

const RAD = Math.PI / 180;
const r1 = v => Math.round(v * 10) / 10;

// ── La serre, en mm : x vers le nord (le sud à gauche), y vers le haut, 0 au sol.
//    Partagée avec 97-05b.
function serre(h) {
  const T50 = Math.tan(50 * RAD), C50 = Math.cos(50 * RAD), S50 = Math.sin(50 * RAD);
  const blanc = (t = h.a.arete) => t.replace('fill="none"', 'fill="#fff"');
  const fond = t => ({ fond: t });   // une hachure posée sur un fond blanc (deux tracés)
  const chemin = (pts, at, ferme = false) => (typeof at === 'object'
    ? [h.chemin(pts, h.a.blanc, ferme), h.chemin(pts, at.fond, ferme)].join(' ')
    : h.chemin(pts, at, ferme));
  const G = {
    KW: 140, HK: 500, SEM: -300,        // muret du pied : épaisseur, hauteur ; sa semelle de pierre
    ISO: 80, ISO_BAS: -600,             // l'isolant du bas des murs, jusqu'à 60 cm sous terre
    XW: 1700, EPM: 200,                 // face sud du mur du chalet ; son épaisseur
    PL: 550, WT: 3000,                  // dessus du plancher du chalet ; haut du mur
    XA: 1050,                           // bas de l'auvent
    DECK: 78,                           // épaisseur verticale du platelage de l'auvent (50 d'équerre)
    BAR: { l: 572, h: 851 },            // baril de 200 L
    FEN: [1500, 2150],                  // fenêtre haute du mur commun
    TRAP: [550, 830],                   // trappe basse, au ras du plancher du chalet
    DEB: 450, TOIT: 25,                 // débord du toit du chalet ; sa pente
  };
  G.XB = G.XW - 20 - G.BAR.l;
  const yi = x => 540 + (x - 40) * T50;             // dessous des chevrons (seconde épaisseur)
  const yo = x => yi(x) + 90 / C50;                  // dessus des chevrons (première épaisseur)
  const XE = G.XW - G.DEB, XR2 = G.XW + 400;         // bout du débord ; où le toit est rompu
  const yr = x => G.WT + (x - G.XW - 100) * Math.tan(G.TOIT * RAD);   // dessous du toit
  const yr2 = x => yr(x) + 230 / Math.cos(G.TOIT * RAD);             // dessus du toit (la tôle)

  // repère d'une vue : y vers le haut, centré dans la zone
  const repere = (z, xmin, xmax, ymin, ymax, m = 6) => {
    const s = Math.min((z.l - 2 * m) / (xmax - xmin), (z.h - 2 * m) / (ymax - ymin));
    const ox = z.l / 2 - (xmin + xmax) / 2 * s, oy = z.h / 2 + (ymin + ymax) / 2 * s;
    const P = (x, y) => [r1(ox + x * s), r1(oy - y * s)];
    return { s, P, Pl: pts => pts.map(p => P(...p)) };
  };

  // le soleil : un rond et ses rayons courts
  const soleil = (cx, cy) => {
    const o = [h.cercle(cx, cy, 8, h.a.arete)];
    for (let k = 0; k < 8; k++) {
      const an = (k + 0.5) * Math.PI / 4;
      o.push(h.ligne(cx + 11 * Math.cos(an), cy + 11 * Math.sin(an), cx + 16 * Math.cos(an), cy + 16 * Math.sin(an), h.a.detail));
    }
    return o.join('\n');
  };

  // Le corps de la coupe. o : { xmin, xmax, ymin, ymax, barils, neige, fenetre, trappe, bas, haut }
  // fenetre, trappe, bas, haut : 'ouvert' ou 'ferme' (bas et haut : les ouvertures de la serre).
  const coupe = (z, o) => {
    const R = repere(z, o.xmin, o.xmax, o.ymin, o.ymax, 4);
    const { P, Pl, s } = R;
    const out = [];
    const { KW, HK, SEM, ISO, ISO_BAS, XW, EPM, PL, WT, XA, DECK, BAR, FEN, TRAP } = G;
    const XL = o.xmin, XR = o.xmax, YB = o.ymin;

    // la terre, partout sous le sol
    out.push(chemin(Pl([[XL, 0], [XR, 0], [XR, YB], [XL, YB]]), h.a.hachure('terre', 'aucun'), true));
    // la fondation du chalet
    out.push(chemin(Pl([[XW, 350], [XW + 250, 350], [XW + 250, YB], [XW, YB]]), fond(h.a.hachure('pierre', 'arete')), true));
    // la semelle du muret, en pierres
    out.push(chemin(Pl([[0, 0], [KW, 0], [KW, SEM], [0, SEM]]), fond(h.a.hachure('pierre', 'arete')), true));
    // le muret du pied, en bois, et sa lisse
    const bas = o.bas === 'ouvert' ? [180, 420] : null;
    if (bas) {
      out.push(chemin(Pl([[0, 0], [KW, 0], [KW, bas[0]], [0, bas[0]]]), fond(h.a.hachure('bois', 'arete')), true));
      out.push(chemin(Pl([[0, bas[1]], [KW, bas[1]], [KW, HK], [0, HK]]), fond(h.a.hachure('bois', 'arete')), true));
    } else {
      out.push(chemin(Pl([[0, 0], [KW, 0], [KW, HK], [0, HK]]), fond(h.a.hachure('bois', 'arete')), true));
    }
    out.push(chemin(Pl([[0, HK], [KW, HK], [KW, HK + 40], [0, HK + 40]]), fond(h.a.hachure('bois', 'arete')), true));
    // l'isolant, du haut du muret jusqu'à 60 cm sous terre
    if (bas) {
      out.push(chemin(Pl([[-ISO, ISO_BAS], [0, ISO_BAS], [0, bas[0]], [-ISO, bas[0]]]), fond(h.a.hachure('isolant', 'arete')), true));
      out.push(chemin(Pl([[-ISO, bas[1]], [0, bas[1]], [0, HK], [-ISO, HK]]), fond(h.a.hachure('isolant', 'arete')), true));
      // le volet de l'ouverture basse, pendu en haut, poussé vers le dehors
      const pv = [-ISO, bas[1]];
      const a = 32 * RAD, lv = bas[1] - bas[0] + 20;
      const pv2 = [pv[0] - lv * Math.sin(a), pv[1] - lv * Math.cos(a)];
      out.push(h.ligne(...P(...pv), ...P(...pv2), h.a.contour));
      out.push(h.cercle(...P(...pv), 1.8, h.a.plein));
    } else {
      out.push(chemin(Pl([[-ISO, ISO_BAS], [0, ISO_BAS], [0, HK], [-ISO, HK]]), fond(h.a.hachure('isolant', 'arete')), true));
    }
    // le sol : dehors, dans la serre, sous le chalet
    out.push(h.ligne(...P(XL, 0), ...P(-ISO, 0), h.a.contour));
    out.push(h.ligne(...P(KW, 0), ...P(XW, 0), h.a.contour));
    out.push(h.ligne(...P(XW + 250, 0), ...P(XR, 0), h.a.arete));

    // le mur du chalet, avec la fenêtre haute et la trappe basse
    const mur = [[XW, 350], [XW + EPM, 350], [XW + EPM, WT], [XW, WT]];
    out.push(chemin(Pl(mur), fond(h.a.hachure('bois', 'arete')), true));
    const trou = (y0, y1) => chemin(Pl([[XW, y0], [XW + EPM, y0], [XW + EPM, y1], [XW, y1]]), blanc(h.a.arete), true);
    out.push(trou(FEN[0], FEN[1]));
    if (o.fenetre === 'ouvert') {
      // le châssis glissé de côté : l'ouverture est libre, il reste l'appui et la tête
      out.push(h.ligne(...P(XW + 70, FEN[0]), ...P(XW + 130, FEN[0]), h.a.contour));
      out.push(h.ligne(...P(XW + 70, FEN[1]), ...P(XW + 130, FEN[1]), h.a.contour));
    } else {
      out.push(chemin(Pl([[XW + 70, FEN[0]], [XW + 130, FEN[0]], [XW + 130, FEN[1]], [XW + 70, FEN[1]]]), blanc(h.a.arete), true));
      out.push(h.ligne(...P(XW + 100, FEN[0] + 30), ...P(XW + 100, FEN[1] - 30), h.a.fin));
    }
    if (o.trappe) {
      out.push(trou(TRAP[0], TRAP[1]));
      if (o.trappe !== 'ouvert') {
        out.push(chemin(Pl([[XW + EPM - 40, TRAP[0]], [XW + EPM, TRAP[0]], [XW + EPM, TRAP[1]], [XW + EPM - 40, TRAP[1]]]), fond(h.a.hachure('bois', 'arete')), true));
      }
    }
    // le plancher du chalet
    out.push(chemin(Pl([[XW + EPM, 350], [XR, 350], [XR, PL], [XW + EPM, PL]]), fond(h.a.hachure('bois', 'arete')), true));

    // la lambourde vissée au mur, qui porte le haut des chevrons
    out.push(chemin(Pl([[XW - 45, yi(XW - 45) - 170], [XW, yi(XW - 45) - 170], [XW, yi(XW - 45)], [XW - 45, yi(XW - 45)]]), fond(h.a.hachure('bois', 'arete')), true));
    // le chevron vu au-delà de la coupe, du muret au mur
    const XH = o.haut === 'ouvert' ? [XA - 380, XA - 40] : null;   // l'ouverture haute, sous l'auvent
    // La charte : ce chevron est derrière le plan de coupe, il recule en gris loin
    out.push(chemin(Pl([[0, 540], [0, yo(0)], [XW, yo(XW)], [XW, yi(XW)], [40, 540]]), h.a.loin, true));
    out.push(chemin(Pl([[0, 540], [0, yo(0)], [XW, yo(XW)], [XW, yi(XW)], [40, 540]]), h.a.detail, true));
    // les deux épaisseurs du vitrage, jusque sous l'auvent
    const feuille = (f, x0, x1) => h.ligne(...P(x0, f(x0)), ...P(x1, f(x1)), h.a.arete);
    if (XH) {
      out.push(feuille(yo, 0, XH[0]), feuille(yi, 40, XH[0]));
      out.push(feuille(yi, XH[1], XA - 60));
      // le châssis ouvrant, pendu en haut sous le bord de l'auvent, poussé vers le dehors
      const ch = [XH[1], yo(XH[1])], lc = (XH[1] - XH[0]) / C50;
      const a = (230 - 24) * RAD;
      const cb = [ch[0] + lc * Math.cos(a), ch[1] + lc * Math.sin(a)];
      out.push(h.ligne(...P(...ch), ...P(...cb), h.a.contour));
      out.push(h.cercle(...P(...ch), 1.8, h.a.plein));
    } else {
      out.push(feuille(yo, 0, XA - 20), feuille(yi, 40, XA - 60));
    }
    // l'auvent : un platelage de planches et sa tôle, sur le haut des chevrons, au-dessus du vitrage
    const xa0 = XA - 60;
    const auvent = [[xa0, yi(xa0)], [XW, yi(XW)], [XW, yo(XW) + DECK], [xa0, yo(xa0) + DECK]];
    out.push(chemin(Pl(auvent), fond(h.a.hachure('bois', 'arete')), true));
    out.push(h.ligne(...P(xa0 - 10, yo(xa0 - 10) + DECK + 6), ...P(XW, yo(XW) + DECK + 6), h.a.contour));
    // le solin qui remonte sur le mur
    out.push(chemin(Pl([[XW - 5, yo(XW) + DECK + 6], [XW - 5, yo(XW) + DECK + 160]]), h.a.detail));

    // le toit du chalet, rompu au-delà du mur
    const toit = [[XE, yr(XE)], [XR2, yr(XR2)], [XR2, yr2(XR2)], [XE, yr2(XE)]];
    out.push(chemin(Pl(toit), fond(h.a.hachure('bois', 'arete')), true));
    out.push(h.ligne(...P(XE - 8, yr2(XE) + 6), ...P(XR2, yr2(XR2) + 6), h.a.contour));
    // le mur sous le toit : le haut du mur est caché par le toit, on le referme
    out.push(h.ligne(...P(XW, yr(XW)), ...P(XW, WT), h.a.arete));
    // la rupture du toit
    const [ra, rb] = [P(XR2, yr(XR2) - 20), P(XR2, yr2(XR2) + 60)];
    const my = (ra[1] + rb[1]) / 2;
    out.push(h.path(`M ${ra[0]} ${ra[1]} L ${ra[0]} ${r1(my + 5)} L ${r1(ra[0] - 5)} ${r1(my + 1)} L ${r1(ra[0] + 5)} ${r1(my - 3)} L ${ra[0]} ${r1(my - 7)} L ${rb[0]} ${rb[1]}`, 'fill="#fff" stroke="none"'));
    out.push(h.path(`M ${ra[0]} ${ra[1]} L ${ra[0]} ${r1(my + 5)} L ${r1(ra[0] - 5)} ${r1(my + 1)} L ${r1(ra[0] + 5)} ${r1(my - 3)} L ${ra[0]} ${r1(my - 7)} L ${rb[0]} ${rb[1]}`, h.a.detail));

    let neige = null;
    if (o.neige) {
      // la neige sur le toit, et la plaque qui part au bord du débord
      const ep = 190;
      const couche = [[XE + 120, yr2(XE + 120) + 8], [XR2, yr2(XR2) + 8], [XR2, yr2(XR2) + ep], [XE + 120, yr2(XE + 120) + ep]];
      out.push(chemin(Pl(couche), fond(h.a.hachure('neige', 'arete')), true));
      const plaque = [[XE - 130, yr2(XE) - 40], [XE + 90, yr2(XE + 90) + 10], [XE + 90, yr2(XE + 90) + ep - 10], [XE - 90, yr2(XE) + ep - 80]];
      out.push(chemin(Pl(plaque), fond(h.a.hachure('neige', 'arete')), true));
      // son chemin : elle tombe sur l'auvent, glisse, et passe sur le vitrage
      const xs = XE - 150, ya = yo(xs) + DECK + 120;
      const d0 = P(XE - 170, yr2(XE) - 170), d1 = P(xs, ya);
      out.push(h.fleche(`M ${d0.join(' ')} L ${d1.join(' ')}`, h.a.detail));
      // des mottes qui tombent
      for (const [mx, myy, rr, k] of [[XE - 200, yr2(XE) - 330, 70, 0.4], [XE - 120, yr2(XE) - 540, 55, 1.9]]) {
        const pts = [];
        for (let i = 0; i < 6; i++) {
          const an = i * Math.PI / 3 + k, q = rr * (0.75 + 0.25 * Math.sin(2 * i + k));
          pts.push(P(mx + q * Math.cos(an), myy + 0.8 * q * Math.sin(an)));
        }
        out.push(chemin(pts, fond(h.a.hachure('neige', 'detail')), true));
      }
      const e0 = P(xs - 90, yo(xs - 90) + DECK + 150), e1 = P(600, yo(600) + 150);
      out.push(h.fleche(`M ${e0.join(' ')} L ${e1.join(' ')}`, h.a.detail));
      neige = { plaque: P(XE - 20, yr2(XE) + 60) };
    }

    let baril = null;
    if (o.barils) {
      const { XB } = G;
      // le baril, coupé par le milieu : la tôle, l'eau, l'air sous le bouchon
      out.push(chemin(Pl([[XB, 0], [XB + BAR.l, 0], [XB + BAR.l, BAR.h], [XB, BAR.h]]), blanc(h.a.contour), true));
      const NIV = BAR.h - 75;
      out.push(chemin(Pl([[XB + 14, 14], [XB + BAR.l - 14, 14], [XB + BAR.l - 14, NIV], [XB + 14, NIV]]), h.a.hachure('eau', 'aucun'), true));
      out.push(h.ligne(...P(XB + 14, NIV), ...P(XB + BAR.l - 14, NIV), h.a.detail));
      // les deux cercles de roulement
      for (const yc of [BAR.h / 3, 2 * BAR.h / 3]) {
        for (const [xc, sg] of [[XB, -1], [XB + BAR.l, 1]]) {
          const [cx, cy] = P(xc, yc), rr = 22 * s;
          out.push(h.path(`M ${cx} ${r1(cy - rr)} A ${r1(rr)} ${r1(rr)} 0 0 ${sg > 0 ? 1 : 0} ${cx} ${r1(cy + rr)}`, h.a.arete));
        }
      }
      // le bouchon, dans le couvercle
      out.push(chemin(Pl([[XB + 90, BAR.h - 22], [XB + 170, BAR.h - 22], [XB + 170, BAR.h + 14], [XB + 90, BAR.h + 14]]), h.a.plein, true));
      // la tablette sur les barils, et une caissette de semis
      const YT = BAR.h + 14;
      out.push(chemin(Pl([[XB - 20, YT], [XW, YT], [XW, YT + 45], [XB - 20, YT + 45]]), fond(h.a.hachure('bois', 'arete')), true));
      const c0 = XB + 50, c1 = XB + 470, yc0 = YT + 45, yc1 = yc0 + 90;
      out.push(chemin(Pl([[c0, yc0 + 70], [c1, yc0 + 70], [c1, yc0], [c0, yc0]]), fond(h.a.hachure('terre', 'aucun')), true));
      out.push(chemin(Pl([[c0, yc1], [c0, yc0], [c1, yc0], [c1, yc1]]), h.a.arete));
      for (let k = 0; k < 6; k++) {
        const xp = c0 + 50 + k * 64, yb = yc0 + 70;
        const [bx, by] = P(xp, yb), tp = P(xp, yb + 120);
        out.push(h.ligne(bx, by, tp[0], tp[1], h.a.detail));
        out.push(h.ellipse(tp[0] - 2.6, tp[1] + 0.5, 2.6, 1.2, h.a.detail));
        out.push(h.ellipse(tp[0] + 2.6, tp[1] + 0.5, 2.6, 1.2, h.a.detail));
      }
      baril = { milieu: P(XB + BAR.l / 2, BAR.h * 0.42), air: P(XB + 300, BAR.h - 38), tablette: P(XB - 5, YT + 22) };
      // La charte : le point à contrôler, l'air laissé sous le bouchon (plein presque à ras, pas à ras)
      out.push(h.controle(...baril.air, 9));
    }

    return {
      svg: out.join('\n'), P, s,
      cibles: {
        auvent: P((XA + XW) / 2 - 60, (yi((XA + XW) / 2 - 60) + yo((XA + XW) / 2 - 60)) / 2),
        vitrage: P(420, (yi(420) + yo(420)) / 2),
        isolant: P(-ISO / 2, -380),
        mur: P(XW + EPM / 2, 1150),
        fenetre: P(XW + 60, (FEN[0] + FEN[1]) / 2),
        trappe: P(XW + 20, (TRAP[0] + TRAP[1]) / 2),
        bas: bas ? P(-ISO - 20, bas[0] + 60) : null,
        haut: XH ? P(XH[0] + 60, yo(XH[0] + 60) + 150) : null,
        ...(baril || {}), ...(neige || {}),
      },
    };
  };

  return { G, yi, yo, T50, C50, S50, repere, soleil, coupe, blanc, fond, chemin };
}

module.exports = (h) => {
  const S = serre(h);
  const { G, yi, yo, repere, soleil, coupe, blanc, fond, chemin } = S;

  // ── Vue 1 : la coupe nord-sud, prise au milieu d'un baril
  const vueCoupe = z => {
    const c = coupe(z, { xmin: -2000, xmax: 3500, ymin: -700, ymax: 3600, barils: true, neige: true, fenetre: 'ferme' });
    const { P } = c;
    const out = [c.svg];
    // le soleil de midi aux équinoxes, à 40° : il tombe d'équerre sur le vitrage, puis sur les barils
    const d = [Math.cos(40 * RAD), -Math.sin(40 * RAD)];
    const U = [Math.cos(50 * RAD), Math.sin(50 * RAD)];
    const impacts = [350, 800].map(sv => [20 + sv * U[0], yo(20 + sv * U[0])]);
    for (const [xi, yiI] of impacts) {
      const a = P(xi - 1500 * d[0], yiI - 1500 * d[1]), b = P(xi - 30 * d[0], yiI - 30 * d[1]);
      out.push(h.fleche(`M ${a.join(' ')} L ${b.join(' ')}`, h.a.detail));
      // dedans : jusqu'à la face du baril
      const x2 = xi + 150 * d[0], y2 = yiI + 150 * d[1];
      const k = (G.XB - 25 - x2) / d[0];
      const e = P(x2, y2), f = P(x2 + k * d[0], y2 + k * d[1]);
      out.push(h.fleche(`M ${e.join(' ')} L ${f.join(' ')}`, h.a.fin));
    }
    const [xi, yiI] = impacts[1];
    const q = 110;
    out.push(chemin(Pl3(P, [[xi + q * U[0], yiI + q * U[1]], [xi + q * U[0] - q * d[0], yiI + q * U[1] - q * d[1]], [xi - q * d[0], yiI - q * d[1]]]), h.a.fin));
    const so = P(xi - 2150 * d[0], yiI - 2150 * d[1]);
    out.push(soleil(...so));
    // la cote de l'angle : 50° entre l'horizontale et le dessous du vitrage
    const O = [40, 540], ra = 450;
    out.push(h.ligne(...P(...O), ...P(O[0] + ra + 120, O[1]), h.a.fin));
    const arc = [];
    for (let i = 0; i <= 20; i++) { const an = 50 * RAD * i / 20; arc.push(P(O[0] + ra * Math.cos(an), O[1] + ra * Math.sin(an))); }
    out.push(chemin(arc, h.a.detail));
    const lab = P(O[0] + 290 * Math.cos(24 * RAD), O[1] + 290 * Math.sin(24 * RAD));
    out.push(h.texte(lab[0] + 2, lab[1] + 4, '50°', { lisere: true }));
    // la cote de l'isolant : 600 mm sous le sol
    out.push(h.ligne(...P(-G.ISO - 10, G.ISO_BAS), ...P(-520, G.ISO_BAS), h.a.fin));
    out.push(h.ligne(...P(-G.ISO - 10, 0), ...P(-520, 0), 'fill="none" stroke="#fff" stroke-width="0"'));
    out.push(h.cote(...P(-450, 0), ...P(-450, G.ISO_BAS), '600 mm', { cote: 'gauche' }));
    return { svg: out.join('\n'), c };
  };
  function Pl3(P, pts) { return pts.map(p => P(...p)); }

  // ── Vue 2 : vue de dessus, coupée au-dessus du muret ; le nord en haut
  const LONG = 3900;                                         // longueur de la serre au dessin
  const cx = i => G.KW + 39 + G.BAR.l / 2 + i * (G.BAR.l + 50);
  const vuePlan = z => {
    const R = repere(z, -800, LONG + G.KW + 800, -2250, 800, 4);
    const { P, Pl } = R;
    const out = [];
    const D = G.XW, K = G.KW, I = G.ISO, XT = LONG + K;       // XT : face est du mur est
    // le mur du chalet, rompu aux deux bouts
    out.push(chemin(Pl([[-750, 0], [XT + 750, 0], [XT + 750, G.EPM], [-750, G.EPM]]), fond(h.a.hachure('bois', 'aucun')), true));
    out.push(h.ligne(...P(-750, 0), ...P(XT + 750, 0), h.a.contour));
    out.push(h.ligne(...P(-750, G.EPM), ...P(XT + 750, G.EPM), h.a.arete));
    for (const xb of [-750, XT + 750]) {
      const [a, b] = [P(xb, -60), P(xb, G.EPM + 60)];
      const m = (a[1] + b[1]) / 2;
      out.push(h.path(`M ${a[0]} ${a[1]} L ${a[0]} ${r1(m + 4)} L ${r1(a[0] - 4)} ${r1(m + 1)} L ${r1(a[0] + 4)} ${r1(m - 2)} L ${a[0]} ${r1(m - 5)} L ${b[0]} ${b[1]}`, h.a.detail));
    }
    // les trois murs de la serre, coupés, et l'isolant qui les enveloppe
    const bande = (pts, t) => out.push(chemin(Pl(pts), fond(h.a.hachure(t, 'arete')), true));
    bande([[-I, -D - I], [XT + I, -D - I], [XT + I, 0], [XT, 0], [XT, -D], [0, -D], [0, 0], [-I, 0]], 'isolant');
    bande([[0, -D], [XT, -D], [XT, 0], [XT - K, 0], [XT - K, -D + K], [K, -D + K], [K, 0], [0, 0]], 'bois');
    // les barils coupés : pleins d'eau
    for (let i = 0; i < 6; i++) {
      const [x, y] = P(cx(i), -20 - G.BAR.l / 2), r = G.BAR.l / 2 * R.s;
      out.push(h.cercle(x, y, r, h.a.blanc), h.cercle(x, y, r, h.a.hachure('eau', 'contour')));
    }
    // la tablette, au-dessus du plan de coupe
    out.push(chemin(Pl([[K + 20, 0], [XT - K - 20, 0], [XT - K - 20, -G.BAR.l - 40], [K + 20, -G.BAR.l - 40]]), h.a.cache, true));
    // le trait de la coupe (vue 1), au milieu du troisième baril ; on regarde vers l'ouest
    const xc = cx(2);
    out.push(h.ligne(...P(xc, 620), ...P(xc, -2080), 'fill="none" stroke="#1A1A1A" stroke-width="0.7" stroke-dasharray="14 3 2 3"'));
    for (const yc of [620, -2080]) out.push(h.fleche(`M ${P(xc, yc).join(' ')} L ${P(xc - 520, yc).join(' ')}`, h.a.arete));
    return { svg: out.join('\n'), P, s: R.s };
  };

  // ── Vue 3 : le vitrage double, coupé en travers des chevrons ; le dehors en haut
  const vueVitrage = z => {
    const R = repere(z, -150, 750, -150, 240, 4);
    const { P, Pl } = R;
    const out = [];
    const CH = 38, CV = 89, LT = 19;
    for (const x0 of [0, 600]) {
      out.push(chemin(Pl([[x0 - CH / 2, 0], [x0 + CH / 2, 0], [x0 + CH / 2, CV], [x0 - CH / 2, CV]]), fond(h.a.hachure('bois', 'arete')), true));
      out.push(chemin(Pl([[x0 - CH / 2, CV + 3], [x0 + CH / 2, CV + 3], [x0 + CH / 2, CV + 3 + LT], [x0 - CH / 2, CV + 3 + LT]]), fond(h.a.hachure('bois', 'arete')), true));
      out.push(chemin(Pl([[x0 - CH / 2, -3], [x0 + CH / 2, -3], [x0 + CH / 2, -3 - LT], [x0 - CH / 2, -3 - LT]]), fond(h.a.hachure('bois', 'arete')), true));
    }
    // les deux épaisseurs de plastique, pincées sous les lattes
    const drap = y => h.path(`M ${P(-130, y).join(' ')} L ${P(-CH / 2, y).join(' ')} L ${P(CH / 2, y).join(' ')} L ${P(600 - CH / 2, y).join(' ')} L ${P(600 + CH / 2, y).join(' ')} L ${P(730, y).join(' ')}`, 'fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-linecap="butt"');
    out.push(drap(CV + 1.5), drap(-1.5));
    // les bouts, rompus
    for (const xb of [-130, 730]) out.push(h.ligne(...P(xb, -40), ...P(xb, CV + 40), h.a.fin));
    return { svg: out.join('\n'), P, s: R.s, CV };
  };

  const memo = {};
  const vue = (id, f) => z => { const k = `${id}:${z.l}x${z.h}`; if (!memo[k]) memo[k] = f(z); return memo[k]; };
  const vC = vue('coupe', vueCoupe), vP = vue('plan', vuePlan), vV = vue('vitrage', vueVitrage);

  return {
    ref: '97-05a',
    titre: 'La serre adossée au mur sud du chalet',
    desc: 'En coupe nord-sud : une serre appuyée contre le mur sud du chalet, son vitrage double incliné à 50° de l’horizontale, qui reçoit d’équerre le soleil de midi de mars et de septembre ; en haut, contre le mur, un auvent de planches et de tôle reçoit la neige qui tombe du toit du chalet et la fait glisser ; au pied du mur, des barils d’eau foncés et fermés, avec de l’air sous le bouchon, portent la tablette de semis ; le muret du pied est isolé jusqu’à 600 mm sous le sol. Vue de dessus : la rangée de barils contre le mur, l’isolant sur les trois murs de la serre. Détail : deux épaisseurs de plastique tendues dessus et dessous les chevrons, avec une lame d’air entre les deux.',
    format: 'pleine',
    disposition: [['coupe'], ['plan', 'vitrage']],
    hauteurs: [3.3, 1],
    vues: {
      coupe: {
        titre: 'En coupe, du sud au nord',
        dessin: z => vC(z).svg,
        renvois: z => {
          const c = vC(z).c.cibles, P = vC(z).c.P;
          return [
            { n: 1, rond: P(300, 3150), cible: c.auvent, texte: 'auvent solide, sous la chute de neige' },
            { n: 2, rond: P(-1000, 650), cible: c.vitrage, texte: 'vitrage double : fenêtres ou plastique' },
            { n: 3, rond: P(620, 250), cible: c.milieu, texte: 'baril de 200 L d’eau, foncé, fermé' },
            { n: 4, rond: P(760, 690), cible: c.air, texte: 'air sous le bouchon : la glace gonfle' },
            { n: 5, rond: P(930, 1250), cible: c.tablette, texte: 'tablette de semis, posée sur les barils' },
            { n: 6, rond: P(500, -470), cible: c.isolant, texte: 'isolant du bas des murs' },
          ];
        },
      },
      plan: {
        titre: 'Vue de dessus, l’axe long est-ouest',
        dessin: z => vP(z).svg,
        renvois: z => {
          const { P } = vP(z);
          return [
            { n: 7, rond: P(cx(4), -1150), cible: P(cx(4) + 60, -20 - G.BAR.l / 2 - 120), texte: 'barils en rangée contre le mur du chalet' },
            { n: 8, rond: P(-600, -1300), cible: P(-G.ISO / 2, -1000), texte: 'isolant sur les trois murs de la serre' },
          ];
        },
      },
      vitrage: {
        titre: 'Le vitrage, en travers des chevrons',
        dessin: z => vV(z).svg,
        renvois: z => {
          const { P, CV } = vV(z);
          return [
            { n: 9, rond: P(300, 205), cible: P(300, CV + 1.5), texte: 'plastique dessus, tendu sur les chevrons' },
            { n: 10, rond: P(170, 45), cible: P(300, 45), texte: 'lame d’air : moitié moins de perte' },
            { n: 11, rond: P(300, -115), cible: P(300, -1.5), texte: 'second plastique, sous les chevrons' },
          ];
        },
      },
    },
  };
};

module.exports.serre = serre;
