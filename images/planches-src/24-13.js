// Planche 24-13 — La planche d'équilibre sur demi-bûche, et la progression mur, couverture, planche.
// Chapitre 24, section 9 (« Les poids, la planche d'équilibre ») et point 47 (« Remettre en charge
// tôt »). Le chapitre ne donne aucune mesure : aucune cote. Les proportions du dessin (planche
// 600 × 300 × 25, bûche de 150 de diamètre) ne sont que des proportions, rien ne s'imprime.
//
// Le pictogramme debout sur un pied n'existe pas dans formes.js : la pose « unPied » est ajoutée
// à la volée à une copie en mémoire de la bibliothèque (le fichier n'est pas touché), pour garder
// les mêmes proportions et le même trait que les autres personnages. La main du mur est la main
// « appui » de profil de formes.js, tournée contre le mur (JP, 12 octobre : « pas de main »).
'use strict';
const fs = require('fs');
const path = require('path');

module.exports = (h) => {
  // ─── le personnage sur un pied ────────────────────────────────────────────────────────
  // Le pictogramme de formes.js (règle 8) n'a pas de pose sur un pied : « unPied » est ajoutée à
  // une copie en mémoire de la bibliothèque (le fichier n'est pas touché), avec une ancre « pied »
  // qui pose le personnage sur la cheville de la jambe qui porte.
  const src = fs.readFileSync(path.join(__dirname, '..', '..', '.claude', 'skills', 'planches', 'scripts', 'formes.js'), 'utf8');
  const marque = 'const POSES_P = {', ancre = '(jp.A[0] + jl.A[0]) / 2';
  if (!src.includes(marque) || !src.includes(ancre)) throw new Error('formes.js : POSES_P ou l’ancre des pieds introuvable');
  // la jambe proche porte ; la loin plie au genou, le pied levé derrière, la pointe vers le bas
  const POSE = `unPied: { t: 3, regard: 4, ancre: 'pied', proche: [2, 2, 0], loin: [-4, -72, 100], bras: { proche: [20, 60], loin: [8, 24] } },\n`;
  const mod = { exports: {} };
  new Function('module', 'exports', 'require', src.replace(marque, marque + '\n' + POSE)
    .replace(ancre, `(P.ancre === 'pied' ? jp.A[0] : ${ancre})`))(mod, mod.exports, require);
  const F = mod.exports(h);

  // ─── la planche et la demi-bûche (mm) ─────────────────────────────────────────────────
  const L = 600, T = 25, R = 75, W = 300;
  // bascule en roulant sans glisser sur le dos rond : angle où le bout touche le sol
  let th = 0;
  for (let a = 0; a < 0.6; a += 0.0005) { if (R * Math.cos(a) - (L / 2 - R * a) * Math.sin(a) <= 0) { th = a; break; } }
  const planchePenchee = () => {
    const P = [R * Math.sin(th), R * Math.cos(th)], d = [Math.cos(th), -Math.sin(th)], n = [Math.sin(th), Math.cos(th)];
    const M = [P[0] - R * th * d[0], P[1] - R * th * d[1]];
    const b0 = [M[0] - L / 2 * d[0], M[1] - L / 2 * d[1]], b1 = [M[0] + L / 2 * d[0], M[1] + L / 2 * d[1]];
    return [b0, b1, [b1[0] + T * n[0], b1[1] + T * n[1]], [b0[0] + T * n[0], b0[1] + T * n[1]]];
  };

  // repère commun aux deux vues du haut : même échelle, même sol
  const geoHaut = z => {
    // largeurs des deux vues du haut (disposition [2.3, 1] sur 578) : l'échelle vaut pour les deux
    const LF = Math.floor(578 * 2.3 / 3.3), LB = Math.floor(578 / 3.3);
    const s = Math.min((LF - 24) / L, (LB - 10) / W, (z.h - 40) / 190);
    const gy = Math.round((z.h + 185 * s) / 2 + 4);
    return { s, gy, X: (cx, x) => cx + x * s, Y: y => gy - y * s };
  };
  const sol = (z, gy) => [
    h.rect(6, gy, z.l - 12, 6, h.a.hachure('terre', 'aucun')),
    h.ligne(6, gy, z.l - 6, gy, h.a.arete),
  ].join('\n');

  // ── vue de côté : la bûche par le bout, la planche de long ──
  const cxFace = z => z.l / 2;
  const face = z => {
    const { s, gy, Y } = geoHaut(z), cx = cxFace(z), X = x => cx + x * s;
    const out = [sol(z, gy)];
    // la planche penchée, en fantôme : on la peint avant, la planche à plat la cache où elles se croisent
    out.push(h.chemin(planchePenchee().map(p => [X(p[0]), Y(p[1])]), h.a.cache, true));
    // la demi-bûche vue par le bout : écorce, cernes, fentes de séchage
    const arc = r => `M${X(-r)} ${gy} A${r * s} ${r * s} 0 0 1 ${X(r)} ${gy}`;
    out.push(h.path(arc(R) + ' Z', h.a.blanc), h.path(arc(R) + ' Z', h.a.contour));
    out.push(h.path(arc(R - 7), h.a.detail));
    for (const r of [56, 41, 27, 14]) out.push(h.path(arc(r), h.a.fin));
    out.push(h.ligne(X(0), gy, X(-30), Y(50), h.a.fin), h.ligne(X(0), gy, X(38), Y(44), h.a.fin));
    // la planche à plat
    out.push(h.rect(X(-L / 2), Y(R + T), L * s, T * s, h.a.blanc), h.rect(X(-L / 2), Y(R + T), L * s, T * s, h.a.contour));
    out.push(h.ligne(X(-270), Y(R + T * 0.55), X(-60), Y(R + T * 0.55), h.a.fin), h.ligne(X(40), Y(R + T * 0.4), X(250), Y(R + T * 0.4), h.a.fin));
    // la bascule : un arc autour de l'axe de la bûche, dans les deux sens
    const ra = R + T + 70, a0 = 64 * Math.PI / 180, a1 = 116 * Math.PI / 180;
    const pa = a => [X(ra * Math.cos(a)), Y(ra * Math.sin(a))];
    const [p0, p1] = [pa(a0), pa(a1)];
    out.push(h.path(`M${p1[0]} ${p1[1]} A${ra * s} ${ra * s} 0 0 1 ${p0[0]} ${p0[1]}`, h.a.arete + ' marker-start="url(#fl)" marker-end="url(#fl)"'));
    return out.join('\n');
  };
  const faceRenvois = z => {
    const { s, gy, Y } = geoHaut(z), cx = cxFace(z), X = x => cx + x * s;
    const ra = R + T + 70;
    return [
      { n: 1, rond: [X(-250), Y(34)], cible: [X(-250), Y(R + T * 0.3)], texte: 'la planche, posée à plat' },
      { n: 2, rond: [X(-140), Y(20)], cible: [X(-52), Y(12)], texte: 'bûche fendue en deux, face plate au sol' },
      { n: 3, rond: [X(ra * 0.62) + 14, Y(ra * 0.86)], cible: [X(ra * 0.42), Y(ra * 0.9)], texte: 'elle bascule d’un côté à l’autre sans rouler' },
    ];
  };

  // ── vue par le bout de la planche : la bûche de long, en travers sous la planche ──
  const bout = z => {
    const { s, gy, Y } = geoHaut(z), cx = z.l / 2, X = x => cx + x * s;
    const out = [sol(z, gy)];
    out.push(h.rect(X(-W / 2), Y(R), W * s, R * s, h.a.blanc), h.rect(X(-W / 2), Y(R), W * s, R * s, h.a.contour));
    // l'écorce : des gerçures en long, ondulées, plus serrées vers le dessus (c'est ce qui fait
    // lire le dos rond), et un nœud de branche
    const onde = (x0, x1, y, amp, ph) => {
      const pts = [];
      for (let x = x0; x <= x1; x += 6) pts.push([X(x), Y(y + amp * Math.sin((x + ph) / 17))]);
      return h.chemin(pts, h.a.fin);
    };
    const g = [[71, [[-146, -60], [-30, 120]]], [63, [[-120, -10], [20, 146]]], [52, [[-146, -80], [-50, 60]]],
      [38, [[-130, -30], [0, 30], [95, 146]]], [21, [[-146, -95], [-60, 70]]]];
    g.forEach(([y, segs], i) => segs.forEach(([x0, x1], j) => out.push(onde(x0, x1, y, 1.6, i * 11 + j * 29))));
    out.push(h.ellipse(X(62), Y(28), 12 * s, 8 * s, h.a.blanc), h.ellipse(X(62), Y(28), 12 * s, 8 * s, h.a.detail), h.ellipse(X(62), Y(28), 5 * s, 3.5 * s, h.a.fin));
    // le bout de la planche : les cernes du bois de bout
    out.push(h.rect(X(-W / 2), Y(R + T), W * s, T * s, h.a.blanc), h.rect(X(-W / 2), Y(R + T), W * s, T * s, h.a.contour));
    // bois de bout : trois cernes en arcs, le cœur de l'arbre sous la planche
    for (const r of [126, 134, 142]) {
      const xb = Math.sqrt(r * r - 120 * 120);
      out.push(h.path(`M${X(-xb)} ${Y(R)} A${r * s} ${r * s} 0 0 1 ${X(xb)} ${Y(R)}`, h.a.fin));
    }
    return out.join('\n');
  };

  // ─── la progression : mur, couverture, planche ────────────────────────────────────────
  const BL = 90;                     // épaisseur de la couverture pliée (proportion seulement)
  const geoBas = (z, sorte) => {
    const e = Math.min((z.h - 30) / 1950, (z.l - 10) / 1110);
    const gy = z.h - 14;
    const x0 = 6 + 470 * e;
    const haut = sorte === 'couv' ? (BL - 14) : sorte === 'planche' ? (R + T) : 0;
    const y0 = gy - haut * e;
    // le mur à portée de bras ; la main droite à plat sur le mur, les doigts vers le haut, à
    // hauteur de poitrine : elle ne pousse pas, elle est là au cas où
    const murX = x0 + 430 * e;
    const pers = F.personnage({ x: x0, y: y0, pose: 'unPied', echelle: e,
      prises: { proche: { x: murX, y: y0 - 1180 * e, pose: 'appui', vue: 'profil', angle: -90, bras: 30, echelle: 2.1 * e, trait: 'fort' } } });
    return { e, gy, x0, y0, pers, murX, murL: 120 * e };
  };
  const station = sorte => z => {
    const g = geoBas(z, sorte), { e, gy, x0 } = g;
    const out = [h.rect(4, gy, z.l - 8, 6, h.a.hachure('bois', 'aucun')), h.ligne(4, gy, z.l - 4, gy, h.a.arete)];
    const xp = x0 + 74 * e;          // le milieu du pied qui porte
    if (sorte === 'couv') {
      // couverture pliée en accordéon, quatre épaisseurs, écrasée sous le pied
      const c0 = xp - 240 * e, c1 = xp + 250 * e, ep = BL / 4 * e;
      const yk = k => gy - k * ep;
      const creux = (k, prof) => {
        const y = yk(k);
        return `M${c0} ${y} L${xp - 170 * e} ${y} C${xp - 110 * e} ${y} ${xp - 100 * e} ${y + prof} ${xp - 40 * e} ${y + prof} L${xp + 140 * e} ${y + prof} C${xp + 190 * e} ${y + prof} ${xp + 200 * e} ${y} ${xp + 240 * e} ${y} L${c1} ${y}`;
      };
      const r = ep / 2;
      const fond = `M${c0 - r} ${gy} L${c1 + r} ${gy} L${c1 + r} ${yk(4)} L${c0 - r} ${yk(4)} Z`;
      out.push(h.path(fond, h.a.blanc));
      // les plis : à droite entre 0-1 et 2-3, à gauche entre 1-2 et 3-4
      out.push(h.path(`M${c1} ${yk(0)} A${r} ${r} 0 0 0 ${c1} ${yk(1)}`, h.a.arete));
      out.push(h.path(`M${c0} ${yk(1)} A${r} ${r} 0 0 1 ${c0} ${yk(2)}`, h.a.arete));
      out.push(h.path(`M${c1} ${yk(2)} A${r} ${r} 0 0 0 ${c1} ${yk(3)}`, h.a.arete));
      out.push(h.path(`M${c0} ${yk(3)} A${r} ${r} 0 0 1 ${c0} ${yk(4)}`, h.a.arete));
      for (let k = 1; k <= 3; k++) out.push(h.path(creux(k, k * 3.5 * e), h.a.detail));
      out.push(h.path(creux(4, 14 * e), h.a.arete));
    }
    if (sorte === 'planche') {
      const X = x => xp + x * e, Y = y => gy - y * e;
      out.push(h.path(`M${X(-R)} ${gy} A${R * e} ${R * e} 0 0 1 ${X(R)} ${gy} Z`, h.a.blanc));
      out.push(h.path(`M${X(-R)} ${gy} A${R * e} ${R * e} 0 0 1 ${X(R)} ${gy} Z`, h.a.arete));
      out.push(h.path(`M${X(-40)} ${gy} A${40 * e} ${40 * e} 0 0 1 ${X(40)} ${gy}`, h.a.fin));
      out.push(h.rect(X(-L / 2), Y(R + T), L * e, T * e, h.a.blanc), h.rect(X(-L / 2), Y(R + T), L * e, T * e, h.a.arete));
    }
    out.push(g.pers);
    // le mur, en coupe
    out.push(h.rect(g.murX, 4, g.murL, gy - 4, h.a.hachure('bois', 'arete')));
    return out.join('\n');
  };
  const renvoisMur = z => {
    const g = geoBas(z, 'mur'), { e, gy, x0 } = g, m = g.pers.mains.proche;
    return [
      { n: 4, rond: [x0 + 330 * e, gy - 26], cible: [x0 + 150 * e, gy - 5], texte: 'le pied blessé, seul au sol' },
      { n: 5, rond: [m.trou.x - 26, m.trou.y - 80], cible: [m.trou.x - 9, m.trou.y - 2], texte: 'une main à plat sur le mur, prête' },
    ];
  };
  const renvoisCouv = z => {
    const g = geoBas(z, 'couv'), { e, gy, x0 } = g, xp = x0 + 74 * e;
    return [
      { n: 6, rond: [xp + 330 * e, gy - 40], cible: [xp + 250 * e, gy - BL / 2 * e], texte: 'une couverture pliée' },
    ];
  };

  return {
    ref: '24-13',
    titre: 'La planche d’équilibre sur demi-bûche',
    desc: 'Une planche posée à plat sur une bûche fendue en deux, face plate au sol, vue de côté et par le bout : elle bascule d’un côté à l’autre sans rouler. Puis la progression, debout sur le pied blessé, une main à plat sur le mur : au sol, sur une couverture pliée, puis sur la planche.',
    format: 'pleine',
    disposition: [['face', 'bout'], ['mur', 'couv', 'planche']],
    hauteurs: [1.25, 2],
    largeurs: [[2.3, 1], [1, 1, 1]],
    vues: {
      face: { titre: 'De côté', dessin: face, renvois: faceRenvois },
      bout: { titre: 'Par le bout de la planche', dessin: bout },
      mur: { titre: 'D’abord au sol, près d’un mur', dessin: station('mur'), renvois: renvoisMur },
      couv: { titre: 'Puis sur une couverture pliée', dessin: station('couv'), renvois: renvoisCouv },
      planche: { titre: 'Puis sur la planche', dessin: station('planche') },
    },
  };
};
