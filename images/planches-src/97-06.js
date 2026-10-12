// Planche 97-06 — La nuit du gel (chapitre 97, §5-E étape 35, §5-G étape 44, et « La nuit du gel :
// sauver la récolte en une heure ») :
//   « La toile de nuit se pose avant le coucher du soleil. Elle doit rester sèche. Elle ne doit pas
//   toucher les feuilles, qui gèlent là où la toile les touche : piquets, chaudières renversées,
//   branches entre les deux. » — « couverture sur arceaux ou sur piquets, un plastique par-dessus la
//   toile s'il pleut ou si la rosée est forte, bords lestés. »
//   « Des bouteilles de 2 L ou des bidons pleins, serrés en anneau autour d'un plant de tomate, le
//   tout coiffé d'un sac qui repose sur le haut des bouteilles, jamais sur le plant : l'eau gèle
//   avant la plante et chauffe en gelant. »
//   « Sur un petit plant de tomate ou un jeune rang de pommes de terre, quelques pelletées de terre
//   sèche jetées dessus pour une nuit le protègent ; dégagée à la main au matin. Ça ne
//   marche que pour une nuit courte, et seulement sur ce qui plie sans casser. »
// Rangée 1 : bon et raté, cadrés pareil, en coupe à travers le rang. Rangée 2 : l'anneau de
// bouteilles vu d'un peu haut, puis en coupe avec le sac posé. Rangée 3 : la pelletée, puis le
// plant plié sous la terre pour la nuit.
// Le chapitre ne donne aucune mesure de ces montages (seulement « bouteilles de 2 L ») : rien n'est
// coté. Les tailles du plant, des piquets, de la bouteille et de la pelle ne servent qu'au dessin.
module.exports = (h) => {
  const r1 = v => Math.round(v * 10) / 10;
  const blanc = (t = h.a.arete) => t.replace('fill="none"', 'fill="#fff"');
  const noir = t => t.replace('fill="none"', 'fill="#1A1A1A"');
  const RAD = Math.PI / 180;

  // courbe lisse (Catmull-Rom) par des points d'écran
  const lisse = (pts, ferme = false) => {
    const n = pts.length, get = i => (ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    let d = `M ${r1(pts[0][0])} ${r1(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  const cub = (a, b, c, d, n = 8) => {
    const out = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, m = 1 - t;
      out.push([m * m * m * a[0] + 3 * m * m * t * b[0] + 3 * m * t * t * c[0] + t * t * t * d[0],
        m * m * m * a[1] + 3 * m * m * t * b[1] + 3 * m * t * t * c[1] + t * t * t * d[1]]);
    }
    return out;
  };
  // repère d'une coupe : y vers le haut (mm), centré dans la zone
  const repere = (z, xmin, xmax, ymin, ymax, mx = 6, my = 6) => {
    const s = Math.min((z.l - 2 * mx) / (xmax - xmin), (z.h - 2 * my) / (ymax - ymin));
    const ox = z.l / 2 - (xmin + xmax) / 2 * s, oy = z.h / 2 + (ymin + ymax) / 2 * s;
    const P = (x, y) => [r1(ox + x * s), r1(oy - y * s)];
    return { s, P, Pl: pts => pts.map(p => P(...p)) };
  };
  // hasard fixe
  const hasard = graine => () => { graine = (graine * 16807) % 2147483647; return (graine - 1) / 2147483646; };

  // ── Le plant de tomate, en mm, base en (x0, 0), y vers le haut ─────────────────────────────
  // Une tige, des feuilles composées alternes (pétiole, deux paires de folioles, une terminale),
  // des grappes de fruits. plie : de combien de degrés la tête se couche (vers la droite).
  const foliole = (B, ang, L, W) => {
    const u = [Math.cos(ang * RAD), Math.sin(ang * RAD)], n = [-u[1], u[0]];
    const at = (a, b) => [B[0] + a * u[0] + b * n[0], B[1] + a * u[1] + b * n[1]];
    const T = at(L, 0);
    const poly = [...cub(B, at(0.18 * L, 1.15 * W), at(0.72 * L, 0.95 * W), T), ...cub(T, at(0.72 * L, -0.95 * W), at(0.18 * L, -1.15 * W), B).slice(1)];
    return { poly, nerv: [at(0.08 * L, 0), at(0.78 * L, 0)] };
  };
  const tomate = (x0, H, { fruits = true, noeuds = 6, plie = 0, graine = 3 } = {}) => {
    const r = hasard(graine);
    const courbe = (x, y) => {
      if (!plie) return [x, y];
      const a = -plie * RAD * Math.min(1, Math.max(0, y) / H) ** 1.3;
      const dx = x - x0;
      return [x0 + dx * Math.cos(a) - y * Math.sin(a), dx * Math.sin(a) + y * Math.cos(a)];
    };
    const tige = [];
    for (let i = 0; i <= 10; i++) { const t = i / 10; tige.push([x0 + 0.03 * H * Math.sin(t * 5.5), t * H]); }
    const tigeX = y => x0 + 0.03 * H * Math.sin(y / H * 5.5);
    const feuilles = [], grappes = [];
    for (let k = 0; k < noeuds; k++) {
      const t = 0.2 + 0.72 * k / Math.max(1, noeuds - 1);
      const y = t * H, x = tigeX(y), cote = k % 2 ? 1 : -1;
      const Lp = H * (0.56 - 0.26 * t) * (0.92 + 0.16 * r());
      const a0 = 12 + 40 * t;
      // pétiole : part en montant, retombe au bout
      const N = [x, y];
      const C = [x + cote * Lp * 0.55 * Math.cos(a0 * RAD), y + Lp * 0.55 * Math.sin(a0 * RAD) + Lp * 0.12];
      const E = [x + cote * Lp * Math.cos((a0 - 18) * RAD), y + Lp * Math.sin((a0 - 18) * RAD) - Lp * 0.08];
      const pet = [];
      for (let i = 0; i <= 8; i++) { const s = i / 8, m = 1 - s; pet.push([m * m * N[0] + 2 * m * s * C[0] + s * s * E[0], m * m * N[1] + 2 * m * s * C[1] + s * s * E[1]]); }
      const dirAt = s => { const m = 1 - s; return Math.atan2(2 * m * (C[1] - N[1]) + 2 * s * (E[1] - C[1]), 2 * m * (C[0] - N[0]) + 2 * s * (E[0] - C[0])) / RAD; };
      const fols = [];
      for (const [s, taille] of [[0.42, 0.72], [0.72, 0.85]]) {
        const i = Math.round(s * 8), B = pet[i], d = dirAt(s);
        fols.push(foliole(B, d + 58, Lp * 0.36 * taille, Lp * 0.13 * taille));
        fols.push(foliole(B, d - 58, Lp * 0.36 * taille, Lp * 0.13 * taille));
      }
      fols.push(foliole(E, dirAt(1), Lp * 0.4, Lp * 0.15));
      feuilles.push({ pet, fols });
      if (fruits && (k === 1 || k === 3)) {
        // la grappe sort de la tige du côté opposé à la feuille, et pend
        const gy = y + H * 0.05, gx = tigeX(gy), c = -cote, rf = H * 0.068;
        const tiges = [[gx, gy], [gx + c * rf * 1.2, gy + rf * 0.4], [gx + c * rf * 2.0, gy - rf * 0.2]];
        const fr = [[gx + c * rf * 1.35, gy - rf * 1.35, rf], [gx + c * rf * 2.95, gy - rf * 1.05, rf * 0.92], [gx + c * rf * 2.1, gy - rf * 2.8, rf * 0.85]];
        grappes.push({ tiges, fr });
      }
    }
    // la tête : deux petites feuilles
    const top = [tigeX(H), H];
    const tete = [foliole(top, 65, H * 0.12, H * 0.045), foliole(top, 115, H * 0.12, H * 0.045), foliole([top[0], top[1] - H * 0.02], 90, H * 0.1, H * 0.04)];
    const map = pts => pts.map(p => courbe(...p));
    return {
      tige: map(tige),
      feuilles: feuilles.map(f => ({ pet: map(f.pet), fols: f.fols.map(o => ({ poly: map(o.poly), nerv: map(o.nerv) })) })),
      tete: tete.map(o => ({ poly: map(o.poly), nerv: map(o.nerv) })),
      grappes: grappes.map(g => ({ tiges: map(g.tiges), fr: g.fr.map(([x, y, rr]) => [...courbe(x, y), rr]) })),
    };
  };
  const pointsDe = pl => [
    ...pl.feuilles.flatMap(f => f.fols.flatMap(o => o.poly)),
    ...pl.tete.flatMap(o => o.poly),
    ...pl.grappes.flatMap(g => g.fr.map(([x, y, rr]) => [x, y + rr])),
  ];
  // dessine le plant ; gele(poly) : true si la foliole a gelé (peinte en noir)
  const dessinerPlant = (pl, P, s, gele = () => false, gros = false) => {
    const out = [];
    const tr = ep => `fill="none" stroke="#1A1A1A" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;
    out.push(h.path(lisse(pl.tige.map(p => P(...p))), gros ? h.a.contour : h.a.arete));
    const fol = o => {
      const g = gele(o.poly);
      const pts = o.poly.map(p => P(...p));
      const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ') + ' Z';
      const r = [h.path(d, g ? noir(h.a.detail) : blanc(h.a.detail))];
      if (!g) r.push(h.chemin(o.nerv.map(p => P(...p)), h.a.fin));
      return r.join('\n');
    };
    for (const f of pl.feuilles) {
      out.push(h.path(lisse(f.pet.map(p => P(...p))), h.a.detail));
      for (const o of f.fols) out.push(fol(o));
    }
    for (const o of pl.tete) out.push(fol(o));
    for (const g of pl.grappes) {
      const [a, b, c] = g.tiges.map(p => P(...p));
      out.push(h.path(`M ${a.join(' ')} Q ${b.join(' ')} ${c.join(' ')}`, h.a.detail));
      for (const [x, y, rr] of g.fr) {
        const [cx, cy] = P(x, y), R = rr * s;
        out.push(h.path(`M ${c.join(' ')} L ${r1(cx)} ${r1(cy - R)}`, h.a.detail));
        out.push(h.cercle(cx, cy, R, blanc(h.a.arete)));
        // le calice : une petite étoile sur le dessus
        let d = '';
        for (let k = 0; k < 5; k++) {
          const an = (-90 + 72 * k) * RAD;
          d += `M ${r1(cx)} ${r1(cy - R * 0.82)} L ${r1(cx + Math.cos(an) * R * 0.45)} ${r1(cy - R * 0.82 + Math.sin(an) * R * 0.3)} `;
        }
        out.push(h.path(d.trim(), h.a.fin));
      }
    }
    return out.join('\n');
  };

  // enveloppe supérieure convexe (y vers le haut)
  const coqueHaute = pts => {
    const p = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const up = [];
    for (const q of p) {
      while (up.length >= 2) {
        const [a, b] = [up[up.length - 2], up[up.length - 1]];
        if ((b[0] - a[0]) * (q[1] - a[1]) - (b[1] - a[1]) * (q[0] - a[0]) >= 0) up.pop(); else break;
      }
      up.push(q);
    }
    return up;
  };
  const yCoque = (coque, x) => {
    for (let i = 0; i < coque.length - 1; i++) {
      const [a, b] = [coque[i], coque[i + 1]];
      if (x >= a[0] && x <= b[0]) return a[1] + (b[1] - a[1]) * (x - a[0]) / ((b[0] - a[0]) || 1);
    }
    return -Infinity;
  };

  // une pierre : un galet un peu irrégulier posé au sol
  const pierre = (P, cx, l, ht, graine) => {
    const r = hasard(graine), pts = [];
    for (let i = 0; i < 10; i++) {
      const a = Math.PI * i / 9;               // de 0 (droite) à π (gauche), le dessus
      const k = 0.9 + 0.18 * r();
      pts.push(P(cx + Math.cos(a) * l / 2 * k, Math.sin(a) * ht * k));
    }
    const out = [h.path(lisse(pts) + ' Z', blanc(h.a.arete))];
    out.push(h.path(lisse([P(cx - l * 0.18, ht * 0.62), P(cx + l * 0.05, ht * 0.8), P(cx + l * 0.24, ht * 0.55)]), h.a.fin));
    return out.join('\n');
  };
  // le sol en coupe
  const sol = (P, x1, x2, fond) => [
    h.chemin([P(x1, 0), P(x2, 0), P(x2, fond), P(x1, fond)], h.a.hachure('terre', 'aucun'), true),
    h.ligne(...P(x1, 0), ...P(x2, 0), h.a.contour),
  ].join('\n');

  // ── Rangée 1 : le rang en coupe, bon et raté cadrés pareil ──────────────────────────────────
  const XR = 540, FOND = -95, HP = 640, XP = 335, H1 = 520;
  const plant1 = tomate(0, H1, { graine: 11, noeuds: 7 });
  const pts1 = pointsDe(plant1);
  const cadre1 = z => repere(z, -XR, XR, FOND, HP + 40, 4, 4);

  // une toile qui retombe d'un point haut (xh, yh) jusqu'au sol en xs, puis couchée jusqu'à xb
  const pan = (xh, yh, xs, xb) => {
    const dx = xs - xh;
    return [...cub([xh, yh], [xh + dx * 0.12, yh - (yh) * 0.35], [xs - dx * 0.25, yh * 0.12], [xs, 0], 10), [xb, 0]];
  };

  const vueBon = z => {
    const { P, s } = cadre1(z);
    const out = [];
    const SAG = 45;
    // les piquets : la pointe en terre en tireté
    for (const x of [-XP, XP]) {
      const w = 13;
      out.push(h.chemin([P(x - w, 0), P(x - w, HP), P(x + w, HP), P(x + w, 0)], blanc(h.a.arete)));
      out.push(h.chemin([P(x - w, 0), P(x - w, -45), P(x, -75), P(x + w, -45), P(x + w, 0)], h.a.cache));
      out.push(h.ligne(...P(x - 3, 40), ...P(x - 3, HP - 60), h.a.fin));
    }
    out.push(dessinerPlant(plant1, P, s, undefined, true));
    // la toile : des deux piquets au sol, et d'un piquet à l'autre en creusant un peu
    const gauche = pan(-XP, HP + 6, -XR + 115, -XR + 45).reverse();
    const dessus = [];
    for (let i = 0; i <= 12; i++) { const t = i / 12, x = -XP + 2 * XP * t; dessus.push([x, HP + 6 - SAG * Math.sin(Math.PI * t)]); }
    const droite = pan(XP, HP + 6, XR - 115, XR - 45);
    const toile = [...gauche, ...dessus.slice(1, -1), ...droite];
    // le plastique, par-dessus, un peu plus large
    const E = 16;
    const gp = pan(-XP - 4, HP + 6 + E, -XR + 95, -XR + 18).reverse();
    const dp = [];
    for (let i = 0; i <= 12; i++) { const t = i / 12, x = -XP - 4 + 2 * (XP + 4) * t; dp.push([x, HP + 6 + E - (SAG - 6) * Math.sin(Math.PI * t)]); }
    const drp = pan(XP + 4, HP + 6 + E, XR - 95, XR - 18);
    const plast = [...gp, ...dp.slice(1, -1), ...drp];
    out.push(sol(P, -XR, XR, FOND));
    out.push(h.path(lisse(toile.map(p => P(...p))), h.a.contour));
    out.push(h.path(lisse(plast.map(p => P(...p))), h.a.detail));
    // les pierres sur les bords
    out.push(pierre(P, -XR + 62, 92, 58, 5), pierre(P, XR - 62, 92, 58, 9));
    return { svg: out.join('\n'), P, s, toile, plast };
  };

  const vueRate = z => {
    const { P, s } = cadre1(z);
    const out = [];
    // la toile posée à même le plant : elle suit le dessus des feuilles et retombe au sol
    const xg = -XR + 115, xd = XR - 115;
    const coque = coqueHaute([...pts1, [xg, 0], [xd, 0]]);
    const EPS = 4;
    const gele = poly => poly.some(p => yCoque(coque, p[0]) - p[1] < 14);
    out.push(dessinerPlant(plant1, P, s, gele, true));
    const toile = [[-XR + 45, 0], ...coque.map(([x, y]) => [x, y + EPS]), [XR - 45, 0]];
    toile[1][1] = 0; toile[toile.length - 2][1] = 0;
    out.push(sol(P, -XR, XR, FOND));
    out.push(h.chemin(toile.map(p => P(...p)), h.a.contour));
    out.push(pierre(P, -XR + 62, 92, 58, 5), pierre(P, XR - 62, 92, 58, 9));
    return { svg: out.join('\n'), P, s, coque, gele };
  };

  // ── Rangée 2 : l'anneau de bouteilles ─────────────────────────────────────────────────────
  // La bouteille (mm, dessin seulement) : corps, épaule, col, bague, bouchon.
  const RB = 52, ZC = 212, ZE = 256, ZN = 284, ZB = 302, RN = 14, RBO = 16;
  const ZS_ = [0, 30, 60, 120, 180, ZC, ...[1, 2, 3, 4, 5, 6, 7].map(i => ZC + (ZE - ZC) * i / 8), ZE, 270, ZN - 0.1];
  const rayonA = Zz => {
    if (Zz <= ZC) return RB;
    if (Zz <= ZE) { const t = (Zz - ZC) / (ZE - ZC); return RN + (RB - RN) * (0.5 + 0.5 * Math.cos(Math.PI * t)); }
    if (Zz <= ZN) return RN;
    return RBO;
  };
  const NB = 8, RA = RB / Math.sin(Math.PI / NB) + 1;   // les bouteilles se touchent
  const H2 = 235;                                       // le plant, plus bas que les bouchons

  const vueAnneau = z => {
    const PHI = 50 * RAD, sp = Math.sin(PHI), cp = Math.cos(PHI);
    const pr = (X, Y, Zz) => [X, -Zz * cp + Y * sp];
    // cadrage
    const ext = [pr(-RA - RB - 30, 0, 0), pr(RA + RB + 30, 0, 0), pr(0, RA + RB + 40, -10), pr(0, -RA - RB, ZB + 10)];
    const xs = ext.map(p => p[0]), ys = ext.map(p => p[1]);
    const s = Math.min((z.l - 12) / (Math.max(...xs) - Math.min(...xs)), (z.h - 10) / (Math.max(...ys) - Math.min(...ys)));
    const ox = z.l / 2 - (Math.max(...xs) + Math.min(...xs)) / 2 * s, oy = z.h / 2 - (Math.max(...ys) + Math.min(...ys)) / 2 * s;
    const Q = (X, Y, Zz) => { const [a, b] = pr(X, Y, Zz); return [r1(ox + a * s), r1(oy + b * s)]; };
    const out = [];
    // le sol autour de l'anneau
    const [ex, ey] = Q(0, 0, 0);
    out.push(h.ellipse(ex, ey, (RA + RB + 70) * s, (RA + RB + 70) * s * sp, h.a.hachure('terre', 'aucun') + ' opacity="0.4"'));
    const bouteille = (cx, cy) => {
      const Zs = [...ZS_, ZN, ZB];
      const g = Zs.map(Zz => Q(cx - rayonA(Zz), cy, Zz)), d = Zs.map(Zz => Q(cx + rayonA(Zz), cy, Zz)).reverse();
      const ell = (Zz, rr0, a1, a2, n = 16) => {
        const p = [];
        for (let i = 0; i <= n; i++) { const a = (a1 + (a2 - a1) * i / n) * RAD; p.push(Q(cx + rr0 * Math.cos(a), cy + rr0 * Math.sin(a), Zz)); }
        return p;
      };
      const haut = ell(ZB, RBO, 180, 360);          // l'arrière du bouchon (en haut à l'écran)
      const bas = ell(0, RB, 0, 180);               // le devant du fond
      const o = [];
      const contour = [...g, ...haut.slice(1, -1), ...d, ...bas.slice(1, -1)];
      o.push(h.chemin(contour, blanc(h.a.arete), true));
      o.push(h.chemin(ell(ZB, RBO, 0, 180), h.a.detail));                // le dessus du bouchon
      o.push(h.chemin(ell(ZN, RBO, 0, 180), h.a.detail));                // le bas du bouchon
      o.push(h.chemin(ell(272, RN + 3, 0, 180), h.a.fin));               // la bague du col
      o.push(h.chemin(ell(ZC, RB, 10, 170), h.a.fin));                   // le départ de l'épaule
      o.push(h.chemin(ell(28, RB, 10, 170), h.a.fin));                   // le pied
      return o.join('\n');
    };
    const pos = [];
    for (let k = 0; k < NB; k++) { const a = (180 / NB + 360 * k / NB) * RAD; pos.push([RA * Math.cos(a), RA * Math.sin(a)]); }
    pos.sort((a, b) => a[1] - b[1]);
    const plant = tomate(0, H2, { fruits: false, noeuds: 5, graine: 7 });
    const Pp = (x, y) => Q(x, 0, y);
    let plantMis = false;
    for (const [cx, cy] of pos) {
      if (!plantMis && cy >= 0) { out.push(dessinerPlant(plant, Pp, s * cp)); plantMis = true; }
      out.push(bouteille(cx, cy));
    }
    return { svg: out.join('\n'), Q, s };
  };

  const vueCoupe = z => {
    const X2 = RA + RB + 70;
    const { P, s } = repere(z, -X2, X2, -70, ZB + 55, 4, 4);
    const out = [];
    // derrière : la moitié de l'anneau au-delà du plan de coupe, vue en élévation
    const profil = (cx, sens = 1) => {
      const Zs = [...ZS_, ZN, ZB];
      const g = Zs.map(Zz => P(cx - rayonA(Zz), Zz)), d = Zs.map(Zz => P(cx + rayonA(Zz), Zz)).reverse();
      return [...g, ...d];
    };
    for (const a of [45, 90, 135]) {
      const cx = RA * Math.cos(a * RAD);
      out.push(h.chemin(profil(cx), blanc(h.a.detail), true));
      out.push(h.ligne(...P(cx - RBO, ZN), ...P(cx + RBO, ZN), h.a.fin));
    }
    const plant = tomate(0, H2, { fruits: false, noeuds: 5, graine: 7 });
    out.push(dessinerPlant(plant, P, s));
    // les deux bouteilles coupées : l'eau jusque dans le col, un peu d'air sous le bouchon
    const NIV = 276;
    for (const cx of [-RA, RA]) {
      const Zs = [...ZS_, ZN];
      const g = Zs.map(Zz => [cx - rayonA(Zz), Zz]), d = Zs.map(Zz => [cx + rayonA(Zz), Zz]).reverse();
      out.push(h.chemin([...g, ...d].map(p => P(...p)), blanc(h.a.arete), true));
      const eau = [...g.filter(p => p[1] <= NIV), [cx - RN, NIV], [cx + RN, NIV], ...d.filter(p => p[1] <= NIV)];
      out.push(h.chemin(eau.map(p => P(...p)), h.a.hachure('eau', 'aucun'), true));
      out.push(h.ligne(...P(cx - RN, NIV), ...P(cx + RN, NIV), h.a.detail));
      out.push(h.chemin([...g, ...d].map(p => P(...p)), h.a.arete, true));
      // le bouchon, en coupe
      out.push(h.chemin([P(cx - RBO, ZN - 14), P(cx - RBO, ZB), P(cx + RBO, ZB), P(cx + RBO, ZN - 14)], h.a.arete));
      out.push(h.rect(...P(cx - RBO, ZB), 2 * RBO * s, 3.2 * s + 1, h.a.plein));
    }
    out.push(sol(P, -X2, X2, -70));
    // le sac : posé sur les bouchons, un peu creux entre les deux, retombé sur les côtés
    const XB = RA + RBO + 3, ZS = ZB + 4, SAG = 16;
    const cote = sg => [[sg * (RA + RB + 12), 120], [sg * (RA + RB + 9), 175], [sg * (RA + RB + 4), ZC + 6], [sg * (RA + 30), ZE + 6], [sg * XB, ZS - 4], [sg * (RA + 2), ZS]];
    const dessus = [];
    for (let i = 1; i < 12; i++) { const t = i / 12, x = -RA + 2 * RA * t; dessus.push([x, ZS - SAG * Math.sin(Math.PI * t)]); }
    const sac = [...cote(-1), ...dessus, ...cote(1).reverse()];
    out.push(h.path(lisse(sac.map(p => P(...p))), h.a.contour));
    return { svg: out.join('\n'), P, s, NIV };
  };

  // ── Rangée 3 : la terre sèche ────────────────────────────────────────────────────────────
  const H3 = 190;
  const vuePelle = z => {
    const { P, s } = repere(z, -300, 1000, -60, 400, 4, 4);
    const out = [];
    const plant = tomate(-150, H3, { fruits: false, noeuds: 4, graine: 5 });
    out.push(dessinerPlant(plant, P, s));
    out.push(sol(P, -300, 1000, -60));
    // un peu de terre déjà tombée au pied
    out.push(h.path(lisse([P(-260, 0), P(-220, 14), P(-180, 26), P(-140, 30), P(-100, 20), P(-60, 6), P(-35, 0)]) + ' Z', h.a.hachure('terre', 'arete')));
    // la pelle : la lame vue de trois quarts, pointe vers le plant, pleine de terre
    const ANG = 15;                                     // l'axe descend vers la pointe, à gauche
    const T0 = [20, 150];                               // la pointe
    const u = [Math.cos(ANG * RAD), Math.sin(ANG * RAD)], n = [-u[1], u[0]];
    const A = (a, b) => [T0[0] + a * u[0] + b * n[0] * 0.55, T0[1] + a * u[1] + b * n[1] * 0.55];
    const LB = 290, WB = 115;
    const larg = a => a < 120 ? WB * Math.pow(Math.sin(Math.PI / 2 * a / 120), 0.8) : a < 250 ? WB : WB - (WB - 20) * (a - 250) / (LB - 250);
    const bordH = [], bordB = [];
    for (let a = 0; a <= LB; a += 10) { bordH.push(A(a, larg(a))); bordB.push(A(a, -larg(a))); }
    out.push(h.path(lisse([...bordH.reverse(), ...bordB.slice(1)].map(p => P(...p))) + ' Z', blanc(h.a.contour)));
    // le tas de terre sur la lame
    const tas = [A(40, 0), A(55, 48), A(90, 70), A(130, 78), A(175, 74), A(215, 64), A(238, 40), A(240, 0), A(200, -40), A(140, -52), A(80, -44)];
    const bosse = tas.map((p, i) => (i >= 1 && i <= 6) ? [p[0] - n[0] * 0 + 0, p[1] + [0, 22, 34, 30, 36, 20, 0][i]] : p);
    out.push(h.path(lisse(bosse.map(p => P(...p)), true), h.a.hachure('terre', 'arete')));
    // la douille et le manche, jusqu'au bord de la vue
    const D1 = A(LB, 0), D2 = A(LB + 90, 0);
    const nd = [n[0] * 16, n[1] * 16];
    out.push(h.chemin([P(D1[0] + nd[0], D1[1] + nd[1]), P(D2[0] + nd[0] * 0.8, D2[1] + nd[1] * 0.8), P(D2[0] - nd[0] * 0.8, D2[1] - nd[1] * 0.8), P(D1[0] - nd[0], D1[1] - nd[1])], blanc(h.a.arete), true));
    let Lm = 1200;
    while (Lm > 100) { const e = P(...A(LB + Lm, 0)); if (e[0] < z.l - 10 && e[1] > 10) break; Lm -= 10; }
    const M2 = A(LB + Lm, 0), nm = [n[0] * 15, n[1] * 15];
    out.push(h.chemin([P(D2[0] + nm[0], D2[1] + nm[1]), P(M2[0] + nm[0], M2[1] + nm[1]), P(M2[0] - nm[0], M2[1] - nm[1]), P(D2[0] - nm[0], D2[1] - nm[1])], blanc(h.a.arete), true));
    // la terre qui part de la pointe et tombe sur le plant
    const rr = hasard(33);
    const vol = [[-5, 172], [-35, 208], [-65, 230], [-95, 238], [-122, 230], [-142, 214], [-158, 196]];
    vol.forEach(([x, y], i) => {
      for (let k = 0; k < 2; k++) {
        const cx = x + (rr() - 0.5) * 40, cy = y + (rr() - 0.5) * 30, rt = 6 + 7 * rr();
        const pts = [];
        for (let j = 0; j < 6; j++) { const a = 2 * Math.PI * j / 6 + rr(); const k2 = 0.7 + 0.5 * rr(); pts.push(P(cx + Math.cos(a) * rt * k2, cy + Math.sin(a) * rt * k2)); }
        out.push(h.chemin(pts, h.a.hachure('terre', 'arete'), true));
      }
    });
    // le geste
    out.push(h.fleche(`M ${P(70, 300).join(' ')} Q ${P(-40, 370).join(' ')} ${P(-135, 280).join(' ')}`, h.a.arete));
    return { svg: out.join('\n'), P, s, A };
  };

  const vueButte = z => {
    const { P, s } = repere(z, -300, 300, -60, 250, 4, 4);
    const out = [];
    // la butte : terre sèche jetée, le sol d'avant en tireté dessous
    const butte = [[-270, 0], [-232, 46], [-175, 112], [-100, 164], [-10, 186], [80, 178], [160, 138], [222, 72], [270, 0]];
    // le plant couché sous la butte : on le plie autant qu'il faut pour qu'il y tienne en entier
    const yB = x => { for (let i = 0; i < butte.length - 1; i++) { const [a, b] = [butte[i], butte[i + 1]]; if (x >= a[0] && x <= b[0]) return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]); } return 0; };
    let plant, ok = null;
    for (let pl = 40; pl <= 80; pl += 2) {
      plant = tomate(-45, H3, { fruits: false, noeuds: 4, graine: 5, plie: pl });
      if ([...pointsDe(plant), ...plant.tige.slice(3)].every(([x, y]) => y > -1 && y < yB(x) - 10)) { ok = pl; break; }
    }
    if (ok === null) console.error('97-06 : le plant ne tient pas sous la butte');
    out.push(h.path(lisse(butte.map(p => P(...p))) + ' Z', h.a.hachure('terre', 'aucun')));
    out.push(dessinerPlant(plant, P, s));
    out.push(h.path(lisse(butte.map(p => P(...p))), h.a.contour));
    out.push(sol(P, -300, 300, -60));
    out.push(h.ligne(...P(-268, 0), ...P(268, 0), `stroke="#fff" stroke-width="3.2" fill="none"`));
    out.push(h.ligne(...P(-268, 0), ...P(268, 0), h.a.cache));
    out.push(h.ligne(...P(-300, 0), ...P(-270, 0), h.a.contour), h.ligne(...P(270, 0), ...P(300, 0), h.a.contour));
    return { svg: out.join('\n'), P, s, coude: plant.tige[4] };
  };

  const pres = (pts, sg, y) => pts.filter(p => p[0] * sg > 0).reduce((a, p) => Math.abs(p[1] - y) < Math.abs(a[1] - y) ? p : a);
  const cache = {};
  const une = (id, f) => z => (cache[id + z.l + 'x' + z.h] ||= f(z));

  return {
    ref: '97-06',
    titre: 'Couvrir le jardin la nuit du gel',
    desc: 'La nuit du gel. En haut, un rang de tomates en coupe : à gauche, la toile sèche posée sur deux piquets plus hauts que le plant, un plastique par-dessus, les bords tenus par des pierres ; à droite, la toile posée à même le plant, et les feuilles qui la touchent gelées en noir. Au milieu, huit bouteilles d’eau serrées en anneau autour d’un petit plant de tomate, puis la même chose en coupe, coiffée d’un sac qui repose sur les bouchons sans toucher le plant. En bas, une pelletée de terre sèche jetée sur un petit plant, puis le plant plié sous sa butte de terre pour la nuit.',
    format: 'pleine',
    disposition: [['bon', 'rate'], ['anneau', 'coupe'], ['pelle', 'butte']],
    hauteurs: [3.1, 3, 2.5],
    largeurs: [[1, 1], [1, 1.1], [1.5, 1]],
    vues: {
      bon: {
        titre: 'Bon : la toile sur piquets',
        dessin: z => une('bon', vueBon)(z).svg,
        renvois: z => {
          const v = une('bon', vueBon)(z), P = v.P;
          return [
            { n: 1, rond: P(XR - 28, 520), cible: P(XP, 470), texte: 'piquets plus hauts que le plant' },
            { n: 2, rond: P(-XR + 28, 470), cible: P(...pres(v.toile, -1, 380)), texte: 'toile sèche : drap, couverture' },
            { n: 3, rond: P(XR - 28, 290), cible: P(...pres(v.plast, 1, 240)), texte: 'plastique, si pluie ou rosée' },
            { n: 4, rond: P(-XR + 28, 200), cible: P(-XR + 62, 40), texte: 'bords lestés de pierres' },
          ];
        },
      },
      rate: {
        titre: 'Raté : la toile sur les feuilles',
        dessin: z => une('rate', vueRate)(z).svg,
        renvois: z => {
          const v = une('rate', vueRate)(z), P = v.P;
          // la foliole gelée la plus haute
          let best = null;
          for (const f of plant1.feuilles) for (const o of f.fols) if (v.gele(o.poly)) {
            const c = o.poly.reduce((a, p) => [a[0] + p[0] / o.poly.length, a[1] + p[1] / o.poly.length], [0, 0]);
            if (!best || c[0] > best[0]) best = c;
          }
          return [
            { n: 5, rond: P(XR - 28, best[1] + 20), cible: P(...best), texte: 'feuilles gelées là où elle appuie' },
          ];
        },
      },
      anneau: {
        titre: 'Les bouteilles en anneau',
        dessin: z => une('anneau', vueAnneau)(z).svg,
        renvois: z => {
          const v = une('anneau', vueAnneau)(z), Q = v.Q;
          const a = (180 / NB + 360 * 0 / NB) * RAD;
          return [
            { n: 6, rond: Q(RA + RB + 55, 60, 240), cible: Q(RA * Math.cos(a) + RB * 0.6, RA * Math.sin(a), 120), texte: 'bouteilles de 2 L pleines d’eau' },
          ];
        },
      },
      coupe: {
        titre: 'En coupe, coiffé d’un sac',
        dessin: z => une('coupe', vueCoupe)(z).svg,
        renvois: z => {
          const v = une('coupe', vueCoupe)(z), P = v.P;
          return [
            { n: 7, rond: P(-RA - RB - 45, ZB + 30), cible: P(-RA, ZB + 4), texte: 'sac posé sur les bouchons' },
            { n: 8, rond: P(RA + RB + 45, 60), cible: P(RA + 20, 100), texte: 'l’eau gèle avant la plante' },
          ];
        },
      },
      pelle: {
        titre: 'Terre sèche, pour une nuit courte',
        dessin: z => une('pelle', vuePelle)(z).svg,
        renvois: z => {
          const v = une('pelle', vuePelle)(z), P = v.P;
          return [
            { n: 9, rond: P(560, 80), cible: P(...v.A(150, 40)), texte: 'pelletées de terre sèche' },
          ];
        },
      },
      butte: {
        titre: 'Pour la nuit',
        dessin: z => une('butte', vueButte)(z).svg,
        renvois: z => {
          const v = une('butte', vueButte)(z), P = v.P;
          return [
            { n: 10, rond: P(220, 190), cible: P(150, 110), texte: 'dégagée à la main au matin' },
            { n: 11, rond: P(-255, 170), cible: P(...v.coude), texte: 'le plant plie sans casser' },
          ];
        },
      },
    },
  };
};
