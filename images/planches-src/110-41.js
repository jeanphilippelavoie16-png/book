// Planche 110-41. Le brêlage droit (ch. 110, §9.5, points 21 et 22).
// Quatre temps, même cadrage, même échelle : le départ et le premier tour, les quatre tours, les
// frappes, l'arrêt ; puis l'entaille peu profonde sous le lien, de côté et de face.
// Le montant est derrière, la traverse devant ; la charge descend sur la traverse.
// Le trajet de la corde : le brêlage carré de 64-08 (même moteur, repris ici), et la source
// (FM 5-125, ch. 2, « Square lashing » ; Scouting Resources, « Square Lashing ») : un cabestan sur
// le montant sous la traverse, au moins quatre tours, deux ou trois frappes entre les perches, un
// cabestan d'arrêt sur la traverse. Aucune cote : le chapitre n'en donne pas.
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
    const id = `ombre-110-41-${++nOmbre}`;
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
    const id = `brelage-110-41-${o.id}`, M = 3000;
    const clipA = `<clipPath id="${id}-a"><path fill="none" clip-rule="evenodd" d="M 0 0 H ${M} V ${M} H 0 Z M ${f(eL - 1.2)} 0 V ${M} H ${f(eR + 1.2)} V 0 Z"/></clipPath>`;
    const clipB = `<clipPath id="${id}-b"><rect x="${f(eL - 1.2)}" y="0" width="${f(wV + 2.4)}" height="${M}"/></clipPath>`;
    const hors = F.cordes([...serrage, ...tours, ...dormant, ...arret], { trait });
    const sur = F.cordes([...serrage, ...dormant, ...devant], { trait });
    const svg = [clipA, clipB, `<g clip-path="url(#${id}-a)">`, `${hors}`, '</g>', `<g clip-path="url(#${id}-b)">`, `${sur}`, '</g>',
      ...bouts.map(([q, d]) => tourne(q, d, e, trait))].join('\n');
    return { svg, g };

  };

  // La sortie des frappes : après la dernière frappe du dessous, le bout remonte derrière la
  // traverse et ressort au-dessus, à gauche, vers l'arrêt.
  const sortieFrappe = (g, e, p) => h.formes.cordes([{ pts: [[g.gauche, g.yT - 1.2, 0.5], [g.gauche - 0.3 * p, g.yT - 2.6 * p, 0.5], [g.gauche - 1.6 * p, g.yT - 4.6 * p, 0.5], [g.gauche - 3.2 * p, g.yT - 6.4 * p, 0.5]],
    ep: e, debut: 'ouvert', fin: 'fixe', fleche: { de: 0.3, a: 0.95, cote: 'droite' } }], { trait: 'arete' });

  // ─── Les quatre temps : même cadrage, même échelle ─────────────────────────────────────
  const WV = 46, WH = 38, E = 7.6, N = 4, PAS = E * 1.08, GP = E;
  const geo = z => ({ cx: Math.round(z.l * 0.47), cy: Math.round(z.h * 0.4) });
  const temps = (z, etape) => {
    const { cx, cy } = geo(z), out = [];
    out.push(perche([cx, 4], [cx, z.h - 4], WV, WV * 1.04, ['rompu', 'rompu']));
    out.push(perche([10, cy], [z.l - 10, cy], WH, WH, ['rompu', 'rompu']));
    const o = { id: etape, cx, cy, wV: WV, wH: WH, e: E };
    let b;
    if (etape === 'depart') b = brelage({ ...o, n: 1, depart: true, sortie: true });
    else if (etape === 'tours') b = brelage({ ...o, n: N, depart: true, sortie: true });
    else if (etape === 'frappes') b = brelage({ ...o, n: N, depart: true, serrage: 2 });
    else b = brelage({ ...o, n: N, depart: true, serrage: 2, arret: true });
    out.push(b.svg);
    const g = b.g;
    // le geste : tirer le bout pour serrer, dans le sens où il part
    const tire = (a, c, side) => {
      const L = Math.hypot(c[0] - a[0], c[1] - a[1]), u = [(c[0] - a[0]) / L, (c[1] - a[1]) / L], n = [-u[1], u[0]];
      const k = side || 1, o0 = [a[0] + u[0] * L * 0.15 + n[0] * 15 * k, a[1] + u[1] * L * 0.15 + n[1] * 15 * k];
      return h.geste(`M${f(o0[0])} ${f(o0[1])} L${f(o0[0] + u[0] * L * 0.85)} ${f(o0[1] + u[1] * L * 0.85)}`);
    };
    if (etape === 'depart') out.push(h.controle(g.depart[0], g.depart[1], 2.6 * E));
    if (etape === 'tours') {
      const y0 = g.yB + (N + 0.5) * PAS;
      out.push(tire([g.eL - GP - 1.6 * PAS, y0 + 0.45 * PAS], [g.eL - GP - 5.8 * PAS, y0 + 2.3 * PAS]));
    }
    if (etape === 'frappes') {
      out.push(sortieFrappe(g, E, PAS));
      out.push(tire([g.gauche - 0.3 * PAS, g.yT - 2.6 * PAS], [g.gauche - 3.2 * PAS, g.yT - 6.4 * PAS], -1));
    }
    if (etape === 'arret') out.push(h.controle(g.arret[0], g.arret[1], 2.6 * E));
    return { svg: out.join('\n'), g };
  };

  // ─── L'entaille sous le lien : un plat peu profond sur chaque perche ─────────────────────
  // De face, le montant seul et son plat ; de côté, en coupe, les deux perches écartées, puis
  // serrées. Le plat est une corde du rond, à environ le huitième du diamètre de profondeur.
  const R_E = 27, D_E = R_E * 0.26;
  const hach = h.a.hachure('bois', 'aucun');
  const face = z => {
    const r = R_E, d = R_E * 0.26, cy = z.h * 0.5, x = z.l * 0.42, out = [];
    const w = Math.sqrt(r * r - (r - d) * (r - d)), hh = r * 1.15;
    out.push(perche([x, 6], [x, z.h - 6], 2 * r, 2 * r * 1.02, ['rompu', 'rompu'], false));
    const pl = `M ${pt([x - w, cy - hh])} C ${pt([x - w * 0.4, cy - hh - 7])} ${pt([x + w * 0.4, cy - hh - 7])} ${pt([x + w, cy - hh])} L ${pt([x + w, cy + hh])} ` +
      `C ${pt([x + w * 0.4, cy + hh + 7])} ${pt([x - w * 0.4, cy + hh + 7])} ${pt([x - w, cy + hh])} Z`;
    out.push(h.path(pl, h.a.arete));
    [-0.5, 0, 0.5].forEach(k => out.push(h.ligne(x - w + 3, cy + k * hh - 3, x + w - 3, cy + k * hh + 3, h.a.fin)));
    return out.join('\n');
  };
  // de côté, en coupe : le montant en long (bande hachurée), la traverse en bout (rond hachuré)
  const cote = (z, x, ecart) => {
    const r = R_E, d = D_E, cy = z.h * 0.5, o = [];
    const xm = x - r * 0.4, bord = xm + r;
    const hh = Math.sqrt(r * r - (r - d) * (r - d));
    const m = `M ${pt([xm - r, 6])} L ${pt([bord, 6])} L ${pt([bord, cy - hh - 5])} L ${pt([bord - d, cy - hh])} L ${pt([bord - d, cy + hh])} L ${pt([bord, cy + hh + 5])} L ${pt([bord, z.h - 6])} L ${pt([xm - r, z.h - 6])} Z`;
    o.push(h.path(m, hach));
    o.push(h.path(`M ${pt([bord, 6])} L ${pt([bord, cy - hh - 5])} L ${pt([bord - d, cy - hh])} L ${pt([bord - d, cy + hh])} L ${pt([bord, cy + hh + 5])} L ${pt([bord, z.h - 6])}`, h.a.contour));
    o.push(h.ligne(xm - r, 6, xm - r, z.h - 6, h.a.contour));
    const xt = bord - d + (r - d) + ecart, a0 = Math.acos((r - d) / r), arc = [];
    for (let i = 0; i <= 40; i++) { const t = Math.PI + a0 + (2 * Math.PI - 2 * a0) * i / 40; arc.push([xt + r * Math.cos(t), cy + r * Math.sin(t)]); }
    const rond = 'M ' + arc.map(pt).join(' L ') + ' Z';
    o.push(h.path(rond, blanc('contour')), h.path(rond, hach), h.path(rond, h.a.contour));
    return { svg: o.join('\n'), bord, xt, hh, cy, r, d };
  };
  const cotes = z => {
    const A = cote(z, z.l * 0.22, 22), B = cote(z, z.l * 0.7, 0), out = [A.svg, B.svg];
    // la traverse vient se poser : flèche du rond vers le plat du montant
    out.push(h.fleche(`M ${f(A.xt - A.r * 0.2)} ${f(A.cy - A.r - 6)} Q ${f(A.bord + 8)} ${f(A.cy - A.r - 16)} ${f(A.bord + 6)} ${f(A.cy - A.hh - 2)}`));
    out.push(h.controle(B.bord - B.d, B.cy, B.r * 0.55));
    return { svg: out.join('\n'), A, B };
  };

  return {
    ref: '110-41',
    titre: 'Le brêlage droit',
    desc: 'Le brêlage droit lie deux perches croisées à angle droit, le montant derrière, la traverse devant. Quatre temps au même cadrage : un nœud de cabestan sur le montant, sous la traverse, puis un premier tour qui passe devant la traverse de chaque côté du montant et derrière le montant au-dessus et au-dessous ; quatre tours, chacun posé à l’extérieur du précédent et serré en tirant le bout ; deux frappes qui passent entre les deux perches, par-dessus les tours, et serrent le paquet ; un nœud de cabestan d’arrêt sur la traverse. Dessous, l’entaille sous le lien : un plat peu profond taillé à la hache sur chaque perche, au point de contact, vu de face sur le montant, puis de côté, les perches écartées et serrées l’une sur l’autre.',
    format: 'pleine',
    disposition: [['depart', 'tours'], ['frappes', 'arret'], ['face', 'cotes']],
    largeurs: [[1, 1], [1, 1], [0.62, 1.38]],
    hauteurs: [1, 1, 0.72],
    vues: {
      depart: {
        titre: '1. Le départ et un premier tour', dessin: z => temps(z, 'depart').svg,
        renvois: z => {
          const { g } = temps(z, 'depart');
          return [
            { n: 1, rond: [z.l - 22, g.depart[1] + 18], cible: [g.depart[0] + 2.8 * E, g.depart[1] + 4], texte: 'cabestan sur le montant, sous la traverse' },
            { n: 2, rond: [z.l - 22, g.yT - 52], cible: [g.eR + GP + 0.5 * PAS + 3, g.yT - 4], texte: 'devant la traverse, derrière le montant' },
          ];
        },
      },
      tours: {
        titre: '2. Quatre tours, chacun serré', dessin: z => temps(z, 'tours').svg,
        renvois: z => {
          const { g } = temps(z, 'tours');
          return [{ n: 3, rond: [z.l - 22, g.yT - 52], cible: [g.eR + GP + 3.5 * PAS, g.yT - 6], texte: 'chaque tour à l’extérieur du précédent' }];
        },
      },
      frappes: {
        titre: '3. Deux frappes entre les perches', dessin: z => temps(z, 'frappes').svg,
        renvois: z => {
          const { g } = temps(z, 'frappes');
          return [{ n: 4, rond: [z.l - 22, g.serrage[1] - 30], cible: [g.serrage[0] + 30, g.serrage[1] - 3], texte: 'frappes en travers des tours, serrées' }];
        },
      },
      arret: {
        titre: '4. L’arrêt sur la traverse', dessin: z => temps(z, 'arret').svg,
        renvois: z => {
          const { g } = temps(z, 'arret');
          return [{ n: 5, rond: [z.l - 22, g.yT - 52], cible: [g.arret[0] + 4, g.yT - 2], texte: 'cabestan d’arrêt sur la traverse' }];
        },
      },
      face: {
        titre: 'L’entaille, de face', dessin: face,
        renvois: z => {
          const x = z.l * 0.42, cy = z.h * 0.5;
          return [{ n: 6, rond: [z.l - 16, cy + R_E + 22], cible: [x + 6, cy + R_E * 0.6], texte: 'plat peu profond, taillé à la hache' }];
        },
      },
      cotes: {
        titre: 'De côté : écartées, puis serrées', dessin: z => cotes(z).svg,
        renvois: z => {
          const { A, B } = cotes(z);
          return [
            { n: 7, rond: [A.xt + 48, A.cy - A.r - 6], cible: [A.xt - A.r + A.d + 3, A.cy + A.hh * 0.5], texte: 'un plat sur chaque perche' },
            { n: 8, rond: [B.xt + 52, B.cy + B.r + 14], cible: [B.bord - B.d + 6, B.cy + B.hh * 0.6], texte: 'elles portent à plat, sans glisser' },
          ];
        },
      },
    },
  };
};
