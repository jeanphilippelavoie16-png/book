// Planche 97-03 — L'ados à la bêche (chapitre 97, §5-D étape 28, et le passage « Les anciens le
// savaient sans les chiffres ») : « Prendre une bande de terre orientée est-ouest, large de 1,28 m.
// En la bêchant, la baisser de 16 cm du côté sud et la relever de 16 cm du côté nord : 32 cm de
// pente vers le sud. Tendre un cordeau sur la crête, trancher le bord nord à la bêche et le battre au
// dos de la bêche pour faire un talus presque vertical. » — « Aux équinoxes, le soleil de midi est à
// 40° au-dessus de l'horizon à Sept-Îles ; sur l'ados, il frappe comme s'il était à 54°. »
// Vue 1 : bêcher, en coupe nord-sud (le sud à gauche) : la terre du côté sud passe au côté nord ; les
// seules cotes du chapitre (1280, 160, 160, 320 mm). Vues 2 et 3 : le bord nord en bloc, vu du
// nord-est : la bêche tranche d'aplomb au ras du cordeau, puis frappe le talus à plat, du dos.
// Vue 4 : l'ados fini, même coupe, au soleil de midi des équinoxes (40° sur le sol plat, 54° sur la
// pente, parce que la pente fait ≈ 14° : 320 sur 1280).
// La bêche (lame 180 × 280, douille, manche de 36), le piquet et la longueur de bande montrée ne
// servent qu'au dessin : le chapitre n'en donne aucune mesure, rien n'est coté dessus.
module.exports = (h) => {
  const r1 = v => Math.round(v * 10) / 10;
  const blanc = (t = h.a.arete) => t.replace('fill="none"', 'fill="#fff"');
  const pale = h.a.hachure('terre', 'aucun') + ' opacity="0.38"';
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

  // ── L'ados, en mm : x du sud (0) au nord (1280), y vers le haut, 0 au niveau du sol d'avant.
  const LARG = 1280, BAS = -160, HAUT = 160, MI = LARG / 2;
  const surf = x => BAS + (HAUT - BAS) * x / LARG;           // 320 mm sur 1280 : ≈ 14°
  const PENTE = Math.atan((HAUT - BAS) / LARG) * 180 / Math.PI;
  const SOLEIL = 40;                                          // midi, aux équinoxes, à Sept-Îles

  // repère d'une coupe : y vers le haut, centré dans la zone
  const repere = (z, xmin, xmax, ymin, ymax, mx = 6, my = 6) => {
    const s = Math.min((z.l - 2 * mx) / (xmax - xmin), (z.h - 2 * my) / (ymax - ymin));
    const ox = z.l / 2 - (xmin + xmax) / 2 * s, oy = z.h / 2 + (ymin + ymax) / 2 * s;
    const P = (x, y) => [r1(ox + x * s), r1(oy - y * s)];
    return { s, P, Pl: pts => pts.map(p => P(...p)) };
  };
  const arc = (P, cx, cy, r, a1, a2) => {
    const pts = [];
    for (let i = 0; i <= 24; i++) {
      const a = (a1 + (a2 - a1) * i / 24) * Math.PI / 180;
      pts.push(P(cx + r * Math.cos(a), cy + r * Math.sin(a)));
    }
    return h.chemin(pts, h.a.detail);
  };

  // ── Vue 1 : bêcher. La terre du côté sud, bêchée, passe au côté nord.
  const vueBecher = z => {
    const R = repere(z, -380, 2060, -350, 300, 4, 4);
    const { P, Pl } = R;
    const out = [];
    const EP = 90;                                            // épaisseur de terre en place montrée
    // la terre en place, sous le fond de la moitié sud et sous le sol d'avant de la moitié nord
    const place = [[-300, 0], [0, 0], [0, BAS], [MI, 0], [1760, 0], [1760, -EP], [MI, -EP], [0, BAS - EP], [-300, BAS - EP]];
    out.push(h.chemin(Pl(place), h.a.hachure('terre', 'aucun'), true));
    // la terre enlevée au sud : pâle, contour tireté
    out.push(h.chemin(Pl([[0, 0], [0, BAS], [MI, 0]]), pale, true));
    // la terre rejetée au nord : pleine, bordée
    out.push(h.chemin(Pl([[MI, 0], [LARG, HAUT], [LARG, 0]]), h.a.hachure('terre', 'aucun'), true));
    // le sol d'avant, tireté à travers la bande
    out.push(h.ligne(...P(0, 0), ...P(LARG, 0), `stroke="#fff" stroke-width="3.2" fill="none"`));
    out.push(h.ligne(...P(0, 0), ...P(LARG, 0), h.a.cache));
    // le profil fini
    out.push(h.chemin(Pl([[-300, 0], [0, 0], [0, BAS], [LARG, HAUT], [LARG, 0], [1760, 0]]), h.a.contour));
    // le geste : la terre passe du sud au nord, par-dessus (la charte : en rouge)
    const a = P(210, -45), c = P(640, 470), b = P(1090, 75);
    out.push(h.geste(`M ${a.join(' ')} Q ${c.join(' ')} ${b.join(' ')}`));
    // les cotes : 160 au sud, 160 et 320 au nord, 1280 dessous
    out.push(h.ligne(...P(-10, BAS), ...P(-150, BAS), h.a.fin));
    out.push(h.cote(...P(-120, 0), ...P(-120, BAS), '160 mm', { cote: 'gauche' }));
    out.push(h.ligne(...P(LARG + 10, HAUT), ...P(1810, HAUT), h.a.fin));
    out.push(h.cote(...P(1370, 0), ...P(1370, HAUT), '160 mm', { cote: 'droite' }));
    out.push(h.ligne(...P(10, BAS), ...P(-10, BAS), h.a.fin));
    out.push(h.ligne(...P(10, BAS), ...P(1810, BAS), h.a.fin));
    out.push(h.cote(...P(1780, BAS), ...P(1780, HAUT), '320 mm', { cote: 'droite' }));
    out.push(h.ligne(...P(0, BAS - EP - 6), ...P(0, -330), h.a.fin));
    out.push(h.ligne(...P(LARG, -EP - 6), ...P(LARG, -330), h.a.fin));
    out.push(h.cote(...P(0, -300), ...P(LARG, -300), '1 280 mm', { cote: 'dessus' }));
    return { svg: out.join('\n'), P, s: R.s };
  };

  // ── Vue 4 : l'ados fini, au soleil de midi des équinoxes
  const XS = -760, XN = 1500;
  const IMPACT_PLAT = -430, IMPACTS = [420, 760, 1100], RAYON = 470;
  const dir = [Math.cos(SOLEIL * Math.PI / 180), -Math.sin(SOLEIL * Math.PI / 180)];   // la lumière descend vers le nord
  const vueSoleil = z => {
    const R = repere(z, XS, XN, -230, 470, 4, 4);
    const { P, Pl } = R;
    const out = [];
    const profil = [[XS, 0], [-12, 0], [0, BAS], [LARG, HAUT], [LARG, 0], [XN, 0]];
    out.push(h.chemin(Pl([...profil, [XN, -230], [XS, -230]]), h.a.hachure('terre', 'aucun'), true));
    out.push(h.chemin(Pl(profil), h.a.contour));
    const rayon = (x, y) => h.fleche(`M ${P(x - RAYON * dir[0], y - RAYON * dir[1]).join(' ')} L ${P(x - 8 * dir[0], y - 8 * dir[1]).join(' ')}`, h.a.detail);
    out.push(rayon(IMPACT_PLAT, 0));
    for (const x of IMPACTS) out.push(rayon(x, surf(x)));
    // le soleil, en amont des rayons
    const [sx, sy] = P(-700, 400);
    out.push(h.cercle(sx, sy, 8, h.a.arete));
    for (let k = 0; k < 8; k++) {
      const an = (k + 0.5) * Math.PI / 4;
      out.push(h.ligne(sx + 11 * Math.cos(an), sy + 11 * Math.sin(an), sx + 16 * Math.cos(an), sy + 16 * Math.sin(an), h.a.detail));
    }
    // 40° sur le sol plat ; 54° sur la pente (40 + 14)
    out.push(arc(P, IMPACT_PLAT, 0, 190, 180 - SOLEIL, 180));
    const xi = IMPACTS[1], yi = surf(xi);
    out.push(arc(P, xi, yi, 190, 180 - SOLEIL, 180 + PENTE));
    const lab = (cx, cy, r, an, t) => {
      const [x, y] = P(cx + r * Math.cos(an * Math.PI / 180), cy + r * Math.sin(an * Math.PI / 180));
      return h.texte(x, y + 4, t, { lisere: true });
    };
    out.push(lab(IMPACT_PLAT, 0, 300, 180 - SOLEIL / 2, '40°'));
    out.push(lab(xi, yi, 300, 180 - SOLEIL / 2 + PENTE / 2, '54°'));
    return { svg: out.join('\n'), P, s: R.s };
  };

  // ── Vues 2 et 3 : le bord nord en bloc, vu du nord-est, d'un peu haut.
  //    X vers l'est, Y vers le nord (= x de la coupe), Z vers le haut (mm). L'ados finit à X = 0 ;
  //    le piquet du cordeau est au-delà, à l'ouest.
  const TH = 35 * Math.PI / 180, PH = 22 * Math.PI / 180;
  const Rv = [-Math.cos(TH), Math.sin(TH), 0];
  const Uv = [-Math.sin(PH) * Math.sin(TH), -Math.sin(PH) * Math.cos(TH), Math.cos(PH)];
  const proj = ([X, Y, Z]) => [X * Rv[0] + Y * Rv[1] + Z * Rv[2], -(X * Uv[0] + Y * Uv[1] + Z * Uv[2])];
  const XE = 560, XO = -330, YS = 820, YN = 1680, ZB = -110;
  const LAME = { l: 180, h: 280 }, DOUILLE = 150, MANCHE = 36, CASSE = 170;
  const XB = 190;                                              // la coupe avance vers l'est : à l'ouest de XB, tranché
  const XP = -190, ZC = HAUT + 25;                             // le piquet ; la hauteur du cordeau
  // le bord meuble : son profil (Y, Z) à partir de la crête, un peu bosselé
  const BOURRE = [[LARG, HAUT], [1300, 158], [1350, 146], [1405, 118], [1450, 92], [1500, 58], [1545, 26], [1585, 6], [1605, 0]];
  const bloc = (z, etat) => {
    const tranche = etat === 'battre';
    const tous = [[XE, YS, ZB], [XE, YN, ZB], [XO, YN, ZB], [XO, YS, 0], [XE, YS, surf(YS)], [XP, LARG, 330],
      [XB + 90, LARG + 12, LAME.h + DOUILLE + CASSE], [300, LARG + 10, LAME.h + DOUILLE + CASSE]];
    const pr = tous.map(proj);
    const xs = pr.map(p => p[0]), ys = pr.map(p => p[1]);
    const w = Math.max(...xs) - Math.min(...xs), ht = Math.max(...ys) - Math.min(...ys);
    const s = Math.min((z.l - 16) / w, (z.h - 10) / ht);
    const ox = z.l / 2 - (Math.max(...xs) + Math.min(...xs)) / 2 * s, oy = z.h / 2 - (Math.max(...ys) + Math.min(...ys)) / 2 * s;
    const Q = (X, Y, Z) => { const [a, b] = proj([X, Y, Z]); return [r1(ox + a * s), r1(oy + b * s)]; };
    const Ql = pts => pts.map(p => Q(...p));
    const out = [];
    const profil = (X, meuble) => {
      const pts = [];
      for (let Y = YS; Y < LARG; Y += 40) pts.push([X, Y, surf(Y)]);
      pts.push([X, LARG, HAUT]);
      if (meuble) BOURRE.slice(1).forEach(([Y, Zz]) => pts.push([X, Y, Zz]));
      else pts.push([X, LARG, 0]);
      return pts;
    };
    // face est, coupée : la terre et l'ados
    const faceEst = [[XE, YS, ZB], ...profil(XE, !tranche), [XE, YN, 0], [XE, YN, ZB]];
    out.push(h.chemin(Ql(faceEst), h.a.hachure('terre', 'aucun'), true));
    out.push(h.chemin(Ql(faceEst), h.a.arete, true));
    // face nord du bloc, coupée
    const faceNord = [[XE, YN, 0], [XO, YN, 0], [XO, YN, ZB], [XE, YN, ZB]];
    out.push(h.chemin(Ql(faceNord), h.a.hachure('terre', 'aucun'), true));
    out.push(h.chemin(Ql(faceNord), h.a.arete, true));
    // le dessus du sol, à l'ouest du bout de l'ados
    out.push(h.chemin(Ql([[XO, YN, 0], [XO, YS, 0], [0, YS, 0]]), h.a.arete));
    // l'ados : la pente, le bout ouest, le talus tranché
    out.push(h.chemin(Ql([[0, YS, surf(YS)], [XE, YS, surf(YS)], [XE, LARG, HAUT], [0, LARG, HAUT]]), blanc(h.a.arete), true));
    out.push(h.chemin(Ql([[0, YS, surf(YS)], [0, YS, 0], [0, LARG, 0]]), h.a.arete));
    const xTalus = tranche ? XE : XB;
    // La charte : le talus fait face au nord, comme la face de droite du bloc : à l'ombre
    const talus = Ql([[0, LARG, HAUT], [xTalus, LARG, HAUT], [xTalus, LARG, 0], [0, LARG, 0]]);
    out.push(h.chemin(talus, h.a.ombre, true), h.chemin(talus, h.a.arete, true));
    // des traits de bêche sur la pente, dans le sens de la pente
    for (const X of [70, 230, 390, 520]) out.push(h.chemin(Ql([[X, YS + 50, surf(YS + 50)], [X - 10, LARG - 60, surf(LARG - 60)]]), h.a.fin));
    // le piquet, et le cordeau tendu au ras de la crête
    const [pa, pb] = [Q(XP, LARG, -20), Q(XP, LARG, 330)];
    const e = 3.4;
    out.push(h.path(`M ${r1(pa[0] - e)} ${r1(pa[1] - 8)} L ${r1(pb[0] - e)} ${pb[1]} L ${r1(pb[0] + e)} ${pb[1]} L ${r1(pa[0] + e)} ${r1(pa[1] - 8)} L ${pa[0]} ${pa[1]} Z`, blanc(h.a.arete)));
    out.push(h.chemin(Ql([[XE, LARG, ZC], [XP, LARG, ZC]]), h.a.detail));
    const nd = Q(XP, LARG, ZC);
    out.push(h.ellipse(nd[0], nd[1], 4.2, 2.4, h.a.detail));   // le tour mort sur le piquet
    // la bêche : lame dans le plan Y = yl, bas de lame à Z = zb, milieu en X = xm
    const beche = (xm, yl, zb, fantome = false) => {
      const o = [];
      const cont = fantome ? h.a.cache : blanc(h.a.contour);
      const x0 = xm - LAME.l / 2, x1 = xm + LAME.l / 2, zt = zb + LAME.h;
      const lame = [[x0, yl, zt], [x0, yl, zb + 18], [x0 + 4, yl, zb + 4], [x0 + 18, yl, zb], [x1 - 18, yl, zb], [x1 - 4, yl, zb + 4], [x1, yl, zb + 18], [x1, yl, zt]];
      o.push(h.chemin(Ql(lame), cont, true));
      if (!fantome) o.push(h.chemin(Ql([[x0, yl, zt - 18], [x1, yl, zt - 18]]), h.a.detail));   // le marchepied replié
      const douille = [[xm - 36, yl, zt], [xm - MANCHE / 2 - 2, yl, zt + DOUILLE], [xm + MANCHE / 2 + 2, yl, zt + DOUILLE], [xm + 36, yl, zt]];
      o.push(h.chemin(Ql(douille), cont, true));
      if (!fantome) for (const dz of [50, 105]) o.push(h.cercle(...Q(xm, yl, zt + dz), 1.4, h.a.plein));
      const zc = zt + DOUILLE + CASSE;
      const g0 = Q(xm + MANCHE / 2, yl, zt + DOUILLE), g1 = Q(xm + MANCHE / 2, yl, zc);
      const d0 = Q(xm - MANCHE / 2, yl, zt + DOUILLE), d1 = Q(xm - MANCHE / 2, yl, zc - 22);
      const m1 = [r1((g1[0] + d1[0]) / 2), r1((g1[1] + d1[1]) / 2)];
      o.push(h.path(`M ${g0.join(' ')} L ${g1.join(' ')} Q ${r1(g1[0] - 1)} ${r1(m1[1] + 3)} ${m1.join(' ')} T ${d1.join(' ')} L ${d0.join(' ')}`, fantome ? h.a.cache : blanc(h.a.contour)));
      return { svg: o.join('\n'), x0, x1, zt };
    };
    // le bord meuble, de XB à l'est : il passe devant le talus et devant la lame
    const bourre = () => {
      const o = [];
      const bosse = (X, k) => 10 * Math.sin(X / 23 + k) + 6 * Math.sin(X / 9 + 2 * k);
      const ouest = BOURRE.map(([Y, Zz], i) => [XB + (i > 1 ? bosse(Y, 1) : 0), Y, Zz]);
      const pied = [];
      for (let X = XB; X <= XE; X += 30) pied.push([X, BOURRE[BOURRE.length - 1][0] + bosse(X, 0) * 2, 0]);
      const est = BOURRE.map(([Y, Zz]) => [XE, Y, Zz]).reverse();
      const crete = [[XE, LARG, HAUT], [XB, LARG, HAUT]];
      o.push(h.path(lisse(Ql([...ouest, ...pied.slice(1, -1), ...est.slice(0, -1)])) + ` L ${Ql(crete).map(p => p.join(' ')).join(' L ')} Z`, blanc(h.a.arete)));
      o.push(h.path(lisse(Ql(ouest)), h.a.arete));
      // des mottes : sur le bord meuble, et quelques-unes tombées au pied
      const zB = Y => {
        for (let i = 0; i < BOURRE.length - 1; i++) {
          const [y0, z0] = BOURRE[i], [y1, z1] = BOURRE[i + 1];
          if (Y >= y0 && Y <= y1) return z0 + (z1 - z0) * (Y - y0) / (y1 - y0);
        }
        return 0;
      };
      const motte = (X, Y, Zz, r, k) => {
        const [cx, cy] = Q(X, Y, Zz);
        const pts = [];
        for (let i = 0; i < 7; i++) {
          const an = i * 2 * Math.PI / 7 + k;
          const rr = r * (0.78 + 0.22 * Math.sin(3 * i + 2 * k));
          pts.push([cx + rr * Math.cos(an), cy + 0.72 * rr * Math.sin(an)]);
        }
        return h.path(lisse(pts, true), blanc(h.a.fin));
      };
      const mottes = [[430, 1340, 5.5, 0.3], [520, 1400, 6.5, 1.1], [455, 1470, 5, 2.2], [540, 1520, 4.5, 0.7], [400, 1545, 5.5, 1.7], [490, 1580, 4, 2.9], [330, 1590, 4.5, 0.2], [250, 1655, 4, 1.4], [150, 1640, 3.5, 2.5], [300, 1665, 3, 0.9]];
      for (const [X, Y, r, k] of mottes) o.push(motte(X, Y, Y > 1600 ? 6 : zB(Y) + 8, r, k));
      return o.join('\n');
    };
    let geste = {};
    if (!tranche) {
      // trancher : la lame enfoncée d'aplomb au ras du cordeau ; ce qui est dans la terre, en tireté
      const xm = XB + LAME.l / 2, yl = LARG + 12;
      const b = beche(xm, yl, 0);
      out.push(b.svg, bourre());
      out.push(h.chemin(Ql([[b.x0, yl, HAUT - 4], [b.x0, yl, 18], [b.x0 + 18, yl, 0], [b.x1 - 18, yl, 0], [b.x1, yl, 18], [b.x1, yl, HAUT - 2]]), h.a.cache));
      const f0 = Q(b.x0 - 70, yl, 560), f1 = Q(b.x0 - 70, yl, 380);
      out.push(h.geste(`M ${f0.join(' ')} L ${f1.join(' ')}`));   // la charte : le geste, enfoncer
      geste = { lame: Q(xm + 30, yl, 225), bourre: Q(470, 1470, 60), talus: Q(90, LARG, 80), cordeau: Q(-90, LARG, ZC) };
    } else {
      // battre : la lame à plat contre le talus, le dos au talus ; avant le coup, en tireté
      const xm = 300, recul = 170;
      const b = beche(xm, LARG + 8, 0);
      out.push(b.svg);
      // La charte : une seule flèche du geste par vue, en rouge : le coup, à plat, au milieu de la lame
      {
        const f0 = Q(xm, LARG + recul + 150, 130), f1 = Q(xm, LARG + 30, 130);
        out.push(h.geste(`M ${f0.join(' ')} L ${f1.join(' ')}`));
      }
      geste = { lame: Q(xm + 60, LARG + 8, 245), talus: Q(470, LARG, 60) };
    }
    return { svg: out.join('\n'), Q, geste };
  };

  const memo = {};
  const vue = (id, f) => z => { const k = `${id}:${z.l}x${z.h}`; if (!memo[k]) memo[k] = f(z); return memo[k]; };
  const becher = vue('becher', vueBecher), soleil = vue('soleil', vueSoleil);
  const trancher = vue('trancher', z => bloc(z, 'trancher')), battre = vue('battre', z => bloc(z, 'battre'));

  return {
    ref: '97-03',
    titre: 'L’ados à la bêche',
    desc: 'L’ados en coupe nord-sud et en bloc : une bande est-ouest de 1280 mm qu’on baisse de 160 mm au sud et relève de 160 mm au nord en rejetant la terre d’un côté à l’autre, soit 320 mm de pente vers le sud ; le bord nord se tranche d’aplomb à la bêche au ras d’un cordeau tendu sur la crête, puis se bat au dos de la bêche en talus presque vertical ; le soleil de midi des équinoxes, à 40° sur le sol plat, frappe la pente à 54°.',
    format: 'pleine',
    disposition: [['becher'], ['trancher', 'battre'], ['soleil']],
    hauteurs: [1, 1.55, 1.05],
    vues: {
      becher: {
        titre: 'Bêcher, en coupe : le sud à gauche, le nord à droite',
        dessin: z => becher(z).svg,
        renvois: z => {
          const { P } = becher(z);
          return [
            { n: 1, rond: [P(330, 0)[0], 12], cible: P(330, 0), texte: 'le sol d’avant' },
            { n: 2, rond: [P(-240, 0)[0], 12], cible: P(90, -45), texte: 'la terre bêchée du côté sud…' },
            { n: 3, rond: [P(1180, 0)[0], 14], cible: P(1150, 55), texte: '… rejetée du côté nord' },
          ];
        },
      },
      trancher: {
        titre: 'Trancher le bord nord au cordeau',
        dessin: z => trancher(z).svg,
        renvois: z => {
          const { geste } = trancher(z);
          return [
            { n: 4, rond: [z.l - 14, geste.cordeau[1] - 40], cible: geste.cordeau, texte: 'le cordeau tendu sur la crête' },
            { n: 5, rond: [geste.lame[0] - 70, geste.lame[1] - 40], cible: geste.lame, texte: 'la bêche enfoncée d’aplomb au ras du cordeau' },
            { n: 6, rond: [geste.bourre[0] - 40, z.h - 12], cible: geste.bourre, texte: 'le bord meuble, pas encore tranché' },
          ];
        },
      },
      battre: {
        titre: 'Battre au dos de la bêche',
        dessin: z => battre(z).svg,
        renvois: z => {
          const { geste } = battre(z);
          return [
            { n: 7, rond: [geste.lame[0] - 60, geste.lame[1] - 50], cible: geste.lame, texte: 'le dos de la lame frappe à plat' },
            { n: 8, rond: [geste.talus[0] - 20, z.h - 12], cible: geste.talus, texte: 'le talus presque vertical' },
          ];
        },
      },
      soleil: {
        titre: 'À midi, aux équinoxes',
        dessin: z => soleil(z).svg,
        renvois: z => {
          const { P } = soleil(z);
          return [
            { n: 9, rond: [P(-230, 0)[0], 14], cible: P(-430 - 300 * dir[0], -300 * dir[1]), texte: 'le soleil de midi, plus d’aplomb sur l’ados' },
            { n: 10, rond: [P(1420, 0)[0], 14], cible: P(1190, surf(1190)), texte: 'la pente, face au sud' },
          ];
        },
      },
    },
  };
};
