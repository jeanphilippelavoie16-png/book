// Planche 25-42. Des mitaines dans une manche de chandail (chapitre 25, §9, « Des mitaines dans
// une manche de chandail »).
// Dessinée le 15 octobre 2026 (inventaire des planches, priorité moyenne).
// Ce que dit le chapitre : une manche de chandail de laine coupée au coude, le poignet gardé côté
// poignet, le bout cousu, le pouce taillé dans le reste du chandail (ch. 104) ; quatre doigts
// ensemble se partagent leur chaleur.
// Ce que le chapitre ne dit pas et que la planche dessine en principe, sans cote : la main posée à
// plat sur la manche sert de mesure (le poignet sur le poignet de tricot, le bout cousu un peu passé
// le bout des doigts) ; le pouce sort par une fente dans le pli de la manche, à la base du pouce ; la
// pièce du pouce est un rectangle plié en deux, cousu sur le long et arrondi au bout, en tube fermé,
// puis cousu tout autour de la fente. Construction de couture courante, non sourcée ici : voir le
// rapport de la planche [À VÉRIFIER].
// Aucune cote : le chapitre n'en donne pas ; la main donne l'échelle. Proportions du chandail (mm) :
// corps 520 de large, manches de 600 à 50° sous l'horizontale, 220 à l'aisselle, 110 au poignet.
// La main : mainSimple, à plat, vue du dos (le pouce collé à l'index, caché dessous).
// Charte : la manche et la pièce du pouce pèsent, le chandail est fin. Rouge : le cercle sur la
// fente (l'endroit qu'on rate) ; pas de flèche de geste, rien ne bouge.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const RAD = Math.PI / 180;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const lisse = (pts, ferme = false) => {
    const n = pts.length, P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      d += ` C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  // la couture : un trait tireté serré, le point avant
  const COUTURE = `fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-dasharray="4 2.6" stroke-linecap="butt"`;
  // la ligne de coupe : trait mixte
  const COUPE = `fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-dasharray="9 3 2 3"`;
  // les côtes d'un poignet de tricot, parallèles à l'axe u, entre deux bords a0-a1 (le bout) et b0-b1
  const cotes = (a0, a1, u, l, n) => {
    const o = [];
    for (let k = 1; k < n; k++) { const p = lerp(a0, a1, k / n); o.push(h.ligne(p[0], p[1], p[0] + u[0] * l, p[1] + u[1] * l, A.detail)); }
    return o.join('\n');
  };

  // ─── 1. Le chandail, à plat : ce qu'on coupe ────────────────────────────────────────────────
  const chandail = z => {
    const o = [], P = {};
    const k = Math.min((z.l - 30) / 1300, (z.h - 8) / 660);
    const ox = z.l / 2, oy = 4;
    const T = p => [ox + p[0] * k, oy + p[1] * k];
    const u = [Math.cos(50 * RAD), Math.sin(50 * RAD)];
    const manche = s => {
      const us = [s * u[0], u[1]], ns = [-s * u[1], u[0]];            // vers le poignet ; vers le dessous
      const ep = [s * 250, 40], ais = [s * 250, 270];
      const p1 = add(ep, mul(us, 600)), p2 = add(p1, mul(ns, 110));
      return { ep, ais, p1, p2, us, ns };
    };
    const g = manche(-1), d = manche(1);
    const corps = [[-90, 0], g.ep, g.p1, g.p2, g.ais, [-250, 650], [250, 650], d.ais, d.p2, d.p1, d.ep, [90, 0]];
    o.push(h.path(`M${corps.map(p => T(p).map(f1).join(' ')).join(' L')} Q${T([0, 70]).map(f1).join(' ')} ${T([-90, 0]).map(f1).join(' ')} Z`, W(A.arete)));
    // l'encolure, le bas et les poignets de tricot
    o.push(h.path(`M${T([-110, 0]).map(f1).join(' ')} Q${T([0, 96]).map(f1).join(' ')} ${T([110, 0]).map(f1).join(' ')}`, A.detail));
    o.push(h.ligne(...T([-250, 590]), ...T([250, 590]), A.detail));
    for (let x = -240; x < 250; x += 20) o.push(h.ligne(...T([x, 594]), ...T([x, 646]), A.fin));
    // les côtes des poignets : un motif de traits parallèles à la manche, découpé par le poignet
    [g, d].forEach((m, i) => {
      const a0 = add(m.p1, mul(m.us, -60)), a1 = add(m.p2, mul(m.us, -60));
      const id = `vue-cotes-2542-${i}`, ang = Math.atan2(m.us[1], m.us[0]) / RAD - 90, pas = 3.2;
      o.push(`<defs><pattern id="${id}" width="${pas}" height="${pas}" patternUnits="userSpaceOnUse" patternTransform="rotate(${f1(ang)})"><line x1="0" y1="0" x2="0" y2="${pas}" stroke="#1A1A1A" stroke-width="0.5"/></pattern></defs>`);
      o.push(h.chemin([T(a0), T(m.p1), T(m.p2), T(a1)], `fill="url(#${id})" stroke="#1A1A1A" stroke-width="0.7" stroke-linejoin="round"`, true));
    });
    // la coupe au coude, en travers de la manche de gauche
    const c0 = add(g.ep, mul(g.us, 300)), c1 = lerp(g.ais, g.p2, 0.5);
    const e = 26;
    const v = [(c1[0] - c0[0]), (c1[1] - c0[1])], L = Math.hypot(v[0], v[1]), w = [v[0] / L, v[1] / L];
    const q0 = T(add(c0, mul(w, -e))), q1 = T(add(c1, mul(w, e)));
    o.push(h.ligne(q0[0], q0[1], q1[0], q1[1], COUPE));
    P.coupe = q0;
    // la pièce du pouce, tracée dans le bas du devant
    const r0 = T([70, 400]), r1 = T([190, 560]);
    o.push(h.rect(r0[0], r0[1], r1[0] - r0[0], r1[1] - r0[1], COUPE));
    P.pouce = [r1[0], r0[1] + 8];
    return { svg: o.join('\n'), P };
  };

  // ─── 2. La main pour mesure ─────────────────────────────────────────────────────────────────
  // La manche coupée, à plat, le poignet de tricot à gauche ; la main posée dessus, à plat, le
  // poignet sur le poignet de tricot. Repère en mm : x depuis le bout du poignet de tricot, y depuis
  // l'axe de la manche, vers le bas.
  const mesure = z => {
    const o = [], P = {};
    const k = Math.min((z.l - 70) / 340, (z.h - 16) / 150);
    const ox = (z.l - 318 * k) / 2, oy = z.h * 0.5 + 4;
    const T = p => [ox + p[0] * k, oy + p[1] * k];
    const hw = x => 54 + 18 * x / 330;                        // la demi-largeur de la manche aplatie
    const xBout = 318, xC = 62;
    // la manche : le pli du haut, le bout coupé, le pli du bas
    const haut = [], bas = [];
    for (let x = 0; x <= xBout + 0.1; x += 10) { haut.push(T([x, -hw(x)])); bas.push(T([x, hw(x)])); }
    o.push(h.chemin(haut.concat(bas.slice().reverse()), W(A.contour), true));
    o.push(h.ligne(...T([xC, -hw(xC)]), ...T([xC, hw(xC)]), A.arete));
    for (let y = -46; y <= 46; y += 8) o.push(h.ligne(...T([2, y * hw(0) / 54]), ...T([xC - 2, y * hw(xC) / 54]), A.detail));
    // la main à plat, vue du dos, le poignet juste passé le poignet de tricot
    // La main est dedans : son contour se dessine en tireté (arête cachée), sans les traits entre les
    // doigts ; l'avant-bras s'arrête au bout du poignet de tricot, il sort de la manche.
    const main = F.mainSimple({ x: T([xC + 4, 0])[0], y: T([xC + 4, 4])[1], pose: 'plat', vue: 'dos', echelle: k, angle: 0, ancre: 'poignet', avantbras: { longueur: xC + 4 } });
    o.push(String(main).split('\n').filter(l => !/fill="#FFFFFF"/.test(l) && !/stroke-width="0.7"/.test(l))
      .join('\n').replace(/stroke-width="1.5"/g, 'stroke-width="1" stroke-dasharray="5 3"'));
    // le bout cousu, un doigt passé le bout des doigts, les coins arrondis
    const xs = Math.min(xBout - 12, (main.boite.x1 - ox) / k + 22);
    const r = 22;
    o.push(h.path(lisse([T([xs - 34, -hw(xs) + 8]), T([xs - 10, -hw(xs) + 10]), T([xs, -hw(xs) + 10 + r]), T([xs, hw(xs) - 10 - r]), T([xs - 10, hw(xs) - 10]), T([xs - 34, hw(xs) - 8])]), COUTURE));
    P.bout = T([xs, 14]);
    // la fente, dans le pli du haut, à la base du pouce (entre le poignet et la jointure de l'index)
    const pm = main.articulations['index.mcp'], pw = main.poignet;
    const xf0 = (pw[0] - ox) / k + 14, xf1 = (pm[0] - ox) / k - 22;
    const f0 = T([xf0, -hw(xf0)]), f1_ = T([xf1, -hw(xf1)]);
    o.push(h.ligne(f0[0], f0[1], f1_[0], f1_[1], `fill="none" stroke="#1A1A1A" stroke-width="3.2" stroke-linecap="round"`));
    P.fente = [(f0[0] + f1_[0]) / 2, (f0[1] + f1_[1]) / 2];
    P.fenteL = Math.hypot(f1_[0] - f0[0], f1_[1] - f0[1]);
    P.poignet = T([xC * 0.45, hw(xC * 0.45)]);
    o.push(h.controle(P.fente[0], P.fente[1], P.fenteL / 2 + 9));
    return { svg: o.join('\n'), P };
  };

  // ─── 3. Le pouce : plié, cousu en tube ──────────────────────────────────────────────────────
  const pouce = z => {
    const o = [], P = {};
    const cx = z.l * 0.5, cy = z.h * 0.52;
    const w = 50, L = Math.min(122, z.h - 30);
    const x0 = cx - w / 2, yb = cy + L / 2, yt = cy - L / 2;
    // le pli à gauche (trait plein), le bord ouvert à droite ; la couture le long du bord et autour du bout
    o.push(h.path(`M${f1(x0)} ${f1(yb)} L${f1(x0)} ${f1(yt + 12)} Q${f1(x0)} ${f1(yt)} ${f1(x0 + 12)} ${f1(yt)} L${f1(x0 + w)} ${f1(yt)} L${f1(x0 + w)} ${f1(yb)} Z`, W(A.contour)));
    o.push(h.path(`M${f1(x0 + w - 8)} ${f1(yb - 3)} L${f1(x0 + w - 8)} ${f1(yt + 24)} Q${f1(x0 + w - 8)} ${f1(yt + 8)} ${f1(x0 + w - 26)} ${f1(yt + 8)} Q${f1(x0 + 8)} ${f1(yt + 8)} ${f1(x0 + 3)} ${f1(yt + 22)}`, COUTURE));
    // les côtes du tricot, en travers : on voit que c'est du chandail
    P.couture = [x0 + w - 8, cy + 6];
    P.pli = [x0, cy + 24];
    return { svg: o.join('\n'), P };
  };

  // ─── 4. La mitaine finie ───────────────────────────────────────────────────────────────────
  const fini = z => {
    const o = [], P = {};
    const k = Math.min((z.l - 30) / 300, (z.h - 10) / 196);
    const ox = (z.l - 282 * k) / 2, oy = z.h - 6 - 66 * k;
    const T = p => [ox + p[0] * k, oy + p[1] * k];
    const hw = x => 54 + 10 * x / 280, xC = 62, xB = 282;
    // le pouce, peint d'abord : le tube sort du pli du haut, en biais vers le bout de la mitaine
    const b0 = 88, b1 = 126;                                   // la fente, sur le pli du haut
    const th = [T([b0 - 2, -hw(b0) + 6]), T([b0 + 12, -hw(b0) - 30]), T([b0 + 34, -hw(b0) - 58]), T([b0 + 52, -hw(b0) - 64]),
      T([b0 + 64, -hw(b0) - 54]), T([b1 + 16, -hw(b1) - 26]), T([b1 + 8, -hw(b1) + 6])];
    o.push(h.path(lisse(th), W(A.contour)));
    // la manche : le poignet de tricot à gauche, le bout cousu à droite, arrondi
    const top = [], bot = [];
    for (let x = 0; x <= xB - 30; x += 10) { top.push(T([x, -hw(x)])); bot.push(T([x, hw(x)])); }
    const R = T([xB, 0]);
    const dM = `M${top.map(p => p.map(f1).join(' ')).join(' L')} Q${T([xB, -hw(xB)]).map(f1).join(' ')} ${R.map(f1).join(' ')} Q${T([xB, hw(xB)]).map(f1).join(' ')} ${bot[bot.length - 1].map(f1).join(' ')} L${bot.slice().reverse().map(p => p.map(f1).join(' ')).join(' L')} Z`;
    o.push(h.path(dM, W(A.contour)));
    o.push(h.ligne(...T([xC, -hw(xC)]), ...T([xC, hw(xC)]), A.arete));
    for (let y = -46; y <= 46; y += 8) o.push(h.ligne(...T([2, y * hw(0) / 54]), ...T([xC - 2, y * hw(xC) / 54]), A.detail));
    // la couture du bout, et la couture tout autour de la base du pouce
    o.push(h.path(`M${T([xB - 40, -hw(xB) + 7]).map(f1).join(' ')} Q${T([xB - 8, -hw(xB) + 8]).map(f1).join(' ')} ${T([xB - 8, 0]).map(f1).join(' ')} Q${T([xB - 8, hw(xB) - 8]).map(f1).join(' ')} ${T([xB - 40, hw(xB) - 7]).map(f1).join(' ')}`, COUTURE));
    o.push(h.path(`M${T([b0 + 4, -hw(b0) - 3]).map(f1).join(' ')} Q${T([(b0 + b1) / 2 + 4, -hw(b0) - 14]).map(f1).join(' ')} ${T([b1 + 2, -hw(b1) - 3]).map(f1).join(' ')}`, COUTURE));
    P.base = T([(b0 + b1) / 2 + 4, -hw(b0) - 9]);
    return { svg: o.join('\n'), P };
  };

  const memo = {};
  const G = (fn, z) => { const c = `${fn.name}-${z.l}-${z.h}`; return memo[c] || (memo[c] = fn(z)); };

  return {
    ref: '25-42',
    titre: 'Des mitaines dans une manche de chandail',
    desc: 'Un chandail de laine à plat : la manche se coupe au coude, la pièce du pouce se taille dans le bas du devant. La manche coupée, à plat, la main posée dessus : le poignet de tricot sur le poignet, le bout cousu un peu passé le bout des doigts, une fente dans le pli du haut à la base du pouce. La pièce du pouce pliée en deux, cousue en tube fermé au bout. La mitaine finie : le pouce cousu tout autour de la fente.',
    format: 'pleine',
    disposition: [['chandail'], ['mesure'], ['pouce', 'fini']],
    hauteurs: [0.95, 1.05, 1],
    largeurs: [[1], [1], [1, 2.4]],
    vues: {
      chandail: {
        titre: '1. Ce qu’on coupe',
        dessin: z => G(chandail, z).svg,
        renvois: z => {
          const P = G(chandail, z).P;
          return [
            { n: 1, rond: [P.coupe[0] - 26, P.coupe[1] - 12], cible: P.coupe, texte: 'la manche, coupée au coude' },
            { n: 2, rond: [P.pouce[0] + 46, P.pouce[1] - 4], cible: P.pouce, texte: 'le pouce, dans le reste du chandail' },
          ];
        },
      },
      mesure: {
        titre: '2. La main pour mesure',
        dessin: z => G(mesure, z).svg,
        renvois: z => {
          const P = G(mesure, z).P;
          return [
            { n: 3, rond: [P.poignet[0] - 52, P.poignet[1] + 4], cible: [P.poignet[0] - 6, P.poignet[1] - 6], texte: 'le poignet de tricot au poignet' },
            { n: 4, rond: [P.bout[0] + 38, P.bout[1] + 30], cible: P.bout, texte: 'le bout cousu' },
            { n: 5, rond: [P.fente[0] - P.fenteL / 2 - 44, Math.max(14, P.fente[1] - 18)], cible: [P.fente[0] - P.fenteL / 2 - 8, P.fente[1] - 4], texte: 'une fente à la base du pouce' },
          ];
        },
      },
      pouce: {
        titre: '3. Le pouce',
        dessin: z => G(pouce, z).svg,
        renvois: z => {
          const P = G(pouce, z).P;
          return [
            { n: 6, rond: [P.couture[0] + 34, P.couture[1] - 30], cible: [P.couture[0] + 1, P.couture[1]], texte: 'plié, cousu en tube fermé' },
          ];
        },
      },
      fini: {
        titre: '4. Cousu autour de la fente',
        dessin: z => G(fini, z).svg,
        renvois: z => {
          const P = G(fini, z).P;
          return [
            { n: 7, rond: [P.base[0] + 96, P.base[1] - 34], cible: [P.base[0] + 18, P.base[1] + 1], texte: 'cousu tout autour de la fente' },
          ];
        },
      },
    },
  };
};
