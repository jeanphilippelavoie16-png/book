// Planche 13-11 (petite planche, une colonne). La lentille de glace : le disque bombé des deux côtés, poli à la
// paume nue, retourné ; puis tenu par le bord face au soleil, l'avant-bras couché sur une bûche, le cône de lumière
// qui se resserre jusqu'au point, sur une cible sombre. Le texte : section « Le soleil, sans loupe » et étapes 22 à
// 24. Corrigée le 16 octobre 2026 après le second regard (optique, prise, appui, ordre des repères) ; les mains
// refaites le 19 octobre 2026 avec h.formes.mainStock (les deux mains étaient des mainSimple, retirées).
//
// Mains : h.formes.mainStock seulement (brief-agent.md), rien de redessiné, rien de déformé.
//   la paume qui polit   1-08 « tige-a-plat » sans son objet, en miroir (les doigts vers la gauche) : la main à plat,
//                        paume vers le bas, posée sur le haut du bombé (comme frotter dans 04-41) ; l'avant-bras
//                        continue ses deux bords et sort par le bord droit de la vue.
//   la main qui tient    2-06 « carte-pincee » sans son objet, en miroir (elle vient de la droite), penchée de -40°,
//                        presque la pose de la feuille des mains : le pouce dessus, l'index replié dessous ; le bout du
//                        disque est pris entre les deux, et le disque se place où était la carte du fichier, sur son
//                        axe. L'avant-bras continue les deux bords de la main (les segments du dessin qui finissent à la
//                        coupe, pris à 2,5 unités de la coupe, sans marche), descend vers la droite, couché sur une
//                        bûche vue par le bout, et sort par le bord de la vue.
//   (Second regard du 19 octobre 2026 : la même 2-06 tournée de 118° pour coucher l'avant-bras à gauche faisait une
//   crête de doigts mous, un index en griffe et un pouce en boudin ; la 2-04 « plaque-cote » mettait le pouce le long
//   du disque, du côté du soleil, dans le chemin des rayons. 1-05 « pince-cylindre » écartée : l'écart entre le pouce et
//   l'index est celui d'un bouchon, trois fois l'épaisseur du bord du disque ; le disque y flottait.)
// L'optique : le disque vu de biais (une ellipse), perpendiculaire aux rayons ; l'axe de la carte de 2-06, tourné avec
// la main, donne le grand axe de l'ellipse, et le soleil vient d'en haut à gauche, perpendiculaire à cet axe (50° au-
// dessus de l'horizon). Les rayons arrivent sur la partie libre du disque, hors de la main ; le cône part de la face de
// l'autre côté, dans l'axe des rayons, et passe sous l'avant-bras jusqu'au point sur la cible. Aucune cote : « large
// comme la main » se lit par la main posée dessus.

module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => Math.round(v * 10) / 10;
  const deg = a => a * Math.PI / 180;
  const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
  const mul = (p, k) => [p[0] * k, p[1] * k];
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const coupe = (id, z, svg) => `<clipPath id="vue-${id}-1311"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#vue-${id}-1311)">\n${svg}\n</g>`;
  const gen = s => { let g = s; return () => (g = (g * 16807) % 2147483647) / 2147483647; };
  const CAT = require('../../.claude/skills/planches/scripts/mains/stock.js').catalogue;

  // Du fichier d'une main de la bibliothèque à la vue : le même passage que mainStock (taille, miroir, angle, ancre).
  const versVue = (id, o) => {
    const M = CAT[id], [bx0, by0, bx1, by1] = M.boite, k = o.taille / Math.max(bx1 - bx0, by1 - by0), sx = o.miroir ? -1 : 1;
    const an = o.ancre || (M.objet ? 'objet' : 'centre');
    const A0 = an === 'objet' ? [M.objet.x, M.objet.y] : [(bx0 + bx1) / 2, (by0 + by1) / 2];
    const c = Math.cos(deg(o.angle || 0)), s = Math.sin(deg(o.angle || 0));
    return ([px, py]) => { const u = sx * k * (px - A0[0]), v = k * (py - A0[1]); return [o.x + c * u - s * v, o.y + s * u + c * v]; };
  };
  // L'avant-bras prolongé jusqu'au bord de la vue : chaque bord part un peu en dedans de la coupe du fichier, dans la
  // direction du bord de la main (haut, bas : [point, direction vers le coude] relevés sur le dessin de la main, ou le
  // segment de Bézier du dessin qui finit à la coupe), se courbe sur Lc jusqu'à l'axe de l'avant-bras et file droit ;
  // un fond blanc couvre la coupe du fichier.
  const avantBras = (T, haut, bas, Lc = 16, L = 300) => {
    const dir = bord => {
      // un bord donné par le segment de Bézier du dessin de la main qui finit à la coupe ({ bez, bout } : bout = 0 ou 1,
      // le bout du segment à la coupe) : on part du point du segment à 2,5 unités de la coupe, dans la direction du
      // segment en ce point ; le nouveau trait se raccorde au trait du fichier sans marche
      if (bord.bez) {
        const Q = bord.bez.map(T), at = t => { const u = 1 - t; return [0, 1].map(k => u * u * u * Q[0][k] + 3 * u * u * t * Q[1][k] + 3 * u * t * t * Q[2][k] + t * t * t * Q[3][k]); };
        const der = t => { const u = 1 - t; return [0, 1].map(k => 3 * u * u * (Q[1][k] - Q[0][k]) + 6 * u * t * (Q[2][k] - Q[1][k]) + 3 * t * t * (Q[3][k] - Q[2][k])); };
        const fin = at(bord.bout); let t = bord.bout;
        for (let i = 0; i < 400; i++) { const tt = bord.bout ? 1 - i / 400 : i / 400; const q = at(tt); if (Math.hypot(q[0] - fin[0], q[1] - fin[1]) >= 2.5) { t = tt; break; } }
        const p = at(t), dv = der(t), sg = bord.bout ? 1 : -1, n = Math.hypot(dv[0], dv[1]);
        return [p, [sg * dv[0] / n, sg * dv[1] / n]];
      }
      const [p, d] = bord;
      const a = T(p), b = T([p[0] + d[0], p[1] + d[1]]), n = Math.hypot(b[0] - a[0], b[1] - a[1]); const u = [(b[0] - a[0]) / n, (b[1] - a[1]) / n]; return [[a[0] - u[0] * 2, a[1] - u[1] * 2], u];
    };
    const [t0, dt] = dir(haut), [b0, db] = dir(bas);
    let ax = add(dt, db); ax = mul(ax, 1 / Math.hypot(ax[0], ax[1]));
    const B = (p0, d0) => { const e = add(p0, mul(ax, Lc)); return { c1: add(p0, mul(d0, Lc / 2)), c2: add(e, mul(ax, -Lc / 2)), e, fin: add(e, mul(ax, L)) }; };
    const H = B(t0, dt), Bb = B(b0, db), P = q => `${f(q[0])} ${f(q[1])}`;
    const trait = 'fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"';
    const bordH = `M ${P(t0)} C ${P(H.c1)} ${P(H.c2)} ${P(H.e)} L ${P(H.fin)}`, bordB = `M ${P(b0)} C ${P(Bb.c1)} ${P(Bb.c2)} ${P(Bb.e)} L ${P(Bb.fin)}`;
    return {
      svg: [h.path(`${bordH} L ${P(Bb.fin)} L ${P(Bb.e)} C ${P(Bb.c2)} ${P(Bb.c1)} ${P(b0)} Z`, A.blanc), h.path(`${bordH} ${bordB}`, trait)].join('\n'),
      // le bord de dessous (le plus bas des deux), en droite au-delà de la courbe : pour y poser la bûche
      dessous: x => Math.max(Bb.e[1] + (x - Bb.e[0]) * ax[1] / ax[0], H.e[1] + (x - H.e[0]) * ax[1] / ax[0]),
      dessus: x => Math.min(Bb.e[1] + (x - Bb.e[0]) * ax[1] / ax[0], H.e[1] + (x - H.e[0]) * ax[1] / ax[0]),
    };
  };

  // La lentille vue par la tranche : deux arcs, plus épaisse au centre, mince au bord. c : le centre ; ax : la
  // direction du diamètre (unitaire) ; D : le diamètre ; ep : le bombé (la courbe quadratique monte à ep / 2 de
  // chaque côté). bord : la largeur de l'ellipse du bord quand le disque est vu de biais (0 : de pleine tranche).
  const lentille = (c, ax, D, ep, bord = 0) => {
    const n = [-ax[1], ax[0]], ang = Math.atan2(ax[1], ax[0]) * 180 / Math.PI, out = [];
    if (!bord) {
      const a = add(c, mul(ax, -D / 2)), b = add(c, mul(ax, D / 2));
      const h1 = add(c, mul(n, -ep)), h2 = add(c, mul(n, ep));
      out.push(h.path(`M ${f(a[0])} ${f(a[1])} Q ${f(h1[0])} ${f(h1[1])} ${f(b[0])} ${f(b[1])} Q ${f(h2[0])} ${f(h2[1])} ${f(a[0])} ${f(a[1])} Z`, blanc(A.contour)));
    } else {
      // vu de biais : la silhouette est une ellipse étroite ; dedans, le bord du disque (une ellipse plus mince, poussée
      // vers la face de derrière) : entre les deux, le bombé de la face qui regarde le soleil
      const ry = bord + ep / 2;
      out.push(`<ellipse cx="${f(c[0])}" cy="${f(c[1])}" rx="${f(D / 2)}" ry="${f(ry)}" transform="rotate(${f(ang)} ${f(c[0])} ${f(c[1])})" ${blanc(A.contour)}/>`);
      const cb = add(c, mul(n, ep * 0.42));
      out.push(`<ellipse cx="${f(cb[0])}" cy="${f(cb[1])}" rx="${f(D / 2 * 0.97)}" ry="${f(bord)}" transform="rotate(${f(ang)} ${f(cb[0])} ${f(cb[1])})" ${A.detail}/>`);
    }
    // deux reflets courts : la glace est claire
    const k = bord ? 1.6 : 1;
    const r1 = [add(add(c, mul(ax, -D * 0.24)), mul(n, -ep * 0.26 * k)), add(add(c, mul(ax, -D * 0.06)), mul(n, -ep * 0.34 * k))];
    const r2 = [add(add(c, mul(ax, -D * 0.16)), mul(n, -ep * 0.04 * k)), add(add(c, mul(ax, -D * 0.02)), mul(n, -ep * 0.1 * k))];
    out.push(h.chemin(r1, A.detail), h.chemin(r2, A.detail));
    return out.join('\n');
  };

  // ── Vue 1 : polir ── le disque de pleine tranche, la paume à plat dessus, l'avant-bras jusqu'au bord droit ; à
  // gauche, une petite vignette : le disque seul, de profil, et une flèche qui le fait basculer (on le retourne). Le
  // disque a la taille de celui de la vue 2.
  const MAIN_POLIR = { id: 'tige-a-plat', objet: false, miroir: true, taille: 104, angle: -6, ancre: 'centre' };
  const polir = z => {
    const e = 0.42, c = [z.l * 0.6, z.h - 9], D = 110 * e, ep = 15 * e;
    const v = [38, z.h - 20], Dv = 46, epv = 8;
    return { e, c, D, ep, v, Dv, epv };
  };
  const mainPolir = g => {
    // la paume posée : le dessous de la paume (le point (5018 ; 551,6) du fichier 1-08) tombe sur le haut du bombé, au
    // milieu du disque
    const o0 = Object.assign({}, MAIN_POLIR, { x: 0, y: 0 }), T0 = versVue('1-08', o0), p = T0([5018.38, 551.624]);
    const o = Object.assign({}, MAIN_POLIR, { x: g.c[0] - p[0] + 6, y: g.c[1] - g.ep * 0.5 - p[1] + 0.6 });
    const m = F.mainStock(o), T = versVue('1-08', o);
    const ab = avantBras(T, [[4648.38, 328.112], [-32.8, 1.7]], [[4660.35, 518.086], [-64.3, 6.0]]);
    return { m, ab, bout: T([5260.7, 460.5]), haut: m.boite.y0 };
  };

  // ── Vue 2 : au soleil ──
  // La main : 2-06 « carte-pincee » sans sa carte, en miroir (elle vient de la droite), penchée de SOLEIL_ANGLE : le
  // pouce dessus, l'index replié dessous, comme sur la feuille des mains. Le disque prend la place de la carte, sur son
  // axe : son bout pris entre le pouce et l'index, le reste qui dépasse vers le bas à gauche ; son grand axe suit l'axe
  // de la carte. Le soleil arrive perpendiculaire à ce grand axe, d'en haut à gauche, et le cône part vers le bas à
  // droite, sous l'avant-bras. L'avant-bras continue les deux bords de la main et descend vers la droite sur une bûche.
  const SOLEIL_ANGLE = -40, SOLEIL_TAILLE = 85, SOLEIL_S = 12, XL_BUCHE = 40, XM_MAIN = 150;
  const CONE = [0.45, -0.86], RAYONS = [0.2, -0.2, -0.6];   // le long du grand axe (+ vers la main) : les bords du cône, les rayons
  const RAPPORT = 0.38;                                     // le petit axe de l'ellipse sur le grand : le disque de biais
  const soleil = z => {
    const yS = z.h - 4, e = 0.42, D = 110 * e, ep = 15 * e, S = SOLEIL_S, RL = 13, xl = z.l - XL_BUCHE, XM = XM_MAIN;
    // la main posée d'abord en y = 0, puis descendue pour que le dessous de l'avant-bras touche le dessus de la bûche
    const pose = y => {
      const o = { id: 'carte-pincee', objet: false, miroir: true, angle: SOLEIL_ANGLE, taille: SOLEIL_TAILLE, x: XM, y };
      const T = versVue('2-06', o);
      return { o, T, ab: avantBras(T, { bez: [[2252.88, 1329.26], [2272.9, 1300.29], [2293.93, 1269.7], [2310.59, 1238.67]], bout: 0 },
        { bez: [[2450.44, 1252.49], [2444.91, 1262.17], [2374.31, 1378.42], [2367.77, 1392.43]], bout: 1 }) };
    };
    const y0 = pose(0), P = pose(yS - 2 * RL - y0.ab.dessous(xl));
    const m = F.mainStock(P.o);
    const loinMain = [Math.cos(deg(m.objet.angle)), Math.sin(deg(m.objet.angle))];   // l'axe de la carte, vers le bout libre
    const ax = mul(loinMain, -1);                                                    // le grand axe, vers le haut à droite
    const d = [-ax[1], ax[0]];                                                       // les rayons, vers le bas à droite
    const Lc = add([m.objet.x, m.objet.y], mul(loinMain, S));
    const fz = ((yS - 2) - Lc[1]) / d[1];
    const Fp = add(Lc, mul(d, fz));
    return { yS, e, D, ep, o: P.o, m, ax, d, Lc, ab: P.ab, xl, rl: RL, Fp, dessus: P.ab.dessus };
  };

  return {
    ref: '13-11',
    titre: 'La lentille de glace',
    desc: 'Deux vues. En haut, le disque de glace vu par la tranche, plus épais au centre qu’au bord, la paume nue posée à plat dessus qui le frotte d’avant en arrière, et le même disque retourné pour frotter l’autre côté. En bas, le soleil en haut à gauche : les rayons parallèles arrivent sur le disque, tenu par le bout entre le pouce, dessus, et l’index replié, dessous, la main qui vient de la droite et l’avant-bras couché sur une bûche ; le disque, vu de biais, est perpendiculaire aux rayons, et le cône de lumière part de sa face de l’autre côté, passe sous l’avant-bras et se resserre jusqu’à un petit point sur une cible sombre posée au sol, qui fume.',
    format: 'quart',
    disposition: [['polir'], ['soleil']],
    hauteurs: [0.8, 1.2],
    vues: {
      polir: {
        titre: 'Bomber à la paume, des deux côtés',
        dessin: z => {
          const g = polir(z), out = [];
          out.push(lentille(g.c, [1, 0], g.D, g.ep));
          const mp = mainPolir(g);
          out.push(String(mp.m.svg), mp.ab.svg);
          // le geste : frotter, d'avant en arrière, le long de la paume (juste au-dessus de la main)
          const yA = Math.max(6, mp.haut - 6);
          out.push(h.geste(`M ${f(g.c[0] - 34)} ${f(yA)} L ${f(g.c[0] + 34)} ${f(yA)}`, { double: true }));
          // la vignette : le disque seul, de profil, et une flèche courbe qui le fait basculer par-dessus
          out.push(lentille(g.v, [1, 0], g.Dv, g.epv));
          const r = g.Dv / 2 + 2, y0 = g.v[1] - g.epv - 2;
          out.push(h.fleche(`M ${f(g.v[0] + r)} ${f(y0)} A ${f(r)} ${f(r * 0.8)} 0 0 0 ${f(g.v[0] - r)} ${f(y0)}`, A.arete));
          // un filet entre la vignette et le dessin principal
          const xf = (g.v[0] + g.Dv / 2 + Math.min(mp.bout[0], g.c[0] - g.D / 2)) / 2;
          out.push(h.ligne(xf, 8, xf, z.h - 4, A.fin));
          return coupe('polir', z, out.join('\n'));
        },
        renvois: z => {
          const g = polir(z), yA = Math.max(6, mainPolir(g).haut - 6);
          const r = g.Dv / 2 + 2, y0 = g.v[1] - g.epv - 2;
          return [
            { n: 1, rond: [g.c[0] - g.D / 2 - 18, z.h - 11], cible: [g.c[0] - g.D / 2 + 3, g.c[1] + 0.4], texte: 'mince au bord, épais au centre' },
            { n: 2, rond: [g.c[0] - 54, Math.max(11, yA + 3)], cible: [g.c[0] - 30, yA], texte: 'frotter à la paume nue, d’avant en arrière' },
            { n: 3, rond: [g.v[0] + r + 14, Math.max(11, y0 - r * 0.8 - 4)], cible: [g.v[0] + r * 0.5, y0 - r * 0.7], texte: 'retourner, frotter l’autre côté' },
          ];
        },
      },
      soleil: {
        titre: 'Le point sur la cible, calé',
        dessin: z => {
          const g = soleil(z), out = [], r = gen(7);
          // le sol
          out.push(h.ligne(0, g.yS, z.l, g.yS, A.arete));
          // la bûche, vue par le bout : le fût qui fuit derrière, vers le haut à droite ; le bout rond devant, l'écorce en
          // bande, deux cernes autour d'un cœur décentré, une gerce
          const cx = g.xl, cy = g.yS - g.rl, R = g.rl, V = [R * 0.9, -R * 0.5];
          const nb = [-V[1], V[0]], L = Math.hypot(...nb), nn = [nb[0] / L * R, nb[1] / L * R];
          out.push(h.path(`M ${f(cx + nn[0])} ${f(cy + nn[1])} L ${f(cx + nn[0] + V[0])} ${f(cy + nn[1] + V[1])} A ${f(R)} ${f(R)} 0 0 0 ${f(cx - nn[0] + V[0])} ${f(cy - nn[1] + V[1])} L ${f(cx - nn[0])} ${f(cy - nn[1])} Z`, blanc(A.arete)));
          let ec = '';
          for (let k = 0; k < 4; k++) { const w = (k / 3 - 0.5) * 1.2, a0 = [cx + nn[0] * w * 0.9 + V[0] * 0.25, cy + nn[1] * w * 0.9 + V[1] * 0.25]; ec += `M ${f(a0[0])} ${f(a0[1])} l ${f(V[0] * 0.45)} ${f(V[1] * 0.45)} `; }
          out.push(h.path(ec, A.fin));
          out.push(h.cercle(cx, cy, R, blanc(A.arete)));
          out.push(h.cercle(cx, cy, R * 0.84, A.detail));
          const pc = [cx + R * 0.12, cy + R * 0.08];
          [0.32, 0.6].forEach((k, i) => out.push(`<circle cx="${f(pc[0])}" cy="${f(pc[1])}" r="${f(R * 0.84 * k)}" ${A.fin} stroke-dasharray="${f(R * 3 * k)} ${f(R * 0.7 * k)}" stroke-dashoffset="${f(i * 7)}"/>`));
          out.push(h.cercle(pc[0], pc[1], 0.8, A.plein));
          out.push(h.path(`M ${f(pc[0] + 1)} ${f(pc[1] - 1.5)} L ${f(cx + R * 0.5)} ${f(cy - R * 0.68)} L ${f(cx + R * 0.58)} ${f(cy - R * 0.6)} Z`, A.plein));
          // le cône : des deux bouts du disque, dans l'axe des rayons, jusqu'au point ; peint d'abord, le disque et la
          // main cachent ce qui est derrière eux
          const a = g.D / 2, b = a * RAPPORT;
          CONE.forEach(s => { const q = add(g.Lc, mul(g.ax, s * a)); out.push(h.ligne(q[0], q[1], g.Fp[0], g.Fp[1], A.detail)); });
          out.push(h.ligne(g.Lc[0], g.Lc[1], g.Fp[0], g.Fp[1], A.fin));
          // le disque, vu de biais ; puis la main qui le tient par le bord, et son avant-bras couché sur la bûche
          out.push(lentille(g.Lc, g.ax, g.D, g.ep, b - g.ep / 2));
          out.push(String(g.m.svg), g.ab.svg);
          // les rayons du soleil, parallèles, jusqu'à la face du disque qui regarde le soleil
          RAYONS.forEach(s => {
            const q = add(add(g.Lc, mul(g.ax, s * a)), mul(g.d, -b * Math.sqrt(1 - s * s) - 0.8));
            const p0 = add(q, mul(g.d, -40));
            out.push(h.fleche(`M ${f(p0[0])} ${f(p0[1])} L ${f(q[0])} ${f(q[1])}`, A.fin));
          });
          // la cible : un morceau d'amadou carbonisé, noir, posé au sol ; le filet de fumée
          const C = g.Fp;
          out.push(h.path(`M ${f(C[0] - 11)} ${f(g.yS)} C ${f(C[0] - 10)} ${f(g.yS - 4)} ${f(C[0] - 3)} ${f(g.yS - 5.5)} ${f(C[0] + 2)} ${f(g.yS - 5)} C ${f(C[0] + 8)} ${f(g.yS - 5)} ${f(C[0] + 12)} ${f(g.yS - 3)} ${f(C[0] + 13)} ${f(g.yS)} Z`, A.plein));
          out.push(h.path(`M ${f(C[0] + 1)} ${f(g.yS - 8)} C ${f(C[0] + 7)} ${f(g.yS - 16)} ${f(C[0] - 3)} ${f(g.yS - 22)} ${f(C[0] + 4)} ${f(g.yS - 32)}`, A.detail));
          // le point à contrôler : le plus petit point de lumière
          out.push(h.controle(C[0], C[1] - 3, 6));
          return coupe('soleil', z, out.join('\n'));
        },
        renvois: z => {
          const g = soleil(z), C = g.Fp;
          return [
            { n: 4, rond: [C[0] - 44, g.yS - 12], cible: [C[0] - 10, g.yS - 1.5], texte: 'une cible sombre et sèche' },
            { n: 5, rond: [C[0] + 30, g.yS - 16], cible: [C[0] + 5.5, C[1] - 4], texte: 'cercle : le plus petit point' },
            { n: 6, rond: [z.l - 14, g.dessus(z.l - 14) - 22], cible: [g.xl - 6, g.dessus(g.xl - 6) + 0.6], texte: 'avant-bras calé sur une bûche' },
          ];
        },
      },
    },
  };
};
