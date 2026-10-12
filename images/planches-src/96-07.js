// Planche 96-07 — La texture à la main : le ruban et le bocal (ch. 96, § A, étapes 3 et 4, note 2 ;
// « Mesurer sans instrument »).
//
// Ce que le chapitre dit, et rien d'autre :
//   Le ruban. Une poignée de terre de la couche du dessus, mouillée goutte à goutte jusqu'à la
//   consistance d'un mastic, pressée entre le pouce et l'index en ruban. La pâte est poussée vers le
//   haut par le pouce, au-dessus de l'index, en une bande d'épaisseur égale, jusqu'à ce qu'elle casse
//   sous son propre poids. On mesure ce qui dépassait avant la cassure. (Les seuils, 2,5 et 5 cm,
//   sont une donnée : ils restent dans le texte et le tableau, pas sur le dessin.)
//   Le bocal. Pot Mason d'un litre, haut et transparent. Un quart de bocal de terre séchée, écrasée,
//   débarrassée des roches et des racines ; de l'eau jusqu'aux trois quarts ; une cuillerée à thé de
//   savon à lave-vaisselle en poudre. Fermer, secouer fort 10 à 15 minutes, poser. Marquer au crayon
//   gras sur le verre le dépôt au bout de 1 minute (le sable), au bout de 2 heures (le limon), et
//   quand l'eau s'éclaircit, en 1 à 3 jours (l'argile). Les épaisseurs donnent les proportions.
//
// Aucune cote : rien ne se construit ici. La longueur du ruban est montrée comme une mesure à
// prendre (une ligne de mesure sans chiffre, du bout de l'index à la cassure), pas comme une
// valeur. Les proportions du pot sont celles d'un pot Mason d'un litre (les mêmes que la planche
// 28-05). L'épaisseur des trois dépôts dans les bocaux est un exemple de lecture, pas une donnée :
// aucun chiffre ne l'accompagne. La main : gros plan vu du dos, le pouce en haut, coupé au
// poignet, monté avec les pièces de la bibliothèque de formes (sa pince de profil ne montre pas
// ce geste). L'épaisseur du ruban est un dessin, pas une donnée.
module.exports = (h) => {
  const N = '#1A1A1A', B = '#FFFFFF';
  const f = v => Math.round(v * 10) / 10;
  const P = p => `${f(p[0])} ${f(p[1])}`;
  const RAD = Math.PI / 180;
  const dir = a => [Math.cos(a * RAD), Math.sin(a * RAD)];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];

  // ─── les matières ────────────────────────────────────────────────────────────────────
  // sable : petits ronds ; limon : points serrés (une farine) ; argile : hachure fine en biais.
  // La terre sèche et la pâte : la hachure « terre » du livre. L'eau : ses tirets ; l'eau trouble :
  // ses tirets et des points épars.
  const DEFS = `<defs>
<pattern id="p9607-sable" width="6" height="5" patternUnits="userSpaceOnUse"><circle cx="1.6" cy="1.4" r="1.1" fill="none" stroke="${N}" stroke-width="0.5"/><circle cx="4.6" cy="3.8" r="1.1" fill="none" stroke="${N}" stroke-width="0.5"/></pattern>
<pattern id="p9607-limon" width="2.6" height="2.6" patternUnits="userSpaceOnUse"><circle cx="0.65" cy="0.65" r="0.5" fill="${N}"/><circle cx="1.95" cy="1.95" r="0.5" fill="${N}"/></pattern>
<pattern id="p9607-argile" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><line x1="0" y1="0" x2="0" y2="3" stroke="${N}" stroke-width="0.5"/></pattern>
</defs>`;
  const SABLE = `fill="url(#p9607-sable)" stroke="${N}" stroke-width="0.7" stroke-linejoin="round"`;
  const LIMON = `fill="url(#p9607-limon)" stroke="${N}" stroke-width="0.7" stroke-linejoin="round"`;
  const ARGILE = `fill="url(#p9607-argile)" stroke="${N}" stroke-width="0.7" stroke-linejoin="round"`;
  const TERRE = h.a.hachure('terre', 'detail');
  const EAU = h.a.hachure('eau', 'aucun');
  const TROUBLE = h.a.hachure('neige', 'aucun');
  const BLANC_ARETE = `fill="${B}" stroke="${N}" stroke-width="1.4" stroke-linejoin="round"`;

  // ─── la main qui fait le ruban ───────────────────────────────────────────────────────
  // Main droite vue du dos, le pouce en haut (la main tendue comme pour serrer une main), les
  // doigts vers la droite, coupée au poignet. L'index à peu près droit, l'ongle vu au bout ; les
  // trois autres doigts repliés dans la paume, on n'en voit que les jointures ; le pouce levé,
  // son coussinet appuyé sur la pâte. La motte est serrée entre le coussinet du pouce et le côté
  // de l'index ; le ruban sort sous le bout du pouce, glisse sur l'index et dépasse son bout.
  // Construite avec les pièces de la bibliothèque de formes (le même trait que ses mains), en mm
  // d'adulte, l'origine à la jointure de base de l'index.
  const I = h.formes._interne;
  const faceW = ep => [[ep[0] / 2, ep[1] / 2], [ep[1] / 2, ep[2] / 2], [ep[2] / 2, ep[3] / 2]];
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const WX = -88, COUPE = WX - 6;                                   // le poignet, et la coupe
  const PTS_I = I.plie([0, -26.5], [1, 0], [42, 21, 16], [1, 2, 2], 1);   // l'index, un peu fléchi
  const W_I = faceW([19, 16.2, 14.2, 12.2]);
  const PTS_T = I.plie([-62, -36.5], dir(-30), [44, 32, 26], [0, 22, 43], 1);   // le pouce levé, le bout qui appuie
  const W_TD = [[11, 10], [10, 9.5], [9.5, 7.5]], W_TV = [[14, 10.5], [10.5, 10], [10, 8]];
  const S_TOILE = 36;                                               // où la palmure quitte le pouce
  // les trois doigts repliés : leur première phalange, jusqu'à la jointure du milieu
  const REPLIES = [['auriculaire', [-9, 28.5], [21, 29], 16, 13.6], ['annulaire', [0, 11], [31, 11.5], 18, 15.6], ['majeur', [3, -7.5], [35, -7.5], 19.5, 16.8]];
  const mainRuban = (objet, T) => {
    const bP = I.pointBord(PTS_T, W_TD, 1, 1, 0);
    const W1 = I.pointBord(PTS_T, W_TV, 1, -1, S_TOILE), W2 = I.pointBord(PTS_I, W_I, 1, 1, 5);
    const haut = I.lisse([[COUPE, -33], [WX - 2, -32.6], bP]);
    const toile = I.lisse([...I.cubPts(W1, dir(150), W2, [1, 0.02], 7, 14, 6), W2]);
    const aur = [-7, 36.5];
    const cubital = I.lisse([aur, [-26, 37.5], [-56, 33.5], [WX, 30], [COUPE, 31]]);
    const remp = [...haut, ['L', PTS_T[0]], ['L', lerp(PTS_T[0], PTS_T[1], S_TOILE / 44)], ['L', W1], ...toile.slice(1),
      ['L', [12, -26]], ['L', [40, -8]], ['L', [34, 12]], ['L', [24, 29]], ['L', aur], ...cubital.slice(1), ['Z']];
    const pieces = [{ remp, trait: [haut, toile, cubital], det: [] }];
    const arcs = [];
    for (const [nom, a, b, e0, e1] of REPLIES) {
      const w = e0 / 2, w1 = e1 / 2 + 0.4;
      pieces.push(I.tube({ pts: [a, b], dos: [[w, w1]], ventre: [[w, w1]], bout: 'phalange', base: 14, coussin: [0.4], bosseDos: [0.4],
        ouvre: nom === 'auriculaire' ? { ventre: 2 } : null }));
      arcs.push([['M', add(a, [3.5, -w * 0.5])], ['Q', add(a, [-1.2, 0]), add(a, [3.5, w * 0.5])]]);
    }
    pieces.push(I.tube({ pts: PTS_I, dos: W_I, ventre: W_I, sens: 1, coussin: [-0.15, -0.1, 0.15], bosseDos: [-0.15, -0.1, 0.15],
      bout: 'rond', ongle: 'dessus', base: 16, ouvre: { dos: 5 }, rides: [{ j: 1, n: 2, l: 0.55 }, { j: 2, n: 1, l: 0.45 }] }));
    arcs.push([['M', add(PTS_I[0], [3.5, -4.7])], ['Q', add(PTS_I[0], [-1.2, 0]), add(PTS_I[0], [3.5, 4.7])]]);
    const pouce = I.tube({ pts: PTS_T, sens: 1, dos: W_TD, ventre: W_TV, coussin: [0, 0.6, 0.9], bout: 'doigt', ongle: 'cote',
      base: 16, plis: false, ouvre: { ventre: S_TOILE } });
    pieces.push(pouce);
    // la pâte passe devant l'index et derrière le pouce : le bout et le dessous du pouce se
    // retracent par-dessus elle, pour garder leur épaisseur de silhouette
    const tp = pouce.trait[0], iCap = tp.findIndex((c, i) => i > 0 && c[0] === 'C' && tp[i + 1] && tp[i + 1][0] === 'Q');
    const dessous = [['M', tp[iCap - 1][tp[iCap - 1].length - 1]], ...tp.slice(iCap)];
    pieces.push({ remp: null, trait: [], det: [dessous], silhouette: false, epDet: 1.4 });
    pieces.push({ remp: null, trait: [], det: arcs, silhouette: false, epDet: 0.5 });
    return `<g data-forme="main-ruban">\n${I.peindre(pieces, T, false, objet, 5)}\n</g>`;
  };

  // ─── la pâte : la motte et le ruban, d'une seule pièce ───────────────────────────────
  // Le ruban suit le côté de l'index (il le recouvre de 1 mm), puis continue
  // au-delà du bout : droit quand il sort, de plus en plus penché quand il s'allonge.
  const T_RUB = 6.5, L_I = 79;
  const bordIndex = s => I.pointBord(PTS_I, W_I, 1, 1, s);
  const normale = (pts, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const ux = b[0] - a[0], uy = b[1] - a[1], L = Math.hypot(ux, uy);
    return { u: [ux / L, uy / L], n: [-uy / L, ux / L] };      // n : à droite du sens de marche (vers le bas)
  };
  // la ligne du milieu : sur l'index de s = 14 jusqu'au bout, puis des pas de 5 mm qui penchent
  const milieu = virages => {
    const pts = [];
    for (let s = 14; s <= L_I; s += 5) { const p = bordIndex(s); pts.push([p[0], p[1] - (T_RUB / 2 - 1)]); }
    const q = bordIndex(L_I); pts.push([q[0] + 6, q[1] - (T_RUB / 2 - 1) + 0.5]);   // au-dessus du bout du doigt
    let a = 5, p = pts[pts.length - 1];
    for (const v of virages) { a += v; p = add(p, mul(dir(a), 5)); pts.push(p); }
    return pts;
  };
  const bords = pts => {
    const haut = [], bas = [];
    pts.forEach((p, i) => { const { n } = normale(pts, i); haut.push(add(p, mul(n, -T_RUB / 2))); bas.push(add(p, mul(n, T_RUB / 2))); });
    return { haut, bas };
  };
  // la motte : devant l'index, sous le coussinet du pouce qui la cache en haut ; on en voit le
  // ventre arrondi, qui déborde sur le côté de l'index et dans le creux de la palmure
  const MOTTE = [[22, -45], [12, -52], [0, -54], [-12, -53], [-19, -49], [-22.5, -43.5], [-24, -39.5], [-21.5, -35.5], [-14, -32.8], [-4, -32], [6, -32.6]];
  // fin 'rond' : un bout arrondi ; fin 'casse' : une cassure en dents
  const bout = (hautF, basF, u, fin) => {
    if (fin === 'casse') {
      const m = lerp(hautF, basF, 0.5);
      return [add(lerp(hautF, basF, 0.25), mul(u, 2.4)), add(m, mul(u, -1.8)), add(lerp(basF, hautF, 0.25), mul(u, 2))];
    }
    const m = lerp(hautF, basF, 0.5);
    return [add(lerp(hautF, m, 0.35), mul(u, 1.8)), add(m, mul(u, 2.4)), add(lerp(basF, m, 0.35), mul(u, 1.8))];
  };
  const PATE = h.a.hachure('terre', 'arete');
  const pate = (T, pts, fin) => {
    const { haut, bas } = bords(pts);
    const u = normale(pts, pts.length - 1).u;
    let iHaut = haut.findIndex(p => p[0] > 26);                     // le dessus sort de sous le bout du pouce
    const poly = [...bas, ...bout(haut[haut.length - 1], bas[bas.length - 1], u, fin), ...haut.slice(iHaut).reverse()];
    const d = `M${poly.map(p => P(T(p))).join(' L')} ` + I.ser(I.lisse([haut[iHaut], ...MOTTE, bas[0]]).slice(1), T) + ' Z';
    return [h.path(d, h.a.blanc), h.path(d, PATE)].join('\n');
  };
  // le bout cassé : un tronçon du même ruban, tombé plus bas et un peu tourné, la cassure en haut
  const troncon = (T, pts, chute, tour) => {
    const { haut, bas } = bords(pts);
    const c = pts[0], rot = p => { const v = [p[0] - c[0], p[1] - c[1]], cs = Math.cos(tour * RAD), sn = Math.sin(tour * RAD);
      return [c[0] + v[0] * cs - v[1] * sn + chute[0], c[1] + v[0] * sn + v[1] * cs + chute[1]]; };
    const u0 = normale(pts, 0).u, u1 = normale(pts, pts.length - 1).u;
    const casse = bout(haut[0], bas[0], mul(u0, -1), 'casse');
    const poly = [...haut, ...bout(haut[haut.length - 1], bas[bas.length - 1], u1, 'rond'), ...bas.slice().reverse(), ...casse.reverse()].map(rot);
    return { svg: [h.chemin(poly.map(T), h.a.blanc, true), h.chemin(poly.map(T), PATE, true)].join('\n'), haut: rot(lerp(haut[0], bas[0], 0.5)) };
  };

  // Mise en place dans la vue : même échelle, même cadrage pour les deux vues de main.
  const E_MAIN = 1.12;
  const repereMain = z => {
    const x0 = z.l / 2 - 20 * E_MAIN, y0 = z.h / 2 + 30.5 * E_MAIN;
    const T = p => [x0 + p[0] * E_MAIN, y0 + p[1] * E_MAIN];
    return { T, V: p => T(p) };
  };
  const VIR_SORT = [0, 0, 0, 0];                                        // le ruban qui sort : droit
  const VIR_LONG = [2, 3, 5, 6, 8, 9, 10];                            // le ruban long : il fléchit
  const VIR_TRONCON = [2, 2, 2, 2];                                     // et ce qui s'en est détaché
  // la flèche du pouce : le long du pouce, au-dessus, vers le bout de l'index
  const FLECHE_POUCE = [[-12, -83], [20, -84], [42, -63]];
  // le ruban long, coupé à la cassure : ce qui reste tenu, et le bout qui tombe
  const geoCasse = () => {
    const tout = milieu([...VIR_LONG, ...VIR_TRONCON]);
    const k = tout.length - VIR_TRONCON.length - 1;
    const reste = tout.slice(0, k + 1), piece = tout.slice(k);
    const iBout = reste.length - VIR_LONG.length - 1;              // le point du ruban au bout de l'index
    const mesure = reste.slice(iBout).map((p, j) => add(p, mul(normale(reste, j + iBout).n, -(T_RUB / 2 + 6))));
    return { reste, piece, k, iBout, mesure };
  };

  // ─── le pot Mason d'un litre, debout, vu de face ─────────────────────────────────────
  // En mm : corps 86 de diamètre et 128 de haut, épaule 16, goulot de 66 fileté jusqu'à 160,
  // bague de 72 sur 14 ; verre de 3, fond de 5.
  const E_POT = 0.9;
  const bocal = (cx, yb, o = {}) => {
    const e = E_POT, X = mm => cx + mm * e, Y = mm => yb - mm * e, out = [];
    out.push(h.ligne(X(o.solG == null ? -62 : o.solG), Y(0), X(o.solD == null ? 62 : o.solD), Y(0), h.a.detail));
    // ce qu'il contient, de bas en haut
    let z = 5;
    (o.couches || []).forEach((c, i) => {
      const z2 = z + c.ep;
      if (i === 0) out.push(h.path(`M${P([X(-40), Y(z2)])} L${P([X(-40), Y(9)])} Q${P([X(-40), Y(5)])} ${P([X(-36), Y(5)])} L${P([X(36), Y(5)])} Q${P([X(40), Y(5)])} ${P([X(40), Y(9)])} L${P([X(40), Y(z2)])} Z`, c.at));
      else out.push(h.rect(X(-40), Y(z2), 80 * e, c.ep * e, c.at));
      if (c.trouble) out.push(h.rect(X(-40), Y(z2), 80 * e, c.ep * e, TROUBLE));
      if (c.surface) out.push(h.ligne(X(-40), Y(z2), X(40), Y(z2), h.a.detail));
      z = z2;
    });
    // le verre : la paroi extérieure, puis l'intérieure en trait fin
    out.push(h.path(`M${P([X(-36), Y(0)])} L${P([X(36), Y(0)])} Q${P([X(43), Y(0)])} ${P([X(43), Y(7)])} L${P([X(43), Y(128)])} `
      + `C${P([X(43), Y(137)])} ${P([X(36), Y(141)])} ${P([X(33), Y(144)])} L${P([X(33), Y(160)])} L${P([X(-33), Y(160)])} L${P([X(-33), Y(144)])} `
      + `C${P([X(-36), Y(141)])} ${P([X(-43), Y(137)])} ${P([X(-43), Y(128)])} L${P([X(-43), Y(7)])} Q${P([X(-43), Y(0)])} ${P([X(-36), Y(0)])} Z`, h.a.arete));
    out.push(h.path(`M${P([X(-40), Y(127)])} L${P([X(-40), Y(9)])} Q${P([X(-40), Y(5)])} ${P([X(-36), Y(5)])} L${P([X(36), Y(5)])} Q${P([X(40), Y(5)])} ${P([X(40), Y(9)])} L${P([X(40), Y(127)])}`, h.a.fin));
    if (o.ferme) {
      // la bague vissée et ses stries
      out.push(h.rect(X(-36), Y(162), 72 * e, 15 * e, BLANC_ARETE));
      for (let x = -31; x <= 31; x += 5.2) out.push(h.ligne(X(x), Y(160.5), X(x), Y(148.5), h.a.fin));
    } else {
      // le goulot ouvert : le filet, et l'ouverture vue un peu par-dessus
      out.push(h.ligne(X(-33), Y(149), X(33), Y(152.5), h.a.fin));
      out.push(h.ligne(X(-33), Y(154), X(33), Y(157.5), h.a.fin));
      out.push(h.ellipse(X(0), Y(160), 33 * e, 4.5 * e, `fill="${B}" stroke="${N}" stroke-width="1.4"`));
      out.push(h.ellipse(X(0), Y(160), 29.5 * e, 3.2 * e, h.a.fin));
    }
    // les traits de crayon gras, sur le verre, à gauche
    (o.traits || []).forEach(zt => out.push(h.ligne(X(-41.5), Y(zt), X(-20), Y(zt), h.a.contour)));
    // les épaisseurs, à droite : une ligne de mesure par dépôt, sans chiffre
    if (o.epaisseurs) {
      const xm = X(53), niv = o.epaisseurs;
      out.push(...niv.map(zt => h.ligne(X(45), Y(zt), X(57), Y(zt), h.a.fin)));
      for (let i = 0; i + 1 < niv.length; i++) {
        out.push(h.ligne(xm, Y(niv[i]), xm, Y(niv[i + 1]), h.a.detail));
        out.push(h.ligne(xm - 3.5, Y(niv[i]), xm + 3.5, Y(niv[i]), h.a.detail));
      }
      out.push(h.ligne(xm - 3.5, Y(niv[niv.length - 1]), xm + 3.5, Y(niv[niv.length - 1]), h.a.detail));
    }
    return { svg: out.join('\n'), X, Y };
  };
  // niveaux, en mm depuis le dessous du pot (fond de verre de 5) : un quart de terre, l'eau aux
  // trois quarts (de la hauteur utile, 5 à 160) ; dépôts d'exemple : sable 15, limon 13, argile 11
  const Z_TERRE = 44, Z_EAU = 121, S = 15, L = 13, A = 11;
  const piedPot = z => z.h - 6;

  return {
    ref: '96-07',
    titre: 'La texture à la main : le ruban et le bocal',
    desc: 'En haut, la main vue du dos, le pouce en haut : la motte de terre mouillée serrée entre le coussinet du pouce et le côté de l’index ; le pouce pousse vers le bout de l’index et la pâte sort sous lui en un ruban d’épaisseur égale, qui glisse sur l’index et dépasse son bout. Puis le ruban plus long fléchit au-delà de l’index et casse, le bout tombé plus bas ; une ligne de mesure sans chiffre va du bout de l’index à la cassure. En dessous, le pot Mason : un quart de terre sèche écrasée, sans roches ni racines ; l’eau jusqu’aux trois quarts et une cuillerée de savon en poudre ; fermé et secoué ; puis trois bocaux au repos, un trait de crayon gras au bout de 1 minute sur le sable, au bout de 2 heures sur le limon, et quand l’eau s’éclaircit sur l’argile. Les trois épaisseurs donnent les proportions.',
    format: 'pleine',
    disposition: [['pousser', 'casser'], ['terre', 'eau', 'secouer'], ['min1', 'h2', 'jours']],
    hauteurs: [1.05, 1, 1],
    vues: {
      pousser: {
        titre: 'Pousser le ruban',
        dessin: z => {
          const { T } = repereMain(z);
          const [a, b, c] = FLECHE_POUCE.map(T);
          return [DEFS, mainRuban(pate(T, milieu(VIR_SORT), 'rond'), T), h.fleche(`M${P(a)} Q${P(b)} ${P(c)}`, h.a.arete)].join('\n');
        },
        renvois: z => {
          const { T } = repereMain(z);
          const pts = milieu(VIR_SORT), fin = pts[pts.length - 1];
          return [
            { n: 1, rond: T([-31, -96]), cible: T([-16, -38]), texte: 'terre du dessus, mouillée jusqu’au mastic' },
            { n: 2, rond: T([-60, -78]), cible: T([-26, -63]), texte: 'le pouce pousse la pâte par-dessus l’index' },
            { n: 3, rond: T([106, -6]), cible: T([fin[0] - 7, fin[1] + 0.5]), texte: 'un ruban d’épaisseur égale' },
          ];
        },
      },
      casser: {
        titre: 'Il casse sous son propre poids',
        dessin: z => {
          const { T } = repereMain(z);
          const g = geoCasse();
          const tr = troncon(T, g.piece, [4, 15], -12);
          // la mesure, sans chiffre : du bout de l'index à la cassure, le long du ruban resté,
          // au-dessus de lui, avec ses deux traits d'arrêt
          const out = [mainRuban(pate(T, g.reste, 'casse'), T), tr.svg, h.chemin(g.mesure.map(T), h.a.detail)];
          for (const i of [g.iBout, g.k]) {
            const { n } = normale(g.reste, i), p = g.reste[i];
            out.push(h.ligne(...T(add(p, mul(n, -(T_RUB / 2 + 2)))), ...T(add(p, mul(n, -(T_RUB / 2 + 10)))), h.a.detail));
          }
          // la chute : deux traits au-dessus du bout tombé
          const m = tr.haut;
          for (const dx of [-2.5, 2.5]) out.push(h.ligne(...T([m[0] + dx, m[1] - 3]), ...T([m[0] + dx, m[1] - 9]), h.a.detail));
          return out.join('\n');
        },
        renvois: z => {
          const { T } = repereMain(z);
          const g = geoCasse(), c = g.mesure[Math.floor(g.mesure.length / 2)];
          return [{ n: 4, rond: T([c[0] + 14, -64]), cible: T(c), texte: 'on mesure ce qui dépassait avant la cassure' }];
        },
      },
      terre: {
        titre: 'Un quart de terre sèche',
        dessin: z => {
          const cx = z.l * 0.40, yb = piedPot(z);
          const pot = bocal(cx, yb, { couches: [{ ep: Z_TERRE - 5, at: TERRE }], solD: 118 });
          // à côté du pot : les cailloux et les bouts de racine retirés de la terre
          const X = pot.X, Y = pot.Y, out = [pot.svg];
          // un caillou posé : un contour arrondi, irrégulier, plus large que haut, à plat sur le sol
          const caillou = (x0, rx, ry, g) => {
            const pts = [];
            for (let i = 0; i < 8; i++) { const a = i / 8 * 2 * Math.PI, k = 0.86 + 0.14 * Math.sin(i * g + 1); pts.push([X(x0) + Math.cos(a) * rx * k, Y(0) - ry - Math.sin(a) * ry * k]); }
            const mil = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
            let d = `M${P(mil(pts[7], pts[0]))}`;
            pts.forEach((p, i) => { d += ` Q${P(p)} ${P(mil(p, pts[(i + 1) % 8]))}`; });
            return h.path(d + ' Z', BLANC_ARETE);
          };
          out.push(caillou(53, 7.5, 6, 1.7), caillou(66.5, 5, 4.2, 2.9), caillou(75.5, 3.5, 3, 0.9));
          // un bout de racine couché à côté, avec ses radicelles
          out.push(h.path(`M${P([X(80), Y(2)])} C${P([X(88), Y(9)])} ${P([X(98), Y(1)])} ${P([X(114), Y(5)])}`, h.a.arete));
          out.push(h.path(`M${P([X(89), Y(5.2)])} Q${P([X(91), Y(10)])} ${P([X(95), Y(13)])}`, h.a.detail));
          out.push(h.path(`M${P([X(100), Y(2.6)])} Q${P([X(103), Y(7)])} ${P([X(108), Y(9)])}`, h.a.fin));
          out.push(h.path(`M${P([X(106), Y(3.6)])} Q${P([X(108), Y(0.8)])} ${P([X(111), Y(0.4)])}`, h.a.fin));
          return out.join('\n');
        },
        renvois: z => {
          const cx = z.l * 0.40, yb = piedPot(z), X = mm => cx + mm * E_POT, Y = mm => yb - mm * E_POT;
          return [
            { n: 5, rond: [X(-56), Y(70)], cible: [X(-22), Y(24)], texte: 'terre séchée, écrasée : un quart du bocal' },
            { n: 6, rond: [X(84), Y(58)], cible: [X(92), Y(5.5)], texte: 'roches et racines retirées' },
          ];
        },
      },
      eau: {
        titre: 'L’eau, puis le savon',
        dessin: z => {
          const cx = z.l * 0.44, yb = piedPot(z);
          const pot = bocal(cx, yb, { couches: [{ ep: Z_TERRE - 5, at: TERRE }, { ep: Z_EAU - Z_TERRE, at: EAU, surface: true }] });
          const X = pot.X, Y = pot.Y, out = [pot.svg];
          // la cuillère à thé, penchée au-dessus du goulot, la poudre qui tombe
          const bout = [X(4), Y(168)], ang = -8, u = dir(ang), nn = dir(ang + 90);
          const c = add(bout, mul(u, 12));
          const manche = [add(c, mul(nn, -2)), add(add(c, mul(u, 60)), mul(nn, -3.2)), add(add(c, mul(u, 66)), mul(nn, 0)), add(add(c, mul(u, 60)), mul(nn, 3.2)), add(c, mul(nn, 2))];
          out.push(h.chemin([manche[0], manche[1]], h.a.arete), h.chemin([manche[4], manche[3]], h.a.arete));
          out.push(h.path(`M${P(manche[1])} Q${P(add(add(c, mul(u, 67)), mul(nn, -3)))} ${P(manche[2])} Q${P(add(add(c, mul(u, 67)), mul(nn, 3)))} ${P(manche[3])}`, h.a.arete));
          const ell = (cx, cy, rx, ry, at) => { const d = mul(u, rx), a0 = [cx - d[0], cy - d[1]], a1 = [cx + d[0], cy + d[1]];
            return h.path(`M${P(a0)} A${f(rx)} ${f(ry)} ${ang} 1 0 ${P(a1)} A${f(rx)} ${f(ry)} ${ang} 1 0 ${P(a0)} Z`, at); };
          out.push(ell(c[0] - 1, c[1], 13, 8, BLANC_ARETE), ell(c[0] - 1, c[1] - 1, 9.5, 4.5, h.a.hachure('neige', 'aucun')));
          for (const [dx, dy] of [[0, 8], [2, 14], [-1.5, 19], [1, 25], [-0.5, 31]]) out.push(h.cercle(bout[0] - 1 + dx, bout[1] + 3 + dy, 0.9, h.a.plein));
          return out.join('\n');
        },
        renvois: z => {
          const cx = z.l * 0.44, yb = piedPot(z), X = mm => cx + mm * E_POT, Y = mm => yb - mm * E_POT;
          return [
            { n: 7, rond: [X(-64), Y(96)], cible: [X(-30), Y(80)], texte: 'eau jusqu’aux trois quarts' },
            { n: 8, rond: [X(4) + 74, Y(168) + 30], cible: [X(4) + 24, Y(168) - 2], texte: 'une cuillerée à thé de savon en poudre' },
          ];
        },
      },
      secouer: {
        titre: 'Secouer 10 à 15 minutes',
        dessin: z => {
          const cx = z.l * 0.46, yb = piedPot(z);
          const pot = bocal(cx, yb, { ferme: true, couches: [{ ep: Z_EAU - 5, at: TERRE, surface: true }] });
          const X = pot.X, Y = pot.Y;
          const fl = xm => [h.fleche(`M${P([X(xm), Y(84)])} L${P([X(xm), Y(128)])}`), h.fleche(`M${P([X(xm), Y(76)])} L${P([X(xm), Y(32)])}`)];
          return [pot.svg, ...fl(-60), ...fl(60)].join('\n');
        },
      },
      min1: {
        titre: 'Au bout de 1 minute',
        dessin: z => bocal(z.l * 0.46, piedPot(z), { ferme: true, traits: [5 + S],
          couches: [{ ep: S, at: SABLE }, { ep: Z_EAU - 5 - S, at: EAU, trouble: true, surface: true }] }).svg,
        renvois: z => {
          const cx = z.l * 0.46, yb = piedPot(z), X = mm => cx + mm * E_POT, Y = mm => yb - mm * E_POT;
          return [{ n: 9, rond: [X(-66), Y(52)], cible: [X(-34), Y(5 + S)], texte: 'le sable : premier trait au crayon gras' }];
        },
      },
      h2: {
        titre: 'Au bout de 2 heures',
        dessin: z => bocal(z.l * 0.46, piedPot(z), { ferme: true, traits: [5 + S, 5 + S + L],
          couches: [{ ep: S, at: SABLE }, { ep: L, at: LIMON }, { ep: Z_EAU - 5 - S - L, at: EAU, trouble: true, surface: true }] }).svg,
        renvois: z => {
          const cx = z.l * 0.46, yb = piedPot(z), X = mm => cx + mm * E_POT, Y = mm => yb - mm * E_POT;
          return [{ n: 10, rond: [X(-66), Y(60)], cible: [X(-34), Y(5 + S + L)], texte: 'le limon : deuxième trait' }];
        },
      },
      jours: {
        titre: 'L’eau claire, en 1 à 3 jours',
        dessin: z => bocal(z.l * 0.42, piedPot(z), { ferme: true, traits: [5 + S, 5 + S + L, 5 + S + L + A],
          epaisseurs: [5, 5 + S, 5 + S + L, 5 + S + L + A],
          couches: [{ ep: S, at: SABLE }, { ep: L, at: LIMON }, { ep: A, at: ARGILE }, { ep: Z_EAU - 5 - S - L - A, at: EAU, surface: true }] }).svg,
        renvois: z => {
          const cx = z.l * 0.42, yb = piedPot(z), X = mm => cx + mm * E_POT, Y = mm => yb - mm * E_POT;
          return [
            { n: 11, rond: [X(-66), Y(68)], cible: [X(-34), Y(5 + S + L + A)], texte: 'l’argile : troisième trait' },
            { n: 12, rond: [X(84), Y(48)], cible: [X(56), Y(5 + S + L / 2)], texte: 'les trois épaisseurs donnent les proportions' },
          ];
        },
      },
    },
  };
};
