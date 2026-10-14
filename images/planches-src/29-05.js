// Planche 29-05 — Ventiler un nouveau-né.
// Chapitre 29, section F, étapes 48 à 51 : le coucher sur le dos sur la surface ferme et chaude
// (table, planche, plancher couvert d'un linge chaud), la poitrine découverte, le reste couvert ;
// le linge roulé sous les épaules, la tête droite, le nez vers le plafond — pas renversée loin
// en arrière, ce qui referme la gorge ; la bouche de l'aide couvre la bouche et le nez du bébé ;
// on ne souffle que l'air des joues gonflées, jamais celui de la poitrine (trop d'air déchire
// les poumons) ; la poitrine se soulève à chaque bouffée.
// Rien ne se construit : aucune cote. Le chapitre ne donne pas l'épaisseur du rouleau.
// Passe qualité (lot 07) : la tête de l'aide de profil ne se lisait pas. Le geste se montre
// maintenant par le visage du bébé vu d'en haut, avec l'anneau des lèvres de l'aide qui enferme
// ensemble le nez et la bouche ; la poitrine qui monte se montre à côté, de profil. Le bras (un
// boudin qui se confondait avec le rouleau) est retiré : il est sous la couverture. Le visage de
// profil a un nez court et rond, les lèvres fermées, un menton et un œil fermé. Le renvoi
// « l'air des joues, rien de plus » n'a plus de cible sans la tête de l'aide : l'encadré danger
// le dit en entier. Le renvoi 5 aboutit sur le devant du cou étiré.
// Le bébé est dessiné à la main (la bibliothèque n'a pas de nouveau-né), en mm : 118 de l'occiput
// au front, visage petit sous un gros crâne, cou court, poitrine de 95 d'épaisseur.
//
// La charte : le bébé est un corps dessiné à la main, laissé tel quel, sans gris. Le linge roulé,
// ce qu'on ajoute, pèse (contour fort). Pas de gris sur la planche, qui est en coupe. Le rouge :
// sur le raté, le cercle sur la gorge qui se referme ; en soufflant, le cercle sur la poitrine qui
// doit se soulever. La flèche de la poitrine reste noire : c'est le corps qui bouge, pas un geste.
module.exports = (h) => {
  const A = h.a;
  const f = v => (Math.round(v * 10) / 10).toString();
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const RAD = Math.PI / 180;
  const tourne = (p, deg) => { const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mil = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const miroir = pts => pts.map(p => [-p[0], p[1]]);

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
  const echant = (P, pas = 12) => {
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
  // une ellipse fermée, en chemin SVG, déjà dans la vue
  const ellipseD = (c, rx, ry) => `M${pt([c[0] + rx, c[1]])} A${f(rx)} ${f(ry)} 0 1 0 ${pt([c[0] - rx, c[1]])} A${f(rx)} ${f(ry)} 0 1 0 ${pt([c[0] + rx, c[1]])} Z`;

  // ─── La tête du nouveau-né, de profil, debout, le visage vers la droite, repère à l'oreille.
  // De la nuque, par-dessus le crâne, jusqu'à la gorge. Le visage : un nez court et rond, les
  // lèvres fermées (deux bourrelets et la fente entre eux), un petit menton rond.
  const TETE = [[-38, 46], [-52, 26], [-58, -2], [-50, -40], [-24, -67], [8, -74], [40, -62], [57, -34], [61, -14],
    [59, -4], [61.5, 3], [68.5, 9.5], [71.5, 14.5], [69, 19.5], [62, 21.5],   // le nez, un bouton rond
    [62.5, 25], [64.5, 29.5], [63, 33.5], [60, 36.5],                          // les lèvres, un seul bourrelet
    [58.5, 38.5], [60, 43], [58.5, 48],                                        // le menton, petit et fuyant
    [53, 51.5], [42, 54.5], [28, 57]];
  const GORGE = TETE[TETE.length - 1], ATLAS = [-8, 30];
  const NEZ = [71.5, 14.5];
  const OEIL = [[41.5, -4.5], [46.5, -1.2], [51.5, -3.5]];  // l'œil fermé : la paupière seule (des cils faisaient une patte d'oiseau)
  const FENTE = [[64.5, 29.5], [58, 30.4]];                  // la fente des lèvres
  // Pas d'oreille : couchée sur le côté du crâne, elle se lisait comme un sourire.

  // ─── Le corps couché, en mm, repère : la surface (le dessus du linge) en y = 0, x vers les pieds.
  const ROULEAU = { c: [72, -13], r: 13 };
  const DOS = [[62, -25], [74, -26.5], [95, -25], [130, -19], [180, -8]];
  const FACE = [[66, -88], [76, -93], [95, -102], [120, -109], [150, -112], [180, -110]];
  // la poitrine soulevée (tireté) : FACE levée de LEVE en son milieu
  const LEVE = 7;
  const leve = p => [p[0], p[1] - LEVE * Math.sin(Math.PI * (p[0] - 66) / 96)];

  // pose de la tête : angle (degrés, horaire) ; elle pivote à l'atlas puis repose sur la surface
  const A0 = -92;
  const poseTete = (a) => {
    const bas0 = Math.max(...TETE.map(p => tourne(p, A0)[1]));
    const atlasBon = add([0, -bas0], tourne(ATLAS, A0));
    let o = sub(atlasBon, tourne(ATLAS, a));
    const bas = Math.max(...TETE.map(p => add(o, tourne(p, a))[1]));
    o = [o[0], o[1] - bas];
    return p => add(o, tourne(p, a));
  };

  // le bébé : V (mm → vue), a (angle de la tête) ; coupe : le dessin s'arrête à xFin (brisure)
  function bebe(V, k, a, { xFin = 380, coupe = false, poitrine = false } = {}) {
    const Th = poseTete(a);
    const P = pts => pts.map(V);
    const out = [];
    // le haut du dos part du point de la nuque le plus proche des épaules
    const arriere = echant(TETE.slice(0, 3).map(Th), 8);
    let nuque = arriere[0], dmin = Infinity;
    for (const q of arriere) { const d = Math.hypot(q[0] - DOS[0][0], q[1] - DOS[0][1]); if (d < dmin) { dmin = d; nuque = q; } }
    const gorge = Th(GORGE);
    const dos = [nuque, ...DOS];
    const face = [gorge, mil(gorge, FACE[0]), ...FACE];
    out.push(h.path(lisse(P(dos)) + ' L' + P(face.slice().reverse()).map(pt).join(' L') + ' Z', A.blanc));
    out.push(h.path(lisse(P(dos)), A.arete));
    // la poitrine soulevée, en tireté
    if (poitrine) {
      const lev = FACE.filter(p => p[0] >= 76 && p[0] <= 150).map(leve);
      out.push(h.path(lisse(P([[68, -89], ...lev, [158, -113]])), A.cache));
    }
    // la tête, l'œil fermé, la fente des lèvres
    const T = pts => pts.map(p => V(Th(p)));
    out.push(h.path(lisse(T(TETE)) + ` L${pt(V(Th([10, 62])))} Z`, A.blanc));
    out.push(h.path(lisse(T(TETE)), A.arete));
    out.push(h.path(lisse(T(OEIL)), A.arete));
    out.push(h.path(lisse(T(FENTE)), A.detail));
    // le devant du cou, tracé après la tête : le fond blanc de la tête le coupait près de la gorge
    out.push(h.path(lisse(P(face)), A.arete));
    // le rouleau, vu par le bout : il dépasse du corps vers l'œil
    {
      const { c, r } = ROULEAU;
      const sp = [];
      for (let t = 0; t <= 2.4 * 360; t += 15) {
        const rr = 2.2 + (r - 3.4 - 2.2) * t / (2.4 * 360);
        sp.push(V(add(c, [rr * Math.cos(t * RAD), rr * Math.sin(t * RAD)])));
      }
      out.push(h.cercle(...V(c), r * k, blanc(A.contour)));
      out.push(h.path(lisse(sp), A.detail));
    }
    // la couverture : du bas de la poitrine aux pieds (les bras sont dessous)
    {
      const haut = [[157, -118], [172, -115], [205, -112], [240, -102], [262, -90], [282, -88], [302, -98], [322, -96],
        [343, -72], [362, -44], [376, -18], [384, 0]];
      const bord = [[150, 0], [152, -40], [154, -84], [157, -118]];
      let dessusC = haut;
      if (coupe) dessusC = [...haut.filter(p => p[0] < xFin - 6), [xFin, -108]];
      const bas = coupe ? ` L${pt(V([xFin, 0]))} L${pt(V([150, 0]))}` : ` L${pt(V([150, 0]))}`;
      out.push(h.path(lisse(P(dessusC)) + bas + lisse(P(bord), false, true) + ' Z', A.blanc));
      out.push(h.path(lisse(P(bord)), A.arete));
      out.push(h.path(lisse(P(dessusC)), A.arete));
      // l'ourlet rabattu, et quelques plis
      out.push(h.path(lisse(P([[167, -115], [165, -80], [162, -40], [161, -2]])), A.detail));
      const plis = [[[228, -103], [236, -60], [232, -4]], [[292, -92], [286, -50], [290, -3]], [[340, -70], [336, -34], [340, -3]], [[196, -110], [202, -70]]];
      for (const pl of plis) if (!coupe || pl.every(p => p[0] < xFin - 4)) out.push(h.path(lisse(P(pl)), A.fin));
    }
    return { svg: out.join('\n'), Th };
  }

  // la planche et le linge chaud dessus ; xG : bout gauche ; xD : bout droit (ou brisure)
  function surface(V, k, xG, xD, coupe) {
    const out = [];
    const ep = 26, li = 5;
    const P = pts => pts.map(V);
    if (coupe) {
      const br = brisure(V, xD, li, li + ep);
      out.push(h.path(`M${pt(V([xG, li]))} L${pt(V([xD, li]))}` + br.d + ` L${pt(V([xG, li + ep]))} Z`, A.hachure('bois')));
    } else {
      const p = V([xG, li]);
      out.push(h.rect(p[0], p[1], (xD - xG) * k, ep * k, A.hachure('bois')));
    }
    // le linge : une bande mince qui retombe par-dessus les bouts de la planche
    const retombe = [[xG + 3, 0], [xG - 2, 3], [xG - 4.5, 12], [xG - 4, 26], [xG - 6, 36]];
    const dedans = [[xG - 1, 35], [xG - 0.5, 22], [xG, 8], [xG + 3, li]];
    out.push(h.path(`M${pt(V([xD, 0]))} L${pt(V(retombe[0]))}` + lisse(P(retombe), false, true)
      + ` L${pt(V(dedans[0]))}` + lisse(P(dedans), false, true) + ` L${pt(V([xD, li]))} Z`, blanc(A.detail)));
    if (!coupe) {
      const r2 = [[xD - 3, 0], [xD + 2, 3], [xD + 4.5, 12], [xD + 4, 26], [xD + 6, 36]];
      const d2 = [[xD + 1, 35], [xD + 0.5, 22], [xD, 8], [xD - 3, li]];
      out.push(h.path(lisse(P(r2)) + ` L${pt(V(d2[0]))}` + lisse(P(d2), false, true) + ' Z', blanc(A.detail)));
    }
    return out.join('\n');
  }
  // une brisure : le trait ondulé qui dit « le dessin continue »
  function brisure(V, x, y0, y1) {
    const pts = [], n = 8;
    for (let i = 0; i <= n; i++) pts.push(V([x + (i > 0 && i < n ? (i % 2 ? 2.5 : -2.5) : 0), y0 + (y1 - y0) * i / n]));
    return { d: lisse(pts, false, true), pts };
  }

  // cadrage : met les mm (x0..x1, y0..y1) dans la vue
  const cadre = (z, x0, x1, y0, y1, marge = 8) => {
    const k = Math.min((z.l - 2 * marge) / (x1 - x0), (z.h - 2 * marge) / (y1 - y0));
    const ox = (z.l - k * (x1 - x0)) / 2 - k * x0, oy = (z.h - k * (y1 - y0)) / 2 - k * y0;
    return { k, V: p => [ox + k * p[0], oy + k * p[1]] };
  };

  // ─── Les vignettes de profil : le bébé coupé par une brisure un peu après le bord de la couverture.
  const vignette = (z, a, cad, xc, opts = {}) => {
    const { k, V } = cadre(z, ...cad);
    const b = bebe(V, k, a, { xFin: xc, coupe: true, ...opts });
    const br = brisure(V, xc, -110, 31);
    return { k, V, svg: [surface(V, k, -100, xc, true), b.svg, h.path(`M${pt(br.pts[0])}` + br.d, A.detail)].join('\n') };
  };

  // les deux du haut, cadrées pareil : bon à gauche, raté à droite
  const XC = 196, CADRE = [-118, XC + 4, -150, 34];
  const posC = (z, p) => cadre(z, ...CADRE).V(p);
  const pos = (z, a, p) => posC(z, poseTete(a)(p));
  const A_RATE = -134;

  // ─── Souffler, de profil : la même pose que « la tête droite », la poitrine soulevée en tireté.
  const XP = 200, CADRE_P = [-118, XP + 4, -162, 34];
  const X_FL = 100;                                   // la flèche, au-dessus du haut de la poitrine
  const surFace = x => {                              // la hauteur de la poitrine soulevée en x
    const e = echant([[68, -89], ...FACE.filter(p => p[0] >= 76 && p[0] <= 150).map(leve), [158, -113]], 24);
    let best = e[0];
    for (const q of e) if (Math.abs(q[0] - x) < Math.abs(best[0] - x)) best = q;
    return best;
  };
  const souffler = z => {
    const v = vignette(z, A0, CADRE_P, XP, { poitrine: true });
    const y0 = surFace(X_FL)[1];
    const fl = [v.V([X_FL, y0 - 6]), v.V([X_FL, y0 - 30])];
    const pc = v.V([120, leve([120, -109])[1] + 2]);   // ce qu'on regarde à chaque bouffée
    return [v.svg, h.fleche(`M${pt(fl[0])} L${pt(fl[1])}`, A.arete), h.controle(pc[0], pc[1], 15)].join('\n');
  };

  // ─── Souffler, vu d'en haut : le visage du bébé couché, de face, et l'anneau des lèvres de
  // l'aide posé dessus, qui enferme ensemble le nez et la bouche. En mm, repère entre les yeux.
  const CADRE_D = [-60, 60, -66, 88];
  const LEVRES = { c: [0, 25.5], ext: [28.5, 22], int: [21, 15.5] };
  const dessus = z => {
    const { k, V } = cadre(z, ...CADRE_D);
    const P = pts => pts.map(V);
    const out = [];
    // le cou et les épaules, coupés par une brisure au haut de la poitrine
    const Y_BR = 82;
    const epD = [[19, 46], [23, 58], [32, 66], [46, 71], [55, 76], [58, Y_BR]];
    const epG = miroir(epD).reverse();
    const br = [];
    for (let i = 0; i <= 10; i++) br.push([58 - 116 * i / 10, Y_BR + (i > 0 && i < 10 ? (i % 2 ? 2.5 : -2.5) : 0)]);
    out.push(h.path(lisse(P(epG)) + ` L${pt(V(epD[0]))}` + lisse(P(epD), false, true) + lisse(P(br), false, true) + ' Z', A.blanc));
    out.push(h.path(lisse(P(epG)), A.arete));
    out.push(h.path(lisse(P(epD)), A.arete));
    out.push(h.path(lisse(P(br)), A.detail));
    out.push(h.path(lisse(P([[-14, 58.5], [0, 62], [14, 58.5]])), A.fin));      // le pli du cou
    // les oreilles, sur les côtés de la tête
    const oreilleD = [[43, -7], [50, -9.5], [55, -3], [55.5, 7], [52.5, 16], [46, 21], [42, 17]];
    for (const o of [oreilleD, miroir(oreilleD)]) out.push(h.path(lisse(P(o), true), blanc(A.arete)));
    for (const o of [[[48, -4], [51.5, 1], [51.5, 9], [48.5, 14.5]], miroir([[48, -4], [51.5, 1], [51.5, 9], [48.5, 14.5]])]) out.push(h.path(lisse(P(o)), A.fin));
    // la tête : un gros crâne, les joues rondes, un petit menton
    const TFd = [[0, -62], [25, -58.5], [41.5, -46], [48.5, -25], [47.5, -4], [45, 15], [41, 31.5], [32.5, 44.5], [18.5, 52.5]];
    const TF = [...TFd, [0, 55], ...miroir(TFd.slice(1)).reverse()];
    out.push(h.path(lisse(P(TF), true), blanc(A.arete)));
    // les sourcils, les yeux fermés
    const sourcil = [[9, -11], [18, -12.5], [27, -10]], oeil = [[9.5, -0.5], [18, 3], [26.5, -0.5]];
    for (const s of [sourcil, miroir(sourcil)]) out.push(h.path(lisse(P(s)), A.fin));
    for (const s of [oeil, miroir(oeil)]) out.push(h.path(lisse(P(s)), A.arete));
    // le nez, court et rond : les ailes et les narines
    const aile = [[3.5, 12], [8.5, 14.5], [9, 18.5], [5.5, 20.5]];
    for (const s of [aile, miroir(aile)]) out.push(h.path(lisse(P(s)), A.detail));
    out.push(h.path(lisse(P([[-3, 21.8], [0, 22.6], [3, 21.8]])), A.fin));
    for (const x of [-3.4, 3.4]) out.push(h.ellipse(...V([x, 19.5]), 1.5 * k, 0.9 * k, A.plein));
    // la bouche fermée
    out.push(h.path(lisse(P([[-11, 31.5], [-5, 28.8], [0, 30], [5, 28.8], [11, 31.5]])), A.detail));
    out.push(h.path(lisse(P([[-11, 31.5], [-5, 32.6], [0, 32.2], [5, 32.6], [11, 31.5]])), A.arete));
    out.push(h.path(lisse(P([[-7.5, 35.5], [0, 37.8], [7.5, 35.5]])), A.detail));
    // l'anneau des lèvres de l'aide : il cache les joues et laisse voir, dedans, le nez et la bouche
    const c = V(LEVRES.c);
    const ext = ellipseD(c, LEVRES.ext[0] * k, LEVRES.ext[1] * k), int = ellipseD(c, LEVRES.int[0] * k, LEVRES.int[1] * k);
    out.push(h.path(`${ext} ${int}`, `${A.blanc} fill-rule="evenodd"`));
    out.push(h.path(ext, A.contour));
    out.push(h.path(int, A.arete));
    return out.join('\n');
  };
  const posD = (z, p) => cadre(z, ...CADRE_D).V(p);
  const surLevres = (deg) => [LEVRES.c[0] + LEVRES.ext[0] * Math.cos(deg * RAD), LEVRES.c[1] + LEVRES.ext[1] * Math.sin(deg * RAD)];

  return {
    ref: '29-05',
    titre: 'Ventiler un nouveau-né',
    desc: 'Quatre vues d’un nouveau-né couché sur le dos sur une planche couverte d’un linge chaud, le ventre et les jambes sous une couverture, la poitrine découverte. En haut à gauche, de profil, le bon placement : une serviette roulée, vue par le bout, sous les épaules ; la tête posée droite, le nez vers le plafond. En haut à droite, le même bébé, la tête renversée loin en arrière, le menton pointé vers le haut et le devant du cou étiré : le raté, qui referme la gorge. En bas à gauche, le visage du bébé vu d’en haut, les yeux fermés : un anneau épais, les lèvres de l’aide, enferme ensemble son nez et sa bouche. En bas à droite, le bébé de profil, la tête droite : un tireté et une flèche montrent la poitrine qui se soulève à chaque bouffée. Encadré danger : jamais l’air de la poitrine.',
    format: 'pleine',
    disposition: [['bon', 'rate'], ['dessus', 'souffler']],
    hauteurs: [37, 63],
    largeurs: [[1, 1], [5, 7]],
    vues: {
      bon: {
        titre: 'La tête droite',
        dessin: z => vignette(z, A0, CADRE, XC).svg,
        renvois: z => [
          { n: 1, rond: [z.l - 14, z.h - 12], cible: posC(z, [170, 22]), texte: 'surface ferme, linge chaud' },
          { n: 2, rond: posC(z, [30, 30]), cible: posC(z, [70, -8]), texte: 'linge roulé sous les épaules' },
          { n: 3, rond: posC(z, [-40, -148]), cible: pos(z, A0, NEZ), texte: 'le nez vers le plafond' },
          { n: 4, rond: posC(z, [150, -146]), cible: posC(z, [118, -108]), texte: 'poitrine nue, le reste couvert' },
        ],
      },
      rate: {
        titre: 'Raté : la tête renversée',
        dessin: z => {
          const g = posC(z, mil(poseTete(A_RATE)(GORGE), FACE[0]));   // là où la gorge se referme
          return vignette(z, A_RATE, CADRE, XC).svg + '\n' + h.controle(g[0], g[1] + 6, 16);
        },
        renvois: z => [
          // sur le devant du cou étiré, entre le menton et le haut de la poitrine
          { n: 5, rond: posC(z, [120, -146]), cible: posC(z, mil(poseTete(A_RATE)(GORGE), FACE[0])), texte: 'la gorge se referme' },
        ],
      },
      dessus: {
        titre: 'Souffler, vu d’en haut',
        dessin: dessus,
        renvois: z => [
          { n: 6, rond: posD(z, [48, 60]), cible: posD(z, surLevres(35)), texte: 'bouche sur bouche et nez' },
        ],
      },
      souffler: {
        titre: 'Souffler, de profil',
        dessin: souffler,
        renvois: z => {
          const { V } = cadre(z, ...CADRE_P);
          return [
            { n: 7, rond: V([170, -150]), cible: V([120, leve([120, -109])[1]]), texte: 'la poitrine se soulève' },
          ];
        },
      },
    },
    danger: 'Danger — jamais l’air de la poitrine : on ne souffle que ce que les joues gonflées contiennent. Trop d’air déchire les poumons d’un nouveau-né.',
  };
};
