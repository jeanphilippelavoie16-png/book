// Planche 13-11 (petite planche, une colonne). La lentille de glace : le disque bombé des deux côtés, poli à la
// paume nue ; puis tenu face au soleil, les mains calées sur un appui, le point de lumière sur une cible sombre.
// Le texte : section « Le soleil, sans loupe » et étapes 22 à 24.
//
// Mains : les moteurs validés seulement (brief-agent.md).
//   la paume qui polit   mainSimple 'plat', vue 'pouce' (de profil), à plat sur le disque ;
//   la main qui tient    mainSimple 'coupe-c', vue 'dos' : la main en C autour du bord du disque.
// Aucune cote : « large comme la main » se lit par la main posée dessus.

module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => Math.round(v * 10) / 10;
  const deg = a => a * Math.PI / 180;
  const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
  const mul = (p, k) => [p[0] * k, p[1] * k];
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const coupe = (id, z, svg) => `<clipPath id="vue-${id}-1311"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#vue-${id}-1311)">\n${svg}\n</g>`;

  // La lentille vue par la tranche : deux arcs, plus épaisse au centre, mince au bord. c : le centre ; ax : la
  // direction du diamètre (unitaire) ; D : le diamètre ; ep : l'épaisseur au centre.
  const lentille = (c, ax, D, ep) => {
    const n = [-ax[1], ax[0]], a = add(c, mul(ax, -D / 2)), b = add(c, mul(ax, D / 2));
    const h1 = add(c, mul(n, -ep)), h2 = add(c, mul(n, ep));
    const d = `M ${f(a[0])} ${f(a[1])} Q ${f(h1[0])} ${f(h1[1])} ${f(b[0])} ${f(b[1])} Q ${f(h2[0])} ${f(h2[1])} ${f(a[0])} ${f(a[1])} Z`;
    // deux reflets courts : la glace est claire
    const r1 = [add(add(c, mul(ax, -D * 0.22)), mul(n, -ep * 0.28)), add(add(c, mul(ax, -D * 0.06)), mul(n, -ep * 0.36))];
    const r2 = [add(add(c, mul(ax, -D * 0.16)), mul(n, -ep * 0.02)), add(add(c, mul(ax, -D * 0.02)), mul(n, -ep * 0.1))];
    return [h.path(d, blanc(A.contour)), h.chemin(r1, A.detail), h.chemin(r2, A.detail)].join('\n');
  };

  // ── Vue 1 : polir ──
  const polir = z => {
    const e = 0.6, c = [z.l * 0.46, z.h - 30], D = 100 * e, ep = 9 * e;
    return { e, c, D, ep };
  };
  // ── Vue 2 : au soleil ──
  const soleil = z => {
    const e = 0.6, yA = z.h - 18;                        // le dessus de l'appui (une bûche couchée)
    const cible = [z.l * 0.66, yA - 3];                   // la cible sombre, posée sur la bûche
    const th = deg(-58);                                  // les rayons viennent d'en haut à gauche
    const ray = [Math.cos(deg(58)), Math.sin(deg(58))];   // leur direction
    const foc = 88;                                       // la lentille à 88 unités de la cible [dessin, pas une mesure]
    const L = add(cible, mul(ray, -foc));                 // le centre de la lentille
    const ax = [-ray[1], ray[0]];                         // la lentille perpendiculaire aux rayons
    return { e, yA, cible, ray, L, ax, D: 100 * e, ep: 9 * e, th };
  };

  return {
    ref: '13-11',
    titre: 'La lentille de glace',
    desc: 'Deux vues. En haut, le disque de glace vu par la tranche, plus épais au centre qu’au bord, et la paume nue posée à plat dessus, qui le frotte d’un côté puis de l’autre. En bas, le disque tenu par le bord dans une main en C, l’avant-bras posé sur une bûche couchée, face au soleil : les rayons traversent la glace et se rejoignent en un petit point sur l’amadou carbonisé posé sur la bûche, qui fume.',
    format: 'quart',
    disposition: [['polir'], ['soleil']],
    hauteurs: [0.82, 1.18],
    vues: {
      polir: {
        titre: 'Bomber à la paume',
        dessin: z => {
          const g = polir(z), out = [];
          out.push(lentille(g.c, [1, 0], g.D, g.ep));
          // la paume à plat sur le dessus du disque
          const m = F.mainSimple({ x: g.c[0] + 6, y: g.c[1] - g.ep, pose: 'plat', vue: 'pouce', echelle: g.e, angle: 180, ancre: 'prise', avantbras: { longueur: 70 } });
          out.push(String(m.svg));
          // le geste : frotter d'un côté puis de l'autre
          out.push(h.geste(`M ${f(g.c[0] - 34)} ${f(g.c[1] + g.ep + 10)} L ${f(g.c[0] + 34)} ${f(g.c[1] + g.ep + 10)}`, { double: true }));
          return coupe('polir', z, out.join('\n'));
        },
        renvois: z => {
          const g = polir(z);
          return [
            { n: 1, rond: [16, g.c[1] - 4], cible: [g.c[0] - g.D / 2 + 2, g.c[1]], texte: 'mince au bord, épais au centre' },
            { n: 2, rond: [z.l - 16, g.c[1] + g.ep + 10], cible: [g.c[0] + 38, g.c[1] + g.ep + 10], texte: 'flèche : frotter à la paume nue' },
          ];
        },
      },
      soleil: {
        titre: 'Face au soleil, calé',
        dessin: z => {
          const g = soleil(z), out = [];
          // l'appui : une bûche couchée, vue de côté
          out.push(h.path(`M -4 ${f(g.yA)} L ${f(z.l + 4)} ${f(g.yA)} L ${f(z.l + 4)} ${f(z.h + 4)} L -4 ${f(z.h + 4)} Z`, A.blanc));
          out.push(h.ligne(0, g.yA, z.l, g.yA, A.contour));
          out.push(h.path(`M 0 ${f(g.yA + 8)} L 40 ${f(g.yA + 9)} M 70 ${f(g.yA + 14)} L 130 ${f(g.yA + 13)} M 170 ${f(g.yA + 7)} L 220 ${f(g.yA + 8)} M 250 ${f(g.yA + 16)} L 296 ${f(g.yA + 15)}`, A.fin));
          // les rayons du soleil, parallèles, jusqu'à la lentille ; puis le cône qui se resserre sur la cible
          const k = g.D / 2 - 4;
          [-1, -0.5, 0, 0.5, 1].forEach(s => {
            const p = add(g.L, mul(g.ax, s * k)), q = add(p, mul(g.ray, -120));
            out.push(h.ligne(q[0], q[1], p[0], p[1], A.fin));
            out.push(h.ligne(p[0], p[1], g.cible[0], g.cible[1], A.fin));
          });
          // la cible : un carré d'amadou carbonisé, noir, posé sur la bûche, et le filet de fumée
          out.push(h.path(`M ${f(g.cible[0] - 13)} ${f(g.yA)} L ${f(g.cible[0] - 11)} ${f(g.yA - 4)} L ${f(g.cible[0] + 13)} ${f(g.yA - 4)} L ${f(g.cible[0] + 14)} ${f(g.yA)} Z`, A.plein));
          out.push(h.path(`M ${f(g.cible[0] + 2)} ${f(g.cible[1] - 3)} C ${f(g.cible[0] + 8)} ${f(g.cible[1] - 14)} ${f(g.cible[0] - 3)} ${f(g.cible[1] - 22)} ${f(g.cible[0] + 4)} ${f(g.cible[1] - 34)}`, A.detail));
          // la main en C autour du bord de la lentille, l'avant-bras posé sur la bûche
          const lent = lentille(g.L, g.ax, g.D, g.ep);
          const o = { x: g.L[0], y: g.L[1], pose: 'coupe-c', vue: 'dos', diametre: 100, echelle: g.e, angle: -120 };
          const m0 = F.mainSimple({ ...o, avantbras: false });
          o.angle += (Math.atan2(g.ray[1], g.ray[0]) * 180 / Math.PI) - m0.prise.angle;
          out.push(String(F.mainSimple({ ...o, objet: lent, avantbras: { longueur: 90 } }).svg));
          // le point à contrôler : le plus petit point de lumière, sur la cible
          out.push(h.controle(g.cible[0], g.cible[1] - 1, 7));
          return coupe('soleil', z, out.join('\n'));
        },
        renvois: z => {
          const g = soleil(z);
          return [
            { n: 3, rond: [z.l - 16, g.cible[1] - 52], cible: [g.cible[0] + 6, g.cible[1] - 6], texte: 'cercle : le plus petit point' },
            { n: 4, rond: [z.l - 16, g.yA - 22], cible: [g.cible[0] + 13, g.yA - 3], texte: 'sur une cible sombre et sèche' },
            { n: 5, rond: [16, g.yA - 40], cible: [26, g.yA - 4], texte: 'mains calées sur un appui' },
          ];
        },
      },
    },
  };
};
