// Planche 31-40 — Le puits absorbant des eaux grises (ch. 31, section F, étapes 32, 33, 35 ;
// variante « Le puits absorbant fait à la pelle »). Suite de la 31-04 (le piège à graisse).
module.exports = (h) => {
  const N = '#1A1A1A', B = '#FFFFFF';
  const f = v => Math.round(v * 10) / 10;

  // pseudo-hasard fixe : la planche se recompose à l'identique
  const hasard = (graine) => {
    let a = graine >>> 0;
    return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  };
  // une pierre : contour arrondi irrégulier, peint en blanc (px)
  const pierre = (rng, cx, cy, r, at, facette = false) => {
    const k = 8, pts = [];
    const a0 = rng() * Math.PI * 2;
    for (let i = 0; i < k; i++) {
      const a = a0 + (i + (rng() - 0.5) * 0.5) * 2 * Math.PI / k;
      const rr = r * (0.82 + 0.3 * rng());
      pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.82]);
    }
    const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    let d = `M${f(mid(pts[k - 1], pts[0])[0])} ${f(mid(pts[k - 1], pts[0])[1])}`;
    for (let i = 0; i < k; i++) { const m = mid(pts[i], pts[(i + 1) % k]); d += ` Q${f(pts[i][0])} ${f(pts[i][1])} ${f(m[0])} ${f(m[1])}`; }
    let s = `<path d="${d} Z" fill="${B}" ${at.replace('fill="none" ', '')}/>`;
    if (facette) {
      const p = pts[2], q = pts[4];
      s += h.path(`M${f(cx + (p[0] - cx) * 0.5)} ${f(cy + (p[1] - cy) * 0.5)} Q${f(cx)} ${f(cy)} ${f(cx + (q[0] - cx) * 0.55)} ${f(cy + (q[1] - cy) * 0.55)}`, h.a.fin);
    }
    return s;
  };
  // tassement : les grosses d'abord, les petites dans les trous
  const tasse = (rng, dedans, bx, rmin, rmax, n, serre = 0.9) => {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const r = rmax - (rmax - rmin) * Math.sqrt(i / n) - (rmax - rmin) * 0.15 * rng();
      const x = bx[0] + (bx[2] - bx[0]) * rng(), y = bx[1] + (bx[3] - bx[1]) * rng();
      if (!dedans(x, y, r)) continue;
      if (pts.some(p => Math.hypot(p.x - x, p.y - y) < (p.r + r) * serre)) continue;
      pts.push({ x, y, r: Math.max(r, rmin) });
    }
    return pts;
  };
  const clip = (id, formes) => `<clipPath id="${id}">${formes}</clipPath>`;
  const DEFS = `<defs>
<pattern id="p3140-sol" width="11" height="11" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r="0.6" fill="${N}"/><circle cx="7.5" cy="1.5" r="0.45" fill="${N}"/><circle cx="5.5" cy="7.5" r="0.65" fill="${N}"/><circle cx="10" cy="9" r="0.4" fill="${N}"/><circle cx="1" cy="9.5" r="0.35" fill="${N}"/></pattern>
</defs>`;

  // ═══ La coupe ══════════════════════════════════════════════════════════════════════════
  // Repère en mm : x = 0 au milieu du trou, y = 0 au sol naturel, y vers le bas.
  const geoCoupe = (z) => {
    const s = Math.min(z.l / 3100, z.h / 2380);
    const ox = z.l / 2, oy = (z.h - 2380 * s) / 2 + 1550 * s;
    const P = (x, y) => [ox + x * s, oy + y * s];
    // la butte : branches (0 à 180), filet, mousse (200 à 320), 600 de terre : dessus à 920 ;
    // les deux couches sont dessinées plus épaisses que nature pour se lire à l'impression
    const surf = (x) => {
      const a = Math.abs(x);
      if (a <= 650) return -920 - 15 * (1 - (a / 650) ** 2);
      const t = Math.min(1, (a - 650) / 1300);
      return -920 * (1 + Math.cos(Math.PI * t)) / 2;
    };
    const tx = -300, tr = 125, te = 32;         // tronc de visite : axe, rayon, paroi
    const tH = -1020, tB = 300;                  // haut du tronc, pied posé sur le gravier
    return { s, P, surf, tx, tr, te, tH, tB };
  };

  const coupe = (z) => {
    const g = geoCoupe(z), { s, P, surf, tx, tr, te, tH, tB } = g;
    const X0 = -1550, X1 = 1550, YB = 830;
    const out = [DEFS];
    const poly = (pts, at, ferme = true) => h.chemin(pts.map(p => P(p[0], p[1])), at, ferme);

    // sol naturel
    out.push(h.path(`M${P(X0, 0).map(f).join(' ')} L${P(X1, 0).map(f).join(' ')} L${P(X1, YB).map(f).join(' ')} L${P(X0, YB).map(f).join(' ')} Z`, h.a.hachure('terre', 'aucun')));
    // la butte de terre meuble
    const dessus = [];
    for (let x = X0; x <= X1; x += 25) dessus.push([x, surf(x)]);
    out.push(poly([...dessus, [X1, 0], [X0, 0]], `fill="url(#p3140-sol)" stroke="none"`));
    out.push(poly(dessus, h.a.contour, false));
    // le sol naturel sous la butte : trait fin
    out.push(h.ligne(...P(X0, 0), ...P(X1, 0), h.a.detail));

    // le trou
    out.push(poly([[-600, 0], [600, 0], [600, 600], [-600, 600]], h.a.blanc));

    // gravier lavé : 300 au fond, 150 aux parois
    const rg = hasard(3140);
    const zonesG = [[-600, 300, 600, 600], [-600, 0, -450, 300], [450, 0, 600, 300]];
    const dansG = (x, y, r) => zonesG.some(b => x > b[0] - r * 0.3 && x < b[2] + r * 0.3 && y > b[1] - r * 0.3 && y < b[3] + r * 0.3);
    const gravier = tasse(rg, dansG, [-640, -40, 640, 640], 9, 29, 9000, 0.86);
    out.push(clip('p3140-cg', zonesG.map(b => h.rect(...P(b[0], b[1]), (b[2] - b[0]) * s, (b[3] - b[1]) * s, h.a.blanc)).join('')));
    out.push(`<g clip-path="url(#p3140-cg)">${gravier.map(p => pierre(rg, ...P(p.x, p.y), p.r * s, h.a.fin)).join('')}</g>`);

    // pierres du milieu, posées sur le gravier du fond, le tronc de visite entre elles
    const rp = hasard(41);
    const dansP = (x, y, r) => x - r * 0.8 > -450 && x + r * 0.85 < 450 && y + r * 0.7 < 312 && y - r * 0.8 > -8 && Math.abs(x - tx) > tr + r * 0.75;
    const grosses = tasse(rp, dansP, [-450, 0, 450, 300], 50, 112, 12000, 0.9);
    out.push(clip('p3140-cp', h.rect(...P(-450, 0), 900 * s, 300 * s, h.a.blanc)));
    out.push(`<g clip-path="url(#p3140-cp)">${grosses.map(p => pierre(rp, ...P(p.x, p.y), p.r * s, h.a.detail, true)).join('')}</g>`);

    // paroi du trou
    out.push(poly([[-600, 0], [-600, 600], [600, 600], [600, 0]], h.a.arete, false));

    // mousse, puis branches de conifère serrées, en travers du trou
    out.push(poly([[-880, -320], [880, -320], [880, -200], [-880, -200]], h.a.blanc));
    out.push(poly([[-880, -320], [880, -320], [880, -200], [-880, -200]], h.a.hachure('isolant', 'aucun')));
    out.push(poly([[-880, -320], [880, -320]], h.a.fin, false), poly([[-880, -200], [880, -200]], h.a.fin, false));
    out.push(poly([[-880, -200], [880, -200], [880, 0], [-880, 0]], h.a.blanc));          // filet blanc + branches
    out.push(poly([[-820, -180], [820, -180]], h.a.fin, false));
    const rb = hasard(7);
    // un rameau de sapin vu de côté : la tige, les aiguilles couchées vers la base, plus courtes au bout
    const rameau = (A, Bq) => {
      const o = [], [ax, ay] = P(...A), [bx2, by2] = P(...Bq);
      const L = Math.hypot(bx2 - ax, by2 - ay), ux = (bx2 - ax) / L, uy = (by2 - ay) / L;
      o.push(h.ligne(ax, ay, bx2, by2, h.a.detail));
      for (let d = 2; d < L - 1; d += 3.2) {
        const k = 6.2 * (1 - 0.55 * d / L), px = ax + ux * d, py = ay + uy * d;
        const bx3 = -ux * k * 0.6, by3 = -uy * k * 0.6, nx = -uy * k * 0.8, ny = ux * k * 0.8;
        o.push(`<path d="M${f(px)} ${f(py)} l${f(bx3 + nx)} ${f(by3 + ny)} M${f(px)} ${f(py)} l${f(bx3 - nx)} ${f(by3 - ny)}" fill="none" stroke="${N}" stroke-width="0.5" stroke-linecap="round"/>`);
      }
      return o.join('');
    };
    [[-35, 0], [-90, 1], [-145, 2]].forEach(([y, i]) => {
      let x = -830 + i * 130;
      while (x < 800) {
        const l = 300 + 150 * rb(), xa = Math.max(-815, x), xb = Math.min(815, x + l);
        const dy = (rb() - 0.5) * 22, sens = rb() < 0.5;
        if (xb - xa > 140) out.push(sens ? rameau([xa, y - dy], [xb, y + dy]) : rameau([xb, y - dy], [xa, y + dy]));
        x += l + 40;
      }
    });

    // l'ouverture de visite : un tronc creux, du gravier du fond jusqu'au-dessus de la butte
    out.push(poly([[tx - tr, tH], [tx + tr, tH], [tx + tr, tB], [tx - tr, tB]], h.a.blanc));
    out.push(poly([[tx - tr, tH], [tx - tr + te, tH], [tx - tr + te, tB], [tx - tr, tB]], h.a.hachure('bois', 'arete')));
    out.push(poly([[tx + tr - te, tH], [tx + tr, tH], [tx + tr, tB], [tx + tr - te, tB]], h.a.hachure('bois', 'arete')));
    // sa planche, ôtée et posée sur la butte
    const xp0 = -40, xp1 = 270, yp = surf(115);
    out.push(poly([[xp0, yp - 28], [xp1, yp - 28], [xp1, yp], [xp0, yp]], h.a.hachure('bois', 'arete')));

    // herbe sur la butte
    for (let x = X0 + 40; x < X1 - 20; x += 105) {
      if (x > tx - tr - 40 && x < xp1 + 30) continue;
      const [px, py] = P(x, surf(x));
      out.push(`<path d="M${f(px - 3)} ${f(py)} l-2 -6 M${f(px)} ${f(py)} l0 -7.5 M${f(px + 3)} ${f(py)} l2.2 -5.5" fill="none" stroke="${N}" stroke-width="0.7" stroke-linecap="round"/>`);
    }

    // le seau, penché au-dessus de l'ouverture
    const th = 110 * Math.PI / 180, bx = -239, by = -1241;
    const R = (x, y) => [bx + x * Math.cos(th) - y * Math.sin(th), by + x * Math.sin(th) + y * Math.cos(th)];
    // chaudière : flancs évasés vers l'ouverture, bourrelet roulé au rebord, anse qui pend
    const seau = [R(-160, 0), R(160, 0), R(108, 350), R(-108, 350)];
    out.push(poly(seau, `fill="${B}" ${h.a.contour.replace('fill="none" ', '')}`));
    out.push(poly([R(-172, -10), R(172, -10), R(170, 22), R(-170, 22)], `fill="${B}" ${h.a.arete.replace('fill="none" ', '')}`));   // bourrelet
    out.push(poly([R(-150, 120), R(150, 120)], h.a.fin, false), poly([R(-118, 300), R(118, 300)], h.a.fin, false));
    {
      const o1 = P(...R(-158, 60)), o2 = P(...R(158, 60));
      const m = [(o1[0] + o2[0]) / 2, Math.max(o1[1], o2[1]) + 420 * s];
      out.push(h.path(`M${f(o1[0])} ${f(o1[1])} Q${f(m[0])} ${f(m[1])} ${f(o2[0])} ${f(o2[1])}`, h.a.arete));
      out.push(h.cercle(...o1, 2.4, `fill="${B}" stroke="${N}" stroke-width="1"`), h.cercle(...o2, 2.4, `fill="${B}" stroke="${N}" stroke-width="1"`));
    }
    // le filet d'eau : il quitte la lèvre basse du seau et tombe dans le tronc
    const Lp = [-282, -1106], Cp = [-236, -1098], Ep = [-234, -1032], Fp = [-234, -942];
    const axe = [];
    for (let i = 0; i <= 14; i++) { const t = i / 14; axe.push([(1 - t) ** 2 * Lp[0] + 2 * t * (1 - t) * Cp[0] + t * t * Ep[0], (1 - t) ** 2 * Lp[1] + 2 * t * (1 - t) * Cp[1] + t * t * Ep[1]]); }
    for (let i = 1; i <= 6; i++) axe.push([Ep[0], Ep[1] + (Fp[1] - Ep[1]) * i / 6]);
    const nrm = (i) => { const a = axe[Math.max(0, i - 1)], b = axe[Math.min(axe.length - 1, i + 1)]; const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy); return [-dy / l, dx / l]; };
    const lg = (i, c) => 21 - 11 * i / (axe.length - 1);
    const bordA = axe.map((p, i) => { const n = nrm(i); return [p[0] + n[0] * lg(i, 0), p[1] + n[1] * lg(i, 0)]; });
    const bordB = axe.map((p, i) => { const n = nrm(i); return [p[0] - n[0] * lg(i, 2), p[1] - n[1] * lg(i, 2)]; });
    out.push(poly([...bordA, ...bordB.reverse()], `fill="${B}" stroke="${N}" stroke-width="0.7" stroke-linejoin="round"`));
    const filet = (k, i0, i1) => poly(axe.slice(i0, i1).map((p, j) => { const n = nrm(i0 + j); return [p[0] + n[0] * k, p[1] + n[1] * k]; }), h.a.fin, false);
    out.push(filet(7, 1, 10), filet(-6, 5, 14), filet(2, 13, 19));
    for (const [x, y, r] of [[-206, -1075, 1.6], [-199, -1048, 1.2], [-262, -1042, 1.4], [-210, -996, 1.1], [-258, -976, 1.3]]) {
      out.push(h.cercle(...P(x, y), r, `fill="${B}" stroke="${N}" stroke-width="0.7"`));
    }
    const e0 = P(tx + 66, -920), e1 = P(tx + 66, tB - 50);
    out.push(h.fleche(`M${f(e0[0])} ${f(e0[1])} L${f(e1[0])} ${f(e1[1])}`, h.a.cache));

    // l'eau quitte le puits par le fond et par les côtés
    const fl = (pts) => {
      const d = `M${pts.map(p => P(p[0], p[1]).map(f).join(' ')).join(' L')}`;
      return `<path d="${d}" fill="none" stroke="${B}" stroke-width="4.5" stroke-linecap="round"/>` + h.fleche(d, h.a.arete);
    };
    out.push(fl([[-380, 640], [-420, 790]]), fl([[0, 640], [0, 800]]), fl([[380, 640], [420, 790]]));
    out.push(fl([[-640, 230], [-800, 280]]), fl([[640, 230], [800, 280]]));

    // cotes : barres obliques aux deux bouts, traits de rappel jusqu'aux niveaux mesurés
    const coteB = (x1, y1, x2, y2, txt, cote) => {
      const [a1, b1] = P(x1, y1), [a2, b2] = P(x2, y2), k = 5;
      const o = [`<line x1="${f(a1)}" y1="${f(b1)}" x2="${f(a2)}" y2="${f(b2)}" stroke="${B}" stroke-width="3.5"/>`, h.ligne(a1, b1, a2, b2, h.a.detail)];
      for (const [x, y] of [[a1, b1], [a2, b2]]) o.push(h.ligne(x - k, y + k, x + k, y - k, h.a.arete));
      const vert = Math.abs(b2 - b1) > Math.abs(a2 - a1);
      if (vert) o.push(h.texte((a1 + a2) / 2 + (cote === 'gauche' ? -6 : 6), (b1 + b2) / 2 + 4, txt, { ancre: cote === 'gauche' ? 'end' : 'start', lisere: true }));
      else o.push(h.texte(Math.max(a1, a2) + 8, b1 + 4, txt, { ancre: 'start', lisere: true }));
      return o.join('');
    };
    const xc1 = -980, xc2 = -1130;
    out.push(h.ligne(...P(-600, 600), ...P(xc2 - 40, 600), h.a.fin));
    out.push(h.ligne(...P(-600, 300), ...P(xc1 - 40, 300), h.a.fin));
    out.push(coteB(xc1, 300, xc1, 600, '300 mm', 'droite'));
    out.push(coteB(xc2, 0, xc2, 600, '600 mm', 'gauche'));
    // la terre : du dessus de la mousse au sommet de la butte, juste à droite du tronc
    const xt = tx + tr + 70;
    out.push(coteB(xt, -320, xt, surf(xt), '600 mm', 'droite'));
    // l'anneau de gravier de 150 contre la paroi, à droite
    out.push(h.ligne(...P(450, 90), ...P(450, 200), h.a.fin));
    out.push(coteB(450, 150, 600, 150, '150 mm'));
    return out.join('\n');
  };

  // ═══ Rincer le gravier ═════════════════════════════════════════════════════════════════
  // Repère en mm : x = 0 à l'axe de la chaudière, y = 0 à la surface de l'eau.
  const geoRince = (z) => {
    const s = Math.min(z.l / 1320, z.h / 960);
    const ox = (z.l - 1320 * s) / 2 + 380 * s, oy = (z.h - 960 * s) / 2 + 530 * s;
    return { s, P: (x, y) => [ox + x * s, oy + y * s] };
  };
  const rince = (z) => {
    const { s, P } = geoRince(z);
    const out = [];
    const X0 = -380, X1 = 940, YF = 330, YB = 430;
    const poly = (pts, at, ferme = true) => h.chemin(pts.map(p => P(p[0], p[1])), at, ferme);
    // l'eau et le lit du ruisseau
    out.push(poly([[X0, 0], [X1, 0], [X1, YF], [X0, YF]], h.a.hachure('eau', 'aucun')));
    out.push(poly([[X0, YF], [X1, YF], [X1, YB], [X0, YB]], h.a.hachure('pierre', 'aucun')));
    out.push(poly([[X0, YF], [X1, YF]], h.a.arete, false));
    // le nuage de fines qui sort des trous et descend le courant
    const rn = hasard(99), pts = [];
    for (let i = 0; i < 900 && pts.length < 420; i++) {
      const t = Math.pow(rn(), 0.8);
      if (rn() > 1 - t * 0.75) continue;
      const bas = rn() < 0.3;
      const x = bas ? -60 + 180 * rn() + t * 600 : 140 + t * 760;
      const yc = bas ? 250 + t * 30 : 120 + t * 60;
      const sp = 25 + t * 95;
      const y = yc + (rn() + rn() + rn() - 1.5) * sp;
      if (y < 10 || y > YF - 8 || x > X1 - 10) continue;
      pts.push(P(x, y));
    }
    out.push(pts.map(p => `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(0.55 + 0.4 * rn())}" fill="${N}"/>`).join(''));
    // la chaudière percée, en coupe : l'intérieur, puis le gravier, puis les parois trouées
    const cuve = [[-150, -120], [150, -120], [125, 230], [-125, 230]];
    const rg = hasard(12);
    const dedans = (x, y, r) => y > -40 && y < 228 && Math.abs(x) < 125 + (230 - y) * 25 / 350 - 4;
    const gr = tasse(rg, dedans, [-150, -50, 150, 230], 12, 30, 3000, 0.86);
    out.push(`<clipPath id="p3140-cc">${h.chemin([P(-146, -40), P(146, -40), P(122, 227), P(-122, 227)], h.a.blanc, true)}</clipPath>`);
    out.push(`<g clip-path="url(#p3140-cc)">${gr.map(p => pierre(rg, ...P(p.x, p.y), p.r * s, h.a.fin)).join('')}</g>`);
    // parois : des trous sous l'eau
    const paroi = (a, b, trous) => {
      const o = []; let t0 = 0;
      for (const t of [...trous, 1.08]) {
        const t1 = Math.min(1, t - 0.04);
        if (t1 > t0) o.push(h.ligne(...P(a[0] + (b[0] - a[0]) * t0, a[1] + (b[1] - a[1]) * t0), ...P(a[0] + (b[0] - a[0]) * t1, a[1] + (b[1] - a[1]) * t1), h.a.contour));
        t0 = t + 0.04;
      }
      return o.join('');
    };
    out.push(paroi([-150, -120], [-125, 230], [0.5, 0.68, 0.86]));
    out.push(paroi([150, -120], [125, 230], [0.5, 0.68, 0.86]));
    out.push(paroi([-125, 230], [125, 230], [0.2, 0.5, 0.8]));
    out.push(h.rect(...P(-158, -126), 8 * s + 1, 14 * s, h.a.plein), h.rect(...P(150, -126), 8 * s + 1, 14 * s, h.a.plein));
    // la surface de l'eau, de part et d'autre de la chaudière
    out.push(poly([[X0, 0], [-137, 0]], h.a.arete, false), poly([[137, 0], [X1, 0]], h.a.arete, false));
    // l'anse et la main qui la tient
    const pv = [[-150, -96], [150, -96]];
    out.push(h.cercle(...P(...pv[0]), 2.2, h.a.detail), h.cercle(...P(...pv[1]), 2.2, h.a.detail));
    const [a0, a1] = [P(-150, -96), P(150, -96)];
    const top = P(0, -330);
    out.push(h.path(`M${f(a0[0])} ${f(a0[1])} C${f(a0[0])} ${f(top[1] + 40 * s)} ${f(top[0] - 90 * s)} ${f(top[1])} ${f(top[0])} ${f(top[1])} C${f(top[0] + 90 * s)} ${f(top[1])} ${f(a1[0])} ${f(top[1] + 40 * s)} ${f(a1[0])} ${f(a1[1])}`, h.a.arete));
    out.push(h.formes.main({ x: top[0], y: top[1], pose: 'prise', vue: 'dos', angle: 90, diametre: 22 * s, echelle: s, bras: 90 }));
    // le courant, et le va-et-vient de la main
    const c0 = P(-360, 90), c1 = P(-200, 90);
    out.push(h.fleche(`M${f(c0[0])} ${f(c0[1])} L${f(c1[0])} ${f(c1[1])}`, h.a.arete));
    const v = P(0, -460), dv = 70 * s;
    out.push(h.fleche(`M${f(v[0] + 12 * s)} ${f(v[1])} L${f(v[0] + 12 * s + dv)} ${f(v[1])}`, h.a.detail));
    out.push(h.fleche(`M${f(v[0] - 12 * s)} ${f(v[1])} L${f(v[0] - 12 * s - dv)} ${f(v[1])}`, h.a.detail));
    return out.join('\n');
  };

  // ═══ Vu de dessus ══════════════════════════════════════════════════════════════════════
  const geoPlan = (z) => {
    const s = Math.min(z.l / 2760, z.h / 1520);
    const ox = (z.l - 2760 * s) / 2 + 1350 * s, oy = (z.h - 1520 * s) / 2 + 660 * s;
    return { s, P: (x, y) => [ox + x * s, oy + y * s], cr: -720, cq: 880 };
  };
  const plan = (z) => {
    const { s, P, cr, cq } = geoPlan(z);
    const out = [];
    const rp = hasard(5);
    // le rond : anneau de gravier, pierres au milieu, tronc de visite
    const c = P(cr, 0);
    out.push(h.cercle(c[0], c[1], 600 * s, h.a.hachure('gravier', 'aucun')));
    out.push(h.cercle(c[0], c[1], 450 * s, h.a.blanc));
    const tr = [cr - 300, 0];
    const gr = tasse(rp, (x, y, r) => Math.hypot(x - cr, y) + r * 0.7 < 452 && Math.hypot(x - tr[0], y) > 125 + r * 0.8, [cr - 450, -450, cr + 450, 450], 62, 118, 4000, 0.93);
    out.push(gr.map(p => pierre(rp, ...P(p.x, p.y), p.r * s, h.a.fin)).join(''));
    out.push(h.cercle(c[0], c[1], 450 * s, h.a.detail));
    out.push(h.cercle(c[0], c[1], 600 * s, h.a.contour));
    out.push(`<circle cx="${f(P(...tr)[0])}" cy="${f(P(...tr)[1])}" r="${f(125 * s)}" fill="url(#h-bois)" stroke="${N}" stroke-width="1.4"/>`);
    out.push(h.cercle(...P(...tr), 93 * s, `fill="${B}" stroke="${N}" stroke-width="0.7"`));
    out.push(h.cote(...P(cr - 600, 690), ...P(cr + 600, 690), '1 200 mm', { cote: 'dessous' }));
    out.push(h.ligne(...P(cr - 600, 0), ...P(cr - 600, 705), h.a.fin), h.ligne(...P(cr + 600, 0), ...P(cr + 600, 705), h.a.fin));
    // l'anneau de 150 : cote sortie à droite du rond
    // cote radiale, sur la diagonale haut-droite, sortie en dehors du rond
    const ca = Math.SQRT1_2, [u0, u1, u2] = [450, 600, 760].map(r => P(cr + r * ca, -r * ca));
    out.push(`<line x1="${f(u0[0])}" y1="${f(u0[1])}" x2="${f(u2[0])}" y2="${f(u2[1])}" stroke="${B}" stroke-width="3.5"/>`);
    out.push(`<path d="M${f(u0[0] + 0.7)} ${f(u0[1] - 0.7)} L${f(u1[0] - 0.7)} ${f(u1[1] + 0.7)}" ${h.a.detail} marker-start="url(#fl)" marker-end="url(#fl)"/>`);
    out.push(h.ligne(u1[0], u1[1], u2[0], u2[1], h.a.detail), h.ligne(u2[0], u2[1], u2[0] + 14, u2[1], h.a.detail));
    out.push(h.texte(u2[0] + 17, u2[1] + 4, '150 mm', { ancre: 'start', lisere: true }));
    // le carré
    const q0 = [cq - 500, -500];
    out.push(h.rect(...P(...q0), 1000 * s, 1000 * s, h.a.hachure('gravier', 'aucun')));
    out.push(h.rect(...P(cq - 350, -350), 700 * s, 700 * s, h.a.blanc));
    const tq = [cq - 200, 0];
    const gq = tasse(rp, (x, y, r) => Math.abs(x - cq) + r * 0.7 < 352 && Math.abs(y) + r * 0.7 < 352 && Math.hypot(x - tq[0], y) > 125 + r * 0.8, [cq - 350, -350, cq + 350, 350], 62, 118, 4000, 0.93);
    out.push(gq.map(p => pierre(rp, ...P(p.x, p.y), p.r * s, h.a.fin)).join(''));
    out.push(h.rect(...P(cq - 350, -350), 700 * s, 700 * s, h.a.detail));
    out.push(h.rect(...P(...q0), 1000 * s, 1000 * s, h.a.contour));
    out.push(`<circle cx="${f(P(...tq)[0])}" cy="${f(P(...tq)[1])}" r="${f(125 * s)}" fill="url(#h-bois)" stroke="${N}" stroke-width="1.4"/>`);
    out.push(h.cercle(...P(...tq), 93 * s, `fill="${B}" stroke="${N}" stroke-width="0.7"`));
    out.push(h.cote(...P(cq - 500, 690), ...P(cq + 500, 690), '1 000 mm', { cote: 'dessous' }));
    out.push(h.ligne(...P(cq - 500, 500), ...P(cq - 500, 705), h.a.fin), h.ligne(...P(cq + 500, 500), ...P(cq + 500, 705), h.a.fin));
    return out.join('\n');
  };

  return {
    ref: '31-40',
    titre: 'Le puits absorbant des eaux grises',
    desc: 'Le puits absorbant des eaux grises. En coupe : un trou de 1,2 m de diamètre et 60 cm de profondeur dans le sol naturel ; 30 cm de gravier lavé au fond et 15 cm contre les parois ; au milieu, des pierres posées sur le gravier, avec des vides entre elles. Par-dessus, des branches de conifère serrées posées en travers du trou et au-delà du bord, une couche de mousse, puis 60 cm de terre perméable à l’air en butte, herbe dessus. L’ouverture de visite, un tronc creux debout sur le gravier du fond, sort au-dessus de la butte ; sa planche est ôtée et posée à côté, et un seau penché y verse l’eau du piège à graisse ; l’eau descend le tronc et quitte le puits par le fond et par les côtés. Rincer le gravier : une chaudière percée pleine de gravier, tenue par l’anse et brassée dans le courant d’un ruisseau, laisse partir un nuage de fines par ses trous. Vu de dessus, sans couverture : le trou rond de 1,2 m ou carré de 1 m, l’anneau de gravier de 15 cm contre la paroi, les pierres et le tronc de visite au milieu.',
    format: 'pleine',
    disposition: [['coupe'], ['rince', 'plan']],
    hauteurs: [2.3, 1],
    largeurs: [[1], [1, 1]],
    vues: {
      coupe: {
        titre: 'En coupe : l’eau du piège à graisse versée par l’ouverture de visite',
        dessin: coupe,
        renvois: (z) => {
          const { P, surf, tx, tr } = geoCoupe(z);
          return [
            { n: 1, rond: P(-1250, -1150), cible: P(tx - tr, -970), texte: 'ouverture de visite et sa planche' },
            { n: 2, rond: P(1250, -1150), cible: P(960, -500), texte: 'terre perméable à l’air, en butte' },
            { n: 3, rond: P(1420, -820), cible: P(870, -260), texte: 'mousse' },
            { n: 4, rond: P(1460, -480), cible: P(812, -90), texte: 'branches de conifère serrées' },
            { n: 5, rond: P(1150, 20), cible: P(230, 40), texte: 'pierres, au milieu' },
            { n: 6, rond: P(1150, 470), cible: P(520, 470), texte: 'gravier lavé de 15 à 60 mm' },
          ];
        },
      },
      rince: {
        titre: 'Rincer le gravier au ruisseau',
        dessin: rince,
        renvois: (z) => {
          const { P } = geoRince(z);
          return [
            { n: 7, rond: P(-320, -260), cible: P(-146, -80), texte: 'chaudière percée, pleine de gravier' },
            { n: 8, rond: P(760, -150), cible: P(620, 150), texte: 'les fines : brasser jusqu’à l’eau claire' },
          ];
        },
      },
      plan: {
        titre: 'Vu de dessus, sans couverture : rond ou carré',
        dessin: plan,
        renvois: [],
      },
    },
  };
};
