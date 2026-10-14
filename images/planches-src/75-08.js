// Planche 75-08 — La glacière de deux caisses (chapitre 70, section 9 : « La glacière qu'on
// bâtit, et le froid qu'on met dedans » ; aussi ch. 53 et 77).
// Quatre vues : la coupe en long, fermée, sur sa cale, avec les cruches gelées ; le drain au
// point bas, agrandi ; l'éclaté du montage ; le bord du couvercle, agrandi.
// Seule cote : « une main », la seule mesure que le chapitre donne.
// La charte : le dedans de la caisse (coupe) et des caisses ouvertes (éclaté) en gris loin ; la
// face de droite des caisses et du couvercle à l'ombre (pas sur le cadre de lattes, trop mince).
// Le rouge : la cheville qu'on tire, et le trou à ras du plancher. Les pièces qui descendent à leur
// place et l'eau restent en noir.
module.exports = (h) => {
  const r1 = v => Math.round(v * 10) / 10;
  const blanc = t => t.replace('fill="none"', 'fill="#ffffff"');
  const bois = h.a.hachure('bois', 'detail');
  const bourre = h.a.hachure('isolant', 'aucun');
  const ferme = (pts, at) => h.chemin(pts.map(([x, y]) => [r1(x), r1(y)]), at, true);
  const ouvert = (pts, at) => h.chemin(pts.map(([x, y]) => [r1(x), r1(y)]), at);

  // ligne de rupture : un zigzag en trait fin, là où la pièce continue hors du dessin
  const rupture = (x1, y1, x2, y2) => {
    const dx = x2 - x1, dy = y2 - y1, l = Math.hypot(dx, dy), ux = dx / l, uy = dy / l;
    const m = [(x1 + x2) / 2, (y1 + y2) / 2];
    return ouvert([[x1, y1], [m[0] - ux * 4, m[1] - uy * 4], [m[0] - ux * 1.5 - uy * 5, m[1] - uy * 1.5 + ux * 5],
      [m[0] + ux * 1.5 + uy * 5, m[1] + uy * 1.5 - ux * 5], [m[0] + ux * 4, m[1] + uy * 4], [x2, y2]], h.a.fin);
  };

  // cruche de 2 L, debout, fond en (x, yb) ; tf place chaque point (penche, couche)
  const cruche = (x, yb, w, ht, tf = q => q) => {
    const P = (fx, fy) => tf([x + w * fx, yb - ht * fy]);
    const s = (fx, fy) => { const q = P(fx, fy); return `${r1(q[0])},${r1(q[1])}`; };
    return [
      h.path(`M${s(0, 0)} L${s(0, 0.64)} Q${s(0, 0.8)} ${s(0.3, 0.85)} L${s(0.3, 0.93)} L${s(0.66, 0.93)} `
        + `L${s(0.66, 0.85)} Q${s(1, 0.8)} ${s(1, 0.62)} L${s(1, 0)} Z`, blanc(h.a.arete)),
      ferme([P(0.26, 1), P(0.7, 1), P(0.7, 0.93), P(0.26, 0.93)], blanc(h.a.detail)),
      h.path(`M${s(0.62, 0.76)} Q${s(0.9, 0.74)} ${s(0.86, 0.56)} Q${s(0.7, 0.6)} ${s(0.62, 0.76)} Z`, h.a.detail),
      ouvert([P(0.1, 0.08), P(0.9, 0.08)], h.a.fin),
    ].join('\n');
  };

  // ─── La coupe en long ─────────────────────────────────────────────────────────────────
  // La glacière penche sur sa cale : chaque point est tourné autour du coin bas du drain.
  const RA = 3.5 * Math.PI / 180, CS = Math.cos(RA), SN = Math.sin(RA);
  const geoCoupe = z => {
    const p = 6, g = 26, W = 2 * p + g, ov = 10;
    const X0 = 28, X1 = z.l - 46, G = z.h - 24;
    const T = 36 + p + W;                       // dessus des parois ; le couvercle monte au-dessus
    const Fi = G - p - g - p;                    // dessus du fond de la caisse intérieure
    const xa = X0 + 2 * p + g, xb = X1 - 2 * p - g; // faces intérieures
    const rp = ([x, y]) => { const dx = x - X1, dy = y - G; return [r1(X1 + dx * CS - dy * SN), r1(G + dx * SN + dy * CS)]; };
    const cw = 28, ch = 70;                      // la cruche
    const xl = xa + 2 * cw + 20;                 // la cruche couchée commence là
    return { p, g, W, ov, X0, X1, G, T, Fi, xa, xb, rp, cw, ch, xl };
  };

  const dessinCoupe = z => {
    const { p, g, W, ov, X0, X1, G, T, Fi, xa, xb, rp, cw, ch, xl } = geoCoupe(z);
    const L = X1 - X0, db = 7;
    const R = (x, y, l, ht, at) => ferme([rp([x, y]), rp([x + l, y]), rp([x + l, y + ht]), rp([x, y + ht])], at);
    const C = (pts, at) => ouvert(pts.map(rp), at);
    const o = [];
    // le sol
    o.push(h.rect(0, G, z.l, z.h - G, h.a.hachure('terre', 'aucun')));
    o.push(h.ligne(0, G, z.l, G, h.a.arete));
    // la cale sous le bout du haut
    const A = rp([X0 + 3, G]), B = rp([X0 + 40, G]);
    o.push(ferme([A, B, [B[0], G], [A[0], G]], bois));
    o.push(ferme([A, B, [B[0], G], [A[0], G]], h.a.arete));
    // le bourrage : tout le vide entre les deux caisses
    o.push(R(X0 + p, T, g, G - p - T, bourre), R(xb + p, T, g, G - p - T, bourre), R(X0 + p + g, Fi + p, L - 2 * p - 2 * g, g, bourre));
    // caisse extérieure : fond, deux bouts
    o.push(R(X0, G - p, L, p, bois), R(X0, T, p, G - p - T, bois), R(X1 - p, T, p, G - p - T, bois));
    // caisse intérieure : fond sous les parois, deux bouts, le dedans vide
    o.push(R(xa - p, Fi, xb - xa + 2 * p, p, bois));
    o.push(R(xa, T, xb - xa, Fi - T, h.a.loin));   // le dedans, vu par la coupe : en gris loin
    o.push(R(xa - p, T, p, Fi - T, bois), R(xb, T, p, Fi - T, bois));
    // les lattes qui ferment le vide par le haut
    o.push(R(X0, T - p, 2 * p + g, p, bois), R(X1 - 2 * p - g, T - p, 2 * p + g, p, bois));
    // le couvercle : caisse plate bourrée, aussi épaisse que la paroi, qui déborde
    const cx0 = X0 - ov, cl = L + 2 * ov, cy0 = T - p - W;
    o.push(R(cx0 + p, cy0 + p, cl - 2 * p, g, bourre));
    o.push(R(cx0, cy0, cl, p, bois), R(cx0, cy0 + p + g, cl, p, bois));
    o.push(R(cx0, cy0 + p, p, g, bois), R(cx0 + cl - p, cy0 + p, p, g, bois));
    o.push(R(cx0, cy0, cl, W, h.a.contour));
    // le drain : manchon à travers le bout intérieur, le vide et le bout extérieur
    o.push(R(xb, Fi - db, X1 - xb, db, h.a.blanc));
    o.push(C([[xb, Fi - db], [X1, Fi - db]], h.a.arete), C([[xb, Fi], [X1, Fi]], h.a.arete));
    // silhouette de la coupe
    o.push(C([[xb, Fi - db], [xb, T - p], [X1, T - p], [X1, Fi - db]], h.a.contour));
    o.push(C([[X1, Fi], [X1, G], [X0, G], [X0, T - p], [xa, T - p], [xa, Fi], [xb, Fi]], h.a.contour));
    // la cheville, enfoncée dans le manchon
    const yc = Fi - db / 2;
    o.push(ferme([[X1 - 9, yc - 2.4], [X1 + 14, yc - 5], [X1 + 16.5, yc - 2.5], [X1 + 17, yc], [X1 + 16.5, yc + 2.5],
      [X1 + 14, yc + 5], [X1 - 9, yc + 2.4]].map(rp), blanc(h.a.arete)));
    // les cruches gelées : deux debout, une couchée
    o.push(cruche(xa + 6, Fi, cw, ch, rp), cruche(xa + 12 + cw, Fi, cw, ch, rp));
    const cx = xl + ch, couche = ([x, y]) => rp([cx + (y - Fi), Fi - (x - cx)]);
    o.push(cruche(cx, Fi, cw, ch, couche));
    return o.join('\n');
  };

  const renvoisCoupe = z => {
    const { p, g, X0, X1, G, T, Fi, xa, rp, cw, ch, xl } = geoCoupe(z);
    const bg = rp([X0 + p + g / 2, T + 34]);
    const ju = rp([xl + ch * 0.45, Fi - cw * 0.55]);
    const ca = rp([X0 + 22, G]);
    return [
      { n: 1, rond: [12, r1(bg[1] - 6)], cible: bg, texte: 'bourrage sec, tout le tour' },
      { n: 2, rond: rp([xl + ch * 0.55, T + 18]), cible: ju, texte: 'cruches d’eau gelées' },
      { n: 3, rond: [12, r1(G - 30)], cible: [r1(ca[0]), r1((ca[1] + G) / 2)], texte: 'cale : penche vers le drain' },
    ];
  };

  // ─── Le drain, agrandi ────────────────────────────────────────────────────────────────
  const geoDrain = z => {
    const p = 12, g = 60, xa = 70, xw = xa + p, xo = xw + g, xe = xo + p;
    const Fi = z.h - 104, y0 = 14, Gs = Fi + p + g + p;
    const r = 7, yc = Fi - r;                    // alésage du manchon, fond à ras du plancher
    return { p, g, xa, xw, xo, xe, Fi, y0, Gs, r, yc };
  };

  const dessinDrain = z => {
    const { p, g, xa, xw, xo, xe, Fi, y0, Gs, r, yc } = geoDrain(z);
    const o = [];
    // sol
    o.push(h.rect(0, Gs, z.l, z.h - Gs, h.a.hachure('terre', 'aucun')), h.ligne(0, Gs, z.l, Gs, h.a.arete));
    // bourrage : le long du bout et sous le fond
    o.push(h.rect(xw, y0, g, Fi + p - y0, bourre), h.rect(8, Fi + p, xo - 8, g, bourre));
    // planches
    o.push(h.rect(xa, y0, p, Fi - y0, bois));                 // bout de la caisse intérieure
    o.push(h.rect(8, Fi, xw - 8, p, bois));                  // son fond, qui passe dessous
    o.push(h.rect(xo, y0, p, Fi + p + g - y0, bois));         // bout de la caisse extérieure
    o.push(h.rect(8, Fi + p + g, xe - 8, p, bois));           // son fond
    // le manchon : alésage blanc, paroi mince en coupe
    o.push(h.rect(xa, yc - r - 3, xe - xa, 2 * r + 6, h.a.blanc));
    o.push(h.rect(xa, yc - r - 3, xe - xa, 3, h.a.plein), h.rect(xa, yc + r, xe - xa, 3, h.a.plein));
    // l'eau de fonte sur le fond, qui entre dans le manchon jusqu'à la cheville
    const ew = 12, tq = xo - 10;
    o.push(h.rect(8, Fi - ew, tq - 8, ew, h.a.blanc));
    for (let yy = Fi - ew + 3; yy < Fi - 0.5; yy += 3) o.push(h.ligne(8, yy, tq, yy, h.a.fin));
    o.push(h.ligne(8, Fi - ew, tq, Fi - ew, h.a.arete));
    // l'eau coule dans le manchon jusqu'à la cheville
    const ye = Fi - ew / 2 - 1.5;
    o.push(h.rect(xw + 8, r1(ye - 2.5), 26, 5, h.a.blanc));
    o.push(h.ligne(xw + 8, r1(ye), xw + 26, r1(ye), h.a.arete));
    o.push(ferme([[xw + 24, ye - 4], [xw + 34, ye], [xw + 24, ye + 4]], h.a.plein));
    // silhouettes coupées
    o.push(ouvert([[xa, y0], [xa, yc - r - 3]], h.a.contour));
    o.push(ouvert([[8, Fi], [xa, Fi]], h.a.contour));
    o.push(ouvert([[xe, y0], [xe, yc - r - 3]], h.a.contour));
    o.push(ouvert([[xe, yc + r + 3], [xe, Gs]], h.a.contour));
    // la cheville en pointe, coincée à l'embouchure
    const t0 = xo - 10, t1 = xe, t2 = xe + 34;
    const chev = [[t0, yc - 4.5], [t1, yc - r], [t2, yc - 11], [t2 + 4, yc - 7], [t2 + 4, yc + 7], [t2, yc + 11], [t1, yc + r], [t0, yc + 4.5]];
    o.push(ferme(chev, bois), ferme(chev, h.a.arete));
    // on la tire
    o.push(h.geste(`M${xe + 8},${r1(yc + 26)} L${xe + 44},${r1(yc + 26)}`));
    // le point qui décide : le bas du trou à ras du plancher, sinon l'eau reste au fond
    o.push(h.controle(xa, r1(Fi - 2), 12));
    // ruptures
    o.push(rupture(xa - 4, y0, xe + 4, y0));
    o.push(rupture(8, Fi - 8, 8, Gs));
    return o.join('\n');
  };

  const renvoisDrain = z => {
    const { xa, xw, xo, xe, Fi, y0, r, yc } = geoDrain(z);
    return [
      { n: 4, rond: [34, r1(Fi - 58)], cible: [xa - 1, r1(yc + 2)], texte: 'trou à ras du fond' },
      { n: 5, rond: [r1((xw + xo) / 2), r1(yc - 52)], cible: [r1((xw + xo) / 2), r1(yc - r - 3)], texte: 'manchon à travers le vide' },
      { n: 6, rond: [r1(z.l - 14), r1(yc - 44)], cible: [xe + 22, r1(yc - 8)], texte: 'cheville qu’on tire' },
    ];
  };

  // ─── L'éclaté ─────────────────────────────────────────────────────────────────────────
  const KX = 0.42, KY = 0.26;
  const geoEclate = z => {
    const t = 4, gg = 18, Lo = 190, Do = 86, Ho = 64, ov = 8;
    const ti = t + gg, Li = Lo - 2 * ti, Di = Do - 2 * ti, Hi = Ho - ti;
    const e = 15;                                  // jour entre deux pièces, à l'écran
    const zi = Ho + KY * (Do - ti) + e;
    const zl = zi + Hi + KY * (ti + Di) + e;
    const zc = zl + t + KY * (Do + ov) + e;
    const haut = zc + 2 * t + gg + KY * (Do + ov);
    const k = Math.min(1, (z.h - 14) / haut, (z.l - 70) / (Lo + 2 * ov + KX * (Do + 2 * ov)));
    const ox = (z.l - k * (Lo + KX * Do)) / 2 + 12, oy = z.h - 6;
    const P = (x, y, zz) => [r1(ox + k * (x + KX * y)), r1(oy - k * (zz + KY * y))];
    return { t, gg, Lo, Do, Ho, ov, ti, Li, Di, Hi, zi, zl, zc, k, P };
  };

  const dessinEclate = z => {
    const { t, gg, Lo, Do, Ho, ov, ti, Li, Di, Hi, zi, zl, zc, P } = geoEclate(z);
    const o = [];
    const quad = (a, b, c, d, at) => ferme([a, b, c, d], at);

    // caisse ouverte : faces avant et droite en planches, rebord, arête intérieure du fond
    const caisse = (x0, y0, z0, L, D, H) => {
      const x1 = x0 + L, y1 = y0 + D, z1 = z0 + H, s = [];
      s.push(quad(P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1), blanc(h.a.arete)));
      // le dedans, vu par l'ouverture : en gris loin
      s.push(quad(P(x0 + t, y0 + t, z1), P(x1 - t, y0 + t, z1), P(x1 - t, y1 - t, z1), P(x0 + t, y1 - t, z1), h.a.loin));
      s.push(quad(P(x0 + t, y0 + t, z1), P(x1 - t, y0 + t, z1), P(x1 - t, y1 - t, z1), P(x0 + t, y1 - t, z1), h.a.arete));
      // l'arête du coin du fond, vue par l'ouverture jusqu'au rebord avant
      const cf = P(x0 + t, y1 - t, z1);
      s.push(ouvert([cf, [cf[0], r1(cf[1] + (P(0, y0 + t, z1)[1] - P(0, y1 - t, z1)[1]))]], h.a.detail));
      s.push(quad(P(x0, y0, z0), P(x1, y0, z0), P(x1, y0, z1), P(x0, y0, z1), blanc(h.a.arete)));
      // la face de droite, à l'ombre
      s.push(quad(P(x1, y0, z0), P(x1, y1, z0), P(x1, y1, z1), P(x1, y0, z1), h.a.ombre));
      s.push(quad(P(x1, y0, z0), P(x1, y1, z0), P(x1, y1, z1), P(x1, y0, z1), h.a.arete));
      for (const f of [1 / 3, 2 / 3]) {
        const zz = z0 + H * f;
        s.push(ouvert([P(x0, y0, zz), P(x1, y0, zz), P(x1, y1, zz)], h.a.fin));
      }
      s.push(silhouette(x0, y0, z0, L, D, H));
      return s;
    };
    const silhouette = (x0, y0, z0, L, D, H) => ferme([P(x0, y0, z0), P(x0 + L, y0, z0), P(x0 + L, y0 + D, z0),
      P(x0 + L, y0 + D, z0 + H), P(x0, y0 + D, z0 + H), P(x0, y0, z0 + H)], h.a.contour);

    // le trou du drain, percé dans le bout de chaque caisse, les deux en ligne une fois montées
    const trou = (x, zc) => {
      const rh = 4, pts = [];
      for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8; pts.push(P(x, Do / 2 + rh * Math.cos(a), zc + rh * Math.sin(a))); }
      return ferme(pts, h.a.plein);
    };
    // caisse extérieure
    o.push(...caisse(0, 0, 0, Lo, Do, Ho));
    o.push(trou(Lo, ti + t + 4));
    // caisse intérieure, soulevée au-dessus de sa place
    o.push(...caisse(ti, ti, zi, Li, Di, Hi));
    o.push(trou(Lo - ti, zi + t + 4));
    // les lattes : un cadre qui couvre les deux chants et le vide
    const zt = zl + t;
    o.push(quad(P(0, 0, zt), P(Lo, 0, zt), P(Lo, Do, zt), P(0, Do, zt), blanc(h.a.arete)));
    o.push(quad(P(ti + t, ti + t, zt), P(Lo - ti - t, ti + t, zt), P(Lo - ti - t, Do - ti - t, zt), P(ti + t, Do - ti - t, zt), blanc(h.a.arete)));
    o.push(quad(P(0, 0, zl), P(Lo, 0, zl), P(Lo, 0, zt), P(0, 0, zt), blanc(h.a.arete)));
    o.push(quad(P(Lo, 0, zl), P(Lo, Do, zl), P(Lo, Do, zt), P(Lo, 0, zt), blanc(h.a.arete)));
    const w = ti + t;
    // l'épaisseur du cadre, vue par le trou : chants intérieurs du fond et de gauche
    o.push(ouvert([P(w, w, zl), P(w, Do - w, zl), P(Lo - w, Do - w, zl)], h.a.arete));
    o.push(ouvert([P(w, Do - w, zt), P(w, Do - w, zl)], h.a.fin));
    // quatre lattes assemblées : un joint à chaque coin
    for (const [xa, xb, ya, yb] of [[0, w, 0, w], [Lo, Lo - w, 0, w], [0, w, Do, Do - w], [Lo, Lo - w, Do, Do - w]])
      o.push(ouvert([P(xa, ya, zt), P(xb, yb, zt)], h.a.fin));
    o.push(silhouette(0, 0, zl, Lo, Do, t));
    // le couvercle : plus grand de tout le débord, aussi épais que la paroi
    const Lc = Lo + 2 * ov, Dc = Do + 2 * ov, Hc = 2 * t + gg, zc1 = zc + Hc;
    o.push(quad(P(-ov, -ov, zc1), P(Lo + ov, -ov, zc1), P(Lo + ov, Do + ov, zc1), P(-ov, Do + ov, zc1), blanc(h.a.arete)));
    o.push(quad(P(-ov, -ov, zc), P(Lo + ov, -ov, zc), P(Lo + ov, -ov, zc1), P(-ov, -ov, zc1), blanc(h.a.arete)));
    o.push(quad(P(Lo + ov, -ov, zc), P(Lo + ov, Do + ov, zc), P(Lo + ov, Do + ov, zc1), P(Lo + ov, -ov, zc1), h.a.ombre));
    o.push(quad(P(Lo + ov, -ov, zc), P(Lo + ov, Do + ov, zc), P(Lo + ov, Do + ov, zc1), P(Lo + ov, -ov, zc1), h.a.arete));
    for (const f of [1 / 4, 2 / 4, 3 / 4]) o.push(ouvert([P(-ov, -ov + Dc * f, zc1), P(Lo + ov, -ov + Dc * f, zc1)], h.a.fin));
    o.push(ouvert([P(-ov, -ov, zc + t), P(Lo + ov, -ov, zc + t), P(Lo + ov, Do + ov, zc + t)], h.a.fin));
    o.push(ouvert([P(-ov, -ov, zc1 - t), P(Lo + ov, -ov, zc1 - t), P(Lo + ov, Do + ov, zc1 - t)], h.a.fin));
    o.push(silhouette(-ov, -ov, zc, Lc, Dc, Hc));
    // chaque pièce descend à sa place
    const xs = P(Lo * 0.6, Do / 2, 0)[0];
    const fl = (zBas, yAv, zHaut, yAr) => {
      const a = P(0, yAv, zBas)[1] + 2, b = P(0, yAr, zHaut)[1] - 2;
      return h.fleche(`M${xs},${r1(a)} L${xs},${r1(b)}`);
    };
    o.push(fl(zi, ti, Ho, Do));
    o.push(fl(zl, 0, zi + Hi, ti + Di));
    o.push(fl(zc, -ov, zl + t, Do));
    return o.join('\n');
  };

  const renvoisEclate = z => {
    const { t, ti, Li, Ho, Hi, zi, zl, P } = geoEclate(z);
    const a = P(24, 0, Ho * 0.5), b = P(ti + 20, ti, zi + Hi * 0.5), c = P(40, 0, zl + t / 2);
    return [
      { n: 7, rond: [14, a[1]], cible: a, texte: 'caisse extérieure, fond bourré' },
      { n: 8, rond: [14, b[1]], cible: b, texte: 'caisse intérieure posée dessus' },
      { n: 9, rond: [14, c[1]], cible: c, texte: 'cadre de lattes sur les chants' },
    ];
  };

  // ─── Le bord du couvercle, agrandi ────────────────────────────────────────────────────
  const geoBord = z => {
    const p = 12, g = 60, ov = 20, X0 = 66, W = 2 * p + g;
    const xw = X0 + p, xi = xw + g, xc = xi + p, T = z.h - 124;
    const lb = T - p, lt = lb - W, xr = z.l - 8, yb = z.h - 40;
    return { p, g, ov, X0, W, xw, xi, xc, T, lb, lt, xr, yb };
  };

  const dessinBord = z => {
    const { p, g, ov, X0, xw, xi, xc, T, lb, lt, xr, yb } = geoBord(z);
    const o = [];
    // parois et vide bourré
    o.push(h.rect(xw, T, g, yb - T, bourre));
    o.push(h.rect(X0, T, p, yb - T, bois), h.rect(xi, T, p, yb - T, bois));
    // la latte, clouée sur les deux chants
    o.push(h.rect(X0, lb, xc - X0, p, bois));
    for (const x of [X0 + p / 2, xi + p / 2]) {
      o.push(h.rect(r1(x - 1.2), lb + 1, 2.4, p + 26, h.a.plein));
      o.push(h.rect(r1(x - 3.5), lb, 7, 2, h.a.plein));
    }
    // le couvercle : caisse plate, bourrée comme les parois, qui déborde
    const cx0 = X0 - ov;
    o.push(h.rect(cx0 + p, lt + p, xr - cx0 - p, g, bourre));
    o.push(h.rect(cx0, lt, xr - cx0, p, bois), h.rect(cx0, lb - p, xr - cx0, p, bois));
    o.push(h.rect(cx0, lt + p, p, g, bois));
    // silhouettes coupées
    o.push(ouvert([[xr, lt], [cx0, lt], [cx0, lb], [xr, lb]], h.a.contour));
    o.push(ouvert([[X0, yb], [X0, lb], [xc, lb], [xc, yb]], h.a.contour));
    // ruptures
    o.push(rupture(X0 - 4, yb, xc + 4, yb));
    o.push(rupture(xr, lt - 4, xr, lb + 4));
    // la seule mesure du chapitre
    o.push(h.ligne(xw, yb + 4, xw, z.h - 12, h.a.fin), h.ligne(xi, yb + 4, xi, z.h - 12, h.a.fin));
    o.push(h.cote(xw, z.h - 16, xi, z.h - 16, 'une main', { cote: 'dessus' }));
    return o.join('\n');
  };

  const renvoisBord = z => {
    const { p, ov, X0, xi, xc, T, lb, lt, xr } = geoBord(z);
    return [
      { n: 10, rond: [r1((xc + z.l) / 2 + 4), r1(T + 40)], cible: [xc - 3, r1(lb + p / 2)], texte: 'latte clouée sur les chants' },
      { n: 11, rond: [r1((xi + xr) / 2), r1(lt - 30)], cible: [r1((xi + xr) / 2), r1(lt + p + 20)], texte: 'couvercle bourré comme la paroi' },
      { n: 12, rond: [16, r1(lb + 30)], cible: [X0 - ov / 2, lb], texte: 'débord sur tout le pourtour' },
    ];
  };

  return {
    ref: '75-08',
    titre: 'La glacière de deux caisses',
    desc: 'Glacière bâtie de deux caisses de bois l’une dans l’autre, le vide d’une main bourré sec tout le tour '
      + 'et dessous, fermé en haut par des lattes clouées sur les deux chants, couvercle bourré aussi épais que la '
      + 'paroi et qui déborde tout le tour, drain au point bas bouché d’une cheville. En coupe, fermée, sur une cale '
      + 'qui la penche vers le drain, avec des cruches d’eau gelées dedans ; le drain agrandi, son manchon à travers '
      + 'le vide et la cheville en pointe ; l’éclaté du montage ; le bord du couvercle agrandi.',
    format: 'pleine',
    disposition: [['coupe', 'drain'], ['eclate', 'bord']],
    largeurs: [[3, 2], [3, 2]],
    vues: {
      coupe: { titre: 'En coupe, sur sa cale', dessin: dessinCoupe, renvois: renvoisCoupe },
      drain: { titre: 'Le drain, au point bas', dessin: dessinDrain, renvois: renvoisDrain },
      eclate: { titre: 'Le montage', dessin: dessinEclate, renvois: renvoisEclate },
      bord: { titre: 'Le bord du couvercle', dessin: dessinBord, renvois: renvoisBord },
    },
  };
};
