// Planche 37-02 — La cage à pierres sans soudeuse (chapitre 37, étape 6 et « La cage et le baril, sans soudeuse »)
// Cotes : une seule, « une main » (le jeu entre la tôle et le dessous des barres, étape 6). Le chapitre
// ne donne aucune mesure de la cage : les proportions suivent un baril de 205 L (ch. 83) et des pierres
// de 10 à 15 cm (étape 13), sans rien imprimer d'autre.
// La charte : de côté, la pile du fond, derrière le baril, en gris loin ; la face de droite du tuyau
// à l'ombre. Le rouge : le dessus du baril sous la cage, le point à
// regarder à chaque saison (celui de l'encadré danger).
module.exports = (h) => {
  const A = h.a;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const NOIR = '#000000', BLANC = '#FFFFFF';

  // ── les mesures du dessin, en mm (rien de tout ça ne s'imprime) ────────────────────
  const s = 0.195;                                  // échelle des trois vues d'ensemble, px par mm
  const R = 285, L2 = 440;                          // rayon et demi-longueur du baril
  const hSable = 100, hPatte = 140;
  const hBas = hSable + hPatte, hC = hBas + R, hHaut = hC + R;    // 240 · 525 · 810
  const hPile = hHaut + 40;                         // les piles, un peu plus hautes que le baril : 850
  const dB = 16, hBarre = hPile + dB / 2;           // les barres couchées sur les piles
  const hTreillis = hPile + dB + 4;                 // le dessus du treillis : 870
  const hFer = 1300;                                // le haut des fers debout
  const hCercles = [hTreillis + 110, hTreillis + 290];
  const pIn = 315, pOut = 535, cais = 565, cL = 500;  // piles (en travers) et caisson
  const aFer = 208, aTr = 190;                      // fers debout, bord du treillis (en travers)
  const barres = [-370, -170, 30];                  // le long du baril, la porte vers le négatif
  const fers = [-384, 44];
  const trL = [-376, 36];
  const pileL = [-420, 80];
  const tuyau = { al: 300, r: 75 };
  const assises = [150, 130, 130, 120, 110, 110];   // les assises des piles, de bas en haut

  // ── outils ─────────────────────────────────────────────────────────────────────────
  const rnd = k => { const x = Math.sin(k * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const f = v => Math.round(v * 100) / 100;
  const lisseFerme = P => {
    const n = P.length; let d = `M${f(P[0][0])} ${f(P[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = P[(i - 1 + n) % n], p1 = P[i], p2 = P[(i + 1) % n], p3 = P[(i + 2) % n];
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + ' Z';
  };
  // une pierre : superellipse bosselée (e grand : faces planes, pour les piles sèches)
  const pierre = (cx, cy, rx, ry, g, e = 2.6, j = 0.1, at = W(A.arete)) => {
    const N = 10, P = [], ph = rnd(g) * 0.5;
    for (let k = 0; k < N; k++) {
      const t = 2 * Math.PI * k / N + ph, c = Math.cos(t), sn = Math.sin(t);
      const q = 1 + j * (rnd(g * 7.3 + k) - 0.5) * 2;
      P.push([cx + rx * q * Math.sign(c) * Math.pow(Math.abs(c), 2 / e), cy + ry * q * Math.sign(sn) * Math.pow(Math.abs(sn), 2 / e)]);
    }
    return h.path(lisseFerme(P), at);
  };
  // fil doublé et tordu : deux brins qui s'enroulent le long d'une polyligne
  const torsade = (pts, amp = 1, per = 5, at = A.detail) => {
    const S = [0];
    for (let i = 1; i < pts.length; i++) S.push(S[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const tot = S[S.length - 1], out = [];
    for (const sg of [1, -1]) {
      const Q = [];
      for (let u = 0; u <= tot + 1e-6; u += 0.6) {
        let i = 1; while (i < S.length - 1 && S[i] < u) i++;
        const t = (u - S[i - 1]) / (S[i] - S[i - 1] || 1);
        const [x1, y1] = pts[i - 1], [x2, y2] = pts[i], L = Math.hypot(x2 - x1, y2 - y1) || 1;
        const nx = -(y2 - y1) / L, ny = (x2 - x1) / L, o = sg * amp * Math.sin(2 * Math.PI * u / per);
        Q.push(`${f(x1 + (x2 - x1) * t + nx * o)} ${f(y1 + (y2 - y1) * t + ny * o)}`);
      }
      out.push(h.path('M' + Q.join(' L'), at));
    }
    return out.join('\n');
  };
  // une cornière vue à plat (les pattes de la truie, comme à la planche 83-10)
  const corniere = (x1, y1, x2, y2, e = 2.6) => {
    const L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L * e, ny = (x2 - x1) / L * e;
    return [h.chemin([[x1 + nx, y1 + ny], [x2 + nx, y2 + ny], [x2 - nx, y2 - ny], [x1 - nx, y1 - ny]], W(A.arete), true),
      h.path(`M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)}`, A.fin)].join('\n');
  };
  const sol = (z, yF) => h.rect(4, yF, z.l - 8, 6, A.hachure('bois', 'aucun')) + h.ligne(4, yF, z.l - 4, yF, A.arete);
  const casse = (x1, x2, y) => h.path(`M${f(x1 - 3)} ${f(y + 3)} L${f(x1 + (x2 - x1) * 0.35)} ${f(y - 3)} L${f(x1 + (x2 - x1) * 0.65)} ${f(y + 5)} L${f(x2 + 3)} ${f(y)}`, A.detail);

  // Les pierres du tas, rangée par rangée, en mm autour du milieu de la cage : [décalage, rx, ry, graine]
  // grosses en bas, petites en haut, de l'air entre toutes.
  const rangs = [
    { hc: hTreillis + 6 + 60, ry: 60, p: [[-127, 62, 11], [0, 60, 12], [126, 61, 13]] },
    { hc: hTreillis + 6 + 120 + 12 + 54, ry: 54, p: [[-133, 54, 21], [-12, 56, 22], [112, 55, 23]] },
    { hc: hTreillis + 6 + 120 + 12 + 108 + 12 + 49, ry: 49, p: [[-78, 50, 31], [30, 50, 32], [140, 48, 33]] },
    { hc: hTreillis + 6 + 120 + 12 + 108 + 12 + 98 + 10 + 47, ry: 47, p: [[-28, 52, 41], [86, 50, 42]] },
  ];
  const tas = (X, Y, c, g0, miroir = 1) => {
    const o = [];
    // le fond du tas, peint en blanc : ce qui est derrière ne se voit pas entre les pierres
    o.push(h.rect(X(c - aTr), Y(rangs[2].hc + 40), (2 * aTr) * s, (rangs[2].hc + 40 - hTreillis) * s, A.blanc));
    for (const r of rangs) for (const [dx, rx, g] of r.p)
      o.push(pierre(X(c + miroir * dx), Y(r.hc), rx * s, r.ry * s, g + g0, 2.4, 0.1));
    return o.join('\n');
  };

  // ── Par le bout de la porte ──────────────────────────────────────────────────────────
  const CX = 131;                                    // même axe pour cette vue et le plan dessous
  const bout = z => {
    const o = [], yF = z.h - 8;
    const X = a => CX + a * s, Y = hh => yF - hh * s;
    o.push(sol(z, yF));
    // le caisson de sable
    o.push(h.rect(X(-cais), Y(hSable), 2 * cais * s, hSable * s, A.hachure('gravier', 'aucun')), h.ligne(X(-cais), Y(hSable), X(cais), Y(hSable), A.detail));
    o.push(h.rect(X(-cais) - 4, Y(hSable) - 3, 4, hSable * s + 3, W(A.arete)), h.rect(X(cais), Y(hSable) - 3, 4, hSable * s + 3, W(A.arete)));
    // les deux piles de pierres sèches, assises croisées
    for (const sg of [-1, 1]) {
      let hb = hSable;
      assises.forEach((ht, k) => {
        const cells = k % 2 === 0 ? [110, 110] : [220];
        let a = pIn;
        cells.forEach((w, i) => {
          o.push(pierre(X(sg * (a + w / 2)), Y(hb + ht / 2), (w / 2 - 5) * s, (ht / 2 - 4) * s, 100 + k * 10 + i + (sg > 0 ? 50 : 0), 5, 0.05));
          a += w;
        });
        hb += ht;
      });
    }
    // les pattes
    o.push(corniere(X(-150), Y(hBas + 70), X(-238), Y(hSable) + 1), corniere(X(150), Y(hBas + 70), X(238), Y(hSable) + 1));
    // le baril : bout, bourrelet, porte
    const r = R * s;
    o.push(h.cercle(X(0), Y(hC), r, W(A.contour)), h.cercle(X(0), Y(hC), r - 4, A.detail));
    const px1 = X(-95), py1 = Y(hC + 160), pw = 190 * s, ph = 260 * s;
    o.push(h.rect(px1, py1, pw, ph, `${W(A.arete)} rx="3"`));
    for (const hh of [hC + 130, hC - 60]) o.push(h.rect(px1 - 6, Y(hh) - 2, 9, 4, W(A.detail)));
    o.push(h.ligne(X(-40), Y(hC + 30), X(90), Y(hC + 30), A.arete), h.cercle(X(0), Y(hC + 30), 1.3, A.plein));
    o.push(h.cercle(X(150), Y(hC - 110), 3.2, W(A.arete)));
    // les barres, vues sur leur longueur, couchées d'une pile à l'autre
    o.push(h.rect(X(-pOut + 15), Y(hPile + dB), (2 * pOut - 30) * s, dB * s, W(A.arete)));
    // le treillis sur les barres
    o.push(h.ligne(X(-aTr), Y(hTreillis - 2), X(aTr), Y(hTreillis - 2), A.arete));
    // le tas de pierres
    o.push(tas(X, Y, 0, 0));
    // les deux fers debout d'avant (ceux du fond sont derrière)
    for (const sg of [-1, 1]) o.push(h.ligne(X(sg * aFer), Y(hPile), X(sg * aFer), Y(hFer), A.contour));
    // les deux cercles de fil, qui passent devant les fers
    for (const hh of hCercles) o.push(torsade([[X(-aFer - 7), Y(hh)], [X(aFer + 7), Y(hh)]], 0.9, 4.5));
    // le jeu sous la cage : une main à plat
    // où se prend la vue de près
    o.push(h.cercle(X(aFer), Y(hBarre), 11, A.cache));
    return o.join('\n');
  };

  // ── De côté, la pile d'avant enlevée ─────────────────────────────────────────────────
  const long = z => {
    const o = [], yF = z.h - 8, x0 = 190;
    const X = al => x0 + al * s, Y = hh => yF - hh * s;
    o.push(sol(z, yF));
    // le caisson
    o.push(h.rect(X(-cL), Y(hSable), 2 * cL * s, hSable * s, A.hachure('gravier', 'aucun')), h.ligne(X(-cL), Y(hSable), X(cL), Y(hSable), A.detail));
    o.push(h.rect(X(-cL) - 4, Y(hSable) - 3, 4, hSable * s + 3, W(A.arete)), h.rect(X(cL), Y(hSable) - 3, 4, hSable * s + 3, W(A.arete)));
    // la pile du fond, derrière le baril
    let hb = hSable;
    assises.forEach((ht, k) => {
      const cells = k % 2 === 0 ? [120, 130, 130, 120] : [170, 160, 170];
      let al = pileL[0];
      cells.forEach((w, i) => {
        o.push(pierre(X(al + w / 2), Y(hb + ht / 2), (w / 2 - 5) * s, (ht / 2 - 4) * s, 300 + k * 10 + i, 5, 0.05, A.fin.replace('fill="none"', 'fill="#E6E6E6"')));   // arrière-plan : gris loin, trait fin
        al += w;
      });
      hb += ht;
    });
    // les pattes
    for (const al of [-390, 390]) o.push(h.rect(X(al) - 3.5, Y(hBas + 20), 7, (hBas + 20 - hSable) * s + 1, W(A.arete)), h.ligne(X(al), Y(hBas + 20), X(al), Y(hSable), A.fin));
    // le baril : coque, cerceaux de roulement, bourrelets
    // (pas d'ombre sur le dessous : une bande grise dans ce rectangle se lit comme un niveau d'eau)
    o.push(h.rect(X(-L2), Y(hHaut), 2 * L2 * s, 2 * R * s, W(A.contour)));
    for (const al of [-150, 150]) {
      o.push(h.path(`M${f(X(al) - 5)} ${f(Y(hHaut))} Q${f(X(al))} ${f(Y(hHaut) - 4)} ${f(X(al) + 5)} ${f(Y(hHaut))}`, A.arete));
      o.push(h.path(`M${f(X(al) - 5)} ${f(Y(hBas))} Q${f(X(al))} ${f(Y(hBas) + 4)} ${f(X(al) + 5)} ${f(Y(hBas))}`, A.arete));
    }
    for (const al of [-160, -140, 140, 160]) o.push(h.ligne(X(al), Y(hHaut), X(al), Y(hBas), A.detail));
    for (const al of [-L2 + 10, L2 - 10]) o.push(h.ligne(X(al), Y(hHaut), X(al), Y(hBas), A.fin));
    for (const [al, hh] of [[-L2, hHaut], [-L2, hBas], [L2, hHaut], [L2, hBas]]) o.push(h.cercle(X(al) + (al < 0 ? -1.5 : 1.5), Y(hh) + (hh > hC ? -1.5 : 1.5), 2.4, A.plein));
    // la porte, dans le bout de gauche : ses charnières et sa barre
    for (const hh of [hC + 130, hC - 60]) o.push(h.rect(X(-L2) - 5, Y(hh) - 2, 5, 4, W(A.detail)));
    o.push(h.rect(X(-L2) - 6, Y(hC + 30) - 1.5, 6, 3, A.plein));
    // le tuyau, en haut au bout opposé, avec son collet
    const t1 = X(tuyau.al - tuyau.r), t2 = X(tuyau.al + tuyau.r);
    const tm = t1 + (t2 - t1) * 0.65;                    // la face de droite du tuyau, à l'ombre
    o.push(h.chemin([[tm, 10], [t2, 5.4], [t2, Y(hHaut) - 3], [tm, Y(hHaut) - 3]], A.ombre, true));
    o.push(h.ligne(t1, 3, t1, Y(hHaut) - 3, A.contour), h.ligne(t2, 3, t2, Y(hHaut) - 3, A.contour));
    o.push(h.ligne(t1 - 2, Y(hHaut), t1 - 2, Y(hHaut) - 4, A.arete), h.ligne(t2 + 2, Y(hHaut), t2 + 2, Y(hHaut) - 4, A.arete));
    o.push(casse(t1, t2, 5));
    // les barres, vues par le bout, couchées sur la pile du fond
    for (const al of barres) o.push(h.cercle(X(al), Y(hBarre), dB * s / 2 + 0.6, A.plein));
    // le treillis
    o.push(h.ligne(X(trL[0]), Y(hTreillis - 2), X(trL[1]), Y(hTreillis - 2), A.arete));
    // le tas, vu de côté
    o.push(tas(X, Y, -170, 200, -1));
    // les fers debout d'avant
    for (const al of fers) o.push(h.ligne(X(al), Y(hPile), X(al), Y(hFer), A.contour));
    for (const hh of hCercles) o.push(torsade([[X(fers[0] - 7), Y(hh)], [X(fers[1] + 7), Y(hh)]], 0.9, 4.5));
    // la cote : le jeu entre la tôle et le dessous des barres
    const xc = X(-L2 - 45);
    o.push(h.ligne(X(-L2) - 2, Y(hHaut), xc - 4, Y(hHaut), A.fin), h.ligne(X(barres[0]) - 3, Y(hPile), xc - 4, Y(hPile), A.fin));
    o.push(h.cote(xc, Y(hPile), xc, Y(hHaut), 'une main', { cote: 'gauche' }));
    // le point à contrôler : le dessus du baril, sous la cage, là où l'eau des pierres le ronge
    o.push(h.controle(X(-170), Y((hHaut + hPile) / 2), 14));
    return o.join('\n');
  };

  // ── Vu de dessus, cage vide ──────────────────────────────────────────────────────────
  const plan = z => {
    const o = [], yc = z.h / 2;
    const X = a => CX + a * s, Y = al => yc - al * s;
    // le caisson de sable
    o.push(h.rect(X(-cais) - 4, Y(cL) - 4, 2 * cais * s + 8, 2 * cL * s + 8, W(A.arete)));
    o.push(h.rect(X(-cais), Y(cL), 2 * cais * s, 2 * cL * s, A.hachure('gravier', 'detail')));
    // le dessus des deux piles : trois dalles chacune
    for (const sg of [-1, 1]) {
      let al = pileL[0];
      [170, 160, 170].forEach((w, i) => {
        o.push(pierre(X(sg * (pIn + 110)), Y(al + w / 2), 105 * s, (w / 2 - 5) * s, 400 + i + (sg > 0 ? 10 : 0), 5, 0.05));
        al += w;
      });
    }
    // le baril couché : coque, bourrelets, cerceaux de roulement
    o.push(h.rect(X(-R), Y(L2), 2 * R * s, 2 * L2 * s, W(A.contour)));
    for (const al of [-L2 + 12, L2 - 12]) o.push(h.ligne(X(-R), Y(al), X(R), Y(al), A.detail));
    for (const al of [-150, 150]) o.push(h.ligne(X(-R), Y(al) - 1.2, X(R), Y(al) - 1.2, A.fin), h.ligne(X(-R), Y(al) + 1.2, X(R), Y(al) + 1.2, A.fin));
    // le tuyau, au bout opposé
    o.push(h.cercle(X(0), Y(tuyau.al), tuyau.r * s + 2, W(A.arete)), h.cercle(X(0), Y(tuyau.al), tuyau.r * s, W(A.contour)));
    // les trois barres, d'une pile à l'autre
    for (const al of barres) o.push(h.rect(X(-pOut + 15), Y(al) - dB * s / 2 - 0.4, (2 * pOut - 30) * s, dB * s + 0.8, W(A.arete)));
    // le treillis
    o.push(h.rect(X(-aTr), Y(trL[1]), 2 * aTr * s, (trL[1] - trL[0]) * s, A.detail));
    for (let a = -aTr + 50; a < aTr; a += 50) o.push(h.ligne(X(a), Y(trL[1]), X(a), Y(trL[0]), A.fin));
    for (let al = trL[0] + 50; al < trL[1]; al += 50) o.push(h.ligne(X(-aTr), Y(al), X(aTr), Y(al), A.fin));
    // le cercle de fil autour des quatre fers, fermé par ses deux bouts tordus
    const m = aFer + 9, b1 = fers[0] - 9, b2 = fers[1] + 9;
    o.push(torsade([[X(-m) + 6, Y(b1)], [X(m), Y(b1)], [X(m), Y(b2)], [X(-m), Y(b2)], [X(-m), Y(b1) - 6]], 0.9, 4.5));
    o.push(torsade([[X(-m) + 1, Y(b1) - 1], [X(-m) - 6, Y(b1) + 6]], 0.9, 3));
    // les quatre fers debout, vus par le bout
    for (const sg of [-1, 1]) for (const al of fers) o.push(h.cercle(X(sg * aFer), Y(al), 2.2, A.plein));
    return o.join('\n');
  };

  // ── Le pied d'un fer debout, de près ─────────────────────────────────────────────────
  const sd = 2.6, xR = 168, yR = 104;               // échelle ; le croisement (fer d'avant droit, barre d'avant)
  const ligature = z => {
    const o = [];
    const X = a => xR + (a - aFer) * sd, Y = hh => yR - (hh - hBarre) * sd;
    const tube = (d, e = 2.4) => h.path(d, `fill="none" stroke="${NOIR}" stroke-width="${e + 1.8}" stroke-linejoin="round" stroke-linecap="butt"`) +
      h.path(d, `fill="none" stroke="${BLANC}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="butt"`);
    const P = pts => 'M' + pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L');
    const par = (p, q, k) => { const L = Math.hypot(q[0] - p[0], q[1] - p[1]), nx = -(q[1] - p[1]) / L * k, ny = (q[0] - p[0]) / L * k; return [[p[0] + nx, p[1] + ny], [q[0] + nx, q[1] + ny]]; };
    // la barre, couchée d'une pile à l'autre : l'armature et ses nervures, cassée aux deux bouts
    const bx1 = 8, bx2 = z.l - 8, by1 = Y(hPile + dB), by2 = Y(hPile);
    o.push(h.rect(bx1, by1, bx2 - bx1, by2 - by1, W(A.arete)));
    for (const x of [bx1, bx2]) o.push(h.path(`M${x + 3} ${f(by1 - 4)} L${x - 3} ${f(by1 + (by2 - by1) * 0.4)} L${x + 3} ${f(by1 + (by2 - by1) * 0.6)} L${x - 3} ${f(by2 + 4)}`, A.detail));
    // le fer debout, devant la barre, coupé en haut
    const fx1 = X(aFer - 6), fx2 = X(aFer + 6), fy2 = by2, fy1 = 16;
    o.push(h.rect(fx1, fy1, fx2 - fx1, fy2 - fy1, W(A.arete)));
    o.push(h.path(`M${f(fx1 - 4)} ${fy1 + 3} L${f(fx1 + 8)} ${fy1 - 3} L${f(fx2 - 8)} ${fy1 + 5} L${f(fx2 + 4)} ${fy1 - 1}`, A.detail));
    // la ligature, fil doublé. Départ au coin bas-gauche ; devant, en diagonale jusqu'en haut à droite ;
    // derrière la barre, descend au coin bas-droit ; devant, en diagonale par-dessus la première jusqu'en
    // haut à gauche ; derrière la barre, redescend au coin bas-gauche. Les deux bouts sortent au même coin.
    const g = 15, TL = [fx1 - g, by1 - g], TR = [fx2 + g, by1 - g], BR = [fx2 + g, by2 + g], BL = [fx1 - g, by2 + g];
    const k = 2.1, tir = `fill="none" stroke="${NOIR}" stroke-width="1.1" stroke-dasharray="3 2.2"`;
    // passes de derrière : tiretés courts, de part et d'autre du fer
    for (const [p, q] of [[TR, BR], [TL, BL]]) for (const d of [-k, k]) o.push(h.path(P([[p[0] + d, p[1]], [q[0] + d, q[1]]]), tir));
    // première passe de devant, puis la seconde par-dessus au croisement
    for (const q of [-k, k]) { const [a, b] = par([BL[0] + 3, BL[1]], TR, q); o.push(tube(P([a, b]))); }
    for (const q of [-k, k]) { const [a, b] = par(BR, TL, q); o.push(tube(P([a, b]))); }
    // le bout qui revient de derrière, au coin bas-gauche
    for (const q of [-k, k]) o.push(tube(P([[TL[0] + q, BL[1] - 3], [BL[0] - 4 + q, BL[1] + 6]])));
    // la queue : les deux bouts tordus ensemble à la pince, coupés court
    o.push(h.formes.corde([[BL[0] - 2, BL[1] + 6], [BL[0] - 34, BL[1] + 44]], { ep: 9, torons: true, debut: 'ouvert', fin: 'coupe' }));
    return o.join('\n');
  };

  return {
    ref: '37-02',
    titre: 'La cage à pierres sans soudeuse',
    desc: 'La truie couchée sur ses pattes dans un caisson de sable. De chaque côté du baril, une pile de pierres sèches un peu plus haute que lui ; trois barres de fer posées d’une pile à l’autre passent au-dessus du baril sans le toucher, avec le jeu d’une main à plat entre la tôle et le dessous des barres. Sur les barres, un fond de treillis ; aux quatre coins, un fer debout lié à la barre d’en dessous ; deux cercles de fil de fer doublé et tordu, ou deux cerceaux d’un deuxième baril, font le tour des quatre fers. Dans la cage, les grosses pierres en bas, les petites en haut, de l’air entre toutes. Le tuyau sort à l’autre bout, sans pierres autour. De près : le fer debout devant la barre, lié par une croix de fil doublé qui passe derrière le fer et sous la barre ; les deux bouts se rejoignent sous le croisement et se tordent ensemble à la pince. Ni fil ni treillis galvanisés.',
    format: 'pleine',
    disposition: [['bout', 'long'], ['plan', 'ligature']],
    hauteurs: [14, 11],
    largeurs: [[5, 6], [5, 6]],
    vues: {
      bout: {
        titre: 'Par le bout de la porte',
        dessin: bout,
        renvois: z => {
          const yF = z.h - 8, X = a => CX + a * s, Y = hh => yF - hh * s;
          return [
            { n: 1, rond: [14, Y(560)], cible: [X(-430), Y(560)], texte: 'pile de pierres sèches' },
            { n: 2, rond: [14, Y(hBarre)], cible: [X(-500), Y(hBarre)], texte: 'barres d’une pile à l’autre' },
            { n: 3, rond: [14, Y(1060)], cible: [X(-182), Y(hTreillis - 2)], texte: 'treillis ou fers croisés' },
            { n: 4, rond: [z.l - 14, 16], cible: [X(aFer), Y(1240)], texte: 'quatre fers debout' },
            { n: 5, rond: [z.l - 14, Y(40)], cible: [X(420), Y(55)], texte: 'caisson de sable' },
          ];
        },
      },
      long: {
        titre: 'De côté, la pile d’avant enlevée',
        dessin: long,
        renvois: z => {
          const yF = z.h - 8, X = al => 190 + al * s, Y = hh => yF - hh * s;
          return [
            { n: 6, rond: [X(-L2) - 20, Y(rangs[0].hc)], cible: [X(-170 + 127), Y(rangs[0].hc)], texte: 'les grosses en bas' },
            { n: 7, rond: [X(-L2) - 20, 18], cible: [X(-170 - 25), Y(rangs[3].hc)], texte: 'les petites en haut' },
            { n: 8, rond: [X(110), 18], cible: [X(-170 - 70), Y((rangs[1].hc + rangs[2].hc) / 2 - 8)], texte: '10 à 15 cm, de l’air entre' },
          ];
        },
      },
      plan: {
        titre: 'Vu de dessus, cage vide',
        dessin: plan,
        renvois: z => {
          const yc = z.h / 2, X = a => CX + a * s, Y = al => yc - al * s;
          return [
            { n: 9, rond: [12, Y(-60)], cible: [X(-aFer - 9), Y(-60)], texte: 'cercle de fil doublé et tordu' },
            { n: 10, rond: [z.l - 12, Y(-60)], cible: [X(aFer + 9), Y(-60)], texte: 'ou cerceau d’un autre baril' },
            { n: 11, rond: [z.l - 12, Y(330)], cible: [X(tuyau.r) + 1, Y(330)], texte: 'rien autour du tuyau' },
          ];
        },
      },
      ligature: {
        titre: 'Le pied d’un fer debout, de près',
        dessin: ligature,
        renvois: z => {
          const X = a => xR + (a - aFer) * sd, Y = hh => yR - (hh - hBarre) * sd;
          return [
            { n: 12, rond: [z.l - 24, 30], cible: [X(aFer) + 20, Y(hBarre) - 20], texte: 'ligature en croix, fil doublé' },
            { n: 13, rond: [40, z.h - 16], cible: [X(aFer - 6) - 30, Y(hPile) + 34], texte: 'bouts tordus à la pince' },
            { n: 14, rond: [60, 30], cible: [156, 78], texte: 'rien de galvanisé' },
          ];
        },
      },
    },
    danger: 'Danger — l’eau jetée sur les pierres tombe sur la tôle et la ronge par-dessus, là où on ne la voit pas. Un baril percé lâche la flamme et le monoxyde dans la pièce chaude : au premier feu de chaque saison et à chaque remontage, vider la cage et regarder la tôle.',
  };
};
