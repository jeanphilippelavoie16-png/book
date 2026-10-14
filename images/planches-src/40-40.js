// Planche 40-40 — Le tableau de cailloux et le calendrier des enfants (ch. 40, §9 et tableau de
// remplacement). Ce que le chapitre dit, et rien d'autre :
//   - le tableau : une planche, une rainure creusée au couteau, un caillou par moment de la
//     journée (huit : lever, déjeuner, bois, dehors, dîner, cahier, souper, histoire) ; l'enfant
//     pousse le caillou d'un bout à l'autre ; des FORMES différentes, pas des couleurs ;
//   - les encoches au couteau sur un montant de porte, plus profondes tous les sept jours ;
//   - la corde à nœuds : un nœud par jour, un nœud double tous les sept, pendue à hauteur
//     d'enfant ; l'enfant défait celui de la journée, il sent dans sa main la longueur qui reste.
// Aucune mesure dans le chapitre : aucune cote. Le « nœud double » est dessiné comme deux nœuds
// simples serrés l'un contre l'autre.
// La charte : le versant de la rainure à l'ombre, en gris d'ombre (il était en traits fins) ; la
// porte, en retrait derrière le montant, en gris loin. Les encoches gardent leur versant noir : à
// cette taille, un gris s'y perdrait. Le rouge : la poussée du caillou du moment (le geste).
module.exports = (h) => {
  const A = h.a, F = h.formes, I = F._interne;
  const courbe = (pts, attrs, ferme = true) => h.path(I.ser(I.lisse(pts, ferme), p => p), attrs);
  const tour = (n, f) => Array.from({ length: n }, (_, i) => f(2 * Math.PI * i / n));

  // ─── les huit cailloux, vus de dessus (unités de la vue en plan) ──────────────────────
  const sg = v => (v < 0 ? -1 : 1);
  const CAILLOUX = {
    rond: tour(12, t => [13 * Math.cos(t), 13 * Math.sin(t)]),
    long: tour(14, t => [19 * Math.cos(t), 9.5 * Math.sin(t)]),
    triangle: tour(6, t => { const r = t % (2 * Math.PI / 3) < 1e-6 ? 15.5 : 8.6; return [r * Math.cos(t) - 2.5, r * Math.sin(t)]; }),
    carre: tour(16, t => [12 * sg(Math.cos(t)) * Math.abs(Math.cos(t)) ** 0.35, 12 * sg(Math.sin(t)) * Math.abs(Math.sin(t)) ** 0.35]),
    oeuf: tour(14, t => [15 * Math.cos(t), 11.5 * Math.sin(t) * (1 - 0.22 * Math.cos(t))]),
    haricot: [[-16, 2], [-14, -6.5], [-7, -10], [0, -5.5], [7, -10], [14, -6.5], [16, 2], [10, 9.5], [0, 11], [-10, 9.5]],
    losange: [[-19, 0], [-8, -7], [0, -11], [8, -7], [19, 0], [8, 7], [0, 11], [-8, 7]],
    demiLune: [[-8, -12.5], [2, -12], [10, -7.5], [13.5, 0], [10, 7.5], [2, 12], [-8, 12.5], [-9.5, 0]],
  };
  const caillou = (nom, x, y, echelle = 1) => {
    const pts = CAILLOUX[nom].map(([a, b]) => [x + a * echelle, y + b * echelle]);
    return [courbe(pts, A.blanc), courbe(pts, A.hachure('pierre', 'arete'))].join('\n');
  };

  // ─── la vue en plan : le tableau ───────────────────────────────────────────────────────
  const plan = z => {
    const x0 = 6, x1 = z.l - 6, cy = z.h / 2, bw = 34, g = 15;
    const xs = x0 + 14, xe = x1 - 14;
    const pas = 40;
    const gauche = ['long', 'carre', 'haricot', 'oeuf'].map((n, i) => [n, xs + 25 + i * pas]);
    const droite = ['triangle', 'losange', 'demiLune'].map((n, i) => [n, xe - 25 - i * pas]);
    const xm = Math.round((gauche[3][1] + droite[2][1]) / 2);
    return { x0, x1, cy, bw, g, xs, xe, gauche, droite, xm };
  };
  const dessinPlan = z => {
    const P = plan(z), { x0, x1, cy, bw, g, xs, xe, xm } = P, out = [];
    out.push(h.rect(x0, cy - bw, x1 - x0, 2 * bw, A.blanc), h.rect(x0, cy - bw, x1 - x0, 2 * bw, A.contour));
    // le fil du bois, de part et d'autre de la rainure
    [-27, -20.5, 20.5, 27].forEach((dy, j) => {
      const pts = [];
      for (let x = x0 + 4; x <= x1 - 4; x += 36) pts.push([x, cy + dy + 1.1 * Math.sin(x / 47 + j * 1.7)]);
      pts.push([x1 - 4, cy + dy + 1.1 * Math.sin((x1 - 4) / 47 + j * 1.7)]);
      out.push(courbe(pts, A.fin, false));
    });
    // la rainure : bords, fond, et le versant dans l'ombre
    out.push(h.rect(xs + g, cy - g, xe - xs - 2 * g, g, A.ombre));
    out.push(h.path(`M${xs + g} ${cy - g} L${xe - g} ${cy - g} A${g} ${g} 0 0 1 ${xe - g} ${cy + g} L${xs + g} ${cy + g} A${g} ${g} 0 0 1 ${xs + g} ${cy - g} Z`, A.arete));
    out.push(h.ligne(xs + g, cy, xe - g, cy, A.detail));
    // les cailloux
    P.gauche.forEach(([n, x]) => out.push(caillou(n, x, cy)));
    P.droite.forEach(([n, x]) => out.push(caillou(n, x, cy)));
    out.push(caillou('rond', xm, cy));
    // le geste : le caillou du moment glisse vers les moments passés
    out.push(h.geste(`M${xm + 18} ${cy} L${xm + 50} ${cy}`));
    // le trait de coupe
    const t = 12;
    out.push(h.ligne(xm, cy - bw - 3, xm, cy - bw - 3 - t, A.contour), h.ligne(xm, cy + bw + 3, xm, cy + bw + 3 + t, A.contour));
    out.push(h.fleche(`M${xm} ${cy - bw - 3 - t} L${xm - 11} ${cy - bw - 3 - t}`, A.arete), h.fleche(`M${xm} ${cy + bw + 3 + t} L${xm - 11} ${cy + bw + 3 + t}`, A.arete));
    return out.join('\n');
  };

  // ─── la coupe, au caillou poussé (échelle double de la vue en plan) ───────────────────
  const coupe = z => {
    const cx = z.l / 2, haut = z.h / 2 + 8, bw = 68, g = 30, d = 21, ep = 38, r = 26;
    const alpha = Math.atan(g / d);
    const yc = haut + d - r / Math.sin(alpha);
    return { cx, haut, bw, g, d, ep, r, yc };
  };
  const dessinCoupe = z => {
    const C = coupe(z), { cx, haut, bw, g, d, ep, r, yc } = C;
    const planche = [[cx - bw, haut], [cx - g, haut], [cx, haut + d], [cx + g, haut], [cx + bw, haut], [cx + bw, haut + ep], [cx - bw, haut + ep]];
    return [
      h.chemin(planche, A.hachure('bois', 'contour'), true),
      h.cercle(cx, yc, r, A.blanc), h.cercle(cx, yc, r, A.hachure('pierre', 'contour')),
    ].join('\n');
  };

  // ─── les encoches au montant de porte ──────────────────────────────────────────────────
  const encoches = z => {
    const jx = Math.round(z.l * 0.3), jw = 40, yF = z.h - 8, pas = 15, y0 = Math.round(z.h * 0.16);
    const n = 16;
    const liste = Array.from({ length: n }, (_, i) => {
      const semaine = (i + 1) % 7 === 0;
      return { y: y0 + i * pas, a: semaine ? 5.5 : 2.6, b: semaine ? 11 : 4.5, semaine };
    });
    return { jx, jw, yF, liste };
  };
  const dessinEncoches = z => {
    const E = encoches(z), { jx, jw, yF, liste } = E, out = [];
    const xr = jx + jw;
    // le mur de planches, à gauche
    for (let y = 26; y < yF; y += 26) out.push(h.ligne(4, y, jx, y, A.detail));
    // la porte, en retrait à droite : planches verticales, poignée ; elle recule, en gris loin
    out.push(h.rect(xr + 6, 4, z.l - 4 - xr - 6, yF - 3 - 4, A.loin));
    out.push(h.ligne(xr + 6, 4, xr + 6, yF, A.arete));
    for (let x = xr + 6 + 26; x < z.l - 4; x += 26) out.push(h.ligne(x, 4, x, yF - 3, A.detail));
    out.push(h.ligne(xr + 6, yF - 3, z.l - 4, yF - 3, A.detail));
    out.push(h.rect(z.l - 22, z.h * 0.66, 9, 34, A.blanc), h.rect(z.l - 22, z.h * 0.66, 9, 34, A.arete));
    // le montant : l'arête de droite porte les encoches
    const bord = [[xr, 4]];
    liste.forEach(e => bord.push([xr, e.y - e.a], [xr - e.b, e.y], [xr, e.y + e.a]));
    bord.push([xr, yF]);
    out.push(h.chemin([[jx, 4], [jx, yF]], A.contour), h.chemin(bord, A.contour));
    // le fil du bois du montant
    [10, 19, 29].forEach((dx, j) => {
      const pts = [];
      for (let y = 8; y <= yF - 4; y += 40) pts.push([jx + dx + 1.2 * Math.sin(y / 53 + j * 2.1), y]);
      out.push(courbe(pts, A.fin, false));
    });
    // chaque encoche : le versant du haut dans l'ombre
    liste.forEach(e => {
      out.push(h.chemin([[xr, e.y - e.a], [xr - e.b, e.y], [xr, e.y]], A.plein, true));
      out.push(h.ligne(xr - e.b, e.y, xr, e.y, A.fin));
    });
    // le plancher
    out.push(h.ligne(4, yF, z.l - 4, yF, A.contour));
    return out.join('\n');
  };

  // ─── la corde à nœuds ─────────────────────────────────────────────────────────────────
  // Le nœud simple : le trèfle ouvert de la feuille d'essai (trois croisements, dessus et dessous
  // alternés), tourné d'un quart de tour : les deux bouts partent à gauche, l'un vers le haut,
  // l'autre vers le bas, et la corde reprend à x = cx ; le nœud pend à droite de la corde.
  // Il est coupé en six morceaux aux fractions 0,1 · 0,3 · 0,5 · 0,7 · 0,9 : les deux passages de
  // chaque croisement (0,04/0,55 · 0,15/0,85 · 0,45/0,96) tombent dans deux morceaux qui ne se
  // touchent pas, sinon le brin du dessous se coupe jusqu'au raccord.
  const noeud = (cx, cy, k) => {
    const n = 40, t0 = Math.PI + 0.55, t1 = 3 * Math.PI - 0.55, K = [];
    for (let i = 0; i <= n; i++) {
      const t = t0 + (t1 - t0) * i / n;
      const X = Math.sin(t) + 2 * Math.sin(2 * t), Y = Math.cos(t) - 2 * Math.cos(2 * t);
      K.push([cx + k * (Y + 2.8), cy - k * X, -Math.sin(3 * t), i / n]);
    }
    const P = (a, b) => K.filter(q => q[3] >= a - 1e-9 && q[3] <= b + 1e-9).map(q => q.slice(0, 3));
    return [[[cx, cy - 3.4 * k, 0], [cx + 0.25 * k, cy - 1.95 * k, 0], ...P(0, 0.1)], P(0.1, 0.3), P(0.3, 0.5), P(0.5, 0.7), P(0.7, 0.9),
      [...P(0.9, 1), [cx + 0.25 * k, cy + 1.95 * k, 0], [cx, cy + 3.4 * k, 0]]];
  };
  // une corde verticale à x = cx, qui part des points debut, avec un nœud à chaque hauteur de ys
  // (un nœud double = deux nœuds serrés l'un contre l'autre) ; rend la liste des brins
  const corde = (cx, debut, ys, k, yBas, o) => {
    const brins = [];
    let cur = debut.map(p => p.slice());
    ys.forEach(y => {
      const m = noeud(cx, y, k);
      // deux nœuds serrés : la corde ne revient pas à la verticale entre les deux
      if (Math.abs(cur[cur.length - 1][1] - m[0][0][1]) < k) m[0].shift();
      cur.push(...m[0]); brins.push(cur); brins.push(...m.slice(1, -1)); cur = m[m.length - 1]; });
    cur.push([cx, yBas, 0]); brins.push(cur);
    // chaque morceau s'arrête 0,3 avant le suivant : pas de faux croisement au raccord
    brins.forEach((p, i) => {
      if (i === brins.length - 1) return;
      const a = p[p.length - 2], c = p[p.length - 1] = p[p.length - 1].slice(), L = Math.hypot(c[0] - a[0], c[1] - a[1]), f = 0.3 / L;
      c[0] -= (c[0] - a[0]) * f; c[1] -= (c[1] - a[1]) * f;
    });
    return brins.map((pts, i) => ({ pts, ep: o.ep, torons: o.torons, debut: i === 0 ? o.debut : 'ouvert', fin: i === brins.length - 1 ? o.fin : 'ouvert' }));
  };
  const pendue = z => {
    // onze jours ; le 2e et le 9e (du haut) sont doubles : six nœuds simples entre les deux
    const cx = Math.round(z.l * 0.36), nx = cx - 3.2, yN = 16, k = 2.1, pas = 30.5, dbl = 7 * k;
    const ys = [];
    let y = 76;
    for (let i = 1; i <= 11; i++) {
      ys.push(y);
      if (i === 2 || i === 9) { y += dbl; ys.push(y); }
      y += pas;
    }
    return { cx, nx, yN, k, ys, yBas: ys[ys.length - 1] + 30 };
  };
  const dessinCorde = z => {
    const C = pendue(z), { cx, nx, yN, k, ys, yBas } = C, out = [];
    // la planche du mur, le clou
    out.push(h.rect(6, 4, z.l - 12, 24, A.blanc), h.rect(6, 4, z.l - 12, 24, A.arete));
    out.push(h.ligne(10, 11, z.l - 10, 10, A.fin), h.ligne(10, 22, z.l - 10, 23, A.fin));
    // l'œil passé sur le clou (le bout revient le long de la corde), puis la corde et ses nœuds
    const oeil = [[cx - 6.4, 53, 0], [cx - 6.4, 43, 0], [cx - 8.4, 28, 0], [nx - 5, yN + 1, 0], [nx, yN - 3.2, 0], [nx + 5, yN + 1, 0], [cx + 1.4, 28, 0], [cx, 42, 0], [cx, 52, 0]];
    out.push(F.cordes(corde(cx, oeil, ys, k, yBas, { ep: 2.6, debut: 'coupe', fin: 'libre' }), { jeu: 0.7 }));
    // la tête du clou, devant la corde ; quatre tours de ficelle serrent l'œil
    out.push(h.cercle(nx, yN, 3, A.blanc), h.cercle(nx, yN, 3, A.arete));
    out.push(F.cordes([43, 45.6, 48.2, 50.8].map(y => ({ pts: [[cx - 9, y + 1.2], [cx + 2.6, y - 1.2]], ep: 1.8, debut: 'coupe', fin: 'coupe' })), { trait: 'detail' }));
    return out.join('\n');
  };

  // ─── le détail : le nœud et le nœud double ─────────────────────────────────────────────
  // Le détail, en grand : chaque corde est UN seul brin continu (la hachure ne s'interrompt
  // nulle part) ; la hauteur z de chaque point décide du dessus/dessous aux trois croisements.
  // Le nœud double : les deux nœuds simples se touchent, sans longueur de corde entre eux.
  const noeuds = z => {
    const k = 12, ep = 5.5, xA = 14, xB = Math.round(z.l * 0.5) + 4, ecart = 6 * k;
    const yB1 = z.h / 2 - ecart / 2, yB2 = z.h / 2 + ecart / 2;
    return { k, ep, xA, xB, yA: z.h / 2, yB1, yB2, ecart };
  };
  const brinContinu = (cx, ys, k, haut, bas) => {
    const pts = [[cx, haut, 0]];
    ys.forEach((y, j) => {
      const m = noeud(cx, y, k).flat();
      // entre deux nœuds serrés : on saute le retour à la verticale
      const a = j > 0 ? 1 : 0, b = j < ys.length - 1 ? m.length - 1 : m.length;
      pts.push(...m.slice(a, b));
    });
    pts.push([cx, bas, 0]);
    // points doublés aux raccords des morceaux
    return pts.filter((p, i) => i === 0 || Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) > 0.5);
  };
  const dessinNoeuds = z => {
    const N = noeuds(z), { k, ep, xA, xB } = N;
    const o = { ep, torons: true, debut: 'fixe', fin: 'fixe' };
    return [
      F.cordes([{ pts: brinContinu(xA, [N.yA], k, N.yA - 6.5 * k, N.yA + 6.5 * k), ...o }], { jeu: 2 }),
      F.cordes([{ pts: brinContinu(xB, [N.yB1, N.yB2], k, N.yB1 - 6.5 * k, N.yB2 + 6.5 * k), ...o }], { jeu: 2 }),
    ].join('\n');
  };

  return {
    ref: '40-40',
    titre: 'Le tableau de cailloux, les encoches et la corde à nœuds',
    desc: 'Une planche à rainure où l’enfant pousse un caillou par moment de la journée, chaque caillou d’une forme à lui ; les jours comptés en encoches sur un montant de porte, ou en nœuds sur une corde pendue à sa hauteur.',
    format: 'pleine',
    disposition: [['plan', 'coupe'], ['encoches', 'corde', 'noeuds']],
    hauteurs: [1, 2.9],
    largeurs: [[3.1, 1], [1.15, 0.85, 1.1]],
    vues: {
      plan: {
        titre: 'Le tableau de cailloux, vu de dessus',
        dessin: dessinPlan,
        renvois: z => {
          const P = plan(z), { cy, bw, g, xm } = P;
          const [, xg2] = P.gauche[1], [, xd] = P.droite[1];
          const xr = Math.round((P.gauche[3][1] + 16 + xm - 13) / 2);
          return [
            { n: 1, rond: [xg2 - 22, cy - bw - 16], cible: [xg2 - 4, cy - 9], texte: 'un caillou par moment, chacun de sa forme' },
            { n: 2, rond: [xr - 6, cy - bw - 16], cible: [xr, cy - g + 2], texte: 'rainure creusée au couteau' },
            { n: 3, rond: [xm + 44, cy + bw + 17], cible: [xm + 34, cy + 2], texte: 'l’enfant pousse le caillou du moment' },
            { n: 4, rond: [xd + 26, cy + bw + 17], cible: [xd + 6, cy + 6], texte: 'moments passés' },
          ];
        },
      },
      coupe: {
        titre: 'En coupe, au caillou poussé',
        dessin: dessinCoupe,
      },
      encoches: {
        titre: 'Les encoches au montant de porte',
        dessin: dessinEncoches,
        renvois: z => {
          const E = encoches(z), { jx, jw, liste } = E, xr = jx + jw;
          const e3 = liste[2], e7 = liste[6];
          return [
            { n: 5, rond: [14, liste[12].y + 20], cible: [jx + 16, liste[12].y + 26], texte: 'montant de porte' },
            { n: 6, rond: [z.l - 16, e3.y - 22], cible: [xr - 2, e3.y], texte: 'une encoche au couteau par jour' },
            { n: 7, rond: [z.l - 16, e7.y + 26], cible: [xr - 4, e7.y + 1], texte: 'tous les sept jours, plus profonde' },
          ];
        },
      },
      corde: {
        titre: 'La corde à nœuds',
        dessin: dessinCorde,
        renvois: z => {
          const C = pendue(z), { cx, nx, yN, k, ys } = C, dernier = ys[ys.length - 1];
          return [
            { n: 8, rond: [z.l - 14, 46], cible: [nx + 3, yN - 1], texte: 'au clou, à hauteur d’enfant' },
            { n: 9, rond: [14, (ys[5] + ys[6]) / 2], cible: [cx - 1, (ys[5] + ys[6]) / 2], texte: 'la longueur qui reste, sentie à la main' },
            { n: 10, rond: [z.l - 14, dernier - 16], cible: [cx + 3.6 * k, dernier + 1], texte: 'le nœud du jour : l’enfant le défait' },
          ];
        },
      },
      noeuds: {
        titre: 'Le nœud et le nœud double, en grand',
        dessin: dessinNoeuds,
        renvois: z => {
          const N = noeuds(z), { k, xA, xB } = N;
          return [
            { n: 11, rond: [xA + 5.4 * k, N.yA - 5.4 * k], cible: [xA + 3.2 * k, N.yA - 2.75 * k], texte: 'un nœud par jour' },
            { n: 12, rond: [z.l - 14, (N.yB1 + N.yB2) / 2 + 3 * k], cible: [xB + 4.2 * k, (N.yB1 + N.yB2) / 2], texte: 'un nœud double tous les sept jours' },
          ];
        },
      },
    },
  };
};
