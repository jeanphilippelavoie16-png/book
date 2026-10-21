// Planche 29-03 — Nouer et couper le cordon (ch. 29, section 5-G, étapes 53-54 ; 9-C pour les
// liens et la lame).
//
// Ce que dit le chapitre, et rien d'autre : un lien à 2 travers de doigt du ventre du bébé, un
// autre à 5 travers de doigt, chacun serré d'un nœud plat (droite sur gauche, gauche sur droite) ;
// couper entre les deux avec la lame stérile ; si le bout suinte, un troisième lien entre le
// premier et la peau ; le moignon reste à l'air, sans rien dessus. Les liens : ficelle ou lacet de
// coton, bande de drap (9-C).
//
// Aucune cote : c'est un geste, et le chapitre mesure en travers de doigt, pas en mm. Les
// distances sont dans la légende ; sur le dessin, un travers de doigt vaut 1,1 diamètre de cordon
// (proportion seulement, aucun chiffre écrit).
//
// Le nœud est construit en 3D puis projeté (vue de face, un peu d'en haut), les bouts tenus vers
// le haut comme un lacet de soulier. Chaque temps est une torsade d'un tour complet des deux bouts
// l'un sur l'autre, devant le cordon : deux croisements et un œil entre les deux. Premier temps,
// droite sur gauche : au croisement du bas, le brin venu de droite (B) passe devant, puis derrière
// au croisement du haut. Second temps, gauche sur droite : le brin de gauche (A) passe devant en
// bas, derrière en haut. Les deux torsades tournent en sens contraire : c'est un nœud plat, pas un
// nœud de vache. Le dessus / dessous de chaque croisement vient de la profondeur (z de
// h.formes.cordes), pas d'un choix à l'œil.
//
// La charte : pas de gris (le cordon et le ventre sont un corps ; le lien est une corde). Le rouge :
// les deux bouts qu'on tire, à chaque temps du nœud, et le cercle sur le bout coupé qui suinte, ce
// qu'on regarde après la coupe.
module.exports = (h) => {
  const RAD = Math.PI / 180;
  const f1 = v => Math.round(v * 10) / 10;
  const BLANC_ARETE = `fill="#FFFFFF" ${h.a.arete.replace('fill="none" ', '')}`;

  // ─── la projection : X à droite, Y vers le haut (le long du cordon), Z vers l'œil ─────────
  // Vue de face, relevée de e degrés : un cercle horizontal devient une ellipse dont le devant
  // descend. Rend [x, y, profondeur] ; la profondeur sert aux croisements des brins.
  const vue3 = (cx, cy, e) => {
    const c = Math.cos(e * RAD), s = Math.sin(e * RAD);
    return (X, Y, Z) => [cx + X, cy - Y * c + Z * s, Y * s + Z * c];
  };

  // Une torsade debout : A et B enroulés l'un sur l'autre autour d'un axe vertical (X = 0,
  // Z = zt), de Y = ya à Y = yb, un tour complet. En bas et en haut, A est à gauche, B à droite.
  // sens +1 : droite sur gauche (croisement du bas : B devant) ; -1 : gauche sur droite (A devant).
  function torsade({ ya, yb, zt, w, d, sens, n = 36 }) {
    const A = [], B = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, Y = ya + (yb - ya) * t, ph = Math.PI + sens * 2 * Math.PI * t;
      A.push([w * Math.cos(ph), Y, zt + d * Math.sin(ph)]);
      B.push([-w * Math.cos(ph), Y, zt - d * Math.sin(ph)]);
    }
    return { A, B, y1: ya + (yb - ya) * 0.25, y2: ya + (yb - ya) * 0.75 };
  }

  // Une courbe 3D lisse par des points inégalement espacés (Catmull-Rom centripète : pas de
  // boucle ni de dépassement), rééchantillonnée à pas régulier pour h.formes.cordes.
  function lisse3(pts, pas = 2.5) {
    const d3 = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    const Q = [pts[0].map((v, k) => 2 * v - pts[1][k]), ...pts, pts[pts.length - 1].map((v, k) => 2 * v - pts[pts.length - 2][k])];
    const dense = [];
    for (let i = 1; i < Q.length - 2; i++) {
      const [p0, p1, p2, p3] = [Q[i - 1], Q[i], Q[i + 1], Q[i + 2]];
      const t0 = 0, t1 = t0 + Math.sqrt(d3(p0, p1)) + 1e-6, t2 = t1 + Math.sqrt(d3(p1, p2)) + 1e-6, t3 = t2 + Math.sqrt(d3(p2, p3)) + 1e-6;
      const n = Math.max(2, Math.ceil(d3(p1, p2) / 0.5));
      for (let j = 0; j < n; j++) {
        const t = t1 + (t2 - t1) * j / n;
        const L = (a, b, ta, tb) => a.map((v, k) => ((tb - t) * v + (t - ta) * b[k]) / (tb - ta));
        const A1 = L(p0, p1, t0, t1), A2 = L(p1, p2, t1, t2), A3 = L(p2, p3, t2, t3);
        const B1 = L(A1, A2, t0, t2), B2 = L(A2, A3, t1, t3);
        dense.push(L(B1, B2, t1, t2));
      }
    }
    dense.push(pts[pts.length - 1]);
    const out = [dense[0]];
    let acc = 0;
    for (let i = 1; i < dense.length; i++) {
      acc += d3(dense[i - 1], dense[i]);
      if (acc >= pas) { out.push(dense[i]); acc = 0; }
    }
    if (acc > 0) out.push(dense[dense.length - 1]);
    return out;
  }

  // ─── le cordon : un tube tordu, les vaisseaux en hélice sur le devant ─────────────────────
  function tube(o, P, R, y0, y1, pas, { yMin = -1e9, yMax = 1e9 } = {}) {
    for (let k = 0; k < 3; k++) {
      let run = [];
      const flush = () => { if (run.length > 1) o.push(h.chemin(run, h.a.fin)); run = []; };
      for (let Y = y0; Y <= y1 + 0.01; Y += 1.2) {
        const al = 2 * Math.PI * Y / pas + k * 2 * Math.PI / 3;
        const Z = R * Math.cos(al), X = R * Math.sin(al), p = P(X, Y, Z);
        if (Z > 0.5 && p[1] >= yMin && p[1] <= yMax) run.push(p); else flush();
      }
      flush();
    }
  }

  // ═══ LES VUES D'ENSEMBLE : le ventre, le cordon, les liens ══════════════════════════════
  const Ro = 11, EPo = 3.2, Eo = 25, TD = 1.1 * 2 * Ro, PASo = 64;
  const Y1 = 2 * TD, Y2 = 5 * TD, YC = 3.5 * TD, Y3 = 1 * TD, GAP = 13;

  // un lien serré : le tour du cordon, le nœud devant, deux bouts courts
  const lienSerre = (P, Y0) => {
    const RL = Ro + EPo / 2 + 0.2, zn = RL + 2.5, o = [];
    const tour = [];
    for (let psi = -88; psi <= 88; psi += 8) tour.push(P(RL * Math.sin(psi * RAD), Y0, RL * Math.cos(psi * RAD)));
    o.push(h.formes.cordes([{ pts: tour, ep: EPo, debut: 'ouvert', fin: 'ouvert' }]).toString());
    o.push(h.formes.cordes([
      { pts: [P(-1.5, Y0 + 3, zn), P(-6, Y0 + 6.5, zn), P(-12, Y0 + 8.5, zn)], ep: EPo, debut: 'ouvert', fin: 'libre' },
      { pts: [P(1.5, Y0 + 3, zn), P(6, Y0 + 6.5, zn), P(12, Y0 + 8.5, zn)], ep: EPo, debut: 'ouvert', fin: 'libre' },
    ]).toString());
    const c = P(0, Y0 + 1.6, zn);
    o.push(h.ellipse(c[0], c[1], 3.6, 4.4, BLANC_ARETE));
    o.push(h.path(`M${f1(c[0] - 1.6)} ${f1(c[1] - 3.2)} Q${f1(c[0] + 1.6)} ${f1(c[1])} ${f1(c[0] - 1.6)} ${f1(c[1] + 3.2)}`, h.a.fin));
    return o.join('\n');
  };

  // un morceau de cordon de Y = y0 à Y = y1 ; bas : 'peau' | 'coupe' ; haut : 'cassure' | 'face'
  const morceau = (o, P, y0, y1, bas, haut) => {
    const R = Ro, ry = R * Math.sin(Eo * RAD);
    const yb = bas === 'peau' ? P(0, 3, 0)[1] : P(0, y0, 0)[1], yh = P(0, y1, 0)[1];
    const xl = P(-R, 0, 0)[0], xr = P(R, 0, 0)[0];
    o.push(h.rect(xl, yh, 2 * R, yb - yh, h.a.blanc));
    if (bas === 'coupe') o.push(h.path(`M${f1(xl)} ${f1(yb)} A${R} ${f1(ry)} 0 0 0 ${f1(xr)} ${f1(yb)} Z`, h.a.blanc));
    tube(o, P, R, bas === 'peau' ? 7 : y0, y1, PASo);
    o.push(h.ligne(xl, yh, xl, yb), h.ligne(xr, yh, xr, yb));
    if (bas === 'coupe') o.push(h.path(`M${f1(xl)} ${f1(yb)} A${R} ${f1(ry)} 0 0 0 ${f1(xr)} ${f1(yb)}`, h.a.arete));
    if (haut === 'cassure') {
      o.push(h.path(`M${f1(xl)} ${f1(yh)} C${f1(xl + R * 0.7)} ${f1(yh - 7)} ${f1(xr - R * 0.7)} ${f1(yh + 7)} ${f1(xr)} ${f1(yh)}`, h.a.arete));
    }
    if (haut === 'face') {
      const c = P(0, y1, 0);
      o.push(h.ellipse(c[0], c[1], R, ry, BLANC_ARETE));
      // les trois vaisseaux : un gros, deux petits
      o.push(h.ellipse(c[0] - 2.6, c[1] - 0.3, 2.3, 1.1, h.a.plein),
        h.ellipse(c[0] + 3.4, c[1] - 1.4, 1.3, 0.65, h.a.plein),
        h.ellipse(c[0] + 3.0, c[1] + 1.6, 1.3, 0.65, h.a.plein));
    }
  };

  // le ventre du bébé : un dôme, le cordon qui en sort par une collerette de peau
  const ventre = (o, P, z) => {
    const R = Ro, cx = P(0, 0, 0)[0], y0 = P(0, 0, 0)[1];
    const Rb = 250, yd = x => y0 + 7 + Rb - Math.sqrt(Rb * Rb - (x - cx) * (x - cx));
    const col = 9, yh = P(0, 5, 0)[1];
    for (const sg of [-1, 1]) {
      const pts = [];
      const xa = cx + sg * (R + col);
      for (let x = sg < 0 ? 0 : z.l; sg < 0 ? x <= xa : x >= xa; x -= sg * 4) pts.push([x, yd(x)]);
      pts.push([xa, yd(xa)]);
      let d = pts.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])} ${f1(p[1])}`).join(' ');
      d += ` Q${f1(cx + sg * R)} ${f1(yd(xa) - 1)} ${f1(cx + sg * R)} ${f1(yh)}`;
      o.push(h.path(d, h.a.contour));
    }
  };

  // le couteau d'office couché dans le plan de la coupe, la pointe à gauche, le manche à droite
  const couteau = (o, P, Yk) => {
    const R = Ro, x0 = -R - 30, xb = R + 22, xm = R + 80;
    const lame = [[xb, 7], [x0 + 16, 7], [x0 + 4, 4], [x0, 0], [x0 + 6, -4.5], [x0 + 20, -8], [xb, -8.5]];
    o.push(h.chemin(lame.map(([X, Z]) => P(X, Yk, Z)), BLANC_ARETE, true));
    o.push(h.chemin([[x0 + 8, -5.6], [x0 + 20, -6.6], [xb - 2, -7]].map(([X, Z]) => P(X, Yk, Z)), h.a.fin));
    const c0 = P(xb, Yk, -0.5), c1 = P(xm, Yk, -0.5), r = 6.5;
    o.push(h.path(`M${f1(c0[0])} ${f1(c0[1] - r)} L${f1(c1[0])} ${f1(c1[1] - r)} A${r * 0.45} ${r} 0 0 1 ${f1(c1[0])} ${f1(c1[1] + r)} L${f1(c0[0])} ${f1(c0[1] + r)} Z`, BLANC_ARETE));
    o.push(h.path(`M${f1(c0[0])} ${f1(c0[1] - r)} A${r * 0.45} ${r} 0 0 1 ${f1(c0[0])} ${f1(c0[1] + r)}`, h.a.detail));
    o.push(h.cercle(c0[0] + 18, c0[1], 1.4, h.a.detail), h.cercle(c0[0] + 40, c0[1], 1.4, h.a.detail));
  };

  const geoEns = z => ({ P: vue3(z.l / 2, z.h - 46, Eo) });
  const yTop = (z, P) => (P(0, 0, 0)[1] - 8) / Math.cos(Eo * RAD);   // Y du haut de la vue

  const dessinLiens = z => {
    const { P } = geoEns(z), o = [];
    ventre(o, P, z);
    morceau(o, P, 0, yTop(z, P), 'peau', 'cassure');
    o.push(lienSerre(P, Y1), lienSerre(P, Y2));
    return o.join('\n');
  };
  const dessinCouper = z => {
    const { P } = geoEns(z), o = [];
    ventre(o, P, z);
    morceau(o, P, 0, YC - GAP, 'peau', 'face');
    morceau(o, P, YC + GAP, yTop(z, P), 'coupe', 'cassure');
    o.push(lienSerre(P, Y1), lienSerre(P, Y2));
    couteau(o, P, YC);
    return o.join('\n');
  };
  const dessinSuinte = z => {
    const { P } = geoEns(z), o = [];
    ventre(o, P, z);
    morceau(o, P, 0, YC, 'peau', 'face');
    o.push(lienSerre(P, Y1), lienSerre(P, Y3));
    // le sang qui perle sur la coupe, coule sur le devant, une goutte qui tombe
    const c = P(0, YC, 0), yF = c[1] + Ro * Math.sin(Eo * RAD), x = c[0];
    o.push(h.path(`M${f1(x - 4.2)} ${f1(yF - 1.2)} C${f1(x - 4.2)} ${f1(yF + 5)} ${f1(x - 2.4)} ${f1(yF + 9)} ${f1(x - 2.6)} ${f1(yF + 12)} C${f1(x - 2.8)} ${f1(yF + 15.5)} ${f1(x + 1.4)} ${f1(yF + 15.5)} ${f1(x + 1.1)} ${f1(yF + 12)} C${f1(x + 0.9)} ${f1(yF + 8)} ${f1(x + 1.4)} ${f1(yF + 4)} ${f1(x + 1)} ${f1(yF - 1.6)} Z`, h.a.plein));
    o.push(h.controle(x, c[1] + 3, 15));          // le bout coupé : s'il suinte, un troisième lien
    return o.join('\n');
  };

  // ═══ LE NŒUD EN GROS : le cordon debout, les bouts tenus vers le haut ══════════════════════
  const R = 30, EP = 6, E = 22, PAS = 170;

  // Le cordon, la boucle du lien derrière lui, puis les brins devant.
  // A, B : les deux moitiés du lien, chacune du milieu de la boucle (derrière le cordon) au bout.
  // nDer : combien de points de chaque brin sont derrière (le reste est devant).
  const scene = (o, P, z, A, B, nDer, RL, Yr, cache = 0) => {
    const brin = (pts, debut, fin = 'libre') => ({ pts: pts.map(p => P(...p)), ep: EP, debut, fin });
    const As = lisse3(A), Bs = lisse3(B), kA = As.findIndex(p => p[2] >= 0), kB = Bs.findIndex(p => p[2] >= 0);
    // la moitié arrière de la boucle, seule : le cordon la cache au milieu, on la voit sur les côtés
    o.push(h.formes.cordes([brin(As.slice(0, kA + 1), 'ouvert', 'ouvert')]).toString());
    o.push(h.formes.cordes([brin(Bs.slice(0, kB + 1), 'ouvert', 'ouvert')]).toString());
    const c = Math.cos(E * RAD), yB = (P(0, 0, 0)[1] - z.h) / c, yH = P(0, 0, 0)[1] / c;
    const xl = P(-R, 0, 0)[0], xr = P(R, 0, 0)[0];
    o.push(h.rect(xl, 0, 2 * R, z.h, h.a.blanc));
    tube(o, P, R, yB - 20, yH + 20, PAS, { yMin: 0, yMax: z.h });
    o.push(h.ligne(xl, 0, xl, z.h), h.ligne(xr, 0, xr, z.h));
    // le tireté de la boucle arrière ; il s'arrête aux bords du nœud serré posé devant (cache)
    let der = [];
    const fin = () => { if (der.length > 1) o.push(h.chemin(der, h.a.cache)); der = []; };
    for (let psi = 90; psi <= 270; psi += 2) {
      const X = RL * Math.sin(psi * RAD), Z = RL * Math.cos(psi * RAD);
      if (Math.abs(X) <= R - 2 && Math.abs(X) >= cache) der.push(P(X, Yr, Z)); else fin();
    }
    fin();
    o.push(h.formes.cordes([brin(As.slice(kA), 'ouvert'), brin(Bs.slice(kB), 'ouvert')]).toString());
  };
  const fleche = (o, a, b) => o.push(h.geste(`M${f1(a[0])} ${f1(a[1])} L${f1(b[0])} ${f1(b[1])}`));
  // la flèche de tirage, dans le prolongement du bout
  const tirer = (o, P, pts) => {
    const a = P(...pts[pts.length - 2]), b = P(...pts[pts.length - 1]);
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    fleche(o, [b[0] + ux * 10, b[1] + uy * 10], [b[0] + ux * 36, b[1] + uy * 36]);
  };
  // la boucle autour du cordon : A de l'arrière par la gauche jusqu'à psi0, B par la droite
  const boucle = (RL, Yr, psi0, cote) => {
    const pts = [];
    for (let psi = 180; psi >= psi0; psi -= 12) pts.push([cote * RL * Math.sin(psi * RAD), Yr, RL * Math.cos(psi * RAD)]);
    return pts;
  };

  // Premier temps : la boucle lâche, la torsade devant, les bouts vers le haut
  const g1 = z => {
    const P = vue3(z.l / 2, z.h - 62, E);
    const RL = R + 15, Yr = 0, w = 16, d = 7, zt = R + d + EP / 2 + 3;
    const T = torsade({ ya: 30, yb: 118, zt, w, d, sens: 1 });
    const ba = boucle(RL, Yr, 48, -1), bb = boucle(RL, Yr, 48, 1);
    const nDer = ba.findIndex(p => p[2] >= 0);
    const A = [...ba, [-RL * 0.5, 4, RL * 0.87 + 2], [-w - 4, 16, zt - 3], ...T.A.slice(0, 32), [-24, 124, zt], [-46, 144, zt - 1], [-74, 160, zt - 2], [-98, 170, zt - 4]];
    const B = [...bb, [RL * 0.5, 4, RL * 0.87 + 2], [w + 4, 16, zt - 3], ...T.B.slice(0, 32), [24, 124, zt], [46, 144, zt - 1], [74, 160, zt - 2], [98, 170, zt - 4]];
    return { P, RL, Yr, T, zt, A, B, nDer };
  };
  const dessinTemps1 = z => {
    const { P, RL, Yr, A, B, nDer } = g1(z), o = [];
    scene(o, P, z, A, B, nDer, RL, Yr);
    tirer(o, P, A); tirer(o, P, B);
    return o.join('\n');
  };

  // Second temps : la boucle serrée, le premier temps serré contre le cordon, le second lâche
  // Agrandi 1,4 fois par rapport au premier temps (le cordon garde sa largeur). Le premier temps
  // serré est un nœud compact posé à plat sur le devant ; un vide d'au moins un diamètre de lien
  // le sépare du premier croisement du second temps.
  const g2 = z => {
    const P = vue3(z.l / 2, z.h - 34, E);
    const RL = R + EP / 2 + 0.6, Yr = 0, zt1 = R + 3 + EP / 2 + 1.5, zt2 = zt1 + 6;
    const T1 = torsade({ ya: 6, yb: 50, zt: zt1, w: 11, d: 3.5, sens: 1 });
    const T2 = torsade({ ya: 68, yb: 188, zt: zt2, w: 22, d: 10, sens: -1 });
    const ba = boucle(RL, Yr, 36, -1), bb = boucle(RL, Yr, 36, 1);
    const nDer = ba.findIndex(p => p[2] >= 0);
    const A = [...ba, [-RL * 0.3, 3, RL * 0.95 + 2], ...T1.A.slice(0, 32), [-15, 59, (zt1 + zt2) / 2], ...T2.A.slice(5, 32), [-28, 192, zt2], [-50, 205, zt2 - 1], [-74, 214, zt2 - 2], [-96, 220, zt2 - 4]];
    const B = [...bb, [RL * 0.3, 3, RL * 0.95 + 2], ...T1.B.slice(0, 32), [15, 59, (zt1 + zt2) / 2], ...T2.B.slice(5, 32), [28, 192, zt2], [50, 205, zt2 - 1], [74, 214, zt2 - 2], [96, 220, zt2 - 4]];
    return { P, RL, Yr, T1, T2, zt1, zt2, A, B, nDer, cache: 11 + EP };
  };
  const dessinTemps2 = z => {
    const { P, RL, Yr, A, B, nDer, cache } = g2(z), o = [];
    scene(o, P, z, A, B, nDer, RL, Yr, cache);
    tirer(o, P, A); tirer(o, P, B);
    return o.join('\n');
  };

  const xy = p => [p[0], p[1]];
  // le milieu de la flèche de tirage d'un brin, et un point décalé de k à sa gauche (pour la pastille)
  const milFleche = (P, pts, k = 0) => {
    const a = P(...pts[pts.length - 2]), b = P(...pts[pts.length - 1]);
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    return [b[0] + ux * 23 + uy * k, b[1] + uy * 23 - ux * k];
  };

  return {
    ref: '29-03',
    titre: 'Nouer et couper le cordon',
    desc: 'En haut, le cordon qui sort du ventre du bébé : deux liens, à 2 et à 5 travers de doigt de la peau ; la coupe entre les deux, à la lame ; un troisième lien entre le premier et la peau si le bout suinte. En bas, le nœud plat en gros, vu de face, les bouts tenus vers le haut, en deux temps : le bout de droite passe devant celui de gauche puis derrière, on serre ; le bout de gauche passe devant celui de droite puis derrière, on serre.',
    format: 'pleine',
    disposition: [['liens', 'couper', 'suinte'], ['temps1', 'temps2']],
    hauteurs: [1, 1.05],
    vues: {
      liens: {
        titre: 'Deux liens',
        dessin: dessinLiens,
        renvois: z => {
          const { P } = geoEns(z);
          return [
            { n: 1, rond: [22, P(0, Y1, 0)[1] + 18], cible: xy(P(-Ro - 4, Y1, 0)), texte: 'à 2 travers de doigt du ventre' },
            { n: 2, rond: [22, P(0, Y2, 0)[1] - 16], cible: xy(P(-Ro - 4, Y2, 0)), texte: 'à 5 travers de doigt' },
          ];
        },
      },
      couper: {
        titre: 'Couper entre les deux',
        dessin: dessinCouper,
        renvois: z => {
          const { P } = geoEns(z);
          return [
            { n: 3, rond: [22, P(0, YC, 0)[1] - 34], cible: xy(P(-Ro - 20, YC, 0)), texte: 'couper entre les deux, à la lame stérile' },
          ];
        },
      },
      suinte: {
        titre: 'S’il suinte',
        dessin: dessinSuinte,
        renvois: z => {
          const { P } = geoEns(z);
          const c = P(0, YC, 0);
          return [
            { n: 4, rond: [z.l - 24, c[1] + 4], cible: [c[0] + 1, c[1] + 12], texte: 'le bout suinte' },
            { n: 5, rond: [22, P(0, Y3, 0)[1] + 6], cible: xy(P(-Ro - 4, Y3, 0)), texte: 'troisième lien, entre le premier et la peau' },
            { n: 6, rond: [22, c[1] - 26], cible: [c[0] - 6, c[1] - 1.5], texte: 'le moignon reste à l’air, sans rien dessus' },
          ];
        },
      },
      temps1: {
        titre: 'Nœud plat, premier temps : droite sur gauche',
        dessin: dessinTemps1,
        renvois: z => {
          const { P, RL, Yr, T, zt, B } = g1(z);
          const cote = P(-RL, Yr, 0), bas = P(0, T.y1, zt);
          return [
            { n: 7, rond: [24, cote[1] + 34], cible: [cote[0] + 1, cote[1] + 2], texte: 'le lien passe derrière le cordon' },
            { n: 8, rond: [z.l - 30, bas[1] + 30], cible: xy(bas), texte: 'le bout de droite passe devant, puis derrière' },
            { n: 9, rond: milFleche(P, B, 26), cible: milFleche(P, B, 3), texte: 'tirer les deux bouts : le lien serre' },
          ];
        },
      },
      temps2: {
        titre: 'Second temps : gauche sur droite',
        dessin: dessinTemps2,
        renvois: z => {
          const { P, T1, T2, zt1, zt2, A } = g2(z);
          const serre = P(-11, (T1.y1 + T1.y2) / 2, zt1), bas = P(0, T2.y1, zt2);
          return [
            { n: 10, rond: [30, serre[1] + 30], cible: [serre[0] - 3, serre[1]], texte: 'le premier temps, serré contre le cordon' },
            { n: 11, rond: [z.l - 30, bas[1] + 34], cible: xy(bas), texte: 'le bout de gauche passe devant, puis derrière' },
            { n: 12, rond: milFleche(P, A, -26), cible: milFleche(P, A, -3), texte: 'tirer : le nœud plat est fait' },
          ];
        },
      },
    },
  };
};
