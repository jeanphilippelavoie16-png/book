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
// aucun chiffre ne l'accompagne. La main (14 oct.) : une main simple (mains/moteur.js, pince-laterale
// vue du côté du pouce, l'index allongé), au lieu de la main montée avec les pièces de l'ancienne
// bibliothèque ; la motte n'est plus dessinée, le ruban sort de sous le pouce. Reprise le même jour : le
// gros plan des bouts de doigts, la main très grande coupée par le bord de la vue. L'épaisseur du ruban
// est un dessin, pas une donnée. La charte : les pots au contour 2,4 ; la poussée du pouce et le
// secouage, flèches rouges du geste.
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

  // ─── la main qui fait le ruban (main simple, mains/moteur.js) ─────────────────────────
  // Le gros plan des bouts de doigts (reprise du 14 oct. : la main entière en petit faisait un pouce en
  // triangle) : la main droite vue du côté du pouce (pince-laterale, tournée de 40° pour montrer le bout du
  // pouce), très grande (2,6 par mm) et coupée par le bord de la vue ; seuls le bout du pouce et l'index
  // allongé y entrent. La pulpe du pouce serre la pâte contre l'index ; le pouce pousse, la pâte sort sous
  // son bout en un ruban d'épaisseur égale qui glisse sur l'index et dépasse son bout. Le ruban est l'objet
  // de la prise : peint par le moteur entre les couches de la main (le pouce devant lui, l'index dessous).
  const F = h.formes;
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const E_MAIN = 2.6, T_RUB = 6.5 * E_MAIN;            // la main en unités par mm ; l'épaisseur du ruban
  const oMain = (z, px, py) => ({ x: z.l * px, y: z.h * py, ancre: 'bout', pose: 'pince-laterale', vue: 'pouce', cote: 'droite', echelle: E_MAIN,
    diametre: 6.5, doigts: { index: { mcp: 15, ipp: 10, ipd: 5 } }, angle: 0, rotation: [0, -40, 0],
    avantbras: { longueur: 60 } });
  const geoMain = (z, px, py) => {
    const o = oMain(z, px, py), m = F.mainSimple(o), A_ = m.articulations;
    const a = A_['index.ipd'], bi = A_['index.bout'];
    const l = Math.hypot(bi[0] - a[0], bi[1] - a[1]), u = [(bi[0] - a[0]) / l, (bi[1] - a[1]) / l];
    const nH = [u[1], -u[0]];                                         // vers le haut de la vue (u va vers la droite)
    const p0 = [m.prise.x, m.prise.y], p1 = add(bi, mul(nH, 6 * E_MAIN + T_RUB / 2));
    return { o, m, u, nH, p0, p1 };
  };
  // la ligne du milieu du ruban : de la prise au-dessus du bout de l'index, puis des pas de 5 mm qui penchent
  const milieuRuban = (g, virages) => {
    const pts = [g.p0];
    const d = Math.hypot(g.p1[0] - g.p0[0], g.p1[1] - g.p0[1]), n = Math.max(2, Math.round(d / (5 * E_MAIN)));
    for (let i = 1; i <= n; i++) pts.push([g.p0[0] + (g.p1[0] - g.p0[0]) * i / n, g.p0[1] + (g.p1[1] - g.p0[1]) * i / n]);
    let a = Math.atan2(g.p1[1] - g.p0[1], g.p1[0] - g.p0[0]) / RAD, p = g.p1;
    for (const v of virages) { a += v; p = add(p, mul(dir(a), 5 * E_MAIN)); pts.push(p); }
    return pts;
  };
  const normale = (pts, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const ux = b[0] - a[0], uy = b[1] - a[1], L = Math.hypot(ux, uy);
    return { u: [ux / L, uy / L], n: [-uy / L, ux / L] };
  };
  const bords = pts => {
    const haut = [], bas = [];
    pts.forEach((p, i) => { const { n } = normale(pts, i); haut.push(add(p, mul(n, -T_RUB / 2))); bas.push(add(p, mul(n, T_RUB / 2))); });
    return { haut, bas };
  };
  // fin 'rond' : un bout arrondi ; fin 'casse' : une cassure en dents
  const bout = (hautF, basF, u, fin) => {
    const m = lerp(hautF, basF, 0.5), k = E_MAIN;
    if (fin === 'casse') return [add(lerp(hautF, basF, 0.25), mul(u, 2.4 * k)), add(m, mul(u, -1.8 * k)), add(lerp(basF, hautF, 0.25), mul(u, 2 * k))];
    return [add(lerp(hautF, m, 0.35), mul(u, 1.8 * k)), add(m, mul(u, 2.4 * k)), add(lerp(basF, m, 0.35), mul(u, 1.8 * k))];
  };
  const PATE = h.a.hachure('terre', 'arete');
  const ruban = (pts, fin) => {
    const { haut, bas } = bords(pts), u = normale(pts, pts.length - 1).u, u0 = normale(pts, 0).u;
    const poly = [...bas, ...bout(haut[haut.length - 1], bas[bas.length - 1], u, fin), ...haut.slice().reverse(), ...bout(haut[0], bas[0], mul(u0, -1), 'rond').reverse()];
    return [h.chemin(poly, h.a.blanc, true), h.chemin(poly, PATE, true)].join('\n');
  };
  // le bout cassé : un tronçon du même ruban, tombé plus bas et un peu tourné, la cassure en haut
  const troncon = (pts, chute, tour) => {
    const { haut, bas } = bords(pts);
    const c = pts[0], rot = p => { const v = [p[0] - c[0], p[1] - c[1]], cs = Math.cos(tour * RAD), sn = Math.sin(tour * RAD);
      return [c[0] + v[0] * cs - v[1] * sn + chute[0], c[1] + v[0] * sn + v[1] * cs + chute[1]]; };
    const u0 = normale(pts, 0).u, u1 = normale(pts, pts.length - 1).u;
    const casse = bout(haut[0], bas[0], mul(u0, -1), 'casse');
    const poly = [...haut, ...bout(haut[haut.length - 1], bas[bas.length - 1], u1, 'rond'), ...bas.slice().reverse(), ...casse.reverse()].map(rot);
    return { svg: [h.chemin(poly, h.a.blanc, true), h.chemin(poly, PATE, true)].join('\n'), haut: rot(lerp(haut[0], bas[0], 0.5)) };
  };
  let nClipM = 0;
  const mainRuban = (z, g, ruban) => { const id = `m9607-${++nClipM}`;
    return `<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath><g clip-path="url(#${id})">${F.mainSimple({ ...g.o, objet: ruban }).svg}</g>`; };
  const VIR_SORT = [0, 0];                                              // le ruban qui sort : droit
  const VIR_LONG = [2, 3, 5, 6, 8, 9, 10];                            // le ruban long : il fléchit
  const VIR_TRONCON = [2, 2, 2];                                     // et ce qui s'en est détaché
  // le ruban long, coupé à la cassure : ce qui reste tenu, et le bout qui tombe ; la mesure, du bout de
  // l'index à la cassure, au-dessus du ruban
  const geoCasse = g => {
    const tout = milieuRuban(g, [...VIR_LONG, ...VIR_TRONCON]);
    const k = tout.length - VIR_TRONCON.length - 1;
    const reste = tout.slice(0, k + 1), piece = tout.slice(k);
    const iBout = reste.length - VIR_LONG.length - 1;              // le point du ruban au bout de l'index
    const mesure = reste.slice(iBout).map((p, j) => add(p, mul(normale(reste, j + iBout).n, -(T_RUB / 2 + 6))));
    return { reste, piece, k, iBout, mesure };
  };
  // la flèche du pouce (le geste) : au-dessus de la main, de la base du pouce vers son bout, puis vers le ruban
  const flechePouce = g => {
    // au-dessus du bout du pouce : de l'arrière vers l'avant, dans le sens du ruban
    const b = g.m.pouce, k = E_MAIN;
    const p = add(b, add(mul(g.u, -26 * k), mul(g.nH, 20 * k))), q = add(b, add(mul(g.u, -4 * k), mul(g.nH, 26 * k))), r = add(b, add(mul(g.u, 14 * k), mul(g.nH, 16 * k)));
    return { d: `M${P(p)} Q${P(q)} ${P(r)}`, p, q, r };
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
      + `C${P([X(-36), Y(141)])} ${P([X(-43), Y(137)])} ${P([X(-43), Y(128)])} L${P([X(-43), Y(7)])} Q${P([X(-43), Y(0)])} ${P([X(-36), Y(0)])} Z`, h.a.contour));   // la charte : l'objet pèse
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
          const g = geoMain(z, 0.8, 0.6);
          return [DEFS, mainRuban(z, g, ruban(milieuRuban(g, VIR_SORT), 'rond')), h.geste(flechePouce(g).d)].join('\n');
        },
        renvois: z => {
          const g = geoMain(z, 0.8, 0.6), pts = milieuRuban(g, VIR_SORT), fin = pts[pts.length - 1], th = g.m.articulations;
          const sortie = lerp(g.p0, g.p1, 0.75);                           // la pâte, au sortir du pouce
          const pouce = add(lerp(th['pouce.ip'], g.m.pouce, 0.75), mul(g.nH, 6 * E_MAIN));
          const dans = ([x, y]) => [Math.max(14, Math.min(z.l - 14, x)), Math.max(14, Math.min(z.h - 14, y))];
          return [
            { n: 1, rond: dans([sortie[0] + 40, sortie[1] - 45]), cible: sortie, texte: 'terre du dessus, mouillée jusqu’au mastic' },
            { n: 2, rond: dans([pouce[0] - 60, pouce[1] + 60]), cible: pouce, texte: 'le pouce pousse la pâte par-dessus l’index' },
            { n: 3, rond: [Math.min(z.l - 14, fin[0] + 24), fin[1] + 34], cible: add(fin, mul(g.u, -5)), texte: 'un ruban d’épaisseur égale' },
          ];
        },
      },
      casser: {
        titre: 'Il casse sous son propre poids',
        dessin: z => {
          const gm = geoMain(z, 0.38, 0.38), g = geoCasse(gm), k = E_MAIN;
          const tr = troncon(g.piece, [4 * k, 12 * k], -12);
          // la mesure, sans chiffre : du bout de l'index à la cassure, le long du ruban resté,
          // au-dessus de lui, avec ses deux traits d'arrêt
          const out = [mainRuban(z, gm, ruban(g.reste, 'casse')), tr.svg, h.chemin(g.mesure, h.a.detail)];
          for (const i of [g.iBout, g.k]) {
            const { n } = normale(g.reste, i), p = g.reste[i];
            out.push(h.ligne(...add(p, mul(n, -(T_RUB / 2 + 2 * k))), ...add(p, mul(n, -(T_RUB / 2 + 10 * k))), h.a.detail));
          }
          // la chute : deux traits au-dessus du bout tombé
          const m = tr.haut;
          for (const dx of [-2.5, 2.5]) out.push(h.ligne(m[0] + dx * k, m[1] - 3 * k, m[0] + dx * k, m[1] - 9 * k, h.a.detail));
          return out.join('\n');
        },
        renvois: z => {
          const g = geoCasse(geoMain(z, 0.38, 0.38)), c = g.mesure[Math.floor(g.mesure.length / 2)];
          return [{ n: 4, rond: [c[0] + 14, c[1] - 40], cible: c, texte: 'on mesure ce qui dépassait avant la cassure' }];
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
          // secouer : le geste (charte : le rouge), de bas en haut
          const fl = xm => [h.geste(`M${P([X(xm), Y(32)])} L${P([X(xm), Y(128)])}`, { double: true })];
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
