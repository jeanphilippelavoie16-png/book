// Planche 99-01 — la butte des Trois Sœurs.
// Chapitre 99, §5-B, étapes 10, 13, 14 et 15, et la variante d'urgence :
//   buttes basses à 0,9-1,2 m les unes des autres, dans le rang et entre les rangs ;
//   5 à 7 grains de maïs par butte, espacés, à 2,5-4 cm de profondeur ;
//   désherber et rechausser : la terre ramenée autour des plants fait la butte ;
//   quand le maïs a environ 15 cm, 4 ou 5 graines de haricot grimpant autour du maïs dans chaque
//   butte, 4 ou 5 de courge dans une butte sur sept ; maïs nain (Gaspé, 60-90 cm, épis d'environ
//   10 cm) : perche d'épinette plantée au centre en même temps, le haricot guidé dessus au premier
//   tour ; une seule perche laisse quand même quelques tiges s'enrouler sur le maïs voisin.
// Aucune taille de butte n'est donnée : pas de cote sur la butte elle-même.
module.exports = (h) => {
  const BL = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const r1 = v => Math.round(v * 10) / 10;
  const rad = d => d * Math.PI / 180;
  const AXE = h.a.fin.replace('stroke-linecap="round"', 'stroke-linecap="butt" stroke-dasharray="10 2.5 1.5 2.5"');
  const RAPPEL = h.a.fin.replace('stroke-linecap="round"', 'stroke-linecap="butt" stroke-dasharray="1.5 2.5"');
  const SOUS_BLANC = 'fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"';

  // Échelle de la rangée du bas : 1 px ≈ 3,8 mm (butte d'environ 44 cm au pied, dessinée, non cotée)
  const S = 3.8;
  const R = 58;                 // pied de la butte
  const RM = 26;                // rond du maïs
  const RH = 36;                // rond du haricot, autour du maïs
  const ANG_MAIS = [0, 60, 120, 180, 240, 300];
  const ANG_HAR = [36, 108, 180, 252, 324];

  // ─── petites formes ───────────────────────────────────────────────────────────────────
  // fuseau le long d'une courbe quadratique p0 → c → p1 (feuille, gousse, épi)
  const fuseau = (p0, c, p1, w, at = BL(h.a.detail), nervure = true) => {
    const dx = p1[0] - p0[0], dy = p1[1] - p0[1], L = Math.hypot(dx, dy) || 1;
    const nx = -dy / L, ny = dx / L;
    const d = `M${r1(p0[0])} ${r1(p0[1])} Q${r1(c[0] + nx * w)} ${r1(c[1] + ny * w)} ${r1(p1[0])} ${r1(p1[1])} ` +
      `Q${r1(c[0] - nx * w)} ${r1(c[1] - ny * w)} ${r1(p0[0])} ${r1(p0[1])} Z`;
    const o = [h.path(d, at)];
    if (nervure) o.push(h.path(`M${r1(p0[0])} ${r1(p0[1])} Q${r1(c[0])} ${r1(c[1])} ${r1(p1[0])} ${r1(p1[1])}`, h.a.fin));
    return o.join('\n');
  };
  const seg = (x1, y1, x2, y2, at = h.a.arete) => h.chemin([[x1, y1], [x2, y2]], at);
  // chemin en coordonnées locales (paires de nombres), tourné de a degrés et posé en (x, y)
  const pose = (x, y, a, d) => {
    const c = Math.cos(rad(a)), s = Math.sin(rad(a));
    return d.replace(/(-?[\d.]+) (-?[\d.]+)/g, (m, u, v) => {
      u = Number(u); v = Number(v);
      return `${r1(x + u * c - v * s)} ${r1(y + u * s + v * c)}`;
    });
  };

  // grain de maïs (dent), vu à plat, pointe vers l'intérieur ; t = taille
  const grain = (x, y, a, t = 1) =>
    h.path(pose(x, y, a, `M${r1(-3 * t)} ${r1(-2.4 * t)} Q0 ${r1(-3.6 * t)} ${r1(3 * t)} ${r1(-2.4 * t)} Q${r1(3.4 * t)} 0 ${r1(1.9 * t)} ${r1(2.6 * t)} Q0 ${r1(3.8 * t)} ${r1(-1.9 * t)} ${r1(2.6 * t)} Q${r1(-3.4 * t)} 0 ${r1(-3 * t)} ${r1(-2.4 * t)} Z`), h.a.plein);
  // graine de haricot : un rognon, blanc cerclé, le hile marqué
  const haricot = (x, y, a, t = 1) => [
    h.path(pose(x, y, a, `M${r1(-5 * t)} 0 C${r1(-5 * t)} ${r1(-4.2 * t)} ${r1(5 * t)} ${r1(-4.2 * t)} ${r1(5 * t)} 0 ` +
      `C${r1(5 * t)} ${r1(3.2 * t)} ${r1(1.6 * t)} ${r1(3.4 * t)} 0 ${r1(1.6 * t)} C${r1(-1.6 * t)} ${r1(3.4 * t)} ${r1(-5 * t)} ${r1(3.2 * t)} ${r1(-5 * t)} 0 Z`), BL(h.a.detail)),
    h.path(pose(x, y, a, `M${r1(-1.2 * t)} ${r1(0.6 * t)} L${r1(1.2 * t)} ${r1(0.6 * t)}`), h.a.fin)].join('\n');

  // butte vue de dessus : pied, haut plat, hachures de talus
  const buttePlan = (cx, cy, rP, rT, n) => {
    const o = [h.cercle(cx, cy, rP, BL(h.a.arete)), h.cercle(cx, cy, rT, h.a.fin)];
    for (let i = 0; i < n; i++) {
      const a = 2 * Math.PI * i / n, c = Math.cos(a), s = Math.sin(a);
      const r2 = i % 2 ? rT + (rP - rT) * 0.5 : rP - 2.5;
      o.push(seg(cx + (rT + 1.5) * c, cy + (rT + 1.5) * s, cx + r2 * c, cy + r2 * s, h.a.fin));
    }
    return o.join('\n');
  };
  // plant de maïs vu de dessus : quatre feuilles en étoile
  const maisDessus = (x, y, a0, L = 13) => [0, 100, 180, 280].map(d => {
    const a = rad(a0 + d), c = Math.cos(a), s = Math.sin(a);
    return fuseau([x, y], [x + c * L * 0.5 - s * 1.5, y + s * L * 0.5 + c * 1.5], [x + c * L, y + s * L], 3.4, BL(h.a.detail), false);
  }).join('\n') + '\n' + h.cercle(x, y, 1.2, h.a.plein);
  // bout de perche vu de dessus
  const percheDessus = (x, y, r = 5) => [h.cercle(x, y, r, BL(h.a.arete)), h.cercle(x, y, r * 0.45, h.a.fin)].join('\n');
  // trait de coupe sur un plan
  const traitCoupe = (x1, x2, y) => [seg(x1, y, x2, y, AXE),
    seg(x1 - 1, y - 5, x1 - 1, y + 5, h.a.contour), seg(x2 + 1, y - 5, x2 + 1, y + 5, h.a.contour)].join('\n');

  // profil d'une butte en coupe : sol à yG, haut plat à yG - hM entre cx ± rT
  const profil = (cx, yG, rP, rT, hM, x0, x1) => {
    const k = (rP - rT) * 0.45;
    return `M${r1(x0)} ${r1(yG)} L${r1(cx - rP)} ${r1(yG)} C${r1(cx - rP + k)} ${r1(yG)} ${r1(cx - rT - k)} ${r1(yG - hM)} ${r1(cx - rT)} ${r1(yG - hM)} ` +
      `L${r1(cx + rT)} ${r1(yG - hM)} C${r1(cx + rT + k)} ${r1(yG - hM)} ${r1(cx + rP - k)} ${r1(yG)} ${r1(cx + rP)} ${r1(yG)} L${r1(x1)} ${r1(yG)}`;
  };
  const onde = (x0, x1, y, a = 2.5) => {
    let d = '';
    for (let x = x1; x >= x0 - 0.01; x -= 3) d += ` L${r1(x)} ${r1(y + a * Math.sin(x / 7))}`;
    return d;
  };
  // terre en coupe sous un profil, bord du bas en onde
  const terre = (dProfil, x0, x1, yB) => [
    h.path(`${dProfil} L${r1(x1)} ${r1(yB)}${onde(x0, x1, yB)} Z`, h.a.hachure('terre', 'aucun')),
    h.path(dProfil, h.a.arete),
    h.path(`M${r1(x1)} ${r1(yB + 2.5 * Math.sin(x1 / 7))}${onde(x0, x1, yB).replace(/^ L/, ' L')}`, h.a.detail),
  ].join('\n');

  // plant de maïs de côté ; H = hauteur totale, d0 = côté de la première feuille
  const maisCote = (x, y0, H, d0, epi = 2, at = BL(h.a.detail)) => {
    const o = [];
    const yT = y0 - H, yS = yT + H * 0.13;
    o.push(h.chemin([[x - 2.4, y0], [x - 1.1, yS], [x + 1.1, yS], [x + 2.4, y0]], at, true));
    // racines d'appui au pied
    o.push(h.path(`M${r1(x - 1.5)} ${r1(y0 - 7)} Q${r1(x - 5)} ${r1(y0 - 3)} ${r1(x - 6)} ${r1(y0 + 1)}`, h.a.fin));
    o.push(h.path(`M${r1(x + 1.5)} ${r1(y0 - 7)} Q${r1(x + 5)} ${r1(y0 - 3)} ${r1(x + 6)} ${r1(y0 + 1)}`, h.a.fin));
    const n = 7, epis = [];
    for (let i = 0; i < n; i++) {
      const yn = y0 - H * (0.06 + 0.113 * i);
      o.push(seg(x - 1.8, yn, x + 1.8, yn, h.a.fin));
      const d = d0 * (i % 2 ? -1 : 1);
      const L = H * (0.25 - 0.017 * i);
      o.push(fuseau([x + d * 1.5, yn], [x + d * L * 0.42, yn - L * 0.62], [x + d * L, yn + L * 0.12], 8, at));
      if (i === epi) epis.push(() => {
        // l'épi, de l'autre côté, serré contre la tige, avec ses soies
        const e = -d, a = rad(30), Le = 10 / S * 10;
        const bx = x + e * 2, by = yn - 1, tx = bx + e * Math.sin(a) * Le, ty = by - Math.cos(a) * Le;
        o.push(fuseau([bx, by], [(bx + tx) / 2 + e * 1, (by + ty) / 2], [tx, ty], 13, BL(h.a.arete), false));
        o.push(h.path(`M${r1(bx + e * 1)} ${r1(by - 3)} Q${r1((bx + tx) / 2 + e * 3)} ${r1((by + ty) / 2)} ${r1(tx)} ${r1(ty)}`, h.a.fin));
        for (const s of [-1, 0, 1]) o.push(h.path(`M${r1(tx)} ${r1(ty)} q${r1(e * 3 + s * 2)} ${-4} ${r1(e * 2 + s * 5)} ${-9}`, h.a.detail));
      });
    }
    epis.forEach(f => f());
    // panicule
    o.push(seg(x, yS, x, yT, h.a.detail));
    for (const [s, k] of [[-1, 0.02], [1, 0.035], [-1, 0.05], [1, 0.065]]) {
      const y = yS - H * k;
      o.push(h.path(`M${r1(x)} ${r1(y)} Q${r1(x + s * H * 0.045)} ${r1(y - H * 0.03)} ${r1(x + s * H * 0.075)} ${r1(y + H * 0.01)}`, h.a.detail));
    }
    return o.join('\n');
  };

  // tige volubile en vis à droite autour d'un axe vertical : brin avant « / », brin arrière caché
  const volute = (x, r, ya, yb, pas, phi0) => {
    const av = [], ar = [];
    const tours = (ya - yb) / pas, N = Math.max(8, Math.ceil(tours * 48));
    let cur = [], avant = null;
    for (let k = 0; k <= N; k++) {
      const phi = phi0 + 2 * Math.PI * tours * k / N;
      const p = [x + r * Math.cos(phi), ya - (ya - yb) * k / N];
      const f = Math.sin(phi) < 0;
      if (avant !== null && f !== avant) { (avant ? av : ar).push(cur); cur = [cur[cur.length - 1]]; }
      avant = f; cur.push(p);
    }
    (avant ? av : ar).push(cur);
    return { av, ar };
  };
  // feuille de haricot à trois folioles, attachée en (x, y), dirigée selon a (degrés)
  const trifoliee = (x, y, a, L = 13) => {
    const o = [];
    const c = Math.cos(rad(a)), s = Math.sin(rad(a));
    const px = x + c * 7, py = y + s * 7;
    o.push(seg(x, y, px, py, h.a.detail));
    for (const da of [-68, 0, 68]) {
      const b = rad(a + da), cb = Math.cos(b), sb = Math.sin(b);
      const Lf = da ? L * 0.85 : L;
      o.push(fuseau([px, py], [px + cb * Lf * 0.45, py + sb * Lf * 0.45], [px + cb * Lf, py + sb * Lf], 11));
    }
    return o.join('\n');
  };
  const gousses = (x, y, s) => [
    fuseau([x, y], [x + s * 3, y + 16], [x + s * 7, y + 34], 6.5, BL(h.a.detail), false),
    fuseau([x, y], [x - s * 1, y + 15], [x + s * 1, y + 31], 6.5, BL(h.a.detail), false)].join('\n');

  // feuille de courge vue de biais : cinq lobes, sinus du pétiole vers le bas ; aplat = écrasement vertical
  const courge = (cx, cy, Rf, aplat = 0.55, rot = 0) => {
    const pts = [];
    for (let i = 0; i <= 90; i++) {
      const t = 2 * Math.PI * i / 90;
      const u = t - Math.PI / 2;
      let r = Rf * (0.86 + 0.14 * Math.cos(5 * u + Math.PI));
      const du = Math.atan2(Math.sin(u), Math.cos(u));
      r *= 1 - 0.55 * Math.exp(-((du / 0.2) ** 2));
      pts.push([r * Math.cos(t), r * Math.sin(t)]);
    }
    const tr = ([x, y]) => {
      const a = rad(rot), c = Math.cos(a), s = Math.sin(a);
      return [cx + x * c - y * aplat * s, cy + x * s + y * aplat * c];
    };
    const o = [h.chemin(pts.map(tr), BL(h.a.detail), true)];
    const base = tr([0, Rf * 0.36]);
    for (const k of [-2, -1, 0, 1, 2]) {
      const t = Math.PI / 2 + Math.PI + k * 2 * Math.PI / 5;
      const tip = tr([Rf * 0.8 * Math.cos(t), Rf * 0.8 * Math.sin(t)]);
      o.push(seg(base[0], base[1], tip[0], tip[1], h.a.fin));
    }
    return { svg: o.join('\n'), base };
  };

  // ─── vue du bas : géométrie commune ───────────────────────────────────────────────────
  const planY = 14 + R;

  return {
    ref: '99-01',
    titre: 'La butte des Trois Sœurs',
    desc: 'Le carré de buttes vu de dessus, à 0,9 à 1,2 m dans les deux sens, une butte sur sept avec la courge ; ' +
      'une butte au semis, cinq à sept grains de maïs espacés à 2,5 à 4 cm ; la même quand le maïs a 15 cm : ' +
      'perche d’épinette au centre, haricots autour du maïs, terre ramenée aux plants ; la butte à courge en été, ' +
      'le haricot grimpé sur la perche et la courge qui couvre le sol.',
    format: 'pleine',
    disposition: [['carre'], ['semis', 'quinze', 'ete']],
    hauteurs: [1, 1.78],
    largeurs: [[1], [1, 1, 1.2]],
    vues: {
      // ── le carré ──────────────────────────────────────────────────────────────────────
      carre: {
        titre: 'Le carré, vu de dessus',
        dessin: z => {
          const P = 62, x0 = 122, y0 = Math.max(54, (z.h - 2 * P) / 2 + 12), rb = 13;
          const aCourge = [[0, 4], [1, 1], [1, 6]];
          const o = [];
          const estCourge = (r, c) => aCourge.some(([a, b]) => a === r && b === c);
          // tiges et feuilles de courge d'abord, sous les buttes
          const feuilles = [];
          for (const [r, c] of aCourge) {
            const bx = x0 + c * P, by = y0 + r * P;
            const bras = [[45, 1], [135, -1], [-45, -1], [-135, 1]];
            for (const [a, s] of bras) {
              const ar = rad(a), L = 34;
              const ex = bx + Math.cos(ar) * L, ey = by + Math.sin(ar) * L;
              const mx = (bx + ex) / 2 - Math.sin(ar) * 7 * s, my = (by + ey) / 2 + Math.cos(ar) * 7 * s;
              o.push(h.path(`M${r1(bx)} ${r1(by)} Q${r1(mx)} ${r1(my)} ${r1(ex)} ${r1(ey)}`, h.a.arete));
              for (const k of [0.5, 1]) {
                const fx = bx + (ex - bx) * k + Math.cos(ar + 1.2 * s) * 6, fy = by + (ey - by) * k + Math.sin(ar + 1.2 * s) * 6;
                feuilles.push(courge(fx, fy, k === 1 ? 12.5 : 10.5, 0.9, a + 90 + 30 * s).svg);
              }
            }
          }
          for (let r = 0; r < 3; r++) for (let c = 0; c < 7; c++) {
            const bx = x0 + c * P, by = y0 + r * P;
            o.push(h.cercle(bx, by, rb, BL(h.a.arete)));
            for (const a of ANG_MAIS) {
              const ar = rad(a + 30), mx = bx + Math.cos(ar) * 7.5, my = by + Math.sin(ar) * 7.5;
              for (const d of [0, 60, 120]) {
                const b = rad(d + a), dx = Math.cos(b) * 2.6, dy = Math.sin(b) * 2.6;
                o.push(seg(mx - dx, my - dy, mx + dx, my + dy, h.a.fin));
              }
            }
            o.push(h.cercle(bx, by, 2, h.a.plein));
            if (estCourge(r, c)) o.push(h.cercle(bx, by, rb - 3.5, h.a.fin));
          }
          o.push(...feuilles);
          // cotes : dans le rang et entre les rangs
          const yc = y0 - 34;
          o.push(seg(x0, y0 - rb - 3, x0, yc - 4, h.a.fin), seg(x0 + P, y0 - rb - 3, x0 + P, yc - 4, h.a.fin));
          o.push(h.cote(x0, yc, x0 + P, yc, '900 à 1 200'));
          const xc = x0 - 34;
          o.push(seg(x0 - rb - 3, y0, xc - 4, y0, h.a.fin), seg(x0 - rb - 3, y0 + P, xc - 4, y0 + P, h.a.fin));
          o.push(h.cote(xc, y0, xc, y0 + P, '900 à 1 200', { cote: 'gauche' }));
          return o.join('\n');
        },
        renvois: z => {
          const P = 62, x0 = 122, y0 = Math.max(54, (z.h - 2 * P) / 2 + 12);
          return [
            { n: 1, rond: [x0 + 7 * P + 14, y0 - 30], cible: [x0 + 6 * P + 6, y0 - 8] },
            { n: 2, rond: [x0 + 7 * P + 14, y0 + 2 * P + 4], cible: [x0 + 6 * P + 4, y0 + P + 11] },
          ].map((r, i) => ({ ...r, texte: ['une butte de maïs et de haricot', 'une butte à courge sur sept'][i] }));
        },
      },

      // ── au semis ──────────────────────────────────────────────────────────────────────
      semis: {
        titre: 'Au semis',
        dessin: z => {
          const cx = z.l / 2, yG = z.h - 44, hM = 13, rT = 38, prof = 32 / S;
          const o = [];
          // plan
          o.push(buttePlan(cx, planY, R, rT, 32));
          for (const a of ANG_MAIS) o.push(grain(cx + RM * Math.cos(rad(a)), planY + RM * Math.sin(rad(a)), a + 90));
          o.push(traitCoupe(cx - R - 10, cx + R + 10, planY));
          // coupe
          o.push(terre(profil(cx, yG, R, rT, hM, 0, z.l), 0, z.l, yG + 30));
          const yg = yG - hM + prof;
          o.push(grain(cx - RM, yg, 0), grain(cx + RM, yg, 0));
          // rappels plan → coupe
          // détail agrandi du grain (× 3)
          const k = 3, fx0 = cx - 66, fx1 = cx + 66, fy0 = planY + R + 22, fy1 = fy0 + 84, ys = fy0 + 18;
          for (const x of [cx - R, cx + R]) o.push(seg(x, planY + 4, x, fy0 - 4, RAPPEL), seg(x, fy1 + 4, x, yG - 3, RAPPEL));
          for (const x of [cx - RM, cx + RM]) o.push(seg(x, planY + R + 6, x, fy0 - 4, RAPPEL), seg(x, fy1 + 4, x, yG - hM - 4, RAPPEL));
          o.push(h.rect(fx0, ys, fx1 - fx0, fy1 - ys, h.a.hachure('terre', 'aucun')));
          o.push(h.rect(fx0, fy0, fx1 - fx0, fy1 - fy0, h.a.detail));
          o.push(seg(fx0, ys, fx1, ys, h.a.arete));
          const kx = cx - 14, ky = ys + prof * k;
          o.push(h.rect(kx - 9, ky - 11, 18, 22, h.a.blanc));
          o.push(grain(kx, ky, 0, 1.6));
          o.push(seg(kx + 7, ky, cx + 10, ky, h.a.fin));
          o.push(h.cote(cx + 6, ys, cx + 6, ky, '25 à 40', { cote: 'droite' }));
          // bulle sur la coupe et renvoi vers le détail
          o.push(h.cercle(cx + RM, yg - 3, 12, h.a.fin));
          o.push(seg(cx + RM, yg - 15, cx + RM, fy1, h.a.fin));
          return o.join('\n');
        },
        renvois: z => {
          const cx = z.l / 2, yG = z.h - 44;
          return [
            { n: 3, rond: [12, 14], cible: [cx - RM * 0.5 - 2, planY - RM * 0.87 + 1], texte: 'cinq à sept grains, espacés, le centre libre' },
            { n: 4, rond: [12, yG - 26], cible: [cx - R + 8, yG - 4], texte: 'la butte basse, faite avant le semis' },
          ];
        },
      },

      // ── le maïs à 15 cm ───────────────────────────────────────────────────────────────
      quinze: {
        titre: 'Le maïs à environ 15 cm',
        dessin: z => {
          const cx = z.l / 2, yG = z.h - 44, hM0 = 13, rT0 = 38, hM = 24, rT = 30;
          const o = [];
          // plan
          o.push(buttePlan(cx, planY, R, rT, 32));
          for (const a of ANG_HAR) o.push(haricot(cx + RH * Math.cos(rad(a)), planY + RH * Math.sin(rad(a)), a + 90, 1.3));
          for (const a of ANG_MAIS) o.push(maisDessus(cx + RM * Math.cos(rad(a)), planY + RM * Math.sin(rad(a)), a + 20));
          o.push(percheDessus(cx, planY));
          for (const a of [45, 135, 225, 315]) {
            const c = Math.cos(rad(a)), s = Math.sin(rad(a));
            o.push(h.fleche(`M${r1(cx + (R + 12) * c)} ${r1(planY + (R + 12) * s)} L${r1(cx + (R - 12) * c)} ${r1(planY + (R - 12) * s)}`));
          }
          o.push(traitCoupe(cx - R - 10, cx + R + 10, planY));
          // coupe : la terre ramenée, l'ancien profil en tireté
          o.push(terre(profil(cx, yG, R, rT, hM, 0, z.l), 0, z.l, yG + 30));
          const ancien = profil(cx, yG, R, rT0, hM0, cx - R - 2, cx + R + 2);
          o.push(h.path(ancien, SOUS_BLANC), h.path(ancien, h.a.cache));
          // perche d'épinette, taillée en pointe, cassée en haut
          const pw = 4.5, pb = yG + 26, pt = yG - hM - 118;
          o.push(h.chemin([[cx - pw, pt], [cx - pw, pb - 6], [cx, pb], [cx + pw, pb - 6], [cx + pw, pt + 3], [cx + 1.5, pt - 2], [cx - 1.5, pt + 3]], BL(h.a.arete), true));
          for (const y of [pt + 22, pt + 51, pt + 83]) o.push(seg(cx - pw + 1.5, y, cx - pw + 3.5, y + 5, h.a.fin));
          // maïs dans le plan de coupe : grain, racines, tige, feuilles
          const ysem = yG - hM0 + 32 / S;
          for (const s of [-1, 1]) {
            const x = cx + s * RM, ys = yG - hM, Hm = 150 / S;
            o.push(grain(x, ysem, 0, 0.9));
            for (const [dx, dy] of [[-7, 12], [-2, 16], [4, 14], [8, 9]]) o.push(h.path(`M${r1(x)} ${r1(ysem + 2)} q${r1(dx * 0.4)} ${r1(dy * 0.6)} ${r1(dx)} ${r1(dy)}`, h.a.fin));
            o.push(seg(x, ysem - 2, x, ys, h.a.detail));
            o.push(h.chemin([[x - 1.4, ys], [x - 0.8, ys - Hm * 0.55], [x + 0.8, ys - Hm * 0.55], [x + 1.4, ys]], BL(h.a.detail), true));
            const fe = [[s, 0.15, 17], [-s, 0.32, 19], [s, 0.5, 18], [-s, 0.72, 14]];
            for (const [d, k, L] of fe) {
              const yn = ys - Hm * k;
              o.push(fuseau([x + d * 1, yn], [x + d * L * 0.35, yn - L * 0.75], [x + d * L * 0.8, yn - L * 0.35], 6));
            }
          }
          // haricot semé dans le plan de coupe (à 180°)
          o.push(haricot(cx - RH, yG - hM + 11, 0, 1.1));
          // terre ramenée des deux côtés
          for (const s of [-1, 1]) o.push(h.fleche(`M${r1(cx + s * (R + 14))} ${r1(yG - 5)} Q${r1(cx + s * (R - 6))} ${r1(yG - 30)} ${r1(cx + s * (rT + 8))} ${r1(yG - hM - 7)}`));
          // rappels
          for (const x of [cx - R, cx + R]) o.push(seg(x, planY + 4, x, yG - 3, RAPPEL));
          return o.join('\n');
        },
        renvois: z => {
          const cx = z.l / 2, yG = z.h - 44;
          return [
            { n: 5, rond: [z.l - 12, 14], cible: [cx + 4, planY - 3], texte: 'la perche, plantée au centre avec le haricot' },
            { n: 6, rond: [12, 14], cible: [cx + RH * Math.cos(rad(252)), planY + RH * Math.sin(rad(252)) - 3], texte: 'quatre ou cinq graines de haricot' },
            { n: 7, rond: [z.l - 12, planY + R + 30], cible: [cx + (R + 4) * 0.707, planY + (R + 4) * 0.707], texte: 'rechausser : la terre ramenée aux plants' },
            { n: 8, rond: [12, yG - 44], cible: [cx - R + 16, yG - 8], texte: 'en tireté, la butte avant le rechaussage' },
          ];
        },
      },

      // ── la butte à courge en été ─────────────────────────────────────────────────────
      ete: {
        titre: 'La butte à courge, en été',
        dessin: z => {
          const cx = z.l / 2 - 6, yG = z.h - 44, hM = 26, rT = 28, ys = yG - hM;
          const o = [];
          o.push(terre(profil(cx, yG, R, rT, hM, 0, z.l), 0, z.l, yG + 30));
          // la perche : partie enterrée en tireté
          const pw = 4.5, pt = 16;
          o.push(seg(cx - pw, ys, cx - pw, yG + 20, h.a.cache), seg(cx + pw, ys, cx + pw, yG + 20, h.a.cache));
          // tiges de haricot : brins arrière, puis perche, puis brins avant
          const vA = volute(cx, pw + 1.5, ys - 34, pt + 22, 30, Math.PI);
          const vB = volute(cx, pw + 1.5, ys - 50, pt + 60, 30, 0);
          const vC = volute(cx - RM, 4.5, ys - 22, ys - 118, 22, Math.PI);
          // maïs derrière la perche
          for (const v of [vA, vB]) for (const p of v.ar) o.push(h.chemin(p, h.a.detail));
          o.push(h.chemin([[cx - pw, ys], [cx - pw, pt + 3], [cx - 1, pt - 1], [cx + pw, pt + 2], [cx + pw, ys]], BL(h.a.arete)));
          for (const y of [pt + 30, pt + 74, pt + 128, pt + 190, pt + 232]) o.push(seg(cx - pw + 1.5, y, cx - pw + 3.5, y + 5, h.a.fin));
          // du grain de haricot à la perche, guidé au premier tour
          o.push(h.path(`M${r1(cx - RH)} ${r1(ys)} C${r1(cx - RH + 2)} ${r1(ys - 20)} ${r1(cx - 14)} ${r1(ys - 30)} ${r1(cx - pw - 1.5)} ${r1(ys - 34)}`, h.a.arete));
          o.push(h.path(`M${r1(cx + RH * 0.81)} ${r1(ys)} C${r1(cx + RH * 0.81)} ${r1(ys - 24)} ${r1(cx + 16)} ${r1(ys - 44)} ${r1(cx + pw + 1.5)} ${r1(ys - 50)}`, h.a.arete));
          for (const v of [vA, vB]) for (const p of v.av) o.push(h.chemin(p, h.a.arete));
          // maïs devant
          o.push(maisCote(cx - RM, ys, 900 / S, 1, 2));
          o.push(maisCote(cx + RM, ys, 205, -1, 2));
          // la tige qui s'enroule sur le maïs voisin
          for (const p of vC.ar) o.push(h.chemin(p, h.a.detail));
          o.push(h.path(`M${r1(cx - 11)} ${r1(ys)} C${r1(cx - 12)} ${r1(ys - 12)} ${r1(cx - 18)} ${r1(ys - 20)} ${r1(cx - RM + 3.6)} ${r1(ys - 22)}`, h.a.arete));
          for (const p of vC.av) o.push(h.chemin(p, h.a.arete));
          // feuilles et gousses du haricot sur la perche
          for (const [y, s] of [[pt + 40, 1], [pt + 70, -1], [pt + 102, 1], [pt + 136, -1], [pt + 170, 1], [pt + 206, -1]]) {
            o.push(trifoliee(cx + s * (pw + 1), y, s > 0 ? -25 : 205, 13));
          }
          o.push(gousses(cx + pw + 1, pt + 118, 1), gousses(cx - pw - 1, pt + 152, -1));
          o.push(trifoliee(cx - RM - 3, ys - 70, 200, 12), trifoliee(cx - RM + 3, ys - 104, -30, 11));
          // la courge : tige couchée sur le sol, feuilles dressées, un fruit
          const base = [cx + 30, ys + 2];
          o.push(h.path(`M${r1(base[0])} ${r1(base[1])} C${r1(cx + 46)} ${r1(ys + 8)} ${r1(cx + 60)} ${r1(yG - 2)} ${r1(z.l - 2)} ${r1(yG - 3)}`, h.a.arete));
          o.push(h.path(`M${r1(base[0])} ${r1(base[1])} C${r1(cx + 10)} ${r1(yG - 6)} ${r1(cx - 40)} ${r1(yG + 1)} ${r1(2)} ${r1(yG - 2)}`, h.a.arete));
          o.push(h.path(`M${r1(cx + 86)} ${r1(yG - 3)} q4 -6 0 -9 q-4 -3 -1 -7`, h.a.detail));
          const fr = [cx + 78, yG - 13];
          o.push(h.ellipse(fr[0], fr[1], 19, 13, BL(h.a.arete)));
          for (const dx of [-11, -4, 4, 11]) o.push(h.path(`M${r1(fr[0] + dx * 0.6)} ${r1(fr[1] - 12.6)} Q${r1(fr[0] + dx * 1.35)} ${r1(fr[1])} ${r1(fr[0] + dx * 0.6)} ${r1(fr[1] + 12.6)}`, h.a.fin));
          o.push(h.rect(fr[0] - 1.5, fr[1] - 17, 3, 5, h.a.plein));
          for (const [x, y, Rf, rot] of [[14, yG - 22, 20, -8], [cx - 30, yG - 20, 21, 6], [cx + 40, yG - 36, 20, -4], [z.l - 18, yG - 26, 19, 10]]) {
            const f = courge(x, y, Rf, 0.5, rot);
            const vx = Math.min(Math.max(x + 4, 4), z.l - 4);
            o.push(h.path(`M${r1(vx)} ${r1(yG - 2)} Q${r1(vx + 6)} ${r1((yG + f.base[1]) / 2)} ${r1(f.base[0])} ${r1(f.base[1])}`, h.a.detail));
            o.push(f.svg);
          }
          return o.join('\n');
        },
        renvois: z => {
          const cx = z.l / 2 - 6, yG = z.h - 44, ys = yG - 26;
          return [
            { n: 9, rond: [z.l - 12, 16], cible: [cx + 5, 40], texte: 'la perche d’épinette, le haricot guidé dessus' },
            { n: 10, rond: [12, ys - 150], cible: [cx - RM - 4, ys - 60], texte: 'une tige s’enroule quand même sur le maïs' },
            { n: 11, rond: [12, 30], cible: [cx - RM, ys - 900 / S + 10], texte: 'le maïs de Gaspé : 60 à 90 cm' },
            { n: 12, rond: [z.l - 12, yG - 70], cible: [z.l - 22, yG - 30], texte: 'la courge couvre le sol' },
          ];
        },
      },
    },
  };
};
