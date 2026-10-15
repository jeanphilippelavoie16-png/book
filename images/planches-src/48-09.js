// Planche 48-09. Le collet à ressort et son déclencheur (chapitre 48, §9 « Le collet à ressort, quand la
// ligne ne se relève pas tous les jours »).
// Le chapitre : un jeune bouleau ou une épinette souple, plié vers le sentier et retenu par un déclencheur :
// un crochet taillé dans un piquet fiché à côté de la piste, et un bâtonnet en travers qui porte la tension.
// La bête entre dans la boucle, tire, le bâtonnet lâche, l'arbre se redresse et lève l'animal de terre.
// Le déclencheur gèle : il se retaille à sec et se remonte à chaque tournée.
// Refaite le 15 octobre 2026 (inventaire des planches : aucune vue « déclenché », trajet arbre, bâtonnet,
// boucle illisible, lièvre de livre d'enfant). Armé et déclenché côte à côte, même cadrage, vus dans l'axe
// du sentier (la neige coupée en travers, comme à la 48-10) : l'arbre, la corde, le bâtonnet sous le crochet
// du piquet, le fil, la boucle, tout dans un même plan. Déclenché : l'arbre droit, le bâtonnet pendu à la
// corde, la boucle serrée en l'air, le crochet vide. Pas d'animal : la boucle serrée dit la prise. En bas, le
// crochet et le bâtonnet de près (le dessin de la planche d'avant, repris tel quel).
// Le chapitre ne donne aucune mesure du montage. Proportions de dessin : sentier de 25 cm,
// bâtonnet gros comme un doigt. La boucle porte ses 10 cm (ch. 48, étape 4) : c'est l'échelle.
module.exports = (h) => {
  const r1 = (v) => Math.round(v * 10) / 10;
  const pf = (p) => `${r1(p[0])} ${r1(p[1])}`;
  const blanc = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');
  const neige = h.a.hachure('neige', 'aucun');
  const lisse = (P, ferme = false) => {
    const n = P.length, g = (i) => (ferme ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))]);
    let d = `M${pf(P[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C${pf([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${pf([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pf(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  const bez = (P, t) => { const u = 1 - t; return [0, 1].map((k) => u * u * u * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t * t * t * P[3][k]); };
  const tanB = (P, t) => {
    const u = 1 - t;
    const d = [0, 1].map((k) => 3 * u * u * (P[1][k] - P[0][k]) + 6 * u * t * (P[2][k] - P[1][k]) + 3 * t * t * (P[3][k] - P[2][k]));
    const n = Math.hypot(d[0], d[1]); return [d[0] / n, d[1] / n];
  };

  // ─── La scène, dans l'axe du sentier ──────────────────────────────────────────────────────
  const K = 4.2;                                     // px par cm
  const geo = (z) => {
    const c = 118, w = 12.5 * K, yS = z.h - 64, yT = yS + 8 * K;
    const xP = c + w + 18, rP = 2.3 * K;             // le piquet, sur le bord droit du sentier
    const yH = yT - 23 * K;                          // la hauteur du bâtonnet, sous le crochet
    const xC = (c + xP) / 2 + 4;                     // la corde, sur le bâtonnet
    const R = 5 * K, yBoucle = yH + 6 * K + R;       // la boucle, sous le bout gauche du bâtonnet
    const xA = 22;                                   // le pied du bouleau, sur le bord gauche
    return { c, w, yS, yT, xP, rP, yH, xC, R, yBoucle, xA };
  };
  const coupe = (z, g) => {
    const { c, w, yS, yT } = g;
    const bord = [[0, yS], [c - w - 16, yS], [c - w - 5, yS + 7], [c - w, yT - 9], [c - w + 9, yT], [c + w - 9, yT], [c + w, yT - 9], [c + w + 5, yS + 7], [c + w + 16, yS], [z.l, yS]];
    return [h.path(`${lisse(bord)} L ${z.l} ${z.h - 2} L 0 ${z.h - 2} Z`, neige), h.path(lisse(bord), h.a.contour)].join('\n');
  };
  // le piquet, fiché dans le bord, le crochet taillé dans la face qui regarde le sentier
  const piquet = (g) => {
    const { xP, rP, yS, yH } = g, top = yH - 9 * K, e = 4;
    const xg = xP - rP, xd = xP + rP;
    const forme = [[xg, top], [xd, top], [xd, yS + 3], [xg, yS + 3], [xg, yH + 15], [xg + 6, yH - e + 1], [xg + 6, yH - e], [xg, yH - e]];
    return [
      h.chemin(forme, h.a.blanc, true),
      h.chemin([[xP + rP * 0.35, top + 1], [xd - 0.8, top + 1], [xd - 0.8, yS + 2], [xP + rP * 0.35, yS + 2]], h.a.ombre, true),
      h.chemin(forme, h.a.contour, true),
      h.ellipse(xP, top, rP, 2.6, h.a.detail),
    ].join('\n');
  };
  // un bâtonnet de a à b (centres), épais de e
  const baton = (a, b, e = 2 * K) => {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-u[1] * e / 2, u[0] * e / 2];
    return h.chemin([[a[0] + n[0], a[1] + n[1]], [b[0] + n[0], b[1] + n[1]], [b[0] - n[0], b[1] - n[1]], [a[0] - n[0], a[1] - n[1]]], blanc(h.a.contour), true);
  };
  // un arbre souple, effilé le long d'une courbe de Bézier ; des rameaux courts
  const arbre = (A) => {
    const larg = (t) => 11 * (1 - t) + 2.5 * t;
    const gch = [], drt = [];
    for (let i = 0; i <= 48; i++) {
      const t = i / 48, p = bez(A, t), T = tanB(A, t), wv = larg(t) / 2;
      gch.push([p[0] + T[1] * wv, p[1] - T[0] * wv]); drt.push([p[0] - T[1] * wv, p[1] + T[0] * wv]);
    }
    const o = [h.chemin([...gch, ...drt.reverse()], blanc(h.a.contour), true)];
    const ram = [];
    [[0.45, 1, 16], [0.62, -1, 14], [0.78, 1, 12], [0.9, -1, 9]].forEach(([t, s, L]) => {
      const p = bez(A, t), T = tanB(A, t), wv = larg(t) / 2;
      const b = [p[0] + s * T[1] * wv, p[1] - s * T[0] * wv];
      const d = [T[0] * 0.6 + s * T[1] * 0.8, T[1] * 0.6 - s * T[0] * 0.8];
      ram.push(`M ${pf(b)} Q ${pf([b[0] + d[0] * L * 0.5 + T[0] * 3, b[1] + d[1] * L * 0.5 + T[1] * 3])} ${pf([b[0] + d[0] * L, b[1] + d[1] * L])}`);
    });
    o.push(h.path(ram.join(' '), h.a.detail));
    return o.join('\n');
  };
  const corde = (a, b) => h.formes.corde([a, b], { ep: 2.6, torons: true, debut: 'coupe', fin: 'coupe' });

  // le bouleau plié, du bord gauche, par-dessus le sentier ; son bout au-dessus de la corde
  const courbeArme = (z) => {
    const { xC, yH, xA, yS } = geo(z);
    const tip = [xC + 10, yH - 20 * K];
    return { tip, A: [[xA, yS + 2], [xA - 6, 40], [tip[0] + 70, 6], tip] };
  };
  // un point sur le bord gauche de l'arbre armé, à t de sa longueur
  const bordArbre = (z, t) => {
    const { A } = courbeArme(z), p = bez(A, t), T = tanB(A, t), wv = (11 * (1 - t) + 2.5 * t) / 2;
    return [r1(p[0] + T[1] * wv), r1(p[1] - T[0] * wv)];
  };
  const arme = (z) => {
    const g = geo(z), o = [coupe(z, g), piquet(g)];
    const { c, xP, rP, yH, xC, R, yBoucle } = g;
    const { tip, A } = courbeArme(z);
    o.push(corde(tip, [xC, yH - 1]));
    o.push(arbre(A));
    // le bâtonnet : son bout droit sous le crochet, son bout gauche au-dessus du sentier
    o.push(baton([xP - rP + 4, yH], [c - 12, yH]));
    // les ligatures : la corde et le fil, sur le bâtonnet
    o.push(h.path([-2, 0, 2].map((k) => `M ${r1(xC + k - 1.4)} ${r1(yH - 5)} L ${r1(xC + k + 1.4)} ${r1(yH + 5)}`).join(' '), h.a.detail));
    // le fil et la boucle, au-dessus du milieu du sentier
    o.push(h.ligne(c - 6, yH + 4, c, yBoucle - R, h.a.arete));
    o.push(h.cercle(c, yBoucle, R, h.a.contour), h.cercle(c, yBoucle - R, 2.6, blanc(h.a.arete)));
    o.push(h.ligne(c - R - 4, yBoucle - R, c - R - 20, yBoucle - R, h.a.fin), h.ligne(c - R - 4, yBoucle + R, c - R - 20, yBoucle + R, h.a.fin));
    o.push(h.cote(c - R - 16, yBoucle - R, c - R - 16, yBoucle + R, '10 cm', { cote: 'gauche' }));
    o.push(h.controle(xP - rP + 2, yH, 11));
    return o.join('\n');
  };

  const courbeDecl = (z) => { const { xA, yS } = geo(z); return [[xA, yS + 2], [xA - 2, yS - 150], [xA + 40, 60], [118, 10]]; };
  const bordArbreDe = (A, t, s = 1) => {
    const p = bez(A, t), T = tanB(A, t), wv = (11 * (1 - t) + 2.5 * t) / 2;
    return [r1(p[0] + s * T[1] * wv), r1(p[1] - s * T[0] * wv)];
  };
  const declenche = (z) => {
    const g = geo(z), o = [coupe(z, g), piquet(g)];
    const { c, xP, rP, yH, R, xA, yS } = g;
    // l'arbre redressé, le bout penché vers le sentier ; la corde pend d'aplomb, le bâtonnet au bout
    const A = courbeDecl(z), tip = A[3];
    o.push(arbre(A));
    const att = [tip[0] + 1, tip[1] + 22 * K];
    o.push(corde([tip[0], tip[1] + 3], att));
    const bg = [att[0] - 22, att[1] + 24], bd = [att[0] + 32, att[1] - 12];
    o.push(baton(bg, bd));
    o.push(h.path([-2, 0, 2].map((k) => `M ${r1(att[0] + k - 1.4)} ${r1(att[1] - 5)} L ${r1(att[0] + k + 1.4)} ${r1(att[1] + 5)}`).join(' '), h.a.detail));
    // le fil et la boucle serrée, en l'air
    const yb = bg[1] + 6 * K + 12;
    o.push(h.ligne(bg[0] + 1, bg[1] + 5, bg[0] + 1, yb - 8, h.a.arete));
    o.push(h.ellipse(bg[0] + 1, yb, 5, 8, h.a.contour), h.cercle(bg[0] + 1, yb - 8, 2.4, blanc(h.a.arete)));
    // le mouvement de l'arbre : son bout, d'où il était armé jusqu'en haut
    const g0 = geo(z);
    o.push(h.fleche(`M ${r1(g0.xC + 16)} ${r1(g0.yH - 20 * K - 8)} C ${r1(g0.xC + 40)} ${r1(g0.yH - 160)} ${r1(tip[0] + 90)} 40 ${r1(tip[0] + 22)} 14`));
    o.push(h.controle(xP - rP + 2, yH, 11));
    return o.join('\n');
  };

  // ─── Le déclencheur, de près (dessin de la planche d'avant) ───────────────────────────────
  const detail = (z) => {
    const ox = Math.round(z.l / 2 - 140), oy = Math.round((z.h - 210) / 2);
    const byd = 110, e = 12, D = 62, x0 = 135, x1 = 185, xs = 162;   // épaulement : de x0 à xs, à byd - e
    const pente = (y) => xs - (xs - x0) * (y - (byd - e)) / D;
    const bout = pente(byd + e);
    const bas = 206;
    const out = [];
    out.push(h.ligne(57.5, 6, 57.5, byd - e, h.a.detail));
    out.push(h.ligne(62.5, 6, 62.5, byd - e, h.a.detail));
    const tors = [];
    for (let y = 10; y < byd - e - 4; y += 8) tors.push(`M 57.5 ${y + 5} C 59 ${y + 3} 61 ${y + 1.5} 62.5 ${y}`);
    out.push(h.path(tors.join(' '), h.a.detail));
    out.push(h.fleche(`M 36 ${byd - 40} L 36 ${byd - 95}`));
    const bat = [[bout, byd - e], [14, byd - e], [8, byd - 6], [16, byd], [8, byd + 6], [14, byd + e], [bout, byd + e]];
    out.push(h.chemin(bat, h.a.blanc, true));
    out.push(h.chemin([[10, byd + 4.5], [bout, byd + 4.5], [bout, byd + e], [14, byd + e], [8, byd + 6]], h.a.ombre, true));
    out.push(h.chemin(bat, h.a.contour, true));
    out.push(h.ligne(26, byd - 3, bout - 8, byd - 3, h.a.detail));
    out.push(h.ligne(20, byd + 6, bout - 30, byd + 6, h.a.detail));
    out.push(h.path([0, 1, 2].map((i) => `M ${52 + i * 7} ${byd - e - 2} L ${57 + i * 7} ${byd + e + 2}`).join(' '), h.a.arete));
    const pq = [[x0, 26], [x0 + 5, 20], [x1 - 5, 20], [x1, 26], [x1, bas], [172, bas - 5], [160, bas + 4], [147, bas - 4], [x0, bas + 1],
      [x0, byd - e + D], [xs, byd - e], [x0, byd - e]];
    out.push(h.chemin(pq, h.a.blanc, true));
    out.push(h.chemin([[171, 20], [x1 - 5, 20], [x1, 26], [x1, bas], [172, bas - 5]], h.a.ombre, true));
    out.push(h.chemin(pq, h.a.contour, true));
    const sous = (x) => byd - e + (xs - x) / (xs - x0) * D;
    [[148, 30, byd - e - 6], [148, sous(148) + 6, bas - 10], [160, 30, byd - e - 6], [160, sous(160) + 6, bas - 10], [174, 30, bas - 10]].forEach(([x, y1, y2]) => {
      out.push(h.path(`M ${x} ${y1} C ${x - 2} ${(2 * y1 + y2) / 3} ${x + 2} ${(y1 + 2 * y2) / 3} ${x} ${y2}`, h.a.detail));
    });
    out.push(h.controle((xs + bout) / 2, byd, 19));
    return `<g transform="translate(${ox} ${oy})">\n${out.join('\n')}\n</g>`;
  };

  return {
    ref: '48-09',
    titre: 'Le collet à ressort et son déclencheur',
    desc: 'Deux vues côte à côte, même cadrage, dans l’axe du sentier, la neige coupée en travers. Armé : un jeune bouleau planté au bord gauche du sentier est plié par-dessus ; de son bout, une corde descend à un bâtonnet posé en travers au-dessus du sentier, dont le bout droit est coincé sous le crochet taillé dans un piquet fiché au bord droit ; du bout gauche du bâtonnet pend le fil, et la boucle ouverte au-dessus du milieu du sentier. Déclenché : la bête a tiré, le bâtonnet a lâché le crochet, le bouleau s’est redressé ; le bâtonnet pend à la corde au bout de l’arbre, et la boucle serrée est montée en l’air ; le crochet du piquet est vide. En bas, le crochet et le bâtonnet de près : le dessus du bâtonnet bute sous l’épaulement, son bout repose sur le pan incliné ; c’est là que tout se décide, et là que ça gèle.',
    format: 'pleine',
    disposition: [['arme', 'declenche'], ['detail']],
    hauteurs: [3.1, 1.6],
    vues: {
      arme: {
        titre: 'Armé',
        dessin: arme,
        renvois: (z) => {
          const g = geo(z);
          return [
            { n: 1, rond: [16, 60], cible: bordArbre(z, 0.3), texte: 'jeune bouleau plié vers le sentier' },
            { n: 2, rond: [g.xC + 40, g.yH - 52], cible: [g.xC + 6, g.yH - 40], texte: 'corde du bout de l’arbre au bâtonnet' },
            { n: 3, rond: [z.l - 14, g.yH - 52], cible: [g.xP + g.rP - 1, g.yH - 30], texte: 'piquet fiché au bord du sentier' },
            { n: 4, rond: [g.c - 34, g.yH - 30], cible: [g.c - 6, g.yH - 4], texte: 'bâtonnet coincé sous le crochet' },
            { n: 5, rond: [g.c + 46, g.yBoucle + 6], cible: [g.c + g.R, g.yBoucle + 2], texte: 'la boucle, pendue au bâtonnet' },
          ];
        },
      },
      declenche: {
        titre: 'Déclenché',
        dessin: declenche,
        renvois: (z) => {
          const g = geo(z);
          return [
            { n: 6, rond: [g.xP - 40, g.yH + 34], cible: [g.xP - g.rP + 3, g.yH + 4], texte: 'le bâtonnet a lâché le crochet' },
            { n: 7, rond: [bordArbreDe(courbeDecl(z), 0.42, -1)[0] + 42, bordArbreDe(courbeDecl(z), 0.42, -1)[1] + 80], cible: bordArbreDe(courbeDecl(z), 0.42, -1), texte: 'l’arbre redressé lève la bête' },
          ];
        },
      },
      detail: {
        titre: 'Le crochet, de près',
        dessin: detail,
        renvois: (z) => {
          const ox = Math.round(z.l / 2 - 140), oy = Math.round((z.h - 210) / 2);
          return [
            { n: 8, rond: [ox + 250, oy + 60], cible: [ox + 186, oy + 70], texte: 'crochet taillé dans le piquet' },
            { n: 9, rond: [ox + 250, oy + 120], cible: [ox + 170, oy + 112], texte: 'le point qui gèle : retailler à sec' },
          ];
        },
      },
    },
  };
};
