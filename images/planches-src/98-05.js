// Planche 98-05 — Semer le grain à la volée (ch. 98, étapes 32 et 33, note 4).
// Le chapitre : diviser le carré en bandes au cordeau (une corde et deux piquets, ch. 95) ; peser
// la semence de chaque bande, niveau marqué au couteau dans le contenant ; en semer la moitié en
// marchant dans un sens, l'autre moitié en travers, à pleine main, d'un geste égal. Deux passages
// croisés comblent les bandes claires qu'un seul passage laisse toujours.
// Aucune cote : le chapitre ne donne ni la largeur des bandes ni la taille du carré.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => Math.round(v * 10) / 10;
  const RAD = Math.PI / 180;
  const P2 = p => `${f(p[0])} ${f(p[1])}`;

  // hasard reproductible
  const alea = (graine) => { let s = graine >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };

  // un grain : un petit fuseau plein, en coordonnées absolues
  const grain = (x, y, a, r = 1.2) => {
    const u = [Math.cos(a * RAD), Math.sin(a * RAD)], n = [-u[1], u[0]], rx = r * 1.5, ry = r * 0.95;
    const p1 = [x - u[0] * rx, y - u[1] * rx], p2 = [x + u[0] * rx, y + u[1] * rx];
    const c1 = [x + n[0] * ry, y + n[1] * ry], c2 = [x - n[0] * ry, y - n[1] * ry];
    return `<path d="M ${P2(p1)} Q ${P2(c1)} ${P2(p2)} Q ${P2(c2)} ${P2(p1)} Z" ${A.plein}/>`;
  };

  // une empreinte de botte (semelle et talon), au trait, la pointe vers ang (degrés, 0 = vers +x)
  const empreinte = (x, y, ang, L) => {
    const W = L * 0.4, u = [Math.cos(ang * RAD), Math.sin(ang * RAD)], n = [-u[1], u[0]];
    const T = p => [x + u[0] * p[0] + n[0] * p[1], y + u[1] * p[0] + n[1] * p[1]];
    const semelle = [[-L * 0.04, 0], [-L * 0.02, -W * 0.4], [L * 0.2, -W * 0.52], [L * 0.4, -W * 0.5], [L * 0.53, -W * 0.3],
      [L * 0.56, 0], [L * 0.53, W * 0.3], [L * 0.4, W * 0.5], [L * 0.2, W * 0.52], [-L * 0.02, W * 0.4]].map(T);
    const talon = [[-L * 0.44, -W * 0.34], [-L * 0.16, -W * 0.38], [-L * 0.16, W * 0.38], [-L * 0.44, W * 0.34]].map(T);
    return h.chemin(semelle, `${A.blanc}`, true) + h.chemin(semelle, A.detail, true) +
      h.chemin(talon, `${A.blanc}`, true) + h.chemin(talon, A.detail, true);
  };
  // une file d'empreintes de (x0, y0) à (x1, y1), gauche et droite en alternance
  const pas = (x0, y0, x1, y1, n, L) => {
    const dx = x1 - x0, dy = y1 - y0, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d;
    const ang = Math.atan2(dy, dx) / RAD, e = L * 0.3, out = [];
    for (let i = 0; i < n; i++) {
      const t = n === 1 ? 0 : i / (n - 1), s = i % 2 === 0 ? 1 : -1;     // 1 : pied gauche
      out.push(empreinte(x0 + dx * t + uy * e * s, y0 + dy * t - ux * e * s, ang, L));
    }
    return out.join('\n');
  };

  // un piquet vu de dessus
  const piquet = (x, y) => h.cercle(x, y, 3.2, A.plein);
  // un seau vu de dessus : le bord, l'anse couchée en travers
  const seauDessus = (x, y, r, ang = 0) => {
    const u = [Math.cos(ang * RAD), Math.sin(ang * RAD)];
    return [h.cercle(x, y, r, A.blanc), h.cercle(x, y, r, A.arete), h.cercle(x, y, r * 0.8, A.fin),
      h.ligne(x - u[0] * r * 1.05, y - u[1] * r * 1.05, x + u[0] * r * 1.05, y + u[1] * r * 1.05, A.detail)].join('\n');
  };

  // la bande vue de dessus, en long : deux cordeaux et leurs piquets
  const bande = (z) => {
    const x0 = 10, x1 = z.l - 10, yh = 26, yb = z.h - 26;
    return { x0, x1, yh, yb, c: (yh + yb) / 2, hb: yb - yh,
      svg: [h.ligne(x0, yh, x1, yh, A.detail), h.ligne(x0, yb, x1, yb, A.detail),
        piquet(x0, yh), piquet(x1, yh), piquet(x0, yb), piquet(x1, yb)].join('\n') };
  };
  // un passage dans le sens de la bande laisse deux traînées claires
  const TRAINEES = [0.27, 0.72];
  const densite1 = (b, y) => {
    const u = (y - b.yh) / b.hb;
    return TRAINEES.some(t => Math.abs(u - t) < 0.09) ? 0.03 : 0.62;
  };
  // semis en grille brouillée : régulier là où il est égal, pour que les traînées se voient
  const semis = (b, xa, xb, dens, graine, pasG = 5.5) => {
    const r = alea(graine), out = [];
    for (let y = b.yh + 3; y < b.yb - 3; y += pasG)
      for (let x = xa; x < xb; x += pasG) {
        const gx = x + r() * pasG, gy = y + r() * pasG, a = r() * 180;
        if (gy < b.yb - 2 && gx < xb && r() < dens(b, gy)) out.push(grain(gx, gy, a));
      }
    return out.join('\n');
  };
  // le geste vu de dessus : le seau devant à gauche, l'arc du bras, l'éventail de grain qui tombe
  // devant. P : entre les pieds ; dir : sens de la marche (degrés) ; L : longueur d'une empreinte
  const volee = (b, P, dir, graine, L) => {
    const u = [Math.cos(dir * RAD), Math.sin(dir * RAD)], g = [u[1], -u[0]];   // g : la gauche
    const pt = (av, ga) => [P[0] + u[0] * av + g[0] * ga, P[1] + u[1] * av + g[1] * ga];
    const seau = pt(-L * 0.1, L * 1.4);
    const epaule = pt(0, -L * 0.35);
    const R = L * 1.9, arc = [];
    for (let a = -56; a <= 50; a += 4) {
      const d = [Math.cos((dir + a) * RAD), Math.sin((dir + a) * RAD)];
      arc.push([epaule[0] + d[0] * R, epaule[1] + d[1] * R]);
    }
    const r = alea(graine), grains = [];
    for (let i = 0; i < 110; i++) {
      const a = (dir - 58 + r() * 116) * RAD, rr = L * 2.9 + r() * L * 2.2;
      const x = epaule[0] + Math.cos(a) * rr, y = epaule[1] + Math.sin(a) * rr;
      if (y > b.yh + 3 && y < b.yb - 3 && x > b.x0 + 3 && x < b.x1 - 3) grains.push(grain(x, y, r() * 180));
    }
    const C = pt(-L * 0.05, 0), ang = dir;
    const epaules = `<ellipse cx="${f(C[0])}" cy="${f(C[1])}" rx="${f(L * 0.42)}" ry="${f(L * 0.95)}" transform="rotate(${f(ang)} ${f(C[0])} ${f(C[1])})" ${A.blanc}/>` +
      `<ellipse cx="${f(C[0])}" cy="${f(C[1])}" rx="${f(L * 0.42)}" ry="${f(L * 0.95)}" transform="rotate(${f(ang)} ${f(C[0])} ${f(C[1])})" ${A.contour}/>`;
    const T = pt(L * 0.32, 0), tete = h.cercle(T[0], T[1], L * 0.28, A.blanc) + h.cercle(T[0], T[1], L * 0.28, A.contour);
    return { seau, arc, epaule, svg: [grains.join('\n'), epaules, tete, seauDessus(seau[0], seau[1], L * 0.3, dir),
      h.fleche('M ' + arc.map(P2).join(' L '), A.arete)].join('\n') };
  };

  // ── le geste, de profil ────────────────────────────────────────────────────────────────
  const geste = (z) => {
    const y0 = z.h - 8, x = z.l * 0.2, e = (z.h - 18) / 1760;
    const V = (p) => [x + p[0] * e, y0 + p[1] * e];
    // le seau, contre le ventre (mm, repère au sol entre les pieds)
    const hautS = -1100, basS = -840, avS = 104, arS = 104 + 260;
    const s1 = V([avS, hautS]), s2 = V([arS, hautS]), s3 = V([arS - 16, basS]), s4 = V([avS + 16, basS]);
    const anse = h.path(`M ${P2(V([avS + 6, hautS + 30]))} Q ${P2(V([(avS + arS) / 2, hautS - 170]))} ${P2(V([arS - 6, hautS + 30]))}`, A.detail);
    const seau = [
      h.chemin([s1, s2, s3, s4], A.blanc, true), anse,
      h.chemin([s1, s2, s3, s4], A.contour, true),
      h.ligne(...V([avS + 2, hautS + 24]), ...V([arS - 2, hautS + 24]), A.detail),
      h.ligne(...V([avS + 12, basS - 36]), ...V([arS - 12, basS - 36]), A.fin),
    ].join('\n');
    const p = F.personnage({ x, y: y0, pose: 'debout', echelle: e,
      mains: { proche: V([400, -1070]), loin: V([196, -1092]) } });
    const main = p.mains.proche, pg = p.poignets.proche;
    // la main ouverte, paume vers le bas, doigts en éventail, au bout du bras qui balaie
    const am = Math.atan2(main[1] - pg[1], main[0] - pg[0]), dm = Math.hypot(main[0] - pg[0], main[1] - pg[1]) / 190;
    const mainO = F.main({ x: pg[0] + Math.cos(am) * 92 * dm, y: pg[1] + Math.sin(am) * 92 * dm, pose: 'appui', vue: 'dos',
      echelle: dm, angle: am / RAD, bras: 30 });
    // la courroie : de l'anse relevée à l'épaule opposée, en travers de la poitrine
    const ap = V([(avS + arS) / 2, hautS - 120]), ep2 = V([-60, -1440]);
    const courroie = [h.ligne(ap[0], ap[1], ep2[0], ep2[1], A.contour), h.ligne(ap[0] + 2.2, ap[1] + 1, ep2[0] + 2.2, ep2[1] + 1, A.contour)].join('\n');
    // le médaillon, grossi : la main pleine fermée, puis la même qui s'ouvre
    const mx = z.l - 46, my = 44, mR = 42;
    const med = [h.cercle(mx, my, mR, A.blanc), h.cercle(mx, my, mR, A.arete),
      F.main({ x: mx - 14, y: my - 12, pose: 'boule', vue: 'profil', echelle: 0.16, diametre: 10, angle: 0, bras: 15 }),
      F.main({ x: mx + 4, y: my + 14, pose: 'appui', vue: 'dos', echelle: 0.16, angle: 30, bras: 15 }),
      h.fleche(`M ${f(mx + 4)} ${f(my - 22)} Q ${f(mx + 20)} ${f(my - 16)} ${f(mx + 22)} ${f(my - 4)}`, A.detail)].join('\n');
    // le grain qui quitte la main ouverte, en éventail, et tombe devant
    const r = alea(9805), vol = [];
    for (let i = 0; i < 60; i++) {
      const t = 0.08 + r() * 0.92;
      const xa = main[0] + 3 + t * (z.l - 12 - main[0] - 3);
      const bas = main[1] + 4 + t * (y0 - 4 - main[1] - 4), haut = main[1] - 4 + t * (y0 - main[1]) * 0.3;
      const y = haut + r() * (bas - haut);
      vol.push(grain(xa, y, Math.atan2(y - main[1], xa - main[0]) / RAD, 1.25));
    }
    for (let i = 0; i < 16; i++) vol.push(grain(main[0] + 30 + r() * (z.l - 16 - main[0] - 30), y0 - 1.5, r() * 30 - 15, 1.1));
    return { svg: [h.ligne(6, y0, z.l - 6, y0, A.arete), p, seau, courroie, mainO, vol.join('\n'), med].join('\n'), med: [mx, my, mR],
      seau: V([(avS + arS) / 2 + 40, (hautS + basS) / 2 + 40]), main,
      eventail: [main[0] + (z.l - main[0]) * 0.6, main[1] + (y0 - main[1]) * 0.55] };
  };

  // ── le carré, vu de dessus ─────────────────────────────────────────────────────────────
  const carre = (z) => {
    const c = Math.min(z.l - 56, z.h - 64), x0 = (z.l - c) / 2 + 6, y0 = 44, n = 4, w = c / n;
    const out = [h.ligne(x0, y0, x0 + c, y0, A.fin), h.ligne(x0, y0 + c, x0 + c, y0 + c, A.fin)];
    for (let i = 0; i <= n; i++) {
      const xi = x0 + w * i;
      out.push(h.ligne(xi, y0 - 7, xi, y0 + c + 7, A.detail), piquet(xi, y0 - 7), piquet(xi, y0 + c + 7));
    }
    const ys = y0 + c + 26;
    for (let i = 0; i < n; i++) out.push(seauDessus(x0 + w * (i + 0.5), ys, Math.min(10, w * 0.28)));
    return { svg: out.join('\n'), x0, y0, c, n, w, ys };
  };

  // ── le contenant, en coupe ─────────────────────────────────────────────────────────────
  const dose = (z) => {
    const lh = Math.min(z.l - 44, 104), hb = Math.min(z.h - 60, 128), cx = z.l / 2 - 4, yb = z.h - 14, yt = yb - hb;
    const ep = 8, ret = 10;                                // épaisseur de paroi, retrait du fond
    const gh = [cx - lh / 2, yt], dh = [cx + lh / 2, yt], gb = [cx - lh / 2 + ret, yb], db = [cx + lh / 2 - ret, yb];
    const niv = yt + hb * 0.3;                             // le niveau marqué
    const xg = y => gh[0] + (gb[0] - gh[0]) * (y - yt) / hb, xd = y => dh[0] + (db[0] - dh[0]) * (y - yt) / hb;
    // le grain, du fond au niveau
    const r = alea(9806), gr = [];
    for (let y = niv + 1.5; y < yb - ep - 1.5; y += 4.2)
      for (let x = xg(y) + ep + 1.5; x < xd(y) - ep - 1.5; x += 4.2) gr.push(grain(x + r() * 2, y + r() * 2, r() * 180, 1.15));
    const paroi = (a, b, s) => h.chemin([a, b, [b[0] + s * ep, b[1]], [a[0] + s * ep, a[1]]], A.plein, true);
    // l'encoche au couteau dans la paroi de droite, au niveau
    const xe = xd(niv) - ep, xf = xg(niv) + ep;
    const encoche = h.chemin([[xe - 0.5, niv - 5], [xe + 6, niv], [xe - 0.5, niv + 5]], A.blanc, true) +
      h.chemin([[xf + 0.5, niv - 5], [xf - 6, niv], [xf + 0.5, niv + 5]], A.blanc, true);
    const anse = h.path(`M ${P2([gh[0] + 2, yt + 8])} Q ${P2([cx, yt - 58])} ${P2([dh[0] - 2, yt + 8])}`, A.detail);
    const out = [gr.join('\n'), h.ligne(xg(niv) + ep, niv, xd(niv) - ep, niv, A.fin), anse,
      paroi(gh, gb, 1), paroi(dh, db, -1),
      h.rect(gb[0], yb - ep, db[0] - gb[0], ep, A.plein),
      encoche];
    return { svg: out.join('\n'), niv, xe, cx, yb, yt };
  };

  const L = 15;                                          // une empreinte, dans les vues de dessus
  return {
    ref: '98-05',
    titre: 'Semer le grain à la volée',
    desc: 'Le geste de profil : le contenant de semence tenu contre soi, la main pleine qui s’ouvre en balayant, le grain qui part en éventail. Le carré divisé en bandes au cordeau, vu de dessus, la semence de chaque bande à part. La semence d’une bande, au niveau marqué au couteau dans le contenant. Les deux passages croisés vus de dessus : la première moitié en marchant dans le sens de la bande, qui laisse des traînées claires ; la seconde en travers, d’un cordeau à l’autre, qui les comble.',
    format: 'pleine',
    disposition: [['geste', 'carre', 'dose'], ['sens'], ['travers']],
    hauteurs: [1.75, 1, 1],
    largeurs: [[1.15, 1.15, 0.8], [1], [1]],
    vues: {
      geste: {
        titre: 'Le geste',
        dessin: z => geste(z).svg,
        renvois: z => { const g = geste(z); return [
          { n: 1, rond: [g.seau[0] + 22, g.seau[1] + 62], cible: g.seau, texte: 'le contenant de semence' },
          { n: 2, rond: [g.main[0] - 6, g.main[1] + 34], cible: [g.main[0] - 3, g.main[1] - 4], texte: 'la main pleine s’ouvre' },
          { n: 3, rond: [z.l - 14, g.eventail[1] - 50], cible: g.eventail, texte: 'le grain part en éventail' },
        ]; },
      },
      carre: {
        titre: 'Le carré en bandes',
        dessin: z => carre(z).svg,
        renvois: z => { const c = carre(z); return [
          { n: 4, rond: [c.x0 + c.w, c.y0 - 31], cible: [c.x0 + c.w, c.y0 - 11], texte: 'piquet' },
          { n: 5, rond: [c.x0 + 2.5 * c.w, c.y0 + c.c * 0.28], cible: [c.x0 + 3 * c.w, c.y0 + c.c * 0.28], texte: 'cordeau tendu' },
          { n: 6, rond: [12, c.y0 + c.c * 0.6], cible: [c.x0 + 0.5 * c.w, c.y0 + c.c * 0.6], texte: 'une bande' },
          { n: 7, rond: [12, c.ys + 4], cible: [c.x0 + 0.5 * c.w - 9, c.ys], texte: 'sa semence, pesée à part' },
        ]; },
      },
      dose: {
        titre: 'La semence d’une bande',
        dessin: z => dose(z).svg,
        renvois: z => { const d = dose(z); return [
          { n: 8, rond: [14, d.yb - 60], cible: [d.cx - 18, d.yb - 40], texte: 'la semence d’une bande' },
          { n: 9, rond: [z.l - 12, d.niv - 40], cible: [d.xe + 3, d.niv - 2], texte: 'niveau marqué au couteau' },
        ]; },
      },
      sens: {
        titre: 'Première moitié : dans le sens de la bande',
        dessin: z => {
          const b = bande(z), P = [z.l * 0.52, b.c], v = volee(b, P, 0, 9807, L);
          const n = Math.floor((P[0] - b.x0 - 16) / (L * 1.45)) + 1;
          return [b.svg,
            semis(b, b.x0 + 4, P[0] - L * 0.6, densite1, 9808),
            pas(P[0] - (n - 1) * L * 1.45, b.c, P[0], b.c, n, L),
            v.svg,
            h.fleche(`M ${f(P[0] + L * 5.6)} ${f(b.c)} L ${f(P[0] + L * 8)} ${f(b.c)}`, A.arete)].join('\n');
        },
        renvois: z => { const b = bande(z), P = [z.l * 0.52, b.c], v = volee(b, P, 0, 9807, L); return [
          { n: 10, rond: [P[0] - L * 6.6, b.yh - 13], cible: [P[0] - L * 6.6, b.c - 3], texte: 'la marche, en long' },
          { n: 11, rond: [v.arc[3][0] - 18, b.yh - 13], cible: v.arc[3], texte: 'le bras balaie devant soi' },
          { n: 12, rond: [z.l * 0.12, b.yb + 13], cible: [z.l * 0.12, b.yh + b.hb * TRAINEES[1]], texte: 'des traînées claires restent' },
        ]; },
      },
      travers: {
        titre: 'Seconde moitié : en travers',
        dessin: z => {
          const b = bande(z), s = (z.l - 44) / 6, xs = k => 22 + s * k;
          const y1 = b.yb - 8, y2 = b.yh + 8, P = [xs(2), b.yb - 16];
          const v = volee(b, P, -90, 9809, L);
          const out = [b.svg,
            semis(b, b.x0 + 4, b.x1 - 4, densite1, 9808),
            semis(b, b.x0 + 4, xs(1) + s * 0.5, () => 0.55, 9810)];
          // le trajet : une montée, un pas de côté, une descente… chaque traversée fléchée
          for (let k = 0; k <= 6; k++) {
            if (k === 2) continue;
            const monte = k % 2 === 0, ya = monte ? y1 : y2, yz = monte ? y2 : y1;
            out.push(h.fleche(`M ${f(xs(k))} ${f(ya)} L ${f(xs(k))} ${f(yz + (monte ? 4 : -4))}`, A.cache));
            if (k < 6 && k !== 1) out.push(h.ligne(xs(k), yz, xs(k + 1), yz, A.cache));
          }
          out.push(h.ligne(xs(1), y1, xs(2) - 8, y1, A.cache), h.ligne(xs(2), y2, xs(3), y2, A.cache));
          out.push(pas(P[0], P[1] + L * 0.5, P[0], P[1] - L * 0.3, 2, L), v.svg);
          return out.join('\n');
        },
        renvois: z => { const b = bande(z), s = (z.l - 44) / 6, xs = k => 22 + s * k; return [
          { n: 13, rond: [xs(4) - 14, b.yh - 13], cible: [xs(4), b.yh + 30], texte: 'la marche, en travers' },
          { n: 14, rond: [xs(0) + s * 0.5, b.yb + 13], cible: [xs(0) + s * 0.5, b.yh + b.hb * TRAINEES[1]], texte: 'les traînées se comblent' },
        ]; },
      },
    },
  };
};
