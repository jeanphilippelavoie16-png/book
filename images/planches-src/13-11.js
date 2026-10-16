// Planche 13-11 (petite planche, une colonne). La lentille de glace : le disque bombé des deux côtés, poli à la
// paume nue, retourné ; puis tenu par la tranche face à un soleil bas d'hiver, l'avant-bras posé sur une bûche, le
// cône de lumière qui se resserre jusqu'au point, sur une cible sombre. Le texte : section « Le soleil, sans loupe »
// et étapes 22 à 24. Corrigée le 16 octobre 2026 après le second regard (optique, prise, appui, ordre des repères).
//
// Mains : les moteurs validés seulement (brief-agent.md).
//   la paume qui polit   mainSimple 'plat', vue 'pouce' (de profil), la paume posée sur le haut du bombé ;
//   la main qui tient    mainSimple 'pince-fine', vue 'pouce', main droite, angle −25 : le bas du disque pris entre la
//                        pulpe du pouce et celle de l'index ; l'avant-bras posé sur une bûche vue par le bout, coupé par
//                        le bord de la vue
//                        (feuilles d'essai : scratchpad demo-13b/corr/essais/e11 et t11).
// L'optique : le soleil à 35° ; le disque perpendiculaire aux rayons, vu de biais (une ellipse étroite qui montre sa
// tranche bombée) ; le cône part de la face de l'autre côté, dans l'axe des rayons, jusqu'au point sur la cible.
// Aucune cote : « large comme la main » se lit par la main posée dessus.

module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => Math.round(v * 10) / 10;
  const deg = a => a * Math.PI / 180;
  const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
  const mul = (p, k) => [p[0] * k, p[1] * k];
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const coupe = (id, z, svg) => `<clipPath id="vue-${id}-1311"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#vue-${id}-1311)">\n${svg}\n</g>`;
  const gen = s => { let g = s; return () => (g = (g * 16807) % 2147483647) / 2147483647; };

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

  // ── Vue 1 : polir ── le disque de pleine tranche, la paume à plat dessus, l'avant-bras jusqu'au bord ; à gauche, une
  // petite vignette : le disque seul, de profil, et une flèche qui le fait basculer (on le retourne).
  const polir = z => {
    const e = 0.66, c = [z.l * 0.66, z.h - 18], D = 110 * e, ep = 15 * e;
    const v = [38, z.h - 20], Dv = 46, epv = 8;
    return { e, c, D, ep, v, Dv, epv };
  };
  const mainPolir = (g, avantbras) => {
    // la paume posée : le point le plus bas de la main tombe sur le haut du bombé (c − ep / 2)
    const o = { x: g.c[0] + 4, y: g.c[1], pose: 'plat', vue: 'pouce', echelle: g.e, angle: 180 };
    const m0 = F.mainSimple({ ...o, avantbras: false });
    o.y += (g.c[1] - g.ep * 0.5) - m0.boite.y1;
    return F.mainSimple({ ...o, avantbras });
  };

  // ── Vue 2 : au soleil ──
  const SOL = deg(35), d = [Math.cos(SOL), Math.sin(SOL)], ax = [Math.sin(SOL), -Math.cos(SOL)];
  // la main : la pince du bout des doigts, vue côté pouce ; le bas du disque pris entre la pulpe du pouce (devant) et
  // celle de l'index (derrière) ; le disque part vers le haut à droite depuis la pince. L'avant-bras descend vers la
  // gauche, posé sur une bûche vue par le bout, et sort par le bord.
  const MAIN = { pose: 'pince-fine', vue: 'pouce', cote: 'droite', angle: -25 };
  const soleil = z => {
    const e = 0.42, yS = z.h - 4;
    const o = { x: z.l * 0.46, y: z.h * 0.36, ...MAIN, echelle: e, ancre: 'prise' };
    const ab = { longueur: 300, bord: { l: z.l, h: z.h } };
    const m = F.mainSimple({ ...o, avantbras: ab });
    // la bûche : un rond posé au sol sous le poignet ; son dessus touche le dessous du poignet (relevé par le moteur : le
    // bas de la coupe de l'avant-bras à l'abscisse de la bûche). L'avant-bras continue vers le bas, coupé par le bord.
    const sous = x => { const cc = F.mainSimple({ ...o, avantbras: { longueur: ab.longueur, fin: [[x, -200], [x, 400]] } }).coupe; return cc ? Math.max(cc[0][1], cc[1][1]) : null; };
    // on cherche, en partant du poignet vers le coude, l'endroit où le dessous de l'avant-bras est à 2 rl du sol
    const rl = 13;
    let xl = m.poignet[0];
    for (let x = m.poignet[0]; x > 10; x -= 1) { const y = sous(x); if (y != null && y >= yS - 2 * rl) { xl = x; break; } }
    const yHaut = (sous(xl) || yS - 2 * rl) - 0.4;
    const contact = [xl, yHaut];
    const D = 110 * e, ep = 15 * e;
    const pince = [m.prise.x, m.prise.y];
    const Lc = add(pince, mul(ax, D / 2 * 0.92));
    const fz = ((yS - 2) - Lc[1]) / d[1];
    const Fp = add(Lc, mul(d, fz));
    return { e, yS, rl: (yS - yHaut) / 2, xl, o, ab, m, yHaut, contact, D, ep, Lc, Fp };
  };

  return {
    ref: '13-11',
    titre: 'La lentille de glace',
    desc: 'Deux vues. En haut, le disque de glace vu par la tranche, plus épais au centre qu’au bord, la paume nue posée à plat dessus qui le frotte d’avant en arrière, et le même disque retourné pour frotter l’autre côté. En bas, un soleil bas d’hiver : les rayons parallèles arrivent sur le disque, tenu par sa tranche entre le pouce et le côté de l’index, les doigts repliés, l’avant-bras couché sur une bûche ; le disque, vu de biais, est perpendiculaire aux rayons, et le cône de lumière part de sa face de l’autre côté jusqu’à un petit point sur une cible sombre posée au sol, qui fume.',
    format: 'quart',
    disposition: [['polir'], ['soleil']],
    hauteurs: [0.8, 1.2],
    vues: {
      polir: {
        titre: 'Bomber à la paume, des deux côtés',
        dessin: z => {
          const g = polir(z), out = [];
          out.push(lentille(g.c, [1, 0], g.D, g.ep));
          const m = mainPolir(g, { longueur: 300, bord: { l: z.l, h: z.h } });
          out.push(String(m.svg));
          // le geste : frotter, d'avant en arrière, le long de la paume (juste au-dessus de la main)
          const yA = Math.max(6, g.c[1] - g.ep - 32);
          out.push(h.geste(`M ${f(g.c[0] - 34)} ${f(yA)} L ${f(g.c[0] + 34)} ${f(yA)}`, { double: true }));
          // la vignette : le disque seul, de profil, et une flèche courbe qui le fait basculer par-dessus
          out.push(lentille(g.v, [1, 0], g.Dv, g.epv));
          const r = g.Dv / 2 + 2, y0 = g.v[1] - g.epv - 2;
          out.push(h.fleche(`M ${f(g.v[0] + r)} ${f(y0)} A ${f(r)} ${f(r * 0.8)} 0 0 0 ${f(g.v[0] - r)} ${f(y0)}`, A.arete));
          // un filet entre la vignette et le dessin principal
          const xf = (g.v[0] + g.Dv / 2 + Math.min(m.bout[0], m.pouce[0], g.c[0] - g.D / 2)) / 2;
          out.push(h.ligne(xf, 8, xf, z.h - 4, A.fin));
          return coupe('polir', z, out.join('\n'));
        },
        renvois: z => {
          const g = polir(z), yA = Math.max(6, g.c[1] - g.ep - 32);
          const r = g.Dv / 2 + 2, y0 = g.v[1] - g.epv - 2;
          return [
            { n: 1, rond: [g.c[0] - g.D / 2 + 30, z.h - 11], cible: [g.c[0] - g.D / 2 + 8, g.c[1] + 2.6], texte: 'mince au bord, épais au centre' },
            { n: 2, rond: [g.c[0] + 62, Math.max(11, yA - 2)], cible: [g.c[0] + 40, yA], texte: 'frotter à la paume nue, d’avant en arrière' },
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
          // la main gauche qui pince la tranche ; le disque peint après elle, le pouce repeint devant
          const disque = lentille(g.Lc, ax, g.D, g.ep, g.D * 0.11);
          out.push(String(F.mainSimple({ ...g.o, objet: disque, avantbras: g.ab }).svg));
          // les rayons du soleil, parallèles, jusqu'à la face du disque qui regarde le soleil
          [0.08, 0.22, 0.36].forEach(s => {
            const q = add(add(g.Lc, mul(ax, s * g.D)), mul(d, -(g.D * 0.11 + g.ep / 2) * Math.sqrt(1 - (2 * s) ** 2) * 0.95));
            const p0 = add(q, mul(d, -44));
            out.push(h.fleche(`M ${f(p0[0])} ${f(p0[1])} L ${f(q[0])} ${f(q[1])}`, A.fin));
          });
          // le cône : de la face de l'autre côté, dans l'axe des rayons, jusqu'au point
          // (la main cache le bas du disque : le cône part de la partie libre, du haut jusqu'au-dessus des doigts)
          [-0.12, 0.45].forEach(s => { const q = add(add(g.Lc, mul(ax, s * g.D)), mul(d, (g.D * 0.11 + g.ep / 2) * 0.3)); out.push(h.ligne(q[0], q[1], g.Fp[0], g.Fp[1], A.detail)); });
          const q0 = add(add(g.Lc, mul(ax, g.D * 0.16)), mul(d, (g.D * 0.11 + g.ep / 2) * 0.9));
          out.push(h.ligne(q0[0], q0[1], g.Fp[0], g.Fp[1], A.fin));
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
            { n: 5, rond: [Math.min(z.l - 12, C[0] + 22), C[1] - 46], cible: [C[0] + 3.5, C[1] - 8], texte: 'cercle : le plus petit point' },
            { n: 6, rond: [16, Math.max(12, Math.min(z.h - 12, g.contact[1] - 26))], cible: g.contact, texte: 'avant-bras calé sur une bûche' },
          ];
        },
      },
    },
  };
};
