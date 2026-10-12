// Planche 98-01a — Le fléau : les pièces et l'attache.
// Chapitre 98, « Ce qui nourrit un hiver », § « Le fléau qu'on fabrique » (et étape 39).
// Le chapitre dit : deux bâtons, un long et un court, reliés par une corde, une lanière de cuir
// ou une petite chaîne ; le long, le manche, se tient à deux mains ; le court, le battoir, en
// bois franc lourd, du merisier si on en a ; la liaison, une lanière de cuir ou de babiche passée
// dans une boucle au bout de chaque bâton, doit laisser le battoir tourner librement : c'est ce
// qui le fait tomber à plat sur les épis au lieu de les frapper du bout. La lanière s'use la
// première : on la change dès qu'elle s'effiloche, on en garde une de rechange.
//
// Le chapitre ne donne aucune mesure : aucune cote. Les proportions du dessin (manche à peu près
// deux fois le battoir, battoir plus gros) ne sont pas des mesures.
// Le chapitre ne dit pas comment la boucle tient au bâton ni comment la lanière se ferme : la
// boucle est dessinée en bande de cuir pliée sur le bout, ses deux bouts ligaturés sur le bâton ;
// la lanière fait un anneau dont les deux bouts se recouvrent, ligaturés de même. Les deux
// boucles sont dans le même plan, l'anneau à angle droit : trois maillons d'une chaîne, qui
// laissent le battoir libre dans tous les sens.
module.exports = (h) => {
  const A = h.a;
  const f1 = v => Math.round(v * 10) / 10;
  const blanc = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const pl = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])} ${f1(p[1])}`).join(' ');

  // ── les proportions du dessin, en mm (aucune n'est cotée) ──
  const LM = 1350, LB = 750, RM = 18, RB = 25;   // manche, battoir : longueur, rayon
  const T = 4, W = 25;                            // bande de cuir des boucles : épaisseur, largeur
  const QA = 90, DA = 14, LIG = [44, 72];         // queue sur le bâton ; droit au-delà du bout ; ligature
  const G = 139;                                  // du bout du manche au bout du battoir
  const TL = 4, WL = 10;                          // lanière : épaisseur, largeur
  const RC = 26, CA = 35, CB = G - 35;            // anneau : demi-largeur à l'axe, centres des deux bouts
  const SZ = [58, 80];                            // ligature des deux bouts de la lanière

  // un repère : x le long du fléau (0 au bout du manche), y en travers ; k px par mm
  const rep = (ox, oy, k) => ({ k, X: x => ox + x * k, Y: y => oy + y * k, p: (x, y) => [ox + x * k, oy + y * k] });

  // ── un bâton, de xr à xb (le bout arrondi) ; en xr, une rupture ou un autre bout arrondi ──
  function baton(R, xr, xb, r, rupture = true, at = A.arete) {
    const s = Math.sign(xb - xr), c = Math.min(5, r * 0.3), X = R.X, Y = R.Y;
    const c0 = rupture ? 0 : c;
    let d = `M${f1(X(xr + s * c0))} ${f1(Y(-r))} L${f1(X(xb - s * c))} ${f1(Y(-r))} Q${f1(X(xb))} ${f1(Y(-r))} ${f1(X(xb))} ${f1(Y(-r + c))}`
      + ` L${f1(X(xb))} ${f1(Y(r - c))} Q${f1(X(xb))} ${f1(Y(r))} ${f1(X(xb - s * c))} ${f1(Y(r))} L${f1(X(xr + s * c0))} ${f1(Y(r))}`;
    if (rupture) {
      const x0 = X(xr);
      d += ` L${f1(x0 + s * 3)} ${f1(Y(r * 0.4))} L${f1(x0 - s * 4)} ${f1(Y(-r * 0.1))} L${f1(x0 + s * 2)} ${f1(Y(-r * 0.55))} Z`;
    } else {
      d += ` Q${f1(X(xr))} ${f1(Y(r))} ${f1(X(xr))} ${f1(Y(r - c))} L${f1(X(xr))} ${f1(Y(-r + c))} Q${f1(X(xr))} ${f1(Y(-r))} ${f1(X(xr + s * c))} ${f1(Y(-r))} Z`;
    }
    return h.path(d, blanc(at));
  }

  // ── la boucle vue de face : la bande pliée sur le bout, ses deux queues couchées sur le bâton ──
  // xb le bout du bâton, s le sens de la boucle (+1 vers la droite), r le rayon du bâton
  function boucleFace(R, xb, s, r, at = A.arete) {
    const ro = r + T, xq = xb - s * QA, xs = xb + s * DA, X = R.X, Y = R.Y, k = R.k;
    const so = s > 0 ? 1 : 0, si = s > 0 ? 0 : 1;
    const d = `M${f1(X(xq))} ${f1(Y(-ro))} L${f1(X(xs))} ${f1(Y(-ro))} A${f1(ro * k)} ${f1(ro * k)} 0 0 ${so} ${f1(X(xs))} ${f1(Y(ro))}`
      + ` L${f1(X(xq))} ${f1(Y(ro))} L${f1(X(xq))} ${f1(Y(r))} L${f1(X(xs))} ${f1(Y(r))}`
      + ` A${f1(r * k)} ${f1(r * k)} 0 0 ${si} ${f1(X(xs))} ${f1(Y(-r))} L${f1(X(xq))} ${f1(Y(-r))} Z`;
    return h.path(d, blanc(at));
  }

  // ── la boucle vue de dessus : on voit la face de la bande, jusqu'au pli ──
  function boucleDessus(R, xb, s, r) {
    const ro = r + T, xq = xb - s * QA, xs = xb + s * DA, xt = xs + s * ro, X = R.X, Y = R.Y;
    const out = [h.path(pl([[X(xq), Y(-W / 2)], [X(xt), Y(-W / 2)], [X(xt), Y(W / 2)], [X(xq), Y(W / 2)]]) + ' Z', blanc(A.arete))];
    // le pli : la bande tourne vers le bas, des traits de plus en plus serrés vers le bout
    for (const f of [0.35, 0.62, 0.82, 0.94]) out.push(h.ligne(X(xs + s * ro * f), Y(-W / 2 + 1), X(xs + s * ro * f), Y(W / 2 - 1), A.fin));
    return out.join('\n');
  }

  // ── une ligature : des tours de babiche serrés, de x0 à x1, sur une hauteur ±e ──
  function ligature(R, x0, x1, e, n) {
    const X = R.X, Y = R.Y, a = Math.min(x0, x1), b = Math.max(x0, x1);
    const out = [h.path(pl([[X(a), Y(-e)], [X(b), Y(-e)], [X(b), Y(e)], [X(a), Y(e)]]) + ' Z', blanc(A.arete))];
    const pas = (b - a) / n;
    for (let i = 1; i < n; i++) {
      const x = a + i * pas;
      out.push(h.ligne(X(x - pas * 0.3), Y(-e), X(x + pas * 0.3), Y(e), A.detail));
    }
    return out.join('\n');
  }

  // ── le fil du bois : quelques traits fins le long d'un bâton ──
  function fil(R, x0, x1, r) {
    const X = R.X, Y = R.Y, out = [];
    const a = Math.min(x0, x1), b = Math.max(x0, x1), L = b - a;
    out.push(h.ligne(X(a + L * 0.08), Y(-r * 0.42), X(a + L * 0.46), Y(-r * 0.42), A.fin));
    out.push(h.ligne(X(a + L * 0.55), Y(-r * 0.38), X(a + L * 0.88), Y(-r * 0.38), A.fin));
    out.push(h.ligne(X(a + L * 0.22), Y(r * 0.3), X(a + L * 0.7), Y(r * 0.3), A.fin));
    return out.join('\n');
  }

  // ── l'anneau de lanière, de face : vu par la tranche ──
  function anneauFace(R) {
    const X = R.X, Y = R.Y, k = R.k;
    const x0 = CA - RC - WL / 2, x1 = CB + RC + WL / 2;
    const out = [];
    out.push(`<rect x="${f1(X(x0))}" y="${f1(Y(-TL / 2))}" width="${f1((x1 - x0) * k)}" height="${f1(TL * k)}" rx="${f1(TL * k / 2)}" ${blanc(A.arete)}/>`);
    // les deux bouts qui se recouvrent, et leur ligature
    out.push(h.path(pl([[X(SZ[0] - 3), Y(-TL)], [X(SZ[1] + 3), Y(-TL)], [X(SZ[1] + 3), Y(TL)], [X(SZ[0] - 3), Y(TL)]]) + ' Z', blanc(A.arete)));
    out.push(ligature(R, SZ[0], SZ[1], TL + 1.5, 7));
    return out.join('\n');
  }

  // ── l'anneau de lanière, de dessus : à plat ──
  function anneauDessus(R) {
    const X = R.X, Y = R.Y, k = R.k, ro = RC + WL / 2, ri = RC - WL / 2;
    const d = `M${f1(X(CA))} ${f1(Y(-ro))} L${f1(X(CB))} ${f1(Y(-ro))} A${f1(ro * k)} ${f1(ro * k)} 0 0 1 ${f1(X(CB))} ${f1(Y(ro))}`
      + ` L${f1(X(CA))} ${f1(Y(ro))} A${f1(ro * k)} ${f1(ro * k)} 0 0 1 ${f1(X(CA))} ${f1(Y(-ro))} Z`
      + ` M${f1(X(CA))} ${f1(Y(-ri))} A${f1(ri * k)} ${f1(ri * k)} 0 0 0 ${f1(X(CA))} ${f1(Y(ri))} L${f1(X(CB))} ${f1(Y(ri))}`
      + ` A${f1(ri * k)} ${f1(ri * k)} 0 0 0 ${f1(X(CB))} ${f1(Y(-ri))} Z`;
    const out = [h.path(d, blanc(A.arete).replace('fill=', 'fill-rule="evenodd" fill='))];
    // les deux bouts ligaturés ensemble, sur le côté proche ; le bout du dessus dépasse à droite
    out.push(h.ligne(X(SZ[1] + 3), Y(ri), X(SZ[1] + 3), Y(ro), A.detail));
    const lig = ligature({ X: x => X(x), Y: y => Y(RC + y), k }, SZ[0], SZ[1], WL / 2 + 1.5, 7);
    out.push(lig);
    return out.join('\n');
  }

  // ── les épis couchés : une couche vue de côté, pour les deux vues du bas ──
  // un épi d'orge : les grains en chevrons autour d'un axe, les barbes devant
  function epi(x, y, L, ang, e = 0.2) {
    const c = Math.cos(ang * Math.PI / 180), s = Math.sin(ang * Math.PI / 180);
    const P = (u, v) => [x + u * c - v * s, y + u * s + v * c];
    const w = L * e;
    const bord = [];
    for (let i = 0; i <= 10; i++) { const u = L * i / 10; bord.push(P(u, -w * Math.sin(Math.PI * (0.15 + 0.85 * i / 10)))); }
    for (let i = 10; i >= 0; i--) { const u = L * i / 10; bord.push(P(u, w * Math.sin(Math.PI * (0.15 + 0.85 * i / 10)))); }
    const out = [h.path(pl(bord) + ' Z', blanc(A.detail))];
    for (let i = 1; i < 6; i++) { const u = L * i / 6; out.push(h.chemin([P(u - w * 0.9, -w * 0.75), P(u, 0), P(u - w * 0.9, w * 0.75)], A.fin)); }
    for (const v of [-0.5, -0.15, 0.2, 0.55]) out.push(h.chemin([P(L * 0.9, v * w), P(L * 1.75, v * w * 3.2)], A.fin));
    return out.join('\n');
  }
  // la couche : paille couchée (traits le long), épis en haut, de x0 à x1 ; le dessus en y0, le sol en y1
  function couche(x0, x1, y0, y1, seed = 1) {
    const out = [];
    let r = seed;
    const rnd = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
    // la masse de la couche
    const bord = [[x0, y1]];
    for (let x = x0 + 10; x <= x1 - 10 + 0.1; x += (x1 - x0 - 20) / 12) bord.push([x, y0 + (rnd() - 0.5) * 3]);
    bord.push([x1, y1]);
    out.push(h.path(pl(bord) + ' Z', blanc(A.detail)));
    for (let i = 0; i < 5; i++) {
      const y = y0 + (y1 - y0) * (0.25 + 0.15 * i);
      const a = x0 + 4 + rnd() * 20, b = x1 - 4 - rnd() * 20;
      out.push(h.ligne(a, y, b, y + (rnd() - 0.5) * 2, A.fin));
    }
    // les épis, pointés tantôt d'un côté, tantôt de l'autre : les deux rangées se croisent au milieu
    const n = Math.round((x1 - x0) / 20);
    for (let i = 0; i < n; i++) {
      const gauche = i % 2 === 0;
      const x = x0 + 8 + (i + 0.3 * rnd()) * (x1 - x0 - 16) / n;
      const L = 15 + rnd() * 4;
      out.push(epi(gauche ? x + L * 0.5 : x - L * 0.5, y0 + 2 + rnd() * 2, L, gauche ? 180 + (rnd() - 0.5) * 12 : (rnd() - 0.5) * 12, 0.2));
    }
    return out.join('\n');
  }
  // le sol, ses hachures, et la toile posée dessus
  function sol(x0, x1, y) {
    return [h.rect(x0, y, x1 - x0, 7, A.hachure('terre', 'aucun')), h.ligne(x0, y, x1, y, A.arete)].join('\n');
  }

  // ── les deux vues du bas : même échelle, même couche ──
  const KC = 0.2;
  // un bâton le long de la direction d, de x0 à x1 (mm depuis P0), rayon r ; rupture en x0
  function seg(P0, d, x0, x1, r, rupt) {
    const k = KC, n = [-d[1], d[0]], Q = (x, y) => [P0[0] + (x * d[0] + y * n[0]) * k, P0[1] + (x * d[1] + y * n[1]) * k];
    const s = Math.sign(x1 - x0), c = 5;
    const pts = [Q(x0, -r), Q(x1 - s * c, -r), Q(x1, -r + c), Q(x1, r - c), Q(x1 - s * c, r), Q(x0, r)];
    if (rupt) pts.push(Q(x0 + s * 12, r * 0.4), Q(x0 - s * 14, -r * 0.1), Q(x0 + s * 9, -r * 0.55));
    else pts.push(Q(x0 + s * c, r), Q(x0, r - c), Q(x0, -r + c), Q(x0 + s * c, -r));
    return h.path(pl(pts) + ' Z', blanc(A.arete));
  }
  function comparaison(z, libre) {
    const k = KC, yS = z.h - 10, yT = yS - 3, yC = yT - 26;          // sol, toile, dessus de la couche
    const out = [sol(4, z.l - 4, yS), h.ligne(10, yT, z.l - 10, yT, A.detail), couche(12, z.l - 12, yC, yT, libre ? 3 : 7)];
    let J, u, Bd;
    if (libre) {
      // le manche descend à 34 degrés ; l'attache plie, le battoir se couche sur les épis
      const a = 34 * Math.PI / 180;
      u = [Math.cos(a), Math.sin(a)];
      J = [z.l * 0.24, yC - RB * k];
      Bd = [1, 0];
    } else {
      // l'attache bridée : le battoir reste dans l'axe du manche et pique du bout dans la couche
      const a = 28 * Math.PI / 180;
      u = [Math.cos(a), Math.sin(a)];
      const Lb = (LB + G * 0.3) * k, pointe = [z.l * 0.76, yC + 5];
      J = [pointe[0] - Lb * u[0], pointe[1] - Lb * u[1]];
      Bd = u;
    }
    // le manche, rompu où il sortirait de la vue
    const lm = Math.min((J[0] - 10) / u[0], (J[1] - 10) / u[1]) / k;
    out.push(seg(J, [-u[0], -u[1]], lm, 0, RM, true));
    const gj = libre ? 0.9 : 0.3;                                     // bridée, l'attache est courte et serrée
    const B0 = [J[0] + Bd[0] * G * k * gj, J[1] + Bd[1] * G * k * gj];
    out.push(seg(B0, Bd, LB, 0, RB, false));
    // l'attache, en petit : l'anneau entre les deux bouts
    out.push(h.chemin([J, B0], A.arete));
    if (libre) {
      // le battoir est tombé autour de l'attache : l'arc de sa tête
      const Rr = LB * k * 0.9, a0 = -40 * Math.PI / 180, a1 = -9 * Math.PI / 180;
      const p0 = [B0[0] + Rr * Math.cos(a0), B0[1] + Rr * Math.sin(a0)], p1 = [B0[0] + Rr * Math.cos(a1), B0[1] + Rr * Math.sin(a1)];
      out.push(h.fleche(`M${f1(p0[0])} ${f1(p0[1])} A${f1(Rr)} ${f1(Rr)} 0 0 1 ${f1(p1[0])} ${f1(p1[1])}`, A.arete));
    } else {
      // tout le fléau pousse dans l'axe : la tête du battoir pique
      const n = [u[1], -u[0]], L = LB * k;
      const t0 = [B0[0] + u[0] * L * 0.35 + n[0] * 16, B0[1] + u[1] * L * 0.35 + n[1] * 16];
      const t1 = [B0[0] + u[0] * L * 0.8 + n[0] * 16, B0[1] + u[1] * L * 0.8 + n[1] * 16];
      out.push(h.fleche(`M${f1(t0[0])} ${f1(t0[1])} L${f1(t1[0])} ${f1(t1[1])}`, A.arete));
    }
    return out.join('\n');
  }

  // ── les vues ──
  const vueEnsemble = z => {
    const k = (z.l - 30) / (LM + G + LB), R = rep(15, z.h * 0.6, k);
    return { R, k };
  };
  // de face et de dessus : la même échelle, la même origine en x ; les deux vues s'alignent
  const KF = 1.15;
  const vueFace = z => rep((z.l - G * KF) / 2, z.h * 0.5, KF);
  const rupF = z => ((z.l - 16) / KF - G) / 2;

  return {
    ref: '98-01a',
    titre: 'Le fléau : les pièces et l’attache',
    desc: 'Encadré danger : la lanière usée qui cède. Le fléau à plat : le manche, long, et le battoir, court et plus gros, reliés au bout. L’attache en grand, de face puis de dessus : une bande de cuir pliée sur le bout de chaque bâton fait une boucle, ses deux queues ligaturées sur le bâton ; une lanière fermée en anneau passe dans les deux boucles, ses deux bouts ligaturés ensemble. En bas, la même couche d’épis deux fois : attache libre, le battoir tombe à plat ; attache bridée, il pique du bout.',
    format: 'pleine',
    disposition: [['ensemble'], ['face'], ['dessus'], ['libre', 'serre']],
    hauteurs: [0.72, 1.1, 1.1, 1.25],
    vues: {
      ensemble: {
        titre: 'Le fléau, à plat',
        dessin: z => {
          const { R } = vueEnsemble(z);
          const out = [];
          out.push(baton(R, 0, LM, RM, false), fil(R, 0, LM - QA - 10, RM));
          out.push(baton(R, LM + G + LB, LM + G, RB, false), fil(R, LM + G + QA + 10, LM + G + LB, RB));
          out.push(boucleFace(rep(R.X(LM), R.Y(0), R.k), 0, 1, RM, A.detail));
          out.push(boucleFace(rep(R.X(LM + G), R.Y(0), R.k), 0, -1, RB, A.detail));
          out.push(h.ligne(R.X(LM + CA - RC), R.Y(0), R.X(LM + CB + RC), R.Y(0), A.arete));
          // le cercle qui désigne l'attache, montrée en grand dessous
          out.push(h.cercle(R.X(LM + G / 2), R.Y(0), 21, A.detail));
          return out.join('\n');
        },
        renvois: z => {
          const { R } = vueEnsemble(z);
          return [
            { n: 1, rond: [R.X(LM * 0.42), R.Y(0) - 22], cible: [R.X(LM * 0.42 + 40), R.Y(-RM + 2)], texte: 'manche : le long, tenu à deux mains' },
            { n: 2, rond: [R.X(LM + G + LB * 0.62), R.Y(0) - 22], cible: [R.X(LM + G + LB * 0.62 - 50), R.Y(-RB + 2)], texte: 'battoir : bois franc lourd, du merisier' },
          ];
        },
      },
      face: {
        titre: 'L’attache en grand, de face',
        dessin: z => {
          const R = vueFace(z), RUP = rupF(z), out = [];
          out.push(baton(R, -RUP, 0, RM), baton(R, G + RUP, G, RB));
          out.push(fil(R, -RUP + 8, -QA - 6, RM), fil(R, G + QA + 6, G + RUP - 8, RB));
          out.push(boucleFace(R, 0, 1, RM), boucleFace(R, G, -1, RB));
          out.push(ligature(R, -LIG[0], -LIG[1], RM + T + 2, 9), ligature(R, G + LIG[0], G + LIG[1], RB + T + 2, 9));
          out.push(anneauFace(R));
          return out.join('\n');
        },
        renvois: z => {
          const R = vueFace(z);
          return [
            { n: 3, rond: [R.X(-45), 12], cible: [R.X(20), R.Y(-RM - T / 2)], texte: 'boucle : une bande de cuir pliée' },
            { n: 4, rond: [R.X(-LIG[1] - 45), z.h - 12], cible: [R.X(-60), R.Y(RM + T + 2)], texte: 'ses deux queues ligaturées de babiche' },
            { n: 5, rond: [R.X(50) + 14, z.h - 12], cible: [R.X(50), R.Y(TL / 2)], texte: 'lanière de cuir ou de babiche, en anneau' },
            { n: 6, rond: [R.X(G + 55), 12], cible: [R.X(G - 20), R.Y(-RB - T / 2 + 1)], texte: 'la boucle du battoir, faite de même' },
          ];
        },
      },
      dessus: {
        titre: 'La même, vue de dessus',
        dessin: z => {
          const R = vueFace(z), RUP = rupF(z), out = [];
          out.push(baton(R, -RUP, 0, RM), baton(R, G + RUP, G, RB));
          out.push(fil(R, -RUP + 8, -QA - 6, RM), fil(R, G + QA + 6, G + RUP - 8, RB));
          out.push(anneauDessus(R));
          out.push(boucleDessus(R, 0, 1, RM), boucleDessus(R, G, -1, RB));
          out.push(ligature(R, -LIG[0], -LIG[1], RM + 1.5, 9), ligature(R, G + LIG[0], G + LIG[1], RB + 1.5, 9));
          return out.join('\n');
        },
        renvois: z => {
          const R = vueFace(z);
          return [
            { n: 7, rond: [R.X(69) + 30, z.h - 11], cible: [R.X(70), R.Y(RC + WL / 2 + 1.5)], texte: 'les deux bouts de la lanière, ligaturés' },
            { n: 8, rond: [R.X(50) - 30, 11], cible: [R.X(52), R.Y(-RC)], texte: 'l’anneau passe dans les deux boucles' },
          ];
        },
      },
      libre: {
        titre: 'Libre : le battoir tombe à plat',
        dessin: z => comparaison(z, true),
      },
      serre: {
        titre: 'Bridé : il frappe du bout',
        dessin: z => comparaison(z, false),
      },
    },
    danger: 'La lanière s’use la première. Usée, elle cède en plein élan et le battoir part comme une pierre vers ceux qui regardent : la changer dès qu’elle s’effiloche, pas quand elle casse, et en garder une de rechange.',
  };
};
