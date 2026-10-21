// Planche 64-08 — sortir le quartier avant du bois : la peau en traîneau, le cadre de portage.
// Chapitre 64, § 9 « Le sortir du bois sur le dos », et tableau Matériel (la corde, les sacs de
// coton, la peau retournée poil en bas). Aucun chiffre : le chapitre n'en donne pas pour ce montage.
//
// Passe qualité (lot 14) : le coin du cadre est redessiné en vrai brelage carré, en deux temps
// (les tours en carré sur le nœud de départ, puis le serrage et le nœud d'arrêt) ; les coins de
// la vue de dos reprennent ce brelage ; la corde d'amarrage fait le tour des montants ; la charge
// portée de profil a l'épaisseur du torse ; le poil du traîneau est serré sur le dessous et
// l'arrière, couché vers l'arrière.
//
// Refaite le 13 octobre 2026 : le porteur est le corps simple debout, de profil (cote gauche), la
// bretelle posée sur lui (devant le tronc, sous le bras proche). La charte : les sacs, objets du
// geste, à 2,4 avec leur face à l'ombre ; le rouge : la flèche du tirage du traîneau et le cercle
// des reins qui restent libres sous la charge (« contre les omoplates et non sur les reins »).
module.exports = (h) => {
  const B = h.a.blanc.match(/fill="([^"]+)"/)[1];
  const blanc = t => h.a[t].replace('fill="none"', `fill="${B}"`);
  const f = v => Math.round(v * 100) / 100;
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  const trace = pts => 'M ' + pts.map(pt).join(' L ');

  // Hasard reproductible (lenticelles de l'aulne).
  let graine = 11;
  const alea = () => (graine = (graine * 16807) % 2147483647) / 2147483647;

  const bez = (p0, p1, p2, p3, n = 18) => {
    const out = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, u = 1 - t;
      out.push([u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
        u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]]);
    }
    return out;
  };
  const arc = (cx, cy, r, a0, a1, n = 14) => {
    const out = [];
    for (let i = 0; i <= n; i++) {
      const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180;
      out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    return out;
  };
  // Un quart d'ellipse (ou de cercle), avec une hauteur z pour les croisements de cordes.
  const ell = (c, rx, ry, a0, a1, z, m = 8) => {
    const out = [];
    for (let i = 0; i <= m; i++) {
      const a = (a0 + (a1 - a0) * i / m) * Math.PI / 180;
      out.push([c[0] + rx * Math.cos(a), c[1] + ry * Math.sin(a), z]);
    }
    return out;
  };
  // Enchaîne des tronçons continus (le premier point de chaque tronçon suivant est retiré).
  const suite = (...tr) => tr.reduce((acc, s) => acc.concat(acc.length ? s.slice(1) : s), []);
  // Rééchantillonne une polyligne à pas constant.
  const reech = (pts, pas) => {
    const out = [pts[0]];
    let reste = 0;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (L < 1e-6) continue;
      let s = pas - reste;
      while (s <= L) { out.push([a[0] + (b[0] - a[0]) * s / L, a[1] + (b[1] - a[1]) * s / L]); s += pas; }
      reste = L - (s - pas);
    }
    const der = pts[pts.length - 1], p = out[out.length - 1];
    if (Math.hypot(der[0] - p[0], der[1] - p[1]) > 0.4) out.push(der);
    return out;
  };
  const reperes = pts => pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, tx = (b[0] - a[0]) / L, ty = (b[1] - a[1]) / L;
    return { p, tx, ty, nx: -ty, ny: tx };
  });
  const decale = (R, e) => R.map(r => [r.p[0] + r.nx * e, r.p[1] + r.ny * e]);

  // Une bande d'épaisseur e le long d'une ligne : fond blanc, deux flancs, bouts fermés.
  const bande = (pts0, e, trait = 'arete', bouts = true) => {
    const pts = reech(pts0, 1.5), R = reperes(pts), G = decale(R, e / 2), D = decale(R, -e / 2), n = pts.length - 1;
    const fond = 'M ' + G.map(pt).join(' L ') + ' L ' + D.slice().reverse().map(pt).join(' L ') + ' Z';
    const out = [h.path(fond, h.a.blanc), h.path(trace(G), h.a[trait]), h.path(trace(D), h.a[trait])];
    if (bouts) {
      out.push(h.ligne(G[0][0], G[0][1], D[0][0], D[0][1], h.a[trait]));
      out.push(h.ligne(G[n][0], G[n][1], D[n][0], D[n][1], h.a[trait]));
    }
    return { svg: out.join('\n'), R, G, D };
  };
  // Une corde : la bande, et les torons en biais.
  const corde = (pts0, e = 4, bouts = true) => {
    const b = bande(pts0, e, 'arete', bouts);
    let s = '';
    for (let i = 1; i < b.R.length - 1; i += 2) {
      const r = b.R[i], k = e * 0.4;
      s += `M ${pt([r.p[0] + r.nx * e / 2 - r.tx * k, r.p[1] + r.ny * e / 2 - r.ty * k])} L ${pt([r.p[0] - r.nx * e / 2 + r.tx * k, r.p[1] - r.ny * e / 2 + r.ty * k])} `;
    }
    return b.svg + (s ? '\n' + h.path(s.trim(), h.a.fin) : '');
  };
  // Le bout arrondi d'une corde qui tourne autour d'une perche : au bord de la silhouette, la
  // corde passe derrière ; son dos dépasse un peu du bord. q : milieu du bout, d : vers dehors.
  const tourne = (q, d, e, trait = 'arete') => {
    const nx = -d[1], ny = d[0], w = e / 2, k = e * 0.55;
    const G = [q[0] + nx * w, q[1] + ny * w], D = [q[0] - nx * w, q[1] - ny * w];
    const c1 = [G[0] + d[0] * k, G[1] + d[1] * k], c2 = [D[0] + d[0] * k, D[1] + d[1] * k];
    const dd = `M ${pt(G)} C ${pt(c1)} ${pt(c2)} ${pt(D)}`;
    return h.path(dd + ' Z', h.a.blanc) + '\n' + h.path(dd, h.a[trait]);
  };
  // Une perche d'aulne droite, amincie d'un bout à l'autre ; bouts « coupe » ou « rompu ».
  const perche = (a, b, w1, w2, bouts = ['coupe', 'coupe'], lent = true) => {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), tx = (b[0] - a[0]) / L, ty = (b[1] - a[1]) / L, nx = -ty, ny = tx;
    const P = (s, o) => [a[0] + tx * s + nx * o, a[1] + ty * s + ny * o];
    const w = s => w1 + (w2 - w1) * s / L;
    const bout = (p, q, s, type, sens) => {
      if (type !== 'rompu') return `L ${pt(q)}`;
      const k = Math.max(4, w(s) * 0.35);
      const c1 = [p[0] + (q[0] - p[0]) * 0.3 + tx * k * sens, p[1] + (q[1] - p[1]) * 0.3 + ty * k * sens];
      const c2 = [p[0] + (q[0] - p[0]) * 0.7 - tx * k * sens, p[1] + (q[1] - p[1]) * 0.7 - ty * k * sens];
      return `C ${pt(c1)} ${pt(c2)} ${pt(q)}`;
    };
    const g0 = P(0, w1 / 2), g1 = P(L, w2 / 2), d1 = P(L, -w2 / 2), d0 = P(0, -w1 / 2);
    const d = `M ${pt(g0)} L ${pt(g1)} ${bout(g1, d1, L, bouts[1], 1)} L ${pt(d0)} ${bout(d0, g0, 0, bouts[0], -1)} Z`;
    const out = [h.path(d, blanc('contour'))];
    if (lent) {
      // L'écorce : quelques traits fins le long de la tige.
      let s = '';
      const nb = Math.floor(L / 16);
      for (let i = 0; i < nb; i++) {
        const lg = 8 + alea() * 16, sv = 5 + alea() * Math.max(1, L - lg - 10), ww = w(sv) / 2 - 3;
        if (ww < 1.5) continue;
        const o = (alea() * 2 - 1) * ww;
        s += `M ${pt(P(sv, o))} L ${pt(P(sv + lg, o))} `;
      }
      if (s) out.push(h.path(s.trim(), h.a.fin));
    }
    return out.join('\n');
  };
  const neige = h.a.hachure('neige').replace(/stroke="[^"]*"/, 'stroke="none"');
  // La face à l'ombre d'un volume (la charte) : le gris là où la forme, poussée vers le bas à droite,
  // sort d'elle-même ; le blanc, l'ombre, puis le contour à 2,4 par-dessus.
  let nOmbre = 0;
  const ombre = (d, dx, dy) => {
    const id = `ombre-64-08-${++nOmbre}`;
    return `<clipPath id="${id}"><path d="${d}" fill="#FFFFFF"/></clipPath>\n${h.path(d, h.a.blanc)}\n<g clip-path="url(#${id})">${h.path(d, h.a.ombre)}` +
      `<path d="${d}" transform="translate(${-dx} ${-dy})" ${h.a.blanc}/></g>\n${h.path(d, h.a.contour)}`;
  };
  const chemin = (P, cmds) => cmds.map(c => {
    if (c === 'Z') return 'Z';
    const [k, ...v] = c, pts = [];
    for (let i = 0; i < v.length; i += 2) pts.push(pt(P(v[i], v[i + 1])));
    return k + ' ' + pts.join(' ');
  }).join(' ');

  // ─── Le brelage carré, vu de face ────────────────────────────────────────────────────
  // Le montant vertical derrière, la traverse horizontale devant. Chaque tour monte devant la
  // traverse d'un côté du montant, passe derrière le montant au-dessus, redescend devant la
  // traverse de l'autre côté, repasse derrière le montant au-dessous. De face : les brins
  // devant la traverse et, à chaque coin, le coude qui tourne vers le montant et disparaît
  // derrière lui. Chaque tour se pose à l'extérieur du précédent, sur les deux perches.
  // Les tours de serrage passent entre les deux perches : devant le montant, par-dessus les
  // coudes, puis derrière la traverse, à l'extérieur des brins.
  // Le nœud de départ (cabestan) prend le montant sous la traverse ; son dormant monte faire le
  // premier brin, son bout libre pend. Le nœud d'arrêt (cabestan) prend la traverse.
  //   o : { id, cx, cy, wV, wH, e, n, serrage, depart, arret, sortie, trait }
  // Les perches se dessinent avant ; le brelage ne dessine que la corde.
  const brelage = o => {
    const F = h.formes, { cx, cy, wV, wH, e, n } = o;
    const nS = o.serrage || 0, trait = o.trait || 'arete';
    // gp : le jour entre le montant et le premier brin, pour qu'on voie la traverse passer devant
    const p = e * 1.08, R = k => (k + 0.5) * p, yS = j => (j + 1.35) * p, gp = o.jour == null ? 1.0 * e : o.jour;
    const eL = cx - wV / 2, eR = cx + wV / 2, yT = cy - wH / 2, yB = cy + wH / 2;
    const ouv = { ep: e, debut: 'ouvert', fin: 'ouvert' };
    const tours = [], dormant = [], devant = [], arret = [], serrage = [], bouts = [];
    const g = { eL, eR, yT, yB };
    // Les tours en carré.
    for (const c of [-1, 1]) for (let k = 0; k < n; k++) {
      const E = c < 0 ? eL : eR, C = E + c * gp, x = C + c * R(k), rb = c < 0 ? R(k) : R(k + 1);
      const haut = [[E - c * 4, yT - R(k), -1], [E, yT - R(k), -0.7], ...ell([C, yT], R(k), R(k), c < 0 ? 270 : -90, c < 0 ? 180 : 0, -0.5), [x, yT + 1.5, 1]];
      if (c < 0 && k === 0 && o.depart) { tours.push({ pts: [...haut, [x, cy, 1]], ...ouv }); continue; }
      const bas = [[x, yB - 1.5, 1], ...ell([C, yB], R(k), rb, c < 0 ? 180 : 0, 90, -0.5), [E, yB + rb, -0.7], [E - c * 4, yB + rb, -1]];
      tours.push({ pts: [...haut, ...bas], ...ouv });
    }
    g.brin = [eL - gp - R(Math.min(1, n - 1)), cy];
    // Le bout qui continue, après le dernier tour : il ressort de derrière le montant, en bas.
    if (o.sortie) {
      const y0 = yB + R(n);
      tours.push({ pts: [[eL + 4, y0, -1], [eL, y0, -0.5], [eL - gp - 1.6 * p, y0 + 0.45 * p, 0], [eL - gp - 3.8 * p, y0 + 1.3 * p, 0], [eL - gp - 5.8 * p, y0 + 2.3 * p, 0]],
        ep: e, debut: 'ouvert', fin: 'fixe', fleche: { de: 0.4, a: 0.95, cote: 'gauche' } });
      g.sortie = [eL - gp - 3.8 * p, y0 + 1.3 * p];
    }
    // Le nœud de départ : un cabestan sur le montant, sous la traverse, la croix devant.
    if (o.depart) {
      const x0 = eL - gp - R(0), d = 0.2 * wV, q = 0.7 * e;
      const ya = yB + R(n) + 1.7 * p, yb = ya + 1.9 * e, D = yb - ya;
      // le dormant : il descend devant le montant, passe sous la croix, tourne à gauche (1er tour)
      dormant.push({ pts: [[x0, cy, 0], [x0, yB - 1.5, 0], ...ell([eL - gp, yB], R(0), R(0), 180, 90, 0, 4).slice(1),
        [eL + 0.35 * (cx - d - eL), yB + 1.3 * e, 0], [cx - d, yB + 2.7 * e, 0], [cx - d, yb - q, 0],
        [cx - d - 0.3 * q, yb - 0.3 * q, 0], [cx - d - q, yb, 0], [eL, yb, 0]], ...ouv });
      // la croix : du 1er tour, en diagonale, par-dessus le dormant et le bout, vers le 2e tour
      devant.push({ pts: [[eR, yb, 1], [eR - 0.14 * wV, yb - 0.08 * D, 1], [cx, (ya + yb) / 2, 1], [eL + 0.14 * wV, ya + 0.08 * D, 1], [eL, ya, 1]], ...ouv });
      // le bout libre : du 2e tour, il passe sous la croix et pend
      devant.push({ pts: [[eR, ya, 0], [cx + d + q, ya, 0], [cx + d + 0.3 * q, ya + 0.3 * q, 0], [cx + d, ya + q, 0], [cx + d, yb + 0.6 * e, 0],
        [cx + d + 0.25 * e, yb + 2.7 * e, 0]], ep: e, debut: 'ouvert', fin: 'libre' });
      bouts.push([[eL, yb], [-1, 0]], [[eR, yb], [1, 0]], [[eL, ya], [-1, 0]], [[eR, ya], [1, 0]]);
      g.depart = [cx, (ya + yb) / 2]; g.bas = yb + 2.7 * e; g.bout = [cx + d + 0.2 * e, yb + 2.2 * e];
    }
    // Les tours de serrage : dessus, un ∩ ; dessous, un ∪ ; chacun plonge derrière la traverse,
    // à l'extérieur des brins.
    for (let j = 0; j < nS; j++) {
      const r = yS(j), rc = 0.8 * e, xl = eL - gp - R(n - 1) - (1 + 1.1 * j) * p, xr = eR + gp + R(n - 1) + (1 + 1.1 * j) * p;
      const droit = (y, z) => { const out = []; for (let i = 1; i < 6; i++) out.push([xl + rc + (xr - xl - 2 * rc) * i / 6, y, z]); return out; };
      const fin = o.arret && j === nS - 1;
      const dessus = [[xl, yT - 1.2, 0.5], [xl, yT - r + rc, 0.5], ...ell([xl + rc, yT - r + rc], rc, rc, 180, 270, 0.5, 5), ...droit(yT - r, 0.5),
        ...ell([xr - rc, yT - r + rc], rc, rc, 270, 360, 0.5, 5), [xr, yT - 1.2, 0.5]];
      if (fin) {
        // le dernier tour ne replonge pas : il passe par-dessus la traverse et fait le nœud d'arrêt
        const dH = 0.2 * wH, q = 0.7 * e, xs = xr, xa = xs + 1.7 * e, xb = xa + 2.3 * e, dd = xb - xa;
        arret.push({ pts: [...dessus.slice(0, -1), [xs, yT + 2, 0], [xs, cy + dH - q, 0], [xs + 0.3 * q, cy + dH - 0.3 * q, 0], [xs + q, cy + dH, 0],
          [xb - q, cy + dH, 0], [xb - 0.3 * q, cy + dH + 0.3 * q, 0], [xb, cy + dH + q, 0], [xb, yB, 0]], ...ouv });
        arret.push({ pts: [[xb, yT, 1], [xb - 0.06 * dd, yT + 0.14 * wH, 1], [(xa + xb) / 2, cy, 1], [xa + 0.06 * dd, yB - 0.14 * wH, 1], [xa, yB, 1]], ...ouv });
        arret.push({ pts: [[xa, yT, 0], [xa, cy - dH - q, 0], [xa + 0.3 * q, cy - dH - 0.3 * q, 0], [xa + q, cy - dH, 0], [xb + 3 * e, cy - dH + 0.6, 0]],
          ep: e, debut: 'ouvert', fin: 'libre' });
        bouts.push([[xb, yB], [0, 1]], [[xb, yT], [0, -1]], [[xa, yB], [0, 1]], [[xa, yT], [0, -1]]);
        g.arret = [(xa + xb) / 2, cy]; g.droite = xb + 3 * e;
      } else {
        serrage.push({ pts: dessus, ...ouv });
      }
      serrage.push({ pts: [[xl, yB + 1.2, 0.5], [xl, yB + r - rc, 0.5], ...ell([xl + rc, yB + r - rc], rc, rc, 180, 90, 0.5, 5), ...droit(yB + r, 0.5),
        ...ell([xr - rc, yB + r - rc], rc, rc, 90, 0, 0.5, 5), [xr, yB + 1.2, 0.5]], ...ouv });
      if (j === nS - 1) g.serrage = [cx, yT - r];
      g.gauche = xl;
    }
    // Deux passes : hors du montant, toute la corde ; sur le montant, seulement ce qui passe
    // devant lui. Les coudes qui filent derrière le montant s'arrêtent sous son contour.
    const id = `brelage-64-08-${o.id}`, M = 3000;
    const clipA = `<clipPath id="${id}-a"><path fill="none" clip-rule="evenodd" d="M 0 0 H ${M} V ${M} H 0 Z M ${f(eL - 1.2)} 0 V ${M} H ${f(eR + 1.2)} V 0 Z"/></clipPath>`;
    const clipB = `<clipPath id="${id}-b"><rect x="${f(eL - 1.2)}" y="0" width="${f(wV + 2.4)}" height="${M}"/></clipPath>`;
    const hors = F.cordes([...serrage, ...tours, ...dormant, ...arret], { trait });
    const sur = F.cordes([...serrage, ...dormant, ...devant], { trait });
    const svg = [clipA, clipB, `<g clip-path="url(#${id}-a)">`, `${hors}`, '</g>', `<g clip-path="url(#${id}-b)">`, `${sur}`, '</g>',
      ...bouts.map(([q, d]) => tourne(q, d, e, trait))].join('\n');
    return { svg, g };
  };

  // ─── 1. Le traîneau, de côté ─────────────────────────────────────────────────────────
  const geoTraineau = z => {
    const gy = z.h - 30, xa = z.l * 0.36, xb = z.l * 0.95, Hb = Math.min(66, (gy - 34) * 0.62);
    return { gy, xa, xb, Hb };
  };
  const vueTraineau = z => {
    const { gy, xa, xb, Hb } = geoTraineau(z), out = [];
    out.push(h.rect(0, gy, z.l, z.h - gy - 2, neige));
    out.push(h.ligne(0, gy, z.l, gy, h.a.arete));
    // Le rouleau : la peau refermée sur la pièce, l'avant relevé.
    const nez = [xa - 26, gy - Hb + 4];
    const forme = `M ${pt([xa, gy])} L ${pt([xb - 14, gy])} C ${pt([xb - 4, gy])} ${pt([xb, gy - 8])} ${pt([xb, gy - 18])} ` +
      `C ${pt([xb, gy - Hb * 0.75])} ${pt([xb - 18, gy - Hb])} ${pt([xb - 42, gy - Hb])} ` +
      `C ${pt([xa + (xb - xa) * 0.55, gy - Hb - 5])} ${pt([xa + 34, gy - Hb - 2])} ${pt([xa + 12, gy - Hb + 8])} ` +
      `C ${pt([xa + 2, gy - Hb + 12])} ${pt([xa - 16, gy - Hb + 6])} ${pt(nez)} ` +
      `C ${pt([xa - 20, gy - Hb + 18])} ${pt([xa - 12, gy - 4])} ${pt([xa, gy])} Z`;
    out.push(h.path(forme, blanc('contour')));
    // Le poil, couché vers l'arrière (vers la droite) : on tire vers la gauche. Tous les traits
    // ont la même pente. Serré sur le dessous, où la peau frotte la neige, et sur le contour de
    // l'arrière, où il dépasse ; plus lâche sur le flanc.
    // Un poil : la racine, puis la pointe qui se couche vers l'arrière.
    const poil = (x, y, k = 1) => `M ${pt([x, y])} Q ${pt([x + 2.6 * k, y + 2.4 * k])} ${pt([x + 6.4 * k, y + 2.9 * k])} `;
    let flanc = '', frange = '';
    for (let j = 0; ; j++) {
      const hy = 15 + j * 9;
      if (hy > Hb * 0.8 - 6) break;
      const y = gy - hy, r = hy / Hb;
      const x0 = xa + 2 - 16 * r + (j % 2) * 6, x1 = xb - 16 - 30 * Math.pow(r, 2.5);
      for (let x = x0; x < x1; x += 12) flanc += poil(x, y - 1.5, 0.85);
    }
    // le dessous : un rang serré, la pointe couchée sur la neige
    for (let x = xa + 1; x < xb - 20; x += 3.3) frange += poil(x, gy - 5.6);
    // le contour de l'arrière : le poil sort du bord et se couche vers l'arrière
    const arr = reech(suite(bez([xb - 14, gy], [xb - 4, gy], [xb, gy - 8], [xb, gy - 18], 10),
      bez([xb, gy - 18], [xb, gy - Hb * 0.75], [xb - 18, gy - Hb], [xb - 42, gy - Hb], 16).slice(0, 11)), 3.2);
    reperes(arr).forEach((q, i) => {
      if (i === 0) return;
      const nx = -q.ty, ny = q.tx;
      let dx = 1 + 0.7 * nx, dy = 0.45 + 0.7 * ny;
      const L = Math.hypot(dx, dy); dx /= L; dy /= L;
      frange += `M ${pt([q.p[0] - dx * 2.2, q.p[1] - dy * 2.2])} Q ${pt([q.p[0] + dx * 1.2, q.p[1] + dy * 1.2])} ${pt([q.p[0] + dx * 3.4 + 1.2, q.p[1] + dy * 3.4 + 0.5])} `;
    });
    out.push(h.path(flanc.trim(), h.a.fin));
    out.push(h.path(frange.trim(), h.a.detail));
    // Le bord du pan de dessus, qui court sur le haut du rouleau.
    const bord = [];
    for (let i = 0; i <= 24; i++) {
      const x = xa + 20 + (xb - 34 - (xa + 20)) * i / 24;
      bord.push([x, gy - Hb * 0.8 + 2 * Math.sin(i * 1.3) + 3 * i / 24]);
    }
    out.push(h.path(trace(bord), h.a.arete));
    // Deux tours de corde, et le brin de tirage qui part vers l'avant.
    const xt = xa + 30, xr = xb - 62;
    out.push(corde([[xr + 2, gy - Hb - 1.5], [xr + 1, gy - Hb * 0.5], [xr - 1, gy - 1]], 4));
    out.push(corde([[xt, gy - 1], [xt + 1, gy - Hb * 0.5], [xt + 3, gy - Hb + 3],
      ...bez([xt + 3, gy - Hb + 3], [xt - 4, gy - Hb - 6], [xa - 14, gy - Hb - 12], [xa - 30, gy - Hb - 18], 10).slice(1),
      [8, gy - Hb - 40]], 4));
    // Le geste : on tire vers l'avant, le poil couché vers l'arrière glisse.
    out.push(h.geste(`M ${f(xa - 36)} ${f(gy - 12)} L ${f(16)} ${f(gy - 12)}`));
    return out.join('\n');
  };
  const renvoisTraineau = z => {
    const { gy, xa, xb, Hb } = geoTraineau(z);
    const pc = [(xa - 30 + 8) / 2 + 2, gy - Hb - 29];
    return [
      { n: 1, rond: [xb - 26, 14], cible: [xb - 38, gy - 4] },
      { n: 2, rond: [xa * 0.5 + 34, 14], cible: pc },
    ].map((r, i) => ({ ...r, texte: ['poil en dehors, couché vers l’arrière', 'corde de tirage, nouée à l’avant'][i] }));
  };

  // ─── 2. En coupe ─────────────────────────────────────────────────────────────────────
  const geoCoupe = z => {
    const gy = z.h - 30, t = 7;
    const Hs = Math.min(gy - 44, z.l * 0.5), Wb = Math.min(z.l - 76, Hs * 1.5);
    const cx = z.l / 2, yT = gy - 4 - Hs, xL = cx - Wb / 2, xR = cx + Wb / 2;
    const yO = yT + t / 2, yU = yT + 1.5 * t, yB = gy - 3.5 - t / 2;
    const r = Hs * 0.34, r2 = Hs * 0.2;
    return { gy, t, Hs, Wb, cx, yT, xL, xR, yO, yU, yB, r, r2 };
  };
  const vueCoupe = z => {
    const g = geoCoupe(z), out = [];
    const { gy, t, Hs, Wb, cx, yT, xL, xR, yO, yU, yB, r, r2 } = g;
    out.push(h.rect(0, gy, z.l, z.h - gy - 2, neige));
    out.push(h.ligne(0, gy, z.l, gy, h.a.arete));
    // La pièce : bloc de muscle, l'os du bras coupé en travers.
    const mx0 = xL + t / 2 + 1.5, mx1 = xR - t / 2 - 1.5, my0 = yU + t / 2 + 1.5, my1 = yB - t / 2 - 1.5;
    const mcx = (mx0 + mx1) / 2, mcy = (my0 + my1) / 2, ma = (mx1 - mx0) / 2, mb = (my1 - my0) / 2;
    const viande = [];
    for (let i = 0; i < 96; i++) {
      const th = i / 96 * 2 * Math.PI, c = Math.cos(th), s = Math.sin(th);
      const k = 1 - 0.035 * (1 + Math.sin(5 * th + 0.7));
      viande.push([mcx + ma * k * Math.sign(c) * Math.pow(Math.abs(c), 0.55), mcy + mb * k * Math.sign(s) * Math.pow(Math.abs(s), 0.55)]);
    }
    const ox = mcx - ma * 0.22, oy = mcy + mb * 0.12, orx = Hs * 0.13, ory = Hs * 0.1;
    out.push(h.path(trace(bez([mx0 + 4, mcy - mb * 0.45], [mcx - ma * 0.5, mcy - mb * 0.2], [ox - orx * 1.6, oy - ory * 1.4], [ox - orx * 0.6, oy - ory * 0.9])), h.a.detail));
    out.push(h.path(trace(bez([ox + orx * 0.9, oy - ory * 0.6], [mcx + ma * 0.1, mcy - mb * 0.6], [mcx + ma * 0.35, my0 + 4], [mcx + ma * 0.3, my0 + 1])), h.a.detail));
    out.push(h.path(trace(bez([ox + orx * 0.8, oy + ory * 0.7], [mcx + ma * 0.3, mcy + mb * 0.2], [mcx + ma * 0.6, mcy + mb * 0.1], [mx1 - 2, mcy + mb * 0.3])), h.a.detail));
    out.push(h.path(trace(bez([ox - orx * 0.3, oy + ory], [ox - orx * 0.4, mcy + mb * 0.6], [mcx - ma * 0.5, my1 - 4], [mcx - ma * 0.55, my1 - 1])), h.a.detail));
    out.push(h.ellipse(ox, oy, orx, ory, blanc('arete')));
    out.push(h.ellipse(ox + 1, oy + 0.5, orx * 0.5, ory * 0.45, h.a.fin));
    // La peau : un seul morceau, pan de droite dessous, pan de gauche par-dessus.
    const axe = suite(
      [[cx - 24, yU], [xR - r, yU]],
      arc(xR - r, yU + r, r, -90, 0),
      [[xR, yU + r], [xR, yB - r2]],
      arc(xR - r2, yB - r2, r2, 0, 90),
      [[xR - r2, yB], [xL + r2, yB]],
      arc(xL + r2, yB - r2, r2, 90, 180),
      [[xL, yB - r2], [xL, yO + r]],
      arc(xL + r, yO + r, r, 180, 270),
      [[xL + r, yO], [cx + 26, yO]],
    );
    const pb = bande(axe, t, 'arete');
    out.push(pb.svg);
    // Le poil, sur toute la face de dehors, sauf sous le pan de dessus.
    let poil = '';
    const pts = reech(axe, 4.2), R = reperes(pts);
    R.forEach((q, i) => {
      if (i === 0 || i === R.length - 1) return;
      if (q.p[1] < yU + 1 && q.p[0] < cx + 29 && i < R.length / 2) return;
      const ox0 = q.p[0] - q.nx * (t / 2 + 0.6), oy0 = q.p[1] - q.ny * (t / 2 + 0.6);
      const lg = q.p[1] > yB - 1 ? 2.6 : 3.6;
      poil += `M ${pt([ox0, oy0])} L ${pt([ox0 - q.nx * lg + q.tx * 1.4, oy0 - q.ny * lg + q.ty * 1.4])} `;
    });
    out.push(h.path(poil.trim(), h.a.fin));
    return out.join('\n');
  };
  const renvoisCoupe = z => {
    const { cx, yT, t, xL, Wb, gy } = geoCoupe(z);
    return [
      { n: 3, rond: [z.l - 14, 16], cible: [cx + 26, yT + t / 2], texte: 'pièce côté chair, peau refermée par-dessus' },
    ];
  };

  // ─── 3. Porté, de profil ─────────────────────────────────────────────────────────────
  // Unités : la hauteur de l'homme vaut 100 ; u vers l'arrière (il regarde à gauche).
  // La charge : un quartier entier, épais comme le torse, de la traverse du haut au milieu du dos.
  const geoPorteur = z => {
    const s = Math.min((z.h - 22) / 100, (z.l - 46) / 37);
    const gy = z.h - 10, xc = z.l - 30 - 27.8 * s;
    return { s, gy, xc, P: (u, v) => [xc + u * s, gy - 100 * s + v * s] };
  };
  // Le contour de dehors du sac (du bas au col), pour poser les cordes jusqu'à son bord.
  const sacDehors = [[17.5, 37], [23.5, 36.8], [27.6, 33], [27.7, 26.5], [27.8, 19.8], [24.8, 14.4], [19.4, 12.6]];
  const bordSac = v => {
    const b = suite(bez(sacDehors[0], sacDehors[1], sacDehors[2], sacDehors[3], 24), bez(sacDehors[3], sacDehors[4], sacDehors[5], sacDehors[6], 24));
    let best = b[0];
    b.forEach(q => { if (q[0] > 20 && Math.abs(q[1] - v) < Math.abs(best[1] - v)) best = q; });
    return best[0];
  };
  const porteur = z => {
    const { s, gy, xc, P } = geoPorteur(z);
    const e = 100 * s / 1772;                                   // la tête à v = 0, les pieds à v = 100
    const o = { y: gy, pose: 'debout', vue: 'profil', cote: 'gauche', age: 'adulte', echelle: e };
    const c0 = h.formes.corps({ ...o, x: xc });
    const dx = P(6, 0)[0] - (c0.articulations.epauleP[0] + 100 * e);   // le dos (≈ 100 mm derrière l'épaule) à u = 6
    const x = xc + dx;
    // la bretelle, en mm depuis l'épaule : av vers l'avant, ht vers le haut
    const bretelle = g => {
      const S = g.articulations.epauleP, Q = (av, ht) => [S[0] - av * e, S[1] - ht * e];
      const pts = suite(bez(P(9.4, 11), Q(-40, 120), Q(-30, 90), Q(20, 74), 8), bez(Q(20, 74), Q(70, 60), Q(112, 10), Q(112, -60), 8).slice(1),
        bez(Q(112, -60), Q(112, -150), Q(70, -220), Q(10, -250), 8).slice(1), bez(Q(10, -250), Q(-60, -300), Q(-100, -420), P(9.2, 47.6), 10).slice(1));
      return { svg: bande(pts, 1.25 * s).svg, poitrine: Q(112, -40), reins: Q(-104, -480) };
    };
    const corps = h.formes.corps({ ...o, x, objetP: g => bretelle(g).svg });
    return { corps, bretelle: bretelle(corps) };
  };
  const vuePorteur = z => {
    const { s, gy, P } = geoPorteur(z), out = [];
    out.push(h.ligne(0, gy, z.l, gy, h.a.arete));
    // Le corps simple, debout, de profil, tourné vers la gauche (cote gauche) : le dos posé à 6 unités
    // derrière l'axe, juste devant le montant du cadre. La bretelle passe devant le tronc et sous le
    // bras proche (objetP) : du haut du cadre, par-dessus l'épaule, sous l'aisselle, au bas du cadre.
    const { corps, bretelle } = porteur(z);
    out.push(corps.toString());
    // Le cadre vu de côté : le montant, les deux traverses en bout.
    out.push(perche(P(7.6, 7), P(7.9, 51), 1.8 * s, 2.1 * s, ['coupe', 'coupe'], false));
    [[9.4, 11], [9.6, 48]].forEach(([u, v]) => {
      const c = P(u, v);
      out.push(h.cercle(c[0], c[1], 0.8 * s, blanc('contour')));
      out.push(h.cercle(c[0], c[1], 0.35 * s, h.a.fin));
    });
    // Le sac de coton, haut sur le cadre, la pièce dedans : de la traverse du haut au milieu du
    // dos, aussi épais que le torse ; le bas reste au-dessus des reins.
    const [d0, d1, d2, d3, d4, d5, d6] = sacDehors;
    out.push(ombre(chemin(P, [
      ['M', 15.6, 11.2], ['C', 15.8, 11.9, 15.2, 12.3, 14.2, 12.6], ['C', 11.4, 13.4, 10.3, 15.6, 10.3, 19], ['L', 10.3, 33],
      ['C', 10.4, 36, 13, 37.2, ...d0], ['C', ...d1, ...d2, ...d3], ['C', ...d4, ...d5, ...d6],
      ['C', 18.4, 12.3, 17.4, 11.9, 17.6, 11.2], 'Z']), 1.4 * s, 2 * s));
    out.push(h.path(chemin(P, [['M', 15.6, 11.2], ['L', 14.8, 9.6], ['L', 16.3, 10.2], ['L', 17.2, 9.4], ['L', 17.6, 11.2]]), blanc('arete')));
    out.push(h.path(chemin(P, [['M', 16, 13.4], ['C', 15.4, 16, 14.6, 18, 14.2, 20.5], ['M', 17.4, 13.4], ['C', 19.2, 16, 21.5, 17.6, 23.5, 18.6],
      ['M', 13, 34.6], ['C', 16, 33.5, 19.5, 33.5, 22, 34.3]]), h.a.detail));
    out.push(corde([P(15.4, 11.4), P(17.8, 11.6)], 0.8 * s, true));
    // Deux tours de corde : autour de la pièce et du cadre ; au bord du sac, la corde tourne.
    [[17.4, 18.2, 19.4], [29.4, 30, 30.4]].forEach(([va, vb, vc]) => {
      const ub = bordSac(vc) - 0.1, fin = P(ub, vc);
      out.push(corde([P(6.8, va), P(10.3, vb), P(18, vb + 0.6), fin], 0.85 * s, false));
      out.push(h.ligne(...P(6.8, va - 0.42), ...P(6.8, va + 0.42), h.a.arete));
      out.push(tourne(fin, [1, 0.05], 0.85 * s));
    });
    // le point à contrôler : la charge haute, contre les omoplates, les reins libres dessous
    out.push(h.controle(bretelle.reins[0], bretelle.reins[1], 2.6 * s));
    return out.join('\n');
  };
  const renvoisPorteur = z => {
    const { P } = geoPorteur(z);
    return [
      { n: 4, rond: [z.l - 12, P(0, 40)[1]], cible: P(21, 33), texte: 'pièce haute sur les omoplates, reins libres' },
      { n: 5, rond: [12, P(0, 22)[1]], cible: porteur(z).bretelle.poitrine, texte: 'bretelle, du haut du cadre au bas' },
    ];
  };

  // ─── 4. Le cadre, de dos ─────────────────────────────────────────────────────────────
  // Mêmes unités que le profil : v' = v − 8 (le haut du montant, un peu au-dessus de la traverse).
  const TH = 3, TB = 40, TX = 15.2;           // les traverses, et leur longueur de part et d'autre
  const geoCadre = z => {
    const s = Math.min((z.h - 36) / 45, (z.l / 2 - 8) / TX, (z.l / 2 - 29) / 12.2);
    const cx = z.l / 2, y0 = (z.h - 44 * s) / 2;
    return { s, cx, P: (u, v) => [cx + u * s, y0 + v * s] };
  };
  const wMont = v => 1.8 + 0.4 * (v + 1) / 45;
  // La corde d'amarrage, deux tours autour de la pièce et des deux montants : elle passe sur le
  // sac, sur le montant, tourne par le bord de dehors et file derrière lui. k : −1 à gauche.
  const amarrage = (P, v, k) => {
    const ub = 11 + wMont(v) / 2;
    return {
      devant: [...bez(P(0, v + 0.8), P(4 * k, v + 0.8), P(7.5 * k, v + 0.3), P(9.4 * k, v - 0.15), 8), P(10 * k, v - 0.2), P(ub * k, v - 0.3),
        P((ub + 0.45) * k, v - 0.12), P((ub + 0.62) * k, v + 0.35)],
      derriere: [P((ub + 0.62) * k, v + 0.35), P((ub + 0.45) * k, v + 0.82), P(ub * k, v + 1.0), P(10 * k, v + 1.05), P(8 * k, v + 1.1)],
    };
  };
  const vueCadre = z => {
    const { s, P } = geoCadre(z), out = [];
    // Les bretelles, du côté du dos : on n'en voit que le bas, sous le sac.
    [-1, 1].forEach(k => {
      out.push(bande(bez(P(8.4 * k, 27), P(8.2 * k, 32), P(7.2 * k, 36.5), P(6.6 * k, 40.2), 10), 1.25 * s).svg);
    });
    // La corde d'amarrage, du côté du dos : derrière les montants.
    [10, 21.5].forEach(v => [-1, 1].forEach(k => out.push(corde(amarrage(P, v, k).derriere, 0.85 * s, false))));
    // Les deux montants, gros bout en bas.
    [-1, 1].forEach(k => out.push(perche(P(11 * k, -1), P(11 * k, 44), wMont(-1) * s, wMont(44) * s)));
    // Les traverses, par-dessus, tirées des bouts minces.
    [TH, TB].forEach(v => out.push(perche(P(-TX, v), P(TX, v), 1.55 * s, 1.55 * s)));
    // Les coins : les tours en carré du gros plan, lisibles à cette échelle.
    [TH, TB].forEach((v, i) => [-1, 1].forEach(k => {
      const c = P(11 * k, v);
      out.push(brelage({ id: `dos-${i}-${k < 0 ? 'g' : 'd'}`, cx: c[0], cy: c[1], wV: wMont(v) * s, wH: 1.55 * s, e: 0.5 * s, n: 3, jour: 0.35 * s, trait: 'detail' }).svg);
    }));
    // Les bretelles nouées aux traverses, entre les coins.
    [-1, 1].forEach(k => {
      out.push(bande([P(6.6 * k, TB - 1.4), P(6.6 * k, TB + 1.4)], 1.25 * s).svg);
      out.push(bande([P(6.8 * k, TH - 1.4), P(6.8 * k, TH + 1.4)], 1.25 * s).svg);
    });
    // Le sac de coton, la pièce dedans, noué en haut ; il loge entre les montants.
    out.push(ombre(chemin(P, [
      ['M', -1.6, 4.9], ['C', -6.5, 5.5, -9.3, 7.8, -9.5, 12.5], ['L', -9.3, 21], ['C', -9.1, 26, -6, 28.4, 0, 28.4],
      ['C', 6, 28.4, 9.1, 26, 9.3, 21], ['L', 9.5, 12.5], ['C', 9.3, 7.8, 6.5, 5.5, 1.6, 4.9],
      ['C', 1.1, 4.6, 1, 4.3, 1.2, 3.9], ['L', -1.2, 3.9], ['C', -1, 4.3, -1.1, 4.6, -1.6, 4.9], 'Z']), 1.2 * s, 1.6 * s));
    out.push(h.path(chemin(P, [['M', -1.2, 3.9], ['L', -2.4, 1.7], ['L', -0.8, 2.5], ['L', 0.2, 1.2], ['L', 1, 2.4], ['L', 2.4, 1.6], ['L', 1.2, 3.9]]), blanc('arete')));
    out.push(corde([P(-1.6, 4.2), P(1.6, 4.2)], 0.75 * s));
    let plis = '';
    [[-1, 5.3, -4.5, 9.8], [-0.3, 5.5, -1.4, 10.8], [0.6, 5.5, 2, 10.3], [1.2, 5.3, 5, 9.1], [-7, 26.5, -3.8, 25], [5.5, 26.7, 2.5, 25.6]]
      .forEach(([a, b, c, d]) => { const p1 = P(a, b), p2 = P(c, d); plis += `M ${pt(p1)} L ${pt(p2)} `; });
    out.push(h.path(plis.trim(), h.a.detail));
    // La corde d'amarrage, du côté qu'on voit : sur le sac, sur chaque montant, et le tour.
    [10, 21.5].forEach(v => {
      const g = amarrage(P, v, -1).devant, d = amarrage(P, v, 1).devant;
      out.push(corde([...g.slice().reverse(), ...d.slice(1)], 0.85 * s, false));
    });
    return out.join('\n');
  };
  const renvoisCadre = z => {
    const { P } = geoCadre(z);
    return [
      { n: 6, rond: [12, P(0, 34)[1]], cible: P(-11, 34), texte: 'deux perches d’aulne, liées en cadre' },
      { n: 7, rond: [12, P(0, 15.5)[1]], cible: P(-6, 15.5), texte: 'sac de coton par-dessus la pièce' },
      { n: 8, rond: [z.l - 12, P(0, 21.5)[1] - 22], cible: P(12.4, 21.6), texte: 'corde d’amarrage, autour des deux montants' },
    ];
  };

  // ─── 5. Un coin : lier, puis serrer ──────────────────────────────────────────────────
  // En haut, le nœud de départ et les tours en carré ; en bas, le même coin serré et arrêté.
  const geoLig = z => {
    const wV = 32, wH = 27, e = 5.2, n = 4, p = e * 1.08;
    const cx = z.l - 102;
    const bas = wH / 2 + (n + 0.5) * p + 1.7 * p + 1.9 * e + 2.7 * e + 10;   // sous le centre
    const haut = wH / 2 + (n - 0.5) * p + 14;                               // au-dessus
    const libre = z.h - 2 * (haut + bas);
    const cyA = haut + libre * 0.3, cyB = z.h - bas - libre * 0.1;
    return { wV, wH, e, n, p, cx, cyA, cyB, haut, bas };
  };
  const coin = (z, cy, etape) => {
    const { wV, wH, e, n, cx, haut, bas } = geoLig(z), out = [];
    out.push(perche([cx, cy - haut], [cx, cy + bas], wV, wV * 1.03, ['rompu', 'rompu']));
    out.push(perche([6, cy], [z.l - 6, cy], wH, wH, ['rompu', 'rompu']));
    const b = etape === 'a'
      ? brelage({ id: 'a', cx, cy, wV, wH, e, n, depart: true, sortie: true })
      : brelage({ id: 'b', cx, cy, wV, wH, e, n, depart: true, serrage: 2, arret: true });
    out.push(b.svg);
    return { svg: out.join('\n'), g: b.g };
  };
  const vueLigature = z => {
    const { cyA, cyB } = geoLig(z);
    return [coin(z, cyA, 'a').svg, coin(z, cyB, 'b').svg].join('\n');
  };
  const renvoisLigature = z => {
    const { cyA, cyB } = geoLig(z);
    const a = coin(z, cyA, 'a').g, b = coin(z, cyB, 'b').g;
    return [
      { n: 9, rond: [z.l - 14, a.depart[1] + 4], cible: [a.depart[0] + 3, a.depart[1]], texte: 'départ : nœud de cabestan sur le montant' },
      { n: 10, rond: [14, a.yT - 16], cible: [a.brin[0], a.yT + 6], texte: 'tours en carré, par-dessus la traverse' },
      { n: 11, rond: [14, b.yT - 20], cible: [b.serrage[0] - 8, b.serrage[1]], texte: 'tours de serrage, entre les deux perches' },
      { n: 12, rond: [z.l - 14, b.yB + 24], cible: [b.arret[0], b.arret[1] + 5], texte: 'arrêt : nœud de cabestan sur la traverse' },
    ];
  };

  return {
    ref: '64-08',
    titre: 'Sortir le quartier avant du bois',
    desc: 'La peau de la bête sert de traîneau : la pièce roulée côté chair, la peau refermée par-dessus, le poil en dehors couché vers l’arrière, serré sur le dessous qui glisse, tirée par une corde nouée à l’avant. Pour le dos, deux perches d’aulne liées en cadre, la pièce en sac de coton amarrée haute contre les omoplates, aussi épaisse que le torse, les reins libres ; la corde d’amarrage passe sur le sac et tourne derrière chaque montant. Chaque coin du cadre est un brelage carré, en deux temps : un nœud de cabestan sur le montant sous la traverse, puis quatre tours qui passent devant la traverse de part et d’autre du montant et derrière le montant ; ensuite deux tours de serrage entre les perches, par-dessus les coudes, et un nœud de cabestan d’arrêt sur la traverse, le bout libre à part. L’encadré danger dit pourquoi jamais de plastique fermé.',
    format: 'pleine',
    disposition: [['traineau', 'coupe'], ['porteur', 'cadre', 'ligature']],
    hauteurs: [2, 3],
    largeurs: [[3, 2], [0.98, 1.1, 1.22]],
    vues: {
      traineau: { titre: 'Le traîneau, de côté', dessin: vueTraineau, renvois: renvoisTraineau },
      coupe: { titre: 'En coupe', dessin: vueCoupe, renvois: renvoisCoupe },
      porteur: { titre: 'Porté, de profil', dessin: vuePorteur, renvois: renvoisPorteur },
      cadre: { titre: 'Le cadre, de dos', dessin: vueCadre, renvois: renvoisCadre },
      ligature: { titre: 'Un coin : lier, puis serrer', dessin: vueLigature, renvois: renvoisLigature },
    },
    danger: 'Jamais de sac de plastique fermé : la surface qu’on vient d’exposer transpire, l’eau ne part pas, et la pièce baigne dans son jus pendant tout le temps où elle devrait refroidir.',
  };
};
