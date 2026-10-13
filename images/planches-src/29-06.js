// Planche 29-06 — Mettre au sein : la bonne prise et la ratée.
// Chapitre 29, section J, étape 79 (et l'encadré « Le lait suit la demande ») : la mère adossée ;
// la main sur le haut du dos du bébé, jamais sur sa tête (un bébé à qui on pousse la tête
// recule) ; le menton touche le sein, le mamelon se pose sur la lèvre du haut ; on attend que la
// bouche s'ouvre très grand, et à ce moment on l'amène au sein, le mamelon pointé vers le palais.
// Bonne prise : une grande partie de l'aréole dans la bouche, les lèvres retournées, le menton
// collé au sein, le nez dégagé. La prise ratée : le bébé tient le bout du sein au lieu d'une
// grande bouchée d'aréole.
// Rien ne se construit : aucune cote. Le chapitre ne donne aucune mesure du sein ni du bébé.
// Tout est de profil, le bébé tourné vers la gauche, la mère à gauche (son sein ; adossée, elle
// est penchée de 15° vers l'arrière). Le bébé est dessiné à la main (la bibliothèque n'a pas de
// nouveau-né), sur la tête de la planche 29-05 retournée : 124 de l'occiput au nez, 131 du sommet
// au menton, en mm ; le corps est emmailloté dans une couverture jusqu'au cou. La main de la mère
// est le modèle calqué s03-dos-l5 (s03 sans les plis de paume, vue du dos), à la même taille.
// Ce qui est dans la bouche (le sein étiré, le bout du mamelon) est en tireté.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => (Math.round(v * 10) / 10).toString();
  const RAD = Math.PI / 180;
  const tourne = (p, deg) => { const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const mil = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const lon = a => Math.hypot(a[0], a[1]);
  const uni = a => { const n = Math.hypot(a[0], a[1]); return [a[0] / n, a[1] / n]; };
  const ang = a => Math.atan2(a[1], a[0]) / RAD;
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');

  // courbe lisse (Catmull-Rom) par des points déjà dans la vue ; suite : sans le M de départ
  const lisse = (P, ferme = false, suite = false) => {
    const n = P.length, g = i => ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))];
    let d = suite ? '' : `M${pt(P[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${pt(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  // la même courbe, échantillonnée en polyligne
  const echant = (P, pas = 10) => {
    const n = P.length, g = i => P[Math.max(0, Math.min(n - 1, i))], out = [P[0]];
    for (let i = 0; i < n - 1; i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      for (let j = 1; j <= pas; j++) {
        const t = j / pas, u = 1 - t;
        out.push([0, 1].map(q => u * u * u * p1[q] + 3 * u * u * t * c1[q] + 3 * u * t * t * c2[q] + t * t * t * p2[q]));
      }
    }
    return out;
  };
  const poly = P => `M${P.map(pt).join(' L')} Z`;
  const dedans = (P, q) => {
    let c = false;
    for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
      if (((P[i][1] > q[1]) !== (P[j][1] > q[1])) && (q[0] < (P[j][0] - P[i][0]) * (q[1] - P[i][1]) / (P[j][1] - P[i][1]) + P[i][0])) c = !c;
    }
    return c;
  };
  const distPoly = (q, P) => {
    let d = Infinity;
    for (let i = 0; i < P.length - 1; i++) {
      const a = P[i], b = P[i + 1], ab = sub(b, a), t = Math.max(0, Math.min(1, ((q[0] - a[0]) * ab[0] + (q[1] - a[1]) * ab[1]) / (ab[0] ** 2 + ab[1] ** 2 || 1)));
      d = Math.min(d, lon(sub(q, add(a, mul(ab, t)))));
    }
    return d;
  };
  // un pointillé serré dans un contour (déjà dans la vue) : l'aréole
  const pointille = (P, pas, r, garde = () => true) => {
    const xs = P.map(p => p[0]), ys = P.map(p => p[1]);
    let d = '', rang = 0;
    for (let y = Math.min(...ys) + pas / 2; y < Math.max(...ys); y += pas * 0.866, rang++) {
      for (let x = Math.min(...xs) + (rang % 2 ? pas / 2 : 0); x < Math.max(...xs); x += pas) {
        if (dedans(P, [x, y]) && garde([x, y])) d += `M${f(x - r)} ${f(y)}a${r} ${r} 0 1 0 ${f(2 * r)} 0a${r} ${r} 0 1 0 ${f(-2 * r)} 0`;
      }
    }
    return d ? h.path(d, A.plein) : '';
  };
  // cadrage : met les mm (x0..x1, y0..y1) dans la vue
  const cadre = (z, x0, x1, y0, y1, marge = 4) => {
    const k = Math.min((z.l - 2 * marge) / (x1 - x0), (z.h - 2 * marge) / (y1 - y0));
    const ox = (z.l - k * (x1 - x0)) / 2 - k * x0, oy = (z.h - k * (y1 - y0)) / 2 - k * y0;
    return { k, V: p => [ox + k * p[0], oy + k * p[1]] };
  };
  // ce qui dépasse de la vue (la mère, la couverture, le bras) est coupé au bord de la vue
  let nVue = 0;
  const decoupe = (z, contenu) => {
    const id = `vue-sein-${++nVue}`;
    return `<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu}\n</g>`;
  };

  // ─── La mère : le sein de profil, le mamelon au repère (0, 0), pointé vers la droite, puis
  // tout penché de 15° vers l'arrière (elle est adossée). Un sein plein : la pente du haut
  // presque droite, le dessous rond, le pli sous le sein, puis le ventre.
  const M = p => tourne(p, -15);
  const S_HAUT = [[-128, -330], [-127, -220], [-126, -160], [-121, -122], [-104, -92], [-80, -64], [-56, -42], [-34, -24], [-18, -11], [-9, -6]];
  const S_MAM = [[-9, -6], [-4.5, -6.5], [-1, -5], [0, -1.5], [0, 1.5], [-1, 5], [-4.5, 6.5], [-9, 6]];
  const S_BAS = [[-9, 6], [-10, 18], [-14, 32], [-20, 46], [-31, 61], [-48, 73], [-70, 79], [-94, 76], [-110, 70], [-119, 73]];
  const S_VENTRE = [[-119, 73], [-123, 86], [-125, 130], [-125, 230], [-123, 340]];
  // l'aréole : du bord du haut au bord du bas en suivant la peau, puis le demi-bord qu'on voit
  const AR_PEAU = [[-24.1, -15.9], [-18, -11], [-9, -6]];
  const AR_PEAU_B = [[-9, 6], [-10, 18], [-11.1, 21.9]];
  const AR_ARC = [[-11.1, 21.9], [-16.5, 13], [-19.8, 2], [-22, -7], [-24.1, -15.9]];
  const BAS_ECH = echant(S_BAS.map(M), 12);

  // bonne prise : seul le haut de l'aréole reste dehors, au-dessus de la lèvre du haut
  const AR_HAUT = [[-24.1, -15.9], [-18, -11], [-16, -10]];
  const AR_ARC_HAUT = [[-17.5, -8.6], [-20.5, -8], [-22.6, -10.6], [-24.1, -15.9]];
  function mere(V, { bas: basPerso = null, areoleHaut = false } = {}) {
    const P = pts => pts.map(p => V(M(p)));
    const out = [];
    const region = areoleHaut ? [...echant(P(AR_HAUT), 6), ...echant(P(AR_ARC_HAUT), 6)]
      : [...echant(P(AR_PEAU), 6), ...echant(P(AR_PEAU_B), 6), ...echant(P(AR_ARC), 6)];
    out.push(pointille(region, 2.5, 0.5));
    out.push(h.path(lisse(P(areoleHaut ? AR_ARC_HAUT.slice(1) : AR_ARC)), A.detail));
    // bas : le dessous du sein, plein et rond sous le menton (bonne prise)
    const bas = basPerso || S_BAS.map(M);
    // le fond blanc : le sein passe devant ce qui est derrière lui (le haut de la couverture)
    const fond = [...echant(P(S_HAUT), 6), ...echant(P(S_MAM), 4), ...echant(bas.map(V), 6), ...echant(P(S_VENTRE), 6), V(M([-400, 340])), V(M([-400, -330]))];
    out.unshift(h.path(poly(fond), A.blanc));
    out.push(h.path(lisse(P(S_HAUT)) + lisse(P(S_MAM), false, true) + lisse(bas.map(V), false, true), A.arete));
    out.push(h.path(lisse(P(S_VENTRE)), A.arete));
    return out.join('\n');
  }

  // ─── La tête du nouveau-né, de profil, tournée vers la gauche, repère à l'oreille, en mm.
  // De la nuque, par le sommet du crâne et le nez, jusque sous le nez.
  const CRANE = [[38, 46], [52, 26], [58, -2], [50, -40], [24, -67], [-8, -74], [-40, -62], [-57, -34], [-61, -14],
    [-58.5, -0.5], [-61.5, 5.5], [-66.5, 12.5], [-65, 18], [-59.5, 21]];
  const NUQUE = [38, 46], GORGE = [-28, 58], NEZ = [-66.5, 12.5];
  const J = [-6, 10];                                  // la charnière de la mâchoire
  const rotJ = (p, a) => add(J, tourne(sub(p, J), -a));
  // les bouches : la lèvre du haut (de sous le nez à son bord), la lèvre du bas jusque sous le
  // menton (repère de la mâchoire fermée ; elle tourne de jaw autour de J), K : le coin
  const BOUCHES = {
    repos: { K: [-52.5, 33],
      haut: [[-59.5, 21], [-61.5, 24.8], [-63.8, 28.3], [-62.8, 31], [-60, 32]],
      bas: [[-60, 33.6], [-62.6, 35.4], [-62.4, 38.8], [-58.6, 42.3], [-55, 44.3], [-56, 48.8], [-51.5, 54], [-41, 56.5]] },
    grande: { K: [-40, 35],
      haut: [[-59.5, 21], [-62, 24.3], [-65, 27.3], [-65.4, 30.2], [-62.5, 31.6]],
      bas: [[-60.5, 33.8], [-64, 35], [-64.6, 38.6], [-60, 42.8], [-55, 44.6], [-56, 49], [-51.5, 54], [-41, 56.5]] },
    // lèvres retournées : celle du haut roulée vers le nez, celle du bas vers le menton
    bonne: { K: [-52, 33],
      haut: [[-59.5, 21], [-62.8, 23.2], [-66.2, 23.6], [-69.8, 24.6], [-71, 27.6]],
      bas: [[-69.5, 33.2], [-69.8, 37.2], [-66.5, 40.6], [-61, 42], [-56.8, 44], [-57.5, 49], [-52, 54], [-41, 56.5]] },
    // lèvres en bec, serrées sur le bout
    ratee: { K: [-54, 33],
      haut: [[-59.5, 21], [-62.5, 24], [-66.5, 27.2], [-69, 30.2], [-68.2, 32.4]],
      bas: [[-68, 35.4], [-69.3, 37.4], [-67, 40.6], [-60, 43.2], [-55.5, 45], [-56, 49.3], [-51.5, 54], [-41, 56.5]] },
  };
  const bouche = (etat, jaw) => {
    const B = BOUCHES[etat], n = B.bas.length;
    return { haut: B.haut, bas: B.bas.map((p, i) => rotJ(p, i === n - 1 ? jaw * 0.75 : jaw)), K: rotJ(B.K, jaw * 0.4), jaw };
  };
  // le sein étiré dans la bouche, bonne prise : le dessus longe le palais jusqu'au fond
  const TETINE_H = [[-60, 24.8], [-50, 23.6], [-41, 24], [-35.5, 26.6]];
  const TETINE_B = [[-37.5, 31.5], [-43, 41]];

  // la pose de la tête : S(p) = P + rotation th de (p - ancre)
  const pose = (ancre, P, th) => p => add(P, tourne(sub(p, ancre), th));

  // ─── Le corps : l'axe du tronc U (vers les fesses), N vers le dos. Emmailloté : la
  // couverture fait WC(s) de demi-épaisseur, le bord roulé autour du cou.
  const U = uni([-0.08, 1]), N = [U[1], -U[0]];
  const WC_T = [[-6, 36], [4, 47], [16, 53], [40, 56], [120, 57], [200, 56], [300, 54]];
  const WC = s => { for (let i = 0; i < WC_T.length - 1; i++) if (s <= WC_T[i + 1][0]) { const t = Math.max(0, (s - WC_T[i][0]) / (WC_T[i + 1][0] - WC_T[i][0])); return WC_T[i][1] + t * (WC_T[i + 1][1] - WC_T[i][1]); } return WC_T[WC_T.length - 1][1]; };
  const origine = S => add(mil(S(GORGE), S(NUQUE)), mul(U, 12));
  const tronc = S => {
    const O = origine(S);
    return { O, Q: (s, c) => add(add(O, mul(U, s)), mul(N, c)), Fq: s => add(add(O, mul(U, s)), mul(N, -WC(s))), Bq: s => add(add(O, mul(U, s)), mul(N, WC(s))) };
  };

  // le bébé : cou, couverture jusqu'à sFin (coupée par le bord de la vue), tête
  function bebe(V, S, b, { sFin = 120 } = {}) {
    const out = [];
    const T = tronc(S), { Q, Fq, Bq } = T;
    const Vp = pts => pts.map(V);
    // le cou : de sous le menton et de la nuque jusque sous le bord de la couverture
    const devantCou = [S(b.bas[b.bas.length - 1]), Q(-2, -30), Q(8, -32)];
    const dosCou = [S(NUQUE), Q(-4, 30), Q(8, 32)];
    out.push(h.path(poly([...echant(Vp(devantCou), 6), ...echant(Vp(dosCou), 6).reverse()]), A.blanc));
    out.push(h.path(lisse(Vp(devantCou)), A.arete));
    out.push(h.path(lisse(Vp(dosCou)), A.arete));
    // la couverture : le bord roulé autour du cou, les deux flancs, quelques plis
    const pas = [16, 40, 80, 120, 160, 200, 240, 280, 320].filter(s => s < sFin);
    const col = [Fq(-2), Q(-7, -28), Q(-9, 0), Q(-8, 28), Bq(-4)];
    const devant = [Fq(-2), Fq(6), ...pas.map(Fq), Fq(sFin)];
    const dos = [Bq(-4), Bq(6), ...pas.map(Bq), Bq(sFin)];
    out.push(h.path(poly([...echant(Vp(col), 8), ...echant(Vp(dos), 8), ...echant(Vp(devant), 8).reverse()]), A.blanc));
    out.push(h.path(lisse(Vp(col)), A.arete));
    out.push(h.path(lisse(Vp(devant)), A.arete));
    out.push(h.path(lisse(Vp(dos)), A.arete));
    out.push(h.path(lisse(Vp([Q(5, -47), Q(2, -24), Q(0.5, 0), Q(1.5, 24), Q(4, 48)])), A.detail));
    const plis = [[Q(8, -20), Q(40, -30), Q(90, -38)], [Q(10, 12), Q(60, 4), Q(120, -6)], [Q(9, 34), Q(70, 36), Q(150, 30)], [Q(30, -44), Q(70, -48)]];
    for (const p of plis) out.push(h.path(lisse(Vp(p)), A.fin));
    return { svg: out.join('\n'), ...T };
  }

  // la tête : fond blanc, bouche ouverte (en noir) ou bouche au sein, trait, oreille, œil, narine
  function teteDessin(V, S, b, { ouverte = false } = {}) {
    const out = [];
    const T = pts => pts.map(p => V(S(p)));
    const fond = [...echant(T(CRANE), 8), ...echant(T(b.haut), 6), ...echant(T(b.bas), 6)];
    out.push(h.path(poly(fond), A.blanc));
    if (ouverte) {
      const h0 = b.haut[b.haut.length - 1], b0 = b.bas[0];
      out.push(h.path(lisse(T([h0, mil(h0, b.K), b.K])) + lisse(T([b.K, mil(b.K, b0), b0]), false, true) + ' Z', A.plein));
      out.push(h.path(lisse(T([h0, b.K, b0])), A.detail));
    }
    out.push(h.path(lisse(T(CRANE)), A.arete));
    out.push(h.path(lisse(T(b.haut)), A.arete));
    out.push(h.path(lisse(T(b.bas)), A.arete));
    // l'oreille, l'œil fermé, l'aile du nez
    out.push(h.path(lisse(T([[-3, -15], [8, -19.5], [17, -8], [16, 5], [8, 15.5], [0, 18.5], [-3, 15]])), A.detail));
    out.push(h.path(lisse(T([[1, -9], [8, -8], [9.5, 1], [4, 8]])), A.fin));
    out.push(h.path(lisse(T([[-52.5, -12], [-46.5, -8.4], [-40, -10.8]])), A.detail));
    for (const [a, c] of [[[-50.5, -10.2], [-52, -7.6]], [[-46.8, -8.5], [-47.8, -5.8]], [[-43, -9], [-43.6, -6.4]]]) out.push(h.path(`M${pt(V(S(a)))} L${pt(V(S(c)))}`, A.fin));
    out.push(h.path(lisse(T([[-61, 19.2], [-56, 19], [-55, 14], [-59, 12.2]])), A.fin));
    return out.join('\n');
  }

  // ─── Approcher : le menton touche le sein, le mamelon sur la lèvre du haut. La tête se
  // renverse jusqu'à ce que le menton touche (cherché, pas deviné).
  const B_REPOS = bouche('repos', 7), B_GRANDE = bouche('grande', 27);
  const P_LEVRE = M([-1.2, 6.6]);
  const BAS_POLY = [...BAS_ECH, [-300, 150], [-300, 0]];
  const approche = (() => {
    const chin = th => {
      const S = pose(B_REPOS.haut[2], P_LEVRE, th);
      return Math.min(...echant(B_REPOS.bas.slice(3).map(S), 6).map(q => (dedans(BAS_POLY, q) ? -1 : 1) * distPoly(q, BAS_ECH)));
    };
    let th = 5;
    while (th < 70 && chin(th) > 0.3) th += 0.5;
    return { th, S: pose(B_REPOS.haut[2], P_LEVRE, th) };
  })();
  const S_APP = approche.S, T_APP = tronc(S_APP);
  // la main de la mère, vue du dos, à plat sur le haut du dos : les doigts vers le cou, le
  // bout des doigts sous le bord de la couverture, le pouce vers l'avant ; le poignet en bas
  const D_DOIGTS = uni(add(mul(U, -1), mul(N, -0.36)));
  const BOUT = T_APP.Q(24, 20);
  const PAUME = add(BOUT, mul(D_DOIGTS, -106));
  // la flèche : on amène le bébé au sein, par la main
  // contre le dos, sous la main, longue : c'est tout le bébé qui avance vers le sein
  const FL0 = add(T_APP.Bq(235), mul(N, 52)), FL1 = add(add(T_APP.Bq(115), mul(N, 46)), [-40, -12]);

  // ─── Bonne prise : les deux lèvres posées sur l'aréole, loin du mamelon, plus bas que haut ;
  // la mâchoire s'ouvre d'autant (cherché) ; le sein, mou, se gonfle contre le menton.
  const PU = M([-16, -10]), PL = M([-12.5, 26.5]);
  const bonne = (() => {
    const cu = BOUCHES.bonne.haut[BOUCHES.bonne.haut.length - 1];
    let jaw = 5;
    while (jaw < 40 && lon(sub(rotJ(BOUCHES.bonne.bas[0], jaw), cu)) < lon(sub(PL, PU))) jaw += 0.25;
    const b = bouche('bonne', jaw);
    const th = ang(sub(PL, PU)) - ang(sub(b.bas[0], cu));
    const S = pose(cu, PU, th);
    // la bosse du sein : jusqu'à 2 mm dans le menton
    const menton = S(b.bas[5]);
    let xs = null;
    for (let i = 0; i < BAS_ECH.length - 1; i++) {
      const a = BAS_ECH[i], c = BAS_ECH[i + 1];
      if ((a[1] - menton[1]) * (c[1] - menton[1]) <= 0) { xs = a[0] + (c[0] - a[0]) * (menton[1] - a[1]) / (c[1] - a[1] || 1); break; }
    }
    // le dessous du sein : il part du menton, qui s'y enfonce, et descend en une seule courbe
    // ronde, sans creux, jusqu'au pli sous le sein (le sein plein, poussé par le menton)
    const C = add(menton, [-1, 0]);
    // un quart d'ellipse : du menton (à droite) jusqu'au bas du sein, hors de la vue à gauche
    const RX = C[0] + 60, RY = 52, CX = -60, CY = C[1];
    const dessous = [0, 15, 30, 45, 60, 75, 90].map(t => [CX + RX * Math.cos(t * RAD), CY + RY * Math.sin(t * RAD)]);
    dessous.push([-85, CY + RY - 1], [-110, CY + RY - 4]);
    const bas = [M([-9, 6]), M([-10, 18]), PL, ...dessous];
    return { b, S, th, bas, dessous, xs };
  })();

  // ─── Ratée : les lèvres en bec sur le bout du mamelon ; la tête droite, le menton loin.
  const PU_R = M([-4.5, -6.4]), PL_R = M([-4.5, 6.4]);
  const ratee = (() => {
    const cu = BOUCHES.ratee.haut[BOUCHES.ratee.haut.length - 1];
    let jaw = 0;
    while (jaw < 20 && lon(sub(rotJ(BOUCHES.ratee.bas[0], jaw), cu)) < 0.85 * lon(sub(PL_R, PU_R))) jaw += 0.25;
    const b = bouche('ratee', jaw);
    const th = ang(sub(PL_R, PU_R)) - ang(sub(b.bas[0], cu));
    return { b, S: pose(mil(cu, b.bas[0]), mil(PU_R, PL_R), th), th };
  })();

  if (process.env.DEBUG_2906) {
    const HAUT_ECH = echant([...S_HAUT, ...S_MAM].map(M), 12);
    const nez = S => distPoly(S(NEZ), HAUT_ECH);
    console.log('approche th', approche.th, 'nez→sein', f(nez(S_APP)), 'O', T_APP.O.map(f), 'bout', BOUT.map(f), 'paume', PAUME.map(f));
    console.log('bonne jaw', bonne.b.jaw, 'th', f(bonne.th), 'nez→sein', f(nez(bonne.S)), 'xs', bonne.xs);
    console.log('ratee jaw', ratee.b.jaw, 'th', f(ratee.th), 'menton→sein', f(distPoly(ratee.S(ratee.b.bas[5]), BAS_ECH)), 'nez', f(nez(ratee.S)));
    for (const [nm, S] of [['app', S_APP], ['bonne', bonne.S], ['ratee', ratee.S]]) console.log(nm, 'sommet', S([-8, -74]).map(f), 'occiput', S([58, -2]).map(f), 'nuque', S(NUQUE).map(f), 'gorge', S(GORGE).map(f));
  }

  // ─── Les vues
  const CADRE_A = [-98, 172, -70, 300];
  const CADRE_P = [-72, 128, -110, 96];
  const vueApproche = (b, fleche) => z => {
    const { k, V } = cadre(z, ...CADRE_A);
    const out = [bebe(V, S_APP, b, { sFin: 330 }).svg, mere(V), teteDessin(V, S_APP, b, { ouverte: true })];
    const p = V(PAUME);
    // modèle s03-dos-l5 (la main relâchée de s03, sans les plis de paume : vue du dos) retourné et en
    // miroir : à plat sur le dos du bébé, les doigts vers la nuque, le pouce à gauche, l'avant-bras
    // qui descend et sort du cadre ; l'ancre, le milieu de la paume (106 mm du bout du majeur)
    out.push(F.modele('s03-dos-l5', { x: p[0], y: p[1], ancre: [84, 101], angle: ang(D_DOIGTS) - 90, miroir: true, echelle: 1.19 * k,
      masquer: [[0, 0, 125, 14]], bras: { a: [59.1, 14], a0: [57.9, 26], b: [112.7, 14], b0: [110.7, 26], bord: z } }));
    if (fleche) out.push(h.fleche(`M${pt(V(FL0))} L${pt(V(FL1))}`, A.arete));
    return decoupe(z, out.join('\n'));
  };
  const posA = (z, p) => cadre(z, ...CADRE_A).V(p);
  const posP = (z, p) => cadre(z, ...CADRE_P).V(p);

  const vueBonne = z => {
    const { V } = cadre(z, ...CADRE_P);
    const S = bonne.S, b = bonne.b;
    const out = [bebe(V, S, b).svg, mere(V, { bas: bonne.bas, areoleHaut: true }), teteDessin(V, S, b)];
    // dans la bouche, en tireté : le sein étiré, le mamelon au fond, pointé vers le palais
    const tet = [b.haut[b.haut.length - 1], ...TETINE_H, ...TETINE_B.map(p => rotJ(p, b.jaw * 0.5)), b.bas[0]];
    out.push(h.path(lisse(tet.map(p => V(S(p)))), A.cache));
    // le dessous du sein, devant le menton : il part du menton enfoncé et reprend sa courbe
    // ronde jusqu'au pli
    const devant = bonne.dessous;
    const derniere = devant[devant.length - 1];
    out.push(h.path(poly([...echant(devant, 10), [-300, derniere[1]], [-300, devant[0][1]]].map(V)), A.blanc));
    out.push(h.path(lisse(devant.map(V)), A.arete));
    return decoupe(z, out.join('\n'));
  };
  const vueRatee = z => {
    const { V } = cadre(z, ...CADRE_P);
    const S = ratee.S, b = ratee.b;
    const out = [bebe(V, S, b).svg, mere(V), teteDessin(V, S, b)];
    // le bout du mamelon, seul dans la bouche, pincé entre les lèvres
    const bout = [PU_R, M([-2, -5.2]), M([-0.4, -2]), M([-0.4, 2]), M([-2, 5.2]), PL_R];
    out.push(h.path(lisse(bout.map(V)), A.cache));
    return decoupe(z, out.join('\n'));
  };

  return {
    ref: '29-06',
    titre: 'Mettre au sein : la bonne prise et la ratée',
    desc: 'Quatre vues de profil d’un nouveau-né emmailloté au sein, la mère adossée, à gauche. En haut, la mise au sein : le bébé sous le sein, la tête renversée en arrière, la main de la mère à plat sur le haut de son dos, les doigts vers le cou, rien sur la tête ; le menton touche le sein sous l’aréole (pointillée), le mamelon repose sur la lèvre du haut. À gauche la bouche encore petite ; à droite la même pose, la bouche ouverte très grand, et une flèche derrière la main : c’est le moment de l’amener au sein. En bas à gauche, la bonne prise : les deux lèvres retournées posées loin sur l’aréole, le menton enfoncé dans le sein, le nez libre ; le dessous du sein plein et rond sous le menton ; en tireté, le sein étiré au fond de la bouche, l’aréole presque toute dedans, le mamelon pointé vers le palais. En bas à droite, la prise ratée : la tête droite, les lèvres en bec sur le bout du mamelon seulement (en tireté), l’aréole entière dehors, le menton loin du sein.',
    format: 'pleine',
    disposition: [['attendre', 'amener'], ['bonne', 'ratee']],
    hauteurs: [1.4, 1],
    vues: {
      attendre: {
        titre: 'Attendre la grande bouche',
        dessin: vueApproche(B_REPOS, false),
        renvois: z => [
          { n: 1, rond: posA(z, add(PAUME, [70, -60])), cible: posA(z, add(PAUME, mul(D_DOIGTS, 50))), texte: 'la main au dos, pas la tête' },
          { n: 2, rond: posA(z, [-70, 60]), cible: posA(z, S_APP(B_REPOS.bas[5])), texte: 'le menton touche le sein' },
          { n: 3, rond: posA(z, [-62, -40]), cible: posA(z, M([-0.5, 3.5])), texte: 'mamelon sur la lèvre haute' },
        ],
      },
      amener: {
        titre: 'Puis l’amener au sein',
        dessin: vueApproche(B_GRANDE, true),
        renvois: z => [
          { n: 4, rond: posA(z, [-62, -40]), cible: posA(z, S_APP(mil(B_GRANDE.K, mil(B_GRANDE.haut[4], B_GRANDE.bas[0])))), texte: 'la bouche ouverte très grand' },
          { n: 5, rond: posA(z, add(FL0, [26, -40])), cible: posA(z, mil(FL0, FL1)), texte: 'alors, l’amener au sein' },
        ],
      },
      bonne: {
        titre: 'Bonne prise',
        dessin: vueBonne,
        renvois: z => {
          const S = bonne.S, b = bonne.b;
          return [
            { n: 6, rond: posP(z, [-66, 22]), cible: posP(z, S(rotJ([-60, 30], b.jaw * 0.5))), texte: 'une grande bouchée d’aréole' },
            { n: 7, rond: posP(z, [-64, -96]), cible: posP(z, S(b.haut[3])), texte: 'les lèvres retournées' },
            { n: 8, rond: posP(z, [-62, 74]), cible: posP(z, S(b.bas[5])), texte: 'le menton collé au sein' },
            { n: 9, rond: posP(z, [-22, -100]), cible: posP(z, S(NEZ)), texte: 'le nez dégagé' },
            { n: 10, rond: posP(z, [120, 50]), cible: posP(z, S(TETINE_H[3])), texte: 'le mamelon vers le palais' },
          ];
        },
      },
      ratee: {
        titre: 'Ratée : le bout du sein',
        dessin: vueRatee,
        renvois: z => {
          const S = ratee.S, b = ratee.b;
          return [
            { n: 11, rond: posP(z, [-52, -30]), cible: posP(z, M([-1.2, -2.5])), texte: 'le bout du sein seulement' },
            { n: 12, rond: posP(z, [-64, -80]), cible: posP(z, M([-17, -6])), texte: 'l’aréole reste dehors' },
            { n: 13, rond: posP(z, [-60, 62]), cible: posP(z, S(b.bas[5])), texte: 'le menton loin du sein' },
          ];
        },
      },
    },
  };
};
