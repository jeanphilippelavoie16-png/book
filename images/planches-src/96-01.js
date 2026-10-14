// Planche 96-01 — Le billon de varech, comme à Terre-Neuve (ch. 96, « Le billon de varech »).
// Ce que le chapitre donne : une planche d'environ 1,2 m, la largeur qu'on atteint des deux bords,
// tracée sur le sol non retourné (mousse, herbe ou gazon) ; les pommes de terre de semence posées en
// rangs sur la surface ; une couche épaisse de varech rincé (et de fumier composté, s'il y en a) ;
// de chaque côté une rigole creusée à la bêche, les mottes qu'on en tire posées à l'envers sur le
// varech, la mousse ou l'herbe en dessous, la terre au-dessus ; puis butter à mesure que les tiges
// montent, avec la terre des rigoles, pour que pas un tubercule ne voie la lumière. Les rigoles
// drainent, la planche surélevée s'égoutte.
// Seule cote : la largeur de la planche. Le nombre de rangs, l'épaisseur du varech, la largeur et la
// profondeur des rigoles ne sont pas dans le chapitre : dessinés en proportion, jamais cotés. La
// rigole est dessinée large de la moitié de la planche, pour que ses mottes, d'une épaisseur,
// couvrent la moitié de la planche : le volume se tient. Au buttage, elle est creusée plus bas.
// La charte : pas de gris (coupes en trame, vue de dessus à plat). Le rouge : le tubercule le plus
// haut, sous sa terre (le point à vérifier : pas un à la lumière), et l'herbe de la motte posée,
// en dessous (le sens qui compte). Les flèches des mottes et de la terre disent ce qui bouge, elles
// restent noires, comme sur les 95-40.
module.exports = (h) => {
  const A = h.a;

  // Catmull-Rom → cubiques : une courbe qui passe par chaque point
  const lisse = (pts, ferme = false) => {
    const P = ferme ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
    let d = `M${P[1][0].toFixed(1)} ${P[1][1].toFixed(1)}`;
    for (let i = 1; i < P.length - 2; i++) {
      const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1.map(v => v.toFixed(1)).join(' ')} ${c2.map(v => v.toFixed(1)).join(' ')} ${p2.map(v => v.toFixed(1)).join(' ')}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  const rnd = i => { const v = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return v - Math.floor(v); };
  const f = v => v.toFixed(1);

  // L'herbe ou la mousse, en coupe : une frange de brins courts, penchés au hasard, plantés sur le
  // segment et tournés vers ang (degrés, repère de l'écran : -90 vers le haut, 90 vers le bas).
  const herbe = (x1, y1, x2, y2, ang, L, pas, graine, at = A.detail) => {
    const n = Math.max(2, Math.round(Math.hypot(x2 - x1, y2 - y1) / pas));
    let d = '';
    for (let i = 0; i <= n; i++) {
      const t = Math.min(1, Math.max(0, (i + (rnd(graine + i) - 0.5) * 0.7) / n));
      const x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t;
      const a = (ang + (rnd(graine + i + 50) - 0.5) * 44) * Math.PI / 180, l = L * (0.5 + rnd(graine + i + 90) * 0.6);
      d += `M${f(x)} ${f(y)} L${f(x + Math.cos(a) * l)} ${f(y + Math.sin(a) * l)} `;
    }
    return `<path d="${d.trim()}" ${at}/>`;
  };
  // L'herbe vue de dessus : de petits « v » semés
  const brinsPlan = (pts, L) => {
    let d = '';
    pts.forEach(([x, y], i) => {
      const a0 = (-90 + (rnd(i + 3000) - 0.5) * 50) * Math.PI / 180;
      [-0.45, 0.45].forEach(da => { const a = a0 + da; d += `M${f(x)} ${f(y)} L${f(x + Math.cos(a) * L)} ${f(y + Math.sin(a) * L)} `; });
    });
    return `<path d="${d.trim()}" ${A.fin}/>`;
  };
  // Un ovale tourné, en arcs (sans transform) : rot en degrés
  const ovale = (x, y, rx, ry, rot, at) => {
    const a = rot * Math.PI / 180, dx = Math.cos(a) * rx, dy = Math.sin(a) * rx;
    return `<path d="M${f(x - dx)} ${f(y - dy)} A${f(rx)} ${f(ry)} ${f(rot)} 1 0 ${f(x + dx)} ${f(y + dy)} A${f(rx)} ${f(ry)} ${f(rot)} 1 0 ${f(x - dx)} ${f(y - dy)} Z" ${at}/>`;
  };
  // Une pomme de terre : un ovale noir
  const patate = (x, y, rx, ry, rot = 0) => ovale(x, y, rx, ry, rot, A.plein);
  const FOL = 'fill="#fff" ' + A.detail.replace('fill="none" ', '');

  // ─── Les dimensions dessinées (mètres) ──────────────────────────────────────────────────
  // x depuis le milieu de la planche, y au-dessus du sol d'origine.
  const B = 0.6;                              // demi-largeur de la planche : ≈ 1 200 en tout
  const RI = 0.65, RE = 1.25;                 // bords intérieur et extérieur des rigoles
  const BORD = 1.35;                          // où s'arrête la coupe
  const EP_V = 0.14, EP_M = 0.15;             // varech, motte
  const P_BUT = 0.3;                          // la rigole creusée plus bas, au buttage
  const RANGS = [-0.3, 0, 0.3];               // les rangs de semences, sous les joints des mottes
  const Y_M = EP_V + 0.012;                   // le dessous des mottes

  // la rigole de gauche (sg -1) ou de droite (sg 1), profonde de d :
  // [x haut intérieur, x bas intérieur, x bas extérieur, x haut extérieur]
  const rig = (sg, d) => [RI, RI + 0.18 * d, RE - 0.18 * d, RE].map(v => v * sg);

  // ─── Les quatre coupes : même échelle, même axe, même sol ───────────────────────────────
  const LARG = 2 * BORD, BAS = 0.36, HAUT = 0.76;
  // Les deux premières coupes n'ont rien au-dessus du varech : leur rangée est plus basse (sinon un
  // vide sous le titre), même échelle et même axe que les deux suivantes.
  const HAUT_BAS = 0.42;
  const geoC = (z, etat = 3) => {
    const haut = etat <= 2 ? HAUT_BAS : HAUT;
    const s = (z.l - 6) / LARG;
    if ((BAS + haut) * s > z.h - 2) throw new Error(`coupe trop basse : ${z.h} < ${(BAS + haut) * s}`);
    const xc = z.l / 2, y0 = z.h - 3 - BAS * s - ((z.h - 5) - (BAS + haut) * s) * 0.35;
    return { s, X: m => xc + m * s, Y: m => y0 - m * s };
  };

  // les mottes posées à l'envers, quatre en travers
  const mottesCoupe = (X, Y, s, Lh) => {
    const r = [];
    for (let i = 0; i < 4; i++) {
      const a = -B + 0.3 * i + 0.006, b = a + 0.288, y1 = Y_M, y2 = y1 + EP_M + (rnd(i + 3) - 0.5) * 0.02;
      const pts = [[a + 0.012, y1], [(a + b) / 2, y1 + 0.004], [b - 0.012, y1], [b, y1 + 0.03], [b - 0.004, y2 - 0.03], [b - 0.02, y2],
        [(a + b) / 2 + 0.03, y2 + 0.008], [a + 0.02, y2], [a + 0.004, y2 - 0.03], [a, y1 + 0.03]].map(([x, y]) => [X(x), Y(y)]);
      const dm = lisse(pts, true);
      r.push(h.path(dm, A.blanc), h.path(dm, A.hachure('terre', 'arete')));
      // l'herbe de la motte, en dessous, contre le varech
      r.push(herbe(X(a + 0.02), Y(y1) + 1, X(b - 0.02), Y(y1) + 1, 90, Lh, 2.4, 200 + i * 40));
    }
    return r;
  };

  const coupe = (z, etat) => {
    const { s, X, Y } = geoC(z, etat);
    const o = [];
    const d = etat >= 4 ? P_BUT : etat >= 3 ? EP_M : 0;
    const Lh = 0.04 * s;

    // le sol en place, avec ses rigoles
    const surf = [[-BORD, 0]];
    if (d) { const g = rig(-1, d); surf.push([g[3], 0], [g[2], -d], [g[1], -d], [g[0], 0]); const r = rig(1, d); surf.push([r[0], 0], [r[1], -d], [r[2], -d], [r[3], 0]); }
    surf.push([BORD, 0]);
    const fondPts = []; for (let i = 0; i <= 27; i++) { const m = BORD - i * 0.1; fondPts.push([X(m), Y(-BAS + 0.025 * Math.sin(i * 1.7))]); }
    const sol = surf.map(([x, y]) => `${f(X(x))} ${f(Y(y))}`).join(' L');
    o.push(`<path d="M${sol} L${fondPts.map(p => p.map(f).join(' ')).join(' L')} Z" ${A.hachure('terre', 'aucun')}/>`);
    o.push(h.chemin(fondPts, A.fin));
    if (etat >= 4) for (const sg of [-1, 1]) {
      // l'eau qui s'égoutte au fond des rigoles
      const r = rig(sg, d), ep = 0.07, xa = r[1] - sg * 0.18 * ep, xb = r[2] + sg * 0.18 * ep;
      const de = `M${f(X(r[1]))} ${f(Y(-d))} L${f(X(r[2]))} ${f(Y(-d))} L${f(X(xb))} ${f(Y(-d + ep))} L${f(X(xa))} ${f(Y(-d + ep))} Z`;
      o.push(h.path(de, A.blanc), h.ligne(X(xa), Y(-d + ep), X(xb), Y(-d + ep), A.detail));
      // l'eau : sa ligne de niveau, deux courts traits dessous
      const xm = X((r[1] + r[2]) / 2), yl = Y(-d + ep) + 3.5;
      o.push(h.ligne(xm - 9, yl, xm - 3, yl, A.fin), h.ligne(xm + 3, yl + 0.4, xm + 8, yl + 0.4, A.fin));
      // le fond de la rigole avant le buttage, en tireté
      const r0 = rig(sg, EP_M);
      o.push(h.ligne(X(r0[1]), Y(-EP_M), X(r0[2]), Y(-EP_M), A.cache));
    }
    o.push(h.chemin(surf.map(([x, y]) => [X(x), Y(y)]), A.contour));

    // la mousse ou l'herbe du sol non retourné, là où on la voit
    const libres = d ? [[-BORD, -RE], [RE, BORD], [-RI, -B], [B, RI]] : [[-BORD, -B], [B, BORD]];
    libres.forEach(([a, b], k) => o.push(herbe(X(a) + 1, Y(0) - 1, X(b) - 1, Y(0) - 1, -90, Lh, 2.4, 10 + k * 70)));

    // l'étage de la planche : l'herbe d'origine sous les semences
    if (etat === 1) o.push(herbe(X(-B) + 1, Y(0) - 1, X(B) - 1, Y(0) - 1, -90, Lh, 2.4, 400));

    // la terre des rigoles, montée sur la planche : dessinée d'abord, le varech et les mottes la découpent
    if (etat === 4) {
      const yt = Y_M + EP_M;
      const env = [[-0.645, 0], [-0.636, 0.12], [-0.625, yt - 0.02], [-0.59, yt + 0.045], [-0.46, yt + 0.075], [-0.3, yt + 0.125], [-0.15, yt + 0.085],
        [0, yt + 0.125], [0.15, yt + 0.085], [0.3, yt + 0.125], [0.46, yt + 0.075], [0.59, yt + 0.045], [0.625, yt - 0.02], [0.636, 0.12], [0.645, 0]]
        .map(([x, y]) => [X(x), Y(y)]);
      const dbu = lisse(env) + ' Z';
      o.push(h.path(dbu, A.blanc), h.path(dbu, A.hachure('terre', 'arete')));
    }

    // le varech, sur l'herbe écrasée
    if (etat >= 2) {
      const dessus = [[-B, 0.006], [-B + 0.012, 0.08], [-0.5, EP_V - 0.005], [-0.3, EP_V + 0.008], [-0.15, EP_V - 0.004], [0, EP_V + 0.008],
        [0.15, EP_V - 0.004], [0.3, EP_V + 0.008], [0.5, EP_V - 0.005], [B - 0.012, 0.08], [B, 0.006]].map(([x, y]) => [X(x), Y(y)]);
      const dv = lisse(dessus) + ' Z';
      o.push(h.path(dv, A.blanc));
      o.push(herbe(X(-B) + 2, Y(0) - 1, X(B) - 2, Y(0) - 1, -90, Lh * 0.8, 2.4, 110));
      o.push(h.path(dv, A.hachure('isolant', 'detail')));
    }
    // les semences, posées sur la surface
    RANGS.forEach(x => o.push(patate(X(x), Y(0.024), 0.035 * s, 0.025 * s, x * 40)));

    if (etat >= 3) o.push(...mottesCoupe(X, Y, s, Lh));

    if (etat === 3) {
      // les mottes montent de la rigole et se retournent sur la planche
      for (const sg of [-1, 1]) {
        const x1 = X(sg * 0.95), y1 = Y(0.03), x2 = X(sg * 0.47), y2 = Y(Y_M + EP_M + 0.07);
        o.push(h.fleche(`M${f(x1)} ${f(y1)} C${f(x1)} ${f(Y(0.52))} ${f(X(sg * 0.62))} ${f(Y(0.58))} ${f(x2)} ${f(y2)}`));
      }
    }

    if (etat === 4) {
      const yt = Y_M + EP_M;
      // la terre qui monte des rigoles
      for (const sg of [-1, 1]) {
        const x1 = X(sg * 0.95), y1 = Y(-0.2), x2 = X(sg * 0.52), y2 = Y(yt + 0.13);
        o.push(h.fleche(`M${f(x1)} ${f(y1)} C${f(X(sg * 0.98))} ${f(Y(0.45))} ${f(X(sg * 0.74))} ${f(Y(0.56))} ${f(x2)} ${f(y2)}`));
      }
      // l'eau qui s'égoutte de la planche vers les rigoles
      for (const sg of [-1, 1]) {
        const r = rig(sg, d), xa = X(sg * 0.665), ya = Y(0.012), xb = X((r[1] + r[2]) / 2 - sg * 0.04), yb = Y(-d + 0.07) - 1.5;
        o.push(h.fleche(`M${f(xa)} ${f(ya)} C${f(X(sg * 0.72))} ${f(Y(-0.12))} ${f(xb - sg * 4)} ${f(yb - 10)} ${f(xb)} ${f(yb)}`, A.fin));
        // deux gouttes le long du trajet
        [[0.69, -0.08], [0.74, -0.17]].forEach(([gx, gy]) => {
          const x = X(sg * gx) + sg * 4, y = Y(gy);
          o.push(`<path d="M${f(x)} ${f(y - 2.6)} C${f(x + 1.6)} ${f(y - 0.4)} ${f(x + 1.6)} ${f(y + 1.6)} ${f(x)} ${f(y + 1.6)} C${f(x - 1.6)} ${f(y + 1.6)} ${f(x - 1.6)} ${f(y - 0.4)} ${f(x)} ${f(y - 2.6)} Z" ${A.plein}/>`);
        });
      }
      // les tiges, les jeunes tubercules, le feuillage
      RANGS.forEach((x, k) => {
        const xt = X(x), ybas = Y(0.045), yhaut = Y(0.66 + (k === 1 ? 0.04 : 0)), xtop = xt + (k - 1) * 2;
        const dt = `M${f(xt)} ${f(ybas)} C${f(xt + 1)} ${f(Y(0.25))} ${f(xt - 1)} ${f(Y(0.45))} ${f(xtop)} ${f(yhaut)}`;
        o.push(`<path d="${dt}" fill="none" stroke="#fff" stroke-width="4.2"/>`, `<path d="${dt}" ${A.arete}/>`);
        // jeunes tubercules sur leurs stolons, tous sous la terre
        [[-1, 0.22, 0.075], [1, 0.36, 0.07]].forEach(([c, yy, dx]) => {
          const tx = X(x + c * dx), ty = Y(yy), ds = `M${f(xt)} ${f(Y(yy - 0.035))} Q${f((xt + tx) / 2)} ${f(Y(yy - 0.035))} ${f(tx - c * 0.02 * s)} ${f(ty)}`;
          o.push(`<path d="${ds}" fill="none" stroke="#fff" stroke-width="3"/>`, `<path d="${ds}" ${A.detail}/>`);
          o.push(ovale(tx, ty, 0.026 * s + 1, 0.019 * s + 1, c * 15, A.blanc), patate(tx, ty, 0.026 * s, 0.019 * s, c * 15));
        });
        // feuilles composées : deux paires de folioles et une au bout
        const feuille = (x0, y0, ang, L) => {
          const a = ang * Math.PI / 180, ex = x0 + Math.cos(a) * L, ey = y0 + Math.sin(a) * L;
          const r = [`<path d="M${f(x0)} ${f(y0)} L${f(ex)} ${f(ey)}" ${A.detail}/>`];
          [0.45, 0.8].forEach(t => [-1, 1].forEach(c => {
            const px = x0 + (ex - x0) * t, py = y0 + (ey - y0) * t, b = a + c * 1.1;
            r.push(ovale(px + Math.cos(b) * 3.2, py + Math.sin(b) * 3.2, 3.4, 1.8, b * 180 / Math.PI, FOL));
          }));
          r.push(ovale(ex + Math.cos(a) * 3, ey + Math.sin(a) * 3, 3.8, 2, ang, FOL));
          return r.join('');
        };
        o.push(feuille(xt, Y(0.53), -150, 0.13 * s), feuille(xt, Y(0.57), -30, 0.13 * s), feuille(xtop, yhaut, -90, 0.07 * s));
      });
      // le point à vérifier : le tubercule le plus haut, encore sous la terre
      o.push(h.controle(X(0.37), Y(0.385), 0.085 * s));
    }

    if (etat === 1) {
      // la largeur de la planche, qu'on atteint des deux bords
      o.push(h.ligne(X(-B), Y(0.06), X(-B), Y(0.36), A.fin), h.ligne(X(B), Y(0.06), X(B), Y(0.36), A.fin));
      o.push(h.cote(X(-B), Y(0.32), X(B), Y(0.32), '≈ 1 200', { cote: 'dessus' }));
    }
    return o.join('\n');
  };

  // ─── Vu de dessus : même échelle et même axe que les coupes ─────────────────────────────
  // v : le long de la planche, en mètres depuis le bas de la vue. En bas, les semences sur la
  // mousse ; au milieu, le varech ; en haut, les mottes posées et les rigoles creusées à mesure.
  // Les deux bouts de la vue sont des lignes de coupure : la planche continue.
  const geoP = z => {
    const s = (z.l - 6) / LARG, xc = z.l / 2;
    const X = m => xc + m * s, V = v => z.h - 3 - v * s;
    const vbas = 0.05, vhaut = (z.h - 8) / s;          // les deux lignes de coupure
    const V_D = vhaut - 0.03 - 2.5 * 0.3;              // front des mottes à droite : deux rangées et demie jusqu'à la coupure
    const V_G = V_D - 0.3;                             // à gauche, une rangée de plus, en cours
    const V_VAR = V_G - 0.42;                          // front du varech
    return { s, X, V, vbas, vhaut, V_D, V_G, V_VAR };
  };
  const plan = z => {
    const { s, X, V, vbas, vhaut, V_D, V_G, V_VAR } = geoP(z);
    const o = [];
    // la mousse partout où elle se voit
    const pts = []; const pas = 0.1; let k = 0;
    for (let v = vbas + pas / 2; v < vhaut - 0.02; v += pas) for (let x = -BORD + pas / 2; x < BORD; x += pas) {
      k++;
      const xx = x + (rnd(k) - 0.5) * pas * 0.7, vv = v + (rnd(k + 999) - 0.5) * pas * 0.7;
      if (xx < -BORD + 0.02 || xx > BORD - 0.02 || vv < vbas + 0.02 || vv > vhaut - 0.04) continue;
      if (Math.abs(xx) < B + 0.03 && vv > V_VAR - 0.06) continue;                  // sous le varech
      if (Math.abs(xx) > RI - 0.02 && Math.abs(xx) < RE + 0.03 && vv > (xx < 0 ? V_G : V_D) - 0.04) continue;   // dans les rigoles
      pts.push([X(xx), V(vv)]);
    }
    o.push(brinsPlan(pts, 0.03 * s));
    // les rigoles : parois en talus, fond de terre nue
    const rigole = (sg, v0) => {
      const xi = sg * RI, xe = sg * RE, ins = 0.035;
      const r = [];
      r.push(h.chemin([[X(xi + sg * ins), V(vhaut)], [X(xi + sg * ins), V(v0 + ins)], [X(xe - sg * ins), V(v0 + ins)], [X(xe - sg * ins), V(vhaut)]], A.fin));
      for (let v = v0 + 0.07; v < vhaut - 0.02; v += 0.06) r.push(h.ligne(X(xe), V(v), X(xe - sg * ins), V(v), A.fin), h.ligne(X(xi), V(v), X(xi + sg * ins), V(v), A.fin));
      for (let x = Math.min(xi, xe) + 0.07; x < Math.max(xi, xe) - 0.04; x += 0.06) r.push(h.ligne(X(x), V(v0), X(x), V(v0 + ins), A.fin));
      r.push(h.chemin([[X(xi), V(vhaut)], [X(xi), V(v0)], [X(xe), V(v0)], [X(xe), V(vhaut)]], A.contour));
      return r.join('');
    };
    o.push(rigole(-1, V_G), rigole(1, V_D));
    // les semences, en rangs sur la mousse
    for (const x of RANGS) for (const v of [vbas + 0.17, vbas + 0.47]) if (v < V_VAR - 0.08)
      o.push(patate(X(x + (rnd(x * 10 + v * 7) - 0.5) * 0.03), V(v), 0.035 * s, 0.027 * s, 20 + rnd(v + x) * 60));
    // les bords tracés de la planche
    o.push(h.ligne(X(-B), V(vbas), X(-B), V(V_VAR), A.fin), h.ligne(X(B), V(vbas), X(B), V(V_VAR), A.fin));
    // le varech, son front irrégulier
    const front = []; for (let i = 0; i <= 12; i++) { const x = -B + i * 0.1; front.push([X(x), V(V_VAR + (i === 0 || i === 12 ? 0 : (rnd(i + 300) - 0.5) * 0.08))]); }
    const dvar = `M${f(X(-B))} ${f(V(vhaut))} L${lisse(front).slice(1)} L${f(X(B))} ${f(V(vhaut))} Z`;
    o.push(h.path(dvar, A.blanc), h.path(dvar, A.hachure('isolant', 'aucun')));
    o.push(h.path(lisse(front), A.detail));
    o.push(h.ligne(X(-B), V(V_VAR), X(-B), V(vhaut), A.detail), h.ligne(X(B), V(V_VAR), X(B), V(vhaut), A.detail));
    // les mottes retournées : on voit leur terre. La rangée du haut est coupée par la coupure.
    const motteP = (a, c1, c2, ouverte) => {
      const b = a + 0.284;
      const dm = `M${f(X(a))} ${f(V(c1))} L${f(X(b))} ${f(V(c1))} L${f(X(b))} ${f(V(c2))} L${f(X(a))} ${f(V(c2))} Z`;
      const out = [h.path(dm, A.blanc), h.path(dm, A.hachure('terre', ouverte ? 'aucun' : 'arete'))];
      if (ouverte) out.push(h.chemin([[X(a), V(c2)], [X(a), V(c1)], [X(b), V(c1)], [X(b), V(c2)]], A.arete));
      return out.join('');
    };
    for (let j = 0; j < 4; j++) {
      const v1 = V_D + j * 0.3 + 0.008, v2 = Math.min(V_D + (j + 1) * 0.3 - 0.008, vhaut);
      if (v1 > vhaut - 0.05) break;
      for (let i = 0; i < 4; i++) o.push(motteP(-B + 0.3 * i + 0.008, v1, v2, v2 >= vhaut));
    }
    for (let i = 0; i < 2; i++) o.push(motteP(-B + 0.3 * i + 0.008, V_G + 0.008, V_D - 0.008, false));
    // les lignes de coupure, en haut et en bas
    for (const v of [vbas, vhaut]) {
      const lc = []; for (let i = 0; i <= 27; i++) { const m = -BORD + i * 0.1; lc.push([X(m), V(v) + 1.6 * Math.sin(i * 1.9)]); }
      o.push(h.chemin(lc, A.fin));
    }
    // les renvois repris des coupes (2 à 5) : même pastille, même ligne de rappel
    const rappel = (n, rx, ry, cx, cy) => {
      const dx = cx - rx, dy = cy - ry, d = Math.hypot(dx, dy), sx = rx + 9 * dx / d, sy = ry + 9 * dy / d;
      return `<line x1="${f(sx)}" y1="${f(sy)}" x2="${f(cx)}" y2="${f(cy)}" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`
        + `<line x1="${f(sx)}" y1="${f(sy)}" x2="${f(cx)}" y2="${f(cy)}" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="3 2.5"/>`
        + `<circle cx="${f(cx)}" cy="${f(cy)}" r="1.8" fill="#000" stroke="#fff" stroke-width="0.7"/>`
        + `<circle cx="${f(rx)}" cy="${f(ry)}" r="9" fill="#fff" stroke="#000" stroke-width="1.4"/>`
        + `<text x="${f(rx)}" y="${f(ry + 4)}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="12" fill="#000">${n}</text>`;
    };
    const vs = vbas + 0.17;
    o.push(rappel(2, X(0.95), V(vbas + 0.32), X(0.3) + 4, V(vs)));
    o.push(rappel(3, X(0.95), V(V_VAR + 0.16), X(0.42), V(V_VAR + 0.16)));
    o.push(rappel(4, X(-0.95), V(V_G - 0.2), X(-0.95), V(V_G + 0.25)));
    o.push(rappel(5, X(0.95), V(V_D - 0.12), X(0.3), V(V_D + 0.15)));
    // le sens d'avancement, hors du dessin : vers la partie encore nue
    o.push(h.fleche(`M-7 ${f(V(V_G))} L-7 ${f(V(vbas + 0.2))}`, A.contour));
    return o.join('\n');
  };

  // ─── Une motte, grossie : de la rigole à la planche ─────────────────────────────────────
  const X0m = -1.35, X1m = 0.03, Y0m = -0.26, Y1m = 0.72;
  const geoMotte = z => {
    const s = Math.min((z.l - 6) / (X1m - X0m), (z.h - 6) / (Y1m - Y0m));
    const ox = (z.l - (X1m - X0m) * s) / 2, y0 = z.h - 3 - (-Y0m) * s - ((z.h - 6) - (Y1m - Y0m) * s) / 2;
    return { s, X: m => ox + (m - X0m) * s, Y: m => y0 - m * s };
  };
  const motte = z => {
    const { s, X, Y } = geoMotte(z);
    const o = [];
    const d = EP_M, g = rig(-1, d), Lh = 0.04 * s;
    // le sol, la rigole ouverte
    const surf = [[X0m, 0], [g[3], 0], [g[2], -d], [g[1], -d], [g[0], 0], [X1m, 0]];
    const fond = []; for (let i = 0; i <= 14; i++) { const m = X1m - i * (X1m - X0m) / 14; fond.push([X(m), Y(Y0m + 0.02 + 0.015 * Math.sin(i * 1.9))]); }
    o.push(`<path d="M${surf.map(([x, y]) => `${f(X(x))} ${f(Y(y))}`).join(' L')} L${fond.map(p => p.map(f).join(' ')).join(' L')} Z" ${A.hachure('terre', 'aucun')}/>`);
    o.push(h.chemin(fond, A.fin));
    o.push(h.chemin(surf.map(([x, y]) => [X(x), Y(y)]), A.contour));
    o.push(herbe(X(X0m) + 1, Y(0) - 1, X(-RE) - 1, Y(0) - 1, -90, Lh, 2.6, 500));
    o.push(herbe(X(-RI) + 1, Y(0) - 1, X(-B) - 1, Y(0) - 1, -90, Lh, 2.6, 520));
    // le varech sur la planche, une semence dessous
    const dessus = [[-B, 0.006], [-B + 0.012, 0.08], [-0.5, EP_V - 0.004], [-0.3, EP_V + 0.01], [-0.12, EP_V - 0.004], [X1m, EP_V + 0.004]].map(([x, y]) => [X(x), Y(y)]);
    const dv = lisse(dessus) + ` L${f(X(X1m))} ${f(Y(0.006))} Z`;
    o.push(h.path(dv, A.blanc));
    o.push(herbe(X(-B) + 2, Y(0) - 1, X(X1m) - 1, Y(0) - 1, -90, Lh * 0.8, 2.6, 540));
    o.push(h.path(dv, A.hachure('isolant', 'aucun')), h.path(lisse(dessus), A.detail));
    o.push(patate(X(-0.3), Y(0.026), 0.035 * s, 0.025 * s, -12));
    // une motte : en place (herbe dessus), en vol (tournée), posée (herbe dessous)
    const bloc = (cx, cy, rot, genre) => {
      const hw = 0.144 * s, hh = EP_M / 2 * s, a = rot * Math.PI / 180;
      const T = ([x, y]) => [cx + x * Math.cos(a) - y * Math.sin(a), cy + x * Math.sin(a) + y * Math.cos(a)];
      const pts = [[-hw + 3, hh], [0, hh + 1], [hw - 3, hh], [hw, hh - 5], [hw - 1, -hh + 5], [hw - 4, -hh], [4, -hh - 1.5], [-hw + 4, -hh], [-hw + 1, -hh + 5], [-hw, hh - 5]].map(T);
      const dm = lisse(pts, true);
      // l'herbe : côté -1 (dessus, motte en place) ou +1 (dessous, motte retournée), dans son repère
      const brins = (cote, graine, at) => {
        const [x1, y1] = T([-hw + 4, cote * (hh + 1)]), [x2, y2] = T([hw - 4, cote * (hh + 1)]);
        return herbe(x1, y1, x2, y2, cote * 90 + rot, Lh, 2.6, graine, at);
      };
      if (genre === 'depart') return h.path(dm, A.cache) + brins(-1, 620, A.fin);
      if (genre === 'arrivee') return h.path(dm, A.cache);
      return h.path(dm, A.blanc) + h.path(dm, A.hachure('terre', 'arete')) + brins(1, 700 + Math.round(cx));
    };
    const yPose = Y(Y_M + EP_M / 2);
    o.push(bloc(X(-0.45), yPose, 0, 'posee'));          // déjà posée au bord, l'herbe sur le varech
    // le sens qui compte : l'herbe en dessous, contre le varech
    o.push(h.controle(X(-0.45), Y(Y_M - 0.005), 0.065 * s));
    o.push(bloc(X(-0.15), yPose, 0, 'arrivee'));        // la place de celle qui vole
    o.push(bloc(X(-1.1), Y(-EP_M / 2), 0, 'depart'));   // d'où elle vient, dans la rigole
    // le trajet : du creux de la rigole, par-dessus, jusqu'à sa place
    const p0 = [X(-1.1), Y(0.03)], p3 = [X(-0.15), Y(Y_M + EP_M + 0.07)];
    o.push(h.fleche(`M${f(p0[0])} ${f(p0[1])} C${f(X(-1.12))} ${f(Y(0.64))} ${f(X(-0.2))} ${f(Y(0.74))} ${f(p3[0])} ${f(p3[1])}`));
    o.push(bloc(X(-0.7), Y(0.5), -90, 'posee'));         // en vol, tournée d'un quart : l'herbe regarde la planche
    return o.join('\n');
  };

  return {
    ref: '96-01',
    titre: 'Le billon de varech, comme à Terre-Neuve',
    desc: 'Quatre coupes à la même échelle, en travers d’une planche d’environ 1,2 m : les pommes de terre de semence posées en rangs sur la mousse, sans labour ; couvertes d’une couche épaisse de varech ; une rigole creusée de chaque côté, ses mottes posées à l’envers sur le varech ; puis la terre des rigoles montée autour des tiges, les jeunes tubercules sous la terre, l’eau qui s’égoutte vers les rigoles. Dessous, la planche vue de dessus, en trois bandes (semences, varech, mottes et rigoles creusées à mesure), et une motte grossie qui passe de la rigole à la planche en se retournant.',
    format: 'pleine',
    disposition: [['poser', 'couvrir'], ['retourner', 'butter'], ['plan', 'motte']],
    hauteurs: [0.62, 0.84, 1.9],
    vues: {
      poser: {
        titre: 'Poser les semences sur le sol non retourné',
        dessin: z => coupe(z, 1),
        renvois: z => {
          const { X, Y } = geoC(z, 1);
          return [
            { n: 1, rond: [12, Y(0.34)], cible: [X(-1.0), Y(0.015)], texte: 'le sol non retourné : mousse, herbe ou gazon' },
            { n: 2, rond: [z.l - 12, Y(0.34)], cible: [X(0.3) + 2, Y(0.03)], texte: 'les semences, en rangs, sur la surface' },
          ];
        },
      },
      couvrir: {
        titre: 'Couvrir d’une couche épaisse de varech',
        dessin: z => coupe(z, 2),
        renvois: z => {
          const { X, Y } = geoC(z, 2);
          return [
            { n: 3, rond: [z.l - 12, Y(0.36)], cible: [X(0.44), Y(0.08)], texte: 'varech rincé, et fumier composté s’il y en a' },
          ];
        },
      },
      retourner: {
        titre: 'Creuser les rigoles, retourner les mottes',
        dessin: z => coupe(z, 3),
        renvois: z => {
          const { X, Y } = geoC(z);
          return [
            { n: 4, rond: [12, Y(0.3)], cible: [X(-1.05), Y(-0.13)], texte: 'la rigole, creusée à la bêche' },
            { n: 5, rond: [X(0.15), Y(0.62)], cible: [X(0.15), Y(0.26)], texte: 'les mottes, à l’envers sur le varech' },
          ];
        },
      },
      butter: {
        titre: 'Butter à mesure que les tiges montent',
        dessin: z => coupe(z, 4),
        renvois: z => {
          const { X, Y } = geoC(z);
          return [
            { n: 6, rond: [12, Y(0.6)], cible: [X(-0.46), Y(0.4)], texte: 'la terre des rigoles, au pied des tiges' },
            { n: 7, rond: [z.l - 12, Y(0.66)], cible: [X(0.37) + 0.026 * geoC(z).s + 1, Y(0.365)], texte: 'pas un tubercule à la lumière' },
            { n: 8, rond: [12, Y(-0.22)], cible: [X(-1.0), Y(-EP_M)], texte: 'en tireté, le fond avant le buttage' },
            { n: 9, rond: [z.l - 12, Y(-0.08)], cible: [X(1.02), Y(-P_BUT + 0.07)], texte: 'l’eau s’égoutte vers les rigoles' },
          ];
        },
      },
      plan: {
        titre: 'Vu de dessus, en avançant le long de la planche',
        dessin: plan,
      },
      motte: {
        titre: 'Une motte, de la rigole à la planche',
        dessin: motte,
        renvois: z => {
          const { X, Y } = geoMotte(z);
          return [
            { n: 10, rond: [z.l - 12, Y(Y_M - 0.03)], cible: [X(-0.4), Y(Y_M - 0.03)], texte: 'l’herbe en dessous, la terre au-dessus' },
          ];
        },
      },
    },
  };
};
