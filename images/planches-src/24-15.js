// 24-15 — L'ongle incarné : couper droit, puis soulever le bord (ch. 24, étapes 61 et 62 ; section 9,
// « La gouttière d'ongle »).
//
// Ce que le chapitre donne, et rien de plus : couper droit, jamais en arrondi dans les coins, pas trop
// court, le coin de l'ongle doit dépasser la peau ; un ongle coupé court laisse la chair bomber
// par-dessus et l'ongle qui repousse s'y enfonce. On ne coupe pas le coin qui rentre, on le soulève :
// un petit tampon de coton glissé sous le coin ; une bande étroite de ruban glissée entre le bord de
// l'ongle et le bourrelet de peau, tirée vers le bas pour écarter la peau de l'ongle, tenue par un tour
// de bande autour de l'orteil ; ou un bout de gaine de fil électrique fendu sur toute sa longueur au
// couteau et enfilé sur le bord de l'ongle, entre l'ongle et la peau. Aucune mesure : pas de cote.
//
// Le parti. Le gros orteil d'un pied droit, vu de dessus, les orteils vers le haut de la page : le
// bord qui rentre est à gauche (le côté intérieur, dégagé). La coupe A est prise en travers de
// l'orteil et regardée de la cheville vers le bout : le côté intérieur reste à gauche, comme vu de
// dessus. L'ongle en coupe est un aplat noir, la peau un trait, l'os un contour fin. Les trois façons
// de soulever se montrent dans le même détail B de cette coupe (le bord gauche, grossi), pour qu'on
// voie ce qui change au bord. Le ruban se voit aussi de côté (sa pose en tour) ; la gaine se fend
// avant d'être enfilée. Le ruban porte une trame de toile, partout la même.
//
// Géométrie en millimètres d'orteil, repère propre à chaque vue, converti par T(s, ox, oy).
//
// La charte : pas de gris sur l'orteil (un corps) ni sur les coupes. La gaine fendue est un volume :
// contour fort, dessous à l'ombre, l'intérieur vu par le bout en gris loin. Le rouge : le cercle sur
// le coin qui doit dépasser la peau ; la traction du ruban (détail et vue de côté), la lame poussée
// le long de la gaine, la gaine qu'on enfile. Le bord qui repousse reste noir : ce n'est pas un geste.

module.exports = (h) => {
  const A = h.a;
  const NOIR = '#1A1A1A';
  const r1 = v => Math.round(v * 10) / 10;

  // ─── outils ────────────────────────────────────────────────────────────────────────────
  // Catmull-Rom échantillonné : une courbe lisse qui passe par les points donnés.
  function cr(P, ferme = false, n = 10) {
    const N = P.length, out = [];
    const g = i => ferme ? P[(i + N) % N] : P[Math.max(0, Math.min(N - 1, i))];
    const seg = ferme ? N : N - 1;
    for (let i = 0; i < seg; i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(j => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
      }
    }
    if (!ferme) out.push(P[N - 1]);
    return out;
  }
  const T = (s, ox, oy) => p => [ox + p[0] * s, oy + p[1] * s];
  const map = (pts, V) => pts.map(V);
  const chemin = (pts, V, at = A.arete, ferme = false) => h.chemin(map(pts, V), at, ferme);
  // décalage d'une polyligne le long de sa normale (e > 0 : à gauche du sens de marche, à l'écran)
  function decale(pts, e) {
    return pts.map((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      const tx = b[0] - a[0], ty = b[1] - a[1], l = Math.hypot(tx, ty) || 1;
      return [p[0] + (ty / l) * e, p[1] - (tx / l) * e];
    });
  }
  const dFleche = pts => 'M' + pts.map(p => `${r1(p[0])} ${r1(p[1])}`).join(' L');
  const fleche = (pts, V, at = A.arete) => h.fleche(dFleche(map(pts, V)), at);
  const cadre = (z, bx, by) => {
    const s = Math.min(z.l / (bx[1] - bx[0]), z.h / (by[1] - by[0]));
    return { s, V: T(s, z.l / 2 - s * (bx[0] + bx[1]) / 2, z.h / 2 - s * (by[0] + by[1]) / 2) };
  };
  const ovale = (cx, cy, rx, ry, n = 48) => Array.from({ length: n }, (_, i) => { const a = i / n * 2 * Math.PI; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; });
  const AXE = `fill="none" stroke="${NOIR}" stroke-width="0.7" stroke-dasharray="9 3 1.5 3" stroke-linecap="round"`;
  const blancArete = `fill="#FFFFFF" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"`;
  const TOILE = A.hachure('grillage', 'detail');              // le ruban : une trame de toile

  // ─── le pied vu de dessus (pied droit, orteils vers le haut) ───────────────────────────
  const W = [14.0, 39.6];                                     // la palmure entre les deux orteils
  const GROS = cr([[-15.6, 44], [-14.6, 38], [-14.4, 30], [-14.1, 22], [-13.4, 14], [-12.0, 5.0], [-9.0, 1.2], [-4.4, -0.2], [0, -0.4],
    [4.4, 0.2], [8.6, 2.0], [11.2, 5.6], [12.4, 11], [12.6, 19], [12.3, 28], [12.5, 35], [13.2, 38.6], W]);
  const DEUX = cr([W, [14.9, 36], [14.8, 28], [15.0, 20], [15.9, 14.5], [17.9, 11.4], [21.0, 10.2], [24.1, 10.9], [26.4, 13.4],
    [27.5, 18], [27.6, 26], [27.2, 33], [27.8, 38.4], [29.0, 40.6]]);
  const ONGLE2 = cr([[18.7, 21.5], [18.4, 16.8], [19.6, 14.1], [21.7, 13.4], [23.8, 14.0], [25.1, 16.6], [24.8, 21.5], [21.7, 22.6]], true);
  const PLIS = [cr([[-6.5, 31.6], [-2, 30.7], [2.5, 31.0]]), cr([[-4.5, 33.8], [0, 33.1], [4.5, 33.6]])];
  const ARC = cr([[8.5, 20.2], [6.2, 22.6], [3, 23.8], [0, 24.1], [-3, 23.8], [-6.4, 22.6], [-9.0, 20.2]]);
  const CUTICULE = cr([[9.9, 20.8], [7.0, 24.0], [3, 25.3], [0, 25.6], [-3, 25.3], [-7.2, 24.0], [-10.3, 20.8]]);
  const LUNULE = cr([[-5.6, 21.2], [-3, 19.5], [0, 19.1], [3, 19.5], [5.3, 21.2]]);
  const PLI_D = cr([[9.9, 21.4], [10.0, 14], [10.0, 10.2], [10.5, 8.4], [11.5, 7.4]]);
  const PLI_G = cr([[-10.4, 21.4], [-10.5, 14], [-10.5, 10.2], [-10.9, 8.4], [-11.9, 7.3]]);
  const ONGLE_DROIT = [[-9.4, 3.0], [8.9, 3.0], [8.8, 12], ...ARC, [-9.3, 12]];

  function pied(V, { ongle = ONGLE_DROIT, pliG = PLI_G } = {}) {
    return [
      chemin(GROS, V, A.contour), chemin(DEUX, V, A.contour),
      chemin(ONGLE2, V, A.detail, true),
      ...PLIS.map(p => chemin(p, V, A.fin)),
      chemin(CUTICULE, V, A.detail), chemin(LUNULE, V, A.fin),
      chemin(PLI_D, V, A.detail), pliG ? chemin(pliG, V, A.detail) : '',
      chemin(ongle, V, blancArete, true),
    ].join('\n');
  }
  // l'orteil se dessine un peu long ; on le tasse au-delà du bout de l'ongle, dans le repère de la vue
  const sq = y => y <= 4 ? y : 4 + (y - 4) * 0.78;
  const cadreDessus = z => { const c = cadre(z, [-19, 29], [-6.5, sq(44)]); return { s: c.s, V: p => c.V([p[0], sq(p[1])]) }; };

  // Vue 1 — bien coupé : droit, coins carrés, le coin dépasse le bout du bourrelet
  const ONGLE_BON = [[-7.6, 3.0], [8.9, 3.0], [8.8, 12], ...ARC, [-9.3, 12], [-8.9, 7.0]];
  const vueBon = z => { const V = cadreDessus(z).V, [cx, cy] = V([-8.3, 3.6]); return pied(V, { ongle: ONGLE_BON }) + '\n' + h.controle(cx, cy, 12); };

  // Vue 2 — mal coupé : coins en arrondi, court ; la chair bombe dans le coin ; le bord repousse dedans
  const ONGLE_COURT = [...cr([[-9.3, 16.0], [-8.9, 13.2], [-7.0, 11.2], [-3.4, 10.3], [0, 10.2], [3.4, 10.3], [6.6, 11.2], [8.4, 13.2], [8.8, 16.0]]),
    ...ARC, [-9.3, 16.0]];
  // la chair du coin : elle remplit la place du coin coupé et bombe par-dessus le bord de l'ongle
  const BOSSE = cr([[-10.4, 21.4], [-10.5, 18.5], [-10.0, 16.2], [-8.6, 14.3], [-6.8, 12.6], [-5.6, 10.4], [-5.8, 7.6], [-7.4, 5.3], [-9.8, 3.9], [-11.2, 4.0]]);
  const BOSSE_FOND = [...BOSSE, [-11.8, 5.5], [-12.2, 8], [-12.8, 12], [-13.3, 16], [-13.7, 21.4]];
  const BOSSE_PLI = cr([[-11.2, 13.5], [-9.6, 10.2], [-8.0, 7.2]]);
  const TIRET = `fill="none" stroke="${NOIR}" stroke-width="1.4" stroke-dasharray="5 3.5" stroke-linecap="round"`;
  const yA = 18.5;
  function vueRate(z) {
    const { V } = cadreDessus(z);
    const out = [pied(V, { ongle: ONGLE_COURT, pliG: null })];
    out.push(chemin(BOSSE_FOND, V, A.blanc, true), chemin(BOSSE, V, A.arete), chemin(BOSSE_PLI, V, A.fin));
    out.push(fleche([[-9.3, 16.0], [-9.45, 5.2]], V, TIRET));   // le bord qui repousse, dans la chair
    // trait de coupe A–A ; les flèches regardent vers le bout de l'orteil
    const [xa, ya] = V([-17.4, yA]), [xb] = V([13.6, yA]);
    out.push(h.ligne(xa, ya, xb, ya, AXE));
    for (const x of [xa, xb]) {
      out.push(fleche([[x, ya], [x, ya - 11]], p => p, A.detail));
      out.push(h.texte(x, ya - 15, 'A'));
    }
    return out.join('\n');
  }

  // ─── la coupe A, en travers de l'orteil, vue de la cheville vers le bout ────────────────
  // repère : x vers le côté extérieur (à droite), y vers la plante ; 0 au milieu du dessus de l'ongle.
  const EP = 1.0;                                             // épaisseur de l'ongle, un peu forcée pour se lire
  const BAS = [[8.0, 1.82], [9.9, 0.95], [11.9, 2.6], [12.9, 5.8], [12.9, 10.3], [11.4, 15.3], [7.4, 18.7], [0, 20.0],
    [-7.4, 18.7], [-11.4, 15.3], [-12.9, 10.3]];
  const ETATS = {
    rentre: {
      gauche: [[-13.4, 6.4], [-13.2, 2.8], [-11.8, 0.2], [-9.8, -0.9], [-7.9, -0.4], [-6.7, 1.2]],
      xG: -9.6, dessus: x => 0.03 * x * x + (x < -7 ? 0.22 * (-7 - x) ** 2 : 0),
    },
    coton: {
      gauche: [[-13.2, 6.4], [-13.0, 3.2], [-11.8, 1.5], [-10.4, 1.3], [-9.4, 2.1], [-8.4, 3.2], [-7.2, 3.0], [-6.3, 2.25]],
      xG: -9.4, dessus: x => 0.03 * x * x - (x < -6 ? 0.22 * (-6 - x) ** 2 : 0),
    },
    ruban: {
      gauche: [[-13.2, 7.4], [-12.7, 4.9], [-11.7, 3.7], [-10.5, 3.6], [-9.6, 4.3], [-8.6, 4.4], [-7.6, 3.4], [-7.1, 2.55]],
      xG: -9.2, dessus: x => 0.03 * x * x,
    },
    gouttiere: {
      gauche: [[-13.3, 6.8], [-13.2, 3.9], [-12.4, 2.3], [-11.3, 1.9], [-11.05, 3.3], [-10.5, 4.45], [-9.4, 4.8], [-8.3, 4.4], [-7.4, 2.7]],
      xG: -9.2, dessus: x => 0.03 * x * x,
    },
  };
  function coupe(etat) {
    const E = ETATS[etat];
    const peau = cr([...BAS, ...E.gauche]);
    const haut = [];
    for (let x = E.xG; x <= 9.2 + 1e-6; x += 0.2) haut.push([x, E.dessus(x)]);
    const dessous = decale(haut, -EP);                          // vers la plante
    return { peau, ongle: [...haut, ...dessous.reverse()] };
  }
  const DB = [-10.5, 4.5], RB = 6.8;                          // le détail B : le bord gauche
  function contenuCoupe(V, etat) {
    const C = coupe(etat);
    const out = [chemin(ovale(0, 9.8, 5.4, 3.7), V, A.detail, true)];
    if (etat === 'ruban') {
      // la bande : collée sur la peau, du bord du bourrelet jusque sous l'orteil
      let i0 = 0;
      C.peau.forEach((p, i) => { if (Math.hypot(p[0] + 10.0, p[1] - 3.8) < Math.hypot(C.peau[i0][0] + 10.0, C.peau[i0][1] - 3.8)) i0 = i; });
      const brin = C.peau.slice(0, i0 + 1).filter(p => !(p[0] > 6.5 && p[1] < 18.9)).reverse();
      out.push(chemin([...brin, ...decale(brin, -0.9).reverse()], V, TOILE, true));
      out.push(h.geste(dFleche(map([[-15.3, 2.6], [-15.3, 8.6]], V))));   // la traction, vers le bas, le long du flanc
    }
    out.push(chemin(C.peau, V, A.arete));
    if (etat === 'coton') {
      const pts = [];
      for (let i = 0; i < 26; i++) {
        const a = i / 26 * 2 * Math.PI, r = 1 + 0.12 * Math.cos(6 * a);
        pts.push([-8.4 + 1.6 * r * Math.cos(a), 2.35 + 0.75 * r * Math.sin(a)]);
      }
      out.push(chemin(cr(pts, true, 4), V, `fill="#FFFFFF" stroke="${NOIR}" stroke-width="0.7" stroke-linejoin="round"`, true));
      out.push(chemin(cr([[-9.6, 2.45], [-8.5, 2.2], [-7.2, 2.5]]), V, A.fin), chemin(cr([[-9.2, 2.85], [-8.0, 2.75], [-7.3, 2.9]]), V, A.fin));
    }
    out.push(chemin(C.ongle, V, A.plein, true));
    if (etat === 'gouttiere') {
      const c = [-9.35, 3.05], R = 1.55, r = 0.95, fente = -25 * Math.PI / 180, demi = 34 * Math.PI / 180;
      const ext = [], int = [];
      for (let i = 0; i <= 40; i++) {
        const a = fente + demi + i / 40 * (2 * Math.PI - 2 * demi);
        ext.push([c[0] + R * Math.cos(a), c[1] + R * Math.sin(a)]);
        int.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]);
      }
      out.push(chemin([...ext, ...int.reverse()], V, blancArete, true));
    }
    return out.join('\n');
  }
  const cadreCoupe = z => cadre(z, [-18, 16], [-4, 22]);
  function vueRentre(z) {
    const { s, V } = cadreCoupe(z);
    const out = [contenuCoupe(V, 'rentre')];
    const [cx, cy] = V(DB);
    out.push(h.cercle(cx, cy, RB * s, A.detail));
    out.push(h.texte(cx - RB * s * 0.78, cy + RB * s * 0.78 + 12, 'B'));
    return out.join('\n');
  }
  // le détail B, grossi, découpé dans un cercle
  const cadreDetail = z => { const s = (Math.min(z.l, z.h) / 2 - 14) / RB; return { s, V: T(s, z.l / 2 - s * DB[0], z.h / 2 - s * DB[1]) }; };
  function vueDetail(z, etat) {
    const { s, V } = cadreDetail(z);
    const [cx, cy] = V(DB), id = `pl-detail-${etat}`;
    return `<clipPath id="${id}"><circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(RB * s)}"/></clipPath>\n<g clip-path="url(#${id})">\n${contenuCoupe(V, etat)}\n</g>\n` +
      h.cercle(cx, cy, RB * s, A.detail);
  }

  // ─── le ruban, vu de côté (face intérieure du pied droit, le bout de l'orteil à droite) ─
  const PROFIL = cr([[-54, -10.7], [-50, -9.2], [-42, -6.4], [-33, -3.8], [-26, -2.4], [-21.3, -1.7], [-10, -0.6],
    [-1.5, 0.0], [0.9, 1.2], [2.1, 4.5], [2.0, 8.5], [0.6, 12.4], [-3, 16.0], [-8, 18.4], [-15, 19.3], [-21, 18.9],
    [-24.2, 17.8], [-25.6, 17.3], [-27.2, 18.4], [-34, 19.8], [-40, 20.6], [-45, 21.6], [-50, 23.3], [-54, 24.0]]);
  const ONGLE_COTE = [...cr([[0.5, 0.3], [-6, -0.3], [-12, -0.8], [-19.8, -1.45]]), ...cr([[-19.8, -1.45], [-20.8, -0.2], [-19.8, 1.1]]).slice(1),
    ...cr([[-19.8, 1.1], [-12, 1.7], [-5, 1.95], [-0.6, 1.7], [0.5, 0.3]]).slice(1)];
  const PLI_COTE = cr([[-21.8, 2.1], [-12, 2.9], [-5, 3.15], [-0.8, 2.8], [1.3, 1.8]]);
  const cadreCote = z => cadre(z, [-55, 5], [-15, 30]);
  function vueRubanCote(z) {
    const { V } = cadreCote(z);
    const out = [];
    // premier passage : glissé au bord de l'ongle, tiré vers le bas jusque sous l'orteil
    out.push(chemin([[-6.3, 1.95], [-11.7, 1.72], [-32.5, 11.2], [-30.0, 15.6]], V, TOILE, true));
    // le tour qui tient : un tour complet, du dessus jusque sous l'orteil, par-dessus le bout de la bande
    const tour = [[-25.6, -2.34], [-31.0, -3.4], [-34.0, 19.8], [-28.4, 18.8]];
    out.push(chemin(tour, V, A.blanc, true), chemin(tour, V, TOILE, true));
    out.push(chemin(PROFIL, V, A.contour));
    out.push(chemin(PLI_COTE, V, A.detail));
    out.push(chemin(ONGLE_COTE, V, blancArete, true));
    out.push(h.geste(dFleche(map([[-13.0, 9.6], [-21.0, 13.8]], V))));   // tirer dans l'axe de la bande, vers la base
    return out.join('\n');
  }

  // ─── la gaine, fendue au couteau ────────────────────────────────────────────────────────
  // Tube couché, vu un peu de biais : le bout droit tourné vers l'œil, le gauche fuit. La lame, tranchant
  // en haut, pointe dans le trou, est poussée vers la gauche : la fente va de la lame au bout droit, où
  // la tranche du tube montre l'anneau ouvert.
  const cadreGaine = z => cadre(z, [-12.5, 12.5], [-14, 3.5]);
  function vueGaine(z) {
    const { V } = cadreGaine(z);
    const out = [];
    const R = 1.7, rx = 0.85, r = 1.0, L0 = -10, L1 = 10, phi = 35 * Math.PI / 180;
    const E = (cx, a, rr = R, rrx = rx) => [cx - rrx * Math.sin(a), -rr * Math.cos(a)];
    const arc = (cx, a0, a1, rr, rrx, n = 40) => Array.from({ length: n + 1 }, (_, i) => E(cx, a0 + (a1 - a0) * i / n, rr, rrx));
    const xF = -rx * Math.sin(phi), yF = -R * Math.cos(phi);    // la génératrice de la fente
    const xk = 1.0;                                             // où la lame traverse la paroi
    const u = [0.82, -0.57], n = [-0.57, -0.82];                // axe de la lame ; n : côté du tranchant
    const tip = [xk + xF - 1.58, -0.29];
    const P = (a, b) => [tip[0] + u[0] * a + n[0] * b, tip[1] + u[1] * a + n[1] * b];
    // la lame sort du cadre : dos droit, tranchant qui remonte en ventre jusqu'à la pointe, biseau parallèle
    const lame = [...cr([P(0, 0), P(1.5, 1.9), P(4, 3.6), P(8, 4.9), P(12, 5.3)]), P(40, 5.3), P(40, 0)];
    out.push(chemin(lame, V, blancArete, true));
    out.push(chemin([...cr([P(1.3, 0.9), P(4, 2.2), P(8, 3.2), P(12, 3.55)]), P(40, 3.55)], V, A.fin));
    // le tube : fond blanc, silhouettes, bout gauche (la moitié vue), bout droit (l'anneau, ouvert à la fente)
    out.push(chemin([[L1, -R], [L0, -R], ...arc(L0, 0, Math.PI, R, rx), [L1, R]], V, A.blanc, true));
    const a35 = Math.acos(-0.35);                               // le dessous du tube, à l'ombre
    out.push(chemin([...arc(L0, a35, Math.PI, R, rx), [L1, R], [L1, 0.35 * R]], V, A.ombre, true));
    out.push(chemin([[L0, -R], [L1, -R]], V, A.contour), chemin([[L0, R], [L1, R]], V, A.contour), chemin(arc(L0, 0, Math.PI, R, rx), V, A.contour));
    const g = 13 * Math.PI / 180;
    const bout = [...arc(L1, phi + g, phi + 2 * Math.PI - g, R, rx), ...arc(L1, phi + 2 * Math.PI - g, phi + g, r, rx * r / R)];
    out.push(chemin(bout, V, blancArete, true));
    out.push(chemin(arc(L1, Math.PI, 2 * Math.PI, R, rx), V, A.contour));
    out.push(chemin(arc(L1, 0, 2 * Math.PI, r * 0.97, rx * r / R * 0.97), V, A.loin, true));   // l'intérieur, vu par le bout
    // la fente, un peu ouverte derrière la lame
    out.push(chemin([[xk + xF, yF], [L1 + xF - 0.1, yF - 0.2]], V, A.detail), chemin([[xk + xF, yF], [L1 + xF + 0.1, yF + 0.2]], V, A.detail));
    // la pointe, cachée dans le trou
    out.push(chemin([P(2.3, 0), P(0, 0), P(0.9, 0.85)], V, A.cache));
    out.push(h.geste(dFleche(map([[-2.6, -5.4], [-9.4, -5.4]], V))));   // le sens de la coupe
    return `<clipPath id="g2415-cadre"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#g2415-cadre)">\n${out.join('\n')}\n</g>`;
  }

  // ─── la gouttière enfilée, vue de dessus ────────────────────────────────────────────────
  const PLI_G_GAINE = cr([[-10.4, 21.4], [-10.5, 18.6], [-11.6, 16.8], [-11.9, 10], [-11.8, 5.8], [-12.0, 4.9]]);
  function vueGouttiereDessus(z) {
    const { V } = cadreDessus(z);
    const out = [pied(V, { pliG: PLI_G_GAINE })];
    const x0 = -9.55, lg = 1.45, y0 = 3.0, y1 = 16.4;
    out.push(chemin([[x0 - lg, y0], [x0 - lg, y1], [x0 + lg, y1], [x0 + lg, y0]], V, blancArete, true));
    out.push(chemin([[x0 - lg * 0.45, y0 + 1.2], [x0 - lg * 0.45, y1 - 0.6]], V, A.fin));
    out.push(chemin(ovale(x0, y0, lg, 0.55, 36), V, blancArete, true), chemin(ovale(x0, y0, 0.85, 0.3, 36), V, A.detail, true));
    out.push(h.geste(dFleche(map([[x0, -4.8], [x0, 1.4]], V))));
    return out.join('\n');
  }

  // ─── renvois ────────────────────────────────────────────────────────────────────────────
  const R = (V, rond, cible) => ({ rond: V(rond), cible: V(cible) });
  return {
    ref: '24-15',
    titre: 'L’ongle incarné : couper droit, puis soulever le bord',
    desc: 'Le gros orteil d’un pied droit vu de dessus, le deuxième orteil à côté. Bien coupé : ongle coupé droit, coins carrés, le coin dépasse le bout du bourrelet de peau. Mal coupé : coins en arrondi et ongle court, la chair bombe dans le coin, et le bord qui repousse (tireté, flèche vers le bout) entre dans cette chair. Coupe A en travers de l’orteil, côté intérieur à gauche : le bourrelet enflé et le bord de l’ongle (aplat noir) qui s’y enfonce ; un cercle B entoure ce bord. Puis trois fois le détail B, grossi : un tampon de coton sous le bord, qui passe au-dessus de la peau ; une bande de ruban (trame de toile) collée au ras du bord et tirée vers le bas le long du flanc, la peau écartée de l’ongle ; une gaine fendue qui coiffe le bord de l’ongle, entre l’ongle et la peau. Le ruban vu de côté : un passage du bord de l’ongle jusque sous l’orteil, flèche vers le bas, et un tour revenu par-dessus, derrière l’ongle. Une gaine de fil électrique fendue au couteau : la pointe dans le trou, tranchant en haut, la lame poussée le long du tube ; au bout, l’anneau ouvert. La gaine enfilée sur le bord de l’ongle vue de dessus, glissée depuis le coin.',
    format: 'pleine',
    disposition: [['bon', 'rate', 'rentre'], ['coton', 'ruban', 'rubanCote'], ['gaine', 'gouttiere', 'gouttiereDessus']],
    vues: {
      bon: {
        titre: 'Bien coupé',
        dessin: vueBon,
        renvois: z => { const { V } = cadreDessus(z); return [
          { n: 1, ...R(V, [6.5, -3.4], [3, 3.0]), texte: 'coupé droit, coins carrés' },
          { n: 2, ...R(V, [-15.9, -1.8], [-7.6, 3.0]), texte: 'le coin dépasse la peau' },
        ]; },
      },
      rate: {
        titre: 'Mal coupé',
        dessin: vueRate,
        renvois: z => { const { V } = cadreDessus(z); return [
          { n: 3, ...R(V, [12.5, -3.4], [6.9, 11.4]), texte: 'en arrondi, trop court' },
          { n: 4, ...R(V, [-15.9, -1.8], [-6.1, 9.2]), texte: 'la chair bombe au coin' },
          { n: 5, ...R(V, [-15.9, 5.8], [-9.37, 12.6]), texte: 'le coin repousse dedans' },
        ]; },
      },
      rentre: {
        titre: 'Coupe A : le bord qui rentre',
        dessin: vueRentre,
        renvois: z => { const { V } = cadreCoupe(z); return [
          { n: 6, ...R(V, [-3.2, -2.8], [-9.6, -0.8]), texte: 'bourrelet de peau enflé' },
          { n: 7, ...R(V, [3.5, -2.8], [-8.2, 2.3]), texte: 'le bord s’y enfonce' },
        ]; },
      },
      coton: {
        titre: 'Détail B : le coton sous le coin',
        dessin: z => vueDetail(z, 'coton'),
        renvois: z => { const { V } = cadreDetail(z); return [
          { n: 8, ...R(V, [-3.4, 11.4], [-7.9, 2.8]), texte: 'tampon de coton' },
          { n: 9, ...R(V, [-17.6, -2.4], [-9.4, 0.4]), texte: 'le bord passe par-dessus' },
        ]; },
      },
      ruban: {
        titre: 'Détail B : le ruban',
        dessin: z => vueDetail(z, 'ruban'),
        renvois: z => { const { V } = cadreDetail(z); return [
          { n: 10, ...R(V, [-17.6, -2.4], [-11.4, 3.3]), texte: 'ruban au ras du bord' },
          { n: 11, ...R(V, [-3.4, -2.4], [-9.3, 4.05]), texte: 'la peau s’écarte de l’ongle' },
        ]; },
      },
      rubanCote: {
        titre: 'Le ruban posé, vu de côté',
        dessin: vueRubanCote,
        renvois: z => { const { V } = cadreCote(z); return [
          { n: 12, ...R(V, [-3, -8.5], [-12.5, 3.6]), texte: 'glissé au bord, tiré en bas' },
          { n: 13, ...R(V, [-43, -12.0], [-31.4, 5.0]), texte: 'un tour autour de l’orteil' },
        ]; },
      },
      gaine: {
        titre: 'La gaine, fendue au couteau',
        dessin: vueGaine,
        renvois: z => { const { V } = cadreGaine(z); return [
          { n: 14, ...R(V, [-9, 3.4], [-6, 1.7]), texte: 'gaine de fil électrique' },
          { n: 15, ...R(V, [9.8, -4.8], [7.0, -1.35]), texte: 'fendue sur sa longueur' },
        ]; },
      },
      gouttiere: {
        titre: 'Détail B : la gouttière',
        dessin: z => vueDetail(z, 'gouttiere'),
        renvois: z => { const { V } = cadreDetail(z); return [
          { n: 16, ...R(V, [-17.6, -2.4], [-10.2, 2.15]), texte: 'coiffe le bord de l’ongle' },
        ]; },
      },
      gouttiereDessus: {
        titre: 'Enfilée par le coin',
        dessin: vueGouttiereDessus,
        renvois: z => { const { V } = cadreDessus(z); return [
          { n: 17, ...R(V, [-15.9, 1.0], [-11.9, 10.5]), texte: 'la peau tenue loin de l’ongle' },
        ]; },
      },
    },
  };
};
