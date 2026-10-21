// Planche 84-04 — La pièce de la première nuit (chapitre 84, « Une pièce, pas le chalet »,
// « Le premier feu », « Où dorment les enfants la première nuit » ; le sac à fonte vient du
// ch. 3, §9, auquel le ch. 84 renvoie).
// Ce que dit le chapitre, et rien d'autre : on chauffe la pièce du poêle et on ferme les autres,
// une couverture de laine clouée au cadre fait une porte là où il n'y en a pas ; une entrée d'air
// reste ouverte en permanence (la fenêtre qu'on laisse entrouverte pour l'air) ; les enfants
// dorment dans la pièce du poêle, là où l'adulte de garde, assis, les voit sans se lever ;
// surélevés à hauteur de genou (un banc, la table, des caisses), jamais au plancher ; sur leur
// matelas de sol et dans leur sac ; l'avertisseur de voyage à leur tête, à 2 m ou plus du poêle,
// loin de la fenêtre ; le thermomètre dit quand l'air, à la hauteur où ils dormiront, a passé
// 4,4 °C ; le chaudron de neige bout couvercle mis ; le sac de neige suspendu à côté du poêle
// goutte dans une chaudière posée dessous.
// Refaite le 13 octobre 2026 avec les corps simples de profil : l'adulte debout près du lit, et
// l'enfant de 4 ans couché dans son sac (couche-dos, enfant4 : le gabarit, sous le sac et le
// capuchon ; on ne voit que le visage). Un seul rouge : le thermomètre à lire, à leur hauteur.
// Les deux vues sont à la même échelle et alignées : la coupe est prise au trait mixte du plan.
// Aucune cote : le chapitre ne donne aucune mesure de ce qu'on monte ici (le 2 m est une
// distance, il reste dans la légende).
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const NOIR = '#1A1A1A', RAD = Math.PI / 180;
  const r1 = v => Math.round(v * 10) / 10;
  const tr = (ep, fill = 'none', extra = '') => `fill="${fill}" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"${extra}`;
  const pt = p => `${r1(p[0])} ${r1(p[1])}`;
  const lisse = (pts, ferme = false) => {
    const n = pts.length, get = i => (ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    let d = `M ${pt(pts[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${pt(c1)} ${pt(c2)} ${pt(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };

  // Le repère commun, en mètres : x vers l'est (0 = face intérieure du mur ouest), y vers le sud
  // (0 = face intérieure du mur nord) sur le plan, z vers le haut (0 = plancher) sur la coupe.
  const S = 80, X0 = 110, Y0 = 26, ZF = 224;
  const X = m => X0 + m * S, Y = m => Y0 + m * S, Z = m => ZF - m * S;
  const P = (x, y) => [X(x), Y(y)], C = (x, z) => [X(x), Z(z)];
  const E = 0.15;                           // épaisseur des murs
  const COUPE_Y = 1.6;                      // où la coupe est prise

  // Les objets, en mètres, communs aux deux vues
  const POELE = { x0: 0.55, x1: 1.15, y0: 0.3, y1: 0.85, tuyau: [0.85, 0.44], rt: 0.075 };
  const CHAUDRON = { x: 0.85, y: 0.67, r: 0.13 };
  const SAC = { x: 1.5, y: 0.5 };
  const PORTE_CH = [2.0, 2.8];              // la chambre, au mur nord
  const FENETRE = [1.9, 2.7];               // au mur ouest
  const PORTE_EXT = [3.4, 4.2];             // au mur sud
  const LIT = { x0: 3.35, x1: 4.85, y0: 0.1, y1: 1.4, haut: 0.5, mat: 0.05 };
  const AVERT = { x: 4.77, y: 0.77, c: 0.12 };

  // ── Le plan ───────────────────────────────────────────────────────────────────────────
  const plan = () => {
    const o = [];
    // les murs coupés : l'aplat en hachure, puis les contours avec leurs ouvertures
    const ext = `M ${pt(P(-E, -E))} H ${r1(X(5 + E))} V ${r1(Y(3.6 + E))} H ${r1(X(-E))} Z`;
    const int = `M ${pt(P(0, 0))} V ${r1(Y(3.6))} H ${r1(X(5))} V ${r1(Y(0))} Z`;
    o.push(h.path(ext + ' ' + int, A.hachure('bois', 'aucun') + ' fill-rule="evenodd"'));
    o.push(h.rect(X(PORTE_CH[0]), Y(-E) - 1, (PORTE_CH[1] - PORTE_CH[0]) * S, E * S + 2, A.blanc));
    o.push(h.rect(X(-E) - 1, Y(FENETRE[0]), E * S + 2, (FENETRE[1] - FENETRE[0]) * S, A.blanc));
    o.push(h.rect(X(PORTE_EXT[0]), Y(3.6) - 1, (PORTE_EXT[1] - PORTE_EXT[0]) * S, E * S + 2, A.blanc));
    const c = A.contour;
    o.push(h.chemin([P(PORTE_CH[0], -E), P(-E, -E), P(-E, FENETRE[0])], c));
    o.push(h.chemin([P(-E, FENETRE[1]), P(-E, 3.6 + E), P(PORTE_EXT[0], 3.6 + E)], c));
    o.push(h.chemin([P(PORTE_EXT[1], 3.6 + E), P(5 + E, 3.6 + E), P(5 + E, -E), P(PORTE_CH[1], -E)], c));
    o.push(h.chemin([P(PORTE_CH[0], 0), P(0, 0), P(0, FENETRE[0])], c));
    o.push(h.chemin([P(0, FENETRE[1]), P(0, 3.6), P(PORTE_EXT[0], 3.6)], c));
    o.push(h.chemin([P(PORTE_EXT[1], 3.6), P(5, 3.6), P(5, 0), P(PORTE_CH[1], 0)], c));
    for (const x of PORTE_CH) o.push(h.ligne(...P(x, -E), ...P(x, 0), c));
    for (const y of FENETRE) o.push(h.ligne(...P(-E, y), ...P(0, y), c));
    for (const x of PORTE_EXT) o.push(h.ligne(...P(x, 3.6), ...P(x, 3.6 + E), c));

    // la porte de la chambre : la couverture de laine clouée au cadre, ses plis en travers
    const plis = [];
    for (let i = 0; i <= 16; i++) { const x = PORTE_CH[0] + (PORTE_CH[1] - PORTE_CH[0]) * i / 16; plis.push(P(x, 0.035 + (i % 2 ? 0.035 : -0.005))); }
    o.push(h.path(lisse(plis), A.arete));
    // la porte d'entrée, fermée, et son battant
    o.push(h.rect(X(PORTE_EXT[0]), Y(3.6 + 0.045), (PORTE_EXT[1] - PORTE_EXT[0]) * S, 0.06 * S, tr(1.4, '#fff')));
    o.push(h.path(`M ${pt(P(PORTE_EXT[0], 3.6))} A ${(PORTE_EXT[1] - PORTE_EXT[0]) * S} ${(PORTE_EXT[1] - PORTE_EXT[0]) * S} 0 0 1 ${pt(P(PORTE_EXT[1], 3.6 - (PORTE_EXT[1] - PORTE_EXT[0])))}`, A.fin));
    // la fenêtre : l'allège au fond de l'ouverture, le châssis ouvert vers l'extérieur,
    // pivoté sur son montant sud ; l'air entre par le jeu du côté nord
    o.push(h.ligne(...P(-E, FENETRE[0]), ...P(-E, FENETRE[1]), A.fin));
    o.push(h.ligne(...P(-0.02, FENETRE[0]), ...P(-0.02, FENETRE[1]), A.fin));
    const ang = 24 * RAD, Lc = FENETRE[1] - FENETRE[0];
    const pivot = [-E, FENETRE[1]], bout = [-E - Lc * Math.sin(ang), FENETRE[1] - Lc * Math.cos(ang)];
    const nrm = [-Math.cos(ang) * 0.045, Math.sin(ang) * 0.045];
    o.push(h.chemin([P(...pivot), P(...bout), P(bout[0] + nrm[0], bout[1] + nrm[1]), P(pivot[0] + nrm[0], pivot[1] + nrm[1])], tr(1.4, '#fff'), true));
    // le chemin de l'air, de dehors jusqu'à la porte du poêle
    o.push(h.fleche(lisse([P(-0.98, 1.72), P(-0.6, 1.8), P(-0.3, 1.97), P(-0.05, 2.2), P(0.3, 2.22), P(0.62, 1.75), P(0.78, 1.0)]), A.cache));

    // le poêle : la caisse, la plaque, le tuyau qui monte à l'arrière, la porte devant
    o.push(h.rect(X(POELE.x0), Y(POELE.y0), (POELE.x1 - POELE.x0) * S, (POELE.y1 - POELE.y0) * S, tr(1.4, '#fff')));
    o.push(h.rect(X(POELE.x0 + 0.035), Y(POELE.y0 + 0.035), (POELE.x1 - POELE.x0 - 0.07) * S, (POELE.y1 - POELE.y0 - 0.07) * S, A.fin));
    o.push(h.rect(X(POELE.x0 + 0.08), Y(POELE.y1), (POELE.x1 - POELE.x0 - 0.16) * S, 0.035 * S, tr(1.4, '#fff')));
    o.push(h.cercle(...P(...POELE.tuyau), POELE.rt * S, tr(1.4, '#fff')));
    o.push(h.cercle(...P(...POELE.tuyau), POELE.rt * S - 2.2, A.fin));
    // le chaudron couvert : le bord, le couvercle, le bouton, les deux oreilles
    const [cx, cy] = P(CHAUDRON.x, CHAUDRON.y), cr = CHAUDRON.r * S;
    o.push(h.rect(cx - cr - 3, cy - 1.6, 2 * cr + 6, 3.2, tr(0.7, '#fff')));
    o.push(h.cercle(cx, cy, cr, tr(1.4, '#fff')));
    o.push(h.cercle(cx, cy, cr - 2, A.fin));
    o.push(h.cercle(cx, cy, 2.2, tr(0.7, '#fff')));
    // le sac à fonte vu d'en haut, au-dessus de sa chaudière
    const [sx, sy] = P(SAC.x, SAC.y);
    o.push(h.cercle(sx, sy, 0.15 * S, tr(1.4, '#fff')));
    o.push(h.cercle(sx, sy, 0.15 * S - 2, A.fin));
    const sac = [];
    for (let i = 0; i < 9; i++) { const a = i * 40 * RAD, r = 0.085 * S * (1 + 0.08 * Math.sin(i * 2.3)); sac.push([sx + r * Math.cos(a), sy + r * Math.sin(a)]); }
    o.push(h.path(lisse(sac, true), A.hachure('neige', 'arete')));
    o.push(h.cercle(sx, sy, 2, A.plein));

    // le lit des enfants : les caisses sous deux matelas de sol, les deux sacs tête à l'est
    o.push(h.rect(X(LIT.x0), Y(LIT.y0), (LIT.x1 - LIT.x0) * S, (LIT.y1 - LIT.y0) * S, tr(1.4, '#fff')));
    for (const x of [3.85, 4.35]) o.push(h.ligne(X(x), Y(LIT.y0), X(x), Y(LIT.y1), A.fin));
    const mats = [[0.15, 0.72], [0.78, 1.35]];
    for (const [a, b] of mats) o.push(h.rect(X(3.4), Y(a), 1.38 * S, (b - a) * S, tr(0.7, '#fff')));
    for (const [a, b] of mats) {
      const m = (a + b) / 2;
      // le sac momie : pieds à l'ouest, épaules larges, capuchon à l'est
      const cont = [[3.5, m - 0.1], [3.9, m - 0.17], [4.3, m - 0.22], [4.5, m - 0.2], [4.63, m - 0.1], [4.66, m],
        [4.63, m + 0.1], [4.5, m + 0.2], [4.3, m + 0.22], [3.9, m + 0.17], [3.5, m + 0.1], [3.46, m]].map(q => P(...q));
      o.push(h.path(lisse(cont, true), tr(1.4, '#fff')));
      // les cloisons du sac, en travers
      for (const x of [3.7, 3.9, 4.1, 4.3]) {
        const w = x < 3.9 ? 0.13 : x < 4.1 ? 0.17 : x < 4.3 ? 0.2 : 0.21;
        o.push(h.path(`M ${pt(P(x, m - w + 0.01))} Q ${pt(P(x + 0.03, m))} ${pt(P(x, m + w - 0.01))}`, A.fin));
      }
      // l'ouverture du capuchon et le visage dedans
      o.push(h.ellipse(...P(4.5, m), 0.075 * S, 0.1 * S, tr(0.7, '#fff')));
      o.push(h.ellipse(...P(4.49, m), 0.05 * S, 0.07 * S, A.fin));
    }
    // l'avertisseur, à leur tête : le boîtier et sa grille ronde
    o.push(h.rect(X(AVERT.x - AVERT.c / 2), Y(AVERT.y - AVERT.c / 2), AVERT.c * S, AVERT.c * S, tr(1.4, '#fff')));
    o.push(h.cercle(...P(AVERT.x, AVERT.y), 0.035 * S, A.detail));

    // la chaise de celui qui veille, tournée vers le lit : le siège, le dossier, les pattes
    const ch = { x: 2.55, y: 2.4 }, rot = -47 * RAD;
    const T = (u, v) => P(ch.x + u * Math.cos(rot) - v * Math.sin(rot), ch.y + u * Math.sin(rot) + v * Math.cos(rot));
    o.push(h.path(`M ${pt(T(-0.19, -0.19))} L ${pt(T(0.17, -0.21))} Q ${pt(T(0.21, -0.21))} ${pt(T(0.21, -0.17))} L ${pt(T(0.21, 0.17))} Q ${pt(T(0.21, 0.21))} ${pt(T(0.17, 0.21))} L ${pt(T(-0.19, 0.19))} Z`, tr(1.4, '#fff')));
    o.push(h.path(`${lisse([T(-0.17, -0.225), T(-0.26, 0), T(-0.17, 0.225)])} L ${pt(T(-0.13, 0.2))} ${lisse([T(-0.13, 0.2), T(-0.21, 0), T(-0.13, -0.2)]).replace(/^M [^C]*/, '')} Z`, tr(1.4, '#fff')));
    for (const v of [-0.2, 0.2]) o.push(h.cercle(...T(-0.16, v), 2, A.plein));

    // le trait mixte de la coupe, hors des murs, et le sens du regard
    const mixte = ' stroke-dasharray="14 3 2 3"';
    o.push(h.ligne(X(-0.62), Y(COUPE_Y), X(-0.22), Y(COUPE_Y), tr(1.4, 'none', mixte)));
    o.push(h.ligne(X(5.22), Y(COUPE_Y), X(5.62), Y(COUPE_Y), tr(1.4, 'none', mixte)));
    for (const x of [-0.42, 5.42]) {
      const [ax, ay] = P(x, COUPE_Y);
      o.push(h.chemin([[ax - 5, ay - 4], [ax, ay - 13], [ax + 5, ay - 4]], A.plein, true));
      o.push(h.ligne(ax, ay, ax, ay - 6, A.arete));
    }
    return o.join('\n');
  };

  // ── La coupe ──────────────────────────────────────────────────────────────────────────
  const coupe = () => {
    const o = [];
    const HP = 2.4, EP = 0.12;                // hauteur sous plafond, épaisseur du plancher et du plafond

    // le mur nord, au fond : le cadre de la chambre et sa couverture clouée
    const [d0, d1] = PORTE_CH, HT = 2.0;
    o.push(h.chemin([C(d0 - 0.05, 0), C(d0 - 0.05, HT + 0.05), C(d1 + 0.05, HT + 0.05), C(d1 + 0.05, 0)], A.arete));
    o.push(h.chemin([C(d0, 0), C(d0, HT), C(d1, HT), C(d1, 0)], A.detail));
    const bas = [], hautC = [];
    for (let i = 0; i <= 10; i++) { const x = d0 + 0.01 + (d1 - d0 - 0.02) * i / 10; hautC.push(C(x, HT - 0.01)); bas.push(C(x, 0.03 + (i % 2 ? 0.025 : 0))); }
    o.push(h.path(`M ${pt(hautC[0])} L ${pt(hautC[10])} L ${pt(bas[10])} ${lisse(bas.slice().reverse()).replace(/^M [^C]*/, '')} Z`, tr(1.4, '#fff')));
    for (let i = 1; i < 10; i += 2) {
      const x = d0 + 0.01 + (d1 - d0 - 0.02) * i / 10;
      o.push(h.path(lisse([C(x, HT - 0.06), C(x + 0.012, 1.3), C(x - 0.01, 0.6), C(x, 0.06)]), A.fin));
    }
    for (let i = 0; i <= 5; i++) o.push(h.cercle(...C(d0 + 0.04 + (d1 - d0 - 0.08) * i / 5, HT - 0.05), 1.6, A.plein));

    // le thermomètre, pendu au mur nord à la hauteur où dormiront les enfants
    const tx = 3.43, t0 = LIT.haut + LIT.mat + 0.06, t1 = t0 + 0.3;
    o.push(h.cercle(...C(tx, t1 + 0.07), 1.5, A.plein));
    o.push(h.chemin([C(tx, t1 + 0.07), C(tx - 0.03, t1), C(tx + 0.03, t1)], A.fin, true));
    o.push(h.rect(X(tx - 0.035), Z(t1), 0.07 * S, (t1 - t0) * S, tr(1.4, '#fff')));
    o.push(h.ligne(X(tx), Z(t1 - 0.03), X(tx), Z(t0 + 0.05), tr(1.4)));
    o.push(h.cercle(...C(tx, t0 + 0.04), 2.2, A.plein));
    for (let k = 1; k <= 5; k++) o.push(h.ligne(X(tx + 0.012), Z(t0 + 0.05 * k + 0.02), X(tx + 0.028), Z(t0 + 0.05 * k + 0.02), A.fin));
    // le point à contrôler : le thermomètre, à la hauteur où dormiront les enfants (4,4 °C passés)
    o.push(h.controle(X(tx), Z((t0 + t1) / 2 + 0.02), 0.15 * S));

    // le tuyau du poêle, qui monte de l'arrière de la plaque et passe le plafond
    const tx0 = POELE.tuyau[0] - POELE.rt, tx1 = POELE.tuyau[0] + POELE.rt, ptop = 0.76;
    o.push(h.rect(X(tx0), Z(HP + EP + 0.18), (tx1 - tx0) * S, (HP + EP + 0.18 - ptop) * S, tr(1.4, '#fff')));
    for (const z of [1.25, 1.85]) o.push(h.ligne(X(tx0), Z(z), X(tx1), Z(z), A.detail));

    // le poêle, vu de face : pattes, caisse, plaque, porte et sa clenche, la roulette d'air
    const { x0, x1 } = POELE;
    for (const x of [x0 + 0.04, x1 - 0.07]) o.push(h.rect(X(x), Z(0.15), 0.03 * S, 0.15 * S, tr(1.4, '#fff')));
    o.push(h.rect(X(x0), Z(0.72), (x1 - x0) * S, 0.57 * S, tr(1.4, '#fff')));
    o.push(h.rect(X(x0 - 0.025), Z(0.76), (x1 - x0 + 0.05) * S, 0.04 * S, tr(1.4, '#fff')));
    o.push(h.rect(X(x0 + 0.08), Z(0.63), (x1 - x0 - 0.16) * S, 0.4 * S, tr(1.4, '#fff')));
    o.push(h.rect(X(x0 + 0.11), Z(0.6), (x1 - x0 - 0.22) * S, 0.34 * S, A.fin));
    o.push(h.rect(X(x1 - 0.14), Z(0.47), 0.06 * S, 0.02 * S, tr(1.4, '#fff')));
    o.push(h.cercle(...C((x0 + x1) / 2, 0.36), 0.05 * S, tr(0.7, '#fff')));
    o.push(h.cercle(...C((x0 + x1) / 2, 0.36), 1.2, A.plein));
    // le chaudron sur la plaque, couvercle mis
    const k0 = CHAUDRON.x - CHAUDRON.r, k1 = CHAUDRON.x + CHAUDRON.r, kb = 0.76, kh = 0.95;
    o.push(h.path(`M ${pt(C(k0, kh))} L ${pt(C(k0 + 0.01, kb + 0.02))} Q ${pt(C(k0 + 0.012, kb))} ${pt(C(k0 + 0.04, kb))} L ${pt(C(k1 - 0.04, kb))} Q ${pt(C(k1 - 0.012, kb))} ${pt(C(k1 - 0.01, kb + 0.02))} L ${pt(C(k1, kh))} Z`, tr(1.4, '#fff')));
    for (const s of [-1, 1]) o.push(h.path(`M ${pt(C(CHAUDRON.x + s * CHAUDRON.r, kh - 0.03))} q ${r1(s * 4)} 0 ${r1(s * 4)} 4 l ${r1(-s * 4)} 0`, A.detail));
    o.push(h.path(`M ${pt(C(k0 - 0.01, kh))} Q ${pt(C(CHAUDRON.x, kh + 0.07))} ${pt(C(k1 + 0.01, kh))} Z`, tr(1.4, '#fff')));
    o.push(h.rect(X(CHAUDRON.x - 0.025), Z(kh + 0.065), 0.05 * S, 0.03 * S, tr(1.4, '#fff')));

    // le sac à fonte : la corde au crochet du plafond, le sac de neige noué, les gouttes, la chaudière
    const sx = SAC.x, sb = 1.05, st = 1.42;
    o.push(h.ligne(X(sx), Z(HP), X(sx), Z(st + 0.07), A.detail));
    o.push(h.path(`M ${pt(C(sx - 0.03, HP))} Q ${pt(C(sx - 0.03, HP - 0.05))} ${pt(C(sx, HP - 0.05))}`, A.detail));
    const sacC = [[sx - 0.02, st + 0.02], [sx - 0.07, st - 0.03], [sx - 0.12, st - 0.14], [sx - 0.13, st - 0.26], [sx - 0.1, sb + 0.02],
      [sx - 0.03, sb - 0.01], [sx + 0.05, sb], [sx + 0.11, sb + 0.04], [sx + 0.135, st - 0.22], [sx + 0.11, st - 0.1], [sx + 0.06, st - 0.02], [sx + 0.02, st + 0.02]].map(q => C(...q));
    o.push(h.path(lisse(sacC, true), A.hachure('neige', 'arete')));
    o.push(h.path(`M ${pt(C(sx - 0.035, st + 0.07))} L ${pt(C(sx - 0.02, st + 0.01))} L ${pt(C(sx + 0.02, st + 0.01))} L ${pt(C(sx + 0.035, st + 0.07))}`, A.detail));
    o.push(h.ligne(X(sx - 0.03), Z(st + 0.01), X(sx + 0.03), Z(st + 0.01), tr(2)));
    const goutte = (x, z) => { const [gx, gy] = C(x, z); return h.path(`M ${r1(gx)} ${r1(gy - 3.2)} Q ${r1(gx + 2.2)} ${r1(gy + 0.4)} ${r1(gx)} ${r1(gy + 1.6)} Q ${r1(gx - 2.2)} ${r1(gy + 0.4)} ${r1(gx)} ${r1(gy - 3.2)} Z`, A.plein); };
    o.push(goutte(sx + 0.01, 0.8), goutte(sx - 0.01, 0.55));
    const b0 = 0.0, bh = 0.3, bw0 = 0.12, bw1 = 0.15;
    o.push(h.path(`M ${pt(C(sx - bw1, bh))} L ${pt(C(sx - bw0, b0))} L ${pt(C(sx + bw0, b0))} L ${pt(C(sx + bw1, bh))} Z`, tr(1.4, '#fff')));
    o.push(h.ligne(X(sx - bw1 - 0.005), Z(bh - 0.03), X(sx + bw1 + 0.005), Z(bh - 0.03), A.detail));
    o.push(h.path(`M ${pt(C(sx - bw1 + 0.005, bh - 0.05))} Q ${pt(C(sx, bh + 0.16))} ${pt(C(sx + bw1 - 0.005, bh - 0.05))}`, A.detail));
    o.push(h.path(`M ${pt(C(sx - bw0 + 0.03, 0.14))} L ${pt(C(sx + bw0 - 0.03, 0.14))}`, tr(0.5, 'none', ' stroke-dasharray="3 2"')));

    // le lit : trois caisses de planches, le matelas de sol, l'enfant dans son sac, tête à l'est
    const { x0: l0, x1: l1, haut, mat } = LIT;
    const cais = [[l0, 3.85], [3.85, 4.35], [4.35, l1]];
    for (const [a, b] of cais) {
      o.push(h.rect(X(a), Z(haut), (b - a) * S, haut * S, tr(1.4, '#fff')));
      for (const [z0, z1] of [[0.15, 0.18], [0.32, 0.35]]) o.push(h.rect(X(a + 0.05), Z(z1), (b - a - 0.1) * S, (z1 - z0) * S, tr(0.7, NOIR)));
      for (const x of [a + 0.05, b - 0.05]) o.push(h.ligne(X(x), Z(haut), X(x), Z(0), A.detail));
    }
    o.push(h.rect(X(3.4), Z(haut + mat), 1.38 * S, mat * S, tr(1.4, '#fff')));
    const zb = haut + mat;
    // l'enfant de 4 ans, couché sur le dos dans son sac, la tête à l'est : le corps simple (couche-dos,
    // enfant4, en miroir pour que la tête aille vers l'est) sert de gabarit ; le sac, tiré jusqu'au
    // menton, et le capuchon, qui cache le crâne, se peignent par-dessus. On ne voit que le visage.
    const oE = { y: Z(zb), pose: 'couche-dos', vue: 'profil', cote: 'gauche', age: 'enfant4', echelle: S / 1000 };
    const e0 = F.corps({ ...oE, x: X(4) });
    const enfant = F.corps({ ...oE, x: X(4) + (X(4.5) - e0.tete.x) });
    o.push(enfant.toString());
    // le sac : le pied du sac a de la place pour les bottes, qui pointent au plafond
    const sacE = [C(3.47, zb), C(3.47, zb + 0.15), C(3.53, zb + 0.21), C(3.68, zb + 0.19), C(3.9, zb + 0.16), C(4.1, zb + 0.18), C(4.28, zb + 0.2), C(4.39, zb + 0.19)];
    o.push(h.path(`${lisse(sacE)} L ${pt(C(4.4, zb + 0.07))} Q ${pt(C(4.47, zb + 0.02))} ${pt(C(4.5, zb))} L ${pt(C(3.47, zb))} Z`, tr(1.4, '#fff')));
    for (const [x, zz] of [[3.72, 0.17], [3.92, 0.15], [4.12, 0.17]]) o.push(h.path(`M ${pt(C(x, zb + 0.005))} Q ${pt(C(x + 0.025, zb + zz / 2))} ${pt(C(x, zb + zz))}`, A.fin));
    // le capuchon : il entoure le crâne, du front à la nuque
    const cap = [C(4.5 + 0.005, zb + 0.2), C(4.6, zb + 0.215), C(4.665, zb + 0.15), C(4.672, zb + 0.06), C(4.635, zb)];
    o.push(h.path(`${lisse(cap)} L ${pt(C(4.56, zb))} ${lisse([C(4.56, zb), C(4.59, zb + 0.09), C(4.56, zb + 0.17), C(4.5 + 0.005, zb + 0.2)]).replace(/^M [^C]*/, '')} Z`, tr(1.4, '#fff')));
    // l'avertisseur, debout sur le lit à leur tête
    o.push(h.rect(X(AVERT.x - 0.06), Z(zb + 0.13), 0.12 * S, 0.13 * S, tr(1.4, '#fff')));
    o.push(h.cercle(...C(AVERT.x, zb + 0.07), 0.035 * S, A.detail));
    o.push(h.cercle(...C(AVERT.x, zb + 0.07), 0.8, A.plein));

    // l'adulte debout près du lit : le dessus des caisses arrive à son genou
    o.push(F.corps({ x: X(3.0), y: ZF, pose: 'debout', vue: 'profil', age: 'adulte', echelle: S / 1000, angles: { tete: 10, cou: 14 } }).toString());
    o.push(h.ligne(X(3.13), Z(haut), X(l0), Z(haut), tr(0.5, 'none', ' stroke-dasharray="3 2"')));

    // les coupes : plancher, plafond, murs ouest et est
    const hb = A.hachure('bois', 'contour');
    o.push(h.rect(X(-E), Z(0), (5 + 2 * E) * S, EP * S, hb));
    o.push(h.path(`M ${pt(C(-E, HP + EP))} H ${r1(X(tx0 - 0.02))} V ${r1(Z(HP))} H ${r1(X(-E))} Z M ${pt(C(tx1 + 0.02, HP + EP))} H ${r1(X(5 + E))} V ${r1(Z(HP))} H ${r1(X(tx1 + 0.02))} Z`, hb));
    o.push(h.rect(X(-E), Z(HP), E * S, HP * S, hb));
    o.push(h.rect(X(5), Z(HP), E * S, HP * S, hb));
    return o.join('\n');
  };

  return {
    ref: '84-04',
    titre: 'La pièce de la première nuit',
    desc: 'La pièce du poêle, montée pour la première nuit dans un chalet glacé : vue de dessus, puis en coupe face au mur du poêle, à la même échelle. La fenêtre entrouverte au mur ouest donne l’air au poêle ; la chambre est fermée par une couverture de laine clouée au cadre ; les enfants dorment dans leur propre sac sur leur matelas de sol, sur des caisses à hauteur de genou, à l’autre bout de la pièce, tête à l’est, l’avertisseur de voyage posé à leur tête ; le thermomètre pend à leur hauteur ; la chaise de l’adulte qui veille fait face au lit ; sur le poêle, le chaudron de neige couvert, et à côté le sac de neige suspendu qui goutte dans une chaudière.',
    format: 'pleine',
    disposition: [['plan'], ['coupe']],
    hauteurs: [1.35, 1],
    vues: {
      plan: {
        titre: 'Vue de dessus',
        dessin: plan,
        renvois: () => [
          { n: 1, rond: [X(1.75), Y(1.3)], cible: [X(1.13), Y(0.78)], texte: 'poêle, qui tire l’air de la pièce' },
          { n: 2, rond: [36, Y(2.75)], cible: [X(-0.3), Y(2.4)], texte: 'entrée d’air : fenêtre entrouverte' },
          { n: 3, rond: [X(5.7), Y(0.3)], cible: [X(AVERT.x + 0.04), Y(AVERT.y - 0.04)], texte: 'avertisseur : 2 m ou plus du poêle' },
          { n: 4, rond: [X(4.1), Y(2.1)], cible: [X(4.0), Y(1.27)], texte: 'sac et matelas venus avec eux' },
          { n: 5, rond: [X(1.75), Y(3.05)], cible: [X(2.42), Y(2.52)], texte: 'chaise de celui qui veille' },
        ],
      },
      coupe: {
        titre: 'En coupe, face au mur du poêle',
        dessin: coupe,
        renvois: () => [
          { n: 6, rond: [X(0.3), Z(1.55)], cible: [X(0.76), Z(0.9)], texte: 'neige au chaudron, couvercle mis' },
          { n: 7, rond: [X(1.12), Z(1.95)], cible: [X(1.44), Z(1.3)], texte: 'sac de neige, chaudière dessous' },
          { n: 8, rond: [X(2.4), Z(2.2)], cible: [X(2.4), Z(1.75)], texte: 'couverture clouée au cadre' },
          { n: 9, rond: [X(3.85), Z(1.45)], cible: [X(3.45), Z(0.85)], texte: 'thermomètre à hauteur des enfants' },
          { n: 10, rond: [X(5.7), Z(0.9)], cible: [X(4.7), Z(0.3)], texte: 'caisses à hauteur de genou' },
        ],
      },
    },
  };
};
